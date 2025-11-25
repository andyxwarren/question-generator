/**
 * Year 2 Problem Solving Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';
import { generateOneStepAddition } from './helpers/C04_problemHelpers.js';

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    const flatParams = {
        number_range: [math.range.min, math.range.max],
        max_value: math.range.max,
        allow_zero: math.config.allowZero
    };

    const problem = generateOneStepAddition(flatParams.number_range[0], flatParams.max_value, flatParams);
    
    // Simple money variant for Y2
    if (presentation.contexts.includes('money_pence')) {
        return {
            text: `Toy costs ${problem.values.a}p. Book costs ${problem.values.b}p. Total?`,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: `${problem.values.a} + ${problem.values.b}`,
            module: 'C04_Y2_CALC',
            level
        };
    }

    return {
        text: problem.text,
        type: 'text_input',
        answer: problem.answer.toString(),
        hint: problem.working,
        module: 'C04_Y2_CALC',
        level
    };
}

export default { moduleId: 'C04_Y2_CALC', generate: generateQuestion };