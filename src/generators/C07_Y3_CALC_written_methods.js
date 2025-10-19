/**
 * C07_Y3_CALC - Written Methods (Year 3)
 *
 * Module: C07_Y3_CALC - "Progressing to formal written methods"
 *
 * Focus: Formal written methods using box method for 2-digit × 1-digit multiplication
 *
 * Operations:
 * 1. Complete box method grid (fill in missing products)
 * 2. Identify partial products needed
 * 3. Calculate total from completed grid
 * 4. Choose correct grid setup (decomposition)
 * 5. Calculate individual partial product
 *
 * Year 3 introduces the box method as a formal written approach.
 * Students learn to decompose 2-digit numbers (e.g., 47 = 40 + 7)
 * and multiply by single digits.
 */

import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import {
    generateFillBoxQuestion,
    generatePartialProductsQuestion,
    generateBoxTotalQuestion,
    generateSetupQuestion,
    generateSingleProductQuestion
} from './helpers/c07QuestionTemplates.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    // Year 3: 2-digit × 1-digit
    // Level 1: 10-30 × 2-5
    // Level 2: 10-50 × 2-7
    // Level 3: 10-80 × 2-9
    // Level 4: 10-99 × 2-9

    const a = randomInt(10, params.max_value);  // 2-digit number
    const b = randomInt(2, params.multiplier);   // 1-digit multiplier

    let question;

    switch(operation) {
        case 'box_method_2x1':
            question = generateFillBoxQuestion(a, b, level);
            break;

        case 'partial_products':
            question = generatePartialProductsQuestion(a, b, level);
            break;

        case 'identify_decomposition':
            question = generateSetupQuestion(a, b, level);
            break;

        case 'calculate_product':
            question = generateSingleProductQuestion(a, b, level);
            break;

        case 'find_total':
            question = generateBoxTotalQuestion(a, b, level);
            break;

        default:
            question = generateFillBoxQuestion(a, b, level);
    }

    // Add module and level properties
    question.module = 'C07_Y3_CALC';
    question.level = level;

    return question;
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y3_CALC',
    generate: generateQuestion
};
