/**
 * C02 Module Series: Add/Subtract Using Written Methods
 * Progression from informal to formal written calculation methods
 * Covers Years 1-5 (Year 6 has no specific content)
 */

export const C02_MODULES = {
    'C02_Y1_CALC': {
        id: 'C02_Y1_CALC',
        name: 'C02_Y1_CALC: Add & Subtract to 20',
        description: 'Add and subtract one-digit and two-digit numbers to 20, including zero; read, write and interpret mathematical statements involving addition (+), subtraction (–) and equals (=) signs',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract using written methods',
        ref: 'C2',
        parameters: {
            1: {
                // Beginning: Simple addition/subtraction to 10, understanding symbols
                max_value: 10,
                operations: [
                    'simple_addition',       // e.g., 3 + 5 = ?
                    'simple_subtraction',    // e.g., 8 - 3 = ?
                    'missing_addend',        // e.g., 3 + ? = 7
                    'symbol_interpretation'  // e.g., Which symbol goes here: 5 __ 2 = 7?
                ],
                allow_zero: true,
                result_range: [0, 10],
                include_zero_facts: true,    // 0 + 5, 7 - 0, etc.
                question_styles: ['equation', 'word_problem'],
                missing_number_positions: ['end']  // Only ? at end initially
            },
            2: {
                // Developing: Extend to 15, introduce missing numbers in different positions
                max_value: 15,
                operations: [
                    'simple_addition',
                    'simple_subtraction',
                    'missing_addend',
                    'missing_subtrahend',    // e.g., 9 - ? = 4
                    'symbol_interpretation',
                    'equation_completion'    // e.g., Complete: 6 + 3 = 4 + ?
                ],
                allow_zero: true,
                result_range: [0, 15],
                include_zero_facts: true,
                question_styles: ['equation', 'word_problem', 'missing_number'],
                missing_number_positions: ['end', 'middle']
            },
            3: {
                // Meeting: Full range to 20, all symbol positions
                max_value: 20,
                operations: [
                    'simple_addition',
                    'simple_subtraction',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',       // e.g., ? - 3 = 7
                    'symbol_interpretation',
                    'equation_completion',
                    'true_false_equations'   // e.g., Is this true? 5 + 3 = 8
                ],
                allow_zero: true,
                result_range: [0, 20],
                include_zero_facts: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning'],
                missing_number_positions: ['start', 'middle', 'end']
            },
            4: {
                // Exceeding: Complex problems, multiple missing numbers
                max_value: 20,
                operations: [
                    'simple_addition',
                    'simple_subtraction',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',
                    'symbol_interpretation',
                    'equation_completion',
                    'true_false_equations',
                    'two_step_problems',     // e.g., 5 + ? - 2 = 10
                    'complex_missing'        // e.g., ? + ? = 10 (one of many answers)
                ],
                allow_zero: true,
                result_range: [0, 20],
                include_zero_facts: true,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step'],
                missing_number_positions: ['start', 'middle', 'end', 'multiple']
            }
        }
    },

    'C02_Y2_CALC': {
        id: 'C02_Y2_CALC',
        name: 'C02_Y2_CALC: 2-Digit Addition & Subtraction',
        description: 'Add and subtract numbers using concrete objects, pictorial representations, and mentally, including: a two-digit number and ones, a two-digit number and tens, two two-digit numbers, adding three one-digit numbers',
        icon: '➕',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract using written methods',
        ref: 'C2',
        parameters: {
            1: {
                // Beginning: 2-digit + ones, simple cases no bridging
                max_2digit: 50,
                operations: [
                    'twodigit_plus_ones',      // e.g., 23 + 5
                    'twodigit_minus_ones',     // e.g., 28 - 3
                    'twodigit_plus_tens',      // e.g., 23 + 20
                    'three_onedigit'           // e.g., 3 + 5 + 7
                ],
                ones_range: [1, 9],
                tens_range: [10, 50],
                avoid_bridging: true,          // No crossing tens boundary
                three_numbers_max: 20,         // Sum of three 1-digit ≤ 20
                question_styles: ['equation', 'word_problem']
            },
            2: {
                // Developing: Include bridging, introduce 2-digit + 2-digit
                max_2digit: 75,
                operations: [
                    'twodigit_plus_ones',
                    'twodigit_minus_ones',
                    'twodigit_plus_tens',
                    'twodigit_minus_tens',     // e.g., 48 - 20
                    'twodigit_plus_twodigit',  // e.g., 23 + 45 (no carry initially)
                    'three_onedigit'
                ],
                ones_range: [1, 9],
                tens_range: [10, 60],
                avoid_bridging: false,         // Allow crossing tens
                avoid_carry: true,             // But no carrying in 2-digit + 2-digit
                three_numbers_max: 25,
                question_styles: ['equation', 'word_problem', 'missing_number']
            },
            3: {
                // Meeting: Full curriculum range, all four types
                max_2digit: 99,
                operations: [
                    'twodigit_plus_ones',
                    'twodigit_minus_ones',
                    'twodigit_plus_tens',
                    'twodigit_minus_tens',
                    'twodigit_plus_twodigit',  // Now with carrying
                    'twodigit_minus_twodigit', // e.g., 54 - 23
                    'three_onedigit'
                ],
                ones_range: [1, 9],
                tens_range: [10, 90],
                avoid_bridging: false,
                avoid_carry: false,            // Allow carrying
                three_numbers_max: 27,
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning']
            },
            4: {
                // Exceeding: More complex combinations, missing numbers
                max_2digit: 99,
                operations: [
                    'twodigit_plus_ones',
                    'twodigit_minus_ones',
                    'twodigit_plus_tens',
                    'twodigit_minus_tens',
                    'twodigit_plus_twodigit',
                    'twodigit_minus_twodigit',
                    'three_onedigit',
                    'mixed_operations',        // Combine different types
                    'complex_missing'          // Missing numbers in 2-digit calcs
                ],
                ones_range: [1, 9],
                tens_range: [10, 90],
                avoid_bridging: false,
                avoid_carry: false,
                three_numbers_max: 30,
                ensure_complexity: true,       // Favor bridging/carrying
                question_styles: ['equation', 'word_problem', 'missing_number', 'reasoning', 'multi_step']
            }
        }
    },

    'C02_Y3_CALC': {
        id: 'C02_Y3_CALC',
        name: 'C02_Y3_CALC: 3-Digit Columnar Methods',
        description: 'Add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction',
        icon: '➕',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract using written methods',
        ref: 'C2',
        parameters: {
            1: {
                // Beginning: 3-digit numbers, simple cases without carrying/borrowing
                min_3digit: 100,
                max_3digit: 500,
                operations: [
                    'addition_no_carry',       // e.g., 234 + 142 (no carrying)
                    'subtraction_no_borrow'    // e.g., 487 - 253 (no borrowing)
                ],
                ensure_no_carry: true,
                ensure_no_borrow: true,
                result_max: 999,
                question_styles: ['equation', 'word_problem'],
                instruction_hint: 'Use written column method'
            },
            2: {
                // Developing: Introduce single carry or borrow
                min_3digit: 100,
                max_3digit: 700,
                operations: [
                    'addition_simple_carry',   // e.g., 234 + 178 (carry in ones)
                    'subtraction_simple_borrow', // e.g., 345 - 127 (borrow from tens)
                    'addition_no_carry',       // Mix with easier ones
                    'subtraction_no_borrow'
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_single_carry: true,      // Limit complexity
                result_max: 999,
                question_styles: ['equation', 'word_problem', 'reasoning'],
                instruction_hint: 'Use written column method'
            },
            3: {
                // Meeting: Full 3-digit range, multiple carries/borrows
                min_3digit: 100,
                max_3digit: 999,
                operations: [
                    'addition_with_carry',     // Any carrying
                    'subtraction_with_borrow', // Any borrowing
                    'mixed_difficulty'         // Random mix of easy/hard
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_multiple_carry: true,
                result_max: 999,
                question_styles: ['equation', 'word_problem', 'reasoning', 'problem_solving'],
                instruction_hint: 'Use written column method'
            },
            4: {
                // Exceeding: Complex cases, larger results, missing digits
                min_3digit: 100,
                max_3digit: 999,
                operations: [
                    'addition_with_carry',
                    'subtraction_with_borrow',
                    'mixed_difficulty',
                    'crossing_1000',           // Results > 1000 in addition
                    'missing_digit_problems'   // e.g., 4_8 + 267 = 715
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_multiple_carry: true,
                allow_exceeding_1000: true,    // Can go above 999
                result_max: 1999,
                question_styles: ['equation', 'word_problem', 'reasoning', 'problem_solving', 'missing_number'],
                instruction_hint: 'Use written column method'
            }
        }
    },

    'C02_Y4_CALC': {
        id: 'C02_Y4_CALC',
        name: 'C02_Y4_CALC: 4-Digit Columnar Methods',
        description: 'Add and subtract numbers with up to 4 digits using the formal written methods of columnar addition and subtraction where appropriate',
        icon: '➕',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract using written methods',
        ref: 'C2',
        parameters: {
            1: {
                // Beginning: 4-digit numbers, no carrying/borrowing
                min_4digit: 1000,
                max_4digit: 5000,
                operations: [
                    'addition_no_carry',
                    'subtraction_no_borrow'
                ],
                ensure_no_carry: true,
                ensure_no_borrow: true,
                result_max: 9999,
                question_styles: ['equation', 'word_problem'],
                instruction_hint: 'Use written column method'
            },
            2: {
                // Developing: Single carries/borrows
                min_4digit: 1000,
                max_4digit: 7000,
                operations: [
                    'addition_simple_carry',
                    'subtraction_simple_borrow',
                    'addition_no_carry',
                    'subtraction_no_borrow'
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_single_carry: true,
                result_max: 9999,
                question_styles: ['equation', 'word_problem', 'reasoning'],
                instruction_hint: 'Use written column method'
            },
            3: {
                // Meeting: Full 4-digit range, multiple carries/borrows
                min_4digit: 1000,
                max_4digit: 9999,
                operations: [
                    'addition_with_carry',
                    'subtraction_with_borrow',
                    'mixed_difficulty'
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_multiple_carry: true,
                result_max: 9999,
                question_styles: ['equation', 'word_problem', 'reasoning', 'problem_solving'],
                instruction_hint: 'Use written column method'
            },
            4: {
                // Exceeding: Complex cases, larger results, missing digits
                min_4digit: 1000,
                max_4digit: 9999,
                operations: [
                    'addition_with_carry',
                    'subtraction_with_borrow',
                    'mixed_difficulty',
                    'crossing_10000',
                    'missing_digit_problems',
                    'multi_step_problems'      // Two operations needed
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_multiple_carry: true,
                allow_exceeding_10000: true,
                result_max: 19999,
                question_styles: ['equation', 'word_problem', 'reasoning', 'problem_solving', 'missing_number'],
                instruction_hint: 'Use written column method'
            }
        }
    },

    'C02_Y5_CALC': {
        id: 'C02_Y5_CALC',
        name: 'C02_Y5_CALC: Large Number Columnar Methods',
        description: 'Add and subtract whole numbers with more than 4 digits, including using formal written methods (columnar addition and subtraction)',
        icon: '➕',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract using written methods',
        ref: 'C2',
        parameters: {
            1: {
                // Beginning: 5-digit numbers, no carrying/borrowing
                min_value: 10000,
                max_value: 50000,
                operations: [
                    'addition_no_carry',
                    'subtraction_no_borrow'
                ],
                ensure_no_carry: true,
                ensure_no_borrow: true,
                digit_count: 5,
                result_max: 99999,
                question_styles: ['equation', 'word_problem'],
                instruction_hint: 'Use written column method'
            },
            2: {
                // Developing: 5-6 digits, simple carries/borrows
                min_value: 10000,
                max_value: 500000,
                operations: [
                    'addition_simple_carry',
                    'subtraction_simple_borrow',
                    'addition_no_carry',
                    'subtraction_no_borrow'
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_single_carry: true,
                digit_count: [5, 6],
                result_max: 999999,
                question_styles: ['equation', 'word_problem', 'reasoning'],
                instruction_hint: 'Use written column method'
            },
            3: {
                // Meeting: Up to 1,000,000, multiple carries/borrows
                min_value: 10000,
                max_value: 999999,
                operations: [
                    'addition_with_carry',
                    'subtraction_with_borrow',
                    'mixed_difficulty'
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_multiple_carry: true,
                digit_count: [5, 6],
                result_max: 1999999,
                question_styles: ['equation', 'word_problem', 'reasoning', 'problem_solving'],
                instruction_hint: 'Use written column method'
            },
            4: {
                // Exceeding: 6-7 digits, complex cases
                min_value: 10000,
                max_value: 9999999,
                operations: [
                    'addition_with_carry',
                    'subtraction_with_borrow',
                    'mixed_difficulty',
                    'large_numbers',           // 7-digit numbers
                    'missing_digit_problems',
                    'multi_step_problems'
                ],
                ensure_no_carry: false,
                ensure_no_borrow: false,
                allow_multiple_carry: true,
                digit_count: [5, 6, 7],
                result_max: 19999999,
                question_styles: ['equation', 'word_problem', 'reasoning', 'problem_solving', 'missing_number'],
                instruction_hint: 'Use written column method'
            }
        }
    }
};
