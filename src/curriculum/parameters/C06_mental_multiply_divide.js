/**
 * C06: Mental Multiplication and Division
 * Covers Years 2-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C06_Y2_CALC: {
        1: {
            operations: ["multiply_recall", "divide_recall", "odd_even_identify"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 5 }, product: { max: 50 }, range: { oddEven: [1, 20] } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["multiply_recall", "divide_recall", "odd_even_patterns", "missing_factor"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 10 }, product: { max: 100 }, range: { oddEven: [1, 50] } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        3: {
            operations: ["multiply_recall", "divide_recall", "odd_even_patterns", "missing_factor"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 12 }, product: { max: 120 }, range: { oddEven: [1, 100] } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        },
        4: {
            operations: ["multiply_recall", "divide_recall", "odd_even_patterns", "missing_factor", "inverse_reasoning"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 12 }, product: { max: 120 }, range: { oddEven: [1, 200] } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "abstract"] }
        }
    },
    C06_Y3_CALC: {
        1: {
            operations: ["multiply_recall", "divide_recall", "missing_factor"],
            math: { tables: [3, 4], multiplier: { min: 1, max: 6 }, product: { max: 24 } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["multiply_recall", "divide_recall", "missing_factor"],
            math: { tables: [3, 4, 8], multiplier: { min: 1, max: 10 }, product: { max: 80 } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        3: {
            operations: ["multiply_recall", "divide_recall", "missing_factor", "fact_families_mult"],
            math: { tables: [3, 4, 8], multiplier: { min: 1, max: 12 }, product: { max: 96 } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        },
        4: {
            operations: ["multiply_recall", "divide_recall", "missing_factor", "fact_families_mult", "inverse_reasoning"],
            math: { tables: [2, 3, 4, 5, 8, 10], multiplier: { min: 1, max: 12 }, product: { max: 120 } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "mixed_operations"] }
        }
    },
    C06_Y4_CALC: {
        1: {
            operations: ["multiply_recall", "divide_recall", "multiply_by_0_1"],
            math: { tables: [6, 7, 9], allTables: [2,3,4,5,6,7,8,9,10], multiplier: { min: 1, max: 10 } },
            presentation: { styles: ["equation"] }
        },
        2: {
            operations: ["multiply_recall", "divide_recall", "multiply_by_0_1", "multiply_three", "factor_pairs"],
            math: { tables: [6, 7, 9, 11, 12], allTables: [2,3,4,5,6,7,8,9,10,11,12], multiplier: { min: 0, max: 12 }, product: { max: 144 }, range: { factors: [1, 100] } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        3: {
            operations: ["multiply_recall", "divide_recall", "multiply_three", "factor_pairs", "commutativity"],
            math: { tables: [2,3,4,5,6,7,8,9,10,11,12], multiplier: { min: 0, max: 12 }, product: { max: 144 }, range: { factors: [1, 144] } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        },
        4: {
            operations: ["multiply_recall", "divide_recall", "multiply_three", "factor_pairs", "commutativity", "inverse_reasoning", "missing_factor"],
            math: { tables: [2,3,4,5,6,7,8,9,10,11,12], multiplier: { min: 0, max: 15 }, product: { max: 180 }, range: { factors: [1, 180] } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "missing_number"] }
        }
    },
    C06_Y5_CALC: {
        1: {
            operations: ["multiply_by_10", "divide_by_10"],
            math: { tables: [2,3,4,5,6,7,8,9,10,11,12], powers: [10], range: { whole: [1, 100] }, decimals: { allow: true, places: 1 } },
            presentation: { styles: ["equation"] }
        },
        2: {
            operations: ["multiply_by_10", "multiply_by_100", "divide_by_10", "divide_by_100"],
            math: { powers: [10, 100], range: { whole: [1, 1000] }, decimals: { allow: true, places: 1 } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        3: {
            operations: ["multiply_by_1000", "divide_by_1000", "partition_multiply"],
            math: { powers: [10, 100, 1000], range: { whole: [1, 10000] }, decimals: { allow: true, places: 2 } },
            presentation: { styles: ["equation", "reasoning"] }
        },
        4: {
            operations: ["multiply_by_10", "multiply_by_100", "multiply_by_1000", "divide_by_10", "divide_by_100", "divide_by_1000", "partition_multiply", "mixed_operations"],
            math: { powers: [10, 100, 1000], range: { whole: [1, 100000] }, decimals: { allow: true, places: 3 } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "multi_step"] }
        }
    },
    C06_Y6_CALC: {
        1: {
            operations: ["two_operation_add_mult", "parentheses_simple"],
            math: { range: { num: [1, 1000] }, config: { maxOps: 2, parentheses: true } },
            presentation: { styles: ["equation"] }
        },
        2: {
            operations: ["three_operations", "parentheses_nested", "cubes_in_calc"],
            math: { range: { num: [1, 10000] }, config: { maxOps: 3, parentheses: true, cubes: true } },
            presentation: { styles: ["equation", "reasoning"] }
        },
        3: {
            operations: ["four_operations", "parentheses_nested", "order_of_operations", "squares_in_calc"],
            math: { range: { num: [1, 100000] }, config: { maxOps: 4, parentheses: true, squares: true } },
            presentation: { styles: ["equation", "reasoning"] }
        },
        4: {
            operations: ["four_operations", "parentheses_nested", "order_of_operations", "squares_in_calc", "cubes_in_calc", "mixed_indices"],
            math: { range: { num: [1, 1000000] }, config: { maxOps: 5, parentheses: true, squares: true, cubes: true, nestedDepth: 3 } },
            presentation: { styles: ["equation", "reasoning", "expression_evaluation"] }
        }
    }
};

export const C06_MODULES = {
    'C06_Y2_CALC': { id: 'C06_Y2_CALC', name: 'C06_Y2_CALC: 2, 5, 10 Tables', ref: 'C6', yearGroup: '2', strand: 'Calculation', substrand: 'Mental multiply/divide', parameters: MIGRATED_PARAMS['C06_Y2_CALC'] },
    'C06_Y3_CALC': { id: 'C06_Y3_CALC', name: 'C06_Y3_CALC: 3, 4, 8 Tables', ref: 'C6', yearGroup: '3', strand: 'Calculation', substrand: 'Mental multiply/divide', parameters: MIGRATED_PARAMS['C06_Y3_CALC'] },
    'C06_Y4_CALC': { id: 'C06_Y4_CALC', name: 'C06_Y4_CALC: 12x12 Tables', ref: 'C6', yearGroup: '4', strand: 'Calculation', substrand: 'Mental multiply/divide', parameters: MIGRATED_PARAMS['C06_Y4_CALC'] },
    'C06_Y5_CALC': { id: 'C06_Y5_CALC', name: 'C06_Y5_CALC: Powers of 10', ref: 'C6', yearGroup: '5', strand: 'Calculation', substrand: 'Mental multiply/divide', parameters: MIGRATED_PARAMS['C06_Y5_CALC'] },
    'C06_Y6_CALC': { id: 'C06_Y6_CALC', name: 'C06_Y6_CALC: Mixed Ops', ref: 'C6', yearGroup: '6', strand: 'Calculation', substrand: 'Mental multiply/divide', parameters: MIGRATED_PARAMS['C06_Y6_CALC'] }
};
