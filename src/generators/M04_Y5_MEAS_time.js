/**
 * Year 5 Time Problems
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const h = randomInt(1, 3);
    const m = randomInt(10, 50);
    const total = h*60 + m;
    
    return {
        text: `Film is ${total} minutes. How many hours/minutes?`,
        type: 'text_input',
        answer: `${h}h ${m}m`,
        hint: `Divide by 60`,
        module: 'M04_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y5_MEAS', generate: generateQuestion };