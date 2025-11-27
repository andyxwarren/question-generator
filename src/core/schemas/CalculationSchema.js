/**
 * Calculation Strand Schema (C01-C09)
 *
 * Defines all valid parameter fields for Calculation modules.
 * Provides strict validation for each module series.
 *
 * Module Series:
 * - C01: Mental Addition/Subtraction (Y1, Y2, Y3, Y5)
 * - C02: Written Addition/Subtraction (Y1-Y5)
 * - C03: Estimation, Inverses, Checking (Y2-Y6)
 * - C04: Problem Solving (Y1-Y6)
 * - C05: Properties of Number (Y5-Y6)
 * - C06: Mental Multiplication/Division (Y2-Y6)
 * - C07: Written Multiplication/Division (Y2-Y6)
 * - C08: Properties Problems (Y1-Y6)
 * - C09: Order of Operations (Y6)
 */

import {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    formatError,
    validateObject,
    validateMathRange
} from './validators.js';

// =============================================================================
// C01 SCHEMA: Mental Addition/Subtraction
// =============================================================================

const C01_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number',
                    min: 'number',
                    basicMax: 'number',    // Y2 specific
                    derivedMax: 'number',  // Y2 specific
                    min3: 'number',        // Y3 specific
                    max3: 'number'         // Y3 specific
                },
                allowUnknown: false
            },
            targets: 'array<number>',
            components: {
                type: 'object',
                required: false,
                structure: {
                    ones: 'array<number>',
                    tens: 'array<number>',
                    hundreds: 'array<number>',
                    powers: 'array<number>'
                },
                allowUnknown: false
            },
            config: {
                type: 'object',
                required: false,
                structure: {
                    allowZero: 'boolean',
                    factFamilies: 'boolean',
                    multiplesOf10: 'boolean',
                    cross10: 'boolean',
                    avoidBridging: 'boolean',
                    complexBridging: 'boolean',
                    strategies: 'boolean',
                    complex: 'boolean'
                },
                allowUnknown: false
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

const C01_VALID_VALUES = {
    operations: [
        'number_bonds', 'missing_part', 'related_facts', 'simple_add_sub', 'fact_families',
        'mixed_operations', 'two_step_bonds', 'recall_to_20', 'derive_to_100', 'missing_addend',
        'related_subtract', 'inverse_operations', 'fact_families_100', 'near_multiples',
        'add_ones', 'subtract_ones', 'add_tens', 'subtract_tens', 'add_hundreds', 'subtract_hundreds',
        'two_step_mental', 'add_multiples_10', 'subtract_multiples_10', 'add_multiples_100',
        'subtract_multiples_100', 'add_multiples_1000', 'subtract_multiples_1000',
        'add_ones_to_4digit', 'subtract_ones_from_4digit', 'add_any_to_4digit', 'subtract_any_from_4digit',
        'add_any_to_large', 'subtract_any_from_large', 'compensation', 'partitioning',
        'near_multiples_large', 'multi_step_mental'
    ],
    styles: ['equation', 'word_problem', 'part_whole', 'missing_number', 'reasoning', 'multi_step']
};

// =============================================================================
// C02 SCHEMA: Written Addition/Subtraction
// =============================================================================

const C02_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number',
                    min: 'number',
                    result: 'array<number>',
                    max_2digit: 'number',
                    min3: 'number',
                    max3: 'number',
                    resultMax: 'number',
                    min4: 'number',
                    max4: 'number'
                },
                allowUnknown: false
            },
            components: {
                type: 'object',
                required: false,
                structure: {
                    ones: 'array<number>',
                    tens: 'array<number>'
                }
            },
            config: {
                type: 'object',
                required: false,
                structure: {
                    allowZero: 'boolean',
                    missingPositions: 'array<string>',
                    avoidBridging: 'boolean',
                    avoidCarry: 'boolean',
                    threeNumbersMax: 'number',
                    complexity: 'boolean',
                    noCarry: 'boolean',
                    noBorrow: 'boolean',
                    allowSingleCarry: 'boolean',
                    allowMultiCarry: 'boolean',
                    exceed1000: 'boolean',
                    exceed10000: 'boolean',
                    digits: 'any'  // Can be number or array
                },
                allowUnknown: false
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            styles: 'array<string>',
            hint: 'string'
        }
    }
};

const C02_VALID_VALUES = {
    operations: [
        'simple_addition', 'simple_subtraction', 'missing_addend', 'missing_subtrahend',
        'missing_minuend', 'symbol_interpretation', 'equation_completion', 'true_false_equations',
        'two_step_problems', 'complex_missing', 'twodigit_plus_ones', 'twodigit_minus_ones',
        'twodigit_plus_tens', 'twodigit_minus_tens', 'twodigit_plus_twodigit', 'twodigit_minus_twodigit',
        'three_onedigit', 'mixed_operations', 'addition_no_carry', 'subtraction_no_borrow',
        'addition_simple_carry', 'subtraction_simple_borrow', 'addition_with_carry', 'subtraction_with_borrow',
        'mixed_difficulty', 'crossing_1000', 'crossing_10000', 'missing_digit_problems',
        'large_numbers', 'multi_step_problems'
    ],
    styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step', 'problem_solving'],
    missingPositions: ['start', 'middle', 'end', 'multiple']
};

// =============================================================================
// C03 SCHEMA: Estimation, Inverses, Checking
// =============================================================================

const C03_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
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
            calcTypes: 'array<string>',
            config: {
                type: 'object',
                required: false,
                structure: {
                    factFamilyComplete: 'boolean',
                    multiples10: 'boolean',
                    use3digit: 'boolean',
                    includeMult: 'boolean',
                    tables: 'array<number>',
                    allowTwoDigit: 'boolean',
                    crossTens: 'boolean',
                    crossHundreds: 'boolean',
                    multipleSteps: 'boolean',
                    allowMultiStep: 'boolean',
                    multiStepProblems: 'boolean'
                },
                allowUnknown: false
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            formats: 'array<string>',
            contexts: 'array<string>'
        }
    }
};

const C03_VALID_VALUES = {
    operations: [
        'identify_inverse_check', 'missing_number_inverse', 'true_false_check', 'complete_fact_family',
        'estimate_by_rounding', 'check_with_inverse', 'is_reasonable', 'find_error', 'choose_rounding_place',
        'estimate_4digit', 'check_multiply_with_divide', 'check_divide_with_multiply', 'choose_best_estimate',
        'check_calculation', 'find_error_inverse', 'multi_step_check'
    ],
    calcTypes: ['addition', 'subtraction', 'multiplication', 'division', 'mixed'],
    formats: ['multiple_choice', 'true_false', 'text_input'],
    contexts: ['abstract', 'word_problem', 'measures', 'money', 'real_world']
};

// =============================================================================
// C04 SCHEMA: Problem Solving
// =============================================================================

const C04_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            steps: 'number',  // Scalar (not object) in C04
            tables: 'array<number>',
            multiplier: 'number',
            divisor: 'number',
            scaleFactor: 'number',
            config: {
                type: 'object',
                required: false,
                structure: {
                    allowZero: 'boolean',
                    allowSingleCarry: 'boolean',
                    allowMultiCarry: 'boolean',
                    ensureDivisible: 'boolean'
                }
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            contexts: 'array<string>',
            format: 'string',
            styles: 'array<string>'
        }
    }
};

const C04_VALID_VALUES = {
    operations: [
        'simple_addition_word', 'simple_subtraction_word', 'missing_addend', 'reversed_equation',
        'money_problems_simple', 'combine_then_remove', 'remove_then_add',
        'money_problems_mixed', 'multiplication_arrays', 'division_grouping', 'two_step_simple',
        'multiply_then_add', 'multiply_then_subtract', 'divide_then_add', 'divide_then_subtract',
        'scaling_problem', 'correspondence_problem', 'three_step_mixed'
    ],
    contexts: ['objects', 'money_pence', 'money_pounds', 'measures', 'toys', 'fruit',
               'money_mixed', 'length_cm', 'length_m', 'mass_kg', 'capacity_l',
               'quantities', 'money', 'real_world', 'abstract'],
    format: ['multiple_choice', 'text_input'],
    styles: ['equation', 'word_problem', 'reasoning']
};

// =============================================================================
// C05 SCHEMA: Properties of Number
// =============================================================================

const C05_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            multiples: {
                type: 'object',
                required: false,
                structure: {
                    bases: 'array<number>',
                    range: 'array<number>'
                }
            },
            factors: {
                type: 'object',
                required: false,
                structure: {
                    targets: 'array<number>',
                    targetStr: 'string',
                    maxPairs: 'number'
                },
                allowUnknown: false
            },
            primes: {
                type: 'object',
                required: false,
                structure: {
                    recallRange: 'array<number>',
                    identifyRange: 'array<number>',
                    includeComposite: 'boolean',
                    factorization: 'boolean',
                    range: 'array<number>',
                    listLength: 'number',
                    tests: 'boolean',
                    gaps: 'boolean'
                },
                allowUnknown: false
            },
            powers: {
                type: 'object',
                required: false,
                structure: {
                    squareBases: 'array<number>',
                    cubeBases: 'array<number>',
                    range: 'array<number>',
                    mixed: 'boolean'
                }
            },
            commonFactors: {
                type: 'object',
                required: false,
                structure: {
                    pairs: 'array<any>',
                    range: 'array<number>',
                    threeNumbers: 'boolean',
                    maxFactors: 'number',
                    hcf: 'boolean'
                },
                allowUnknown: false
            },
            commonMultiples: {
                type: 'object',
                required: false,
                structure: {
                    pairs: 'array<any>',
                    range: 'array<number>',
                    lcm: 'boolean',
                    find: 'number',
                    max: 'number',
                    threeNumbers: 'boolean'
                },
                allowUnknown: false
            },
            integration: 'string'
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

const C05_VALID_VALUES = {
    operations: [
        'identify_multiples', 'find_factor_pairs', 'identify_primes', 'squares_cubes',
        'common_factors', 'prime_factors', 'common_multiples', 'integrated'
    ],
    styles: ['direct', 'recognition', 'application', 'reasoning', 'problem_solving'],
    integration: ['two_concepts', 'two_three_concepts', 'three_four_concepts']
};

// =============================================================================
// C06 SCHEMA: Mental Multiplication/Division
// =============================================================================

const C06_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            tables: 'array<number>',
            allTables: 'array<number>',
            multiplier: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            product: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number'
                }
            },
            range: {
                type: 'object',
                required: false,
                structure: {
                    oddEven: 'array<number>',
                    factors: 'array<number>',
                    whole: 'array<number>',
                    num: 'array<number>'
                },
                allowUnknown: false
            },
            powers: 'array<number>',
            decimals: {
                type: 'object',
                required: false,
                structure: {
                    allow: 'boolean',
                    places: 'number'
                }
            },
            config: {
                type: 'object',
                required: false,
                structure: {
                    maxOps: 'number',
                    parentheses: 'boolean',
                    squares: 'boolean',
                    cubes: 'boolean',
                    nestedDepth: 'number'
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

const C06_VALID_VALUES = {
    operations: [
        'multiply_recall', 'divide_recall', 'odd_even_identify', 'odd_even_patterns', 'missing_factor',
        'fact_families_mult', 'multiply_by_0_1', 'multiply_three', 'factor_pairs', 'commutativity',
        'multiply_by_10', 'divide_by_10', 'multiply_by_100', 'divide_by_100', 'multiply_by_1000', 'divide_by_1000',
        'partition_multiply', 'two_operation_add_mult', 'parentheses_simple', 'four_operations',
        'parentheses_nested', 'order_of_operations', 'squares_in_calc',
        'inverse_reasoning', 'mixed_operations', 'three_operations', 'cubes_in_calc', 'mixed_indices'
    ],
    styles: ['equation', 'word_problem', 'reasoning', 'multi_step', 'abstract', 'mixed_operations',
             'missing_number', 'expression_evaluation']
};

// =============================================================================
// C07 SCHEMA: Written Multiplication/Division
// =============================================================================

const C07_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            tables: 'array<number>',
            multiplier: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            product: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number'
                }
            },
            range: {
                type: 'object',
                required: false,
                structure: {
                    multiplicand: 'array<number>',
                    multiplier: 'array<number>',
                    multiply: 'array<number>',
                    divide: 'array<number>'
                },
                allowUnknown: false
            },
            digits: 'any',  // Can be array<number> or object { mult: [...] }
            divisors: 'array<number>',
            factors: {
                type: 'object',
                required: false,
                structure: {
                    mult: 'array<number>',
                    divisor: 'number'
                }
            },
            config: {
                type: 'object',
                required: false,
                structure: {
                    carry: 'any',  // Can be boolean or string "sometimes"
                    remainders: 'boolean',
                    remainderType: 'array<string>',
                    maxCarries: 'number',
                    allowLargeProducts: 'boolean',
                    largeProducts: 'boolean',
                    interpret_remainders: 'boolean',
                    require_reasoning: 'boolean'
                },
                allowUnknown: false
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            styles: 'array<string>',
            contexts: 'array<string>'
        }
    }
};

const C07_VALID_VALUES = {
    operations: [
        'write_multiplication', 'calculate_multiply', 'columnar_multiply', 'grid_method',
        'columnar_multiply_1digit', 'short_division', 'long_multiply_2digit', 'long_division',
        'divide_recall', 'missing_factor', 'commutativity', 'word_problem', 'reasoning',
        'remainder_interpretation'
    ],
    styles: ['equation', 'columnar', 'long_division', 'grid', 'word_problem', 'reasoning', 'grid_method'],
    remainderType: ['whole', 'fraction', 'decimal'],
    contexts: ['abstract', 'measures', 'money', 'real_world', 'shopping']
};

// =============================================================================
// C08 SCHEMA: Properties Problems
// =============================================================================

const C08_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            tables: 'array<number>',
            maxProduct: 'number',
            groups: {
                type: 'object',
                required: false,
                structure: {
                    min: 'number',
                    max: 'number'
                }
            },
            scaling: 'array<number>',
            range: {
                type: 'object',
                required: false,
                structure: {
                    max: 'number'
                },
                allowUnknown: false
            },
            // Y5: factor range for factor/multiple problems
            factors: 'array<number>',
            // Y6: operation count range for multi-step problems
            ops: 'array<number>',
            factorPairs: {
                type: 'object',
                required: false,
                structure: {
                    range: 'array<number>'
                }
            },
            threeNumbers: {
                type: 'object',
                required: false,
                structure: {
                    maxValue: 'number',
                    maxProduct: 'number'
                }
            },
            config: {
                type: 'object',
                required: false,
                structure: {
                    includeZero: 'boolean',
                    includeOne: 'boolean'
                }
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            visuals: 'boolean',
            format: 'string',
            styles: 'array<string>',
            contexts: 'array<string>'
        }
    }
};

const C08_VALID_VALUES = {
    operations: [
        'equal_groups_visual', 'equal_groups', 'array_multiplication', 'integer_scaling',
        'distributive_simple', 'factor_problems', 'multiple_problems', 'two_step_mixed', 'ratio_problems',
        'factor_pairs', 'commutativity', 'three_numbers'
    ],
    format: ['multiple_choice', 'text_input'],
    styles: ['equation', 'word_problem', 'reasoning'],
    contexts: ['abstract', 'measures', 'shopping', 'quantities', 'real_world']
};

// =============================================================================
// C09 SCHEMA: Order of Operations
// =============================================================================

const C09_SCHEMA = {
    operations: { type: 'array<string>', required: true },
    math: {
        type: 'object',
        required: true,
        structure: {
            range: {
                type: 'object',
                required: false,
                structure: {
                    num: 'array<number>'
                }
            },
            config: {
                type: 'object',
                required: false,
                structure: {
                    maxOps: 'number',
                    parentheses: 'boolean'
                }
            }
        }
    },
    presentation: {
        type: 'object',
        required: false,
        structure: {
            format: 'string'
        }
    }
};

const C09_VALID_VALUES = {
    operations: [
        'simple_two_operation', 'order_identification', 'three_operation_mixed', 'complex_parentheses'
    ],
    format: ['multiple_choice', 'text_input']
};

// =============================================================================
// SCHEMA EXPORTS
// =============================================================================

export const CalculationSchema = {
    C01: C01_SCHEMA,
    C02: C02_SCHEMA,
    C03: C03_SCHEMA,
    C04: C04_SCHEMA,
    C05: C05_SCHEMA,
    C06: C06_SCHEMA,
    C07: C07_SCHEMA,
    C08: C08_SCHEMA,
    C09: C09_SCHEMA
};

export const CalculationValidValues = {
    C01: C01_VALID_VALUES,
    C02: C02_VALID_VALUES,
    C03: C03_VALID_VALUES,
    C04: C04_VALID_VALUES,
    C05: C05_VALID_VALUES,
    C06: C06_VALID_VALUES,
    C07: C07_VALID_VALUES,
    C08: C08_VALID_VALUES,
    C09: C09_VALID_VALUES
};

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Get the schema for a Calculation strand module
 * @param {string} moduleId - Module ID (e.g., 'C01_Y2_CALC')
 * @returns {object|null} Schema definition or null if not found
 */
export function getCalculationSchema(moduleId) {
    const series = moduleId.substring(0, 3);
    return CalculationSchema[series] || null;
}

/**
 * Get valid values for a Calculation strand module
 * @param {string} moduleId - Module ID
 * @returns {object|null} Valid values or null if not found
 */
export function getCalculationValidValues(moduleId) {
    const series = moduleId.substring(0, 3);
    return CalculationValidValues[series] || null;
}

/**
 * Validate parameters for a Calculation strand module
 * @param {string} moduleId - Module ID (e.g., 'C01_Y2_CALC')
 * @param {number} level - Difficulty level (1-4)
 * @param {object} params - Parameters to validate
 * @returns {string[]} Array of error messages (empty if valid)
 */
export function validateCalculation(moduleId, level, params) {
    const errors = [];
    const series = moduleId.substring(0, 3);
    const schema = CalculationSchema[series];
    const validValues = CalculationValidValues[series];

    if (!schema) {
        errors.push(`Unknown Calculation module series: ${series}`);
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

    // Validate presentation styles
    if (params.presentation?.styles && validValues?.styles) {
        for (const style of params.presentation.styles) {
            if (!validValues.styles.includes(style)) {
                errors.push(formatError('presentation.styles', `invalid style "${style}"`));
            }
        }
    }

    // Validate calcTypes (C03)
    if (params.math?.calcTypes && validValues?.calcTypes) {
        for (const type of params.math.calcTypes) {
            if (!validValues.calcTypes.includes(type)) {
                errors.push(formatError('math.calcTypes', `invalid calcType "${type}"`));
            }
        }
    }

    // Validate contexts (C04)
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
    CalculationSchema,
    CalculationValidValues,
    getCalculationSchema,
    getCalculationValidValues,
    validateCalculation
};
