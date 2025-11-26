/**
 * N06 Module Series: Number Problems
 * Using place value and number facts to solve problems
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N06_Y2_NPV: {
        1: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems"],
            math: {
                range: { min: 0, max: 30 },
                sequence: { steps: [2, 5, 10] },
                steps: { max: 3 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple"]
            }
        },
        2: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 60 },
                sequence: { steps: [2, 3, 5, 10] },
                steps: { max: 5 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "varied"]
            }
        },
        3: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 100 },
                sequence: { steps: [2, 3, 5, 10] },
                steps: { max: 8 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["simple", "varied", "mixed"]
            }
        },
        4: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 120 },
                sequence: { steps: [2, 3, 5, 10] },
                steps: { max: 10 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["varied", "mixed", "complex"]
            }
        }
    },
    N06_Y3_NPV: {
        1: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems"],
            math: {
                range: { min: 0, max: 200 },
                sequence: { steps: [4, 8, 50] },
                steps: { max: 4 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple"]
            }
        },
        2: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 500 },
                sequence: { steps: [4, 8, 50, 100] },
                steps: { max: 6 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "varied"]
            }
        },
        3: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 1000 },
                sequence: { steps: [4, 8, 50, 100] },
                steps: { max: 8 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["simple", "varied", "mixed"]
            }
        },
        4: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 1200 },
                sequence: { steps: [4, 8, 50, 100] },
                steps: { max: 10 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["varied", "mixed", "complex"]
            }
        }
    },
    N06_Y4_NPV: {
        1: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems"],
            math: {
                range: { min: 0, max: 2000 },
                sequence: { steps: [6, 7, 9, 25] },
                steps: { min: 2, max: 5 },
                rounding: { bases: [10, 100] },
                roman: { min: 1, max: 50 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple"]
            }
        },
        2: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 5000 },
                sequence: { steps: [6, 7, 9, 25, 1000] },
                steps: { min: 2, max: 7 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 75 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "practical"]
            }
        },
        3: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 10000 },
                sequence: { steps: [6, 7, 9, 25, 1000] },
                steps: { min: 3, max: 10 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 100 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["simple", "practical", "complex"]
            }
        },
        4: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 15000 },
                sequence: { steps: [6, 7, 9, 25, 1000] },
                steps: { min: 4, max: 12 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 100 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["practical", "complex", "large_numbers"]
            }
        }
    },
    N06_Y5_NPV: {
        1: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems"],
            math: {
                range: { min: 0, max: 100000, negative: [-50, 50] },
                sequence: { steps: [10, 100, 1000] },
                steps: { min: 2, max: 5 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 500 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple", "practical"]
            }
        },
        2: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 500000, negative: [-200, 200] },
                sequence: { steps: [10, 100, 1000, 10000] },
                steps: { min: 2, max: 7 },
                rounding: { bases: [10, 100, 1000, 10000] },
                roman: { min: 1, max: 750 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "practical", "varied"]
            }
        },
        3: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 1000000, negative: [-500, 500] },
                sequence: { steps: [10, 100, 1000, 10000, 100000] },
                steps: { min: 3, max: 10 },
                rounding: { bases: [10, 100, 1000, 10000, 100000] },
                roman: { min: 1, max: 1000 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["practical", "varied", "complex"]
            }
        },
        4: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 5000000, negative: [-1000, 1000] },
                sequence: { steps: [10, 100, 1000, 10000, 100000] },
                steps: { min: 4, max: 12 },
                rounding: { bases: [10, 100, 1000, 10000, 100000] },
                roman: { min: 1, max: 1000 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["complex", "large_numbers", "multi_concept"]
            }
        }
    },
    N06_Y6_NPV: {
        1: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems"],
            math: {
                range: { min: 0, max: 1000000, negative: [-100, 100], interval: [50, 500] },
                steps: { min: 2, max: 5 },
                rounding: { bases: [10, 100, 1000, 10000] },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple", "practical"]
            }
        },
        2: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems", "multi_concept_integration"],
            math: {
                range: { min: 0, max: 5000000, negative: [-500, 500], interval: [100, 1000] },
                steps: { min: 2, max: 7 },
                rounding: { bases: [10, 100, 1000, 10000, 100000] },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["practical", "varied"]
            }
        },
        3: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems", "multi_concept_integration"],
            math: {
                range: { min: 0, max: 10000000, negative: [-1000, 1000], interval: [500, 2000] },
                steps: { min: 3, max: 10 },
                rounding: { bases: [10, 100, 1000, 10000, 100000, 1000000] },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["practical", "varied", "complex"]
            }
        },
        4: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems", "multi_concept_integration"],
            math: {
                range: { min: 0, max: 20000000, negative: [-2000, 2000], interval: [1000, 5000] },
                steps: { min: 4, max: 12 },
                rounding: { bases: [10, 100, 1000, 10000, 100000, 1000000] },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["complex", "large_numbers", "multi_concept"]
            }
        }
    }
};

export const N06_MODULES = {
    'N06_Y2_NPV': {
        id: 'N06_Y2_NPV',
        name: 'N06_Y2_NPV: Solve Number Problems',
        description: 'Use place value and number facts to solve problems',
        icon: '🧮',
        yearGroup: '2',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y2_NPV']
    },
    'N06_Y3_NPV': {
        id: 'N06_Y3_NPV',
        name: 'N06_Y3_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems involving 3N1-3N4',
        icon: '🧮',
        yearGroup: '3',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y3_NPV']
    },
    'N06_Y4_NPV': {
        id: 'N06_Y4_NPV',
        name: 'N06_Y4_NPV: Number & Practical Problems',
        description: 'Solve number and practical problems that involve 4N1-4N5 and with increasingly large positive numbers',
        icon: '🧮',
        yearGroup: '4',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y4_NPV']
    },
    'N06_Y5_NPV': {
        id: 'N06_Y5_NPV',
        name: 'N06_Y5_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems that involve 5N1-5N5',
        icon: '🧮',
        yearGroup: '5',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y5_NPV']
    },
    'N06_Y6_NPV': {
        id: 'N06_Y6_NPV',
        name: 'N06_Y6_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems that involve 6N2-6N5',
        icon: '🧮',
        yearGroup: '6',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y6_NPV']
    }
};
