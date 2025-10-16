/**
 * Year 5 Place Value & Roman Numerals Question Generator
 *
 * Module: N03_Y5_NPV - "Determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M)"
 *
 * This generator combines place value questions (up to millions)
 * with Roman numeral questions (I to M) including historical years
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
    // Roman numeral functions
    toRoman,
    fromRoman,
    generateRomanPair,
    getHistoricalYears,
    formatPlaceName
} from './helpers/N03_placeValueHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    // Roman numeral operations
    if (operation === 'roman_to_arabic') {
        return generateRomanToArabic(params, level);
    }
    if (operation === 'arabic_to_roman') {
        return generateArabicToRoman(params, level);
    }
    if (operation === 'roman_compare') {
        return generateRomanCompare(params, level);
    }
    if (operation === 'roman_year') {
        return generateRomanYear(params, level);
    }
    if (operation === 'roman_complex') {
        return generateRomanComplex(params, level);
    }

    // Place value operations
    switch(operation) {
        case 'identify_digit':
            return generateIdentifyDigit(params, level);
        case 'identify_place_value':
            return generateIdentifyPlaceValue(params, level);
        case 'digit_value':
            return generateDigitValue(params, level);
        case 'compare_place_values':
            return generateComparePlaceValues(params, level);
        case 'compose_simple':
            return generateComposeSimple(params, level);
        case 'decompose_simple':
            return generateDecomposeSimple(params, level);
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
 * ROMAN NUMERAL QUESTION GENERATORS
 */

/**
 * "What is [Roman numeral] in numbers?"
 */
function generateRomanToArabic(params, level) {
    const { roman, arabic } = generateRomanPair(params.roman_min, params.roman_max);

    const distractors = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const options = shuffle([arabic, ...distractors]);

    return {
        text: `What is ${roman} in numbers?`,
        type: 'multiple_choice',
        options: options,
        answer: arabic.toString(),
        hint: `Remember: I=1, V=5, X=10, L=50, C=100, D=500, M=1000`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

/**
 * "Write [number] in Roman numerals"
 */
function generateArabicToRoman(params, level) {
    const { roman, arabic } = generateRomanPair(params.roman_min, params.roman_max);

    const distractorNumbers = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const distractorRomans = distractorNumbers.map(n => toRoman(n));
    const options = shuffle([roman, ...distractorRomans]);

    return {
        text: `Write ${arabic} in Roman numerals`,
        type: 'multiple_choice',
        options: options,
        answer: roman,
        hint: `Break it down: thousands, hundreds, tens, ones`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

/**
 * "Which is larger: [Roman1] or [Roman2]?"
 */
function generateRomanCompare(params, level) {
    const pair1 = generateRomanPair(params.roman_min, params.roman_max);
    let pair2 = generateRomanPair(params.roman_min, params.roman_max);

    // Ensure they're different
    while (pair2.arabic === pair1.arabic) {
        pair2 = generateRomanPair(params.roman_min, params.roman_max);
    }

    const larger = pair1.arabic > pair2.arabic ? pair1 : pair2;

    return {
        text: `Which is larger: ${pair1.roman} or ${pair2.roman}?`,
        type: 'multiple_choice',
        options: [pair1.roman, pair2.roman],
        answer: larger.roman,
        hint: `Convert to numbers to compare`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

/**
 * "What year is [Roman numeral]?" - Using historical years
 */
function generateRomanYear(params, level) {
    if (!params.roman_years || params.roman_years.length === 0) {
        return generateRomanToArabic(params, level);
    }

    const year = randomChoice(params.roman_years);
    const roman = toRoman(year);

    // Generate plausible year distractors (nearby years)
    const distractors = new Set();
    const offsets = [1, -1, 10, -10, 50, -50, 100, -100];

    for (const offset of offsets) {
        if (distractors.size >= 3) break;
        const distractor = year + offset;
        if (distractor > 0 && distractor !== year && params.roman_years.includes(distractor) === false) {
            distractors.add(distractor);
        }
    }

    // Fill with any historical years if needed
    while (distractors.size < 3) {
        const randomYear = randomChoice(params.roman_years);
        if (randomYear !== year) {
            distractors.add(randomYear);
        }
    }

    const options = shuffle([year, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `What year is ${roman}?`,
        type: 'multiple_choice',
        options: options,
        answer: year.toString(),
        hint: `Convert the Roman numeral to a number`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

/**
 * More complex Roman numeral questions
 */
function generateRomanComplex(params, level) {
    // Generate a larger Roman numeral
    const arabic = randomInt(Math.max(params.roman_min, 500), params.roman_max);
    const roman = toRoman(arabic);

    const distractors = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const options = shuffle([arabic, ...distractors]);

    return {
        text: `What is ${roman} in numbers?`,
        type: 'multiple_choice',
        options: options,
        answer: arabic.toString(),
        hint: `Break down the Roman numeral into parts`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

/**
 * PLACE VALUE QUESTION GENERATORS (adapted for large numbers up to millions)
 */

function generateIdentifyDigit(params, level) {
    const number = randomInt(params.min_value, params.max_value);
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
        distractors.add(randomInt(0, 9));
    }

    const options = shuffle([correctDigit, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `What digit is in the ${place} place in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctDigit.toString(),
        hint: `Look carefully at the ${place} position`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

function generateIdentifyPlaceValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) {
        return generateIdentifyPlaceValue(params, level);
    }

    const correctValue = getPlaceValue(number, place);
    const distractors = new Set([digit]);

    params.places.forEach(p => {
        const value = getPlaceValue(number, p);
        if (value !== correctValue && value > 0) {
            distractors.add(value);
        }
    });

    while (distractors.size < 3) {
        distractors.add(randomInt(1, params.max_value));
    }

    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what is the value of the ${digit}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctValue.toString(),
        hint: `The ${digit} is in the ${place} place`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

function generateDigitValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) {
        return generateDigitValue(params, level);
    }

    const value = getPlaceValue(number, place);
    const distractors = new Set([digit]);

    while (distractors.size < 3) {
        distractors.add(randomInt(1, params.max_value));
    }

    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Look at which place the ${digit} is in`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

function generateComparePlaceValues(params, level) {
    const number = randomInt(params.min_value, params.max_value);

    // Get two different places
    const places = shuffle([...params.places]).slice(0, 2);
    const digit1 = getDigitAtPlace(number, places[0]);
    const digit2 = getDigitAtPlace(number, places[1]);

    if (digit1 === 0 || digit2 === 0) {
        return generateComparePlaceValues(params, level);
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
        module: 'N03_Y5_NPV',
        level: level
    };
}

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
        module: 'N03_Y5_NPV',
        level: level
    };
}

function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);

    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        return place === 'ones' ? value : value / getPlaceDivisor(place);
    });

    const placeLabels = params.places.map(p => `[${p}]`).join(',');

    return {
        text: `Break down ${formatNumber(number)} into place values.\nEnter as: ${placeLabels}`,
        type: 'text_input',
        answer: parts.join(','),
        answers: parts,
        hint: `Count each place separately`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);

    return {
        text: `Write ${formatNumber(number)} in expanded form`,
        type: 'text_input',
        answer: expanded,
        hint: `Break into place values and add with + signs`,
        module: 'N03_Y5_NPV',
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
        hint: `Add all the parts together`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

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
        module: 'N03_Y5_NPV',
        level: level
    };
}

function generateAlternativeDecomposition(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const altDecomp = getAlternativeDecomposition(number, params.places);

    // Find which place was modified
    const normalDecomp = decomposeNumber(number, params.places);
    let modifiedPlace = null;
    for (const place of params.places) {
        if (altDecomp[place] !== normalDecomp[place] && place !== 'ones') {
            modifiedPlace = place;
            break;
        }
    }

    if (!modifiedPlace) {
        return generateAlternativeDecomposition(params, level);
    }

    const count = altDecomp[modifiedPlace] / getPlaceDivisor(modifiedPlace);
    const onesCount = altDecomp['ones'];

    return {
        text: `${formatNumber(number)} can also be written as [?] ${modifiedPlace} and ${onesCount} ones.\nWhat number goes in place of [?]?`,
        type: 'text_input',
        answer: count.toString(),
        hint: `Think about different ways to partition ${number}`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

function generateMultipleRepresentations(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);

    const representations = [
        formatNumber(number),
        expanded,
        `${number} ones`
    ];

    const correctRep = randomChoice(representations.slice(0, 2));
    const distractors = representations.filter(r => r !== correctRep).slice(0, 3);
    const options = shuffle([correctRep, ...distractors]);

    return {
        text: `Which of these represents the same value as ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctRep,
        hint: `All these should equal ${number}`,
        module: 'N03_Y5_NPV',
        level: level
    };
}

// Helper function
function getPlaceDivisor(place) {
    const divisors = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000,
        'ten thousands': 10000,
        'hundred thousands': 100000,
        'millions': 1000000
    };
    return divisors[place] || 1;
}

/**
 * Export generator
 */
export default {
    moduleId: 'N03_Y5_NPV',
    generate: generateQuestion
};
