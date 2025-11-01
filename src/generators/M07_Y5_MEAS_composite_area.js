/**
 * M07_Y5_MEAS: Composite Shapes and Area Formulas
 *
 * Curriculum: "measure and calculate the perimeter of composite rectilinear shapes in centimetres
 * and metres; calculate and compare the area of rectangles (including squares), and including using
 * standard units, square centimetres (cm²) and square metres (m²) and estimate the area of irregular shapes"
 *
 * Operations:
 * - rectangle_area: Calculate area using length × width
 * - square_area: Calculate area using side × side
 * - composite_perimeter: Perimeter of L-shapes and T-shapes
 * - compare_areas: Compare areas of different rectangles
 * - composite_area: Area of composite rectilinear shapes
 * - estimate_irregular: Estimate area by counting squares
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
    return unit === 'cm' ? 'cm²' : 'm²';
}

/**
 * Generate rectangle area question
 */
function generateRectangleArea(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    const length = randomInt(params.min_dimension, params.max_dimension);
    const width = randomInt(params.min_dimension, Math.min(length, params.max_dimension));

    const area = length * width;

    return {
        text: `A rectangle has a length of ${length} ${unit} and a width of ${width} ${unit}. What is its area in ${squareUnit}?`,
        type: 'text_input',
        answer: String(area),
        hint: 'Area of rectangle = length × width',
        module: 'M07_Y5_MEAS'
    };
}

/**
 * Generate square area question
 */
function generateSquareArea(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    const side = randomInt(params.min_dimension, params.max_dimension);

    const area = side * side;

    return {
        text: `A square has sides of length ${side} ${unit}. What is its area in ${squareUnit}?`,
        type: 'text_input',
        answer: String(area),
        hint: 'Area of square = side × side',
        module: 'M07_Y5_MEAS'
    };
}

/**
 * Generate composite perimeter question (L-shape or T-shape)
 */
function generateCompositePerimeter(params) {
    const unit = randomChoice(params.units);

    if (params.composite_complexity === 'simple') {
        // L-shape only
        const totalWidth = randomInt(params.min_dimension, params.max_dimension);
        const totalHeight = randomInt(params.min_dimension, params.max_dimension);
        const cutWidth = randomInt(Math.floor(totalWidth / 3), Math.floor(totalWidth * 2 / 3));
        const cutHeight = randomInt(Math.floor(totalHeight / 3), Math.floor(totalHeight * 2 / 3));

        const perimeter = 2 * (totalWidth + totalHeight);

        return {
            text: `An L-shaped figure is made by cutting a ${cutWidth} ${unit} by ${cutHeight} ${unit} rectangle from the corner of a ${totalWidth} ${unit} by ${totalHeight} ${unit} rectangle. What is the perimeter of the L-shape in ${unit}?`,
            type: 'text_input',
            answer: String(perimeter),
            hint: 'The perimeter of the L-shape is the same as the perimeter of the original rectangle',
            module: 'M07_Y5_MEAS'
        };
    } else {
        // T-shape: Calculate perimeter by tracing outer edges
        // Top bar dimensions
        const topWidth = randomInt(params.min_dimension, params.max_dimension);
        const topHeight = randomInt(params.min_dimension, Math.floor(params.max_dimension / 2));

        // Stem dimensions - stem width must be even to avoid fractions
        let stemWidth = randomInt(Math.floor(topWidth / 3), Math.floor(topWidth * 2 / 3));
        if (stemWidth % 2 !== 0) stemWidth += 1; // Make even
        if ((topWidth - stemWidth) % 2 !== 0) stemWidth -= 1; // Ensure overhang is even

        const stemHeight = randomInt(params.min_dimension, params.max_dimension);

        // Perimeter calculation (tracing clockwise from top-left):
        // Top edge + right edge of top + right side of overhang + right edge of stem +
        // bottom edge + left edge of stem + left side of overhang + left edge of top
        const overhang = (topWidth - stemWidth) / 2;
        const perimeter = topWidth + topHeight + overhang + stemHeight +
            stemWidth + stemHeight + overhang + topHeight;

        return {
            text: `A T-shaped figure has a top bar of ${topWidth} ${unit} wide and ${topHeight} ${unit} tall, and a stem of ${stemWidth} ${unit} wide and ${stemHeight} ${unit} tall (centered below the top bar). What is the perimeter in ${unit}?`,
            type: 'text_input',
            answer: String(perimeter),
            hint: 'Draw the T-shape and label all the outer edges, then add them up',
            module: 'M07_Y5_MEAS'
        };
    }
}

/**
 * Generate compare areas question
 */
function generateCompareAreas(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    let length1, width1, area1, length2, width2, area2, difference;
    let attempts = 0;
    const maxAttempts = 10;

    // Retry until we get different areas (with safety limit)
    do {
        length1 = randomInt(params.min_dimension, params.max_dimension);
        width1 = randomInt(params.min_dimension, params.max_dimension);
        area1 = length1 * width1;

        length2 = randomInt(params.min_dimension, params.max_dimension);
        width2 = randomInt(params.min_dimension, params.max_dimension);
        area2 = length2 * width2;

        difference = Math.abs(area1 - area2);
        attempts++;
    } while (area1 === area2 && attempts < maxAttempts);

    // If still equal after max attempts, force a difference
    if (area1 === area2) {
        width2 = width2 > params.min_dimension ? width2 - 1 : width2 + 1;
        area2 = length2 * width2;
        difference = Math.abs(area1 - area2);
    }

    const larger = area1 > area2 ? 'first' : 'second';

    return {
        text: `Rectangle A has dimensions ${length1} ${unit} by ${width1} ${unit}. Rectangle B has dimensions ${length2} ${unit} by ${width2} ${unit}. How much larger is the area of the ${larger} rectangle (in ${squareUnit})?`,
        type: 'text_input',
        answer: String(difference),
        hint: 'Calculate both areas first, then find the difference',
        module: 'M07_Y5_MEAS'
    };
}

/**
 * Generate composite area question
 */
function generateCompositeArea(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    // L-shape: large rectangle minus small rectangle
    const totalLength = randomInt(params.min_dimension, params.max_dimension);
    const totalWidth = randomInt(params.min_dimension, params.max_dimension);
    const cutLength = randomInt(Math.floor(totalLength / 3), Math.floor(totalLength * 2 / 3));
    const cutWidth = randomInt(Math.floor(totalWidth / 3), Math.floor(totalWidth * 2 / 3));

    const totalArea = totalLength * totalWidth;
    const cutArea = cutLength * cutWidth;
    const lShapeArea = totalArea - cutArea;

    return {
        text: `An L-shaped figure is made by cutting a ${cutLength} ${unit} by ${cutWidth} ${unit} rectangle from the corner of a ${totalLength} ${unit} by ${totalWidth} ${unit} rectangle. What is the area of the L-shape in ${squareUnit}?`,
        type: 'text_input',
        answer: String(lShapeArea),
        hint: 'Calculate the area of the large rectangle, then subtract the area of the cut-out rectangle',
        module: 'M07_Y5_MEAS'
    };
}

/**
 * Generate estimate irregular area question
 */
function generateEstimateIrregular(params) {
    const unit = randomChoice(params.units);
    const squareUnit = getSquareUnit(unit);

    // Create an irregular shape on a grid
    // We'll describe it with full squares and partial squares
    const fullSquares = randomInt(8, 20);
    const halfSquares = randomInt(2, 8);

    const estimatedArea = fullSquares + Math.floor(halfSquares / 2);

    return {
        text: `An irregular shape drawn on a square grid covers ${fullSquares} complete squares and approximately ${halfSquares} half-squares. Estimate the area of the shape (counting 2 half-squares as 1 full square).`,
        type: 'text_input',
        answer: String(estimatedArea),
        hint: 'Count the full squares, then count pairs of half-squares as one full square',
        module: 'M07_Y5_MEAS'
    };
}

/**
 * Main generator function
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'rectangle_area':
            return generateRectangleArea(params);
        case 'square_area':
            return generateSquareArea(params);
        case 'composite_perimeter':
            return generateCompositePerimeter(params);
        case 'compare_areas':
            return generateCompareAreas(params);
        case 'composite_area':
            return generateCompositeArea(params);
        case 'estimate_irregular':
            return generateEstimateIrregular(params);
        default:
            return generateRectangleArea(params);
    }
}

export default {
    moduleId: 'M07_Y5_MEAS',
    generate: generateQuestion
};
