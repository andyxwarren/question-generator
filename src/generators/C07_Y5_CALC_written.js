/**
 * Year 5 Written Calculation
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { formatColumnarMultiply } from './helpers/C07_multiplicationHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    // Using array[0] and array[1] for range
    const flatParams = {
        min_mult: math.range.multiply[0],
        max_mult: math.range.multiply[1],
        min_div: math.range.divide[0],
        max_div: math.range.divide[1]
    };
    
    const type = randomChoice(['mult', 'div']);
    if(type === 'mult') return generateMult(flatParams, level);
    return generateDiv(flatParams, level);
}

function generateMult(params, level) {
    const m1 = randomInt(params.min_mult, params.max_mult);
    const m2 = randomInt(2, 9);
    const ans = m1 * m2;
    return { text: `Calculate:\n\n${formatColumnarMultiply(m1, m2, false)}`, type: 'text_input', answer: ans.toString(), hint: `Column multiplication`, module: 'C07_Y5_CALC', level };
}

function generateDiv(params, level) {
    const d = randomInt(2, 9);
    const q = randomInt(10, 100);
    const n = d * q; // exact division
    return { text: `${n} ÷ ${d} = ?`, type: 'text_input', answer: q.toString(), hint: `Short division`, module: 'C07_Y5_CALC', level };
}

export default { moduleId: 'C07_Y5_CALC', generate: generateQuestion };