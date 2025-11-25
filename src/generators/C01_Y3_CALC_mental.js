/**
 * Year 3 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_3digit: math.range.min3,
        max_3digit: math.range.max3,
        ones_range: math.components.ones,
        tens_range: math.components.tens,``
        hundreds_range: math.components.hundreds,
        avoid_bridging: math.config.avoidBridging,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'add_ones': return generateAddOnes(flatParams, level);
        case 'subtract_ones': return generateSubtractOnes(flatParams, level);
        case 'add_tens': return generateAddTens(flatParams, level);
        case 'subtract_tens': return generateSubtractTens(flatParams, level);
        case 'add_hundreds': return generateAddHundreds(flatParams, level);
        case 'subtract_hundreds': return generateSubtractHundreds(flatParams, level);
        case 'mixed_operations': return generateMixedOperations(flatParams, level);
        case 'two_step_mental': return generateTwoStepMental(flatParams, level);
        default: return generateAddOnes(flatParams, level);
    }
}

function generateAddOnes(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const ones = randomInt(params.ones_range[0], params.ones_range[1]);
    if (params.avoid_bridging && (base % 10) + ones >= 10) return generateAddOnes(params, level);
    const ans = base + ones;
    const text = `${base} + ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+10)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add to ones`, module: 'C01_Y3_CALC', level };
}

function generateSubtractOnes(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const ones = randomInt(params.ones_range[0], params.ones_range[1]);
    if (params.avoid_bridging && (base % 10) < ones) return generateSubtractOnes(params, level);
    const ans = base - ones;
    const text = `${base} - ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit-10, params.max_3digit)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Subtract from ones`, module: 'C01_Y3_CALC', level };
}

function generateAddTens(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = randomInt(params.tens_range[0]/10, params.tens_range[1]/10) * 10;
    const ans = base + tens;
    const text = `${base} + ${tens} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+100)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add to tens`, module: 'C01_Y3_CALC', level };
}

function generateSubtractTens(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = randomInt(params.tens_range[0]/10, params.tens_range[1]/10) * 10;
    const ans = base - tens;
    const text = `${base} - ${tens} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_3digit)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Subtract from tens`, module: 'C01_Y3_CALC', level };
}

function generateAddHundreds(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const hund = randomInt(params.hundreds_range[0]/100, params.hundreds_range[1]/100) * 100;
    const ans = base + hund;
    const text = `${base} + ${hund} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+200)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add to hundreds`, module: 'C01_Y3_CALC', level };
}

function generateSubtractHundreds(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const hund = randomInt(1, Math.floor(base/100)) * 100;
    const ans = base - hund;
    const text = `${base} - ${hund} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_3digit)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Subtract from hundreds`, module: 'C01_Y3_CALC', level };
}

function generateMixedOperations(params, level) {
    const ops = ['add_ones', 'subtract_ones', 'add_tens', 'subtract_tens', 'add_hundreds'];
    const op = randomChoice(ops);
    // Recurse with selected operation
    return generateQuestion({ ...params, operations: [op] }, level);
}

function generateTwoStepMental(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = 20, ones = 5;
    const ans = base + tens + ones;
    const text = `${base} + ${tens} + ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+100)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add parts`, module: 'C01_Y3_CALC', level };
}

export default {
    moduleId: 'C01_Y3_CALC',
    generate: generateQuestion
};
