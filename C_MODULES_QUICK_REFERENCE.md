# UK Calculations Modules - Quick Reference Card

## File Locations

```
src/
├── generators/
│   ├── helpers/
│   │   └── calculationHelpers.js       # All arithmetic helpers
│   ├── C01_Y1_CALC_number_bonds.js    # ✅ Template 1 (Simple)
│   ├── C05_Y5_CALC_number_properties.js # ✅ Template 2 (Properties)
│   └── C09_Y6_CALC_bodmas.js          # ✅ Template 3 (Complex)
└── curriculum/
    └── parameters/
        └── C_calculations.js           # ✅ All 39 module parameters
```

---

## The 39 Modules at a Glance

| Module | Year | Curriculum Focus | Status | Template |
|--------|------|-----------------|--------|----------|
| **C01 Series: Mental Add/Subtract** |
| C01_Y1 | 1 | Number bonds to 20 | ✅ DONE | Template 1 |
| C01_Y2 | 2 | Facts to 100 | ⬜ TODO | Template 1 |
| C01_Y3 | 3 | 3-digit mental | ⬜ TODO | Template 1 |
| C01_Y5 | 5 | Large numbers | ⬜ TODO | Template 1 |
| **C02 Series: Written Add/Subtract** |
| C02_Y1 | 1 | To 20 | ⬜ TODO | Template 1 |
| C02_Y2 | 2 | 2-digit methods | ⬜ TODO | Template 1 |
| C02_Y3 | 3 | Columnar 3-digit | ⬜ TODO | Template 1 |
| C02_Y4 | 4 | Columnar 4-digit | ⬜ TODO | Template 1 |
| C02_Y5 | 5 | Columnar 5+ digits | ⬜ TODO | Template 1 |
| **C03 Series: Estimate/Inverse/Check** |
| C03_Y2 | 2 | Inverse operations | ⬜ TODO | Template 3 |
| C03_Y3 | 3 | Estimate & check | ⬜ TODO | Template 3 |
| C03_Y4 | 4 | 4-digit estimation | ⬜ TODO | Template 3 |
| C03_Y5 | 5 | Rounding to check | ⬜ TODO | Template 3 |
| C03_Y6 | 6 | Appropriate accuracy | ⬜ TODO | Template 3 |
| **C04 Series: Add/Subtract Problems** |
| C04_Y1 | 1 | One-step problems | ⬜ TODO | Template 3 |
| C04_Y2 | 2 | Word problems | ⬜ TODO | Template 3 |
| C04_Y3 | 3 | Problem solving | ⬜ TODO | Template 3 |
| C04_Y4 | 4 | Two-step problems | ⬜ TODO | Template 3 |
| C04_Y5 | 5 | Multi-step problems | ⬜ TODO | Template 3 |
| C04_Y6 | 6 | Complex multi-step | ⬜ TODO | Template 3 |
| **C05 Series: Number Properties** |
| C05_Y5 | 5 | Factors/primes/squares | ✅ DONE | Template 2 |
| C05_Y6 | 6 | Common factors/multiples | ⬜ TODO | Template 2 |
| **C06 Series: Mental Multiply/Divide** |
| C06_Y2 | 2 | Tables 2, 5, 10 | ⬜ TODO | Template 1 |
| C06_Y3 | 3 | Tables 3, 4, 8 | ⬜ TODO | Template 1 |
| C06_Y4 | 4 | Tables to 12×12 | ⬜ TODO | Template 1 |
| C06_Y5 | 5 | Powers of 10 | ⬜ TODO | Template 1 |
| C06_Y6 | 6 | Large numbers | ⬜ TODO | Template 1 |
| **C07 Series: Written Multiply/Divide** |
| C07_Y2 | 2 | Statements | ⬜ TODO | Template 1 |
| C07_Y3 | 3 | Written methods | ⬜ TODO | Template 1 |
| C07_Y4 | 4 | Formal written | ⬜ TODO | Template 1 |
| C07_Y5 | 5 | Long mult/short div | ⬜ TODO | Template 1 |
| C07_Y6 | 6 | Long division | ⬜ TODO | Template 1 |
| **C08 Series: Problem Solving** |
| C08_Y1 | 1 | Mult/div problems | ⬜ TODO | Template 3 |
| C08_Y2 | 2 | Properties | ⬜ TODO | Template 3 |
| C08_Y3 | 3 | Scaling | ⬜ TODO | Template 3 |
| C08_Y4 | 4 | Distributive law | ⬜ TODO | Template 3 |
| C08_Y5 | 5 | Complex problems | ⬜ TODO | Template 3 |
| C08_Y6 | 6 | Multi-operation | ⬜ TODO | Template 3 |
| **C09 Series: Order of Operations** |
| C09_Y6 | 6 | BODMAS | ✅ DONE | Template 3 |

**Progress: 3/39 (7.7%) Complete**

---

## Template Selection Guide

### Template 1: Simple Operations (`C01_Y1_CALC_number_bonds.js`)
**Use for:**
- Mental calculations (C01 series)
- Basic written methods (C02 series)
- Times tables (C06, C07 series)

**Characteristics:**
- 5-7 operations
- Multiple choice or text input
- Clear, straightforward questions
- Word problem integration

---

### Template 2: Number Properties (`C05_Y5_CALC_number_properties.js`)
**Use for:**
- Number properties (C05 series)

**Characteristics:**
- 8-10 operations
- Property identification
- Relationship questions
- Mathematical reasoning

---

### Template 3: Complex Problems (`C09_Y6_CALC_bodmas.js`)
**Use for:**
- Estimation/checking (C03 series)
- Word problems (C04, C08 series)
- Order of operations (C09)

**Characteristics:**
- 8-12 operations
- Multi-step problems
- Expression generation
- Context-heavy questions

---

## Essential Helpers from calculationHelpers.js

### Basic Arithmetic
```javascript
generateAddition(minResult, maxResult, options)
generateSubtraction(minResult, maxResult, options)
generateMultiplication(minFactor, maxFactor, tables)
generateDivision(minDividend, maxDividend, options)
```

### Number Properties
```javascript
isPrime(n)
getFactors(n)
getFactorPairs(n)
getCommonFactors(a, b)
getGCF(a, b)
getLCM(a, b)
getMultiplesUpTo(n, max)
isPerfectSquare(n)
isPerfectCube(n)
getPrimeFactors(n)
```

### Word Problems
```javascript
getRandomName()
getRandomItem(category)
getAdditionContext(a, b, answer)
getSubtractionContext(a, b, answer)
getMultiplicationContext(a, b, answer)
getDivisionContext(dividend, divisor, quotient, remainder)
```

### Estimation
```javascript
roundTo(num, place)
estimateOperation(a, b, operation, roundingPlace)
```

### Inverse Operations
```javascript
getInverseOperation(operation)
generateInverseFact(a, b, operation)
```

---

## Question Object Schema

```javascript
{
    text: string,              // Question text
    type: 'text_input' | 'multiple_choice',
    answer: string,            // ⚠️ ALWAYS STRING
    options: Array,            // For multiple choice
    hint: string,              // Optional hint
    module: string,            // Module ID
    level: number              // 1-4
}
```

---

## Common Code Patterns

### Import Block
```javascript
import {
    generateAddition,
    getRandomName,
    getRandomItem
} from './helpers/calculationHelpers.js';

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';
```

### Main Generator Structure
```javascript
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'operation1':
            return generateOperation1(params, level);
        case 'operation2':
            return generateOperation2(params, level);
        default:
            return generateOperation1(params, level);
    }
}
```

### Operation Function Template
```javascript
function generateOperationName(params, level) {
    // 1. Generate problem data
    const { a, b, answer } = generateAddition(0, params.max_value);

    // 2. Create question text
    const text = `What is ${a} + ${b}?`;

    // 3. Generate distractors
    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    // 4. Return question object
    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(), // ⚠️ CONVERT TO STRING
        hint: 'Add the two numbers',
        module: 'MODULE_ID',
        level: level
    };
}
```

### Export Block
```javascript
export default {
    moduleId: 'MODULE_ID',
    generate: generateQuestion
};
```

---

## Testing Snippet

```javascript
// Quick test for a generator
import generator from './C01_Y2_CALC_mental_to_100.js';
import { getParameters } from '../curriculum/parameters.js';

// Test all levels
for (let level = 1; level <= 4; level++) {
    const params = getParameters('C01_Y2_CALC', level);
    const question = generator.generate(params, level);
    console.log(`\nLevel ${level}:`);
    console.log(question.text);
    console.log(`Answer: ${question.answer}`);
    if (question.options) {
        console.log(`Options: ${question.options.join(', ')}`);
    }
}
```

---

## Registration in questionEngine.js

```javascript
// Import
import C01_Y2_Generator from '../generators/C01_Y2_CALC_mental_to_100.js';

// Register (inside registerDefaultGenerators)
this.register(C01_Y2_Generator);
```

---

## Checklist for Each Generator

- [ ] Copy appropriate template
- [ ] Update module ID everywhere
- [ ] Check parameters.js for operations list
- [ ] Implement all operations
- [ ] Use params.max_value (not hardcoded)
- [ ] Convert answer to string
- [ ] Generate plausible distractors
- [ ] Write helpful hints
- [ ] Test all 4 levels
- [ ] Verify curriculum alignment
- [ ] Register in questionEngine.js
- [ ] Test in UI

---

## Common Mistakes to Avoid

❌ **Don't:**
```javascript
// Hardcode ranges
const num = randomInt(1, 20);

// Return numbers
answer: 42

// Create 10+ operations
case 'operation1': ...
case 'operation2': ...
// ... 10 more cases
```

✅ **Do:**
```javascript
// Use parameters
const num = randomInt(1, params.max_value);

// Return strings
answer: answer.toString()

// Create 3-5 distinct operations
case 'bonds_to_target': ...
case 'missing_addend': ...
case 'fact_families': ...
```

---

## Time Estimates

- **Simple generator** (C01, C02, C06): 1-2 hours
- **Medium generator** (C03, C04, C07, C08): 2-3 hours
- **Complex generator** (C05): 3-4 hours
- **Total for all 36**: 60-90 hours

---

## Quick Links

- **Full Guide:** `CALC_MODULES_IMPLEMENTATION_GUIDE.md`
- **Summary:** `CALC_MODULES_SUMMARY.md`
- **Architecture:** `CLAUDE.md`
- **Templates:**
  - `src/generators/C01_Y1_CALC_number_bonds.js`
  - `src/generators/C05_Y5_CALC_number_properties.js`
  - `src/generators/C09_Y6_CALC_bodmas.js`
- **Helpers:** `src/generators/helpers/calculationHelpers.js`
- **Parameters:** `src/curriculum/parameters/C_calculations.js`

---

**Last Updated:** 2025-10-18
