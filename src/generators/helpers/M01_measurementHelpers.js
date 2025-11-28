/**
 * M01 Measurement Comparison Helper Functions
 *
 * Utilities for generating measurement comparison questions
 */

import {
    currency,
    length,
    mass,
    capacity,
    format as i18nFormat,
    DEFAULT_LOCALE
} from '../../i18n/index.js';

/**
 * Select a random element from an array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Conversion factors for measurement units
 */
export const CONVERSIONS = {
    // Length
    km_to_m: 1000,
    m_to_cm: 100,
    cm_to_mm: 10,
    km_to_cm: 100000,
    m_to_mm: 1000,

    // Mass
    kg_to_g: 1000,

    // Capacity
    l_to_ml: 1000,

    // Money
    pounds_to_pence: 100
};

/**
 * Convert a measurement to base units (smallest unit)
 * @param {number} value - The measurement value
 * @param {string} unit - The unit type
 * @param {string} measureType - Type of measurement (length, mass, capacity, money)
 * @returns {number} Value in base units
 */
export function toBaseUnits(value, unit, measureType) {
    switch (measureType) {
        case 'length':
            switch (unit) {
                case 'km': return value * 1000 * 100 * 10; // to mm
                case 'm': return value * 100 * 10; // to mm
                case 'cm': return value * 10; // to mm
                case 'mm': return value;
                default: return value;
            }
        case 'mass':
            switch (unit) {
                case 'kg': return value * 1000; // to g
                case 'g': return value;
                default: return value;
            }
        case 'capacity':
            switch (unit) {
                case 'l': return value * 1000; // to ml
                case 'ml': return value;
                default: return value;
            }
        case 'money':
            switch (unit) {
                case 'pounds': return value * 100; // to pence
                case 'pence': return value;
                default: return value;
            }
        default:
            return value;
    }
}

/**
 * Generate a measurement value in specified unit
 * @param {string} unit - Unit type (e.g., 'm', 'kg', 'pounds_decimal')
 * @param {Object} ranges - Ranges object from parameters
 * @param {string} measureType - Type of measurement (length, mass, capacity, money)
 * @param {string} [locale=DEFAULT_LOCALE] - Locale for display text generation
 * @returns {Object} { value, unit, displayUnit, measureType, baseValue, typed, displayText }
 */
export function generateMeasurement(unit, ranges, measureType, locale = DEFAULT_LOCALE) {
    let value, displayUnit, baseValue, typed;

    // Handle mixed notation units
    if (unit === 'mixed_m_cm') {
        const meters = randomInt(1, 5);
        const centimeters = randomInt(0, 99);
        baseValue = toBaseUnits(meters, 'm', 'length') + toBaseUnits(centimeters, 'cm', 'length');
        typed = length(baseValue, 'mixed_m_cm');
        return {
            value: { whole: meters, part: centimeters },
            unit: 'mixed_m_cm',
            displayUnit: 'm and cm',
            baseValue,
            measureType: 'length',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_kg_g') {
        const kilograms = randomInt(1, 5);
        const grams = randomInt(0, 999);
        baseValue = toBaseUnits(kilograms, 'kg', 'mass') + toBaseUnits(grams, 'g', 'mass');
        typed = mass(baseValue, 'mixed_kg_g');
        return {
            value: { whole: kilograms, part: grams },
            unit: 'mixed_kg_g',
            displayUnit: 'kg and g',
            baseValue,
            measureType: 'mass',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_l_ml') {
        const litres = randomInt(1, 5);
        const millilitres = randomInt(0, 999);
        baseValue = toBaseUnits(litres, 'l', 'capacity') + toBaseUnits(millilitres, 'ml', 'capacity');
        typed = capacity(baseValue, 'mixed_l_ml');
        return {
            value: { whole: litres, part: millilitres },
            unit: 'mixed_l_ml',
            displayUnit: 'l and ml',
            baseValue,
            measureType: 'capacity',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_pounds_pence') {
        const pounds = randomInt(1, 10);
        const pence = randomInt(0, 99);
        baseValue = toBaseUnits(pounds, 'pounds', 'money') + toBaseUnits(pence, 'pence', 'money');
        typed = currency(baseValue, 'mixed');
        return {
            value: { whole: pounds, part: pence },
            unit: 'mixed_pounds_pence',
            displayUnit: '£ and p',
            baseValue,
            measureType: 'money',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_km_m') {
        const kilometres = randomInt(1, 10);
        const metres = randomInt(0, 999);
        baseValue = toBaseUnits(kilometres, 'km', 'length') + toBaseUnits(metres, 'm', 'length');
        typed = length(baseValue, 'mixed_km_m');
        return {
            value: { whole: kilometres, part: metres },
            unit: 'mixed_km_m',
            displayUnit: 'km and m',
            baseValue,
            measureType: 'length',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    // Handle pounds_decimal specially
    if (unit === 'pounds_decimal') {
        const pounds = randomInt(ranges.pounds.min, ranges.pounds.max);
        const pence = randomInt(0, 99);
        value = pounds + (pence / 100);
        displayUnit = '£';
        baseValue = Math.round(value * 100); // Convert to pence
        typed = currency(baseValue, 'major');
        return {
            value,
            unit: 'pounds',
            displayUnit,
            baseValue,
            measureType: 'money',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    // Handle pence
    if (unit === 'pence') {
        value = randomInt(ranges.pence.min, ranges.pence.max);
        displayUnit = 'p';
        baseValue = value;
        typed = currency(baseValue, 'minor');
        return {
            value,
            unit: 'pence',
            displayUnit,
            baseValue,
            measureType: 'money',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    // Standard units
    const range = ranges[unit];
    if (!range) {
        throw new Error(`No range defined for unit: ${unit}`);
    }

    value = randomInt(range.min, range.max);
    displayUnit = unit;
    baseValue = toBaseUnits(value, unit, measureType);

    // Create typed value based on measure type
    switch (measureType) {
        case 'length':
            typed = length(baseValue, unit);
            break;
        case 'mass':
            typed = mass(baseValue, unit);
            break;
        case 'capacity':
            typed = capacity(baseValue, unit);
            break;
        default:
            typed = { _v: baseValue, _t: measureType, _d: unit };
    }

    return {
        value,
        unit,
        displayUnit,
        baseValue,
        measureType,
        typed,
        displayText: i18nFormat(typed, locale)
    };
}

/**
 * Generate two measurements for comparison
 * @param {string} measureType - Type of measurement
 * @param {Object} mathParams - Math parameters
 * @param {string} [locale=DEFAULT_LOCALE] - Locale for display text generation
 * @returns {Object[]} Array of two measurement objects
 */
export function generateComparisonPair(measureType, mathParams, locale = DEFAULT_LOCALE) {
    const { units, ranges, comparisonType } = mathParams;
    const availableUnits = units[measureType];

    if (!availableUnits || availableUnits.length === 0) {
        throw new Error(`No units available for measure type: ${measureType}`);
    }

    let unit1, unit2, measure1, measure2;

    if (comparisonType === 'same_unit') {
        // Both measurements use the same unit
        unit1 = randomChoice(availableUnits.filter(u => !u.startsWith('mixed_')));
        unit2 = unit1;

        measure1 = generateMeasurement(unit1, ranges, measureType, locale);
        measure2 = generateMeasurement(unit2, ranges, measureType, locale);

        // Ensure they're different
        let attempts = 0;
        while (measure1.baseValue === measure2.baseValue && attempts < 10) {
            measure2 = generateMeasurement(unit2, ranges, measureType, locale);
            attempts++;
        }
    } else if (comparisonType === 'simple_conversion') {
        // Use different but related units (e.g., kg vs g)
        const unitPairs = getSimpleConversionPairs(measureType, availableUnits);
        if (unitPairs.length > 0) {
            const pair = randomChoice(unitPairs);
            unit1 = pair[0];
            unit2 = pair[1];

            measure1 = generateMeasurement(unit1, ranges, measureType, locale);
            measure2 = generateMeasurement(unit2, ranges, measureType, locale);
        } else {
            // Fallback to same unit
            unit1 = randomChoice(availableUnits.filter(u => !u.startsWith('mixed_')));
            measure1 = generateMeasurement(unit1, ranges, measureType, locale);
            measure2 = generateMeasurement(unit1, ranges, measureType, locale);
        }
    } else {
        // Mixed notation - can use any units including mixed
        unit1 = randomChoice(availableUnits);
        unit2 = randomChoice(availableUnits);

        measure1 = generateMeasurement(unit1, ranges, measureType, locale);
        measure2 = generateMeasurement(unit2, ranges, measureType, locale);
    }

    return [measure1, measure2];
}

/**
 * Get pairs of units suitable for simple conversion questions
 * @param {string} measureType - Type of measurement
 * @param {string[]} availableUnits - Available units
 * @returns {Array[]} Array of unit pairs
 */
function getSimpleConversionPairs(measureType, availableUnits) {
    const pairs = [];

    if (measureType === 'length') {
        if (availableUnits.includes('km') && availableUnits.includes('m')) {
            pairs.push(['km', 'm']);
        }
        if (availableUnits.includes('m') && availableUnits.includes('cm')) {
            pairs.push(['m', 'cm']);
        }
        if (availableUnits.includes('cm') && availableUnits.includes('mm')) {
            pairs.push(['cm', 'mm']);
        }
    } else if (measureType === 'mass') {
        if (availableUnits.includes('kg') && availableUnits.includes('g')) {
            pairs.push(['kg', 'g']);
        }
    } else if (measureType === 'capacity') {
        if (availableUnits.includes('l') && availableUnits.includes('ml')) {
            pairs.push(['l', 'ml']);
        }
    } else if (measureType === 'money') {
        if (availableUnits.includes('pounds_decimal') && availableUnits.includes('pence')) {
            pairs.push(['pounds_decimal', 'pence']);
        }
    }

    return pairs;
}

/**
 * Generate multiple measurements for ordering
 * @param {string} measureType - Type of measurement
 * @param {Object} mathParams - Math parameters
 * @param {number} count - Number of measurements to generate
 * @param {string} [locale=DEFAULT_LOCALE] - Locale for display text generation
 * @returns {Object[]} Array of measurement objects
 */
export function generateMeasurementsForOrdering(measureType, mathParams, count, locale = DEFAULT_LOCALE) {
    const { units, ranges, comparisonType } = mathParams;
    const availableUnits = units[measureType];

    const measurements = [];

    // For Level 1-2, use mostly same unit
    if (comparisonType === 'same_unit') {
        const unit = randomChoice(availableUnits.filter(u => !u.startsWith('mixed_')));
        for (let i = 0; i < count; i++) {
            measurements.push(generateMeasurement(unit, ranges, measureType, locale));
        }
    } else {
        // Mix units
        for (let i = 0; i < count; i++) {
            const unit = randomChoice(availableUnits);
            measurements.push(generateMeasurement(unit, ranges, measureType, locale));
        }
    }

    // Ensure all measurements are different
    const baseValues = new Set();
    const uniqueMeasurements = [];

    for (const m of measurements) {
        if (!baseValues.has(m.baseValue)) {
            baseValues.add(m.baseValue);
            uniqueMeasurements.push(m);
        }
    }

    // If we don't have enough unique measurements, generate more
    while (uniqueMeasurements.length < count) {
        const unit = randomChoice(availableUnits);
        const newMeasure = generateMeasurement(unit, ranges, measureType, locale);
        if (!baseValues.has(newMeasure.baseValue)) {
            baseValues.add(newMeasure.baseValue);
            uniqueMeasurements.push(newMeasure);
        }
    }

    return uniqueMeasurements.slice(0, count);
}

/**
 * Compare two measurements
 * @param {Object} measure1 - First measurement
 * @param {Object} measure2 - Second measurement
 * @returns {string} 'greater', 'smaller', or 'equal'
 */
export function compareMeasurements(measure1, measure2) {
    if (measure1.baseValue > measure2.baseValue) {
        return 'greater';
    } else if (measure1.baseValue < measure2.baseValue) {
        return 'smaller';
    } else {
        return 'equal';
    }
}

/**
 * Sort measurements by value
 * @param {Object[]} measurements - Array of measurements
 * @param {string} order - 'ascending' or 'descending'
 * @returns {Object[]} Sorted measurements
 */
export function sortMeasurements(measurements, order = 'ascending') {
    const sorted = [...measurements].sort((a, b) => a.baseValue - b.baseValue);
    return order === 'descending' ? sorted.reverse() : sorted;
}

/**
 * Find equivalent measurements in a set
 * @param {Object[]} measurements - Array of measurements
 * @returns {number[]} Indices of equivalent measurements (or empty if none)
 */
export function findEquivalentMeasurements(measurements) {
    for (let i = 0; i < measurements.length; i++) {
        for (let j = i + 1; j < measurements.length; j++) {
            if (measurements[i].baseValue === measurements[j].baseValue) {
                return [i, j];
            }
        }
    }
    return [];
}

/**
 * Generate an equivalent measurement to a given one
 * @param {Object} measurement - Source measurement
 * @param {string[]} availableUnits - Available units to use
 * @param {Object} ranges - Ranges object
 * @param {string} [locale=DEFAULT_LOCALE] - Locale for display text generation
 * @returns {Object} Equivalent measurement in different notation
 */
export function generateEquivalentMeasurement(measurement, availableUnits, ranges, locale = DEFAULT_LOCALE) {
    const { baseValue, measureType } = measurement;

    // Try to find a different unit that can represent the same value
    for (const unit of availableUnits) {
        if (unit === measurement.unit) continue;

        // For simple conversions, check if the value can be represented exactly
        if (measureType === 'money') {
            if (unit === 'pence' && measurement.unit === 'pounds') {
                const penceValue = baseValue;
                const typed = currency(penceValue, 'minor');
                return {
                    value: penceValue,
                    unit: 'pence',
                    displayUnit: 'p',
                    baseValue: penceValue,
                    measureType: 'money',
                    typed,
                    displayText: i18nFormat(typed, locale)
                };
            }
            if (unit === 'pounds_decimal' && measurement.unit === 'pence') {
                const typed = currency(baseValue, 'major');
                return {
                    value: baseValue / 100,
                    unit: 'pounds',
                    displayUnit: '£',
                    baseValue: baseValue,
                    measureType: 'money',
                    typed,
                    displayText: i18nFormat(typed, locale)
                };
            }
        }
    }

    // If no exact equivalent found, return the original
    return measurement;
}
