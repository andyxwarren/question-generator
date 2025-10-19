/**
 * C03 Module Series: Estimation, Inverses and Checking
 * Covers Years 2-6 (Year 1 has no content for C03)
 *
 * Focus: Metacognitive skills for verifying calculations:
 * - Understanding inverse relationships
 * - Using estimation to check reasonableness
 * - Determining appropriate accuracy levels
 */

export const C03_MODULES = {
    'C03_Y2_CALC': {
        id: 'C03_Y2_CALC',
        name: 'C03_Y2_CALC: Inverse Relationships',
        description: 'Recognise and use the inverse relationship between addition and subtraction and use this to check calculations and missing number problems',
        icon: '🔍',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'estimate, use inverses and check',
        ref: 'C3',
        parameters: {
            1: {
                // Beginning: Simple inverse relationships to 20
                min_value: 1,
                max_value: 20,
                operations: [
                    'identify_inverse_check',  // Which subtraction checks this addition?
                    'missing_number_inverse',  // Use inverse to find missing number
                    'true_false_check'         // Does this check that?
                ],
                fact_family_complete: false,   // Not yet completing full families
                question_formats: ['multiple_choice', 'true_false']
            },
            2: {
                // Developing: Extend to larger numbers, more complex relationships
                min_value: 1,
                max_value: 50,
                operations: [
                    'identify_inverse_check',
                    'missing_number_inverse',
                    'true_false_check',
                    'complete_fact_family'     // Add fact family completion
                ],
                fact_family_complete: true,
                include_multiples_10: true,    // Include 10, 20, 30, etc.
                question_formats: ['multiple_choice', 'true_false']
            },
            3: {
                // Meeting: Full curriculum range to 100
                min_value: 1,
                max_value: 100,
                operations: [
                    'identify_inverse_check',
                    'missing_number_inverse',
                    'true_false_check',
                    'complete_fact_family',
                    'choose_checking_method'   // Which method checks this best?
                ],
                fact_family_complete: true,
                include_multiples_10: true,
                question_formats: ['multiple_choice', 'true_false']
            },
            4: {
                // Exceeding: Complex missing number problems, multiple steps
                min_value: 1,
                max_value: 100,
                operations: [
                    'identify_inverse_check',
                    'missing_number_inverse',
                    'true_false_check',
                    'complete_fact_family',
                    'choose_checking_method',
                    'two_step_inverse'         // More complex inverse problems
                ],
                fact_family_complete: true,
                include_multiples_10: true,
                allow_two_step: true,
                question_formats: ['multiple_choice', 'true_false']
            }
        }
    },

    'C03_Y3_CALC': {
        id: 'C03_Y3_CALC',
        name: 'C03_Y3_CALC: Estimation and Inverse Checking',
        description: 'Estimate the answer to a calculation and use inverse operations to check answers',
        icon: '🔍',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'estimate, use inverses and check',
        ref: 'C3',
        parameters: {
            1: {
                // Beginning: Estimate by rounding to nearest 10, simple inverses
                min_value: 10,
                max_value: 100,
                rounding_to: [10],                    // Round to nearest 10 only
                operations: [
                    'estimate_by_rounding',           // Round then calculate
                    'check_with_inverse',             // Use inverse to verify
                    'is_reasonable'                   // Yes/No reasonableness
                ],
                calculation_types: ['addition', 'subtraction'],
                use_3digit: false,                    // Start with 2-digit
                question_formats: ['multiple_choice', 'true_false']
            },
            2: {
                // Developing: Introduce 3-digit numbers, round to 10 and 100
                min_value: 10,
                max_value: 500,
                rounding_to: [10, 100],
                operations: [
                    'estimate_by_rounding',
                    'check_with_inverse',
                    'is_reasonable',
                    'find_error'                      // Identify which calculation is wrong
                ],
                calculation_types: ['addition', 'subtraction'],
                use_3digit: true,
                question_formats: ['multiple_choice', 'true_false']
            },
            3: {
                // Meeting: Full 3-digit range, all operations
                min_value: 10,
                max_value: 999,
                rounding_to: [10, 100],
                operations: [
                    'estimate_by_rounding',
                    'check_with_inverse',
                    'is_reasonable',
                    'find_error',
                    'choose_rounding_place'           // Which rounding is better?
                ],
                calculation_types: ['addition', 'subtraction'],
                use_3digit: true,
                question_formats: ['multiple_choice', 'true_false']
            },
            4: {
                // Exceeding: Complex estimation, multi-step problems
                min_value: 10,
                max_value: 999,
                rounding_to: [10, 100],
                operations: [
                    'estimate_by_rounding',
                    'check_with_inverse',
                    'is_reasonable',
                    'find_error',
                    'choose_rounding_place',
                    'multi_step_check'                // Check multi-step calculations
                ],
                calculation_types: ['addition', 'subtraction'],
                use_3digit: true,
                allow_multi_step: true,
                question_formats: ['multiple_choice', 'true_false']
            }
        }
    },

    'C03_Y4_CALC': {
        id: 'C03_Y4_CALC',
        name: 'C03_Y4_CALC: Estimation with 4-Digit Numbers',
        description: 'Estimate and use inverse operations to check answers to a calculation',
        icon: '🔍',
        yearGroup: 'Year 4',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'estimate, use inverses and check',
        ref: 'C3',
        parameters: {
            1: {
                // Beginning: 4-digit addition/subtraction, round to 1000
                min_value: 100,
                max_value: 5000,
                rounding_to: [100, 1000],
                operations: [
                    'estimate_4digit',                // Estimate 4-digit calculations
                    'check_with_inverse',
                    'is_reasonable'
                ],
                calculation_types: ['addition', 'subtraction'],
                include_multiplication: false,        // Not yet
                multiplication_tables: [2, 5, 10],
                question_formats: ['multiple_choice', 'true_false']
            },
            2: {
                // Developing: Include multiplication/division checking
                min_value: 100,
                max_value: 9999,
                rounding_to: [100, 1000],
                operations: [
                    'estimate_4digit',
                    'check_with_inverse',
                    'is_reasonable',
                    'check_multiply_with_divide',     // Use division to check multiplication
                    'check_divide_with_multiply'      // Use multiplication to check division
                ],
                calculation_types: ['addition', 'subtraction', 'multiplication', 'division'],
                include_multiplication: true,
                multiplication_tables: [2, 3, 4, 5, 8, 10],
                question_formats: ['multiple_choice', 'true_false']
            },
            3: {
                // Meeting: Full range, all calculation types
                min_value: 100,
                max_value: 9999,
                rounding_to: [10, 100, 1000],
                operations: [
                    'estimate_4digit',
                    'check_with_inverse',
                    'is_reasonable',
                    'check_multiply_with_divide',
                    'check_divide_with_multiply',
                    'choose_best_estimate'            // Compare estimation strategies
                ],
                calculation_types: ['addition', 'subtraction', 'multiplication', 'division'],
                include_multiplication: true,
                multiplication_tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                question_formats: ['multiple_choice', 'true_false']
            },
            4: {
                // Exceeding: Complex problems, multiple operations
                min_value: 100,
                max_value: 9999,
                rounding_to: [10, 100, 1000],
                operations: [
                    'estimate_4digit',
                    'check_with_inverse',
                    'is_reasonable',
                    'check_multiply_with_divide',
                    'check_divide_with_multiply',
                    'choose_best_estimate',
                    'multi_operation_check'           // Check calculations with multiple operations
                ],
                calculation_types: ['addition', 'subtraction', 'multiplication', 'division'],
                include_multiplication: true,
                multiplication_tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                allow_multi_step: true,
                question_formats: ['multiple_choice', 'true_false']
            }
        }
    },

    'C03_Y5_CALC': {
        id: 'C03_Y5_CALC',
        name: 'C03_Y5_CALC: Rounding and Contextual Accuracy',
        description: 'Use rounding to check answers to calculations and determine, in the context of a problem, levels of accuracy',
        icon: '🔍',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'estimate, use inverses and check',
        ref: 'C3',
        parameters: {
            1: {
                // Beginning: Round large numbers to check, simple contexts
                min_value: 1000,
                max_value: 50000,
                rounding_to: [10, 100, 1000, 10000],
                operations: [
                    'round_to_check',                 // Use rounding to verify
                    'contextual_measurement',         // Appropriate accuracy for measurement
                    'is_reasonable_context'           // Reasonableness in context
                ],
                contexts: ['measurement', 'counting', 'distance'],
                calculation_types: ['addition', 'subtraction', 'multiplication', 'division'],
                question_formats: ['multiple_choice']
            },
            2: {
                // Developing: More contexts, money and decimals
                min_value: 1000,
                max_value: 100000,
                rounding_to: [10, 100, 1000, 10000],
                operations: [
                    'round_to_check',
                    'contextual_measurement',
                    'is_reasonable_context',
                    'contextual_money',               // Appropriate accuracy for money
                    'detect_error_context'            // Find unreasonable answer in context
                ],
                contexts: ['measurement', 'counting', 'distance', 'money', 'capacity'],
                calculation_types: ['addition', 'subtraction', 'multiplication', 'division'],
                include_decimals: true,               // Simple decimals for money
                question_formats: ['multiple_choice']
            },
            3: {
                // Meeting: Full range to 1,000,000, all contexts
                min_value: 1000,
                max_value: 1000000,
                rounding_to: [10, 100, 1000, 10000, 100000],
                operations: [
                    'round_to_check',
                    'contextual_measurement',
                    'is_reasonable_context',
                    'contextual_money',
                    'detect_error_context',
                    'determine_accuracy_level'        // Choose appropriate accuracy
                ],
                contexts: ['measurement', 'counting', 'distance', 'money', 'capacity', 'mass', 'population'],
                calculation_types: ['addition', 'subtraction', 'multiplication', 'division'],
                include_decimals: true,
                question_formats: ['multiple_choice']
            },
            4: {
                // Exceeding: Complex contextual judgment
                min_value: 1000,
                max_value: 1000000,
                rounding_to: [10, 100, 1000, 10000, 100000],
                operations: [
                    'round_to_check',
                    'contextual_measurement',
                    'is_reasonable_context',
                    'contextual_money',
                    'detect_error_context',
                    'determine_accuracy_level',
                    'compare_accuracy_methods'        // Which rounding is best for this context?
                ],
                contexts: ['measurement', 'counting', 'distance', 'money', 'capacity', 'mass', 'population', 'temperature'],
                calculation_types: ['addition', 'subtraction', 'multiplication', 'division'],
                include_decimals: true,
                allow_complex_context: true,
                question_formats: ['multiple_choice']
            }
        }
    },

    'C03_Y6_CALC': {
        id: 'C03_Y6_CALC',
        name: 'C03_Y6_CALC: Advanced Estimation Strategies',
        description: 'Use estimation to check answers to calculations and determine, in the context of a problem, an appropriate degree of accuracy',
        icon: '🔍',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'estimate, use inverses and check',
        ref: 'C3',
        parameters: {
            1: {
                // Beginning: Multiple estimation strategies, decimal estimation
                min_value: 100,
                max_value: 100000,
                rounding_to: [10, 100, 1000, 10000, 100000],
                operations: [
                    'choose_rounding_strategy',       // Select appropriate method
                    'decimal_estimation',             // Estimate with decimals
                    'contextual_rounding'             // Round up/down based on context
                ],
                contexts: ['measurement', 'money', 'distance', 'capacity', 'mass'],
                include_decimals: true,
                decimal_places: [1, 2],
                question_formats: ['multiple_choice']
            },
            2: {
                // Developing: More complex contexts and strategies
                min_value: 100,
                max_value: 1000000,
                rounding_to: [10, 100, 1000, 10000, 100000],
                operations: [
                    'choose_rounding_strategy',
                    'decimal_estimation',
                    'contextual_rounding',
                    'compare_strategies',             // Which estimation method is better?
                    'determine_appropriate_accuracy'  // What accuracy is needed?
                ],
                contexts: ['measurement', 'money', 'distance', 'capacity', 'mass', 'population', 'area', 'volume'],
                include_decimals: true,
                decimal_places: [1, 2, 3],
                question_formats: ['multiple_choice']
            },
            3: {
                // Meeting: Full curriculum, all strategies
                min_value: 100,
                max_value: 10000000,
                rounding_to: [10, 100, 1000, 10000, 100000, 1000000],
                operations: [
                    'choose_rounding_strategy',
                    'decimal_estimation',
                    'contextual_rounding',
                    'compare_strategies',
                    'determine_appropriate_accuracy',
                    'justify_accuracy_choice'         // Explain why this accuracy is appropriate
                ],
                contexts: ['measurement', 'money', 'distance', 'capacity', 'mass', 'population', 'area', 'volume', 'speed', 'temperature'],
                include_decimals: true,
                decimal_places: [1, 2, 3],
                question_formats: ['multiple_choice']
            },
            4: {
                // Exceeding: Most complex estimation and accuracy judgments
                min_value: 100,
                max_value: 10000000,
                rounding_to: [10, 100, 1000, 10000, 100000, 1000000],
                operations: [
                    'choose_rounding_strategy',
                    'decimal_estimation',
                    'contextual_rounding',
                    'compare_strategies',
                    'determine_appropriate_accuracy',
                    'justify_accuracy_choice',
                    'multi_step_estimation'           // Estimate multi-step calculations
                ],
                contexts: ['measurement', 'money', 'distance', 'capacity', 'mass', 'population', 'area', 'volume', 'speed', 'temperature', 'percentage'],
                include_decimals: true,
                decimal_places: [1, 2, 3],
                allow_multi_step: true,
                question_formats: ['multiple_choice']
            }
        }
    }
};
