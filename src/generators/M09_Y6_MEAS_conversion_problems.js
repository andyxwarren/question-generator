/**
 * Year 6 Conversion Problems Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    if (operation === 'convert_length') {
        const type = randomChoice(math.conversions.length); // e.g. km_to_m
        const range = math.range.km;
        
        // Generate a value with optional decimal
        const isDecimal = Math.random() > 0.5;
        let val = randomInt(Math.ceil(range[0]), Math.floor(range[1]));
        if (isDecimal) val += 0.5;
        
        if (type === 'km_to_m') {
            const ans = val * 1000;
            return {
                text: `A road is ${val}km long. How many metres?`,
                type: 'text_input',
                answer: ans.toString(),
                hint: `x 1000`,
                module: 'M09_Y6_MEAS',
                level
            };
        }
    }
    
    if (operation === 'convert_mass') {
        const val = randomInt(1, 5) + (Math.random() > 0.5 ? 0.5 : 0);
        const ans = val * 1000;
        return {
            text: `Bag weighs ${val}kg. Weight in grams?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `x 1000`,
            module: 'M09_Y6_MEAS',
            level
        };
    }

    // Fallback
    return { text: "Convert 1.5km to m", type: "text_input", answer: "1500", module: 'M09_Y6_MEAS', level };
}

export default { moduleId: 'M09_Y6_MEAS', generate: generateQuestion };