# LLM Workflow Tools - Instructions

These tools help you export your codebase to share with an LLM and then apply the LLM's suggested changes back to your project.

## Setup

The tools directory contains:
- `concatenateCode.js` - Exports codebase to a single markdown file
- `applyLLMChanges.js` - Applies LLM-generated changes back to codebase
- `llm_workflow_config.json` - Configuration (points to project root)
- `prompt.md` - Template prompt to prepend to exports
- `instructions.md` - This file

## Configuration

The `llm_workflow_config.json` contains:
```json
{
  "projectBasePath": "..",
  "description": "Points to the question-generator root directory"
}
```

The `projectBasePath` is relative to the `tools/` directory.

## Workflow

### Step 1: Export Codebase

Navigate to the project root:
```bash
cd C:\Users\Andyx\Documents\projects\question-generator
```

Run the concatenation script:

**Export entire project:**
```bash
node tools/concatenateCode.js . llm_request.md
```

**Export specific subdirectory (e.g., just generators):**
```bash
node tools/concatenateCode.js "./src/generators" generators_export.md
```

**Export specific subdirectory (e.g., just curriculum layer):**
```bash
node tools/concatenateCode.js "./src/curriculum" curriculum_export.md
```

The output file will be saved in `tools/llm_request.md` (or your specified filename).

### Step 2: Share with LLM

1. Open the generated file (e.g., `tools/llm_request.md`)
2. Copy the entire contents
3. Paste into your LLM conversation
4. Ask the LLM to make changes

**Important:** The LLM must format its response using the special markers documented in `prompt.md`:
- `<!-- FILE_START: path/to/file.js -->` and `<!-- FILE_END: path/to/file.js -->` for new/modified files
- `<!-- DELETE_FILE: path/to/file.js -->` for files to delete

### Step 3: Save LLM Response

Save the LLM's response to `tools/llm_response.md`

### Step 4: Preview Changes (Dry Run)

**Always run in dry-run mode first:**
```bash
node tools/applyLLMChanges.js tools/llm_response.md --dry-run
```

This shows what would change without modifying any files.

### Step 5: Apply Changes

If the dry run looks good:
```bash
node tools/applyLLMChanges.js tools/llm_response.md
```

You'll be prompted to confirm before any files are modified.

## Examples

### Example 1: Export entire project for review
```bash
cd C:\Users\Andyx\Documents\projects\question-generator
node tools/concatenateCode.js . full_export.md
```
Output: `tools/full_export.md`

### Example 2: Export only the generator layer
```bash
node tools/concatenateCode.js "./src/generators" generators_only.md
```
Output: `tools/generators_only.md`

### Example 3: Export curriculum parameters
```bash
node tools/concatenateCode.js "./src/curriculum" curriculum_only.md
```
Output: `tools/curriculum_only.md`

### Example 4: Apply changes with dry-run first
```bash
# First, preview
node tools/applyLLMChanges.js tools/llm_response.md --dry-run

# If good, apply
node tools/applyLLMChanges.js tools/llm_response.md
```

## What Gets Excluded

The concatenation script automatically excludes:
- `tools/` directory (these scripts themselves)
- `node_modules/`, `.git/`, `.vscode/`, `.idea/`
- Build outputs: `dist/`, `build/`, `out/`
- Binary files: images, PDFs, archives, etc.
- Generated files: `llm_request.md`, `llm_response.md`

See `concatenateCode.js` for the complete exclusion lists.

## Tips

1. **Always commit your changes to git before applying LLM changes** - This gives you an easy way to revert if needed.

2. **Use dry-run mode first** - Always preview changes with `--dry-run` before applying them.

3. **Export specific directories** - For large codebases, export only the relevant parts to keep context focused.

4. **Check the LLM's output format** - Make sure the LLM used the correct `FILE_START`/`FILE_END` markers before applying changes.

5. **File paths must match exactly** - The paths in the LLM's response must match the paths in the original export (relative to project root).

## Troubleshooting

**"projectBasePath not defined"**
- Make sure `llm_workflow_config.json` exists in the `tools/` directory

**"Markdown file not found"**
- Check the path to your LLM response file
- Paths are relative to where you run the command from

**"No operations were matched"**
- The LLM didn't use the correct marker format
- Check that `<!-- FILE_START: -->` and `<!-- FILE_END: -->` markers are present
- Make sure there are no typos in the markers

**Changes not applied to the right files**
- Check that file paths in the LLM response match the original export paths
- All paths should be relative to the project root
- Use forward slashes `/` in paths, not backslashes `\`
