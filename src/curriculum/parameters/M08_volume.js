/**
 * M08 Module Series: Volume
 * Covers Years 5-6 progression for volume concepts
 */

export const M08_MODULES = {
    'M08_Y5_MEAS': {
        id: 'M08_Y5_MEAS',
        name: 'M08_Y5_MEAS: Estimate Volume and Capacity',
        description: 'estimate volume [e.g. using 1 cm³ blocks to build cuboids (including cubes)] and capacity [e.g. using water]',
        icon: '📦',
        yearGroup: 'Year 5',
        strand: 'Measurement',
        substrand: 'volume',
        ref: 'M8',
        parameters: {
            1: {
                operations: ['count_unit_cubes', 'estimate_capacity', 'convert_volume_capacity'],
                min_dimension: 2,
                max_dimension: 4,
                objects: [
                    { name: 'cup', capacity: 250 },
                    { name: 'mug', capacity: 350 },
                    { name: 'glass', capacity: 300 }
                ],
                use_litres: false
            },
            2: {
                operations: ['count_unit_cubes', 'estimate_capacity', 'convert_volume_capacity', 'compare_volumes'],
                min_dimension: 3,
                max_dimension: 6,
                objects: [
                    { name: 'water bottle', capacity: 500 },
                    { name: 'jug', capacity: 1000 },
                    { name: 'bowl', capacity: 750 },
                    { name: 'lunchbox', capacity: 800 }
                ],
                use_litres: false
            },
            3: {
                operations: ['count_unit_cubes', 'estimate_capacity', 'convert_volume_capacity', 'compare_volumes'],
                min_dimension: 4,
                max_dimension: 8,
                objects: [
                    { name: 'bucket', capacity: 5000 },
                    { name: 'washing up bowl', capacity: 4000 },
                    { name: 'small fish tank', capacity: 8000 },
                    { name: 'storage box', capacity: 6000 }
                ],
                use_litres: true
            },
            4: {
                operations: ['count_unit_cubes', 'estimate_capacity', 'convert_volume_capacity', 'compare_volumes'],
                min_dimension: 5,
                max_dimension: 10,
                objects: [
                    { name: 'paddling pool', capacity: 50000 },
                    { name: 'bathtub', capacity: 80000 },
                    { name: 'water tank', capacity: 100000 },
                    { name: 'large fish tank', capacity: 60000 }
                ],
                use_litres: true
            }
        }
    },

    'M08_Y6_MEAS': {
        id: 'M08_Y6_MEAS',
        name: 'M08_Y6_MEAS: Calculate Volume with Formulas',
        description: 'calculate, estimate and compare volume of cubes and cuboids using standard units, including centimetre cubed (cm³) and cubic metres (m³), and extending to other units [e.g. mm³ and km³]; recognise when it is possible to use the formulae for the volume of shapes',
        icon: '📦',
        yearGroup: 'Year 6',
        strand: 'Measurement',
        substrand: 'volume',
        ref: 'M8',
        parameters: {
            1: {
                operations: ['calculate_volume', 'cube_volume', 'compare_volumes', 'formula_recognition'],
                min_dimension: 2,
                max_dimension: 10,
                units: ['cm'],
                include_missing_dimension: false,
                include_unit_conversion: false
            },
            2: {
                operations: ['calculate_volume', 'cube_volume', 'compare_volumes', 'formula_recognition', 'missing_dimension'],
                min_dimension: 5,
                max_dimension: 20,
                units: ['cm', 'm'],
                include_missing_dimension: true,
                include_unit_conversion: false
            },
            3: {
                operations: ['calculate_volume', 'cube_volume', 'compare_volumes', 'formula_recognition', 'missing_dimension', 'unit_conversion'],
                min_dimension: 10,
                max_dimension: 50,
                units: ['cm', 'm', 'mm'],
                include_missing_dimension: true,
                include_unit_conversion: true,
                conversions: [
                    { from: 'cm', to: 'm', factor: 1000000 },  // 1 m³ = 1,000,000 cm³
                    { from: 'mm', to: 'cm', factor: 1000 }     // 1 cm³ = 1,000 mm³
                ]
            },
            4: {
                operations: ['calculate_volume', 'cube_volume', 'compare_volumes', 'formula_recognition', 'missing_dimension', 'unit_conversion', 'composite_volume'],
                min_dimension: 15,
                max_dimension: 100,
                units: ['cm', 'm', 'mm', 'km'],
                include_missing_dimension: true,
                include_unit_conversion: true,
                include_composite: true,
                conversions: [
                    { from: 'cm', to: 'm', factor: 1000000 },
                    { from: 'mm', to: 'cm', factor: 1000 },
                    { from: 'm', to: 'km', factor: 1000000000 }  // 1 km³ = 1,000,000,000 m³
                ]
            }
        }
    }
};
