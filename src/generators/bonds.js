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
                { item: 'apples', action: 'gives away' },
                { item: 'sweets', action: 'eats' },
                { item: 'pencils', action: 'loses' },
                { item: 'stickers', action: 'gives to friends' }
            ];
            const context = randomChoice(contexts);

            return {
                text: `Sam has ${total} ${context.item}. He ${context.action} ${part1}. How many does he have left?`,
                type: 'text_input',
                answer: part2.toString(),
                module: 'bonds',
                level: level
            };
        } else {
            // Standard subtraction
            return {
                text: `${total} − ${part1} = ?`,
                type: 'text_input',
                answer: part2.toString(),
                hint: `Think: What number plus ${part1} makes ${total}?`,
                module: 'bonds',
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
            module: 'bonds',
            level: level
        };
    } else {
        // Addition (missing addend)
        if (questionType === 'word_problem') {
            const contexts = [
                { item: 'marbles', action: 'finds' },
                { item: 'coins', action: 'gets' },
                { item: 'toys', action: 'receives' },
                { item: 'books', action: 'buys' }
            ];
            const context = randomChoice(contexts);

            return {
                text: `Lucy has ${part1} ${context.item}. She ${context.action} some more. Now she has ${total}. How many did she ${context.action}?`,
                type: 'text_input',
                answer: part2.toString(),
                module: 'bonds',
                level: level
            };
        } else {
            // Standard missing addend
            return {
                text: `${part1} + ? = ${total}`,
                type: 'text_input',
                answer: part2.toString(),
                hint: `What number do you add to ${part1} to make ${total}?`,
                module: 'bonds',
                level: level
            };
        }
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'bonds',
    generate: generateBondsQuestion
};
