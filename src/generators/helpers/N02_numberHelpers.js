/**
 * Number Helpers
 *
 * Shared utility functions for N02 question generators
 * (Read, Write, Order and Compare Numbers)
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
 * Format number with commas (1234567 → "1,234,567")
 * Uses 'en-US' locale to ensure consistent comma formatting
 */
export function formatNumber(num) {
    return num.toLocaleString('en-US');
}

/**
 * Number to word conversion (0-100 only)
 * Returns null for numbers outside range
 */
export function numberToWord(num) {
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num < 0 || num > 100) return null;

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num === 100) return 'one hundred';

    const tenDigit = Math.floor(num / 10);
    const oneDigit = num % 10;

    if (oneDigit === 0) return tens[tenDigit];
    return `${tens[tenDigit]}-${ones[oneDigit]}`;
}

/**
 * Word to number conversion (0-100 only)
 * Returns null if word not recognized
 */
export function wordToNumber(word) {
    const wordMap = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
        'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
        'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
        'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19,
        'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
        'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90,
        'one hundred': 100, 'hundred': 100
    };

    const normalized = word.toLowerCase().trim();

    // Direct match
    if (wordMap[normalized] !== undefined) {
        return wordMap[normalized];
    }

    // Handle hyphenated numbers (e.g., "twenty-one")
    if (normalized.includes('-')) {
        const parts = normalized.split('-');
        if (parts.length === 2) {
            const tens = wordMap[parts[0]] || 0;
            const ones = wordMap[parts[1]] || 0;
            return tens + ones;
        }
    }

    return null;
}

/**
 * Round number to nearest place value
 * @param {number} num - Number to round
 * @param {number} base - Place value (10, 100, 1000, etc.)
 */
export function roundToNearest(num, base) {
    return Math.round(num / base) * base;
}

/**
 * Generate distractors for multiple choice
 * Returns array of unique distractors different from correct answer
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
 * Compare two numbers and return symbol
 */
export function getComparisonSymbol(a, b) {
    if (a < b) return '<';
    if (a > b) return '>';
    return '=';
}

/**
 * Apply step operation (more/less)
 */
export function applyStep(num, step, direction) {
    return direction === 'more' ? num + step : num - step;
}

/**
 * Get place value of a specific digit
 * @param {number} num - The number
 * @param {string} place - 'ones', 'tens', 'hundreds', 'thousands', etc.
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

    return Math.floor((num / divisor) % 10) * divisor;
}

/**
 * Generate number within range that is NOT a multiple of base
 * (useful for rounding questions)
 */
export function generateNonMultiple(min, max, base) {
    let num;
    let attempts = 0;
    do {
        num = randomInt(min, max);
        attempts++;
    } while (num % base === 0 && attempts < 100);

    // If we couldn't find a non-multiple, force it
    if (num % base === 0) {
        const offset = randomChoice([1, -1, 2, -2]);
        num += offset;
        num = Math.max(min, Math.min(max, num));
    }

    return num;
}

/**
 * Check if number is within word conversion range (0-100)
 */
export function canConvertToWord(num) {
    return num >= 0 && num <= 100;
}

/**
 * Generate unique random numbers
 */
export function generateUniqueNumbers(count, min, max) {
    const numbers = new Set();
    let attempts = 0;

    while (numbers.size < count && attempts < 100) {
        numbers.add(randomInt(min, max));
        attempts++;
    }

    return Array.from(numbers);
}

/**
 * Sort numbers in ascending order
 */
export function sortAscending(numbers) {
    return [...numbers].sort((a, b) => a - b);
}

/**
 * Sort numbers in descending order
 */
export function sortDescending(numbers) {
    return [...numbers].sort((a, b) => b - a);
}

export default {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    wordToNumber,
    roundToNearest,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    getPlaceValue,
    generateNonMultiple,
    canConvertToWord,
    generateUniqueNumbers,
    sortAscending,
    sortDescending
};
