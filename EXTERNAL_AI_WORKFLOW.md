# External AI Collaboration Workflow

A complete system for safely exporting your codebase to external AI systems (like ChatGPT), receiving code changes, and applying them back to your project with validation and review.

## Overview

This workflow consists of three main phases:

1. **Export** - Selectively export your codebase with instructions
2. **Collaborate** - Share with external AI and receive changes as patch files
3. **Import** - Review and apply changes safely with automatic backups

## Quick Start

```bash
# 1. Export your codebase (entire project)
node tools/exportForExternalAI.js

# OR export only a specific folder
node tools/exportForExternalAI.js src
node tools/exportForExternalAI.js src/generators

# 2. Share external_ai_export.md and ai_instructions.md with external AI
#    Request changes and save the response as changes.patch

# 3. Import and apply changes
node tools/importAIChanges.js changes.patch
```

## Phase 1: Export Your Codebase

### Understanding the Export System

**Exclusion-Based Approach:**
- All files and folders are **included by default**
- Only files matching exclusion patterns are skipped
- Exclusions are defined in the `EXCLUSIONS` array at the top of `exportForExternalAI.js`

**Default exclusions include:**
- System folders (`.git/`, `node_modules/`, `.vscode/`)
- Build artifacts (`dist/`, `build/`, `coverage/`)
- Sensitive files (`*.env`, `*.key`, credentials)
- Images and binaries (`*.png`, `*.pdf`, `*.zip`)
- Test files (`test_*.js`, `*.test.js`, `*.spec.js`)
- Temporary files (`*.tmp`, `*.bak`, `*~`)

### Step 1: Customize Exclusions (Optional)

If you need to exclude additional files or folders, edit `tools/exportForExternalAI.js`:

```javascript
const EXCLUSIONS = [
    // === Folders ===
    'node_modules/',
    '.git/',
    '.claude/',
    'references/',
    'tools/',
    'my_custom_folder/',  // Add your exclusions here

    // === File Types ===
    '*.log',
    '*.my_custom_ext',    // Add custom file types

    // === Specific Files ===
    '.DS_Store',
    'my_secret_file.js',  // Exclude specific files

    // === Patterns ===
    'test_*.js',          // Exclude by pattern
    '**/*.backup',        // Recursive pattern matching
];
```

**Exclusion pattern types:**
- **Folders:** Use trailing slash (e.g., `archive/`)
- **File types:** Use wildcard (e.g., `*.log`)
- **File names:** Exact match (e.g., `config.secret.js`)
- **Patterns:** Glob patterns (e.g., `test_*.js`, `**/*.test.js`)

### Step 2: Run Export Script

**Export entire project:**

```bash
node tools/exportForExternalAI.js
```

**Export specific folder:**
```bash
# Export only src/ and all subdirectories
node tools/exportForExternalAI.js src

# Export only generator files
node tools/exportForExternalAI.js src/generators

# Export only core engine files
node tools/exportForExternalAI.js src/core
```

**Get help:**
```bash
node tools/exportForExternalAI.js --help
```

**Output:**
- `external_ai_export.md` - Your codebase in markdown format
- Uses existing `ai_instructions.md` for AI guidance

**What's included:**
- Export scope information
- File tree visualization
- Complete file contents with syntax highlighting
- Metadata (timestamp, file count)
- Instructions for the external AI

**Example output (entire project):**
```
🚀 Starting export for external AI...

📂 Export scope: Entire project
🚫 Exclusion patterns: 52
   (Edit EXCLUSIONS array in script to customize)

📁 Collecting files...

📊 Export Summary:
──────────────────────────────────────────────────
Files included: 158

By file type:
  js              138
  md              10
  css             5
  html            1
  json            1

✅ Export complete!
──────────────────────────────────────────────────

📦 Output file: external_ai_export.md
📄 Instructions: ai_instructions.md
```

**Example output (specific folder):**
```
🚀 Starting export for external AI...

📂 Export scope: src/generators/
🚫 Exclusion patterns: 52

📁 Collecting files...

📊 Export Summary:
──────────────────────────────────────────────────
Files included: 130

By file type:
  js              130

✅ Export complete!
```

## Phase 2: Collaborate with External AI

### Step 1: Share Files with External AI

Send both files to your external AI (ChatGPT, Claude, etc.):

1. **external_ai_export.md** - Your codebase
2. **ai_instructions.md** - Format requirements

**Example prompt:**
```
I'm sharing my codebase and need you to make some changes.

IMPORTANT: Please read ai_instructions.md first - it contains
critical formatting requirements. All changes must be returned
as unified diff format (patch files).

Task: [Describe what you want the AI to do]

Files attached:
- external_ai_export.md (codebase)
- ai_instructions.md (instructions)
```

### Step 2: Receive Changes

The external AI should return changes in unified diff format:

```diff
--- a/src/generators/example.js
+++ b/src/generators/example.js
@@ -10,7 +10,7 @@
 function generateQuestion(params, level) {
     const min = params.min_value;
-    const max = params.max_value;
+    const max = params.max_value || 100;

     return {
```

**Save the response:**
1. Copy the entire diff block (including ` ```diff ` markers)
2. Save as `changes.patch` (or any `.patch` filename)
3. Remove the markdown code block markers (` ``` `) if present

**What if the AI doesn't follow the format?**

If the AI returns full file contents instead of diffs:
- Remind it to use unified diff format
- Reference `ai_instructions.md`
- Provide an example from the instructions file
- Try a different AI if it consistently fails

## Phase 3: Import and Apply Changes

### Step 1: Run Import Script

```bash
node tools/importAIChanges.js changes.patch
```

### Step 2: Review Preview

The script will show a detailed preview:

```
======================================================================
PREVIEW OF CHANGES
======================================================================

[MODIFIED] src/generators/example.js

  @@ -10,7 +10,7 @@
    function generateQuestion(params, level) {
        const min = params.min_value;
  -     const max = params.max_value;
  +     const max = params.max_value || 100;

        return {

======================================================================

Summary:
  New files:      0
  Modified files: 1
  Deleted files:  0
  Total changes:  1
```

**Color coding:**
- 🟢 Green `+` = Added lines
- 🔴 Red `-` = Removed lines
- ⚪ White space = Context (unchanged)

### Step 3: Confirm Application

The script will prompt:

```
⚠️  This will modify your codebase!
A backup will be created before applying changes.

Do you want to apply these changes? (yes/no):
```

Type `yes` to apply or `no` to cancel.

### Step 4: Automatic Backup

Before applying any changes, the script creates a timestamped backup:

```
📦 Creating backup...
✅ Backup created: .backups/2025-01-24T10-30-45-123Z
```

**Backup location:** `.backups/[timestamp]/`

All modified files are copied to the backup directory before any changes are made.

### Step 5: Apply Changes

```
🚀 Applying changes...

   src/generators/example.js...
   ✅ Changes applied successfully

🔍 Validating JavaScript syntax...
✅ No syntax errors detected

======================================================================
IMPORT COMPLETE
======================================================================

✅ Successful: 1
❌ Failed:     0

📦 Backup location: .backups/2025-01-24T10-30-45-123Z

🎉 All changes applied successfully!
```

### Step 6: Verify Changes

After import:

1. **Review the changes** in your editor
2. **Test the application** to ensure it works
3. **Run your test suite** if you have one
4. **Commit to git** if satisfied

**If something goes wrong:**

Restore from backup:
```bash
# Windows (PowerShell)
Copy-Item -Path .backups/[timestamp]/* -Destination . -Recurse -Force

# Mac/Linux
cp -r .backups/[timestamp]/* .
```

## Advanced Usage

### Targeted Exports

Export specific parts of your codebase:

**Export only generators:**
```bash
node tools/exportForExternalAI.js src/generators
```

**Export core engine only:**
```bash
node tools/exportForExternalAI.js src/core
```

**Export specific module:**
```bash
node tools/exportForExternalAI.js src/generators
# Then ask AI to work only on specific files
```

### Custom Exclusions

Add temporary exclusions by editing the `EXCLUSIONS` array in `exportForExternalAI.js`:

```javascript
const EXCLUSIONS = [
    // ... existing exclusions ...

    // Temporarily exclude work-in-progress files
    'src/generators/experimental.js',
    'src/wip/',
];
```

### Multiple Patch Files

Apply multiple patch files sequentially:

```bash
node tools/importAIChanges.js part1.patch
node tools/importAIChanges.js part2.patch
node tools/importAIChanges.js part3.patch
```

Each creates a separate backup.

### Handling Complex Changes

**New files:**
```diff
--- /dev/null
+++ b/src/generators/new_generator.js
@@ -0,0 +1,10 @@
+export function generateQuestion(params, level) {
+    // New file content
+}
```

**Deleted files:**
```diff
--- a/src/generators/old_generator.js
+++ /dev/null
@@ -1,10 +0,0 @@
-export function generateQuestion(params, level) {
-    // This file will be deleted
-}
```

### Syntax Validation

The import script performs basic JavaScript syntax validation after applying changes.

**If validation fails:**
```
⚠️  Syntax validation warnings:

  - src/generators/example.js: Unexpected token '}'

You may need to fix these syntax errors manually.
```

This is a warning, not an error - changes are still applied. Fix syntax errors manually in your editor.

## Troubleshooting

### Problem: Export includes unwanted files

**Solution:** Add exclusion patterns to `EXCLUSIONS` array

Edit `tools/exportForExternalAI.js` and add patterns:
```javascript
const EXCLUSIONS = [
    // ... existing exclusions ...

    // Add your custom exclusions
    'my_tests/',
    'temp_files/',
    '*_backup.js',
    '*.bak',
];
```

### Problem: External AI returns full files instead of diffs

**Solution:**
1. Remind the AI to read `ai_instructions.md`
2. Provide an example from the instructions
3. Ask it to "regenerate as a unified diff patch"
4. Try a different AI system if it persists

### Problem: Import fails with "context mismatch"

**Cause:** The file has changed since export, and the patch can't find the expected lines.

**Solutions:**
1. Re-export with current codebase
2. Ask the AI to regenerate with more context (10+ lines)
3. Apply changes manually using the patch as a guide

### Problem: Import succeeds but introduces bugs

**Solution:** Restore from backup

```bash
# Find the backup
ls .backups/

# Restore (replace [timestamp] with actual timestamp)
cp -r .backups/[timestamp]/* .
```

Then review the patch more carefully before re-applying.

### Problem: No preview shown, just errors

**Cause:** Patch file format is incorrect

**Check:**
1. File starts with `--- a/path/to/file`
2. Has `+++ b/path/to/file` on next line
3. Hunks start with `@@ -old +new @@`
4. Change lines start with ` `, `-`, or `+`
5. No extra whitespace or markdown formatting

### Problem: Can't find patch file

**Error:** `❌ Error: Patch file not found: changes.patch`

**Solutions:**
1. Check filename spelling
2. Check file is in current directory
3. Use full path: `node tools/importAIChanges.js C:/full/path/to/changes.patch`

## Best Practices

### 1. Export Scope

✅ **Do:**
- Use targeted exports for specific tasks
- Include relevant documentation files
- Exclude sensitive files (.env, credentials)

❌ **Don't:**
- Export everything unnecessarily (bloats context)
- Export compiled/generated files
- Export node_modules or .git

### 2. Working with External AI

✅ **Do:**
- Always share `ai_instructions.md`
- Be specific about what you want changed
- Ask for one logical change at a time
- Verify the AI understands the format

❌ **Don't:**
- Assume the AI will follow format automatically
- Request too many unrelated changes at once
- Accept full file replacements instead of diffs

### 3. Applying Changes

✅ **Do:**
- Review the preview carefully
- Keep backups until satisfied
- Test thoroughly after applying
- Commit to git in logical chunks

❌ **Don't:**
- Apply without reviewing
- Delete backups immediately
- Apply multiple patches without testing between them

### 4. Backup Management

Backups are stored in `.backups/[timestamp]/`

**Cleanup:**
```bash
# List all backups
ls .backups/

# Remove old backups (keep recent ones)
rm -rf .backups/2025-01-01T*

# Remove all backups (dangerous!)
rm -rf .backups/
```

Add to `.gitignore`:
```gitignore
.backups/
external_ai_export.md
```

## Security Considerations

### What Gets Exported

The export script respects these exclusions by default:
- `.env*` - Environment variables
- `.git/` - Git internal files
- `node_modules/` - Dependencies
- `.claude/` - Claude Code config
- Credential files

### Sensitive Data

Before exporting:

1. **Review export contents:**
   ```bash
   node tools/exportForExternalAI.js
   # Open external_ai_export.md and review
   ```

2. **Check for:**
   - API keys or passwords
   - Internal URLs or endpoints
   - Personally identifiable information
   - Proprietary algorithms

3. **Exclude sensitive files:**
   ```gitignore
   # Add to .export-scope
   config/secrets.js
   src/api/private-endpoints.js
   ```

### External AI Platforms

When sharing code with external AI:
- Use platforms with clear privacy policies
- Check if your data is used for training
- Consider using local/self-hosted AI for sensitive code
- Remove customer data or sanitize examples

## File Reference

### Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `ai_instructions.md` | Guide for external AI | Project root |
| `exportForExternalAI.js` | Export script (edit EXCLUSIONS array) | tools/ |

### Generated Files

| File | Purpose | Auto-generated? |
|------|---------|-----------------|
| `external_ai_export.md` | Exported codebase | Yes (by export script) |
| `changes.patch` | Changes from AI | No (you create this) |
| `.backups/[timestamp]/` | Automatic backups | Yes (by import script) |

### Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `tools/exportForExternalAI.js` | Export codebase | `node tools/exportForExternalAI.js` |
| `tools/importAIChanges.js` | Import changes | `node tools/importAIChanges.js <patch-file>` |

## Examples

### Example 1: Add a New Feature

**1. Export generators and documentation:**
```bash
# Edit .export-scope to include:
src/generators/**/*.js
src/curriculum/parameters.js
!CLAUDE.md
!PARAMETER_SCHEMA.md

# Run export
node tools/exportForExternalAI.js
```

**2. Share with ChatGPT:**
```
I need to add a new generator for Year 3 fractions. Please:

1. Create src/generators/F01_Y3_FRAC_recognition.js
2. Add parameters to src/curriculum/parameters.js
3. Follow the existing patterns in other generators

Return as unified diff format per ai_instructions.md.
```

**3. Receive and apply patch:**
```bash
# Save response as new_fraction_generator.patch
node tools/importAIChanges.js new_fraction_generator.patch

# Review preview, type "yes" to apply
# Test the new generator
# Commit to git
```

### Example 2: Refactor Existing Code

**1. Export specific file:**
```bash
# Edit .export-scope:
src/generators/N01_NPV_counting.js
!CLAUDE.md

node tools/exportForExternalAI.js
```

**2. Request refactoring:**
```
This generator has some code duplication. Please:

1. Extract the sequence generation logic into a helper function
2. Add JSDoc comments
3. Improve variable names for clarity

Return as unified diff format.
```

**3. Apply and test:**
```bash
node tools/importAIChanges.js refactor.patch
# Review changes
# Run tests
# Commit if good, restore from backup if issues
```

### Example 3: Fix Multiple Bugs

**1. Export affected files:**
```bash
# .export-scope:
src/generators/bug_file1.js
src/generators/bug_file2.js
src/core/validator.js

node tools/exportForExternalAI.js
```

**2. Request fixes:**
```
Please fix these bugs:

1. bug_file1.js line 45: Off-by-one error in range
2. bug_file2.js: Missing null check for params
3. validator.js: Incorrect decimal comparison

Return as unified diff with all fixes.
```

**3. Apply and verify:**
```bash
node tools/importAIChanges.js bug_fixes.patch
# Manual verification
# Run test suite
# Commit fixes
```

## Summary

This workflow provides a safe, structured way to collaborate with external AI systems:

✅ **Selective export** - Only share what's needed
✅ **Reliable format** - Battle-tested unified diff format
✅ **Manual review** - Preview changes before applying
✅ **Automatic backups** - Easy rollback if needed
✅ **Validation** - Syntax checking and error detection

**Key principle:** Trust but verify. External AI is a powerful tool, but you're always in control of what gets applied to your codebase.
