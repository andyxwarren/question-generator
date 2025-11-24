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
} from './helpers/C01_C03_calculationHelpers.js';

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
        let questionTemplate, questionRendered, hintTemplate, hintRendered;

        if (style === 'word_problem') {
            const context = getAdditionContext(a, b, answer);
            questionTemplate = context.text;  // Word problems already use variable values
            questionRendered = context.text;
            hintTemplate = "Recall: [a] + [b]";
            hintRendered = `Recall: ${a} + ${b}`;
        } else {
            questionTemplate = "[a] + [b] = ?";
            questionRendered = `${a} + ${b} = ?`;
            hintTemplate = "Recall: [a] + [b]";
            hintRendered = `Recall: ${a} + ${b}`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value_basic);
        const options = shuffle([answer, ...distractors]);

        // Create metadata for all options (all same format)
        const optionsMetadata = options.map(() => ({
            prefix: "",
            suffix: "",
            decimals: 0,
            type: "number"
        }));

        return {
            questionTemplate: questionTemplate,
            questionRendered: questionRendered,
            values: { a, b },
            valueMetadata: {
                a: { prefix: "", suffix: "", decimals: 0, type: "number" },
                b: { prefix: "", suffix: "", decimals: 0, type: "number" }
            },
            answer: answer,  // Raw number, not string
            answerMetadata: { prefix: "", suffix: "", decimals: 0, type: "number" },
            options: options,  // Raw numbers
            optionsMetadata: optionsMetadata,
            hintTemplate: hintTemplate,
            hintRendered: hintRendered,
            locale: "en-GB",
            universal: true,
            type: 'multiple_choice',
            module: 'C01_Y2_CALC',
            level: level
        };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value_basic, {
            maxMinuend: params.max_value_basic
        });

        const style = randomChoice(params.question_styles);
        let questionTemplate, questionRendered, hintTemplate, hintRendered;

        if (style === 'word_problem') {
            const context = getSubtractionContext(a, b, answer);
            questionTemplate = context.text;  // Word problems already use variable values
            questionRendered = context.text;
            hintTemplate = "Recall: [a] - [b]";
            hintRendered = `Recall: ${a} - ${b}`;
        } else {
            questionTemplate = "[a] - [b] = ?";
            questionRendered = `${a} - ${b} = ?`;
            hintTemplate = "Recall: [a] - [b]";
            hintRendered = `Recall: ${a} - ${b}`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value_basic);
        const options = shuffle([answer, ...distractors]);

        // Create metadata for all options (all same format)
        const optionsMetadata = options.map(() => ({
            prefix: "",
            suffix: "",
            decimals: 0,
            type: "number"
        }));

        return {
            questionTemplate: questionTemplate,
            questionRendered: questionRendered,
            values: { a, b },
            valueMetadata: {
                a: { prefix: "", suffix: "", decimals: 0, type: "number" },
                b: { prefix: "", suffix: "", decimals: 0, type: "number" }
            },
            answer: answer,  // Raw number, not string
            answerMetadata: { prefix: "", suffix: "", decimals: 0, type: "number" },
            options: options,  // Raw numbers
            optionsMetadata: optionsMetadata,
            hintTemplate: hintTemplate,
            hintRendered: hintRendered,
            locale: "en-GB",
            universal: true,
            type: 'multiple_choice',
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
                template: `If [smallA] + [smallB] = [smallAnswer], what is [largeA] + [largeB]?`,
                rendered: `If ${smallA} + ${smallB} = ${smallAnswer}, what is ${a} + ${b}?`,
                showRelation: true
            },
            {
                template: `[largeA] + [largeB] = ?`,
                rendered: `${a} + ${b} = ?`,
                showRelation: false
            },
            {
                template: `Use the fact [smallA] + [smallB] = [smallAnswer] to work out [largeA] + [largeB]`,
                rendered: `Use the fact ${smallA} + ${smallB} = ${smallAnswer} to work out ${a} + ${b}`,
                showRelation: true
            }
        ];

        const question = randomChoice(questionTypes);

        const distractors = generateDistractors(answer, 3, 0, params.max_value_derived);
        const options = shuffle([answer, ...distractors]);

        const values = {
            smallA,
            smallB,
            smallAnswer,
            largeA: a,
            largeB: b
        };

        const valueMetadata = {
            smallA: { type: "number", prefix: "", suffix: "", decimals: 0 },
            smallB: { type: "number", prefix: "", suffix: "", decimals: 0 },
            smallAnswer: { type: "number", prefix: "", suffix: "", decimals: 0 },
            largeA: { type: "number", prefix: "", suffix: "", decimals: 0 },
            largeB: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const hintTemplate = question.showRelation
            ? `[largeA] + [largeB] is the same pattern as [smallA] + [smallB]`
            : `Think of [smallA] + [smallB]`;
        const hintRendered = question.showRelation
            ? `${a} + ${b} is the same pattern as ${smallA} + ${smallB}`
            : `Think of ${a / 10} + ${b / 10}`;

        return {
            questionTemplate: question.template,
            questionRendered: question.rendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate,
            hintRendered,
            locale: 'en-GB',
            universal: true,
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
                template: `If [smallA] - [smallB] = [smallAnswer], what is [largeA] - [largeB]?`,
                rendered: `If ${smallA} - ${smallB} = ${smallAnswer}, what is ${a} - ${b}?`,
                showRelation: true
            },
            {
                template: `[largeA] - [largeB] = ?`,
                rendered: `${a} - ${b} = ?`,
                showRelation: false
            },
            {
                template: `Use the fact [smallA] - [smallB] = [smallAnswer] to work out [largeA] - [largeB]`,
                rendered: `Use the fact ${smallA} - ${smallB} = ${smallAnswer} to work out ${a} - ${b}`,
                showRelation: true
            }
        ];

        const question = randomChoice(questionTypes);

        const distractors = generateDistractors(answer, 3, 0, params.max_value_derived);
        const options = shuffle([answer, ...distractors]);

        const values = {
            smallA,
            smallB,
            smallAnswer,
            largeA: a,
            largeB: b
        };

        const valueMetadata = {
            smallA: { type: "number", prefix: "", suffix: "", decimals: 0 },
            smallB: { type: "number", prefix: "", suffix: "", decimals: 0 },
            smallAnswer: { type: "number", prefix: "", suffix: "", decimals: 0 },
            largeA: { type: "number", prefix: "", suffix: "", decimals: 0 },
            largeB: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const hintTemplate = question.showRelation
            ? `[largeA] - [largeB] is the same pattern as [smallA] - [smallB]`
            : `Think of [smallA] - [smallB]`;
        const hintRendered = question.showRelation
            ? `${a} - ${b} is the same pattern as ${smallA} - ${smallB}`
            : `Think of ${a / 10} - ${b / 10}`;

        return {
            questionTemplate: question.template,
            questionRendered: question.rendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate,
            hintRendered,
            locale: 'en-GB',
            universal: true,
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
    const isWordProblem = randomChoice(params.question_styles) === 'word_problem';

    let questionTemplate, questionRendered, values, valueMetadata;

    if (isWordProblem) {
        const name = getRandomName();
        const item = getRandomItem();
        questionTemplate = `[name] wants [result] [item]. They have [known] [item]. How many more do they need?`;
        questionRendered = `${name} wants ${result} ${item}. They have ${known} ${item}. How many more do they need?`;
        values = { name, result, known, item };
        valueMetadata = {
            name: { prefix: "", suffix: "", decimals: 0, type: "text" },
            result: { prefix: "", suffix: "", decimals: 0, type: "number" },
            known: { prefix: "", suffix: "", decimals: 0, type: "number" },
            item: { prefix: "", suffix: "", decimals: 0, type: "text" }
        };
    } else {
        if (position === 'first') {
            questionTemplate = `[unknown] + [known] = [result]`;
            questionRendered = `___ + ${known} = ${result}`;
        } else {
            questionTemplate = `[known] + [unknown] = [result]`;
            questionRendered = `${known} + ___ = ${result}`;
        }
        values = { unknown: answer, known, result };
        valueMetadata = {
            unknown: { prefix: "", suffix: "", decimals: 0, type: "number" },
            known: { prefix: "", suffix: "", decimals: 0, type: "number" },
            result: { prefix: "", suffix: "", decimals: 0, type: "number" }
        };
    }

    const distractors = generateDistractors(answer, 3, 0, Math.max(params.max_value_basic, result));
    const options = shuffle([answer, ...distractors]);
    const optionsMetadata = options.map(() => ({
        prefix: "", suffix: "", decimals: 0, type: "number"
    }));

    return {
        questionTemplate,
        questionRendered,
        values,
        valueMetadata,
        answer: answer,  // Raw number, not string
        answerMetadata: { prefix: "", suffix: "", decimals: 0, type: "number" },
        options: options,
        optionsMetadata: optionsMetadata,
        hintTemplate: `[result] - [known] = ?`,
        hintRendered: `${result} - ${known} = ?`,
        locale: "en-GB",
        universal: true,
        type: 'multiple_choice',
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
            template: `If [a] + [b] = [sum], what is [sum] - [a]?`,
            rendered: `If ${a} + ${b} = ${sum}, what is ${sum} - ${a}?`,
            answer: b
        },
        {
            template: `If [a] + [b] = [sum], what is [sum] - [b]?`,
            rendered: `If ${a} + ${b} = ${sum}, what is ${sum} - ${b}?`,
            answer: a
        },
        {
            template: `You know that [a] + [b] = [sum]. Use this to work out [sum] - [a]`,
            rendered: `You know that ${a} + ${b} = ${sum}. Use this to work out ${sum} - ${a}`,
            answer: b
        }
    ];

    const question = randomChoice(questionTypes);

    const distractors = generateDistractors(question.answer, 3, 0, sum);
    const options = shuffle([question.answer, ...distractors]);

    const values = { a, b, sum };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        sum: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: question.answer,
        hintTemplate: 'Addition and subtraction are inverse operations',
        hintRendered: 'Addition and subtraction are inverse operations',
        locale: 'en-GB',
        universal: true,
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

        const correctCheck = `${answer} - ${a}`;
        const wrongOptions = [
            `${a} - ${b}`,
            `${answer} + ${a}`,
            `${b} - ${a}`
        ];

        const options = shuffle([correctCheck, ...wrongOptions.slice(0, 3)]);

        const values = { a, b, result: answer };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            result: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        return {
            questionTemplate: `To check if [a] + [b] = [result], which subtraction could you use?`,
            questionRendered: `To check if ${a} + ${b} = ${answer}, which subtraction could you use?`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: correctCheck,  // String expression
            hintTemplate: `Subtraction is the inverse of addition`,
            hintRendered: `Subtraction is the inverse of addition`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y2_CALC',
            level: level
        };
    } else if (operation === 'check_subtract') {
        const { a, b, answer } = generateSubtraction(1, params.max_value_basic, {
            maxMinuend: params.max_value_basic
        });

        const correctCheck = `${answer} + ${b}`;
        const wrongOptions = [
            `${a} + ${b}`,
            `${answer} - ${b}`,
            `${a} + ${answer}`
        ];

        const options = shuffle([correctCheck, ...wrongOptions.slice(0, 3)]);

        const values = { a, b, result: answer };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            result: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        return {
            questionTemplate: `To check if [a] - [b] = [result], which addition could you use?`,
            questionRendered: `To check if ${a} - ${b} = ${answer}, which addition could you use?`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: correctCheck,  // String expression
            hintTemplate: `Addition is the inverse of subtraction`,
            hintRendered: `Addition is the inverse of subtraction`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y2_CALC',
            level: level
        };
    } else {
        // Solve using inverse
        const { a, b, answer } = generateAddition(2, params.max_value_basic);

        const correctAnswer = b;

        const distractors = generateDistractors(correctAnswer, 3, 0, params.max_value_basic);
        const options = shuffle([correctAnswer, ...distractors]);

        const values = {
            a,
            unknown: b,  // The missing value
            result: answer
        };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            unknown: { type: "number", prefix: "", suffix: "", decimals: 0 },
            result: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        return {
            questionTemplate: `[a] + [unknown] = [result]. Use subtraction to find the missing number.`,
            questionRendered: `${a} + ___ = ${answer}. Use subtraction to find the missing number.`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: correctAnswer,
            hintTemplate: `Try [result] - [a]`,
            hintRendered: `Try ${answer} - ${a}`,
            locale: 'en-GB',
            universal: true,
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

    const values = {
        smaller,
        larger,
        sum
    };

    const valueMetadata = {
        smaller: { type: "number", prefix: "", suffix: "", decimals: 0 },
        larger: { type: "number", prefix: "", suffix: "", decimals: 0 },
        sum: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Complete the fact family using [smaller], [larger], and [sum]. Which fact is missing?`,
        questionRendered: text,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: missingFact,  // String expression
        hintTemplate: `All facts use [smaller], [larger], and [sum]`,
        hintRendered: `All facts use ${smaller}, ${larger}, and ${sum}`,
        locale: 'en-GB',
        universal: true,
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

    const distractors = generateDistractors(answer, 3, 0, params.max_value_derived);
    const options = shuffle([answer, ...distractors]);

    const values = {
        a,
        b,
        roundA,
        roundB,
        roundedSum,
        totalAdjust: Math.abs(totalAdjust)
    };

    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        roundA: { type: "number", prefix: "", suffix: "", decimals: 0 },
        roundB: { type: "number", prefix: "", suffix: "", decimals: 0 },
        roundedSum: { type: "number", prefix: "", suffix: "", decimals: 0 },
        totalAdjust: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `[a] + [b] = ?\n\nHint: Think of [a] as [roundA] and [b] as [roundB]`;
    const questionRendered = `${a} + ${b} = ?\n\nHint: Think of ${a} as ${roundA} and ${b} as ${roundB}`;

    const hintTemplate = `Step 1: [roundA] + [roundB] = [roundedSum]\nStep 2: Then ${adjustmentSign}[totalAdjust] = answer`;
    const hintRendered = `Step 1: ${roundA} + ${roundB} = ${roundedSum}\nStep 2: Then ${adjustmentSign}${totalAdjust} = ${answer}`;

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate,
        hintRendered,
        locale: 'en-GB',
        universal: true,
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
