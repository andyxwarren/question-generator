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

    // Choose question type FIRST (before generating sequence)
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

    // Get starting value from any number within the valid range (0 to max_value)
    // Calculate a reasonable range within bounds
    const range = max_value - min_value;
    const rawStart = min_value + randomInt(0, Math.floor(range / 2));
    let start = Math.floor(rawStart / step) * step;

    // Vary starting value by question type to prevent sequence overlap
    if (questionType === 'fill_blanks') {
        // Force even multiples of step
        start = Math.floor(start / (step * 2)) * (step * 2);
    } else if (questionType === 'next_number') {
        // Force odd multiples of step
        start = Math.floor(start / (step * 2)) * (step * 2) + step;
    }
    // multiple_choice keeps original start (any value)

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
            questionType,
            validSequence.map(val => Math.max(min_value, Math.min(val, max_value))),
            params,
            step,
            direction,
            level
        );
    }

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
            return num.toLocaleString();
        });

        const hint = `The pattern counts ${direction} in ${step.toLocaleString()}s`;

        return {
            text: `Fill in the <strong>final</strong> missing number: ${displaySequence.join(', ')}`,
            type: 'text_input',
            answer: finalAnswer.toString(),  // Single answer only
            hint: hint,
            module: 'N01_Y5_NPV',
            level: level
        };
    }

    if (type === 'next_number') {
        // Show first N-1 numbers, ask for last
        const shown = fullSequence.slice(0, -1).map(n => n.toLocaleString());
        const answer = fullSequence[fullSequence.length - 1];

        const hint = `Count ${direction} in ${step.toLocaleString()}s`;

        return {
            text: `What number comes next? ${shown.join(', ')}, ___`,
            type: 'text_input',
            answer: answer.toString(),
            hint: hint,
            module: 'N01_Y5_NPV',
            level: level
        };
    }

    if (type === 'multiple_choice') {
        // Show all but last, create options
        const shown = fullSequence.slice(0, -1).map(n => n.toLocaleString());
        const correctAnswer = fullSequence[fullSequence.length - 1];

        // Get bounds from params object (passed through from generateQuestion)
        const { min_value, max_value } = params;

        // Generate plausible distractors that stay within curriculum bounds [0, 1,000,000]
        const potentialDistractors = [
            correctAnswer + step,        // One step too far
            correctAnswer - step,        // One step back
            correctAnswer + (step / 10), // Wrong power of 10
            correctAnswer - (step / 10)  // Wrong power of 10
        ];

        // Filter distractors to ensure ALL are within valid curriculum range
        const validDistractors = potentialDistractors.filter(d =>
            d >= min_value &&           // Not negative
            d <= max_value &&           // Not exceeding max (e.g., 1,000,000 for Y5)
            d !== correctAnswer         // Not same as correct answer
        );

        // If we don't have enough valid distractors, create alternative ones within bounds
        while (validDistractors.length < 3) {
            const offset = Math.floor(Math.random() * 3 + 1); // Random offset 1-3
            const candidate = direction === 'forwards'
                ? correctAnswer - (step * offset)
                : correctAnswer + (step * offset);

            if (candidate >= min_value &&
                candidate <= max_value &&
                !validDistractors.includes(candidate) &&
                candidate !== correctAnswer) {
                validDistractors.push(candidate);
            }
        }

        // Select 3 unique distractors
        const uniqueDistractors = [...new Set(validDistractors)]
            .slice(0, 3);

        // Create options and shuffle
        const options = [correctAnswer, ...uniqueDistractors]
            .sort(() => Math.random() - 0.5);

        const hint = `Count ${direction} in ${step.toLocaleString()}s`;

        return {
            text: `Continue the pattern: ${shown.join(', ')}, ___`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: hint,
            module: 'N01_Y5_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y5_NPV',
    generate: generateQuestion
};
