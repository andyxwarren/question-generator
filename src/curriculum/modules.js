/**
 * Curriculum Module Definitions
 *
 * Defines all curriculum modules with parameters for 4 difficulty levels:
 * Level 1: Beginning
 * Level 2: Developing
 * Level 3: Meeting
 * Level 4: Exceeding
 */

export const MODULES = {
    'counting': {
        id: 'counting',
        name: 'Counting',
        description: 'Number sequences and patterns',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        parameters: {
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
                2: 8,
                3: 12,
                4: 15
            },
            directions: {
                1: ['forwards'],
                2: ['forwards', 'backwards'],
                3: ['forwards', 'backwards'],
                4: ['forwards', 'backwards']
            }
        }
    },

    'bonds': {
        id: 'bonds',
        name: 'Number Bonds',
        description: 'Addition and subtraction facts',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Calculations',
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
            }
        }
    },

    'multiply': {
        id: 'multiply',
        name: 'Multiplication',
        description: 'Times tables practice',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Calculations',
        parameters: {
            times_tables: {
                1: [2, 5, 10],
                2: [2, 3, 4, 5, 10],
                3: [3, 4, 8],
                4: [6, 7, 8, 9]
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
            }
        }
    },

    'fractions': {
        id: 'fractions',
        name: 'Fractions',
        description: 'Equivalent fractions',
        icon: '🍰',
        yearGroup: 'Year 4',
        strand: 'Fractions & Decimals',
        parameters: {
            denominators: {
                1: [2, 4],
                2: [2, 3, 4, 5],
                3: [2, 3, 4, 5, 6, 8],
                4: [2, 3, 4, 5, 6, 7, 8, 9]
            },
            max_numerator: {
                1: 3,
                2: 5,
                3: 8,
                4: 10
            },
            include_simplification: {
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
