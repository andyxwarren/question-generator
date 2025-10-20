/**
 * Year 2 Written Multiplication and Division Generator
 *
 * Module: C07_Y2_CALC - "Calculate mathematical statements for multiplication and division within
 *                        the multiplication tables and write them using the multiplication (×),
 *                        division (÷) and equals (=) signs"
 *
 * This generator focuses on:
 * - Writing multiplication/division using correct symbols
 * - Calculating simple multiplication within tables
 * - Calculating simple division within tables
 * - Converting word problems to symbolic form
 * - Understanding equation structure
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

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
        case 'write_multiplication':
            return generateWriteMultiplication(params, level);
        case 'calculate_multiply':
            return generateCalculateMultiply(params, level);
        case 'calculate_divide':
            return generateCalculateDivide(params, level);
        case 'complete_equation':
            return generateCompleteEquation(params, level);
        case 'symbol_interpretation':
            return generateSymbolInterpretation(params, level);
        case 'write_fact_family':
            return generateWriteFactFamily(params, level);
        case 'compare_statements':
            return generateCompareStatements(params, level);
        case 'multi_step_equation':
            return generateMultiStepEquation(params, level);
        default:
            return generateCalculateMultiply(params, level);
    }
}

/**
 * OPERATION 1: Write Multiplication
 * Convert word form to symbolic form using ×
 */
function generateWriteMultiplication(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);
    const product = table * multiplier;

    const wordForms = [
        `Write "${multiplier} groups of ${table}" using the × symbol`,
        `Write "${table} multiplied by ${multiplier}" as a mathematical statement`,
        `How do you write "${multiplier} times ${table}" using symbols?`,
        `Write the multiplication: ${multiplier} groups of ${table}`
    ];

    const text = randomChoice(wordForms);

    // Possible correct answers (both forms are acceptable)
    const correctAnswers = [
        `${multiplier} × ${table} = ${product}`,
        `${table} × ${multiplier} = ${product}`
    ];

    // Wrong answers that are close but incorrect
    const wrongAnswers = [
        `${multiplier} + ${table} = ${multiplier + table}`,
        `${product} ÷ ${table} = ${multiplier}`,
        `${multiplier} × ${table}`,  // Missing equals and answer
        `${table} × ${multiplier}`   // Missing equals and answer
    ];

    const options = shuffle([correctAnswers[0], ...wrongAnswers.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswers[0],
        hint: `Use the × symbol and include = ${product}`,
        module: 'C07_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Calculate Multiply
 * Simple multiplication calculation within tables
 */
function generateCalculateMultiply(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);
    const answer = table * multiplier;

    const questionTypes = [
        `${table} × ${multiplier} = ?`,
        `${multiplier} × ${table} = ?`,
        `Calculate: ${table} × ${multiplier}`,
        `What is ${table} × ${multiplier}?`
    ];

    const text = randomChoice(questionTypes);

    if (level <= 2) {
        // Multiple choice for beginning/developing
        const distractors = generateDistractors(answer, 3, 0, params.max_product, table);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Think: ${multiplier} groups of ${table}`,
            module: 'C07_Y2_CALC',
            level: level
        };
    } else {
        // Text input for meeting/exceeding
        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Count in ${table}s: ${multiplier} times`,
            module: 'C07_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Calculate Divide
 * Simple division calculation within tables
 */
function generateCalculateDivide(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);

    const dividend = table * multiplier;
    const divisor = table;
    const answer = multiplier;

    const questionTypes = [
        `${dividend} ÷ ${divisor} = ?`,
        `Calculate: ${dividend} ÷ ${divisor}`,
        `What is ${dividend} ÷ ${divisor}?`,
        `Divide ${dividend} by ${divisor}`
    ];

    const text = randomChoice(questionTypes);

    if (level <= 2) {
        // Multiple choice for beginning/developing
        const distractors = generateDistractors(answer, 3, 1, params.max_multiplier);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Think: ___ × ${divisor} = ${dividend}`,
            module: 'C07_Y2_CALC',
            level: level
        };
    } else {
        // Text input for meeting/exceeding
        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Think: How many ${divisor}s make ${dividend}?`,
            module: 'C07_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Complete Equation
 * Fill in missing number in multiplication/division
 */
function generateCompleteEquation(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);
    const product = table * multiplier;

    const equationTypes = [
        {
            text: `${table} × ? = ${product}`,
            answer: multiplier,
            hint: `${product} ÷ ${table} = ?`
        },
        {
            text: `? × ${table} = ${product}`,
            answer: multiplier,
            hint: `${product} ÷ ${table} = ?`
        },
        {
            text: `${product} ÷ ${table} = ?`,
            answer: multiplier,
            hint: `Think: ___ × ${table} = ${product}`
        },
        {
            text: `${product} ÷ ? = ${multiplier}`,
            answer: table,
            hint: `What do you divide ${product} by to get ${multiplier}?`
        }
    ];

    const equation = randomChoice(equationTypes);

    const distractors = generateDistractors(equation.answer, 3, 1, params.max_multiplier);
    const options = shuffle([equation.answer, ...distractors]);

    return {
        text: `Complete the equation: ${equation.text}`,
        type: 'multiple_choice',
        options: options,
        answer: equation.answer.toString(),
        hint: equation.hint,
        module: 'C07_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Symbol Interpretation
 * Match word problem to correct equation
 */
function generateSymbolInterpretation(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);
    const product = table * multiplier;

    const name = getRandomName();
    const item = getRandomItem();

    const scenarios = [
        {
            problem: `${name} has ${multiplier} bags with ${table} ${item} in each bag. Which equation shows this?`,
            correct: `${multiplier} × ${table} = ${product}`
        },
        {
            problem: `${name} shares ${product} ${item} equally between ${table} friends. Which equation shows this?`,
            correct: `${product} ÷ ${table} = ${multiplier}`
        },
        {
            problem: `There are ${table} boxes. Each box contains ${multiplier} ${item}. Which equation shows the total?`,
            correct: `${table} × ${multiplier} = ${product}`
        }
    ];

    const scenario = randomChoice(scenarios);

    // Generate wrong options
    const wrongOptions = [
        `${table} + ${multiplier} = ${table + multiplier}`,
        `${product} - ${table} = ${product - table}`,
        `${table} × ${multiplier}`  // Missing the answer part
    ];

    const options = shuffle([scenario.correct, ...wrongOptions.slice(0, 3)]);

    return {
        text: scenario.problem,
        type: 'multiple_choice',
        options: options,
        answer: scenario.correct,
        hint: 'Look for the key words to identify the operation',
        module: 'C07_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Write Fact Family
 * Write related multiplication/division facts
 */
function generateWriteFactFamily(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier + 1, params.max_multiplier); // Avoid 0 or 1 for clearer families
    const product = table * multiplier;

    const factFamily = [
        `${table} × ${multiplier} = ${product}`,
        `${multiplier} × ${table} = ${product}`,
        `${product} ÷ ${table} = ${multiplier}`,
        `${product} ÷ ${multiplier} = ${table}`
    ];

    const missingIndex = randomInt(0, 3);
    const correctAnswer = factFamily[missingIndex];
    const shownFacts = factFamily.filter((_, i) => i !== missingIndex);

    const text = `These facts are in the same family: ${shownFacts[0]}, ${shownFacts[1]}, ${shownFacts[2]}. Which fact completes the family?`;

    // Generate wrong options
    const wrongOptions = [
        `${table} + ${multiplier} = ${table + multiplier}`,
        `${product} - ${table} = ${product - table}`,
        `${table} × ${multiplier + 1} = ${table * (multiplier + 1)}`
    ];

    const options = shuffle([correctAnswer, ...wrongOptions.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: `All facts use the numbers ${table}, ${multiplier}, and ${product}`,
        module: 'C07_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Compare Statements
 * Determine which multiplication/division statement is greater
 */
function generateCompareStatements(params, level) {
    const table1 = randomChoice(params.tables);
    const mult1 = randomInt(params.min_multiplier, params.max_multiplier);
    const product1 = table1 * mult1;

    const table2 = randomChoice(params.tables);
    const mult2 = randomInt(params.min_multiplier, params.max_multiplier);
    const product2 = table2 * mult2;

    // Ensure they're different
    if (product1 === product2) {
        const adjustedMult2 = mult2 + 1 <= params.max_multiplier ? mult2 + 1 : mult2 - 1;
        const adjustedProduct2 = table2 * adjustedMult2;

        const statement1 = `${table1} × ${mult1}`;
        const statement2 = `${table2} × ${adjustedMult2}`;

        const correctAnswer = product1 > adjustedProduct2 ? statement1 : statement2;

        const text = `Which is greater: ${statement1} or ${statement2}?`;

        return {
            text: text,
            type: 'multiple_choice',
            options: [statement1, statement2, 'They are equal'],
            answer: correctAnswer,
            hint: `Calculate both: ${statement1} = ${product1}, ${statement2} = ${adjustedProduct2}`,
            module: 'C07_Y2_CALC',
            level: level
        };
    }

    const statement1 = `${table1} × ${mult1}`;
    const statement2 = `${table2} × ${mult2}`;

    const correctAnswer = product1 > product2 ? statement1 : statement2;

    const text = `Which is greater: ${statement1} or ${statement2}?`;

    return {
        text: text,
        type: 'multiple_choice',
        options: [statement1, statement2, 'They are equal'],
        answer: correctAnswer,
        hint: `Calculate both: ${statement1} = ${product1}, ${statement2} = ${product2}`,
        module: 'C07_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Multi-Step Equation
 * Calculate simple two-operation problems
 */
function generateMultiStepEquation(params, level) {
    const table = randomChoice(params.tables);
    const mult1 = randomInt(2, 4); // Keep small for Year 2
    const mult2 = randomInt(2, 3);

    const step1 = table * mult1;
    const answer = step1 ÷ table * mult2;

    // Ensure answer is a whole number
    const finalAnswer = Math.floor(answer);

    const questionTypes = [
        {
            text: `${table} × ${mult1} ÷ ${table} = ?`,
            answer: mult1,
            hint: `First: ${table} × ${mult1} = ${step1}, then: ${step1} ÷ ${table}`
        },
        {
            text: `${step1} ÷ ${table} × ${mult2} = ?`,
            answer: mult1 * mult2,
            hint: `First: ${step1} ÷ ${table} = ${mult1}, then: ${mult1} × ${mult2}`
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(question.answer, 3, 1, 20);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: `Calculate: ${question.text}`,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: question.hint,
        module: 'C07_Y2_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y2_CALC',
    generate: generateQuestion
};
