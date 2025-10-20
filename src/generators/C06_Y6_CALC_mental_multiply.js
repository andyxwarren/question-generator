/**
 * Year 6 Mental Calculations with Mixed Operations Generator
 *
 * Module: C06_Y6_CALC - "Perform mental calculations, including with mixed operations and large numbers"
 *
 * This generator focuses on:
 * - Mental calculations combining multiple operations
 * - Understanding and applying order of operations (BODMAS/BIDMAS)
 * - Working with larger numbers mentally
 * - Using parentheses to control operation order
 * - Combining all mental strategies learned
 * - Including squares and cubes in calculations
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

/**
 * Safely evaluate a mathematical expression
 * Only accepts basic arithmetic operations
 * Uses Function constructor instead of eval for better security
 */
function evaluateExpression(expr) {
    // Replace mathematical symbols with JavaScript operators
    const jsExpr = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/²/g, '**2')
        .replace(/³/g, '**3');

    // Validate that expression only contains allowed characters
    // Numbers, operators, parentheses, spaces, and decimal points
    const allowedPattern = /^[\d\s+\-*/(). ]+$/;
    if (!allowedPattern.test(jsExpr)) {
        console.error('Invalid characters in expression:', expr);
        return null;
    }

    try {
        // Use Function constructor instead of eval - safer as it doesn't have access to local scope
        // eslint-disable-next-line no-new-func
        const result = new Function(`'use strict'; return (${jsExpr})`)();
        return result;
    } catch (e) {
        console.error('Error evaluating:', expr, e);
        return null;
    }
}

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'two_operation_add_mult':
            return generateTwoOpAddMult(params, level);
        case 'two_operation_sub_mult':
            return generateTwoOpSubMult(params, level);
        case 'two_operation_add_div':
            return generateTwoOpAddDiv(params, level);
        case 'two_operation_sub_div':
            return generateTwoOpSubDiv(params, level);
        case 'three_operations':
            return generateThreeOperations(params, level);
        case 'four_operations':
            return generateFourOperations(params, level);
        case 'parentheses_simple':
            return generateParenthesesSimple(params, level);
        case 'parentheses_nested':
            return generateParenthesesNested(params, level);
        case 'parentheses_multiple':
            return generateParenthesesMultiple(params, level);
        case 'mental_mult_large':
            return generateMentalMultLarge(params, level);
        case 'mental_div_large':
            return generateMentalDivLarge(params, level);
        case 'decimals_mixed':
            return generateDecimalsMixed(params, level);
        case 'order_of_operations':
            return generateOrderOfOperations(params, level);
        case 'squares_in_calc':
            return generateSquaresInCalc(params, level);
        case 'cubes_in_calc':
            return generateCubesInCalc(params, level);
        case 'multi_step_mental':
            return generateMultiStepMental(params, level);
        case 'negative_numbers':
            return generateNegativeNumbers(params, level);
        default:
            return generateTwoOpAddMult(params, level);
    }
}

/**
 * OPERATION 1: Two Operations - Addition and Multiplication
 * e.g., 5 + 3 × 2 (multiplication first)
 */
function generateTwoOpAddMult(params, level) {
    const a = randomInt(5, 50);
    const b = randomInt(2, 12);
    const c = randomInt(2, 10);

    const answer = a + (b * c);  // Multiplication first

    const text = `${a} + ${b} × ${c} = ?`;

    // Common wrong answer: adding first
    const wrongAnswer = (a + b) * c;

    const distractors = [wrongAnswer, answer + 5, answer - 5].filter(d => d !== answer);
    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiplication before addition: ${b} × ${c} = ${b * c}, then ${a} + ${b * c}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Two Operations - Subtraction and Multiplication
 * e.g., 20 - 4 × 2 (multiplication first)
 */
function generateTwoOpSubMult(params, level) {
    const b = randomInt(2, 10);
    const c = randomInt(2, 8);
    const a = randomInt(b * c + 5, 100);  // Ensure positive result

    const answer = a - (b * c);

    const text = `${a} - ${b} × ${c} = ?`;

    // Common wrong answer: subtracting first
    const wrongAnswer = (a - b) * c;

    const distractors = [wrongAnswer, answer + 5, answer - 5].filter(d => d !== answer && d >= 0);
    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiplication before subtraction: ${b} × ${c} = ${b * c}, then ${a} - ${b * c}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Two Operations - Addition and Division
 * e.g., 10 + 20 ÷ 4 (division first)
 */
function generateTwoOpAddDiv(params, level) {
    const a = randomInt(5, 50);
    const divisor = randomChoice([2, 3, 4, 5, 10]);
    const quotient = randomInt(2, 12);
    const dividend = divisor * quotient;

    const answer = a + quotient;

    const text = `${a} + ${dividend} ÷ ${divisor} = ?`;

    // Common wrong answer: adding first
    const wrongAnswer = (a + dividend) / divisor;

    const distractors = [Math.floor(wrongAnswer), answer + 2, answer - 2].filter(d => d !== answer);
    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Division before addition: ${dividend} ÷ ${divisor} = ${quotient}, then ${a} + ${quotient}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Two Operations - Subtraction and Division
 * e.g., 100 - 60 ÷ 3 (division first)
 */
function generateTwoOpSubDiv(params, level) {
    const divisor = randomChoice([2, 3, 4, 5, 10]);
    const quotient = randomInt(5, 20);
    const dividend = divisor * quotient;
    const a = randomInt(dividend + 10, 150);

    const answer = a - quotient;

    const text = `${a} - ${dividend} ÷ ${divisor} = ?`;

    const distractors = generateDistractors(answer, 3, 0, a);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Division before subtraction: ${dividend} ÷ ${divisor} = ${quotient}, then ${a} - ${quotient}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Three Operations
 * e.g., 10 + 5 × 2 - 3
 */
function generateThreeOperations(params, level) {
    const a = randomInt(10, 50);
    const b = randomInt(2, 10);
    const c = randomInt(2, 8);
    const d = randomInt(1, 10);

    const operations = ['+', '-'];
    const op1 = randomChoice(operations);
    const op2 = randomChoice(operations);

    const expr = `${a} ${op1} ${b} × ${c} ${op2} ${d}`;
    const answer = Math.floor(evaluateExpression(expr));

    const text = `${expr} = ?`;

    const distractors = generateDistractors(answer, 3, 0, Math.max(answer * 2, 100));
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiply first: ${b} × ${c} = ${b * c}, then work left to right`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Four Operations
 * All four operations mixed
 */
function generateFourOperations(params, level) {
    const a = randomInt(20, 100);
    const b = randomInt(2, 8);
    const c = randomInt(2, 5);
    const divisor = randomChoice([2, 3, 4, 5]);
    const quotient = randomInt(3, 10);
    const dividend = divisor * quotient;

    const expr = `${a} + ${b} × ${c} - ${dividend} ÷ ${divisor}`;
    const answer = Math.floor(evaluateExpression(expr));

    const text = `${expr} = ?`;

    const distractors = generateDistractors(answer, 3, 0, a * 2);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiply and divide first, then add and subtract left to right`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Parentheses Simple
 * e.g., (5 + 3) × 2
 */
function generateParenthesesSimple(params, level) {
    const a = randomInt(3, 20);
    const b = randomInt(2, 15);
    const c = randomInt(2, 10);

    const operation = randomChoice(['+', '-']);
    const expr = operation === '+' ?
        `(${a} + ${b}) × ${c}` :
        `(${a + b} - ${b}) × ${c}`;  // Ensure positive

    const answer = Math.floor(evaluateExpression(expr));

    const text = `${expr} = ?`;

    // Wrong answer if ignoring parentheses
    const wrongAnswer = operation === '+' ?
        a + (b * c) :
        (a + b) - (b * c);

    const distractors = [wrongAnswer, answer + 5, answer - 5].filter(d => d !== answer && d >= 0);
    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Calculate inside parentheses first',
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Parentheses Nested
 * e.g., (20 - (8 + 2)) × 5
 */
function generateParenthesesNested(params, level) {
    const inner1 = randomInt(3, 10);
    const inner2 = randomInt(2, 8);
    const outer = inner1 + inner2 + randomInt(5, 15);
    const multiplier = randomInt(2, 6);

    const expr = `(${outer} - (${inner1} + ${inner2})) × ${multiplier}`;
    const answer = Math.floor(evaluateExpression(expr));

    const text = `${expr} = ?`;

    const distractors = generateDistractors(answer, 3, 0, 100);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Innermost parentheses first: ${inner1} + ${inner2} = ${inner1 + inner2}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Multiple Parentheses (Level 4)
 * e.g., (5 + 3) × (8 - 2)
 */
function generateParenthesesMultiple(params, level) {
    const a = randomInt(3, 12);
    const b = randomInt(2, 8);
    const c = randomInt(8, 20);
    const d = randomInt(2, c - 2);

    const expr = `(${a} + ${b}) × (${c} - ${d})`;
    const answer = Math.floor(evaluateExpression(expr));

    const text = `${expr} = ?`;

    const distractors = generateDistractors(answer, 3, 0, 200);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Calculate each parenthesis: (${a} + ${b}) = ${a + b} and (${c} - ${d}) = ${c - d}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Mental Multiplication with Large Numbers
 * Use mental strategies for larger numbers
 */
function generateMentalMultLarge(params, level) {
    const strategies = [
        { a: 25, b: randomChoice([4, 8, 12, 16, 20]), strategy: '25 × 4 = 100' },
        { a: 50, b: randomChoice([4, 6, 8, 12]), strategy: '50 × 2 = 100' },
        { a: 125, b: randomChoice([4, 8]), strategy: '125 × 8 = 1000' }
    ];

    const calc = randomChoice(strategies);
    const answer = calc.a * calc.b;

    const text = `${calc.a} × ${calc.b} = ?`;

    const distractors = generateDistractors(answer, 3, 0, answer * 2);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Use known fact: ${calc.strategy}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 11: Mental Division with Large Numbers
 */
function generateMentalDivLarge(params, level) {
    const divisors = [4, 5, 8, 10, 12, 15, 20, 25];
    const divisor = randomChoice(divisors);
    const quotient = randomInt(10, 50);
    const dividend = divisor * quotient;

    const text = `${dividend} ÷ ${divisor} = ?`;

    const distractors = generateDistractors(quotient, 3, 1, 100);
    const options = shuffle([quotient, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: quotient.toString(),
        hint: `Think: ___ × ${divisor} = ${dividend}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 12: Decimals in Mixed Operations
 */
function generateDecimalsMixed(params, level) {
    const a = randomChoice([2.5, 5, 7.5, 10]);
    const b = randomChoice([2, 4, 5]);
    const c = randomInt(5, 20);

    const expr = `${a} × ${b} + ${c}`;
    const answer = evaluateExpression(expr);

    const text = `${expr} = ?`;

    const distractors = [answer + 5, answer - 5, answer * 2].filter(d => d !== answer);
    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Multiply first: ${a} × ${b} = ${a * b}, then add ${c}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 13: Order of Operations Questions
 * Ask which operation to do first
 */
function generateOrderOfOperations(params, level) {
    const expressions = [
        {
            expr: '10 + 5 × 2',
            question: 'Which operation should you do first in: 10 + 5 × 2?',
            answer: '5 × 2',
            options: ['5 × 2', '10 + 5', 'either order', 'left to right']
        },
        {
            expr: '(8 + 2) × 3',
            question: 'Which operation should you do first in: (8 + 2) × 3?',
            answer: '8 + 2',
            options: ['8 + 2', '2 × 3', 'either order', 'left to right']
        },
        {
            expr: '20 - 12 ÷ 4',
            question: 'Which operation should you do first in: 20 - 12 ÷ 4?',
            answer: '12 ÷ 4',
            options: ['12 ÷ 4', '20 - 12', 'either order', 'left to right']
        }
    ];

    const item = randomChoice(expressions);

    return {
        text: item.question,
        type: 'multiple_choice',
        options: item.options,
        answer: item.answer,
        hint: 'Remember BODMAS: Brackets, Order, Division/Multiplication, Addition/Subtraction',
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 14: Squares in Calculations
 */
function generateSquaresInCalc(params, level) {
    const base = randomInt(2, 10);
    const square = base * base;
    const extra = randomInt(5, 30);

    const operation = randomChoice(['+', '-']);
    const expr = operation === '+' ?
        `${base}² + ${extra}` :
        `${base}² - ${extra}`;

    const answer = operation === '+' ? square + extra : square - extra;

    const text = `${expr} = ?`;

    const distractors = generateDistractors(answer, 3, 0, 150);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${base}² = ${base} × ${base} = ${square}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 15: Cubes in Calculations (Level 4)
 */
function generateCubesInCalc(params, level) {
    const base = randomInt(2, 5);
    const cube = base * base * base;
    const extra = randomInt(5, 20);

    const operation = randomChoice(['+', '-']);
    const expr = operation === '+' ?
        `${base}³ + ${extra}` :
        `${base}³ - ${extra}`;

    const answer = operation === '+' ? cube + extra : cube - extra;

    const text = `${expr} = ?`;

    const distractors = generateDistractors(answer, 3, 0, 150);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${base}³ = ${base} × ${base} × ${base} = ${cube}`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 16: Multi-Step Mental Problems
 */
function generateMultiStepMental(params, level) {
    const a = randomInt(50, 200);
    const b = randomInt(10, 50);
    const c = randomInt(2, 10);
    const divisor = randomChoice([2, 5, 10]);

    const expr = `(${a} - ${b}) × ${c} ÷ ${divisor}`;
    const answer = Math.floor(evaluateExpression(expr));

    const text = `${expr} = ?`;

    const distractors = generateDistractors(answer, 3, 0, a);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Step 1: Parentheses. Step 2: Multiply. Step 3: Divide`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 17: Negative Numbers (Level 4)
 */
function generateNegativeNumbers(params, level) {
    const a = randomInt(5, 30);
    const b = randomInt(a + 5, 50);

    const answer = a - b;  // Negative result

    const text = `${a} - ${b} = ?`;

    const distractors = [Math.abs(answer), answer + 5, b - a].filter(d => d !== answer);
    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `When subtracting a larger number from a smaller number, the result is negative`,
        module: 'C06_Y6_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C06_Y6_CALC',
    generate: generateQuestion
};
