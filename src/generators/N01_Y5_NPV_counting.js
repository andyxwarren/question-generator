/**
 * Year 5 Counting in Powers of 10 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y5_NPV - "count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000"
 */

import {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPositions
} from './helpers/N01_countingHelpers.js';

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // Y5 uses powers_of_10 instead of step_sizes
    const step = randomChoice(params.powers_of_10);
    const direction = randomChoice(params.directions);
    const { sequence_length, gaps_count, gap_position, min_value, max_value } = params;

    // Get starting value from any number within the valid range (0 to max_value)
    // Calculate a reasonable range within bounds
    const range = max_value - min_value;
    const rawStart = min_value + randomInt(0, Math.floor(range / 2));
    let start = Math.floor(rawStart / step) * step;

    // Ensure sequence stays within bounds (0 to max_value)
    // CRITICAL: Year 5 curriculum requires counting from ANY number UP TO 1,000,000
    // This means ALL values in the sequence must be in range [min_value, max_value]
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
    const fullSequence = generateSequence(start, step, sequence_length, direction);

    // VALIDATION: Ensure ALL values in sequence are within [min_value, max_value]
    // This prevents negative numbers and values exceeding 1,000,000
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
        const validSequence = generateSequence(start, step, sequence_length, direction);

        // Final validation - if still invalid, clamp to valid range
        return generateQuestionByType(
            validSequence.map(val => Math.max(min_value, Math.min(val, max_value))),
            params,
            step,
            direction,
            level
        );
    }

    return generateQuestionByType(fullSequence, params, step, direction, level);
}

/**
 * Generate fill-in-the-blanks question
 */
function generateQuestionByType(fullSequence, params, step, direction, level) {
    const { gaps_count, gap_position, sequence_length } = params;

    // Get positions for blanks (gaps can now be anywhere, including at the end)
    const gapPositions = getGapPositions(sequence_length, gaps_count, gap_position);

    // Get final gap position (chronologically last = highest index)
    const finalGapPosition = Math.max(...gapPositions);
    const finalAnswer = fullSequence[finalGapPosition];

    // Create display sequence with visual distinction for final gap
    const displaySequence = fullSequence.map((num, idx) => {
        if (idx === finalGapPosition) return '<span class="gap-final">[?]</span>';
        if (gapPositions.includes(idx)) return '<span class="gap-other">__</span>';
        return num.toLocaleString();
    });

    const hint = `The pattern counts ${direction} in ${step.toLocaleString()}s`;

    // Use different wording based on number of gaps
    const questionText = gaps_count === 1
        ? `Fill in the missing number: ${displaySequence.join(', ')}`
        : `Fill in the <strong class="final-emphasis">final</strong> missing number: ${displaySequence.join(', ')}`;

    return {
        text: questionText,
        type: 'text_input',
        answer: finalAnswer.toString(),  // Single answer only
        hint: hint,
        module: 'N01_Y5_NPV',
        level: level
    };
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y5_NPV',
    generate: generateQuestion
};
