/**
 * C07_Y6_CALC - Long Multiplication & Long Division (Year 6)
 *
 * Module: C07_Y6_CALC - "Long division with 2-digit divisors"
 *
 * Focus: Long division (÷ by 2-digit numbers) and complex remainder interpretation
 *
 * Operations:
 * 1. Long multiplication (4-digit × 2-digit)
 * 2. Long division with 2-digit divisors
 * 3. Short division with 2-digit divisors (factors of 10/100)
 * 4. Choose appropriate method
 * 5. Interpret remainders (whole number, fraction, decimal, context-appropriate)
 * 6. Context problems requiring method selection
 *
 * Year 6 is the culmination of written methods:
 * - Most complex division (2-digit divisors)
 * - Multiple remainder representations
 * - Strategic method choice
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import {
    generateBoxTotalQuestion,
    generatePartialProductsQuestion,
    generateBoxMethodWordProblem
} from './helpers/c07QuestionTemplates.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    // Year 6: 4-digit × 2-digit and 4-digit ÷ 2-digit
    // Level 1: Simple 2-digit divisors (11, 12)
    // Level 2: More divisors, introduce fractions
    // Level 3: All methods, choose strategy
    // Level 4: Complex context problems

    switch(operation) {
        case 'long_multiplication':
            return generateLongMultiplication(params, level);

        case 'long_division_simple':
            return generateLongDivisionSimple(params, level);

        case 'long_division':
            return generateLongDivision(params, level);

        case 'short_division_2_digit':
            return generateShortDivision2Digit(params, level);

        case 'choose_method':
            return generateChooseMethod(params, level);

        case 'context_problems':
            return generateContextProblem(params, level);

        default:
            return generateLongDivision(params, level);
    }
}

/**
 * OPERATION 1: Long multiplication (4-digit × 2-digit)
 * Reuses box method from earlier years
 */
function generateLongMultiplication(params, level) {
    const a = randomInt(1000, params.max_multiplicand);
    const b = randomChoice(params.multipliers);

    const question = generateBoxTotalQuestion(a, b, level);
    question.module = 'C07_Y6_CALC';
    question.level = level;

    return question;
}

/**
 * OPERATION 2: Simple long division (Level 1)
 * Easy 2-digit divisors like 11, 12
 */
function generateLongDivisionSimple(params, level) {
    const divisor = randomChoice(params.divisors);
    const quotient = randomInt(10, 200);
    const remainder = randomInt(0, divisor - 1);
    const dividend = quotient * divisor + remainder;

    if (remainder === 0) {
        // Exact division
        return {
            text: `Calculate using long division:\n\n${dividend} ÷ ${divisor}`,
            type: 'text_input',
            answer: quotient.toString(),
            hint: `${divisor} goes into ${dividend} exactly ${quotient} times`,
            module: 'C07_Y6_CALC',
            level: level
        };
    } else {
        // With remainder
        const interpretationType = randomChoice(params.remainder_interpretation || ['whole_number']);

        let answer, hint;
        if (interpretationType === 'whole_number') {
            answer = `${quotient} remainder ${remainder}`;
            hint = 'Give answer as quotient remainder X';
        } else if (interpretationType === 'fraction') {
            // Simplify fraction if possible
            const gcd = findGCD(remainder, divisor);
            const numSimp = remainder / gcd;
            const denSimp = divisor / gcd;
            answer = denSimp === 1 ? quotient.toString() : `${quotient} and ${numSimp}/${denSimp}`;
            hint = 'Express remainder as a fraction in simplest form';
        } else {
            answer = `${quotient} remainder ${remainder}`;
            hint = 'Show working for long division';
        }

        return {
            text: `Calculate using long division:\n\n${dividend} ÷ ${divisor}`,
            type: 'text_input',
            answer: answer,
            hint: hint,
            module: 'C07_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Long division with remainder interpretation
 */
function generateLongDivision(params, level) {
    const divisor = randomChoice(params.divisors);
    const quotient = randomInt(20, 300);
    const remainder = randomInt(0, divisor - 1);
    const dividend = quotient * divisor + remainder;

    const interpretationType = randomChoice(params.remainder_interpretation || ['whole_number']);

    if (level <= 2) {
        // Text input
        let answer, hint;

        if (remainder === 0) {
            answer = quotient.toString();
            hint = 'This divides exactly';
        } else if (interpretationType === 'whole_number') {
            answer = `${quotient} remainder ${remainder}`;
            hint = 'Give answer as quotient remainder X';
        } else if (interpretationType === 'fraction') {
            const gcd = findGCD(remainder, divisor);
            const numSimp = remainder / gcd;
            const denSimp = divisor / gcd;
            answer = denSimp === 1 ? quotient.toString() : `${quotient} and ${numSimp}/${denSimp}`;
            hint = 'Express remainder as a fraction';
        } else if (interpretationType === 'rounding') {
            answer = (quotient + 1).toString();
            hint = 'Round up to the nearest whole number';
        } else {
            answer = `${quotient} remainder ${remainder}`;
            hint = 'Show the remainder';
        }

        return {
            text: `Calculate: ${dividend} ÷ ${divisor}\n\n${interpretationType === 'fraction' ? 'Express your answer as a mixed number.' : interpretationType === 'rounding' ? 'Round your answer up.' : 'Give your answer with remainder if needed.'}`,
            type: 'text_input',
            answer: answer,
            hint: hint,
            module: 'C07_Y6_CALC',
            level: level
        };
    } else {
        // Multiple choice with different remainder forms
        const correct = remainder === 0 ? quotient.toString() : `${quotient} remainder ${remainder}`;

        const distractors = [
            quotient.toString(), // No remainder
            `${quotient + 1}`, // Rounded up
            `${quotient} remainder ${divisor - remainder}`, // Wrong remainder
        ].filter(d => d !== correct);

        const options = shuffle([correct, ...distractors.slice(0, 3)]);

        return {
            text: `Calculate using long division:\n\n${dividend} ÷ ${divisor}`,
            type: 'multiple_choice',
            options: options,
            answer: correct,
            hint: 'Use long division method and show remainder',
            module: 'C07_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Short division with 2-digit divisors
 * Only for special divisors (multiples of 10)
 */
function generateShortDivision2Digit(params, level) {
    const divisors = [10, 20, 25, 30, 40, 50].filter(d => params.divisors.includes(d));

    if (divisors.length === 0) {
        // Fallback to long division
        return generateLongDivision(params, level);
    }

    const divisor = randomChoice(divisors);
    const quotient = randomInt(10, 200);
    const remainder = randomInt(0, divisor - 1);
    const dividend = quotient * divisor + remainder;

    return {
        text: `Calculate: ${dividend} ÷ ${divisor}\n\n${divisor >= 20 ? 'You can use short division for this one!' : ''}`,
        type: 'text_input',
        answer: remainder === 0 ? quotient.toString() : `${quotient} remainder ${remainder}`,
        hint: `Divide by ${divisor/10} tens`,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Choose appropriate method
 * Students identify whether to use long or short division
 */
function generateChooseMethod(params, level) {
    const divisions = [
        { dividend: randomInt(1000, 5000), divisor: randomChoice(params.divisors), method: 'long' },
        { dividend: randomInt(1000, 5000), divisor: randomChoice([10, 20, 25, 50]), method: 'short' },
        { dividend: randomInt(1000, 5000), divisor: randomChoice(params.divisors), method: 'long' }
    ];

    const problem = randomChoice(divisions);
    const quotient = Math.floor(problem.dividend / problem.divisor);
    const remainder = problem.dividend % problem.divisor;

    if (level <= 2) {
        // Ask for method choice
        return {
            text: `For the division ${problem.dividend} ÷ ${problem.divisor}, which method is most efficient?\n\nA) Long division\nB) Short division`,
            type: 'multiple_choice',
            options: ['Long division', 'Short division'],
            answer: problem.method === 'long' ? 'Long division' : 'Short division',
            hint: problem.divisor % 10 === 0 ? 'Divisors that are multiples of 10 work well with short division' : 'Use long division for most 2-digit divisors',
            module: 'C07_Y6_CALC',
            level: level
        };
    } else {
        // Calculate the division
        return {
            text: `Calculate: ${problem.dividend} ÷ ${problem.divisor}\n\nChoose the most efficient method.`,
            type: 'text_input',
            answer: remainder === 0 ? quotient.toString() : `${quotient} remainder ${remainder}`,
            hint: `Use ${problem.method} division`,
            module: 'C07_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Context problems
 * Real-world scenarios requiring division and remainder interpretation
 */
function generateContextProblem(params, level) {
    const divisor = randomChoice(params.divisors);

    const contexts = [
        {
            type: 'round_up',
            setup: (dividend, divisor) => `${dividend} people need transport. Each bus holds ${divisor} people. How many buses are needed?`,
            answer: (quotient, remainder) => remainder > 0 ? quotient + 1 : quotient,
            explanation: 'Round up to fit everyone'
        },
        {
            type: 'whole_number',
            setup: (dividend, divisor) => `${dividend} sweets are shared equally among ${divisor} children. How many sweets does each child get?`,
            answer: (quotient, remainder) => quotient,
            explanation: 'Ignore remainder - can\'t split sweets'
        },
        {
            type: 'fraction',
            setup: (dividend, divisor) => `A ${dividend}m rope is cut into ${divisor} equal pieces. How long is each piece?`,
            answer: (quotient, remainder, divisor) => {
                if (remainder === 0) return `${quotient}m`;
                const gcd = findGCD(remainder, divisor);
                return `${quotient} and ${remainder / gcd}/${divisor / gcd}m`;
            },
            explanation: 'Express as a fraction'
        }
    ];

    const context = randomChoice(contexts);
    const quotient = randomInt(10, 100);
    const remainder = randomInt(1, divisor - 1);
    const dividend = quotient * divisor + remainder;

    const answer = context.answer(quotient, remainder, divisor);

    return {
        text: `${context.setup(dividend, divisor)}\n\nCalculate: ${dividend} ÷ ${divisor}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: context.explanation,
        module: 'C07_Y6_CALC',
        level: level
    };
}

/**
 * Helper: Find Greatest Common Divisor
 */
function findGCD(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y6_CALC',
    generate: generateQuestion
};
