/**
 * Year 6 Written Multiplication and Division Generator
 *
 * Module: C07_Y6_CALC - "Multiply multi-digit numbers up to 4 digits by a two-digit whole number
 *                        using the formal written method of long multiplication; divide numbers up
 *                        to 4 digits by a two-digit whole number using the formal written method of
 *                        long division, and interpret remainders as whole number remainders,
 *                        fractions, or by rounding, as appropriate for the context"
 *
 * This generator focuses on:
 * - Long multiplication up to 4-digit × 2-digit
 * - Long division by 2-digit numbers
 * - Advanced remainder interpretation (fractions, decimals, rounding)
 * - Choosing appropriate written methods
 * - Multi-step problems with division
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    formatLongMultiplication
} from './helpers/C07_multiplicationHelpers.js';

import {
    formatShortDivision,
    formatLongDivision,
    divideWithRemainder,
    remainderAsFraction,
    divisionAsDecimal,
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
        case 'long_multiply_2digit':
            return generateLongMultiply2Digit(params, level);
        case 'long_division':
            return generateLongDivision(params, level);
        case 'remainder_as_whole':
            return generateRemainderAsWhole(params, level);
        case 'remainder_as_fraction':
            return generateRemainderAsFraction(params, level);
        case 'remainder_by_rounding':
            return generateRemainderByRounding(params, level);
        case 'choose_remainder_form':
            return generateChooseRemainderForm(params, level);
        case 'missing_digit_long_div':
            return generateMissingDigitLongDiv(params, level);
        case 'short_vs_long_division':
            return generateShortVsLongDivision(params, level);
        case 'multi_step_with_division':
            return generateMultiStepWithDivision(params, level);
        case 'estimate_division':
            return generateEstimateDivision(params, level);
        default:
            return generateLongMultiply2Digit(params, level);
    }
}

/**
 * OPERATION 1: Long Multiply 2-Digit
 * Formal long multiplication for 4-digit × 2-digit
 */
function generateLongMultiply2Digit(params, level) {
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

    const longMultDisplay = formatLongMultiplication(multiplicand, multiplier, false);

    const text = `Calculate using long multiplication:<br><br>${longMultDisplay}`;

    const distractors = generateDistractors(answer, 3, 1000, 1000000, 5000);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiply by ones digit, then tens digit (shifted), then add the partial products`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Long Division
 * Formal long division by 2-digit numbers
 */
function generateLongDivision(params, level) {
    const result = generateExactDivision(
        params.divide_range[0],
        params.divide_range[1],
        params.divide_by[0],
        params.divide_by[1]
    );

    const dividend = result.dividend;
    const divisor = result.divisor;
    const answer = result.quotient;

    const divisionDisplay = formatLongDivision(dividend, divisor, false);

    const text = `Calculate using long division:<br><br>${divisionDisplay}`;

    const distractors = generateDistractors(answer, 3, 5, 500, 10);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Divide step by step, estimating how many times ${divisor} goes into each part`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Remainder as Whole Number
 * Express division result with whole number remainder
 */
function generateRemainderAsWhole(params, level) {
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

    const divisionDisplay = formatLongDivision(dividend, divisor, false);

    const text = `Calculate and give your answer as a whole number with remainder:<br><br>${divisionDisplay}`;

    const correctAnswer = `${quotient} r ${remainder}`;

    const wrongOptions = [
        `${quotient}`,
        `${quotient + 1}`,
        `${quotient} r ${Math.min(remainder + 1, divisor - 1)}`
    ];

    const options = shuffle([correctAnswer, ...wrongOptions]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Remainder as Fraction
 * Express division result with remainder as a fraction
 */
function generateRemainderAsFraction(params, level) {
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

    const fractionPart = remainderAsFraction(remainder, divisor);

    const text = `Calculate ${dividend.toLocaleString()} ÷ ${divisor}. Give your answer as a mixed number (whole number and fraction).`;

    const correctAnswer = `${quotient} ${fractionPart}`;

    const wrongOptions = [
        `${quotient}`,
        `${quotient} ${remainder}/${divisor + 1}`,
        `${quotient + 1} ${fractionPart}`
    ];

    const options = shuffle([correctAnswer, ...wrongOptions]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: `${quotient} remainder ${remainder} = ${quotient} ${fractionPart}`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Remainder by Rounding
 * Round division result appropriately
 */
function generateRemainderByRounding(params, level) {
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

    const decimalAnswer = divisionAsDecimal(dividend, divisor, 1);
    const roundedAnswer = Math.round(decimalAnswer);

    const text = `Calculate ${dividend.toLocaleString()} ÷ ${divisor} and round to the nearest whole number.`;

    const distractors = [
        quotient,  // Rounded down
        quotient + 1,  // Rounded up
        Math.floor(decimalAnswer)
    ];

    // Remove duplicates
    const uniqueDistractors = [...new Set(distractors)].filter(d => d !== roundedAnswer).slice(0, 3);

    const options = shuffle([roundedAnswer, ...uniqueDistractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: roundedAnswer.toString(),
        hint: `${dividend.toLocaleString()} ÷ ${divisor} = ${decimalAnswer}, which rounds to ${roundedAnswer}`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Choose Remainder Form
 * Determine appropriate form for remainder based on context
 */
function generateChooseRemainderForm(params, level) {
    const contextTypes = ['round_up', 'round_down', 'as_fraction', 'exact_remainder'];
    const contextType = randomChoice(contextTypes);

    const result = generateDivisionWithRemainder(
        params.divide_range[0],
        Math.min(params.divide_range[1], 300),
        params.divide_by[0],
        Math.min(params.divide_by[1], 20)
    );

    const dividend = result.dividend;
    const divisor = result.divisor;
    const quotient = result.quotient;
    const remainder = result.remainder;

    const name = getRandomName();
    const item = getRandomItem();

    let text, correctAnswer, wrongAnswers;

    if (contextType === 'round_up') {
        text = `${name} needs to transport ${dividend} ${item} in boxes that hold ${divisor} each. How many boxes are needed?`;
        correctAnswer = quotient + 1;
        wrongAnswers = [quotient, quotient + 2, Math.ceil(dividend / (divisor + 2))];
    } else if (contextType === 'round_down') {
        text = `${dividend} children are split into teams of ${divisor}. How many complete teams can be made?`;
        correctAnswer = quotient;
        wrongAnswers = [quotient + 1, quotient - 1, Math.floor(dividend / (divisor - 1))];
    } else if (contextType === 'as_fraction') {
        text = `${dividend} metres of ribbon is cut into ${divisor} equal pieces. How long is each piece? Give your answer as a mixed number.`;
        correctAnswer = `${quotient} ${remainderAsFraction(remainder, divisor)}`;
        wrongAnswers = [
            `${quotient}`,
            `${quotient + 1}`,
            `${quotient} ${remainder}/${divisor + 1}`
        ];
    } else {
        text = `${name} has ${dividend} sweets to share equally among ${divisor} friends. How many sweets are left over?`;
        correctAnswer = remainder;
        wrongAnswers = generateDistractors(remainder, 3, 0, divisor - 1);
    }

    const options = shuffle([correctAnswer, ...wrongAnswers.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options.map(String),
        answer: correctAnswer.toString(),
        hint: `Think about what makes sense in this context`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Missing Digit in Long Division
 * Fill in missing digit in long division
 */
function generateMissingDigitLongDiv(params, level) {
    const result = generateExactDivision(
        params.divide_range[0],
        Math.min(params.divide_range[1], 999),
        params.divide_by[0],
        params.divide_by[1]
    );

    const dividend = result.dividend;
    const divisor = result.divisor;
    const quotient = result.quotient;

    // Hide a digit from the quotient
    const quotientStr = quotient.toString();
    const hiddenIndex = randomInt(0, quotientStr.length - 1);
    const hiddenDigit = quotientStr[hiddenIndex];
    const displayQuotient = quotientStr.substring(0, hiddenIndex) + '?' + quotientStr.substring(hiddenIndex + 1);

    const text = `Find the missing digit in this division:<br><br><pre class="long-division">        ${displayQuotient}
     ┌──────────
  ${divisor} │ ${dividend}</pre>`;

    const answer = parseInt(hiddenDigit);

    const distractors = generateDistractors(answer, 3, 0, 9);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Work out ${dividend} ÷ ${divisor} to find the missing digit`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Choose Short vs Long Division
 * Decide which division method is most appropriate
 */
function generateShortVsLongDivision(params, level) {
    const dividend = randomInt(params.divide_range[0], params.divide_range[1]);

    // For short division, use single-digit divisor
    const shortDivisor = randomInt(2, 9);

    // For long division, use two-digit divisor
    const longDivisor = randomInt(params.divide_by[0], params.divide_by[1]);

    const useShort = randomChoice([true, false]);

    let text, correctAnswer;

    if (useShort) {
        text = `Which method would you use to calculate ${dividend.toLocaleString()} ÷ ${shortDivisor}?`;
        correctAnswer = 'Short division';
    } else {
        text = `Which method would you use to calculate ${dividend.toLocaleString()} ÷ ${longDivisor}?`;
        correctAnswer = 'Long division';
    }

    const options = ['Short division', 'Long division', 'Either method works', 'Neither method works'];

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: `Short division is best for single-digit divisors, long division for two-digit divisors`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Multi-Step with Division
 * Complex problem involving division and another operation
 */
function generateMultiStepWithDivision(params, level) {
    const divisor = randomInt(params.divide_by[0], Math.min(params.divide_by[1], 20));
    const quotient1 = randomInt(10, 50);
    const dividend = divisor * quotient1;

    const operation2 = randomChoice(['add', 'subtract', 'multiply']);

    let text, answer;

    if (operation2 === 'add') {
        const addAmount = randomInt(10, 100);
        text = `Calculate ${dividend.toLocaleString()} ÷ ${divisor}, then add ${addAmount}. What is the result?`;
        answer = quotient1 + addAmount;
    } else if (operation2 === 'subtract') {
        const subtractAmount = randomInt(5, quotient1 - 1);
        text = `Calculate ${dividend.toLocaleString()} ÷ ${divisor}, then subtract ${subtractAmount}. What is the result?`;
        answer = quotient1 - subtractAmount;
    } else {
        const multiplyBy = randomInt(2, 5);
        text = `Calculate ${dividend.toLocaleString()} ÷ ${divisor}, then multiply the result by ${multiplyBy}. What is the final answer?`;
        answer = quotient1 * multiplyBy;
    }

    const distractors = generateDistractors(answer, 3, 10, 500, 20);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `First: ${dividend.toLocaleString()} ÷ ${divisor} = ${quotient1}`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Estimate Division
 * Estimate quotient before dividing
 */
function generateEstimateDivision(params, level) {
    const dividend = randomInt(params.divide_range[0], params.divide_range[1]);
    const divisor = randomInt(params.divide_by[0], params.divide_by[1]);

    // Round dividend to nearest 100 or 1000
    let roundedDividend;
    if (dividend < 1000) {
        roundedDividend = Math.round(dividend / 100) * 100;
    } else {
        roundedDividend = Math.round(dividend / 1000) * 1000;
    }

    // Round divisor to nearest 10
    const roundedDivisor = Math.round(divisor / 10) * 10;

    const estimate = Math.floor(roundedDividend / roundedDivisor);

    const text = `Estimate ${dividend.toLocaleString()} ÷ ${divisor} by rounding both numbers.<br><br>What is a good estimate?`;

    const distractors = generateDistractors(estimate, 3, 10, 200, 20);
    const options = shuffle([estimate, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round to ${roundedDividend.toLocaleString()} ÷ ${roundedDivisor}`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y6_CALC',
    generate: generateQuestion
};
