/**
 * M01_Y3_MEAS: Measurement - Compare Measures with Units
 * Year 3: Compare lengths (m/cm/mm); compare mass (kg/g); compare volume/capacity (l/ml)
 *
 * This generator handles comparison of measurements with metric units, including mixed units.
 */

import { randomChoice, randomInt, formatMeasurement, convertUnit, getComparisonSymbol } from './helpers/M01_measurementHelpers.js';

/**
 * Generate a comparison question for Year 3 measurement
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    const operations = params.operations;
    const operation = randomChoice(operations);

    switch (operation) {
        case 'compare_same_units':
            return generateCompareSameUnitsQuestion(params, level);
        case 'order_same_units':
            return generateOrderSameUnitsQuestion(params, level);
        case 'compare_mixed_units_simple':
            return generateCompareMixedUnitsSimpleQuestion(params, level);
        case 'compare_mixed_units':
            return generateCompareMixedUnitsQuestion(params, level);
        case 'order_mixed_units':
            return generateOrderMixedUnitsQuestion(params, level);
        case 'identify_comparison_symbol':
            return generateIdentifyComparisonSymbolQuestion(params, level);
        default:
            return generateCompareSameUnitsQuestion(params, level);
    }
}

/**
 * Generate a question comparing measurements in the same units
 */
function generateCompareSameUnitsQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);
    const units = params.units[measureType];
    const unit = randomChoice(units);
    const range = params.ranges[unit];

    const value1 = randomInt(range.min, range.max);
    let value2 = randomInt(range.min, range.max);
    while (value1 === value2) {
        value2 = randomInt(range.min, range.max);
    }

    const measurement1 = formatMeasurement(value1, unit);
    const measurement2 = formatMeasurement(value2, unit);
    const correctSymbol = getComparisonSymbol(value1, value2);

    const questionText = `Which symbol makes this correct?\n${measurement1} ___ ${measurement2}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctSymbol,
        options: ['>', '<', '='],
        hint: 'Compare the numbers - they are both in the same units.',
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * Generate a question ordering measurements in the same units
 */
function generateOrderSameUnitsQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);
    const units = params.units[measureType];
    const unit = randomChoice(units);
    const range = params.ranges[unit];

    // Generate three different values
    const values = [];
    while (values.length < 3) {
        const value = randomInt(range.min, range.max);
        if (!values.includes(value)) {
            values.push(value);
        }
    }

    const measurements = values.map(v => formatMeasurement(v, unit));
    const orderDirection = randomChoice(['smallest to largest', 'largest to smallest']);

    const sortedIndices = values
        .map((val, idx) => ({ val, idx }))
        .sort((a, b) => orderDirection === 'smallest to largest' ? a.val - b.val : b.val - a.val)
        .map(item => item.idx);

    const correctAnswer = sortedIndices.map(idx => measurements[idx]).join(', ');

    const questionText = `Put these in order from ${orderDirection}:\n${measurements.join(', ')}`;

    const shuffledIndices1 = [sortedIndices[1], sortedIndices[0], sortedIndices[2]];
    const shuffledIndices2 = [sortedIndices[2], sortedIndices[1], sortedIndices[0]];

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: [
            correctAnswer,
            shuffledIndices1.map(idx => measurements[idx]).join(', '),
            shuffledIndices2.map(idx => measurements[idx]).join(', ')
        ],
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * Generate a simple mixed units comparison (e.g., 100 cm vs 1 m)
 */
function generateCompareMixedUnitsSimpleQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);
    const units = params.units[measureType];

    // For simple conversions, use pairs that have clear relationships
    let unit1, unit2, conversionFactor;

    if (measureType === 'length') {
        if (randomChoice([true, false])) {
            unit1 = 'cm';
            unit2 = 'm';
            conversionFactor = 100; // 100 cm = 1 m
        } else {
            unit1 = 'mm';
            unit2 = 'cm';
            conversionFactor = 10; // 10 mm = 1 cm
        }
    } else if (measureType === 'mass') {
        unit1 = 'g';
        unit2 = 'kg';
        conversionFactor = 1000; // 1000 g = 1 kg
    } else { // capacity
        unit1 = 'ml';
        unit2 = 'l';
        conversionFactor = 1000; // 1000 ml = 1 l
    }

    // Generate simple values
    const value2 = randomInt(1, 5);
    const value1 = value2 * conversionFactor + randomInt(-20, 20);

    const measurement1 = formatMeasurement(value1, unit1);
    const measurement2 = formatMeasurement(value2, unit2);

    // Convert to same unit for comparison
    const value1InUnit2 = value1 / conversionFactor;
    const correctSymbol = getComparisonSymbol(value1InUnit2, value2);

    const questionText = `Which symbol makes this correct?\n${measurement1} ___ ${measurement2}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctSymbol,
        options: ['>', '<', '='],
        hint: `Remember: ${conversionFactor} ${unit1} = 1 ${unit2}`,
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * Generate a mixed units comparison
 */
function generateCompareMixedUnitsQuestion(params, level) {
    // Similar to simple but with more complex values
    return generateCompareMixedUnitsSimpleQuestion(params, level);
}

/**
 * Generate an ordering question with mixed units
 */
function generateOrderMixedUnitsQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);
    // For simplicity, use two units
    const units = params.units[measureType].slice(0, 2);

    const values = [];
    const measurements = [];

    // Generate measurements in different units
    for (let i = 0; i < 3; i++) {
        const unit = randomChoice(units);
        const range = params.ranges[unit];
        const value = randomInt(range.min, range.max);
        values.push({ value, unit });
        measurements.push(formatMeasurement(value, unit));
    }

    // Convert all to same unit for sorting (use first unit)
    const baseUnit = units[0];
    const normalizedValues = values.map(v => {
        if (v.unit === baseUnit) {
            return v.value;
        }
        try {
            return convertUnit(v.value, v.unit, baseUnit);
        } catch (e) {
            return v.value; // Fallback if conversion not implemented
        }
    });

    const orderDirection = randomChoice(['smallest to largest', 'largest to smallest']);

    const sortedIndices = normalizedValues
        .map((val, idx) => ({ val, idx }))
        .sort((a, b) => orderDirection === 'smallest to largest' ? a.val - b.val : b.val - a.val)
        .map(item => item.idx);

    const correctAnswer = sortedIndices.map(idx => measurements[idx]).join(', ');

    const questionText = `Put these in order from ${orderDirection}:\n${measurements.join(', ')}`;

    const shuffledIndices1 = [sortedIndices[1], sortedIndices[0], sortedIndices[2]];
    const shuffledIndices2 = [sortedIndices[2], sortedIndices[1], sortedIndices[0]];

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: [
            correctAnswer,
            shuffledIndices1.map(idx => measurements[idx]).join(', '),
            shuffledIndices2.map(idx => measurements[idx]).join(', ')
        ],
        hint: 'Convert to the same units first, then compare.',
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * Generate a question asking for the comparison symbol between mixed units
 */
function generateIdentifyComparisonSymbolQuestion(params, level) {
    return generateCompareMixedUnitsQuestion(params, level);
}

export default {
    moduleId: 'M01_Y3_MEAS',
    generate: generateQuestion
};
