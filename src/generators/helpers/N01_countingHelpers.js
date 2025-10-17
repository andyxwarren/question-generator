/**
 * Counting Helpers
 *
 * Shared utility functions for N01 question generators
 * (Counting in multiples)
 */

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get starting value based on start_from parameter
 * Handles all start_from modes: zero_only, zero_or_twenty, zero_or_multiple, any
 * Also handles Y5's start_range parameter
 */
export function getStartValue(params, step) {
    const { start_from, min_value, max_value, start_range } = params;

    if (start_from === 'zero_only') {
        return 0;
    } else if (start_from === 'zero_or_twenty') {
        // For Y1 Level 1 - will be adjusted by caller based on direction
        return 0;
    } else if (start_from === 'zero_or_multiple') {
        const multiples = [0, step, step * 2, step * 3, step * 4];
        return randomChoice(multiples.filter(m => m <= max_value / 2));
    } else if (start_from === 'any') {
        // For Y5, use start_range if provided
        if (start_range) {
            // Round to step multiple to ensure valid sequences
            return Math.floor(randomInt(start_range[0], start_range[1]) / step) * step;
        }
        // Otherwise calculate from min/max
        const range = max_value - min_value;
        const rawStart = min_value + randomInt(0, Math.floor(range / 2));
        return Math.floor(rawStart / step) * step;
    }

    return 0;
}

/**
 * Generate sequence array
 */
export function generateSequence(start, step, length, direction) {
    const sequence = [];
    const multiplier = direction === 'forwards' ? 1 : -1;

    for (let i = 0; i < length; i++) {
        sequence.push(start + (i * step * multiplier));
    }

    return sequence;
}

/**
 * Get gap positions for fill-in-the-blank questions
 */
export function getGapPositions(sequenceLength, gapsCount, gapPosition) {
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

export default {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPositions
};
