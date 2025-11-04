/**
 * M02_Y2_MEAS: Standard Units
 * Year 2 - Choose and use appropriate standard units to estimate and measure
 */

import { generateHorizontalScale, generateVerticalScale } from './helpers/scaleHelpers.js';

export function generateQuestion(params, level) {
    const operation = params.operations[Math.floor(Math.random() * params.operations.length)];

    switch (operation) {
        case 'read_scale_with_units':
            return generateReadScaleWithUnits(params, level);
        case 'choose_appropriate_unit':
            return generateChooseAppropriateUnit(params, level);
        case 'estimate_measurement':
            return generateEstimateMeasurement(params, level);
        case 'read_to_nearest':
            return generateReadToNearest(params, level);
        default:
            return generateReadScaleWithUnits(params, level);
    }
}

function generateReadScaleWithUnits(params, level) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const availableUnits = params.units[measureType];
    const unit = availableUnits[Math.floor(Math.random() * availableUnits.length)];

    // Map display unit to range key (e.g., °C -> celsius)
    const rangeKey = unit === '°C' ? 'celsius' : unit;
    const range = params.ranges[rangeKey];

    if (!range) {
        console.error(`Missing range for unit: ${unit} (rangeKey: ${rangeKey})`);
        // Fallback to another operation
        return generateChooseAppropriateUnit(params, level);
    }

    const value = Math.floor(Math.random() * (range.max / range.interval + 1)) * range.interval;

    const useVertical = measureType === 'capacity' || measureType === 'temperature';
    const scaleHtml = useVertical ?
        generateVerticalScale(range.max, range.interval, value, unit, measureType === 'temperature' ? 'thermometer' : 'jug') :
        generateHorizontalScale(range.max, range.interval, value, unit);

    const instrumentName = measureType === 'length' ? 'ruler' :
                          measureType === 'temperature' ? 'thermometer' :
                          measureType === 'capacity' ? 'measuring jug' :
                          'scale';

    return {
        text: `What measurement is shown on this ${instrumentName}?<br><br>${scaleHtml}`,
        type: 'text_input',
        answer: value.toString(),
        hint: `Look at the ${unit} marks and find where the pointer is`,
        module: 'M02_Y2_MEAS',
        level: level
    };
}

function generateChooseAppropriateUnit(params, level) {
    const scenarios = {
        length: [
            { item: 'a pencil', correct: 'cm', incorrect: ['m', 'g', 'ml'] },
            { item: 'a football pitch', correct: 'm', incorrect: ['cm', 'kg', 'l'] },
            { item: 'a book', correct: 'cm', incorrect: ['m', 'g', 'ml'] }
        ],
        mass: [
            { item: 'an apple', correct: 'g', incorrect: ['kg', 'cm', 'ml'] },
            { item: 'a person', correct: 'kg', incorrect: ['g', 'm', 'l'] },
            { item: 'a bag of sugar', correct: 'kg', incorrect: ['g', 'cm', 'ml'] }
        ],
        capacity: [
            { item: 'a cup of water', correct: 'ml', incorrect: ['l', 'cm', 'g'] },
            { item: 'a bucket', correct: 'l', incorrect: ['ml', 'm', 'kg'] },
            { item: 'a bottle of juice', correct: 'ml', incorrect: ['l', 'cm', 'g'] }
        ],
        temperature: [
            { item: 'a hot day', correct: '°C', incorrect: ['g', 'cm', 'ml'] },
            { item: 'water temperature', correct: '°C', incorrect: ['m', 'kg', 'l'] }
        ]
    };

    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const scenario = scenarios[measureType][Math.floor(Math.random() * scenarios[measureType].length)];

    const options = [scenario.correct, ...scenario.incorrect.slice(0, 2)].sort(() => Math.random() - 0.5);

    return {
        text: `Which unit would be best for measuring ${scenario.item}?`,
        type: 'multiple_choice',
        answer: scenario.correct,
        options: options,
        module: 'M02_Y2_MEAS',
        level: level
    };
}

function generateEstimateMeasurement(params, level) {
    const estimates = {
        length: [
            { item: 'a pencil', value: 15, unit: 'cm', options: [5, 15, 50, 150] },
            { item: 'a classroom', value: 8, unit: 'm', options: [1, 8, 50, 200] },
            { item: 'a book', value: 25, unit: 'cm', options: [5, 25, 100, 250] }
        ],
        mass: [
            { item: 'an apple', value: 150, unit: 'g', options: [15, 150, 1500, 15000] },
            { item: 'a bag of sugar', value: 1, unit: 'kg', options: [100, 500, 1, 5] },
            { item: 'a school bag', value: 3, unit: 'kg', options: [500, 1, 3, 20] }
        ],
        capacity: [
            { item: 'a cup', value: 250, unit: 'ml', options: [25, 250, 2500, 25000] },
            { item: 'a large bottle', value: 2, unit: 'l', options: [200, 500, 2, 20] },
            { item: 'a bucket', value: 10, unit: 'l', options: [1, 5, 10, 100] }
        ]
    };

    const availableTypes = params.measure_types.filter(t => t !== 'temperature');
    const measureType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const estimate = estimates[measureType][Math.floor(Math.random() * estimates[measureType].length)];

    return {
        text: `Estimate the ${measureType} of ${estimate.item}.`,
        type: 'multiple_choice',
        answer: `${estimate.value} ${estimate.unit}`,
        options: estimate.options.map(v => `${v} ${estimate.unit}`),
        module: 'M02_Y2_MEAS',
        level: level
    };
}

function generateReadToNearest(params, level) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const availableUnits = params.units[measureType];
    const unit = availableUnits[Math.floor(Math.random() * availableUnits.length)];

    // Map display unit to range key (e.g., °C -> celsius)
    const rangeKey = unit === '°C' ? 'celsius' : unit;
    const range = params.ranges[rangeKey];

    if (!range) {
        console.error(`Missing range for unit: ${unit} (rangeKey: ${rangeKey})`);
        // Fallback to another operation
        return generateChooseAppropriateUnit(params, level);
    }

    // Value slightly off a mark
    const nearestMark = Math.floor(Math.random() * (range.max / range.interval)) * range.interval;
    const offset = Math.random() < 0.5 ? -0.3 : 0.3; // Slightly before or after
    const actualValue = nearestMark + offset * range.interval;

    const useVertical = measureType === 'capacity' || measureType === 'temperature';
    const scaleHtml = useVertical ?
        generateVerticalScale(range.max, range.interval, actualValue, unit, measureType === 'temperature' ? 'thermometer' : 'jug') :
        generateHorizontalScale(range.max, range.interval, actualValue, unit);

    return {
        text: `What is the measurement to the nearest ${unit}?<br><br>${scaleHtml}`,
        type: 'text_input',
        answer: nearestMark.toString(),
        hint: 'Find the closest mark on the scale',
        module: 'M02_Y2_MEAS',
        level: level
    };
}

export default {
    moduleId: 'M02_Y2_MEAS',
    generate: generateQuestion
};
