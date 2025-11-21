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
import { createSimpleNumberLineHTML, createSimpleDotsHTML, createTenFrameHTML, createBase10BlocksHTML, createTallyMarksHTML } from './helpers/N04_simpleVisuals.js';
import { buildScenarioQuestion, buildTwoWayComparisonQuestion } from './helpers/N04_scenarioTemplates.js';

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
        case 'number_line_between':
            return generateNumberLineBetween(params, level);
        default:
            return generateNumberLinePosition(params, level);
    }
}

/**
 * Number line position question (simplified for Year 1)
 * Converted to multiple choice to reduce digital friction for ages 5-6
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

    // Generate 3 strategic options: target + 2 nearby numbers
    const options = [targetNumber];

    // Add a number below (if possible)
    const below = targetNumber - randomInt(1, 3);
    if (below >= 0 && !options.includes(below)) {
        options.push(below);
    }

    // Add a number above (if possible)
    const above = targetNumber + randomInt(1, 3);
    if (above <= number_line_max && !options.includes(above)) {
        options.push(above);
    }

    // If we don't have 3 options yet, add more strategic numbers
    while (options.length < 3) {
        const randomOption = randomInt(0, number_line_max);
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    // Shuffle options to randomize position of correct answer
    const shuffledOptions = shuffle(options);

    return {
        text: `Look at the number line. Which number is shown by the arrow?\n\n${numberLineHTML}`,
        type: 'multiple_choice',
        options: shuffledOptions,
        answer: String(targetNumber),
        hint: 'Find where the arrow points',
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Count objects question
 * Uses multiple choice for counts > 20 to reduce typing burden
 */
function generateCountObjects(params, level) {
    const { min_value, max_value } = params;

    const count = randomInt(min_value, max_value);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const color = randomChoice(colors);

    // Use different visual representations based on count and level
    let visualHTML, questionText;

    if (count <= 10 && level <= 2) {
        // Use ten frames for numbers 1-10 at lower levels
        visualHTML = createTenFrameHTML(count, color);
        questionText = 'How many cells are filled in the ten frame?';
    } else if (count >= 10 && count % 5 === 0 && level >= 3) {
        // Use tally marks for multiples of 5 at higher levels
        visualHTML = createTallyMarksHTML(count);
        questionText = 'How many tally marks do you see?';
    } else if (count >= 10 && level >= 3) {
        // Use base-10 blocks for larger numbers at level 3-4
        visualHTML = createBase10BlocksHTML(count);
        questionText = 'How many blocks do you see in total?';
    } else {
        // Default to dots
        visualHTML = createSimpleDotsHTML(count, 5, color);
        questionText = 'How many dots do you see?';
    }

    // Use multiple choice for counts > 20 to reduce typing burden for Year 1
    if (count > 20) {
        const options = [count];

        // Add strategic distractors (nearby numbers)
        const distractor1 = count - randomInt(1, 5);
        const distractor2 = count + randomInt(1, 5);
        const distractor3 = count + randomInt(6, 10);

        if (distractor1 >= min_value && !options.includes(distractor1)) {
            options.push(distractor1);
        }
        if (distractor2 <= max_value && !options.includes(distractor2)) {
            options.push(distractor2);
        }
        if (distractor3 <= max_value && !options.includes(distractor3)) {
            options.push(distractor3);
        }

        // Fill to 4 options if needed
        while (options.length < 4) {
            const randomOption = randomInt(min_value, max_value);
            if (!options.includes(randomOption) && Math.abs(randomOption - count) > 0) {
                options.push(randomOption);
            }
        }

        const shuffledOptions = shuffle(options);

        return {
            text: `${questionText}\n\n${visualHTML}`,
            type: 'multiple_choice',
            options: shuffledOptions,
            answer: String(count),
            hint: 'Count carefully and look for groups to help you',
            module: 'N04_Y1_NPV',
            level: level
        };
    }

    // For counts ≤ 20, use text input (simple typing for Year 1)
    return {
        text: `${questionText}\n\n${visualHTML}`,
        type: 'text_input',
        answer: String(count),
        hint: 'Count carefully, one at a time',
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Compare language question (equal to, more than, less than, fewer, most, least)
 * Rewritten to use scenario-based questions for ALL comparison words
 */
function generateCompareLanguage(params, level, attempt = 0) {
    const MAX_ATTEMPTS = 10;
    const { min_value, max_value, comparison_words } = params;

    const word = randomChoice(comparison_words);

    // Handle "most" and "least" with 3-4 numbers
    if (word === 'most' || word === 'least') {
        const numberCount = randomChoice([3, 4]); // Randomly use 3 or 4 numbers
        const numbers = generateUniqueNumbers(numberCount, min_value, max_value);

        // Use scenario-based question (100% scenarios for best pedagogical approach)
        const scenarioQuestion = buildScenarioQuestion(numbers, word);

        return {
            text: scenarioQuestion.text,
            type: 'multiple_choice',
            options: scenarioQuestion.options,
            answer: scenarioQuestion.answer,
            hint: word === 'most' ? 'Find who has the biggest number' : 'Find who has the smallest number',
            module: 'N04_Y1_NPV',
            level: level
        };
    }

    // Handle two-way comparisons (equal to, more than, less than, fewer)
    // Use scenario-based questions for better pedagogical alignment
    let num1 = randomInt(min_value, max_value);
    let num2 = randomInt(min_value, max_value);

    // For "equal to", ensure 50% are equal, 50% are not
    if (word === 'equal to') {
        if (Math.random() < 0.5) {
            num2 = num1; // Make them equal
        } else {
            // Ensure they're different
            while (num2 === num1) {
                num2 = randomInt(min_value, max_value);
            }
        }
    } else {
        // For other comparison words, ensure numbers are different
        if (num1 === num2) {
            if (attempt >= MAX_ATTEMPTS) {
                // Fallback: force them to be different
                num2 = num1 + 1 <= max_value ? num1 + 1 : num1 - 1;
            } else {
                return generateCompareLanguage(params, level, attempt + 1);
            }
        }
    }

    // Build scenario-based question
    const scenarioQuestion = buildTwoWayComparisonQuestion(num1, num2, word);

    // Set appropriate hints based on comparison word
    let hint;
    switch(word) {
        case 'more than':
        case 'more':
            hint = 'Find who has the bigger number';
            break;
        case 'fewer':
        case 'less than':
        case 'less':
            hint = 'Find who has the smaller number';
            break;
        case 'equal to':
        case 'same':
            hint = 'Check if the numbers are the same';
            break;
        default:
            hint = 'Think carefully about the numbers';
    }

    return {
        text: scenarioQuestion.text,
        type: 'multiple_choice',
        options: scenarioQuestion.options,
        answer: scenarioQuestion.answer,
        hint: hint,
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Identify most/least from a group (abstract number comparison)
 * Note: This differs from compare_language which uses contextual scenarios
 */
function generateIdentifyMostLeast(params, level) {
    const { min_value, max_value } = params;

    const numbers = generateUniqueNumbers(3, min_value, max_value);
    const question_type = randomChoice(['most', 'least']);

    const answer = question_type === 'most' ? Math.max(...numbers) : Math.min(...numbers);

    // Format numbers with visual separation for easier parsing by Year 1 students
    const numbersVisual = numbers.map(n => formatNumber(n)).join('   '); // Extra spaces for visual clarity

    return {
        text: `Which of these numbers is the ${question_type}?\n\n${numbersVisual}`,
        type: 'multiple_choice',
        options: numbers,
        answer: answer.toString(),
        hint: question_type === 'most' ? 'Find the biggest number' : 'Find the smallest number',
        module: 'N04_Y1_NPV',
        level: level
    };
}

/**
 * Number line between two numbers
 * Enhanced with visual number line for better spatial understanding
 */
function generateNumberLineBetween(params, level, attempt = 0) {
    const MAX_ATTEMPTS = 10;
    const { number_line_max } = params;

    const num1 = randomInt(0, number_line_max - 2);
    const num2 = num1 + randomInt(2, 5);

    // Check if there's room for a number between
    if (num2 - num1 <= 1) {
        if (attempt >= MAX_ATTEMPTS) {
            // Fallback to number line position
            return generateNumberLinePosition(params, level);
        }
        return generateNumberLineBetween(params, level, attempt + 1);
    }

    const between = randomInt(num1 + 1, num2 - 1);

    // Create a simple visual representation using a mini number line
    // Show numbers from num1 to num2 with boundary markers
    const numberLineVisual = `${num1} ─────── ? ─────── ${num2}`;

    // Generate distractors
    const distractors = [
        num1,
        num2,
        between - 1,
        between + 1
    ].filter(d => d > num1 && d < num2 && d !== between);

    const options = shuffle([between, ...distractors.slice(0, 3)]);

    return {
        text: `Which number comes between ${num1} and ${num2}?\n\n${numberLineVisual}`,
        type: 'multiple_choice',
        options: options,
        answer: between.toString(),
        hint: `Find the number in the middle`,
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
