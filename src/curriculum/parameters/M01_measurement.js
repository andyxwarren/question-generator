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

    // Year 2 - Symbolic Comparisons
    'M01_Y2_MEAS': {
        id: 'M01_Y2_MEAS',
        name: 'M01_Y2_MEAS: Compare and Order Using Symbols',
        description: 'Compare and order lengths, mass, volume/capacity and record the results using >, < and =',
        icon: '📐',
        yearGroup: 'Year 2',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                measure_types: ['length', 'mass'],
                operations: ['symbol_recognition', 'symbol_matching'],
                symbols: ['>', '<'],  // Introduce > and < first
                comparison_count: 2,
                use_numbers: false,
                provide_statement: true  // Give verbal statement, student selects symbol
            },
            2: {
                measure_types: ['length', 'mass', 'capacity'],
                operations: ['symbol_selection', 'complete_comparison'],
                symbols: ['>', '<', '='],  // Add equals symbol
                comparison_count: 2,
                use_numbers: false,
                provide_statement: false,  // Student determines comparison AND symbol
                visual_cues: true  // Show hints like "Pencil (short)" vs "Rope (long)"
            },
            3: {
                measure_types: ['length', 'mass', 'capacity', 'time'],
                operations: ['symbol_selection', 'complete_comparison', 'ordering_with_symbols', 'chain_comparisons'],
                symbols: ['>', '<', '='],
                comparison_count: [2, 3],  // Mix of pairwise and 3-object ordering
                use_numbers: false,
                provide_statement: false,
                visual_cues: false,  // Remove scaffolding
                require_explanation: false
            },
            4: {
                measure_types: ['length', 'mass', 'capacity', 'time'],
                operations: ['ordering_with_symbols', 'chain_comparisons', 'mixed_comparisons', 'error_identification'],
                symbols: ['>', '<', '='],
                comparison_count: [3, 4],  // Up to 4 objects
                use_numbers: false,
                provide_statement: false,
                visual_cues: false,
                require_explanation: 'optional',  // Occasionally ask for explanation, not always
                include_errors: true  // Error identification questions
            }
        }
    },

    // Year 3 - Numeric Comparisons with Standard Units
    'M01_Y3_MEAS': {
        id: 'M01_Y3_MEAS',
        name: 'M01_Y3_MEAS: Compare and Order Measures with Units',
        description: 'Compare lengths (m/cm/mm); compare mass (kg/g); compare volume/capacity (l/ml)',
        icon: '📊',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                measure_types: ['length', 'mass'],
                operations: ['same_unit_comparison', 'symbol_insertion'],
                unit_mixing: 'none',  // Same units only

                // Length (cm only at Level 1)
                length: {
                    units: ['cm'],
                    min_value_cm: 1,
                    max_value_cm: 20
                },

                // Mass (g only at Level 1)
                mass: {
                    units: ['g'],
                    min_value_g: 10,
                    max_value_g: 100
                },

                comparison_count: 2,
                symbols: ['>', '<', '='],
                allow_equals: true,
                provide_context: true
            },

            2: {
                measure_types: ['length', 'mass', 'capacity'],
                operations: ['same_unit_comparison', 'symbol_insertion', 'ordering'],
                unit_mixing: 'none',  // Still same units only

                // Length (introduce m and mm)
                length: {
                    units: ['cm', 'm', 'mm'],
                    min_value_cm: 1,
                    max_value_cm: 100,
                    min_value_m: 1,
                    max_value_m: 10,
                    min_value_mm: 5,
                    max_value_mm: 50
                },

                // Mass (introduce kg)
                mass: {
                    units: ['g', 'kg'],
                    min_value_g: 10,
                    max_value_g: 1000,
                    min_value_kg: 1,
                    max_value_kg: 10
                },

                // Capacity (introduce at this level)
                capacity: {
                    units: ['ml', 'l'],
                    min_value_ml: 50,
                    max_value_ml: 500,
                    min_value_l: 1,
                    max_value_l: 5
                },

                comparison_count: [2, 3],
                ordering_count: 3,
                symbols: ['>', '<', '='],
                allow_equals: true,
                provide_context: true
            },

            3: {
                measure_types: ['length', 'mass', 'capacity'],
                operations: ['same_unit_comparison', 'mixed_unit_comparison', 'symbol_insertion', 'ordering', 'conversion_sense'],
                unit_mixing: 'within_type',  // KEY: Mixed units introduced

                // Length (full curriculum ranges)
                length: {
                    units: ['cm', 'm', 'mm'],
                    min_value_cm: 1,
                    max_value_cm: 200,
                    min_value_m: 1,
                    max_value_m: 20,
                    min_value_mm: 1,
                    max_value_mm: 100
                },

                // Mass (full curriculum ranges)
                mass: {
                    units: ['g', 'kg'],
                    min_value_g: 1,
                    max_value_g: 2000,
                    min_value_kg: 1,
                    max_value_kg: 20
                },

                // Capacity (full curriculum ranges)
                capacity: {
                    units: ['ml', 'l'],
                    min_value_ml: 1,
                    max_value_ml: 2000,
                    min_value_l: 1,
                    max_value_l: 10
                },

                comparison_count: [2, 3],
                ordering_count: 3,
                symbols: ['>', '<', '='],
                allow_equals: true,
                provide_context: false,  // Remove scaffolding
                require_conversion_thinking: true
            },

            4: {
                measure_types: ['length', 'mass', 'capacity'],
                operations: ['mixed_unit_comparison', 'ordering', 'multi_step_comparison', 'error_identification', 'conversion_sense'],
                unit_mixing: 'within_type',  // Complex mixed units

                // Length (extended ranges)
                length: {
                    units: ['cm', 'm', 'mm'],
                    min_value_cm: 1,
                    max_value_cm: 500,
                    min_value_m: 1,
                    max_value_m: 100,
                    min_value_mm: 1,
                    max_value_mm: 200
                },

                // Mass (extended ranges)
                mass: {
                    units: ['g', 'kg'],
                    min_value_g: 1,
                    max_value_g: 5000,
                    min_value_kg: 1,
                    max_value_kg: 50
                },

                // Capacity (extended ranges)
                capacity: {
                    units: ['ml', 'l'],
                    min_value_ml: 1,
                    max_value_ml: 5000,
                    min_value_l: 1,
                    max_value_l: 20
                },

                comparison_count: [2, 3, 4],
                ordering_count: 4,
                symbols: ['>', '<', '='],
                allow_equals: true,
                include_errors: true,
                multi_step: true,
                bridge_to_y4: true
            }
        }
    },

    // Year 4 - Numeric Comparisons Including Money
    'M01_Y4_MEAS': {
        id: 'M01_Y4_MEAS',
        name: 'M01_Y4_MEAS: Compare Measures Including Money',
        description: 'Compare different measures, including money in pounds and pence',
        icon: '💷',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: {
            1: {
                measure_types: ['length', 'mass', 'money'],
                operations: ['same_unit_comparison', 'symbol_insertion'],
                unit_mixing: 'none',  // Same units only

                // Length (review from Year 3)
                length: {
                    units: ['cm', 'm'],
                    min_value_cm: 5,
                    max_value_cm: 50,
                    min_value_m: 1,
                    max_value_m: 10
                },

                // Mass (review from Year 3)
                mass: {
                    units: ['g', 'kg'],
                    min_value_g: 50,
                    max_value_g: 500,
                    min_value_kg: 1,
                    max_value_kg: 10
                },

                // Money (NEW - pence only, no pounds yet)
                money: {
                    units: ['p'],  // Pence only at Level 1
                    min_value_p: 10,
                    max_value_p: 200,
                    allow_pounds: false,  // No £ notation yet
                    decimal_places: 0  // Whole pence only
                },

                comparison_count: 2,
                symbols: ['>', '<', '='],
                allow_equals: true,
                provide_context: true
            },

            2: {
                measure_types: ['length', 'mass', 'capacity', 'money'],
                operations: ['same_unit_comparison', 'symbol_insertion', 'ordering'],
                unit_mixing: 'none',  // Still same units only

                // Length (expanded from L1)
                length: {
                    units: ['cm', 'm', 'mm'],
                    min_value_cm: 1,
                    max_value_cm: 100,
                    min_value_m: 1,
                    max_value_m: 20,
                    min_value_mm: 10,
                    max_value_mm: 100
                },

                // Mass (expanded from L1)
                mass: {
                    units: ['g', 'kg'],
                    min_value_g: 50,
                    max_value_g: 1000,
                    min_value_kg: 1,
                    max_value_kg: 20
                },

                // Capacity (re-introduce from Year 3)
                capacity: {
                    units: ['ml', 'l'],
                    min_value_ml: 100,
                    max_value_ml: 1000,
                    min_value_l: 1,
                    max_value_l: 10
                },

                // Money (introduce pounds, but keep simple)
                money: {
                    units: ['p', '£'],
                    min_value_p: 10,
                    max_value_p: 500,
                    min_value_pounds: 1,
                    max_value_pounds: 10,
                    allow_pounds: true,  // Introduce £ notation
                    decimal_places: [0, 1],  // £5.00 or £5.50 (simple decimals only)
                    decimal_values: [0, 50],  // Only .00 or .50
                    decimal_step: 0,  // Signals to use decimal_values array
                    allow_mixed_notation: false  // No comparisons like £2 vs 150p yet
                },

                comparison_count: [2, 3],
                ordering_count: 3,
                symbols: ['>', '<', '='],
                allow_equals: true,
                provide_context: true
            },

            3: {
                measure_types: ['length', 'mass', 'capacity', 'money'],
                operations: ['same_unit_comparison', 'mixed_unit_comparison', 'symbol_insertion', 'ordering', 'conversion_sense'],
                unit_mixing: 'within_type',  // KEY: Mixed units introduced

                // Length (full Year 4 range)
                length: {
                    units: ['cm', 'm', 'mm'],
                    min_value_cm: 1,
                    max_value_cm: 300,
                    min_value_m: 1,
                    max_value_m: 50,
                    min_value_mm: 1,
                    max_value_mm: 200
                },

                // Mass (full Year 4 range)
                mass: {
                    units: ['g', 'kg'],
                    min_value_g: 1,
                    max_value_g: 3000,
                    min_value_kg: 1,
                    max_value_kg: 30
                },

                // Capacity (full Year 4 range)
                capacity: {
                    units: ['ml', 'l'],
                    min_value_ml: 1,
                    max_value_ml: 3000,
                    min_value_l: 1,
                    max_value_l: 15
                },

                // Money (CORE Year 4 skill: mixed notation)
                money: {
                    units: ['p', '£'],
                    min_value_p: 10,
                    max_value_p: 999,  // Up to 999p (just under £10)
                    min_value_pounds: 1,
                    max_value_pounds: 20,
                    allow_pounds: true,
                    decimal_places: [0, 1, 2],  // £5.00, £5.50, £5.75 (2 decimal places)
                    decimal_step: 25,  // Use 25p increments (e.g., £2.25, £3.50, £4.75)
                    allow_mixed_notation: true,  // KEY: £2.50 vs 300p comparisons
                    require_conversion: true  // Students must convert to compare
                },

                comparison_count: [2, 3],
                ordering_count: 3,
                symbols: ['>', '<', '='],
                allow_equals: true,
                provide_context: false,  // Remove scaffolding
                require_conversion_thinking: true
            },

            4: {
                measure_types: ['length', 'mass', 'capacity', 'money'],
                operations: ['mixed_unit_comparison', 'ordering', 'multi_step_comparison', 'error_identification', 'conversion_sense', 'practical_problems'],
                unit_mixing: 'within_type',  // Complex mixed units

                // Length (extended range)
                length: {
                    units: ['cm', 'm', 'mm'],
                    min_value_cm: 1,
                    max_value_cm: 500,
                    min_value_m: 1,
                    max_value_m: 100,
                    min_value_mm: 1,
                    max_value_mm: 500
                },

                // Mass (extended range)
                mass: {
                    units: ['g', 'kg'],
                    min_value_g: 1,
                    max_value_g: 5000,
                    min_value_kg: 1,
                    max_value_kg: 50
                },

                // Capacity (extended range)
                capacity: {
                    units: ['ml', 'l'],
                    min_value_ml: 1,
                    max_value_ml: 5000,
                    min_value_l: 1,
                    max_value_l: 25
                },

                // Money (complex decimals and larger ranges)
                money: {
                    units: ['p', '£'],
                    min_value_p: 1,
                    max_value_p: 2000,  // Up to £20 in pence
                    min_value_pounds: 1,
                    max_value_pounds: 50,
                    allow_pounds: true,
                    decimal_places: [0, 1, 2],
                    decimal_step: 1,  // Any pence value (e.g., £3.47, £12.83)
                    allow_mixed_notation: true,
                    require_conversion: true,
                    allow_practical_contexts: true  // Shopping, change, budgeting
                },

                comparison_count: [2, 3, 4],
                ordering_count: 4,
                symbols: ['>', '<', '='],
                allow_equals: true,
                include_errors: true,  // Error identification questions
                multi_step: true,
                bridge_to_y5: true
            }
        }
    }

};
