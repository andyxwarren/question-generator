/**
 * M01 Measurement Comparison Helper Functions
 *
 * Utilities for generating measurement comparison questions
 * Supports both metric and imperial measurement systems
 */

import {
    currency,
    length,
    mass,
    capacity,
    format as i18nFormat,
    DEFAULT_LOCALE
} from '../../i18n/index.js';
import { getMeasurementSystem } from '../../curriculum/parameterResolver.js';

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
    // Metric - Length
    km_to_m: 1000,
    m_to_cm: 100,
    cm_to_mm: 10,
    km_to_cm: 100000,
    m_to_mm: 1000,

    // Metric - Mass
    kg_to_g: 1000,

    // Metric - Capacity
    l_to_ml: 1000,

    // Imperial - Length
    mi_to_yd: 1760,
    yd_to_ft: 3,
    ft_to_in: 12,
    mi_to_ft: 5280,
    yd_to_in: 36,
    mi_to_in: 63360,

    // Imperial - Mass
    lb_to_oz: 16,

    // Imperial - Capacity
    gal_to_qt: 4,
    qt_to_pt: 2,
    pt_to_cup: 2,
    cup_to_fl_oz: 8,
    gal_to_pt: 8,
    gal_to_cup: 16,
    gal_to_fl_oz: 128,
    pt_to_fl_oz: 16,

    // Money (universal)
    major_to_minor: 100
};

/**
 * Convert a measurement to base units (smallest unit)
 * Metric: mm (length), g (mass), ml (capacity)
 * Imperial: in (length), oz (mass), fl_oz (capacity)
 *
 * @param {number} value - The measurement value
 * @param {string} unit - The unit type
 * @param {string} measureType - Type of measurement (length, mass, capacity, money)
 * @param {string} [system='metric'] - Measurement system ('metric' or 'imperial')
 * @returns {number} Value in base units
 */
export function toBaseUnits(value, unit, measureType, system = 'metric') {
    switch (measureType) {
        case 'length':
            if (system === 'imperial') {
                // Imperial: convert to inches
                switch (unit) {
                    case 'mi': return value * 63360; // to inches
                    case 'yd': return value * 36; // to inches
                    case 'ft': return value * 12; // to inches
                    case 'in': return value;
                    default: return value;
                }
            } else {
                // Metric: convert to mm
                switch (unit) {
                    case 'km': return value * 1000000; // to mm
                    case 'm': return value * 1000; // to mm
                    case 'cm': return value * 10; // to mm
                    case 'mm': return value;
                    default: return value;
                }
            }
        case 'mass':
            if (system === 'imperial') {
                // Imperial: convert to ounces
                switch (unit) {
                    case 'lb': return value * 16; // to oz
                    case 'oz': return value;
                    default: return value;
                }
            } else {
                // Metric: convert to g
                switch (unit) {
                    case 'kg': return value * 1000; // to g
                    case 'g': return value;
                    default: return value;
                }
            }
        case 'capacity':
            if (system === 'imperial') {
                // Imperial: convert to fluid ounces
                switch (unit) {
                    case 'gal': return value * 128; // to fl_oz
                    case 'qt': return value * 32; // to fl_oz
                    case 'pt': return value * 16; // to fl_oz
                    case 'cup': return value * 8; // to fl_oz
                    case 'fl_oz': return value;
                    default: return value;
                }
            } else {
                // Metric: convert to ml
                switch (unit) {
                    case 'l': return value * 1000; // to ml
                    case 'ml': return value;
                    default: return value;
                }
            }
        case 'money':
            switch (unit) {
                case 'major': return value * 100; // to minor units
                case 'minor': return value;
                // Legacy support
                case 'pounds': return value * 100;
                case 'pence': return value;
                default: return value;
            }
        default:
            return value;
    }
}

/**
 * Generate a measurement value in specified unit
 * @param {string} unit - Unit type (e.g., 'm', 'kg', 'ft', 'lb')
 * @param {Object} ranges - Ranges object from parameters
 * @param {string} measureType - Type of measurement (length, mass, capacity, money)
 * @param {string} [locale=DEFAULT_LOCALE] - Locale for display text generation
 * @param {string} [system='metric'] - Measurement system ('metric' or 'imperial')
 * @returns {Object} { value, unit, displayUnit, measureType, baseValue, typed, displayText }
 */
export function generateMeasurement(unit, ranges, measureType, locale = DEFAULT_LOCALE, system = 'metric') {
    let value, displayUnit, baseValue, typed;

    // ============ METRIC MIXED NOTATIONS ============
    if (unit === 'mixed_m_cm') {
        const meters = randomInt(1, 5);
        const centimeters = randomInt(0, 99);
        baseValue = toBaseUnits(meters, 'm', 'length', 'metric') + toBaseUnits(centimeters, 'cm', 'length', 'metric');
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
        baseValue = toBaseUnits(kilograms, 'kg', 'mass', 'metric') + toBaseUnits(grams, 'g', 'mass', 'metric');
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
        baseValue = toBaseUnits(litres, 'l', 'capacity', 'metric') + toBaseUnits(millilitres, 'ml', 'capacity', 'metric');
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

    if (unit === 'mixed_km_m') {
        const kilometres = randomInt(1, 10);
        const metres = randomInt(0, 999);
        baseValue = toBaseUnits(kilometres, 'km', 'length', 'metric') + toBaseUnits(metres, 'm', 'length', 'metric');
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

    // ============ IMPERIAL MIXED NOTATIONS ============
    if (unit === 'mixed_ft_in') {
        const feet = randomInt(1, 10);
        const inches = randomInt(0, 11);
        baseValue = toBaseUnits(feet, 'ft', 'length', 'imperial') + toBaseUnits(inches, 'in', 'length', 'imperial');
        typed = length(baseValue, 'mixed_ft_in');
        typed._s = 'imperial';
        return {
            value: { whole: feet, part: inches },
            unit: 'mixed_ft_in',
            displayUnit: 'ft and in',
            baseValue,
            measureType: 'length',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_yd_ft') {
        const yards = randomInt(1, 10);
        const feet = randomInt(0, 2);
        baseValue = toBaseUnits(yards, 'yd', 'length', 'imperial') + toBaseUnits(feet, 'ft', 'length', 'imperial');
        typed = length(baseValue, 'mixed_yd_ft');
        typed._s = 'imperial';
        return {
            value: { whole: yards, part: feet },
            unit: 'mixed_yd_ft',
            displayUnit: 'yd and ft',
            baseValue,
            measureType: 'length',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_mi_yd') {
        const miles = randomInt(1, 5);
        const yards = randomInt(0, 100);
        baseValue = toBaseUnits(miles, 'mi', 'length', 'imperial') + toBaseUnits(yards, 'yd', 'length', 'imperial');
        typed = length(baseValue, 'mixed_mi_yd');
        typed._s = 'imperial';
        return {
            value: { whole: miles, part: yards },
            unit: 'mixed_mi_yd',
            displayUnit: 'mi and yd',
            baseValue,
            measureType: 'length',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_lb_oz') {
        const pounds = randomInt(1, 10);
        const ounces = randomInt(0, 15);
        baseValue = toBaseUnits(pounds, 'lb', 'mass', 'imperial') + toBaseUnits(ounces, 'oz', 'mass', 'imperial');
        typed = mass(baseValue, 'mixed_lb_oz');
        typed._s = 'imperial';
        return {
            value: { whole: pounds, part: ounces },
            unit: 'mixed_lb_oz',
            displayUnit: 'lb and oz',
            baseValue,
            measureType: 'mass',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_gal_qt') {
        const gallons = randomInt(1, 5);
        const quarts = randomInt(0, 3);
        baseValue = toBaseUnits(gallons, 'gal', 'capacity', 'imperial') + toBaseUnits(quarts, 'qt', 'capacity', 'imperial');
        typed = capacity(baseValue, 'mixed_gal_qt');
        typed._s = 'imperial';
        return {
            value: { whole: gallons, part: quarts },
            unit: 'mixed_gal_qt',
            displayUnit: 'gal and qt',
            baseValue,
            measureType: 'capacity',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'mixed_pt_cup') {
        const pints = randomInt(1, 5);
        const cups = randomInt(0, 1);
        baseValue = toBaseUnits(pints, 'pt', 'capacity', 'imperial') + toBaseUnits(cups, 'cup', 'capacity', 'imperial');
        typed = capacity(baseValue, 'mixed_pt_cup');
        typed._s = 'imperial';
        return {
            value: { whole: pints, part: cups },
            unit: 'mixed_pt_cup',
            displayUnit: 'pt and cup',
            baseValue,
            measureType: 'capacity',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    // ============ MONEY (universal) ============
    if (unit === 'mixed' || unit === 'mixed_pounds_pence') {
        const major = randomInt(1, 10);
        const minor = randomInt(0, 99);
        baseValue = toBaseUnits(major, 'major', 'money') + toBaseUnits(minor, 'minor', 'money');
        typed = currency(baseValue, 'mixed');
        return {
            value: { whole: major, part: minor },
            unit: 'mixed',
            displayUnit: 'mixed',
            baseValue,
            measureType: 'money',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'major' || unit === 'pounds_decimal') {
        const majorRange = ranges.major || ranges.pounds || { min: 1, max: 10 };
        const majorVal = randomInt(majorRange.min, majorRange.max);
        const minorVal = randomInt(0, 99);
        value = majorVal + (minorVal / 100);
        displayUnit = 'major';
        baseValue = Math.round(value * 100); // Convert to minor units
        typed = currency(baseValue, 'major');
        return {
            value,
            unit: 'major',
            displayUnit,
            baseValue,
            measureType: 'money',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    if (unit === 'minor' || unit === 'pence') {
        const minorRange = ranges.minor || ranges.pence || { min: 50, max: 500 };
        value = randomInt(minorRange.min, minorRange.max);
        displayUnit = 'minor';
        baseValue = value;
        typed = currency(baseValue, 'minor');
        return {
            value,
            unit: 'minor',
            displayUnit,
            baseValue,
            measureType: 'money',
            typed,
            displayText: i18nFormat(typed, locale)
        };
    }

    // ============ STANDARD UNITS ============
    const range = ranges[unit];
    if (!range) {
        throw new Error(`No range defined for unit: ${unit}`);
    }

    value = randomInt(range.min, range.max);
    displayUnit = unit;
    baseValue = toBaseUnits(value, unit, measureType, system);

    // Create typed value based on measure type
    // Detect if this is an imperial unit
    const imperialLengthUnits = ['in', 'ft', 'yd', 'mi'];
    const imperialMassUnits = ['oz', 'lb'];
    const imperialCapacityUnits = ['fl_oz', 'cup', 'pt', 'qt', 'gal'];
    const isImperial =
        imperialLengthUnits.includes(unit) ||
        imperialMassUnits.includes(unit) ||
        imperialCapacityUnits.includes(unit);

    switch (measureType) {
        case 'length':
            typed = length(baseValue, unit);
            if (isImperial) typed._s = 'imperial';
            break;
        case 'mass':
            typed = mass(baseValue, unit);
            if (isImperial) typed._s = 'imperial';
            break;
        case 'capacity':
            typed = capacity(baseValue, unit);
            if (isImperial) typed._s = 'imperial';
            break;
        default:
            typed = { _v: baseValue, _t: measureType, _d: unit };
            if (isImperial) typed._s = 'imperial';
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
 * @param {string} [system='metric'] - Measurement system ('metric' or 'imperial')
 * @returns {Object[]} Array of two measurement objects
 */
export function generateComparisonPair(measureType, mathParams, locale = DEFAULT_LOCALE, system = 'metric') {
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

        measure1 = generateMeasurement(unit1, ranges, measureType, locale, system);
        measure2 = generateMeasurement(unit2, ranges, measureType, locale, system);

        // Ensure they're different
        let attempts = 0;
        while (measure1.baseValue === measure2.baseValue && attempts < 10) {
            measure2 = generateMeasurement(unit2, ranges, measureType, locale, system);
            attempts++;
        }
    } else if (comparisonType === 'simple_conversion') {
        // Use different but related units (e.g., kg vs g)
        const unitPairs = getSimpleConversionPairs(measureType, availableUnits);
        if (unitPairs.length > 0) {
            const pair = randomChoice(unitPairs);
            unit1 = pair[0];
            unit2 = pair[1];

            measure1 = generateMeasurement(unit1, ranges, measureType, locale, system);
            measure2 = generateMeasurement(unit2, ranges, measureType, locale, system);
        } else {
            // Fallback to same unit
            unit1 = randomChoice(availableUnits.filter(u => !u.startsWith('mixed_')));
            measure1 = generateMeasurement(unit1, ranges, measureType, locale, system);
            measure2 = generateMeasurement(unit1, ranges, measureType, locale, system);
        }
    } else {
        // Mixed notation - can use any units including mixed
        unit1 = randomChoice(availableUnits);
        unit2 = randomChoice(availableUnits);

        measure1 = generateMeasurement(unit1, ranges, measureType, locale, system);
        measure2 = generateMeasurement(unit2, ranges, measureType, locale, system);
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
        // Metric pairs
        if (availableUnits.includes('km') && availableUnits.includes('m')) {
            pairs.push(['km', 'm']);
        }
        if (availableUnits.includes('m') && availableUnits.includes('cm')) {
            pairs.push(['m', 'cm']);
        }
        if (availableUnits.includes('cm') && availableUnits.includes('mm')) {
            pairs.push(['cm', 'mm']);
        }
        // Imperial pairs
        if (availableUnits.includes('mi') && availableUnits.includes('yd')) {
            pairs.push(['mi', 'yd']);
        }
        if (availableUnits.includes('yd') && availableUnits.includes('ft')) {
            pairs.push(['yd', 'ft']);
        }
        if (availableUnits.includes('ft') && availableUnits.includes('in')) {
            pairs.push(['ft', 'in']);
        }
    } else if (measureType === 'mass') {
        // Metric pairs
        if (availableUnits.includes('kg') && availableUnits.includes('g')) {
            pairs.push(['kg', 'g']);
        }
        // Imperial pairs
        if (availableUnits.includes('lb') && availableUnits.includes('oz')) {
            pairs.push(['lb', 'oz']);
        }
    } else if (measureType === 'capacity') {
        // Metric pairs
        if (availableUnits.includes('l') && availableUnits.includes('ml')) {
            pairs.push(['l', 'ml']);
        }
        // Imperial pairs
        if (availableUnits.includes('gal') && availableUnits.includes('qt')) {
            pairs.push(['gal', 'qt']);
        }
        if (availableUnits.includes('qt') && availableUnits.includes('pt')) {
            pairs.push(['qt', 'pt']);
        }
        if (availableUnits.includes('pt') && availableUnits.includes('cup')) {
            pairs.push(['pt', 'cup']);
        }
        if (availableUnits.includes('cup') && availableUnits.includes('fl_oz')) {
            pairs.push(['cup', 'fl_oz']);
        }
    } else if (measureType === 'money') {
        // Universal money pairs
        if (availableUnits.includes('major') && availableUnits.includes('minor')) {
            pairs.push(['major', 'minor']);
        }
        // Legacy support
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
 * @param {string} [system='metric'] - Measurement system ('metric' or 'imperial')
 * @returns {Object[]} Array of measurement objects
 */
export function generateMeasurementsForOrdering(measureType, mathParams, count, locale = DEFAULT_LOCALE, system = 'metric') {
    const { units, ranges, comparisonType } = mathParams;
    const availableUnits = units[measureType];

    const measurements = [];

    // For Level 1-2, use mostly same unit
    if (comparisonType === 'same_unit') {
        const unit = randomChoice(availableUnits.filter(u => !u.startsWith('mixed_')));
        for (let i = 0; i < count; i++) {
            measurements.push(generateMeasurement(unit, ranges, measureType, locale, system));
        }
    } else {
        // Mix units
        for (let i = 0; i < count; i++) {
            const unit = randomChoice(availableUnits);
            measurements.push(generateMeasurement(unit, ranges, measureType, locale, system));
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
        const newMeasure = generateMeasurement(unit, ranges, measureType, locale, system);
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
