/**
 * C02 Module Series: Add/Subtract Using Written Methods
 * Covers Years 1-5
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C02_Y1_CALC: {
        1: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "symbol_interpretation"],
            math: { range: { max: 10, result: [0, 10] }, config: { allowZero: true, missingPositions: ["end"] } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "missing_subtrahend", "symbol_interpretation", "equation_completion"],
            math: { range: { max: 15, result: [0, 15] }, config: { allowZero: true, missingPositions: ["end", "middle"] } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "missing_subtrahend", "missing_minuend", "symbol_interpretation", "equation_completion", "true_false_equations"],
            math: { range: { max: 20, result: [0, 20] }, config: { allowZero: true, missingPositions: ["start", "middle", "end"] } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "missing_subtrahend", "missing_minuend", "symbol_interpretation", "equation_completion", "true_false_equations", "two_step_problems", "complex_missing"],
            math: { range: { max: 20, result: [0, 20] }, config: { allowZero: true, missingPositions: ["start", "middle", "end", "multiple"] } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C02_Y2_CALC: {
        1: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "three_onedigit"],
            math: { range: { max_2digit: 50 }, components: { ones: [1, 9], tens: [10, 50] }, config: { avoidBridging: true, threeNumbersMax: 20 } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "twodigit_minus_tens", "twodigit_plus_twodigit", "three_onedigit"],
            math: { range: { max_2digit: 75 }, components: { ones: [1, 9], tens: [10, 60] }, config: { avoidBridging: false, avoidCarry: true, threeNumbersMax: 25 } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "twodigit_minus_tens", "twodigit_plus_twodigit", "twodigit_minus_twodigit", "three_onedigit"],
            math: { range: { max_2digit: 99 }, components: { ones: [1, 9], tens: [10, 90] }, config: { avoidBridging: false, avoidCarry: false, threeNumbersMax: 27 } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "twodigit_minus_tens", "twodigit_plus_twodigit", "twodigit_minus_twodigit", "three_onedigit", "mixed_operations", "complex_missing"],
            math: { range: { max_2digit: 99 }, components: { ones: [1, 9], tens: [10, 90] }, config: { avoidBridging: false, avoidCarry: false, threeNumbersMax: 30, complexity: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C02_Y3_CALC: {
        1: {
            operations: ["addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min3: 100, max3: 500, resultMax: 999 }, config: { noCarry: true, noBorrow: true } },
            presentation: { styles: ["equation", "word_problem"], hint: "Use written column method" }
        },
        2: {
            operations: ["addition_simple_carry", "subtraction_simple_borrow", "addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min3: 100, max3: 700, resultMax: 999 }, config: { allowSingleCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning"], hint: "Use written column method" }
        },
        3: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty"],
            math: { range: { min3: 100, max3: 999, resultMax: 999 }, config: { allowMultiCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving"], hint: "Use written column method" }
        },
        4: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty", "crossing_1000", "missing_digit_problems"],
            math: { range: { min3: 100, max3: 999, resultMax: 1999 }, config: { allowMultiCarry: true, exceed1000: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving", "missing_number"], hint: "Use written column method" }
        }
    },
    C02_Y4_CALC: {
        1: {
            operations: ["addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min4: 1000, max4: 5000, resultMax: 9999 }, config: { noCarry: true, noBorrow: true } },
            presentation: { styles: ["equation", "word_problem"], hint: "Use written column method" }
        },
        2: {
            operations: ["addition_simple_carry", "subtraction_simple_borrow", "addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min4: 1000, max4: 7000, resultMax: 9999 }, config: { allowSingleCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning"], hint: "Use written column method" }
        },
        3: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty"],
            math: { range: { min4: 1000, max4: 9999, resultMax: 9999 }, config: { allowMultiCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving"], hint: "Use written column method" }
        },
        4: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty", "crossing_10000", "missing_digit_problems", "multi_step_problems"],
            math: { range: { min4: 1000, max4: 9999, resultMax: 19999 }, config: { allowMultiCarry: true, exceed10000: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving", "missing_number"], hint: "Use written column method" }
        }
    },
    C02_Y5_CALC: {
        1: {
            operations: ["addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min: 10000, max: 50000, resultMax: 99999 }, config: { noCarry: true, noBorrow: true, digits: 5 } },
            presentation: { styles: ["equation", "word_problem"], hint: "Use written column method" }
        },
        2: {
            operations: ["addition_simple_carry", "subtraction_simple_borrow", "addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min: 10000, max: 500000, resultMax: 999999 }, config: { allowSingleCarry: true, digits: [5, 6] } },
            presentation: { styles: ["equation", "word_problem", "reasoning"], hint: "Use written column method" }
        },
        3: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty"],
            math: { range: { min: 10000, max: 999999, resultMax: 1999999 }, config: { allowMultiCarry: true, digits: [5, 6] } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving"], hint: "Use written column method" }
        },
        4: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty", "large_numbers", "missing_digit_problems", "multi_step_problems"],
            math: { range: { min: 10000, max: 9999999, resultMax: 19999999 }, config: { allowMultiCarry: true, digits: [5, 6, 7] } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving", "missing_number"], hint: "Use written column method" }
        }
    }
};

export const C02_MODULES = {
    'C02_Y1_CALC': { id: 'C02_Y1_CALC', name: 'C02_Y1_CALC: Add & Subtract to 20', description: 'Add/subtract one-digit and two-digit numbers', yearGroup: '1', strand: 'Calculation', substrand: 'Written methods', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y1_CALC'] },
    'C02_Y2_CALC': { id: 'C02_Y2_CALC', name: 'C02_Y2_CALC: 2-Digit Add & Subtract', description: 'Add/subtract 2-digit numbers', yearGroup: '2', strand: 'Calculation', substrand: 'Written methods', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y2_CALC'] },
    'C02_Y3_CALC': { id: 'C02_Y3_CALC', name: 'C02_Y3_CALC: 3-Digit Columnar', description: 'Columnar addition/subtraction 3-digit', yearGroup: '3', strand: 'Calculation', substrand: 'Written methods', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y3_CALC'] },
    'C02_Y4_CALC': { id: 'C02_Y4_CALC', name: 'C02_Y4_CALC: 4-Digit Columnar', description: 'Columnar addition/subtraction 4-digit', yearGroup: '4', strand: 'Calculation', substrand: 'Written methods', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y4_CALC'] },
    'C02_Y5_CALC': { id: 'C02_Y5_CALC', name: 'C02_Y5_CALC: Large Columnar', description: 'Columnar addition/subtraction large numbers', yearGroup: '5', strand: 'Calculation', substrand: 'Written methods', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y5_CALC'] }
};
