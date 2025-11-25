/**
 * M01 Y2: Order Measures
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const val1 = randomInt(math.range.min, math.range.max);
    const val2 = randomInt(math.range.min, math.range.max);
    
    return {
        text: `Compare: ${val1} ___ ${val2}`,
        type: 'multiple_choice',
        options: ['>', '<', '='],
        answer: val1 > val2 ? '>' : val1 < val2 ? '<' : '=',
        module: 'M01_Y2_MEAS',
        level
    };
}
export default { moduleId: 'M01_Y2_MEAS', generate: generateQuestion };