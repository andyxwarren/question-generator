/**
 * Year 2 Written Addition and Subtraction Generator
 *
 * Module: C02_Y2_CALC - "Add and subtract numbers using concrete objects, pictorial representations, and mentally,
 * including: a two-digit number and ones, a two-digit number and tens, two two-digit numbers, adding three one-digit numbers"
 *
 * This generator focuses on:
 * - Two-digit number + ones (e.g., 23 + 5)
 * - Two-digit number + tens (e.g., 23 + 20)
 * - Two two-digit numbers (e.g., 23 + 45)
 * - Adding three one-digit numbers (e.g., 3 + 5 + 7)
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    generateAddition,
    generateSubtraction,
    checkCarry,
    checkBorrow,
    getRandomName,
    getRandomItem,
    getAdditionContext,
    getSubtractionContext
} from './helpers/calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'twodigit_plus_ones':
            return generateTwoDigitPlusOnes(params, level);
        case 'twodigit_minus_ones':
            return generateTwoDigitMinusOnes(params, level);
        case 'twodigit_plus_tens':
            return generateTwoDigitPlusTens(params, level);
        case 'twodigit_minus_tens':
            return generateTwoDigitMinusTens(params, level);
        case 'twodigit_plus_twodigit':
            return generateTwoDigitPlusTwoDigit(params, level);
        case 'twodigit_minus_twodigit':
            return generateTwoDigitMinusTwoDigit(params, level);
        case 'three_onedigit':
            return generateThreeOneDigit(params, level);
        case 'mixed_operations':
            return generateMixedOperations(params, level);
        case 'complex_missing':
            return generateComplexMissing(params, level);
        default:
            return generateTwoDigitPlusOnes(params, level);
    }
}

/**
 * OPERATION 1: Two-digit + Ones
 * E.g., 23 + 5 = 28
 */
function generateTwoDigitPlusOnes(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(10, params.max_2digit);
        b = randomInt(params.ones_range[0], params.ones_range[1]);
        answer = a + b;

        // Check bridging constraint
        if (params.avoid_bridging) {
            const onesA = a % 10;
            if (onesA + b >= 10) continue;  // Would cross tens boundary
        }

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const text = `${name} has ${a} ${item}. They get ${b} more. How many ${item} does ${name} have now?`;

        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} + ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: `${a} + ${b} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Add the ones: ${a % 10} + ${b}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Two-digit - Ones
 * E.g., 28 - 3 = 25
 */
function generateTwoDigitMinusOnes(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(10, params.max_2digit);
        b = randomInt(params.ones_range[0], Math.min(params.ones_range[1], a));
        answer = a - b;

        // Check bridging constraint
        if (params.avoid_bridging) {
            const onesA = a % 10;
            if (onesA < b) continue;  // Would need to borrow
        }

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const text = `${name} has ${a} ${item}. They give away ${b} ${item}. How many ${item} are left?`;

        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} - ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: `${a} - ${b} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Subtract the ones: ${a % 10} - ${b}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Two-digit + Tens
 * E.g., 23 + 20 = 43
 */
function generateTwoDigitPlusTens(params, level) {
    const a = randomInt(10, params.max_2digit);
    const tensToAdd = randomInt(1, 9);
    const b = tensToAdd * 10;
    const answer = a + b;

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const text = `${name} has ${a} ${item}. They get ${b} more ${item}. How many ${item} altogether?`;

        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} + ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: `${a} + ${b} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Add the tens: ${Math.floor(a / 10)}0 + ${b} = ${Math.floor(a / 10) * 10 + b}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Two-digit - Tens
 * E.g., 48 - 20 = 28
 */
function generateTwoDigitMinusTens(params, level) {
    const tensToSubtract = randomInt(1, 7);
    const b = tensToSubtract * 10;
    const a = randomInt(b + 10, params.max_2digit);  // Ensure a > b
    const answer = a - b;

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const text = `${name} has ${a} ${item}. They use ${b} ${item}. How many ${item} are left?`;

        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} - ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: `${a} - ${b} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Subtract the tens: ${Math.floor(a / 10)}0 - ${b}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 5: Two-digit + Two-digit
 * E.g., 23 + 45 = 68
 */
function generateTwoDigitPlusTwoDigit(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(10, params.max_2digit);
        b = randomInt(10, params.max_2digit);
        answer = a + b;

        // Check carry constraint
        if (params.avoid_carry) {
            if (checkCarry(a, b)) continue;  // Has carrying
        }

        // For level 4, prefer complexity
        if (params.ensure_complexity && level === 4) {
            if (!checkCarry(a, b) && Math.random() < 0.7) continue;  // Prefer with carry
        }

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name1 = getRandomName();
        const name2 = getRandomName();
        const item = getRandomItem();
        const text = `${name1} has ${a} ${item} and ${name2} has ${b} ${item}. How many ${item} do they have altogether?`;

        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} + ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: `${a} + ${b} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: checkCarry(a, b) ? 'Remember to carry' : `${a} + ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Two-digit - Two-digit
 * E.g., 54 - 23 = 31
 */
function generateTwoDigitMinusTwoDigit(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(20, params.max_2digit);
        b = randomInt(10, a - 1);
        answer = a - b;

        // For level 4, prefer complexity
        if (params.ensure_complexity && level === 4) {
            if (!checkBorrow(a, b) && Math.random() < 0.7) continue;  // Prefer with borrow
        }

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const text = `${name} has ${a} ${item}. They give away ${b} ${item}. How many ${item} are left?`;

        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} - ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: `${a} - ${b} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: checkBorrow(a, b) ? 'Remember to borrow/regroup' : `${a} - ${b} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Adding Three One-digit Numbers
 * E.g., 3 + 5 + 7 = 15
 */
function generateThreeOneDigit(params, level) {
    let a, b, c, answer;
    let attempts = 0;

    do {
        a = randomInt(1, 9);
        b = randomInt(1, 9);
        c = randomInt(1, 9);
        answer = a + b + c;

        // Check total doesn't exceed max
        if (answer > params.three_numbers_max) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const text = `${name} has three boxes of ${item}. One box has ${a} ${item}, another has ${b} ${item}, and the third has ${c} ${item}. How many ${item} altogether?`;

        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} + ${b} + ${c} = ${answer}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: `${a} + ${b} + ${c} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Add two numbers first, then add the third`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 8: Mixed Operations
 * Randomly choose from different operation types
 */
function generateMixedOperations(params, level) {
    const subOperations = [
        'twodigit_plus_ones',
        'twodigit_minus_ones',
        'twodigit_plus_tens',
        'twodigit_minus_tens',
        'twodigit_plus_twodigit',
        'twodigit_minus_twodigit',
        'three_onedigit'
    ];

    const operation = randomChoice(subOperations);
    const tempParams = { ...params, operations: [operation] };
    return generateQuestion(tempParams, level);
}

/**
 * OPERATION 9: Complex Missing Numbers
 * Missing numbers in 2-digit calculations
 */
function generateComplexMissing(params, level) {
    const problemType = randomChoice(['missing_addend_2digit', 'missing_subtrahend_2digit']);

    if (problemType === 'missing_addend_2digit') {
        const answer = randomInt(20, params.max_2digit);
        const a = randomInt(10, answer - 5);
        const b = answer - a;

        const distractors = generateDistractors(b, 3, 1, 99);
        const options = shuffle([b, ...distractors]);

        return {
            text: `${a} + ? = ${answer}`,
            type: 'multiple_choice',
            options: options,
            answer: b.toString(),
            hint: `${answer} - ${a} = ${b}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    } else {
        const a = randomInt(20, params.max_2digit);
        const b = randomInt(5, a - 5);
        const answer = a - b;

        const distractors = generateDistractors(b, 3, 1, 99);
        const options = shuffle([b, ...distractors]);

        return {
            text: `${a} - ? = ${answer}`,
            type: 'multiple_choice',
            options: options,
            answer: b.toString(),
            hint: `${a} - ${answer} = ${b}`,
            module: 'C02_Y2_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C02_Y2_CALC',
    generate: generateQuestion
};
