/**
 * M08: Volume
 * Years 5-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M08_Y5_MEAS: {
        1: { operations: ["count_unit_cubes", "estimate_capacity"], math: { dim: { min: 2, max: 4 }, objects: [{ name: 'cup', capacity: 250 }], useLitres: false } },
        2: { operations: ["count_unit_cubes", "estimate_capacity", "compare_volumes"], math: { dim: { min: 2, max: 5 }, objects: [{ name: 'cup', capacity: 250 }, { name: 'jug', capacity: 1000 }], useLitres: true } },
        3: { operations: ["count_unit_cubes", "estimate_capacity", "compare_volumes"], math: { dim: { min: 2, max: 6 }, objects: [{ name: 'cup', capacity: 250 }, { name: 'jug', capacity: 1000 }, { name: 'bottle', capacity: 500 }], useLitres: true } },
        4: { operations: ["count_unit_cubes", "estimate_capacity", "compare_volumes", "irregular_cubes"], math: { dim: { min: 2, max: 8 }, objects: [{ name: 'cup', capacity: 250 }, { name: 'jug', capacity: 1000 }, { name: 'bottle', capacity: 500 }], useLitres: true } }
    },
    M08_Y6_MEAS: {
        1: { operations: ["calculate_volume", "cube_volume"], math: { dim: { min: 2, max: 10 }, units: ["cm"], missingDim: false } },
        2: { operations: ["calculate_volume", "cube_volume", "cuboid_volume"], math: { dim: { min: 2, max: 12 }, units: ["cm", "m"], missingDim: false } },
        3: { operations: ["calculate_volume", "cube_volume", "cuboid_volume"], math: { dim: { min: 2, max: 15 }, units: ["cm", "m"], missingDim: true } },
        4: { operations: ["calculate_volume", "cube_volume", "cuboid_volume", "composite_volumes"], math: { dim: { min: 2, max: 20 }, units: ["cm", "m", "mm"], missingDim: true } }
    }
};

export const M08_MODULES = {
    'M08_Y5_MEAS': { id: 'M08_Y5_MEAS', name: 'M08_Y5: Estimate', ref: 'M8', yearGroup: '5', strand: 'Measurement', substrand: 'Volume', parameters: MIGRATED_PARAMS['M08_Y5_MEAS'] },
    'M08_Y6_MEAS': { id: 'M08_Y6_MEAS', name: 'M08_Y6: Calculate', ref: 'M8', yearGroup: '6', strand: 'Measurement', substrand: 'Volume', parameters: MIGRATED_PARAMS['M08_Y6_MEAS'] }
};
