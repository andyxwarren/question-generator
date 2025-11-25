/**
 * M09 Y2: Money Problems Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min: math.range.min,
        max: math.range.max,
        totalMax: math.totalMax,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'add_money': return generateAddMoney(flatParams, level);
        case 'subtract_money': return generateSubtractMoney(flatParams, level);
        default: return generateAddMoney(flatParams, level);
    }
}

function generateAddMoney(params, level) {
    const item1 = randomInt(params.min, params.max);
    const item2 = randomInt(params.min, params.max);
    // Ensure total doesn't exceed limit if specified
    if (params.totalMax && (item1 + item2 > params.totalMax)) {
        return generateAddMoney(params, level);
    }
    
    const answer = item1 + item2;
    const text = `A toy costs ${item1}p and a sweet costs ${item2}p. How much do they cost altogether?`;
    const options = shuffle([answer, answer+10, answer-5, item1+item2+5]);
    
    return {
        text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${item1} + ${item2}`,
        module: 'M09_Y2_MEAS',
        level
    };
}

function generateSubtractMoney(params, level) {
    const total = randomInt(params.min + 10, params.max);
    const spent = randomInt(5, total - 5);
    const answer = total - spent;
    
    const text = `You have ${total}p. You buy a sticker for ${spent}p. How much change do you have?`;
    const options = shuffle([answer, answer+5, answer-2, total]);
    
    return {
        text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${total} - ${spent}`,
        module: 'M09_Y2_MEAS',
        level
    };
}

export default { moduleId: 'M09_Y2_MEAS', generate: generateQuestion };