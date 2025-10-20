/**
 * C05 - Properties of Number (Multiples, Factors, Primes, Squares and Cubes)
 *
 * Year 5: Identify multiples and factors, including finding all factor pairs of a number and common
 *         factors of two numbers; know and use the vocabulary of prime numbers, prime factors and
 *         composite (non-prime) numbers; establish whether a number up to 100 is prime and recall
 *         prime numbers up to 19; recognise and use square numbers and cube numbers, and the
 *         notation for squared (²) and cubed (³)
 *
 * Year 6: Identify common factors, common multiples and prime numbers
 */

export const C05_MODULES = {
    'C05_Y5_CALC': {
        id: 'C05_Y5_CALC',
        name: 'Properties of Number',
        description: 'Identify multiples, factors, factor pairs, common factors, primes, squares and cubes',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'properties of number (multiples, factors, primes, squares and cubes)',
        parameters: {
            1: {  // Beginning
                operations: ['identify_multiples', 'find_factor_pairs', 'identify_primes', 'squares_cubes'],

                // Multiples
                multiple_bases: [2, 5, 10],  // Easiest multiples to identify
                multiple_range: [1, 50],

                // Factors
                factor_numbers: [4, 6, 8, 10, 12, 15, 16, 18, 20],  // Small numbers with clear factors
                max_factor_pairs: 4,

                // Primes
                prime_recall_range: [1, 19],  // Curriculum requires recall up to 19
                prime_identify_range: [1, 30],
                include_composite_label: false,  // Don't use "composite" terminology yet

                // Squares and cubes
                square_bases: [1, 2, 3, 4, 5],
                cube_bases: [1, 2, 3],
                power_range: [1, 25],
                include_notation: true,  // Use ² and ³ symbols

                // Question complexity
                question_styles: ['direct', 'recognition'],
                include_word_problems: false
            },

            2: {  // Developing
                operations: ['identify_multiples', 'find_factor_pairs', 'identify_primes', 'squares_cubes', 'common_factors'],

                // Multiples
                multiple_bases: [2, 3, 4, 5, 6, 10],
                multiple_range: [1, 100],

                // Factors
                factor_numbers: [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 28, 30],
                max_factor_pairs: 6,

                // Primes
                prime_recall_range: [1, 19],
                prime_identify_range: [1, 50],
                include_composite_label: true,  // Introduce "composite" terminology

                // Squares and cubes
                square_bases: [1, 2, 3, 4, 5, 6, 7, 8],
                cube_bases: [1, 2, 3, 4],
                power_range: [1, 64],
                include_notation: true,

                // Common factors (introduced)
                common_factor_pairs: [[6, 9], [8, 12], [10, 15], [12, 18], [15, 20]],

                // Question complexity
                question_styles: ['direct', 'recognition', 'application'],
                include_word_problems: false
            },

            3: {  // Meeting
                operations: ['identify_multiples', 'find_factor_pairs', 'identify_primes', 'squares_cubes', 'common_factors', 'prime_factors'],

                // Multiples
                multiple_bases: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
                multiple_range: [1, 100],

                // Factors
                factor_numbers: 'all_up_to_50',  // Any number 1-50
                max_factor_pairs: 8,

                // Primes
                prime_recall_range: [1, 19],
                prime_identify_range: [1, 100],  // Full curriculum range
                include_composite_label: true,
                include_prime_factors: true,  // Introduce prime factorization

                // Squares and cubes
                square_bases: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                cube_bases: [1, 2, 3, 4, 5],
                power_range: [1, 100],
                include_notation: true,
                include_roots: true,  // Include square root questions

                // Common factors
                common_factor_range: [1, 50],  // Any two numbers in range
                include_hcf: true,  // Include "highest common factor" terminology

                // Question complexity
                question_styles: ['direct', 'recognition', 'application', 'reasoning'],
                include_word_problems: true
            },

            4: {  // Exceeding
                operations: ['identify_multiples', 'find_factor_pairs', 'identify_primes', 'squares_cubes', 'common_factors', 'prime_factors'],

                // Multiples
                multiple_bases: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                multiple_range: [1, 150],  // Extend beyond 100

                // Factors
                factor_numbers: 'all_up_to_100',  // Any number 1-100
                max_factor_pairs: 12,

                // Primes
                prime_recall_range: [1, 19],
                prime_identify_range: [1, 120],  // Extend beyond curriculum minimum
                include_composite_label: true,
                include_prime_factors: true,
                include_prime_factorization: true,  // Full prime factorization

                // Squares and cubes
                square_bases: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                cube_bases: [1, 2, 3, 4, 5, 6],
                power_range: [1, 144],
                include_notation: true,
                include_roots: true,
                include_mixed_powers: true,  // Mix squares and cubes in questions

                // Common factors
                common_factor_range: [1, 100],
                include_hcf: true,
                include_three_numbers: true,  // Common factors of three numbers

                // Question complexity
                question_styles: ['direct', 'recognition', 'application', 'reasoning', 'problem_solving'],
                include_word_problems: true
            }
        }
    },

    'C05_Y6_CALC': {
        id: 'C05_Y6_CALC',
        name: 'Common Factors, Multiples and Primes',
        description: 'Identify common factors, common multiples and prime numbers',
        icon: '🔢',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'properties of number (multiples, factors, primes, squares and cubes)',
        parameters: {
            1: {  // Beginning
                operations: ['common_factors', 'common_multiples', 'identify_primes'],

                // Common factors
                common_factor_pairs: [[6, 9], [8, 12], [10, 15], [12, 16], [12, 18], [15, 20], [18, 24]],
                include_hcf: true,
                max_common_factors: 4,

                // Common multiples
                common_multiple_pairs: [[2, 3], [2, 4], [2, 5], [3, 5], [4, 6]],
                include_lcm: true,
                multiples_to_find: 3,  // Find first 3 common multiples
                multiple_max: 60,

                // Primes
                prime_range: [1, 50],
                prime_list_length: 5,  // "List all primes between X and Y"

                // Question complexity
                question_styles: ['direct', 'recognition'],
                include_word_problems: false
            },

            2: {  // Developing
                operations: ['common_factors', 'common_multiples', 'identify_primes', 'integrated'],

                // Common factors
                common_factor_range: [10, 60],  // Any two numbers in range
                include_hcf: true,
                max_common_factors: 6,
                include_three_numbers: false,

                // Common multiples
                common_multiple_range: [2, 12],  // Any two numbers in range
                include_lcm: true,
                multiples_to_find: 4,
                multiple_max: 100,

                // Primes
                prime_range: [1, 100],
                prime_list_length: 6,

                // Integrated (combine concepts)
                integration_complexity: 'two_concepts',

                // Question complexity
                question_styles: ['direct', 'recognition', 'application'],
                include_word_problems: false
            },

            3: {  // Meeting
                operations: ['common_factors', 'common_multiples', 'identify_primes', 'integrated'],

                // Common factors
                common_factor_range: [10, 100],
                include_hcf: true,
                max_common_factors: 8,
                include_three_numbers: true,  // Common factors of 3 numbers

                // Common multiples
                common_multiple_range: [2, 20],
                include_lcm: true,
                multiples_to_find: 5,
                multiple_max: 150,

                // Primes
                prime_range: [1, 150],
                prime_list_length: 8,
                include_prime_tests: true,  // Divisibility tests

                // Integrated
                integration_complexity: 'two_three_concepts',

                // Question complexity
                question_styles: ['direct', 'recognition', 'application', 'reasoning'],
                include_word_problems: true
            },

            4: {  // Exceeding
                operations: ['common_factors', 'common_multiples', 'identify_primes', 'integrated'],

                // Common factors
                common_factor_range: [10, 200],
                include_hcf: true,
                max_common_factors: 12,
                include_three_numbers: true,
                include_four_numbers: true,  // Challenge: 4 numbers

                // Common multiples
                common_multiple_range: [2, 25],
                include_lcm: true,
                multiples_to_find: 6,
                multiple_max: 300,
                include_three_numbers: true,

                // Primes
                prime_range: [1, 200],
                prime_list_length: 10,
                include_prime_tests: true,
                include_prime_gaps: true,  // Twin primes, prime gaps

                // Integrated
                integration_complexity: 'three_four_concepts',

                // Question complexity
                question_styles: ['direct', 'recognition', 'application', 'reasoning', 'problem_solving'],
                include_word_problems: true
            }
        }
    }
};
