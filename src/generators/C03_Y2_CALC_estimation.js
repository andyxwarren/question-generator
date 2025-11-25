/**
 * Year 2 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { generateAddition } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const flatParams = { min_value: math.range.min, max_value: math.range.max };

    if(operation === 'identify_inverse_check') return generateInverse(flatParams, level);
    return generateInverse(flatParams, level); // Fallback
}

function generateInverse(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);
    const text = `Check ${a} + ${b} = ${answer}. Which subtraction?`;
    const ans = `${answer} - ${a} = ${b}`;
    const opts = shuffle([ans, `${a} - ${b} = ?`, `${answer} + ${a} = ?`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: 'Inverse of add is subtract', module: 'C03_Y2_CALC', level };
}

export default { moduleId: 'C03_Y2_CALC', generate: generateQuestion };