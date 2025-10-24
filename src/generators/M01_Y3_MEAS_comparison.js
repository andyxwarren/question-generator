/**
 * M01_Y3_MEAS: Compare and Order Measures with Units (Year 3)
 *
 * Generates questions for comparing and ordering measurements with standard metric units:
 * - Lengths (m, cm, mm)
 * - Mass (kg, g)
 * - Volume/Capacity (l, ml)
 *
 * Year 3 focus: Comparing numeric measurements with same and mixed units,
 * building on Year 2's symbolic comparisons.
 *
 * Progression:
 * - Level 1: Same-unit comparisons (e.g., 5 cm vs 12 cm)
 * - Level 2: Multiple units introduced, still same-unit comparisons
 * - Level 3: Mixed-unit comparisons (e.g., 2 m vs 150 cm) - KEY YEAR 3 SKILL
 * - Level 4: Complex mixed units, error identification, multi-step reasoning
 */

import {
    convertToBase,
    getComparativeWord,
    getOppositeComparative,
    shuffle,
    randomChoice,
    randomInt,
    generateUniqueValues
} from './helpers/M01_measurementHelpers.js';

/**
 * Get random value for a measurement type and unit
 */
function getRandomValue(params, measureType, unit) {
    const config = params[measureType];

    if (unit === 'm') {
        return randomInt(config.min_value_m || 1, config.max_value_m || 10);
    } else if (unit === 'cm') {
        return randomInt(config.min_value_cm || 1, config.max_value_cm || 100);
    } else if (unit === 'mm') {
        return randomInt(config.min_value_mm || 1, config.max_value_mm || 100);
    } else if (unit === 'kg') {
        return randomInt(config.min_value_kg || 1, config.max_value_kg || 10);
    } else if (unit === 'g') {
        return randomInt(config.min_value_g || 10, config.max_value_g || 1000);
    } else if (unit === 'l') {
        return randomInt(config.min_value_l || 1, config.max_value_l || 10);
    } else if (unit === 'ml') {
        return randomInt(config.min_value_ml || 50, config.max_value_ml || 1000);
    }

    return randomInt(1, 100); // fallback
}

/**
 * Select two convertible units for mixed-unit comparison
 */
function selectConvertibleUnits(measureType) {
    if (measureType === 'length') {
        const pairs = [
            ['m', 'cm'],
            ['cm', 'mm'],
            ['m', 'mm']  // Advanced: requires two-step conversion
        ];
        return randomChoice(pairs);
    } else if (measureType === 'mass') {
        return ['kg', 'g'];
    } else if (measureType === 'capacity') {
        return ['l', 'ml'];
    }
    return ['cm', 'cm']; // fallback
}

/**
 * OPERATION 1: Direct Comparison
 * Shows two measurements and asks which is bigger/smaller
 * Levels 1-4: Same-unit at L1-2, mixed-unit at L3-4
 */
function generateDirectComparison(params, level) {
    const measureType = randomChoice(params.measure_types);
    const config = params[measureType];

    let value1, value2, unit1, unit2, value1Base, value2Base;

    if (level <= 2 || params.unit_mixing === 'none') {
        // Same-unit comparison
        const unit = randomChoice(config.units);
        value1 = getRandomValue(params, measureType, unit);
        value2 = getRandomValue(params, measureType, unit);

        // Ensure different values
        while (value2 === value1) {
            value2 = getRandomValue(params, measureType, unit);
        }

        unit1 = unit2 = unit;
        value1Base = convertToBase(value1, unit1);
        value2Base = convertToBase(value2, unit2);
    } else {
        // Mixed-unit comparison (Level 3-4)
        const units = selectConvertibleUnits(measureType);
        unit1 = units[0];
        unit2 = units[1];

        value1 = getRandomValue(params, measureType, unit1);
        value2 = getRandomValue(params, measureType, unit2);

        value1Base = convertToBase(value1, unit1);
        value2Base = convertToBase(value2, unit2);

        // Ensure the comparison is non-trivial (not too obvious)
        // Avoid exact conversions at lower levels
        if (level === 3 && value1Base === value2Base && Math.random() > 0.3) {
            // Regenerate to avoid equals at L3 (make it rare)
            value2 = getRandomValue(params, measureType, unit2);
            value2Base = convertToBase(value2, unit2);
        }
    }

    const comparative = getComparativeWord(measureType);
    const questionText = `Which is ${comparative}: ${value1} ${unit1} or ${value2} ${unit2}?`;

    let correctAnswer, wrongAnswer;
    if (value1Base > value2Base) {
        correctAnswer = `${value1} ${unit1}`;
        wrongAnswer = `${value2} ${unit2}`;
    } else if (value1Base < value2Base) {
        correctAnswer = `${value2} ${unit2}`;
        wrongAnswer = `${value1} ${unit1}`;
    } else {
        // Equal values
        correctAnswer = 'They are equal';
        wrongAnswer = `${value1} ${unit1}`;
    }

    const options = value1Base === value2Base
        ? shuffle(['They are equal', `${value1} ${unit1}`, `${value2} ${unit2}`])
        : shuffle([correctAnswer, wrongAnswer, 'They are equal']);

    return {
        text: questionText,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * OPERATION 2: Symbol Insertion
 * Student completes comparison by typing >, < or =
 * Levels 1-4: Same-unit at L1-2, mixed-unit at L3-4
 */
function generateSymbolInsertion(params, level) {
    const measureType = randomChoice(params.measure_types);
    const config = params[measureType];

    let value1, value2, unit1, unit2;

    if (level <= 2 || params.unit_mixing === 'none') {
        // Same-unit comparison
        const unit = randomChoice(config.units);
        value1 = getRandomValue(params, measureType, unit);
        value2 = getRandomValue(params, measureType, unit);
        unit1 = unit2 = unit;
    } else {
        // Mixed-unit comparison (Level 3-4)
        const units = selectConvertibleUnits(measureType);
        unit1 = units[0];
        unit2 = units[1];
        value1 = getRandomValue(params, measureType, unit1);
        value2 = getRandomValue(params, measureType, unit2);
    }

    const value1Base = convertToBase(value1, unit1);
    const value2Base = convertToBase(value2, unit2);

    let answer;
    if (value1Base > value2Base) {
        answer = '>';
    } else if (value1Base < value2Base) {
        answer = '<';
    } else {
        answer = '=';
    }

    const questionText = `Complete the comparison: ${value1} ${unit1} ___ ${value2} ${unit2}`;

    return {
        text: questionText,
        type: 'text_input',
        answer: answer,
        hint: 'Use >, < or =',
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * OPERATION 3: Ordering Measurements
 * Order 3-4 measurements from smallest to largest
 * Levels 2-4 only (Level 1 does pairwise only)
 */
function generateOrdering(params, level) {
    const measureType = randomChoice(params.measure_types);
    const config = params[measureType];
    const count = params.ordering_count || 3;

    let measurements = [];

    if (level === 2 || params.unit_mixing === 'none') {
        // Same-unit ordering
        const unit = randomChoice(config.units);
        const values = generateUniqueValues(count,
            getRandomValue(params, measureType, unit) - 50,
            getRandomValue(params, measureType, unit) + 50
        );

        measurements = values.map(v => ({
            value: Math.max(1, v),  // Ensure positive
            unit: unit,
            baseValue: convertToBase(Math.max(1, v), unit)
        }));
    } else {
        // Mixed-unit ordering (Level 3-4)
        const availableUnits = config.units;

        for (let i = 0; i < count; i++) {
            const unit = randomChoice(availableUnits);
            const value = getRandomValue(params, measureType, unit);
            measurements.push({
                value: value,
                unit: unit,
                baseValue: convertToBase(value, unit)
            });
        }

        // Ensure all baseValues are unique
        const baseValues = measurements.map(m => m.baseValue);
        const uniqueBaseValues = new Set(baseValues);
        if (uniqueBaseValues.size !== baseValues.length) {
            // Regenerate if we have duplicates
            return generateOrdering(params, level);
        }
    }

    // Create display strings
    const displayStrings = measurements.map(m => `${m.value} ${m.unit}`);

    // Sort by base value
    const sorted = [...measurements].sort((a, b) => a.baseValue - b.baseValue);
    const correctAnswer = sorted.map(m => `${m.value} ${m.unit}`).join(', ');

    // Create plausible wrong options
    const shuffled1 = shuffle([...measurements]).map(m => `${m.value} ${m.unit}`).join(', ');
    const reversed = sorted.reverse().map(m => `${m.value} ${m.unit}`).join(', ');

    const questionText = `Order these from smallest to largest: ${displayStrings.join(', ')}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle([correctAnswer, shuffled1, reversed]),
        answer: correctAnswer,
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * OPERATION 4: Conversion Sense (True/False)
 * Evaluate if a measurement comparison statement is true or false
 * Levels 3-4 only (requires mixed-unit understanding)
 */
function generateConversionSense(params, level) {
    const measureType = randomChoice(params.measure_types);
    const config = params[measureType];

    const units = selectConvertibleUnits(measureType);
    const unit1 = units[0];
    const unit2 = units[1];

    const value1 = getRandomValue(params, measureType, unit1);
    const value2 = getRandomValue(params, measureType, unit2);

    const value1Base = convertToBase(value1, unit1);
    const value2Base = convertToBase(value2, unit2);

    // Create statement (sometimes correct, sometimes wrong)
    const isCorrectStatement = Math.random() > 0.5;

    let statement, correctAnswer;

    if (isCorrectStatement) {
        // True statement
        if (value1Base > value2Base) {
            statement = `${value1} ${unit1} is more than ${value2} ${unit2}`;
        } else if (value1Base < value2Base) {
            statement = `${value1} ${unit1} is less than ${value2} ${unit2}`;
        } else {
            statement = `${value1} ${unit1} is the same as ${value2} ${unit2}`;
        }
        correctAnswer = 'True';
    } else {
        // False statement (deliberately wrong)
        if (value1Base > value2Base) {
            statement = `${value1} ${unit1} is less than ${value2} ${unit2}`;  // Wrong!
        } else if (value1Base < value2Base) {
            statement = `${value1} ${unit1} is more than ${value2} ${unit2}`;  // Wrong!
        } else {
            // For equals, make a wrong comparison
            statement = `${value1} ${unit1} is more than ${value2} ${unit2}`;
        }
        correctAnswer = 'False';
    }

    const questionText = `Is this statement true or false?\n"${statement}"`;

    return {
        text: questionText,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: correctAnswer,
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * OPERATION 5: Error Identification
 * Find the incorrect comparison among 3 statements
 * Level 4 only (advanced critical thinking)
 */
function generateErrorIdentification(params, level) {
    const measureType = randomChoice(params.measure_types);
    const config = params[measureType];

    const statements = [];

    // Statement 1: Correct same-unit comparison
    const unit1 = randomChoice(config.units);
    const val1a = getRandomValue(params, measureType, unit1);
    const val1b = getRandomValue(params, measureType, unit1);

    while (val1a === val1b) {
        val1b = getRandomValue(params, measureType, unit1);
    }

    const symbol1 = val1a > val1b ? '>' : '<';
    statements.push(`${val1a} ${unit1} ${symbol1} ${val1b} ${unit1}`);

    // Statement 2: Correct mixed-unit comparison
    const units = selectConvertibleUnits(measureType);
    const val2a = getRandomValue(params, measureType, units[0]);
    const val2b = getRandomValue(params, measureType, units[1]);

    const val2aBase = convertToBase(val2a, units[0]);
    const val2bBase = convertToBase(val2b, units[1]);

    let symbol2;
    if (val2aBase > val2bBase) symbol2 = '>';
    else if (val2aBase < val2bBase) symbol2 = '<';
    else symbol2 = '=';

    statements.push(`${val2a} ${units[0]} ${symbol2} ${val2b} ${units[1]}`);

    // Statement 3: INCORRECT mixed-unit comparison
    const val3a = getRandomValue(params, measureType, units[0]);
    const val3b = getRandomValue(params, measureType, units[1]);

    const val3aBase = convertToBase(val3a, units[0]);
    const val3bBase = convertToBase(val3b, units[1]);

    // Use WRONG symbol deliberately
    let wrongSymbol;
    if (val3aBase > val3bBase) {
        wrongSymbol = '<';  // Should be >, but we use < (WRONG!)
    } else if (val3aBase < val3bBase) {
        wrongSymbol = '>';  // Should be <, but we use > (WRONG!)
    } else {
        wrongSymbol = '>';  // Should be =, but we use > (WRONG!)
    }

    const incorrectStatement = `${val3a} ${units[0]} ${wrongSymbol} ${val3b} ${units[1]}`;
    statements.push(incorrectStatement);

    const questionText = 'Which comparison is incorrect?';

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle(statements),
        answer: incorrectStatement,
        module: 'M01_Y3_MEAS',
        level: level
    };
}

/**
 * Main question generator
 * Selects operation based on level and params, generates appropriate question
 */
export function generateQuestion(params, level) {
    // Filter operations by level
    let availableOperations = [];

    if (level === 1) {
        availableOperations = ['direct_comparison', 'symbol_insertion'];
    } else if (level === 2) {
        availableOperations = ['direct_comparison', 'symbol_insertion', 'ordering'];
    } else if (level === 3) {
        availableOperations = ['direct_comparison', 'symbol_insertion', 'ordering', 'conversion_sense'];
    } else if (level === 4) {
        availableOperations = ['direct_comparison', 'symbol_insertion', 'ordering', 'conversion_sense', 'error_identification'];
    }

    const selectedOperation = randomChoice(availableOperations);

    switch (selectedOperation) {
        case 'direct_comparison':
            return generateDirectComparison(params, level);
        case 'symbol_insertion':
            return generateSymbolInsertion(params, level);
        case 'ordering':
            return generateOrdering(params, level);
        case 'conversion_sense':
            return generateConversionSense(params, level);
        case 'error_identification':
            return generateErrorIdentification(params, level);
        default:
            return generateDirectComparison(params, level);
    }
}

export default {
    moduleId: 'M01_Y3_MEAS',
    generate: generateQuestion
};
