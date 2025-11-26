/**
 * M05: Metric Conversions
 * Year 5
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M05_Y5_MEAS: {
        1: { operations: ["direct_conversion"], math: { types: ["length", "mass", "capacity"], conversions: { length: ["km_to_m"], mass: ["kg_to_g"], capacity: ["l_to_ml"] }, valueType: ["whole_only"], ranges: { km: { min: 1, max: 10 } } }, presentation: { wordProblems: false } },
        3: { operations: ["direct_conversion", "reverse_conversion", "word_problem"], math: { types: ["length", "mass", "capacity"], conversions: { length: ["km_to_m", "m_to_cm"], mass: ["kg_to_g"], capacity: ["l_to_ml"] }, valueType: ["whole", "decimal"], ranges: { km: { min: 1, max: 100 }, m: { min: 1, max: 10000 } }, decimalPlaces: 2 }, presentation: { wordProblems: true } }
    }
};

export const M05_MODULES = {
    'M05_Y5_MEAS': { id: 'M05_Y5_MEAS', name: 'M05_Y5: Metric', ref: 'M5', yearGroup: '5', strand: 'Measurement', substrand: 'Conversions', parameters: MIGRATED_PARAMS['M05_Y5_MEAS'] }
};
