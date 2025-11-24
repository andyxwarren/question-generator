# Instructions for External AI: How to Return Code Changes

## Overview

You have been provided with an export of a codebase. When making changes, you MUST return your modifications in **unified diff format** (also called patch format). This ensures accuracy and allows the changes to be validated before being applied.

## CRITICAL: Response Format Requirements

### ✅ DO: Return changes as a unified diff

Your response must contain a code block with the unified diff format:

````markdown
```diff
--- a/src/generators/example.js
+++ b/src/generators/example.js
@@ -10,7 +10,7 @@
 function generateQuestion(params, level) {
     const min = params.min_value;
-    const max = params.max_value;
+    const max = params.max_value || 100;

     return {
         text: `What is ${min} + ${max}?`,
```
````

### ❌ DON'T: Return full file contents

Do NOT return complete files like this:

````markdown
```javascript
// Full file content here...
function generateQuestion(params, level) {
    // entire file...
}
```
````

This makes it impossible to apply changes accurately and risks overwriting unrelated code.

## Unified Diff Format Specification

### Header Format
```diff
--- a/path/to/file.js
+++ b/path/to/file.js
```

- Use `--- a/` for the original file path
- Use `+++ b/` for the modified file path
- Path must be relative to project root
- Must use forward slashes `/` (even on Windows)

### Hunk Header Format
```diff
@@ -10,7 +10,7 @@
```

- Format: `@@ -old_start,old_count +new_start,new_count @@`
- `old_start`: Starting line number in original file
- `old_count`: Number of lines in original
- `new_start`: Starting line number in modified file
- `new_count`: Number of lines in modified
- If only 1 line, count can be omitted: `@@ -10 +10,2 @@`

### Change Lines
```diff
 unchanged line (starts with space)
-removed line (starts with minus)
+added line (starts with plus)
```

- Context lines (unchanged) start with a single space
- Removed lines start with `-`
- Added lines start with `+`
- Include 3 lines of context before and after changes
- More context is better for accuracy

## Examples

### Example 1: Simple Change
**Task:** Change the max value default from 50 to 100

```diff
--- a/src/generators/N01_Y1_NPV_counting.js
+++ b/src/generators/N01_Y1_NPV_counting.js
@@ -15,7 +15,7 @@ export function generateQuestion(params, level) {
     const min = params.min_value || 0;
-    const max = params.max_value || 50;
+    const max = params.max_value || 100;
     const step = params.step_size || 1;

     const start = min + Math.floor(Math.random() * (max - min));
```

### Example 2: Multiple Changes in One File
**Task:** Add validation and update return value

```diff
--- a/src/core/validator.js
+++ b/src/core/validator.js
@@ -8,6 +8,11 @@ export function validateAnswer(userAnswer, correctAnswer, questionType) {
     if (!userAnswer || userAnswer.trim() === '') {
         return false;
     }
+
+    // Validate input is not null or undefined
+    if (userAnswer == null || correctAnswer == null) {
+        return false;
+    }

     // Normalize both answers
     const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
@@ -45,7 +50,7 @@ export function validateAnswer(userAnswer, correctAnswer, questionType) {
             return Math.abs(userNum - correctNum) < 0.0001;
         }
     } catch (e) {
-        return false;
+        return { valid: false, error: e.message };
     }

     return false;
```

### Example 3: Multiple Files
**Task:** Update two related files

```diff
--- a/src/curriculum/parameters.js
+++ b/src/curriculum/parameters.js
@@ -25,7 +25,7 @@ export const moduleParameters = {
             step_sizes: [1, 2, 5],
             min_value: 0,
-            max_value: 20,
+            max_value: 30,
             directions: ['forwards'],
             start_from: 'zero_only'
         },

--- a/src/generators/N01_Y1_NPV_counting.js
+++ b/src/generators/N01_Y1_NPV_counting.js
@@ -15,7 +15,7 @@ export function generateQuestion(params, level) {
     // Use parameters from curriculum
-    const max = params.max_value || 20;
+    const max = params.max_value || 30;
     const step = params.step_sizes[0] || 1;

     return generateCountingSequence(max, step);
```

### Example 4: Adding New Function
**Task:** Add a new helper function

```diff
--- a/src/generators/helpers/mathHelpers.js
+++ b/src/generators/helpers/mathHelpers.js
@@ -45,6 +45,23 @@ export function generateRandomNumber(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }

+/**
+ * Generates a random decimal number within a range
+ * @param {number} min - Minimum value (inclusive)
+ * @param {number} max - Maximum value (inclusive)
+ * @param {number} decimalPlaces - Number of decimal places (1-3)
+ * @returns {number} Random decimal number
+ */
+export function generateRandomDecimal(min, max, decimalPlaces = 1) {
+    const multiplier = Math.pow(10, decimalPlaces);
+    const randomNum = Math.random() * (max - min) + min;
+    return Math.round(randomNum * multiplier) / multiplier;
+}
+
 export function isEven(num) {
     return num % 2 === 0;
 }
```

## Common Mistakes to Avoid

### ❌ Incorrect Context
```diff
@@ -10,3 +10,3 @@
-    const max = params.max_value;
+    const max = params.max_value || 100;
```
**Problem:** No context lines - hard to locate the exact change

### ✅ Correct Context
```diff
@@ -9,7 +9,7 @@
 function generateQuestion(params, level) {
     const min = params.min_value;
-    const max = params.max_value;
+    const max = params.max_value || 100;
     const step = params.step_size;

     return {
```

### ❌ Wrong Line Numbers
```diff
@@ -1,7 +1,7 @@
 function generateQuestion(params, level) {
```
**Problem:** Line 1 doesn't contain this function - line numbers must be accurate

### ❌ Inconsistent Whitespace
```diff
-    const max = params.max_value;
+        const max = params.max_value || 100;
```
**Problem:** Different indentation will cause patch to fail

### ✅ Exact Whitespace Match
```diff
-    const max = params.max_value;
+    const max = params.max_value || 100;
```

### ❌ Windows Path Separators
```diff
--- a\src\generators\example.js
+++ b\src\generators\example.js
```
**Problem:** Use forward slashes `/`, not backslashes `\`

### ✅ Correct Path Format
```diff
--- a/src/generators/example.js
+++ b/src/generators/example.js
```

## How to Generate Unified Diffs

### Option 1: Manual Creation
1. Identify the exact file and line numbers
2. Copy 3+ lines of context before the change
3. Show the old line(s) with `-` prefix
4. Show the new line(s) with `+` prefix
5. Copy 3+ lines of context after the change
6. Calculate correct line numbers for hunk header

### Option 2: Use Git (if you have access to the codebase)
```bash
# Make your changes to files
git diff > changes.patch
```

### Option 3: Use diff command (if you have original and modified files)
```bash
diff -u original.js modified.js > changes.patch
```

## Validation Checklist

Before submitting your diff, verify:

- ✅ File paths use forward slashes and start with `a/` and `b/`
- ✅ Line numbers in hunk headers are accurate
- ✅ Context lines start with a space (not tabs)
- ✅ Removed lines start with `-`
- ✅ Added lines start with `+`
- ✅ Whitespace (spaces/tabs) matches exactly
- ✅ At least 3 lines of context before and after changes
- ✅ All changed files are included
- ✅ No full file contents, only diffs

## What Happens Next

1. You provide the unified diff in your response
2. The human runs `node tools/importAIChanges.js your_response.patch`
3. The script shows a preview of all changes
4. The human reviews and approves/rejects changes
5. Changes are applied automatically if approved

## Questions?

If you're unsure about:
- **Line numbers:** Include more context (5-10 lines) so the patch can fuzzy-match
- **Multiple changes:** Create separate hunks or separate diffs for each change
- **New files:** Use `/dev/null` as the original file path:
  ```diff
  --- /dev/null
  +++ b/path/to/newfile.js
  @@ -0,0 +1,10 @@
  +// New file contents here
  ```

## Summary

**The golden rule:** Your entire response should be a valid unified diff that can be saved to a `.patch` file and applied with standard patching tools. When in doubt, include more context rather than less.
