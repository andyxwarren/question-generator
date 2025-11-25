/**
 * Year 4 Written Calculation
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { formatColumnarMultiply } from './helpers/C07_multiplicationHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const flatParams = {
        min_multiplicand: math.range.multiplicand[0],
        max_multiplicand: math.range.multiplicand[1],
        min_multiplier: math.range.multiplier[0],
        max_multiplier: math.range.multiplier[1]
    };
    return generateColumnar(flatParams, level);
}

function generateColumnar(params, level) {
    const m1 = randomInt(params.min_multiplicand, params.max_multiplicand);
    const m2 = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = m1 * m2;
    const text = `Calculate:\n\n${formatColumnarMultiply(m1, m2, false)}`;
    return { text, type: 'text_input', answer: ans.toString(), hint: `Column multiplication`, module: 'C07_Y4_CALC', level };
}

export default { moduleId: 'C07_Y4_CALC', generate: generateQuestion };