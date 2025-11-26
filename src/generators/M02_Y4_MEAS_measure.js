/**
 * Year 4 Estimate Measures
 * Schema: V2
 */
import { randomChoice } from './helpers/M01_measurementHelpers.js';
import { shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;

    // Find types that have defined ranges
    const availableTypes = (math.types || []).filter(type =>
        math.ranges && math.ranges[type] && math.ranges[type].objects
    );

    if (availableTypes.length === 0) {
        return {
            text: 'Estimate the length of a pencil',
            type: 'multiple_choice',
            options: ['15cm', '2cm', '50cm', '100cm'],
            answer: '15cm',
            module: 'M02_Y4_MEAS',
            level
        };
    }

    const type = randomChoice(availableTypes);
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