/**
 * M09_Y5_MEAS: Decimal Measures and Scaling
 * Year 5 - Use all four operations to solve problems involving measures using decimal notation, including scaling
 *
 * Key Requirements:
 * - All four operations across all measurement types
 * - DECIMAL NOTATION (3.5m, not 3m 50cm)
 * - Scaling problems prominent (recipes, rates)
 * - Fractions of measures (1/2, 1/3, etc.)
 * - Multi-step problems requiring strategy
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
 * Operation: Multiply decimal measures
 * "4.5kg of apples at £2.40 per kg. How much do they cost?"
 */
function generateMultiplyDecimal(params) {
    const measureType = randomChoice(params.measure_types);
    const multiplier = randomChoice(params.multipliers);
    const dp = params.decimal_places;

    if (measureType === 'money') {
        // Price per unit × quantity
        const pricePerUnit = randomDecimal(params.money_range[0], params.money_range[1] / multiplier, dp);
        const quantity = multiplier;
        const total = roundTo(pricePerUnit * quantity, dp);

        const items = ['apples', 'oranges', 'bananas', 'flour', 'sugar', 'rice'];
        const item = randomChoice(items);
        const unit = randomChoice(['kg', 'l']);

        return {
            text: `${item} cost ${formatMoney(pricePerUnit, 'decimal')} per ${unit}. How much does ${formatDecimalMeasure(quantity, unit, 1)} cost?`,
            type: 'text_input',
            answer: total.toFixed(2),
            hint: `Multiply ${pricePerUnit.toFixed(2)} by ${quantity}`,
            module: 'M09_Y5_MEAS',
            operation: 'multiply_decimal'
        };
    } else if (measureType === 'length') {
        const unitLength = randomDecimal(params.length_range[0], params.length_range[1] / multiplier, 1);
        const total = roundTo(unitLength * multiplier, 1);

        return {
            text: `One piece of rope is ${formatDecimalMeasure(unitLength, 'm', 1)} long. How long are ${multiplier} pieces altogether?`,
            type: 'text_input',
            answer: total.toFixed(1),
            hint: `Multiply ${unitLength.toFixed(1)} by ${multiplier}`,
            module: 'M09_Y5_MEAS',
            operation: 'multiply_decimal'
        };
    } else if (measureType === 'mass') {
        const unitMass = randomDecimal(params.mass_range[0], params.mass_range[1] / multiplier, 1);
        const total = roundTo(unitMass * multiplier, 1);

        return {
            text: `One parcel weighs ${formatDecimalMeasure(unitMass, 'kg', 1)}. How much do ${multiplier} parcels weigh altogether?`,
            type: 'text_input',
            answer: total.toFixed(1),
            hint: `Multiply ${unitMass.toFixed(1)} by ${multiplier}`,
            module: 'M09_Y5_MEAS',
            operation: 'multiply_decimal'
        };
    } else { // capacity
        const unitCapacity = randomDecimal(params.capacity_range[0], params.capacity_range[1] / multiplier, 1);
        const total = roundTo(unitCapacity * multiplier, 1);

        return {
            text: `One bottle holds ${formatDecimalMeasure(unitCapacity, 'l', 1)}. How much do ${multiplier} bottles hold altogether?`,
            type: 'text_input',
            answer: total.toFixed(1),
            hint: `Multiply ${unitCapacity.toFixed(1)} by ${multiplier}`,
            module: 'M09_Y5_MEAS',
            operation: 'multiply_decimal'
        };
    }
}

/**
 * Operation: Divide decimal measures
 * "Divide 5.6kg equally among 8 people"
 */
function generateDivideDecimal(params) {
    const measureType = randomChoice(params.measure_types);
    const divisor = randomChoice(params.divisors);
    const dp = params.decimal_places;

    if (measureType === 'money') {
        // Generate divisible amount for cleaner answers
        const unitAmount = randomDecimal(0.50, 10.00, dp);
        const total = roundTo(unitAmount * divisor, dp);

        return {
            text: `${formatMoney(total, 'decimal')} is shared equally between ${divisor} people. How much does each person get?`,
            type: 'text_input',
            answer: unitAmount.toFixed(2),
            hint: `Divide ${total.toFixed(2)} by ${divisor}`,
            module: 'M09_Y5_MEAS',
            operation: 'divide_decimal'
        };
    } else if (measureType === 'length') {
        const unitLength = randomDecimal(0.5, 10.0, 1);
        const total = roundTo(unitLength * divisor, 1);

        return {
            text: `A rope ${formatDecimalMeasure(total, 'm', 1)} long is cut into ${divisor} equal pieces. How long is each piece?`,
            type: 'text_input',
            answer: unitLength.toFixed(1),
            hint: `Divide ${total.toFixed(1)} by ${divisor}`,
            module: 'M09_Y5_MEAS',
            operation: 'divide_decimal'
        };
    } else if (measureType === 'mass') {
        const unitMass = randomDecimal(0.5, 10.0, 1);
        const total = roundTo(unitMass * divisor, 1);

        return {
            text: `${formatDecimalMeasure(total, 'kg', 1)} of flour is divided equally into ${divisor} bags. How much flour is in each bag?`,
            type: 'text_input',
            answer: unitMass.toFixed(1),
            hint: `Divide ${total.toFixed(1)} by ${divisor}`,
            module: 'M09_Y5_MEAS',
            operation: 'divide_decimal'
        };
    } else { // capacity
        const unitCapacity = randomDecimal(0.5, 10.0, 1);
        const total = roundTo(unitCapacity * divisor, 1);

        return {
            text: `${formatDecimalMeasure(total, 'l', 1)} of juice is poured equally into ${divisor} glasses. How much juice is in each glass?`,
            type: 'text_input',
            answer: unitCapacity.toFixed(1),
            hint: `Divide ${total.toFixed(1)} by ${divisor}`,
            module: 'M09_Y5_MEAS',
            operation: 'divide_decimal'
        };
    }
}

/**
 * Operation: Scale recipe
 * "A recipe for 4 uses 1.5kg flour. How much for 6 servings?"
 */
function generateScaleRecipe(params) {
    if (!params.includes_scaling) {
        return generateMultiplyDecimal(params);
    }

    const originalServings = randomChoice(params.scaling_from);
    const newServings = randomChoice(params.scaling_to.filter(s => s !== originalServings));

    const ingredients = [
        { name: 'flour', unit: 'kg', range: [0.5, 2.0] },
        { name: 'sugar', unit: 'kg', range: [0.25, 1.5] },
        { name: 'butter', unit: 'kg', range: [0.25, 1.0] },
        { name: 'milk', unit: 'l', range: [0.5, 2.0] },
        { name: 'water', unit: 'l', range: [0.5, 2.5] }
    ];

    const ingredient = randomChoice(ingredients);

    // Calculate amount per serving, then multiply
    const perServing = randomDecimal(ingredient.range[0] / originalServings, ingredient.range[1] / originalServings, 2);
    const originalAmount = roundTo(perServing * originalServings, 2);
    const newAmount = roundTo(perServing * newServings, 2);

    return {
        text: `A recipe for ${originalServings} people needs ${formatDecimalMeasure(originalAmount, ingredient.unit, 2)} of ${ingredient.name}. How much ${ingredient.name} is needed for ${newServings} people?`,
        type: 'text_input',
        answer: newAmount.toFixed(2),
        hint: `Work out how much is needed per person, then multiply by ${newServings}`,
        module: 'M09_Y5_MEAS',
        operation: 'scale_recipe'
    };
}

/**
 * Operation: Rate problems
 * "A car travels at 60km per hour. How far in 2.5 hours?"
 */
function generateRateProblems(params) {
    if (!params.include_rates) {
        return generateMultiplyDecimal(params);
    }

    const rateType = randomChoice(['price_per_kg', 'speed', 'flow_rate']);

    if (rateType === 'price_per_kg') {
        const pricePerKg = randomDecimal(1.50, 5.00, 2);
        const quantity = randomDecimal(1.0, 5.0, 1);
        const total = roundTo(pricePerKg * quantity, 2);

        const items = ['apples', 'potatoes', 'flour', 'sugar', 'rice'];
        const item = randomChoice(items);

        return {
            text: `${item} cost ${formatMoney(pricePerKg, 'decimal')} per kg. How much does ${formatDecimalMeasure(quantity, 'kg', 1)} cost?`,
            type: 'text_input',
            answer: total.toFixed(2),
            hint: `Multiply the price per kg by the weight`,
            module: 'M09_Y5_MEAS',
            operation: 'rate_problems'
        };
    } else if (rateType === 'speed') {
        const speed = randomChoice([30, 40, 50, 60]);
        const time = randomDecimal(1.0, 5.0, 1);
        const distance = roundTo(speed * time, 1);

        return {
            text: `A car travels at ${speed}km per hour. How far does it travel in ${formatDecimalMeasure(time, 'hours', 1)}?`,
            type: 'text_input',
            answer: distance.toFixed(1),
            hint: `Multiply speed by time`,
            module: 'M09_Y5_MEAS',
            operation: 'rate_problems'
        };
    } else { // flow_rate
        const ratePerMin = randomInt(5, 20);
        const time = randomInt(2, 10);
        const total = ratePerMin * time;

        return {
            text: `A tap fills ${ratePerMin} litres per minute. How much water flows in ${time} minutes?`,
            type: 'text_input',
            answer: total.toFixed(1),
            hint: `Multiply the rate by the time`,
            module: 'M09_Y5_MEAS',
            operation: 'rate_problems'
        };
    }
}

/**
 * Operation: Fraction of measure
 * "A tank holds 45.5 litres. It's filled to 2/3. How much water?"
 */
function generateFractionOfMeasure(params) {
    const fraction = randomChoice(params.fractions || [1/2, 1/3, 1/4, 2/3, 3/4]);
    const measureType = randomChoice(params.measure_types);

    const fractionText = fraction === 1/2 ? '1/2' :
                          fraction === 1/3 ? '1/3' :
                          fraction === 2/3 ? '2/3' :
                          fraction === 1/4 ? '1/4' :
                          fraction === 3/4 ? '3/4' :
                          fraction === 1/5 ? '1/5' : '2/5';

    if (measureType === 'money') {
        // Amount that gives a clean answer when multiplied by fraction
        const result = randomDecimal(params.money_range[0], params.money_range[1], 2);
        const total = roundTo(result / fraction, 2);

        return {
            text: `A shop takes ${fractionText} off an item that costs ${formatMoney(total, 'decimal')}. How much is the discount?`,
            type: 'text_input',
            answer: result.toFixed(2),
            hint: `Find ${fractionText} of ${total.toFixed(2)}`,
            module: 'M09_Y5_MEAS',
            operation: 'fraction_of_measure'
        };
    } else if (measureType === 'capacity') {
        const result = randomDecimal(params.capacity_range[0], params.capacity_range[1], 1);
        const total = roundTo(result / fraction, 1);

        return {
            text: `A tank holds ${formatDecimalMeasure(total, 'l', 1)}. It is filled to ${fractionText}. How much water is in the tank?`,
            type: 'text_input',
            answer: result.toFixed(1),
            hint: `Find ${fractionText} of ${total.toFixed(1)}`,
            module: 'M09_Y5_MEAS',
            operation: 'fraction_of_measure'
        };
    } else {
        return generateMultiplyDecimal(params);
    }
}

/**
 * Operation: Multi-step problems
 */
function generateMultiStep(params) {
    if (!params.allow_multi_step) {
        return generateMultiplyDecimal(params);
    }

    // Multi-step money problem
    const pricePerKg1 = randomDecimal(2.00, 5.00, 2);
    const quantity1 = randomDecimal(1.0, 3.0, 1);
    const cost1 = roundTo(pricePerKg1 * quantity1, 2);

    const pricePerKg2 = randomDecimal(1.50, 4.00, 2);
    const quantity2 = randomDecimal(1.0, 3.0, 1);
    const cost2 = roundTo(pricePerKg2 * quantity2, 2);

    const total = roundTo(cost1 + cost2, 2);

    const items = generateShoppingItems(2);

    return {
        text: `You buy ${formatDecimalMeasure(quantity1, 'kg', 1)} of ${items[0]} at ${formatMoney(pricePerKg1, 'decimal')} per kg and ${formatDecimalMeasure(quantity2, 'kg', 1)} of ${items[1]} at ${formatMoney(pricePerKg2, 'decimal')} per kg. How much do you spend in total?`,
        type: 'text_input',
        answer: total.toFixed(2),
        hint: 'Work out the cost of each item, then add them together',
        module: 'M09_Y5_MEAS',
        operation: 'multi_step'
    };
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
        case 'multiply_decimal':
        case 'multiplication':
            return generateMultiplyDecimal(params);
        case 'divide_decimal':
        case 'division':
            return generateDivideDecimal(params);
        case 'add_decimal':
        case 'addition':
            return generateMultiplyDecimal(params); // Similar to multiply
        case 'subtract_decimal':
        case 'subtraction':
            return generateDivideDecimal(params); // Similar to divide
        case 'scale_recipe':
            return generateScaleRecipe(params);
        case 'rate_problems':
            return generateRateProblems(params);
        case 'fraction_of_measure':
            return generateFractionOfMeasure(params);
        case 'multi_step':
        case 'complex_multi_step':
            return generateMultiStep(params);
        default:
            return generateMultiplyDecimal(params);
    }
}

export default {
    moduleId: 'M09_Y5_MEAS',
    generate: generateQuestion
};
