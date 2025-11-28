/**
 * M01_Y4_MEAS: Compare Measures
 *
 * Year 4: Compare different measures, including money in pounds and pence
 * Supports i18n typed values for locale-aware rendering
 */

import {
    randomChoice,
    generateComparisonPair,
    generateMeasurementsForOrdering,
    compareMeasurements,
    sortMeasurements,
    findEquivalentMeasurements,
    generateEquivalentMeasurement
} from './helpers/M01_measurementHelpers.js';
import { render as i18nRender, DEFAULT_LOCALE } from '../i18n/index.js';

/**
 * Generate a measurement comparison question
 * @param {Object} params - V2 nested parameters with math and presentation
 * @param {number} level - Difficulty level (1-4)
 * @param {string} locale - Locale for formatting (default: en-GB)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level, locale = 'en-GB') {
    // CRITICAL: V2 NESTED DESTRUCTURING PATTERN
    const {
        math: {
            types,
            units,
            ranges,
            comparisonType,
            orderCount
        },
        presentation: {
            questionTypes,
            visualType,
            showUnits
        }
    } = params;

    // Select a random question type
    const questionType = randomChoice(questionTypes);

    // Select a random measure type
    const measureType = randomChoice(types);

    // Generate question based on type
    let question;

    switch (questionType) {
        case 'which_greater':
            question = generateWhichGreaterQuestion(measureType, { units, ranges, comparisonType }, locale);
            break;
        case 'which_smaller':
            question = generateWhichSmallerQuestion(measureType, { units, ranges, comparisonType }, locale);
            break;
        case 'order_ascending':
            question = generateOrderAscendingQuestion(measureType, { units, ranges, comparisonType }, orderCount, locale);
            break;
        case 'order_descending':
            question = generateOrderDescendingQuestion(measureType, { units, ranges, comparisonType }, orderCount, locale);
            break;
        case 'are_equal':
            question = generateAreEqualQuestion(measureType, { units, ranges, comparisonType }, locale);
            break;
        case 'find_equivalent':
            question = generateFindEquivalentQuestion(measureType, { units, ranges, comparisonType }, orderCount, locale);
            break;
        default:
            question = generateWhichGreaterQuestion(measureType, { units, ranges, comparisonType }, locale);
    }

    // Add module and level metadata
    question.module = 'M01_Y4_MEAS';
    question.level = level;

    return question;
}

/**
 * Generate a "which is greater" question
 */
function generateWhichGreaterQuestion(measureType, mathParams, locale = DEFAULT_LOCALE) {
    const [measure1, measure2] = generateComparisonPair(measureType, mathParams, locale);

    const comparison = compareMeasurements(measure1, measure2);
    const answerMeasure = comparison === 'greater' ? measure1 : measure2;

    // Template-based question for i18n
    const template = 'Which is greater: {v1} or {v2}?';
    const values = {
        v1: measure1.typed,
        v2: measure2.typed,
        answer: answerMeasure.typed
    };

    return {
        // Template for external i18n rendering
        template,
        answerTemplate: '{answer}',
        values,

        // Pre-rendered text for backwards compatibility
        text: i18nRender(template, values, locale),
        type: 'multiple_choice',
        answer: answerMeasure.displayText,
        options: [measure1.displayText, measure2.displayText],
        hint: 'Convert both measurements to the same unit and compare',

        questionParts: [
            { type: 'text', value: 'Which is greater?' },
            {
                type: 'comparison',
                measurements: [
                    {
                        typed: measure1.typed,
                        display: measure1.displayText,
                        value: measure1.value,
                        unit: measure1.displayUnit,
                        baseValue: measure1.baseValue
                    },
                    {
                        typed: measure2.typed,
                        display: measure2.displayText,
                        value: measure2.value,
                        unit: measure2.displayUnit,
                        baseValue: measure2.baseValue
                    }
                ],
                comparisonType: 'greater',
                measureType: measureType
            }
        ]
    };
}

/**
 * Generate a "which is smaller" question
 */
function generateWhichSmallerQuestion(measureType, mathParams, locale = DEFAULT_LOCALE) {
    const [measure1, measure2] = generateComparisonPair(measureType, mathParams, locale);

    const comparison = compareMeasurements(measure1, measure2);
    const answerMeasure = comparison === 'smaller' ? measure1 : measure2;

    // Template-based question for i18n
    const template = 'Which is smaller: {v1} or {v2}?';
    const values = {
        v1: measure1.typed,
        v2: measure2.typed,
        answer: answerMeasure.typed
    };

    return {
        template,
        answerTemplate: '{answer}',
        values,

        text: i18nRender(template, values, locale),
        type: 'multiple_choice',
        answer: answerMeasure.displayText,
        options: [measure1.displayText, measure2.displayText],
        hint: 'Convert both measurements to the same unit and compare',

        questionParts: [
            { type: 'text', value: 'Which is smaller?' },
            {
                type: 'comparison',
                measurements: [
                    {
                        typed: measure1.typed,
                        display: measure1.displayText,
                        value: measure1.value,
                        unit: measure1.displayUnit,
                        baseValue: measure1.baseValue
                    },
                    {
                        typed: measure2.typed,
                        display: measure2.displayText,
                        value: measure2.value,
                        unit: measure2.displayUnit,
                        baseValue: measure2.baseValue
                    }
                ],
                comparisonType: 'smaller',
                measureType: measureType
            }
        ]
    };
}

/**
 * Generate an "order ascending" question
 */
function generateOrderAscendingQuestion(measureType, mathParams, count, locale = DEFAULT_LOCALE) {
    const measurements = generateMeasurementsForOrdering(measureType, mathParams, count, locale);
    const sorted = sortMeasurements(measurements, 'ascending');

    const displayList = measurements.map(m => m.displayText).join(', ');
    const answerList = sorted.map(m => m.displayText).join(', ');

    // Build values map for template
    const values = {};
    measurements.forEach((m, i) => {
        values[`v${i + 1}`] = m.typed;
    });

    // Template with dynamic placeholders
    const placeholders = measurements.map((_, i) => `{v${i + 1}}`).join(', ');
    const template = `Order these measurements from smallest to largest: ${placeholders}`;

    return {
        template,
        values,

        text: `Order these measurements from smallest to largest: ${displayList}`,
        type: 'text_input',
        answer: answerList,
        hint: 'Convert all measurements to the same unit first, then order them',

        questionParts: [
            { type: 'text', value: 'Order these measurements from smallest to largest:' },
            {
                type: 'ordering',
                measurements: measurements.map(m => ({
                    typed: m.typed,
                    display: m.displayText,
                    value: m.value,
                    unit: m.displayUnit,
                    baseValue: m.baseValue
                })),
                orderType: 'ascending',
                measureType: measureType
            }
        ]
    };
}

/**
 * Generate an "order descending" question
 */
function generateOrderDescendingQuestion(measureType, mathParams, count, locale = DEFAULT_LOCALE) {
    const measurements = generateMeasurementsForOrdering(measureType, mathParams, count, locale);
    const sorted = sortMeasurements(measurements, 'descending');

    const displayList = measurements.map(m => m.displayText).join(', ');
    const answerList = sorted.map(m => m.displayText).join(', ');

    // Build values map for template
    const values = {};
    measurements.forEach((m, i) => {
        values[`v${i + 1}`] = m.typed;
    });

    // Template with dynamic placeholders
    const placeholders = measurements.map((_, i) => `{v${i + 1}}`).join(', ');
    const template = `Order these measurements from largest to smallest: ${placeholders}`;

    return {
        template,
        values,

        text: `Order these measurements from largest to smallest: ${displayList}`,
        type: 'text_input',
        answer: answerList,
        hint: 'Convert all measurements to the same unit first, then order them',

        questionParts: [
            { type: 'text', value: 'Order these measurements from largest to smallest:' },
            {
                type: 'ordering',
                measurements: measurements.map(m => ({
                    typed: m.typed,
                    display: m.displayText,
                    value: m.value,
                    unit: m.displayUnit,
                    baseValue: m.baseValue
                })),
                orderType: 'descending',
                measureType: measureType
            }
        ]
    };
}

/**
 * Generate an "are equal" question
 */
function generateAreEqualQuestion(measureType, mathParams, locale = DEFAULT_LOCALE) {
    const [measure1, measure2] = generateComparisonPair(measureType, mathParams, locale);

    const comparison = compareMeasurements(measure1, measure2);
    const answer = comparison === 'equal' ? 'yes' : 'no';

    // Template-based question for i18n
    const template = 'Are these measurements equal? {v1} and {v2}';
    const values = {
        v1: measure1.typed,
        v2: measure2.typed
    };

    return {
        template,
        values,

        text: i18nRender(template, values, locale),
        type: 'multiple_choice',
        answer: answer,
        options: ['yes', 'no'],
        hint: 'Convert both measurements to the same unit to check if they are equal',

        questionParts: [
            { type: 'text', value: 'Are these measurements equal?' },
            {
                type: 'comparison',
                measurements: [
                    {
                        typed: measure1.typed,
                        display: measure1.displayText,
                        value: measure1.value,
                        unit: measure1.displayUnit,
                        baseValue: measure1.baseValue
                    },
                    {
                        typed: measure2.typed,
                        display: measure2.displayText,
                        value: measure2.value,
                        unit: measure2.displayUnit,
                        baseValue: measure2.baseValue
                    }
                ],
                comparisonType: 'equal',
                measureType: measureType
            }
        ]
    };
}

/**
 * Generate a "find equivalent" question
 */
function generateFindEquivalentQuestion(measureType, mathParams, count, locale = DEFAULT_LOCALE) {
    const measurements = generateMeasurementsForOrdering(measureType, mathParams, count, locale);

    // Try to create at least one pair of equivalent measurements
    // by generating an equivalent for one of them
    const availableUnits = mathParams.units[measureType];
    const baseMeasure = measurements[0];
    const equivalentMeasure = generateEquivalentMeasurement(baseMeasure, availableUnits, mathParams.ranges, locale);

    // Replace one measurement with the equivalent
    if (equivalentMeasure.unit !== baseMeasure.unit) {
        measurements[Math.floor(measurements.length / 2)] = equivalentMeasure;
    }

    const displayList = measurements.map(m => m.displayText).join(', ');

    // Find which measurements are equivalent
    const equivalentIndices = findEquivalentMeasurements(measurements);

    // Build values map for template
    const values = {};
    measurements.forEach((m, i) => {
        values[`v${i + 1}`] = m.typed;
    });

    // Template with dynamic placeholders
    const placeholders = measurements.map((_, i) => `{v${i + 1}}`).join(', ');

    let answer, questionText, template;
    if (equivalentIndices.length === 2) {
        const [idx1, idx2] = equivalentIndices;
        answer = `${measurements[idx1].displayText} and ${measurements[idx2].displayText}`;
        questionText = `Which two measurements are equal? ${displayList}`;
        template = `Which two measurements are equal? ${placeholders}`;
    } else {
        answer = 'none';
        questionText = `Which two measurements are equal? ${displayList} (Answer 'none' if no two are equal)`;
        template = `Which two measurements are equal? ${placeholders} (Answer 'none' if no two are equal)`;
    }

    return {
        template,
        values,

        text: questionText,
        type: 'text_input',
        answer: answer,
        hint: 'Convert all measurements to the same unit and look for equal values',

        questionParts: [
            { type: 'text', value: 'Which two measurements are equal?' },
            {
                type: 'find_equivalent',
                measurements: measurements.map(m => ({
                    typed: m.typed,
                    display: m.displayText,
                    value: m.value,
                    unit: m.displayUnit,
                    baseValue: m.baseValue
                })),
                measureType: measureType
            }
        ]
    };
}

export default {
    moduleId: 'M01_Y4_MEAS',
    generate: generateQuestion
};
