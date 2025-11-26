/**
 * Schema Index - Unified Entry Point
 *
 * Provides:
 * - Re-exports all strand schemas
 * - Unified validateParameters() function that routes to correct strand
 * - getSchema() for agent/tooling use
 *
 * Usage:
 * ```javascript
 * import { validateParameters, getSchema } from './schemas/index.js';
 *
 * // Validate parameters
 * const errors = validateParameters('M04_Y3_MEAS', 3, params);
 * if (errors.length > 0) console.warn('Validation errors:', errors);
 *
 * // Get schema for inspection
 * const schema = getSchema('N01_Y2_NPV');
 * ```
 */

// Re-export strand schemas
export {
    NumberSchema,
    NumberValidValues,
    getNumberSchema,
    getNumberValidValues,
    validateNumber
} from './NumberSchema.js';

export {
    CalculationSchema,
    CalculationValidValues,
    getCalculationSchema,
    getCalculationValidValues,
    validateCalculation
} from './CalculationSchema.js';

export {
    MeasurementSchema,
    MeasurementValidValues,
    getMeasurementSchema,
    getMeasurementValidValues,
    validateMeasurement
} from './MeasurementSchema.js';

// Re-export validators for direct use
export * from './validators.js';

// =============================================================================
// UNIFIED FUNCTIONS
// =============================================================================

import { validateNumber, getNumberSchema, NumberValidValues } from './NumberSchema.js';
import { validateCalculation, getCalculationSchema, CalculationValidValues } from './CalculationSchema.js';
import { validateMeasurement, getMeasurementSchema, MeasurementValidValues } from './MeasurementSchema.js';

/**
 * Determine the strand from a module ID
 * @param {string} moduleId - Module ID (e.g., 'N01_Y2_NPV', 'C02_Y3_CALC', 'M04_Y5_MEAS')
 * @returns {string|null} Strand identifier ('Number', 'Calculation', 'Measurement') or null
 */
export function getStrand(moduleId) {
    if (!moduleId || typeof moduleId !== 'string') return null;

    const prefix = moduleId.charAt(0).toUpperCase();
    switch (prefix) {
        case 'N': return 'Number';
        case 'C': return 'Calculation';
        case 'M': return 'Measurement';
        default: return null;
    }
}

/**
 * Validate parameters for any module
 *
 * Routes to the appropriate strand validator based on module ID prefix.
 *
 * @param {string} moduleId - Module ID (e.g., 'N01_Y2_NPV', 'C02_Y3_CALC', 'M04_Y5_MEAS')
 * @param {number} level - Difficulty level (1-4)
 * @param {object} params - Parameters to validate
 * @returns {string[]} Array of error messages (empty if valid)
 *
 * @example
 * const errors = validateParameters('M04_Y3_MEAS', 3, {
 *   operations: ['read_to_minute'],
 *   math: { minutes: [0, 5, 10], roman: false },
 *   presentation: { types: ['12_hour'] }
 * });
 */
export function validateParameters(moduleId, level, params) {
    const strand = getStrand(moduleId);

    if (!strand) {
        return [`Unknown module ID format: "${moduleId}". Expected format: N##_Y#_NPV, C##_Y#_CALC, or M##_Y#_MEAS`];
    }

    // Validate level
    if (typeof level !== 'number' || level < 1 || level > 4) {
        return [`Invalid level: ${level}. Must be a number between 1 and 4`];
    }

    // Validate params exists
    if (!params || typeof params !== 'object') {
        return [`Parameters must be a non-null object`];
    }

    // Route to strand-specific validator
    switch (strand) {
        case 'Number':
            return validateNumber(moduleId, level, params);
        case 'Calculation':
            return validateCalculation(moduleId, level, params);
        case 'Measurement':
            return validateMeasurement(moduleId, level, params);
        default:
            return [`Unknown strand: ${strand}`];
    }
}

/**
 * Get the schema definition for a module
 *
 * Useful for agents and tooling to inspect expected parameter structure.
 *
 * @param {string} moduleId - Module ID (e.g., 'N01_Y2_NPV')
 * @returns {object|null} Schema definition or null if not found
 *
 * @example
 * const schema = getSchema('N01_Y2_NPV');
 * // Returns N01 schema with math.sequence, presentation.gaps, etc.
 */
export function getSchema(moduleId) {
    const strand = getStrand(moduleId);

    switch (strand) {
        case 'Number':
            return getNumberSchema(moduleId);
        case 'Calculation':
            return getCalculationSchema(moduleId);
        case 'Measurement':
            return getMeasurementSchema(moduleId);
        default:
            return null;
    }
}

/**
 * Get valid values for a module's enumerated fields
 *
 * Returns the set of valid values for operations, types, styles, etc.
 *
 * @param {string} moduleId - Module ID
 * @returns {object|null} Valid values or null if not found
 *
 * @example
 * const validValues = getValidValues('C01_Y2_CALC');
 * console.log(validValues.operations); // ['number_bonds', 'missing_part', ...]
 */
export function getValidValues(moduleId) {
    const strand = getStrand(moduleId);
    const series = moduleId.substring(0, 3);

    switch (strand) {
        case 'Number':
            return NumberValidValues[series] || null;
        case 'Calculation':
            return CalculationValidValues[series] || null;
        case 'Measurement':
            return MeasurementValidValues[series] || null;
        default:
            return null;
    }
}

/**
 * Get all available module series for a strand
 *
 * @param {string} strand - Strand name ('Number', 'Calculation', 'Measurement')
 * @returns {string[]} Array of series codes (e.g., ['N01', 'N02', ...])
 */
export function getModuleSeries(strand) {
    switch (strand) {
        case 'Number':
            return ['N01', 'N02', 'N03', 'N04', 'N05', 'N06'];
        case 'Calculation':
            return ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09'];
        case 'Measurement':
            return ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09'];
        default:
            return [];
    }
}

/**
 * Validate and return a result object with pass/fail status
 *
 * More ergonomic than raw error array for conditional logic.
 *
 * @param {string} moduleId - Module ID
 * @param {number} level - Difficulty level
 * @param {object} params - Parameters to validate
 * @returns {{valid: boolean, errors: string[]}} Validation result
 *
 * @example
 * const result = validate('M04_Y3_MEAS', 3, params);
 * if (!result.valid) {
 *   console.error('Validation failed:', result.errors);
 * }
 */
export function validate(moduleId, level, params) {
    const errors = validateParameters(moduleId, level, params);
    return {
        valid: errors.length === 0,
        errors
    };
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default {
    // Unified functions
    validateParameters,
    validate,
    getSchema,
    getValidValues,
    getStrand,
    getModuleSeries,

    // Strand-specific validators (re-exported)
    validateNumber,
    validateCalculation,
    validateMeasurement
};
