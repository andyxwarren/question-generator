/**
 * Year 2 Time
 * Schema: V2
 */
import { randomChoice } from './helpers/M04_timeHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const min = randomChoice(math.minutes);
    return {
        text: `Clock shows ${min} minutes past. What does the long hand point to?`,
        type: 'text_input',
        answer: (min/5).toString(),
        hint: `Divide minutes by 5`,
        module: 'M04_Y2_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y2_MEAS', generate: generateQuestion };