/**
 * Year 4 Mental Multiplication and Division Generator
 *
 * Module: C06_Y4_CALC - "Recall multiplication and division facts for multiplication tables up to 12 x 12;
 *                        use place value, known and derived facts to multiply and divide mentally, including:
 *                        multiplying by 0 and 1, dividing by 1, multiplying together three numbers;
 *                        recognise and use factor pairs and commutativity in mental calculations"
 *
 * This generator focuses on:
 * - Complete recall of all times tables to 12 × 12
 * - Special cases: multiply by 0 and 1, divide by 1
 * - Factor pairs and their use in mental calculation
 * - Commutativity (a × b = b × a)
 * - Multiplying three numbers
 * - Using known facts to derive new facts
 * - Place value in multiplication
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    getFactorPairs,
    getRandomName,
    getRandomItem
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'multiply_recall':
            return generateMultiplyRecall(params, level);
        case 'divide_recall':
            return generateDivideRecall(params, level);
        case 'multiply_by_0_1':
            return generateMultiplyBy0Or1(params, level);
        case 'divide_by_1':
            return generateDivideBy1(params, level);
        case 'factor_pairs':
            return generateFactorPairs(params, level);
        case 'commutativity':
            return generateCommutativity(params, level);
        case 'multiply_three':
            return generateMultiplyThree(params, level);
        case 'use_factors':
            return generateUseFactors(params, level);
        case 'derived_facts':
            return generateDerivedFacts(params, level);
        case 'place_value_multiply':
            return generatePlaceValueMultiply(params, level);
        case 'associativity':
            return generateAssociativity(params, level);
        case 'mental_strategies':
            return generateMentalStrategies(params, level);
        default:
            return generateMultiplyRecall(params, level);
    }
}

/**
 * OPERATION 1: Multiply Recall
 * Direct recall of all multiplication tables to 12 × 12
 */
function generateMultiplyRecall(params, level) {
    const table = randomChoice(params.all_tables);
    const multiplier = randomInt(params.min_multiplier, params.max_multiplier);

    const answer = table * multiplier;

    const questionTypes = [
        `${table} × ${multiplier} = ?`,
        `${multiplier} × ${table} = ?`,
        `What is ${table} multiplied by ${multiplier}?`,
        `Multiply ${table} by ${multiplier}`
    ];

    const text = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 0, params.max_product, table);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Recall the ${table} times table`,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Divide Recall
 * Recall division facts using times tables
 */
function generateDivideRecall(params, level) {
    const table = randomChoice(params.all_tables);
    const multiplier = randomInt(Math.max(1, params.min_multiplier), params.max_multiplier);

    const dividend = table * multiplier;
    const divisor = table;
    const answer = multiplier;

    const questionTypes = [
        `${dividend} ÷ ${divisor} = ?`,
        `What is ${dividend} divided by ${divisor}?`,
        `Divide ${dividend} by ${divisor}`,
        `How many ${divisor}s are in ${dividend}?`
    ];

    const text = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 1, params.max_multiplier);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Think: ___ × ${divisor} = ${dividend}`,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Multiply by 0 or 1
 * Special cases: n × 0 = 0, n × 1 = n
 */
function generateMultiplyBy0Or1(params, level) {
    const number = randomInt(1, 100);
    const special = randomChoice([0, 1]);

    const answer = number * special;

    const position = randomChoice(['first', 'second']);

    let text;
    if (position === 'first') {
        text = `${special} × ${number} = ?`;
    } else {
        text = `${number} × ${special} = ?`;
    }

    const distractors = special === 0 ?
        [number, 1, number + 1] :
        [0, number + 1, number - 1];

    const options = shuffle([answer, ...distractors.filter(d => d !== answer).slice(0, 3)]);

    const hint = special === 0 ?
        'Any number multiplied by 0 equals 0' :
        'Any number multiplied by 1 equals itself';

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: hint,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Divide by 1
 * Special case: n ÷ 1 = n
 */
function generateDivideBy1(params, level) {
    const number = randomInt(1, 144);

    const text = `${number} ÷ 1 = ?`;
    const answer = number;

    const distractors = [1, 0, number + 1];
    const options = shuffle([answer, ...distractors.filter(d => d !== answer).slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: 'Any number divided by 1 equals itself',
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Factor Pairs
 * Find factor pairs of a number
 */
function generateFactorPairs(params, level) {
    const number = randomInt(12, params.factor_pair_range[1]);
    const pairs = getFactorPairs(number);

    const questionTypes = [
        {
            type: 'find_pair',
            text: `Which pair of numbers multiply to make ${number}?`,
            correctPair: randomChoice(pairs),
            generateWrongPairs: (correct) => {
                const wrongs = [];
                wrongs.push([correct[0] + 1, correct[1]]);
                wrongs.push([correct[0], correct[1] + 1]);
                wrongs.push([correct[0] - 1, correct[1] + 1]);
                return wrongs;
            }
        },
        {
            type: 'count_pairs',
            text: `How many different factor pairs does ${number} have?`,
            answer: pairs.length
        },
        {
            type: 'list_factors',
            text: `${pairs[0][0]} and ${pairs[0][1]} are a factor pair of ${number}. Find another factor pair.`,
            correctPair: pairs.length > 1 ? pairs[1] : null
        }
    ];

    const questionType = randomChoice(questionTypes.filter(q =>
        (q.type !== 'list_factors' || pairs.length > 1)
    ));

    if (questionType.type === 'find_pair') {
        const correct = questionType.correctPair;
        const wrongPairs = questionType.generateWrongPairs(correct);

        const formatPair = (p) => `${p[0]} and ${p[1]}`;
        const options = shuffle([
            formatPair(correct),
            ...wrongPairs.map(formatPair).slice(0, 3)
        ]);

        return {
            text: questionType.text,
            type: 'multiple_choice',
            options: options,
            answer: formatPair(correct),
            hint: `Factor pairs multiply to give ${number}`,
            module: 'C06_Y4_CALC',
            level: level
        };
    } else if (questionType.type === 'count_pairs') {
        const answer = questionType.answer;
        const distractors = [answer - 1, answer + 1, answer + 2].filter(d => d > 0);

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: questionType.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `List all pairs: ${pairs.map(p => `${p[0]}×${p[1]}`).join(', ')}`,
            module: 'C06_Y4_CALC',
            level: level
        };
    } else {
        const correct = questionType.correctPair;
        const formatPair = (p) => `${p[0]} and ${p[1]}`;

        const wrongPairs = pairs.filter(p => p !== correct && p !== pairs[0]);
        const otherWrongs = [
            [correct[0] + 1, correct[1]],
            [correct[0], correct[1] + 1]
        ];

        const options = shuffle([
            formatPair(correct),
            ...[...wrongPairs.slice(0, 2), ...otherWrongs].map(formatPair).slice(0, 3)
        ]);

        return {
            text: questionType.text,
            type: 'multiple_choice',
            options: options,
            answer: formatPair(correct),
            hint: `Find two numbers that multiply to give ${number}`,
            module: 'C06_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Commutativity
 * Recognize that a × b = b × a
 */
function generateCommutativity(params, level) {
    const a = randomChoice(params.all_tables);
    const b = randomInt(2, 12);
    const product = a * b;

    const questionTypes = [
        {
            text: `If ${a} × ${b} = ${product}, what is ${b} × ${a}?`,
            answer: product
        },
        {
            text: `${a} × ${b} has the same answer as ___ × ${a}`,
            answer: b
        },
        {
            text: `Which calculation gives the same answer as ${a} × ${b}?`,
            answer: `${b} × ${a}`,
            options: [`${b} × ${a}`, `${a} + ${b}`, `${a} × ${b + 1}`, `${b} × ${a + 1}`]
        }
    ];

    const question = randomChoice(questionTypes);

    if (question.options) {
        return {
            text: question.text,
            type: 'multiple_choice',
            options: question.options,
            answer: question.answer,
            hint: 'Multiplication can be done in any order',
            module: 'C06_Y4_CALC',
            level: level
        };
    } else {
        const distractors = generateDistractors(question.answer, 3, 0, Math.max(product, 12));
        const options = shuffle([question.answer, ...distractors]);

        return {
            text: question.text,
            type: 'multiple_choice',
            options: options,
            answer: question.answer.toString(),
            hint: 'Multiplication can be done in any order',
            module: 'C06_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Multiply Three Numbers
 * Calculate a × b × c
 */
function generateMultiplyThree(params, level) {
    const a = randomInt(2, 5);
    const b = randomInt(2, 4);
    const c = randomInt(2, 3);

    const answer = a * b * c;

    const questionTypes = [
        {
            text: `${a} × ${b} × ${c} = ?`,
            hint: `First: ${a} × ${b} = ${a * b}, then: ${a * b} × ${c}`
        },
        {
            text: `What is ${a} multiplied by ${b} and then by ${c}?`,
            hint: `Step 1: ${a} × ${b} = ${a * b}, Step 2: ${a * b} × ${c}`
        },
        {
            text: `Calculate ${a} × ${b} × ${c}`,
            hint: `Work from left to right, or group any two numbers first`
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 0, 144);
    const options = shuffle([answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: question.hint,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Use Factors
 * Use factor pairs to simplify multiplication
 */
function generateUseFactors(params, level) {
    // Create a multiplication that can be split using factors
    // e.g., 15 × 4 = 15 × 2 × 2
    const base = randomChoice([12, 15, 16, 18, 20, 24]);
    const multiplier = randomChoice([4, 6, 8]);

    const factors = getFactorPairs(multiplier).find(p => p[0] > 1 && p[1] > 1);
    const answer = base * multiplier;

    if (!factors) {
        // Fallback to simpler case
        return generateMultiplyThree(params, level);
    }

    const text = `Calculate ${base} × ${multiplier} using ${base} × ${factors[0]} × ${factors[1]}`;

    const distractors = generateDistractors(answer, 3, 0, 300);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `First: ${base} × ${factors[0]} = ${base * factors[0]}, then: ${base * factors[0]} × ${factors[1]}`,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Derived Facts
 * Use known facts to derive new facts (e.g., if 7×8=56, what is 7×16?)
 */
function generateDerivedFacts(params, level) {
    const base = randomChoice([6, 7, 8, 9]);
    const multiplier = randomChoice([4, 5, 6, 7, 8]);

    const knownProduct = base * multiplier;
    const newMultiplier = multiplier * 2;
    const answer = base * newMultiplier;

    const text = `If ${base} × ${multiplier} = ${knownProduct}, what is ${base} × ${newMultiplier}?`;

    const distractors = generateDistractors(answer, 3, 0, 200);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${newMultiplier} is double ${multiplier}, so double ${knownProduct}`,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Place Value Multiply
 * Use place value: 30 × 4 = 3 × 4 × 10
 */
function generatePlaceValueMultiply(params, level) {
    const base = randomChoice([2, 3, 4, 5, 6, 7, 8, 9]);
    const tensMultiplier = randomChoice([2, 3, 4, 5, 6]);
    const multipliedBy10 = base * 10;

    const answer = multipliedBy10 * tensMultiplier;

    const questionTypes = [
        {
            text: `${multipliedBy10} × ${tensMultiplier} = ?`,
            hint: `Think: ${base} × ${tensMultiplier} = ${base * tensMultiplier}, then × 10`
        },
        {
            text: `Use the fact ${base} × ${tensMultiplier} = ${base * tensMultiplier} to work out ${multipliedBy10} × ${tensMultiplier}`,
            hint: `${multipliedBy10} is ${base} × 10, so the answer is ${base * tensMultiplier} × 10`
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(answer, 3, 0, 500);
    const options = shuffle([answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: question.hint,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 11: Associativity (Level 4)
 * Understand (a × b) × c = a × (b × c)
 */
function generateAssociativity(params, level) {
    const a = randomInt(2, 5);
    const b = randomInt(2, 5);
    const c = randomInt(2, 4);

    const answer = a * b * c;

    const text = `Which grouping makes ${a} × ${b} × ${c} easier to calculate?`;

    const options = [
        `(${a} × ${b}) × ${c} = ${a * b} × ${c}`,
        `${a} × (${b} × ${c}) = ${a} × ${b * c}`,
        'Both groupings work equally well',
        'Neither grouping helps'
    ];

    // Determine which is actually easier
    const option1Product = a * b;
    const option2Product = b * c;

    const betterChoice = option1Product <= option2Product ? 0 : 1;

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: options[2],  // Both work, but we can accept the better one too
        hint: 'You can group the numbers in any order - the answer is always the same',
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 12: Mental Strategies (Level 4)
 * Combine multiple strategies
 */
function generateMentalStrategies(params, level) {
    const strategies = [
        {
            // Doubling and halving
            setup: () => {
                const base = randomChoice([15, 25, 35]);
                return { a: base, b: 4, answer: base * 4, strategy: 'doubling' };
            },
            getText: (calc) => `${calc.a} × ${calc.b} = ?`,
            getHint: (calc) => `Double ${calc.a} = ${calc.a * 2}, then double again`
        },
        {
            // Near multiples
            setup: () => {
                const base = randomChoice([9, 11, 19, 21]);
                const mult = randomChoice([5, 6]);
                return { a: base, b: mult, answer: base * mult, strategy: 'near' };
            },
            getText: (calc) => `${calc.a} × ${calc.b} = ?`,
            getHint: (calc) => {
                const near = calc.a > 15 ? 20 : 10;
                const diff = calc.a - near;
                const sign = diff > 0 ? '+' : '-';
                return `Think of ${near} × ${calc.b} ${sign} ${Math.abs(diff)} × ${calc.b}`;
            }
        }
    ];

    const strategy = randomChoice(strategies);
    const calc = strategy.setup();

    const text = strategy.getText(calc);
    const hint = strategy.getHint(calc);

    const distractors = generateDistractors(calc.answer, 3, 0, 200);
    const options = shuffle([calc.answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: calc.answer.toString(),
        hint: hint,
        module: 'C06_Y4_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C06_Y4_CALC',
    generate: generateQuestion
};
