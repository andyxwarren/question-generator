/**
 * C08: Properties Problems
 * Years 1-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C08_Y1_CALC: {
        1: { operations: ["equal_groups_visual"], math: { tables: [2,5,10], maxProduct: 10, groups: { min: 2, max: 2 } }, presentation: { visuals: true } }
    },
    C08_Y2_CALC: {
        1: { operations: ["equal_groups", "array_multiplication"], math: { tables: [2,5,10], maxProduct: 50 }, presentation: { format: "multiple_choice" } }
    },
    C08_Y3_CALC: {
        1: { operations: ["integer_scaling"], math: { tables: [2,3,4,5], maxProduct: 100, scaling: [2,3,5] }, presentation: { format: "multiple_choice" } }
    },
    C08_Y4_CALC: {
        1: { operations: ["distributive_simple"], math: { tables: [2,3,4,5], maxProduct: 200 }, presentation: { format: "multiple_choice" } }
    },
    C08_Y5_CALC: {
        1: { operations: ["factor_problems", "multiple_problems"], math: { range: { max: 1000 }, factors: [1, 100] }, presentation: { format: "multiple_choice" } }
    },
    C08_Y6_CALC: {
        1: { operations: ["two_step_mixed", "ratio_problems"], math: { range: { max: 10000 }, ops: [2, 3] }, presentation: { format: "multiple_choice" } }
    }
};

export const C08_MODULES = {
    'C08_Y1_CALC': { id: 'C08_Y1_CALC', name: 'C08_Y1: Visual Problems', ref: 'C8', yearGroup: 'Year 1', parameters: MIGRATED_PARAMS['C08_Y1_CALC'] },
    'C08_Y2_CALC': { id: 'C08_Y2_CALC', name: 'C08_Y2: Problems', ref: 'C8', yearGroup: 'Year 2', parameters: MIGRATED_PARAMS['C08_Y2_CALC'] },
    'C08_Y3_CALC': { id: 'C08_Y3_CALC', name: 'C08_Y3: Scaling', ref: 'C8', yearGroup: 'Year 3', parameters: MIGRATED_PARAMS['C08_Y3_CALC'] },
    'C08_Y4_CALC': { id: 'C08_Y4_CALC', name: 'C08_Y4: Distributive', ref: 'C8', yearGroup: 'Year 4', parameters: MIGRATED_PARAMS['C08_Y4_CALC'] },
    'C08_Y5_CALC': { id: 'C08_Y5_CALC', name: 'C08_Y5: Factors/Multiples', ref: 'C8', yearGroup: 'Year 5', parameters: MIGRATED_PARAMS['C08_Y5_CALC'] },
    'C08_Y6_CALC': { id: 'C08_Y6_CALC', name: 'C08_Y6: Mixed Problems', ref: 'C8', yearGroup: 'Year 6', parameters: MIGRATED_PARAMS['C08_Y6_CALC'] }
};