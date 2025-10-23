/**
 * Helper functions for M01 - Compare, Describe and Order Measures generators
 * Supports Year 1-4 measurement comparison questions
 */

/**
 * Random selection from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Object database for measurement comparisons
 * Each object has relative sizes for comparison
 * Size scale: 1 (smallest) to 10 (largest)
 */
export const MEASUREMENT_OBJECTS = {
    // Length objects (things measured in length)
    length: [
        { name: 'paperclip', size: 1, category: 'stationery' },
        { name: 'pencil', size: 2, category: 'stationery' },
        { name: 'ruler', size: 3, category: 'stationery' },
        { name: 'book', size: 3, category: 'classroom' },
        { name: 'table', size: 5, category: 'furniture' },
        { name: 'door', size: 6, category: 'furniture' },
        { name: 'bicycle', size: 6, category: 'vehicle' },
        { name: 'car', size: 7, category: 'vehicle' },
        { name: 'bus', size: 9, category: 'vehicle' },
        { name: 'road', size: 10, category: 'outdoor' }
    ],
    
    // Height objects (things measured by how tall they are)
    height: [
        { name: 'book', size: 1, category: 'classroom' },
        { name: 'chair', size: 3, category: 'furniture' },
        { name: 'child', size: 4, category: 'person' },
        { name: 'table', size: 4, category: 'furniture' },
        { name: 'door', size: 6, category: 'furniture' },
        { name: 'adult', size: 6, category: 'person' },
        { name: 'house', size: 8, category: 'building' },
        { name: 'tree', size: 9, category: 'nature' },
        { name: 'building', size: 10, category: 'building' }
    ],
    
    // Mass/weight objects
    mass: [
        { name: 'feather', size: 1, category: 'nature' },
        { name: 'pencil', size: 1, category: 'stationery' },
        { name: 'apple', size: 2, category: 'food' },
        { name: 'book', size: 3, category: 'classroom' },
        { name: 'bag of sugar', size: 4, category: 'food' },
        { name: 'backpack', size: 5, category: 'school' },
        { name: 'chair', size: 6, category: 'furniture' },
        { name: 'bicycle', size: 7, category: 'vehicle' },
        { name: 'adult', size: 8, category: 'person' },
        { name: 'car', size: 10, category: 'vehicle' }
    ],
    
    // Capacity/volume objects (containers)
    capacity: [
        { name: 'spoon', size: 1, category: 'kitchen' },
        { name: 'cup', size: 2, category: 'kitchen' },
        { name: 'mug', size: 3, category: 'kitchen' },
        { name: 'bottle', size: 4, category: 'container' },
        { name: 'jug', size: 5, category: 'kitchen' },
        { name: 'bucket', size: 6, category: 'container' },
        { name: 'sink', size: 7, category: 'bathroom' },
        { name: 'bath', size: 8, category: 'bathroom' },
        { name: 'paddling pool', size: 9, category: 'outdoor' },
        { name: 'swimming pool', size: 10, category: 'outdoor' }
    ],
    
    // Time objects (activities with relative speeds)
    // Size represents how fast/quick the activity is (higher = quicker/faster)
    time: [
        { name: 'growing a tree', size: 1, category: 'nature', article: '' },
        { name: 'walking', size: 3, category: 'movement', article: '' },
        { name: 'eating lunch', size: 4, category: 'daily', article: '' },
        { name: 'running', size: 6, category: 'movement', article: '' },
        { name: 'riding a bike', size: 7, category: 'movement', article: '' },
        { name: 'driving a car', size: 8, category: 'transport', article: '' },
        { name: 'blinking', size: 10, category: 'body', article: '' }
    ]
};

/**
 * Vocabulary for different measure types
 */
export const COMPARISON_VOCABULARY = {
    length: {
        comparative_more: 'longer',
        comparative_less: 'shorter',
        superlative_most: 'longest',
        superlative_least: 'shortest',
        question_more: 'longer',
        question_less: 'shorter'
    },
    height: {
        comparative_more: 'taller',
        comparative_less: 'shorter',
        superlative_most: 'tallest',
        superlative_least: 'shortest',
        question_more: 'taller',
        question_less: 'shorter'
    },
    mass: {
        comparative_more: 'heavier',
        comparative_less: 'lighter',
        superlative_most: 'heaviest',
        superlative_least: 'lightest',
        question_more: 'heavier',
        question_less: 'lighter'
    },
    capacity: {
        comparative_more: 'more',
        comparative_less: 'less',
        superlative_most: 'most',
        superlative_least: 'least',
        alternative_more: 'fuller',
        alternative_less: 'emptier',
        question_more: 'more',
        question_less: 'less'
    },
    time: {
        comparative_more: 'quicker',
        comparative_less: 'slower',
        superlative_most: 'quickest',
        superlative_least: 'slowest',
        alternative_more: 'faster',
        alternative_less: 'slower',
        question_more: 'quicker',
        question_less: 'slower'
    }
};

/**
 * Get two objects with clear size difference for comparison
 * @param {string} measureType - Type of measurement (length, height, mass, capacity, time)
 * @param {number} minDifference - Minimum size difference required (default 2)
 * @returns {Array} [smallerObject, largerObject]
 */
export function getTwoObjectsForComparison(measureType, minDifference = 2) {
    const objects = MEASUREMENT_OBJECTS[measureType];
    
    // Filter to ensure size difference
    let attempts = 0;
    while (attempts < 50) {
        const obj1 = randomChoice(objects);
        const obj2 = randomChoice(objects.filter(o => o.name !== obj1.name));
        
        if (Math.abs(obj1.size - obj2.size) >= minDifference) {
            // Return in random order
            return Math.random() < 0.5 ? [obj1, obj2] : [obj2, obj1];
        }
        attempts++;
    }
    
    // Fallback: return any two different objects
    const obj1 = randomChoice(objects);
    const obj2 = randomChoice(objects.filter(o => o.name !== obj1.name));
    return [obj1, obj2];
}

/**
 * Get objects for ordering (supports 3 or 4 objects)
 * @param {string} measureType - Type of measurement
 * @param {number} count - Number of objects to order (default 3)
 * @param {number} minSpacing - Minimum size difference between consecutive objects (default 1, recommend 2 for Year 1)
 * @returns {Array} Objects sorted by size [smallest, ..., largest]
 */
export function getObjectsForOrdering(measureType, count = 3, minSpacing = 1) {
    const objects = MEASUREMENT_OBJECTS[measureType];

    // Try to get objects with clear size progression
    let attempts = 0;
    while (attempts < 50) {
        const selected = [];

        // Select count number of objects
        while (selected.length < count) {
            const obj = randomChoice(objects);
            // Ensure unique names and sizes
            if (!selected.find(o => o.name === obj.name || o.size === obj.size)) {
                selected.push(obj);
            }
        }

        // Sort by size
        selected.sort((a, b) => a.size - b.size);

        // Check if there's reasonable spacing between all consecutive pairs
        let hasGoodSpacing = true;
        for (let i = 0; i < selected.length - 1; i++) {
            if (selected[i + 1].size - selected[i].size < minSpacing) {
                hasGoodSpacing = false;
                break;
            }
        }

        if (hasGoodSpacing) {
            return selected;
        }
        attempts++;
    }

    // Fallback: just return count different objects sorted
    const selected = [];
    while (selected.length < count) {
        const obj = randomChoice(objects);
        if (!selected.find(o => o.name === obj.name)) {
            selected.push(obj);
        }
    }
    return selected.sort((a, b) => a.size - b.size);
}

// Keep backward compatibility
export function getThreeObjectsForOrdering(measureType) {
    return getObjectsForOrdering(measureType, 3);
}

/**
 * Generate a direct comparison question
 * @param {string} measureType - Type of measurement
 * @param {object} vocab - Vocabulary object
 * @param {number} minDifference - Minimum size difference (default 2)
 * @returns {object} Question object
 */
export function generateDirectComparison(measureType, vocab, minDifference = 2) {
    const [obj1, obj2] = getTwoObjectsForComparison(measureType, minDifference);
    
    // Determine correct answer
    const larger = obj1.size > obj2.size ? obj1 : obj2;
    const smaller = obj1.size < obj2.size ? obj1 : obj2;
    
    // Randomly ask for longer or shorter
    const askingForLarger = Math.random() < 0.5;
    const questionWord = askingForLarger ? vocab.question_more : vocab.question_less;
    const correctAnswer = askingForLarger ? larger : smaller;
    
    // Create options (include both objects and optionally a third)
    const options = shuffleArray([obj1.name, obj2.name]);
    
    // For time activities, don't use article "a"
    const article1 = measureType === 'time' ? '' : 'a ';
    const article2 = measureType === 'time' ? '' : 'a ';
    
    const text = `Which is ${questionWord}: ${article1}${obj1.name} or ${article2}${obj2.name}?`;
    
    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer.name,
        options,
        module: 'M01_Y1_MEAS',
        operation: 'direct_comparison'
    };
}

/**
 * Generate a complete comparison statement question
 * @param {string} measureType - Type of measurement
 * @param {object} vocab - Vocabulary object
 * @param {number} minDifference - Minimum size difference (default 2)
 * @param {boolean} useMultipleChoice - Whether to use multiple choice (recommended for Year 1)
 * @returns {object} Question object
 */
export function generateCompleteStatement(measureType, vocab, minDifference = 2, useMultipleChoice = true) {
    const [obj1, obj2] = getTwoObjectsForComparison(measureType, minDifference);

    // Determine relationship
    const larger = obj1.size > obj2.size ? obj1 : obj2;
    const smaller = obj1.size < obj2.size ? obj1 : obj2;

    // Randomly structure the sentence
    const structure = randomChoice([
        { first: larger, second: smaller, answer: vocab.comparative_more },
        { first: smaller, second: larger, answer: vocab.comparative_less }
    ]);

    // For time activities, don't use article "a" or "an"
    // For other objects, use proper article ("a" or "an" based on first letter)
    const getArticle = (name) => {
        if (measureType === 'time') return '';
        const firstLetter = name.charAt(0).toLowerCase();
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        return vowels.includes(firstLetter) ? 'an ' : 'a ';
    };

    const article1 = getArticle(structure.first.name);
    const article2 = getArticle(structure.second.name);

    // Build the text with proper capitalization and dimensional cue
    let firstPart = article1 ? `${article1}${structure.first.name}` : structure.first.name;
    // Capitalize the first letter of the sentence
    firstPart = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);

    // Add dimensional cue for clarity (especially for young learners)
    const dimensionCue = measureType === 'length' ? 'When measuring LENGTH, ' :
                        measureType === 'height' ? 'When measuring HEIGHT, ' :
                        measureType === 'mass' ? 'When measuring WEIGHT, ' :
                        measureType === 'capacity' ? 'When measuring how much they HOLD, ' :
                        measureType === 'time' ? 'When measuring SPEED, ' : '';

    const text = `${dimensionCue}${firstPart.toLowerCase()} is ___ than ${article2}${structure.second.name}.`;

    if (useMultipleChoice) {
        // For Year 1: Multiple choice is clearer and reduces spelling burden
        return {
            text,
            type: 'multiple_choice',
            answer: structure.answer,
            options: [vocab.comparative_more, vocab.comparative_less],
            hint: `Choose the word that makes the sentence correct.`,
            module: 'M01_Y1_MEAS',
            operation: 'complete_statement'
        };
    } else {
        // For older years: Text input for vocabulary practice
        const hint = `Use words like ${vocab.comparative_more} or ${vocab.comparative_less}.`;
        return {
            text,
            type: 'text_input',
            answer: structure.answer,
            hint,
            module: 'M01_Y1_MEAS',
            operation: 'complete_statement'
        };
    }
}

/**
 * Generate an ordering question
 * @param {string} measureType - Type of measurement
 * @param {object} vocab - Vocabulary object
 * @param {string} position - 'first' or 'last'
 * @param {number} count - Number of objects to order (default 3)
 * @param {number} minSpacing - Minimum size difference between consecutive objects (default 2 for clarity)
 * @returns {object} Question object
 */
export function generateOrdering(measureType, vocab, position = 'first', count = 3, minSpacing = 2) {
    const objects = getObjectsForOrdering(measureType, count, minSpacing);

    // Shuffle for presentation
    const shuffled = shuffleArray(objects.map(o => o.name));

    // Determine question
    const askSmallest = position === 'first';
    const questionPhrase = askSmallest ? vocab.superlative_least : vocab.superlative_most;
    const correctAnswer = askSmallest ? objects[0].name : objects[objects.length - 1].name;

    // Add clarification in parentheses for what FIRST/LAST means
    const positionClarification = position === 'first' ? `${position.toUpperCase()} (${vocab.superlative_least})` : `${position.toUpperCase()} (${vocab.superlative_most})`;
    const text = `Put these in order from ${vocab.superlative_least} to ${vocab.superlative_most}: ${shuffled.join(', ')}. Which comes ${positionClarification}?`;

    return {
        text,
        type: 'multiple_choice',
        answer: correctAnswer,
        options: objects.map(o => o.name),
        module: 'M01_Y1_MEAS',
        operation: 'ordering'
    };
}

/**
 * Generate a practical problem question
 * @param {string} measureType - Type of measurement
 * @param {object} vocab - Vocabulary object
 * @returns {object} Question object
 */
export function generatePracticalProblem(measureType, vocab) {
    const [obj1, obj2] = getTwoObjectsForComparison(measureType, 2);
    
    // Create practical scenarios based on measure type
    const scenarios = {
        length: [
            {
                setup: `Tom's pencil is ${vocab.comparative_more} than Sarah's pencil.`,
                question: `Who can draw a ${vocab.comparative_more} line without lifting their pencil?`,
                answer: 'Tom'
            },
            {
                setup: `The blue ribbon is ${vocab.comparative_less} than the red ribbon.`,
                question: `Which ribbon would you use if you need less ribbon?`,
                answer: 'blue ribbon'
            }
        ],
        height: [
            {
                setup: `The sunflower is ${vocab.comparative_more} than the daisy.`,
                question: `Which plant can reach ${vocab.comparative_more}?`,
                answer: 'sunflower'
            }
        ],
        mass: [
            {
                setup: `The bag of apples is ${vocab.comparative_more} than the bag of feathers.`,
                question: `Which bag will be harder to carry?`,
                answer: 'apples'
            },
            {
                setup: `Tom's backpack is ${vocab.comparative_less} than Sarah's backpack.`,
                question: `Who has an easier time carrying their backpack?`,
                answer: 'Tom'
            }
        ],
        capacity: [
            {
                setup: `The jug holds ${vocab.comparative_more} than the cup.`,
                question: `Which can hold ${vocab.comparative_more} water?`,
                answer: 'jug'
            }
        ],
        time: [
            {
                setup: `Running is ${vocab.comparative_more} than walking.`,
                question: `Which way of moving is ${vocab.comparative_more}?`,
                answer: 'running'
            },
            {
                setup: `Eating lunch takes less time than growing a tree.`,
                question: `Which takes less time?`,
                answer: 'eating lunch'
            },
            {
                setup: `Blinking is ${vocab.comparative_more} than walking.`,
                question: `Which happens ${vocab.comparative_more}?`,
                answer: 'blinking'
            }
        ]
    };
    
    const scenario = randomChoice(scenarios[measureType] || scenarios.length);
    const text = `${scenario.setup} ${scenario.question}`;
    
    // Create options based on scenario and measure type
    let options;
    if (measureType === 'time') {
        // For time, extract the activities from the scenario
        if (scenario.answer === 'running') {
            options = ['running', 'walking'];
        } else if (scenario.answer === 'eating lunch') {
            options = ['eating lunch', 'growing a tree'];
        } else if (scenario.answer === 'blinking') {
            options = ['blinking', 'walking'];
        } else {
            options = ['running', 'walking']; // fallback
        }
    } else {
        // Original logic for other measure types
        options = scenario.answer === 'Tom' ? ['Tom', 'Sarah'] : 
                    scenario.answer.includes('ribbon') ? ['blue ribbon', 'red ribbon'] :
                    scenario.answer === 'sunflower' ? ['sunflower', 'daisy'] :
                    scenario.answer === 'apples' ? ['apples', 'feathers'] :
                    ['jug', 'cup'];
    }
    
    return {
        text,
        type: 'multiple_choice',
        answer: scenario.answer,
        options: shuffleArray(options),
        module: 'M01_Y1_MEAS',
        operation: 'practical_problem'
    };
}
