/**
 * Year 5 Estimation, Inverses and Checking Generator
 *
 * Module: C03_Y5_CALC - "Use rounding to check answers to calculations and
 *                        determine, in the context of a problem, levels of accuracy"
 *
 * This generator focuses on:
 * - Using rounding to check reasonableness of large numbers
 * - Determining appropriate accuracy level for CONTEXT (measurement, money, counting, etc.)
 * - Identifying unreasonable answers in real-world contexts
 * - Choosing suitable rounding based on what's being measured/counted
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    roundTo
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'round_to_check':
            return generateRoundToCheck(params, level);
        case 'contextual_measurement':
            return generateContextualMeasurement(params, level);
        case 'is_reasonable_context':
            return generateIsReasonableContext(params, level);
        case 'contextual_money':
            return generateContextualMoney(params, level);
        case 'detect_error_context':
            return generateDetectErrorContext(params, level);
        case 'determine_accuracy_level':
            return generateDetermineAccuracyLevel(params, level);
        case 'compare_accuracy_methods':
            return generateCompareAccuracyMethods(params, level);
        case 'check_with_inverse_large_numbers':
            return generateCheckWithInverseLargeNumbers(params, level);
        default:
            return generateRoundToCheck(params, level);
    }
}

/**
 * OPERATION 1: Round to Check
 * "Use rounding to check if 234,567 + 123,456 = 358,023 is reasonable"
 */
function generateRoundToCheck(params, level) {
    const { a, b, answer: correctAnswer } = generateAddition(params.min_value, params.max_value);

    const isCorrect = Math.random() < 0.7;
    const givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([10000, -10000, 50000, -50000, 20000]);

    const roundingPlace = randomChoice(params.rounding_to.slice(-3)); // Use larger rounding places

    const aRounded = roundTo(a, roundingPlace);
    const bRounded = roundTo(b, roundingPlace);
    const estimate = aRounded + bRounded;

    const text = `Use rounding to check if this calculation is reasonable:\n\n${a.toLocaleString()} + ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nYes or No?`;

    const options = ['Yes', 'No'];
    const correctOption = isCorrect ? 'Yes' : 'No';

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: `Round to nearest ${roundingPlace.toLocaleString()}: about ${estimate.toLocaleString()}`,
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Contextual Measurement
 * "A bridge is 4,782 metres long. What is the most appropriate way to describe this?"
 */
function generateContextualMeasurement(params, level) {
    const contexts = [
        {
            type: 'distance',
            value: randomInt(1000, 50000),
            unit: 'metres',
            item: randomChoice(['bridge', 'road', 'river', 'railway line']),
            roundings: [10, 100, 1000, 10000],
            audience: 'When casually describing this to a friend, you would say it is'
        },
        {
            type: 'capacity',
            value: randomInt(5000, 100000),
            unit: 'litres',
            item: randomChoice(['swimming pool', 'water tank', 'reservoir', 'lake']),
            roundings: [100, 1000, 10000],
            audience: 'When telling someone about this in conversation, you would say it holds'
        },
        {
            type: 'mass',
            value: randomInt(2000, 50000),
            unit: 'kilograms',
            item: randomChoice(['elephant', 'car', 'lorry', 'container']),
            roundings: [100, 1000, 10000],
            audience: 'When describing this to a friend, you would say it weighs'
        }
    ];

    const context = randomChoice(contexts);
    const value = context.value;

    const text = `A ${context.item} is ${value.toLocaleString()} ${context.unit}.\n\n${context.audience}:`;

    // Generate options with different rounding levels
    const options = context.roundings.map(place => {
        const rounded = roundTo(value, place);
        return `About ${rounded.toLocaleString()} ${context.unit}`;
    });

    // The "best" answer for casual conversation is typically rounding to the nearest 1000 or 100
    // For very large numbers, round to 10000
    let bestRounding;
    if (value > 50000) {
        bestRounding = 10000;
    } else if (value > 10000) {
        bestRounding = 1000;
    } else {
        bestRounding = 100;
    }

    const correctAnswer = `About ${roundTo(value, bestRounding).toLocaleString()} ${context.unit}`;

    return {
        text: text,
        type: 'multiple_choice',
        options: shuffle(options),
        answer: correctAnswer,
        hint: 'In casual conversation, round to a sensible place value for easy communication',
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Is Reasonable in Context
 * "A school has 1,234 students. The headteacher says there are 'about 1,000 students.' Is this reasonable?"
 */
function generateIsReasonableContext(params, level) {
    const contexts = [
        {
            item: 'students in a school',
            value: randomInt(800, 2000),
            bestRounding: 100,
            statements: [
                { round: 100, reasonable: true },
                { round: 1000, reasonable: true },
                { round: 10, reasonable: false }
            ]
        },
        {
            item: 'people at a concert',
            value: randomInt(5000, 50000),
            bestRounding: 1000,
            statements: [
                { round: 1000, reasonable: true },
                { round: 10000, reasonable: true },
                { round: 10, reasonable: false }
            ]
        },
        {
            item: 'books in a library',
            value: randomInt(10000, 100000),
            bestRounding: 1000,
            statements: [
                { round: 1000, reasonable: true },
                { round: 10000, reasonable: true },
                { round: 100, reasonable: false }
            ]
        }
    ];

    const context = randomChoice(contexts);
    const value = context.value;

    const statement = randomChoice(context.statements);
    const rounded = roundTo(value, statement.round);

    const text = `There are ${value.toLocaleString()} ${context.item}.\n\nSomeone says there are "about ${rounded.toLocaleString()}."\n\nIs this a reasonable estimate?\n\nYes or No?`;

    const options = ['Yes', 'No'];
    const correctOption = statement.reasonable ? 'Yes' : 'No';

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: 'Consider if the rounding level is appropriate for this context',
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Contextual Money
 * "A computer costs £1,247. What is the most sensible way to describe this price?"
 */
function generateContextualMoney(params, level) {
    const items = [
        { name: 'computer', range: [500, 2000], bestRounding: 100 },
        { name: 'car', range: [10000, 30000], bestRounding: 1000 },
        { name: 'bicycle', range: [200, 800], bestRounding: 10 },
        { name: 'television', range: [300, 1500], bestRounding: 100 },
        { name: 'holiday package', range: [1000, 5000], bestRounding: 100 }
    ];

    const item = randomChoice(items);
    const price = randomInt(item.range[0], item.range[1]);

    const text = `A ${item.name} costs £${price.toLocaleString()}.\n\nWhen telling a friend about this price, you would most likely say it costs:`;

    const options = [
        `About £${roundTo(price, 10).toLocaleString()}`,
        `About £${roundTo(price, 100).toLocaleString()}`,
        `About £${roundTo(price, 1000).toLocaleString()}`,
        `Exactly £${price.toLocaleString()}`
    ];

    const correctAnswer = `About £${roundTo(price, item.bestRounding).toLocaleString()}`;

    return {
        text: text,
        type: 'multiple_choice',
        options: shuffle(options),
        answer: correctAnswer,
        hint: 'Think about how you naturally round prices when talking to friends',
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Detect Error in Context
 * "A town has a population of 45,678. The mayor says the population has grown by 50,000 this year. Is this possible?"
 */
function generateDetectErrorContext(params, level) {
    const contexts = [
        {
            setup: (value) => `A town has a population of ${value.toLocaleString()}`,
            claim: (value) => `the population has grown by ${(value * 2).toLocaleString()} this year`,
            reasonable: false
        },
        {
            setup: (value) => `A school has ${value.toLocaleString()} students`,
            claim: (value) => `${Math.floor(value / 10).toLocaleString()} students are in Year 5`,
            reasonable: true
        },
        {
            setup: (value) => `A library has ${value.toLocaleString()} books`,
            claim: (value) => `all ${value.toLocaleString()} books were borrowed in one day`,
            reasonable: false
        },
        {
            setup: (value) => `A shop sold ${value.toLocaleString()} items last month`,
            claim: (value) => `they sold about ${roundTo(value, 100).toLocaleString()} items`,
            reasonable: true
        }
    ];

    const context = randomChoice(contexts);
    const value = randomInt(10000, 100000);

    const text = `${context.setup(value)}. Someone claims that ${context.claim(value)}.\n\nIs this claim reasonable?\n\nYes or No?`;

    const options = ['Yes', 'No'];
    const correctOption = context.reasonable ? 'Yes' : 'No';

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: 'Think about whether the numbers make sense in this situation',
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Determine Accuracy Level
 * "For counting attendance at a football match, which accuracy is most appropriate?"
 */
function generateDetermineAccuracyLevel(params, level) {
    const situations = [
        {
            situation: 'counting attendance at a football match (34,567 people)',
            value: 34567,
            correct: 'Nearest 1,000',
            why: 'Large crowds are usually rounded to nearest thousand'
        },
        {
            situation: 'measuring the weight of a newborn baby (3,456 grams)',
            value: 3456,
            correct: 'Nearest 10',
            why: 'Baby weights need to be quite accurate'
        },
        {
            situation: 'estimating the population of a city (234,567 people)',
            value: 234567,
            correct: 'Nearest 10,000',
            why: 'City populations are usually rounded to nearest ten thousand'
        },
        {
            situation: 'calculating the cost of groceries (£45.67)',
            value: 45.67,
            correct: 'Nearest pound',
            why: 'We often round grocery costs to nearest pound'
        }
    ];

    const situation = randomChoice(situations);

    const text = `For ${situation.situation}, which accuracy is most appropriate?`;

    const options = [
        'Exact number',
        'Nearest 10',
        'Nearest 100',
        'Nearest 1,000',
        'Nearest 10,000'
    ];

    return {
        text: text,
        type: 'multiple_choice',
        options: shuffle(options),
        answer: situation.correct,
        hint: situation.why,
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Compare Accuracy Methods (Level 4)
 * "Which rounding method is best for reporting stadium attendance?"
 */
function generateCompareAccuracyMethods(params, level) {
    const scenarios = [
        {
            context: 'reporting stadium attendance (67,834 people)',
            value: 67834,
            options: [
                { method: 'Nearest 10,000', value: 70000, best: true, why: 'Standard for large crowds' },
                { method: 'Nearest 1,000', value: 68000, best: false, why: 'Too precise for this context' },
                { method: 'Nearest 100', value: 67800, best: false, why: 'Too precise for this context' }
            ]
        },
        {
            context: 'planning food for a school trip (234 students)',
            value: 234,
            options: [
                { method: 'Round up to 250', value: 250, best: true, why: 'Better to have extra food' },
                { method: 'Round to nearest 100 (200)', value: 200, best: false, why: 'Not enough food' },
                { method: 'Use exact number', value: 234, best: false, why: 'Wasteful to be too exact' }
            ]
        },
        {
            context: 'reporting fundraising total (£4,567)',
            value: 4567,
            options: [
                { method: 'Nearest £100', value: 4600, best: true, why: 'Standard for fundraising' },
                { method: 'Nearest £10', value: 4570, best: false, why: 'Too precise' },
                { method: 'Nearest £1,000', value: 5000, best: false, why: 'Too rounded' }
            ]
        }
    ];

    const scenario = randomChoice(scenarios);

    const text = `When ${scenario.context}, which rounding method is most appropriate?`;

    const optionTexts = scenario.options.map(opt => opt.method);
    const correctAnswer = scenario.options.find(opt => opt.best).method;
    const hint = scenario.options.find(opt => opt.best).why;

    return {
        text: text,
        type: 'multiple_choice',
        options: shuffle(optionTexts),
        answer: correctAnswer,
        hint: hint,
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Check with Inverse (Large Numbers)
 * "Check this calculation using inverse operations: 234,567 + 123,456 = 358,023. Is it correct?"
 */
function generateCheckWithInverseLargeNumbers(params, level) {
    const calcType = randomChoice(['addition', 'subtraction', 'multiplication', 'division']);

    let a, b, correctAnswer, givenAnswer, isCorrect, inverseOp, checkText;

    if (calcType === 'addition') {
        const result = generateAddition(params.min_value, params.max_value);
        a = result.a;
        b = result.b;
        correctAnswer = result.answer;

        isCorrect = Math.random() < 0.7;
        givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([1000, -1000, 5000, -5000, 10000]);

        inverseOp = `${givenAnswer.toLocaleString()} - ${b.toLocaleString()} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} + ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;

    } else if (calcType === 'subtraction') {
        const result = generateSubtraction(params.min_value, params.max_value);
        a = result.a;
        b = result.b;
        correctAnswer = result.answer;

        isCorrect = Math.random() < 0.7;
        givenAnswer = isCorrect ? correctAnswer : Math.max(0, correctAnswer + randomChoice([1000, -1000, 5000, -5000]));

        inverseOp = `${givenAnswer.toLocaleString()} + ${b.toLocaleString()} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} - ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;

    } else if (calcType === 'multiplication') {
        // Use smaller numbers for multiplication to keep products reasonable
        const multiplier = randomInt(2, 99);
        const multiplicand = randomInt(100, 9999);
        a = multiplicand;
        b = multiplier;
        correctAnswer = a * b;

        isCorrect = Math.random() < 0.7;
        givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([100, -100, 500, -500, 1000]);

        inverseOp = `${givenAnswer.toLocaleString()} ÷ ${b} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} × ${b} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;

    } else { // division
        // Generate division that gives whole number result
        const divisor = randomInt(2, 99);
        const quotient = randomInt(100, 9999);
        a = divisor * quotient; // dividend
        b = divisor;
        correctAnswer = quotient;

        isCorrect = Math.random() < 0.7;
        givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([10, -10, 50, -50, 100]);

        inverseOp = `${givenAnswer.toLocaleString()} × ${b} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} ÷ ${b} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;
    }

    const options = ['Yes', 'No'];
    const correctOption = isCorrect ? 'Yes' : 'No';

    return {
        text: checkText,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: `Use the inverse operation to check: ${inverseOp}`,
        module: 'C03_Y5_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C03_Y5_CALC',
    generate: generateQuestion
};
