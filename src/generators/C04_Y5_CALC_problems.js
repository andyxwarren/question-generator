/**
 * Year 5 Multi-Step Problem-Solving Generator
 *
 * Module: C04_Y5_CALC - "Solve addition and subtraction multi-step problems in contexts,
 * deciding which operations and methods to use and why"
 *
 * This generator builds on Year 4's two-step foundation and introduces GENUINE multi-step
 * reasoning (3-5 operations) requiring students to hold multiple intermediate results.
 *
 * Key features:
 * - MULTI-STEP problems (3-5 sequential operations)
 * - Strategic distractors targeting partial completion errors
 * - Meaningful contexts scaled appropriately for numbers up to 1,000,000
 * - Decision-making emphasis (which operations to use)
 * - Adaptive question types (L1-2 multiple choice, L3-4 text input)
 * - Level 4 introduces inference and missing information
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
 * Example: "Year 3 has 1842, Year 4 has 2156, Year 5 has 1938. Total students?"
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
            module: 'C04_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Multi-Step Subtraction
 * Example: "Shop has 24560 items. Monday sells 3400, Tuesday 2850, Wednesday 4120. How many left?"
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
            module: 'C04_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Multi-Step Mixed (Addition and Subtraction)
 * Example: "School has 4500 students. 320 join, 280 leave, 150 more join. How many now?"
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
            module: 'C04_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Multi-Step With Inference (Level 4 only)
 * Requires working backwards or deducing unstated values
 * Example: "School has 3 year groups with same students. 45 absent, 321 present. How many per year?"
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

        // Fill remaining
        while (distractors.size < 3) {
            const d = randomInt(Math.max(1, perGroup - 20), perGroup + 20);
            if (d !== perGroup && d > 0) distractors.add(d);
        }

        const options = shuffle([problem.answer, ...Array.from(distractors).slice(0, 3)]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y5_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y5_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C04_Y5_CALC',
    generate: generateQuestion
};
