/**
 * Year 4 Four Operations Measures Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const type = randomChoice(math.types);

    if (operation === 'multiply_measure') {
        const mult = randomChoice(math.mult);
        
        if (type === 'money') {
            const cost = randomInt(math.money.range[0], math.money.range[1]);
            const ans = cost * mult;
            return {
                text: `One ticket costs £${cost}. How much for ${mult} tickets?`,
                type: 'text_input',
                answer: ans.toString(),
                hint: `${cost} x ${mult}`,
                module: 'M09_Y4_MEAS',
                level
            };
        } else {
            // Length
            const len = randomInt(5, 25);
            const ans = len * mult;
            return {
                text: `One tile is ${len}cm long. Length of ${mult} tiles in a row?`,
                type: 'text_input',
                answer: ans.toString(),
                hint: `${len} x ${mult}`,
                module: 'M09_Y4_MEAS',
                level
            };
        }
    } 
    
    // Divide
    if (type === 'money') {
        const itemCost = randomInt(math.money.range[0], math.money.range[1]);
        const count = randomChoice([2, 3, 4, 5]);
        const total = itemCost * count;
        return {
            text: `£${total} is shared equally among ${count} people. How much each?`,
            type: 'text_input',
            answer: itemCost.toString(),
            hint: `${total} ÷ ${count}`,
            module: 'M09_Y4_MEAS',
            level
        };
    } else {
        const len = randomInt(50, 100);
        const count = randomChoice([2, 4, 5, 10]);
        // Ensure divisible
        const total = Math.ceil(len/count) * count; 
        const ans = total / count;
        return {
            text: `Cut ${total}cm tape into ${count} equal pieces. Length of one piece?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `${total} ÷ ${count}`,
            module: 'M09_Y4_MEAS',
            level
        };
    }
}

export default { moduleId: 'M09_Y4_MEAS', generate: generateQuestion };