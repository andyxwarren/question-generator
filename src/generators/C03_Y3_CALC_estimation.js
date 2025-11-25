/**
 * Year 3 Estimation Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, roundToNearest } from './helpers/N02_numberHelpers.js';
import { generateAddition, generateSubtraction } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_to: math.rounding.bases,
        calculation_types: math.calcTypes
    };

    switch(operation) {
        case 'estimate_by_rounding': return generateEstimateByRounding(flatParams, level);
        case 'check_with_inverse': return generateCheckWithInverse(flatParams, level);
        default: return generateEstimateByRounding(flatParams, level);
    }
}

function generateEstimateByRounding(params, level) {
    const type = randomChoice(params.calculation_types);
    const base = randomChoice(params.rounding_to);

    if (type === 'addition') {
        const { a, b } = generateAddition(params.min_value, params.max_value);
        const est = roundToNearest(a, base) + roundToNearest(b, base);
        return { text: `Estimate ${a} + ${b} (round to ${base})`, type: 'multiple_choice', options: shuffle([est, est+base, est-base]), answer: est.toString(), hint: `Round then add`, module: 'C03_Y3_CALC', level };
    } else {
        const { a, b } = generateSubtraction(params.min_value, params.max_value);
        const est = roundToNearest(a, base) - roundToNearest(b, base);
        return { text: `Estimate ${a} - ${b} (round to ${base})`, type: 'multiple_choice', options: shuffle([est, est+base, est-base]), answer: est.toString(), hint: `Round then subtract`, module: 'C03_Y3_CALC', level };
    }
}

function generateCheckWithInverse(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);
    const text = `${a} + ${b} = ${answer}. Check?`;
    const ans = `${answer} - ${a} = ${b}`;
    const opts = shuffle([ans, `${a}-${b}`, `${answer}+${a}`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: `Inverse`, module: 'C03_Y3_CALC', level };
}

export default {
    moduleId: 'C03_Y3_CALC',
    generate: generateQuestion
};