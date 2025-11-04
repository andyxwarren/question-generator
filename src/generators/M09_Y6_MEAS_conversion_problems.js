/**
 * M09_Y6_MEAS: Unit Conversion Problems
 * Year 6 - Solve problems involving the calculation and conversion of units of measure,
 * using decimal notation up to three decimal places where appropriate
 *
 * Key Requirements:
 * - Emphasis on CONVERSION between units
 * - Decimal notation to THREE decimal places
 * - Complex multi-step problems requiring conversions
 * - All measurement types including area and volume
 */

import {
    randomInt,
    randomDecimal,
    randomChoice,
    formatMoney,
    formatDecimalMeasure,
    generateContext,
    generateShoppingItems,
    convertUnits,
    roundTo
} from './helpers/M09_problemHelpers.js';

/**
 * Operation: Convert length
 * "Convert 3.456km to metres"
 */
function generateConvertLength(params) {
    const conversionType = randomChoice(params.conversions.length);
    const dp = randomChoice(params.decimal_places);

    if (conversionType === 'km_to_m' || conversionType === 'km_m') {
        const km = randomDecimal(params.value_ranges.km[0], params.value_ranges.km[1], dp);
        const m = convertUnits(km, 'km', 'm');

        return {
            text: `Convert ${formatDecimalMeasure(km, 'km', dp)} to metres.`,
            type: 'text_input',
            answer: m.toFixed(Math.min(dp, 1)),
            hint: '1km = 1000m',
            module: 'M09_Y6_MEAS',
            operation: 'convert_length'
        };
    } else if (conversionType === 'm_to_cm' || conversionType === 'm_cm') {
        const m = randomDecimal(params.value_ranges.m[0], params.value_ranges.m[1], dp);
        const cm = convertUnits(m, 'm', 'cm');

        return {
            text: `Convert ${formatDecimalMeasure(m, 'm', dp)} to centimetres.`,
            type: 'text_input',
            answer: cm.toFixed(Math.max(dp - 2, 0)),
            hint: '1m = 100cm',
            module: 'M09_Y6_MEAS',
            operation: 'convert_length'
        };
    } else if (conversionType === 'cm_to_mm' || conversionType === 'cm_mm') {
        const cm = randomDecimal(params.value_ranges.cm[0], params.value_ranges.cm[1], dp);
        const mm = convertUnits(cm, 'cm', 'mm');

        return {
            text: `Convert ${formatDecimalMeasure(cm, 'cm', dp)} to millimetres.`,
            type: 'text_input',
            answer: mm.toFixed(Math.max(dp - 1, 0)),
            hint: '1cm = 10mm',
            module: 'M09_Y6_MEAS',
            operation: 'convert_length'
        };
    } else if (conversionType === 'm_to_mm') {
        const m = randomDecimal(params.value_ranges.m[0], params.value_ranges.m[1], dp);
        const mm = convertUnits(m, 'm', 'mm');

        return {
            text: `Convert ${formatDecimalMeasure(m, 'm', dp)} to millimetres.`,
            type: 'text_input',
            answer: mm.toFixed(Math.max(dp - 3, 0)),
            hint: '1m = 1000mm',
            module: 'M09_Y6_MEAS',
            operation: 'convert_length'
        };
    } else { // km_to_cm
        const km = randomDecimal(params.value_ranges.km[0], Math.min(params.value_ranges.km[1], 10), dp);
        const cm = convertUnits(km, 'km', 'cm');

        return {
            text: `Convert ${formatDecimalMeasure(km, 'km', dp)} to centimetres.`,
            type: 'text_input',
            answer: cm.toFixed(0),
            hint: '1km = 100,000cm',
            module: 'M09_Y6_MEAS',
            operation: 'convert_length'
        };
    }
}

/**
 * Operation: Convert mass
 * "Convert 2.5kg to grams"
 */
function generateConvertMass(params) {
    const conversionType = randomChoice(params.conversions.mass);
    const dp = randomChoice(params.decimal_places);

    if (conversionType === 'kg_to_g' || conversionType === 'kg_g') {
        const kg = randomDecimal(params.value_ranges.kg[0], params.value_ranges.kg[1], dp);
        const g = convertUnits(kg, 'kg', 'g');

        return {
            text: `Convert ${formatDecimalMeasure(kg, 'kg', dp)} to grams.`,
            type: 'text_input',
            answer: g.toFixed(Math.max(dp - 3, 0)),
            hint: '1kg = 1000g',
            module: 'M09_Y6_MEAS',
            operation: 'convert_mass'
        };
    } else if (conversionType === 'g_to_kg') {
        const g = randomInt(params.value_ranges.kg[0] * 1000, params.value_ranges.kg[1] * 1000);
        const kg = convertUnits(g, 'g', 'kg');

        return {
            text: `Convert ${g}g to kilograms.`,
            type: 'text_input',
            answer: kg.toFixed(dp),
            hint: '1000g = 1kg',
            module: 'M09_Y6_MEAS',
            operation: 'convert_mass'
        };
    } else { // t_to_kg
        const t = randomDecimal(0.5, 10, dp);
        const kg = convertUnits(t, 't', 'kg');

        return {
            text: `Convert ${formatDecimalMeasure(t, 't', dp)} to kilograms.`,
            type: 'text_input',
            answer: kg.toFixed(Math.max(dp - 3, 0)),
            hint: '1 tonne = 1000kg',
            module: 'M09_Y6_MEAS',
            operation: 'convert_mass'
        };
    }
}

/**
 * Operation: Convert capacity
 * "Tank holds 2.5m³. How many litres?"
 */
function generateConvertCapacity(params) {
    const conversionType = randomChoice(params.conversions.capacity);
    const dp = randomChoice(params.decimal_places);

    if (conversionType === 'l_to_ml' || conversionType === 'l_ml') {
        const l = randomDecimal(params.value_ranges.l[0], params.value_ranges.l[1], dp);
        const ml = convertUnits(l, 'l', 'ml');

        return {
            text: `Convert ${formatDecimalMeasure(l, 'l', dp)} to millilitres.`,
            type: 'text_input',
            answer: ml.toFixed(Math.max(dp - 3, 0)),
            hint: '1l = 1000ml',
            module: 'M09_Y6_MEAS',
            operation: 'convert_capacity'
        };
    } else if (conversionType === 'ml_to_l') {
        const ml = randomInt(params.value_ranges.l[0] * 1000, params.value_ranges.l[1] * 1000);
        const l = convertUnits(ml, 'ml', 'l');

        return {
            text: `Convert ${ml}ml to litres.`,
            type: 'text_input',
            answer: l.toFixed(dp),
            hint: '1000ml = 1l',
            module: 'M09_Y6_MEAS',
            operation: 'convert_capacity'
        };
    } else if (conversionType === 'm3_to_l' || conversionType === 'm3_l') {
        const m3 = randomDecimal(0.5, 10, dp);
        const l = convertUnits(m3, 'm3', 'l');

        return {
            text: `A tank holds ${formatDecimalMeasure(m3, 'm³', dp)}. How many litres is this?`,
            type: 'text_input',
            answer: l.toFixed(Math.max(dp - 3, 0)),
            hint: '1m³ = 1000 litres',
            module: 'M09_Y6_MEAS',
            operation: 'convert_capacity'
        };
    } else { // cm3_to_ml or cm3_ml
        const cm3 = randomInt(100, 5000);
        const ml = convertUnits(cm3, 'cm3', 'ml');

        return {
            text: `Convert ${cm3}cm³ to millilitres.`,
            type: 'text_input',
            answer: ml.toFixed(0),
            hint: '1cm³ = 1ml',
            module: 'M09_Y6_MEAS',
            operation: 'convert_capacity'
        };
    }
}

/**
 * Operation: Convert area
 * "Room is 4.5m × 3.2m. Area in m²? In cm²?"
 */
function generateConvertArea(params) {
    const conversionType = randomChoice(params.conversions.area);
    const dp = randomChoice(params.decimal_places);

    if (conversionType === 'm2_to_cm2' || conversionType === 'm2_cm2') {
        const m2 = randomDecimal(params.value_ranges.l[0], params.value_ranges.l[1], dp);
        const cm2 = convertUnits(m2, 'm2', 'cm2');

        return {
            text: `Convert ${formatDecimalMeasure(m2, 'm²', dp)} to cm².`,
            type: 'text_input',
            answer: cm2.toFixed(Math.max(dp - 4, 0)),
            hint: '1m² = 10,000cm²',
            module: 'M09_Y6_MEAS',
            operation: 'convert_area'
        };
    } else if (conversionType === 'cm2_to_mm2' || conversionType === 'cm2_mm2') {
        const cm2 = randomInt(10, 1000);
        const mm2 = convertUnits(cm2, 'cm2', 'mm2');

        return {
            text: `Convert ${cm2}cm² to mm².`,
            type: 'text_input',
            answer: mm2.toFixed(0),
            hint: '1cm² = 100mm²',
            module: 'M09_Y6_MEAS',
            operation: 'convert_area'
        };
    } else { // km2_to_m2
        const km2 = randomDecimal(0.5, 10, dp);
        const m2 = convertUnits(km2, 'km2', 'm2');

        return {
            text: `Convert ${formatDecimalMeasure(km2, 'km²', dp)} to m².`,
            type: 'text_input',
            answer: m2.toFixed(0),
            hint: '1km² = 1,000,000m²',
            module: 'M09_Y6_MEAS',
            operation: 'convert_area'
        };
    }
}

/**
 * Operation: Conversion with calculation
 * "A recipe needs 250g. You have 0.5kg. How much left?"
 */
function generateConversionWithCalculation(params) {
    if (!params.require_calculation) {
        return generateConvertLength(params);
    }

    const problemType = randomChoice(['recipe', 'length', 'capacity']);

    if (problemType === 'recipe') {
        const recipeNeedsG = randomInt(200, 800);
        const haveKg = randomDecimal(0.5, 2.0, 1);
        const haveG = convertUnits(haveKg, 'kg', 'g');
        const leftG = haveG - recipeNeedsG;

        if (leftG < 0) {
            return generateConvertLength(params);
        }

        return {
            text: `A recipe needs ${recipeNeedsG}g of flour. You have ${formatDecimalMeasure(haveKg, 'kg', 1)}. How many grams will you have left after making the recipe?`,
            type: 'text_input',
            answer: leftG.toFixed(0),
            hint: 'First convert kg to g, then subtract',
            module: 'M09_Y6_MEAS',
            operation: 'conversion_with_calculation'
        };
    } else if (problemType === 'length') {
        const totalCm = randomInt(200, 500);
        const cutM = randomDecimal(0.5, 2.0, 2);
        const cutCm = convertUnits(cutM, 'm', 'cm');
        const leftCm = totalCm - cutCm;

        if (leftCm < 0) {
            return generateConvertLength(params);
        }

        return {
            text: `A rope is ${totalCm}cm long. You cut off ${formatDecimalMeasure(cutM, 'm', 2)}. How many centimetres of rope are left?`,
            type: 'text_input',
            answer: leftCm.toFixed(0),
            hint: 'Convert m to cm first, then subtract',
            module: 'M09_Y6_MEAS',
            operation: 'conversion_with_calculation'
        };
    } else { // capacity
        const bottleMl = randomInt(500, 2000);
        const drinkL = randomDecimal(0.2, 1.0, 2);
        const drinkMl = convertUnits(drinkL, 'l', 'ml');
        const leftMl = bottleMl - drinkMl;

        if (leftMl < 0) {
            return generateConvertLength(params);
        }

        return {
            text: `A bottle holds ${bottleMl}ml. You drink ${formatDecimalMeasure(drinkL, 'l', 2)}. How many millilitres are left?`,
            type: 'text_input',
            answer: leftMl.toFixed(0),
            hint: 'Convert l to ml first, then subtract',
            module: 'M09_Y6_MEAS',
            operation: 'conversion_with_calculation'
        };
    }
}

/**
 * Operation: Area and perimeter problems
 * "Room is 4.5m × 3.2m. What is the area?"
 */
function generateAreaPerimeter(params) {
    const length = randomDecimal(2, 10, 1);
    const width = randomDecimal(2, 8, 1);
    const problemType = randomChoice(['area', 'perimeter', 'area_conversion']);

    if (problemType === 'area') {
        const area = roundTo(length * width, 2);

        return {
            text: `A room is ${formatDecimalMeasure(length, 'm', 1)} long and ${formatDecimalMeasure(width, 'm', 1)} wide. What is the area of the room in square metres?`,
            type: 'text_input',
            answer: area.toFixed(2),
            hint: 'Area = length × width',
            module: 'M09_Y6_MEAS',
            operation: 'area_perimeter'
        };
    } else if (problemType === 'perimeter') {
        const perimeter = roundTo((length + width) * 2, 1);

        return {
            text: `A rectangular garden is ${formatDecimalMeasure(length, 'm', 1)} long and ${formatDecimalMeasure(width, 'm', 1)} wide. What is the perimeter?`,
            type: 'text_input',
            answer: perimeter.toFixed(1),
            hint: 'Perimeter = 2 × (length + width)',
            module: 'M09_Y6_MEAS',
            operation: 'area_perimeter'
        };
    } else { // area_conversion
        const areaM2 = roundTo(length * width, 2);
        const areaCm2 = convertUnits(areaM2, 'm2', 'cm2');

        return {
            text: `A room is ${formatDecimalMeasure(length, 'm', 1)} × ${formatDecimalMeasure(width, 'm', 1)}. What is the area in cm²?`,
            type: 'text_input',
            answer: areaCm2.toFixed(0),
            hint: 'Calculate area in m² first, then convert to cm². Remember: 1m² = 10,000cm²',
            module: 'M09_Y6_MEAS',
            operation: 'area_perimeter'
        };
    }
}

/**
 * Operation: Multi-step conversion problems
 */
function generateMultiConversion(params) {
    if (!params.allow_multi_step) {
        return generateConvertLength(params);
    }

    // Complex problem requiring multiple conversions
    const distanceKm = randomDecimal(1, 10, 2);
    const distanceM = convertUnits(distanceKm, 'km', 'm');
    const segments = randomInt(2, 4);
    const perSegmentM = roundTo(distanceM / segments, 1);

    return {
        text: `A race is ${formatDecimalMeasure(distanceKm, 'km', 2)} long. It is divided into ${segments} equal parts. How many metres long is each part?`,
        type: 'text_input',
        answer: perSegmentM.toFixed(1),
        hint: 'Convert km to m first, then divide',
        module: 'M09_Y6_MEAS',
        operation: 'multi_conversion'
    };
}

/**
 * Main generator function
 * @param {Object} params - Parameters from curriculum definition
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'convert_length':
            return generateConvertLength(params);
        case 'convert_mass':
            return generateConvertMass(params);
        case 'convert_capacity':
            return generateConvertCapacity(params);
        case 'convert_area':
            return generateConvertArea(params);
        case 'convert_volume':
            return generateConvertCapacity(params); // Similar to capacity
        case 'simple_conversion_problem':
            return randomChoice([generateConvertLength, generateConvertMass, generateConvertCapacity])(params);
        case 'conversion_with_calculation':
            return generateConversionWithCalculation(params);
        case 'area_perimeter':
            return generateAreaPerimeter(params);
        case 'multi_conversion':
            return generateMultiConversion(params);
        case 'rate_conversion':
            // Rate problems with conversion
            return generateMultiConversion(params);
        default:
            return generateConvertLength(params);
    }
}

export default {
    moduleId: 'M09_Y6_MEAS',
    generate: generateQuestion
};
