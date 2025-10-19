/**
 * Year 6 Multi-Step Problem-Solving Generator (ADVANCED)
 *
 * Module: C04_Y6_CALC - "Solve addition and subtraction multi-step problems in contexts,
 * deciding which operations and methods to use and why"
 *
 * This generator represents the CULMINATION of primary multi-step problem-solving.
 * Year 6 extends Year 5's multi-step reasoning to the highest complexity level in the
 * primary curriculum, with numbers to 10,000,000 and 3-6 sequential operations.
 *
 * Key features:
 * - ADVANCED MULTI-STEP problems (3-6 sequential operations)
 * - Large numbers up to 10,000,000 (scaled appropriately to context)
 * - Strategic distractors targeting complex partial completion errors
 * - Sophisticated contexts requiring multi-stage reasoning
 * - Decision-making emphasis at highest primary level
 * - Adaptive question types (L1-2 multiple choice, L3-4 text input)
 * - Level 4 includes complex inference and missing information
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateMultiStepAddition,
    generateMultiStepSubtraction,
    generateMultiStepMixed,
    generateMultiStepWithInference,
    generateMultiStepDistractors
} from './helpers/C04_problemHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'multi_step_addition':
            return generateMultiStepAdditionQuestion(params, level);
        case 'multi_step_subtraction':
            return generateMultiStepSubtractionQuestion(params, level);
        case 'multi_step_mixed':
            return generateMultiStepMixedQuestion(params, level);
        case 'multi_step_with_inference':
            return generateMultiStepWithInferenceQuestion(params, level);
        default:
            return generateMultiStepMixedQuestion(params, level);
    }
}

/**
 * OPERATION 1: Multi-Step Addition
 * Example: "City has 5 districts. District A: 842,000, B: 1,156,000, C: 938,000, D: 745,000, E: 620,000. Total population?"
 */
function generateMultiStepAdditionQuestion(params, level) {
    const problem = generateMultiStepAddition(
        params.number_range[0],
        params.max_value,
        params,
        params.steps
    );

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateMultiStepDistractors(problem.answer, problem);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Multi-Step Subtraction
 * Example: "Warehouse has 2,456,000 items. Mon: 340,000 shipped, Tue: 285,000, Wed: 412,000, Thu: 198,000. Remaining?"
 */
function generateMultiStepSubtractionQuestion(params, level) {
    const problem = generateMultiStepSubtraction(
        params.number_range[0],
        params.max_value,
        params,
        params.steps
    );

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateMultiStepDistractors(problem.answer, problem);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Multi-Step Mixed (Addition and Subtraction)
 * Example: "Country population: 45,000,000. Year 1: +3,200,000 births, -2,800,000 emigration. Year 2: +2,500,000, -1,900,000. Population now?"
 */
function generateMultiStepMixedQuestion(params, level) {
    const problem = generateMultiStepMixed(
        params.number_range[0],
        params.max_value,
        params,
        params.steps
    );

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateMultiStepDistractors(problem.answer, problem);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Multi-Step With Inference (Level 4 only)
 * Requires sophisticated backwards reasoning or deducing unstated values
 * Example: "Company has 4 equal divisions. Q1: 450,000 profit, Q2: 280,000 loss. Total profit: 1,360,000. Profit per division?"
 */
function generateMultiStepWithInferenceQuestion(params, level) {
    const problem = generateMultiStepWithInference(
        params.number_range[0],
        params.max_value,
        params,
        params.steps
    );

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        // For inference problems, create specialized distractors
        const distractors = new Set();
        const { numGroups, perGroup, total, absent, present } = problem.values;

        // Distractor 1: Only added/subtracted (didn't divide)
        if (total !== perGroup) distractors.add(total);

        // Distractor 2: Used present only (forgot absent)
        const wrongPresent = Math.floor(present / numGroups);
        if (wrongPresent !== perGroup && wrongPresent > 0) distractors.add(wrongPresent);

        // Distractor 3: Off by calculation error
        if (perGroup + 1 > 0) distractors.add(perGroup + 1);
        if (perGroup - 1 > 0) distractors.add(perGroup - 1);

        // Distractor 4: Used wrong divisor
        if (numGroups > 1) {
            const wrongDivisor = Math.floor(total / (numGroups - 1));
            if (wrongDivisor !== perGroup && wrongDivisor > 0) {
                distractors.add(wrongDivisor);
            }
        }

        // Fill remaining
        while (distractors.size < 3) {
            const d = randomInt(Math.max(1, perGroup - 50), perGroup + 50);
            if (d !== perGroup && d > 0) distractors.add(d);
        }

        const options = shuffle([problem.answer, ...Array.from(distractors).slice(0, 3)]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y6_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C04_Y6_CALC',
    generate: generateQuestion
};
