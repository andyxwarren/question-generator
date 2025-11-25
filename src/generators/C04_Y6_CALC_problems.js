/**
 * Year 6 Problem Solving Generator (Advanced)
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const start = randomInt(math.range.min, math.range.max);
    const ans = start * 2 + 500;
    
    return {
        text: `City pop ${start}. Doubles, then 500 move in. Total?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `Multi-step with large numbers`,
        module: 'C04_Y6_CALC',
        level
    };
}

export default { moduleId: 'C04_Y6_CALC', generate: generateQuestion };