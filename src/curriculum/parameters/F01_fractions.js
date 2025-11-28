/**
 * F01: Fractions (recognise, find, write, name)
 *
 * V2 Nested Schema: All parameters use math/presentation separation
 */

const F01_Y1_FRAC_PARAMS = {
    1: {
        description: "Beginning - 1/2 only, small quantities (2, 4, 6, 8), heavy visual support with simple shapes",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 8 }
            },
            divisibilityRequired: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['name_fraction', 'find_fraction'],
                    select: 'one'
                }
            },
            visualType: 'shapes',
            contexts: ['shapes', 'simple_objects'],
            showVisual: true
        }
    },
    2: {
        description: "Developing - Introduce 1/4, quantities up to 8, maintain visual support",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 4 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 8 }
            },
            divisibilityRequired: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['name_fraction', 'find_fraction'],
                    select: 'one'
                }
            },
            visualType: 'shapes',
            contexts: ['shapes', 'simple_objects'],
            showVisual: true
        }
    },
    3: {
        description: "Meeting Curriculum - 1/2 and 1/4, quantities up to 12, mix of shapes and objects, recognise and name",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 4 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 12 }
            },
            divisibilityRequired: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['name_fraction', 'find_fraction', 'recognise_fraction'],
                    select: 'one'
                }
            },
            visualType: 'mixed',
            contexts: ['shapes', 'objects', 'quantities'],
            showVisual: true
        }
    },
    4: {
        description: "Exceeding - 1/2 and 1/4 with larger quantities (up to 12), less visual scaffolding, more abstract reasoning",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 4 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 4, max: 12 }
            },
            divisibilityRequired: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['name_fraction', 'find_fraction', 'recognise_fraction'],
                    select: 'one'
                }
            },
            visualType: 'minimal',
            contexts: ['shapes', 'objects', 'quantities', 'sets'],
            showVisual: false
        }
    }
};

const F01_Y2_FRAC_PARAMS = {
    1: {
        description: "Beginning - 1/2 and 1/4 only, quantities divisible by 2 and 4 (up to 12), visual support with shapes",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 4 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 12 }
            },
            divisibilityRequired: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'write_fraction'],
                    select: 'one'
                }
            },
            visualType: 'shapes',
            contexts: ['shapes', 'objects']
        }
    },
    2: {
        description: "Developing - Add 1/3 and 2/4, quantities divisible by 2, 3, and 4 (up to 15), introduce naming fractions",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 3 },
                        { numerator: 1, denominator: 4 },
                        { numerator: 2, denominator: 4 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 15 }
            },
            divisibilityRequired: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'write_fraction', 'name_fraction'],
                    select: 'one'
                }
            },
            visualType: 'mixed',
            contexts: ['shapes', 'objects', 'sets']
        }
    },
    3: {
        description: "Meeting - Include 3/4, full range of fractions, quantities up to 20, all question types",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 3 },
                        { numerator: 1, denominator: 4 },
                        { numerator: 2, denominator: 4 },
                        { numerator: 3, denominator: 4 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 20 }
            },
            divisibilityRequired: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'write_fraction', 'name_fraction', 'equation'],
                    select: 'one'
                }
            },
            visualType: 'mixed',
            contexts: ['shapes', 'objects', 'sets', 'quantities']
        }
    },
    4: {
        description: "Exceeding - Mixed fractions, word problems, challenging quantities up to 24, equivalence (2/4 = 1/2)",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 3 },
                        { numerator: 1, denominator: 4 },
                        { numerator: 2, denominator: 4 },
                        { numerator: 3, denominator: 4 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 24 }
            },
            divisibilityRequired: true,
            includeEquivalence: true
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'write_fraction', 'name_fraction', 'equation', 'word_problem', 'equivalence'],
                    select: 'one'
                }
            },
            visualType: 'minimal',
            contexts: ['shapes', 'objects', 'sets', 'quantities', 'word_problems']
        }
    }
};

const F01_Y3_FRAC_PARAMS = {
    1: {
        description: "Beginning - Introduce tenths (1/10, 2/10, 3/10), unit fractions (1/2, 1/3, 1/4, 1/5), quantities up to 20, counting in tenths from 0",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 3 },
                        { numerator: 1, denominator: 4 },
                        { numerator: 1, denominator: 5 },
                        { numerator: 1, denominator: 10 },
                        { numerator: 2, denominator: 10 },
                        { numerator: 3, denominator: 10 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 20 }
            },
            divisibilityRequired: true,
            countingInTenths: {
                range: { min: 0, max: 1 },
                step: 0.1,
                length: 6,
                direction: 'forwards'
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'count_tenths', 'number_line_tenths', 'write_fraction'],
                    select: 'one'
                }
            },
            visualType: 'shapes',
            contexts: ['shapes', 'objects', 'discrete_sets']
        }
    },
    2: {
        description: "Developing - Add more unit fractions (1/6, 1/8), non-unit fractions (2/3, 2/5, 3/10), quantities up to 30, counting forwards and backwards in tenths",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 3 },
                        { numerator: 1, denominator: 4 },
                        { numerator: 1, denominator: 5 },
                        { numerator: 1, denominator: 6 },
                        { numerator: 1, denominator: 8 },
                        { numerator: 1, denominator: 10 },
                        { numerator: 2, denominator: 3 },
                        { numerator: 2, denominator: 5 },
                        { numerator: 3, denominator: 10 },
                        { numerator: 4, denominator: 10 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 30 }
            },
            divisibilityRequired: true,
            countingInTenths: {
                range: { min: 0, max: 2 },
                step: 0.1,
                length: 8,
                directions: ['forwards', 'backwards']
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'count_tenths', 'number_line_tenths', 'write_fraction', 'name_fraction', 'discrete_set'],
                    select: 'one'
                }
            },
            visualType: 'mixed',
            contexts: ['shapes', 'objects', 'discrete_sets', 'number_lines']
        }
    },
    3: {
        description: "Meeting - Full curriculum range: unit fractions (1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10), non-unit fractions with small denominators (2/3, 3/4, 2/5, 3/5, etc.), counting in tenths beyond 1, quantities up to 40",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 3 },
                        { numerator: 2, denominator: 3 },
                        { numerator: 1, denominator: 4 },
                        { numerator: 2, denominator: 4 },
                        { numerator: 3, denominator: 4 },
                        { numerator: 1, denominator: 5 },
                        { numerator: 2, denominator: 5 },
                        { numerator: 3, denominator: 5 },
                        { numerator: 4, denominator: 5 },
                        { numerator: 1, denominator: 6 },
                        { numerator: 1, denominator: 8 },
                        { numerator: 1, denominator: 10 },
                        { numerator: 2, denominator: 10 },
                        { numerator: 3, denominator: 10 },
                        { numerator: 7, denominator: 10 },
                        { numerator: 9, denominator: 10 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 2, max: 40 }
            },
            divisibilityRequired: true,
            countingInTenths: {
                range: { min: 0, max: 3 },
                step: 0.1,
                length: 10,
                directions: ['forwards', 'backwards']
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'count_tenths', 'number_line_tenths', 'write_fraction', 'name_fraction', 'discrete_set', 'equation', 'divide_by_10'],
                    select: 'one'
                }
            },
            visualType: 'mixed',
            contexts: ['shapes', 'objects', 'discrete_sets', 'number_lines', 'quantities']
        }
    },
    4: {
        description: "Exceeding - Extended ranges, challenging non-unit fractions, complex counting sequences in tenths, quantities up to 60, word problems, fractions on number lines beyond 2",
        math: {
            fractions: {
                options: {
                    values: [
                        { numerator: 1, denominator: 2 },
                        { numerator: 1, denominator: 3 },
                        { numerator: 2, denominator: 3 },
                        { numerator: 1, denominator: 4 },
                        { numerator: 2, denominator: 4 },
                        { numerator: 3, denominator: 4 },
                        { numerator: 1, denominator: 5 },
                        { numerator: 2, denominator: 5 },
                        { numerator: 3, denominator: 5 },
                        { numerator: 4, denominator: 5 },
                        { numerator: 1, denominator: 6 },
                        { numerator: 5, denominator: 6 },
                        { numerator: 1, denominator: 8 },
                        { numerator: 3, denominator: 8 },
                        { numerator: 5, denominator: 8 },
                        { numerator: 1, denominator: 10 },
                        { numerator: 3, denominator: 10 },
                        { numerator: 7, denominator: 10 },
                        { numerator: 9, denominator: 10 }
                    ],
                    select: 'one'
                }
            },
            quantity: {
                range: { min: 5, max: 60 }
            },
            divisibilityRequired: true,
            countingInTenths: {
                range: { min: 0, max: 5 },
                step: 0.1,
                length: 12,
                directions: ['forwards', 'backwards']
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['find_fraction', 'count_tenths', 'number_line_tenths', 'write_fraction', 'name_fraction', 'discrete_set', 'equation', 'divide_by_10', 'word_problem'],
                    select: 'one'
                }
            },
            visualType: 'minimal',
            contexts: ['shapes', 'objects', 'discrete_sets', 'number_lines', 'quantities', 'word_problems']
        }
    }
};

const F01_Y4_FRAC_PARAMS = {
    1: {
        description: "Beginning - count in hundredths (forwards only, 0-0.10), recognise hundredths with visual support",
        math: {
            fractions: {
                denominator: 100,
                sequence: {
                    numeratorRange: { min: 1, max: 10 },
                    directions: ['forwards'],
                    startValues: [0]
                }
            },
            division: {
                wholeNumbers: { min: 100, max: 100 },
                divisor: 100
            },
            tenthsRelation: {
                include: false
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['count_hundredths', 'divide_by_100', 'name_hundredth'],
                    select: 'one'
                }
            },
            visualType: 'shapes',
            formats: ['fraction', 'decimal'],
            gapPosition: 'end'
        }
    },
    2: {
        description: "Developing - count backwards, extend to 0-0.20, introduce tenths-hundredths relationship (1/10 = 10/100)",
        math: {
            fractions: {
                denominator: 100,
                sequence: {
                    numeratorRange: { min: 1, max: 20 },
                    directions: ['forwards', 'backwards'],
                    startValues: [0, 10, 20]
                }
            },
            division: {
                wholeNumbers: { min: 100, max: 500 },
                divisor: 100
            },
            tenthsRelation: {
                include: true,
                tenthsValues: [1, 2]
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['count_hundredths', 'divide_by_100', 'name_hundredth', 'tenths_to_hundredths', 'number_line'],
                    select: 'one'
                }
            },
            visualType: 'mixed',
            formats: ['fraction', 'decimal'],
            gapPosition: 'mixed'
        }
    },
    3: {
        description: "Meeting - full range 0-1.00, all directions, divide tenths by 10, number line positioning",
        math: {
            fractions: {
                denominator: 100,
                sequence: {
                    numeratorRange: { min: 1, max: 100 },
                    directions: ['forwards', 'backwards'],
                    startValues: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                }
            },
            division: {
                wholeNumbers: { min: 100, max: 1000 },
                divisor: 100
            },
            tenthsRelation: {
                include: true,
                tenthsValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                divideTenthsByTen: true
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['count_hundredths', 'divide_by_100', 'name_hundredth', 'tenths_to_hundredths', 'divide_tenths', 'number_line'],
                    select: 'one'
                }
            },
            visualType: 'mixed',
            formats: ['fraction', 'decimal', 'mixed'],
            gapPosition: 'random'
        }
    },
    4: {
        description: "Exceeding - extend beyond 1.00 (up to 2.00), complex sequences, word problems with hundredths",
        math: {
            fractions: {
                denominator: 100,
                sequence: {
                    numeratorRange: { min: 1, max: 200 },
                    directions: ['forwards', 'backwards'],
                    startValues: [0, 25, 50, 75, 100, 125, 150, 175, 200]
                }
            },
            division: {
                wholeNumbers: { min: 100, max: 2000 },
                divisor: 100
            },
            tenthsRelation: {
                include: true,
                tenthsValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                divideTenthsByTen: true
            }
        },
        presentation: {
            questionTypes: {
                options: {
                    values: ['count_hundredths', 'divide_by_100', 'name_hundredth', 'tenths_to_hundredths', 'divide_tenths', 'number_line', 'word_problem'],
                    select: 'one'
                }
            },
            visualType: 'minimal',
            formats: ['fraction', 'decimal', 'mixed'],
            gapPosition: 'random'
        }
    }
};

/**
 * F01 Module Definitions
 */
export const F01_MODULES = {
    'F01_Y1_FRAC': {
        id: 'F01_Y1_FRAC',
        name: 'F01_Y1_FRAC: Halves and Quarters',
        description: 'Recognise, find and name a half as one of two equal parts of an object, shape or quantity; recognise, find and name a quarter as one of four equal parts of an object, shape or quantity',
        icon: '🍕',
        yearGroup: '1',
        strand: 'Fractions, decimals and percentages',
        substrand: 'recognise, find, write, name and count fractions',
        ref: 'F1',
        parameters: F01_Y1_FRAC_PARAMS
    },
    'F01_Y2_FRAC': {
        id: 'F01_Y2_FRAC',
        name: 'F01_Y2_FRAC: Recognise and Find Fractions',
        description: 'Recognise, find, name and write fractions ⅓, ¼, ²⁄₄ and ¾ of a length, shape, set of objects or quantity',
        icon: '🍰',
        yearGroup: '2',
        strand: 'Fractions, decimals and percentages',
        substrand: 'recognise, find, write, name and count fractions',
        ref: 'F1',
        parameters: F01_Y2_FRAC_PARAMS
    },
    'F01_Y3_FRAC': {
        id: 'F01_Y3_FRAC',
        name: 'F01_Y3_FRAC: Fractions and Tenths',
        description: 'Count up and down in tenths; recognise that tenths arise from dividing an object into 10 equal parts and in dividing one-digit numbers or quantities by 10; recognise, find and write fractions of a discrete set of objects: unit fractions and non-unit fractions with small denominators',
        icon: '🔟',
        yearGroup: '3',
        strand: 'Fractions, decimals and percentages',
        substrand: 'recognise, find, write, name and count fractions',
        ref: 'F1',
        parameters: F01_Y3_FRAC_PARAMS
    },
    'F01_Y4_FRAC': {
        id: 'F01_Y4_FRAC',
        name: 'F01_Y4_FRAC: Counting in Hundredths',
        description: 'Count up and down in hundredths; recognise that hundredths arise when dividing an object by a hundred and dividing tenths by ten',
        icon: '💯',
        yearGroup: '4',
        strand: 'Fractions, decimals and percentages',
        substrand: 'recognise, find, write, name and count fractions',
        ref: 'F1',
        parameters: F01_Y4_FRAC_PARAMS
    }
};
