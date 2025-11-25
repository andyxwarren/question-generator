/**
 * Year 5 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    generateUniqueNumbers,
    sortAscending,
    getPlaceValue,
    roundToNearest,
    generateNonMultiple
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral': return generateIdentifyNumeral(math, level);
        case 'thousand_more': return generateStepQuestion(math, level, 1000, 'more');
        case 'thousand_less': return generateStepQuestion(math, level, 1000, 'less');
        case 'ten_thousand_more': return generateStepQuestion(math, level, 10000, 'more');
        case 'ten_thousand_less': return generateStepQuestion(math, level, 10000, 'less');
        case 'hundred_thousand_more': return generateStepQuestion(math, level, 100000, 'more');
        case 'hundred_thousand_less': return generateStepQuestion(math, level, 100000, 'less');
        case 'compare_two': return generateCompareTwo(math, level);
        case 'use_symbols': return generateUseSymbols(math, level);
        case 'order_two': return generateOrder(math, level, 2);
        case 'order_three': return generateOrder(math, level, 3);
        case 'order_four': return generateOrder(math, level, 4);
        case 'order_five': return generateOrder(math, level, 5);
        case 'order_six': return generateOrder(math, level, 6);
        case 'complete_statement': return generateCompleteStatement(math, level);
        case 'true_false': return generateTrueFalse(math, level);
        case 'between': return generateBetween(math, level);
        case 'place_value_comparison': return generatePlaceValueComparison(math, level);
        case 'place_value_digit': return generatePlaceValueDigit(math, level);
        case 'round_to_thousand': return generateRounding(math, level, 1000);
        case 'round_to_ten_thousand': return generateRounding(math, level, 10000);
        case 'round_to_hundred_thousand': return generateRounding(math, level, 100000);
        case 'complex_more_less': return generateComplexMoreLess(math, level);
        default: return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const distractors = generateDistractors(number, 3, math.range.min, math.range.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Read the place values carefully`,
        module: 'N02_Y5_NPV',
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
        text: `What is ${formatNumber(step)} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${formatNumber(step)}`,
        module: 'N02_Y5_NPV',
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
        hint: `Compare place values from left to right`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateUseSymbols(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    let num2 = randomInt(math.range.min, math.range.max);

    if (Math.random() < 0.1) num2 = num1;

    const symbol = getComparisonSymbol(num1, num2);

    return {
        text: `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['<', '>', '='],
        answer: symbol,
        hint: `Compare the place values`,
        module: 'N02_Y5_NPV',
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
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateCompleteStatement(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 20000);
    const difference = Math.floor(randomInt(2500, 10000)) * 2;
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    return {
        text: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        answer: midpoint.toString(),
        hint: `Find the number in the middle`,
        module: 'N02_Y5_NPV',
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
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateBetween(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 10000);
    const num2 = num1 + randomInt(5000, 20000);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generatePlaceValueComparison(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generatePlaceValueComparison(math, level);

    const place = randomChoice(['hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones']);
    const val1 = getPlaceValue(num1, place);
    const val2 = getPlaceValue(num2, place);

    return {
        text: `In ${formatNumber(num1)}, the ${place} digit represents ${formatNumber(val1)}.\nIn ${formatNumber(num2)}, what does the ${place} digit represent?`,
        type: 'text_input',
        answer: val2.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generatePlaceValueDigit(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const place = randomChoice(['hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones']);
    const value = getPlaceValue(number, place);

    return {
        text: `In the number ${formatNumber(number)}, what is the value of the ${place} digit?`,
        type: 'text_input',
        answer: value.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateRounding(math, level, base) {
    const number = generateNonMultiple(math.range.min + base, math.range.max - base, base);
    const rounded = roundToNearest(number, base);

    const distractors = [
        roundToNearest(number + base, base),
        roundToNearest(number - base, base),
        number
    ].filter(d => d !== rounded);

    const options = shuffle([rounded, ...distractors.slice(0, 3)]);
    const baseName = base === 1000 ? 'nearest thousand' : base === 10000 ? 'nearest ten thousand' : 'nearest hundred thousand';

    return {
        text: `Round ${formatNumber(number)} to the ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Look at the digit to the right of the place you're rounding to`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateComplexMoreLess(math, level) {
    const number = randomInt(math.range.min + 150000, math.range.max - 150000);
    const step1 = randomChoice([10000, 100000]);
    const step2 = randomChoice([10000, 100000]);
    const dir1 = randomChoice(['more', 'less']);
    const dir2 = randomChoice(['more', 'less']);

    let result = applyStep(number, step1, dir1);
    result = applyStep(result, step2, dir2);

    return {
        text: `Start with ${formatNumber(number)}. What is ${formatNumber(step1)} ${dir1}, then ${formatNumber(step2)} ${dir2}?`,
        type: 'text_input',
        answer: result.toString(),
        hint: `Do one step at a time`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y5_NPV',
    generate: generateQuestion
};