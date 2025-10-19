/**
 * Question Templates for C07 Written Methods
 * Reusable question generation functions for box method and partial products
 *
 * This file contains 7 template functions that generate different types of
 * questions for the box method approach to multiplication:
 * 1. Fill in missing product in grid
 * 2. Identify partial products needed
 * 3. Calculate total from completed grid
 * 4. Choose correct grid setup
 * 5. Calculate individual partial product
 * 6. Identify error in grid
 * 7. Word problem using box method
 */

import {
    generateBoxGrid,
    renderBoxMethodHTML,
    selectGapPositions,
    generatePartialProducts,
    renderPartialProductsHTML,
    decomposePlaceValue,
    generateWrongDecomposition,
    getRandomProduct
} from './boxMethodHelpers.js';

import {
    shuffle,
    generateDistractors,
    randomInt,
    randomChoice
} from './N02_numberHelpers.js';

/**
 * TEMPLATE 1: Fill in missing product in box method grid
 * Shows a box method grid with one or more cells blanked out
 * Student must calculate the missing product
 *
 * @param {number} a - First multiplicand
 * @param {number} b - Second multiplicand
 * @param {number} level - Difficulty level 1-4
 * @returns {Object} Question object
 *
 * @example
 * generateFillBoxQuestion(47, 26, 2)
 * // Returns question with box method grid showing some blanks
 */
export function generateFillBoxQuestion(a, b, level) {
    const gridData = generateBoxGrid(a, b);

    // More blanks at higher levels
    const numGaps = Math.min(level, gridData.numRows * gridData.numCols - 1);
    const gaps = selectGapPositions(gridData.cells, numGaps);

    // Edge case: if no gaps (1x1 grid), ask for the total instead
    if (gaps.length === 0) {
        const onlyCell = gridData.cells[0][0];
        return {
            text: `Calculate ${a} × ${b} using the box method below.\n${renderBoxMethodHTML(gridData)}\nWhat is the product?`,
            type: 'text_input',
            answer: gridData.total.toString(),
            hint: `Multiply ${onlyCell.rowValue} × ${onlyCell.colValue}`
        };
    }

    // Get the first gap as the answer we're asking for
    const targetGap = gaps[0];
    const targetCell = gridData.cells[targetGap.row][targetGap.col];
    const answer = targetCell.product;

    return {
        text: `Calculate ${a} × ${b} using the box method below.\n${renderBoxMethodHTML(gridData, gaps)}\nWhat number goes in the highlighted cell?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Multiply ${targetCell.rowValue} × ${targetCell.colValue}`
    };
}

/**
 * TEMPLATE 2: Identify which partial products are needed
 * Multiple choice - choose correct decomposition
 *
 * @param {number} a
 * @param {number} b
 * @param {number} level
 * @returns {Object} Question object
 *
 * @example
 * generatePartialProductsQuestion(47, 26, 3)
 * // Returns multiple choice question about which partial products to calculate
 */
export function generatePartialProductsQuestion(a, b, level) {
    const { products } = generatePartialProducts(a, b);

    // Correct answer: list of all partial products
    const correctAnswer = products.map(p => p.expression).join(', ');

    // Generate distractors with common errors
    const aParts = decomposePlaceValue(a);
    const bParts = decomposePlaceValue(b);

    // Distractor 1: Wrong decomposition of one number
    const wrongAParts = generateWrongDecomposition(a);
    const wrong1Products = [];
    bParts.forEach(bVal => {
        wrongAParts.forEach(aVal => {
            wrong1Products.push(`${aVal} × ${bVal}`);
        });
    });
    const distractor1 = wrong1Products.join(', ');

    // Distractor 2: Just multiply the original numbers (no decomposition)
    const distractor2 = `${a} × ${b}`;

    // Distractor 3: Missing one partial product
    const distractor3 = products.slice(0, -1).map(p => p.expression).join(', ');

    const options = shuffle([
        correctAnswer,
        distractor1,
        distractor2,
        distractor3
    ]);

    return {
        text: `To calculate ${a} × ${b} using the partial products method, which calculations do you need to do?`,
        type: 'multiple_choice',
        options: options,
        answer: correctAnswer,
        hint: 'Break each number into place value parts, then multiply each part by each part'
    };
}

/**
 * TEMPLATE 3: Calculate the total from completed box method
 * Shows filled grid, asks for final answer
 *
 * @param {number} a
 * @param {number} b
 * @param {number} level
 * @returns {Object} Question object
 *
 * @example
 * generateBoxTotalQuestion(47, 26, 1)
 * // Returns question showing complete grid, asking for total
 */
export function generateBoxTotalQuestion(a, b, level) {
    const gridData = generateBoxGrid(a, b);
    const correctAnswer = gridData.total;

    // For lower levels, use text input
    // For higher levels, use multiple choice with distractors
    if (level <= 2) {
        return {
            text: `Use the box method below to calculate ${a} × ${b}.\n${renderBoxMethodHTML(gridData)}\nWhat is the total when you add all the products?`,
            type: 'text_input',
            answer: correctAnswer.toString(),
            hint: 'Add up all the numbers in the grid cells'
        };
    } else {
        const distractors = generateDistractors(correctAnswer, 3, 0, correctAnswer * 2);
        const options = shuffle([correctAnswer.toString(), ...distractors.map(d => d.toString())]);

        return {
            text: `Use the box method below to calculate ${a} × ${b}.\n${renderBoxMethodHTML(gridData)}\nWhat is the total?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: 'Add all the products in the grid'
        };
    }
}

/**
 * TEMPLATE 4: Choose correct grid setup (decomposition check)
 * Tests understanding of how to set up the grid
 *
 * @param {number} a
 * @param {number} b
 * @param {number} level
 * @returns {Object} Question object
 *
 * @example
 * generateSetupQuestion(47, 26, 2)
 * // Returns question asking how to set up the grid correctly
 */
export function generateSetupQuestion(a, b, level) {
    const gridData = generateBoxGrid(a, b);

    // Format: "Rows: 20, 6 | Columns: 40, 7"
    const correct = `Rows: ${gridData.rows.join(', ')} | Columns: ${gridData.cols.join(', ')}`;

    // Distractor 1: Swapped rows/columns
    const wrong1 = `Rows: ${gridData.cols.join(', ')} | Columns: ${gridData.rows.join(', ')}`;

    // Distractor 2: Wrong decomposition
    const wrongA = generateWrongDecomposition(a);
    const wrongB = generateWrongDecomposition(b);
    const wrong2 = `Rows: ${wrongB.join(', ')} | Columns: ${wrongA.join(', ')}`;

    // Distractor 3: No decomposition
    const wrong3 = `Rows: ${b} | Columns: ${a}`;

    const options = shuffle([correct, wrong1, wrong2, wrong3]);

    return {
        text: `To multiply ${a} × ${b} using the box method, how should you set up your grid?\n\n(Rows go across the top, columns go down the left side)`,
        type: 'multiple_choice',
        options: options,
        answer: correct,
        hint: 'Break each number into place value parts: hundreds, tens, ones'
    };
}

/**
 * TEMPLATE 5: Calculate individual partial product
 * Shows one multiplication from the decomposition
 *
 * @param {number} a
 * @param {number} b
 * @param {number} level
 * @returns {Object} Question object
 *
 * @example
 * generateSingleProductQuestion(47, 26, 3)
 * // Returns question asking for one specific partial product
 */
export function generateSingleProductQuestion(a, b, level) {
    const gridData = generateBoxGrid(a, b);
    const randomCell = getRandomProduct(gridData);

    const correctAnswer = randomCell.product;

    if (level <= 2) {
        return {
            text: `When using the box method to calculate ${a} × ${b}, what is ${randomCell.colValue} × ${randomCell.rowValue}?`,
            type: 'text_input',
            answer: correctAnswer.toString(),
            hint: 'Multiply the two numbers'
        };
    } else {
        const distractors = generateDistractors(correctAnswer, 3, 0, correctAnswer * 2);
        const options = shuffle([correctAnswer.toString(), ...distractors.map(d => d.toString())]);

        return {
            text: `In the box method for ${a} × ${b}, one of the partial products is ${randomCell.colValue} × ${randomCell.rowValue}.\n\nWhat is the value?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: 'Calculate this multiplication'
        };
    }
}

/**
 * TEMPLATE 6: Identify error in box method
 * Shows a grid with one wrong product, student identifies it
 * (Higher difficulty - Y5/Y6)
 *
 * @param {number} a
 * @param {number} b
 * @param {number} level
 * @returns {Object} Question object
 *
 * @example
 * generateErrorIdentificationQuestion(47, 26, 4)
 * // Returns question with one incorrect cell value
 */
export function generateErrorIdentificationQuestion(a, b, level) {
    const gridData = generateBoxGrid(a, b);

    // Introduce an error in one cell
    const errorCell = getRandomProduct(gridData);
    const wrongValue = errorCell.product + randomInt(10, 50);

    // Create a modified grid for display
    const modifiedCells = gridData.cells.map(row =>
        row.map(cell => ({
            ...cell,
            product: (cell.rowIndex === errorCell.rowIndex && cell.colIndex === errorCell.colIndex)
                ? wrongValue
                : cell.product
        }))
    );

    const modifiedGrid = {
        ...gridData,
        cells: modifiedCells
    };

    const correctAnswer = `${errorCell.colValue} × ${errorCell.rowValue}`;
    const actualAnswer = errorCell.product;

    return {
        text: `The box method below for ${a} × ${b} has an error.\n${renderBoxMethodHTML(modifiedGrid)}\nWhich cell is incorrect? (Answer format: "number × number")`,
        type: 'text_input',
        answer: correctAnswer,
        hint: `The cell showing ${wrongValue} should be ${actualAnswer}`
    };
}

/**
 * TEMPLATE 7: Word problem using box method
 * Contextual question requiring box method
 *
 * @param {number} a
 * @param {number} b
 * @param {number} level
 * @param {string} context - Optional specific context
 * @returns {Object} Question object
 *
 * @example
 * generateBoxMethodWordProblem(47, 26, 2)
 * // Returns contextual word problem
 */
export function generateBoxMethodWordProblem(a, b, level, context = 'items') {
    const gridData = generateBoxGrid(a, b);
    const answer = gridData.total;

    const contexts = [
        { item: 'pencils', container: 'boxes', scenario: 'A teacher orders' },
        { item: 'books', container: 'shelves', scenario: 'The library has' },
        { item: 'apples', container: 'crates', scenario: 'The shop receives' },
        { item: 'stickers', container: 'packs', scenario: 'A student collects' }
    ];

    const ctx = randomChoice(contexts);

    return {
        text: `${ctx.scenario} ${b} ${ctx.container} with ${a} ${ctx.item} in each ${ctx.container.slice(0, -1)}. Use the box method below to find the total number of ${ctx.item}.\n${renderBoxMethodHTML(gridData)}\nHow many ${ctx.item} in total?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Add all the numbers in the grid: ${gridData.cells.flat().map(c => c.product).join(' + ')}`
    };
}

/**
 * Export all template functions
 */
export default {
    generateFillBoxQuestion,
    generatePartialProductsQuestion,
    generateBoxTotalQuestion,
    generateSetupQuestion,
    generateSingleProductQuestion,
    generateErrorIdentificationQuestion,
    generateBoxMethodWordProblem
};
