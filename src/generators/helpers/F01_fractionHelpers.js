/**
 * F01 Fraction Helper Functions
 *
 * Utilities for generating fraction questions
 * Supports i18n typed values for locale-aware rendering
 */

import {
    fraction as createFractionTyped,
    integer as createIntegerTyped,
    format as i18nFormat,
    getLocale,
    DEFAULT_LOCALE
} from '../../i18n/index.js';

/**
 * Select a random element from an array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Ensure a quantity is divisible by the denominator
 * If not divisible, adjusts to nearest divisible value within range
 */
export function ensureDivisible(quantity, denominator, min, max) {
    if (quantity % denominator === 0) {
        return quantity;
    }

    // Try rounding down
    const lower = Math.floor(quantity / denominator) * denominator;
    if (lower >= min) {
        return lower;
    }

    // Try rounding up
    const upper = Math.ceil(quantity / denominator) * denominator;
    if (upper <= max) {
        return upper;
    }

    // Fallback: find any divisible number in range
    for (let i = min; i <= max; i++) {
        if (i % denominator === 0) {
            return i;
        }
    }

    // Should never reach here if range is reasonable
    return denominator;
}

/**
 * Calculate the result of a fraction of a quantity
 */
export function calculateFraction(numerator, denominator, quantity) {
    return (quantity / denominator) * numerator;
}

/**
 * Convert fraction to word form using locale
 * @param {number} numerator - Numerator
 * @param {number} denominator - Denominator
 * @param {string} [locale=DEFAULT_LOCALE] - Locale for word formatting
 * @returns {string} Fraction in word form (e.g., "one half")
 */
export function fractionToWords(numerator, denominator, locale = DEFAULT_LOCALE) {
    // Use the i18n formatter with 'words' display hint
    const typed = createFractionTyped(numerator, denominator, 'words');
    return i18nFormat(typed, locale);
}

/**
 * Create a typed fraction value
 * @param {number} numerator - Numerator
 * @param {number} denominator - Denominator
 * @param {string} [displayAs='numeric'] - Display hint: 'numeric' (1/2), 'words' (one half)
 * @returns {object} Typed fraction value
 */
export function createFraction(numerator, denominator, displayAs = 'numeric') {
    return createFractionTyped(numerator, denominator, displayAs);
}

/**
 * Create a typed integer value
 * @param {number} value - Integer value
 * @param {string} [displayAs='plain'] - Display hint: 'plain' or 'ordinal'
 * @returns {object} Typed integer value
 */
export function createInteger(value, displayAs = 'plain') {
    return createIntegerTyped(value, displayAs);
}

/**
 * Format fraction as Unicode string
 */
export function formatFractionUnicode(numerator, denominator) {
    const unicodeFractions = {
        '1/2': '½',
        '1/3': '⅓',
        '1/4': '¼',
        '2/4': '²⁄₄',
        '3/4': '¾'
    };

    return unicodeFractions[`${numerator}/${denominator}`] || `${numerator}/${denominator}`;
}

/**
 * Generate a divisible quantity for a given fraction
 */
export function generateDivisibleQuantity(denominator, min, max) {
    // Find all multiples of denominator in range
    const multiples = [];
    for (let i = Math.ceil(min / denominator) * denominator; i <= max; i += denominator) {
        multiples.push(i);
    }

    if (multiples.length === 0) {
        // Fallback to denominator itself
        return denominator;
    }

    return randomChoice(multiples);
}

/**
 * Get word problem context
 */
export function getWordProblemContext(denominator, quantity, result) {
    const contexts = {
        2: [
            `There are ${quantity} apples. Half of them are red. How many apples are red?`,
            `A cake is cut into 2 equal pieces. If the whole cake serves ${quantity} people, how many people does each piece serve?`,
            `${quantity} children are playing. Half of them are girls. How many girls are there?`
        ],
        3: [
            `There are ${quantity} oranges. One third of them are in a bowl. How many oranges are in the bowl?`,
            `${quantity} pencils are shared equally among 3 children. How many pencils does each child get?`,
            `A ribbon is ${quantity} cm long. One third of it is cut off. How many cm were cut off?`
        ],
        4: [
            `There are ${quantity} sweets. One quarter of them are red. How many sweets are red?`,
            `A pizza is cut into 4 equal slices. If there are ${quantity} pieces of pepperoni in total, how many are on each slice?`,
            `${quantity} stickers are divided equally into 4 groups. How many stickers are in each group?`
        ]
    };

    const contextList = contexts[denominator] || contexts[2];
    return randomChoice(contextList);
}

/**
 * Check if two fractions are equivalent
 */
export function areEquivalent(num1, denom1, num2, denom2) {
    return (num1 * denom2) === (num2 * denom1);
}

/**
 * Get equivalent fraction for 2/4 = 1/2
 */
export function getEquivalentFraction(numerator, denominator) {
    if (numerator === 2 && denominator === 4) {
        return { numerator: 1, denominator: 2 };
    }
    return null;
}

/**
 * Generate a counting sequence in tenths
 * @param {number} start - Starting value (as decimal)
 * @param {number} length - Number of values in sequence
 * @param {string} direction - 'forwards' or 'backwards'
 * @returns {number[]} - Array of decimal values
 */
export function generateTenthsSequence(start, length, direction) {
    const sequence = [];
    let current = start;

    for (let i = 0; i < length; i++) {
        sequence.push(parseFloat(current.toFixed(1)));
        current = direction === 'forwards' ? current + 0.1 : current - 0.1;
    }

    return sequence;
}

/**
 * Format a decimal as a fraction (for tenths)
 * @param {number} decimal - Decimal value (e.g., 0.3)
 * @returns {string} - Fraction string (e.g., "3/10")
 */
export function decimalToTenthsFraction(decimal) {
    const numerator = Math.round(decimal * 10);
    return `${numerator}/10`;
}

/**
 * Generate a random start value for counting in tenths
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Start value (rounded to nearest tenth)
 */
export function randomTenthsStart(min, max) {
    const range = max - min;
    const random = Math.random() * range + min;
    return parseFloat((Math.floor(random * 10) / 10).toFixed(1));
}

/**
 * Get word problem context for discrete sets (Y3)
 */
export function getDiscreteSetContext(numerator, denominator, quantity, result) {
    const contexts = {
        2: [
            `There are ${quantity} marbles. ${numerator}/${denominator} of them are blue. How many marbles are blue?`,
            `A box contains ${quantity} pencils. ${numerator}/${denominator} of them are red. How many pencils are red?`
        ],
        3: [
            `${quantity} children are in a class. ${numerator}/${denominator} of them wear glasses. How many children wear glasses?`,
            `There are ${quantity} books on a shelf. ${numerator}/${denominator} of them are fiction. How many fiction books are there?`
        ],
        4: [
            `A bag has ${quantity} sweets. ${numerator}/${denominator} of them are strawberry flavoured. How many are strawberry?`,
            `${quantity} flowers are in a garden. ${numerator}/${denominator} of them are roses. How many roses are there?`
        ],
        5: [
            `There are ${quantity} apples. ${numerator}/${denominator} of them are green. How many apples are green?`,
            `A farm has ${quantity} animals. ${numerator}/${denominator} of them are sheep. How many sheep are there?`
        ],
        6: [
            `${quantity} crayons are in a box. ${numerator}/${denominator} of them are broken. How many crayons are broken?`,
            `There are ${quantity} students. ${numerator}/${denominator} of them walk to school. How many students walk to school?`
        ],
        8: [
            `A pizza has ${quantity} slices. ${numerator}/${denominator} of the slices have mushrooms. How many slices have mushrooms?`,
            `There are ${quantity} buttons. ${numerator}/${denominator} of them are round. How many buttons are round?`
        ],
        10: [
            `${quantity} cars are in a car park. ${numerator}/${denominator} of them are red. How many cars are red?`,
            `A shop has ${quantity} toys. ${numerator}/${denominator} of them are sold. How many toys are sold?`
        ]
    };

    const contextList = contexts[denominator] || contexts[10];
    return randomChoice(contextList);
}
