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

## Visual Display Philosophy: Low-Overhead Solutions

When implementing visual representations for mathematical concepts, **prioritize simple, low-overhead solutions** that achieve the right balance between visual appeal and implementation effort.

### Guiding Principles

1. **90/10 Rule**: Aim for solutions that deliver 90% of the visual benefits for 10% of the implementation effort
2. **HTML/CSS First**: Leverage native HTML/CSS capabilities before considering complex solutions
3. **Progressive Enhancement**: Start simple, add complexity only when necessary
4. **Maintenance Cost**: Consider long-term maintenance - simpler code is easier to debug and modify

### Example: Columnar Calculations (C02 Modules)

The UK National Curriculum requires "formal written methods of columnar addition and subtraction" for Years 3-5. Rather than implementing a complex interactive canvas or SVG solution, we use a **styled `<pre>` tag approach**:

```javascript
// Helper function returns simple HTML string
export function formatColumnar(num1, num2, operator) {
    const num1Padded = num1.toLocaleString().padStart(maxLen + 2, ' ');
    const num2Padded = num2.toLocaleString().padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">  ${num1Padded}
${operator} ${num2Padded}
${line}
  ?</pre>`;
}
```

**Benefits of this approach:**
- ✅ Uses monospace font for natural alignment
- ✅ Single CSS file for styling (`styles/columnar.css`)
- ✅ No JavaScript runtime overhead
- ✅ Works in all browsers, print-friendly
- ✅ Easy to maintain and modify
- ✅ Accessible and screen-reader friendly

**What we avoided:**
- ❌ Complex Canvas rendering requiring draw loops
- ❌ SVG generation requiring coordinate calculations
- ❌ Third-party libraries adding bundle size
- ❌ Interactive animations requiring state management

### Decision Framework

When implementing visual displays, ask:

1. **Can this be solved with HTML/CSS alone?** (e.g., styled text, flexbox, grid)
2. **Does this need to be interactive?** (e.g., number lines with draggable markers vs static displays)
3. **What's the effort-to-benefit ratio?** (hours to implement vs educational value added)
4. **Will this need frequent updates?** (simple solutions are easier to modify)

### Recommended Approaches by Complexity

**Low Overhead (Preferred):**
- Styled `<pre>` tags for formatted text (columnar calculations)
- CSS Grid/Flexbox for structured layouts (ten frames, base-10 blocks)
- Unicode characters for symbols (tally marks, arrows, dots)
- Simple HTML generation functions (no state, no lifecycle)

**Medium Overhead (When Justified):**
- Inline SVG for geometric shapes (number lines, bar models)
- Simple Canvas for pixel-perfect rendering (rare cases)
- Minimal JavaScript for interactivity (drag-and-drop if pedagogically valuable)

**High Overhead (Avoid Unless Critical):**
- Complex interactive visualizations requiring state management
- Third-party charting/graphing libraries
- Animations requiring requestAnimationFrame
- WebGL or advanced rendering techniques

### File Organization for Visual Helpers

Keep visual helpers organized and reusable:

```
src/generators/helpers/
├── columnarHelpers.js      # Columnar calculation formatting
├── numberLineHelpers.js    # Number line HTML generation
├── visualHelpers.js        # Shared visual utilities
└── ...
```

Each helper should:
- Export pure functions that return HTML strings or simple objects
- Include clear JSDoc comments with examples
- Avoid side effects and global state
- Be testable in isolation

### Example: Avoiding Over-Engineering

**❌ Over-engineered approach:**
```javascript
class ColumnarCalculationRenderer {
    constructor(config) { /* complex setup */ }
    setNumbers(a, b) { /* state management */ }
    render() { /* multi-step rendering */ }
    update() { /* DOM manipulation */ }
    destroy() { /* cleanup */ }
}
```

**✅ Simple approach:**
```javascript
export function formatColumnar(num1, num2, operator) {
    // Returns HTML string - done!
    return `<pre class="columnar-calc">...</pre>`;
}
```

### When to Increase Complexity

Add complexity **only when**:
- Simple solutions fail to meet curriculum requirements
- Interactivity is pedagogically essential (not just "nice to have")
- User testing shows students benefit significantly
- The feature is used across many modules (justify the investment)

**Remember**: The goal is effective mathematics practice, not impressive visual effects. A simple, working solution deployed today is better than a perfect solution still in development.
