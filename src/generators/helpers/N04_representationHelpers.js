/**
 * Representation Helpers
 *
 * Shared utility functions for N04 question generators
 * (Identify, Represent, Estimate and Rounding)
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
    return num.toLocaleString('en-US');
}

/**
 * Round number to nearest place value
 */
export function roundToNearest(num, base) {
    return Math.round(num / base) * base;
}

/**
 * Generate number that is NOT a multiple of base (for rounding questions)
 */
export function generateNonMultiple(min, max, base) {
    let num;
    let attempts = 0;
    do {
        num = randomInt(min, max);
        attempts++;
    } while (num % base === 0 && attempts < 100);

    if (num % base === 0) {
        const offset = randomChoice([1, -1, 2, -2]);
        num += offset;
        num = Math.max(min, Math.min(max, num));
    }

    return num;
}

/**
 * Generate distractors for rounding questions
 */
export function generateRoundingDistractors(number, base) {
    const rounded = roundToNearest(number, base);
    return [
        roundToNearest(number + base, base),
        roundToNearest(number - base, base),
        number,  // The original number (common mistake)
        rounded + base,
        rounded - base
    ].filter(d => d !== rounded);
}

/**
 * Describe a number line position
 * @param {number} position - The position on the number line
 * @param {number} min - Minimum value on number line
 * @param {number} max - Maximum value on number line
 * @returns {string} Description of position
 */
export function describeNumberLinePosition(position, min, max) {
    const range = max - min;
    const relativePosition = (position - min) / range;

    if (relativePosition < 0.2) return 'near the start';
    if (relativePosition < 0.4) return 'about a quarter of the way along';
    if (relativePosition < 0.6) return 'around the middle';
    if (relativePosition < 0.8) return 'about three-quarters of the way along';
    return 'near the end';
}

/**
 * Generate number line scale marks
 */
export function generateNumberLineMarks(min, max, divisions = 10) {
    const marks = [];
    const step = (max - min) / divisions;

    for (let i = 0; i <= divisions; i++) {
        marks.push(min + (i * step));
    }

    return marks;
}

/**
 * Find closest mark on number line
 */
export function findClosestMark(value, marks) {
    return marks.reduce((prev, curr) => {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
}

/**
 * Generate number line question text
 */
export function generateNumberLineText(min, max, position, showSomeMarks = true) {
    const marks = generateNumberLineMarks(min, max, 10);

    if (showSomeMarks) {
        // Show first, middle, and last marks
        const visibleMarks = [marks[0], marks[5], marks[10]];
        return `On a number line from ${formatNumber(min)} to ${formatNumber(max)}, ` +
               `with marks at ${visibleMarks.map(m => formatNumber(m)).join(', ')}, ` +
               `where would ${formatNumber(position)} be?`;
    } else {
        return `On a number line from ${formatNumber(min)} to ${formatNumber(max)}, ` +
               `where would ${formatNumber(position)} be?`;
    }
}

/**
 * Generate estimation range text
 */
export function generateEstimationText(value, ranges) {
    return `Which range best estimates ${formatNumber(value)}?`;
}

/**
 * Find which range a value falls into
 */
export function findRange(value, ranges) {
    return ranges.find(([min, max]) => value >= min && value <= max);
}

/**
 * Format range for display
 */
export function formatRange(range) {
    return `${formatNumber(range[0])} to ${formatNumber(range[1])}`;
}

/**
 * Generate place value representation
 * @param {number} num - Number to represent
 * @returns {object} Place value breakdown
 */
export function generatePlaceValueRepresentation(num) {
    const str = num.toString();
    const representation = {};

    const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'];

    for (let i = 0; i < str.length; i++) {
        const digit = parseInt(str[str.length - 1 - i]);
        const placeValue = Math.pow(10, i);
        const place = places[i];

        if (digit !== 0) {
            representation[place] = digit * placeValue;
        }
    }

    return representation;
}

/**
 * Generate partitioned number text
 */
export function generatePartitionText(num) {
    const representation = generatePlaceValueRepresentation(num);
    const parts = Object.values(representation).map(v => formatNumber(v));

    return parts.join(' + ');
}

/**
 * Generate comparison language question
 * Supports both 2-number comparisons and 3-4 number comparisons
 * @param {number|number[]} num1 - First number OR array of numbers (for most/least)
 * @param {number} num2 - Second number (only used for 2-number comparisons)
 * @param {string} word - Comparison word
 * @returns {string} Question text
 */
export function generateComparisonLanguageText(num1, num2, word) {
    // Handle array of numbers (for "most" and "least")
    if (Array.isArray(num1)) {
        const numbers = num1;
        const formattedNumbers = numbers.map(n => formatNumber(n));

        if (word === 'most') {
            if (numbers.length === 2) {
                return `Which is the most: ${formattedNumbers.join(' or ')}?`;
            } else if (numbers.length === 3) {
                return `Which number is the most: ${formattedNumbers[0]}, ${formattedNumbers[1]}, or ${formattedNumbers[2]}?`;
            } else {
                // 4 numbers
                return `Which number is the most: ${formattedNumbers[0]}, ${formattedNumbers[1]}, ${formattedNumbers[2]}, or ${formattedNumbers[3]}?`;
            }
        } else if (word === 'least') {
            if (numbers.length === 2) {
                return `Which is the least: ${formattedNumbers.join(' or ')}?`;
            } else if (numbers.length === 3) {
                return `Which number is the least: ${formattedNumbers[0]}, ${formattedNumbers[1]}, or ${formattedNumbers[2]}?`;
            } else {
                // 4 numbers
                return `Which number is the least: ${formattedNumbers[0]}, ${formattedNumbers[1]}, ${formattedNumbers[2]}, or ${formattedNumbers[3]}?`;
            }
        }
    }

    // Standard 2-number comparisons
    const phrases = {
        'equal to': `Is ${formatNumber(num1)} equal to ${formatNumber(num2)}?`,
        'more than': `Is ${formatNumber(num1)} more than ${formatNumber(num2)}?`,
        'less than': `Is ${formatNumber(num1)} less than ${formatNumber(num2)}?`,
        'fewer': `Does ${formatNumber(num1)} represent fewer than ${formatNumber(num2)}?`,
        'most': `Which is the most: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
        'least': `Which is the least: ${formatNumber(num1)} or ${formatNumber(num2)}?`
    };

    return phrases[word] || phrases['more than'];
}

/**
 * Evaluate comparison
 * Supports both 2-number comparisons and array comparisons
 * @param {number|number[]} num1 - First number OR array of numbers
 * @param {number} num2 - Second number (only used for 2-number comparisons)
 * @param {string} word - Comparison word
 * @returns {boolean|number} Result of comparison (boolean for yes/no, number for most/least)
 */
export function evaluateComparison(num1, num2, word) {
    // Handle array of numbers (for "most" and "least")
    if (Array.isArray(num1)) {
        const numbers = num1;
        if (word === 'most') {
            return Math.max(...numbers);
        } else if (word === 'least') {
            return Math.min(...numbers);
        }
    }

    // Standard 2-number comparisons
    switch(word) {
        case 'equal to': return num1 === num2;
        case 'more than': return num1 > num2;
        case 'less than': return num1 < num2;
        case 'fewer': return num1 < num2;
        case 'most': return Math.max(num1, num2);
        case 'least': return Math.min(num1, num2);
        default: return num1 > num2;
    }
}

/**
 * Generate object representation description
 */
export function describeObjectRepresentation(count, objectType) {
    const descriptions = {
        'dots': `${count} dots`,
        'stars': `${count} stars`,
        'circles': `${count} circles`,
        'blocks': `${count} blocks`,
        'tallies': `${count} tally marks`
    };

    return descriptions[objectType] || `${count} objects`;
}

/**
 * Generate estimation calculation text
 */
export function generateEstimationCalculationText(num1, num2, operation) {
    const ops = {
        'add': '+',
        'subtract': '-',
        'multiply': '×'
    };

    return `Estimate ${formatNumber(num1)} ${ops[operation]} ${formatNumber(num2)}`;
}

/**
 * Calculate rough estimate by rounding to significant figures
 */
export function calculateRoughEstimate(num1, num2, operation) {
    // Round to nearest 10, 100, or 1000 depending on size
    const roundBase1 = num1 < 100 ? 10 : num1 < 1000 ? 100 : 1000;
    const roundBase2 = num2 < 100 ? 10 : num2 < 1000 ? 100 : 1000;

    const rounded1 = roundToNearest(num1, roundBase1);
    const rounded2 = roundToNearest(num2, roundBase2);

    switch(operation) {
        case 'add': return rounded1 + rounded2;
        case 'subtract': return rounded1 - rounded2;
        case 'multiply': return rounded1 * rounded2;
        default: return rounded1 + rounded2;
    }
}

/**
 * Generate midpoint between two numbers
 */
export function calculateMidpoint(num1, num2) {
    return Math.round((num1 + num2) / 2);
}

/**
 * Generate error bounds for rounding
 * Returns [lower_bound, upper_bound]
 */
export function getErrorBounds(rounded, base) {
    const halfBase = base / 2;
    return [rounded - halfBase, rounded + halfBase];
}

/**
 * Choose appropriate rounding base for a context
 */
export function chooseAppropriateRoundingBase(context, number) {
    const contexts = {
        'population': number < 1000 ? 10 : number < 100000 ? 100 : 1000,
        'money': number < 100 ? 10 : 100,
        'distance': number < 100 ? 10 : number < 1000 ? 100 : 1000,
        'time': number < 100 ? 10 : 100,
        'general': number < 100 ? 10 : number < 1000 ? 100 : 1000
    };

    return contexts[context] || contexts['general'];
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

export default {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    describeNumberLinePosition,
    generateNumberLineMarks,
    findClosestMark,
    generateNumberLineText,
    generateEstimationText,
    findRange,
    formatRange,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateComparisonLanguageText,
    evaluateComparison,
    describeObjectRepresentation,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    calculateMidpoint,
    getErrorBounds,
    chooseAppropriateRoundingBase,
    generateUniqueNumbers
};
