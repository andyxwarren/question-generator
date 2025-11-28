/**
 * F01_Y2_FRAC: Recognise and Find Fractions Generator
 *
 * Generates questions for Year 2 fractions:
 * "recognise, find, name and write fractions ⅓, ¼, ²⁄₄ and ¾ of a length, shape, set of objects or quantity"
 */

import {
    randomChoice,
    ensureDivisible,
    calculateFraction,
    fractionToWords,
    formatFractionUnicode,
    generateDivisibleQuantity,
    getWordProblemContext,
    getEquivalentFraction
} from './helpers/F01_fractionHelpers.js';

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
            divisibilityRequired,
            includeEquivalence
        },
        presentation: {
            questionTypes: {
                options: { values: questionTypeOptions }
            },
            visualType,
            contexts
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
            return generateFindFraction(numerator, denominator, qtyMin, qtyMax, level);

        case 'write_fraction':
            return generateWriteFraction(numerator, denominator, qtyMin, qtyMax, level);

        case 'name_fraction':
            return generateNameFraction(numerator, denominator, visualType, level);

        case 'equation':
            return generateEquation(numerator, denominator, qtyMin, qtyMax, level);

        case 'word_problem':
            return generateWordProblem(numerator, denominator, qtyMin, qtyMax, level);

        case 'equivalence':
            if (includeEquivalence && numerator === 2 && denominator === 4) {
                return generateEquivalence(numerator, denominator, level);
            }
            // Fallback to find_fraction if equivalence not applicable
            return generateFindFraction(numerator, denominator, qtyMin, qtyMax, level);

        default:
            return generateFindFraction(numerator, denominator, qtyMin, qtyMax, level);
    }
}

/**
 * Generate "Find fraction of quantity" question
 * Example: "What is 1/2 of 8?"
 */
function generateFindFraction(numerator, denominator, min, max, level) {
    const quantity = generateDivisibleQuantity(denominator, min, max);
    const answer = calculateFraction(numerator, denominator, quantity);
    const fractionText = `${numerator}/${denominator}`;

    return {
        text: `What is ${fractionText} of ${quantity}?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Divide ${quantity} by ${denominator}${numerator > 1 ? `, then multiply by ${numerator}` : ''}`,
        module: 'F01_Y2_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What is' },
            { type: 'fraction', numerator, denominator },
            { type: 'text', value: 'of' },
            { type: 'number', value: quantity },
            { type: 'text', value: '?' }
        ]
    };
}

/**
 * Generate "Write fraction equation" question
 * Example: "1/4 of 12 = ?"
 */
function generateEquation(numerator, denominator, min, max, level) {
    const quantity = generateDivisibleQuantity(denominator, min, max);
    const answer = calculateFraction(numerator, denominator, quantity);
    const fractionText = `${numerator}/${denominator}`;

    return {
        text: `${fractionText} of ${quantity} = ?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Find ${fractionText} of ${quantity}`,
        module: 'F01_Y2_FRAC',
        level: level,

        questionParts: [
            { type: 'fraction', numerator, denominator },
            { type: 'text', value: 'of' },
            { type: 'number', value: quantity },
            { type: 'text', value: '= ?' }
        ]
    };
}

/**
 * Generate "Name the fraction" question with visual
 * Example: "What fraction of the shape is shaded?"
 */
function generateNameFraction(numerator, denominator, visualType, level) {
    const totalParts = denominator;
    const shadedParts = numerator;
    const answer = `${numerator}/${denominator}`;

    // Determine shape type based on denominator
    let shapeType, arrangement;
    if (denominator === 2) {
        shapeType = 'rectangle';
        arrangement = 'horizontal_2';
    } else if (denominator === 3) {
        shapeType = 'rectangle';
        arrangement = 'horizontal_3';
    } else if (denominator === 4) {
        shapeType = 'rectangle';
        arrangement = 'grid_2x2';
    } else {
        shapeType = 'rectangle';
        arrangement = 'horizontal';
    }

    return {
        text: 'What fraction of the shape is shaded?',
        type: 'text_input',
        answer: answer,
        hint: `${shadedParts} out of ${totalParts} parts are shaded`,
        module: 'F01_Y2_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What fraction of the shape is shaded?' },
            {
                type: 'fraction_visual',
                totalParts,
                shadedParts,
                shapeType,
                arrangement
            }
        ]
    };
}

/**
 * Generate "Write the fraction" question
 * Example: "Write the fraction: one third"
 */
function generateWriteFraction(numerator, denominator, min, max, level) {
    const fractionWords = fractionToWords(numerator, denominator);
    const answer = `${numerator}/${denominator}`;

    return {
        text: `Write the fraction: ${fractionWords}`,
        type: 'text_input',
        answer: answer,
        hint: `${fractionWords} means ${numerator} out of ${denominator} equal parts`,
        module: 'F01_Y2_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'Write the fraction:' },
            { type: 'fraction_words', value: fractionWords }
        ]
    };
}

/**
 * Generate word problem question
 * Example: "There are 12 apples. Half of them are red. How many apples are red?"
 */
function generateWordProblem(numerator, denominator, min, max, level) {
    const quantity = generateDivisibleQuantity(denominator, min, max);
    const answer = calculateFraction(numerator, denominator, quantity);
    const context = getWordProblemContext(denominator, quantity, answer);

    return {
        text: context,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Find ${numerator}/${denominator} of ${quantity}`,
        module: 'F01_Y2_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: context }
        ]
    };
}

/**
 * Generate equivalence question (Level 4 only)
 * Example: "2/4 is the same as which fraction?"
 */
function generateEquivalence(numerator, denominator, level) {
    const equivalent = getEquivalentFraction(numerator, denominator);

    if (!equivalent) {
        // Fallback if no equivalence exists
        return generateFindFraction(numerator, denominator, 2, 24, level);
    }

    const answer = `${equivalent.numerator}/${equivalent.denominator}`;

    return {
        text: `${numerator}/${denominator} is the same as which fraction? (Write your answer as a fraction)`,
        type: 'text_input',
        answer: answer,
        hint: `Think about how many parts are shaded. ${numerator} out of ${denominator} is the same as...`,
        module: 'F01_Y2_FRAC',
        level: level,

        questionParts: [
            { type: 'fraction', numerator, denominator },
            { type: 'text', value: 'is the same as which fraction?' }
        ]
    };
}

export default {
    moduleId: 'F01_Y2_FRAC',
    generate: generateQuestion
};
