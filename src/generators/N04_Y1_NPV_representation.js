/**
 * Year 1 Identify and Represent Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateUniqueNumbers
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML, createSimpleDotsHTML, createTenFrameHTML, createBase10BlocksHTML, createTallyMarksHTML } from './helpers/N04_simpleVisuals.js';
import { buildScenarioQuestion, buildTwoWayComparisonQuestion } from './helpers/N04_scenarioTemplates.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'number_line_position': return generateNumberLinePosition(math, presentation, level);
        case 'count_objects': return generateCountObjects(math, level);
        case 'compare_language': return generateCompareLanguage(math, presentation, level);
        case 'identify_most_least': return generateIdentifyMostLeast(math, level);
        case 'number_line_between': return generateNumberLineBetween(math, presentation, level);
        default: return generateNumberLinePosition(math, presentation, level);
    }
}

function generateNumberLinePosition(math, presentation, level) {
    const number_line_max = presentation.numberLine.max;
    const targetNumber = randomInt(0, number_line_max);
    const numberLineHTML = createSimpleNumberLineHTML(0, number_line_max, targetNumber, level <= 2);
    const options = [targetNumber];
    const below = targetNumber - randomInt(1, 3); if (below >= 0) options.push(below);
    const above = targetNumber + randomInt(1, 3); if (above <= number_line_max) options.push(above);
    while (options.length < 3) { const rand = randomInt(0, number_line_max); if (!options.includes(rand)) options.push(rand); }
    return { text: `Look at the number line. Which number is shown by the arrow?\n\n${numberLineHTML}`, type: 'multiple_choice', options: shuffle(options), answer: String(targetNumber), hint: 'Find where the arrow points', module: 'N04_Y1_NPV', level: level };
}

function generateCountObjects(math, level) {
    const { min, max } = math.range;
    const count = randomInt(min, max);
    const color = randomChoice(['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']);
    let visualHTML, questionText;

    if (count <= 10 && level <= 2) { visualHTML = createTenFrameHTML(count, color); questionText = 'How many cells are filled in the ten frame?'; }
    else if (count >= 10 && count % 5 === 0 && level >= 3) { visualHTML = createTallyMarksHTML(count); questionText = 'How many tally marks do you see?'; }
    else if (count >= 10 && level >= 3) { visualHTML = createBase10BlocksHTML(count); questionText = 'How many blocks do you see in total?'; }
    else { visualHTML = createSimpleDotsHTML(count, 5, color); questionText = 'How many dots do you see?'; }

    if (count > 20) {
        const options = [count];
        [count - randomInt(1, 5), count + randomInt(1, 5), count + randomInt(6, 10)].forEach(d => { if (d >= min && d <= max && !options.includes(d)) options.push(d); });
        while (options.length < 4) { const r = randomInt(min, max); if (!options.includes(r) && Math.abs(r - count) > 0) options.push(r); }
        return { text: `${questionText}\n\n${visualHTML}`, type: 'multiple_choice', options: shuffle(options), answer: String(count), hint: 'Count carefully', module: 'N04_Y1_NPV', level: level };
    }
    return { text: `${questionText}\n\n${visualHTML}`, type: 'text_input', answer: String(count), hint: 'Count carefully', module: 'N04_Y1_NPV', level: level };
}

function generateCompareLanguage(math, presentation, level, attempt = 0) {
    if (attempt >= 10) return generateNumberLinePosition(math, presentation, level);
    const { min, max } = math.range;
    const word = randomChoice(presentation.comparison.words);

    if (word === 'most' || word === 'least') {
        const numberCount = randomChoice([3, 4]);
        const numbers = generateUniqueNumbers(numberCount, min, max);
        const scenarioQuestion = buildScenarioQuestion(numbers, word);
        return { text: scenarioQuestion.text, type: 'multiple_choice', options: scenarioQuestion.options, answer: scenarioQuestion.answer, hint: word === 'most' ? 'Find biggest' : 'Find smallest', module: 'N04_Y1_NPV', level: level };
    }

    let num1 = randomInt(min, max);
    let num2 = randomInt(min, max);
    if (word === 'equal to') { if (Math.random() < 0.5) num2 = num1; else while (num2 === num1) num2 = randomInt(min, max); }
    else if (num1 === num2) return generateCompareLanguage(math, presentation, level, attempt + 1);

    const scenarioQuestion = buildTwoWayComparisonQuestion(num1, num2, word);
    let hint = 'Think carefully';
    if (['more than', 'more'].includes(word)) hint = 'Find bigger number';
    if (['fewer', 'less than', 'less'].includes(word)) hint = 'Find smaller number';
    if (['equal to', 'same'].includes(word)) hint = 'Check if same';

    return { text: scenarioQuestion.text, type: 'multiple_choice', options: scenarioQuestion.options, answer: scenarioQuestion.answer, hint: hint, module: 'N04_Y1_NPV', level: level };
}

function generateIdentifyMostLeast(math, level) {
    const { min, max } = math.range;
    const numbers = generateUniqueNumbers(3, min, max);
    const type = randomChoice(['most', 'least']);
    const answer = type === 'most' ? Math.max(...numbers) : Math.min(...numbers);
    return { text: `Which of these numbers is the ${type}?\n\n${numbers.join('   ')}`, type: 'multiple_choice', options: numbers, answer: answer.toString(), hint: type === 'most' ? 'Biggest' : 'Smallest', module: 'N04_Y1_NPV', level: level };
}

function generateNumberLineBetween(math, presentation, level, attempt = 0) {
    if (attempt >= 10) return generateNumberLinePosition(math, presentation, level);
    const max = presentation.numberLine.max;
    const num1 = randomInt(0, max - 2);
    const num2 = num1 + randomInt(2, 5);
    if (num2 - num1 <= 1) return generateNumberLineBetween(math, presentation, level, attempt + 1);

    const between = randomInt(num1 + 1, num2 - 1);
    const visual = `${num1} ─────── ? ─────── ${num2}`;
    const distractors = [num1, num2, between - 1, between + 1].filter(d => d > num1 && d < num2 && d !== between);
    const options = shuffle([between, ...distractors.slice(0, 3)]);

    return { text: `Which number comes between ${num1} and ${num2}?\n\n${visual}`, type: 'multiple_choice', options: options, answer: between.toString(), hint: `Find number in middle`, module: 'N04_Y1_NPV', level: level };
}

export default {
    moduleId: 'N04_Y1_NPV',
    generate: generateQuestion
};