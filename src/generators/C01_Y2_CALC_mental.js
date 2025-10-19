/**
 * Year 2 Mental Addition and Subtraction Generator
 *
 * Module: C01_Y2_CALC - "Recall and use addition and subtraction facts to 20 fluently,
 *                        and derive and use related facts up to 100"
 *
 * This generator focuses on:
 * - Fluent recall of facts to 20
 * - Deriving related facts to 100 (if 7+8=15, then 70+80=150)
 * - Missing number problems
 * - Inverse operations
 * - Fact families to 100
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
    getRandomName,
    getRandomItem,
    getAdditionContext,
    getSubtractionContext
} from './helpers/calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'recall_to_20':
            return generateRecallTo20(params, level);
        case 'derive_to_100':
            return generateDeriveTo100(params, level);
        case 'missing_addend':
            return generateMissingAddend(params, level);
        case 'related_subtract':
            return generateRelatedSubtract(params, level);
        case 'inverse_operations':
            return generateInverseOperations(params, level);
        case 'fact_families_100':
            return generateFactFamilies100(params, level);
        case 'near_multiples':
            return generateNearMultiples(params, level);
        default:
            return generateRecallTo20(params, level);
    }
}

/**
 * OPERATION 1: Recall to 20
 * Direct recall of addition and subtraction facts within 20
 */
function generateRecallTo20(params, level) {
    const operation = randomChoice(['add', 'subtract']);

    if (operation === 'add') {
        const { a, b, answer } = generateAddition(2, params.max_value_basic);

        const style = randomChoice(params.question_styles);
        let text;

        if (style === 'word_problem') {
            const context = getAdditionContext(a, b, answer);
            text = context.text;
        } else {
            text = `${a} + ${b} = ?`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value_basic);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Recall: ${a} + ${b}`,
            module: 'C01_Y2_CALC',
            level: level
        };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value_basic, {
            maxMinuend: params.max_value_basic
        });

        const style = randomChoice(params.question_styles);
        let text;

        if (style === 'word_problem') {
            const context = getSubtractionContext(a, b, answer);
            text = context.text;
        } else {
            text = `${a} - ${b} = ?`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value_basic);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Recall: ${a} - ${b}`,
            module: 'C01_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Derive to 100
 * Use known facts to derive related facts up to 100
 * If 7 + 8 = 15, then 70 + 80 = 150
 */
function generateDeriveTo100(params, level) {
    const operation = randomChoice(['add', 'subtract']);

    if (operation === 'add') {
        // Generate a fact within 20
        const { a: smallA, b: smallB, answer: smallAnswer } = generateAddition(2, params.max_value_basic);

        // Scale to tens
        const a = smallA * 10;
        const b = smallB * 10;
        const answer = smallAnswer * 10;

        const questionTypes = [
            {
                text: `If ${smallA} + ${smallB} = ${smallAnswer}, what is ${a} + ${b}?`,
                showRelation: true
            },
            {
                text: `${a} + ${b} = ?`,
                showRelation: false
            },
            {
                text: `Use the fact ${smallA} + ${smallB} = ${smallAnswer} to work out ${a} + ${b}`,
                showRelation: true
            }
        ];

        const question = randomChoice(questionTypes);

        const distractors = generateDistractors(answer, 3, 0, params.max_value_derived);
        const options = shuffle([answer, ...distractors]);

        return {
            text: question.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: question.showRelation ? `${a} + ${b} is the same pattern as ${smallA} + ${smallB}` : `Think of ${a / 10} + ${b / 10}`,
            module: 'C01_Y2_CALC',
            level: level
        };
    } else {
        // Generate a subtraction fact within 20
        const { a: smallA, b: smallB, answer: smallAnswer } = generateSubtraction(1, params.max_value_basic, {
            maxMinuend: params.max_value_basic
        });

        // Scale to tens
        const a = smallA * 10;
        const b = smallB * 10;
        const answer = smallAnswer * 10;

        const questionTypes = [
            {
                text: `If ${smallA} - ${smallB} = ${smallAnswer}, what is ${a} - ${b}?`,
                showRelation: true
            },
            {
                text: `${a} - ${b} = ?`,
                showRelation: false
            },
            {
                text: `Use the fact ${smallA} - ${smallB} = ${smallAnswer} to work out ${a} - ${b}`,
                showRelation: true
            }
        ];

        const question = randomChoice(questionTypes);

        const distractors = generateDistractors(answer, 3, 0, params.max_value_derived);
        const options = shuffle([answer, ...distractors]);

        return {
            text: question.text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: question.showRelation ? `${a} - ${b} is the same pattern as ${smallA} - ${smallB}` : `Think of ${a / 10} - ${b / 10}`,
            module: 'C01_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Missing Addend
 * Find the missing number in addition: a + ? = c or ? + b = c
 */
function generateMissingAddend(params, level) {
    const useLargeNumber = params.multiples_of_10 && Math.random() < 0.5;

    let result, known, answer;

    if (useLargeNumber) {
        // Use multiples of 10
        result = randomInt(2, 10) * 10;
        known = randomInt(1, Math.floor(result / 10) - 1) * 10;
        answer = result - known;
    } else {
        // Use numbers within 20
        result = randomInt(5, params.max_value_basic);
        known = randomInt(1, result - 1);
        answer = result - known;
    }

    const position = randomChoice(['first', 'second']);

    let text;
    if (position === 'first') {
        text = `___ + ${known} = ${result}`;
    } else {
        text = `${known} + ___ = ${result}`;
    }

    // Word problem variant
    if (randomChoice(params.question_styles) === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        text = `${name} wants ${result} ${item}. They have ${known} ${item}. How many more do they need?`;
    }

    const distractors = generateDistractors(answer, 3, 0, Math.max(params.max_value_basic, result));
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${result} - ${known} = ?`,
        module: 'C01_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Related Subtraction
 * Use addition facts to solve subtraction (inverse relationship)
 */
function generateRelatedSubtract(params, level) {
    const useLargeNumber = params.multiples_of_10 && Math.random() < 0.5;

    let a, b, sum;

    if (useLargeNumber) {
        a = randomInt(1, 9) * 10;
        b = randomInt(1, 9) * 10;
        sum = a + b;
    } else {
        const result = generateAddition(2, params.max_value_basic);
        a = result.a;
        b = result.b;
        sum = result.answer;
    }

    const questionTypes = [
        {
            text: `If ${a} + ${b} = ${sum}, what is ${sum} - ${a}?`,
            answer: b
        },
        {
            text: `If ${a} + ${b} = ${sum}, what is ${sum} - ${b}?`,
            answer: a
        },
        {
            text: `You know that ${a} + ${b} = ${sum}. Use this to work out ${sum} - ${a}`,
            answer: b
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(question.answer, 3, 0, sum);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: 'Addition and subtraction are inverse operations',
        module: 'C01_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Inverse Operations
 * Use inverse to check or solve
 */
function generateInverseOperations(params, level) {
    const operation = randomChoice(['check_add', 'check_subtract', 'solve_using_inverse']);

    if (operation === 'check_add') {
        const { a, b, answer } = generateAddition(2, params.max_value_basic);

        const text = `To check if ${a} + ${b} = ${answer}, which subtraction could you use?`;

        const correctCheck = `${answer} - ${a}`;
        const wrongOptions = [
            `${a} - ${b}`,
            `${answer} + ${a}`,
            `${b} - ${a}`
        ];

        const options = shuffle([correctCheck, ...wrongOptions.slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctCheck,
            hint: `Subtraction is the inverse of addition`,
            module: 'C01_Y2_CALC',
            level: level
        };
    } else if (operation === 'check_subtract') {
        const { a, b, answer } = generateSubtraction(1, params.max_value_basic, {
            maxMinuend: params.max_value_basic
        });

        const text = `To check if ${a} - ${b} = ${answer}, which addition could you use?`;

        const correctCheck = `${answer} + ${b}`;
        const wrongOptions = [
            `${a} + ${b}`,
            `${answer} - ${b}`,
            `${a} + ${answer}`
        ];

        const options = shuffle([correctCheck, ...wrongOptions.slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctCheck,
            hint: `Addition is the inverse of subtraction`,
            module: 'C01_Y2_CALC',
            level: level
        };
    } else {
        // Solve using inverse
        const { a, b, answer } = generateAddition(2, params.max_value_basic);

        const text = `${a} + ___ = ${answer}. Use subtraction to find the missing number.`;
        const correctAnswer = b;

        const distractors = generateDistractors(correctAnswer, 3, 0, params.max_value_basic);
        const options = shuffle([correctAnswer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Try ${answer} - ${a}`,
            module: 'C01_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Fact Families to 100
 * Complete fact families using multiples of 10
 */
function generateFactFamilies100(params, level) {
    const a = randomInt(1, 9) * 10;
    const b = randomInt(1, 9) * 10;
    const sum = a + b;

    const smaller = Math.min(a, b);
    const larger = Math.max(a, b);

    // Handle case where addends are equal (e.g., 50+50=100)
    let family;
    if (smaller === larger) {
        // Only 2 unique facts when doubling
        family = [
            `${smaller} + ${larger} = ${sum}`,
            `${sum} - ${smaller} = ${larger}`
        ];
    } else {
        // Normal case: 4 distinct facts
        family = [
            `${smaller} + ${larger} = ${sum}`,
            `${larger} + ${smaller} = ${sum}`,
            `${sum} - ${smaller} = ${larger}`,
            `${sum} - ${larger} = ${smaller}`
        ];
    }

    const missingIndex = randomInt(0, family.length - 1);
    const missingFact = family[missingIndex];

    const shownFacts = family.filter((_, i) => i !== missingIndex);

    // Format facts with commas and "and" for better readability
    let factsText;
    if (shownFacts.length === 1) {
        // Only 1 fact shown (happens with doubled addends)
        factsText = shownFacts[0];
    } else if (shownFacts.length === 2) {
        factsText = `${shownFacts[0]} and ${shownFacts[1]}`;
    } else {
        // 3 or more facts
        const allButLast = shownFacts.slice(0, -1);
        const last = shownFacts[shownFacts.length - 1];
        factsText = `${allButLast.join(', ')} and ${last}`;
    }

    const text = `Complete the fact family: ${factsText}. Which fact is missing?`;

    // Create wrong options
    const wrongAnswers = [];
    if (missingFact.includes('+')) {
        wrongAnswers.push(`${smaller} + ${larger} = ${sum + 10}`);
        wrongAnswers.push(`${smaller} + ${larger} = ${sum - 10}`);
        wrongAnswers.push(`${smaller + 10} + ${larger} = ${sum}`);
    } else {
        wrongAnswers.push(`${sum} - ${smaller} = ${larger + 10}`);
        wrongAnswers.push(`${sum} - ${smaller} = ${larger - 10}`);
        wrongAnswers.push(`${sum + 10} - ${smaller} = ${larger}`);
    }

    const options = shuffle([missingFact, ...wrongAnswers.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: missingFact,
        hint: `All facts use ${smaller}, ${larger}, and ${sum}`,
        module: 'C01_Y2_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Near Multiples (Level 4 only)
 * Use rounding and compensation for mental calculation
 * e.g., 47 + 38 = (50 + 40) - 5 = 85
 */
function generateNearMultiples(params, level) {
    // Generate numbers close to multiples of 10
    // Limit offsets to ±1, ±2 only for Year 2 (not ±3)
    const roundA = randomInt(3, 9) * 10;
    const offsetA = randomChoice([-2, -1, 1, 2]);
    const a = roundA + offsetA;

    const roundB = randomInt(2, 9) * 10;
    const offsetB = randomChoice([-2, -1, 1, 2]);
    const b = roundB + offsetB;

    const answer = a + b;
    const roundedSum = roundA + roundB;

    // Calculate the total adjustment needed
    const totalAdjust = offsetA + offsetB;
    const adjustmentSign = totalAdjust > 0 ? '+' : '';

    const text = `${a} + ${b} = ?\n\nHint: Think of ${a} as ${roundA} and ${b} as ${roundB}`;

    const distractors = generateDistractors(answer, 3, 0, params.max_value_derived);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Step 1: ${roundA} + ${roundB} = ${roundedSum}\nStep 2: Then ${adjustmentSign}${totalAdjust} = ${answer}`,
        module: 'C01_Y2_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C01_Y2_CALC',
    generate: generateQuestion
};
