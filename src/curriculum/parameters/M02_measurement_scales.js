/**
 * M02: Scales
 * Years 1-4
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M02_Y1_MEAS: {
        1: { operations: ["read_simple_scale"], math: { types: ["length", "capacity"], scale: { max: 10, interval: 1 } }, presentation: { showAllNumbers: true, pointerOnMark: true } },
        2: { operations: ["read_simple_scale", "count_marks"], math: { types: ["length", "capacity", "mass"], scale: { max: 15, interval: 1 } }, presentation: { showAllNumbers: true, pointerOnMark: true } },
        3: { operations: ["read_simple_scale", "choose_unit", "count_marks"], math: { types: ["length", "mass", "capacity", "time"], scale: { max: 20, interval: 1 } }, presentation: { showAllNumbers: false, pointerOnMark: true } },
        4: { operations: ["read_simple_scale", "choose_unit", "count_marks", "compare_measurements"], math: { types: ["length", "mass", "capacity", "time"], scale: { max: 30, interval: 1 } }, presentation: { showAllNumbers: false, pointerOnMark: false } }
    },
    M02_Y2_MEAS: {
        1: { operations: ["read_scale_with_units", "choose_appropriate_unit"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm"], mass: ["g"], capacity: ["ml"] }, ranges: { cm: { min: 0, max: 30, interval: 1 }, g: { min: 0, max: 100, interval: 10 }, ml: { min: 0, max: 100, interval: 10 } } }, presentation: { pointerOnMark: true } },
        2: { operations: ["read_scale_with_units", "choose_appropriate_unit"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "m"], mass: ["g"], capacity: ["ml"] }, ranges: { cm: { min: 0, max: 50, interval: 2 }, m: { min: 0, max: 10, interval: 1 }, g: { min: 0, max: 200, interval: 10 }, ml: { min: 0, max: 200, interval: 10 } } }, presentation: { pointerOnMark: true } },
        3: { operations: ["read_scale_with_units", "choose_appropriate_unit", "read_between_marks"], math: { types: ["length", "mass", "capacity", "temperature"], units: { length: ["cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { cm: { min: 0, max: 100, interval: 2 }, m: { min: 0, max: 20, interval: 2 }, g: { min: 0, max: 500, interval: 50 }, kg: { min: 0, max: 10, interval: 1 }, ml: { min: 0, max: 500, interval: 50 }, l: { min: 0, max: 5, interval: 1 } } }, presentation: { pointerOnMark: true } },
        4: { operations: ["read_scale_with_units", "choose_appropriate_unit", "read_between_marks", "interpret_scales"], math: { types: ["length", "mass", "capacity", "temperature"], units: { length: ["cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { cm: { min: 0, max: 100, interval: 5 }, m: { min: 0, max: 50, interval: 5 }, g: { min: 0, max: 1000, interval: 100 }, kg: { min: 0, max: 20, interval: 2 }, ml: { min: 0, max: 1000, interval: 100 }, l: { min: 0, max: 10, interval: 1 } } }, presentation: { pointerOnMark: false } }
    },
    M02_Y3_MEAS: {
        1: { operations: ["read_scale_precise", "read_different_scales"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "mm"] }, ranges: { cm: { min: 0, max: 30, interval: 1 }, mm: { min: 0, max: 100, interval: 10 } }, useDecimals: false }, presentation: { pointerOnMark: true } },
        2: { operations: ["read_scale_precise", "read_different_scales"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "mm", "m"], mass: ["g"], capacity: ["ml"] }, ranges: { cm: { min: 0, max: 50, interval: 1 }, mm: { min: 0, max: 150, interval: 10 }, m: { min: 0, max: 20, interval: 2 }, g: { min: 0, max: 200, interval: 20 }, ml: { min: 0, max: 200, interval: 20 } }, useDecimals: false }, presentation: { pointerOnMark: true } },
        3: { operations: ["read_scale_precise", "measure_between_marks"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "m"] }, ranges: { cm: { min: 0, max: 200, interval: 2 }, m: { min: 0, max: 50, interval: 5 } }, useDecimals: true }, presentation: { pointerOnMark: false } },
        4: { operations: ["read_scale_precise", "measure_between_marks", "read_different_scales", "compare_scales"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "m", "mm"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { cm: { min: 0, max: 300, interval: 5 }, m: { min: 0, max: 100, interval: 10 }, mm: { min: 0, max: 500, interval: 50 }, g: { min: 0, max: 2000, interval: 200 }, kg: { min: 0, max: 20, interval: 2 }, ml: { min: 0, max: 2000, interval: 200 }, l: { min: 0, max: 20, interval: 2 } }, useDecimals: true }, presentation: { pointerOnMark: false } }
    },
    M02_Y4_MEAS: {
        1: { operations: ["estimate_measurement", "choose_reasonable_estimate"], math: { types: ["length", "mass", "capacity", "money"], ranges: { length: { objects: ["pencil", "book"], units: ["cm"] } } } },
        2: { operations: ["estimate_measurement", "choose_reasonable_estimate", "compare_estimates"], math: { types: ["length", "mass", "capacity"], ranges: { length: { objects: ["pencil", "book", "desk", "door"], units: ["cm", "m"] }, mass: { objects: ["apple", "bag_of_sugar", "book"], units: ["g"] }, capacity: { objects: ["cup", "bottle", "jug"], units: ["ml"] } } } },
        3: { operations: ["estimate_measurement", "choose_reasonable_estimate", "compare_estimates", "check_estimate_range"], math: { types: ["length", "mass", "capacity", "money"], ranges: { length: { objects: ["pencil", "book", "desk", "door", "room", "playground"], units: ["cm", "m", "km"] }, mass: { objects: ["apple", "bag_of_sugar", "book", "person", "car"], units: ["g", "kg"] }, capacity: { objects: ["cup", "bottle", "jug", "bucket", "bath"], units: ["ml", "l"] }, money: { objects: ["pencil", "book", "toy", "meal"], units: ["£"] } } } },
        4: { operations: ["estimate_measurement", "choose_reasonable_estimate", "compare_estimates", "check_estimate_range", "justify_estimate"], math: { types: ["length", "mass", "capacity", "money", "temperature"], ranges: { length: { objects: ["pencil", "book", "desk", "door", "room", "playground", "street", "town"], units: ["mm", "cm", "m", "km"] }, mass: { objects: ["apple", "bag_of_sugar", "book", "person", "car", "elephant"], units: ["g", "kg"] }, capacity: { objects: ["cup", "bottle", "jug", "bucket", "bath", "pool"], units: ["ml", "l"] }, money: { objects: ["pencil", "book", "toy", "meal", "bike", "holiday"], units: ["£"] }, temperature: { contexts: ["freezing", "cold_day", "warm_day", "hot_day", "boiling"], units: ["°C"] } } } }
    }
};

export const M02_MODULES = {
    'M02_Y1_MEAS': { id: 'M02_Y1_MEAS', name: 'M02_Y1: Scales', ref: 'M2', yearGroup: '1', strand: 'Measurement', substrand: 'Reading scales', parameters: MIGRATED_PARAMS['M02_Y1_MEAS'] },
    'M02_Y2_MEAS': { id: 'M02_Y2_MEAS', name: 'M02_Y2: Standard Units', ref: 'M2', yearGroup: '2', strand: 'Measurement', substrand: 'Reading scales', parameters: MIGRATED_PARAMS['M02_Y2_MEAS'] },
    'M02_Y3_MEAS': { id: 'M02_Y3_MEAS', name: 'M02_Y3: Precision', ref: 'M2', yearGroup: '3', strand: 'Measurement', substrand: 'Reading scales', parameters: MIGRATED_PARAMS['M02_Y3_MEAS'] },
    'M02_Y4_MEAS': { id: 'M02_Y4_MEAS', name: 'M02_Y4: Estimation', ref: 'M2', yearGroup: '4', strand: 'Measurement', substrand: 'Reading scales', parameters: MIGRATED_PARAMS['M02_Y4_MEAS'] }
};
