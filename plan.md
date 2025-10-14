# Quick Reference: N02 Implementation for LLM Agent

## Instructions for LLM Agent

You are implementing 5 new curriculum modules (N02_Y2_NPV through N02_Y6_NPV) for a UK National Curriculum mathematics question generator. Follow the implementation guide exactly.

---

## Files You Will Create

### New Files (7 total):
1. `src/generators/helpers/numberHelpers.js` - Shared utility functions
2. `src/generators/N02_Y2_NPV_readwrite.js` - Year 2 generator
3. `src/generators/N02_Y3_NPV_readwrite.js` - Year 3 generator
4. `src/generators/N02_Y4_NPV_readwrite.js` - Year 4 generator
5. `src/generators/N02_Y5_NPV_readwrite.js` - Year 5 generator
6. `src/generators/N02_Y6_NPV_readwrite.js` - Year 6 generator

### Files You Will Modify (2 total):
1. `src/curriculum/parameters.js` - Add 5 new parameter objects
2. `src/core/questionEngine.js` - Add 5 new import statements and registrations

---

## Implementation Order

### Phase 1: Create Helpers
1. Create directory: `src/generators/helpers/`
2. Create `numberHelpers.js` with complete code from implementation guide PART 2

### Phase 2: Add Parameters
1. Open `src/curriculum/parameters.js`
2. Add all 5 parameter objects from implementation guide PART 1
3. Place them after existing modules in the `MODULES` constant

### Phase 3: Create Generators
1. For each year (2-6), create generator file using template from PART 3
2. Replace `N02_Y[X]_NPV` with correct module ID throughout
3. Remove operation cases not used by that year
4. Ensure import path is correct: `'./helpers/numberHelpers.js'`

### Phase 4: Register Generators
1. Open `src/core/questionEngine.js`
2. Add 5 import statements
3. Add 5 register calls in `registerDefaultGenerators()`

### Phase 5: Test
Run through testing procedures in PART 5

---

## Key Patterns to Follow

### Parameter Structure
```javascript
'N02_YX_NPV': {
    id: 'N02_YX_NPV',
    name: 'Display name',
    description: 'Curriculum statement',
    icon: '🔤',
    yearGroup: 'Year X',
    strand: 'Number and Place Value',
    substrand: 'Read, write, order and compare numbers',
    ref: 'N2',
    parameters: {
        1: { /* level 1 */ },
        2: { /* level 2 */ },
        3: { /* level 3 */ },
        4: { /* level 4 */ }
    }
}
```

### Generator Structure
```javascript
import { helpers } from './helpers/numberHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    switch(operation) {
        case 'operation_name':
            return generateOperationName(params, level);
        // ... more cases
    }
}

// Individual generator functions for each operation
function generateOperationName(params, level) {
    // Return question object with:
    // - text
    // - type
    // - answer
    // - options (for multiple choice)
    // - hint
    // - module
    // - level
}

export default {
    moduleId: 'N02_YX_NPV',
    generate: generateQuestion
};
```

### Question Object Structure
```javascript
{
    text: "Question text",
    type: 'multiple_choice' | 'text_input' | 'symbol_selection',
    answer: "correct answer as string",
    options: [...],  // For multiple choice
    hint: "Helpful hint",
    module: 'N02_YX_NPV',
    level: 1-4
}
```

---

## Operation Routing Guide

Each generator needs a switch statement routing operations. Here's what each year needs:

### Year 2 Operations
- `identify_numeral`
- `one_more`, `one_less`
- `numeral_to_word`, `word_to_numeral`
- `compare_two`
- `use_symbols`
- `order_two`, `order_three`, `order_four`
- `complete_statement`
- `true_false`
- `between`

### Year 3 Operations (adds)
- `ten_more`, `ten_less`
- `hundred_more`, `hundred_less`
- `order_five`
- `place_value_comparison`
- `complex_more_less`

### Year 4 Operations (adds)
- `thousand_more`, `thousand_less`
- `round_to_ten`, `round_to_hundred`, `round_to_thousand`

### Year 5 Operations (adds)
- `ten_thousand_more`, `ten_thousand_less`
- `hundred_thousand_more`, `hundred_thousand_less`
- `order_six`
- `round_to_ten_thousand`, `round_to_hundred_thousand`

### Year 6 Operations (adds)
- `million_more`, `million_less`
- `ten_million_more`, `ten_million_less`
- `place_value_digit`
- `round_to_million`

---

## Critical Implementation Details

### 1. Number Formatting
- **Display**: Always use `.toLocaleString()` (e.g., "1,234,567")
- **Answer Storage**: String format
- **Validation**: Accept with or without commas

### 2. Word Range vs Number Range
- Year 2: Words to 100, numbers to 120
- Year 3+: Words to 100 (selected), numbers much larger
- Focus on numerals for large numbers

### 3. Step Operations
```javascript
function generateStepQuestion(params, level, step, direction) {
    // Ensure result stays in range
    if (direction === 'more') {
        number = randomInt(min_value, max_value - step);
    } else {
        number = randomInt(min_value + step, max_value);
    }
    const answer = applyStep(number, step, direction);
    // ...
}
```

### 4. Rounding Questions
```javascript
// Ensure number is NOT already a multiple
do {
    number = randomInt(min_value + base, max_value - base);
} while (number % base === 0);
```

### 5. Symbol Questions
- Year 2: Introduces <, >, =
- Year 3+: Uses them extensively
- Always include all three in options

---

## Testing Quick Checks

For each year, verify:
1. ✅ Module appears in UI
2. ✅ All 4 levels generate
3. ✅ Number ranges correct
4. ✅ Operations work
5. ✅ Answers validate
6. ✅ No console errors

---

## Common Mistakes to Avoid

1. ❌ Wrong import path for helpers
2. ❌ Forgot to replace `N02_Y[X]_NPV` with actual ID
3. ❌ Including operations not in parameters
4. ❌ Not handling number formatting in answers
5. ❌ Forgetting to register in questionEngine
6. ❌ Not sorting options randomly
7. ❌ Missing comma in MODULES object
8. ❌ Wrong module ID in question object

---

## Validation Before Completion

Run through this checklist:

### Code Files
- [ ] `numberHelpers.js` created and complete
- [ ] All 5 generator files created
- [ ] All generators have correct module IDs
- [ ] All imports are correct
- [ ] All operations are implemented

### Parameters
- [ ] All 5 parameter objects added to `parameters.js`
- [ ] All properly comma-separated
- [ ] All have 4 levels
- [ ] All ranges are correct

### Registration
- [ ] All 5 generators imported in `questionEngine.js`
- [ ] All 5 generators registered
- [ ] No syntax errors

### Functionality
- [ ] All years generate questions
- [ ] All levels work
- [ ] Answers validate correctly
- [ ] UI shows all modules
- [ ] No console errors

---

## If You Get Stuck

### Reference Order
1. First: Check the implementation guide (complete code examples)
2. Second: Check the specification (detailed operation descriptions)
3. Third: Look at N02_Y1_NPV (working example)
4. Fourth: Check CLAUDE.md (architecture overview)

### Debug Process
1. Check browser console for errors
2. Verify import paths are correct
3. Verify module IDs match everywhere
4. Test one year at a time
5. Test one level at a time
6. Test one operation at a time

---

## Success Indicators

You're done when:
- ✅ 5 new modules appear in UI
- ✅ All 20 levels (4 per year × 5 years) work
- ✅ Questions display correctly
- ✅ Answers validate correctly
- ✅ No errors in console
- ✅ All operations generate correctly
- ✅ Number formatting works
- ✅ Progressive difficulty is evident

---

## File Locations Summary

```
src/
├── curriculum/
│   └── parameters.js                      [MODIFY: Add 5 parameter objects]
├── generators/
│   ├── helpers/
│   │   └── numberHelpers.js              [CREATE: Shared utilities]
│   ├── N02_Y1_NPV_readwrite.js           [EXISTS: Reference this]
│   ├── N02_Y2_NPV_readwrite.js           [CREATE: Year 2]
│   ├── N02_Y3_NPV_readwrite.js           [CREATE: Year 3]
│   ├── N02_Y4_NPV_readwrite.js           [CREATE: Year 4]
│   ├── N02_Y5_NPV_readwrite.js           [CREATE: Year 5]
│   └── N02_Y6_NPV_readwrite.js           [CREATE: Year 6]
└── core/
    └── questionEngine.js                  [MODIFY: Add 5 imports + registrations]
```

---

## Start Here

1. Read the complete implementation guide carefully
2. Create helper file first (foundation)
3. Add all parameters (configuration)
4. Create generators one at a time (Y2, then Y3, then Y4, then Y5, then Y6)
5. Register all generators (connection)
6. Test each year (verification)

The implementation guide has ALL the code you need. Follow it sequentially!