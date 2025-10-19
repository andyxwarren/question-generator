/**
 * Year 3 Estimation, Inverses and Checking Generator
 *
 * Module: C03_Y3_CALC - "Estimate the answer to a calculation and use
 *                        inverse operations to check answers"
 *
 * This generator focuses on:
 * - Estimating by rounding to nearest 10 or 100
 * - Using inverse operations to verify calculations
 * - Judging reasonableness of answers
 * - Identifying errors in calculations
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors,
    roundToNearest
} from './helpers/N02_numberHelpers.js';

import {
    generateAddition,
    generateSubtraction,
    roundTo
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'estimate_by_rounding':
            return generateEstimateByRounding(params, level);
        case 'check_with_inverse':
            return generateCheckWithInverse(params, level);
        case 'is_reasonable':
            return generateIsReasonable(params, level);
        case 'find_error':
            return generateFindError(params, level);
        case 'choose_rounding_place':
            return generateChooseRoundingPlace(params, level);
        case 'multi_step_check':
            return generateMultiStepCheck(params, level);
        default:
            return generateEstimateByRounding(params, level);
    }
}

/**
 * OPERATION 1: Estimate by Rounding
 * "Estimate 297 + 189 by rounding to the nearest 100"
 */
function generateEstimateByRounding(params, level) {
    const calcType = randomChoice(params.calculation_types);
    const roundingPlace = randomChoice(params.rounding_to);

    if (calcType === 'addition') {
        const { a, b, answer } = generateAddition(params.min_value, params.max_value);

        const aRounded = roundTo(a, roundingPlace);
        const bRounded = roundTo(b, roundingPlace);
        const estimate = aRounded + bRounded;

        const placeWord = roundingPlace === 10 ? 'ten' : roundingPlace === 100 ? 'hundred' : roundingPlace.toString();

        const text = `Estimate ${a} + ${b} by rounding to the nearest ${placeWord}.`;

        // Generate distractors around the estimate
        const distractors = [
            estimate + roundingPlace,
            estimate - roundingPlace,
            answer // Include the exact answer as a distractor
        ].filter(d => d > 0);

        const options = shuffle([estimate, ...distractors.slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: estimate.toString(),
            hint: `Round ${a} to ${aRounded} and ${b} to ${bRounded}`,
            module: 'C03_Y3_CALC',
            level: level
        };
    } else {
        // Subtraction
        const { a, b, answer } = generateSubtraction(params.min_value, params.max_value, {
            maxMinuend: params.max_value
        });

        const aRounded = roundTo(a, roundingPlace);
        const bRounded = roundTo(b, roundingPlace);
        const estimate = aRounded - bRounded;

        const placeWord = roundingPlace === 10 ? 'ten' : roundingPlace === 100 ? 'hundred' : roundingPlace.toString();

        const text = `Estimate ${a} - ${b} by rounding to the nearest ${placeWord}.`;

        // Generate distractors
        const distractors = [
            estimate + roundingPlace,
            estimate - roundingPlace,
            answer // Include the exact answer
        ].filter(d => d > 0);

        const options = shuffle([estimate, ...distractors.slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: estimate.toString(),
            hint: `Round ${a} to ${aRounded} and ${b} to ${bRounded}`,
            module: 'C03_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Check with Inverse
 * "Calculate 456 - 234 = 222. Which calculation checks this answer?"
 */
function generateCheckWithInverse(params, level) {
    const calcType = randomChoice(params.calculation_types);

    if (calcType === 'addition') {
        const { a, b, answer } = generateAddition(params.min_value, params.max_value);

        const text = `Calculate ${a} + ${b} = ${answer}.\n\nWhich calculation checks this answer?`;

        const correctOptions = [
            `${answer} - ${a} = ${b}`,
            `${answer} - ${b} = ${a}`
        ];
        const correctAnswer = randomChoice(correctOptions);

        const wrongOptions = [
            `${a} - ${b}`,
            `${a} + ${answer}`,
            `${b} + ${answer}`,
            `${answer} + ${a}`
        ];

        const options = shuffle([correctAnswer, ...shuffle(wrongOptions).slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            hint: 'Use the inverse operation (subtraction)',
            module: 'C03_Y3_CALC',
            level: level
        };
    } else {
        // Subtraction
        const { a, b, answer } = generateSubtraction(params.min_value, params.max_value, {
            maxMinuend: params.max_value
        });

        const text = `Calculate ${a} - ${b} = ${answer}.\n\nWhich calculation checks this answer?`;

        const correctOptions = [
            `${answer} + ${b} = ${a}`,
            `${b} + ${answer} = ${a}`
        ];
        const correctAnswer = randomChoice(correctOptions);

        const wrongOptions = [
            `${a} + ${b}`,
            `${a} - ${answer}`,
            `${answer} - ${b}`,
            `${b} - ${answer}`
        ];

        const options = shuffle([correctAnswer, ...shuffle(wrongOptions).slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            hint: 'Use the inverse operation (addition)',
            module: 'C03_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Is Reasonable
 * "423 + 189 = 612. Is this answer reasonable? Yes or No"
 */
function generateIsReasonable(params, level) {
    const calcType = randomChoice(params.calculation_types);

    if (calcType === 'addition') {
        const { a, b, answer: correctAnswer } = generateAddition(params.min_value, params.max_value);

        // 70% of the time show correct answer, 30% show wrong answer
        const isCorrect = Math.random() < 0.7;

        let givenAnswer;
        if (isCorrect) {
            givenAnswer = correctAnswer;
        } else {
            // Create an unreasonable answer (off by 100 or more)
            const offset = randomChoice([100, -100, 200, -200, 50, -50]);
            givenAnswer = correctAnswer + offset;
        }

        const text = `${a} + ${b} = ${givenAnswer}\n\nIs this answer reasonable?\n\nYes or No?`;

        const options = ['Yes', 'No'];
        const correctOption = isCorrect ? 'Yes' : 'No';

        // Estimate for hint
        const roundingPlace = params.rounding_to[0] || 10;
        const aRounded = roundTo(a, roundingPlace);
        const bRounded = roundTo(b, roundingPlace);
        const estimate = aRounded + bRounded;

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctOption,
            hint: `Estimate: about ${aRounded} + ${bRounded} = ${estimate}`,
            module: 'C03_Y3_CALC',
            level: level
        };
    } else {
        // Subtraction
        const { a, b, answer: correctAnswer } = generateSubtraction(params.min_value, params.max_value, {
            maxMinuend: params.max_value
        });

        const isCorrect = Math.random() < 0.7;

        let givenAnswer;
        if (isCorrect) {
            givenAnswer = correctAnswer;
        } else {
            const offset = randomChoice([100, -100, 50, -50, 200]);
            givenAnswer = Math.max(0, correctAnswer + offset);
        }

        const text = `${a} - ${b} = ${givenAnswer}\n\nIs this answer reasonable?\n\nYes or No?`;

        const options = ['Yes', 'No'];
        const correctOption = isCorrect ? 'Yes' : 'No';

        const roundingPlace = params.rounding_to[0] || 10;
        const aRounded = roundTo(a, roundingPlace);
        const bRounded = roundTo(b, roundingPlace);
        const estimate = aRounded - bRounded;

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctOption,
            hint: `Estimate: about ${aRounded} - ${bRounded} = ${estimate}`,
            module: 'C03_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Find Error
 * "Which of these calculations is definitely wrong?"
 */
function generateFindError(params, level) {
    const calcType = randomChoice(params.calculation_types);

    // Generate 4 calculations: 3 reasonable, 1 clearly wrong
    const calculations = [];

    for (let i = 0; i < 4; i++) {
        if (calcType === 'addition') {
            const { a, b, answer } = generateAddition(params.min_value, params.max_value);

            if (i === 0) {
                // This one will be wrong
                const wrongAnswer = answer + randomChoice([100, 200, -100, 300, 500]);
                calculations.push({
                    text: `${a} + ${b} = ${wrongAnswer}`,
                    isWrong: true,
                    correct: answer
                });
            } else {
                // These are correct
                calculations.push({
                    text: `${a} + ${b} = ${answer}`,
                    isWrong: false,
                    correct: answer
                });
            }
        } else {
            const { a, b, answer } = generateSubtraction(params.min_value, params.max_value, {
                maxMinuend: params.max_value
            });

            if (i === 0) {
                const wrongAnswer = Math.max(0, answer + randomChoice([100, 200, -100, -50, 150]));
                calculations.push({
                    text: `${a} - ${b} = ${wrongAnswer}`,
                    isWrong: true,
                    correct: answer
                });
            } else {
                calculations.push({
                    text: `${a} - ${b} = ${answer}`,
                    isWrong: false,
                    correct: answer
                });
            }
        }
    }

    const shuffledCalcs = shuffle(calculations);
    const wrongCalc = shuffledCalcs.find(c => c.isWrong);

    const text = `Which of these calculations is definitely wrong?\n\nA) ${shuffledCalcs[0].text}\nB) ${shuffledCalcs[1].text}\nC) ${shuffledCalcs[2].text}\nD) ${shuffledCalcs[3].text}`;

    const options = ['A', 'B', 'C', 'D'];
    const correctIndex = shuffledCalcs.indexOf(wrongCalc);
    const correctAnswer = options[correctIndex];

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Use estimation to check each calculation',
        module: 'C03_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Choose Rounding Place
 * "To estimate 567 + 234, which rounding gives a better estimate?"
 */
function generateChooseRoundingPlace(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);

    const text = `To estimate ${a} + ${b}, which rounding gives a better estimate?`;

    // Determine which rounding is actually better
    const roundTo10 = roundTo(a, 10) + roundTo(b, 10);
    const roundTo100 = roundTo(a, 100) + roundTo(b, 100);

    const error10 = Math.abs(roundTo10 - answer);
    const error100 = Math.abs(roundTo100 - answer);

    let correctAnswer, wrongAnswer;
    if (error10 < error100) {
        correctAnswer = `Round to nearest 10: about ${roundTo10}`;
        wrongAnswer = `Round to nearest 100: about ${roundTo100}`;
    } else {
        correctAnswer = `Round to nearest 100: about ${roundTo100}`;
        wrongAnswer = `Round to nearest 10: about ${roundTo10}`;
    }

    const options = shuffle([
        correctAnswer,
        wrongAnswer,
        `Don't round, calculate exactly`,
        `Round to nearest 1000`
    ]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Try both methods and see which is closer',
        module: 'C03_Y3_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Multi-Step Check (Level 4 only)
 * "Emma has 145 sweets. She buys 78 more, then gives away 50. She thinks she has 183 left. Is this reasonable?"
 */
function generateMultiStepCheck(params, level) {
    const start = randomInt(100, params.max_value);
    const add = randomInt(50, 200);
    const subtract = randomInt(20, 100);

    const correctAnswer = start + add - subtract;

    // 60% correct, 40% wrong
    const isCorrect = Math.random() < 0.6;
    const givenAnswer = isCorrect ? correctAnswer : correctAnswer + randomChoice([50, -50, 100, -100, 30]);

    const names = ['Emma', 'Tom', 'Sarah', 'Jack', 'Lily'];
    const items = ['sweets', 'stickers', 'marbles', 'cards'];

    const name = randomChoice(names);
    const item = randomChoice(items);

    const text = `${name} has ${start} ${item}. They buy ${add} more, then give away ${subtract}.\n\nThey think they have ${givenAnswer} left. Is this reasonable?\n\nYes or No?`;

    const options = ['Yes', 'No'];
    const correctOption = isCorrect ? 'Yes' : 'No';

    // Estimate
    const startRound = roundTo(start, 100);
    const addRound = roundTo(add, 50);
    const subRound = roundTo(subtract, 50);
    const estimate = startRound + addRound - subRound;

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: `Estimate: about ${startRound} + ${addRound} - ${subRound} = ${estimate}`,
        module: 'C03_Y3_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C03_Y3_CALC',
    generate: generateQuestion
};
