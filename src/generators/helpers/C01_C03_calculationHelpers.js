/**
 * Calculation Helpers
 *
 * Shared utility functions for C (Calculations) question generators
 * Includes functions for:
 * - Basic arithmetic operations
 * - Number properties (factors, multiples, primes, squares, cubes)
 * - Missing number problems
 * - Inverse operations
 * - Word problem contexts
 */

import { randomInt, randomChoice, shuffle } from './N02_numberHelpers.js';

// ============================================================================
// BASIC ARITHMETIC
// ============================================================================

/**
 * Generate addition problem within range
 * Returns {a, b, answer} where a + b = answer
 */
export function generateAddition(minResult, maxResult, options = {}) {
    const {
        minAddend = 0,
        maxAddend = maxResult,
        allowZero = true,
        ensureCarry = false
    } = options;

    let a, b, answer;
    let attempts = 0;

    do {
        answer = randomInt(minResult, maxResult);
        a = randomInt(Math.max(minAddend, allowZero ? 0 : 1), Math.min(answer, maxAddend));
        b = answer - a;
        attempts++;

        // Check carry requirement
        if (ensureCarry && attempts < 50) {
            const hasCarry = checkCarry(a, b);
            if (!hasCarry) continue;
        }

        break;
    } while (attempts < 100);

    return { a, b, answer };
}

/**
 * Generate subtraction problem within range
 * Returns {a, b, answer} where a - b = answer
 */
export function generateSubtraction(minResult, maxResult, options = {}) {
    const {
        minMinuend = minResult,
        maxMinuend = null,
        allowZero = true,
        ensureBorrow = false
    } = options;

    let a, b, answer;
    let attempts = 0;

    do {
        answer = randomInt(Math.max(0, minResult), maxResult);
        const maxA = maxMinuend || maxResult + answer;
        a = randomInt(answer + (allowZero ? 0 : 1), maxA);
        b = a - answer;
        attempts++;

        // Check borrow requirement
        if (ensureBorrow && attempts < 50) {
            const hasBorrow = checkBorrow(a, b);
            if (!hasBorrow) continue;
        }

        break;
    } while (attempts < 100);

    return { a, b, answer };
}

/**
 * Generate multiplication problem
 * Returns {a, b, answer} where a × b = answer
 */
export function generateMultiplication(minFactor, maxFactor, tables = null) {
    let a, b;

    if (tables && tables.length > 0) {
        // Use specific times tables
        a = randomChoice(tables);
        b = randomInt(minFactor, maxFactor);
    } else {
        a = randomInt(minFactor, maxFactor);
        b = randomInt(minFactor, maxFactor);
    }

    return { a, b, answer: a * b };
}

/**
 * Generate division problem
 * Returns {dividend, divisor, quotient, remainder}
 */
export function generateDivision(minDividend, maxDividend, options = {}) {
    const {
        minDivisor = 2,
        maxDivisor = 12,
        exactOnly = false,
        tables = null
    } = options;

    let divisor, quotient, dividend, remainder;
    let attempts = 0;

    do {
        if (tables && tables.length > 0) {
            divisor = randomChoice(tables);
        } else {
            divisor = randomInt(minDivisor, maxDivisor);
        }

        quotient = randomInt(1, Math.floor(maxDividend / divisor));
        dividend = divisor * quotient;

        if (!exactOnly) {
            remainder = randomInt(0, divisor - 1);
            dividend += remainder;
        } else {
            remainder = 0;
        }

        attempts++;
    } while (dividend < minDividend && attempts < 100);

    return { dividend, divisor, quotient, remainder, answer: quotient };
}

/**
 * Check if addition requires carrying
 */
export function checkCarry(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();
    const maxLen = Math.max(strA.length, strB.length);

    let carry = 0;
    for (let i = 0; i < maxLen; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');
        const sum = digitA + digitB + carry;
        if (sum >= 10) return true;
        carry = Math.floor(sum / 10);
    }
    return false;
}

/**
 * Check if subtraction requires borrowing
 */
export function checkBorrow(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();

    for (let i = 0; i < strB.length; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');
        if (digitA < digitB) return true;
    }
    return false;
}

// ============================================================================
// NUMBER PROPERTIES
// ============================================================================

/**
 * Check if a number is prime
 */
export function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

/**
 * Get all prime numbers up to n
 */
export function getPrimesUpTo(n) {
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}

/**
 * Get all factors of a number
 */
export function getFactors(n) {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            factors.push(i);
            if (i !== n / i) {
                factors.push(n / i);
            }
        }
    }
    return factors.sort((a, b) => a - b);
}

/**
 * Get factor pairs of a number
 * Returns array of [a, b] where a * b = n
 */
export function getFactorPairs(n) {
    const pairs = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            pairs.push([i, n / i]);
        }
    }
    return pairs;
}

/**
 * Get common factors of two numbers
 */
export function getCommonFactors(a, b) {
    const factorsA = getFactors(a);
    const factorsB = getFactors(b);
    return factorsA.filter(f => factorsB.includes(f));
}

/**
 * Get greatest common factor (GCF/HCF)
 */
export function getGCF(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Get least common multiple (LCM)
 */
export function getLCM(a, b) {
    return Math.abs(a * b) / getGCF(a, b);
}

/**
 * Get multiples of n up to max
 */
export function getMultiplesUpTo(n, max) {
    const multiples = [];
    for (let i = n; i <= max; i += n) {
        multiples.push(i);
    }
    return multiples;
}

/**
 * Get common multiples of two numbers up to max
 */
export function getCommonMultiples(a, b, max) {
    const lcm = getLCM(a, b);
    return getMultiplesUpTo(lcm, max);
}

/**
 * Check if a number is a perfect square
 */
export function isPerfectSquare(n) {
    const sqrt = Math.sqrt(n);
    return sqrt === Math.floor(sqrt);
}

/**
 * Check if a number is a perfect cube
 */
export function isPerfectCube(n) {
    const cbrt = Math.cbrt(n);
    return Math.abs(cbrt - Math.round(cbrt)) < 0.0001;
}

/**
 * Get square numbers up to n
 */
export function getSquaresUpTo(n) {
    const squares = [];
    for (let i = 1; i * i <= n; i++) {
        squares.push(i * i);
    }
    return squares;
}

/**
 * Get cube numbers up to n
 */
export function getCubesUpTo(n) {
    const cubes = [];
    for (let i = 1; i * i * i <= n; i++) {
        cubes.push(i * i * i);
    }
    return cubes;
}

/**
 * Get prime factors of a number
 */
export function getPrimeFactors(n) {
    const factors = [];
    let num = n;

    for (let i = 2; i <= num; i++) {
        while (num % i === 0) {
            factors.push(i);
            num /= i;
        }
    }

    return factors;
}

/**
 * Check if number is odd
 */
export function isOdd(n) {
    return n % 2 === 1;
}

/**
 * Check if number is even
 */
export function isEven(n) {
    return n % 2 === 0;
}

// ============================================================================
// MISSING NUMBER PROBLEMS
// ============================================================================

/**
 * Generate missing number addition problem
 * Returns problem with one unknown: a + ? = c or ? + b = c
 */
export function generateMissingAddend(minResult, maxResult) {
    const { a, b, answer } = generateAddition(minResult, maxResult);
    const position = randomChoice(['first', 'second']);

    if (position === 'first') {
        return {
            known: b,
            unknown: a,
            result: answer,
            equation: `___ + ${b} = ${answer}`,
            type: 'add'
        };
    } else {
        return {
            known: a,
            unknown: b,
            result: answer,
            equation: `${a} + ___ = ${answer}`,
            type: 'add'
        };
    }
}

/**
 * Generate missing number subtraction problem
 * Returns: a - ? = c or ? - b = c or a - b = ?
 */
export function generateMissingSubtrahend(minResult, maxResult) {
    const { a, b, answer } = generateSubtraction(minResult, maxResult);
    const position = randomChoice(['minuend', 'subtrahend', 'result']);

    if (position === 'minuend') {
        return {
            known: b,
            unknown: a,
            result: answer,
            equation: `___ - ${b} = ${answer}`,
            type: 'subtract'
        };
    } else if (position === 'subtrahend') {
        return {
            known: a,
            unknown: b,
            result: answer,
            equation: `${a} - ___ = ${answer}`,
            type: 'subtract'
        };
    } else {
        return {
            known1: a,
            known2: b,
            unknown: answer,
            equation: `${a} - ${b} = ___`,
            type: 'subtract'
        };
    }
}

// ============================================================================
// WORD PROBLEM CONTEXTS
// ============================================================================

/**
 * Get random name for word problems
 */
export function getRandomName() {
    const names = [
        'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
        'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia',
        'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Lily', 'Jack',
        'Grace', 'Oscar', 'Isla', 'George', 'Freya', 'Charlie', 'Poppy', 'Harry'
    ];
    return randomChoice(names);
}

/**
 * Get random object/item for word problems
 */
export function getRandomItem(category = null) {
    const items = {
        collectibles: ['stickers', 'marbles', 'cards', 'coins', 'buttons', 'stamps', 'shells', 'rocks'],
        food: ['apples', 'oranges', 'bananas', 'sweets', 'cookies', 'cupcakes', 'strawberries', 'grapes'],
        school: ['pencils', 'crayons', 'books', 'erasers', 'rulers', 'notebooks', 'pens', 'markers'],
        toys: ['toy cars', 'dolls', 'blocks', 'puzzles', 'balls', 'action figures', 'teddy bears'],
        nature: ['flowers', 'leaves', 'stones', 'feathers', 'acorns', 'pinecones'],
        money: ['pennies', 'pounds', 'coins'],
        measurement: ['centimetres', 'metres', 'grams', 'kilograms', 'litres', 'millilitres']
    };

    if (category && items[category]) {
        return randomChoice(items[category]);
    }

    // Random category
    const categories = Object.keys(items);
    const randomCat = randomChoice(categories);
    return randomChoice(items[randomCat]);
}

/**
 * Get word problem context for addition
 */
export function getAdditionContext(a, b, answer) {
    const name1 = getRandomName();
    const name2 = getRandomName();
    const item = getRandomItem();

    const templates = [
        {
            text: `${name1} has ${a} ${item}. ${name2} gives them ${b} more. How many ${item} does ${name1} have now?`,
            type: 'increase'
        },
        {
            text: `${name1} has ${a} ${item} and ${name2} has ${b} ${item}. How many ${item} do they have altogether?`,
            type: 'combine'
        },
        {
            text: `There are ${a} ${item} in one box and ${b} ${item} in another box. How many ${item} in total?`,
            type: 'combine'
        }
    ];

    return randomChoice(templates);
}

/**
 * Get word problem context for subtraction
 */
export function getSubtractionContext(a, b, answer) {
    const name = getRandomName();
    const item = getRandomItem();

    const templates = [
        {
            text: `${name} has ${a} ${item}. They give away ${b} ${item}. How many ${item} are left?`,
            type: 'take_away'
        },
        {
            text: `${name} has ${a} ${item}. They lose ${b} ${item}. How many ${item} do they have now?`,
            type: 'decrease'
        },
        {
            text: `There are ${a} ${item}. ${b} ${item} are used. How many ${item} remain?`,
            type: 'take_away'
        }
    ];

    return randomChoice(templates);
}

/**
 * Get word problem context for multiplication
 */
export function getMultiplicationContext(a, b, answer) {
    const name = getRandomName();
    const item = getRandomItem();

    const templates = [
        {
            text: `${name} has ${a} bags with ${b} ${item} in each bag. How many ${item} altogether?`,
            type: 'groups'
        },
        {
            text: `There are ${a} boxes with ${b} ${item} in each box. How many ${item} in total?`,
            type: 'groups'
        },
        {
            text: `${name} buys ${a} packs of ${item}. Each pack contains ${b} ${item}. How many ${item} did they buy?`,
            type: 'groups'
        }
    ];

    return randomChoice(templates);
}

/**
 * Get word problem context for division
 */
export function getDivisionContext(dividend, divisor, quotient, remainder = 0) {
    const name = getRandomName();
    const item = getRandomItem();

    const templates = remainder === 0 ? [
        {
            text: `${name} has ${dividend} ${item}. They share them equally among ${divisor} friends. How many ${item} does each friend get?`,
            type: 'sharing'
        },
        {
            text: `There are ${dividend} ${item} arranged into ${divisor} equal groups. How many ${item} are in each group?`,
            type: 'grouping'
        }
    ] : [
        {
            text: `${name} has ${dividend} ${item}. They put them into bags of ${divisor}. How many full bags can they make?`,
            type: 'grouping_with_remainder'
        }
    ];

    return randomChoice(templates);
}

// ============================================================================
// ESTIMATION & ROUNDING
// ============================================================================

/**
 * Round to nearest 10, 100, 1000, etc.
 */
export function roundTo(num, place) {
    return Math.round(num / place) * place;
}

/**
 * Estimate result of operation by rounding operands
 */
export function estimateOperation(a, b, operation, roundingPlace) {
    const aRounded = roundTo(a, roundingPlace);
    const bRounded = roundTo(b, roundingPlace);

    switch(operation) {
        case 'add': return aRounded + bRounded;
        case 'subtract': return aRounded - bRounded;
        case 'multiply': return aRounded * bRounded;
        case 'divide': return Math.floor(aRounded / bRounded);
        default: return 0;
    }
}

// ============================================================================
// ORDER OF OPERATIONS (BODMAS/PEMDAS)
// ============================================================================

/**
 * Evaluate expression following BODMAS
 * Supports: +, -, ×, ÷, parentheses
 */
export function evaluateBODMAS(expression) {
    // This is a simplified evaluator for basic expressions
    // For production, consider using a proper expression parser
    let expr = expression.replace(/×/g, '*').replace(/÷/g, '/');

    try {
        // WARNING: Using eval() - only safe because we generate the expressions
        // In production with user input, use a proper parser
        return eval(expr);
    } catch (e) {
        console.error('Error evaluating expression:', expr);
        return null;
    }
}

/**
 * Generate BODMAS expression
 */
export function generateBODMASExpression(complexity = 2) {
    // Complexity: 1 = two operations, 2 = three operations, 3 = four operations
    const operators = ['+', '-', '×', '÷'];
    const useParentheses = Math.random() < 0.5 && complexity >= 2;

    let expr = '';
    let a, b, c, d, op1, op2, op3;

    if (complexity === 1) {
        a = randomInt(1, 20);
        b = randomInt(1, 10);
        c = randomInt(1, 10);
        op1 = randomChoice(operators);
        op2 = randomChoice(operators);

        expr = `${a} ${op1} ${b} ${op2} ${c}`;
    } else if (complexity === 2) {
        a = randomInt(1, 20);
        b = randomInt(1, 10);
        c = randomInt(1, 10);
        d = randomInt(1, 10);
        op1 = randomChoice(operators);
        op2 = randomChoice(operators);
        op3 = randomChoice(operators);

        if (useParentheses) {
            expr = `(${a} ${op1} ${b}) ${op2} ${c}`;
        } else {
            expr = `${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`;
        }
    }

    const result = evaluateBODMAS(expr);
    return { expression: expr, result };
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format calculation for display
 */
export function formatCalculation(a, operator, b, answer = null) {
    const symbols = {
        add: '+',
        subtract: '-',
        multiply: '×',
        divide: '÷'
    };

    const symbol = symbols[operator] || operator;
    if (answer !== null) {
        return `${a} ${symbol} ${b} = ${answer}`;
    }
    return `${a} ${symbol} ${b}`;
}

/**
 * Generate commutative pair
 */
export function getCommutativePair(a, b, operation) {
    if (operation === 'add' || operation === 'multiply') {
        return [
            { a, b, answer: operation === 'add' ? a + b : a * b },
            { a: b, b: a, answer: operation === 'add' ? a + b : a * b }
        ];
    }
    return null;
}

/**
 * Get inverse operation
 */
export function getInverseOperation(operation) {
    const inverses = {
        'add': 'subtract',
        'subtract': 'add',
        'multiply': 'divide',
        'divide': 'multiply'
    };
    return inverses[operation];
}

/**
 * Generate inverse fact
 * If a + b = c, then c - b = a
 */
export function generateInverseFact(a, b, operation) {
    const inverseOp = getInverseOperation(operation);

    if (operation === 'add') {
        const sum = a + b;
        return {
            original: { a, b, answer: sum, operation: 'add' },
            inverse: { a: sum, b, answer: a, operation: 'subtract' }
        };
    } else if (operation === 'subtract') {
        const diff = a - b;
        return {
            original: { a, b, answer: diff, operation: 'subtract' },
            inverse: { a: diff, b, answer: a, operation: 'add' }
        };
    } else if (operation === 'multiply') {
        const product = a * b;
        return {
            original: { a, b, answer: product, operation: 'multiply' },
            inverse: { a: product, b, answer: a, operation: 'divide' }
        };
    } else if (operation === 'divide') {
        const quotient = Math.floor(a / b);
        return {
            original: { a, b, answer: quotient, operation: 'divide' },
            inverse: { a: quotient, b, answer: a, operation: 'multiply' }
        };
    }

    return null;
}

export default {
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    checkCarry,
    checkBorrow,
    isPrime,
    getPrimesUpTo,
    getFactors,
    getFactorPairs,
    getCommonFactors,
    getGCF,
    getLCM,
    getMultiplesUpTo,
    getCommonMultiples,
    isPerfectSquare,
    isPerfectCube,
    getSquaresUpTo,
    getCubesUpTo,
    getPrimeFactors,
    isOdd,
    isEven,
    generateMissingAddend,
    generateMissingSubtrahend,
    getRandomName,
    getRandomItem,
    getAdditionContext,
    getSubtractionContext,
    getMultiplicationContext,
    getDivisionContext,
    roundTo,
    estimateOperation,
    evaluateBODMAS,
    generateBODMASExpression,
    formatCalculation,
    getCommutativePair,
    getInverseOperation,
    generateInverseFact
};
