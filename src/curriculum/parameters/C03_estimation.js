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
        }
        // ... L3, L4
    },
    C03_Y3_CALC: {
        1: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable"],
            math: { range: { min: 10, max: 100 }, rounding: { bases: [10] }, calcTypes: ["addition", "subtraction"], config: { use3digit: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        3: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable", "find_error", "choose_rounding_place"],
            math: { range: { min: 10, max: 999 }, rounding: { bases: [10, 100] }, calcTypes: ["addition", "subtraction"], config: { use3digit: true } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        }
    },
    C03_Y4_CALC: {
        1: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable"],
            math: { range: { min: 100, max: 5000 }, rounding: { bases: [100, 1000] }, calcTypes: ["addition", "subtraction"], config: { includeMult: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        3: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable", "check_multiply_with_divide", "check_divide_with_multiply", "choose_best_estimate"],
            math: { range: { min: 100, max: 9999 }, rounding: { bases: [10, 100, 1000] }, calcTypes: ["addition", "subtraction", "multiplication", "division"], config: { includeMult: true, tables: [2,3,4,5,6,7,8,9,10,11,12] } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        }
    }
};

export const C03_MODULES = {
    'C03_Y2_CALC': { id: 'C03_Y2_CALC', name: 'C03_Y2_CALC: Inverse', ref: 'C3', yearGroup: 'Year 2', parameters: MIGRATED_PARAMS['C03_Y2_CALC'] },
    'C03_Y3_CALC': { id: 'C03_Y3_CALC', name: 'C03_Y3_CALC: Estimation', ref: 'C3', yearGroup: 'Year 3', parameters: MIGRATED_PARAMS['C03_Y3_CALC'] },
    'C03_Y4_CALC': { id: 'C03_Y4_CALC', name: 'C03_Y4_CALC: Estimation 4-Digit', ref: 'C3', yearGroup: 'Year 4', parameters: MIGRATED_PARAMS['C03_Y4_CALC'] }
};