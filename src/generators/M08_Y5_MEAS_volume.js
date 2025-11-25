/**
 * M08 Y5: Volume
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const l = randomInt(math.dim.min, math.dim.max);
    const w = randomInt(math.dim.min, math.dim.max);
    const h = randomInt(math.dim.min, math.dim.max);
    return {
        text: `Volume of ${l}x${w}x${h} box?`,
        type: 'text_input',
        answer: (l*w*h).toString(),
        module: 'M08_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M08_Y5_MEAS', generate: generateQuestion };