# 🧾 Codebase Export
_Generated on 13/10/2025, 09:56:29_

**Total files included:** 10

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
import countingGenerator from '../generators/N01_Y1_NPV_counting.js';
import bondsGenerator from '../generators/C01_Y1_CALC_bonds.js';
import multiplyGenerator from '../generators/C06_Y3_CALC_multiply.js';
import fractionsGenerator from '../generators/F02_Y4_FRAC_fractions.js';

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
        this.register(countingGenerator);
        this.register(bondsGenerator);
        this.register(multiplyGenerator);
        this.register(fractionsGenerator);
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
 * Defines all curriculum modules with parameters for 4 difficulty levels:
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
        name: 'Counting',
        description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
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
            },
            step_sizes: {
                1: [1, 2, 5, 10],
                2: [1, 2, 5, 10],
                3: [1, 2, 5, 10],
                4: [1, 2, 3, 5, 10]
            },
            sequence_length: {
                1: 5,
                2: 10,
                3: 15,
                4: 20
            },
            directions: {
                1: ['forwards'],
                2: ['forwards', 'backwards'],
                3: ['forwards', 'backwards'],
                4: ['forwards', 'backwards']
            },
            missing_numbers: {
                1: 0,
                2: 1,
                3: 2,
                4: 3
            }
        }
    },

    'C01_Y1_CALC': {
        id: 'C01_Y1_CALC',
        name: 'Number Bonds',
        description: 'Represent and use number bonds and related subtraction facts within 20',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Calculations',
        substrand: 'Add/subtract mentally',
        ref: 'C1',
        parameters: {
            total_value: {
                1: [5, 10],
                2: [10],
                3: [10, 20],
                4: [20]
            },
            missing_part: {
                1: 'second',  // Only second addend missing
                2: 'either',  // Either addend can be missing
                3: 'either',
                4: 'any'      // Total or any part can be missing
            },
            include_subtraction: {
                1: false,
                2: true,
                3: true,
                4: true
            },
            visual_support: {
                1: 'always',
                2: 'often',
                3: 'sometimes',
                4: 'rarely'
            },
            time_limit: {
                1: 15,
                2: 10,
                3: 5,
                4: 3
            },
            questions_per_session: {
                1: 5,
                2: 8,
                3: 10,
                4: 15
            }
        }
    },

    'N03_Y2_NPV': {
        id: 'N03_Y2_NPV',
        name: 'Place Value',
        description: 'Recognise the place value of each digit in a two-digit number (tens, ones)',
        icon: '🔟',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Place value',
        ref: 'N3',
        parameters: {
            min_number: {
                1: 10,
                2: 10,
                3: 10,
                4: 10
            },
            max_number: {
                1: 50,
                2: 75,
                3: 99,
                4: 999
            },
            include_zero_placeholder: {
                1: false,
                2: true,
                3: true,
                4: true
            }
        }
    },

    'C06_Y3_CALC': {
        id: 'C06_Y3_CALC',
        name: 'Multiplication',
        description: 'Recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Calculations',
        substrand: 'Recall multiplication facts',
        ref: 'C2',
        parameters: {
            times_tables: {
                1: [2, 5, 10],
                2: [2, 3, 4, 5, 10],
                3: [3, 4, 8],
                4: [3, 4, 6, 7, 8, 9]
            },
            max_multiplier: {
                1: 5,
                2: 10,
                3: 12,
                4: 12
            },
            include_division: {
                1: false,
                2: true,
                3: true,
                4: true
            },
            time_limit_seconds: {
                1: 8,
                2: 5,
                3: 3,
                4: 2
            },
            accuracy_target: {
                1: 0.70,
                2: 0.80,
                3: 0.90,
                4: 0.95
            }
        }
    },

    'F02_Y4_FRAC': {
        id: 'F02_Y4_FRAC',
        name: 'Fractions',
        description: 'Recognise and show, using diagrams, families of common equivalent fractions',
        icon: '🍰',
        yearGroup: 'Year 4',
        strand: 'Fractions, Decimals and Percentages',
        substrand: 'Equivalent fractions',
        ref: 'F1',
        parameters: {
            denominators: {
                1: [2, 4, 10],
                2: [2, 3, 4, 5, 10],
                3: [2, 3, 4, 5, 6, 8, 10, 12],
                4: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
            },
            max_numerator: {
                1: 3,
                2: 5,
                3: 8,
                4: 10
            },
            equivalences_to_find: {
                1: 2,
                2: 3,
                3: 4,
                4: 5
            },
            simplification_required: {
                1: false,
                2: false,
                3: true,
                4: true
            },
            visual_support: {
                1: 'always',
                2: 'often',
                3: 'sometimes',
                4: 'rarely'
            }
        }
    },

    'F08_Y5_FRAC': {
        id: 'F08_Y5_FRAC',
        name: 'Decimals',
        description: 'Read, write, order and compare numbers with up to three decimal places',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Fractions, Decimals and Percentages',
        substrand: 'Decimal place value',
        ref: 'F2',
        parameters: {
            decimal_places: {
                1: 1,
                2: 2,
                3: 3,
                4: 3
            },
            integer_range: {
                1: [0, 10],
                2: [0, 100],
                3: [0, 1000],
                4: [0, 10000]
            },
            number_count: {
                1: 2,
                2: 3,
                3: 4,
                4: 5
            },
            include_trailing_zeros: {
                1: false,
                2: true,
                3: true,
                4: true
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
 * @returns {Object} Parameters object for the specified level
 */
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return {};

    const params = {};
    for (const [key, values] of Object.entries(module.parameters)) {
        params[key] = values[level];
    }
    return params;
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
### `src\generators\C01_Y1_CALC_bonds.js`
**Type:** js

```js
/**
 * Number Bonds Question Generator
 *
 * Generates addition and subtraction fact questions
 */

/**
 * Helper: Choose random item from array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Helper: Pluralize a noun based on count
 * @param {number} count - The count of items
 * @param {string} singular - The singular form of the noun
 * @param {string} [plural] - Optional custom plural form (defaults to adding 's')
 * @returns {string} The correctly pluralized noun
 */
function pluralize(count, singular, plural = null) {
    if (count === 1) {
        return singular;
    }
    return plural || (singular + 's');
}

/**
 * Helper: Get the correct verb form (handles third-person singular)
 * @param {string} verb - The base verb (e.g., 'find', 'receive', 'buy')
 * @param {boolean} thirdPersonSingular - Whether to use third-person singular form (e.g., 'finds')
 * @returns {string} The correctly conjugated verb
 */
function conjugateVerb(verb, thirdPersonSingular = false) {
    if (!thirdPersonSingular) {
        return verb;
    }

    // Handle common irregular verbs
    const irregulars = {
        'have': 'has',
        'do': 'does',
        'go': 'goes'
    };

    if (irregulars[verb]) {
        return irregulars[verb];
    }

    // Regular verbs: add 's' or 'es'
    if (verb.endsWith('s') || verb.endsWith('sh') || verb.endsWith('ch') ||
        verb.endsWith('x') || verb.endsWith('z')) {
        return verb + 'es';
    } else if (verb.endsWith('y') && !'aeiou'.includes(verb[verb.length - 2])) {
        // e.g., 'carry' -> 'carries'
        return verb.slice(0, -1) + 'ies';
    } else {
        return verb + 's';
    }
}

/**
 * Generate number bonds question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateBondsQuestion(params, level) {
    const total = randomChoice(params.total_value);
    const part1 = Math.floor(Math.random() * (total + 1));
    const part2 = total - part1;

    // Decide operation type
    const includeSubtraction = params.include_subtraction;
    const operations = includeSubtraction
        ? ['addition', 'subtraction', 'multiple_choice']
        : ['addition', 'multiple_choice'];
    const operation = randomChoice(operations);

    // Choose question format
    const questionTypes = ['standard', 'word_problem', 'missing_addend'];
    const questionType = randomChoice(questionTypes);

    if (operation === 'subtraction') {
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'apple', action: 'give away', actionPresent: 'gives away' },
                { item: 'sweet', action: 'eat', actionPresent: 'eats' },
                { item: 'pencil', action: 'lose', actionPresent: 'loses' },
                { item: 'sticker', action: 'give to friends', actionPresent: 'gives to friends' }
            ];
            const context = randomChoice(contexts);
            const itemText = pluralize(total, context.item);

            return {
                text: `Sam has ${total} ${itemText}. He ${context.actionPresent} ${part1}. How many does he have left?`,
                type: 'text_input',
                answer: part2.toString(),
                module: 'C01_Y1_CALC',
                level: level
            };
        } else {
            // Standard subtraction
            return {
                text: `${total} − ${part1} = ?`,
                type: 'text_input',
                answer: part2.toString(),
                hint: `Think: What number plus ${part1} makes ${total}?`,
                module: 'C01_Y1_CALC',
                level: level
            };
        }
    } else if (operation === 'multiple_choice') {
        // Multiple choice format
        const correctAnswer = part2;
        const options = shuffle([
            correctAnswer,
            correctAnswer + 1,
            correctAnswer - 1,
            total - part1 - 2
        ].filter(n => n >= 0 && n <= total));

        // Ensure we have 4 unique options
        while (options.length < 4) {
            const newOption = Math.floor(Math.random() * (total + 1));
            if (!options.includes(newOption)) {
                options.push(newOption);
            }
        }

        return {
            text: `${part1} + ? = ${total}`,
            type: 'multiple_choice',
            options: shuffle(options.slice(0, 4)),
            answer: correctAnswer.toString(),
            module: 'C01_Y1_CALC',
            level: level
        };
    } else {
        // Addition (missing addend)
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'marble', action: 'find', actionPresent: 'finds' },
                { item: 'coin', action: 'get', actionPresent: 'gets' },
                { item: 'toy', action: 'receive', actionPresent: 'receives' },
                { item: 'book', action: 'buy', actionPresent: 'buys' }
            ];
            const context = randomChoice(contexts);
            const itemText = pluralize(part1, context.item);

            return {
                text: `Lucy has ${part1} ${itemText}. She ${context.actionPresent} some more. Now she has ${total}. How many did she ${context.action}?`,
                type: 'text_input',
                answer: part2.toString(),
                module: 'C01_Y1_CALC',
                level: level
            };
        } else {
            // Standard missing addend
            return {
                text: `${part1} + ? = ${total}`,
                type: 'text_input',
                answer: part2.toString(),
                hint: `What number do you add to ${part1} to make ${total}?`,
                module: 'C01_Y1_CALC',
                level: level
            };
        }
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'C01_Y1_CALC',
    generate: generateBondsQuestion
};

```

---
### `src\generators\C06_Y3_CALC_multiply.js`
**Type:** js

```js
/**
 * Multiplication Question Generator
 *
 * Generates multiplication and division questions
 */

/**
 * Helper: Choose random item from array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Helper: Pluralize a noun based on count
 * @param {number} count - The count of items
 * @param {string} singular - The singular form of the noun
 * @param {string} [plural] - Optional custom plural form (defaults to adding 's')
 * @returns {string} The correctly pluralized noun
 */
function pluralize(count, singular, plural = null) {
    if (count === 1) {
        return singular;
    }
    return plural || (singular + 's');
}

/**
 * Generate multiplication question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateMultiplyQuestion(params, level) {
    const table = randomChoice(params.times_tables);
    const multiplier = Math.floor(Math.random() * params.max_multiplier) + 1;
    const product = table * multiplier;

    // Decide operation type
    const includeDivision = params.include_division;
    const operations = includeDivision
        ? ['multiplication', 'division', 'multiple_choice']
        : ['multiplication', 'multiple_choice'];
    const operation = randomChoice(operations);

    // Choose question format
    const questionTypes = ['standard', 'word_problem', 'missing_factor'];
    const questionType = randomChoice(questionTypes);

    if (operation === 'division') {
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'sweet', itemPlural: 'sweets', container: 'bag', containerPlural: 'bags' },
                { item: 'pencil', itemPlural: 'pencils', container: 'box', containerPlural: 'boxes' },
                { item: 'apple', itemPlural: 'apples', container: 'basket', containerPlural: 'baskets' },
                { item: 'book', itemPlural: 'books', container: 'shelf', containerPlural: 'shelves' }
            ];
            const context = randomChoice(contexts);
            const itemText = pluralize(product, context.item, context.itemPlural);
            const containerText = pluralize(table, context.container, context.containerPlural);
            const containerSingular = context.container;
            const verb = product === 1 ? 'is' : 'are';

            return {
                text: `${product} ${itemText} ${verb} shared equally into ${table} ${containerText}. How many ${itemText} in each ${containerSingular}?`,
                type: 'text_input',
                answer: multiplier.toString(),
                module: 'C06_Y3_CALC',
                level: level
            };
        } else {
            // Standard division
            return {
                text: `${product} ÷ ${table} = ?`,
                type: 'text_input',
                answer: multiplier.toString(),
                hint: `Think: ${table} times what equals ${product}?`,
                module: 'C06_Y3_CALC',
                level: level
            };
        }
    } else if (operation === 'multiple_choice') {
        // Multiple choice format
        const correctAnswer = product;
        const options = shuffle([
            correctAnswer,
            correctAnswer + table,
            correctAnswer - table,
            table + multiplier
        ]);

        return {
            text: `${table} × ${multiplier} = ?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'C06_Y3_CALC',
            level: level
        };
    } else {
        // Multiplication
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'flower', itemPlural: 'flowers', container: 'vase', containerPlural: 'vases' },
                { item: 'cookie', itemPlural: 'cookies', container: 'box', containerPlural: 'boxes' },
                { item: 'student', itemPlural: 'students', container: 'group', containerPlural: 'groups' },
                { item: 'toy', itemPlural: 'toys', container: 'bag', containerPlural: 'bags' }
            ];
            const context = randomChoice(contexts);
            const containerText = pluralize(multiplier, context.container, context.containerPlural);
            const itemText = pluralize(table, context.item, context.itemPlural);
            const itemTextAnswer = pluralize(product, context.item, context.itemPlural);
            const thereVerb = multiplier === 1 ? 'is' : 'are';

            return {
                text: `There ${thereVerb} ${multiplier} ${containerText} with ${table} ${itemText} in each. How many ${itemTextAnswer} in total?`,
                type: 'text_input',
                answer: product.toString(),
                module: 'C06_Y3_CALC',
                level: level
            };
        } else if (questionType === 'missing_factor') {
            // Missing factor: ? × table = product
            return {
                text: `? × ${table} = ${product}`,
                type: 'text_input',
                answer: multiplier.toString(),
                hint: `What times ${table} equals ${product}?`,
                module: 'C06_Y3_CALC',
                level: level
            };
        } else {
            // Standard multiplication
            return {
                text: `${table} × ${multiplier} = ?`,
                type: 'text_input',
                answer: product.toString(),
                module: 'C06_Y3_CALC',
                level: level
            };
        }
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'C06_Y3_CALC',
    generate: generateMultiplyQuestion
};

```

---
### `src\generators\F02_Y4_FRAC_fractions.js`
**Type:** js

```js
/**
 * Fractions Question Generator
 *
 * Generates equivalent fractions questions
 */

/**
 * Helper: Choose random item from array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Helper: Find GCD for simplification
 */
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

/**
 * Helper: Simplify fraction
 */
function simplifyFraction(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
    };
}

/**
 * Generate fractions question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateFractionsQuestion(params, level) {
    const denom1 = randomChoice(params.denominators);
    const multiplier = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
    const denom2 = denom1 * multiplier;

    // Generate numerator (must be less than denominator for proper fractions)
    const maxNum = Math.min(denom1 - 1, params.max_numerator);
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = num1 * multiplier;

    // Choose question type
    const questionTypes = ['fill_blank', 'multiple_choice', 'identify_equivalent'];
    const type = randomChoice(questionTypes);

    if (type === 'multiple_choice') {
        // "Which fraction equals...?"
        const correctAnswer = `${num2}/${denom2}`;
        const options = shuffle([
            `${num2}/${denom2}`,
            `${num2 + 1}/${denom2}`,
            `${num2}/${denom2 + denom1}`,
            `${num1}/${denom2}`
        ]);

        return {
            text: `Which fraction equals ${num1}/${denom1}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            module: 'F02_Y4_FRAC',
            level: level
        };
    } else if (type === 'identify_equivalent') {
        // Show multiple fractions, identify which is equivalent
        const correctAnswer = `${num2}/${denom2}`;
        const otherFractions = [
            `${num1 + 1}/${denom1}`,
            `${num2}/${denom2 + 1}`,
            `${num1}/${denom1 * 2}`
        ];
        const options = shuffle([correctAnswer, ...otherFractions.slice(0, 3)]);

        return {
            text: `Which of these is equivalent to ${num1}/${denom1}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            module: 'F02_Y4_FRAC',
            level: level
        };
    } else {
        // fill_blank: a/b = ?/c format
        return {
            text: `${num1}/${denom1} = ?/${denom2}`,
            type: 'text_input',
            answer: num2.toString(),
            hint: `Type just the numerator (top number). The denominator is ${denom2}.`,
            module: 'F02_Y4_FRAC',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'F02_Y4_FRAC',
    generate: generateFractionsQuestion
};

```

---
### `src\generators\N01_Y1_NPV_counting.js`
**Type:** js

```js
/**
 * Counting Question Generator
 *
 * Generates questions for counting sequences and patterns
 */

/**
 * Helper: Choose random item from array
 * @param {Array} array - Array to choose from
 * @returns {*} Random item
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled copy
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Generate counting sequence question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateCountingQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const maxVal = params.max_value;

    // Generate starting value
    let start = Math.floor(Math.random() * (maxVal / 2));
    start = Math.floor(start / step) * step;

    // Ensure sequence doesn't go negative for backwards counting
    if (direction === 'backwards' && start < step * 6) {
        start = step * 6;
    }

    // Generate sequence
    const sequenceLength = 6;
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        const value = direction === 'forwards'
            ? start + (i * step)
            : start - (i * step);
        sequence.push(value);
    }

    // Choose question type
    const questionTypes = ['fill_blank', 'multiple_choice', 'next_number'];
    const type = randomChoice(questionTypes);

    if (type === 'multiple_choice') {
        // "What comes next?"
        const correctAnswer = sequence[4];
        const options = shuffle([
            correctAnswer,
            correctAnswer + step,
            correctAnswer - step,
            correctAnswer + (2 * step)
        ]);

        return {
            text: `What comes next? ${sequence.slice(0, 4).join(', ')}, ...`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'N01_Y1_NPV',
            level: level
        };
    } else if (type === 'next_number') {
        // Similar to multiple choice but asking for next number explicitly
        const correctAnswer = sequence[4];
        const options = shuffle([
            correctAnswer,
            correctAnswer + step,
            correctAnswer - step,
            correctAnswer + step + 1
        ]);

        return {
            text: `Continue the pattern: ${sequence.slice(0, 4).join(', ')}, ?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'N01_Y1_NPV',
            level: level
        };
    } else {
        // fill_blank: Show sequence with gap in the middle
        const display = [...sequence.slice(0, 5)];
        const gapIndex = 2 + Math.floor(Math.random() * 2); // Gap at position 2 or 3
        const correctAnswer = display[gapIndex];
        display[gapIndex] = '___';

        return {
            text: `Fill in the missing number: ${display.join(', ')}`,
            type: 'text_input',
            answer: correctAnswer.toString(),
            hint: `The pattern counts ${direction} in ${step}s`,
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
    generate: generateCountingQuestion
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

import { MODULES } from '../curriculum/modules.js';
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
                    userAnswer = document.getElementById(questionId).value.trim();
                }

                // Validate answer
                const isCorrect = validator.validate(userAnswer, question.answer, question.type);
                totalQuestions++;
                if (isCorrect) totalCorrect++;

                // Show feedback
                questionElement.classList.remove('correct', 'incorrect');
                if (userAnswer) {
                    questionElement.classList.add(isCorrect ? 'correct' : 'incorrect');
                    feedbackElement.innerHTML = isCorrect
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
