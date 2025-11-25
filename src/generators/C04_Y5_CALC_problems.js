/**
 * Year 5 Problem Solving Generator (Multi-Step)
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const start = randomInt(math.range.min, math.range.max);
    const ans = start + 100 - 50 + 25;
    
    return {
        text: `Shop has ${start} items. 100 arrive, 50 sold, 25 returned. Total?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `3 steps`,
        module: 'C04_Y5_CALC',
        level
    };
}

export default { moduleId: 'C04_Y5_CALC', generate: generateQuestion };