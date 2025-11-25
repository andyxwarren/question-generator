/**
 * M05 Y5: Metric
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const km = randomInt(math.ranges.km.min, math.ranges.km.max);
    const m = km * 1000;
    return {
        text: `Convert ${km}km to m`,
        type: 'text_input',
        answer: m.toString(),
        module: 'M05_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M05_Y5_MEAS', generate: generateQuestion };