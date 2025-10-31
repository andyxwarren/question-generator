/**
 * M03_Y2_MEAS: Pounds and Pence
 * Year 2 - Recognise and use symbols for pounds (£) and pence (p); combine amounts to make a particular value;
 * find different combinations of coins that equal the same amounts of money
 */

import { randomChoice, randomInt } from './helpers/N01_countingHelpers.js';

/**
 * Shuffle array helper
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Format money value with appropriate symbol
 * @param {number} pence - Value in pence
 * @param {string} format - 'pence' or 'pounds' or 'mixed'
 * @returns {string} Formatted money string
 */
function formatMoney(pence, format = 'pence') {
    if (format === 'pounds' && pence >= 100) {
        if (pence % 100 === 0) {
            return `£${pence / 100}`;
        } else {
            return `£${(pence / 100).toFixed(2)}`;
        }
    }
    return `${pence}p`;
}

/**
 * Get the name of a coin
 * @param {number} pence - Value in pence
 * @returns {string} Name of the coin
 */
function getCoinName(pence) {
    const names = {
        1: '1p',
        2: '2p',
        5: '5p',
        10: '10p',
        20: '20p',
        50: '50p',
        100: '£1',
        200: '£2'
    };
    return names[pence] || `${pence}p`;
}

/**
 * Operation: Use pence symbol
 * "Write 25 pence using the p symbol"
 */
function generateUsePenceSymbol(params) {
    const value = randomInt(params.target_amounts.min, params.target_amounts.max);

    return {
        text: `Write ${value} pence using the p symbol.`,
        type: 'text_input',
        answer: `${value}p`,
        hint: 'Write the number followed by the letter p',
        module: 'M03_Y2_MEAS',
        operation: 'use_pence_symbol'
    };
}

/**
 * Operation: Use pounds symbol
 * "Write £2 in pence"
 */
function generateUsePoundsSymbol(params) {
    const pounds = randomInt(1, Math.floor(params.target_amounts.max / 100));
    const pence = pounds * 100;

    const questionType = randomInt(1, 2);

    if (questionType === 1) {
        return {
            text: `Write £${pounds} in pence.`,
            type: 'text_input',
            answer: `${pence}p`,
            hint: 'Remember: £1 = 100p',
            module: 'M03_Y2_MEAS',
            operation: 'use_pounds_symbol'
        };
    } else {
        return {
            text: `Write ${pence} pence using the £ symbol.`,
            type: 'text_input',
            answer: `£${pounds}`,
            hint: 'Use the £ symbol. Remember: 100p = £1',
            module: 'M03_Y2_MEAS',
            operation: 'use_pounds_symbol'
        };
    }
}

/**
 * Operation: Combine same coins
 * "You have three 5p coins. How much money do you have?"
 */
function generateCombineSameCoins(params) {
    const coin = randomChoice(params.denominations.filter(d => d <= 20)); // Keep it simple
    const count = randomInt(2, Math.min(params.max_coins, 5));
    const total = coin * count;

    const coinName = getCoinName(coin);

    return {
        text: `You have ${count} ${coinName} coins. How much money do you have?`,
        type: 'text_input',
        answer: total.toString(),
        hint: 'Enter the total value in pence',
        module: 'M03_Y2_MEAS',
        operation: 'combine_same_coins'
    };
}

/**
 * Operation: Make amount with one coin type
 * "How many 2p coins do you need to make 10p?"
 */
function generateMakeAmountOneCoinType(params) {
    const coin = randomChoice(params.denominations.filter(d => d <= 10)); // Simple coins
    const multiplier = randomInt(2, 5);
    const target = coin * multiplier;

    return {
        text: `How many ${getCoinName(coin)} coins do you need to make ${target}p?`,
        type: 'text_input',
        answer: multiplier.toString(),
        hint: 'How many times does the coin value go into the target amount?',
        module: 'M03_Y2_MEAS',
        operation: 'make_amount_one_coin_type'
    };
}

/**
 * Operation: Make amount with mixed coins
 * "You need to make 17p. You can use one 10p coin. How many more pence do you need?"
 */
function generateMakeAmountMixedCoins(params) {
    const target = randomInt(params.target_amounts.min, params.target_amounts.max);
    const largerCoin = randomChoice(params.denominations.filter(d => d < target && d >= 10));
    const remainder = target - largerCoin;

    return {
        text: `You need to make ${target}p. You use one ${getCoinName(largerCoin)} coin. How many more pence do you need?`,
        type: 'text_input',
        answer: remainder.toString(),
        hint: 'Subtract the coin value from the target amount',
        module: 'M03_Y2_MEAS',
        operation: 'make_amount_mixed_coins'
    };
}

/**
 * Operation: Find a combination of coins
 * "Show one way to make 12p using 2p and 5p coins"
 */
function generateFindCombination(params) {
    // Generate a target that can be made with available coins
    const availableCoins = params.denominations.filter(d => d <= 10);
    const coin1 = randomChoice(availableCoins);
    let coin2 = randomChoice(availableCoins.filter(c => c !== coin1));

    if (!coin2) coin2 = coin1; // Fallback if only one coin type

    // Create a simple combination
    const count1 = randomInt(1, 3);
    const count2 = randomInt(1, 3);
    const target = (coin1 * count1) + (coin2 * count2);

    return {
        text: `Show one way to make ${target}p. Write your answer like this: "2 × 5p, 1 × 2p"`,
        type: 'text_input',
        answer: `${count1} × ${getCoinName(coin1)}, ${count2} × ${getCoinName(coin2)}`,
        hint: 'Think about which coins add up to the target amount',
        module: 'M03_Y2_MEAS',
        operation: 'find_combination',
        acceptableAnswers: true // Note: This would need special validation
    };
}

/**
 * Operation: Find multiple combinations (Level 3+)
 * "Name two different ways to make 10p"
 */
function generateFindMultipleCombinations(params) {
    const target = randomChoice([10, 15, 20, 25, 30]); // Common targets with multiple solutions

    return {
        text: `Name one way to make ${target}p using coins.`,
        type: 'text_input',
        answer: 'various', // This would need flexible validation
        hint: 'Think about which coins you could use. For example: "2 × 5p" or "1 × 10p"',
        module: 'M03_Y2_MEAS',
        operation: 'find_multiple_combinations',
        flexible: true
    };
}

/**
 * Operation: Convert pounds and pence (Level 3+)
 * "How many pence is £1.50?"
 */
function generateConvertPoundsPence(params) {
    const pounds = randomInt(1, Math.floor(params.target_amounts.max / 100));
    const extraPence = randomChoice([0, 20, 50]); // Keep it simple
    const totalPence = (pounds * 100) + extraPence;

    const questionType = randomInt(1, 2);

    if (questionType === 1) {
        // Pounds to pence
        if (extraPence === 0) {
            return {
                text: `How many pence is £${pounds}?`,
                type: 'text_input',
                answer: totalPence.toString(),
                hint: 'Remember: £1 = 100p',
                module: 'M03_Y2_MEAS',
                operation: 'convert_pounds_pence'
            };
        } else {
            const poundsDecimal = (totalPence / 100).toFixed(2);
            return {
                text: `How many pence is £${poundsDecimal}?`,
                type: 'text_input',
                answer: totalPence.toString(),
                hint: 'Remember: £1 = 100p',
                module: 'M03_Y2_MEAS',
                operation: 'convert_pounds_pence'
            };
        }
    } else {
        // Pence to pounds (only for whole pounds)
        const wholePounds = pounds * 100;
        return {
            text: `How much is ${wholePounds}p in pounds? Write your answer like £2`,
            type: 'text_input',
            answer: `£${pounds}`,
            hint: 'Remember: 100p = £1',
            module: 'M03_Y2_MEAS',
            operation: 'convert_pounds_pence'
        };
    }
}

/**
 * Operation: Make amount efficiently (Level 4+)
 * "What is the smallest number of coins needed to make 37p?"
 */
function generateMakeAmountEfficient(params) {
    const target = randomInt(params.target_amounts.min, params.target_amounts.max);

    // Calculate fewest coins using greedy algorithm
    let remaining = target;
    let coinCount = 0;
    const sortedCoins = [...params.denominations].sort((a, b) => b - a);

    for (const coin of sortedCoins) {
        if (remaining >= coin) {
            const count = Math.floor(remaining / coin);
            coinCount += count;
            remaining -= count * coin;
        }
    }

    return {
        text: `What is the smallest number of coins needed to make ${target}p?`,
        type: 'text_input',
        answer: coinCount.toString(),
        hint: 'Use the largest coins first',
        module: 'M03_Y2_MEAS',
        operation: 'make_amount_efficient'
    };
}

/**
 * Operation: Identify missing amount (Level 4+)
 * "You have 25p. You need 50p. How much more do you need?"
 */
function generateIdentifyMissingAmount(params) {
    const target = randomInt(params.target_amounts.min, params.target_amounts.max);
    const have = randomInt(Math.floor(target * 0.3), Math.floor(target * 0.7));
    const need = target - have;

    return {
        text: `You have ${have}p. You need ${target}p. How much more do you need?`,
        type: 'text_input',
        answer: need.toString(),
        hint: 'Subtract what you have from what you need',
        module: 'M03_Y2_MEAS',
        operation: 'identify_missing_amount'
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
        case 'use_pence_symbol':
            return generateUsePenceSymbol(params);
        case 'use_pounds_symbol':
            return generateUsePoundsSymbol(params);
        case 'combine_same_coins':
            return generateCombineSameCoins(params);
        case 'make_amount_one_coin_type':
            return generateMakeAmountOneCoinType(params);
        case 'make_amount_mixed_coins':
            return generateMakeAmountMixedCoins(params);
        case 'find_combination':
            return generateFindCombination(params);
        case 'find_multiple_combinations':
            return generateFindMultipleCombinations(params);
        case 'convert_pounds_pence':
            return generateConvertPoundsPence(params);
        case 'make_amount_efficient':
            return generateMakeAmountEfficient(params);
        case 'identify_missing_amount':
            return generateIdentifyMissingAmount(params);
        case 'combine_mixed_coins':
            return generateMakeAmountMixedCoins(params); // Alias
        default:
            return generateUsePenceSymbol(params);
    }
}

export default {
    moduleId: 'M03_Y2_MEAS',
    generate: generateQuestion
};
