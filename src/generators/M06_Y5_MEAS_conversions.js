/**
 * M06_Y5_MEAS: Approximate Equivalences Between Metric and Imperial Units
 * Year 5 - understanding and using APPROXIMATE conversions
 *
 * ANSWER FORMAT NOTES:
 * - All answers are numeric only (no units in the answer string)
 * - Because these are APPROXIMATIONS, answers should be accepted with tolerance
 * - Numbers formatted without trailing zeros
 * - Use approximate language: "about", "approximately", "roughly"
 *
 * IMPORTANT: These are APPROXIMATE conversions, not exact
 * Accept answers within ±10% tolerance for reasonable approximations
 */

// Approximate conversion factors (as taught in UK Year 5 curriculum)
const APPROXIMATE_FACTORS = {
    // Length
    inches_to_cm: 2.5,
    feet_to_cm: 30,
    yards_to_m: 1, // Some curricula use 0.9, but 1 is common approximation
    miles_to_km: 1.6, // Alternative: 5 miles ≈ 8 km
    // Mass
    ounces_to_g: 30,
    pounds_to_g: 450,
    pounds_to_kg: 0.45,
    stone_to_kg: 6.5, // 1 stone = 14 pounds ≈ 6.5 kg
    // Capacity
    pints_to_ml: 600,
    pints_to_l: 0.6,
    gallons_to_l: 4.5
};

// Unit names for display (plural)
const UNIT_NAMES = {
    // Imperial - length
    inches: 'inches',
    feet: 'feet',
    yards: 'yards',
    miles: 'miles',
    // Imperial - mass
    ounces: 'ounces',
    pounds: 'pounds',
    stone: 'stone',
    // Imperial - capacity
    pints: 'pints',
    gallons: 'gallons',
    // Metric - length
    cm: 'centimetres',
    m: 'metres',
    km: 'kilometres',
    // Metric - mass
    g: 'grams',
    kg: 'kilograms',
    // Metric - capacity
    ml: 'millilitres',
    l: 'litres'
};

// Singular forms
const UNIT_NAMES_SINGULAR = {
    inches: 'inch',
    feet: 'foot',
    yards: 'yard',
    miles: 'mile',
    ounces: 'ounce',
    pounds: 'pound',
    stone: 'stone', // "stone" is already singular/plural
    pints: 'pint',
    gallons: 'gallon',
    cm: 'centimetre',
    m: 'metre',
    km: 'kilometre',
    g: 'gram',
    kg: 'kilogram',
    ml: 'millilitre',
    l: 'litre'
};

// Approximate language phrases
const APPROXIMATE_PHRASES = [
    'approximately',
    'about',
    'roughly'
];

/**
 * Get conversion factor for a conversion type
 * @param {string} conversionType - e.g., 'inches_to_cm'
 * @returns {number} The approximate conversion factor
 */
function getConversionFactor(conversionType) {
    if (APPROXIMATE_FACTORS[conversionType]) {
        return APPROXIMATE_FACTORS[conversionType];
    }

    // For reverse conversions, find the inverse
    const [fromUnit, , toUnit] = conversionType.split('_');
    const reverseType = `${toUnit}_to_${fromUnit}`;

    if (APPROXIMATE_FACTORS[reverseType]) {
        return 1 / APPROXIMATE_FACTORS[reverseType];
    }

    throw new Error(`Unknown conversion type: ${conversionType}`);
}

/**
 * Convert a value between units using approximations
 * @param {number} value - The value to convert
 * @param {string} conversionType - The conversion type
 * @returns {number} The converted value (approximate)
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
    if (unit === 'stone') {
        return 'stone'; // Special case: always "stone"
    }
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
    const valueTypes = params.value_types || ['whole_only'];
    const valueType = valueTypes[Math.floor(Math.random() * valueTypes.length)];

    if (valueType === 'whole_only' || valueType === 'whole') {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (valueType === 'simple_decimal') {
        // Simple decimals: X.0 or X.5 only
        const wholeNum = Math.floor(Math.random() * (max - min)) + min;
        const decimal = [0, 0.5][Math.floor(Math.random() * 2)];
        return wholeNum + decimal;
    } else if (valueType === 'decimal') {
        // Up to 1-2 decimal places
        const wholeNum = Math.floor(Math.random() * (max - min)) + min;
        const decimalPart = Math.floor(Math.random() * 10) / 10; // 0.0 to 0.9
        const result = wholeNum + decimalPart;

        if (result < min) {
            return min;
        }

        return parseFloat(result.toFixed(1));
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format a number for display (remove trailing zeros)
 * @param {number} value - The value to format
 * @returns {string} Formatted value
 */
function formatNumber(value) {
    // Round to 2 decimal places for approximate conversions
    const rounded = parseFloat(value.toFixed(2));
    return rounded.toString();
}

/**
 * Get a random approximate language phrase
 * @param {Object} params - Parameters
 * @returns {string} Approximate phrase
 */
function getApproximatePhrase(params) {
    if (params.use_approximate_language) {
        return APPROXIMATE_PHRASES[Math.floor(Math.random() * APPROXIMATE_PHRASES.length)];
    }
    return '';
}

/**
 * Round answer to reasonable precision for Year 5
 * @param {number} value - The calculated value
 * @returns {number} Rounded value
 */
function roundToReasonablePrecision(value) {
    // For Year 5, round to nearest whole number or 1 decimal place
    if (value >= 10) {
        return Math.round(value);
    } else {
        return parseFloat(value.toFixed(1));
    }
}

/**
 * Generate an approximate conversion question (metric to imperial)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateApproximateConversionMetricToImperial(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Filter for metric→imperial conversions
    const metricToImperial = conversions.filter(c => {
        const [fromUnit] = c.split('_');
        return ['cm', 'm', 'km', 'g', 'kg', 'ml', 'l'].includes(fromUnit);
    });

    if (metricToImperial.length === 0) {
        return generateApproximateConversionImperialToMetric(params);
    }

    const conversionType = metricToImperial[Math.floor(Math.random() * metricToImperial.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const rawAnswer = convertValue(value, conversionType);
    const answer = roundToReasonablePrecision(rawAnswer);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);
    const approximatePhrase = getApproximatePhrase(params);

    const questionText = approximatePhrase
        ? `${formatNumber(value)} ${fromUnitName} is ${approximatePhrase} how many ${toUnitName}?`
        : `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName} (use approximate conversions).`;

    return {
        text: questionText,
        type: 'text_input',
        answer: formatNumber(answer),
        hint: `Remember, 1 ${UNIT_NAMES_SINGULAR[fromUnit]} ≈ ${APPROXIMATE_FACTORS[conversionType] || (1/APPROXIMATE_FACTORS[`${toUnit}_to_${fromUnit}`])} ${toUnitName}`,
        module: 'M06_Y5_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate an approximate conversion question (imperial to metric)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateApproximateConversionImperialToMetric(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Filter for imperial→metric conversions
    const imperialToMetric = conversions.filter(c => {
        const [fromUnit] = c.split('_');
        return ['inches', 'feet', 'yards', 'miles', 'ounces', 'pounds', 'stone', 'pints', 'gallons'].includes(fromUnit);
    });

    if (imperialToMetric.length === 0) {
        return generateApproximateConversionMetricToImperial(params);
    }

    const conversionType = imperialToMetric[Math.floor(Math.random() * imperialToMetric.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const rawAnswer = convertValue(value, conversionType);
    const answer = roundToReasonablePrecision(rawAnswer);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);
    const approximatePhrase = getApproximatePhrase(params);

    const questionText = approximatePhrase
        ? `${formatNumber(value)} ${fromUnitName} is ${approximatePhrase} how many ${toUnitName}?`
        : `Convert ${formatNumber(value)} ${fromUnitName} to ${toUnitName} (use approximate conversions).`;

    return {
        text: questionText,
        type: 'text_input',
        answer: formatNumber(answer),
        hint: `Remember, these are approximate conversions. Think about the relationship between ${fromUnitName} and ${toUnitName}.`,
        module: 'M06_Y5_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate a word problem with approximate conversion
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateWordProblem(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];
    const conversionType = conversions[Math.floor(Math.random() * conversions.length)];

    const [fromUnit, , toUnit] = conversionType.split('_');
    if (!fromUnit || !toUnit) {
        return generateWordProblem(params);
    }

    const value = generateValue(params, fromUnit);
    const rawAnswer = convertValue(value, conversionType);
    const answer = roundToReasonablePrecision(rawAnswer);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);
    const approximatePhrase = getApproximatePhrase(params);

    let context;
    if (measureType === 'length') {
        const contexts = [
            `A rope in the shop is labelled as ${formatNumber(value)} ${fromUnitName} long.`,
            `The height of a door is given as ${formatNumber(value)} ${fromUnitName}.`,
            `A recipe book says to roll pastry to ${formatNumber(value)} ${fromUnitName}.`,
            `The distance on a road sign shows ${formatNumber(value)} ${fromUnitName}.`
        ];
        context = contexts[Math.floor(Math.random() * contexts.length)];
    } else if (measureType === 'mass') {
        const contexts = [
            `A package weighs ${formatNumber(value)} ${fromUnitName}.`,
            `A recipe calls for ${formatNumber(value)} ${fromUnitName} of flour.`,
            `A bag of potatoes is labelled ${formatNumber(value)} ${fromUnitName}.`,
            `An athlete's weight is ${formatNumber(value)} ${fromUnitName}.`
        ];
        context = contexts[Math.floor(Math.random() * contexts.length)];
    } else { // capacity
        const contexts = [
            `A recipe needs ${formatNumber(value)} ${fromUnitName} of milk.`,
            `A water bottle holds ${formatNumber(value)} ${fromUnitName}.`,
            `A car's petrol tank holds ${formatNumber(value)} ${fromUnitName}.`,
            `A jug contains ${formatNumber(value)} ${fromUnitName} of juice.`
        ];
        context = contexts[Math.floor(Math.random() * contexts.length)];
    }

    const questionText = approximatePhrase
        ? `${context} This is ${approximatePhrase} how many ${toUnitName}?`
        : `${context} Convert this to ${toUnitName}.`;

    return {
        text: questionText,
        type: 'text_input',
        answer: formatNumber(answer),
        hint: `Use approximate conversions between ${fromUnitName} and ${toUnitName}.`,
        module: 'M06_Y5_MEAS',
        level: params.level || 3
    };
}

/**
 * Generate a comparison question (MULTIPLE CHOICE)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateComparison(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Pick a conversion to establish relationship
    const conversionType = conversions[Math.floor(Math.random() * conversions.length)];
    const [unit1, , unit2] = conversionType.split('_');

    if (!unit1 || !unit2) {
        return generateComparison(params);
    }

    // Generate two values in different units
    const value1 = generateValue(params, unit1);
    const value2 = generateValue(params, unit2);

    // Convert value1 to unit2 for comparison
    const value1Converted = convertValue(value1, conversionType);

    // Determine which is larger
    let correctAnswer;
    const tolerance = 0.1; // Small tolerance for floating point

    if (Math.abs(value1Converted - value2) < tolerance) {
        correctAnswer = 'They are approximately equal';
    } else if (value1Converted > value2) {
        correctAnswer = `${formatNumber(value1)} ${unit1}`;
    } else {
        correctAnswer = `${formatNumber(value2)} ${unit2}`;
    }

    const unit1Name = getUnitName(unit1, value1);
    const unit2Name = getUnitName(unit2, value2);

    const options = [
        `${formatNumber(value1)} ${unit1}`,
        `${formatNumber(value2)} ${unit2}`,
        'They are approximately equal'
    ];

    return {
        text: `Which is larger: ${formatNumber(value1)} ${unit1Name} or ${formatNumber(value2)} ${unit2Name}?`,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        hint: `Convert both to the same unit to compare. Remember to use approximate conversions.`,
        module: 'M06_Y5_MEAS',
        level: params.level || 3
    };
}

/**
 * Generate a multi-step question
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateMultiStep(params) {
    // Multi-step: e.g., "A person weighs 10 stone. Each stone is approximately 6.5 kg. What is their approximate weight in kg?"
    // Or: "A journey is 50 miles. If 1 mile ≈ 1.6 km, approximately how many kilometres is this?"

    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Use imperial to metric for multi-step (more natural for UK context)
    const imperialToMetric = conversions.filter(c => {
        const [fromUnit] = c.split('_');
        return ['inches', 'feet', 'yards', 'miles', 'ounces', 'pounds', 'stone', 'pints', 'gallons'].includes(fromUnit);
    });

    if (imperialToMetric.length === 0) {
        return generateWordProblem(params);
    }

    const conversionType = imperialToMetric[Math.floor(Math.random() * imperialToMetric.length)];
    const [fromUnit, , toUnit] = conversionType.split('_');

    const value = generateValue(params, fromUnit);
    const factor = APPROXIMATE_FACTORS[conversionType] || (1 / APPROXIMATE_FACTORS[`${toUnit}_to_${fromUnit}`]);
    const rawAnswer = convertValue(value, conversionType);
    const answer = roundToReasonablePrecision(rawAnswer);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);

    const questionText = `A measurement is ${formatNumber(value)} ${fromUnitName}. If 1 ${UNIT_NAMES_SINGULAR[fromUnit]} is approximately ${formatNumber(factor)} ${toUnitName}, what is the approximate measurement in ${toUnitName}?`;

    return {
        text: questionText,
        type: 'text_input',
        answer: formatNumber(answer),
        hint: `Multiply ${formatNumber(value)} by ${formatNumber(factor)} to find the approximate answer.`,
        module: 'M06_Y5_MEAS',
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

    const operations = params.operations || ['approximate_conversion_metric_to_imperial'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
        case 'approximate_conversion_metric_to_imperial':
            return generateApproximateConversionMetricToImperial(params);
        case 'approximate_conversion_imperial_to_metric':
            return generateApproximateConversionImperialToMetric(params);
        case 'word_problem':
            return generateWordProblem(params);
        case 'comparison':
            return generateComparison(params);
        case 'multi_step':
            return generateMultiStep(params);
        default:
            return generateApproximateConversionMetricToImperial(params);
    }
}

export default {
    moduleId: 'M06_Y5_MEAS',
    generate: generateQuestion
};
