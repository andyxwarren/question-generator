/**
 * Year 4 Identify, Represent, Estimate and Round Generator
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
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    calculateMidpoint
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
        case 'number_line_position': return generateNumberLinePosition(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'round_to_ten': return generateRounding(getFlatParams(), level, 10);
        case 'round_to_hundred': return generateRounding(getFlatParams(), level, 100);
        case 'round_to_thousand': return generateRounding(getFlatParams(), level, 1000);
        case 'place_value_representation': return generatePlaceValueQuestion(getFlatParams(), level);
        case 'partition_number': return generatePartitionNumber(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'estimate_midpoint': return generateEstimateMidpoint(getFlatParams(), level);
        case 'compare_rounded': return generateCompareRounded(getFlatParams(), level);
        case 'number_line_jump': return generateNumberLineJump(getFlatParams(), level);
        default: return generateNumberLinePosition(getFlatParams(), level);
    }
}

function generateNumberLinePosition(params, level) {
    const target = randomInt(params.min_value, Math.min(params.max_value, params.number_line_max));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, false);
    return { text: `What number is marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Use scale', module: 'N04_Y4_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateNumberLinePosition(params, level);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y4_NPV', level: level };
}

function generateRounding(params, level, base) {
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    const name = base === 10 ? '10' : base === 100 ? '100' : '1,000';
    return { text: `Round ${formatNumber(num)} to the nearest ${name}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Look at digit to right`, module: 'N04_Y4_NPV', level: level };
}

function generatePlaceValueQuestion(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const rep = generatePlaceValueRepresentation(num);
    const place = randomChoice(Object.keys(rep));
    const val = rep[place];
    const distractors = Object.values(rep).filter(v => v !== val);
    return { text: `In ${formatNumber(num)}, value of digit in ${place}?`, type: 'multiple_choice', options: shuffle([val, ...distractors.slice(0, 3)]), answer: val.toString(), hint: `Think place value`, module: 'N04_Y4_NPV', level: level };
}

function generatePartitionNumber(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    return { text: `Write ${formatNumber(num)} as sum of place values`, type: 'text_input', answer: generatePartitionText(num).replace(/\s/g, ''), hint: `Break down number`, module: 'N04_Y4_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(n1, n2, op);
    const exact = op === 'add' ? n1+n2 : n1-n2;
    const distractors = [exact, est+100, est-100].filter(d => d!==est);
    return { text: generateEstimationCalculationText(n1, n2, op), type: 'multiple_choice', options: shuffle([est, ...distractors]), answer: est.toString(), hint: `Round first`, module: 'N04_Y4_NPV', level: level };
}

function generateEstimateMidpoint(params, level) {
    const n1 = randomInt(params.min_value, params.max_value-100);
    const n2 = n1 + randomInt(100, 500);
    const mid = calculateMidpoint(n1, n2);
    const distractors = [mid+50, mid-50, n1+100].filter(d => d!==mid);
    return { text: `Halfway between ${formatNumber(n1)} and ${formatNumber(n2)}?`, type: 'multiple_choice', options: shuffle([mid, ...distractors]), answer: mid.toString(), hint: `Add and divide by 2`, module: 'N04_Y4_NPV', level: level };
}

function generateCompareRounded(params, level) {
    const base = randomChoice(params.rounding_bases);
    const n1 = generateNonMultiple(params.min_value, params.max_value, base);
    const n2 = generateNonMultiple(params.min_value, params.max_value, base);
    const r1 = roundToNearest(n1, base);
    const r2 = roundToNearest(n2, base);
    const q = randomChoice([
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which is larger?`, ans: Math.max(r1, r2) },
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which is smaller?`, ans: Math.min(r1, r2) }
    ]);
    return { text: q.text, type: 'multiple_choice', options: [r1, r2], answer: q.ans.toString(), hint: `Round then compare`, module: 'N04_Y4_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 500);
    const jump = randomChoice([10, 50, 100, 200]);
    const num = randomInt(2, 5);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start at ${formatNumber(start)}. Jump forward ${num} times by ${formatNumber(jump)}. Where?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump by count, add`, module: 'N04_Y4_NPV', level: level };
}

export default {
    moduleId: 'N04_Y4_NPV',
    generate: generateQuestion
};