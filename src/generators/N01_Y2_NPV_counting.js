/**
 * Year 2 Counting in Steps Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y2_NPV - "Count in steps of 2, 3, and 5 from 0, and in tens from any number"
 * Schema: V2 (Nested Parameters)
 */

import {
    randomChoice,
    randomInt,
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
            sequence: { 
                steps, 
                length, 
                directions, 
                startStrategy,
                // Specific Y2 optional parameters
                tensFromAny, 
                tensRange 
            }
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 2. Y2 Specific Logic: "tens from any number"
    let start;
    if (step === 10 && tensFromAny && tensRange) {
        // Tens from any number - allow any starting position within specific range
        start = randomInt(tensRange[0], tensRange[1]);
    } else {
        // Steps of 2, 3, 5 should start from 0 or multiples (handled by helper)
        start = getStartValue({ startStrategy, min, max }, step);
    }

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
        module: 'N01_Y2_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y2_NPV',
    generate: generateQuestion
};