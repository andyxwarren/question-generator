/**
 * Year 5 Round to 1,000,000 Generator
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
    findRange,
    formatRange,
    generateEstimationText,
    calculateRoughEstimate,
    chooseAppropriateRoundingBase
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
        case 'round_to_ten': return generateRounding(getFlatParams(), level, 10);
        case 'round_to_hundred': return generateRounding(getFlatParams(), level, 100);
        case 'round_to_thousand': return generateRounding(getFlatParams(), level, 1000);
        case 'round_to_ten_thousand': return generateRounding(getFlatParams(), level, 10000);
        case 'round_to_hundred_thousand': return generateRounding(getFlatParams(), level, 100000);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'compare_rounded': return generateCompareRounded(getFlatParams(), level);
        case 'choose_appropriate_rounding': return generateChooseAppropriateRounding(getFlatParams(), level);
        case 'number_line_position': return generateNumberLinePosition(getFlatParams(), level);
        case 'number_line_jump': return generateNumberLineJump(getFlatParams(), level);
        default: return generateRounding(getFlatParams(), level, 1000);
    }
}

function generateRounding(params, level, base) {
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    return { text: `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Check digit to right`, module: 'N04_Y5_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateRounding(params, level, 1000);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y5_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(n1, n2, op);
    const exact = op === 'add' ? n1+n2 : n1-n2;
    const distractors = [exact, est+10000, est-10000].filter(d => d!==est && d>0);
    const symb = op === 'add' ? '+' : '-';
    return { text: `Estimate ${formatNumber(n1)} ${symb} ${formatNumber(n2)}`, type: 'multiple_choice', options: shuffle([est, ...distractors.slice(0, 3)]), answer: est.toString(), hint: `Round then calc`, module: 'N04_Y5_NPV', level: level };
}

function generateCompareRounded(params, level) {
    const base = randomChoice(params.rounding_bases);
    const n1 = generateNonMultiple(params.min_value, params.max_value, base);
    const n2 = generateNonMultiple(params.min_value, params.max_value, base);
    const r1 = roundToNearest(n1, base);
    const r2 = roundToNearest(n2, base);
    if (r1 === r2) return generateCompareRounded(params, level);
    const q = randomChoice([
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which larger?`, ans: Math.max(r1, r2) },
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which smaller?`, ans: Math.min(r1, r2) }
    ]);
    return { text: q.text, type: 'multiple_choice', options: [r1, r2], answer: q.ans.toString(), hint: `Round then compare`, module: 'N04_Y5_NPV', level: level };
}

function generateChooseAppropriateRounding(params, level) {
    const context = randomChoice(['population', 'money', 'distance']);
    const num = randomInt(params.min_value, params.max_value);
    const base = chooseAppropriateRoundingBase(context, num);
    const options = [100, 1000, 10000, 100000].filter(b => b <= params.max_value).map(b => formatNumber(b));
    const questions = {
        'population': `City pop is ${formatNumber(num)}. Rounding for summary?`,
        'money': `Revenue is £${formatNumber(num)}. Rounding for report?`,
        'distance': `Distance is ${formatNumber(num)}m. Rounding for estimation?`
    };
    return { text: questions[context], type: 'multiple_choice', options: options, answer: formatNumber(base), hint: `Think accuracy needed`, module: 'N04_Y5_NPV', level: level };
}

function generateNumberLinePosition(params, level) {
    const target = randomInt(params.min_value, Math.min(params.max_value, params.number_line_max));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, false);
    return { text: `What number marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Use scale', module: 'N04_Y5_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 50000);
    const jump = randomChoice([1000, 5000, 10000]);
    const num = randomInt(2, 5);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start ${formatNumber(start)}. Jump ${num} times by ${formatNumber(jump)}. Where?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump, add`, module: 'N04_Y5_NPV', level: level };
}

export default {
    moduleId: 'N04_Y5_NPV',
    generate: generateQuestion
};