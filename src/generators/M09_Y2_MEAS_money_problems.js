/**
 * M09_Y2_MEAS: Money Problem Solving
 * Year 2 - Solve simple problems in a practical context involving addition and subtraction
 * of money of the same unit, including giving change
 *
 * Key Requirements:
 * - Money ONLY (no other measures at Year 2)
 * - Same unit only (all pence OR all pounds, never mixed)
 * - Operations: addition, subtraction, giving change
 * - Real-world contexts: shopping, pocket money, saving
 */

import {
    randomInt,
    randomChoice,
    formatMoney,
    generateContext,
    generateShoppingItems
} from './helpers/M09_problemHelpers.js';

/**
 * Operation: Add money (same unit)
 * "A toy costs 35p. A book costs 22p. How much altogether?"
 */
function generateAddMoney(params) {
    const context = generateContext(params.contexts, 'add');

    if (params.unit === 'pence_only') {
        // Generate two amounts that sum to less than max_total
        const value1 = randomInt(params.min_value, Math.floor(params.max_total / 2));
        const value2 = randomInt(params.min_value, Math.min(params.max_value, params.max_total - value1));
        const answer = value1 + value2;

        const items = generateShoppingItems(2);

        return {
            text: `${items[0]} costs ${value1}p. ${items[1]} costs ${value2}p. How much do they cost altogether?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two amounts together',
            module: 'M09_Y2_MEAS',
            operation: 'add_money'
        };
    } else { // pounds_only
        const value1 = randomInt(params.min_value, Math.floor(params.max_total / 2));
        const value2 = randomInt(params.min_value, Math.min(params.max_value, params.max_total - value1));
        const answer = value1 + value2;

        const items = generateShoppingItems(2);

        return {
            text: `${items[0]} costs £${value1}. ${items[1]} costs £${value2}. How much do they cost altogether?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Add the two amounts together',
            module: 'M09_Y2_MEAS',
            operation: 'add_money'
        };
    }
}

/**
 * Operation: Subtract money (same unit)
 * "You have 50p. You spend 32p. How much do you have left?"
 */
function generateSubtractMoney(params) {
    const context = generateContext(params.contexts, 'subtract');

    if (params.unit === 'pence_only') {
        const startAmount = randomInt(params.min_value + 10, params.max_value);
        const spentAmount = randomInt(params.min_value, startAmount - 5);
        const answer = startAmount - spentAmount;

        const item = generateShoppingItems(1)[0];

        const templates = [
            {
                text: `You have ${startAmount}p. You spend ${spentAmount}p. How much do you have left?`,
                hint: 'Subtract the amount spent from what you had'
            },
            {
                text: `${context.subject} has ${startAmount}p. ${context.subject === 'You' ? 'You spend' : 'They spend'} ${spentAmount}p on ${item}. How much is left?`,
                hint: 'Subtract the cost from the amount they had'
            },
            {
                text: `There is ${startAmount}p in a jar. ${context.subject} takes out ${spentAmount}p. How much is left in the jar?`,
                hint: 'Subtract the amount taken out'
            }
        ];

        const template = randomChoice(templates);

        return {
            text: template.text,
            type: 'text_input',
            answer: answer.toString(),
            hint: template.hint,
            module: 'M09_Y2_MEAS',
            operation: 'subtract_money'
        };
    } else { // pounds_only
        const startAmount = randomInt(params.min_value + 2, params.max_value);
        const spentAmount = randomInt(params.min_value, startAmount - 1);
        const answer = startAmount - spentAmount;

        const item = generateShoppingItems(1)[0];

        return {
            text: `You have £${startAmount}. You spend £${spentAmount} on ${item}. How much do you have left?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: 'Subtract the amount spent from what you had',
            module: 'M09_Y2_MEAS',
            operation: 'subtract_money'
        };
    }
}

/**
 * Operation: Giving change (same unit)
 * "You buy something for 28p and pay with 50p. What change do you get?"
 */
function generateGiveChange(params) {
    if (!params.include_change) {
        return generateAddMoney(params);
    }

    const paymentAmount = randomChoice(params.payment_amounts);

    if (params.unit === 'pence_only') {
        // Cost must be less than payment amount
        const cost = randomInt(params.min_value, paymentAmount - 5);
        const change = paymentAmount - cost;

        const item = generateShoppingItems(1)[0];

        const templates = [
            {
                text: `You buy ${item} for ${cost}p. You pay with ${paymentAmount}p. How much change do you get?`,
                hint: 'Subtract the cost from the amount you paid'
            },
            {
                text: `${item} costs ${cost}p. You give ${paymentAmount}p to the shop keeper. What change do you receive?`,
                hint: 'Work out the difference between what you paid and the cost'
            },
            {
                text: `The price is ${cost}p. You pay ${paymentAmount}p. How much change?`,
                hint: 'Change = amount paid − cost'
            }
        ];

        const template = randomChoice(templates);

        return {
            text: template.text,
            type: 'text_input',
            answer: change.toString(),
            hint: template.hint,
            module: 'M09_Y2_MEAS',
            operation: 'give_change'
        };
    } else { // pounds_only
        const cost = randomInt(params.min_value, paymentAmount - 1);
        const change = paymentAmount - cost;

        const item = generateShoppingItems(1)[0];

        return {
            text: `You buy ${item} for £${cost}. You pay with £${paymentAmount}. How much change do you get?`,
            type: 'text_input',
            answer: change.toString(),
            hint: 'Subtract the cost from the amount you paid',
            module: 'M09_Y2_MEAS',
            operation: 'give_change'
        };
    }
}

/**
 * Operation: Multi-item problems (Level 4)
 * "You buy 3 apples at 15p each. How much do you spend?"
 */
function generateMultiItem(params) {
    if (params.unit === 'pence_only') {
        const itemCost = randomInt(5, 20);
        const quantity = randomInt(2, 4);
        const total = itemCost * quantity;

        if (total > params.max_total) {
            return generateAddMoney(params);
        }

        const items = ['apples', 'pencils', 'sweets', 'stickers', 'bananas'];
        const item = randomChoice(items);

        return {
            text: `You buy ${quantity} ${item} at ${itemCost}p each. How much do you spend?`,
            type: 'text_input',
            answer: total.toString(),
            hint: `Multiply ${itemCost} by ${quantity}`,
            module: 'M09_Y2_MEAS',
            operation: 'multi_item'
        };
    } else { // pounds_only
        const itemCost = randomInt(2, 5);
        const quantity = randomInt(2, 3);
        const total = itemCost * quantity;

        if (total > params.max_total) {
            return generateAddMoney(params);
        }

        const items = ['books', 'toys', 'games', 'puzzles'];
        const item = randomChoice(items);

        return {
            text: `You buy ${quantity} ${item} at £${itemCost} each. How much do you spend?`,
            type: 'text_input',
            answer: total.toString(),
            hint: `Multiply ${itemCost} by ${quantity}`,
            module: 'M09_Y2_MEAS',
            operation: 'multi_item'
        };
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
        case 'add_money':
            return generateAddMoney(params);
        case 'subtract_money':
            return generateSubtractMoney(params);
        case 'give_change':
            return generateGiveChange(params);
        case 'multi_item':
            return generateMultiItem(params);
        default:
            return generateAddMoney(params);
    }
}

export default {
    moduleId: 'M09_Y2_MEAS',
    generate: generateQuestion
};
