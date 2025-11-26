/**
 * M06 Y4: Mixed
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;

    // Get first available range
    const rangeKeys = Object.keys(math.ranges || {});
    if (rangeKeys.length === 0) {
        return {
            text: 'No conversion ranges defined',
            type: 'text_input',
            answer: '0',
            module: 'M06_Y4_MEAS',
            level
        };
    }

    const unit = rangeKeys[0];
    const range = math.ranges[unit];
    const value = randomInt(range.min || 1, range.max || 10);

    // Simple conversions
    const conversions = {
        km: { to: 'm', factor: 1000 },
        m: { to: 'cm', factor: 100 },
        kg: { to: 'g', factor: 1000 },
        hours: { to: 'minutes', factor: 60 },
        inches: { to: 'cm', factor: 2.54 }
    };

    const conv = conversions[unit] || { to: 'units', factor: 1 };
    const answer = value * conv.factor;

    return {
        text: `Convert ${value}${unit} to ${conv.to}`,
        type: 'text_input',
        answer: answer.toString(),
        module: 'M06_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y4_MEAS', generate: generateQuestion };