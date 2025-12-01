/**
 * C01_Y2_CALC: Mental recall and derived facts (Year 2)
 *
 * Curriculum: "recall and use addition and subtraction facts to 20 fluently,
 * and derive and use related facts up to 100"
 *
 * Question Types:
 * - Basic recall: "8 + 5 = __"
 * - Derived facts: "If 6 + 4 = 10, what is 60 + 40?"
 * - Near complements to 100: "73 + __ = 100"
 * - Inverse relationships: "If 8 + 6 = 14, what is 14 - 8?"
 * - Word problems: "Sam has 15 marbles..."
 */

import {
    randomChoice,
    generateBondPair,
    getGapPosition,
    formatEquationPart,
    formatEquation,
    generateRelatedFact,
    generateMultipleOf10,
    generateDerivedFact,
    generateNearComplement,
    getY2WordProblemContext
} from './helpers/C01_bondsHelpers.js';

/**
 * Generate a basic recall question (facts to 20)
 * @param {Object} params - V2 nested parameters
 * @param {number} level - Difficulty level
 * @returns {Object} Question object
 */
function generateBasicRecall(params, level) {
    const {
        math: { targets, range, operations },
        presentation: { gaps }
    } = params;

    // Choose a target (10 or 20)
    const target = randomChoice(targets.filter(t => t <= 20));
    const operation = randomChoice(operations);

    // Generate bond pair
    const { part1, part2, target: sum } = generateBondPair(target, range.min, Math.min(range.max, 20));

    // Determine operands based on operation
    let operands, operator, answer;
    if (operation === 'addition') {
        operands = [part1, part2, sum];
        operator = '+';
        answer = sum;
    } else {
        // Subtraction: target - part = result
        operands = [sum, part1, part2];
        operator = '-';
        answer = part2;
    }

    // Determine gap position
    const gapIndex = getGapPosition(gaps.position, 3);
    answer = operands[gapIndex];

    // Create display operands with null for gap
    const displayOperands = [...operands];
    displayOperands[gapIndex] = null;

    const text = formatEquation(displayOperands, operator);

    return {
        text: text,
        type: 'text_input',
        answer: answer.toString(),
        hint: operation === 'addition'
            ? `What number added to ${operands[(gapIndex + 1) % 3]} makes ${target}?`
            : `What is ${operands[0]} take away ${operands[1]}?`,
        module: 'C01_Y2_CALC',
        level: level,

        questionParts: [
            {
                type: 'equation',
                operands: displayOperands,
                operator: operator,
                gapIndex: gapIndex,
                equationType: 'basic_recall'
            }
        ]
    };
}

/**
 * Generate a multiples of 10 question (e.g., 30 + 40 = __)
 * @param {Object} params - V2 nested parameters
 * @param {number} level - Difficulty level
 * @returns {Object} Question object
 */
function generateMultiplesOf10Question(params, level) {
    const {
        math: { operations, range },
        presentation: { gaps }
    } = params;

    const operation = randomChoice(operations);

    // Generate multiples of 10
    let num1, num2, result;
    if (operation === 'addition') {
        num1 = generateMultipleOf10(10, Math.min(range.max - 10, 90));
        num2 = generateMultipleOf10(10, Math.min(100 - num1, range.max - num1));
        result = num1 + num2;
    } else {
        result = generateMultipleOf10(10, Math.min(range.max, 90));
        num2 = generateMultipleOf10(10, result);
        num1 = result + num2;
    }

    const operator = operation === 'addition' ? '+' : '-';
    const operands = [num1, num2, result];

    // Determine gap position
    const gapIndex = getGapPosition(gaps.position, 3);
    const answer = operands[gapIndex];

    // Create display operands with null for gap
    const displayOperands = [...operands];
    displayOperands[gapIndex] = null;

    const text = formatEquation(displayOperands, operator);

    return {
        text: text,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Work with tens: ${Math.floor(num1 / 10)} tens ${operator} ${Math.floor(num2 / 10)} tens`,
        module: 'C01_Y2_CALC',
        level: level,

        questionParts: [
            {
                type: 'equation',
                operands: displayOperands,
                operator: operator,
                gapIndex: gapIndex,
                equationType: 'multiples_of_10'
            }
        ]
    };
}

/**
 * Generate a derived fact question (decade facts)
 * @param {Object} params - V2 nested parameters
 * @param {number} level - Difficulty level
 * @returns {Object} Question object
 */
function generateDerivedFactQuestion(params, level) {
    const {
        math: { operations },
        presentation: { gaps }
    } = params;

    const operation = randomChoice(operations);
    const operator = operation === 'addition' ? '+' : '-';

    // Generate a base fact to 10 or 20
    const baseTarget = randomChoice([10, 20]);
    const { part1, part2, target } = generateBondPair(baseTarget, 0, baseTarget);

    // Create base fact based on operation
    let basePart1, basePart2, baseSum;
    if (operation === 'addition') {
        basePart1 = part1;
        basePart2 = part2;
        baseSum = target;
    } else {
        basePart1 = target;
        basePart2 = part1;
        baseSum = part2;
    }

    // Scale by 10 for derived fact
    const { baseFact, derivedFact } = generateDerivedFact(basePart1, basePart2, baseSum, operator, 10);

    // Determine gap position for derived fact
    const gapIndex = getGapPosition(gaps.position, 3);
    const answer = derivedFact.operands[gapIndex];

    // Create display operands with null for gap
    const displayDerived = [...derivedFact.operands];
    displayDerived[gapIndex] = null;

    const baseFactText = formatEquation(baseFact.operands, baseFact.operator);
    const derivedFactText = formatEquation(displayDerived, derivedFact.operator);

    const text = `If ${baseFactText}, what is ${derivedFactText}`;

    return {
        text: text,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Use the fact ${baseFactText} and multiply by 10`,
        module: 'C01_Y2_CALC',
        level: level,

        questionParts: [
            {
                type: 'derived_fact',
                knownFact: {
                    operands: baseFact.operands,
                    operator: baseFact.operator
                },
                derivedFact: {
                    operands: displayDerived,
                    operator: derivedFact.operator
                },
                derivationType: 'decade_facts',
                gapIndex: gapIndex
            }
        ]
    };
}

/**
 * Generate a near complement to 100 question
 * @param {Object} params - V2 nested parameters
 * @param {number} level - Difficulty level
 * @returns {Object} Question object
 */
function generateNearComplementQuestion(params, level) {
    const {
        presentation: { gaps }
    } = params;

    // Generate base bond to 10
    const basePart1 = 1 + Math.floor(Math.random() * 9); // 1-9
    const basePart2 = 10 - basePart1;

    // Choose tens digit (1-9)
    const tensDigit = 1 + Math.floor(Math.random() * 9);

    // Generate near complement
    const { num1, num2, baseFact } = generateNearComplement(basePart1, basePart2, tensDigit);

    // Determine gap position (prefer middle for this type)
    const preferredPosition = level >= 3 ? gaps.position : 'middle';
    const gapIndex = getGapPosition(preferredPosition, 3);

    const operands = [num1, num2, 100];
    const answer = operands[gapIndex];

    // Create display operands with null for gap
    const displayOperands = [...operands];
    displayOperands[gapIndex] = null;

    const text = formatEquation(displayOperands, '+');

    return {
        text: text,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Use the fact ${basePart1} + ${basePart2} = 10 to help`,
        module: 'C01_Y2_CALC',
        level: level,

        questionParts: [
            {
                type: 'equation',
                operands: displayOperands,
                operator: '+',
                gapIndex: gapIndex,
                equationType: 'near_complement',
                baseFact: {
                    operands: baseFact.operands,
                    operator: baseFact.operator
                }
            }
        ]
    };
}

/**
 * Generate an inverse relationship question
 * @param {Object} params - V2 nested parameters
 * @param {number} level - Difficulty level
 * @returns {Object} Question object
 */
function generateInverseQuestion(params, level) {
    // Generate a base fact to 20
    const baseTarget = randomChoice([10, 20]);
    const { part1, part2, target } = generateBondPair(baseTarget, 0, baseTarget);

    // Create addition fact
    const baseFact = {
        operands: [part1, part2, target],
        operator: '+'
    };

    // Create inverse (subtraction) fact
    const inverseFact = generateRelatedFact(part1, part2, target, 'inverse');

    // Answer is always the result for inverse questions
    const answer = inverseFact.answer;

    // Create display operands with gap at end
    const displayInverse = [...inverseFact.operands];
    displayInverse[2] = null;

    const baseFactText = formatEquation(baseFact.operands, baseFact.operator);
    const inverseFactText = formatEquation(displayInverse, inverseFact.operator);

    const text = `If ${baseFactText}, what is ${inverseFactText}`;

    return {
        text: text,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Use the inverse relationship between addition and subtraction`,
        module: 'C01_Y2_CALC',
        level: level,

        questionParts: [
            {
                type: 'derived_fact',
                knownFact: {
                    operands: baseFact.operands,
                    operator: baseFact.operator
                },
                derivedFact: {
                    operands: displayInverse,
                    operator: inverseFact.operator
                },
                derivationType: 'inverse',
                gapIndex: 2
            }
        ]
    };
}

/**
 * Generate a word problem question
 * @param {Object} params - V2 nested parameters
 * @param {number} level - Difficulty level
 * @returns {Object} Question object
 */
function generateWordProblem(params, level) {
    const {
        math: { operations, range },
        presentation: { contexts }
    } = params;

    const operation = randomChoice(operations);
    const contextType = randomChoice(contexts.filter(c => c !== 'abstract'));

    // Generate numbers
    let num1, num2, result;
    if (operation === 'addition') {
        num1 = 5 + Math.floor(Math.random() * Math.min(range.max - 10, 15));
        num2 = 3 + Math.floor(Math.random() * Math.min(20 - num1, 10));
        result = num1 + num2;
    } else {
        num1 = 10 + Math.floor(Math.random() * Math.min(range.max - 10, 10));
        num2 = 3 + Math.floor(Math.random() * (num1 - 3));
        result = num1 - num2;
    }

    const { text, answer, values } = getY2WordProblemContext(contextType, operation, num1, num2, result);
    const operator = operation === 'addition' ? '+' : '-';

    return {
        text: text,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Try writing it as a number sentence: ${num1} ${operator} ${num2}`,
        module: 'C01_Y2_CALC',
        level: level,

        questionParts: [
            {
                type: 'word_problem',
                operation: operation,
                values: values,
                context: contextType,
                equation: {
                    operands: [num1, num2, result],
                    operator: operator
                }
            }
        ]
    };
}

/**
 * Main question generator
 * @param {Object} params - V2 nested parameters
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    // Validate V2 nested structure
    const {
        math: { targets, range, operations, derivedFacts, multiplesOf10, derivationTypes },
        presentation: { gaps, styles, contexts }
    } = params;

    // Choose question style based on level and parameters
    const availableStyles = [...styles];

    const style = randomChoice(availableStyles);

    // Generate question based on style
    switch (style) {
        case 'equation':
            // Basic recall or multiples of 10
            if (multiplesOf10 && Math.random() > 0.5) {
                return generateMultiplesOf10Question(params, level);
            }
            return generateBasicRecall(params, level);

        case 'derived':
            // Derived fact question
            if (derivedFacts && derivationTypes && derivationTypes.length > 0) {
                const derivationType = randomChoice(derivationTypes);

                if (derivationType === 'decade_facts') {
                    return generateDerivedFactQuestion(params, level);
                } else if (derivationType === 'near_complements') {
                    return generateNearComplementQuestion(params, level);
                } else if (derivationType === 'inverse') {
                    return generateInverseQuestion(params, level);
                }
            }
            // Fallback to basic recall
            return generateBasicRecall(params, level);

        case 'missing_number':
            // Explicitly styled as missing number
            return generateBasicRecall(params, level);

        case 'word_problem':
            return generateWordProblem(params, level);

        case 'inverse':
            return generateInverseQuestion(params, level);

        default:
            return generateBasicRecall(params, level);
    }
}

export default {
    moduleId: 'C01_Y2_CALC',
    generate: generateQuestion
};
