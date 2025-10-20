/**
 * Year 1 C08 Generator: One-Step Multiplication and Division Problems (REDESIGNED)
 *
 * Module: C08_Y1_CALC - "Solve one-step problems involving multiplication and division,
 * by calculating the answer using concrete objects, pictorial representations and arrays"
 *
 * REDESIGN PRINCIPLES:
 * 1. Multiple choice ONLY at all 4 levels (appropriate Y1 scaffolding)
 * 2. Low-overhead visual representations (emojis, dots, <pre> tags)
 * 3. NO remainders at any level (outside Y1 scope)
 * 4. Small number ranges (max product 20, not 50)
 * 5. Simple, clear language (max 10-15 words)
 * 6. Curriculum focus: "concrete objects, pictorial representations and arrays"
 *
 * OPERATIONS (7 total - quality over quantity):
 * 1. Equal groups with visual (emoji groups)
 * 2. Array multiplication with visual (dot arrays)
 * 3. Array division with visual (dot arrays divided)
 * 4. Sharing with visual (emoji sharing)
 * 5. Grouping with visual (making groups)
 * 6. Repeated addition with visual (numbers shown)
 * 7. Doubling/Halving (simple cases)
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import { generateMultDivDistractors } from './helpers/C08_propertyHelpers.js';
import {
    generateDotArray,
    generateEmojiGroups,
    generateRepeatedNumber,
    generateSharingVisualization,
    getContextEmoji,
    createArrayQuestion,
    createEqualGroupsQuestion,
    createSharingQuestion
} from './helpers/visualHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'equal_groups_visual':
            return generateEqualGroupsVisualQuestion(params, level);
        case 'array_multiplication_visual':
            return generateArrayMultiplicationVisualQuestion(params, level);
        case 'array_division_visual':
            return generateArrayDivisionVisualQuestion(params, level);
        case 'sharing_visual':
            return generateSharingVisualQuestion(params, level);
        case 'grouping_visual':
            return generateGroupingVisualQuestion(params, level);
        case 'repeated_addition_visual':
            return generateRepeatedAdditionVisualQuestion(params, level);
        case 'doubling':
            return generateDoublingQuestion(params, level);
        case 'halving':
            return generateHalvingQuestion(params, level);
        default:
            return generateEqualGroupsVisualQuestion(params, level);
    }
}

/**
 * OPERATION 1: Equal Groups with Visual
 * Shows groups of items using emojis
 * Example: 🍎 🍎   🍎 🍎   "How many apples altogether?"
 */
function generateEqualGroupsVisualQuestion(params, level) {
    // Select multiplier from tables
    const perGroup = randomChoice(params.tables);
    const maxGroups = Math.min(
        Math.floor(params.max_product / perGroup),
        params.max_groups
    );
    const groups = randomInt(params.min_groups, maxGroups);
    const answer = groups * perGroup;

    // Ensure we don't exceed max_product
    if (answer > params.max_product) {
        return generateEqualGroupsVisualQuestion(params, level);
    }

    // Create visual
    const contextType = randomChoice(params.context_types);
    const questionData = createEqualGroupsQuestion(groups, perGroup, contextType);

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { a: groups, b: perGroup });
    const options = shuffle([answer, ...distractors]);

    return {
        text: questionData.visual + '<br>' + questionData.questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: questionData.working,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Array Multiplication with Visual
 * Shows dot array, asks for total
 * Example: ● ● ● / ● ● ● / "How many dots altogether?"
 */
function generateArrayMultiplicationVisualQuestion(params, level) {
    const rows = randomChoice(params.tables);
    const maxCols = Math.floor(params.max_product / rows);
    const cols = randomInt(2, Math.min(maxCols, params.max_groups));
    const answer = rows * cols;

    // Ensure we don't exceed max_product
    if (answer > params.max_product) {
        return generateArrayMultiplicationVisualQuestion(params, level);
    }

    // Create visual
    const visual = generateDotArray(rows, cols);
    const questionText = 'How many dots are there altogether?';

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { a: rows, b: cols });
    const options = shuffle([answer, ...distractors]);

    return {
        text: visual + '<br>' + questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${rows} rows × ${cols} dots = ${answer}`,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Array Division with Visual
 * Shows dot array, asks for items per row
 * Example: ● ● ● / ● ● ● / "There are 2 rows. How many dots in each row?"
 */
function generateArrayDivisionVisualQuestion(params, level) {
    const rows = randomChoice(params.tables.filter(t => t <= params.max_groups));
    const cols = randomInt(2, Math.floor(params.max_product / rows));
    const total = rows * cols;
    const answer = cols;

    // Ensure we don't exceed max_product
    if (total > params.max_product) {
        return generateArrayDivisionVisualQuestion(params, level);
    }

    // Create visual
    const visual = generateDotArray(rows, cols);
    const questionText = `There are ${rows} rows. How many dots in each row?`;

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { total, divisor: rows });
    const options = shuffle([answer, ...distractors]);

    return {
        text: visual + '<br>' + questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${total} ÷ ${rows} = ${answer}`,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Sharing with Visual
 * Shows items being shared among people
 * Example: 👤 🍪 🍪 / 👤 🍪 🍪 / "How many cookies each?"
 */
function generateSharingVisualQuestion(params, level) {
    const people = randomChoice(params.tables.filter(t => t <= params.max_groups));
    const perPerson = randomInt(1, Math.floor(params.max_product / people));
    const total = people * perPerson;
    const answer = perPerson;

    // Ensure exact division and within max_product
    if (total > params.max_product || total % people !== 0) {
        return generateSharingVisualQuestion(params, level);
    }

    // Create visual
    const contextType = randomChoice(params.context_types);
    const questionData = createSharingQuestion(total, people, contextType);

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { total, divisor: people });
    const options = shuffle([answer, ...distractors]);

    return {
        text: questionData.visual + '<br>' + questionData.questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: questionData.working,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Grouping with Visual
 * Shows items, asks how many groups can be made
 * Example: 🍎 🍎 🍎 🍎 🍎 🍎 / "Make groups of 2. How many groups?"
 */
function generateGroupingVisualQuestion(params, level) {
    const itemsPerGroup = randomChoice(params.tables);
    const maxGroups = Math.min(
        Math.floor(params.max_product / itemsPerGroup),
        params.max_groups
    );
    const groups = randomInt(2, maxGroups);
    const total = groups * itemsPerGroup;
    const answer = groups;

    // Ensure we don't exceed max_product
    if (total > params.max_product) {
        return generateGroupingVisualQuestion(params, level);
    }

    // Create visual - show all items in a line
    const contextType = randomChoice(params.context_types);
    const emoji = getContextEmoji(contextType);
    const visual = `<pre class="visual-groups">${(emoji + ' ').repeat(total).trim()}</pre>`;

    // Map emoji to word
    const emojiWords = {
        '🍎': 'apples', '🍊': 'oranges', '🍌': 'bananas', '🍓': 'strawberries', '🍇': 'grapes',
        '⭐': 'stars', '🔵': 'circles', '🟢': 'circles', '🟡': 'circles', '🟣': 'circles',
        '🧸': 'bears', '🎈': 'balloons', '🎁': 'presents', '⚽': 'balls', '🎨': 'paints',
        '🍪': 'cookies', '🍬': 'sweets', '🍩': 'donuts', '🧁': 'cakes', '🍰': 'cakes'
    };
    const itemName = emojiWords[emoji] || 'items';

    const questionText = `Put these into groups of ${itemsPerGroup}. How many groups?`;

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { total, divisor: itemsPerGroup });
    const options = shuffle([answer, ...distractors]);

    return {
        text: visual + '<br>' + questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${total} ÷ ${itemsPerGroup} = ${answer}`,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Repeated Addition with Visual
 * Shows repeated addition, asks for total
 * Example: 5 + 5 + 5 = ?
 */
function generateRepeatedAdditionVisualQuestion(params, level) {
    const addend = randomChoice(params.tables);
    const maxRepeats = Math.min(
        Math.floor(params.max_product / addend),
        params.max_groups
    );
    const repeats = randomInt(2, maxRepeats);
    const answer = addend * repeats;

    // Ensure we don't exceed max_product
    if (answer > params.max_product) {
        return generateRepeatedAdditionVisualQuestion(params, level);
    }

    // Create visual
    const visual = generateRepeatedNumber(addend, repeats);
    const questionText = 'What is the total?';

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { a: addend, b: repeats });
    const options = shuffle([answer, ...distractors]);

    return {
        text: visual + '<br>' + questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${repeats} × ${addend} = ${answer}`,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Doubling
 * Simple doubling questions (2 groups of n)
 * Example: "Double 5"
 */
function generateDoublingQuestion(params, level) {
    const number = randomChoice([2, 3, 4, 5, 10].filter(n => n * 2 <= params.max_product));
    const answer = number * 2;

    // Create visual
    const emoji = getContextEmoji(randomChoice(params.context_types));
    const visual = generateEmojiGroups(2, number, emoji);
    const questionText = `What is double ${number}?`;

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { a: 2, b: number });
    const options = shuffle([answer, ...distractors]);

    return {
        text: visual + '<br>' + questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${number} + ${number} = ${answer}`,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Halving
 * Simple halving questions (share between 2)
 * Example: "Half of 10"
 */
function generateHalvingQuestion(params, level) {
    const evenNumbers = [4, 6, 8, 10, 12, 14, 16, 18, 20].filter(n => n <= params.max_product);
    const number = randomChoice(evenNumbers);
    const answer = number / 2;

    // Create visual
    const emoji = getContextEmoji(randomChoice(params.context_types));
    const visual = generateSharingVisualization(number, 2, emoji);
    const questionText = `What is half of ${number}?`;

    // Generate distractors
    const distractors = generateYearOneDistractors(answer, { total: number, divisor: 2 });
    const options = shuffle([answer, ...distractors]);

    return {
        text: visual + '<br>' + questionText,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${number} ÷ 2 = ${answer}`,
        module: 'C08_Y1_CALC',
        level: level
    };
}

/**
 * Generate Year 1 appropriate distractors
 * Focuses on common errors young children make
 *
 * @param {number} correctAnswer - The correct answer
 * @param {Object} problemData - Data about the problem (a, b, total, divisor)
 * @returns {number[]} Array of 3 distractors
 */
function generateYearOneDistractors(correctAnswer, problemData) {
    const distractors = new Set();

    // Common Y1 errors:
    // 1. Added instead of multiplied (or vice versa)
    if (problemData.a && problemData.b) {
        distractors.add(problemData.a + problemData.b);
        // Off-by-one in multiplication
        if (problemData.a * (problemData.b - 1) !== correctAnswer && problemData.b > 1) {
            distractors.add(problemData.a * (problemData.b - 1));
        }
        if (problemData.a * (problemData.b + 1) !== correctAnswer) {
            distractors.add(problemData.a * (problemData.b + 1));
        }
    }

    // 2. Subtracted instead of divided
    if (problemData.total && problemData.divisor) {
        distractors.add(problemData.total - problemData.divisor);
        // Off-by-one in division
        if (correctAnswer + 1 !== problemData.total) {
            distractors.add(correctAnswer + 1);
        }
        if (correctAnswer - 1 > 0) {
            distractors.add(correctAnswer - 1);
        }
    }

    // 3. Nearby numbers (counting errors)
    if (correctAnswer + 2 <= 20) distractors.add(correctAnswer + 2);
    if (correctAnswer - 2 > 0) distractors.add(correctAnswer - 2);

    // 4. Double or half the answer (place value confusion)
    if (correctAnswer * 2 <= 20) distractors.add(correctAnswer * 2);
    if (correctAnswer > 2 && correctAnswer % 2 === 0) {
        distractors.add(correctAnswer / 2);
    }

    // Remove correct answer if it somehow got in
    distractors.delete(correctAnswer);

    // If we don't have enough, add random numbers in range
    const allDistractors = Array.from(distractors);
    while (allDistractors.length < 3) {
        const dist = randomInt(1, 20);
        if (dist !== correctAnswer && !allDistractors.includes(dist)) {
            allDistractors.push(dist);
        }
    }

    // Return exactly 3 distractors
    return allDistractors.slice(0, 3);
}

export default {
    moduleId: 'C08_Y1_CALC',
    generate: generateQuestion
};
