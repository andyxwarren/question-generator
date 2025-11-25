/**
 * Year 1 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { generateAddition, generateSubtraction, getRandomName, getRandomItem, getAdditionContext, getSubtractionContext } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    // Flatten params for helpers
    const flatParams = {
        max_value: math.range.max,
        target_numbers: math.targets,
        allow_zero: math.config.allowZero,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'number_bonds': return generateNumberBonds(flatParams, level);
        case 'missing_part': return generateMissingPart(flatParams, level);
        case 'related_facts': return generateRelatedFacts(flatParams, level);
        case 'simple_add_sub': return generateSimpleAddSub(flatParams, level);
        case 'fact_families': return generateFactFamilies(flatParams, level);
        case 'mixed_operations': return generateMixedOperations(flatParams, level);
        case 'two_step_bonds': return generateTwoStepBonds(flatParams, level);
        default: return generateNumberBonds(flatParams, level);
    }
}

function generateNumberBonds(params, level) {
    const target = randomChoice(params.target_numbers);
    const a = randomInt(params.allow_zero ? 0 : 1, target);
    const b = target - a;
    const q = randomChoice([
        { text: `What number do you add to ${a} to make ${target}?`, answer: b },
        { text: `${a} and ___ make ${target}`, answer: b },
        { text: `Find missing: ${a} + ___ = ${target}`, answer: b }
    ]);
    const opts = shuffle([b, ...generateDistractors(b, 3, 0, target)]);
    return { text: q.text, type: 'multiple_choice', options: opts, answer: b.toString(), hint: `${a} + ${b} = ${target}`, module: 'C01_Y1_CALC', level };
}

function generateMissingPart(params, level) {
    const target = randomInt(5, params.max_value);
    const known = randomInt(params.allow_zero ? 0 : 1, target - 1);
    const ans = target - known;
    const text = randomChoice([`___ + ${known} = ${target}`, `${known} + ___ = ${target}`]);
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `${known} + ___ = ${target}`, module: 'C01_Y1_CALC', level };
}

function generateRelatedFacts(params, level) {
    const sum = randomInt(5, params.max_value);
    const a = randomInt(1, sum - 1);
    const b = sum - a;
    const q = randomChoice([
        { given: `${a} + ${b} = ${sum}`, ask: `${sum} - ${b}?`, ans: a },
        { given: `${sum} - ${a} = ${b}`, ask: `${a} + ${b}?`, ans: sum }
    ]);
    const opts = shuffle([q.ans, ...generateDistractors(q.ans, 3, 0, params.max_value)]);
    return { text: `If ${q.given}, then what is ${q.ask}`, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: 'Inverse operations', module: 'C01_Y1_CALC', level };
}

function generateSimpleAddSub(params, level) {
    const op = randomChoice(['add', 'subtract']);
    if (op === 'add') {
        const { a, b, answer } = generateAddition(2, params.max_value);
        const text = `${a} + ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Count on`, module: 'C01_Y1_CALC', level };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value, { maxMinuend: params.max_value });
        const text = `${a} - ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Count back`, module: 'C01_Y1_CALC', level };
    }
}

function generateFactFamilies(params, level) {
    const sum = randomInt(5, params.max_value);
    const a = randomInt(1, sum - 1);
    const b = sum - a;
    const family = [`${a} + ${b} = ${sum}`, `${b} + ${a} = ${sum}`, `${sum} - ${a} = ${b}`, `${sum} - ${b} = ${a}`];
    const missIdx = randomInt(0, 3);
    const shown = family.filter((_, i) => i !== missIdx);
    const opts = shuffle([family[missIdx], `${a} + ${b} = ${sum+1}`, `${sum} - ${a} = ${b+1}`]); // Simple distractors
    return { text: `Complete family: ${shown.join(', ')}. Missing?`, type: 'multiple_choice', options: opts, answer: family[missIdx], hint: `Use ${a}, ${b}, ${sum}`, module: 'C01_Y1_CALC', level };
}

function generateMixedOperations(params, level) {
    const subOps = ['number_bonds', 'missing_part', 'simple_add_sub'];
    params.operations = [randomChoice(subOps)];
    return generateQuestion({ operations: params.operations, math: { range: { max: params.max_value }, targets: params.target_numbers, config: { allowZero: params.allow_zero } }, presentation: { styles: params.question_styles } }, level);
}

function generateTwoStepBonds(params, level) {
    const target = randomChoice(params.target_numbers);
    const p1 = randomInt(1, Math.floor(target/2));
    const rem = target - p1;
    const p2 = randomInt(1, rem - 1);
    const p3 = rem - p2;
    const q = `${p1} + ${p2} + ${p3} = ?`;
    const opts = shuffle([target, target+1, target-1, target+2]);
    return { text: q, type: 'multiple_choice', options: opts, answer: target.toString(), hint: `Add all parts`, module: 'C01_Y1_CALC', level };
}

export default {
    moduleId: 'C01_Y1_CALC',
    generate: generateQuestion
};