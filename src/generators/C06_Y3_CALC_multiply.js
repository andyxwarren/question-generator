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
