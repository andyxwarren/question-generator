/**
 * M01: Comparison
 * Years 1-4
 * Schema: V2
 */

const MIGRATED_PARAMS = {
    M01_Y1_MEAS: {
        1: { operations: ["compare_two"], math: { types: ["length", "height", "mass"] }, presentation: { useDescriptors: false } },
        2: { operations: ["compare_two", "complete_comparative"], math: { types: ["length", "height", "mass", "capacity"] }, presentation: { useDescriptors: false } },
        3: { operations: ["compare_two", "complete_comparative", "identify_more_less"], math: { types: ["length", "height", "mass", "capacity", "time"] }, presentation: { useDescriptors: false } },
        4: { operations: ["compare_two", "complete_comparative", "identify_more_less"], math: { types: ["length", "height", "mass", "capacity", "time"] }, presentation: { useDescriptors: true } }
    },
    M01_Y2_MEAS: {
        1: { operations: ["compare_with_symbols", "order_two"], math: { types: ["length", "mass"], range: { min: 1, max: 20 }, useUnits: false, allowEquals: false } },
        2: { operations: ["compare_with_symbols", "order_two", "order_three"], math: { types: ["length", "mass", "capacity"], range: { min: 1, max: 50 }, useUnits: true, units: { length: ["cm"], mass: ["g"], capacity: ["ml"] }, allowEquals: false } },
        3: { operations: ["compare_with_symbols", "order_three", "complete_comparison"], math: { types: ["length", "mass", "capacity"], range: { min: 1, max: 100 }, useUnits: true, units: { length: ["cm"], mass: ["g"], capacity: ["ml"] }, allowEquals: true } },
        4: { operations: ["compare_with_symbols", "order_three", "order_four", "complete_comparison"], math: { types: ["length", "mass", "capacity"], range: { min: 1, max: 100 }, useUnits: true, units: { length: ["cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, allowEquals: true } }
    },
    M01_Y3_MEAS: {
        1: { operations: ["compare_same_units", "order_same_units"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { cm: { min: 1, max: 100 }, m: { min: 1, max: 10 }, g: { min: 10, max: 500 }, kg: { min: 1, max: 10 }, ml: { min: 10, max: 500 }, l: { min: 1, max: 5 } }, sameUnitOnly: true } },
        2: { operations: ["compare_same_units", "order_same_units", "compare_mixed_units_simple"], math: { types: ["length", "mass", "capacity"], units: { length: ["mm", "cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { mm: { min: 10, max: 200 }, cm: { min: 1, max: 200 }, m: { min: 1, max: 20 }, g: { min: 10, max: 1000 }, kg: { min: 1, max: 20 }, ml: { min: 10, max: 1000 }, l: { min: 1, max: 10 } }, simpleConversions: true } },
        3: { operations: ["compare_same_units", "compare_mixed_units", "order_mixed_units"], math: { types: ["length", "mass", "capacity"], units: { length: ["mm", "cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { mm: { min: 10, max: 500 }, cm: { min: 1, max: 500 }, m: { min: 1, max: 100 }, g: { min: 10, max: 2000 }, kg: { min: 1, max: 50 }, ml: { min: 10, max: 2000 }, l: { min: 1, max: 20 } } } }
    },
    M01_Y4_MEAS: {
        1: { operations: ["compare_measures", "order_measures", "compare_money"], math: { types: ["length", "mass", "capacity", "money"], units: { length: ["mm", "cm", "m"], money: ["p", "£"] }, ranges: { mm: { min: 10, max: 500 }, cm: { min: 1, max: 500 }, p: { min: 1, max: 99 }, pounds: { min: 1, max: 20 } }, moneyFormat: "simple" } },
        2: { operations: ["compare_measures", "order_measures", "compare_money", "order_money"], math: { types: ["length", "mass", "capacity", "money"], units: { length: ["mm", "cm", "m", "km"], money: ["p", "£", "mixed"] }, ranges: { mm: { min: 10, max: 1000 }, km: { min: 1, max: 10 }, pounds: { min: 1, max: 50 } }, moneyFormat: "mixed" } }
    }
};

export const M01_MODULES = {
    'M01_Y1_MEAS': { id: 'M01_Y1_MEAS', name: 'M01_Y1: Comparing', ref: 'M1', yearGroup: 'Year 1', parameters: MIGRATED_PARAMS['M01_Y1_MEAS'] },
    'M01_Y2_MEAS': { id: 'M01_Y2_MEAS', name: 'M01_Y2: Order Measures', ref: 'M1', yearGroup: 'Year 2', parameters: MIGRATED_PARAMS['M01_Y2_MEAS'] },
    'M01_Y3_MEAS': { id: 'M01_Y3_MEAS', name: 'M01_Y3: Compare Units', ref: 'M1', yearGroup: 'Year 3', parameters: MIGRATED_PARAMS['M01_Y3_MEAS'] },
    'M01_Y4_MEAS': { id: 'M01_Y4_MEAS', name: 'M01_Y4: Different Measures', ref: 'M1', yearGroup: 'Year 4', parameters: MIGRATED_PARAMS['M01_Y4_MEAS'] }
};