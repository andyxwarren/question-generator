/**
 * Year 3 Identify, Represent and Estimate Generator
 *
 * Module: N04_Y3_NPV - "Identify, represent and estimate numbers using different representations"
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

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'number_line_position':
            return generateNumberLinePosition(params, level);
        case 'number_line_between':
            return generateNumberLineBetween(params, level);
        case 'number_line_jump':
            return generateNumberLineJump(params, level);
        case 'estimate_position':
            return generateEstimatePosition(params, level);
        case 'place_value_representation':
            return generatePlaceValueQuestion(params, level);
        case 'partition_number':
            return generatePartitionNumber(params, level);
        case 'estimate_calculation':
            return generateEstimateCalculation(params, level);
        case 'estimate_midpoint':
            return generateEstimateMidpoint(params, level);
        case 'number_line_multiple_positions':
            return generateNumberLineMultiplePositions(params, level);
        case 'compare_representations':
            return generateCompareRepresentations(params, level);
        default:
            return generateNumberLinePosition(params, level);
    }
}

/**
 * Number line position question
 */
function generateNumberLinePosition(params, level) {
    const { min_value, max_value, number_line_max } = params;

    const targetNumber = randomInt(min_value, Math.min(max_value, number_line_max));
    const numberLineHTML = createSimpleNumberLineHTML(
        0,
        number_line_max,
        targetNumber,
        false  // Year 3: fewer labels for challenge
    );

    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Use the labeled marks to estimate the position',
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Number line between two numbers
 */
function generateNumberLineBetween(params, level) {
    const { min_value, max_value } = params;

    const num1 = randomInt(min_value, max_value - 50);
    const num2 = num1 + randomInt(20, 50);

    const between = randomInt(num1 + 5, num2 - 5);

    const distractors = [
        num1,
        num2,
        Math.floor((num1 + num2) / 2),
        between + 10,
        between - 10
    ].filter(d => d > num1 && d < num2 && d !== between);

    const options = shuffle([between, ...distractors.slice(0, 3)]);

    return {
        text: `Which number comes between ${formatNumber(num1)} and ${formatNumber(num2)} on a number line?`,
        type: 'multiple_choice',
        options: options,
        answer: between.toString(),
        hint: `Find a number that's bigger than ${formatNumber(num1)} but smaller than ${formatNumber(num2)}`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Number line jump question
 */
function generateNumberLineJump(params, level, attempt = 0) {
    const MAX_ATTEMPTS = 10;
    const { number_line_max } = params;

    const start = randomInt(0, number_line_max - 200);
    const jump = randomChoice([10, 25, 50, 100]);
    const numJumps = randomInt(2, 5);
    const end = start + (jump * numJumps);

    if (end > number_line_max) {
        if (attempt >= MAX_ATTEMPTS) {
            // Fallback to number line position
            return generateNumberLinePosition(params, level);
        }
        return generateNumberLineJump(params, level, attempt + 1);
    }

    return {
        text: `Start at ${formatNumber(start)} on a number line. ` +
              `Jump forward ${numJumps} times, each jump of ${formatNumber(jump)}. ` +
              `Where do you land?`,
        type: 'text_input',
        answer: end.toString(),
        hint: `Multiply ${formatNumber(jump)} by ${numJumps}, then add to ${formatNumber(start)}`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Estimate position (which range) question
 */
function generateEstimatePosition(params, level) {
    const { min_value, max_value, estimation_ranges } = params;

    const number = randomInt(min_value, max_value);
    const correctRange = findRange(number, estimation_ranges);

    if (!correctRange) {
        return generateNumberLinePosition(params, level);
    }

    const options = estimation_ranges.map(r => formatRange(r));

    return {
        text: generateEstimationText(number, estimation_ranges),
        type: 'multiple_choice',
        options: options,
        answer: formatRange(correctRange),
        hint: `Think about which range ${formatNumber(number)} falls between`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Place value representation
 */
function generatePlaceValueQuestion(params, level, attempt = 0) {
    const MAX_ATTEMPTS = 10;
    const { min_value, max_value, place_value_max } = params;

    const number = randomInt(Math.max(min_value, 100), Math.min(max_value, place_value_max));
    const representation = generatePlaceValueRepresentation(number);

    const places = Object.keys(representation);
    if (places.length === 0) {
        if (attempt >= MAX_ATTEMPTS) {
            return generateNumberLinePosition(params, level);
        }
        return generatePlaceValueQuestion(params, level, attempt + 1);
    }

    const chosenPlace = randomChoice(places);
    const value = representation[chosenPlace];

    const allValues = Object.values(representation);
    const distractors = allValues.filter(v => v !== value);

    // Add the digit itself as a distractor (without place value)
    const placeValues = { 'ones': 1, 'tens': 10, 'hundreds': 100, 'thousands': 1000 };
    const placeValue = placeValues[chosenPlace];
    if (placeValue) {
        const digit = Math.floor((number % (placeValue * 10)) / placeValue);
        if (digit !== value) {
            distractors.push(digit);
        }
    }

    const options = shuffle([value, ...distractors.slice(0, 3)]);

    return {
        text: `In the number ${formatNumber(number)}, what is the value of the digit in the ${chosenPlace} place?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Think about the place value, not just the digit`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Partition number question
 */
function generatePartitionNumber(params, level) {
    const { min_value, max_value, place_value_max } = params;

    const number = randomInt(Math.max(min_value, 100), Math.min(max_value, place_value_max));
    const partitionedText = generatePartitionText(number);

    return {
        text: `Write ${formatNumber(number)} as a sum of its place values`,
        type: 'text_input',
        answer: partitionedText.replace(/\s/g, ''),
        hint: `Break the number into hundreds, tens, and ones`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Estimate calculation
 */
function generateEstimateCalculation(params, level) {
    const { min_value, max_value } = params;

    const num1 = randomInt(min_value, max_value);
    const num2 = randomInt(Math.floor(min_value / 2), Math.floor(max_value / 2));
    const operation = randomChoice(['add', 'subtract']);

    const estimate = calculateRoughEstimate(num1, num2, operation);

    const exact = operation === 'add' ? num1 + num2 : num1 - num2;
    const distractors = [
        exact,
        estimate + 50,
        estimate - 50,
        Math.round(exact / 100) * 100
    ].filter(d => d !== estimate && d >= 0);

    const options = shuffle([estimate, ...distractors.slice(0, 3)]);

    const questionText = generateEstimationCalculationText(num1, num2, operation);

    return {
        text: questionText,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round the numbers first, then calculate`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Estimate midpoint
 */
function generateEstimateMidpoint(params, level) {
    const { min_value, max_value } = params;

    const num1 = randomInt(min_value, max_value - 100);
    const num2 = num1 + randomInt(100, 300);

    const midpoint = calculateMidpoint(num1, num2);

    const distractors = [
        midpoint + 50,
        midpoint - 50,
        Math.round((num1 + num2) / 3),
        num1 + 50
    ].filter(d => d !== midpoint);

    const options = shuffle([midpoint, ...distractors.slice(0, 3)]);

    return {
        text: `What number is approximately halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'multiple_choice',
        options: options,
        answer: midpoint.toString(),
        hint: `Find the middle by adding and dividing by 2`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Number line multiple positions
 */
function generateNumberLineMultiplePositions(params, level) {
    const { min_value, max_value, number_line_max } = params;

    const numbers = generateUniqueNumbers(3, min_value, Math.min(max_value, number_line_max));
    const targetNumber = randomChoice(numbers);

    const marks = generateNumberLineMarks(0, number_line_max, 10);

    const correctMark = findClosestMark(targetNumber, marks);
    const distractors = marks.filter(m => m !== correctMark).slice(0, 3);
    const options = shuffle([targetNumber, ...distractors]);

    return {
        text: `On a number line from 0 to ${formatNumber(number_line_max)}, ` +
              `three numbers are marked: ${numbers.map(n => formatNumber(n)).join(', ')}. ` +
              `Which position shows ${formatNumber(targetNumber)}?`,
        type: 'multiple_choice',
        options: options,
        answer: targetNumber.toString(),
        hint: `Find the position of ${formatNumber(targetNumber)} on the line`,
        module: 'N04_Y3_NPV',
        level: level
    };
}

/**
 * Compare representations
 */
function generateCompareRepresentations(params, level) {
    const { min_value, max_value } = params;

    const number = randomInt(Math.max(min_value, 100), max_value);

    // Create two different representations
    const partition = generatePartitionText(number);
    const words = `${formatNumber(number)}`;

    const question_types = [
        {
            text: `Which represents the same number as ${partition}?`,
            answer: number
        },
        {
            text: `${words} can be written as which sum?`,
            answer: partition.replace(/\s/g, '')
        }
    ];

    const q = randomChoice(question_types);

    if (typeof q.answer === 'number') {
        // Multiple choice with numbers
        const distractors = [
            number + 100,
            number - 100,
            number + 10,
            number - 10
        ].filter(d => d >= min_value && d <= max_value && d !== number);

        const options = shuffle([number, ...distractors.slice(0, 3)]);

        return {
            text: q.text,
            type: 'multiple_choice',
            options: options,
            answer: q.answer.toString(),
            hint: `Calculate the sum of the parts`,
            module: 'N04_Y3_NPV',
            level: level
        };
    } else {
        // Text input for partition
        return {
            text: q.text,
            type: 'text_input',
            answer: q.answer,
            hint: `Break the number into place values`,
            module: 'N04_Y3_NPV',
            level: level
        };
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'N04_Y3_NPV',
    generate: generateQuestion
};
