/**
 * Year 6 Mixed Problems
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const val = randomInt(100, 500);
    const pct = 10;
    const ans = val / 10;
    const text = `Find ${pct}% of ${val}`;
    
    return { text, type: 'text_input', answer: ans.toString(), hint: `Divide by 10`, module: 'C08_Y6_CALC', level };
}
export default { moduleId: 'C08_Y6_CALC', generate: generateQuestion };