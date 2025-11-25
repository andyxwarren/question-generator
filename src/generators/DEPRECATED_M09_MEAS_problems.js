/**
 * M09_MEAS: Measurement Problem Solving Generators
 * Covers Years 2-6 progression for solving problems with measurements
 *
 * Year 2: Money only (same unit), addition/subtraction, giving change
 * Year 3: All measures, addition/subtraction, mixed units
 * Year 4: All four operations, scaling problems
 * Year 5: Decimals, all operations, scaling, multi-step
 * Year 6: Unit conversions, 3 decimal places, area/volume
 */

import { getParameters } from '../curriculum/parameters.js';

/**
 * Helper: Format money value with appropriate symbol
 */
function formatMoney(value, asPounds = false) {
    if (asPounds) {
        return `£${value.toFixed(2)}`;
    } else {
        return `${Math.round(value)}p`;
    }
}

/**
 * Helper: Format length with appropriate unit
 */
function formatLength(valueInCm, useMixed = false) {
    if (valueInCm >= 100 && useMixed) {
        const m = Math.floor(valueInCm / 100);
        const cm = valueInCm % 100;
        if (cm === 0) return `${m}m`;
        return `${m}m ${cm}cm`;
    }
    return `${valueInCm}cm`;
}

/**
 * Helper: Format mass with appropriate unit
 */
function formatMass(valueInG, useMixed = false) {
    if (valueInG >= 1000 && useMixed) {
        const kg = Math.floor(valueInG / 1000);
        const g = valueInG % 1000;
        if (g === 0) return `${kg}kg`;
        return `${kg}kg ${g}g`;
    }
    return `${valueInG}g`;
}

/**
 * Helper: Format capacity with appropriate unit
 */
function formatCapacity(valueInMl, useMixed = false) {
    if (valueInMl >= 1000 && useMixed) {
        const l = Math.floor(valueInMl / 1000);
        const ml = valueInMl % 1000;
        if (ml === 0) return `${l}l`;
        return `${l}l ${ml}ml`;
    }
    return `${valueInMl}ml`;
}

/**
 * Helper: Random element from array
 */
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Helper: Random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Helper: Round to specified decimal places
 */
function roundTo(value, decimals) {
    return Number(value.toFixed(decimals));
}

/**
 * YEAR 2: Money problem solving (same unit)
 */
function generateYear2Question(params) {
    const operation = randomChoice(params.operations);
    const context = randomChoice(params.contexts);
    const isPence = params.unit === 'pence_only';

    if (operation === 'add_money') {
        // Simple addition
        const value1 = randomInt(params.min_value, params.max_value);
        const value2 = randomInt(params.min_value, Math.min(params.max_value, params.max_total - value1));
        const answer = value1 + value2;

        const items = ['toy', 'book', 'pencil', 'sticker', 'sweet', 'balloon'];
        const item1 = randomChoice(items);
        const item2 = randomChoice(items.filter(i => i !== item1));

        return {
            text: `A ${item1} costs ${formatMoney(value1, !isPence)}. A ${item2} costs ${formatMoney(value2, !isPence)}. How much do they cost altogether?`,
            type: 'text_input',
            answer: String(answer),
            hint: `Add the two amounts together`,
            units: isPence ? 'pence' : 'pounds'
        };
    } else if (operation === 'subtract_money') {
        // Simple subtraction
        const total = randomInt(params.min_value + 10, params.max_total);
        const spent = randomInt(params.min_value, total - params.min_value);
        const answer = total - spent;

        return {
            text: `You have ${formatMoney(total, !isPence)}. You spend ${formatMoney(spent, !isPence)}. How much money do you have left?`,
            type: 'text_input',
            answer: String(answer),
            hint: `Subtract what you spent from what you had`,
            units: isPence ? 'pence' : 'pounds'
        };
    } else if (operation === 'give_change') {
        // Giving change
        const cost = randomInt(params.min_value, params.max_total - 10);
        const payment = randomChoice(params.payment_amounts);
        const change = payment - cost;

        const items = ['toy', 'book', 'pencil', 'sticker', 'sweet', 'balloon', 'comic', 'eraser'];
        const item = randomChoice(items);

        return {
            text: `You buy a ${item} for ${formatMoney(cost, !isPence)}. You pay with ${formatMoney(payment, !isPence)}. How much change do you get?`,
            type: 'text_input',
            answer: String(change),
            hint: `Change = amount paid - cost`,
            units: isPence ? 'pence' : 'pounds'
        };
    } else if (operation === 'multi_item') {
        // Multiple items
        const value1 = randomInt(params.min_value, Math.floor(params.max_total / 2));
        const value2 = randomInt(params.min_value, Math.floor(params.max_total / 2));
        const total = value1 + value2;
        const payment = randomChoice(params.payment_amounts);
        const change = payment - total;

        return {
            text: `You buy items costing ${formatMoney(value1, !isPence)} and ${formatMoney(value2, !isPence)}. You pay with ${formatMoney(payment, !isPence)}. How much change do you get?`,
            type: 'text_input',
            answer: String(change),
            hint: `First add the costs, then subtract from amount paid`,
            units: isPence ? 'pence' : 'pounds'
        };
    }
}

/**
 * YEAR 3: Multi-measure problems (all measurement types)
 */
function generateYear3Question(params) {
    const operation = randomChoice(params.operations);
    const measureType = randomChoice(params.measure_types);
    const context = randomChoice(params.contexts);

    if (measureType === 'money') {
        if (operation === 'add_measure') {
            let value1, value2, answer;
            if (params.money_unit === 'pence_only') {
                value1 = randomInt(params.money_range[0], params.money_range[1]);
                value2 = randomInt(params.money_range[0], params.money_range[1]);
                answer = value1 + value2;
                return {
                    text: `You have ${value1}p and you earn ${value2}p more. How much money do you have now in pence?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: `Add the two amounts`,
                    units: 'pence'
                };
            } else {
                // Mixed or decimal money
                value1 = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
                value2 = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
                answer = roundTo(value1 + value2, 2);
                return {
                    text: `A notebook costs £${value1.toFixed(2)} and a pen costs £${value2.toFixed(2)}. What is the total cost in pounds?`,
                    type: 'text_input',
                    answer: answer.toFixed(2),
                    hint: `Add the two amounts`,
                    units: 'pounds'
                };
            }
        } else if (operation === 'give_change') {
            const cost = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
            const payment = randomChoice(params.payment_amounts);
            const change = roundTo(payment - cost, 2);
            return {
                text: `An item costs £${cost.toFixed(2)}. You pay with £${payment.toFixed(2)}. How much change do you get in pounds?`,
                type: 'text_input',
                answer: change.toFixed(2),
                hint: `Subtract the cost from the amount paid`,
                units: 'pounds'
            };
        }
    } else if (measureType === 'length') {
        if (operation === 'add_measure' || operation === 'subtract_measure') {
            const value1 = randomInt(params.length_range[0], params.length_range[1]);
            const value2 = randomInt(params.length_range[0], value1);
            const useMixed = params.length_unit === 'mixed';

            if (operation === 'add_measure') {
                const answer = value1 + value2;
                return {
                    text: `A piece of ribbon is ${formatLength(value1, useMixed)} long. Another piece is ${formatLength(value2, useMixed)} long. What is the total length in centimetres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to cm first, then add` : `Add the two lengths`,
                    units: 'cm'
                };
            } else {
                const answer = value1 - value2;
                return {
                    text: `A rope is ${formatLength(value1, useMixed)} long. You cut off ${formatLength(value2, useMixed)}. How much rope is left in centimetres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to cm first, then subtract` : `Subtract the lengths`,
                    units: 'cm'
                };
            }
        }
    } else if (measureType === 'mass') {
        if (operation === 'add_measure' || operation === 'subtract_measure') {
            const value1 = randomInt(params.mass_range[0], params.mass_range[1]);
            const value2 = randomInt(params.mass_range[0], value1);
            const useMixed = params.mass_unit === 'mixed';

            if (operation === 'add_measure') {
                const answer = value1 + value2;
                return {
                    text: `A bag of flour weighs ${formatMass(value1, useMixed)}. A bag of sugar weighs ${formatMass(value2, useMixed)}. What is the total weight in grams?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to grams first, then add` : `Add the two weights`,
                    units: 'grams'
                };
            } else {
                const answer = value1 - value2;
                return {
                    text: `A parcel weighs ${formatMass(value1, useMixed)}. You remove an item weighing ${formatMass(value2, useMixed)}. What is the new weight in grams?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to grams first, then subtract` : `Subtract the weights`,
                    units: 'grams'
                };
            }
        }
    } else if (measureType === 'capacity') {
        if (operation === 'add_measure' || operation === 'subtract_measure') {
            const value1 = randomInt(params.capacity_range[0], params.capacity_range[1]);
            const value2 = randomInt(params.capacity_range[0], value1);
            const useMixed = params.capacity_unit === 'mixed';

            if (operation === 'add_measure') {
                const answer = value1 + value2;
                return {
                    text: `A jug contains ${formatCapacity(value1, useMixed)} of water. You pour in ${formatCapacity(value2, useMixed)} more. How much water is in the jug now in millilitres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to ml first, then add` : `Add the two volumes`,
                    units: 'ml'
                };
            } else {
                const answer = value1 - value2;
                return {
                    text: `A bottle contains ${formatCapacity(value1, useMixed)} of juice. You pour out ${formatCapacity(value2, useMixed)}. How much juice is left in millilitres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to ml first, then subtract` : `Subtract the volumes`,
                    units: 'ml'
                };
            }
        }
    }

    // Fallback - shouldn't reach here
    return generateYear3Question(params);
}

/**
 * YEAR 4: Four operations with measures
 */
function generateYear4Question(params) {
    const operation = randomChoice(params.operations);
    const measureType = randomChoice(params.measure_types);

    if (measureType === 'money') {
        if (operation === 'multiply_measure') {
            let price, quantity, answer;
            if (params.money_format === 'whole_pounds') {
                price = randomInt(params.money_range[0], params.money_range[1]);
                quantity = randomChoice(params.multipliers);
                answer = price * quantity;
                return {
                    text: `One item costs £${price}. How much do ${quantity} items cost in pounds?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: `Multiply the price by ${quantity}`,
                    units: 'pounds'
                };
            } else {
                // Decimal money
                price = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
                quantity = randomChoice(params.multipliers);
                answer = roundTo(price * quantity, 2);
                return {
                    text: `One item costs £${price.toFixed(2)}. How much do ${quantity} items cost in pounds?`,
                    type: 'text_input',
                    answer: answer.toFixed(2),
                    hint: `Multiply the price by ${quantity}`,
                    units: 'pounds'
                };
            }
        } else if (operation === 'divide_measure') {
            let total, people, answer;
            if (params.money_format === 'whole_pounds') {
                const divisor = randomChoice(params.divisors);
                total = divisor * randomInt(2, Math.floor(params.money_range[1] / divisor));
                answer = total / divisor;
                return {
                    text: `£${total} is shared equally between ${divisor} people. How much does each person get in pounds?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: `Divide the total by ${divisor}`,
                    units: 'pounds'
                };
            } else {
                const divisor = randomChoice(params.divisors);
                total = roundTo(divisor * (1 + Math.floor(Math.random() * 10)), 2);
                answer = roundTo(total / divisor, 2);
                return {
                    text: `£${total.toFixed(2)} is shared equally between ${divisor} people. How much does each person get in pounds?`,
                    type: 'text_input',
                    answer: answer.toFixed(2),
                    hint: `Divide the total by ${divisor}`,
                    units: 'pounds'
                };
            }
        }
    } else if (measureType === 'length') {
        if (operation === 'multiply_measure') {
            const length = randomInt(params.length_range[0], params.length_range[1]);
            const multiplier = randomChoice(params.multipliers);
            const answer = length * multiplier;
            return {
                text: `One piece of wood is ${length}cm long. What is the total length of ${multiplier} identical pieces in centimetres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Multiply the length by ${multiplier}`,
                units: 'cm'
            };
        } else if (operation === 'divide_measure') {
            const divisor = randomChoice(params.divisors);
            const total = divisor * randomInt(params.length_range[0] / divisor, params.length_range[1] / divisor);
            const answer = total / divisor;
            return {
                text: `A rope ${total}cm long is cut into ${divisor} equal pieces. How long is each piece in centimetres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Divide the total length by ${divisor}`,
                units: 'cm'
            };
        }
    } else if (measureType === 'mass') {
        if (operation === 'multiply_measure' || operation === 'scale_recipe') {
            const mass = randomInt(params.mass_range[0], params.mass_range[1]);
            const multiplier = randomChoice(params.multipliers);
            const answer = mass * multiplier;
            return {
                text: `A recipe uses ${mass}g of flour for one cake. How much flour is needed for ${multiplier} cakes in grams?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Multiply the amount by ${multiplier}`,
                units: 'grams'
            };
        } else if (operation === 'divide_measure') {
            const divisor = randomChoice(params.divisors);
            const total = divisor * randomInt(params.mass_range[0] / divisor, params.mass_range[1] / divisor);
            const answer = total / divisor;
            return {
                text: `${total}g of rice is shared equally into ${divisor} bags. How much rice is in each bag in grams?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Divide the total by ${divisor}`,
                units: 'grams'
            };
        }
    } else if (measureType === 'capacity') {
        if (operation === 'multiply_measure' || operation === 'scale_recipe') {
            const capacity = randomInt(params.capacity_range[0], params.capacity_range[1]);
            const multiplier = randomChoice(params.multipliers);
            const answer = capacity * multiplier;
            return {
                text: `A recipe needs ${capacity}ml of milk for 2 servings. How much milk is needed for ${multiplier * 2} servings in millilitres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Multiply the amount by ${multiplier}`,
                units: 'ml'
            };
        } else if (operation === 'divide_measure') {
            const divisor = randomChoice(params.divisors);
            const total = divisor * randomInt(params.capacity_range[0] / divisor, params.capacity_range[1] / divisor);
            const answer = total / divisor;
            return {
                text: `${total}ml of juice is poured equally into ${divisor} glasses. How much juice is in each glass in millilitres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Divide the total by ${divisor}`,
                units: 'ml'
            };
        }
    }

    // Fallback
    return generateYear4Question(params);
}

/**
 * YEAR 5: Decimal measures and scaling
 */
function generateYear5Question(params) {
    const operation = randomChoice(params.operations);
    const measureType = randomChoice(params.measure_types);
    const dp = params.decimal_places;

    if (measureType === 'money') {
        if (operation === 'multiply_decimal') {
            const price = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), dp);
            const quantity = randomChoice(params.multipliers);
            const answer = roundTo(price * quantity, 2);
            return {
                text: `Apples cost £${price.toFixed(dp)} per kilogram. How much do ${quantity} kilograms cost in pounds?`,
                type: 'text_input',
                answer: answer.toFixed(2),
                hint: `Multiply the price by ${quantity}`,
                units: 'pounds'
            };
        } else if (operation === 'divide_decimal') {
            const divisor = randomChoice(params.divisors);
            const total = roundTo(divisor * (params.money_range[0] + Math.random() * (params.money_range[1] / divisor - params.money_range[0])), dp);
            const answer = roundTo(total / divisor, 2);
            return {
                text: `£${total.toFixed(dp)} is shared equally between ${divisor} people. How much does each person get in pounds?`,
                type: 'text_input',
                answer: answer.toFixed(2),
                hint: `Divide the total by ${divisor}`,
                units: 'pounds'
            };
        }
    } else if (measureType === 'length') {
        if (operation === 'multiply_decimal') {
            const length = roundTo(params.length_range[0] + Math.random() * (params.length_range[1] - params.length_range[0]), dp);
            const quantity = randomChoice(params.multipliers);
            const answer = roundTo(length * quantity, dp);
            return {
                text: `One shelf is ${length.toFixed(dp)}m long. What is the total length of ${quantity} shelves in metres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Multiply the length by ${quantity}`,
                units: 'metres'
            };
        } else if (operation === 'divide_decimal') {
            const divisor = randomChoice(params.divisors);
            const total = roundTo(divisor * (params.length_range[0] + Math.random() * (params.length_range[1] / divisor - params.length_range[0])), dp);
            const answer = roundTo(total / divisor, dp);
            return {
                text: `A rope ${total.toFixed(dp)}m long is cut into ${divisor} equal pieces. How long is each piece in metres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Divide the total by ${divisor}`,
                units: 'metres'
            };
        }
    } else if (measureType === 'mass') {
        if (operation === 'multiply_decimal' || operation === 'scale_recipe') {
            const mass = roundTo(params.mass_range[0] + Math.random() * (params.mass_range[1] - params.mass_range[0]), dp);
            const from = params.scaling_from ? randomChoice(params.scaling_from) : randomChoice(params.multipliers);
            const to = params.scaling_to ? randomChoice(params.scaling_to.filter(x => x > from)) : from * randomChoice([2, 3]);
            const answer = roundTo(mass * to / from, dp);
            return {
                text: `A recipe for ${from} people uses ${mass.toFixed(dp)}kg of flour. How much flour is needed for ${to} people in kilograms?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Scale from ${from} to ${to} people`,
                units: 'kg'
            };
        } else if (operation === 'divide_decimal') {
            const divisor = randomChoice(params.divisors);
            const total = roundTo(divisor * (params.mass_range[0] + Math.random() * (params.mass_range[1] / divisor - params.mass_range[0])), dp);
            const answer = roundTo(total / divisor, dp);
            return {
                text: `${total.toFixed(dp)}kg of rice is divided equally into ${divisor} bags. How much is in each bag in kilograms?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Divide the total by ${divisor}`,
                units: 'kg'
            };
        }
    } else if (measureType === 'capacity') {
        if (operation === 'rate_problems') {
            const rate = roundTo(params.capacity_range[0] + Math.random() * (params.capacity_range[1] - params.capacity_range[0]), dp);
            const quantity = randomChoice(params.multipliers);
            const answer = roundTo(rate * quantity, dp);
            return {
                text: `A bottle holds ${rate.toFixed(dp)} litres. How much liquid is in ${quantity} bottles in litres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Multiply the capacity by ${quantity}`,
                units: 'litres'
            };
        } else if (operation === 'fraction_of_measure') {
            const total = roundTo(params.capacity_range[0] + Math.random() * (params.capacity_range[1] - params.capacity_range[0]), dp);
            const fraction = randomChoice(params.fractions || [1/2, 1/4, 3/4]);
            const answer = roundTo(total * fraction, dp);
            let fractionText = fraction === 1/2 ? '1/2' : fraction === 1/3 ? '1/3' : fraction === 1/4 ? '1/4' : fraction === 2/3 ? '2/3' : '3/4';
            return {
                text: `A tank holds ${total.toFixed(dp)} litres. It is ${fractionText} full. How much water is in the tank in litres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Multiply ${total.toFixed(dp)} by ${fractionText}`,
                units: 'litres'
            };
        }
    }

    // Fallback
    return generateYear5Question(params);
}

/**
 * YEAR 6: Unit conversion problems
 */
function generateYear6Question(params) {
    const operation = randomChoice(params.operations);
    const dp = randomChoice(params.decimal_places);

    if (operation === 'convert_length') {
        const conversionType = randomChoice(params.conversions.length);

        if (conversionType === 'km_to_m') {
            const km = roundTo(params.value_ranges.km[0] + Math.random() * (params.value_ranges.km[1] - params.value_ranges.km[0]), dp);
            const answer = roundTo(km * 1000, dp);
            return {
                text: `Convert ${km.toFixed(dp)} kilometres to metres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 km = 1000 m`,
                units: 'metres'
            };
        } else if (conversionType === 'm_to_cm') {
            const m = roundTo(params.value_ranges.m[0] + Math.random() * (params.value_ranges.m[1] - params.value_ranges.m[0]), dp);
            const answer = roundTo(m * 100, dp);
            return {
                text: `Convert ${m.toFixed(dp)} metres to centimetres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 m = 100 cm`,
                units: 'cm'
            };
        } else if (conversionType === 'cm_to_mm') {
            const cm = roundTo(params.value_ranges.cm[0] + Math.random() * (params.value_ranges.cm[1] - params.value_ranges.cm[0]), dp);
            const answer = roundTo(cm * 10, dp);
            return {
                text: `Convert ${cm.toFixed(dp)} centimetres to millimetres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 cm = 10 mm`,
                units: 'mm'
            };
        }
    } else if (operation === 'convert_mass') {
        const conversionType = randomChoice(params.conversions.mass);

        if (conversionType === 'kg_to_g') {
            const kg = roundTo(params.value_ranges.kg[0] + Math.random() * (params.value_ranges.kg[1] - params.value_ranges.kg[0]), dp);
            const answer = roundTo(kg * 1000, dp);
            return {
                text: `Convert ${kg.toFixed(dp)} kilograms to grams.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 kg = 1000 g`,
                units: 'grams'
            };
        } else if (conversionType === 'g_to_kg') {
            const g = roundTo(params.value_ranges.kg[0] * 1000 + Math.random() * (params.value_ranges.kg[1] * 1000 - params.value_ranges.kg[0] * 1000), dp);
            const answer = roundTo(g / 1000, dp);
            return {
                text: `Convert ${g.toFixed(dp)} grams to kilograms.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1000 g = 1 kg`,
                units: 'kg'
            };
        }
    } else if (operation === 'convert_capacity') {
        const conversionType = randomChoice(params.conversions.capacity);

        if (conversionType === 'l_to_ml') {
            const l = roundTo(params.value_ranges.l[0] + Math.random() * (params.value_ranges.l[1] - params.value_ranges.l[0]), dp);
            const answer = roundTo(l * 1000, dp);
            return {
                text: `Convert ${l.toFixed(dp)} litres to millilitres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 l = 1000 ml`,
                units: 'ml'
            };
        } else if (conversionType === 'ml_to_l') {
            const ml = roundTo(params.value_ranges.l[0] * 1000 + Math.random() * (params.value_ranges.l[1] * 1000 - params.value_ranges.l[0] * 1000), dp);
            const answer = roundTo(ml / 1000, dp);
            return {
                text: `Convert ${ml.toFixed(dp)} millilitres to litres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1000 ml = 1 l`,
                units: 'litres'
            };
        } else if (conversionType === 'm3_to_l') {
            const m3 = roundTo(1 + Math.random() * 10, dp);
            const answer = roundTo(m3 * 1000, dp);
            return {
                text: `A tank has a volume of ${m3.toFixed(dp)} cubic metres. How many litres is this?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 m³ = 1000 litres`,
                units: 'litres'
            };
        }
    } else if (operation === 'convert_area') {
        const conversionType = randomChoice(params.conversions.area);

        if (conversionType === 'm2_to_cm2') {
            const m2 = roundTo(1 + Math.random() * 20, dp);
            const answer = roundTo(m2 * 10000, dp);
            return {
                text: `Convert ${m2.toFixed(dp)} square metres to square centimetres.`,
                type: 'text_input',
                answer: answer.toFixed(0),
                hint: `1 m² = 10,000 cm²`,
                units: 'cm²'
            };
        }
    } else if (operation === 'conversion_with_calculation') {
        // Conversion followed by calculation
        const measureType = randomChoice(['length', 'mass']);

        if (measureType === 'length') {
            const pieces = randomChoice([2, 3, 4, 5]);
            const lengthM = roundTo(params.value_ranges.m[0] + Math.random() * (params.value_ranges.m[1] - params.value_ranges.m[0]), dp);
            const totalCm = roundTo(lengthM * 100, dp);
            const answer = roundTo(totalCm / pieces, dp);
            return {
                text: `A rope is ${lengthM.toFixed(dp)} metres long. It is cut into ${pieces} equal pieces. How long is each piece in centimetres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `First convert to cm, then divide by ${pieces}`,
                units: 'cm'
            };
        } else {
            const kg = roundTo(params.value_ranges.kg[0] + Math.random() * (params.value_ranges.kg[1] - params.value_ranges.kg[0]), dp);
            const used = roundTo(Math.random() * kg * 0.5, dp);
            const left = roundTo(kg - used, dp);
            const answerG = roundTo(left * 1000, dp);
            return {
                text: `A recipe starts with ${kg.toFixed(dp)}kg of flour. It uses ${used.toFixed(dp)}kg. How much flour is left in grams?`,
                type: 'text_input',
                answer: answerG.toFixed(dp),
                hint: `Calculate remaining kg, then convert to grams`,
                units: 'grams'
            };
        }
    }

    // Fallback
    return generateYear6Question(params);
}

/**
 * Main generator function
 * Routes to appropriate year group generator based on module ID
 */
export function generateQuestion(params, level, moduleId) {
    let question;

    if (moduleId === 'M09_Y2_MEAS') {
        question = generateYear2Question(params);
    } else if (moduleId === 'M09_Y3_MEAS') {
        question = generateYear3Question(params);
    } else if (moduleId === 'M09_Y4_MEAS') {
        question = generateYear4Question(params);
    } else if (moduleId === 'M09_Y5_MEAS') {
        question = generateYear5Question(params);
    } else if (moduleId === 'M09_Y6_MEAS') {
        question = generateYear6Question(params);
    } else {
        throw new Error(`Unknown module ID: ${moduleId}`);
    }

    // Add standard fields
    question.module = moduleId;
    question.level = level;

    return question;
}

// Export module configurations for each year group
export default {
    'M09_Y2_MEAS': {
        moduleId: 'M09_Y2_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y2_MEAS')
    },
    'M09_Y3_MEAS': {
        moduleId: 'M09_Y3_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y3_MEAS')
    },
    'M09_Y4_MEAS': {
        moduleId: 'M09_Y4_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y4_MEAS')
    },
    'M09_Y5_MEAS': {
        moduleId: 'M09_Y5_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y5_MEAS')
    },
    'M09_Y6_MEAS': {
        moduleId: 'M09_Y6_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y6_MEAS')
    }
};
