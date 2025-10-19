/**
 * Year 2 Problem-Solving Generator
 *
 * Module: C04_Y2_CALC - "Solve problems with addition and subtraction: using concrete objects and pictorial
 * representations, including those involving numbers, quantities and measures; applying their increasing
 * knowledge of mental and written methods"
 *
 * This generator extends Year 1 and adds:
 * - Larger numbers (to 100)
 * - Money contexts (pence and pounds)
 * - Length contexts (cm, m)
 * - Mass contexts (g, kg)
 * - Capacity contexts (ml, l) at Level 4
 * - Adaptive question types (L1-2 multiple choice, L3-4 text input)
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateOneStepAddition,
    generateOneStepSubtraction,
    generateMissingAddend,
    generateMissingSubtrahend,
    generateMissingMinuend,
    generateMoneyProblem,
    generateLengthProblem,
    generateMassProblem,
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
        case 'money_problems_simple':
            return generateMoneyProblemQuestion(params, level);
        case 'money_problems_change':
            return generateMoneyChangeQuestion(params, level);
        case 'length_problems':
            return generateLengthProblemQuestion(params, level);
        case 'mass_problems':
            return generateMassProblemQuestion(params, level);
        case 'mixed_measures':
            return generateMixedMeasuresQuestion(params, level);
        default:
            return generateSimpleAdditionWord(params, level);
    }
}

/**
 * OPERATION 1: Simple Addition Word Problem (extends Y1 with larger numbers)
 */
function generateSimpleAdditionWord(params, level) {
    const problem = generateOneStepAddition(params.number_range[0], params.max_value, params);

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
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Simple Subtraction Word Problem (extends Y1 with larger numbers)
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
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3-5: Missing number problems (same as Y1, extended range)
 */
function generateMissingAddendQuestion(params, level) {
    const problem = generateMissingAddend(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';
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
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

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
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

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
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Money Problems (NEW in Y2)
 * Simple addition/subtraction with money (pence or pounds)
 */
function generateMoneyProblemQuestion(params, level) {
    const useAddition = randomChoice([true, false]);
    const problem = generateMoneyProblem(params.number_range[0], params.max_value, params, useAddition ? 'addition' : 'subtraction');

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, { a: problem.answer, b: 0 }, useAddition ? 'addition' : 'subtraction', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Money Change Problems (Level 4 only)
 * Giving change scenarios
 */
function generateMoneyChangeQuestion(params, level) {
    // Generate a scenario where someone pays and gets change
    const itemCost = randomInt(10, params.max_value - 20);
    const moneyGiven = randomInt(itemCost + 5, Math.min(100, params.max_value));
    const change = moneyGiven - itemCost;

    const unit = params.money_units.includes('£') && moneyGiven >= 100 ? '£' : 'p';

    const text = `Emma buys a toy for ${itemCost}p. She pays with ${moneyGiven}p. How much change does she get?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(change, { a: moneyGiven, b: itemCost }, 'subtraction', params.max_value);
        const options = shuffle([change, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: change.toString(),
            hint: `${moneyGiven} - ${itemCost} = ${change}`,
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: change.toString(),
            hint: `${moneyGiven} - ${itemCost} = ${change}`,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 8: Length Problems (NEW in Y2)
 */
function generateLengthProblemQuestion(params, level) {
    const useAddition = randomChoice([true, false]);
    const problem = generateLengthProblem(params.number_range[0], params.max_value, params, useAddition ? 'addition' : 'subtraction');

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, { a: problem.answer, b: 0 }, useAddition ? 'addition' : 'subtraction', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 9: Mass Problems (NEW in Y2)
 */
function generateMassProblemQuestion(params, level) {
    const useAddition = randomChoice([true, false]);
    const problem = generateMassProblem(params.number_range[0], params.max_value, params, useAddition ? 'addition' : 'subtraction');

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, { a: problem.answer, b: 0 }, useAddition ? 'addition' : 'subtraction', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 10: Mixed Measures (Level 3+)
 * Randomly choose between different measure types
 */
function generateMixedMeasuresQuestion(params, level) {
    const measureType = randomChoice(['money', 'length', 'mass']);

    if (measureType === 'money') {
        return generateMoneyProblemQuestion(params, level);
    } else if (measureType === 'length') {
        return generateLengthProblemQuestion(params, level);
    } else {
        return generateMassProblemQuestion(params, level);
    }
}

export default {
    moduleId: 'C04_Y2_CALC',
    generate: generateQuestion
};
