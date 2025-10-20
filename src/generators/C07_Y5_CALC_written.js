/**
 * Year 5 Written Multiplication and Division Generator
 *
 * Module: C07_Y5_CALC - "Multiply numbers up to 4 digits by a one- or two-digit number using a
 *                        formal written method, including long multiplication for two-digit numbers;
 *                        divide numbers up to 4 digits by a one-digit number using the formal
 *                        written method of short division and interpret remainders appropriately
 *                        for the context"
 *
 * This generator focuses on:
 * - Long multiplication (×2-digit numbers)
 * - Short division with remainders
 * - Interpreting remainders in context
 * - Multiplication up to 4 digits × 1 or 2 digits
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    formatColumnarMultiply,
    formatLongMultiplication,
    generateWithCarryMultiplication
} from './helpers/C07_multiplicationHelpers.js';

import {
    formatShortDivision,
    divideWithRemainder,
    remainderAsFraction,
    generateDivisionWithRemainder,
    generateExactDivision,
    interpretRemainder,
    createRemainderContext
} from './helpers/C07_divisionHelpers.js';

import {
    getRandomName,
    getRandomItem
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'columnar_multiply_1digit':
            return generateColumnarMultiply1Digit(params, level);
        case 'long_multiply_2digit':
            return generateLongMultiply2Digit(params, level);
        case 'short_division':
            return generateShortDivision(params, level);
        case 'division_with_remainder':
            return generateDivisionWithRemainderQuestion(params, level);
        case 'interpret_remainder_context':
            return generateInterpretRemainderContext(params, level);
        case 'missing_digit_long_mult':
            return generateMissingDigitLongMult(params, level);
        case 'estimate_check':
            return generateEstimateCheck(params, level);
        default:
            return generateColumnarMultiply1Digit(params, level);
    }
}

/**
 * OPERATION 1: Columnar Multiply 1-Digit
 * Standard multiplication up to 4-digit × 1-digit
 */
function generateColumnarMultiply1Digit(params, level) {
    const digitCount = randomChoice(params.digit_count_multiply);

    let minMultiplicand, maxMultiplicand;
    if (digitCount === 2) {
        minMultiplicand = 11;
        maxMultiplicand = 99;
    } else if (digitCount === 3) {
        minMultiplicand = 100;
        maxMultiplicand = 999;
    } else {
        minMultiplicand = 1000;
        maxMultiplicand = 9999;
    }

    minMultiplicand = Math.max(minMultiplicand, params.multiply_range[0]);
    maxMultiplicand = Math.min(maxMultiplicand, params.multiply_range[1]);

    const multiplicand = randomInt(minMultiplicand, maxMultiplicand);
    const multiplier = randomInt(params.multiply_by[0], params.multiply_by[1]);

    const answer = multiplicand * multiplier;

    const columnarDisplay = formatColumnarMultiply(multiplicand, multiplier, false);

    const text = `Calculate using the formal written method:<br><br>${columnarDisplay}`;

    const distractors = generateDistractors(answer, 3, 100, 100000, 500);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiply each digit by ${multiplier}, carrying where necessary`,
        module: 'C07_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Long Multiply 2-Digit
 * Formal long multiplication method for ×2-digit numbers
 */
function generateLongMultiply2Digit(params, level) {
    const digitCount = randomChoice(params.digit_count_multiply || [2, 3]);

    let minMultiplicand, maxMultiplicand;
    if (digitCount === 2) {
        minMultiplicand = 11;
        maxMultiplicand = 99;
    } else if (digitCount === 3) {
        minMultiplicand = 100;
        maxMultiplicand = 999;
    } else {
        minMultiplicand = 1000;
        maxMultiplicand = 9999;
    }

    minMultiplicand = Math.max(minMultiplicand, params.multiply_range[0]);
    maxMultiplicand = Math.min(maxMultiplicand, params.multiply_range[1]);

    const multiplicand = randomInt(minMultiplicand, maxMultiplicand);
    const multiplier = randomInt(params.multiply_by_2digit[0], params.multiply_by_2digit[1]);

    const answer = multiplicand * multiplier;

    const longMultDisplay = formatLongMultiplication(multiplicand, multiplier, false);

    const text = `Calculate using long multiplication:<br><br>${longMultDisplay}`;

    const distractors = generateDistractors(answer, 3, 500, 1000000, 1000);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiply by the ones digit, then by the tens digit (shifted one place), then add`,
        module: 'C07_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Short Division
 * Formal short division method (no remainder or exact)
 */
function generateShortDivision(params, level) {
    const result = generateExactDivision(
        params.divide_range[0],
        params.divide_range[1],
        params.divide_by[0],
        params.divide_by[1]
    );

    const dividend = result.dividend;
    const divisor = result.divisor;
    const answer = result.quotient;

    const divisionDisplay = formatShortDivision(dividend, divisor, false);

    const text = `Calculate using short division:<br><br>${divisionDisplay}`;

    const distractors = generateDistractors(answer, 3, 5, 1000, 10);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Divide each digit by ${divisor}, starting from the left`,
        module: 'C07_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Division with Remainder
 * Short division with remainder expressed as whole number
 */
function generateDivisionWithRemainderQuestion(params, level) {
    const result = generateDivisionWithRemainder(
        params.divide_range[0],
        params.divide_range[1],
        params.divide_by[0],
        params.divide_by[1]
    );

    const dividend = result.dividend;
    const divisor = result.divisor;
    const quotient = result.quotient;
    const remainder = result.remainder;

    const divisionDisplay = formatShortDivision(dividend, divisor, false);

    const text = `Calculate using short division. Give your answer with a remainder:<br><br>${divisionDisplay}`;

    const correctAnswer = `${quotient} r ${remainder}`;

    // Generate wrong options
    const wrongOptions = [
        `${quotient}`,  // Forgot remainder
        `${quotient + 1}`,  // Rounded up incorrectly
        `${quotient} r ${(remainder + 1) % divisor}`  // Wrong remainder
    ];

    const options = shuffle([correctAnswer, ...wrongOptions]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}`,
        module: 'C07_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Interpret Remainder in Context
 * Understand how to interpret remainders based on real-world context
 */
function generateInterpretRemainderContext(params, level) {
    const contextTypes = ['round_up', 'round_down', 'as_fraction', 'exact_remainder'];
    const contextType = randomChoice(contextTypes);

    const result = generateDivisionWithRemainder(
        params.divide_range[0],
        Math.min(params.divide_range[1], 200),  // Keep manageable for word problems
        params.divide_by[0],
        params.divide_by[1]
    );

    const dividend = result.dividend;
    const divisor = result.divisor;
    const quotient = result.quotient;
    const remainder = result.remainder;

    const context = createRemainderContext(contextType);
    const scenario = randomChoice(context.scenarios);

    const name = getRandomName();
    const item = getRandomItem();

    let text, correctAnswer;

    if (contextType === 'round_up') {
        text = `${name} has ${dividend} ${item}. Each bag holds ${divisor} ${item}. How many bags are needed to hold all the ${item}?`;
        correctAnswer = quotient + 1;
    } else if (contextType === 'round_down') {
        text = `${dividend} children are divided into teams of ${divisor}. How many complete teams can be made?`;
        correctAnswer = quotient;
    } else if (contextType === 'as_fraction') {
        text = `${dividend} cakes are shared equally between ${divisor} people. How much does each person get? (Give your answer as a mixed number)`;
        correctAnswer = `${quotient} ${remainderAsFraction(remainder, divisor)}`;
    } else {
        text = `${name} has ${dividend} ${item}. They put ${divisor} into each box. How many are left over?`;
        correctAnswer = remainder;
    }

    // Generate distractors based on context
    let distractors;
    if (contextType === 'round_up') {
        distractors = [quotient, quotient + 2, Math.ceil(dividend / (divisor + 1))];
    } else if (contextType === 'round_down') {
        distractors = [quotient + 1, quotient - 1, Math.floor(dividend / (divisor - 1))];
    } else if (contextType === 'as_fraction') {
        distractors = [
            `${quotient}`,
            `${quotient + 1}`,
            `${quotient} ${remainder}/${divisor + 1}`
        ];
    } else {
        distractors = generateDistractors(remainder, 3, 0, divisor - 1);
    }

    const options = shuffle([correctAnswer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options.map(String),
        answer: correctAnswer.toString(),
        hint: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}`,
        module: 'C07_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Missing Digit in Long Multiplication
 * Fill in missing digit in long multiplication layout
 */
function generateMissingDigitLongMult(params, level) {
    const multiplicand = randomInt(params.multiply_range[0], Math.min(params.multiply_range[1], 999));
    const multiplier = randomInt(params.multiply_by_2digit[0], params.multiply_by_2digit[1]);
    const product = multiplicand * multiplier;

    // Hide a digit from the final product
    const productStr = product.toString();
    const hiddenIndex = randomInt(0, productStr.length - 1);
    const hiddenDigit = productStr[hiddenIndex];
    const displayProduct = productStr.substring(0, hiddenIndex) + '?' + productStr.substring(hiddenIndex + 1);

    const text = `Find the missing digit in this long multiplication:<br><br><pre class="columnar-calc">  ${multiplicand}
× ${multiplier}
────
  ${displayProduct}</pre>`;

    const answer = parseInt(hiddenDigit);

    const distractors = generateDistractors(answer, 3, 0, 9);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Calculate ${multiplicand} × ${multiplier} to find the missing digit`,
        module: 'C07_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Estimate and Check
 * Estimate calculation and check if answer is reasonable
 */
function generateEstimateCheck(params, level) {
    const multiplicand = randomInt(params.multiply_range[0], Math.min(params.multiply_range[1], 999));
    const multiplier = randomInt(params.multiply_by[0], params.multiply_by[1]);

    const exactAnswer = multiplicand * multiplier;

    // Round multiplicand to nearest 10, 100, or 1000
    let roundedMultiplicand;
    if (multiplicand < 100) {
        roundedMultiplicand = Math.round(multiplicand / 10) * 10;
    } else if (multiplicand < 1000) {
        roundedMultiplicand = Math.round(multiplicand / 100) * 100;
    } else {
        roundedMultiplicand = Math.round(multiplicand / 1000) * 1000;
    }

    const estimate = roundedMultiplicand * multiplier;

    const text = `Estimate ${multiplicand} × ${multiplier} by rounding ${multiplicand}.<br><br>What is a good estimate?`;

    const distractors = generateDistractors(estimate, 3, 500, 100000, 1000);
    const options = shuffle([estimate, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round ${multiplicand} to ${roundedMultiplicand}, then multiply by ${multiplier}`,
        module: 'C07_Y5_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y5_CALC',
    generate: generateQuestion
};
