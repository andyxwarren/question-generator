/**
 * Year 6 Written Calculation
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const flatParams = {
        min_mult: math.range.multiply[0],
        max_mult: math.range.multiply[1],
        min_div: math.range.divide[0],
        max_div: math.range.divide[1]
    };
    
    return generateLongDiv(flatParams, level);
}

function generateLongDiv(params, level) {
    const d = randomInt(11, 30);
    const q = randomInt(10, 50);
    const n = d * q;
    return { text: `Calculate ${n} ÷ ${d}`, type: 'text_input', answer: q.toString(), hint: `Long division`, module: 'C07_Y6_CALC', level };
}

export default { moduleId: 'C07_Y6_CALC', generate: generateQuestion };