/**
 * M03 Y1: Coins
 * Schema: V2
 */
import { randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const coin = randomChoice(math.denominations);
    return {
        text: `Value of ${coin}p coin?`,
        type: 'text_input',
        answer: coin.toString(),
        module: 'M03_Y1_MEAS',
        level
    };
}
export default { moduleId: 'M03_Y1_MEAS', generate: generateQuestion };