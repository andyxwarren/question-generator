---
name: generator-template
description: Generator code patterns and principles for UK Maths Question Generator. Use when implementing new generators or reviewing generator code structure.
---

# Generator Patterns

## Immutable Principles

These principles MUST always be followed. They are non-negotiable.

### 1. Pure Function
Every generator is a pure function with no side effects:
```javascript
export function generateQuestion(params, level) {
    // Takes params + level, returns question object
    // No state modification, no external dependencies
}
```

### 2. Destructure First
Always destructure `math` and `presentation` before using values:
```javascript
// CORRECT - destructure then use
const { math, presentation } = params;
const { range } = math;

// WRONG - direct dot notation without destructuring
const min = params.math.range.min;  // NO!
```

### 3. Return Required Fields
Every question must include these fields:
```javascript
return {
    text: string,      // Question shown to student
    type: string,      // 'text_input' | 'multiple_choice' | 'fill_blanks'
    answer: string,    // Correct answer (ALWAYS string)
    module: string,    // Module ID
    level: number      // Difficulty level (1-4)
};
```

### 4. Display Metadata for Visuals
Any question with visual elements must include a `display` object:
```javascript
return {
    // ... required fields ...
    display: {
        type: string,  // Identifies the visual type
        // ... all data needed to render the visual
    }
};
```

### 5. Answer as String
Always convert answers to strings:
```javascript
answer: answer.toString()  // Even for numbers
```

---

## Basic Generator Structure

```javascript
// src/generators/MODULE_ID.js

import { randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    // 1. DESTRUCTURE - extract what YOUR module needs
    const { math, presentation } = params;
    // Further destructure based on your parameter structure

    // 2. SELECT - pick values from parameter options
    // Use randomChoice() for arrays, randomInt() for ranges

    // 3. GENERATE - create the question content
    // Apply your module's specific logic

    // 4. RETURN - question object with display metadata
    return {
        text: "...",
        type: "text_input",
        answer: "...",
        module: "MODULE_ID",
        level: level,
        display: {
            type: "...",
            // ... visual data
        }
    };
}

export default {
    moduleId: 'MODULE_ID',
    generate: generateQuestion
};
```

---

## Flexible Destructuring

The PATTERN is: destructure what YOUR module needs from `math` and `presentation`.

### The Pattern (adapt to your params)

```javascript
// Step 1: Always start with math and presentation
const { math, presentation } = params;

// Step 2: Destructure what YOUR module needs from each
// This varies based on your parameter structure!
```

### Examples of Valid Destructuring

Different modules have different parameter structures. Here are examples:

```javascript
// Counting module with sequences
const { math, presentation } = params;
const { range, sequence } = math;
const { gaps, visualType } = presentation;

// Calculation module with operations
const { operations, math, presentation } = params;
const { range, components, config } = math;
const { styles, contexts } = presentation;

// Fractions module (hypothetical)
const { math, presentation } = params;
const { numerator, denominator } = math;
const { visualType } = presentation;

// Geometry module (hypothetical)
const { math, presentation } = params;
const { shapes, angles, sides } = math;
const { showLabels, gridSize } = presentation;
```

### Deep Destructuring (optional)

For conciseness, you can destructure nested values directly:

```javascript
// Deep destructuring into specific values
const {
    math: {
        range: { min, max },
        sequence: { steps, length }
    },
    presentation: {
        gaps: { position }
    }
} = params;
```

---

## Question Object Schema

### Required Fields

```javascript
{
    text: string,        // Question text shown to student
    type: string,        // 'text_input' | 'multiple_choice' | 'fill_blanks'
    answer: string,      // Correct answer (always string, even for numbers)
    module: string,      // Module ID (e.g., 'N01_Y3_NPV')
    level: number        // Difficulty level (1-4)
}
```

### Conditional Fields

```javascript
{
    options: any[],      // Only if type === 'multiple_choice'
    answers: any[],      // Only for multi-gap questions (array form)
    hint: string         // Optional hint text
}
```

### Display Metadata

```javascript
{
    display: {
        type: string,    // Visual type identifier
        // ... type-specific fields (see /project:display-metadata)
    }
}
```

---

## Reference Examples

These are examples of how existing modules structure their generators. They are NOT required patterns - adapt to your module's needs.

### Counting/Sequence Generator

```javascript
export function generateQuestion(params, level) {
    const {
        math: { range: { min, max }, sequence: { steps, length, directions, startStrategy } },
        presentation: { gaps: { position }, visualType }
    } = params;

    const step = randomChoice(steps);
    const direction = randomChoice(directions);
    const start = getStartValue({ startStrategy, min, max }, step);

    const fullSequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

    return {
        text: `What is the missing number? ${formatSequence(fullSequence, gapIndex)}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Count ${direction} in ${step}s`,
        module: 'N01_Y3_NPV',
        level: level,
        display: {
            type: visualType || 'sequence',
            values: fullSequence,
            gapIndices: [gapIndex],
            step: step,
            direction: direction
        }
    };
}
```

### Calculation Generator

```javascript
export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const { range, config } = math;
    const { styles, contexts } = presentation;

    const operation = randomChoice(operations);
    const style = randomChoice(styles);

    // Generate operands based on operation and config
    const { num1, num2, result } = generateOperands(operation, range, config);

    return {
        text: formatQuestion(num1, num2, operation, style),
        type: 'text_input',
        answer: result.toString(),
        module: 'C02_Y3_CALC',
        level: level,
        display: {
            type: style === 'columnar' ? 'columnar' : 'text_only',
            num1: num1,
            num2: num2,
            operator: getOperatorSymbol(operation)
        }
    };
}
```

### Measurement Generator

```javascript
export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const { types, units, ranges } = math;
    const { contexts, wordProblems } = presentation;

    const measureType = randomChoice(types);
    const unit = randomChoice(units[measureType]);
    const value = randomInRange(ranges[unit]);

    return {
        text: generateMeasurementQuestion(measureType, value, unit, contexts),
        type: 'text_input',
        answer: calculateAnswer(value, unit).toString(),
        module: 'M05_Y4_MEAS',
        level: level,
        display: {
            type: 'text_only'
        }
    };
}
```

### Locale-Aware Measurement Generator

For measurement modules supporting both metric and imperial systems:

#### 1. Import Parameter Resolver

```javascript
import { resolveParameters } from '../curriculum/parameterResolver.js';
```

#### 2. Resolve Parameters First

```javascript
export function generateQuestion(params, level, locale = 'en-GB') {
    // CRITICAL: Resolve parameters for locale (flattens metric/imperial)
    const resolvedParams = resolveParameters(params, locale);

    // Destructure resolved params (metric/imperial now flattened to units/ranges)
    const {
        math: { types, units, ranges, comparisonType },
        presentation: { visualType },
        _resolvedSystem  // 'metric' or 'imperial'
    } = resolvedParams;

    const system = _resolvedSystem || 'metric';
    // ...
}
```

#### 3. Pass System to Helpers

```javascript
// Helper functions need system for correct base unit conversions
const measurement = generateMeasurement(unit, ranges, measureType, locale, system);
const [m1, m2] = generateComparisonPair(measureType, mathParams, locale, system);
```

#### 4. Typed Values Include System

```javascript
// For imperial measurements, typed values include _s field
{
    _v: 63,           // Value in base units (inches for length)
    _t: 'length',     // Measurement type
    _d: 'mixed_ft_in', // Display hint
    _s: 'imperial'    // System indicator (omitted for metric)
}
```

#### Complete Example

```javascript
import { resolveParameters } from '../curriculum/parameterResolver.js';
import { generateComparisonPair, compareMeasurements } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level, locale = 'en-GB') {
    // 1. Resolve metric/imperial based on locale
    const resolvedParams = resolveParameters(params, locale);

    const {
        math: { types, units, ranges, comparisonType },
        presentation: { questionTypes },
        _resolvedSystem
    } = resolvedParams;

    const system = _resolvedSystem || 'metric';
    const measureType = randomChoice(types);

    // 2. Pass system to helpers
    const [m1, m2] = generateComparisonPair(measureType, { units, ranges }, locale, system);

    // 3. Measurements have typed values with system indicator
    return {
        text: `Which is greater: ${m1.displayText} or ${m2.displayText}?`,
        type: 'multiple_choice',
        answer: compareMeasurements(m1, m2) === 'greater' ? m1.displayText : m2.displayText,
        module: 'M01_Y4_MEAS',
        level: level,
        values: {
            v1: m1.typed,  // { _v: 100, _t: 'length', _d: 'cm' } or { _v: 36, _t: 'length', _d: 'in', _s: 'imperial' }
            v2: m2.typed
        }
    };
}
```

---

## Parameter File Structure

```javascript
// src/curriculum/parameters/SERIES_name.js

const MODULE_PARAMS = {
    MODULE_ID: {
        1: {
            // Level 1 - adapt structure to your module
            math: { /* mathematical constraints */ },
            presentation: { /* display settings */ }
        },
        2: { /* Level 2 */ },
        3: { /* Level 3 - curriculum standard */ },
        4: { /* Level 4 - exceeding */ }
    }
};

export const SERIES_MODULES = {
    'MODULE_ID': {
        id: 'MODULE_ID',
        name: 'Human-readable name',
        description: 'Brief description',
        icon: '🔢',
        yearGroup: '3',
        strand: 'Strand name',
        parameters: MODULE_PARAMS['MODULE_ID']
    }
};
```

---

## Generator Registration

In `src/core/questionEngine.js`:

```javascript
import newModuleGenerator from '../generators/MODULE_ID.js';

registerDefaultGenerators() {
    // ... existing generators
    this.register(newModuleGenerator);
}
```

---

## Common Helpers

Available helpers to use in generators:

```javascript
// Random selection
import { randomChoice, randomInt } from './helpers/N02_numberHelpers.js';
const item = randomChoice(array);     // Pick random from array
const num = randomInt(min, max);      // Random integer in range

// Sequence generation
import { generateSequence, getGapPosition } from './helpers/N01_countingHelpers.js';

// Columnar formatting
import { formatColumnar } from './helpers/C02_columnarHelpers.js';

// Visual helpers
import { createDotArray } from './helpers/visualHelpers.js';
```

---

## Question Type Examples

### Text Input

```javascript
return {
    text: "What is 7 + 5?",
    type: "text_input",
    answer: "12",
    module: "MODULE_ID",
    level: level
};
```

### Multiple Choice

```javascript
return {
    text: "What is 7 + 5?",
    type: "multiple_choice",
    answer: "12",
    options: [10, 11, 12, 13],  // Include correct answer
    module: "MODULE_ID",
    level: level
};
```

### Multi-Gap (Fill Blanks)

```javascript
return {
    text: "Fill in the gaps: 4, __, 12, __",
    type: "fill_blanks",
    answer: "8,16",           // Comma-separated string
    answers: [8, 16],         // Array form
    module: "MODULE_ID",
    level: level,
    display: {
        type: "sequence",
        values: [4, null, 12, null],
        gapIndices: [1, 3]
    }
};
```

---

## Best Practices

### Do

- Destructure `math` and `presentation` at the start
- Use `randomChoice()` for selecting from parameter arrays
- Always return `answer` as a string
- Include `display` object for any visual question
- Keep generators as pure functions (no side effects)
- Document any custom parameter structures in comments

### Don't

- Hardcode values that should come from parameters
- Access params with dot notation without destructuring first
- Return numbers directly as answers (convert to string)
- Skip display metadata for visual questions
- Modify params or maintain state between calls
- Assume specific parameter structure without checking

---

## Testing

```bash
# Test via CLI
node generate.js --module MODULE_ID --level 3 --count 5 --format pretty

# Verify all levels
node generate.js --module MODULE_ID --levels 1,2,3,4 --count 3 --format json
```
