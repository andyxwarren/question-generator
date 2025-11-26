/**
 * Measurement Strand Schema (M01-M09)
 *
 * Defines all valid parameter fields for Measurement modules.
 * Provides strict validation for each module series.
 *
 * Module Series:
 * - M01: Compare and Order Measurements (Y1-Y4)
 * - M02: Reading Scales (Y1-Y4)
 * - M03: Money (Y1-Y3)
 * - M04: Time (Y1-Y5)
 * - M05: Metric Conversions (Y5)
 * - M06: Mixed Conversions (Y4-Y6)
 * - M07: Perimeter and Area (Y3-Y6)
 * - M08: Volume (Y5-Y6)
 * - M09: Measurement Problems (Y2-Y6)
 */

import {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    formatError,
    validateObject
} from './validators.js';

// =============================================================================
// M01 SCHEMA: Compare and Order Measurements
// =============================================================================

const M01_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            types: 'array<string>',
            range: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            useUnits: 'boolean',
            allowEquals: 'boolean',
            sameUnitOnly: 'boolean',
            simpleConversions: 'boolean',
            units: {
                type: 'object',
                required: false,
                structure: {
                    length: 'array<string>',
                    mass: 'array<string>',
                    capacity: 'array<string>',
                    money: 'array<string>'
                },
                allowUnknown: true
            },
            ranges: {
                type: 'object',
                required: false,
                allowUnknown: true  // Dynamic per-unit ranges (cm, m, mm, kg, etc.)
            },
            moneyFormat: 'string'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            useDescriptors: 'boolean'
        }
    }
};

const M01_VALID_VALUES = {
    operations: [
        'compare_two', 'complete_comparative', 'identify_more_less',
        'compare_with_symbols', 'order_two', 'order_three', 'order_four', 'complete_comparison',
        'compare_same_units', 'order_same_units', 'compare_mixed_units_simple', 'compare_mixed_units', 'order_mixed_units',
        'compare_measures', 'order_measures', 'compare_money', 'order_money'
    ],
    types: ['length', 'height', 'mass', 'capacity', 'time', 'money'],
    units: {
        length: ['mm', 'cm', 'm', 'km'],
        mass: ['g', 'kg'],
        capacity: ['ml', 'l'],
        money: ['p', '£', 'mixed']
    },
    moneyFormat: ['simple', 'mixed']
};

// =============================================================================
// M02 SCHEMA: Reading Scales
// =============================================================================

const M02_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            types: 'array<string>',
            scale: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number',
                    interval: 'number'
                }
            },
            units: {
                type: 'object',
                required: false,
                allowUnknown: true
            },
            ranges: {
                type: 'object',
                required: false,
                allowUnknown: true  // Per-unit ranges with min, max, interval
            },
            useDecimals: 'boolean'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            showAllNumbers: 'boolean',
            pointerOnMark: 'boolean'
        }
    }
};

const M02_VALID_VALUES = {
    operations: [
        'read_simple_scale', 'choose_unit', 'count_marks',
        'read_scale_with_units', 'choose_appropriate_unit',
        'read_scale_precise', 'read_different_scales', 'measure_between_marks',
        'estimate_measurement', 'choose_reasonable_estimate'
    ],
    types: ['length', 'mass', 'capacity', 'time', 'money']
};

// =============================================================================
// M03 SCHEMA: Money
// =============================================================================

const M03_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            denominations: 'array<number>',
            pounds: 'boolean',
            notes: 'boolean',
            noteValues: 'array<number>',
            max: 'number',
            target: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            maxCoins: 'number',
            symbol: 'string',
            conversions: 'boolean',
            format: 'string',
            change: 'boolean'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {}
    }
};

const M03_VALID_VALUES = {
    operations: [
        'identify_coin_value', 'state_coin_value', 'compare_two_coins', 'order_coins',
        'use_pence_symbol', 'use_pounds_symbol', 'combine_same_coins', 'combine_mixed_coins', 'convert_pounds_pence',
        'recognize_all_coins', 'combine_amounts', 'recognize_all_denominations', 'make_amount_efficient', 'solve_change_problems'
    ],
    symbol: ['pence_only', 'pounds_only', 'both'],
    format: ['simple', 'mixed']
};

// =============================================================================
// M04 SCHEMA: Time
// =============================================================================

const M04_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            hours: 'array<number>',
            hours24: 'array<number>',
            minutes: 'array<number>',
            halfPast: 'boolean',
            quarterTo: 'boolean',
            roman: 'boolean',
            facts: 'array<string>',
            ranges: {
                type: 'object',
                required: false,
                structure: {
                    hours: 'any',      // Can be array or {min, max}
                    hours24: 'any',
                    minutes: 'any'
                },
                allowUnknown: false
            },
            conversions: {
                type: 'object',
                required: false,
                structure: {
                    hours: 'object',   // {min, max}
                    minutes: 'object',
                    years: 'object'
                },
                allowUnknown: false
            },
            include24: 'boolean',
            problemTypes: 'array<string>'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            types: 'array<string>',
            sequence: 'array<string>',
            multiStep: 'boolean'
        }
    }
};

const M04_VALID_VALUES = {
    operations: [
        'read_oclock', 'identify_oclock', 'read_half_past', 'sequence_events',
        'read_quarter_past', 'read_five_minutes', 'write_time', 'identify_time',
        'read_to_minute', 'write_12hour', 'write_24hour', 'am_pm_identification',
        'convert_12hour_formats', 'convert_hours_to_minutes', 'convert_to_24hour',
        'convert_minutes_to_seconds', 'convert_years_to_months',
        'convert_simple_problems', 'hours_minutes_problems', 'convert_problems',
        'duration_problems', 'mixed_unit_problems', 'multi_step_problems'
    ],
    types: ['oclock', 'half_past', 'quarter_past', 'five_minute_intervals', '12_hour', '24_hour'],
    facts: ['minutes_in_hour', 'hours_in_day', 'seconds_in_minute', 'days_in_week', 'days_in_year'],
    problemTypes: ['hours_to_minutes', 'minutes_to_seconds', 'simple_duration', 'duration_calculation', 'multi_step']
};

// =============================================================================
// M05 SCHEMA: Metric Conversions
// =============================================================================

const M05_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            types: 'array<string>',
            conversions: {
                type: 'object',
                required: false,
                structure: {
                    length: 'array<string>',
                    mass: 'array<string>',
                    capacity: 'array<string>'
                },
                allowUnknown: false
            },
            valueType: 'array<string>',
            ranges: {
                type: 'object',
                required: false,
                allowUnknown: true  // Per-unit ranges
            },
            decimalPlaces: 'number'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            wordProblems: 'boolean'
        }
    }
};

const M05_VALID_VALUES = {
    operations: ['direct_conversion', 'reverse_conversion', 'word_problem'],
    types: ['length', 'mass', 'capacity'],
    conversions: {
        length: ['km_to_m', 'm_to_cm', 'cm_to_mm'],
        mass: ['kg_to_g'],
        capacity: ['l_to_ml']
    },
    valueType: ['whole_only', 'whole', 'decimal']
};

// =============================================================================
// M06 SCHEMA: Mixed Conversions
// =============================================================================

const M06_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            types: 'array<string>',
            conversions: {
                type: 'object',
                required: false,
                structure: {
                    length: 'array<string>',
                    mass: 'array<string>',
                    capacity: 'array<string>',
                    time: 'array<string>'
                },
                allowUnknown: false
            },
            ranges: {
                type: 'object',
                required: false,
                allowUnknown: true  // Per-unit ranges (km, hours, m, kg, inches, miles)
            },
            valueType: 'any',  // Can be array or string
            decimalPlaces: 'number'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            approximate: 'boolean',
            wordProblems: 'boolean'
        }
    }
};

const M06_VALID_VALUES = {
    operations: [
        'direct_metric_conversion', 'time_conversion', 'reverse_metric_conversion', 'word_problem',
        'approximate_conversion_metric_to_imperial', 'metric_conversion_larger_to_smaller',
        'metric_conversion_smaller_to_larger', 'imperial_metric_conversion'
    ],
    types: ['length', 'mass', 'capacity', 'time'],
    valueType: ['whole_only', 'whole', 'decimal', 'decimal_1dp', 'decimal_2dp']
};

// =============================================================================
// M07 SCHEMA: Perimeter and Area
// =============================================================================

const M07_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            side: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            dim: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            grid: 'array<number>',
            units: 'array<string>',
            mixedUnits: 'boolean',
            squareUnits: 'boolean',
            complexity: 'string',
            formulaRecog: 'boolean'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            showAllSides: 'boolean'
        }
    }
};

const M07_VALID_VALUES = {
    operations: [
        'rectangle_perimeter', 'square_perimeter', 'rectilinear_perimeter', 'count_squares',
        'rectangle_area', 'square_area', 'composite_perimeter',
        'parallelogram_area', 'triangle_area'
    ],
    units: ['cm', 'm', 'mm', 'km'],
    complexity: ['simple', 'medium', 'complex']
};

// =============================================================================
// M08 SCHEMA: Volume
// =============================================================================

const M08_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            dim: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            objects: 'array<any>',  // Array of object definitions
            units: 'array<string>',
            useLitres: 'boolean',
            missingDim: 'boolean'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {}
    }
};

const M08_VALID_VALUES = {
    operations: ['count_unit_cubes', 'estimate_capacity', 'calculate_volume', 'cube_volume'],
    units: ['cm', 'mm', 'm']
};

// =============================================================================
// M09 SCHEMA: Measurement Problems
// =============================================================================

const M09_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            unit: 'string',
            types: 'array<string>',
            range: {
                type: 'object',
                required: false,
                allowUnknown: true  // Can include km, etc.
            },
            totalMax: 'number',
            money: {
                type: 'object',
                required: false,
                structure: {
                    unit: 'string',
                    range: 'any',  // Can be array or {min, max}
                    format: 'string'
                },
                allowUnknown: false
            },
            length: {
                type: 'object',
                required: false,
                structure: {
                    unit: 'string',
                    range: 'any'  // Can be array or {min, max}
                }
            },
            mult: 'array<number>',
            decimal: 'any',  // Can be number or array
            conversions: {
                type: 'object',
                required: false,
                structure: {
                    length: 'array<string>',
                    mass: 'array<string>'
                }
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            contexts: 'array<string>',
            change: 'boolean'
        }
    }
};

const M09_VALID_VALUES = {
    operations: [
        'add_money', 'subtract_money', 'add_measure', 'subtract_measure',
        'multiply_measure', 'divide_measure', 'multiply_decimal', 'add_decimal',
        'convert_length', 'convert_mass'
    ],
    contexts: ['shopping', 'measuring', 'recipes', 'science', 'DIY'],
    moneyFormat: ['pence_only', 'whole_pounds', 'mixed'],
    unit: ['pence_only', 'cm', 'm', 'km']
};

// =============================================================================
// SCHEMA EXPORTS
// =============================================================================

export const MeasurementSchema = {
    M01: M01_SCHEMA,
    M02: M02_SCHEMA,
    M03: M03_SCHEMA,
    M04: M04_SCHEMA,
    M05: M05_SCHEMA,
    M06: M06_SCHEMA,
    M07: M07_SCHEMA,
    M08: M08_SCHEMA,
    M09: M09_SCHEMA
};

export const MeasurementValidValues = {
    M01: M01_VALID_VALUES,
    M02: M02_VALID_VALUES,
    M03: M03_VALID_VALUES,
    M04: M04_VALID_VALUES,
    M05: M05_VALID_VALUES,
    M06: M06_VALID_VALUES,
    M07: M07_VALID_VALUES,
    M08: M08_VALID_VALUES,
    M09: M09_VALID_VALUES
};

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Get the schema for a Measurement strand module
 * @param {string} moduleId - Module ID (e.g., 'M04_Y3_MEAS')
 * @returns {object|null} Schema definition or null if not found
 */
export function getMeasurementSchema(moduleId) {
    const series = moduleId.substring(0, 3);
    return MeasurementSchema[series] || null;
}

/**
 * Get valid values for a Measurement strand module
 * @param {string} moduleId - Module ID
 * @returns {object|null} Valid values or null if not found
 */
export function getMeasurementValidValues(moduleId) {
    const series = moduleId.substring(0, 3);
    return MeasurementValidValues[series] || null;
}

/**
 * Validate parameters for a Measurement strand module
 * @param {string} moduleId - Module ID (e.g., 'M04_Y3_MEAS')
 * @param {number} level - Difficulty level (1-4)
 * @param {object} params - Parameters to validate
 * @returns {string[]} Array of error messages (empty if valid)
 */
export function validateMeasurement(moduleId, level, params) {
    const errors = [];
    const series = moduleId.substring(0, 3);
    const schema = MeasurementSchema[series];
    const validValues = MeasurementValidValues[series];

    if (!schema) {
        errors.push(`Unknown Measurement module series: ${series}`);
        return errors;
    }

    // Basic structure validation
    if (!isObject(params)) {
        errors.push('Parameters must be an object');
        return errors;
    }

    // Validate against schema structure
    errors.push(...validateObject(params, schema, '', true));

    // Validate operations array
    if (params.operations && validValues?.operations) {
        for (const op of params.operations) {
            if (!validValues.operations.includes(op)) {
                errors.push(formatError('operations', `invalid operation "${op}"`));
            }
        }
    }

    // Validate types array (M01, M02, M05, M06, M09)
    if (params.math?.types && validValues?.types) {
        for (const type of params.math.types) {
            if (!validValues.types.includes(type)) {
                errors.push(formatError('math.types', `invalid type "${type}"`));
            }
        }
    }

    // Validate contexts (M09)
    if (params.presentation?.contexts && validValues?.contexts) {
        for (const ctx of params.presentation.contexts) {
            if (!validValues.contexts.includes(ctx)) {
                errors.push(formatError('presentation.contexts', `invalid context "${ctx}"`));
            }
        }
    }

    // Validate presentation types (M04)
    if (params.presentation?.types && validValues?.types) {
        // M04 has presentation.types for clock types
        for (const type of params.presentation.types) {
            if (!validValues.types.includes(type)) {
                errors.push(formatError('presentation.types', `invalid type "${type}"`));
            }
        }
    }

    return errors;
}

export default {
    MeasurementSchema,
    MeasurementValidValues,
    getMeasurementSchema,
    getMeasurementValidValues,
    validateMeasurement
};
