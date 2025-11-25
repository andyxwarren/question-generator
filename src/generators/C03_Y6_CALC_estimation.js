/**
 * Year 6 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    return generateContextRounding(params, level);
}

function generateContextRounding(params, level) {
    const q = {
        text: "For a stadium crowd of 45,678, what is the best rounding?",
        options: ["Nearest 10", "Nearest 10,000", "Nearest 1"],
        answer: "Nearest 10,000"
    };
    return {
        text: q.text,
        type: 'multiple_choice',
        options: shuffle(q.options),
        answer: q.answer,
        hint: "Think about appropriate accuracy",
        module: 'C03_Y6_CALC',
        level
    };
}

export default { moduleId: 'C03_Y6_CALC', generate: generateQuestion };