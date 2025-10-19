/**
 * Year 4 Written Addition and Subtraction Generator
 *
 * Module: C02_Y4_CALC - "Add and subtract numbers with up to 4 digits using the formal written methods
 * of columnar addition and subtraction where appropriate"
 *
 * This generator focuses on:
 * - 4-digit addition with and without carrying
 * - 4-digit subtraction with and without borrowing
 * - Formal columnar methods
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    checkCarry,
    checkBorrow,
    getRandomName,
    getRandomItem
} from './helpers/calculationHelpers.js';

import {
    formatColumnar
} from './helpers/columnarHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'addition_no_carry':
            return generateAdditionNoCarry(params, level);
        case 'subtraction_no_borrow':
            return generateSubtractionNoBorrow(params, level);
        case 'addition_simple_carry':
            return generateAdditionSimpleCarry(params, level);
        case 'subtraction_simple_borrow':
            return generateSubtractionSimpleBorrow(params, level);
        case 'addition_with_carry':
            return generateAdditionWithCarry(params, level);
        case 'subtraction_with_borrow':
            return generateSubtractionWithBorrow(params, level);
        case 'mixed_difficulty':
            return generateMixedDifficulty(params, level);
        case 'crossing_10000':
            return generateCrossing10000(params, level);
        case 'missing_digit_problems':
            return generateMissingDigit(params, level);
        case 'multi_step_problems':
            return generateMultiStep(params, level);
        default:
            return generateAdditionNoCarry(params, level);
    }
}

/**
 * OPERATION 1: Addition without Carrying
 */
function generateAdditionNoCarry(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, params.max_4digit);
        answer = a + b;

        if (checkCarry(a, b)) continue;
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A city has ${a.toLocaleString()} residents. ${b.toLocaleString()} more people move to the city. How many residents are there now?`,
            `A company sold ${a.toLocaleString()} products in one year and ${b.toLocaleString()} products the next year. How many products in total?`,
            `Two stadiums hold ${a.toLocaleString()} and ${b.toLocaleString()} people. What is the combined capacity?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: `${params.instruction_hint}: ${a.toLocaleString()} + ${b.toLocaleString()}`,
            module: 'C02_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '+')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Use the column method. Start with the ones column.',
            module: 'C02_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Subtraction without Borrowing
 */
function generateSubtractionNoBorrow(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, a - 1);
        answer = a - b;

        if (checkBorrow(a, b)) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A factory had ${a.toLocaleString()} items. They shipped ${b.toLocaleString()} items. How many items are left?`,
            `A school fundraiser aimed to raise £${a.toLocaleString()}. They have raised £${b.toLocaleString()} so far. How much more do they need?`,
            `${a.toLocaleString()} people attended a concert. ${b.toLocaleString()} left before the end. How many people stayed?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: `${params.instruction_hint}: ${a.toLocaleString()} - ${b.toLocaleString()}`,
            module: 'C02_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '-')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Use the column method. Remember to borrow if needed.',
            module: 'C02_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Addition with Simple Carry
 */
function generateAdditionSimpleCarry(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, params.max_4digit);
        answer = a + b;

        if (!checkCarry(a, b)) continue;

        if (params.allow_single_carry) {
            const carryCount = countCarries(a, b);
            if (carryCount > 1) continue;
        }

        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    return {
        text: `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `${params.instruction_hint}. Remember to carry.`,
        module: 'C02_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Subtraction with Simple Borrow
 */
function generateSubtractionSimpleBorrow(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, a - 1);
        answer = a - b;

        if (!checkBorrow(a, b)) continue;

        if (params.allow_single_carry) {
            const borrowCount = countBorrows(a, b);
            if (borrowCount > 1) continue;
        }

        break;
    } while (attempts++ < 100);

    return {
        text: `Calculate:\n${a.toLocaleString()} - ${b.toLocaleString()} = ?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `${params.instruction_hint}. Remember to borrow/regroup.`,
        module: 'C02_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Addition with Carrying
 */
function generateAdditionWithCarry(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, params.max_4digit);
        answer = a + b;

        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `An airport handled ${a.toLocaleString()} passengers in June and ${b.toLocaleString()} passengers in July. How many passengers in total?`,
            `A charity received donations of £${a.toLocaleString()} and £${b.toLocaleString()}. How much did they receive altogether?`,
            `Two libraries have ${a.toLocaleString()} and ${b.toLocaleString()} books. How many books in total?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '+')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Use the column method. Start with the ones column.',
            module: 'C02_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Subtraction with Borrowing
 */
function generateSubtractionWithBorrow(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, a - 1);
        answer = a - b;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A warehouse has ${a.toLocaleString()} boxes. ${b.toLocaleString()} boxes are shipped. How many boxes remain?`,
            `A town has ${a.toLocaleString()} residents. ${b.toLocaleString()} people moved away. How many residents are left?`,
            `A company had ${a.toLocaleString()} pounds in savings. They spent ${b.toLocaleString()} pounds. How much money is left?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '-')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Use the column method. Remember to borrow if needed.',
            module: 'C02_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Mixed Difficulty
 */
function generateMixedDifficulty(params, level) {
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        const tempParams = { ...params, operations: ['addition_with_carry'] };
        return generateQuestion(tempParams, level);
    } else {
        const tempParams = { ...params, operations: ['subtraction_with_borrow'] };
        return generateQuestion(tempParams, level);
    }
}

/**
 * OPERATION 8: Crossing 10000
 */
function generateCrossing10000(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(6000, params.max_4digit);
        b = randomInt(4000, params.max_4digit);
        answer = a + b;

        if (answer <= 10000) continue;
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    return {
        text: `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `${params.instruction_hint}. The answer will be over 10,000.`,
        module: 'C02_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Missing Digit Problems
 */
function generateMissingDigit(params, level) {
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(params.min_4digit, params.max_4digit);
            b = randomInt(params.min_4digit, params.max_4digit);
            answer = a + b;

            if (answer > params.result_max) continue;

            break;
        } while (attempts++ < 100);

        const aStr = a.toString();
        const digitPosition = randomChoice([0, 1, 2, 3]);
        const hiddenDigit = aStr[digitPosition];
        const hiddenA = aStr.substring(0, digitPosition) + '_' + aStr.substring(digitPosition + 1);

        const distractors = generateDistractors(parseInt(hiddenDigit), 3, 0, 9);
        const options = shuffle([parseInt(hiddenDigit), ...distractors]);

        return {
            text: `Find the missing digit:\n${hiddenA} + ${b.toLocaleString()} = ${answer.toLocaleString()}`,
            type: 'multiple_choice',
            options: options,
            answer: hiddenDigit,
            hint: `Work backwards: ${answer.toLocaleString()} - ${b.toLocaleString()} = ${a.toLocaleString()}`,
            module: 'C02_Y4_CALC',
            level: level
        };
    } else {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(params.min_4digit, params.max_4digit);
            b = randomInt(params.min_4digit, a - 1);
            answer = a - b;

            break;
        } while (attempts++ < 100);

        const aStr = a.toString();
        const digitPosition = randomChoice([0, 1, 2, 3]);
        const hiddenDigit = aStr[digitPosition];
        const hiddenA = aStr.substring(0, digitPosition) + '_' + aStr.substring(digitPosition + 1);

        const distractors = generateDistractors(parseInt(hiddenDigit), 3, 0, 9);
        const options = shuffle([parseInt(hiddenDigit), ...distractors]);

        return {
            text: `Find the missing digit:\n${hiddenA} - ${b.toLocaleString()} = ${answer.toLocaleString()}`,
            type: 'multiple_choice',
            options: options,
            answer: hiddenDigit,
            hint: `Work backwards: ${answer.toLocaleString()} + ${b.toLocaleString()} = ${a.toLocaleString()}`,
            module: 'C02_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 10: Multi-Step Problems
 */
function generateMultiStep(params, level) {
    const a = randomInt(params.min_4digit, params.max_4digit);
    const b = randomInt(1000, 5000);
    const c = randomInt(500, 3000);

    const intermediate = a + b;
    const answer = intermediate - c;

    const name = getRandomName();
    const item = getRandomItem();

    return {
        text: `${name} starts with ${a.toLocaleString()} ${item}. They gain ${b.toLocaleString()} ${item}, then lose ${c.toLocaleString()} ${item}. How many ${item} does ${name} have now?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `First add: ${a.toLocaleString()} + ${b.toLocaleString()} = ${intermediate.toLocaleString()}, then subtract: ${intermediate.toLocaleString()} - ${c.toLocaleString()}`,
        module: 'C02_Y4_CALC',
        level: level
    };
}

/**
 * Helper: Count carries
 */
function countCarries(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();
    const maxLen = Math.max(strA.length, strB.length);

    let carry = 0;
    let carryCount = 0;

    for (let i = 0; i < maxLen; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');
        const sum = digitA + digitB + carry;

        if (sum >= 10) {
            carryCount++;
            carry = 1;
        } else {
            carry = 0;
        }
    }

    return carryCount;
}

/**
 * Helper: Count borrows
 */
function countBorrows(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();

    let borrowCount = 0;

    for (let i = 0; i < strB.length; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');

        if (digitA < digitB) {
            borrowCount++;
        }
    }

    return borrowCount;
}

export default {
    moduleId: 'C02_Y4_CALC',
    generate: generateQuestion
};
