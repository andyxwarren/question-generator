/**
 * Scenario Templates for N04 Representation Questions
 *
 * Child-friendly contextual scenarios for Year 1 students (ages 5-6)
 * Used to create engaging "most" and "least" comparison questions
 */

/**
 * Children's names for scenarios (gender-neutral mix)
 */
export const childrenNames = [
    'Ali', 'Ben', 'Cara', 'Dan', 'Emma', 'Finn', 'Grace', 'Hana',
    'Isaac', 'Jade', 'Kai', 'Lily', 'Max', 'Nora', 'Oscar', 'Pia',
    'Quinn', 'Ruby', 'Sam', 'Tara', 'Uma', 'Viv', 'Will', 'Zara'
];

/**
 * Scenario templates for "most" and "least" questions
 * Each template includes context for forming natural questions
 */
export const scenarioTemplates = [
    // Children with objects
    {
        category: 'possessions',
        items: [
            'stickers', 'pencils', 'crayons', 'books', 'toys',
            'marbles', 'badges', 'cards', 'stars', 'stamps'
        ],
        questionFormat: '{name} has {n} {item}',
        answerFormat: '{name}',
        mostQuestion: 'Who has the most {item}?',
        leastQuestion: 'Who has the least {item}?'
    },

    // Counting collections
    {
        category: 'collections',
        items: [
            'red balls', 'blue balls', 'yellow balls',
            'red apples', 'green apples', 'yellow apples',
            'red flowers', 'pink flowers', 'white flowers',
            'red blocks', 'blue blocks', 'green blocks'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which color has the most?',
        leastQuestion: 'Which color has the least?'
    },

    // Classroom scenarios
    {
        category: 'classroom',
        items: [
            'children in Class 1', 'children in Class 2', 'children in Class 3',
            'books on Shelf A', 'books on Shelf B', 'books on Shelf C',
            'chairs in Room 1', 'chairs in Room 2', 'chairs in Room 3'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    },

    // Animals
    {
        category: 'animals',
        items: [
            'ducks in the pond', 'rabbits in the field', 'birds in the tree',
            'cats', 'dogs', 'fish',
            'horses', 'sheep', 'cows'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    },

    // Food items
    {
        category: 'food',
        items: [
            'cookies on the red plate', 'cookies on the blue plate', 'cookies on the green plate',
            'sandwiches in Lunchbox A', 'sandwiches in Lunchbox B', 'sandwiches in Lunchbox C',
            'grapes in the bowl', 'strawberries in the bowl', 'blueberries in the bowl'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    },

    // Games and sports
    {
        category: 'games',
        items: [
            'points', 'goals', 'stars', 'stickers earned'
        ],
        questionFormat: '{name} scored {n} {item}',
        answerFormat: '{name}',
        mostQuestion: 'Who scored the most {item}?',
        leastQuestion: 'Who scored the least {item}?'
    },

    // Toys and play
    {
        category: 'toys',
        items: [
            'teddy bears in Box A', 'teddy bears in Box B', 'teddy bears in Box C',
            'toy cars on the shelf', 'toy trains on the shelf', 'toy planes on the shelf',
            'dolls', 'puzzles', 'games'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    }
];

/**
 * Get a random child's name
 */
export function getRandomName() {
    return childrenNames[Math.floor(Math.random() * childrenNames.length)];
}

/**
 * Get multiple unique random names
 * @param {number} count - Number of names needed (3-4)
 * @returns {string[]} Array of unique names
 */
export function getRandomNames(count) {
    const shuffled = [...childrenNames].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * Get a random scenario template
 * @returns {object} Random scenario template
 */
export function getRandomScenario() {
    return scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
}

/**
 * Get a random item from a scenario category
 * @param {object} scenario - Scenario template
 * @returns {string} Random item from the scenario
 */
export function getRandomItem(scenario) {
    return scenario.items[Math.floor(Math.random() * scenario.items.length)];
}

/**
 * Build a scenario-based "most" or "least" question
 * @param {number[]} numbers - Array of 3-4 numbers to compare
 * @param {string} questionType - 'most' or 'least'
 * @returns {object} Question object with text, options, and answer
 */
export function buildScenarioQuestion(numbers, questionType) {
    const scenario = getRandomScenario();
    const item = getRandomItem(scenario);

    // Determine subjects based on scenario category
    let subjects;
    if (scenario.category === 'possessions' || scenario.category === 'games') {
        subjects = getRandomNames(numbers.length);
    } else {
        // For collections/items, use the item variations as subjects
        // Take different colors/locations from the item description
        subjects = scenario.items.slice(0, numbers.length);
    }

    // Build the scenario description
    const descriptions = numbers.map((num, i) => {
        return scenario.questionFormat
            .replace('{n}', num)
            .replace('{item}', scenario.category === 'possessions' || scenario.category === 'games' ? item : subjects[i])
            .replace('{name}', subjects[i]);
    });

    // Build the full question text
    const questionText = descriptions.join('. ') + '. ' +
        (questionType === 'most' ? scenario.mostQuestion : scenario.leastQuestion)
            .replace('{item}', item);

    // Build options (the subjects/names/items being compared)
    const options = subjects.map((subject, i) => {
        if (scenario.category === 'possessions' || scenario.category === 'games') {
            return subject; // Return the child's name
        } else {
            return subject; // Return the item/color/location
        }
    });

    // Find the answer
    const correctIndex = questionType === 'most'
        ? numbers.indexOf(Math.max(...numbers))
        : numbers.indexOf(Math.min(...numbers));

    const answer = options[correctIndex];

    return {
        text: questionText,
        options: options,
        answer: answer,
        numbers: numbers, // Keep numbers for reference
        scenario: scenario.category
    };
}

/**
 * Build a two-way comparison question for "more than", "fewer", "less than", "equal to"
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {string} comparisonWord - 'more than', 'fewer', 'less than', or 'equal to'
 * @returns {object} Question object with text, options, and answer
 */
export function buildTwoWayComparisonQuestion(num1, num2, comparisonWord) {
    // Use possessions scenarios only (simpler for two-way comparisons)
    const possessionScenarios = scenarioTemplates.filter(
        s => s.category === 'possessions' || s.category === 'games'
    );
    const scenario = possessionScenarios[Math.floor(Math.random() * possessionScenarios.length)];
    const item = getRandomItem(scenario);
    const names = getRandomNames(2);

    // Build the scenario descriptions
    const description1 = scenario.questionFormat
        .replace('{name}', names[0])
        .replace('{n}', num1)
        .replace('{item}', item);

    const description2 = scenario.questionFormat
        .replace('{name}', names[1])
        .replace('{n}', num2)
        .replace('{item}', item);

    // Build the question based on comparison word
    let questionText, answer;

    switch(comparisonWord) {
        case 'more than':
        case 'more':
            questionText = `${description1}. ${description2}. Who has more ${item}?`;
            answer = num1 > num2 ? names[0] : names[1];
            break;

        case 'fewer':
        case 'less than':
        case 'less':
            // Use "fewer" with countable nouns
            const word = comparisonWord === 'less than' || comparisonWord === 'less' ? 'fewer' : 'fewer';
            questionText = `${description1}. ${description2}. Who has fewer ${item}?`;
            answer = num1 < num2 ? names[0] : names[1];
            break;

        case 'equal to':
        case 'same':
            questionText = `${description1}. ${description2}. Do they have the same number of ${item}?`;
            answer = num1 === num2 ? 'Yes' : 'No';
            break;

        default:
            questionText = `${description1}. ${description2}. Who has more ${item}?`;
            answer = num1 > num2 ? names[0] : names[1];
    }

    return {
        text: questionText,
        options: comparisonWord === 'equal to' || comparisonWord === 'same' ? ['Yes', 'No'] : [names[0], names[1]],
        answer: answer,
        num1: num1,
        num2: num2,
        scenario: scenario.category,
        comparisonWord: comparisonWord
    };
}

export default {
    childrenNames,
    scenarioTemplates,
    getRandomName,
    getRandomNames,
    getRandomScenario,
    getRandomItem,
    buildScenarioQuestion,
    buildTwoWayComparisonQuestion
};
