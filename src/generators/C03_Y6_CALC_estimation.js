/**
 * Year 6 Estimation, Inverses and Checking Generator
 *
 * Module: C03_Y6_CALC - "Use estimation to check answers to calculations and
 *                        determine, in the context of a problem, an appropriate
 *                        degree of accuracy"
 *
 * This generator focuses on:
 * - Choosing appropriate rounding strategies for different contexts
 * - Decimal estimation
 * - Contextual rounding decisions (round up vs round down based on situation)
 * - Comparing and justifying estimation methods
 * - Multi-step estimation
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
        case 'choose_rounding_strategy':
            return generateChooseRoundingStrategy(params, level);
        case 'decimal_estimation':
            return generateDecimalEstimation(params, level);
        case 'contextual_rounding':
            return generateContextualRounding(params, level);
        case 'compare_strategies':
            return generateCompareStrategies(params, level);
        case 'determine_appropriate_accuracy':
            return generateDetermineAppropriateAccuracy(params, level);
        case 'justify_accuracy_choice':
            return generateJustifyAccuracyChoice(params, level);
        case 'multi_step_estimation':
            return generateMultiStepEstimation(params, level);
        case 'check_with_inverse_large_numbers':
            return generateCheckWithInverseLargeNumbers(params, level);
        default:
            return generateChooseRoundingStrategy(params, level);
    }
}

/**
 * OPERATION 1: Choose Rounding Strategy
 * "Which estimation strategy is most appropriate for this calculation?"
 */
function generateChooseRoundingStrategy(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);

    const strategies = [
        {
            name: `Round both to nearest ${(10000).toLocaleString()}`,
            estimate: roundTo(a, 10000) + roundTo(b, 10000),
            place: 10000
        },
        {
            name: `Round both to nearest ${(1000).toLocaleString()}`,
            estimate: roundTo(a, 1000) + roundTo(b, 1000),
            place: 1000
        },
        {
            name: `Round both to nearest ${(100).toLocaleString()}`,
            estimate: roundTo(a, 100) + roundTo(b, 100),
            place: 100
        }
    ];

    // Find the strategy with smallest error
    strategies.forEach(s => {
        s.error = Math.abs(s.estimate - answer);
    });
    strategies.sort((x, y) => x.error - y.error);

    const text = `To estimate ${a.toLocaleString()} + ${b.toLocaleString()}, which rounding strategy gives the best estimate?`;

    const correctAnswer = strategies[0].name;
    const options = shuffle(strategies.map(s => s.name));

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Consider which rounding place gives an estimate closest to the actual answer',
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Decimal Estimation
 * "Estimate 234.67 + 189.45 by rounding to the nearest whole number"
 */
function generateDecimalEstimation(params, level) {
    const decimalPlaces = randomChoice(params.decimal_places);

    // Generate decimal numbers
    const whole1 = randomInt(100, 1000);
    const whole2 = randomInt(100, 1000);

    // Generate decimal parts
    const decimal1 = randomInt(1, 99);
    const decimal2 = randomInt(1, 99);

    const a = whole1 + decimal1 / 100;
    const b = whole2 + decimal2 / 100;

    const aRounded = Math.round(a);
    const bRounded = Math.round(b);
    const estimate = aRounded + bRounded;

    const text = `Estimate ${a.toFixed(2)} + ${b.toFixed(2)} by rounding to the nearest whole number.`;

    const distractors = [
        estimate + 1,
        estimate - 1,
        Math.floor(a + b)
    ].filter(d => d > 0);

    const options = shuffle([estimate, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options.map(o => o.toString()),
        answer: estimate.toString(),
        hint: `Round ${a.toFixed(2)} to ${aRounded} and ${b.toFixed(2)} to ${bRounded}`,
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Contextual Rounding
 * "Should you round up or down in this situation?"
 */
function generateContextualRounding(params, level) {
    const situations = [
        {
            context: 'You need 234 chairs for an event. Chairs come in packs of 10.',
            question: 'How many packs should you order?',
            value: 234,
            correct: 'Round UP to 240 (24 packs)',
            why: 'You need enough chairs, so round up',
            wrongOptions: [
                'Round DOWN to 230 (23 packs)',
                'Use exact number 234',
                'Round to nearest 100 (200 chairs)'
            ]
        },
        {
            context: 'You calculated that you need 6.67 buses to transport everyone.',
            question: 'How many buses should you actually book?',
            value: 6.67,
            correct: '7 buses (round UP from 6.67)',
            why: 'You need enough buses for everyone, so round up',
            wrongOptions: [
                '6 buses (round DOWN)',
                '6.67 buses',
                '10 buses'
            ]
        },
        {
            context: 'You calculated that you can afford 5.7 items with your money.',
            question: 'How many items should you actually buy?',
            value: 5.7,
            correct: '5 items (round DOWN from 5.7)',
            why: 'You can only buy whole items you can afford, so round down',
            wrongOptions: [
                '6 items (round UP)',
                '5.7 items',
                '4 items'
            ]
        },
        {
            context: 'A recipe needs 350ml of milk per person. You are cooking for 7 people.',
            question: 'How much milk do you need? Milk comes in 1 litre bottles.',
            value: 2450, // 350 × 7 = 2450ml
            correct: '3 litres (round UP from 2.45)',
            why: 'You need enough milk, so round up',
            wrongOptions: [
                '2 litres (round DOWN)',
                'Exactly 2.45 litres',
                '4 litres'
            ]
        }
    ];

    const situation = randomChoice(situations);

    const text = `${situation.context}\n\n${situation.question}`;

    const options = shuffle([situation.correct, ...situation.wrongOptions]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: situation.correct,
        hint: situation.why,
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Compare Strategies
 * "Which estimation method gives a closer answer for this problem?"
 */
function generateCompareStrategies(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);

    // Calculate different estimates
    const estimate1000 = roundTo(a, 1000) + roundTo(b, 1000);
    const estimate10000 = roundTo(a, 10000) + roundTo(b, 10000);

    const error1000 = Math.abs(estimate1000 - answer);
    const error10000 = Math.abs(estimate10000 - answer);

    const text = `To estimate ${a.toLocaleString()} + ${b.toLocaleString()}, which method gives a closer estimate?`;

    let correctAnswer;
    if (error1000 < error10000) {
        correctAnswer = `Round to nearest 1,000: about ${estimate1000.toLocaleString()}`;
    } else {
        correctAnswer = `Round to nearest 10,000: about ${estimate10000.toLocaleString()}`;
    }

    const wrongAnswer = error1000 < error10000 ?
        `Round to nearest 10,000: about ${estimate10000.toLocaleString()}` :
        `Round to nearest 1,000: about ${estimate1000.toLocaleString()}`;

    const options = shuffle([
        correctAnswer,
        wrongAnswer,
        'Both methods are equally good',
        'Neither method works well'
    ]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Calculate both estimates and see which is closer to the exact answer',
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Determine Appropriate Accuracy
 * "What degree of accuracy is appropriate for this measurement?"
 */
function generateDetermineAppropriateAccuracy(params, level) {
    const scenarios = [
        {
            situation: 'giving someone medicine (dosage is 5.25ml)',
            correct: 'Exact amount - do not round',
            why: 'Medicine must be exact for safety'
        },
        {
            situation: 'planning a car journey (distance is 287.3km)',
            correct: 'Nearest 10km (290km)',
            why: 'When planning journeys, distances are usually rounded to nearest 10km'
        },
        {
            situation: 'reporting the final election result (45,678 votes)',
            correct: 'Exact count - do not round',
            why: 'Final election vote counts must be exact'
        },
        {
            situation: 'a news report about stadium attendance (67,834 people)',
            correct: 'Nearest 1,000 (68,000)',
            why: 'News reports typically round large attendances to nearest thousand'
        },
        {
            situation: 'following a recipe for home cooking (234g flour)',
            correct: 'Nearest 10g (230g)',
            why: 'Home cooking ingredients can be approximate to nearest 10g'
        },
        {
            situation: 'giving someone a rough building quote (actual cost £234,567)',
            correct: 'Nearest £1,000 (£235,000)',
            why: 'Rough quotes are usually rounded to nearest thousand pounds'
        }
    ];

    const scenario = randomChoice(scenarios);

    const text = `When ${scenario.situation}, what degree of accuracy is most appropriate?`;

    // Generate distractor options
    const allOptions = [
        scenario.correct,
        'Exact amount - do not round',
        'Nearest 10',
        'Nearest 100',
        'Nearest 1,000',
        'Nearest 10,000'
    ];

    // Ensure we don't duplicate the correct answer
    const uniqueOptions = [...new Set(allOptions)].slice(0, 4);

    const options = shuffle(uniqueOptions);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: scenario.correct,
        hint: scenario.why,
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Justify Accuracy Choice
 * "Why is this accuracy level appropriate?"
 */
function generateJustifyAccuracyChoice(params, level) {
    const scenarios = [
        {
            context: 'A news report says "about 50,000 people attended the festival" (actual: 48,567)',
            rounded: '50,000',
            actual: '48,567',
            correct: 'Nearest 10,000 is appropriate for large crowd estimates',
            wrong: [
                'The exact number is always needed',
                'Should round to nearest 100',
                'Should round to nearest million'
            ]
        },
        {
            context: 'A shop rounds £23.45 to £23.50 when estimating daily takings',
            rounded: '£23.50',
            actual: '£23.45',
            correct: 'Rounding to nearest 50p is practical for quick estimates',
            wrong: [
                'Should use exact amount always',
                'Should round to nearest £10',
                'Should round to nearest penny'
            ]
        },
        {
            context: 'A scientist records temperature as 23.4°C (not 23.37°C)',
            rounded: '23.4°C',
            actual: '23.37°C',
            correct: 'Nearest 0.1°C is appropriate for this type of measurement',
            wrong: [
                'Should record exact temperature',
                'Should round to nearest degree',
                'Should round to nearest 10 degrees'
            ]
        }
    ];

    const scenario = randomChoice(scenarios);

    const text = `${scenario.context}\n\nWhy is this rounding appropriate?`;

    const options = shuffle([scenario.correct, ...scenario.wrong]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: scenario.correct,
        hint: 'Think about practicality and what makes sense for this situation',
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Multi-Step Estimation (Level 4)
 * "Estimate the answer to a multi-step calculation"
 */
function generateMultiStepEstimation(params, level) {
    const a = randomInt(10000, 100000);
    const b = randomInt(5000, 50000);
    const c = randomInt(2000, 20000);

    const exactAnswer = a + b - c;

    // Round each number
    const aRounded = roundTo(a, 10000);
    const bRounded = roundTo(b, 10000);
    const cRounded = roundTo(c, 10000);
    const estimate = aRounded + bRounded - cRounded;

    const text = `Estimate ${a.toLocaleString()} + ${b.toLocaleString()} - ${c.toLocaleString()} by rounding each number to the nearest 10,000.`;

    const distractors = [
        estimate + 10000,
        estimate - 10000,
        exactAnswer
    ].filter(d => d > 0);

    const options = shuffle([estimate, ...distractors.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options.map(o => o.toLocaleString()),
        answer: estimate.toLocaleString(),
        hint: `${aRounded.toLocaleString()} + ${bRounded.toLocaleString()} - ${cRounded.toLocaleString()}`,
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Check with Inverse (Large Numbers)
 * "Check this calculation using inverse operations: 2,345,678 + 1,234,567 = 3,580,245. Is it correct?"
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
        givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([10000, -10000, 50000, -50000, 100000]);

        inverseOp = `${givenAnswer.toLocaleString()} - ${b.toLocaleString()} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} + ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;

    } else if (calcType === 'subtraction') {
        const result = generateSubtraction(params.min_value, params.max_value);
        a = result.a;
        b = result.b;
        correctAnswer = result.answer;

        isCorrect = Math.random() < 0.7;
        givenAnswer = isCorrect ? correctAnswer : Math.max(0, correctAnswer + randomChoice([10000, -10000, 50000, -50000]));

        inverseOp = `${givenAnswer.toLocaleString()} + ${b.toLocaleString()} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} - ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;

    } else if (calcType === 'multiplication') {
        // Use smaller numbers for multiplication to keep products reasonable
        const multiplier = randomInt(2, 999);
        const multiplicand = randomInt(100, 99999);
        a = multiplicand;
        b = multiplier;
        correctAnswer = a * b;

        isCorrect = Math.random() < 0.7;
        givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([1000, -1000, 5000, -5000, 10000]);

        inverseOp = `${givenAnswer.toLocaleString()} ÷ ${b.toLocaleString()} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} × ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;

    } else { // division
        // Generate division that gives whole number result
        const divisor = randomInt(2, 999);
        const quotient = randomInt(100, 99999);
        a = divisor * quotient; // dividend
        b = divisor;
        correctAnswer = quotient;

        isCorrect = Math.random() < 0.7;
        givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([100, -100, 500, -500, 1000]);

        inverseOp = `${givenAnswer.toLocaleString()} × ${b.toLocaleString()} = ${a.toLocaleString()}`;
        checkText = `Check this calculation using inverse operations:\n\n${a.toLocaleString()} ÷ ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs it correct?`;
    }

    const options = ['Yes', 'No'];
    const correctOption = isCorrect ? 'Yes' : 'No';

    return {
        text: checkText,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: `Use the inverse operation to check: ${inverseOp}`,
        module: 'C03_Y6_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C03_Y6_CALC',
    generate: generateQuestion
};
