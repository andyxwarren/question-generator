/**
 * Year 2 Written Statements
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        tables: math.tables,
        min_multiplier: math.multiplier.min,
        max_multiplier: math.multiplier.max
    };

    if(operation === 'write_multiplication') return generateWriteMultiplication(flatParams, level);
    return generateCalculate(flatParams, level);
}

function generateWriteMultiplication(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = `${mult} × ${table} = ${mult*table}`;
    const text = `Write "${mult} groups of ${table}" as a calculation.`;
    const opts = shuffle([ans, `${mult} + ${table} = ${mult+table}`, `${table} ÷ ${mult}`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: `Use × symbol`, module: 'C07_Y2_CALC', level };
}

function generateCalculate(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = table * mult;
    return { text: `${table} × ${mult} = ?`, type: 'text_input', answer: ans.toString(), hint: `Use times tables`, module: 'C07_Y2_CALC', level };
}

export default { moduleId: 'C07_Y2_CALC', generate: generateQuestion };