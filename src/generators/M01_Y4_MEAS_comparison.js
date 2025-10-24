/**
 * M01_Y4_MEAS: Measurement - Compare Different Measures
 * Year 4: Compare different measures, including money in pounds and pence
 *
 * This generator extends Year 3 skills and adds money comparisons.
 */

import { randomChoice, randomInt, formatMeasurement, formatMoney, randomMoney, convertUnit, getComparisonSymbol } from './helpers/M01_measurementHelpers.js';

/**
 * Generate a comparison question for Year 4 measurement
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    const operations = params.operations;
    const operation = randomChoice(operations);

    switch (operation) {
        case 'compare_measures':
            return generateCompareMeasuresQuestion(params, level);
        case 'order_measures':
            return generateOrderMeasuresQuestion(params, level);
        case 'compare_money':
            return generateCompareMoneyQuestion(params, level);
        case 'order_money':
            return generateOrderMoneyQuestion(params, level);
        case 'multi_measure_comparison':
            return generateMultiMeasureComparisonQuestion(params, level);
        case 'problem_solving':
            return generateProblemSolvingQuestion(params, level);
        default:
            return generateCompareMeasuresQuestion(params, level);
    }
}

/**
 * Generate a question comparing two measurements
 */
function generateCompareMeasuresQuestion(params, level) {
    const measureTypes = params.measure_types.filter(t => t !== 'money');
    const measureType = randomChoice(measureTypes);
    const units = params.units[measureType];

    // Randomly choose same or different units
    const useSameUnits = params.compare_same_unit_only || randomChoice([true, false]);

    let unit1, unit2, value1, value2;

    if (useSameUnits) {
        unit1 = unit2 = randomChoice(units);
        const range = params.ranges[unit1];
        value1 = randomInt(range.min, range.max);
        value2 = randomInt(range.min, range.max);
        while (value1 === value2) {
            value2 = randomInt(range.min, range.max);
        }
    } else {
        unit1 = randomChoice(units);
        unit2 = randomChoice(units.filter(u => u !== unit1));
        value1 = randomInt(params.ranges[unit1].min, params.ranges[unit1].max);
        value2 = randomInt(params.ranges[unit2].min, params.ranges[unit2].max);
    }

    const measurement1 = formatMeasurement(value1, unit1);
    const measurement2 = formatMeasurement(value2, unit2);

    // Compare values (convert if needed)
    let comparisonValue1 = value1;
    let comparisonValue2 = value2;

    if (unit1 !== unit2) {
        try {
            comparisonValue1 = convertUnit(value1, unit1, unit2);
        } catch (e) {
            // If conversion fails, use original values
        }
    }

    const correctSymbol = getComparisonSymbol(comparisonValue1, comparisonValue2);

    const questionText = `Which symbol makes this correct?\n${measurement1} ___ ${measurement2}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctSymbol,
        options: ['>', '<', '='],
        hint: unit1 !== unit2 ? 'Convert to the same units first.' : 'Compare the values.',
        module: 'M01_Y4_MEAS',
        level: level
    };
}

/**
 * Generate a question ordering measurements
 */
function generateOrderMeasuresQuestion(params, level) {
    const measureTypes = params.measure_types.filter(t => t !== 'money');
    const measureType = randomChoice(measureTypes);
    const units = params.units[measureType];
    const unit = randomChoice(units);
    const range = params.ranges[unit];

    // Generate three different values
    const values = [];
    while (values.length < 3) {
        const value = randomInt(range.min, range.max);
        if (!values.includes(value)) {
            values.push(value);
        }
    }

    const measurements = values.map(v => formatMeasurement(v, unit));
    const orderDirection = randomChoice(['smallest to largest', 'largest to smallest']);

    const sortedIndices = values
        .map((val, idx) => ({ val, idx }))
        .sort((a, b) => orderDirection === 'smallest to largest' ? a.val - b.val : b.val - a.val)
        .map(item => item.idx);

    const correctAnswer = sortedIndices.map(idx => measurements[idx]).join(', ');

    const questionText = `Put these in order from ${orderDirection}:\n${measurements.join(', ')}`;

    const shuffledIndices1 = [sortedIndices[1], sortedIndices[0], sortedIndices[2]];
    const shuffledIndices2 = [sortedIndices[2], sortedIndices[1], sortedIndices[0]];

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: [
            correctAnswer,
            shuffledIndices1.map(idx => measurements[idx]).join(', '),
            shuffledIndices2.map(idx => measurements[idx]).join(', ')
        ],
        module: 'M01_Y4_MEAS',
        level: level
    };
}

/**
 * Generate a money comparison question
 */
function generateCompareMoneyQuestion(params, level) {
    const moneyFormat = params.money_format;

    let value1, value2, money1, money2;

    if (moneyFormat === 'simple') {
        // Just pence or just pounds
        const usePence = randomChoice([true, false]);
        if (usePence) {
            value1 = randomInt(params.ranges.p.min, params.ranges.p.max);
            value2 = randomInt(params.ranges.p.min, params.ranges.p.max);
            while (value1 === value2) {
                value2 = randomInt(params.ranges.p.min, params.ranges.p.max);
            }
            money1 = formatMoney(value1);
            money2 = formatMoney(value2);
        } else {
            value1 = randomInt(params.ranges.pounds.min, params.ranges.pounds.max) * 100;
            value2 = randomInt(params.ranges.pounds.min, params.ranges.pounds.max) * 100;
            while (value1 === value2) {
                value2 = randomInt(params.ranges.pounds.min, params.ranges.pounds.max) * 100;
            }
            money1 = formatMoney(value1);
            money2 = formatMoney(value2);
        }
    } else {
        // Mixed format
        value1 = randomMoney(1, params.ranges.pounds.max * 100 + params.ranges.p.max);
        value2 = randomMoney(1, params.ranges.pounds.max * 100 + params.ranges.p.max);
        while (value1 === value2) {
            value2 = randomMoney(1, params.ranges.pounds.max * 100 + params.ranges.p.max);
        }
        money1 = formatMoney(value1);
        money2 = formatMoney(value2);
    }

    const correctSymbol = getComparisonSymbol(value1, value2);

    const questionText = `Which symbol makes this correct?\n${money1} ___ ${money2}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctSymbol,
        options: ['>', '<', '='],
        hint: 'Compare the amounts of money.',
        module: 'M01_Y4_MEAS',
        level: level
    };
}

/**
 * Generate a question ordering money amounts
 */
function generateOrderMoneyQuestion(params, level) {
    const moneyFormat = params.money_format;

    // Generate three money values
    const values = [];
    while (values.length < 3) {
        const value = randomMoney(1, params.ranges.pounds.max * 100 + params.ranges.p.max);
        if (!values.includes(value)) {
            values.push(value);
        }
    }

    const moneyAmounts = values.map(v => formatMoney(v));
    const orderDirection = randomChoice(['smallest to largest', 'largest to smallest']);

    const sortedIndices = values
        .map((val, idx) => ({ val, idx }))
        .sort((a, b) => orderDirection === 'smallest to largest' ? a.val - b.val : b.val - a.val)
        .map(item => item.idx);

    const correctAnswer = sortedIndices.map(idx => moneyAmounts[idx]).join(', ');

    const questionText = `Put these amounts in order from ${orderDirection}:\n${moneyAmounts.join(', ')}`;

    const shuffledIndices1 = [sortedIndices[1], sortedIndices[0], sortedIndices[2]];
    const shuffledIndices2 = [sortedIndices[2], sortedIndices[1], sortedIndices[0]];

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: [
            correctAnswer,
            shuffledIndices1.map(idx => moneyAmounts[idx]).join(', '),
            shuffledIndices2.map(idx => moneyAmounts[idx]).join(', ')
        ],
        module: 'M01_Y4_MEAS',
        level: level
    };
}

/**
 * Generate a multi-measure comparison question (word problem)
 */
function generateMultiMeasureComparisonQuestion(params, level) {
    // Simple word problem involving comparison
    const measureType = randomChoice(['length', 'mass']);

    if (measureType === 'length') {
        const unit = randomChoice(['cm', 'm']);
        const range = params.ranges[unit];
        const value1 = randomInt(range.min, range.max);
        const value2 = randomInt(range.min, range.max);

        const longer = value1 > value2 ? formatMeasurement(value1, unit) : formatMeasurement(value2, unit);

        const questionText = `A red ribbon is ${formatMeasurement(value1, unit)} long and a blue ribbon is ${formatMeasurement(value2, unit)} long. Which ribbon is longer?`;

        return {
            text: questionText,
            type: 'multiple_choice',
            answer: longer,
            options: [formatMeasurement(value1, unit), formatMeasurement(value2, unit)],
            module: 'M01_Y4_MEAS',
            level: level
        };
    } else {
        const unit = randomChoice(['g', 'kg']);
        const range = params.ranges[unit];
        const value1 = randomInt(range.min, range.max);
        const value2 = randomInt(range.min, range.max);

        const heavier = value1 > value2 ? formatMeasurement(value1, unit) : formatMeasurement(value2, unit);

        const questionText = `A bag weighs ${formatMeasurement(value1, unit)} and a box weighs ${formatMeasurement(value2, unit)}. Which is heavier?`;

        return {
            text: questionText,
            type: 'multiple_choice',
            answer: heavier,
            options: [formatMeasurement(value1, unit), formatMeasurement(value2, unit)],
            module: 'M01_Y4_MEAS',
            level: level
        };
    }
}

/**
 * Generate a problem-solving question
 */
function generateProblemSolvingQuestion(params, level) {
    // Similar to multi-measure but more complex
    return generateMultiMeasureComparisonQuestion(params, level);
}

export default {
    moduleId: 'M01_Y4_MEAS',
    generate: generateQuestion
};
