/**
 * M01_Y2_MEAS: Measurement - Compare and Order Measures
 * Year 2: Compare and order lengths, mass, volume/capacity and record the results using >, < and =
 *
 * This generator introduces comparison symbols and ordering of measurements.
 * Year 2 students begin working with standard units (cm, g, ml) at this level.
 */

import { randomChoice, randomInt, formatMeasurement, getComparisonSymbol } from './helpers/M01_measurementHelpers.js';

/**
 * Unit configurations for Year 2 measurements
 */
const UNIT_LABELS = {
    cm: 'cm',
    m: 'm',
    g: 'g',
    kg: 'kg',
    ml: 'ml',
    l: 'l'
};

/**
 * Generate a comparison question for Year 2 measurement
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    const operations = params.operations;
    const operation = randomChoice(operations);

    switch (operation) {
        case 'compare_with_symbols':
            return generateCompareWithSymbolsQuestion(params, level);
        case 'order_two':
            return generateOrderTwoQuestion(params, level);
        case 'order_three':
            return generateOrderThreeQuestion(params, level);
        case 'order_four':
            return generateOrderFourQuestion(params, level);
        case 'complete_comparison':
            return generateCompleteComparisonQuestion(params, level);
        default:
            return generateCompareWithSymbolsQuestion(params, level);
    }
}

/**
 * Generate a question asking for the correct comparison symbol
 */
function generateCompareWithSymbolsQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);

    // Determine unit to use
    let unit;
    if (params.use_units && params.units[measureType]) {
        unit = randomChoice(params.units[measureType]);
    }

    // Generate two values
    let value1, value2;

    if (params.use_units) {
        // Use ranges appropriate for the unit
        value1 = randomInt(params.min_value, params.max_value);
        value2 = randomInt(params.min_value, params.max_value);

        // Ensure they're different unless equals is allowed
        if (!params.allow_equals) {
            while (value1 === value2) {
                value2 = randomInt(params.min_value, params.max_value);
            }
        }
    } else {
        // Non-standard units (blocks, cups, etc.)
        value1 = randomInt(params.min_value, params.max_value);
        value2 = randomInt(params.min_value, params.max_value);
        if (!params.allow_equals) {
            while (value1 === value2) {
                value2 = randomInt(params.min_value, params.max_value);
            }
        }
    }

    const correctSymbol = getComparisonSymbol(value1, value2);

    let measurement1, measurement2;
    if (params.use_units) {
        measurement1 = formatMeasurement(value1, unit);
        measurement2 = formatMeasurement(value2, unit);
    } else {
        // Use non-standard unit descriptions
        const nonStandardUnits = {
            length: 'blocks',
            mass: 'cubes',
            capacity: 'cups'
        };
        const nonStandardUnit = nonStandardUnits[measureType] || 'units';
        measurement1 = `${value1} ${nonStandardUnit}`;
        measurement2 = `${value2} ${nonStandardUnit}`;
    }

    const questionText = `Which symbol makes this correct?\n${measurement1} ___ ${measurement2}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctSymbol,
        options: ['>', '<', '='],
        hint: 'Compare the values to find which is greater, less, or if they are equal.',
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * Generate a question asking to order two measurements
 */
function generateOrderTwoQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);

    let unit;
    if (params.use_units && params.units[measureType]) {
        unit = randomChoice(params.units[measureType]);
    }

    // Generate two different values
    const value1 = randomInt(params.min_value, params.max_value);
    let value2 = randomInt(params.min_value, params.max_value);
    while (value1 === value2) {
        value2 = randomInt(params.min_value, params.max_value);
    }

    let measurement1, measurement2;
    if (params.use_units) {
        measurement1 = formatMeasurement(value1, unit);
        measurement2 = formatMeasurement(value2, unit);
    } else {
        const nonStandardUnits = {
            length: 'blocks',
            mass: 'cubes',
            capacity: 'cups'
        };
        const nonStandardUnit = nonStandardUnits[measureType] || 'units';
        measurement1 = `${value1} ${nonStandardUnit}`;
        measurement2 = `${value2} ${nonStandardUnit}`;
    }

    const orderDirection = randomChoice(['smallest to largest', 'largest to smallest']);

    let correctAnswer;
    if (orderDirection === 'smallest to largest') {
        correctAnswer = value1 < value2 ? `${measurement1}, ${measurement2}` : `${measurement2}, ${measurement1}`;
    } else {
        correctAnswer = value1 > value2 ? `${measurement1}, ${measurement2}` : `${measurement2}, ${measurement1}`;
    }

    const questionText = `Put these in order from ${orderDirection}:\n${measurement1} and ${measurement2}`;

    // Generate options
    const option1 = `${measurement1}, ${measurement2}`;
    const option2 = `${measurement2}, ${measurement1}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: [option1, option2],
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * Generate a question asking to order three measurements
 */
function generateOrderThreeQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);

    let unit;
    if (params.use_units && params.units[measureType]) {
        unit = randomChoice(params.units[measureType]);
    }

    // Generate three different values
    const values = [];
    while (values.length < 3) {
        const value = randomInt(params.min_value, params.max_value);
        if (!values.includes(value)) {
            values.push(value);
        }
    }

    // Create measurements
    const measurements = values.map(v => {
        if (params.use_units) {
            return formatMeasurement(v, unit);
        } else {
            const nonStandardUnits = {
                length: 'blocks',
                mass: 'cubes',
                capacity: 'cups'
            };
            const nonStandardUnit = nonStandardUnits[measureType] || 'units';
            return `${v} ${nonStandardUnit}`;
        }
    });

    const orderDirection = randomChoice(['smallest to largest', 'largest to smallest']);

    // Sort values
    const sortedIndices = values
        .map((val, idx) => ({ val, idx }))
        .sort((a, b) => orderDirection === 'smallest to largest' ? a.val - b.val : b.val - a.val)
        .map(item => item.idx);

    const correctAnswer = sortedIndices.map(idx => measurements[idx]).join(', ');

    const questionText = `Put these in order from ${orderDirection}:\n${measurements.join(', ')}`;

    // Generate distractor options (different orderings)
    const shuffledIndices1 = [sortedIndices[1], sortedIndices[0], sortedIndices[2]];
    const shuffledIndices2 = [sortedIndices[2], sortedIndices[1], sortedIndices[0]];

    const option1 = correctAnswer;
    const option2 = shuffledIndices1.map(idx => measurements[idx]).join(', ');
    const option3 = shuffledIndices2.map(idx => measurements[idx]).join(', ');

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: [option1, option2, option3],
        hint: 'Look at the values carefully and arrange them in the correct order.',
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * Generate a question asking to order four measurements
 */
function generateOrderFourQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);

    let unit;
    if (params.use_units && params.units[measureType]) {
        unit = randomChoice(params.units[measureType]);
    }

    // Generate four different values
    const values = [];
    while (values.length < 4) {
        const value = randomInt(params.min_value, params.max_value);
        if (!values.includes(value)) {
            values.push(value);
        }
    }

    // Create measurements
    const measurements = values.map(v => {
        if (params.use_units) {
            return formatMeasurement(v, unit);
        } else {
            const nonStandardUnits = {
                length: 'blocks',
                mass: 'cubes',
                capacity: 'cups'
            };
            const nonStandardUnit = nonStandardUnits[measureType] || 'units';
            return `${v} ${nonStandardUnit}`;
        }
    });

    const orderDirection = randomChoice(['smallest to largest', 'largest to smallest']);

    // Sort values
    const sortedIndices = values
        .map((val, idx) => ({ val, idx }))
        .sort((a, b) => orderDirection === 'smallest to largest' ? a.val - b.val : b.val - a.val)
        .map(item => item.idx);

    const correctAnswer = sortedIndices.map(idx => measurements[idx]).join(', ');

    const questionText = `Put these in order from ${orderDirection}:\n${measurements.join(', ')}`;

    // Generate distractor options
    const shuffledIndices1 = [sortedIndices[0], sortedIndices[2], sortedIndices[1], sortedIndices[3]];
    const shuffledIndices2 = [sortedIndices[3], sortedIndices[2], sortedIndices[1], sortedIndices[0]];

    const option1 = correctAnswer;
    const option2 = shuffledIndices1.map(idx => measurements[idx]).join(', ');
    const option3 = shuffledIndices2.map(idx => measurements[idx]).join(', ');

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: [option1, option2, option3],
        hint: 'Compare each value carefully to put them in the right order.',
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * Generate a question asking to complete a comparison sentence
 */
function generateCompleteComparisonQuestion(params, level) {
    const measureType = randomChoice(params.measure_types);

    let unit;
    if (params.use_units && params.units[measureType]) {
        unit = randomChoice(params.units[measureType]);
    }

    const value1 = randomInt(params.min_value, params.max_value);
    let value2 = randomInt(params.min_value, params.max_value);

    // Make sure they're different
    while (value1 === value2) {
        value2 = randomInt(params.min_value, params.max_value);
    }

    const correctSymbol = getComparisonSymbol(value1, value2);

    let measurement1, measurement2;
    if (params.use_units) {
        measurement1 = formatMeasurement(value1, unit);
        measurement2 = formatMeasurement(value2, unit);
    } else {
        const nonStandardUnits = {
            length: 'blocks',
            mass: 'cubes',
            capacity: 'cups'
        };
        const nonStandardUnit = nonStandardUnits[measureType] || 'units';
        measurement1 = `${value1} ${nonStandardUnit}`;
        measurement2 = `${value2} ${nonStandardUnit}`;
    }

    const questionText = `Complete this comparison:\n${measurement1} ___ ${measurement2}`;

    return {
        text: questionText,
        type: 'text_input',
        answer: correctSymbol,
        hint: 'Use >, < or = to show how these measurements compare.',
        module: 'M01_Y2_MEAS',
        level: level
    };
}

export default {
    moduleId: 'M01_Y2_MEAS',
    generate: generateQuestion
};
