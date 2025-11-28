/**
 * F01_Y4_FRAC: Counting in Hundredths Generator
 *
 * Generates questions for Year 4 fractions:
 * "count up and down in hundredths; recognise that hundredths arise when dividing
 * an object by a hundred and dividing tenths by ten"
 */

import {
    randomChoice,
    randomInt,
    formatFractionUnicode
} from './helpers/F01_fractionHelpers.js';

/**
 * Generate a hundredths question
 */
export function generateQuestion(params, level) {
    // CRITICAL: NESTED DESTRUCTURING PATTERN
    const {
        math: {
            fractions: {
                denominator,
                sequence: {
                    numeratorRange: { min: numMin, max: numMax },
                    directions,
                    startValues
                }
            },
            division: {
                wholeNumbers: { min: divMin, max: divMax },
                divisor
            },
            tenthsRelation: {
                include: includeTenths,
                tenthsValues,
                divideTenthsByTen
            }
        },
        presentation: {
            questionTypes: {
                options: { values: questionTypeOptions }
            },
            visualType,
            formats,
            gapPosition
        }
    } = params;

    // Select question type
    const questionType = randomChoice(questionTypeOptions);

    // Generate appropriate question based on type
    switch (questionType) {
        case 'count_hundredths':
            return generateCountHundredths(numMin, numMax, directions, startValues, formats, gapPosition, level);

        case 'divide_by_100':
            return generateDivideBy100(divMin, divMax, divisor, formats, level);

        case 'name_hundredth':
            return generateNameHundredth(numMin, numMax, visualType, formats, level);

        case 'tenths_to_hundredths':
            if (includeTenths && tenthsValues) {
                return generateTenthsToHundredths(tenthsValues, formats, level);
            }
            return generateCountHundredths(numMin, numMax, directions, startValues, formats, gapPosition, level);

        case 'divide_tenths':
            if (includeTenths && divideTenthsByTen && tenthsValues) {
                return generateDivideTenths(tenthsValues, formats, level);
            }
            return generateCountHundredths(numMin, numMax, directions, startValues, formats, gapPosition, level);

        case 'number_line':
            return generateNumberLine(numMin, numMax, formats, level);

        case 'word_problem':
            return generateWordProblem(divMin, divMax, divisor, numMin, numMax, formats, level);

        default:
            return generateCountHundredths(numMin, numMax, directions, startValues, formats, gapPosition, level);
    }
}

/**
 * Generate "Count in hundredths" sequence question
 * Example: "0.01, 0.02, 0.03, __, 0.05"
 */
function generateCountHundredths(min, max, directions, startValues, formats, gapPosition, level) {
    const direction = randomChoice(directions);
    const start = randomChoice(startValues);
    const sequenceLength = 5;

    // Generate sequence
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        const numerator = direction === 'forwards'
            ? start + i
            : start - i;

        if (numerator >= 0 && numerator <= max) {
            sequence.push(numerator);
        }
    }

    // Ensure we have valid sequence
    if (sequence.length < sequenceLength) {
        // Adjust start value
        const adjustedStart = direction === 'forwards' ? min : Math.min(max, sequenceLength - 1);
        sequence.length = 0;
        for (let i = 0; i < sequenceLength; i++) {
            const numerator = direction === 'forwards'
                ? adjustedStart + i
                : adjustedStart - i;
            sequence.push(numerator);
        }
    }

    // Select gap position
    let gapIndex;
    if (gapPosition === 'end') {
        gapIndex = sequenceLength - 1;
    } else if (gapPosition === 'mixed') {
        gapIndex = randomChoice([2, 3, 4]);
    } else {
        gapIndex = randomInt(1, sequenceLength - 1);
    }

    const answer = sequence[gapIndex];
    const format = randomChoice(formats);

    // Create display values
    const displayValues = sequence.map((num, idx) => {
        if (idx === gapIndex) return null;
        return num;
    });

    // Format sequence for text
    const formattedSequence = sequence.map((num, idx) => {
        if (idx === gapIndex) return '__';
        return format === 'decimal' ? (num / 100).toFixed(2) : `${num}/100`;
    }).join(', ');

    const answerText = format === 'decimal' ? (answer / 100).toFixed(2) : `${answer}/100`;

    return {
        text: `What is the missing number? ${formattedSequence}`,
        type: 'text_input',
        answer: answerText,
        hint: `The pattern counts ${direction} in hundredths`,
        module: 'F01_Y4_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What is the missing number?' },
            {
                type: 'hundredths_sequence',
                numerators: displayValues,
                denominator: 100,
                gapIndices: [gapIndex],
                direction: direction,
                format: format
            }
        ]
    };
}

/**
 * Generate "Divide by 100" question
 * Example: "What is 300 ÷ 100?"
 */
function generateDivideBy100(min, max, divisor, formats, level) {
    const wholeNumber = randomInt(Math.ceil(min / divisor), Math.floor(max / divisor)) * divisor;
    const result = wholeNumber / divisor;
    const format = randomChoice(formats);

    const answerText = format === 'decimal' ? result.toFixed(2) : `${result * 100}/100`;

    return {
        text: `What is ${wholeNumber} ÷ ${divisor}?`,
        type: 'text_input',
        answer: answerText,
        hint: `Dividing by ${divisor} gives hundredths`,
        module: 'F01_Y4_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What is' },
            { type: 'number', value: wholeNumber },
            { type: 'text', value: '÷' },
            { type: 'number', value: divisor },
            { type: 'text', value: '?' }
        ]
    };
}

/**
 * Generate "Name the hundredth" question with visual
 * Example: "What fraction of the shape is shaded? [grid showing 5/100]"
 */
function generateNameHundredth(min, max, visualType, formats, level) {
    const numerator = randomInt(Math.max(1, min), Math.min(max, 20));
    const denominator = 100;
    const format = randomChoice(formats);

    const answerText = format === 'decimal' ? (numerator / 100).toFixed(2) : `${numerator}/100`;

    return {
        text: 'What fraction is shaded?',
        type: 'text_input',
        answer: answerText,
        hint: `${numerator} out of ${denominator} parts are shaded`,
        module: 'F01_Y4_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What fraction is shaded?' },
            {
                type: 'hundredths_grid',
                totalParts: denominator,
                shadedParts: numerator,
                gridSize: '10x10'
            }
        ]
    };
}

/**
 * Generate "Tenths to hundredths" equivalence question
 * Example: "1/10 is the same as how many hundredths?"
 */
function generateTenthsToHundredths(tenthsValues, formats, level) {
    const tenths = randomChoice(tenthsValues);
    const hundredths = tenths * 10;
    const format = randomChoice(formats);

    const questionText = format === 'decimal'
        ? `${(tenths / 10).toFixed(1)} is the same as how many hundredths?`
        : `${tenths}/10 is the same as how many hundredths?`;

    const answerText = format === 'decimal'
        ? (hundredths / 100).toFixed(2)
        : `${hundredths}/100`;

    return {
        text: questionText,
        type: 'text_input',
        answer: answerText,
        hint: `${tenths} tenth${tenths !== 1 ? 's' : ''} = ${hundredths} hundredths`,
        module: 'F01_Y4_FRAC',
        level: level,

        questionParts: [
            { type: 'fraction', numerator: tenths, denominator: 10 },
            { type: 'text', value: 'is the same as how many hundredths?' }
        ]
    };
}

/**
 * Generate "Divide tenths by 10" question
 * Example: "What is 0.3 ÷ 10?"
 */
function generateDivideTenths(tenthsValues, formats, level) {
    const tenths = randomChoice(tenthsValues);
    const hundredths = tenths;
    const format = randomChoice(formats);

    const tenthsDecimal = (tenths / 10).toFixed(1);
    const result = (hundredths / 100).toFixed(2);

    const questionText = `What is ${tenthsDecimal} ÷ 10?`;
    const answerText = format === 'decimal' ? result : `${hundredths}/100`;

    return {
        text: questionText,
        type: 'text_input',
        answer: answerText,
        hint: `Dividing tenths by 10 gives hundredths`,
        module: 'F01_Y4_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What is' },
            { type: 'decimal', value: parseFloat(tenthsDecimal) },
            { type: 'text', value: '÷ 10?' }
        ]
    };
}

/**
 * Generate number line question
 * Example: "What number is the arrow pointing to? [number line 0-1 with arrow at 0.23]"
 */
function generateNumberLine(min, max, formats, level) {
    const numerator = randomInt(Math.max(1, min), Math.min(max, 100));
    const decimal = (numerator / 100).toFixed(2);
    const format = randomChoice(formats);

    const answerText = format === 'decimal' ? decimal : `${numerator}/100`;

    // Determine number line range based on value
    let lineStart, lineEnd, interval;
    if (numerator <= 20) {
        lineStart = 0;
        lineEnd = 0.2;
        interval = 0.01;
    } else if (numerator <= 50) {
        lineStart = 0;
        lineEnd = 0.5;
        interval = 0.05;
    } else {
        lineStart = 0;
        lineEnd = 1;
        interval = 0.1;
    }

    return {
        text: 'What number is the arrow pointing to?',
        type: 'text_input',
        answer: answerText,
        hint: `Count in hundredths from the start`,
        module: 'F01_Y4_FRAC',
        level: level,

        questionParts: [
            { type: 'text', value: 'What number is the arrow pointing to?' },
            {
                type: 'number_line',
                start: lineStart,
                end: lineEnd,
                interval: interval,
                targetValue: parseFloat(decimal),
                showLabels: true
            }
        ]
    };
}

/**
 * Generate word problem question
 * Example: "A meter is divided into 100 equal parts. Each part is one hundredth.
 *           If you measure 23 parts, what decimal do you have?"
 */
function generateWordProblem(divMin, divMax, divisor, numMin, numMax, formats, level) {
    const problemType = randomChoice(['division', 'measurement', 'money']);
    const format = randomChoice(formats);

    if (problemType === 'division') {
        const wholeNumber = randomInt(Math.ceil(divMin / divisor), Math.floor(divMax / divisor)) * divisor;
        const result = wholeNumber / divisor;
        const answerText = format === 'decimal' ? result.toFixed(2) : `${result * 100}/100`;

        const contexts = [
            `There are ${wholeNumber} pencils shared equally among 100 children. How many pencils does each child get?`,
            `A ribbon ${wholeNumber} cm long is cut into 100 equal pieces. How long is each piece?`,
            `${wholeNumber} ml of water is poured equally into 100 cups. How many ml are in each cup?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answerText,
            hint: `Divide ${wholeNumber} by 100`,
            module: 'F01_Y4_FRAC',
            level: level,

            questionParts: [
                { type: 'text', value: randomChoice(contexts) }
            ]
        };
    } else if (problemType === 'measurement') {
        const numerator = randomInt(Math.max(1, numMin), Math.min(numMax, 100));
        const answerText = format === 'decimal' ? (numerator / 100).toFixed(2) : `${numerator}/100`;

        const contexts = [
            `A meter is divided into 100 equal parts. If you measure ${numerator} parts, what fraction of a meter do you have?`,
            `A cake is cut into 100 equal slices. You eat ${numerator} slices. What fraction of the cake did you eat?`,
            `A 1-liter bottle is divided into 100 equal measures. You drink ${numerator} measures. What fraction of a liter is that?`
        ];

        return {
            text: randomChoice(contexts),
            type: 'text_input',
            answer: answerText,
            hint: `${numerator} out of 100 parts`,
            module: 'F01_Y4_FRAC',
            level: level,

            questionParts: [
                { type: 'text', value: randomChoice(contexts) }
            ]
        };
    } else {
        // Money context using pence/pounds
        const pence = randomInt(1, Math.min(numMax, 100));
        const pounds = (pence / 100).toFixed(2);
        const answerText = format === 'decimal' ? pounds : `${pence}/100`;

        return {
            text: `You have ${pence}p. Write this as a fraction of £1.`,
            type: 'text_input',
            answer: answerText,
            hint: `£1 = 100p, so ${pence}p = ${pence}/100 of £1`,
            module: 'F01_Y4_FRAC',
            level: level,

            questionParts: [
                { type: 'text', value: `You have ${pence}p. Write this as a fraction of £1.` }
            ]
        };
    }
}

export default {
    moduleId: 'F01_Y4_FRAC',
    generate: generateQuestion
};
