/**
 * Fractions Question Generator
 *
 * Generates equivalent fractions questions
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
