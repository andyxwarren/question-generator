/**
 * Year 3 Counting from 0 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y3_NPV - "Count from 0 in multiples of 4, 8, 50 and 100"
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
    // Extract parameters
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const { sequence_length, gaps_count, gap_position, min_value, max_value } = params;

    // Get starting value
    let start = getStartValue(params, step);

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
    const fullSequence = generateSequence(start, step, sequence_length, direction);

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
        return num.toString();
    });

    // Use different wording based on number of gaps
    const questionText = gaps_count === 1
        ? `Fill in the missing number: ${displaySequence.join(', ')}`
        : `Fill in the <strong class="final-emphasis">final</strong> missing number: ${displaySequence.join(', ')}`;

    return {
        text: questionText,
        type: 'text_input',
        answer: finalAnswer.toString(),  // Single answer only
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y3_NPV',
        level: level
    };
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};
