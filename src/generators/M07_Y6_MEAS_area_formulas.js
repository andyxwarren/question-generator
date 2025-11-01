/**
 * M07_Y6_MEAS: Area Formulas and Relationships
 *
 * Curriculum: "recognise that shapes with the same areas can have different perimeters and vice versa;
 * calculate the area of parallelograms and triangles; recognise when it is possible to use the
 * formulae for the area of shapes"
 *
 * Operations:
 * - same_area_diff_perimeter: Find shapes with same area but different perimeters
 * - same_perimeter_diff_area: Find shapes with same perimeter but different areas
 * - parallelogram_area: Calculate area of parallelogram (base × height)
 * - triangle_area: Calculate area of triangle (base × height ÷ 2)
 * - formula_recognition: Identify when to use which formula
 * - composite_with_triangles: Area of composite shapes including triangles
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
 * Get the square unit notation for a given unit
 */
function getSquareUnit(unit) {
    if (unit === 'cm') return 'cm²';
    if (unit === 'm') return 'm²';
    if (unit === 'mm') return 'mm²';
    return unit + '²';
}

/**
 * Find factors of a number for creating rectangles with same area
 */
function getFactorPairs(n) {
    const pairs = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            pairs.push([i, n / i]);
        }
    }
    return pairs;
}

/**
 * Generate same area, different perimeter question
 */
function generateSameAreaDiffPerimeter(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    // Choose an area that has multiple factor pairs
    const targetArea = randomInt(12, 48);
    const factorPairs = getFactorPairs(targetArea);

    if (factorPairs.length < 2) {
        return generateSameAreaDiffPerimeter(params); // Regenerate if not enough factors
    }

    const [length1, width1] = factorPairs[0];
    const [length2, width2] = factorPairs[factorPairs.length - 1];

    const perimeter1 = 2 * (length1 + width1);
    const perimeter2 = 2 * (length2 + width2);
    const perimeterDiff = Math.abs(perimeter1 - perimeter2);

    return {
        text: `Two rectangles both have an area of ${targetArea} ${squareUnit}. Rectangle A has dimensions ${length1} ${unit} by ${width1} ${unit}. Rectangle B has dimensions ${length2} ${unit} by ${width2} ${unit}. What is the difference between their perimeters (in ${unit})?`,
        type: 'text_input',
        answer: String(perimeterDiff),
        hint: 'Calculate both perimeters using 2 × (length + width), then find the difference',
        module: 'M07_Y6_MEAS'
    };
}

/**
 * Generate same perimeter, different area question
 */
function generateSamePerimeterDiffArea(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    // Choose a perimeter and create two different rectangles
    const perimeter = randomInt(20, 60);

    // Ensure perimeter is even
    const adjustedPerimeter = perimeter % 2 === 0 ? perimeter : perimeter + 1;

    // Two rectangles with same perimeter
    const length1 = randomInt(Math.floor(adjustedPerimeter / 4), Math.floor(adjustedPerimeter / 3));
    const width1 = (adjustedPerimeter / 2) - length1;

    const length2 = randomInt(Math.floor(adjustedPerimeter / 6), Math.floor(adjustedPerimeter / 5));
    const width2 = (adjustedPerimeter / 2) - length2;

    const area1 = length1 * width1;
    const area2 = length2 * width2;
    const areaDiff = Math.abs(area1 - area2);

    return {
        text: `Two rectangles both have a perimeter of ${adjustedPerimeter} ${unit}. Rectangle A has dimensions ${length1} ${unit} by ${width1} ${unit}. Rectangle B has dimensions ${length2} ${unit} by ${width2} ${unit}. What is the difference between their areas (in ${squareUnit})?`,
        type: 'text_input',
        answer: String(areaDiff),
        hint: 'Calculate both areas using length × width, then find the difference',
        module: 'M07_Y6_MEAS'
    };
}

/**
 * Generate parallelogram area question
 */
function generateParallelogramArea(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    const base = randomInt(params.min_dimension, params.max_dimension);
    const height = randomInt(params.min_dimension, params.max_dimension);

    const area = base * height;

    return {
        text: `A parallelogram has a base of ${base} ${unit} and a perpendicular height of ${height} ${unit}. What is its area in ${squareUnit}?`,
        type: 'text_input',
        answer: String(area),
        hint: 'Area of parallelogram = base × perpendicular height',
        module: 'M07_Y6_MEAS'
    };
}

/**
 * Generate triangle area question
 */
function generateTriangleArea(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    const base = randomInt(params.min_dimension, params.max_dimension);
    // Use even heights to avoid fractions
    const height = randomInt(params.min_dimension, params.max_dimension);

    const area = (base * height) / 2;

    // If area is not a whole number, adjust
    if (area !== Math.floor(area)) {
        const adjustedHeight = height % 2 === 0 ? height : height + 1;
        const adjustedArea = (base * adjustedHeight) / 2;

        return {
            text: `A triangle has a base of ${base} ${unit} and a perpendicular height of ${adjustedHeight} ${unit}. What is its area in ${squareUnit}?`,
            type: 'text_input',
            answer: String(adjustedArea),
            hint: 'Area of triangle = (base × perpendicular height) ÷ 2',
            module: 'M07_Y6_MEAS'
        };
    }

    return {
        text: `A triangle has a base of ${base} ${unit} and a perpendicular height of ${height} ${unit}. What is its area in ${squareUnit}?`,
        type: 'text_input',
        answer: String(area),
        hint: 'Area of triangle = (base × perpendicular height) ÷ 2',
        module: 'M07_Y6_MEAS'
    };
}

/**
 * Generate formula recognition question
 */
function generateFormulaRecognition(params) {
    const shapes = ['rectangle', 'square', 'parallelogram', 'triangle'];
    const shape = randomChoice(shapes);

    const formulas = {
        'rectangle': 'length × width',
        'square': 'side × side',
        'parallelogram': 'base × height',
        'triangle': '(base × height) ÷ 2'
    };

    const correctFormula = formulas[shape];

    const options = [
        'length × width',
        'side × side',
        'base × height',
        '(base × height) ÷ 2'
    ];

    return {
        text: `Which formula would you use to calculate the area of a ${shape}?`,
        type: 'multiple_choice',
        answer: correctFormula,
        options: options,
        module: 'M07_Y6_MEAS'
    };
}

/**
 * Generate composite shape with triangles question
 */
function generateCompositeWithTriangles(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    // A rectangle with a triangle on top (like a house shape)
    const rectangleLength = randomInt(params.min_dimension, params.max_dimension);
    const rectangleWidth = randomInt(params.min_dimension, params.max_dimension);

    // Triangle has same base as rectangle width
    const triangleBase = rectangleWidth;
    const triangleHeight = randomInt(params.min_dimension, Math.floor(params.max_dimension / 2));

    // Ensure triangle height is even for whole number area
    const adjustedTriangleHeight = triangleHeight % 2 === 0 ? triangleHeight : triangleHeight + 1;

    const rectangleArea = rectangleLength * rectangleWidth;
    const triangleArea = (triangleBase * adjustedTriangleHeight) / 2;
    const totalArea = rectangleArea + triangleArea;

    return {
        text: `A house-shaped figure is made of a rectangle (${rectangleLength} ${unit} by ${rectangleWidth} ${unit}) with a triangular roof on top. The triangle has a base of ${triangleBase} ${unit} (same as the rectangle width) and a height of ${adjustedTriangleHeight} ${unit}. What is the total area in ${squareUnit}?`,
        type: 'text_input',
        answer: String(totalArea),
        hint: 'Calculate the area of the rectangle and the triangle separately, then add them together',
        module: 'M07_Y6_MEAS'
    };
}

/**
 * Main generator function
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'same_area_diff_perimeter':
            return generateSameAreaDiffPerimeter(params);
        case 'same_perimeter_diff_area':
            return generateSamePerimeterDiffArea(params);
        case 'parallelogram_area':
            return generateParallelogramArea(params);
        case 'triangle_area':
            return generateTriangleArea(params);
        case 'formula_recognition':
            return generateFormulaRecognition(params);
        case 'composite_with_triangles':
            return generateCompositeWithTriangles(params);
        default:
            return generateParallelogramArea(params);
    }
}

export default {
    moduleId: 'M07_Y6_MEAS',
    generate: generateQuestion
};
