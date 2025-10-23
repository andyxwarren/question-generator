/**
 * Parameters for M01_Y3_MEAS - Year 3 Measurement Comparison with Mixed Units
 * 
 * This defines the 4-level parameter progression for comparing measures
 * using different units (m/cm/mm for length, kg/g for mass, L/ml for capacity)
 */

export const M01_Y3_MEAS = {
    id: 'M01_Y3_MEAS',
    name: 'Compare with Mixed Units',
    description: 'Compare lengths (m/cm/mm); compare mass (kg/g); compare volume/capacity (L/ml)',
    icon: '📊',
    yearGroup: 'Year 3',
    strand: 'Measurement',
    parameters: {
        // Level 1 (Beginning): Single measure type, most common unit pairing, obvious comparisons
        1: {
            measure_types: ['length'],
            unit_pairs: {
                length: [['m', 'cm']],  // Most common pairing
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
        
        // Level 2 (Developing): Add mass, more unit pairings
        2: {
            measure_types: ['length', 'mass'],
            unit_pairs: {
                length: [['m', 'cm'], ['cm', 'mm']],  // Two common pairings
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
        
        // Level 3 (Meeting): All measure types, all unit pairings
        3: {
            measure_types: ['length', 'mass', 'capacity'],
            unit_pairs: {
                length: [['m', 'cm'], ['cm', 'mm'], ['m', 'mm']],  // All pairings including challenging m/mm
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
        
        // Level 4 (Exceeding): Larger ranges, more challenging conversions
        4: {
            measure_types: ['length', 'mass', 'capacity'],
            unit_pairs: {
                length: [['m', 'cm'], ['cm', 'mm'], ['m', 'mm']],
                mass: [['kg', 'g']],
                capacity: [['L', 'ml']]
            },
            max_meters: 10,
            max_cm: 800,
            max_mm: 5000,
            max_kg: 10,
            max_g: 8000,
            max_L: 10,
            max_ml: 8000,
            operations: ['direct_comparison', 'complete_statement', 'ordering', 'unit_recognition']
        }
    }
};
