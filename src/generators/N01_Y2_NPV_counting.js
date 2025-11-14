/**
 * Year 2 Counting in Steps Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y2_NPV - "Count in steps of 2, 3, and 5 from 0, and in tens from any number"
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
    const { sequence_length, gaps_count, gap_position, min_value, max_value, tens_from_any, tens_range } = params;

    // Choose question type FIRST (before generating sequence)
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

    // Get starting value with Y2-specific logic
    // Curriculum: "Count in steps of 2, 3, and 5 from 0, and in tens from any number"
    let start;

    if (step === 10 && tens_from_any) {
        // Tens from any number - allow any starting position within range
        start = randomInt(tens_range[0], tens_range[1]);
    } else {
        // Steps of 2, 3, 5 should start from 0 or multiples
        // Override start_from to ensure proper behavior
        const modifiedParams = {
            ...params,
            start_from: params.start_from === 'zero_only' ? 'zero_only' : 'zero_or_multiple'
        };
        start = getStartValue(modifiedParams, step);
    }

    // Vary starting value by question type to prevent sequence overlap
    if (questionType === 'fill_blanks') {
        // Force even multiples of step
        start = Math.floor(start / (step * 2)) * (step * 2);
    } else if (questionType === 'next_number') {
        // Force odd multiples of step
        start = Math.floor(start / (step * 2)) * (step * 2) + step;
    }
    // multiple_choice keeps original start (any value)

    // Ensure sequence stays within bounds
    if (direction === 'forwards') {
        // For forwards: ensure start >= min_value AND end <= max_value
        const maxStart = max_value - (step * (sequence_length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min_value);  // NEW: Also enforce minimum
    } else {
        // For backwards: ensure start <= max_value AND end >= min_value
        const minStart = min_value + (step * (sequence_length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max_value);  // NEW: Also enforce maximum
    }

    // Generate full sequence
    const fullSequence = generateSequence(start, step, sequence_length, direction);

    return generateQuestionByType(questionType, fullSequence, params, step, direction, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, direction, level) {
    const { gaps_count, gap_position, sequence_length } = params;

    if (type === 'fill_blanks') {
        // Force internal gaps - never at the end to avoid duplication with 'next_number' type
        let effectiveGapPosition = gap_position;
        if (gap_position === 'end') {
            effectiveGapPosition = 'middle';
        }

        // Get positions for blanks
        let gapPositions = getGapPositions(sequence_length, gaps_count, effectiveGapPosition);

        // Additional safeguard: if any gap ended up at the last position, move it to middle
        gapPositions = gapPositions.map(pos =>
            pos === sequence_length - 1 ? Math.floor(sequence_length / 2) : pos
        );

        // Get final gap position (last in array)
        const finalGapPosition = gapPositions[gapPositions.length - 1];
        const finalAnswer = fullSequence[finalGapPosition];

        // Create display sequence with visual distinction for final gap
        const displaySequence = fullSequence.map((num, idx) => {
            if (idx === finalGapPosition) return '<span class="gap-final">[?]</span>';
            if (gapPositions.includes(idx)) return '<span class="gap-other">__</span>';
            return num.toString();
        });

        return {
            text: `Fill in the <strong>final</strong> missing number: ${displaySequence.join(', ')}`,
            type: 'text_input',
            answer: finalAnswer.toString(),  // Single answer only
            hint: `The pattern counts ${direction} in ${step}s`,
            module: 'N01_Y2_NPV',
            level: level
        };
    }

    if (type === 'next_number') {
        // Show first N-1 numbers, ask for last
        const shown = fullSequence.slice(0, -1);
        const answer = fullSequence[fullSequence.length - 1];

        return {
            text: `What number comes next? ${shown.join(', ')}, ___`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Count ${direction} in ${step}s`,
            module: 'N01_Y2_NPV',
            level: level
        };
    }

    if (type === 'multiple_choice') {
        // Show all but last, create options
        const shown = fullSequence.slice(0, -1);
        const correctAnswer = fullSequence[fullSequence.length - 1];

        // Generate plausible distractors
        const distractors = [
            correctAnswer + step,      // One step too far
            correctAnswer - step,      // One step back
            correctAnswer + 1,         // Off by one
            correctAnswer - 1          // Off by one other direction
        ];

        // Select 3 unique distractors
        const uniqueDistractors = [...new Set(distractors)]
            .filter(d => d !== correctAnswer)
            .slice(0, 3);

        // Create options and shuffle
        const options = [correctAnswer, ...uniqueDistractors]
            .sort(() => Math.random() - 0.5);

        return {
            text: `Continue the pattern: ${shown.join(', ')}, ___`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Count ${direction} in ${step}s`,
            module: 'N01_Y2_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y2_NPV',
    generate: generateQuestion
};
