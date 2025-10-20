/**
 * Year 6 Order of Operations Generator
 *
 * Module: C09_Y6_CALC - "Use their knowledge of the order of operations to carry out
 *                        calculations involving the four operations"
 *
 * This generator focuses on:
 * - Applying BIDMAS/BODMAS rules (Brackets, Indices, Division/Multiplication, Addition/Subtraction)
 * - Evaluating expressions with multiple operations
 * - Using parentheses to control operation order
 * - Understanding left-to-right rule for equal precedence
 * - Identifying which operation to perform first
 */

import {
    randomInt,
    randomChoice,
    shuffle
} from './helpers/N02_numberHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'simple_two_operation':
            return generateSimpleTwoOperation(params, level);
        case 'two_operation_division':
            return generateTwoOperationDivision(params, level);
        case 'three_operation_mixed':
            return generateThreeOperationMixed(params, level);
        case 'four_operation_mixed':
            return generateFourOperationMixed(params, level);
        case 'order_identification':
            return generateOrderIdentification(params, level);
        case 'simple_parentheses':
            return generateSimpleParentheses(params, level);
        case 'complex_parentheses':
            return generateComplexParentheses(params, level);
        case 'parentheses_comparison':
            return generateParenthesesComparison(params, level);
        case 'left_to_right_rule':
            return generateLeftToRightRule(params, level);
        case 'multiple_same_precedence':
            return generateMultipleSamePrecedence(params, level);
        case 'nested_parentheses_simple':
            return generateNestedParenthesesSimple(params, level);
        case 'nested_parentheses_complex':
            return generateNestedParenthesesComplex(params, level);
        case 'missing_parentheses':
            return generateMissingParentheses(params, level);
        case 'error_spotting':
            return generateErrorSpotting(params, level);
        case 'multi_step_complex':
            return generateMultiStepComplex(params, level);
        default:
            return generateSimpleTwoOperation(params, level);
    }
}

/**
 * Helper: Evaluate an expression following BIDMAS/BODMAS
 * Simple implementation for our generated expressions
 */
function evaluateExpression(expr) {
    // Replace × with * and ÷ with / for JavaScript eval
    const jsExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
    try {
        const result = eval(jsExpr);
        return Math.round(result * 100) / 100; // Round to 2 decimal places
    } catch(e) {
        console.error('Error evaluating expression:', expr, e);
        return 0;
    }
}

/**
 * Helper: Generate a simple multiplication or division that gives whole numbers
 */
function generateExactDivision(min, max) {
    const divisor = randomInt(2, Math.min(12, max));
    const quotient = randomInt(1, Math.floor(max / divisor));
    return { dividend: divisor * quotient, divisor, quotient };
}

/**
 * Helper: Generate distractors based on common errors
 */
function generateOrderDistractors(correctAnswer, expression, count = 3) {
    const distractors = new Set();

    // Distractor 1: Calculate left to right without order of operations
    const leftToRight = evaluateLeftToRight(expression);
    if (leftToRight !== correctAnswer && leftToRight > 0) {
        distractors.add(leftToRight);
    }

    // Distractor 2: Do addition/subtraction first (reverse order)
    const wrongOrder = evaluateWrongOrder(expression);
    if (wrongOrder !== correctAnswer && wrongOrder > 0 && wrongOrder !== leftToRight) {
        distractors.add(wrongOrder);
    }

    // Add more distractors if needed
    while (distractors.size < count) {
        const offset = randomChoice([-2, -1, 1, 2, 3, -3, 5, -5, 10]);
        const distractor = correctAnswer + offset;
        if (distractor > 0 && distractor !== correctAnswer) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, count);
}

/**
 * Helper: Evaluate expression strictly left to right (common error)
 */
function evaluateLeftToRight(expr) {
    // This is a simplified version - just for generating distractors
    const jsExpr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\(/g, '').replace(/\)/g, '');
    const parts = jsExpr.split(/([+\-*/])/);

    if (parts.length < 3) return null;

    let result = parseFloat(parts[0]);
    for (let i = 1; i < parts.length; i += 2) {
        const op = parts[i];
        const num = parseFloat(parts[i + 1]);

        if (op === '+') result += num;
        else if (op === '-') result -= num;
        else if (op === '*') result *= num;
        else if (op === '/') result /= num;
    }

    return Math.round(result * 100) / 100;
}

/**
 * Helper: Evaluate with wrong order (addition/subtraction first)
 */
function evaluateWrongOrder(expr) {
    // Try to do + and - first, then × and ÷
    // Simplified for distractor generation
    const wrongExpr = expr.replace(/(\d+)\s*([+\-])\s*(\d+)/, (match, a, op, b) => {
        const result = op === '+' ? (parseInt(a) + parseInt(b)) : (parseInt(a) - parseInt(b));
        return result.toString();
    });

    if (wrongExpr === expr) return null;
    return evaluateExpression(wrongExpr);
}

/**
 * OPERATION 1: Simple Two-Operation
 * Basic expressions with multiplication/division and addition/subtraction
 * Example: 3 + 4 × 2 = 11 (not 14)
 */
function generateSimpleTwoOperation(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    // Generate: a + b × c or a - b × c
    const a = randomInt(min, max);
    const b = randomInt(2, Math.min(10, max));
    const c = randomInt(2, Math.min(10, max));

    const highOp = randomChoice(['×', '÷']);
    const lowOp = randomChoice(['+', '-']);

    let expression, answer;

    if (highOp === '×') {
        expression = `${a} ${lowOp} ${b} × ${c}`;
        answer = lowOp === '+' ? (a + b * c) : (a - b * c);
    } else {
        // For division, ensure exact result
        const { dividend, divisor, quotient } = generateExactDivision(min, max);
        expression = `${a} ${lowOp} ${dividend} ÷ ${divisor}`;
        answer = lowOp === '+' ? (a + quotient) : (a - quotient);
    }

    // Skip if result is negative and not allowed
    if (answer < 0 && !params.allow_negative_results) {
        return generateSimpleTwoOperation(params, level);
    }

    if (params.question_format === 'multiple_choice') {
        const distractors = generateOrderDistractors(answer, expression, 3);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `Calculate: ${expression}`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: 'Remember: Multiply and divide before adding and subtracting',
            module: 'C09_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate: ${expression}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Remember BIDMAS: Multiplication and division before addition and subtraction',
            module: 'C09_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Two-Operation Division
 * Focus on division with addition/subtraction
 * Example: 12 ÷ 3 + 5 = 9
 */
function generateTwoOperationDivision(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const { dividend, divisor, quotient } = generateExactDivision(min, max);
    const b = randomInt(min, max);
    const lowOp = randomChoice(['+', '-']);

    const expression = `${dividend} ÷ ${divisor} ${lowOp} ${b}`;
    const answer = lowOp === '+' ? (quotient + b) : (quotient - b);

    if (answer < 0 && !params.allow_negative_results) {
        return generateTwoOperationDivision(params, level);
    }

    if (params.question_format === 'multiple_choice') {
        const distractors = generateOrderDistractors(answer, expression, 3);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `Calculate: ${expression}`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: 'Do the division first, then add or subtract',
            module: 'C09_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate: ${expression}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Division comes before addition and subtraction',
            module: 'C09_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Three-Operation Mixed
 * Three operations requiring careful order
 * Example: 12 ÷ 3 + 5 × 2 = 14
 */
function generateThreeOperationMixed(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    // Generate: a ÷ b + c × d
    const { dividend: a, divisor: b, quotient: q1 } = generateExactDivision(min, max);
    const c = randomInt(2, Math.min(10, max));
    const d = randomInt(2, Math.min(10, max));

    const expression = `${a} ÷ ${b} + ${c} × ${d}`;
    const answer = q1 + (c * d);

    if (answer > params.max_result) {
        return generateThreeOperationMixed(params, level);
    }

    if (params.question_format === 'multiple_choice') {
        const distractors = generateOrderDistractors(answer, expression, 3);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `Calculate: ${expression}`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: 'Do division and multiplication first (left to right), then addition',
            module: 'C09_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate: ${expression}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'BIDMAS: Division and multiplication before addition',
            module: 'C09_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Four-Operation Mixed
 * All four operations in one expression
 * Example: 20 - 12 ÷ 3 + 2 × 4 = 24
 */
function generateFourOperationMixed(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max * 2);
    const { dividend: b, divisor: c, quotient: q } = generateExactDivision(min, max);
    const d = randomInt(2, Math.min(10, max));
    const e = randomInt(2, Math.min(10, max));

    const expression = `${a} - ${b} ÷ ${c} + ${d} × ${e}`;
    const answer = a - q + (d * e);

    if (answer < 0 && !params.allow_negative_results) {
        return generateFourOperationMixed(params, level);
    }

    if (answer > params.max_result) {
        return generateFourOperationMixed(params, level);
    }

    if (params.question_format === 'multiple_choice') {
        const distractors = generateOrderDistractors(answer, expression, 3);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `Calculate: ${expression}`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: 'Do division and multiplication first, then subtraction and addition from left to right',
            module: 'C09_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate: ${expression}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Remember: Division and multiplication before addition and subtraction',
            module: 'C09_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 5: Order Identification
 * Test understanding: which operation to do first?
 * Example: "In 5 + 3 × 2, which operation do you calculate first?"
 */
function generateOrderIdentification(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const expressions = [
        {
            expr: `${randomInt(min, max)} + ${randomInt(2, 10)} × ${randomInt(2, 10)}`,
            answer: 'multiplication',
            hint: 'Multiplication comes before addition'
        },
        {
            expr: `${randomInt(min, max)} - ${randomInt(2, 10)} ÷ ${randomInt(2, 5)}`,
            answer: 'division',
            hint: 'Division comes before subtraction'
        },
        {
            expr: `(${randomInt(min, max)} + ${randomInt(min, max)}) × ${randomInt(2, 10)}`,
            answer: 'addition',
            hint: 'Brackets first - do the addition inside the brackets'
        },
        {
            expr: `${randomInt(min, max)} × ${randomInt(2, 10)} + ${randomInt(min, max)}`,
            answer: 'multiplication',
            hint: 'Multiplication before addition'
        }
    ];

    const selected = randomChoice(expressions);

    const operationNames = {
        'multiplication': 'multiplication',
        'division': 'division',
        'addition': 'addition',
        'subtraction': 'subtraction'
    };

    // Create options
    const allOperations = ['addition', 'subtraction', 'multiplication', 'division'];
    const options = shuffle(allOperations);

    return {
        text: `In the expression ${selected.expr}, which operation should you calculate first?`,
        type: 'multiple_choice',
        options: options,
        answer: selected.answer,
        hint: selected.hint,
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Simple Parentheses
 * Using parentheses to control order
 * Example: (3 + 4) × 2 = 14
 */
function generateSimpleParentheses(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max);
    const b = randomInt(min, max);
    const c = randomInt(2, Math.min(10, max));

    const innerOp = randomChoice(['+', '-']);
    const outerOp = randomChoice(['×', '÷']);

    let expression, answer;

    if (outerOp === '×') {
        expression = `(${a} ${innerOp} ${b}) × ${c}`;
        const innerResult = innerOp === '+' ? (a + b) : (a - b);
        answer = innerResult * c;
    } else {
        // For division, ensure (a op b) is divisible by c
        const innerResult = randomInt(1, max);
        const divisibleResult = innerResult * c;
        // Work backwards to create a + b = divisibleResult
        const tempB = randomInt(1, divisibleResult - 1);
        const tempA = divisibleResult - tempB;

        expression = `(${tempA} + ${tempB}) ÷ ${c}`;
        answer = innerResult;
    }

    if (answer < 0 && !params.allow_negative_results) {
        return generateSimpleParentheses(params, level);
    }

    if (params.question_format === 'multiple_choice') {
        const distractors = generateOrderDistractors(answer, expression, 3);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `Calculate: ${expression}`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: 'Brackets first: calculate what\'s inside the brackets, then multiply or divide',
            module: 'C09_Y6_CALC',
            level: level
        };
    } else {
        return {
            text: `Calculate: ${expression}`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Brackets first in BIDMAS',
            module: 'C09_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Complex Parentheses
 * Parentheses with multiple operations
 * Example: 20 - (5 + 3) × 2 = 4
 */
function generateComplexParentheses(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max * 2);
    const b = randomInt(min, max);
    const c = randomInt(min, max);
    const d = randomInt(2, Math.min(10, max));

    const innerOp = randomChoice(['+', '-']);
    const outerOpLeft = randomChoice(['+', '-']);
    const outerOpRight = '×';

    const expression = `${a} ${outerOpLeft} (${b} ${innerOp} ${c}) × ${d}`;
    const innerResult = innerOp === '+' ? (b + c) : (b - c);
    const multResult = innerResult * d;
    const answer = outerOpLeft === '+' ? (a + multResult) : (a - multResult);

    if (answer < 0 && !params.allow_negative_results) {
        return generateComplexParentheses(params, level);
    }

    if (answer > params.max_result) {
        return generateComplexParentheses(params, level);
    }

    return {
        text: `Calculate: ${expression}`,
        type: params.question_format === 'multiple_choice' ? 'multiple_choice' : 'text_input',
        options: params.question_format === 'multiple_choice' ?
            shuffle([answer, ...generateOrderDistractors(answer, expression, 3)]) : undefined,
        answer: answer.toString(),
        hint: 'Do brackets first, then multiplication, then addition/subtraction',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Parentheses Comparison
 * Compare expressions with and without parentheses
 * Example: Compare 3 + 4 × 2 and (3 + 4) × 2
 */
function generateParenthesesComparison(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max);
    const b = randomInt(min, max);
    const c = randomInt(2, Math.min(10, max));

    const expr1 = `${a} + ${b} × ${c}`;
    const answer1 = a + (b * c);

    const expr2 = `(${a} + ${b}) × ${c}`;
    const answer2 = (a + b) * c;

    const text = `Which expression gives the larger answer: ${expr1} or ${expr2}?`;

    const correctAnswer = answer1 > answer2 ? expr1 : (answer2 > answer1 ? expr2 : 'they are equal');

    return {
        text: text,
        type: 'multiple_choice',
        options: shuffle([expr1, expr2, 'they are equal']),
        answer: correctAnswer,
        hint: `${expr1} = ${answer1}, ${expr2} = ${answer2}`,
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Left-to-Right Rule
 * Operations of equal precedence go left to right
 * Example: 20 ÷ 4 × 5 = 25 (not 1)
 */
function generateLeftToRightRule(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const operationType = randomChoice(['mult_div', 'add_sub']);

    if (operationType === 'mult_div') {
        const { dividend, divisor, quotient } = generateExactDivision(min, max);
        const mult = randomInt(2, Math.min(10, max));

        const expression = `${dividend} ÷ ${divisor} × ${mult}`;
        const answer = quotient * mult;

        // Common error: doing division last
        const wrongAnswer = Math.floor(dividend / (divisor * mult));
        const distractors = [wrongAnswer, answer + randomInt(1, 5), answer - randomInt(1, 3)]
            .filter(d => d !== answer && d > 0)
            .slice(0, 3);

        return {
            text: `Calculate: ${expression}`,
            type: params.question_format === 'multiple_choice' ? 'multiple_choice' : 'text_input',
            options: params.question_format === 'multiple_choice' ?
                shuffle([answer, ...distractors.slice(0, 3)]) : undefined,
            answer: answer.toString(),
            hint: 'Division and multiplication have equal priority - work left to right',
            module: 'C09_Y6_CALC',
            level: level
        };
    } else {
        const a = randomInt(min, max * 2);
        const b = randomInt(min, max);
        const c = randomInt(min, max);

        const expression = `${a} + ${b} - ${c}`;
        const answer = a + b - c;

        return {
            text: `Calculate: ${expression}`,
            type: params.question_format === 'multiple_choice' ? 'multiple_choice' : 'text_input',
            options: params.question_format === 'multiple_choice' ?
                shuffle([answer, a - b + c, a - b - c, a + b + c].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 4)) : undefined,
            answer: answer.toString(),
            hint: 'Addition and subtraction have equal priority - work left to right',
            module: 'C09_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 10: Multiple Same Precedence
 * Several operations at the same level
 * Example: 8 + 3 - 2 + 5 = 14
 */
function generateMultipleSamePrecedence(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max);
    const b = randomInt(min, max);
    const c = randomInt(min, max);
    const d = randomInt(min, max);

    const op1 = randomChoice(['+', '-']);
    const op2 = randomChoice(['+', '-']);
    const op3 = randomChoice(['+', '-']);

    const expression = `${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`;
    const answer = evaluateExpression(expression);

    if (answer < 0 && !params.allow_negative_results) {
        return generateMultipleSamePrecedence(params, level);
    }

    return {
        text: `Calculate: ${expression}`,
        type: params.question_format === 'multiple_choice' ? 'multiple_choice' : 'text_input',
        options: params.question_format === 'multiple_choice' ?
            shuffle([answer, ...generateOrderDistractors(answer, expression, 3)]) : undefined,
        answer: answer.toString(),
        hint: 'Work from left to right when all operations are addition and subtraction',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 11: Nested Parentheses Simple
 * Two levels of parentheses
 * Example: (10 + (3 × 2)) ÷ 4 = 4
 */
function generateNestedParenthesesSimple(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max);
    const b = randomInt(2, Math.min(10, max));
    const c = randomInt(2, Math.min(10, max));

    const innerResult = b * c;
    const middleResult = a + innerResult;

    // Ensure divisibility
    const divisor = randomInt(2, Math.min(6, max));
    const adjustedA = (divisor * randomInt(2, 10)) - innerResult;

    const expression = `(${adjustedA} + (${b} × ${c})) ÷ ${divisor}`;
    const answer = Math.floor((adjustedA + innerResult) / divisor);

    if (answer < 1) {
        return generateNestedParenthesesSimple(params, level);
    }

    return {
        text: `Calculate: ${expression}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: 'Start with the innermost brackets, work outwards',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 12: Nested Parentheses Complex
 * Multiple levels of nesting with all operations
 * Example: ((15 - 3) ÷ 4 + 2) × 3 = 15
 */
function generateNestedParenthesesComplex(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max);
    const b = randomInt(min, Math.floor(a * 0.8));
    const { dividend, divisor, quotient } = generateExactDivision(2, 10);
    const d = randomInt(1, max);
    const e = randomInt(2, Math.min(10, max));

    // Adjust a to be divisible after subtracting b
    const adjustedA = (dividend / divisor) * divisor + b;

    const expression = `((${adjustedA} - ${b}) ÷ ${divisor} + ${d}) × ${e}`;
    const answer = (quotient + d) * e;

    if (answer > params.max_result) {
        return generateNestedParenthesesComplex(params, level);
    }

    return {
        text: `Calculate: ${expression}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: 'Work from innermost brackets outwards, following BIDMAS at each step',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 13: Missing Parentheses
 * Add parentheses to make expression true
 * Example: "Add parentheses to make this true: 3 + 4 × 2 = 14"
 */
function generateMissingParentheses(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max);
    const b = randomInt(min, max);
    const c = randomInt(2, Math.min(10, max));

    const target = (a + b) * c;
    const expression = `${a} + ${b} × ${c}`;

    const options = [
        `(${a} + ${b}) × ${c}`,
        `${a} + (${b} × ${c})`,
        `(${a}) + ${b} × ${c}`,
        `${a} + ${b} × (${c})`
    ];

    return {
        text: `Which expression equals ${target}?`,
        type: 'multiple_choice',
        options: shuffle(options),
        answer: `(${a} + ${b}) × ${c}`,
        hint: 'Try each option and see which gives the target value',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 14: Error Spotting
 * Identify which BIDMAS rule was not followed
 * Example: "Which BIDMAS rule was NOT followed in: 5 + 3 × 2 = 16"
 */
function generateErrorSpotting(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max);
    const b = randomInt(2, Math.min(10, max));
    const c = randomInt(2, Math.min(10, max));

    const correctAnswer = a + (b * c);
    const wrongAnswer = (a + b) * c; // Common error: doing left to right

    const expression = `${a} + ${b} × ${c} = ${wrongAnswer}`;

    const errors = [
        'multiplication must be done before addition',
        'addition must be done before multiplication',
        'the calculation must be done from right to left',
        'there is no error - this is correct'
    ];

    return {
        text: `This calculation is incorrect: ${expression}. Which BIDMAS rule was NOT followed?`,
        type: 'multiple_choice',
        options: shuffle(errors),
        answer: 'multiplication must be done before addition',
        hint: `Using BIDMAS correctly: ${a} + ${b} × ${c} = ${a} + ${b * c} = ${correctAnswer}`,
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 15: Multi-Step Complex
 * Complex expression requiring systematic application
 * Example: 50 - (12 ÷ 3 + 2) × 4 = 26
 */
function generateMultiStepComplex(params, level) {
    const [min, max] = [params.number_range[0], params.number_range[1]];

    const a = randomInt(min, max * 2);
    const { dividend, divisor, quotient } = generateExactDivision(min, max);
    const c = randomInt(min, max);
    const d = randomInt(2, Math.min(10, max));

    const expression = `${a} - (${dividend} ÷ ${divisor} + ${c}) × ${d}`;
    const innerResult = quotient + c;
    const answer = a - (innerResult * d);

    if (answer < 0 && !params.allow_negative_results) {
        return generateMultiStepComplex(params, level);
    }

    return {
        text: `Calculate: ${expression}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: 'Step 1: Brackets (division first, then add). Step 2: Multiply. Step 3: Subtract',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C09_Y6_CALC',
    generate: generateQuestion
};
