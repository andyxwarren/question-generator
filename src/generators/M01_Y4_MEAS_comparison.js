/**
 * M01_Y4_MEAS: Compare Measures Including Money (Year 4)
 *
 * Generates questions for comparing and ordering measurements with standard metric units
 * PLUS money in pounds and pence:
 * - Lengths (m, cm, mm)
 * - Mass (kg, g)
 * - Volume/Capacity (l, ml)
 * - Money (£, p) - NEW in Year 4
 *
 * Year 4 focus: Comparing different measures INCLUDING money in pounds and pence,
 * building on Year 3's mixed-unit comparisons.
 *
 * Progression:
 * - Level 1: Same-unit comparisons, pence only (e.g., 50p vs 120p)
 * - Level 2: Pounds introduced but kept separate (e.g., £3 vs £7, OR 250p vs 180p)
 * - Level 3: Mixed currency comparisons (e.g., £2.50 vs 300p) - KEY YEAR 4 SKILL
 * - Level 4: Complex money, multi-step practical problems, error identification
 */

import {
    convertToBase,
    getComparativeWord,
    getOppositeComparative,
    shuffle,
    randomChoice,
    randomInt,
    generateUniqueValues,
    formatMoney,
    generateMoneyValue
} from './helpers/M01_measurementHelpers.js';

/**
 * Get random value for a measurement type and unit
 */
function getRandomValue(params, measureType, unit) {
    // Special handling for money
    if (measureType === 'money') {
        return generateMoneyValue(params, unit);
    }

    // Standard metric measurements
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
 * Format measurement value with unit
 */
function formatMeasurement(value, unit) {
    if (unit === '£' || unit === 'p') {
        return formatMoney(value, unit);
    }
    return `${value} ${unit}`;
}

/**
 * Select two convertible units for mixed-unit comparison
 */
function selectConvertibleUnits(measureType, params) {
    if (measureType === 'length') {
        const pairs = [
            ['m', 'cm'],
            ['cm', 'mm'],
            ['m', 'mm']  // Advanced: requires understanding both conversions
        ];
        return randomChoice(pairs);
    } else if (measureType === 'mass') {
        return ['kg', 'g'];
    } else if (measureType === 'capacity') {
        return ['l', 'ml'];
    } else if (measureType === 'money') {
        return ['£', 'p'];
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
    const config = measureType === 'money' ? params.money : params[measureType];

    let value1, value2, unit1, unit2, value1Base, value2Base;

    // Determine if we should use mixed units
    const useMixedUnits = (level >= 3 && params.unit_mixing === 'within_type');

    if (!useMixedUnits || (measureType === 'money' && !params.money.allow_mixed_notation)) {
        // Same-unit comparison
        const unit = randomChoice(config.units);
        value1 = getRandomValue(params, measureType, unit);
        value2 = getRandomValue(params, measureType, unit);

        // Ensure different values
        let attempts = 0;
        while (value2 === value1 && attempts < 10) {
            value2 = getRandomValue(params, measureType, unit);
            attempts++;
        }

        unit1 = unit2 = unit;
        value1Base = convertToBase(value1, unit1);
        value2Base = convertToBase(value2, unit2);
    } else {
        // Mixed-unit comparison (Level 3-4)
        const units = selectConvertibleUnits(measureType, params);
        unit1 = units[0];
        unit2 = units[1];

        value1 = getRandomValue(params, measureType, unit1);
        value2 = getRandomValue(params, measureType, unit2);

        value1Base = convertToBase(value1, unit1);
        value2Base = convertToBase(value2, unit2);

        // Ensure the comparison is non-trivial (not too obvious)
        if (level === 3 && value1Base === value2Base && Math.random() > 0.3) {
            // Regenerate to avoid equals at L3 (make it rare)
            value2 = getRandomValue(params, measureType, unit2);
            value2Base = convertToBase(value2, unit2);
        }
    }

    const comparative = getComparativeWord(measureType);
    const questionText = `Which is ${comparative}: ${formatMeasurement(value1, unit1)} or ${formatMeasurement(value2, unit2)}?`;

    let correctAnswer, wrongAnswer;
    if (value1Base > value2Base) {
        correctAnswer = formatMeasurement(value1, unit1);
        wrongAnswer = formatMeasurement(value2, unit2);
    } else if (value1Base < value2Base) {
        correctAnswer = formatMeasurement(value2, unit2);
        wrongAnswer = formatMeasurement(value1, unit1);
    } else {
        // Equal values
        correctAnswer = 'They are equal';
        wrongAnswer = formatMeasurement(value1, unit1);
    }

    const options = value1Base === value2Base
        ? shuffle(['They are equal', formatMeasurement(value1, unit1), formatMeasurement(value2, unit2)])
        : shuffle([correctAnswer, wrongAnswer, 'They are equal']);

    return {
        text: questionText,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        module: 'M01_Y4_MEAS',
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
    const config = measureType === 'money' ? params.money : params[measureType];

    let value1, value2, unit1, unit2;

    // Determine if we should use mixed units
    const useMixedUnits = (level >= 3 && params.unit_mixing === 'within_type');

    if (!useMixedUnits || (measureType === 'money' && !params.money.allow_mixed_notation)) {
        // Same-unit comparison
        const unit = randomChoice(config.units);
        value1 = getRandomValue(params, measureType, unit);
        value2 = getRandomValue(params, measureType, unit);
        unit1 = unit2 = unit;
    } else {
        // Mixed-unit comparison (Level 3-4)
        const units = selectConvertibleUnits(measureType, params);
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

    const questionText = `Complete the comparison: ${formatMeasurement(value1, unit1)} ___ ${formatMeasurement(value2, unit2)}`;

    return {
        text: questionText,
        type: 'text_input',
        answer: answer,
        hint: 'Use >, < or =',
        module: 'M01_Y4_MEAS',
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
    const config = measureType === 'money' ? params.money : params[measureType];
    const count = params.ordering_count || 3;

    let measurements = [];

    // Determine if we should use mixed units
    const useMixedUnits = (level >= 3 && params.unit_mixing === 'within_type');

    if (!useMixedUnits || (measureType === 'money' && !params.money.allow_mixed_notation)) {
        // Same-unit ordering
        const unit = randomChoice(config.units);

        // Generate range for unique values
        const sampleValue = getRandomValue(params, measureType, unit);
        const min = Math.max(1, sampleValue - 50);
        const max = sampleValue + 50;

        const values = generateUniqueValues(count, min, max);

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

        // Ensure all baseValues are unique (regenerate if duplicates)
        const baseValues = measurements.map(m => m.baseValue);
        const uniqueBaseValues = new Set(baseValues);
        if (uniqueBaseValues.size !== baseValues.length) {
            // Regenerate if we have duplicates
            return generateOrdering(params, level);
        }
    }

    // Create display strings
    const displayStrings = measurements.map(m => formatMeasurement(m.value, m.unit));

    // Sort by base value
    const sorted = [...measurements].sort((a, b) => a.baseValue - b.baseValue);
    const correctAnswer = sorted.map(m => formatMeasurement(m.value, m.unit)).join(', ');

    // Create plausible wrong options
    const shuffled1 = shuffle([...measurements]).map(m => formatMeasurement(m.value, m.unit)).join(', ');
    const reversed = [...sorted].reverse().map(m => formatMeasurement(m.value, m.unit)).join(', ');

    const questionText = `Order these from smallest to largest: ${displayStrings.join(', ')}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle([correctAnswer, shuffled1, reversed]),
        answer: correctAnswer,
        module: 'M01_Y4_MEAS',
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
    const config = measureType === 'money' ? params.money : params[measureType];

    const units = selectConvertibleUnits(measureType, params);
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
        // TRUE statement
        if (value1Base > value2Base) {
            statement = `${formatMeasurement(value1, unit1)} is more than ${formatMeasurement(value2, unit2)}`;
        } else if (value1Base < value2Base) {
            statement = `${formatMeasurement(value1, unit1)} is less than ${formatMeasurement(value2, unit2)}`;
        } else {
            statement = `${formatMeasurement(value1, unit1)} is the same as ${formatMeasurement(value2, unit2)}`;
        }
        correctAnswer = 'True';
    } else {
        // FALSE statement (deliberately wrong)
        if (value1Base > value2Base) {
            statement = `${formatMeasurement(value1, unit1)} is less than ${formatMeasurement(value2, unit2)}`;  // Wrong!
        } else if (value1Base < value2Base) {
            statement = `${formatMeasurement(value1, unit1)} is more than ${formatMeasurement(value2, unit2)}`;  // Wrong!
        } else {
            // For equals, make a wrong comparison
            statement = `${formatMeasurement(value1, unit1)} is more than ${formatMeasurement(value2, unit2)}`;
        }
        correctAnswer = 'False';
    }

    const questionText = `Is this statement true or false?\n"${statement}"`;

    return {
        text: questionText,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: correctAnswer,
        module: 'M01_Y4_MEAS',
        level: level
    };
}

/**
 * OPERATION 5: Practical Money Problems
 * Real-world scenarios requiring comparison and conversion
 * Level 4 only (multi-step reasoning)
 */
function generatePracticalMoneyProblem(params, level) {
    const scenarios = ['shopping_budget', 'price_comparison', 'saving_target'];
    const scenario = randomChoice(scenarios);

    if (scenario === 'shopping_budget') {
        const budgetUnit = randomChoice(['p', '£']);
        const item1Unit = randomChoice(['p', '£']);
        const item2Unit = randomChoice(['p', '£']);

        const budget = getRandomValue(params, 'money', budgetUnit);
        const item1Price = getRandomValue(params, 'money', item1Unit);
        const item2Price = getRandomValue(params, 'money', item2Unit);

        // Convert all to pence for calculation
        const budgetP = convertToBase(budget, budgetUnit);
        const item1P = convertToBase(item1Price, item1Unit);
        const item2P = convertToBase(item2Price, item2Unit);

        const totalCostP = item1P + item2P;
        const hasEnough = (budgetP >= totalCostP);

        const items = ['book', 'pen', 'toy', 'snack', 'drink', 'magazine'];
        const item1Name = randomChoice(items);
        let item2Name = randomChoice(items.filter(i => i !== item1Name));

        const questionText = `You have ${formatMeasurement(budget, budgetUnit)}. You want to buy a ${item1Name} costing ${formatMeasurement(item1Price, item1Unit)} and a ${item2Name} costing ${formatMeasurement(item2Price, item2Unit)}. Do you have enough money?`;

        return {
            text: questionText,
            type: 'text_input',
            answer: hasEnough ? 'Yes' : 'No',
            hint: 'Answer Yes or No',
            module: 'M01_Y4_MEAS',
            level: level
        };
    } else if (scenario === 'price_comparison') {
        const shopAUnit = randomChoice(['p', '£']);
        const shopBUnit = randomChoice(['p', '£']);

        const priceA = getRandomValue(params, 'money', shopAUnit);
        const priceB = getRandomValue(params, 'money', shopBUnit);

        const priceAP = convertToBase(priceA, shopAUnit);
        const priceBP = convertToBase(priceB, shopBUnit);

        let cheaper, answer;
        if (priceAP < priceBP) {
            cheaper = 'Shop A';
            answer = 'Shop A';
        } else if (priceAP > priceBP) {
            cheaper = 'Shop B';
            answer = 'Shop B';
        } else {
            // Equal prices - regenerate
            return generatePracticalMoneyProblem(params, level);
        }

        const items = ['magazine', 'game', 'book', 'toy'];
        const item = randomChoice(items);

        const questionText = `A ${item} costs ${formatMeasurement(priceA, shopAUnit)} at Shop A and ${formatMeasurement(priceB, shopBUnit)} at Shop B. Which shop is cheaper?`;

        return {
            text: questionText,
            type: 'text_input',
            answer: answer,
            hint: 'Answer Shop A or Shop B',
            module: 'M01_Y4_MEAS',
            level: level
        };
    } else if (scenario === 'saving_target') {
        const targetUnit = randomChoice(['p', '£']);
        const savedUnit = randomChoice(['p', '£']);

        const target = getRandomValue(params, 'money', targetUnit);
        const saved = getRandomValue(params, 'money', savedUnit);

        const targetP = convertToBase(target, targetUnit);
        const savedP = convertToBase(saved, savedUnit);

        const hasEnough = (savedP >= targetP);

        const items = ['game', 'toy', 'book', 'treat'];
        const item = randomChoice(items);

        const questionText = `You are saving for a ${item} costing ${formatMeasurement(target, targetUnit)}. You have saved ${formatMeasurement(saved, savedUnit)}. Have you saved enough?`;

        return {
            text: questionText,
            type: 'text_input',
            answer: hasEnough ? 'Yes' : 'No',
            hint: 'Answer Yes or No',
            module: 'M01_Y4_MEAS',
            level: level
        };
    }

    // Fallback
    return generateDirectComparison(params, level);
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
        availableOperations = ['direct_comparison', 'symbol_insertion', 'ordering', 'conversion_sense', 'practical_money'];
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
        case 'practical_money':
            return generatePracticalMoneyProblem(params, level);
        default:
            return generateDirectComparison(params, level);
    }
}

export default {
    moduleId: 'M01_Y4_MEAS',
    generate: generateQuestion
};
