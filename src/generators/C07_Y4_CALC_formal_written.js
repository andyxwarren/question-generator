/**
 * C07_Y4_CALC - Formal Written Methods (Year 4)
 *
 * Module: C07_Y4_CALC - "Using formal written layout"
 *
 * Focus: Formal written layout using box method for 3-digit × 1-digit multiplication
 *
 * Operations:
 * 1. Complete box method grid (3-digit × 1-digit)
 * 2. Identify partial products
 * 3. Calculate total
 * 4. Setup method correctly
 * 5. Word problems using box method
 *
 * Year 4 extends the box method to 3-digit numbers (e.g., 347 × 5).
 * Students work with larger numbers but the same underlying method.
 * Word problems provide real-world context.
 */

import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import {
    generateFillBoxQuestion,
    generatePartialProductsQuestion,
    generateBoxTotalQuestion,
    generateSetupQuestion,
    generateBoxMethodWordProblem
} from './helpers/c07QuestionTemplates.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    // Year 4: 3-digit × 1-digit
    // Level 1: 100-300 × 2-5
    // Level 2: 100-500 × 2-7
    // Level 3: 100-800 × 2-9
    // Level 4: 100-999 × 2-9

    const a = randomInt(100, params.max_value);  // 3-digit number
    const b = randomInt(2, params.multiplier);    // 1-digit multiplier

    let question;

    switch(operation) {
        case 'box_method_3x1':
            question = generateFillBoxQuestion(a, b, level);
            break;

        case 'partial_products':
            question = generatePartialProductsQuestion(a, b, level);
            break;

        case 'setup_method':
            question = generateSetupQuestion(a, b, level);
            break;

        case 'word_problem':
            question = generateBoxMethodWordProblem(a, b, level);
            break;

        case 'find_total':
            question = generateBoxTotalQuestion(a, b, level);
            break;

        default:
            question = generateFillBoxQuestion(a, b, level);
    }

    // Add module and level properties
    question.module = 'C07_Y4_CALC';
    question.level = level;

    return question;
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y4_CALC',
    generate: generateQuestion
};
