/**
 * C08 Property Helpers
 *
 * Shared utility functions for C08 question generators (mathematical properties and problem-solving)
 *
 * Provides functions for:
 * - Multiplication/division word problems
 * - Commutative, associative, distributive properties
 * - Scaling and correspondence problems
 * - Factor/multiple problems
 * - Rate and fraction problems
 */

import { randomInt, randomChoice, shuffle } from './N02_numberHelpers.js';
import { generateMultiplication, generateDivision } from './C01_C03_calculationHelpers.js';

// ============================================================================
// MULTIPLICATION/DIVISION WORD PROBLEMS (Y1-2)
// ============================================================================

/**
 * Generate equal groups problem
 * Example: "There are 3 boxes with 4 pencils in each box. How many pencils altogether?"
 */
export function generateEqualGroups(tables, maxProduct) {
    const multiplier = randomChoice(tables);
    const maxGroups = Math.floor(maxProduct / multiplier);
    const groups = randomInt(2, Math.min(maxGroups, 10));
    const answer = groups * multiplier;

    const contexts = [
        { item: 'pencils', container: 'boxes' },
        { item: 'apples', container: 'bags' },
        { item: 'books', container: 'shelves' },
        { item: 'eggs', container: 'boxes' },
        { item: 'stickers', container: 'sheets' }
    ];
    const context = randomChoice(contexts);

    const text = `There are ${groups} ${context.container} with ${multiplier} ${context.item} in each ${context.container.slice(0, -1)}. How many ${context.item} altogether?`;

    return {
        text,
        answer,
        working: `${groups} × ${multiplier} = ${answer}`,
        operation: 'equal_groups',
        values: { groups, perGroup: multiplier, total: answer }
    };
}

/**
 * Generate array multiplication problem
 * Example: "An array has 3 rows with 5 items in each row. How many items in total?"
 */
export function generateArrayMultiplication(tables, maxProduct) {
    const rows = randomChoice(tables);
    const maxCols = Math.floor(maxProduct / rows);
    const cols = randomInt(2, Math.min(maxCols, 10));
    const answer = rows * cols;

    const items = ['dots', 'squares', 'circles', 'stars', 'counters'];
    const item = randomChoice(items);

    const text = `An array has ${rows} rows with ${cols} ${item} in each row. How many ${item} in total?`;

    return {
        text,
        answer,
        working: `${rows} × ${cols} = ${answer}`,
        operation: 'array_multiplication',
        values: { rows, cols, total: answer }
    };
}

/**
 * Generate sharing division problem
 * Example: "Share 12 apples equally between 3 people. How many does each person get?"
 */
export function generateSharing(tables, maxProduct, exactOnly = true) {
    const divisor = randomChoice(tables);
    const quotient = randomInt(1, Math.floor(maxProduct / divisor));
    let dividend = divisor * quotient;
    let remainder = 0;

    if (!exactOnly && Math.random() < 0.3) {
        remainder = randomInt(1, divisor - 1);
        dividend += remainder;
    }

    const contexts = [
        { item: 'apples', shareWith: 'people' },
        { item: 'sweets', shareWith: 'children' },
        { item: 'pencils', shareWith: 'students' },
        { item: 'cookies', shareWith: 'friends' },
        { item: 'stickers', shareWith: 'people' }
    ];
    const context = randomChoice(contexts);

    let text, answerText;
    if (remainder === 0) {
        text = `Share ${dividend} ${context.item} equally between ${divisor} ${context.shareWith}. How many does each person get?`;
        answerText = quotient.toString();
    } else {
        text = `Share ${dividend} ${context.item} equally between ${divisor} ${context.shareWith}. How many does each person get? (Any remainder can be ignored)`;
        answerText = quotient.toString();
    }

    return {
        text,
        answer: answerText,
        working: `${dividend} ÷ ${divisor} = ${quotient}${remainder > 0 ? ` remainder ${remainder}` : ''}`,
        operation: 'sharing',
        values: { total: dividend, groups: divisor, perGroup: quotient, remainder }
    };
}

/**
 * Generate grouping division problem
 * Example: "There are 15 apples. Put them into groups of 3. How many groups?"
 */
export function generateGrouping(tables, maxProduct) {
    const itemsPerGroup = randomChoice(tables);
    const groups = randomInt(2, Math.floor(maxProduct / itemsPerGroup));
    const total = groups * itemsPerGroup;

    const items = ['apples', 'pencils', 'books', 'sweets', 'marbles'];
    const item = randomChoice(items);

    const text = `There are ${total} ${item}. Put them into groups of ${itemsPerGroup}. How many groups?`;

    return {
        text,
        answer: groups,
        working: `${total} ÷ ${itemsPerGroup} = ${groups}`,
        operation: 'grouping',
        values: { total, itemsPerGroup, groups }
    };
}

/**
 * Generate repeated addition problem
 * Example: "Calculate: 5 + 5 + 5 + 5"
 */
export function generateRepeatedAddition(tables, maxProduct) {
    const addend = randomChoice(tables);
    const maxRepeats = Math.floor(maxProduct / addend);
    const repeats = randomInt(2, Math.min(maxRepeats, 6));
    const answer = addend * repeats;

    const addends = Array(repeats).fill(addend);
    const text = `Calculate: ${addends.join(' + ')}`;

    return {
        text,
        answer,
        working: `${repeats} × ${addend} = ${answer}`,
        operation: 'repeated_addition',
        values: { addend, repeats, answer }
    };
}

/**
 * Generate array division problem
 * Example: "12 items are arranged in 3 rows. How many items in each row?"
 */
export function generateArrayDivision(tables, maxProduct) {
    const rows = randomChoice(tables);
    const cols = randomInt(2, Math.floor(maxProduct / rows));
    const total = rows * cols;

    const items = ['items', 'dots', 'squares', 'stars'];
    const item = randomChoice(items);

    const text = `${total} ${item} are arranged in ${rows} equal rows. How many ${item} in each row?`;

    return {
        text,
        answer: cols,
        working: `${total} ÷ ${rows} = ${cols}`,
        operation: 'array_division',
        values: { total, rows, cols }
    };
}

// ============================================================================
// COMMUTATIVE PROPERTY (Y2)
// ============================================================================

/**
 * Generate commutative multiplication question
 * Example: "True or false: 3 × 5 = 5 × 3"
 */
export function generateCommutativeMultiplication(tables) {
    const a = randomChoice(tables);
    const b = randomChoice(tables.filter(x => x !== a));

    const text = `True or false: ${a} × ${b} = ${b} × ${a}`;
    const answer = 'true';
    const working = `Both equal ${a * b}. Multiplication is commutative.`;

    return { text, answer, working, operation: 'commutative_mult' };
}

/**
 * Generate commutative addition question
 */
export function generateCommutativeAddition(maxValue) {
    const a = randomInt(5, maxValue / 2);
    const b = randomInt(5, maxValue / 2);

    const text = `True or false: ${a} + ${b} = ${b} + ${a}`;
    const answer = 'true';
    const working = `Both equal ${a + b}. Addition is commutative.`;

    return { text, answer, working, operation: 'commutative_add' };
}

/**
 * Generate non-commutative subtraction question
 * Example: "Does 10 - 3 = 3 - 10? Why not?"
 */
export function generateNonCommutativeSubtraction(maxValue) {
    const a = randomInt(10, maxValue);
    const b = randomInt(5, a - 1);

    const text = `True or false: ${a} - ${b} = ${b} - ${a}`;
    const answer = 'false';
    const working = `${a} - ${b} = ${a - b}, but ${b} - ${a} = ${b - a}. Subtraction is NOT commutative.`;

    return { text, answer, working, operation: 'non_commutative_sub' };
}

/**
 * Generate non-commutative division question
 */
export function generateNonCommutativeDivision(tables) {
    const divisor = randomChoice(tables);
    const quotient = randomChoice(tables.filter(x => x !== divisor));
    const dividend = divisor * quotient;

    const text = `True or false: ${dividend} ÷ ${divisor} = ${divisor} ÷ ${dividend}`;
    const answer = 'false';
    const working = `${dividend} ÷ ${divisor} = ${quotient}, but ${divisor} ÷ ${dividend} = ${divisor / dividend}. Division is NOT commutative.`;

    return { text, answer, working, operation: 'non_commutative_div' };
}

// ============================================================================
// SCALING PROBLEMS (Y3-4)
// ============================================================================

/**
 * Generate integer scaling problem
 * Example: "One book costs £4. How much do 5 books cost?"
 */
export function generateIntegerScaling(scalingFactors, maxProduct) {
    const unitCost = randomInt(2, Math.floor(maxProduct / Math.max(...scalingFactors)));
    const scaleFactor = randomChoice(scalingFactors);
    const answer = unitCost * scaleFactor;

    const contexts = [
        { item: 'book', unit: '£' },
        { item: 'pencil', unit: 'p' },
        { item: 'apple', unit: 'p' },
        { item: 'ticket', unit: '£' },
        { item: 'toy', unit: '£' }
    ];
    const context = randomChoice(contexts);

    const text = `One ${context.item} costs ${context.unit}${unitCost}. How much do ${scaleFactor} ${context.item}s cost?`;

    return {
        text,
        answer,
        working: `${unitCost} × ${scaleFactor} = ${answer}`,
        operation: 'integer_scaling',
        values: { unitCost, scaleFactor, totalCost: answer }
    };
}

/**
 * Generate simple correspondence problem
 * Example: "One box has 5 pencils. How many pencils in 4 boxes?"
 */
export function generateSimpleCorrespondence(correspondenceRatios, maxProduct) {
    const [n, m] = randomChoice(correspondenceRatios);
    const maxMultiplier = Math.floor(maxProduct / m);
    const multiplier = randomInt(2, Math.min(maxMultiplier, 10));
    const answer = multiplier * m;

    const contexts = [
        { container: 'box', item: 'pencils' },
        { container: 'bag', item: 'apples' },
        { container: 'pack', item: 'cards' },
        { container: 'shelf', item: 'books' },
        { container: 'carton', item: 'eggs' }
    ];
    const context = randomChoice(contexts);

    const text = `${n === 1 ? 'One' : n} ${context.container}${n === 1 ? '' : 'es'} ${n === 1 ? 'has' : 'have'} ${m} ${context.item}. How many ${context.item} in ${multiplier} ${context.container}es?`;

    return {
        text,
        answer,
        working: `${m} × ${multiplier} = ${answer}`,
        operation: 'simple_correspondence',
        values: { n, m, multiplier, answer }
    };
}

/**
 * Generate complex correspondence problem (requires finding unit rate first)
 * Example: "3 boxes have 15 pencils. How many pencils in 7 boxes?"
 */
export function generateComplexCorrespondence(correspondenceRatios, maxProduct) {
    const [n, m] = randomChoice(correspondenceRatios.filter(([a, b]) => b % a === 0)); // Ensure exact division
    const perUnit = m / n;
    const maxFinalUnits = Math.floor(maxProduct / perUnit);
    const finalUnits = randomInt(n + 1, Math.min(maxFinalUnits, 15));
    const answer = finalUnits * perUnit;

    const contexts = [
        { container: 'box', item: 'pencils' },
        { container: 'bag', item: 'marbles' },
        { container: 'pack', item: 'stickers' },
        { container: 'crate', item: 'bottles' }
    ];
    const context = randomChoice(contexts);

    const text = `${n} ${context.container}${n === 1 ? '' : 'es'} have ${m} ${context.item}. How many ${context.item} in ${finalUnits} ${context.container}es?`;

    return {
        text,
        answer,
        working: `${m} ÷ ${n} = ${perUnit} per ${context.container}. ${finalUnits} × ${perUnit} = ${answer}`,
        operation: 'complex_correspondence',
        values: { n, m, perUnit, finalUnits, answer }
    };
}

// ============================================================================
// DISTRIBUTIVE LAW (Y4)
// ============================================================================

/**
 * Generate simple distributive law problem
 * Example: "Calculate 14 × 3 using (10 × 3) + (4 × 3)"
 */
export function generateDistributiveSimple(twoDigitRange, oneDigitMultipliers) {
    const twoDigit = randomInt(twoDigitRange[0], twoDigitRange[1]);
    const oneDigit = randomChoice(oneDigitMultipliers);

    const tens = Math.floor(twoDigit / 10) * 10;
    const ones = twoDigit % 10;
    const answer = twoDigit * oneDigit;

    const text = `Calculate ${twoDigit} × ${oneDigit} using the distributive law: (${tens} × ${oneDigit}) + (${ones} × ${oneDigit})`;

    return {
        text,
        answer,
        working: `(${tens} × ${oneDigit}) + (${ones} × ${oneDigit}) = ${tens * oneDigit} + ${ones * oneDigit} = ${answer}`,
        operation: 'distributive_simple',
        values: { twoDigit, oneDigit, tens, ones, answer }
    };
}

/**
 * Generate distributive law application in word problem
 * Example: "A school has 14 classes with 3 computers in each. How many computers?"
 */
export function generateDistributiveApplication(twoDigitRange, oneDigitMultipliers) {
    const groups = randomInt(twoDigitRange[0], twoDigitRange[1]);
    const perGroup = randomChoice(oneDigitMultipliers);
    const answer = groups * perGroup;

    const contexts = [
        { group: 'classes', item: 'computers' },
        { group: 'boxes', item: 'pens' },
        { group: 'shelves', item: 'books' },
        { group: 'teams', item: 'players' }
    ];
    const context = randomChoice(contexts);

    const tens = Math.floor(groups / 10) * 10;
    const ones = groups % 10;

    const text = `A school has ${groups} ${context.group} with ${perGroup} ${context.item} in each. How many ${context.item} in total?`;

    return {
        text,
        answer,
        working: `${groups} × ${perGroup} = (${tens} + ${ones}) × ${perGroup} = ${tens * perGroup} + ${ones * perGroup} = ${answer}`,
        operation: 'distributive_application',
        values: { groups, perGroup, answer }
    };
}

/**
 * Generate multiply then add/subtract problem
 * Example: "Calculate (4 × 7) + 5"
 */
export function generateMultiplyThenAdd(tables, maxProduct, isSubtract = false) {
    const a = randomChoice(tables);
    const b = randomChoice(tables);
    const product = a * b;

    const addend = randomInt(1, Math.min(20, maxProduct - product));
    const answer = isSubtract ? product - addend : product + addend;
    const operator = isSubtract ? '-' : '+';

    const text = `Calculate (${a} × ${b}) ${operator} ${addend}`;

    return {
        text,
        answer,
        working: `${a} × ${b} = ${product}, ${product} ${operator} ${addend} = ${answer}`,
        operation: isSubtract ? 'multiply_then_subtract' : 'multiply_then_add',
        values: { a, b, product, addend, answer }
    };
}

// ============================================================================
// FACTORS AND MULTIPLES (Y5)
// ============================================================================

/**
 * Generate factor problem
 * Example: "List all factors of 24"
 */
export function generateFactorProblem(factorRange) {
    const number = randomInt(factorRange[0] + 5, factorRange[1]);
    const factors = [];

    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }

    const questionTypes = [
        {
            text: `How many factors does ${number} have?`,
            answer: factors.length.toString(),
            working: `Factors of ${number}: ${factors.join(', ')}`
        },
        {
            text: `What is the largest factor of ${number} (other than ${number} itself)?`,
            answer: factors[factors.length - 2].toString(),
            working: `Factors: ${factors.join(', ')}. Second largest is ${factors[factors.length - 2]}`
        }
    ];

    return randomChoice(questionTypes);
}

/**
 * Generate multiple problem
 * Example: "What is the 5th multiple of 7?"
 */
export function generateMultipleProblem(maxValue) {
    const base = randomInt(2, 12);
    const position = randomInt(3, 10);
    const answer = base * position;

    if (answer > maxValue) {
        // Adjust position if answer exceeds max
        const adjustedPosition = Math.floor(maxValue / base);
        return {
            text: `What is the ${adjustedPosition}${getOrdinalSuffix(adjustedPosition)} multiple of ${base}?`,
            answer: (base * adjustedPosition).toString(),
            working: `${base} × ${adjustedPosition} = ${base * adjustedPosition}`,
            operation: 'multiple_problems'
        };
    }

    const text = `What is the ${position}${getOrdinalSuffix(position)} multiple of ${base}?`;

    return {
        text,
        answer: answer.toString(),
        working: `${base} × ${position} = ${answer}`,
        operation: 'multiple_problems'
    };
}

/**
 * Generate square/cube problem
 * Example: "A square has area 49 cm². What is the side length?"
 */
export function generateSquareCubeProblem(squareRange, cubeRange) {
    const useSquare = Math.random() < 0.7; // 70% squares, 30% cubes

    if (useSquare) {
        const side = randomInt(squareRange[0], squareRange[1]);
        const area = side * side;

        const text = `A square has area ${area} cm². What is the side length?`;

        return {
            text,
            answer: side.toString(),
            working: `√${area} = ${side}`,
            operation: 'square_cube_problems',
            values: { area, side, type: 'square' }
        };
    } else {
        const side = randomInt(cubeRange[0], cubeRange[1]);
        const volume = side * side * side;

        const text = `A cube has volume ${volume} cm³. What is the edge length?`;

        return {
            text,
            answer: side.toString(),
            working: `∛${volume} = ${side}`,
            operation: 'square_cube_problems',
            values: { volume, side, type: 'cube' }
        };
    }
}

/**
 * Generate simple rate problem
 * Example: "A car travels at 60 km/h. How far in 3 hours?"
 */
export function generateSimpleRate(rateUnits, maxValue) {
    const [unit1, unit2] = randomChoice(rateUnits);
    const rate = randomInt(10, 100);
    const time = randomInt(2, 10);
    const distance = rate * time;

    if (distance > maxValue) {
        const adjustedTime = Math.floor(maxValue / rate);
        return {
            text: `A car travels at ${rate} ${unit1}/${unit2}. How far does it travel in ${adjustedTime} ${unit2}s?`,
            answer: (rate * adjustedTime).toString(),
            working: `${rate} × ${adjustedTime} = ${rate * adjustedTime} ${unit1}`,
            operation: 'simple_rate'
        };
    }

    const text = `A car travels at ${rate} ${unit1}/${unit2}. How far does it travel in ${time} ${unit2}s?`;

    return {
        text,
        answer: distance.toString(),
        working: `${rate} × ${time} = ${distance} ${unit1}`,
        operation: 'simple_rate',
        values: { rate, time, distance, unit1, unit2 }
    };
}

/**
 * Generate fraction scaling problem
 * Example: "Find 1/3 of 24"
 */
export function generateFractionScaling(simpleFractions, maxValue) {
    const fractionStr = randomChoice(simpleFractions);
    const [num, denom] = fractionStr.split('/').map(Number);

    // Ensure result is whole number
    const wholeResult = randomInt(1, Math.floor(maxValue / num));
    const startValue = wholeResult * denom;

    const text = `Find ${fractionStr} of ${startValue}`;
    const answer = wholeResult * num;

    return {
        text,
        answer: answer.toString(),
        working: `${startValue} ÷ ${denom} = ${wholeResult}, ${wholeResult} × ${num} = ${answer}`,
        operation: 'fraction_scaling',
        values: { fraction: fractionStr, startValue, answer }
    };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(n) {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

/**
 * Generate strategic distractors for multiplication/division problems
 */
export function generateMultDivDistractors(correctAnswer, problemData, operation) {
    const distractors = new Set();

    if (operation === 'multiplication' || operation === 'equal_groups' || operation === 'array_multiplication') {
        const { a, b } = problemData.values || {};
        if (a && b) {
            // Common error: added instead of multiplied
            distractors.add(a + b);
            // Off by one multiplication
            distractors.add(a * (b + 1));
            distractors.add(a * (b - 1));
        }
    } else if (operation === 'division' || operation === 'sharing' || operation === 'grouping') {
        const { dividend, divisor } = problemData.values || {};
        if (dividend && divisor) {
            // Wrong operation
            distractors.add(dividend - divisor);
            // Reversed division
            if (dividend > 0) distractors.add(Math.floor(divisor / dividend));
            // Off by one
            if (correctAnswer > 0) {
                distractors.add(correctAnswer + 1);
                distractors.add(correctAnswer - 1);
            }
        }
    }

    // Fill remaining with nearby numbers
    while (distractors.size < 3) {
        const distractor = randomInt(Math.max(1, correctAnswer - 5), correctAnswer + 5);
        if (distractor !== correctAnswer && distractor > 0) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}
