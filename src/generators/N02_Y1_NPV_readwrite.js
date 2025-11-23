/**
 * Year 1 Read/Write/Order/Compare Numbers Generator
 *
 * Module: N02_Y1_NPV - "Count, read and write numbers to 100 in numerals;
 *                       given a number, identify one more and one less;
 *                       read and write numbers from 1 to 20 in numerals and words"
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

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'identify_numeral':
            return generateIdentifyNumeral(params, level);
        case 'one_more':
            return generateStepQuestion(params, level, 1, 'more');
        case 'one_less':
            return generateStepQuestion(params, level, 1, 'less');
        case 'numeral_to_word':
            return generateNumeralToWord(params, level);
        case 'word_to_numeral':
            return generateWordToNumeral(params, level);
        case 'compare_two':
            return generateCompareTwo(params, level);
        case 'order_two':
            return generateOrder(params, level, 2);
        case 'order_three':
            return generateOrder(params, level, 3);
        default:
            return generateIdentifyNumeral(params, level);
    }
}

/**
 * Identify numeral question
 * Shows a numeral and asks student to identify it from word-based options
 */
function generateIdentifyNumeral(params, level) {
    // Generate within word range to ensure we can convert to words
    const number = randomInt(params.word_min, params.word_max);
    const correctWord = numberToWord(number);

    // Generate distractor words
    const distractorNumbers = generateDistractors(number, 3, params.word_min, params.word_max);
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

/**
 * Step question (one more/less)
 * Avoids boundary issues by limiting number range
 */
function generateStepQuestion(params, level, step, direction) {
    let number;

    if (direction === 'more') {
        // Ensure we don't ask "one more than max_value"
        number = randomInt(params.min_value, params.max_value - step);
    } else {
        // Ensure we don't ask "one less than min_value"
        number = randomInt(params.min_value + step, params.max_value);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
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

/**
 * Numeral to word conversion
 */
function generateNumeralToWord(params, level) {
    const number = randomInt(params.word_min, params.word_max);
    const correctWord = numberToWord(number);

    // Generate distractor words
    const distractorNumbers = generateDistractors(number, 3, params.word_min, params.word_max);
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

/**
 * Word to numeral conversion
 */
function generateWordToNumeral(params, level) {
    const number = randomInt(params.word_min, params.word_max);
    const word = numberToWord(number);

    const distractors = generateDistractors(number, 3, params.word_min, params.word_max);
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

/**
 * Compare two numbers
 */
function generateCompareTwo(params, level) {
    const numbers = generateUniqueNumbers(2, params.min_value, params.max_value);
    const num1 = numbers[0];
    const num2 = numbers[1];

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const questions = [
        {
            text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
            answer: larger
        },
        {
            text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
            answer: smaller
        }
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

/**
 * Order numbers (smallest to largest)
 */
function generateOrder(params, level, count) {
    const numbers = generateUniqueNumbers(count, params.min_value, params.max_value);
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

/**
 * Export generator
 */
export default {
    moduleId: 'N02_Y1_NPV',
    generate: generateQuestion
};
