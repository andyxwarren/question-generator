/**
 * C06 Module Series: Mental Multiplication and Division
 * Multiply/divide mentally with recall and derived facts
 * Covers Years 2, 3, 4, 5, 6 (Year 1 has no specific content)
 */

export const C06_MODULES = {
    'C06_Y2_CALC': {
        id: 'C06_Y2_CALC',
        name: 'C06_Y2_CALC: Times Tables 2, 5, 10 and Odd/Even',
        description: 'Recall and use multiplication and division facts for the 2, 5 and 10 multiplication tables, including recognising odd and even numbers',
        icon: '✖️',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide mentally',
        ref: 'C6',
        parameters: {
            1: {
                // Beginning: Focus on 2, 5, 10 tables up to 5x, simple odd/even
                tables: [2, 5, 10],
                min_multiplier: 1,
                max_multiplier: 5,
                max_product: 50,
                operations: [
                    'multiply_recall',    // 2 × 3 = ?
                    'divide_recall',      // 10 ÷ 2 = ?
                    'odd_even_identify',  // Is 7 odd or even?
                    'groups_of'           // Word problems: groups of
                ],
                odd_even_range: [1, 20],
                allow_zero: false,
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Extend to 10x, more complex odd/even
                tables: [2, 5, 10],
                min_multiplier: 1,
                max_multiplier: 10,
                max_product: 100,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'odd_even_identify',
                    'odd_even_patterns',  // All multiples of 2 are...?
                    'groups_of',
                    'missing_factor'      // ? × 5 = 25
                ],
                odd_even_range: [1, 50],
                allow_zero: false,
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Full recall to 12x, pattern recognition
                tables: [2, 5, 10],
                min_multiplier: 1,
                max_multiplier: 12,
                max_product: 120,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'odd_even_identify',
                    'odd_even_patterns',
                    'odd_even_operations',  // odd + odd = ?
                    'groups_of',
                    'missing_factor',
                    'inverse_mult_div'      // If 5×6=30, what is 30÷5?
                ],
                odd_even_range: [1, 100],
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Rapid recall, complex applications
                tables: [2, 5, 10],
                min_multiplier: 0,
                max_multiplier: 12,
                max_product: 120,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'odd_even_identify',
                    'odd_even_patterns',
                    'odd_even_operations',
                    'groups_of',
                    'missing_factor',
                    'inverse_mult_div',
                    'fact_families_mult',   // Complete multiplication fact family
                    'two_step_multiply'     // 5 × 4 × 2
                ],
                odd_even_range: [1, 100],
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    },

    'C06_Y3_CALC': {
        id: 'C06_Y3_CALC',
        name: 'C06_Y3_CALC: Times Tables 3, 4, 8',
        description: 'Recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide mentally',
        ref: 'C6',
        parameters: {
            1: {
                // Beginning: Focus on 3 and 4 tables up to 6x
                tables: [3, 4],
                min_multiplier: 1,
                max_multiplier: 6,
                max_product: 24,
                operations: [
                    'multiply_recall',    // 3 × 4 = ?
                    'divide_recall',      // 12 ÷ 3 = ?
                    'groups_of',          // Word problems
                    'missing_factor'      // ? × 3 = 15
                ],
                review_tables: [2, 5, 10],  // May include Y2 tables
                allow_zero: false,
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Include 8 table, extend to 10x
                tables: [3, 4, 8],
                min_multiplier: 1,
                max_multiplier: 10,
                max_product: 80,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'groups_of',
                    'missing_factor',
                    'inverse_mult_div',   // If 4×7=28, what is 28÷4?
                    'double_relationships' // 4 is double 2, 8 is double 4
                ],
                review_tables: [2, 5, 10],
                allow_zero: false,
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Full recall to 12x, all three tables
                tables: [3, 4, 8],
                min_multiplier: 1,
                max_multiplier: 12,
                max_product: 96,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'groups_of',
                    'missing_factor',
                    'inverse_mult_div',
                    'double_relationships',
                    'fact_families_mult',  // Complete fact families
                    'mixed_tables'         // Random mix including Y2 tables
                ],
                review_tables: [2, 5, 10],
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Rapid recall, complex applications
                tables: [3, 4, 8],
                min_multiplier: 0,
                max_multiplier: 12,
                max_product: 96,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'groups_of',
                    'missing_factor',
                    'inverse_mult_div',
                    'double_relationships',
                    'fact_families_mult',
                    'mixed_tables',
                    'scaling_problems',    // 3 times as many
                    'two_step_multiply'    // 3 × 4 × 2
                ],
                review_tables: [2, 5, 10],
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    },

    'C06_Y4_CALC': {
        id: 'C06_Y4_CALC',
        name: 'C06_Y4_CALC: All Tables to 12×12',
        description: 'Recall multiplication and division facts for multiplication tables up to 12 x 12; use place value, known and derived facts to multiply and divide mentally, including: multiplying by 0 and 1, dividing by 1, multiplying together three numbers; recognise and use factor pairs and commutativity in mental calculations',
        icon: '✖️',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide mentally',
        ref: 'C6',
        parameters: {
            1: {
                // Beginning: Focus on 6, 7, 9 tables, introduce all concepts
                tables: [6, 7, 9],
                all_tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                min_multiplier: 1,
                max_multiplier: 10,
                max_product: 90,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'multiply_by_0_1',     // Special cases: n×0, n×1
                    'divide_by_1',         // Special case: n÷1
                    'factor_pairs',        // Find factor pairs of 12
                    'commutativity'        // 3×4 = 4×3
                ],
                factor_pair_range: [1, 50],
                allow_zero: true,
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Include 11, 12 tables, three numbers
                tables: [6, 7, 9, 11, 12],
                all_tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                min_multiplier: 1,
                max_multiplier: 12,
                max_product: 144,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'multiply_by_0_1',
                    'divide_by_1',
                    'factor_pairs',
                    'commutativity',
                    'multiply_three',      // 2 × 3 × 4
                    'use_factors'          // Multiply 15 × 4 using 15 × 2 × 2
                ],
                factor_pair_range: [1, 100],
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Full recall all tables to 12×12, apply strategies
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                all_tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                min_multiplier: 0,
                max_multiplier: 12,
                max_product: 144,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'multiply_by_0_1',
                    'divide_by_1',
                    'factor_pairs',
                    'commutativity',
                    'multiply_three',
                    'use_factors',
                    'derived_facts',       // If 7×8=56, what is 7×16?
                    'place_value_multiply' // 30 × 4 using 3 × 4
                ],
                factor_pair_range: [1, 144],
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Complex mental strategies, all applications
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                all_tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                min_multiplier: 0,
                max_multiplier: 12,
                max_product: 144,
                operations: [
                    'multiply_recall',
                    'divide_recall',
                    'multiply_by_0_1',
                    'divide_by_1',
                    'factor_pairs',
                    'commutativity',
                    'multiply_three',
                    'use_factors',
                    'derived_facts',
                    'place_value_multiply',
                    'associativity',       // (2×3)×4 = 2×(3×4)
                    'mental_strategies'    // Combine multiple strategies
                ],
                factor_pair_range: [1, 200],
                allow_zero: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    },

    'C06_Y5_CALC': {
        id: 'C06_Y5_CALC',
        name: 'C06_Y5_CALC: Mental Multiplication/Division and Powers of 10',
        description: 'Multiply and divide numbers mentally drawing upon known facts; multiply and divide whole numbers and those involving decimals by 10, 100 and 1,000',
        icon: '✖️',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide mentally',
        ref: 'C6',
        parameters: {
            1: {
                // Beginning: Use known facts, introduce ×/÷ by 10
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                powers_of_10: [10],
                whole_number_range: [1, 100],
                decimal_places: 1,
                operations: [
                    'derive_from_known',   // If 6×7=42, what is 60×7?
                    'multiply_by_10',      // 23 × 10, 3.4 × 10
                    'divide_by_10',        // 230 ÷ 10, 34 ÷ 10
                    'near_multiples',      // 19 × 5 using 20 × 5 - 5
                    'doubling_halving'     // 8 × 15 = 4 × 30
                ],
                allow_decimals: true,
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Include ×/÷ by 100, 2 decimal places
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                powers_of_10: [10, 100],
                whole_number_range: [1, 1000],
                decimal_places: 2,
                operations: [
                    'derive_from_known',
                    'multiply_by_10',
                    'divide_by_10',
                    'multiply_by_100',     // 23 × 100, 3.45 × 100
                    'divide_by_100',       // 2300 ÷ 100, 345 ÷ 100
                    'near_multiples',
                    'doubling_halving',
                    'partition_multiply'   // 23 × 4 = (20 × 4) + (3 × 4)
                ],
                allow_decimals: true,
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Include ×/÷ by 1000, all strategies
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                powers_of_10: [10, 100, 1000],
                whole_number_range: [1, 10000],
                decimal_places: 2,
                operations: [
                    'derive_from_known',
                    'multiply_by_10',
                    'divide_by_10',
                    'multiply_by_100',
                    'divide_by_100',
                    'multiply_by_1000',    // 23 × 1000, 3.45 × 1000
                    'divide_by_1000',      // 23000 ÷ 1000, 3450 ÷ 1000
                    'near_multiples',
                    'doubling_halving',
                    'partition_multiply',
                    'compensate'           // 99 × 6 = 100 × 6 - 6
                ],
                allow_decimals: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Complex mental calculations, 3 decimal places
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                powers_of_10: [10, 100, 1000],
                whole_number_range: [1, 100000],
                decimal_places: 3,
                operations: [
                    'derive_from_known',
                    'multiply_by_10',
                    'divide_by_10',
                    'multiply_by_100',
                    'divide_by_100',
                    'multiply_by_1000',
                    'divide_by_1000',
                    'near_multiples',
                    'doubling_halving',
                    'partition_multiply',
                    'compensate',
                    'chain_operations',    // 45 × 20 = 45 × 10 × 2
                    'decimal_mental'       // 2.5 × 4, 7.5 ÷ 3
                ],
                allow_decimals: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    },

    'C06_Y6_CALC': {
        id: 'C06_Y6_CALC',
        name: 'C06_Y6_CALC: Mental Calculations with Mixed Operations',
        description: 'Perform mental calculations, including with mixed operations and large numbers',
        icon: '✖️',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide mentally',
        ref: 'C6',
        parameters: {
            1: {
                // Beginning: Two operations, medium numbers
                number_range: [1, 1000],
                operations: [
                    'two_operation_add_mult',    // 5 + 3 × 2
                    'two_operation_sub_mult',    // 20 - 4 × 2
                    'two_operation_add_div',     // 10 + 20 ÷ 4
                    'parentheses_simple',        // (5 + 3) × 2
                    'mental_mult_large',         // 25 × 8
                    'mental_div_large'           // 360 ÷ 4
                ],
                allow_decimals: false,
                use_parentheses: true,
                max_operations: 2,
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Three operations, larger numbers, decimals
                number_range: [1, 10000],
                operations: [
                    'two_operation_add_mult',
                    'two_operation_sub_mult',
                    'two_operation_add_div',
                    'two_operation_sub_div',     // 100 - 60 ÷ 3
                    'three_operations',          // 10 + 5 × 2 - 3
                    'parentheses_simple',
                    'parentheses_nested',        // (20 - (8 + 2)) × 5
                    'mental_mult_large',
                    'mental_div_large',
                    'decimals_mixed'             // 2.5 × 4 + 10
                ],
                allow_decimals: true,
                use_parentheses: true,
                max_operations: 3,
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Complex mixed operations, order of operations
                number_range: [1, 100000],
                operations: [
                    'two_operation_add_mult',
                    'two_operation_sub_mult',
                    'two_operation_add_div',
                    'two_operation_sub_div',
                    'three_operations',
                    'four_operations',           // All four operations mixed
                    'parentheses_simple',
                    'parentheses_nested',
                    'mental_mult_large',
                    'mental_div_large',
                    'decimals_mixed',
                    'order_of_operations',       // Explain which operation first
                    'squares_in_calc'            // 5² + 10
                ],
                allow_decimals: true,
                use_parentheses: true,
                max_operations: 4,
                include_squares: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: Most complex mental calculations
                number_range: [1, 1000000],
                operations: [
                    'two_operation_add_mult',
                    'two_operation_sub_mult',
                    'two_operation_add_div',
                    'two_operation_sub_div',
                    'three_operations',
                    'four_operations',
                    'parentheses_simple',
                    'parentheses_nested',
                    'parentheses_multiple',      // (5 + 3) × (8 - 2)
                    'mental_mult_large',
                    'mental_div_large',
                    'decimals_mixed',
                    'order_of_operations',
                    'squares_in_calc',
                    'cubes_in_calc',            // 2³ + 10
                    'multi_step_mental',         // Complex multi-step problems
                    'negative_numbers'           // Include negative results
                ],
                allow_decimals: true,
                allow_negatives: true,
                use_parentheses: true,
                max_operations: 5,
                include_squares: true,
                include_cubes: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    }
};
