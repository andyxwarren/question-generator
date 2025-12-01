/**
 * Helper functions for number bonds and related facts
 */

/**
 * Get a random element from an array
 * @param {Array} array - Array to choose from
 * @returns {*} Random element
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a number bond pair for a target
 * @param {number} target - The target sum (e.g., 10, 20)
 * @param {number} min - Minimum value for parts
 * @param {number} max - Maximum value for parts
 * @returns {Object} { part1, part2, target }
 */
export function generateBondPair(target, min, max) {
    // Ensure we stay within range
    const effectiveMin = Math.max(min, 0);
    const effectiveMax = Math.min(max, target);

    // Generate first part
    const part1 = effectiveMin + Math.floor(Math.random() * (effectiveMax - effectiveMin + 1));
    const part2 = target - part1;

    return { part1, part2, target };
}

/**
 * Determine gap position based on presentation settings
 * @param {string} positionSetting - 'end', 'start', 'middle', 'end_or_middle', 'any'
 * @param {number} operandCount - Number of operands in the equation
 * @returns {number} Index of the gap (0 = first, 1 = second, 2 = result)
 */
export function getGapPosition(positionSetting, operandCount = 3) {
    switch (positionSetting) {
        case 'end':
            return operandCount - 1; // Last position (result)
        case 'start':
            return 0; // First operand
        case 'middle':
            return 1; // Second operand
        case 'end_or_middle':
            return randomChoice([1, 2]); // Second operand or result
        case 'any':
            return randomChoice([0, 1, 2]); // Any position
        default:
            return operandCount - 1; // Default to end
    }
}

/**
 * Generate a word problem context
 * @param {string} contextType - Type of context ('objects', 'scenarios')
 * @param {string} operation - 'addition' or 'subtraction'
 * @returns {Object} { itemName, scenario }
 */
export function getWordProblemContext(contextType, operation) {
    const objectContexts = {
        addition: [
            { itemName: 'apples', scenario: 'Sam has {part1} apples. How many more does he need to make {target}?' },
            { itemName: 'toys', scenario: 'There are {part1} toys in the box. How many more are needed to have {target}?' },
            { itemName: 'pencils', scenario: 'Amy has {part1} pencils. How many more does she need to get {target}?' },
            { itemName: 'books', scenario: 'The shelf has {part1} books. How many more books are needed to have {target}?' }
        ],
        subtraction: [
            { itemName: 'apples', scenario: 'There are {target} apples. {part1} are red. How many are green?' },
            { itemName: 'toys', scenario: '{target} toys in total. {part1} are cars. How many are not cars?' },
            { itemName: 'children', scenario: '{target} children are playing. {part1} are girls. How many are boys?' },
            { itemName: 'marbles', scenario: 'Tom has {target} marbles. He gives {part1} away. How many does he have left?' }
        ]
    };

    const scenarioContexts = {
        addition: [
            { itemName: 'points', scenario: 'In a game, you scored {part1} points. How many more points do you need to reach {target}?' },
            { itemName: 'stickers', scenario: 'You collected {part1} stickers. How many more do you need to collect {target} stickers?' }
        ],
        subtraction: [
            { itemName: 'sweets', scenario: 'A jar has {target} sweets. You eat {part1} of them. How many are left?' },
            { itemName: 'pages', scenario: 'A book has {target} pages. You have read {part1} pages. How many pages are left?' }
        ]
    };

    if (contextType === 'scenarios') {
        return randomChoice(scenarioContexts[operation]);
    } else {
        return randomChoice(objectContexts[operation]);
    }
}

/**
 * Format an equation part (number or gap)
 * @param {number|null} value - The value or null for gap
 * @returns {string} Formatted string
 */
export function formatEquationPart(value) {
    return value === null ? '__' : value.toString();
}

/**
 * Create equation text from parts
 * @param {Array} operands - Array of operands (may include null for gaps)
 * @param {string} operator - '+' or '-'
 * @returns {string} Formatted equation
 */
export function formatEquation(operands, operator) {
    if (operands.length === 3) {
        // Binary operation: a op b = c
        return `${formatEquationPart(operands[0])} ${operator} ${formatEquationPart(operands[1])} = ${formatEquationPart(operands[2])}`;
    }
    return '';
}

/**
 * Generate related fact from a given bond
 * @param {number} part1 - First part
 * @param {number} part2 - Second part
 * @param {number} target - Target sum
 * @param {string} relationType - 'commutative', 'inverse', 'related_subtraction'
 * @returns {Object} { operands, operator, answer }
 */
export function generateRelatedFact(part1, part2, target, relationType) {
    switch (relationType) {
        case 'commutative':
            // If given a + b = c, return b + a = c
            return {
                operands: [part2, part1, target],
                operator: '+',
                answer: target
            };

        case 'inverse':
        case 'related_subtraction':
            // If given a + b = c, return c - a = b or c - b = a
            const subtrahend = randomChoice([part1, part2]);
            const difference = target - subtrahend;
            return {
                operands: [target, subtrahend, difference],
                operator: '-',
                answer: difference
            };

        default:
            return {
                operands: [part1, part2, target],
                operator: '+',
                answer: target
            };
    }
}

/**
 * Generate a multiple of 10 within a range
 * @param {number} min - Minimum value (will be rounded up to nearest 10)
 * @param {number} max - Maximum value (will be rounded down to nearest 10)
 * @returns {number} Random multiple of 10
 */
export function generateMultipleOf10(min, max) {
    const minMultiple = Math.ceil(min / 10) * 10;
    const maxMultiple = Math.floor(max / 10) * 10;
    const count = (maxMultiple - minMultiple) / 10 + 1;
    const randomIndex = Math.floor(Math.random() * count);
    return minMultiple + (randomIndex * 10);
}

/**
 * Scale a fact by a power of 10 (for derived facts)
 * @param {number} value - Original value
 * @param {number} scale - Scale factor (10, 100, etc.)
 * @returns {number} Scaled value
 */
export function scaleFact(value, scale) {
    return value * scale;
}

/**
 * Generate a derived fact question
 * @param {number} basePart1 - First part of base fact
 * @param {number} basePart2 - Second part of base fact
 * @param {number} baseTarget - Target of base fact
 * @param {string} operator - '+' or '-'
 * @param {number} scale - Scale factor (10 for decade facts)
 * @returns {Object} { baseFact, derivedFact }
 */
export function generateDerivedFact(basePart1, basePart2, baseTarget, operator, scale = 10) {
    const baseFact = {
        operands: [basePart1, basePart2, baseTarget],
        operator: operator
    };

    const derivedFact = {
        operands: [
            scaleFact(basePart1, scale),
            scaleFact(basePart2, scale),
            scaleFact(baseTarget, scale)
        ],
        operator: operator
    };

    return { baseFact, derivedFact };
}

/**
 * Generate near complement to 100 using a base fact to 10
 * E.g., knowing 3 + 7 = 10, derive 73 + __ = 100
 * @param {number} basePart1 - First part of base fact (e.g., 3)
 * @param {number} basePart2 - Second part of base fact (e.g., 7)
 * @param {number} tensDigit - Tens digit for first number (e.g., 7 for 73)
 * @returns {Object} { num1, num2, baseFact }
 */
export function generateNearComplement(basePart1, basePart2, tensDigit) {
    // Create a number like 73 from tens digit 7 and ones digit 3
    const num1 = tensDigit * 10 + basePart1;
    const num2 = 100 - num1;

    const baseFact = {
        operands: [basePart1, basePart2, 10],
        operator: '+'
    };

    return {
        num1,
        num2,
        baseFact
    };
}

/**
 * Generate word problem context for Year 2 mental calculations
 * @param {string} contextType - Type of context ('scenarios', 'verbal')
 * @param {string} operation - 'addition' or 'subtraction'
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {number} result - Result
 * @returns {Object} { text, values }
 */
export function getY2WordProblemContext(contextType, operation, num1, num2, result) {
    const contexts = {
        addition: [
            { text: 'Sam has {num1} marbles. He needs {result} in total. How many more does he need?', answer: num2 },
            { text: 'There are {num1} children in the playground. {num2} more arrive. How many children are there now?', answer: result },
            { text: 'Amy collected {num1} stickers. She wants {result} stickers. How many more does she need?', answer: num2 }
        ],
        subtraction: [
            { text: 'Tom has {num1} sweets. He eats {num2} of them. How many does he have left?', answer: result },
            { text: 'There are {num1} books on the shelf. {num2} are taken away. How many are left?', answer: result },
            { text: 'A class has {num1} pencils. {num2} pencils are broken. How many pencils are not broken?', answer: result }
        ]
    };

    const context = randomChoice(contexts[operation]);
    const text = context.text
        .replace('{num1}', num1)
        .replace('{num2}', num2)
        .replace('{result}', result);

    return {
        text,
        answer: context.answer,
        values: { num1, num2, result }
    };
}
