/**
 * Year 4 Identify, Represent, Estimate and Round Generator
 *
 * Module: N04_Y4_NPV - "Identify, represent and estimate numbers using different representations;
 *                       round any number to the nearest 10, 100 or 1,000"
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    generateNumberLineText,
    describeNumberLinePosition,
    generateNumberLineMarks,
    findClosestMark,
    generateEstimationText,
    findRange,
    formatRange,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    calculateMidpoint
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
        case 'estimate_position':
            return generateEstimatePosition(params, level);
        case 'round_to_ten':
            return generateRounding(params, level, 10);
        case 'round_to_hundred':
            return generateRounding(params, level, 100);
        case 'round_to_thousand':
            return generateRounding(params, level, 1000);
        case 'place_value_representation':
            return generatePlaceValueQuestion(params, level);
        case 'partition_number':
            return generatePartitionNumber(params, level);
        case 'estimate_calculation':
            return generateEstimateCalculation(params, level);
        case 'estimate_midpoint':
            return generateEstimateMidpoint(params, level);
        case 'compare_rounded':
            return generateCompareRounded(params, level);
        case 'number_line_jump':
            return generateNumberLineJump(params, level);
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
        false
    );

    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Calculate the position using the scale',
        module: 'N04_Y4_NPV',
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
        module: 'N04_Y4_NPV',
        level: level
    };
}

/**
 * Rounding question
 */
function generateRounding(params, level, base) {
    const { min_value, max_value } = params;

    // Generate a number that's NOT a multiple of base
    const number = generateNonMultiple(min_value + base, max_value - base, base);
    const rounded = roundToNearest(number, base);

    // Generate distractors
    const distractors = generateRoundingDistractors(number, base);
    const options = shuffle([rounded, ...distractors.slice(0, 3)]);

    const baseName = base === 10 ? 'nearest 10' : base === 100 ? 'nearest 100' : 'nearest 1,000';

    return {
        text: `Round ${formatNumber(number)} to the ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Look at the digit to the right of the place you're rounding to`,
        module: 'N04_Y4_NPV',
        level: level
    };
}

/**
 * Place value representation
 */
function generatePlaceValueQuestion(params, level) {
    const { min_value, max_value } = params;

    const number = randomInt(min_value, max_value);
    const representation = generatePlaceValueRepresentation(number);

    // Choose a place value to ask about
    const places = Object.keys(representation);
    const chosenPlace = randomChoice(places);
    const value = representation[chosenPlace];

    // Generate distractors
    const allValues = Object.values(representation);
    const distractors = allValues.filter(v => v !== value);

    // Add the digit itself as a distractor (without place value)
    const placeValues = { 'ones': 1, 'tens': 10, 'hundreds': 100, 'thousands': 1000, 'ten_thousands': 10000 };
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
        module: 'N04_Y4_NPV',
        level: level
    };
}

/**
 * Partition number question
 */
function generatePartitionNumber(params, level) {
    const { min_value, max_value } = params;

    const number = randomInt(min_value, max_value);
    const partitionedText = generatePartitionText(number);

    return {
        text: `Write ${formatNumber(number)} as a sum of its place values`,
        type: 'text_input',
        answer: partitionedText.replace(/\s/g, ''), // Remove spaces for comparison
        hint: `Break the number into hundreds, tens, and ones`,
        module: 'N04_Y4_NPV',
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
        estimate + 100,
        estimate - 100,
        Math.round(exact / 100) * 100
    ].filter(d => d !== estimate);

    const options = shuffle([estimate, ...distractors.slice(0, 3)]);

    const questionText = generateEstimationCalculationText(num1, num2, operation);

    return {
        text: questionText,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round the numbers first, then calculate`,
        module: 'N04_Y4_NPV',
        level: level
    };
}

/**
 * Estimate midpoint
 */
function generateEstimateMidpoint(params, level) {
    const { min_value, max_value } = params;

    const num1 = randomInt(min_value, max_value - 100);
    const num2 = num1 + randomInt(100, 500);

    const midpoint = calculateMidpoint(num1, num2);

    // Generate distractors
    const distractors = [
        midpoint + 50,
        midpoint - 50,
        Math.round((num1 + num2) / 3), // Third point
        num1 + 100
    ].filter(d => d !== midpoint);

    const options = shuffle([midpoint, ...distractors.slice(0, 3)]);

    return {
        text: `What number is approximately halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'multiple_choice',
        options: options,
        answer: midpoint.toString(),
        hint: `Find the middle by adding and dividing by 2`,
        module: 'N04_Y4_NPV',
        level: level
    };
}

/**
 * Compare rounded values
 */
function generateCompareRounded(params, level) {
    const { min_value, max_value, rounding_bases } = params;

    const base = randomChoice(rounding_bases);
    const num1 = generateNonMultiple(min_value, max_value, base);
    const num2 = generateNonMultiple(min_value, max_value, base);

    const rounded1 = roundToNearest(num1, base);
    const rounded2 = roundToNearest(num2, base);

    const baseName = base === 10 ? '10' : base === 100 ? '100' : '1,000';

    const larger = Math.max(rounded1, rounded2);
    const smaller = Math.min(rounded1, rounded2);

    const questions = [
        {
            text: `Round ${formatNumber(num1)} and ${formatNumber(num2)} to the nearest ${baseName}. ` +
                  `Which rounded number is larger?`,
            answer: larger
        },
        {
            text: `Round ${formatNumber(num1)} and ${formatNumber(num2)} to the nearest ${baseName}. ` +
                  `Which rounded number is smaller?`,
            answer: smaller
        }
    ];

    const q = randomChoice(questions);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [rounded1, rounded2],
        answer: q.answer.toString(),
        hint: `Round both numbers first, then compare`,
        module: 'N04_Y4_NPV',
        level: level
    };
}

/**
 * Number line jump question
 */
function generateNumberLineJump(params, level, attempt = 0) {
    const MAX_ATTEMPTS = 10;
    const { number_line_max } = params;

    const start = randomInt(0, number_line_max - 500);
    const jump = randomChoice([10, 50, 100, 200]);
    const numJumps = randomInt(2, 5);
    const end = start + (jump * numJumps);

    if (end > number_line_max) {
        if (attempt >= MAX_ATTEMPTS) {
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
        hint: `Multiply the jump size by the number of jumps, then add to start`,
        module: 'N04_Y4_NPV',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'N04_Y4_NPV',
    generate: generateQuestion
};
