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
} from './helpers/calculationHelpers.js';

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

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const context = getAdditionContext(a, b, answer);
        return {
            text: context.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} + ${b} = ${answer}`,
            module: 'C02_Y1_CALC',
            level: level
        };
    } else {
        // Equation style
        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `${a} + ${b} = ?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Add ${a} and ${b}`,
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

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const context = getSubtractionContext(a, b, answer);
        return {
            text: context.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${a} - ${b} = ${answer}`,
            module: 'C02_Y1_CALC',
            level: level
        };
    } else {
        // Equation style
        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `${a} - ${b} = ?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Subtract ${b} from ${a}`,
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

    const questionTypes = [
        {
            text: `${a} + ? = ${answer}`,
            answer: b
        },
        {
            text: `What number do you add to ${a} to make ${answer}?`,
            answer: b
        },
        {
            text: `${a} + ___ = ${answer}`,
            answer: b
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(question.answer, 3, 0, params.max_value);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `${answer} - ${a} = ${b}`,
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

    const questionTypes = [
        {
            text: `${a} - ? = ${answer}`,
            answer: b
        },
        {
            text: `What number do you subtract from ${a} to get ${answer}?`,
            answer: b
        },
        {
            text: `${a} - ___ = ${answer}`,
            answer: b
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(question.answer, 3, 0, params.max_value);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `${a} - ${answer} = ${b}`,
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

    const questionTypes = [
        {
            text: `? - ${b} = ${answer}`,
            answer: a
        },
        {
            text: `___ - ${b} = ${answer}`,
            answer: a
        },
        {
            text: `What number subtract ${b} equals ${answer}?`,
            answer: a
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(question.answer, 3, 0, params.max_value);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `${answer} + ${b} = ${a}`,
        module: 'C02_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Symbol Interpretation
 * Understanding +, -, = symbols
 */
function generateSymbolInterpretation(params, level) {
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        const { a, b, answer } = generateAddition(
            params.result_range[0],
            params.result_range[1],
            { allowZero: params.allow_zero }
        );

        const questionTypes = [
            {
                text: `Which symbol goes here: ${a} ___ ${b} = ${answer}?`,
                answer: '+',
                options: ['+', '-', '×', '÷']
            },
            {
                text: `${a} ___ ${b} = ${answer}. What is the missing symbol?`,
                answer: '+',
                options: ['+', '-', '×', '÷']
            }
        ];

        const question = randomChoice(questionTypes);

        return {
            text: question.text,
            type: 'multiple_choice',
            options: question.options,
            answer: question.answer,
            hint: `${a} plus ${b} equals ${answer}`,
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

        return {
            text: `Which symbol goes here: ${a} ___ ${b} = ${answer}?`,
            type: 'multiple_choice',
            options: ['-', '+', '×', '÷'],
            answer: '-',
            hint: `${a} minus ${b} equals ${answer}`,
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

    const formats = [
        {
            text: `${a} + ${b} = ${c} + ?`,
            answer: d
        },
        {
            text: `${a} + ${b} = ? + ${c}`,
            answer: d
        },
        {
            text: `Complete: ${a} + ${b} = ___ + ${c}`,
            answer: d
        }
    ];

    const question = randomChoice(formats);
    const distractors = generateDistractors(question.answer, 3, 0, params.max_value);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `Both sides equal ${target}`,
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

            return {
                text: `Is this equation true or false?\n${a} + ${b} = ${answer}`,
                type: 'multiple_choice',
                options: ['True', 'False'],
                answer: 'True',
                hint: `${a} + ${b} does equal ${answer}`,
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

            return {
                text: `Is this equation true or false?\n${a} - ${b} = ${answer}`,
                type: 'multiple_choice',
                options: ['True', 'False'],
                answer: 'True',
                hint: `${a} - ${b} does equal ${answer}`,
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

            return {
                text: `Is this equation true or false?\n${a} + ${b} = ${wrongAnswer}`,
                type: 'multiple_choice',
                options: ['True', 'False'],
                answer: 'False',
                hint: `${a} + ${b} = ${answer}, not ${wrongAnswer}`,
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

            return {
                text: `Is this equation true or false?\n${a} - ${b} = ${wrongAnswer}`,
                type: 'multiple_choice',
                options: ['True', 'False'],
                answer: 'False',
                hint: `${a} - ${b} = ${answer}, not ${wrongAnswer}`,
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

    return {
        text: `${step1} + ? - ${step2} = ${finalAnswer}`,
        type: 'text_input',
        answer: missing.toString(),
        hint: `First, ${step1} + ${missing} = ${intermediate}, then ${intermediate} - ${step2} = ${finalAnswer}`,
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

    const formats = [
        {
            text: `Find two numbers that add to ${total}.\n? + ? = ${total}\nGive one possible answer for the first number.`,
            validAnswers: Array.from({length: total}, (_, i) => i),
            answer: a.toString()
        },
        {
            text: `${total} can be split into two parts. If one part is ${a}, what is the other part?`,
            answer: b.toString()
        }
    ];

    const question = randomChoice(formats);

    return {
        text: question.text,
        type: 'text_input',
        answer: question.answer,
        hint: `${a} + ${b} = ${total}`,
        module: 'C02_Y1_CALC',
        level: level
    };
}

export default {
    moduleId: 'C02_Y1_CALC',
    generate: generateQuestion
};
