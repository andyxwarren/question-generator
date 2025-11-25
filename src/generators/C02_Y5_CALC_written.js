/**
 * Year 5 Written Addition and Subtraction Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { checkCarry, checkBorrow } from './helpers/C01_C03_calculationHelpers.js';
import { formatColumnar } from './helpers/C02_columnarHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        result_max: math.range.resultMax,
        digits: math.config.digits,
        question_styles: presentation.styles,
        instruction_hint: presentation.hint
    };

    if(operation.includes('addition')) return generateAddition(flatParams, level);
    return generateSubtraction(flatParams, level);
}

function generateAddition(params, level) {
    let a = randomInt(params.min_value, params.max_value);
    let b = randomInt(params.min_value, params.max_value);
    let ans = a + b;
    return { text: `Calculate:\n\n${formatColumnar(a, b, '+')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y5_CALC', level };
}

function generateSubtraction(params, level) {
    let a = randomInt(params.min_value, params.max_value);
    let b = randomInt(params.min_value, a-1);
    let ans = a - b;
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y5_CALC', level };
}

export default { moduleId: 'C02_Y5_CALC', generate: generateQuestion };