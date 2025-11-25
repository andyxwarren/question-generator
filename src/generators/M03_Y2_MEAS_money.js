/**
 * Year 2 Pounds and Pence
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const op = randomChoice(operations);

    if (op === 'combine_mixed_coins') {
        const coins = [10, 20, 50];
        const c1 = randomChoice(coins);
        const c2 = randomChoice(coins);
        const total = c1 + c2;
        return { text: `You have a ${c1}p coin and a ${c2}p coin. Total?`, type: 'text_input', answer: `${total}p`, hint: 'Add them', module: 'M03_Y2_MEAS', level };
    }
    
    // convert_pounds_pence
    const pounds = randomInt(1, 5);
    return { text: `Write £${pounds} in pence`, type: 'text_input', answer: `${pounds*100}p`, hint: '100p = £1', module: 'M03_Y2_MEAS', level };
}
export default { moduleId: 'M03_Y2_MEAS', generate: generateQuestion };