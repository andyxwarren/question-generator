/**
 * Year 3 Mental Addition and Subtraction Generator
 *
 * Module: C01_Y3_CALC - "Add and subtract numbers mentally, including:
 *                        a three-digit number and ones,
 *                        a three-digit number and tens,
 *                        a three-digit number and hundreds"
 *
 * This generator focuses on:
 * - 3-digit + ones (e.g., 345 + 7)
 * - 3-digit - ones (e.g., 345 - 7)
 * - 3-digit + tens (e.g., 345 + 30)
 * - 3-digit - tens (e.g., 345 - 30)
 * - 3-digit + hundreds (e.g., 345 + 200)
 * - 3-digit - hundreds (e.g., 345 - 200)
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
        case 'add_ones':
            return generateAddOnes(params, level);
        case 'subtract_ones':
            return generateSubtractOnes(params, level);
        case 'add_tens':
            return generateAddTens(params, level);
        case 'subtract_tens':
            return generateSubtractTens(params, level);
        case 'add_hundreds':
            return generateAddHundreds(params, level);
        case 'subtract_hundreds':
            return generateSubtractHundreds(params, level);
        case 'mixed_operations':
            return generateMixedOperations(params, level);
        case 'two_step_mental':
            return generateTwoStepMental(params, level);
        default:
            return generateAddOnes(params, level);
    }
}

/**
 * OPERATION 1: Add Ones
 * Add a single-digit number to a 3-digit number (e.g., 234 + 5)
 */
function generateAddOnes(params, level, attempt = 0) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const ones = randomInt(params.ones_range[0], params.ones_range[1]);

    // Check if we should avoid bridging (crossing tens boundary)
    if (params.avoid_bridging) {
        const currentOnes = base % 10;
        if (currentOnes + ones >= 10) {
            // Would cross boundary, try again (max 20 attempts)
            if (attempt < 20) {
                return generateAddOnes(params, level, attempt + 1);
            } else {
                // Max attempts reached, allow bridging
                const tempParams = { ...params, avoid_bridging: false };
                return generateAddOnes(tempParams, level, 0);
            }
        }
    }

    const answer = base + ones;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `${name} has ${base} ${item}. They get ${ones} more. How many ${item} now?`,
            `A library has ${base} books. They buy ${ones} new books. How many books in total?`,
            `There are ${base} people in a hall. ${ones} more people arrive. How many people now?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${base} + ___ = ${answer}`;
        // Return as text input for missing number
        return {
            text: text,
            type: 'text_input',
            answer: ones.toString(),
            hint: `What do you add to ${base}?`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        text = `${base} + ${ones} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit, params.max_3digit + 10);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Add ${ones} to the ones digit`,
        module: 'C01_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Subtract Ones
 * Subtract a single-digit number from a 3-digit number (e.g., 234 - 5)
 */
function generateSubtractOnes(params, level, attempt = 0) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const ones = randomInt(params.ones_range[0], params.ones_range[1]);

    // Check if we should avoid bridging
    if (params.avoid_bridging) {
        const currentOnes = base % 10;
        if (currentOnes < ones) {
            // Would need to borrow, try again (max 20 attempts)
            if (attempt < 20) {
                return generateSubtractOnes(params, level, attempt + 1);
            } else {
                // Max attempts reached, allow bridging
                const tempParams = { ...params, avoid_bridging: false };
                return generateSubtractOnes(tempParams, level, 0);
            }
        }
    }

    const answer = base - ones;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `${name} has ${base} ${item}. They give away ${ones} ${item}. How many ${item} left?`,
            `A school has ${base} students. ${ones} students are absent. How many are present?`,
            `There were ${base} tickets. ${ones} tickets were sold. How many tickets remain?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${base} - ___ = ${answer}`;
        return {
            text: text,
            type: 'text_input',
            answer: ones.toString(),
            hint: `What do you subtract from ${base}?`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        text = `${base} - ${ones} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit - 10, params.max_3digit);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Subtract ${ones} from the ones digit`,
        module: 'C01_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Add Tens
 * Add a multiple of 10 to a 3-digit number (e.g., 234 + 30)
 */
function generateAddTens(params, level, attempt = 0) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = randomInt(params.tens_range[0] / 10, params.tens_range[1] / 10) * 10;

    // Check if we should avoid bridging hundreds
    if (params.avoid_bridging) {
        const currentTens = Math.floor((base % 100) / 10);
        const addingTens = tens / 10;
        if (currentTens + addingTens >= 10) {
            // Would cross hundreds boundary, try again (max 20 attempts)
            if (attempt < 20) {
                return generateAddTens(params, level, attempt + 1);
            } else {
                // Max attempts reached, allow bridging
                const tempParams = { ...params, avoid_bridging: false };
                return generateAddTens(tempParams, level, 0);
            }
        }
    }

    const answer = base + tens;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `A shop has ${base} ${item}. They receive ${tens} more ${item}. How many ${item} now?`,
            `${name} scores ${base} points, then scores ${tens} more points. Total points?`,
            `There are ${base} cars in a car park. ${tens} more cars arrive. How many cars in total?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${base} + ___ = ${answer}`;
        return {
            text: text,
            type: 'text_input',
            answer: tens.toString(),
            hint: `Add to the tens place`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        text = `${base} + ${tens} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit, params.max_3digit + 100);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Add ${tens} to the tens`,
        module: 'C01_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Subtract Tens
 * Subtract a multiple of 10 from a 3-digit number (e.g., 234 - 30)
 */
function generateSubtractTens(params, level, attempt = 0) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = randomInt(params.tens_range[0] / 10, params.tens_range[1] / 10) * 10;

    // Check if we should avoid bridging
    if (params.avoid_bridging) {
        const currentTens = Math.floor((base % 100) / 10);
        const subtractingTens = tens / 10;
        if (currentTens < subtractingTens) {
            // Would need to borrow from hundreds, try again (max 20 attempts)
            if (attempt < 20) {
                return generateSubtractTens(params, level, attempt + 1);
            } else {
                // Max attempts reached, allow bridging
                const tempParams = { ...params, avoid_bridging: false };
                return generateSubtractTens(tempParams, level, 0);
            }
        }
    }

    const answer = base - tens;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `${name} has ${base} ${item}. They sell ${tens} ${item}. How many ${item} left?`,
            `A theatre has ${base} seats. ${tens} seats are reserved. How many seats available?`,
            `There were ${base} pencils. ${tens} pencils were used. How many pencils remain?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${base} - ___ = ${answer}`;
        return {
            text: text,
            type: 'text_input',
            answer: tens.toString(),
            hint: `Subtract from the tens place`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        text = `${base} - ${tens} = ?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_3digit);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Subtract ${tens} from the tens`,
        module: 'C01_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Add Hundreds
 * Add a multiple of 100 to a 3-digit number (e.g., 234 + 200)
 */
function generateAddHundreds(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const hundreds = randomInt(params.hundreds_range[0] / 100, params.hundreds_range[1] / 100) * 100;

    const answer = base + hundreds;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `A factory produces ${base} ${item}. They produce ${hundreds} more ${item}. Total production?`,
            `${name} has ${base} points. They earn ${hundreds} bonus points. Total points?`,
            `There are ${base} books on a shelf and ${hundreds} books in storage. How many books in total?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${base} + ___ = ${answer}`;
        return {
            text: text,
            type: 'text_input',
            answer: hundreds.toString(),
            hint: `Add to the hundreds place`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        text = `${base} + ${hundreds} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit, answer + 200);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Add ${hundreds} to the hundreds`,
        module: 'C01_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Subtract Hundreds
 * Subtract a multiple of 100 from a 3-digit number (e.g., 534 - 200)
 */
function generateSubtractHundreds(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const maxHundredsToSubtract = Math.floor(base / 100) * 100;
    const hundreds = randomInt(1, Math.min(params.hundreds_range[1] / 100, maxHundredsToSubtract / 100)) * 100;

    const answer = base - hundreds;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `${name} has ${base} ${item}. They donate ${hundreds} ${item}. How many ${item} left?`,
            `A warehouse has ${base} boxes. ${hundreds} boxes are shipped. How many boxes remain?`,
            `There were ${base} visitors. ${hundreds} visitors left. How many visitors now?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${base} - ___ = ${answer}`;
        return {
            text: text,
            type: 'text_input',
            answer: hundreds.toString(),
            hint: `Subtract from the hundreds place`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        text = `${base} - ${hundreds} = ?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_3digit);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Subtract ${hundreds} from the hundreds`,
        module: 'C01_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Mixed Operations
 * Random mix of all three types
 */
function generateMixedOperations(params, level) {
    const operations = ['add_ones', 'subtract_ones', 'add_tens', 'subtract_tens', 'add_hundreds', 'subtract_hundreds'];
    const chosenOp = randomChoice(operations);

    const tempParams = { ...params, operations: [chosenOp] };
    return generateQuestion(tempParams, level);
}

/**
 * OPERATION 8: Two-Step Mental (Level 4 only)
 * Multiple operations in sequence (e.g., 345 + 20 + 6)
 */
function generateTwoStepMental(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);

    const operationType = randomChoice(['add_tens_and_ones', 'subtract_tens_and_ones', 'mixed']);

    if (operationType === 'add_tens_and_ones') {
        const tens = randomInt(1, 5) * 10;
        const ones = randomInt(1, 9);
        const answer = base + tens + ones;

        const text = `${base} + ${tens} + ${ones} = ?`;

        const distractors = generateDistractors(answer, 3, params.min_3digit, params.max_3digit + 100);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `First add ${tens}, then add ${ones}`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else if (operationType === 'subtract_tens_and_ones') {
        const tens = randomInt(1, 5) * 10;
        const ones = randomInt(1, 9);
        const answer = base - tens - ones;

        const text = `${base} - ${tens} - ${ones} = ?`;

        const distractors = generateDistractors(answer, 3, 0, params.max_3digit);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `First subtract ${tens}, then subtract ${ones}`,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        // Mixed: add then subtract or vice versa
        const tens = randomInt(1, 5) * 10;
        const ones = randomInt(1, 9);

        const addFirst = Math.random() < 0.5;
        let answer, text;

        if (addFirst) {
            answer = base + tens - ones;
            text = `${base} + ${tens} - ${ones} = ?`;
        } else {
            answer = base - tens + ones;
            text = `${base} - ${tens} + ${ones} = ?`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_3digit + 100);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Work from left to right`,
            module: 'C01_Y3_CALC',
            level: level
        };
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'C01_Y3_CALC',
    generate: generateQuestion
};
