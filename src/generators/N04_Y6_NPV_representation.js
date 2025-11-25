/**
 * Year 6 Round to Any Degree of Accuracy Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    calculateRoughEstimate,
    getErrorBounds,
    chooseAppropriateRoundingBase,
    findRange,
    formatRange
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML } from './helpers/N04_simpleVisuals.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        number_line_max: presentation.numberLine.max,
        estimation_ranges: math.estimation.ranges,
        rounding_bases: math.rounding.bases
    });

    switch(operation) {
        case 'round_to_thousand': return generateRounding(getFlatParams(), level, 1000);
        case 'round_to_ten_thousand': return generateRounding(getFlatParams(), level, 10000);
        case 'round_to_hundred_thousand': return generateRounding(getFlatParams(), level, 100000);
        case 'round_to_million': return generateRounding(getFlatParams(), level, 1000000);
        case 'round_to_ten_million': return generateRounding(getFlatParams(), level, 10000000);
        case 'round_to_any_place': return generateRoundToAnyPlace(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'compare_rounded': return generateCompareRounded(getFlatParams(), level);
        case 'choose_appropriate_rounding': return generateChooseAppropriateRounding(getFlatParams(), level);
        case 'error_bounds': return generateErrorBounds(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        default: return generateRounding(getFlatParams(), level, 1000000);
    }
}

function generateRounding(params, level, base) {
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    return { text: `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Check digit to right`, module: 'N04_Y6_NPV', level: level };
}

function generateRoundToAnyPlace(params, level) {
    const base = randomChoice(params.rounding_bases);
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    return { text: `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Identify place value`, module: 'N04_Y6_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract', 'multiply']);
    const est = calculateRoughEstimate(n1, n2, op);
    let exact = op === 'add' ? n1+n2 : op === 'subtract' ? n1-n2 : n1*n2;
    const distractors = [exact, est+100000, est-100000].filter(d => d!==est && d>0);
    const symb = { 'add': '+', 'subtract': '-', 'multiply': '×' }[op];
    return { text: `Estimate ${formatNumber(n1)} ${symb} ${formatNumber(n2)}`, type: 'multiple_choice', options: shuffle([est, ...distractors.slice(0, 3)]), answer: est.toString(), hint: `Round then calc`, module: 'N04_Y6_NPV', level: level };
}

function generateCompareRounded(params, level) {
    const base = randomChoice(params.rounding_bases.filter(b => b >= 1000));
    const n1 = generateNonMultiple(params.min_value, params.max_value, base);
    const n2 = generateNonMultiple(params.min_value, params.max_value, base);
    const r1 = roundToNearest(n1, base);
    const r2 = roundToNearest(n2, base);
    if (r1 === r2) return generateCompareRounded(params, level);
    const q = randomChoice([
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Larger?`, ans: Math.max(r1, r2) },
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Difference?`, ans: Math.abs(Math.max(r1, r2) - Math.min(r1, r2)) }
    ]);
    if (q.text.includes('Difference')) {
        const opts = shuffle([q.ans, q.ans+base, q.ans-base].filter(d => d>0));
        return { text: q.text, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: `Round then diff`, module: 'N04_Y6_NPV', level: level };
    }
    return { text: q.text, type: 'multiple_choice', options: [r1, r2], answer: q.ans.toString(), hint: `Round then compare`, module: 'N04_Y6_NPV', level: level };
}

function generateChooseAppropriateRounding(params, level) {
    const context = randomChoice(['population', 'money', 'distance', 'time']);
    const num = randomInt(params.min_value, params.max_value);
    const base = chooseAppropriateRoundingBase(context, num);
    const options = [10, 100, 1000, 10000, 100000, 1000000].filter(b => b <= params.max_value).map(b => formatNumber(b));
    const q = { 'population': `City pop ${formatNumber(num)}. Rounding?`, 'money': `Revenue £${formatNumber(num)}. Rounding?`, 'distance': `Dist ${formatNumber(num)}m. Rounding?`, 'time': `Time ${formatNumber(num)}s. Rounding?` };
    return { text: q[context], type: 'multiple_choice', options: options, answer: formatNumber(base), hint: `Think context`, module: 'N04_Y6_NPV', level: level };
}

function generateErrorBounds(params, level) {
    const base = randomChoice(params.rounding_bases.filter(b => b >= 1000));
    const rounded = randomInt(Math.ceil(params.min_value/base), Math.floor(params.max_value/base)) * base;
    const [min, max] = getErrorBounds(rounded, base);
    const q = randomChoice([{ text: `Number rounded to ${formatNumber(base)} is ${formatNumber(rounded)}. Smallest possible?`, ans: Math.ceil(min) }, { text: `Number rounded to ${formatNumber(base)} is ${formatNumber(rounded)}. Largest possible?`, ans: Math.floor(max) }]);
    const opts = shuffle([q.ans, rounded, rounded-base, rounded+base].filter(d => d!==q.ans));
    return { text: q.text, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: `Range rounding to this`, module: 'N04_Y6_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateRounding(params, level, 1000000);
    return { text: `Which range estimates ${formatNumber(num)}?`, type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y6_NPV', level: level };
}

export default {
    moduleId: 'N04_Y6_NPV',
    generate: generateQuestion
};