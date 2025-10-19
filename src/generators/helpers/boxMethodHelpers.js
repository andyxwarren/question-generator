/**
 * Box Method and Partial Products Helpers for C07 Written Methods
 * Modern digital approach to formal written multiplication/division
 *
 * The box method (also known as the grid method or area model) is a visual
 * approach to multiplication that explicitly shows place value decomposition.
 *
 * Example: 47 × 26
 * Decompose: 47 = 40 + 7, 26 = 20 + 6
 * Grid:
 *        40      7
 *    20  800    140
 *     6  240     42
 * Total: 800 + 140 + 240 + 42 = 1222
 */

import { shuffle } from './N02_numberHelpers.js';
import { getPlaceValueArray } from './N03_placeValueHelpers.js';

/**
 * Decompose number into place value array for box method
 * Wrapper around N03 helper for consistency and clarity
 *
 * @param {number} num - Number to decompose (e.g., 347)
 * @returns {Array<number>} Array of place value parts [300, 40, 7]
 *
 * @example
 * decomposePlaceValue(347)  // Returns [300, 40, 7]
 * decomposePlaceValue(47)   // Returns [40, 7]
 * decomposePlaceValue(5)    // Returns [5]
 */
export function decomposePlaceValue(num) {
    return getPlaceValueArray(num);
}

/**
 * Generate box method grid structure for multiplication
 * This creates the data structure for a×b using box method
 *
 * Example: 47 × 26
 * Decomposes to: 47 = 40 + 7, 26 = 20 + 6
 * Grid:
 *        40      7
 *    20  800    140
 *     6  240     42
 *
 * @param {number} a - First number (becomes columns)
 * @param {number} b - Second number (becomes rows)
 * @returns {Object} Grid data structure with rows, cols, cells, total
 *
 * @example
 * generateBoxGrid(47, 26)
 * // Returns:
 * // {
 * //   rows: [20, 6],
 * //   cols: [40, 7],
 * //   cells: [[{product: 800, ...}, {product: 140, ...}],
 * //           [{product: 240, ...}, {product: 42, ...}]],
 * //   total: 1222,
 * //   numRows: 2,
 * //   numCols: 2
 * // }
 */
export function generateBoxGrid(a, b) {
    const aParts = decomposePlaceValue(a);
    const bParts = decomposePlaceValue(b);

    const grid = [];
    bParts.forEach((bVal, rowIndex) => {
        const row = [];
        aParts.forEach((aVal, colIndex) => {
            row.push({
                rowValue: bVal,
                colValue: aVal,
                product: aVal * bVal,
                rowIndex: rowIndex,
                colIndex: colIndex
            });
        });
        grid.push(row);
    });

    // Calculate total
    const total = grid.reduce((sum, row) => {
        return sum + row.reduce((rowSum, cell) => rowSum + cell.product, 0);
    }, 0);

    return {
        rows: bParts,          // Row headers [20, 6]
        cols: aParts,          // Column headers [40, 7]
        cells: grid,           // 2D array of cell objects
        total: total,          // Final answer (47 × 26 = 1222)
        numRows: bParts.length,
        numCols: aParts.length
    };
}

/**
 * Select random cell positions to blank out for fill-in questions
 * Ensures we don't blank ALL cells (that would be impossible)
 *
 * @param {Array} grid - 2D grid from generateBoxGrid
 * @param {number} numBlanks - Number of cells to blank (1-3)
 * @returns {Array} Array of {row, col} positions
 *
 * @example
 * selectGapPositions(gridData.cells, 2)
 * // Returns: [{row: 0, col: 1}, {row: 1, col: 0}]
 */
export function selectGapPositions(grid, numBlanks) {
    const positions = [];

    // Collect all possible positions
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            positions.push({ row: r, col: c });
        }
    }

    // Edge case: if only 1 cell, can't blank it (would be unsolvable)
    if (positions.length === 1) {
        return [];
    }

    // Don't blank more than half the cells, but always at least 1
    const maxBlanks = Math.max(1, Math.floor(positions.length / 2));
    const actualBlanks = Math.max(1, Math.min(numBlanks, maxBlanks, positions.length - 1));

    // Shuffle and take first N
    const shuffled = shuffle(positions);
    return shuffled.slice(0, actualBlanks);
}

/**
 * Generate clean HTML for box method display
 * Creates a table that looks like:
 *
 *        40      7
 *    20  800    140
 *     6  240     42
 *
 * @param {Object} gridData - From generateBoxGrid
 * @param {Array} gaps - Array of {row, col} to show as blanks (optional)
 * @returns {string} HTML string
 *
 * @example
 * renderBoxMethodHTML(gridData, [{row: 0, col: 1}])
 * // Returns HTML table with cell at row 0, col 1 showing as gap
 */
export function renderBoxMethodHTML(gridData, gaps = []) {
    let html = '<div class="box-method-grid">';
    html += '<table class="calculation-grid">';

    // Header row with column values
    html += '<tr>';
    html += '<th class="corner-cell">×</th>'; // Top-left corner
    gridData.cols.forEach(colVal => {
        html += `<th class="col-header">${colVal}</th>`;
    });
    html += '</tr>';

    // Data rows
    gridData.cells.forEach((row, rowIdx) => {
        html += '<tr>';
        html += `<th class="row-header">${gridData.rows[rowIdx]}</th>`;

        row.forEach((cell, colIdx) => {
            const isGap = gaps.some(g => g.row === rowIdx && g.col === colIdx);
            html += '<td class="product-cell">';

            if (isGap) {
                html += '<span class="gap">____</span>';
            } else {
                html += cell.product;
            }

            html += '</td>';
        });
        html += '</tr>';
    });

    html += '</table>';
    html += '</div>';

    return html;
}

/**
 * Generate partial products representation (linear format)
 * Alternative to box method - shows products as a list
 *
 * Example: 47 × 26
 * Returns:
 * 40 × 20 = 800
 * 40 × 6 = 240
 * 7 × 20 = 140
 * 7 × 6 = 42
 * Total = 1222
 *
 * @param {number} a
 * @param {number} b
 * @returns {Object} {products, total, workingOut, sumExpression}
 *
 * @example
 * generatePartialProducts(47, 26)
 * // Returns:
 * // {
 * //   products: [{factor1: 40, factor2: 20, expression: "40 × 20", value: 800}, ...],
 * //   total: 1222,
 * //   workingOut: "40 × 20 = 800\n40 × 6 = 240\n7 × 20 = 140\n7 × 6 = 42",
 * //   sumExpression: "800 + 240 + 140 + 42"
 * // }
 */
export function generatePartialProducts(a, b) {
    const aParts = decomposePlaceValue(a);
    const bParts = decomposePlaceValue(b);

    const products = [];

    bParts.forEach(bVal => {
        aParts.forEach(aVal => {
            products.push({
                factor1: aVal,
                factor2: bVal,
                expression: `${aVal} × ${bVal}`,
                value: aVal * bVal
            });
        });
    });

    const total = products.reduce((sum, p) => sum + p.value, 0);

    return {
        products: products,
        total: total,
        workingOut: products.map(p => `${p.expression} = ${p.value}`).join('\n'),
        sumExpression: products.map(p => p.value).join(' + ')
    };
}

/**
 * Render partial products as HTML
 *
 * @param {Object} partialData - From generatePartialProducts
 * @param {number} gapIndex - Index of product to hide (-1 for none)
 * @returns {string} HTML
 *
 * @example
 * renderPartialProductsHTML(partialData, 1)
 * // Returns HTML with second product line showing a gap
 */
export function renderPartialProductsHTML(partialData, gapIndex = -1) {
    let html = '<div class="partial-products">\n';

    partialData.products.forEach((product, idx) => {
        const isGap = idx === gapIndex;
        html += '  <div class="product-line">\n';
        html += `    ${product.expression} = `;

        if (isGap) {
            html += '<span class="gap">____</span>';
        } else {
            html += product.value;
        }

        html += '\n  </div>\n';
    });

    html += '  <div class="total-line">\n';
    html += `    Total = ${partialData.total}\n`;
    html += '  </div>\n';
    html += '</div>';

    return html;
}

/**
 * Generate wrong decomposition for distractors
 * Creates plausible but incorrect place value splits
 *
 * @param {number} num
 * @returns {Array<number>} Wrong decomposition
 *
 * @example
 * generateWrongDecomposition(47)
 * // Might return: [4, 7] (digits instead of place values)
 * // Or: [400, 7] (wrong magnitude)
 * // Or: [47] (no decomposition)
 */
export function generateWrongDecomposition(num) {
    // Common errors:
    // 1. Add digits instead of place values (47 -> 4, 7 instead of 40, 7)
    // 2. Wrong place values (47 -> 400, 7)
    // 3. Partial decomposition (47 -> 47, 0)

    const correct = decomposePlaceValue(num);
    const errorType = Math.floor(Math.random() * 3);

    if (errorType === 0) {
        // Digit error: 47 -> [4, 7] instead of [40, 7]
        return String(num).split('').map(d => parseInt(d)).filter(d => d > 0);
    } else if (errorType === 1) {
        // Wrong magnitude: multiply/divide by 10
        return correct.map(val => val * 10);
    } else {
        // No decomposition
        return [num];
    }
}

/**
 * Create a complete box method question with multiple parts
 * Used for more complex Y5/Y6 questions
 *
 * @param {number} a
 * @param {number} b
 * @returns {Object} Complete question data
 *
 * @example
 * createFullBoxMethodWorkflow(47, 26)
 * // Returns complete workflow data for multi-step questions
 */
export function createFullBoxMethodWorkflow(a, b) {
    const gridData = generateBoxGrid(a, b);
    const partialData = generatePartialProducts(a, b);

    return {
        multiplication: `${a} × ${b}`,
        answer: gridData.total,

        // Step 1: Decomposition
        decomposition: {
            first: gridData.cols,
            second: gridData.rows
        },

        // Step 2: Grid
        grid: gridData,

        // Step 3: Partial products
        partials: partialData,

        // Step 4: Sum
        sum: partialData.sumExpression,
        total: gridData.total
    };
}

/**
 * Get a random product from the grid for questioning
 *
 * @param {Object} gridData
 * @returns {Object} Random cell with context
 *
 * @example
 * getRandomProduct(gridData)
 * // Returns: {rowValue: 20, colValue: 40, product: 800, rowIndex: 0, colIndex: 0}
 */
export function getRandomProduct(gridData) {
    const allCells = [];
    gridData.cells.forEach(row => {
        row.forEach(cell => allCells.push(cell));
    });

    const randomCell = allCells[Math.floor(Math.random() * allCells.length)];
    return randomCell;
}

/**
 * Export all functions
 */
export default {
    decomposePlaceValue,
    generateBoxGrid,
    selectGapPositions,
    renderBoxMethodHTML,
    generatePartialProducts,
    renderPartialProductsHTML,
    generateWrongDecomposition,
    createFullBoxMethodWorkflow,
    getRandomProduct
};
