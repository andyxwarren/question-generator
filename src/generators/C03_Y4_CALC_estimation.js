/**
 * Year 4 Estimation, Inverses and Checking Generator
 *
 * Module: C03_Y4_CALC - "Estimate and use inverse operations to check
 *                        answers to a calculation"
 *
 * This generator focuses on:
 * - Estimating 4-digit calculations by rounding to 10, 100, or 1000
 * - Using inverse operations (including multiplication ↔ division)
 * - Checking reasonableness with larger numbers
 * - Comparing different estimation strategies
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
    generateDivision,
    roundTo
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'estimate_4digit':
            return generateEstimate4Digit(params, level);
        case 'check_with_inverse':
            return generateCheckWithInverse(params, level);
        case 'is_reasonable':
            return generateIsReasonable(params, level);
        case 'check_multiply_with_divide':
            return generateCheckMultiplyWithDivide(params, level);
        case 'check_divide_with_multiply':
            return generateCheckDivideWithMultiply(params, level);
        case 'choose_best_estimate':
            return generateChooseBestEstimate(params, level);
        case 'multi_operation_check':
            return generateMultiOperationCheck(params, level);
        default:
            return generateEstimate4Digit(params, level);
    }
}

/**
 * OPERATION 1: Estimate 4-Digit Calculations
 * "Estimate 3,467 + 2,189 by rounding to the nearest 1000"
 */
function generateEstimate4Digit(params, level) {
    const calcType = randomChoice(['addition', 'subtraction']);
    const roundingPlace = randomChoice(params.rounding_to);

    if (calcType === 'addition') {
        const { a, b, answer } = generateAddition(params.min_value, params.max_value);

        const aRounded = roundTo(a, roundingPlace);
        const bRounded = roundTo(b, roundingPlace);
        const estimate = aRounded + bRounded;

        const placeWord = roundingPlace === 10 ? 'ten' :
                          roundingPlace === 100 ? 'hundred' :
                          roundingPlace === 1000 ? 'thousand' : roundingPlace.toString();

        const text = `Estimate ${a.toLocaleString()} + ${b.toLocaleString()} by rounding to the nearest ${placeWord}.`;

        const distractors = [
            estimate + roundingPlace,
            estimate - roundingPlace,
            answer
        ].filter(d => d > 0);

        const options = shuffle([estimate, ...distractors.slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options.map(o => o.toLocaleString()),
            answer: estimate.toLocaleString(),
            hint: `Round ${a.toLocaleString()} to ${aRounded.toLocaleString()} and ${b.toLocaleString()} to ${bRounded.toLocaleString()}`,
            module: 'C03_Y4_CALC',
            level: level
        };
    } else {
        const { a, b, answer } = generateSubtraction(params.min_value, params.max_value, {
            maxMinuend: params.max_value
        });

        const aRounded = roundTo(a, roundingPlace);
        const bRounded = roundTo(b, roundingPlace);
        const estimate = aRounded - bRounded;

        const placeWord = roundingPlace === 10 ? 'ten' :
                          roundingPlace === 100 ? 'hundred' :
                          roundingPlace === 1000 ? 'thousand' : roundingPlace.toString();

        const text = `Estimate ${a.toLocaleString()} - ${b.toLocaleString()} by rounding to the nearest ${placeWord}.`;

        const distractors = [
            estimate + roundingPlace,
            estimate - roundingPlace,
            answer
        ].filter(d => d > 0);

        const options = shuffle([estimate, ...distractors.slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options.map(o => o.toLocaleString()),
            answer: estimate.toLocaleString(),
            hint: `Round ${a.toLocaleString()} to ${aRounded.toLocaleString()} and ${b.toLocaleString()} to ${bRounded.toLocaleString()}`,
            module: 'C03_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Check with Inverse (addition/subtraction)
 */
function generateCheckWithInverse(params, level) {
    const calcType = randomChoice(['addition', 'subtraction']);

    if (calcType === 'addition') {
        const { a, b, answer } = generateAddition(params.min_value, params.max_value);

        const text = `Calculate ${a.toLocaleString()} + ${b.toLocaleString()} = ${answer.toLocaleString()}.\n\nWhich calculation checks this answer?`;

        const correctAnswer = `${answer.toLocaleString()} - ${a.toLocaleString()} = ${b.toLocaleString()}`;

        const wrongOptions = [
            `${a.toLocaleString()} - ${b.toLocaleString()}`,
            `${a.toLocaleString()} + ${answer.toLocaleString()}`,
            `${answer.toLocaleString()} + ${b.toLocaleString()}`
        ];

        const options = shuffle([correctAnswer, ...wrongOptions]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            hint: 'Use the inverse operation',
            module: 'C03_Y4_CALC',
            level: level
        };
    } else {
        const { a, b, answer } = generateSubtraction(params.min_value, params.max_value, {
            maxMinuend: params.max_value
        });

        const text = `Calculate ${a.toLocaleString()} - ${b.toLocaleString()} = ${answer.toLocaleString()}.\n\nWhich calculation checks this answer?`;

        const correctAnswer = `${answer.toLocaleString()} + ${b.toLocaleString()} = ${a.toLocaleString()}`;

        const wrongOptions = [
            `${a.toLocaleString()} + ${b.toLocaleString()}`,
            `${a.toLocaleString()} - ${answer.toLocaleString()}`,
            `${answer.toLocaleString()} - ${b.toLocaleString()}`
        ];

        const options = shuffle([correctAnswer, ...wrongOptions]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            hint: 'Use the inverse operation',
            module: 'C03_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Is Reasonable (4-digit)
 */
function generateIsReasonable(params, level) {
    const { a, b, answer: correctAnswer } = generateAddition(params.min_value, params.max_value);

    const isCorrect = Math.random() < 0.7;

    let givenAnswer;
    if (isCorrect) {
        givenAnswer = correctAnswer;
    } else {
        const offset = randomChoice([1000, -1000, 2000, -2000, 500, -500]);
        givenAnswer = Math.max(0, correctAnswer + offset);
    }

    const text = `${a.toLocaleString()} + ${b.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs this answer reasonable?\n\nYes or No?`;

    const options = ['Yes', 'No'];
    const correctOption = isCorrect ? 'Yes' : 'No';

    const aRounded = roundTo(a, 1000);
    const bRounded = roundTo(b, 1000);
    const estimate = aRounded + bRounded;

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: `Estimate: about ${aRounded.toLocaleString()} + ${bRounded.toLocaleString()} = ${estimate.toLocaleString()}`,
        module: 'C03_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Check Multiplication with Division
 * "Calculate 24 × 7 = 168. Which division checks this?"
 */
function generateCheckMultiplyWithDivide(params, level) {
    if (!params.include_multiplication) {
        return generateCheckWithInverse(params, level);
    }

    const table = randomChoice(params.multiplication_tables);
    const multiplier = randomInt(2, 12);
    const product = table * multiplier;

    const text = `Calculate ${table} × ${multiplier} = ${product}.\n\nWhich division checks this answer?`;

    const correctOptions = [
        `${product} ÷ ${table} = ${multiplier}`,
        `${product} ÷ ${multiplier} = ${table}`
    ];
    const correctAnswer = randomChoice(correctOptions);

    const wrongOptions = [
        `${table} ÷ ${multiplier}`,
        `${product} × ${table}`,
        `${multiplier} ÷ ${table}`,
        `${product} + ${table}`
    ];

    const options = shuffle([correctAnswer, ...shuffle(wrongOptions).slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Division is the inverse of multiplication',
        module: 'C03_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Check Division with Multiplication
 * "Calculate 84 ÷ 7 = 12. Which multiplication checks this?"
 */
function generateCheckDivideWithMultiply(params, level) {
    if (!params.include_multiplication) {
        return generateCheckWithInverse(params, level);
    }

    const divisor = randomChoice(params.multiplication_tables);
    const quotient = randomInt(2, 12);
    const dividend = divisor * quotient;

    const text = `Calculate ${dividend} ÷ ${divisor} = ${quotient}.\n\nWhich multiplication checks this answer?`;

    const correctOptions = [
        `${quotient} × ${divisor} = ${dividend}`,
        `${divisor} × ${quotient} = ${dividend}`
    ];
    const correctAnswer = randomChoice(correctOptions);

    const wrongOptions = [
        `${dividend} × ${divisor}`,
        `${quotient} ÷ ${divisor}`,
        `${dividend} - ${divisor}`,
        `${quotient} + ${divisor}`
    ];

    const options = shuffle([correctAnswer, ...shuffle(wrongOptions).slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Multiplication is the inverse of division',
        module: 'C03_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Choose Best Estimate
 * Compare different rounding strategies
 */
function generateChooseBestEstimate(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);

    const text = `To estimate ${a.toLocaleString()} + ${b.toLocaleString()}, which rounding gives the best estimate?`;

    // Calculate different estimates
    const estimates = params.rounding_to.map(place => {
        const aRounded = roundTo(a, place);
        const bRounded = roundTo(b, place);
        const estimate = aRounded + bRounded;
        const error = Math.abs(estimate - answer);
        const placeWord = place === 10 ? 'ten' :
                          place === 100 ? 'hundred' :
                          place === 1000 ? 'thousand' : place.toString();
        return {
            text: `Round to nearest ${placeWord}: about ${estimate.toLocaleString()}`,
            error: error
        };
    });

    // Find the best estimate (smallest error)
    estimates.sort((a, b) => a.error - b.error);
    const correctAnswer = estimates[0].text;

    // Add a distractor
    const wrongOptions = estimates.slice(1).map(e => e.text);
    wrongOptions.push('Calculate exactly without rounding');

    const options = shuffle([correctAnswer, ...wrongOptions.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Try different rounding methods and compare',
        module: 'C03_Y4_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Multi-Operation Check (Level 4)
 * Check calculations involving two operations
 */
function generateMultiOperationCheck(params, level) {
    const a = randomInt(params.min_value, params.max_value);
    const b = randomInt(100, 1000);
    const c = randomInt(100, 1000);

    const correctAnswer = a + b - c;

    const isCorrect = Math.random() < 0.6;
    const givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([500, -500, 1000, -1000]);

    const text = `Calculate ${a.toLocaleString()} + ${b.toLocaleString()} - ${c.toLocaleString()} = ${givenAnswer.toLocaleString()}\n\nIs this answer reasonable?\n\nYes or No?`;

    const options = ['Yes', 'No'];
    const correctOption = isCorrect ? 'Yes' : 'No';

    const aRounded = roundTo(a, 1000);
    const bRounded = roundTo(b, 100);
    const cRounded = roundTo(c, 100);
    const estimate = aRounded + bRounded - cRounded;

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: `Estimate: about ${aRounded.toLocaleString()} + ${bRounded.toLocaleString()} - ${cRounded.toLocaleString()} = ${estimate.toLocaleString()}`,
        module: 'C03_Y4_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C03_Y4_CALC',
    generate: generateQuestion
};
