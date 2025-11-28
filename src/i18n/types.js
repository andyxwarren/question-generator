/**
 * i18n Type Definitions
 *
 * Defines the typed value system for locale-independent question data.
 * All values are stored in base units with type metadata for rendering.
 */

/**
 * Value Types and their base units:
 * - currency: minor units (pence/cents)
 * - length: millimeters
 * - mass: grams
 * - capacity: milliliters
 * - fraction: {n, d} object (numerator, denominator)
 * - integer: plain number
 * - decimal: plain number
 */

export const VALUE_TYPES = {
    currency: {
        baseUnit: 'minor',  // pence, cents
        displayHints: ['major', 'minor', 'mixed']
    },
    length: {
        baseUnit: 'mm',
        displayHints: ['mm', 'cm', 'm', 'km', 'mixed_m_cm', 'mixed_km_m']
    },
    mass: {
        baseUnit: 'g',
        displayHints: ['g', 'kg', 'mixed_kg_g']
    },
    capacity: {
        baseUnit: 'ml',
        displayHints: ['ml', 'l', 'mixed_l_ml']
    },
    fraction: {
        baseUnit: 'object',  // {n, d}
        displayHints: ['numeric', 'words']
    },
    integer: {
        baseUnit: 'number',
        displayHints: ['plain', 'ordinal']
    },
    decimal: {
        baseUnit: 'number',
        displayHints: ['plain']
    }
};

/**
 * Check if a value is a typed value object
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isTypedValue(value) {
    return value !== null &&
           typeof value === 'object' &&
           '_v' in value &&
           '_t' in value;
}

/**
 * Validate a typed value object
 * @param {object} typedValue - The typed value to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateTypedValue(typedValue) {
    if (!isTypedValue(typedValue)) {
        return { valid: false, error: 'Not a typed value object (missing _v or _t)' };
    }

    const { _t: type, _d: hint } = typedValue;

    if (!VALUE_TYPES[type]) {
        return { valid: false, error: `Unknown type: ${type}` };
    }

    if (hint && !VALUE_TYPES[type].displayHints.includes(hint)) {
        return {
            valid: false,
            error: `Invalid display hint '${hint}' for type '${type}'. Valid hints: ${VALUE_TYPES[type].displayHints.join(', ')}`
        };
    }

    return { valid: true };
}

/**
 * Conversion factors to base units
 */
export const CONVERSIONS = {
    // Length to mm
    length: {
        mm: 1,
        cm: 10,
        m: 1000,
        km: 1000000
    },
    // Mass to g
    mass: {
        g: 1,
        kg: 1000
    },
    // Capacity to ml
    capacity: {
        ml: 1,
        l: 1000
    },
    // Currency to minor units
    currency: {
        minor: 1,
        major: 100
    }
};

/**
 * Convert a value to base units
 * @param {number} value - The value to convert
 * @param {string} type - The value type (length, mass, etc.)
 * @param {string} fromUnit - The source unit
 * @returns {number} Value in base units
 */
export function toBaseUnits(value, type, fromUnit) {
    const conversions = CONVERSIONS[type];
    if (!conversions || !conversions[fromUnit]) {
        return value;
    }
    return value * conversions[fromUnit];
}

/**
 * Convert from base units to a target unit
 * @param {number} baseValue - The value in base units
 * @param {string} type - The value type
 * @param {string} toUnit - The target unit
 * @returns {number} Converted value
 */
export function fromBaseUnits(baseValue, type, toUnit) {
    const conversions = CONVERSIONS[type];
    if (!conversions || !conversions[toUnit]) {
        return baseValue;
    }
    return baseValue / conversions[toUnit];
}
