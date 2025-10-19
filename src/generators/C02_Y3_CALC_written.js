/**
 * Year 3 Written Addition and Subtraction Generator
 *
 * Module: C02_Y3_CALC - "Add and subtract numbers with up to three digits,
 * using formal written methods of columnar addition and subtraction"
 *
 * This generator focuses on:
 * - 3-digit addition with and without carrying
 * - 3-digit subtraction with and without borrowing
 * - Formal columnar methods (though we can't show the layout digitally)
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
    getRandomItem
} from './helpers/C01_C03_calculationHelpers.js';

import {
    formatColumnar
} from './helpers/C02_columnarHelpers.js';

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
        case 'crossing_1000':
            return generateCrossing1000(params, level);
        case 'missing_digit_problems':
            return generateMissingDigit(params, level);
        default:
            return generateAdditionNoCarry(params, level);
    }
}

/**
 * OPERATION 1: Addition without Carrying
 * E.g., 234 + 142 = 376 (no column needs to carry)
 */
function generateAdditionNoCarry(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, params.max_3digit);
        answer = a + b;

        // Ensure no carrying
        if (checkCarry(a, b)) continue;

        // Check result is within bounds
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `A school library has ${a} books. They buy ${b} more books. How many books does the library have now?`,
            `${name} collected ${a} ${item} last week and ${b} ${item} this week. How many ${item} altogether?`,
            `There are ${a} people in one cinema and ${b} people in another cinema. How many people in total?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: `Use column method: ${a} + ${b}`,
            module: 'C02_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '+')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Start with the ones column. No carrying needed for this question.',
            module: 'C02_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Subtraction without Borrowing
 * E.g., 487 - 253 = 234 (no column needs to borrow)
 */
function generateSubtractionNoBorrow(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, a - 1);
        answer = a - b;

        // Ensure no borrowing
        if (checkBorrow(a, b)) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `A shop had ${a} ${item} in stock. They sold ${b} ${item}. How many ${item} are left?`,
            `${name} had ${a} points. They lost ${b} points. How many points does ${name} have now?`,
            `There were ${a} people at a stadium. ${b} people left. How many people remained?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: `${params.instruction_hint}: ${a} - ${b}`,
            module: 'C02_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '-')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Start with the ones column. Remember to borrow if needed.',
            module: 'C02_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Addition with Simple Carry
 * E.g., 234 + 178 (carrying in ones place only)
 */
function generateAdditionSimpleCarry(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, params.max_3digit);
        answer = a + b;

        // Must have carrying
        if (!checkCarry(a, b)) continue;

        // For simple carry, limit to single column if specified
        if (params.allow_single_carry) {
            const carryCount = countCarries(a, b);
            if (carryCount > 1) continue;
        }

        // Check result is within bounds
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    return {
        text: `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `${params.instruction_hint}. Remember to carry.`,
        module: 'C02_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Subtraction with Simple Borrow
 * E.g., 345 - 127 (borrowing in one place)
 */
function generateSubtractionSimpleBorrow(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, a - 1);
        answer = a - b;

        // Must have borrowing
        if (!checkBorrow(a, b)) continue;

        // For simple borrow, limit to single column if specified
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
        module: 'C02_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Addition with Carrying
 * Any amount of carrying allowed
 */
function generateAdditionWithCarry(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, params.max_3digit);
        answer = a + b;

        // Check result is within bounds
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A factory produced ${a} items in January and ${b} items in February. How many items in total?`,
            `One train has ${a} passengers and another train has ${b} passengers. How many passengers altogether?`,
            `A charity raised £${a} in one event and £${b} in another event. How much money did they raise in total?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '+')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Start with the ones column. Remember to carry if needed.',
            module: 'C02_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Subtraction with Borrowing
 * Any amount of borrowing allowed
 */
function generateSubtractionWithBorrow(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, a - 1);
        answer = a - b;

        break;
    } while (attempts++ < 100);

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = [
            `A stadium has ${a} seats. ${b} seats are already booked. How many seats are still available?`,
            `A warehouse has ${a} boxes. ${b} boxes are shipped out. How many boxes remain?`,
            `A school has ${a} students. ${b} students are away on a trip. How many students are still at school?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answer.toString(),
            hint: params.instruction_hint,
            module: 'C02_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate using the column method:\n\n${formatColumnar(a, b, '-')}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Start with the ones column. Remember to borrow if needed.',
            module: 'C02_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Mixed Difficulty
 * Random mix of addition and subtraction
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
 * OPERATION 8: Crossing 1000
 * Results that exceed 1000
 */
function generateCrossing1000(params, level) {
    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(600, params.max_3digit);
        b = randomInt(400, params.max_3digit);
        answer = a + b;

        // Ensure it crosses 1000
        if (answer <= 1000) continue;

        // Check result is within bounds
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    return {
        text: `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `${params.instruction_hint}. The answer will be over 1000.`,
        module: 'C02_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Missing Digit Problems
 * E.g., 4_8 + 267 = 715, find the missing digit
 */
function generateMissingDigit(params, level) {
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(params.min_3digit, params.max_3digit);
            b = randomInt(params.min_3digit, params.max_3digit);
            answer = a + b;

            if (answer > params.result_max) continue;

            break;
        } while (attempts++ < 100);

        // Choose which digit to hide from first number
        const aStr = a.toString();
        const digitPosition = randomChoice([0, 1, 2]);
        const hiddenDigit = aStr[digitPosition];
        const hiddenA = aStr.substring(0, digitPosition) + '_' + aStr.substring(digitPosition + 1);

        const distractors = generateDistractors(parseInt(hiddenDigit), 3, 0, 9);
        const options = shuffle([parseInt(hiddenDigit), ...distractors]);

        return {
            text: `Find the missing digit:\n${hiddenA} + ${b} = ${answer}`,
            type: 'multiple_choice',
            options: options,
            answer: hiddenDigit,
            hint: `Work backwards: ${answer} - ${b} = ${a}`,
            module: 'C02_Y3_CALC',
            level: level
        };
    } else {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(params.min_3digit, params.max_3digit);
            b = randomInt(params.min_3digit, a - 1);
            answer = a - b;

            break;
        } while (attempts++ < 100);

        // Choose which digit to hide from first number
        const aStr = a.toString();
        const digitPosition = randomChoice([0, 1, 2]);
        const hiddenDigit = aStr[digitPosition];
        const hiddenA = aStr.substring(0, digitPosition) + '_' + aStr.substring(digitPosition + 1);

        const distractors = generateDistractors(parseInt(hiddenDigit), 3, 0, 9);
        const options = shuffle([parseInt(hiddenDigit), ...distractors]);

        return {
            text: `Find the missing digit:\n${hiddenA} - ${b} = ${answer}`,
            type: 'multiple_choice',
            options: options,
            answer: hiddenDigit,
            hint: `Work backwards: ${answer} + ${b} = ${a}`,
            module: 'C02_Y3_CALC',
            level: level
        };
    }
}

/**
 * Helper: Count number of carries in addition
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
 * Helper: Count number of borrows in subtraction
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
    moduleId: 'C02_Y3_CALC',
    generate: generateQuestion
};
