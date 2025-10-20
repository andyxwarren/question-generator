/**
 * Quick validation script to generate sample questions from C09_Y6_CALC
 * Run with: node validate_c09_samples.js
 */

// Simplified random functions for Node.js environment
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Parameters from C09_order.js
const PARAMS = {
    1: {
        operations: ['simple_two_operation', 'two_operation_division', 'order_identification', 'simple_parentheses', 'parentheses_comparison'],
        number_range: [1, 12],
        max_result: 100,
        operation_types: ['+', '-', '×', '÷'],
        allow_negative_results: false,
        max_operations: 2,
        parentheses_depth: 1,
        question_format: 'multiple_choice',
        distractor_count: 3,
        division_exact_only: true
    },
    2: {
        operations: ['simple_two_operation', 'two_operation_division', 'three_operation_mixed', 'order_identification', 'simple_parentheses', 'parentheses_comparison', 'left_to_right_rule', 'multiple_same_precedence'],
        number_range: [1, 20],
        max_result: 150,
        operation_types: ['+', '-', '×', '÷'],
        allow_negative_results: false,
        max_operations: 3,
        parentheses_depth: 1,
        question_format: 'multiple_choice',
        distractor_count: 3,
        division_exact_only: true
    },
    3: {
        operations: ['three_operation_mixed', 'four_operation_mixed', 'order_identification', 'simple_parentheses', 'complex_parentheses', 'parentheses_comparison', 'left_to_right_rule', 'multiple_same_precedence', 'nested_parentheses_simple', 'missing_parentheses'],
        number_range: [1, 25],
        max_result: 200,
        operation_types: ['+', '-', '×', '÷'],
        allow_negative_results: false,
        max_operations: 4,
        parentheses_depth: 2,
        question_format: 'text_input',
        division_exact_only: true
    },
    4: {
        operations: ['four_operation_mixed', 'complex_parentheses', 'nested_parentheses_simple', 'nested_parentheses_complex', 'missing_parentheses', 'order_identification', 'left_to_right_rule', 'error_spotting', 'multi_step_complex'],
        number_range: [1, 30],
        max_result: 300,
        operation_types: ['+', '-', '×', '÷'],
        allow_negative_results: true,
        max_operations: 5,
        parentheses_depth: 3,
        question_format: 'text_input',
        division_exact_only: false,
        allow_decimals: true
    }
};

// Sample question generator
function generateSampleQuestions(level, count) {
    const params = PARAMS[level];
    const samples = [];

    console.log(`\n=== LEVEL ${level} SAMPLES ===`);
    console.log(`Parameters: number_range=[${params.number_range}], max_result=${params.max_result}, max_operations=${params.max_operations}`);
    console.log(`Operations available: ${params.operations.length} types`);
    console.log('');

    for (let i = 0; i < count; i++) {
        const operation = randomChoice(params.operations);

        // Generate simple examples based on operation type
        let sample;
        if (operation === 'simple_two_operation') {
            const a = randomInt(params.number_range[0], params.number_range[1]);
            const b = randomInt(2, 10);
            const c = randomInt(2, 10);
            sample = {
                text: `Calculate: ${a} + ${b} × ${c}`,
                answer: a + (b * c),
                type: params.question_format,
                operation: operation
            };
        } else if (operation === 'three_operation_mixed') {
            const a = randomInt(12, 24);
            const b = randomInt(2, 4);
            const c = randomInt(2, 5);
            const d = randomInt(2, 3);
            sample = {
                text: `Calculate: ${a} ÷ ${b} + ${c} × ${d}`,
                answer: Math.floor(a/b) + (c * d),
                type: params.question_format,
                operation: operation
            };
        } else if (operation === 'simple_parentheses') {
            const a = randomInt(params.number_range[0], params.number_range[1]);
            const b = randomInt(params.number_range[0], params.number_range[1]);
            const c = randomInt(2, 5);
            sample = {
                text: `Calculate: (${a} + ${b}) × ${c}`,
                answer: (a + b) * c,
                type: params.question_format,
                operation: operation
            };
        } else if (operation === 'order_identification') {
            const a = randomInt(params.number_range[0], params.number_range[1]);
            const b = randomInt(2, 10);
            const c = randomInt(2, 10);
            sample = {
                text: `In the expression ${a} + ${b} × ${c}, which operation should you calculate first?`,
                answer: 'multiplication',
                type: 'multiple_choice',
                operation: operation
            };
        } else {
            sample = {
                text: `[${operation}] - Complex expression`,
                answer: '?',
                type: params.question_format,
                operation: operation
            };
        }

        samples.push(sample);
        console.log(`${i+1}. [${sample.operation}] ${sample.text}`);
        console.log(`   Answer: ${sample.answer} (${sample.type})`);
        console.log('');
    }

    return samples;
}

// Generate samples for all levels
console.log('=============================================');
console.log('C09_Y6_CALC: ORDER OF OPERATIONS');
console.log('Sample Question Generation');
console.log('=============================================');

for (let level = 1; level <= 4; level++) {
    generateSampleQuestions(level, 3);
}

console.log('\n=============================================');
console.log('Validation complete!');
console.log('=============================================\n');
