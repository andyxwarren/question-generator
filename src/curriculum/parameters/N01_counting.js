/**
 * N01 Module Series: Counting in Multiples
 * Covers Years 1-5 progression for counting in multiples
 * 
 * Schema: V2 (Nested)
 */

// Generated parameters from migration
const MIGRATED_PARAMS = {
    N01_Y1_NPV: {
        1: {
            math: {
                range: { min: 0, max: 20 },
                sequence: {
                    steps: [1, 2],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 50 },
                sequence: {
                    steps: [1, 2, 5],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [1, 2, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [2, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y2_NPV: {
        1: {
            math: {
                range: { min: 0, max: 30 },
                sequence: {
                    steps: [2, 3, 5],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 50 },
                sequence: {
                    steps: [2, 3, 5, 10],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple",
                    tensFromAny: true,
                    tensRange: [0, 50]
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [2, 3, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any",
                    tensFromAny: true,
                    tensRange: [0, 100]
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [2, 3, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any",
                    tensFromAny: true,
                    tensRange: [0, 100]
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y3_NPV: {
        1: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [4, 8, 50],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 400 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 600 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 800 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y4_NPV: {
        1: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [6, 7, 9],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 300 },
                sequence: {
                    steps: [6, 7, 9, 25],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 5000 },
                sequence: {
                    steps: [6, 7, 9, 25, 1000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 10000 },
                sequence: {
                    steps: [6, 7, 9, 25, 1000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y5_NPV: {
        1: {
            math: {
                range: { min: 0, max: 10000 },
                sequence: {
                    steps: [10, 100],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 50000 },
                sequence: {
                    steps: [10, 100, 1000],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 500000 },
                sequence: {
                    steps: [10, 100, 1000, 10000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 1000000 },
                sequence: {
                    steps: [10, 100, 1000, 10000, 100000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    }
};

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
        parameters: MIGRATED_PARAMS['N01_Y1_NPV']
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
        parameters: MIGRATED_PARAMS['N01_Y2_NPV']
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
        parameters: MIGRATED_PARAMS['N01_Y3_NPV']
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
        parameters: MIGRATED_PARAMS['N01_Y4_NPV']
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
        parameters: MIGRATED_PARAMS['N01_Y5_NPV']
    }
};