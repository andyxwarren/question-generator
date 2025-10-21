/**
 * Year 3 Place Value Question Generator
 *
 * Module: N03_Y3_NPV - "Recognise the place value of each digit in a three-digit number (hundreds, tens, ones)"
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
        module: 'N03_Y3_NPV',
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

    if (digit === 0) {
        return generateIdentifyPlaceValue(params, level);
    }

    const correctValue = getPlaceValue(number, place);

    const distractors = new Set();
    distractors.add(digit);

    params.places.forEach(p => {
        const value = getPlaceValue(number, p);
        if (value !== correctValue && value > 0) {
            distractors.add(value);
        }
    });

    distractors.add(digit * 10);  // Wrong place value

    while (distractors.size < 3) {
        distractors.add(randomInt(1, 900));
    }

    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what is the value of the ${digit}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctValue.toString(),
        hint: `The ${digit} is in the ${place} place`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

/**
 * "Which digit has greater value: [digit1] or [digit2] in [number]?"
 */
function generateComparePlaceValues(params, level, attempts = 0) {
    // Prevent infinite recursion
    if (attempts > 10) {
        return generateIdentifyDigit(params, level);
    }

    const number = randomInt(params.min_value, params.max_value);

    // Get two different places
    const places = shuffle([...params.places]).slice(0, 2);
    const digit1 = getDigitAtPlace(number, places[0]);
    const digit2 = getDigitAtPlace(number, places[1]);

    // CRITICAL FIX: Reject if digits are the same (e.g., 444 would give "4 or 4?")
    if (digit1 === digit2) {
        return generateComparePlaceValues(params, level, attempts + 1);
    }

    // Reject if either digit is zero (makes comparison trivial)
    if (digit1 === 0 || digit2 === 0) {
        return generateComparePlaceValues(params, level, attempts + 1);
    }

    const value1 = getPlaceValue(number, places[0]);
    const value2 = getPlaceValue(number, places[1]);

    const greaterDigit = value1 > value2 ? digit1 : digit2;

    return {
        text: `In ${formatNumber(number)}, which digit represents a greater value: ${digit1} or ${digit2}?`,
        type: 'multiple_choice',
        options: [digit1, digit2],
        answer: greaterDigit.toString(),
        hint: `Compare the place values: ${places[0]} vs ${places[1]}`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

/**
 * "What number is [X] hundreds, [Y] tens and [Z] ones?"
 */
function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);

    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        const count = place === 'ones' ? value : value / getPlaceDivisor(place);
        return `${count} ${place}`;
    }).filter((_, idx) => decomp[params.places[idx]] > 0);

    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${parts.join(', ')}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Add up all the place values`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

/**
 * "How many hundreds, tens and ones in [number]?"
 */
function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);

    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        return place === 'ones' ? value : value / getPlaceDivisor(place);
    });

    return {
        text: `Break down ${formatNumber(number)} into place values.\nEnter as: [hundreds],[tens],[ones]`,
        type: 'text_input',
        answer: parts.join(','),
        answers: parts,
        hint: `Count each place separately`,
        module: 'N03_Y3_NPV',
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

    if (digit === 0) {
        return generateDigitValue(params, level);
    }

    const value = getPlaceValue(number, place);
    const distractors = new Set([digit, digit * 10]);

    while (distractors.size < 3) {
        distractors.add(randomInt(1, 900));
    }

    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Look at which place the ${digit} is in`,
        module: 'N03_Y3_NPV',
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

    const number = generateNumberWithZero(params.min_value, params.max_value, true);

    if (!String(number).includes('0')) {
        return generateZeroValue(params, level);
    }

    return {
        text: `What is the value of the 0 in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: [0, 1, 10, 100],
        answer: '0',
        hint: `Zero means there is nothing in that place`,
        module: 'N03_Y3_NPV',
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
        text: `Write ${formatNumber(number)} in expanded form (e.g., "300 + 40 + 5")`,
        type: 'text_input',
        answer: expanded,
        hint: `Break the number into hundreds, tens and ones`,
        module: 'N03_Y3_NPV',
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
        module: 'N03_Y3_NPV',
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
        module: 'N03_Y3_NPV',
        level: level
    };
}

/**
 * Alternative decomposition (e.g., 347 = 33 tens + 17 ones)
 */
function generateAlternativeDecomposition(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const altDecomp = getAlternativeDecomposition(number, params.places);

    // Find which place was modified
    const normalDecomp = decomposeNumber(number, params.places);
    let modifiedPlace = null;
    for (const place of params.places) {
        if (altDecomp[place] !== normalDecomp[place]) {
            modifiedPlace = place;
            break;
        }
    }

    if (!modifiedPlace || modifiedPlace === 'ones') {
        return generateAlternativeDecomposition(params, level);
    }

    const count = altDecomp[modifiedPlace] / getPlaceDivisor(modifiedPlace);
    const onesCount = altDecomp['ones'];

    return {
        text: `${formatNumber(number)} can also be written as [?] ${modifiedPlace} and ${onesCount} ones.\nWhat number goes in place of [?]?`,
        type: 'text_input',
        answer: count.toString(),
        hint: `Think about different ways to make ${number}`,
        module: 'N03_Y3_NPV',
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

    const hundreds = decomp['hundreds'] / 100;
    const tens = decomp['tens'] / 10;
    const ones = decomp['ones'];

    const representations = [
        formatNumber(number),
        `${hundreds} hundreds, ${tens} tens and ${ones} ones`,
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
        module: 'N03_Y3_NPV',
        level: level
    };
}

// Helper function
function getPlaceDivisor(place) {
    const divisors = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000
    };
    return divisors[place] || 1;
}

/**
 * Export generator
 */
export default {
    moduleId: 'N03_Y3_NPV',
    generate: generateQuestion
};
