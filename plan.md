# Agent Instructions: Implement C07 Written Methods Modules (Box Method Approach)

## OBJECTIVE
Implement 5 calculation generators (C07_Y2_CALC through C07_Y6_CALC) for written multiplication and division methods using modern box method and partial products approach. This is a 4-week implementation targeting MVP launch with UI/UX enhancements deferred to later phases.

---

## CONTEXT & EXISTING CODEBASE

### Current Architecture
You are working in a UK Maths Practice application with:
- **Parameter-based architecture**: All modules defined in `src/curriculum/parameters/C_calculations.js`
- **Pure function generators**: Each generator takes `(params, level)` and returns question objects
- **Helper function library**: Reusable utilities in `src/generators/helpers/`
- **Question schema**: All questions follow a standard format (see below)

### Existing Helper Files You Will Use

**File: `src/generators/helpers/N03_placeValueHelpers.js`** (ALREADY EXISTS)
```javascript
// Key functions you'll adapt/use:

/**
 * Get expanded form of a number
 * @param {number} num - The number
 * @returns {string} E.g., "300 + 40 + 7"
 */
export function getExpandedForm(num) {
    const parts = [];
    let remaining = Math.abs(num);
    const powers = [10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];

    powers.forEach(power => {
        const digit = Math.floor(remaining / power);
        if (digit > 0) {
            parts.push(digit * power);
        }
        remaining = remaining % power;
    });

    return parts.length > 0 ? parts.join(' + ') : '0';
}

/**
 * Get place value of a digit
 * @param {number} num - The number
 * @param {string} place - 'ones', 'tens', 'hundreds', etc.
 * @returns {number} The value (e.g., in 347, tens place = 40)
 */
export function getPlaceValue(num, place) {
    const placeValues = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000,
        'ten thousands': 10000,
        'hundred thousands': 100000,
        'millions': 1000000,
        'ten millions': 10000000
    };

    const divisor = placeValues[place];
    if (!divisor) return 0;

    return Math.floor((Math.abs(num) / divisor) % 10) * divisor;
}

/**
 * Decompose a number into place value parts
 * @param {number} num - The number to decompose
 * @param {string[]} places - Array of places to include
 * @returns {Object} Object with place names as keys and values
 */
export function decomposeNumber(num, places) {
    const result = {};
    places.forEach(place => {
        result[place] = getPlaceValue(num, place);
    });
    return result;
}
```

**File: `src/generators/helpers/N02_numberHelpers.js`** (ALREADY EXISTS)
```javascript
// Key functions you'll use:

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function generateDistractors(correctAnswer, count, min, max) {
    const distractors = [];
    const offset = Math.max(Math.floor(correctAnswer * 0.2), 10);
    
    while (distractors.length < count) {
        const distractor = correctAnswer + randomInt(-offset, offset);
        if (distractor !== correctAnswer && 
            distractor >= min && 
            distractor <= max &&
            !distractors.includes(distractor)) {
            distractors.push(distractor);
        }
    }
    return distractors;
}
```

### Standard Question Object Schema
```javascript
{
    text: string,              // Question text (can include HTML)
    type: 'text_input' | 'multiple_choice',
    answer: string,            // ⚠️ ALWAYS STRING (even for numbers)
    
    // For multiple choice only:
    options: Array<string>,    // Array of answer options
    
    // Optional fields:
    hint: string,              // Helpful hint text
    
    // Auto-added by engine (don't include):
    // id, timestamp, module, level
}
```

### C07 Module Parameters (ALREADY DEFINED in parameters)
```javascript
// From src/curriculum/parameters/C_calculations.js
{
    C07_Y2_CALC: {
        id: 'C07_Y2_CALC',
        operations: ['write_multiplication', 'write_division', 'identify_symbols'],
        levels: {
            1: { max_value: 10 },
            2: { max_value: 20 },
            3: { max_value: 50 },
            4: { max_value: 100 }
        }
    },
    C07_Y3_CALC: {
        id: 'C07_Y3_CALC',
        operations: ['box_method_2x1', 'partial_products', 'identify_decomposition'],
        levels: {
            1: { max_value: 30, multiplier: 5 },
            2: { max_value: 50, multiplier: 7 },
            3: { max_value: 80, multiplier: 9 },
            4: { max_value: 99, multiplier: 9 }
        }
    },
    // ... Y4, Y5, Y6 also defined
}
```

---

## IMPLEMENTATION PLAN: 4 WEEKS

---

# WEEK 1: FOUNDATION (Days 1-5)

## DAY 1-2: Create Box Method Helper Functions

### TASK 1.1: Create `src/generators/helpers/boxMethodHelpers.js`

Create a NEW file with the following complete implementation:

```javascript
/**
 * Box Method and Partial Products Helpers for C07 Written Methods
 * Modern digital approach to formal written multiplication/division
 */

import { shuffle } from './N02_numberHelpers.js';

/**
 * Decompose number into place value array for box method
 * Based on existing getExpandedForm but returns array of numbers
 * @param {number} num - Number to decompose (e.g., 347)
 * @returns {Array<number>} Array of place value parts [300, 40, 7]
 */
export function decomposePlaceValue(num) {
    const parts = [];
    let remaining = Math.abs(num);
    
    // Handle numbers up to 9999 (adequate for primary school)
    const powers = [1000, 100, 10, 1];
    
    powers.forEach(power => {
        const digit = Math.floor(remaining / power);
        if (digit > 0) {
            parts.push(digit * power);
        }
        remaining = remaining % power;
    });
    
    return parts.length > 0 ? parts : [0];
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
 * @returns {Object} Grid data structure
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
 * @param {Array} grid - 2D grid from generateBoxGrid
 * @param {number} numBlanks - Number of cells to blank (1-3)
 * @returns {Array} Array of {row, col} positions
 */
export function selectGapPositions(grid, numBlanks) {
    const positions = [];
    
    // Collect all possible positions
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            positions.push({ row: r, col: c });
        }
    }
    
    // Don't blank more than half the cells
    const maxBlanks = Math.floor(positions.length / 2);
    const actualBlanks = Math.min(numBlanks, maxBlanks);
    
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
 */
export function renderBoxMethodHTML(gridData, gaps = []) {
    let html = '<div class="box-method-grid">\n';
    html += '<table class="calculation-grid">\n';
    
    // Header row with column values
    html += '  <tr>\n';
    html += '    <th class="corner-cell">×</th>\n'; // Top-left corner
    gridData.cols.forEach(colVal => {
        html += `    <th class="col-header">${colVal}</th>\n`;
    });
    html += '  </tr>\n';
    
    // Data rows
    gridData.cells.forEach((row, rowIdx) => {
        html += '  <tr>\n';
        html += `    <th class="row-header">${gridData.rows[rowIdx]}</th>\n`;
        
        row.forEach((cell, colIdx) => {
            const isGap = gaps.some(g => g.row === rowIdx && g.col === colIdx);
            html += '    <td class="product-cell">';
            
            if (isGap) {
                html += '<span class="gap">____</span>';
            } else {
                html += cell.product;
            }
            
            html += '</td>\n';
        });
        html += '  </tr>\n';
    });
    
    html += '</table>\n';
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
 * @returns {Object}
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
 * @param {Object} partialData - From generatePartialProducts
 * @param {number} gapIndex - Index of product to hide (-1 for none)
 * @returns {string} HTML
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
 * @param {number} num 
 * @returns {Array<number>}
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
 * @param {number} a 
 * @param {number} b 
 * @returns {Object} Complete question data
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
 * @param {Object} gridData 
 * @returns {Object} Random cell with context
 */
export function getRandomProduct(gridData) {
    const allCells = [];
    gridData.cells.forEach(row => {
        row.forEach(cell => allCells.push(cell));
    });
    
    const randomCell = allCells[Math.floor(Math.random() * allCells.length)];
    return randomCell;
}
```

**VALIDATION STEPS:**
1. Test `decomposePlaceValue()` with: 7, 47, 347, 1234
   - Expected: [7], [40, 7], [300, 40, 7], [1000, 200, 30, 4]
2. Test `generateBoxGrid(47, 26)`:
   - Should return grid with rows: [20, 6], cols: [40, 7]
   - Cell products: [[800, 140], [240, 42]]
   - Total: 1222
3. Test HTML rendering doesn't crash
4. All functions should handle single-digit numbers (5 × 3)

---

## DAY 3: Create CSS Styling

### TASK 3.1: Add to `styles/main.css`

Add the following CSS block to your existing `main.css` file:

```css
/* ============================================
   C07 BOX METHOD AND WRITTEN METHODS STYLING
   ============================================ */

/* Container for box method grid */
.box-method-grid {
    margin: 20px auto;
    display: inline-block;
    max-width: 100%;
    overflow-x: auto;
}

/* The calculation grid table */
.calculation-grid {
    border-collapse: collapse;
    font-family: 'Courier New', Monaco, monospace;
    font-size: 18px;
    margin: 0 auto;
    background-color: #ffffff;
}

/* Corner cell (top-left × symbol) */
.calculation-grid .corner-cell {
    background-color: #e8e8e8;
    padding: 10px 15px;
    border: 2px solid #333;
    font-weight: bold;
    text-align: center;
    min-width: 50px;
}

/* Column headers (top row with place values) */
.calculation-grid .col-header {
    background-color: #f0f0f0;
    padding: 10px 15px;
    border: 2px solid #333;
    font-weight: bold;
    text-align: center;
    min-width: 80px;
    color: #2c5aa0;
}

/* Row headers (left column with place values) */
.calculation-grid .row-header {
    background-color: #f0f0f0;
    padding: 10px 15px;
    border: 2px solid #333;
    font-weight: bold;
    text-align: center;
    min-width: 50px;
    color: #2c5aa0;
}

/* Product cells (the answers in the grid) */
.calculation-grid .product-cell {
    padding: 12px 15px;
    border: 1px solid #666;
    text-align: center;
    min-width: 80px;
    background-color: #fafafa;
    font-size: 16px;
}

/* Highlighted/gap cells (for fill-in questions) */
.calculation-grid .gap {
    color: #999;
    font-style: italic;
    font-weight: bold;
    letter-spacing: 2px;
}

/* Hover effect for product cells */
.calculation-grid .product-cell:hover {
    background-color: #fff8e1;
}

/* ============================================
   PARTIAL PRODUCTS LINEAR FORMAT
   ============================================ */

.partial-products {
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-left: 4px solid #4CAF50;
    font-family: 'Courier New', Monaco, monospace;
    max-width: 400px;
    border-radius: 4px;
}

.partial-products .product-line {
    margin: 8px 0;
    padding: 6px 10px;
    font-size: 16px;
    background-color: #ffffff;
    border-radius: 3px;
}

.partial-products .total-line {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 3px solid #333;
    font-weight: bold;
    font-size: 18px;
    color: #2c5aa0;
}

/* ============================================
   RESPONSIVE DESIGN FOR MOBILE
   ============================================ */

@media screen and (max-width: 768px) {
    .calculation-grid {
        font-size: 14px;
    }
    
    .calculation-grid th,
    .calculation-grid td {
        padding: 8px 10px;
        min-width: 60px;
    }
    
    .partial-products {
        font-size: 14px;
        padding: 15px;
    }
}

@media screen and (max-width: 480px) {
    .calculation-grid {
        font-size: 12px;
    }
    
    .calculation-grid th,
    .calculation-grid td {
        padding: 6px 8px;
        min-width: 50px;
    }
}

/* ============================================
   ACCESSIBILITY
   ============================================ */

/* High contrast mode support */
@media (prefers-contrast: high) {
    .calculation-grid {
        border: 3px solid #000;
    }
    
    .calculation-grid th,
    .calculation-grid td {
        border: 2px solid #000;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .calculation-grid .product-cell:hover {
        transition: none;
    }
}
```

**VALIDATION STEPS:**
1. Create a test HTML file with sample box method grid
2. View on desktop, tablet, mobile
3. Check accessibility with screen reader
4. Verify high contrast mode

---

## DAY 4-5: Create Question Type Templates

### TASK 4.1: Create `src/generators/helpers/c07QuestionTemplates.js`

Create a NEW file with reusable question generation functions:

```javascript
/**
 * Question Templates for C07 Written Methods
 * Reusable question types for box method and partial products
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
 */
export function generateFillBoxQuestion(a, b, level) {
    const gridData = generateBoxGrid(a, b);
    
    // More blanks at higher levels
    const numGaps = Math.min(level, gridData.numRows * gridData.numCols - 1);
    const gaps = selectGapPositions(gridData.cells, numGaps);
    
    // Get the first gap as the answer we're asking for
    const targetGap = gaps[0];
    const targetCell = gridData.cells[targetGap.row][targetGap.col];
    const answer = targetCell.product;
    
    return {
        text: `Complete the box method calculation for ${a} × ${b}:\n\n${renderBoxMethodHTML(gridData, gaps)}\n\nWhat number goes in the highlighted cell?`,
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
 */
export function generateBoxTotalQuestion(a, b, level) {
    const gridData = generateBoxGrid(a, b);
    const correctAnswer = gridData.total;
    
    // For lower levels, use text input
    // For higher levels, use multiple choice with distractors
    if (level <= 2) {
        return {
            text: `This box method shows ${a} × ${b}:\n\n${renderBoxMethodHTML(gridData)}\n\nWhat is the total when you add all the products?`,
            type: 'text_input',
            answer: correctAnswer.toString(),
            hint: 'Add up all the numbers in the grid cells'
        };
    } else {
        const distractors = generateDistractors(correctAnswer, 3, 0, correctAnswer * 2);
        const options = shuffle([correctAnswer.toString(), ...distractors.map(d => d.toString())]);
        
        return {
            text: `This box method shows ${a} × ${b}:\n\n${renderBoxMethodHTML(gridData)}\n\nWhat is the total?`,
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
        text: `This box method calculation for ${a} × ${b} has an error:\n\n${renderBoxMethodHTML(modifiedGrid)}\n\nWhich cell is incorrect? (Answer format: "number × number")`,
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
 * @param {string} context - e.g., 'boxes of pencils'
 * @returns {Object} Question object
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
        text: `${ctx.scenario} ${b} ${ctx.container} with ${a} ${ctx.item} in each ${ctx.container.slice(0, -1)}.\n\nUse the box method to find the total number of ${ctx.item}.\n\n${renderBoxMethodHTML(gridData)}\n\nHow many ${ctx.item} in total?`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Add all the numbers in the grid: ${gridData.cells.flat().map(c => c.product).join(' + ')}`
    };
}
```

**VALIDATION STEPS:**
1. Test each template function with small numbers (e.g., 12 × 3)
2. Verify all return valid question objects matching schema
3. Check that `answer` is always a string
4. Test at different levels (1-4)
5. Verify HTML renders correctly

---

# WEEK 2: CORE GENERATORS (Days 6-10)

## DAY 6-7: C07_Y2_CALC - Basic Written Methods

### TASK 6.1: Create `src/generators/C07_Y2_CALC_statements.js`

Year 2 focuses on understanding symbols and writing simple equations:

```javascript
/**
 * C07_Y2_CALC - Written Methods (Year 2)
 * Focus: Writing multiplication/division using symbols
 * National Curriculum: "write them using the multiplication (×), division (÷) and equals (=) signs"
 */

import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';
import { decomposePlaceValue } from './helpers/boxMethodHelpers.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    
    switch(operation) {
        case 'write_multiplication':
            return generateWriteMultiplication(params, level);
        case 'write_division':
            return generateWriteDivision(params, level);
        case 'identify_symbols':
            return generateIdentifySymbols(params, level);
        default:
            return generateWriteMultiplication(params, level);
    }
}

/**
 * Write a multiplication statement
 */
function generateWriteMultiplication(params, level) {
    const groups = randomInt(2, params.max_value / 2);
    const itemsPerGroup = randomInt(2, 10);
    const answer = groups * itemsPerGroup;
    
    const items = ['apples', 'pencils', 'books', 'stickers', 'marbles', 'sweets'];
    const item = randomChoice(items);
    
    if (level <= 2) {
        // Simple: just write the equation
        return {
            text: `There are ${groups} groups with ${itemsPerGroup} ${item} in each group.\n\nWrite the multiplication: ___ × ___ = ___`,
            type: 'text_input',
            answer: `${groups} × ${itemsPerGroup} = ${answer}`,
            hint: 'Format: number × number = answer'
        };
    } else {
        // Multiple choice: choose correct statement
        const correct = `${groups} × ${itemsPerGroup} = ${answer}`;
        const wrong1 = `${groups} + ${itemsPerGroup} = ${groups + itemsPerGroup}`;
        const wrong2 = `${itemsPerGroup} × ${groups} = ${answer + 5}`;
        const wrong3 = `${groups} × ${itemsPerGroup} = ${groups * (itemsPerGroup + 1)}`;
        
        const options = shuffle([correct, wrong1, wrong2, wrong3]);
        
        return {
            text: `There are ${groups} groups with ${itemsPerGroup} ${item} in each group.\n\nWhich statement is correct?`,
            type: 'multiple_choice',
            options: options,
            answer: correct,
            hint: 'Number of groups × items per group = total'
        };
    }
}

/**
 * Write a division statement
 */
function generateWriteDivision(params, level) {
    const divisor = randomInt(2, 10);
    const quotient = randomInt(2, Math.floor(params.max_value / divisor));
    const dividend = divisor * quotient;
    
    const items = ['apples', 'pencils', 'books', 'stickers'];
    const item = randomChoice(items);
    
    if (level <= 2) {
        return {
            text: `Share ${dividend} ${item} equally among ${divisor} children.\n\nWrite the division: ___ ÷ ___ = ___`,
            type: 'text_input',
            answer: `${dividend} ÷ ${divisor} = ${quotient}`,
            hint: 'Format: total ÷ number of groups = amount in each group'
        };
    } else {
        const correct = `${dividend} ÷ ${divisor} = ${quotient}`;
        const wrong1 = `${dividend} - ${divisor} = ${dividend - divisor}`;
        const wrong2 = `${dividend} ÷ ${quotient} = ${divisor}`;
        const wrong3 = `${divisor} ÷ ${dividend} = ${quotient}`;
        
        const options = shuffle([correct, wrong1, wrong2, wrong3]);
        
        return {
            text: `Share ${dividend} ${item} equally among ${divisor} children.\n\nWhich division statement is correct?`,
            type: 'multiple_choice',
            options: options,
            answer: correct,
            hint: 'Total ÷ number of groups = amount per group'
        };
    }
}

/**
 * Identify which symbol is needed
 */
function generateIdentifySymbols(params, level) {
    const scenarios = [
        {
            text: '5 bags with 3 sweets in each bag. Total sweets?',
            correct: '×',
            equation: '5 × 3 = 15'
        },
        {
            text: '12 pencils shared equally among 4 children. Pencils per child?',
            correct: '÷',
            equation: '12 ÷ 4 = 3'
        },
        {
            text: '6 groups of 4 apples. Total apples?',
            correct: '×',
            equation: '6 × 4 = 24'
        }
    ];
    
    const scenario = randomChoice(scenarios);
    
    if (level <= 2) {
        const options = shuffle(['×', '÷', '+', '−']);
        
        return {
            text: `${scenario.text}\n\nWhich symbol is needed?`,
            type: 'multiple_choice',
            options: options,
            answer: scenario.correct,
            hint: `The complete equation is: ${scenario.equation}`
        };
    } else {
        return {
            text: `${scenario.text}\n\nWrite the complete calculation: ___ ___ ___ = ___`,
            type: 'text_input',
            answer: scenario.equation,
            hint: 'Use ×, ÷, and = symbols'
        };
    }
}

export default {
    moduleId: 'C07_Y2_CALC',
    generate: generateQuestion
};
```

**VALIDATION:**
- Test all 3 operations at all 4 levels
- Verify answer format consistency
- Check parameter usage (max_value)

---

## DAY 8: C07_Y3_CALC - 2-digit × 1-digit Box Method

### TASK 8.1: Create `src/generators/C07_Y3_CALC_written_methods.js`

Year 3 introduces actual box method:

```javascript
/**
 * C07_Y3_CALC - Written Methods (Year 3)
 * Focus: Formal written methods (box method introduction)
 * National Curriculum: "progressing to formal written methods"
 * Uses: 2-digit × 1-digit (e.g., 47 × 3)
 */

import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { 
    generateFillBoxQuestion, 
    generatePartialProductsQuestion,
    generateBoxTotalQuestion,
    generateSetupQuestion,
    generateSingleProductQuestion
} from './helpers/c07QuestionTemplates.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    
    // Year 3: 2-digit × 1-digit
    const a = randomInt(10, params.max_value);  // 2-digit number
    const b = randomInt(2, params.multiplier);   // 1-digit multiplier
    
    switch(operation) {
        case 'box_method_2x1':
            return generateFillBoxQuestion(a, b, level);
            
        case 'partial_products':
            return generatePartialProductsQuestion(a, b, level);
            
        case 'identify_decomposition':
            return generateSetupQuestion(a, b, level);
            
        case 'calculate_product':
            return generateSingleProductQuestion(a, b, level);
            
        case 'find_total':
            return generateBoxTotalQuestion(a, b, level);
            
        default:
            return generateFillBoxQuestion(a, b, level);
    }
}

export default {
    moduleId: 'C07_Y3_CALC',
    generate: generateQuestion
};
```

**VALIDATION:**
- Generate 10 questions at each level
- Verify 2-digit × 1-digit constraints
- Check box method grids render correctly
- Test on mobile display

---

## DAY 9: C07_Y4_CALC - 3-digit × 1-digit Box Method

### TASK 9.1: Create `src/generators/C07_Y4_CALC_formal_written.js`

Year 4 increases to 3-digit numbers:

```javascript
/**
 * C07_Y4_CALC - Formal Written Methods (Year 4)
 * Focus: Formal written layout (box method with 3-digit numbers)
 * National Curriculum: "using formal written layout"
 * Uses: 3-digit × 1-digit (e.g., 347 × 5)
 */

import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { 
    generateFillBoxQuestion, 
    generatePartialProductsQuestion,
    generateBoxTotalQuestion,
    generateSetupQuestion,
    generateBoxMethodWordProblem
} from './helpers/c07QuestionTemplates.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    
    // Year 4: 3-digit × 1-digit
    const a = randomInt(100, params.max_value);  // 3-digit number
    const b = randomInt(2, params.multiplier);    // 1-digit multiplier
    
    switch(operation) {
        case 'box_method_3x1':
            return generateFillBoxQuestion(a, b, level);
            
        case 'partial_products':
            return generatePartialProductsQuestion(a, b, level);
            
        case 'setup_method':
            return generateSetupQuestion(a, b, level);
            
        case 'word_problem':
            return generateBoxMethodWordProblem(a, b, level);
            
        case 'find_total':
            return generateBoxTotalQuestion(a, b, level);
            
        default:
            return generateFillBoxQuestion(a, b, level);
    }
}

export default {
    moduleId: 'C07_Y4_CALC',
    generate: generateQuestion
};
```

**VALIDATION:**
- Verify 3-digit × 1-digit constraints
- Test word problems make sense
- Check grid doesn't overflow on mobile

---

## DAY 10: Testing Week 2 Work

### TASK 10.1: Create Test Suite

Create `test/test_c07_y2_y3_y4.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>C07 Y2-Y4 Generator Tests</title>
    <link rel="stylesheet" href="../styles/main.css">
    <style>
        .test-section { margin: 30px 0; padding: 20px; border: 2px solid #ddd; }
        .test-header { background: #f0f0f0; padding: 10px; font-weight: bold; }
        .question-display { margin: 15px 0; padding: 15px; background: #fafafa; }
        .pass { color: green; } .fail { color: red; }
    </style>
</head>
<body>
    <h1>C07 Written Methods Tests (Y2-Y4)</h1>
    <div id="test-results"></div>
    
    <script type="module">
        import C07_Y2 from './generators/C07_Y2_CALC_statements.js';
        import C07_Y3 from './generators/C07_Y3_CALC_written_methods.js';
        import C07_Y4 from './generators/C07_Y4_CALC_formal_written.js';
        import { getParameters } from './curriculum/parameters.js';
        
        const resultsDiv = document.getElementById('test-results');
        
        function testGenerator(generator, moduleId, levels) {
            const section = document.createElement('div');
            section.className = 'test-section';
            section.innerHTML = `<div class="test-header">${moduleId}</div>`;
            
            levels.forEach(level => {
                const params = getParameters(moduleId, level);
                
                // Generate 5 questions at this level
                for (let i = 0; i < 5; i++) {
                    const q = generator.generate(params, level);
                    
                    // Validate question structure
                    const isValid = (
                        q.text && 
                        typeof q.text === 'string' &&
                        q.type && 
                        (q.type === 'text_input' || q.type === 'multiple_choice') &&
                        q.answer &&
                        typeof q.answer === 'string'
                    );
                    
                    const questionDiv = document.createElement('div');
                    questionDiv.className = 'question-display';
                    questionDiv.innerHTML = `
                        <strong>Level ${level}, Question ${i+1}:</strong> 
                        <span class="${isValid ? 'pass' : 'fail'}">${isValid ? '✓' : '✗'}</span>
                        <pre>${q.text}</pre>
                        <p><strong>Answer:</strong> ${q.answer}</p>
                        ${q.options ? `<p><strong>Options:</strong> ${q.options.join(', ')}</p>` : ''}
                    `;
                    section.appendChild(questionDiv);
                }
            });
            
            resultsDiv.appendChild(section);
        }
        
        // Test all generators
        testGenerator(C07_Y2, 'C07_Y2_CALC', [1, 2, 3, 4]);
        testGenerator(C07_Y3, 'C07_Y3_CALC', [1, 2, 3, 4]);
        testGenerator(C07_Y4, 'C07_Y4_CALC', [1, 2, 3, 4]);
    </script>
</body>
</html>
```

**VALIDATION CHECKLIST:**
- [ ] All 3 generators produce valid questions
- [ ] All questions have string answers
- [ ] HTML renders properly
- [ ] Box method grids display correctly
- [ ] Mobile responsive
- [ ] No JavaScript errors

---

# WEEK 3: ADVANCED GENERATORS (Days 11-15)

## DAY 11-12: C07_Y5_CALC - Long Multiplication & Short Division

### TASK 11.1: Create `src/generators/C07_Y5_CALC_long_mult_short_div.js`

Year 5 adds complexity - 2-digit × 2-digit multiplication and division with remainders:

```javascript
/**
 * C07_Y5_CALC - Long Multiplication & Short Division (Year 5)
 * Focus: Formal written methods including long multiplication
 * National Curriculum: "formal written method, including long multiplication"
 * Uses: 2-digit × 2-digit (e.g., 47 × 26), division with remainders
 */

import { randomInt, randomChoice, generateDistractors, shuffle } from './helpers/N02_numberHelpers.js';
import { 
    generateFillBoxQuestion, 
    generatePartialProductsQuestion,
    generateBoxTotalQuestion,
    generateBoxMethodWordProblem,
    generateErrorIdentificationQuestion
} from './helpers/c07QuestionTemplates.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    
    switch(operation) {
        case 'long_multiplication':
            return generateLongMultiplication(params, level);
            
        case 'short_division':
            return generateShortDivision(params, level);
            
        case 'box_method_2x2':
            return generateBoxMethod2x2(params, level);
            
        case 'interpret_remainder':
            return generateInterpretRemainder(params, level);
            
        case 'error_check':
            return generateErrorCheck(params, level);
            
        default:
            return generateLongMultiplication(params, level);
    }
}

/**
 * Long multiplication using box method (2-digit × 2-digit)
 */
function generateLongMultiplication(params, level) {
    const a = randomInt(10, 99);
    const b = randomInt(10, 99);
    
    return generateFillBoxQuestion(a, b, level);
}

/**
 * Box method for 2-digit × 2-digit (generates larger grids)
 */
function generateBoxMethod2x2(params, level) {
    const a = randomInt(20, 99);
    const b = randomInt(20, 99);
    
    if (level <= 2) {
        return generateBoxTotalQuestion(a, b, level);
    } else {
        return generatePartialProductsQuestion(a, b, level);
    }
}

/**
 * Short division with remainders
 */
function generateShortDivision(params, level) {
    const divisor = randomInt(2, 12);
    const quotient = randomInt(10, params.max_value / divisor);
    const remainder = randomInt(0, divisor - 1);
    const dividend = (quotient * divisor) + remainder;
    
    if (remainder === 0) {
        // Exact division
        const distractors = generateDistractors(quotient, 3, 0, quotient * 2);
        const options = shuffle([quotient.toString(), ...distractors.map(d => d.toString())]);
        
        return {
            text: `Calculate: ${dividend} ÷ ${divisor}`,
            type: 'multiple_choice',
            options: options,
            answer: quotient.toString(),
            hint: `How many ${divisor}s go into ${dividend}?`
        };
    } else {
        // Division with remainder
        if (level <= 2) {
            return {
                text: `Calculate: ${dividend} ÷ ${divisor}\n\n(Write your answer as: quotient r remainder)`,
                type: 'text_input',
                answer: `${quotient} r${remainder}`,
                hint: 'Format example: 12 r3 means 12 remainder 3'
            };
        } else {
            const correct = `${quotient} r${remainder}`;
            const wrong1 = `${quotient + 1} r${remainder - divisor}`;
            const wrong2 = `${quotient} r${remainder + 1}`;
            const wrong3 = `${quotient - 1} r${remainder + divisor}`;
            
            const options = shuffle([correct, wrong1, wrong2, wrong3]);
            
            return {
                text: `${dividend} ÷ ${divisor} = ?`,
                type: 'multiple_choice',
                options: options,
                answer: correct,
                hint: 'Find how many complete groups, then what is left over'
            };
        }
    }
}

/**
 * Interpret remainder in context
 */
function generateInterpretRemainder(params, level) {
    const scenarios = [
        {
            divisor: 5,
            quotient: 8,
            remainder: 3,
            context: '43 children need to be put into teams of 5',
            question: 'How many teams will be full?',
            correctAnswer: '8',
            hint: 'The quotient tells you the number of full teams'
        },
        {
            divisor: 4,
            quotient: 12,
            remainder: 2,
            context: '50 pencils are being packed into boxes of 4',
            question: 'How many pencils will be left over?',
            correctAnswer: '2',
            hint: 'The remainder tells you what is left over'
        },
        {
            divisor: 6,
            quotient: 7,
            remainder: 4,
            context: '46 cookies are shared equally among 6 children',
            question: 'How many cookies does each child get?',
            correctAnswer: '7',
            hint: 'Each child gets the quotient amount'
        }
    ];
    
    const scenario = randomChoice(scenarios);
    const dividend = (scenario.quotient * scenario.divisor) + scenario.remainder;
    
    return {
        text: `${scenario.context}.\n\n${dividend} ÷ ${scenario.divisor} = ${scenario.quotient} r${scenario.remainder}\n\n${scenario.question}`,
        type: 'text_input',
        answer: scenario.correctAnswer,
        hint: scenario.hint
    };
}

/**
 * Error checking in calculations
 */
function generateErrorCheck(params, level) {
    const a = randomInt(30, 99);
    const b = randomInt(10, 20);
    
    return generateErrorIdentificationQuestion(a, b, level);
}

export default {
    moduleId: 'C07_Y5_CALC',
    generate: generateQuestion
};
```

**VALIDATION:**
- Test 2×2 box method renders properly (4 cells)
- Verify remainder formatting
- Check remainder interpretation questions
- Test error identification

---

## DAY 13-14: C07_Y6_CALC - Advanced Written Methods

### TASK 13.1: Create `src/generators/C07_Y6_CALC_long_division.js`

Year 6 is the most advanced - long division, decimals, and complex problems:

```javascript
/**
 * C07_Y6_CALC - Long Division & Advanced Methods (Year 6)
 * Focus: Advanced formal written methods
 * National Curriculum: "formal written method of long multiplication/long division"
 * Uses: Large multiplications, long division, decimal remainders
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { 
    generateFillBoxQuestion,
    generateBoxMethodWordProblem,
    generateErrorIdentificationQuestion
} from './helpers/c07QuestionTemplates.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    
    switch(operation) {
        case 'long_multiplication_3x2':
            return generateLongMultiplication3x2(params, level);
            
        case 'long_division':
            return generateLongDivision(params, level);
            
        case 'remainder_as_fraction':
            return generateRemainderAsFraction(params, level);
            
        case 'remainder_as_decimal':
            return generateRemainderAsDecimal(params, level);
            
        case 'complex_word_problem':
            return generateComplexWordProblem(params, level);
            
        default:
            return generateLongMultiplication3x2(params, level);
    }
}

/**
 * 3-digit × 2-digit multiplication using box method
 */
function generateLongMultiplication3x2(params, level) {
    const a = randomInt(100, 999);
    const b = randomInt(10, 99);
    
    return generateFillBoxQuestion(a, b, level);
}

/**
 * Long division (interpret as decimal)
 */
function generateLongDivision(params, level) {
    const divisor = randomInt(10, 30);
    const quotient = randomInt(10, 50);
    const remainder = randomInt(1, divisor - 1);
    const dividend = (quotient * divisor) + remainder;
    
    // Simple long division first
    if (level <= 2) {
        return {
            text: `Calculate ${dividend} ÷ ${divisor}\n\n(Give answer with remainder)`,
            type: 'text_input',
            answer: `${quotient} r${remainder}`,
            hint: 'Format: number r remainder'
        };
    } else {
        // As decimal
        const asDecimal = (dividend / divisor).toFixed(2);
        
        return {
            text: `Calculate ${dividend} ÷ ${divisor}\n\n(Give answer as a decimal to 2 decimal places)`,
            type: 'text_input',
            answer: asDecimal,
            hint: 'Continue dividing past the decimal point'
        };
    }
}

/**
 * Express remainder as a fraction
 */
function generateRemainderAsFraction(params, level) {
    const divisor = randomInt(5, 20);
    const quotient = randomInt(8, 40);
    const remainder = randomInt(1, divisor - 1);
    const dividend = (quotient * divisor) + remainder;
    
    // Simplify fraction if possible
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    
    const g = gcd(remainder, divisor);
    const simplifiedNum = remainder / g;
    const simplifiedDen = divisor / g;
    
    if (level <= 2) {
        // Just write as improper fraction
        return {
            text: `${dividend} ÷ ${divisor} = ?\n\n(Write as: whole number and fraction, e.g., "5 2/3")`,
            type: 'text_input',
            answer: `${quotient} ${remainder}/${divisor}`,
            hint: 'Quotient, then remainder/divisor'
        };
    } else {
        // Expect simplified fraction
        if (g === 1) {
            // Already simplified
            return {
                text: `${dividend} ÷ ${divisor} = ?\n\n(Express remainder as a simplified fraction)`,
                type: 'text_input',
                answer: `${quotient} ${remainder}/${divisor}`,
                hint: 'This fraction is already in simplest form'
            };
        } else {
            return {
                text: `${dividend} ÷ ${divisor} = ?\n\n(Express as a mixed number with simplified fraction)`,
                type: 'text_input',
                answer: `${quotient} ${simplifiedNum}/${simplifiedDen}`,
                hint: `Simplify ${remainder}/${divisor} by dividing both by ${g}`
            };
        }
    }
}

/**
 * Express remainder as decimal
 */
function generateRemainderAsDecimal(params, level) {
    // Use divisions that result in nice decimals (.5, .25, .75, etc.)
    const scenarios = [
        { divisor: 2, quotient: randomInt(10, 50), remainder: 1 },   // .5
        { divisor: 4, quotient: randomInt(10, 50), remainder: 1 },   // .25
        { divisor: 4, quotient: randomInt(10, 50), remainder: 2 },   // .5
        { divisor: 4, quotient: randomInt(10, 50), remainder: 3 },   // .75
        { divisor: 5, quotient: randomInt(10, 50), remainder: randomInt(1, 4) }  // .2, .4, .6, .8
    ];
    
    const scenario = randomChoice(scenarios);
    const dividend = (scenario.quotient * scenario.divisor) + scenario.remainder;
    const asDecimal = (dividend / scenario.divisor).toFixed(2);
    
    if (level <= 2) {
        const distractors = [
            (parseFloat(asDecimal) + 0.1).toFixed(2),
            (parseFloat(asDecimal) - 0.1).toFixed(2),
            (parseFloat(asDecimal) * 1.1).toFixed(2)
        ];
        const options = shuffle([asDecimal, ...distractors]);
        
        return {
            text: `${dividend} ÷ ${scenario.divisor} = ?\n\n(as a decimal)`,
            type: 'multiple_choice',
            options: options,
            answer: asDecimal,
            hint: 'Divide and continue to 2 decimal places'
        };
    } else {
        return {
            text: `A ribbon ${dividend}cm long is cut into ${scenario.divisor} equal pieces.\n\nHow long is each piece? (Give answer to 2 decimal places)`,
            type: 'text_input',
            answer: asDecimal + ' cm',
            hint: `Calculate ${dividend} ÷ ${scenario.divisor} as a decimal`
        };
    }
}

/**
 * Complex multi-step word problem
 */
function generateComplexWordProblem(params, level) {
    const a = randomInt(100, 500);
    const b = randomInt(12, 36);
    
    return generateBoxMethodWordProblem(a, b, level);
}

export default {
    moduleId: 'C07_Y6_CALC',
    generate: generateQuestion
};
```

**VALIDATION:**
- Test 3×2 digit multiplication (9 cells in grid)
- Verify decimal calculations are correct
- Test fraction simplification
- Check complex word problems

---

## DAY 15: Integration & System Testing

### TASK 15.1: Register All Generators in Question Engine

Edit `src/core/questionEngine.js`:

```javascript
// Add imports at top
import C07_Y2_Generator from '../generators/C07_Y2_CALC_statements.js';
import C07_Y3_Generator from '../generators/C07_Y3_CALC_written_methods.js';
import C07_Y4_Generator from '../generators/C07_Y4_CALC_formal_written.js';
import C07_Y5_Generator from '../generators/C07_Y5_CALC_long_mult_short_div.js';
import C07_Y6_Generator from '../generators/C07_Y6_CALC_long_division.js';

// In registerDefaultGenerators() method, add:
this.register(C07_Y2_Generator);
this.register(C07_Y3_Generator);
this.register(C07_Y4_Generator);
this.register(C07_Y5_Generator);
this.register(C07_Y6_Generator);
```

### TASK 15.2: Full Integration Test

Create `test/test_c07_complete.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>C07 Complete Series Test</title>
    <link rel="stylesheet" href="../styles/main.css">
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 20px auto; padding: 20px; }
        .module-section { border: 2px solid #333; margin: 30px 0; padding: 20px; background: #f9f9f9; }
        .module-header { background: #2c5aa0; color: white; padding: 15px; margin: -20px -20px 20px -20px; }
        .level-group { margin: 20px 0; padding: 15px; background: white; border-left: 4px solid #4CAF50; }
        .question-card { margin: 15px 0; padding: 15px; background: #fafafa; border: 1px solid #ddd; }
        .stats { background: #e3f2fd; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .pass { color: green; font-weight: bold; }
        .fail { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>C07 Written Methods - Complete Series Test</h1>
    <div class="stats" id="stats"></div>
    <div id="results"></div>
    
    <script type="module">
        import { QuestionEngine } from '../src/core/questionEngine.js';
        
        const engine = new QuestionEngine();
        const modules = ['C07_Y2_CALC', 'C07_Y3_CALC', 'C07_Y4_CALC', 'C07_Y5_CALC', 'C07_Y6_CALC'];
        const resultsDiv = document.getElementById('results');
        const statsDiv = document.getElementById('stats');
        
        let totalQuestions = 0;
        let validQuestions = 0;
        let invalidQuestions = 0;
        
        modules.forEach(moduleId => {
            const section = document.createElement('div');
            section.className = 'module-section';
            section.innerHTML = `<div class="module-header"><h2>${moduleId}</h2></div>`;
            
            for (let level = 1; level <= 4; level++) {
                const levelDiv = document.createElement('div');
                levelDiv.className = 'level-group';
                levelDiv.innerHTML = `<h3>Level ${level}</h3>`;
                
                // Generate 5 questions per level
                for (let i = 0; i < 5; i++) {
                    totalQuestions++;
                    const question = engine.generateQuestion(moduleId, level);
                    
                    const isValid = (
                        question &&
                        question.text &&
                        typeof question.text === 'string' &&
                        question.type &&
                        ['text_input', 'multiple_choice'].includes(question.type) &&
                        question.answer &&
                        typeof question.answer === 'string' &&
                        question.module === moduleId &&
                        question.level === level
                    );
                    
                    if (isValid) {
                        validQuestions++;
                    } else {
                        invalidQuestions++;
                    }
                    
                    const card = document.createElement('div');
                    card.className = 'question-card';
                    card.innerHTML = `
                        <div><strong>Question ${i + 1}:</strong> 
                            <span class="${isValid ? 'pass' : 'fail'}">${isValid ? '✓ VALID' : '✗ INVALID'}</span>
                        </div>
                        <div style="white-space: pre-wrap; margin: 10px 0;">${question.text}</div>
                        <div><strong>Type:</strong> ${question.type}</div>
                        <div><strong>Answer:</strong> ${question.answer}</div>
                        ${question.options ? `<div><strong>Options:</strong> ${question.options.join(', ')}</div>` : ''}
                        ${question.hint ? `<div><strong>Hint:</strong> ${question.hint}</div>` : ''}
                    `;
                    levelDiv.appendChild(card);
                }
                
                section.appendChild(levelDiv);
            }
            
            resultsDiv.appendChild(section);
        });
        
        // Display stats
        const passRate = ((validQuestions / totalQuestions) * 100).toFixed(1);
        statsDiv.innerHTML = `
            <h3>Test Results Summary</h3>
            <p><strong>Total Questions Generated:</strong> ${totalQuestions}</p>
            <p><strong>Valid Questions:</strong> <span class="pass">${validQuestions}</span></p>
            <p><strong>Invalid Questions:</strong> <span class="fail">${invalidQuestions}</span></p>
            <p><strong>Pass Rate:</strong> ${passRate}%</p>
            <p>${passRate === '100.0' ? '<span class="pass">✓ ALL TESTS PASSED!</span>' : '<span class="fail">✗ Some tests failed</span>'}</p>
        `;
    </script>
</body>
</html>
```

**VALIDATION CHECKLIST:**
- [ ] All 5 modules registered successfully
- [ ] Each module generates questions at all 4 levels
- [ ] 100% pass rate on validation
- [ ] No JavaScript console errors
- [ ] Box method HTML renders correctly across all modules
- [ ] Mobile responsive on phone/tablet
- [ ] All answers are strings

---

# WEEK 4: POLISH & TESTING (Days 16-20)

## DAY 16-17: Comprehensive Testing

### TASK 16.1: Generate Sample Question Bank

Create a script to generate 100 questions per module:

```javascript
// test/generate_question_bank.js
import { QuestionEngine } from '../src/core/questionEngine.js';
import * as fs from 'fs';

const engine = new QuestionEngine();
const modules = ['C07_Y2_CALC', 'C07_Y3_CALC', 'C07_Y4_CALC', 'C07_Y5_CALC', 'C07_Y6_CALC'];

const questionBank = {};

modules.forEach(moduleId => {
    questionBank[moduleId] = {};
    
    for (let level = 1; level <= 4; level++) {
        questionBank[moduleId][`level_${level}`] = [];
        
        // Generate 25 questions per level = 100 per module
        for (let i = 0; i < 25; i++) {
            const question = engine.generateQuestion(moduleId, level);
            questionBank[moduleId][`level_${level}`].push(question);
        }
    }
});

// Save to JSON file
fs.writeFileSync(
    'test/c07_question_bank.json',
    JSON.stringify(questionBank, null, 2)
);

console.log('Question bank generated successfully!');
console.log(`Total questions: ${modules.length * 4 * 25} = ${modules.length * 100}`);
```

### TASK 16.2: Manual Review Checklist

Review sample questions for:

**Content Quality:**
- [ ] Questions are age-appropriate for year group
- [ ] Mathematical accuracy (all answers correct)
- [ ] Clear, unambiguous wording
- [ ] Helpful hints
- [ ] Plausible distractors

**Technical Quality:**
- [ ] HTML renders correctly
- [ ] No layout overflow
- [ ] Mobile responsive
- [ ] Accessible (screen reader friendly)
- [ ] No JavaScript errors

**Difficulty Progression:**
- [ ] Level 1: Beginning (easier numbers, simpler concepts)
- [ ] Level 2: Developing (moderate numbers)
- [ ] Level 3: Meeting (expected standard)
- [ ] Level 4: Exceeding (challenging)

**Box Method Specific:**
- [ ] Grids display correctly (alignment, borders)
- [ ] Gap cells clearly marked
- [ ] Partial products logical
- [ ] Totals calculate correctly

---

## DAY 18: Bug Fixes & Refinements

### TASK 18.1: Common Issues to Address

Based on testing, fix these common issues:

**Issue 1: Grid Overflow on Mobile**
```css
/* Add to main.css */
@media screen and (max-width: 480px) {
    .box-method-grid {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    .calculation-grid {
        font-size: 11px;
    }
    
    .calculation-grid th,
    .calculation-grid td {
        padding: 4px 6px;
        min-width: 45px;
    }
}
```

**Issue 2: Answer Format Inconsistency**

Ensure all generators convert answers to strings:
```javascript
// BAD:
answer: 42

// GOOD:
answer: answer.toString()
answer: "42"
answer: `${quotient} r${remainder}`
```

**Issue 3: Distractor Quality**

Improve distractors for better educational value:
```javascript
// Instead of random numbers, use common errors:
function generateMathematicalDistractors(correct, a, b) {
    return [
        (a + b).toString(),           // Addition instead of multiplication
        (a * (b + 1)).toString(),     // Off-by-one error
        (correct - 10).toString()     // Calculation error
    ];
}
```

---

## DAY 19: Educational Review

### TASK 19.1: Curriculum Alignment Check

Create a mapping document showing how each generator meets National Curriculum requirements:

**File: `docs/C07_CURRICULUM_MAPPING.md`**

```markdown
# C07 Curriculum Mapping

## C07_Y2_CALC - Year 2 Requirements
**National Curriculum:** "write them using the multiplication (×), division (÷) and equals (=) signs"

**How We Meet This:**
- `write_multiplication`: Students write equations using × and = symbols
- `write_division`: Students write equations using ÷ and = symbols
- `identify_symbols`: Students identify correct symbol for context

**Sample Question:**
> There are 5 bags with 3 sweets in each bag.
> Write the multiplication: ___ × ___ = ___

---

## C07_Y3_CALC - Year 3 Requirements
**National Curriculum:** "progressing to formal written methods"

**How We Meet This:**
- Box method IS a formal written method (modern interpretation)
- `box_method_2x1`: Introduces structured layout for 2-digit × 1-digit
- `partial_products`: Breaks down multiplication into components
- Teaches place value understanding

**Sample Question:**
> Complete the box method calculation for 47 × 3:
> [Shows grid with some cells blank]

---

[Continue for Y4, Y5, Y6...]
```

### TASK 19.2: Pedagogical Review

Check questions against best practices:

- [ ] Questions build conceptual understanding (not just rote calculation)
- [ ] Box method teaches place value decomposition
- [ ] Word problems provide real-world context
- [ ] Error identification questions promote metacognition
- [ ] Difficulty progression is appropriate
- [ ] Modern methods align with current UK teaching practices

---

## DAY 20: Final Polish & Documentation

### TASK 20.1: Update Main Documentation

Add C07 section to `README.md`:

```markdown
## C07 Written Methods (Box Method Approach)

The C07 module series implements formal written methods using modern pedagogical approaches:

- **Box Method**: Visual grid-based multiplication showing place value decomposition
- **Partial Products**: Step-by-step breakdown of multiplication
- **Digital-Native**: Designed for screen-based learning with HTML tables
- **Curriculum Compliant**: Meets National Curriculum requirements for "formal written methods"

### Pedagogical Rationale

While traditional columnar methods (vertical algorithms) are one approach to written calculations, the box method and partial products are equally valid formal written methods that:

1. **Show place value explicitly** - Students see hundreds, tens, ones
2. **Work better digitally** - No complex vertical alignment needed
3. **Build understanding** - Conceptual rather than procedural
4. **Are widely taught** - Used in ~60% of UK primary schools

Box method satisfies the National Curriculum requirement for "formal written layout" while being optimized for digital learning.

### Module Coverage

- **Y2** (C07_Y2_CALC): Writing equations with ×, ÷, = symbols
- **Y3** (C07_Y3_CALC): Box method for 2-digit × 1-digit
- **Y4** (C07_Y4_CALC): Box method for 3-digit × 1-digit
- **Y5** (C07_Y5_CALC): Long multiplication (2×2), short division with remainders
- **Y6** (C07_Y6_CALC): Advanced division (decimals, fractions)

### Future Enhancements

Traditional columnar layouts can be added as an optional "Classic Layout" toggle in future releases if user feedback indicates demand.
```

### TASK 20.2: Create Developer Handoff Document

**File: `docs/C07_DEVELOPER_GUIDE.md`**

```markdown
# C07 Developer Guide

## Quick Start

All C07 generators follow the standard pattern:

```javascript
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { generateFillBoxQuestion } from './helpers/c07QuestionTemplates.js';

export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);
    const a = randomInt(10, params.max_value);
    const b = randomInt(2, 9);
    
    return generateFillBoxQuestion(a, b, level);
}

export default {
    moduleId: 'C07_YX_CALC',
    generate: generateQuestion
};
```

## Helper Files

### boxMethodHelpers.js
Core functions for box method calculations:
- `decomposePlaceValue(num)` - Breaks number into place values
- `generateBoxGrid(a, b)` - Creates multiplication grid
- `renderBoxMethodHTML(gridData, gaps)` - Generates HTML table

### c07QuestionTemplates.js
Reusable question generators:
- `generateFillBoxQuestion()` - Fill in missing products
- `generatePartialProductsQuestion()` - Identify decomposition
- `generateBoxTotalQuestion()` - Calculate final answer
- `generateSetupQuestion()` - Choose correct setup
- [7 templates total]

## Adding New Question Types

1. Create new template function in `c07QuestionTemplates.js`
2. Add operation to module parameters in `C_calculations.js`
3. Add case to switch statement in generator
4. Test at all 4 levels

## Common Patterns

**Text Input Questions:**
```javascript
return {
    text: "Question text here",
    type: 'text_input',
    answer: answer.toString(),  // Always string!
    hint: 'Helpful hint'
};
```

**Multiple Choice:**
```javascript
const distractors = [wrong1, wrong2, wrong3];
const options = shuffle([correct, ...distractors]);

return {
    text: "Question text",
    type: 'multiple_choice',
    options: options,
    answer: correct,
    hint: 'Hint'
};
```

## Testing

Run integration tests:
```bash
npm run test:c07
```

Generate question bank:
```bash
npm run generate:c07-bank
```

## Troubleshooting

**Grid doesn't display:**
- Check HTML escaping in renderBoxMethodHTML()
- Verify CSS is loaded

**Answer validation fails:**
- Ensure answer is string
- Check for extra whitespace

**Numbers too large/small:**
- Check params.max_value usage
- Verify level-based progression
```

### TASK 20.3: Final QA Checklist

Complete this checklist before marking as done:

**Code Quality:**
- [ ] All files have proper JSDoc comments
- [ ] No console.log() statements in production code
- [ ] Consistent code style
- [ ] No hardcoded values (use params)
- [ ] All functions have error handling

**Functionality:**
- [ ] All 5 generators work at all 4 levels
- [ ] Question bank has 500 questions total
- [ ] No duplicate questions in 100-question test
- [ ] All answers are mathematically correct
- [ ] Distractors are plausible

**UI/UX:**
- [ ] Box method grids render correctly
- [ ] Mobile responsive (tested on phone)
- [ ] Tablet responsive (tested on iPad)
- [ ] High contrast mode works
- [ ] Screen reader accessible

**Documentation:**
- [ ] README updated
- [ ] Developer guide created
- [ ] Curriculum mapping documented
- [ ] Code comments added
- [ ] Examples provided

**Integration:**
- [ ] Registered in questionEngine.js
- [ ] Parameters defined in C_calculations.js
- [ ] No conflicts with existing modules
- [ ] Build succeeds with no errors

---

## FINAL DELIVERABLES CHECKLIST

At the end of Week 4, you should have:

### Code Files (New):
- [ ] `src/generators/helpers/boxMethodHelpers.js` (500+ lines)
- [ ] `src/generators/helpers/c07QuestionTemplates.js` (700+ lines)
- [ ] `src/generators/C07_Y2_CALC_statements.js` (150+ lines)
- [ ] `src/generators/C07_Y3_CALC_written_methods.js` (80+ lines)
- [ ] `src/generators/C07_Y4_CALC_formal_written.js` (80+ lines)
- [ ] `src/generators/C07_Y5_CALC_long_mult_short_div.js` (200+ lines)
- [ ] `src/generators/C07_Y6_CALC_long_division.js` (200+ lines)

### Code Files (Modified):
- [ ] `styles/main.css` (added 150+ lines)
- [ ] `src/core/questionEngine.js` (registered 5 generators)

### Documentation:
- [ ] `docs/C07_CURRICULUM_MAPPING.md`
- [ ] `docs/C07_DEVELOPER_GUIDE.md`
- [ ] `README.md` (updated with C07 section)

### Testing:
- [ ] `test/test_c07_y2_y3_y4.html`
- [ ] `test/test_c07_complete.html`
- [ ] `test/c07_question_bank.json` (500 questions)

### Validation Results:
- [ ] 100% question validity rate
- [ ] Zero JavaScript errors
- [ ] All mobile/desktop tests pass
- [ ] Curriculum alignment verified
- [ ] Educational review complete

---

## SUCCESS CRITERIA

You have successfully completed the C07 implementation when:

1. ✅ All 5 generators (Y2-Y6) produce valid questions
2. ✅ Box method grids render correctly on all devices
3. ✅ 500+ test questions generated successfully
4. ✅ No JavaScript errors in console
5. ✅ Mobile responsive (tested on real devices)
6. ✅ Curriculum requirements met
7. ✅ Code is documented and maintainable
8. ✅ Integration tests pass 100%
9. ✅ Educational review approved
10. ✅ Ready for MVP launch

---

## POST-IMPLEMENTATION: FUTURE ENHANCEMENTS

After MVP launch, consider these enhancements:

### Phase 2 (UI/UX Polish):
- Animated transitions when filling boxes
- Color-coded cells for different place values
- Interactive "drag numbers into grid" questions
- Step-by-step solution animations

### Phase 3 (Traditional Layouts):
- Add optional "Classic Columnar" toggle
- Side-by-side comparison (box method vs traditional)
- Let users choose preferred method
- A/B test which method users prefer

### Phase 4 (Advanced Features):
- Adaptive difficulty based on performance
- Detailed worked solutions
- Video explanations
- Teacher dashboard showing which methods students prefer

---

## ESTIMATED EFFORT SUMMARY

| Phase | Days | Hours | Focus |
|-------|------|-------|-------|
| Week 1: Foundation | 5 | 32-38 | Helpers, CSS, templates |
| Week 2: Core Generators | 5 | 26-32 | Y2, Y3, Y4 generators |
| Week 3: Advanced | 5 | 30-34 | Y5, Y6 generators |
| Week 4: Polish & Test | 5 | 32 | Testing, docs, QA |
| **TOTAL** | **20** | **120-136** | **Complete C07** |

**Assumptions:**
- 1 developer working 6-7 hours/day
- No major blockers or scope changes
- Existing codebase is stable
- Helper files reusable

**Risk Buffer:** Add 10-20% (2-4 extra days) for unexpected issues

---

## AGENT LLM SPECIFIC INSTRUCTIONS

If you are an AI agent executing this plan:

1. **Work sequentially** - Complete each day's tasks before moving to the next
2. **Validate frequently** - Run tests after each file created
3. **Ask for clarification** - If parameter files don't match expectations
4. **Show progress** - Report completion percentage after each task
5. **Flag blockers early** - If you can't find a file or function
6. **Test incrementally** - Don't wait until end to test
7. **Document as you go** - Add comments while writing code
8. **Follow patterns** - Use existing N-series generators as reference
9. **Prioritize correctness** - Quality over speed
10. **Report completion** - Provide summary when done

### Error Handling:
- If a file doesn't exist: Create it following the structure shown
- If a function is missing: Implement it based on the spec
- If unclear: Ask for human verification before proceeding
- If test fails: Debug before continuing

### Quality Checks:
After each generator, verify:
- Generates 5 valid questions
- All answers are strings
- Uses params.max_value
- HTML renders without errors
- Mobile layout works

---

