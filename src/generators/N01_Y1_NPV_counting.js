/**
 * Year 1 Counting in Multiples Question Generator
 * Schema: V2
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

export function generateQuestion(params, level) {
    // Destructure V2 Schema
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

    // Pass explict config object to helper
    let start = getStartValue({ startStrategy, min, max }, step);

    // Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

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
        module: 'N01_Y1_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateQuestion
};