/**
 * M06_Y6_MEAS: Convert Between Standard Units with Decimal Notation
 * Year 6 - advanced conversions using decimal notation up to 3 decimal places
 * Includes metric conversions AND miles/kilometres conversions
 *
 * ANSWER FORMAT NOTES:
 * - All answers are numeric only (no units in the answer string)
 * - Decimal notation up to 3 decimal places as per curriculum requirement
 * - Numbers formatted without unnecessary trailing zeros (2.5 not 2.500)
 */

// Exact metric conversion factors
const METRIC_CONVERSION_FACTORS = {
    // Length
    km_to_m: 1000,
    m_to_cm: 100,
    cm_to_mm: 10,
    km_to_cm: 100000,
    km_to_mm: 1000000,
    // Mass
    kg_to_g: 1000,
    g_to_mg: 1000,
    kg_to_mg: 1000000,
    // Capacity/Volume
    l_to_ml: 1000
};

// Approximate imperial conversion factors
const APPROXIMATE_FACTORS = {
    miles_to_km: 1.6 // Curriculum specifies this approximation
};

// Time conversion factors
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
    mg: 'milligrams',
    // Metric - capacity
    l: 'litres',
    ml: 'millilitres',
    // Imperial
    miles: 'miles',
    // Time
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    days: 'days',
    weeks: 'weeks'
};

// Singular forms
const UNIT_NAMES_SINGULAR = {
    km: 'kilometre',
    m: 'metre',
    cm: 'centimetre',
    mm: 'millimetre',
    kg: 'kilogram',
    g: 'gram',
    mg: 'milligram',
    l: 'litre',
    ml: 'millilitre',
    miles: 'mile',
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
    days: 'day',
    weeks: 'week'
};

/**
 * Get conversion factor for a conversion type
 * @param {string} conversionType - e.g., 'km_to_m', 'miles_to_km'
 * @returns {number} The conversion factor
 */
function getConversionFactor(conversionType) {
    // Check metric conversions
    if (METRIC_CONVERSION_FACTORS[conversionType]) {
        return METRIC_CONVERSION_FACTORS[conversionType];
    }

    // Check time conversions
    if (TIME_CONVERSION_FACTORS[conversionType]) {
        return TIME_CONVERSION_FACTORS[conversionType];
    }

    // Check approximate imperial conversions
    if (APPROXIMATE_FACTORS[conversionType]) {
        return APPROXIMATE_FACTORS[conversionType];
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

    // Try approximate reverse
    const reverseApprox = `${toUnit}_to_${fromUnit}`;
    if (APPROXIMATE_FACTORS[reverseApprox]) {
        return 1 / APPROXIMATE_FACTORS[reverseApprox];
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
 * Generate a random decimal value based on decimal places specification
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimalPlaces - Number of decimal places (1, 2, or 3)
 * @returns {number} Random decimal value
 */
function generateDecimalValue(min, max, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    const minScaled = Math.floor(min * multiplier);
    const maxScaled = Math.floor(max * multiplier);

    const randomScaled = Math.floor(Math.random() * (maxScaled - minScaled + 1)) + minScaled;
    const result = randomScaled / multiplier;

    return parseFloat(result.toFixed(decimalPlaces));
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
    const valueTypes = params.value_types || ['whole'];
    const valueType = valueTypes[Math.floor(Math.random() * valueTypes.length)];

    if (valueType === 'whole') {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (valueType === 'decimal_1dp') {
        return generateDecimalValue(min, max, 1);
    } else if (valueType === 'decimal_2dp') {
        return generateDecimalValue(min, max, 2);
    } else if (valueType === 'decimal_3dp') {
        return generateDecimalValue(min, max, 3);
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format a number for display (remove unnecessary trailing zeros, respect 3dp max)
 * @param {number} value - The value to format
 * @param {number} maxDecimalPlaces - Maximum decimal places (default 3)
 * @returns {string} Formatted value
 */
function formatNumber(value, maxDecimalPlaces = 3) {
    // Round to max decimal places to handle floating point precision
    const rounded = parseFloat(value.toFixed(maxDecimalPlaces));
    return rounded.toString();
}

/**
 * Determine if conversion is imperial/metric (approximate)
 * @param {string} conversionType - e.g., 'miles_to_km'
 * @returns {boolean} True if imperial conversion
 */
function isImperialConversion(conversionType) {
    return conversionType.includes('miles');
}

/**
 * Generate a metric conversion question (larger to smaller unit)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateMetricConversionLargerToSmaller(params) {
    const measureTypes = params.measure_types.filter(t => t !== 'time');
    if (measureTypes.length === 0) {
        return generateMetricConversionSmallerToLarger(params);
    }

    const measureType = measureTypes[Math.floor(Math.random() * measureTypes.length)];
    const conversions = params.conversions[measureType];

    // Filter for larger→smaller conversions (factor >= 1)
    const largerToSmaller = conversions.filter(c => {
        if (isImperialConversion(c)) return false;
        const factor = getConversionFactor(c);
        return factor >= 1;
    });

    if (largerToSmaller.length === 0) {
        return generateMetricConversionSmallerToLarger(params);
    }

    const conversionType = largerToSmaller[Math.floor(Math.random() * largerToSmaller.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);
    const factor = getConversionFactor(conversionType);

    return {
        text: `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName}.`,
        type: 'text_input',
        answer: formatNumber(answer, params.decimal_max_places || 3),
        hint: `1 ${UNIT_NAMES_SINGULAR[fromUnit]} = ${factor} ${toUnitName}`,
        module: 'M06_Y6_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate a metric conversion question (smaller to larger unit)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateMetricConversionSmallerToLarger(params) {
    const measureTypes = params.measure_types.filter(t => t !== 'time');
    if (measureTypes.length === 0) {
        return generateMetricConversionLargerToSmaller(params);
    }

    const measureType = measureTypes[Math.floor(Math.random() * measureTypes.length)];
    const conversions = params.conversions[measureType];

    // Filter for smaller→larger conversions (factor < 1)
    const smallerToLarger = conversions.filter(c => {
        if (isImperialConversion(c)) return false;
        const factor = getConversionFactor(c);
        return factor < 1;
    });

    if (smallerToLarger.length === 0) {
        return generateMetricConversionLargerToSmaller(params);
    }

    const conversionType = smallerToLarger[Math.floor(Math.random() * smallerToLarger.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);

    return {
        text: `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName}.`,
        type: 'text_input',
        answer: formatNumber(answer, params.decimal_max_places || 3),
        hint: `Divide to convert from ${fromUnitName} to ${toUnitName}.`,
        module: 'M06_Y6_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate an imperial-metric conversion question (miles ↔ kilometres)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateImperialMetricConversion(params) {
    const lengthConversions = params.conversions.length || [];

    // Filter for miles conversions
    const milesConversions = lengthConversions.filter(c => isImperialConversion(c));

    if (milesConversions.length === 0) {
        // Fallback to metric if no imperial conversions available
        return generateMetricConversionLargerToSmaller(params);
    }

    const conversionType = milesConversions[Math.floor(Math.random() * milesConversions.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);
    const factor = APPROXIMATE_FACTORS[conversionType] || (1 / APPROXIMATE_FACTORS[`${toUnit}_to_${fromUnit}`]);

    return {
        text: `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName}. (Use the approximation: 1 mile ≈ 1.6 km)`,
        type: 'text_input',
        answer: formatNumber(answer, params.decimal_max_places || 3),
        hint: `Remember, 1 ${UNIT_NAMES_SINGULAR[fromUnit]} ≈ ${factor} ${toUnitName}. This is an approximation.`,
        module: 'M06_Y6_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate a word problem with conversion
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateWordProblem(params) {
    // Randomly choose metric or time (or imperial if available)
    const useTime = params.include_time && Math.random() < 0.33;
    const useImperial = Math.random() < 0.25; // 25% chance for imperial

    if (useImperial && params.conversions.length) {
        const lengthConversions = params.conversions.length;
        const milesConversions = lengthConversions.filter(c => isImperialConversion(c));

        if (milesConversions.length > 0) {
            const conversionType = milesConversions[Math.floor(Math.random() * milesConversions.length)];
            const [fromUnit, , toUnit] = conversionType.split('_');

            const value = generateValue(params, fromUnit);
            const answer = convertValue(value, conversionType);

            const fromUnitName = getUnitName(fromUnit, value);
            const toUnitName = getUnitName(toUnit, answer);

            const contexts = [
                `A road sign shows the distance to London as ${formatNumber(value)} ${fromUnitName}.`,
                `A running race is ${formatNumber(value)} ${fromUnitName} long.`,
                `A car journey covers ${formatNumber(value)} ${fromUnitName}.`,
                `The distance between two cities is ${formatNumber(value)} ${fromUnitName}.`
            ];

            const context = contexts[Math.floor(Math.random() * contexts.length)];

            return {
                text: `${context} What is this distance in ${toUnitName}? (Use 1 mile ≈ 1.6 km)`,
                type: 'text_input',
                answer: formatNumber(answer, params.decimal_max_places || 3),
                hint: `Use the approximation: 1 mile ≈ 1.6 km`,
                module: 'M06_Y6_MEAS',
                level: params.level || 3
            };
        }
    }

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
            `A meeting is scheduled for ${formatNumber(value)} ${fromUnitName}.`,
            `An event runs for ${formatNumber(value)} ${fromUnitName}.`
        ];

        const context = contexts[Math.floor(Math.random() * contexts.length)];

        return {
            text: `${context} How many ${toUnitName} is this?`,
            type: 'text_input',
            answer: formatNumber(answer, params.decimal_max_places || 3),
            hint: `Convert ${fromUnitName} to ${toUnitName}.`,
            module: 'M06_Y6_MEAS',
            level: params.level || 3
        };
    } else {
        // Use metric
        const measureTypes = params.measure_types.filter(t => t !== 'time');
        if (measureTypes.length === 0) {
            return generateMetricConversionLargerToSmaller(params);
        }

        const measureType = measureTypes[Math.floor(Math.random() * measureTypes.length)];
        const conversions = params.conversions[measureType].filter(c => !isImperialConversion(c));
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
            const contexts = [
                `A piece of wood measures ${formatNumber(value)} ${fromUnitName}.`,
                `The height of a building is ${formatNumber(value)} ${fromUnitName}.`,
                `A ribbon is ${formatNumber(value)} ${fromUnitName} long.`,
                `The width of a room is ${formatNumber(value)} ${fromUnitName}.`
            ];
            context = contexts[Math.floor(Math.random() * contexts.length)];
        } else if (measureType === 'mass') {
            const contexts = [
                `A package weighs ${formatNumber(value)} ${fromUnitName}.`,
                `A bag of sugar has a mass of ${formatNumber(value)} ${fromUnitName}.`,
                `An ingredient weighs ${formatNumber(value)} ${fromUnitName}.`,
                `A parcel has a mass of ${formatNumber(value)} ${fromUnitName}.`
            ];
            context = contexts[Math.floor(Math.random() * contexts.length)];
        } else { // capacity
            const contexts = [
                `A container holds ${formatNumber(value)} ${fromUnitName}.`,
                `A bottle contains ${formatNumber(value)} ${fromUnitName} of water.`,
                `A jug has a capacity of ${formatNumber(value)} ${fromUnitName}.`,
                `A tank holds ${formatNumber(value)} ${fromUnitName}.`
            ];
            context = contexts[Math.floor(Math.random() * contexts.length)];
        }

        return {
            text: `${context} How many ${toUnitName} is this?`,
            type: 'text_input',
            answer: formatNumber(answer, params.decimal_max_places || 3),
            hint: `Convert ${fromUnitName} to ${toUnitName}.`,
            module: 'M06_Y6_MEAS',
            level: params.level || 3
        };
    }
}

/**
 * Generate a multi-step conversion question
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateMultiStep(params) {
    // Multi-step: e.g., "A journey is 2.5 hours. How many seconds is this?"
    // Requires converting hours → minutes → seconds

    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // For multi-step, use conversions that skip an intermediate unit
    // E.g., km→mm (skips m, cm) or hours→seconds (skips minutes)
    const multiStepConversions = conversions.filter(c => {
        const factor = Math.abs(getConversionFactor(c) || 0);
        return factor >= 10000 || (1/factor >= 10000) || c.includes('km_to_mm') || c.includes('km_to_cm');
    });

    if (multiStepConversions.length === 0) {
        // Fallback to regular word problem
        return generateWordProblem(params);
    }

    const conversionType = multiStepConversions[Math.floor(Math.random() * multiStepConversions.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    if (!fromUnit || !toUnit) {
        return generateMultiStep(params);
    }

    const value = generateValue(params, fromUnit);
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);

    return {
        text: `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName}.`,
        type: 'text_input',
        answer: formatNumber(answer, params.decimal_max_places || 3),
        hint: `This is a multi-step conversion. Think about the intermediate units you might need.`,
        module: 'M06_Y6_MEAS',
        level: params.level || 4
    };
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

    const operations = params.operations || ['metric_conversion_larger_to_smaller'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
        case 'metric_conversion_larger_to_smaller':
            return generateMetricConversionLargerToSmaller(params);
        case 'metric_conversion_smaller_to_larger':
            return generateMetricConversionSmallerToLarger(params);
        case 'imperial_metric_conversion':
            return generateImperialMetricConversion(params);
        case 'word_problem':
            return generateWordProblem(params);
        case 'multi_step':
            return generateMultiStep(params);
        default:
            return generateMetricConversionLargerToSmaller(params);
    }
}

export default {
    moduleId: 'M06_Y6_MEAS',
    generate: generateQuestion
};
