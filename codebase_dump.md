# 🧾 Codebase Export
_Generated on 13/10/2025, 13:35:46_

**Total files included:** 11

---
### `index.html`
**Type:** html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Question Generator</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Question Generator</h1>
            <p>Select a module to generate questions for all difficulty levels</p>
        </header>

        <div id="setupSection" class="section">
            <div class="control-group">
                <label for="questionCount">Number of questions per level:</label>
                <input type="number" id="questionCount" min="1" max="20" value="5">
            </div>

            <div class="modules-grid">
                <!-- Module cards will be inserted here by JavaScript -->
            </div>
        </div>

        <div id="questionsSection" class="section hidden">
            <div class="questions-header">
                <h2 id="moduleTitle"></h2>
                <button id="backBtn" class="btn-secondary">← Back to Modules</button>
            </div>

            <div id="questionsContainer">
                <!-- Questions will be inserted here by JavaScript -->
            </div>

            <div class="actions">
                <button id="submitBtn" class="btn-primary">Submit Answers</button>
                <button id="resetBtn" class="btn-secondary">Reset</button>
            </div>
        </div>

        <div id="resultsSection" class="section hidden">
            <h2>Results</h2>
            <div id="resultsContainer">
                <!-- Results will be shown here -->
            </div>
            <button id="newQuizBtn" class="btn-primary">Generate New Questions</button>
        </div>
    </div>

    <script type="module" src="src/ui/app.js"></script>
</body>
</html>

```

---
### `src\core\questionEngine.js`
**Type:** js

```js
/**
 * Question Engine
 *
 * Central orchestration system for question generation
 * Manages generator registry and question creation
 */

import { getParameters } from '../curriculum/parameters.js';
import countingY1Generator from '../generators/N01_Y1_NPV_counting.js';
import countingY2Generator from '../generators/N01_Y2_NPV_counting.js';
import countingY3Generator from '../generators/N01_Y3_NPV_counting.js';
import countingY4Generator from '../generators/N01_Y4_NPV_counting.js';
import countingY5Generator from '../generators/N01_Y5_NPV_counting.js';

/**
 * Question Engine Class
 */
class QuestionEngine {
    constructor() {
        this.generators = new Map();
        this.registerDefaultGenerators();
    }

    /**
     * Register all default generators
     */
    registerDefaultGenerators() {
        this.register(countingY1Generator);
        this.register(countingY2Generator);
        this.register(countingY3Generator);
        this.register(countingY4Generator);
        this.register(countingY5Generator);
    }

    /**
     * Register a question generator
     * @param {Object} generator - Generator object with moduleId and generate function
     */
    register(generator) {
        if (!generator.moduleId || !generator.generate) {
            throw new Error('Invalid generator: must have moduleId and generate function');
        }
        this.generators.set(generator.moduleId, generator.generate);
    }

    /**
     * Generate a single question
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @returns {Object|null} Question object or null if generation fails
     */
    generateOne(moduleId, level) {
        const generator = this.generators.get(moduleId);
        if (!generator) {
            console.error(`No generator found for module: ${moduleId}`);
            return null;
        }

        const params = getParameters(moduleId, level);
        if (!params) {
            console.error(`No parameters found for ${moduleId} level ${level}`);
            return null;
        }

        try {
            const question = generator(params, level);

            // Add unique ID and timestamp
            question.id = `${moduleId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            question.timestamp = Date.now();

            return question;
        } catch (error) {
            console.error(`Error generating question for ${moduleId}:`, error);
            return null;
        }
    }

    /**
     * Generate multiple questions
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @param {number} count - Number of questions to generate
     * @returns {Array} Array of question objects
     */
    generate(moduleId, level, count = 10) {
        const questions = [];

        for (let i = 0; i < count; i++) {
            const question = this.generateOne(moduleId, level);
            if (question) {
                questions.push(question);
            }
        }

        return questions;
    }

    /**
     * Get generator for a module
     * @param {string} moduleId - Module identifier
     * @returns {Function|null} Generator function or null
     */
    getGenerator(moduleId) {
        return this.generators.get(moduleId) || null;
    }

    /**
     * Check if generator exists for module
     * @param {string} moduleId - Module identifier
     * @returns {boolean} True if generator exists
     */
    hasGenerator(moduleId) {
        return this.generators.has(moduleId);
    }

    /**
     * Get all registered module IDs
     * @returns {string[]} Array of module IDs with generators
     */
    getRegisteredModules() {
        return Array.from(this.generators.keys());
    }
}

// Create and export singleton instance
const engine = new QuestionEngine();
export default engine;

```

---
### `src\core\validator.js`
**Type:** js

```js
/**
 * Answer Validator
 *
 * Validates student answers against correct answers
 * Handles different answer formats and provides feedback
 */

/**
 * Normalize answer for comparison
 * @param {string} answer - Answer to normalize
 * @returns {string} Normalized answer
 */
function normalizeAnswer(answer) {
    return String(answer)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '');
}

/**
 * Check if two numbers are approximately equal
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {number} tolerance - Allowed difference
 * @returns {boolean} True if approximately equal
 */
function approximatelyEqual(a, b, tolerance = 0.01) {
    return Math.abs(a - b) <= tolerance;
}

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

    // Handle comma-separated answers (multi-gap questions)
    if (correctAnswer.includes(',')) {
        const correctParts = correctAnswer.split(',').map(s => s.trim()).sort();
        const submittedParts = submittedAnswer.split(',').map(s => s.trim()).sort();

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

/**
 * Validate multiple choice answer
 * @param {Object} question - Question object
 * @param {string} selectedOption - Selected option
 * @returns {Object} Validation result
 */
export function validateMultipleChoice(question, selectedOption) {
    return validate(question, selectedOption);
}

/**
 * Validate text input answer
 * @param {Object} question - Question object
 * @param {string} textInput - Text input value
 * @returns {Object} Validation result
 */
export function validateTextInput(question, textInput) {
    return validate(question, textInput);
}

/**
 * Check if answer is partially correct (for multi-part questions)
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {Object} Partial validation result
 */
export function validatePartial(question, studentAnswer) {
    const result = validate(question, studentAnswer);

    // Could add partial credit logic here in future
    // For now, it's either correct or incorrect

    return {
        ...result,
        partialCredit: result.isCorrect ? 1.0 : 0.0
    };
}

/**
 * Validate answer and return simple boolean
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {boolean} True if correct
 */
export function isCorrect(question, studentAnswer) {
    return validate(question, studentAnswer).isCorrect;
}

export default {
    validate,
    validateMultipleChoice,
    validateTextInput,
    validatePartial,
    isCorrect
};

```

---
### `src\curriculum\parameters.js`
**Type:** js

```js
/**
 * Curriculum Module Definitions
 *
 * Defines all curriculum modules with parameters for 4 difficulty levels.
 * NEW STRUCTURE: Parameters organized by level, not by parameter type.
 *
 * Level 1: Beginning
 * Level 2: Developing
 * Level 3: Meeting
 * Level 4: Exceeding
 *
 * Module IDs based on UK National Curriculum Framework
 */

export const MODULES = {
    'N01_Y1_NPV': {
        id: 'N01_Y1_NPV',
        name: 'N01_Y1_NPV: Counting in Multiples',
        description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [1, 2, 5, 10],
                min_value: 0,
                max_value: 30,
                directions: ['forwards'],
                start_from: 'zero_only',          // 'zero_only', 'zero_or_multiple', 'any'
                sequence_length: 5,
                gaps_count: 1,
                gap_position: 'end'                // 'start', 'end', 'middle', 'random'
            },
            2: {
                step_sizes: [1, 2, 5, 10],
                min_value: 0,
                max_value: 50,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [1, 2, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random'
            },
            4: {
                step_sizes: [1, 2, 3, 5, 10],
                min_value: 0,
                max_value: 200,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random'
            }
        }
    },

    'N01_Y2_NPV': {
        id: 'N01_Y2_NPV',
        name: 'N01_Y2_NPV: Counting in Steps',
        description: 'Count in steps of 2, 3, and 5 from 0, and in tens from any number, forward and backward',
        icon: '🔢',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [2, 5, 10],
                min_value: 0,
                max_value: 50,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end',
                tens_from_any: false,
                tens_range: [0, 50]
            },
            2: {
                step_sizes: [2, 3, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle',
                tens_from_any: true,
                tens_range: [0, 100]
            },
            3: {
                step_sizes: [2, 3, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random',
                tens_from_any: true,
                tens_range: [0, 100]
            },
            4: {
                step_sizes: [2, 3, 4, 5, 10],
                min_value: 0,
                max_value: 200,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random',
                tens_from_any: true,
                tens_range: [0, 200]
            }
        }
    },

    'N01_Y3_NPV': {
        id: 'N01_Y3_NPV',
        name: 'N01_Y3_NPV: Counting from 0',
        description: 'Count from 0 in multiples of 4, 8, 50 and 100',
        icon: '🔢',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [4, 8, 10, 50],
                min_value: 0,
                max_value: 100,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end'
            },
            2: {
                step_sizes: [4, 8, 50, 100],
                min_value: 0,
                max_value: 400,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [4, 8, 50, 100],
                min_value: 0,
                max_value: 800,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random'
            },
            4: {
                step_sizes: [4, 6, 8, 25, 50, 100],
                min_value: 0,
                max_value: 1000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random'
            }
        }
    },

    'N01_Y4_NPV': {
        id: 'N01_Y4_NPV',
        name: 'N01_Y4_NPV: Count in Multiples',
        description: 'Count in multiples of 6, 7, 9, 25 and 1000',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [6, 7, 9, 25],
                min_value: 0,
                max_value: 200,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end'
            },
            2: {
                step_sizes: [6, 7, 9, 25, 1000],
                min_value: 0,
                max_value: 500,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [6, 7, 9, 25, 1000],
                min_value: 0,
                max_value: 10000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random'
            },
            4: {
                step_sizes: [6, 7, 9, 11, 12, 25, 1000],
                min_value: 0,
                max_value: 20000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random'
            }
        }
    },

    'N01_Y5_NPV': {
        id: 'N01_Y5_NPV',
        name: 'N01_Y5_NPV: Count Forwards and Backwards',
        description: 'Count forwards and backwards with positive and negative whole numbers, including through zero',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                powers_of_10: [10, 100],           // Use powers_of_10 instead of step_sizes for Y5
                min_value: -100,
                max_value: 100,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end',
                start_range: [-50, 50]             // Specific to Y5
            },
            2: {
                powers_of_10: [10, 100, 1000],
                min_value: -500,
                max_value: 500,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle',
                start_range: [-200, 200]
            },
            3: {
                powers_of_10: [10, 100, 1000, 10000],
                min_value: -10000,
                max_value: 10000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random',
                start_range: [-5000, 5000]
            },
            4: {
                powers_of_10: [10, 100, 1000, 10000, 100000],
                min_value: -100000,
                max_value: 100000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random',
                start_range: [-50000, 50000]
            }
        }
    }
};

/**
 * Get a module by ID
 * @param {string} moduleId - The module identifier
 * @returns {Object|null} Module object or null if not found
 */
export function getModule(moduleId) {
    return MODULES[moduleId] || null;
}

/**
 * Get parameters for a specific module and level
 * @param {string} moduleId - The module identifier
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object|null} Parameters object for the specified level, or null if not found
 */
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return null;

    return module.parameters[level] || null;
}

/**
 * Get all available module IDs
 * @returns {string[]} Array of module IDs
 */
export function getModuleIds() {
    return Object.keys(MODULES);
}

/**
 * Validate level number
 * @param {number} level - Level to validate
 * @returns {boolean} True if valid
 */
export function isValidLevel(level) {
    return [1, 2, 3, 4].includes(level);
}

```

---
### `src\generators\N01_Y1_NPV_counting.js`
**Type:** js

```js
/**
 * Year 1 Counting in Multiples Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y1_NPV - "Count to and across 100, forwards and backwards"
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

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction, level) {
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
            module: 'N01_Y1_NPV',
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
            module: 'N01_Y1_NPV',
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
            hint: `Count ${direction} in ${step}s`,
            module: 'N01_Y1_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateQuestion
};

```

---
### `src\generators\N01_Y2_NPV_counting.js`
**Type:** js

```js
/**
 * Year 2 Counting in Steps Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y2_NPV - "Count in steps of 2, 3, and 5 from 0, and in tens from any number"
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
    const { start_from, min_value, max_value, tens_from_any, tens_range } = params;

    // Special handling for tens from any number (Y2 specific)
    if (tens_from_any && step === 10) {
        return randomInt(tens_range[0], tens_range[1]);
    }

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

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction, level) {
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
            module: 'N01_Y2_NPV',
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
            module: 'N01_Y2_NPV',
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
            hint: `Count ${direction} in ${step}s`,
            module: 'N01_Y2_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y2_NPV',
    generate: generateQuestion
};

```

---
### `src\generators\N01_Y3_NPV_counting.js`
**Type:** js

```js
/**
 * Year 3 Counting from 0 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y3_NPV - "Count from 0 in multiples of 4, 8, 50 and 100"
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

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction, level) {
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
            module: 'N01_Y3_NPV',
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
            module: 'N01_Y3_NPV',
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
            hint: `Count ${direction} in ${step}s`,
            module: 'N01_Y3_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};

```

---
### `src\generators\N01_Y4_NPV_counting.js`
**Type:** js

```js
/**
 * Year 4 Count in Multiples Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y4_NPV - "Count in multiples of 6, 7, 9, 25 and 1000"
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

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction, level) {
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
            module: 'N01_Y4_NPV',
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
            module: 'N01_Y4_NPV',
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
            hint: `Count ${direction} in ${step}s`,
            module: 'N01_Y4_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y4_NPV',
    generate: generateQuestion
};

```

---
### `src\generators\N01_Y5_NPV_counting.js`
**Type:** js

```js
/**
 * Year 5 Count Forwards and Backwards Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y5_NPV - "Count forwards and backwards with positive and negative whole numbers, including through zero"
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
 * Y5 specific: Uses start_range instead of calculating from min/max
 */
function getStartValue(params, step) {
    const { start_from, start_range } = params;

    if (start_from === 'zero_only') {
        return 0;
    } else {
        // For Y5, use the start_range parameter
        return randomInt(start_range[0], start_range[1]);
    }
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
    // Y5 uses powers_of_10 instead of step_sizes
    const step = randomChoice(params.powers_of_10);
    const direction = randomChoice(params.directions);
    const { sequence_length, gaps_count, gap_position, min_value, max_value } = params;

    // Get starting value (uses start_range for Y5)
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

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction, level) {
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
            module: 'N01_Y5_NPV',
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
            module: 'N01_Y5_NPV',
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
            hint: `Count ${direction} in ${step}s`,
            module: 'N01_Y5_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y5_NPV',
    generate: generateQuestion
};

```

---
### `src\ui\app.js`
**Type:** js

```js
/**
 * Simplified Question Generator App
 *
 * Simple interface to generate and display questions from all difficulty levels
 */

import { MODULES } from '../curriculum/parameters.js';
import questionEngine from '../core/questionEngine.js';
import validator from '../core/validator.js';

class App {
    constructor() {
        this.currentModule = null;
        this.questions = [];
        this.questionCount = 5;
    }

    init() {
        this.renderModules();
        this.attachEventListeners();
    }

    /**
     * Render module cards
     */
    renderModules() {
        const modulesGrid = document.querySelector('.modules-grid');

        modulesGrid.innerHTML = Object.values(MODULES).map(module => `
            <div class="module-card" data-module-id="${module.id}">
                <div class="module-icon">${module.icon}</div>
                <h3>${module.name}</h3>
                <p class="module-year">${module.yearGroup}</p>
                <p class="module-desc">${module.description}</p>
            </div>
        `).join('');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Module selection
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const moduleId = card.dataset.moduleId;
                this.selectModule(moduleId);
            });
        });

        // Question count input
        document.getElementById('questionCount').addEventListener('change', (e) => {
            this.questionCount = parseInt(e.target.value);
        });

        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showSection('setup');
        });

        // Submit button
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.submitAnswers();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetAnswers();
        });

        // New quiz button
        document.getElementById('newQuizBtn').addEventListener('click', () => {
            this.showSection('setup');
        });
    }

    /**
     * Select a module and generate questions
     */
    selectModule(moduleId) {
        this.currentModule = MODULES[moduleId];
        this.generateQuestions(moduleId);
        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for all 4 difficulty levels
     */
    generateQuestions(moduleId) {
        this.questions = [];

        // Generate questions for each level (1-4)
        for (let level = 1; level <= 4; level++) {
            const levelQuestions = questionEngine.generate(moduleId, level, this.questionCount);
            this.questions.push({
                level: level,
                levelName: this.getLevelName(level),
                questions: levelQuestions
            });
        }
    }

    /**
     * Get level name
     */
    getLevelName(level) {
        const names = {
            1: 'Beginning',
            2: 'Developing',
            3: 'Meeting',
            4: 'Exceeding'
        };
        return names[level];
    }

    /**
     * Render questions grouped by level
     */
    renderQuestions() {
        const container = document.getElementById('questionsContainer');
        const moduleTitle = document.getElementById('moduleTitle');

        moduleTitle.textContent = `${this.currentModule.icon} ${this.currentModule.name}`;

        container.innerHTML = this.questions.map((levelGroup, levelIdx) => `
            <div class="level-section">
                <h3 class="level-title">Level ${levelGroup.level}: ${levelGroup.levelName}</h3>
                <div class="questions-list">
                    ${levelGroup.questions.map((q, qIdx) => this.renderQuestion(q, levelIdx, qIdx)).join('')}
                </div>
            </div>
        `).join('');
    }

    /**
     * Render a single question
     */
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
            // Check if multi-gap question
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
                // Single input
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

    /**
     * Submit and check all answers
     */
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
                    // Check for multi-gap inputs
                    const multiGaps = questionElement.querySelectorAll('.text-input.multi-gap');
                    if (multiGaps.length > 0) {
                        // Collect all gap answers and join with comma
                        const gapAnswers = Array.from(multiGaps).map(input => input.value.trim());
                        userAnswer = gapAnswers.join(',');
                    } else {
                        // Single input
                        const inputElement = document.getElementById(questionId);
                        userAnswer = inputElement ? inputElement.value.trim() : '';
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

    /**
     * Show results summary
     */
    showResults(correct, total) {
        const percentage = Math.round((correct / total) * 100);
        const resultsContainer = document.getElementById('resultsContainer');

        resultsContainer.innerHTML = `
            <div class="results-summary">
                <div class="score-display">
                    <div class="score-value">${correct} / ${total}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <div class="score-breakdown">
                    ${this.questions.map(levelGroup => {
                        const levelCorrect = this.getLevelScore(levelGroup);
                        const levelTotal = levelGroup.questions.length;
                        const levelPercentage = Math.round((levelCorrect / levelTotal) * 100);
                        return `
                            <div class="level-score">
                                <span class="level-name">Level ${levelGroup.level} (${levelGroup.levelName})</span>
                                <span class="level-result">${levelCorrect}/${levelTotal} (${levelPercentage}%)</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        this.showSection('results');
    }

    /**
     * Get score for a specific level
     */
    getLevelScore(levelGroup) {
        let correct = 0;
        const levelIdx = levelGroup.level - 1;

        levelGroup.questions.forEach((question, qIdx) => {
            const questionId = `q_${levelIdx}_${qIdx}`;
            const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);

            if (questionElement && questionElement.classList.contains('correct')) {
                correct++;
            }
        });

        return correct;
    }

    /**
     * Reset all answers
     */
    resetAnswers() {
        // Clear all radio selections
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Clear all text inputs
        document.querySelectorAll('.text-input').forEach(input => {
            input.value = '';
        });

        // Remove feedback
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('correct', 'incorrect');
            q.querySelector('.feedback').innerHTML = '';
        });
    }

    /**
     * Show a specific section
     */
    showSection(sectionName) {
        const sections = ['setup', 'questions', 'results'];
        sections.forEach(name => {
            const section = document.getElementById(`${name}Section`);
            if (name === sectionName) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;

```

---
### `styles\main.css`
**Type:** css

```css
/**
 * Simplified Question Generator Styles
 */

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 2rem 1rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

/* Header */
header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 3px solid #667eea;
}

header h1 {
    font-size: 2.5rem;
    color: #667eea;
    margin-bottom: 0.5rem;
}

header p {
    color: #666;
    font-size: 1.1rem;
}

/* Sections */
.section {
    animation: fadeIn 0.3s ease-in;
}

.section.hidden {
    display: none;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Control Group */
.control-group {
    margin-bottom: 2rem;
    text-align: center;
}

.control-group label {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
}

.control-group input[type="number"] {
    width: 120px;
    padding: 0.75rem;
    font-size: 1.2rem;
    border: 2px solid #667eea;
    border-radius: 8px;
    text-align: center;
}

/* Module Cards */
.modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.module-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 3px solid transparent;
}

.module-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    border-color: #667eea;
}

.module-icon {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1rem;
}

.module-card h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 0.5rem;
    text-align: center;
}

.module-year {
    text-align: center;
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.module-desc {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
    line-height: 1.4;
}

/* Questions Section */
.questions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e0e0e0;
}

.questions-header h2 {
    font-size: 2rem;
    color: #667eea;
}

/* Level Sections */
.level-section {
    margin-bottom: 3rem;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
}

.level-title {
    font-size: 1.5rem;
    color: #764ba2;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #764ba2;
}

/* Questions */
.questions-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.question {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid #667eea;
    transition: all 0.3s ease;
}

.question.correct {
    border-left-color: #10b981;
    background: #f0fdf4;
}

.question.incorrect {
    border-left-color: #ef4444;
    background: #fef2f2;
}

.question-text {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #333;
}

/* Options for Multiple Choice */
.options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

.option {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
}

.option:hover {
    background: #e9ecef;
    border-color: #667eea;
}

.option input[type="radio"] {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.option span {
    font-size: 1rem;
}

/* Text Input */
.text-input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 2px solid #667eea;
    border-radius: 8px;
    margin-top: 0.5rem;
}

.text-input:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
}

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

/* Hint */
.hint {
    margin-top: 0.75rem;
    padding: 0.75rem;
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #856404;
}

/* Feedback */
.feedback {
    margin-top: 1rem;
    font-weight: 600;
}

.correct-mark {
    color: #10b981;
    font-size: 1.1rem;
}

.incorrect-mark {
    color: #ef4444;
    font-size: 1rem;
}

/* Actions */
.actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #e0e0e0;
}

/* Buttons */
.btn-primary,
.btn-secondary {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #5a6268;
}

/* Results Section */
.results-summary {
    text-align: center;
    padding: 2rem;
}

.score-display {
    margin-bottom: 2rem;
}

.score-value {
    font-size: 3rem;
    font-weight: bold;
    color: #667eea;
}

.score-percentage {
    font-size: 2rem;
    color: #764ba2;
    margin-top: 0.5rem;
}

.score-breakdown {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 2rem auto 0;
}

.level-score {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.level-name {
    font-weight: 600;
    color: #333;
}

.level-result {
    font-weight: 600;
    color: #667eea;
}

/* Responsive Design */
@media (max-width: 768px) {
    body {
        padding: 1rem 0.5rem;
    }

    .container {
        padding: 1.5rem;
    }

    header h1 {
        font-size: 2rem;
    }

    .modules-grid {
        grid-template-columns: 1fr;
    }

    .questions-header {
        flex-direction: column;
        gap: 1rem;
    }

    .actions {
        flex-direction: column;
    }

    .btn-primary,
    .btn-secondary {
        width: 100%;
    }
}

```
