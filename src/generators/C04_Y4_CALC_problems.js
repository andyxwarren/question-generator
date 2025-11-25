/**
 * Year 4 Problem Solving Generator (Two-Step)
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const start = randomInt(math.range.min, math.range.max);
    const add = 50;
    const sub = 20;
    const ans = start + add - sub;
    
    return {
        text: `Start with ${start}. Add ${add}, then subtract ${sub}. Answer?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `Two steps`,
        module: 'C04_Y4_CALC',
        level
    };
}

export default { moduleId: 'C04_Y4_CALC', generate: generateQuestion };