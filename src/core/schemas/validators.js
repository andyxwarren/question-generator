/**
 * Schema Validation Utilities
 *
 * Provides type-checking functions for strand-specific schema validation.
 * These are pure utility functions with no schema definitions.
 */

// =============================================================================
// TYPE VALIDATORS
// =============================================================================

/**
 * Check if value is a number (not NaN)
 */
export function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Check if value is a string
 */
export function isString(value) {
    return typeof value === 'string';
}

/**
 * Check if value is a boolean
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}

/**
 * Check if value is an array, optionally with item type checking
 * @param {any} value - Value to check
 * @param {string} [itemType] - Optional: 'number', 'string', 'boolean', 'object'
 */
export function isArray(value, itemType = null) {
    if (!Array.isArray(value)) return false;
    if (!itemType) return true;

    return value.every(item => {
        switch (itemType) {
            case 'number': return isNumber(item);
            case 'string': return isString(item);
            case 'boolean': return isBoolean(item);
            case 'object': return isObject(item);
            default: return true;
        }
    });
}

/**
 * Check if value is a plain object (not null, not array)
 */
export function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Check if value is one of allowed values
 */
export function isOneOf(value, allowedValues) {
    return allowedValues.includes(value);
}

/**
 * Check if value is within a numeric range (inclusive)
 */
export function isInRange(value, min, max) {
    return isNumber(value) && value >= min && value <= max;
}

// =============================================================================
// STRUCTURE VALIDATORS
// =============================================================================

/**
 * Validate a Range object: { min: number, max: number }
 */
export function isValidRange(value) {
    return isObject(value) &&
           isNumber(value.min) &&
           isNumber(value.max) &&
           value.min <= value.max;
}

/**
 * Validate a Range object with optional interval: { min, max, interval? }
 */
export function isValidRangeWithInterval(value) {
    if (!isValidRange(value)) return false;
    if (value.interval !== undefined && !isNumber(value.interval)) return false;
    return true;
}

/**
 * Validate a Gaps object: { position: string, count: number }
 */
export function isValidGaps(value) {
    return isObject(value) &&
           isString(value.position) &&
           isNumber(value.count);
}

/**
 * Validate a Sequence object: { steps, length, directions, startStrategy, ... }
 */
export function isValidSequence(value) {
    if (!isObject(value)) return false;
    if (value.steps !== undefined && !isArray(value.steps, 'number')) return false;
    if (value.length !== undefined && !isNumber(value.length)) return false;
    if (value.directions !== undefined && !isArray(value.directions, 'string')) return false;
    if (value.startStrategy !== undefined && !isString(value.startStrategy)) return false;
    return true;
}

// =============================================================================
// ERROR FORMATTING
// =============================================================================

/**
 * Format a validation error with path context
 * @param {string} path - Dot-notation path (e.g., "math.range.min")
 * @param {string} message - Error description
 * @param {string} [expected] - Optional expected type/value
 * @param {any} [actual] - Optional actual value received
 */
export function formatError(path, message, expected = null, actual = null) {
    let error = `[${path}] ${message}`;
    if (expected) error += ` (expected: ${expected})`;
    if (actual !== null) error += ` (got: ${typeof actual})`;
    return error;
}

/**
 * Create a validation result object
 * @param {boolean} valid - Whether validation passed
 * @param {string[]} errors - Array of error messages
 */
export function validationResult(valid, errors = []) {
    return { valid, errors };
}

// =============================================================================
// FIELD VALIDATION HELPERS
// =============================================================================

/**
 * Validate a single field against a type specification
 * @param {any} value - The value to validate
 * @param {string} type - Type specification ('number', 'string', 'boolean', 'array<number>', 'object', 'range')
 * @param {string} path - Field path for error messages
 * @returns {string[]} Array of error messages (empty if valid)
 */
export function validateField(value, type, path) {
    const errors = [];

    // Handle undefined/null for required fields (handled at schema level)
    if (value === undefined || value === null) {
        return errors; // Let schema handle required check
    }

    // Parse array types like "array<number>"
    const arrayMatch = type.match(/^array<(.+)>$/);

    if (arrayMatch) {
        const itemType = arrayMatch[1];
        if (!isArray(value, itemType)) {
            errors.push(formatError(path, `must be an array of ${itemType}s`, `array<${itemType}>`, value));
        }
    } else {
        switch (type) {
            case 'number':
                if (!isNumber(value)) {
                    errors.push(formatError(path, 'must be a number', 'number', value));
                }
                break;
            case 'string':
                if (!isString(value)) {
                    errors.push(formatError(path, 'must be a string', 'string', value));
                }
                break;
            case 'boolean':
                if (!isBoolean(value)) {
                    errors.push(formatError(path, 'must be a boolean', 'boolean', value));
                }
                break;
            case 'object':
                if (!isObject(value)) {
                    errors.push(formatError(path, 'must be an object', 'object', value));
                }
                break;
            case 'range':
                if (!isValidRange(value)) {
                    errors.push(formatError(path, 'must be a valid range {min, max}', 'range object', value));
                }
                break;
            case 'rangeWithInterval':
                if (!isValidRangeWithInterval(value)) {
                    errors.push(formatError(path, 'must be a valid range {min, max, interval?}', 'range object', value));
                }
                break;
            case 'gaps':
                if (!isValidGaps(value)) {
                    errors.push(formatError(path, 'must be a valid gaps object {position, count}', 'gaps object', value));
                }
                break;
            case 'sequence':
                if (!isValidSequence(value)) {
                    errors.push(formatError(path, 'must be a valid sequence object', 'sequence object', value));
                }
                break;
            case 'any':
                // Accept any value
                break;
            default:
                // Unknown type - warn but don't fail
                console.warn(`Unknown type "${type}" at ${path}`);
        }
    }

    return errors;
}

/**
 * Validate an object against a field schema
 * @param {object} data - The object to validate
 * @param {object} schema - Schema definition with field types
 * @param {string} basePath - Base path for error messages
 * @param {boolean} strict - If true, reject unknown fields
 * @returns {string[]} Array of error messages
 */
export function validateObject(data, schema, basePath = '', strict = true) {
    const errors = [];

    if (!isObject(data)) {
        errors.push(formatError(basePath || 'root', 'must be an object'));
        return errors;
    }

    // Check each field defined in schema
    for (const [fieldName, fieldDef] of Object.entries(schema)) {
        const fieldPath = basePath ? `${basePath}.${fieldName}` : fieldName;
        const value = data[fieldName];

        // Handle nested object definitions
        if (typeof fieldDef === 'object' && fieldDef.type) {
            // It's a typed field definition
            const { type, required = false, structure, allowUnknown = false } = fieldDef;

            // Check required
            if (required && (value === undefined || value === null)) {
                errors.push(formatError(fieldPath, 'is required'));
                continue;
            }

            // Skip if undefined and not required
            if (value === undefined || value === null) continue;

            // Validate type
            errors.push(...validateField(value, type, fieldPath));

            // If it has nested structure, validate recursively
            if (structure && isObject(value)) {
                errors.push(...validateObject(value, structure, fieldPath, !allowUnknown));
            }
        } else if (typeof fieldDef === 'object') {
            // Nested schema without explicit type wrapper
            if (value !== undefined && value !== null) {
                errors.push(...validateObject(value, fieldDef, fieldPath, strict));
            }
        } else {
            // Simple type string (shorthand)
            if (value !== undefined && value !== null) {
                errors.push(...validateField(value, fieldDef, fieldPath));
            }
        }
    }

    // Check for unknown fields (strict mode)
    if (strict) {
        const knownFields = new Set(Object.keys(schema));
        for (const key of Object.keys(data)) {
            if (!knownFields.has(key)) {
                errors.push(formatError(basePath ? `${basePath}.${key}` : key, 'unknown field'));
            }
        }
    }

    return errors;
}

// =============================================================================
// COMMON VALIDATION PATTERNS
// =============================================================================

/**
 * Validate operations array (present in most modules)
 */
export function validateOperations(operations, allowedOps, path = 'operations') {
    const errors = [];

    if (!isArray(operations, 'string')) {
        errors.push(formatError(path, 'must be an array of strings'));
        return errors;
    }

    for (const op of operations) {
        if (!allowedOps.includes(op)) {
            errors.push(formatError(path, `invalid operation "${op}"`, `one of: ${allowedOps.join(', ')}`));
        }
    }

    return errors;
}

/**
 * Validate math.range object (common pattern)
 */
export function validateMathRange(range, path = 'math.range') {
    const errors = [];

    if (!isObject(range)) {
        errors.push(formatError(path, 'must be an object'));
        return errors;
    }

    if (range.min !== undefined && !isNumber(range.min)) {
        errors.push(formatError(`${path}.min`, 'must be a number'));
    }
    if (range.max !== undefined && !isNumber(range.max)) {
        errors.push(formatError(`${path}.max`, 'must be a number'));
    }
    if (isNumber(range.min) && isNumber(range.max) && range.min > range.max) {
        errors.push(formatError(path, 'min cannot be greater than max'));
    }

    return errors;
}

/**
 * Validate presentation.styles array (common pattern)
 */
export function validateStyles(styles, allowedStyles = null, path = 'presentation.styles') {
    const errors = [];

    if (!isArray(styles, 'string')) {
        errors.push(formatError(path, 'must be an array of strings'));
        return errors;
    }

    if (allowedStyles) {
        for (const style of styles) {
            if (!allowedStyles.includes(style)) {
                errors.push(formatError(path, `invalid style "${style}"`, `one of: ${allowedStyles.join(', ')}`));
            }
        }
    }

    return errors;
}

export default {
    // Type validators
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    isOneOf,
    isInRange,

    // Structure validators
    isValidRange,
    isValidRangeWithInterval,
    isValidGaps,
    isValidSequence,

    // Error formatting
    formatError,
    validationResult,

    // Field validation
    validateField,
    validateObject,

    // Common patterns
    validateOperations,
    validateMathRange,
    validateStyles
};
