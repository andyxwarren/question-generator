/**
 * Year 1 Mental Addition and Subtraction Generator
 *
 * Module: C01_Y1_CALC - "Represent and use number bonds and related subtraction facts within 20"
 *
 * This generator focuses on:
 * - Number bonds (pairs that make 5, 10, 20)
 * - Related addition and subtraction facts
 * - Missing part problems
 * - Fact families (if 3+7=10, then 7+3=10, 10-3=7, 10-7=3)
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    generateAddition,
    generateSubtraction,
    getRandomName,
    getRandomItem,
    getAdditionContext,
    getSubtractionContext
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'number_bonds':
            return generateNumberBonds(params, level);
        case 'missing_part':
            return generateMissingPart(params, level);
        case 'related_facts':
            return generateRelatedFacts(params, level);
        case 'simple_add_sub':
            return generateSimpleAddSub(params, level);
        case 'fact_families':
            return generateFactFamilies(params, level);
        case 'mixed_operations':
            return generateMixedOperations(params, level);
        case 'two_step_bonds':
            return generateTwoStepBonds(params, level);
        default:
            return generateNumberBonds(params, level);
    }
}

/**
 * OPERATION 1: Number Bonds
 * Find pairs of numbers that make a target (5, 10, 15, 20)
 */
function generateNumberBonds(params, level) {
    const target = randomChoice(params.target_numbers);
    const a = randomInt(params.allow_zero ? 0 : 1, target);
    const b = target - a;

    const questionTypes = [
        {
            text: `What number do you add to ${a} to make ${target}?`,
            answer: b
        },
        {
            text: `${a} and ___ make ${target}`,
            answer: b
        },
        {
            text: `Find the missing number: ${a} + ___ = ${target}`,
            answer: b
        },
        {
            text: `What is the other part when ${target} is split into ${a} and ___?`,
            answer: b
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(question.answer, 3, 0, target);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: `${a} + ${b} = ${target}`,
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Missing Part
 * Missing addend problems (a + ? = target)
 */
function generateMissingPart(params, level) {
    const target = randomInt(5, params.max_value);
    const known = randomInt(params.allow_zero ? 0 : 1, target - 1);
    const answer = target - known;

    const position = randomChoice(['first', 'second']);

    let text;
    if (position === 'first') {
        text = `___ + ${known} = ${target}`;
    } else {
        text = `${known} + ___ = ${target}`;
    }

    // Word problem variant
    if (randomChoice(params.question_styles) === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        text = `${name} has ${known} ${item}. How many more ${item} are needed to make ${target}?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Think: ${known} + ___ = ${target}`,
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Related Facts
 * If a + b = c, then c - b = a (and c - a = b)
 */
function generateRelatedFacts(params, level) {
    const sum = randomInt(5, params.max_value);
    const a = randomInt(1, sum - 1);
    const b = sum - a;

    const factTypes = [
        {
            given: `${a} + ${b} = ${sum}`,
            question: `What is ${sum} - ${b}?`,
            answer: a
        },
        {
            given: `${a} + ${b} = ${sum}`,
            question: `What is ${sum} - ${a}?`,
            answer: b
        },
        {
            given: `${sum} - ${a} = ${b}`,
            question: `What is ${a} + ${b}?`,
            answer: sum
        },
        {
            given: `${sum} - ${b} = ${a}`,
            question: `What is ${b} + ${a}?`,
            answer: sum
        }
    ];

    const fact = randomChoice(factTypes);
    const text = `If ${fact.given}, then ${fact.question}`;

    const distractors = generateDistractors(fact.answer, 3, 0, params.max_value);
    const options = shuffle([fact.answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: fact.answer.toString(),
        hint: 'Addition and subtraction are related',
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Simple Addition and Subtraction
 * Direct addition or subtraction within the range
 */
function generateSimpleAddSub(params, level) {
    const operation = randomChoice(['add', 'subtract']);

    if (operation === 'add') {
        const { a, b, answer } = generateAddition(2, params.max_value);

        const style = randomChoice(params.question_styles);
        let text;

        if (style === 'word_problem') {
            const context = getAdditionContext(a, b, answer);
            text = context.text;
        } else {
            text = `${a} + ${b} = ?`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Count on from ${a}`,
            module: 'C01_Y1_CALC',
            level: level
        };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value, { maxMinuend: params.max_value });

        const style = randomChoice(params.question_styles);
        let text;

        if (style === 'word_problem') {
            const context = getSubtractionContext(a, b, answer);
            text = context.text;
        } else {
            text = `${a} - ${b} = ?`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Count back from ${a}`,
            module: 'C01_Y1_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 5: Fact Families
 * Show all four facts in a family (e.g., 3+7=10, 7+3=10, 10-3=7, 10-7=3)
 */
function generateFactFamilies(params, level) {
    const sum = randomInt(5, params.max_value);
    const a = randomInt(1, sum - 1);
    const b = sum - a;

    // Avoid commutative duplicates
    const smaller = Math.min(a, b);
    const larger = Math.max(a, b);

    // Handle case where addends are equal (e.g., 5+5=10)
    let family;
    if (smaller === larger) {
        // Only 2 unique facts when doubling
        family = [
            `${smaller} + ${larger} = ${sum}`,
            `${sum} - ${smaller} = ${larger}`
        ];
    } else {
        // Normal case: 4 distinct facts
        family = [
            `${smaller} + ${larger} = ${sum}`,
            `${larger} + ${smaller} = ${sum}`,
            `${sum} - ${smaller} = ${larger}`,
            `${sum} - ${larger} = ${smaller}`
        ];
    }

    const missingIndex = randomInt(0, family.length - 1);
    const missingFact = family[missingIndex];

    // Parse the missing fact to get the answer
    let answer;
    if (missingFact.includes('+')) {
        answer = sum;
    } else {
        // Extract the answer from subtraction
        const parts = missingFact.split('=');
        answer = parseInt(parts[1].trim());
    }

    const shownFacts = family.filter((_, i) => i !== missingIndex);

    // Format facts with commas and "and" for better readability
    let factsText;
    if (shownFacts.length === 1) {
        // Only 1 fact shown (happens with doubled addends)
        factsText = shownFacts[0];
    } else if (shownFacts.length === 2) {
        factsText = `${shownFacts[0]} and ${shownFacts[1]}`;
    } else {
        // 3 or more facts
        const allButLast = shownFacts.slice(0, -1);
        const last = shownFacts[shownFacts.length - 1];
        factsText = `${allButLast.join(', ')} and ${last}`;
    }

    const text = `These facts are in the same family: ${factsText}. Which fact completes the family?`;

    // Create options with the correct fact and similar-looking wrong ones
    const wrongAnswers = [];
    if (missingFact.includes('+')) {
        wrongAnswers.push(`${smaller} + ${larger} = ${sum + 1}`);
        wrongAnswers.push(`${smaller} + ${larger} = ${sum - 1}`);
        wrongAnswers.push(`${smaller + 1} + ${larger} = ${sum}`);
    } else {
        wrongAnswers.push(`${sum} - ${smaller} = ${larger + 1}`);
        wrongAnswers.push(`${sum} - ${smaller} = ${larger - 1}`);
        wrongAnswers.push(`${sum + 1} - ${smaller} = ${larger}`);
    }

    const options = shuffle([missingFact, ...wrongAnswers.slice(0, 3)]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: missingFact,
        hint: `All facts use the numbers ${smaller}, ${larger}, and ${sum}`,
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Mixed Operations
 * Combine different types of number bond questions
 */
function generateMixedOperations(params, level) {
    const subOperations = ['number_bonds', 'missing_part', 'related_facts', 'simple_add_sub'];
    const chosenOp = randomChoice(subOperations);

    // Delegate to the appropriate function
    const tempParams = { ...params, operations: [chosenOp] };
    return generateQuestion(tempParams, level);
}

/**
 * OPERATION 7: Two-Step Bonds (Level 4 only)
 * More complex reasoning with number bonds
 */
function generateTwoStepBonds(params, level) {
    const target = randomChoice(params.target_numbers);
    const part1 = randomInt(1, Math.floor(target / 2));
    const remaining = target - part1;
    const part2 = randomInt(1, remaining - 1);
    const part3 = remaining - part2;

    const questionTypes = [
        {
            text: `${part1} + ${part2} + ${part3} = ?`,
            answer: target
        },
        {
            text: `I have ${part1} red counters, ${part2} blue counters, and ${part3} green counters. How many counters altogether?`,
            answer: target
        },
        {
            text: `${target} is split into three parts: ${part1}, ${part2}, and ___. What is the third part?`,
            answer: part3
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(question.answer, 3, 0, params.max_value);
    const options = shuffle([question.answer, ...distractors]);

    return {
        text: question.text,
        type: 'multiple_choice',
        options: options,
        answer: question.answer.toString(),
        hint: question.answer === target ? `Add all three numbers` : `Subtract the two parts from ${target}`,
        module: 'C01_Y1_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C01_Y1_CALC',
    generate: generateQuestion
};
