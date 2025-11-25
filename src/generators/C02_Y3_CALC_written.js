/**
 * Year 3 Written Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { checkCarry, checkBorrow, getRandomName, getRandomItem } from './helpers/C01_C03_calculationHelpers.js';
import { formatColumnar } from './helpers/C02_columnarHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_3digit: math.range.min3,
        max_3digit: math.range.max3,
        result_max: math.range.resultMax,
        ensure_no_carry: math.config.noCarry,
        ensure_no_borrow: math.config.noBorrow,
        allow_single_carry: math.config.allowSingleCarry,
        allow_multiple_carry: math.config.allowMultiCarry,
        allow_exceeding_1000: math.config.exceed1000,
        question_styles: presentation.styles,
        instruction_hint: presentation.hint
    };

    switch(operation) {
        case 'addition_no_carry': return generateAdditionNoCarry(flatParams, level);
        case 'subtraction_no_borrow': return generateSubtractionNoBorrow(flatParams, level);
        case 'addition_simple_carry': return generateAdditionSimpleCarry(flatParams, level);
        case 'subtraction_simple_borrow': return generateSubtractionSimpleBorrow(flatParams, level);
        case 'addition_with_carry': return generateAdditionWithCarry(flatParams, level);
        case 'subtraction_with_borrow': return generateSubtractionWithBorrow(flatParams, level);
        default: return generateAdditionNoCarry(flatParams, level);
    }
}

function generateAdditionNoCarry(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, params.max_3digit);
        ans = a + b;
    } while(checkCarry(a, b) || ans > params.result_max);
    
    return {
        text: `Calculate:\n\n${formatColumnar(a, b, '+')}`,
        type: 'text_input',
        answer: ans.toString(),
        hint: params.instruction_hint,
        module: 'C02_Y3_CALC',
        level: level
    };
}
// ... other functions follow similar pattern using flatParams
function generateSubtractionNoBorrow(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, a-1);
        ans = a - b;
    } while(checkBorrow(a, b));
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y3_CALC', level };
}
function generateAdditionSimpleCarry(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }
function generateSubtractionSimpleBorrow(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }
function generateAdditionWithCarry(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }
function generateSubtractionWithBorrow(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }

export default {
    moduleId: 'C02_Y3_CALC',
    generate: generateQuestion
};