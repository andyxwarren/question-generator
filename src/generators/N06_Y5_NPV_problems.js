/**
 * Year 5 Number Problems Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, formatNumber, generateDistractors, roundToNearest } from './helpers/N02_numberHelpers.js';
import { getPlaceValue } from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        powers_of_10: math.sequence.steps,
        min_steps: math.steps.min,
        max_steps: math.steps.max,
        rounding_bases: math.rounding.bases,
        roman_min: math.roman.min,
        roman_max: math.roman.max,
        negative_range: math.range.negative,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'counting_with_powers': return generateCountingWithPowersProblem(flatParams, level);
        case 'place_value_comparison_problems': return generatePlaceValueComparisonProblem(flatParams, level);
        case 'rounding_estimation_problems': return generateRoundingEstimationProblem(flatParams, level);
        case 'negative_context_problems': return generateNegativeContextProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingWithPowersProblem(flatParams, level);
    }
}

function generateCountingWithPowersProblem(params, level) {
    const power = randomChoice(params.powers_of_10);
    const steps = randomInt(params.min_steps, params.max_steps);
    const start = randomInt(params.min_value, params.max_value - (power*steps));
    const ans = start + (power*steps);
    const text = `Start at ${formatNumber(start)}. Count forward ${steps} steps of ${formatNumber(power)}. End?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, params.min_value, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} + ${steps * power}`, module: 'N06_Y5_NPV', level };
}

function generatePlaceValueComparisonProblem(params, level) {
    const num = randomInt(10000, params.max_value);
    const place = 'thousands';
    const val = getPlaceValue(num, place);
    const text = `Value of thousands in ${formatNumber(num)}?`;
    const options = shuffle([val, ...generateDistractors(val, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: val.toString(), hint: `Look at thousands`, module: 'N06_Y5_NPV', level };
}

function generateRoundingEstimationProblem(params, level) {
    const num = randomInt(10000, params.max_value);
    const base = randomChoice(params.rounding_bases);
    const ans = roundToNearest(num, base);
    const text = `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `Round`, module: 'N06_Y5_NPV', level };
}

function generateNegativeContextProblem(params, level) {
    const start = randomInt(-10, 10);
    const change = randomInt(5, 20);
    const ans = start - change;
    const text = `Temp ${start}°C. Falls ${change}°C. New temp?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, -50, 50)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} - ${change}`, module: 'N06_Y5_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const start = 10000;
    const add = 1000;
    const steps = 3;
    const total = start + (add * steps);
    const round = 1000;
    const ans = roundToNearest(total, round);
    const text = `Start ${start}. Add ${add} three times. Round to nearest ${round}.`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `Calc then round`, module: 'N06_Y5_NPV', level };
}

export default {
    moduleId: 'N06_Y5_NPV',
    generate: generateQuestion
};