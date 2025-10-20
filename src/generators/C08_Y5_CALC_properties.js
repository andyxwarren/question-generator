/**
 * Year 5 C08 Generator: Multi-Operation and Properties Problems
 *
 * Module: C08_Y5_CALC - "Solve problems involving multiplication and division including using
 * their knowledge of factors and multiples, squares and cubes; solve problems involving addition,
 * subtraction, multiplication and division and a combination of these, including understanding
 * the meaning of the equals sign; solve problems involving multiplication and division including
 * scaling by simple fractions and problems involving simple rates"
 *
 * This generator focuses on:
 * - Factor and multiple problems in context
 * - Square and cube problems
 * - Multi-operation problems (2-4 operations)
 * - Understanding the equals sign (15 + 7 = ___ + 12)
 * - Fraction scaling (1/2 of 24, 2/3 of 30)
 * - Simple rates (speed, cost per item)
 * - Associative property
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateFactorProblem,
    generateMultipleProblem,
    generateSquareCubeProblem,
    generateSimpleRate,
    generateFractionScaling,
    generateMultDivDistractors
} from './helpers/C08_propertyHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'factor_problems':
            return generateFactorProblemsQuestion(params, level);
        case 'multiple_problems':
            return generateMultipleProblemsQuestion(params, level);
        case 'square_cube_problems':
            return generateSquareCubeProblemsQuestion(params, level);
        case 'prime_factor_problems':
            return generatePrimeFactorProblemsQuestion(params, level);
        case 'two_operation_problems':
            return generateTwoOperationProblemsQuestion(params, level);
        case 'three_operation_problems':
            return generateThreeOperationProblemsQuestion(params, level);
        case 'four_operation_problems':
            return generateFourOperationProblemsQuestion(params, level);
        case 'fraction_scaling':
            return generateFractionScalingQuestion(params, level);
        case 'fraction_of_fraction':
            return generateFractionOfFractionQuestion(params, level);
        case 'simple_rate':
            return generateSimpleRateQuestion(params, level);
        case 'compound_rate':
            return generateCompoundRateQuestion(params, level);
        case 'equals_sign_meaning':
            return generateEqualsSignMeaningQuestion(params, level);
        case 'inverse_operations':
            return generateInverseOperationsQuestion(params, level);
        case 'associative_property':
            return generateAssociativePropertyQuestion(params, level);
        case 'distributive_with_fractions':
            return generateDistributiveWithFractionsQuestion(params, level);
        case 'multi_step_reasoning':
            return generateMultiStepReasoningQuestion(params, level);
        default:
            return generateFactorProblemsQuestion(params, level);
    }
}

function generateFactorProblemsQuestion(params, level) {
    const problem = generateFactorProblem(params.factor_range);
    return formatQuestion(problem, params.question_format, level);
}

function generateMultipleProblemsQuestion(params, level) {
    const problem = generateMultipleProblem(params.max_value);
    return formatQuestion(problem, params.question_format, level);
}

function generateSquareCubeProblemsQuestion(params, level) {
    const problem = generateSquareCubeProblem(params.square_range, params.cube_range);
    return formatQuestion(problem, params.question_format, level);
}

function generatePrimeFactorProblemsQuestion(params, level) {
    const numbers = [12, 18, 20, 24, 30, 36, 40, 45, 48, 50, 60];
    const number = randomChoice(numbers.filter(n => n <= params.max_value));

    const primeFactors = getPrimeFactors(number);
    const answer = primeFactors.join(' × ');

    const text = `Express ${number} as a product of prime numbers`;
    const working = `${number} = ${answer}`;

    return {
        text,
        type: 'text_input',
        answer: answer,
        hint: working,
        module: 'C08_Y5_CALC',
        level: level
    };
}

function generateTwoOperationProblemsQuestion(params, level) {
    const a = randomInt(10, 100);
    const b = randomInt(5, 50);
    const c = randomInt(2, 10);
    const answer = (a + b) * c;

    const text = `Calculate (${a} + ${b}) × ${c}`;
    const working = `${a} + ${b} = ${a + b}. ${a + b} × ${c} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'two_operation_problems' }, params.question_format, level);
}

function generateThreeOperationProblemsQuestion(params, level) {
    const a = randomInt(50, 200);
    const b = randomInt(10, 50);
    const c = randomInt(2, 5);
    const d = randomInt(10, 50);
    const answer = (a - b) * c + d;

    const text = `Calculate (${a} - ${b}) × ${c} + ${d}`;
    const working = `${a} - ${b} = ${a - b}. ${a - b} × ${c} = ${(a - b) * c}. ${(a - b) * c} + ${d} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'three_operation_problems' }, params.question_format, level);
}

function generateFourOperationProblemsQuestion(params, level) {
    const a = randomInt(100, 500);
    const b = randomInt(20, 100);
    const c = randomInt(2, 5);
    const d = randomInt(10, 50);
    const e = randomInt(5, 20);
    const intermediate = (a + b) * c - d;
    const answer = Math.floor(intermediate / e);

    const text = `Calculate ((${a} + ${b}) × ${c} - ${d}) ÷ ${e}`;
    const working = `${a} + ${b} = ${a + b}. ${a + b} × ${c} = ${(a + b) * c}. ${(a + b) * c} - ${d} = ${intermediate}. ${intermediate} ÷ ${e} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'four_operation_problems' }, params.question_format, level);
}

function generateFractionScalingQuestion(params, level) {
    const problem = generateFractionScaling(params.simple_fractions, params.max_value);
    return formatQuestion(problem, params.question_format, level);
}

function generateFractionOfFractionQuestion(params, level) {
    // Example: 1/2 of 3/4 of 60
    const startValue = randomChoice([60, 80, 100, 120]);
    const frac1 = randomChoice(['1/2', '1/3', '1/4', '2/3', '3/4']);
    const frac2 = randomChoice(['1/2', '1/3', '1/4', '2/3']);

    const [num1, denom1] = frac1.split('/').map(Number);
    const [num2, denom2] = frac2.split('/').map(Number);

    const step1 = (startValue / denom2) * num2;
    const answer = (step1 / denom1) * num1;

    const text = `Find ${frac1} of ${frac2} of ${startValue}`;
    const working = `${frac2} of ${startValue} = ${step1}. ${frac1} of ${step1} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'fraction_of_fraction' }, params.question_format, level);
}

function generateSimpleRateQuestion(params, level) {
    const problem = generateSimpleRate(params.rate_units, params.max_value);
    return formatQuestion(problem, params.question_format, level);
}

function generateCompoundRateQuestion(params, level) {
    // Example: "Car travels 50 mph for 2 hours, then 60 mph for 1 hour. Total distance?"
    const speed1 = randomInt(40, 80);
    const time1 = randomInt(2, 4);
    const speed2 = randomInt(50, 90);
    const time2 = randomInt(1, 3);
    const distance1 = speed1 * time1;
    const distance2 = speed2 * time2;
    const answer = distance1 + distance2;

    const text = `A car travels at ${speed1} km/h for ${time1} hours, then at ${speed2} km/h for ${time2} hours. What is the total distance travelled?`;
    const working = `Distance 1: ${speed1} × ${time1} = ${distance1} km. Distance 2: ${speed2} × ${time2} = ${distance2} km. Total: ${distance1} + ${distance2} = ${answer} km`;

    return formatQuestion({ text, answer, working, operation: 'compound_rate' }, params.question_format, level);
}

function generateEqualsSignMeaningQuestion(params, level) {
    // Example: "15 + 7 = ___ + 12"
    const a = randomInt(10, 50);
    const b = randomInt(5, 30);
    const sum = a + b;
    const c = randomInt(5, sum - 5);
    const answer = sum - c;

    const text = `${a} + ${b} = ___ + ${c}`;
    const working = `${a} + ${b} = ${sum}. So ${sum} = ___ + ${c}. Answer: ${sum} - ${c} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'equals_sign_meaning' }, params.question_format, level);
}

function generateInverseOperationsQuestion(params, level) {
    const a = randomInt(5, 20);
    const b = randomInt(2, 12);
    const product = a * b;

    const text = `If ${a} × ${b} = ${product}, use the inverse to find ${product} ÷ ${a}`;
    const working = `Inverse of multiplication is division: ${product} ÷ ${a} = ${b}`;

    return formatQuestion({ text, answer: b, working, operation: 'inverse_operations' }, params.question_format, level);
}

function generateAssociativePropertyQuestion(params, level) {
    const a = randomInt(2, 10);
    const b = randomInt(2, 10);
    const c = randomInt(2, 5);
    const answer = a * b * c;

    const text = `Calculate ${a} × ${b} × ${c} by first multiplying ${a} × ${b}`;
    const working = `(${a} × ${b}) × ${c} = ${a * b} × ${c} = ${answer}. Multiplication is associative.`;

    return formatQuestion({ text, answer, working, operation: 'associative_property' }, params.question_format, level);
}

function generateDistributiveWithFractionsQuestion(params, level) {
    const a = randomChoice([20, 30, 40, 50]);
    const b = randomChoice([10, 20, 30]);
    const fraction = randomChoice(['1/2', '1/3', '1/4', '1/5']);
    const [num, denom] = fraction.split('/').map(Number);

    const sum = a + b;
    const answer = (sum / denom) * num;

    const text = `Calculate ${fraction} of (${a} + ${b})`;
    const working = `${a} + ${b} = ${sum}. ${fraction} of ${sum} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'distributive_with_fractions' }, params.question_format, level);
}

function generateMultiStepReasoningQuestion(params, level) {
    // Example: "I think of a number, multiply by 3, add 15. Answer is 60. What was my number?"
    const startNum = randomInt(5, 30);
    const multiplier = randomInt(2, 5);
    const addend = randomInt(10, 40);
    const finalAnswer = startNum * multiplier + addend;

    const text = `I think of a number, multiply it by ${multiplier}, then add ${addend}. My answer is ${finalAnswer}. What was my starting number?`;
    const working = `Work backwards: ${finalAnswer} - ${addend} = ${finalAnswer - addend}. ${finalAnswer - addend} ÷ ${multiplier} = ${startNum}`;

    return formatQuestion({ text, answer: startNum, working, operation: 'multi_step_reasoning' }, params.question_format, level);
}

// Helper: Get prime factors
function getPrimeFactors(n) {
    const factors = [];
    let divisor = 2;

    while (n >= 2) {
        if (n % divisor === 0) {
            factors.push(divisor);
            n = n / divisor;
        } else {
            divisor++;
        }
    }

    return factors;
}

function formatQuestion(problem, questionFormat, level) {
    const useMultipleChoice = questionFormat === 'multiple_choice';
    const answer = typeof problem.answer === 'number' ? problem.answer : (isNaN(parseInt(problem.answer)) ? problem.answer : parseInt(problem.answer));

    if (useMultipleChoice && typeof answer === 'number') {
        const distractors = generateMultDivDistractors(answer, problem, problem.operation || 'multi_operation');
        const options = shuffle([answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: problem.working || problem.hint,
            module: 'C08_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: problem.working || problem.hint,
            module: 'C08_Y5_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C08_Y5_CALC',
    generate: generateQuestion
};
