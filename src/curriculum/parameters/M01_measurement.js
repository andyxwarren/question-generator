/**
 * M01 Module Series: Compare, Describe and Order Measures
 * Covers Years 1-4 progression for measurement comparison
 */

export const M01_MODULES = {
    // Year 1 - Descriptive Comparisons
    'M01_Y1_MEAS': {
        id: 'M01_Y1_MEAS',
        name: 'M01_Y1_MEAS: Compare and Order Measures',
        description: 'Compare, describe and solve practical problems for lengths, heights, mass, capacity and time',
        icon: '📏',
        yearGroup: 'Year 1',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                measure_types: ['length', 'height'],
                operations: ['direct_comparison', 'complete_statement']
            },
            2: {
                measure_types: ['length', 'height', 'mass'],
                operations: ['direct_comparison', 'complete_statement', 'ordering']
            },
            3: {
                measure_types: ['length', 'height', 'mass', 'capacity', 'time'],
                operations: ['direct_comparison', 'complete_statement', 'ordering', 'practical_problem']
            },
            4: {
                measure_types: ['length', 'height', 'mass', 'capacity', 'time'],
                operations: ['direct_comparison', 'complete_statement', 'ordering', 'practical_problem'],
                min_difference: 1,  // Allow subtler comparisons for exceeding students
                ordering_count: 4   // Order 4 objects instead of 3
            }
        }
    },

    // Year 2 - Symbols
    'M01_Y2_MEAS': {
        id: 'M01_Y2_MEAS',
        name: 'M01_Y2_MEAS: Compare and Order with Symbols',
        description: 'Compare and order lengths, mass, volume/capacity and record the results using >, < and =',
        icon: '📐',
        yearGroup: 'Year 2',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                measure_types: ['length'],
                units: {
                    length: ['cm'],
                    mass: ['kg'],
                    capacity: ['L']
                },
                min_value: 1,
                max_value: 10,
                operations: ['symbol_selection', 'complete_statement'],
                ordering_count: 3
            },
            2: {
                measure_types: ['length', 'mass'],
                units: {
                    length: ['cm', 'm'],
                    mass: ['kg', 'g'],
                    capacity: ['L']
                },
                min_value: 1,
                max_value: 20,
                operations: ['symbol_selection', 'complete_statement', 'ordering'],
                ordering_count: 3
            },
            3: {
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm', 'm', 'mm'],
                    mass: ['kg', 'g'],
                    capacity: ['L', 'ml']
                },
                min_value: 1,
                max_value: 50,
                operations: ['symbol_selection', 'complete_statement', 'ordering', 'true_false'],
                ordering_count: 4
            },
            4: {
                measure_types: ['length', 'mass', 'capacity'],
                units: {
                    length: ['cm', 'm', 'mm'],
                    mass: ['kg', 'g'],
                    capacity: ['L', 'ml']
                },
                min_value: 1,
                max_value: 100,
                operations: ['symbol_selection', 'complete_statement', 'ordering', 'true_false'],
                ordering_count: 5
            }
        }
    },

    // Year 3 - Mixed Units
    'M01_Y3_MEAS': {
        id: 'M01_Y3_MEAS',
        name: 'M01_Y3_MEAS: Compare with Mixed Units',
        description: 'Compare lengths (m/cm/mm); compare mass (kg/g); compare volume/capacity (L/ml)',
        icon: '📊',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                measure_types: ['length'],
                unit_pairs: {
                    length: [['m', 'cm']],
                    mass: [['kg', 'g']],
                    capacity: [['L', 'ml']]
                },
                max_meters: 3,
                max_cm: 200,
                max_kg: 3,
                max_g: 2000,
                max_L: 3,
                max_ml: 2000,
                operations: ['direct_comparison', 'complete_statement']
            },
            2: {
                measure_types: ['length', 'mass'],
                unit_pairs: {
                    length: [['m', 'cm'], ['cm', 'mm']],
                    mass: [['kg', 'g']],
                    capacity: [['L', 'ml']]
                },
                max_meters: 5,
                max_cm: 300,
                max_mm: 500,
                max_kg: 5,
                max_g: 3000,
                max_L: 5,
                max_ml: 3000,
                operations: ['direct_comparison', 'complete_statement', 'ordering']
            },
            3: {
                measure_types: ['length', 'mass', 'capacity'],
                unit_pairs: {
                    length: [['m', 'cm'], ['cm', 'mm'], ['m', 'mm']],
                    mass: [['kg', 'g']],
                    capacity: [['L', 'ml']]
                },
                max_meters: 5,
                max_cm: 400,
                max_mm: 2000,
                max_kg: 5,
                max_g: 4000,
                max_L: 5,
                max_ml: 4000,
                operations: ['direct_comparison', 'complete_statement', 'ordering', 'unit_recognition']
            },
            4: {
                measure_types: ['length', 'mass', 'capacity'],
                unit_pairs: {
                    length: [['m', 'cm'], ['cm', 'mm'], ['m', 'mm']],
                    mass: [['kg', 'g']],
                    capacity: [['L', 'ml']]
                },
                max_meters: 10,
                max_cm: 800,
                max_mm: 3000,  // Reduced from 5000 to stay within Year 3 comfort zone
                max_kg: 10,
                max_g: 5000,   // Reduced from 8000 to stay within Year 3 comfort zone
                max_L: 10,
                max_ml: 5000,  // Reduced from 8000 to stay within Year 3 comfort zone
                operations: ['direct_comparison', 'complete_statement', 'ordering', 'unit_recognition']
            }
        }
    },

    // Year 4 - Money
    'M01_Y4_MEAS': {
        id: 'M01_Y4_MEAS',
        name: 'M01_Y4_MEAS: Compare Money Amounts',
        description: 'Compare different measures, including money in pounds and pence',
        icon: '💷',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                min_pounds: 1,
                max_pounds: 5,
                min_pence: 50,
                max_pence: 500,
                operations: ['direct_comparison', 'complete_statement']
            },
            2: {
                min_pounds: 1,
                max_pounds: 10,
                min_pence: 50,
                max_pence: 1000,
                operations: ['direct_comparison', 'complete_statement', 'ordering', 'equivalence']
            },
            3: {
                min_pounds: 1,
                max_pounds: 20,
                min_pence: 50,
                max_pence: 2000,
                operations: ['direct_comparison', 'complete_statement', 'ordering', 'context_problem', 'equivalence']
            },
            4: {
                min_pounds: 1,
                max_pounds: 50,
                min_pence: 100,
                max_pence: 5000,
                operations: ['direct_comparison', 'complete_statement', 'ordering', 'context_problem', 'equivalence']
            }
        }
    }
};
