/**
 * N01_Y2_NPV: Counting in Multiples
 *
 * Year 2: Count in steps of 2, 3, and 5 from 0, and in tens from any number,
 * forward or backward
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition,
    formatSequence
} from './helpers/N01_countingHelpers.js';

/**
 * Generate a counting question for Year 2
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

    // Get start value based on strategy
    // Note: startStrategy includes special handling for step=10 (see helpers)
    let start = getStartValue({ startStrategy, min, max }, step);

    // For backwards sequences, ensure we have enough room
    if (direction === 'backwards') {
        const minRequired = step * (length - 1);
        // If start is too low, find a higher starting point
        if (start < minRequired) {
            // For step=10 with 'zero_or_any_tens', can start from any number
            if (step === 10 && (startStrategy === 'zero_or_any_tens' || startStrategy === 'zero_or_tens')) {
                const minStart = minRequired;
                const maxStart = max;
                if (startStrategy === 'zero_or_tens') {
                    // Must be multiple of 10
                    const multiples = [];
                    for (let i = minStart; i <= maxStart; i += 10) {
                        if (i % 10 === 0) multiples.push(i);
                    }
                    if (multiples.length > 0) {
                        start = randomChoice(multiples);
                    }
                } else {
                    // Can be any number
                    start = minRequired + Math.floor(Math.random() * (maxStart - minStart + 1));
                }
            } else {
                // For other steps, find valid multiples
                const multiples = [];
                for (let i = minRequired; i <= max; i += step) {
                    multiples.push(i);
                }
                if (multiples.length > 0) {
                    start = randomChoice(multiples);
                } else {
                    start = max;
                }
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
        module: 'N01_Y2_NPV',
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
    moduleId: 'N01_Y2_NPV',
    generate: generateQuestion
};
