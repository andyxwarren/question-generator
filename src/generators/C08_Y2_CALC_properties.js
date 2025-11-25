/**
 * Year 2 Properties Problems
 * Schema: V2
 */
import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const table = randomChoice(math.tables);
    const groups = randomInt(2, 5);
    const ans = table * groups;
    const text = `${groups} bags of ${table} sweets. Total?`;
    const opts = shuffle([ans, ans+table, ans-1]);
    
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `${groups} x ${table}`, module: 'C08_Y2_CALC', level };
}
export default { moduleId: 'C08_Y2_CALC', generate: generateQuestion };