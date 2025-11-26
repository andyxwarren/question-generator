# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

This is a pure JavaScript application using ES6 modules. It requires a web server to run due to CORS restrictions:

```bash
# Python (recommended)
python -m http.server 8000

# Node.js
npx http-server -p 8000

# VS Code
# Install "Live Server" extension and right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000` in a browser.

**Important**: Do NOT open `index.html` directly with `file://` protocol - ES6 modules will fail due to CORS.

## Architecture Overview

This is a UK National Curriculum-aligned mathematics practice application following a **parameter-based architecture** with three core layers:

### 1. Curriculum Layer (`src/curriculum/`)
- `parameters/` directory contains parameter files organized by module series (e.g., `N01_counting.js`, `C02_written.js`)
- Each module has an ID based on UK National Curriculum codes (e.g., `N01_Y1_NPV`)
- Parameters use **V2 Nested Schema** with `math` and `presentation` separation
- Levels: 1=Beginning, 2=Developing, 3=Meeting, 4=Exceeding

### 2. Generator Layer (`src/generators/`)
- Each file generates questions for one curriculum module (e.g., `N01_Y1_NPV_counting.js`)
- Generators are **pure functions** that take V2 nested parameters and level, return question objects
- Question types: `text_input`, `multiple_choice`, `fill_blanks`, `next_number`
- All generators must export: `{ moduleId, generate }`

### 3. Core Layer (`src/core/`)
- `schemas/` - Strand-specific parameter validation (see Schema Validation section)
- `questionEngine.js` - Registry pattern for generators, orchestrates question creation
- `validator.js` - Validates student answers (handles text, numbers, multi-gap)

### Key Design Patterns
- **Registry Pattern**: QuestionEngine maintains a Map of generators keyed by moduleId
- **Pure Functions**: Generators have no side effects, can be called repeatedly
- **Parameter-Driven**: All question constraints come from parameters, not hardcoded
- **Singleton**: QuestionEngine is exported as a singleton instance
- **V2 Nested Schema**: Strict separation of `math` and `presentation` concerns

---

## V2 Nested Parameter Schema

**CRITICAL**: All modules use the V2 "Nested" architecture. Parameters are strictly separated into:
- `operations`: Array of operation types to generate (root level)
- `math`: Mathematical constraints (ranges, steps, units)
- `presentation`: Visual/contextual settings (gaps, styles, contexts)

### Schema Structure by Strand

```javascript
// src/core/schema.js defines these structures:

// NUMBER STRAND (N)
{
    operations: ['count_forwards', 'count_backwards', 'fill_gap'],
    math: {
        range: { min: 0, max: 100 },
        sequence: {
            steps: [2, 5, 10],
            length: 4,
            directions: ['forwards', 'backwards'],
            startStrategy: 'zero_or_multiple'
        },
        placeValue: { places: ['ones', 'tens'], includeZero: false },
        rounding: { bases: [10, 100] }
    },
    presentation: {
        gaps: { position: 'middle', count: 1 },
        numberLine: { show: true, labeled: true },
        contexts: ['counting', 'sequences']
    }
}

// CALCULATION STRAND (C)
{
    operations: ['addition_no_carry', 'subtraction_with_borrow'],
    math: {
        range: { max: 999, result: [0, 1999] },
        components: { ones: [1, 9], tens: [10, 90] },
        tables: [2, 5, 10],
        targets: [20, 50, 100],
        config: { allowZero: true, regrouping: 'single' }
    },
    presentation: {
        styles: ['equation', 'word_problem', 'columnar'],
        format: 'horizontal',
        contexts: ['shopping', 'measures'],
        hint: 'Use written column method'
    }
}

// MEASUREMENT STRAND (M)
{
    operations: ['direct_conversion', 'word_problem'],
    math: {
        types: ['length', 'mass', 'capacity'],
        units: { length: ['km', 'm', 'cm'], mass: ['kg', 'g'] },
        ranges: { km: { min: 1, max: 10 } },
        conversions: { length: ['km_to_m', 'm_to_cm'] },
        scale: { min: 0, max: 100, interval: 10 }
    },
    presentation: {
        contexts: ['shopping', 'recipes'],
        visuals: true,
        format: 'word_problem'
    }
}
```

---

## Adding New Curriculum Modules

### 1. Define Parameters (V2 Format)

Create or update a parameter file in `src/curriculum/parameters/`:

```javascript
// Example: src/curriculum/parameters/N01_counting.js

const MIGRATED_PARAMS = {
    N01_Y3_NPV: {
        1: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [4, 8, 50],
                    length: 4,
                    directions: ['forwards'],
                    startStrategy: 'zero_only'
                }
            },
            presentation: {
                gaps: { position: 'end', count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 400 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 4,
                    directions: ['forwards'],
                    startStrategy: 'zero_only'
                }
            },
            presentation: {
                gaps: { position: 'middle', count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 600 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 3,
                    directions: ['forwards', 'backwards'],
                    startStrategy: 'zero_or_multiple'
                }
            },
            presentation: {
                gaps: { position: 'middle', count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 800 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 3,
                    directions: ['forwards', 'backwards'],
                    startStrategy: 'zero_or_multiple'
                }
            },
            presentation: {
                gaps: { position: 'random', count: 1 }
            }
        }
    }
};

export const N01_MODULES = {
    'N01_Y3_NPV': {
        id: 'N01_Y3_NPV',
        name: 'N01_Y3_NPV: Counting from 0',
        description: 'Count from 0 in multiples of 4, 8, 50 and 100',
        icon: '🔢',
        yearGroup: '3',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: MIGRATED_PARAMS['N01_Y3_NPV']
    }
};
```

### 2. Create Generator (V2 Pattern)

Create generator in `src/generators/`:

```javascript
// Example: src/generators/N01_Y3_NPV_counting.js

import { randomChoice, getStartValue, generateSequence, getGapPosition }
    from './helpers/N01_countingHelpers.js';

export function generateQuestion(params, level) {
    // 1. DESTRUCTURE V2 SCHEMA - This is the critical pattern
    const {
        math: {
            range: { min, max },
            sequence: { steps, length, directions, startStrategy }
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    // 2. Use destructured values
    const step = randomChoice(steps);
    const direction = randomChoice(directions);
    let start = getStartValue({ startStrategy, min, max }, step);

    // 3. Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

    // 4. Generate sequence and question
    const fullSequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

    const displaySequence = fullSequence.map((num, idx) =>
        idx === gapIndex ? '__' : num.toString()
    );

    return {
        text: `What is the missing number? ${displaySequence.join(', ')}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y3_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};
```

### 3. Register Generator

In `src/core/questionEngine.js`:

```javascript
import N01_Y3_generator from '../generators/N01_Y3_NPV_counting.js';

registerDefaultGenerators() {
    // ... existing
    this.register(N01_Y3_generator);
}
```

---

## V2 Parameter Reference by Strand

### Number Strand (N) - Math Parameters

```javascript
math: {
    range: { min: 0, max: 1000 },           // Bounds for generated numbers
    sequence: {
        steps: [4, 8, 50, 100],              // Counting increments (Y1-4)
        // OR for Year 5+:
        powersOf10: [10, 100, 1000],         // Powers of 10 for Y5+
        length: 4,                            // Sequence length
        directions: ['forwards', 'backwards'],
        startStrategy: 'zero_only' | 'any' | 'zero_or_multiple' | 'non_zero',
        tensFromAny: true,                   // For Y2: tens from any number
        tensRange: [0, 100]                  // Range for tens starting
    },
    placeValue: {
        places: ['ones', 'tens', 'hundreds'],
        includeZero: true
    },
    rounding: { bases: [10, 100, 1000] },
    roman: { min: 1, max: 12 }              // For Roman numerals
}
```

### Number Strand (N) - Presentation Parameters

```javascript
presentation: {
    gaps: {
        position: 'end' | 'middle' | 'random' | 'start',
        count: 1
    },
    numberLine: { show: true, labeled: true },
    contexts: ['counting', 'sequences'],
    comparison: { symbols: ['<', '>', '='] }
}
```

### Calculation Strand (C) - Math Parameters

```javascript
math: {
    range: {
        max: 999,                           // Maximum operand value
        max_2digit: 99,                     // For 2-digit operations
        max_3digit: 999,                    // For 3-digit operations
        min3: 100, max3: 999,               // 3-digit ranges
        min4: 1000, max4: 9999,             // 4-digit ranges
        result: [0, 1999],                  // Result bounds
        resultMax: 9999
    },
    components: {
        ones: [1, 9],                       // Single digit range
        tens: [10, 90]                      // Tens range
    },
    tables: [2, 3, 4, 5, 8, 10],           // Times tables
    targets: [10, 20, 50, 100],            // Number bonds targets
    config: {
        allowZero: true,
        noCarry: true,                      // No carrying required
        noBorrow: true,                     // No borrowing required
        allowSingleCarry: true,             // Single carry/borrow
        allowMultiCarry: true,              // Multiple carry/borrow
        avoidBridging: true,                // Avoid tens boundary
        threeNumbersMax: 20,                // Max for 3-number addition
        exceed1000: true,                   // Allow results > 1000
        missingPositions: ['start', 'middle', 'end']
    }
}
```

### Calculation Strand (C) - Presentation Parameters

```javascript
presentation: {
    styles: ['equation', 'word_problem', 'missing_number', 'columnar', 'reasoning'],
    format: 'horizontal' | 'vertical',
    contexts: ['shopping', 'measures', 'abstract'],
    hint: 'Use written column method'
}
```

### Measurement Strand (M) - Math Parameters

```javascript
math: {
    types: ['length', 'mass', 'capacity', 'time'],
    units: {
        length: ['km', 'm', 'cm', 'mm'],
        mass: ['kg', 'g'],
        capacity: ['l', 'ml'],
        time: ['hours', 'minutes', 'seconds']
    },
    ranges: {
        km: { min: 1, max: 10 },
        m: { min: 1, max: 1000 }
    },
    conversions: {
        length: ['km_to_m', 'm_to_cm', 'cm_to_mm'],
        mass: ['kg_to_g'],
        capacity: ['l_to_ml'],
        time: ['hours_to_minutes']
    },
    valueType: ['whole_only', 'whole', 'decimal'],
    decimalPlaces: 2,
    denominations: [1, 2, 5, 10, 20, 50, 100, 200],  // Money
    scale: { min: 0, max: 100, interval: 10 }
}
```

### Measurement Strand (M) - Presentation Parameters

```javascript
presentation: {
    contexts: ['shopping', 'recipes', 'travel'],
    visuals: true,
    format: 'word_problem' | 'direct',
    wordProblems: true
}
```

---

## Generator Destructuring Pattern

**All generators MUST follow this V2 destructuring pattern:**

```javascript
export function generateQuestion(params, level) {
    // ALWAYS destructure math and presentation first
    const { math, presentation } = params;

    // Then destructure specific values
    const { range, sequence, config } = math;
    const { gaps, styles, contexts } = presentation;

    // OR use deep destructuring:
    const {
        math: {
            range: { min, max },
            sequence: { steps, length }
        },
        presentation: {
            gaps: { position, count }
        }
    } = params;

    // ... rest of generator logic
}
```

---

## Question Object Schema

All generators must return objects with this structure:

```javascript
{
    text: string,           // Question text shown to student
    type: 'text_input' | 'multiple_choice',
    answer: string,         // Correct answer (always string, even for numbers)
    // For multiple choice:
    options: number[],      // Array of options to choose from
    // For text input:
    hint: string,           // Optional hint
    answers: any[],         // For multi-gap questions (array of answers)
    // Added automatically:
    id: string,             // Unique ID (added by QuestionEngine)
    timestamp: number,      // Generation timestamp (added by QuestionEngine)
    module: string,         // Module ID
    level: number           // Difficulty level (1-4)
}
```

---

## File Structure

```
src/
├── curriculum/
│   ├── parameters.js            # Central module registry
│   └── parameters/
│       ├── N01_counting.js      # Number: Counting modules
│       ├── N02_readwrite.js     # Number: Read/Write modules
│       ├── N03_placevalue.js    # Number: Place Value
│       ├── C01_mental.js        # Calculation: Mental methods
│       ├── C02_written.js       # Calculation: Written methods
│       ├── M01_measurement.js   # Measurement: Comparison
│       ├── M04_time.js          # Measurement: Time
│       └── ...
├── generators/
│   ├── N01_Y1_NPV_counting.js   # Year 1 counting
│   ├── N01_Y2_NPV_counting.js   # Year 2 counting
│   ├── C02_Y3_CALC_written.js   # Year 3 written methods
│   └── helpers/
│       ├── N01_countingHelpers.js
│       ├── C02_columnarHelpers.js
│       ├── visualHelpers.js
│       ├── scaleHelpers.js
│       ├── contextualRanges.js
│       └── M04_timeHelpers.js
├── core/
│   ├── schemas/
│   │   ├── index.js             # Unified schema entry point
│   │   ├── validators.js        # Type-checking utilities
│   │   ├── NumberSchema.js      # N01-N06 schemas
│   │   ├── CalculationSchema.js # C01-C09 schemas
│   │   └── MeasurementSchema.js # M01-M09 schemas
│   ├── questionEngine.js        # Generator registry & orchestration
│   └── validator.js             # Answer validation
└── ui/
    └── app.js                   # Main UI controller

styles/                          # CSS files
index.html                       # Entry point
test-schemas.js                  # Schema validation test script
```

---

## Helper Organization

Helpers are organized in `src/generators/helpers/`:

- **N01_countingHelpers.js** - Sequence generation, start value calculation
- **N02_numberHelpers.js** - Random choice, number formatting
- **N03_placeValueHelpers.js** - Place value operations
- **C01_C03_calculationHelpers.js** - Basic calculation utilities
- **C02_columnarHelpers.js** - Columnar layout formatting
- **C04_problemHelpers.js** - Word problem generation
- **visualHelpers.js** - Dot arrays, emoji groups, visual representations
- **scaleHelpers.js** - Scale/measurement visuals
- **contextualRanges.js** - Realistic measurement estimation
- **M04_timeHelpers.js** - Clock generation, time manipulation

---

## Answer Validation System

The validator (`src/core/validator.js`) handles:

- **Exact string matching** (normalized: trimmed, lowercase, no spaces)
- **Numeric comparison** with tolerance (handles floating point precision)
- **Multi-gap answers** (comma-separated values, order-independent)
- **Empty answer detection**

Multi-gap questions store answers two ways:
- `answer`: Comma-separated string (e.g., `"5,10,15"`)
- `answers`: Array (e.g., `[5, 10, 15]`)

---

## Schema Validation System

Parameters are validated against strand-specific schemas on every `getParameters()` call.

### Architecture

```
src/core/schemas/
├── index.js              # Unified entry point - validateParameters(), getSchema()
├── validators.js         # Type-checking utilities (isNumber, isArray, etc.)
├── NumberSchema.js       # N01-N06 schemas and validation
├── CalculationSchema.js  # C01-C09 schemas and validation
└── MeasurementSchema.js  # M01-M09 schemas and validation
```

### Usage

```javascript
// Automatic validation (integrated into getParameters)
import { getParameters } from './curriculum/parameters.js';
const params = getParameters('N01_Y3_NPV', 2);  // Validates automatically

// Direct schema access
import { validateParameters, getSchema, getValidValues } from './core/schemas/index.js';

// Validate parameters
const errors = validateParameters('M04_Y3_MEAS', 3, params);
if (errors.length > 0) console.warn('Validation errors:', errors);

// Get schema for inspection
const schema = getSchema('N01_Y2_NPV');

// Get valid values for enumerated fields
const validValues = getValidValues('C01_Y2_CALC');
console.log(validValues.operations);  // ['number_bonds', 'missing_part', ...]
```

### Validation Behavior

- **Strict mode**: Unknown fields trigger errors (catches typos)
- **Type checking**: Validates numbers, strings, booleans, arrays, objects
- **Range validation**: Ensures min <= max for range objects
- **Enumerated values**: Validates operations, styles against allowed values
- **Warnings**: Logged to console but don't block parameter retrieval

### Testing

Run schema validation across all modules:
```bash
node test-schemas.js
```

### Adding Schema Support for New Modules

When adding a new module series, update the appropriate schema file:

1. Add schema definition with field types
2. Add valid values for enumerated fields
3. Update exports and validation function
4. Run `node test-schemas.js` to verify

---

## ES6 Modules

All files use ES6 modules:
- Use `export` for functions/objects
- Use `import` with `.js` extensions
- No bundler required (native browser support)
- Module paths must be relative and include `.js`

---

## Visual Display Philosophy: Low-Overhead Solutions

When implementing visual representations, **prioritize simple, low-overhead solutions**:

### Guiding Principles

1. **90/10 Rule**: Deliver 90% of visual benefits for 10% of implementation effort
2. **HTML/CSS First**: Leverage native capabilities before complex solutions
3. **No Over-Engineering**: Avoid Canvas, complex SVG, third-party libraries unless essential
4. **Maintenance Cost**: Simpler code is easier to debug and modify

### Recommended Approaches

**Low Overhead (Preferred):**
- Styled `<pre>` tags for formatted text (columnar calculations)
- CSS Grid/Flexbox for structured layouts (ten frames, base-10 blocks)
- Unicode characters for symbols (●, →, ⬜)
- Simple HTML generation functions (no state, no lifecycle)

**Medium Overhead (When Justified):**
- Inline SVG for geometric shapes
- Simple Canvas for pixel-perfect rendering

**High Overhead (Avoid Unless Critical):**
- Complex interactive visualizations
- Third-party charting libraries
- Animations requiring requestAnimationFrame

### Example: Columnar Calculations

```javascript
// Simple, low-overhead approach
export function formatColumnar(num1, num2, operator) {
    const maxLen = Math.max(num1.toString().length, num2.toString().length);
    const num1Padded = num1.toString().padStart(maxLen + 2, ' ');
    const num2Padded = num2.toString().padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">  ${num1Padded}
${operator} ${num2Padded}
${line}
  ?</pre>`;
}
```

---

## Difficulty Level Guidelines

### Level 1 (Beginning)
- Smallest ranges, fewest options
- Most scaffolding/visual support
- Start from zero, forwards only
- Simple operations

### Level 2 (Developing)
- Moderate ranges, more options
- Some scaffolding
- May include backwards, from multiples
- Mix of operations

### Level 3 (Meeting Curriculum)
- Full curriculum ranges
- Minimal scaffolding
- All directions, any start
- Full operation coverage

### Level 4 (Exceeding)
- Extended ranges (not new concepts)
- No scaffolding
- Random positioning, harder variations
- Challenge variations
