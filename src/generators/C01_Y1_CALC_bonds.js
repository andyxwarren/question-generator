/**
 * Number Bonds Question Generator
 *
 * Generates addition and subtraction fact questions
 */

import { getParameters } from '../curriculum/modules.js';

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
