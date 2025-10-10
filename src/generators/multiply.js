/**
 * Multiplication Question Generator
 *
 * Generates multiplication and division questions
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
                { item: 'sweets', container: 'bags' },
                { item: 'pencils', container: 'boxes' },
                { item: 'apples', container: 'baskets' },
                { item: 'books', container: 'shelves' }
            ];
            const context = randomChoice(contexts);

            return {
                text: `${product} ${context.item} are shared equally into ${table} ${context.container}. How many ${context.item} in each ${context.container.slice(0, -1)}?`,
                type: 'text_input',
                answer: multiplier.toString(),
                module: 'multiply',
                level: level
            };
        } else {
            // Standard division
            return {
                text: `${product} ÷ ${table} = ?`,
                type: 'text_input',
                answer: multiplier.toString(),
                hint: `Think: ${table} times what equals ${product}?`,
                module: 'multiply',
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
            module: 'multiply',
            level: level
        };
    } else {
        // Multiplication
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'flowers', container: 'vases' },
                { item: 'cookies', container: 'boxes' },
                { item: 'students', container: 'groups' },
                { item: 'toys', container: 'bags' }
            ];
            const context = randomChoice(contexts);

            return {
                text: `There are ${multiplier} ${context.container} with ${table} ${context.item} in each. How many ${context.item} in total?`,
                type: 'text_input',
                answer: product.toString(),
                module: 'multiply',
                level: level
            };
        } else if (questionType === 'missing_factor') {
            // Missing factor: ? × table = product
            return {
                text: `? × ${table} = ${product}`,
                type: 'text_input',
                answer: multiplier.toString(),
                hint: `What times ${table} equals ${product}?`,
                module: 'multiply',
                level: level
            };
        } else {
            // Standard multiplication
            return {
                text: `${table} × ${multiplier} = ?`,
                type: 'text_input',
                answer: product.toString(),
                module: 'multiply',
                level: level
            };
        }
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'multiply',
    generate: generateMultiplyQuestion
};
