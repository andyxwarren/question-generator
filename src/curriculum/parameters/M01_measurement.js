/**
 * M01 Module Series: Compare, Describe and Order Measures
 * Covers Years 1-4 progression for measurement comparison and ordering
 */

export const M01_MODULES = {
    'M01_Y1_MEAS': {
        id: 'M01_Y1_MEAS',
        name: 'M01_Y1_MEAS: Comparing Measures',
        description: 'Compare, describe and solve practical problems for: lengths and heights (e.g. long/short, taller/shorter); mass/weight (e.g. heavy/light, heavier than); capacity and volume (e.g. full/empty, more than/less than); time (e.g. quicker, slower)',
        icon: '📏',
        yearGroup: 'Year 1',
        strand: 'Measurement',
        substrand: 'compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                operations: ['compare_two'],
                measure_types: ['length', 'height', 'mass'],
                use_descriptors: false
            },
            2: {
                operations: ['compare_two', 'complete_comparative'],
                measure_types: ['length', 'height', 'mass', 'capacity'],
                use_descriptors: false
            },
            3: {
                operations: ['compare_two', 'complete_comparative', 'identify_more_less'],
                measure_types: ['length', 'height', 'mass', 'capacity', 'time'],
                use_descriptors: false
            },
            4: {
                operations: ['compare_two', 'complete_comparative', 'identify_more_less'],
                measure_types: ['length', 'height', 'mass', 'capacity', 'time'],
                use_descriptors: true
            }
        }
    },

    'M01_Y2_MEAS': {
        id: 'M01_Y2_MEAS',
        name: 'M01_Y2_MEAS: Compare and Order Measures',
        description: 'Compare and order lengths, mass, volume/capacity and record the results using >, < and =',
        icon: '📏',
        yearGroup: 'Year 2',
        strand: 'Measurement',
        substrand: 'compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                operations: ['compare_with_symbols', 'order_two'],
                measure_types: ['length', 'mass'],
                min_value: 1,
                max_value: 20,
                use_units: false, // Y2 begins with non-standard units
                allow_equals: false
            },
            2: {
                operations: ['compare_with_symbols', 'order_two', 'order_three'],
                measure_types: ['length', 'mass', 'capacity'],
                min_value: 1,
                max_value: 50,
                use_units: true,  // Introduce standard units
                units: {
                    length: ['cm'],
                    mass: ['g'],
                    capacity: ['ml']
                },
                allow_equals: false
            },
            3: {
                operations: ['compare_with_symbols', 'order_three', 'complete_comparison'],
                measure_types: ['length', 'mass', 'capacity'],
                min_value: 1,
                max_value: 100,
                use_units: true,
                units: {
                    length: ['cm'],
                    mass: ['g'],
                    capacity: ['ml']
                },
                allow_equals: true
            },
            4: {
                operations: ['compare_with_symbols', 'order_three', 'order_four', 'complete_comparison'],
                measure_types: ['length', 'mass', 'capacity'],
                min_value: 1,
                max_value: 100,
                use_units: true,
                units: {
                    length: ['cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                allow_equals: true
            }
        }
    },

    'M01_Y3_MEAS': {
        id: 'M01_Y3_MEAS',
        name: 'M01_Y3_MEAS: Compare Measures with Units',
        description: 'Compare lengths (m/cm/mm); compare mass (kg/g); compare volume/capacity (l/ml)',
        icon: '📏',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                operations: ['compare_same_units', 'order_same_units'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                ranges: {
                    cm: { min: 1, max: 100 },
                    m: { min: 1, max: 10 },
                    g: { min: 10, max: 500 },
                    kg: { min: 1, max: 10 },
                    ml: { min: 10, max: 500 },
                    l: { min: 1, max: 5 }
                },
                compare_same_unit_only: true
            },
            2: {
                operations: ['compare_same_units', 'order_same_units', 'compare_mixed_units_simple'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['mm', 'cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                ranges: {
                    mm: { min: 10, max: 200 },
                    cm: { min: 1, max: 200 },
                    m: { min: 1, max: 20 },
                    g: { min: 10, max: 1000 },
                    kg: { min: 1, max: 20 },
                    ml: { min: 10, max: 1000 },
                    l: { min: 1, max: 10 }
                },
                compare_same_unit_only: false,
                simple_conversions_only: true // e.g., 100 cm vs 1 m
            },
            3: {
                operations: ['compare_same_units', 'compare_mixed_units', 'order_mixed_units'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['mm', 'cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                ranges: {
                    mm: { min: 10, max: 500 },
                    cm: { min: 1, max: 500 },
                    m: { min: 1, max: 100 },
                    g: { min: 10, max: 2000 },
                    kg: { min: 1, max: 50 },
                    ml: { min: 10, max: 2000 },
                    l: { min: 1, max: 20 }
                },
                compare_same_unit_only: false,
                simple_conversions_only: false
            },
            4: {
                operations: ['compare_mixed_units', 'order_mixed_units', 'identify_comparison_symbol'],
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['mm', 'cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l']
                },
                ranges: {
                    mm: { min: 10, max: 1000 },
                    cm: { min: 1, max: 1000 },
                    m: { min: 1, max: 500 },
                    g: { min: 10, max: 5000 },
                    kg: { min: 1, max: 100 },
                    ml: { min: 10, max: 5000 },
                    l: { min: 1, max: 50 }
                },
                compare_same_unit_only: false,
                simple_conversions_only: false,
                include_complex_comparisons: true
            }
        }
    },

    'M01_Y4_MEAS': {
        id: 'M01_Y4_MEAS',
        name: 'M01_Y4_MEAS: Compare Different Measures',
        description: 'Compare different measures, including money in pounds and pence',
        icon: '📏',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                operations: ['compare_measures', 'order_measures', 'compare_money'],
                measure_types: ['length', 'mass', 'capacity', 'money'],
                units: {
                    length: ['mm', 'cm', 'm'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l'],
                    money: ['p', '£']
                },
                ranges: {
                    mm: { min: 10, max: 500 },
                    cm: { min: 1, max: 500 },
                    m: { min: 1, max: 50 },
                    g: { min: 10, max: 1000 },
                    kg: { min: 1, max: 50 },
                    ml: { min: 10, max: 1000 },
                    l: { min: 1, max: 10 },
                    p: { min: 1, max: 99 },
                    pounds: { min: 1, max: 20 }
                },
                money_format: 'simple', // Just pence or just pounds
                compare_same_unit_only: false
            },
            2: {
                operations: ['compare_measures', 'order_measures', 'compare_money', 'order_money'],
                measure_types: ['length', 'mass', 'capacity', 'money'],
                units: {
                    length: ['mm', 'cm', 'm', 'km'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l'],
                    money: ['p', '£', 'mixed']
                },
                ranges: {
                    mm: { min: 10, max: 1000 },
                    cm: { min: 1, max: 1000 },
                    m: { min: 1, max: 1000 },
                    km: { min: 1, max: 10 },
                    g: { min: 10, max: 2000 },
                    kg: { min: 1, max: 100 },
                    ml: { min: 10, max: 2000 },
                    l: { min: 1, max: 20 },
                    p: { min: 1, max: 99 },
                    pounds: { min: 1, max: 50 }
                },
                money_format: 'mixed', // Can include £X.XX format
                compare_same_unit_only: false
            },
            3: {
                operations: ['compare_measures', 'order_measures', 'compare_money', 'order_money', 'multi_measure_comparison'],
                measure_types: ['length', 'mass', 'capacity', 'money'],
                units: {
                    length: ['mm', 'cm', 'm', 'km'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l'],
                    money: ['p', '£', 'mixed']
                },
                ranges: {
                    mm: { min: 10, max: 2000 },
                    cm: { min: 1, max: 2000 },
                    m: { min: 1, max: 2000 },
                    km: { min: 1, max: 50 },
                    g: { min: 10, max: 5000 },
                    kg: { min: 1, max: 200 },
                    ml: { min: 10, max: 5000 },
                    l: { min: 1, max: 50 },
                    p: { min: 1, max: 99 },
                    pounds: { min: 1, max: 100 }
                },
                money_format: 'mixed',
                compare_same_unit_only: false,
                include_word_problems: true
            },
            4: {
                operations: ['compare_measures', 'order_measures', 'compare_money', 'order_money', 'multi_measure_comparison', 'problem_solving'],
                measure_types: ['length', 'mass', 'capacity', 'money'],
                units: {
                    length: ['mm', 'cm', 'm', 'km'],
                    mass: ['g', 'kg'],
                    capacity: ['ml', 'l'],
                    money: ['p', '£', 'mixed']
                },
                ranges: {
                    mm: { min: 10, max: 5000 },
                    cm: { min: 1, max: 5000 },
                    m: { min: 1, max: 5000 },
                    km: { min: 1, max: 100 },
                    g: { min: 10, max: 10000 },
                    kg: { min: 1, max: 500 },
                    ml: { min: 10, max: 10000 },
                    l: { min: 1, max: 100 },
                    p: { min: 1, max: 99 },
                    pounds: { min: 1, max: 200 }
                },
                money_format: 'mixed',
                compare_same_unit_only: false,
                include_word_problems: true,
                include_complex_scenarios: true
            }
        }
    }
};
