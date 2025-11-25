/**
 * Year 2 Mental Multiplication
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const flatParams = {
        tables: math.tables,
        min_multiplier: math.multiplier.min,
        max_multiplier: math.multiplier.max,
        max_product: math.product.max
    };

    if(operation === 'multiply_recall') return generateMultiplyRecall(flatParams, level);
    return generateMultiplyRecall(flatParams, level);
}

function generateMultiplyRecall(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = table * mult;
    const text = `${table} × ${mult} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_product)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Count in ${table}s`, module: 'C06_Y2_CALC', level };
}
export default { moduleId: 'C06_Y2_CALC', generate: generateQuestion };