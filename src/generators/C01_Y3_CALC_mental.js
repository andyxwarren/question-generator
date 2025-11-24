/**
 * Year 3 Mental Addition and Subtraction Generator
 *
 * Module: C01_Y3_CALC - "Add and subtract numbers mentally, including:
 *                        a three-digit number and ones,
 *                        a three-digit number and tens,
 *                        a three-digit number and hundreds"
 *
 * Schema v2.0 Compliant:
 * - questionTemplate with [placeholder] notation
 * - questionRendered with actual values
 * - Raw values in values object
 * - Metadata in valueMetadata object
 * - locale and universal flags
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
    let questionTemplate, questionRendered;
    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, ones, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        ones: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `[name] has [base] [item]. They get [ones] more. How many [item] now?`,
                rendered: `${name} has ${base} ${item}. They get ${ones} more. How many ${item} now?`
            },
            {
                template: `A library has [base] books. They buy [ones] new books. How many books in total?`,
                rendered: `A library has ${base} books. They buy ${ones} new books. How many books in total?`
            },
            {
                template: `There are [base] people in a hall. [ones] more people arrive. How many people now?`,
                rendered: `There are ${base} people in a hall. ${ones} more people arrive. How many people now?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] + [unknown] = [answer]`;
        questionRendered = `${base} + ___ = ${answer}`;
        values.unknown = ones;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        // Return as text input for missing number
        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: ones,
            hintTemplate: `What do you add to [base]?`,
            hintRendered: `What do you add to ${base}?`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] + [ones] = ?`;
        questionRendered = `${base} + ${ones} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit, params.max_3digit + 10);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [ones] to the ones digit`,
        hintRendered: `Add ${ones} to the ones digit`,
        locale: 'en-GB',
        universal: true,
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
    let questionTemplate, questionRendered;
    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, ones, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        ones: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `[name] has [base] [item]. They give away [ones] [item]. How many [item] left?`,
                rendered: `${name} has ${base} ${item}. They give away ${ones} ${item}. How many ${item} left?`
            },
            {
                template: `A school has [base] students. [ones] students are absent. How many are present?`,
                rendered: `A school has ${base} students. ${ones} students are absent. How many are present?`
            },
            {
                template: `There were [base] tickets. [ones] tickets were sold. How many tickets remain?`,
                rendered: `There were ${base} tickets. ${ones} tickets were sold. How many tickets remain?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] - [unknown] = [answer]`;
        questionRendered = `${base} - ___ = ${answer}`;
        values.unknown = ones;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: ones,
            hintTemplate: `What do you subtract from [base]?`,
            hintRendered: `What do you subtract from ${base}?`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] - [ones] = ?`;
        questionRendered = `${base} - ${ones} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit - 10, params.max_3digit);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Subtract [ones] from the ones digit`,
        hintRendered: `Subtract ${ones} from the ones digit`,
        locale: 'en-GB',
        universal: true,
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
    let questionTemplate, questionRendered;
    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, tens, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        tens: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `A shop has [base] [item]. They receive [tens] more [item]. How many [item] now?`,
                rendered: `A shop has ${base} ${item}. They receive ${tens} more ${item}. How many ${item} now?`
            },
            {
                template: `[name] scores [base] points, then scores [tens] more points. Total points?`,
                rendered: `${name} scores ${base} points, then scores ${tens} more points. Total points?`
            },
            {
                template: `There are [base] cars in a car park. [tens] more cars arrive. How many cars in total?`,
                rendered: `There are ${base} cars in a car park. ${tens} more cars arrive. How many cars in total?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] + [unknown] = [answer]`;
        questionRendered = `${base} + ___ = ${answer}`;
        values.unknown = tens;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: tens,
            hintTemplate: `Add to the tens place`,
            hintRendered: `Add to the tens place`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] + [tens] = ?`;
        questionRendered = `${base} + ${tens} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit, params.max_3digit + 100);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [tens] to the tens`,
        hintRendered: `Add ${tens} to the tens`,
        locale: 'en-GB',
        universal: true,
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
    let questionTemplate, questionRendered;
    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, tens, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        tens: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `[name] has [base] [item]. They sell [tens] [item]. How many [item] left?`,
                rendered: `${name} has ${base} ${item}. They sell ${tens} ${item}. How many ${item} left?`
            },
            {
                template: `A theatre has [base] seats. [tens] seats are reserved. How many seats available?`,
                rendered: `A theatre has ${base} seats. ${tens} seats are reserved. How many seats available?`
            },
            {
                template: `There were [base] pencils. [tens] pencils were used. How many pencils remain?`,
                rendered: `There were ${base} pencils. ${tens} pencils were used. How many pencils remain?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] - [unknown] = [answer]`;
        questionRendered = `${base} - ___ = ${answer}`;
        values.unknown = tens;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: tens,
            hintTemplate: `Subtract from the tens place`,
            hintRendered: `Subtract from the tens place`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] - [tens] = ?`;
        questionRendered = `${base} - ${tens} = ?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_3digit);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Subtract [tens] from the tens`,
        hintRendered: `Subtract ${tens} from the tens`,
        locale: 'en-GB',
        universal: true,
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
    let questionTemplate, questionRendered;
    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, hundreds, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        hundreds: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `A factory produces [base] [item]. They produce [hundreds] more [item]. Total production?`,
                rendered: `A factory produces ${base} ${item}. They produce ${hundreds} more ${item}. Total production?`
            },
            {
                template: `[name] has [base] points. They earn [hundreds] bonus points. Total points?`,
                rendered: `${name} has ${base} points. They earn ${hundreds} bonus points. Total points?`
            },
            {
                template: `There are [base] books on a shelf and [hundreds] books in storage. How many books in total?`,
                rendered: `There are ${base} books on a shelf and ${hundreds} books in storage. How many books in total?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] + [unknown] = [answer]`;
        questionRendered = `${base} + ___ = ${answer}`;
        values.unknown = hundreds;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: hundreds,
            hintTemplate: `Add to the hundreds place`,
            hintRendered: `Add to the hundreds place`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] + [hundreds] = ?`;
        questionRendered = `${base} + ${hundreds} = ?`;
    }

    const distractors = generateDistractors(answer, 3, params.min_3digit, answer + 200);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Add [hundreds] to the hundreds`,
        hintRendered: `Add ${hundreds} to the hundreds`,
        locale: 'en-GB',
        universal: true,
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
    let questionTemplate, questionRendered;
    const name = getRandomName();
    const item = getRandomItem();

    const values = { base, hundreds, answer, name, item };
    const valueMetadata = {
        base: { type: "number", prefix: "", suffix: "", decimals: 0 },
        hundreds: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    if (style === 'word_problem') {
        const contexts = [
            {
                template: `[name] has [base] [item]. They donate [hundreds] [item]. How many [item] left?`,
                rendered: `${name} has ${base} ${item}. They donate ${hundreds} ${item}. How many ${item} left?`
            },
            {
                template: `A warehouse has [base] boxes. [hundreds] boxes are shipped. How many boxes remain?`,
                rendered: `A warehouse has ${base} boxes. ${hundreds} boxes are shipped. How many boxes remain?`
            },
            {
                template: `There were [base] visitors. [hundreds] visitors left. How many visitors now?`,
                rendered: `There were ${base} visitors. ${hundreds} visitors left. How many visitors now?`
            }
        ];
        const context = randomChoice(contexts);
        questionTemplate = context.template;
        questionRendered = context.rendered;
    } else if (style === 'missing_number') {
        questionTemplate = `[base] - [unknown] = [answer]`;
        questionRendered = `${base} - ___ = ${answer}`;
        values.unknown = hundreds;
        valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: hundreds,
            hintTemplate: `Subtract from the hundreds place`,
            hintRendered: `Subtract from the hundreds place`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        questionTemplate = `[base] - [hundreds] = ?`;
        questionRendered = `${base} - ${hundreds} = ?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_3digit);
    const options = shuffle([answer, ...distractors]);

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Subtract [hundreds] from the hundreds`,
        hintRendered: `Subtract ${hundreds} from the hundreds`,
        locale: 'en-GB',
        universal: true,
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

        const values = { base, tens, ones };
        const valueMetadata = {
            base: { type: "number", prefix: "", suffix: "", decimals: 0 },
            tens: { type: "number", prefix: "", suffix: "", decimals: 0 },
            ones: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const distractors = generateDistractors(answer, 3, params.min_3digit, params.max_3digit + 100);
        const options = shuffle([answer, ...distractors]);

        return {
            questionTemplate: `[base] + [tens] + [ones] = ?`,
            questionRendered: `${base} + ${tens} + ${ones} = ?`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate: `First add [tens], then add [ones]`,
            hintRendered: `First add ${tens}, then add ${ones}`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else if (operationType === 'subtract_tens_and_ones') {
        const tens = randomInt(1, 5) * 10;
        const ones = randomInt(1, 9);
        const answer = base - tens - ones;

        const values = { base, tens, ones };
        const valueMetadata = {
            base: { type: "number", prefix: "", suffix: "", decimals: 0 },
            tens: { type: "number", prefix: "", suffix: "", decimals: 0 },
            ones: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const distractors = generateDistractors(answer, 3, 0, params.max_3digit);
        const options = shuffle([answer, ...distractors]);

        return {
            questionTemplate: `[base] - [tens] - [ones] = ?`,
            questionRendered: `${base} - ${tens} - ${ones} = ?`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate: `First subtract [tens], then subtract [ones]`,
            hintRendered: `First subtract ${tens}, then subtract ${ones}`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y3_CALC',
            level: level
        };
    } else {
        // Mixed: add then subtract or vice versa
        const tens = randomInt(1, 5) * 10;
        const ones = randomInt(1, 9);

        const addFirst = Math.random() < 0.5;
        let answer, questionTemplate, questionRendered;

        if (addFirst) {
            answer = base + tens - ones;
            questionTemplate = `[base] + [tens] - [ones] = ?`;
            questionRendered = `${base} + ${tens} - ${ones} = ?`;
        } else {
            answer = base - tens + ones;
            questionTemplate = `[base] - [tens] + [ones] = ?`;
            questionRendered = `${base} - ${tens} + ${ones} = ?`;
        }

        const values = { base, tens, ones };
        const valueMetadata = {
            base: { type: "number", prefix: "", suffix: "", decimals: 0 },
            tens: { type: "number", prefix: "", suffix: "", decimals: 0 },
            ones: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const distractors = generateDistractors(answer, 3, 0, params.max_3digit + 100);
        const options = shuffle([answer, ...distractors]);

        return {
            questionTemplate,
            questionRendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate: `Work from left to right`,
            hintRendered: `Work from left to right`,
            locale: 'en-GB',
            universal: true,
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
