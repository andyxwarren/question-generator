/**
 * Year 2 Estimation, Inverses and Checking Generator
 *
 * Module: C03_Y2_CALC - "Recognise and use the inverse relationship between
 *                        addition and subtraction and use this to check
 *                        calculations and missing number problems"
 *
 * This generator focuses on:
 * - Understanding inverse relationships (addition ↔ subtraction)
 * - Using inverses to check calculations
 * - Using inverses to solve missing number problems
 * - Fact families showing inverse relationships
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
    formatCalculation
} from './helpers/calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'identify_inverse_check':
            return generateIdentifyInverseCheck(params, level);
        case 'missing_number_inverse':
            return generateMissingNumberInverse(params, level);
        case 'true_false_check':
            return generateTrueFalseCheck(params, level);
        case 'complete_fact_family':
            return generateCompleteFactFamily(params, level);
        case 'choose_checking_method':
            return generateChooseCheckingMethod(params, level);
        case 'two_step_inverse':
            return generateTwoStepInverse(params, level);
        default:
            return generateIdentifyInverseCheck(params, level);
    }
}

/**
 * OPERATION 1: Identify Inverse Check
 * "To check if 12 + 5 = 17, which calculation could you use?"
 */
function generateIdentifyInverseCheck(params, level) {
    const operation = randomChoice(['addition', 'subtraction']);

    if (operation === 'addition') {
        const { a, b, answer } = generateAddition(2, params.max_value);

        const text = `To check if ${a} + ${b} = ${answer}, which calculation could you use?`;

        // Correct inverse checks
        const correctOptions = [
            `${answer} - ${a} = ${b}`,
            `${answer} - ${b} = ${a}`
        ];
        const correctAnswer = randomChoice(correctOptions);

        // Wrong options
        const wrongOptions = [
            `${a} - ${b}`,
            `${a} + ${answer}`,
            `${b} - ${a}`,
            `${answer} + ${a}`
        ];

        const options = shuffle([correctAnswer, ...shuffle(wrongOptions).slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            hint: 'Subtraction is the inverse of addition',
            module: 'C03_Y2_CALC',
            level: level
        };
    } else {
        const { a, b, answer } = generateSubtraction(1, params.max_value, {
            maxMinuend: params.max_value
        });

        const text = `To check if ${a} - ${b} = ${answer}, which calculation could you use?`;

        // Correct inverse checks
        const correctOptions = [
            `${answer} + ${b} = ${a}`,
            `${b} + ${answer} = ${a}`
        ];
        const correctAnswer = randomChoice(correctOptions);

        // Wrong options
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
            hint: 'Addition is the inverse of subtraction',
            module: 'C03_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Missing Number Using Inverse
 * "15 + ___ = 23. Use subtraction to find the missing number."
 */
function generateMissingNumberInverse(params, level) {
    const operation = randomChoice(['addition', 'subtraction']);

    if (operation === 'addition') {
        // a + ? = c, so ? = c - a
        const result = randomInt(params.min_value + 5, params.max_value);
        const known = randomInt(params.min_value, result - 1);
        const answer = result - known;

        const position = randomChoice(['first', 'second']);

        let text, inverseCalculation;
        if (position === 'first') {
            text = `___ + ${known} = ${result}. Use subtraction to find the missing number.`;
            inverseCalculation = `${result} - ${known}`;
        } else {
            text = `${known} + ___ = ${result}. Use subtraction to find the missing number.`;
            inverseCalculation = `${result} - ${known}`;
        }

        const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Try ${inverseCalculation}`,
            module: 'C03_Y2_CALC',
            level: level
        };
    } else {
        // a - ? = c, so ? = a - c OR ? - b = c, so ? = c + b
        const subPosition = randomChoice(['subtrahend', 'minuend']);

        if (subPosition === 'subtrahend') {
            // a - ? = c
            const minuend = randomInt(params.min_value + 5, params.max_value);
            const result = randomInt(params.min_value, minuend - 1);
            const answer = minuend - result;

            const text = `${minuend} - ___ = ${result}. Use addition to find the missing number.`;
            const inverseCalculation = `${minuend} - ${result}`;

            const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Try ${inverseCalculation}`,
                module: 'C03_Y2_CALC',
                level: level
            };
        } else {
            // ? - b = c
            const subtrahend = randomInt(params.min_value, params.max_value / 2);
            const result = randomInt(params.min_value, params.max_value / 2);
            const answer = result + subtrahend;

            const text = `___ - ${subtrahend} = ${result}. Use addition to find the missing number.`;
            const inverseCalculation = `${result} + ${subtrahend}`;

            const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Try ${inverseCalculation}`,
                module: 'C03_Y2_CALC',
                level: level
            };
        }
    }
}

/**
 * OPERATION 3: True/False Check
 * "Does 17 - 5 = 12 check that 12 + 5 = 17? True or False"
 */
function generateTrueFalseCheck(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);

    // Randomly decide if we show correct or incorrect inverse
    const isCorrect = Math.random() < 0.7; // 70% correct, 30% incorrect

    const questionTypes = [
        {
            original: `${a} + ${b} = ${answer}`,
            check: isCorrect ? `${answer} - ${a} = ${b}` : `${answer} - ${b + randomInt(1, 3)} = ${a}`,
            correctAnswer: isCorrect
        },
        {
            original: `${a} + ${b} = ${answer}`,
            check: isCorrect ? `${answer} - ${b} = ${a}` : `${answer} + ${b} = ${a}`,
            correctAnswer: isCorrect
        }
    ];

    const question = randomChoice(questionTypes);

    const text = `Does "${question.check}" check that "${question.original}"?\n\nTrue or False?`;

    const options = ['True', 'False'];
    const correctAnswer = question.correctAnswer ? 'True' : 'False';

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Subtraction is the inverse of addition',
        module: 'C03_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Complete Fact Family
 * "These facts are related: 8 + 7 = 15, 15 - 7 = 8. Which fact completes the family?"
 */
function generateCompleteFactFamily(params, level) {
    const a = randomInt(params.min_value, params.max_value / 2);
    const b = randomInt(params.min_value, params.max_value / 2);
    const sum = a + b;

    const smaller = Math.min(a, b);
    const larger = Math.max(a, b);

    // Generate all 4 facts in the family (or 2 if a === b)
    let family;
    if (smaller === larger) {
        // Doubling case: only 2 unique facts
        family = [
            `${smaller} + ${larger} = ${sum}`,
            `${sum} - ${smaller} = ${larger}`
        ];
    } else {
        // Normal case: 4 facts
        family = [
            `${smaller} + ${larger} = ${sum}`,
            `${larger} + ${smaller} = ${sum}`,
            `${sum} - ${smaller} = ${larger}`,
            `${sum} - ${larger} = ${smaller}`
        ];
    }

    // Show 2 facts, ask for missing one
    const missingIndex = randomInt(0, family.length - 1);
    const missingFact = family[missingIndex];

    const shownFacts = family.filter((_, i) => i !== missingIndex).slice(0, 2);

    const factsText = shownFacts.join(' and ');

    const text = `These facts are related: ${factsText}.\n\nWhich fact completes the family?`;

    // Create wrong options
    const wrongAnswers = [];
    if (missingFact.includes('+')) {
        wrongAnswers.push(`${smaller} + ${larger} = ${sum + 10}`);
        wrongAnswers.push(`${smaller} + ${larger} = ${sum - 10}`);
        wrongAnswers.push(`${smaller + 5} + ${larger} = ${sum}`);
    } else {
        wrongAnswers.push(`${sum} - ${smaller} = ${larger + 5}`);
        wrongAnswers.push(`${sum + 10} - ${smaller} = ${larger}`);
        wrongAnswers.push(`${sum} + ${smaller} = ${larger}`);
    }

    const options = shuffle([missingFact, ...wrongAnswers.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: missingFact,
        hint: `All facts use the numbers ${smaller}, ${larger}, and ${sum}`,
        module: 'C03_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Choose Checking Method
 * "You calculate 45 + 23 = 68. Which is the best way to check your answer?"
 */
function generateChooseCheckingMethod(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);

    const text = `You calculate ${a} + ${b} = ${answer}.\n\nWhich is the best way to check your answer?`;

    const correctOption = `Use subtraction: ${answer} - ${a} should equal ${b}`;

    const wrongOptions = [
        `Add the numbers again in the same order`,
        `Use addition: ${a} + ${answer} should equal ${b}`,
        `Estimate by rounding to the nearest 10`
    ];

    const options = shuffle([correctOption, ...wrongOptions]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: correctOption,
        hint: 'The inverse operation is the best check',
        module: 'C03_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Two-Step Inverse (Level 4 only)
 * "Sarah has some marbles. She gives away 12 and has 25 left. How many did she start with?"
 */
function generateTwoStepInverse(params, level) {
    const subtracted = randomInt(params.min_value + 5, params.max_value / 2);
    const remaining = randomInt(params.min_value + 5, params.max_value / 2);
    const answer = remaining + subtracted;

    const names = ['Sarah', 'Tom', 'Emma', 'Jack', 'Lily', 'Ben'];
    const items = ['marbles', 'stickers', 'cards', 'coins', 'sweets'];

    const name = randomChoice(names);
    const item = randomChoice(items);

    const text = `${name} has some ${item}. They give away ${subtracted} and have ${remaining} left.\n\nHow many ${item} did they start with?`;

    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value * 2);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Work backwards: ${remaining} + ${subtracted}`,
        module: 'C03_Y2_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C03_Y2_CALC',
    generate: generateQuestion
};
