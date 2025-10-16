/**
 * Year 4 Place Value & Roman Numerals Question Generator
 *
 * Module: N03_Y4_NPV - "Recognise place value in four-digit numbers; read Roman numerals to 100"
 * 
 * Save as: src/generators/N03_Y4_NPV_placevalue.js
 * 
 * This generator combines place value questions (thousands, hundreds, tens, ones)
 * with Roman numeral questions (I to C)
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
    generateDistractors,
    // Roman numeral functions
    toRoman,
    fromRoman,
    generateRomanPair,
    generateRomanDistractors,
    formatPlaceName
} from './helpers/N03_placeValueHelpers.js';

/**
 * Main question generator
 * 
 * Randomly selects between place value operations and Roman numeral operations
 * based on the operations array in parameters
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
    if (operation === 'roman_order') {
        return generateRomanOrder(params, level);
    }
    if (operation === 'roman_sequence') {
        return generateRomanSequence(params, level);
    }

    // Place value operations (similar to Year 2/3 but with thousands place)
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
        case 'zero_value':
            return generateZeroValue(params, level);
        case 'zero_concept':
            return generateZeroConcept(params, level);
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
        hint: `Remember: I=1, V=5, X=10, L=50, C=100`,
        module: 'N03_Y4_NPV',
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
        hint: `Break it down: hundreds, tens, ones`,
        module: 'N03_Y4_NPV',
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
        hint: `Convert to numbers if needed: ${pair1.roman}=${pair1.arabic}, ${pair2.roman}=${pair2.arabic}`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

/**
 * "Order these Roman numerals from smallest to largest"
 */
function generateRomanOrder(params, level) {
    const count = 3;
    const pairs = [];
    
    for (let i = 0; i < count; i++) {
        let pair = generateRomanPair(params.roman_min, params.roman_max);
        // Ensure unique
        while (pairs.some(p => p.arabic === pair.arabic)) {
            pair = generateRomanPair(params.roman_min, params.roman_max);
        }
        pairs.push(pair);
    }

    const sorted = [...pairs].sort((a, b) => a.arabic - b.arabic);
    const shuffled = shuffle([...pairs]);

    const answer = sorted.map(p => p.roman).join(',');

    return {
        text: `Order these Roman numerals from smallest to largest:\n${shuffled.map(p => p.roman).join(', ')}\n\nEnter as: [smallest],[middle],[largest]`,
        type: 'text_input',
        answer: answer,
        answers: sorted.map(p => p.roman),
        hint: `Convert to numbers first if needed`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

/**
 * "What comes next in this Roman numeral sequence?"
 */
function generateRomanSequence(params, level) {
    const step = randomChoice([1, 5, 10]);
    const startArabic = randomInt(params.roman_min, Math.min(params.roman_max - step * 3, 80));
    
    const sequence = [];
    for (let i = 0; i < 4; i++) {
        sequence.push({
            arabic: startArabic + (i * step),
            roman: toRoman(startArabic + (i * step))
        });
    }

    const nextArabic = startArabic + (4 * step);
    const nextRoman = toRoman(nextArabic);

    const distractorNumbers = [nextArabic + step, nextArabic - step, nextArabic + 1];
    const distractorRomans = distractorNumbers.map(n => toRoman(n));
    const options = shuffle([nextRoman, ...distractorRomans]);

    return {
        text: `What comes next in this sequence?\n${sequence.map(s => s.roman).join(', ')}, ___`,
        type: 'multiple_choice',
        options: options,
        answer: nextRoman,
        hint: `The pattern increases by ${step} each time`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

/**
 * PLACE VALUE QUESTION GENERATORS (adapted for 4-digit numbers)
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
        module: 'N03_Y4_NPV',
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
        distractors.add(randomInt(1, 9000));
    }

    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what is the value of the ${digit}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctValue.toString(),
        hint: `The ${digit} is in the ${place} place`,
        module: 'N03_Y4_NPV',
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
        distractors.add(randomInt(1, 9000));
    }

    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Look at which place the ${digit} is in`,
        module: 'N03_Y4_NPV',
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
        module: 'N03_Y4_NPV',
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
        module: 'N03_Y4_NPV',
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

    return {
        text: `Break down ${formatNumber(number)} into place values.\nEnter as: [thousands],[hundreds],[tens],[ones]`,
        type: 'text_input',
        answer: parts.join(','),
        answers: parts,
        hint: `Count each place separately`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);

    return {
        text: `Write ${formatNumber(number)} in expanded form (e.g., "3000 + 400 + 50 + 7")`,
        type: 'text_input',
        answer: expanded,
        hint: `Break into thousands, hundreds, tens, and ones`,
        module: 'N03_Y4_NPV',
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
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateZeroValue(params, level) {
    // Generate number with at least one zero
    let number = randomInt(params.min_value, params.max_value);
    while (!String(number).includes('0')) {
        number = randomInt(params.min_value, params.max_value);
    }

    return {
        text: `What is the value of the 0 in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: [0, 10, 100, 1000],
        answer: '0',
        hint: `Zero means there is nothing in that place`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

/**
 * "Understanding the concept of zero in place value"
 */
function generateZeroConcept(params, level) {
    const questions = [
        {
            text: `What happens to the number 45 when we put a zero after it?`,
            answer: '450',
            options: shuffle([450, 45, 405, 4500]),
            hint: `Adding 0 at the end makes it ten times bigger`
        },
        {
            text: `Which is larger: 305 or 35?`,
            answer: '305',
            options: [305, 35],
            hint: `The 0 holds the place value`
        },
        {
            text: `What number is one hundred more than 4900?`,
            answer: '5000',
            options: shuffle([5000, 4901, 5900, 4910]),
            hint: `Think about place value`
        }
    ];

    const q = randomChoice(questions);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: q.options,
        answer: q.answer,
        hint: q.hint,
        module: 'N03_Y4_NPV',
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
    moduleId: 'N03_Y4_NPV',
    generate: generateQuestion
};
