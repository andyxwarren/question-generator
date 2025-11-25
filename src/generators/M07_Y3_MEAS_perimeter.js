/**
 * M07 Y3: Perimeter
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const s = randomInt(math.side.min, math.side.max);
    const unit = randomChoice(math.units);
    return {
        text: `Square side ${s}${unit}. Perimeter?`,
        type: 'text_input',
        answer: (s*4).toString(),
        module: 'M07_Y3_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y3_MEAS', generate: generateQuestion };