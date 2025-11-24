/**
 * Year 1 Mental Addition and Subtraction Generator
 *
 * Module: C01_Y1_CALC - "Represent and use number bonds and related subtraction facts within 20"
 *
 * Schema v2.0 Compliant:
 * - questionTemplate with [placeholder] notation
 * - questionRendered with actual values
 * - Raw values in values object
 * - Metadata in valueMetadata object
 * - locale and universal flags
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
            template: `What number do you add to [a] to make [target]?`,
            rendered: `What number do you add to ${a} to make ${target}?`
        },
        {
            template: `[a] and [unknown] make [target]`,
            rendered: `${a} and ___ make ${target}`
        },
        {
            template: `Find the missing number: [a] + [unknown] = [target]`,
            rendered: `Find the missing number: ${a} + ___ = ${target}`
        },
        {
            template: `What is the other part when [target] is split into [a] and [unknown]?`,
            rendered: `What is the other part when ${target} is split into ${a} and ___?`
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(b, 3, 0, target);
    const options = shuffle([b, ...distractors]);

    const values = { a, b, target, unknown: b };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        target: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: b,
        hintTemplate: `[a] + [b] = [target]`,
        hintRendered: `${a} + ${b} = ${target}`,
        locale: 'en-GB',
        universal: true,
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

    let questionTemplate, questionRendered;
    if (position === 'first') {
        questionTemplate = `[unknown] + [known] = [target]`;
        questionRendered = `___ + ${known} = ${target}`;
    } else {
        questionTemplate = `[known] + [unknown] = [target]`;
        questionRendered = `${known} + ___ = ${target}`;
    }

    // Word problem variant
    if (randomChoice(params.question_styles) === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        questionTemplate = `[name] has [known] [item]. How many more [item] are needed to make [target]?`;
        questionRendered = `${name} has ${known} ${item}. How many more ${item} are needed to make ${target}?`;
    }

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    const values = { known, target, unknown: answer, name: getRandomName(), item: getRandomItem() };
    const valueMetadata = {
        known: { type: "number", prefix: "", suffix: "", decimals: 0 },
        target: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 },
        name: { type: "string", prefix: "", suffix: "", decimals: 0 },
        item: { type: "string", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: answer,
        hintTemplate: `Think: [known] + [unknown] = [target]`,
        hintRendered: `Think: ${known} + ___ = ${target}`,
        locale: 'en-GB',
        universal: true,
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
            givenTemplate: `[a] + [b] = [sum]`,
            givenRendered: `${a} + ${b} = ${sum}`,
            questionTemplate: `What is [sum] - [b]?`,
            questionRendered: `What is ${sum} - ${b}?`,
            answer: a
        },
        {
            givenTemplate: `[a] + [b] = [sum]`,
            givenRendered: `${a} + ${b} = ${sum}`,
            questionTemplate: `What is [sum] - [a]?`,
            questionRendered: `What is ${sum} - ${a}?`,
            answer: b
        },
        {
            givenTemplate: `[sum] - [a] = [b]`,
            givenRendered: `${sum} - ${a} = ${b}`,
            questionTemplate: `What is [a] + [b]?`,
            questionRendered: `What is ${a} + ${b}?`,
            answer: sum
        },
        {
            givenTemplate: `[sum] - [b] = [a]`,
            givenRendered: `${sum} - ${b} = ${a}`,
            questionTemplate: `What is [b] + [a]?`,
            questionRendered: `What is ${b} + ${a}?`,
            answer: sum
        }
    ];

    const fact = randomChoice(factTypes);
    const questionTemplate = `If ${fact.givenTemplate}, then ${fact.questionTemplate}`;
    const questionRendered = `If ${fact.givenRendered}, then ${fact.questionRendered}`;

    const distractors = generateDistractors(fact.answer, 3, 0, params.max_value);
    const options = shuffle([fact.answer, ...distractors]);

    const values = { a, b, sum };
    const valueMetadata = {
        a: { type: "number", prefix: "", suffix: "", decimals: 0 },
        b: { type: "number", prefix: "", suffix: "", decimals: 0 },
        sum: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: fact.answer,
        hintTemplate: 'Addition and subtraction are related',
        hintRendered: 'Addition and subtraction are related',
        locale: 'en-GB',
        universal: true,
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
        let questionTemplate, questionRendered;

        if (style === 'word_problem') {
            const context = getAdditionContext(a, b, answer);
            questionTemplate = context.text; // Context already has placeholders in some cases
            questionRendered = context.text;
        } else {
            questionTemplate = `[a] + [b] = ?`;
            questionRendered = `${a} + ${b} = ?`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        const values = { a, b };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        return {
            questionTemplate,
            questionRendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate: `Count on from [a]`,
            hintRendered: `Count on from ${a}`,
            locale: 'en-GB',
            universal: true,
            module: 'C01_Y1_CALC',
            level: level
        };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value, { maxMinuend: params.max_value });

        const style = randomChoice(params.question_styles);
        let questionTemplate, questionRendered;

        if (style === 'word_problem') {
            const context = getSubtractionContext(a, b, answer);
            questionTemplate = context.text;
            questionRendered = context.text;
        } else {
            questionTemplate = `[a] - [b] = ?`;
            questionRendered = `${a} - ${b} = ?`;
        }

        const distractors = generateDistractors(answer, 3, 0, params.max_value);
        const options = shuffle([answer, ...distractors]);

        const values = { a, b };
        const valueMetadata = {
            a: { type: "number", prefix: "", suffix: "", decimals: 0 },
            b: { type: "number", prefix: "", suffix: "", decimals: 0 }
        };

        return {
            questionTemplate,
            questionRendered,
            type: 'multiple_choice',
            values,
            valueMetadata,
            options: options,
            answer: answer,
            hintTemplate: `Count back from [a]`,
            hintRendered: `Count back from ${a}`,
            locale: 'en-GB',
            universal: true,
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

    const questionTemplate = `These facts are in the same family: ${factsText}. Which fact completes the family?`;
    const questionRendered = questionTemplate; // Same for this operation

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

    const values = { smaller, larger, sum };
    const valueMetadata = {
        smaller: { type: "number", prefix: "", suffix: "", decimals: 0 },
        larger: { type: "number", prefix: "", suffix: "", decimals: 0 },
        sum: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    return {
        questionTemplate,
        questionRendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: missingFact, // String answer (expression)
        hintTemplate: `All facts use the numbers [smaller], [larger], and [sum]`,
        hintRendered: `All facts use the numbers ${smaller}, ${larger}, and ${sum}`,
        locale: 'en-GB',
        universal: true,
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
            template: `[part1] + [part2] + [part3] = ?`,
            rendered: `${part1} + ${part2} + ${part3} = ?`,
            answer: target
        },
        {
            template: `I have [part1] red counters, [part2] blue counters, and [part3] green counters. How many counters altogether?`,
            rendered: `I have ${part1} red counters, ${part2} blue counters, and ${part3} green counters. How many counters altogether?`,
            answer: target
        },
        {
            template: `[target] is split into three parts: [part1], [part2], and [unknown]. What is the third part?`,
            rendered: `${target} is split into three parts: ${part1}, ${part2}, and ___. What is the third part?`,
            answer: part3
        }
    ];

    const question = randomChoice(questionTypes);
    const distractors = generateDistractors(question.answer, 3, 0, params.max_value);
    const options = shuffle([question.answer, ...distractors]);

    const values = { part1, part2, part3, target, unknown: part3 };
    const valueMetadata = {
        part1: { type: "number", prefix: "", suffix: "", decimals: 0 },
        part2: { type: "number", prefix: "", suffix: "", decimals: 0 },
        part3: { type: "number", prefix: "", suffix: "", decimals: 0 },
        target: { type: "number", prefix: "", suffix: "", decimals: 0 },
        unknown: { type: "number", prefix: "", suffix: "", decimals: 0 }
    };

    const hintTemplate = question.answer === target ? `Add all three numbers` : `Subtract the two parts from [target]`;
    const hintRendered = question.answer === target ? `Add all three numbers` : `Subtract the two parts from ${target}`;

    return {
        questionTemplate: question.template,
        questionRendered: question.rendered,
        type: 'multiple_choice',
        values,
        valueMetadata,
        options: options,
        answer: question.answer,
        hintTemplate,
        hintRendered,
        locale: 'en-GB',
        universal: true,
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
