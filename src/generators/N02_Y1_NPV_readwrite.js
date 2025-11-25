/**
 * Year 1 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    applyStep,
    generateUniqueNumbers,
    sortAscending
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral':
            return generateIdentifyNumeral(math, level);
        case 'one_more':
            return generateStepQuestion(math, level, 1, 'more');
        case 'one_less':
            return generateStepQuestion(math, level, 1, 'less');
        case 'numeral_to_word':
            return generateNumeralToWord(math, level);
        case 'word_to_numeral':
            return generateWordToNumeral(math, level);
        case 'compare_two':
            return generateCompareTwo(math, level);
        case 'order_two':
            return generateOrder(math, level, 2);
        case 'order_three':
            return generateOrder(math, level, 3);
        default:
            return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, math.words.min, math.words.max);
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctWord,
        hint: `Read the number and find its word form`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateStepQuestion(math, level, step, direction) {
    let number;

    if (direction === 'more') {
        number = randomInt(math.range.min, math.range.max - step);
    } else {
        number = randomInt(math.range.min + step, math.range.max);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, math.range.min, math.range.max);
    const options = shuffle([answer, ...distractors]);

    const dirWord = direction === 'more' ? 'more' : 'less';

    return {
        text: `What is ${step} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Count up' : 'Count down'} one from ${formatNumber(number)}`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateNumeralToWord(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, math.words.min, math.words.max);
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    return {
        text: `How do you write ${formatNumber(number)} in words?`,
        type: 'multiple_choice',
        options: options,
        answer: correctWord,
        hint: `Say the number out loud`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateWordToNumeral(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const word = numberToWord(number);

    const distractors = generateDistractors(number, 3, math.words.min, math.words.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is "${word}"?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Think about how to write this word as a number`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const numbers = generateUniqueNumbers(2, math.range.min, math.range.max);
    const num1 = numbers[0];
    const num2 = numbers[1];

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const questions = [
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ];

    const q = randomChoice(questions);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: q.answer.toString(),
        hint: `Compare the numbers to see which is ${q.answer === larger ? 'bigger' : 'smaller'}`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);

    return {
        text: `Put these numbers in order from smallest to largest:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: sorted.join(','),
        answers: sorted.map(n => n.toString()),
        hint: `Start with the smallest number`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y1_NPV',
    generate: generateQuestion
};