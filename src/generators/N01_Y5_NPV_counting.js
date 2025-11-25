/**
 * Year 5 Counting in Powers of 10 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y5_NPV - "count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000"
 * Schema: V2 (Nested Parameters)
 */

import {
    randomChoice,
    randomInt,
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
            sequence: { steps, length, directions } // 'steps' now holds powers_of_10 data
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    // Y5 uses powers_of_10 which are mapped to 'steps' in the schema migration
    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 2. Get starting value (Custom logic for Y5 to allow "any number")
    const range = max - min;
    const rawStart = min + randomInt(0, Math.floor(range / 2));
    
    // Snap start to grid to ensure integers are clean
    let start = Math.floor(rawStart / step) * step;

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

    // 4. Generate and Validate Sequence
    let fullSequence = generateSequence(start, step, length, direction);

    // VALIDATION: Ensure ALL values in sequence are within [min, max]
    const allValuesValid = fullSequence.every(val => val >= min && val <= max);

    if (!allValuesValid) {
        // If invalid, clamp start point conservatively
        if (direction === 'forwards') {
            const safeMaxStart = max - (step * length);
            start = Math.max(min, Math.min(start, safeMaxStart));
        } else {
            const safeMinStart = min + (step * length);
            start = Math.min(max, Math.max(start, safeMinStart));
        }
        // Regenerate
        fullSequence = generateSequence(start, step, length, direction);
        
        // Force clamp if still failing
        fullSequence = fullSequence.map(val => Math.max(min, Math.min(val, max)));
    }

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
        module: 'N01_Y5_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y5_NPV',
    generate: generateQuestion
};