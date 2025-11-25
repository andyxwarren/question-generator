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
 * Get starting value based on start strategy
 * Updated for V2 Schema: Accepts explicit range object { min, max, strategy }
 * instead of a flat params object.
 */
export function getStartValue(config, step) {
    const { startStrategy, min, max } = config;

    if (startStrategy === 'zero_only') {
        return 0;
    } else if (startStrategy === 'zero_or_twenty') {
        // For Y1 Level 1
        return 0;
    } else if (startStrategy === 'zero_or_multiple') {
        const multiples = [0, step, step * 2, step * 3, step * 4];
        return randomChoice(multiples.filter(m => m <= max / 2));
    } else if (startStrategy === 'any') {
        // Calculate from min/max
        const range = max - min;
        const rawStart = min + randomInt(0, Math.floor(range / 2));
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
 * Get single gap position for fill-in-the-blank questions
 * Used by simplified N01 modules
 */
export function getGapPosition(sequenceLength, gapPosition) {
    if (gapPosition === 'end') {
        return sequenceLength - 1;
    } else if (gapPosition === 'start') {
        return 0;
    } else if (gapPosition === 'middle') {
        return Math.floor(sequenceLength / 2);
    } else if (gapPosition === 'random') {
        return randomInt(0, sequenceLength - 1);
    }
    return 0; // Default to start if unknown position
}

/**
 * Get multiple gap positions for fill-in-the-blank questions
 * Used by N05 modules and other generators that support multiple gaps
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
    getGapPosition,
    getGapPositions
};