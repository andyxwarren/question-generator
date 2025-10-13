# Implementation Guide: Updating to New Parameter System

## Overview
This guide explains how to update your codebase from the current parameter system to the new simplified system. The changes affect 3 main areas:

1. **Parameter structure** (`src/curriculum/parameters.js`)
2. **Question generators** (`src/generators/*.js`)
3. **Validation and utilities** (helper functions)

---

## Part 1: Update Parameter Structure

### File: `src/curriculum/parameters.js`

**Current Structure:**
```javascript
parameters: {
    min_value: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    },
    max_value: {
        1: 30,
        2: 50,
        3: 100,
        4: 200
    }
    // etc...
}
```

**New Structure:**
```javascript
parameters: {
    1: {
        step_sizes: [10, 5],
        min_value: 0,
        max_value: 30,
        directions: ['forwards'],
        start_from: 'zero_only',
        sequence_length: 5,
        gaps_count: 1,
        gap_position: 'end'
    },
    2: { /* level 2 params */ },
    3: { /* level 3 params */ },
    4: { /* level 4 params */ }
}
```

### Changes Required:

1. **Restructure from parameter-centric to level-centric**
   - OLD: Each parameter has 4 values (one per level)
   - NEW: Each level has all its parameters together

2. **Replace existing modules with the 5 new counting modules:**
   - Remove: `C01_Y1_CALC`, `C06_Y3_CALC`, `F02_Y4_FRAC`
   - Add: `N01_Y1_NPV`, `N01_Y2_NPV`, `N01_Y3_NPV`, `N01_Y4_NPV`, `N01_Y5_NPV`

3. **Update `getParameters()` function:**

```javascript
// OLD function (remove this)
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return {};
    
    const params = {};
    for (const [key, values] of Object.entries(module.parameters)) {
        params[key] = values[level];
    }
    return params;
}

// NEW function (replace with this)
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return null;
    
    return module.parameters[level] || null;
}
```

### Complete New parameters.js Structure:

```javascript
export const MODULES = {
    'N01_Y1_NPV': {
        id: 'N01_Y1_NPV',
        name: 'Counting in Multiples',
        description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: { /* beginning params */ },
            2: { /* developing params */ },
            3: { /* meeting params */ },
            4: { /* exceeding params */ }
        }
    },
    // ... other modules
};
```

---

## Part 2: Create New Generator Files

### Files to Create:
- `src/generators/N01_Y1_NPV_counting.js` (already exists, update it)
- `src/generators/N01_Y2_NPV_counting.js` (new)
- `src/generators/N01_Y3_NPV_counting.js` (new)
- `src/generators/N01_Y4_NPV_counting.js` (new)
- `src/generators/N01_Y5_NPV_counting.js` (new)

### Files to Remove:
- `src/generators/C01_Y1_CALC_bonds.js`
- `src/generators/C06_Y3_CALC_multiply.js`
- `src/generators/F02_Y4_FRAC_fractions.js`

### Generator Template Structure

All 5 counting generators follow the same pattern. Here's the complete template:

```javascript
/**
 * [Module Name] Question Generator
 * 
 * Generates counting sequence questions based on UK National Curriculum
 */

/**
 * Helper: Choose random item from array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Generate random integer in range [min, max]
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Helper: Get starting value based on start_from parameter
 */
function getStartValue(params, step) {
    const { start_from, min_value, max_value } = params;
    
    if (start_from === 'zero_only') {
        return 0;
    } else if (start_from === 'zero_or_multiple') {
        const multiples = [0, step, step * 2, step * 3, step * 4];
        return randomChoice(multiples.filter(m => m <= max_value / 2));
    } else if (start_from === 'any') {
        // Pick random value and align to step
        const range = max_value - min_value;
        const rawStart = min_value + randomInt(0, Math.floor(range / 2));
        return Math.floor(rawStart / step) * step;
    }
    
    return 0;
}

/**
 * Helper: Generate sequence array
 */
function generateSequence(start, step, length, direction) {
    const sequence = [];
    const multiplier = direction === 'forwards' ? 1 : -1;
    
    for (let i = 0; i < length; i++) {
        sequence.push(start + (i * step * multiplier));
    }
    
    return sequence;
}

/**
 * Helper: Get gap positions
 */
function getGapPositions(sequenceLength, gapsCount, gapPosition) {
    const positions = [];
    
    if (gapPosition === 'end') {
        positions.push(sequenceLength - 1);
    } else if (gapPosition === 'start') {
        positions.push(0);
    } else if (gapPosition === 'middle') {
        positions.push(Math.floor(sequenceLength / 2));
    } else if (gapPosition === 'random') {
        // Generate unique random positions
        const available = Array.from({length: sequenceLength}, (_, i) => i);
        for (let i = 0; i < gapsCount; i++) {
            const idx = randomInt(0, available.length - 1);
            positions.push(available[idx]);
            available.splice(idx, 1);
        }
    }
    
    return positions.slice(0, gapsCount).sort((a, b) => a - b);
}

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // Extract parameters
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const { sequence_length, gaps_count, gap_position, min_value, max_value } = params;
    
    // Get starting value
    let start = getStartValue(params, step);
    
    // Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max_value - (step * (sequence_length - 1));
        start = Math.min(start, maxStart);
    } else {
        const minStart = min_value + (step * (sequence_length - 1));
        start = Math.max(start, minStart);
    }
    
    // Generate full sequence
    const fullSequence = generateSequence(start, step, sequence_length, direction);
    
    // Choose question type
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);
    
    return generateQuestionByType(questionType, fullSequence, params, step, direction);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction) {
    const { gaps_count, gap_position, sequence_length } = params;
    
    if (type === 'fill_blanks') {
        // Get positions for blanks
        const gapPositions = getGapPositions(sequence_length, gaps_count, gap_position);
        
        // Create display sequence with blanks
        const displaySequence = fullSequence.map((num, idx) => 
            gapPositions.includes(idx) ? '___' : num.toString()
        );
        
        // Collect answers
        const answers = gapPositions.map(pos => fullSequence[pos]);
        
        return {
            text: `Fill in the missing number${gaps_count > 1 ? 's' : ''}: ${displaySequence.join(', ')}`,
            type: 'text_input',
            answer: answers.join(','),  // Store as comma-separated
            answers: answers,  // Also store as array for validation
            hint: `The pattern counts ${direction} in ${step}s`,
            module: params.moduleId || 'N01_Y1_NPV',
            level: level
        };
    }
    
    if (type === 'next_number') {
        // Show first N-1 numbers, ask for last
        const shown = fullSequence.slice(0, -1);
        const answer = fullSequence[fullSequence.length - 1];
        
        return {
            text: `What number comes next? ${shown.join(', ')}, ___`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Count ${direction} in ${step}s`,
            module: params.moduleId || 'N01_Y1_NPV',
            level: level
        };
    }
    
    if (type === 'multiple_choice') {
        // Show all but last, create options
        const shown = fullSequence.slice(0, -1);
        const correctAnswer = fullSequence[fullSequence.length - 1];
        
        // Generate plausible distractors
        const distractors = [
            correctAnswer + step,      // One step too far
            correctAnswer - step,      // One step back
            correctAnswer + 1,         // Off by one
            correctAnswer - 1          // Off by one other direction
        ];
        
        // Select 3 unique distractors
        const uniqueDistractors = [...new Set(distractors)]
            .filter(d => d !== correctAnswer)
            .slice(0, 3);
        
        // Create options and shuffle
        const options = [correctAnswer, ...uniqueDistractors]
            .sort(() => Math.random() - 0.5);
        
        return {
            text: `Continue the pattern: ${shown.join(', ')}, ___`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: params.moduleId || 'N01_Y1_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y1_NPV',  // Change this for each module
    generate: generateQuestion
};
```

### Specific Adjustments for Each Module:

#### N01_Y2_NPV - Add special handling for "tens from any"
```javascript
// Add this after extracting parameters
if (params.tens_from_any && step === 10) {
    // For tens, start from any number in tens_range
    const { tens_range } = params;
    start = randomInt(tens_range[0], tens_range[1]);
}
```

#### N01_Y5_NPV - Use powers_of_10 instead of step_sizes
```javascript
// Replace step selection with:
const step = randomChoice(params.powers_of_10);

// And add this for start_range:
const { start_range } = params;
start = randomInt(start_range[0], start_range[1]);
```

---

## Part 3: Update Question Engine

### File: `src/core/questionEngine.js`

**Changes needed:**

1. **Update imports** (remove old generators, add new ones):

```javascript
// OLD imports - REMOVE THESE
import bondsGenerator from '../generators/C01_Y1_CALC_bonds.js';
import multiplyGenerator from '../generators/C06_Y3_CALC_multiply.js';
import fractionsGenerator from '../generators/F02_Y4_FRAC_fractions.js';

// NEW imports - ADD THESE
import countingY1Generator from '../generators/N01_Y1_NPV_counting.js';
import countingY2Generator from '../generators/N01_Y2_NPV_counting.js';
import countingY3Generator from '../generators/N01_Y3_NPV_counting.js';
import countingY4Generator from '../generators/N01_Y4_NPV_counting.js';
import countingY5Generator from '../generators/N01_Y5_NPV_counting.js';
```

2. **Update registerDefaultGenerators() method:**

```javascript
registerDefaultGenerators() {
    this.register(countingY1Generator);
    this.register(countingY2Generator);
    this.register(countingY3Generator);
    this.register(countingY4Generator);
    this.register(countingY5Generator);
}
```

**No other changes needed in questionEngine.js** - the existing logic should work with the new structure.

---

## Part 4: Update Validator

### File: `src/core/validator.js`

**Add support for comma-separated answers** (for multi-gap questions):

```javascript
/**
 * Validate a student's answer
 * @param {Object} question - Question object with answer
 * @param {string} studentAnswer - Student's submitted answer
 * @returns {Object} Validation result { isCorrect, feedback, normalizedAnswer }
 */
export function validate(question, studentAnswer) {
    const correctAnswer = normalizeAnswer(question.answer);
    const submittedAnswer = normalizeAnswer(studentAnswer);

    // Empty answer check
    if (!submittedAnswer) {
        return {
            isCorrect: false,
            feedback: 'Please provide an answer',
            normalizedAnswer: submittedAnswer
        };
    }

    // Exact match
    if (submittedAnswer === correctAnswer) {
        return {
            isCorrect: true,
            feedback: 'Correct!',
            normalizedAnswer: submittedAnswer
        };
    }

    // NEW: Handle comma-separated answers (multi-gap questions)
    if (correctAnswer.includes(',')) {
        const correctParts = correctAnswer.split(',').sort();
        const submittedParts = submittedAnswer.split(',').sort();
        
        if (correctParts.length === submittedParts.length &&
            correctParts.every((val, idx) => val === submittedParts[idx])) {
            return {
                isCorrect: true,
                feedback: 'Correct!',
                normalizedAnswer: submittedAnswer
            };
        }
    }

    // Try numeric comparison (handles decimal precision issues)
    const numSubmitted = parseFloat(studentAnswer);
    const numCorrect = parseFloat(question.answer);

    if (!isNaN(numSubmitted) && !isNaN(numCorrect)) {
        if (approximatelyEqual(numSubmitted, numCorrect)) {
            return {
                isCorrect: true,
                feedback: 'Correct!',
                normalizedAnswer: submittedAnswer
            };
        }
    }

    // Not correct
    return {
        isCorrect: false,
        feedback: `Not quite. The correct answer is ${question.answer}`,
        normalizedAnswer: submittedAnswer,
        correctAnswer: question.answer
    };
}
```

---

## Part 5: Update UI Layer

### File: `src/ui/app.js`

**Changes needed:**

1. **Update import path:**

```javascript
// OLD
import { MODULES } from '../curriculum/modules.js';

// NEW
import { MODULES } from '../curriculum/parameters.js';
```

2. **Update renderQuestion() to handle multi-gap text inputs:**

```javascript
renderQuestion(question, levelIdx, questionIdx) {
    const questionId = `q_${levelIdx}_${questionIdx}`;

    if (question.type === 'multiple_choice') {
        return `
            <div class="question" data-question-id="${questionId}">
                <div class="question-text">${questionIdx + 1}. ${question.text}</div>
                <div class="options">
                    ${question.options.map((option, optIdx) => `
                        <label class="option">
                            <input type="radio" name="${questionId}" value="${option}">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="feedback"></div>
            </div>
        `;
    } else if (question.type === 'text_input') {
        // NEW: Check if multi-gap question
        const isMultiGap = question.answers && question.answers.length > 1;
        
        if (isMultiGap) {
            return `
                <div class="question" data-question-id="${questionId}">
                    <div class="question-text">${questionIdx + 1}. ${question.text}</div>
                    <div class="multi-input-container">
                        ${question.answers.map((_, idx) => `
                            <input type="text" 
                                   class="text-input multi-gap" 
                                   data-gap-index="${idx}"
                                   placeholder="Answer ${idx + 1}"
                                   size="8">
                        `).join('')}
                    </div>
                    ${question.hint ? `<div class="hint">💡 Hint: ${question.hint}</div>` : ''}
                    <div class="feedback"></div>
                </div>
            `;
        } else {
            // Single input (existing code)
            return `
                <div class="question" data-question-id="${questionId}">
                    <div class="question-text">${questionIdx + 1}. ${question.text}</div>
                    <input type="text" class="text-input" id="${questionId}" placeholder="Your answer">
                    ${question.hint ? `<div class="hint">💡 Hint: ${question.hint}</div>` : ''}
                    <div class="feedback"></div>
                </div>
            `;
        }
    }
}
```

3. **Update submitAnswers() to handle multi-gap inputs:**

```javascript
submitAnswers() {
    let totalCorrect = 0;
    let totalQuestions = 0;

    this.questions.forEach((levelGroup, levelIdx) => {
        levelGroup.questions.forEach((question, qIdx) => {
            const questionId = `q_${levelIdx}_${qIdx}`;
            const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
            const feedbackElement = questionElement.querySelector('.feedback');

            let userAnswer = '';

            // Get user answer
            if (question.type === 'multiple_choice') {
                const selected = questionElement.querySelector(`input[name="${questionId}"]:checked`);
                userAnswer = selected ? selected.value : '';
            } else if (question.type === 'text_input') {
                // NEW: Check for multi-gap inputs
                const multiGaps = questionElement.querySelectorAll('.text-input.multi-gap');
                if (multiGaps.length > 0) {
                    // Collect all gap answers and join with comma
                    const gapAnswers = Array.from(multiGaps).map(input => input.value.trim());
                    userAnswer = gapAnswers.join(',');
                } else {
                    // Single input
                    userAnswer = document.getElementById(questionId).value.trim();
                }
            }

            // Validate answer
            const result = validator.validate(question, userAnswer);
            totalQuestions++;
            if (result.isCorrect) totalCorrect++;

            // Show feedback
            questionElement.classList.remove('correct', 'incorrect');
            if (userAnswer) {
                questionElement.classList.add(result.isCorrect ? 'correct' : 'incorrect');
                feedbackElement.innerHTML = result.isCorrect
                    ? '<span class="correct-mark">✓ Correct!</span>'
                    : `<span class="incorrect-mark">✗ Incorrect. Answer: ${question.answer}</span>`;
            }
        });
    });

    // Show results summary
    this.showResults(totalCorrect, totalQuestions);
}
```

4. **Update resetAnswers() to clear multi-gap inputs:**

```javascript
resetAnswers() {
    // Clear all radio selections
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // Clear all text inputs (including multi-gap)
    document.querySelectorAll('.text-input').forEach(input => {
        input.value = '';
    });

    // Remove feedback
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('correct', 'incorrect');
        q.querySelector('.feedback').innerHTML = '';
    });
}
```

---

## Part 6: Update Styles (Optional)

### File: `styles/main.css`

**Add styles for multi-gap inputs:**

```css
/* Multi-gap input container */
.multi-input-container {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
}

.text-input.multi-gap {
    width: auto;
    min-width: 80px;
    flex: 0 1 auto;
}
```

---

## Part 7: Testing Checklist

After making all changes, test the following:

### Unit Tests (manual or automated)

1. **Parameter Loading:**
   - [ ] `getParameters('N01_Y1_NPV', 1)` returns correct level 1 params
   - [ ] `getParameters('N01_Y1_NPV', 3)` returns correct level 3 params
   - [ ] `getParameters('invalid_module', 1)` returns null
   - [ ] `getModule('N01_Y5_NPV')` returns complete module object

2. **Generator Tests:**
   - [ ] Generate 10 questions for each module × level combination (200 total)
   - [ ] Verify all generated numbers stay within `min_value` and `max_value`
   - [ ] Verify step sizes match `step_sizes` parameter
   - [ ] Verify direction matches `directions` parameter
   - [ ] Verify no duplicate questions in a batch of 10

3. **Validation Tests:**
   - [ ] Single-gap questions validate correctly
   - [ ] Multi-gap questions validate correctly (e.g., "10,20" === "10,20")
   - [ ] Multi-gap order doesn't matter if appropriate (test "10,20" vs "20,10")
   - [ ] Multiple choice validates correctly
   - [ ] Empty answers show appropriate feedback

4. **UI Tests:**
   - [ ] Module cards display for all 5 modules
   - [ ] Selecting a module generates questions for all 4 levels
   - [ ] Single text inputs render correctly
   - [ ] Multi-gap text inputs render with correct number of boxes
   - [ ] Multiple choice options render correctly
   - [ ] Hints display when present
   - [ ] Submit button validates all answers
   - [ ] Correct/incorrect feedback displays properly
   - [ ] Results summary calculates percentages correctly
   - [ ] Reset button clears all inputs and feedback
   - [ ] Back button returns to module selection

### Integration Tests:

5. **Full Workflow:**
   - [ ] Select N01_Y1_NPV → generate 5 questions per level → answer all → submit → see results
   - [ ] Repeat for all 5 modules
   - [ ] Test with various question counts (1, 5, 10, 20)
   - [ ] Test reset functionality mid-quiz
   - [ ] Test back button without answering

### Browser Compatibility:
   - [ ] Test in Chrome
   - [ ] Test in Firefox
   - [ ] Test in Safari
   - [ ] Test on mobile device

---

## Part 8: Migration Summary

### Files to Modify:
1. ✏️ `src/curriculum/parameters.js` - Complete rewrite with new structure
2. ✏️ `src/generators/N01_Y1_NPV_counting.js` - Update to use new template
3. ✏️ `src/core/questionEngine.js` - Update imports and registration
4. ✏️ `src/core/validator.js` - Add multi-gap support
5. ✏️ `src/ui/app.js` - Update to handle new question types
6. ✏️ `styles/main.css` - Add multi-gap styles (optional)

### Files to Create:
7. ➕ `src/generators/N01_Y2_NPV_counting.js`
8. ➕ `src/generators/N01_Y3_NPV_counting.js`
9. ➕ `src/generators/N01_Y4_NPV_counting.js`
10. ➕ `src/generators/N01_Y5_NPV_counting.js`

---

## Part 9: Implementation Order

Follow this order to minimize errors:

1. **Backup existing code** (create a git branch or copy folder)

2. **Update parameters.js** completely with all 5 new modules

3. **Update questionEngine.js** imports (but keep old generators registered temporarily)

4. **Create ONE new generator** (start with N01_Y1_NPV) and test it thoroughly

5. **Update validator.js** to handle multi-gap answers

6. **Update app.js** to handle multi-gap rendering and submission

7. **Test the one working module end-to-end**

8. **Create remaining 4 generators** (copy template, adjust moduleId)

9. **Remove old generators** from questionEngine.js registration

10. **Delete old generator files**

11. **Run full test suite**

---

## Part 10: Common Pitfalls to Avoid

1. **Don't forget to update moduleId** in each generator's export
2. **Ensure sequence stays within bounds** - check both forwards and backwards
3. **Handle edge cases** - what if step > max_value?
4. **Validate gap positions** - don't allow gaps outside sequence length
5. **Test with gaps_count = 0** - should this be allowed?
6. **Multi-gap answer order** - decide if "10,20" === "20,10"
7. **Comma handling** - what if user types "10, 20" with space?
8. **Module icons** - ensure all 5 modules have appropriate emojis

---

This guide should be complete enough for an LLM to implement all the changes. Each section is self-contained with clear before/after examples and specific code to add/remove/modify.