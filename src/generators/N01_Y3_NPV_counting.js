/**
 * Year 3 Counting from 0 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y3_NPV - "Count from 0 in multiples of 4, 8, 50 and 100"
 *
 * Level 1: Steps of 4, 8, 50 from 0, 4 numbers, gap at end
 * Level 2: Steps of 4, 8, 50, 100 from 0, 4 numbers, gap in middle
 * Level 3: All steps, 3 numbers, gap in middle
 * Level 4: All steps, 3 numbers, gap random
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // Extract parameters
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const { sequence_length, gap_position, min_value, max_value } = params;

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

    // Get single gap position
    const gapIndex = getGapPosition(sequence_length, gap_position);
    const answer = fullSequence[gapIndex];

    // Create display sequence
    const displaySequence = fullSequence.map((num, idx) =>
        idx === gapIndex ? '__' : num.toString()
    );

    return {
        text: `What is the missing number? ${displaySequence.join(', ')}`,
        type: 'text_input',
        answer: answer.toString(),
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
