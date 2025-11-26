/**
 * Number Strand Schema (N01-N06)
 *
 * Defines all valid parameter fields for Number and Place Value modules.
 * Provides strict validation for each module series.
 *
 * Module Series:
 * - N01: Counting in Multiples (Y1-Y5)
 * - N02: Read, Write, Order, Compare (Y1-Y6)
 * - N03: Place Value & Roman Numerals (Y2-Y6)
 * - N04: Identify, Represent, Estimate, Round (Y1-Y6)
 * - N05: Negative Numbers (Y4-Y6)
 * - N06: Number Problems (Y2-Y6)
 */

import {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    isOneOf,
    formatError,
    validateObject,
    validateMathRange
} from './validators.js';

// =============================================================================
// N01 SCHEMA: Counting in Multiples
// =============================================================================

const N01_SCHEMA = {
    // N01 does not use operations array (implicit from module)
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: true,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            sequence: {
                type: 'object',
                required: true,
                structure: {
                    steps: 'array<number>',
                    length: 'number',
                    directions: 'array<string>',
                    startStrategy: 'string',
                    // Y2 specific fields
                    tensFromAny: 'boolean',
                    tensRange: 'array<number>'
                },
                allowUnknown: false
            }
        }
    },
    presentation: {
        type: 'object',
        required: true,
        structure: {
            gaps: {
                type: 'object',
                required: true,
                structure: {
                    position: 'string',
                    count: 'number'
                }
            }
        }
    }
};

// Valid values for N01 fields
const N01_VALID_VALUES = {
    directions: ['forwards', 'backwards'],
    startStrategy: ['zero_only', 'zero_or_multiple', 'any', 'non_zero', 'positive_only'],
    gapPosition: ['start', 'middle', 'end', 'random']
};

// =============================================================================
// N02 SCHEMA: Read, Write, Order, Compare
// =============================================================================

const N02_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: true,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            words: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            order: {
                type: 'object',
                required: false,
                structure: {
                    countMax: 'number'
                }
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            styles: 'array<string>'
        }
    }
};

const N02_VALID_VALUES = {
    operations: [
        'identify_numeral', 'one_more', 'one_less', 'ten_more', 'ten_less',
        'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less',
        'ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less',
        'million_more', 'million_less', 'ten_million_more', 'ten_million_less',
        'numeral_to_word', 'word_to_numeral',
        'compare_two', 'use_symbols',
        'order_two', 'order_three', 'order_four', 'order_five', 'order_six',
        'complete_statement', 'true_false', 'between',
        'place_value_comparison', 'complex_more_less'
    ],
    styles: ['multiple_choice', 'text_input']
};

// =============================================================================
// N03 SCHEMA: Place Value & Roman Numerals
// =============================================================================

const N03_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: true,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            placeValue: {
                type: 'object',
                required: false,
                structure: {
                    places: 'array<string>',
                    includeZero: 'boolean'
                }
            },
            decomposition: {
                type: 'object',
                required: false,
                structure: {
                    format: 'string'
                }
            },
            roman: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number',
                    operations: 'array<string>',
                    years: 'array<number>'
                }
            }
        }
    }
    // N03 has no presentation block typically
};

const N03_VALID_VALUES = {
    operations: [
        'identify_digit', 'identify_place_value', 'digit_value', 'compare_place_values',
        'compose_simple', 'decompose_simple', 'expanded_form', 'standard_from_expanded',
        'alternative_decomposition', 'multiple_representations', 'zero_value', 'zero_concept',
        'place_comparison', 'complex_place_value',
        'roman_to_arabic', 'arabic_to_roman', 'roman_compare', 'roman_order',
        'roman_sequence', 'roman_simple', 'roman_year', 'roman_complex'
    ],
    places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'],
    decompositionFormat: ['simple', 'both', 'all'],
    romanOperations: ['roman_to_arabic', 'arabic_to_roman', 'roman_compare', 'roman_order', 'roman_sequence']
};

// =============================================================================
// N04 SCHEMA: Identify, Represent, Estimate, Round
// =============================================================================

const N04_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: true,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            estimation: {
                type: 'object',
                required: false,
                structure: {
                    ranges: 'array<any>' // Array of [min, max] arrays
                }
            },
            placeValue: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number'
                }
            },
            rounding: {
                type: 'object',
                required: false,
                structure: {
                    bases: 'array<number>'
                }
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            numberLine: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number'
                }
            },
            objects: {
                type: 'object',
                required: false,
                structure: {
                    types: 'array<string>'
                }
            },
            comparison: {
                type: 'object',
                required: false,
                structure: {
                    words: 'array<string>'
                }
            }
        }
    }
};

const N04_VALID_VALUES = {
    operations: [
        'number_line_position', 'number_line_between', 'number_line_jump', 'number_line_multiple_positions',
        'count_objects', 'compare_language', 'identify_most_least',
        'estimate_group', 'estimate_position', 'estimate_calculation', 'estimate_midpoint',
        'place_value_representation', 'partition_number', 'compare_representations',
        'round_to_ten', 'round_to_hundred', 'round_to_thousand',
        'round_to_ten_thousand', 'round_to_hundred_thousand', 'round_to_million', 'round_to_ten_million',
        'round_to_any_place', 'compare_rounded', 'choose_appropriate_rounding', 'error_bounds'
    ],
    objectTypes: ['dots', 'stars', 'circles', 'blocks', 'tallies'],
    comparisonWords: ['equal to', 'more than', 'less than', 'fewer', 'most', 'least']
};

// =============================================================================
// N05 SCHEMA: Negative Numbers
// =============================================================================

const N05_SCHEMA = {
    // N05 may not have operations array
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: true,
                structure: {
                    min: 'number',
                    max: 'number',
                    // Context-specific ranges
                    temp: 'array<number>',
                    elevation: 'array<number>'
                },
                allowUnknown: false
            },
            sequence: {
                type: 'object',
                required: false,
                structure: {
                    steps: 'array<number>',
                    length: 'number',
                    directions: 'array<string>',
                    startStrategy: 'string'
                }
            },
            mustCrossZero: 'boolean'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            gaps: {
                type: 'object',
                required: false,
                structure: {
                    position: 'string',
                    count: 'number'
                }
            },
            contexts: 'array<string>',
            intervalTypes: 'array<string>'
        }
    }
};

const N05_VALID_VALUES = {
    directions: ['forwards', 'backwards'],
    startStrategy: ['any', 'positive_only', 'negative_only'],
    gapPosition: ['start', 'middle', 'end', 'random'],
    contexts: ['temperature', 'elevation', 'sequence', 'number_line', 'time'],
    intervalTypes: ['simple', 'multi_step', 'word_problem']
};

// =============================================================================
// N06 SCHEMA: Number Problems
// =============================================================================

const N06_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: true,
                structure: {
                    min: 'number',
                    max: 'number',
                    // Extended range fields
                    negative: 'array<number>',
                    interval: 'array<number>'
                },
                allowUnknown: false
            },
            sequence: {
                type: 'object',
                required: false,
                structure: {
                    steps: 'array<number>'
                }
            },
            steps: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            rounding: {
                type: 'object',
                required: false,
                structure: {
                    bases: 'array<number>'
                }
            },
            roman: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            complexity: 'string'
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            contexts: 'array<string>'
        }
    }
};

const N06_VALID_VALUES = {
    operations: [
        'counting_problems', 'place_value_problems', 'comparison_problems',
        'number_line_problems', 'representation_problems', 'multi_step_problems',
        'place_value_comparison_problems', 'rounding_estimation_problems',
        'negative_number_problems', 'counting_with_powers', 'negative_context_problems',
        'large_place_value_problems', 'multi_level_rounding_problems',
        'ordering_comparing_large_numbers', 'negative_interval_problems', 'multi_concept_integration'
    ],
    complexity: ['single_step', 'single_or_two_step', 'two_step', 'multi_step'],
    contexts: ['simple', 'varied', 'mixed', 'complex', 'practical', 'large_numbers', 'multi_concept']
};

// =============================================================================
// SCHEMA EXPORTS
// =============================================================================

export const NumberSchema = {
    N01: N01_SCHEMA,
    N02: N02_SCHEMA,
    N03: N03_SCHEMA,
    N04: N04_SCHEMA,
    N05: N05_SCHEMA,
    N06: N06_SCHEMA
};

export const NumberValidValues = {
    N01: N01_VALID_VALUES,
    N02: N02_VALID_VALUES,
    N03: N03_VALID_VALUES,
    N04: N04_VALID_VALUES,
    N05: N05_VALID_VALUES,
    N06: N06_VALID_VALUES
};

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Get the schema for a Number strand module
 * @param {string} moduleId - Module ID (e.g., 'N01_Y2_NPV')
 * @returns {object|null} Schema definition or null if not found
 */
export function getNumberSchema(moduleId) {
    const series = moduleId.substring(0, 3); // Extract 'N01', 'N02', etc.
    return NumberSchema[series] || null;
}

/**
 * Get valid values for a Number strand module
 * @param {string} moduleId - Module ID
 * @returns {object|null} Valid values or null if not found
 */
export function getNumberValidValues(moduleId) {
    const series = moduleId.substring(0, 3);
    return NumberValidValues[series] || null;
}

/**
 * Validate parameters for a Number strand module
 * @param {string} moduleId - Module ID (e.g., 'N01_Y2_NPV')
 * @param {number} level - Difficulty level (1-4)
 * @param {object} params - Parameters to validate
 * @returns {string[]} Array of error messages (empty if valid)
 */
export function validateNumber(moduleId, level, params) {
    const errors = [];
    const series = moduleId.substring(0, 3);
    const schema = NumberSchema[series];
    const validValues = NumberValidValues[series];

    if (!schema) {
        errors.push(`Unknown Number module series: ${series}`);
        return errors;
    }

    // Basic structure validation
    if (!isObject(params)) {
        errors.push('Parameters must be an object');
        return errors;
    }

    // Validate against schema structure
    errors.push(...validateObject(params, schema, '', true));

    // Validate specific field values
    if (validValues && params.operations) {
        for (const op of params.operations) {
            if (validValues.operations && !validValues.operations.includes(op)) {
                errors.push(formatError('operations', `invalid operation "${op}"`));
            }
        }
    }

    // Validate math.range if present
    if (params.math?.range) {
        errors.push(...validateMathRange(params.math.range));
    }

    // Validate sequence directions if present
    if (params.math?.sequence?.directions && validValues?.directions) {
        for (const dir of params.math.sequence.directions) {
            if (!validValues.directions.includes(dir)) {
                errors.push(formatError('math.sequence.directions', `invalid direction "${dir}"`));
            }
        }
    }

    // Validate startStrategy if present
    if (params.math?.sequence?.startStrategy && validValues?.startStrategy) {
        if (!validValues.startStrategy.includes(params.math.sequence.startStrategy)) {
            errors.push(formatError('math.sequence.startStrategy',
                `invalid value "${params.math.sequence.startStrategy}"`));
        }
    }

    // Validate gap position if present
    if (params.presentation?.gaps?.position && validValues?.gapPosition) {
        if (!validValues.gapPosition.includes(params.presentation.gaps.position)) {
            errors.push(formatError('presentation.gaps.position',
                `invalid value "${params.presentation.gaps.position}"`));
        }
    }

    // Validate complexity if present (N06)
    if (params.math?.complexity && validValues?.complexity) {
        if (!validValues.complexity.includes(params.math.complexity)) {
            errors.push(formatError('math.complexity',
                `invalid value "${params.math.complexity}"`));
        }
    }

    // Validate contexts if present
    if (params.presentation?.contexts && validValues?.contexts) {
        for (const ctx of params.presentation.contexts) {
            if (!validValues.contexts.includes(ctx)) {
                errors.push(formatError('presentation.contexts', `invalid context "${ctx}"`));
            }
        }
    }

    return errors;
}

export default {
    NumberSchema,
    NumberValidValues,
    getNumberSchema,
    getNumberValidValues,
    validateNumber
};
