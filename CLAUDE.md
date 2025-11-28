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

# Run tests (schema validation)
npm test

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

---

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
- **Module = Schema**: Each generator defines its own display metadata structure inline
- **Universal ES6 Modules**: Core logic works in Node.js and browsers

---

## Module Naming Convention

Module IDs follow a strict pattern: `{SERIES}_{YEAR}_{STRAND}`

**Examples:**
- `N01_Y3_NPV` = Number series 01, Year 3, Number and Place Value
- `C02_Y4_CALC` = Calculation series 02, Year 4, Calculation
- `M04_Y2_MEAS` = Measurement series 04, Year 2, Measurement

**Strand Codes:**
- `NPV` = Number and Place Value
- `CALC` = Calculation
- `MEAS` = Measurement

**Series Numbers:**
- `N01` = Counting, `N02` = Read/Write, `N03` = Place Value, etc.
- `C01` = Mental Add/Sub, `C02` = Written Add/Sub, etc.
- `M01` = Comparison, `M02` = Measurement Scales, `M03` = Money, `M04` = Time, etc.

---

## V2 Nested Parameter Schema

**CRITICAL**: All modules use the V2 "Nested" architecture. Parameters are strictly separated into:
- `math`: Mathematical constraints (ranges, steps, units)
- `presentation`: Visual/contextual settings (gaps, styles, contexts)

### Schema Structure by Strand

```javascript
// NUMBER STRAND (N)
{
    math: {
        range: { min: 0, max: 100 },
        sequence: {
            steps: [2, 5, 10],           // Y1-4 counting increments
            powersOf10: [10, 100, 1000], // Y5+ use this instead of steps
            length: 4,
            directions: ['forwards', 'backwards'],
            startStrategy: 'zero_only'   // zero_only | any | zero_or_multiple
        },
        placeValue: { places: ['ones', 'tens'], includeZero: false },
        rounding: { bases: [10, 100] }
    },
    presentation: {
        gaps: { position: 'middle', count: 1 },
        visualType: 'sequence',  // For display metadata
        contexts: ['counting', 'sequences']
    }
}

// CALCULATION STRAND (C)
{
    math: {
        range: { max: 999, resultMax: 1999 },
        components: { ones: [1, 9], tens: [10, 90] },
        tables: [2, 5, 10],
        targets: [20, 50, 100],
        config: {
            noCarry: true,
            noBorrow: true,
            allowSingleCarry: false
        }
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
    math: {
        types: ['length', 'mass', 'capacity'],
        units: { length: ['km', 'm', 'cm'], mass: ['kg', 'g'] },
        ranges: { km: { min: 1, max: 10 } },
        conversions: { length: ['km_to_m', 'm_to_cm'] },
        valueType: ['whole_only']
    },
    presentation: {
        contexts: ['shopping', 'recipes'],
        visualType: 'text_only',
        wordProblems: true
    }
}
```

---

## Question Parts System

**Philosophy**: Questions are exported with structured parts so external rendering apps can build the UI. This tool doesn't render visuals - it provides the data needed for other apps to do so.

### The 4 Rendering Principles

| Principle | Description | Example |
|-----------|-------------|---------|
| **Reconstruction** | Include ALL data to draw visual from scratch | Sequence needs: values, gapIndices, step, direction |
| **Type Identification** | Always include part `type` | `type: "sequence"` |
| **Raw Values** | Use numbers, not formatted strings | `values: [0, 5, null]` not `"0, 5, __"` |
| **Self-Contained** | Don't rely on text parsing | Include `step: 5` even if text says "in 5s" |

### Common Part Types

| Type | Required Fields | Use Case |
|------|-----------------|----------|
| `text` | `value` | Instruction/prompt text |
| `sequence` | `values[]`, `gapIndices[]`, `step`, `direction` | Counting sequences |
| `number_line` | `start`, `end`, `interval`, `targetValue`, `showLabels` | Number position |
| `columnar` | `num1`, `num2`, `operator`, `missingDigits[]` | Written calculations |
| `clock` | `hours`, `minutes`, `showHourHand`, `showMinuteHand` | Telling time |
| `place_value_chart` | `number`, `columns[]`, `highlightedColumn` | Place value |

### Module = Schema Approach

Each generator defines its own `questionParts` structure inline. No central schema to maintain.

```javascript
// Generator outputs:
return {
    text: "What number is the arrow pointing to? [arrow at 450]",
    type: "text_input",
    answer: "450",

    // QUESTION PARTS - generator defines the structure
    questionParts: [
        { type: 'text', value: 'What number is the arrow pointing to?' },
        {
            type: 'number_line',
            start: 0,
            end: 1000,
            interval: 50,
            targetValue: 450,
            showLabels: true
        }
    ]
};
```

---

## Adding New Curriculum Modules

### Method 1: Manual Implementation (4 Steps)

#### 1. Define Parameters (V2 Format)

Create or update a parameter file in `src/curriculum/parameters/`:

```javascript
// Example: src/curriculum/parameters/N01_counting.js

const N01_Y3_NPV_PARAMS = {
    1: {
        description: "Beginning - short sequences, forwards only...",
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
            gaps: { position: 'end', count: 1 },
            visualType: 'sequence'
        }
    },
    // ... levels 2, 3, 4
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
        parameters: N01_Y3_NPV_PARAMS
    }
};
```

#### 2. Create Generator (V2 Pattern)

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
            gaps: { position },
            visualType
        }
    } = params;

    // 2. Use destructured values
    const step = randomChoice(steps);
    const direction = randomChoice(directions);
    let start = getStartValue({ startStrategy, min, max }, step);

    // 3. Generate sequence and gap
    const sequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(position, length);
    const answer = sequence[gapIndex];

    // Create display values with null for gap
    const displayValues = [...sequence];
    displayValues[gapIndex] = null;

    // Format text for human readability
    const formattedSequence = sequence.map((v, i) => i === gapIndex ? '__' : v).join(', ');

    // 4. Return question with questionParts
    return {
        text: `What is the missing number? ${formattedSequence}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y3_NPV',
        level: level,

        // Question parts - ordered array for UI rendering
        questionParts: [
            { type: 'text', value: 'What is the missing number?' },
            {
                type: 'sequence',
                values: displayValues,
                gapIndices: [gapIndex],
                step: step,
                direction: direction
            }
        ]
    };
}

export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};
```

#### 3. Register Generator

In `src/core/questionEngine.js`:

```javascript
import N01_Y3_generator from '../generators/N01_Y3_NPV_counting.js';

registerDefaultGenerators() {
    // ... existing
    this.register(N01_Y3_generator);
}
```

#### 4. Test via CLI

```bash
node generate.js --module N01_Y3_NPV --level 3 --count 5 --format pretty
npm test  # Run schema validation
```

### Method 2: Using AI Agents (Recommended)

The project includes specialized AI agents to automate module creation. See **AI Agent System** section below.

---

## AI Agent System

Four specialized agents help create and validate curriculum modules:

### module-creator
**Purpose**: Complete end-to-end module creation - from curriculum objective to working code

**Usage**: When you need to implement a new module from scratch
```
Use the module-creator agent when the user asks to:
- "Add a module for Year 3 fractions"
- "Create a multiplication tables practice module"
- "Implement the Year 5 negative numbers curriculum objective"
```

**Workflow**:
1. Parameter Design (calls `parameter-designer`)
2. Question Design (calls `question-designer`)
3. Validation Loop (calls `module-validator`, max 3 iterations)
4. Code Implementation (implements generator, parameters, registration)
5. Report (provides testing instructions)

### parameter-designer
**Purpose**: Design mathematical parameters for 4-level difficulty progression

**Usage**: When you need just the parameter definitions
- Outputs V2 nested JSON with `math` and `presentation`
- Detects when objectives need splitting into multiple modules
- Ensures Level 3 matches curriculum exactly

### question-designer
**Purpose**: Design question phrasing, interaction types, and visual display

**Usage**: When you have parameters and need question templates
- Maps V2 parameters to question placeholders
- Specifies display metadata structure
- Designs level progression examples

### module-validator
**Purpose**: Validate modules against UK National Curriculum standards

**Usage**: Before or after implementation
- Checks V2 schema compliance
- Validates curriculum alignment
- Ensures display metadata completeness
- Assesses parameter appropriateness by level

### Skills Reference

Agents can invoke these skills for implementation details:
- `/project:nested-schema` - Parameter structure reference
- `/project:display-metadata` - Display metadata principles and types
- `/project:generator-template` - Code patterns for generators
- `/project:primitives` - Core primitive types and utilities

---

## Question Output Schema

All generators return objects with this structure. The export layer enriches them with curriculum metadata:

```javascript
{
    // Core question fields (from generator)
    text: string,           // Human-readable question text (for debugging)
    type: 'text_input' | 'multiple_choice' | 'fill_blanks',
    answer: string,         // Correct answer (always string)
    hint: string,           // Optional hint
    options: number[],      // For multiple choice

    // Question parts - ordered array for UI rendering
    questionParts: [
        { type: 'text', value: 'What is the missing number?' },
        {
            type: 'sequence',     // Part type for UI dispatch
            values: [0, 5, null], // Raw data with null for gaps
            gapIndices: [2],      // Positions of gaps
            step: 5,              // Mathematical metadata
            direction: 'forwards'
        }
    ],

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
    params: object         // V2 parameters used for generation
}
```

### Question Parts Pattern

The `questionParts` array contains ordered, typed parts that the UI renders in sequence. Each module defines its own part types (consistent with "Module = Schema" philosophy).

**Key Principles:**
1. **Ordered parts** - UI renders in array order
2. **Typed parts** - Each part has a `type` for UI dispatch
3. **Self-describing** - Each part contains all data needed to render it
4. **Module-specific** - No universal schema; each generator defines its parts

**Common Part Types:**

| Type | Purpose | Example Fields |
|------|---------|----------------|
| `text` | Static instruction/prompt text | `value` |
| `sequence` | Number sequence with gaps | `values`, `gapIndices`, `step`, `direction` |
| `number_line` | Visual number line | `start`, `end`, `interval`, `targetValue` |
| `equation` | Math equation | `expression`, `operator`, `operands` |
| `clock` | Clock visual | `hours`, `minutes` |
| `place_value_chart` | Place value grid | `number`, `columns` |

---

## Generator Destructuring Pattern

**All generators MUST follow this V2 destructuring pattern:**

```javascript
export function generateQuestion(params, level) {
    // ALWAYS destructure math and presentation first
    const { math, presentation } = params;

    // Then destructure specific values
    const { range, sequence, config } = math;
    const { gaps, styles, contexts, visualType } = presentation;

    // OR use deep destructuring:
    const {
        math: {
            range: { min, max },
            sequence: { steps, length }
        },
        presentation: {
            gaps: { position, count },
            visualType
        }
    } = params;

    // ... rest of generator logic
}
```

---

## File Structure

```
question-generator/
├── generate.js                   # CLI entry point
├── package.json                  # ES6 module configuration
├── README.md                     # Project overview and philosophy
├── CLAUDE.md                     # This file (development guidance)
├── src/
│   ├── export/                   # Export utilities
│   │   ├── index.js              # Main export API
│   │   ├── filters.js            # Module filtering
│   │   └── formatters.js         # JSON/CSV/Pretty formatters
│   ├── curriculum/
│   │   ├── parameters.js         # Central module registry
│   │   └── parameters/           # Parameter files by series
│   │       ├── N01_counting.js
│   │       └── ...
│   ├── generators/
│   │   ├── N01_Y1_NPV_counting.js
│   │   └── helpers/
│   │       ├── N01_countingHelpers.js
│   │       └── ...
│   └── core/
│       ├── questionEngine.js     # Generator registry
│       └── validator.js          # Answer validation
└── .claude/
    ├── agents/                   # AI agent definitions
    │   ├── module-creator.md
    │   ├── parameter-designer.md
    │   ├── question-designer.md
    │   └── module-validator.md
    └── skills/                   # Reusable knowledge modules
        ├── nested-schema.md
        ├── display-metadata.md
        ├── generator-template.md
        └── primitives.md
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
- **This level should exactly match the UK National Curriculum statement**

### Level 4 (Exceeding)
- Extended ranges (not new concepts)
- No scaffolding
- Random positioning, harder variations
- Challenge variations
