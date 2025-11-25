/**
 * Year 3 Identify, Represent and Estimate Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateNumberLineMarks,
    findClosestMark,
    describeNumberLinePosition,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateEstimationText,
    findRange,
    formatRange,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    calculateMidpoint,
    generateUniqueNumbers
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
        place_value_max: math.placeValue.max
    });

    switch(operation) {
        case 'number_line_position': return generateNumberLinePosition(getFlatParams(), level);
        case 'number_line_between': return generateNumberLineBetween(getFlatParams(), level);
        case 'number_line_jump': return generateNumberLineJump(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'place_value_representation': return generatePlaceValueQuestion(getFlatParams(), level);
        case 'partition_number': return generatePartitionNumber(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'estimate_midpoint': return generateEstimateMidpoint(getFlatParams(), level);
        case 'number_line_multiple_positions': return generateNumberLineMultiplePositions(getFlatParams(), level);
        case 'compare_representations': return generateCompareRepresentations(getFlatParams(), level);
        default: return generateNumberLinePosition(getFlatParams(), level);
    }
}

// Similar logic to Y2, adjusted for Y3 complexity
function generateNumberLinePosition(params, level) {
    const target = randomInt(params.min_value, Math.min(params.max_value, params.number_line_max));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, false);
    return { text: `What number is marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Use marks to estimate', module: 'N04_Y3_NPV', level: level };
}

function generateNumberLineBetween(params, level) {
    const n1 = randomInt(params.min_value, params.max_value - 50);
    const n2 = n1 + randomInt(20, 50);
    const bet = randomInt(n1+5, n2-5);
    const opts = shuffle([bet, n1, n2, Math.floor((n1+n2)/2)].filter(d => d!==bet));
    return { text: `Which comes between ${formatNumber(n1)} and ${formatNumber(n2)}?`, type: 'multiple_choice', options: opts, answer: bet.toString(), hint: `Greater than ${n1}, less than ${n2}`, module: 'N04_Y3_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 200);
    const jump = randomChoice([10, 25, 50, 100]);
    const num = randomInt(2, 5);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start at ${formatNumber(start)}. Jump forward ${num} times by ${formatNumber(jump)}. Where do you land?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump by count, add to start`, module: 'N04_Y3_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateNumberLinePosition(params, level);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y3_NPV', level: level };
}

function generatePlaceValueQuestion(params, level) {
    const num = randomInt(Math.max(params.min_value, 100), Math.min(params.max_value, params.place_value_max));
    const rep = generatePlaceValueRepresentation(num);
    const places = Object.keys(rep);
    const place = randomChoice(places);
    const val = rep[place];
    const distractors = Object.values(rep).filter(v => v !== val);
    return { text: `In ${formatNumber(num)}, value of digit in ${place} place?`, type: 'multiple_choice', options: shuffle([val, ...distractors.slice(0, 3)]), answer: val.toString(), hint: `Think place value`, module: 'N04_Y3_NPV', level: level };
}

function generatePartitionNumber(params, level) {
    const num = randomInt(Math.max(params.min_value, 100), Math.min(params.max_value, params.place_value_max));
    return { text: `Write ${formatNumber(num)} as sum of place values`, type: 'text_input', answer: generatePartitionText(num).replace(/\s/g, ''), hint: `Hundreds + Tens + Ones`, module: 'N04_Y3_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(n1, n2, op);
    const exact = op === 'add' ? n1+n2 : n1-n2;
    const distractors = [exact, est+50, est-50].filter(d => d!==est && d>=0);
    return { text: generateEstimationCalculationText(n1, n2, op), type: 'multiple_choice', options: shuffle([est, ...distractors]), answer: est.toString(), hint: `Round first`, module: 'N04_Y3_NPV', level: level };
}

function generateEstimateMidpoint(params, level) {
    const n1 = randomInt(params.min_value, params.max_value-100);
    const n2 = n1 + randomInt(100, 300);
    const mid = calculateMidpoint(n1, n2);
    const distractors = [mid+50, mid-50, n1+50].filter(d => d!==mid);
    return { text: `Number halfway between ${formatNumber(n1)} and ${formatNumber(n2)}?`, type: 'multiple_choice', options: shuffle([mid, ...distractors]), answer: mid.toString(), hint: `Add and divide by 2`, module: 'N04_Y3_NPV', level: level };
}

function generateNumberLineMultiplePositions(params, level) {
    const nums = generateUniqueNumbers(3, params.min_value, Math.min(params.max_value, params.number_line_max));
    const target = randomChoice(nums);
    const marks = generateNumberLineMarks(0, params.number_line_max, 10);
    const correct = findClosestMark(target, marks);
    const distractors = marks.filter(m => m !== correct).slice(0, 3);
    return { text: `On 0-${formatNumber(params.number_line_max)} line, marks: ${nums.map(n=>formatNumber(n)).join(', ')}. Which is ${formatNumber(target)}?`, type: 'multiple_choice', options: shuffle([target, ...distractors]), answer: target.toString(), hint: `Find position`, module: 'N04_Y3_NPV', level: level };
}

function generateCompareRepresentations(params, level) {
    const num = randomInt(Math.max(params.min_value, 100), params.max_value);
    const part = generatePartitionText(num);
    const q = randomChoice([{ text: `Same as ${part}?`, ans: num }, { text: `${formatNumber(num)} as sum?`, ans: part.replace(/\s/g, '') }]);
    if (typeof q.ans === 'number') {
        const opts = shuffle([num, num+100, num-100, num+10].filter(d => d!==num));
        return { text: q.text, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: `Calculate sum`, module: 'N04_Y3_NPV', level: level };
    }
    return { text: q.text, type: 'text_input', answer: q.ans, hint: `Break into place values`, module: 'N04_Y3_NPV', level: level };
}

export default {
    moduleId: 'N04_Y3_NPV',
    generate: generateQuestion
};