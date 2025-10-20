/**
 * C07 Module Series: Written Multiplication and Division Methods
 * Multiply/divide using formal written methods
 * Covers Years 2, 3, 4, 5, 6
 */

export const C07_MODULES = {
    'C07_Y2_CALC': {
        id: 'C07_Y2_CALC',
        name: 'C07_Y2_CALC: Writing Multiplication and Division Statements',
        description: 'Calculate mathematical statements for multiplication and division within the multiplication tables and write them using the multiplication (×), division (÷) and equals (=) signs',
        icon: '✖️➗',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide using written methods',
        ref: 'C7',
        parameters: {
            1: {
                // Beginning: Focus on 2, 5, 10 tables, basic symbol use
                tables: [2, 5, 10],
                min_multiplier: 1,
                max_multiplier: 5,
                max_product: 50,
                operations: [
                    'write_multiplication',    // Write "3 groups of 5" as 3 × 5
                    'calculate_multiply',      // Calculate 2 × 4 = ?
                    'calculate_divide',        // Calculate 10 ÷ 2 = ?
                    'complete_equation'        // 5 × ? = 20
                ],
                use_word_form: true,
                allow_zero: false,
                question_styles: ['equation', 'word_to_symbol']
            },
            2: {
                // Developing: Extend to 10x, introduce arrays
                tables: [2, 5, 10],
                min_multiplier: 1,
                max_multiplier: 10,
                max_product: 100,
                operations: [
                    'write_multiplication',
                    'calculate_multiply',
                    'calculate_divide',
                    'complete_equation',
                    'symbol_interpretation',   // Match equation to word problem
                    'write_fact_family'        // Write related facts
                ],
                use_word_form: true,
                allow_zero: false,
                question_styles: ['equation', 'word_to_symbol', 'symbol_to_word']
            },
            3: {
                // Meeting: Full tables, multiple representations
                tables: [2, 5, 10],
                min_multiplier: 1,
                max_multiplier: 12,
                max_product: 120,
                operations: [
                    'write_multiplication',
                    'calculate_multiply',
                    'calculate_divide',
                    'complete_equation',
                    'symbol_interpretation',
                    'write_fact_family',
                    'compare_statements'       // Which is greater: 5×3 or 4×4?
                ],
                use_word_form: true,
                allow_zero: true,
                question_styles: ['equation', 'word_to_symbol', 'symbol_to_word', 'comparison']
            },
            4: {
                // Exceeding: All operations, complex applications
                tables: [2, 5, 10],
                min_multiplier: 0,
                max_multiplier: 12,
                max_product: 120,
                operations: [
                    'write_multiplication',
                    'calculate_multiply',
                    'calculate_divide',
                    'complete_equation',
                    'symbol_interpretation',
                    'write_fact_family',
                    'compare_statements',
                    'multi_step_equation'      // Calculate 20 ÷ 5 × 2
                ],
                use_word_form: true,
                allow_zero: true,
                question_styles: ['equation', 'word_to_symbol', 'symbol_to_word', 'comparison', 'multi_step']
            }
        }
    },

    'C07_Y3_CALC': {
        id: 'C07_Y3_CALC',
        name: 'C07_Y3_CALC: 2-Digit × 1-Digit Written Methods',
        description: 'Write and calculate mathematical statements for multiplication and division using the multiplication tables that pupils know, including for two-digit numbers times one-digit numbers, using mental and progressing to formal written methods',
        icon: '✖️➗',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide using written methods',
        ref: 'C7',
        parameters: {
            1: {
                // Beginning: Simple 2-digit × 1-digit, no carrying
                multiplicand_range: [11, 33],  // 2-digit numbers
                multiplier_range: [2, 3],      // 1-digit multipliers
                max_product: 99,
                require_carrying: false,
                operations: [
                    'columnar_multiply',       // Standard columnar layout
                    'expanded_multiply',       // 23 × 3 = (20 × 3) + (3 × 3)
                    'division_grouping'        // 24 ÷ 3 (as repeated subtraction)
                ],
                tables_known: [2, 3, 4, 5, 8, 10],
                show_method: true,
                question_styles: ['columnar', 'expanded']
            },
            2: {
                // Developing: Include carrying, extend multiplier range
                multiplicand_range: [11, 99],
                multiplier_range: [2, 6],
                max_product: 300,
                require_carrying: 'sometimes',  // Mix of with/without
                operations: [
                    'columnar_multiply',
                    'expanded_multiply',
                    'division_grouping',
                    'columnar_with_carrying'   // Explicit carrying shown
                ],
                tables_known: [2, 3, 4, 5, 6, 8, 10],
                show_method: true,
                question_styles: ['columnar', 'expanded', 'with_carrying']
            },
            3: {
                // Meeting: Full 2-digit range, all single-digit multipliers
                multiplicand_range: [11, 99],
                multiplier_range: [2, 9],
                max_product: 900,
                require_carrying: 'sometimes',
                operations: [
                    'columnar_multiply',
                    'expanded_multiply',
                    'division_grouping',
                    'columnar_with_carrying',
                    'missing_digit_multiply'   // Fill in missing digit in calculation
                ],
                tables_known: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                show_method: true,
                question_styles: ['columnar', 'expanded', 'with_carrying', 'missing_number']
            },
            4: {
                // Exceeding: Complex calculations, larger numbers
                multiplicand_range: [11, 99],
                multiplier_range: [2, 12],
                max_product: 1200,
                require_carrying: 'always',
                operations: [
                    'columnar_multiply',
                    'expanded_multiply',
                    'division_grouping',
                    'columnar_with_carrying',
                    'missing_digit_multiply',
                    'grid_method'              // Grid/area model method
                ],
                tables_known: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                show_method: true,
                question_styles: ['columnar', 'expanded', 'with_carrying', 'missing_number', 'grid']
            }
        }
    },

    'C07_Y4_CALC': {
        id: 'C07_Y4_CALC',
        name: 'C07_Y4_CALC: 2/3-Digit × 1-Digit Formal Written Layout',
        description: 'Multiply two-digit and three-digit numbers by a one-digit number using formal written layout',
        icon: '✖️',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide using written methods',
        ref: 'C7',
        parameters: {
            1: {
                // Beginning: 2-digit × 1-digit with focus on method
                multiplicand_range: [11, 99],
                multiplier_range: [2, 7],
                digit_count: [2],              // 2-digit only
                operations: [
                    'columnar_multiply',
                    'columnar_with_carrying',
                    'grid_method'
                ],
                require_carrying: 'sometimes',
                show_working: true,
                question_styles: ['columnar', 'grid']
            },
            2: {
                // Developing: Introduce 3-digit × 1-digit
                multiplicand_range: [11, 999],
                multiplier_range: [2, 9],
                digit_count: [2, 3],           // Mix of 2 and 3 digit
                operations: [
                    'columnar_multiply',
                    'columnar_with_carrying',
                    'grid_method',
                    'missing_digit_multiply'
                ],
                require_carrying: 'sometimes',
                show_working: true,
                question_styles: ['columnar', 'grid', 'missing_number']
            },
            3: {
                // Meeting: Full 3-digit × 1-digit range
                multiplicand_range: [11, 999],
                multiplier_range: [2, 9],
                digit_count: [2, 3],
                operations: [
                    'columnar_multiply',
                    'columnar_with_carrying',
                    'grid_method',
                    'missing_digit_multiply',
                    'estimate_product'         // Estimate before calculating
                ],
                require_carrying: 'always',
                show_working: true,
                question_styles: ['columnar', 'grid', 'missing_number', 'estimation']
            },
            4: {
                // Exceeding: Challenging numbers, mixed methods
                multiplicand_range: [100, 999],
                multiplier_range: [2, 9],
                digit_count: [3],              // 3-digit only
                operations: [
                    'columnar_multiply',
                    'columnar_with_carrying',
                    'grid_method',
                    'missing_digit_multiply',
                    'estimate_product',
                    'compare_methods'          // Compare grid vs columnar
                ],
                require_carrying: 'always',
                show_working: true,
                question_styles: ['columnar', 'grid', 'missing_number', 'estimation', 'comparison']
            }
        }
    },

    'C07_Y5_CALC': {
        id: 'C07_Y5_CALC',
        name: 'C07_Y5_CALC: Long Multiplication and Short Division',
        description: 'Multiply numbers up to 4 digits by a one- or two-digit number using a formal written method, including long multiplication for two-digit numbers; divide numbers up to 4 digits by a one-digit number using the formal written method of short division and interpret remainders appropriately for the context',
        icon: '✖️➗',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide using written methods',
        ref: 'C7',
        parameters: {
            1: {
                // Beginning: 2/3-digit × 1-digit, simple 2-digit ÷ 1-digit
                multiply_range: [11, 999],
                multiply_by: [2, 9],
                divide_range: [12, 99],
                divide_by: [2, 9],
                digit_count_multiply: [2, 3],
                operations: [
                    'columnar_multiply_1digit', // 234 × 7
                    'short_division',           // 48 ÷ 6 = 8
                    'division_with_remainder'   // 50 ÷ 6 = 8 r 2
                ],
                allow_remainders: true,
                remainder_type: 'whole_number',
                question_styles: ['columnar', 'short_division']
            },
            2: {
                // Developing: Introduce long multiplication (×2-digit), 3-digit ÷ 1-digit
                multiply_range: [11, 999],
                multiply_by_1digit: [2, 9],
                multiply_by_2digit: [11, 25],
                divide_range: [100, 999],
                divide_by: [2, 9],
                digit_count_multiply: [2, 3],
                operations: [
                    'columnar_multiply_1digit',
                    'long_multiply_2digit',     // 45 × 23 (formal long multiplication)
                    'short_division',
                    'division_with_remainder',
                    'interpret_remainder_context' // In context: round up/down/ignore
                ],
                allow_remainders: true,
                remainder_type: 'whole_number',
                question_styles: ['columnar', 'long_multiplication', 'short_division', 'context']
            },
            3: {
                // Meeting: 4-digit × 1/2-digit, full short division
                multiply_range: [11, 9999],
                multiply_by_1digit: [2, 9],
                multiply_by_2digit: [11, 50],
                divide_range: [100, 9999],
                divide_by: [2, 9],
                digit_count_multiply: [2, 3, 4],
                operations: [
                    'columnar_multiply_1digit',
                    'long_multiply_2digit',
                    'short_division',
                    'division_with_remainder',
                    'interpret_remainder_context',
                    'missing_digit_long_mult'   // Fill in missing digits
                ],
                allow_remainders: true,
                remainder_type: 'whole_number',
                question_styles: ['columnar', 'long_multiplication', 'short_division', 'context', 'missing_number']
            },
            4: {
                // Exceeding: Complex long multiplication, advanced remainder interpretation
                multiply_range: [100, 9999],
                multiply_by_1digit: [2, 9],
                multiply_by_2digit: [11, 99],
                divide_range: [100, 9999],
                divide_by: [2, 9],
                digit_count_multiply: [3, 4],
                operations: [
                    'columnar_multiply_1digit',
                    'long_multiply_2digit',
                    'short_division',
                    'division_with_remainder',
                    'interpret_remainder_context',
                    'missing_digit_long_mult',
                    'estimate_check'            // Estimate to check answer
                ],
                allow_remainders: true,
                remainder_type: 'whole_number',
                question_styles: ['columnar', 'long_multiplication', 'short_division', 'context', 'missing_number', 'estimation']
            }
        }
    },

    'C07_Y6_CALC': {
        id: 'C07_Y6_CALC',
        name: 'C07_Y6_CALC: Advanced Written Methods and Remainders',
        description: 'Multiply multi-digit numbers up to 4 digits by a two-digit whole number using the formal written method of long multiplication; divide numbers up to 4 digits by a two-digit whole number using the formal written method of long division, and interpret remainders as whole number remainders, fractions, or by rounding, as appropriate for the context',
        icon: '✖️➗',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'multiply / divide using written methods',
        ref: 'C7',
        parameters: {
            1: {
                // Beginning: 2/3-digit × 2-digit, simple long division
                multiply_range: [11, 999],
                multiply_by: [11, 50],
                divide_range: [100, 999],
                divide_by: [11, 25],
                digit_count_multiply: [2, 3],
                operations: [
                    'long_multiply_2digit',
                    'long_division',            // Formal long division layout
                    'remainder_as_whole',       // Express remainder as whole number
                    'remainder_as_fraction'     // Express remainder as fraction
                ],
                remainder_types: ['whole_number', 'fraction'],
                question_styles: ['long_multiplication', 'long_division', 'remainder_interpretation']
            },
            2: {
                // Developing: 4-digit × 2-digit, extend long division
                multiply_range: [11, 9999],
                multiply_by: [11, 75],
                divide_range: [100, 9999],
                divide_by: [11, 50],
                digit_count_multiply: [2, 3, 4],
                operations: [
                    'long_multiply_2digit',
                    'long_division',
                    'remainder_as_whole',
                    'remainder_as_fraction',
                    'remainder_by_rounding',    // Round answer up/down
                    'choose_remainder_form'     // Choose appropriate form for context
                ],
                remainder_types: ['whole_number', 'fraction', 'decimal'],
                question_styles: ['long_multiplication', 'long_division', 'remainder_interpretation', 'context']
            },
            3: {
                // Meeting: Full range, all remainder types
                multiply_range: [11, 9999],
                multiply_by: [11, 99],
                divide_range: [100, 9999],
                divide_by: [11, 99],
                digit_count_multiply: [2, 3, 4],
                operations: [
                    'long_multiply_2digit',
                    'long_division',
                    'remainder_as_whole',
                    'remainder_as_fraction',
                    'remainder_by_rounding',
                    'choose_remainder_form',
                    'missing_digit_long_div',   // Fill in missing digits in division
                    'short_vs_long_division'    // Choose appropriate method
                ],
                remainder_types: ['whole_number', 'fraction', 'decimal'],
                question_styles: ['long_multiplication', 'long_division', 'remainder_interpretation', 'context', 'missing_number']
            },
            4: {
                // Exceeding: Most complex calculations, sophisticated interpretation
                multiply_range: [100, 9999],
                multiply_by: [11, 99],
                divide_range: [100, 9999],
                divide_by: [11, 99],
                digit_count_multiply: [3, 4],
                operations: [
                    'long_multiply_2digit',
                    'long_division',
                    'remainder_as_whole',
                    'remainder_as_fraction',
                    'remainder_by_rounding',
                    'choose_remainder_form',
                    'missing_digit_long_div',
                    'short_vs_long_division',
                    'multi_step_with_division', // Complex multi-step problems
                    'estimate_division'         // Estimate quotient before dividing
                ],
                remainder_types: ['whole_number', 'fraction', 'decimal', 'percentage'],
                question_styles: ['long_multiplication', 'long_division', 'remainder_interpretation', 'context', 'missing_number', 'multi_step', 'estimation']
            }
        }
    }
};
