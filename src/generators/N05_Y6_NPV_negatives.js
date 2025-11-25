/**
 * Year 6 Intervals Across Zero Question Generator
 * Schema: V2
 */

import { randomChoice, randomInt } from './helpers/N01_countingHelpers.js';

function calculateInterval(num1, num2) {
    return Math.abs(num2 - num1);
}

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        must_cross_zero: math.mustCrossZero,
        temperature_range: math.range.temp,
        elevation_range: math.range.elevation,
        interval_types: presentation.intervalTypes,
        context_types: presentation.contexts
    };

    const intervalType = randomChoice(flatParams.interval_types);
    const contextType = randomChoice(flatParams.context_types);

    if (intervalType === 'simple') {
        if (contextType === 'temperature') return generateTemperatureQuestion(flatParams, level);
        if (contextType === 'elevation') return generateElevationQuestion(flatParams, level);
        if (contextType === 'number_line') return generateNumberLineQuestion(flatParams, level);
        return generateSimpleIntervalQuestion(flatParams, level);
    }
    if (intervalType === 'multi_step') return generateTemperatureQuestion(flatParams, level);
    if (intervalType === 'word_problem') return generateWordProblem(flatParams, level);
    return generateSimpleIntervalQuestion(flatParams, level);
}

function generateSimpleIntervalQuestion(params, level) {
    let num1, num2;
    if (params.must_cross_zero) {
        num1 = randomInt(params.min_value, -1);
        num2 = randomInt(1, params.max_value);
    } else {
        num1 = randomInt(params.min_value, params.max_value);
        num2 = randomInt(params.min_value, params.max_value);
        while (num1 === num2) num2 = randomInt(params.min_value, params.max_value);
    }
    const interval = calculateInterval(num1, num2);
    return { text: `Difference between ${num1} and ${num2}?`, type: 'text_input', answer: interval.toString(), hint: 'Calculate steps between numbers', module: 'N05_Y6_NPV', level: level };
}

function generateTemperatureQuestion(params, level) {
    const [min, max] = params.temperature_range;
    const temp1 = randomInt(min, max);
    const temp2 = randomInt(min, max);
    if (temp1 === temp2) return generateTemperatureQuestion(params, level);
    return { text: `Temp at midnight ${temp1}°C, noon ${temp2}°C. Change?`, type: 'text_input', answer: Math.abs(temp2 - temp1).toString(), hint: `Difference between ${temp1} and ${temp2}`, module: 'N05_Y6_NPV', level: level };
}

function generateElevationQuestion(params, level) {
    const [min, max] = params.elevation_range;
    const depth = randomInt(min, -1);
    const height = randomInt(1, max);
    return { text: `Submarine at ${depth}m. Peak at ${height}m. Vertical distance?`, type: 'text_input', answer: (height - depth).toString(), hint: `Distance from ${depth} to ${height}`, module: 'N05_Y6_NPV', level: level };
}

function generateNumberLineQuestion(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generateNumberLineQuestion(params, level);
    return { text: `Distance between ${num1} and ${num2} on number line?`, type: 'text_input', answer: Math.abs(num2 - num1).toString(), hint: `Count steps`, module: 'N05_Y6_NPV', level: level };
}

function generateWordProblem(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generateWordProblem(params, level);
    return { text: `Lift floor ${num1} to ${num2}. Floors traveled?`, type: 'text_input', answer: Math.abs(num2 - num1).toString(), hint: `Difference`, module: 'N05_Y6_NPV', level: level };
}

export default {
    moduleId: 'N05_Y6_NPV',
    generate: generateQuestion
};