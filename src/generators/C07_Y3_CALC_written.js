/**
 * Year 3 Written Multiplication Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { formatColumnarMultiply } from './helpers/C07_multiplicationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        multiplicand_range: math.range.multiplicand,
        multiplier_range: math.range.multiplier,
        require_carrying: math.config.carry
    };

    if (operation === 'columnar_multiply') return generateColumnar(flatParams, level);
    return generateColumnar(flatParams, level);
}

function generateColumnar(params, level) {
    const m1 = randomInt(params.multiplicand_range[0], params.multiplicand_range[1]);
    const m2 = randomInt(params.multiplier_range[0], params.multiplier_range[1]);
    const ans = m1 * m2;
    const display = formatColumnarMultiply(m1, m2, false);
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 10, 1000)]);
    return { text: `Calculate:\n\n${display}`, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: 'Use columns', module: 'C07_Y3_CALC', level };
}

export default { moduleId: 'C07_Y3_CALC', generate: generateQuestion };