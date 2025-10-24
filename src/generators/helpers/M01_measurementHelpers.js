/**
 * Measurement Helpers
 *
 * Helper functions for M01 Measurement question generators (Years 1-4)
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
 * Format a measurement value with units
 * @param {number} value - The numeric value
 * @param {string} unit - The unit (e.g., 'cm', 'm', 'kg', 'g', 'ml', 'l')
 * @param {boolean} includeSpace - Whether to include space between value and unit
 * @returns {string} Formatted measurement
 */
export function formatMeasurement(value, unit, includeSpace = true) {
    return includeSpace ? `${value} ${unit}` : `${value}${unit}`;
}

/**
 * Convert between metric units
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export function convertUnit(value, fromUnit, toUnit) {
    const conversions = {
        // Length
        'mm_cm': 0.1,
        'cm_mm': 10,
        'cm_m': 0.01,
        'm_cm': 100,
        'm_mm': 1000,
        'mm_m': 0.001,
        // Mass
        'g_kg': 0.001,
        'kg_g': 1000,
        // Capacity
        'ml_l': 0.001,
        'l_ml': 1000
    };

    const key = `${fromUnit}_${toUnit}`;
    if (conversions[key]) {
        return value * conversions[key];
    }

    // If same unit, return value
    if (fromUnit === toUnit) {
        return value;
    }

    throw new Error(`Unknown conversion: ${fromUnit} to ${toUnit}`);
}

/**
 * Generate a money amount in pence
 * @param {number} min - Minimum value in pence
 * @param {number} max - Maximum value in pence
 * @returns {number} Random amount in pence
 */
export function randomMoney(min, max) {
    return randomInt(min, max);
}

/**
 * Format money in pounds and pence
 * @param {number} pence - Amount in pence
 * @returns {string} Formatted as £X.XX
 */
export function formatMoney(pence) {
    const pounds = Math.floor(pence / 100);
    const remainingPence = pence % 100;

    if (pence < 100) {
        return `${pence}p`;
    }

    if (remainingPence === 0) {
        return `£${pounds}`;
    }

    return `£${pounds}.${remainingPence.toString().padStart(2, '0')}`;
}

/**
 * Generate comparison symbols
 */
export const COMPARISON_SYMBOLS = {
    greater: '>',
    less: '<',
    equal: '='
};

/**
 * Get the correct comparison symbol between two values
 * @param {number} a - First value
 * @param {number} b - Second value
 * @returns {string} The comparison symbol
 */
export function getComparisonSymbol(a, b) {
    if (a > b) return COMPARISON_SYMBOLS.greater;
    if (a < b) return COMPARISON_SYMBOLS.less;
    return COMPARISON_SYMBOLS.equal;
}

/**
 * Generate plausible distractors for comparison questions
 * @param {string} correctSymbol - The correct comparison symbol
 * @returns {Array<string>} Array of all three symbols with correct one first
 */
export function getComparisonOptions(correctSymbol) {
    const symbols = ['>', '<', '='];
    // Return with correct answer first
    const filtered = symbols.filter(s => s !== correctSymbol);
    return [correctSymbol, ...filtered];
}
