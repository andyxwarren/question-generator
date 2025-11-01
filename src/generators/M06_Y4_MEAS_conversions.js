/**
 * M06_Y4_MEAS: Convert Between Different Units of Measurement
 * Year 4 - metric unit conversions AND time conversions
 *
 * ANSWER FORMAT NOTES:
 * - All answers are numeric only (no units in the answer string)
 * - Numbers formatted without trailing zeros
 * - Validator should accept plain numbers: "2500", "120", "3500"
 */

import { getRealisticValue, getObjectsForUnit } from './helpers/contextualRanges.js';

// Conversion factors for metric units
const METRIC_CONVERSION_FACTORS = {
    // Length
    km_to_m: 1000,
    m_to_cm: 100,
    cm_to_mm: 10,
    // Mass
    kg_to_g: 1000,
    // Capacity
    l_to_ml: 1000
};

// Conversion factors for time units
const TIME_CONVERSION_FACTORS = {
    hours_to_minutes: 60,
    minutes_to_seconds: 60,
    days_to_hours: 24,
    weeks_to_days: 7
};

// Unit names for display (plural)
const UNIT_NAMES = {
    // Metric - length
    km: 'kilometres',
    m: 'metres',
    cm: 'centimetres',
    mm: 'millimetres',
    // Metric - mass
    kg: 'kilograms',
    g: 'grams',
    // Metric - capacity
    l: 'litres',
    ml: 'millilitres',
    // Time
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    days: 'days',
    weeks: 'weeks'
};

// Singular forms
const UNIT_NAMES_SINGULAR = {
    // Metric - length
    km: 'kilometre',
    m: 'metre',
    cm: 'centimetre',
    mm: 'millimetre',
    // Metric - mass
    kg: 'kilogram',
    g: 'gram',
    // Metric - capacity
    l: 'litre',
    ml: 'millilitre',
    // Time
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
    days: 'day',
    weeks: 'week'
};

/**
 * Get conversion factor for a conversion type
 * @param {string} conversionType - e.g., 'km_to_m', 'hours_to_minutes'
 * @returns {number} The conversion factor
 */
function getConversionFactor(conversionType) {
    // Check metric conversions first
    if (METRIC_CONVERSION_FACTORS[conversionType]) {
        return METRIC_CONVERSION_FACTORS[conversionType];
    }

    // Check time conversions
    if (TIME_CONVERSION_FACTORS[conversionType]) {
        return TIME_CONVERSION_FACTORS[conversionType];
    }

    // For reverse conversions, find the inverse
    const [fromUnit, , toUnit] = conversionType.split('_');

    // Try metric reverse
    const reverseMetric = `${toUnit}_to_${fromUnit}`;
    if (METRIC_CONVERSION_FACTORS[reverseMetric]) {
        return 1 / METRIC_CONVERSION_FACTORS[reverseMetric];
    }

    // Try time reverse
    const reverseTime = `${toUnit}_to_${fromUnit}`;
    if (TIME_CONVERSION_FACTORS[reverseTime]) {
        return 1 / TIME_CONVERSION_FACTORS[reverseTime];
    }

    throw new Error(`Unknown conversion type: ${conversionType}`);
}

/**
 * Convert a value between units
 * @param {number} value - The value to convert
 * @param {string} conversionType - The conversion type
 * @returns {number} The converted value
 */
function convertValue(value, conversionType) {
    const factor = getConversionFactor(conversionType);
    return value * factor;
}

/**
 * Get appropriate unit name (singular or plural)
 * @param {string} unit - Unit abbreviation
 * @param {number} value - The value (to determine singular/plural)
 * @returns {string} Unit name
 */
function getUnitName(unit, value) {
    if (value === 0) {
        return UNIT_NAMES[unit] || unit;
    }
    if (value === 1) {
        return UNIT_NAMES_SINGULAR[unit] || unit;
    }
    return UNIT_NAMES[unit] || unit;
}

/**
 * Generate a random value based on value types and ranges
 * @param {Object} params - Parameters
 * @param {string} unit - Unit type
 * @returns {number} Random value
 */
function generateValue(params, unit) {
    const range = params.ranges[unit];
    if (!range) {
        throw new Error(`No range defined for unit: ${unit}`);
    }

    const { min, max } = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format a number for display (remove trailing zeros)
 * @param {number} value - The value to format
 * @returns {string} Formatted value
 */
function formatNumber(value) {
    // Handle floating point precision issues
    const rounded = parseFloat(value.toFixed(10));
    return rounded.toString();
}

/**
 * Determine if a conversion is metric or time
 * @param {string} conversionType - e.g., 'km_to_m' or 'hours_to_minutes'
 * @returns {string} 'metric' or 'time'
 */
function getConversionCategory(conversionType) {
    if (METRIC_CONVERSION_FACTORS[conversionType]) return 'metric';
    if (TIME_CONVERSION_FACTORS[conversionType]) return 'time';

    // Check reverse conversions
    const [fromUnit, , toUnit] = conversionType.split('_');
    const reverseType = `${toUnit}_to_${fromUnit}`;

    if (METRIC_CONVERSION_FACTORS[reverseType]) return 'metric';
    if (TIME_CONVERSION_FACTORS[reverseType]) return 'time';

    return 'unknown';
}

/**
 * Generate a direct metric conversion question
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateDirectMetricConversion(params) {
    const measureTypes = params.measure_types.filter(t => t !== 'time');
    if (measureTypes.length === 0) {
        // Fallback to time if no metric types
        return generateTimeConversion(params);
    }

    const measureType = measureTypes[Math.floor(Math.random() * measureTypes.length)];
    const conversions = params.conversions[measureType];

    // Filter for direct conversions (larger to smaller, factor >= 1)
    const directConversions = conversions.filter(c => {
        const factor = getConversionFactor(c);
        return factor >= 1;
    });

    if (directConversions.length === 0) {
        return generateDirectMetricConversion(params);
    }

    const conversionType = directConversions[Math.floor(Math.random() * directConversions.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);
    const factor = getConversionFactor(conversionType);

    return {
        text: `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName}.`,
        type: 'text_input',
        answer: formatNumber(answer),
        hint: `1 ${UNIT_NAMES_SINGULAR[fromUnit]} = ${factor} ${toUnitName}`,
        module: 'M06_Y4_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate a reverse metric conversion question (smaller to larger unit)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateReverseMetricConversion(params) {
    const measureTypes = params.measure_types.filter(t => t !== 'time');
    if (measureTypes.length === 0) {
        return generateTimeConversion(params);
    }

    const measureType = measureTypes[Math.floor(Math.random() * measureTypes.length)];
    const conversions = params.conversions[measureType];

    // Filter for reverse conversions (smaller to larger, factor < 1)
    const reverseConversions = conversions.filter(c => {
        const factor = getConversionFactor(c);
        return factor < 1;
    });

    if (reverseConversions.length === 0) {
        return generateDirectMetricConversion(params);
    }

    const conversionType = reverseConversions[Math.floor(Math.random() * reverseConversions.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);

    return {
        text: `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName}.`,
        type: 'text_input',
        answer: formatNumber(answer),
        hint: `You need to divide to convert from ${fromUnitName} to ${toUnitName}.`,
        module: 'M06_Y4_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate a time conversion question
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateTimeConversion(params) {
    const timeConversions = params.conversions.time;
    if (!timeConversions || timeConversions.length === 0) {
        // Fallback to metric
        return generateDirectMetricConversion(params);
    }

    const conversionType = timeConversions[Math.floor(Math.random() * timeConversions.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);
    const factor = getConversionFactor(conversionType);

    return {
        text: `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName}.`,
        type: 'text_input',
        answer: formatNumber(answer),
        hint: `1 ${UNIT_NAMES_SINGULAR[fromUnit]} = ${factor} ${toUnitName}`,
        module: 'M06_Y4_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate a word problem with conversion
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateWordProblem(params) {
    // Randomly choose metric or time
    const useTime = Math.random() < 0.5;

    if (useTime && params.conversions.time) {
        const timeConversions = params.conversions.time;
        const conversionType = timeConversions[Math.floor(Math.random() * timeConversions.length)];
        const [fromUnit, , toUnit] = conversionType.split('_');

        const value = generateValue(params, fromUnit);
        const answer = convertValue(value, conversionType);

        const fromUnitName = getUnitName(fromUnit, value);
        const toUnitName = getUnitName(toUnit, answer);

        const contexts = [
            `A film lasts ${formatNumber(value)} ${fromUnitName}.`,
            `A journey takes ${formatNumber(value)} ${fromUnitName}.`,
            `A lesson is ${formatNumber(value)} ${fromUnitName} long.`,
            `A football match lasts ${formatNumber(value)} ${fromUnitName}.`
        ];

        const context = contexts[Math.floor(Math.random() * contexts.length)];

        return {
            text: `${context} How many ${toUnitName} is this?`,
            type: 'text_input',
            answer: formatNumber(answer),
            hint: `Convert ${fromUnitName} to ${toUnitName}.`,
            module: 'M06_Y4_MEAS',
            level: params.level || 3
        };
    } else {
        // Use metric
        const measureTypes = params.measure_types.filter(t => t !== 'time');
        if (measureTypes.length === 0) {
            return generateTimeConversion(params);
        }

        const measureType = measureTypes[Math.floor(Math.random() * measureTypes.length)];
        const conversions = params.conversions[measureType];
        const conversionType = conversions[Math.floor(Math.random() * conversions.length)];

        const [fromUnit, , toUnit] = conversionType.split('_');
        if (!fromUnit || !toUnit) {
            return generateWordProblem(params);
        }

        const value = generateValue(params, fromUnit);
        const answer = convertValue(value, conversionType);

        const fromUnitName = getUnitName(fromUnit, value);
        const toUnitName = getUnitName(toUnit, answer);

        let context;
        if (measureType === 'length') {
            // Use realistic object-based values
            const objectsForUnit = getObjectsForUnit('length', fromUnit);
            if (objectsForUnit.length > 0) {
                const object = objectsForUnit[Math.floor(Math.random() * objectsForUnit.length)];
                const realisticData = getRealisticValue(object, 'length');
                if (realisticData && realisticData.unit === fromUnit) {
                    const realisticValue = realisticData.value;
                    const realisticAnswer = convertValue(realisticValue, conversionType);
                    context = `A ${object} measures ${formatNumber(realisticValue)} ${fromUnitName}.`;

                    return {
                        text: `${context} How many ${toUnitName} is this?`,
                        type: 'text_input',
                        answer: formatNumber(realisticAnswer),
                        hint: `Convert ${fromUnitName} to ${toUnitName}.`,
                        module: 'M06_Y4_MEAS',
                        level: params.level || 3
                    };
                }
            }
            // Fallback to generic contexts
            const contexts = [
                `A rope measures ${formatNumber(value)} ${fromUnitName}.`,
                `The distance to the shop is ${formatNumber(value)} ${fromUnitName}.`,
                `A garden path is ${formatNumber(value)} ${fromUnitName} long.`
            ];
            context = contexts[Math.floor(Math.random() * contexts.length)];
        } else if (measureType === 'mass') {
            // Use realistic object-based values
            const objectsForUnit = getObjectsForUnit('mass', fromUnit);
            if (objectsForUnit.length > 0) {
                const object = objectsForUnit[Math.floor(Math.random() * objectsForUnit.length)];
                const realisticData = getRealisticValue(object, 'mass');
                if (realisticData && realisticData.unit === fromUnit) {
                    const realisticValue = realisticData.value;
                    const realisticAnswer = convertValue(realisticValue, conversionType);
                    const article = ['a', 'e', 'i', 'o', 'u'].includes(object.charAt(0).toLowerCase()) ? 'an' : 'a';
                    const objectText = object.startsWith('bag of') || object.startsWith('box of') ? object : `${article} ${object}`;
                    context = `${objectText.charAt(0).toUpperCase() + objectText.slice(1)} weighs ${formatNumber(realisticValue)} ${fromUnitName}.`;

                    return {
                        text: `${context} How many ${toUnitName} is this?`,
                        type: 'text_input',
                        answer: formatNumber(realisticAnswer),
                        hint: `Convert ${fromUnitName} to ${toUnitName}.`,
                        module: 'M06_Y4_MEAS',
                        level: params.level || 3
                    };
                }
            }
            // Fallback to generic contexts
            const contexts = [
                `A bag of flour weighs ${formatNumber(value)} ${fromUnitName}.`,
                `A parcel has a mass of ${formatNumber(value)} ${fromUnitName}.`,
                `A watermelon weighs ${formatNumber(value)} ${fromUnitName}.`
            ];
            context = contexts[Math.floor(Math.random() * contexts.length)];
        } else { // capacity
            // Use realistic object-based values
            const objectsForUnit = getObjectsForUnit('capacity', fromUnit);
            if (objectsForUnit.length > 0) {
                const object = objectsForUnit[Math.floor(Math.random() * objectsForUnit.length)];
                const realisticData = getRealisticValue(object, 'capacity');
                if (realisticData && realisticData.unit === fromUnit) {
                    const realisticValue = realisticData.value;
                    const realisticAnswer = convertValue(realisticValue, conversionType);
                    const article = ['a', 'e', 'i', 'o', 'u'].includes(object.charAt(0).toLowerCase()) ? 'an' : 'a';
                    context = `A ${object} holds ${formatNumber(realisticValue)} ${fromUnitName}.`;

                    return {
                        text: `${context} How many ${toUnitName} is this?`,
                        type: 'text_input',
                        answer: formatNumber(realisticAnswer),
                        hint: `Convert ${fromUnitName} to ${toUnitName}.`,
                        module: 'M06_Y4_MEAS',
                        level: params.level || 3
                    };
                }
            }
            // Fallback to generic contexts
            const contexts = [
                `A bottle holds ${formatNumber(value)} ${fromUnitName}.`,
                `A jug contains ${formatNumber(value)} ${fromUnitName} of water.`,
                `A bucket has a capacity of ${formatNumber(value)} ${fromUnitName}.`
            ];
            context = contexts[Math.floor(Math.random() * contexts.length)];
        }

        return {
            text: `${context} How many ${toUnitName} is this?`,
            type: 'text_input',
            answer: formatNumber(answer),
            hint: `Convert ${fromUnitName} to ${toUnitName}.`,
            module: 'M06_Y4_MEAS',
            level: params.level || 3
        };
    }
}

/**
 * Main question generator function
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    // Add level to params for generators to use
    params.level = level;

    const operations = params.operations || ['direct_metric_conversion'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
        case 'direct_metric_conversion':
            return generateDirectMetricConversion(params);
        case 'reverse_metric_conversion':
            return generateReverseMetricConversion(params);
        case 'time_conversion':
            return generateTimeConversion(params);
        case 'word_problem':
            return generateWordProblem(params);
        default:
            return generateDirectMetricConversion(params);
    }
}

export default {
    moduleId: 'M06_Y4_MEAS',
    generate: generateQuestion
};
