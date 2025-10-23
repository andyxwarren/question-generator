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
    
    const text = `Complete: ${val1}${unit1} ___ ${val2}${unit2}`;
    const hint = `Think about which is larger. Remember: 1m = 100cm, 1kg = 1000g, 1L = 1000ml.`;
    
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
function generateOrdering(params, level) {
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
        // Regenerate if we have duplicates
        return generateOrdering(params, level);
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
    
    // Get applicable units for this measure type
    let units, question;
    
    if (measureType === 'length') {
        units = ['m', 'cm', 'mm'];
        const value = randomInt(1, 3);
        question = `A table is ${value}m long.`;
    } else if (measureType === 'mass') {
        units = ['kg', 'g'];
        const value = randomInt(1, 5);
        question = `A bag weighs ${value}kg.`;
    } else if (measureType === 'capacity') {
        units = ['L', 'ml'];
        const value = randomInt(1, 3);
        question = `A bottle holds ${value}L.`;
    }
    
    // Ask for either largest or smallest number
    const askLargest = Math.random() < 0.5;
    const questionType = askLargest ? 'LARGEST' : 'SMALLEST';
    
    // Determine correct answer
    let correctAnswer;
    if (askLargest) {
        // Smallest unit gives largest number
        correctAnswer = units[units.length - 1];
    } else {
        // Largest unit gives smallest number
        correctAnswer = units[0];
    }
    
    const text = `${question} Which unit would give the ${questionType} number: ${units.join(', ')}?`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: units,
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
