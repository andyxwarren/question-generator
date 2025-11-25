/**
 * Year 2 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
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

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral': return generateIdentifyNumeral(math, level);
        case 'one_more': return generateStepQuestion(math, level, 1, 'more');
        case 'one_less': return generateStepQuestion(math, level, 1, 'less');
        case 'numeral_to_word': return generateNumeralToWord(math, level);
        case 'word_to_numeral': return generateWordToNumeral(math, level);
        case 'compare_two': return generateCompareTwo(math, level);
        case 'use_symbols': return generateUseSymbols(math, level);
        case 'order_two': return generateOrder(math, level, 2);
        case 'order_three': return generateOrder(math, level, 3);
        case 'order_four': return generateOrder(math, level, 4);
        case 'complete_statement': return generateCompleteStatement(math, level);
        case 'true_false': return generateTrueFalse(math, level);
        case 'between': return generateBetween(math, level);
        default: return generateIdentifyNumeral(math, level);
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
        module: 'N02_Y2_NPV',
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
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${step}`,
        module: 'N02_Y2_NPV',
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
        module: 'N02_Y2_NPV',
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
        hint: `Think about the digits`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generateCompareTwo(math, level);

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const q = randomChoice([
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ]);

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

function generateUseSymbols(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    let num2 = randomInt(math.range.min, math.range.max);

    if (Math.random() < 0.2) num2 = num1;

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

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
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

function generateCompleteStatement(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 10);
    const difference = randomInt(3, 5) * 2; // Even number
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

function generateTrueFalse(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);
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

function generateBetween(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 4);
    const num2 = num1 + randomInt(3, 10);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y2_NPV',
    generate: generateQuestion
};