/**
 * Year 2 Counting in Steps Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y2_NPV - "Count in steps of 2, 3, and 5 from 0, and in tens from any number"
 *
 * Level 1: Steps of 2, 3, 5 from 0, 4 numbers, gap at end
 * Level 2: Steps of 2, 3, 5, 10 (tens from any number), 4 numbers, gap in middle
 * Level 3: All steps, 3 numbers, gap in middle
 * Level 4: All steps, 3 numbers, gap random
 */

import {
    randomChoice,
    randomInt,
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
    const { sequence_length, gap_position, min_value, max_value, tens_from_any, tens_range } = params;

    // Get starting value with Y2-specific logic
    // Curriculum: "Count in steps of 2, 3, and 5 from 0, and in tens from any number"
    let start;

    if (step === 10 && tens_from_any) {
        // Tens from any number - allow any starting position within range
        start = randomInt(tens_range[0], tens_range[1]);
    } else {
        // Steps of 2, 3, 5 should start from 0 or multiples
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
        module: 'N01_Y2_NPV',
        level: level
    };
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y2_NPV',
    generate: generateQuestion
};
