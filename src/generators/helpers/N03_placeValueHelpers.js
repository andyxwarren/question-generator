/**
 * Place Value and Roman Numeral Helpers
 *
 * Helper functions for N03 Place Value question generators
 */

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Get the digit at a specific place in a number
 * @param {number} num - The number
 * @param {string} place - 'ones', 'tens', 'hundreds', 'thousands', etc.
 * @returns {number} The digit at that place (0-9)
 */
export function getDigitAtPlace(num, place) {
    const placeValues = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000,
        'ten thousands': 10000,
        'hundred thousands': 100000,
        'millions': 1000000,
        'ten millions': 10000000
    };

    const divisor = placeValues[place];
    if (!divisor) return 0;

    return Math.floor((Math.abs(num) / divisor) % 10);
}

/**
 * Get the value represented by a digit at a specific place
 * @param {number} num - The number
 * @param {string} place - 'ones', 'tens', 'hundreds', etc.
 * @returns {number} The value (e.g., in 347, tens place = 40)
 */
export function getPlaceValue(num, place) {
    const placeValues = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000,
        'ten thousands': 10000,
        'hundred thousands': 100000,
        'millions': 1000000,
        'ten millions': 10000000
    };

    const divisor = placeValues[place];
    if (!divisor) return 0;

    return Math.floor((Math.abs(num) / divisor) % 10) * divisor;
}

/**
 * Decompose a number into place value parts
 * @param {number} num - The number to decompose
 * @param {string[]} places - Array of places to include
 * @returns {Object} Object with place names as keys and values
 */
export function decomposeNumber(num, places) {
    const result = {};
    places.forEach(place => {
        result[place] = getPlaceValue(num, place);
    });
    return result;
}

/**
 * Get expanded form of a number
 * @param {number} num - The number
 * @returns {string} E.g., "300 + 40 + 7"
 */
export function getExpandedForm(num) {
    const parts = [];
    let remaining = Math.abs(num);
    const powers = [10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];

    powers.forEach(power => {
        const digit = Math.floor(remaining / power);
        if (digit > 0) {
            parts.push(digit * power);
        }
        remaining = remaining % power;
    });

    return parts.length > 0 ? parts.join(' + ') : '0';
}

/**
 * Parse expanded form back to number
 * @param {string} expandedForm - E.g., "300 + 40 + 7"
 * @returns {number} The standard form number
 */
export function parseExpandedForm(expandedForm) {
    const parts = expandedForm.split('+').map(s => s.trim());
    return parts.reduce((sum, part) => sum + parseInt(part), 0);
}

/**
 * Generate alternative decompositions (e.g., 47 = 3 tens + 17 ones)
 * @param {number} num - The number
 * @param {string[]} places - Available places
 * @returns {Object} Alternative decomposition
 */
export function getAlternativeDecomposition(num, places) {
    // For simplicity, convert some larger place to smaller (e.g., 1 hundred = 10 tens)
    const decomp = decomposeNumber(num, places);

    // Find a place with non-zero value to "borrow" from
    const placeOrder = ['ten millions', 'millions', 'hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones'];

    for (let i = 0; i < placeOrder.length - 1; i++) {
        const currentPlace = placeOrder[i];
        const nextPlace = placeOrder[i + 1];

        if (places.includes(currentPlace) && places.includes(nextPlace) && decomp[currentPlace] > 0) {
            const alternative = { ...decomp };
            alternative[currentPlace] -= getPlaceMultiplier(currentPlace);
            alternative[nextPlace] += getPlaceMultiplier(currentPlace);
            return alternative;
        }
    }

    return decomp;
}

function getPlaceMultiplier(place) {
    const multipliers = {
        'tens': 10,
        'hundreds': 10,
        'thousands': 10,
        'ten thousands': 10,
        'hundred thousands': 10,
        'millions': 10,
        'ten millions': 10
    };
    return multipliers[place] || 1;
}

/**
 * Generate number with optional zero in specific place
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {boolean} includeZero - Whether to force a zero somewhere
 * @returns {number} Generated number
 */
export function generateNumberWithZero(min, max, includeZero) {
    if (!includeZero) {
        return randomInt(min, max);
    }

    // Generate number, then try to add a zero in a random place
    let num = randomInt(min, max);
    const numStr = String(num);
    const position = randomInt(1, numStr.length - 1); // Not first digit

    // Replace digit at position with 0
    const newNumStr = numStr.substring(0, position) + '0' + numStr.substring(position + 1);
    const newNum = parseInt(newNumStr);

    return (newNum >= min && newNum <= max) ? newNum : num;
}

/**
 * Generate distractors for multiple choice
 */
export function generateDistractors(correctAnswer, count, min, max) {
    const distractors = new Set();
    const offsets = [1, -1, 10, -10, 100, -100, 1000, -1000];

    // Try systematic offsets first
    for (const offset of offsets) {
        if (distractors.size >= count) break;
        const distractor = correctAnswer + offset;
        if (distractor !== correctAnswer && distractor >= min && distractor <= max) {
            distractors.add(distractor);
        }
    }

    // Fill remaining with random numbers
    let attempts = 0;
    while (distractors.size < count && attempts < 50) {
        const distractor = randomInt(min, max);
        if (distractor !== correctAnswer) {
            distractors.add(distractor);
        }
        attempts++;
    }

    return Array.from(distractors).slice(0, count);
}

/**
 * ROMAN NUMERAL FUNCTIONS
 */

/**
 * Convert Arabic number to Roman numeral (1-3999)
 * @param {number} num - Number to convert (1-3999)
 * @returns {string} Roman numeral
 */
export function toRoman(num) {
    if (num < 1 || num > 3999) return '';

    const romanMap = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ];

    let result = '';
    let remaining = num;

    for (const [value, symbol] of romanMap) {
        while (remaining >= value) {
            result += symbol;
            remaining -= value;
        }
    }

    return result;
}

/**
 * Convert Roman numeral to Arabic number
 * @param {string} roman - Roman numeral string
 * @returns {number} Arabic number
 */
export function fromRoman(roman) {
    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let result = 0;
    let prevValue = 0;

    // Process from right to left
    for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanValues[roman[i]];

        if (currentValue >= prevValue) {
            result += currentValue;
        } else {
            result -= currentValue;
        }

        prevValue = currentValue;
    }

    return result;
}

/**
 * Validate Roman numeral string
 * @param {string} roman - Roman numeral to validate
 * @returns {boolean} True if valid
 */
export function isValidRoman(roman) {
    // Basic validation pattern
    const pattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return pattern.test(roman);
}

/**
 * Generate Roman numeral within range
 * @param {number} min - Minimum value (Arabic)
 * @param {number} max - Maximum value (Arabic)
 * @returns {Object} { arabic: number, roman: string }
 */
export function generateRomanPair(min, max) {
    const arabic = randomInt(min, max);
    const roman = toRoman(arabic);
    return { arabic, roman };
}

/**
 * Generate Roman numeral distractors
 * @param {number} correctArabic - Correct answer in Arabic
 * @param {number} count - Number of distractors needed
 * @param {number} min - Minimum range
 * @param {number} max - Maximum range
 * @returns {string[]} Array of Roman numeral distractors
 */
export function generateRomanDistractors(correctArabic, count, min, max) {
    const arabicDistractors = generateDistractors(correctArabic, count, min, max);
    return arabicDistractors.map(n => toRoman(n));
}

/**
 * Get common historical years in range
 * @param {number} min - Minimum year
 * @param {number} max - Maximum year
 * @returns {number[]} Array of historical years
 */
export function getHistoricalYears(min, max) {
    const commonYears = [
        753,   // Founding of Rome
        1066,  // Battle of Hastings
        1215,  // Magna Carta
        1492,  // Columbus
        1588,  // Spanish Armada
        1666,  // Great Fire of London
        1776,  // American Independence
        1789,  // French Revolution
        1815,  // Waterloo
        1914,  // WWI start
        1945,  // WWII end
        1969,  // Moon landing
        2000,  // Millennium
        2012,  // Olympics
        2024   // Current
    ];

    return commonYears.filter(year => year >= min && year <= max);
}

/**
 * Format place name for display
 * @param {string} place - Internal place name
 * @returns {string} Display name
 */
export function formatPlaceName(place) {
    return place.charAt(0).toUpperCase() + place.slice(1);
}

export default {
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
    toRoman,
    fromRoman,
    isValidRoman,
    generateRomanPair,
    generateRomanDistractors,
    getHistoricalYears,
    formatPlaceName
};
