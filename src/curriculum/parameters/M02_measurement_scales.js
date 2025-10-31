/**
 * M02 Module Series: Estimate, Measure and Read Scales
 * Covers Years 1-4 progression for measurement estimation and reading scales
 */

export const M02_MODULES = {
    'M02_Y1_MEAS': {
        id: 'M02_Y1_MEAS',
        name: 'M02_Y1_MEAS: Measure and Record',
        description: 'Measure and begin to record: lengths and heights; mass/weight; capacity and volume; time (hours, minutes, seconds)',
        icon: '📐',
        yearGroup: 'Year 1',
        strand: 'Measurement',
        substrand: 'estimate, measure and read scales',
        ref: 'M2',
        parameters: {
            1: {
                operations: ['read_simple_scale'],
                measure_types: ['length', 'capacity'],
                scale_max: 10,
                interval: 1,
                show_all_numbers: true,
                pointer_on_mark: true
            },
            2: {
                operations: ['read_simple_scale', 'choose_unit'],
                measure_types: ['length', 'mass', 'capacity'],
                scale_max: 20,
                interval: 1,
                show_all_numbers: true,
                pointer_on_mark: true
            },
            3: {
                operations: ['read_simple_scale', 'choose_unit', 'count_marks'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                scale_max: 20,
                interval: 1,
                show_all_numbers: false, // Some numbers missing
                pointer_on_mark: true
            },
            4: {
                operations: ['read_simple_scale', 'choose_unit', 'count_marks'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                scale_max: 35,  // Adjusted from 50 based on validation feedback
                interval: 1,    // Kept at 1 to maintain one challenge factor
                show_all_numbers: false,
                pointer_on_mark: false // Between marks - this is the main challenge
            }
        }
    },

    'M02_Y2_MEAS': {
        id: 'M02_Y2_MEAS',
        name: 'M02_Y2_MEAS: Standard Units',
        description: 'Choose and use appropriate standard units to estimate and measure: length/height (m/cm); mass (kg/g); temperature (°C); capacity (litres/ml) to the nearest appropriate unit',
        icon: '📐',
        yearGroup: 'Year 2',
        strand: 'Measurement',
        substrand: 'estimate, measure and read scales',
        ref: 'M2',
        parameters: {
            1: {
                operations: ['read_scale_with_units', 'choose_appropriate_unit'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm'],
                    mass: ['g'],
                    capacity: ['ml']
                },
                ranges: {
                    cm: { min: 0, max: 30, interval: 1 },
                    g: { min: 0, max: 100, interval: 10 },
                    ml: { min: 0, max: 100, interval: 10 }
                },
                pointer_on_mark: true
            },
            2: {
                operations: ['read_scale_with_units', 'choose_appropriate_unit', 'estimate_measurement'],
                measure_types: ['length', 'mass', 'capacity', 'temperature'],
                units: {
                    length: ['cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l'],
                    temperature: ['°C']
                },
                ranges: {
                    cm: { min: 0, max: 50, interval: 1 },
                    m: { min: 0, max: 5, interval: 1 },
                    g: { min: 0, max: 500, interval: 50 },
                    kg: { min: 0, max: 5, interval: 1 },
                    ml: { min: 0, max: 500, interval: 50 },
                    l: { min: 0, max: 5, interval: 1 },
                    celsius: { min: 0, max: 40, interval: 5 }
                },
                pointer_on_mark: true
            },
            3: {
                operations: ['read_scale_with_units', 'choose_appropriate_unit', 'estimate_measurement', 'read_to_nearest'],
                measure_types: ['length', 'mass', 'capacity', 'temperature'],
                units: {
                    length: ['cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l'],
                    temperature: ['°C']
                },
                ranges: {
                    cm: { min: 0, max: 100, interval: 2 },
                    m: { min: 0, max: 10, interval: 1 },
                    g: { min: 0, max: 1000, interval: 100 },
                    kg: { min: 0, max: 10, interval: 1 },
                    ml: { min: 0, max: 1000, interval: 100 },
                    l: { min: 0, max: 10, interval: 1 },
                    celsius: { min: -10, max: 50, interval: 5 }
                },
                pointer_on_mark: false
            },
            4: {
                operations: ['read_scale_with_units', 'choose_appropriate_unit', 'estimate_measurement', 'read_to_nearest'],
                measure_types: ['length', 'mass', 'capacity', 'temperature'],
                units: {
                    length: ['cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l'],
                    temperature: ['°C']
                },
                ranges: {
                    cm: { min: 0, max: 200, interval: 5 },
                    m: { min: 0, max: 20, interval: 2 },
                    g: { min: 0, max: 2000, interval: 200 },
                    kg: { min: 0, max: 20, interval: 2 },
                    ml: { min: 0, max: 2000, interval: 200 },
                    l: { min: 0, max: 20, interval: 2 },
                    celsius: { min: -20, max: 100, interval: 10 }
                },
                pointer_on_mark: false
            }
        }
    },

    'M02_Y3_MEAS': {
        id: 'M02_Y3_MEAS',
        name: 'M02_Y3_MEAS: Measure Precisely',
        description: 'Measure lengths (m/cm/mm); measure mass (kg/g); measure volume / capacity (l/ml)',
        icon: '📐',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'estimate, measure and read scales',
        ref: 'M2',
        parameters: {
            1: {
                operations: ['read_scale_precise', 'read_different_scales'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm', 'mm'],
                    mass: ['g'],
                    capacity: ['ml']
                },
                ranges: {
                    cm: { min: 0, max: 30, interval: 1 },
                    mm: { min: 0, max: 100, interval: 10 },
                    g: { min: 0, max: 500, interval: 50 },
                    ml: { min: 0, max: 500, interval: 50 }
                },
                use_decimals: false,
                pointer_on_mark: true
            },
            2: {
                operations: ['read_scale_precise', 'read_different_scales', 'simple_conversion'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm', 'mm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                ranges: {
                    mm: { min: 0, max: 500, interval: 10 },
                    cm: { min: 0, max: 100, interval: 1 },
                    m: { min: 0, max: 10, interval: 1 },
                    g: { min: 0, max: 1000, interval: 100 },
                    kg: { min: 0, max: 10, interval: 1 },
                    ml: { min: 0, max: 1000, interval: 100 },
                    l: { min: 0, max: 10, interval: 1 }
                },
                use_decimals: false,
                pointer_on_mark: true,
                conversion_type: 'simple' // e.g., 1000ml = 1l, etc.
            },
            3: {
                operations: ['read_scale_precise', 'read_different_scales', 'simple_conversion', 'measure_between_marks'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm', 'mm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                ranges: {
                    mm: { min: 0, max: 1000, interval: 10 },
                    cm: { min: 0, max: 200, interval: 2 },
                    m: { min: 0, max: 50, interval: 5 },
                    g: { min: 0, max: 2000, interval: 100 },
                    kg: { min: 0, max: 50, interval: 5 },
                    ml: { min: 0, max: 2000, interval: 100 },
                    l: { min: 0, max: 50, interval: 5 }
                },
                use_decimals: true,
                pointer_on_mark: false,
                conversion_type: 'standard'
            },
            4: {
                operations: ['read_scale_precise', 'read_different_scales', 'simple_conversion', 'measure_between_marks', 'complex_scales'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm', 'mm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                ranges: {
                    mm: { min: 0, max: 2000, interval: 20 },
                    cm: { min: 0, max: 500, interval: 5 },
                    m: { min: 0, max: 100, interval: 10 },
                    g: { min: 0, max: 5000, interval: 200 },
                    kg: { min: 0, max: 100, interval: 10 },
                    ml: { min: 0, max: 5000, interval: 200 },
                    l: { min: 0, max: 100, interval: 10 }
                },
                use_decimals: true,
                pointer_on_mark: false,
                conversion_type: 'complex'
            }
        }
    },

    'M02_Y4_MEAS': {
        id: 'M02_Y4_MEAS',
        name: 'M02_Y4_MEAS: Estimate Measures',
        description: 'Estimate different measures, including money in pounds and pence',
        icon: '📐',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'estimate, measure and read scales',
        ref: 'M2',
        parameters: {
            1: {
                operations: ['estimate_measurement', 'choose_reasonable_estimate'],
                measure_types: ['length', 'mass', 'capacity', 'money'],
                estimation_ranges: {
                    length: { objects: ['pencil', 'book', 'desk'], units: ['cm', 'm'] },
                    mass: { objects: ['apple', 'bag of sugar', 'textbook'], units: ['g', 'kg'] },
                    capacity: { objects: ['cup', 'bottle', 'bucket'], units: ['ml', 'l'] },
                    money: { objects: ['chocolate bar', 'magazine', 'book'], units: ['p', '£'] }
                },
                difficulty: 'simple'
            },
            2: {
                operations: ['estimate_measurement', 'choose_reasonable_estimate', 'estimate_money'],
                measure_types: ['length', 'mass', 'capacity', 'money'],
                estimation_ranges: {
                    length: { objects: ['pencil', 'book', 'desk', 'room width', 'car'], units: ['cm', 'm'] },
                    mass: { objects: ['apple', 'bag of sugar', 'textbook', 'laptop', 'child'], units: ['g', 'kg'] },
                    capacity: { objects: ['cup', 'bottle', 'bucket', 'bath', 'swimming pool'], units: ['ml', 'l'] },
                    money: { objects: ['snack', 'book', 'toy', 'game', 'bicycle'], units: ['p', '£'] }
                },
                difficulty: 'moderate',
                include_distractors: true
            },
            3: {
                operations: ['estimate_measurement', 'choose_reasonable_estimate', 'estimate_money', 'compare_estimates'],
                measure_types: ['length', 'mass', 'capacity', 'money', 'time'],
                estimation_ranges: {
                    length: { objects: ['pencil', 'book', 'desk', 'room width', 'car', 'football pitch'], units: ['mm', 'cm', 'm', 'km'] },
                    mass: { objects: ['coin', 'apple', 'bag of sugar', 'textbook', 'laptop', 'child', 'adult'], units: ['g', 'kg'] },
                    capacity: { objects: ['spoon', 'cup', 'bottle', 'bucket', 'bath', 'swimming pool'], units: ['ml', 'l'] },
                    money: { objects: ['sweet', 'snack', 'book', 'toy', 'game', 'bicycle', 'laptop'], units: ['p', '£'] },
                    time: { objects: ['blink', 'brush teeth', 'lesson', 'sleep', 'day'], units: ['seconds', 'minutes', 'hours'] }
                },
                difficulty: 'challenging',
                include_distractors: true
            },
            4: {
                operations: ['estimate_measurement', 'choose_reasonable_estimate', 'estimate_money', 'compare_estimates', 'estimate_from_context'],
                measure_types: ['length', 'mass', 'capacity', 'money', 'time'],
                estimation_ranges: {
                    length: { objects: ['hair width', 'pencil', 'book', 'desk', 'room width', 'car', 'football pitch', 'town'], units: ['mm', 'cm', 'm', 'km'] },
                    mass: { objects: ['feather', 'coin', 'apple', 'bag of sugar', 'textbook', 'laptop', 'child', 'adult'], units: ['g', 'kg'] },
                    capacity: { objects: ['teaspoon', 'spoon', 'cup', 'bottle', 'bucket', 'bath', 'swimming pool', 'lake'], units: ['ml', 'l'] },
                    money: { objects: ['penny sweet', 'snack', 'book', 'toy', 'game', 'bicycle', 'laptop', 'car'], units: ['p', '£'] },
                    time: { objects: ['blink', 'heartbeat', 'brush teeth', 'lesson', 'school day', 'sleep', 'week'], units: ['seconds', 'minutes', 'hours', 'days'] }
                },
                difficulty: 'complex',
                include_distractors: true,
                include_contextual: true
            }
        }
    }
};
