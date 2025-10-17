/**
 * Curriculum Module Definitions
 *
 * Defines all curriculum modules with parameters for 4 difficulty levels.
 * NEW STRUCTURE: Parameters organized by level, not by parameter type.
 *
 * Level 1: Beginning
 * Level 2: Developing
 * Level 3: Meeting
 * Level 4: Exceeding
 *
 * Module IDs based on UK National Curriculum Framework
 */

export const MODULES = {
    'N01_Y1_NPV': {
        id: 'N01_Y1_NPV',
        name: 'N01_Y1_NPV: Counting in Multiples',
        description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                // Sub-objective 1: Count forwards and backwards from 0 to 20 in 1s and 2s
                step_sizes: [1, 2],                   // Counting in 1s and 2s
                min_value: 0,
                max_value: 20,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_twenty',         // Start from 0 for forwards, 20 for backwards
                sequence_length: 5,
                gaps_count: 1,
                gap_position: 'end'
            },
            2: {
                // Sub-objective 2: Count forwards and backwards from 0 to 50 in 1s, 2s, and 5s, from any starting point
                step_sizes: [1, 2, 5],                // Counting in 1s, 2s and 5s
                min_value: 0,
                max_value: 50,
                directions: ['forwards', 'backwards'],
                start_from: 'any',                    // Can start from any number
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'middle'
            },
            3: {
                // Sub-objective 3: Count forwards and backwards from 0 to 100 in 1s, 2s, 5s, and 10s, from any starting point
                step_sizes: [1, 2, 5, 10],            // Counting in 1s, 2s, 5s and 10s
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',                    // Can start from any number
                sequence_length: 8,
                gaps_count: 2,
                gap_position: 'random'
            },
            4: {
                // Sub-objective 4: Count forwards and backwards across 100 in all multiples (1s, 2s, 3s, 5s, 10s)
                step_sizes: [1, 2, 3, 5, 10],         // UPDATED: Added 1 and 3
                min_value: 0,
                max_value: 200,                       // UPDATED: Extended from 100 to 200
                directions: ['forwards', 'backwards'],
                start_from: 'any',                    // UPDATED: Changed from 'zero_or_multiple' to 'any'
                sequence_length: 12,                  // UPDATED: Increased from 10 to 12
                gaps_count: 3,                        // UPDATED: Increased from 2 to 3
                gap_position: 'random'
            }
        }
    },

    'N01_Y2_NPV': {
        id: 'N01_Y2_NPV',
        name: 'N01_Y2_NPV: Counting in Steps',
        description: 'Count in steps of 2, 3, and 5 from 0, and in tens from any number, forward and backward',
        icon: '🔢',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [2, 5, 10],
                min_value: 0,
                max_value: 50,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end',
                tens_from_any: false,
                tens_range: [0, 50]
            },
            2: {
                step_sizes: [2, 3, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle',
                tens_from_any: true,
                tens_range: [0, 100]
            },
            3: {
                step_sizes: [2, 3, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random',
                tens_from_any: true,
                tens_range: [0, 100]
            },
            4: {
                step_sizes: [2, 3, 4, 5, 10],
                min_value: 0,
                max_value: 200,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random',
                tens_from_any: true,
                tens_range: [0, 200]
            }
        }
    },

    'N01_Y3_NPV': {
        id: 'N01_Y3_NPV',
        name: 'N01_Y3_NPV: Counting from 0',
        description: 'Count from 0 in multiples of 4, 8, 50 and 100',
        icon: '🔢',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [4, 8, 10, 50],
                min_value: 0,
                max_value: 100,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end'
            },
            2: {
                step_sizes: [4, 8, 50, 100],
                min_value: 0,
                max_value: 400,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [4, 8, 50, 100],
                min_value: 0,
                max_value: 800,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random'
            },
            4: {
                step_sizes: [4, 6, 8, 25, 50, 100],
                min_value: 0,
                max_value: 1000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random'
            }
        }
    },

    'N01_Y4_NPV': {
        id: 'N01_Y4_NPV',
        name: 'N01_Y4_NPV: Count in Multiples',
        description: 'Count in multiples of 6, 7, 9, 25 and 1000',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [6, 7, 9, 25],
                min_value: 0,
                max_value: 200,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end'
            },
            2: {
                step_sizes: [6, 7, 9, 25, 1000],
                min_value: 0,
                max_value: 500,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [6, 7, 9, 25, 1000],
                min_value: 0,
                max_value: 10000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random'
            },
            4: {
                step_sizes: [6, 7, 9, 11, 12, 25, 1000],
                min_value: 0,
                max_value: 20000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random'
            }
        }
    },

    'N01_Y5_NPV': {
        id: 'N01_Y5_NPV',
        name: 'N01_Y5_NPV: Count Forwards and Backwards',
        description: 'Count forwards and backwards with positive and negative whole numbers, including through zero',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                powers_of_10: [10, 100],           // Use powers_of_10 instead of step_sizes for Y5
                min_value: -100,
                max_value: 100,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end',
                start_range: [-50, 50]             // Specific to Y5
            },
            2: {
                powers_of_10: [10, 100, 1000],
                min_value: -500,
                max_value: 500,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle',
                start_range: [-200, 200]
            },
            3: {
                powers_of_10: [10, 100, 1000, 10000],
                min_value: -10000,
                max_value: 10000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random',
                start_range: [-5000, 5000]
            },
            4: {
                powers_of_10: [10, 100, 1000, 10000, 100000],
                min_value: -100000,
                max_value: 100000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random',
                start_range: [-50000, 50000]
            }
        }
    },

    'N02_Y2_NPV': {
        id: 'N02_Y2_NPV',
        name: 'N02_Y2_NPV: Read and Write Numbers',
        description: 'Read and write numbers to at least 100 in numerals and in words',
        icon: '🔤',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 0,
                max_value: 50,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
                order_count_max: 3
            },
            2: {
                min_value: 0,
                max_value: 100,
                word_min: 0,
                word_max: 50,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three', 'order_four', 'complete_statement', 'true_false'],
                order_count_max: 4
            },
            3: {
                min_value: 0,
                max_value: 100,
                word_min: 0,
                word_max: 100,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'between'],
                order_count_max: 4
            },
            4: {
                min_value: 0,
                max_value: 120,
                word_min: 0,
                word_max: 100,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'between'],
                order_count_max: 5
            }
        }
    },

    'N02_Y3_NPV': {
        id: 'N02_Y3_NPV',
        name: 'N02_Y3_NPV: Numbers to 1000',
        description: 'Read and write numbers up to 1000 in numerals and in words',
        icon: '🔤',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 0,
                max_value: 200,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'one_more', 'one_less', 'ten_more', 'ten_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
                order_count_max: 3
            },
            2: {
                min_value: 0,
                max_value: 500,
                word_min: 0,
                word_max: 50,
                operations: ['identify_numeral', 'one_more', 'one_less', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],
                order_count_max: 4
            },
            3: {
                min_value: 0,
                max_value: 1000,
                word_min: 0,
                word_max: 100,
                operations: ['identify_numeral', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],
                order_count_max: 5
            },
            4: {
                min_value: 0,
                max_value: 1000,
                word_min: 0,
                word_max: 100,
                operations: ['ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],
                order_count_max: 6
            }
        }
    },

    'N02_Y4_NPV': {
        id: 'N02_Y4_NPV',
        name: 'N02_Y4_NPV: Order and Compare Beyond 1000',
        description: 'Order and compare numbers beyond 1000',
        icon: '🔤',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 100,
                max_value: 2000,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three', 'round_to_ten', 'round_to_hundred'],
                order_count_max: 3
            },
            2: {
                min_value: 100,
                max_value: 10000,
                word_min: 0,
                word_max: 50,
                operations: ['ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'round_to_ten', 'round_to_hundred', 'round_to_thousand'],
                order_count_max: 5
            },
            3: {
                min_value: 100,
                max_value: 100000,
                word_min: 0,
                word_max: 100,
                operations: ['hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'round_to_hundred', 'round_to_thousand'],
                order_count_max: 10
            },
            4: {
                min_value: 1000,
                max_value: 1000000,
                word_min: 0,
                word_max: 100,
                operations: ['thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'round_to_thousand', 'complex_more_less'],
                order_count_max: 15
            }
        }
    },

    'N02_Y5_NPV': {
        id: 'N02_Y5_NPV',
        name: 'N02_Y5_NPV: Numbers to 1 Million',
        description: 'Read, write, order and compare numbers to at least 1,000,000 and determine the value of each digit',
        icon: '🔤',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 1000,
                max_value: 100000,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'thousand_more', 'thousand_less', 'ten_thousand_more', 'ten_thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three', 'round_to_thousand', 'round_to_ten_thousand'],
                order_count_max: 3
            },
            2: {
                min_value: 10000,
                max_value: 500000,
                word_min: 0,
                word_max: 50,
                operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'round_to_ten_thousand', 'round_to_hundred_thousand'],
                order_count_max: 5
            },
            3: {
                min_value: 10000,
                max_value: 1000000,
                word_min: 0,
                word_max: 100,
                operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit', 'round_to_ten_thousand', 'round_to_hundred_thousand'],
                order_count_max: 10
            },
            4: {
                min_value: 100000,
                max_value: 10000000,
                word_min: 0,
                word_max: 100,
                operations: ['hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit', 'round_to_hundred_thousand', 'complex_more_less'],
                order_count_max: 15
            }
        }
    },

    'N02_Y6_NPV': {
        id: 'N02_Y6_NPV',
        name: 'N02_Y6_NPV: Numbers to 10 Million',
        description: 'Read, write, order and compare numbers up to 10,000,000 and determine the value of each digit',
        icon: '🔤',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 10000,
                max_value: 1000000,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'hundred_thousand_more', 'hundred_thousand_less', 'million_more', 'million_less', 'compare_two', 'use_symbols', 'order_two', 'order_three', 'round_to_hundred_thousand', 'round_to_million'],
                order_count_max: 3
            },
            2: {
                min_value: 100000,
                max_value: 5000000,
                word_min: 0,
                word_max: 50,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'round_to_million'],
                order_count_max: 5
            },
            3: {
                min_value: 1000000,
                max_value: 10000000,
                word_min: 0,
                word_max: 100,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit', 'round_to_million'],
                order_count_max: 10
            },
            4: {
                min_value: 1000000,
                max_value: 10000000,
                word_min: 0,
                word_max: 100,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit', 'round_to_million', 'complex_more_less'],
                order_count_max: 20
            }
        }
    },

    'N03_Y2_NPV': {
        id: 'N03_Y2_NPV',
        name: 'N03_Y2_NPV: Two-Digit Place Value',
        description: 'Recognise the place value of each digit in a two-digit number (tens, ones)',
        icon: '🔢',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: {
            1: {
                // Beginning: Simple two-digit numbers, focus on tens/ones distinction
                min_value: 10,
                max_value: 50,
                places: ['ones', 'tens'],
                operations: [
                    'identify_digit',           // "What digit is in the tens place in 47?"
                    'identify_place_value',     // "What is the value of the 4 in 47?"
                    'compare_place_values',     // "Which digit has greater value: 4 or 7 in 47?"
                    'compose_simple',           // "What number is 3 tens and 5 ones?"
                    'decompose_simple'          // "How many tens and ones in 47?"
                ],
                include_zero: false,            // No zeros at this level
                decomposition_format: 'simple'  // "3 tens and 5 ones"
            },
            2: {
                // Developing: Full range 10-99, introduce zeros
                min_value: 10,
                max_value: 99,
                places: ['ones', 'tens'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'digit_value',              // "In 83, what does the 8 represent?"
                    'zero_value'                // "What is the value of 0 in 30?"
                ],
                include_zero: true,
                decomposition_format: 'simple'
            },
            3: {
                // Meeting: Full range, expanded form introduction
                min_value: 10,
                max_value: 99,
                places: ['ones', 'tens'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'expanded_form',            // "47 = 40 + 7"
                    'standard_from_expanded',   // "What is 40 + 7?"
                    'zero_value',
                    'place_comparison'          // "Which number has more tens: 47 or 83?"
                ],
                include_zero: true,
                decomposition_format: 'both'    // Both simple and expanded
            },
            4: {
                // Exceeding: Challenge with multiple representations
                min_value: 10,
                max_value: 99,
                places: ['ones', 'tens'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition', // "47 = 3 tens + 17 ones"
                    'place_comparison',
                    'multiple_representations'   // Multiple choice with different forms
                ],
                include_zero: true,
                decomposition_format: 'all'
            }
        }
    },

    'N03_Y3_NPV': {
        id: 'N03_Y3_NPV',
        name: 'N03_Y3_NPV: Three-Digit Place Value',
        description: 'Recognise the place value of each digit in a three-digit number (hundreds, tens, ones)',
        icon: '🔢',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: {
            1: {
                min_value: 100,
                max_value: 300,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'compose_simple',
                    'decompose_simple'
                ],
                include_zero: false,
                decomposition_format: 'simple'
            },
            2: {
                min_value: 100,
                max_value: 600,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'zero_value'
                ],
                include_zero: true,
                decomposition_format: 'simple'
            },
            3: {
                min_value: 100,
                max_value: 999,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'expanded_form',
                    'standard_from_expanded',
                    'zero_value',
                    'place_comparison'
                ],
                include_zero: true,
                decomposition_format: 'both'
            },
            4: {
                min_value: 100,
                max_value: 999,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition',
                    'place_comparison',
                    'multiple_representations'
                ],
                include_zero: true,
                decomposition_format: 'all'
            }
        }
    },

    'N03_Y4_NPV': {
        id: 'N03_Y4_NPV',
        name: 'N03_Y4_NPV: Four-Digit Place Value & Roman Numerals to 100',
        description: 'Recognise the place value of each digit in a four-digit number; read Roman numerals to 100 (I to C)',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: {
            1: {
                min_value: 1000,
                max_value: 3000,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'compose_simple',
                    'decompose_simple',
                    'roman_to_arabic',          // NEW: Roman numerals
                    'roman_simple'              // Simple Roman numerals (I-X)
                ],
                include_zero: false,
                decomposition_format: 'simple',
                roman_min: 1,
                roman_max: 10,                  // I to X only
                roman_operations: ['roman_to_arabic', 'arabic_to_roman']
            },
            2: {
                min_value: 1000,
                max_value: 6000,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'zero_value',
                    'roman_to_arabic',
                    'arabic_to_roman'
                ],
                include_zero: true,
                decomposition_format: 'simple',
                roman_min: 1,
                roman_max: 50,                  // I to L
                roman_operations: ['roman_to_arabic', 'arabic_to_roman', 'roman_compare']
            },
            3: {
                min_value: 1000,
                max_value: 9999,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare'
                ],
                include_zero: true,
                decomposition_format: 'both',
                roman_min: 1,
                roman_max: 100,                 // I to C (full curriculum)
                roman_operations: ['roman_to_arabic', 'arabic_to_roman', 'roman_compare', 'roman_order']
            },
            4: {
                min_value: 1000,
                max_value: 9999,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'alternative_decomposition',
                    'multiple_representations',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare',
                    'roman_order',
                    'zero_concept'              // Understanding zero in place value
                ],
                include_zero: true,
                decomposition_format: 'all',
                roman_min: 1,
                roman_max: 100,
                roman_operations: ['roman_to_arabic', 'arabic_to_roman', 'roman_compare', 'roman_order', 'roman_sequence']
            }
        }
    },

    'N03_Y5_NPV': {
        id: 'N03_Y5_NPV',
        name: 'N03_Y5_NPV: Place Value to 1,000,000 & Roman Numerals to 1000',
        description: 'Determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M)',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: {
            1: {
                min_value: 10000,
                max_value: 100000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compose_simple',
                    'decompose_simple',
                    'roman_to_arabic',
                    'roman_year'                // NEW: Roman numeral years
                ],
                include_zero: true,
                decomposition_format: 'simple',
                roman_min: 1,
                roman_max: 100,
                roman_years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024]  // Common years
            },
            2: {
                min_value: 10000,
                max_value: 500000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_year'
                ],
                include_zero: true,
                decomposition_format: 'both',
                roman_min: 1,
                roman_max: 500,
                roman_years: [1066, 1215, 1588, 1666, 1815, 1914, 1945, 2000, 2020]
            },
            3: {
                min_value: 10000,
                max_value: 1000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare',
                    'roman_year'
                ],
                include_zero: true,
                decomposition_format: 'both',
                roman_min: 1,
                roman_max: 1000,                // Full M
                roman_years: [1066, 1215, 1492, 1588, 1666, 1776, 1815, 1914, 1945, 2000, 2024]
            },
            4: {
                min_value: 100000,
                max_value: 1000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'alternative_decomposition',
                    'multiple_representations',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare',
                    'roman_year',
                    'roman_complex'             // More complex Roman numerals
                ],
                include_zero: true,
                decomposition_format: 'all',
                roman_min: 1,
                roman_max: 1000,
                roman_years: [753, 1066, 1215, 1492, 1588, 1666, 1776, 1789, 1815, 1914, 1945, 1969, 2000, 2024]
            }
        }
    },

    'N03_Y6_NPV': {
        id: 'N03_Y6_NPV',
        name: 'N03_Y6_NPV: Place Value to 10,000,000',
        description: 'Determine the value of each digit in numbers up to 10,000,000',
        icon: '🔢',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: {
            1: {
                min_value: 100000,
                max_value: 1000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compose_simple',
                    'decompose_simple',
                    'place_comparison'
                ],
                include_zero: true,
                decomposition_format: 'simple'
            },
            2: {
                min_value: 1000000,
                max_value: 5000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison'
                ],
                include_zero: true,
                decomposition_format: 'both'
            },
            3: {
                min_value: 1000000,
                max_value: 10000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition',
                    'place_comparison',
                    'multiple_representations'
                ],
                include_zero: true,
                decomposition_format: 'both'
            },
            4: {
                min_value: 1000000,
                max_value: 10000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition',
                    'place_comparison',
                    'multiple_representations',
                    'complex_place_value'       // Multi-step place value questions
                ],
                include_zero: true,
                decomposition_format: 'all'
            }
        }
    },

    'N04_Y1_NPV': {
        id: 'N04_Y1_NPV',
        name: 'N04_Y1_NPV: Identify and Represent Numbers',
        description: 'Identify and represent numbers using objects and pictorial representations including the number line, and use the language of: equal to, more than, less than (fewer), most, least',
        icon: '📊',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: {
            1: {
                min_value: 0,
                max_value: 10,
                operations: ['number_line_position', 'count_objects', 'compare_language', 'identify_most_least'],
                number_line_max: 10,
                object_types: ['dots', 'stars', 'circles'],
                comparison_words: ['equal to', 'more than', 'less than', 'most', 'least']
            },
            2: {
                min_value: 0,
                max_value: 20,
                operations: ['number_line_position', 'count_objects', 'compare_language', 'identify_most_least', 'estimate_group'],
                number_line_max: 20,
                object_types: ['dots', 'stars', 'circles', 'blocks'],
                comparison_words: ['equal to', 'more than', 'less than', 'fewer', 'most', 'least']
            },
            3: {
                min_value: 0,
                max_value: 50,
                operations: ['number_line_position', 'number_line_between', 'compare_language', 'identify_most_least', 'estimate_group'],
                number_line_max: 50,
                object_types: ['dots', 'stars', 'circles', 'blocks', 'tallies'],
                comparison_words: ['equal to', 'more than', 'less than', 'fewer', 'most', 'least']
            },
            4: {
                min_value: 0,
                max_value: 100,
                operations: ['number_line_position', 'number_line_between', 'number_line_jump', 'compare_language', 'estimate_position', 'estimate_group'],
                number_line_max: 100,
                estimation_ranges: [[0, 20], [20, 50], [50, 100]],
                comparison_words: ['equal to', 'more than', 'less than', 'fewer', 'most', 'least']
            }
        }
    },

    'N04_Y2_NPV': {
        id: 'N04_Y2_NPV',
        name: 'N04_Y2_NPV: Identify, Represent and Estimate Numbers',
        description: 'Identify, represent and estimate numbers using different representations, including the number line',
        icon: '📊',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: {
            1: {
                min_value: 0,
                max_value: 50,
                operations: ['number_line_position', 'number_line_between', 'estimate_group', 'place_value_representation'],
                number_line_max: 50,
                estimation_ranges: [[0, 10], [10, 30], [30, 50]],
                place_value_max: 50
            },
            2: {
                min_value: 0,
                max_value: 100,
                operations: ['number_line_position', 'number_line_between', 'number_line_jump', 'estimate_group', 'place_value_representation', 'estimate_position'],
                number_line_max: 100,
                estimation_ranges: [[0, 25], [25, 50], [50, 75], [75, 100]],
                place_value_max: 100
            },
            3: {
                min_value: 0,
                max_value: 100,
                operations: ['number_line_position', 'number_line_between', 'number_line_jump', 'estimate_position', 'place_value_representation', 'partition_number'],
                number_line_max: 100,
                estimation_ranges: [[0, 25], [25, 50], [50, 75], [75, 100]],
                place_value_max: 100
            },
            4: {
                min_value: 0,
                max_value: 100,
                operations: ['number_line_multiple_positions', 'number_line_jump', 'estimate_position', 'place_value_representation', 'partition_number', 'estimate_calculation'],
                number_line_max: 100,
                estimation_ranges: [[0, 30], [30, 60], [60, 100]],
                place_value_max: 100
            }
        }
    },

    'N04_Y3_NPV': {
        id: 'N04_Y3_NPV',
        name: 'N04_Y3_NPV: Identify, Represent and Estimate',
        description: 'Identify, represent and estimate numbers using different representations',
        icon: '📊',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: {
            1: {
                min_value: 0,
                max_value: 200,
                operations: ['number_line_position', 'number_line_between', 'estimate_position', 'place_value_representation', 'partition_number'],
                number_line_max: 200,
                estimation_ranges: [[0, 50], [50, 100], [100, 150], [150, 200]],
                place_value_max: 200
            },
            2: {
                min_value: 0,
                max_value: 500,
                operations: ['number_line_position', 'number_line_jump', 'estimate_position', 'place_value_representation', 'partition_number', 'estimate_calculation'],
                number_line_max: 500,
                estimation_ranges: [[0, 100], [100, 300], [300, 500]],
                place_value_max: 500
            },
            3: {
                min_value: 0,
                max_value: 1000,
                operations: ['number_line_position', 'number_line_jump', 'estimate_position', 'place_value_representation', 'partition_number', 'estimate_calculation', 'estimate_midpoint'],
                number_line_max: 1000,
                estimation_ranges: [[0, 250], [250, 500], [500, 750], [750, 1000]],
                place_value_max: 1000
            },
            4: {
                min_value: 0,
                max_value: 1000,
                operations: ['number_line_multiple_positions', 'number_line_jump', 'estimate_position', 'partition_number', 'estimate_calculation', 'estimate_midpoint', 'compare_representations'],
                number_line_max: 1000,
                estimation_ranges: [[0, 200], [200, 500], [500, 800], [800, 1000]],
                place_value_max: 1000
            }
        }
    },

    'N04_Y4_NPV': {
        id: 'N04_Y4_NPV',
        name: 'N04_Y4_NPV: Represent, Estimate and Round',
        description: 'Identify, represent and estimate numbers using different representations; round any number to the nearest 10, 100 or 1,000',
        icon: '📊',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: {
            1: {
                min_value: 10,
                max_value: 1000,
                operations: ['number_line_position', 'estimate_position', 'round_to_ten', 'place_value_representation'],
                number_line_max: 1000,
                rounding_bases: [10],
                estimation_ranges: [[0, 250], [250, 500], [500, 750], [750, 1000]]
            },
            2: {
                min_value: 10,
                max_value: 5000,
                operations: ['number_line_position', 'estimate_position', 'round_to_ten', 'round_to_hundred', 'partition_number', 'estimate_calculation'],
                number_line_max: 5000,
                rounding_bases: [10, 100],
                estimation_ranges: [[0, 1000], [1000, 3000], [3000, 5000]]
            },
            3: {
                min_value: 100,
                max_value: 10000,
                operations: ['number_line_position', 'estimate_position', 'round_to_hundred', 'round_to_thousand', 'estimate_calculation', 'estimate_midpoint'],
                number_line_max: 10000,
                rounding_bases: [10, 100, 1000],
                estimation_ranges: [[0, 2500], [2500, 5000], [5000, 7500], [7500, 10000]]
            },
            4: {
                min_value: 100,
                max_value: 10000,
                operations: ['number_line_jump', 'estimate_position', 'round_to_ten', 'round_to_hundred', 'round_to_thousand', 'estimate_calculation', 'compare_rounded'],
                number_line_max: 10000,
                rounding_bases: [10, 100, 1000],
                estimation_ranges: [[0, 2000], [2000, 5000], [5000, 8000], [8000, 10000]]
            }
        }
    },

    'N04_Y5_NPV': {
        id: 'N04_Y5_NPV',
        name: 'N04_Y5_NPV: Round to 1,000,000',
        description: 'Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000',
        icon: '📊',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: {
            1: {
                min_value: 1000,
                max_value: 100000,
                operations: ['round_to_thousand', 'round_to_ten_thousand', 'estimate_position', 'number_line_position'],
                rounding_bases: [1000, 10000],
                number_line_max: 100000,
                estimation_ranges: [[0, 25000], [25000, 50000], [50000, 75000], [75000, 100000]]
            },
            2: {
                min_value: 10000,
                max_value: 500000,
                operations: ['round_to_ten_thousand', 'round_to_hundred_thousand', 'estimate_position', 'estimate_calculation', 'number_line_jump'],
                rounding_bases: [10000, 100000],
                number_line_max: 500000,
                estimation_ranges: [[0, 100000], [100000, 300000], [300000, 500000]]
            },
            3: {
                min_value: 10000,
                max_value: 1000000,
                operations: ['round_to_thousand', 'round_to_ten_thousand', 'round_to_hundred_thousand', 'estimate_position', 'estimate_calculation', 'compare_rounded'],
                rounding_bases: [1000, 10000, 100000],
                number_line_max: 1000000,
                estimation_ranges: [[0, 250000], [250000, 500000], [500000, 750000], [750000, 1000000]]
            },
            4: {
                min_value: 100000,
                max_value: 1000000,
                operations: ['round_to_ten_thousand', 'round_to_hundred_thousand', 'estimate_calculation', 'compare_rounded', 'choose_appropriate_rounding'],
                rounding_bases: [10000, 100000],
                number_line_max: 1000000,
                estimation_ranges: [[0, 200000], [200000, 500000], [500000, 800000], [800000, 1000000]]
            }
        }
    },

    'N04_Y6_NPV': {
        id: 'N04_Y6_NPV',
        name: 'N04_Y6_NPV: Round to Any Degree of Accuracy',
        description: 'Round any whole number to a required degree of accuracy',
        icon: '📊',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: {
            1: {
                min_value: 1000,
                max_value: 1000000,
                operations: ['round_to_thousand', 'round_to_ten_thousand', 'round_to_hundred_thousand', 'estimate_position'],
                rounding_bases: [1000, 10000, 100000],
                number_line_max: 1000000,
                estimation_ranges: [[0, 250000], [250000, 500000], [500000, 750000], [750000, 1000000]]
            },
            2: {
                min_value: 10000,
                max_value: 5000000,
                operations: ['round_to_ten_thousand', 'round_to_hundred_thousand', 'round_to_million', 'estimate_calculation', 'compare_rounded'],
                rounding_bases: [10000, 100000, 1000000],
                number_line_max: 5000000,
                estimation_ranges: [[0, 1000000], [1000000, 3000000], [3000000, 5000000]]
            },
            3: {
                min_value: 100000,
                max_value: 10000000,
                operations: ['round_to_hundred_thousand', 'round_to_million', 'round_to_ten_million', 'estimate_calculation', 'compare_rounded', 'choose_appropriate_rounding'],
                rounding_bases: [100000, 1000000, 10000000],
                number_line_max: 10000000,
                estimation_ranges: [[0, 2500000], [2500000, 5000000], [5000000, 7500000], [7500000, 10000000]]
            },
            4: {
                min_value: 1000000,
                max_value: 10000000,
                operations: ['round_to_any_place', 'estimate_calculation', 'compare_rounded', 'choose_appropriate_rounding', 'error_bounds'],
                rounding_bases: [10, 100, 1000, 10000, 100000, 1000000, 10000000],
                number_line_max: 10000000,
                estimation_ranges: [[0, 2000000], [2000000, 5000000], [5000000, 8000000], [8000000, 10000000]]
            }
        }
    }
};

/**
 * Get a module by ID
 * @param {string} moduleId - The module identifier
 * @returns {Object|null} Module object or null if not found
 */
export function getModule(moduleId) {
    return MODULES[moduleId] || null;
}

/**
 * Get parameters for a specific module and level
 * @param {string} moduleId - The module identifier
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object|null} Parameters object for the specified level, or null if not found
 */
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return null;

    return module.parameters[level] || null;
}

/**
 * Get all available module IDs
 * @returns {string[]} Array of module IDs
 */
export function getModuleIds() {
    return Object.keys(MODULES);
}

/**
 * Validate level number
 * @param {number} level - Level to validate
 * @returns {boolean} True if valid
 */
export function isValidLevel(level) {
    return [1, 2, 3, 4].includes(level);
}