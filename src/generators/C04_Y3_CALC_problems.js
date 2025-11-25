/**
 * Year 3 Problem Solving Generator
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const a = randomInt(math.range.min, math.range.max);
    const b = randomInt(10, 50);
    const ans = a + b;
    return {
        text: `There are ${a} books. ${b} more arrive. Total?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `${a} + ${b}`,
        module: 'C04_Y3_CALC',
        level
    };
}

export default { moduleId: 'C04_Y3_CALC', generate: generateQuestion };