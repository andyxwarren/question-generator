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

    // Choose question type FIRST (before generating sequence)
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

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
    } else {
        // Vary starting value by question type to prevent sequence overlap
        if (questionType === 'fill_blanks') {
            // Force even multiples of step
            start = Math.floor(start / (step * 2)) * (step * 2);
        } else if (questionType === 'next_number') {
            // Force odd multiples of step
            start = Math.floor(start / (step * 2)) * (step * 2) + step;
        }
        // multiple_choice keeps original start (any value)
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

        // Create display sequence with blanks
        const displaySequence = fullSequence.map((num, idx) =>
            gapPositions.includes(idx) ? '___' : num.toString()
        );

        // Collect answers
        const answers = gapPositions.map(pos => fullSequence[pos]);

        return {
            text: `Fill in the missing number${gaps_count > 1 ? 's' : ''}: ${displaySequence.join(', ')}`,
            type: 'text_input',
            answer: answers.join(','),  // Store as comma-separated
            answers: answers,  // Also store as array for validation
            hint: `The pattern counts ${direction} in ${step}s`,
            module: 'N01_Y1_NPV',
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
            module: 'N01_Y1_NPV',
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
            module: 'N01_Y1_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateQuestion
};