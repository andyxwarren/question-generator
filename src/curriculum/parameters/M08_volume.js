/**
 * M08: Volume
 * Years 5-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M08_Y5_MEAS: {
        1: { operations: ["count_unit_cubes", "estimate_capacity"], math: { dim: { min: 2, max: 4 }, objects: [{ name: 'cup', capacity: 250 }], useLitres: false } }
    },
    M08_Y6_MEAS: {
        1: { operations: ["calculate_volume", "cube_volume"], math: { dim: { min: 2, max: 10 }, units: ["cm"], missingDim: false } }
    }
};

export const M08_MODULES = {
    'M08_Y5_MEAS': { id: 'M08_Y5_MEAS', name: 'M08_Y5: Estimate', ref: 'M8', parameters: MIGRATED_PARAMS['M08_Y5_MEAS'] },
    'M08_Y6_MEAS': { id: 'M08_Y6_MEAS', name: 'M08_Y6: Calculate', ref: 'M8', parameters: MIGRATED_PARAMS['M08_Y6_MEAS'] }
};