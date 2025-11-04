/**
 * M09_Y3_MEAS: Multi-Measure Problems
 * Year 3 - Add and subtract amounts of money to give change, using both £ and p in practical contexts;
 * add and subtract lengths (m/cm/mm); add and subtract mass (kg/g); add and subtract volume/capacity (l/ml)
 *
 * Key Requirements:
 * - ALL measurement types: money, length, mass, capacity
 * - Money can now mix pounds and pence (£2.35)
 * - Operations: addition, subtraction, giving change
 * - May require conversion between units
 */

import {
    randomInt,
    randomDecimal,
    randomChoice,
    formatMoney,
    formatMixedUnit,
    generateContext,
    generateShoppingItems,
    convertUnits,
    roundTo
} from './helpers/M09_problemHelpers.js';

/**
 * Operation: Add measures
 * Can be money, length, mass, or capacity
 */
function generateAddMeasure(params) {
    const measureType = randomChoice(params.measure_types);
    const context = generateContext(params.contexts, 'add');

    if (measureType === 'money') {
        return generateMoneyAdd(params, context);
    } else if (measureType === 'length') {
        return generateLengthAdd(params, context);
    } else if (measureType === 'mass') {
        return generateMassAdd(params, context);
    } else if (measureType === 'capacity') {
        return generateCapacityAdd(params, context);
    }
}

/**
 * Generate money addition problem
 */
function generateMoneyAdd(params, context) {
    const unit = params.money_unit;

    if (unit === 'pence_only') {
        const value1 = randomInt(params.money_range[0], params.money_range[1]);
        const value2 = randomInt(params.money_range[0], params.money_range[1]);
        const answer = value1 + value2;

        const items = generateShoppingItems(2);

        return {
            text: `${items[0]} costs ${value1}p and ${items[1]} costs ${value2}p. What is the total cost?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two amounts together',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    } else if (unit === 'mixed_simple' || unit === 'mixed') {
        // Generate amounts in pounds with pence (e.g., £2.50)
        const value1 = randomDecimal(params.money_range[0], params.money_range[1], 2);
        const value2 = randomDecimal(params.money_range[0], params.money_range[1], 2);
        const answer = roundTo(value1 + value2, 2);

        const items = generateShoppingItems(2);

        return {
            text: `${items[0]} costs ${formatMoney(value1, 'decimal')} and ${items[1]} costs ${formatMoney(value2, 'decimal')}. What is the total cost?`,
            type: 'text_input',
            answer: answer.toFixed(2),
            hint: 'Add the pounds and pence together. Remember to include the decimal point.',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    }
}

/**
 * Generate length addition problem
 */
function generateLengthAdd(params, context) {
    const unit = params.length_unit;

    if (unit === 'cm') {
        // Simple cm addition
        const value1 = randomInt(params.length_range[0], params.length_range[1]);
        const value2 = randomInt(params.length_range[0], params.length_range[1]);
        const answer = value1 + value2;

        return {
            text: `A piece of ribbon is ${value1}cm long. Another piece is ${value2}cm long. What is the total length?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two lengths together',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    } else if (unit === 'mixed') {
        // Mixed units: m and cm
        const value1 = randomInt(params.length_range[0], params.length_range[1]);
        const value2 = randomInt(params.length_range[0], params.length_range[1]);
        const answer = value1 + value2;

        return {
            text: `One rope is ${formatMixedUnit(value1, 'length')} long. Another rope is ${formatMixedUnit(value2, 'length')} long. What is the total length in cm?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two lengths. Remember: 1m = 100cm',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    }
}

/**
 * Generate mass addition problem
 */
function generateMassAdd(params, context) {
    const unit = params.mass_unit;

    if (unit === 'g') {
        const value1 = randomInt(params.mass_range[0], params.mass_range[1]);
        const value2 = randomInt(params.mass_range[0], params.mass_range[1]);
        const answer = value1 + value2;

        return {
            text: `A bag weighs ${value1}g. Another bag weighs ${value2}g. What is the total weight?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two weights together',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    } else if (unit === 'mixed') {
        const value1 = randomInt(params.mass_range[0], params.mass_range[1]);
        const value2 = randomInt(params.mass_range[0], params.mass_range[1]);
        const answer = value1 + value2;

        return {
            text: `A parcel weighs ${formatMixedUnit(value1, 'mass')}. Another parcel weighs ${formatMixedUnit(value2, 'mass')}. What is the total weight in grams?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two weights. Remember: 1kg = 1000g',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    }
}

/**
 * Generate capacity addition problem
 */
function generateCapacityAdd(params, context) {
    const unit = params.capacity_unit;

    if (unit === 'ml') {
        const value1 = randomInt(params.capacity_range[0], params.capacity_range[1]);
        const value2 = randomInt(params.capacity_range[0], params.capacity_range[1]);
        const answer = value1 + value2;

        return {
            text: `A jug contains ${value1}ml of water. You add ${value2}ml more. How much water is there now?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two amounts together',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    } else if (unit === 'mixed') {
        const value1 = randomInt(params.capacity_range[0], params.capacity_range[1]);
        const value2 = randomInt(params.capacity_range[0], params.capacity_range[1]);
        const answer = value1 + value2;

        return {
            text: `A bottle holds ${formatMixedUnit(value1, 'capacity')} of juice. Another bottle holds ${formatMixedUnit(value2, 'capacity')}. What is the total amount in ml?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two amounts. Remember: 1l = 1000ml',
            module: 'M09_Y3_MEAS',
            operation: 'add_measure'
        };
    }
}

/**
 * Operation: Subtract measures
 */
function generateSubtractMeasure(params) {
    const measureType = randomChoice(params.measure_types);
    const context = generateContext(params.contexts, 'subtract');

    if (measureType === 'money') {
        return generateMoneySubtract(params, context);
    } else if (measureType === 'length') {
        return generateLengthSubtract(params, context);
    } else if (measureType === 'mass') {
        return generateMassSubtract(params, context);
    } else if (measureType === 'capacity') {
        return generateCapacitySubtract(params, context);
    }
}

/**
 * Generate money subtraction problem
 */
function generateMoneySubtract(params, context) {
    const unit = params.money_unit;

    if (unit === 'pence_only') {
        const value1 = randomInt(params.money_range[0] + 20, params.money_range[1]);
        const value2 = randomInt(params.money_range[0], value1 - 10);
        const answer = value1 - value2;

        return {
            text: `You have ${value1}p. You spend ${value2}p. How much do you have left?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the amount spent',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    } else {
        const value1 = randomDecimal(params.money_range[0] + 1, params.money_range[1], 2);
        const value2 = randomDecimal(params.money_range[0], value1 - 0.50, 2);
        const answer = roundTo(value1 - value2, 2);

        return {
            text: `You have ${formatMoney(value1, 'decimal')}. You spend ${formatMoney(value2, 'decimal')}. How much do you have left?`,
            type: 'text_input',
            answer: answer.toFixed(2),
            hint: 'Subtract the amount spent',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    }
}

/**
 * Generate length subtraction problem
 */
function generateLengthSubtract(params, context) {
    const unit = params.length_unit;

    if (unit === 'cm') {
        const value1 = randomInt(params.length_range[0] + 20, params.length_range[1]);
        const value2 = randomInt(params.length_range[0], value1 - 10);
        const answer = value1 - value2;

        return {
            text: `A rope is ${value1}cm long. You cut off ${value2}cm. How much rope is left?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the length cut off',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    } else {
        const value1 = randomInt(params.length_range[0] + 50, params.length_range[1]);
        const value2 = randomInt(params.length_range[0], value1 - 30);
        const answer = value1 - value2;

        return {
            text: `A piece of wood is ${formatMixedUnit(value1, 'length')} long. You cut off ${formatMixedUnit(value2, 'length')}. How much is left in cm?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the two lengths',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    }
}

/**
 * Generate mass subtraction problem
 */
function generateMassSubtract(params, context) {
    const value1 = randomInt(params.mass_range[0] + 100, params.mass_range[1]);
    const value2 = randomInt(params.mass_range[0], value1 - 50);
    const answer = value1 - value2;

    if (params.mass_unit === 'g') {
        return {
            text: `A box weighs ${value1}g. You remove ${value2}g. How much does the box weigh now?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the weight removed',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    } else {
        return {
            text: `A bag of flour weighs ${formatMixedUnit(value1, 'mass')}. You use ${formatMixedUnit(value2, 'mass')}. How much flour is left in grams?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the amount used',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    }
}

/**
 * Generate capacity subtraction problem
 */
function generateCapacitySubtract(params, context) {
    const value1 = randomInt(params.capacity_range[0] + 200, params.capacity_range[1]);
    const value2 = randomInt(params.capacity_range[0], value1 - 100);
    const answer = value1 - value2;

    if (params.capacity_unit === 'ml') {
        return {
            text: `A bottle contains ${value1}ml of juice. You drink ${value2}ml. How much juice is left?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the amount drunk',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    } else {
        return {
            text: `A tank holds ${formatMixedUnit(value1, 'capacity')} of water. ${formatMixedUnit(value2, 'capacity')} is used. How much water is left in ml?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the amount used',
            module: 'M09_Y3_MEAS',
            operation: 'subtract_measure'
        };
    }
}

/**
 * Operation: Giving change
 */
function generateGiveChange(params) {
    const paymentAmount = randomChoice(params.payment_amounts);
    const cost = randomDecimal(params.money_range[0], paymentAmount - 0.50, 2);
    const change = roundTo(paymentAmount - cost, 2);

    const item = generateShoppingItems(1)[0];

    return {
        text: `You buy ${item} for ${formatMoney(cost, 'decimal')}. You pay with ${formatMoney(paymentAmount, 'decimal')}. How much change do you get?`,
        type: 'text_input',
        answer: change.toFixed(2),
        hint: 'Subtract the cost from the amount you paid',
        module: 'M09_Y3_MEAS',
        operation: 'give_change'
    };
}

/**
 * Operation: Multi-step problems (Level 4)
 */
function generateMultiStep(params) {
    const measureType = randomChoice(params.measure_types);

    if (measureType === 'money') {
        // Buy two items, calculate total and change
        const value1 = randomDecimal(params.money_range[0], params.money_range[1] / 2, 2);
        const value2 = randomDecimal(params.money_range[0], params.money_range[1] / 2, 2);
        const total = roundTo(value1 + value2, 2);
        const paymentAmount = randomChoice(params.payment_amounts);

        if (total >= paymentAmount) {
            return generateAddMeasure(params);
        }

        const change = roundTo(paymentAmount - total, 2);

        const items = generateShoppingItems(2);

        return {
            text: `You buy ${items[0]} for ${formatMoney(value1, 'decimal')} and ${items[1]} for ${formatMoney(value2, 'decimal')}. You pay with ${formatMoney(paymentAmount, 'decimal')}. How much change do you get?`,
            type: 'text_input',
            answer: change.toFixed(2),
            hint: 'First add the costs, then subtract from the amount paid',
            module: 'M09_Y3_MEAS',
            operation: 'multi_step'
        };
    } else {
        // For other measures, create a simple two-step problem
        return generateAddMeasure(params);
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
        case 'add_measure':
            return generateAddMeasure(params);
        case 'subtract_measure':
            return generateSubtractMeasure(params);
        case 'give_change':
            return generateGiveChange(params);
        case 'convert_within':
            // For conversion problems, use add/subtract with mixed units
            return randomChoice([generateAddMeasure, generateSubtractMeasure])(params);
        case 'multi_step':
            return generateMultiStep(params);
        default:
            return generateAddMeasure(params);
    }
}

export default {
    moduleId: 'M09_Y3_MEAS',
    generate: generateQuestion
};
