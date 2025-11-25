/**
 * Year 1 Problem Solving Generator
 * Schema: V2
 */

import { randomChoice, shuffle } from './helpers/N02_numberHelpers.js';
import { generateOneStepAddition, generateOneStepSubtraction, generateOneStepDistractors } from './helpers/C04_problemHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        number_range: [math.range.min, math.range.max],
        max_value: math.range.max,
        allow_zero: math.config.allowZero,
        question_format: presentation.format
    };

    switch(operation) {
        case 'simple_addition_word': return generateSimpleAdditionWord(flatParams, level);
        case 'simple_subtraction_word': return generateSimpleSubtractionWord(flatParams, level);
        default: return generateSimpleAdditionWord(flatParams, level);
    }
}

function generateSimpleAdditionWord(params, level) {
    const problem = generateOneStepAddition(params.number_range[0], params.max_value, params);
    if (params.question_format === 'multiple_choice') {
        const opts = shuffle([problem.answer, ...generateOneStepDistractors(problem.answer, problem.values, 'addition', params.max_value)]);
        return { text: problem.text, type: 'multiple_choice', options: opts, answer: problem.answer.toString(), hint: problem.working, module: 'C04_Y1_CALC', level };
    }
    return { text: problem.text, type: 'text_input', answer: problem.answer.toString(), hint: problem.working, module: 'C04_Y1_CALC', level };
}

function generateSimpleSubtractionWord(params, level) {
    const problem = generateOneStepSubtraction(params.number_range[0], params.max_value, params);
    // Same logic as addition
    return { text: problem.text, type: 'text_input', answer: problem.answer.toString(), hint: problem.working, module: 'C04_Y1_CALC', level };
}

export default {
    moduleId: 'C04_Y1_CALC',
    generate: generateQuestion
};