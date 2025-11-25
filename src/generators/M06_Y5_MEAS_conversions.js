/**
 * Year 5 Imperial Conversions
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const inches = randomInt(math.ranges.inches.min, math.ranges.inches.max);
    const cm = inches * 2.5; // Approx
    return {
        text: `Convert ${inches} inches to cm (approx 1 inch = 2.5cm)`,
        type: 'text_input',
        answer: cm.toString(),
        hint: `Multiply by 2.5`,
        module: 'M06_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y5_MEAS', generate: generateQuestion };