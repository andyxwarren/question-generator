/**
 * C09: Order of Operations
 * Year 6 only
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C09_Y6_CALC: {
        1: {
            operations: ["simple_two_operation", "order_identification"],
            math: { range: { num: [1, 12] }, config: { maxOps: 2, parentheses: false } },
            presentation: { format: "multiple_choice" }
        },
        2: {
            operations: ["three_operation_mixed", "simple_parentheses"],
            math: { range: { num: [1, 20] }, config: { maxOps: 3, parentheses: true, maxParenthesesDepth: 1, requireMultDiv: true } },
            presentation: { format: "multiple_choice", showHint: true }
        },
        3: {
            operations: ["three_operation_mixed", "complex_parentheses"],
            math: { range: { num: [1, 25] }, config: { maxOps: 4, parentheses: true } },
            presentation: { format: "text_input" }
        },
        4: {
            operations: ["four_plus_operation", "nested_parentheses", "reasoning"],
            math: { range: { num: [1, 50] }, config: { maxOps: 6, parentheses: true, maxParenthesesDepth: 2, requireAllOperations: true } },
            presentation: { format: "text_input", showHint: false, includeReasoning: true }
        }
    }
};

export const C09_MODULES = {
    'C09_Y6_CALC': { id: 'C09_Y6_CALC', name: 'C09_Y6: Order of Ops', ref: 'C9', yearGroup: '6', strand: 'Calculation', substrand: 'Order of operations', parameters: MIGRATED_PARAMS['C09_Y6_CALC'] }
};
