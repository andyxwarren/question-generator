/**
 * Year 3 Money Consolidation
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const op = randomChoice(operations);

    if (op === 'make_amount_efficient') {
        const target = randomInt(math.target.min, math.target.max);
        return { text: `Smallest number of coins to make ${target}p?`, type: 'text_input', answer: 'varies', hint: 'Start with largest coins', module: 'M03_Y3_MEAS', level };
    }
    
    // solve_change_problems
    const cost = randomInt(20, 80);
    const pay = 100;
    return { text: `Cost ${cost}p, pay 100p. Change?`, type: 'text_input', answer: `${pay-cost}p`, hint: 'Subtract', module: 'M03_Y3_MEAS', level };
}
export default { moduleId: 'M03_Y3_MEAS', generate: generateQuestion };