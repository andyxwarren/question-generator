/**
 * Year 6 Order of Operations Question Generator
 *
 * Module: C09_Y6_CALC - "Use their knowledge of the order of operations to carry out calculations involving the four operations"
 *
 * BODMAS/PEMDAS order:
 * 1. Brackets
 * 2. Orders (powers, roots)
 * 3. Division and Multiplication (left to right)
 * 4. Addition and Subtraction (left to right)
 *
 * Operations:
 * 1. Two operations (no brackets)
 * 2. Two operations (with brackets)
 * 3. Three operations (with brackets)
 * 4. Four operations (complex)
 * 5. Identify which operation to do first
 * 6. Evaluate expressions
 * 7. Create expressions to match a target
 * 8. Nested brackets
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'two_ops_no_brackets':
            return generateTwoOpsNoBrackets(params, level);
        case 'identify_first_step':
            return generateIdentifyFirstStep(params, level);
        case 'two_ops_with_brackets':
            return generateTwoOpsWithBrackets(params, level);
        case 'three_ops_no_brackets':
            return generateThreeOpsNoBrackets(params, level);
        case 'three_ops_with_brackets':
            return generateThreeOpsWithBrackets(params, level);
        case 'four_ops':
            return generateFourOps(params, level);
        case 'identify_order':
            return generateIdentifyOrder(params, level);
        case 'evaluate':
            return generateEvaluate(params, level);
        case 'create_expression':
            return generateCreateExpression(params, level);
        case 'nested_brackets':
            return generateNestedBrackets(params, level);
        case 'complex_expressions':
            return generateComplexExpression(params, level);
        default:
            return generateTwoOpsNoBrackets(params, level);
    }
}

/**
 * Helper: Evaluate expression following BODMAS
 */
function evaluateExpression(expr) {
    try {
        // Replace symbols for eval
        const jsExpr = expr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\s/g, '');

        // Use Function constructor instead of eval for safety
        return Function(`"use strict"; return (${jsExpr})`)();
    } catch (e) {
        console.error('Error evaluating:', expr, e);
        return null;
    }
}

/**
 * Helper: Generate safe arithmetic expression
 */
function generateSafeExpression(operationCount, useBrackets, includeDiv = false) {
    const ops = includeDiv
        ? ['+', '-', '×', '÷']
        : ['+', '-', '×'];

    let expr = '';
    let values = [];

    // Generate values that won't cause issues
    for (let i = 0; i < operationCount + 1; i++) {
        values.push(randomInt(1, 20));
    }

    if (operationCount === 2) {
        const op1 = randomChoice(ops);
        const op2 = randomChoice(ops);

        if (useBrackets) {
            const bracketPos = randomChoice(['first', 'second']);
            if (bracketPos === 'first') {
                expr = `(${values[0]} ${op1} ${values[1]}) ${op2} ${values[2]}`;
            } else {
                expr = `${values[0]} ${op1} (${values[1]} ${op2} ${values[2]})`;
            }
        } else {
            expr = `${values[0]} ${op1} ${values[1]} ${op2} ${values[2]}`;
        }
    } else if (operationCount === 3) {
        const op1 = randomChoice(ops);
        const op2 = randomChoice(ops);
        const op3 = randomChoice(ops);

        if (useBrackets) {
            const pattern = randomChoice([
                `(${values[0]} ${op1} ${values[1]}) ${op2} ${values[2]} ${op3} ${values[3]}`,
                `${values[0]} ${op1} (${values[1]} ${op2} ${values[2]}) ${op3} ${values[3]}`,
                `${values[0]} ${op1} ${values[1]} ${op2} (${values[2]} ${op3} ${values[3]})`
            ]);
            expr = pattern;
        } else {
            expr = `${values[0]} ${op1} ${values[1]} ${op2} ${values[2]} ${op3} ${values[3]}`;
        }
    } else if (operationCount >= 4) {
        const op1 = randomChoice(ops);
        const op2 = randomChoice(ops);
        const op3 = randomChoice(ops);
        const op4 = randomChoice(ops);

        if (useBrackets) {
            expr = `(${values[0]} ${op1} ${values[1]}) ${op2} (${values[2]} ${op3} ${values[3]}) ${op4} ${values[4]}`;
        } else {
            expr = `${values[0]} ${op1} ${values[1]} ${op2} ${values[2]} ${op3} ${values[3]} ${op4} ${values[4]}`;
        }
    }

    // Ensure division doesn't cause decimals
    if (expr.includes('÷')) {
        // Regenerate if result would be decimal
        const result = evaluateExpression(expr);
        if (result === null || !Number.isInteger(result)) {
            return generateSafeExpression(operationCount, useBrackets, includeDiv);
        }
    }

    const result = evaluateExpression(expr);

    // Ensure reasonable result
    if (result === null || result < 0 || result > 1000 || !Number.isInteger(result)) {
        return generateSafeExpression(operationCount, useBrackets, includeDiv);
    }

    return { expr, result };
}

/**
 * OPERATION 1: Two Operations (No Brackets)
 * Understand that × and ÷ come before + and -
 */
function generateTwoOpsNoBrackets(params, level) {
    const { expr, result } = generateSafeExpression(2, false, params.include_division);

    // Calculate what the answer would be if order was ignored (left to right)
    const wrongAnswers = [];

    // Try different interpretations
    const parts = expr.split(/\s+/);
    if (parts.length === 5) { // num op num op num
        const [a, op1, b, op2, c] = parts;

        // Wrong: left to right
        const leftToRight = evaluateExpression(`(${a} ${op1} ${b}) ${op2} ${c}`);
        if (leftToRight !== result && leftToRight !== null) {
            wrongAnswers.push(leftToRight);
        }

        // Wrong: right to left
        const rightToLeft = evaluateExpression(`${a} ${op1} (${b} ${op2} ${c})`);
        if (rightToLeft !== result && rightToLeft !== null && !wrongAnswers.includes(rightToLeft)) {
            wrongAnswers.push(rightToLeft);
        }
    }

    // Add more distractors
    while (wrongAnswers.length < 3) {
        const dist = result + randomChoice([-1, 1, -2, 2, -5, 5, -10, 10]);
        if (dist > 0 && dist !== result && !wrongAnswers.includes(dist)) {
            wrongAnswers.push(dist);
        }
    }

    const options = shuffle([result, ...wrongAnswers.slice(0, 3)]);

    return {
        text: `Calculate: ${expr}`,
        type: 'multiple_choice',
        options: options,
        answer: result.toString(),
        hint: 'Remember: × and ÷ before + and -',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Identify First Step
 * Which operation should be done first?
 */
function generateIdentifyFirstStep(params, level) {
    const { expr } = generateSafeExpression(2, params.use_brackets, params.include_division);

    // Parse the expression to identify operations
    const operations = [];
    const parts = expr.match(/[\d.]+|[+\-×÷()]|\([^)]+\)/g);

    // Find what should be done first
    let firstStep = '';

    if (expr.includes('(')) {
        // Brackets first
        const bracketContent = expr.match(/\(([^)]+)\)/)[1];
        firstStep = bracketContent;
    } else {
        // Find first × or ÷, otherwise first + or -
        const hasMultDiv = expr.includes('×') || expr.includes('÷');
        if (hasMultDiv) {
            // Find the first multiplication or division
            const match = expr.match(/(\d+\s*[×÷]\s*\d+)/);
            firstStep = match ? match[1].trim() : '';
        } else {
            // Find first operation (left to right)
            const match = expr.match(/(\d+\s*[+\-]\s*\d+)/);
            firstStep = match ? match[1].trim() : '';
        }
    }

    // Generate wrong options
    const allOps = expr.match(/\d+\s*[+\-×÷]\s*\d+/g) || [];
    const wrongOps = allOps.filter(op => op.trim() !== firstStep.trim()).slice(0, 3);

    // Add the bracket content if it exists
    if (expr.includes('(')) {
        const bracketContent = expr.match(/\(([^)]+)\)/)[1];
        const options = shuffle([
            `Calculate: ${bracketContent}`,
            ...wrongOps.map(op => `Calculate: ${op}`)
        ]);

        return {
            text: `What should you calculate first in this expression?\n${expr}`,
            type: 'multiple_choice',
            options: options.slice(0, 4),
            answer: `Calculate: ${bracketContent}`,
            hint: 'Brackets first, then × and ÷, then + and -',
            module: 'C09_Y6_CALC',
            level: level
        };
    } else {
        const options = shuffle([firstStep, ...wrongOps]);

        return {
            text: `Which operation should you do first?\n${expr}`,
            type: 'multiple_choice',
            options: options.slice(0, 4),
            answer: firstStep,
            hint: '× and ÷ before + and -',
            module: 'C09_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Two Operations With Brackets
 * Brackets change the order
 */
function generateTwoOpsWithBrackets(params, level) {
    const { expr, result } = generateSafeExpression(2, true, params.include_division);

    // Generate version without brackets
    const noBrackets = expr.replace(/[()]/g, '');
    const noBracketsResult = evaluateExpression(noBrackets);

    const wrongAnswers = [];
    if (noBracketsResult !== null && noBracketsResult !== result) {
        wrongAnswers.push(noBracketsResult);
    }

    // Add more distractors
    while (wrongAnswers.length < 3) {
        const dist = result + randomChoice([-1, 1, -2, 2, -5, 5, -10, 10]);
        if (dist > 0 && dist !== result && !wrongAnswers.includes(dist)) {
            wrongAnswers.push(dist);
        }
    }

    const options = shuffle([result, ...wrongAnswers.slice(0, 3)]);

    return {
        text: `Calculate: ${expr}`,
        type: 'multiple_choice',
        options: options,
        answer: result.toString(),
        hint: 'Do the calculation in brackets first',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Three Operations (No Brackets)
 * More complex BODMAS
 */
function generateThreeOpsNoBrackets(params, level) {
    const { expr, result } = generateSafeExpression(3, false, params.include_division);

    const wrongAnswers = [];

    // Wrong: strict left to right
    const parts = expr.split(/\s+/);
    if (parts.length === 7) {
        const [a, op1, b, op2, c, op3, d] = parts;
        const leftToRight = evaluateExpression(`((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`);
        if (leftToRight !== null && leftToRight !== result && leftToRight > 0) {
            wrongAnswers.push(leftToRight);
        }
    }

    // Add more distractors
    while (wrongAnswers.length < 3) {
        const dist = result + randomChoice([-1, 1, -2, 2, -5, 5, -10, 10, -20, 20]);
        if (dist > 0 && dist !== result && !wrongAnswers.includes(dist)) {
            wrongAnswers.push(dist);
        }
    }

    const options = shuffle([result, ...wrongAnswers.slice(0, 3)]);

    return {
        text: `Calculate: ${expr}`,
        type: 'multiple_choice',
        options: options,
        answer: result.toString(),
        hint: 'Remember BODMAS: × and ÷ before + and -',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Three Operations With Brackets
 */
function generateThreeOpsWithBrackets(params, level) {
    const { expr, result } = generateSafeExpression(3, true, params.include_division);

    // Generate wrong answer by ignoring brackets
    const noBrackets = expr.replace(/[()]/g, '');
    const noBracketsResult = evaluateExpression(noBrackets);

    const wrongAnswers = [];
    if (noBracketsResult !== null && noBracketsResult !== result && noBracketsResult > 0) {
        wrongAnswers.push(noBracketsResult);
    }

    // Add more distractors
    while (wrongAnswers.length < 3) {
        const dist = result + randomChoice([-2, 2, -5, 5, -10, 10, -20, 20]);
        if (dist > 0 && dist !== result && !wrongAnswers.includes(dist)) {
            wrongAnswers.push(dist);
        }
    }

    const options = shuffle([result, ...wrongAnswers.slice(0, 3)]);

    return {
        text: `Calculate: ${expr}`,
        type: 'multiple_choice',
        options: options,
        answer: result.toString(),
        hint: 'Brackets first, then × and ÷, then + and -',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Four Operations
 * Complex expressions
 */
function generateFourOps(params, level) {
    const { expr, result } = generateSafeExpression(4, params.use_brackets, params.include_division);

    const wrongAnswers = [];

    // Add distractors
    while (wrongAnswers.length < 3) {
        const dist = result + randomChoice([-2, 2, -5, 5, -10, 10, -20, 20, -50, 50]);
        if (dist > 0 && dist !== result && !wrongAnswers.includes(dist)) {
            wrongAnswers.push(dist);
        }
    }

    const options = shuffle([result, ...wrongAnswers.slice(0, 3)]);

    return {
        text: `Calculate: ${expr}`,
        type: 'multiple_choice',
        options: options,
        answer: result.toString(),
        hint: 'Follow BODMAS carefully: Brackets, then × ÷, then + -',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Identify Order
 * Number the steps in order
 */
function generateIdentifyOrder(params, level) {
    const { expr } = generateSafeExpression(3, true, params.include_division);

    const text = `In which order should you do the operations?\n${expr}\n\nWhat should you do first?`;

    // Extract operations
    const operations = [];

    // Find bracket content
    const bracketMatch = expr.match(/\(([^)]+)\)/);
    if (bracketMatch) {
        operations.push({
            text: `Calculate: ${bracketMatch[1]}`,
            priority: 1
        });
    }

    // Find all operations
    const allOps = [...expr.matchAll(/(\d+)\s*([+\-×÷])\s*(\d+)/g)];
    allOps.forEach((match) => {
        const fullOp = match[0];
        const op = match[2];

        // Skip if inside brackets
        if (bracketMatch && bracketMatch[0].includes(fullOp)) {
            return; // Already added as bracket content
        }

        const priority = (op === '×' || op === '÷') ? 2 : 3;
        operations.push({
            text: `Calculate: ${fullOp}`,
            priority: priority
        });
    });

    // Sort by priority
    operations.sort((a, b) => a.priority - b.priority);

    if (operations.length === 0) {
        return generateIdentifyOrder(params, level);
    }

    const correctFirst = operations[0].text;
    const options = shuffle(operations.map(op => op.text));

    return {
        text: text,
        type: 'multiple_choice',
        options: options.slice(0, 4),
        answer: correctFirst,
        hint: 'Brackets first, then × and ÷, then + and -',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Evaluate
 * Work through step-by-step
 */
function generateEvaluate(params, level) {
    return generateThreeOpsWithBrackets(params, level);
}

/**
 * OPERATION 9: Create Expression
 * Make an expression that equals a target
 */
function generateCreateExpression(params, level) {
    const target = randomInt(10, 50);

    // Generate several expressions, one equals target
    const correctExpr = generateExpressionToTarget(target);

    const wrongExpressions = [];
    for (let i = 0; i < 3; i++) {
        const wrongTarget = target + randomChoice([-5, -3, -2, 2, 3, 5]);
        wrongExpressions.push(generateExpressionToTarget(wrongTarget));
    }

    const options = shuffle([correctExpr, ...wrongExpressions]);

    return {
        text: `Which expression equals ${target}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctExpr,
        hint: 'Calculate each expression using BODMAS',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * Helper: Generate expression that evaluates to target
 */
function generateExpressionToTarget(target) {
    // Simple approach: target = a + b or target = a × b
    const useAdd = randomChoice([true, false]);

    if (useAdd) {
        const a = randomInt(1, target - 1);
        const b = target - a;
        return `${a} + ${b}`;
    } else {
        // Find factors of target
        const factors = [];
        for (let i = 2; i <= Math.min(target, 12); i++) {
            if (target % i === 0) {
                factors.push(i);
            }
        }

        if (factors.length > 0) {
            const factor = randomChoice(factors);
            const other = target / factor;
            return `${factor} × ${other}`;
        } else {
            return `${target} × 1`;
        }
    }
}

/**
 * OPERATION 10: Nested Brackets
 * Brackets within brackets
 */
function generateNestedBrackets(params, level) {
    const a = randomInt(1, 10);
    const b = randomInt(1, 10);
    const c = randomInt(1, 10);
    const d = randomInt(1, 10);

    const op1 = randomChoice(['+', '-']);
    const op2 = randomChoice(['+', '-', '×']);
    const op3 = randomChoice(['+', '-']);

    const expr = `((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`;
    const result = evaluateExpression(expr);

    if (result === null || result < 0 || result > 1000) {
        return generateNestedBrackets(params, level);
    }

    const wrongAnswers = [];

    // Add distractors
    while (wrongAnswers.length < 3) {
        const dist = result + randomChoice([-1, 1, -2, 2, -5, 5, -10, 10]);
        if (dist > 0 && dist !== result && !wrongAnswers.includes(dist)) {
            wrongAnswers.push(dist);
        }
    }

    const options = shuffle([result, ...wrongAnswers.slice(0, 3)]);

    return {
        text: `Calculate: ${expr}`,
        type: 'multiple_choice',
        options: options,
        answer: result.toString(),
        hint: 'Work from the innermost brackets outwards',
        module: 'C09_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 11: Complex Expressions
 * All four operations with multiple brackets
 */
function generateComplexExpression(params, level) {
    const { expr, result } = generateSafeExpression(
        randomChoice([3, 4]),
        true,
        params.include_division
    );

    const wrongAnswers = [];

    // Add distractors
    while (wrongAnswers.length < 3) {
        const dist = result + randomChoice([-2, 2, -5, 5, -10, 10, -20, 20]);
        if (dist > 0 && dist !== result && !wrongAnswers.includes(dist)) {
            wrongAnswers.push(dist);
        }
    }

    const options = shuffle([result, ...wrongAnswers.slice(0, 3)]);

    return {
        text: `Calculate: ${expr}`,
        type: 'multiple_choice',
        options: options,
        answer: result.toString(),
        hint: 'BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction',
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
