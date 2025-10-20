/**
 * Year 3 Written Multiplication and Division Generator
 *
 * Module: C07_Y3_CALC - "Write and calculate mathematical statements for multiplication and division
 *                        using the multiplication tables that pupils know, including for two-digit
 *                        numbers times one-digit numbers, using mental and progressing to formal
 *                        written methods"
 *
 * This generator focuses on:
 * - Formal written methods for 2-digit × 1-digit multiplication
 * - Columnar multiplication with and without carrying
 * - Expanded multiplication (partitioning)
 * - Division as repeated subtraction/grouping
 * - Grid method as alternative approach
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    formatColumnarMultiply,
    formatColumnarMultiplyWithCarry,
    calculateCarries,
    formatExpandedMultiplication,
    formatGridMethod,
    generateNoCarryMultiplication,
    generateWithCarryMultiplication,
    requiresCarrying
} from './helpers/C07_multiplicationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'columnar_multiply':
            return generateColumnarMultiply(params, level);
        case 'expanded_multiply':
            return generateExpandedMultiply(params, level);
        case 'division_grouping':
            return generateDivisionGrouping(params, level);
        case 'columnar_with_carrying':
            return generateColumnarWithCarrying(params, level);
        case 'missing_digit_multiply':
            return generateMissingDigitMultiply(params, level);
        case 'grid_method':
            return generateGridMethod(params, level);
        default:
            return generateColumnarMultiply(params, level);
    }
}

/**
 * OPERATION 1: Columnar Multiply
 * Standard columnar multiplication layout for 2-digit × 1-digit
 */
function generateColumnarMultiply(params, level) {
    let multiplicand, multiplier;

    // Generate appropriate numbers based on carrying requirements
    if (params.require_carrying === false) {
        const result = generateNoCarryMultiplication(
            params.multiplicand_range[0],
            params.multiplicand_range[1],
            params.multiplier_range[0],
            params.multiplier_range[1]
        );
        multiplicand = result.multiplicand;
        multiplier = result.multiplier;
    } else if (params.require_carrying === 'always') {
        const result = generateWithCarryMultiplication(
            params.multiplicand_range[0],
            params.multiplicand_range[1],
            params.multiplier_range[0],
            params.multiplier_range[1]
        );
        multiplicand = result.multiplicand;
        multiplier = result.multiplier;
    } else {
        // Sometimes - random choice
        multiplicand = randomInt(params.multiplicand_range[0], params.multiplicand_range[1]);
        multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);
    }

    const answer = multiplicand * multiplier;

    const columnarDisplay = formatColumnarMultiply(multiplicand, multiplier, false);

    const text = `Calculate using the column method:<br><br>${columnarDisplay}`;

    const distractors = generateDistractors(answer, 3, 10, params.max_product || 1000, 10);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiply ${multiplicand} by ${multiplier} using the column method. Start with the ones.`,
        module: 'C07_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Expanded Multiply
 * Show multiplication using partitioning (20 × 3) + (3 × 3)
 */
function generateExpandedMultiply(params, level) {
    const multiplicand = randomInt(params.multiplicand_range[0], params.multiplicand_range[1]);
    const multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);

    const answer = multiplicand * multiplier;

    // Calculate the partitioned parts
    const tens = Math.floor(multiplicand / 10) * 10;
    const ones = multiplicand % 10;

    const tensProduct = tens * multiplier;
    const onesProduct = ones * multiplier;

    const questionTypes = [
        {
            text: `Calculate ${multiplicand} × ${multiplier} using partitioning:<br><br>${multiplicand} × ${multiplier} = (${tens} × ${multiplier}) + (${ones} × ${multiplier})<br><br>What is the answer?`,
            showExpanded: true
        },
        {
            text: `${multiplicand} × ${multiplier} = (${tens} × ${multiplier}) + (${ones} × ${multiplier})<br><br>Calculate: (${tens} × ${multiplier}) = ${tensProduct} and (${ones} × ${multiplier}) = ${onesProduct}<br><br>What is ${tensProduct} + ${onesProduct}?`,
            showExpanded: true
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 10, params.max_product || 1000);
    const options = shuffle([answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Partition ${multiplicand} into ${tens} + ${ones}, then multiply each part by ${multiplier}`,
        module: 'C07_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Division Grouping
 * Understanding division as repeated subtraction or grouping
 */
function generateDivisionGrouping(params, level) {
    const divisor = randomChoice(params.tables_known);
    const quotient = randomInt(3, 12);
    const dividend = divisor * quotient;

    const questionTypes = [
        {
            text: `${dividend} ÷ ${divisor} = ?<br><br>Think: How many groups of ${divisor} are in ${dividend}?`,
            answer: quotient
        },
        {
            text: `I have ${dividend} items. I put them into groups of ${divisor}. How many groups do I have?`,
            answer: quotient
        },
        {
            text: `${dividend} sweets are shared equally between ${divisor} children. How many does each child get?`,
            answer: quotient
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(question.answer, 3, 1, 15);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `Think: ___ × ${divisor} = ${dividend}`,
        module: 'C07_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Columnar with Carrying
 * Explicit practice with carrying in columnar multiplication
 */
function generateColumnarWithCarrying(params, level) {
    // Always generate a multiplication that requires carrying
    const result = generateWithCarryMultiplication(
        params.multiplicand_range[0],
        params.multiplicand_range[1],
        params.multiplier_range[0],
        params.multiplier_range[1]
    );

    const multiplicand = result.multiplicand;
    const multiplier = result.multiplier;
    const answer = multiplicand * multiplier;

    const carries = calculateCarries(multiplicand, multiplier);

    const columnarDisplay = formatColumnarMultiplyWithCarry(multiplicand, multiplier, carries);

    const text = `Calculate using the column method. The small numbers above show what you need to carry:<br><br>${columnarDisplay}`;

    const distractors = generateDistractors(answer, 3, 10, params.max_product || 1000, 10);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Remember to add the carried amounts when multiplying each digit`,
        module: 'C07_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Missing Digit Multiply
 * Fill in missing digit in a columnar multiplication
 */
function generateMissingDigitMultiply(params, level) {
    const multiplicand = randomInt(params.multiplicand_range[0], params.multiplicand_range[1]);
    const multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);
    const product = multiplicand * multiplier;

    // Choose which number to make partially hidden
    const hideFrom = randomChoice(['multiplicand', 'multiplier', 'product']);

    let text, answer;

    if (hideFrom === 'multiplicand') {
        const multiplicandStr = multiplicand.toString();
        const hiddenIndex = randomInt(0, multiplicandStr.length - 1);
        const hiddenDigit = multiplicandStr[hiddenIndex];
        const displayMultiplicand = multiplicandStr.substring(0, hiddenIndex) + '?' + multiplicandStr.substring(hiddenIndex + 1);

        text = `What is the missing digit?<br><br><pre class="columnar-calc">  ${displayMultiplicand}
× ${multiplier}
────
  ${product}</pre>`;
        answer = parseInt(hiddenDigit);
    } else if (hideFrom === 'multiplier') {
        text = `What is the missing digit?<br><br><pre class="columnar-calc">  ${multiplicand}
× ?
────
  ${product}</pre>`;
        answer = multiplier;
    } else {
        // Hide digit from product
        const productStr = product.toString();
        const hiddenIndex = randomInt(0, productStr.length - 1);
        const hiddenDigit = productStr[hiddenIndex];
        const displayProduct = productStr.substring(0, hiddenIndex) + '?' + productStr.substring(hiddenIndex + 1);

        text = `What is the missing digit in the answer?<br><br><pre class="columnar-calc">  ${multiplicand}
× ${multiplier}
────
  ${displayProduct}</pre>`;
        answer = parseInt(hiddenDigit);
    }

    const distractors = generateDistractors(answer, 3, 0, 9);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Use the column method to work out what the missing digit must be`,
        module: 'C07_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Grid Method
 * Use grid/area model for multiplication
 */
function generateGridMethod(params, level) {
    const multiplicand = randomInt(params.multiplicand_range[0], params.multiplicand_range[1]);
    const multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);

    const answer = multiplicand * multiplier;

    // Calculate the grid parts
    const tens = Math.floor(multiplicand / 10) * 10;
    const ones = multiplicand % 10;

    const tensProduct = tens * multiplier;
    const onesProduct = ones * multiplier;

    const gridDisplay = formatGridMethod(multiplicand, multiplier);

    const text = `Use the grid method to calculate ${multiplicand} × ${multiplier}:<br><br>${gridDisplay}<br><br>Add the products: ${tensProduct} + ${onesProduct} = ?`;

    const distractors = generateDistractors(answer, 3, 10, params.max_product || 1000);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Add all the numbers in the grid: ${tensProduct} + ${onesProduct}`,
        module: 'C07_Y3_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y3_CALC',
    generate: generateQuestion
};
