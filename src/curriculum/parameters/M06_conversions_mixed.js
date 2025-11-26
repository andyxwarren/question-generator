/**
 * M06: Mixed Conversions
 * Years 4-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M06_Y4_MEAS: {
        1: { operations: ["direct_metric_conversion", "time_conversion"], math: { types: ["length", "time"], conversions: { length: ["km_to_m"], time: ["hours_to_minutes"] }, ranges: { km: { min: 1, max: 10 }, hours: { min: 1, max: 12 } } } },
        3: { operations: ["direct_metric_conversion", "reverse_metric_conversion", "word_problem"], math: { types: ["length", "mass", "time"], conversions: { length: ["m_to_cm"], mass: ["kg_to_g"], time: ["minutes_to_seconds"] }, ranges: { m: { min: 100, max: 10000 }, kg: { min: 1, max: 100 } } }, presentation: { wordProblems: true } }
    },
    M06_Y5_MEAS: {
        1: { operations: ["approximate_conversion_metric_to_imperial"], math: { types: ["length", "mass"], conversions: { length: ["inches_to_cm"], mass: ["pounds_to_g"] }, ranges: { inches: { min: 1, max: 12 } }, valueType: ["whole_only"] }, presentation: { approximate: true } },
        3: { operations: ["approximate_conversion_metric_to_imperial", "word_problem"], math: { types: ["length", "mass", "capacity"], conversions: { length: ["miles_to_km"], capacity: ["pints_to_ml"] }, ranges: { miles: { min: 1, max: 50 } }, valueType: ["whole", "decimal"], decimalPlaces: 2 }, presentation: { approximate: true, wordProblems: true } }
    },
    M06_Y6_MEAS: {
        1: { operations: ["metric_conversion_larger_to_smaller", "metric_conversion_smaller_to_larger"], math: { types: ["length", "mass"], conversions: { length: ["km_to_m"], mass: ["kg_to_g"] }, ranges: { km: { min: 0.5, max: 20 } }, valueType: ["whole", "decimal_1dp"], decimalPlaces: 3 } },
        3: { operations: ["imperial_metric_conversion", "word_problem"], math: { types: ["length", "time"], conversions: { length: ["miles_to_km"], time: ["hours_to_minutes"] }, ranges: { miles: { min: 0.5, max: 200 } }, valueType: ["decimal_2dp"] }, presentation: { wordProblems: true } }
    }
};

export const M06_MODULES = {
    'M06_Y4_MEAS': { id: 'M06_Y4_MEAS', name: 'M06_Y4: Mixed', ref: 'M6', yearGroup: '4', strand: 'Measurement', substrand: 'Conversions', parameters: MIGRATED_PARAMS['M06_Y4_MEAS'] },
    'M06_Y5_MEAS': { id: 'M06_Y5_MEAS', name: 'M06_Y5: Imperial', ref: 'M6', yearGroup: '5', strand: 'Measurement', substrand: 'Conversions', parameters: MIGRATED_PARAMS['M06_Y5_MEAS'] },
    'M06_Y6_MEAS': { id: 'M06_Y6_MEAS', name: 'M06_Y6: Standard', ref: 'M6', yearGroup: '6', strand: 'Measurement', substrand: 'Conversions', parameters: MIGRATED_PARAMS['M06_Y6_MEAS'] }
};
