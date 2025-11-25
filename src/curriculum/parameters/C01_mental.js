/**
 * C01 Module Series: Mental Addition and Subtraction
 * Covers Years 1, 2, 3, 5
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C01_Y1_CALC: {
        1: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub"],
            math: { range: { max: 10 }, targets: [5, 10], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub", "fact_families"],
            math: { range: { max: 20 }, targets: [10, 20], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem", "part_whole"] }
        },
        3: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub", "fact_families", "mixed_operations"],
            math: { range: { max: 20 }, targets: [10, 15, 20], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem", "part_whole", "missing_number"] }
        },
        4: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub", "fact_families", "mixed_operations", "two_step_bonds"],
            math: { range: { max: 20 }, targets: [10, 15, 20], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem", "part_whole", "missing_number", "reasoning"] }
        }
    },
    C01_Y2_CALC: {
        1: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: false } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract", "inverse_operations"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract", "inverse_operations", "fact_families_100"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract", "inverse_operations", "fact_families_100", "near_multiples"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C01_Y3_CALC: {
        1: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens"],
            math: { range: { min3: 100, max3: 300 }, components: { ones: [1, 9], tens: [10, 50], hundreds: [100, 300] }, config: { avoidBridging: true } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens", "add_hundreds", "subtract_hundreds"],
            math: { range: { min3: 100, max3: 500 }, components: { ones: [1, 9], tens: [10, 90], hundreds: [100, 400] }, config: { avoidBridging: false } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens", "add_hundreds", "subtract_hundreds", "mixed_operations"],
            math: { range: { min3: 100, max3: 999 }, components: { ones: [1, 9], tens: [10, 90], hundreds: [100, 900] }, config: { avoidBridging: false } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens", "add_hundreds", "subtract_hundreds", "mixed_operations", "two_step_mental"],
            math: { range: { min3: 100, max3: 999 }, components: { ones: [1, 9], tens: [10, 90], hundreds: [100, 900] }, config: { avoidBridging: false, complexBridging: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C01_Y5_CALC: {
        1: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_ones_to_4digit", "subtract_ones_from_4digit"],
            math: { range: { min: 1000, max: 9999 }, components: { powers: [10, 100, 1000] }, config: { avoidBridging: true } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_multiples_1000", "subtract_multiples_1000", "add_any_to_4digit", "subtract_any_from_4digit"],
            math: { range: { min: 1000, max: 99999 }, components: { powers: [10, 100, 1000] }, config: { avoidBridging: false } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_multiples_1000", "subtract_multiples_1000", "add_any_to_large", "subtract_any_from_large", "compensation", "partitioning"],
            math: { range: { min: 1000, max: 1000000 }, components: { powers: [10, 100, 1000, 10000] }, config: { avoidBridging: false, strategies: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_multiples_1000", "subtract_multiples_1000", "add_any_to_large", "subtract_any_from_large", "compensation", "partitioning", "near_multiples_large", "multi_step_mental"],
            math: { range: { min: 1000, max: 1000000 }, components: { powers: [10, 100, 1000, 10000, 100000] }, config: { avoidBridging: false, strategies: true, complex: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    }
};

export const C01_MODULES = {
    'C01_Y1_CALC': {
        id: 'C01_Y1_CALC',
        name: 'C01_Y1_CALC: Number Bonds to 20',
        description: 'Represent and use number bonds and related subtraction facts within 20',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y1_CALC']
    },
    'C01_Y2_CALC': {
        id: 'C01_Y2_CALC',
        name: 'C01_Y2_CALC: Mental Facts to 100',
        description: 'Recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100',
        icon: '➕',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y2_CALC']
    },
    'C01_Y3_CALC': {
        id: 'C01_Y3_CALC',
        name: 'C01_Y3_CALC: Mental 3-Digit Calculations',
        description: 'Add and subtract numbers mentally, including: a three-digit number and ones, a three-digit number and tens, a three-digit number and hundreds',
        icon: '➕',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y3_CALC']
    },
    'C01_Y5_CALC': {
        id: 'C01_Y5_CALC',
        name: 'C01_Y5_CALC: Mental Calculations with Large Numbers',
        description: 'Add and subtract numbers mentally with increasingly large numbers',
        icon: '➕',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y5_CALC']
    }
};