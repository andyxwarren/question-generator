/**
 * Year 5 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors, formatNumber } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        powers_of_10: math.components.powers,
        avoid_bridging: math.config.avoidBridging,
        question_styles: presentation.styles
    };

    if (operation.includes('multiples')) {
        const power = operation.includes('1000') ? 1000 : operation.includes('100') ? 100 : 10;
        return operation.includes('add') ? generateAddMultiples(flatParams, level, power) : generateSubtractMultiples(flatParams, level, power);
    }
    if (operation === 'add_ones_to_4digit') return generateAddOnesTo4Digit(flatParams, level);
    if (operation === 'subtract_ones_from_4digit') return generateSubtractOnesFrom4Digit(flatParams, level);
    if (operation === 'add_any_to_4digit') return generateAddAnyTo4Digit(flatParams, level);
    if (operation === 'compensation') return generateCompensation(flatParams, level);
    if (operation === 'partitioning') return generatePartitioning(flatParams, level);
    if (operation === 'multi_step_mental') return generateMultiStepMental(flatParams, level);
    
    return generateAddMultiples(flatParams, level, 100);
}

function generateAddMultiples(params, level, power) {
    const base = randomInt(params.min_value, params.max_value);
    const add = randomInt(1, 9) * power;
    const ans = base + add;
    const text = `${formatNumber(base)} + ${formatNumber(add)} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_value, params.max_value+power*10)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add ${power}s`, module: 'C01_Y5_CALC', level };
}

function generateSubtractMultiples(params, level, power) {
    const base = randomInt(params.min_value + power, params.max_value);
    const sub = randomInt(1, Math.floor(base/power)) * power;
    const ans = base - sub;
    const text = `${formatNumber(base)} - ${formatNumber(sub)} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Subtract ${power}s`, module: 'C01_Y5_CALC', level };
}

function generateAddOnesTo4Digit(params, level) {
    const base = randomInt(1000, 9999);
    const ones = randomInt(1, 9);
    if (params.avoid_bridging && (base%10)+ones >= 10) return generateAddOnesTo4Digit(params, level);
    const ans = base + ones;
    const text = `${formatNumber(base)} + ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 10000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add ones`, module: 'C01_Y5_CALC', level };
}

function generateSubtractOnesFrom4Digit(params, level) {
    const base = randomInt(1000, 9999);
    const ones = randomInt(1, 9);
    if (params.avoid_bridging && (base%10) < ones) return generateSubtractOnesFrom4Digit(params, level);
    const ans = base - ones;
    const text = `${formatNumber(base)} - ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 10000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Subtract ones`, module: 'C01_Y5_CALC', level };
}

function generateAddAnyTo4Digit(params, level) {
    const base = randomInt(1000, 9999);
    const add = randomChoice([10, 20, 100, 200, 1000, 5]);
    const ans = base + add;
    const text = `${formatNumber(base)} + ${add} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 15000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add mentally`, module: 'C01_Y5_CALC', level };
}

function generateCompensation(params, level) {
    const base = 4999;
    const add = randomInt(100, 5000);
    const ans = base + add;
    const text = `${base} + ${add} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 10000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `5000 + ${add} - 1`, module: 'C01_Y5_CALC', level };
}

function generatePartitioning(params, level) {
    const base = 1234;
    const add = 123;
    const ans = base + add;
    const text = `${base} + ${add} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 2000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `100+20+3`, module: 'C01_Y5_CALC', level };
}

function generateMultiStepMental(params, level) {
    const base = 10000;
    const a = 2000, b = 500;
    const ans = base + a + b;
    const text = `${base} + ${a} + ${b} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 10000, 15000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add sequentially`, module: 'C01_Y5_CALC', level };
}

export default {
    moduleId: 'C01_Y5_CALC',
    generate: generateQuestion
};