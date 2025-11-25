/**
 * M02 Y1: Scales
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const val = randomInt(0, math.scale.max);
    return {
        text: `Read scale: [0...${val}...${math.scale.max}]`,
        type: 'text_input',
        answer: val.toString(),
        module: 'M02_Y1_MEAS',
        level
    };
}
export default { moduleId: 'M02_Y1_MEAS', generate: generateQuestion };