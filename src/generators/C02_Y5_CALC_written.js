/**
 * Year 5 Written Addition and Subtraction Generator
 *
 * Module: C02_Y5_CALC - "Add and subtract whole numbers with more than 4 digits,
 * including using formal written methods (columnar addition and subtraction)"
 *
 * This generator focuses on:
 * - 5-7 digit addition with and without carrying
 * - 5-7 digit subtraction with and without borrowing
 * - Formal columnar methods for large numbers
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
        case 'large_numbers':
            return generateLargeNumbers(params, level);
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
    const digitCount = Array.isArray(params.digit_count) ? randomChoice(params.digit_count) : params.digit_count;

    do {
        a = randomInt(params.min_value, params.max_value);
        b = randomInt(params.min_value, params.max_value);
        answer = a + b;

        if (checkCarry(a, b)) continue;
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A country has a population of ${a.toLocaleString()}. ${b.toLocaleString()} immigrants arrive. What is the new population?`,
            `A company's revenue was £${a.toLocaleString()} in one quarter and £${b.toLocaleString()} in another quarter. What was the total revenue?`,
            `Two cities have populations of ${a.toLocaleString()} and ${b.toLocaleString()}. What is the combined population?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: `${params.instruction_hint}: ${a.toLocaleString()} + ${b.toLocaleString()}`,
            module: 'C02_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y5_CALC',
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
        a = randomInt(params.min_value, params.max_value);
        b = randomInt(params.min_value, a - 1);
        answer = a - b;

        if (checkBorrow(a, b)) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A region had ${a.toLocaleString()} trees. ${b.toLocaleString()} trees were cut down. How many trees remain?`,
            `A fund had £${a.toLocaleString()}. £${b.toLocaleString()} was spent. How much money is left?`,
            `${a.toLocaleString()} people were registered. ${b.toLocaleString()} people unregistered. How many people are still registered?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: `${params.instruction_hint}: ${a.toLocaleString()} - ${b.toLocaleString()}`,
            module: 'C02_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate:\n${a.toLocaleString()} - ${b.toLocaleString()} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y5_CALC',
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
        a = randomInt(params.min_value, params.max_value);
        b = randomInt(params.min_value, params.max_value);
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
        module: 'C02_Y5_CALC',
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
        a = randomInt(params.min_value, params.max_value);
        b = randomInt(params.min_value, a - 1);
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
        module: 'C02_Y5_CALC',
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
        a = randomInt(params.min_value, params.max_value);
        b = randomInt(params.min_value, params.max_value);
        answer = a + b;

        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `An online store sold ${a.toLocaleString()} items in November and ${b.toLocaleString()} items in December. How many items were sold in total?`,
            `Two charities raised £${a.toLocaleString()} and £${b.toLocaleString()}. How much did they raise altogether?`,
            `A stadium has ${a.toLocaleString()} seats in the main stand and ${b.toLocaleString()} seats in the side stands. What is the total capacity?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y5_CALC',
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
        a = randomInt(params.min_value, params.max_value);
        b = randomInt(params.min_value, a - 1);
        answer = a - b;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A government budget was £${a.toLocaleString()}. They spent £${b.toLocaleString()}. How much of the budget remains?`,
            `A forest had ${a.toLocaleString()} trees. ${b.toLocaleString()} trees were destroyed in a storm. How many trees are left?`,
            `A company had ${a.toLocaleString()} employees. ${b.toLocaleString()} employees left. How many employees remain?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate:\n${a.toLocaleString()} - ${b.toLocaleString()} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y5_CALC',
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
 * OPERATION 8: Large Numbers (6-7 digits)
 */
function generateLargeNumbers(params, level) {
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(100000, params.max_value);
            b = randomInt(100000, params.max_value);
            answer = a + b;

            if (answer > params.result_max) continue;

            break;
        } while (attempts++ < 100);

        return {
            text: `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${params.instruction_hint}. Work carefully with large numbers.`,
            module: 'C02_Y5_CALC',
            level: level
        };
    } else {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(100000, params.max_value);
            b = randomInt(100000, a - 1);
            answer = a - b;

            break;
        } while (attempts++ < 100);

        return {
            text: `Calculate:\n${a.toLocaleString()} - ${b.toLocaleString()} = ?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${params.instruction_hint}. Work carefully with large numbers.`,
            module: 'C02_Y5_CALC',
            level: level
        };
    }
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
            a = randomInt(10000, 999999);
            b = randomInt(10000, 999999);
            answer = a + b;

            if (answer > params.result_max) continue;

            break;
        } while (attempts++ < 100);

        const aStr = a.toString();
        const digitPosition = randomChoice([...Array(aStr.length).keys()]);
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
            module: 'C02_Y5_CALC',
            level: level
        };
    } else {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(10000, 999999);
            b = randomInt(10000, a - 1);
            answer = a - b;

            break;
        } while (attempts++ < 100);

        const aStr = a.toString();
        const digitPosition = randomChoice([...Array(aStr.length).keys()]);
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
            module: 'C02_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 10: Multi-Step Problems
 */
function generateMultiStep(params, level) {
    const a = randomInt(10000, 500000);
    const b = randomInt(5000, 100000);
    const c = randomInt(2000, 50000);

    const intermediate = a + b;
    const answer = intermediate - c;

    const contexts = [
        `A city's population started at ${a.toLocaleString()}. It grew by ${b.toLocaleString()} people, then ${c.toLocaleString()} people moved away. What is the population now?`,
        `A company had £${a.toLocaleString()} in savings. They earned £${b.toLocaleString()} more, then spent £${c.toLocaleString()}. How much do they have now?`,
        `A warehouse had ${a.toLocaleString()} items. They received ${b.toLocaleString()} items, then shipped ${c.toLocaleString()} items. How many items are in the warehouse now?`
    ];

    return {
        text: randomChoice(contexts),
        type: 'text_input',
        answer: answer.toString(),
        hint: `First add: ${a.toLocaleString()} + ${b.toLocaleString()} = ${intermediate.toLocaleString()}, then subtract: ${intermediate.toLocaleString()} - ${c.toLocaleString()}`,
        module: 'C02_Y5_CALC',
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
    moduleId: 'C02_Y5_CALC',
    generate: generateQuestion
};
