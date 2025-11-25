/**
 * Year 1 Properties Problems
 * Schema: V2
 */
import { randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const table = randomChoice(math.tables);
    const groups = 2; 
    const ans = table * groups;
    const text = `There are ${groups} groups of ${table}. How many altogether?`;
    const opts = shuffle([ans, ans+1, ans-1]);
    
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Count them`, module: 'C08_Y1_CALC', level };
}
export default { moduleId: 'C08_Y1_CALC', generate: generateQuestion };