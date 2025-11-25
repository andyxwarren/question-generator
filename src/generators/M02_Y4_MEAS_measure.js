/**
 * Year 4 Estimate Measures
 * Schema: V2
 */
import { randomChoice, shuffle } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const obj = randomChoice(math.ranges[type].objects);
    const unit = math.ranges[type].units[0];
    
    const qMap = {
        'pencil': { val: 15, opts: [15, 2, 50, 100] },
        'book': { val: 25, opts: [25, 5, 100, 1000] }
    };
    const data = qMap[obj] || { val: 10, opts: [10, 1, 100] };

    return {
        text: `Estimate the ${type} of a ${obj}`,
        type: 'multiple_choice',
        options: shuffle(data.opts.map(x => `${x}${unit}`)),
        answer: `${data.val}${unit}`,
        module: 'M02_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M02_Y4_MEAS', generate: generateQuestion };