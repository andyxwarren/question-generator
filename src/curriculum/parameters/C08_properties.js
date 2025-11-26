/**
 * C08: Properties Problems
 * Years 1-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C08_Y1_CALC: {
        1: { operations: ["equal_groups_visual"], math: { tables: [2,5,10], maxProduct: 10, groups: { min: 2, max: 2 } }, presentation: { visuals: true } },
        2: { operations: ["equal_groups_visual"], math: { tables: [2,5,10], maxProduct: 20, groups: { min: 2, max: 3 } }, presentation: { visuals: true, styles: ["groups"] } },
        3: { operations: ["equal_groups_visual", "array_visual"], math: { tables: [2,5,10], maxProduct: 20, groups: { min: 2, max: 5 } }, presentation: { visuals: true, styles: ["groups", "arrays"] } },
        4: { operations: ["equal_groups_visual", "array_visual"], math: { tables: [2,5,10], maxProduct: 30, groups: { min: 2, max: 6 } }, presentation: { visuals: true, styles: ["groups", "arrays", "mixed"] } }
    },
    C08_Y2_CALC: {
        1: { operations: ["equal_groups", "array_multiplication"], math: { tables: [2,5,10], maxProduct: 50 }, presentation: { format: "multiple_choice" } },
        2: { operations: ["equal_groups", "array_multiplication", "repeated_addition"], math: { tables: [2,5,10], maxProduct: 70 }, presentation: { format: "multiple_choice", styles: ["visual", "abstract"] } },
        3: { operations: ["equal_groups", "array_multiplication", "repeated_addition", "word_problem"], math: { tables: [2,5,10], maxProduct: 100 }, presentation: { format: "multiple_choice", styles: ["visual", "abstract", "word_problem"], contexts: ["abstract", "everyday"] } },
        4: { operations: ["equal_groups", "array_multiplication", "repeated_addition", "word_problem", "reasoning"], math: { tables: [2,5,10], maxProduct: 120, config: { reverseOperations: true } }, presentation: { format: "text_input", styles: ["abstract", "word_problem", "reasoning"], contexts: ["abstract", "everyday", "measurement"] } }
    },
    C08_Y3_CALC: {
        1: { operations: ["integer_scaling"], math: { tables: [2,3,4,5], maxProduct: 100, scaling: [2,3,5] }, presentation: { format: "multiple_choice" } },
        2: { operations: ["integer_scaling", "correspondence"], math: { tables: [2,3,4,5,8], maxProduct: 200, scaling: [2,3,4,5], correspondence: { perItem: [2,3,4,5], maxItems: 10 } }, presentation: { format: "multiple_choice", contexts: ["shopping", "measures"] } },
        3: { operations: ["integer_scaling", "correspondence"], math: { tables: [2,3,4,5,8,10], maxProduct: 400, scaling: [2,3,4,5,8,10], correspondence: { perItem: [2,3,4,5,8,10], maxItems: 20 } }, presentation: { format: "multiple_choice", contexts: ["shopping", "measures", "real_world"], styles: ["word_problem"] } },
        4: { operations: ["integer_scaling", "correspondence", "reasoning"], math: { tables: [2,3,4,5,8,10], maxProduct: 600, scaling: [2,3,4,5,6,8,10], correspondence: { perItem: [2,3,4,5,6,8,10], maxItems: 30 }, reasoning: { allowMultiStep: true } }, presentation: { format: "text_input", contexts: ["shopping", "measures", "real_world", "abstract"], styles: ["word_problem", "reasoning"] } }
    },
    C08_Y4_CALC: {
        1: { operations: ["distributive_simple"], math: { tables: [2,3,4,5], maxProduct: 200 }, presentation: { format: "multiple_choice" } },
        2: { operations: ["distributive_simple", "factor_pairs"], math: { tables: [2,3,4,5,8,10], maxProduct: 300, factorPairs: { range: [1, 50] } }, presentation: { format: "multiple_choice", styles: ["equation", "word_problem"] } },
        3: { operations: ["distributive_simple", "factor_pairs", "commutativity", "three_numbers"], math: { tables: [2,3,4,5,6,7,8,9,10], maxProduct: 500, factorPairs: { range: [1, 100] }, threeNumbers: { maxValue: 10, maxProduct: 200 }, config: { includeZero: true, includeOne: true } }, presentation: { format: "text_input", styles: ["equation", "word_problem", "reasoning"], contexts: ["abstract", "measures", "shopping"] } },
        4: { operations: ["distributive_extended", "factor_pairs", "commutativity", "three_numbers", "property_reasoning"], math: { tables: [2,3,4,5,6,7,8,9,10,11,12], maxProduct: 1000, factorPairs: { range: [1, 144], findAll: true }, threeNumbers: { maxValue: 15, maxProduct: 500 }, config: { includeZero: true, includeOne: true, mixedProperties: true } }, presentation: { format: "text_input", styles: ["equation", "reasoning", "proof"], contexts: ["abstract", "multi_step"] } }
    },
    C08_Y5_CALC: {
        1: { operations: ["factor_problems", "multiple_problems"], math: { range: { max: 1000 }, factors: [1, 100] }, presentation: { format: "multiple_choice" } },
        2: { operations: ["factor_problems", "multiple_problems", "common_factors"], math: { range: { max: 1000 }, factors: [1, 100], commonFactors: { pairs: true } }, presentation: { format: "multiple_choice", styles: ["equation", "word_problem"] } },
        3: { operations: ["factor_problems", "multiple_problems", "common_factors", "squares", "cubes"], math: { range: { max: 1000 }, factors: [1, 144], squares: { max: 144 }, cubes: { max: 125 }, config: { findAllPairs: true } }, presentation: { format: "text_input", styles: ["equation", "word_problem", "reasoning"], contexts: ["abstract", "real_world"] } },
        4: { operations: ["factor_problems", "multiple_problems", "common_factors", "squares", "cubes", "prime_factors"], math: { range: { max: 1000 }, factors: [1, 200], squares: { max: 225 }, cubes: { max: 216 }, primes: { max: 100 }, config: { findAllPairs: true, primeFactorization: true } }, presentation: { format: "text_input", styles: ["equation", "reasoning", "proof"], contexts: ["abstract", "multi_step"] } }
    },
    C08_Y6_CALC: {
        1: { operations: ["two_step_mixed", "ratio_problems"], math: { range: { max: 10000 }, ops: [2, 3] }, presentation: { format: "multiple_choice" } },
        2: { operations: ["two_step_mixed", "ratio_problems", "scale_factor"], math: { range: { max: 100000 }, ops: [2, 3], scaleFactor: { min: 2, max: 10 } }, presentation: { format: "multiple_choice", styles: ["equation", "word_problem"], contexts: ["shapes", "measures"] } },
        3: { operations: ["multi_step_mixed", "ratio_problems", "scale_factor"], math: { range: { max: 1000000 }, ops: [2, 3, 4], scaleFactor: { min: 2, max: 20 }, config: { allFourOps: true } }, presentation: { format: "text_input", styles: ["word_problem", "reasoning"], contexts: ["shapes", "measures", "real_world"] } },
        4: { operations: ["multi_step_mixed", "ratio_problems", "scale_factor", "complex_reasoning"], math: { range: { max: 1000000 }, ops: [3, 4, 5], scaleFactor: { min: 2, max: 50 }, config: { allFourOps: true, multiStep: true } }, presentation: { format: "text_input", styles: ["word_problem", "reasoning", "proof"], contexts: ["shapes", "measures", "real_world", "abstract"] } }
    }
};

export const C08_MODULES = {
    'C08_Y1_CALC': { id: 'C08_Y1_CALC', name: 'C08_Y1: Visual Problems', ref: 'C8', yearGroup: '1', strand: 'Calculation', substrand: 'Properties and reasoning', parameters: MIGRATED_PARAMS['C08_Y1_CALC'] },
    'C08_Y2_CALC': { id: 'C08_Y2_CALC', name: 'C08_Y2: Problems', ref: 'C8', yearGroup: '2', strand: 'Calculation', substrand: 'Properties and reasoning', parameters: MIGRATED_PARAMS['C08_Y2_CALC'] },
    'C08_Y3_CALC': { id: 'C08_Y3_CALC', name: 'C08_Y3: Scaling', ref: 'C8', yearGroup: '3', strand: 'Calculation', substrand: 'Properties and reasoning', parameters: MIGRATED_PARAMS['C08_Y3_CALC'] },
    'C08_Y4_CALC': { id: 'C08_Y4_CALC', name: 'C08_Y4: Distributive', ref: 'C8', yearGroup: '4', strand: 'Calculation', substrand: 'Properties and reasoning', parameters: MIGRATED_PARAMS['C08_Y4_CALC'] },
    'C08_Y5_CALC': { id: 'C08_Y5_CALC', name: 'C08_Y5: Factors/Multiples', ref: 'C8', yearGroup: '5', strand: 'Calculation', substrand: 'Properties and reasoning', parameters: MIGRATED_PARAMS['C08_Y5_CALC'] },
    'C08_Y6_CALC': { id: 'C08_Y6_CALC', name: 'C08_Y6: Mixed Problems', ref: 'C8', yearGroup: '6', strand: 'Calculation', substrand: 'Properties and reasoning', parameters: MIGRATED_PARAMS['C08_Y6_CALC'] }
};
