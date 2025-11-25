/**
 * Year 5 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, roundToNearest } from './helpers/N02_numberHelpers.js';
import { generateAddition } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_to: math.rounding.bases
    };
    return generateRoundToCheck(flatParams, level);
}

function generateRoundToCheck(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);
    const base = randomChoice(params.rounding_to);
    const est = roundToNearest(a, base) + roundToNearest(b, base);
    const fake = answer + 2000; // Wrong answer
    return {
        text: `Is ${a} + ${b} = ${fake} reasonable? (Round to ${base})`,
        type: 'multiple_choice',
        options: ['Yes', 'No'],
        answer: 'No',
        hint: `Estimate is ${est}`,
        module: 'C03_Y5_CALC',
        level
    };
}

export default { moduleId: 'C03_Y5_CALC', generate: generateQuestion };