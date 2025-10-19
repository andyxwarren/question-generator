/**
 * Year 1 Problem-Solving Generator
 *
 * Module: C04_Y1_CALC - "Solve one-step problems that involve addition and subtraction,
 * using concrete objects and pictorial representations, and missing number problems such as 7 = _ – 9"
 *
 * This generator focuses on:
 * - One-step addition and subtraction word problems
 * - Missing number problems in various formats
 * - Reversed equation format (e.g., "7 = ___ - 9")
 * - Adaptive question types (L1-2 multiple choice, L3-4 text input)
 * - Controlled variety contexts for mathematical focus
 */

import { randomChoice, shuffle } from './helpers/N02_numberHelpers.js';
import {
    generateOneStepAddition,
    generateOneStepSubtraction,
    generateMissingAddend,
    generateMissingSubtrahend,
    generateMissingMinuend,
    generateOneStepDistractors
} from './helpers/C04_problemHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'simple_addition_word':
            return generateSimpleAdditionWord(params, level);
        case 'simple_subtraction_word':
            return generateSimpleSubtractionWord(params, level);
        case 'missing_addend':
            return generateMissingAddendQuestion(params, level);
        case 'missing_subtrahend':
            return generateMissingSubtrahendQuestion(params, level);
        case 'missing_minuend':
            return generateMissingMinuendQuestion(params, level);
        case 'reversed_equation':
            return generateReversedEquation(params, level);
        case 'complex_missing':
            return generateComplexMissing(params, level);
        case 'implied_operations':
            return generateImpliedOperations(params, level);
        default:
            return generateSimpleAdditionWord(params, level);
    }
}

/**
 * OPERATION 1: Simple Addition Word Problem
 */
function generateSimpleAdditionWord(params, level) {
    const problem = generateOneStepAddition(params.number_range[0], params.max_value, params);

    // Determine question type based on level (L1-2 MC, L3-4 text)
    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'addition', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Simple Subtraction Word Problem
 */
function generateSimpleSubtractionWord(params, level) {
    const problem = generateOneStepSubtraction(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'subtraction', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Missing Addend (a + ? = c or c = a + ?)
 */
function generateMissingAddendQuestion(params, level) {
    const problem = generateMissingAddend(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    // Combine text and equation for clarity
    const fullText = `${problem.text}\n\n${problem.equation}`;

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'missing_addend', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: fullText,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Missing Subtrahend (a - ? = c or c = a - ?)
 */
function generateMissingSubtrahendQuestion(params, level) {
    const problem = generateMissingSubtrahend(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    const fullText = `${problem.text}\n\n${problem.equation}`;

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'missing_subtrahend', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: fullText,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 5: Missing Minuend (? - b = c or c = ? - b)
 */
function generateMissingMinuendQuestion(params, level) {
    const problem = generateMissingMinuend(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    const fullText = `${problem.text}\n\n${problem.equation}`;

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'missing_minuend', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: fullText,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Reversed Equation (explicit focus on "7 = ___ - 9" format)
 * This operation ensures the curriculum-specified format appears regularly
 */
function generateReversedEquation(params, level) {
    // Force reversed format by temporarily setting frequency to 1.0
    const tempParams = { ...params, reversed_format_frequency: 1.0 };

    // Choose between addition or subtraction for the reversed equation
    const useSubtraction = randomChoice([true, false]);

    let problem;
    if (useSubtraction) {
        problem = generateMissingMinuend(params.number_range[0], params.max_value, tempParams);
    } else {
        problem = generateMissingAddend(params.number_range[0], params.max_value, tempParams);
    }

    const useMultipleChoice = params.question_format === 'multiple_choice';

    const fullText = `Find the missing number:\n\n${problem.equation}`;

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, problem.operation, params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: fullText,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Complex Missing (Level 4 only)
 * More challenging missing number problems with inference
 */
function generateComplexMissing(params, level) {
    // Generate a problem where the missing number can be in multiple positions
    // For example: "Emma has some apples. She gets 5 more and now has 12. How many did she start with?"

    const problem = generateMissingAddend(params.number_range[0], params.max_value, params);

    // Create more complex wording that requires inference
    const complexText = `Emma has some apples. She gets ${problem.values.a} more apples. Now she has ${problem.values.answer} apples. How many apples did Emma have at the start?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.values.b, problem.values, 'complex_missing', params.max_value);
        const options = shuffle([problem.values.b, ...distractors]);

        return {
            text: complexText,
            type: 'multiple_choice',
            options: options,
            answer: problem.values.b.toString(),
            hint: `${problem.values.answer} - ${problem.values.a} = ${problem.values.b}`,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: complexText,
            type: 'text_input',
            answer: problem.values.b.toString(),
            hint: `${problem.values.answer} - ${problem.values.a} = ${problem.values.b}`,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 8: Implied Operations (Level 4 only)
 * Problems where students must determine which operation to use
 */
function generateImpliedOperations(params, level) {
    // Create scenarios where the operation isn't explicitly stated
    const useAddition = randomChoice([true, false]);

    let problem, text, hint;

    if (useAddition) {
        problem = generateOneStepAddition(params.number_range[0], params.max_value, params);
        const scenarios = [
            `Liam has ${problem.values.a} books. Olivia has ${problem.values.b} books. How many books do they have together?`,
            `There are ${problem.values.a} apples in one basket. There are ${problem.values.b} apples in another basket. How many apples in total?`
        ];
        text = randomChoice(scenarios);
        hint = problem.working;
    } else {
        problem = generateOneStepSubtraction(params.number_range[0], params.max_value, params);
        const scenarios = [
            `Noah has ${problem.values.a} stickers. He has ${problem.values.b} more stickers than Ava. How many stickers does Ava have?`,
            `Emma picks ${problem.values.a} flowers. She gives ${problem.values.b} flowers away. How many flowers does Emma have left?`
        ];
        text = randomChoice(scenarios);
        hint = problem.working;
    }

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, useAddition ? 'addition' : 'subtraction', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: hint,
            module: 'C04_Y1_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: hint,
            module: 'C04_Y1_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C04_Y1_CALC',
    generate: generateQuestion
};
