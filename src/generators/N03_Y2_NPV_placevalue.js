/**
 * Year 2 Place Value Question Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    getExpandedForm,
    getAlternativeDecomposition,
    generateNumberWithZero,
    generateDistractors
} from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    // Helper function to create flat params for helpers
    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        places: math.placeValue.places,
        include_zero: math.placeValue.includeZero
    });

    switch(operation) {
        case 'identify_digit': return generateIdentifyDigit(getFlatParams(), level);
        case 'identify_place_value': return generateIdentifyPlaceValue(getFlatParams(), level);
        case 'compare_place_values': return generateComparePlaceValues(getFlatParams(), level);
        case 'compose_simple': return generateComposeSimple(getFlatParams(), level);
        case 'decompose_simple': return generateDecomposeSimple(getFlatParams(), level);
        case 'digit_value': return generateDigitValue(getFlatParams(), level);
        case 'zero_value': return generateZeroValue(getFlatParams(), level);
        case 'expanded_form': return generateExpandedForm(getFlatParams(), level);
        case 'standard_from_expanded': return generateStandardFromExpanded(getFlatParams(), level);
        case 'place_comparison': return generatePlaceComparison(getFlatParams(), level);
        case 'alternative_decomposition': return generateAlternativeDecomposition(getFlatParams(), level);
        case 'multiple_representations': return generateMultipleRepresentations(getFlatParams(), level);
        default: return generateIdentifyDigit(getFlatParams(), level);
    }
}

// Note: The generator functions below have been kept compatible with the helpers
// by passing a flattened structure constructed in the switch above.
// This is a common migration pattern to avoid rewriting all logic at once.

function generateIdentifyDigit(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const correctDigit = getDigitAtPlace(number, place);

    const distractors = new Set();
    params.places.forEach(p => {
        const digit = getDigitAtPlace(number, p);
        if (digit !== correctDigit) {
            distractors.add(digit);
        }
    });

    while (distractors.size < 3) {
        const randomDigit = randomInt(0, 9);
        if (randomDigit !== correctDigit) {
            distractors.add(randomDigit);
        }
    }

    const options = shuffle([correctDigit, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `What digit is in the ${place} place in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctDigit.toString(),
        hint: `Look at the ${place} position`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateIdentifyPlaceValue(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) return generateIdentifyPlaceValue(params, level);

    const correctValue = getPlaceValue(number, place);
    const distractors = new Set([digit]);

    params.places.forEach(p => {
        const value = getPlaceValue(number, p);
        if (value !== correctValue && value > 0) {
            distractors.add(value);
        }
    });

    distractors.add(digit * 100);
    while (distractors.size < 3) distractors.add(randomInt(1, 90));

    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what is the value of the ${digit}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctValue.toString(),
        hint: `The ${digit} is in the ${place} place`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateComparePlaceValues(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    let validNumber = false;
    let num = number;

    while (!validNumber) {
        const tensDigit = getDigitAtPlace(num, 'tens');
        const onesDigit = getDigitAtPlace(num, 'ones');
        if (tensDigit > 0 && onesDigit > 0) validNumber = true;
        else num = randomInt(params.min_value, params.max_value);
    }

    const tensDigit = getDigitAtPlace(num, 'tens');
    const onesDigit = getDigitAtPlace(num, 'ones');

    return {
        text: `In ${formatNumber(num)}, which digit represents a greater value: ${tensDigit} or ${onesDigit}?`,
        type: 'multiple_choice',
        options: [tensDigit, onesDigit],
        answer: tensDigit.toString(),
        hint: `Think about place value - tens or ones?`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const tens = (decomp['tens'] || 0) / 10;
    const ones = decomp['ones'] || 0;

    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${tens} tens and ${ones} ones?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `${tens} tens = ${tens * 10}, then add ${ones} ones`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const tens = (decomp['tens'] || 0) / 10;
    const ones = decomp['ones'] || 0;

    return {
        text: `How many tens and ones are in ${formatNumber(number)}?\nEnter your answer as: [tens],[ones]`,
        type: 'text_input',
        answer: `${tens},${ones}`,
        answers: [tens, ones],
        hint: `Count the tens, then the ones`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateDigitValue(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) return generateDigitValue(params, level);

    const value = getPlaceValue(number, place);
    const distractors = new Set([digit, digit * 100]);
    while (distractors.size < 3) distractors.add(randomInt(1, 90));

    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Look at which place the ${digit} is in`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateZeroValue(params, level) {
    if (!params.include_zero) return generateIdentifyDigit(params, level);
    
    const number = generateNumberWithZero(params.min_value, params.max_value, true);
    if (!String(number).includes('0')) return generateZeroValue(params, level);

    return {
        text: `What is the value of the 0 in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: [0, 1, 10, number],
        answer: '0',
        hint: `Zero means there is nothing in that place`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);

    return {
        text: `Write ${formatNumber(number)} in expanded form (e.g., "30 + 5")`,
        type: 'text_input',
        answer: expanded,
        hint: `Break the number into tens and ones`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateStandardFromExpanded(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What is ${expanded} in standard form?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Add the parts together`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generatePlaceComparison(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generatePlaceComparison(params, level);

    const place = randomChoice(params.places);
    const value1 = getPlaceValue(num1, place);
    const value2 = getPlaceValue(num2, place);
    const answer = value1 > value2 ? num1 : (value2 > value1 ? num2 : num1);

    return {
        text: `Which number has more ${place}: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: answer.toString(),
        hint: `Look at the ${place} place in each number`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateAlternativeDecomposition(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const altDecomp = getAlternativeDecomposition(number, params.places);
    const tens = altDecomp['tens'] / 10;
    const ones = altDecomp['ones'];

    return {
        text: `${formatNumber(number)} can also be written as [?] tens and ${ones} ones.\nWhat number goes in place of [?]?`,
        type: 'text_input',
        answer: tens.toString(),
        hint: `Think about different ways to make ${number}`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateMultipleRepresentations(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const expanded = getExpandedForm(number);
    const tens = decomp['tens'] / 10;
    const ones = decomp['ones'];

    const representations = [
        formatNumber(number),
        `${tens} tens and ${ones} ones`,
        expanded,
        `${number} ones`
    ];

    const correctRep = randomChoice(representations.slice(0, 3));
    const distractors = representations.filter(r => r !== correctRep).slice(0, 3);
    const options = shuffle([correctRep, ...distractors]);

    return {
        text: `Which of these represents the same value as ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctRep,
        hint: `All these should equal ${number}`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

export default {
    moduleId: 'N03_Y2_NPV',
    generate: generateQuestion
};