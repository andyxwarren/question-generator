# UK National Curriculum Mathematics Question Generator - Codebase Context

## Project Overview

This is a UK National Curriculum-aligned mathematics practice application using a **parameter-based architecture**. The codebase is organized into three layers:

1. **Curriculum Layer** (`src/curriculum/`) - Defines curriculum modules and parameters
2. **Generator Layer** (`src/generators/`) - Pure functions that generate questions
3. **Engine & UI Layer** (`src/core/` and `src/ui/`) - Question orchestration and user interface

## Architecture Principles

- **Parameter-Driven**: All question constraints come from `parameters.js`, not hardcoded in generators
- **Pure Functions**: Generators have no side effects and can be called repeatedly
- **Registry Pattern**: QuestionEngine maintains a Map of generators keyed by moduleId
- **Metadata-Driven**: All generators use Schema v2.0 with comprehensive metadata

## Key Files to Know

- `src/curriculum/parameters.js` - All module definitions with 4 difficulty levels
- `src/generators/[MODULE_ID]_*.js` - Individual question generators
- `src/core/questionEngine.js` - Registry and orchestration
- `src/core/validator.js` - Answer validation
- `CLAUDE.md` - Comprehensive developer documentation

## Your Task

Can you review my v2 parameter schema here: src\core\schema.js and then let me know how to modify the my existing generators, helpers and parameters?

location of key resources:
schema: src\core\schema.js
generators and helpers: src\generators
parameters: src\curriculum\parameters

## Output Format (CRITICAL)

When you provide modified code, you **MUST** follow this exact format for the automated script to work:

### For Modified or New Files:

```markdown
<!-- FILE_START: path/to/file.js -->
```javascript
// ENTIRE file content goes here
// Include the complete file, not just changes
```
<!-- FILE_END: path/to/file.js -->
```

### For Deleted Files:

```markdown
<!-- DELETE_FILE: path/to/obsolete/file.js -->
```

### Important Rules:

1. **Complete Files Only**: Provide the ENTIRE file content, not diffs or snippets
2. **Path Accuracy**: Use the exact relative paths from the input (relative to project root)
3. **Use Forward Slashes**: Always use `/` in paths, not `\`
4. **Only Affected Files**: Only include files that changed, were created, or need deletion
5. **Explanations Outside Markers**: Add explanations before/after the markers, not inside them

### Example Output:

```markdown
I've updated the Year 3 counting generator to fix the issue with negative numbers.

<!-- FILE_START: src/generators/N01_Y3_NPV_counting.js -->
```javascript
export function generateQuestion(params, level) {
    // Complete updated file content
    return question;
}

export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};
```
<!-- FILE_END: src/generators/N01_Y3_NPV_counting.js -->

I also created a new helper function for formatting.

<!-- FILE_START: src/generators/helpers/formatHelpers.js -->
```javascript
// Complete new file content
export function formatNumber(num) {
    return num.toLocaleString();
}
```
<!-- FILE_END: src/generators/helpers/formatHelpers.js -->

And removed the obsolete legacy file.

<!-- DELETE_FILE: src/generators/legacy/oldHelper.js -->

These changes should resolve the issue.
```

---

## Codebase Follows Below

All file paths below are relative to the project root: `C:\Users\Andyx\Documents\projects\question-generator`

---
