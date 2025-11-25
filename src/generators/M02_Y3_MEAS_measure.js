/**
 * Year 3 Measure Precisely
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/M01_measurementHelpers.js';
import { generateHorizontalScale } from './helpers/scaleHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const unit = randomChoice(math.units[type]);
    const range = math.ranges[unit];
    const val = randomInt(range.min, range.max);

    const html = generateHorizontalScale(range.max, range.interval, val, unit, true);
    return { text: `Measure accurately:\n${html}`, type: 'text_input', answer: val.toString(), hint: `Check exact mark`, module: 'M02_Y3_MEAS', level };
}
export default { moduleId: 'M02_Y3_MEAS', generate: generateQuestion };