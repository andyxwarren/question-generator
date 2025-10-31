/**
 * M02_Y1_MEAS: Measure and Record
 * Year 1 - Measure and begin to record: lengths and heights; mass/weight; capacity and volume; time
 */

import { generateHorizontalScale } from './helpers/scaleHelpers.js';

export function generateQuestion(params, level) {
    const operation = params.operations[Math.floor(Math.random() * params.operations.length)];

    switch (operation) {
        case 'read_simple_scale':
            return generateReadSimpleScale(params, level);
        case 'choose_unit':
            return generateChooseUnit(params, level);
        case 'count_marks':
            return generateCountMarks(params, level);
        default:
            return generateReadSimpleScale(params, level);
    }
}

function generateReadSimpleScale(params, level) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const value = Math.floor(Math.random() * (params.scale_max / params.interval + 1)) * params.interval;

    const unit = measureType === 'length' ? 'cm' :
                 measureType === 'capacity' ? 'ml' :
                 measureType === 'mass' ? 'g' : '';

    const scaleHtml = generateHorizontalScale(
        params.scale_max,
        params.interval,
        value,
        unit,
        params.show_all_numbers
    );

    return {
        text: `What number is the pointer pointing to?<br><br>${scaleHtml}`,
        type: 'text_input',
        answer: value.toString(),
        hint: 'Look carefully at where the pointer is on the scale',
        module: 'M02_Y1_MEAS',
        level: level
    };
}

function generateChooseUnit(params, level) {
    const objects = {
        length: ['pencil', 'book', 'door'],
        mass: ['apple', 'book', 'bag'],
        capacity: ['cup', 'bottle', 'jug']
    };

    const availableTypes = params.measure_types.filter(t => t !== 'time');
    const measureType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const object = objects[measureType][Math.floor(Math.random() * objects[measureType].length)];

    const correctUnit = measureType === 'length' ? 'centimetres' :
                       measureType === 'mass' ? 'grams' :
                       'millilitres';

    const allUnits = ['centimetres', 'grams', 'millilitres', 'minutes'];
    const incorrectUnits = allUnits.filter(u => u !== correctUnit);
    const options = [correctUnit, ...incorrectUnits.slice(0, 2)].sort(() => Math.random() - 0.5);

    return {
        text: `What would you use to measure a ${object}?`,
        type: 'multiple_choice',
        answer: correctUnit,
        options: options,
        module: 'M02_Y1_MEAS',
        level: level
    };
}

function generateCountMarks(params, level) {
    const value = Math.floor(Math.random() * 5 + 3) * params.interval; // 3-7 intervals
    const unit = 'cm';

    return {
        text: `Count the marks on this ruler. How many centimetres long is the line?<br><br>${generateHorizontalScale(params.scale_max, params.interval, value, unit, params.show_all_numbers)}`,
        type: 'text_input',
        answer: value.toString(),
        hint: 'Count carefully from 0 to the pointer',
        module: 'M02_Y1_MEAS',
        level: level
    };
}

export default {
    moduleId: 'M02_Y1_MEAS',
    generate: generateQuestion
};
