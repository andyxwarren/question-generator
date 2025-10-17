/**
 * Year 4 Counting Through Zero Question Generator
 *
 * Generates counting backward through zero questions based on UK National Curriculum
 * Module: N05_Y4_NPV - "Count backwards through zero to include negative numbers"
 */

import {
    randomChoice,
    randomInt,
    generateSequence,
    getGapPositions
} from './helpers/N01_countingHelpers.js';

/**
 * Generate starting value for backward counting that ensures crossing zero
 */
function getPositiveStart(params, step) {
    const { sequence_length } = params;

    // Calculate minimum start needed to cross zero
    const minStart = step * Math.ceil(sequence_length / 2);

    // Generate a positive starting value that allows crossing zero
    // Start should be high enough that we cross zero but not exceed max_value
    const maxPossibleStart = Math.min(params.max_value, step * sequence_length);

    return randomInt(minStart, maxPossibleStart);
}

/**
 * Check if sequence crosses zero (has both positive and negative numbers)
 */
function sequenceCrossesZero(sequence) {
    const hasPositive = sequence.some(n => n > 0);
    const hasNegative = sequence.some(n => n < 0);
    return hasPositive && hasNegative;
}

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const direction = 'backwards'; // Y4 only counts backwards
    const { sequence_length, gaps_count, gap_position, min_value } = params;

    // Choose question type
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

    // Get starting value that ensures crossing zero
    let start = getPositiveStart(params, step);

    // Adjust start based on question type to create variation
    if (questionType === 'fill_blanks') {
        start = Math.floor(start / (step * 2)) * (step * 2);
    } else if (questionType === 'next_number') {
        start = Math.floor(start / (step * 2)) * (step * 2) + step;
    }

    // Ensure sequence stays within bounds (particularly the min_value)
    const minPossibleStart = Math.abs(min_value) + (step * (sequence_length - 1));
    start = Math.max(start, minPossibleStart);

    // Generate full sequence
    const fullSequence = generateSequence(start, step, sequence_length, direction);

    // Verify it crosses zero (required for Y4)
    if (!sequenceCrossesZero(fullSequence)) {
        // Force crossing by adjusting start upward
        start = step * Math.ceil(sequence_length / 2) + step;
        const retrySequence = generateSequence(start, step, sequence_length, direction);
        return generateQuestionByType(questionType, retrySequence, params, step, level);
    }

    return generateQuestionByType(questionType, fullSequence, params, step, level);
}

/**
 * Generate specific question type
 */
function generateQuestionByType(type, fullSequence, params, step, level) {
    const { gaps_count, gap_position, sequence_length } = params;

    if (type === 'fill_blanks') {
        // Force internal gaps - never at the end
        let effectiveGapPosition = gap_position;
        if (gap_position === 'end') {
            effectiveGapPosition = 'middle';
        }

        // Get positions for blanks
        let gapPositions = getGapPositions(sequence_length, gaps_count, effectiveGapPosition);

        // Ensure gaps don't appear at the last position
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
            answer: answers.join(','),
            answers: answers,
            hint: `Count backwards in ${step}s through zero`,
            module: 'N05_Y4_NPV',
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
            hint: `Count backwards in ${step}s (the sequence goes through zero into negative numbers)`,
            module: 'N05_Y4_NPV',
            level: level
        };
    }

    if (type === 'multiple_choice') {
        // Show all but last, create options
        const shown = fullSequence.slice(0, -1);
        const correctAnswer = fullSequence[fullSequence.length - 1];

        // Generate plausible distractors
        const distractors = [
            correctAnswer - step,      // One step further back
            correctAnswer + step,      // One step forward (wrong direction)
            Math.abs(correctAnswer),   // Absolute value (common error)
            -Math.abs(correctAnswer) - 1  // Off by one in negatives
        ];

        // Select 3 unique distractors different from correct answer
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
            hint: `Count backwards in ${step}s (remember to continue through zero)`,
            module: 'N05_Y4_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N05_Y4_NPV',
    generate: generateQuestion
};
