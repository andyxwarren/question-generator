/**
 * M09: Measurement Problems
 * Years 2-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M09_Y2_MEAS: {
        1: { operations: ["add_money", "subtract_money"], math: { unit: "pence_only", range: { min: 5, max: 50 }, totalMax: 50 }, presentation: { contexts: ["shopping"], change: false } }
    },
    M09_Y3_MEAS: {
        1: { operations: ["add_measure", "subtract_measure"], math: { types: ["money", "length"], money: { unit: "pence_only", range: [10, 99] }, length: { unit: "cm", range: [10, 100] } }, presentation: { contexts: ["shopping", "measuring"] } }
    },
    M09_Y4_MEAS: {
        1: { operations: ["multiply_measure", "divide_measure"], math: { types: ["money", "length"], money: { format: "whole_pounds", range: [1, 20] }, mult: [2,3,4,5] }, presentation: { contexts: ["shopping", "recipes"] } }
    },
    M09_Y5_MEAS: {
        1: { operations: ["multiply_decimal", "add_decimal"], math: { types: ["money", "length"], decimal: 1, money: { range: [0.5, 10] }, mult: [2,3,4,5] }, presentation: { contexts: ["shopping"] } }
    },
    M09_Y6_MEAS: {
        1: { operations: ["convert_length", "convert_mass"], math: { conversions: { length: ["km_to_m"], mass: ["kg_to_g"] }, decimal: [1, 2], range: { km: [0.5, 10] } }, presentation: { contexts: ["science", "DIY"] } }
    }
};

export const M09_MODULES = {
    'M09_Y2_MEAS': { id: 'M09_Y2_MEAS', name: 'M09_Y2: Money Problems', ref: 'M9', yearGroup: '2', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y2_MEAS'] },
    'M09_Y3_MEAS': { id: 'M09_Y3_MEAS', name: 'M09_Y3: Multi-Measure', ref: 'M9', yearGroup: '3', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y3_MEAS'] },
    'M09_Y4_MEAS': { id: 'M09_Y4_MEAS', name: 'M09_Y4: Four Ops', ref: 'M9', yearGroup: '4', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y4_MEAS'] },
    'M09_Y5_MEAS': { id: 'M09_Y5_MEAS', name: 'M09_Y5: Decimal', ref: 'M9', yearGroup: '5', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y5_MEAS'] },
    'M09_Y6_MEAS': { id: 'M09_Y6_MEAS', name: 'M09_Y6: Conversions', ref: 'M9', yearGroup: '6', strand: 'Measurement', substrand: 'Word problems', parameters: MIGRATED_PARAMS['M09_Y6_MEAS'] }
};
