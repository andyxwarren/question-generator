/**
 * M07_Y3_MEAS: Perimeter of Simple Shapes
 *
 * Curriculum: "measure the perimeter of simple 2-D shapes"
 *
 * Operations:
 * - rectangle_perimeter: Calculate perimeter of rectangle given length and width
 * - square_perimeter: Calculate perimeter of square given side length
 * - triangle_perimeter: Calculate perimeter of triangle given three sides
 * - pentagon_perimeter: Calculate perimeter of pentagon given five sides
 * - hexagon_perimeter: Calculate perimeter of hexagon given six sides
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
 * Generate rectangle perimeter question
 */
function generateRectanglePerimeter(params) {
    const unit = randomChoice(params.units);
    const length = randomInt(params.min_side, params.max_side);
    const width = randomInt(params.min_side, Math.min(length - 1, params.max_side));

    const perimeter = 2 * (length + width);

    return {
        text: `A rectangle has a length of ${length} ${unit} and a width of ${width} ${unit}. What is its perimeter in ${unit}?`,
        type: 'text_input',
        answer: String(perimeter),
        hint: 'Add up all four sides: length + width + length + width',
        module: 'M07_Y3_MEAS'
    };
}

/**
 * Generate square perimeter question
 */
function generateSquarePerimeter(params) {
    const unit = randomChoice(params.units);
    const side = randomInt(params.min_side, params.max_side);

    const perimeter = 4 * side;

    return {
        text: `A square has sides of length ${side} ${unit}. What is its perimeter in ${unit}?`,
        type: 'text_input',
        answer: String(perimeter),
        hint: 'A square has 4 equal sides. Multiply the side length by 4',
        module: 'M07_Y3_MEAS'
    };
}

/**
 * Generate triangle perimeter question
 */
function generateTrianglePerimeter(params) {
    const unit = randomChoice(params.units);

    // Generate three sides that form a valid triangle (triangle inequality)
    const side1 = randomInt(params.min_side, params.max_side);
    const side2 = randomInt(params.min_side, params.max_side);
    // Ensure triangle inequality: side3 < side1 + side2 and side3 + min(side1,side2) > max(side1,side2)
    const maxSide3 = side1 + side2 - 1;
    const minSide3 = Math.abs(side1 - side2) + 1;
    const side3 = randomInt(Math.max(minSide3, params.min_side), Math.min(maxSide3, params.max_side));

    const perimeter = side1 + side2 + side3;

    return {
        text: `A triangle has sides of length ${side1} ${unit}, ${side2} ${unit}, and ${side3} ${unit}. What is its perimeter in ${unit}?`,
        type: 'text_input',
        answer: String(perimeter),
        hint: 'Add all three sides together',
        module: 'M07_Y3_MEAS'
    };
}

/**
 * Generate pentagon perimeter question (regular pentagon - all sides equal)
 */
function generatePentagonPerimeter(params) {
    const unit = randomChoice(params.units);
    const side = randomInt(params.min_side, params.max_side);

    const perimeter = 5 * side;

    return {
        text: `A regular pentagon (5-sided shape) has sides of length ${side} ${unit}. What is its perimeter in ${unit}?`,
        type: 'text_input',
        answer: String(perimeter),
        hint: 'A pentagon has 5 equal sides. Add them all up',
        module: 'M07_Y3_MEAS'
    };
}

/**
 * Generate hexagon perimeter question (regular hexagon - all sides equal)
 */
function generateHexagonPerimeter(params) {
    const unit = randomChoice(params.units);
    const side = randomInt(params.min_side, params.max_side);

    const perimeter = 6 * side;

    return {
        text: `A regular hexagon (6-sided shape) has sides of length ${side} ${unit}. What is its perimeter in ${unit}?`,
        type: 'text_input',
        answer: String(perimeter),
        hint: 'A hexagon has 6 equal sides. Add them all up',
        module: 'M07_Y3_MEAS'
    };
}

/**
 * Main generator function
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'rectangle_perimeter':
            return generateRectanglePerimeter(params);
        case 'square_perimeter':
            return generateSquarePerimeter(params);
        case 'triangle_perimeter':
            return generateTrianglePerimeter(params);
        case 'pentagon_perimeter':
            return generatePentagonPerimeter(params);
        case 'hexagon_perimeter':
            return generateHexagonPerimeter(params);
        default:
            return generateRectanglePerimeter(params);
    }
}

export default {
    moduleId: 'M07_Y3_MEAS',
    generate: generateQuestion
};
