/**
 * M02_Y3_MEAS: Measure Precisely
 * Year 3 - Measure lengths (m/cm/mm); measure mass (kg/g); measure volume / capacity (l/ml)
 */

import { generateHorizontalScale, generateVerticalScale } from './helpers/scaleHelpers.js';

export function generateQuestion(params, level) {
    const operation = params.operations[Math.floor(Math.random() * params.operations.length)];

    switch (operation) {
        case 'read_scale_precise':
            return generateReadScalePrecise(params, level);
        case 'read_different_scales':
            return generateReadDifferentScales(params, level);
        case 'simple_conversion':
            return generateSimpleConversion(params, level);
        case 'measure_between_marks':
            return generateMeasureBetweenMarks(params, level);
        case 'complex_scales':
            return generateComplexScales(params, level);
        default:
            return generateReadScalePrecise(params, level);
    }
}

function generateReadScalePrecise(params, level) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const availableUnits = params.units[measureType];
    const unit = availableUnits[Math.floor(Math.random() * availableUnits.length)];
    const range = params.ranges[unit];

    let value = Math.floor(Math.random() * (range.max / range.interval + 1)) * range.interval;

    // Add decimal if params allow
    if (params.use_decimals && Math.random() < 0.3) {
        value += range.interval / 2;
    }

    const useVertical = measureType === 'capacity';
    const scaleHtml = useVertical ?
        generateVerticalScale(range.max, range.interval, value, unit, 'jug') :
        generateHorizontalScale(range.max, range.interval, value, unit);

    const instrumentName = unit === 'mm' || unit === 'cm' ? 'ruler' :
                          unit === 'm' ? 'measuring tape' :
                          unit === 'g' || unit === 'kg' ? 'scale' :
                          'measuring jug';

    return {
        text: `What is the measurement shown on this ${instrumentName}?<br><br>${scaleHtml}`,
        type: 'text_input',
        answer: value.toString(),
        hint: `Read the scale carefully in ${unit}`,
        module: 'M02_Y3_MEAS',
        level: level
    };
}

function generateReadDifferentScales(params, level) {
    return generateReadScalePrecise(params, level); // Same as precise but with variety in params
}

function generateSimpleConversion(params, level) {
    const conversions = {
        simple: [
            { question: 'How many millimetres are in 1 centimetre?', answer: '10' },
            { question: 'How many centimetres are in 1 metre?', answer: '100' },
            { question: 'How many grams are in 1 kilogram?', answer: '1000' },
            { question: 'How many millilitres are in 1 litre?', answer: '1000' },
            { question: 'How many millimetres are in 2 centimetres?', answer: '20' },
            { question: 'How many centimetres are in 2 metres?', answer: '200' }
        ],
        standard: [
            { question: 'How many centimetres is 50 mm?', answer: '5' },
            { question: 'How many millimetres is 5 cm?', answer: '50' },
            { question: 'How many metres is 300 cm?', answer: '3' },
            { question: 'How many grams is 2 kg?', answer: '2000' },
            { question: 'How many millilitres is 3 litres?', answer: '3000' }
        ],
        complex: [
            { question: 'How many centimetres is 1.5 metres?', answer: '150' },
            { question: 'How many kilograms is 2500 grams?', answer: '2.5' },
            { question: 'How many litres is 4500 millilitres?', answer: '4.5' },
            { question: 'How many millimetres is 12.5 centimetres?', answer: '125' }
        ]
    };

    const conversionType = params.conversion_type || 'simple';
    const conversionSet = conversions[conversionType];
    const conversion = conversionSet[Math.floor(Math.random() * conversionSet.length)];

    return {
        text: conversion.question,
        type: 'text_input',
        answer: conversion.answer,
        hint: 'Remember the conversion: 10mm=1cm, 100cm=1m, 1000g=1kg, 1000ml=1l',
        module: 'M02_Y3_MEAS',
        level: level
    };
}

function generateMeasureBetweenMarks(params, level) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const availableUnits = params.units[measureType];
    const unit = availableUnits[Math.floor(Math.random() * availableUnits.length)];
    const range = params.ranges[unit];

    // Value between marks
    const wholePart = Math.floor(Math.random() * (range.max / range.interval - 1)) * range.interval;
    const value = wholePart + range.interval / 2;

    const useVertical = measureType === 'capacity';
    const scaleHtml = useVertical ?
        generateVerticalScale(range.max, range.interval, value, unit, 'jug') :
        generateHorizontalScale(range.max, range.interval, value, unit);

    return {
        text: `The pointer is between two marks. What is the measurement?<br><br>${scaleHtml}`,
        type: 'text_input',
        answer: value.toString(),
        hint: 'Look at which two marks the pointer is between and find the middle value',
        module: 'M02_Y3_MEAS',
        level: level
    };
}

function generateComplexScales(params, level) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const availableUnits = params.units[measureType];
    const unit = availableUnits[Math.floor(Math.random() * availableUnits.length)];
    const range = params.ranges[unit];

    // Larger intervals, more complex reading
    const value = Math.floor(Math.random() * (range.max / range.interval + 1)) * range.interval;

    const useVertical = measureType === 'capacity';
    const scaleHtml = useVertical ?
        generateVerticalScale(range.max, range.interval, value, unit, 'jug') :
        generateHorizontalScale(range.max, range.interval, value, unit, false); // Don't show all numbers

    return {
        text: `What measurement is shown on this scale?<br><br>${scaleHtml}`,
        type: 'text_input',
        answer: value.toString(),
        hint: 'Count the intervals carefully to find the value',
        module: 'M02_Y3_MEAS',
        level: level
    };
}

export default {
    moduleId: 'M02_Y3_MEAS',
    generate: generateQuestion
};
