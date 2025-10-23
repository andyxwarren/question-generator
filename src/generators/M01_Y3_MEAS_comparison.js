/**
 * M01_Y3_MEAS - Year 3 Measurement: Compare with Mixed Units
 * 
 * Curriculum: "compare lengths (m/cm/mm); compare mass (kg/g); 
 * compare volume/capacity (l/ml)"
 */

import {
    randomChoice,
    shuffleArray
} from './helpers/M01_measurementHelpers.js';

/**
 * Random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format number with comma separators for readability (e.g., 1000 → 1,000)
 */
function formatNumber(num) {
    return num.toLocaleString('en-GB');
}

/**
 * Conversion factors for units (to base unit)
 * Base units: m (length), g (mass), ml (capacity)
 */
const CONVERSION_FACTORS = {
    // Length conversions (to meters)
    length: {
        'm': 1,
        'cm': 0.01,
        'mm': 0.001
    },
    // Mass conversions (to grams)
    mass: {
        'kg': 1000,
        'g': 1
    },
    // Capacity conversions (to milliliters)
    capacity: {
        'L': 1000,
        'l': 1000,  // lowercase L
        'ml': 1
    }
};

/**
 * Convert a value to base unit for comparison
 */
function toBaseUnit(value, unit, measureType) {
    const factor = CONVERSION_FACTORS[measureType][unit];
    return value * factor;
}

/**
 * Get comparison symbol between two values (already in same units)
 */
function getComparisonSymbol(val1, val2) {
    if (val1 > val2) return '>';
    if (val1 < val2) return '<';
    return '=';
}

/**
 * Select a random unit pair for a measure type
 */
function getUnitPair(measureType, params) {
    return randomChoice(params.unit_pairs[measureType]);
}

/**
 * Generate two values with different units
 */
function generateMixedUnitValues(measureType, unitPair, params) {
    const [unit1, unit2] = unitPair;
    
    // Generate values that make sense for each unit
    let val1, val2;
    
    if (measureType === 'length') {
        if (unit1 === 'm' && unit2 === 'cm') {
            val1 = randomInt(1, params.max_meters || 5);
            val2 = randomInt(10, params.max_cm || 300);
        } else if (unit1 === 'cm' && unit2 === 'mm') {
            val1 = randomInt(5, params.max_cm || 50);
            val2 = randomInt(10, params.max_mm || 200);
        } else if (unit1 === 'm' && unit2 === 'mm') {
            val1 = randomInt(1, 3);
            val2 = randomInt(500, 2500);
        } else {
            val1 = randomInt(params.min_value, params.max_value);
            val2 = randomInt(params.min_value, params.max_value);
        }
    } else if (measureType === 'mass') {
        if (unit1 === 'kg' && unit2 === 'g') {
            val1 = randomInt(1, params.max_kg || 5);
            val2 = randomInt(100, params.max_g || 3000);
        } else {
            val1 = randomInt(params.min_value, params.max_value);
            val2 = randomInt(params.min_value, params.max_value);
        }
    } else if (measureType === 'capacity') {
        if ((unit1 === 'L' || unit1 === 'l') && unit2 === 'ml') {
            val1 = randomInt(1, params.max_L || 5);
            val2 = randomInt(100, params.max_ml || 3000);
        } else {
            val1 = randomInt(params.min_value, params.max_value);
            val2 = randomInt(params.min_value, params.max_value);
        }
    }
    
    return { val1, unit1, val2, unit2 };
}

/**
 * Generate direct comparison question with mixed units
 */
function generateDirectComparison(params, level) {
    const measureType = randomChoice(params.measure_types);
    const unitPair = getUnitPair(measureType, params);
    const { val1, unit1, val2, unit2 } = generateMixedUnitValues(measureType, unitPair, params);
    
    // Convert to base units for comparison
    const base1 = toBaseUnit(val1, unit1, measureType);
    const base2 = toBaseUnit(val2, unit2, measureType);
    
    // Determine which is larger
    const larger = base1 > base2 ? `${val1}${unit1}` : `${val2}${unit2}`;
    const smaller = base1 < base2 ? `${val1}${unit1}` : `${val2}${unit2}`;
    
    // Randomly ask for larger or smaller
    const askingForLarger = Math.random() < 0.5;
    const questionWord = askingForLarger ? 'greater' : 'less';
    const correctAnswer = askingForLarger ? larger : smaller;
    
    const text = `Which is ${questionWord}: ${val1}${unit1} or ${val2}${unit2}?`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: shuffleArray([`${val1}${unit1}`, `${val2}${unit2}`]),
        module: 'M01_Y3_MEAS',
        operation: 'direct_comparison',
        level
    };
}

/**
 * Generate complete statement question with mixed units
 */
function generateCompleteStatement(params, level) {
    const measureType = randomChoice(params.measure_types);
    const unitPair = getUnitPair(measureType, params);
    const { val1, unit1, val2, unit2 } = generateMixedUnitValues(measureType, unitPair, params);
    
    // Convert to base units for comparison
    const base1 = toBaseUnit(val1, unit1, measureType);
    const base2 = toBaseUnit(val2, unit2, measureType);
    
    const correctSymbol = getComparisonSymbol(base1, base2);

    const text = `Complete: ${formatNumber(val1)}${unit1} ___ ${formatNumber(val2)}${unit2}`;

    // Vary hints by measure type for more targeted support
    const hints = {
        length: 'Remember: 1m = 100cm and 1cm = 10mm',
        mass: 'Remember: 1kg = 1000g',
        capacity: 'Remember: 1L = 1000ml'
    };
    const hint = `Think about which is larger. ${hints[measureType] || hints.length}`;

    return {
        text,
        type: 'text_input',
        answer: correctSymbol,
        hint,
        module: 'M01_Y3_MEAS',
        operation: 'complete_statement',
        level
    };
}

/**
 * Generate ordering question with mixed units
 */
function generateOrdering(params, level, maxAttempts = 10) {
    const measureType = randomChoice(params.measure_types);
    const unitPair = getUnitPair(measureType, params);
    const [unit1, unit2] = unitPair;

    // Generate 3 values with mixed units
    const count = 3;
    const measures = [];

    for (let i = 0; i < count; i++) {
        const useUnit1 = Math.random() < 0.5;
        const unit = useUnit1 ? unit1 : unit2;

        let value;
        if (measureType === 'length') {
            if (unit === 'm') value = randomInt(1, 5);
            else if (unit === 'cm') value = randomInt(50, 400);
            else if (unit === 'mm') value = randomInt(100, 2000);
        } else if (measureType === 'mass') {
            if (unit === 'kg') value = randomInt(1, 5);
            else if (unit === 'g') value = randomInt(500, 4000);
        } else if (measureType === 'capacity') {
            if (unit === 'L' || unit === 'l') value = randomInt(1, 5);
            else if (unit === 'ml') value = randomInt(500, 4000);
        }

        measures.push({
            value,
            unit,
            baseValue: toBaseUnit(value, unit, measureType),
            display: `${value}${unit}`
        });
    }

    // Ensure all measures have different base values
    const baseValues = new Set(measures.map(m => m.baseValue));
    if (baseValues.size < count) {
        // Regenerate if we have duplicates, with recursion protection
        if (maxAttempts > 0) {
            return generateOrdering(params, level, maxAttempts - 1);
        } else {
            // Fallback: force different values by adding small offsets
            console.warn('Unable to generate unique values after 10 attempts, using fallback');
            for (let i = 0; i < measures.length; i++) {
                measures[i].baseValue += i * 0.001; // Tiny offset to ensure uniqueness
            }
        }
    }
    
    // Sort by base value
    const sorted = [...measures].sort((a, b) => a.baseValue - b.baseValue);
    
    // Shuffle for presentation
    const shuffledText = shuffleArray(measures.map(m => m.display)).join(', ');
    
    // Ask for different positions
    const position = randomChoice(['FIRST', 'LAST']);
    const correctAnswer = position === 'FIRST' ? sorted[0].display : sorted[sorted.length - 1].display;
    
    const text = `Put these in order from smallest to largest: ${shuffledText}. Which comes ${position}?`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: shuffleArray(measures.map(m => m.display)),
        module: 'M01_Y3_MEAS',
        operation: 'ordering',
        level
    };
}

/**
 * Generate unit recognition question
 */
function generateUnitRecognition(params, level) {
    const measureType = randomChoice(params.measure_types);

    // Get applicable units and generate question with actual values shown
    let value, baseUnit, smallerUnit, baseValue, convertedValue, question;

    if (measureType === 'length') {
        value = randomInt(1, 3);
        baseUnit = 'm';
        smallerUnit = randomChoice(['cm', 'mm']);

        if (smallerUnit === 'cm') {
            convertedValue = value * 100;
            question = `A table is ${value}m = ${formatNumber(convertedValue)}cm long.`;
        } else {
            convertedValue = value * 1000;
            question = `A table is ${value}m = ${formatNumber(convertedValue)}mm long.`;
        }
        baseValue = `${value}${baseUnit}`;
        convertedValue = `${formatNumber(convertedValue)}${smallerUnit}`;
    } else if (measureType === 'mass') {
        value = randomInt(1, 5);
        baseUnit = 'kg';
        smallerUnit = 'g';
        const grams = value * 1000;
        question = `A bag weighs ${value}kg = ${formatNumber(grams)}g.`;
        baseValue = `${value}${baseUnit}`;
        convertedValue = `${formatNumber(grams)}${smallerUnit}`;
    } else if (measureType === 'capacity') {
        value = randomInt(1, 3);
        baseUnit = 'L';
        smallerUnit = 'ml';
        const ml = value * 1000;
        question = `A bottle holds ${value}L = ${formatNumber(ml)}ml.`;
        baseValue = `${value}${baseUnit}`;
        convertedValue = `${formatNumber(ml)}${smallerUnit}`;
    }

    // Ask which measurement uses the larger number (clearer phrasing)
    const text = `${question} Which measurement uses the LARGER number?`;

    return {
        text,
        type: 'multiple_choice',
        answer: convertedValue,
        options: [baseValue, convertedValue],
        module: 'M01_Y3_MEAS',
        operation: 'unit_recognition',
        level
    };
}

/**
 * Generate a Year 3 measurement comparison question with mixed units
 * @param {object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {object} Question object
 */
export function generateQuestion(params, level) {
    // Select operation
    const operation = randomChoice(params.operations);
    
    // Generate question based on operation
    switch (operation) {
        case 'direct_comparison':
            return generateDirectComparison(params, level);
            
        case 'complete_statement':
            return generateCompleteStatement(params, level);
            
        case 'ordering':
            return generateOrdering(params, level);
            
        case 'unit_recognition':
            return generateUnitRecognition(params, level);
            
        default:
            return generateDirectComparison(params, level);
    }
}

export default {
    moduleId: 'M01_Y3_MEAS',
    generate: generateQuestion
};
