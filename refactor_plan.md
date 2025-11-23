# Question Generator Refactoring Plan: Metadata-Driven Formatting

**Date**: 2025-11-23
**Goal**: Remove all formatting from generator values, add metadata for question server rendering
**Scope**: 101 generator files
**Estimated Effort**: 6-8 days

---

## Table of Contents

1. [Overview](#overview)
2. [Schema Structure](#schema-structure)
3. [Metadata Properties](#metadata-properties)
4. [Complete Examples](#complete-examples)
5. [Generator Patterns by Type](#generator-patterns-by-type)
6. [Module Categorization](#module-categorization)
7. [Implementation Steps](#implementation-steps)
8. [Question Server Logic](#question-server-logic)
9. [Benefits](#benefits)

---

## Overview

### Current Problem

Generators currently embed formatting directly in values:
- `answer: "1,801"` - String with thousand separators
- `answer: formatNumber(1801)` - Returns "1,801" string
- `text: "A toy costs £2.50"` - Currency symbol hardcoded
- `options: ["£1.00", "£2.00"]` - Pre-formatted strings

### Proposed Solution

Generators output clean data + metadata:
- `answer: 1801` - Raw number
- `answerMetadata: { prefix: "", suffix: "", decimals: 0, type: "number" }`
- `questionTemplate: "A toy costs [price]"` - Template with placeholders
- `questionRendered: "A toy costs £2.50"` - For human review only

**Question server** uses template + values + metadata to render questions for users.

---

## Schema Structure

### Complete Question Object

```javascript
{
  // QUESTION
  questionTemplate: "How much is [value1] minus [value2]?",
  questionRendered: "How much is £1,000 minus £999.01?",  // For human review

  // VALUES (raw numbers, no formatting)
  values: {
    value1: 1000,
    value2: 999.01
  },

  // VALUE METADATA (how to format each value)
  valueMetadata: {
    value1: { prefix: "£", suffix: "", decimals: 0, type: "money" },
    value2: { prefix: "£", suffix: "", decimals: 2, type: "money" }
  },

  // ANSWER
  answer: 0.99,  // Raw number
  answerMetadata: { prefix: "", suffix: "p", decimals: 2, type: "money" },

  // OPTIONS (for multiple choice)
  options: [0.99, 1.01, 0.89, 1.10],  // Raw numbers
  optionsMetadata: [  // Array, one per option
    { prefix: "", suffix: "p", decimals: 2, type: "money" },
    { prefix: "£", suffix: "", decimals: 2, type: "money" },
    { prefix: "", suffix: "p", decimals: 2, type: "money" },
    { prefix: "£", suffix: "", decimals: 2, type: "money" }
  ],

  // HINT
  hintTemplate: "Subtract [value2] from [value1]",
  hintRendered: "Subtract £999.01 from £1,000",  // For human review

  // LOCALE FLAGS
  locale: "en-GB",      // Current locale
  universal: false,     // Can work across locales?

  // STANDARD FIELDS
  type: "multiple_choice",
  module: "M03_Y2_MEAS",
  level: 2,
  id: "uuid",
  timestamp: 123456
}
```

---

## Metadata Properties

Each value has 4 simple properties:

```javascript
{
  prefix: "",      // Symbol before number: "£", "$", "" (empty)
  suffix: "",      // Symbol/unit after: "p", " cm", " kg", "" (empty)
  decimals: 0,     // Decimal places: 0, 1, 2
  type: ""         // Category: "number", "money", "length", etc.
}
```

### Type Categories

| Type | Description | Examples |
|------|-------------|----------|
| `"number"` | Pure numbers, no units | 1234, 567 |
| `"money"` | Currency values | £2.50, $5.00, 99p, 250¢ |
| `"length"` | Distance measurements | 150 cm, 12 m, 5 inches |
| `"mass"` | Weight measurements | 500 g, 2 kg, 8 ounces |
| `"volume"` | Capacity measurements | 250 ml, 2 l, 1 pint |
| `"area"` | Surface measurements | 24 cm², 10 m² |
| `"time"` | Duration/clock time | 45 minutes, 2 hours |
| `"angle"` | Geometric angles | 45°, 90° |
| `"percentage"` | Ratios | 50%, 75% |
| `"temperature"` | Heat measurements | 20 °C, 68 °F |
| `"fraction"` | Fractional values | 1/2, 3/4 |

---

## Complete Examples

### Example 1: Pure Number Question (Universal)

```javascript
{
  questionTemplate: "What is [a] plus [b]?",
  questionRendered: "What is 1,234 plus 567?",

  values: {
    a: 1234,
    b: 567
  },

  valueMetadata: {
    a: { prefix: "", suffix: "", decimals: 0, type: "number" },
    b: { prefix: "", suffix: "", decimals: 0, type: "number" }
  },

  answer: 1801,
  answerMetadata: { prefix: "", suffix: "", decimals: 0, type: "number" },

  options: [1801, 1900, 1700, 1850],
  optionsMetadata: [
    { prefix: "", suffix: "", decimals: 0, type: "number" },
    { prefix: "", suffix: "", decimals: 0, type: "number" },
    { prefix: "", suffix: "", decimals: 0, type: "number" },
    { prefix: "", suffix: "", decimals: 0, type: "number" }
  ],

  hintTemplate: "Add [a] and [b]",
  hintRendered: "Add 1,234 and 567",

  locale: "en-GB",
  universal: true,  // Works for any locale

  type: "multiple_choice",
  module: "C01_Y5_CALC",
  level: 2
}
```

**Question server renders**:
- UK: "What is 1,234 plus 567?" (comma separator)
- US: "What is 1,234 plus 567?" (comma separator)
- DE: "Was ist 1.234 plus 567?" (period separator)

---

### Example 2: Money Question (Locale-Specific)

```javascript
{
  questionTemplate: "A toy costs [price]. You pay [payment]. How much change?",
  questionRendered: "A toy costs £2.50. You pay £5.00. How much change?",

  values: {
    price: 2.5,
    payment: 5.0
  },

  valueMetadata: {
    price: { prefix: "£", suffix: "", decimals: 2, type: "money" },
    payment: { prefix: "£", suffix: "", decimals: 2, type: "money" }
  },

  answer: 2.5,
  answerMetadata: { prefix: "£", suffix: "", decimals: 2, type: "money" },

  hintTemplate: "Subtract [price] from [payment]",
  hintRendered: "Subtract £2.50 from £5.00",

  locale: "en-GB",
  universal: false,  // Currency is locale-specific

  type: "text_input",
  module: "M03_Y2_MEAS",
  level: 2
}
```

**Question server renders**:
- UK: "A toy costs £2.50. You pay £5.00. How much change?" → Answer: "£2.50"
- US: "A toy costs $2.50. You pay $5.00. How much change?" → Answer: "$2.50"

---

### Example 3: Measurement Question (Locale-Specific)

```javascript
{
  questionTemplate: "Rectangle perimeter is [perimeter], width is [width]. Find length.",
  questionRendered: "Rectangle perimeter is 24 cm, width is 5 cm. Find length.",

  values: {
    perimeter: 24,
    width: 5
  },

  valueMetadata: {
    perimeter: { prefix: "", suffix: " cm", decimals: 0, type: "length" },
    width: { prefix: "", suffix: " cm", decimals: 0, type: "length" }
  },

  answer: 7,
  answerMetadata: { prefix: "", suffix: " cm", decimals: 0, type: "length" },

  hintTemplate: "Use: perimeter = 2 × (length + width)",
  hintRendered: "Use: perimeter = 2 × (length + width)",

  locale: "en-GB",
  universal: false,  // Units may vary by locale

  type: "text_input",
  module: "M07_Y4_MEAS",
  level: 2
}
```

---

### Example 4: Mixed Currency Formats (Same Question)

```javascript
{
  questionTemplate: "How much is [value1] minus [value2]?",
  questionRendered: "How much is £1,000 minus £999.01?",

  values: {
    value1: 1000,
    value2: 999.01
  },

  valueMetadata: {
    value1: { prefix: "£", suffix: "", decimals: 0, type: "money" },   // £1,000
    value2: { prefix: "£", suffix: "", decimals: 2, type: "money" }    // £999.01
  },

  answer: 0.99,
  answerMetadata: { prefix: "", suffix: "p", decimals: 2, type: "money" },  // 99p

  locale: "en-GB",
  universal: false,

  type: "text_input",
  module: "M03_Y2_MEAS"
}
```

**Shows**: Different metadata for values in same question (£ vs p, 0 vs 2 decimals)

---

## Generator Patterns by Type

### Pattern 1: Pure Numbers (type: "number")

**Applies to**: N01-N06, C01-C09 (66 generators)

**BEFORE**:
```javascript
const answer = a + b;

return {
  text: `What is ${formatNumber(a)} plus ${formatNumber(b)}?`,
  answer: formatNumber(answer),  // "1,801" string
  options: options.map(n => formatNumber(n)),
  hint: `Add ${formatNumber(a)} and ${formatNumber(b)}`,
  module: "C01_Y5_CALC"
};
```

**AFTER**:
```javascript
const answer = a + b;

// Helper for creating uniform metadata
const optionsMetadata = options.map(() => ({
  prefix: "", suffix: "", decimals: 0, type: "number"
}));

return {
  questionTemplate: "What is [a] plus [b]?",
  questionRendered: `What is ${a.toLocaleString()} plus ${b.toLocaleString()}?`,

  values: { a, b },
  valueMetadata: {
    a: { prefix: "", suffix: "", decimals: 0, type: "number" },
    b: { prefix: "", suffix: "", decimals: 0, type: "number" }
  },

  answer: answer,  // Raw number
  answerMetadata: { prefix: "", suffix: "", decimals: 0, type: "number" },

  options: options,  // Raw numbers
  optionsMetadata: optionsMetadata,

  hintTemplate: "Add [a] and [b]",
  hintRendered: `Add ${a.toLocaleString()} and ${b.toLocaleString()}`,

  locale: "en-GB",
  universal: true,

  type: "multiple_choice",
  module: "C01_Y5_CALC",
  level: level
};
```

---

### Pattern 2: Money (type: "money")

**Applies to**: M03_Y1-Y3, M09 money problems (6 generators)

**BEFORE**:
```javascript
function formatMoney(pence) {
  return pence >= 100 ? `£${(pence/100).toFixed(2)}` : `${pence}p`;
}

return {
  text: `A toy costs ${formatMoney(250)}. You pay ${formatMoney(500)}.`,
  answer: "250"
};
```

**AFTER**:
```javascript
// Remove formatMoney helper entirely

return {
  questionTemplate: "A toy costs [price]. You pay [payment]. How much change?",
  questionRendered: "A toy costs £2.50. You pay £5.00. How much change?",

  values: {
    price: 2.5,   // In major units (pounds/dollars)
    payment: 5.0
  },
  valueMetadata: {
    price: { prefix: "£", suffix: "", decimals: 2, type: "money" },
    payment: { prefix: "£", suffix: "", decimals: 2, type: "money" }
  },

  answer: 2.5,
  answerMetadata: { prefix: "£", suffix: "", decimals: 2, type: "money" },

  hintTemplate: "Subtract [price] from [payment]",
  hintRendered: "Subtract £2.50 from £5.00",

  locale: "en-GB",
  universal: false,

  type: "text_input",
  module: "M03_Y2_MEAS",
  level: level
};
```

---

### Pattern 3: Length (type: "length")

**Applies to**: M01, M02, M05-M08 (25 generators)

**BEFORE**:
```javascript
return {
  text: `Rectangle perimeter is ${perimeter} cm, width is ${width} cm`,
  answer: String(length)
};
```

**AFTER**:
```javascript
return {
  questionTemplate: "Rectangle perimeter is [perimeter], width is [width]. Find length.",
  questionRendered: `Rectangle perimeter is ${perimeter} cm, width is ${width} cm. Find length.`,

  values: {
    perimeter: perimeter,
    width: width
  },
  valueMetadata: {
    perimeter: { prefix: "", suffix: " cm", decimals: 0, type: "length" },
    width: { prefix: "", suffix: " cm", decimals: 0, type: "length" }
  },

  answer: length,
  answerMetadata: { prefix: "", suffix: " cm", decimals: 0, type: "length" },

  hintTemplate: "Use: perimeter = 2 × (length + width)",
  hintRendered: "Use: perimeter = 2 × (length + width)",

  locale: "en-GB",
  universal: false,

  type: "text_input",
  module: "M07_Y4_MEAS",
  level: level
};
```

---

### Pattern 4: Mass (type: "mass")

**Applies to**: M01, M02, M09 (10 generators)

**BEFORE**:
```javascript
return {
  text: `An apple weighs ${weight} g`,
  answer: String(weight)
};
```

**AFTER**:
```javascript
return {
  questionTemplate: "An apple weighs [weight]",
  questionRendered: `An apple weighs ${weight} g`,

  values: { weight: weight },
  valueMetadata: {
    weight: { prefix: "", suffix: " g", decimals: 0, type: "mass" }
  },

  answer: weight,
  answerMetadata: { prefix: "", suffix: " g", decimals: 0, type: "mass" },

  locale: "en-GB",
  universal: false,

  type: "text_input",
  module: "M02_Y3_MEAS",
  level: level
};
```

---

### Pattern 5: Volume (type: "volume")

**Applies to**: M01, M02, M08, M09 (12 generators)

**BEFORE**:
```javascript
return {
  text: `A bottle holds ${capacity} ml`,
  answer: String(capacity)
};
```

**AFTER**:
```javascript
return {
  questionTemplate: "A bottle holds [capacity]",
  questionRendered: `A bottle holds ${capacity} ml`,

  values: { capacity: capacity },
  valueMetadata: {
    capacity: { prefix: "", suffix: " ml", decimals: 0, type: "volume" }
  },

  answer: capacity,
  answerMetadata: { prefix: "", suffix: " ml", decimals: 0, type: "volume" },

  locale: "en-GB",
  universal: false,

  type: "text_input",
  module: "M02_Y3_MEAS",
  level: level
};
```

---

### Pattern 6: Area (type: "area")

**Applies to**: M07 (3 generators)

```javascript
return {
  questionTemplate: "Rectangle has area [area]",
  questionRendered: `Rectangle has area ${area} cm²`,

  values: { area: area },
  valueMetadata: {
    area: { prefix: "", suffix: " cm²", decimals: 0, type: "area" }
  },

  answer: area,
  answerMetadata: { prefix: "", suffix: " cm²", decimals: 0, type: "area" },

  locale: "en-GB",
  universal: false,

  type: "text_input",
  module: "M07_Y4_MEAS",
  level: level
};
```

---

### Pattern 7: Time (type: "time")

**Applies to**: M04 (5 generators)

```javascript
return {
  questionTemplate: "A journey takes [duration]",
  questionRendered: `A journey takes ${duration} minutes`,

  values: { duration: duration },
  valueMetadata: {
    duration: { prefix: "", suffix: " minutes", decimals: 0, type: "time" }
  },

  answer: duration,
  answerMetadata: { prefix: "", suffix: " minutes", decimals: 0, type: "time" },

  locale: "en-GB",
  universal: false,

  type: "text_input",
  module: "M04_Y2_MEAS",
  level: level
};
```

---

### Pattern 8: Angle (type: "angle")

**Applies to**: G04 (2 generators)

```javascript
return {
  questionTemplate: "An angle measures [degrees]",
  questionRendered: `An angle measures ${degrees}°`,

  values: { degrees: degrees },
  valueMetadata: {
    degrees: { prefix: "", suffix: "°", decimals: 0, type: "angle" }
  },

  answer: degrees,
  answerMetadata: { prefix: "", suffix: "°", decimals: 0, type: "angle" },

  locale: "en-GB",
  universal: true,  // Angles are universal

  type: "text_input",
  module: "G04_Y5_GEOM",
  level: level
};
```

---

### Pattern 9: Percentage (type: "percentage")

**Applies to**: R03 (1 generator)

```javascript
return {
  questionTemplate: "[percent] of [total] = ?",
  questionRendered: `${percent}% of ${total} = ?`,

  values: {
    percent: percent,
    total: total
  },
  valueMetadata: {
    percent: { prefix: "", suffix: "%", decimals: 0, type: "percentage" },
    total: { prefix: "", suffix: "", decimals: 0, type: "number" }
  },

  answer: result,
  answerMetadata: { prefix: "", suffix: "", decimals: 0, type: "number" },

  locale: "en-GB",
  universal: true,

  type: "text_input",
  module: "R03_Y6_RATIO",
  level: level
};
```

---

## Module Categorization

### Universal Generators (66 total)

**Can work across all locales without modification**

| Module | Count | Type | Universal |
|--------|-------|------|-----------|
| N01 (Counting) | 6 | number | ✅ Yes |
| N02 (Read/Write) | 6 | number | ✅ Yes |
| N03 (Place Value) | 9 | number | ✅ Yes |
| N04 (Representation) | 6 | number | ✅ Yes |
| N05 (Negatives) | 3 | number | ✅ Yes |
| N06 (Problems) | 5 | number | ✅ Yes |
| C01 (Mental Add/Sub) | 4 | number | ✅ Yes |
| C02 (Written Methods) | 5 | number | ✅ Yes |
| C03 (Estimation) | 5 | number | ✅ Yes |
| C05 (Properties) | 2 | number | ✅ Yes |
| C06 (Mental Mult/Div) | 5 | number | ✅ Yes |
| C07 (Written Mult/Div) | 5 | number | ✅ Yes |
| C08 (Properties) | 6 | number | ✅ Yes |
| C09 (Order Ops) | 1 | number | ✅ Yes |
| F01-F06 (Fractions) | 20 | fraction | ✅ Yes |
| G01-G04 (Geometry) | 12 | angle, number | ✅ Yes |
| S01-S03 (Statistics) | 8 | number | ✅ Yes |
| P01 (Position) | 1 | number | ✅ Yes |
| R01-R04 (Ratio) | 4 | number, percentage | ✅ Yes |
| A01 (Algebra) | 1 | number | ✅ Yes |

**Total Universal**: 66 generators

---

### Locale-Specific Generators (35 total)

**Require locale adaptation (currency, units)**

| Module | Count | Type | Universal |
|--------|-------|------|-----------|
| M01 (Comparison) | 4 | length, mass, volume | ❌ No |
| M02 (Measure) | 4 | length, mass, volume | ❌ No |
| M03 (Money) | 3 | money | ❌ No |
| M04 (Time) | 5 | time | ❌ No |
| M05 (Conversions) | 1 | length, mass, volume | ❌ No |
| M06 (Mixed Convert) | 3 | length, mass, volume | ❌ No |
| M07 (Perimeter/Area) | 4 | length, area | ❌ No |
| M08 (Volume) | 2 | volume, area | ❌ No |
| M09 (Meas Problems) | 6 | money, length, mass, volume | ❌ No |
| C04 (Calc Problems)* | 3 | mixed | ❌ No |

**Total Locale-Specific**: 35 generators

*C04 contains mix - some operations universal, some with units

---

## Implementation Steps

### Phase 1: Universal Generators (2-3 days)

**Files**: N01-N06, C01-C09 (66 files)

**Actions**:
1. Remove `formatNumber()` imports
2. Remove `.toLocaleString()` calls
3. Change `answer` from string to number
4. Change `options` from string array to number array
5. Create `questionTemplate` with `[placeholders]`
6. Create `questionRendered` using `.toLocaleString()` for review
7. Add `values` object
8. Add `valueMetadata` with type: "number"
9. Add `answerMetadata` with type: "number"
10. Add `optionsMetadata` array with type: "number"
11. Convert hint to `hintTemplate` + `hintRendered`
12. Add `locale: "en-GB", universal: true`

**Helper function to add to each file**:
```javascript
function createNumberMetadata() {
  return { prefix: "", suffix: "", decimals: 0, type: "number" };
}
```

---

### Phase 2: Money Generators (1 day)

**Files**: M03_Y1-Y3, M09 money problems (6 files)

**Actions**:
1. Remove `formatMoney()` helper function
2. Convert values to decimal (pounds/dollars, not pence/cents)
3. Extract £/$ to `prefix` in metadata
4. Extract p/¢ to `suffix` in metadata
5. Set `decimals: 2` for major units, `decimals: 0` for minor
6. Set `type: "money"` in all metadata
7. Add `locale: "en-GB", universal: false`

**Helper function**:
```javascript
function createMoneyMetadata(unit = "major") {
  if (unit === "major") {
    return { prefix: "£", suffix: "", decimals: 2, type: "money" };
  } else {
    return { prefix: "", suffix: "p", decimals: 0, type: "money" };
  }
}
```

---

### Phase 3: Measurement Generators (2-3 days)

**Files**: M01, M02, M04-M08 (29 files)

**Actions**:
1. Extract units (cm, m, kg, g, ml, l) to `suffix` in metadata
2. Set appropriate `type`: "length", "mass", "volume", "area", "time"
3. Keep values as raw numbers
4. Add `locale: "en-GB", universal: false`

**Helper functions**:
```javascript
function createLengthMetadata(unit = "cm") {
  return { prefix: "", suffix: ` ${unit}`, decimals: 0, type: "length" };
}

function createMassMetadata(unit = "g") {
  return { prefix: "", suffix: ` ${unit}`, decimals: 0, type: "mass" };
}

function createVolumeMetadata(unit = "ml") {
  return { prefix: "", suffix: ` ${unit}`, decimals: 0, type: "volume" };
}

function createAreaMetadata(unit = "cm²") {
  return { prefix: "", suffix: ` ${unit}`, decimals: 0, type: "area" };
}

function createTimeMetadata(unit = "minutes") {
  return { prefix: "", suffix: ` ${unit}`, decimals: 0, type: "time" };
}
```

---

### Phase 4: Update Export Function (1 hour)

**File**: `src/ui/app.js` (lines 807-850)

**Ensure JSON export includes**:
- `questionTemplate`
- `questionRendered`
- `values`
- `valueMetadata`
- `answerMetadata`
- `optionsMetadata` (if multiple choice)
- `hintTemplate`
- `hintRendered`
- `locale`
- `universal`

---

### Phase 5: Testing (1 day)

**Test checklist**:
- [ ] Generate questions from 5 universal modules
- [ ] Generate questions from 3 money modules
- [ ] Generate questions from 3 measurement modules
- [ ] Verify `questionRendered` looks correct
- [ ] Verify `questionTemplate` has correct [placeholders]
- [ ] Verify all metadata present and correct
- [ ] Export to JSON and validate structure
- [ ] Check that `answer` is number, not string
- [ ] Check that `options` are numbers, not strings
- [ ] Verify `optionsMetadata` is array matching `options` length

---

## Question Server Logic

### Server-Side Rendering Function

```javascript
/**
 * Render question for a specific locale
 */
function renderQuestion(questionObj, userLocale) {
  // For matching locale, can use pre-rendered version
  if (questionObj.locale === userLocale) {
    return questionObj.questionRendered;
  }

  // For different locale, re-render from template
  let text = questionObj.questionTemplate;

  // Replace all [placeholder] values
  for (const [key, value] of Object.entries(questionObj.values)) {
    let meta = { ...questionObj.valueMetadata[key] };

    // Apply locale-specific transformations
    meta = applyLocaleToMetadata(meta, userLocale, questionObj.locale);

    // Format the value
    const formatted = formatValue(value, meta, userLocale);

    // Replace placeholder in template
    text = text.replace(`[${key}]`, formatted);
  }

  return text;
}

/**
 * Apply locale transformations to metadata
 */
function applyLocaleToMetadata(metadata, targetLocale, sourceLocale) {
  const meta = { ...metadata };

  // Currency conversions (symbol only, not value)
  if (meta.type === "money") {
    if (sourceLocale === "en-GB" && targetLocale === "en-US") {
      if (meta.prefix === "£") meta.prefix = "$";
      if (meta.suffix === "p") meta.suffix = "¢";
    }
    if (sourceLocale === "en-US" && targetLocale === "en-GB") {
      if (meta.prefix === "$") meta.prefix = "£";
      if (meta.suffix === "¢") meta.suffix = "p";
    }
  }

  // Measurement units (keep metric as universal for now)
  // Future: Could convert cm → inches, kg → pounds, etc.

  return meta;
}

/**
 * Format a single value with metadata
 */
function formatValue(value, metadata, locale) {
  const { prefix = "", suffix = "", decimals = 0 } = metadata;

  // Format number with locale-specific separators
  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return `${prefix}${formatted}${suffix}`;
}

/**
 * Render options for multiple choice
 */
function renderOptions(questionObj, userLocale) {
  return questionObj.options.map((optionValue, index) => {
    let meta = { ...questionObj.optionsMetadata[index] };
    meta = applyLocaleToMetadata(meta, userLocale, questionObj.locale);
    return formatValue(optionValue, meta, userLocale);
  });
}

/**
 * Render hint
 */
function renderHint(questionObj, userLocale) {
  if (!questionObj.hintTemplate) return null;

  let hint = questionObj.hintTemplate;

  for (const [key, value] of Object.entries(questionObj.values)) {
    let meta = { ...questionObj.valueMetadata[key] };
    meta = applyLocaleToMetadata(meta, userLocale, questionObj.locale);
    const formatted = formatValue(value, meta, userLocale);
    hint = hint.replace(`[${key}]`, formatted);
  }

  return hint;
}
```

---

### Filtering Questions by Type

```javascript
/**
 * Filter questions by value type
 */
function filterQuestionsByType(questions, types) {
  return questions.filter(q => {
    // Check if any value in question matches type filter
    const hasMatchingType = Object.values(q.valueMetadata || {}).some(
      meta => types.includes(meta.type)
    );
    return hasMatchingType;
  });
}

// Examples:
const moneyQuestions = filterQuestionsByType(allQuestions, ["money"]);
const measurementQuestions = filterQuestionsByType(allQuestions,
  ["length", "mass", "volume", "area"]);
const pureNumberQuestions = filterQuestionsByType(allQuestions, ["number"]);
```

---

### Filtering Questions by Locale

```javascript
/**
 * Get questions for user's locale
 */
function getQuestionsForUser(allQuestions, userLocale) {
  return allQuestions.filter(q => {
    // Always include universal questions
    if (q.universal) return true;

    // Include locale-specific questions matching user's locale
    return q.locale === userLocale;
  });
}

// Example:
const ukUser = { locale: "en-GB" };
const ukQuestions = getQuestionsForUser(allQuestions, ukUser.locale);
// Returns: All universal questions + en-GB specific questions

const usUser = { locale: "en-US" };
const usQuestions = getQuestionsForUser(allQuestions, usUser.locale);
// Returns: All universal questions + en-US specific questions (when available)
```

---

## Benefits

### 1. Clean Data Separation
- **Generators**: Focus on math/logic, output raw data
- **Question Server**: Handles all formatting, rendering, localization

### 2. Multi-Locale Support
- Same question data can render for UK, US, EU users
- Currency symbols swap automatically (£ ↔ $)
- Number formatting follows locale (1,234 vs 1.234)

### 3. Flexible Answer Validation
- Question server can accept multiple formats for same answer
- "£2.50", "250p", "2.5" all valid for same numeric value
- Type metadata helps validate appropriate format

### 4. Easy Filtering & Analytics
- Filter questions by type (money, length, mass)
- Filter by locale (universal vs locale-specific)
- Track student performance by value type

### 5. Better Data Export
- JSON exports contain clean numeric data
- Can perform calculations on exported data
- Easy to import into databases, analytics tools

### 6. Maintainability
- 90% reduction in formatting code duplication
- Central formatting logic in question server
- Add new locales without touching generators

### 7. Scalability
- Add new measurement systems (imperial) without rewriting
- Support new currencies (€, ¥) by adding to server
- Easy to extend with new value types

---

## Summary Checklist

### Per Generator File Changes:

- [ ] Remove `formatNumber()` / `.toLocaleString()` calls
- [ ] Change `answer` from string to number
- [ ] Change `options` from strings to numbers
- [ ] Create `questionTemplate` with `[placeholders]`
- [ ] Create `questionRendered` for human review
- [ ] Create `hintTemplate` with `[placeholders]`
- [ ] Create `hintRendered` for human review
- [ ] Add `values` object with raw numbers
- [ ] Add `valueMetadata` with prefix, suffix, decimals, type
- [ ] Add `answerMetadata` with prefix, suffix, decimals, type
- [ ] Add `optionsMetadata` array with prefix, suffix, decimals, type (if multiple choice)
- [ ] Add `locale: "en-GB"`
- [ ] Add `universal: true` or `false`

### Total Impact:

- **Files to modify**: 101 generator files
- **Helpers to remove**: formatNumber(), formatMoney()
- **New schema fields**: 9 (questionTemplate, questionRendered, values, valueMetadata, answerMetadata, optionsMetadata, hintTemplate, hintRendered, locale, universal)
- **Estimated effort**: 6-8 days
- **Benefits**: Clean data, multi-locale support, better exports, easier maintenance

---

## Next Steps

1. **Pilot implementation**: Start with 1-2 universal generators (e.g., C01_Y2_CALC)
2. **Validate schema**: Test JSON export, verify structure
3. **Build question server renderer**: Implement `renderQuestion()` function
4. **Test rendering**: Verify UK and US locales work correctly
5. **Roll out to all generators**: Apply pattern to remaining 99 files
6. **Update documentation**: Add to CLAUDE.md

---

**End of Refactoring Plan**
