/**
 * Parameter Schema Definition V2.0 (Nested Architecture)
 *
 * This file defines the strict contract for the V2 Nested Parameter Model.
 *
 * STRUCTURE:
 * 1. Root Level:
 *    - operations: Array of strings (defines what question types to generate)
 *    - math: Object containing mathematical constraints (ranges, steps, units)
 *    - presentation: Object containing visual/contextual settings
 *
 * 2. Validation:
 *    - validateParameters() now checks deep nesting within 'math' and 'presentation'
 */

// =============================================================================
// 1. SHARED TYPE DEFINITIONS
// =============================================================================

const SharedTypes = {
    Range: {
        type: 'object',
        structure: { min: 'number', max: 'number' },
        optional: true
    },
    RangeWithInterval: {
        type: 'object',
        structure: { min: 'number', max: 'number', interval: 'number' },
        optional: true
    },
    DecimalConfig: {
        type: 'object',
        structure: { allow: 'boolean', places: 'number' },
        optional: true
    }
};

// =============================================================================
// 2. STRAND SCHEMAS (V2 NESTED)
// =============================================================================

export const StrandSchemas = {

    // -------------------------------------------------------------------------
    // Number & Place Value (N)
    // -------------------------------------------------------------------------
    Number: {
        // Root
        operations: { type: 'array<string>', optional: true },

        // Math Constraints
        math: {
            type: 'object',
            required: true,
            structure: {
                range: SharedTypes.Range,
                sequence: {
                    type: 'object',
                    optional: true,
                    structure: {
                        steps: 'array<number>',
                        length: 'number',
                        directions: 'array<string>',
                        startStrategy: 'string'
                    }
                },
                placeValue: {
                    type: 'object',
                    optional: true,
                    structure: {
                        places: 'array<string>',
                        includeZero: 'boolean'
                    }
                },
                rounding: {
                    type: 'object',
                    optional: true,
                    structure: { bases: 'array<number>' }
                },
                roman: SharedTypes.Range
            }
        },

        // Presentation Settings
        presentation: {
            type: 'object',
            required: true,
            structure: {
                gaps: { type: 'object', optional: true },
                numberLine: { type: 'object', optional: true },
                contexts: { type: 'array<string>', optional: true },
                comparison: { type: 'object', optional: true }
            }
        }
    },

    // -------------------------------------------------------------------------
    // Calculation (C)
    // -------------------------------------------------------------------------
    Calculation: {
        operations: { type: 'array<string>', required: true },

        math: {
            type: 'object',
            required: true,
            structure: {
                range: { type: 'object', optional: true }, // Flexible range object
                targets: { type: 'array<number>', optional: true },
                tables: { type: 'array<number>', optional: true },
                components: { type: 'object', optional: true },
                config: { type: 'object', optional: true }, // Specific flags like allowZero, regrouping
                factors: { type: 'array<number>', optional: true }, // Factor ranges for C08_Y5
                ops: { type: 'array<number>', optional: true } // Number of operations for multi-step problems
            }
        },

        presentation: {
            type: 'object',
            required: true,
            structure: {
                styles: { type: 'array<string>', optional: true },
                format: { type: 'string', optional: true },
                contexts: { type: 'array<string>', optional: true },
                hint: { type: 'string', optional: true }
            }
        }
    },

    // -------------------------------------------------------------------------
    // Measurement (M)
    // -------------------------------------------------------------------------
    Measurement: {
        operations: { type: 'array<string>', required: true },

        math: {
            type: 'object',
            required: true,
            structure: {
                types: { type: 'array<string>', optional: true },
                units: { type: 'object', optional: true }, // Map or Array
                ranges: { type: 'object', optional: true }, // Map of ranges
                conversions: { type: 'object', optional: true },
                denominations: { type: 'array<number>', optional: true },
                scale: SharedTypes.RangeWithInterval
            }
        },

        presentation: {
            type: 'object',
            required: false, // Sometimes optional for simple M modules
            structure: {
                contexts: { type: 'array<string>', optional: true },
                visuals: { type: 'boolean', optional: true },
                format: { type: 'string', optional: true }
            }
        }
    }
};

// =============================================================================
// 3. VALIDATION HELPERS
// =============================================================================

function validateStructure(data, structure, path = '') {
    const errors = [];
    if (!data) return errors;

    for (const [key, rule] of Object.entries(structure)) {
        const currentPath = path ? `${path}.${key}` : key;
        const value = data[key];

        // Check Required
        if ((value === undefined || value === null)) {
            if (rule.required) {
                errors.push(`Missing required parameter: ${currentPath}`);
            }
            continue;
        }

        // Check Types
        if (rule === 'number' || rule.type === 'number') {
            if (typeof value !== 'number') errors.push(`${currentPath} must be a number`);
        }
        else if (rule === 'string' || rule.type === 'string') {
            if (typeof value !== 'string') errors.push(`${currentPath} must be a string`);
        }
        else if (rule === 'boolean' || rule.type === 'boolean') {
            if (typeof value !== 'boolean') errors.push(`${currentPath} must be a boolean`);
        }
        else if (rule === 'array' || (rule.type && rule.type.startsWith('array'))) {
            if (!Array.isArray(value)) errors.push(`${currentPath} must be an array`);
        }
        else if (rule.type === 'object' && rule.structure) {
            if (typeof value !== 'object') {
                errors.push(`${currentPath} must be an object`);
            } else {
                // Recursive validation
                errors.push(...validateStructure(value, rule.structure, currentPath));
            }
        }
    }
    return errors;
}

/**
 * Validates a parameter object against the V2 Schema
 */
export function validateParameters(params, strand) {
    const schema = StrandSchemas[strand];
    if (!schema) return [`Unknown strand: ${strand}`];

    // Validate top-level structure based on the definitions above
    // We define the "structure" implicitly by the keys in StrandSchemas[strand]
    // except for keys that have specific 'structure' property inside them (like math/presentation)
    
    // Build a structure object for the validator
    const structure = {};
    for (const key of Object.keys(schema)) {
        structure[key] = schema[key];
    }

    return validateStructure(params, structure);
}

/**
 * Merges defaults (Simple shallow merge for V2)
 */
export function applyDefaults(params, strand) {
    // V2 defaults are handled inside generators or specifically defined
    // This is a placeholder for future default logic
    return params;
}