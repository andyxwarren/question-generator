/**
 * Year 1 Counting in Multiples Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y1_NPV - "Count to and across 100, forwards and backwards"
 *
 * UPDATED: Now supports progressive sub-learning objectives:
 * Level 1: Count in 1s and 2s from 0-20
 * Level 2: Count in 1s, 2s, and 5s from 0-50 (any start)
 * Level 3: Count in 1s, 2s, 5s, and 10s from 0-100 (any start)
 * Level 4: Count in 1s, 2s, 3s, 5s, and 10s from 0-200 (any start)
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

    // Special handling for Level 1 (zero_or_twenty)
    // This provides structure for beginners: always start from 0 or 20
    if (params.start_from === 'zero_or_twenty') {
        if (direction === 'forwards') {
            start = 0;  // Always start from 0 for forwards
        } else {
            start = 20; // Always start from 20 for backwards
        }
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
        module: 'N01_Y1_NPV',
        level: level
    };
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateQuestion
};