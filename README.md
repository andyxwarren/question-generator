# UK Maths Question Generator

A **Node.js CLI tool** that generates UK National Curriculum-aligned mathematics questions for Years 1-6. Uses a **parameter-driven architecture** where question difficulty and content are controlled entirely through declarative configuration.

---

## Project Philosophy

### Core Principles

1. **Lean & Focused**: Question generation only - no display/rendering
2. **Export-First**: JSON, CSV, and terminal output for integration with other tools
3. **Presentation Metadata Preserved**: Display hints retained in output for external display apps
4. **Universal ES6 Modules**: Core logic works in Node.js and browsers
5. **Parameter-Driven**: All question constraints come from parameters, not hardcoded values
6. **Pure Functions**: Generators have no side effects, can be called repeatedly

### Design Decisions

- **No UI Layer**: Display is responsibility of consuming applications
- **Self-Describing Questions**: Each question contains all data needed for rendering
- **Module = Schema**: Each generator defines its own display metadata structure
- **Difficulty Progression**: 4 levels (Beginning, Developing, Meeting, Exceeding)

---

## Architecture Overview

```
                    +-----------------------+
                    |      CLI Entry        |
                    |    (generate.js)      |
                    +-----------+-----------+
                                |
                    +-----------v-----------+
                    |    Export Layer       |
                    |  (filters, formatters)|
                    +-----------+-----------+
                                |
          +---------------------+---------------------+
          |                     |                     |
+---------v---------+ +---------v---------+ +---------v---------+
|   Curriculum      | |     Generator     | |      Core         |
|   Parameters      | |      Layer        | |     Engine        |
|  (V2 Schema)      | |  (Pure Functions) | |   (Registry)      |
+-------------------+ +-------------------+ +-------------------+
          |                     |                     |
          +---------------------+---------------------+
                                |
                    +-----------v-----------+
                    |   Schema Validation   |
                    |  (Number/Calc/Meas)   |
                    +-----------------------+
```

### Layer Responsibilities

| Layer | Location | Purpose |
|-------|----------|---------|
| **CLI** | `generate.js` | Parse arguments, orchestrate generation |
| **Export** | `src/export/` | Filter modules, format output (JSON/CSV/Pretty) |
| **Curriculum** | `src/curriculum/` | Define modules, parameters, difficulty levels |
| **Generators** | `src/generators/` | Create questions from parameters |
| **Core** | `src/core/` | Registry pattern, validation, schemas |

---

## V2 Nested Parameter Schema

**CRITICAL**: All parameters use V2 "Nested" format with strict separation:

```javascript
{
    "operations": [...],      // Operation types (root level)
    "math": {                 // Mathematical constraints
        "range": { "min": 0, "max": 100 },
        "sequence": { "steps": [4, 8], "length": 4 }
    },
    "presentation": {         // Display hints (preserved in output)
        "gaps": { "position": "end", "count": 1 },
        "visualType": "sequence"
    }
}
```

### Schema by Strand

#### Number Strand (N)

```javascript
{
    operations: ['count_forwards', 'count_backwards', 'fill_gap'],
    math: {
        range: { min: 0, max: 100 },
        sequence: {
            steps: [2, 5, 10],           // Y1-4 counting increments
            powersOf10: [10, 100, 1000], // Y5+ use this instead
            length: 4,
            directions: ['forwards', 'backwards'],
            startStrategy: 'zero_only'   // zero_only | any | zero_or_multiple
        },
        placeValue: { places: ['ones', 'tens'], includeZero: false },
        rounding: { bases: [10, 100] }
    },
    presentation: {
        gaps: { position: 'middle', count: 1 },
        visualType: 'sequence',
        contexts: ['counting', 'sequences']
    }
}
```

#### Calculation Strand (C)

```javascript
{
    operations: ['addition_no_carry', 'subtraction_with_borrow'],
    math: {
        range: { max: 999, resultMax: 1999 },
        components: { ones: [1, 9], tens: [10, 90] },
        tables: [2, 5, 10],
        targets: [20, 50, 100],
        config: {
            noCarry: true,
            noBorrow: true,
            allowSingleCarry: false,
            missingPositions: ['end']
        }
    },
    presentation: {
        styles: ['equation', 'word_problem', 'columnar'],
        contexts: ['shopping', 'measures'],
        hint: 'Use written column method'
    }
}
```

#### Measurement Strand (M)

```javascript
{
    operations: ['direct_conversion', 'word_problem'],
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

## Display Metadata System

### The 4 Display Principles

Questions must include display metadata so external rendering apps can draw visuals.

| Principle | Description | Example |
|-----------|-------------|---------|
| **Reconstruction** | Include ALL data to draw visual from scratch | Number line needs: start, end, interval, target |
| **Type Identification** | Always include `display.type` | `type: "number_line"` |
| **Raw Values** | Use numbers, not formatted strings | `targetValue: 50` not `"fifty"` |
| **Self-Contained** | Don't rely on text parsing | Include `step: 4` even if text says "in 4s" |

### Module = Schema Approach

Each generator defines its own display metadata structure inline. No central schema to maintain.

```javascript
// Generator outputs:
return {
    text: "What number is the arrow pointing to?",
    type: "text_input",
    answer: "450",

    // DISPLAY METADATA - generator defines the structure
    display: {
        type: "number_line",
        start: 0,
        end: 1000,
        interval: 50,
        targetValue: 450,
        showLabels: true
    }
};
```

### Common Visual Types

| Type | Required Fields | Use Case |
|------|-----------------|----------|
| `sequence` | `values[]`, `gapIndices[]`, `step`, `direction` | Counting sequences |
| `number_line` | `start`, `end`, `interval`, `targetValue`, `showLabels` | Number position |
| `columnar` | `num1`, `num2`, `operator`, `missingDigits[]` | Written calculations |
| `clock` | `hours`, `minutes`, `showHourHand`, `showMinuteHand` | Telling time |
| `place_value_chart` | `number`, `columns[]`, `highlightedColumn` | Place value |
| `text_only` | (none) | Pure text questions |

---

## Data Flow

```
User Input          Filters              Generation            Output
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ --module │───>│  Select by   │───>│  Generator   │───>│    JSON/     │
│ --strand │    │ strand/year/ │    │ + Parameters │    │  CSV/Pretty  │
│ --year   │    │  substrand   │    │  = Questions │    │    Export    │
│ --level  │    └──────────────┘    └──────────────┘    └──────────────┘
└──────────┘
```

### Question Output Schema

```javascript
{
    // Core Question
    id: "N01_Y3_NPV_1699123456789_abc123",
    module: "N01_Y3_NPV",
    level: 3,
    text: "What is the missing number? 50, 100, __, 200",
    type: "text_input",
    answer: "150",
    hint: "The pattern counts forwards in 50s",

    // Display Metadata (for external apps)
    display: {
        type: "sequence",
        values: [50, 100, null, 200],
        gapIndices: [2],
        step: 50,
        direction: "forwards"
    },

    // Curriculum Context
    curriculum: {
        strand: "Number and Place Value",
        substrand: "Counting (in multiples)",
        yearGroup: "3",
        ref: "N1"
    },

    // Generation Parameters
    params: {
        math: { range: { min: 0, max: 600 }, sequence: {...} },
        presentation: { gaps: { position: "middle" } }
    }
}
```

---

## Difficulty Levels

| Level | Name | Characteristics |
|-------|------|-----------------|
| **1** | Beginning | Smallest ranges, most scaffolding, forwards only, start from zero |
| **2** | Developing | Expanded ranges, some scaffolding, may include backwards |
| **3** | Meeting | Full curriculum ranges, minimal scaffolding, all directions |
| **4** | Exceeding | Extended ranges, no scaffolding, random positioning, challenges |

### Level 3 = Curriculum Standard

Level 3 parameters should exactly match the UK National Curriculum statement. Levels 1-2 scaffold toward it, Level 4 extends beyond.

---

## Generator Pattern

All generators follow this structure:

```javascript
// src/generators/MODULE_ID.js

import { randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    // 1. DESTRUCTURE V2 SCHEMA
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

    // 2. USE DESTRUCTURED VALUES
    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 3. GENERATE QUESTION LOGIC
    // ... create sequence, calculate answer ...

    // 4. RETURN QUESTION WITH DISPLAY METADATA
    return {
        text: "What is the missing number? ...",
        type: "text_input",
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: "MODULE_ID",
        level: level,

        // Display metadata for external apps
        display: {
            type: visualType || "sequence",
            values: displaySequence,
            gapIndices: [gapIndex],
            step: step,
            direction: direction
        }
    };
}

export default {
    moduleId: 'MODULE_ID',
    generate: generateQuestion
};
```

---

## Agent System

Four AI agents assist with module creation:

### parameter-designer
- **Purpose**: Design mathematical parameters for 4-level difficulty progression
- **Input**: UK National Curriculum objective
- **Output**: V2 JSON with nested math/presentation structure
- **Key**: Detects when objectives need splitting into multiple modules

### question-designer
- **Purpose**: Design question phrasing, interaction types, visual display
- **Input**: V2 parameters from parameter-designer
- **Output**: Question template design document
- **Key**: Maps V2 parameters to template placeholders, specifies display metadata

### module-validator
- **Purpose**: Validate modules against UK National Curriculum standards
- **Input**: V2 parameters + question templates OR implemented code
- **Output**: APPROVED / REJECTED / UNSUITABLE decision
- **Key**: Checks V2 schema compliance, curriculum alignment, display metadata completeness

### module-creator
- **Purpose**: Orchestrate end-to-end module creation
- **Stages**: Parameter Design -> Question Design -> Validation (max 3 iterations) -> Code Implementation -> Report
- **Key**: Coordinates all three agents, implements code using V2 patterns

---

## CLI Usage

```bash
# Generate questions for specific module
node generate.js --module N01_Y3_NPV --level 3 --count 10

# Filter by strand and year
node generate.js --strand Number --year 3 --count 5

# Export to file
node generate.js --module C02_Y3_CALC --format csv --output questions.csv

# Pretty terminal output
node generate.js --substrand "Counting" --format pretty

# List available modules
node generate.js --list --strand Calculation
```

### Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `--module <id>` | Specific module ID | `--module N01_Y3_NPV` |
| `--strand <name>` | Filter by strand | `--strand Number` |
| `--substrand <name>` | Filter by substrand | `--substrand "Counting"` |
| `--year <n>` | Filter by year (1-6) | `--year 3` |
| `--level <n>` | Single difficulty level | `--level 3` |
| `--levels <n,n>` | Multiple levels | `--levels 1,2,3,4` |
| `--count <n>` | Questions per module/level | `--count 10` |
| `--format <type>` | Output: json, csv, pretty | `--format json` |
| `--output <file>` | Write to file | `--output out.json` |
| `--list` | List matching modules | `--list` |

---

## Project Structure

```
question-generator/
├── generate.js                   # CLI entry point
├── package.json                  # ES6 module configuration
├── README.md                     # This file (source of truth)
├── CLAUDE.md                     # Development guidance
├── ARCHITECTURE-CLI.md           # Detailed architecture doc
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
│   │       └── M04_time.js
│   ├── generators/
│   │   ├── N01_Y3_NPV_counting.js
│   │   ├── C02_Y3_CALC_written.js
│   │   └── helpers/
│   │       ├── N01_countingHelpers.js
│   │       ├── N02_numberHelpers.js
│   │       └── C02_columnarHelpers.js
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
        ├── module-creator.md
        ├── module-validator.md
        ├── parameter-designer.md
        └── question-designer.md
```

---

## Adding New Modules

### 4-Step Checklist

1. **Define Parameters** in `src/curriculum/parameters/`
   - Use V2 nested schema (math + presentation)
   - Define all 4 difficulty levels
   - Include visualType in presentation if needed

2. **Create Generator** in `src/generators/`
   - Destructure V2 params first
   - Return question with display metadata
   - Follow pure function pattern

3. **Register Generator** in `src/core/questionEngine.js`
   ```javascript
   import newGenerator from '../generators/NEW_MODULE.js';
   this.register(newGenerator);
   ```

4. **Test via CLI**
   ```bash
   node generate.js --module NEW_MODULE --level 3 --count 5 --format pretty
   ```

### Adding New Visual Types

When a module needs a new visual type:

1. **Define the display structure** in your generator (module = schema)
2. **Document required fields** in code comments
3. **Follow the 4 principles** (reconstruction, type ID, raw values, self-contained)

```javascript
// NEW visual type - bar model
// Required fields: whole, parts[], unknownIndex
display: {
    type: "bar_model",
    whole: 24,
    parts: [10, null, 6],    // null = unknown
    unknownIndex: 1,
    orientation: "horizontal"
}
```

The generator IS the schema for its display type. External display apps read the output structure.

---

## Currently Implemented Modules

### Number and Place Value (N-series)
- **N01**: Counting in multiples (Years 1-5)
- **N02**: Read, write, order and compare numbers (Years 2-6)
- **N03**: Place value and Roman numerals (Years 2-6)
- **N04**: Representation, estimation, and rounding (Years 1-6)
- **N05**: Negative numbers (Years 4-6)
- **N06**: Number problems (Years 2-6)

### Calculations (C-series)
- **C01**: Mental addition and subtraction (Years 1-3, 5)
- **C02**: Written addition and subtraction methods (Years 1-5)
- **C03**: Estimation, inverses and checking (Years 2-6)
- **C04**: Addition and subtraction problem solving (Years 1-6)
- **C05**: Properties - multiples, factors, primes, squares, cubes (Years 5-6)
- **C06**: Mental multiplication and division (Years 2-6)
- **C07**: Written multiplication and division methods (Years 2-6)
- **C08**: Problem-solving with mathematical properties (Years 1-6)
- **C09**: Order of operations (Year 6)

### Measurement (M-series)
- **M01**: Comparison and measurement (Years 1-3)
- **M04**: Time telling and calculation (Years 1-5)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `generate.js` | CLI entry point, argument parsing |
| `src/export/index.js` | Main export API |
| `src/curriculum/parameters.js` | Central module registry |
| `src/core/questionEngine.js` | Generator registry and orchestration |
| `src/core/validator.js` | Answer validation |
| `.claude/agents/*.md` | AI agent definitions |
| `CLAUDE.md` | Development guidance for Claude Code |

---

## License

Educational software aligned with the UK National Curriculum Framework.
