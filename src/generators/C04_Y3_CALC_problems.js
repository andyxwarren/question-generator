/**
 * Year 3 Problem-Solving Generator
 *
 * Module: C04_Y3_CALC - "Solve problems, including missing number problems, using number facts,
 * place value, and more complex addition and subtraction"
 *
 * This generator extends Year 2 and adds:
 * - Three-digit numbers (to 1000)
 * - Place value emphasis in problems
 * - Number facts integration
 * - More complex missing numbers
 * - Preparation for two-step reasoning (Level 4)
 * - Adaptive question types (L1-2 multiple choice, L3-4 text input)
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateOneStepAddition,
    generateOneStepSubtraction,
    generateMissingAddend,
    generateMissingSubtrahend,
    generateMissingMinuend,
    generateMoneyProblem,
    generateLengthProblem,
    generateMassProblem,
    generateOneStepDistractors
} from './helpers/C04_problemHelpers.js';
import { generateAddition, generateSubtraction } from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'simple_addition_word':
            return generateSimpleAdditionWord(params, level);
        case 'simple_subtraction_word':
            return generateSimpleSubtractionWord(params, level);
        case 'missing_addend':
            return generateMissingAddendQuestion(params, level);
        case 'missing_subtrahend':
            return generateMissingSubtrahendQuestion(params, level);
        case 'missing_minuend':
            return generateMissingMinuendQuestion(params, level);
        case 'place_value_addition':
            return generatePlaceValueAddition(params, level);
        case 'place_value_subtraction':
            return generatePlaceValueSubtraction(params, level);
        case 'number_facts_application':
            return generateNumberFactsApplication(params, level);
        case 'complex_missing_3digit':
            return generateComplexMissing3Digit(params, level);
        case 'multi_part_reasoning':
            return generateMultiPartReasoning(params, level);
        default:
            return generateSimpleAdditionWord(params, level);
    }
}

/**
 * OPERATIONS 1-5: Extend Y2 operations with 3-digit numbers
 */
function generateSimpleAdditionWord(params, level) {
    const problem = generateOneStepAddition(params.number_range[0], params.max_value, params);
    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'addition', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

function generateSimpleSubtractionWord(params, level) {
    const problem = generateOneStepSubtraction(params.number_range[0], params.max_value, params);
    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'subtraction', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

function generateMissingAddendQuestion(params, level) {
    const problem = generateMissingAddend(params.number_range[0], params.max_value, params);
    const useMultipleChoice = params.question_format === 'multiple_choice';
    const fullText = `${problem.text}\n\n${problem.equation}`;

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'missing_addend', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: fullText,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

function generateMissingSubtrahendQuestion(params, level) {
    const problem = generateMissingSubtrahend(params.number_range[0], params.max_value, params);
    const useMultipleChoice = params.question_format === 'multiple_choice';
    const fullText = `${problem.text}\n\n${problem.equation}`;

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'missing_subtrahend', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: fullText,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

function generateMissingMinuendQuestion(params, level) {
    const problem = generateMissingMinuend(params.number_range[0], params.max_value, params);
    const useMultipleChoice = params.question_format === 'multiple_choice';
    const fullText = `${problem.text}\n\n${problem.equation}`;

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(problem.answer, problem.values, 'missing_minuend', params.max_value);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: fullText,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: fullText,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Place Value Addition (NEW in Y3)
 * Focus on adding with place value understanding
 */
function generatePlaceValueAddition(params, level) {
    // Generate a 3-digit number
    const base = randomInt(100, params.max_value - 100);

    // Add a place value component (ones, tens, or hundreds)
    const pvChoice = randomChoice(['ones', 'tens', 'hundreds']);

    let addAmount, text, answer;

    if (pvChoice === 'ones') {
        addAmount = randomInt(1, 9);
        answer = base + addAmount;
        text = `A number is ${base}. I add ${addAmount} to the ones place. What is my new number?`;
    } else if (pvChoice === 'tens') {
        addAmount = randomInt(1, 9) * 10;
        answer = base + addAmount;
        text = `A number is ${base}. I add ${addAmount} to the tens place. What is my new number?`;
    } else {
        addAmount = randomInt(1, 5) * 100;
        answer = base + addAmount;
        text = `A number is ${base}. I add ${addAmount} to the hundreds place. What is my new number?`;
    }

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(answer, { a: base, b: addAmount }, 'addition', params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `${base} + ${addAmount} = ${answer}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${base} + ${addAmount} = ${answer}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Place Value Subtraction (NEW in Y3)
 */
function generatePlaceValueSubtraction(params, level) {
    // Generate a 3-digit number
    const base = randomInt(200, params.max_value);

    // Subtract a place value component
    const pvChoice = randomChoice(['ones', 'tens', 'hundreds']);

    let subtractAmount, text, answer;

    if (pvChoice === 'ones') {
        const ones = base % 10;
        subtractAmount = randomInt(1, Math.min(ones, 9));
        answer = base - subtractAmount;
        text = `A number is ${base}. I subtract ${subtractAmount} from the ones place. What is my new number?`;
    } else if (pvChoice === 'tens') {
        const tens = Math.floor((base % 100) / 10);
        subtractAmount = randomInt(1, Math.min(tens, 5)) * 10;
        answer = base - subtractAmount;
        text = `A number is ${base}. I subtract ${subtractAmount} from the tens place. What is my new number?`;
    } else {
        const hundreds = Math.floor(base / 100);
        subtractAmount = randomInt(1, Math.min(hundreds, 3)) * 100;
        answer = base - subtractAmount;
        text = `A number is ${base}. I subtract ${subtractAmount} from the hundreds place. What is my new number?`;
    }

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(answer, { a: base, b: subtractAmount }, 'subtraction', params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `${base} - ${subtractAmount} = ${answer}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: answer.toString(),
            hint: `${base} - ${subtractAmount} = ${answer}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 8: Number Facts Application (Level 2+)
 * Using known facts to solve problems
 */
function generateNumberFactsApplication(params, level) {
    // Use a simple known fact and extend it
    const baseFact = randomChoice([
        { a: 3, b: 7, sum: 10 },
        { a: 5, b: 5, sum: 10 },
        { a: 8, b: 2, sum: 10 },
        { a: 6, b: 4, sum: 10 }
    ]);

    // Scale up the fact
    const multiplier = randomChoice([10, 100]);
    const a = baseFact.a * multiplier;
    const b = baseFact.b * multiplier;
    const sum = baseFact.sum * multiplier;

    const text = `If ${baseFact.a} + ${baseFact.b} = ${baseFact.sum}, what is ${a} + ${b}?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(sum, { a, b }, 'addition', params.max_value);
        const options = shuffle([sum, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: sum.toString(),
            hint: `${a} + ${b} = ${sum}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: sum.toString(),
            hint: `${a} + ${b} = ${sum}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 9: Complex Missing 3-Digit (Level 3+)
 * More challenging missing number problems with 3-digit numbers
 */
function generateComplexMissing3Digit(params, level) {
    const { a, b, answer } = generateAddition(params.number_range[0], params.max_value);

    const text = `A shop has some items. ${a} more items are delivered. Now the shop has ${answer} items. How many items did the shop have at the start?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(b, { a, b, answer }, 'complex_missing', params.max_value);
        const options = shuffle([b, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: b.toString(),
            hint: `${answer} - ${a} = ${b}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: b.toString(),
            hint: `${answer} - ${a} = ${b}`,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 10: Multi-Part Reasoning (Level 4 only)
 * Preparation for two-step problems - requires thinking about sequence
 */
function generateMultiPartReasoning(params, level) {
    // This is still a one-step problem, but requires more inference
    const { a, b, answer } = generateAddition(params.number_range[0], params.max_value);

    const scenarios = [
        {
            text: `A library has ${a} books. Some more books arrive. Now there are ${answer} books. The new books are put on shelves. How many new books arrived?`,
            answer: b,
            hint: `${answer} - ${a} = ${b}`
        },
        {
            text: `Emma has ${a} stickers. After getting more stickers from her friend, she counts ${answer} stickers in total. How many stickers did her friend give her?`,
            answer: b,
            hint: `${answer} - ${a} = ${b}`
        }
    ];

    const scenario = randomChoice(scenarios);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateOneStepDistractors(scenario.answer, { a, b, answer }, 'multi_part', params.max_value);
        const options = shuffle([scenario.answer, ...distractors]);

        return {
            text: scenario.text,
            type: 'multiple_choice',
            options: options,
            answer: scenario.answer.toString(),
            hint: scenario.hint,
            module: 'C04_Y3_CALC',
            level: level
        };
    } else {
        return {
            text: scenario.text,
            type: 'text_input',
            answer: scenario.answer.toString(),
            hint: scenario.hint,
            module: 'C04_Y3_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C04_Y3_CALC',
    generate: generateQuestion
};
