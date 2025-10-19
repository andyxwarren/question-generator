/**
 * C07_Y2_CALC - Written Methods (Year 2)
 *
 * Module: C07_Y2_CALC - "Write them using the multiplication (×), division (÷) and equals (=) signs"
 *
 * Focus: Understanding and writing multiplication/division using correct mathematical symbols
 *
 * Operations:
 * 1. Write multiplication statements (e.g., 3 groups of 4 = 3 × 4 = 12)
 * 2. Write division statements (e.g., 12 shared by 3 = 12 ÷ 3 = 4)
 * 3. Identify which symbol is needed for a given scenario
 *
 * This is the foundation for written methods - students must first understand
 * the symbols before progressing to formal written layouts in later years.
 */

import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'write_multiplication':
            return generateWriteMultiplication(params, level);
        case 'write_division':
            return generateWriteDivision(params, level);
        case 'identify_symbols':
            return generateIdentifySymbols(params, level);
        default:
            return generateWriteMultiplication(params, level);
    }
}

/**
 * OPERATION 1: Write a multiplication statement
 * Students write equations using × and = symbols
 */
function generateWriteMultiplication(params, level) {
    const groups = randomInt(2, Math.min(10, params.max_value / 2));
    const itemsPerGroup = randomInt(2, 10);
    const answer = groups * itemsPerGroup;

    const items = ['apples', 'pencils', 'books', 'stickers', 'marbles', 'sweets', 'coins', 'counters'];
    const item = randomChoice(items);

    if (level <= 2) {
        // Simple: just write the equation (text input)
        return {
            text: `There are ${groups} groups with ${itemsPerGroup} ${item} in each group.\n\nWrite the multiplication: ___ × ___ = ___`,
            type: 'text_input',
            answer: `${groups} × ${itemsPerGroup} = ${answer}`,
            hint: 'Format: number × number = answer',
            module: 'C07_Y2_CALC',
            level: level
        };
    } else {
        // Multiple choice: choose correct statement
        const correct = `${groups} × ${itemsPerGroup} = ${answer}`;
        const wrong1 = `${groups} + ${itemsPerGroup} = ${groups + itemsPerGroup}`;  // Addition instead
        const wrong2 = `${itemsPerGroup} × ${groups} = ${answer + randomInt(1, 5)}`;  // Wrong answer
        const wrong3 = `${groups} × ${itemsPerGroup} = ${groups * (itemsPerGroup + 1)}`;  // Off by one

        const options = shuffle([correct, wrong1, wrong2, wrong3]);

        return {
            text: `There are ${groups} groups with ${itemsPerGroup} ${item} in each group.\n\nWhich statement is correct?`,
            type: 'multiple_choice',
            options: options,
            answer: correct,
            hint: 'Number of groups × items per group = total',
            module: 'C07_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Write a division statement
 * Students write equations using ÷ and = symbols
 */
function generateWriteDivision(params, level) {
    const divisor = randomInt(2, 10);
    const quotient = randomInt(2, Math.floor(params.max_value / divisor));
    const dividend = divisor * quotient;

    const items = ['apples', 'pencils', 'books', 'stickers', 'sweets', 'marbles', 'coins'];
    const item = randomChoice(items);

    const contexts = [
        `Share ${dividend} ${item} equally among ${divisor} children.`,
        `${dividend} ${item} are put into ${divisor} equal groups.`,
        `Divide ${dividend} ${item} into ${divisor} equal piles.`
    ];

    const context = randomChoice(contexts);

    if (level <= 2) {
        // Text input: write the division
        return {
            text: `${context}\n\nWrite the division: ___ ÷ ___ = ___`,
            type: 'text_input',
            answer: `${dividend} ÷ ${divisor} = ${quotient}`,
            hint: 'Format: total ÷ number of groups = amount in each group',
            module: 'C07_Y2_CALC',
            level: level
        };
    } else {
        // Multiple choice: choose correct statement
        const correct = `${dividend} ÷ ${divisor} = ${quotient}`;
        const wrong1 = `${dividend} - ${divisor} = ${dividend - divisor}`;  // Subtraction instead
        const wrong2 = `${dividend} ÷ ${quotient} = ${divisor}`;  // Swapped divisor and quotient
        const wrong3 = `${divisor} ÷ ${dividend} = ${quotient}`;  // Completely backwards

        const options = shuffle([correct, wrong1, wrong2, wrong3]);

        return {
            text: `${context}\n\nWhich division statement is correct?`,
            type: 'multiple_choice',
            options: options,
            answer: correct,
            hint: 'Total ÷ number of groups = amount per group',
            module: 'C07_Y2_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Identify which symbol is needed
 * Students recognize when to use × vs ÷
 */
function generateIdentifySymbols(params, level) {
    const scenarios = [
        {
            groups: 5,
            items: 3,
            type: 'multiplication',
            text: '5 bags with 3 sweets in each bag. Total sweets?',
            correct: '×',
            equation: '5 × 3 = 15'
        },
        {
            total: 12,
            groups: 4,
            type: 'division',
            text: '12 pencils shared equally among 4 children. Pencils per child?',
            correct: '÷',
            equation: '12 ÷ 4 = 3'
        },
        {
            groups: 6,
            items: 4,
            type: 'multiplication',
            text: '6 groups of 4 apples. Total apples?',
            correct: '×',
            equation: '6 × 4 = 24'
        },
        {
            total: 20,
            groups: 5,
            type: 'division',
            text: '20 stickers divided into 5 equal groups. Stickers in each group?',
            correct: '÷',
            equation: '20 ÷ 5 = 4'
        },
        {
            groups: 3,
            items: 7,
            type: 'multiplication',
            text: '3 packs with 7 cards in each pack. Total cards?',
            correct: '×',
            equation: '3 × 7 = 21'
        },
        {
            total: 18,
            groups: 6,
            type: 'division',
            text: '18 marbles shared between 6 friends. Marbles each?',
            correct: '÷',
            equation: '18 ÷ 6 = 3'
        }
    ];

    const scenario = randomChoice(scenarios);

    if (level <= 2) {
        // Multiple choice: choose the symbol
        const options = shuffle(['×', '÷', '+', '−']);

        return {
            text: `${scenario.text}\n\nWhich symbol is needed?`,
            type: 'multiple_choice',
            options: options,
            answer: scenario.correct,
            hint: `The complete equation is: ${scenario.equation}`,
            module: 'C07_Y2_CALC',
            level: level
        };
    } else {
        // Text input: write the complete calculation
        return {
            text: `${scenario.text}\n\nWrite the complete calculation: ___ ___ ___ = ___`,
            type: 'text_input',
            answer: scenario.equation,
            hint: 'Use ×, ÷, and = symbols',
            module: 'C07_Y2_CALC',
            level: level
        };
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'C07_Y2_CALC',
    generate: generateQuestion
};
