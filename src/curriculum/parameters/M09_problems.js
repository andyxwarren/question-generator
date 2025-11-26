/**
 * M09: Measurement Problems
 * Years 2-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M09_Y2_MEAS: {
        1: { operations: ["add_money", "subtract_money"], math: { unit: "pence_only", range: { min: 5, max: 50 }, totalMax: 50 }, presentation: { contexts: ["shopping"], change: false } },
        2: { operations: ["add_money", "subtract_money"], math: { unit: "pence_only", range: { min: 10, max: 80 }, totalMax: 80 }, presentation: { contexts: ["shopping"], change: false } },
        3: { operations: ["add_money", "subtract_money", "find_change"], math: { unit: "pence_only", range: { min: 10, max: 99 }, totalMax: 99 }, presentation: { contexts: ["shopping"], change: true } },
        4: { operations: ["add_money", "subtract_money", "find_change", "compare_money"], math: { unit: "pence_only", range: { min: 10, max: 99 }, totalMax: 99 }, presentation: { contexts: ["shopping", "savings"], change: true } }
    },
    M09_Y3_MEAS: {
        1: { operations: ["add_measure", "subtract_measure"], math: { types: ["money", "length"], money: { unit: "pence_only", range: [10, 99] }, length: { unit: "cm", range: [10, 100] } }, presentation: { contexts: ["shopping", "measuring"] } },
        2: { operations: ["add_measure", "subtract_measure"], math: { types: ["money", "length", "mass"], money: { unit: "pounds_and_pence", range: [1, 10] }, length: { unit: "cm", range: [10, 200] }, mass: { unit: "g", range: [50, 500] } }, presentation: { contexts: ["shopping", "measuring"] } },
        3: { operations: ["add_measure", "subtract_measure", "compare_measures"], math: { types: ["money", "length", "mass"], money: { unit: "pounds_and_pence", range: [1, 20] }, length: { unit: "cm", range: [10, 300] }, mass: { unit: "g", range: [100, 1000] } }, presentation: { contexts: ["shopping", "measuring", "cooking"] } },
        4: { operations: ["add_measure", "subtract_measure", "compare_measures", "multi_step"], math: { types: ["money", "length", "mass", "capacity"], money: { unit: "pounds_and_pence", range: [1, 50] }, length: { unit: "cm", range: [10, 500] }, mass: { unit: "g", range: [100, 2000] }, capacity: { unit: "ml", range: [100, 1000] } }, presentation: { contexts: ["shopping", "measuring", "cooking", "science"] } }
    },
    M09_Y4_MEAS: {
        1: { operations: ["multiply_measure", "divide_measure"], math: { types: ["money", "length"], money: { format: "whole_pounds", range: [1, 20] }, mult: [2,3,4,5] }, presentation: { contexts: ["shopping", "recipes"] } },
        2: { operations: ["multiply_measure", "divide_measure"], math: { types: ["money", "length", "mass"], money: { format: "whole_pounds", range: [1, 50] }, mult: [2,3,4,5,6,8,10], mass: { unit: "g", range: [10, 500] } }, presentation: { contexts: ["shopping", "recipes"] } },
        3: { operations: ["multiply_measure", "divide_measure", "mixed_operations"], math: { types: ["money", "length", "mass"], money: { format: "pounds_and_pence", range: [1, 100] }, mult: [2,3,4,5,6,7,8,9,10], mass: { unit: "g", range: [10, 1000] } }, presentation: { contexts: ["shopping", "recipes", "construction"] } },
        4: { operations: ["multiply_measure", "divide_measure", "mixed_operations", "multi_step"], math: { types: ["money", "length", "mass", "capacity"], money: { format: "pounds_and_pence", range: [1, 200] }, mult: [2,3,4,5,6,7,8,9,10,12], mass: { unit: "g", range: [10, 2000] }, capacity: { unit: "ml", range: [100, 2000] } }, presentation: { contexts: ["shopping", "recipes", "construction", "science"] } }
    },
    M09_Y5_MEAS: {
        1: { operations: ["multiply_decimal", "add_decimal"], math: { types: ["money", "length"], decimal: 1, money: { range: [0.5, 10] }, mult: [2,3,4,5] }, presentation: { contexts: ["shopping"] } },
        2: { operations: ["multiply_decimal", "add_decimal", "subtract_decimal"], math: { types: ["money", "length", "mass"], decimal: 1, money: { range: [0.5, 20] }, mult: [2,3,4,5,6,8,10], mass: { unit: "kg", range: [0.1, 10] } }, presentation: { contexts: ["shopping", "measuring"] } },
        3: { operations: ["multiply_decimal", "add_decimal", "subtract_decimal", "divide_decimal"], math: { types: ["money", "length", "mass"], decimal: 2, money: { range: [0.5, 50] }, mult: [2,3,4,5,6,7,8,9,10], mass: { unit: "kg", range: [0.1, 20] } }, presentation: { contexts: ["shopping", "measuring", "science"] } },
        4: { operations: ["multiply_decimal", "add_decimal", "subtract_decimal", "divide_decimal", "multi_step"], math: { types: ["money", "length", "mass", "capacity"], decimal: 2, money: { range: [0.5, 100] }, mult: [2,3,4,5,6,7,8,9,10,12], mass: { unit: "kg", range: [0.1, 50] }, capacity: { unit: "l", range: [0.1, 10] } }, presentation: { contexts: ["shopping", "measuring", "science", "construction"] } }
    },
    M09_Y6_MEAS: {
        1: { operations: ["convert_length", "convert_mass"], math: { conversions: { length: ["km_to_m"], mass: ["kg_to_g"] }, decimal: [1, 2], range: { km: [0.5, 10] } }, presentation: { contexts: ["science", "DIY"] } },
        2: { operations: ["convert_length", "convert_mass", "convert_capacity"], math: { conversions: { length: ["km_to_m", "m_to_cm"], mass: ["kg_to_g"], capacity: ["l_to_ml"] }, decimal: [1, 2], range: { km: [0.5, 20], m: [0.5, 100] } }, presentation: { contexts: ["science", "DIY"] } },
        3: { operations: ["convert_length", "convert_mass", "convert_capacity", "ratio_problems"], math: { conversions: { length: ["km_to_m", "m_to_cm"], mass: ["kg_to_g"], capacity: ["l_to_ml"] }, decimal: [1, 2], range: { km: [0.5, 50], m: [0.5, 500] }, ratio: { simple: [2,3,4,5] } }, presentation: { contexts: ["science", "DIY", "recipes"] } },
        4: { operations: ["convert_length", "convert_mass", "convert_capacity", "ratio_problems", "multi_step"], math: { conversions: { length: ["km_to_m", "m_to_cm", "cm_to_mm"], mass: ["kg_to_g"], capacity: ["l_to_ml"] }, decimal: [1, 2, 3], range: { km: [0.5, 100], m: [0.5, 1000] }, ratio: { simple: [2,3,4,5,6,8,10], compound: true } }, presentation: { contexts: ["science", "DIY", "recipes", "engineering"] } }
    }
};

export const M09_MODULES = {
    'M09_Y2_MEAS': { id: 'M09_Y2_MEAS', name: 'M09_Y2: Money Problems', ref: 'M9', yearGroup: '2', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y2_MEAS'] },
    'M09_Y3_MEAS': { id: 'M09_Y3_MEAS', name: 'M09_Y3: Multi-Measure', ref: 'M9', yearGroup: '3', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y3_MEAS'] },
    'M09_Y4_MEAS': { id: 'M09_Y4_MEAS', name: 'M09_Y4: Four Ops', ref: 'M9', yearGroup: '4', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y4_MEAS'] },
    'M09_Y5_MEAS': { id: 'M09_Y5_MEAS', name: 'M09_Y5: Decimal', ref: 'M9', yearGroup: '5', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y5_MEAS'] },
    'M09_Y6_MEAS': { id: 'M09_Y6_MEAS', name: 'M09_Y6: Conversions', ref: 'M9', yearGroup: '6', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y6_MEAS'] }
};
