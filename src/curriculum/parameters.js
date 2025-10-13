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
                step_sizes: [1, 2, 5, 10],
                min_value: 0,
                max_value: 30,
                directions: ['forwards'],
                start_from: 'zero_only',          // 'zero_only', 'zero_or_multiple', 'any'
                sequence_length: 5,
                gaps_count: 1,
                gap_position: 'end'                // 'start', 'end', 'middle', 'random'
            },
            2: {
                step_sizes: [1, 2, 5, 10],
                min_value: 0,
                max_value: 50,
                directions: ['forwards', 'backwards'],
                start_from: 'zero_or_multiple',
                sequence_length: 8,
                gaps_count: 1,
                gap_position: 'middle'
            },
            3: {
                step_sizes: [1, 2, 5, 10],
                min_value: 0,
                max_value: 100,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 10,
                gaps_count: 2,
                gap_position: 'random'
            },
            4: {
                step_sizes: [1, 2, 3, 5, 10],
                min_value: 0,
                max_value: 200,
                directions: ['forwards', 'backwards'],
                start_from: 'any',
                sequence_length: 12,
                gaps_count: 3,
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
