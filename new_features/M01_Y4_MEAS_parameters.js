/**
 * Parameters for M01_Y4_MEAS - Year 4 Measurement Comparison with Money
 * 
 * This defines the 4-level parameter progression for comparing money
 * in pounds and pence (£ and p) for Year 4
 */

export const M01_Y4_MEAS = {
    id: 'M01_Y4_MEAS',
    name: 'Compare Money Amounts',
    description: 'Compare different measures, including money in pounds and pence',
    icon: '💷',
    yearGroup: 'Year 4',
    strand: 'Measurement',
    parameters: {
        // Level 1 (Beginning): Whole pounds vs pence, obvious comparisons
        1: {
            min_pounds: 1,
            max_pounds: 5,
            min_pence: 50,
            max_pence: 500,
            operations: ['direct_comparison', 'complete_statement']
        },
        
        // Level 2 (Developing): Add decimal pounds, introduce ordering
        2: {
            min_pounds: 1,
            max_pounds: 10,
            min_pence: 50,
            max_pence: 1000,
            operations: ['direct_comparison', 'complete_statement', 'ordering']
        },
        
        // Level 3 (Meeting): Wider range, all operations including context problems
        3: {
            min_pounds: 1,
            max_pounds: 20,
            min_pence: 50,
            max_pence: 2000,
            operations: ['direct_comparison', 'complete_statement', 'ordering', 'context_problem']
        },
        
        // Level 4 (Exceeding): Large amounts, challenging comparisons
        4: {
            min_pounds: 1,
            max_pounds: 50,
            min_pence: 100,
            max_pence: 5000,
            operations: ['direct_comparison', 'complete_statement', 'ordering', 'context_problem']
        }
    }
};
