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
        3: {
            operations: ["simple_addition_word", "reversed_equation"],
            math: { range: { min: 0, max: 20 }, config: { allowZero: true } },
            presentation: { contexts: ["objects"], format: "text_input" }
        }
    },
    C04_Y2_CALC: {
        1: {
            operations: ["simple_addition_word", "money_problems_simple"],
            math: { range: { min: 0, max: 50 }, config: { allowZero: true } },
            presentation: { contexts: ["objects", "money_pence"], format: "multiple_choice" }
        }
    },
    C04_Y4_CALC: {
        1: {
            operations: ["combine_then_remove", "remove_then_add"],
            math: { range: { min: 1, max: 100 }, steps: 2, config: { allowZero: false } },
            presentation: { contexts: ["objects"], format: "multiple_choice" }
        }
    }
};

export const C04_MODULES = {
    'C04_Y1_CALC': { id: 'C04_Y1_CALC', name: 'C04_Y1_CALC: One-Step Problems', ref: 'C4', parameters: MIGRATED_PARAMS['C04_Y1_CALC'] },
    'C04_Y2_CALC': { id: 'C04_Y2_CALC', name: 'C04_Y2_CALC: One-Step 100', ref: 'C4', parameters: MIGRATED_PARAMS['C04_Y2_CALC'] },
    'C04_Y4_CALC': { id: 'C04_Y4_CALC', name: 'C04_Y4_CALC: Two-Step Problems', ref: 'C4', parameters: MIGRATED_PARAMS['C04_Y4_CALC'] }
};