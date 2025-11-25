/**
 * Year 2 Standard Units
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/M01_measurementHelpers.js';
import { generateHorizontalScale, generateVerticalScale } from './helpers/scaleHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    // Flatten params for specific logic
    const flatParams = {
        measure_types: math.types,
        units: math.units,
        ranges: math.ranges
    };

    if(operation === 'read_scale_with_units') return generateReadScale(flatParams, level);
    return generateChooseUnit(flatParams, level);
}

function generateReadScale(params, level) {
    const type = randomChoice(params.measure_types);
    const unit = params.units[type][0];
    const range = params.ranges[unit === '°C' ? 'celsius' : unit];
    const val = randomInt(range.min, range.max);
    
    const html = type === 'capacity' || type === 'temperature' 
        ? generateVerticalScale(range.max, range.interval, val, unit, type)
        : generateHorizontalScale(range.max, range.interval, val, unit, true);

    return { text: `Read the scale:\n${html}`, type: 'text_input', answer: val.toString(), hint: `Look at ${unit} marks`, module: 'M02_Y2_MEAS', level };
}

function generateChooseUnit(params, level) {
    const q = { text: "Which unit for a pencil?", ans: "cm", opts: ["cm", "m", "kg"] };
    return { text: q.text, type: 'multiple_choice', options: q.opts, answer: q.ans, module: 'M02_Y2_MEAS', level };
}

export default { moduleId: 'M02_Y2_MEAS', generate: generateQuestion };