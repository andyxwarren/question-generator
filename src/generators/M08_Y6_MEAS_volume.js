/**
 * M08_Y6_MEAS: Calculate Volume with Formulas
 *
 * Curriculum: "calculate, estimate and compare volume of cubes and cuboids using standard units,
 * including centimetre cubed (cm³) and cubic metres (m³), and extending to other units [e.g. mm³ and km³];
 * recognise when it is possible to use the formulae for the volume of shapes"
 *
 * Operations:
 * - calculate_volume: Calculate volume given all dimensions (V = l × w × h)
 * - cube_volume: Calculate volume of a cube (V = s³)
 * - compare_volumes: Compare volumes of different cuboids
 * - formula_recognition: Identify when volume formula can be used
 * - missing_dimension: Find missing dimension given volume and two dimensions
 * - unit_conversion: Convert between volume units (mm³, cm³, m³, km³)
 * - composite_volume: Calculate volume of L-shaped composite cuboids
 */

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random element from an array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get the cubic unit notation for a given unit
 */
function getCubicUnit(unit) {
    if (unit === 'cm') return 'cm³';
    if (unit === 'm') return 'm³';
    if (unit === 'mm') return 'mm³';
    if (unit === 'km') return 'km³';
    return unit + '³';
}

/**
 * Format large numbers with commas for readability
 */
function formatNumber(num) {
    return num.toLocaleString('en-GB');
}

/**
 * Generate calculate volume question
 * Basic V = l × w × h calculation
 */
function generateCalculateVolume(params) {
    const unit = randomChoice(params.units);
    const cubicUnit = getCubicUnit(unit);

    const length = randomInt(params.min_dimension, params.max_dimension);
    const width = randomInt(params.min_dimension, params.max_dimension);
    const height = randomInt(params.min_dimension, params.max_dimension);

    const volume = length * width * height;

    const wordings = [
        `A cuboid measures ${length} ${unit} by ${width} ${unit} by ${height} ${unit}. Calculate its volume in ${cubicUnit}.`,
        `A box is ${length} ${unit} long, ${width} ${unit} wide, and ${height} ${unit} high. What is its volume?`,
        `Calculate the volume of a rectangular prism with length ${length} ${unit}, width ${width} ${unit}, and height ${height} ${unit}.`
    ];

    return {
        text: randomChoice(wordings),
        type: 'text_input',
        answer: String(volume),
        hint: 'Use the formula: Volume = length × width × height',
        module: 'M08_Y6_MEAS'
    };
}

/**
 * Generate cube volume question
 * V = s³
 */
function generateCubeVolume(params) {
    const unit = randomChoice(params.units);
    const cubicUnit = getCubicUnit(unit);

    const side = randomInt(params.min_dimension, params.max_dimension);
    const volume = side * side * side;

    const wordings = [
        `A cube has sides of ${side} ${unit}. What is its volume?`,
        `Calculate the volume of a cube with edge length ${side} ${unit}.`,
        `Find the volume of a cubic box with sides measuring ${side} ${unit}.`
    ];

    return {
        text: randomChoice(wordings),
        type: 'text_input',
        answer: String(volume),
        hint: `Volume of a cube = side³ = ${side} × ${side} × ${side}`,
        module: 'M08_Y6_MEAS'
    };
}

/**
 * Generate compare volumes question
 * Compare two cuboids and determine relationship
 */
function generateCompareVolumes(params) {
    const unit = randomChoice(params.units);
    const cubicUnit = getCubicUnit(unit);

    // Generate two cuboids
    const l1 = randomInt(params.min_dimension, params.max_dimension);
    const w1 = randomInt(params.min_dimension, params.max_dimension);
    const h1 = randomInt(params.min_dimension, params.max_dimension);
    const v1 = l1 * w1 * h1;

    let l2, w2, h2, v2;
    do {
        l2 = randomInt(params.min_dimension, params.max_dimension);
        w2 = randomInt(params.min_dimension, params.max_dimension);
        h2 = randomInt(params.min_dimension, params.max_dimension);
        v2 = l2 * w2 * h2;
    } while (Math.abs(v1 - v2) < 20); // Ensure clear difference

    const questionTypes = [
        {
            type: 'multiple_choice',
            text: `Cuboid A: ${l1} ${unit} × ${w1} ${unit} × ${h1} ${unit}. Cuboid B: ${l2} ${unit} × ${w2} ${unit} × ${h2} ${unit}. Which has the greater volume?`,
            answer: v1 > v2 ? 'Cuboid A' : 'Cuboid B',
            options: ['Cuboid A', 'Cuboid B', 'They are equal']
        },
        {
            type: 'text_input',
            text: `Cuboid A measures ${l1} ${unit} × ${w1} ${unit} × ${h1} ${unit}. Cuboid B measures ${l2} ${unit} × ${w2} ${unit} × ${h2} ${unit}. What is the difference in volume (in ${cubicUnit})?`,
            answer: String(Math.abs(v1 - v2)),
            hint: 'Calculate both volumes, then find the difference'
        }
    ];

    const selected = randomChoice(questionTypes);

    return {
        text: selected.text,
        type: selected.type,
        answer: selected.answer,
        options: selected.options,
        hint: selected.hint,
        module: 'M08_Y6_MEAS'
    };
}

/**
 * Generate formula recognition question
 * When can we use V = l × w × h?
 */
function generateFormulaRecognition(params) {
    const shapes = [
        { name: 'cuboid (rectangular prism)', canUse: true },
        { name: 'cube', canUse: true },
        { name: 'cylinder', canUse: false },
        { name: 'sphere', canUse: false },
        { name: 'pyramid', canUse: false },
        { name: 'cone', canUse: false }
    ];

    const selected = randomChoice(shapes);

    return {
        text: `Can you use the formula V = length × width × height to calculate the volume of a ${selected.name}?`,
        type: 'multiple_choice',
        answer: selected.canUse ? 'Yes' : 'No',
        options: ['Yes', 'No'],
        module: 'M08_Y6_MEAS'
    };
}

/**
 * Generate missing dimension question
 * Given volume and two dimensions, find the third
 */
function generateMissingDimension(params) {
    const unit = randomChoice(params.units);
    const cubicUnit = getCubicUnit(unit);

    // Generate dimensions ensuring nice division
    const length = randomInt(params.min_dimension, params.max_dimension);
    const width = randomInt(params.min_dimension, params.max_dimension);
    const height = randomInt(params.min_dimension, params.max_dimension);
    const volume = length * width * height;

    // Randomly choose which dimension is missing
    const missingDimensions = [
        { name: 'length', value: length, given1: 'width', val1: width, given2: 'height', val2: height },
        { name: 'width', value: width, given1: 'length', val1: length, given2: 'height', val2: height },
        { name: 'height', value: height, given1: 'length', val1: length, given2: 'width', val2: width }
    ];

    const missing = randomChoice(missingDimensions);

    return {
        text: `A cuboid has a volume of ${formatNumber(volume)} ${cubicUnit}. Its ${missing.given1} is ${missing.val1} ${unit} and its ${missing.given2} is ${missing.val2} ${unit}. What is the ${missing.name}?`,
        type: 'text_input',
        answer: String(missing.value),
        hint: `Use the formula: ${missing.name} = volume ÷ (${missing.given1} × ${missing.given2})`,
        module: 'M08_Y6_MEAS'
    };
}

/**
 * Generate unit conversion question
 * Convert between mm³, cm³, m³, km³
 */
function generateUnitConversion(params) {
    if (!params.include_unit_conversion || !params.conversions) {
        return generateCalculateVolume(params);
    }

    const conversion = randomChoice(params.conversions);

    // Generate a suitable number based on conversion
    let baseValue;
    if (conversion.from === 'mm' && conversion.to === 'cm') {
        baseValue = randomInt(2, 10) * 1000; // 2000-10000 mm³
    } else if (conversion.from === 'cm' && conversion.to === 'm') {
        baseValue = randomInt(2, 20) * 1000000; // 2-20 million cm³
    } else if (conversion.from === 'm' && conversion.to === 'km') {
        baseValue = randomInt(2, 10) * 1000000000; // billions
    } else {
        baseValue = randomInt(1000, 10000);
    }

    const fromUnit = getCubicUnit(conversion.from);
    const toUnit = getCubicUnit(conversion.to);
    const convertedValue = baseValue / conversion.factor;

    return {
        text: `Convert ${formatNumber(baseValue)} ${fromUnit} to ${toUnit}.`,
        type: 'text_input',
        answer: String(convertedValue),
        hint: `1 ${toUnit} = ${formatNumber(conversion.factor)} ${fromUnit}`,
        module: 'M08_Y6_MEAS'
    };
}

/**
 * Generate composite volume question
 * L-shaped or combined cuboids
 */
function generateCompositeVolume(params) {
    if (!params.include_composite) {
        return generateCalculateVolume(params);
    }

    const unit = randomChoice(['cm', 'm']);
    const cubicUnit = getCubicUnit(unit);

    // Create an L-shape from two cuboids
    // Cuboid 1 (horizontal base)
    const l1 = randomInt(Math.floor(params.min_dimension * 0.6), Math.floor(params.max_dimension * 0.6));
    const w1 = randomInt(Math.floor(params.min_dimension * 0.6), Math.floor(params.max_dimension * 0.6));
    const h1 = randomInt(Math.floor(params.min_dimension * 0.6), Math.floor(params.max_dimension * 0.6));
    const v1 = l1 * w1 * h1;

    // Cuboid 2 (vertical part)
    const l2 = randomInt(Math.floor(params.min_dimension * 0.6), Math.floor(params.max_dimension * 0.6));
    const w2 = randomInt(Math.floor(params.min_dimension * 0.6), Math.floor(params.max_dimension * 0.6));
    const h2 = randomInt(Math.floor(params.min_dimension * 0.6), Math.floor(params.max_dimension * 0.6));
    const v2 = l2 * w2 * h2;

    const totalVolume = v1 + v2;

    return {
        text: `An L-shaped solid is made by joining two cuboids. The first cuboid measures ${l1} ${unit} × ${w1} ${unit} × ${h1} ${unit}. The second cuboid measures ${l2} ${unit} × ${w2} ${unit} × ${h2} ${unit}. What is the total volume?`,
        type: 'text_input',
        answer: String(totalVolume),
        hint: 'Calculate the volume of each cuboid separately, then add them together',
        module: 'M08_Y6_MEAS'
    };
}

/**
 * Main generator function
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'calculate_volume':
            return generateCalculateVolume(params);
        case 'cube_volume':
            return generateCubeVolume(params);
        case 'compare_volumes':
            return generateCompareVolumes(params);
        case 'formula_recognition':
            return generateFormulaRecognition(params);
        case 'missing_dimension':
            return generateMissingDimension(params);
        case 'unit_conversion':
            return generateUnitConversion(params);
        case 'composite_volume':
            return generateCompositeVolume(params);
        default:
            return generateCalculateVolume(params);
    }
}

export default {
    moduleId: 'M08_Y6_MEAS',
    generate: generateQuestion
};
