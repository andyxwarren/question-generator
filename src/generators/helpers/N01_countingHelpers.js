/**
 * Helper functions for N01 Counting modules
 *
 * Supports sequence generation, gap positioning, and start value strategies
 * Supports i18n typed values for locale-aware rendering
 */

import {
    integer as createIntegerTyped,
    decimal as createDecimalTyped,
    format as i18nFormat,
    DEFAULT_LOCALE
} from '../../i18n/index.js';

/**
 * Create a typed integer value
 * @param {number} value - Integer value
 * @param {string} [displayAs='plain'] - Display hint
 * @returns {object} Typed value
 */
export function createInteger(value, displayAs = 'plain') {
    return createIntegerTyped(value, displayAs);
}

/**
 * Create a typed decimal value
 * @param {number} value - Decimal value
 * @param {string} [displayAs='plain'] - Display hint
 * @returns {object} Typed value
 */
export function createDecimal(value, displayAs = 'plain') {
    return createDecimalTyped(value, displayAs);
}

/**
 * Create typed sequence values array
 * @param {number[]} sequence - Array of numbers
 * @param {number[]} gapIndices - Indices where gaps are
 * @returns {object[]} Array of typed values with nulls at gap positions
 */
export function createTypedSequence(sequence, gapIndices) {
    return sequence.map((num, idx) => {
        if (gapIndices.includes(idx)) {
            return null;
        }
        return Number.isInteger(num) ? createIntegerTyped(num) : createDecimalTyped(num);
    });
}

/**
 * Get start value based on strategy
 * @param {Object} config - Configuration object
 * @param {string} config.startStrategy - Strategy: 'zero_only', 'zero_or_one', 'any_multiple', 'zero_or_tens', 'zero_or_any_tens', 'any'
 * @param {number} config.min - Minimum range value
 * @param {number} config.max - Maximum range value
 * @param {number} step - The step size for counting
 * @returns {number} Start value
 */
export function getStartValue({ startStrategy, min, max }, step) {
    switch (startStrategy) {
        case 'zero_only':
            return 0;

        case 'zero_or_one':
            return randomChoice([0, 1]);

        case 'any_multiple': {
            // Get all valid multiples of step within range
            const multiples = [];
            for (let i = min; i <= max; i += step) {
                multiples.push(i);
            }
            return randomChoice(multiples);
        }

        case 'zero_or_tens': {
            // For step=10, allow any multiple of 10; for other steps, start from 0
            if (step === 10) {
                const multiples = [];
                for (let i = 0; i <= max; i += 10) {
                    multiples.push(i);
                }
                return randomChoice(multiples);
            }
            return 0;
        }

        case 'zero_or_any_tens': {
            // For step=10, allow any number; for other steps (2,3,5), start from 0
            if (step === 10) {
                return randomInt(min, max);
            }
            return 0;
        }

        case 'any': {
            // Any number within range (not necessarily a multiple)
            // For large ranges, sample reasonably
            const range = max - min;
            if (range > 1000) {
                // For large ranges, generate a random number that allows for a complete sequence
                const maxStart = max - (step * 5); // Ensure room for sequence
                return randomInt(min, Math.max(min, maxStart));
            } else {
                return randomInt(min, max);
            }
        }

        default:
            return 0;
    }
}

/**
 * Generate a counting sequence
 * @param {number} start - Starting value
 * @param {number} step - Step size
 * @param {number} length - Number of elements in sequence
 * @param {string} direction - 'forwards' or 'backwards'
 * @returns {number[]} Array of numbers in sequence
 */
export function generateSequence(start, step, length, direction) {
    const sequence = [];
    const increment = direction === 'backwards' ? -step : step;

    for (let i = 0; i < length; i++) {
        sequence.push(start + (i * increment));
    }

    return sequence;
}

/**
 * Get gap position index based on position strategy
 * @param {number} length - Sequence length
 * @param {string} position - Position strategy: 'end', 'middle', 'random'
 * @returns {number} 0-indexed position for the gap
 */
export function getGapPosition(length, position) {
    switch (position) {
        case 'end':
            return length - 1;

        case 'middle': {
            // For even length, prefer middle-left (e.g., length 4 -> index 1)
            // For odd length, use exact middle (e.g., length 5 -> index 2)
            return Math.floor((length - 1) / 2);
        }

        case 'random':
            // Random position except first (to avoid giving away the pattern)
            return randomInt(1, length - 1);

        default:
            return length - 1;
    }
}

/**
 * Get multiple gap positions for a sequence
 * @param {number} length - Sequence length
 * @param {number} count - Number of gaps needed
 * @param {string} position - Position strategy: 'end', 'middle', 'random'
 * @returns {number[]} Array of 0-indexed positions for the gaps
 */
export function getMultipleGapPositions(length, count, position) {
    if (count === 1) {
        return [getGapPosition(length, position)];
    }

    const positions = new Set();

    // Never put gap at index 0 (preserve pattern)
    while (positions.size < count && positions.size < length - 1) {
        const pos = randomInt(1, length - 1);
        positions.add(pos);
    }

    return Array.from(positions).sort((a, b) => a - b);
}

/**
 * Format sequence with gap for display
 * @param {number[]} sequence - Full sequence
 * @param {number|number[]} gapIndex - Index or array of indices for gap positions
 * @returns {string} Formatted string like "2, 4, __, 8"
 */
export function formatSequence(sequence, gapIndex) {
    const gapIndices = Array.isArray(gapIndex) ? gapIndex : [gapIndex];
    return sequence
        .map((num, idx) => gapIndices.includes(idx) ? '__' : num.toString())
        .join(', ');
}

/**
 * Select random element from array
 * @param {any[]} array - Array to select from
 * @returns {any} Random element
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random integer in range [min, max] inclusive
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
