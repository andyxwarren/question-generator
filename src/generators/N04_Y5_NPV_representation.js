/**
 * Year 5 Round to 1,000,000 Generator
 *
 * Module: N04_Y5_NPV - "Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000"
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    generateNumberLineMarks,
    findClosestMark,
    generateEstimationText,
    findRange,
    formatRange,
    calculateRoughEstimate,
    chooseAppropriateRoundingBase
} from './helpers/N04_representationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'round_to_thousand':
            return generateRounding(params, level, 1000);
        case 'round_to_ten_thousand':
            return generateRounding(params, level, 10000);
        case 'round_to_hundred_thousand':
            return generateRounding(params, level, 100000);
        case 'estimate_position':
            return generateEstimatePosition(params, level);
        case 'estimate_calculation':
            return generateEstimateCalculation(params, level);
        case 'compare_rounded':
            return generateCompareRounded(params, level);
        case 'choose_appropriate_rounding':
            return generateChooseAppropriateRounding(params, level);
        case 'number_line_position':
            return generateNumberLinePosition(params, level);
        case 'number_line_jump':
            return generateNumberLineJump(params, level);
        default:
            return generateRounding(params, level, 1000);
    }
}

/**
 * Rounding question
 */
function generateRounding(params, level, base) {
    const { min_value, max_value } = params;

    const number = generateNonMultiple(min_value + base, max_value - base, base);
    const rounded = roundToNearest(number, base);

    const distractors = generateRoundingDistractors(number, base);
    const options = shuffle([rounded, ...distractors.slice(0, 3)]);

    const baseName = {
        1000: 'nearest thousand',
        10000: 'nearest ten thousand',
        100000: 'nearest hundred thousand'
    }[base] || 'nearest place';

    return {
        text: `Round ${formatNumber(number)} to the ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Look at the digit to the right of the place you're rounding to`,
        module: 'N04_Y5_NPV',
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
        return generateRounding(params, level, 1000);
    }

    const options = estimation_ranges.map(r => formatRange(r));

    return {
        text: generateEstimationText(number, estimation_ranges),
        type: 'multiple_choice',
        options: options,
        answer: formatRange(correctRange),
        hint: `Think about which range ${formatNumber(number)} falls between`,
        module: 'N04_Y5_NPV',
        level: level
    };
}

/**
 * Estimate calculation with large numbers
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
        estimate + 10000,
        estimate - 10000,
        Math.round(exact / 10000) * 10000
    ].filter(d => d !== estimate && d > 0);

    const options = shuffle([estimate, ...distractors.slice(0, 3)]);

    const opSymbol = operation === 'add' ? '+' : '-';

    return {
        text: `Estimate ${formatNumber(num1)} ${opSymbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round both numbers to make the calculation easier`,
        module: 'N04_Y5_NPV',
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

    const baseName = {
        1000: 'thousand',
        10000: 'ten thousand',
        100000: 'hundred thousand'
    }[base] || formatNumber(base);

    // Ensure they're different when rounded
    if (rounded1 === rounded2) {
        return generateCompareRounded(params, level);
    }

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
        module: 'N04_Y5_NPV',
        level: level
    };
}

/**
 * Choose appropriate rounding for a context
 */
function generateChooseAppropriateRounding(params, level) {
    const { min_value, max_value } = params;

    const contexts = ['population', 'money', 'distance'];
    const context = randomChoice(contexts);

    const number = randomInt(min_value, max_value);
    const appropriateBase = chooseAppropriateRoundingBase(context, number);

    // Generate context-specific question
    const contextQuestions = {
        'population': `The population of a country is ${formatNumber(number)}. ` +
                     `To what place value should this be rounded for a summary?`,
        'money': `A company's annual revenue is £${formatNumber(number)}. ` +
                `To what place value should this be rounded for reporting?`,
        'distance': `A distance is ${formatNumber(number)} metres. ` +
                   `To what place value should this be rounded for estimation?`
    };

    const options = [
        100,
        1000,
        10000,
        100000
    ].filter(b => b <= max_value);

    return {
        text: contextQuestions[context],
        type: 'multiple_choice',
        options: options.map(b => formatNumber(b)),
        answer: formatNumber(appropriateBase),
        hint: `Think about which level of accuracy makes sense for this context`,
        module: 'N04_Y5_NPV',
        level: level
    };
}

/**
 * Number line position question
 */
function generateNumberLinePosition(params, level) {
    const { min_value, max_value, number_line_max } = params;

    const lineMin = 0;
    const lineMax = number_line_max;

    const number = randomInt(min_value, Math.min(max_value, lineMax));

    const marks = generateNumberLineMarks(lineMin, lineMax, 10);
    const visibleMarks = [marks[0], marks[5], marks[10]];

    // Generate options
    const correctMark = findClosestMark(number, marks);
    const distractors = marks.filter(m => m !== correctMark).slice(0, 3);
    const options = shuffle([number, ...distractors]);

    return {
        text: `A number line goes from ${formatNumber(lineMin)} to ${formatNumber(lineMax)}. ` +
              `Marks are shown at ${visibleMarks.map(m => formatNumber(m)).join(', ')}. ` +
              `Which number is approximately ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Think about where ${formatNumber(number)} sits between the marks`,
        module: 'N04_Y5_NPV',
        level: level
    };
}

/**
 * Number line jump question
 */
function generateNumberLineJump(params, level) {
    const { number_line_max } = params;

    const start = randomInt(0, number_line_max - 50000);
    const jump = randomChoice([1000, 5000, 10000]);
    const numJumps = randomInt(2, 5);
    const end = start + (jump * numJumps);

    if (end > number_line_max) {
        return generateNumberLineJump(params, level);
    }

    return {
        text: `Start at ${formatNumber(start)} on a number line. ` +
              `Jump forward ${numJumps} times, each jump of ${formatNumber(jump)}. ` +
              `Where do you land?`,
        type: 'text_input',
        answer: end.toString(),
        hint: `Multiply ${formatNumber(jump)} by ${numJumps}, then add to ${formatNumber(start)}`,
        module: 'N04_Y5_NPV',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'N04_Y5_NPV',
    generate: generateQuestion
};
