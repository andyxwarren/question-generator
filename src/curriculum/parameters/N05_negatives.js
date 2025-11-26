/**
 * N05 Module Series: Negative Numbers
 * Covers Years 4-6 progression
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N05_Y4_NPV: {
        1: {
            math: {
                range: { min: -10, max: 10 },
                sequence: { steps: [1, 2], length: 6, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: -20, max: 20 },
                sequence: { steps: [1, 2, 5], length: 8, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: -50, max: 50 },
                sequence: { steps: [1, 2, 5, 10], length: 10, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "random", count: 2 }
            }
        },
        4: {
            math: {
                range: { min: -100, max: 100 },
                sequence: { steps: [1, 2, 5, 10], length: 12, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "random", count: 3 }
            }
        }
    },
    N05_Y5_NPV: {
        1: {
            math: {
                range: { min: -20, max: 20, temp: [-10, 15] },
                sequence: { steps: [1, 2, 5], length: 6, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "sequence"],
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: -50, max: 50, temp: [-20, 30], elevation: [-50, 100] },
                sequence: { steps: [1, 2, 5, 10], length: 8, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "elevation", "sequence"],
                gaps: { position: "middle", count: 2 }
            }
        },
        3: {
            math: {
                range: { min: -100, max: 100, temp: [-30, 40], elevation: [-100, 200] },
                sequence: { steps: [1, 2, 5, 10, 25], length: 10, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "elevation", "sequence"],
                gaps: { position: "random", count: 2 }
            }
        },
        4: {
            math: {
                range: { min: -200, max: 200, temp: [-40, 50], elevation: [-200, 500] },
                sequence: { steps: [1, 2, 5, 10, 25, 50], length: 12, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "elevation", "sequence"],
                gaps: { position: "random", count: 3 }
            }
        }
    },
    N05_Y6_NPV: {
        1: {
            math: {
                range: { min: -20, max: 20, temp: [-15, 20] },
                mustCrossZero: true
            },
            presentation: {
                intervalTypes: ["simple"],
                contexts: ["temperature", "number_line"]
            }
        },
        2: {
            math: {
                range: { min: -50, max: 50, temp: [-25, 35], elevation: [-50, 100] }
            },
            presentation: {
                intervalTypes: ["simple", "multi_step"],
                contexts: ["temperature", "elevation", "number_line"]
            }
        },
        3: {
            math: {
                range: { min: -100, max: 100, temp: [-40, 45], elevation: [-150, 300] }
            },
            presentation: {
                intervalTypes: ["simple", "multi_step", "word_problem"],
                contexts: ["temperature", "elevation", "number_line", "time"]
            }
        },
        4: {
            math: {
                range: { min: -500, max: 500, temp: [-50, 55], elevation: [-500, 1000] }
            },
            presentation: {
                intervalTypes: ["simple", "multi_step", "word_problem"],
                contexts: ["temperature", "elevation", "number_line", "time"]
            }
        }
    }
};

export const N05_MODULES = {
    'N05_Y4_NPV': {
        id: 'N05_Y4_NPV',
        name: 'N05_Y4_NPV: Counting Through Zero',
        description: 'Count backwards through zero to include negative numbers',
        icon: '➖',
        yearGroup: '4',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: MIGRATED_PARAMS['N05_Y4_NPV']
    },
    'N05_Y5_NPV': {
        id: 'N05_Y5_NPV',
        name: 'N05_Y5_NPV: Negative Numbers in Context',
        description: 'Interpret negative numbers in context, count forwards and backwards with positive and negative whole numbers, including through zero',
        icon: '🌡️',
        yearGroup: '5',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: MIGRATED_PARAMS['N05_Y5_NPV']
    },
    'N05_Y6_NPV': {
        id: 'N05_Y6_NPV',
        name: 'N05_Y6_NPV: Intervals Across Zero',
        description: 'Use negative numbers in context, and calculate intervals across zero',
        icon: '📏',
        yearGroup: '6',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: MIGRATED_PARAMS['N05_Y6_NPV']
    }
};
