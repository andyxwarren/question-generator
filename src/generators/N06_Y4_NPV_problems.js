/**
 * Year 4 Number Problems Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, formatNumber, generateDistractors, roundToNearest } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        step_sizes: math.sequence.steps,
        min_steps: math.steps.min,
        max_steps: math.steps.max,
        rounding_bases: math.rounding.bases,
        roman_min: math.roman.min,
        roman_max: math.roman.max,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'counting_problems': return generateCountingProblem(flatParams, level);
        case 'place_value_comparison_problems': return generatePlaceValueComparisonProblem(flatParams, level);
        case 'rounding_estimation_problems': return generateRoundingEstimationProblem(flatParams, level);
        case 'negative_number_problems': return generateNegativeNumberProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingProblem(flatParams, level);
    }
}

function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const steps = randomInt(params.min_steps, params.max_steps);
    const ans = step * steps;
    if (ans > params.max_value) return generateCountingProblem(params, level);
    
    const text = `Box holds ${step} items. How many in ${steps} boxes?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${step} x ${steps}`, module: 'N06_Y4_NPV', level };
}

function generatePlaceValueComparisonProblem(params, level) {
    const num = randomInt(1000, params.max_value);
    const thousands = Math.floor(num/1000);
    const text = `In ${formatNumber(num)}, what is value of thousands digit?`;
    const ans = thousands * 1000;
    const options = shuffle([ans, thousands, thousands*100, thousands*10]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${thousands}000`, module: 'N06_Y4_NPV', level };
}

function generateRoundingEstimationProblem(params, level) {
    const num = randomInt(100, params.max_value);
    const base = randomChoice(params.rounding_bases);
    const rounded = roundToNearest(num, base);
    const text = `Round ${num} to nearest ${base}.`;
    const options = shuffle([rounded, ...generateDistractors(rounded, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: rounded.toString(), hint: `Nearest ${base}`, module: 'N06_Y4_NPV', level };
}

function generateNegativeNumberProblem(params, level) {
    const start = randomInt(5, 15);
    const sub = 20;
    const ans = start - sub;
    const text = `Temp is ${start}°C. Drops by ${sub}°C. New temp?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, -20, 20)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} - ${sub}`, module: 'N06_Y4_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const step = 1000;
    const start = 1000;
    const count = 3;
    const target = start + (step*count);
    const round = 100;
    const rounded = roundToNearest(target, round);
    const text = `Start 1000. Add 1000 three times. Round to nearest 100.`;
    const options = shuffle([rounded, ...generateDistractors(rounded, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: rounded.toString(), hint: `4000 rounded`, module: 'N06_Y4_NPV', level };
}

export default {
    moduleId: 'N06_Y4_NPV',
    generate: generateQuestion
};