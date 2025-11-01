/**
 * M05_Y5_MEAS: Convert Between Metric Units
 * Year 5 - metric unit conversions for length, mass, and capacity
 *
 * ANSWER FORMAT NOTES:
 * - All answers are numeric only (no units in the answer string)
 * - Numbers formatted without trailing zeros (2.5 not 2.50)
 * - Validator should accept:
 *   - Plain numbers: "2500", "2.5", "350000"
 *   - Numbers with commas: "2,500", "350,000" (should be normalized)
 *   - DO NOT accept units in answers (validated separately by question text)
 */

import { getRealisticValue, getObjectsForUnit, getAvailableObjects } from './helpers/contextualRanges.js';

// Conversion factors
const CONVERSION_FACTORS = {
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
    // Capacity
    l_to_ml: 1000
};

// Unit names for display
const UNIT_NAMES = {
    km: 'kilometres',
    m: 'metres',
    cm: 'centimetres',
    mm: 'millimetres',
    kg: 'kilograms',
    g: 'grams',
    mg: 'milligrams',
    l: 'litres',
    ml: 'millilitres'
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
    ml: 'millilitre'
};

/**
 * Check if a conversion is multi-step based on conversion factor magnitude
 * @param {string} conversionType - e.g., 'km_to_cm'
 * @returns {boolean} True if multi-step
 */
function isMultiStepConversion(conversionType) {
    const factor = Math.abs(CONVERSION_FACTORS[conversionType] || 0);
    // Multi-step conversions have factors >= 10000 (e.g., km→cm = 100000)
    return factor >= 10000 || (1/factor >= 10000);
}

/**
 * Get conversion factor for a conversion type
 * @param {string} conversionType - e.g., 'km_to_m', 'm_to_km'
 * @returns {number} The conversion factor
 */
function getConversionFactor(conversionType) {
    // For reverse conversions (e.g., m_to_km), we need the inverse
    if (CONVERSION_FACTORS[conversionType]) {
        return CONVERSION_FACTORS[conversionType];
    }

    // Try to find the reverse conversion
    const [fromUnit, , toUnit] = conversionType.split('_');
    const reverseType = `${toUnit}_to_${fromUnit}`;

    if (CONVERSION_FACTORS[reverseType]) {
        return 1 / CONVERSION_FACTORS[reverseType];
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
    // Handle zero specially (0 litres, not 0 litre)
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
 * Ensures no confusing tiny decimals (e.g., avoids 0.01 kg)
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

    if (valueType === 'whole_only' || valueType === 'whole') {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (valueType === 'simple_decimal') {
        // Simple decimals: X.0 or X.5 only (no confusing decimals like 0.17)
        const wholeNum = Math.floor(Math.random() * (max - min)) + min;
        const decimal = [0, 0.5][Math.floor(Math.random() * 2)];
        return wholeNum + decimal;
    } else if (valueType === 'decimal') {
        // Up to 2 decimal places, but ensure value stays >= min
        // Generate whole part, then add decimal part
        const wholeNum = Math.floor(Math.random() * (max - min)) + min;
        const decimalPart = Math.floor(Math.random() * 100) / 100; // 0.00 to 0.99
        const result = wholeNum + decimalPart;

        // Ensure result is at least min and doesn't create confusing tiny values
        if (result < min) {
            return min;
        }

        return parseFloat(result.toFixed(2));
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format a number for display (remove trailing zeros)
 * @param {number} value - The value to format
 * @returns {string} Formatted value
 */
function formatNumber(value) {
    // Handle very large numbers or floating point precision issues
    const rounded = parseFloat(value.toFixed(10));
    return rounded.toString();
}

/**
 * Generate a direct conversion question
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateDirectConversion(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Filter for only direct conversions (larger to smaller, factor >= 1)
    const directConversions = conversions.filter(c => {
        const factor = getConversionFactor(c);
        return factor >= 1;
    });

    if (directConversions.length === 0) {
        // Fallback to any conversion
        const conversionType = conversions[Math.floor(Math.random() * conversions.length)];
        const [fromUnit, , toUnit] = conversionType.split('_');
        const value = generateValue(params, fromUnit);
        const answer = convertValue(value, conversionType);

        return {
            text: `Convert ${formatNumber(value)} ${getUnitName(fromUnit, value)} to ${getUnitName(toUnit, answer)}.`,
            type: 'text_input',
            answer: formatNumber(answer),
            hint: `Think about the relationship between ${getUnitName(fromUnit, 2)} and ${getUnitName(toUnit, 2)}.`,
            module: 'M05_Y5_MEAS',
            level: params.level || 1
        };
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
        module: 'M05_Y5_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate a reverse conversion question (smaller to larger unit)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateReverseConversion(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Filter for only reverse conversions (smaller to larger, factor < 1)
    const reverseConversions = conversions.filter(c => {
        const factor = getConversionFactor(c);
        return factor < 1;
    });

    if (reverseConversions.length === 0) {
        // Fallback to direct conversion
        return generateDirectConversion(params);
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
        module: 'M05_Y5_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate a word problem with conversion
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
    const answer = convertValue(value, conversionType);

    const fromUnitName = getUnitName(fromUnit, value);
    const toUnitName = getUnitName(toUnit, answer);

    // Create context-appropriate word problems using realistic object ranges
    let context;
    if (measureType === 'length') {
        // Get objects appropriate for the unit
        const objectsForUnit = getObjectsForUnit('length', fromUnit);
        if (objectsForUnit.length > 0) {
            const object = objectsForUnit[Math.floor(Math.random() * objectsForUnit.length)];
            const realisticData = getRealisticValue(object, 'length');
            if (realisticData && realisticData.unit === fromUnit) {
                // Use realistic value instead of param-based value
                const realisticValue = realisticData.value;
                const realisticAnswer = convertValue(realisticValue, conversionType);
                context = `A ${object} measures ${formatNumber(realisticValue)} ${fromUnitName}.`;

                return {
                    text: `${context} How many ${toUnitName} is this?`,
                    type: 'text_input',
                    answer: formatNumber(realisticAnswer),
                    hint: `Convert ${fromUnitName} to ${toUnitName}.`,
                    module: 'M05_Y5_MEAS',
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
        // Get objects appropriate for the unit
        const objectsForUnit = getObjectsForUnit('mass', fromUnit);
        if (objectsForUnit.length > 0) {
            const object = objectsForUnit[Math.floor(Math.random() * objectsForUnit.length)];
            const realisticData = getRealisticValue(object, 'mass');
            if (realisticData && realisticData.unit === fromUnit) {
                // Use realistic value instead of param-based value
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
                    module: 'M05_Y5_MEAS',
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
        // Get objects appropriate for the unit
        const objectsForUnit = getObjectsForUnit('capacity', fromUnit);
        if (objectsForUnit.length > 0) {
            const object = objectsForUnit[Math.floor(Math.random() * objectsForUnit.length)];
            const realisticData = getRealisticValue(object, 'capacity');
            if (realisticData && realisticData.unit === fromUnit) {
                // Use realistic value instead of param-based value
                const realisticValue = realisticData.value;
                const realisticAnswer = convertValue(realisticValue, conversionType);
                const article = ['a', 'e', 'i', 'o', 'u'].includes(object.charAt(0).toLowerCase()) ? 'an' : 'a';
                context = `A ${object} holds ${formatNumber(realisticValue)} ${fromUnitName}.`;

                return {
                    text: `${context} How many ${toUnitName} is this?`,
                    type: 'text_input',
                    answer: formatNumber(realisticAnswer),
                    hint: `Convert ${fromUnitName} to ${toUnitName}.`,
                    module: 'M05_Y5_MEAS',
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
        module: 'M05_Y5_MEAS',
        level: params.level || 3
    };
}

/**
 * Generate a comparison question (MULTIPLE CHOICE to avoid ambiguous answers)
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateComparison(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Pick a conversion type
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

    // Determine which is larger, smaller, or equal
    let correctAnswer;
    const tolerance = 0.0001; // For floating point comparison

    if (Math.abs(value1Converted - value2) < tolerance) {
        correctAnswer = 'They are equal';
    } else if (value1Converted > value2) {
        correctAnswer = `${formatNumber(value1)} ${unit1}`;
    } else {
        correctAnswer = `${formatNumber(value2)} ${unit2}`;
    }

    const unit1Name = getUnitName(unit1, value1);
    const unit2Name = getUnitName(unit2, value2);

    // Create multiple choice options
    const options = [
        `${formatNumber(value1)} ${unit1}`,
        `${formatNumber(value2)} ${unit2}`,
        'They are equal'
    ];

    return {
        text: `Which is larger: ${formatNumber(value1)} ${unit1Name} or ${formatNumber(value2)} ${unit2Name}?`,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        hint: `Convert both measurements to the same unit to compare them.`,
        module: 'M05_Y5_MEAS',
        level: params.level || 3
    };
}

/**
 * Generate a multi-step conversion question
 * @param {Object} params - Parameters
 * @returns {Object} Question object
 */
function generateMultiStep(params) {
    const measureType = params.measure_types[Math.floor(Math.random() * params.measure_types.length)];
    const conversions = params.conversions[measureType];

    // Filter for multi-step conversions using the helper function
    const multiStepConversions = conversions.filter(c => isMultiStepConversion(c));

    if (multiStepConversions.length === 0) {
        // Fall back to a regular direct conversion
        return generateDirectConversion(params);
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
        answer: formatNumber(answer),
        hint: `This is a multi-step conversion. Think about the intermediate unit you might need.`,
        module: 'M05_Y5_MEAS',
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

    const operations = params.operations || ['direct_conversion'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
        case 'direct_conversion':
            return generateDirectConversion(params);
        case 'reverse_conversion':
            return generateReverseConversion(params);
        case 'word_problem':
            return generateWordProblem(params);
        case 'comparison':
            return generateComparison(params);
        case 'multi_step':
            return generateMultiStep(params);
        default:
            return generateDirectConversion(params);
    }
}

export default {
    moduleId: 'M05_Y5_MEAS',
    generate: generateQuestion
};
