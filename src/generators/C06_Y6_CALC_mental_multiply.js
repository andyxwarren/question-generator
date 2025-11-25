/**
 * Year 6 Mental Mixed Operations
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const flatParams = { range: math.range.num };

    if(operation === 'four_operations') return generateFourOps(flatParams, level);
    return generateTwoOps(flatParams, level);
}

function generateTwoOps(params, level) {
    const a = randomInt(2, 10);
    const b = randomInt(2, 10);
    const c = randomInt(2, 10);
    // a + b x c
    const ans = a + (b * c);
    const text = `${a} + ${b} × ${c} = ?`;
    const opts = shuffle([ans, (a+b)*c, ans+10]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `BIDMAS: Multiply first`, module: 'C06_Y6_CALC', level };
}

function generateFourOps(params, level) {
    // (a + b) / c
    const c = randomInt(2, 5);
    const res = randomInt(2, 10);
    const sum = c * res;
    const a = randomInt(1, sum-1);
    const b = sum - a;
    
    const ans = res;
    const text = `(${a} + ${b}) ÷ ${c} = ?`;
    const opts = shuffle([ans, ans+1, ans*2]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Brackets first`, module: 'C06_Y6_CALC', level };
}

export default { moduleId: 'C06_Y6_CALC', generate: generateQuestion };