/**
 * M01_Y1_MEAS: Compare, Describe and Order Measures (Year 1)
 *
 * Generates qualitative comparison questions for:
 * - Lengths and heights (long/short, taller/shorter)
 * - Mass/weight (heavy/light, heavier than/lighter than)
 * - Capacity and volume (full/empty, more than/less than)
 * - Time (quicker/slower, longer time/shorter time)
 *
 * Year 1 focus: Qualitative comparisons using comparative language,
 * not quantitative measurements. Questions use relatable objects and scenarios.
 */

const MEASURE_CONTEXTS = {
    length: {
        objects: [
            { name: 'pencil', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 2 },
            { name: 'ribbon', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 5 },
            { name: 'stick', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 4 },
            { name: 'rope', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 7 },
            { name: 'scarf', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 3 },
            { name: 'snake toy', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 6 },
            { name: 'crayon', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 1 },
            { name: 'belt', adjective: 'long', comparative: 'longer', superlative: 'longest', size: 4 }
        ],
        opposites: { long: 'short', longer: 'shorter', longest: 'shortest' },
        question_templates: [
            'Which is {comparative}?',
            'Which one is {comparative}?',
            'Find the {comparative} one.'
        ]
    },
    height: {
        objects: [
            { name: 'tower', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 6 },
            { name: 'plant', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 3 },
            { name: 'building', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 9 },
            { name: 'tree', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 8 },
            { name: 'sunflower', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 2 },
            { name: 'giraffe', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 7 },
            { name: 'toy', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 1 },
            { name: 'lamppost', adjective: 'tall', comparative: 'taller', superlative: 'tallest', size: 8 }
        ],
        opposites: { tall: 'short', taller: 'shorter', tallest: 'shortest' },
        question_templates: [
            'Which is {comparative}?',
            'Which one is {comparative}?',
            'Find the {comparative} one.'
        ]
    },
    mass: {
        objects: [
            { name: 'book', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 4 },
            { name: 'bag', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 6 },
            { name: 'box', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 7 },
            { name: 'ball', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 2 },
            { name: 'teddy bear', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 3 },
            { name: 'toy car', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 2 },
            { name: 'feather', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 1 },
            { name: 'brick', adjective: 'heavy', comparative: 'heavier', superlative: 'heaviest', size: 8 }
        ],
        opposites: { heavy: 'light', heavier: 'lighter', heaviest: 'lightest' },
        question_templates: [
            'Which is {comparative}?',
            'Which one is {comparative}?',
            'Find the {comparative} one.'
        ]
    },
    capacity: {
        objects: [
            { name: 'bottle', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 5 },
            { name: 'jug', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 7 },
            { name: 'cup', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 2 },
            { name: 'glass', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 3 },
            { name: 'bucket', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 9 },
            { name: 'bowl', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 4 },
            { name: 'spoon', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 1 },
            { name: 'bath', adjective: 'holds', comparative: 'holds more', superlative: 'holds most', size: 10 }
        ],
        opposites: { holds: 'holds', 'holds more': 'holds less', 'holds most': 'holds least' },
        question_templates: [
            'Which holds more?',
            'Which can hold more water?',
            'Which container holds more?'
        ]
    },
    time: {
        activities: [
            { name: 'running across the playground', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 2 },
            { name: 'walking to school', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 6 },
            { name: 'eating lunch', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 5 },
            { name: 'reading a book', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 7 },
            { name: 'building with blocks', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 4 },
            { name: 'drawing a picture', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 4 },
            { name: 'blinking', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 1 },
            { name: 'watching a film', adjective: 'quick', comparative: 'quicker', superlative: 'quickest', duration: 9 }
        ],
        opposites: { quick: 'slow', quicker: 'slower', quickest: 'slowest' },
        question_templates: [
            'Which takes longer?',
            'Which is {comparative}?',
            'Which takes more time?'
        ]
    }
};

/**
 * Randomly select an item from an array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle an array randomly
 */
function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Generate unique items from an array
 */
function selectUniqueItems(array, count) {
    const shuffled = shuffle(array);
    return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * OPERATION 1: Direct Comparison
 * Shows two objects and asks comparative question
 * Uses size/duration metadata to ensure correct answers
 */
function generateDirectComparison(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    if (measureType === 'time') {
        // Time comparisons use activities with duration metadata
        const activities = selectUniqueItems(context.activities, 2);
        const [activity1, activity2] = activities;

        // Determine correct answer based on duration
        const askLonger = Math.random() > 0.5;
        let correctAnswer, wrongAnswer;

        if (askLonger) {
            // Ask which takes longer (higher duration)
            correctAnswer = activity1.duration > activity2.duration ? activity1.name : activity2.name;
            wrongAnswer = correctAnswer === activity1.name ? activity2.name : activity1.name;
        } else {
            // Ask which is quicker (lower duration)
            correctAnswer = activity1.duration < activity2.duration ? activity1.name : activity2.name;
            wrongAnswer = correctAnswer === activity1.name ? activity2.name : activity1.name;
        }

        const questionText = askLonger
            ? `Which takes longer: ${activity1.name} or ${activity2.name}?`
            : `Which is quicker: ${activity1.name} or ${activity2.name}?`;

        return {
            text: questionText,
            type: 'multiple_choice',
            options: shuffle([correctAnswer, wrongAnswer]),
            answer: correctAnswer,
            module: 'M01_Y1_MEAS',
            level: level
        };
    }

    // For length, height, mass, capacity - use size metadata
    const objects = selectUniqueItems(context.objects, 2);
    const [obj1, obj2] = objects;

    // Determine which is "more" based on size metadata
    const askLarger = Math.random() > 0.5; // Ask for bigger or smaller
    let correctAnswer, wrongAnswer, comparative;

    if (askLarger) {
        // Ask for the larger one
        correctAnswer = obj1.size > obj2.size ? obj1.name : obj2.name;
        wrongAnswer = correctAnswer === obj1.name ? obj2.name : obj1.name;
        comparative = obj1.comparative;
    } else {
        // Ask for the smaller one
        correctAnswer = obj1.size < obj2.size ? obj1.name : obj2.name;
        wrongAnswer = correctAnswer === obj1.name ? obj2.name : obj1.name;
        comparative = context.opposites[obj1.comparative];
    }

    let questionText;
    if (measureType === 'capacity') {
        questionText = askLarger
            ? `Which holds more: a ${obj1.name} or a ${obj2.name}?`
            : `Which holds less: a ${obj1.name} or a ${obj2.name}?`;
    } else {
        questionText = `Which is ${comparative}: a ${obj1.name} or a ${obj2.name}?`;
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle([correctAnswer, wrongAnswer]),
        answer: correctAnswer,
        module: 'M01_Y1_MEAS',
        level: level
    };
}

/**
 * OPERATION 2: Complete Statement
 * Student selects the correct comparative word to complete a sentence
 * Uses size metadata to determine correct comparative
 */
function generateCompleteStatement(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    if (measureType === 'time') {
        const activities = selectUniqueItems(context.activities, 2);
        const [activity1, activity2] = activities;

        // Determine the correct comparative based on duration metadata
        let correctAnswer, opposite;
        if (activity1.duration > activity2.duration) {
            correctAnswer = 'longer';
            opposite = 'shorter';
        } else if (activity1.duration < activity2.duration) {
            correctAnswer = 'shorter';
            opposite = 'longer';
        } else {
            correctAnswer = 'the same';
            opposite = 'longer';
        }

        const questionText = `${activity1.name.charAt(0).toUpperCase() + activity1.name.slice(1)} takes a ___ time than ${activity2.name}.`;

        return {
            text: questionText,
            type: 'multiple_choice',
            options: shuffle([correctAnswer, opposite, 'the same']),
            answer: correctAnswer,
            module: 'M01_Y1_MEAS',
            level: level
        };
    }

    // For length, height, mass, capacity - use size metadata
    const objects = selectUniqueItems(context.objects, 2);
    const [obj1, obj2] = objects;

    // Determine correct comparative based on size comparison
    let correctAnswer, opposite;
    if (obj1.size > obj2.size) {
        correctAnswer = obj1.comparative;
        opposite = context.opposites[obj1.comparative];
    } else if (obj1.size < obj2.size) {
        correctAnswer = context.opposites[obj1.comparative];
        opposite = obj1.comparative;
    } else {
        correctAnswer = 'the same';
        opposite = obj1.comparative;
    }

    let questionText;
    if (measureType === 'capacity') {
        questionText = `A ${obj1.name} ___ than a ${obj2.name}.`;
        // Adjust answer format for capacity
        if (correctAnswer === obj1.comparative) {
            correctAnswer = 'holds more';
        } else if (correctAnswer === context.opposites[obj1.comparative]) {
            correctAnswer = 'holds less';
        }
        opposite = correctAnswer === 'holds more' ? 'holds less' : 'holds more';
    } else {
        questionText = `A ${obj1.name} is usually ___ than a ${obj2.name}.`;
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle([correctAnswer, opposite, 'the same']),
        answer: correctAnswer,
        module: 'M01_Y1_MEAS',
        level: level
    };
}

/**
 * OPERATION 3: Ordering
 * Shows 3-4 objects and asks to order them
 * Uses size/duration metadata to create correct ordering
 */
function generateOrdering(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    // Level 4 uses 4 objects, others use 3
    const objectCount = params.ordering_count || 3;

    if (measureType === 'time') {
        // For time, sort by duration metadata
        const activities = selectUniqueItems(context.activities, objectCount);

        // Determine ordering direction
        const askLongestFirst = Math.random() > 0.5;

        // Sort by duration
        const sorted = [...activities].sort((a, b) => a.duration - b.duration);
        const correctOrder = askLongestFirst ? sorted.reverse() : sorted;

        // Create labeled names for display
        const displayNames = activities.map((act, idx) => `${act.name} (${String.fromCharCode(65 + idx)})`);
        const correctAnswer = correctOrder.map(act => {
            const idx = activities.indexOf(act);
            return `${act.name} (${String.fromCharCode(65 + idx)})`;
        }).join(', ');

        // Create plausible wrong options
        const wrongOption1 = shuffle([...activities]).map(act => {
            const idx = activities.indexOf(act);
            return `${act.name} (${String.fromCharCode(65 + idx)})`;
        }).join(', ');
        const wrongOption2 = shuffle([...activities]).map(act => {
            const idx = activities.indexOf(act);
            return `${act.name} (${String.fromCharCode(65 + idx)})`;
        }).join(', ');

        return {
            text: `Put these in order from ${askLongestFirst ? 'longest' : 'shortest'} to ${askLongestFirst ? 'shortest' : 'longest'} time: ${displayNames.join(', ')}`,
            type: 'multiple_choice',
            options: shuffle([correctAnswer, wrongOption1, wrongOption2]),
            answer: correctAnswer,
            module: 'M01_Y1_MEAS',
            level: level
        };
    }

    // For length, height, mass, capacity - use size metadata
    const objects = selectUniqueItems(context.objects, objectCount);

    // Determine ordering direction
    const askLargestFirst = Math.random() > 0.5;

    // Sort by size
    const sorted = [...objects].sort((a, b) => a.size - b.size);
    const correctOrder = askLargestFirst ? sorted.reverse() : sorted;

    // Create labeled names for display
    const displayNames = objects.map((obj, idx) => `${obj.name} (${String.fromCharCode(65 + idx)})`);
    const correctAnswer = correctOrder.map(obj => {
        const idx = objects.indexOf(obj);
        return `${obj.name} (${String.fromCharCode(65 + idx)})`;
    }).join(', ');

    // Create plausible wrong options
    const wrongOption1 = shuffle([...objects]).map(obj => {
        const idx = objects.indexOf(obj);
        return `${obj.name} (${String.fromCharCode(65 + idx)})`;
    }).join(', ');
    const wrongOption2 = shuffle([...objects]).map(obj => {
        const idx = objects.indexOf(obj);
        return `${obj.name} (${String.fromCharCode(65 + idx)})`;
    }).join(', ');

    let orderText;
    if (measureType === 'capacity') {
        orderText = askLargestFirst ? 'holds most to holds least' : 'holds least to holds most';
    } else {
        const superlative = askLargestFirst ? objects[0].superlative : context.opposites[objects[0].superlative];
        const oppositeSuperlative = askLargestFirst ? context.opposites[objects[0].superlative] : objects[0].superlative;
        orderText = `${oppositeSuperlative} to ${superlative}`;
    }

    return {
        text: `Put these in order from ${orderText}: ${displayNames.join(', ')}`,
        type: 'multiple_choice',
        options: shuffle([correctAnswer, wrongOption1, wrongOption2]),
        answer: correctAnswer,
        module: 'M01_Y1_MEAS',
        level: level
    };
}

/**
 * OPERATION 4: Practical Problem
 * Real-world scenario requiring comparison thinking
 * Uses size/duration metadata to determine correct answer
 */
function generatePracticalProblem(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    const scenarios = {
        length: [
            {
                problem: 'I need the longest {object} to reach the ball. Which {object} should I use?',
                property: 'max'
            },
            {
                problem: 'I want the shortest {object} to wrap a small present. Which {object} should I use?',
                property: 'min'
            }
        ],
        height: [
            {
                problem: 'I need the tallest {object} to reach the top shelf. Which {object} should I use?',
                property: 'max'
            },
            {
                problem: 'I want the shorter {object} for the small space. Which {object} should I choose?',
                property: 'min'
            }
        ],
        mass: [
            {
                problem: 'I can only carry the lighter {object}. Which {object} should I take?',
                property: 'min'
            },
            {
                problem: 'I need the heaviest {object} to hold down the paper. Which {object} should I use?',
                property: 'max'
            }
        ],
        capacity: [
            {
                problem: 'I want to pour water into the {object} that holds the most. Which should I choose?',
                property: 'max'
            },
            {
                problem: 'I need a {object} that holds less water for my desk. Which one should I use?',
                property: 'min'
            }
        ],
        time: [
            {
                problem: 'I only have a short time before dinner. Which activity is quicker?',
                property: 'min'
            },
            {
                problem: 'I want to do something that takes a long time. Which activity should I choose?',
                property: 'max'
            }
        ]
    };

    const scenario = randomChoice(scenarios[measureType]);
    const items = selectUniqueItems(
        measureType === 'time' ? context.activities : context.objects,
        3
    );

    // Determine correct answer based on property needed (max/min size or duration)
    let correctAnswer;
    const sizeAttribute = measureType === 'time' ? 'duration' : 'size';

    if (scenario.property === 'max') {
        // Find item with largest size/duration
        correctAnswer = items.reduce((max, item) =>
            item[sizeAttribute] > max[sizeAttribute] ? item : max
        , items[0]);
    } else {
        // Find item with smallest size/duration
        correctAnswer = items.reduce((min, item) =>
            item[sizeAttribute] < min[sizeAttribute] ? item : min
        , items[0]);
    }

    const wrongOptions = items.filter(item => item !== correctAnswer);

    // Format question with actual object names
    let questionText = scenario.problem;
    if (measureType === 'time') {
        questionText = scenario.problem; // Time scenarios don't use {object} placeholder
    } else {
        // Use generic terms for each measure type
        const genericTerms = {
            length: 'item',
            height: 'object',
            mass: 'item',
            capacity: 'container'
        };
        const objectType = genericTerms[measureType] || 'item';
        questionText = scenario.problem.replace(/{object}/g, objectType);
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle([correctAnswer.name, ...wrongOptions.map(opt => opt.name)]),
        answer: correctAnswer.name,
        module: 'M01_Y1_MEAS',
        level: level
    };
}

/**
 * Main question generator
 * Selects operation based on params and generates appropriate question
 */
export function generateQuestion(params, level) {
    const operations = params.operations || ['direct_comparison'];
    const selectedOperation = randomChoice(operations);

    switch (selectedOperation) {
        case 'direct_comparison':
            return generateDirectComparison(params, level);
        case 'complete_statement':
            return generateCompleteStatement(params, level);
        case 'ordering':
            return generateOrdering(params, level);
        case 'practical_problem':
            return generatePracticalProblem(params, level);
        default:
            return generateDirectComparison(params, level);
    }
}

// Export MEASURE_CONTEXTS for reuse in Y2 module
export { MEASURE_CONTEXTS };

export default {
    moduleId: 'M01_Y1_MEAS',
    generate: generateQuestion
};
