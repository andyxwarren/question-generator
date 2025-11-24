/**
 * N02 Unified Generator: Read, Write, Order and Compare Numbers
 * Consolidated generator supporting Years 1-6 with Schema v2.0
 *
 * This single file replaces 6 separate year-specific generators:
 * - N02_Y1_NPV_readwrite.js
 * - N02_Y2_NPV_readwrite.js
 * - N02_Y3_NPV_readwrite.js
 * - N02_Y4_NPV_readwrite.js
 * - N02_Y5_NPV_readwrite.js
 * - N02_Y6_NPV_readwrite.js
 *
 * Year-specific behavior is controlled entirely by parameters, not code.
 * Each year maintains its own moduleId for backward compatibility.
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    generateUniqueNumbers,
    sortAscending,
    getPlaceValue,
    roundToNearest,
    generateNonMultiple
} from './helpers/N02_numberHelpers.js';

/**
 * Main unified question generator
 * Handles all N02 modules (Years 1-6)
 */
export function generateQuestion(params, level, moduleId) {
    const operation = randomChoice(params.operations);

    // Route to appropriate generator based on operation
    switch(operation) {
        // Basic operations (all years)
        case 'identify_numeral':
            return generateIdentifyNumeral(params, level, moduleId);

        // Step operations (varying by year)
        case 'one_more':
            return generateStepQuestion(params, level, 1, 'more', moduleId);
        case 'one_less':
            return generateStepQuestion(params, level, 1, 'less', moduleId);
        case 'ten_more':
            return generateStepQuestion(params, level, 10, 'more', moduleId);
        case 'ten_less':
            return generateStepQuestion(params, level, 10, 'less', moduleId);
        case 'hundred_more':
            return generateStepQuestion(params, level, 100, 'more', moduleId);
        case 'hundred_less':
            return generateStepQuestion(params, level, 100, 'less', moduleId);
        case 'thousand_more':
            return generateStepQuestion(params, level, 1000, 'more', moduleId);
        case 'thousand_less':
            return generateStepQuestion(params, level, 1000, 'less', moduleId);
        case 'ten_thousand_more':
            return generateStepQuestion(params, level, 10000, 'more', moduleId);
        case 'ten_thousand_less':
            return generateStepQuestion(params, level, 10000, 'less', moduleId);
        case 'hundred_thousand_more':
            return generateStepQuestion(params, level, 100000, 'more', moduleId);
        case 'hundred_thousand_less':
            return generateStepQuestion(params, level, 100000, 'less', moduleId);
        case 'million_more':
            return generateStepQuestion(params, level, 1000000, 'more', moduleId);
        case 'million_less':
            return generateStepQuestion(params, level, 1000000, 'less', moduleId);
        case 'ten_million_more':
            return generateStepQuestion(params, level, 10000000, 'more', moduleId);
        case 'ten_million_less':
            return generateStepQuestion(params, level, 10000000, 'less', moduleId);

        // Word conversion (Years 1-3)
        case 'numeral_to_word':
            return generateNumeralToWord(params, level, moduleId);
        case 'word_to_numeral':
            return generateWordToNumeral(params, level, moduleId);

        // Comparison operations (all years)
        case 'compare_two':
            return generateCompareTwo(params, level, moduleId);
        case 'use_symbols':
            return generateUseSymbols(params, level, moduleId);

        // Ordering (all years, varying counts)
        case 'order_two':
            return generateOrder(params, level, 2, moduleId);
        case 'order_three':
            return generateOrder(params, level, 3, moduleId);
        case 'order_four':
            return generateOrder(params, level, 4, moduleId);
        case 'order_five':
            return generateOrder(params, level, 5, moduleId);
        case 'order_six':
            return generateOrder(params, level, 6, moduleId);

        // Advanced operations (Years 2+)
        case 'complete_statement':
            return generateCompleteStatement(params, level, moduleId);
        case 'true_false':
            return generateTrueFalse(params, level, moduleId);
        case 'between':
            return generateBetween(params, level, moduleId);

        // Place value operations (Years 3+)
        case 'place_value_comparison':
            return generatePlaceValueComparison(params, level, moduleId);
        case 'place_value_digit':
            return generatePlaceValueDigit(params, level, moduleId);

        // Rounding operations (Years 4+)
        case 'round_to_ten':
            return generateRounding(params, level, 10, moduleId);
        case 'round_to_hundred':
            return generateRounding(params, level, 100, moduleId);
        case 'round_to_thousand':
            return generateRounding(params, level, 1000, moduleId);
        case 'round_to_ten_thousand':
            return generateRounding(params, level, 10000, moduleId);
        case 'round_to_hundred_thousand':
            return generateRounding(params, level, 100000, moduleId);
        case 'round_to_million':
            return generateRounding(params, level, 1000000, moduleId);

        // Complex operations (Years 3+)
        case 'complex_more_less':
            return generateComplexMoreLess(params, level, moduleId);

        default:
            return generateIdentifyNumeral(params, level, moduleId);
    }
}

/**
 * Generate identify numeral question
 */
function generateIdentifyNumeral(params, level, moduleId) {
    const number = randomInt(params.min_value, params.max_value);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    const values = { number };
    const valueMetadata = {
        number: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `What number is [number]?`,
        questionRendered: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: number,
        hintTemplate: `Look at the place values`,
        hintRendered: `Look at the place values`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate step question (1 more, 10 less, etc.)
 */
function generateStepQuestion(params, level, step, direction, moduleId) {
    let number;

    if (direction === 'more') {
        number = randomInt(params.min_value, params.max_value - step);
    } else {
        number = randomInt(params.min_value + step, params.max_value);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, params.min_value, params.max_value);
    const options = shuffle([answer, ...distractors]);

    const dirWord = direction === 'more' ? 'more' : 'less';

    const values = { step, number };
    const valueMetadata = {
        step: { type: "number", prefix: "", suffix: "", decimals: 0 },
        number: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `What is [step] ${dirWord} than [number]?`,
        questionRendered: `What is ${step} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `${direction === 'more' ? 'Add' : 'Subtract'} [step]`,
        hintRendered: `${direction === 'more' ? 'Add' : 'Subtract'} ${step}`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate numeral to word conversion
 */
function generateNumeralToWord(params, level, moduleId) {
    const number = randomInt(params.word_min, Math.min(params.word_max, 100));
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, params.word_min, Math.min(params.word_max, 100));
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    const values = { number };
    const valueMetadata = {
        number: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `How do you write [number] in words?`,
        questionRendered: `How do you write ${formatNumber(number)} in words?`,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: correctWord,
        hintTemplate: `Say the number out loud`,
        hintRendered: `Say the number out loud`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate word to numeral conversion
 */
function generateWordToNumeral(params, level, moduleId) {
    const number = randomInt(params.word_min, Math.min(params.word_max, 100));
    const word = numberToWord(number);

    const distractors = generateDistractors(number, 3, params.word_min, Math.min(params.word_max, 100));
    const options = shuffle([number, ...distractors]);

    // Word is not in values since it's the given information, not a variable
    const values = {};
    const valueMetadata = {};

    return {
        questionTemplate: `What number is "${word}"?`,
        questionRendered: `What number is "${word}"?`,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: number,
        hintTemplate: `Think about the digits`,
        hintRendered: `Think about the digits`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate compare two numbers
 */
function generateCompareTwo(params, level, moduleId) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

    if (num1 === num2) {
        return generateCompareTwo(params, level, moduleId);
    }

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const questions = [
        {
            template: `Which number is larger: [num1] or [num2]?`,
            rendered: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
            answer: larger
        },
        {
            template: `Which number is smaller: [num1] or [num2]?`,
            rendered: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
            answer: smaller
        }
    ];

    const q = randomChoice(questions);

    const values = { num1, num2 };
    const valueMetadata = {
        num1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        num2: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: q.template,
        questionRendered: q.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: [num1, num2],
        answer: q.answer,
        hintTemplate: `Compare place values`,
        hintRendered: `Compare place values`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate use comparison symbols
 */
function generateUseSymbols(params, level, moduleId) {
    const num1 = randomInt(params.min_value, params.max_value);
    let num2 = randomInt(params.min_value, params.max_value);

    if (Math.random() < 0.2) {
        num2 = num1;
    }

    const symbol = getComparisonSymbol(num1, num2);

    const values = { num1, num2 };
    const valueMetadata = {
        num1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        num2: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const templateText = `Which symbol completes the statement?\n[num1] [unknown] [num2]`;
    const renderedText = `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`;

    values.unknown = symbol;
    valueMetadata.unknown = { type: "number", prefix: "", suffix: "", decimals: 0 };

    return {
        questionTemplate: templateText,
        questionRendered: renderedText,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: ['<', '>', '='],
        answer: symbol,
        hintTemplate: `Think about which number is bigger`,
        hintRendered: `Think about which number is bigger`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate ordering question
 */
function generateOrder(params, level, count, moduleId) {
    const numbers = generateUniqueNumbers(count, params.min_value, params.max_value);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);

    // Y1 only ascending, Y2+ can be either
    const allowDescending = params.allow_descending !== undefined ? params.allow_descending : true;
    const direction = allowDescending && Math.random() < 0.5 ? 'descending' : 'ascending';
    const answer = direction === 'ascending' ? sorted : sorted.reverse();

    // Create values object with numbered sequence
    const values = {};
    const valueMetadata = {};
    shuffled.forEach((num, idx) => {
        const key = `num${idx + 1}`;
        values[key] = num;
        valueMetadata[key] = { type: "number", prefix: "", suffix: "", decimals: 0 };
    });

    const templateParts = shuffled.map((_, idx) => `[num${idx + 1}]`);
    const renderedParts = shuffled.map(formatNumber);

    const directionText = direction === 'ascending' ? 'smallest to largest' : 'largest to smallest';

    return {
        questionTemplate: `Order these numbers from ${directionText}:\n${templateParts.join(', ')}`,
        questionRendered: `Order these numbers from ${directionText}:\n${renderedParts.join(', ')}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: answer.join(','),
        answers: answer.map(n => n.toString()),
        hintTemplate: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        hintRendered: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate complete statement (midpoint)
 */
function generateCompleteStatement(params, level, moduleId) {
    const num1 = randomInt(params.min_value, params.max_value - 20);
    // Ensure even difference for whole number midpoint
    const difference = Math.floor(randomInt(5, 10)) * 2; // 10, 12, 14, 16, 18, or 20
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    const values = { num1, num2 };
    const valueMetadata = {
        num1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        num2: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `What number is exactly halfway between [num1] and [num2]?`,
        questionRendered: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: midpoint,
        hintTemplate: `Find the number in the middle`,
        hintRendered: `Find the number in the middle`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate true/false comparison
 */
function generateTrueFalse(params, level, moduleId) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

    const symbol = randomChoice(['<', '>', '=']);
    const correctSymbol = getComparisonSymbol(num1, num2);
    const isTrue = symbol === correctSymbol;

    const values = { num1, num2 };
    const valueMetadata = {
        num1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        num2: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Is this statement true or false?\n[num1] ${symbol} [num2]`,
        questionRendered: `Is this statement true or false?\n${formatNumber(num1)} ${symbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: ['True', 'False'],
        answer: isTrue ? 'True' : 'False',
        hintTemplate: `Check if the symbol is correct`,
        hintRendered: `Check if the symbol is correct`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate "between" question
 */
function generateBetween(params, level, moduleId) {
    const num1 = randomInt(params.min_value, params.max_value - 10);
    const num2 = num1 + randomInt(5, 20);
    const between = randomInt(num1 + 1, num2 - 1);

    const values = { num1, num2 };
    const valueMetadata = {
        num1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        num2: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Give a number that is between [num1] and [num2]`,
        questionRendered: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: between,
        validRange: { min: num1, max: num2 },  // Accept any value in range
        hintTemplate: `Any number greater than [num1] and less than [num2]`,
        hintRendered: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate place value comparison
 */
function generatePlaceValueComparison(params, level, moduleId) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

    if (num1 === num2) {
        return generatePlaceValueComparison(params, level, moduleId);
    }

    // Available place values depend on max_value
    let availablePlaces = ['ones'];
    if (params.max_value >= 10) availablePlaces.push('tens');
    if (params.max_value >= 100) availablePlaces.push('hundreds');
    if (params.max_value >= 1000) availablePlaces.push('thousands');
    if (params.max_value >= 10000) availablePlaces.push('ten_thousands');
    if (params.max_value >= 100000) availablePlaces.push('hundred_thousands');
    if (params.max_value >= 1000000) availablePlaces.push('millions');
    if (params.max_value >= 10000000) availablePlaces.push('ten_millions');

    const place = randomChoice(availablePlaces);
    const val1 = getPlaceValue(num1, place);
    const val2 = getPlaceValue(num2, place);

    const values = { num1, num2, val1 };
    const valueMetadata = {
        num1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        num2: { type: "number", prefix: "", suffix: "", decimals: 0 },
        val1: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `In [num1], the ${place} digit represents [val1].\nIn [num2], what does the ${place} digit represent?`,
        questionRendered: `In ${formatNumber(num1)}, the ${place} digit represents ${val1}.\nIn ${formatNumber(num2)}, what does the ${place} digit represent?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: val2,
        hintTemplate: `Look at the ${place} place`,
        hintRendered: `Look at the ${place} place`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate place value digit question (Years 5-6)
 */
function generatePlaceValueDigit(params, level, moduleId) {
    const number = randomInt(params.min_value, params.max_value);

    // Available place values
    let availablePlaces = ['ones'];
    if (params.max_value >= 10) availablePlaces.push('tens');
    if (params.max_value >= 100) availablePlaces.push('hundreds');
    if (params.max_value >= 1000) availablePlaces.push('thousands');
    if (params.max_value >= 10000) availablePlaces.push('ten_thousands');
    if (params.max_value >= 100000) availablePlaces.push('hundred_thousands');
    if (params.max_value >= 1000000) availablePlaces.push('millions');
    if (params.max_value >= 10000000) availablePlaces.push('ten_millions');

    const place = randomChoice(availablePlaces);
    const value = getPlaceValue(number, place);

    const values = { number };
    const valueMetadata = {
        number: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `In [number], what does the ${place} digit represent?`,
        questionRendered: `In ${formatNumber(number)}, what does the ${place} digit represent?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: value,
        hintTemplate: `Look at the ${place} place`,
        hintRendered: `Look at the ${place} place`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate rounding question
 */
function generateRounding(params, level, base, moduleId) {
    const number = generateNonMultiple(params.min_value, params.max_value, base);
    const rounded = roundToNearest(number, base);

    const baseName = base === 10 ? 'ten' :
                     base === 100 ? 'hundred' :
                     base === 1000 ? 'thousand' :
                     base === 10000 ? 'ten thousand' :
                     base === 100000 ? 'hundred thousand' :
                     'million';

    const values = { number };
    const valueMetadata = {
        number: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Round [number] to the nearest ${baseName}`,
        questionRendered: `Round ${formatNumber(number)} to the nearest ${baseName}`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: rounded,
        hintTemplate: `Look at the digit after the ${baseName} place`,
        hintRendered: `Look at the digit after the ${baseName} place`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Generate complex more/less question
 */
function generateComplexMoreLess(params, level, moduleId) {
    const number = randomInt(params.min_value + 150, params.max_value - 150);
    const step1 = randomChoice([10, 100]);
    const step2 = randomChoice([10, 100]);
    const dir1 = randomChoice(['more', 'less']);
    const dir2 = randomChoice(['more', 'less']);

    let result = applyStep(number, step1, dir1);
    result = applyStep(result, step2, dir2);

    const values = { number, step1, step2 };
    const valueMetadata = {
        number: { type: "number", prefix: "", suffix: "", decimals: 0 },
        step1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        step2: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: `Start with [number]. What is [step1] ${dir1}, then [step2] ${dir2}?`,
        questionRendered: `Start with ${formatNumber(number)}. What is ${step1} ${dir1}, then ${step2} ${dir2}?`,
        type: 'text_input',
        values,
        valueMetadata,
        answer: result,
        hintTemplate: `Do one step at a time`,
        hintRendered: `Do one step at a time`,
        locale: 'en-GB',
        universal: true,
        module: moduleId,
        level: level
    };
}

/**
 * Factory function to create year-specific generator
 */
function createYearGenerator(moduleId) {
    return {
        moduleId: moduleId,
        generate: (params, level) => generateQuestion(params, level, moduleId)
    };
}

// Export individual year generators for registration
export const Y1_Generator = createYearGenerator('N02_Y1_NPV');
export const Y2_Generator = createYearGenerator('N02_Y2_NPV');
export const Y3_Generator = createYearGenerator('N02_Y3_NPV');
export const Y4_Generator = createYearGenerator('N02_Y4_NPV');
export const Y5_Generator = createYearGenerator('N02_Y5_NPV');
export const Y6_Generator = createYearGenerator('N02_Y6_NPV');

// Default export with all generators
export default {
    Y1: Y1_Generator,
    Y2: Y2_Generator,
    Y3: Y3_Generator,
    Y4: Y4_Generator,
    Y5: Y5_Generator,
    Y6: Y6_Generator
};
