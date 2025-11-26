/**
 * Year 4 Mental Multiplication
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    // Calculate reasonable max_product if not defined
    const maxTable = Math.max(...math.tables);
    const maxMultiplier = math.multiplier?.max || 12;
    const defaultMaxProduct = maxTable * maxMultiplier;

    const flatParams = {
        tables: math.tables,
        min_multiplier: math.multiplier?.min || 1,
        max_multiplier: maxMultiplier,
        max_product: math.product?.max || defaultMaxProduct
    };

    if(operation === 'multiply_three') return generateMultiplyThree(flatParams, level);
    return generateMultiplyRecall(flatParams, level);
}

function generateMultiplyRecall(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = table * mult;
    const text = `${table} × ${mult} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_product)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Count in ${table}s`, module: 'C06_Y4_CALC', level };
}

function generateMultiplyThree(params, level) {
    const a = randomInt(2, 5);
    const b = randomInt(2, 5);
    const c = randomInt(2, 5);
    const ans = a * b * c;
    const text = `${a} × ${b} × ${c} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_product)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Multiply first two, then result by third`, module: 'C06_Y4_CALC', level };
}

export default { moduleId: 'C06_Y4_CALC', generate: generateQuestion };