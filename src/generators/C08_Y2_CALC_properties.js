/**
 * Year 2 C08 Generator: Properties and Problem-Solving
 *
 * Module: C08_Y2_CALC - "Solve problems involving multiplication and division, using materials,
 * arrays, repeated addition, mental methods, and multiplication and division facts, including
 * problems in contexts; show that addition of two numbers can be done in any order (commutative)
 * and subtraction of one number from another cannot; show that multiplication of two numbers
 * can be done in any order (commutative) and division of one number by another cannot"
 *
 * This generator focuses on:
 * - All Y1 operations plus commutative properties
 * - Demonstrating commutative for addition and multiplication
 * - Demonstrating non-commutative for subtraction and division
 * - Mental methods and multiplication facts
 * - Tables: 2, 3, 4, 5, 8, 10
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateEqualGroups,
    generateArrayMultiplication,
    generateArrayDivision,
    generateSharing,
    generateGrouping,
    generateRepeatedAddition,
    generateCommutativeMultiplication,
    generateCommutativeAddition,
    generateNonCommutativeSubtraction,
    generateNonCommutativeDivision,
    generateMultDivDistractors
} from './helpers/C08_propertyHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'equal_groups':
            return generateEqualGroupsQuestion(params, level);
        case 'array_multiplication':
            return generateArrayMultiplicationQuestion(params, level);
        case 'array_division':
            return generateArrayDivisionQuestion(params, level);
        case 'sharing':
            return generateSharingQuestion(params, level);
        case 'grouping':
            return generateGroupingQuestion(params, level);
        case 'repeated_addition':
            return generateRepeatedAdditionQuestion(params, level);
        case 'commutative_mult':
            return generateCommutativeMultQuestion(params, level);
        case 'commutative_add':
            return generateCommutativeAddQuestion(params, level);
        case 'non_commutative_sub':
            return generateNonCommutativeSubQuestion(params, level);
        case 'non_commutative_div':
            return generateNonCommutativeDivQuestion(params, level);
        case 'mental_methods':
            return generateMentalMethodsQuestion(params, level);
        case 'mixed_operations':
            return generateMixedOperationsQuestion(params, level);
        default:
            return generateEqualGroupsQuestion(params, level);
    }
}

// Operations 1-6 are similar to Y1 - reuse the same structure
function generateEqualGroupsQuestion(params, level) {
    const problem = generateEqualGroups(params.tables, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateArrayMultiplicationQuestion(params, level) {
    const problem = generateArrayMultiplication(params.tables, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateArrayDivisionQuestion(params, level) {
    const problem = generateArrayDivision(params.tables, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateSharingQuestion(params, level) {
    const problem = generateSharing(params.tables, params.max_product, params.exact_division_only);
    return formatQuestion(problem, params.question_format, level);
}

function generateGroupingQuestion(params, level) {
    const problem = generateGrouping(params.tables, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

function generateRepeatedAdditionQuestion(params, level) {
    const problem = generateRepeatedAddition(params.tables, params.max_product);
    return formatQuestion(problem, params.question_format, level);
}

/**
 * OPERATION 7: Commutative Multiplication
 * Example: "True or false: 3 × 5 = 5 × 3"
 */
function generateCommutativeMultQuestion(params, level) {
    const problem = generateCommutativeMultiplication(params.tables);
    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const options = shuffle(['true', 'false']);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 8: Commutative Addition
 */
function generateCommutativeAddQuestion(params, level) {
    const problem = generateCommutativeAddition(params.max_product);
    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const options = shuffle(['true', 'false']);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 9: Non-Commutative Subtraction
 * Example: "True or false: 10 - 3 = 3 - 10"
 */
function generateNonCommutativeSubQuestion(params, level) {
    const problem = generateNonCommutativeSubtraction(params.max_product);
    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const options = shuffle(['true', 'false']);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 10: Non-Commutative Division
 */
function generateNonCommutativeDivQuestion(params, level) {
    const problem = generateNonCommutativeDivision(params.tables);
    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const options = shuffle(['true', 'false']);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer,
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 11: Mental Methods
 * Example: "Use your knowledge of 5 × 4 to find 5 × 8"
 */
function generateMentalMethodsQuestion(params, level) {
    const base = randomChoice(params.tables);
    const factor1 = randomInt(2, 6);
    const factor2 = factor1 * 2; // Double
    const answer = base * factor2;

    const text = `Use your knowledge of ${base} × ${factor1} = ${base * factor1} to find ${base} × ${factor2}`;
    const working = `${base} × ${factor2} = double ${base * factor1} = ${answer}`;

    return formatQuestion(
        { text, answer, working, operation: 'mental_methods' },
        params.question_format,
        level
    );
}

/**
 * OPERATION 12: Mixed Operations
 * Example: "Calculate (3 × 4) + 5"
 */
function generateMixedOperationsQuestion(params, level) {
    const a = randomChoice(params.tables);
    const b = randomChoice(params.tables);
    const product = a * b;
    const addend = randomInt(1, 20);
    const answer = product + addend;

    const text = `Calculate (${a} × ${b}) + ${addend}`;
    const working = `${a} × ${b} = ${product}, ${product} + ${addend} = ${answer}`;

    return formatQuestion(
        { text, answer, working, operation: 'mixed_operations' },
        params.question_format,
        level
    );
}

/**
 * Helper function to format questions consistently
 */
function formatQuestion(problem, questionFormat, level) {
    const useMultipleChoice = questionFormat === 'multiple_choice';
    const answer = typeof problem.answer === 'number' ? problem.answer : parseInt(problem.answer) || problem.answer;

    if (useMultipleChoice && typeof answer === 'number') {
        const distractors = generateMultDivDistractors(answer, problem, problem.operation || 'multiplication');
        const options = shuffle([answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: problem.working,
            module: 'C08_Y2_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C08_Y2_CALC',
    generate: generateQuestion
};
