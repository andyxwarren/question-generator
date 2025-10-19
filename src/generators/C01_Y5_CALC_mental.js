/**
 * Year 5 Mental Addition and Subtraction Generator
 *
 * Module: C01_Y5_CALC - "Add and subtract numbers mentally with increasingly large numbers"
 *
 * This generator focuses on:
 * - Mental addition/subtraction with 4-5 digit numbers
 * - Adding/subtracting multiples of powers of 10 (10, 100, 1000, 10000)
 * - Mental strategies: partitioning, compensation, rounding
 * - Numbers up to 1,000,000
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors,
    formatNumber
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
        case 'add_multiples_10':
            return generateAddMultiples(params, level, 10);
        case 'subtract_multiples_10':
            return generateSubtractMultiples(params, level, 10);
        case 'add_multiples_100':
            return generateAddMultiples(params, level, 100);
        case 'subtract_multiples_100':
            return generateSubtractMultiples(params, level, 100);
        case 'add_multiples_1000':
            return generateAddMultiples(params, level, 1000);
        case 'subtract_multiples_1000':
            return generateSubtractMultiples(params, level, 1000);
        case 'add_ones_to_4digit':
            return generateAddOnesTo4Digit(params, level);
        case 'subtract_ones_from_4digit':
            return generateSubtractOnesFrom4Digit(params, level);
        case 'add_any_to_4digit':
            return generateAddAnyTo4Digit(params, level);
        case 'subtract_any_from_4digit':
            return generateSubtractAnyFrom4Digit(params, level);
        case 'add_any_to_large':
            return generateAddAnyToLarge(params, level);
        case 'subtract_any_from_large':
            return generateSubtractAnyFromLarge(params, level);
        case 'compensation':
            return generateCompensation(params, level);
        case 'partitioning':
            return generatePartitioning(params, level);
        case 'near_multiples_large':
            return generateNearMultiplesLarge(params, level);
        case 'multi_step_mental':
            return generateMultiStepMental(params, level);
        default:
            return generateAddMultiples(params, level, 100);
    }
}

/**
 * OPERATION 1-3: Add Multiples of 10, 100, 1000
 * Add multiples of powers of 10 to large numbers
 */
function generateAddMultiples(params, level, powerOf10) {
    const base = randomInt(params.min_value, params.max_value);
    const multiplier = randomInt(1, 9);
    const addend = multiplier * powerOf10;

    const answer = base + addend;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `A company has ${formatNumber(base)} ${item}. They receive ${formatNumber(addend)} more ${item}. How many ${item} now?`,
            `${name} has ${formatNumber(base)} points. They earn ${formatNumber(addend)} bonus points. Total points?`,
            `There are ${formatNumber(base)} people in a stadium. ${formatNumber(addend)} more people enter. How many people in total?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${formatNumber(base)} + ___ = ${formatNumber(answer)}`;
        return {
            text: text,
            type: 'text_input',
            answer: addend.toString(),
            hint: `What was added to ${formatNumber(base)}?`,
            module: 'C01_Y5_CALC',
            level: level
        };
    } else {
        text = `${formatNumber(base)} + ${formatNumber(addend)} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value + powerOf10 * 10);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Add ${formatNumber(addend)} mentally`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 4-6: Subtract Multiples of 10, 100, 1000
 * Subtract multiples of powers of 10 from large numbers
 */
function generateSubtractMultiples(params, level, powerOf10) {
    const base = randomInt(params.min_value + powerOf10, params.max_value);
    const multiplier = randomInt(1, Math.min(9, Math.floor(base / powerOf10)));
    const subtrahend = multiplier * powerOf10;

    const answer = base - subtrahend;

    const style = randomChoice(params.question_styles);
    let text;

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        const contexts = [
            `A warehouse has ${formatNumber(base)} ${item}. They ship ${formatNumber(subtrahend)} ${item}. How many ${item} remain?`,
            `${name} has ${formatNumber(base)} coins. They spend ${formatNumber(subtrahend)} coins. How many coins left?`,
            `There were ${formatNumber(base)} tickets. ${formatNumber(subtrahend)} tickets were sold. How many tickets available?`
        ];
        text = randomChoice(contexts);
    } else if (style === 'missing_number') {
        text = `${formatNumber(base)} - ___ = ${formatNumber(answer)}`;
        return {
            text: text,
            type: 'text_input',
            answer: subtrahend.toString(),
            hint: `What was subtracted from ${formatNumber(base)}?`,
            module: 'C01_Y5_CALC',
            level: level
        };
    } else {
        text = `${formatNumber(base)} - ${formatNumber(subtrahend)} = ?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Subtract ${formatNumber(subtrahend)} mentally`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Add Ones to 4-Digit Number
 */
function generateAddOnesTo4Digit(params, level, attempt = 0) {
    const base = randomInt(1000, 9999);
    const ones = randomInt(1, 9);

    if (params.avoid_bridging && (base % 10) + ones >= 10) {
        // Would cross boundary, try again (max 20 attempts)
        if (attempt < 20) {
            return generateAddOnesTo4Digit(params, level, attempt + 1);
        } else {
            // Max attempts reached, allow bridging
            const tempParams = { ...params, avoid_bridging: false };
            return generateAddOnesTo4Digit(tempParams, level, 0);
        }
    }

    const answer = base + ones;
    const text = `${formatNumber(base)} + ${ones} = ?`;

    const distractors = generateDistractors(answer, 3, 1000, 10000);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Add ${ones} to the ones place`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Subtract Ones from 4-Digit Number
 */
function generateSubtractOnesFrom4Digit(params, level, attempt = 0) {
    const base = randomInt(1000, 9999);
    const ones = randomInt(1, 9);

    if (params.avoid_bridging && (base % 10) < ones) {
        // Would need to borrow, try again (max 20 attempts)
        if (attempt < 20) {
            return generateSubtractOnesFrom4Digit(params, level, attempt + 1);
        } else {
            // Max attempts reached, allow bridging
            const tempParams = { ...params, avoid_bridging: false };
            return generateSubtractOnesFrom4Digit(tempParams, level, 0);
        }
    }

    const answer = base - ones;
    const text = `${formatNumber(base)} - ${ones} = ?`;

    const distractors = generateDistractors(answer, 3, 1000, 10000);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Subtract ${ones} from the ones place`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Add Any to 4-Digit
 * Add mentally-friendly numbers to 4-digit numbers
 */
function generateAddAnyTo4Digit(params, level) {
    const base = randomInt(1000, 9999);

    // Generate mentally-friendly addend (multiple of 10, 100, or small number)
    const addendTypes = [
        () => randomInt(1, 9) * 10,      // Tens
        () => randomInt(1, 9) * 100,     // Hundreds
        () => randomInt(1, 9),           // Ones
        () => randomInt(1, 50)           // Small numbers
    ];

    const addend = randomChoice(addendTypes)();
    const answer = base + addend;

    const text = `${formatNumber(base)} + ${formatNumber(addend)} = ?`;

    const distractors = generateDistractors(answer, 3, 1000, 10000 + addend);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Use place value to add ${formatNumber(addend)}`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Subtract Any from 4-Digit
 */
function generateSubtractAnyFrom4Digit(params, level) {
    const base = randomInt(1000, 9999);

    const subtrahendTypes = [
        () => randomInt(1, 9) * 10,
        () => randomInt(1, 9) * 100,
        () => randomInt(1, 9),
        () => randomInt(1, 50)
    ];

    const subtrahend = randomChoice(subtrahendTypes)();
    const answer = base - subtrahend;

    const text = `${formatNumber(base)} - ${formatNumber(subtrahend)} = ?`;

    const distractors = generateDistractors(answer, 3, 0, 10000);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Use place value to subtract ${formatNumber(subtrahend)}`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 11: Add Any to Large Numbers (up to 1,000,000)
 * Keep second operand mentally-friendly (max 9,999) even with large base numbers
 */
function generateAddAnyToLarge(params, level) {
    const base = randomInt(10000, params.max_value);

    // Limit addends to mentally-friendly ranges (max 9,999)
    // Challenge is in the size of the base, not the complexity of addition
    const addendTypes = [
        () => randomInt(1, 9) * 1000,      // 1,000 to 9,000
        () => randomInt(1, 9) * 100,       // 100 to 900
        () => randomInt(1, 99) * 100,      // 100 to 9,900
        () => randomInt(1, 50)             // Small numbers 1-50
    ];

    const addend = randomChoice(addendTypes)();
    const answer = base + addend;

    const text = `${formatNumber(base)} + ${formatNumber(addend)} = ?`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Add ${formatNumber(addend)} using place value`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 12: Subtract Any from Large Numbers
 * Keep second operand mentally-friendly (max 9,999) even with large base numbers
 */
function generateSubtractAnyFromLarge(params, level) {
    const base = randomInt(10000, params.max_value);

    // Limit subtrahends to mentally-friendly ranges (max 9,999)
    const subtrahendTypes = [
        () => randomInt(1, 9) * 1000,      // 1,000 to 9,000
        () => randomInt(1, 9) * 100,       // 100 to 900
        () => randomInt(1, 99) * 100,      // 100 to 9,900
        () => randomInt(1, 50)             // Small numbers 1-50
    ];

    const subtrahend = randomChoice(subtrahendTypes)();
    const answer = base - subtrahend;

    const text = `${formatNumber(base)} - ${formatNumber(subtrahend)} = ?`;

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Subtract ${formatNumber(subtrahend)} using place value`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 13: Compensation Strategy
 * e.g., 4999 + 2347 = 5000 + 2347 - 1
 */
function generateCompensation(params, level) {
    // Generate a number close to a round number
    const roundBase = randomChoice([1000, 5000, 10000, 50000, 100000]);
    const offset = randomChoice([-3, -2, -1, 1, 2, 3]);
    const base = roundBase + offset;

    const addend = randomInt(100, 5000);
    const answer = base + addend;

    const text = `${formatNumber(base)} + ${formatNumber(addend)} = ?\n\nHint: ${formatNumber(base)} is close to ${formatNumber(roundBase)}`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Try: ${formatNumber(roundBase)} + ${formatNumber(addend)} then adjust by ${offset}`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 14: Partitioning Strategy
 * e.g., 3456 + 234 = 3456 + 200 + 30 + 4
 */
function generatePartitioning(params, level) {
    const base = randomInt(1000, 9999);
    const hundreds = randomInt(1, 5) * 100;
    const tens = randomInt(1, 9) * 10;
    const ones = randomInt(1, 9);
    const addend = hundreds + tens + ones;

    const answer = base + addend;

    const text = `${formatNumber(base)} + ${formatNumber(addend)} = ?\n\nHint: Split ${formatNumber(addend)} into ${formatNumber(hundreds)} + ${formatNumber(tens)} + ${ones}`;

    const distractors = generateDistractors(answer, 3, params.min_value, 15000);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Add ${formatNumber(hundreds)}, then ${formatNumber(tens)}, then ${ones}`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 15: Near Multiples with Large Numbers
 */
function generateNearMultiplesLarge(params, level) {
    const roundA = randomInt(10, 99) * 1000;
    const offsetA = randomChoice([-50, -20, -10, 10, 20, 50]);
    const a = roundA + offsetA;

    const roundB = randomInt(1, 9) * 1000;
    const offsetB = randomChoice([-50, -20, -10, 10, 20, 50]);
    const b = roundB + offsetB;

    const answer = a + b;

    const text = `${formatNumber(a)} + ${formatNumber(b)} = ?\n\nHint: Round both numbers first`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Try: (${formatNumber(roundA)} + ${formatNumber(roundB)}) then adjust`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 16: Multi-Step Mental
 */
function generateMultiStepMental(params, level) {
    const base = randomInt(10000, 99999);
    const addend1 = randomInt(1, 9) * 1000;
    const addend2 = randomInt(1, 9) * 100;
    const answer = base + addend1 + addend2;

    const text = `${formatNumber(base)} + ${formatNumber(addend1)} + ${formatNumber(addend2)} = ?`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]).map(n => formatNumber(n));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: formatNumber(answer),
        hint: `Add ${formatNumber(addend1)} first, then ${formatNumber(addend2)}`,
        module: 'C01_Y5_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C01_Y5_CALC',
    generate: generateQuestion
};
