/**
 * Year 1 Identify and Represent Numbers Generator
 *
 * Module: N04_Y1_NPV - "Identify and represent numbers using objects and pictorial representations
 *                       including the number line, and use the language of: equal to, more than,
 *                       less than (fewer), most, least"
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateNumberLineMarks,
    findClosestMark,
    describeObjectRepresentation,
    generateComparisonLanguageText,
    evaluateComparison,
    generateUniqueNumbers
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML, createSimpleDotsHTML } from './helpers/simpleVisuals.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'number_line_position':
            return generateNumberLinePosition(params, level);
        case 'count_objects':
            return generateCountObjects(params, level);
        case 'compare_language':
            return generateCompareLanguage(params, level);
        case 'identify_most_least':
            return generateIdentifyMostLeast(params, level);
        case 'estimate_group':
            return generateEstimateGroup(params, level);
        case 'number_line_between':
            return generateNumberLineBetween(params, level);
        default:
            return generateNumberLinePosition(params, level);
    }
}

/**
 * Number line position question (simplified for Year 1)
 */
function generateNumberLinePosition(params, level) {
    const { number_line_max } = params;

    const targetNumber = randomInt(0, number_line_max);
    const numberLineHTML = createSimpleNumberLineHTML(
        0,
        number_line_max,
        targetNumber,
        level <= 2  // Show all labels for easier levels
    );

    return {
        text: `What number is marked on the number line?\n\n${numberLineHTML}`,
        type: 'text_input',
        answer: String(targetNumber),
        hint: 'Look at where the arrow points between the labeled numbers',
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Count objects question
 */
function generateCountObjects(params, level) {
    const { min_value, max_value } = params;

    const count = randomInt(min_value, max_value);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const color = randomChoice(colors);
    const dotsHTML = createSimpleDotsHTML(count, 5, color);

    return {
        text: `How many dots do you see?\n\n${dotsHTML}`,
        type: 'text_input',
        answer: String(count),
        hint: 'Count carefully, one at a time',
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Compare language question (equal to, more than, less than, fewer)
 */
function generateCompareLanguage(params, level) {
    const { min_value, max_value, comparison_words } = params;

    const num1 = randomInt(min_value, max_value);
    const num2 = randomInt(min_value, max_value);

    // Ensure they're different for "more than" and "less than" questions
    if (num1 === num2) {
        return generateCompareLanguage(params, level);
    }

    const word = randomChoice(comparison_words);
    const questionText = generateComparisonLanguageText(num1, num2, word);

    let answer;
    let type = 'multiple_choice';
    let options;

    if (word === 'most' || word === 'least') {
        // These ask "which is..."
        answer = evaluateComparison(num1, num2, word);
        options = [num1, num2];
    } else {
        // These ask "is X ... Y?" (true/false)
        answer = evaluateComparison(num1, num2, word) ? 'Yes' : 'No';
        options = ['Yes', 'No'];
    }

    return {
        text: questionText,
        type: type,
        options: options,
        answer: answer.toString(),
        hint: `Think about which number is bigger or smaller`,
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Identify most/least from a group
 */
function generateIdentifyMostLeast(params, level) {
    const { min_value, max_value } = params;

    const numbers = generateUniqueNumbers(3, min_value, max_value);
    const question_type = randomChoice(['most', 'least']);

    const answer = question_type === 'most' ? Math.max(...numbers) : Math.min(...numbers);

    return {
        text: `Which number is ${question_type}: ${numbers.map(n => formatNumber(n)).join(', ')}?`,
        type: 'multiple_choice',
        options: numbers,
        answer: answer.toString(),
        hint: question_type === 'most' ? 'Find the biggest number' : 'Find the smallest number',
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Estimate group size (introduced in higher levels)
 */
function generateEstimateGroup(params, level) {
    const { min_value, max_value, object_types } = params;

    const actualCount = randomInt(min_value, max_value);
    const objectType = randomChoice(object_types);

    // Generate estimation options around the actual count
    const options = [
        actualCount,
        Math.max(min_value, actualCount - 2),
        Math.min(max_value, actualCount + 2),
        Math.round(actualCount / 2),
        Math.min(max_value, actualCount * 2)
    ];

    const shuffledOptions = shuffle(options.slice(0, 4));

    return {
        text: `About how many ${objectType} are there if you see a group that's close to ${actualCount}?`,
        type: 'multiple_choice',
        options: shuffledOptions,
        answer: actualCount.toString(),
        hint: `Look for the number closest to what you'd estimate`,
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Number line between two numbers
 */
function generateNumberLineBetween(params, level) {
    const { number_line_max } = params;

    const num1 = randomInt(0, number_line_max - 2);
    const num2 = num1 + randomInt(2, 5);

    const between = randomInt(num1 + 1, num2 - 1);

    // Generate distractors
    const distractors = [
        num1,
        num2,
        between - 1,
        between + 1
    ].filter(d => d > num1 && d < num2 && d !== between);

    const options = shuffle([between, ...distractors.slice(0, 3)]);

    return {
        text: `Which number comes between ${num1} and ${num2} on a number line?`,
        type: 'multiple_choice',
        options: options,
        answer: between.toString(),
        hint: `Find a number that's bigger than ${num1} but smaller than ${num2}`,
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'N04_Y1_NPV',
    generate: generateQuestion
};
