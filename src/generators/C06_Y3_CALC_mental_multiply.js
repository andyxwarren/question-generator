/**
 * Year 3 Mental Multiplication and Division Generator
 *
 * Module: C06_Y3_CALC - "Recall and use multiplication and division facts for the 3, 4 and 8
 *                        multiplication tables"
 *
 * This generator focuses on:
 * - Recall of 3, 4, 8 times tables
 * - Division facts for 3, 4, 8
 * - Understanding doubling relationships (4 is double 2, 8 is double 4)
 * - Building fluency with these specific tables
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    generateMultiplication,
    generateDivision,
    getRandomName,
    getRandomItem
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'multiply_recall':
            return generateMultiplyRecall(params, level);
        case 'divide_recall':
            return generateDivideRecall(params, level);
        case 'groups_of':
            return generateGroupsOf(params, level);
        case 'missing_factor':
            return generateMissingFactor(params, level);
        case 'inverse_mult_div':
            return generateInverseMultDiv(params, level);
        case 'double_relationships':
            return generateDoubleRelationships(params, level);
        case 'fact_families_mult':
            return generateFactFamiliesMult(params, level);
        case 'mixed_tables':
            return generateMixedTables(params, level);
        case 'scaling_problems':
            return generateScalingProblems(params, level);
        case 'two_step_multiply':
            return generateTwoStepMultiply(params, level);
        default:
            return generateMultiplyRecall(params, level);
    }
}

/**
 * OPERATION 1: Multiply Recall
 * Direct recall of multiplication facts for 3, 4, 8 tables
 */
function generateMultiplyRecall(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);

    const answer = table * multiplier;

    const questionTypes = [
        `${table} × ${multiplier} = ?`,
        `${multiplier} × ${table} = ?`,
        `What is ${table} multiplied by ${multiplier}?`,
        `Multiply ${table} by ${multiplier}`
    ];

    const text = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 0, params.max_product, table);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Count in ${table}s: ${multiplier} times`,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Divide Recall
 * Recall division facts (inverse of multiplication)
 */
function generateDivideRecall(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);

    const dividend = table * multiplier;
    const divisor = table;
    const answer = multiplier;

    const questionTypes = [
        `${dividend} ÷ ${divisor} = ?`,
        `What is ${dividend} divided by ${divisor}?`,
        `Divide ${dividend} by ${divisor}`,
        `How many ${divisor}s are in ${dividend}?`
    ];

    const text = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 1, params.max_multiplier);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Think: ___ × ${divisor} = ${dividend}`,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Groups Of (Word Problems)
 * Multiplication as groups
 */
function generateGroupsOf(params, level) {
    const table = randomChoice(params.tables);
    const groups = randomInt(params.min_multiplier, params.max_multiplier);
    const answer = table * groups;

    const name = getRandomName();
    const item = getRandomItem();

    const contexts = [
        `${name} has ${groups} bags. Each bag contains ${table} ${item}. How many ${item} altogether?`,
        `There are ${groups} boxes with ${table} ${item} in each box. How many ${item} in total?`,
        `${name} buys ${groups} packs of ${item}. Each pack has ${table} ${item}. How many ${item} did they buy?`,
        `${groups} friends each have ${table} ${item}. How many ${item} do they have altogether?`
    ];

    const text = randomChoice(contexts);

    const distractors = generateDistractors(answer, 3, 0, params.max_product, table);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${groups} × ${table} or ${table} × ${groups}`,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Missing Factor
 * Find the missing number in multiplication
 */
function generateMissingFactor(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);
    const product = table * multiplier;

    const position = randomChoice(['first', 'second']);

    let text;
    let answer;

    if (position === 'first') {
        text = `___ × ${table} = ${product}`;
        answer = multiplier;
    } else {
        text = `${table} × ___ = ${product}`;
        answer = multiplier;
    }

    const distractors = generateDistractors(answer, 3, 1, params.max_multiplier);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Think: ${product} ÷ ${table} = ?`,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Inverse Multiplication/Division
 * Use inverse relationship between × and ÷
 */
function generateInverseMultDiv(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);
    const product = table * multiplier;

    const questionTypes = [
        {
            text: `If ${table} × ${multiplier} = ${product}, what is ${product} ÷ ${table}?`,
            answer: multiplier
        },
        {
            text: `If ${table} × ${multiplier} = ${product}, what is ${product} ÷ ${multiplier}?`,
            answer: table
        },
        {
            text: `You know that ${table} × ${multiplier} = ${product}. Use this to work out ${product} ÷ ${table}`,
            answer: multiplier
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(question.answer, 3, 1, Math.max(table, multiplier));
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: 'Multiplication and division are inverse operations',
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Double Relationships
 * Understand that 4 is double 2, 8 is double 4
 */
function generateDoubleRelationships(params, level) {
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);

    const relationshipTypes = [
        {
            text: `If 2 × ${multiplier} = ${2 * multiplier}, what is 4 × ${multiplier}?`,
            answer: 4 * multiplier,
            hint: `4 is double 2, so 4 × ${multiplier} is double ${2 * multiplier}`
        },
        {
            text: `If 4 × ${multiplier} = ${4 * multiplier}, what is 8 × ${multiplier}?`,
            answer: 8 * multiplier,
            hint: `8 is double 4, so 8 × ${multiplier} is double ${4 * multiplier}`
        },
        {
            text: `Use the fact 2 × ${multiplier} = ${2 * multiplier} to work out 4 × ${multiplier}`,
            answer: 4 * multiplier,
            hint: `Double the answer: ${2 * multiplier} × 2`
        }
    ];

    const relationship = randomChoice(relationshipTypes);

    const distractors = generateDistractors(relationship.answer, 3, 0, params.max_product);
    const options = shuffle([relationship.answer, ...distractors]);

    return {
        text: relationship.text,
        type: 'multiple_choice',
        options: options,
        answer: relationship.answer.toString(),
        hint: relationship.hint,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Fact Families Multiplication
 * Complete multiplication/division fact families
 */
function generateFactFamiliesMult(params, level) {
    const table = randomChoice(params.tables);
    const multiplier = randomInt(params.min_multiplier + 1, params.max_multiplier);
    const product = table * multiplier;

    // Create fact family
    const family = [
        `${table} × ${multiplier} = ${product}`,
        `${multiplier} × ${table} = ${product}`,
        `${product} ÷ ${table} = ${multiplier}`,
        `${product} ÷ ${multiplier} = ${table}`
    ];

    const missingIndex = randomInt(0, 3);
    const missingFact = family[missingIndex];
    const shownFacts = family.filter((_, i) => i !== missingIndex);

    const factsText = shownFacts.slice(0, -1).join(', ') + ' and ' + shownFacts[shownFacts.length - 1];
    const text = `Complete the fact family: ${factsText}. Which fact is missing?`;

    // Create wrong options
    const wrongAnswers = [
        `${table} × ${multiplier} = ${product + table}`,
        `${product} ÷ ${table} = ${multiplier + 1}`,
        `${table + 1} × ${multiplier} = ${product}`
    ];

    const options = shuffle([missingFact, ...wrongAnswers.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: missingFact,
        hint: `All facts use ${table}, ${multiplier}, and ${product}`,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Mixed Tables
 * Include Year 2 review tables (2, 5, 10) with Year 3 tables
 */
function generateMixedTables(params, level) {
    const allTables = [...params.tables, ...params.review_tables];
    const table = randomChoice(allTables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);
    const answer = table * multiplier;

    const operationType = randomChoice(['multiply', 'divide']);

    let text;
    if (operationType === 'multiply') {
        text = `${table} × ${multiplier} = ?`;
    } else {
        text = `${answer} ÷ ${table} = ?`;
    }

    const correctAnswer = operationType === 'multiply' ? answer : multiplier;

    const distractors = generateDistractors(correctAnswer, 3, operationType === 'divide' ? 1 : 0,
                                           operationType === 'multiply' ? params.max_product : params.max_multiplier);
    const options = shuffle([correctAnswer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer.toString(),
        hint: operationType === 'multiply' ? `Count in ${table}s` : `Think: ___ × ${table} = ${answer}`,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Scaling Problems (Level 4)
 * "3 times as many" type problems
 */
function generateScalingProblems(params, level) {
    const table = randomChoice(params.tables);
    const baseAmount = randomInt(2, 8);
    const answer = table * baseAmount;

    const name1 = getRandomName();
    const name2 = getRandomName();
    const item = getRandomItem();

    const contexts = [
        `${name1} has ${baseAmount} ${item}. ${name2} has ${table} times as many. How many ${item} does ${name2} have?`,
        `${name1} collects ${baseAmount} ${item}. ${name2} collects ${table} times more. How many ${item} does ${name2} collect?`,
        `There are ${baseAmount} ${item} in one group. Another group has ${table} times as many. How many ${item} in the larger group?`
    ];

    const text = randomChoice(contexts);

    const distractors = generateDistractors(answer, 3, 0, params.max_product, table);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `"${table} times as many" means multiply: ${baseAmount} × ${table}`,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Two-Step Multiply (Level 4)
 * Multiply three numbers together
 */
function generateTwoStepMultiply(params, level) {
    const a = randomChoice([2, 3, 4]);
    const b = randomChoice([2, 3, 4]);
    const c = randomInt(2, 3);

    const answer = a * b * c;

    const questionTypes = [
        {
            text: `${a} × ${b} × ${c} = ?`,
            hint: `First: ${a} × ${b} = ${a * b}, then: ${a * b} × ${c}`
        },
        {
            text: `What is ${a} multiplied by ${b} and then by ${c}?`,
            hint: `Step 1: ${a} × ${b} = ${a * b}, Step 2: ${a * b} × ${c}`
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 0, params.max_product);
    const options = shuffle([answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: question.hint,
        module: 'C06_Y3_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C06_Y3_CALC',
    generate: generateQuestion
};
