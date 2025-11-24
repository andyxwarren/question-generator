# External AI Collaboration Tools

Simple tools for exporting your codebase to external AI systems and importing changes back safely.

## Quick Reference

### Export Codebase

```bash
# Export entire project
node tools/exportForExternalAI.js

# Export specific folder
node tools/exportForExternalAI.js src
node tools/exportForExternalAI.js src/generators

# Get help
node tools/exportForExternalAI.js --help
```

**Output:** `external_ai_export.md` in project root

### Import Changes

```bash
node tools/importAIChanges.js changes.patch
```

**What happens:**
1. Shows preview of all changes
2. Asks for confirmation
3. Creates automatic backup
4. Applies changes
5. Validates syntax

## How It Works

### 1. Export

**Exclusion-based system:** All files included except those matching patterns in `EXCLUSIONS` array.

**Default exclusions:**
- System folders: `.git/`, `node_modules/`, `.vscode/`
- Sensitive files: `*.env`, `*.key`, credentials
- Build artifacts: `dist/`, `build/`, `coverage/`
- Test files: `test_*.js`, `*.test.js`
- Images: `*.png`, `*.jpg`, `*.pdf`

**Customize exclusions:** Edit `EXCLUSIONS` array at top of `exportForExternalAI.js`

```javascript
const EXCLUSIONS = [
    'node_modules/',        // Folders (use trailing slash)
    '*.log',                // File types (use wildcard)
    'secret.js',            // Specific files (exact name)
    'test_*.js',            // Patterns (glob style)
    '**/*.backup',          // Recursive patterns
];
```

### 2. Share with External AI

Send two files to ChatGPT/Claude/etc:
1. `external_ai_export.md` - Your code
2. `ai_instructions.md` - Format requirements

**Important:** External AI must return changes as **unified diff format** (patch files).

### 3. Import

Safely applies changes with:
- ✅ Preview before applying
- ✅ Manual confirmation
- ✅ Automatic backup
- ✅ Syntax validation
- ✅ Detailed report

**Restore from backup if needed:**
```bash
# Backups stored in: .backups/[timestamp]/
cp -r .backups/[timestamp]/* .
```

## Examples

### Export Only Generators

```bash
node tools/exportForExternalAI.js src/generators
```

Share with AI and ask:
```
Please refactor these generator files to use consistent naming.
Return changes as unified diff format per ai_instructions.md.
```

### Fix Bugs Across Multiple Files

```bash
# Export specific files by exporting parent folder
node tools/exportForExternalAI.js src

# Share and request fixes
# Receive changes.patch

# Apply changes
node tools/importAIChanges.js changes.patch
```

### Add New Feature

```bash
# Export relevant context
node tools/exportForExternalAI.js src

# Request new feature from AI
# Save response as new_feature.patch

# Review and apply
node tools/importAIChanges.js new_feature.patch
```

## Common Patterns

### Exclude Work-in-Progress Files

Edit `exportForExternalAI.js`:
```javascript
const EXCLUSIONS = [
    // ... existing exclusions ...
    'src/wip/',
    'src/**/experimental.js',
];
```

### Export Without Tests

Add to `EXCLUSIONS`:
```javascript
    '**/*.test.js',
    '**/*.spec.js',
    'test_*.js',
```

### Export Only TypeScript/JavaScript

Add to `EXCLUSIONS`:
```javascript
    '*.css',
    '*.html',
    '*.json',
    '*.md',
```

Then export:
```bash
node tools/exportForExternalAI.js src
```

## Troubleshooting

### Export includes unwanted files

**Fix:** Add patterns to `EXCLUSIONS` array in `exportForExternalAI.js`

### AI returns full files instead of diffs

**Fix:** Remind AI to read `ai_instructions.md` and use unified diff format

### Import fails with "context mismatch"

**Fix:** Re-export with current code, ask AI to regenerate with more context

### Changes break code

**Fix:** Restore from backup in `.backups/[timestamp]/`

## File Locations

```
project-root/
├── tools/
│   ├── exportForExternalAI.js    # Export script (edit EXCLUSIONS here)
│   └── importAIChanges.js        # Import script
├── ai_instructions.md            # Share with external AI
├── external_ai_export.md         # Generated export (gitignored)
└── .backups/                     # Auto-created backups (gitignored)
    └── [timestamp]/
```

## Tips

✅ **Do:**
- Export specific folders to reduce context size
- Review preview carefully before applying
- Keep backups until satisfied
- Test thoroughly after applying changes

❌ **Don't:**
- Export sensitive files (add to EXCLUSIONS)
- Apply patches without reviewing
- Delete backups immediately
- Export unnecessary files (images, builds)

## Help

Run scripts with `--help` flag:
```bash
node tools/exportForExternalAI.js --help
```

For detailed documentation, see: `EXTERNAL_AI_WORKFLOW.md` in project root.
