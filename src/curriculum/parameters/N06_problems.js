/**
 * N06 Module Series: Number Problems
 * Using place value and number facts to solve problems
 * Covers Years 2-6 progression
 */

export const N06_MODULES = {
    'N06_Y2_NPV': {
        id: 'N06_Y2_NPV',
        name: 'N06_Y2_NPV: Solve Number Problems',
        description: 'Use place value and number facts to solve problems',
        icon: '🧮',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: {
            1: {
                // Beginning: Simple, concrete problems with small numbers
                min_value: 0,
                max_value: 30,
                step_sizes: [2, 5, 10],
                max_steps: 3,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'number_line_problems'
                ],
                contexts: ['simple'],
                problem_complexity: 'single_step'
            },
            2: {
                // Developing: Expanded range, more varied contexts
                min_value: 0,
                max_value: 60,
                step_sizes: [2, 3, 5, 10],
                max_steps: 5,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'number_line_problems',
                    'multi_step_problems'
                ],
                contexts: ['simple', 'varied'],
                problem_complexity: 'single_or_two_step'
            },
            3: {
                // Meeting: Full curriculum range, all operations
                min_value: 0,
                max_value: 100,
                step_sizes: [2, 3, 5, 10],
                max_steps: 8,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'number_line_problems',
                    'multi_step_problems'
                ],
                contexts: ['simple', 'varied', 'mixed'],
                problem_complexity: 'two_step'
            },
            4: {
                // Exceeding: Extended range, complex problems
                // NOTE: max_value intentionally extends to 120 (beyond curriculum "to 100")
                // to provide appropriate challenge for highest achievers
                min_value: 0,
                max_value: 120,
                step_sizes: [2, 3, 5, 10],
                max_steps: 10,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'number_line_problems',
                    'multi_step_problems'
                ],
                contexts: ['varied', 'mixed', 'complex'],
                problem_complexity: 'multi_step'
            }
        }
    },

    'N06_Y3_NPV': {
        id: 'N06_Y3_NPV',
        name: 'N06_Y3_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems involving 3N1-3N4',
        icon: '🧮',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: {
            1: {
                // Beginning: Small numbers, simple single-step problems
                min_value: 0,
                max_value: 200,
                step_sizes: [4, 8, 50],
                max_steps: 4,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'representation_problems'
                ],
                contexts: ['simple'],
                problem_complexity: 'single_step'
            },
            2: {
                // Developing: Expanded range, introduce 100s, more contexts
                min_value: 0,
                max_value: 500,
                step_sizes: [4, 8, 50, 100],
                max_steps: 6,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'representation_problems',
                    'multi_step_problems'
                ],
                contexts: ['simple', 'varied'],
                problem_complexity: 'single_or_two_step'
            },
            3: {
                // Meeting: Full curriculum range (to 1,000), all operations
                min_value: 0,
                max_value: 1000,
                step_sizes: [4, 8, 50, 100],
                max_steps: 8,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'representation_problems',
                    'multi_step_problems'
                ],
                contexts: ['simple', 'varied', 'mixed'],
                problem_complexity: 'two_step'
            },
            4: {
                // Exceeding: Beyond 1,000, complex multi-step problems
                min_value: 0,
                max_value: 1200,
                step_sizes: [4, 8, 50, 100],
                max_steps: 10,
                operations: [
                    'counting_problems',
                    'place_value_problems',
                    'comparison_problems',
                    'representation_problems',
                    'multi_step_problems'
                ],
                contexts: ['varied', 'mixed', 'complex'],
                problem_complexity: 'multi_step'
            }
        }
    },

    'N06_Y4_NPV': {
        id: 'N06_Y4_NPV',
        name: 'N06_Y4_NPV: Number & Practical Problems',
        description: 'Solve number and practical problems that involve 4N1-4N5 and with increasingly large positive numbers',
        icon: '🧮',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: {
            1: {
                // Beginning: Introduction to larger numbers, simple single-step problems
                min_value: 0,
                max_value: 2000,
                step_sizes: [6, 7, 9, 25],
                min_steps: 2,
                max_steps: 5,
                rounding_bases: [10, 100],
                roman_min: 1,
                roman_max: 50,
                operations: [
                    'counting_problems',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_number_problems'
                ],
                contexts: ['simple'],
                problem_complexity: 'single_step'
            },
            2: {
                // Developing: Expanded range to 5,000, introduce 1000s counting, more contexts
                min_value: 0,
                max_value: 5000,
                step_sizes: [6, 7, 9, 25, 1000],
                min_steps: 2,
                max_steps: 7,
                rounding_bases: [10, 100, 1000],
                roman_min: 1,
                roman_max: 75,
                operations: [
                    'counting_problems',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_number_problems',
                    'multi_step_problems'
                ],
                contexts: ['simple', 'practical'],
                problem_complexity: 'single_or_two_step'
            },
            3: {
                // Meeting: Full curriculum range (beyond 1,000 to 10,000), all operations
                min_value: 0,
                max_value: 10000,
                step_sizes: [6, 7, 9, 25, 1000],
                min_steps: 3,
                max_steps: 10,
                rounding_bases: [10, 100, 1000],
                roman_min: 1,
                roman_max: 100,
                operations: [
                    'counting_problems',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_number_problems',
                    'multi_step_problems'
                ],
                contexts: ['simple', 'practical', 'complex'],
                problem_complexity: 'two_step'
            },
            4: {
                // Exceeding: Large numbers, complex multi-step problems
                min_value: 0,
                max_value: 15000,
                step_sizes: [6, 7, 9, 25, 1000],
                min_steps: 4,
                max_steps: 12,
                rounding_bases: [10, 100, 1000],
                roman_min: 1,
                roman_max: 100,
                operations: [
                    'counting_problems',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_number_problems',
                    'multi_step_problems'
                ],
                contexts: ['practical', 'complex', 'large_numbers'],
                problem_complexity: 'multi_step'
            }
        }
    },

    'N06_Y5_NPV': {
        id: 'N06_Y5_NPV',
        name: 'N06_Y5_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems that involve 5N1-5N5',
        icon: '🧮',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: {
            1: {
                // Beginning: Introduction to very large numbers, simple problems
                // NOTE: roman_max jumps from 100 (Y4) to 500 (Y5 L1). This is intentional
                // as Year 5 curriculum requires understanding Roman numerals to 1,000 (M)
                min_value: 0,
                max_value: 100000,
                powers_of_10: [10, 100, 1000],
                min_steps: 2,
                max_steps: 5,
                rounding_bases: [10, 100, 1000],
                roman_min: 1,
                roman_max: 500,
                negative_range: [-50, 50],
                operations: [
                    'counting_with_powers',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_context_problems'
                ],
                contexts: ['simple', 'practical'],
                problem_complexity: 'single_step'
            },
            2: {
                // Developing: Expanded to 500,000, introduce 10,000 rounding
                min_value: 0,
                max_value: 500000,
                powers_of_10: [10, 100, 1000, 10000],
                min_steps: 2,
                max_steps: 7,
                rounding_bases: [10, 100, 1000, 10000],
                roman_min: 1,
                roman_max: 750,
                negative_range: [-200, 200],
                operations: [
                    'counting_with_powers',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_context_problems',
                    'multi_step_problems'
                ],
                contexts: ['simple', 'practical', 'varied'],
                problem_complexity: 'single_or_two_step'
            },
            3: {
                // Meeting: Full curriculum range (to 1,000,000), all rounding bases
                min_value: 0,
                max_value: 1000000,
                powers_of_10: [10, 100, 1000, 10000, 100000],
                min_steps: 3,
                max_steps: 10,
                rounding_bases: [10, 100, 1000, 10000, 100000],
                roman_min: 1,
                roman_max: 1000,
                negative_range: [-500, 500],
                operations: [
                    'counting_with_powers',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_context_problems',
                    'multi_step_problems'
                ],
                contexts: ['practical', 'varied', 'complex'],
                problem_complexity: 'two_step'
            },
            4: {
                // Exceeding: Beyond curriculum expectations, complex scenarios
                // NOTE: max_value set to 5,000,000 (reduced from 10,000,000) to maintain
                // clear differentiation with Year 6 and preserve vertical progression
                min_value: 0,
                max_value: 5000000,
                powers_of_10: [10, 100, 1000, 10000, 100000],
                min_steps: 4,
                max_steps: 12,
                rounding_bases: [10, 100, 1000, 10000, 100000],
                roman_min: 1,
                roman_max: 1000,
                negative_range: [-1000, 1000],
                operations: [
                    'counting_with_powers',
                    'place_value_comparison_problems',
                    'rounding_estimation_problems',
                    'negative_context_problems',
                    'multi_step_problems'
                ],
                contexts: ['complex', 'large_numbers', 'multi_concept'],
                problem_complexity: 'multi_step'
            }
        }
    },

    'N06_Y6_NPV': {
        id: 'N06_Y6_NPV',
        name: 'N06_Y6_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems that involve 6N2-6N5',
        icon: '🧮',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: {
            1: {
                // Beginning: Introduction to very large numbers (up to 1 million), simple single-step problems
                min_value: 0,
                max_value: 1000000,
                rounding_bases: [10, 100, 1000, 10000],
                min_steps: 2,
                max_steps: 5,
                negative_range: [-100, 100],
                interval_range: [50, 500],
                operations: [
                    'large_place_value_problems',
                    'multi_level_rounding_problems',
                    'ordering_comparing_large_numbers',
                    'negative_interval_problems'
                ],
                contexts: ['simple', 'practical'],
                problem_complexity: 'single_step'
            },
            2: {
                // Developing: Expanded to 5 million, introduce more complex rounding
                min_value: 0,
                max_value: 5000000,
                rounding_bases: [10, 100, 1000, 10000, 100000],
                min_steps: 2,
                max_steps: 7,
                negative_range: [-500, 500],
                interval_range: [100, 1000],
                operations: [
                    'large_place_value_problems',
                    'multi_level_rounding_problems',
                    'ordering_comparing_large_numbers',
                    'negative_interval_problems',
                    'multi_concept_integration'
                ],
                contexts: ['practical', 'varied'],
                problem_complexity: 'single_or_two_step'
            },
            3: {
                // Meeting: Full curriculum range (to 10 million), all operations, required rounding flexibility
                min_value: 0,
                max_value: 10000000,
                rounding_bases: [10, 100, 1000, 10000, 100000, 1000000],
                min_steps: 3,
                max_steps: 10,
                negative_range: [-1000, 1000],
                interval_range: [500, 2000],
                operations: [
                    'large_place_value_problems',
                    'multi_level_rounding_problems',
                    'ordering_comparing_large_numbers',
                    'negative_interval_problems',
                    'multi_concept_integration'
                ],
                contexts: ['practical', 'varied', 'complex'],
                problem_complexity: 'two_step'
            },
            4: {
                // Exceeding: Beyond 10 million, complex multi-step problems with flexible rounding
                min_value: 0,
                max_value: 20000000,
                rounding_bases: [10, 100, 1000, 10000, 100000, 1000000],
                min_steps: 4,
                max_steps: 12,
                negative_range: [-2000, 2000],
                interval_range: [1000, 5000],
                operations: [
                    'large_place_value_problems',
                    'multi_level_rounding_problems',
                    'ordering_comparing_large_numbers',
                    'negative_interval_problems',
                    'multi_concept_integration'
                ],
                contexts: ['complex', 'large_numbers', 'multi_concept'],
                problem_complexity: 'multi_step'
            }
        }
    }
};
