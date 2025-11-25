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
        }
    },
    C07_Y3_CALC: {
        1: {
            operations: ["columnar_multiply"],
            math: { range: { multiplicand: [11, 33], multiplier: [2, 3] }, config: { carry: false } },
            presentation: { styles: ["columnar"] }
        }
    },
    C07_Y4_CALC: {
        1: {
            operations: ["columnar_multiply", "grid_method"],
            math: { range: { multiplicand: [11, 99], multiplier: [2, 7] }, digits: [2], config: { carry: "sometimes" } },
            presentation: { styles: ["columnar"] }
        }
    },
    C07_Y5_CALC: {
        1: {
            operations: ["columnar_multiply_1digit", "short_division"],
            math: { range: { multiply: [11, 999], divide: [12, 99] }, digits: { mult: [2,3] }, config: { remainders: true } },
            presentation: { styles: ["columnar"] }
        }
    },
    C07_Y6_CALC: {
        1: {
            operations: ["long_multiply_2digit", "long_division"],
            math: { range: { multiply: [11, 999], divide: [100, 999] }, factors: { mult: [11, 50] }, config: { remainderType: ["whole", "fraction"] } },
            presentation: { styles: ["long_division"] }
        }
    }
};

export const C07_MODULES = {
    'C07_Y2_CALC': { id: 'C07_Y2_CALC', name: 'C07_Y2: Written Statements', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y2_CALC'] },
    'C07_Y3_CALC': { id: 'C07_Y3_CALC', name: 'C07_Y3: 2-Digit Written', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y3_CALC'] },
    'C07_Y4_CALC': { id: 'C07_Y4_CALC', name: 'C07_Y4: 3-Digit Written', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y4_CALC'] },
    'C07_Y5_CALC': { id: 'C07_Y5_CALC', name: 'C07_Y5: Long Mult/Short Div', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y5_CALC'] },
    'C07_Y6_CALC': { id: 'C07_Y6_CALC', name: 'C07_Y6: Long Division', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y6_CALC'] }
};