/**
 * Year 5 Mental Multiplication and Division Generator
 *
 * Module: C06_Y5_CALC - "Multiply and divide numbers mentally drawing upon known facts;
 *                        multiply and divide whole numbers and those involving decimals by 10, 100 and 1,000"
 *
 * This generator focuses on:
 * - Using known multiplication facts to derive new facts mentally
 * - Multiplying whole numbers and decimals by 10, 100, 1000
 * - Dividing whole numbers and decimals by 10, 100, 1000
 * - Mental strategies: doubling/halving, partitioning, compensation
 * - Place value understanding with powers of 10
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    getRandomName,
    getRandomItem
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Generate a decimal number with specified decimal places
 */
function generateDecimal(min, max, decimalPlaces) {
    const whole = randomInt(min, max);
    if (decimalPlaces === 0) return whole;

    // Allow 0 to include small decimals like 0.01, 0.02, etc.
    const fraction = randomInt(0, Math.pow(10, decimalPlaces) - 1);
    const decimal = whole + (fraction / Math.pow(10, decimalPlaces));
    return Number(decimal.toFixed(decimalPlaces));
}

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'derive_from_known':
            return generateDeriveFromKnown(params, level);
        case 'multiply_by_10':
            return generateMultiplyBy10(params, level);
        case 'divide_by_10':
            return generateDivideBy10(params, level);
        case 'multiply_by_100':
            return generateMultiplyBy100(params, level);
        case 'divide_by_100':
            return generateDivideBy100(params, level);
        case 'multiply_by_1000':
            return generateMultiplyBy1000(params, level);
        case 'divide_by_1000':
            return generateDivideBy1000(params, level);
        case 'near_multiples':
            return generateNearMultiples(params, level);
        case 'doubling_halving':
            return generateDoublingHalving(params, level);
        case 'partition_multiply':
            return generatePartitionMultiply(params, level);
        case 'compensate':
            return generateCompensate(params, level);
        case 'chain_operations':
            return generateChainOperations(params, level);
        case 'decimal_mental':
            return generateDecimalMental(params, level);
        default:
            return generateDeriveFromKnown(params, level);
    }
}

/**
 * OPERATION 1: Derive from Known Facts
 * Use known tables to calculate new facts
 */
function generateDeriveFromKnown(params, level) {
    const base = randomChoice(params.tables);
    const multiplier = randomInt(2, 12);
    const knownProduct = base * multiplier;

    const strategies = [
        {
            // Scale by 10
            newCalc: `${base * 10} × ${multiplier}`,
            answer: knownProduct * 10,
            hint: `${base * 10} is ${base} × 10, so the answer is ${knownProduct} × 10`
        },
        {
            // Double the multiplier
            newCalc: `${base} × ${multiplier * 2}`,
            answer: knownProduct * 2,
            hint: `${multiplier * 2} is double ${multiplier}, so double ${knownProduct}`
        },
        {
            // Scale both
            newCalc: `${base * 10} × ${multiplier * 10}`,
            answer: knownProduct * 100,
            hint: `Both numbers × 10, so answer is ${knownProduct} × 100`
        }
    ];

    const strategy = randomChoice(strategies);

    const text = `If ${base} × ${multiplier} = ${knownProduct}, what is ${strategy.newCalc}?`;

    const distractors = generateDistractors(strategy.answer, 3, 0, strategy.answer * 2);
    const options = shuffle([strategy.answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: strategy.answer.toString(),
        hint: strategy.hint,
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Multiply by 10
 * Multiply whole numbers and decimals by 10
 */
function generateMultiplyBy10(params, level) {
    const useDecimal = params.allow_decimals && Math.random() < 0.6;

    let number, answer;
    if (useDecimal) {
        number = generateDecimal(1, 50, params.decimal_places);
        answer = number * 10;
    } else {
        number = randomInt(1, params.whole_number_range[1]);
        answer = number * 10;
    }

    const questionTypes = [
        `${number} × 10 = ?`,
        `What is ${number} multiplied by 10?`,
        `Multiply ${number} by 10`
    ];

    const text = randomChoice(questionTypes);

    const distractors = useDecimal ?
        [number * 100, number / 10, number + 10].filter(d => d !== answer) :
        generateDistractors(answer, 3, 0, answer * 2);

    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Digits move one place to the left (value increases by 10 times)',
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Divide by 10
 * Divide whole numbers and decimals by 10
 */
function generateDivideBy10(params, level) {
    const useDecimal = params.allow_decimals && Math.random() < 0.5;

    let number, answer;
    if (useDecimal) {
        // Generate a number that divides nicely
        const base = generateDecimal(10, 500, params.decimal_places);
        number = base;
        answer = Number((number / 10).toFixed(params.decimal_places + 1));
    } else {
        number = randomInt(10, params.whole_number_range[1]);
        answer = number / 10;
    }

    const questionTypes = [
        `${number} ÷ 10 = ?`,
        `What is ${number} divided by 10?`,
        `Divide ${number} by 10`
    ];

    const text = randomChoice(questionTypes);

    const distractors = useDecimal ?
        [number / 100, number * 10, number - 10].filter(d => d !== answer && d > 0) :
        [answer * 10, answer / 10, answer + 1].filter(d => d !== answer && d > 0);

    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Digits move one place to the right (value decreases by 10 times)',
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Multiply by 100
 * Multiply whole numbers and decimals by 100
 */
function generateMultiplyBy100(params, level) {
    const useDecimal = params.allow_decimals && Math.random() < 0.6;

    let number, answer;
    if (useDecimal) {
        number = generateDecimal(1, 20, params.decimal_places);
        answer = number * 100;
    } else {
        number = randomInt(1, 100);
        answer = number * 100;
    }

    const questionTypes = [
        `${number} × 100 = ?`,
        `What is ${number} multiplied by 100?`,
        `Multiply ${number} by 100`
    ];

    const text = randomChoice(questionTypes);

    const distractors = useDecimal ?
        [number * 10, number * 1000, number + 100].filter(d => d !== answer) :
        [answer / 10, answer * 10, answer + 100].filter(d => d !== answer);

    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Digits move two places to the left (value increases by 100 times)',
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Divide by 100
 * Divide whole numbers and decimals by 100
 */
function generateDivideBy100(params, level) {
    const useDecimal = params.allow_decimals && Math.random() < 0.5;

    let number, answer;
    if (useDecimal) {
        number = generateDecimal(100, 5000, params.decimal_places);
        answer = Number((number / 100).toFixed(params.decimal_places + 2));
    } else {
        number = randomInt(100, params.whole_number_range[1]);
        answer = number / 100;
    }

    const questionTypes = [
        `${number} ÷ 100 = ?`,
        `What is ${number} divided by 100?`,
        `Divide ${number} by 100`
    ];

    const text = randomChoice(questionTypes);

    const distractors = useDecimal ?
        [number / 10, number / 1000, number - 100].filter(d => d !== answer && d > 0) :
        [answer * 10, answer * 100, answer / 10].filter(d => d !== answer && d > 0);

    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Digits move two places to the right (value decreases by 100 times)',
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Multiply by 1000
 * Multiply whole numbers and decimals by 1000
 */
function generateMultiplyBy1000(params, level) {
    const useDecimal = params.allow_decimals && Math.random() < 0.6;

    let number, answer;
    if (useDecimal) {
        number = generateDecimal(1, 10, params.decimal_places);
        answer = number * 1000;
    } else {
        number = randomInt(1, 50);
        answer = number * 1000;
    }

    const questionTypes = [
        `${number} × 1000 = ?`,
        `What is ${number} multiplied by 1000?`,
        `Multiply ${number} by 1000`
    ];

    const text = randomChoice(questionTypes);

    const distractors = useDecimal ?
        [number * 100, number * 10000, number + 1000].filter(d => d !== answer) :
        [answer / 10, answer * 10, answer - 1000].filter(d => d !== answer && d > 0);

    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Digits move three places to the left (value increases by 1000 times)',
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Divide by 1000
 * Divide whole numbers and decimals by 1000
 */
function generateDivideBy1000(params, level) {
    const useDecimal = params.allow_decimals && Math.random() < 0.5;

    let number, answer;
    if (useDecimal) {
        number = generateDecimal(1000, 10000, params.decimal_places);
        answer = Number((number / 1000).toFixed(params.decimal_places + 3));
    } else {
        number = randomInt(1000, params.whole_number_range[1]);
        answer = number / 1000;
    }

    const questionTypes = [
        `${number} ÷ 1000 = ?`,
        `What is ${number} divided by 1000?`,
        `Divide ${number} by 1000`
    ];

    const text = randomChoice(questionTypes);

    const distractors = useDecimal ?
        [number / 100, number / 10, number - 1000].filter(d => d !== answer && d > 0) :
        [answer * 10, answer * 100, answer * 1000].filter(d => d !== answer);

    const options = shuffle([answer, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Digits move three places to the right (value decreases by 1000 times)',
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Near Multiples
 * Use near multiples for mental calculation (e.g., 19 × 6 = 20 × 6 - 6)
 */
function generateNearMultiples(params, level) {
    const nearNumbers = [9, 11, 19, 21, 49, 51, 99, 101];
    const number = randomChoice(nearNumbers);
    const multiplier = randomInt(3, 8);

    const answer = number * multiplier;

    const roundedTo = number < 15 ? 10 : (number < 25 ? 20 : (number < 55 ? 50 : 100));
    const diff = number - roundedTo;
    const sign = diff > 0 ? '+' : '-';
    const adjustment = Math.abs(diff) * multiplier;

    const text = `${number} × ${multiplier} = ?`;
    const hint = `Think: ${roundedTo} × ${multiplier} = ${roundedTo * multiplier}, then ${sign} ${adjustment}`;

    const distractors = generateDistractors(answer, 3, 0, answer * 2);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: hint,
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Doubling and Halving
 * Use doubling/halving strategy (e.g., 8 × 15 = 4 × 30)
 */
function generateDoublingHalving(params, level) {
    const pairs = [
        { a: 8, b: 15 }, { a: 4, b: 25 }, { a: 16, b: 25 },
        { a: 8, b: 35 }, { a: 4, b: 45 }
    ];

    const pair = randomChoice(pairs);
    const answer = pair.a * pair.b;

    const halved = pair.a / 2;
    const doubled = pair.b * 2;

    const text = `${pair.a} × ${pair.b} = ?`;
    const hint = `Use doubling/halving: ${pair.a} × ${pair.b} = ${halved} × ${doubled}`;

    const distractors = generateDistractors(answer, 3, 0, answer * 2);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: hint,
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Partition Multiply
 * Use partitioning (e.g., 23 × 4 = (20 × 4) + (3 × 4))
 */
function generatePartitionMultiply(params, level) {
    const tens = randomInt(2, 5) * 10;
    const ones = randomInt(1, 9);
    const number = tens + ones;
    const multiplier = randomInt(3, 6);

    const answer = number * multiplier;

    const text = `${number} × ${multiplier} = ?`;
    const hint = `Partition: (${tens} × ${multiplier}) + (${ones} × ${multiplier}) = ${tens * multiplier} + ${ones * multiplier}`;

    const distractors = generateDistractors(answer, 3, 0, 300);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: hint,
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 11: Compensate
 * Use compensation (e.g., 99 × 6 = 100 × 6 - 6)
 */
function generateCompensate(params, level) {
    const nearNumbers = [9, 11, 19, 21, 49, 51, 99, 101];
    const number = randomChoice(nearNumbers);
    const multiplier = randomInt(4, 9);

    const answer = number * multiplier;

    const roundedTo = number < 15 ? 10 : (number < 25 ? 20 : (number < 55 ? 50 : 100));
    const diff = number - roundedTo;
    const sign = diff > 0 ? '-' : '+';
    const adjustment = Math.abs(diff) * multiplier;

    const text = `${number} × ${multiplier} = ?`;
    const hint = `${roundedTo} × ${multiplier} = ${roundedTo * multiplier}, then ${sign} ${adjustment}`;

    const distractors = generateDistractors(answer, 3, 0, answer * 2);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: hint,
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 12: Chain Operations (Level 4)
 * Multiple operations (e.g., 45 × 20 = 45 × 10 × 2)
 */
function generateChainOperations(params, level) {
    const base = randomInt(12, 50);
    const multiplier = randomChoice([20, 40, 50]);

    const answer = base * multiplier;

    const breakdown = multiplier === 20 ? '10 × 2' : (multiplier === 40 ? '10 × 4' : '10 × 5');

    const text = `${base} × ${multiplier} = ?`;
    const hint = `${base} × ${multiplier} = ${base} × ${breakdown} = ${base * 10} × ${multiplier / 10}`;

    const distractors = generateDistractors(answer, 3, 0, answer * 2);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: hint,
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 13: Decimal Mental (Level 4)
 * Simple decimal multiplication/division
 * Now generates questions dynamically using parameters
 */
function generateDecimalMental(params, level) {
    const opType = randomChoice(['multiply', 'divide']);

    // Common decimal fractions that work well for mental math
    const friendlyDecimals = [0.5, 1.5, 2.5, 3.5, 4.5, 7.5, 12.5];
    const a = randomChoice(friendlyDecimals);
    const b = randomInt(2, 8);

    let answer, hint, text;

    if (opType === 'multiply') {
        answer = Number((a * b).toFixed(params.decimal_places || 1));
        const whole = Math.floor(a);
        const fraction = a - whole;
        text = `${a} × ${b} = ?`;
        hint = `${a} = ${whole} + ${fraction}, so (${whole} × ${b}) + (${fraction} × ${b})`;
    } else {
        // For division, ensure clean result
        const product = a * b;
        answer = a;
        text = `${product} ÷ ${b} = ?`;
        hint = `${product} ÷ ${b} = ${a}`;
        // Swap for question clarity
        [answer, text] = [a, `${Number(product.toFixed(1))} ÷ ${b} = ?`];
    }

    // Generate smart distractors
    const distractors = [];
    if (opType === 'multiply') {
        distractors.push(Number((a * (b + 1)).toFixed(1))); // Off by one
        distractors.push(Number((a * (b - 1)).toFixed(1))); // Off by one
        distractors.push(Number((a + b).toFixed(1)));        // Addition error
    } else {
        distractors.push(Number((answer + 1).toFixed(1)));
        distractors.push(Number((answer - 1).toFixed(1)));
        distractors.push(Number((answer * 2).toFixed(1)));
    }

    const validDistractors = distractors.filter(d => d > 0 && d !== answer).slice(0, 3);
    const options = shuffle([answer, ...validDistractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: hint,
        module: 'C06_Y5_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C06_Y5_CALC',
    generate: generateQuestion
};
