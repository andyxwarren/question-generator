/**
 * M07_Y4_MEAS: Perimeter and Area of Rectilinear Figures
 *
 * Curriculum: "measure and calculate the perimeter of a rectilinear figure (including squares)
 * in centimetres and metres; find the area of rectilinear shapes by counting squares"
 *
 * Operations:
 * - rectilinear_perimeter: Calculate perimeter of L-shaped or rectangular figure
 * - count_squares: Count squares in a grid to find area
 * - rectilinear_missing_sides: Find missing sides of rectilinear figure given perimeter
 * - complex_rectilinear: More complex rectilinear shapes
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
 * Create a text-based grid representation for counting squares
 */
function createGrid(width, height) {
    let grid = '';
    for (let row = 0; row < height; row++) {
        grid += '┌' + '───┬'.repeat(width - 1) + '───┐\n';
        grid += '│   │'.repeat(width) + '\n';
        if (row < height - 1) {
            grid += '├' + '───┼'.repeat(width - 1) + '───┤\n';
        } else {
            grid += '└' + '───┴'.repeat(width - 1) + '───┘\n';
        }
    }
    return grid;
}

/**
 * Generate count squares question
 */
function generateCountSquares(params) {
    const unit = randomChoice(params.units);
    const width = randomInt(2, params.max_dimensions[0]);
    const height = randomInt(2, params.max_dimensions[1]);

    const area = width * height;
    const grid = createGrid(width, height);

    return {
        text: `Count the number of squares in this rectangle:\n\n<pre class="shape-display">${grid}</pre>\n\nHow many squares are there?`,
        type: 'text_input',
        answer: String(area),
        hint: `Count the squares row by row, or multiply width by height`,
        module: 'M07_Y4_MEAS'
    };
}

/**
 * Generate simple rectilinear perimeter (L-shape)
 */
function generateRectilinearPerimeter(params) {
    const unit = randomChoice(params.units);

    // Create an L-shape with 6 sides
    // Think of it as a large rectangle with a rectangular piece cut from corner
    const totalWidth = randomInt(params.min_side, params.max_side);
    const totalHeight = randomInt(params.min_side, params.max_side);
    const cutWidth = randomInt(Math.floor(totalWidth / 3), Math.floor(totalWidth * 2 / 3));
    const cutHeight = randomInt(Math.floor(totalHeight / 3), Math.floor(totalHeight * 2 / 3));

    const perimeter = (totalWidth + totalHeight + (totalWidth - cutWidth) +
        (totalHeight - cutHeight) + cutWidth + cutHeight);

    if (params.show_all_sides) {
        return {
            text: `An L-shaped figure has the following sides: ${totalWidth} ${unit}, ${totalHeight} ${unit}, ${cutWidth} ${unit}, ${cutHeight} ${unit}, ${totalWidth - cutWidth} ${unit}, and ${totalHeight - cutHeight} ${unit}. What is its perimeter in ${unit}?`,
            type: 'text_input',
            answer: String(perimeter),
            hint: 'Add all six sides together',
            module: 'M07_Y4_MEAS'
        };
    } else {
        // Don't give all sides - student must figure out missing ones
        return {
            text: `An L-shaped figure has these visible sides: ${totalWidth} ${unit} (bottom), ${totalHeight} ${unit} (right), and ${cutWidth} ${unit} (top cut). The shape is rectilinear (all angles are right angles). What is its perimeter in ${unit}?`,
            type: 'text_input',
            answer: String(perimeter),
            hint: 'In a rectilinear shape, opposite sides add up to the same total. Work out the missing sides first',
            module: 'M07_Y4_MEAS'
        };
    }
}

/**
 * Generate missing side question for rectangle
 */
function generateRectilinearMissingSides(params) {
    const unit = randomChoice(params.units);

    // Simple rectangle with one side missing
    const length = randomInt(params.min_side, params.max_side);
    const width = randomInt(params.min_side, Math.min(length, params.max_side));
    const perimeter = 2 * (length + width);

    // Randomly hide length or width
    const hideSide = randomChoice(['length', 'width']);

    if (hideSide === 'length') {
        return {
            text: `A rectangle has a perimeter of ${perimeter} ${unit} and a width of ${width} ${unit}. What is its length in ${unit}?`,
            type: 'text_input',
            answer: String(length),
            hint: 'Perimeter = 2 × (length + width). Use this to find the missing length',
            module: 'M07_Y4_MEAS'
        };
    } else {
        return {
            text: `A rectangle has a perimeter of ${perimeter} ${unit} and a length of ${length} ${unit}. What is its width in ${unit}?`,
            type: 'text_input',
            answer: String(width),
            hint: 'Perimeter = 2 × (length + width). Use this to find the missing width',
            module: 'M07_Y4_MEAS'
        };
    }
}

/**
 * Generate complex rectilinear question
 * Creates an L-shape with larger dimensions
 */
function generateComplexRectilinear(params) {
    const unit = randomChoice(params.units);

    // Create an L-shape (same as simple but with larger numbers)
    // Total rectangle dimensions
    const totalWidth = randomInt(params.min_side, params.max_side);
    const totalHeight = randomInt(params.min_side, params.max_side);

    // Cut-out rectangle dimensions (from top-right corner)
    const cutWidth = randomInt(Math.floor(totalWidth / 3), Math.floor(totalWidth * 2 / 3));
    const cutHeight = randomInt(Math.floor(totalHeight / 3), Math.floor(totalHeight * 2 / 3));

    // L-shape perimeter: same as the perimeter of the full rectangle
    // because the "inside" edges of the cut add back the same length
    const perimeter = 2 * (totalWidth + totalHeight);

    return {
        text: `An L-shaped figure fits inside a ${totalWidth} ${unit} by ${totalHeight} ${unit} rectangle. A ${cutWidth} ${unit} by ${cutHeight} ${unit} rectangle has been cut from one corner. What is the perimeter of the L-shape in ${unit}?`,
        type: 'text_input',
        answer: String(perimeter),
        hint: 'The perimeter of an L-shape equals the perimeter of the original rectangle',
        module: 'M07_Y4_MEAS'
    };
}

/**
 * Main generator function
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'rectilinear_perimeter':
            return generateRectilinearPerimeter(params);
        case 'count_squares':
            return generateCountSquares(params);
        case 'rectilinear_missing_sides':
            return generateRectilinearMissingSides(params);
        case 'complex_rectilinear':
            return generateComplexRectilinear(params);
        default:
            return generateRectilinearPerimeter(params);
    }
}

export default {
    moduleId: 'M07_Y4_MEAS',
    generate: generateQuestion
};
