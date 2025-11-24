import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const OUTPUT_FILE = 'external_ai_export.md';

// ============================================================================
// EXCLUSION PATTERNS
// ============================================================================
// All files and folders are included by default EXCEPT those matching these patterns.
// Edit this array to customize what gets excluded from exports.

const EXCLUSIONS = [
    // === Folders ===
    // Exclude entire directories (use trailing slash)
    'node_modules/',
    '.git/',
    '.vscode/',
    '.idea/',
    '.claude/',
    'dist/',
    'build/',
    'coverage/',
    '__pycache__/',
    'env/',
    '.backups/',

    // Project-specific folders
    'tools/',              // Don't export the tools themselves
    'archive/',            // Old archived code
    'references/',         // Reference materials
    'new_questions/',      // Work in progress
    'temp/',               // Temporary files

    // === File Types ===
    // Exclude by file extension (use *.extension)
    '*.log',               // Log files
    '*.env',               // Environment variables
    '.env.*',              // Environment variable variants (.env.local, etc.)
    '*.key',               // Key files
    '*.pem',               // Certificate files
    '*.pfx',               // Certificate files
    '*.p12',               // Certificate files
    '*.png',               // Images (usually don't need in code export)
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.ico',
    '*.svg',
    '*.pdf',
    '*.zip',
    '*.tar',
    '*.gz',

    // === Specific Files ===
    // Exclude specific file names
    '.DS_Store',           // macOS metadata
    'Thumbs.db',           // Windows metadata
    'desktop.ini',         // Windows metadata
    'package-lock.json',   // npm lock file (large and auto-generated)
    'yarn.lock',           // Yarn lock file
    'pnpm-lock.yaml',      // pnpm lock file
    'codebase_dump.md',    // Old export output
    'external_ai_export.md', // This script's output
    'credentials.json',    // Credentials
    '.gitignore',          // Git config (usually not needed)

    // === File Name Patterns ===
    // Exclude files matching patterns (use * for wildcards)
    'test_*.js',           // Test files in root
    '*.test.js',           // Test files with .test extension
    '*.spec.js',           // Spec files
    '*_backup.*',          // Backup files
    '*.bak',               // Backup files
    '*.tmp',               // Temporary files
    '*.swp',               // Vim swap files
    '*.swo',               // Vim swap files
    '*~',                  // Backup files (Unix)

    // === Advanced Patterns ===
    // Use ** for recursive matching
    // '**/*.test.js',     // Uncomment to exclude test files in all subdirectories
    // 'src/**/temp/',     // Uncomment to exclude all 'temp' folders in src/
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert glob pattern to regex
 */
function globToRegex(pattern) {
    // Escape special regex characters except * and /
    let regex = pattern
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*\*/g, '<!DOUBLESTAR!>')
        .replace(/\*/g, '[^/]*')
        .replace(/<!DOUBLESTAR!>/g, '.*');

    // Handle directory patterns
    if (pattern.endsWith('/')) {
        // Match directory and everything under it
        regex = '^' + regex.slice(0, -1) + '(/|$)';
    } else {
        regex = '^' + regex + '$';
    }

    return new RegExp(regex);
}

/**
 * Check if a file path matches any exclusion pattern
 */
function isExcluded(filePath, exclusions) {
    const normalizedPath = filePath.replace(/\\/g, '/');

    for (const pattern of exclusions) {
        const regex = globToRegex(pattern);
        if (regex.test(normalizedPath)) {
            return true;
        }

        // Also check if file is inside an excluded directory
        if (pattern.endsWith('/')) {
            const dirName = pattern.slice(0, -1);
            if (normalizedPath.startsWith(dirName + '/') || normalizedPath === dirName) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Recursively collect all files from a directory (exclusion-based)
 */
function collectFiles(dir, baseDir = dir, exclusions = []) {
    const files = [];

    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

            // Check if excluded
            if (isExcluded(relativePath, exclusions)) {
                continue;
            }

            if (entry.isDirectory()) {
                // Check if directory itself is excluded
                if (isExcluded(relativePath + '/', exclusions)) {
                    continue;
                }

                // Recursively collect from subdirectories
                files.push(...collectFiles(fullPath, baseDir, exclusions));
            } else if (entry.isFile()) {
                // Include all files that aren't excluded
                files.push({
                    path: relativePath,
                    fullPath: fullPath,
                    type: path.extname(entry.name).substring(1) || 'txt'
                });
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err.message);
    }

    return files;
}

/**
 * Read file content safely
 */
function readFileContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        return `[Error reading file: ${err.message}]`;
    }
}

/**
 * Generate export markdown file
 */
function generateExport(files, outputPath, exportScope) {
    const timestamp = new Date().toISOString();
    let output = `# Codebase Export for External AI
**Generated:** ${timestamp}
**Files:** ${files.length}
**Scope:** ${exportScope}

---

## Important Instructions

Before making any changes, please read the accompanying \`ai_instructions.md\` file. It contains critical information about how to format your response.

**Summary:**
- Return changes as **unified diff format** (patch format)
- Do NOT return full file contents
- Include 3+ lines of context around changes
- Use forward slashes in file paths
- Ensure exact whitespace matching

---

## Project Structure

\`\`\`
${generateFileTree(files)}
\`\`\`

---

## Files

`;

    for (const file of files) {
        const content = readFileContent(file.fullPath);
        output += `### ${file.path}\n\n`;
        output += `\`\`\`${file.type}\n`;
        output += content;
        output += `\n\`\`\`\n\n`;
        output += `---\n\n`;
    }

    output += `## End of Export

**Total files exported:** ${files.length}
**Timestamp:** ${timestamp}

Remember to return your changes in unified diff format as specified in \`ai_instructions.md\`.
`;

    fs.writeFileSync(outputPath, output, 'utf8');
    return output;
}

/**
 * Generate a tree view of exported files
 */
function generateFileTree(files) {
    const tree = {};

    for (const file of files) {
        const parts = file.path.split('/');
        let current = tree;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === parts.length - 1) {
                // File
                if (!current._files) current._files = [];
                current._files.push(part);
            } else {
                // Directory
                if (!current[part]) current[part] = {};
                current = current[part];
            }
        }
    }

    function renderTree(obj, prefix = '', isLast = true) {
        let result = '';
        const entries = Object.keys(obj).filter(k => k !== '_files');
        const files = obj._files || [];

        // Render directories
        entries.forEach((key, index) => {
            const isLastEntry = index === entries.length - 1 && files.length === 0;
            const connector = isLastEntry ? '└── ' : '├── ';
            const extension = isLastEntry ? '    ' : '│   ';

            result += prefix + connector + key + '/\n';
            result += renderTree(obj[key], prefix + extension, isLastEntry);
        });

        // Render files
        files.forEach((file, index) => {
            const isLastFile = index === files.length - 1;
            const connector = isLastFile ? '└── ' : '├── ';
            result += prefix + connector + file + '\n';
        });

        return result;
    }

    return renderTree(tree);
}

/**
 * Display summary statistics
 */
function displaySummary(files, excludedCount = 0) {
    const byType = {};

    for (const file of files) {
        byType[file.type] = (byType[file.type] || 0) + 1;
    }

    console.log('\n📊 Export Summary:');
    console.log('─'.repeat(50));
    console.log(`Files included: ${files.length}`);
    if (excludedCount > 0) {
        console.log(`Files excluded: ${excludedCount} (by exclusion rules)`);
    }
    console.log('\nBy file type:');

    Object.entries(byType)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
            console.log(`  ${type.padEnd(15)} ${count}`);
        });
}

/**
 * Display usage information
 */
function displayUsage() {
    console.log(`
Usage: node tools/exportForExternalAI.js [directory]

Arguments:
  directory    Optional. Path to export (relative to project root).
               Exports only this directory and all subdirectories.
               Defaults to entire project if not specified.

Examples:
  node tools/exportForExternalAI.js              # Export entire project
  node tools/exportForExternalAI.js src          # Export only src/ folder
  node tools/exportForExternalAI.js src/generators   # Export only generators

Exclusions:
  Files and folders are excluded based on patterns defined in the
  EXCLUSIONS array at the top of this script. Edit the script to
  customize what gets excluded.

Output:
  Creates 'external_ai_export.md' in the project root.
  Share this file along with 'ai_instructions.md' with external AI.
`);
}

/**
 * Main execution
 */
function main() {
    const args = process.argv.slice(2);

    // Check for help flag
    if (args.includes('--help') || args.includes('-h')) {
        displayUsage();
        process.exit(0);
    }

    console.log('🚀 Starting export for external AI...\n');

    // Determine export scope
    let exportDir = PROJECT_ROOT;
    let exportScope = 'Entire project';

    if (args.length > 0) {
        const targetDir = args[0];
        exportDir = path.join(PROJECT_ROOT, targetDir);

        if (!fs.existsSync(exportDir)) {
            console.error(`❌ Error: Directory not found: ${targetDir}`);
            console.log(`\nSearched at: ${exportDir}`);
            console.log('\nRun with --help for usage information.');
            process.exit(1);
        }

        if (!fs.statSync(exportDir).isDirectory()) {
            console.error(`❌ Error: Not a directory: ${targetDir}`);
            process.exit(1);
        }

        exportScope = targetDir;
        console.log(`📂 Export scope: ${targetDir}/`);
    } else {
        console.log(`📂 Export scope: Entire project`);
    }

    const outputPath = path.join(PROJECT_ROOT, OUTPUT_FILE);

    // Display exclusion info
    console.log(`🚫 Exclusion patterns: ${EXCLUSIONS.length}`);
    console.log(`   (Edit EXCLUSIONS array in script to customize)\n`);

    // Collect files
    console.log('📁 Collecting files...');
    const files = collectFiles(exportDir, PROJECT_ROOT, EXCLUSIONS);

    if (files.length === 0) {
        console.error('❌ No files found!');
        console.log('\nPossible reasons:');
        console.log('  - Directory is empty');
        console.log('  - All files are excluded by exclusion patterns');
        console.log('  - Incorrect directory path');
        console.log('\nEdit EXCLUSIONS array in the script if needed.');
        process.exit(1);
    }

    // Sort files by path for consistent output
    files.sort((a, b) => a.path.localeCompare(b.path));

    // Display summary
    displaySummary(files);

    // Generate export
    console.log(`\n📝 Generating export file: ${OUTPUT_FILE}...`);
    generateExport(files, outputPath, exportScope);

    console.log(`\n✅ Export complete!`);
    console.log('─'.repeat(50));
    console.log(`\n📦 Output file: ${OUTPUT_FILE}`);
    console.log(`📄 Instructions: ai_instructions.md`);
    console.log('\n📤 Next steps:');
    console.log('   1. Share both files with external AI (ChatGPT, etc.)');
    console.log('   2. Request changes and receive patch file');
    console.log('   3. Run: node tools/importAIChanges.js changes.patch');
    console.log('');
}

main();
