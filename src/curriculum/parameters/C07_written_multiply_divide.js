/**
 * C07: Written Multiplication and Division
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C07_Y2_CALC: {
        1: {
            operations: ["write_multiplication", "calculate_multiply"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 5 }, product: { max: 50 } },
            presentation: { styles: ["equation"] }
        },
        2: {
            operations: ["write_multiplication", "calculate_multiply", "divide_recall"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 8 }, product: { max: 80 } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        3: {
            operations: ["write_multiplication", "calculate_multiply", "divide_recall", "missing_factor"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 12 }, product: { max: 120 } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        },
        4: {
            operations: ["write_multiplication", "calculate_multiply", "divide_recall", "missing_factor", "commutativity"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 12 }, product: { max: 120 } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        }
    },
    C07_Y3_CALC: {
        1: {
            operations: ["columnar_multiply"],
            math: { range: { multiplicand: [11, 33], multiplier: [2, 3] }, config: { carry: false } },
            presentation: { styles: ["columnar"] }
        },
        2: {
            operations: ["columnar_multiply"],
            math: { range: { multiplicand: [11, 49], multiplier: [2, 5] }, config: { carry: true, maxCarries: 1 } },
            presentation: { styles: ["columnar"] }
        },
        3: {
            operations: ["columnar_multiply"],
            math: { range: { multiplicand: [11, 99], multiplier: [2, 9] }, config: { carry: true } },
            presentation: { styles: ["columnar", "word_problem"] }
        },
        4: {
            operations: ["columnar_multiply"],
            math: { range: { multiplicand: [11, 99], multiplier: [2, 12] }, config: { carry: true, allowLargeProducts: true } },
            presentation: { styles: ["columnar", "word_problem", "reasoning"] }
        }
    },
    C07_Y4_CALC: {
        1: {
            operations: ["columnar_multiply", "grid_method"],
            math: { range: { multiplicand: [11, 99], multiplier: [2, 7] }, digits: [2], config: { carry: "sometimes" } },
            presentation: { styles: ["columnar"] }
        },
        2: {
            operations: ["columnar_multiply", "grid_method"],
            math: { range: { multiplicand: [11, 999], multiplier: [2, 9] }, digits: [2, 3], config: { carry: "sometimes" } },
            presentation: { styles: ["columnar", "grid_method"] }
        },
        3: {
            operations: ["columnar_multiply", "grid_method", "word_problem"],
            math: { range: { multiplicand: [11, 999], multiplier: [2, 12] }, digits: [2, 3], config: { carry: "always" } },
            presentation: { styles: ["columnar", "grid_method", "word_problem"], contexts: ["measures", "shopping", "abstract"] }
        },
        4: {
            operations: ["columnar_multiply", "grid_method", "word_problem", "reasoning"],
            math: { range: { multiplicand: [100, 999], multiplier: [6, 12] }, digits: [3], config: { carry: "always", largeProducts: true } },
            presentation: { styles: ["columnar", "grid_method", "word_problem", "reasoning"], contexts: ["measures", "shopping", "abstract"] }
        }
    },
    C07_Y5_CALC: {
        1: {
            operations: ["columnar_multiply_1digit", "short_division"],
            math: { range: { multiply: [11, 999], divide: [12, 99] }, digits: { mult: [2,3] }, config: { remainders: true } },
            presentation: { styles: ["columnar"] }
        },
        2: {
            operations: ["columnar_multiply_1digit", "long_multiply_2digit", "short_division"],
            math: { range: { multiply: [11, 9999], divide: [12, 999] }, digits: { mult: [2,3,4], div: [2,3] }, divisors: [2,3,4,5], config: { remainders: true } },
            presentation: { styles: ["columnar"] }
        },
        3: {
            operations: ["columnar_multiply_1digit", "long_multiply_2digit", "short_division", "remainder_interpretation"],
            math: { range: { multiply: [11, 9999], divide: [12, 9999] }, digits: { mult: [2,3,4], div: [2,3,4] }, divisors: [2,3,4,5,6,7,8,9], config: { remainders: true, interpret_remainders: true } },
            presentation: { styles: ["columnar", "word_problem"], contexts: ["abstract", "sharing", "grouping"] }
        },
        4: {
            operations: ["long_multiply_2digit", "short_division", "remainder_interpretation"],
            math: { range: { multiply: [234, 9999], divide: [123, 9999] }, digits: { mult: [3,4], div: [3,4] }, divisors: [3,4,5,6,7,8,9], config: { remainders: true, interpret_remainders: true, require_reasoning: true } },
            presentation: { styles: ["columnar", "word_problem", "reasoning"], contexts: ["measurement", "money", "real_world"] }
        }
    },
    C07_Y6_CALC: {
        1: {
            operations: ["long_multiply_2digit", "long_division"],
            math: { range: { multiply: [11, 999], divide: [100, 999] }, factors: { mult: [11, 50] }, config: { remainderType: ["whole", "fraction"] } },
            presentation: { styles: ["long_division"] }
        },
        2: {
            operations: ["long_multiply_2digit", "long_division"],
            math: { range: { multiply: [11, 999], divide: [100, 9999] }, factors: { mult: [11, 99], divisor: [11, 50] }, config: { remainderType: ["whole", "fraction"] } },
            presentation: { styles: ["long_division", "long_multiply"] }
        },
        3: {
            operations: ["long_multiply_2digit", "long_division"],
            math: { range: { multiply: [11, 9999], divide: [100, 9999] }, factors: { mult: [11, 99], divisor: [11, 99] }, config: { remainderType: ["whole", "fraction", "decimal", "rounded"] } },
            presentation: { styles: ["long_division", "long_multiply", "word_problem"], contexts: ["shopping", "measures", "abstract"] }
        },
        4: {
            operations: ["long_multiply_2digit", "long_division"],
            math: { range: { multiply: [11, 9999], divide: [1000, 9999] }, factors: { mult: [11, 99], divisor: [11, 99] }, config: { remainderType: ["whole", "fraction", "decimal", "rounded"], requireSimplification: true } },
            presentation: { styles: ["long_division", "long_multiply", "word_problem", "reasoning"], contexts: ["shopping", "measures", "abstract", "real_world"] }
        }
    }
};

export const C07_MODULES = {
    'C07_Y2_CALC': { id: 'C07_Y2_CALC', name: 'C07_Y2: Written Statements', ref: 'C7', yearGroup: '2', strand: 'Calculation', substrand: 'Written multiply/divide', parameters: MIGRATED_PARAMS['C07_Y2_CALC'] },
    'C07_Y3_CALC': { id: 'C07_Y3_CALC', name: 'C07_Y3: 2-Digit Written', ref: 'C7', yearGroup: '3', strand: 'Calculation', substrand: 'Written multiply/divide', parameters: MIGRATED_PARAMS['C07_Y3_CALC'] },
    'C07_Y4_CALC': { id: 'C07_Y4_CALC', name: 'C07_Y4: 3-Digit Written', ref: 'C7', yearGroup: '4', strand: 'Calculation', substrand: 'Written multiply/divide', parameters: MIGRATED_PARAMS['C07_Y4_CALC'] },
    'C07_Y5_CALC': { id: 'C07_Y5_CALC', name: 'C07_Y5: Long Mult/Short Div', ref: 'C7', yearGroup: '5', strand: 'Calculation', substrand: 'Written multiply/divide', parameters: MIGRATED_PARAMS['C07_Y5_CALC'] },
    'C07_Y6_CALC': { id: 'C07_Y6_CALC', name: 'C07_Y6: Long Division', ref: 'C7', yearGroup: '6', strand: 'Calculation', substrand: 'Written multiply/divide', parameters: MIGRATED_PARAMS['C07_Y6_CALC'] }
};
