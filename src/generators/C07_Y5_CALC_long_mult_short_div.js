/**
 * C07_Y5_CALC - Long Multiplication & Short Division (Year 5)
 *
 * Module: C07_Y5_CALC - "Using formal written methods for larger numbers"
 *
 * Focus: Long multiplication (4-digit × 2-digit) and short division with remainder interpretation
 *
 * Operations:
 * 1. Multiply 4-digit by 1-digit (box method)
 * 2. Multiply 4-digit by 2-digit (long multiplication / extended box method)
 * 3. Short division with single-digit divisor
 * 4. Interpret remainders appropriately (whole number, fraction, round up/down)
 * 5. Context problems requiring method selection
 *
 * Year 5 extends formal written methods to:
 * - Larger numbers (up to 4 digits)
 * - 2-digit multipliers (long multiplication)
 * - Division with remainders in context
 */

import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import {
    generateFillBoxQuestion,
    generatePartialProductsQuestion,
    generateBoxTotalQuestion,
    generateBoxMethodWordProblem
} from './helpers/c07QuestionTemplates.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    // Year 5: 4-digit × 1-digit or 4-digit × 2-digit
    // Level 1: 4-digit × 1-digit only, simple division
    // Level 2: Introduce 2-digit multipliers, 4-digit division
    // Level 3: All operations, remainder interpretation
    // Level 4: Context problems, complex remainders

    switch(operation) {
        case 'multiply_4_by_1':
            return generateMultiply4By1(params, level);

        case 'multiply_4_by_2':
            return generateMultiply4By2(params, level);

        case 'long_multiplication':
            return generateLongMultiplication(params, level);

        case 'short_division':
            return generateShortDivision(params, level);

        case 'interpret_remainders':
            return generateRemainderInterpretation(params, level);

        case 'context_problems':
            return generateContextProblem(params, level);

        default:
            return generateMultiply4By1(params, level);
    }
}

/**
 * OPERATION 1: 4-digit × 1-digit multiplication using box method
 */
function generateMultiply4By1(params, level) {
    const a = randomInt(1000, params.max_multiplicand);  // 4-digit number
    const multiplier = randomChoice(params.multipliers_1_digit);

    // Reuse existing box method template
    const question = generateFillBoxQuestion(a, multiplier, level);
    question.module = 'C07_Y5_CALC';
    question.level = level;

    return question;
}

/**
 * OPERATION 2: 4-digit × 2-digit multiplication using extended box method
 */
function generateMultiply4By2(params, level) {
    const a = randomInt(1000, params.max_multiplicand);  // 4-digit number
    const multiplier = randomChoice(params.multipliers_2_digit);

    // For larger multiplications, use total calculation instead of fill-in
    const question = generateBoxTotalQuestion(a, multiplier, level);
    question.module = 'C07_Y5_CALC';
    question.level = level;

    return question;
}

/**
 * OPERATION 3: Long multiplication (show working)
 * Asks students to identify correct partial products
 */
function generateLongMultiplication(params, level) {
    const a = randomInt(1000, params.max_multiplicand);
    const multiplier = randomChoice(params.multipliers_2_digit || [12, 15, 20]);

    const question = generatePartialProductsQuestion(a, multiplier, level);
    question.module = 'C07_Y5_CALC';
    question.level = level;

    return question;
}

/**
 * OPERATION 4: Short division (bus stop method)
 * Division with remainder
 */
function generateShortDivision(params, level) {
    const divisor = randomInt(2, 9);

    // Generate dividend based on level
    let dividend;
    if (level === 1) {
        dividend = randomInt(100, params.max_dividend || 999);
    } else {
        dividend = randomInt(100, Math.min(params.max_dividend || 9999, 9999));
    }

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;

    if (level <= 2) {
        // Simple: just calculate the division
        return {
            text: `Calculate using short division:\n\n${dividend} ÷ ${divisor}\n\nGive your answer as: quotient remainder X\n(For example: 12 remainder 3)`,
            type: 'text_input',
            answer: `${quotient} remainder ${remainder}`,
            hint: `${dividend} ÷ ${divisor} = ${quotient} with ${remainder} left over`,
            module: 'C07_Y5_CALC',
            level: level
        };
    } else {
        // Multiple choice with common errors
        const correct = `${quotient} remainder ${remainder}`;
        const wrong1 = `${quotient}`; // Forgot remainder
        const wrong2 = `${quotient + 1} remainder ${remainder - divisor}`; // Off by one
        const wrong3 = `${quotient} remainder ${divisor - remainder}`; // Swapped remainder

        const options = [correct, wrong1, wrong2, wrong3].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates

        return {
            text: `Calculate using short division:\n\n${dividend} ÷ ${divisor}`,
            type: 'multiple_choice',
            options: options,
            answer: correct,
            hint: 'Remember to show the remainder',
            module: 'C07_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 5: Interpret remainders in context
 * Students decide how to handle remainder based on context
 */
function generateRemainderInterpretation(params, level) {
    const divisor = randomInt(2, 9);
    const quotient = randomInt(5, 50);
    const remainder = randomInt(1, divisor - 1);
    const dividend = quotient * divisor + remainder;

    const contexts = [
        {
            scenario: `${dividend} sweets are shared equally among ${divisor} children. How many sweets does each child get?`,
            correctAnswer: quotient,
            interpretation: 'whole_number',
            explanation: 'We ignore the remainder because we can\'t split sweets'
        },
        {
            scenario: `${dividend} people need to travel by car. Each car holds ${divisor} people. How many cars are needed?`,
            correctAnswer: quotient + 1,
            interpretation: 'round_up',
            explanation: 'We need to round up to fit everyone'
        },
        {
            scenario: `A ${dividend}cm ribbon is cut into ${divisor} equal pieces. How long is each piece (in cm)?`,
            correctAnswer: `${quotient} and ${remainder}/${divisor}`,
            interpretation: 'fraction',
            explanation: 'Express remainder as a fraction'
        }
    ];

    const context = randomChoice(contexts);

    if (level <= 2) {
        return {
            text: `${context.scenario}\n\nThe division is ${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}`,
            type: 'text_input',
            answer: context.correctAnswer.toString(),
            hint: context.explanation,
            module: 'C07_Y5_CALC',
            level: level
        };
    } else {
        // Multiple choice showing different interpretations
        const options = [
            context.correctAnswer.toString(),
            quotient.toString(),
            (quotient + 1).toString(),
            `${quotient}.${remainder}`
        ].filter((v, i, a) => a.indexOf(v) === i);

        return {
            text: `${context.scenario}\n\nCalculate: ${dividend} ÷ ${divisor}`,
            type: 'multiple_choice',
            options: options,
            answer: context.correctAnswer.toString(),
            hint: context.explanation,
            module: 'C07_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Context problems requiring method selection
 * Students choose appropriate method and interpret answer
 */
function generateContextProblem(params, level) {
    const isProblemDivision = randomChoice([true, false]);

    if (isProblemDivision) {
        // Division context problem
        const divisor = randomInt(5, 12);
        const quotient = randomInt(10, 100);
        const remainder = randomInt(1, divisor - 1);
        const dividend = quotient * divisor + remainder;

        const scenarios = [
            `A factory produces ${dividend} toys. They pack ${divisor} toys per box. How many complete boxes can they fill?`,
            `${dividend} students go on a trip. Each minibus holds ${divisor} students. How many minibuses are completely full?`,
            `A baker makes ${dividend} cupcakes and puts ${divisor} in each pack. How many full packs can be made?`
        ];

        const scenario = randomChoice(scenarios);

        return {
            text: `${scenario}\n\nSolve: ${dividend} ÷ ${divisor}`,
            type: 'text_input',
            answer: quotient.toString(),
            hint: `Ignore the remainder for complete boxes/buses/packs`,
            module: 'C07_Y5_CALC',
            level: level
        };
    } else {
        // Multiplication context problem
        const a = randomInt(100, 999);
        const b = randomInt(11, 25);
        const answer = a * b;

        const scenarios = [
            `A school has ${b} classrooms with ${a} books in each. How many books in total?`,
            `A cinema shows ${b} screenings per day. Each screening sells ${a} tickets. Total tickets sold?`,
            `${b} boxes each contain ${a} items. How many items altogether?`
        ];

        const scenario = randomChoice(scenarios);

        // Use box method word problem template
        const question = generateBoxMethodWordProblem(a, b, level);
        question.text = `${scenario}\n\n${question.text.split('\n\n').slice(1).join('\n\n')}`;
        question.module = 'C07_Y5_CALC';
        question.level = level;

        return question;
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y5_CALC',
    generate: generateQuestion
};
