/**
 * N02 Module Series: Read, Write, Order and Compare Numbers
 * Covers Years 2-6 progression
 */

export const N02_MODULES = {
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
                operations: ['identify_numeral', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],  // Removed rounding
                order_count_max: 3
            },
            2: {
                min_value: 100,
                max_value: 10000,
                word_min: 0,
                word_max: 50,
                operations: ['ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],  // Removed rounding
                order_count_max: 5
            },
            3: {
                min_value: 100,
                max_value: 50000,                        // Reduced from 100,000
                word_min: 0,
                word_max: 100,
                operations: ['hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],  // Removed rounding
                order_count_max: 6                       // Reduced from 10
            },
            4: {
                min_value: 1000,
                max_value: 200000,                       // Reduced from 1,000,000
                word_min: 0,
                word_max: 100,
                operations: ['thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],  // Removed rounding
                order_count_max: 8                       // Reduced from 15
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
                operations: ['identify_numeral', 'thousand_more', 'thousand_less', 'ten_thousand_more', 'ten_thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],  // Removed rounding
                order_count_max: 3
            },
            2: {
                min_value: 10000,
                max_value: 500000,
                word_min: 0,
                word_max: 50,
                operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],  // Removed rounding
                order_count_max: 5
            },
            3: {
                min_value: 10000,
                max_value: 1000000,
                word_min: 0,
                word_max: 100,
                operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit'],  // Removed rounding
                order_count_max: 6                       // Reduced from 10
            },
            4: {
                min_value: 100000,
                max_value: 5000000,                      // Reduced from 10,000,000
                word_min: 0,
                word_max: 100,
                operations: ['hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit', 'complex_more_less'],  // Removed rounding
                order_count_max: 8                       // Reduced from 15
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
                operations: ['identify_numeral', 'hundred_thousand_more', 'hundred_thousand_less', 'million_more', 'million_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],  // Removed rounding
                order_count_max: 3
            },
            2: {
                min_value: 100000,
                max_value: 5000000,
                word_min: 0,
                word_max: 50,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],  // Removed rounding
                order_count_max: 5
            },
            3: {
                min_value: 1000000,
                max_value: 10000000,
                word_min: 0,
                word_max: 100,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit'],  // Removed rounding
                order_count_max: 6                       // Reduced from 10
            },
            4: {
                min_value: 1000000,
                max_value: 10000000,
                word_min: 0,
                word_max: 100,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'place_value_digit', 'complex_more_less'],  // Removed rounding
                order_count_max: 8                       // Reduced from 20
            }
        }
    }
};
