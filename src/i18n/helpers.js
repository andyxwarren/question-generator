/**
 * i18n Helper Functions
 *
 * Factory functions for creating typed value objects.
 * These make it easy to create properly structured typed values.
 */

import { toBaseUnits, VALUE_TYPES } from './types.js';

/**
 * Create a currency typed value
 * @param {number} amount - Amount in minor units (pence/cents)
 * @param {string} displayAs - Display hint: 'major', 'minor', 'mixed'
 * @returns {object} Typed value object
 */
export function currency(amount, displayAs = 'major') {
    return { _v: amount, _t: 'currency', _d: displayAs };
}

/**
 * Create a currency typed value from major units
 * @param {number} majorAmount - Amount in major units (pounds/dollars)
 * @param {string} displayAs - Display hint
 * @returns {object} Typed value object
 */
export function currencyMajor(majorAmount, displayAs = 'major') {
    return { _v: Math.round(majorAmount * 100), _t: 'currency', _d: displayAs };
}

/**
 * Create a length typed value
 * @param {number} mm - Length in millimeters
 * @param {string} displayAs - Display hint: 'mm', 'cm', 'm', 'km', 'mixed_m_cm', 'mixed_km_m'
 * @returns {object} Typed value object
 */
export function length(mm, displayAs = 'mm') {
    return { _v: mm, _t: 'length', _d: displayAs };
}

/**
 * Create a length typed value from a specific unit
 * @param {number} value - Length value
 * @param {string} unit - Source unit: 'mm', 'cm', 'm', 'km'
 * @param {string} displayAs - Display hint
 * @returns {object} Typed value object
 */
export function lengthFrom(value, unit, displayAs = unit) {
    const mm = toBaseUnits(value, 'length', unit);
    return { _v: mm, _t: 'length', _d: displayAs };
}

/**
 * Create a mass typed value
 * @param {number} g - Mass in grams
 * @param {string} displayAs - Display hint: 'g', 'kg', 'mixed_kg_g'
 * @returns {object} Typed value object
 */
export function mass(g, displayAs = 'g') {
    return { _v: g, _t: 'mass', _d: displayAs };
}

/**
 * Create a mass typed value from a specific unit
 * @param {number} value - Mass value
 * @param {string} unit - Source unit: 'g', 'kg'
 * @param {string} displayAs - Display hint
 * @returns {object} Typed value object
 */
export function massFrom(value, unit, displayAs = unit) {
    const g = toBaseUnits(value, 'mass', unit);
    return { _v: g, _t: 'mass', _d: displayAs };
}

/**
 * Create a capacity typed value
 * @param {number} ml - Capacity in milliliters
 * @param {string} displayAs - Display hint: 'ml', 'l', 'mixed_l_ml'
 * @returns {object} Typed value object
 */
export function capacity(ml, displayAs = 'ml') {
    return { _v: ml, _t: 'capacity', _d: displayAs };
}

/**
 * Create a capacity typed value from a specific unit
 * @param {number} value - Capacity value
 * @param {string} unit - Source unit: 'ml', 'l'
 * @param {string} displayAs - Display hint
 * @returns {object} Typed value object
 */
export function capacityFrom(value, unit, displayAs = unit) {
    const ml = toBaseUnits(value, 'capacity', unit);
    return { _v: ml, _t: 'capacity', _d: displayAs };
}

/**
 * Create a fraction typed value
 * @param {number} numerator - Numerator
 * @param {number} denominator - Denominator
 * @param {string} displayAs - Display hint: 'numeric', 'words'
 * @returns {object} Typed value object
 */
export function fraction(numerator, denominator, displayAs = 'numeric') {
    return { _v: { n: numerator, d: denominator }, _t: 'fraction', _d: displayAs };
}

/**
 * Create an integer typed value
 * @param {number} value - Integer value
 * @param {string} displayAs - Display hint: 'plain', 'ordinal'
 * @returns {object} Typed value object
 */
export function integer(value, displayAs = 'plain') {
    return { _v: value, _t: 'integer', _d: displayAs };
}

/**
 * Create a decimal typed value
 * @param {number} value - Decimal value
 * @param {string} displayAs - Display hint: 'plain'
 * @returns {object} Typed value object
 */
export function decimal(value, displayAs = 'plain') {
    return { _v: value, _t: 'decimal', _d: displayAs };
}

/**
 * Check if a value is a typed value object
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isTyped(value) {
    return value !== null &&
           typeof value === 'object' &&
           '_v' in value &&
           '_t' in value;
}

/**
 * Extract the raw value from a typed value
 * @param {object|*} typedValue - Typed value or plain value
 * @returns {*} Raw value
 */
export function rawValue(typedValue) {
    if (isTyped(typedValue)) {
        return typedValue._v;
    }
    return typedValue;
}

export default {
    currency,
    currencyMajor,
    length,
    lengthFrom,
    mass,
    massFrom,
    capacity,
    capacityFrom,
    fraction,
    integer,
    decimal,
    isTyped,
    rawValue
};
