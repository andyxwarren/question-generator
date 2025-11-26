/**
 * Year 5 Imperial Conversions
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;

    // Get first available range
    const rangeKeys = Object.keys(math.ranges || {});
    if (rangeKeys.length === 0) {
        return {
            text: 'No conversion ranges defined',
            type: 'text_input',
            answer: '0',
            module: 'M06_Y5_MEAS',
            level
        };
    }

    const unit = rangeKeys[0];
    const range = math.ranges[unit];
    const value = randomInt(range.min || 1, range.max || 10);

    // Imperial/metric conversions
    const conversions = {
        inches: { to: 'cm', factor: 2.5, hint: 'Multiply by 2.5' },
        feet: { to: 'm', factor: 0.3, hint: 'Multiply by 0.3' },
        pounds: { to: 'g', factor: 454, hint: 'Multiply by 454' },
        miles: { to: 'km', factor: 1.6, hint: 'Multiply by 1.6' }
    };

    const conv = conversions[unit] || { to: 'units', factor: 1, hint: '' };
    const answer = value * conv.factor;

    return {
        text: `Convert ${value} ${unit} to ${conv.to} (approx)`,
        type: 'text_input',
        answer: answer.toString(),
        hint: conv.hint,
        module: 'M06_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y5_MEAS', generate: generateQuestion };