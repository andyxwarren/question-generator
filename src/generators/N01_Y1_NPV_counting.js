/**
 * N01_Y1_NPV: Counting to 100
 *
 * Year 1: Count to and across 100, forwards and backwards, beginning with 0 or 1,
 * or from any given number; count in multiples of twos, fives and tens
 *
 * Supports i18n typed values for locale-aware rendering
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition,
    formatSequence,
    createInteger,
    createTypedSequence
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

    // Get start value based on strategy
    let start = getStartValue({ startStrategy, min, max }, step);

    // For backwards sequences, ensure we have enough room
    if (direction === 'backwards') {
        const minRequired = step * (length - 1);
        // If start is too low, find a higher starting point
        if (start < minRequired) {
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

    // Generate full sequence
    const fullSequence = generateSequence(start, step, length, direction);

    // Determine gap position
    const gapIndex = getGapPosition(length, position);

    // Extract answer before creating display values
    const answer = fullSequence[gapIndex];

    // Create display array with null at gap position
    const displayValues = [...fullSequence];
    displayValues[gapIndex] = null;

    // Create typed values for i18n
    const typedSequence = createTypedSequence(fullSequence, [gapIndex]);
    const typedAnswer = createInteger(answer);
    const typedStep = createInteger(step);

    // Format question text
    const questionText = `What is the missing number? ${formatSequence(fullSequence, gapIndex)}`;

    // Generate hint
    const hint = `The pattern counts ${direction} in ${step}s`;

    // Template for i18n (sequence values are in questionParts)
    const values = {
        answer: typedAnswer,
        step: typedStep
    };

    return {
        template: 'What is the missing number?',
        answerTemplate: '{answer}',
        values,

        text: questionText,
        type: 'text_input',
        answer: answer.toString(),
        hint: hint,
        module: 'N01_Y1_NPV',
        level: level,

        // Question parts - ordered array for UI rendering
        questionParts: [
            { type: 'text', value: 'What is the missing number?' },
            {
                type: 'sequence',
                values: displayValues,
                typedValues: typedSequence,
                gapIndices: [gapIndex],
                step: step,
                typedStep: typedStep,
                direction: direction,
                typedAnswer: typedAnswer
            }
        ]
    };
}

export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateQuestion
};
