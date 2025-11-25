/**
 * M06 Y4: Mixed
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const km = randomInt(math.ranges.km.min, math.ranges.km.max);
    return {
        text: `Convert ${km}km to m`,
        type: 'text_input',
        answer: (km*1000).toString(),
        module: 'M06_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y4_MEAS', generate: generateQuestion };