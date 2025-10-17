# MVP Visual Implementation Plan

## Context for LLM Agent

You are working on a UK National Curriculum mathematics practice application. The codebase uses:
- Pure JavaScript ES6 modules (no build process)
- Architecture: Curriculum parameters → Generators → Question Engine → UI
- Files are in `src/curriculum/`, `src/generators/`, `src/core/`, `src/ui/`
- Questions currently display as text only
- Goal: Add minimal visual representations (number lines and dot counting) with ~3-4 hours effort

## Objective

Add simple HTML/CSS-based visuals for number lines and object counting to improve learning value for Years 1-3, while keeping code complexity minimal and maintaining easy upgrade path to full SVG later.

---

## Task 1: Create Visual Helper Functions

**File to create: `src/generators/helpers/simpleVisuals.js`**

Create a new file with these two helper functions:

```javascript
/**
 * Simple Visual Helpers for MVP
 * 
 * HTML/CSS-based visual representations that can be easily upgraded to SVG later
 */

import { formatNumber } from './N04_representationHelpers.js';

/**
 * Create a simple HTML/CSS number line
 * @param {number} min - Minimum value on number line
 * @param {number} max - Maximum value on number line
 * @param {number|null} markedPosition - Position to mark with arrow (null for no marker)
 * @param {boolean} showAllLabels - If true, show all tick labels; if false, show only start/middle/end
 * @returns {string} HTML string for number line
 */
export function createSimpleNumberLineHTML(min, max, markedPosition = null, showAllLabels = false) {
    const divisions = 10;
    const step = (max - min) / divisions;
    
    let html = '<div class="simple-number-line">';
    
    for (let i = 0; i <= divisions; i++) {
        const value = min + (i * step);
        const isMarked = markedPosition !== null && 
                         Math.abs(value - markedPosition) < step * 0.4;
        
        // Show labels at start, middle, end, or all depending on parameter
        const showLabel = showAllLabels || i === 0 || i === divisions || i === 5;
        
        html += `
            <div class="number-line-tick ${isMarked ? 'marked' : ''}">
                ${isMarked ? '<div class="marker">▼</div>' : ''}
                ${showLabel ? `<div class="tick-label">${formatNumber(value)}</div>` : ''}
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Create simple dot/object counting visual
 * @param {number} count - Number of objects to display
 * @param {number} groupSize - Objects per group (for subitizing support)
 * @param {string} color - CSS color for dots
 * @returns {string} HTML string for dots
 */
export function createSimpleDotsHTML(count, groupSize = 5, color = '#3b82f6') {
    let html = '<div class="simple-dots-container">';
    
    for (let i = 0; i < count; i++) {
        // Add visual spacer after each group
        if (i > 0 && i % groupSize === 0) {
            html += '<div class="dot-spacer"></div>';
        }
        html += `<div class="simple-dot" style="background-color: ${color}"></div>`;
    }
    
    html += '</div>';
    return html;
}

/**
 * Create number line with a range highlighted (for "between" questions)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} rangeStart - Start of highlighted range
 * @param {number} rangeEnd - End of highlighted range
 * @returns {string} HTML string for number line with range
 */
export function createNumberLineWithRange(min, max, rangeStart, rangeEnd) {
    const divisions = 10;
    const step = (max - min) / divisions;
    
    let html = '<div class="simple-number-line with-range">';
    
    for (let i = 0; i <= divisions; i++) {
        const value = min + (i * step);
        const isInRange = value >= rangeStart && value <= rangeEnd;
        const showLabel = i === 0 || i === divisions || i === 5;
        
        html += `
            <div class="number-line-tick ${isInRange ? 'in-range' : ''}">
                ${showLabel ? `<div class="tick-label">${formatNumber(value)}</div>` : ''}
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

export default {
    createSimpleNumberLineHTML,
    createSimpleDotsHTML,
    createNumberLineWithRange
};
```

**Success criteria:**
- File created at `src/generators/helpers/simpleVisuals.js`
- All three functions exported
- Imports `formatNumber` from existing helpers

---

## Task 2: Add CSS Styling

**File to modify: `styles/main.css`**

Add these styles at the end of the file (after the existing responsive design section):

```css
/* ============================================
   MVP Visual Representations
   Simple HTML/CSS visuals for number lines and objects
   ============================================ */

/* Number Lines */
.simple-number-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    padding: 40px 0 30px 0;
    margin: 20px 0;
    background: linear-gradient(to right, #2563eb 0%, #2563eb 100%);
    background-size: 100% 3px;
    background-position: center 40px;
    background-repeat: no-repeat;
}

.number-line-tick {
    position: relative;
    width: 2px;
    height: 20px;
    background: #2563eb;
    margin-top: 30px;
    flex-shrink: 0;
}

.number-line-tick.marked {
    background: #ef4444;
    width: 4px;
    height: 30px;
    margin-top: 25px;
}

.number-line-tick.in-range {
    background: #10b981;
    width: 3px;
    height: 25px;
}

.number-line-tick .marker {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: #ef4444;
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
}

.number-line-tick .tick-label {
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.85rem;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
}

/* Object/Dot Counting */
.simple-dots-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 20px;
    background: #f9fafb;
    border-radius: 8px;
    max-width: 600px;
    margin: 15px 0;
}

.simple-dot {
    width: 30px;
    height: 30px;
    background: #3b82f6;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dot-spacer {
    width: 20px;
    flex-shrink: 0;
}

/* Responsive adjustments for visuals */
@media (max-width: 768px) {
    .simple-number-line {
        padding: 30px 0 25px 0;
        background-position: center 30px;
    }
    
    .number-line-tick {
        height: 15px;
        margin-top: 22px;
    }
    
    .number-line-tick.marked {
        height: 20px;
        margin-top: 20px;
    }
    
    .number-line-tick .marker {
        font-size: 18px;
        top: -25px;
    }
    
    .number-line-tick .tick-label {
        font-size: 0.75rem;
        top: 20px;
    }
    
    .simple-dots-container {
        gap: 10px;
        padding: 15px;
    }
    
    .simple-dot {
        width: 25px;
        height: 25px;
    }
    
    .dot-spacer {
        width: 15px;
    }
}

@media (max-width: 480px) {
    .number-line-tick .tick-label {
        font-size: 0.7rem;
    }
    
    .simple-dot {
        width: 22px;
        height: 22px;
    }
}
```

**Success criteria:**
- Styles added to `styles/main.css`
- No conflicts with existing styles
- Responsive breakpoints included

---

## Task 3: Update App.js to Handle HTML in Questions

**File to modify: `src/ui/app.js`**

Add this helper method to the `App` class (add after the `formatAnswerForDisplay` method, around line 200):

```javascript
/**
 * Escape HTML to prevent XSS, but allow specific visual classes
 * @param {string} text - Text that may contain HTML
 * @returns {string} Safe HTML
 */
renderQuestionText(text) {
    // Check if text contains our safe visual HTML classes
    const hasSafeVisuals = text.includes('class="simple-number-line"') || 
                          text.includes('class="simple-dots-container"');
    
    if (hasSafeVisuals) {
        // Text contains our visual HTML - render as-is
        return text;
    } else {
        // Plain text - escape HTML entities
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
```

Then **modify the `renderQuestion` method** (around line 150). Find this line:

```javascript
<div class="question-text">${questionIdx + 1}. ${question.text}</div>
```

Replace ALL occurrences (there are 2-3 in the method) with:

```javascript
<div class="question-text">${questionIdx + 1}. ${this.renderQuestionText(question.text)}</div>
```

**Success criteria:**
- `renderQuestionText()` method added to App class
- All `question.text` displays use `this.renderQuestionText(question.text)`
- HTML visuals render, plain text is escaped

---

## Task 4: Update N04_Y1_NPV Generator (Year 1)

**File to modify: `src/generators/N04_Y1_NPV_representation.js`**

At the top, add import:

```javascript
import { createSimpleNumberLineHTML, createSimpleDotsHTML } from './helpers/simpleVisuals.js';
```

Find the `generateQuestion` function. Update these operations:

**For `number_line_position`:**

```javascript
if (operation === 'number_line_position') {
    const targetNumber = randomInt(min_value, max_value);
    const numberLineHTML = createSimpleNumberLineHTML(
        min_value,
        max_value,
        targetNumber,
        level <= 2  // Show all labels for easier levels
    );
    
    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Look at where the arrow points between the labeled numbers',
        module: 'N04_Y1_NPV',
        level: level
    };
}
```

**For `count_objects`:**

```javascript
if (operation === 'count_objects') {
    const count = randomInt(min_value, max_value);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const color = randomChoice(colors);
    const dotsHTML = createSimpleDotsHTML(count, 5, color);
    
    return {
        text: `How many dots do you see?\n\n${dotsHTML}`,
        type: 'text_input',
        answer: String(count),
        hint: 'Count carefully, one at a time',
        module: 'N04_Y1_NPV',
        level: level
    };
}
```

**Success criteria:**
- Import added
- Both operations updated with visuals
- Questions display actual number line and dots

---

## Task 5: Update N04_Y2_NPV Generator (Year 2)

**File to modify: `src/generators/N04_Y2_NPV_representation.js`**

Add import at top:

```javascript
import { createSimpleNumberLineHTML } from './helpers/simpleVisuals.js';
```

Update `number_line_position` operation:

```javascript
if (operation === 'number_line_position') {
    const targetNumber = randomInt(min_value, max_value);
    const numberLineHTML = createSimpleNumberLineHTML(
        min_value,
        max_value,
        targetNumber,
        level === 1  // Only show all labels at level 1
    );
    
    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Look at the position between the marked numbers',
        module: 'N04_Y2_NPV',
        level: level
    };
}
```

Update `number_line_between` operation:

```javascript
if (operation === 'number_line_between') {
    const range = max_value - min_value;
    const point1 = min_value + randomInt(Math.floor(range * 0.3), Math.floor(range * 0.4));
    const point2 = min_value + randomInt(Math.floor(range * 0.6), Math.floor(range * 0.7));
    
    const numberLineHTML = createSimpleNumberLineHTML(min_value, max_value, null, true);
    
    return {
        text: `Name a number that lies between ${formatNumber(point1)} and ${formatNumber(point2)} on this number line:\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(randomInt(point1 + 1, point2 - 1)), // Any valid number
        hint: 'Choose any number greater than the first and less than the second',
        module: 'N04_Y2_NPV',
        level: level
    };
}
```

**Success criteria:**
- Import added
- Both operations updated
- Number lines display correctly

---

## Task 6: Update N04_Y3_NPV Generator (Year 3)

**File to modify: `src/generators/N04_Y3_NPV_representation.js`**

Add import:

```javascript
import { createSimpleNumberLineHTML } from './helpers/simpleVisuals.js';
```

Update `number_line_position` operation:

```javascript
if (operation === 'number_line_position') {
    const targetNumber = randomInt(min_value, max_value);
    const numberLineHTML = createSimpleNumberLineHTML(
        min_value,
        max_value,
        targetNumber,
        false  // Year 3: fewer labels for challenge
    );
    
    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Use the labeled marks to estimate the position',
        module: 'N04_Y3_NPV',
        level: level
    };
}
```

**Success criteria:**
- Import added
- Operation updated
- Number line shows fewer labels than Y2

---

## Task 7: Update N04_Y4_NPV Generator (Year 4)

**File to modify: `src/generators/N04_Y4_NPV_representation.js`**

Add import:

```javascript
import { createSimpleNumberLineHTML } from './helpers/simpleVisuals.js';
```

Update `number_line_position` operation (similar pattern):

```javascript
if (operation === 'number_line_position') {
    const targetNumber = randomInt(min_value, max_value);
    const numberLineHTML = createSimpleNumberLineHTML(
        min_value,
        max_value,
        targetNumber,
        false
    );
    
    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Calculate the position using the scale',
        module: 'N04_Y4_NPV',
        level: level
    };
}
```

**Success criteria:**
- Import added
- Operation updated
- Works with larger numbers (up to 10,000)

---

## Task 8: Update N04_Y5_NPV Generator (Year 5)

**File to modify: `src/generators/N04_Y5_NPV_representation.js`**

Add import:

```javascript
import { createSimpleNumberLineHTML } from './helpers/simpleVisuals.js';
```

Update `number_line_position` operation:

```javascript
if (operation === 'number_line_position') {
    const targetNumber = randomInt(min_value, max_value);
    const numberLineHTML = createSimpleNumberLineHTML(
        min_value,
        max_value,
        targetNumber,
        false
    );
    
    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Consider the scale and intervals',
        module: 'N04_Y5_NPV',
        level: level
    };
}
```

**Success criteria:**
- Import added
- Operation updated
- Handles large numbers (up to 1,000,000)

---

## Task 9: Update N04_Y6_NPV Generator (Year 6)

**File to modify: `src/generators/N04_Y6_NPV_representation.js`**

Add import:

```javascript
import { createSimpleNumberLineHTML } from './helpers/simpleVisuals.js';
```

Update `number_line_position` operation:

```javascript
if (operation === 'number_line_position') {
    const targetNumber = randomInt(min_value, max_value);
    const numberLineHTML = createSimpleNumberLineHTML(
        min_value,
        max_value,
        targetNumber,
        false
    );
    
    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Use proportional reasoning to find the position',
        module: 'N04_Y6_NPV',
        level: level
    };
}
```

**Success criteria:**
- Import added
- Operation updated
- Handles very large numbers (up to 10,000,000)

---

## Task 10: Testing & Verification

**Manual testing steps:**

1. **Start the server:**
   ```bash
   python -m http.server 8000
   ```

2. **Test each year group:**
   - Navigate to http://localhost:8000
   - Select N04_Y1_NPV
   - Verify number line displays with arrow marker
   - Verify dots display in groups
   - Check all 4 difficulty levels

3. **Test Years 2-6:**
   - Select each N04_Y2 through N04_Y6
   - Verify number lines display correctly
   - Check that larger numbers format with commas
   - Verify responsive design on mobile (browser dev tools)

4. **Test answer validation:**
   - Answer a number line question
   - Submit answers
   - Verify correct/incorrect feedback works
   - Check that visual doesn't interfere with validation

**Success criteria checklist:**
- [ ] Number lines display on all Y1-Y6 N04 modules
- [ ] Dots display on Y1 counting questions
- [ ] Arrow markers show on number lines
- [ ] Labels display correctly (with commas for large numbers)
- [ ] Visuals are responsive on mobile
- [ ] Answer validation still works correctly
- [ ] No console errors
- [ ] Questions print correctly (test with Ctrl+P)

---

## Expected Results

**Before implementation:**
- Questions describe visuals in text
- Students must imagine number lines
- Answer sometimes revealed in question text

**After implementation:**
- Actual visual number lines with markers
- Actual countable dots for Y1
- Students interpret real visuals
- Professional appearance

**Code impact:**
- ~200 lines of new code (helpers + CSS)
- ~50 lines of modifications (6 generators + app.js)
- No changes to core architecture
- Easy to upgrade to SVG later

---

## Rollback Plan

If anything breaks:

1. **Remove imports** from generator files
2. **Revert renderQuestionText** changes in app.js
3. **Comment out CSS** in main.css
4. Application returns to text-only state

Files to revert:
- `src/ui/app.js` (renderQuestionText method)
- All N04 generator files (remove imports and visual HTML)

---

## Notes for LLM Agent

- **Preserve all existing code** - only add new functions and modify specific sections
- **Test after each file modification** - don't wait until the end
- **Keep formatting consistent** - match the existing code style
- **Don't modify parameters.js** - visual helpers work with existing parameters
- **Don't change validation logic** - visuals don't affect answer checking
- **Copy exact CSS** - styling precision matters for visual alignment

---

## Estimated Time

- Task 1 (helpers): 30 minutes
- Task 2 (CSS): 30 minutes
- Task 3 (app.js): 20 minutes
- Tasks 4-9 (generators): 15 minutes each = 90 minutes
- Task 10 (testing): 30 minutes

**Total: 3-4 hours**

---

## Success Metrics

✅ All N04 modules (Y1-Y6) display visual number lines
✅ Y1 displays countable dots
✅ No console errors
✅ Answer validation unchanged
✅ Mobile responsive
✅ Code is clean and maintainable