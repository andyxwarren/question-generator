/**
 * Year 4 Written Multiplication Generator
 *
 * Module: C07_Y4_CALC - "Multiply two-digit and three-digit numbers by a one-digit number using
 *                        formal written layout"
 *
 * This generator focuses on:
 * - Formal columnar multiplication for 2-digit × 1-digit
 * - Formal columnar multiplication for 3-digit × 1-digit
 * - Multiplication with carrying
 * - Grid method as alternative written method
 * - Estimation to check answers
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
    formatGridMethod,
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
        case 'columnar_with_carrying':
            return generateColumnarWithCarrying(params, level);
        case 'grid_method':
            return generateGridMethod(params, level);
        case 'missing_digit_multiply':
            return generateMissingDigitMultiply(params, level);
        case 'estimate_product':
            return generateEstimateProduct(params, level);
        case 'compare_methods':
            return generateCompareMethods(params, level);
        default:
            return generateColumnarMultiply(params, level);
    }
}

/**
 * OPERATION 1: Columnar Multiply
 * Standard columnar multiplication for 2 or 3-digit × 1-digit
 */
function generateColumnarMultiply(params, level) {
    const digitCount = randomChoice(params.digit_count);

    let minMultiplicand, maxMultiplicand;
    if (digitCount === 2) {
        minMultiplicand = 11;
        maxMultiplicand = 99;
    } else {
        minMultiplicand = 100;
        maxMultiplicand = 999;
    }

    // Ensure within params range
    minMultiplicand = Math.max(minMultiplicand, params.multiplicand_range[0]);
    maxMultiplicand = Math.min(maxMultiplicand, params.multiplicand_range[1]);

    let multiplicand, multiplier;

    if (params.require_carrying === 'always') {
        const result = generateWithCarryMultiplication(
            minMultiplicand,
            maxMultiplicand,
            params.multiplier_range[0],
            params.multiplier_range[1]
        );
        multiplicand = result.multiplicand;
        multiplier = result.multiplier;
    } else {
        multiplicand = randomInt(minMultiplicand, maxMultiplicand);
        multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);
    }

    const answer = multiplicand * multiplier;

    const columnarDisplay = formatColumnarMultiply(multiplicand, multiplier, false);

    const text = `Calculate using the formal written method:<br><br>${columnarDisplay}`;

    const distractors = generateDistractors(answer, 3, 50, 10000, 100);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Use the column method. Multiply each digit by ${multiplier}, starting from the right.`,
        module: 'C07_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Columnar with Carrying
 * Explicit carrying practice
 */
function generateColumnarWithCarrying(params, level) {
    const digitCount = randomChoice(params.digit_count);

    let minMultiplicand, maxMultiplicand;
    if (digitCount === 2) {
        minMultiplicand = 11;
        maxMultiplicand = 99;
    } else {
        minMultiplicand = 100;
        maxMultiplicand = 999;
    }

    minMultiplicand = Math.max(minMultiplicand, params.multiplicand_range[0]);
    maxMultiplicand = Math.min(maxMultiplicand, params.multiplicand_range[1]);

    const result = generateWithCarryMultiplication(
        minMultiplicand,
        maxMultiplicand,
        params.multiplier_range[0],
        params.multiplier_range[1]
    );

    const multiplicand = result.multiplicand;
    const multiplier = result.multiplier;
    const answer = multiplicand * multiplier;

    const carries = calculateCarries(multiplicand, multiplier);

    const columnarDisplay = formatColumnarMultiplyWithCarry(multiplicand, multiplier, carries);

    const text = `Calculate using the column method. Remember to add the carried amounts:<br><br>${columnarDisplay}`;

    const distractors = generateDistractors(answer, 3, 50, 10000, 100);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `The small numbers above show what to carry. Add these to the next column.`,
        module: 'C07_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Grid Method
 * Alternative written method using grid/area model
 */
function generateGridMethod(params, level) {
    const digitCount = randomChoice(params.digit_count);

    let minMultiplicand, maxMultiplicand;
    if (digitCount === 2) {
        minMultiplicand = 11;
        maxMultiplicand = 99;
    } else {
        minMultiplicand = 100;
        maxMultiplicand = 999;
    }

    minMultiplicand = Math.max(minMultiplicand, params.multiplicand_range[0]);
    maxMultiplicand = Math.min(maxMultiplicand, params.multiplicand_range[1]);

    const multiplicand = randomInt(minMultiplicand, maxMultiplicand);
    const multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);

    const answer = multiplicand * multiplier;

    const gridDisplay = formatGridMethod(multiplicand, multiplier);

    const text = `Use the grid method to calculate ${multiplicand} × ${multiplier}:<br><br>${gridDisplay}<br><br>What is the total?`;

    const distractors = generateDistractors(answer, 3, 50, 10000, 100);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Add all the products in the grid cells`,
        module: 'C07_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Missing Digit Multiply
 * Fill in missing digit in multiplication
 */
function generateMissingDigitMultiply(params, level) {
    const digitCount = randomChoice(params.digit_count);

    let minMultiplicand, maxMultiplicand;
    if (digitCount === 2) {
        minMultiplicand = 11;
        maxMultiplicand = 99;
    } else {
        minMultiplicand = 100;
        maxMultiplicand = 999;
    }

    minMultiplicand = Math.max(minMultiplicand, params.multiplicand_range[0]);
    maxMultiplicand = Math.min(maxMultiplicand, params.multiplicand_range[1]);

    const multiplicand = randomInt(minMultiplicand, maxMultiplicand);
    const multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);
    const product = multiplicand * multiplier;

    // Choose which to hide
    const hideFrom = randomChoice(['multiplicand', 'product']);

    let text, answer;

    if (hideFrom === 'multiplicand') {
        const multiplicandStr = multiplicand.toString();
        const hiddenIndex = randomInt(0, multiplicandStr.length - 1);
        const hiddenDigit = multiplicandStr[hiddenIndex];
        const displayMultiplicand = multiplicandStr.substring(0, hiddenIndex) + '?' + multiplicandStr.substring(hiddenIndex + 1);

        text = `Find the missing digit:<br><br><pre class="columnar-calc">  ${displayMultiplicand}
× ${multiplier}
────
  ${product}</pre>`;
        answer = parseInt(hiddenDigit);
    } else {
        const productStr = product.toString();
        const hiddenIndex = randomInt(0, productStr.length - 1);
        const hiddenDigit = productStr[hiddenIndex];
        const displayProduct = productStr.substring(0, hiddenIndex) + '?' + productStr.substring(hiddenIndex + 1);

        text = `Find the missing digit in the answer:<br><br><pre class="columnar-calc">  ${multiplicand}
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
        hint: `Work through the multiplication to find what the missing digit must be`,
        module: 'C07_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Estimate Product
 * Estimate before calculating to check reasonableness
 */
function generateEstimateProduct(params, level) {
    const digitCount = randomChoice(params.digit_count);

    let minMultiplicand, maxMultiplicand;
    if (digitCount === 2) {
        minMultiplicand = 11;
        maxMultiplicand = 99;
    } else {
        minMultiplicand = 100;
        maxMultiplicand = 999;
    }

    minMultiplicand = Math.max(minMultiplicand, params.multiplicand_range[0]);
    maxMultiplicand = Math.min(maxMultiplicand, params.multiplicand_range[1]);

    const multiplicand = randomInt(minMultiplicand, maxMultiplicand);
    const multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);

    const exactAnswer = multiplicand * multiplier;

    // Round multiplicand to nearest 10 (or 100 for 3-digit)
    let roundedMultiplicand;
    if (digitCount === 2) {
        roundedMultiplicand = Math.round(multiplicand / 10) * 10;
    } else {
        roundedMultiplicand = Math.round(multiplicand / 100) * 100;
    }

    const estimate = roundedMultiplicand * multiplier;

    const text = `Estimate ${multiplicand} × ${multiplier} by rounding ${multiplicand} to the nearest ${digitCount === 2 ? '10' : '100'}.<br><br>What is your estimate?`;

    const distractors = generateDistractors(estimate, 3, 100, 10000, 50);
    const options = shuffle([estimate, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: estimate.toString(),
        hint: `Round ${multiplicand} to ${roundedMultiplicand}, then multiply: ${roundedMultiplicand} × ${multiplier}`,
        module: 'C07_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Compare Methods
 * Compare grid method and columnar method
 */
function generateCompareMethods(params, level) {
    const multiplicand = randomInt(params.multiplicand_range[0], Math.min(99, params.multiplicand_range[1])); // Keep to 2-digit for clarity
    const multiplier = randomInt(params.multiplier_range[0], params.multiplier_range[1]);

    const answer = multiplicand * multiplier;

    const columnarDisplay = formatColumnarMultiply(multiplicand, multiplier, true);
    const gridDisplay = formatGridMethod(multiplicand, multiplier);

    const text = `Both methods below calculate ${multiplicand} × ${multiplier}. What is the answer?<br><br><strong>Column Method:</strong><br>${columnarDisplay}<br><br><strong>Grid Method:</strong><br>${gridDisplay}`;

    const distractors = generateDistractors(answer, 3, 50, 10000, 100);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Both methods should give the same answer: ${answer}`,
        module: 'C07_Y4_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y4_CALC',
    generate: generateQuestion
};
