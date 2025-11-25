/**
 * Year 6 Order of Operations Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    const flatParams = {
        number_range: math.range.num,
        question_format: presentation.format
    };

    if (operation === 'simple_two_operation') return generateSimple(flatParams, level);
    return generateSimple(flatParams, level);
}

function generateSimple(params, level) {
    const a = randomInt(params.number_range[0], params.number_range[1]);
    const b = randomInt(2, 5);
    const c = randomInt(2, 5);
    const ans = a + (b * c);
    const text = `${a} + ${b} × ${c} = ?`;
    const opts = shuffle([ans, (a+b)*c, ans+1]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: 'Multiply first', module: 'C09_Y6_CALC', level };
}

export default { moduleId: 'C09_Y6_CALC', generate: generateQuestion };