# Schema v2.0 Refactoring Instructions

**Purpose:** Complete guide for refactoring question generators from Schema v1.x to Schema v2.0

**Target Audience:** AI coding assistants or developers performing the refactor

**Estimated Time per Generator:** 30-60 minutes including testing

---

## Table of Contents

1. [Overview of Schema v2.0](#overview-of-schema-v20)
2. [Parameter Changes Required](#parameter-changes-required)
3. [Generator Refactoring Steps](#generator-refactoring-steps)
4. [Module-Specific Instructions](#module-specific-instructions)
5. [Testing Requirements](#testing-requirements)
6. [Consolidation Guidelines](#consolidation-guidelines)
7. [Common Patterns and Examples](#common-patterns-and-examples)

---

## Overview of Schema v2.0

### Core Principles

1. **Separate Data from Presentation:** Store raw values, describe formatting separately
2. **Template-Based Questions:** Use `[placeholder]` notation for parameterized text
3. **Locale Support:** Enable multi-locale rendering from single data structure
4. **Metadata-Driven Rendering:** All formatting information in valueMetadata
5. **Type Safety:** Explicit types and constraints for all values

### Schema Comparison

#### OLD Schema (v1.x) - DO NOT USE
```javascript
{
    text: "What is £3.50 + £2.25?",              // ❌ Formatted text, hardcoded symbols
    type: 'text_input',
    answer: "5.75",                               // ❌ String answer, no metadata
    hint: "Add the pounds and pence separately",
    module: 'M03_Y2_MEAS',
    level: 2
}
```

#### NEW Schema (v2.0) - TARGET FORMAT
```javascript
{
    // Template with [placeholders]
    questionTemplate: "What is [amount1] + [amount2]?",

    // Rendered version (human-readable, for testing/debugging)
    questionRendered: "What is £3.50 + £2.25?",

    type: 'text_input',

    // Raw values object (NO formatting, symbols, or units)
    values: {
        amount1: 3.50,
        amount2: 2.25
    },

    // Metadata object (describes HOW to format each value)
    valueMetadata: {
        amount1: {
            type: "number",        // Data type: "number", "string", "array"
            prefix: "£",           // Text before value (currency symbol, units)
            suffix: "",            // Text after value (units, labels)
            decimals: 2            // Decimal places (for numbers)
        },
        amount2: {
            type: "number",
            prefix: "£",
            suffix: "",
            decimals: 2
        }
    },

    // Raw answer (NOT formatted)
    answer: 5.75,                  // Number, not string "5.75"

    // Optional hints (both template and rendered)
    hintTemplate: "Add the pounds and pence separately",
    hintRendered: "Add the pounds and pence separately",

    // Locale flags (REQUIRED)
    locale: 'en-GB',               // Always 'en-GB' for UK curriculum
    universal: false,              // false for money/measurements, true for pure numbers

    // Module identification (existing fields, keep as-is)
    module: 'M03_Y2_MEAS',
    level: 2
}
```

---

## Parameter Changes Required

### No Changes to parameters.js Required

**CRITICAL:** The `src/curriculum/parameters.js` file does **NOT** need modification. All parameter definitions remain identical.

**Why:** Parameters define WHAT questions to generate (ranges, operations, difficulty). Schema v2.0 changes HOW questions are formatted, not what they contain.

**Exception:** If consolidating multiple year generators, no parameter changes are still needed - the consolidated generator will use existing parameters as-is.

---

## Generator Refactoring Steps

### Step 1: Read and Understand Current Generator

1. Open the generator file (e.g., `src/generators/C02_Y3_CALC_written.js`)
2. Identify all operations (functions that generate questions)
3. Note how questions are currently formatted
4. Identify all places where values are formatted (number formatting, currency symbols, units)

### Step 2: Create Values and Metadata Objects

For each question generation function, transform formatted output to raw values:

#### Pattern: Simple Numbers

**BEFORE:**
```javascript
const a = 45;
const b = 23;
return {
    text: `${a} + ${b} = ?`,
    answer: (a + b).toString()
};
```

**AFTER:**
```javascript
const a = 45;
const b = 23;
const answer = a + b;

const values = { a, b };
const valueMetadata = {
    a: { type: "number", prefix: "", suffix: "", decimals: 0 },
    b: { type: "number", prefix: "", suffix: "", decimals: 0 }
};

return {
    questionTemplate: `[a] + [b] = ?`,
    questionRendered: `${a} + ${b} = ?`,
    values,
    valueMetadata,
    answer: answer,  // Raw number, not string
    locale: 'en-GB',
    universal: true,  // Pure numbers are universal
    // ... other fields
};
```

#### Pattern: Money Values

**BEFORE:**
```javascript
const amount = 3.50;
return {
    text: `How much is £${amount.toFixed(2)}?`,
    answer: amount.toFixed(2)
};
```

**AFTER:**
```javascript
const amount = 3.50;

const values = { amount };
const valueMetadata = {
    amount: {
        type: "number",
        prefix: "£",      // Currency symbol goes in metadata
        suffix: "",
        decimals: 2       // Always 2 for money
    }
};

return {
    questionTemplate: `How much is [amount]?`,
    questionRendered: `How much is £${amount.toFixed(2)}?`,
    values,
    valueMetadata,
    answer: amount,  // Raw number
    locale: 'en-GB',
    universal: false,  // Money is locale-specific
    // ... other fields
};
```

#### Pattern: Measurements with Units

**BEFORE:**
```javascript
const distance = 350;
const unit = 'cm';
return {
    text: `What is ${distance} ${unit} in metres?`,
    answer: (distance / 100).toString()
};
```

**AFTER:**
```javascript
const distance = 350;
const unit = 'cm';
const answer = distance / 100;

const values = { distance, unit, targetUnit: 'metres' };
const valueMetadata = {
    distance: {
        type: "number",
        prefix: "",
        suffix: " cm",    // Unit goes in metadata
        decimals: 0
    },
    unit: { type: "string", prefix: "", suffix: "", decimals: 0 },
    targetUnit: { type: "string", prefix: "", suffix: "", decimals: 0 }
};

return {
    questionTemplate: `What is [distance] in [targetUnit]?`,
    questionRendered: `What is ${distance} cm in metres?`,
    values,
    valueMetadata,
    answer: answer,  // Raw number (3.5)
    locale: 'en-GB',
    universal: false,  // Measurements are locale-specific
    // ... other fields
};
```

#### Pattern: Multiple Choice Questions

**BEFORE:**
```javascript
const number = 42;
const options = [40, 42, 44, 46];
return {
    text: `Which number is ${number}?`,
    type: 'multiple_choice',
    options: options,
    answer: number.toString()
};
```

**AFTER:**
```javascript
const number = 42;
const options = [40, 42, 44, 46];

const values = { number };
const valueMetadata = {
    number: { type: "number", prefix: "", suffix: "", decimals: 0 }
};

return {
    questionTemplate: `Which number is [number]?`,
    questionRendered: `Which number is ${number}?`,
    type: 'multiple_choice',
    values,
    valueMetadata,
    options: options,  // Options array stays as-is
    answer: number,    // Raw number, not string
    locale: 'en-GB',
    universal: true,
    // ... other fields
};
```

#### Pattern: [unknown] Placeholder for Gap-Fill Questions

**BEFORE:**
```javascript
const sequence = [5, 10, 15, 20];
const gapIndex = 2;
const answer = sequence[gapIndex];

return {
    text: `What is the missing number? 5, 10, ___, 20`,
    answer: answer.toString()
};
```

**AFTER:**
```javascript
const sequence = [5, 10, 15, 20];
const gapIndex = 2;
const answer = sequence[gapIndex];

// Build values dynamically
const values = {};
const valueMetadata = {};
const templateParts = [];
const displayParts = [];

sequence.forEach((num, idx) => {
    if (idx === gapIndex) {
        templateParts.push('[unknown]');  // Special placeholder for gap
        displayParts.push('___');
        values.unknown = num;             // Value that equals answer
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };
    } else {
        const key = `num${idx + 1}`;
        templateParts.push(`[${key}]`);
        displayParts.push(num.toString());
        values[key] = num;
        valueMetadata[key] = { type: "number", prefix: "", suffix: "", decimals: 0 };
    }
});

return {
    questionTemplate: `What is the missing number? ${templateParts.join(', ')}`,
    questionRendered: `What is the missing number? ${displayParts.join(', ')}`,
    values,
    valueMetadata,
    answer: answer,
    locale: 'en-GB',
    universal: true,
    // ... other fields
};
```

**CRITICAL RULE:** When using `[unknown]` placeholder:
- `values.unknown` MUST equal the `answer` field
- This enables automatic answer validation

#### Pattern: Formatted Numbers (Thousand Separators)

**BEFORE:**
```javascript
const number = 12345;
return {
    text: `What is ${number.toLocaleString('en-GB')}?`,  // "12,345"
    answer: number.toString()
};
```

**AFTER:**
```javascript
const number = 12345;

const values = { number };
const valueMetadata = {
    number: { type: "number", prefix: "", suffix: "", decimals: 0 }
};

// Helper function for rendering
function formatNumber(n) {
    return n.toLocaleString('en-GB');
}

return {
    questionTemplate: `What is [number]?`,
    questionRendered: `What is ${formatNumber(number)}?`,
    values,
    valueMetadata,
    answer: number,  // Raw number without formatting
    locale: 'en-GB',
    universal: true,
    // ... other fields
};
```

### Step 3: Update Hints

If the generator has hints, create both template and rendered versions:

**BEFORE:**
```javascript
{
    hint: `Think: ${a} + ${b}`
}
```

**AFTER:**
```javascript
{
    hintTemplate: `Think: [a] + [b]`,
    hintRendered: `Think: ${a} + ${b}`
}
```

### Step 4: Add Locale Flags

Every question MUST have:

```javascript
{
    locale: 'en-GB',    // Always 'en-GB' for UK National Curriculum
    universal: boolean  // See rules below
}
```

**Universal Flag Rules:**

| Content Type | Universal Value | Reason |
|--------------|----------------|---------|
| Pure numbers (no units, symbols) | `true` | Numbers are universal |
| Arithmetic (5 + 3 = ?) | `true` | Math operations are universal |
| Money (£, $) | `false` | Currency symbols are locale-specific |
| Measurements (cm, inches) | `false` | Units vary by locale |
| Temperature (°C, °F) | `false` | Units vary by locale |
| Time (12hr vs 24hr) | `false` | Formats vary by locale |
| Geometry (angles, shapes) | `true` | Geometry is universal |
| Fractions (1/2, 3/4) | `true` | Fractions are universal |

### Step 5: Ensure Module and Level Fields

Every question MUST include:

```javascript
{
    module: 'MODULE_ID',  // e.g., 'N01_Y3_NPV'
    level: level          // 1, 2, 3, or 4
}
```

If consolidating generators, the module ID should come from a parameter:

```javascript
export function generateQuestion(params, level, moduleId) {
    // ... generation logic ...
    return {
        // ...
        module: moduleId,  // Passed in from factory function
        level: level
    };
}
```

### Step 6: Handle Edge Cases

#### Edge Case 1: String Answers (Expressions)

Some questions have string expression answers like `"15 - 12"`:

**BEFORE:**
```javascript
return {
    answer: `${a} - ${b}`
};
```

**AFTER:**
```javascript
const values = { a, b };
const valueMetadata = {
    a: { type: "number", prefix: "", suffix: "", decimals: 0 },
    b: { type: "number", prefix: "", suffix: "", decimals: 0 }
};

// Answer is still a string expression
const answerExpression = `${a} - ${b}`;

return {
    values,
    valueMetadata,
    answer: answerExpression,  // String is OK for expressions
    // ...
};
```

#### Edge Case 2: Multiple Unknowns

For questions with multiple gaps, use numbered unknowns:

```javascript
const values = {
    unknown1: 5,
    unknown2: 15,
    num2: 10,
    num4: 20
};
const valueMetadata = {
    unknown1: { type: "number", prefix: "", suffix: "", decimals: 0 },
    unknown2: { type: "number", prefix: "", suffix: "", decimals: 0 },
    num2: { type: "number", prefix: "", suffix: "", decimals: 0 },
    num4: { type: "number", prefix: "", suffix: "", decimals: 0 }
};

return {
    questionTemplate: `Fill in the blanks: [unknown1], [num2], [unknown2], [num4]`,
    questionRendered: `Fill in the blanks: ___, 10, ___, 20`,
    values,
    valueMetadata,
    answer: "5,15",  // Comma-separated for multiple answers
    // ...
};
```

#### Edge Case 3: Array Values

For questions with array data (e.g., ordering tasks):

```javascript
const numbers = [45, 23, 67, 12];

const values = { numbers };
const valueMetadata = {
    numbers: {
        type: "array",  // Type is "array"
        prefix: "",
        suffix: "",
        decimals: 0,
        itemType: "number"  // Optional: type of array items
    }
};

return {
    questionTemplate: `Order these numbers: [numbers]`,
    questionRendered: `Order these numbers: ${numbers.join(', ')}`,
    values,
    valueMetadata,
    answer: [12, 23, 45, 67],  // Ordered array or comma-separated string
    // ...
};
```

---

## Module-Specific Instructions

### N01 - Counting Generators (Y1-Y5)

**Status:** ✅ COMPLETED (consolidated into single file)

**Special Notes:**
- Year 5 uses `powers_of_10` parameter instead of `step_sizes`
- Year 5 includes negative numbers
- Dynamic sequence building with numbered keys

**Template Reference:** See `src/generators/N01_NPV_counting.js`

---

### N02 - Read/Write/Order/Compare (Y1-Y6)

**Status:** ✅ COMPLETED (consolidated into single file)

**Operations:** 30+ operations including:
- identify_numeral
- one_more, one_less
- ten_more, ten_less
- order_ascending, order_descending
- compare_numbers
- halfway_between

**Template Reference:** See `src/generators/N02_NPV_readwrite.js`

---

### N03 - Place Value Generators (Y2-Y6)

**Status:** ⚠️ PARTIALLY FEASIBLE for consolidation

**Complexity:** Medium-High (Roman numerals in Y4-Y5)

**Instructions:**

#### Common Operations (All Years)
These can be consolidated:
- identify_digit
- identify_place_value
- digit_value
- compare_place_values
- compose_simple
- decompose_simple
- expanded_form
- standard_from_expanded
- place_comparison
- alternative_decomposition
- multiple_representations

#### Year-Specific Operations (Cannot consolidate)
- **Y2-Y4:** `zero_value` - hardcoded options differ per year
- **Y4:** `zero_concept` - hardcoded quiz questions
- **Y4-Y5:** Roman numeral operations (5-6 functions each)
- **Y6:** `complex_place_value` - advanced multi-step questions

#### Refactoring Approach Options:

**Option A: Partial Consolidation (Recommended)**
1. Create `N03_NPV_placevalue.js` for common place value operations
2. Keep separate files for Roman numerals:
   - `N03_Y4_NPV_roman.js` (Year 4 Roman numerals)
   - `N03_Y5_NPV_roman.js` (Year 5 Roman numerals)
3. Add year-specific routing for zero_value and complex_place_value

**Option B: Individual Refactoring**
1. Refactor each year file individually to Schema v2.0
2. Keep all 5 files separate
3. Extract common helpers to reduce duplication

#### Required Fixes (All Years):
- Move `getPlaceDivisor()` function to `N03_placeValueHelpers.js`
- Replace hardcoded distractor ranges in Y2-Y4:
  - Y2 line 136: `randomInt(1, 90)` → `randomInt(1, params.max_value)`
  - Y3 line 127: `randomInt(1, 900)` → `randomInt(1, params.max_value)`
  - Y4 line 273: `randomInt(1, 9000)` → `randomInt(1, params.max_value)`

---

### N04 - Representation Generators (Y1-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Shared Helpers:**
- `N04_representationHelpers.js`
- `N04_simpleVisuals.js`
- `N04_scenarioTemplates.js`

**Instructions:**
1. Read all 6 generator files (Y1-Y6)
2. Identify common operations and year-specific operations
3. Assess consolidation feasibility
4. Apply Schema v2.0 to all operations
5. Handle visual representations appropriately:
   - Number lines: Store raw positions, generate HTML in renderer
   - Dot diagrams: Store count, generate visual in renderer
   - Ten frames: Store filled/empty counts

---

### N05 - Negative Numbers (Y4-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Files:**
- `N05_Y4_NPV_negatives.js` (175 lines)
- `N05_Y5_NPV_negatives.js` (265 lines)
- `N05_Y6_NPV_negatives.js` (296 lines)

**Special Notes:**
- Y4: Simple backward counting through zero
- Y5: Context-based (temperature, elevation)
- Y6: More complex negative number operations

**Instructions:**
1. Y4 may be simple enough to consolidate with Y5-Y6
2. Context generation (temperature, etc.) should store raw values
3. Handle crossing zero in sequences properly

---

### N06 - Number Problems (Y2-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Word problem generators often have year-specific contexts
2. Store raw values for all numbers in word problems
3. Use templates for question text with [placeholders]

---

### C01 - Mental Calculations

**Status:** ✅ Y2 COMPLETED, Y1/Y3/Y5 remain

**Y2 Operations Completed:**
- simple_problems
- derive_to_100
- tens_and_ones
- related_subtract
- inverse_operations
- fact_families_100
- near_multiples

**Instructions for Y1, Y3, Y5:**
Follow the same pattern as C01_Y2_CALC_mental.js:
1. Each operation gets values and valueMetadata objects
2. Handle multiple choice options as arrays
3. Store expression answers as strings where needed
4. Use [unknown] pattern for missing number problems

---

### C02 - Written Calculations (Y1-Y5)

**Status:** ⏳ NOT YET ANALYZED

**Shared Helper:** Uses columnar calculation formatters

**Instructions:**
1. Store raw operands (e.g., 45, 23, not "45 + 23")
2. Columnar format generation happens in renderer, not generator
3. Focus on extracting raw numbers from current implementations

**Example:**
```javascript
// Columnar addition: 45 + 23
const a = 45;
const b = 23;
const answer = a + b;

const values = { a, b };
const valueMetadata = {
    a: { type: "number", prefix: "", suffix: "", decimals: 0 },
    b: { type: "number", prefix: "", suffix: "", decimals: 0 }
};

return {
    questionTemplate: `[a] + [b] = ?`,
    questionRendered: formatColumnar(a, b, '+'),  // Helper generates visual
    values,
    valueMetadata,
    answer: answer,
    displayFormat: 'columnar',  // Optional hint for renderer
    locale: 'en-GB',
    universal: true,
    // ...
};
```

---

### C03 - Estimation (Y2-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Store exact values, not rounded estimates
2. Multiple choice options should include the estimate
3. Estimation strategy descriptions should use templates

---

### C04 - Problem Solving (Y1-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
Word problems with calculations - similar approach to N06

---

### C05 - Properties of Numbers (Y5-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Files:** Only 2 files
**Instructions:** May not need consolidation, just Schema v2.0 refactor

---

### C06 - Mental Multiply (Y2-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
Similar to C01, likely good consolidation candidate

---

### C07 - Written Multiply (Y2-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
Similar to C02, uses columnar multiplication

---

### C08 - Properties/Problems (Y1-Y6)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
Mixed operations and properties

---

### C09 - Order of Operations (Y6)

**Status:** ⏳ NOT YET ANALYZED

**Files:** Single file (Y6 only)
**Instructions:**
- Just apply Schema v2.0, no consolidation needed
- Store raw numbers and operators
- Expression building uses templates

---

### M01-M09 - Measurement Series

**Status:** ⏳ NOT YET ANALYZED

**Critical:** All measurement questions have `universal: false`

**Instructions:**
1. Store raw numeric values WITHOUT units
2. Units go in metadata suffix: `suffix: " cm"`
3. Money uses prefix: `prefix: "£"`
4. Temperature: Store raw number, units in suffix: `suffix: "°C"`

**Example - Length Conversion:**
```javascript
const length = 350;
const fromUnit = 'cm';
const toUnit = 'm';
const answer = 3.5;

const values = { length, fromUnit, toUnit };
const valueMetadata = {
    length: { type: "number", prefix: "", suffix: " cm", decimals: 0 },
    fromUnit: { type: "string", prefix: "", suffix: "", decimals: 0 },
    toUnit: { type: "string", prefix: "", suffix: "", decimals: 0 }
};

return {
    questionTemplate: `Convert [length] to [toUnit]`,
    questionRendered: `Convert 350 cm to metres`,
    values,
    valueMetadata,
    answer: answer,  // 3.5
    locale: 'en-GB',
    universal: false,  // Measurements are locale-specific
    // ...
};
```

---

### F01-F05 - Fraction Series

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Store fractions as objects or separate numerator/denominator:
   ```javascript
   values: { numerator: 3, denominator: 4 }
   // OR
   values: { fraction: { num: 3, den: 4 } }
   ```
2. Decimal equivalents: Store as raw numbers
3. Mixed numbers: Store whole and fraction parts separately

---

### G01-G04 - Geometry Series

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Angles: Store raw degrees (e.g., 45, not "45°")
2. Coordinates: Store as separate x, y values or array
3. Visual representations: Generate in renderer, store raw data

---

### S01-S03 - Statistics Series

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Data sets: Store as arrays
2. Chart data: Store raw values, generate visuals in renderer

---

### P01-P03 - Position Series

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Coordinates: Store x, y separately
2. Translations: Store vector components
3. Grid positions: Store as coordinates

---

### R01-R04 - Ratio Series (Y6 only)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Ratios: Store as separate values: `{ part1: 2, part2: 3 }`
2. Proportions: Store all components separately

---

### A01-A02 - Algebra Series (Y6 only)

**Status:** ⏳ NOT YET ANALYZED

**Instructions:**
1. Variables: Store as strings in values
2. Coefficients: Store as numbers
3. Expressions: May need to store as structured objects

---

## Testing Requirements

### Test Suite for Each Module

For every refactored generator, create a test file:

**Naming Convention:** `test_MODULE_ID.js`

**Example:** `test_C02_Y3_CALC_written.js`

**Test Structure:**
```javascript
import generator from './src/generators/C02_Y3_CALC_written.js';
import { MODULES } from './src/curriculum/parameters.js';

function validateSchemaV2(question, testName) {
    const errors = [];

    // 1. Check required fields
    if (!question.questionTemplate) errors.push(`Missing questionTemplate`);
    if (!question.questionRendered) errors.push(`Missing questionRendered`);
    if (!question.values) errors.push(`Missing values object`);
    if (!question.valueMetadata) errors.push(`Missing valueMetadata object`);
    if (question.answer === undefined) errors.push(`Missing answer`);
    if (!question.locale) errors.push(`Missing locale`);
    if (question.universal === undefined) errors.push(`Missing universal flag`);

    // 2. Check values are raw (not formatted)
    if (question.values) {
        for (const [key, value] of Object.entries(question.values)) {
            if (typeof value === 'string' && /[£$,]/.test(value)) {
                errors.push(`Value '${key}' appears to be formatted: ${value}`);
            }
        }
    }

    // 3. Check metadata completeness
    if (question.values && question.valueMetadata) {
        const valueKeys = Object.keys(question.values);
        const metadataKeys = Object.keys(question.valueMetadata);

        for (const key of valueKeys) {
            if (!metadataKeys.includes(key)) {
                errors.push(`Missing metadata for value '${key}'`);
            }
        }

        // Check metadata structure
        for (const [key, metadata] of Object.entries(question.valueMetadata)) {
            if (!metadata.type) errors.push(`Missing type in metadata for '${key}'`);
            if (metadata.prefix === undefined) errors.push(`Missing prefix in metadata for '${key}'`);
            if (metadata.suffix === undefined) errors.push(`Missing suffix in metadata for '${key}'`);
            if (metadata.decimals === undefined) errors.push(`Missing decimals in metadata for '${key}'`);
        }
    }

    // 4. Check locale
    if (question.locale !== 'en-GB') {
        errors.push(`Locale should be 'en-GB', got '${question.locale}'`);
    }

    // 5. Check [unknown] pattern
    if (question.questionTemplate && question.questionTemplate.includes('[unknown]')) {
        if (question.values.unknown === undefined) {
            errors.push(`Uses [unknown] but no 'unknown' value provided`);
        }
        if (question.values.unknown !== undefined && question.values.unknown !== question.answer) {
            errors.push(`unknown value should equal answer`);
        }
    }

    // 6. Check hints
    if (question.hintTemplate && !question.hintRendered) {
        errors.push(`Has hintTemplate but missing hintRendered`);
    }

    return errors;
}

// Test all levels
const moduleId = 'C02_Y3_CALC';
const params = MODULES[moduleId].parameters;

for (let level = 1; level <= 4; level++) {
    console.log(`\nTesting Level ${level}...`);

    for (let i = 0; i < 10; i++) {
        const question = generator.generate(params[level], level);
        const errors = validateSchemaV2(question, `L${level}_Q${i+1}`);

        if (errors.length > 0) {
            console.log(`❌ Failed: ${errors.join(', ')}`);
            process.exit(1);
        }
    }

    console.log(`✅ Level ${level}: All tests passed`);
}

console.log('\n✅ ✅ ✅ ALL TESTS PASSED ✅ ✅ ✅');
```

### Consolidated Generator Tests

For consolidated generators, test ALL years and levels:

**Example:** See `test_N01_consolidated.js` or `test_N02_consolidated.js`

**Structure:**
```javascript
const years = [
    { num: 1, moduleId: 'N01_Y1_NPV', generator: N01Generators.Y1 },
    { num: 2, moduleId: 'N01_Y2_NPV', generator: N01Generators.Y2 },
    // ... all years
];

for (const year of years) {
    for (const level of [1, 2, 3, 4]) {
        // Generate and test multiple questions
        for (let i = 0; i < 5; i++) {
            const question = year.generator.generate(params[level], level);
            const errors = validateSchemaV2(question, testName);
            // Assert no errors
        }
    }
}
```

---

## Consolidation Guidelines

### When to Consolidate

Consolidate generators into a single file when ALL of these are true:

1. **Structural Similarity:** All year generators have identical operation structure
2. **Parameter-Driven:** All differences are controlled by parameters, not code
3. **Shared Operations:** 80%+ of operations are common across years
4. **No Year-Specific Logic:** No hardcoded year-specific arrays, contexts, or branching
5. **Same Helper Functions:** All years use the same helper functions

### When NOT to Consolidate

Do NOT consolidate when any of these are true:

1. **Unique Operations:** Substantial year-specific operations (e.g., Roman numerals in Y4-Y5 only)
2. **Complex Context:** Year-specific word problem contexts that can't be parameterized
3. **Single Year:** Module only exists for one year (e.g., C09 Order of Operations is Y6 only)
4. **Different Architectures:** Years use fundamentally different approaches

### Consolidation Pattern

Use the factory pattern for consolidated generators:

```javascript
/**
 * Consolidated MODULE_NAME Generator (All Years)
 */

// Main generator function
export function generateQuestion(params, level, moduleId) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'operation1':
            return generateOperation1(params, level, moduleId);
        case 'operation2':
            return generateOperation2(params, level, moduleId);
        default:
            return generateOperation1(params, level, moduleId);
    }
}

// Operation functions (year-agnostic)
function generateOperation1(params, level, moduleId) {
    // Use params for all configuration
    // No hardcoded year-specific logic

    const values = { /* ... */ };
    const valueMetadata = { /* ... */ };

    return {
        questionTemplate: `...`,
        questionRendered: `...`,
        values,
        valueMetadata,
        answer: /* ... */,
        locale: 'en-GB',
        universal: /* ... */,
        module: moduleId,  // Passed in from factory
        level: level
    };
}

// Factory function
function createYearGenerator(moduleId) {
    return {
        moduleId: moduleId,
        generate: (params, level) => generateQuestion(params, level, moduleId)
    };
}

// Year-specific exports
export const Y1_Generator = createYearGenerator('MODULE_Y1_ID');
export const Y2_Generator = createYearGenerator('MODULE_Y2_ID');
// ... etc

// Default export
export default {
    Y1: Y1_Generator,
    Y2: Y2_Generator,
    // ... etc
};
```

### Updating questionEngine.js

After consolidation, update the import and registration:

**BEFORE:**
```javascript
import moduleY1Generator from '../generators/MODULE_Y1_*.js';
import moduleY2Generator from '../generators/MODULE_Y2_*.js';
// ... 5-6 imports

this.register(moduleY1Generator);
this.register(moduleY2Generator);
// ... 5-6 registrations
```

**AFTER:**
```javascript
// MODULE - Consolidated generator
import MODULEGenerators from '../generators/MODULE_*.js';

// MODULE - Consolidated (all years)
this.register(MODULEGenerators.Y1);
this.register(MODULEGenerators.Y2);
this.register(MODULEGenerators.Y3);
// ... etc
```

---

## Common Patterns and Examples

### Pattern 1: Number Formatting Helper

Many generators need to format numbers for display. Create a helper:

```javascript
/**
 * Format number with thousand separators for UK locale
 */
function formatNumber(n) {
    if (typeof n !== 'number') return n;
    return n.toLocaleString('en-GB');
}

// Usage in questionRendered
const number = 12345;
return {
    questionTemplate: `What is [number]?`,
    questionRendered: `What is ${formatNumber(number)}?`,  // "12,345"
    values: { number },
    // ...
};
```

### Pattern 2: Currency Formatting

```javascript
/**
 * Format money value (always 2 decimal places)
 */
function formatMoney(amount) {
    return `£${amount.toFixed(2)}`;
}

// Usage
const price = 3.5;
return {
    questionTemplate: `How much is [price]?`,
    questionRendered: `How much is ${formatMoney(price)}?`,  // "£3.50"
    values: { price },
    valueMetadata: {
        price: { type: "number", prefix: "£", suffix: "", decimals: 2 }
    },
    // ...
};
```

### Pattern 3: Unit Conversion Questions

```javascript
function generateConversion(params, level, moduleId) {
    const value = randomInt(params.value_range[0], params.value_range[1]);
    const fromUnit = randomChoice(params.from_units);
    const toUnit = randomChoice(params.to_units);

    // Calculate answer based on conversion
    const conversionFactor = getConversionFactor(fromUnit, toUnit);
    const answer = value * conversionFactor;

    const values = { value, fromUnit, toUnit };
    const valueMetadata = {
        value: { type: "number", prefix: "", suffix: ` ${fromUnit}`, decimals: 0 },
        fromUnit: { type: "string", prefix: "", suffix: "", decimals: 0 },
        toUnit: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Convert [value] to [toUnit]`,
        questionRendered: `Convert ${value} ${fromUnit} to ${toUnit}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate: `1 ${fromUnit} = ${conversionFactor} ${toUnit}`,
        hintRendered: `1 ${fromUnit} = ${conversionFactor} ${toUnit}`,
        locale: 'en-GB',
        universal: false,  // Units are locale-specific
        module: moduleId,
        level: level
    };
}
```

### Pattern 4: Word Problems with Context

```javascript
function generateWordProblem(params, level, moduleId) {
    const { a, b, answer } = generateAddition(
        params.result_range[0],
        params.result_range[1]
    );

    const context = randomChoice(params.contexts);  // e.g., ['apples', 'marbles', 'books']

    const values = { a, b, context };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        context: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `You have [a] [context]. You get [b] more. How many [context] do you have now?`,
        questionRendered: `You have ${a} ${context}. You get ${b} more. How many ${context} do you have now?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        locale: 'en-GB',
        universal: true,  // Generic word problems are universal
        module: moduleId,
        level: level
    };
}
```

### Pattern 5: Multiple Choice with Distractors

```javascript
function generateMultipleChoice(params, level, moduleId) {
    const number = randomInt(params.min_value, params.max_value);

    // Generate distractors
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    const values = { number };
    const valueMetadata = {
        number: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Which number is [number]?`,
        questionRendered: `Which number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,  // Array of numbers
        answer: number,    // Raw number
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}
```

---

## Validation Checklist

Before considering a refactor complete, verify:

- [ ] All operations return Schema v2.0 compliant objects
- [ ] No formatted values in `values` object (no `£`, `,`, units)
- [ ] All values have corresponding metadata entries
- [ ] Metadata includes type, prefix, suffix, decimals for ALL values
- [ ] `locale` field is 'en-GB'
- [ ] `universal` field is appropriate (true for numbers, false for measurements/money)
- [ ] `module` and `level` fields present
- [ ] `[unknown]` placeholders have corresponding values that equal answer
- [ ] Hints have both Template and Rendered versions
- [ ] Test suite created and all tests pass
- [ ] No console errors when running test suite
- [ ] Sample questions display correctly in rendered form

---

## Quick Reference: Metadata Types

| Value Type | type | prefix | suffix | decimals | Example |
|------------|------|--------|--------|----------|---------|
| Plain number | "number" | "" | "" | 0 | 42 |
| Decimal | "number" | "" | "" | 2 | 3.14 |
| Money (UK) | "number" | "£" | "" | 2 | £5.50 |
| Length (cm) | "number" | "" | " cm" | 0 | 150 cm |
| Temperature | "number" | "" | "°C" | 1 | 23.5°C |
| Percentage | "number" | "" | "%" | 0 | 75% |
| String label | "string" | "" | "" | 0 | "apples" |
| Array of numbers | "array" | "" | "" | 0 | [1,2,3] |

---

## Getting Help

If you encounter:

1. **Unclear which values to extract:** Look at what's being displayed to the user - those are your values
2. **Uncertain about universal flag:** If it uses money or measurements, `false`. Pure numbers, `true`.
3. **Complex formatting logic:** Store raw values, move formatting to renderer
4. **Year-specific hardcoded arrays:** Consider if they can be parameterized, otherwise keep separate

**Reference Files:**
- Completed examples: `N01_NPV_counting.js`, `N02_NPV_readwrite.js`, `C01_Y2_CALC_mental.js`
- Test examples: `test_N01_consolidated.js`, `test_N02_consolidated.js`, `test_C01_Y2_CALC_mental.js`

---

## Summary

**Goal:** Transform all generators to Schema v2.0 format that separates raw values from formatting

**Key Actions:**
1. Extract all formatted values → raw values in `values` object
2. Create `valueMetadata` object describing how to format each value
3. Add `questionTemplate` with [placeholders]
4. Add `locale` and `universal` flags
5. Ensure `module` and `level` fields present
6. Create test suite validating Schema v2.0 compliance
7. Consolidate where feasible using factory pattern

**Success Criteria:**
- All tests pass
- No formatted values in values object
- Complete metadata for all values
- Consistent structure across all generators

Good luck with the refactoring!
