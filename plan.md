Here are detailed instructions for an LLM agent to refactor the N01 counting generators:

---

# Task: Refactor N01 Counting Generators to Use Shared Helpers

## Objective
Extract duplicate code from N01_Y1 through N01_Y5 counting generators into a shared helper file, following the pattern already established by N02 generators with `numberHelpers.js`.

## Step 1: Create the Shared Helper File

**Action:** Create a new file at `src/generators/helpers/countingHelpers.js`

**Content:** Copy the following complete implementation:

```javascript
/**
 * Counting Helpers
 * 
 * Shared utility functions for N01 question generators
 * (Counting in multiples)
 */

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get starting value based on start_from parameter
 * Handles all start_from modes: zero_only, zero_or_twenty, zero_or_multiple, any
 * Also handles Y5's start_range parameter
 */
export function getStartValue(params, step) {
    const { start_from, min_value, max_value, start_range } = params;

    if (start_from === 'zero_only') {
        return 0;
    } else if (start_from === 'zero_or_twenty') {
        // For Y1 Level 1 - will be adjusted by caller based on direction
        return 0;
    } else if (start_from === 'zero_or_multiple') {
        const multiples = [0, step, step * 2, step * 3, step * 4];
        return randomChoice(multiples.filter(m => m <= max_value / 2));
    } else if (start_from === 'any') {
        // For Y5, use start_range if provided
        if (start_range) {
            return randomInt(start_range[0], start_range[1]);
        }
        // Otherwise calculate from min/max
        const range = max_value - min_value;
        const rawStart = min_value + randomInt(0, Math.floor(range / 2));
        return Math.floor(rawStart / step) * step;
    }

    return 0;
}

/**
 * Generate sequence array
 */
export function generateSequence(start, step, length, direction) {
    const sequence = [];
    const multiplier = direction === 'forwards' ? 1 : -1;

    for (let i = 0; i < length; i++) {
        sequence.push(start + (i * step * multiplier));
    }

    return sequence;
}

/**
 * Get gap positions for fill-in-the-blank questions
 */
export function getGapPositions(sequenceLength, gapsCount, gapPosition) {
    const positions = [];

    if (gapPosition === 'end') {
        positions.push(sequenceLength - 1);
    } else if (gapPosition === 'start') {
        positions.push(0);
    } else if (gapPosition === 'middle') {
        positions.push(Math.floor(sequenceLength / 2));
    } else if (gapPosition === 'random') {
        // Generate unique random positions
        const available = Array.from({length: sequenceLength}, (_, i) => i);
        for (let i = 0; i < gapsCount; i++) {
            const idx = randomInt(0, available.length - 1);
            positions.push(available[idx]);
            available.splice(idx, 1);
        }
    }

    return positions.slice(0, gapsCount).sort((a, b) => a - b);
}

export default {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPositions
};
```

## Step 2: Update Each N01 Generator

For **each** of the following files:
- `src/generators/N01_Y1_NPV_counting.js`
- `src/generators/N01_Y2_NPV_counting.js`
- `src/generators/N01_Y3_NPV_counting.js`
- `src/generators/N01_Y4_NPV_counting.js`
- `src/generators/N01_Y5_NPV_counting.js`

**Action:** Perform these modifications:

### 2a. Add Import Statement
At the **top of the file**, after the file header comment, add:

```javascript
import {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPositions
} from './helpers/countingHelpers.js';
```

### 2b. Remove Duplicate Helper Functions
**Delete** the following functions entirely (they now come from the import):
- `randomChoice()`
- `randomInt()`
- `getStartValue()`
- `generateSequence()`
- `getGapPositions()`

### 2c. Keep Module-Specific Logic
**DO NOT DELETE** the following:
- `generateQuestion()` function - this is the main generator
- `generateQuestionByType()` function - this handles question rendering
- The export statement at the bottom

### 2d. Special Case for Y1
In `N01_Y1_NPV_counting.js` only, **keep** the special handling for `zero_or_twenty` in the `generateQuestion` function:

```javascript
// Special handling for Level 1 (zero_or_twenty)
if (params.start_from === 'zero_or_twenty') {
    if (direction === 'forwards') {
        start = 0;
    } else {
        start = 20;
    }
}
```

This is Y1-specific curriculum logic, not a shared helper.

### 2e. Special Case for Y5
In `N01_Y5_NPV_counting.js`, note that it uses `params.powers_of_10` instead of `params.step_sizes`. The code should read:

```javascript
// Y5 uses powers_of_10 instead of step_sizes
const step = randomChoice(params.powers_of_10);
```

Keep this as-is - the helper functions work with both.

## Step 3: Verify Each Generator Structure

After refactoring, each N01 generator should have this structure:

```javascript
/**
 * [File header comment]
 */

import {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPositions
} from './helpers/countingHelpers.js';

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // Extract parameters (Y1-Y4 use step_sizes, Y5 uses powers_of_10)
    const step = randomChoice(params.step_sizes || params.powers_of_10);
    const direction = randomChoice(params.directions);
    const { sequence_length, gaps_count, gap_position, min_value, max_value } = params;

    // Get starting value
    let start = getStartValue(params, step);

    // Special handling if needed (Y1 zero_or_twenty logic only)
    // [Y1-specific code here if applicable]

    // Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max_value - (step * (sequence_length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min_value);
    } else {
        const minStart = min_value + (step * (sequence_length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max_value);
    }

    // Generate full sequence
    const fullSequence = generateSequence(start, step, sequence_length, direction);

    // Choose question type
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction, level) {
    // [Keep existing implementation]
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_[YEAR]_NPV',  // Appropriate module ID
    generate: generateQuestion
};
```

## Step 4: Test the Changes

**Action:** After refactoring all five files, test the application:

1. Start the development server (see CLAUDE.md for instructions)
2. Navigate to each Year 1-5 counting module in the UI
3. Generate questions at all 4 difficulty levels for each module
4. Verify that:
   - Questions generate without errors
   - Questions display correctly
   - Answer validation works
   - All question types (fill_blanks, next_number, multiple_choice) work

## Step 5: Final Verification Checklist

Confirm:
- ✅ New file `src/generators/helpers/countingHelpers.js` exists with all 5 helper functions
- ✅ All 5 N01 generators import from the new helper file
- ✅ All 5 N01 generators have deleted the duplicate helper functions
- ✅ All 5 N01 generators still have their `generateQuestion()` and `generateQuestionByType()` functions
- ✅ Y1 special case for `zero_or_twenty` is preserved
- ✅ Y5 uses `powers_of_10` correctly
- ✅ All generators export correctly with their moduleId
- ✅ Application runs without errors
- ✅ Questions generate correctly for all years and levels

## Expected Outcome

After this refactor:
- **Code reduction:** Each N01 generator should be ~60-80 lines shorter
- **Maintainability:** Changes to counting logic only need to happen in one place
- **Consistency:** Matches the pattern already established by N02 generators
- **No functional changes:** All questions should generate exactly as before

## Notes

- **DO NOT modify** `src/curriculum/parameters.js` - parameters stay separate as curriculum data
- **DO NOT modify** `src/core/questionEngine.js` - no changes needed to registration
- The helper file exports both named exports (for selective importing) and a default export (for convenience)
- This refactor is purely about code organization - no behavior should change

---

**End of Instructions**