/**
 * Year 2 Identify, Represent and Estimate Numbers Generator
 *
 * Module: N04_Y2_NPV - "Identify, represent and estimate numbers using different representations,
 *                       including the number line"
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
        case 'estimate_group':
            return generateEstimateGroup(params, level);
        case 'place_value_representation':
            return generatePlaceValueQuestion(params, level);
        case 'estimate_position':
            return generateEstimatePosition(params, level);
        case 'partition_number':
            return generatePartitionNumber(params, level);
        case 'estimate_calculation':
            return generateEstimateCalculation(params, level);
        case 'number_line_multiple_positions':
            return generateNumberLineMultiplePositions(params, level);
        default:
            return generateNumberLinePosition(params, level);
    }
}

/**
 * Number line position question
 */
function generateNumberLinePosition(params, level) {
    const { number_line_max } = params;

    const targetNumber = randomInt(0, number_line_max);
    const numberLineHTML = createSimpleNumberLineHTML(
        0,
        number_line_max,
        targetNumber,
        level === 1  // Only show all labels at level 1
    );

    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Look at the position between the marked numbers',
        module: 'N04_Y2_NPV',
        level: level
    };
}

/**
 * Number line between two numbers
 */
function generateNumberLineBetween(params, level) {
    const { number_line_max } = params;

    const range = number_line_max;
    const point1 = randomInt(Math.floor(range * 0.3), Math.floor(range * 0.4));
    const point2 = randomInt(Math.floor(range * 0.6), Math.floor(range * 0.7));

    const numberLineHTML = createSimpleNumberLineHTML(0, number_line_max, null, true);

    return {
        text: `Name a number that lies between ${formatNumber(point1)} and ${formatNumber(point2)} on this number line:\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(randomInt(point1 + 1, point2 - 1)), // Any valid number
        acceptableRange: { min: point1 + 1, max: point2 - 1 }, // For validator to check
        hint: 'Choose any number greater than the first and less than the second',
        module: 'N04_Y2_NPV',
        level: level
    };
}

/**
 * Number line jump question
 */
function generateNumberLineJump(params, level, attempt = 0) {
    const MAX_ATTEMPTS = 10;
    const { number_line_max } = params;

    const start = randomInt(0, number_line_max - 30);
    const jump = randomChoice([2, 5, 10]);
    const numJumps = randomInt(2, 4);
    const end = start + (jump * numJumps);

    // Ensure end is within bounds
    if (end > number_line_max) {
        if (attempt >= MAX_ATTEMPTS) {
            // Fallback to number line position
            return generateNumberLinePosition(params, level);
        }
        return generateNumberLineJump(params, level, attempt + 1);
    }

    return {
        text: `Start at ${start} on a number line. ` +
              `Jump forward ${numJumps} times, each jump of ${jump}. ` +
              `Where do you land?`,
        type: 'text_input',
        answer: end.toString(),
        hint: `Multiply ${jump} by ${numJumps}, then add to ${start}`,
        module: 'N04_Y2_NPV',
        level: level
    };
}

/**
 * Estimate group size
 */
function generateEstimateGroup(params, level) {
    const { min_value, max_value } = params;

    const actualCount = randomInt(min_value, max_value);

    // Generate estimation options around the actual count
    const offset = Math.floor(max_value / 10);
    const options = [
        actualCount,
        Math.max(min_value, actualCount - offset),
        Math.min(max_value, actualCount + offset),
        Math.max(min_value, actualCount - Math.floor(offset / 2)),
        Math.min(max_value, actualCount + Math.floor(offset / 2))
    ];

    const shuffledOptions = shuffle(Array.from(new Set(options)).slice(0, 4));

    return {
        text: `About how many objects are there if you see a group that's close to ${actualCount}?`,
        type: 'multiple_choice',
        options: shuffledOptions,
        answer: actualCount.toString(),
        hint: `Look for the number closest to what you'd estimate`,
        module: 'N04_Y2_NPV',
        level: level
    };
}

/**
 * Place value representation
 */
function generatePlaceValueQuestion(params, level, attempt = 0) {
    const MAX_ATTEMPTS = 10;
    const { min_value, max_value, place_value_max } = params;

    const number = randomInt(min_value, Math.min(max_value, place_value_max));
    const representation = generatePlaceValueRepresentation(number);

    // Choose a place value to ask about
    const places = Object.keys(representation);
    if (places.length === 0) {
        // If number is 0 or has no place values, try again
        if (attempt >= MAX_ATTEMPTS) {
            // Fallback to number line position
            return generateNumberLinePosition(params, level);
        }
        return generatePlaceValueQuestion(params, level, attempt + 1);
    }

    const chosenPlace = randomChoice(places);
    const value = representation[chosenPlace];

    // Generate distractors
    const allValues = Object.values(representation);
    const distractors = allValues.filter(v => v !== value);

    // Add the digit itself as a distractor (without place value)
    const placeValues = { 'ones': 1, 'tens': 10, 'hundreds': 100 };
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
        module: 'N04_Y2_NPV',
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
        // Fallback if ranges don't cover the number
        return generateNumberLinePosition(params, level);
    }

    // Create options from all ranges
    const options = estimation_ranges.map(r => formatRange(r));

    return {
        text: generateEstimationText(number, estimation_ranges),
        type: 'multiple_choice',
        options: options,
        answer: formatRange(correctRange),
        hint: `Think about which range ${formatNumber(number)} falls between`,
        module: 'N04_Y2_NPV',
        level: level
    };
}

/**
 * Partition number question
 */
function generatePartitionNumber(params, level) {
    const { min_value, max_value, place_value_max } = params;

    const number = randomInt(Math.max(min_value, 10), Math.min(max_value, place_value_max));
    const partitionedText = generatePartitionText(number);

    return {
        text: `Write ${formatNumber(number)} as a sum of its place values`,
        type: 'text_input',
        answer: partitionedText.replace(/\s/g, ''), // Remove spaces for comparison
        hint: `Break the number into tens and ones`,
        module: 'N04_Y2_NPV',
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

    // Generate distractors
    const exact = operation === 'add' ? num1 + num2 : num1 - num2;
    const distractors = [
        exact,
        estimate + 10,
        estimate - 10,
        Math.round(exact / 10) * 10
    ].filter(d => d !== estimate && d >= 0);

    const options = shuffle([estimate, ...distractors.slice(0, 3)]);

    const questionText = generateEstimationCalculationText(num1, num2, operation);

    return {
        text: questionText,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round the numbers first, then calculate`,
        module: 'N04_Y2_NPV',
        level: level
    };
}

/**
 * Number line multiple positions
 */
function generateNumberLineMultiplePositions(params, level) {
    const { number_line_max } = params;

    // Generate 3 numbers to identify on the line
    const numbers = generateUniqueNumbers(3, 0, number_line_max);
    const targetNumber = randomChoice(numbers);

    // Generate marks on the number line
    const marks = generateNumberLineMarks(0, number_line_max, 10);

    // Generate options around the target
    const correctMark = findClosestMark(targetNumber, marks);
    const distractors = marks.filter(m => m !== correctMark).slice(0, 3);
    const options = shuffle([targetNumber, ...distractors]);

    return {
        text: `On a number line from 0 to ${number_line_max}, ` +
              `three numbers are marked: ${numbers.map(n => formatNumber(n)).join(', ')}. ` +
              `Which position shows ${formatNumber(targetNumber)}?`,
        type: 'multiple_choice',
        options: options,
        answer: targetNumber.toString(),
        hint: `Find the position of ${formatNumber(targetNumber)} on the line`,
        module: 'N04_Y2_NPV',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'N04_Y2_NPV',
    generate: generateQuestion
};
