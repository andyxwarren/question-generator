/**
 * M01 Y4: Different Measures
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    // Logic for Y4 comparison
    return {
        text: `Compare 10mm and 1cm`,
        type: 'multiple_choice',
        options: ['>', '<', '='],
        answer: '=',
        module: 'M01_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M01_Y4_MEAS', generate: generateQuestion };