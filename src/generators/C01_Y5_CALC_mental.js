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
    let questionTemplate, questionRendered;

    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, addend, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        addend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `A company has [base] [item]. They receive [addend] more [item]. How many [item] now?`,
                rendered: `A company has ${formatNumber(base)} ${item}. They receive ${formatNumber(addend)} more ${item}. How many ${item} now?`
            },
            {
                template: `[name] has [base] points. They earn [addend] bonus points. Total points?`,
                rendered: `${name} has ${formatNumber(base)} points. They earn ${formatNumber(addend)} bonus points. Total points?`
            },
            {
                template: `There are [base] people in a stadium. [addend] more people enter. How many people in total?`,
                rendered: `There are ${formatNumber(base)} people in a stadium. ${formatNumber(addend)} more people enter. How many people in total?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] + [unknown] = [answer]`;
        questionRendered = `${formatNumber(base)} + ___ = ${formatNumber(answer)}`;
        values.unknown = addend;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: addend,
            hintTemplate: `What was added to [base]?`,
            hintRendered: `What was added to ${formatNumber(base)}?`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y5_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] + [addend] = ?`;
        questionRendered = `${formatNumber(base)} + ${formatNumber(addend)} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value + powerOf10 * 10);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [addend] mentally`,
        hintRendered: `Add ${formatNumber(addend)} mentally`,
        locale: 'en-GB',
        universal: true,
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
    let questionTemplate, questionRendered;

    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, subtrahend, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        subtrahend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `A warehouse has [base] [item]. They ship [subtrahend] [item]. How many [item] remain?`,
                rendered: `A warehouse has ${formatNumber(base)} ${item}. They ship ${formatNumber(subtrahend)} ${item}. How many ${item} remain?`
            },
            {
                template: `[name] has [base] coins. They spend [subtrahend] coins. How many coins left?`,
                rendered: `${name} has ${formatNumber(base)} coins. They spend ${formatNumber(subtrahend)} coins. How many coins left?`
            },
            {
                template: `There were [base] tickets. [subtrahend] tickets were sold. How many tickets available?`,
                rendered: `There were ${formatNumber(base)} tickets. ${formatNumber(subtrahend)} tickets were sold. How many tickets available?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] - [unknown] = [answer]`;
        questionRendered = `${formatNumber(base)} - ___ = ${formatNumber(answer)}`;
        values.unknown = subtrahend;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: subtrahend,
            hintTemplate: `What was subtracted from [base]?`,
            hintRendered: `What was subtracted from ${formatNumber(base)}?`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y5_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] - [subtrahend] = ?`;
        questionRendered = `${formatNumber(base)} - ${formatNumber(subtrahend)} = ?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Subtract [subtrahend] mentally`,
        hintRendered: `Subtract ${formatNumber(subtrahend)} mentally`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, ones, answer };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        ones: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] + [ones] = ?`;
    const questionRendered = `${formatNumber(base)} + ${ones} = ?`;

    const distractors = generateDistractors(answer, 3, 1000, 10000);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [ones] to the ones place`,
        hintRendered: `Add ${ones} to the ones place`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, ones, answer };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        ones: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] - [ones] = ?`;
    const questionRendered = `${formatNumber(base)} - ${ones} = ?`;

    const distractors = generateDistractors(answer, 3, 1000, 10000);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Subtract [ones] from the ones place`,
        hintRendered: `Subtract ${ones} from the ones place`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, addend, answer };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        addend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] + [addend] = ?`;
    const questionRendered = `${formatNumber(base)} + ${formatNumber(addend)} = ?`;

    const distractors = generateDistractors(answer, 3, 1000, 10000 + addend);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Use place value to add [addend]`,
        hintRendered: `Use place value to add ${formatNumber(addend)}`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, subtrahend, answer };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        subtrahend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] - [subtrahend] = ?`;
    const questionRendered = `${formatNumber(base)} - ${formatNumber(subtrahend)} = ?`;

    const distractors = generateDistractors(answer, 3, 0, 10000);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Use place value to subtract [subtrahend]`,
        hintRendered: `Use place value to subtract ${formatNumber(subtrahend)}`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, addend, answer };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        addend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] + [addend] = ?`;
    const questionRendered = `${formatNumber(base)} + ${formatNumber(addend)} = ?`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [addend] using place value`,
        hintRendered: `Add ${formatNumber(addend)} using place value`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, subtrahend, answer };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        subtrahend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] - [subtrahend] = ?`;
    const questionRendered = `${formatNumber(base)} - ${formatNumber(subtrahend)} = ?`;

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Subtract [subtrahend] using place value`,
        hintRendered: `Subtract ${formatNumber(subtrahend)} using place value`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, addend, answer, roundBase, offset };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        addend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        roundBase: { type: "number", prefix: "", suffix: "", decimals: 0 },
        offset: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] + [addend] = ?\n\nHint: [base] is close to [roundBase]`;
    const questionRendered = `${formatNumber(base)} + ${formatNumber(addend)} = ?\n\nHint: ${formatNumber(base)} is close to ${formatNumber(roundBase)}`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Try: [roundBase] + [addend] then adjust by [offset]`,
        hintRendered: `Try: ${formatNumber(roundBase)} + ${formatNumber(addend)} then adjust by ${offset}`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, addend, answer, hundreds, tens, ones };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        addend: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        hundreds: { type: "number", prefix: "", suffix: "", decimals: 0 },
        tens: { type: "number", prefix: "", suffix: "", decimals: 0 },
        ones: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] + [addend] = ?\n\nHint: Split [addend] into [hundreds] + [tens] + [ones]`;
    const questionRendered = `${formatNumber(base)} + ${formatNumber(addend)} = ?\n\nHint: Split ${formatNumber(addend)} into ${formatNumber(hundreds)} + ${formatNumber(tens)} + ${ones}`;

    const distractors = generateDistractors(answer, 3, params.min_value, 15000);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [hundreds], then [tens], then [ones]`,
        hintRendered: `Add ${formatNumber(hundreds)}, then ${formatNumber(tens)}, then ${ones}`,
        locale: 'en-GB',
        universal: true,
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

    const values = { a, b, answer, roundA, roundB, offsetA, offsetB };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        roundA: { type: "number", prefix: "", suffix: "", decimals: 0 },
        roundB: { type: "number", prefix: "", suffix: "", decimals: 0 },
        offsetA: { type: "number", prefix: "", suffix: "", decimals: 0 },
        offsetB: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[a] + [b] = ?\n\nHint: Round both numbers first`;
    const questionRendered = `${formatNumber(a)} + ${formatNumber(b)} = ?\n\nHint: Round both numbers first`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Try: ([roundA] + [roundB]) then adjust`,
        hintRendered: `Try: (${formatNumber(roundA)} + ${formatNumber(roundB)}) then adjust`,
        locale: 'en-GB',
        universal: true,
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

    const values = { base, addend1, addend2, answer };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        addend1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        addend2: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[base] + [addend1] + [addend2] = ?`;
    const questionRendered = `${formatNumber(base)} + ${formatNumber(addend1)} + ${formatNumber(addend2)} = ?`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [addend1] first, then [addend2]`,
        hintRendered: `Add ${formatNumber(addend1)} first, then ${formatNumber(addend2)}`,
        locale: 'en-GB',
        universal: true,
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
