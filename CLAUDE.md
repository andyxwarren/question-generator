# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UK National Curriculum mathematics practice application for Key Stage 1 & 2 students (ages 5-11). It generates unlimited unique counting sequence questions across 5 year groups (Year 1-5) with 4 difficulty levels per year group. The application is built with vanilla JavaScript ES6 modules, no dependencies, and runs entirely client-side.

## Running the Application

**IMPORTANT:** ES6 modules require a web server. Do NOT open `index.html` directly via `file://` protocol.

### Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Node.js
```bash
npm install -g http-server
http-server -p 8000
```

### VS Code
Install "Live Server" extension, right-click `index.html`, and select "Open with Live Server"

## Architecture

### Core System Components

The application uses a **three-layer parameter-driven architecture**:

```
CURRICULUM PARAMETERS (src/curriculum/parameters.js)
    ↓ defines ranges and constraints per level
QUESTION GENERATORS (src/generators/*.js)
    ↓ generates questions using parameters
DELIVERY APPLICATION (src/ui/app.js + src/core/)
    ↓ presents questions to students
```

### Key Design Patterns

1. **Registry Pattern**: `QuestionEngine` (src/core/questionEngine.js) maintains a Map of registered generators. All generators must export `{ moduleId, generate }`.

2. **Level-Centric Parameter Structure**: Parameters are organized by level (1-4), not by parameter type. Each level contains all its configuration together:
   ```javascript
   parameters: {
       1: { step_sizes: [...], min_value: 0, max_value: 30, ... },
       2: { step_sizes: [...], min_value: 0, max_value: 50, ... },
       // etc.
   }
   ```

3. **Singleton Pattern**: QuestionEngine and Validator are exported as singleton instances.

4. **Pure Functions**: Generator functions have no side effects and always return new question objects.

## File Structure

```
src/
├── curriculum/
│   └── parameters.js          # Module definitions with level-based parameters
├── generators/
│   ├── N01_Y1_NPV_counting.js # Year 1 counting generator
│   ├── N01_Y2_NPV_counting.js # Year 2 (special: tens_from_any)
│   ├── N01_Y3_NPV_counting.js # Year 3
│   ├── N01_Y4_NPV_counting.js # Year 4
│   └── N01_Y5_NPV_counting.js # Year 5 (special: powers_of_10, negative numbers)
├── core/
│   ├── questionEngine.js      # Generator registry and orchestration
│   └── validator.js           # Answer validation (handles comma-separated multi-gap)
└── ui/
    └── app.js                 # Main application UI logic
```

## Working with Modules and Generators

### Module Naming Convention

Module IDs follow the pattern: `N01_Y[X]_NPV` where:
- `N01` = Number strand, objective 1
- `Y[X]` = Year group (1-5)
- `NPV` = Number and Place Value

### Parameter Structure

Each module has 4 difficulty levels (1-4):
- **Level 1**: Beginning
- **Level 2**: Developing
- **Level 3**: Meeting
- **Level 4**: Exceeding

Access parameters via: `getParameters(moduleId, level)` from `src/curriculum/parameters.js`

### Generator Requirements

Every generator must:
1. Export a default object with `{ moduleId, generate }`
2. Implement `generate(params, level)` function
3. Return question objects with structure:
   ```javascript
   {
       text: string,           // Question text
       type: 'text_input' | 'multiple_choice',
       answer: string,         // Correct answer (comma-separated for multi-gap)
       answers?: array,        // Array of answers for multi-gap questions
       hint?: string,          // Optional hint
       module: string,         // Module ID
       level: number          // Difficulty level (1-4)
   }
   ```

### Question Types

1. **fill_blanks**: Shows sequence with gaps, student fills in missing numbers
   - Multi-gap support: answer stored as comma-separated string AND array

2. **next_number**: Shows sequence minus last number, ask for next

3. **multiple_choice**: Shows sequence minus last, provides 4 options

### Special Cases

**Year 2 (N01_Y2_NPV)**:
- Has `tens_from_any` parameter for counting in tens from any starting number
- Special handling in `getStartValue()` function

**Year 5 (N01_Y5_NPV)**:
- Uses `powers_of_10` parameter instead of `step_sizes`
- Supports negative numbers (min_value can be negative)
- Uses `start_range` parameter instead of calculating from min/max

## Multi-Gap Questions

Multi-gap questions (gaps_count > 1) are supported:

**Generator side:**
```javascript
return {
    answer: answers.join(','),  // "10,20,30"
    answers: answers,           // [10, 20, 30]
    // ...
};
```

**Validator side:**
- Handles comma-separated validation
- Normalizes and sorts values for comparison

**UI side:**
- Renders multiple text inputs when `question.answers.length > 1`
- Collects all inputs and joins with commas before validation

## Common Helper Functions

All generators share these helpers (copy into new generators):

- `randomChoice(array)`: Select random item from array
- `randomInt(min, max)`: Generate random integer in range
- `getStartValue(params, step)`: Determine starting value based on `start_from` parameter
- `generateSequence(start, step, length, direction)`: Create number sequence
- `getGapPositions(sequenceLength, gapsCount, gapPosition)`: Calculate where gaps should appear

## Validation System

The validator (src/core/validator.js) supports:
- Exact string matching (normalized, lowercase, whitespace removed)
- Numeric comparison with tolerance (handles floating point precision)
- Comma-separated answers for multi-gap questions
- Multiple choice validation

Always use: `validator.validate(question, studentAnswer)` which returns `{ isCorrect, feedback, normalizedAnswer }`

## Adding a New Module

1. **Define module** in `src/curriculum/parameters.js`:
   - Add to `MODULES` object with all 4 levels of parameters
   - Ensure `moduleId` matches across all locations

2. **Create generator** in `src/generators/`:
   - Copy an existing generator as template
   - Update `moduleId` in export
   - Modify question generation logic if needed
   - Handle any special parameters (like Year 2's `tens_from_any`)

3. **Register generator** in `src/core/questionEngine.js`:
   - Import the new generator
   - Add to `registerDefaultGenerators()` method

4. **Test thoroughly**:
   - Generate questions for all 4 levels
   - Verify answers validate correctly
   - Check that parameters produce valid sequences
   - Ensure no out-of-bounds values

## Important Implementation Notes

### Sequence Bounds Checking

**Critical**: Always ensure generated sequences stay within `min_value` and `max_value`:

```javascript
if (direction === 'forwards') {
    const maxStart = max_value - (step * (sequence_length - 1));
    start = Math.min(start, maxStart);
} else {
    const minStart = min_value + (step * (sequence_length - 1));
    start = Math.max(start, minStart);
}
```

### Question Uniqueness

Questions are given unique IDs: `${moduleId}_${timestamp}_${randomString}` but there's currently no deduplication system across sessions.

### Answer Normalization

The validator normalizes answers by:
- Converting to string
- Trimming whitespace
- Converting to lowercase
- Removing all internal whitespace

This means "10, 20, 30" equals "10,20,30"

## Module Card Rendering

Module cards are auto-generated from the `MODULES` object in parameters.js. Each module should have:
- `id`: Module identifier
- `name`: Display name (shown on card)
- `description`: Curriculum objective
- `icon`: Emoji icon (currently all use 🔢)
- `yearGroup`: "Year 1" through "Year 5"
- `strand`: "Number and Place Value"
- `substrand`: "Counting (in multiples)"

## Question Flow

1. User selects module from grid
2. App calls `questionEngine.generate(moduleId, level, count)` for each of 4 levels
3. Questions are rendered with level grouping
4. User submits answers
5. Validator checks each answer
6. Results shown with per-level breakdown

## CSS Architecture

Styles use:
- CSS Grid for module cards (responsive)
- Flexbox for question layout
- CSS animations (fadeIn) for section transitions
- Gradient backgrounds (purple theme: #667eea to #764ba2)
- Visual feedback: green borders for correct, red for incorrect

Multi-gap inputs have special styling in `.multi-input-container` class.

## Known Patterns to Follow

1. **Don't modify `questionEngine.js` logic** when adding modules - it's generic and handles all modules through registration
2. **Keep generators pure** - no side effects, localStorage access, or DOM manipulation
3. **Always provide both forms of answers** for multi-gap questions (string and array)
4. **Module IDs must be consistent** across parameters.js, generator file export, and imports in questionEngine.js
5. **Level numbering is 1-indexed** (levels 1, 2, 3, 4) not 0-indexed

## Testing Checklist for New Modules

- [ ] Module appears in UI grid
- [ ] All 4 levels generate questions without errors
- [ ] Generated numbers stay within min/max bounds
- [ ] Sequences use correct step sizes from parameters
- [ ] Direction (forwards/backwards) matches parameter
- [ ] Multi-gap questions display correct number of inputs
- [ ] Single-gap questions display single input
- [ ] Multiple choice has 4 options
- [ ] All question types validate correctly
- [ ] Hints display when present
- [ ] Module ID matches everywhere

## Common Pitfalls

1. **Forgetting to update moduleId** in generator export - causes registration failures
2. **Sequences going out of bounds** - always check maxStart/minStart calculations
3. **Year 5 using step_sizes** instead of powers_of_10 - causes errors
4. **Not handling negative numbers** in Year 5 - breaks start value calculations
5. **Inconsistent parameter names** between levels - causes undefined errors
6. **Not sorting comma-separated answers** in validator - causes false negatives

## References

See `plan.md` for detailed migration guide from old parameter structure to new level-centric structure. This document contains step-by-step instructions for implementing new modules following the current architecture.
