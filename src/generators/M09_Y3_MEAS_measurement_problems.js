/**
 * Year 3 Measurement Problems Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    const type = randomChoice(math.types); // money or length

    if (type === 'money') {
        return generateMoneyProblem(operation, math.money, presentation, level);
    } else {
        return generateLengthProblem(operation, math.length, presentation, level);
    }
}

function generateMoneyProblem(op, config, pres, level) {
    const unit = config.unit === 'pence_only' ? 'p' : '£';
    const min = config.range[0];
    const max = config.range[1];

    if (op === 'add_measure') {
        const a = randomInt(min, max);
        const b = randomInt(min, max);
        const ans = a + b;
        return {
            text: `I buy a book for ${a}${unit} and a pen for ${b}${unit}. Total cost?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Add values`,
            module: 'M09_Y3_MEAS',
            level
        };
    } else {
        const start = randomInt(min + 20, max);
        const sub = randomInt(10, start - 10);
        const ans = start - sub;
        return {
            text: `I have ${start}${unit}. I spend ${sub}${unit}. Left?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Subtract`,
            module: 'M09_Y3_MEAS',
            level
        };
    }
}

function generateLengthProblem(op, config, pres, level) {
    const unit = config.unit;
    const min = config.range[0];
    const max = config.range[1];

    if (op === 'add_measure') {
        const a = randomInt(min, max);
        const b = randomInt(min, max);
        const ans = a + b;
        return {
            text: `Blue ribbon is ${a}${unit}. Red ribbon is ${b}${unit}. Total length?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Add lengths`,
            module: 'M09_Y3_MEAS',
            level
        };
    } else {
        const start = randomInt(min + 20, max);
        const cut = randomInt(10, start - 10);
        const ans = start - cut;
        return {
            text: `Rope is ${start}${unit}. Cut off ${cut}${unit}. Left?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Subtract`,
            module: 'M09_Y3_MEAS',
            level
        };
    }
}

export default { moduleId: 'M09_Y3_MEAS', generate: generateQuestion };