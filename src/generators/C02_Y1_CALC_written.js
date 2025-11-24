/**
 * Year 1 Written Addition and Subtraction Generator
 *
 * Module: C02_Y1_CALC - "Add and subtract one-digit and two-digit numbers to 20, including zero;
 * read, write and interpret mathematical statements involving addition (+), subtraction (–) and equals (=) signs"
 *
 * This generator focuses on:
 * - Basic addition and subtraction to 20
 * - Understanding and interpreting +, -, = symbols
 * - Missing number problems
 * - Equation completion
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
        case 'simple_addition':
            return generateSimpleAddition(params, level);
        case 'simple_subtraction':
            return generateSimpleSubtraction(params, level);
        case 'missing_addend':
            return generateMissingAddend(params, level);
        case 'missing_subtrahend':
            return generateMissingSubtrahend(params, level);
        case 'missing_minuend':
            return generateMissingMinuend(params, level);
        case 'symbol_interpretation':
            return generateSymbolInterpretation(params, level);
        case 'equation_completion':
            return generateEquationCompletion(params, level);
        case 'true_false_equations':
            return generateTrueFalse(params, level);
        case 'two_step_problems':
            return generateTwoStep(params, level);
        case 'complex_missing':
            return generateComplexMissing(params, level);
        default:
            return generateSimpleAddition(params, level);
    }
}

/**
 * OPERATION 1: Simple Addition
 * Basic addition problems: a + b = ?
 */
function generateSimpleAddition(params, level) {
    const { a, b, answer } = generateAddition(
        params.result_range[0],
        params.result_range[1],
        { allowZero: params.allow_zero }
    );

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const context = getAdditionContext(a, b, answer);

        return {
            questionTemplate: context.template || `Word problem: [a] + [b] = ?`,
            questionRendered: context.text,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `[a] + [b] = [answer]`,
            hintRendered: `${a} + ${b} = ${answer}`,
            locale: 'en-GB',
            universal: true,
            module: 'C02_Y1_CALC',
            level: level
        };
    } else {
        // Equation style
        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            questionTemplate: `[a] + [b] = ?`,
            questionRendered: `${a} + ${b} = ?`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate: `Add [a] and [b]`,
            hintRendered: `Add ${a} and ${b}`,
            locale: 'en-GB',
            universal: true,
            module: 'C02_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Simple Subtraction
 * Basic subtraction problems: a - b = ?
 */
function generateSimpleSubtraction(params, level) {
    const { a, b, answer } = generateSubtraction(
        params.result_range[0],
        params.result_range[1],
        {
            allowZero: params.allow_zero,
            maxMinuend: params.max_value
        }
    );

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const context = getSubtractionContext(a, b, answer);

        return {
            questionTemplate: context.template || `Word problem: [a] - [b] = ?`,
            questionRendered: context.text,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `[a] - [b] = [answer]`,
            hintRendered: `${a} - ${b} = ${answer}`,
            locale: 'en-GB',
            universal: true,
            module: 'C02_Y1_CALC',
            level: level
        };
    } else {
        // Equation style
        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            questionTemplate: `[a] - [b] = ?`,
            questionRendered: `${a} - ${b} = ?`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate: `Subtract [b] from [a]`,
            hintRendered: `Subtract ${b} from ${a}`,
            locale: 'en-GB',
            universal: true,
            module: 'C02_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Missing Addend
 * Problems like: a + ? = c
 */
function generateMissingAddend(params, level) {
    const { a, b, answer } = generateAddition(
        params.result_range[0],
        params.result_range[1],
        { allowZero: params.allow_zero }
    );

    const values = { a, b, answer, unknown: b };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTypes = [
        {
            template: `[a] + [unknown] = [answer]`,
            rendered: `${a} + ? = ${answer}`
        },
        {
            template: `What number do you add to [a] to make [answer]?`,
            rendered: `What number do you add to ${a} to make ${answer}?`
        },
        {
            template: `[a] + [unknown] = [answer]`,
            rendered: `${a} + ___ = ${answer}`
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(b, 3, 0, params.max_value);
    const options = shuffle([b, ...distractors]);

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: b,
        hintTemplate: `[answer] - [a] = [b]`,
        hintRendered: `${answer} - ${a} = ${b}`,
        locale: 'en-GB',
        universal: true,
        module: 'C02_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Missing Subtrahend
 * Problems like: a - ? = c
 */
function generateMissingSubtrahend(params, level) {
    const { a, b, answer } = generateSubtraction(
        params.result_range[0],
        params.result_range[1],
        {
            allowZero: params.allow_zero,
            maxMinuend: params.max_value
        }
    );

    const values = { a, b, answer, unknown: b };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTypes = [
        {
            template: `[a] - [unknown] = [answer]`,
            rendered: `${a} - ? = ${answer}`
        },
        {
            template: `What number do you subtract from [a] to get [answer]?`,
            rendered: `What number do you subtract from ${a} to get ${answer}?`
        },
        {
            template: `[a] - [unknown] = [answer]`,
            rendered: `${a} - ___ = ${answer}`
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(b, 3, 0, params.max_value);
    const options = shuffle([b, ...distractors]);

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: b,
        hintTemplate: `[a] - [answer] = [b]`,
        hintRendered: `${a} - ${answer} = ${b}`,
        locale: 'en-GB',
        universal: true,
        module: 'C02_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Missing Minuend
 * Problems like: ? - b = c
 */
function generateMissingMinuend(params, level) {
    const { a, b, answer } = generateSubtraction(
        params.result_range[0],
        params.result_range[1],
        {
            allowZero: params.allow_zero,
            maxMinuend: params.max_value
        }
    );

    const values = { a, b, answer, unknown: a };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTypes = [
        {
            template: `[unknown] - [b] = [answer]`,
            rendered: `? - ${b} = ${answer}`
        },
        {
            template: `[unknown] - [b] = [answer]`,
            rendered: `___ - ${b} = ${answer}`
        },
        {
            template: `What number minus [b] equals [answer]?`,
            rendered: `What number minus ${b} equals ${answer}?`
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(a, 3, 0, params.max_value);
    const options = shuffle([a, ...distractors]);

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: a,
        hintTemplate: `[answer] + [b] = [a]`,
        hintRendered: `${answer} + ${b} = ${a}`,
        locale: 'en-GB',
        universal: true,
        module: 'C02_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Symbol Interpretation
 * Understanding +, -, = symbols
 *
 * IMPORTANT: Excludes cases where multiple symbols work
 * (e.g., "10 ___ 0 = 10" is true for both + and -)
 */
function generateSymbolInterpretation(params, level) {
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        let a, b, answer;
        let attempts = 0;

        do {
            const result = generateAddition(
                params.result_range[0],
                params.result_range[1],
                { allowZero: params.allow_zero }
            );

            a = result.a;
            b = result.b;
            answer = result.answer;

            // CRITICAL: Exclude b=0 because a + 0 = a AND a - 0 = a
            // This would make both + and - correct answers
            if (b === 0) {
                attempts++;
                continue;
            }

            break;
        } while (attempts < 50);

        // If we couldn't find a non-zero case after 50 attempts, try subtraction
        if (b === 0) {
            return generateSymbolInterpretation(params, level);
        }

        const values = { a, b, answer, symbol: '+' };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
            symbol: { type: "string", prefix: "", suffix: "", decimals: 0 }
        };

        const questionTypes = [
            {
                template: `Which symbol goes here: [a] ___ [b] = [answer]?`,
                rendered: `Which symbol goes here: ${a} ___ ${b} = ${answer}?`
            },
            {
                template: `[a] ___ [b] = [answer]. What is the missing symbol?`,
                rendered: `${a} ___ ${b} = ${answer}. What is the missing symbol?`
            }
        ];

        const question = randomChoice(questionTypes);

        return {
            questionTemplate: question.template,
            questionRendered: question.rendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: ['+', '-', '×', '÷'],
            answer: '+',
            hintTemplate: `[a] plus [b] equals [answer]`,
            hintRendered: `${a} plus ${b} equals ${answer}`,
            locale: 'en-GB',
            universal: true,
            module: 'C02_Y1_CALC',
            level: level
        };
    } else {
        let a, b, answer;
        let attempts = 0;

        do {
            const result = generateSubtraction(
                params.result_range[0],
                params.result_range[1],
                {
                    allowZero: params.allow_zero,
                    maxMinuend: params.max_value
                }
            );

            a = result.a;
            b = result.b;
            answer = result.answer;

            // CRITICAL: Exclude b=0 because a - 0 = a AND a + 0 = a
            // This would make both - and + correct answers
            if (b === 0) {
                attempts++;
                continue;
            }

            break;
        } while (attempts < 50);

        // If we couldn't find a non-zero case after 50 attempts, try addition
        if (b === 0) {
            return generateSymbolInterpretation(params, level);
        }

        const values = { a, b, answer, symbol: '-' };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
            symbol: { type: "string", prefix: "", suffix: "", decimals: 0 }
        };

        return {
            questionTemplate: `Which symbol goes here: [a] ___ [b] = [answer]?`,
            questionRendered: `Which symbol goes here: ${a} ___ ${b} = ${answer}?`,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: ['-', '+', '×', '÷'],
            answer: '-',
            hintTemplate: `[a] minus [b] equals [answer]`,
            hintRendered: `${a} minus ${b} equals ${answer}`,
            locale: 'en-GB',
            universal: true,
            module: 'C02_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Equation Completion
 * Complete equations like: 6 + 3 = 4 + ?
 */
function generateEquationCompletion(params, level) {
    const target = randomInt(params.result_range[0], params.result_range[1]);
    const a = randomInt(params.allow_zero ? 0 : 1, target);
    const b = target - a;

    // Create second pair that equals same total
    const c = randomInt(params.allow_zero ? 0 : 1, target);
    const d = target - c;

    const values = { a, b, c, d, target, unknown: d };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        c: { type: "number", prefix: "", suffix: "", decimals: 0 },
        d: { type: "number", prefix: "", suffix: "", decimals: 0 },
        target: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const formats = [
        {
            template: `[a] + [b] = [c] + [unknown]`,
            rendered: `${a} + ${b} = ${c} + ?`
        },
        {
            template: `[a] + [b] = [unknown] + [c]`,
            rendered: `${a} + ${b} = ? + ${c}`
        },
        {
            template: `Complete: [a] + [b] = [unknown] + [c]`,
            rendered: `Complete: ${a} + ${b} = ___ + ${c}`
        }
    ];

    const question = randomChoice(formats);
    const distractors = generateDistractors(d, 3, 0, params.max_value);
    const options = shuffle([d, ...distractors]);

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: d,
        hintTemplate: `Both sides equal [target]`,
        hintRendered: `Both sides equal ${target}`,
        locale: 'en-GB',
        universal: true,
        module: 'C02_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 8: True/False Equations
 * Determine if equations are correct
 */
function generateTrueFalse(params, level) {
    const makeCorrect = randomChoice([true, false]);

    if (makeCorrect) {
        const opType = randomChoice(['addition', 'subtraction']);

        if (opType === 'addition') {
            const { a, b, answer } = generateAddition(
                params.result_range[0],
                params.result_range[1],
                { allowZero: params.allow_zero }
            );

            const values = { a, b, answer, correctAnswer: 'True' };
            const valueMetadata = {
                a: { type: "number", prefix: "", suffix: "", decimals: 0 },
                b: { type: "number", prefix: "", suffix: "", decimals: 0 },
                answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
                correctAnswer: { type: "string", prefix: "", suffix: "", decimals: 0 }
            };

            return {
                questionTemplate: `Is this equation true or false?\n[a] + [b] = [answer]`,
                questionRendered: `Is this equation true or false?\n${a} + ${b} = ${answer}`,
                type: 'multiple_choice',
                values,
                valueMetadata,
                options: ['True', 'False'],
                answer: 'True',
                hintTemplate: `[a] + [b] does equal [answer]`,
                hintRendered: `${a} + ${b} does equal ${answer}`,
                locale: 'en-GB',
                universal: true,
                module: 'C02_Y1_CALC',
                level: level
            };
        } else {
            const { a, b, answer } = generateSubtraction(
                params.result_range[0],
                params.result_range[1],
                {
                    allowZero: params.allow_zero,
                    maxMinuend: params.max_value
                }
            );

            const values = { a, b, answer, correctAnswer: 'True' };
            const valueMetadata = {
                a: { type: "number", prefix: "", suffix: "", decimals: 0 },
                b: { type: "number", prefix: "", suffix: "", decimals: 0 },
                answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
                correctAnswer: { type: "string", prefix: "", suffix: "", decimals: 0 }
            };

            return {
                questionTemplate: `Is this equation true or false?\n[a] - [b] = [answer]`,
                questionRendered: `Is this equation true or false?\n${a} - ${b} = ${answer}`,
                type: 'multiple_choice',
                values,
                valueMetadata,
                options: ['True', 'False'],
                answer: 'True',
                hintTemplate: `[a] - [b] does equal [answer]`,
                hintRendered: `${a} - ${b} does equal ${answer}`,
                locale: 'en-GB',
                universal: true,
                module: 'C02_Y1_CALC',
                level: level
            };
        }
    } else {
        // Make incorrect equation
        const opType = randomChoice(['addition', 'subtraction']);

        if (opType === 'addition') {
            const { a, b, answer } = generateAddition(
                params.result_range[0],
                params.result_range[1],
                { allowZero: params.allow_zero }
            );
            const wrongAnswer = answer + randomChoice([-2, -1, 1, 2]);

            const values = { a, b, answer, wrongAnswer, correctAnswer: 'False' };
            const valueMetadata = {
                a: { type: "number", prefix: "", suffix: "", decimals: 0 },
                b: { type: "number", prefix: "", suffix: "", decimals: 0 },
                answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
                wrongAnswer: { type: "number", prefix: "", suffix: "", decimals: 0 },
                correctAnswer: { type: "string", prefix: "", suffix: "", decimals: 0 }
            };

            return {
                questionTemplate: `Is this equation true or false?\n[a] + [b] = [wrongAnswer]`,
                questionRendered: `Is this equation true or false?\n${a} + ${b} = ${wrongAnswer}`,
                type: 'multiple_choice',
                values,
                valueMetadata,
                options: ['True', 'False'],
                answer: 'False',
                hintTemplate: `[a] + [b] = [answer], not [wrongAnswer]`,
                hintRendered: `${a} + ${b} = ${answer}, not ${wrongAnswer}`,
                locale: 'en-GB',
                universal: true,
                module: 'C02_Y1_CALC',
                level: level
            };
        } else {
            const { a, b, answer } = generateSubtraction(
                params.result_range[0],
                params.result_range[1],
                {
                    allowZero: params.allow_zero,
                    maxMinuend: params.max_value
                }
            );
            const wrongAnswer = Math.max(0, answer + randomChoice([-2, -1, 1, 2]));

            const values = { a, b, answer, wrongAnswer, correctAnswer: 'False' };
            const valueMetadata = {
                a: { type: "number", prefix: "", suffix: "", decimals: 0 },
                b: { type: "number", prefix: "", suffix: "", decimals: 0 },
                answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
                wrongAnswer: { type: "number", prefix: "", suffix: "", decimals: 0 },
                correctAnswer: { type: "string", prefix: "", suffix: "", decimals: 0 }
            };

            return {
                questionTemplate: `Is this equation true or false?\n[a] - [b] = [wrongAnswer]`,
                questionRendered: `Is this equation true or false?\n${a} - ${b} = ${wrongAnswer}`,
                type: 'multiple_choice',
                values,
                valueMetadata,
                options: ['True', 'False'],
                answer: 'False',
                hintTemplate: `[a] - [b] = [answer], not [wrongAnswer]`,
                hintRendered: `${a} - ${b} = ${answer}, not ${wrongAnswer}`,
                locale: 'en-GB',
                universal: true,
                module: 'C02_Y1_CALC',
                level: level
            };
        }
    }
}

/**
 * OPERATION 9: Two-Step Problems
 * Problems like: 5 + ? - 2 = 10
 */
function generateTwoStep(params, level) {
    const finalAnswer = randomInt(params.result_range[0], params.result_range[1]);
    const step2 = randomInt(1, Math.min(5, finalAnswer));
    const intermediate = finalAnswer + step2;
    const step1 = randomInt(1, intermediate);
    const missing = intermediate - step1;

    const values = { step1, step2, finalAnswer, intermediate, missing, unknown: missing };
    const valueMetadata = {
        step1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        step2: { type: "number", prefix: "", suffix: "", decimals: 0 },
        finalAnswer: { type: "number", prefix: "", suffix: "", decimals: 0 },
        intermediate: { type: "number", prefix: "", suffix: "", decimals: 0 },
        missing: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `[step1] + [unknown] - [step2] = [finalAnswer]`,
        questionRendered: `${step1} + ? - ${step2} = ${finalAnswer}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: missing,
        hintTemplate: `First, [step1] + [missing] = [intermediate], then [intermediate] - [step2] = [finalAnswer]`,
        hintRendered: `First, ${step1} + ${missing} = ${intermediate}, then ${intermediate} - ${step2} = ${finalAnswer}`,
        locale: 'en-GB',
        universal: true,
        module: 'C02_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Complex Missing Numbers
 * Open-ended missing number problems
 */
function generateComplexMissing(params, level) {
    const total = randomInt(5, params.max_value);
    const a = randomInt(1, total - 1);
    const b = total - a;

    const values = { total, a, b };
    const valueMetadata = {
        total: { type: "number", prefix: "", suffix: "", decimals: 0 },
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const formats = [
        {
            template: `Find two numbers that add to [total].\n? + ? = [total]\nGive one possible answer for the first number.`,
            rendered: `Find two numbers that add to ${total}.\n? + ? = ${total}\nGive one possible answer for the first number.`,
            answer: a
        },
        {
            template: `[total] can be split into two parts. If one part is [a], what is the other part?`,
            rendered: `${total} can be split into two parts. If one part is ${a}, what is the other part?`,
            answer: b
        }
    ];

    const question = randomChoice(formats);

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'text_input',
        values,
        valueMetadata,
        answer: question.answer,
        hintTemplate: `[a] + [b] = [total]`,
        hintRendered: `${a} + ${b} = ${total}`,
        locale: 'en-GB',
        universal: true,
        module: 'C02_Y1_CALC',
        level: level
    };
}

export default {
    moduleId: 'C02_Y1_CALC',
    generate: generateQuestion
};
