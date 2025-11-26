/**
 * C03 Module Series: Estimation, Inverses and Checking
 * Covers Years 2-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C03_Y2_CALC: {
        1: {
            operations: ["identify_inverse_check", "missing_number_inverse", "true_false_check"],
            math: { range: { min: 1, max: 20 }, config: { factFamilyComplete: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        2: {
            operations: ["identify_inverse_check", "missing_number_inverse", "true_false_check", "complete_fact_family"],
            math: { range: { min: 1, max: 50 }, config: { factFamilyComplete: true, multiples10: true } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        3: {
            operations: ["identify_inverse_check", "missing_number_inverse", "true_false_check", "complete_fact_family", "check_calculation"],
            math: {
                range: { min: 1, max: 100 },
                config: { factFamilyComplete: true, multiples10: true, allowTwoDigit: true, crossTens: true }
            },
            presentation: { formats: ["multiple_choice", "true_false", "text_input"], contexts: ["abstract", "word_problem"] }
        },
        4: {
            operations: ["identify_inverse_check", "missing_number_inverse", "true_false_check", "complete_fact_family", "check_calculation", "find_error_inverse"],
            math: {
                range: { min: 1, max: 200 },
                config: { factFamilyComplete: true, multiples10: true, allowTwoDigit: true, crossTens: true, crossHundreds: true, multipleSteps: true }
            },
            presentation: { formats: ["text_input"], contexts: ["abstract", "word_problem", "reasoning"] }
        }
    },
    C03_Y3_CALC: {
        1: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable"],
            math: { range: { min: 10, max: 100 }, rounding: { bases: [10] }, calcTypes: ["addition", "subtraction"], config: { use3digit: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        2: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable"],
            math: { range: { min: 10, max: 500 }, rounding: { bases: [10, 100] }, calcTypes: ["addition", "subtraction"], config: { use3digit: true } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        3: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable", "find_error", "choose_rounding_place"],
            math: { range: { min: 10, max: 999 }, rounding: { bases: [10, 100] }, calcTypes: ["addition", "subtraction"], config: { use3digit: true } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        4: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable", "find_error", "choose_rounding_place", "multi_step_check"],
            math: { range: { min: 100, max: 1999 }, rounding: { bases: [10, 100, 1000] }, calcTypes: ["addition", "subtraction", "mixed"], config: { use3digit: true, allowMultiStep: true } },
            presentation: { formats: ["multiple_choice", "true_false", "text_input"] }
        }
    },
    C03_Y4_CALC: {
        1: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable"],
            math: { range: { min: 100, max: 5000 }, rounding: { bases: [100, 1000] }, calcTypes: ["addition", "subtraction"], config: { includeMult: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        2: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable", "check_multiply_with_divide"],
            math: { range: { min: 100, max: 7500 }, rounding: { bases: [100, 1000] }, calcTypes: ["addition", "subtraction", "multiplication"], config: { includeMult: true, tables: [2, 3, 4, 5, 10] } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        3: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable", "check_multiply_with_divide", "check_divide_with_multiply", "choose_best_estimate"],
            math: { range: { min: 100, max: 9999 }, rounding: { bases: [10, 100, 1000] }, calcTypes: ["addition", "subtraction", "multiplication", "division"], config: { includeMult: true, tables: [2,3,4,5,6,7,8,9,10,11,12] } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        4: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable", "check_multiply_with_divide", "check_divide_with_multiply", "choose_best_estimate", "multi_step_check"],
            math: { range: { min: 100, max: 99999 }, rounding: { bases: [10, 100, 1000, 10000] }, calcTypes: ["addition", "subtraction", "multiplication", "division"], config: { includeMult: true, tables: [2,3,4,5,6,7,8,9,10,11,12,13,14,15], multiStepProblems: true } },
            presentation: { formats: ["multiple_choice", "true_false", "text_input"] }
        }
    }
};

export const C03_MODULES = {
    'C03_Y2_CALC': { id: 'C03_Y2_CALC', name: 'C03_Y2_CALC: Inverse', ref: 'C3', yearGroup: '2', strand: 'Calculation', substrand: 'Estimation and checking', parameters: MIGRATED_PARAMS['C03_Y2_CALC'] },
    'C03_Y3_CALC': { id: 'C03_Y3_CALC', name: 'C03_Y3_CALC: Estimation', ref: 'C3', yearGroup: '3', strand: 'Calculation', substrand: 'Estimation and checking', parameters: MIGRATED_PARAMS['C03_Y3_CALC'] },
    'C03_Y4_CALC': { id: 'C03_Y4_CALC', name: 'C03_Y4_CALC: Estimation 4-Digit', ref: 'C3', yearGroup: '4', strand: 'Calculation', substrand: 'Estimation and checking', parameters: MIGRATED_PARAMS['C03_Y4_CALC'] }
};
