/**
 * C04 Module Series: Problem Solving
 * Covers Years 1-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C04_Y1_CALC: {
        1: {
            operations: ["simple_addition_word", "simple_subtraction_word", "missing_addend"],
            math: { range: { min: 1, max: 10 }, config: { allowZero: false } },
            presentation: { contexts: ["objects"], format: "multiple_choice" }
        },
        2: {
            operations: ["simple_addition_word", "simple_subtraction_word", "missing_addend"],
            math: { range: { min: 0, max: 15 }, config: { allowZero: true } },
            presentation: { contexts: ["objects", "toys"], format: "multiple_choice" }
        },
        3: {
            operations: ["simple_addition_word", "reversed_equation"],
            math: { range: { min: 0, max: 20 }, config: { allowZero: true } },
            presentation: { contexts: ["objects"], format: "text_input" }
        },
        4: {
            operations: ["simple_addition_word", "simple_subtraction_word", "reversed_equation", "missing_addend"],
            math: { range: { min: 0, max: 30 }, config: { allowZero: true } },
            presentation: { contexts: ["objects", "toys", "fruit"], format: "text_input" }
        }
    },
    C04_Y2_CALC: {
        1: {
            operations: ["simple_addition_word", "money_problems_simple"],
            math: { range: { min: 0, max: 50 }, config: { allowZero: true } },
            presentation: { contexts: ["objects", "money_pence"], format: "multiple_choice" }
        },
        2: {
            operations: ["simple_addition_word", "simple_subtraction_word", "money_problems_simple", "money_problems_mixed"],
            math: { range: { min: 0, max: 75 }, config: { allowZero: true, allowSingleCarry: true } },
            presentation: { contexts: ["objects", "money_pence", "money_mixed", "length_cm", "mass_kg"], format: "multiple_choice" }
        },
        3: {
            operations: ["simple_addition_word", "simple_subtraction_word", "money_problems_simple", "money_problems_mixed", "multiplication_arrays", "division_grouping"],
            math: { range: { min: 0, max: 100 }, tables: [2, 5, 10], config: { allowZero: true, allowSingleCarry: true } },
            presentation: { contexts: ["objects", "money_pence", "money_mixed", "money_pounds", "length_cm", "length_m", "mass_kg", "capacity_l", "quantities"], format: "multiple_choice", styles: ["word_problem", "pictorial"] }
        },
        4: {
            operations: ["simple_addition_word", "simple_subtraction_word", "money_problems_simple", "money_problems_mixed", "multiplication_arrays", "division_grouping", "two_step_simple"],
            math: { range: { min: 0, max: 200 }, tables: [2, 3, 4, 5, 10], config: { allowZero: true, allowSingleCarry: true, allowMultiCarry: true } },
            presentation: { contexts: ["objects", "money_pence", "money_mixed", "money_pounds", "length_cm", "length_m", "mass_kg", "capacity_l", "quantities", "abstract"], format: "text_input", styles: ["word_problem", "pictorial"] }
        }
    },
    C04_Y4_CALC: {
        1: {
            operations: ["combine_then_remove", "remove_then_add"],
            math: { range: { min: 1, max: 100 }, steps: 2, config: { allowZero: false } },
            presentation: { contexts: ["objects"], format: "multiple_choice" }
        },
        2: {
            operations: ["combine_then_remove", "remove_then_add", "multiply_then_add", "multiply_then_subtract"],
            math: { range: { min: 1, max: 500 }, steps: 2, multiplier: { min: 2, max: 5 }, config: { allowZero: false } },
            presentation: { contexts: ["objects", "money", "measures"], format: "multiple_choice" }
        },
        3: {
            operations: ["combine_then_remove", "remove_then_add", "multiply_then_add", "multiply_then_subtract", "divide_then_add", "divide_then_subtract", "scaling_problem", "correspondence_problem"],
            math: { range: { min: 1, max: 1000 }, steps: 2, multiplier: { min: 2, max: 9 }, divisor: { min: 2, max: 10 }, scaleFactor: { min: 2, max: 10 }, config: { allowZero: false, ensureDivisible: true } },
            presentation: { contexts: ["objects", "money", "measures", "real_world"], format: "text_input" }
        },
        4: {
            operations: ["combine_then_remove", "remove_then_add", "multiply_then_add", "multiply_then_subtract", "divide_then_add", "divide_then_subtract", "scaling_problem", "correspondence_problem", "three_step_mixed"],
            math: { range: { min: 1, max: 2000 }, steps: 3, multiplier: { min: 2, max: 12 }, divisor: { min: 2, max: 12 }, scaleFactor: { min: 2, max: 20 }, config: { allowZero: false, ensureDivisible: true } },
            presentation: { contexts: ["objects", "money", "measures", "real_world", "abstract"], format: "text_input" }
        }
    }
};

export const C04_MODULES = {
    'C04_Y1_CALC': { id: 'C04_Y1_CALC', name: 'C04_Y1_CALC: One-Step Problems', ref: 'C4', yearGroup: '1', strand: 'Calculation', substrand: 'Word problems', parameters: MIGRATED_PARAMS['C04_Y1_CALC'] },
    'C04_Y2_CALC': { id: 'C04_Y2_CALC', name: 'C04_Y2_CALC: One-Step 100', ref: 'C4', yearGroup: '2', strand: 'Calculation', substrand: 'Word problems', parameters: MIGRATED_PARAMS['C04_Y2_CALC'] },
    'C04_Y4_CALC': { id: 'C04_Y4_CALC', name: 'C04_Y4_CALC: Two-Step Problems', ref: 'C4', yearGroup: '4', strand: 'Calculation', substrand: 'Word problems', parameters: MIGRATED_PARAMS['C04_Y4_CALC'] }
};
