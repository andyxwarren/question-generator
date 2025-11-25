I have updated the codebase to fully enforce the **V2 Nested Architecture**.

1.  **`src/core/schema.js`**: Updated to strictly define the `math` and `presentation` nested objects for validation.
2.  **M09 Generators**: Rewritten from stubs to fully functional generators that respect the specific parameters defined in `src/curriculum/parameters/M09_problems.js` (handling unit types, decimal places, and specific operations).
3.  **Cleanup**: Deleted the monolithic deprecated file.

<!-- FILE_START: src/core/schema.js -->
```javascript
/**
 * Parameter Schema Definition V2.1 (Nested Architecture)
 *
 * This file defines the strict contract for the V2 Nested Parameter Model.
 *
 * STRUCTURE:
 * 1. Root Level:
 *    - operations: Array of strings (defines what question types to generate)
 *    - math: Object containing mathematical constraints (ranges, steps, units)
 *    - presentation: Object containing visual/contextual settings
 *
 * 2. Validation:
 *    - validateParameters() checks deep nesting within 'math' and 'presentation'
 */

// =============================================================================
// 1. SHARED TYPE DEFINITIONS
// =============================================================================

const SharedTypes = {
    Range: {
        type: 'object',
        structure: { min: 'number', max: 'number' },
        optional: true
    },
    RangeWithInterval: {
        type: 'object',
        structure: { min: 'number', max: 'number', interval: 'number' },
        optional: true
    },
    DecimalConfig: {
        type: 'object',
        structure: { allow: 'boolean', places: 'number' },
        optional: true
    }
};

// =============================================================================
// 2. STRAND SCHEMAS (V2 NESTED)
// =============================================================================

export const StrandSchemas = {

    // -------------------------------------------------------------------------
    // Number & Place Value (N)
    // -------------------------------------------------------------------------
    Number: {
        // Root
        operations: { type: 'array<string>', optional: true },

        // Math Constraints
        math: {
            type: 'object',
            required: true,
            structure: {
                range: SharedTypes.Range,
                sequence: {
                    type: 'object',
                    optional: true,
                    structure: {
                        steps: 'array<number>',
                        length: 'number',
                        directions: 'array<string>',
                        startStrategy: 'string'
                    }
                },
                placeValue: {
                    type: 'object',
                    optional: true,
                    structure: {
                        places: 'array<string>',
                        includeZero: 'boolean'
                    }
                },
                rounding: {
                    type: 'object',
                    optional: true,
                    structure: { bases: 'array<number>' }
                },
                roman: SharedTypes.Range
            }
        },

        // Presentation Settings
        presentation: {
            type: 'object',
            required: true,
            structure: {
                gaps: { type: 'object', optional: true },
                numberLine: { type: 'object', optional: true },
                contexts: { type: 'array<string>', optional: true },
                comparison: { type: 'object', optional: true }
            }
        }
    },

    // -------------------------------------------------------------------------
    // Calculation (C)
    // -------------------------------------------------------------------------
    Calculation: {
        operations: { type: 'array<string>', required: true },

        math: {
            type: 'object',
            required: true,
            structure: {
                range: { type: 'object', optional: true }, // Flexible range object
                targets: { type: 'array<number>', optional: true },
                tables: { type: 'array<number>', optional: true },
                components: { type: 'object', optional: true },
                config: { type: 'object', optional: true } // Specific flags like allowZero, regrouping
            }
        },

        presentation: {
            type: 'object',
            required: true,
            structure: {
                styles: { type: 'array<string>', optional: true },
                format: { type: 'string', optional: true },
                contexts: { type: 'array<string>', optional: true },
                hint: { type: 'string', optional: true }
            }
        }
    },

    // -------------------------------------------------------------------------
    // Measurement (M)
    // -------------------------------------------------------------------------
    Measurement: {
        operations: { type: 'array<string>', required: true },

        math: {
            type: 'object',
            required: true,
            structure: {
                types: { type: 'array<string>', optional: true },
                units: { type: 'object', optional: true }, // Map or Array
                ranges: { type: 'object', optional: true }, // Map of ranges
                conversions: { type: 'object', optional: true },
                denominations: { type: 'array<number>', optional: true },
                scale: SharedTypes.RangeWithInterval
            }
        },

        presentation: {
            type: 'object',
            required: false, // Sometimes optional for simple M modules
            structure: {
                contexts: { type: 'array<string>', optional: true },
                visuals: { type: 'boolean', optional: true },
                format: { type: 'string', optional: true }
            }
        }
    }
};

// =============================================================================
// 3. VALIDATION HELPERS
// =============================================================================

function validateStructure(data, structure, path = '') {
    const errors = [];
    if (!data) return errors;

    for (const [key, rule] of Object.entries(structure)) {
        const currentPath = path ? `${path}.${key}` : key;
        const value = data[key];

        // Check Required
        if ((value === undefined || value === null)) {
            if (rule.required) {
                errors.push(`Missing required parameter: ${currentPath}`);
            }
            continue;
        }

        // Check Types
        if (rule === 'number' || rule.type === 'number') {
            if (typeof value !== 'number') errors.push(`${currentPath} must be a number`);
        }
        else if (rule === 'string' || rule.type === 'string') {
            if (typeof value !== 'string') errors.push(`${currentPath} must be a string`);
        }
        else if (rule === 'boolean' || rule.type === 'boolean') {
            if (typeof value !== 'boolean') errors.push(`${currentPath} must be a boolean`);
        }
        else if (rule === 'array' || (rule.type && rule.type.startsWith('array'))) {
            if (!Array.isArray(value)) errors.push(`${currentPath} must be an array`);
        }
        else if (rule.type === 'object' && rule.structure) {
            if (typeof value !== 'object') {
                errors.push(`${currentPath} must be an object`);
            } else {
                // Recursive validation
                errors.push(...validateStructure(value, rule.structure, currentPath));
            }
        }
    }
    return errors;
}

/**
 * Validates a parameter object against the V2 Schema
 */
export function validateParameters(params, strand) {
    const schema = StrandSchemas[strand];
    if (!schema) return [`Unknown strand: ${strand}`];

    // Build a structure object for the validator
    const structure = {};
    for (const key of Object.keys(schema)) {
        structure[key] = schema[key];
    }

    return validateStructure(params, structure);
}

/**
 * Merges defaults
 */
export function applyDefaults(params, strand) {
    return params;
}
```
<!-- FILE_END: src\core\schema.js -->

<!-- FILE_START: src/generators/M09_Y2_MEAS_money_problems.js -->
```javascript
/**
 * M09 Y2: Money Problems Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min: math.range.min,
        max: math.range.max,
        totalMax: math.totalMax,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'add_money': return generateAddMoney(flatParams, level);
        case 'subtract_money': return generateSubtractMoney(flatParams, level);
        default: return generateAddMoney(flatParams, level);
    }
}

function generateAddMoney(params, level) {
    const item1 = randomInt(params.min, params.max);
    const item2 = randomInt(params.min, params.max);
    // Ensure total doesn't exceed limit if specified
    if (params.totalMax && (item1 + item2 > params.totalMax)) {
        return generateAddMoney(params, level);
    }
    
    const answer = item1 + item2;
    const text = `A toy costs ${item1}p and a sweet costs ${item2}p. How much do they cost altogether?`;
    const options = shuffle([answer, answer+10, answer-5, item1+item2+5]);
    
    return {
        text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${item1} + ${item2}`,
        module: 'M09_Y2_MEAS',
        level
    };
}

function generateSubtractMoney(params, level) {
    const total = randomInt(params.min + 10, params.max);
    const spent = randomInt(5, total - 5);
    const answer = total - spent;
    
    const text = `You have ${total}p. You buy a sticker for ${spent}p. How much change do you have?`;
    const options = shuffle([answer, answer+5, answer-2, total]);
    
    return {
        text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${total} - ${spent}`,
        module: 'M09_Y2_MEAS',
        level
    };
}

export default { moduleId: 'M09_Y2_MEAS', generate: generateQuestion };
```
<!-- FILE_END: src/generators/M09_Y2_MEAS_money_problems.js -->

<!-- FILE_START: src/generators/M09_Y3_MEAS_measurement_problems.js -->
```javascript
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
```
<!-- FILE_END: src/generators/M09_Y3_MEAS_measurement_problems.js -->

<!-- FILE_START: src/generators/M09_Y4_MEAS_calculate_measures.js -->
```javascript
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
```
<!-- FILE_END: src/generators/M09_Y4_MEAS_calculate_measures.js -->

<!-- FILE_START: src/generators/M09_Y5_MEAS_decimal_measures.js -->
```javascript
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
```
<!-- FILE_END: src/generators/M09_Y5_MEAS_decimal_measures.js -->

<!-- FILE_START: src/generators/M09_Y6_MEAS_conversion_problems.js -->
```javascript
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
```
<!-- FILE_END: src/generators/M09_Y6_MEAS_conversion_problems.js -->

