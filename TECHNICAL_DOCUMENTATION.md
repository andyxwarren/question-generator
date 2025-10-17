# UK Maths Practice - Technical Documentation

## Executive Summary

The UK Maths Practice Question Generator is a **parameter-based educational application** that generates curriculum-aligned mathematics questions using a pure JavaScript ES6 module architecture. The system maps 338 UK National Curriculum statements to reusable question generators, enabling infinite practice question generation without server-side dependencies.

### Key Technical Highlights
- **Zero build process**: Native ES6 modules, no bundlers or transpilation
- **Parameter-driven**: All question constraints defined in structured parameters, not hardcoded
- **Pure functional generators**: Deterministic, testable, side-effect-free question generation
- **Registry pattern**: Pluggable generator architecture for easy extensibility
- **Client-side only**: No backend, no database, fully offline-capable after initial load

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [UK National Curriculum Mapping](#uk-national-curriculum-mapping)
4. [Core Components](#core-components)
5. [Data Flow](#data-flow)
6. [Question Generation Pipeline](#question-generation-pipeline)
7. [Module Structure](#module-structure)
8. [Adding New Curriculum Modules](#adding-new-curriculum-modules)
9. [Question Schema](#question-schema)
10. [Validation System](#validation-system)
11. [Code Patterns and Conventions](#code-patterns-and-conventions)
12. [File Structure](#file-structure)
13. [Running the Application](#running-the-application)
14. [Testing Strategy](#testing-strategy)
15. [Future Extensibility](#future-extensibility)

---

## Architecture Overview

The application follows a **three-layer parameter-based architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                    Layer 1: Curriculum                      │
│                   (parameters.js)                           │
│  Defines all 338+ curriculum modules with 4 levels each     │
│  Pure data structure: no logic, just parameters             │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Layer 2: Generators                       │
│              (src/generators/*.js)                          │
│  Pure functions that transform parameters → questions       │
│  Each file = 1 curriculum module                            │
│  Exports: { moduleId, generate }                            │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               Layer 3: Engine & UI                          │
│  QuestionEngine (Registry), Validator, App Controller       │
│  Orchestration, answer validation, rendering                │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Separation of Concerns**: Curriculum data, question logic, and UI are strictly separated
2. **Parameter-Driven Variation**: All question constraints come from `parameters.js`, enabling easy curriculum adjustments without code changes
3. **Progressive Difficulty**: Each module has 4 levels (Beginning, Developing, Meeting, Exceeding) with progressively complex parameters
4. **Generator Purity**: Generators are pure functions with no side effects, enabling predictable testing
5. **Registry Pattern**: New generators self-register, making the system extensible

---

## Technology Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Language** | JavaScript ES6+ | Native browser support, no compilation needed |
| **Module System** | ES6 Modules (`import`/`export`) | Native browser module loading, no bundler required |
| **Frontend** | Vanilla JavaScript | Zero dependencies, maximum performance, minimal complexity |
| **Styling** | CSS3 | Native CSS with modern features (Grid, Flexbox, animations) |
| **Build Process** | None | Pure static files, deployable to any web server |
| **Runtime** | Modern browsers (Chrome, Firefox, Safari, Edge) | ES6 module support required |
| **Server** | Any static file server | Python http.server, Node http-server, Apache, nginx, etc. |

### Why No Build Process?

- **Simplicity**: No npm dependencies, no package.json, no node_modules
- **Transparency**: Source code is exactly what the browser runs
- **Debuggability**: Direct browser debugging with original source
- **Deployment**: Copy files to any web server and go
- **Learning**: Students/teachers can read the code without tooling knowledge

---

## UK National Curriculum Mapping

The UK National Curriculum Framework for Mathematics (KS1 and KS2) defines **338 curriculum statements** across 6 year groups. These statements are organized into:

### Curriculum Organization

```
Strand (e.g., "Number and Place Value")
  └── Substrand (e.g., "Counting in multiples")
      └── Content Domain (e.g., "N1")
          └── Year-specific objectives
              ├── Year 1: "Count to 100 in 2s, 5s, 10s"
              ├── Year 2: "Count in steps of 2, 3, 5 from 0"
              ├── Year 3: "Count in multiples of 4, 8, 50, 100"
              └── ...
```

### Module ID System

Each curriculum statement is assigned a unique **Module ID** using this format:

```
[Strand][Sequence]_Y[Year]_[Domain]

Examples:
- N01_Y1_NPV  → Number, Sequence 01, Year 1, Number and Place Value
- N02_Y3_NPV  → Number, Sequence 02, Year 3, Number and Place Value
- C01_Y4_CALC → Calculations, Sequence 01, Year 4, Calculations
- F06_Y5_FRAC → Fractions, Sequence 06, Year 5, Fractions
```

### Supported Strands (Full Framework)

| Code | Strand | Substrands | Example Modules |
|------|--------|------------|-----------------|
| **N** | Number and Place Value | counting, read/write, place value, rounding, negatives | N01_Y1_NPV to N06_Y6_NPV |
| **C** | Calculations | add/subtract, multiply/divide, order of operations | C01_Y1_CALC to C09_Y6_CALC |
| **F** | Fractions, Decimals, Percentages | fractions, decimals, equivalence, operations | F01_Y1_FRAC to F12_Y6_FRAC |
| **R** | Ratio and Proportion | relative sizes, percentages, scale factors | R01_Y1_RATIO to R04_Y6_RATIO |
| **A** | Algebra | expressions, formulae, sequences | A01_Y1_ALG to A05_Y6_ALG |
| **M** | Measurement | length, mass, time, area, volume | M01_Y1_MEAS to M09_Y6_MEAS |
| **G** | Geometry - Properties | shapes, angles, circles | G01_Y1_GEO to G05_Y6_GEO |
| **P** | Geometry - Position | position, direction, coordinates | P01_Y1_POS to P03_Y6_POS |
| **S** | Statistics | data interpretation, mean | S01_Y1_STAT to S03_Y6_STAT |

### Current Implementation Status

Currently implemented modules:
- **N01 series**: Years 1-5 (Counting in multiples)
- **N02 series**: Years 2-6 (Read, write, order and compare numbers)
- **N03 series**: Years 2-6 (Place value)
- **N04 series**: Years 1-6 (Representation, estimation, and rounding)

The architecture supports easy addition of remaining modules across all curriculum strands.

---

## Core Components

### 1. Curriculum Layer (`src/curriculum/parameters.js`)

**Purpose**: Define all curriculum modules with parameters for each difficulty level

**Structure**:
```javascript
export const MODULES = {
    'MODULE_ID': {
        id: string,              // Unique module identifier
        name: string,            // Display name
        description: string,     // Full curriculum statement
        icon: string,            // Emoji icon for UI
        yearGroup: string,       // "Year 1" to "Year 6"
        strand: string,          // Main curriculum strand
        substrand: string,       // Substrand classification
        ref: string,             // Curriculum reference code
        parameters: {
            1: { /* Level 1 params */ },
            2: { /* Level 2 params */ },
            3: { /* Level 3 params */ },
            4: { /* Level 4 params */ }
        }
    }
}
```

**Key Functions**:
- `getModule(moduleId)`: Retrieve module object by ID
- `getParameters(moduleId, level)`: Get parameters for specific module and level
- `getModuleIds()`: List all available module IDs
- `isValidLevel(level)`: Validate level number (1-4)

**Example Module** (N01_Y1_NPV):
```javascript
'N01_Y1_NPV': {
    id: 'N01_Y1_NPV',
    name: 'N01_Y1_NPV: Counting in Multiples',
    description: 'Count to and across 100, forwards and backwards...',
    icon: '🔢',
    yearGroup: 'Year 1',
    strand: 'Number and Place Value',
    substrand: 'Counting (in multiples)',
    ref: 'N1',
    parameters: {
        1: {  // Beginning
            step_sizes: [1, 2],
            min_value: 0,
            max_value: 20,
            directions: ['forwards', 'backwards'],
            start_from: 'zero_or_twenty',
            sequence_length: 5,
            gaps_count: 1,
            gap_position: 'end'
        },
        2: { /* Developing parameters */ },
        3: { /* Meeting parameters */ },
        4: { /* Exceeding parameters */ }
    }
}
```

**Parameter Conventions**:
- Parameters are organized **by level**, not by parameter type
- Each level represents a progressive learning objective
- Common parameters: `min_value`, `max_value`, `sequence_length`, `gaps_count`, `gap_position`
- Module-specific parameters: `step_sizes`, `directions`, `operations`, `powers_of_10`

---

### 2. Generator Layer (`src/generators/`)

**Purpose**: Pure functions that transform parameters into question objects

**Generator Contract**:
```javascript
export function generateQuestion(params, level) {
    // Use params to create question
    return {
        text: string,        // Question text
        type: string,        // 'text_input' | 'multiple_choice'
        answer: string,      // Correct answer (always string)
        // Optional fields based on type
        options: number[],   // For multiple choice
        answers: any[],      // For multi-gap questions
        hint: string,        // Optional hint
        module: string,      // Module ID
        level: number        // Difficulty level
    };
}

export default {
    moduleId: 'MODULE_ID',
    generate: generateQuestion
};
```

**Example Generator** (`N01_Y1_NPV_counting.js`):
```javascript
import { randomChoice, randomInt, generateSequence } from './helpers/countingHelpers.js';

export function generateQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const start = getStartValue(params, step);

    const fullSequence = generateSequence(
        start,
        step,
        params.sequence_length,
        direction
    );

    const questionType = randomChoice(['fill_blanks', 'next_number', 'multiple_choice']);

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateQuestion
};
```

**Generator Characteristics**:
- **Pure functions**: Same params → same question structure (randomness is acceptable)
- **No side effects**: No external state modification
- **Testable**: Easy to unit test with mock parameters
- **Reusable**: Can be called repeatedly for multiple questions

---

### 3. Question Engine (`src/core/questionEngine.js`)

**Purpose**: Central orchestration system using **Registry Pattern**

**Architecture**:
```javascript
class QuestionEngine {
    constructor() {
        this.generators = new Map();  // moduleId → generateFunction
        this.registerDefaultGenerators();
    }

    register(generator) {
        // Register generator: { moduleId, generate }
        this.generators.set(generator.moduleId, generator.generate);
    }

    generateOne(moduleId, level) {
        // 1. Get generator function
        // 2. Get parameters for module/level
        // 3. Call generator(params, level)
        // 4. Add unique ID and timestamp
        // 5. Return question object
    }

    generate(moduleId, level, count) {
        // Generate multiple questions
    }
}

const engine = new QuestionEngine();  // Singleton
export default engine;
```

**Key Responsibilities**:
1. **Generator Registry**: Maintain map of moduleId → generator function
2. **Parameter Lookup**: Fetch parameters from curriculum layer
3. **Question Generation**: Call appropriate generator with parameters
4. **ID Assignment**: Add unique ID and timestamp to each question
5. **Error Handling**: Gracefully handle missing generators or parameters

**Usage**:
```javascript
import questionEngine from '../core/questionEngine.js';

// Generate single question
const question = questionEngine.generateOne('N01_Y1_NPV', 1);

// Generate multiple questions
const questions = questionEngine.generate('N01_Y1_NPV', 2, 10);  // 10 questions, level 2
```

---

### 4. Validator (`src/core/validator.js`)

**Purpose**: Validate student answers against correct answers

**API**:
```javascript
export function validate(question, studentAnswer) {
    return {
        isCorrect: boolean,
        feedback: string,
        normalizedAnswer: string,
        correctAnswer?: string  // Only if incorrect
    };
}
```

**Validation Logic**:
1. **Normalization**: Remove whitespace, convert to lowercase
2. **Exact String Match**: For text answers
3. **Numeric Comparison**: With floating-point tolerance (±0.01)
4. **Multi-Gap Handling**: Comma-separated values, order-independent sorting
5. **Empty Detection**: Flag unanswered questions

**Example**:
```javascript
import validator from '../core/validator.js';

const question = {
    text: "Fill in the missing numbers: 2, 4, ___, 8",
    answer: "6",
    type: "text_input"
};

const result = validator.validate(question, "6");
// { isCorrect: true, feedback: "Correct!", normalizedAnswer: "6" }

const multiGapQuestion = {
    text: "Fill in: 2, ___, 6, ___, 10",
    answer: "4,8",
    answers: [4, 8],
    type: "text_input"
};

const result = validator.validate(multiGapQuestion, "4, 8");
// { isCorrect: true, feedback: "Correct!", normalizedAnswer: "4,8" }
```

---

### 5. UI Controller (`src/ui/app.js`)

**Purpose**: Main application controller managing UI state and user interactions

**Key Responsibilities**:
1. **Module Rendering**: Group and display curriculum modules by strand/substrand/year
2. **Question Generation**: Call QuestionEngine to create questions for all 4 levels
3. **Question Rendering**: Display questions grouped by difficulty level
4. **Answer Collection**: Gather user inputs (text fields, radio buttons)
5. **Answer Validation**: Use Validator to check all answers
6. **Feedback Display**: Show visual feedback (green checkmarks, red X's)
7. **Results Summary**: Calculate and display scores by level

**State Management**:
```javascript
class App {
    constructor() {
        this.currentModule = null;      // Selected module object
        this.questions = [];             // Array of level groups
        this.questionCount = 5;          // Questions per level
    }

    // questions structure:
    // [
    //   { level: 1, levelName: 'Beginning', questions: [...] },
    //   { level: 2, levelName: 'Developing', questions: [...] },
    //   { level: 3, levelName: 'Meeting', questions: [...] },
    //   { level: 4, levelName: 'Exceeding', questions: [...] }
    // ]
}
```

**Event Flow**:
```
User clicks module
    → selectModule(moduleId)
    → generateQuestions(moduleId)  // Calls QuestionEngine for levels 1-4
    → renderQuestions()            // Display in DOM
    → showSection('questions')

User answers questions
    → (User interaction with inputs)

User clicks Submit
    → submitAnswers()
    → For each question:
        → Collect answer from DOM
        → Call validator.validate()
        → Apply CSS classes (correct/incorrect)
        → Display feedback
    → showResults()
```

---

## Data Flow

### End-to-End Question Generation Flow

```
1. User selects module "N01_Y1_NPV" and level 2
                    ↓
2. App.selectModule() calls QuestionEngine.generate('N01_Y1_NPV', 2, 5)
                    ↓
3. QuestionEngine.generateOne() looks up generator for 'N01_Y1_NPV'
                    ↓
4. QuestionEngine.generateOne() calls getParameters('N01_Y1_NPV', 2)
                    ↓
5. parameters.js returns:
   {
     step_sizes: [1, 2, 5],
     min_value: 0,
     max_value: 50,
     directions: ['forwards', 'backwards'],
     start_from: 'any',
     sequence_length: 6,
     gaps_count: 1,
     gap_position: 'middle'
   }
                    ↓
6. QuestionEngine calls N01_Y1_NPV_counting.generate(params, 2)
                    ↓
7. Generator function:
   - Randomly selects step_size (e.g., 5)
   - Randomly selects direction (e.g., 'forwards')
   - Calculates start value (e.g., 10)
   - Generates sequence [10, 15, 20, 25, 30, 35]
   - Randomly selects question type ('fill_blanks')
   - Creates question object
                    ↓
8. Returns:
   {
     text: "Fill in the missing number: 10, 15, ___, 25, 30, 35",
     type: "text_input",
     answer: "20",
     hint: "The pattern counts forwards in 5s",
     module: "N01_Y1_NPV",
     level: 2
   }
                    ↓
9. QuestionEngine adds ID and timestamp
                    ↓
10. Question returned to App
                    ↓
11. App renders question in DOM
                    ↓
12. User enters answer "20"
                    ↓
13. User clicks Submit → validator.validate(question, "20")
                    ↓
14. Validator returns { isCorrect: true, feedback: "Correct!" }
                    ↓
15. App displays green checkmark and feedback
```

---

## Question Generation Pipeline

### Pipeline Stages

```
Parameters → Selection → Sequence → Question Type → Rendering
```

#### Stage 1: Parameter Lookup
```javascript
const params = getParameters('N01_Y1_NPV', 2);
// Returns level 2 parameters for this module
```

#### Stage 2: Random Selection
```javascript
const step = randomChoice(params.step_sizes);      // e.g., 5
const direction = randomChoice(params.directions); // e.g., 'forwards'
```

#### Stage 3: Sequence Generation
```javascript
const start = getStartValue(params, step);  // e.g., 10
const sequence = generateSequence(start, step, 6, direction);
// Result: [10, 15, 20, 25, 30, 35]
```

#### Stage 4: Question Type Selection
```javascript
const questionType = randomChoice(['fill_blanks', 'next_number', 'multiple_choice']);
```

#### Stage 5: Question Construction
```javascript
if (questionType === 'fill_blanks') {
    const gapPositions = getGapPositions(6, 1, 'middle');  // e.g., [2]
    const displaySeq = sequence.map((n, i) => gapPositions.includes(i) ? '___' : n);
    // [10, 15, ___, 25, 30, 35]

    return {
        text: `Fill in the missing number: ${displaySeq.join(', ')}`,
        type: 'text_input',
        answer: sequence[2].toString(),  // "20"
        answers: [sequence[2]],
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y1_NPV',
        level: 2
    };
}
```

---

## Module Structure

### Counting Modules (N01 series)

**Common Parameters**:
- `step_sizes`: Array of counting increments (e.g., `[2, 5, 10]`)
- `min_value`, `max_value`: Bounds for sequences
- `directions`: `['forwards']` or `['forwards', 'backwards']`
- `start_from`: Controls starting point strategy
  - `'zero_only'`: Always start from 0
  - `'zero_or_twenty'`: Start from 0 or 20
  - `'zero_or_multiple'`: Start from 0 or multiples of step size
  - `'any'`: Start from any valid value
- `sequence_length`: Number of terms in sequence
- `gaps_count`: Number of blanks to fill
- `gap_position`: `'start'`, `'end'`, `'middle'`, `'random'`

**Special Case - Year 5 (N01_Y5_NPV)**:
Year 5 introduces **negative numbers**:
```javascript
parameters: {
    1: {
        powers_of_10: [10, 100],     // NOT step_sizes
        min_value: -100,
        max_value: 100,
        start_range: [-50, 50],      // Specific starting range
        // ...
    }
}
```

Generator must handle:
- Sequences crossing zero (e.g., [-20, -10, 0, 10, 20])
- Negative step sizes for backwards counting
- Display of negative numbers

### Read/Write Modules (N02 series)

**Common Parameters**:
- `min_value`, `max_value`: Range for numbers
- `word_min`, `word_max`: Range for word-based questions
- `operations`: Array of question types
  - `'identify_numeral'`: Read a number
  - `'one_more'`, `'one_less'`: Add/subtract 1
  - `'ten_more'`, `'ten_less'`: Add/subtract 10
  - `'hundred_more'`, `'hundred_less'`: Add/subtract 100
  - `'numeral_to_word'`: Convert 23 → "twenty-three"
  - `'word_to_numeral'`: Convert "twenty-three" → 23
  - `'compare_two'`: Which is larger?
  - `'use_symbols'`: Use <, >, = symbols
  - `'order_three'`: Order 3 numbers
  - `'round_to_ten'`, `'round_to_hundred'`: Rounding
- `order_count_max`: Maximum numbers to order

**Example Operations**:
- **Year 2**: Focus on numbers to 100, basic operations
- **Year 3**: Numbers to 1000, introduce hundreds
- **Year 4**: Beyond 1000, introduce rounding
- **Year 5**: To 1,000,000, place value of each digit
- **Year 6**: To 10,000,000, complex comparisons

### Representation and Estimation Modules (N04 series)

**Common Parameters**:
- `min_value`, `max_value`: Range for numbers
- `number_line_max`: Maximum value for number line questions
- `place_value_max`: Maximum value for place value representation
- `operations`: Array of question types
  - `'number_line_position'`: Identify position on number line
  - `'number_line_between'`: Find numbers between two values
  - `'number_line_jump'`: Calculate landing position after jumps
  - `'estimate_position'`: Estimate which range a number falls in
  - `'estimate_calculation'`: Estimate results of calculations
  - `'round_to_ten'`, `'round_to_hundred'`, `'round_to_thousand'`: Rounding to specific place values
  - `'round_to_ten_thousand'`, `'round_to_hundred_thousand'`: Rounding for larger numbers
  - `'place_value_representation'`: Understand digit values
  - `'partition_number'`: Break numbers into place values
  - `'compare_rounded'`: Compare rounded values
  - `'choose_appropriate_rounding'`: Context-based rounding decisions
  - `'error_bounds'`: Find range of original values from rounded numbers
- `estimation_ranges`: Array of [min, max] pairs for estimation questions
- `rounding_bases`: Array of place values for rounding (e.g., `[10, 100, 1000]`)

**Progressive Complexity**:
- **Year 1**: Basic number line position (0-100), counting objects, comparison language
- **Year 2**: Number lines, estimation, basic place value (0-100)
- **Year 3**: Extended number lines (0-1000), midpoint estimation, partitioning
- **Year 4**: Rounding to 10, 100, 1000 (up to 10,000)
- **Year 5**: Rounding to large place values (up to 1,000,000)
- **Year 6**: Advanced rounding (up to 10 million), error bounds, contextual rounding

**Helper Functions** (`N04_representationHelpers.js`):
Over 30 specialized functions including:
- Number line generation and position finding
- Rounding and distractor generation
- Place value representation
- Estimation range calculations
- Comparison language generation
- Error bound calculations

---

## Adding New Curriculum Modules

### Step-by-Step Guide

#### 1. Define Parameters in `src/curriculum/parameters.js`

```javascript
'NEW_MODULE_ID': {
    id: 'NEW_MODULE_ID',
    name: 'Display name for UI',
    description: 'Full UK National Curriculum statement',
    icon: '🔢',  // Choose appropriate emoji
    yearGroup: 'Year N',
    strand: 'Strand name',
    substrand: 'Substrand name',
    ref: 'Content domain code (e.g., N1, C1, F1)',
    parameters: {
        1: {
            // Beginning level parameters
            // Define all constraints for simplest version
        },
        2: {
            // Developing level parameters
            // Increase complexity
        },
        3: {
            // Meeting level parameters
            // Meet curriculum expectations
        },
        4: {
            // Exceeding level parameters
            // Challenge beyond minimum requirements
        }
    }
}
```

#### 2. Create Generator File `src/generators/NEW_MODULE_ID_*.js`

```javascript
/**
 * [Description of what this generator does]
 * Module: [MODULE_ID] - "[Curriculum statement]"
 */

import { /* helper functions */ } from './helpers/*.js';

export function generateQuestion(params, level) {
    // 1. Extract parameters
    const { min_value, max_value, /* ... */ } = params;

    // 2. Make random selections based on parameters
    const randomValue = randomInt(min_value, max_value);

    // 3. Generate question data
    // (e.g., numbers, sequences, calculations)

    // 4. Choose question type
    const questionType = randomChoice(['text_input', 'multiple_choice']);

    // 5. Construct question object
    return {
        text: "Question text here",
        type: questionType,
        answer: "correct answer as string",
        // Add type-specific fields
        module: 'NEW_MODULE_ID',
        level: level
    };
}

export default {
    moduleId: 'NEW_MODULE_ID',
    generate: generateQuestion
};
```

#### 3. Register Generator in `src/core/questionEngine.js`

```javascript
import newModuleGenerator from '../generators/NEW_MODULE_ID_*.js';

registerDefaultGenerators() {
    // ... existing generators
    this.register(newModuleGenerator);
}
```

#### 4. Test the Module

```javascript
// In browser console or test file
import questionEngine from './src/core/questionEngine.js';

// Generate test questions
const questions = questionEngine.generate('NEW_MODULE_ID', 1, 5);
console.log(questions);

// Verify:
// - Questions vary appropriately
// - Answers are correct
// - All levels work
// - Parameters are respected
```

---

## Question Schema

### Base Question Object

All generators must return objects matching this schema:

```typescript
interface Question {
    // Required fields
    text: string;                    // Question text shown to student
    type: 'text_input' | 'multiple_choice';
    answer: string;                  // Correct answer (always string, even for numbers)
    module: string;                  // Module ID (e.g., 'N01_Y1_NPV')
    level: number;                   // Difficulty level (1-4)

    // Optional fields (type-dependent)
    options?: number[];              // For multiple_choice: array of choices
    hint?: string;                   // Optional hint for students
    answers?: any[];                 // For multi-gap questions: array of answers

    // Added by QuestionEngine (don't include in generator)
    id?: string;                     // Unique ID (added automatically)
    timestamp?: number;              // Generation timestamp (added automatically)
}
```

### Question Types

#### Text Input Question
```javascript
{
    text: "What is 5 + 3?",
    type: "text_input",
    answer: "8",
    hint: "Add the two numbers together",
    module: "C01_Y1_CALC",
    level: 1
}
```

#### Multiple Choice Question
```javascript
{
    text: "What is 10 + 5?",
    type: "multiple_choice",
    options: [12, 15, 18, 20],      // Options in random order
    answer: "15",                    // Correct answer as string
    module: "C01_Y2_CALC",
    level: 2
}
```

#### Multi-Gap Fill Question
```javascript
{
    text: "Fill in the missing numbers: 2, ___, 6, ___, 10",
    type: "text_input",
    answer: "4,8",                   // Comma-separated string
    answers: [4, 8],                 // Array of answers for validation
    hint: "Count in 2s",
    module: "N01_Y1_NPV",
    level: 1
}
```

---

## Validation System

### Answer Normalization

Before comparison, answers are normalized:

```javascript
function normalizeAnswer(answer) {
    return String(answer)
        .trim()                  // Remove leading/trailing whitespace
        .toLowerCase()           // Convert to lowercase
        .replace(/\s+/g, '');   // Remove all internal whitespace
}

// Examples:
normalizeAnswer("  42  ")     // "42"
normalizeAnswer("Twenty")     // "twenty"
normalizeAnswer("3, 6, 9")    // "3,6,9"
```

### Validation Strategies

#### 1. Exact String Match
```javascript
if (submittedAnswer === correctAnswer) {
    return { isCorrect: true };
}
```

#### 2. Numeric Comparison (with tolerance)
```javascript
const numSubmitted = parseFloat(studentAnswer);
const numCorrect = parseFloat(question.answer);

if (Math.abs(numSubmitted - numCorrect) <= 0.01) {
    return { isCorrect: true };
}
```
Handles floating-point precision issues (e.g., 0.1 + 0.2 = 0.30000000000000004).

#### 3. Multi-Gap Validation
```javascript
if (correctAnswer.includes(',')) {
    const correctParts = correctAnswer.split(',').map(s => s.trim()).sort();
    const submittedParts = submittedAnswer.split(',').map(s => s.trim()).sort();

    if (correctParts.every((val, idx) => val === submittedParts[idx])) {
        return { isCorrect: true };
    }
}
```

**Note**: Multi-gap answers are sorted for order-independent comparison.

### Validation Response

```javascript
{
    isCorrect: boolean,           // True if answer is correct
    feedback: string,             // Human-readable feedback
    normalizedAnswer: string,     // Normalized version of student answer
    correctAnswer?: string        // Only present if incorrect
}
```

---

## Code Patterns and Conventions

### 1. Registry Pattern (QuestionEngine)

**Purpose**: Allow dynamic registration of generators without modifying core code

```javascript
class QuestionEngine {
    constructor() {
        this.generators = new Map();
    }

    register(generator) {
        this.generators.set(generator.moduleId, generator.generate);
    }
}
```

**Benefits**:
- New generators self-register
- No central configuration file to update
- Easy to add/remove generators
- Testable in isolation

### 2. Pure Functions (Generators)

**Characteristics**:
- No side effects (no DOM manipulation, no global state changes)
- Deterministic for same input parameters (randomness within function is acceptable)
- No external dependencies beyond helper functions
- Return value is the only output

**Example**:
```javascript
// ✅ Pure function
export function generateQuestion(params, level) {
    const value = randomInt(params.min, params.max);
    return { text: `What is ${value}?`, answer: String(value) };
}

// ❌ Impure function (modifies external state)
let questionCount = 0;
export function generateQuestion(params, level) {
    questionCount++;  // Side effect!
    return { /* ... */ };
}
```

### 3. Singleton Pattern (QuestionEngine)

```javascript
class QuestionEngine {
    // ... class definition
}

const engine = new QuestionEngine();  // Single instance
export default engine;                // Export singleton

// Usage:
import questionEngine from './questionEngine.js';
questionEngine.generate(/* ... */);
```

### 4. Helper Function Organization

Place reusable logic in `src/generators/helpers/`:

```
src/generators/helpers/
├── N01_countingHelpers.js    (Counting-specific helpers)
├── N02_numberHelpers.js      (Number operations helpers)
└── commonHelpers.js          (Shared utilities)
```

**Example Helper**:
```javascript
// countingHelpers.js
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSequence(start, step, length, direction) {
    const sequence = [];
    const increment = direction === 'forwards' ? step : -step;

    for (let i = 0; i < length; i++) {
        sequence.push(start + (i * increment));
    }

    return sequence;
}
```

### 5. Module Exports

Every generator exports:
```javascript
export default {
    moduleId: string,           // Unique identifier
    generate: Function          // Generator function
};
```

Every helper module exports named functions:
```javascript
export function helperFunction1() { /* ... */ }
export function helperFunction2() { /* ... */ }
```

---

## File Structure

```
question-generator/
├── index.html                          # Entry point
├── styles/
│   └── main.css                        # All styling
├── src/
│   ├── curriculum/
│   │   └── parameters.js                       # All module definitions
│   ├── generators/
│   │   ├── helpers/
│   │   │   ├── N01_countingHelpers.js          # Counting utilities
│   │   │   ├── N02_numberHelpers.js            # Number utilities
│   │   │   ├── N03_placevalueHelpers.js        # Place value utilities
│   │   │   └── N04_representationHelpers.js    # Representation utilities
│   │   ├── N01_Y1_NPV_counting.js              # Year 1 counting generator
│   │   ├── N01_Y2_NPV_counting.js              # Year 2 counting generator
│   │   ├── N01_Y3_NPV_counting.js              # Year 3 counting generator
│   │   ├── N01_Y4_NPV_counting.js              # Year 4 counting generator
│   │   ├── N01_Y5_NPV_counting.js              # Year 5 counting generator
│   │   ├── N02_Y2_NPV_readwrite.js             # Year 2 read/write generator
│   │   ├── N02_Y3_NPV_readwrite.js             # Year 3 read/write generator
│   │   ├── N02_Y4_NPV_readwrite.js             # Year 4 read/write generator
│   │   ├── N02_Y5_NPV_readwrite.js             # Year 5 read/write generator
│   │   ├── N02_Y6_NPV_readwrite.js             # Year 6 read/write generator
│   │   ├── N03_Y2_NPV_placevalue.js            # Year 2 place value generator
│   │   ├── N03_Y3_NPV_placevalue.js            # Year 3 place value generator
│   │   ├── N03_Y4_NPV_placevalue.js            # Year 4 place value generator
│   │   ├── N03_Y5_NPV_placevalue.js            # Year 5 place value generator
│   │   ├── N03_Y6_NPV_placevalue.js            # Year 6 place value generator
│   │   ├── N04_Y1_NPV_representation.js        # Year 1 representation generator
│   │   ├── N04_Y2_NPV_representation.js        # Year 2 representation generator
│   │   ├── N04_Y3_NPV_representation.js        # Year 3 representation generator
│   │   ├── N04_Y4_NPV_representation.js        # Year 4 representation generator
│   │   ├── N04_Y5_NPV_representation.js        # Year 5 representation generator
│   │   └── N04_Y6_NPV_representation.js        # Year 6 representation generator
│   ├── core/
│   │   ├── questionEngine.js           # Generator registry & orchestration
│   │   └── validator.js                # Answer validation
│   └── ui/
│       └── app.js                      # Main application controller
├── references/
│   └── national_curriculum_framework_excel.csv  # Source curriculum data
├── tools/
│   └── exportCodebase.js               # Utility scripts
├── CLAUDE.md                           # Developer guidance
├── USER_GUIDE.md                       # Non-technical user guide
├── TECHNICAL_DOCUMENTATION.md          # This document
└── README.md                           # Project overview
```

### File Naming Conventions

- **Module files**: `[MODULE_ID]_[description].js` (e.g., `N01_Y1_NPV_counting.js`)
- **Helper files**: `[MODULE_PREFIX]_[description]Helpers.js` (e.g., `N01_countingHelpers.js`)
- **Core files**: `[component].js` (e.g., `questionEngine.js`, `validator.js`)
- **UI files**: `[component].js` (e.g., `app.js`)

---

## Running the Application

### Development Setup

#### Option 1: Python (Recommended)
```bash
cd question-generator
python -m http.server 8000
```
Navigate to `http://localhost:8000`

#### Option 2: Node.js
```bash
cd question-generator
npx http-server -p 8000
```
Navigate to `http://localhost:8000`

#### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Why Not `file://` Protocol?

ES6 modules require CORS, which is blocked when using `file://` protocol. You'll see:
```
Access to script at 'file:///.../ app.js' from origin 'null' has been blocked by CORS policy
```

**Solution**: Always use an HTTP server, even for local development.

### Production Deployment

1. **Build**: No build step required
2. **Deploy**: Copy all files to web server
3. **Configuration**: Ensure server serves `.js` files with correct MIME type (`application/javascript`)

Works with:
- Apache
- Nginx
- Netlify
- Vercel
- GitHub Pages
- Any static file hosting

---

## Testing Strategy

### Unit Testing Generators

```javascript
// Example test for N01_Y1_NPV_counting.js
import { generateQuestion } from './N01_Y1_NPV_counting.js';

describe('N01_Y1_NPV Counting Generator', () => {
    test('generates question with correct structure', () => {
        const params = {
            step_sizes: [2],
            min_value: 0,
            max_value: 20,
            directions: ['forwards'],
            start_from: 'zero_only',
            sequence_length: 5,
            gaps_count: 1,
            gap_position: 'end'
        };

        const question = generateQuestion(params, 1);

        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('type');
        expect(question).toHaveProperty('answer');
        expect(question.module).toBe('N01_Y1_NPV');
        expect(question.level).toBe(1);
    });

    test('respects min/max value bounds', () => {
        const params = { /* ... */ };

        for (let i = 0; i < 100; i++) {
            const question = generateQuestion(params, 1);
            const numbers = extractNumbers(question.text);

            numbers.forEach(num => {
                expect(num).toBeGreaterThanOrEqual(params.min_value);
                expect(num).toBeLessThanOrEqual(params.max_value);
            });
        }
    });
});
```

### Integration Testing

```javascript
describe('Question Engine Integration', () => {
    test('generates questions for all levels', () => {
        for (let level = 1; level <= 4; level++) {
            const questions = questionEngine.generate('N01_Y1_NPV', level, 5);
            expect(questions).toHaveLength(5);
            questions.forEach(q => {
                expect(q.level).toBe(level);
            });
        }
    });
});
```

### Validation Testing

```javascript
describe('Validator', () => {
    test('validates correct numeric answer', () => {
        const question = { answer: "42", type: "text_input" };
        const result = validator.validate(question, "42");
        expect(result.isCorrect).toBe(true);
    });

    test('validates multi-gap answers', () => {
        const question = { answer: "3,6,9", answers: [3, 6, 9] };
        const result = validator.validate(question, "3, 6, 9");
        expect(result.isCorrect).toBe(true);
    });
});
```

---

## Future Extensibility

### Planned Enhancements

#### 1. Complete Curriculum Coverage
- Add remaining 320+ modules across all strands (C, F, R, A, M, G, P, S)
- Implement all 338 UK National Curriculum statements

#### 2. Additional Question Types
```javascript
// Potential new types:
- 'drag_and_drop': Reorder elements
- 'grid_input': Fill 2D grid (for arrays/matrices)
- 'drawing': Interactive drawing canvas
- 'multi_select': Choose multiple correct answers
```

#### 3. Progress Tracking
```javascript
// Store student performance
{
    studentId: string,
    moduleId: string,
    level: number,
    questionsAttempted: number,
    questionsCorrect: number,
    averageTime: number,
    lastAttempt: Date
}
```

#### 4. Adaptive Difficulty
```javascript
// Adjust level based on performance
if (student.accuracy >= 0.8 && student.speed < averageTime) {
    recommendNextLevel(currentLevel + 1);
}
```

#### 5. Question Persistence
```javascript
// Save questions for review
{
    questionId: string,
    questionObject: Question,
    studentAnswer: string,
    isCorrect: boolean,
    timestamp: Date
}
```

#### 6. Multi-Language Support
```javascript
// Add translations for UI and questions
const translations = {
    'en-GB': { /* English translations */ },
    'cy': { /* Welsh translations */ }
};
```

#### 7. Accessibility Enhancements
- Screen reader support
- Keyboard navigation
- High-contrast mode
- Text-to-speech for questions

#### 8. Teacher Dashboard
- Class management
- Assignment creation
- Performance analytics
- Custom parameter adjustment

### Architecture Extensibility

The current architecture supports these extensions without major refactoring:

1. **New Generators**: Just create file, export `{ moduleId, generate }`, register in QuestionEngine
2. **New Parameters**: Add to `parameters.js`, update generator to use them
3. **New Question Types**: Add type to schema, update validator and renderer
4. **New Validation Rules**: Extend `validator.js` with new logic
5. **New UI Features**: Extend `app.js` or create new UI controllers

---

## Performance Considerations

### Current Performance

- **Question Generation**: ~1ms per question (pure JavaScript, no API calls)
- **Rendering**: ~50ms for 20 questions (DOM manipulation)
- **Validation**: ~0.5ms per answer

### Optimization Strategies

#### 1. Lazy Loading Generators
```javascript
// Instead of importing all generators upfront
async register(moduleId) {
    const generator = await import(`../generators/${moduleId}.js`);
    this.generators.set(moduleId, generator.generate);
}
```

#### 2. Memoization for Parameters
```javascript
const parameterCache = new Map();

export function getParameters(moduleId, level) {
    const key = `${moduleId}_${level}`;
    if (parameterCache.has(key)) {
        return parameterCache.get(key);
    }
    const params = MODULES[moduleId]?.parameters[level];
    parameterCache.set(key, params);
    return params;
}
```

#### 3. Virtual Scrolling for Many Questions
For quizzes with 100+ questions, implement virtual scrolling to render only visible questions.

---

## Security Considerations

### XSS Prevention

All user input is displayed as text content, not HTML:

```javascript
// ✅ Safe: textContent prevents XSS
inputElement.textContent = userInput;

// ❌ Dangerous: innerHTML allows XSS
element.innerHTML = userInput;  // Never do this with user input
```

### No Server-Side Processing

- All computation happens client-side
- No database, no user data storage (currently)
- No authentication/authorization required
- No API calls to external services

### Future: Data Privacy

If adding student tracking:
- Store data locally (localStorage/IndexedDB)
- Or use privacy-compliant backend (GDPR, COPPA)
- Encrypt sensitive student data
- Implement data retention policies

---

## API Reference

### QuestionEngine API

```javascript
// Generate single question
questionEngine.generateOne(moduleId: string, level: number): Question | null

// Generate multiple questions
questionEngine.generate(moduleId: string, level: number, count: number): Question[]

// Check if generator exists
questionEngine.hasGenerator(moduleId: string): boolean

// Get generator function
questionEngine.getGenerator(moduleId: string): Function | null

// Get all registered modules
questionEngine.getRegisteredModules(): string[]
```

### Parameters API

```javascript
// Get module by ID
getModule(moduleId: string): Module | null

// Get parameters for specific level
getParameters(moduleId: string, level: number): Parameters | null

// Get all module IDs
getModuleIds(): string[]

// Validate level number
isValidLevel(level: number): boolean
```

### Validator API

```javascript
// Main validation function
validator.validate(question: Question, studentAnswer: string): ValidationResult

// Multiple choice validation
validator.validateMultipleChoice(question: Question, selectedOption: string): ValidationResult

// Text input validation
validator.validateTextInput(question: Question, textInput: string): ValidationResult

// Partial credit validation
validator.validatePartial(question: Question, studentAnswer: string): PartialValidationResult

// Simple boolean check
validator.isCorrect(question: Question, studentAnswer: string): boolean
```

### TypeScript Definitions

```typescript
// Question type
type QuestionType = 'text_input' | 'multiple_choice';

// Question interface
interface Question {
    text: string;
    type: QuestionType;
    answer: string;
    module: string;
    level: number;
    options?: number[];
    hint?: string;
    answers?: any[];
    id?: string;
    timestamp?: number;
}

// Validation result
interface ValidationResult {
    isCorrect: boolean;
    feedback: string;
    normalizedAnswer: string;
    correctAnswer?: string;
}

// Module interface
interface Module {
    id: string;
    name: string;
    description: string;
    icon: string;
    yearGroup: string;
    strand: string;
    substrand: string;
    ref: string;
    parameters: {
        1: Parameters;
        2: Parameters;
        3: Parameters;
        4: Parameters;
    };
}

// Parameters interface (varies by module)
interface Parameters {
    [key: string]: any;
}
```

---

## Troubleshooting

### Common Issues

#### Issue: "Failed to resolve module specifier"
```
Uncaught TypeError: Failed to resolve module specifier "app.js"
```

**Cause**: Relative import missing `./` or `.js` extension

**Solution**:
```javascript
// ❌ Wrong
import app from 'app.js';

// ✅ Correct
import app from './app.js';
```

#### Issue: CORS Error with `file://`
```
Access to script has been blocked by CORS policy
```

**Cause**: Using `file://` protocol instead of HTTP server

**Solution**: Run local HTTP server (see [Running the Application](#running-the-application))

#### Issue: Generator Not Found
```
No generator found for module: N01_Y1_NPV
```

**Cause**: Generator not registered in QuestionEngine

**Solution**: Add import and registration in `questionEngine.js`:
```javascript
import newGenerator from '../generators/NEW_MODULE.js';
this.register(newGenerator);
```

---

## Contributing Guidelines

### Code Style

- Use ES6+ features (const/let, arrow functions, template literals)
- 4-space indentation
- Descriptive variable names (no single letters except loop counters)
- JSDoc comments for public functions
- Consistent naming: camelCase for variables/functions, PascalCase for classes

### Commit Messages

```
[MODULE_ID] Brief description

- Detailed change 1
- Detailed change 2

Example:
[N01_Y3_NPV] Add support for counting in 25s and 50s

- Updated step_sizes in Level 4 parameters
- Added test cases for larger steps
- Fixed boundary checking for sequences > 500
```

### Pull Request Process

1. Create generator for new module
2. Add parameters to `parameters.js`
3. Register generator in `questionEngine.js`
4. Test all 4 levels generate valid questions
5. Update documentation (this file)
6. Submit PR with clear description

---

## Conclusion

The UK Maths Practice Question Generator demonstrates how **parameter-driven architecture** enables scalable, maintainable educational software. By separating curriculum data, question logic, and presentation, the system:

- Supports rapid curriculum expansion
- Maintains code quality and testability
- Requires zero build tooling
- Runs entirely client-side
- Aligns precisely with educational standards

This architecture can serve as a **blueprint for curriculum-aligned educational applications** across subjects and frameworks.

---

**Document Version**: 1.0
**Last Updated**: 2025-10-16
**Maintainer**: Development Team
