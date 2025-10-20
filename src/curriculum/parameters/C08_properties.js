/**
 * C08 Module Series: Problem-Solving with Mathematical Properties
 * Solve problems involving commutative, associative, distributive properties and all four operations
 * Progression: Multiplication/Division basics (Y1-2) → Scaling/Correspondence (Y3-4) → Properties & Multi-operation (Y5-6)
 *
 * Key Design Principles:
 * - Test understanding of commutative, associative, distributive properties where specified
 * - Use realistic contexts appropriate to year group
 * - Digital-suitable questions (text-based arrays, word problems)
 * - Progressive complexity across 4 levels
 * - Integration with existing helper functions
 */

export const C08_MODULES = {
    'C08_Y1_CALC': {
        id: 'C08_Y1_CALC',
        name: 'C08_Y1_CALC: One-Step Multiplication and Division Problems',
        description: 'Solve one-step problems involving multiplication and division, by calculating the answer using concrete objects, pictorial representations and arrays',
        icon: '✖️',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'solve problems (commutative, associative, distributive and all four operations)',
        ref: 'C8',
        parameters: {
            1: {
                // Beginning: 2s, 5s, 10s only, max product 10, multiple choice only
                // Focus: Simple equal groups with visual support, very small numbers
                operations: [
                    'equal_groups_visual',   // Equal groups with emoji visualization
                    'array_multiplication_visual', // Array with dots
                    'sharing_visual'         // Sharing with visual support
                ],
                tables: [2, 5, 10],
                max_product: 10,
                min_groups: 2,
                max_groups: 2,              // Only 2 groups at Level 1
                exact_division_only: true,
                question_format: 'multiple_choice',
                distractor_count: 3,
                use_visuals: true,          // Always show visual representations
                context_types: ['fruit', 'object'],
                max_sentence_words: 10      // Keep language very simple
            },
            2: {
                // Developing: Add 3s, max product 15, slightly more complex
                // Focus: Introduce grouping and array division, still with visuals
                operations: [
                    'equal_groups_visual',
                    'array_multiplication_visual',
                    'array_division_visual', // New: divide array into rows
                    'sharing_visual',
                    'grouping_visual'        // New: how many groups?
                ],
                tables: [2, 3, 5, 10],
                max_product: 15,
                min_groups: 2,
                max_groups: 5,              // Up to 5 groups
                exact_division_only: true,
                question_format: 'multiple_choice',
                distractor_count: 3,
                use_visuals: true,
                context_types: ['fruit', 'object', 'food'],
                max_sentence_words: 12
            },
            3: {
                // Meeting: Add 4s, max product 20, introduce repeated addition
                // Focus: All operations with visuals, still multiple choice
                operations: [
                    'equal_groups_visual',
                    'array_multiplication_visual',
                    'array_division_visual',
                    'sharing_visual',
                    'grouping_visual',
                    'repeated_addition_visual', // New: 5 + 5 + 5 shown visually
                    'doubling'               // New: simple doubling (2 groups of n)
                ],
                tables: [2, 3, 4, 5, 10],
                max_product: 20,
                min_groups: 2,
                max_groups: 5,
                exact_division_only: true,
                question_format: 'multiple_choice',
                distractor_count: 3,
                use_visuals: true,          // Still use visuals
                context_types: ['fruit', 'object', 'food', 'toy'],
                max_sentence_words: 12
            },
            4: {
                // Exceeding: All operations, max product 20, more complex language
                // Focus: All operations with slightly more challenging contexts
                // NOTE: NO remainders - not appropriate for Y1
                operations: [
                    'equal_groups_visual',
                    'array_multiplication_visual',
                    'array_division_visual',
                    'sharing_visual',
                    'grouping_visual',
                    'repeated_addition_visual',
                    'doubling',
                    'halving'                // New: simple halving (share between 2)
                ],
                tables: [2, 3, 4, 5, 10],
                max_product: 20,            // Keep at 20, NOT 50
                min_groups: 2,
                max_groups: 5,
                exact_division_only: true,  // MUST be true - no remainders
                question_format: 'multiple_choice', // Keep as multiple choice
                distractor_count: 3,
                use_visuals: true,          // Continue using visuals
                context_types: ['fruit', 'object', 'food', 'toy'],
                max_sentence_words: 15      // Slightly longer sentences allowed
            }
        }
    },

    'C08_Y2_CALC': {
        id: 'C08_Y2_CALC',
        name: 'C08_Y2_CALC: Properties and Problem-Solving',
        description: 'Solve problems involving multiplication and division, using materials, arrays, repeated addition, mental methods, and multiplication and division facts, including problems in contexts; show that addition of two numbers can be done in any order (commutative) and subtraction of one number from another cannot; show that multiplication of two numbers can be done in any order (commutative) and division of one number by another cannot',
        icon: '✖️',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'solve problems (commutative, associative, distributive and all four operations)',
        ref: 'C8',
        parameters: {
            1: {
                // Beginning: 2, 5, 10 tables, introduce commutative property
                operations: [
                    'equal_groups',
                    'array_multiplication',
                    'repeated_addition',
                    'commutative_mult',      // "5 × 3 = 3 × 5" demonstration
                    'sharing',
                    'grouping'
                ],
                tables: [2, 5, 10],
                max_product: 50,
                min_factor: 1,
                max_factor: 10,
                exact_division_only: true,
                context_types: ['objects', 'arrays'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                show_commutative: true,      // Include commutative property questions
                commutative_frequency: 0.2   // 20% of questions test commutative property
            },
            2: {
                // Developing: Add 3, 4 tables, test non-commutative division
                operations: [
                    'equal_groups',
                    'array_multiplication',
                    'repeated_addition',
                    'commutative_mult',
                    'commutative_add',       // Show addition is commutative
                    'non_commutative_sub',   // Show subtraction is NOT commutative
                    'non_commutative_div',   // Show division is NOT commutative
                    'sharing',
                    'grouping'
                ],
                tables: [2, 3, 4, 5, 10],
                max_product: 60,
                min_factor: 1,
                max_factor: 12,
                exact_division_only: true,
                context_types: ['objects', 'arrays'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                show_commutative: true,
                commutative_frequency: 0.25,
                non_commutative_frequency: 0.15  // Also test what's NOT commutative
            },
            3: {
                // Meeting: More tables, all property types
                operations: [
                    'equal_groups',
                    'array_multiplication',
                    'array_division',
                    'repeated_addition',
                    'commutative_mult',
                    'commutative_add',
                    'non_commutative_sub',
                    'non_commutative_div',
                    'sharing',
                    'grouping',
                    'mental_methods'         // Use known facts
                ],
                tables: [2, 3, 4, 5, 8, 10],
                max_product: 80,
                min_factor: 1,
                max_factor: 12,
                exact_division_only: true,
                context_types: ['objects', 'arrays', 'mental'],
                question_format: 'text_input',
                show_commutative: true,
                commutative_frequency: 0.3,
                non_commutative_frequency: 0.2
            },
            4: {
                // Exceeding: Challenge contexts, all operations
                operations: [
                    'equal_groups',
                    'array_multiplication',
                    'array_division',
                    'repeated_addition',
                    'commutative_mult',
                    'commutative_add',
                    'non_commutative_sub',
                    'non_commutative_div',
                    'sharing',
                    'grouping',
                    'mental_methods',
                    'mixed_operations'       // Combine mult/div with add/sub
                ],
                tables: [2, 3, 4, 5, 8, 10],
                max_product: 100,
                min_factor: 1,
                max_factor: 12,
                exact_division_only: false,
                context_types: ['objects', 'arrays', 'mental', 'measures'],
                question_format: 'text_input',
                show_commutative: true,
                commutative_frequency: 0.3,
                non_commutative_frequency: 0.2,
                allow_remainders: true
            }
        }
    },

    'C08_Y3_CALC': {
        id: 'C08_Y3_CALC',
        name: 'C08_Y3_CALC: Scaling and Correspondence Problems',
        description: 'Solve problems, including missing number problems, involving multiplication and division, including integer scaling problems and correspondence problems in which n objects are connected to m objects',
        icon: '✖️',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'solve problems (commutative, associative, distributive and all four operations)',
        ref: 'C8',
        parameters: {
            1: {
                // Beginning: Simple scaling (2x, 3x, 5x, 10x), basic correspondence
                operations: [
                    'integer_scaling',       // "If 1 book costs £4, what do 3 books cost?"
                    'simple_correspondence', // "1 box has 5 pencils, how many in 3 boxes?"
                    'missing_factor',        // "? × 5 = 20"
                    'equal_groups'
                ],
                tables: [2, 3, 4, 5, 8, 10],
                max_product: 100,
                scaling_factors: [2, 3, 5, 10],
                correspondence_ratios: [[1, 2], [1, 5], [1, 10]],  // [n objects, m objects]
                exact_division_only: true,
                context_types: ['objects', 'money', 'measures'],
                question_format: 'multiple_choice',
                distractor_count: 3
            },
            2: {
                // Developing: More scaling factors, varied correspondence
                operations: [
                    'integer_scaling',
                    'simple_correspondence',
                    'complex_correspondence', // "2 boxes have 10 pencils, how many in 5 boxes?"
                    'missing_factor',
                    'missing_dividend',       // "? ÷ 4 = 7"
                    'equal_groups'
                ],
                tables: [2, 3, 4, 5, 6, 8, 10],
                max_product: 200,
                scaling_factors: [2, 3, 4, 5, 6, 8, 10],
                correspondence_ratios: [[1, 2], [1, 3], [1, 4], [1, 5], [1, 10], [2, 6], [3, 9]],
                exact_division_only: true,
                context_types: ['objects', 'money', 'measures'],
                question_format: 'multiple_choice',
                distractor_count: 3
            },
            3: {
                // Meeting: All tables to 12, varied correspondence
                operations: [
                    'integer_scaling',
                    'simple_correspondence',
                    'complex_correspondence',
                    'missing_factor',
                    'missing_dividend',
                    'missing_divisor',        // "20 ÷ ? = 4"
                    'equal_groups',
                    'inverse_operations'      // Use inverse to solve
                ],
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_product: 300,
                scaling_factors: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                correspondence_ratios: [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 8], [2, 6], [3, 12], [4, 8]],
                exact_division_only: true,
                context_types: ['objects', 'money', 'measures', 'time'],
                question_format: 'text_input'
            },
            4: {
                // Exceeding: Complex scaling, multi-step correspondence
                operations: [
                    'integer_scaling',
                    'simple_correspondence',
                    'complex_correspondence',
                    'multi_step_correspondence', // "3 boxes have 18 items. How many in 7 boxes?"
                    'missing_factor',
                    'missing_dividend',
                    'missing_divisor',
                    'inverse_operations',
                    'scaling_with_remainder'
                ],
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_product: 500,
                scaling_factors: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                correspondence_ratios: [[1, 3], [1, 4], [1, 6], [1, 8], [2, 6], [3, 12], [4, 16], [5, 15]],
                exact_division_only: false,
                context_types: ['objects', 'money', 'measures', 'time'],
                question_format: 'text_input',
                allow_remainders: true
            }
        }
    },

    'C08_Y4_CALC': {
        id: 'C08_Y4_CALC',
        name: 'C08_Y4_CALC: Distributive Law and Harder Correspondence',
        description: 'Solve problems involving multiplying and adding, including using the distributive law to multiply two-digit numbers by one digit, integer scaling problems and harder correspondence problems such as n objects are connected to m objects',
        icon: '✖️',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'solve problems (commutative, associative, distributive and all four operations)',
        ref: 'C8',
        parameters: {
            1: {
                // Beginning: Simple distributive (partition 2-digit), basic hard correspondence
                operations: [
                    'distributive_simple',   // "12 × 4 = (10 × 4) + (2 × 4)"
                    'multiply_then_add',     // "(3 × 5) + 7"
                    'integer_scaling',
                    'harder_correspondence'  // More complex ratios
                ],
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                max_product: 200,
                two_digit_range: [11, 30],
                one_digit_multipliers: [2, 3, 4, 5],
                correspondence_ratios: [[2, 6], [3, 9], [4, 12], [5, 15]],
                exact_division_only: true,
                context_types: ['objects', 'money', 'measures'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                show_working: true           // Show distributive working
            },
            2: {
                // Developing: More complex distributive, varied hard correspondence
                operations: [
                    'distributive_simple',
                    'distributive_application', // Word problems using distributive
                    'multiply_then_add',
                    'multiply_then_subtract',   // "(5 × 8) - 6"
                    'integer_scaling',
                    'harder_correspondence',
                    'multi_step_scaling'
                ],
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_product: 400,
                two_digit_range: [11, 50],
                one_digit_multipliers: [2, 3, 4, 5, 6],
                correspondence_ratios: [[2, 8], [3, 12], [4, 16], [5, 20], [6, 18]],
                exact_division_only: true,
                context_types: ['objects', 'money', 'measures', 'distance'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                show_working: true
            },
            3: {
                // Meeting: Full distributive range, complex correspondence
                operations: [
                    'distributive_simple',
                    'distributive_application',
                    'multiply_then_add',
                    'multiply_then_subtract',
                    'integer_scaling',
                    'harder_correspondence',
                    'multi_step_scaling',
                    'inverse_with_distributive', // Work backwards
                    'missing_number_distributive'
                ],
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_product: 600,
                two_digit_range: [11, 70],
                one_digit_multipliers: [2, 3, 4, 5, 6, 7, 8, 9],
                correspondence_ratios: [[2, 8], [3, 15], [4, 20], [5, 25], [6, 24], [7, 21]],
                exact_division_only: true,
                context_types: ['objects', 'money', 'measures', 'distance', 'area'],
                question_format: 'text_input',
                show_working: true
            },
            4: {
                // Exceeding: Challenge distributive, most complex correspondence
                operations: [
                    'distributive_simple',
                    'distributive_application',
                    'multiply_then_add',
                    'multiply_then_subtract',
                    'combined_operations',   // Mix all four operations
                    'integer_scaling',
                    'harder_correspondence',
                    'multi_step_scaling',
                    'inverse_with_distributive',
                    'missing_number_distributive',
                    'double_distributive'    // "(10 + 3) × (5 + 2)"
                ],
                tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                max_product: 1000,
                two_digit_range: [11, 99],
                one_digit_multipliers: [2, 3, 4, 5, 6, 7, 8, 9],
                correspondence_ratios: [[3, 18], [4, 24], [5, 30], [6, 36], [7, 35], [8, 32]],
                exact_division_only: false,
                context_types: ['objects', 'money', 'measures', 'distance', 'area'],
                question_format: 'text_input',
                show_working: true,
                allow_remainders: true
            }
        }
    },

    'C08_Y5_CALC': {
        id: 'C08_Y5_CALC',
        name: 'C08_Y5_CALC: Multi-Operation and Properties Problems',
        description: 'Solve problems involving multiplication and division including using their knowledge of factors and multiples, squares and cubes; solve problems involving addition, subtraction, multiplication and division and a combination of these, including understanding the meaning of the equals sign; solve problems involving multiplication and division including scaling by simple fractions and problems involving simple rates',
        icon: '✖️',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'solve problems (commutative, associative, distributive and all four operations)',
        ref: 'C8',
        parameters: {
            1: {
                // Beginning: Factors/multiples in context, 2-3 operations, simple fractions/rates
                operations: [
                    'factor_problems',       // "Find two factors of 24 that add to 11"
                    'multiple_problems',     // "What's the LCM of 4 and 6?"
                    'square_cube_problems',  // "A square has area 36. What's the side length?"
                    'two_operation_problems',// Addition + Multiplication
                    'fraction_scaling',      // "1/2 of 20 kg"
                    'simple_rate'            // "Car travels 60 mph for 3 hours"
                ],
                max_value: 1000,
                factor_range: [1, 100],
                square_range: [1, 12],      // Squares up to 144
                cube_range: [1, 5],         // Cubes up to 125
                simple_fractions: ['1/2', '1/3', '1/4', '1/5', '1/10'],
                rate_units: [['km', 'h'], ['m', 's'], ['£', 'item']],
                operations_count: [2, 3],   // 2-3 operations per problem
                context_types: ['objects', 'money', 'measures', 'speed'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                equals_sign_focus: true     // Test meaning of equals
            },
            2: {
                // Developing: More complex factors/multiples, 3 operations, more fractions/rates
                operations: [
                    'factor_problems',
                    'multiple_problems',
                    'square_cube_problems',
                    'prime_factor_problems', // "Express 24 as product of primes"
                    'three_operation_problems', // e.g., "(20 + 15) × 3 - 10"
                    'fraction_scaling',
                    'simple_rate',
                    'equals_sign_meaning',   // "15 + 7 = ? + 12" type questions
                    'inverse_operations'
                ],
                max_value: 5000,
                factor_range: [1, 200],
                square_range: [1, 15],      // Squares up to 225
                cube_range: [1, 7],         // Cubes up to 343
                simple_fractions: ['1/2', '1/3', '1/4', '1/5', '1/10', '2/3', '3/4'],
                rate_units: [['km', 'h'], ['m', 's'], ['£', 'item'], ['litres', 'km']],
                operations_count: [2, 3],
                context_types: ['objects', 'money', 'measures', 'speed', 'density'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                equals_sign_focus: true
            },
            3: {
                // Meeting: All properties, 3-4 operations, varied fractions/rates
                operations: [
                    'factor_problems',
                    'multiple_problems',
                    'square_cube_problems',
                    'prime_factor_problems',
                    'three_operation_problems',
                    'four_operation_problems',  // All four operations combined
                    'fraction_scaling',
                    'simple_rate',
                    'compound_rate',            // "Speed changes: 50 mph for 2h, then 60 mph for 1h"
                    'equals_sign_meaning',
                    'inverse_operations',
                    'associative_property'      // "(2 × 3) × 4 = 2 × (3 × 4)"
                ],
                max_value: 10000,
                factor_range: [1, 500],
                square_range: [1, 20],      // Squares up to 400
                cube_range: [1, 10],        // Cubes up to 1000
                simple_fractions: ['1/2', '1/3', '1/4', '1/5', '1/10', '2/3', '3/4', '2/5', '3/5'],
                rate_units: [['km', 'h'], ['m', 's'], ['£', 'item'], ['litres', 'km'], ['pages', 'min']],
                operations_count: [3, 4],
                context_types: ['objects', 'money', 'measures', 'speed', 'density', 'area'],
                question_format: 'text_input',
                equals_sign_focus: true
            },
            4: {
                // Exceeding: Complex multi-step, all properties, challenging fractions/rates
                operations: [
                    'factor_problems',
                    'multiple_problems',
                    'square_cube_problems',
                    'prime_factor_problems',
                    'three_operation_problems',
                    'four_operation_problems',
                    'fraction_scaling',
                    'fraction_of_fraction',     // "1/2 of 3/4 of 60"
                    'simple_rate',
                    'compound_rate',
                    'equals_sign_meaning',
                    'inverse_operations',
                    'associative_property',
                    'distributive_with_fractions', // "1/2 × (20 + 16)"
                    'multi_step_reasoning'      // Requires multiple deductions
                ],
                max_value: 100000,
                factor_range: [1, 1000],
                square_range: [1, 25],      // Squares up to 625
                cube_range: [1, 12],        // Cubes up to 1728
                simple_fractions: ['1/2', '1/3', '1/4', '1/5', '1/10', '2/3', '3/4', '2/5', '3/5', '4/5'],
                rate_units: [['km', 'h'], ['m', 's'], ['£', 'item'], ['litres', 'km'], ['pages', 'min'], ['ml', 'min']],
                operations_count: [3, 4, 5],
                context_types: ['objects', 'money', 'measures', 'speed', 'density', 'area', 'volume'],
                question_format: 'text_input',
                equals_sign_focus: true
            }
        }
    },

    'C08_Y6_CALC': {
        id: 'C08_Y6_CALC',
        name: 'C08_Y6_CALC: Multi-Step Problems with All Operations',
        description: 'Solve problems involving addition, subtraction, multiplication and division',
        icon: '✖️',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'solve problems (commutative, associative, distributive and all four operations)',
        ref: 'C8',
        parameters: {
            1: {
                // Beginning: 2-3 step problems, integers up to 10,000
                operations: [
                    'two_step_mixed',        // Two different operations
                    'three_step_mixed',      // Three operations
                    'ratio_problems',        // "Ratio 3:2, total 50, find parts"
                    'proportion_problems',   // "If 3 items cost £12, what do 7 cost?"
                    'percentage_problems',   // "20% of 150"
                    'area_perimeter'         // Combined area/perimeter problems
                ],
                max_value: 10000,
                operations_count: [2, 3],
                decimal_places: 0,          // Integers only at L1
                context_types: ['objects', 'money', 'measures', 'area', 'volume'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                ratio_types: ['part:part', 'part:whole'],
                percentage_range: [10, 50]  // Simple percentages
            },
            2: {
                // Developing: 3 step problems, decimals to 2dp, more contexts
                operations: [
                    'two_step_mixed',
                    'three_step_mixed',
                    'ratio_problems',
                    'proportion_problems',
                    'percentage_problems',
                    'area_perimeter',
                    'volume_problems',       // Calculate volume, then use it
                    'decimal_operations',    // Mix operations with decimals
                    'fraction_decimal_mix'   // Convert and calculate
                ],
                max_value: 100000,
                operations_count: [2, 3],
                decimal_places: 2,
                context_types: ['objects', 'money', 'measures', 'area', 'volume', 'speed'],
                question_format: 'multiple_choice',
                distractor_count: 3,
                ratio_types: ['part:part', 'part:whole'],
                percentage_range: [5, 75]
            },
            3: {
                // Meeting: 3-4 step problems, all number types, complex contexts
                operations: [
                    'two_step_mixed',
                    'three_step_mixed',
                    'four_step_mixed',       // Four operations
                    'ratio_problems',
                    'proportion_problems',
                    'percentage_problems',
                    'percentage_increase_decrease', // "Increase 80 by 15%"
                    'area_perimeter',
                    'volume_problems',
                    'decimal_operations',
                    'fraction_decimal_mix',
                    'mixed_units',           // Convert units mid-problem
                    'inverse_proportion'     // "Inverse relationship between speed and time"
                ],
                max_value: 1000000,
                operations_count: [3, 4],
                decimal_places: 2,
                context_types: ['objects', 'money', 'measures', 'area', 'volume', 'speed', 'density'],
                question_format: 'text_input',
                ratio_types: ['part:part', 'part:whole', 'compound'],
                percentage_range: [1, 100],
                allow_negative_results: false  // Results stay positive
            },
            4: {
                // Exceeding: 4-5 step complex problems, all concepts
                operations: [
                    'three_step_mixed',
                    'four_step_mixed',
                    'five_step_mixed',       // Five operations
                    'ratio_problems',
                    'proportion_problems',
                    'percentage_problems',
                    'percentage_increase_decrease',
                    'compound_percentage',   // "Increase by 10%, then decrease by 5%"
                    'area_perimeter',
                    'volume_problems',
                    'decimal_operations',
                    'fraction_decimal_mix',
                    'mixed_units',
                    'inverse_proportion',
                    'algebraic_thinking',    // "If x + 12 = 3x - 8, find x"
                    'multi_step_reasoning',  // Requires inference and deduction
                    'best_buy_problems'      // "Which is better value?"
                ],
                max_value: 10000000,
                operations_count: [3, 4, 5],
                decimal_places: 2,
                context_types: ['objects', 'money', 'measures', 'area', 'volume', 'speed', 'density', 'finance'],
                question_format: 'text_input',
                ratio_types: ['part:part', 'part:whole', 'compound'],
                percentage_range: [1, 200],  // Include > 100%
                allow_negative_results: false
            }
        }
    }
};
