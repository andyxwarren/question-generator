/**
 * Year 4 C08 Generator: Distributive Law and Harder Correspondence
 *
 * Module: C08_Y4_CALC - "Solve problems involving multiplying and adding, including using
 * the distributive law to multiply two-digit numbers by one digit, integer scaling problems
 * and harder correspondence problems such as n objects are connected to m objects"
 *
 * This generator focuses on:
 * - Distributive law (a × (b + c) = (a × b) + (a × c))
 * - Two-digit × one-digit multiplication using partitioning
 * - Harder correspondence problems
 * - Multi-step scaling
 * - Combined operations (multiply then add/subtract)
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateDistributiveSimple,
    generateDistributiveApplication,
    generateMultiplyThenAdd,
    generateIntegerScaling,
    generateComplexCorrespondence,
    generateMultDivDistractors
} from './helpers/C08_propertyHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'distributive_simple':
            return generateDistributiveSimpleQuestion(params, level);
        case 'distributive_application':
            return generateDistributiveApplicationQuestion(params, level);
        case 'multiply_then_add':
            return generateMultiplyThenAddQuestion(params, level);
        case 'multiply_then_subtract':
            return generateMultiplyThenSubtractQuestion(params, level);
        case 'integer_scaling':
            return generateIntegerScalingQuestion(params, level);
        case 'harder_correspondence':
            return generateHarderCorrespondenceQuestion(params, level);
        case 'multi_step_scaling':
            return generateMultiStepScalingQuestion(params, level);
        case 'inverse_with_distributive':
            return generateInverseWithDistributiveQuestion(params, level);
        case 'missing_number_distributive':
            return generateMissingNumberDistributiveQuestion(params, level);
        case 'double_distributive':
            return generateDoubleDistributiveQuestion(params, level);
        case 'combined_operations':
            return generateCombinedOperationsQuestion(params, level);
        default:
            return generateDistributiveSimpleQuestion(params, level);
    }
}

function generateDistributiveSimpleQuestion(params, level) {
    const problem = generateDistributiveSimple(params.two_digit_range, params.one_digit_multipliers);
    return formatQuestion(problem, params.question_format, level);
}

function generateDistributiveApplicationQuestion(params, level) {
    const problem = generateDistributiveApplication(params.two_digit_range, params.one_digit_multipliers);
    return formatQuestion(problem, params.question_format, level);
}

function generateMultiplyThenAddQuestion(params, level) {
    const problem = generateMultiplyThenAdd(params.tables, params.max_product, false);
    return formatQuestion(problem, params.question_format, level);
}

function generateMultiplyThenSubtractQuestion(params, level) {
    const problem = generateMultiplyThenAdd(params.tables, params.max_product, true);
    return formatQuestion(problem, params.question_format, level);
}

function generateIntegerScalingQuestion(params, level) {
    const twoDigit = randomInt(params.two_digit_range[0], params.two_digit_range[1]);
    const scaleFactor = randomChoice(params.one_digit_multipliers);
    const answer = twoDigit * scaleFactor;

    const text = `A book costs £${twoDigit}. How much do ${scaleFactor} books cost?`;
    const working = `${twoDigit} × ${scaleFactor} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'integer_scaling' }, params.question_format, level);
}

function generateHarderCorrespondenceQuestion(params, level) {
    const problem = generateComplexCorrespondence(params.correspondence_ratios, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateMultiStepScalingQuestion(params, level) {
    // Example: "3 packs cost £15. How much do 7 packs cost?"
    // Generate values that respect max_product constraint
    const maxCostPerPack = Math.floor(params.max_product / 12); // Max final packs is 12
    const costPerPack = randomInt(3, Math.min(20, maxCostPerPack));
    const initialPacks = randomChoice([2, 3, 4, 5]);
    const initialCost = initialPacks * costPerPack;
    const maxFinalPacks = Math.floor(params.max_product / costPerPack);
    const finalPacks = randomInt(initialPacks + 1, Math.min(12, maxFinalPacks));
    const answer = finalPacks * costPerPack;

    const text = `${initialPacks} packs cost £${initialCost}. How much do ${finalPacks} packs cost?`;
    const working = `Cost per pack = £${initialCost} ÷ ${initialPacks} = £${costPerPack}. ${finalPacks} packs = ${finalPacks} × £${costPerPack} = £${answer}`;

    return formatQuestion({ text, answer, working, operation: 'multi_step_scaling' }, params.question_format, level);
}

function generateInverseWithDistributiveQuestion(params, level) {
    const twoDigit = randomInt(params.two_digit_range[0], params.two_digit_range[1]);
    const oneDigit = randomChoice(params.one_digit_multipliers);
    const product = twoDigit * oneDigit;

    const text = `If ${twoDigit} × ${oneDigit} = ${product}, what is ${product} ÷ ${oneDigit}?`;
    const working = `Using inverse operation: ${product} ÷ ${oneDigit} = ${twoDigit}`;

    return formatQuestion({ text, answer: twoDigit, working, operation: 'inverse_with_distributive' }, params.question_format, level);
}

function generateMissingNumberDistributiveQuestion(params, level) {
    const twoDigit = randomInt(params.two_digit_range[0], params.two_digit_range[1]);
    const oneDigit = randomChoice(params.one_digit_multipliers);
    const product = twoDigit * oneDigit;

    const text = `___ × ${oneDigit} = ${product}`;
    const tens = Math.floor(twoDigit / 10) * 10;
    const ones = twoDigit % 10;
    const working = `${product} ÷ ${oneDigit} = ${twoDigit}. Check: (${tens} × ${oneDigit}) + (${ones} × ${oneDigit}) = ${product}`;

    return formatQuestion({ text, answer: twoDigit, working, operation: 'missing_number_distributive' }, params.question_format, level);
}

function generateDoubleDistributiveQuestion(params, level) {
    // (10 + 3) × (5 + 2) - This is quite advanced, simplify for Y4
    const a = randomInt(10, 20);
    const b = randomInt(2, 5);
    const answer = a * b;

    const text = `Calculate ${a} × ${b} by breaking ${a} into ${Math.floor(a / 10) * 10} + ${a % 10}`;
    const working = `(${Math.floor(a / 10) * 10} × ${b}) + (${a % 10} × ${b}) = ${Math.floor(a / 10) * 10 * b} + ${(a % 10) * b} = ${answer}`;

    return formatQuestion({ text, answer, working, operation: 'double_distributive' }, params.question_format, level);
}

function generateCombinedOperationsQuestion(params, level) {
    const a = randomChoice(params.tables);
    const b = randomChoice(params.tables);
    const product = a * b;
    const addend = randomInt(5, 30);

    // Choose between addition or subtraction
    const useSubtraction = Math.random() < 0.5 && product > 20;

    if (useSubtraction) {
        // Ensure we subtract a reasonable amount (not too close to product)
        const subtrahend = randomInt(5, Math.floor(product * 0.7));
        const answer = product - subtrahend;

        return formatQuestion({
            text: `Calculate (${a} × ${b}) - ${subtrahend}`,
            working: `${a} × ${b} = ${product}. ${product} - ${subtrahend} = ${answer}`,
            answer: answer,
            operation: 'combined_operations'
        }, params.question_format, level);
    } else {
        const answer = product + addend;

        return formatQuestion({
            text: `Calculate (${a} × ${b}) + ${addend}`,
            working: `${a} × ${b} = ${product}. ${product} + ${addend} = ${answer}`,
            answer: answer,
            operation: 'combined_operations'
        }, params.question_format, level);
    }
}

function formatQuestion(problem, questionFormat, level) {
    const useMultipleChoice = questionFormat === 'multiple_choice';
    const answer = typeof problem.answer === 'number' ? problem.answer : parseInt(problem.answer) || problem.answer;

    if (useMultipleChoice && typeof answer === 'number') {
        const distractors = generateMultDivDistractors(answer, problem, problem.operation || 'distributive');
        const options = shuffle([answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y4_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C08_Y4_CALC',
    generate: generateQuestion
};
