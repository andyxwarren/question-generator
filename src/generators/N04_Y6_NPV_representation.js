/**
 * Year 6 Round to Any Degree of Accuracy Generator
 *
 * Module: N04_Y6_NPV - "Round any whole number to a required degree of accuracy"
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
        case 'round_to_million':
            return generateRounding(params, level, 1000000);
        case 'round_to_ten_million':
            return generateRounding(params, level, 10000000);
        case 'round_to_any_place':
            return generateRoundToAnyPlace(params, level);
        case 'estimate_calculation':
            return generateEstimateCalculation(params, level);
        case 'compare_rounded':
            return generateCompareRounded(params, level);
        case 'choose_appropriate_rounding':
            return generateChooseAppropriateRounding(params, level);
        case 'error_bounds':
            return generateErrorBounds(params, level);
        case 'estimate_position':
            return generateEstimatePosition(params, level);
        default:
            return generateRounding(params, level, 1000000);
    }
}

/**
 * Standard rounding question
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
        100000: 'nearest hundred thousand',
        1000000: 'nearest million',
        10000000: 'nearest ten million'
    }[base] || 'nearest place';

    return {
        text: `Round ${formatNumber(number)} to the ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Look at the digit to the right of the place you're rounding to`,
        module: 'N04_Y6_NPV',
        level: level
    };
}

/**
 * Round to any specified place value
 */
function generateRoundToAnyPlace(params, level) {
    const { min_value, max_value, rounding_bases } = params;

    const base = randomChoice(rounding_bases);
    const number = generateNonMultiple(min_value + base, max_value - base, base);
    const rounded = roundToNearest(number, base);

    const distractors = generateRoundingDistractors(number, base);
    const options = shuffle([rounded, ...distractors.slice(0, 3)]);

    // Express the place value as a power of 10
    const baseName = formatNumber(base);

    return {
        text: `Round ${formatNumber(number)} to the nearest ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Identify which place value you're rounding to, then look at the digit to its right`,
        module: 'N04_Y6_NPV',
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
    const operation = randomChoice(['add', 'subtract', 'multiply']);

    const estimate = calculateRoughEstimate(num1, num2, operation);

    // Generate distractors
    let exact;
    switch(operation) {
        case 'add': exact = num1 + num2; break;
        case 'subtract': exact = num1 - num2; break;
        case 'multiply': exact = num1 * num2; break;
        default: exact = num1 + num2;
    }

    const distractors = [
        exact,
        estimate + 100000,
        estimate - 100000,
        Math.round(exact / 1000000) * 1000000
    ].filter(d => d !== estimate && d > 0);

    const options = shuffle([estimate, ...distractors.slice(0, 3)]);

    const opSymbol = { 'add': '+', 'subtract': '-', 'multiply': '×' }[operation];

    return {
        text: `Estimate ${formatNumber(num1)} ${opSymbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round both numbers to make the calculation easier`,
        module: 'N04_Y6_NPV',
        level: level
    };
}

/**
 * Compare rounded values
 */
function generateCompareRounded(params, level) {
    const { min_value, max_value, rounding_bases } = params;

    const base = randomChoice(rounding_bases.filter(b => b >= 1000));
    const num1 = generateNonMultiple(min_value, max_value, base);
    const num2 = generateNonMultiple(min_value, max_value, base);

    const rounded1 = roundToNearest(num1, base);
    const rounded2 = roundToNearest(num2, base);

    const baseName = formatNumber(base);

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
                  `What is the difference between the rounded numbers?`,
            answer: Math.abs(larger - smaller)
        }
    ];

    const q = randomChoice(questions);

    if (q.text.includes('difference')) {
        const distractors = [
            Math.abs(num1 - num2),
            q.answer + base,
            q.answer - base
        ].filter(d => d !== q.answer && d > 0);

        const options = shuffle([q.answer, ...distractors.slice(0, 3)]);

        return {
            text: q.text,
            type: 'multiple_choice',
            options: options,
            answer: q.answer.toString(),
            hint: `Round both numbers first, then find the difference`,
            module: 'N04_Y6_NPV',
            level: level
        };
    } else {
        return {
            text: q.text,
            type: 'multiple_choice',
            options: [rounded1, rounded2],
            answer: q.answer.toString(),
            hint: `Round both numbers first, then compare`,
            module: 'N04_Y6_NPV',
            level: level
        };
    }
}

/**
 * Choose appropriate rounding for a context
 */
function generateChooseAppropriateRounding(params, level) {
    const { min_value, max_value } = params;

    const contexts = ['population', 'money', 'distance', 'time'];
    const context = randomChoice(contexts);

    const number = randomInt(min_value, max_value);
    const appropriateBase = chooseAppropriateRoundingBase(context, number);

    // Generate context-specific question
    const contextQuestions = {
        'population': `The population of a city is ${formatNumber(number)}. ` +
                     `To what place value should this be rounded for a news report?`,
        'money': `A company's revenue is £${formatNumber(number)}. ` +
                `To what place value should this be rounded for a summary?`,
        'distance': `A distance is ${formatNumber(number)} metres. ` +
                   `To what place value should this be rounded for estimation?`,
        'time': `An event lasted ${formatNumber(number)} seconds. ` +
               `To what place value should this be rounded for reporting?`
    };

    const options = [
        10,
        100,
        1000,
        10000,
        100000,
        1000000
    ].filter(b => b <= max_value);

    return {
        text: contextQuestions[context],
        type: 'multiple_choice',
        options: options.map(b => formatNumber(b)),
        answer: formatNumber(appropriateBase),
        hint: `Think about which level of accuracy makes sense for this context`,
        module: 'N04_Y6_NPV',
        level: level
    };
}

/**
 * Error bounds question
 */
function generateErrorBounds(params, level) {
    const { min_value, max_value, rounding_bases } = params;

    const base = randomChoice(rounding_bases.filter(b => b >= 1000));
    const rounded = randomInt(
        Math.ceil(min_value / base) * base,
        Math.floor(max_value / base) * base
    );

    const [lowerBound, upperBound] = getErrorBounds(rounded, base);

    const baseName = formatNumber(base);

    const questions = [
        {
            text: `A number rounded to the nearest ${baseName} is ${formatNumber(rounded)}. ` +
                  `What is the smallest whole number it could have been?`,
            answer: Math.ceil(lowerBound)
        },
        {
            text: `A number rounded to the nearest ${baseName} is ${formatNumber(rounded)}. ` +
                  `What is the largest whole number it could have been?`,
            answer: Math.floor(upperBound)
        }
    ];

    const q = randomChoice(questions);

    const distractors = [
        rounded,
        rounded - base,
        rounded + base,
        q.answer + base,
        q.answer - base
    ].filter(d => d !== q.answer);

    const options = shuffle([q.answer, ...distractors.slice(0, 3)]);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: options,
        answer: q.answer.toString(),
        hint: `Think about the range of numbers that round to this value`,
        module: 'N04_Y6_NPV',
        level: level
    };
}

/**
 * Estimate position on number line
 */
function generateEstimatePosition(params, level) {
    const { min_value, max_value, estimation_ranges } = params;

    const number = randomInt(min_value, max_value);

    // Find which range it falls into
    const correctRange = estimation_ranges.find(([min, max]) =>
        number >= min && number <= max
    );

    if (!correctRange) {
        return generateRounding(params, level, 1000000);
    }

    const formatRange = (range) =>
        `${formatNumber(range[0])} to ${formatNumber(range[1])}`;

    const options = estimation_ranges.map(r => formatRange(r));

    return {
        text: `Which range best estimates ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: formatRange(correctRange),
        hint: `Find which range the number falls between`,
        module: 'N04_Y6_NPV',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'N04_Y6_NPV',
    generate: generateQuestion
};
