/**
 * Year 3 Number Problems Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
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
        case 'representation_problems': return generateRepresentationProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingProblem(flatParams, level);
    }
}

function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const numSteps = randomInt(2, Math.min(params.max_steps, 8));
    const answer = step * numSteps;
    if (answer > params.max_value) return generateCountingProblem(params, level);

    const text = `A bag has ${step} marbles. How many marbles in ${numSteps} bags?`;
    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return { text, type: 'multiple_choice', options, answer: answer.toString(), hint: `${step} × ${numSteps}`, module: 'N06_Y3_NPV', level };
}

function generatePlaceValueProblem(params, level) {
    const num = randomInt(100, Math.min(999, params.max_value));
    const hundreds = Math.floor(num/100);
    const tens = Math.floor((num%100)/10);
    const ones = num%10;
    const text = `Number with ${hundreds} hundreds, ${tens} tens, ${ones} ones?`;
    const options = shuffle([num, ...generateDistractors(num, 3, 100, params.max_value)]);
    
    return { text, type: 'multiple_choice', options, answer: num.toString(), hint: 'Combine place values', module: 'N06_Y3_NPV', level };
}

function generateComparisonProblem(params, level) {
    const n1 = randomInt(100, params.max_value);
    const n2 = randomInt(100, params.max_value);
    if (n1 === n2) return generateComparisonProblem(params, level);
    
    const text = `Who has more points: Team A (${n1}) or Team B (${n2})?`;
    const ans = n1 > n2 ? 'Team A' : 'Team B';
    
    return { text, type: 'multiple_choice', options: ['Team A', 'Team B'], answer: ans, hint: 'Compare numbers', module: 'N06_Y3_NPV', level };
}

function generateRepresentationProblem(params, level) {
    const num = randomInt(100, params.max_value);
    const text = `Which number is closest to ${num}: ${num-10}, ${num+100}, ${num+1}?`;
    const options = shuffle([num-10, num+100, num+1]);
    // Simple logic for example
    const ans = num+1;
    return { text: `Which number is closest to ${num}?`, type: 'multiple_choice', options, answer: ans.toString(), hint: 'Find smallest difference', module: 'N06_Y3_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const start = randomInt(100, params.max_value - 200);
    const add1 = 10, add2 = 100;
    const ans = start + add1 + add2;
    const text = `Start at ${start}. Add 10, then add 100. Result?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 100, params.max_value)]);
    
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start}+10+100`, module: 'N06_Y3_NPV', level };
}

export default {
    moduleId: 'N06_Y3_NPV',
    generate: generateQuestion
};