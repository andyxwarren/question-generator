/**
 * C04 Problem-Solving Helpers
 *
 * Shared utility functions for C04 question generators (add/subtract problem-solving)
 *
 * Design Principles:
 * - Controlled variety: Small set of familiar contexts for mathematical focus
 * - Realistic validation: Ensure problems make logical sense
 * - Reversed format support: Include "7 = ___ - 9" regularly
 * - Strategic distractors: Target specific misconceptions
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './N02_numberHelpers.js';
import { generateAddition, generateSubtraction } from './C01_C03_calculationHelpers.js';

// ============================================================================
// CONTROLLED CONTEXT TEMPLATES
// ============================================================================

/**
 * Get a limited set of controlled contexts for objects
 * These repeat regularly to keep focus on mathematics, not scenarios
 */
export function getObjectContext() {
    const contexts = [
        { item: 'apples', container: 'basket', action_get: 'picks', action_lose: 'eats', action_lose_past: 'ate', action_lose_gerund: 'eating' },
        { item: 'books', container: 'shelf', action_get: 'buys', action_lose: 'lends', action_lose_past: 'lent', action_lose_gerund: 'lending' },
        { item: 'marbles', container: 'bag', action_get: 'finds', action_lose: 'loses', action_lose_past: 'lost', action_lose_gerund: 'losing' },
        { item: 'stickers', container: 'collection', action_get: 'gets', action_lose: 'gives away', action_lose_past: 'gave away', action_lose_gerund: 'giving away' },
        { item: 'pencils', container: 'box', action_get: 'buys', action_lose: 'uses', action_lose_past: 'used', action_lose_gerund: 'using' }
    ];
    return randomChoice(contexts);
}

/**
 * Get controlled names (small set for familiarity)
 */
export function getControlledName() {
    const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan'];
    return randomChoice(names);
}

/**
 * Get scenario context (shop, library, classroom)
 */
export function getScenarioContext() {
    const scenarios = [
        { place: 'shop', items: 'items', action_add: 'delivered', action_remove: 'sold' },
        { place: 'library', items: 'books', action_add: 'arrive', action_remove: 'borrowed' },
        { place: 'classroom', items: 'students', action_add: 'join', action_remove: 'leave' },
        { place: 'car park', items: 'cars', action_add: 'arrive', action_remove: 'leave' }
    ];
    return randomChoice(scenarios);
}

// ============================================================================
// ONE-STEP PROBLEM GENERATORS
// ============================================================================

/**
 * Generate simple addition word problem
 * Returns complete question object
 */
export function generateOneStepAddition(minValue, maxValue, params) {
    const { a, b, answer } = generateAddition(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const templates = [
        {
            text: `${name} has ${a} ${context.item}. ${name} ${context.action_get} ${b} more. How many ${context.item} does ${name} have now?`,
            type: 'increase'
        },
        {
            text: `There are ${a} ${context.item} in one ${context.container} and ${b} ${context.item} in another ${context.container}. How many ${context.item} altogether?`,
            type: 'combine'
        },
        {
            text: `${name} has ${a} ${context.item}. A friend gives ${name} ${b} more ${context.item}. How many ${context.item} does ${name} have in total?`,
            type: 'increase'
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: answer,
        working: `${a} + ${b} = ${answer}`,
        operation: 'addition',
        values: { a, b, answer }
    };
}

/**
 * Generate simple subtraction word problem
 */
export function generateOneStepSubtraction(minValue, maxValue, params) {
    const { a, b, answer } = generateSubtraction(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const templates = [
        {
            text: `${name} has ${a} ${context.item}. ${name} ${context.action_lose} ${b} ${context.item}. How many ${context.item} are left?`,
            type: 'take_away'
        },
        {
            text: `There are ${a} ${context.item} in a ${context.container}. ${b} ${context.item} are removed. How many ${context.item} remain?`,
            type: 'take_away'
        },
        {
            text: `${name} has ${a} ${context.item}. ${name} gives ${b} ${context.item} to a friend. How many ${context.item} does ${name} have now?`,
            type: 'take_away'
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: answer,
        working: `${a} - ${b} = ${answer}`,
        operation: 'subtraction',
        values: { a, b, answer }
    };
}

// ============================================================================
// MISSING NUMBER PROBLEM GENERATORS
// ============================================================================

/**
 * Generate missing addend problem: a + ? = c
 */
export function generateMissingAddend(minValue, maxValue, params) {
    const { a, b, answer } = generateAddition(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    // Determine if we should use reversed format
    const useReversed = params.reversed_format_frequency && Math.random() < params.reversed_format_frequency;

    let equation, text;
    if (useReversed) {
        // Reversed format: "answer = ? + a" or "answer = a + ?"
        const unknownFirst = randomChoice([true, false]);
        if (unknownFirst) {
            equation = `${answer} = ___ + ${a}`;
            text = `${name} needs ${answer} ${context.item} altogether. ${name} has ${a} ${context.item}. How many more ${context.item} does ${name} need?`;
        } else {
            equation = `${answer} = ${a} + ___`;
            text = `${name} wants ${answer} ${context.item}. ${name} already has ${a} ${context.item}. How many more ${context.item} does ${name} need?`;
        }
    } else {
        // Standard format: "a + ? = answer"
        equation = `${a} + ___ = ${answer}`;
        text = `${name} has ${a} ${context.item}. ${name} needs ${answer} ${context.item} in total. How many more ${context.item} does ${name} need?`;
    }

    return {
        text: text,
        equation: equation,
        answer: b,
        working: `${answer} - ${a} = ${b}`,
        operation: 'missing_addend',
        values: { a, b, answer },
        reversed: useReversed
    };
}

/**
 * Generate missing subtrahend problem: a - ? = c
 */
export function generateMissingSubtrahend(minValue, maxValue, params) {
    const { a, b, answer } = generateSubtraction(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const useReversed = params.reversed_format_frequency && Math.random() < params.reversed_format_frequency;

    let equation, text;
    if (useReversed) {
        // Reversed format: "answer = a - ?"
        equation = `${answer} = ${a} - ___`;
        text = `${name} had ${a} ${context.item}. After ${context.action_lose_gerund} some, ${name} has ${answer} ${context.item} left. How many ${context.item} did ${name} ${context.action_lose}?`;
    } else {
        // Standard format: "a - ? = answer"
        equation = `${a} - ___ = ${answer}`;
        text = `${name} has ${a} ${context.item}. After ${context.action_lose_gerund} some, ${name} has ${answer} ${context.item} left. How many ${context.item} did ${name} ${context.action_lose}?`;
    }

    return {
        text: text,
        equation: equation,
        answer: b,
        working: `${a} - ${answer} = ${b}`,
        operation: 'missing_subtrahend',
        values: { a, b, answer },
        reversed: useReversed
    };
}

/**
 * Generate missing minuend problem: ? - b = c
 */
export function generateMissingMinuend(minValue, maxValue, params) {
    const { a, b, answer } = generateSubtraction(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const useReversed = params.reversed_format_frequency && Math.random() < params.reversed_format_frequency;

    let equation, text;
    if (useReversed) {
        // Reversed format: "answer = ? - b"
        equation = `${answer} = ___ - ${b}`;
        text = `${name} ${context.action_lose_past} ${b} ${context.item} and has ${answer} ${context.item} left. How many ${context.item} did ${name} have at the start?`;
    } else {
        // Standard format: "? - b = answer"
        equation = `___ - ${b} = ${answer}`;
        text = `${name} has some ${context.item}. After ${context.action_lose_gerund} ${b} ${context.item}, ${name} has ${answer} ${context.item} left. How many ${context.item} did ${name} have at the start?`;
    }

    return {
        text: text,
        equation: equation,
        answer: a,
        working: `${b} + ${answer} = ${a}`,
        operation: 'missing_minuend',
        values: { a, b, answer },
        reversed: useReversed
    };
}

// ============================================================================
// TWO-STEP PROBLEM GENERATORS
// ============================================================================

/**
 * Generate "combine then remove" two-step problem
 * Example: Shop has 45 red + 38 blue balloons. 27 are sold. How many left?
 */
export function generateCombineThenRemove(minValue, maxValue, params) {
    const context = getScenarioContext();

    // Generate two numbers to add
    const sum = randomInt(minValue + 10, maxValue);
    const a = randomInt(Math.floor(sum * 0.3), Math.floor(sum * 0.7));
    const b = sum - a;

    // Generate amount to subtract (ensure positive result)
    const subtractAmount = randomInt(Math.floor(sum * 0.2), Math.floor(sum * 0.6));
    const finalAnswer = sum - subtractAmount;

    const templates = [
        {
            text: `A ${context.place} has ${a} ${context.items} in the morning and ${b} ${context.items} in the afternoon. Then ${subtractAmount} ${context.items} are ${context.action_remove}. How many ${context.items} are left?`,
            explicit: true
        },
        {
            text: `There are ${a} ${context.items} in one room and ${b} ${context.items} in another room. ${subtractAmount} ${context.items} ${context.action_remove}. How many ${context.items} remain?`,
            explicit: true
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: finalAnswer,
        working: `(${a} + ${b}) - ${subtractAmount} = ${sum} - ${subtractAmount} = ${finalAnswer}`,
        operation: 'combine_then_remove',
        steps: 2,
        values: { a, b, sum, subtractAmount, finalAnswer },
        step1: { operation: 'add', values: [a, b], result: sum },
        step2: { operation: 'subtract', values: [sum, subtractAmount], result: finalAnswer }
    };
}

/**
 * Generate "remove then add" two-step problem
 * Example: Library has 156 books. 42 are borrowed. Then 28 new books arrive. How many now?
 */
export function generateRemoveThenAdd(minValue, maxValue, params) {
    const context = getScenarioContext();

    // Generate starting amount
    const start = randomInt(minValue + 20, maxValue);

    // Amount to subtract
    const subtractAmount = randomInt(Math.floor(start * 0.2), Math.floor(start * 0.5));
    const afterSubtract = start - subtractAmount;

    // Amount to add back
    const addAmount = randomInt(Math.floor(start * 0.1), Math.floor(start * 0.4));
    const finalAnswer = afterSubtract + addAmount;

    const templates = [
        {
            text: `A ${context.place} has ${start} ${context.items}. ${subtractAmount} ${context.items} are ${context.action_remove}. Then ${addAmount} new ${context.items} ${context.action_add}. How many ${context.items} are there now?`,
            explicit: true
        },
        {
            text: `There are ${start} ${context.items}. ${subtractAmount} ${context.items} ${context.action_remove}. Later, ${addAmount} more ${context.items} ${context.action_add}. How many ${context.items} in total?`,
            explicit: true
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: finalAnswer,
        working: `(${start} - ${subtractAmount}) + ${addAmount} = ${afterSubtract} + ${addAmount} = ${finalAnswer}`,
        operation: 'remove_then_add',
        steps: 2,
        values: { start, subtractAmount, afterSubtract, addAmount, finalAnswer },
        step1: { operation: 'subtract', values: [start, subtractAmount], result: afterSubtract },
        step2: { operation: 'add', values: [afterSubtract, addAmount], result: finalAnswer }
    };
}

/**
 * Generate "two additions" problem
 * Example: Class 1 has 28, Class 2 has 32, Class 3 has 25. Total students?
 */
export function generateTwoAdditions(minValue, maxValue, params) {
    const total = randomInt(minValue + 20, maxValue);
    const a = randomInt(Math.floor(total * 0.25), Math.floor(total * 0.4));
    const remaining = total - a;
    const b = randomInt(Math.floor(remaining * 0.4), Math.floor(remaining * 0.6));
    const c = total - a - b;

    const contexts = [
        {
            text: `Class 1 has ${a} students, Class 2 has ${b} students, and Class 3 has ${c} students. How many students in total?`,
            items: 'students'
        },
        {
            text: `A shop has ${a} red apples, ${b} green apples, and ${c} yellow apples. How many apples altogether?`,
            items: 'apples'
        },
        {
            text: `There are ${a} books on the first shelf, ${b} books on the second shelf, and ${c} books on the third shelf. How many books in total?`,
            items: 'books'
        }
    ];

    const context = randomChoice(contexts);

    return {
        text: context.text,
        answer: total,
        working: `${a} + ${b} + ${c} = ${total}`,
        operation: 'two_additions',
        steps: 2,
        values: { a, b, c, total },
        step1: { operation: 'add', values: [a, b], result: a + b },
        step2: { operation: 'add', values: [a + b, c], result: total }
    };
}

/**
 * Generate "two subtractions" problem
 * Example: Farmer has 240 eggs. Sells 85 on Monday, 63 on Tuesday. How many left?
 */
export function generateTwoSubtractions(minValue, maxValue, params) {
    const start = randomInt(minValue + 30, maxValue);

    const subtract1 = randomInt(Math.floor(start * 0.2), Math.floor(start * 0.4));
    const afterFirst = start - subtract1;

    const subtract2 = randomInt(Math.floor(afterFirst * 0.2), Math.floor(afterFirst * 0.5));
    const finalAnswer = afterFirst - subtract2;

    const contexts = [
        {
            text: `A farmer has ${start} eggs. The farmer sells ${subtract1} eggs on Monday and ${subtract2} eggs on Tuesday. How many eggs are left?`,
            items: 'eggs'
        },
        {
            text: `A shop has ${start} items. ${subtract1} items are sold in the morning and ${subtract2} items are sold in the afternoon. How many items remain?`,
            items: 'items'
        },
        {
            text: `There are ${start} books in a library. ${subtract1} books are borrowed on Monday and ${subtract2} books are borrowed on Tuesday. How many books are left?`,
            items: 'books'
        }
    ];

    const context = randomChoice(contexts);

    return {
        text: context.text,
        answer: finalAnswer,
        working: `${start} - ${subtract1} - ${subtract2} = ${afterFirst} - ${subtract2} = ${finalAnswer}`,
        operation: 'two_subtractions',
        steps: 2,
        values: { start, subtract1, subtract2, afterFirst, finalAnswer },
        step1: { operation: 'subtract', values: [start, subtract1], result: afterFirst },
        step2: { operation: 'subtract', values: [afterFirst, subtract2], result: finalAnswer }
    };
}

// ============================================================================
// MEASURE CONTEXT GENERATORS
// ============================================================================

/**
 * Generate money problem (pence or pounds)
 */
export function generateMoneyProblem(minValue, maxValue, params, operation) {
    const unit = randomChoice(params.money_units || ['p']);
    const symbol = unit === 'p' ? 'p' : '£';

    let problem;
    if (operation === 'addition') {
        const { a, b, answer } = generateAddition(minValue, maxValue);
        problem = {
            text: `Emma has ${a}${symbol}. She gets ${b}${symbol} more. How much money does she have now?`,
            answer: answer,
            working: `${a} + ${b} = ${answer}`,
            unit: symbol
        };
    } else {
        const { a, b, answer } = generateSubtraction(minValue, maxValue);
        problem = {
            text: `Liam has ${a}${symbol}. He spends ${b}${symbol}. How much money does he have left?`,
            answer: answer,
            working: `${a} - ${b} = ${answer}`,
            unit: symbol
        };
    }

    return problem;
}

/**
 * Generate length problem (cm, m, mm)
 */
export function generateLengthProblem(minValue, maxValue, params, operation) {
    const unit = randomChoice(params.length_units || ['cm']);

    let problem;
    if (operation === 'addition') {
        const { a, b, answer } = generateAddition(minValue, maxValue);
        problem = {
            text: `A ribbon is ${a}${unit} long. Another ribbon is ${b}${unit} long. What is the total length?`,
            answer: answer,
            working: `${a} + ${b} = ${answer}`,
            unit: unit
        };
    } else {
        const { a, b, answer } = generateSubtraction(minValue, maxValue);
        problem = {
            text: `A rope is ${a}${unit} long. ${b}${unit} is cut off. How much rope is left?`,
            answer: answer,
            working: `${a} - ${b} = ${answer}`,
            unit: unit
        };
    }

    return problem;
}

/**
 * Generate mass problem (g, kg)
 */
export function generateMassProblem(minValue, maxValue, params, operation) {
    const unit = randomChoice(params.mass_units || ['g']);

    let problem;
    if (operation === 'addition') {
        const { a, b, answer } = generateAddition(minValue, maxValue);
        problem = {
            text: `One bag weighs ${a}${unit}. Another bag weighs ${b}${unit}. What is the total mass?`,
            answer: answer,
            working: `${a} + ${b} = ${answer}`,
            unit: unit
        };
    } else {
        const { a, b, answer } = generateSubtraction(minValue, maxValue);
        problem = {
            text: `A parcel weighs ${a}${unit}. ${b}${unit} is removed. How much does it weigh now?`,
            answer: answer,
            working: `${a} - ${b} = ${answer}`,
            unit: unit
        };
    }

    return problem;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate that a problem result is non-negative (for contexts where negative doesn't make sense)
 */
export function validateNonNegativeContext(result, contextType) {
    // For countable objects, money, physical quantities, result must be >= 0
    const nonNegativeContexts = ['objects', 'money', 'length', 'mass', 'capacity'];
    if (nonNegativeContexts.includes(contextType)) {
        return result >= 0;
    }
    return true; // Allow negative for other contexts (temperature, etc.)
}

/**
 * Validate that numbers are realistic for the context
 */
export function validateRealisticContext(value, contextType, unit) {
    // Add realistic bounds checking
    // For example, don't have someone with 10000 apples
    if (contextType === 'objects' && value > 1000) return false;
    if (contextType === 'money' && unit === 'p' && value > 100) return false; // Pence shouldn't exceed £1 typically
    return true;
}

// ============================================================================
// DISTRACTOR GENERATORS
// ============================================================================

/**
 * Generate strategic distractors for one-step problems
 */
export function generateOneStepDistractors(correctAnswer, values, operation, max_value) {
    const distractors = new Set();

    // Add common errors
    if (operation === 'addition') {
        distractors.add(values.a + values.b + 1); // Off by one
        distractors.add(values.a + values.b - 1); // Off by one
        if (values.b - values.a > 0) distractors.add(values.b - values.a); // Subtracted instead
    } else if (operation === 'subtraction') {
        distractors.add(values.a - values.b + 1); // Off by one
        distractors.add(values.a - values.b - 1); // Off by one
        distractors.add(values.a + values.b); // Added instead
    }

    // Fill remaining slots with nearby numbers
    while (distractors.size < 3) {
        const distractor = randomInt(Math.max(0, correctAnswer - 10), Math.min(max_value, correctAnswer + 10));
        if (distractor !== correctAnswer) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}

/**
 * Generate strategic distractors for two-step problems
 */
export function generateTwoStepDistractors(correctAnswer, problemData) {
    const distractors = new Set();
    const { step1, step2, values } = problemData;

    // Distractor 1: Only completed first step
    if (step1 && step1.result !== correctAnswer) {
        distractors.add(step1.result);
    }

    // Distractor 2: Wrong operation on second step
    if (problemData.operation === 'combine_then_remove') {
        // Added instead of subtracted in step 2
        const wrongOp = values.sum + values.subtractAmount;
        if (wrongOp !== correctAnswer) distractors.add(wrongOp);
    } else if (problemData.operation === 'remove_then_add') {
        // Subtracted instead of added in step 2
        const wrongOp = values.afterSubtract - values.addAmount;
        if (wrongOp !== correctAnswer && wrongOp >= 0) distractors.add(wrongOp);
    }

    // Distractor 3: Used wrong numbers
    if (problemData.operation === 'combine_then_remove' && values.a !== undefined) {
        const wrongNums = values.a - values.subtractAmount;
        if (wrongNums !== correctAnswer && wrongNums >= 0) distractors.add(wrongNums);
    }

    // Fill remaining with calculation errors (off by 1, off by 10, etc.)
    const errorValues = [correctAnswer + 1, correctAnswer - 1, correctAnswer + 10, correctAnswer - 10];
    for (const val of errorValues) {
        if (val >= 0 && val !== correctAnswer && distractors.size < 3) {
            distractors.add(val);
        }
    }

    // Ensure we have exactly 3 distractors
    while (distractors.size < 3) {
        const distractor = randomInt(Math.max(0, correctAnswer - 20), correctAnswer + 20);
        if (distractor !== correctAnswer && distractor >= 0) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}

// ============================================================================
// MULTI-STEP PROBLEM GENERATORS (YEAR 5-6)
// ============================================================================

/**
 * Generate multi-step addition problem (3+ sequential additions)
 * Example: "Year 3 has 142, Year 4 has 156, Year 5 has 138. Total students?"
 */
export function generateMultiStepAddition(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Generate target total
    const total = randomInt(minValue + (numSteps * 10), maxValue);

    // Generate addends that sum to total
    const addends = [];
    let remaining = total;

    for (let i = 0; i < numSteps - 1; i++) {
        const minPart = Math.floor(remaining * 0.15);
        const maxPart = Math.floor(remaining * 0.35);
        const addend = randomInt(minPart, maxPart);
        addends.push(addend);
        remaining -= addend;
    }
    addends.push(remaining); // Last addend is whatever's left

    // Shuffle to avoid predictable patterns
    const shuffledAddends = shuffle([...addends]);

    // Create context
    const contexts = [
        {
            template: (nums) => {
                const yearGroups = nums.map((n, i) => `Year ${i + 3} has ${n} students`).join(', ');
                return `A school has ${nums.length} year groups. ${yearGroups}. How many students in total?`;
            },
            items: 'students'
        },
        {
            template: (nums) => {
                const sections = nums.map((n, i) => `${n} books in section ${String.fromCharCode(65 + i)}`).join(', ');
                return `A library has ${nums.length} sections with ${sections}. How many books altogether?`;
            },
            items: 'books'
        },
        {
            template: (nums) => {
                const stores = nums.map((n, i) => `Store ${i + 1} has ${n} items`).join(', ');
                return `A chain has ${nums.length} stores. ${stores}. What is the total stock across all stores?`;
            },
            items: 'items'
        },
        {
            template: (nums) => {
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                const sales = nums.map((n, i) => `${n} on ${days[i]}`).join(', ');
                return `A shop sells ${sales}. How many items were sold in total?`;
            },
            items: 'items'
        }
    ];

    const context = randomChoice(contexts);
    const text = context.template(shuffledAddends);

    // Build working string
    const workingSteps = [];
    let runningTotal = shuffledAddends[0];
    for (let i = 1; i < shuffledAddends.length; i++) {
        runningTotal += shuffledAddends[i];
        workingSteps.push(`${shuffledAddends.slice(0, i + 1).join(' + ')} = ${runningTotal}`);
    }

    return {
        text: text,
        answer: total,
        working: workingSteps.join(', '),
        operation: 'multi_step_addition',
        steps: numSteps,
        values: { addends: shuffledAddends, total },
        allSteps: shuffledAddends.map((val, idx) => ({
            operation: 'add',
            value: val,
            runningTotal: shuffledAddends.slice(0, idx + 1).reduce((sum, v) => sum + v, 0)
        }))
    };
}

/**
 * Generate multi-step subtraction problem (3+ sequential subtractions)
 * Example: "Shop has 2456 items. Monday sells 340, Tuesday sells 285, Wednesday sells 412. How many left?"
 */
export function generateMultiStepSubtraction(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Generate starting amount
    const start = randomInt(minValue + (numSteps * 50), maxValue);

    // Generate subtractions (ensure we don't go negative)
    const subtractions = [];
    let remaining = start;

    for (let i = 0; i < numSteps; i++) {
        const maxSubtract = Math.floor(remaining * 0.3); // Don't subtract too much at once
        const minSubtract = Math.floor(remaining * 0.1);
        const subtract = randomInt(minSubtract, maxSubtract);
        subtractions.push(subtract);
        remaining -= subtract;
    }

    const finalAnswer = remaining;

    // Create context
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const contexts = [
        {
            template: (start, subs) => {
                const sales = subs.map((s, i) => `${s} items on ${days[i]}`).join(', ');
                return `A shop has ${start} items in stock. During the week, the shop sells ${sales}. How many items are left?`;
            }
        },
        {
            template: (start, subs) => {
                const withdrawals = subs.map((s, i) => `withdraws ${s} on ${days[i]}`).join(', ');
                return `A bank account starts with ${start}. Over the week, money is withdrawn: ${withdrawals}. What is the remaining balance?`;
            }
        },
        {
            template: (start, subs) => {
                const borrowed = subs.map((s, i) => `${s} books on ${days[i]}`).join(', ');
                return `A library has ${start} books. Books are borrowed throughout the week: ${borrowed}. How many books remain?`;
            }
        },
        {
            template: (start, subs) => {
                const deliveries = subs.map((s, i) => `${s} parcels on ${days[i]}`).join(', ');
                return `A warehouse has ${start} parcels. Parcels are dispatched: ${deliveries}. How many parcels are left in the warehouse?`;
            }
        }
    ];

    const context = randomChoice(contexts);
    const text = context.template(start, subtractions);

    // Build working string
    const workingSteps = [];
    let runningTotal = start;
    for (let i = 0; i < subtractions.length; i++) {
        runningTotal -= subtractions[i];
        workingSteps.push(`${start} - ${subtractions.slice(0, i + 1).join(' - ')} = ${runningTotal}`);
    }

    return {
        text: text,
        answer: finalAnswer,
        working: workingSteps[workingSteps.length - 1],
        operation: 'multi_step_subtraction',
        steps: numSteps,
        values: { start, subtractions, finalAnswer },
        allSteps: subtractions.map((val, idx) => {
            const runningTotal = start - subtractions.slice(0, idx + 1).reduce((sum, v) => sum + v, 0);
            return {
                operation: 'subtract',
                value: val,
                runningTotal: runningTotal
            };
        })
    };
}

/**
 * Generate mixed multi-step problem (combination of addition and subtraction)
 * Example: "School has 450 students. 32 join Year 7, 28 leave, 15 more join. How many now?"
 */
export function generateMultiStepMixed(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Generate starting amount
    const start = randomInt(minValue + 50, maxValue - 100);

    // Generate operations (mix of add/subtract)
    const operations = [];
    let remaining = start;

    for (let i = 0; i < numSteps; i++) {
        const isAddition = Math.random() < 0.5;

        if (isAddition) {
            const addAmount = randomInt(Math.floor(start * 0.05), Math.floor(start * 0.15));
            operations.push({ type: 'add', value: addAmount });
            remaining += addAmount;
        } else {
            const maxSubtract = Math.floor(remaining * 0.25);
            const minSubtract = Math.floor(remaining * 0.05);
            const subtractAmount = randomInt(minSubtract, maxSubtract);
            operations.push({ type: 'subtract', value: subtractAmount });
            remaining -= subtractAmount;
        }
    }

    const finalAnswer = remaining;

    // Create context - ensure operations match context
    const contexts = [
        {
            template: (start, ops) => {
                const changes = ops.map((op, i) => {
                    const action = op.type === 'add' ? 'arrive' : 'leave';
                    return `${op.value} students ${action}`;
                }).join(', then ');
                return `A school has ${start} students. Over the term, ${changes}. How many students does the school have now?`;
            }
        },
        {
            template: (start, ops) => {
                const transactions = ops.map((op, i) => {
                    const action = op.type === 'add' ? 'deposits' : 'withdraws';
                    return `${action} ${op.value}`;
                }).join(', then ');
                return `A bank account has ${start}. Someone ${transactions}. What is the final balance?`;
            }
        },
        {
            template: (start, ops) => {
                const changes = ops.map((op, i) => {
                    const action = op.type === 'add' ? 'delivered' : 'sold';
                    return `${op.value} items ${action}`;
                }).join(', then ');
                return `A shop has ${start} items in stock. ${changes}. How many items are in stock now?`;
            }
        }
    ];

    const context = randomChoice(contexts);
    const text = context.template(start, operations);

    // Build working
    let workingParts = [`${start}`];
    operations.forEach(op => {
        workingParts.push(op.type === 'add' ? `+ ${op.value}` : `- ${op.value}`);
    });
    const working = `${workingParts.join(' ')} = ${finalAnswer}`;

    return {
        text: text,
        answer: finalAnswer,
        working: working,
        operation: 'multi_step_mixed',
        steps: numSteps,
        values: { start, operations, finalAnswer },
        allSteps: operations.map((op, idx) => {
            let runningTotal = start;
            for (let i = 0; i <= idx; i++) {
                if (operations[i].type === 'add') {
                    runningTotal += operations[i].value;
                } else {
                    runningTotal -= operations[i].value;
                }
            }
            return {
                operation: op.type,
                value: op.value,
                runningTotal: runningTotal
            };
        })
    };
}

/**
 * Generate multi-step problem with inference/missing information
 * Requires working backwards or deducing unstated values
 * Example: "School has 3 year groups with same number of students. 45 absent. 321 present. How many per year?"
 */
export function generateMultiStepWithInference(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Type 1: Equal groups problem (requires division thinking + add/subtract)
    const numGroups = randomChoice([3, 4, 5]);
    const perGroup = randomInt(Math.floor(minValue / numGroups), Math.floor(maxValue / numGroups));
    const total = numGroups * perGroup;
    const absent = randomInt(Math.floor(total * 0.1), Math.floor(total * 0.2));
    const present = total - absent;

    const contexts = [
        {
            text: `A school has ${numGroups} year groups with the same number of students in each. Today ${absent} students are absent and ${present} students are present. How many students are in each year group?`,
            answer: perGroup,
            working: `Total = ${present} + ${absent} = ${total}. Per group = ${total} ÷ ${numGroups} = ${perGroup}`,
            inferenceType: 'equal_groups_with_change'
        },
        {
            text: `A shop has ${numGroups} shelves with equal numbers of books. ${absent} books are sold, leaving ${present} books. How many books were on each shelf originally?`,
            answer: perGroup,
            working: `Total originally = ${present} + ${absent} = ${total}. Per shelf = ${total} ÷ ${numGroups} = ${perGroup}`,
            inferenceType: 'equal_groups_with_change'
        }
    ];

    const context = randomChoice(contexts);

    return {
        text: context.text,
        answer: context.answer,
        working: context.working,
        operation: 'multi_step_with_inference',
        steps: numSteps,
        values: { numGroups, perGroup, total, absent, present },
        inferenceType: context.inferenceType
    };
}

/**
 * Generate strategic distractors for multi-step problems
 */
export function generateMultiStepDistractors(correctAnswer, problemData) {
    const distractors = new Set();
    const { allSteps, values, operation } = problemData;

    // Distractor 1: Only completed first step
    if (allSteps && allSteps.length > 0) {
        distractors.add(allSteps[0].runningTotal);
    }

    // Distractor 2: Only completed first two steps (for 3+ step problems)
    if (allSteps && allSteps.length > 1) {
        distractors.add(allSteps[1].runningTotal);
    }

    // Distractor 3: Wrong operation on one step
    if (operation === 'multi_step_mixed' && values.operations) {
        // Flip one operation
        let wrongTotal = values.start;
        for (let i = 0; i < values.operations.length; i++) {
            const op = values.operations[i];
            if (i === 0) {
                // Flip the first operation
                if (op.type === 'add') {
                    wrongTotal -= op.value;
                } else {
                    wrongTotal += op.value;
                }
            } else {
                // Do remaining correctly
                if (op.type === 'add') {
                    wrongTotal += op.value;
                } else {
                    wrongTotal -= op.value;
                }
            }
        }
        if (wrongTotal !== correctAnswer && wrongTotal > 0) {
            distractors.add(wrongTotal);
        }
    }

    // Distractor 4: Used wrong numbers (skipped a step)
    if (allSteps && allSteps.length > 2) {
        const skipMiddleTotal = allSteps[allSteps.length - 1].runningTotal;
        if (skipMiddleTotal !== correctAnswer) {
            distractors.add(skipMiddleTotal);
        }
    }

    // Fill remaining with calculation errors
    const errorValues = [
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 10,
        correctAnswer - 10,
        Math.floor(correctAnswer * 1.1),
        Math.floor(correctAnswer * 0.9)
    ];

    for (const val of errorValues) {
        if (val > 0 && val !== correctAnswer && distractors.size < 3) {
            distractors.add(val);
        }
    }

    // Ensure we have exactly 3 distractors
    while (distractors.size < 3) {
        const range = Math.max(20, Math.floor(correctAnswer * 0.1));
        const distractor = randomInt(Math.max(0, correctAnswer - range), correctAnswer + range);
        if (distractor !== correctAnswer && distractor > 0) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}
