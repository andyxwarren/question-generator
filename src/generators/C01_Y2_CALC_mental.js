/**
 * Year 2 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { generateAddition, generateSubtraction, getAdditionContext, getSubtractionContext } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        max_value_basic: math.range.basicMax,
        max_value_derived: math.range.derivedMax,
        multiples_of_10: math.config.multiplesOf10,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'recall_to_20': return generateRecallTo20(flatParams, level);
        case 'derive_to_100': return generateDeriveTo100(flatParams, level);
        case 'missing_addend': return generateMissingAddend(flatParams, level);
        case 'related_subtract': return generateRelatedSubtract(flatParams, level);
        case 'inverse_operations': return generateInverseOperations(flatParams, level);
        case 'fact_families_100': return generateFactFamilies100(flatParams, level);
        case 'near_multiples': return generateNearMultiples(flatParams, level);
        default: return generateRecallTo20(flatParams, level);
    }
}

function generateRecallTo20(params, level) {
    const op = randomChoice(['add', 'subtract']);
    if (op === 'add') {
        const { a, b, answer } = generateAddition(2, params.max_value_basic);
        const text = `${a} + ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value_basic)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Recall fact`, module: 'C01_Y2_CALC', level };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value_basic, { maxMinuend: params.max_value_basic });
        const text = `${a} - ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value_basic)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Recall fact`, module: 'C01_Y2_CALC', level };
    }
}

function generateDeriveTo100(params, level) {
    const { a, b, answer } = generateAddition(2, params.max_value_basic);
    const A = a * 10, B = b * 10, ANS = answer * 10;
    const text = `If ${a} + ${b} = ${answer}, what is ${A} + ${B}?`;
    const opts = shuffle([ANS, ...generateDistractors(ANS, 3, 0, params.max_value_derived)]);
    return { text, type: 'multiple_choice', options: opts, answer: ANS.toString(), hint: `Use 10x pattern`, module: 'C01_Y2_CALC', level };
}

function generateMissingAddend(params, level) {
    const res = randomInt(5, params.max_value_basic);
    const known = randomInt(1, res - 1);
    const ans = res - known;
    const text = `${known} + ___ = ${res}`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value_basic)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `${res} - ${known}`, module: 'C01_Y2_CALC', level };
}

function generateRelatedSubtract(params, level) {
    const { a, b, answer } = generateAddition(2, params.max_value_basic);
    const text = `If ${a} + ${b} = ${answer}, what is ${answer} - ${a}?`;
    const opts = shuffle([b, a, answer, answer+1].slice(0, 4));
    return { text, type: 'multiple_choice', options: opts, answer: b.toString(), hint: `Inverse`, module: 'C01_Y2_CALC', level };
}

function generateInverseOperations(params, level) {
    const { a, b, answer } = generateAddition(2, params.max_value_basic);
    const text = `Check ${a} + ${b} = ${answer}. Which subtraction?`;
    const ans = `${answer} - ${a} = ${b}`;
    const opts = shuffle([ans, `${answer} + ${a} = ${b}`, `${a} - ${b} = ${answer}`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: `Start with total`, module: 'C01_Y2_CALC', level };
}

function generateFactFamilies100(params, level) {
    const a = randomInt(1, 9) * 10, b = randomInt(1, 9) * 10;
    const sum = a + b;
    const family = [`${a}+${b}=${sum}`, `${b}+${a}=${sum}`, `${sum}-${a}=${b}`, `${sum}-${b}=${a}`];
    const missIdx = randomInt(0, 3);
    const shown = family.filter((_, i) => i !== missIdx);
    return { text: `Family: ${shown.join(', ')}. Missing?`, type: 'multiple_choice', options: shuffle([family[missIdx], `${a}+${b}=${sum+10}`]), answer: family[missIdx], hint: `Use ${a}, ${b}, ${sum}`, module: 'C01_Y2_CALC', level };
}

function generateNearMultiples(params, level) {
    const base = randomInt(1, 9) * 10;
    const off = randomChoice([-1, 1]);
    const num = base + off;
    const add = randomInt(5, 20);
    const ans = num + add;
    const text = `${num} + ${add} = ?`;
    const opts = shuffle([ans, ans+1, ans-1, ans+10]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Think ${base} + ${add} then adjust`, module: 'C01_Y2_CALC', level };
}

export default {
    moduleId: 'C01_Y2_CALC',
    generate: generateQuestion
};