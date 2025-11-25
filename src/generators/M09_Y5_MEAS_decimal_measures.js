/**
 * Year 5 Decimal Measures Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    if (operation === 'multiply_decimal') {
        const mult = randomChoice(math.mult);
        // Generate decimal value
        const whole = randomInt(math.money.range[0], math.money.range[1]);
        const dec = randomChoice([0.25, 0.50, 0.75]);
        const val = whole + dec;
        
        const ans = val * mult;
        
        return {
            text: `Fabric costs £${val.toFixed(2)} per metre. Cost of ${mult} metres?`,
            type: 'text_input',
            answer: ans.toFixed(2),
            hint: `Multiply decimal`,
            module: 'M09_Y5_MEAS',
            level
        };
    } 
    
    // Add decimal
    const v1 = randomInt(1, 5) + randomChoice([0.1, 0.2, 0.5]);
    const v2 = randomInt(1, 5) + randomChoice([0.3, 0.4, 0.5]);
    const ans = (v1 + v2).toFixed(1);
    
    return {
        text: `Jug A: ${v1.toFixed(1)} litres. Jug B: ${v2.toFixed(1)} litres. Total?`,
        type: 'text_input',
        answer: ans,
        hint: `Align decimal points`,
        module: 'M09_Y5_MEAS',
        level
    };
}

export default { moduleId: 'M09_Y5_MEAS', generate: generateQuestion };