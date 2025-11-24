import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

/**
 * Parse unified diff format
 * Returns array of file changes
 */
function parsePatch(patchContent) {
    const lines = patchContent.split('\n');
    const files = [];
    let currentFile = null;
    let currentHunk = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // File header: --- a/path/to/file
        if (line.startsWith('--- ')) {
            if (currentFile) {
                files.push(currentFile);
            }

            const oldPath = line.substring(4).trim();
            currentFile = {
                oldPath: oldPath === '/dev/null' ? null : oldPath.replace(/^a\//, ''),
                newPath: null,
                hunks: [],
                isNew: oldPath === '/dev/null',
                isDeleted: false
            };
            continue;
        }

        // File header: +++ b/path/to/file
        if (line.startsWith('+++ ')) {
            if (currentFile) {
                const newPath = line.substring(4).trim();
                currentFile.newPath = newPath === '/dev/null' ? null : newPath.replace(/^b\//, '');
                currentFile.isDeleted = newPath === '/dev/null';
            }
            continue;
        }

        // Hunk header: @@ -old_start,old_count +new_start,new_count @@
        if (line.startsWith('@@')) {
            const match = line.match(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@(.*)/);
            if (match) {
                currentHunk = {
                    oldStart: parseInt(match[1]),
                    oldCount: match[2] ? parseInt(match[2]) : 1,
                    newStart: parseInt(match[3]),
                    newCount: match[4] ? parseInt(match[4]) : 1,
                    context: match[5] ? match[5].trim() : '',
                    lines: []
                };
                if (currentFile) {
                    currentFile.hunks.push(currentHunk);
                }
            }
            continue;
        }

        // Hunk content
        if (currentHunk && (line.startsWith(' ') || line.startsWith('-') || line.startsWith('+'))) {
            currentHunk.lines.push(line);
        }
    }

    // Add last file
    if (currentFile) {
        files.push(currentFile);
    }

    return files;
}

/**
 * Validate patch format and structure
 */
function validatePatch(files) {
    const errors = [];

    if (files.length === 0) {
        errors.push('No file changes found in patch');
        return errors;
    }

    for (const file of files) {
        if (!file.oldPath && !file.newPath) {
            errors.push('Invalid file header: missing both old and new paths');
            continue;
        }

        const filePath = file.newPath || file.oldPath;

        if (file.hunks.length === 0 && !file.isNew && !file.isDeleted) {
            errors.push(`No hunks found for file: ${filePath}`);
        }

        for (const hunk of file.hunks) {
            if (hunk.lines.length === 0) {
                errors.push(`Empty hunk in file: ${filePath}`);
            }

            // Validate line markers
            for (const line of hunk.lines) {
                if (!line.startsWith(' ') && !line.startsWith('-') && !line.startsWith('+')) {
                    errors.push(`Invalid line marker in ${filePath}: ${line.substring(0, 50)}...`);
                }
            }
        }
    }

    return errors;
}

/**
 * Apply a single hunk to file content
 */
function applyHunk(originalLines, hunk) {
    const result = [...originalLines];
    let originalIndex = hunk.oldStart - 1; // Convert to 0-based index
    let resultIndex = originalIndex;

    for (const line of hunk.lines) {
        const lineType = line[0];
        const content = line.substring(1);

        if (lineType === ' ') {
            // Context line - verify it matches
            if (originalIndex >= originalLines.length || originalLines[originalIndex] !== content) {
                throw new Error(`Context mismatch at line ${originalIndex + 1}`);
            }
            originalIndex++;
            resultIndex++;
        } else if (lineType === '-') {
            // Remove line - verify it matches
            if (originalIndex >= originalLines.length || originalLines[originalIndex] !== content) {
                throw new Error(`Remove line mismatch at line ${originalIndex + 1}`);
            }
            result.splice(resultIndex, 1);
            originalIndex++;
        } else if (lineType === '+') {
            // Add line
            result.splice(resultIndex, 0, content);
            resultIndex++;
        }
    }

    return result;
}

/**
 * Apply patch to a single file
 */
function applyPatchToFile(filePath, fileChange) {
    const fullPath = path.join(PROJECT_ROOT, filePath);

    // Handle new file
    if (fileChange.isNew) {
        const content = fileChange.hunks[0].lines
            .filter(l => l.startsWith('+'))
            .map(l => l.substring(1))
            .join('\n');

        // Create directory if needed
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(fullPath, content, 'utf8');
        return { success: true, message: 'New file created' };
    }

    // Handle deleted file
    if (fileChange.isDeleted) {
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return { success: true, message: 'File deleted' };
        } else {
            return { success: false, message: 'File not found (already deleted?)' };
        }
    }

    // Handle modified file
    if (!fs.existsSync(fullPath)) {
        return { success: false, message: 'File not found' };
    }

    const originalContent = fs.readFileSync(fullPath, 'utf8');
    const originalLines = originalContent.split('\n');

    let modifiedLines = [...originalLines];

    try {
        for (const hunk of fileChange.hunks) {
            modifiedLines = applyHunk(modifiedLines, hunk);
        }

        const modifiedContent = modifiedLines.join('\n');
        fs.writeFileSync(fullPath, modifiedContent, 'utf8');

        return { success: true, message: 'Changes applied successfully' };
    } catch (err) {
        return { success: false, message: err.message };
    }
}

/**
 * Create backup of files that will be modified
 */
function createBackup(files) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(PROJECT_ROOT, '.backups', timestamp);

    fs.mkdirSync(backupDir, { recursive: true });

    for (const file of files) {
        const filePath = file.newPath || file.oldPath;
        if (!filePath || file.isNew) continue;

        const sourcePath = path.join(PROJECT_ROOT, filePath);
        if (!fs.existsSync(sourcePath)) continue;

        const backupPath = path.join(backupDir, filePath);
        const backupDirPath = path.dirname(backupPath);

        fs.mkdirSync(backupDirPath, { recursive: true });
        fs.copyFileSync(sourcePath, backupPath);
    }

    return backupDir;
}

/**
 * Display preview of changes
 */
function displayPreview(files) {
    console.log('\n' + '='.repeat(70));
    console.log(`${colors.bright}${colors.cyan}PREVIEW OF CHANGES${colors.reset}`);
    console.log('='.repeat(70) + '\n');

    for (const file of files) {
        const filePath = file.newPath || file.oldPath;

        // File header
        if (file.isNew) {
            console.log(`${colors.green}[NEW FILE]${colors.reset} ${colors.bright}${filePath}${colors.reset}`);
        } else if (file.isDeleted) {
            console.log(`${colors.red}[DELETED]${colors.reset} ${colors.bright}${filePath}${colors.reset}`);
        } else {
            console.log(`${colors.yellow}[MODIFIED]${colors.reset} ${colors.bright}${filePath}${colors.reset}`);
        }

        // Show hunks
        for (const hunk of file.hunks) {
            console.log(`\n  ${colors.blue}@@ -${hunk.oldStart},${hunk.oldCount} +${hunk.newStart},${hunk.newCount} @@ ${hunk.context}${colors.reset}`);

            for (const line of hunk.lines) {
                const lineType = line[0];
                const content = line.substring(1);

                if (lineType === '-') {
                    console.log(`  ${colors.red}- ${content}${colors.reset}`);
                } else if (lineType === '+') {
                    console.log(`  ${colors.green}+ ${content}${colors.reset}`);
                } else {
                    console.log(`    ${content}`);
                }
            }
        }

        console.log('');
    }

    console.log('='.repeat(70) + '\n');
}

/**
 * Display summary of changes
 */
function displaySummary(files) {
    const newFiles = files.filter(f => f.isNew).length;
    const modifiedFiles = files.filter(f => !f.isNew && !f.isDeleted).length;
    const deletedFiles = files.filter(f => f.isDeleted).length;

    console.log(`${colors.bright}Summary:${colors.reset}`);
    console.log(`  ${colors.green}New files:${colors.reset}      ${newFiles}`);
    console.log(`  ${colors.yellow}Modified files:${colors.reset} ${modifiedFiles}`);
    console.log(`  ${colors.red}Deleted files:${colors.reset}  ${deletedFiles}`);
    console.log(`  ${colors.blue}Total changes:${colors.reset}  ${files.length}`);
}

/**
 * Prompt user for confirmation
 */
function promptUser(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.toLowerCase().trim());
        });
    });
}

/**
 * Validate JavaScript syntax (basic check)
 */
function validateSyntax(files) {
    const errors = [];

    for (const file of files) {
        const filePath = file.newPath || file.oldPath;

        if (!filePath.endsWith('.js')) continue;

        const fullPath = path.join(PROJECT_ROOT, filePath);

        if (file.isNew || file.isDeleted || !fs.existsSync(fullPath)) continue;

        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Basic syntax check - try to parse as module
            new Function(content);
        } catch (err) {
            errors.push(`${filePath}: ${err.message}`);
        }
    }

    return errors;
}

/**
 * Main execution
 */
async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(`${colors.red}❌ Error: No patch file specified${colors.reset}\n`);
        console.log('Usage: node tools/importAIChanges.js <patch-file>\n');
        console.log('Example: node tools/importAIChanges.js changes.patch');
        process.exit(1);
    }

    const patchFile = args[0];
    const patchPath = path.resolve(patchFile);

    console.log(`${colors.bright}🔍 Importing AI Changes${colors.reset}\n`);

    // Read patch file
    if (!fs.existsSync(patchPath)) {
        console.log(`${colors.red}❌ Error: Patch file not found: ${patchFile}${colors.reset}`);
        process.exit(1);
    }

    console.log(`📄 Reading patch file: ${colors.cyan}${patchFile}${colors.reset}`);
    const patchContent = fs.readFileSync(patchPath, 'utf8');

    // Parse patch
    console.log('🔨 Parsing patch...');
    const files = parsePatch(patchContent);

    if (files.length === 0) {
        console.log(`${colors.red}❌ Error: No changes found in patch file${colors.reset}`);
        console.log('\nMake sure the patch is in unified diff format.');
        console.log('See ai_instructions.md for details.');
        process.exit(1);
    }

    console.log(`${colors.green}✅ Found ${files.length} file(s) with changes${colors.reset}\n`);

    // Validate patch
    console.log('🔍 Validating patch format...');
    const errors = validatePatch(files);

    if (errors.length > 0) {
        console.log(`${colors.red}❌ Patch validation failed:${colors.reset}\n`);
        errors.forEach(err => console.log(`  - ${err}`));
        console.log('\nPlease fix these errors and try again.');
        process.exit(1);
    }

    console.log(`${colors.green}✅ Patch format is valid${colors.reset}\n`);

    // Display preview
    displayPreview(files);

    // Display summary
    displaySummary(files);

    // Prompt for confirmation
    console.log(`\n${colors.yellow}⚠️  This will modify your codebase!${colors.reset}`);
    console.log('A backup will be created before applying changes.\n');

    const answer = await promptUser(`${colors.bright}Do you want to apply these changes? (yes/no): ${colors.reset}`);

    if (answer !== 'yes' && answer !== 'y') {
        console.log(`\n${colors.yellow}❌ Import cancelled by user${colors.reset}`);
        process.exit(0);
    }

    // Create backup
    console.log(`\n📦 Creating backup...`);
    const backupDir = createBackup(files);
    console.log(`${colors.green}✅ Backup created: ${colors.cyan}${backupDir}${colors.reset}\n`);

    // Apply changes
    console.log('🚀 Applying changes...\n');

    const results = [];

    for (const file of files) {
        const filePath = file.newPath || file.oldPath;
        console.log(`   ${filePath}...`);

        const result = applyPatchToFile(filePath, file);
        results.push({ filePath, ...result });

        if (result.success) {
            console.log(`   ${colors.green}✅ ${result.message}${colors.reset}`);
        } else {
            console.log(`   ${colors.red}❌ ${result.message}${colors.reset}`);
        }
    }

    // Validate syntax (optional)
    console.log('\n🔍 Validating JavaScript syntax...');
    const syntaxErrors = validateSyntax(files);

    if (syntaxErrors.length > 0) {
        console.log(`${colors.yellow}⚠️  Syntax validation warnings:${colors.reset}\n`);
        syntaxErrors.forEach(err => console.log(`  - ${err}`));
        console.log(`\nYou may need to fix these syntax errors manually.`);
    } else {
        console.log(`${colors.green}✅ No syntax errors detected${colors.reset}`);
    }

    // Final summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log('\n' + '='.repeat(70));
    console.log(`${colors.bright}IMPORT COMPLETE${colors.reset}`);
    console.log('='.repeat(70));
    console.log(`\n${colors.green}✅ Successful: ${successful}${colors.reset}`);
    console.log(`${colors.red}❌ Failed:     ${failed}${colors.reset}`);
    console.log(`\n📦 Backup location: ${colors.cyan}${backupDir}${colors.reset}`);

    if (failed > 0) {
        console.log(`\n${colors.yellow}⚠️  Some changes failed to apply.${colors.reset}`);
        console.log('You can restore from the backup if needed:\n');
        console.log(`   cp -r ${backupDir}/* ${PROJECT_ROOT}/\n`);
    } else {
        console.log(`\n${colors.green}🎉 All changes applied successfully!${colors.reset}\n`);
    }
}

main().catch(err => {
    console.error(`${colors.red}❌ Unexpected error: ${err.message}${colors.reset}`);
    console.error(err.stack);
    process.exit(1);
});
