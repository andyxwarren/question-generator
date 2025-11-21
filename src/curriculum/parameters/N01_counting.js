/**
 * N01 Module Series: Counting in Multiples
 * Covers Years 1-5 progression for counting in multiples
 */

export const N01_MODULES = {
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
                step_sizes: [1, 2],
                min_value: 0,
                max_value: 20,
                directions: ['forwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 4,
                gap_position: 'end'
            },
            2: {
                step_sizes: [1, 2, 5],
                min_value: 0,
                max_value: 50,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 4,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [1, 2, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
                gap_position: 'middle'
            },
            4: {
                step_sizes: [2, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
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
                step_sizes: [2, 3, 5],
                min_value: 0,
                max_value: 30,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 4,
                gap_position: 'end'
            },
            2: {
                step_sizes: [2, 3, 5, 10],
                min_value: 0,
                max_value: 50,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 4,
                gap_position: 'middle',
                tens_from_any: true,
                tens_range: [0, 50]
            },
            3: {
                step_sizes: [2, 3, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
                gap_position: 'middle',
                tens_from_any: true,
                tens_range: [0, 100]
            },
            4: {
                step_sizes: [2, 3, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
                gap_position: 'random',
                tens_from_any: true,
                tens_range: [0, 100]
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
                step_sizes: [4, 8, 50],
                min_value: 0,
                max_value: 100,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 4,
                gap_position: 'end'
            },
            2: {
                step_sizes: [4, 8, 50, 100],
                min_value: 0,
                max_value: 400,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 4,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [4, 8, 50, 100],
                min_value: 0,
                max_value: 600,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 3,
                gap_position: 'middle'
            },
            4: {
                step_sizes: [4, 8, 50, 100],
                min_value: 0,
                max_value: 800,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 3,
                gap_position: 'random'
            }
        }
    },

    'N01_Y4_NPV': {
        id: 'N01_Y4_NPV',
        name: 'N01_Y4_NPV: Count in Multiples',
        description: 'Count in multiples of 6, 7, 9, 25 and 1,000',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                step_sizes: [6, 7, 9],
                min_value: 0,
                max_value: 100,
                directions: ['forwards'],
                start_from: 'zero_only',
                sequence_length: 4,
                gap_position: 'end'
            },
            2: {
                step_sizes: [6, 7, 9, 25],
                min_value: 0,
                max_value: 300,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 4,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [6, 7, 9, 25, 1000],
                min_value: 0,
                max_value: 5000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
                gap_position: 'middle'
            },
            4: {
                step_sizes: [6, 7, 9, 25, 1000],
                min_value: 0,
                max_value: 10000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
                gap_position: 'random'
            }
        }
    },

    'N01_Y5_NPV': {
        id: 'N01_Y5_NPV',
        name: 'N01_Y5_NPV: Counting in Powers of 10',
        description: 'count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            1: {
                powers_of_10: [10, 100],
                min_value: 0,
                max_value: 10000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 4,
                gap_position: 'end'
            },
            2: {
                powers_of_10: [10, 100, 1000],
                min_value: 0,
                max_value: 50000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 4,
                gap_position: 'middle'
            },
            3: {
                powers_of_10: [10, 100, 1000, 10000],
                min_value: 0,
                max_value: 500000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
                gap_position: 'middle'
            },
            4: {
                powers_of_10: [10, 100, 1000, 10000, 100000],
                min_value: 0,
                max_value: 1000000,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 3,
                gap_position: 'random'
            }
        }
    }
};
