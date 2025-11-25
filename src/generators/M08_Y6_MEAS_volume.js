/**
 * Year 6 Volume
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const s = randomInt(math.dim.min, math.dim.max);
    return {
        text: `Volume of cube with side ${s}cm?`,
        type: 'text_input',
        answer: (s*s*s).toString(),
        hint: `s x s x s`,
        module: 'M08_Y6_MEAS',
        level
    };
}
export default { moduleId: 'M08_Y6_MEAS', generate: generateQuestion };