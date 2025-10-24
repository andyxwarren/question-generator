/**
 * M01_Y1_MEAS: Measurement - Compare, Describe and Order Measures
 * Year 1: Compare, describe and solve practical problems for lengths/heights, mass/weight, capacity/volume, time
 *
 * This generator creates questions that help Year 1 students develop comparative measurement vocabulary
 * and understand measurement concepts through described scenarios (adapted for digital delivery).
 *
 * Note: Year 1 students don't work with formal units yet, so questions focus on comparative language
 * with scenarios that establish clear relationships.
 */

import { randomChoice, randomInt, shuffle } from './helpers/M01_measurementHelpers.js';

/**
 * Scenarios with inherent size/measurement relationships
 * Expanded pool to reduce repetition when generating multiple questions
 */
const COMPARISON_SCENARIOS = {
    length: [
        { shorter: 'pencil', longer: 'ruler', property: 'long' },
        { shorter: 'eraser', longer: 'pencil', property: 'long' },
        { shorter: 'book', longer: 'table', property: 'long' },
        { shorter: 'hand', longer: 'arm', property: 'long' },
        { shorter: 'finger', longer: 'hand', property: 'long' },
        { shorter: 'crayon', longer: 'ribbon', property: 'long' },
        { shorter: 'spoon', longer: 'broom', property: 'long' },
        { shorter: 'shoe', longer: 'bed', property: 'long' },
        { shorter: 'button', longer: 'scarf', property: 'long' },
        { shorter: 'grape', longer: 'banana', property: 'long' },
        { shorter: 'nail', longer: 'stick', property: 'long' },
        { shorter: 'stamp', longer: 'envelope', property: 'long' },
        { shorter: 'leaf', longer: 'branch', property: 'long' },
        { shorter: 'coin', longer: 'phone', property: 'long' },
        { shorter: 'key', longer: 'rope', property: 'long' },
        { shorter: 'marble', longer: 'ball', property: 'long' },
        { shorter: 'pebble', longer: 'brick', property: 'long' },
        { shorter: 'sticker', longer: 'poster', property: 'long' }
    ],
    height: [
        { shorter: 'chair', longer: 'door', property: 'tall' },
        { shorter: 'book', longer: 'bookshelf', property: 'tall' },
        { shorter: 'cup', longer: 'bottle', property: 'tall' },
        { shorter: 'flower', longer: 'tree', property: 'tall' },
        { shorter: 'toy car', longer: 'toy bus', property: 'tall' },
        { shorter: 'stool', longer: 'table', property: 'tall' },
        { shorter: 'box', longer: 'wardrobe', property: 'tall' },
        { shorter: 'teddy bear', longer: 'person', property: 'tall' },
        { shorter: 'candle', longer: 'lamp post', property: 'tall' },
        { shorter: 'mug', longer: 'vase', property: 'tall' },
        { shorter: 'building block', longer: 'tower of blocks', property: 'tall' },
        { shorter: 'glass', longer: 'jug', property: 'tall' },
        { shorter: 'plant pot', longer: 'plant', property: 'tall' },
        { shorter: 'pencil case', longer: 'backpack', property: 'tall' },
        { shorter: 'toy robot', longer: 'toy house', property: 'tall' },
        { shorter: 'tin can', longer: 'cereal box', property: 'tall' }
    ],
    mass: [
        { lighter: 'feather', heavier: 'book', property: 'heavy' },
        { lighter: 'paper', heavier: 'stone', property: 'heavy' },
        { lighter: 'balloon', heavier: 'apple', property: 'heavy' },
        { lighter: 'pencil', heavier: 'bag of rice', property: 'heavy' },
        { lighter: 'leaf', heavier: 'toy car', property: 'heavy' },
        { lighter: 'cotton ball', heavier: 'orange', property: 'heavy' },
        { lighter: 'tissue', heavier: 'toy brick', property: 'heavy' },
        { lighter: 'straw', heavier: 'cup', property: 'heavy' },
        { lighter: 'button', heavier: 'scissors', property: 'heavy' },
        { lighter: 'crisp', heavier: 'sandwich', property: 'heavy' },
        { lighter: 'envelope', heavier: 'tablet', property: 'heavy' },
        { lighter: 'sock', heavier: 'shoe', property: 'heavy' },
        { lighter: 'postcard', heavier: 'magazine', property: 'heavy' },
        { lighter: 'grape', heavier: 'melon', property: 'heavy' },
        { lighter: 'plastic spoon', heavier: 'metal spoon', property: 'heavy' },
        { lighter: 'ribbon', heavier: 'belt', property: 'heavy' },
        { lighter: 'sticker', heavier: 'book', property: 'heavy' }
    ],
    capacity: [
        { less: 'cup', more: 'jug', property: 'holds' },
        { less: 'spoon', more: 'bowl', property: 'holds' },
        { less: 'glass', more: 'bottle', property: 'holds' },
        { less: 'teacup', more: 'bucket', property: 'holds' },
        { less: 'egg cup', more: 'mug', property: 'holds' },
        { less: 'thimble', more: 'cup', property: 'holds' },
        { less: 'bottle cap', more: 'jar', property: 'holds' },
        { less: 'shot glass', more: 'water bottle', property: 'holds' },
        { less: 'small pot', more: 'large pot', property: 'holds' },
        { less: 'pudding bowl', more: 'mixing bowl', property: 'holds' },
        { less: 'yoghurt pot', more: 'soup bowl', property: 'holds' },
        { less: 'medicine cup', more: 'drinking glass', property: 'holds' },
        { less: 'tiny vase', more: 'big vase', property: 'holds' },
        { less: 'toy tea set cup', more: 'real cup', property: 'holds' },
        { less: 'salt shaker', more: 'cereal bowl', property: 'holds' }
    ],
    time: [
        { quicker: 'clapping hands', slower: 'eating lunch', property: 'time' },
        { quicker: 'blinking', slower: 'counting to 10', property: 'time' },
        { quicker: 'jumping once', slower: 'reading a book', property: 'time' },
        { quicker: 'saying your name', slower: 'brushing teeth', property: 'time' },
        { quicker: 'snapping fingers', slower: 'putting on shoes', property: 'time' },
        { quicker: 'waving', slower: 'washing hands', property: 'time' },
        { quicker: 'clapping twice', slower: 'singing a song', property: 'time' },
        { quicker: 'nodding', slower: 'drawing a picture', property: 'time' },
        { quicker: 'saying hello', slower: 'getting dressed', property: 'time' },
        { quicker: 'turning around', slower: 'having a bath', property: 'time' },
        { quicker: 'touching your nose', slower: 'tidying up toys', property: 'time' },
        { quicker: 'stamping your foot', slower: 'making your bed', property: 'time' },
        { quicker: 'closing a door', slower: 'walking to school', property: 'time' },
        { quicker: 'picking up a pencil', slower: 'eating breakfast', property: 'time' }
    ]
};

/**
 * Build a pool of all possible questions for the given parameters and level
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Array} Array of question objects
 */
function buildQuestionPool(params, level) {
    const pool = [];
    const operations = params.operations;
    const measureTypes = params.measure_types;

    // For each operation type
    operations.forEach(operation => {
        // For each measure type
        measureTypes.forEach(measureType => {
            const scenarios = COMPARISON_SCENARIOS[measureType];

            // For each scenario
            scenarios.forEach(scenario => {
                // Generate question variations based on operation type
                if (operation === 'compare_two') {
                    pool.push(...generateCompareTwoVariations(scenario, measureType, level));
                } else if (operation === 'complete_comparative') {
                    pool.push(generateCompleteComparativeFromScenario(scenario, measureType, level));
                } else if (operation === 'identify_more_less') {
                    pool.push(...generateIdentifyMoreLessVariations(scenario, measureType, level));
                }
            });
        });
    });

    return pool;
}

/**
 * Generate a comparison question for Year 1 measurement
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    // Build complete pool and select randomly (for single question generation)
    const pool = buildQuestionPool(params, level);

    if (pool.length === 0) {
        // Fallback to old method if pool is empty
        const operations = params.operations;
        const operation = randomChoice(operations);

        switch (operation) {
            case 'compare_two':
                return generateCompareTwoQuestion(params, level);
            case 'complete_comparative':
                return generateCompleteComparativeQuestion(params, level);
            case 'identify_more_less':
                return generateIdentifyMoreLessQuestion(params, level);
            default:
                return generateCompareTwoQuestion(params, level);
        }
    }

    return randomChoice(pool);
}

/**
 * Generate all "compare two" question variations from a scenario
 */
function generateCompareTwoVariations(scenario, measureType, level) {
    const variations = [];

    switch (measureType) {
        case 'length':
            variations.push({
                text: `Which is longer: a ${scenario.shorter} or a ${scenario.longer}?`,
                type: 'multiple_choice',
                answer: scenario.longer,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `Which is shorter: a ${scenario.shorter} or a ${scenario.longer}?`,
                type: 'multiple_choice',
                answer: scenario.shorter,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'height':
            variations.push({
                text: `Which is taller: a ${scenario.shorter} or a ${scenario.longer}?`,
                type: 'multiple_choice',
                answer: scenario.longer,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `Which is shorter: a ${scenario.shorter} or a ${scenario.longer}?`,
                type: 'multiple_choice',
                answer: scenario.shorter,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'mass':
            variations.push({
                text: `Which is heavier: a ${scenario.lighter} or a ${scenario.heavier}?`,
                type: 'multiple_choice',
                answer: scenario.heavier,
                options: [scenario.lighter, scenario.heavier],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `Which is lighter: a ${scenario.lighter} or a ${scenario.heavier}?`,
                type: 'multiple_choice',
                answer: scenario.lighter,
                options: [scenario.lighter, scenario.heavier],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'capacity':
            variations.push({
                text: `Which holds more: a ${scenario.less} or a ${scenario.more}?`,
                type: 'multiple_choice',
                answer: scenario.more,
                options: [scenario.less, scenario.more],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `Which holds less: a ${scenario.less} or a ${scenario.more}?`,
                type: 'multiple_choice',
                answer: scenario.less,
                options: [scenario.less, scenario.more],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'time':
            variations.push({
                text: `Which takes longer: ${scenario.quicker} or ${scenario.slower}?`,
                type: 'multiple_choice',
                answer: scenario.slower,
                options: [scenario.quicker, scenario.slower],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `Which is quicker: ${scenario.quicker} or ${scenario.slower}?`,
                type: 'multiple_choice',
                answer: scenario.quicker,
                options: [scenario.quicker, scenario.slower],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;
    }

    return variations;
}

/**
 * Generate "complete comparative" question from a scenario
 */
function generateCompleteComparativeFromScenario(scenario, measureType, level) {
    let questionText, correctAnswer, options;

    switch (measureType) {
        case 'length':
            questionText = `A ${scenario.longer} is _____ than a ${scenario.shorter}.`;
            correctAnswer = 'longer';
            options = ['longer', 'shorter', 'taller'];
            break;

        case 'height':
            questionText = `A ${scenario.longer} is _____ than a ${scenario.shorter}.`;
            correctAnswer = 'taller';
            options = ['taller', 'shorter', 'longer'];
            break;

        case 'mass':
            questionText = `A ${scenario.heavier} is _____ than a ${scenario.lighter}.`;
            correctAnswer = 'heavier';
            options = ['heavier', 'lighter', 'bigger'];
            break;

        case 'capacity':
            questionText = `A ${scenario.more} holds _____ than a ${scenario.less}.`;
            correctAnswer = 'more';
            options = ['more', 'less', 'bigger'];
            break;

        case 'time':
            questionText = `${scenario.slower} takes _____ than ${scenario.quicker}.`;
            correctAnswer = 'longer';
            options = ['longer', 'shorter', 'more'];
            break;
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        hint: 'Think about which one has more of the property.',
        module: 'M01_Y1_MEAS',
        level: level
    };
}

/**
 * Generate all "identify more/less" question variations from a scenario
 */
function generateIdentifyMoreLessVariations(scenario, measureType, level) {
    const variations = [];

    switch (measureType) {
        case 'length':
            variations.push({
                text: `A ${scenario.longer} is longer than a ${scenario.shorter}. Which is longer?`,
                type: 'multiple_choice',
                answer: scenario.longer,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `A ${scenario.shorter} is shorter than a ${scenario.longer}. Which is shorter?`,
                type: 'multiple_choice',
                answer: scenario.shorter,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'height':
            variations.push({
                text: `A ${scenario.longer} is taller than a ${scenario.shorter}. Which is taller?`,
                type: 'multiple_choice',
                answer: scenario.longer,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `A ${scenario.shorter} is shorter than a ${scenario.longer}. Which is shorter?`,
                type: 'multiple_choice',
                answer: scenario.shorter,
                options: [scenario.shorter, scenario.longer],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'mass':
            variations.push({
                text: `A ${scenario.heavier} is heavier than a ${scenario.lighter}. Which is heavier?`,
                type: 'multiple_choice',
                answer: scenario.heavier,
                options: [scenario.lighter, scenario.heavier],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `A ${scenario.lighter} is lighter than a ${scenario.heavier}. Which is lighter?`,
                type: 'multiple_choice',
                answer: scenario.lighter,
                options: [scenario.lighter, scenario.heavier],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'capacity':
            variations.push({
                text: `A ${scenario.more} holds more than a ${scenario.less}. Which holds more?`,
                type: 'multiple_choice',
                answer: scenario.more,
                options: [scenario.less, scenario.more],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `A ${scenario.less} holds less than a ${scenario.more}. Which holds less?`,
                type: 'multiple_choice',
                answer: scenario.less,
                options: [scenario.less, scenario.more],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;

        case 'time':
            variations.push({
                text: `${scenario.slower} takes longer than ${scenario.quicker}. Which takes longer?`,
                type: 'multiple_choice',
                answer: scenario.slower,
                options: [scenario.quicker, scenario.slower],
                module: 'M01_Y1_MEAS',
                level: level
            });
            variations.push({
                text: `${scenario.quicker} takes less time than ${scenario.slower}. Which takes less time?`,
                type: 'multiple_choice',
                answer: scenario.quicker,
                options: [scenario.quicker, scenario.slower],
                module: 'M01_Y1_MEAS',
                level: level
            });
            break;
    }

    return variations;
}

/**
 * Generate a question asking which of two things has more/less of a property
 * (Legacy function - kept for compatibility)
 */
function generateCompareTwoQuestion(params, level) {
    const measureTypes = params.measure_types;
    const measureType = randomChoice(measureTypes);
    const scenarios = COMPARISON_SCENARIOS[measureType];
    const scenario = randomChoice(scenarios);

    let questionText, correctAnswer, options;

    switch (measureType) {
        case 'length':
            if (Math.random() < 0.5) {
                questionText = `Which is longer: a ${scenario.shorter} or a ${scenario.longer}?`;
                correctAnswer = scenario.longer;
            } else {
                questionText = `Which is shorter: a ${scenario.shorter} or a ${scenario.longer}?`;
                correctAnswer = scenario.shorter;
            }
            options = [scenario.shorter, scenario.longer];
            break;

        case 'height':
            if (Math.random() < 0.5) {
                questionText = `Which is taller: a ${scenario.shorter} or a ${scenario.longer}?`;
                correctAnswer = scenario.longer;
            } else {
                questionText = `Which is shorter: a ${scenario.shorter} or a ${scenario.longer}?`;
                correctAnswer = scenario.shorter;
            }
            options = [scenario.shorter, scenario.longer];
            break;

        case 'mass':
            if (Math.random() < 0.5) {
                questionText = `Which is heavier: a ${scenario.lighter} or a ${scenario.heavier}?`;
                correctAnswer = scenario.heavier;
            } else {
                questionText = `Which is lighter: a ${scenario.lighter} or a ${scenario.heavier}?`;
                correctAnswer = scenario.lighter;
            }
            options = [scenario.lighter, scenario.heavier];
            break;

        case 'capacity':
            if (Math.random() < 0.5) {
                questionText = `Which holds more: a ${scenario.less} or a ${scenario.more}?`;
                correctAnswer = scenario.more;
            } else {
                questionText = `Which holds less: a ${scenario.less} or a ${scenario.more}?`;
                correctAnswer = scenario.less;
            }
            options = [scenario.less, scenario.more];
            break;

        case 'time':
            if (Math.random() < 0.5) {
                questionText = `Which takes longer: ${scenario.quicker} or ${scenario.slower}?`;
                correctAnswer = scenario.slower;
            } else {
                questionText = `Which is quicker: ${scenario.quicker} or ${scenario.slower}?`;
                correctAnswer = scenario.quicker;
            }
            options = [scenario.quicker, scenario.slower];
            break;
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        module: 'M01_Y1_MEAS',
        level: level
    };
}

/**
 * Generate a question asking student to complete a comparative sentence
 */
function generateCompleteComparativeQuestion(params, level) {
    const measureTypes = params.measure_types;
    const measureType = randomChoice(measureTypes);
    const scenarios = COMPARISON_SCENARIOS[measureType];
    const scenario = randomChoice(scenarios);

    let questionText, correctAnswer, options;

    switch (measureType) {
        case 'length':
            questionText = `A ${scenario.longer} is _____ than a ${scenario.shorter}.`;
            correctAnswer = 'longer';
            options = ['longer', 'shorter', 'taller'];
            break;

        case 'height':
            questionText = `A ${scenario.longer} is _____ than a ${scenario.shorter}.`;
            correctAnswer = 'taller';
            options = ['taller', 'shorter', 'longer'];
            break;

        case 'mass':
            questionText = `A ${scenario.heavier} is _____ than a ${scenario.lighter}.`;
            correctAnswer = 'heavier';
            options = ['heavier', 'lighter', 'bigger'];
            break;

        case 'capacity':
            questionText = `A ${scenario.more} holds _____ than a ${scenario.less}.`;
            correctAnswer = 'more';
            options = ['more', 'less', 'bigger'];
            break;

        case 'time':
            questionText = `${scenario.slower} takes _____ than ${scenario.quicker}.`;
            correctAnswer = 'longer';
            options = ['longer', 'shorter', 'more'];
            break;
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        hint: 'Think about which one has more of the property.',
        module: 'M01_Y1_MEAS',
        level: level
    };
}

/**
 * Generate a question asking which object has more/less of a property given a description
 */
function generateIdentifyMoreLessQuestion(params, level) {
    const measureTypes = params.measure_types;
    const measureType = randomChoice(measureTypes);
    const scenarios = COMPARISON_SCENARIOS[measureType];
    const scenario = randomChoice(scenarios);

    let questionText, correctAnswer, options;

    switch (measureType) {
        case 'length':
            const lengthComparative = randomChoice(['longer', 'shorter']);
            if (lengthComparative === 'longer') {
                questionText = `A ${scenario.longer} is longer than a ${scenario.shorter}. Which is longer?`;
                correctAnswer = scenario.longer;
            } else {
                questionText = `A ${scenario.shorter} is shorter than a ${scenario.longer}. Which is shorter?`;
                correctAnswer = scenario.shorter;
            }
            options = [scenario.shorter, scenario.longer];
            break;

        case 'height':
            const heightComparative = randomChoice(['taller', 'shorter']);
            if (heightComparative === 'taller') {
                questionText = `A ${scenario.longer} is taller than a ${scenario.shorter}. Which is taller?`;
                correctAnswer = scenario.longer;
            } else {
                questionText = `A ${scenario.shorter} is shorter than a ${scenario.longer}. Which is shorter?`;
                correctAnswer = scenario.shorter;
            }
            options = [scenario.shorter, scenario.longer];
            break;

        case 'mass':
            const massComparative = randomChoice(['heavier', 'lighter']);
            if (massComparative === 'heavier') {
                questionText = `A ${scenario.heavier} is heavier than a ${scenario.lighter}. Which is heavier?`;
                correctAnswer = scenario.heavier;
            } else {
                questionText = `A ${scenario.lighter} is lighter than a ${scenario.heavier}. Which is lighter?`;
                correctAnswer = scenario.lighter;
            }
            options = [scenario.lighter, scenario.heavier];
            break;

        case 'capacity':
            const capacityComparative = randomChoice(['more', 'less']);
            if (capacityComparative === 'more') {
                questionText = `A ${scenario.more} holds more than a ${scenario.less}. Which holds more?`;
                correctAnswer = scenario.more;
            } else {
                questionText = `A ${scenario.less} holds less than a ${scenario.more}. Which holds less?`;
                correctAnswer = scenario.less;
            }
            options = [scenario.less, scenario.more];
            break;

        case 'time':
            const timeComparative = randomChoice(['longer', 'less time']);
            if (timeComparative === 'longer') {
                questionText = `${scenario.slower} takes longer than ${scenario.quicker}. Which takes longer?`;
                correctAnswer = scenario.slower;
            } else {
                questionText = `${scenario.quicker} takes less time than ${scenario.slower}. Which takes less time?`;
                correctAnswer = scenario.quicker;
            }
            options = [scenario.quicker, scenario.slower];
            break;
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: options,
        module: 'M01_Y1_MEAS',
        level: level
    };
}

export default {
    moduleId: 'M01_Y1_MEAS',
    generate: generateQuestion
};
