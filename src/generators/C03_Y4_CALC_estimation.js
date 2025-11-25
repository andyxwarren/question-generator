/**
 * Year 4 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, roundToNearest } from './helpers/N02_numberHelpers.js';
import { generateAddition } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_to: math.rounding.bases
    };
    
    return generateEstimate(flatParams, level);
}

function generateEstimate(params, level) {
    const { a, b } = generateAddition(params.min_value, params.max_value);
    const base = randomChoice(params.rounding_to);
    const est = roundToNearest(a, base) + roundToNearest(b, base);
    return { 
        text: `Estimate ${a} + ${b} (nearest ${base})`, 
        type: 'multiple_choice', 
        options: shuffle([est.toString(), (est+base).toString(), (est-base).toString()]), 
        answer: est.toString(), 
        hint: `Round then add`, 
        module: 'C03_Y4_CALC', 
        level 
    };
}

export default { moduleId: 'C03_Y4_CALC', generate: generateQuestion };