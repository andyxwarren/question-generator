/**
 * Year 4 Written Addition and Subtraction Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { checkCarry, checkBorrow } from './helpers/C01_C03_calculationHelpers.js';
import { formatColumnar } from './helpers/C02_columnarHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_4digit: math.range.min4,
        max_4digit: math.range.max4,
        result_max: math.range.resultMax,
        ensure_no_carry: math.config.noCarry,
        ensure_no_borrow: math.config.noBorrow,
        allow_single_carry: math.config.allowSingleCarry,
        allow_multiple_carry: math.config.allowMultiCarry,
        allow_exceeding_10000: math.config.exceed10000,
        question_styles: presentation.styles,
        instruction_hint: presentation.hint
    };

    switch(operation) {
        case 'addition_no_carry': return generateAdditionNoCarry(flatParams, level);
        case 'subtraction_no_borrow': return generateSubtractionNoBorrow(flatParams, level);
        case 'addition_with_carry': return generateAdditionWithCarry(flatParams, level);
        case 'subtraction_with_borrow': return generateSubtractionWithBorrow(flatParams, level);
        default: return generateAdditionNoCarry(flatParams, level);
    }
}

function generateAdditionNoCarry(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, params.max_4digit);
        ans = a + b;
    } while (checkCarry(a, b) || ans > params.result_max);
    return { text: `Calculate:\n\n${formatColumnar(a, b, '+')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y4_CALC', level };
}

function generateSubtractionNoBorrow(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, a-1);
        ans = a - b;
    } while (checkBorrow(a, b));
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y4_CALC', level };
}

function generateAdditionWithCarry(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, params.max_4digit);
        ans = a + b;
    } while (ans > params.result_max);
    return { text: `Calculate:\n\n${formatColumnar(a, b, '+')}`, type: 'text_input', answer: ans.toString(), hint: 'Carry required', module: 'C02_Y4_CALC', level };
}

function generateSubtractionWithBorrow(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, a-1);
        ans = a - b;
    } while (!checkBorrow(a, b)); // Ensure borrow
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: 'Borrow required', module: 'C02_Y4_CALC', level };
}

export default { moduleId: 'C02_Y4_CALC', generate: generateQuestion };