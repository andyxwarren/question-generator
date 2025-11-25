/**
 * M04 Y1: Time
 * Schema: V2
 */
import { randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const hour = randomChoice(math.hours);
    return {
        text: `Clock shows ${hour} o'clock`,
        type: 'text_input',
        answer: `${hour}:00`,
        module: 'M04_Y1_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y1_MEAS', generate: generateQuestion };