# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A production-ready interactive mathematics practice application for UK Key Stage 1 & 2 students (ages 5-11). Pure JavaScript/HTML/CSS with ES6 modules, no external dependencies. Currently implements Phase 0 (core functionality) and Phase 1 (question deduplication).

**Key Feature**: Parameter-based architecture generates unlimited unique questions at 4 difficulty levels across 4 curriculum modules.

## Running the Application

**IMPORTANT**: ES6 modules require a web server (file:// protocol will not work).

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: VS Code
# Install "Live Server" extension, right-click index.html, select "Open with Live Server"
```

Then open: http://localhost:8000

## Architecture

### Three-Component System

The app follows a strict separation between curriculum definition, question generation, and delivery:

```
CURRICULUM PARAMETERS (modules.js)
  ↓ defines ranges and constraints for 4 difficulty levels
QUESTION GENERATORS (generators/*.js)
  ↓ pure functions that generate questions from parameters
DELIVERY APPLICATION (ui/*.js)
  ↓ presents questions to students and tracks progress
```

### File Structure

```
src/
├── curriculum/
│   └── modules.js          # SINGLE SOURCE OF TRUTH for all module parameters
├── generators/
│   ├── counting.js         # Each generator is a pure function
│   ├── bonds.js
│   ├── multiply.js
│   └── fractions.js
├── core/
│   ├── questionEngine.js   # Registry pattern: registers generators, orchestrates generation
│   ├── questionHistory.js  # Deduplication: fingerprints + localStorage persistence
│   └── validator.js        # Answer validation logic
└── ui/
    ├── setupScreen.js      # Setup screen component (module/level selection)
    ├── practiceScreen.js   # Practice screen component (question display/interaction)
    ├── resultsScreen.js    # Results screen component (score summary)
    └── app.js              # Main initialization and event coordination
```

### Design Patterns

- **Registry Pattern**: QuestionEngine registers generators via `register()` and looks them up by moduleId
- **Singleton Pattern**: QuestionEngine and QuestionHistory export singleton instances
- **Component Pattern**: Each UI screen is self-contained with `init()`, `show()`, `hide()` methods
- **Event-Driven**: Screens communicate via custom events (`'start-practice'`, `'show-results'`, etc.)
- **Pure Functions**: All generators are side-effect free; same params = same question structure

## Key Concepts

### Curriculum Parameters (modules.js)

Each module defines parameters for 4 difficulty levels (1=Beginning, 2=Developing, 3=Meeting, 4=Exceeding). These parameters control:
- Value ranges (e.g., max_value, denominators)
- Constraints (e.g., step_sizes, times_tables)
- Features (e.g., include_division, include_subtraction)

**When modifying parameters**: Always maintain all 4 levels and ensure progression is smooth.

### Question Generators

Each generator exports an object with:
```javascript
{
  moduleId: 'counting',  // Must match key in MODULES
  generate: (params, level) => {
    // Pure function: returns question object
    return {
      module: 'counting',
      level: 1,
      type: 'multiple_choice' | 'text_input',
      text: 'What comes next? 2, 4, 6, ...',
      options: [8, 10, 12, 14],  // For multiple_choice only
      answer: '8'                // Always string
    };
  }
}
```

**Important**: Generators should produce varied questions from the same parameters (use randomization).

### Question Deduplication (Phase 1)

The `questionHistory.js` system prevents duplicate questions within a configurable cooldown period:

1. **Fingerprinting**: Questions are hashed based on module, level, type, text, answer, and options
2. **History Tracking**: Map of fingerprint → timestamp stored in localStorage
3. **Cooldown**: Default 24 hours (configurable: 1h, 4h, 12h, 24h, 48h, 1 week)
4. **Automatic Cleanup**: Expired entries removed on load and during generation

**When generating questions**: QuestionEngine automatically checks history and skips duplicates (up to 10× the requested count attempts).

### Question Engine Flow

```javascript
// High-level flow
generate(moduleId, level, count) {
  1. cleanup() expired history entries
  2. Loop until count questions generated or maxAttempts reached:
     a. generateOne() creates question from params
     b. Check hasQuestionBeenSeen() via fingerprint
     c. If duplicate, skip; else add to results
     d. markQuestionAsSeen() and save to localStorage
  3. Return questions array
}
```

## Development Guidelines

### Adding a New Module

1. Add module definition to `modules.js` MODULES object with all 4 difficulty levels
2. Create new generator file in `src/generators/[module-name].js`
3. Export object with `moduleId` and `generate` function
4. Import and register in `questionEngine.js` constructor
5. Test all 4 levels thoroughly

### Modifying Existing Generators

- Maintain backward compatibility with existing parameter structure
- Test changes across all 4 difficulty levels
- Ensure questions remain varied (avoid predictable patterns)
- Validate that answer validation logic still works

### UI Changes

- Each screen component manages its own DOM updates
- Use custom events for cross-component communication
- Follow the component lifecycle: `init()` → `show()` → `hide()`
- Remember last selected module/level when returning to setup (see setupScreen.js)

### Testing Checklist

Before committing changes:
- [ ] Test all 4 modules at all 4 difficulty levels
- [ ] Verify question deduplication works (generate multiple sessions)
- [ ] Check answer validation for both correct and incorrect answers
- [ ] Test on tablet/iPad if possible (responsive design critical)
- [ ] Verify localStorage persistence (cooldown settings, history)
- [ ] Check browser console for errors
- [ ] Test with question count = 1, 5, 10, 20

## Common Tasks

### Run Tests
There is no automated test suite yet. Manual testing required (see PHASE1_TESTING.md for detailed test scenarios).

### Debug Question Generation
```javascript
// In browser console:
import engine from './src/core/questionEngine.js';
const questions = engine.generate('counting', 1, 5, false); // false = skip history check
console.log(questions);
```

### Clear Question History
Via UI: Setup screen → "Clear History" button
Via console: `localStorage.removeItem('mathsPractice_questionHistory')`

### View Question History Stats
Via UI: Setup screen → "View Stats" button
Via console:
```javascript
import engine from './src/core/questionEngine.js';
console.log(engine.getHistoryStats());
```

### Change Cooldown Period
Via UI: Setup screen → "Question Cooldown" dropdown
Via console:
```javascript
import engine from './src/core/questionEngine.js';
engine.setCooldown(48); // hours
```

## Current Implementation Status

### ✅ Complete (Phase 0 & Phase 1)
- 4 curriculum modules (Counting, Number Bonds, Multiplication, Fractions)
- 4 difficulty levels per module
- Question generation engine with parameter system
- Multiple question types (multiple choice, text input)
- Answer validation
- Three-screen UI (Setup → Practice → Results)
- Responsive design (tablet-optimized)
- **Question deduplication with configurable cooldown**
- **localStorage persistence for history**
- **History statistics and management UI**

### 🔜 Planned (Future Phases)
- Phase 2: On-screen keyboard (iPad-friendly number pad)
- Phase 3: Auto level-up system (after 3 consecutive correct)
- Phase 4: Enhanced question types (drag-drop, matching, true/false)
- Phase 5: Hints system (progressive 3-level hints)
- Phase 6: Timer system (optional countdown)
- Phase 7: Progress persistence (track student progress over time)
- Phase 8: Teacher dashboard (aggregate class data)

See `docs/engineering_doc.md` for detailed implementation plans for future phases.

## Important Notes

- **No Build Process**: Pure ES6 modules, no bundling required
- **No Dependencies**: 100% vanilla JavaScript
- **localStorage Limits**: 5MB typical limit; question history designed to stay well under this
- **Browser Support**: Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+)
- **Offline Capable**: Works without internet after first load (no service worker yet)
- **Target Device**: Primarily iPad/tablets in classroom setting

## Documentation

- `README.md` - User-facing overview and features
- `QUICKSTART.md` - Quick testing guide
- `PHASE1_TESTING.md` - Detailed deduplication testing scenarios
- `docs/engineering_doc.md` - Complete technical specifications and future phase designs
- `docs/curriculum_params.md` - Framework for defining difficulty parameters
- `docs/module_examples.md` - Examples of question generation patterns

## Code Style

- ES6+ JavaScript (modules, arrow functions, classes)
- 2-space indentation
- JSDoc comments for all exported functions
- Descriptive variable names (e.g., `cooldownPeriod`, not `cdp`)
- Pure functions where possible (especially generators)
- Avoid mutation; prefer immutable patterns
