/**
 * Year 4 Distributive Problems
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const a = 14, b = 3;
    const ans = a * b;
    const text = `Calculate 14 × 3 using (10 × 3) + (4 × 3)`;
    
    return { text, type: 'text_input', answer: ans.toString(), hint: `30 + 12`, module: 'C08_Y4_CALC', level };
}
export default { moduleId: 'C08_Y4_CALC', generate: generateQuestion };