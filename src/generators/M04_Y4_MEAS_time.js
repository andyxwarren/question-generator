/**
 * Year 4 Time Conversions
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const hrs = randomInt(math.conversions.hours.min, math.conversions.hours.max);
    return {
        text: `Convert ${hrs} hours to minutes`,
        type: 'text_input',
        answer: (hrs*60).toString(),
        hint: `x 60`,
        module: 'M04_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y4_MEAS', generate: generateQuestion };