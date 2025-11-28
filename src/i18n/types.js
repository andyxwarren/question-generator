/**
 * i18n Type Definitions
 *
 * Defines the typed value system for locale-independent question data.
 * Supports both metric and imperial measurement systems.
 * Values are stored in system-native base units with type metadata for rendering.
 */

/**
 * Measurement Systems
 */
export const MEASUREMENT_SYSTEMS = {
    METRIC: 'metric',
    IMPERIAL: 'imperial'
};

/**
 * Value Types with dual base units for metric/imperial
 * - currency: minor units (pence/cents) - same for both systems
 * - length: mm (metric) / inches (imperial)
 * - mass: g (metric) / oz (imperial)
 * - capacity: ml (metric) / fl_oz (imperial)
 * - fraction: {n, d} object (same for both)
 * - integer: plain number (same for both)
 * - decimal: plain number (same for both)
 */

export const VALUE_TYPES = {
    currency: {
        baseUnit: 'minor',  // pence, cents - same for both systems
        displayHints: ['major', 'minor', 'mixed']
    },
    length: {
        baseUnit: {
            metric: 'mm',
            imperial: 'in'
        },
        displayHints: {
            metric: ['mm', 'cm', 'm', 'km', 'mixed_m_cm', 'mixed_km_m'],
            imperial: ['in', 'ft', 'yd', 'mi', 'mixed_ft_in', 'mixed_yd_ft', 'mixed_mi_yd']
        }
    },
    mass: {
        baseUnit: {
            metric: 'g',
            imperial: 'oz'
        },
        displayHints: {
            metric: ['g', 'kg', 'mixed_kg_g'],
            imperial: ['oz', 'lb', 'mixed_lb_oz']
        }
    },
    capacity: {
        baseUnit: {
            metric: 'ml',
            imperial: 'fl_oz'
        },
        displayHints: {
            metric: ['ml', 'l', 'mixed_l_ml'],
            imperial: ['fl_oz', 'cup', 'pt', 'qt', 'gal', 'mixed_pt_cup', 'mixed_gal_qt']
        }
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
 * Get all valid display hints for a type (across all systems)
 * @param {string} type - The value type
 * @returns {string[]} Array of valid hints
 */
export function getAllDisplayHints(type) {
    const typeConfig = VALUE_TYPES[type];
    if (!typeConfig) return [];

    const hints = typeConfig.displayHints;

    // Handle dual-system types (object with metric/imperial keys)
    if (hints && typeof hints === 'object' && !Array.isArray(hints)) {
        return [...(hints.metric || []), ...(hints.imperial || [])];
    }

    // Handle simple types (array of hints)
    return Array.isArray(hints) ? hints : [];
}

/**
 * Get display hints for a specific system
 * @param {string} type - The value type
 * @param {string} system - The measurement system ('metric' or 'imperial')
 * @returns {string[]} Array of valid hints for that system
 */
export function getDisplayHintsForSystem(type, system = 'metric') {
    const typeConfig = VALUE_TYPES[type];
    if (!typeConfig) return [];

    const hints = typeConfig.displayHints;

    // Handle dual-system types
    if (hints && typeof hints === 'object' && !Array.isArray(hints)) {
        return hints[system] || hints.metric || [];
    }

    // Handle simple types (same hints for all systems)
    return Array.isArray(hints) ? hints : [];
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

    const { _t: type, _d: hint, _s: system } = typedValue;

    if (!VALUE_TYPES[type]) {
        return { valid: false, error: `Unknown type: ${type}` };
    }

    if (hint) {
        const validHints = system
            ? getDisplayHintsForSystem(type, system)
            : getAllDisplayHints(type);

        if (!validHints.includes(hint)) {
            return {
                valid: false,
                error: `Invalid display hint '${hint}' for type '${type}'${system ? ` (${system})` : ''}. Valid hints: ${validHints.join(', ')}`
            };
        }
    }

    return { valid: true };
}

/**
 * Metric conversion factors to base units
 */
export const METRIC_CONVERSIONS = {
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
 * Imperial conversion factors to base units
 */
export const IMPERIAL_CONVERSIONS = {
    // Length to inches
    length: {
        in: 1,
        ft: 12,        // 12 inches = 1 foot
        yd: 36,        // 36 inches = 1 yard
        mi: 63360      // 5280 feet = 1 mile = 63360 inches
    },
    // Mass to ounces
    mass: {
        oz: 1,
        lb: 16         // 16 ounces = 1 pound
    },
    // Capacity to fluid ounces
    capacity: {
        fl_oz: 1,
        cup: 8,        // 8 fl oz = 1 cup
        pt: 16,        // 2 cups = 1 pint
        qt: 32,        // 2 pints = 1 quart
        gal: 128       // 4 quarts = 1 gallon
    },
    // Currency (same as metric)
    currency: {
        minor: 1,
        major: 100
    }
};

/**
 * Legacy alias for backwards compatibility
 */
export const CONVERSIONS = METRIC_CONVERSIONS;

/**
 * Get conversion factors for a measurement system
 * @param {string} system - 'metric' or 'imperial'
 * @returns {object} Conversion factors
 */
export function getConversions(system = 'metric') {
    return system === 'imperial' ? IMPERIAL_CONVERSIONS : METRIC_CONVERSIONS;
}

/**
 * Convert a value to base units
 * @param {number} value - The value to convert
 * @param {string} type - The value type (length, mass, etc.)
 * @param {string} fromUnit - The source unit
 * @param {string} system - The measurement system ('metric' or 'imperial')
 * @returns {number} Value in base units
 */
export function toBaseUnits(value, type, fromUnit, system = 'metric') {
    const conversions = getConversions(system)[type];
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
 * @param {string} system - The measurement system ('metric' or 'imperial')
 * @returns {number} Converted value
 */
export function fromBaseUnits(baseValue, type, toUnit, system = 'metric') {
    const conversions = getConversions(system)[type];
    if (!conversions || !conversions[toUnit]) {
        return baseValue;
    }
    return baseValue / conversions[toUnit];
}

/**
 * Get the base unit for a type and system
 * @param {string} type - The value type
 * @param {string} system - The measurement system
 * @returns {string} The base unit
 */
export function getBaseUnit(type, system = 'metric') {
    const typeConfig = VALUE_TYPES[type];
    if (!typeConfig) return null;

    const baseUnit = typeConfig.baseUnit;

    // Handle dual-system types
    if (baseUnit && typeof baseUnit === 'object') {
        return baseUnit[system] || baseUnit.metric;
    }

    // Handle simple types
    return baseUnit;
}

/**
 * Determine the measurement system from a display hint
 * @param {string} type - The value type
 * @param {string} hint - The display hint
 * @returns {string} 'metric', 'imperial', or 'unknown'
 */
export function getSystemFromHint(type, hint) {
    const typeConfig = VALUE_TYPES[type];
    if (!typeConfig) return 'unknown';

    const hints = typeConfig.displayHints;

    // Simple types (same for both systems)
    if (Array.isArray(hints)) {
        return 'metric';  // Default for non-measurement types
    }

    // Dual-system types
    if (hints.metric && hints.metric.includes(hint)) {
        return 'metric';
    }
    if (hints.imperial && hints.imperial.includes(hint)) {
        return 'imperial';
    }

    return 'unknown';
}
