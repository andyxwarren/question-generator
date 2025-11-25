/**
 * Year 5 Mental Multiplication
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors, formatNumber } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        powers: math.powers,
        range_whole: math.range.whole,
        allow_decimals: math.decimals.allow,
        decimal_places: math.decimals.places
    };

    if(operation === 'multiply_by_10') return generateMultiplyPower(flatParams, 10, level);
    if(operation === 'multiply_by_100') return generateMultiplyPower(flatParams, 100, level);
    if(operation === 'multiply_by_1000') return generateMultiplyPower(flatParams, 1000, level);
    return generateMultiplyPower(flatParams, 10, level);
}

function generateMultiplyPower(params, power, level) {
    let num;
    if (params.allow_decimals && Math.random() < 0.5) {
        num = randomInt(1, 9) + randomChoice([0.1, 0.5, 0.01]);
    } else {
        num = randomInt(params.range_whole[0], params.range_whole[1]);
    }
    // Fix float precision
    num = parseFloat(num.toFixed(3));
    const ans = parseFloat((num * power).toFixed(3));
    
    const text = `${num} × ${power} = ?`;
    const opts = shuffle([ans, parseFloat((num * power * 10).toFixed(3)), parseFloat((num * power / 10).toFixed(3)), parseFloat((num + power).toFixed(3))]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Move decimal point`, module: 'C06_Y5_CALC', level };
}

export default { moduleId: 'C06_Y5_CALC', generate: generateQuestion };