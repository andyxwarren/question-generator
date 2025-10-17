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

    const number = randomInt(0, number_line_max);

    // For Year 1, use a simple number line with clear marks
    const marks = generateNumberLineMarks(0, number_line_max, number_line_max);

    // Generate options around the correct number
    const distractors = [
        number - 1,
        number + 1,
        Math.max(0, number - 2),
        Math.min(number_line_max, number + 2)
    ].filter(d => d >= 0 && d <= number_line_max && d !== number);

    const options = shuffle([number, ...distractors.slice(0, 3)]);

    return {
        text: `On a number line from 0 to ${number_line_max}, which number is shown at position ${number}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Count along the number line from 0`,
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Count objects question
 */
function generateCountObjects(params, level) {
    const { min_value, max_value, object_types } = params;

    const count = randomInt(min_value, max_value);
    const objectType = randomChoice(object_types);

    const description = describeObjectRepresentation(count, objectType);

    // Generate distractors
    const distractors = [
        count - 1,
        count + 1,
        Math.max(min_value, count - 2),
        Math.min(max_value, count + 2)
    ].filter(d => d >= min_value && d <= max_value && d !== count);

    const options = shuffle([count, ...distractors.slice(0, 3)]);

    return {
        text: `How many objects are there if you see ${description}?`,
        type: 'multiple_choice',
        options: options,
        answer: count.toString(),
        hint: `Count the objects carefully`,
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
