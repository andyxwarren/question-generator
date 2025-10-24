/**
 * M01_Y2_MEAS: Compare and Order Using Symbols (Year 2)
 *
 * Generates questions for comparing and ordering measurements using mathematical symbols:
 * - > (greater than)
 * - < (less than)
 * - = (equal to)
 *
 * Year 2 focus: Recording comparisons using symbols (progressing from Year 1's qualitative language).
 * Covers lengths, mass, volume/capacity, and time.
 *
 * Progression:
 * - Level 1: Symbol recognition (match symbol to verbal comparison)
 * - Level 2: Symbol selection (choose correct symbol for comparison)
 * - Level 3: Ordering with symbols, chain comparisons
 * - Level 4: Complex orderings, error identification
 */

// Import object contexts from Year 1 module for consistency
import { MEASURE_CONTEXTS } from './M01_Y1_MEAS_comparison.js';

/**
 * Helper: Randomly select an item from an array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle an array randomly
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
 * Helper: Select unique items from an array
 */
function selectUniqueItems(array, count) {
    const shuffled = shuffle(array);
    return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Helper: Get comparison count (handles single value or array)
 */
function getComparisonCount(params) {
    if (Array.isArray(params.comparison_count)) {
        return randomChoice(params.comparison_count);
    }
    return params.comparison_count;
}

/**
 * Helper: Format object name with visual cue (for Level 2)
 */
function formatWithVisualCue(object, measureType, context) {
    if (!object) return '';

    // Determine if object is relatively large or small based on size metadata
    const avgSize = measureType === 'time'
        ? 5  // Average duration
        : 5;  // Average size

    let cue;
    if (measureType === 'time') {
        cue = object.duration > avgSize ? 'takes longer' : 'is quicker';
    } else if (measureType === 'capacity') {
        cue = object.size > avgSize ? 'holds more' : 'holds less';
    } else {
        // For length, height, mass
        cue = object.size > avgSize ? object.comparative : context.opposites[object.comparative];
    }

    return `${object.name} (${cue})`;
}

/**
 * OPERATION 1: Symbol Recognition (Levels 1-2)
 * Present a verbal comparison and ask student to select correct symbol
 */
function generateSymbolRecognition(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    if (measureType === 'time') {
        // Time comparisons
        const items = selectUniqueItems(context.activities, 2);
        const [item1, item2] = items;

        // Determine comparison
        let statement, correctSymbol;
        if (item1.duration > item2.duration) {
            statement = `${item1.name.charAt(0).toUpperCase() + item1.name.slice(1)} takes a longer time than ${item2.name}`;
            correctSymbol = '>';
        } else if (item1.duration < item2.duration) {
            statement = `${item1.name.charAt(0).toUpperCase() + item1.name.slice(1)} takes a shorter time than ${item2.name}`;
            correctSymbol = '<';
        } else {
            // Equal (only at Level 2+)
            statement = `${item1.name.charAt(0).toUpperCase() + item1.name.slice(1)} takes the same time as ${item2.name}`;
            correctSymbol = '=';
        }

        return {
            text: `${statement}. Which symbol shows this?`,
            type: 'multiple_choice',
            options: shuffle(params.symbols),
            answer: correctSymbol,
            module: 'M01_Y2_MEAS',
            level: level
        };
    }

    // For length, height, mass, capacity
    const items = selectUniqueItems(context.objects, 2);
    const [item1, item2] = items;

    let statement, correctSymbol;
    if (item1.size > item2.size) {
        if (measureType === 'capacity') {
            statement = `A ${item1.name} holds more than a ${item2.name}`;
        } else {
            statement = `A ${item1.name} is ${item1.comparative} than a ${item2.name}`;
        }
        correctSymbol = '>';
    } else if (item1.size < item2.size) {
        if (measureType === 'capacity') {
            statement = `A ${item1.name} holds less than a ${item2.name}`;
        } else {
            const oppositeComp = context.opposites[item1.comparative];
            statement = `A ${item1.name} is ${oppositeComp} than a ${item2.name}`;
        }
        correctSymbol = '<';
    } else {
        // Equal (only at Level 2+)
        if (measureType === 'capacity') {
            statement = `A ${item1.name} holds the same as a ${item2.name}`;
        } else {
            statement = `A ${item1.name} is the same ${measureType} as a ${item2.name}`;
        }
        correctSymbol = '=';
    }

    return {
        text: `${statement}. Which symbol is correct?`,
        type: 'multiple_choice',
        options: shuffle(params.symbols),
        answer: correctSymbol,
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * OPERATION 2: Symbol Selection (Levels 2-3)
 * Present two objects and ask student to select symbol to complete comparison
 */
function generateSymbolSelection(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    if (measureType === 'time') {
        const items = selectUniqueItems(context.activities, 2);
        const [item1, item2] = items;

        let correctSymbol;
        if (item1.duration > item2.duration) correctSymbol = '>';
        else if (item1.duration < item2.duration) correctSymbol = '<';
        else correctSymbol = '=';

        // Format with or without visual cues
        let questionText;
        if (params.visual_cues) {
            const cue1 = item1.duration > 5 ? 'takes longer' : 'is quicker';
            const cue2 = item2.duration > 5 ? 'takes longer' : 'is quicker';
            questionText = `Compare: ${item1.name} (${cue1}) and ${item2.name} (${cue2}). Complete: ${item1.name} ___ ${item2.name}`;
        } else {
            questionText = `Complete the comparison: ${item1.name} ___ ${item2.name}`;
        }

        return {
            text: questionText,
            type: 'multiple_choice',
            options: shuffle(params.symbols),
            answer: correctSymbol,
            hint: params.visual_cues ? undefined : 'Think about which activity takes longer.',
            module: 'M01_Y2_MEAS',
            level: level
        };
    }

    // For length, height, mass, capacity
    const items = selectUniqueItems(context.objects, 2);
    const [item1, item2] = items;

    let correctSymbol;
    if (item1.size > item2.size) correctSymbol = '>';
    else if (item1.size < item2.size) correctSymbol = '<';
    else correctSymbol = '=';

    let questionText;
    if (params.visual_cues) {
        const formatted1 = formatWithVisualCue(item1, measureType, context);
        const formatted2 = formatWithVisualCue(item2, measureType, context);
        questionText = `Compare: ${formatted1} and ${formatted2}. Complete: ${item1.name} ___ ${item2.name}`;
    } else {
        const article1 = ['a', 'e', 'i', 'o', 'u'].includes(item1.name[0].toLowerCase()) ? 'an' : 'a';
        const article2 = ['a', 'e', 'i', 'o', 'u'].includes(item2.name[0].toLowerCase()) ? 'an' : 'a';

        if (measureType === 'capacity') {
            questionText = `Which holds more? Complete: ${item1.name} ___ ${item2.name}`;
        } else {
            questionText = `Compare ${article1} ${item1.name} and ${article2} ${item2.name}. Complete: ${item1.name} ___ ${item2.name}`;
        }
    }

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle(params.symbols),
        answer: correctSymbol,
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * OPERATION 3: Ordering with Symbols (Levels 3-4)
 * Order 3-4 objects and record using symbols
 */
function generateOrdering(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    const objectCount = getComparisonCount(params);
    const isTimeMeasure = measureType === 'time';
    const items = selectUniqueItems(
        isTimeMeasure ? context.activities : context.objects,
        objectCount
    );

    // Determine ordering direction
    const askLargestFirst = Math.random() > 0.5;
    const symbol = askLargestFirst ? '>' : '<';

    // Sort by size/duration
    const sizeAttr = isTimeMeasure ? 'duration' : 'size';
    const sorted = [...items].sort((a, b) => a[sizeAttr] - b[sizeAttr]);
    const orderedItems = askLargestFirst ? sorted.reverse() : sorted;

    // Generate correct answer
    const correctAnswer = orderedItems.map(item => item.name).join(` ${symbol} `);

    // Generate plausible wrong options for multiple choice
    const wrongOption1 = shuffle([...items]).map(item => item.name).join(` ${symbol} `);
    const wrongOption2 = shuffle([...items]).map(item => item.name).join(` ${symbol} `);

    // Determine ordering direction text
    let directionText;
    if (isTimeMeasure) {
        directionText = askLargestFirst ? 'longest time to shortest time' : 'shortest time to longest time';
    } else if (measureType === 'capacity') {
        directionText = askLargestFirst ? 'holds most to holds least' : 'holds least to holds most';
    } else {
        const superlative = items[0].superlative;
        const oppSuperlative = context.opposites[superlative];
        directionText = askLargestFirst
            ? `${superlative} to ${oppSuperlative}`
            : `${oppSuperlative} to ${superlative}`;
    }

    // List items
    const itemNames = items.map(item => item.name).join(', ');

    // IMPORTANT: Specify symbol to use (prevents mixed symbols like "A > B < C")
    const questionText = `Order these from ${directionText} using the ${symbol} symbol: ${itemNames}`;

    // For Level 3-4: Mix of multiple choice and text input
    if (level >= 3 && Math.random() > 0.5) {
        // Text input version
        return {
            text: questionText,
            type: 'text_input',
            answer: correctAnswer,
            hint: `Use the ${symbol} symbol between each item.`,
            module: 'M01_Y2_MEAS',
            level: level
        };
    } else {
        // Multiple choice version
        return {
            text: questionText,
            type: 'multiple_choice',
            options: shuffle([correctAnswer, wrongOption1, wrongOption2]),
            answer: correctAnswer,
            module: 'M01_Y2_MEAS',
            level: level
        };
    }
}

/**
 * OPERATION 4: Chain/Transitive Comparisons (Levels 3-4)
 * Apply transitive reasoning with comparison symbols
 */
function generateChainComparison(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    const isTimeMeasure = measureType === 'time';
    const items = selectUniqueItems(
        isTimeMeasure ? context.activities : context.objects,
        3
    );

    // Sort by size/duration to ensure logical consistency
    const sizeAttr = isTimeMeasure ? 'duration' : 'size';
    const [small, medium, large] = items.sort((a, b) => a[sizeAttr] - b[sizeAttr]);

    // Determine if we include '=' in the chain (Level 4 only)
    const includeEquals = level >= 4 && params.symbols.includes('=') && Math.random() > 0.5;

    let statement1, statement2, correctSymbol;

    if (includeEquals) {
        // One statement uses '='
        if (Math.random() > 0.5) {
            // large = medium (hypothetically), medium > small
            statement1 = `${large.name} is the same ${measureType} as ${medium.name}`;
            statement2 = `${medium.name} is ${medium.comparative} than ${small.name}`;
            correctSymbol = '>';
        } else {
            // large > medium, medium = small (hypothetically)
            statement1 = `${large.name} is ${large.comparative} than ${medium.name}`;
            statement2 = `${medium.name} is the same ${measureType} as ${small.name}`;
            correctSymbol = '>';
        }
    } else {
        // Standard transitive: large > medium > small
        if (measureType === 'capacity') {
            statement1 = `A ${large.name} holds more than a ${medium.name}`;
            statement2 = `A ${medium.name} holds more than a ${small.name}`;
        } else if (isTimeMeasure) {
            statement1 = `${large.name.charAt(0).toUpperCase() + large.name.slice(1)} takes longer than ${medium.name}`;
            statement2 = `${medium.name.charAt(0).toUpperCase() + medium.name.slice(1)} takes longer than ${small.name}`;
        } else {
            statement1 = `A ${large.name} is ${large.comparative} than a ${medium.name}`;
            statement2 = `A ${medium.name} is ${medium.comparative} than a ${small.name}`;
        }
        correctSymbol = '>';
    }

    const questionText = `${statement1}. ${statement2}. Complete: ${large.name} ___ ${small.name}`;

    return {
        text: questionText,
        type: 'multiple_choice',
        options: shuffle(params.symbols),
        answer: correctSymbol,
        hint: level === 3 ? 'Think about the order of all three items.' : undefined,
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * OPERATION 5: Error Identification (Level 4 only)
 * Find the incorrect symbol usage among multiple statements
 */
function generateErrorIdentification(params, level) {
    const measureType = randomChoice(params.measure_types);
    const context = MEASURE_CONTEXTS[measureType];

    const isTimeMeasure = measureType === 'time';
    const items = selectUniqueItems(
        isTimeMeasure ? context.activities : context.objects,
        2
    );

    const [item1, item2] = items;
    const sizeAttr = isTimeMeasure ? 'duration' : 'size';

    // Generate 2 correct statements and 1 incorrect
    let statements = [];

    // Correct statement 1: Comparison based on actual sizes
    let correct1, correct2, incorrect;

    if (item1[sizeAttr] > item2[sizeAttr]) {
        if (measureType === 'capacity') {
            correct1 = `A ${item1.name} holds more than a ${item2.name}, so ${item1.name} > ${item2.name}`;
            incorrect = `A ${item1.name} holds more than a ${item2.name}, so ${item1.name} < ${item2.name}`;
        } else if (isTimeMeasure) {
            correct1 = `${item1.name.charAt(0).toUpperCase() + item1.name.slice(1)} takes longer than ${item2.name}, so ${item1.name} > ${item2.name}`;
            incorrect = `${item1.name.charAt(0).toUpperCase() + item1.name.slice(1)} takes longer than ${item2.name}, so ${item1.name} < ${item2.name}`;
        } else {
            correct1 = `A ${item1.name} is ${item1.comparative} than a ${item2.name}, so ${item1.name} > ${item2.name}`;
            incorrect = `A ${item1.name} is ${item1.comparative} than a ${item2.name}, so ${item1.name} < ${item2.name}`;
        }
    } else {
        const oppComp = context.opposites[item1.comparative];
        if (measureType === 'capacity') {
            correct1 = `A ${item1.name} holds less than a ${item2.name}, so ${item1.name} < ${item2.name}`;
            incorrect = `A ${item1.name} holds less than a ${item2.name}, so ${item1.name} > ${item2.name}`;
        } else if (isTimeMeasure) {
            correct1 = `${item1.name.charAt(0).toUpperCase() + item1.name.slice(1)} is quicker than ${item2.name}, so ${item1.name} < ${item2.name}`;
            incorrect = `${item1.name.charAt(0).toUpperCase() + item1.name.slice(1)} is quicker than ${item2.name}, so ${item1.name} > ${item2.name}`;
        } else {
            correct1 = `A ${item1.name} is ${oppComp} than a ${item2.name}, so ${item1.name} < ${item2.name}`;
            incorrect = `A ${item1.name} is ${oppComp} than a ${item2.name}, so ${item1.name} > ${item2.name}`;
        }
    }

    // Correct statement 2: Simple equality or obvious comparison
    correct2 = `5 > 3`;  // Simple numeric comparison (bridge to Y3)

    statements = [correct1, correct2, incorrect];

    return {
        text: 'Which statement is wrong?',
        type: 'multiple_choice',
        options: shuffle(statements),
        answer: incorrect,
        module: 'M01_Y2_MEAS',
        level: level
    };
}

/**
 * Main question generator
 * Selects operation based on params and generates appropriate question
 */
export function generateQuestion(params, level) {
    const operations = params.operations || ['symbol_recognition'];
    const selectedOperation = randomChoice(operations);

    // Map operations to functions
    const operationMap = {
        'symbol_recognition': generateSymbolRecognition,
        'symbol_matching': generateSymbolRecognition,  // Alias
        'symbol_selection': generateSymbolSelection,
        'complete_comparison': generateSymbolSelection,  // Alias
        'ordering_with_symbols': generateOrdering,
        'chain_comparisons': generateChainComparison,
        'mixed_comparisons': generateChainComparison,  // Alias for complex chains
        'error_identification': generateErrorIdentification
    };

    const generatorFunc = operationMap[selectedOperation] || generateSymbolRecognition;
    return generatorFunc(params, level);
}

export default {
    moduleId: 'M01_Y2_MEAS',
    generate: generateQuestion
};
