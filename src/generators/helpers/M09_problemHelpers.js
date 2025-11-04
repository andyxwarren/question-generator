/**
 * M09 Measurement Problem Solving Helpers
 *
 * Helper functions for M09 question generators (Years 2-6)
 */

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random decimal in range [min, max] with specified decimal places
 */
export function randomDecimal(min, max, decimalPlaces = 2) {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimalPlaces));
}

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Format money amount based on unit type
 * @param {number} value - Value (in pence for pence_only, in pounds for pounds_only, as decimal for mixed)
 * @param {string} unit - Unit type ('pence_only', 'pounds_only', 'mixed', 'decimal')
 * @returns {string} Formatted money string
 */
export function formatMoney(value, unit = 'pence_only') {
    if (unit === 'pence_only') {
        return `${Math.round(value)}p`;
    } else if (unit === 'pounds_only') {
        return `£${Math.round(value)}`;
    } else if (unit === 'mixed' || unit === 'mixed_simple' || unit === 'decimal') {
        // Convert to proper decimal format
        const pounds = typeof value === 'number' ? value : parseFloat(value);
        return `£${pounds.toFixed(2)}`;
    }
    return `£${value}`;
}

/**
 * Format a measurement value with mixed units (e.g., 2m 35cm)
 * @param {number} valueInSmallUnit - Value in smaller unit (e.g., cm, g, ml)
 * @param {string} measureType - Type of measurement ('length', 'mass', 'capacity')
 * @returns {string} Formatted measurement
 */
export function formatMixedUnit(valueInSmallUnit, measureType) {
    if (measureType === 'length') {
        // Assume value is in cm, convert to m and cm
        const metres = Math.floor(valueInSmallUnit / 100);
        const cms = valueInSmallUnit % 100;
        if (metres === 0) return `${cms}cm`;
        if (cms === 0) return `${metres}m`;
        return `${metres}m ${cms}cm`;
    } else if (measureType === 'mass') {
        // Assume value is in g, convert to kg and g
        const kgs = Math.floor(valueInSmallUnit / 1000);
        const grams = valueInSmallUnit % 1000;
        if (kgs === 0) return `${grams}g`;
        if (grams === 0) return `${kgs}kg`;
        return `${kgs}kg ${grams}g`;
    } else if (measureType === 'capacity') {
        // Assume value is in ml, convert to l and ml
        const litres = Math.floor(valueInSmallUnit / 1000);
        const mls = valueInSmallUnit % 1000;
        if (litres === 0) return `${mls}ml`;
        if (mls === 0) return `${litres}l`;
        return `${litres}l ${mls}ml`;
    }
    return `${valueInSmallUnit}`;
}

/**
 * Format decimal measurement (e.g., 2.35m, 1.5kg, 2.3l)
 * @param {number} value - Decimal value
 * @param {string} unit - Unit (e.g., 'm', 'kg', 'l')
 * @param {number} dp - Decimal places
 * @returns {string} Formatted measurement
 */
export function formatDecimalMeasure(value, unit, dp = 2) {
    return `${value.toFixed(dp)}${unit}`;
}

/**
 * Generate a realistic context for a problem
 * @param {Array<string>} contexts - Array of context types
 * @param {string} operation - Operation type
 * @returns {Object} Context object with subject, verb, and item names
 */
export function generateContext(contexts, operation) {
    const context = randomChoice(contexts);

    const contextData = {
        shopping: {
            subjects: ['Sarah', 'Tom', 'Emma', 'Jack', 'Lily', 'You'],
            items: ['a toy', 'a book', 'a pencil', 'stickers', 'a game', 'sweets'],
            verbs: ['buys', 'wants', 'sees'],
            locations: ['at the shop', 'at the store']
        },
        pocket_money: {
            subjects: ['Sarah', 'Tom', 'Emma', 'Jack', 'Lily', 'You'],
            items: ['pocket money', 'birthday money', 'savings'],
            verbs: ['has', 'gets', 'receives', 'saves']
        },
        saving: {
            subjects: ['Sarah', 'Tom', 'Emma', 'Jack', 'Lily', 'You'],
            items: ['money', 'savings', 'coins'],
            verbs: ['saves', 'has saved', 'collects']
        },
        recipes: {
            subjects: ['A recipe', 'The instructions', 'The cookbook'],
            items: ['flour', 'sugar', 'butter', 'milk', 'water', 'ingredients'],
            verbs: ['needs', 'uses', 'requires']
        },
        DIY: {
            subjects: ['Dad', 'Mum', 'A builder', 'You'],
            items: ['wood', 'rope', 'wire', 'fabric', 'tape'],
            verbs: ['needs', 'cuts', 'measures', 'uses']
        },
        science: {
            subjects: ['The experiment', 'The scientist', 'You'],
            items: ['liquid', 'solution', 'substance', 'chemical', 'sample'],
            verbs: ['needs', 'uses', 'measures', 'requires']
        },
        sports: {
            subjects: ['Tom', 'Sarah', 'The runner', 'The athlete', 'You'],
            items: ['distance', 'track', 'course', 'route'],
            verbs: ['runs', 'walks', 'cycles', 'travels']
        },
        travel: {
            subjects: ['The car', 'The bus', 'The train', 'You'],
            items: ['distance', 'journey', 'trip'],
            verbs: ['travels', 'goes', 'drives']
        }
    };

    const data = contextData[context] || contextData.shopping;

    return {
        subject: randomChoice(data.subjects),
        item: randomChoice(data.items),
        verb: randomChoice(data.verbs),
        location: data.locations ? randomChoice(data.locations) : '',
        contextType: context
    };
}

/**
 * Generate item names for shopping contexts
 * @param {number} count - Number of items needed
 * @returns {Array<string>} Array of item names
 */
export function generateShoppingItems(count) {
    const items = [
        'a pencil', 'a rubber', 'a ruler', 'a notebook', 'a pen',
        'a toy car', 'a ball', 'a puzzle', 'a game', 'a book',
        'an apple', 'a banana', 'an orange', 'sweets', 'a drink',
        'stickers', 'a comic', 'a magazine', 'a card', 'crayons'
    ];

    const selected = [];
    const shuffled = [...items].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        selected.push(shuffled[i]);
    }

    return selected;
}

/**
 * Convert between metric units
 * @param {number} value - Value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export function convertUnits(value, fromUnit, toUnit) {
    const conversions = {
        // Length
        'km_m': 1000,
        'm_km': 0.001,
        'm_cm': 100,
        'cm_m': 0.01,
        'cm_mm': 10,
        'mm_cm': 0.1,
        'm_mm': 1000,
        'mm_m': 0.001,
        'km_cm': 100000,
        'cm_km': 0.00001,
        // Mass
        't_kg': 1000,
        'kg_t': 0.001,
        'kg_g': 1000,
        'g_kg': 0.001,
        // Capacity
        'l_ml': 1000,
        'ml_l': 0.001,
        'm3_l': 1000,
        'l_m3': 0.001,
        'cm3_ml': 1,
        'ml_cm3': 1,
        'm3_cm3': 1000000,
        'cm3_m3': 0.000001,
        // Area
        'km2_m2': 1000000,
        'm2_km2': 0.000001,
        'm2_cm2': 10000,
        'cm2_m2': 0.0001,
        'cm2_mm2': 100,
        'mm2_cm2': 0.01
    };

    const key = `${fromUnit}_${toUnit}`;
    if (conversions[key]) {
        return value * conversions[key];
    }

    if (fromUnit === toUnit) {
        return value;
    }

    throw new Error(`Unknown conversion: ${fromUnit} to ${toUnit}`);
}

/**
 * Round to avoid floating point precision issues
 * @param {number} value - Value to round
 * @param {number} dp - Decimal places
 * @returns {number} Rounded value
 */
export function roundTo(value, dp = 2) {
    const multiplier = Math.pow(10, dp);
    return Math.round(value * multiplier) / multiplier;
}

/**
 * Generate a realistic price for an item
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @param {boolean} roundTo25p - Whether to round to 25p increments
 * @returns {number} Price value
 */
export function generateRealisticPrice(min, max, roundTo25p = false) {
    let price = randomDecimal(min, max, 2);

    if (roundTo25p) {
        // Round to nearest 0.25
        price = Math.round(price * 4) / 4;
    }

    return price;
}
