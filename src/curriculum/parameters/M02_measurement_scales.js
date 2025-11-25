/**
 * M02: Scales
 * Years 1-4
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M02_Y1_MEAS: {
        1: { operations: ["read_simple_scale"], math: { types: ["length", "capacity"], scale: { max: 10, interval: 1 } }, presentation: { showAllNumbers: true, pointerOnMark: true } },
        3: { operations: ["read_simple_scale", "choose_unit", "count_marks"], math: { types: ["length", "mass", "capacity", "time"], scale: { max: 20, interval: 1 } }, presentation: { showAllNumbers: false, pointerOnMark: true } }
    },
    M02_Y2_MEAS: {
        1: { operations: ["read_scale_with_units", "choose_appropriate_unit"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm"], mass: ["g"], capacity: ["ml"] }, ranges: { cm: { min: 0, max: 30, interval: 1 }, g: { min: 0, max: 100, interval: 10 }, ml: { min: 0, max: 100, interval: 10 } } }, presentation: { pointerOnMark: true } }
    },
    M02_Y3_MEAS: {
        1: { operations: ["read_scale_precise", "read_different_scales"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "mm"] }, ranges: { cm: { min: 0, max: 30, interval: 1 }, mm: { min: 0, max: 100, interval: 10 } }, useDecimals: false }, presentation: { pointerOnMark: true } },
        3: { operations: ["read_scale_precise", "measure_between_marks"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "m"] }, ranges: { cm: { min: 0, max: 200, interval: 2 }, m: { min: 0, max: 50, interval: 5 } }, useDecimals: true }, presentation: { pointerOnMark: false } }
    },
    M02_Y4_MEAS: {
        1: { operations: ["estimate_measurement", "choose_reasonable_estimate"], math: { types: ["length", "mass", "capacity", "money"], ranges: { length: { objects: ["pencil", "book"], units: ["cm"] } } } }
    }
};

export const M02_MODULES = {
    'M02_Y1_MEAS': { id: 'M02_Y1_MEAS', name: 'M02_Y1: Scales', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y1_MEAS'] },
    'M02_Y2_MEAS': { id: 'M02_Y2_MEAS', name: 'M02_Y2: Standard Units', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y2_MEAS'] },
    'M02_Y3_MEAS': { id: 'M02_Y3_MEAS', name: 'M02_Y3: Precision', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y3_MEAS'] },
    'M02_Y4_MEAS': { id: 'M02_Y4_MEAS', name: 'M02_Y4: Estimation', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y4_MEAS'] }
};