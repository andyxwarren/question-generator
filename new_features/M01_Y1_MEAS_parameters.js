/**
 * Parameters for M01_Y1_MEAS - Year 1 Measurement Comparison
 * 
 * This defines the 4-level parameter progression for comparing, describing 
 * and ordering measures in Year 1
 */

export const M01_Y1_MEAS = {
    id: 'M01_Y1_MEAS',
    name: 'Compare and Order Measures',
    description: 'Compare, describe and solve practical problems for lengths, heights, mass, capacity and time',
    icon: '📏',
    yearGroup: 'Year 1',
    strand: 'Measurement',
    parameters: {
        // Level 1 (Beginning): Focus on most concrete measure types with simplest operations
        1: {
            measure_types: ['length', 'height'],  // Most concrete for 5-6 year olds
            operations: ['direct_comparison', 'complete_statement']  // Two simplest operations
        },
        
        // Level 2 (Developing): Add mass, introduce ordering
        2: {
            measure_types: ['length', 'height', 'mass'],  // Add weight/mass
            operations: ['direct_comparison', 'complete_statement', 'ordering']  // Add ordering
        },
        
        // Level 3 (Meeting): Add capacity and time - full curriculum coverage
        3: {
            measure_types: ['length', 'height', 'mass', 'capacity', 'time'],  // All measure types including time
            operations: ['direct_comparison', 'complete_statement', 'ordering', 'practical_problem']  // All operations
        },
        
        // Level 4 (Exceeding): Full coverage with more challenging scenarios
        4: {
            measure_types: ['length', 'height', 'mass', 'capacity', 'time'],  // All measure types including time
            operations: ['direct_comparison', 'complete_statement', 'ordering', 'practical_problem']  // All operations
        }
    }
};
