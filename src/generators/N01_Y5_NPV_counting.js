/**
 * N01_Y5_NPV: Counting in Powers of 10
 *
 * Year 5: Count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getMultipleGapPositions,
    formatSequence,
    randomInt
} from './helpers/N01_countingHelpers.js';

/**
 * Generate a counting question with powers of 10
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
            gaps: { position, count },
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
        // If start is too low for backwards counting, adjust
        if (start < minRequired) {
            // Find a suitable starting point that allows full backward sequence
            start = randomInt(minRequired, Math.min(max, minRequired + (step * 10)));
        }
    }

    // For forwards sequences with large steps, ensure we don't exceed max
    if (direction === 'forwards') {
        const maxEnd = start + (step * (length - 1));
        if (maxEnd > max) {
            // Adjust start to stay within range
            const maxStart = max - (step * (length - 1));
            start = randomInt(min, Math.max(min, maxStart));
        }
    }

    // Generate full sequence
    const fullSequence = generateSequence(start, step, length, direction);

    // Determine gap positions (single or multiple)
    const gapIndices = getMultipleGapPositions(length, count, position);

    // Extract answers for all gaps
    const answers = gapIndices.map(idx => fullSequence[idx]);

    // Create display array with null at gap positions
    const displayValues = [...fullSequence];
    gapIndices.forEach(idx => {
        displayValues[idx] = null;
    });

    // Format question text
    const questionText = count > 1
        ? `What are the missing numbers? ${formatSequence(fullSequence, gapIndices)}`
        : `What is the missing number? ${formatSequence(fullSequence, gapIndices)}`;

    // Generate hint based on step size
    let stepDescription;
    if (step >= 1000) {
        stepDescription = step === 1000 ? 'thousand' : `${step / 1000} thousand`;
    } else if (step >= 100) {
        stepDescription = step === 100 ? 'hundred' : `${step / 100} hundred`;
    } else {
        stepDescription = step.toString();
    }

    const hint = `The pattern counts ${direction} in ${stepDescription}s`;

    // Format answer - single value or comma-separated for multiple gaps
    const answerString = answers.join(', ');

    // Determine instruction text based on gap count
    const instructionText = count > 1
        ? 'What are the missing numbers?'
        : 'What is the missing number?';

    return {
        text: questionText,
        type: count > 1 ? 'fill_blanks' : 'text_input',
        answer: answerString,
        hint: hint,
        module: 'N01_Y5_NPV',
        level: level,

        // Question parts - ordered array for UI rendering
        questionParts: [
            { type: 'text', value: instructionText },
            {
                type: 'sequence',
                values: displayValues,
                gapIndices: gapIndices,
                step: step,
                direction: direction
            }
        ]
    };
}

export default {
    moduleId: 'N01_Y5_NPV',
    generate: generateQuestion
};
