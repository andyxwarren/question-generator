/**
 * C04 Module Series: Add/Subtract to Solve Problems
 * Problem-solving with addition and subtraction in various contexts
 * Progression: One-step (Y1-3) → Two-step (Y4) → Multi-step (Y5-6)
 *
 * Key Design Principles:
 * - Controlled variety: Limited contexts for mathematical focus
 * - Reversed equations: Include "7 = ___ - 9" format regularly
 * - Adaptive question types: L1-2 multiple choice, L3-4 text input
 * - All 4 difficulty levels for comprehensive coverage
 */

export const C04_MODULES = {
    'C04_Y1_CALC': {
        id: 'C04_Y1_CALC',
        name: 'C04_Y1_CALC: One-Step Problems to 20',
        description: 'Solve one-step problems that involve addition and subtraction, using concrete objects and pictorial representations, and missing number problems such as 7 = _ – 9',
        icon: '🧮',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract to solve problems',
        ref: 'C4',
        parameters: {
            1: {
                // Beginning: Simple problems to 10, addition focus
                max_value: 10,
                operations: [
                    'simple_addition_word',      // Word problems with addition
                    'simple_subtraction_word',   // Word problems with subtraction
                    'missing_addend'             // a + ? = c format
                ],
                problem_types: ['word_problem', 'missing_number'],
                context_types: ['objects'],      // Just countable items (apples, books, etc.)
                allow_zero: false,               // Avoid trivial zero problems at Level 1
                reversed_format_frequency: 0.3,  // 30% use "7 = ___ + 3" format
                question_format: 'multiple_choice', // L1-2 use multiple choice
                distractor_count: 3,
                number_range: [1, 10]            // Start at 1 to avoid zero values
            },
            2: {
                // Developing: Extend to 15, more operations
                max_value: 15,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',        // a - ? = c format
                    'missing_minuend'            // ? - b = c format
                ],
                problem_types: ['word_problem', 'missing_number'],
                context_types: ['objects'],
                allow_zero: true,
                reversed_format_frequency: 0.3,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [0, 15]
            },
            3: {
                // Meeting: Full range to 20, all formats
                max_value: 20,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',
                    'reversed_equation'          // Explicit "7 = ___ - 9" format
                ],
                problem_types: ['word_problem', 'missing_number', 'reversed_format'],
                context_types: ['objects'],
                allow_zero: true,
                reversed_format_frequency: 0.35, // More frequent at higher levels
                question_format: 'text_input',   // L3-4 use text input
                number_range: [0, 20]
            },
            4: {
                // Exceeding: Complex missing numbers, preparation for two-step
                max_value: 20,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',
                    'reversed_equation',
                    'complex_missing',           // Multiple solution paths
                    'implied_operations'         // Require inference of operation
                ],
                problem_types: ['word_problem', 'missing_number', 'reversed_format', 'reasoning'],
                context_types: ['objects'],
                allow_zero: true,
                reversed_format_frequency: 0.4,
                question_format: 'text_input',
                number_range: [0, 20],
                allow_inference: true           // Problems require determining which operation
            }
        }
    },

    'C04_Y2_CALC': {
        id: 'C04_Y2_CALC',
        name: 'C04_Y2_CALC: One-Step Problems to 100',
        description: 'Solve problems with addition and subtraction: using concrete objects and pictorial representations, including those involving numbers, quantities and measures; applying their increasing knowledge of mental and written methods',
        icon: '🧮',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract to solve problems',
        ref: 'C4',
        parameters: {
            1: {
                // Beginning: Simple problems to 50, introduce money (pence only)
                max_value: 50,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'money_problems_simple'      // NEW: Money contexts (pence only)
                ],
                problem_types: ['word_problem', 'missing_number', 'money'],
                context_types: ['objects', 'money_pence'],
                money_units: ['p'],              // Pence only at Level 1
                allow_zero: true,
                reversed_format_frequency: 0.3,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [0, 50]
            },
            2: {
                // Developing: Extend to 75, add length and mass
                max_value: 75,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'money_problems_simple',
                    'length_problems',           // NEW: Length (cm, m)
                    'mass_problems'              // NEW: Mass (g, kg)
                ],
                problem_types: ['word_problem', 'missing_number', 'money', 'measures'],
                context_types: ['objects', 'money_pence', 'length', 'mass'],
                money_units: ['p', '£'],         // Introduce pounds
                length_units: ['cm', 'm'],
                mass_units: ['g', 'kg'],
                allow_zero: true,
                reversed_format_frequency: 0.3,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [0, 75]
            },
            3: {
                // Meeting: Full range to 100, all measure types
                max_value: 100,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',
                    'money_problems_simple',
                    'length_problems',
                    'mass_problems',
                    'mixed_measures'             // Mix different measure types
                ],
                problem_types: ['word_problem', 'missing_number', 'money', 'measures', 'reversed_format'],
                context_types: ['objects', 'money_mixed', 'length', 'mass'],
                money_units: ['p', '£'],
                length_units: ['cm', 'm'],
                mass_units: ['g', 'kg'],
                allow_zero: true,
                reversed_format_frequency: 0.35,
                question_format: 'text_input',
                number_range: [0, 100]
            },
            4: {
                // Exceeding: Complex problems, larger numbers
                max_value: 100,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',
                    'money_problems_simple',
                    'money_problems_change',     // NEW: Giving change
                    'length_problems',
                    'mass_problems',
                    'mixed_measures',
                    'complex_missing'
                ],
                problem_types: ['word_problem', 'missing_number', 'money', 'measures', 'reversed_format', 'reasoning'],
                context_types: ['objects', 'money_mixed', 'length', 'mass', 'capacity'],
                money_units: ['p', '£'],
                length_units: ['cm', 'm'],
                mass_units: ['g', 'kg'],
                capacity_units: ['ml', 'l'],     // Introduce capacity
                allow_zero: true,
                reversed_format_frequency: 0.4,
                question_format: 'text_input',
                number_range: [0, 100]
            }
        }
    },

    'C04_Y3_CALC': {
        id: 'C04_Y3_CALC',
        name: 'C04_Y3_CALC: One-Step Problems to 1000',
        description: 'Solve problems, including missing number problems, using number facts, place value, and more complex addition and subtraction',
        icon: '🧮',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract to solve problems',
        ref: 'C4',
        parameters: {
            1: {
                // Beginning: 3-digit numbers to 500, simple cases
                max_value: 500,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'place_value_addition',      // NEW: Place value emphasis
                    'place_value_subtraction'
                ],
                problem_types: ['word_problem', 'missing_number', 'place_value'],
                context_types: ['objects', 'money_mixed', 'measures'],
                money_units: ['p', '£'],
                length_units: ['cm', 'm', 'mm'],
                mass_units: ['g', 'kg'],
                place_value_emphasis: true,      // Highlight place value reasoning
                allow_zero: true,
                reversed_format_frequency: 0.3,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [0, 500]
            },
            2: {
                // Developing: Extend to 700, more complex place value
                max_value: 700,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'place_value_addition',
                    'place_value_subtraction',
                    'number_facts_application'   // NEW: Use known facts
                ],
                problem_types: ['word_problem', 'missing_number', 'place_value', 'number_facts'],
                context_types: ['objects', 'money_mixed', 'measures'],
                money_units: ['p', '£'],
                length_units: ['cm', 'm', 'mm'],
                mass_units: ['g', 'kg'],
                place_value_emphasis: true,
                number_facts_integration: true,
                allow_zero: true,
                reversed_format_frequency: 0.3,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [0, 700]
            },
            3: {
                // Meeting: Full range to 1000, all problem types
                max_value: 1000,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',
                    'place_value_addition',
                    'place_value_subtraction',
                    'number_facts_application',
                    'complex_missing_3digit'     // Missing numbers with 3-digit
                ],
                problem_types: ['word_problem', 'missing_number', 'place_value', 'number_facts', 'reversed_format'],
                context_types: ['objects', 'money_mixed', 'measures'],
                money_units: ['p', '£'],
                length_units: ['cm', 'm', 'mm'],
                mass_units: ['g', 'kg'],
                capacity_units: ['ml', 'l'],
                place_value_emphasis: true,
                number_facts_integration: true,
                allow_zero: true,
                reversed_format_frequency: 0.35,
                question_format: 'text_input',
                number_range: [0, 1000]
            },
            4: {
                // Exceeding: Complex reasoning, preparation for two-step
                max_value: 1000,
                operations: [
                    'simple_addition_word',
                    'simple_subtraction_word',
                    'missing_addend',
                    'missing_subtrahend',
                    'missing_minuend',
                    'place_value_addition',
                    'place_value_subtraction',
                    'number_facts_application',
                    'complex_missing_3digit',
                    'multi_part_reasoning'       // Requires multi-step thinking (prep for Y4)
                ],
                problem_types: ['word_problem', 'missing_number', 'place_value', 'number_facts', 'reversed_format', 'reasoning'],
                context_types: ['objects', 'money_mixed', 'measures'],
                money_units: ['p', '£'],
                length_units: ['cm', 'm', 'mm'],
                mass_units: ['g', 'kg'],
                capacity_units: ['ml', 'l'],
                place_value_emphasis: true,
                number_facts_integration: true,
                allow_zero: true,
                reversed_format_frequency: 0.4,
                question_format: 'text_input',
                number_range: [0, 1000],
                preparation_for_twostep: true   // Include hints of two-step reasoning
            }
        }
    },

    'C04_Y4_CALC': {
        id: 'C04_Y4_CALC',
        name: 'C04_Y4_CALC: Two-Step Problems to 10000',
        description: 'Solve addition and subtraction two-step problems in contexts, deciding which operations and methods to use and why',
        icon: '🧮',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract to solve problems',
        ref: 'C4',
        parameters: {
            1: {
                // Beginning: Simple two-step to 100, very explicit
                max_value: 100,
                operations: [
                    'combine_then_remove',       // Add two quantities, then subtract
                    'remove_then_add'            // Subtract, then add more
                ],
                problem_types: ['two_step_word'],
                context_types: ['objects', 'simple_scenarios'],
                steps: 2,
                two_step_patterns: ['combine_then_remove', 'remove_then_add'],
                explicit_steps: true,            // Very clear step indicators
                allow_zero: false,               // Avoid zero in two-step
                reversed_format_frequency: 0.2,  // Less emphasis on format, more on reasoning
                question_format: 'multiple_choice',
                distractor_count: 3,
                distractor_types: ['first_step_only', 'second_step_only', 'wrong_operation'],
                number_range: [1, 100]
            },
            2: {
                // Developing: Extend to 500, more patterns
                max_value: 500,
                operations: [
                    'combine_then_remove',
                    'remove_then_add',
                    'two_additions',             // Combine three quantities
                    'two_subtractions'           // Sequential removal
                ],
                problem_types: ['two_step_word', 'two_step_measures'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                steps: 2,
                two_step_patterns: ['combine_then_remove', 'remove_then_add', 'two_additions', 'two_subtractions'],
                explicit_steps: true,
                money_units: ['p', '£'],
                length_units: ['cm', 'm'],
                mass_units: ['g', 'kg'],
                allow_zero: false,
                reversed_format_frequency: 0.2,
                question_format: 'multiple_choice',
                distractor_count: 3,
                distractor_types: ['first_step_only', 'second_step_only', 'wrong_operation', 'calculation_error'],
                number_range: [1, 500]
            },
            3: {
                // Meeting: Full range to 10000, less explicit
                max_value: 10000,
                operations: [
                    'combine_then_remove',
                    'remove_then_add',
                    'two_additions',
                    'two_subtractions',
                    'compare_then_adjust',       // Find difference, then modify
                    'two_step_with_distractor'   // Include irrelevant information
                ],
                problem_types: ['two_step_word', 'two_step_measures', 'two_step_reasoning'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                steps: 2,
                two_step_patterns: ['combine_then_remove', 'remove_then_add', 'two_additions', 'two_subtractions', 'compare_then_adjust'],
                explicit_steps: false,           // Require interpretation
                money_units: ['p', '£'],
                length_units: ['cm', 'm', 'mm'],
                mass_units: ['g', 'kg'],
                capacity_units: ['ml', 'l'],
                allow_zero: false,
                reversed_format_frequency: 0.2,
                question_format: 'text_input',
                distractor_types: ['first_step_only', 'second_step_only', 'wrong_operation', 'calculation_error', 'used_distractor'],
                number_range: [1, 10000],
                include_irrelevant_info: true    // Test problem-solving skills
            },
            4: {
                // Exceeding: Complex two-step, approaching three-step
                max_value: 10000,
                operations: [
                    'combine_then_remove',
                    'remove_then_add',
                    'two_additions',
                    'two_subtractions',
                    'compare_then_adjust',
                    'two_step_with_distractor',
                    'two_step_missing_number',   // Missing value in two-step context
                    'approaching_three_step'     // Very complex two-step (prep for Y5)
                ],
                problem_types: ['two_step_word', 'two_step_measures', 'two_step_reasoning', 'two_step_missing'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                steps: 2,
                two_step_patterns: ['combine_then_remove', 'remove_then_add', 'two_additions', 'two_subtractions', 'compare_then_adjust', 'two_step_missing'],
                explicit_steps: false,
                money_units: ['p', '£'],
                length_units: ['cm', 'm', 'mm'],
                mass_units: ['g', 'kg'],
                capacity_units: ['ml', 'l'],
                allow_zero: false,
                reversed_format_frequency: 0.2,
                question_format: 'text_input',
                distractor_types: ['first_step_only', 'second_step_only', 'wrong_operation', 'calculation_error', 'used_distractor'],
                number_range: [1, 10000],
                include_irrelevant_info: true,
                allow_missing_info: true         // Require inference of missing values
            }
        }
    },

    'C04_Y5_CALC': {
        id: 'C04_Y5_CALC',
        name: 'C04_Y5_CALC: Multi-Step Problems',
        description: 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why',
        icon: '🧮',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract to solve problems',
        ref: 'C4',
        parameters: {
            1: {
                // Beginning: 3-step problems, clear structure
                max_value: 10000,
                steps: 3,
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed'],
                problem_types: ['multi_step_word'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: true,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [1, 10000]
            },
            2: {
                // Developing: 3-4 steps, less explicit
                max_value: 100000,
                steps: [3, 4],
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed'],
                problem_types: ['multi_step_word', 'multi_step_reasoning'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: false,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [1, 100000]
            },
            3: {
                // Meeting: 4 steps, requires planning
                max_value: 1000000,
                steps: 4,
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed'],
                problem_types: ['multi_step_word', 'multi_step_reasoning'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: false,
                question_format: 'text_input',
                number_range: [1, 1000000]
            },
            4: {
                // Exceeding: 5+ steps, complex reasoning
                max_value: 1000000,
                steps: [4, 5],
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed', 'multi_step_with_inference'],
                problem_types: ['multi_step_word', 'multi_step_reasoning', 'multi_step_missing'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: false,
                question_format: 'text_input',
                number_range: [1, 1000000],
                include_irrelevant_info: true
            }
        }
    },

    'C04_Y6_CALC': {
        id: 'C04_Y6_CALC',
        name: 'C04_Y6_CALC: Multi-Step Problems (Advanced)',
        description: 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why',
        icon: '🧮',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract to solve problems',
        ref: 'C4',
        parameters: {
            1: {
                // Beginning: Similar to Y5 L3, larger numbers
                max_value: 10000000,
                steps: 3,
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed'],
                problem_types: ['multi_step_word'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: true,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [1, 10000000]
            },
            2: {
                // Developing: 4 steps, larger numbers
                max_value: 10000000,
                steps: 4,
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed'],
                problem_types: ['multi_step_word', 'multi_step_reasoning'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: false,
                question_format: 'multiple_choice',
                distractor_count: 3,
                number_range: [1, 10000000]
            },
            3: {
                // Meeting: 4-5 steps, complex contexts
                max_value: 10000000,
                steps: [4, 5],
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed'],
                problem_types: ['multi_step_word', 'multi_step_reasoning'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: false,
                question_format: 'text_input',
                number_range: [1, 10000000]
            },
            4: {
                // Exceeding: Most complex multi-step
                max_value: 10000000,
                steps: [5, 6],
                operations: ['multi_step_addition', 'multi_step_subtraction', 'multi_step_mixed', 'multi_step_with_inference'],
                problem_types: ['multi_step_word', 'multi_step_reasoning', 'multi_step_missing'],
                context_types: ['objects', 'money_mixed', 'measures', 'scenarios'],
                explicit_steps: false,
                question_format: 'text_input',
                number_range: [1, 10000000],
                include_irrelevant_info: true,
                allow_missing_info: true
            }
        }
    }
};
