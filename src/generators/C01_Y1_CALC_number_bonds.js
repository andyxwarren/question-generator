/**
 * Year 1 Number Bonds Question Generator
 *
 * Module: C01_Y1_CALC - "Represent and use number bonds and related subtraction facts within 20"
 *
 * Operations:
 * 1. Bonds to target number (5, 10, 15, 20)
 * 2. Missing addend problems
 * 3. Related subtraction facts
 * 4. Fact families (addition and subtraction)
 * 5. Inverse checking
 */

import {
    generateAddition,
    generateSubtraction,
    generateMissingAddend,
    getRandomName,
    getRandomItem,
    generateInverseFact
} from './helpers/calculationHelpers.js';

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'bonds_to_target':
            return generateBondsToTarget(params, level);
        case 'missing_addend':
            return generateMissingAddendQuestion(params, level);
        case 'related_subtraction':
            return generateRelatedSubtraction(params, level);
        case 'fact_families':
            return generateFactFamilies(params, level);
        case 'inverse_check':
            return generateInverseCheck(params, level);
        case 'multi_step':
            return generateMultiStepBonds(params, level);
        default:
            return generateBondsToTarget(params, level);
    }
}

/**
 * OPERATION 1: Bonds to Target Number
 * Find pairs that make 5, 10, 15, or 20
 */
function generateBondsToTarget(params, level) {
    const target = randomChoice(params.target_numbers);
    const a = randomInt(0, target);
    const b = target - a;

    const questionTypes = [
        {
            text: `What number do you add to ${a} to make ${target}?`,
            answer: b
        },
        {
            text: `${a} + ___ = ${target}. What is the missing number?`,
            answer: b
        },
        {
            text: `Which number completes this number bond?\n${a} + ___ = ${target}`,
            answer: b
        }
    ];

    const question = randomChoice(questionTypes);
    const context = randomChoice(params.contexts);

    if (context === 'varied' || context === 'mixed') {
        const name = getRandomName();
        const item = getRandomItem();
        question.text = `${name} has ${a} ${item}. How many more ${item} does ${name} need to have ${target} ${item} altogether?`;
    }

    const distractors = generateDistractors(question.answer, 3, 0, target);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `Think: ${a} + ? = ${target}`,
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Missing Addend Problems
 * Find the unknown in addition equations
 */
function generateMissingAddendQuestion(params, level) {
    const { a, b, answer } = generateAddition(0, params.max_value);
    const position = randomChoice(['first', 'second', 'result']);

    let text, correctAnswer;

    if (position === 'first') {
        text = `___ + ${b} = ${answer}`;
        correctAnswer = a;
    } else if (position === 'second') {
        text = `${a} + ___ = ${answer}`;
        correctAnswer = b;
    } else {
        text = `${a} + ${b} = ___`;
        correctAnswer = answer;
    }

    const questionText = `What is the missing number?\n${text}`;
    const distractors = generateDistractors(correctAnswer, 3, 0, params.max_value);
    const options = shuffle([correctAnswer, ...distractors]);

    return {
        text: questionText,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer.toString(),
        hint: position === 'result' ? 'Add the two numbers' : 'Use the inverse: subtraction',
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Related Subtraction Facts
 * Use bond knowledge to solve subtraction
 */
function generateRelatedSubtraction(params, level) {
    const { a, b, answer } = generateSubtraction(0, params.max_value);

    const questionTypes = [
        {
            text: `${a} - ${b} = ___`,
            type: 'calculation'
        },
        {
            text: `What is ${b} less than ${a}?`,
            type: 'language'
        },
        {
            text: `If you have ${a} and take away ${b}, how many are left?`,
            type: 'word_problem'
        }
    ];

    let question = randomChoice(questionTypes);
    const context = randomChoice(params.contexts);

    if (context === 'varied' || context === 'mixed') {
        const name = getRandomName();
        const item = getRandomItem();
        question = {
            text: `${name} has ${a} ${item}. ${name} gives away ${b} ${item}. How many ${item} does ${name} have left?`,
            type: 'word_problem'
        };
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Think: ${a} - ${b}`,
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Fact Families
 * Recognize related addition and subtraction facts
 */
function generateFactFamilies(params, level) {
    const { a, b, answer } = generateAddition(0, params.max_value);

    // Fact family: a + b = answer, b + a = answer, answer - a = b, answer - b = a
    const facts = [
        `${a} + ${b} = ${answer}`,
        `${b} + ${a} = ${answer}`,
        `${answer} - ${a} = ${b}`,
        `${answer} - ${b} = ${a}`
    ];

    const questionTypes = [
        {
            text: `Which fact belongs to the same fact family as ${a} + ${b} = ${answer}?`,
            correctFacts: facts.filter(f => f !== `${a} + ${b} = ${answer}`)
        },
        {
            text: `If ${a} + ${b} = ${answer}, which subtraction fact is also true?`,
            correctFacts: [`${answer} - ${a} = ${b}`, `${answer} - ${b} = ${a}`]
        }
    ];

    const question = randomChoice(questionTypes);
    const correctAnswer = randomChoice(question.correctFacts);

    // Generate a wrong fact using different numbers
    const wrongNum = randomInt(1, params.max_value);
    const wrongFacts = [
        `${wrongNum} + ${b} = ${wrongNum + b}`,
        `${a} + ${wrongNum} = ${a + wrongNum}`,
        `${answer} - ${wrongNum} = ${answer - wrongNum}`
    ];

    const options = shuffle([correctAnswer, ...wrongFacts.slice(0, 3)]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Think about the same numbers in different positions',
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Inverse Check
 * Use inverse operations to check calculations
 */
function generateInverseCheck(params, level) {
    const { a, b, answer } = generateAddition(0, params.max_value);

    const questionTypes = [
        {
            text: `To check if ${a} + ${b} = ${answer} is correct, which calculation could you do?`,
            correctAnswer: `${answer} - ${b} = ${a}`,
            type: 'check_addition'
        },
        {
            text: `${getRandomName()} calculated ${answer} - ${b} = ${a}. How can they check this is correct?`,
            correctAnswer: `${a} + ${b} = ${answer}`,
            type: 'check_subtraction'
        }
    ];

    const question = randomChoice(questionTypes);

    // Generate plausible distractors
    const distractors = [
        `${a} + ${answer} = ${a + answer}`,
        `${b} + ${answer} = ${b + answer}`,
        `${answer} + ${b} = ${answer + b}`
    ];

    const options = shuffle([question.correctAnswer, ...distractors.slice(0, 3)]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.correctAnswer,
        hint: 'Use the inverse operation',
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Multi-Step Bonds
 * Combine bond knowledge in multi-step problems
 */
function generateMultiStepBonds(params, level) {
    const target = randomChoice(params.target_numbers);
    const a = randomInt(1, Math.floor(target / 2));
    const b = target - a;
    const extra = randomInt(1, 5);
    const finalAnswer = target + extra;

    const name1 = getRandomName();
    const name2 = getRandomName();
    const item = getRandomItem();

    const templates = [
        {
            text: `${name1} has ${a} ${item}. ${name2} has ${b} ${item}. Together they have ${target} ${item}. Then ${name1} finds ${extra} more ${item}. How many ${item} do they have now?`,
            answer: finalAnswer
        },
        {
            text: `Two numbers add up to ${target}. One number is ${a}. The other number is increased by ${extra}. What is the new total?`,
            answer: finalAnswer
        }
    ];

    const question = randomChoice(templates);
    const distractors = generateDistractors(question.answer, 3, 0, params.max_value);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `First find the bond to ${target}, then add ${extra}`,
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C01_Y1_CALC',
    generate: generateQuestion
};
