/**
 * M03_Y3_MEAS: Money Consolidation
 * Year 3 - Key stage 1 content domain - consolidation and extension of Year 1-2 money concepts
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
 * @param {string} format - 'pence', 'pounds', or 'mixed'
 * @returns {string} Formatted money string
 */
function formatMoney(pence, format = 'pence') {
    if (format === 'pounds' || (format === 'mixed' && pence >= 100)) {
        if (pence % 100 === 0) {
            return `£${pence / 100}`;
        } else {
            return `£${(pence / 100).toFixed(2)}`;
        }
    }
    return `${pence}p`;
}

/**
 * Get the name of a denomination
 * @param {number} pence - Value in pence
 * @returns {string} Name of the denomination
 */
function getDenominationName(pence) {
    const names = {
        1: '1p',
        2: '2p',
        5: '5p',
        10: '10p',
        20: '20p',
        50: '50p',
        100: '£1',
        200: '£2',
        500: '£5',
        1000: '£10',
        2000: '£20'
    };
    return names[pence] || `${pence}p`;
}

/**
 * Operation: Recognize all coins
 * "Which coin is worth the most: 20p, £1, or 50p?"
 */
function generateRecognizeAllCoins(params) {
    // Select 3-4 coins
    const numCoins = randomInt(3, 4);
    const selectedCoins = [];
    const availableCoins = [...params.denominations];

    for (let i = 0; i < numCoins && availableCoins.length > 0; i++) {
        const coin = randomChoice(availableCoins);
        selectedCoins.push(coin);
        availableCoins.splice(availableCoins.indexOf(coin), 1);
    }

    const coinNames = selectedCoins.map(c => getDenominationName(c));
    const maxCoin = Math.max(...selectedCoins);
    const correctAnswer = getDenominationName(maxCoin);

    return {
        text: `Which coin is worth the most: ${coinNames.join(', ')}?`,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: shuffleArray(coinNames),
        module: 'M03_Y3_MEAS',
        operation: 'recognize_all_coins'
    };
}

/**
 * Operation: Convert pounds and pence
 * "How many pence is £2.50?"
 */
function generateConvertPoundsPence(params) {
    const conversionType = randomInt(1, 2);

    if (conversionType === 1) {
        // Pounds to pence
        const pounds = randomInt(1, Math.floor(params.target_amounts.max / 100));
        let pence = 0;

        if (params.conversion_format === 'mixed' || params.conversion_format === 'complex') {
            pence = randomChoice([0, 25, 50, 75]); // Common decimal amounts
        }

        const totalPence = (pounds * 100) + pence;
        const poundsStr = pence === 0 ? `£${pounds}` : `£${pounds}.${pence.toString().padStart(2, '0')}`;

        return {
            text: `How many pence is ${poundsStr}?`,
            type: 'text_input',
            answer: totalPence.toString(),
            hint: 'Remember: £1 = 100p',
            module: 'M03_Y3_MEAS',
            operation: 'convert_pounds_pence'
        };
    } else {
        // Pence to pounds
        const pounds = randomInt(1, Math.floor(params.target_amounts.max / 100));
        let pence = 0;

        if (params.conversion_format === 'mixed' || params.conversion_format === 'complex') {
            pence = randomChoice([0, 25, 50, 75]);
        }

        const totalPence = (pounds * 100) + pence;
        const expectedAnswer = pence === 0 ? `£${pounds}` : `£${pounds}.${pence.toString().padStart(2, '0')}`;

        return {
            text: `How much is ${totalPence}p in pounds? Write your answer using the £ symbol.`,
            type: 'text_input',
            answer: expectedAnswer,
            hint: 'Remember: 100p = £1. Use the £ symbol.',
            module: 'M03_Y3_MEAS',
            operation: 'convert_pounds_pence'
        };
    }
}

/**
 * Operation: Combine amounts
 * "You have 45p and you get 30p more. How much do you have now?"
 */
function generateCombineAmounts(params) {
    const amount1 = randomInt(params.target_amounts.min, Math.floor(params.target_amounts.max / 2));
    const amount2 = randomInt(params.target_amounts.min, Math.floor(params.target_amounts.max / 2));
    const total = amount1 + amount2;

    return {
        text: `You have ${amount1}p and you get ${amount2}p more. How much do you have now?`,
        type: 'text_input',
        answer: total.toString(),
        hint: 'Add the two amounts together',
        module: 'M03_Y3_MEAS',
        operation: 'combine_amounts'
    };
}

/**
 * Operation: Make amount with coins
 * "Show one way to make 75p using coins."
 */
function generateMakeAmountCoins(params) {
    const target = randomChoice([25, 30, 40, 50, 60, 75, 80, 100]);

    // Calculate one valid combination using greedy algorithm
    let remaining = target;
    const coins = [];
    const sortedDenoms = [...params.denominations].sort((a, b) => b - a);

    for (const denom of sortedDenoms) {
        while (remaining >= denom) {
            coins.push(denom);
            remaining -= denom;
        }
    }

    const coinCounts = {};
    coins.forEach(coin => {
        coinCounts[coin] = (coinCounts[coin] || 0) + 1;
    });

    const exampleAnswer = Object.entries(coinCounts)
        .map(([coin, count]) => `${count} × ${getDenominationName(parseInt(coin))}`)
        .join(', ');

    return {
        text: `Show one way to make ${target}p using coins. Write your answer like: "2 × 20p, 1 × 10p"`,
        type: 'text_input',
        answer: exampleAnswer,
        hint: 'Think about which coins add up to the target. There may be more than one correct answer.',
        module: 'M03_Y3_MEAS',
        operation: 'make_amount_coins',
        flexible: true
    };
}

/**
 * Operation: Find multiple combinations
 * "Name two different ways to make 50p."
 */
function generateFindCombinations(params) {
    const target = randomChoice([20, 30, 50, 100]);

    return {
        text: `Name one way to make ${formatMoney(target, params.include_notes ? 'mixed' : 'pence')} using coins.`,
        type: 'text_input',
        answer: 'various',
        hint: 'Use the fewest coins possible. Example: "1 × 50p" or "2 × 20p, 1 × 10p"',
        module: 'M03_Y3_MEAS',
        operation: 'find_combinations',
        flexible: true
    };
}

/**
 * Operation: Make amount efficiently
 * "What is the smallest number of coins needed to make 87p?"
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
        hint: 'Use the largest coins first to minimize the number needed',
        module: 'M03_Y3_MEAS',
        operation: 'make_amount_efficient'
    };
}

/**
 * Operation: Compare amounts
 * "Which is more: £1.20 or 105p?"
 */
function generateCompareAmounts(params) {
    const amount1Pence = randomInt(params.target_amounts.min, params.target_amounts.max);
    const amount2Pence = randomInt(params.target_amounts.min, params.target_amounts.max);

    // Ensure they're different
    if (amount1Pence === amount2Pence) {
        return generateCompareAmounts(params); // Recursive retry
    }

    // Randomly format one as pounds, one as pence
    const format1 = randomInt(0, 1) === 0 ? 'pence' : 'pounds';
    const format2 = format1 === 'pence' ? 'pounds' : 'pence';

    const amount1Str = formatMoney(amount1Pence, format1);
    const amount2Str = formatMoney(amount2Pence, format2);

    const larger = amount1Pence > amount2Pence ? amount1Str : amount2Str;

    return {
        text: `Which is more: ${amount1Str} or ${amount2Str}?`,
        type: 'multiple_choice',
        answer: larger,
        options: shuffleArray([amount1Str, amount2Str]),
        module: 'M03_Y3_MEAS',
        operation: 'compare_amounts'
    };
}

/**
 * Operation: Solve change problems
 * "You buy something for 35p and pay with 50p. How much change do you get?"
 */
function generateSolveChangeProblems(params) {
    const itemCost = randomInt(params.target_amounts.min, params.target_amounts.max - 20);
    const paidOptions = params.denominations.filter(d => d > itemCost);

    if (paidOptions.length === 0) {
        // Fallback
        return generateCombineAmounts(params);
    }

    const paidWith = randomChoice(paidOptions);
    const change = paidWith - itemCost;

    return {
        text: `You buy something for ${itemCost}p and pay with ${getDenominationName(paidWith)}. How much change do you get?`,
        type: 'text_input',
        answer: change.toString(),
        hint: 'Subtract the cost from what you paid',
        module: 'M03_Y3_MEAS',
        operation: 'solve_change_problems'
    };
}

/**
 * Operation: Solve money problems (word problems)
 * "Tom has 65p. He buys a pencil for 30p. How much does he have left?"
 */
function generateSolveMoneyProblems(params) {
    const names = ['Tom', 'Sarah', 'Ali', 'Emma', 'Jack', 'Lily'];
    const items = ['pencil', 'eraser', 'sticker', 'sweet', 'toy', 'book'];

    const name = randomChoice(names);
    const item = randomChoice(items);

    const startAmount = randomInt(params.target_amounts.min, params.target_amounts.max);
    const itemCost = randomInt(Math.floor(startAmount * 0.3), Math.floor(startAmount * 0.7));
    const remaining = startAmount - itemCost;

    const problemType = randomInt(1, 3);

    switch (problemType) {
        case 1:
            // Subtraction problem
            return {
                text: `${name} has ${formatMoney(startAmount, 'pence')}. ${name} buys a ${item} for ${formatMoney(itemCost, 'pence')}. How much does ${name} have left?`,
                type: 'text_input',
                answer: remaining.toString(),
                hint: 'Subtract the cost from the starting amount',
                module: 'M03_Y3_MEAS',
                operation: 'solve_money_problems'
            };

        case 2:
            // Addition problem
            const amount1 = randomInt(20, 100);
            const amount2 = randomInt(20, 100);
            const total = amount1 + amount2;

            return {
                text: `${name} has ${formatMoney(amount1, 'pence')} and receives ${formatMoney(amount2, 'pence')} more. How much does ${name} have in total?`,
                type: 'text_input',
                answer: total.toString(),
                hint: 'Add the two amounts together',
                module: 'M03_Y3_MEAS',
                operation: 'solve_money_problems'
            };

        case 3:
            // Finding difference
            const price1 = randomInt(30, 150);
            const price2 = randomInt(30, 150);
            const difference = Math.abs(price1 - price2);

            return {
                text: `A ${item} costs ${formatMoney(price1, 'pence')}. A book costs ${formatMoney(price2, 'pence')}. How much more does the ${price1 > price2 ? item : 'book'} cost?`,
                type: 'text_input',
                answer: difference.toString(),
                hint: 'Find the difference between the two prices',
                module: 'M03_Y3_MEAS',
                operation: 'solve_money_problems'
            };

        default:
            return generateCombineAmounts(params);
    }
}

/**
 * Operation: Recognize all denominations (including notes)
 * "Put these in order from smallest to largest: £5, 50p, £1, 200p"
 */
function generateRecognizeAllDenominations(params) {
    const selectedDenoms = [];
    const availableDenoms = [...params.denominations];

    if (params.include_notes && params.notes) {
        availableDenoms.push(...params.notes);
    }

    // Select 3-4 denominations
    const count = randomInt(3, 4);
    for (let i = 0; i < count && availableDenoms.length > 0; i++) {
        const denom = randomChoice(availableDenoms);
        selectedDenoms.push(denom);
        availableDenoms.splice(availableDenoms.indexOf(denom), 1);
    }

    // Sort for answer
    const sortedDenoms = [...selectedDenoms].sort((a, b) => a - b);
    const sortedNames = sortedDenoms.map(d => getDenominationName(d));

    // Shuffle for question
    const shuffledNames = shuffleArray(selectedDenoms.map(d => getDenominationName(d)));

    return {
        text: `Put these in order from smallest to largest value: ${shuffledNames.join(', ')}`,
        type: 'text_input',
        answer: sortedNames.join(', '),
        hint: 'Remember: £1 = 100p, so 200p = £2',
        module: 'M03_Y3_MEAS',
        operation: 'recognize_all_denominations'
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
        case 'recognize_all_coins':
            return generateRecognizeAllCoins(params);
        case 'recognize_all_denominations':
            return generateRecognizeAllDenominations(params);
        case 'convert_pounds_pence':
            return generateConvertPoundsPence(params);
        case 'combine_amounts':
            return generateCombineAmounts(params);
        case 'make_amount_coins':
            return generateMakeAmountCoins(params);
        case 'find_combinations':
            return generateFindCombinations(params);
        case 'find_multiple_combinations':
            return generateFindCombinations(params);
        case 'make_amount_efficient':
            return generateMakeAmountEfficient(params);
        case 'compare_amounts':
            return generateCompareAmounts(params);
        case 'solve_change_problems':
            return generateSolveChangeProblems(params);
        case 'solve_money_problems':
            return generateSolveMoneyProblems(params);
        default:
            return generateCombineAmounts(params);
    }
}

export default {
    moduleId: 'M03_Y3_MEAS',
    generate: generateQuestion
};
