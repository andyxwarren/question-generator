/**
 * Year 2 Mental Multiplication and Division Generator
 *
 * Module: C06_Y2_CALC - "Recall and use multiplication and division facts for the 2, 5 and 10
 *                        multiplication tables, including recognising odd and even numbers"
 *
 * This generator focuses on:
 * - Recall of 2, 5, 10 times tables
 * - Division facts for 2, 5, 10
 * - Recognizing odd and even numbers
 * - Understanding odd/even patterns
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
    isOdd,
    isEven,
    getRandomName,
    getRandomItem,
    getMultiplicationContext,
    getDivisionContext
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
        case 'odd_even_identify':
            return generateOddEvenIdentify(params, level);
        case 'odd_even_patterns':
            return generateOddEvenPatterns(params, level);
        case 'odd_even_operations':
            return generateOddEvenOperations(params, level);
        case 'groups_of':
            return generateGroupsOf(params, level);
        case 'missing_factor':
            return generateMissingFactor(params, level);
        case 'inverse_mult_div':
            return generateInverseMultDiv(params, level);
        case 'fact_families_mult':
            return generateFactFamiliesMult(params, level);
        case 'two_step_multiply':
            return generateTwoStepMultiply(params, level);
        default:
            return generateMultiplyRecall(params, level);
    }
}

/**
 * OPERATION 1: Multiply Recall
 * Direct recall of multiplication facts for 2, 5, 10 tables
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
        module: 'C06_Y2_CALC',
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
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Odd/Even Identify
 * Recognize whether a number is odd or even
 */
function generateOddEvenIdentify(params, level) {
    const number = randomInt(params.odd_even_range[0], params.odd_even_range[1]);
    const correctAnswer = isOdd(number) ? 'odd' : 'even';

    const questionTypes = [
        `Is ${number} odd or even?`,
        `${number} is an ___ number`,
        `Which type of number is ${number}?`
    ];

    const text = randomChoice(questionTypes);

    return {
        text: text,
        type: 'multiple_choice',
        options: ['odd', 'even'],
        answer: correctAnswer,
        hint: 'Even numbers end in 0, 2, 4, 6, 8. Odd numbers end in 1, 3, 5, 7, 9',
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Odd/Even Patterns
 * Understand patterns in odd/even numbers and multiples
 */
function generateOddEvenPatterns(params, level) {
    const patternTypes = [
        {
            question: 'All multiples of 2 are ___ numbers',
            answer: 'even',
            hint: '2, 4, 6, 8, 10... all end in even digits'
        },
        {
            question: 'All multiples of 5 end in ___ or ___',
            answer: '0 or 5',
            options: ['0 or 5', '1 or 6', '2 or 7', '3 or 8'],
            hint: 'Count in 5s: 5, 10, 15, 20, 25...'
        },
        {
            question: 'All multiples of 10 end in ___',
            answer: '0',
            options: ['0', '5', '2', '1'],
            hint: '10, 20, 30, 40... all end in 0'
        },
        {
            question: 'Which numbers are always even?',
            answer: 'multiples of 2',
            options: ['multiples of 2', 'multiples of 5', 'multiples of 3', 'all numbers'],
            hint: 'The 2 times table gives even numbers'
        }
    ];

    const pattern = randomChoice(patternTypes);

    return {
        text: pattern.question,
        type: 'multiple_choice',
        options: pattern.options || ['odd', 'even'],
        answer: pattern.answer,
        hint: pattern.hint,
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Odd/Even Operations (Level 3+)
 * Understand results of operations with odd/even
 */
function generateOddEvenOperations(params, level) {
    const operationTypes = [
        {
            question: 'When you add two even numbers, the answer is always ___',
            answer: 'even',
            hint: '2 + 4 = 6, 6 + 8 = 14 (all even)'
        },
        {
            question: 'When you add two odd numbers, the answer is always ___',
            answer: 'even',
            hint: '3 + 5 = 8, 7 + 9 = 16 (all even)'
        },
        {
            question: 'When you add an odd number and an even number, the answer is always ___',
            answer: 'odd',
            hint: '3 + 4 = 7, 5 + 6 = 11 (all odd)'
        },
        {
            question: 'When you multiply two even numbers, the answer is always ___',
            answer: 'even',
            hint: '2 × 4 = 8, 6 × 8 = 48 (all even)'
        }
    ];

    const operation = randomChoice(operationTypes);

    return {
        text: operation.question,
        type: 'multiple_choice',
        options: ['odd', 'even'],
        answer: operation.answer,
        hint: operation.hint,
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Groups Of (Word Problems)
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
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Missing Factor
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
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Inverse Multiplication/Division
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
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Fact Families Multiplication (Level 4)
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
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Two-Step Multiply (Level 4)
 * Multiply three numbers together
 * Kept very simple for Year 2 - max product around 30
 */
function generateTwoStepMultiply(params, level) {
    const tables = params.tables;
    // Use small numbers to keep products mentally calculable for Year 2
    const a = randomChoice([2, 2, 3]);  // Weighted toward 2
    const b = randomChoice([2, 5]);     // Only 2 or 5
    const c = randomInt(1, 3);          // 1, 2, or 3

    const answer = a * b * c;

    // Safety check: if product is too large for Year 2, regenerate
    if (answer > 30 && params._attempt < 5) {
        return generateTwoStepMultiply({ ...params, _attempt: (params._attempt || 0) + 1 }, level);
    }

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
        module: 'C06_Y2_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C06_Y2_CALC',
    generate: generateQuestion
};
