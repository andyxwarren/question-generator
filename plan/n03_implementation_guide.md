# N03 Series Implementation Guide
## Place Value & Roman Numerals Modules

---

## Overview

The N03 series introduces **place value understanding** and **Roman numerals** across Years 2-6. This guide provides recommendations for implementing these modules following your existing architecture patterns.

---

## Key Design Decisions

### 1. **Combine Both Concepts in Each Generator**
- Years 2-3: Place value only
- Years 4-6: Place value + Roman numerals
- Use `operations` array to randomly select question types
- This follows your N02 pattern (multiple operation types per generator)

### 2. **Progressive Complexity**
Each year builds on the previous:

| Year | Place Value | Roman Numerals | Number Range |
|------|-------------|----------------|--------------|
| Y2 | Tens, Ones | - | 10-99 |
| Y3 | Hundreds, Tens, Ones | - | 100-999 |
| Y4 | Thousands, Hundreds, Tens, Ones | I to C (1-100) | 1,000-9,999 |
| Y5 | Up to Millions | I to M (1-1,000) + Years | 10,000-1,000,000 |
| Y6 | Up to Ten Millions | (Consolidation) | 1,000,000-10,000,000 |

### 3. **Operation Types**

#### Place Value Operations
- `identify_digit` - "What digit is in the [place]?"
- `identify_place_value` - "What is the value of [digit]?"
- `digit_value` - "What does the digit [X] represent?"
- `compare_place_values` - "Which digit has greater value?"
- `compose_simple` - "What number is [X] tens and [Y] ones?"
- `decompose_simple` - "How many tens and ones?"
- `expanded_form` - "Write in expanded form"
- `standard_from_expanded` - "What is [expanded] in standard form?"
- `zero_value` - "What is the value of 0?"
- `zero_concept` - Understanding zero's role
- `place_comparison` - "Which number has more [place]?"
- `alternative_decomposition` - Alternative ways to partition
- `multiple_representations` - Same value, different forms

#### Roman Numeral Operations (Y4+)
- `roman_to_arabic` - "What is [Roman] in numbers?"
- `arabic_to_roman` - "Write [number] in Roman numerals"
- `roman_compare` - "Which is larger?"
- `roman_order` - "Order these Roman numerals"
- `roman_sequence` - "What comes next?"
- `roman_year` - "What year is this?" (Y5+)
- `roman_complex` - More challenging conversions (Y5+)

---

## File Structure

```
src/
├── curriculum/
│   └── parameters.js                    # Add N03 modules here
├── generators/
│   ├── helpers/
│   │   └── N03_placeValueHelpers.js    # NEW: Place value & Roman helpers
│   ├── N03_Y2_NPV_placevalue.js        # NEW: Year 2 generator
│   ├── N03_Y3_NPV_placevalue.js        # NEW: Year 3 generator
│   ├── N03_Y4_NPV_placevalue.js        # NEW: Year 4 generator (+ Roman)
│   ├── N03_Y5_NPV_placevalue.js        # NEW: Year 5 generator (+ Roman)
│   └── N03_Y6_NPV_placevalue.js        # NEW: Year 6 generator
└── core/
    └── questionEngine.js                # Register new generators
```

---

## Implementation Steps

### Step 1: Add Helper Functions
Create `src/generators/helpers/N03_placeValueHelpers.js` with:

✅ **Place Value Functions:**
- `getDigitAtPlace(num, place)` - Extract digit
- `getPlaceValue(num, place)` - Get value of digit
- `decomposeNumber(num, places)` - Break into parts
- `getExpandedForm(num)` - Generate expanded form
- `parseExpandedForm(expanded)` - Parse back to number

✅ **Roman Numeral Functions:**
- `toRoman(num)` - Convert Arabic → Roman
- `fromRoman(roman)` - Convert Roman → Arabic
- `generateRomanPair(min, max)` - Generate Roman/Arabic pair
- `generateRomanDistractors()` - Create plausible wrong answers
- `getHistoricalYears()` - Common years for Y5

✅ **Utility Functions:**
- `randomInt()`, `randomChoice()`, `shuffle()`
- `formatNumber()`, `generateDistractors()`

### Step 2: Add Parameters to `parameters.js`
For each year (Y2-Y6), add module definition with:
- `places` array (e.g., `['ones', 'tens']`)
- `operations` array (question types for that year)
- `min_value`, `max_value` (number ranges)
- `include_zero` (whether to use numbers with 0s)
- `roman_min`, `roman_max` (for Y4+)
- `roman_years` (for Y5+)

### Step 3: Create Generators
For each year, create a generator file following this pattern:

```javascript
import { helpers } from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    
    // Handle Roman numeral operations
    if (operation.startsWith('roman_')) {
        return generateRomanQuestion(operation, params, level);
    }
    
    // Handle place value operations
    switch(operation) {
        case 'identify_digit':
            return generateIdentifyDigit(params, level);
        // ... other operations
    }
}

export default {
    moduleId: 'N03_YX_NPV',
    generate: generateQuestion
};
```

### Step 4: Register Generators
In `src/core/questionEngine.js`:

```javascript
import placeValueY2Generator from '../generators/N03_Y2_NPV_placevalue.js';
import placeValueY3Generator from '../generators/N03_Y3_NPV_placevalue.js';
import placeValueY4Generator from '../generators/N03_Y4_NPV_placevalue.js';
import placeValueY5Generator from '../generators/N03_Y5_NPV_placevalue.js';
import placeValueY6Generator from '../generators/N03_Y6_NPV_placevalue.js';

registerDefaultGenerators() {
    // ... existing
    this.register(placeValueY2Generator);
    this.register(placeValueY3Generator);
    this.register(placeValueY4Generator);
    this.register(placeValueY5Generator);
    this.register(placeValueY6Generator);
}
```

### Step 5: Test Each Module
For each module, test:
1. All 4 difficulty levels generate questions
2. Questions respect parameter constraints
3. Answers are validated correctly
4. Multi-gap questions work (e.g., decomposition)
5. Roman numerals convert correctly (Y4+)

---

## Question Type Examples

### Place Value Questions

**Identify Digit:**
- "What digit is in the tens place in 347?" → Answer: 4

**Identify Place Value:**
- "In 347, what is the value of the 3?" → Answer: 300

**Digit Value:**
- "In 2,456, what does the digit 4 represent?" → Answer: 400

**Compose/Decompose:**
- "What number is 3 hundreds + 4 tens + 7 ones?" → Answer: 347
- "How many tens and ones in 47?" → Answer: 4,7

**Expanded Form:**
- "Write 347 in expanded form" → Answer: "300 + 40 + 7"

**Zero Understanding:**
- "What is the value of the 0 in 305?" → Answer: 0
- "Which is larger: 305 or 35?" → Answer: 305

### Roman Numeral Questions

**Roman to Arabic:**
- "What is XLVII in numbers?" → Answer: 47

**Arabic to Roman:**
- "Write 47 in Roman numerals" → Answer: XLVII

**Roman Comparison:**
- "Which is larger: XXV or XXX?" → Answer: XXX

**Roman Sequence:**
- "What comes next: X, XX, XXX, ___?" → Answer: XL

**Roman Years (Y5):**
- "What year is MCMXCIV?" → Answer: 1994

---

## Validation Considerations

### Text Input Handling
For decomposition questions, the validator already handles comma-separated values:
```javascript
// Question: "How many tens and ones in 47?"
answer: "4,7"
answers: [4, 7]
```

Your existing validator in `validator.js` will work correctly for these.

### Roman Numeral Validation
Roman numerals should be case-insensitive:
```javascript
// In helper function
export function normalizeRoman(roman) {
    return roman.toUpperCase().trim();
}

// Use in validation
const normalizedAnswer = normalizeRoman(studentAnswer);
const normalizedCorrect = normalizeRoman(question.answer);
```

---

## Difficulty Progression

### Level 1: Beginning
- Smaller numbers (low end of range)
- Simple operations only
- No zeros (Y2-Y3)
- Basic Roman numerals (I-X only for Y4)
- Single-step questions

### Level 2: Developing
- Mid-range numbers
- Introduce zeros
- More operations available
- Intermediate Roman numerals (I-L for Y4)
- Still mostly single-step

### Level 3: Meeting
- Full range
- All standard operations
- Full Roman numeral range for curriculum
- Some multi-step questions
- Alternative representations

### Level 4: Exceeding
- Extended range beyond minimum
- Complex operations
- Alternative decompositions
- Multi-step reasoning
- Challenge questions

---

## Roman Numeral Reference

### Year 4: I to C (1-100)
```
I = 1       VI = 6
II = 2      VII = 7
III = 3     VIII = 8
IV = 4      IX = 9
V = 5       X = 10

XX = 20     L = 50
XXX = 30    XC = 90
XL = 40     C = 100
```

### Year 5: I to M (1-1000)
```
D = 500
M = 1000
```

### Common Historical Years
```
MLXVI = 1066 (Battle of Hastings)
MCCXV = 1215 (Magna Carta)
MDCCLXXVI = 1776 (American Independence)
MCMXIV = 1914 (WWI)
MCMXLV = 1945 (WWII end)
MM = 2000 (Millennium)
MMXXIV = 2024 (Current year)
```

---

## Special Considerations

### Zero Handling
Include questions about zero's role:
- Zero holds place value but has no value itself
- Zero prevents place shifts (305 ≠ 35)
- Important for curriculum understanding

### Alternative Decompositions (Level 4)
Show that numbers can be partitioned differently:
- 47 = 4 tens + 7 ones
- 47 = 3 tens + 17 ones
- 347 = 34 tens + 7 ones

### Roman Numeral Constraints
- Standard form only (e.g., use IV not IIII)
- Validate input format
- Subtractive principle (IV, IX, XL, XC, CD, CM)

### Multi-Gap Questions
For decomposition, students enter comma-separated values:
- Use `answers` array for validation
- Show clear input format in question text
- Example: "Enter as: [tens],[ones]"

---

## Testing Checklist

For each module:
- [ ] Parameters defined with all 4 levels
- [ ] Generator file created
- [ ] Registered in QuestionEngine
- [ ] Level 1 generates appropriate questions
- [ ] Level 2 increases complexity correctly
- [ ] Level 3 meets curriculum requirements
- [ ] Level 4 provides suitable challenge
- [ ] All operation types work correctly
- [ ] Validation handles all answer formats
- [ ] Roman numerals (if applicable) convert correctly
- [ ] Multi-gap questions validate properly
- [ ] UI renders questions correctly

---

## Summary

The N03 series follows your established patterns:

✅ **Parameter-driven**: All constraints in `parameters.js`
✅ **Operation-based**: Like N02, uses operations array
✅ **Progressive levels**: 4 levels of increasing difficulty
✅ **Pure functions**: Generators have no side effects
✅ **Reusable helpers**: Shared utilities in helper file
✅ **Flexible validation**: Works with existing validator

**New concepts:**
- Place value decomposition
- Expanded vs standard form
- Understanding zero's role
- Roman numeral conversion
- Historical years (Y5)

This architecture allows easy expansion and maintenance while providing comprehensive coverage of UK National Curriculum requirements for place value and Roman numerals.
