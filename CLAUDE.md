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

⚠️ **Important**: Do NOT open `index.html` directly with `file://` protocol - ES6 modules will fail due to CORS.

## Architecture Overview

This is a UK National Curriculum-aligned mathematics practice application following a **parameter-based architecture** with three core layers:

### 1. Curriculum Layer (`src/curriculum/`)
- `parameters.js` - Defines all curriculum modules with 4 difficulty levels each
- Each module has an ID based on UK National Curriculum codes (e.g., `N01_Y1_NPV`)
- Parameters are organized **by level** (not by parameter type)
- Levels: 1=Beginning, 2=Developing, 3=Meeting, 4=Exceeding

### 2. Generator Layer (`src/generators/`)
- Each file generates questions for one curriculum module (e.g., `N01_Y1_NPV_counting.js`)
- Generators are **pure functions** that take parameters and level, return question objects
- Question types: `text_input`, `multiple_choice`, `fill_blanks`, `next_number`
- All generators must export: `{ moduleId, generate }`

### 3. Engine & UI Layer (`src/core/` and `src/ui/`)
- `questionEngine.js` - Registry pattern for generators, orchestrates question creation
- `validator.js` - Validates student answers (handles text, numbers, multi-gap)
- `app.js` - Main UI controller, renders questions grouped by difficulty level

### Key Design Patterns
- **Registry Pattern**: QuestionEngine maintains a Map of generators keyed by moduleId
- **Pure Functions**: Generators have no side effects, can be called repeatedly
- **Parameter-Driven**: All question constraints come from `parameters.js`, not hardcoded
- **Singleton**: QuestionEngine is exported as a singleton instance

## Adding New Curriculum Modules

1. **Define parameters** in `src/curriculum/parameters.js`:
```javascript
'MODULE_ID': {
    id: 'MODULE_ID',
    name: 'Display name',
    description: '...',
    icon: '🔢',
    yearGroup: 'Year N',
    strand: 'Number and Place Value',
    parameters: {
        1: { /* level 1 params */ },
        2: { /* level 2 params */ },
        3: { /* level 3 params */ },
        4: { /* level 4 params */ }
    }
}
```

2. **Create generator** in `src/generators/MODULE_ID_*.js`:
```javascript
export function generateQuestion(params, level) {
    // Use params to generate question
    return {
        text: 'Question text',
        type: 'text_input' | 'multiple_choice',
        answer: 'correct answer',
        // For multiple choice: options: [...]
        // For text input: hint: '...'
        module: 'MODULE_ID',
        level: level
    };
}

export default {
    moduleId: 'MODULE_ID',
    generate: generateQuestion
};
```

3. **Register generator** in `src/core/questionEngine.js`:
```javascript
import newGenerator from '../generators/MODULE_ID_*.js';

registerDefaultGenerators() {
    // ... existing
    this.register(newGenerator);
}
```

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

## Common Parameters Structure

Parameters vary by module but typically include:

- `step_sizes` or `powers_of_10`: Array of counting increments
- `min_value`, `max_value`: Bounds for generated numbers
- `directions`: Array of `'forwards'` and/or `'backwards'`
- `start_from`: Where sequences start (`'zero_only'`, `'any'`, `'zero_or_multiple'`, etc.)
- `sequence_length`: How many numbers in a sequence
- `gaps_count`: Number of blanks in fill-in questions
- `gap_position`: Where gaps appear (`'end'`, `'middle'`, `'random'`, `'start'`)

## File Structure

```
src/
├── curriculum/
│   └── parameters.js          # All module definitions
├── generators/
│   ├── N01_Y1_NPV_counting.js # Year 1 counting
│   ├── N01_Y2_NPV_counting.js # Year 2 counting
│   ├── N01_Y3_NPV_counting.js # Year 3 counting
│   ├── N01_Y4_NPV_counting.js # Year 4 counting
│   └── N01_Y5_NPV_counting.js # Year 5 counting (with negatives)
├── core/
│   ├── questionEngine.js      # Generator registry & orchestration
│   └── validator.js           # Answer validation
└── ui/
    └── app.js                 # Main UI controller

styles/                        # CSS files
tools/                         # Utility scripts (exportCodebase.js)
index.html                     # Entry point
```

## Year 5 Special Case

Year 5 counting includes **negative numbers** and uses `powers_of_10` instead of `step_sizes`:

```javascript
parameters: {
    1: {
        powers_of_10: [10, 100],    // NOT step_sizes
        min_value: -100,
        max_value: 100,
        start_range: [-50, 50],     // Specific to Y5
        // ...
    }
}
```

The generator must handle negative number sequences and crossing zero.

## Validation System

The validator (`src/core/validator.js`) handles:

- **Exact string matching** (normalized: trimmed, lowercase, no spaces)
- **Numeric comparison** with tolerance (handles floating point precision)
- **Multi-gap answers** (comma-separated values, order-independent)
- **Empty answer detection**

Multi-gap questions store answers two ways:
- `answer`: Comma-separated string (e.g., `"5,10,15"`)
- `answers`: Array (e.g., `[5, 10, 15]`)

## ES6 Modules

All files use ES6 modules:
- Use `export` for functions/objects
- Use `import` with `.js` extensions
- No bundler required (native browser support)
- Module paths must be relative and include `.js`

## No Build Process

- No npm dependencies
- No compilation or transpilation
- Pure HTML/CSS/JavaScript
- Works offline after first load
