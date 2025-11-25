/**
 * Year 3 Time
 * Schema: V2
 */
import { randomChoice, format24Hour } from './helpers/M04_timeHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    
    if (math.roman) {
        return { text: "What number is IX on a clock?", type: "text_input", answer: "9", module: 'M04_Y3_MEAS', level };
    }
    
    const h = randomChoice(math.hours24 || [13, 14, 15]);
    return { text: `Write ${h}:00 in 12-hour time using p.m.`, type: "text_input", answer: `${h-12}:00 p.m.`, module: 'M04_Y3_MEAS', level };
}
export default { moduleId: 'M04_Y3_MEAS', generate: generateQuestion };