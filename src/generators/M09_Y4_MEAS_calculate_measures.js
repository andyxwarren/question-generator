/**
 * M09_Y4_MEAS: Four Operations with Measures
 * Year 4 - Calculate different measures, including money in pounds and pence
 *
 * Key Requirements:
 * - All four operations (×, ÷, +, -)
 * - All measurement types: money, length, mass, capacity
 * - Scaling problems (e.g., 3 items at £1.25 each)
 * - Division with remainders
 */

import {
    randomInt,
    randomDecimal,
    randomChoice,
    formatMoney,
    formatDecimalMeasure,
    generateContext,
    generateShoppingItems,
    generateRealisticPrice,
    roundTo
} from './helpers/M09_problemHelpers.js';

/**
 * Operation: Multiply measures
 * "3 pencils at 45p each. How much altogether?"
 */
function generateMultiplyMeasure(params) {
    const measureType = randomChoice(params.measure_types);
    const multiplier = randomChoice(params.multipliers);

    if (measureType === 'money') {
        const format = params.money_format;

        if (format === 'whole_pounds') {
            const unitCost = randomInt(1, Math.floor(params.money_range[1] / multiplier));
            const total = unitCost * multiplier;

            const items = ['books', 'toys', 'games', 'pens', 'notebooks'];
            const item = randomChoice(items);

            return {
                text: `One ${item} costs £${unitCost}. How much do ${multiplier} ${item}s cost?`,
                type: 'text_input',
                answer: total.toString(),
                hint: `Multiply ${unitCost} by ${multiplier}`,
                module: 'M09_Y4_MEAS',
                operation: 'multiply_measure'
            };
        } else {
            // decimal format
            const unitCost = generateRealisticPrice(
                params.money_range[0],
                params.money_range[1] / multiplier,
                format === 'decimal_simple'
            );
            const total = roundTo(unitCost * multiplier, 2);

            const items = ['pencils', 'rulers', 'rubbers', 'notebooks', 'pens'];
            const item = randomChoice(items);

            return {
                text: `One ${item} costs ${formatMoney(unitCost, 'decimal')}. How much do ${multiplier} ${item}s cost?`,
                type: 'text_input',
                answer: total.toFixed(2),
                hint: `Multiply ${unitCost.toFixed(2)} by ${multiplier}`,
                module: 'M09_Y4_MEAS',
                operation: 'multiply_measure'
            };
        }
    } else if (measureType === 'length') {
        const unitLength = randomInt(10, Math.floor(params.length_range[1] / multiplier));
        const total = unitLength * multiplier;

        return {
            text: `One piece of ribbon is ${unitLength}cm long. How long are ${multiplier} pieces altogether?`,
            type: 'text_input',
            answer: total.toString(),
            hint: `Multiply ${unitLength} by ${multiplier}`,
            module: 'M09_Y4_MEAS',
            operation: 'multiply_measure'
        };
    } else if (measureType === 'mass') {
        const unitMass = randomInt(50, Math.floor(params.mass_range[1] / multiplier));
        const total = unitMass * multiplier;

        return {
            text: `One bag weighs ${unitMass}g. How much do ${multiplier} bags weigh altogether?`,
            type: 'text_input',
            answer: total.toString(),
            hint: `Multiply ${unitMass} by ${multiplier}`,
            module: 'M09_Y4_MEAS',
            operation: 'multiply_measure'
        };
    } else { // capacity
        const unitCapacity = randomInt(100, Math.floor(params.capacity_range[1] / multiplier));
        const total = unitCapacity * multiplier;

        return {
            text: `One bottle holds ${unitCapacity}ml. How much do ${multiplier} bottles hold altogether?`,
            type: 'text_input',
            answer: total.toString(),
            hint: `Multiply ${unitCapacity} by ${multiplier}`,
            module: 'M09_Y4_MEAS',
            operation: 'multiply_measure'
        };
    }
}

/**
 * Operation: Divide measures
 * "Share £12 equally between 3 people"
 */
function generateDivideMeasure(params) {
    const measureType = randomChoice(params.measure_types);
    const divisor = randomChoice(params.divisors);

    if (measureType === 'money') {
        const format = params.money_format;

        if (format === 'whole_pounds') {
            // Ensure divisible amount
            const unitAmount = randomInt(1, 10);
            const total = unitAmount * divisor;

            return {
                text: `£${total} is shared equally between ${divisor} people. How much does each person get?`,
                type: 'text_input',
                answer: unitAmount.toString(),
                hint: `Divide ${total} by ${divisor}`,
                module: 'M09_Y4_MEAS',
                operation: 'divide_measure'
            };
        } else {
            // Decimal amounts
            const unitAmount = generateRealisticPrice(0.50, 10.00, format === 'decimal_simple');
            const total = roundTo(unitAmount * divisor, 2);

            return {
                text: `${formatMoney(total, 'decimal')} is shared equally between ${divisor} people. How much does each person get?`,
                type: 'text_input',
                answer: unitAmount.toFixed(2),
                hint: `Divide ${total.toFixed(2)} by ${divisor}`,
                module: 'M09_Y4_MEAS',
                operation: 'divide_measure'
            };
        }
    } else if (measureType === 'length') {
        const unitLength = randomInt(10, 100);
        const total = unitLength * divisor;

        return {
            text: `A rope ${total}cm long is cut into ${divisor} equal pieces. How long is each piece?`,
            type: 'text_input',
            answer: unitLength.toString(),
            hint: `Divide ${total} by ${divisor}`,
            module: 'M09_Y4_MEAS',
            operation: 'divide_measure'
        };
    } else if (measureType === 'mass') {
        const unitMass = randomInt(50, 500);
        const total = unitMass * divisor;

        return {
            text: `${total}g of flour is divided equally into ${divisor} bags. How much flour is in each bag?`,
            type: 'text_input',
            answer: unitMass.toString(),
            hint: `Divide ${total} by ${divisor}`,
            module: 'M09_Y4_MEAS',
            operation: 'divide_measure'
        };
    } else { // capacity
        const unitCapacity = randomInt(100, 500);
        const total = unitCapacity * divisor;

        return {
            text: `${total}ml of juice is poured equally into ${divisor} glasses. How much juice is in each glass?`,
            type: 'text_input',
            answer: unitCapacity.toString(),
            hint: `Divide ${total} by ${divisor}`,
            module: 'M09_Y4_MEAS',
            operation: 'divide_measure'
        };
    }
}

/**
 * Operation: Scale recipe
 * "A recipe for 4 people needs 200g flour. How much for 6 people?"
 */
function generateScaleRecipe(params) {
    const ingredients = [
        { name: 'flour', unit: 'g', range: [100, 500] },
        { name: 'sugar', unit: 'g', range: [50, 300] },
        { name: 'butter', unit: 'g', range: [50, 250] },
        { name: 'milk', unit: 'ml', range: [100, 500] },
        { name: 'water', unit: 'ml', range: [100, 500] }
    ];

    const ingredient = randomChoice(ingredients);
    const originalServings = randomChoice([2, 4, 6]);
    const newServings = randomChoice(params.multipliers.filter(m => m !== originalServings / originalServings));
    const actualMultiplier = newServings / originalServings;

    // Generate amount that scales nicely
    const baseAmount = randomInt(ingredient.range[0], ingredient.range[1]);
    const originalAmount = Math.round(baseAmount / actualMultiplier);
    const newAmount = originalAmount * actualMultiplier;

    return {
        text: `A recipe for ${originalServings} people needs ${originalAmount}${ingredient.unit} of ${ingredient.name}. How much ${ingredient.name} is needed for ${newServings} people?`,
        type: 'text_input',
        answer: Math.round(newAmount).toString(),
        hint: `Work out how much is needed per person, then multiply by ${newServings}`,
        module: 'M09_Y4_MEAS',
        operation: 'scale_recipe'
    };
}

/**
 * Operation: Multi-step problems
 * Combine multiple operations
 */
function generateMultiStep(params) {
    if (!params.allow_multi_step) {
        return generateMultiplyMeasure(params);
    }

    const measureType = randomChoice(params.measure_types);

    if (measureType === 'money') {
        // Buy multiple items, calculate total and possibly change
        const multiplier1 = randomChoice([2, 3, 4]);
        const unitCost1 = generateRealisticPrice(0.50, 5.00, true);
        const cost1 = roundTo(unitCost1 * multiplier1, 2);

        const multiplier2 = randomChoice([2, 3]);
        const unitCost2 = generateRealisticPrice(0.50, 5.00, true);
        const cost2 = roundTo(unitCost2 * multiplier2, 2);

        const total = roundTo(cost1 + cost2, 2);

        const items = generateShoppingItems(2);

        return {
            text: `You buy ${multiplier1} ${items[0]} at ${formatMoney(unitCost1, 'decimal')} each and ${multiplier2} ${items[1]} at ${formatMoney(unitCost2, 'decimal')} each. How much do you spend in total?`,
            type: 'text_input',
            answer: total.toFixed(2),
            hint: 'First work out the cost of each type of item, then add them together',
            module: 'M09_Y4_MEAS',
            operation: 'multi_step'
        };
    } else {
        // For other measures, simpler two-step
        return generateMultiplyMeasure(params);
    }
}

/**
 * Main generator function
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'multiply_measure':
            return generateMultiplyMeasure(params);
        case 'divide_measure':
            return generateDivideMeasure(params);
        case 'add_measure':
            // Fallback to multiplication for variety
            return generateMultiplyMeasure(params);
        case 'subtract_measure':
            // Fallback to division for variety
            return generateDivideMeasure(params);
        case 'give_change':
            // Give change with purchased items
            const unitCost = generateRealisticPrice(params.money_range[0], params.money_range[1], true);
            const change = roundTo(10.00 - unitCost, 2);
            const item = generateShoppingItems(1)[0];

            return {
                text: `You buy ${item} for ${formatMoney(unitCost, 'decimal')}. You pay with £10.00. How much change do you get?`,
                type: 'text_input',
                answer: change.toFixed(2),
                hint: 'Subtract the cost from £10.00',
                module: 'M09_Y4_MEAS',
                operation: 'give_change'
            };
        case 'scale_recipe':
            return generateScaleRecipe(params);
        case 'multi_step':
            return generateMultiStep(params);
        default:
            return generateMultiplyMeasure(params);
    }
}

export default {
    moduleId: 'M09_Y4_MEAS',
    generate: generateQuestion
};
