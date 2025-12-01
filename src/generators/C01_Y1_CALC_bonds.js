/**
 * C01_Y1_CALC: Number bonds and related subtraction facts within 20
 *
 * Generator for Year 1 number bonds to 10 and 20, and related subtraction facts.
 * V2 Nested Schema: Uses math/presentation destructuring pattern.
 */

import {
    randomChoice,
    generateBondPair,
    getGapPosition,
    getWordProblemContext,
    formatEquation,
    generateRelatedFact
} from './helpers/C01_bondsHelpers.js';

/**
 * Generate a number bond question
 * @param {Object} params - V2 nested parameters (math and presentation)
 * @param {number} level - Difficulty level (1-4)
 * @param {string} locale - Locale for formatting (default: en-GB)
 * @returns {Object} Question object with questionParts
 */
export function generateQuestion(params, level, locale = 'en-GB') {
    // V2 NESTED DESTRUCTURING PATTERN
    const {
        math: {
            targets,
            range: { min, max },
            operations,
            factFamilies,
            inverseProblems
        },
        presentation: {
            gaps: { position },
            styles,
            contexts,
            visualType
        }
    } = params;

    // Choose a target number (10 or 20)
    const target = randomChoice(targets);

    // Generate number bond pair
    const { part1, part2 } = generateBondPair(target, min, max);

    // Choose operation
    const operation = randomChoice(operations);

    // Choose presentation style
    const style = randomChoice(styles);

    // Generate based on style
    if (style === 'fact_family' && factFamilies) {
        return generateFactFamilyQuestion(part1, part2, target, position, level, visualType);
    } else if (style === 'inverse' && inverseProblems) {
        return generateInverseQuestion(part1, part2, target, position, level, visualType);
    } else if (style === 'word_problem') {
        const context = randomChoice(contexts.filter(c => c !== 'abstract'));
        return generateWordProblemQuestion(part1, part2, target, operation, context, level, visualType);
    } else {
        // Standard equation format
        return generateEquationQuestion(part1, part2, target, operation, position, level, visualType);
    }
}

/**
 * Generate standard equation question
 */
function generateEquationQuestion(part1, part2, target, operation, positionSetting, level, visualType) {
    let operands, operator, answer;

    if (operation === 'addition') {
        // a + b = target (with one part missing)
        operands = [part1, part2, target];
        operator = '+';
    } else {
        // target - a = b (subtraction)
        operands = [target, part1, part2];
        operator = '-';
    }

    // Determine which position has the gap
    const gapIndex = getGapPosition(positionSetting, 3);

    // Store answer before creating gap
    answer = operands[gapIndex];

    // Create display operands with null for gap
    const displayOperands = [...operands];
    displayOperands[gapIndex] = null;

    // Format text equation
    const equationText = formatEquation(displayOperands, operator);

    return {
        text: `Complete the number bond: ${equationText}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: operation === 'addition'
            ? `What number goes with ${operands[(gapIndex + 1) % 2]} to make ${target}?`
            : `What is ${target} take away ${gapIndex === 1 ? operands[0] : operands[gapIndex === 0 ? 1 : 0]}?`,
        module: 'C01_Y1_CALC',
        level: level,

        questionParts: [
            { type: 'text', value: 'Complete the number bond:' },
            {
                type: 'equation',
                expression: equationText,
                operator: operator,
                operands: displayOperands,
                gapIndex: gapIndex
            },
            {
                type: 'part_whole',
                whole: target,
                parts: operation === 'addition' ? displayOperands.slice(0, 2) : [operands[1], displayOperands[2]],
                visualType: visualType
            }
        ]
    };
}

/**
 * Generate word problem question
 */
function generateWordProblemQuestion(part1, part2, target, operation, contextType, level, visualType) {
    const { itemName, scenario } = getWordProblemContext(contextType, operation);

    // Fill in the scenario template
    const questionText = scenario
        .replace('{part1}', part1)
        .replace('{part2}', part2)
        .replace('{target}', target);

    const answer = operation === 'addition' ? part2 : part2;

    return {
        text: questionText,
        type: 'text_input',
        answer: answer.toString(),
        hint: operation === 'addition'
            ? `${target} - ${part1} = ?`
            : `${target} - ${part1} = ?`,
        module: 'C01_Y1_CALC',
        level: level,

        questionParts: [
            { type: 'text', value: questionText },
            {
                type: 'part_whole',
                whole: target,
                parts: operation === 'addition' ? [part1, null] : [part1, null],
                context: itemName,
                visualType: visualType
            }
        ]
    };
}

/**
 * Generate fact family question
 */
function generateFactFamilyQuestion(part1, part2, target, positionSetting, level, visualType) {
    // Present one fact and ask for related fact
    const givenFact = {
        operands: [part1, part2, target],
        operator: '+'
    };

    // Generate related subtraction fact
    const relatedFact = generateRelatedFact(part1, part2, target, 'related_subtraction');

    // Determine gap in the question fact
    const gapIndex = getGapPosition(positionSetting, 3);
    const questionOperands = [...relatedFact.operands];
    const answer = questionOperands[gapIndex];
    questionOperands[gapIndex] = null;

    const givenText = formatEquation(givenFact.operands, givenFact.operator);
    const questionText = formatEquation(questionOperands, relatedFact.operator);

    return {
        text: `If ${givenText}, what is ${questionText}?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Use the number bond: ${part1} and ${part2} make ${target}`,
        module: 'C01_Y1_CALC',
        level: level,

        questionParts: [
            { type: 'text', value: `If ${givenText}, what is the missing number?` },
            {
                type: 'fact_family',
                given: {
                    operator: givenFact.operator,
                    operands: givenFact.operands,
                    result: target
                },
                question: {
                    operator: relatedFact.operator,
                    operands: questionOperands,
                    result: gapIndex === 2 ? null : relatedFact.operands[2],
                    gapIndex: gapIndex
                }
            },
            {
                type: 'part_whole',
                whole: target,
                parts: [part1, part2],
                visualType: visualType
            }
        ]
    };
}

/**
 * Generate inverse relationship question (Level 4)
 */
function generateInverseQuestion(part1, part2, target, positionSetting, level, visualType) {
    // Ask for the missing number, then show inverse
    const additionText = `${part1} + __ = ${target}`;
    const answer = part2;

    return {
        text: `What number goes with ${part1} to make ${target}?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Think: ${target} - ${part1} = ?`,
        module: 'C01_Y1_CALC',
        level: level,

        questionParts: [
            { type: 'text', value: `What number goes with ${part1} to make ${target}?` },
            {
                type: 'inverse_relationship',
                additionQuestion: {
                    operands: [part1, null, target],
                    operator: '+',
                    gapIndex: 1
                },
                subtractionEquivalent: {
                    operands: [target, part1, null],
                    operator: '-',
                    gapIndex: 2
                }
            },
            {
                type: 'part_whole',
                whole: target,
                parts: [part1, null],
                visualType: visualType
            }
        ]
    };
}

export default {
    moduleId: 'C01_Y1_CALC',
    generate: generateQuestion
};
