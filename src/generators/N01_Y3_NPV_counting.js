/**
 * Year 3 Counting from 0 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y3_NPV - "Count from 0 in multiples of 4, 8, 50 and 100"
 * Schema: V2 (Nested Parameters)
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
    // 1. Destructure V2 Schema
    const {
        math: {
            range: { min, max },
            sequence: { steps, length, directions, startStrategy }
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 2. Get starting value
    let start = getStartValue({ startStrategy, min, max }, step);

    // 3. Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

    // 4. Generate sequence
    const fullSequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

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

export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};