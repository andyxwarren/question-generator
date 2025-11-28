/**
 * N01: Counting (in multiples)
 *
 * V2 Nested Schema: All parameters use math/presentation separation
 */

const N01_Y1_NPV_PARAMS = {
    1: {
        description: "Beginning - Count forwards only from 0, in steps of 2, 5, or 10, up to 30. Shortest sequences (3 numbers) with gap at end for predictability.",
        math: {
            range: { min: 0, max: 30 },
            sequence: {
                steps: [2, 5, 10],
                length: 3,
                directions: ['forwards'],
                startStrategy: 'zero_only'
            }
        },
        presentation: {
            gaps: { position: 'end', count: 1 },
            visualType: 'sequence'
        }
    },
    2: {
        description: "Developing - Count forwards from 0 or 1, in steps of 2, 5, or 10, up to 50. Longer sequences (4 numbers) with gap at end or middle.",
        math: {
            range: { min: 0, max: 50 },
            sequence: {
                steps: [2, 5, 10],
                length: 4,
                directions: ['forwards'],
                startStrategy: 'zero_or_one'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    3: {
        description: "Meeting - Full curriculum: count forwards and backwards from any given number in multiples of 2, 5, 10, up to and across 100. Standard length sequences (5 numbers).",
        math: {
            range: { min: 0, max: 100 },
            sequence: {
                steps: [2, 5, 10],
                length: 5,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    4: {
        description: "Exceeding - Extended range to 120, longer sequences (6 numbers), backwards counting, random gap positions for minimal scaffolding.",
        math: {
            range: { min: 0, max: 120 },
            sequence: {
                steps: [2, 5, 10],
                length: 6,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'random', count: 1 },
            visualType: 'sequence'
        }
    }
};

const N01_Y2_NPV_PARAMS = {
    1: {
        description: "Beginning - Count forwards only from 0, in steps of 2, 3, 5, or 10, up to 40. Short sequences (3 numbers) with gap at end for predictability.",
        math: {
            range: { min: 0, max: 40 },
            sequence: {
                steps: [2, 3, 5, 10],
                length: 3,
                directions: ['forwards'],
                startStrategy: 'zero_only'
            }
        },
        presentation: {
            gaps: { position: 'end', count: 1 },
            visualType: 'sequence'
        }
    },
    2: {
        description: "Developing - Count forwards from 0 (for 2,3,5) or any number (for 10s), up to 60. Longer sequences (4 numbers) with gap at middle.",
        math: {
            range: { min: 0, max: 60 },
            sequence: {
                steps: [2, 3, 5, 10],
                length: 4,
                directions: ['forwards'],
                startStrategy: 'zero_or_tens'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    3: {
        description: "Meeting - Full curriculum: count forwards and backwards in steps of 2, 3, 5 from 0, and in tens from any number, up to 100. Standard sequences (5 numbers).",
        math: {
            range: { min: 0, max: 100 },
            sequence: {
                steps: [2, 3, 5, 10],
                length: 5,
                directions: ['forwards', 'backwards'],
                startStrategy: 'zero_or_any_tens'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    4: {
        description: "Exceeding - Extended range to 120, longer sequences (6 numbers), backwards counting, random gap positions, tens from any number.",
        math: {
            range: { min: 0, max: 120 },
            sequence: {
                steps: [2, 3, 5, 10],
                length: 6,
                directions: ['forwards', 'backwards'],
                startStrategy: 'zero_or_any_tens'
            }
        },
        presentation: {
            gaps: { position: 'random', count: 1 },
            visualType: 'sequence'
        }
    }
};

const N01_Y3_NPV_PARAMS = {
    1: {
        description: "Beginning - Count forwards only from 0, in steps of 4, 8, 50, or 100, up to 400. Short sequences (4 numbers) with gap at end for predictability.",
        math: {
            range: { min: 0, max: 400 },
            sequence: {
                steps: [4, 8, 50, 100],
                length: 4,
                directions: ['forwards'],
                startStrategy: 'zero_only'
            }
        },
        presentation: {
            gaps: { position: 'end', count: 1 },
            visualType: 'sequence'
        }
    },
    2: {
        description: "Developing - Count forwards from 0 or a multiple, in steps of 4, 8, 50, or 100, up to 600. Medium sequences (5 numbers) with gap at end or middle.",
        math: {
            range: { min: 0, max: 600 },
            sequence: {
                steps: [4, 8, 50, 100],
                length: 5,
                directions: ['forwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    3: {
        description: "Meeting - Full curriculum: count forwards and backwards from 0 or any multiple of 4, 8, 50, or 100, up to 1000. Standard sequences (5 numbers).",
        math: {
            range: { min: 0, max: 1000 },
            sequence: {
                steps: [4, 8, 50, 100],
                length: 5,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    4: {
        description: "Exceeding - Extended range to 1200, longer sequences (6 numbers), backwards counting, random gap positions for minimal scaffolding.",
        math: {
            range: { min: 0, max: 1200 },
            sequence: {
                steps: [4, 8, 50, 100],
                length: 6,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'random', count: 1 },
            visualType: 'sequence'
        }
    }
};

const N01_Y4_NPV_PARAMS = {
    1: {
        description: "Beginning - Count forwards only from 0, in steps of 6, 7, 9, 25, or 1000. Use appropriate ranges for each step size. Shorter sequences (4 numbers) with gap at end for predictability.",
        math: {
            range: { min: 0, max: 100 },
            sequence: {
                steps: [6, 7, 9, 25, 1000],
                length: 4,
                directions: ['forwards'],
                startStrategy: 'zero_only'
            }
        },
        presentation: {
            gaps: { position: 'end', count: 1 },
            visualType: 'sequence'
        }
    },
    2: {
        description: "Developing - Count forwards from any multiple, in steps of 6, 7, 9, 25, or 1000, up to 200 for small steps. Standard sequences (5 numbers) with gap in middle.",
        math: {
            range: { min: 0, max: 200 },
            sequence: {
                steps: [6, 7, 9, 25, 1000],
                length: 5,
                directions: ['forwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    3: {
        description: "Meeting - Full curriculum: count forwards and backwards from any given number in multiples of 6, 7, 9, 25, and 1000. Use appropriate ranges for step size.",
        math: {
            range: { min: 0, max: 300 },
            sequence: {
                steps: [6, 7, 9, 25, 1000],
                length: 5,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'middle', count: 1 },
            visualType: 'sequence'
        }
    },
    4: {
        description: "Exceeding - Extended range to 500 for small steps, longer sequences (6 numbers), backwards counting, random gap positions for minimal scaffolding.",
        math: {
            range: { min: 0, max: 500 },
            sequence: {
                steps: [6, 7, 9, 25, 1000],
                length: 6,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any_multiple'
            }
        },
        presentation: {
            gaps: { position: 'random', count: 1 },
            visualType: 'sequence'
        }
    }
};

const N01_Y5_NPV_PARAMS = {
    1: {
        description: "Beginning - Count forwards in steps of 10, 100, 1000 up to 10,000. Shorter sequences (4 numbers) with gap at end for predictability.",
        math: {
            range: { min: 0, max: 10000 },
            sequence: {
                steps: [10, 100, 1000],
                length: 4,
                directions: ['forwards'],
                startStrategy: 'any'
            }
        },
        presentation: {
            gaps: { position: 'end', count: 1 },
            visualType: 'sequence'
        }
    },
    2: {
        description: "Developing - Count forwards and backwards in steps of 10, 100, 1000, 10000 up to 100,000. Standard sequences (5 numbers) with random gap position.",
        math: {
            range: { min: 0, max: 100000 },
            sequence: {
                steps: [10, 100, 1000, 10000],
                length: 5,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any'
            }
        },
        presentation: {
            gaps: { position: 'random', count: 1 },
            visualType: 'sequence'
        }
    },
    3: {
        description: "Meeting - Full curriculum: count forwards and backwards in steps of powers of 10 (1, 10, 100, 1000, 10000, 100000) up to 1,000,000. Standard sequences (5 numbers).",
        math: {
            range: { min: 0, max: 1000000 },
            sequence: {
                steps: [1, 10, 100, 1000, 10000, 100000],
                length: 5,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any'
            }
        },
        presentation: {
            gaps: { position: 'random', count: 1 },
            visualType: 'sequence'
        }
    },
    4: {
        description: "Exceeding - Extended sequences (6 numbers) with multiple gaps (2 missing) in all powers of 10 up to 1,000,000.",
        math: {
            range: { min: 0, max: 1000000 },
            sequence: {
                steps: [1, 10, 100, 1000, 10000, 100000],
                length: 6,
                directions: ['forwards', 'backwards'],
                startStrategy: 'any'
            }
        },
        presentation: {
            gaps: { position: 'random', count: 2 },
            visualType: 'sequence'
        }
    }
};

/**
 * N01 Module Definitions
 */
export const N01_MODULES = {
    'N01_Y1_NPV': {
        id: 'N01_Y1_NPV',
        name: 'N01_Y1_NPV: Counting to 100',
        description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
        icon: '🔢',
        yearGroup: '1',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: N01_Y1_NPV_PARAMS
    },
    'N01_Y2_NPV': {
        id: 'N01_Y2_NPV',
        name: 'N01_Y2_NPV: Counting in Multiples',
        description: 'Count in steps of 2, 3, and 5 from 0, and in tens from any number, forward or backward',
        icon: '🔢',
        yearGroup: '2',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: N01_Y2_NPV_PARAMS
    },
    'N01_Y3_NPV': {
        id: 'N01_Y3_NPV',
        name: 'N01_Y3_NPV: Counting in multiples',
        description: 'Count from 0 in multiples of 4, 8, 50 and 100',
        icon: '🔢',
        yearGroup: '3',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: N01_Y3_NPV_PARAMS
    },
    'N01_Y4_NPV': {
        id: 'N01_Y4_NPV',
        name: 'N01_Y4_NPV: Counting in Multiples',
        description: 'Count in multiples of 6, 7, 9, 25 and 1,000',
        icon: '🔢',
        yearGroup: '4',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: N01_Y4_NPV_PARAMS
    },
    'N01_Y5_NPV': {
        id: 'N01_Y5_NPV',
        name: 'N01_Y5_NPV: Counting in Powers of 10',
        description: 'Count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000',
        icon: '🔢',
        yearGroup: '5',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: N01_Y5_NPV_PARAMS
    }
};
