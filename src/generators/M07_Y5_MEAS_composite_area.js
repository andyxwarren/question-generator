/**
 * Year 5 Composite Area
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const side = randomInt(math.dim.min, math.dim.max);
    return {
        text: `Square side ${side}cm. Area?`,
        type: 'text_input',
        answer: (side*side).toString(),
        hint: `s x s`,
        module: 'M07_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y5_MEAS', generate: generateQuestion };