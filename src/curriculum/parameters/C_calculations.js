/**
 * C (Calculations) Module Parameters
 *
 * UK National Curriculum - Addition, Subtraction, Multiplication and Division
 *
 * Module series:
 * - C01: Add/subtract mentally (Years 1, 2, 3, 5)
 * - C02: Add/subtract using written methods (Years 1, 2, 3, 4, 5)
 * - C03: Estimate, use inverses and check (Years 2, 3, 4, 5, 6)
 * - C04: Add/subtract to solve problems (Years 1, 2, 3, 4, 5, 6)
 * - C05: Properties of number - multiples, factors, primes, squares, cubes (Years 5, 6)
 * - C06: Multiply/divide mentally (Years 2, 3, 4, 5, 6)
 * - C07: Multiply/divide using written methods (Years 2, 3, 4, 5, 6)
 * - C08: Solve problems - commutative, associative, distributive (Years 1, 2, 3, 4, 5, 6)
 * - C09: Order of operations (Year 6)
 */

export const C_MODULES = {
    // ========================================================================
    // C01: ADD/SUBTRACT MENTALLY
    // ========================================================================

    'C01_Y1_CALC': {
        id: 'C01_Y1_CALC',
        name: 'Number Bonds to 20',
        description: 'Represent and use number bonds and related subtraction facts within 20',
        icon: '🧮',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Bonds to 10
                max_value: 10,
                operations: ['bonds_to_target', 'missing_addend', 'related_subtraction'],
                contexts: ['simple'],
                target_numbers: [5, 10]
            },
            2: {
                // Bonds to 10 and 20
                max_value: 20,
                operations: ['bonds_to_target', 'missing_addend', 'related_subtraction', 'fact_families'],
                contexts: ['simple', 'varied'],
                target_numbers: [10, 20]
            },
            3: {
                // All bonds within 20
                max_value: 20,
                operations: ['bonds_to_target', 'missing_addend', 'related_subtraction', 'fact_families', 'inverse_check'],
                contexts: ['simple', 'varied', 'mixed'],
                target_numbers: [10, 15, 20]
            },
            4: {
                // Fluent with all bonds to 20
                max_value: 20,
                operations: ['bonds_to_target', 'missing_addend', 'related_subtraction', 'fact_families', 'inverse_check', 'multi_step'],
                contexts: ['simple', 'varied', 'mixed'],
                target_numbers: [10, 12, 15, 18, 20]
            }
        }
    },

    'C01_Y2_CALC': {
        id: 'C01_Y2_CALC',
        name: 'Mental Addition & Subtraction to 100',
        description: 'Recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100',
        icon: '🧮',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Facts to 20, derive to 30
                max_value: 30,
                operations: ['recall_facts', 'derive_facts', 'add_subtract_ones', 'add_subtract_tens'],
                contexts: ['simple'],
                use_multiples_of_10: false
            },
            2: {
                // Derive facts to 50
                max_value: 50,
                operations: ['recall_facts', 'derive_facts', 'add_subtract_ones', 'add_subtract_tens', 'bridging_tens'],
                contexts: ['simple', 'varied'],
                use_multiples_of_10: true
            },
            3: {
                // Derive facts to 100
                max_value: 100,
                operations: ['recall_facts', 'derive_facts', 'add_subtract_ones', 'add_subtract_tens', 'bridging_tens', 'near_multiples'],
                contexts: ['simple', 'varied', 'mixed'],
                use_multiples_of_10: true
            },
            4: {
                // Fluent with derived facts to 100
                max_value: 100,
                operations: ['recall_facts', 'derive_facts', 'add_subtract_ones', 'add_subtract_tens', 'bridging_tens', 'near_multiples', 'compensation'],
                contexts: ['simple', 'varied', 'mixed'],
                use_multiples_of_10: true
            }
        }
    },

    'C01_Y3_CALC': {
        id: 'C01_Y3_CALC',
        name: 'Mental Calculations with 3-digit Numbers',
        description: 'Add and subtract numbers mentally, including: a three-digit number and ones, a three-digit number and tens, a three-digit number and hundreds',
        icon: '🧮',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 3-digit + ones
                max_value: 999,
                operations: ['add_ones', 'subtract_ones'],
                contexts: ['simple'],
                ones_range: [1, 9],
                base_range: [100, 500]
            },
            2: {
                // 3-digit + tens
                max_value: 999,
                operations: ['add_ones', 'subtract_ones', 'add_tens', 'subtract_tens'],
                contexts: ['simple', 'varied'],
                ones_range: [1, 9],
                tens_range: [10, 90],
                base_range: [100, 900]
            },
            3: {
                // 3-digit + hundreds
                max_value: 999,
                operations: ['add_ones', 'subtract_ones', 'add_tens', 'subtract_tens', 'add_hundreds', 'subtract_hundreds'],
                contexts: ['simple', 'varied', 'mixed'],
                ones_range: [1, 9],
                tens_range: [10, 90],
                hundreds_range: [100, 900],
                base_range: [100, 999]
            },
            4: {
                // All combinations
                max_value: 999,
                operations: ['add_ones', 'subtract_ones', 'add_tens', 'subtract_tens', 'add_hundreds', 'subtract_hundreds', 'mixed_place_values'],
                contexts: ['simple', 'varied', 'mixed'],
                ones_range: [1, 9],
                tens_range: [10, 90],
                hundreds_range: [100, 900],
                base_range: [100, 999],
                allow_bridging: true
            }
        }
    },

    'C01_Y5_CALC': {
        id: 'C01_Y5_CALC',
        name: 'Mental Calculations with Large Numbers',
        description: 'Add and subtract numbers mentally with increasingly large numbers',
        icon: '🧮',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 4-digit numbers, simple operations
                max_value: 9999,
                operations: ['add_subtract_powers_of_10', 'near_multiples', 'compensation'],
                contexts: ['simple'],
                power_range: [1, 100, 1000]
            },
            2: {
                // 5-digit numbers
                max_value: 99999,
                operations: ['add_subtract_powers_of_10', 'near_multiples', 'compensation', 'partitioning'],
                contexts: ['simple', 'varied'],
                power_range: [1, 10, 100, 1000, 10000]
            },
            3: {
                // 6-digit numbers
                max_value: 999999,
                operations: ['add_subtract_powers_of_10', 'near_multiples', 'compensation', 'partitioning', 'rounding_and_adjusting'],
                contexts: ['simple', 'varied', 'mixed'],
                power_range: [1, 10, 100, 1000, 10000, 100000]
            },
            4: {
                // 6-digit numbers (cap for mental calculation)
                max_value: 999999,
                operations: ['add_subtract_powers_of_10', 'near_multiples', 'compensation', 'partitioning', 'rounding_and_adjusting', 'complex_strategies'],
                contexts: ['simple', 'varied', 'mixed'],
                power_range: [1, 10, 100, 1000, 10000, 100000]
            }
        }
    },

    // ========================================================================
    // C02: ADD/SUBTRACT USING WRITTEN METHODS
    // ========================================================================

    'C02_Y1_CALC': {
        id: 'C02_Y1_CALC',
        name: 'Addition & Subtraction to 20',
        description: 'Add and subtract one-digit and two-digit numbers to 20, including zero; read, write and interpret mathematical statements involving addition (+), subtraction (–) and equals (=) signs',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Single digit + single digit (to 10)
                max_value: 10,
                operations: ['simple_addition', 'simple_subtraction', 'read_statements'],
                include_zero: true,
                contexts: ['number_only']
            },
            2: {
                // Single digit + single digit (to 20)
                max_value: 20,
                operations: ['simple_addition', 'simple_subtraction', 'read_statements', 'write_statements'],
                include_zero: true,
                contexts: ['number_only', 'simple_pictures']
            },
            3: {
                // Two-digit + one-digit (to 20)
                max_value: 20,
                operations: ['simple_addition', 'simple_subtraction', 'read_statements', 'write_statements', 'interpret_equals'],
                include_zero: true,
                contexts: ['number_only', 'simple_pictures']
            },
            4: {
                // All combinations to 20
                max_value: 20,
                operations: ['simple_addition', 'simple_subtraction', 'read_statements', 'write_statements', 'interpret_equals', 'missing_numbers'],
                include_zero: true,
                contexts: ['number_only', 'simple_pictures', 'varied']
            }
        }
    },

    'C02_Y2_CALC': {
        id: 'C02_Y2_CALC',
        name: 'Addition & Subtraction Methods',
        description: 'Add and subtract numbers using concrete objects, pictorial representations, and mentally, including: a two-digit number and ones, a two-digit number and tens, two two-digit numbers, adding three one-digit numbers',
        icon: '➕',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 2-digit + ones
                operations: ['two_digit_plus_ones', 'two_digit_minus_ones'],
                max_two_digit: 50,
                max_ones: 9,
                contexts: ['number_only', 'simple']
            },
            2: {
                // 2-digit + tens
                operations: ['two_digit_plus_ones', 'two_digit_minus_ones', 'two_digit_plus_tens', 'two_digit_minus_tens'],
                max_two_digit: 99,
                max_ones: 9,
                max_tens: 90,
                contexts: ['number_only', 'simple', 'varied']
            },
            3: {
                // Two 2-digit numbers
                operations: ['two_digit_plus_ones', 'two_digit_plus_tens', 'two_digit_plus_two_digit', 'three_one_digit'],
                max_two_digit: 99,
                max_ones: 9,
                contexts: ['number_only', 'simple', 'varied']
            },
            4: {
                // All combinations
                operations: ['two_digit_plus_ones', 'two_digit_plus_tens', 'two_digit_plus_two_digit', 'two_digit_minus_two_digit', 'three_one_digit'],
                max_two_digit: 99,
                max_ones: 9,
                contexts: ['number_only', 'simple', 'varied', 'mixed']
            }
        }
    },

    'C02_Y3_CALC': {
        id: 'C02_Y3_CALC',
        name: 'Columnar Addition & Subtraction (3 digits)',
        description: 'Add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction',
        icon: '➕',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 3-digit, no carrying/borrowing
                max_value: 999,
                operations: ['columnar_addition', 'columnar_subtraction'],
                require_carry: false,
                require_borrow: false,
                contexts: ['number_only']
            },
            2: {
                // 3-digit, with carrying
                max_value: 999,
                operations: ['columnar_addition', 'columnar_subtraction'],
                require_carry: true,
                require_borrow: false,
                contexts: ['number_only', 'simple']
            },
            3: {
                // 3-digit, with borrowing
                max_value: 999,
                operations: ['columnar_addition', 'columnar_subtraction'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only', 'simple', 'varied']
            },
            4: {
                // 3-digit, all cases
                max_value: 999,
                operations: ['columnar_addition', 'columnar_subtraction', 'mixed'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only', 'simple', 'varied', 'mixed']
            }
        }
    },

    'C02_Y4_CALC': {
        id: 'C02_Y4_CALC',
        name: 'Columnar Addition & Subtraction (4 digits)',
        description: 'Add and subtract numbers with up to 4 digits using the formal written methods of columnar addition and subtraction where appropriate',
        icon: '➕',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 4-digit, no carrying/borrowing
                max_value: 9999,
                operations: ['columnar_addition', 'columnar_subtraction'],
                require_carry: false,
                require_borrow: false,
                contexts: ['number_only']
            },
            2: {
                // 4-digit, with carrying
                max_value: 9999,
                operations: ['columnar_addition', 'columnar_subtraction'],
                require_carry: true,
                require_borrow: false,
                contexts: ['number_only', 'simple']
            },
            3: {
                // 4-digit, with borrowing
                max_value: 9999,
                operations: ['columnar_addition', 'columnar_subtraction'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only', 'simple', 'varied']
            },
            4: {
                // 4-digit, all cases
                max_value: 9999,
                operations: ['columnar_addition', 'columnar_subtraction', 'mixed', 'multi_addend'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only', 'simple', 'varied', 'mixed']
            }
        }
    },

    'C02_Y5_CALC': {
        id: 'C02_Y5_CALC',
        name: 'Columnar Addition & Subtraction (5+ digits)',
        description: 'Add and subtract whole numbers with more than 4 digits, including using formal written methods (columnar addition and subtraction)',
        icon: '➕',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 5-digit
                max_value: 99999,
                operations: ['columnar_addition', 'columnar_subtraction'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only']
            },
            2: {
                // 6-digit
                max_value: 999999,
                operations: ['columnar_addition', 'columnar_subtraction', 'mixed'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only', 'simple']
            },
            3: {
                // 7-digit
                max_value: 9999999,
                operations: ['columnar_addition', 'columnar_subtraction', 'mixed', 'multi_addend'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only', 'simple', 'varied']
            },
            4: {
                // 8-digit
                max_value: 99999999,
                operations: ['columnar_addition', 'columnar_subtraction', 'mixed', 'multi_addend', 'complex'],
                require_carry: true,
                require_borrow: true,
                contexts: ['number_only', 'simple', 'varied', 'mixed']
            }
        }
    },

    // ========================================================================
    // C03: ESTIMATE, USE INVERSES AND CHECK
    // ========================================================================

    'C03_Y2_CALC': {
        id: 'C03_Y2_CALC',
        name: 'Inverse Operations',
        description: 'Recognise and use the inverse relationship between addition and subtraction and use this to check calculations and missing number problems',
        icon: '🔄',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Simple inverse facts (to 20)
                max_value: 20,
                operations: ['show_inverse', 'check_calculation', 'missing_number_inverse'],
                contexts: ['simple']
            },
            2: {
                // Inverse facts (to 50)
                max_value: 50,
                operations: ['show_inverse', 'check_calculation', 'missing_number_inverse', 'fact_families'],
                contexts: ['simple', 'varied']
            },
            3: {
                // Inverse facts (to 100)
                max_value: 100,
                operations: ['show_inverse', 'check_calculation', 'missing_number_inverse', 'fact_families', 'error_detection'],
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // Complex inverse problems
                max_value: 100,
                operations: ['show_inverse', 'check_calculation', 'missing_number_inverse', 'fact_families', 'error_detection', 'multi_step'],
                contexts: ['simple', 'varied', 'mixed']
            }
        }
    },

    'C03_Y3_CALC': {
        id: 'C03_Y3_CALC',
        name: 'Estimate and Check with Inverses',
        description: 'Estimate the answer to a calculation and use inverse operations to check answers',
        icon: '🔄',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Estimate to nearest 10
                max_value: 100,
                operations: ['estimate_to_10', 'check_with_inverse'],
                rounding_base: 10,
                contexts: ['simple']
            },
            2: {
                // Estimate to nearest 10 or 100
                max_value: 999,
                operations: ['estimate_to_10', 'estimate_to_100', 'check_with_inverse', 'error_detection'],
                rounding_base: [10, 100],
                contexts: ['simple', 'varied']
            },
            3: {
                // Estimate and check 3-digit calculations
                max_value: 999,
                operations: ['estimate_to_10', 'estimate_to_100', 'check_with_inverse', 'error_detection', 'reasonable_answer'],
                rounding_base: [10, 100],
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // Complex estimation and checking
                max_value: 999,
                operations: ['estimate_to_10', 'estimate_to_100', 'check_with_inverse', 'error_detection', 'reasonable_answer', 'multi_step'],
                rounding_base: [10, 100],
                contexts: ['simple', 'varied', 'mixed']
            }
        }
    },

    'C03_Y4_CALC': {
        id: 'C03_Y4_CALC',
        name: 'Estimate and Use Inverses (4 digits)',
        description: 'Estimate and use inverse operations to check answers to a calculation',
        icon: '🔄',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Estimate 4-digit to nearest 10, 100
                max_value: 9999,
                operations: ['estimate_addition', 'estimate_subtraction', 'check_with_inverse'],
                rounding_base: [10, 100],
                contexts: ['number_only']
            },
            2: {
                // Estimate to nearest 1000
                max_value: 9999,
                operations: ['estimate_addition', 'estimate_subtraction', 'check_with_inverse', 'error_detection'],
                rounding_base: [10, 100, 1000],
                contexts: ['number_only', 'simple']
            },
            3: {
                // All estimation strategies
                max_value: 9999,
                operations: ['estimate_addition', 'estimate_subtraction', 'check_with_inverse', 'error_detection', 'reasonable_answer'],
                rounding_base: [10, 100, 1000],
                contexts: ['number_only', 'simple', 'varied']
            },
            4: {
                // Complex estimation and checking
                max_value: 9999,
                operations: ['estimate_addition', 'estimate_subtraction', 'estimate_multiplication', 'check_with_inverse', 'error_detection', 'reasonable_answer'],
                rounding_base: [10, 100, 1000],
                contexts: ['number_only', 'simple', 'varied', 'mixed']
            }
        }
    },

    'C03_Y5_CALC': {
        id: 'C03_Y5_CALC',
        name: 'Rounding to Check Calculations',
        description: 'Use rounding to check answers to calculations and determine, in the context of a problem, levels of accuracy',
        icon: '🔄',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Round to nearest 10, 100, 1000
                max_value: 99999,
                operations: ['round_and_estimate', 'check_reasonableness', 'accuracy_level'],
                rounding_base: [10, 100, 1000],
                contexts: ['simple']
            },
            2: {
                // Round to nearest 10000
                max_value: 999999,
                operations: ['round_and_estimate', 'check_reasonableness', 'accuracy_level', 'context_appropriate'],
                rounding_base: [10, 100, 1000, 10000],
                contexts: ['simple', 'varied']
            },
            3: {
                // All rounding strategies
                max_value: 9999999,
                operations: ['round_and_estimate', 'check_reasonableness', 'accuracy_level', 'context_appropriate', 'error_margin'],
                rounding_base: [10, 100, 1000, 10000, 100000],
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // Complex accuracy judgments
                max_value: 99999999,
                operations: ['round_and_estimate', 'check_reasonableness', 'accuracy_level', 'context_appropriate', 'error_margin', 'significant_figures'],
                rounding_base: [10, 100, 1000, 10000, 100000, 1000000],
                contexts: ['simple', 'varied', 'mixed']
            }
        }
    },

    'C03_Y6_CALC': {
        id: 'C03_Y6_CALC',
        name: 'Estimation and Accuracy',
        description: 'Use estimation to check answers to calculations and determine, in the context of a problem, an appropriate degree of accuracy',
        icon: '🔄',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Estimate all four operations
                max_value: 999999,
                operations: ['estimate_all_ops', 'appropriate_accuracy', 'context_judgment'],
                include_decimals: false,
                contexts: ['simple']
            },
            2: {
                // Include decimal estimation
                max_value: 999999,
                operations: ['estimate_all_ops', 'appropriate_accuracy', 'context_judgment', 'decimal_estimation'],
                include_decimals: true,
                decimal_places: [1, 2],
                contexts: ['simple', 'varied']
            },
            3: {
                // Complex accuracy judgments
                max_value: 9999999,
                operations: ['estimate_all_ops', 'appropriate_accuracy', 'context_judgment', 'decimal_estimation', 'error_analysis'],
                include_decimals: true,
                decimal_places: [1, 2, 3],
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // Real-world accuracy problems
                max_value: 99999999,
                operations: ['estimate_all_ops', 'appropriate_accuracy', 'context_judgment', 'decimal_estimation', 'error_analysis', 'real_world'],
                include_decimals: true,
                decimal_places: [1, 2, 3],
                contexts: ['simple', 'varied', 'mixed', 'real_world']
            }
        }
    },

    // ========================================================================
    // C04: ADD/SUBTRACT TO SOLVE PROBLEMS
    // ========================================================================

    'C04_Y1_CALC': {
        id: 'C04_Y1_CALC',
        name: 'Addition & Subtraction Problems',
        description: 'Solve one-step problems that involve addition and subtraction, using concrete objects and pictorial representations, and missing number problems such as 7 = _ – 9',
        icon: '📝',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Simple addition problems (to 10)
                max_value: 10,
                operations: ['simple_addition_problems', 'simple_subtraction_problems'],
                contexts: ['objects', 'pictures'],
                missing_numbers: false
            },
            2: {
                // Addition and subtraction (to 20)
                max_value: 20,
                operations: ['simple_addition_problems', 'simple_subtraction_problems', 'simple_missing'],
                contexts: ['objects', 'pictures', 'stories'],
                missing_numbers: true
            },
            3: {
                // All one-step problems (to 20)
                max_value: 20,
                operations: ['simple_addition_problems', 'simple_subtraction_problems', 'simple_missing', 'equations_reversed'],
                contexts: ['objects', 'pictures', 'stories'],
                missing_numbers: true
            },
            4: {
                // Complex missing number problems
                max_value: 20,
                operations: ['simple_addition_problems', 'simple_subtraction_problems', 'simple_missing', 'equations_reversed', 'multi_missing'],
                contexts: ['objects', 'pictures', 'stories', 'varied'],
                missing_numbers: true
            }
        }
    },

    'C04_Y2_CALC': {
        id: 'C04_Y2_CALC',
        name: 'Addition & Subtraction Word Problems',
        description: 'Solve problems with addition and subtraction: using concrete objects and pictorial representations, including those involving numbers, quantities and measures; applying their increasing knowledge of mental and written methods',
        icon: '📝',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // One-step problems (to 20)
                max_value: 20,
                operations: ['addition_problems', 'subtraction_problems', 'comparison_problems'],
                contexts: ['objects', 'quantities'],
                steps: 1
            },
            2: {
                // One-step problems (to 50)
                max_value: 50,
                operations: ['addition_problems', 'subtraction_problems', 'comparison_problems', 'missing_number_problems'],
                contexts: ['objects', 'quantities', 'measures'],
                steps: 1
            },
            3: {
                // One-step problems (to 100)
                max_value: 100,
                operations: ['addition_problems', 'subtraction_problems', 'comparison_problems', 'missing_number_problems', 'change_problems'],
                contexts: ['objects', 'quantities', 'measures'],
                steps: 1
            },
            4: {
                // Complex one-step problems
                max_value: 100,
                operations: ['addition_problems', 'subtraction_problems', 'comparison_problems', 'missing_number_problems', 'change_problems', 'part_whole'],
                contexts: ['objects', 'quantities', 'measures', 'mixed'],
                steps: 1
            }
        }
    },

    'C04_Y3_CALC': {
        id: 'C04_Y3_CALC',
        name: 'Addition & Subtraction Problem Solving',
        description: 'Solve problems, including missing number problems, using number facts, place value, and more complex addition and subtraction',
        icon: '📝',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // One-step problems (3-digit)
                max_value: 999,
                operations: ['addition_problems', 'subtraction_problems', 'missing_number_problems'],
                contexts: ['simple'],
                steps: 1
            },
            2: {
                // One and two-step problems
                max_value: 999,
                operations: ['addition_problems', 'subtraction_problems', 'missing_number_problems', 'two_step_problems'],
                contexts: ['simple', 'varied'],
                steps: [1, 2]
            },
            3: {
                // Complex problems with place value
                max_value: 999,
                operations: ['addition_problems', 'subtraction_problems', 'missing_number_problems', 'two_step_problems', 'place_value_problems'],
                contexts: ['simple', 'varied', 'mixed'],
                steps: [1, 2]
            },
            4: {
                // All problem types
                max_value: 999,
                operations: ['addition_problems', 'subtraction_problems', 'missing_number_problems', 'two_step_problems', 'place_value_problems', 'complex_missing'],
                contexts: ['simple', 'varied', 'mixed'],
                steps: [1, 2]
            }
        }
    },

    'C04_Y4_CALC': {
        id: 'C04_Y4_CALC',
        name: 'Two-Step Addition & Subtraction Problems',
        description: 'Solve addition and subtraction two-step problems in contexts, deciding which operations and methods to use and why',
        icon: '📝',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Simple two-step problems
                max_value: 9999,
                operations: ['two_step_addition', 'two_step_subtraction', 'two_step_mixed'],
                contexts: ['simple'],
                reasoning_required: false
            },
            2: {
                // Two-step with reasoning
                max_value: 9999,
                operations: ['two_step_addition', 'two_step_subtraction', 'two_step_mixed', 'choose_operation'],
                contexts: ['simple', 'varied'],
                reasoning_required: true
            },
            3: {
                // Complex two-step problems
                max_value: 9999,
                operations: ['two_step_addition', 'two_step_subtraction', 'two_step_mixed', 'choose_operation', 'choose_method'],
                contexts: ['simple', 'varied', 'mixed'],
                reasoning_required: true
            },
            4: {
                // Multi-step problems
                max_value: 9999,
                operations: ['two_step_addition', 'two_step_subtraction', 'two_step_mixed', 'choose_operation', 'choose_method', 'three_step'],
                contexts: ['simple', 'varied', 'mixed'],
                reasoning_required: true
            }
        }
    },

    'C04_Y5_CALC': {
        id: 'C04_Y5_CALC',
        name: 'Multi-Step Addition & Subtraction Problems',
        description: 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why',
        icon: '📝',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Two-step problems (5-digit)
                max_value: 99999,
                operations: ['two_step_problems', 'choose_strategy', 'real_world_contexts'],
                contexts: ['simple'],
                steps: 2
            },
            2: {
                // Three-step problems
                max_value: 999999,
                operations: ['two_step_problems', 'three_step_problems', 'choose_strategy', 'real_world_contexts'],
                contexts: ['simple', 'varied'],
                steps: [2, 3]
            },
            3: {
                // Multi-step with reasoning
                max_value: 9999999,
                operations: ['two_step_problems', 'three_step_problems', 'choose_strategy', 'real_world_contexts', 'justify_method'],
                contexts: ['simple', 'varied', 'mixed'],
                steps: [2, 3]
            },
            4: {
                // Complex multi-step problems
                max_value: 99999999,
                operations: ['two_step_problems', 'three_step_problems', 'four_step_problems', 'choose_strategy', 'real_world_contexts', 'justify_method'],
                contexts: ['simple', 'varied', 'mixed', 'real_world'],
                steps: [2, 3, 4]
            }
        }
    },

    'C04_Y6_CALC': {
        id: 'C04_Y6_CALC',
        name: 'Complex Multi-Step Problems',
        description: 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why',
        icon: '📝',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Multi-step problems (large numbers)
                max_value: 9999999,
                operations: ['multi_step_problems', 'strategy_selection', 'real_world'],
                contexts: ['real_world'],
                steps: [2, 3],
                include_decimals: false
            },
            2: {
                // Include decimals
                max_value: 9999999,
                operations: ['multi_step_problems', 'strategy_selection', 'real_world', 'decimal_problems'],
                contexts: ['real_world', 'varied'],
                steps: [2, 3],
                include_decimals: true,
                decimal_places: [1, 2]
            },
            3: {
                // Complex reasoning
                max_value: 99999999,
                operations: ['multi_step_problems', 'strategy_selection', 'real_world', 'decimal_problems', 'justify_reasoning'],
                contexts: ['real_world', 'varied', 'mixed'],
                steps: [2, 3, 4],
                include_decimals: true,
                decimal_places: [1, 2, 3]
            },
            4: {
                // Advanced multi-step problems
                max_value: 99999999,
                operations: ['multi_step_problems', 'strategy_selection', 'real_world', 'decimal_problems', 'justify_reasoning', 'open_ended'],
                contexts: ['real_world', 'varied', 'mixed'],
                steps: [2, 3, 4],
                include_decimals: true,
                decimal_places: [1, 2, 3]
            }
        }
    },

    // ========================================================================
    // C05: PROPERTIES OF NUMBER (MULTIPLES, FACTORS, PRIMES, SQUARES, CUBES)
    // ========================================================================

    'C05_Y5_CALC': {
        id: 'C05_Y5_CALC',
        name: 'Number Properties',
        description: 'Identify multiples and factors, including finding all factor pairs of a number and common factors of two numbers; know and use the vocabulary of prime numbers, prime factors and composite (non-prime) numbers; establish whether a number up to 100 is prime and recall prime numbers up to 19; recognise and use square numbers and cube numbers, and the notation for squared (²) and cubed (³)',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Identify multiples and factors (to 50)
                max_value: 50,
                operations: ['identify_multiples', 'identify_factors', 'factor_pairs'],
                include_primes: false,
                include_squares: false,
                include_cubes: false
            },
            2: {
                // Include primes (to 100)
                max_value: 100,
                operations: ['identify_multiples', 'identify_factors', 'factor_pairs', 'identify_primes', 'prime_or_composite'],
                include_primes: true,
                known_primes: [2, 3, 5, 7, 11, 13, 17, 19],
                include_squares: false,
                include_cubes: false
            },
            3: {
                // Include squares and cubes
                max_value: 100,
                operations: ['identify_multiples', 'identify_factors', 'factor_pairs', 'identify_primes', 'prime_or_composite', 'square_numbers', 'cube_numbers'],
                include_primes: true,
                known_primes: [2, 3, 5, 7, 11, 13, 17, 19],
                include_squares: true,
                squares_up_to: 12,
                include_cubes: true,
                cubes_up_to: 5
            },
            4: {
                // All number properties, common factors
                max_value: 100,
                operations: ['identify_multiples', 'identify_factors', 'factor_pairs', 'common_factors', 'identify_primes', 'prime_factors', 'prime_or_composite', 'square_numbers', 'cube_numbers', 'notation'],
                include_primes: true,
                known_primes: [2, 3, 5, 7, 11, 13, 17, 19],
                include_squares: true,
                squares_up_to: 15,
                include_cubes: true,
                cubes_up_to: 10
            }
        }
    },

    'C05_Y6_CALC': {
        id: 'C05_Y6_CALC',
        name: 'Factors, Multiples and Primes',
        description: 'Identify common factors, common multiples and prime numbers',
        icon: '🔢',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Common factors (to 100)
                max_value: 100,
                operations: ['common_factors', 'highest_common_factor', 'identify_primes'],
                include_multiples: false
            },
            2: {
                // Common multiples
                max_value: 100,
                operations: ['common_factors', 'highest_common_factor', 'common_multiples', 'lowest_common_multiple', 'identify_primes'],
                include_multiples: true,
                multiples_max: 200
            },
            3: {
                // Primes beyond 100
                max_value: 200,
                operations: ['common_factors', 'highest_common_factor', 'common_multiples', 'lowest_common_multiple', 'identify_primes', 'prime_factorization'],
                include_multiples: true,
                multiples_max: 300
            },
            4: {
                // Complex problems
                max_value: 200,
                operations: ['common_factors', 'highest_common_factor', 'common_multiples', 'lowest_common_multiple', 'identify_primes', 'prime_factorization', 'problem_solving'],
                include_multiples: true,
                multiples_max: 500
            }
        }
    },

    // ========================================================================
    // C06: MULTIPLY/DIVIDE MENTALLY
    // ========================================================================

    'C06_Y2_CALC': {
        id: 'C06_Y2_CALC',
        name: 'Times Tables: 2, 5, 10',
        description: 'Recall and use multiplication and division facts for the 2, 5 and 10 multiplication tables, including recognising odd and even numbers',
        icon: '✖️',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 2 times table
                tables: [2],
                max_multiplier: 5,
                operations: ['multiplication', 'division'],
                include_odd_even: true
            },
            2: {
                // 2 and 5 times tables
                tables: [2, 5],
                max_multiplier: 10,
                operations: ['multiplication', 'division', 'odd_even_recognition'],
                include_odd_even: true
            },
            3: {
                // 2, 5 and 10 times tables
                tables: [2, 5, 10],
                max_multiplier: 10,
                operations: ['multiplication', 'division', 'odd_even_recognition', 'missing_number'],
                include_odd_even: true
            },
            4: {
                // All tables with mixed operations
                tables: [2, 5, 10],
                max_multiplier: 12,
                operations: ['multiplication', 'division', 'odd_even_recognition', 'missing_number', 'word_problems'],
                include_odd_even: true
            }
        }
    },

    'C06_Y3_CALC': {
        id: 'C06_Y3_CALC',
        name: 'Times Tables: 3, 4, 8',
        description: 'Recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // 3 times table
                tables: [3],
                max_multiplier: 10,
                operations: ['multiplication', 'division']
            },
            2: {
                // 3 and 4 times tables
                tables: [3, 4],
                max_multiplier: 10,
                operations: ['multiplication', 'division', 'missing_number']
            },
            3: {
                // 3, 4 and 8 times tables
                tables: [3, 4, 8],
                max_multiplier: 10,
                operations: ['multiplication', 'division', 'missing_number', 'word_problems']
            },
            4: {
                // All Year 2 and 3 tables
                tables: [2, 3, 4, 5, 8, 10],
                max_multiplier: 12,
                operations: ['multiplication', 'division', 'missing_number', 'word_problems', 'mixed']
            }
        }
    },

    'C06_Y4_CALC': {
        id: 'C06_Y4_CALC',
        name: 'Times Tables to 12×12',
        description: 'Recall multiplication and division facts for multiplication tables up to 12 x 12; use place value, known and derived facts to multiply and divide mentally, including: multiplying by 0 and 1, dividing by 1, multiplying together three numbers; recognise and use factor pairs and commutativity in mental calculations',
        icon: '✖️',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Tables to 12 (focus on 6, 7, 9)
                tables: [6, 7, 9],
                max_multiplier: 10,
                operations: ['multiplication', 'division'],
                include_special_cases: false
            },
            2: {
                // All tables to 12, include × 0 and × 1
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_multiplier: 12,
                operations: ['multiplication', 'division', 'multiply_by_0_and_1', 'divide_by_1'],
                include_special_cases: true
            },
            3: {
                // Factor pairs and commutativity
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_multiplier: 12,
                operations: ['multiplication', 'division', 'multiply_by_0_and_1', 'divide_by_1', 'factor_pairs', 'commutativity'],
                include_special_cases: true
            },
            4: {
                // Multiply three numbers
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_multiplier: 12,
                operations: ['multiplication', 'division', 'multiply_by_0_and_1', 'divide_by_1', 'factor_pairs', 'commutativity', 'three_numbers'],
                include_special_cases: true
            }
        }
    },

    'C06_Y5_CALC': {
        id: 'C06_Y5_CALC',
        name: 'Mental Multiplication & Division',
        description: 'Multiply and divide numbers mentally drawing upon known facts; multiply and divide whole numbers and those involving decimals by 10, 100 and 1,000',
        icon: '✖️',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Mental multiplication using known facts
                max_value: 1000,
                operations: ['mental_multiply', 'mental_divide', 'use_known_facts'],
                multiply_by_powers_of_10: [10],
                include_decimals: false
            },
            2: {
                // × and ÷ by 10, 100
                max_value: 10000,
                operations: ['mental_multiply', 'mental_divide', 'use_known_facts', 'multiply_by_10_100'],
                multiply_by_powers_of_10: [10, 100],
                include_decimals: true,
                decimal_places: [1]
            },
            3: {
                // × and ÷ by 10, 100, 1000
                max_value: 100000,
                operations: ['mental_multiply', 'mental_divide', 'use_known_facts', 'multiply_by_10_100_1000'],
                multiply_by_powers_of_10: [10, 100, 1000],
                include_decimals: true,
                decimal_places: [1, 2]
            },
            4: {
                // Complex mental calculations
                max_value: 1000000,
                operations: ['mental_multiply', 'mental_divide', 'use_known_facts', 'multiply_by_10_100_1000', 'derived_facts', 'partitioning'],
                multiply_by_powers_of_10: [10, 100, 1000],
                include_decimals: true,
                decimal_places: [1, 2, 3]
            }
        }
    },

    'C06_Y6_CALC': {
        id: 'C06_Y6_CALC',
        name: 'Mental Calculations with Large Numbers',
        description: 'Perform mental calculations, including with mixed operations and large numbers',
        icon: '✖️',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Mental calculations with 4-digit numbers
                max_value: 9999,
                operations: ['mental_all_ops', 'use_derived_facts', 'partitioning'],
                include_mixed_ops: false
            },
            2: {
                // Mental calculations with 5-digit numbers
                max_value: 99999,
                operations: ['mental_all_ops', 'use_derived_facts', 'partitioning', 'compensation'],
                include_mixed_ops: true
            },
            3: {
                // Mental calculations with 6-digit numbers
                max_value: 999999,
                operations: ['mental_all_ops', 'use_derived_facts', 'partitioning', 'compensation', 'rounding_adjusting'],
                include_mixed_ops: true
            },
            4: {
                // Complex mental calculations (6-digit cap)
                max_value: 999999,
                operations: ['mental_all_ops', 'use_derived_facts', 'partitioning', 'compensation', 'rounding_adjusting', 'complex_strategies'],
                include_mixed_ops: true
            }
        }
    },

    // ========================================================================
    // C07: MULTIPLY/DIVIDE USING WRITTEN METHODS
    // ========================================================================

    'C07_Y2_CALC': {
        id: 'C07_Y2_CALC',
        name: 'Multiplication & Division Statements',
        description: 'Calculate mathematical statements for multiplication and division within the multiplication tables and write them using the multiplication (×), division (÷) and equals (=) signs',
        icon: '✖️',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'Written Methods',
        ref: 'C07',
        parameters: {
            1: {
                // Simple statements (to 50)
                max_value: 50,
                operations: ['write_multiplication', 'write_division', 'identify_symbols']
            },
            2: {
                // Statements (to 75)
                max_value: 75,
                operations: ['write_multiplication', 'write_division', 'identify_symbols']
            },
            3: {
                // Statements (to 100)
                max_value: 100,
                operations: ['write_multiplication', 'write_division', 'identify_symbols']
            },
            4: {
                // All statements (to 120)
                max_value: 120,
                operations: ['write_multiplication', 'write_division', 'identify_symbols']
            }
        }
    },

    'C07_Y3_CALC': {
        id: 'C07_Y3_CALC',
        name: 'Written Multiplication Methods',
        description: 'Write and calculate mathematical statements for multiplication and division using the multiplication tables that pupils know, including for two-digit numbers times one-digit numbers, using mental and progressing to formal written methods',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'Written Methods',
        ref: 'C07',
        parameters: {
            1: {
                // 2-digit × 1-digit (10-30 × 2-5)
                max_value: 30,
                multiplier: 5,
                operations: ['box_method_2x1', 'partial_products', 'identify_decomposition', 'calculate_product', 'find_total']
            },
            2: {
                // 2-digit × 1-digit (10-50 × 2-7)
                max_value: 50,
                multiplier: 7,
                operations: ['box_method_2x1', 'partial_products', 'identify_decomposition', 'calculate_product', 'find_total']
            },
            3: {
                // 2-digit × 1-digit (10-80 × 2-9)
                max_value: 80,
                multiplier: 9,
                operations: ['box_method_2x1', 'partial_products', 'identify_decomposition', 'calculate_product', 'find_total']
            },
            4: {
                // 2-digit × 1-digit (10-99 × 2-9)
                max_value: 99,
                multiplier: 9,
                operations: ['box_method_2x1', 'partial_products', 'identify_decomposition', 'calculate_product', 'find_total']
            }
        }
    },

    'C07_Y4_CALC': {
        id: 'C07_Y4_CALC',
        name: 'Formal Written Multiplication',
        description: 'Multiply two-digit and three-digit numbers by a one-digit number using formal written layout',
        icon: '✖️',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'Written Methods',
        ref: 'C07',
        parameters: {
            1: {
                // 3-digit × 1-digit (100-200 × 2-5)
                max_value: 200,
                multiplier: 5,
                operations: ['box_method_3x1', 'partial_products', 'setup_method', 'word_problem', 'find_total']
            },
            2: {
                // 3-digit × 1-digit (100-500 × 2-7)
                max_value: 500,
                multiplier: 7,
                operations: ['box_method_3x1', 'partial_products', 'setup_method', 'word_problem', 'find_total']
            },
            3: {
                // 3-digit × 1-digit (100-800 × 2-9)
                max_value: 800,
                multiplier: 9,
                operations: ['box_method_3x1', 'partial_products', 'setup_method', 'word_problem', 'find_total']
            },
            4: {
                // 3-digit × 1-digit (100-999 × 2-9)
                max_value: 999,
                multiplier: 9,
                operations: ['box_method_3x1', 'partial_products', 'setup_method', 'word_problem', 'find_total']
            }
        }
    },

    'C07_Y5_CALC': {
        id: 'C07_Y5_CALC',
        name: 'Long Multiplication & Short Division',
        description: 'Multiply numbers up to 4 digits by a one- or two-digit number using a formal written method, including long multiplication for two-digit numbers; divide numbers up to 4 digits by a one-digit number using the formal written method of short division and interpret remainders appropriately for the context',
        icon: '✖️',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'Written Methods',
        ref: 'C07',
        parameters: {
            1: {
                // 4-digit × 1-digit
                max_multiplicand: 9999,
                multipliers_1_digit: [2, 3, 4, 5, 6, 7, 8, 9],
                multipliers_2_digit: [],
                operations: ['multiply_4_by_1', 'short_division'],
                include_division: true,
                max_dividend: 2999
            },
            2: {
                // 4-digit × 2-digit (long multiplication)
                max_multiplicand: 9999,
                multipliers_1_digit: [2, 3, 4, 5, 6, 7, 8, 9],
                multipliers_2_digit: [11, 12, 15, 20, 25],
                operations: ['multiply_4_by_1', 'multiply_4_by_2', 'long_multiplication', 'short_division'],
                include_division: true,
                max_dividend: 9999
            },
            3: {
                // All multiplication, division with remainders
                max_multiplicand: 9999,
                multipliers_1_digit: [2, 3, 4, 5, 6, 7, 8, 9],
                multipliers_2_digit: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25],
                operations: ['multiply_4_by_1', 'multiply_4_by_2', 'long_multiplication', 'short_division', 'interpret_remainders'],
                include_division: true,
                max_dividend: 9999
            },
            4: {
                // Complex problems with context
                max_multiplicand: 9999,
                multipliers_1_digit: [2, 3, 4, 5, 6, 7, 8, 9],
                multipliers_2_digit: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 35, 40, 45, 50],
                operations: ['multiply_4_by_1', 'multiply_4_by_2', 'long_multiplication', 'short_division', 'interpret_remainders', 'context_problems'],
                include_division: true,
                max_dividend: 9999
            }
        }
    },

    'C07_Y6_CALC': {
        id: 'C07_Y6_CALC',
        name: 'Long Multiplication & Long Division',
        description: 'Multiply multi-digit numbers up to 4 digits by a two-digit whole number using the formal written method of long multiplication; divide numbers up to 4 digits by a two-digit whole number using the formal written method of long division, and interpret remainders as whole number remainders, fractions, or by rounding, as appropriate for the context; divide numbers up to 4 digits by a two-digit number using the formal written method of short division where appropriate, interpreting remainders according to the context',
        icon: '✖️',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'Written Methods',
        ref: 'C07',
        parameters: {
            1: {
                // 4-digit × 2-digit (long multiplication)
                max_multiplicand: 9999,
                multipliers: [11, 12, 13, 14, 15, 20, 25],
                divisors: [11, 12],
                operations: ['long_multiplication', 'long_division_simple'],
                remainder_interpretation: ['whole_number']
            },
            2: {
                // Long division with all remainder types
                max_multiplicand: 9999,
                multipliers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30],
                divisors: [11, 12, 13, 14, 15],
                operations: ['long_multiplication', 'long_division', 'short_division_2_digit'],
                remainder_interpretation: ['whole_number', 'fraction']
            },
            3: {
                // All division methods
                max_multiplicand: 9999,
                multipliers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 35, 40],
                divisors: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25],
                operations: ['long_multiplication', 'long_division', 'short_division_2_digit', 'choose_method'],
                remainder_interpretation: ['whole_number', 'fraction', 'rounding']
            },
            4: {
                // Complex problems with context
                max_multiplicand: 9999,
                multipliers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 99],
                divisors: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 35, 40, 45, 50],
                operations: ['long_multiplication', 'long_division', 'short_division_2_digit', 'choose_method', 'context_problems'],
                remainder_interpretation: ['whole_number', 'fraction', 'rounding', 'context_appropriate']
            }
        }
    },

    // ========================================================================
    // C08: SOLVE PROBLEMS (COMMUTATIVE, ASSOCIATIVE, DISTRIBUTIVE)
    // ========================================================================

    'C08_Y1_CALC': {
        id: 'C08_Y1_CALC',
        name: 'Multiplication & Division Problems',
        description: 'Solve one-step problems involving multiplication and division, by calculating the answer using concrete objects, pictorial representations and arrays with the support of the teacher',
        icon: '📝',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Simple grouping (2s)
                max_value: 10,
                operations: ['grouping_problems', 'sharing_problems'],
                tables: [2],
                use_arrays: true,
                contexts: ['objects']
            },
            2: {
                // Grouping and sharing (2s and 5s)
                max_value: 20,
                operations: ['grouping_problems', 'sharing_problems', 'array_problems'],
                tables: [2, 5],
                use_arrays: true,
                contexts: ['objects', 'pictures']
            },
            3: {
                // Include 10s
                max_value: 30,
                operations: ['grouping_problems', 'sharing_problems', 'array_problems', 'repeated_addition'],
                tables: [2, 5, 10],
                use_arrays: true,
                contexts: ['objects', 'pictures']
            },
            4: {
                // All problem types
                max_value: 30,
                operations: ['grouping_problems', 'sharing_problems', 'array_problems', 'repeated_addition', 'simple_word_problems'],
                tables: [2, 5, 10],
                use_arrays: true,
                contexts: ['objects', 'pictures', 'stories']
            }
        }
    },

    'C08_Y2_CALC': {
        id: 'C08_Y2_CALC',
        name: 'Multiplication & Division with Properties',
        description: 'Solve problems involving multiplication and division, using materials, arrays, repeated addition, mental methods, and multiplication and division facts, including problems in contexts; show that addition of two numbers can be done in any order (commutative) and subtraction of one number from another cannot; show that multiplication of two numbers can be done in any order (commutative) and division of one number by another cannot',
        icon: '📝',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Multiplication problems (2, 5, 10)
                tables: [2, 5, 10],
                max_multiplier: 10,
                operations: ['multiply_problems', 'divide_problems'],
                show_commutative: false,
                contexts: ['simple']
            },
            2: {
                // Show commutativity for addition and multiplication
                tables: [2, 5, 10],
                max_multiplier: 10,
                operations: ['multiply_problems', 'divide_problems', 'show_commutative_addition', 'show_commutative_multiplication'],
                show_commutative: true,
                contexts: ['simple', 'varied']
            },
            3: {
                // Show non-commutativity for subtraction and division
                tables: [2, 5, 10],
                max_multiplier: 10,
                operations: ['multiply_problems', 'divide_problems', 'show_commutative_addition', 'show_commutative_multiplication', 'show_non_commutative'],
                show_commutative: true,
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // All problem types with properties
                tables: [2, 5, 10],
                max_multiplier: 12,
                operations: ['multiply_problems', 'divide_problems', 'show_commutative_addition', 'show_commutative_multiplication', 'show_non_commutative', 'apply_properties'],
                show_commutative: true,
                contexts: ['simple', 'varied', 'mixed']
            }
        }
    },

    'C08_Y3_CALC': {
        id: 'C08_Y3_CALC',
        name: 'Scaling & Correspondence Problems',
        description: 'Solve problems, including missing number problems, involving multiplication and division, including integer scaling problems and correspondence problems in which n objects are connected to m objects',
        icon: '📝',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Simple scaling (× 2, × 3)
                tables: [2, 3, 4, 5, 8, 10],
                scaling_factors: [2, 3],
                operations: ['scaling_problems', 'correspondence_problems'],
                contexts: ['simple']
            },
            2: {
                // More scaling factors
                tables: [2, 3, 4, 5, 8, 10],
                scaling_factors: [2, 3, 4, 5],
                operations: ['scaling_problems', 'correspondence_problems', 'missing_number_multiply'],
                contexts: ['simple', 'varied']
            },
            3: {
                // All scaling and correspondence
                tables: [2, 3, 4, 5, 8, 10],
                scaling_factors: [2, 3, 4, 5, 8, 10],
                operations: ['scaling_problems', 'correspondence_problems', 'missing_number_multiply', 'n_to_m_problems'],
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // Complex problems
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                scaling_factors: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                operations: ['scaling_problems', 'correspondence_problems', 'missing_number_multiply', 'n_to_m_problems', 'two_step'],
                contexts: ['simple', 'varied', 'mixed']
            }
        }
    },

    'C08_Y4_CALC': {
        id: 'C08_Y4_CALC',
        name: 'Distributive Law & Scaling',
        description: 'Solve problems involving multiplying and adding, including using the distributive law to multiply two-digit numbers by one digit, integer scaling problems and harder correspondence problems such as n objects are connected to m objects',
        icon: '📝',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Distributive law (simple)
                max_multiplicand: 30,
                multipliers: [2, 3, 4, 5],
                operations: ['distributive_law', 'multiply_add_problems'],
                use_partitioning: true,
                contexts: ['simple']
            },
            2: {
                // Distributive law (2-digit × 1-digit)
                max_multiplicand: 99,
                multipliers: [2, 3, 4, 5, 6, 7, 8, 9],
                operations: ['distributive_law', 'multiply_add_problems', 'scaling_problems'],
                use_partitioning: true,
                contexts: ['simple', 'varied']
            },
            3: {
                // Harder correspondence problems
                max_multiplicand: 99,
                multipliers: [2, 3, 4, 5, 6, 7, 8, 9],
                operations: ['distributive_law', 'multiply_add_problems', 'scaling_problems', 'correspondence_hard'],
                use_partitioning: true,
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // All problem types
                max_multiplicand: 99,
                multipliers: [2, 3, 4, 5, 6, 7, 8, 9],
                operations: ['distributive_law', 'multiply_add_problems', 'scaling_problems', 'correspondence_hard', 'multi_step'],
                use_partitioning: true,
                contexts: ['simple', 'varied', 'mixed']
            }
        }
    },

    'C08_Y5_CALC': {
        id: 'C08_Y5_CALC',
        name: 'Complex Multiplication & Division Problems',
        description: 'Solve problems involving multiplication and division including using their knowledge of factors and multiples, squares and cubes; solve problems involving addition, subtraction, multiplication and division and a combination of these, including understanding the meaning of the equals sign; solve problems involving multiplication and division including scaling by simple fractions and problems involving simple rates',
        icon: '📝',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Problems using factors and multiples
                max_value: 100,
                operations: ['factor_problems', 'multiple_problems', 'all_four_ops'],
                include_squares_cubes: false,
                include_fractions: false,
                include_rates: false,
                contexts: ['simple']
            },
            2: {
                // Include squares and cubes
                max_value: 100,
                operations: ['factor_problems', 'multiple_problems', 'square_cube_problems', 'all_four_ops', 'equals_sign_meaning'],
                include_squares_cubes: true,
                include_fractions: false,
                include_rates: false,
                contexts: ['simple', 'varied']
            },
            3: {
                // Scaling by fractions, simple rates
                max_value: 1000,
                operations: ['factor_problems', 'multiple_problems', 'square_cube_problems', 'all_four_ops', 'equals_sign_meaning', 'fraction_scaling', 'simple_rates'],
                include_squares_cubes: true,
                include_fractions: true,
                include_rates: true,
                simple_fractions: [1/2, 1/4, 1/3, 1/5, 1/10],
                contexts: ['simple', 'varied', 'mixed']
            },
            4: {
                // All problem types
                max_value: 10000,
                operations: ['factor_problems', 'multiple_problems', 'square_cube_problems', 'all_four_ops', 'equals_sign_meaning', 'fraction_scaling', 'simple_rates', 'multi_step'],
                include_squares_cubes: true,
                include_fractions: true,
                include_rates: true,
                simple_fractions: [1/2, 1/4, 1/3, 1/5, 1/10, 2/3, 3/4, 2/5, 3/5, 4/5],
                contexts: ['simple', 'varied', 'mixed', 'real_world']
            }
        }
    },

    'C08_Y6_CALC': {
        id: 'C08_Y6_CALC',
        name: 'Multi-Operation Problems',
        description: 'Solve problems involving addition, subtraction, multiplication and division',
        icon: '📝',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Two-step problems (all four operations)
                max_value: 10000,
                operations: ['two_step_all_ops', 'choose_operations'],
                include_decimals: false,
                contexts: ['simple'],
                steps: 2
            },
            2: {
                // Multi-step with decimals
                max_value: 100000,
                operations: ['two_step_all_ops', 'three_step_all_ops', 'choose_operations'],
                include_decimals: true,
                decimal_places: [1, 2],
                contexts: ['simple', 'varied'],
                steps: [2, 3]
            },
            3: {
                // Complex multi-step
                max_value: 1000000,
                operations: ['two_step_all_ops', 'three_step_all_ops', 'four_step_all_ops', 'choose_operations', 'justify_method'],
                include_decimals: true,
                decimal_places: [1, 2, 3],
                contexts: ['simple', 'varied', 'mixed'],
                steps: [2, 3, 4]
            },
            4: {
                // Real-world multi-step problems
                max_value: 10000000,
                operations: ['two_step_all_ops', 'three_step_all_ops', 'four_step_all_ops', 'choose_operations', 'justify_method', 'real_world_complex'],
                include_decimals: true,
                decimal_places: [1, 2, 3],
                contexts: ['simple', 'varied', 'mixed', 'real_world'],
                steps: [2, 3, 4]
            }
        }
    },

    // ========================================================================
    // C09: ORDER OF OPERATIONS
    // ========================================================================

    'C09_Y6_CALC': {
        id: 'C09_Y6_CALC',
        name: 'Order of Operations (BODMAS)',
        description: 'Use their knowledge of the order of operations to carry out calculations involving the four operations',
        icon: '🔢',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        parameters: {
            1: {
                // Two operations (no brackets)
                max_value: 100,
                operations: ['two_ops_no_brackets', 'identify_first_step'],
                use_brackets: false,
                operation_count: 2,
                include_division: false
            },
            2: {
                // Two operations (with brackets)
                max_value: 100,
                operations: ['two_ops_with_brackets', 'three_ops_no_brackets', 'identify_first_step'],
                use_brackets: true,
                operation_count: [2, 3],
                include_division: true
            },
            3: {
                // Three operations (with brackets)
                max_value: 1000,
                operations: ['three_ops_with_brackets', 'four_ops', 'identify_order', 'evaluate'],
                use_brackets: true,
                operation_count: [3, 4],
                include_division: true
            },
            4: {
                // Complex BODMAS expressions
                max_value: 1000,
                operations: ['complex_expressions', 'nested_brackets', 'identify_order', 'evaluate', 'create_expression'],
                use_brackets: true,
                use_nested_brackets: true,
                operation_count: [3, 4, 5],
                include_division: true
            }
        }
    }
};
