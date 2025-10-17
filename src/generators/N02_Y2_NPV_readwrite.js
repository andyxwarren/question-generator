/**
 * Year 2 Read/Write/Order/Compare Numbers Generator
 *
 * Module: N02_Y2_NPV - "Read and write numbers to at least 100 in numerals and in words"
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    getComparisonSymbol,
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
        case 'use_symbols':
            return generateUseSymbols(params, level);
        case 'order_two':
            return generateOrder(params, level, 2);
        case 'order_three':
            return generateOrder(params, level, 3);
        case 'order_four':
            return generateOrder(params, level, 4);
        case 'complete_statement':
            return generateCompleteStatement(params, level);
        case 'true_false':
            return generateTrueFalse(params, level);
        case 'between':
            return generateBetween(params, level);
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
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * Step question (one more/less)
 */
function generateStepQuestion(params, level, step, direction) {
    let number;

    if (direction === 'more') {
        number = randomInt(params.min_value, params.max_value - step);
    } else {
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
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${step}`,
        module: 'N02_Y2_NPV',
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
        module: 'N02_Y2_NPV',
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
        hint: `Think about the digits`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * Compare two numbers
 */
function generateCompareTwo(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

    // Ensure they're different
    if (num1 === num2) {
        return generateCompareTwo(params, level);
    }

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
        hint: `Compare the digits`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * Use comparison symbols (<, >, =)
 */
function generateUseSymbols(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    let num2 = randomInt(params.min_value, params.max_value);

    // Occasionally make them equal
    if (Math.random() < 0.2) {
        num2 = num1;
    }

    const symbol = getComparisonSymbol(num1, num2);

    return {
        text: `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['<', '>', '='],
        answer: symbol,
        hint: `Think about which number is bigger`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * Order numbers
 */
function generateOrder(params, level, count) {
    const numbers = generateUniqueNumbers(count, params.min_value, params.max_value);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);

    const direction = randomChoice(['ascending', 'descending']);
    const answer = direction === 'ascending' ? sorted : sorted.reverse();

    return {
        text: `Order these numbers from ${direction === 'ascending' ? 'smallest to largest' : 'largest to smallest'}:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: answer.join(','),
        answers: answer.map(n => n.toString()),
        hint: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * Complete statement (find midpoint between two numbers)
 */
function generateCompleteStatement(params, level) {
    const num1 = randomInt(params.min_value, params.max_value - 10);
    // Ensure even difference for whole number midpoint
    const difference = randomInt(3, 5) * 2; // 6, 8, or 10
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    return {
        text: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        answer: midpoint.toString(),
        hint: `Find the number in the middle`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * True/False comparison
 */
function generateTrueFalse(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

    const symbol = randomChoice(['<', '>', '=']);
    const correctSymbol = getComparisonSymbol(num1, num2);
    const isTrue = symbol === correctSymbol;

    return {
        text: `Is this statement true or false?\n${formatNumber(num1)} ${symbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: isTrue ? 'True' : 'False',
        hint: `Check if the symbol is correct`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * Find number between two others
 */
function generateBetween(params, level) {
    const num1 = randomInt(params.min_value, params.max_value - 4);
    const num2 = num1 + randomInt(3, 10);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },  // Accept any value in range
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'N02_Y2_NPV',
    generate: generateQuestion
};
