/**
 * Year 3 C08 Generator: Scaling and Correspondence Problems
 *
 * Module: C08_Y3_CALC - "Solve problems, including missing number problems, involving
 * multiplication and division, including integer scaling problems and correspondence
 * problems in which n objects are connected to m objects"
 *
 * This generator focuses on:
 * - Integer scaling (if 1 costs £3, what do 5 cost?)
 * - Correspondence problems (n objects connected to m objects)
 * - Missing number problems in multiplication/division
 * - Inverse operations
 * - Tables up to 12
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateIntegerScaling,
    generateSimpleCorrespondence,
    generateComplexCorrespondence,
    generateMultDivDistractors
} from './helpers/C08_propertyHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'integer_scaling':
            return generateIntegerScalingQuestion(params, level);
        case 'simple_correspondence':
            return generateSimpleCorrespondenceQuestion(params, level);
        case 'complex_correspondence':
            return generateComplexCorrespondenceQuestion(params, level);
        case 'multi_step_correspondence':
            return generateMultiStepCorrespondenceQuestion(params, level);
        case 'missing_factor':
            return generateMissingFactorQuestion(params, level);
        case 'missing_dividend':
            return generateMissingDividendQuestion(params, level);
        case 'missing_divisor':
            return generateMissingDivisorQuestion(params, level);
        case 'inverse_operations':
            return generateInverseOperationsQuestion(params, level);
        case 'scaling_with_remainder':
            return generateScalingWithRemainderQuestion(params, level);
        default:
            return generateIntegerScalingQuestion(params, level);
    }
}

function generateIntegerScalingQuestion(params, level) {
    const problem = generateIntegerScaling(params.scaling_factors, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateSimpleCorrespondenceQuestion(params, level) {
    const problem = generateSimpleCorrespondence(params.correspondence_ratios, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateComplexCorrespondenceQuestion(params, level) {
    const problem = generateComplexCorrespondence(params.correspondence_ratios, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateMultiStepCorrespondenceQuestion(params, level) {
    // Example: "3 boxes have 18 items. How many items in 7 boxes?"
    const [initialBoxes, initialItems] = randomChoice(params.correspondence_ratios.filter(([a, b]) => b % a === 0));
    const perBox = initialItems / initialBoxes;
    const finalBoxes = randomInt(initialBoxes + 1, 15);
    const answer = finalBoxes * perBox;

    if (answer > params.max_product) {
        return generateSimpleCorrespondenceQuestion(params, level); // Fallback
    }

    const text = `${initialBoxes} boxes contain ${initialItems} items. How many items are in ${finalBoxes} boxes?`;
    const working = `${initialItems} ÷ ${initialBoxes} = ${perBox} items per box. ${finalBoxes} × ${perBox} = ${answer}`;

    return formatQuestion(
        { text, answer, working, operation: 'multi_step_correspondence', values: { initialBoxes, initialItems, perBox, finalBoxes, answer } },
        params.question_format,
        level
    );
}

function generateMissingFactorQuestion(params, level) {
    const factor1 = randomChoice(params.tables);
    const factor2 = randomInt(2, 12);
    const product = factor1 * factor2;

    const text = `___ × ${factor1} = ${product}`;
    const working = `${product} ÷ ${factor1} = ${factor2}`;

    return formatQuestion(
        { text, answer: factor2, working, operation: 'missing_factor', values: { factor1, factor2, product } },
        params.question_format,
        level
    );
}

function generateMissingDividendQuestion(params, level) {
    const divisor = randomChoice(params.tables);
    const quotient = randomInt(2, Math.floor(params.max_product / divisor));
    const dividend = divisor * quotient;

    const text = `___ ÷ ${divisor} = ${quotient}`;
    const working = `${divisor} × ${quotient} = ${dividend}`;

    return formatQuestion(
        { text, answer: dividend, working, operation: 'missing_dividend', values: { dividend, divisor, quotient } },
        params.question_format,
        level
    );
}

function generateMissingDivisorQuestion(params, level) {
    const divisor = randomChoice(params.tables);
    const quotient = randomInt(2, 12);
    const dividend = divisor * quotient;

    const text = `${dividend} ÷ ___ = ${quotient}`;
    const working = `${dividend} ÷ ${quotient} = ${divisor}`;

    return formatQuestion(
        { text, answer: divisor, working, operation: 'missing_divisor', values: { dividend, divisor, quotient } },
        params.question_format,
        level
    );
}

function generateInverseOperationsQuestion(params, level) {
    const a = randomChoice(params.tables);
    const b = randomInt(2, 12);
    const product = a * b;

    const templates = [
        {
            text: `If ${a} × ${b} = ${product}, what is ${product} ÷ ${a}?`,
            answer: b,
            working: `Using inverse: ${product} ÷ ${a} = ${b}`
        },
        {
            text: `If ${a} × ${b} = ${product}, what is ${product} ÷ ${b}?`,
            answer: a,
            working: `Using inverse: ${product} ÷ ${b} = ${a}`
        }
    ];

    const template = randomChoice(templates);
    return formatQuestion(template, params.question_format, level);
}

function generateScalingWithRemainderQuestion(params, level) {
    const divisor = randomChoice(params.tables);
    const quotient = randomInt(2, 10);
    const remainder = randomInt(1, divisor - 1);
    const dividend = divisor * quotient + remainder;

    const text = `${dividend} pencils are shared between ${divisor} people. How many pencils does each person get? (Ignore any remainder)`;
    const working = `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}. Each gets ${quotient}`;

    return formatQuestion(
        { text, answer: quotient, working, operation: 'scaling_with_remainder' },
        params.question_format,
        level
    );
}

function formatQuestion(problem, questionFormat, level) {
    const useMultipleChoice = questionFormat === 'multiple_choice';
    const answer = typeof problem.answer === 'number' ? problem.answer : parseInt(problem.answer) || problem.answer;

    if (useMultipleChoice && typeof answer === 'number') {
        const distractors = generateMultDivDistractors(answer, problem, problem.operation || 'scaling');
        const options = shuffle([answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y3_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C08_Y3_CALC',
    generate: generateQuestion
};
