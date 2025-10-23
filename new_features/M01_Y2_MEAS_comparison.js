/**
 * M01_Y2_MEAS - Year 2 Measurement: Compare and Order with Symbols
 * 
 * Curriculum: "compare and order lengths, mass, volume/capacity and record 
 * the results using >, < and ="
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
 * Get a random unit for a measure type
 */
function getRandomUnit(measureType, params) {
    return randomChoice(params.units[measureType]);
}

/**
 * Generate two values for comparison
 */
function generateTwoValues(min, max, allowEqual = false) {
    const val1 = randomInt(min, max);
    let val2;
    
    if (allowEqual && Math.random() < 0.2) {
        // 20% chance of equal values
        val2 = val1;
    } else {
        // Ensure different values
        do {
            val2 = randomInt(min, max);
        } while (val2 === val1);
    }
    
    return [val1, val2];
}

/**
 * Get the correct comparison symbol
 */
function getComparisonSymbol(val1, val2) {
    if (val1 > val2) return '>';
    if (val1 < val2) return '<';
    return '=';
}

/**
 * Generate symbol selection question (multiple choice)
 */
function generateSymbolSelection(params, level) {
    const measureType = randomChoice(params.measure_types);
    const unit = getRandomUnit(measureType, params);
    const [val1, val2] = generateTwoValues(params.min_value, params.max_value, level >= 3);
    
    const correctSymbol = getComparisonSymbol(val1, val2);
    
    const text = `${val1}${unit} ___ ${val2}${unit}. Which symbol goes in the gap?`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctSymbol,
        options: ['>', '<', '='],
        module: 'M01_Y2_MEAS',
        operation: 'symbol_selection',
        level
    };
}

/**
 * Generate complete statement question (text input)
 */
function generateCompleteStatement(params, level) {
    const measureType = randomChoice(params.measure_types);
    const unit = getRandomUnit(measureType, params);
    const [val1, val2] = generateTwoValues(params.min_value, params.max_value, level >= 3);
    
    const correctSymbol = getComparisonSymbol(val1, val2);
    
    const text = `Complete: ${val1}${unit} ___ ${val2}${unit}`;
    const hint = `Use >, < or = to show which is greater, less than, or equal.`;
    
    return {
        text,
        type: 'text_input',
        answer: correctSymbol,
        hint,
        module: 'M01_Y2_MEAS',
        operation: 'complete_statement',
        level
    };
}

/**
 * Generate ordering question (multiple choice)
 */
function generateOrdering(params, level) {
    const measureType = randomChoice(params.measure_types);
    const unit = getRandomUnit(measureType, params);
    
    // Generate distinct values
    const count = params.ordering_count;
    const values = [];
    
    while (values.length < count) {
        const val = randomInt(params.min_value, params.max_value);
        if (!values.includes(val)) {
            values.push(val);
        }
    }
    
    // Sort for correct ordering
    const sortedValues = [...values].sort((a, b) => a - b);
    
    // Shuffle for presentation
    const shuffledText = shuffleArray(values.map(v => `${v}${unit}`)).join(', ');
    
    // Ask for different positions
    const positions = ['FIRST', 'SECOND', 'LAST'];
    const position = randomChoice(positions.slice(0, count));
    
    let correctAnswer;
    if (position === 'FIRST') {
        correctAnswer = `${sortedValues[0]}${unit}`;
    } else if (position === 'SECOND') {
        correctAnswer = `${sortedValues[1]}${unit}`;
    } else { // LAST
        correctAnswer = `${sortedValues[sortedValues.length - 1]}${unit}`;
    }
    
    const text = `Put these in order from smallest to largest: ${shuffledText}. Which comes ${position}?`;
    
    // Options are all the values
    const options = sortedValues.map(v => `${v}${unit}`);
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: shuffleArray(options),
        module: 'M01_Y2_MEAS',
        operation: 'ordering',
        level
    };
}

/**
 * Generate true/false statement question
 */
function generateTrueFalse(params, level) {
    const measureType = randomChoice(params.measure_types);
    const unit = getRandomUnit(measureType, params);
    const [val1, val2] = generateTwoValues(params.min_value, params.max_value, false);
    
    const correctSymbol = getComparisonSymbol(val1, val2);
    
    // Randomly choose correct or incorrect symbol
    const allSymbols = ['>', '<', '='];
    const useCorrect = Math.random() < 0.5;
    const displaySymbol = useCorrect ? correctSymbol : randomChoice(allSymbols.filter(s => s !== correctSymbol));
    
    const text = `True or False: ${val1}${unit} ${displaySymbol} ${val2}${unit}`;
    const answer = useCorrect ? 'True' : 'False';
    
    return {
        text,
        type: 'multiple_choice',
        answer,
        options: ['True', 'False'],
        module: 'M01_Y2_MEAS',
        operation: 'true_false',
        level
    };
}

/**
 * Generate a Year 2 measurement comparison question with symbols
 * @param {object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {object} Question object
 */
export function generateQuestion(params, level) {
    // Select operation based on available operations for this level
    const operation = randomChoice(params.operations);
    
    // Generate question based on operation
    switch (operation) {
        case 'symbol_selection':
            return generateSymbolSelection(params, level);
            
        case 'complete_statement':
            return generateCompleteStatement(params, level);
            
        case 'ordering':
            return generateOrdering(params, level);
            
        case 'true_false':
            return generateTrueFalse(params, level);
            
        default:
            // Fallback to symbol selection
            return generateSymbolSelection(params, level);
    }
}

export default {
    moduleId: 'M01_Y2_MEAS',
    generate: generateQuestion
};
