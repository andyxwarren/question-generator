/**
 * Year 6 Standard Conversions
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const miles = 5;
    const km = 8;
    return {
        text: `5 miles is approximately 8 km. How many km in 10 miles?`,
        type: 'text_input',
        answer: '16',
        hint: `Double it`,
        module: 'M06_Y6_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y6_MEAS', generate: generateQuestion };