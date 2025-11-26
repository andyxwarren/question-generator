/**
 * N02 Module Series: Read, Write, Order and Compare Numbers
 * Covers Years 1-6 progression
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N02_Y1_NPV: {
        1: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral'],
            math: {
                range: { min: 0, max: 10 },
                words: { min: 0, max: 10 },
                order: { countMax: 2 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        2: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two'],
            math: {
                range: { min: 0, max: 20 },
                words: { min: 0, max: 20 },
                order: { countMax: 2 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        3: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'order_two'],
            math: {
                range: { min: 0, max: 50 },
                words: { min: 0, max: 20 },
                order: { countMax: 2 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        4: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'order_two', 'order_three'],
            math: {
                range: { min: 0, max: 100 },
                words: { min: 0, max: 20 },
                order: { countMax: 3 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        }
    },

    N02_Y2_NPV: {
        1: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
            math: {
                range: { min: 0, max: 50 },
                words: { min: 0, max: 20 },
                order: { countMax: 3 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        2: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three', 'order_four', 'complete_statement', 'true_false'],
            math: {
                range: { min: 0, max: 100 },
                words: { min: 0, max: 50 },
                order: { countMax: 4 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        3: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'between'],
            math: {
                range: { min: 0, max: 100 },
                words: { min: 0, max: 100 },
                order: { countMax: 4 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        4: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'between'],
            math: {
                range: { min: 0, max: 120 },
                words: { min: 0, max: 100 },
                order: { countMax: 5 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        }
    },

    N02_Y3_NPV: {
        1: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'ten_more', 'ten_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
            math: {
                range: { min: 0, max: 200 },
                words: { min: 0, max: 20 },
                order: { countMax: 3 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        2: {
            operations: ['identify_numeral', 'one_more', 'one_less', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],
            math: {
                range: { min: 0, max: 500 },
                words: { min: 0, max: 50 },
                order: { countMax: 4 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        3: {
            operations: ['identify_numeral', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],
            math: {
                range: { min: 0, max: 1000 },
                words: { min: 0, max: 100 },
                order: { countMax: 5 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        4: {
            operations: ['ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],
            math: {
                range: { min: 0, max: 1000 },
                words: { min: 0, max: 100 },
                order: { countMax: 6 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        }
    },

    N02_Y4_NPV: {
        1: {
            operations: ['identify_numeral', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
            math: {
                range: { min: 100, max: 2000 },
                words: { min: 0, max: 20 },
                order: { countMax: 3 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        2: {
            operations: ['ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],
            math: {
                range: { min: 100, max: 10000 },
                words: { min: 0, max: 50 },
                order: { countMax: 5 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        3: {
            operations: ['hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],
            math: {
                range: { min: 100, max: 50000 },
                words: { min: 0, max: 100 },
                order: { countMax: 6 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        4: {
            operations: ['thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],
            math: {
                range: { min: 1000, max: 200000 },
                words: { min: 0, max: 100 },
                order: { countMax: 8 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        }
    },

    N02_Y5_NPV: {
        1: {
            operations: ['identify_numeral', 'thousand_more', 'thousand_less', 'ten_thousand_more', 'ten_thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
            math: {
                range: { min: 1000, max: 100000 },
                words: { min: 0, max: 20 },
                order: { countMax: 3 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        2: {
            operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],
            math: {
                range: { min: 10000, max: 500000 },
                words: { min: 0, max: 50 },
                order: { countMax: 5 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        3: {
            operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],
            math: {
                range: { min: 10000, max: 1000000 },
                words: { min: 0, max: 100 },
                order: { countMax: 6 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        4: {
            operations: ['hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],
            math: {
                range: { min: 100000, max: 5000000 },
                words: { min: 0, max: 100 },
                order: { countMax: 8 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        }
    },

    N02_Y6_NPV: {
        1: {
            operations: ['identify_numeral', 'hundred_thousand_more', 'hundred_thousand_less', 'million_more', 'million_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
            math: {
                range: { min: 10000, max: 1000000 },
                words: { min: 0, max: 20 },
                order: { countMax: 3 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        2: {
            operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],
            math: {
                range: { min: 100000, max: 5000000 },
                words: { min: 0, max: 50 },
                order: { countMax: 5 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        3: {
            operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],
            math: {
                range: { min: 1000000, max: 10000000 },
                words: { min: 0, max: 100 },
                order: { countMax: 6 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        },
        4: {
            operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],
            math: {
                range: { min: 1000000, max: 10000000 },
                words: { min: 0, max: 100 },
                order: { countMax: 8 }
            },
            presentation: {
                styles: ['multiple_choice', 'text_input']
            }
        }
    }
};

export const N02_MODULES = {
    'N02_Y1_NPV': {
        id: 'N02_Y1_NPV',
        name: 'N02_Y1_NPV: Read and Write Numbers to 100',
        description: 'Count, read and write numbers to 100 in numerals; given a number, identify one more and one less; read and write numbers from 1 to 20 in numerals and words',
        icon: '🔤',
        yearGroup: '1',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: MIGRATED_PARAMS['N02_Y1_NPV']
    },
    'N02_Y2_NPV': {
        id: 'N02_Y2_NPV',
        name: 'N02_Y2_NPV: Read and Write Numbers',
        description: 'Read and write numbers to at least 100 in numerals and in words; compare and order numbers from 0 up to 100; use <, > and = signs',
        icon: '🔤',
        yearGroup: '2',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: MIGRATED_PARAMS['N02_Y2_NPV']
    },
    'N02_Y3_NPV': {
        id: 'N02_Y3_NPV',
        name: 'N02_Y3_NPV: Numbers to 1000',
        description: 'Compare and order numbers up to 1,000; read and write numbers to 1,000 in numerals and in words; find 10 or 100 more or less than a given number',
        icon: '🔤',
        yearGroup: '3',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: MIGRATED_PARAMS['N02_Y3_NPV']
    },
    'N02_Y4_NPV': {
        id: 'N02_Y4_NPV',
        name: 'N02_Y4_NPV: Order and Compare Beyond 1000',
        description: 'Order and compare numbers beyond 1,000; find 1,000 more or less than a given number',
        icon: '🔤',
        yearGroup: '4',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: MIGRATED_PARAMS['N02_Y4_NPV']
    },
    'N02_Y5_NPV': {
        id: 'N02_Y5_NPV',
        name: 'N02_Y5_NPV: Numbers to 1 Million',
        description: 'Read, write, order and compare numbers to at least 1,000,000',
        icon: '🔤',
        yearGroup: '5',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: MIGRATED_PARAMS['N02_Y5_NPV']
    },
    'N02_Y6_NPV': {
        id: 'N02_Y6_NPV',
        name: 'N02_Y6_NPV: Numbers to 10 Million',
        description: 'Read, write, order and compare numbers up to 10,000,000',
        icon: '🔤',
        yearGroup: '6',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: MIGRATED_PARAMS['N02_Y6_NPV']
    }
};
