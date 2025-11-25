/**
 * Year 3 Scaling Problems
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const scale = randomChoice(math.scaling);
    const cost = randomInt(2, 10);
    const ans = cost * scale;
    const text = `One book costs £${cost}. How much do ${scale} books cost?`;
    
    return { text, type: 'text_input', answer: ans.toString(), hint: `${cost} x ${scale}`, module: 'C08_Y3_CALC', level };
}
export default { moduleId: 'C08_Y3_CALC', generate: generateQuestion };