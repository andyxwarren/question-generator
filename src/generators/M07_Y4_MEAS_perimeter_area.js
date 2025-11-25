/**
 * Year 4 Perimeter/Area
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const w = 3, h = 4;
    return {
        text: `Grid is ${w} by ${h}. Count squares to find area.`,
        type: 'text_input',
        answer: (w*h).toString(),
        module: 'M07_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y4_MEAS', generate: generateQuestion };