/**
 * Consolidated Counting in Multiples Question Generator (All Years)
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Supports Years 1-5 with appropriate curriculum progression
 *
 * Schema v2.0 Compliant:
 * - questionTemplate with [placeholder] notation
 * - questionRendered with actual values
 * - Raw values in values object
 * - Metadata in valueMetadata object
 * - locale and universal flags
 *
 * Year 1: Count to/across 100, steps 1,2,5,10
 * Year 2: Count in steps of 2,3,5,10
 * Year 3: Count from 0 in multiples of 4,8,50,100
 * Year 4: Count in multiples of 6,7,9,25,1000
 * Year 5: Count in powers of 10 for any given number up to 1,000,000 (includes negatives)
 */

import {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

/**
 * Main generator function (used by all years)
 */
export function generateQuestion(params, level, moduleId) {
    // Year 5 uses powers_of_10 instead of step_sizes
    const step = randomChoice(params.powers_of_10 || params.step_sizes);
    const direction = randomChoice(params.directions);
    const { sequence_length, gap_position, min_value, max_value } = params;

    // Get starting value
    let start;
    if (params.start_range) {
        // Year 5 with explicit start_range (handles negatives)
        start = Math.floor(randomInt(params.start_range[0], params.start_range[1]) / step) * step;
    } else {
        start = getStartValue(params, step);
    }

    // Ensure sequence stays within bounds
    if (direction === 'forwards') {
        // For forwards: ensure start >= min_value AND end <= max_value
        const maxStart = max_value - (step * (sequence_length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min_value);
    } else {
        // For backwards: ensure start <= max_value AND end >= min_value
        const minStart = min_value + (step * (sequence_length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max_value);
    }

    // Generate full sequence
    let fullSequence = generateSequence(start, step, sequence_length, direction);

    // VALIDATION: Ensure ALL values in sequence are within [min_value, max_value]
    // This is critical for Year 5 which can include negative numbers
    const allValuesValid = fullSequence.every(val => val >= min_value && val <= max_value);

    if (!allValuesValid) {
        // If any value is out of bounds, adjust start more conservatively
        if (direction === 'forwards') {
            // For forwards, ensure we don't exceed max_value
            const safeMaxStart = max_value - (step * sequence_length);
            start = Math.max(min_value, Math.min(start, safeMaxStart));
        } else {
            // For backwards, ensure we don't go below min_value
            const safeMinStart = min_value + (step * sequence_length);
            start = Math.min(max_value, Math.max(start, safeMinStart));
        }
        // Regenerate with safer bounds
        fullSequence = generateSequence(start, step, sequence_length, direction);

        // Final validation - if still invalid, clamp to valid range
        fullSequence = fullSequence.map(val => Math.max(min_value, Math.min(val, max_value)));
    }

    // Get single gap position
    const gapIndex = getGapPosition(sequence_length, gap_position);
    const answer = fullSequence[gapIndex];

    // Create values object
    const values = { step, start };
    const valueMetadata = {
        step: { type: "number", prefix: "", suffix: "", decimals: 0 },
        start: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    // Add each number in sequence to values
    const templateParts = [];
    const displayParts = [];

    fullSequence.forEach((num, idx) => {
        if (idx === gapIndex) {
            templateParts.push('[unknown]');
            displayParts.push('___');
            values.unknown = num;
            valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };
        } else {
            const key = `num${idx + 1}`;
            templateParts.push(`[${key}]`);
            displayParts.push(num.toString());
            values[key] = num;
            valueMetadata[key] = { type: "number", prefix: "", suffix: "", decimals: 0 };
        }
    });

    return {
        questionTemplate: `What is the missing number? ${templateParts.join(', ')}`,
        questionRendered: `What is the missing number? ${displayParts.join(', ')}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate: `The pattern counts ${direction} in [step]s`,
        hintRendered: `The pattern counts ${direction} in ${step}s`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Factory function to create year-specific generators
 */
function createYearGenerator(moduleId) {
    return {
        moduleId: moduleId,
        generate: (params, level) => generateQuestion(params, level, moduleId)
    };
}

/**
 * Year-specific generator exports
 */
export const Y1_Generator = createYearGenerator('N01_Y1_NPV');
export const Y2_Generator = createYearGenerator('N01_Y2_NPV');
export const Y3_Generator = createYearGenerator('N01_Y3_NPV');
export const Y4_Generator = createYearGenerator('N01_Y4_NPV');
export const Y5_Generator = createYearGenerator('N01_Y5_NPV');

/**
 * Default export with all year generators
 */
export default {
    Y1: Y1_Generator,
    Y2: Y2_Generator,
    Y3: Y3_Generator,
    Y4: Y4_Generator,
    Y5: Y5_Generator
};
