/**
 * M01_Y1_MEAS - Year 1 Measurement: Compare, Describe and Order Measures
 * 
 * Curriculum: "compare, describe and solve practical problems for: lengths and heights 
 * (e.g. long/short, taller/shorter); mass/weight (e.g. heavy/light, heavier than); 
 * capacity and volume (e.g. full/empty, more than/less than); time (e.g. quicker, slower)"
 */

import {
    randomChoice,
    COMPARISON_VOCABULARY,
    generateDirectComparison,
    generateCompleteStatement,
    generateOrdering,
    generatePracticalProblem
} from './helpers/M01_measurementHelpers.js';

/**
 * Generate a Year 1 measurement comparison question
 * @param {object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {object} Question object
 */
export function generateQuestion(params, level) {
    // Select measure type based on level
    const measureType = randomChoice(params.measure_types);

    // Get vocabulary for this measure type
    const vocab = COMPARISON_VOCABULARY[measureType];

    // Select operation based on level
    const operation = randomChoice(params.operations);

    // Get level-specific parameters (with defaults)
    const minDifference = params.min_difference || 2;
    const orderingCount = params.ordering_count || 3;

    // Generate question based on operation
    let question;

    switch (operation) {
        case 'direct_comparison':
            question = generateDirectComparison(measureType, vocab, minDifference);
            break;

        case 'complete_statement':
            // Year 1 uses multiple choice to reduce spelling burden
            question = generateCompleteStatement(measureType, vocab, minDifference, true);
            break;

        case 'ordering':
            const position = Math.random() < 0.5 ? 'first' : 'last';
            // Year 1 uses minSpacing=2 for clearer size differences
            question = generateOrdering(measureType, vocab, position, orderingCount, 2);
            break;

        case 'practical_problem':
            question = generatePracticalProblem(measureType, vocab);
            break;

        default:
            // Fallback to direct comparison
            question = generateDirectComparison(measureType, vocab, minDifference);
    }

    // Add level to question object
    question.level = level;

    return question;
}

export default {
    moduleId: 'M01_Y1_MEAS',
    generate: generateQuestion
};
