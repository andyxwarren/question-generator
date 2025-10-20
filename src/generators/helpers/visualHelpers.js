/**
 * Visual Helpers - Low-Overhead Visual Representations
 *
 * Provides simple, text-based visual representations for mathematical concepts
 * following the CLAUDE.md philosophy of 90/10 solutions (90% benefit for 10% effort).
 *
 * Design Principles:
 * - Use Unicode characters and emojis for visual elements
 * - Use <pre> tags with CSS for alignment (no Canvas/SVG complexity)
 * - Pure functions returning HTML strings
 * - No state management or lifecycle complexity
 * - Accessible and print-friendly
 */

import { randomChoice } from './N02_numberHelpers.js';

/**
 * Generate a dot array visualization
 * Creates a simple array using dots (●) arranged in rows and columns
 *
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {string} HTML string with styled <pre> tag containing dot array
 *
 * @example
 * generateDotArray(3, 4) returns:
 * <pre class="visual-array">
 * ● ● ● ●
 * ● ● ● ●
 * ● ● ● ●
 * </pre>
 */
export function generateDotArray(rows, cols) {
    const lines = [];
    for (let r = 0; r < rows; r++) {
        const line = '● '.repeat(cols).trim();
        lines.push(line);
    }
    const arrayContent = lines.join('\n');
    return `<pre class="visual-array">${arrayContent}</pre>`;
}

/**
 * Generate emoji groups visualization
 * Shows equal groups using emojis, separated by spacing
 *
 * @param {number} groups - Number of groups
 * @param {number} perGroup - Items per group
 * @param {string} [emoji='🍎'] - Emoji to use (defaults to apple)
 * @returns {string} HTML string showing groups
 *
 * @example
 * generateEmojiGroups(3, 4, '🍎') returns:
 * <pre class="visual-groups">
 * 🍎 🍎 🍎 🍎    🍎 🍎 🍎 🍎    🍎 🍎 🍎 🍎
 * </pre>
 */
export function generateEmojiGroups(groups, perGroup, emoji = '🍎') {
    const groupArray = [];
    for (let g = 0; g < groups; g++) {
        const group = (emoji + ' ').repeat(perGroup).trim();
        groupArray.push(group);
    }
    const groupsContent = groupArray.join('    '); // 4 spaces between groups
    return `<pre class="visual-groups">${groupsContent}</pre>`;
}

/**
 * Generate repeated number visualization
 * Shows repeated addition visually
 *
 * @param {number} number - The number being repeated
 * @param {number} times - How many times it's repeated
 * @returns {string} HTML string showing repeated addition
 *
 * @example
 * generateRepeatedNumber(5, 4) returns:
 * <pre class="visual-repeated">
 * 5 + 5 + 5 + 5
 * </pre>
 */
export function generateRepeatedNumber(number, times) {
    const numbers = Array(times).fill(number);
    const content = numbers.join(' + ');
    return `<pre class="visual-repeated">${content}</pre>`;
}

/**
 * Generate sharing visualization
 * Shows items being shared equally among people/groups
 * Uses emojis to represent items and people
 *
 * @param {number} total - Total items to share
 * @param {number} people - Number of people/groups
 * @param {string} [itemEmoji='🍪'] - Emoji for items (defaults to cookie)
 * @returns {string} HTML string showing sharing arrangement
 *
 * @example
 * generateSharingVisualization(12, 3, '🍪') shows cookies distributed to 3 people
 */
export function generateSharingVisualization(total, people, itemEmoji = '🍪') {
    const perPerson = Math.floor(total / people);
    const lines = [];

    for (let p = 0; p < people; p++) {
        const items = (itemEmoji + ' ').repeat(perPerson).trim();
        lines.push(`👤  ${items}`);
    }

    const content = lines.join('\n');
    return `<pre class="visual-sharing">${content}</pre>`;
}

/**
 * Get a child-friendly emoji for a given context
 * Provides variety for visual representations
 *
 * @param {string} type - Type of emoji needed ('fruit', 'object', 'toy', 'food')
 * @returns {string} Emoji character
 */
export function getContextEmoji(type = 'fruit') {
    const emojiSets = {
        fruit: ['🍎', '🍊', '🍌', '🍓', '🍇'],
        object: ['⭐', '🔵', '🟢', '🟡', '🟣'],
        toy: ['🧸', '🎈', '🎁', '⚽', '🎨'],
        food: ['🍪', '🍬', '🍩', '🧁', '🍰']
    };

    const set = emojiSets[type] || emojiSets.fruit;
    return randomChoice(set);
}

/**
 * Generate simple array multiplication question with visual
 * Combines question text with visual representation
 *
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {Object} Question data with text and visual
 *
 * @example
 * Returns: {
 *   visual: '<pre>...</pre>',
 *   questionText: 'How many dots are there altogether?',
 *   answer: 12
 * }
 */
export function createArrayQuestion(rows, cols) {
    const visual = generateDotArray(rows, cols);
    const answer = rows * cols;

    return {
        visual,
        questionText: 'How many dots are there altogether?',
        answer,
        working: `${rows} × ${cols} = ${answer}`
    };
}

/**
 * Generate equal groups question with visual
 * Combines question text with emoji group visualization
 *
 * @param {number} groups - Number of groups
 * @param {number} perGroup - Items per group
 * @param {string} contextType - Type of context ('fruit', 'object', 'toy', 'food')
 * @returns {Object} Question data with text and visual
 */
export function createEqualGroupsQuestion(groups, perGroup, contextType = 'fruit') {
    const emoji = getContextEmoji(contextType);
    const visual = generateEmojiGroups(groups, perGroup, emoji);
    const answer = groups * perGroup;

    // Map emoji to word for question text
    const emojiWords = {
        '🍎': 'apples', '🍊': 'oranges', '🍌': 'bananas', '🍓': 'strawberries', '🍇': 'grapes',
        '⭐': 'stars', '🔵': 'circles', '🟢': 'circles', '🟡': 'circles', '🟣': 'circles',
        '🧸': 'bears', '🎈': 'balloons', '🎁': 'presents', '⚽': 'balls', '🎨': 'paints',
        '🍪': 'cookies', '🍬': 'sweets', '🍩': 'donuts', '🧁': 'cakes', '🍰': 'cakes'
    };

    const itemName = emojiWords[emoji] || 'items';

    return {
        visual,
        questionText: `How many ${itemName} are there altogether?`,
        answer,
        working: `${groups} × ${perGroup} = ${answer}`,
        emoji,
        itemName
    };
}

/**
 * Generate sharing question with visual
 * Shows sharing division with visual representation
 *
 * @param {number} total - Total items
 * @param {number} people - Number of people
 * @param {string} contextType - Type of context
 * @returns {Object} Question data with text and visual
 */
export function createSharingQuestion(total, people, contextType = 'food') {
    const emoji = getContextEmoji(contextType);
    const visual = generateSharingVisualization(total, people, emoji);
    const answer = Math.floor(total / people);

    const emojiWords = {
        '🍎': 'apples', '🍊': 'oranges', '🍌': 'bananas', '🍓': 'strawberries', '🍇': 'grapes',
        '⭐': 'stars', '🔵': 'circles', '🟢': 'circles', '🟡': 'circles', '🟣': 'circles',
        '🧸': 'bears', '🎈': 'balloons', '🎁': 'presents', '⚽': 'balls', '🎨': 'paints',
        '🍪': 'cookies', '🍬': 'sweets', '🍩': 'donuts', '🧁': 'cakes', '🍰': 'cakes'
    };

    const itemName = emojiWords[emoji] || 'items';

    return {
        visual,
        questionText: `How many ${itemName} does each person get?`,
        answer,
        working: `${total} ÷ ${people} = ${answer}`,
        emoji,
        itemName
    };
}
