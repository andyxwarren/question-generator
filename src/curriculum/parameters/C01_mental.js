/**
 * C01 Module Series: Mental Addition and Subtraction
 * Add/subtract mentally with number bonds and mental strategies
 * Covers Years 1, 2, 3, 5 (Years 4 and 6 have no specific content)
 */

export const C01_MODULES = {
    'C01_Y1_CALC': {
        id: 'C01_Y1_CALC',
        name: 'C01_Y1_CALC: Number Bonds to 20',
        description: 'Represent and use number bonds and related subtraction facts within 20',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: {
            1: {
                // Beginning: Focus on bonds to 10, simple facts
                max_value: 10,
                operations: [
                    'number_bonds',      // Find pairs that make a target
                    'missing_part',      // a + ? = 10
                    'related_facts',     // If 3+7=10, what is 10-7?
                    'simple_add_sub'     // Direct addition/subtraction
                ],
                target_numbers: [5, 10],  // Focus on bonds to 5 and 10
                fact_families: true,      // Show related facts
                allow_zero: true,
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Extend to 20, more variety
                max_value: 20,
                operations: [
                    'number_bonds',
                    'missing_part',
                    'related_facts',
                    'simple_add_sub',
                    'fact_families'      // Complete fact family
                ],
                target_numbers: [10, 20],
                fact_families: true,
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'part_whole']
            },
            3: {
                // Meeting: Full range to 20, all operations
                max_value: 20,
                operations: [
                    'number_bonds',
                    'missing_part',
                    'related_facts',
                    'simple_add_sub',
                    'fact_families',
                    'mixed_operations'   // Combine concepts
                ],
                target_numbers: [10, 15, 20],
                fact_families: true,
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'part_whole', 'missing_number']
            },
            4: {
                // Exceeding: Rapid recall, complex applications
                max_value: 20,
                operations: [
                    'number_bonds',
                    'missing_part',
                    'related_facts',
                    'simple_add_sub',
                    'fact_families',
                    'mixed_operations',
                    'two_step_bonds'     // Multi-step reasoning
                ],
                target_numbers: [10, 15, 20],
                fact_families: true,
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'part_whole', 'missing_number', 'reasoning']
            }
        }
    },

    'C01_Y2_CALC': {
        id: 'C01_Y2_CALC',
        name: 'C01_Y2_CALC: Mental Facts to 100',
        description: 'Recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100',
        icon: '➕',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: {
            1: {
                // Beginning: Secure facts to 20, introduce deriving to 100
                max_value_basic: 20,    // For recall facts
                max_value_derived: 100, // For derived facts
                operations: [
                    'recall_to_20',      // Direct recall within 20
                    'derive_to_100',     // If 7+8=15, then 70+80=150
                    'missing_addend',    // ? + 6 = 14
                    'related_subtract'   // Related subtraction facts
                ],
                multiples_of_10: true,   // Use multiples of 10 for deriving
                allow_crossing_10: false, // Start without crossing boundaries
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: More complex derived facts
                max_value_basic: 20,
                max_value_derived: 100,
                operations: [
                    'recall_to_20',
                    'derive_to_100',
                    'missing_addend',
                    'related_subtract',
                    'inverse_operations'  // Use inverse to check
                ],
                multiples_of_10: true,
                allow_crossing_10: true,  // Introduce crossing tens
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Full fluency, all fact types
                max_value_basic: 20,
                max_value_derived: 100,
                operations: [
                    'recall_to_20',
                    'derive_to_100',
                    'missing_addend',
                    'related_subtract',
                    'inverse_operations',
                    'fact_families_100'   // Complete families to 100
                ],
                multiples_of_10: true,
                allow_crossing_10: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Rapid recall, complex applications
                max_value_basic: 20,
                max_value_derived: 100,
                operations: [
                    'recall_to_20',
                    'derive_to_100',
                    'missing_addend',
                    'related_subtract',
                    'inverse_operations',
                    'fact_families_100',
                    'near_multiples'      // e.g., 47 + 38 using 50 + 40 - 5
                ],
                multiples_of_10: true,
                allow_crossing_10: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    },

    'C01_Y3_CALC': {
        id: 'C01_Y3_CALC',
        name: 'C01_Y3_CALC: Mental 3-Digit Calculations',
        description: 'Add and subtract numbers mentally, including: a three-digit number and ones, a three-digit number and tens, a three-digit number and hundreds',
        icon: '➕',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: {
            1: {
                // Beginning: 3-digit + ones, simple cases
                min_3digit: 100,
                max_3digit: 300,
                operations: [
                    'add_ones',          // 234 + 5
                    'subtract_ones',     // 234 - 5
                    'add_tens',          // 234 + 30
                    'subtract_tens'      // 234 - 30
                ],
                ones_range: [1, 9],
                tens_range: [10, 50],
                hundreds_range: [100, 300],
                avoid_bridging: true,     // No crossing boundaries initially
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Include hundreds, introduce bridging
                min_3digit: 100,
                max_3digit: 500,
                operations: [
                    'add_ones',
                    'subtract_ones',
                    'add_tens',
                    'subtract_tens',
                    'add_hundreds',      // 234 + 200
                    'subtract_hundreds'  // 434 - 200
                ],
                ones_range: [1, 9],
                tens_range: [10, 90],
                hundreds_range: [100, 400],
                avoid_bridging: false,    // Allow some bridging
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Full curriculum range, all three types
                min_3digit: 100,
                max_3digit: 999,
                operations: [
                    'add_ones',
                    'subtract_ones',
                    'add_tens',
                    'subtract_tens',
                    'add_hundreds',
                    'subtract_hundreds',
                    'mixed_operations'    // Random mix
                ],
                ones_range: [1, 9],
                tens_range: [10, 90],
                hundreds_range: [100, 900],
                avoid_bridging: false,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Complex cases, multiple operations
                min_3digit: 100,
                max_3digit: 999,
                operations: [
                    'add_ones',
                    'subtract_ones',
                    'add_tens',
                    'subtract_tens',
                    'add_hundreds',
                    'subtract_hundreds',
                    'mixed_operations',
                    'two_step_mental'     // 345 + 20 + 6
                ],
                ones_range: [1, 9],
                tens_range: [10, 90],
                hundreds_range: [100, 900],
                avoid_bridging: false,
                allow_complex_bridging: true,  // e.g., 198 + 5
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    },

    'C01_Y5_CALC': {
        id: 'C01_Y5_CALC',
        name: 'C01_Y5_CALC: Mental Calculations with Large Numbers',
        description: 'Add and subtract numbers mentally with increasingly large numbers',
        icon: '➕',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: {
            1: {
                // Beginning: 4-digit numbers, multiples of powers of 10
                min_value: 1000,
                max_value: 9999,
                operations: [
                    'add_multiples_10',      // 3400 + 500
                    'subtract_multiples_10', // 3400 - 500
                    'add_multiples_100',     // 3400 + 2000
                    'subtract_multiples_100', // 5400 - 2000
                    'add_ones_to_4digit',    // 3456 + 7
                    'subtract_ones_from_4digit' // 3456 - 7
                ],
                powers_of_10: [10, 100, 1000],
                avoid_bridging: true,
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Larger numbers, more variety
                min_value: 1000,
                max_value: 99999,
                operations: [
                    'add_multiples_10',
                    'subtract_multiples_10',
                    'add_multiples_100',
                    'subtract_multiples_100',
                    'add_multiples_1000',    // 23000 + 5000
                    'subtract_multiples_1000',
                    'add_any_to_4digit',     // 3456 + 234
                    'subtract_any_from_4digit'
                ],
                powers_of_10: [10, 100, 1000],
                avoid_bridging: false,
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Full range to 1,000,000, mental strategies
                min_value: 1000,
                max_value: 1000000,
                operations: [
                    'add_multiples_10',
                    'subtract_multiples_10',
                    'add_multiples_100',
                    'subtract_multiples_100',
                    'add_multiples_1000',
                    'subtract_multiples_1000',
                    'add_any_to_large',      // Any mental-friendly addition
                    'subtract_any_from_large',
                    'compensation',          // 4999 + 2 = 5000 + 2 - 1
                    'partitioning'           // 3456 + 234 = 3456 + 200 + 30 + 4
                ],
                powers_of_10: [10, 100, 1000, 10000],
                avoid_bridging: false,
                use_strategies: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Most complex mental calculations
                min_value: 1000,
                max_value: 1000000,
                operations: [
                    'add_multiples_10',
                    'subtract_multiples_10',
                    'add_multiples_100',
                    'subtract_multiples_100',
                    'add_multiples_1000',
                    'subtract_multiples_1000',
                    'add_any_to_large',
                    'subtract_any_from_large',
                    'compensation',
                    'partitioning',
                    'near_multiples_large',  // 4998 + 3567
                    'multi_step_mental'      // Multiple operations
                ],
                powers_of_10: [10, 100, 1000, 10000, 100000],
                avoid_bridging: false,
                use_strategies: true,
                allow_complex: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    }
};
