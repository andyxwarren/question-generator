/**
 * Year 6 Formulas
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const b = 10, h = 5;
    return {
        text: `Triangle base ${b}, height ${h}. Area?`,
        type: 'text_input',
        answer: (0.5 * b * h).toString(),
        hint: `0.5 x b x h`,
        module: 'M07_Y6_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y6_MEAS', generate: generateQuestion };