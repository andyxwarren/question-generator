/**
 * Years 3-5 Written Addition and Subtraction Generator (Consolidated)
 *
 * Modules:
 * - C02_Y3_CALC: Year 3 - 3-digit columnar addition and subtraction
 * - C02_Y4_CALC: Year 4 - 4-digit columnar addition and subtraction
 * - C02_Y5_CALC: Year 5 - 5+ digit columnar addition and subtraction
 *
 * This consolidated generator handles formal written methods of columnar
 * addition and subtraction across Years 3-5, with progressive difficulty
 * based purely on number range scaling.
 *
 * Schema v2.0 Compliant
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    checkCarry,
    checkBorrow,
    getRandomName,
    getRandomItem
} from './helpers/C01_C03_calculationHelpers.js';

import {
    formatColumnar
} from './helpers/C02_columnarHelpers.js';

/**
 * Configuration for year-specific differences
 */
const YEAR_CONFIG = {
    'C02_Y3_CALC': {
        minParamKey: 'min_3digit',
        maxParamKey: 'max_3digit',
        defaultMin: 100,
        defaultMax: 999,
        crossingOp: 'crossing_1000',
        crossingThreshold: 1000,
        crossingRanges: { aMin: 600, bMin: 400 },
        hasMultiStep: false,
        description: '3-digit'
    },
    'C02_Y4_CALC': {
        minParamKey: 'min_4digit',
        maxParamKey: 'max_4digit',
        defaultMin: 1000,
        defaultMax: 9999,
        crossingOp: 'crossing_10000',
        crossingThreshold: 10000,
        crossingRanges: { aMin: 6000, bMin: 4000 },
        hasMultiStep: true,
        description: '4-digit'
    },
    'C02_Y5_CALC': {
        minParamKey: 'min_value',
        maxParamKey: 'max_value',
        defaultMin: 10000,
        defaultMax: 9999999,
        crossingOp: 'large_numbers',
        crossingThreshold: 100000,
        crossingRanges: { aMin: 100000, bMin: 100000 },
        hasMultiStep: true,
        description: '5+ digit'
    }
};

/**
 * Main question generator
 */
export function generateQuestion(params, level, moduleId) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'addition_no_carry':
            return generateAdditionNoCarry(params, level, moduleId);
        case 'subtraction_no_borrow':
            return generateSubtractionNoBorrow(params, level, moduleId);
        case 'addition_simple_carry':
            return generateAdditionSimpleCarry(params, level, moduleId);
        case 'subtraction_simple_borrow':
            return generateSubtractionSimpleBorrow(params, level, moduleId);
        case 'addition_with_carry':
            return generateAdditionWithCarry(params, level, moduleId);
        case 'subtraction_with_borrow':
            return generateSubtractionWithBorrow(params, level, moduleId);
        case 'mixed_difficulty':
            return generateMixedDifficulty(params, level, moduleId);
        case 'crossing_1000':
        case 'crossing_10000':
        case 'large_numbers':
            return generateCrossingThreshold(params, level, moduleId);
        case 'missing_digit_problems':
            return generateMissingDigit(params, level, moduleId);
        case 'multi_step_problems':
            return generateMultiStep(params, level, moduleId);
        default:
            return generateAdditionNoCarry(params, level, moduleId);
    }
}

/**
 * Get min/max values from params based on year configuration
 */
function getRangeValues(params, config) {
    const min = params[config.minParamKey] || config.defaultMin;
    const max = params[config.maxParamKey] || config.defaultMax;
    return { min, max };
}

/**
 * OPERATION 1: Addition without Carrying
 */
function generateAdditionNoCarry(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);

    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(min, max);
        b = randomInt(min, max);
        answer = a + b;

        if (checkCarry(a, b)) continue;
        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();

        const contexts = moduleId === 'C02_Y3_CALC' ? [
            {
                template: 'A school library has [a] books. They buy [b] more books. How many books does the library have now?',
                rendered: `A school library has ${a.toLocaleString()} books. They buy ${b.toLocaleString()} more books. How many books does the library have now?`
            },
            {
                template: '[name] collected [a] [item] last week and [b] [item] this week. How many [item] altogether?',
                rendered: `${name} collected ${a.toLocaleString()} ${item} last week and ${b.toLocaleString()} ${item} this week. How many ${item} altogether?`
            },
            {
                template: 'There are [a] people in one cinema and [b] people in another cinema. How many people in total?',
                rendered: `There are ${a.toLocaleString()} people in one cinema and ${b.toLocaleString()} people in another cinema. How many people in total?`
            }
        ] : moduleId === 'C02_Y4_CALC' ? [
            {
                template: 'A city has [a] residents. [b] more people move to the city. How many residents are there now?',
                rendered: `A city has ${a.toLocaleString()} residents. ${b.toLocaleString()} more people move to the city. How many residents are there now?`
            },
            {
                template: 'A company sold [a] products in one year and [b] products the next year. How many products in total?',
                rendered: `A company sold ${a.toLocaleString()} products in one year and ${b.toLocaleString()} products the next year. How many products in total?`
            },
            {
                template: 'Two stadiums hold [a] and [b] people. What is the combined capacity?',
                rendered: `Two stadiums hold ${a.toLocaleString()} and ${b.toLocaleString()} people. What is the combined capacity?`
            }
        ] : [
            {
                template: 'A country has a population of [a]. [b] immigrants arrive. What is the new population?',
                rendered: `A country has a population of ${a.toLocaleString()}. ${b.toLocaleString()} immigrants arrive. What is the new population?`
            },
            {
                template: "A company's revenue was £[a] in one quarter and £[b] in another quarter. What was the total revenue?",
                rendered: `A company's revenue was £${a.toLocaleString()} in one quarter and £${b.toLocaleString()} in another quarter. What was the total revenue?`
            },
            {
                template: 'Two cities have populations of [a] and [b]. What is the combined population?',
                rendered: `Two cities have populations of ${a.toLocaleString()} and ${b.toLocaleString()}. What is the combined population?`
            }
        ];

        const context = randomChoice(contexts);
        values.name = name;
        values.item = item;
        valueMetadata.name = { type: "string", prefix: "", suffix: "", decimals: 0 };
        valueMetadata.item = { type: "string", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate: context.template,
            questionRendered: context.rendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `Use column method: [a] + [b]`,
            hintRendered: `Use column method: ${a.toLocaleString()} + ${b.toLocaleString()}`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    } else {
        const columnarText = formatColumnar(a, b, '+');
        const questionTemplate = `Calculate using the column method:\n\n[columnar]`;
        const questionRendered = `Calculate using the column method:\n\n${columnarText}`;

        values.columnar = columnarText;
        valueMetadata.columnar = { type: "string", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: 'Start with the ones column. No carrying needed for this question.',
            hintRendered: 'Start with the ones column. No carrying needed for this question.',
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    }
}

/**
 * OPERATION 2: Subtraction without Borrowing
 */
function generateSubtractionNoBorrow(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);

    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(min, max);
        b = randomInt(min, a - 1);
        answer = a - b;

        if (checkBorrow(a, b)) continue;

        break;
    } while (attempts++ < 100);

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();

        const contexts = moduleId === 'C02_Y3_CALC' ? [
            {
                template: 'A shop had [a] [item] in stock. They sold [b] [item]. How many [item] are left?',
                rendered: `A shop had ${a.toLocaleString()} ${item} in stock. They sold ${b.toLocaleString()} ${item}. How many ${item} are left?`
            },
            {
                template: '[name] had [a] points. They lost [b] points. How many points does [name] have now?',
                rendered: `${name} had ${a.toLocaleString()} points. They lost ${b.toLocaleString()} points. How many points does ${name} have now?`
            },
            {
                template: 'There were [a] people at a stadium. [b] people left. How many people remained?',
                rendered: `There were ${a.toLocaleString()} people at a stadium. ${b.toLocaleString()} people left. How many people remained?`
            }
        ] : moduleId === 'C02_Y4_CALC' ? [
            {
                template: 'A factory had [a] items. They shipped [b] items. How many items are left?',
                rendered: `A factory had ${a.toLocaleString()} items. They shipped ${b.toLocaleString()} items. How many items are left?`
            },
            {
                template: 'A school fundraiser aimed to raise £[a]. They have raised £[b] so far. How much more do they need?',
                rendered: `A school fundraiser aimed to raise £${a.toLocaleString()}. They have raised £${b.toLocaleString()} so far. How much more do they need?`
            },
            {
                template: '[a] people attended a concert. [b] left before the end. How many people stayed?',
                rendered: `${a.toLocaleString()} people attended a concert. ${b.toLocaleString()} left before the end. How many people stayed?`
            }
        ] : [
            {
                template: 'A region had [a] trees. [b] trees were cut down. How many trees remain?',
                rendered: `A region had ${a.toLocaleString()} trees. ${b.toLocaleString()} trees were cut down. How many trees remain?`
            },
            {
                template: 'A fund had £[a]. £[b] was spent. How much money is left?',
                rendered: `A fund had £${a.toLocaleString()}. £${b.toLocaleString()} was spent. How much money is left?`
            },
            {
                template: '[a] people were registered. [b] people unregistered. How many people are still registered?',
                rendered: `${a.toLocaleString()} people were registered. ${b.toLocaleString()} people unregistered. How many people are still registered?`
            }
        ];

        const context = randomChoice(contexts);
        values.name = name;
        values.item = item;
        valueMetadata.name = { type: "string", prefix: "", suffix: "", decimals: 0 };
        valueMetadata.item = { type: "string", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate: context.template,
            questionRendered: context.rendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `${params.instruction_hint || 'Use column method'}: [a] - [b]`,
            hintRendered: `${params.instruction_hint || 'Use column method'}: ${a.toLocaleString()} - ${b.toLocaleString()}`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    } else {
        const columnarText = formatColumnar(a, b, '-');
        const questionTemplate = `Calculate using the column method:\n\n[columnar]`;
        const questionRendered = `Calculate using the column method:\n\n${columnarText}`;

        values.columnar = columnarText;
        valueMetadata.columnar = { type: "string", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: 'Start with the ones column. Remember to borrow if needed.',
            hintRendered: 'Start with the ones column. Remember to borrow if needed.',
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    }
}

/**
 * OPERATION 3: Addition with Simple Carry
 */
function generateAdditionSimpleCarry(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);

    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(min, max);
        b = randomInt(min, max);
        answer = a + b;

        if (!checkCarry(a, b)) continue;

        if (params.allow_single_carry) {
            const carryCount = countCarries(a, b);
            if (carryCount > 1) continue;
        }

        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `Calculate:\n[a] + [b] = ?`;
    const questionRendered = `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`;

    return {
        questionTemplate,
        questionRendered,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate: `${params.instruction_hint || 'Use column method'}. Remember to carry.`,
        hintRendered: `${params.instruction_hint || 'Use column method'}. Remember to carry.`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * OPERATION 4: Subtraction with Simple Borrow
 */
function generateSubtractionSimpleBorrow(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);

    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(min, max);
        b = randomInt(min, a - 1);
        answer = a - b;

        if (!checkBorrow(a, b)) continue;

        if (params.allow_single_carry) {
            const borrowCount = countBorrows(a, b);
            if (borrowCount > 1) continue;
        }

        break;
    } while (attempts++ < 100);

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const questionTemplate = `Calculate:\n[a] - [b] = ?`;
    const questionRendered = `Calculate:\n${a.toLocaleString()} - ${b.toLocaleString()} = ?`;

    return {
        questionTemplate,
        questionRendered,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer,
        hintTemplate: `${params.instruction_hint || 'Use column method'}. Remember to borrow/regroup.`,
        hintRendered: `${params.instruction_hint || 'Use column method'}. Remember to borrow/regroup.`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * OPERATION 5: Addition with Carrying
 */
function generateAdditionWithCarry(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);

    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(min, max);
        b = randomInt(min, max);
        answer = a + b;

        if (answer > params.result_max) continue;

        break;
    } while (attempts++ < 100);

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = moduleId === 'C02_Y3_CALC' ? [
            {
                template: 'A factory produced [a] items in January and [b] items in February. How many items in total?',
                rendered: `A factory produced ${a.toLocaleString()} items in January and ${b.toLocaleString()} items in February. How many items in total?`
            },
            {
                template: 'One train has [a] passengers and another train has [b] passengers. How many passengers altogether?',
                rendered: `One train has ${a.toLocaleString()} passengers and another train has ${b.toLocaleString()} passengers. How many passengers altogether?`
            },
            {
                template: 'A charity raised £[a] in one event and £[b] in another event. How much money did they raise in total?',
                rendered: `A charity raised £${a.toLocaleString()} in one event and £${b.toLocaleString()} in another event. How much money did they raise in total?`
            }
        ] : moduleId === 'C02_Y4_CALC' ? [
            {
                template: 'An airport handled [a] passengers in June and [b] passengers in July. How many passengers in total?',
                rendered: `An airport handled ${a.toLocaleString()} passengers in June and ${b.toLocaleString()} passengers in July. How many passengers in total?`
            },
            {
                template: 'A charity received donations of £[a] and £[b]. How much did they receive altogether?',
                rendered: `A charity received donations of £${a.toLocaleString()} and £${b.toLocaleString()}. How much did they receive altogether?`
            },
            {
                template: 'Two libraries have [a] and [b] books. How many books in total?',
                rendered: `Two libraries have ${a.toLocaleString()} and ${b.toLocaleString()} books. How many books in total?`
            }
        ] : [
            {
                template: 'An online store sold [a] items in November and [b] items in December. How many items were sold in total?',
                rendered: `An online store sold ${a.toLocaleString()} items in November and ${b.toLocaleString()} items in December. How many items were sold in total?`
            },
            {
                template: 'Two charities raised £[a] and £[b]. How much did they raise altogether?',
                rendered: `Two charities raised £${a.toLocaleString()} and £${b.toLocaleString()}. How much did they raise altogether?`
            },
            {
                template: 'A stadium has [a] seats in the main stand and [b] seats in the side stands. What is the total capacity?',
                rendered: `A stadium has ${a.toLocaleString()} seats in the main stand and ${b.toLocaleString()} seats in the side stands. What is the total capacity?`
            }
        ];

        const context = randomChoice(contexts);

        return {
            questionTemplate: context.template,
            questionRendered: context.rendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: params.instruction_hint || 'Use column method',
            hintRendered: params.instruction_hint || 'Use column method',
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    } else {
        const columnarText = formatColumnar(a, b, '+');
        const questionTemplate = `Calculate using the column method:\n\n[columnar]`;
        const questionRendered = `Calculate using the column method:\n\n${columnarText}`;

        values.columnar = columnarText;
        valueMetadata.columnar = { type: "string", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: 'Start with the ones column. Remember to carry if needed.',
            hintRendered: 'Start with the ones column. Remember to carry if needed.',
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    }
}

/**
 * OPERATION 6: Subtraction with Borrowing
 */
function generateSubtractionWithBorrow(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);

    let a, b, answer;
    let attempts = 0;

    do {
        a = randomInt(min, max);
        b = randomInt(min, a - 1);
        answer = a - b;

        break;
    } while (attempts++ < 100);

    const values = { a, b, answer };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const style = randomChoice(params.question_styles);

    if (style === 'word_problem') {
        const contexts = moduleId === 'C02_Y3_CALC' ? [
            {
                template: 'A stadium has [a] seats. [b] seats are already booked. How many seats are still available?',
                rendered: `A stadium has ${a.toLocaleString()} seats. ${b.toLocaleString()} seats are already booked. How many seats are still available?`
            },
            {
                template: 'A warehouse has [a] boxes. [b] boxes are shipped out. How many boxes remain?',
                rendered: `A warehouse has ${a.toLocaleString()} boxes. ${b.toLocaleString()} boxes are shipped out. How many boxes remain?`
            },
            {
                template: 'A school has [a] students. [b] students are away on a trip. How many students are still at school?',
                rendered: `A school has ${a.toLocaleString()} students. ${b.toLocaleString()} students are away on a trip. How many students are still at school?`
            }
        ] : moduleId === 'C02_Y4_CALC' ? [
            {
                template: 'A warehouse has [a] boxes. [b] boxes are shipped. How many boxes remain?',
                rendered: `A warehouse has ${a.toLocaleString()} boxes. ${b.toLocaleString()} boxes are shipped. How many boxes remain?`
            },
            {
                template: 'A town has [a] residents. [b] people moved away. How many residents are left?',
                rendered: `A town has ${a.toLocaleString()} residents. ${b.toLocaleString()} people moved away. How many residents are left?`
            },
            {
                template: 'A company had [a] pounds in savings. They spent [b] pounds. How much money is left?',
                rendered: `A company had ${a.toLocaleString()} pounds in savings. They spent ${b.toLocaleString()} pounds. How much money is left?`
            }
        ] : [
            {
                template: 'A government budget was £[a]. They spent £[b]. How much of the budget remains?',
                rendered: `A government budget was £${a.toLocaleString()}. They spent £${b.toLocaleString()}. How much of the budget remains?`
            },
            {
                template: 'A forest had [a] trees. [b] trees were destroyed in a storm. How many trees are left?',
                rendered: `A forest had ${a.toLocaleString()} trees. ${b.toLocaleString()} trees were destroyed in a storm. How many trees are left?`
            },
            {
                template: 'A company had [a] employees. [b] employees left. How many employees remain?',
                rendered: `A company had ${a.toLocaleString()} employees. ${b.toLocaleString()} employees left. How many employees remain?`
            }
        ];

        const context = randomChoice(contexts);

        return {
            questionTemplate: context.template,
            questionRendered: context.rendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: params.instruction_hint || 'Use column method',
            hintRendered: params.instruction_hint || 'Use column method',
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    } else {
        const columnarText = formatColumnar(a, b, '-');
        const questionTemplate = `Calculate using the column method:\n\n[columnar]`;
        const questionRendered = `Calculate using the column method:\n\n${columnarText}`;

        values.columnar = columnarText;
        valueMetadata.columnar = { type: "string", prefix: "", suffix: "", decimals: 0 };

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: 'Start with the ones column. Remember to borrow if needed.',
            hintRendered: 'Start with the ones column. Remember to borrow if needed.',
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    }
}

/**
 * OPERATION 7: Mixed Difficulty
 */
function generateMixedDifficulty(params, level, moduleId) {
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        const tempParams = { ...params, operations: ['addition_with_carry'] };
        return generateQuestion(tempParams, level, moduleId);
    } else {
        const tempParams = { ...params, operations: ['subtraction_with_borrow'] };
        return generateQuestion(tempParams, level, moduleId);
    }
}

/**
 * OPERATION 8: Crossing Threshold (1000, 10000, or large numbers)
 */
function generateCrossingThreshold(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { max } = getRangeValues(params, config);

    let a, b, answer;
    let attempts = 0;

    if (moduleId === 'C02_Y5_CALC') {
        // For Y5, "large_numbers" means 6-7 digit operations
        const opType = randomChoice(['addition', 'subtraction']);

        if (opType === 'addition') {
            do {
                a = randomInt(config.crossingRanges.aMin, max);
                b = randomInt(config.crossingRanges.bMin, max);
                answer = a + b;

                if (answer > params.result_max) continue;

                break;
            } while (attempts++ < 100);
        } else {
            do {
                a = randomInt(config.crossingRanges.aMin, max);
                b = randomInt(config.crossingRanges.bMin, a - 1);
                answer = a - b;

                break;
            } while (attempts++ < 100);
        }

        const values = { a, b, answer };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const op = opType === 'addition' ? '+' : '-';
        const questionTemplate = `Calculate:\n[a] ${op} [b] = ?`;
        const questionRendered = `Calculate:\n${a.toLocaleString()} ${op} ${b.toLocaleString()} = ?`;

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `${params.instruction_hint || 'Use column method'}. Work carefully with large numbers.`,
            hintRendered: `${params.instruction_hint || 'Use column method'}. Work carefully with large numbers.`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    } else {
        // For Y3 and Y4, crossing threshold is addition only
        do {
            a = randomInt(config.crossingRanges.aMin, max);
            b = randomInt(config.crossingRanges.bMin, max);
            answer = a + b;

            if (answer <= config.crossingThreshold) continue;
            if (answer > params.result_max) continue;

            break;
        } while (attempts++ < 100);

        const values = { a, b, answer, threshold: config.crossingThreshold };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
            threshold: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const questionTemplate = `Calculate:\n[a] + [b] = ?`;
        const questionRendered = `Calculate:\n${a.toLocaleString()} + ${b.toLocaleString()} = ?`;

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `${params.instruction_hint || 'Use column method'}. The answer will be over [threshold].`,
            hintRendered: `${params.instruction_hint || 'Use column method'}. The answer will be over ${config.crossingThreshold.toLocaleString()}.`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    }
}

/**
 * OPERATION 9: Missing Digit Problems
 */
function generateMissingDigit(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);
    const opType = randomChoice(['addition', 'subtraction']);

    if (opType === 'addition') {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(min, max);
            b = randomInt(min, max);
            answer = a + b;

            if (answer > params.result_max) continue;

            break;
        } while (attempts++ < 100);

        const aStr = a.toString();
        const digitPosition = randomChoice([...Array(aStr.length).keys()]);
        const hiddenDigit = aStr[digitPosition];
        const hiddenA = aStr.substring(0, digitPosition) + '_' + aStr.substring(digitPosition + 1);

        const distractors = generateDistractors(parseInt(hiddenDigit), 3, 0, 9);
        const options = shuffle([parseInt(hiddenDigit), ...distractors]);

        const values = { hiddenA, b, answer, a, hiddenDigit: parseInt(hiddenDigit) };
        const valueMetadata = {
            hiddenA: { type: "string", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            hiddenDigit: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const questionTemplate = `Find the missing digit:\n[hiddenA] + [b] = [answer]`;
        const questionRendered = `Find the missing digit:\n${hiddenA} + ${b.toLocaleString()} = ${answer.toLocaleString()}`;

        return {
            questionTemplate,
            questionRendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: parseInt(hiddenDigit),
            hintTemplate: `Work backwards: [answer] - [b] = [a]`,
            hintRendered: `Work backwards: ${answer.toLocaleString()} - ${b.toLocaleString()} = ${a.toLocaleString()}`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    } else {
        let a, b, answer;
        let attempts = 0;

        do {
            a = randomInt(min, max);
            b = randomInt(min, a - 1);
            answer = a - b;

            break;
        } while (attempts++ < 100);

        const aStr = a.toString();
        const digitPosition = randomChoice([...Array(aStr.length).keys()]);
        const hiddenDigit = aStr[digitPosition];
        const hiddenA = aStr.substring(0, digitPosition) + '_' + aStr.substring(digitPosition + 1);

        const distractors = generateDistractors(parseInt(hiddenDigit), 3, 0, 9);
        const options = shuffle([parseInt(hiddenDigit), ...distractors]);

        const values = { hiddenA, b, answer, a, hiddenDigit: parseInt(hiddenDigit) };
        const valueMetadata = {
            hiddenA: { type: "string", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 },
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            hiddenDigit: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const questionTemplate = `Find the missing digit:\n[hiddenA] - [b] = [answer]`;
        const questionRendered = `Find the missing digit:\n${hiddenA} - ${b.toLocaleString()} = ${answer.toLocaleString()}`;

        return {
            questionTemplate,
            questionRendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: parseInt(hiddenDigit),
            hintTemplate: `Work backwards: [answer] + [b] = [a]`,
            hintRendered: `Work backwards: ${answer.toLocaleString()} + ${b.toLocaleString()} = ${a.toLocaleString()}`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    }
}

/**
 * OPERATION 10: Multi-Step Problems (Y4 and Y5 only)
 */
function generateMultiStep(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];

    if (!config.hasMultiStep) {
        // Fallback for Y3 (shouldn't happen, but safe)
        return generateMixedDifficulty(params, level, moduleId);
    }

    const name = getRandomName();
    const item = getRandomItem();

    let a, b, c, intermediate, answer;

    if (moduleId === 'C02_Y4_CALC') {
        a = randomInt(params.min_4digit || 1000, params.max_4digit || 9999);
        b = randomInt(1000, 5000);
        c = randomInt(500, 3000);
        intermediate = a + b;
        answer = intermediate - c;

        const values = { name, item, a, b, c, intermediate, answer };
        const valueMetadata = {
            name: { type: "string", prefix: "", suffix: "", decimals: 0 },
            item: { type: "string", prefix: "", suffix: "", decimals: 0 },
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            c: { type: "number", prefix: "", suffix: "", decimals: 0 },
            intermediate: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        const questionTemplate = `[name] starts with [a] [item]. They gain [b] [item], then lose [c] [item]. How many [item] does [name] have now?`;
        const questionRendered = `${name} starts with ${a.toLocaleString()} ${item}. They gain ${b.toLocaleString()} ${item}, then lose ${c.toLocaleString()} ${item}. How many ${item} does ${name} have now?`;

        return {
            questionTemplate,
            questionRendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `First add: [a] + [b] = [intermediate], then subtract: [intermediate] - [c]`,
            hintRendered: `First add: ${a.toLocaleString()} + ${b.toLocaleString()} = ${intermediate.toLocaleString()}, then subtract: ${intermediate.toLocaleString()} - ${c.toLocaleString()}`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    } else {
        // Y5
        a = randomInt(10000, 500000);
        b = randomInt(5000, 100000);
        c = randomInt(2000, 50000);
        intermediate = a + b;
        answer = intermediate - c;

        const contexts = [
            {
                template: "A city's population started at [a]. It grew by [b] people, then [c] people moved away. What is the population now?",
                rendered: `A city's population started at ${a.toLocaleString()}. It grew by ${b.toLocaleString()} people, then ${c.toLocaleString()} people moved away. What is the population now?`
            },
            {
                template: 'A company had £[a] in savings. They earned £[b] more, then spent £[c]. How much do they have now?',
                rendered: `A company had £${a.toLocaleString()} in savings. They earned £${b.toLocaleString()} more, then spent £${c.toLocaleString()}. How much do they have now?`
            },
            {
                template: 'A warehouse had [a] items. They received [b] items, then shipped [c] items. How many items are in the warehouse now?',
                rendered: `A warehouse had ${a.toLocaleString()} items. They received ${b.toLocaleString()} items, then shipped ${c.toLocaleString()} items. How many items are in the warehouse now?`
            }
        ];

        const context = randomChoice(contexts);

        const values = { a, b, c, intermediate, answer };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 },
            c: { type: "number", prefix: "", suffix: "", decimals: 0 },
            intermediate: { type: "number", prefix: "", suffix: "", decimals: 0 },
            answer: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        return {
            questionTemplate: context.template,
            questionRendered: context.rendered,
            type: 'text_input',
            values,
            valueMetadata,
            answer: answer,
            hintTemplate: `First add: [a] + [b] = [intermediate], then subtract: [intermediate] - [c]`,
            hintRendered: `First add: ${a.toLocaleString()} + ${b.toLocaleString()} = ${intermediate.toLocaleString()}, then subtract: ${intermediate.toLocaleString()} - ${c.toLocaleString()}`,
            locale: 'en-GB',
            universal: true,
            module: moduleId,
            level: level
        };
    }
}

/**
 * Helper: Count number of carries in addition
 */
function countCarries(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();
    const maxLen = Math.max(strA.length, strB.length);

    let carry = 0;
    let carryCount = 0;

    for (let i = 0; i < maxLen; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');
        const sum = digitA + digitB + carry;

        if (sum >= 10) {
            carryCount++;
            carry = 1;
        } else {
            carry = 0;
        }
    }

    return carryCount;
}

/**
 * Helper: Count number of borrows in subtraction
 */
function countBorrows(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();

    let borrowCount = 0;

    for (let i = 0; i < strB.length; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');

        if (digitA < digitB) {
            borrowCount++;
        }
    }

    return borrowCount;
}

/**
 * Export generators for all three year groups
 */
export const C02_Y3_CALC = {
    moduleId: 'C02_Y3_CALC',
    generate: (params, level) => generateQuestion(params, level, 'C02_Y3_CALC')
};

export const C02_Y4_CALC = {
    moduleId: 'C02_Y4_CALC',
    generate: (params, level) => generateQuestion(params, level, 'C02_Y4_CALC')
};

export const C02_Y5_CALC = {
    moduleId: 'C02_Y5_CALC',
    generate: (params, level) => generateQuestion(params, level, 'C02_Y5_CALC')
};

// Default export for backward compatibility (Y3)
export default C02_Y3_CALC;
