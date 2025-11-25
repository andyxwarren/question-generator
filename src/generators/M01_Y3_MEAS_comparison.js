/**
 * M01 Y3: Compare Units
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const unit = randomChoice(math.units[type]);
    const val = randomInt(math.ranges[unit].min, math.ranges[unit].max);
    
    return {
        text: `Is ${val}${unit} > ${(val-1)}${unit}?`,
        type: 'multiple_choice',
        options: ['Yes', 'No'],
        answer: 'Yes',
        module: 'M01_Y3_MEAS',
        level
    };
}
export default { moduleId: 'M01_Y3_MEAS', generate: generateQuestion };