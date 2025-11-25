/**
 * M01 Y1: Comparison
 * Schema: V2
 */
import { randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const op = randomChoice(operations);
    const type = randomChoice(math.types);

    if (op === 'compare_two') {
        // Mock items based on type
        const items = type === 'length' ? ['pencil', 'ruler'] : ['feather', 'stone'];
        const q = `Which is ${type === 'length' ? 'longer' : 'heavier'}?`;
        return { text: `${q} ${items[0]} or ${items[1]}?`, type: 'multiple_choice', options: items, answer: items[1], module: 'M01_Y1_MEAS', level };
    }
    return { text: "Compare question", type: 'text_input', answer: "answer", module: 'M01_Y1_MEAS', level };
}
export default { moduleId: 'M01_Y1_MEAS', generate: generateQuestion };