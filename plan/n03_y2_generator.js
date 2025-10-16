/**
 * Year 2 Place Value Question Generator
 *
 * Module: N03_Y2_NPV - "Recognise the place value of each digit in a two-digit number (tens, ones)"
 * 
 * Save as: src/generators/N03_Y2_NPV_placevalue.js
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
    parseExpandedForm,
    getAlternativeDecomposition,
    generateNumberWithZero,
    generateDistractors,
    formatPlaceName
} from './helpers/N03_placeValueHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'identify_digit':
            return generateIdentifyDigit(params, level);
        case 'identify_place_value':
            return generateIdentifyPlaceValue(params, level);
        case 'compare_place_values':
            return generateComparePlaceValues(params, level);
        case 'compose_simple':
            return generateComposeSimple(params, level);
        case 'decompose_simple':
            return generateDecomposeSimple(params, level);
        case 'digit_value':
            return generateDigitValue(params, level);
        case 'zero_value':
            return generateZeroValue(params, level);
        case 'expanded_form':
            return generateExpandedForm(params, level);
        case 'standard_from_expanded':
            return generateStandardFromExpanded(params, level);
        case 'place_comparison':
            return generatePlaceComparison(params, level);
        case 'alternative_decomposition':
            return generateAlternativeDecomposition(params, level);
        case 'multiple_representations':
            return generateMultipleRepresentations(params, level);
        default:
            return generateIdentifyDigit(params, level);
    }
}

/**
 * "What digit is in the [place] in [number]?"
 */
function generateIdentifyDigit(params, level) {
    const number = params.include_zero 
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);
    
    const place = randomChoice(params.places);
    const correctDigit = getDigitAtPlace(number, place);

    // Generate distractors (other digits in the number, plus some random)
    const distractors = new Set();
    params.places.forEach(p => {
        const digit = getDigitAtPlace(number, p);
        if (digit !== correctDigit) {
            distractors.add(digit);
        }
    });

    // Add random digits if needed
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

/**
 * "What is the value of the [digit] in [number]?"
 */
function generateIdentifyPlaceValue(params, level) {
    const number = params.include_zero 
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);
    
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    
    // Skip if digit is 0 and we're asking about value
    if (digit === 0) {
        return generateIdentifyPlaceValue(params, level);
    }

    const correctValue = getPlaceValue(number, place);

    // Generate plausible distractors
    const distractors = new Set();
    
    // Add the digit itself as distractor
    distractors.add(digit);
    
    // Add values from other places
    params.places.forEach(p => {
        const value = getPlaceValue(number, p);
        if (value !== correctValue && value > 0) {
            distractors.add(value);
        }
    });

    // Add some calculated distractors
    distractors.add(digit * 100);  // Wrong place value
    
    while (distractors.size < 3) {
        distractors.add(randomInt(1, 90));
    }

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

/**
 * "Which digit has greater value: [digit1] or [digit2] in [number]?"
 */
function generateComparePlaceValues(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    
    // Ensure both places have non-zero digits
    let validNumber = false;
    let num = number;
    
    while (!validNumber) {
        const tensDigit = getDigitAtPlace(num, 'tens');
        const onesDigit = getDigitAtPlace(num, 'ones');
        
        if (tensDigit > 0 && onesDigit > 0) {
            validNumber = true;
        } else {
            num = randomInt(params.min_value, params.max_value);
        }
    }

    const tensDigit = getDigitAtPlace(num, 'tens');
    const onesDigit = getDigitAtPlace(num, 'ones');
    const tensValue = getPlaceValue(num, 'tens');
    const onesValue = getPlaceValue(num, 'ones');

    return {
        text: `In ${formatNumber(num)}, which digit represents a greater value: ${tensDigit} or ${onesDigit}?`,
        type: 'multiple_choice',
        options: [tensDigit, onesDigit],
        answer: tensDigit.toString(),  // Tens always greater
        hint: `Think about place value - tens or ones?`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

/**
 * "What number is [X] tens and [Y] ones?"
 */
function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    
    const tensValue = decomp['tens'] || 0;
    const onesValue = decomp['ones'] || 0;
    const tens = tensValue / 10;
    const ones = onesValue;

    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${tens} tens and ${ones} ones?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `${tens} tens = ${tensValue}, then add ${ones} ones`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

/**
 * "How many tens and ones in [number]?"
 */
function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    
    const tensValue = decomp['tens'] || 0;
    const onesValue = decomp['ones'] || 0;
    const tens = tensValue / 10;
    const ones = onesValue;

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

/**
 * "In [number], what does the digit [X] represent?"
 */
function generateDigitValue(params, level) {
    const number = params.include_zero 
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);
    
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    
    // Skip zeros for this question type
    if (digit === 0) {
        return generateDigitValue(params, level);
    }

    const value = getPlaceValue(number, place);
    const distractors = new Set([digit, digit * 100]);
    
    while (distractors.size < 3) {
        distractors.add(randomInt(1, 90));
    }

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

/**
 * "What is the value of 0 in [number]?"
 */
function generateZeroValue(params, level) {
    if (!params.include_zero) {
        return generateIdentifyDigit(params, level);
    }

    // Generate number with zero
    const number = generateNumberWithZero(params.min_value, params.max_value, true);
    
    // Ensure it actually has a zero
    if (!String(number).includes('0')) {
        return generateZeroValue(params, level);
    }

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

/**
 * "Write [number] in expanded form"
 */
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

/**
 * "What is [expanded form] in standard form?"
 */
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

/**
 * "Which number has more [place]: [num1] or [num2]?"
 */
function generatePlaceComparison(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    
    if (num1 === num2) {
        return generatePlaceComparison(params, level);
    }

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

/**
 * Alternative decomposition (e.g., 47 = 3 tens + 17 ones)
 */
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

/**
 * Multiple representations of the same number
 */
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

/**
 * Export generator
 */
export default {
    moduleId: 'N03_Y2_NPV',
    generate: generateQuestion
};
