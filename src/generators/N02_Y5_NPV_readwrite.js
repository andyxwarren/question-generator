/**
 * Year 5 Read/Write/Order/Compare Numbers Generator
 *
 * Module: N02_Y5_NPV - "Read, write, order and compare numbers to at least 1,000,000 and determine the value of each digit"
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

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'identify_numeral':
            return generateIdentifyNumeral(params, level);
        case 'thousand_more':
            return generateStepQuestion(params, level, 1000, 'more');
        case 'thousand_less':
            return generateStepQuestion(params, level, 1000, 'less');
        case 'ten_thousand_more':
            return generateStepQuestion(params, level, 10000, 'more');
        case 'ten_thousand_less':
            return generateStepQuestion(params, level, 10000, 'less');
        case 'hundred_thousand_more':
            return generateStepQuestion(params, level, 100000, 'more');
        case 'hundred_thousand_less':
            return generateStepQuestion(params, level, 100000, 'less');
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
        case 'order_five':
            return generateOrder(params, level, 5);
        case 'order_six':
            return generateOrder(params, level, 6);
        case 'complete_statement':
            return generateCompleteStatement(params, level);
        case 'true_false':
            return generateTrueFalse(params, level);
        case 'between':
            return generateBetween(params, level);
        case 'place_value_comparison':
            return generatePlaceValueComparison(params, level);
        case 'place_value_digit':
            return generatePlaceValueDigit(params, level);
        case 'round_to_thousand':
            return generateRounding(params, level, 1000);
        case 'round_to_ten_thousand':
            return generateRounding(params, level, 10000);
        case 'round_to_hundred_thousand':
            return generateRounding(params, level, 100000);
        case 'complex_more_less':
            return generateComplexMoreLess(params, level);
        default:
            return generateIdentifyNumeral(params, level);
    }
}

function generateIdentifyNumeral(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
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
        text: `What is ${formatNumber(step)} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${formatNumber(step)}`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateCompareTwo(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

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
        hint: `Compare place values from left to right`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateUseSymbols(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    let num2 = randomInt(params.min_value, params.max_value);

    if (Math.random() < 0.1) {
        num2 = num1;
    }

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
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateCompleteStatement(params, level) {
    const num1 = randomInt(params.min_value, params.max_value - 20000);
    // Ensure even difference for whole number midpoint
    const difference = Math.floor(randomInt(2500, 10000)) * 2; // 5000, 5002, ..., 19998, 20000
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
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateBetween(params, level) {
    const num1 = randomInt(params.min_value, params.max_value - 10000);
    const num2 = num1 + randomInt(5000, 20000);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },  // Accept any value in range
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generatePlaceValueComparison(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

    if (num1 === num2) {
        return generatePlaceValueComparison(params, level);
    }

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

function generatePlaceValueDigit(params, level) {
    const number = randomInt(params.min_value, params.max_value);
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

function generateRounding(params, level, base) {
    const number = generateNonMultiple(params.min_value + base, params.max_value - base, base);
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

function generateComplexMoreLess(params, level) {
    const number = randomInt(params.min_value + 150000, params.max_value - 150000);
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
