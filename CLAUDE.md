# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

This is a **Node.js CLI tool** using ES6 modules. Requires Node.js 18+.

```bash
# Basic usage - generate questions
node generate.js --module N01_Y3_NPV --level 3 --count 10

# Filter by strand and year, pretty output
node generate.js --strand Number --year 3 --format pretty

# Export to file
node generate.js --module C02_Y3_CALC --format csv --output questions.csv

# List available modules
node generate.js --list --strand Calculation

# Show help
node generate.js --help
```

**CLI Arguments:**
- `--module <id>` - Specific module ID (e.g., N01_Y3_NPV)
- `--strand <name>` - Filter by strand (Number, Calculation, Measurement)
- `--substrand <name>` - Filter by substrand
- `--year <n>` - Filter by year group (1-6)
- `--level <n>` / `--levels <n,n,n>` - Difficulty level(s) 1-4
- `--count <n>` - Questions per module/level (default: 10)
- `--format <type>` - Output format: json, csv, pretty (default: json)
- `--output <file>` - Write to file instead of stdout
- `--list` - List available modules

## Architecture Overview

This is a UK National Curriculum-aligned mathematics question generator following a **parameter-based architecture** with four core layers:

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

### 4. Export Layer (`src/export/`)
- `filters.js` - Module filtering by strand, substrand, year, or ID
- `formatters.js` - JSON, CSV, and Pretty terminal output formatters
- `index.js` - Main export API, orchestrates generation + formatting

### Key Design Patterns
- **Registry Pattern**: QuestionEngine maintains a Map of generators keyed by moduleId
- **Pure Functions**: Generators have no side effects, can be called repeatedly
- **Parameter-Driven**: All question constraints come from parameters, not hardcoded
- **Singleton**: QuestionEngine is exported as a singleton instance
- **V2 Nested Schema**: Strict separation of `math` and `presentation` concerns
- **Universal ES6 Modules**: Core logic works in Node.js and browsers

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
        // ... levels 2, 3, 4
    }
};

export const N01_MODULES = {
    'N01_Y3_NPV': {
        id: 'N01_Y3_NPV',
        name: 'N01_Y3_NPV: Counting from 0',
        description: 'Count from 0 in multiples of 4, 8, 50 and 100',
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

    // ... generation logic ...

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

### 4. Test via CLI

```bash
node generate.js --module N01_Y3_NPV --level 3 --count 5 --format pretty
```

---

## Question Output Schema

All generators return objects with this structure. The export layer enriches them with curriculum metadata:

```javascript
{
    // Core question fields
    text: string,           // Question text
    type: 'text_input' | 'multiple_choice',
    answer: string,         // Correct answer (always string)
    hint: string,           // Optional hint
    options: number[],      // For multiple choice

    // Added by QuestionEngine
    id: string,             // Unique ID
    timestamp: number,      // Generation timestamp
    module: string,         // Module ID
    level: number,          // Difficulty level (1-4)

    // Added by Export Layer
    curriculum: {
        strand: string,
        substrand: string,
        yearGroup: string,
        ref: string,
        description: string
    },
    params: object,         // V2 parameters used for generation
    presentation: object    // Presentation metadata for display apps
}
```

---

## File Structure

```
question-generator/
├── generate.js                   # CLI entry point
├── package.json                  # ES6 module configuration
├── ARCHITECTURE-CLI.md           # Full architecture documentation
├── src/
│   ├── export/                   # Export utilities
│   │   ├── index.js              # Main export API
│   │   ├── filters.js            # Module filtering
│   │   └── formatters.js         # JSON/CSV/Pretty formatters
│   ├── curriculum/
│   │   ├── parameters.js         # Central module registry
│   │   └── parameters/           # Parameter files by series
│   │       ├── N01_counting.js
│   │       ├── C02_written.js
│   │       └── ...
│   ├── generators/
│   │   ├── N01_Y3_NPV_counting.js
│   │   └── helpers/
│   │       ├── N01_countingHelpers.js
│   │       └── ...
│   └── core/
│       ├── questionEngine.js     # Generator registry
│       ├── validator.js          # Answer validation
│       └── schemas/              # Parameter validation
│           ├── index.js
│           ├── NumberSchema.js
│           ├── CalculationSchema.js
│           └── MeasurementSchema.js
└── .claude/
    └── agents/                   # AI agent definitions
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

### Testing

Run schema validation across all modules:
```bash
node test-schemas.js
```

---

## ES6 Modules

All files use ES6 modules:
- Use `export` for functions/objects
- Use `import` with `.js` extensions
- `package.json` has `"type": "module"`
- Module paths must be relative and include `.js`

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
