/**
 * M01 Measurement Helper Functions
 * Shared utilities for measurement comparison generators
 */

/**
 * Convert measurement to base unit (cm, g, ml, p)
 * @param {number} value - The numeric value
 * @param {string} unit - The unit (m, cm, mm, kg, g, l, ml, £, p)
 * @returns {number} - Value in base unit
 */
export function convertToBase(value, unit) {
    // Length conversions to cm (base unit)
    if (unit === 'm') return value * 100;
    if (unit === 'cm') return value;
    if (unit === 'mm') return value / 10;

    // Mass conversions to g (base unit)
    if (unit === 'kg') return value * 1000;
    if (unit === 'g') return value;

    // Capacity conversions to ml (base unit)
    if (unit === 'l') return value * 1000;
    if (unit === 'ml') return value;

    // Money conversions to pence (base unit)
    if (unit === '£') return value * 100;  // £2.50 → 250p
    if (unit === 'p') return value;        // 250p → 250p

    throw new Error(`Unknown unit: ${unit}`);
}

/**
 * Get comparative word for measure type
 * @param {string} measureType - 'length', 'mass', 'capacity', or 'money'
 * @returns {string} - Comparative adjective
 */
export function getComparativeWord(measureType) {
    const comparatives = {
        'length': 'longer',
        'mass': 'heavier',
        'capacity': 'holds more',
        'money': 'costs more'
    };
    return comparatives[measureType] || 'more';
}

/**
 * Get opposite comparative word
 * @param {string} measureType - 'length', 'mass', 'capacity', or 'money'
 * @returns {string} - Opposite comparative adjective
 */
export function getOppositeComparative(measureType) {
    const opposites = {
        'length': 'shorter',
        'mass': 'lighter',
        'capacity': 'holds less',
        'money': 'costs less'
    };
    return opposites[measureType] || 'less';
}

/**
 * Shuffle array randomly
 */
export function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Random choice from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random integer between min and max (inclusive)
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate unique random integers
 * @param {number} count - Number of unique values needed
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number[]} - Array of unique random integers
 */
export function generateUniqueValues(count, min, max) {
    if (count > (max - min + 1)) {
        throw new Error('Cannot generate more unique values than range allows');
    }

    const values = new Set();
    while (values.size < count) {
        values.add(randomInt(min, max));
    }
    return Array.from(values);
}

/**
 * Format money with proper decimal places
 * @param {number} value - The numeric value
 * @param {string} unit - The unit ('£' or 'p')
 * @returns {string} - Formatted money string
 */
export function formatMoney(value, unit) {
    if (unit === '£') {
        return `£${value.toFixed(2)}`;  // Always 2 decimals: £5.00
    } else {
        return `${Math.round(value)}p`;  // No decimals for pence: 250p
    }
}

/**
 * Generate random money value based on parameters
 * @param {object} params - Parameter object for current level
 * @param {string} unit - The unit ('£' or 'p')
 * @returns {number} - Random money value
 */
export function generateMoneyValue(params, unit) {
    const config = params.money;

    if (unit === 'p') {
        return randomInt(config.min_value_p, config.max_value_p);
    } else if (unit === '£') {
        const wholePounds = randomInt(config.min_value_pounds, config.max_value_pounds);

        // Handle decimal_step constraint for Level 2-4
        if (config.decimal_step !== undefined) {
            if (config.decimal_step === 0) {
                // Level 2: Only .00 or .50
                const pence = randomChoice(config.decimal_values || [0, 50]);
                return wholePounds + (pence / 100);
            } else if (config.decimal_step === 25) {
                // Level 3: .00, .25, .50, .75
                const penceSteps = Math.floor(100 / config.decimal_step);
                const pence = randomChoice([...Array(penceSteps)].map((_, i) => i * config.decimal_step));
                return wholePounds + (pence / 100);
            } else if (config.decimal_step === 1) {
                // Level 4: Any pence value
                const pence = randomInt(0, 99);
                return wholePounds + (pence / 100);
            }
        }

        // Fallback: whole pounds only
        return wholePounds;
    }

    throw new Error(`Unknown money unit: ${unit}`);
}
