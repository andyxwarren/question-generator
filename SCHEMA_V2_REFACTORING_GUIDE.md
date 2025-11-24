# Schema v2.0 Refactoring Guide

**Purpose:** Transform question generators from Schema v1.x to Schema v2.0
**Date:** 2025-11-24
**Project:** UK National Curriculum Mathematics Question Generator

---

## Table of Contents

1. [Overview](#overview)
2. [Understanding Schema v2.0](#understanding-schema-v20)
3. [Why Refactor?](#why-refactor)
4. [Step-by-Step Refactoring Process](#step-by-step-refactoring-process)
5. [Files in Scope](#files-in-scope)
6. [Common Patterns](#common-patterns)
7. [Testing Requirements](#testing-requirements)
8. [Common Pitfalls](#common-pitfalls)

---

## Overview

### What is Schema v2.0?

Schema v2.0 is a data structure specification for question objects that **separates raw data from formatting metadata**. This enables:
- Better internationalization (format numbers differently per locale)
- Flexible rendering (format for web, print, audio, etc.)
- Clearer data flow (UI handles formatting, not generators)
- Type safety (know exactly what data type each value is)

### Current Status

**Completed (8 generators):**
- ✅ C01_Y1_CALC_mental.js
- ✅ C01_Y2_CALC_mental.js (already v2.0)
- ✅ C01_Y3_CALC_mental.js
- ✅ C01_Y5_CALC_mental.js
- ✅ C02_Y3_Y4_Y5_CALC_written.js (consolidated)

**Partially Completed (1 generator):**
- ⏳ C02_Y1_CALC_written.js (30% - 3/10 operations)

**Pending (~86 generators):**
- All other generator files

---

## Understanding Schema v2.0

### Schema v1.x (Old Format)

```javascript
return {
    text: `${a} + ${b} = ?`,              // Pre-formatted text
    type: 'text_input',
    answer: answer.toString(),            // Stringified answer
    hint: `Add ${a} and ${b}`,            // Pre-formatted hint
    module: 'C01_Y1_CALC',
    level: level
};
```

**Problems with v1.x:**
- ❌ Formatting is hardcoded (commas, symbols, spacing)
- ❌ Answer is always a string (loses type information)
- ❌ Can't adapt to different locales (UK vs US number formats)
- ❌ Can't render differently for different outputs (web vs print vs audio)
- ❌ No metadata about what the values represent

### Schema v2.0 (New Format)

```javascript
// 1. Create raw values object (NO formatting)
const values = { a, b, answer };

// 2. Create metadata describing each value
const valueMetadata = {
    a: { type: "number", prefix: "", suffix: "", decimals: 0 },
    b: { type: "number", prefix: "", suffix: "", decimals: 0 },
    answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
};

// 3. Return question with both template and rendered versions
return {
    questionTemplate: `[a] + [b] = ?`,         // Template with placeholders
    questionRendered: `${a} + ${b} = ?`,       // Human-readable version
    type: 'text_input',
    values,                                     // Raw data
    valueMetadata,                              // How to format each value
    answer: answer,                             // Raw number (not stringified)
    hintTemplate: `Add [a] and [b]`,           // Template version
    hintRendered: `Add ${a} and ${b}`,         // Rendered version
    locale: 'en-GB',                            // UK format
    universal: true,                            // Pure numbers (no units)
    module: 'C01_Y1_CALC',
    level: level
};
```

**Benefits of v2.0:**
- ✅ Raw data separate from formatting
- ✅ Answer is correct type (number, not string)
- ✅ Can format for any locale
- ✅ Can render for any output type
- ✅ Clear metadata about value types
- ✅ UI has all information needed for formatting

### Core Principles

1. **Values are RAW** - No formatting, no symbols, no commas
2. **Metadata describes formatting** - Type, prefix, suffix, decimals
3. **Two versions of text** - Template (with placeholders) and Rendered (human-readable)
4. **Answer matches type** - Number is number, string is string, array is array
5. **Locale flag** - Always 'en-GB' for UK curriculum
6. **Universal flag** - true for pure numbers, false for money/measurements

---

## Why Refactor?

### Technical Benefits

**Internationalization:**
```javascript
// With v2.0, can format for any locale
const formattedValue = formatNumber(values.a, locale);
// en-GB: 1,234.56
// en-US: 1,234.56
// de-DE: 1.234,56
// fr-FR: 1 234,56
```

**Flexible Rendering:**
```javascript
// Can render for different outputs
const webVersion = renderForWeb(question);
const printVersion = renderForPrint(question);
const audioVersion = renderForAudio(question);
```

**Type Safety:**
```javascript
// Know exactly what type each value is
if (valueMetadata.price.type === 'number') {
    // Safe to do math operations
    const total = values.price * values.quantity;
}
```

### Pedagogical Benefits

**Clear Data Structure:**
- Teachers can see raw values used in questions
- Easier to analyze question difficulty
- Better logging and debugging

**Consistent Formatting:**
- All money formatted the same way (£1.50)
- All large numbers formatted consistently (1,234,567)
- All measurements formatted correctly (5 cm, not 5cm or 5 Cm)

### Maintenance Benefits

**Easier Testing:**
```javascript
// Test raw values, not formatted strings
assert.equal(question.values.a, 5);
assert.equal(question.values.b, 3);
assert.equal(question.answer, 8);
```

**Clearer Code:**
```javascript
// Generators focus on math, not formatting
const a = randomInt(1, 10);
const b = randomInt(1, 10);
const answer = a + b;  // Just the math

// Not this:
const answerString = `${a + b}`;  // Mixed concerns
```

---

## Step-by-Step Refactoring Process

### Step 1: Identify Values in Question

**Before refactoring, list all values used:**

```javascript
// Example: 5 + 3 = ?
// Values: a=5, b=3, answer=8

// Example: You have 5 apples and get 3 more. How many apples now?
// Values: a=5, b=3, answer=8, item="apples"

// Example: £5.50 + £3.20 = ?
// Values: a=5.50, b=3.20, answer=8.70
```

### Step 2: Create Values Object

**Extract all values to a plain object:**

```javascript
// ✅ CORRECT: Raw values only
const values = {
    a: 5,
    b: 3,
    answer: 8
};

// ❌ WRONG: Contains formatting
const values = {
    a: "5",           // Should be number
    b: "3",           // Should be number
    answer: "8"       // Should be number
};

// ❌ WRONG: Contains symbols
const values = {
    a: "£5.50",       // Should be 5.50 (number), prefix handled by metadata
    b: "£3.20",       // Should be 3.20 (number)
    answer: "£8.70"   // Should be 8.70 (number)
};
```

### Step 3: Create Metadata Object

**For each value, specify its type and formatting:**

```javascript
const valueMetadata = {
    a: {
        type: "number",      // "number", "string", "array"
        prefix: "",          // Text before value (e.g., "£")
        suffix: "",          // Text after value (e.g., " cm")
        decimals: 0          // Decimal places (0 for integers)
    },
    b: {
        type: "number",
        prefix: "",
        suffix: "",
        decimals: 0
    },
    answer: {
        type: "number",
        prefix: "",
        suffix: "",
        decimals: 0
    }
};
```

**For money:**
```javascript
const valueMetadata = {
    price: {
        type: "number",
        prefix: "£",         // Pound symbol before
        suffix: "",
        decimals: 2          // Always 2 decimal places
    }
};
```

**For measurements:**
```javascript
const valueMetadata = {
    length: {
        type: "number",
        prefix: "",
        suffix: " cm",       // Unit after
        decimals: 1          // 1 decimal place
    }
};
```

**For strings:**
```javascript
const valueMetadata = {
    name: {
        type: "string",
        prefix: "",
        suffix: "",
        decimals: 0
    },
    item: {
        type: "string",
        prefix: "",
        suffix: "",
        decimals: 0
    }
};
```

### Step 4: Convert Text to Template and Rendered

**Create both versions of all text fields:**

```javascript
// For questionTemplate: Use [placeholder] notation
const questionTemplate = `[a] + [b] = ?`;

// For questionRendered: Human-readable with formatting
const questionRendered = `${a} + ${b} = ?`;
// Or with formatting:
const questionRendered = `${a.toLocaleString()} + ${b.toLocaleString()} = ?`;

// For hintTemplate: Use [placeholder] notation
const hintTemplate = `Add [a] and [b]`;

// For hintRendered: Human-readable
const hintRendered = `Add ${a} and ${b}`;
```

**Special Cases:**

**[unknown] Placeholder:**
```javascript
// For missing number questions like: 5 + ? = 8
const questionTemplate = `[a] + [unknown] = [answer]`;
const questionRendered = `${a} + ___ = ${answer}`;

// Add to values
values.unknown = b;  // The missing value

// Add to metadata
valueMetadata.unknown = {
    type: "number",
    prefix: "",
    suffix: "",
    decimals: 0
};
```

**Word Problems:**
```javascript
// Word problem with name and item
const questionTemplate = `[name] has [a] [item]. They get [b] more [item]. How many [item] now?`;
const questionRendered = `${name} has ${a} ${item}. They get ${b} more ${item}. How many ${item} now?`;

// Add to values
values.name = name;
values.item = item;

// Add to metadata
valueMetadata.name = { type: "string", prefix: "", suffix: "", decimals: 0 };
valueMetadata.item = { type: "string", prefix: "", suffix: "", decimals: 0 };
```

### Step 5: Update Answer Format

**Answer should match the data type:**

```javascript
// ✅ CORRECT: Number answer
return {
    // ...
    answer: 8,  // Raw number
};

// ❌ WRONG: Stringified answer
return {
    // ...
    answer: "8",  // Should be number
};

// ✅ CORRECT: String answer (for symbol questions)
return {
    // ...
    answer: "+",  // This is correct - the answer IS a string (the + symbol)
};

// ✅ CORRECT: Array answer (for multi-gap questions)
return {
    // ...
    answer: 5,
    answers: [5, 10, 15],  // Multiple gaps
};
```

### Step 6: Add Locale and Universal Flags

**Always add these two flags:**

```javascript
return {
    // ... other fields
    locale: 'en-GB',     // Always 'en-GB' for UK curriculum
    universal: true,     // true for pure numbers, false for money/measurements
};
```

**When to set universal:**

```javascript
// universal: true (pure numbers, no units)
// 5 + 3 = 8
// 123 + 456 = 579
// Find the missing number: 5 + ? = 8

// universal: false (has units or locale-specific formatting)
// £5.50 + £3.20 = £8.70  (money)
// 5 cm + 3 cm = 8 cm     (measurements)
// 5 p.m. (time)
```

### Step 7: Assemble Complete Question Object

**Put it all together:**

```javascript
function generateSimpleAddition(params, level) {
    // Generate values
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    // Create values object
    const values = { a, b, answer };

    // Create metadata object
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    // Create templates and rendered versions
    const questionTemplate = `[a] + [b] = ?`;
    const questionRendered = `${a} + ${b} = ?`;
    const hintTemplate = `Add [a] and [b]`;
    const hintRendered = `Add ${a} and ${b}`;

    // Return complete v2.0 question object
    return {
        questionTemplate,
        questionRendered,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate,
        hintRendered,
        locale: 'en-GB',
        universal: true,
        module: 'MODULE_ID',
        level: level
    };
}
```

---

## Files in Scope

### Refactoring Status by File

```
✅ = Completed
⏳ = Partial
❌ = Pending
```

#### Number & Place Value (N01-N06)

```
N01_Y1_NPV_counting.js           → ✅ CONSOLIDATED (part of N01_NPV_counting.js)
N01_Y2_NPV_counting.js           → ✅ CONSOLIDATED (part of N01_NPV_counting.js)
N01_Y3_NPV_counting.js           → ✅ CONSOLIDATED (part of N01_NPV_counting.js)
N01_Y4_NPV_counting.js           → ✅ CONSOLIDATED (part of N01_NPV_counting.js)
N01_Y5_NPV_counting.js           → ✅ CONSOLIDATED (part of N01_NPV_counting.js)
N01_NPV_counting.js              → ✅ COMPLETED (consolidated file is already v2.0)

N02_Y1_NPV_readwrite.js          → ✅ CONSOLIDATED (part of N02_NPV_readwrite.js)
N02_Y2_NPV_readwrite.js          → ✅ CONSOLIDATED (part of N02_NPV_readwrite.js)
N02_Y3_NPV_readwrite.js          → ✅ CONSOLIDATED (part of N02_NPV_readwrite.js)
N02_Y4_NPV_readwrite.js          → ✅ CONSOLIDATED (part of N02_NPV_readwrite.js)
N02_Y5_NPV_readwrite.js          → ✅ CONSOLIDATED (part of N02_NPV_readwrite.js)
N02_Y6_NPV_readwrite.js          → ✅ CONSOLIDATED (part of N02_NPV_readwrite.js)
N02_NPV_readwrite.js             → ✅ COMPLETED (consolidated file is already v2.0)

N03_Y2_NPV_placevalue.js         → ❌ PENDING
N03_Y3_NPV_placevalue.js         → ❌ PENDING
N03_Y4_NPV_placevalue.js         → ❌ PENDING
N03_Y5_NPV_placevalue.js         → ❌ PENDING
N03_Y6_NPV_placevalue.js         → ❌ PENDING

N04_Y1_NPV_representation.js     → ❌ PENDING
N04_Y2_NPV_representation.js     → ❌ PENDING
N04_Y3_NPV_representation.js     → ❌ PENDING
N04_Y4_NPV_representation.js     → ❌ PENDING
N04_Y5_NPV_representation.js     → ❌ PENDING
N04_Y6_NPV_representation.js     → ❌ PENDING

N05_Y4_NPV_negatives.js          → ❌ PENDING
N05_Y5_NPV_negatives.js          → ❌ PENDING
N05_Y6_NPV_negatives.js          → ❌ PENDING

N06_Y2_NPV_problems.js           → ❌ PENDING
N06_Y3_NPV_problems.js           → ❌ PENDING
N06_Y4_NPV_problems.js           → ❌ PENDING
N06_Y5_NPV_problems.js           → ❌ PENDING
N06_Y6_NPV_problems.js           → ❌ PENDING
```

#### Calculation (C01-C09)

```
C01_Y1_CALC_mental.js            → ✅ COMPLETED
C01_Y2_CALC_mental.js            → ✅ COMPLETED (already v2.0)
C01_Y3_CALC_mental.js            → ✅ COMPLETED
C01_Y5_CALC_mental.js            → ✅ COMPLETED

C02_Y1_CALC_written.js           → ⏳ PARTIAL (30% - 3/10 operations)
C02_Y2_CALC_written.js           → ❌ PENDING
C02_Y3_CALC_written.js           → ✅ CONSOLIDATED (part of C02_Y3_Y4_Y5_CALC_written.js)
C02_Y4_CALC_written.js           → ✅ CONSOLIDATED (part of C02_Y3_Y4_Y5_CALC_written.js)
C02_Y5_CALC_written.js           → ✅ CONSOLIDATED (part of C02_Y3_Y4_Y5_CALC_written.js)
C02_Y3_Y4_Y5_CALC_written.js     → ✅ COMPLETED (consolidated file is already v2.0)

C03_Y2_CALC_estimation.js        → ❌ PENDING (consider consolidation first)
C03_Y3_CALC_estimation.js        → ❌ PENDING (consider consolidation first)
C03_Y4_CALC_estimation.js        → ❌ PENDING (consider consolidation first)
C03_Y5_CALC_estimation.js        → ❌ PENDING (consider consolidation first)
C03_Y6_CALC_estimation.js        → ❌ PENDING (consider consolidation first)

C04_Y1_CALC_problems.js          → ❌ PENDING
C04_Y2_CALC_problems.js          → ❌ PENDING
C04_Y3_CALC_problems.js          → ❌ PENDING
C04_Y4_CALC_problems.js          → ❌ PENDING
C04_Y5_CALC_problems.js          → ❌ PENDING
C04_Y6_CALC_problems.js          → ❌ PENDING

C05_Y5_CALC_properties.js        → ❌ PENDING
C05_Y6_CALC_properties.js        → ❌ PENDING

C06_Y2_CALC_mental_multiply.js   → ❌ PENDING (consider consolidation first)
C06_Y3_CALC_mental_multiply.js   → ❌ PENDING (consider consolidation first)
C06_Y4_CALC_mental_multiply.js   → ❌ PENDING (consider consolidation first)
C06_Y5_CALC_mental_multiply.js   → ❌ PENDING (consider consolidation first)
C06_Y6_CALC_mental_multiply.js   → ❌ PENDING (consider consolidation first)

C07_Y2_CALC_written.js           → ❌ PENDING (consider consolidation first)
C07_Y3_CALC_written.js           → ❌ PENDING (consider consolidation first)
C07_Y4_CALC_written.js           → ❌ PENDING (consider consolidation first)
C07_Y5_CALC_written.js           → ❌ PENDING (consider consolidation first)
C07_Y6_CALC_written.js           → ❌ PENDING (consider consolidation first)

C08_Y1_CALC_properties.js        → ❌ PENDING
C08_Y2_CALC_properties.js        → ❌ PENDING
C08_Y3_CALC_properties.js        → ❌ PENDING
C08_Y4_CALC_properties.js        → ❌ PENDING
C08_Y5_CALC_properties.js        → ❌ PENDING
C08_Y6_CALC_properties.js        → ❌ PENDING

C09_Y6_CALC_order.js             → ❌ PENDING
```

#### Measurement (M01-M09) - ~25 files

```
All M01-M09 files                → ❌ PENDING
```

#### Fractions, Geometry, Statistics, Position, Ratio, Algebra - ~30 files

```
All F, G, S, P, R, A files       → ❌ PENDING
```

### Priority Refactoring Order

**Recommendation: Complete consolidations FIRST, then refactor all to v2.0**

**Phase 1: Finish Current Work**
1. Complete C02_Y1_CALC_written.js (7 operations remaining)
2. Refactor C02_Y2_CALC_written.js

**Phase 2: Analyze and Consolidate Candidates**
1. C03_Y2-Y6_CALC_estimation (5 files)
2. C06_Y2-Y6_CALC_mental_multiply (5 files)
3. C07_Y2-Y6_CALC_written (5 files)
4. N03_Y2-Y6_NPV_placevalue (5 files)
5. N04_Y1-Y6_NPV_representation (6 files)

**Phase 3: Refactor All to v2.0**
- Work strand by strand
- Use REFACTORING_INSTRUCTIONS.md as guide
- Create test suites for each

---

## Common Patterns

### Pattern 1: Simple Number Operations

```javascript
// BEFORE (v1.x)
function generateAddition(params, level) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    return {
        text: `${a} + ${b} = ?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Add ${a} and ${b}`,
        module: 'MODULE_ID',
        level: level
    };
}

// AFTER (v2.0)
function generateAddition(params, level) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `[a] + [b] = ?`,
        questionRendered: `${a} + ${b} = ?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate: `Add [a] and [b]`,
        hintRendered: `Add ${a} and ${b}`,
        locale: 'en-GB',
        universal: true,
        module: 'MODULE_ID',
        level: level
    };
}
```

### Pattern 2: Money Operations

```javascript
// BEFORE (v1.x)
function generateMoney(params, level) {
    const a = randomInt(100, 1000) / 100;  // £1.00 to £10.00
    const b = randomInt(50, 500) / 100;
    const answer = a + b;

    return {
        text: `£${a.toFixed(2)} + £${b.toFixed(2)} = ?`,
        type: 'text_input',
        answer: `£${answer.toFixed(2)}`,
        hint: `Add the amounts`,
        module: 'MODULE_ID',
        level: level
    };
}

// AFTER (v2.0)
function generateMoney(params, level) {
    const a = randomInt(100, 1000) / 100;  // £1.00 to £10.00
    const b = randomInt(50, 500) / 100;
    const answer = a + b;

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "£", suffix: "", decimals: 2 },
        b: { type: "number", prefix: "£", suffix: "", decimals: 2 },
        answer: { type: "number", prefix: "£", suffix: "", decimals: 2 }
    };

    return {
        questionTemplate: `[a] + [b] = ?`,
        questionRendered: `£${a.toFixed(2)} + £${b.toFixed(2)} = ?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,  // Raw number, not formatted string
        hintTemplate: `Add the amounts`,
        hintRendered: `Add the amounts`,
        locale: 'en-GB',
        universal: false,  // Money is locale-specific
        module: 'MODULE_ID',
        level: level
    };
}
```

### Pattern 3: Missing Number Operations

```javascript
// BEFORE (v1.x)
function generateMissingAddend(params, level) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    return {
        text: `${a} + ? = ${answer}`,
        type: 'text_input',
        answer: b.toString(),
        hint: `${answer} - ${a} = ${b}`,
        module: 'MODULE_ID',
        level: level
    };
}

// AFTER (v2.0)
function generateMissingAddend(params, level) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    const values = { a, b, answer, unknown: b };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `[a] + [unknown] = [answer]`,
        questionRendered: `${a} + ? = ${answer}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: b,
        hintTemplate: `[answer] - [a] = [b]`,
        hintRendered: `${answer} - ${a} = ${b}`,
        locale: 'en-GB',
        universal: true,
        module: 'MODULE_ID',
        level: level
    };
}
```

### Pattern 4: Word Problems

```javascript
// BEFORE (v1.x)
function generateWordProblem(params, level) {
    const name = getRandomName();
    const item = getRandomItem();
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    return {
        text: `${name} has ${a} ${item}. They get ${b} more ${item}. How many ${item} now?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `${a} + ${b} = ${answer}`,
        module: 'MODULE_ID',
        level: level
    };
}

// AFTER (v2.0)
function generateWordProblem(params, level) {
    const name = getRandomName();
    const item = getRandomItem();
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    const values = { name, item, a, b, answer };
    const valueMetadata = {
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 },
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `[name] has [a] [item]. They get [b] more [item]. How many [item] now?`,
        questionRendered: `${name} has ${a} ${item}. They get ${b} more ${item}. How many ${item} now?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate: `[a] + [b] = [answer]`,
        hintRendered: `${a} + ${b} = ${answer}`,
        locale: 'en-GB',
        universal: true,
        module: 'MODULE_ID',
        level: level
    };
}
```

### Pattern 5: Multiple Choice Questions

```javascript
// BEFORE (v1.x)
function generateMultipleChoice(params, level) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    const distractors = generateDistractors(answer, 3, 0, 20);
    const options = shuffle([answer, ...distractors]);

    return {
        text: `${a} + ${b} = ?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Add ${a} and ${b}`,
        module: 'MODULE_ID',
        level: level
    };
}

// AFTER (v2.0)
function generateMultipleChoice(params, level) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const answer = a + b;

    const distractors = generateDistractors(answer, 3, 0, 20);
    const options = shuffle([answer, ...distractors]);  // Keep as numbers

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `[a] + [b] = ?`,
        questionRendered: `${a} + ${b} = ?`,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,  // Array of numbers
        answer: answer,    // Number, not string
        hintTemplate: `Add [a] and [b]`,
        hintRendered: `Add ${a} and ${b}`,
        locale: 'en-GB',
        universal: true,
        module: 'MODULE_ID',
        level: level
    };
}
```

### Pattern 6: Columnar Format (Special Case)

```javascript
// BEFORE (v1.x)
function generateColumnar(params, level) {
    const a = randomInt(100, 999);
    const b = randomInt(100, 999);
    const answer = a + b;

    return {
        text: `Calculate using the column method:\n\n${formatColumnar(a, b, '+')}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: 'Use the column method',
        module: 'MODULE_ID',
        level: level
    };
}

// AFTER (v2.0)
function generateColumnar(params, level) {
    const a = randomInt(100, 999);
    const b = randomInt(100, 999);
    const answer = a + b;

    const columnarText = formatColumnar(a, b, '+');

    const values = { a, b, answer, columnar: columnarText };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        columnar: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Calculate using the column method:\n\n[columnar]`,
        questionRendered: `Calculate using the column method:\n\n${columnarText}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate: 'Use the column method',
        hintRendered: 'Use the column method',
        locale: 'en-GB',
        universal: true,
        module: 'MODULE_ID',
        level: level
    };
}
```

### Pattern 7: Measurements

```javascript
// BEFORE (v1.x)
function generateMeasurement(params, level) {
    const a = randomInt(1, 100);
    const b = randomInt(1, 50);
    const answer = a + b;

    return {
        text: `${a} cm + ${b} cm = ?`,
        type: 'text_input',
        answer: `${answer} cm`,
        hint: `Add the lengths`,
        module: 'MODULE_ID',
        level: level
    };
}

// AFTER (v2.0)
function generateMeasurement(params, level) {
    const a = randomInt(1, 100);
    const b = randomInt(1, 50);
    const answer = a + b;

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: " cm", decimals: 0 },
        b: { type: "number", prefix: "", suffix: " cm", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: " cm", decimals: 0 }
    };

    return {
        questionTemplate: `[a] + [b] = ?`,
        questionRendered: `${a} cm + ${b} cm = ?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,  // Raw number
        hintTemplate: `Add the lengths`,
        hintRendered: `Add the lengths`,
        locale: 'en-GB',
        universal: false,  // Has units
        module: 'MODULE_ID',
        level: level
    };
}
```

---

## Testing Requirements

### Create Test Suite for Each Refactored Generator

**Template:**

```javascript
// test_MODULE_ID.js
import generator from './src/generators/MODULE_ID.js';
import { MODULES } from './src/curriculum/parameters.js';

function validateSchemaV2(question, testName) {
    const errors = [];

    // Required fields
    if (!question.questionTemplate) errors.push(`${testName}: Missing questionTemplate`);
    if (!question.questionRendered) errors.push(`${testName}: Missing questionRendered`);
    if (!question.values) errors.push(`${testName}: Missing values object`);
    if (!question.valueMetadata) errors.push(`${testName}: Missing valueMetadata object`);
    if (question.answer === undefined) errors.push(`${testName}: Missing answer`);
    if (!question.locale) errors.push(`${testName}: Missing locale`);
    if (question.universal === undefined) errors.push(`${testName}: Missing universal flag`);

    // Values must be raw (no formatting)
    if (question.values) {
        for (const [key, value] of Object.entries(question.values)) {
            // Skip special string values
            if (key === 'name' || key === 'item' || key === 'columnar' || key === 'hiddenA') {
                continue;
            }
            // Check for formatted numbers
            if (typeof value === 'string' && /[£$,]/.test(value) && /[0-9]/.test(value)) {
                errors.push(`${testName}: Value '${key}' appears to be formatted: ${value}`);
            }
        }
    }

    // Metadata completeness
    if (question.values && question.valueMetadata) {
        const valueKeys = Object.keys(question.values);
        const metadataKeys = Object.keys(question.valueMetadata);

        for (const key of valueKeys) {
            if (!metadataKeys.includes(key)) {
                errors.push(`${testName}: Missing metadata for value '${key}'`);
            }
        }

        for (const [key, metadata] of Object.entries(question.valueMetadata)) {
            if (!metadata.type) errors.push(`${testName}: Missing type in metadata for '${key}'`);
            if (metadata.prefix === undefined) errors.push(`${testName}: Missing prefix in metadata for '${key}'`);
            if (metadata.suffix === undefined) errors.push(`${testName}: Missing suffix in metadata for '${key}'`);
            if (metadata.decimals === undefined) errors.push(`${testName}: Missing decimals in metadata for '${key}'`);
        }
    }

    // Locale check
    if (question.locale && question.locale !== 'en-GB') {
        errors.push(`${testName}: Locale should be 'en-GB', got '${question.locale}'`);
    }

    // Hint fields
    if (question.hintTemplate && !question.hintRendered) {
        errors.push(`${testName}: Has hintTemplate but missing hintRendered`);
    }

    return errors;
}

function testAllLevels() {
    console.log('=== Testing MODULE_ID ===\n');

    const moduleId = 'MODULE_ID';
    const params = MODULES[moduleId]?.parameters;

    if (!params) {
        console.log(`❌ ERROR: No parameters found for ${moduleId}`);
        process.exit(1);
    }

    const levels = [1, 2, 3, 4];
    const questionsPerLevel = 10;

    let totalTests = 0;
    let totalErrors = 0;

    for (const level of levels) {
        console.log(`--- Level ${level} ---`);

        const levelParams = params[level];
        if (!levelParams) {
            console.log(`❌ No parameters defined for level ${level}`);
            totalErrors++;
            continue;
        }

        let levelErrors = 0;

        for (let i = 0; i < questionsPerLevel; i++) {
            const testName = `L${level}_Q${i+1}`;

            try {
                const question = generator.generate(levelParams, level);
                const errors = validateSchemaV2(question, testName);

                totalTests++;

                if (errors.length > 0) {
                    console.log(`\n❌ ${testName} - FAILED:`);
                    errors.forEach(error => console.log(`   - ${error}`));
                    levelErrors += errors.length;
                    totalErrors += errors.length;
                }

                if (question.module !== moduleId) {
                    console.log(`\n❌ ${testName} - Module ID mismatch`);
                    levelErrors++;
                    totalErrors++;
                }

            } catch (error) {
                console.log(`\n❌ ${testName} - EXCEPTION: ${error.message}`);
                console.error(error.stack);
                levelErrors++;
                totalErrors++;
            }
        }

        if (levelErrors === 0) {
            console.log(`  ✅ Level ${level}: All ${questionsPerLevel} questions passed`);
        } else {
            console.log(`  ❌ Level ${level}: ${levelErrors} errors found`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`Total Questions: ${totalTests}, Errors: ${totalErrors}`);

    if (totalErrors === 0) {
        console.log('✅ ✅ ✅ ALL TESTS PASSED! ✅ ✅ ✅');
    } else {
        console.log(`❌ TESTS FAILED: ${totalErrors} errors`);
    }

    return totalErrors === 0;
}

const passed = testAllLevels();
process.exit(passed ? 0 : 1);
```

### Running Tests

```bash
# Run test suite
node test_MODULE_ID.js

# Expected output:
# === Testing MODULE_ID ===
#
# --- Level 1 ---
#   ✅ Level 1: All 10 questions passed
# --- Level 2 ---
#   ✅ Level 2: All 10 questions passed
# --- Level 3 ---
#   ✅ Level 3: All 10 questions passed
# --- Level 4 ---
#   ✅ Level 4: All 10 questions passed
#
# ============================================================
# Total Questions: 40, Errors: 0
# ✅ ✅ ✅ ALL TESTS PASSED! ✅ ✅ ✅
```

---

## Common Pitfalls

### Pitfall 1: Forgetting to Add Values to Both Objects

```javascript
// ❌ WRONG: Missing 'unknown' in metadata
const values = { a, b, answer, unknown: b };
const valueMetadata = {
    a: { type: "number", prefix: "", suffix: "", decimals: 0 },
    b: { type: "number", prefix: "", suffix: "", decimals: 0 },
    answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    // Missing unknown!
};

// ✅ CORRECT: All values have metadata
const values = { a, b, answer, unknown: b };
const valueMetadata = {
    a: { type: "number", prefix: "", suffix: "", decimals: 0 },
    b: { type: "number", prefix: "", suffix: "", decimals: 0 },
    answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
    unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
};
```

### Pitfall 2: Leaving Formatting in Values

```javascript
// ❌ WRONG: Values contain formatting
const values = {
    a: "£5.50",           // Should be 5.50
    b: "1,234",           // Should be 1234
    answer: "8 cm"        // Should be 8
};

// ✅ CORRECT: Raw values only
const values = {
    a: 5.50,              // Raw number
    b: 1234,              // Raw number
    answer: 8             // Raw number
};

const valueMetadata = {
    a: { type: "number", prefix: "£", suffix: "", decimals: 2 },
    b: { type: "number", prefix: "", suffix: "", decimals: 0 },
    answer: { type: "number", prefix: "", suffix: " cm", decimals: 0 }
};
```

### Pitfall 3: Stringifying Answer

```javascript
// ❌ WRONG: Answer as string
return {
    // ...
    answer: answer.toString(),  // Don't stringify!
};

// ✅ CORRECT: Raw answer
return {
    // ...
    answer: answer,  // Keep as number
};

// ✅ CORRECT: String answer (when answer IS a string)
return {
    // ...
    answer: "+",  // This is correct - answer is the symbol
};
```

### Pitfall 4: Missing Template Version

```javascript
// ❌ WRONG: Only rendered version
return {
    questionRendered: `${a} + ${b} = ?`,
    // Missing questionTemplate!
};

// ✅ CORRECT: Both versions
return {
    questionTemplate: `[a] + [b] = ?`,
    questionRendered: `${a} + ${b} = ?`,
};
```

### Pitfall 5: Wrong Universal Flag

```javascript
// ❌ WRONG: Money should be universal: false
return {
    // ...
    locale: 'en-GB',
    universal: true,  // Wrong! Money is not universal
};

// ✅ CORRECT: Money is locale-specific
return {
    // ...
    locale: 'en-GB',
    universal: false,  // Correct - has currency
};

// ✅ CORRECT: Pure numbers are universal
return {
    // ...
    locale: 'en-GB',
    universal: true,  // Correct - no units
};
```

### Pitfall 6: Formatting Options Array

```javascript
// ❌ WRONG: Options formatted as strings
const options = shuffle([answer, ...distractors]).map(n => n.toString());

// ✅ CORRECT: Options as raw numbers
const options = shuffle([answer, ...distractors]);  // Keep as numbers
```

### Pitfall 7: Inconsistent Hint Fields

```javascript
// ❌ WRONG: Only one hint field
return {
    // ...
    hintRendered: `${a} + ${b} = ${answer}`,
    // Missing hintTemplate!
};

// ✅ CORRECT: Both hint fields
return {
    // ...
    hintTemplate: `[a] + [b] = [answer]`,
    hintRendered: `${a} + ${b} = ${answer}`,
};

// ✅ ALSO CORRECT: No hint at all
return {
    // ...
    // No hint fields - that's fine
};
```

---

## Refactoring Checklist

### For Each Operation Function

- [ ] Identified all values used in question
- [ ] Created `values` object with raw values only
- [ ] Created `valueMetadata` object with complete metadata for all values
- [ ] Converted `text` → `questionTemplate` and `questionRendered`
- [ ] Converted `hint` → `hintTemplate` and `hintRendered` (if present)
- [ ] Removed `.toString()` from answer (unless answer IS a string)
- [ ] Added `locale: 'en-GB'`
- [ ] Added `universal` flag (true for pure numbers, false for money/measurements)
- [ ] Verified no formatting in values object (no £, $, commas, units)
- [ ] Verified all values have corresponding metadata
- [ ] Tested function generates valid questions

### For Each File

- [ ] All operation functions refactored
- [ ] File header comment updated
- [ ] Imports unchanged (unless adding new helpers)
- [ ] Export structure unchanged
- [ ] Created test suite (test_MODULE_ID.js)
- [ ] All tests passing
- [ ] Spot-checked questions in UI
- [ ] No regressions in functionality
- [ ] Committed changes with descriptive message

### Quality Checks

- [ ] No hardcoded formatting (commas, currency symbols) in values
- [ ] All metadata has 4 required fields (type, prefix, suffix, decimals)
- [ ] Answer type matches data type (number is number, not string)
- [ ] Both template and rendered versions for all text
- [ ] [placeholder] notation matches value keys exactly
- [ ] Special cases handled ([unknown], [columnar], etc.)
- [ ] Universal flag correct based on question type
- [ ] Test suite validates Schema v2.0 compliance

---

## Getting Help

### Reference Documents

- **REFACTORING_INSTRUCTIONS.md** - Detailed step-by-step instructions
- **CONSOLIDATION_GUIDE.md** - When and how to consolidate generators
- **REFACTORING_PROGRESS_REPORT.md** - Current status and completed work
- **PARAMETER_SCHEMA.md** - Parameter structure documentation

### Example Files (Completed)

Study these files for reference:
- `src/generators/C01_Y1_CALC_mental.js` - Simple operations
- `src/generators/C01_Y3_CALC_mental.js` - Bridging avoidance logic
- `src/generators/C01_Y5_CALC_mental.js` - Complex operations (16 total)
- `src/generators/C02_Y3_Y4_Y5_CALC_written.js` - Consolidated file with config

### Test Suite Examples

- `test_C01_Y1_CALC_mental.js`
- `test_C01_Y3_CALC_mental.js`
- `test_C01_Y5_CALC_mental.js`
- `test_C02_Y3_Y4_Y5_CALC_written.js`

---

## Summary

### Key Points to Remember

1. **Values are RAW** - No formatting, no symbols, no commas
2. **Metadata describes formatting** - Type, prefix, suffix, decimals
3. **Two versions of all text** - Template and Rendered
4. **Answer matches type** - Number stays number, not stringified
5. **Always add locale and universal** - 'en-GB' and true/false

### Before You Start

1. **Read this guide completely**
2. **Study example files** - See how it's done
3. **Run existing tests** - Understand expected output
4. **Consider consolidation first** - Don't duplicate effort
5. **Work systematically** - One operation at a time

### While Refactoring

1. **Test frequently** - Don't wait until all operations are done
2. **Follow patterns** - Use examples as templates
3. **Check edge cases** - Zero values, negative numbers, etc.
4. **Verify no formatting leaks** - Double-check values object
5. **Document as you go** - Add comments for complex logic

### After Refactoring

1. **Run full test suite** - All levels, all operations
2. **Spot-check in UI** - Verify questions look correct
3. **Compare to original** - Ensure no regressions
4. **Update documentation** - Mark as completed in progress report
5. **Commit with good message** - Describe what changed and why

---

**Good luck with your refactoring!** Remember: consistency is key. Follow the patterns, test thoroughly, and don't hesitate to reference the completed examples.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-24
**Status:** Complete and ready for use
