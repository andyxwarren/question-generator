/**
 * M03_Y1_MEAS: Recognise Coins and Notes
 * Year 1 - Recognise and know the value of different denominations of coins and notes
 */

import { randomChoice, randomInt } from './helpers/N01_countingHelpers.js';

/**
 * Format money value with appropriate symbol
 * @param {number} pence - Value in pence
 * @param {boolean} includePounds - Whether to use £ symbol for values >= 100p
 * @returns {string} Formatted money string
 */
function formatMoney(pence, includePounds = false) {
    if (includePounds && pence >= 100) {
        if (pence % 100 === 0) {
            return `£${pence / 100}`;
        } else {
            return `£${(pence / 100).toFixed(2)}`;
        }
    }
    return `${pence}p`;
}

/**
 * Get the name of a coin/note
 * @param {number} pence - Value in pence
 * @returns {string} Name of the denomination
 */
function getDenominationName(pence) {
    const names = {
        1: '1p coin',
        2: '2p coin',
        5: '5p coin',
        10: '10p coin',
        20: '20p coin',
        50: '50p coin',
        100: '£1 coin',
        200: '£2 coin',
        500: '£5 note',
        1000: '£10 note',
        2000: '£20 note',
        5000: '£50 note'
    };
    return names[pence] || `${pence}p`;
}

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
 * Operation: Identify the value of a named coin
 * "How much is a 5p coin worth?"
 */
function generateIdentifyCoinValue(params) {
    const coin = randomChoice(params.denominations);
    const name = getDenominationName(coin);

    return {
        text: `How much is a ${name} worth?`,
        type: 'text_input',
        answer: coin.toString(),
        hint: 'Enter the value in pence (e.g., 10 for 10p)',
        module: 'M03_Y1_MEAS',
        operation: 'identify_coin_value'
    };
}

/**
 * Operation: Identify which coin has a given value
 * "Which coin is worth 10p?"
 */
function generateIdentifyCoinByValue(params) {
    const targetValue = randomChoice(params.denominations);
    const correctName = getDenominationName(targetValue);

    // Generate distractors from available denominations
    let options = [correctName];
    const otherDenominations = params.denominations.filter(d => d !== targetValue);

    // Add 3 distractors
    while (options.length < 4 && otherDenominations.length > 0) {
        const distractor = randomChoice(otherDenominations);
        const distractorName = getDenominationName(distractor);
        if (!options.includes(distractorName)) {
            options.push(distractorName);
        }
        // Remove to avoid duplicates
        otherDenominations.splice(otherDenominations.indexOf(distractor), 1);
    }

    // Shuffle options
    options = shuffleArray(options);

    return {
        text: `Which coin is worth ${formatMoney(targetValue)}?`,
        type: 'multiple_choice',
        answer: correctName,
        options: options,
        module: 'M03_Y1_MEAS',
        operation: 'identify_coin_by_value'
    };
}

/**
 * Operation: State the value of a coin in pence
 * "A 2p coin is worth how many pence?"
 */
function generateStateCoinValue(params) {
    const coin = randomChoice(params.denominations);
    const name = getDenominationName(coin);

    return {
        text: `A ${name} is worth how many pence?`,
        type: 'text_input',
        answer: coin.toString(),
        hint: 'Enter just the number',
        module: 'M03_Y1_MEAS',
        operation: 'state_coin_value'
    };
}

/**
 * Operation: Compare two coins (Level 2+)
 * "Which is worth more: a 5p coin or a 10p coin?"
 */
function generateCompareTwoCoins(params) {
    // Select two different coins
    const coin1 = randomChoice(params.denominations);
    let coin2 = randomChoice(params.denominations);

    // Ensure they're different
    let attempts = 0;
    while (coin2 === coin1 && attempts < 10) {
        coin2 = randomChoice(params.denominations);
        attempts++;
    }

    const name1 = getDenominationName(coin1);
    const name2 = getDenominationName(coin2);

    const correctAnswer = coin1 > coin2 ? name1 : name2;

    return {
        text: `Which is worth more: a ${name1} or a ${name2}?`,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: shuffleArray([name1, name2]),
        module: 'M03_Y1_MEAS',
        operation: 'compare_two_coins'
    };
}

/**
 * Operation: Order coins by value (Level 3+)
 * "Put these coins in order from smallest to largest value: 20p, 5p, 10p"
 */
function generateOrderCoins(params) {
    // Select 3 different coins
    const selectedCoins = [];
    const availableCoins = [...params.denominations];

    for (let i = 0; i < Math.min(3, availableCoins.length); i++) {
        const coin = randomChoice(availableCoins);
        selectedCoins.push(coin);
        availableCoins.splice(availableCoins.indexOf(coin), 1);
    }

    // Sort for answer
    const sortedCoins = [...selectedCoins].sort((a, b) => a - b);
    const sortedNames = sortedCoins.map(c => formatMoney(c, params.include_pounds));

    // Shuffle for question
    const shuffledCoins = shuffleArray([...selectedCoins]);
    const shuffledNames = shuffledCoins.map(c => formatMoney(c, params.include_pounds));

    return {
        text: `Put these coins in order from smallest to largest value: ${shuffledNames.join(', ')}`,
        type: 'text_input',
        answer: sortedNames.join(', '),
        hint: 'Write the values separated by commas, e.g., "1p, 5p, 10p"',
        module: 'M03_Y1_MEAS',
        operation: 'order_coins'
    };
}

/**
 * Operation: Identify note value (Level 4+)
 * "How much is a £5 note worth in pence?"
 */
function generateIdentifyNoteValue(params) {
    const notes = params.denominations.filter(d => d >= 500);
    if (notes.length === 0) {
        // Fallback to coin question
        return generateIdentifyCoinValue(params);
    }

    const note = randomChoice(notes);
    const name = getDenominationName(note);

    return {
        text: `How much is a ${name} worth in pence?`,
        type: 'text_input',
        answer: note.toString(),
        hint: 'Enter the value in pence. Remember: £1 = 100p',
        module: 'M03_Y1_MEAS',
        operation: 'identify_note_value'
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
        case 'identify_coin_value':
            return generateIdentifyCoinValue(params);
        case 'identify_coin_by_value':
            return generateIdentifyCoinByValue(params);
        case 'state_coin_value':
            return generateStateCoinValue(params);
        case 'compare_two_coins':
            return generateCompareTwoCoins(params);
        case 'order_coins':
            return generateOrderCoins(params);
        case 'identify_note_value':
            return generateIdentifyNoteValue(params);
        default:
            return generateIdentifyCoinValue(params);
    }
}

export default {
    moduleId: 'M03_Y1_MEAS',
    generate: generateQuestion
};
