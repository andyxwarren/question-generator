/**
 * N05 Module Series: Negative Numbers
 * Covers Years 4-6 progression for working with negative numbers
 */

export const N05_MODULES = {
    'N05_Y4_NPV': {
        id: 'N05_Y4_NPV',
        name: 'N05_Y4_NPV: Counting Through Zero',
        description: 'Count backwards through zero to include negative numbers',
        icon: '➖',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: {
            1: {
                step_sizes: [1, 2],
                min_value: -10,
                max_value: 10,
                directions: ['backwards'],
                start_from: 'positive_only',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end',
                must_cross_zero: true
            },
            2: {
                step_sizes: [1, 2, 5],
                min_value: -20,
                max_value: 20,
                directions: ['backwards'],
                start_from: 'positive_only',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle',
                must_cross_zero: true
            },
            3: {
                step_sizes: [1, 2, 5, 10],
                min_value: -50,
                max_value: 50,
                directions: ['backwards'],
                start_from: 'positive_only',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random',
                must_cross_zero: true
            },
            4: {
                step_sizes: [1, 2, 5, 10],
                min_value: -100,
                max_value: 100,
                directions: ['backwards'],
                start_from: 'positive_only',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random',
                must_cross_zero: true
            }
        }
    },

    'N05_Y5_NPV': {
        id: 'N05_Y5_NPV',
        name: 'N05_Y5_NPV: Negative Numbers in Context',
        description: 'Interpret negative numbers in context, count forwards and backwards with positive and negative whole numbers, including through zero',
        icon: '🌡️',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: {
            1: {
                step_sizes: [1, 2, 5],
                min_value: -20,
                max_value: 20,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 6,
                gaps_count: 1,
                gap_position: 'end',
                must_cross_zero: false,
                context_types: ['temperature', 'sequence'],
                temperature_range: [-10, 15]
            },
            2: {
                step_sizes: [1, 2, 5, 10],
                min_value: -50,
                max_value: 50,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 8,
                gaps_count: 2,
                gap_position: 'middle',
                must_cross_zero: false,
                context_types: ['temperature', 'elevation', 'sequence'],
                temperature_range: [-20, 30],
                elevation_range: [-50, 100]
            },
            3: {
                step_sizes: [1, 2, 5, 10, 25],
                min_value: -100,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random',
                must_cross_zero: false,
                context_types: ['temperature', 'elevation', 'sequence'],
                temperature_range: [-30, 40],
                elevation_range: [-100, 200]
            },
            4: {
                step_sizes: [1, 2, 5, 10, 25, 50],
                min_value: -200,
                max_value: 200,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
                gap_position: 'random',
                must_cross_zero: false,
                context_types: ['temperature', 'elevation', 'sequence'],
                temperature_range: [-40, 50],
                elevation_range: [-200, 500]
            }
        }
    },

    'N05_Y6_NPV': {
        id: 'N05_Y6_NPV',
        name: 'N05_Y6_NPV: Intervals Across Zero',
        description: 'Use negative numbers in context, and calculate intervals across zero',
        icon: '📏',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: {
            1: {
                min_value: -20,
                max_value: 20,
                interval_types: ['simple'],
                context_types: ['temperature', 'number_line'],
                temperature_range: [-15, 20],
                must_cross_zero: true
            },
            2: {
                min_value: -50,
                max_value: 50,
                interval_types: ['simple', 'multi_step'],
                context_types: ['temperature', 'elevation', 'number_line'],
                temperature_range: [-25, 35],
                elevation_range: [-50, 100],
                must_cross_zero: false
            },
            3: {
                min_value: -100,
                max_value: 100,
                interval_types: ['simple', 'multi_step', 'word_problem'],
                context_types: ['temperature', 'elevation', 'number_line', 'time'],
                temperature_range: [-40, 45],
                elevation_range: [-150, 300],
                must_cross_zero: false
            },
            4: {
                min_value: -500,
                max_value: 500,
                interval_types: ['simple', 'multi_step', 'word_problem'],
                context_types: ['temperature', 'elevation', 'number_line', 'time'],
                temperature_range: [-50, 55],
                elevation_range: [-500, 1000],
                must_cross_zero: false
            }
        }
    }
};
