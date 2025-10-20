/**
 * C09 Module Series: Order of Operations
 * Use knowledge of the order of operations to carry out calculations involving the four operations
 * Year 6 only - BIDMAS/BODMAS
 *
 * Key Design Principles:
 * - Progressive introduction of BIDMAS/BODMAS rules
 * - Start with simple two-operation expressions
 * - Build to complex nested parentheses
 * - Test both calculation and understanding of order
 * - Use appropriate number ranges for mental calculation
 */

export const C09_MODULES = {
    'C09_Y6_CALC': {
        id: 'C09_Y6_CALC',
        name: 'C09_Y6_CALC: Order of Operations (BIDMAS/BODMAS)',
        description: 'Use their knowledge of the order of operations to carry out calculations involving the four operations',
        icon: '🔢',
        yearGroup: 'Year 6',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'order of operations',
        ref: 'C9',
        parameters: {
            1: {
                // Beginning: Simple two-operation expressions
                // Focus: Understanding that × and ÷ come before + and −
                operations: [
                    'simple_two_operation',      // e.g., 3 + 4 × 2 = 11
                    'two_operation_division',    // e.g., 12 ÷ 3 + 5 = 9
                    'order_identification',      // "Which operation first: 5 + 3 × 2?"
                    'simple_parentheses',        // e.g., (3 + 4) × 2 = 14
                    'parentheses_comparison'     // Compare 3 + 4 × 2 vs (3 + 4) × 2
                ],
                number_range: [1, 12],          // Small numbers for mental calculation
                max_result: 100,                // Keep results manageable
                operation_types: ['+', '-', '×', '÷'],
                allow_negative_results: false,  // No negatives at Level 1
                max_operations: 2,              // Only 2 operations per expression
                parentheses_depth: 1,           // Simple single-level parentheses
                question_format: 'multiple_choice',
                distractor_count: 3,
                division_exact_only: true       // Only exact divisions
            },
            2: {
                // Developing: Three operations with clear precedence
                // Focus: Multiple operations, understanding left-to-right for equal precedence
                operations: [
                    'simple_two_operation',
                    'two_operation_division',
                    'three_operation_mixed',     // e.g., 12 ÷ 3 + 5 × 2 = 14
                    'order_identification',
                    'simple_parentheses',
                    'parentheses_comparison',
                    'left_to_right_rule',        // e.g., 20 ÷ 4 × 5 (left-to-right)
                    'multiple_same_precedence'   // e.g., 8 + 3 - 2 + 5
                ],
                number_range: [1, 20],
                max_result: 150,
                operation_types: ['+', '-', '×', '÷'],
                allow_negative_results: false,
                max_operations: 3,              // Up to 3 operations
                parentheses_depth: 1,
                question_format: 'multiple_choice',
                distractor_count: 3,
                division_exact_only: true
            },
            3: {
                // Meeting: Expressions with parentheses and multiple operations
                // Focus: Using BIDMAS/BODMAS systematically, nested operations
                operations: [
                    'three_operation_mixed',
                    'four_operation_mixed',      // All four operations
                    'order_identification',
                    'simple_parentheses',
                    'complex_parentheses',       // e.g., 20 - (5 + 3) × 2
                    'parentheses_comparison',
                    'left_to_right_rule',
                    'multiple_same_precedence',
                    'nested_parentheses_simple', // e.g., (10 + (3 × 2)) ÷ 4
                    'missing_parentheses'        // "Add parentheses to make this true: 3 + 4 × 2 = 14"
                ],
                number_range: [1, 25],
                max_result: 200,
                operation_types: ['+', '-', '×', '÷'],
                allow_negative_results: false,
                max_operations: 4,              // Up to 4 operations
                parentheses_depth: 2,           // Nested parentheses
                question_format: 'text_input',
                division_exact_only: true
            },
            4: {
                // Exceeding: Complex expressions with nested parentheses and all operations
                // Focus: Systematic application of BIDMAS/BODMAS to challenging expressions
                operations: [
                    'four_operation_mixed',
                    'complex_parentheses',
                    'nested_parentheses_simple',
                    'nested_parentheses_complex', // e.g., ((15 - 3) ÷ 4 + 2) × 3
                    'missing_parentheses',
                    'order_identification',
                    'left_to_right_rule',
                    'error_spotting',            // "What's wrong with this calculation?"
                    'multi_step_complex'         // e.g., 50 - (12 ÷ 3 + 2) × 4
                ],
                number_range: [1, 30],
                max_result: 300,
                operation_types: ['+', '-', '×', '÷'],
                allow_negative_results: true,   // Allow negative results at Level 4
                max_operations: 5,              // Up to 5 operations
                parentheses_depth: 3,           // Multiple levels of nesting
                question_format: 'text_input',
                division_exact_only: false,     // Can have remainders/decimals
                allow_decimals: true            // Results can be decimals
            }
        }
    }
};
