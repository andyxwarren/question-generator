/**
 * Year 5 Factor Problems
 * Schema: V2
 */
import { randomInt, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const num = 24;
    const text = `How many factors does ${num} have?`;
    // 1, 2, 3, 4, 6, 8, 12, 24 = 8 factors
    const ans = 8;
    const opts = shuffle([6, 8, 10]);
    
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `List them all`, module: 'C08_Y5_CALC', level };
}
export default { moduleId: 'C08_Y5_CALC', generate: generateQuestion };