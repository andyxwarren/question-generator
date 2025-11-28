/**
 * N01_Y4_NPV: Counting in Multiples
 *
 * Year 4: Count in multiples of 6, 7, 9, 25 and 1,000
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition,
    formatSequence
} from './helpers/N01_countingHelpers.js';

/**
 * Generate a counting question
 * @param {Object} params - V2 nested parameters with math and presentation
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    // CRITICAL: V2 NESTED DESTRUCTURING PATTERN
    const {
        math: {
            range: { min, max },
            sequence: { steps, length, directions, startStrategy }
        },
        presentation: {
            gaps: { position },
            visualType
        }
    } = params;

    // Select random values from parameter options
    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // Adjust range dynamically for step 1000
    // For step 1000, we need a much larger range to create meaningful sequences
    let adjustedMin = min;
    let adjustedMax = max;

    if (step === 1000) {
        // Multiply max by step to get appropriate range for thousands
        // E.g., level 1: max 100 -> 100*1000 = 100,000 (allowing 0, 1000, 2000, ..., 100000)
        // This gives us enough room for sequences of length 4-6
        adjustedMax = max * step;
    }

    // Get start value based on strategy
    let start = getStartValue({ startStrategy, min: adjustedMin, max: adjustedMax }, step);

    // For backwards sequences, ensure we have enough room
    if (direction === 'backwards') {
        const minRequired = step * (length - 1);
        // If start is too low, find a higher starting point
        if (start < minRequired) {
            const multiples = [];
            for (let i = minRequired; i <= adjustedMax; i += step) {
                multiples.push(i);
            }
            if (multiples.length > 0) {
                start = randomChoice(multiples);
            } else {
                start = adjustedMax;
            }
        }
    }

    // Generate full sequence
    const fullSequence = generateSequence(start, step, length, direction);

    // Determine gap position
    const gapIndex = getGapPosition(length, position);

    // Extract answer before creating display values
    const answer = fullSequence[gapIndex];

    // Create display array with null at gap position
    const displayValues = [...fullSequence];
    displayValues[gapIndex] = null;

    // Format question text
    const questionText = `What is the missing number? ${formatSequence(fullSequence, gapIndex)}`;

    // Generate hint
    const hint = `The pattern counts ${direction} in ${step}s`;

    return {
        text: questionText,
        type: 'text_input',
        answer: answer.toString(),
        hint: hint,
        module: 'N01_Y4_NPV',
        level: level,

        // Question parts - ordered array for UI rendering
        questionParts: [
            { type: 'text', value: 'What is the missing number?' },
            {
                type: 'sequence',
                values: displayValues,
                gapIndices: [gapIndex],
                step: step,
                direction: direction
            }
        ]
    };
}

export default {
    moduleId: 'N01_Y4_NPV',
    generate: generateQuestion
};
