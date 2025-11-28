/**
 * F01_Y3_FRAC: Fractions and Tenths Generator
 *
 * Generates questions for Year 3 fractions:
 * "count up and down in tenths; recognise that tenths arise from dividing an object into 10 equal parts
 * and in dividing one-digit numbers or quantities by 10; recognise, find and write fractions of a discrete
 * set of objects: unit fractions and non-unit fractions with small denominators"
 */

import {
    randomChoice,
    randomInt,
    ensureDivisible,
    calculateFraction,
    fractionToWords,
    formatFractionUnicode,
    generateDivisibleQuantity,
    getWordProblemContext,
    getDiscreteSetContext,
    generateTenthsSequence,
    decimalToTenthsFraction,
    randomTenthsStart
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
            countingInTenths
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

        case 'count_tenths':
            return generateCountTenths(countingInTenths, level);

        case 'number_line_tenths':
            return generateNumberLineTenths(countingInTenths, level);

        case 'write_fraction':
            return generateWriteFraction(numerator, denominator, level);

        case 'name_fraction':
            return generateNameFraction(numerator, denominator, visualType, level);

        case 'discrete_set':
            return generateDiscreteSet(numerator, denominator, qtyMin, qtyMax, level);

        case 'equation':
            return generateEquation(numerator, denominator, qtyMin, qtyMax, level);

        case 'divide_by_10':
            return generateDivideBy10(level);

        case 'word_problem':
            return generateWordProblem(numerator, denominator, qtyMin, qtyMax, level);

        default:
            return generateFindFraction(numerator, denominator, qtyMin, qtyMax, level);
    }
}

/**
 * Generate "Find fraction of quantity" question
 * Example: "What is 2/5 of 30?"
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
        module: 'F01_Y3_FRAC',
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
 * Generate "Count in tenths" question with gap
 * Example: "What is the missing number? 0.1, 0.2, __, 0.4"
 */
function generateCountTenths(countingConfig, level) {
    const { range, step, length, directions } = countingConfig;
    const direction = Array.isArray(directions) ? randomChoice(directions) : countingConfig.direction;

    // Generate start value
    const start = randomTenthsStart(range.min, range.max - (length - 1) * step);

    // Generate sequence
    const sequence = generateTenthsSequence(start, length, direction);

    // Choose gap position (not at start for level 1)
    const gapIndex = level === 1 ? length - 1 : randomInt(1, length - 1);
    const answer = sequence[gapIndex];

    // Create display values with null for gap
    const displayValues = [...sequence];
    displayValues[gapIndex] = null;

    // Format text for human readability
    const formattedSequence = sequence.map((v, i) => i === gapIndex ? '__' : v).join(', ');

    return {
        text: `What is the missing number? ${formattedSequence}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in tenths (0.1)`,
        module: 'F01_Y3_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What is the missing number?' },
            {
                type: 'sequence',
                values: displayValues,
                gapIndices: [gapIndex],
                step: step,
                direction: direction,
                format: 'decimal'
            }
        ]
    };
}

/**
 * Generate "Number line tenths" question
 * Example: "What number is the arrow pointing to? [number line from 0 to 1, arrow at 0.7]"
 */
function generateNumberLineTenths(countingConfig, level) {
    const { range } = countingConfig;

    // Choose a range for the number line
    const lineStart = Math.floor(randomTenthsStart(range.min, range.max - 1));
    const lineEnd = lineStart + 1;

    // Choose target value (multiple of 0.1)
    const targetValue = parseFloat((lineStart + randomInt(1, 9) * 0.1).toFixed(1));

    return {
        text: `What number is the arrow pointing to?`,
        type: 'text_input',
        answer: targetValue.toString(),
        hint: `The number line is divided into tenths`,
        module: 'F01_Y3_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What number is the arrow pointing to?' },
            {
                type: 'number_line',
                start: lineStart,
                end: lineEnd,
                interval: 0.1,
                targetValue: targetValue,
                showLabels: true,
                divisions: 10
            }
        ]
    };
}

/**
 * Generate "Write the fraction" question
 * Example: "Write the fraction: three fifths"
 */
function generateWriteFraction(numerator, denominator, level) {
    const fractionWords = fractionToWords(numerator, denominator);
    const answer = `${numerator}/${denominator}`;

    return {
        text: `Write the fraction: ${fractionWords}`,
        type: 'text_input',
        answer: answer,
        hint: `${fractionWords} means ${numerator} out of ${denominator} equal parts`,
        module: 'F01_Y3_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'Write the fraction:' },
            { type: 'fraction_words', value: fractionWords }
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
    } else if (denominator === 5) {
        shapeType = 'rectangle';
        arrangement = 'horizontal_5';
    } else if (denominator === 6) {
        shapeType = 'rectangle';
        arrangement = 'grid_2x3';
    } else if (denominator === 8) {
        shapeType = 'rectangle';
        arrangement = 'grid_2x4';
    } else if (denominator === 10) {
        shapeType = 'rectangle';
        arrangement = 'grid_2x5';
    } else {
        shapeType = 'rectangle';
        arrangement = 'horizontal';
    }

    return {
        text: 'What fraction of the shape is shaded?',
        type: 'text_input',
        answer: answer,
        hint: `${shadedParts} out of ${totalParts} parts are shaded`,
        module: 'F01_Y3_FRAC',
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
 * Generate "Discrete set" question
 * Example: "There are 20 marbles. 3/5 of them are blue. How many marbles are blue?"
 */
function generateDiscreteSet(numerator, denominator, min, max, level) {
    const quantity = generateDivisibleQuantity(denominator, min, max);
    const answer = calculateFraction(numerator, denominator, quantity);
    const context = getDiscreteSetContext(numerator, denominator, quantity, answer);

    return {
        text: context,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Find ${numerator}/${denominator} of ${quantity}`,
        module: 'F01_Y3_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: context }
        ]
    };
}

/**
 * Generate "Write fraction equation" question
 * Example: "2/5 of 30 = ?"
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
        module: 'F01_Y3_FRAC',
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
 * Generate "Divide by 10" question to show tenths
 * Example: "5 ÷ 10 = ?"
 */
function generateDivideBy10(level) {
    const dividend = randomInt(1, 9);
    const answer = (dividend / 10).toFixed(1);
    const fractionAnswer = `${dividend}/10`;

    return {
        text: `${dividend} ÷ 10 = ?`,
        type: 'text_input',
        answer: answer,
        hint: `When you divide by 10, you get tenths. ${dividend} ÷ 10 = ${dividend}/10 = ${answer}`,
        module: 'F01_Y3_FRAC',
        level: level,

        questionParts: [
            { type: 'number', value: dividend },
            { type: 'text', value: '÷ 10 = ?' }
        ]
    };
}

/**
 * Generate word problem question
 * Example: "There are 30 apples. 2/5 of them are green. How many apples are green?"
 */
function generateWordProblem(numerator, denominator, min, max, level) {
    const quantity = generateDivisibleQuantity(denominator, min, max);
    const answer = calculateFraction(numerator, denominator, quantity);
    const context = getDiscreteSetContext(numerator, denominator, quantity, answer);

    return {
        text: context,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Find ${numerator}/${denominator} of ${quantity}`,
        module: 'F01_Y3_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: context }
        ]
    };
}

export default {
    moduleId: 'F01_Y3_FRAC',
    generate: generateQuestion
};
