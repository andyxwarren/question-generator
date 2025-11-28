/**
 * F01_Y1_FRAC: Halves and Quarters Generator
 *
 * Generates questions for Year 1 fractions:
 * "recognise, find and name a half as one of two equal parts of an object, shape or quantity;
 *  recognise, find and name a quarter as one of four equal parts of an object, shape or quantity"
 *
 * Supports i18n typed values for locale-aware rendering
 */

import {
    randomChoice,
    calculateFraction,
    fractionToWords,
    generateDivisibleQuantity,
    createFraction,
    createInteger
} from './helpers/F01_fractionHelpers.js';
import { render as i18nRender, DEFAULT_LOCALE } from '../i18n/index.js';

/**
 * Generate a fraction question
 */
export function generateQuestion(params, level) {
    // CRITICAL: NESTED DESTRUCTURING PATTERN
    const {
        math: {
            fractions: {
                options: { values: fractionOptions }
            },
            quantity: {
                range: { min: qtyMin, max: qtyMax }
            },
            divisibilityRequired
        },
        presentation: {
            questionTypes: {
                options: { values: questionTypeOptions }
            },
            visualType,
            contexts,
            showVisual
        }
    } = params;

    // Select a random fraction
    const fraction = randomChoice(fractionOptions);
    const { numerator, denominator } = fraction;

    // Select question type
    const questionType = randomChoice(questionTypeOptions);

    // Generate appropriate question based on type
    switch (questionType) {
        case 'find_fraction':
            return generateFindFraction(numerator, denominator, qtyMin, qtyMax, visualType, showVisual, level);

        case 'name_fraction':
            return generateNameFraction(numerator, denominator, visualType, level);

        case 'recognise_fraction':
            return generateRecogniseFraction(numerator, denominator, qtyMin, qtyMax, visualType, level);

        default:
            return generateNameFraction(numerator, denominator, visualType, level);
    }
}

/**
 * Generate "Name the fraction" question with visual
 * Example: "What fraction of the shape is shaded?"
 */
function generateNameFraction(numerator, denominator, visualType, level) {
    const totalParts = denominator;
    const shadedParts = numerator;
    const answer = `${numerator}/${denominator}`;
    const fractionWords = fractionToWords(numerator, denominator);

    // Typed values for i18n
    const typedFraction = createFraction(numerator, denominator, 'numeric');
    const typedFractionWords = createFraction(numerator, denominator, 'words');

    // Determine shape type based on denominator
    let shapeType, arrangement;
    if (denominator === 2) {
        shapeType = randomChoice(['rectangle', 'circle']);
        arrangement = shapeType === 'rectangle' ? 'horizontal_2' : 'halves_circle';
    } else if (denominator === 4) {
        shapeType = randomChoice(['rectangle', 'circle']);
        arrangement = shapeType === 'rectangle' ? 'grid_2x2' : 'quarters_circle';
    } else {
        shapeType = 'rectangle';
        arrangement = 'horizontal';
    }

    // Template for i18n
    const values = {
        answer: typedFraction,
        fractionWords: typedFractionWords,
        shadedParts: createInteger(shadedParts),
        totalParts: createInteger(totalParts)
    };

    return {
        template: 'What fraction of the shape is shaded?',
        answerTemplate: '{answer}',
        values,

        text: 'What fraction of the shape is shaded?',
        type: 'text_input',
        answer: answer,
        hint: `${shadedParts} out of ${totalParts} equal parts are shaded. This is ${fractionWords}.`,
        module: 'F01_Y1_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What fraction of the shape is shaded?' },
            {
                type: 'fraction_visual',
                totalParts,
                shadedParts,
                shapeType,
                arrangement,
                typedAnswer: typedFraction
            }
        ]
    };
}

/**
 * Generate "Find fraction of quantity" question
 * Example: "What is 1/2 of 8 apples?" (with visual for Year 1)
 */
function generateFindFraction(numerator, denominator, min, max, visualType, showVisual, level) {
    const quantity = generateDivisibleQuantity(denominator, min, max);
    const answer = calculateFraction(numerator, denominator, quantity);
    const fractionText = `${numerator}/${denominator}`;
    const fractionWords = fractionToWords(numerator, denominator);

    // Typed values for i18n
    const typedFraction = createFraction(numerator, denominator, 'words');
    const typedQuantity = createInteger(quantity);
    const typedAnswer = createInteger(answer);

    // Simple objects for Year 1
    const objects = ['apples', 'cubes', 'counters', 'balls', 'stars'];
    const object = randomChoice(objects);

    // Determine if we show visual based on parameters
    const includeVisual = showVisual || visualType === 'shapes';

    // Template for i18n
    const template = 'What is {fraction} of {quantity} {object}?';
    const values = {
        fraction: typedFraction,
        quantity: typedQuantity,
        answer: typedAnswer,
        object: object  // Objects like 'apples' could be localized in future
    };

    return {
        template,
        answerTemplate: '{answer}',
        values,

        text: `What is ${fractionWords} of ${quantity} ${object}?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Split the ${quantity} ${object} into ${denominator} equal groups. How many are in one group?`,
        module: 'F01_Y1_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What is' },
            { type: 'fraction_words', value: fractionWords, typed: typedFraction },
            { type: 'text', value: 'of' },
            { type: 'number', value: quantity, typed: typedQuantity },
            { type: 'text', value: `${object}?` },
            ...(includeVisual ? [{
                type: 'object_set_visual',
                totalObjects: quantity,
                objectType: object,
                groupCount: denominator,
                highlightGroups: 1
            }] : [])
        ]
    };
}

/**
 * Generate "Recognise fraction" question
 * Example: "Which shows one half?" (multiple choice with visuals)
 */
function generateRecogniseFraction(numerator, denominator, min, max, visualType, level) {
    const fractionWords = fractionToWords(numerator, denominator);
    const totalParts = denominator;
    const shadedParts = numerator;

    // Typed values for i18n
    const typedFraction = createFraction(numerator, denominator, 'words');

    // Create correct option
    const correctOption = {
        shapeType: randomChoice(['rectangle', 'circle']),
        totalParts: totalParts,
        shadedParts: shadedParts
    };

    if (correctOption.shapeType === 'rectangle') {
        correctOption.arrangement = totalParts === 2 ? 'horizontal_2' : 'grid_2x2';
    } else {
        correctOption.arrangement = totalParts === 2 ? 'halves_circle' : 'quarters_circle';
    }

    // Create distractor options
    const distractors = [];

    // Distractor 1: Wrong fraction (swap numerator/denominator if possible)
    if (denominator !== numerator) {
        distractors.push({
            shapeType: correctOption.shapeType,
            totalParts: totalParts,
            shadedParts: totalParts - shadedParts, // Different shading
            arrangement: correctOption.arrangement
        });
    }

    // Distractor 2: Different total parts
    const differentTotal = totalParts === 2 ? 4 : 2;
    distractors.push({
        shapeType: correctOption.shapeType,
        totalParts: differentTotal,
        shadedParts: 1,
        arrangement: differentTotal === 2 ? 'horizontal_2' : 'grid_2x2'
    });

    // Distractor 3: Unequal parts
    distractors.push({
        shapeType: 'rectangle',
        totalParts: totalParts,
        shadedParts: shadedParts,
        arrangement: 'unequal_parts' // Special flag for unequal divisions
    });

    // Shuffle options
    const allOptions = [correctOption, ...distractors.slice(0, 2)];
    const shuffled = allOptions.sort(() => Math.random() - 0.5);
    const correctIndex = shuffled.indexOf(correctOption);

    // Template for i18n
    const template = 'Which shape shows {fraction}?';
    const values = {
        fraction: typedFraction
    };

    return {
        template,
        values,

        text: `Which shape shows ${fractionWords}?`,
        type: 'multiple_choice',
        answer: (correctIndex + 1).toString(), // 1-indexed
        hint: `Look for ${shadedParts} out of ${totalParts} equal parts shaded.`,
        module: 'F01_Y1_FRAC',
        level: level,
        options: ['1', '2', '3'],

        questionParts: [
            {
                type: 'text',
                value: `Which shape shows ${fractionWords}?`,
                template: 'Which shape shows {fraction}?',
                typed: { fraction: typedFraction }
            },
            {
                type: 'fraction_choice_visuals',
                options: shuffled,
                correctIndex: correctIndex
            }
        ]
    };
}

export default {
    moduleId: 'F01_Y1_FRAC',
    generate: generateQuestion
};
