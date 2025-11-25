/**
 * Year 6 Number Problems Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, formatNumber, generateDistractors, roundToNearest, sortAscending } from './helpers/N02_numberHelpers.js';
import { getPlaceValue } from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_bases: math.rounding.bases,
        min_steps: math.steps.min,
        max_steps: math.steps.max,
        negative_range: math.range.negative,
        interval_range: math.range.interval,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'large_place_value_problems': return generateLargePlaceValueProblem(flatParams, level);
        case 'multi_level_rounding_problems': return generateMultiLevelRoundingProblem(flatParams, level);
        case 'ordering_comparing_large_numbers': return generateOrderingComparingProblem(flatParams, level);
        case 'negative_interval_problems': return generateNegativeIntervalProblem(flatParams, level);
        case 'multi_concept_integration': return generateMultiConceptProblem(flatParams, level);
        default: return generateLargePlaceValueProblem(flatParams, level);
    }
}

function generateLargePlaceValueProblem(params, level) {
    const num = randomInt(1000000, params.max_value);
    const millions = Math.floor(num/1000000);
    const text = `How many millions in ${formatNumber(num)}?`;
    const options = shuffle([millions, millions*10, Math.floor(millions/10), millions+1]);
    return { text, type: 'multiple_choice', options, answer: millions.toString(), hint: `Look at millions place`, module: 'N06_Y6_NPV', level };
}

function generateMultiLevelRoundingProblem(params, level) {
    const num = randomInt(100000, params.max_value);
    const r1 = 100000;
    const r2 = 10000;
    const ans1 = roundToNearest(num, r1);
    const ans2 = roundToNearest(num, r2);
    const diff = Math.abs(ans1 - ans2);
    const text = `Round ${formatNumber(num)} to nearest ${formatNumber(r1)} and ${formatNumber(r2)}. Difference?`;
    const options = shuffle([diff, diff+10000, diff+1000, 0]);
    return { text, type: 'multiple_choice', options, answer: diff.toString(), hint: `Round both then subtract`, module: 'N06_Y6_NPV', level };
}

function generateOrderingComparingProblem(params, level) {
    const n1 = randomInt(1000000, params.max_value);
    const n2 = randomInt(1000000, params.max_value);
    const text = `Larger: ${formatNumber(n1)} or ${formatNumber(n2)}?`;
    const ans = Math.max(n1, n2);
    return { text, type: 'multiple_choice', options: [formatNumber(n1), formatNumber(n2)], answer: formatNumber(ans), hint: `Compare`, module: 'N06_Y6_NPV', level };
}

function generateNegativeIntervalProblem(params, level) {
    const n1 = randomInt(-50, -10);
    const n2 = randomInt(10, 50);
    const dist = n2 - n1;
    const text = `Difference between ${n1} and ${n2}?`;
    const options = shuffle([dist, dist-10, dist+10, Math.abs(n1)+Math.abs(n2)+10]);
    return { text, type: 'multiple_choice', options, answer: dist.toString(), hint: `Add absolute values`, module: 'N06_Y6_NPV', level };
}

function generateMultiConceptProblem(params, level) {
    const num = randomInt(1000000, params.max_value);
    const round = 1000000;
    const rounded = roundToNearest(num, round);
    const millions = Math.floor(rounded/1000000);
    const text = `Round ${formatNumber(num)} to nearest million. How many millions?`;
    const options = shuffle([millions, millions+1, millions-1, millions*10]);
    return { text, type: 'multiple_choice', options, answer: millions.toString(), hint: `Round then count millions`, module: 'N06_Y6_NPV', level };
}

export default {
    moduleId: 'N06_Y6_NPV',
    generate: generateQuestion
};