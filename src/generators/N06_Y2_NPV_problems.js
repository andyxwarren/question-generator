/**
 * Year 2 Number Problems Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    getComparisonSymbol,
    generateUniqueNumbers
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        step_sizes: math.sequence.steps,
        max_steps: math.steps.max,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'counting_problems': return generateCountingProblem(flatParams, level);
        case 'place_value_problems': return generatePlaceValueProblem(flatParams, level);
        case 'comparison_problems': return generateComparisonProblem(flatParams, level);
        case 'number_line_problems': return generateNumberLineProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingProblem(flatParams, level);
    }
}

function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const numSteps = randomInt(2, Math.min(params.max_steps, 6));
    const answer = step * numSteps;
    if (answer > params.max_value) return generateCountingProblem(params, level);

    const contexts = {
        simple: [{ text: `{name} has {numSteps} bags with {step} sweets. Total?`, type: 'groups' }, { text: `{name} counts in {step}s for {numSteps} times. Number?`, type: 'counting' }],
        varied: [{ text: `Toy costs {step}p. Cost of {numSteps}?`, type: 'money' }, { text: `{name} skips {numSteps} times, {step}cm each. Total distance?`, type: 'measurement' }],
        mixed: [{ text: `{step} mins per page. {numSteps} pages. Total time?`, type: 'time' }]
    };
    
    const type = randomChoice(params.contexts || ['simple']);
    const template = randomChoice(contexts[type] || contexts.simple);
    const name = randomChoice(['Emma', 'Liam', 'Olivia', 'Noah']);
    const text = template.text.replace('{name}', name).replace('{numSteps}', numSteps).replace('{step}', step);
    
    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return { text, type: 'multiple_choice', options, answer: answer.toString(), hint: `Count in ${step}s`, module: 'N06_Y2_NPV', level };
}

function generatePlaceValueProblem(params, level) {
    const type = randomChoice(['compose', 'decompose', 'add_tens']);
    if (type === 'compose') {
        const num = randomInt(10, Math.min(99, params.max_value));
        const tens = Math.floor(num/10), ones = num%10;
        const text = `Number with ${tens} tens and ${ones} ones?`;
        const options = shuffle([num, ...generateDistractors(num, 3, 10, params.max_value)]);
        return { text, type: 'multiple_choice', options, answer: num.toString(), hint: `${tens}0 + ${ones}`, module: 'N06_Y2_NPV', level };
    } else if (type === 'decompose') {
        const num = randomInt(10, Math.min(99, params.max_value));
        const text = `How many tens in ${num}?`;
        return { text, type: 'text_input', answer: Math.floor(num/10).toString(), hint: 'Look at tens digit', module: 'N06_Y2_NPV', level };
    } else {
        const start = randomInt(1, params.max_value - 20);
        const add = 10;
        const ans = start + add;
        const text = `What is 10 more than ${start}?`;
        const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
        return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `Add 10`, module: 'N06_Y2_NPV', level };
    }
}

function generateComparisonProblem(params, level) {
    const n1 = randomInt(10, params.max_value);
    const n2 = randomInt(10, params.max_value);
    if (n1 === n2) return generateComparisonProblem(params, level);
    
    const names = ['Lily', 'Tom'];
    const text = `${names[0]} has ${n1}. ${names[1]} has ${n2}. Who has more?`;
    const ans = n1 > n2 ? names[0] : names[1];
    
    return { text, type: 'multiple_choice', options: names, answer: ans, hint: `Compare ${n1} and ${n2}`, module: 'N06_Y2_NPV', level };
}

function generateNumberLineProblem(params, level) {
    const start = randomInt(0, params.max_value - 20);
    const jump = 10;
    const end = start + jump;
    const text = `Start at ${start}. Jump 10. Where do you land?`;
    const ans = end;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} + 10`, module: 'N06_Y2_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const step = randomChoice([2, 5, 10]);
    const count = 3;
    const result = step * count;
    const compare = result + randomInt(-5, 5);
    const text = `Count in ${step}s three times. Is result more or less than ${compare}?`;
    const ans = result > compare ? 'more' : 'less';
    
    return { text, type: 'multiple_choice', options: ['more', 'less'], answer: ans, hint: `${step}x3=${result}`, module: 'N06_Y2_NPV', level };
}

export default {
    moduleId: 'N06_Y2_NPV',
    generate: generateQuestion
};