/**
 * Curriculum Module Definitions
 *
 * Defines all curriculum modules with parameters for 4 difficulty levels:
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
        name: 'Counting',
        description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: {
            min_value: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
            },
            max_value: {
                1: 30,
                2: 50,
                3: 100,
                4: 200
            },
            step_sizes: {
                1: [1, 2, 5, 10],
                2: [1, 2, 5, 10],
                3: [1, 2, 5, 10],
                4: [1, 2, 3, 5, 10]
            },
            sequence_length: {
                1: 5,
                2: 10,
                3: 15,
                4: 20
            },
            directions: {
                1: ['forwards'],
                2: ['forwards', 'backwards'],
                3: ['forwards', 'backwards'],
                4: ['forwards', 'backwards']
            },
            missing_numbers: {
                1: 0,
                2: 1,
                3: 2,
                4: 3
            }
        }
    },

    'C01_Y1_CALC': {
        id: 'C01_Y1_CALC',
        name: 'Number Bonds',
        description: 'Represent and use number bonds and related subtraction facts within 20',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Calculations',
        substrand: 'Add/subtract mentally',
        ref: 'C1',
        parameters: {
            total_value: {
                1: [5, 10],
                2: [10],
                3: [10, 20],
                4: [20]
            },
            missing_part: {
                1: 'second',  // Only second addend missing
                2: 'either',  // Either addend can be missing
                3: 'either',
                4: 'any'      // Total or any part can be missing
            },
            include_subtraction: {
                1: false,
                2: true,
                3: true,
                4: true
            },
            visual_support: {
                1: 'always',
                2: 'often',
                3: 'sometimes',
                4: 'rarely'
            },
            time_limit: {
                1: 15,
                2: 10,
                3: 5,
                4: 3
            },
            questions_per_session: {
                1: 5,
                2: 8,
                3: 10,
                4: 15
            }
        }
    },

    'N03_Y2_NPV': {
        id: 'N03_Y2_NPV',
        name: 'Place Value',
        description: 'Recognise the place value of each digit in a two-digit number (tens, ones)',
        icon: '🔟',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Place value',
        ref: 'N3',
        parameters: {
            min_number: {
                1: 10,
                2: 10,
                3: 10,
                4: 10
            },
            max_number: {
                1: 50,
                2: 75,
                3: 99,
                4: 999
            },
            include_zero_placeholder: {
                1: false,
                2: true,
                3: true,
                4: true
            }
        }
    },

    'C06_Y3_CALC': {
        id: 'C06_Y3_CALC',
        name: 'Multiplication',
        description: 'Recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Calculations',
        substrand: 'Recall multiplication facts',
        ref: 'C2',
        parameters: {
            times_tables: {
                1: [2, 5, 10],
                2: [2, 3, 4, 5, 10],
                3: [3, 4, 8],
                4: [3, 4, 6, 7, 8, 9]
            },
            max_multiplier: {
                1: 5,
                2: 10,
                3: 12,
                4: 12
            },
            include_division: {
                1: false,
                2: true,
                3: true,
                4: true
            },
            time_limit_seconds: {
                1: 8,
                2: 5,
                3: 3,
                4: 2
            },
            accuracy_target: {
                1: 0.70,
                2: 0.80,
                3: 0.90,
                4: 0.95
            }
        }
    },

    'F02_Y4_FRAC': {
        id: 'F02_Y4_FRAC',
        name: 'Fractions',
        description: 'Recognise and show, using diagrams, families of common equivalent fractions',
        icon: '🍰',
        yearGroup: 'Year 4',
        strand: 'Fractions, Decimals and Percentages',
        substrand: 'Equivalent fractions',
        ref: 'F1',
        parameters: {
            denominators: {
                1: [2, 4, 10],
                2: [2, 3, 4, 5, 10],
                3: [2, 3, 4, 5, 6, 8, 10, 12],
                4: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
            },
            max_numerator: {
                1: 3,
                2: 5,
                3: 8,
                4: 10
            },
            equivalences_to_find: {
                1: 2,
                2: 3,
                3: 4,
                4: 5
            },
            simplification_required: {
                1: false,
                2: false,
                3: true,
                4: true
            },
            visual_support: {
                1: 'always',
                2: 'often',
                3: 'sometimes',
                4: 'rarely'
            }
        }
    },

    'F08_Y5_FRAC': {
        id: 'F08_Y5_FRAC',
        name: 'Decimals',
        description: 'Read, write, order and compare numbers with up to three decimal places',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Fractions, Decimals and Percentages',
        substrand: 'Decimal place value',
        ref: 'F2',
        parameters: {
            decimal_places: {
                1: 1,
                2: 2,
                3: 3,
                4: 3
            },
            integer_range: {
                1: [0, 10],
                2: [0, 100],
                3: [0, 1000],
                4: [0, 10000]
            },
            number_count: {
                1: 2,
                2: 3,
                3: 4,
                4: 5
            },
            include_trailing_zeros: {
                1: false,
                2: true,
                3: true,
                4: true
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
 * @returns {Object} Parameters object for the specified level
 */
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return {};

    const params = {};
    for (const [key, values] of Object.entries(module.parameters)) {
        params[key] = values[level];
    }
    return params;
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
