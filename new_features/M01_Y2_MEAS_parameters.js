/**
 * Parameters for M01_Y2_MEAS - Year 2 Measurement Comparison with Symbols
 * 
 * This defines the 4-level parameter progression for comparing and ordering
 * measures using mathematical symbols (>, <, =) in Year 2
 */

export const M01_Y2_MEAS = {
    id: 'M01_Y2_MEAS',
    name: 'Compare and Order with Symbols',
    description: 'Compare and order lengths, mass, volume/capacity and record the results using >, < and =',
    icon: '📐',
    yearGroup: 'Year 2',
    strand: 'Measurement',
    parameters: {
        // Level 1 (Beginning): Single unit, small numbers, simplest operations
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
        
        // Level 2 (Developing): Add mass, more units, expand range
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
        
        // Level 3 (Meeting): All measure types, all operations
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
        
        // Level 4 (Exceeding): Larger ranges, more items to order
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
};
