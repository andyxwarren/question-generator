/**
 * Year 2 Identify, Represent and Estimate Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateEstimationText,
    findRange,
    formatRange,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    generateUniqueNumbers,
    findClosestMark,
    generateNumberLineMarks
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML } from './helpers/N04_simpleVisuals.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    // Flattener helper
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
        case 'estimate_group': return generateEstimateGroup(getFlatParams(), level);
        case 'place_value_representation': return generatePlaceValueQuestion(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'partition_number': return generatePartitionNumber(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'number_line_multiple_positions': return generateNumberLineMultiplePositions(getFlatParams(), level);
        default: return generateNumberLinePosition(getFlatParams(), level);
    }
}

function generateNumberLinePosition(params, level) {
    const target = randomInt(0, params.number_line_max);
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, level === 1);
    return { text: `What number is marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Check position', module: 'N04_Y2_NPV', level: level };
}

function generateNumberLineBetween(params, level) {
    const p1 = randomInt(Math.floor(params.number_line_max * 0.3), Math.floor(params.number_line_max * 0.4));
    const p2 = randomInt(Math.floor(params.number_line_max * 0.6), Math.floor(params.number_line_max * 0.7));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, null, true);
    return { text: `Name a number between ${formatNumber(p1)} and ${formatNumber(p2)} on this line:\n\n${html}`, type: 'text_input', answer: String(randomInt(p1+1, p2-1)), acceptableRange: { min: p1+1, max: p2-1 }, hint: 'Any number between them', module: 'N04_Y2_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 30);
    const jump = randomChoice([2, 5, 10]);
    const num = randomInt(2, 4);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start at ${start}. Jump forward ${num} times, each jump of ${jump}. Where do you land?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump by count, add to start`, module: 'N04_Y2_NPV', level: level };
}

function generateEstimateGroup(params, level) {
    const count = randomInt(params.min_value, params.max_value);
    const offset = Math.floor(params.max_value / 10);
    const options = shuffle(Array.from(new Set([count, Math.max(params.min_value, count-offset), Math.min(params.max_value, count+offset), Math.max(params.min_value, count-Math.floor(offset/2))])).slice(0, 4));
    return { text: `About how many objects if you see a group close to ${count}?`, type: 'multiple_choice', options: options, answer: count.toString(), hint: `Look for closest number`, module: 'N04_Y2_NPV', level: level };
}

function generatePlaceValueQuestion(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const num = randomInt(params.min_value, Math.min(params.max_value, params.place_value_max));
    const rep = generatePlaceValueRepresentation(num);
    const places = Object.keys(rep);
    if (places.length === 0) return generatePlaceValueQuestion(params, level, attempt + 1);
    const place = randomChoice(places);
    const val = rep[place];
    const allVals = Object.values(rep);
    const distractors = allVals.filter(v => v !== val);
    const placeVals = { 'ones': 1, 'tens': 10, 'hundreds': 100 };
    if (placeVals[place]) {
        const d = Math.floor((num % (placeVals[place]*10))/placeVals[place]);
        if (d !== val) distractors.push(d);
    }
    return { text: `In ${formatNumber(num)}, what is the value of the digit in the ${place} place?`, type: 'multiple_choice', options: shuffle([val, ...distractors.slice(0, 3)]), answer: val.toString(), hint: `Think place value`, module: 'N04_Y2_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateNumberLinePosition(params, level);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find the range`, module: 'N04_Y2_NPV', level: level };
}

function generatePartitionNumber(params, level) {
    const num = randomInt(Math.max(params.min_value, 10), Math.min(params.max_value, params.place_value_max));
    return { text: `Write ${formatNumber(num)} as sum of place values`, type: 'text_input', answer: generatePartitionText(num).replace(/\s/g, ''), hint: `Tens + Ones`, module: 'N04_Y2_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(num1, num2, op);
    const exact = op === 'add' ? num1 + num2 : num1 - num2;
    const distractors = [exact, est+10, est-10, Math.round(exact/10)*10].filter(d => d !== est && d >= 0);
    return { text: generateEstimationCalculationText(num1, num2, op), type: 'multiple_choice', options: shuffle([est, ...distractors.slice(0, 3)]), answer: est.toString(), hint: `Round first`, module: 'N04_Y2_NPV', level: level };
}

function generateNumberLineMultiplePositions(params, level) {
    const nums = generateUniqueNumbers(3, 0, params.number_line_max);
    const target = randomChoice(nums);
    const marks = generateNumberLineMarks(0, params.number_line_max, 10);
    const correct = findClosestMark(target, marks);
    const distractors = marks.filter(m => m !== correct).slice(0, 3);
    return { text: `On a number line 0 to ${params.number_line_max}, numbers are ${nums.map(n => formatNumber(n)).join(', ')}. Which is ${formatNumber(target)}?`, type: 'multiple_choice', options: shuffle([target, ...distractors]), answer: target.toString(), hint: `Find position`, module: 'N04_Y2_NPV', level: level };
}

export default {
    moduleId: 'N04_Y2_NPV',
    generate: generateQuestion
};