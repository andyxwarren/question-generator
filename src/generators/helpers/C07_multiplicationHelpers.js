/**
 * Multiplication Helpers for C07 Modules
 *
 * Provides functions for formatting multiplication in columnar layout,
 * grid method, and long multiplication
 */

/**
 * Format a simple multiplication in columnar layout
 * @param {number} multiplicand - Number being multiplied (top)
 * @param {number} multiplier - Number to multiply by (bottom)
 * @param {boolean} showAnswer - Whether to show the answer or '?'
 * @returns {string} HTML string with columnar multiplication layout
 */
export function formatColumnarMultiply(multiplicand, multiplier, showAnswer = false) {
    const num1Str = multiplicand.toLocaleString();
    const num2Str = multiplier.toLocaleString();

    const maxLen = Math.max(num1Str.length, num2Str.length);

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');

    const line = '─'.repeat(maxLen + 2);

    if (showAnswer) {
        const product = multiplicand * multiplier;
        const productStr = product.toLocaleString();
        const productPadded = productStr.padStart(maxLen + 2, ' ');

        return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${productPadded}</pre>`;
    }

    return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format columnar multiplication with carrying marks shown
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Single-digit multiplier
 * @param {Array<number>} carries - Array of carry values (right to left)
 * @returns {string} HTML string with columnar layout and carries
 */
export function formatColumnarMultiplyWithCarry(multiplicand, multiplier, carries = []) {
    const num1Str = multiplicand.toLocaleString();
    const num2Str = multiplier.toString();

    const maxLen = Math.max(num1Str.length, num2Str.length);

    // Generate carry row
    let carryRow = '';
    if (carries.length > 0) {
        let carryDisplay = ' '.repeat(maxLen + 2);
        carries.forEach((carry, idx) => {
            if (carry) {
                const pos = maxLen + 1 - idx;
                if (pos >= 0 && pos < carryDisplay.length) {
                    carryDisplay = carryDisplay.substring(0, pos) + carry + carryDisplay.substring(pos + 1);
                }
            }
        });
        carryRow = `<span class="carry-row">${carryDisplay}</span>\n`;
    }

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">${carryRow}  ${num1Padded}
× ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Calculate carries for multiplication
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Single-digit multiplier
 * @returns {Array<number>} Array of carry values (right to left, 0 for no carry)
 */
export function calculateCarries(multiplicand, multiplier) {
    const digits = multiplicand.toString().split('').reverse();
    const carries = [];
    let carry = 0;

    for (let i = 0; i < digits.length; i++) {
        const digit = parseInt(digits[i]);
        const product = digit * multiplier + carry;
        carry = Math.floor(product / 10);
        carries.push(carry);
    }

    return carries;
}

/**
 * Format long multiplication (2-digit multiplier)
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Two-digit multiplier
 * @param {boolean} showAnswer - Whether to show the answer
 * @returns {string} HTML string with long multiplication layout
 */
export function formatLongMultiplication(multiplicand, multiplier, showAnswer = false) {
    const multiplierStr = multiplier.toString();
    const onesDigit = parseInt(multiplierStr[multiplierStr.length - 1]);
    const tensDigit = multiplierStr.length > 1 ? parseInt(multiplierStr[multiplierStr.length - 2]) : 0;

    const partialProduct1 = multiplicand * onesDigit;
    const partialProduct2 = multiplicand * tensDigit;

    const num1Str = multiplicand.toLocaleString();
    const num2Str = multiplier.toLocaleString();

    const maxLen = Math.max(
        num1Str.length,
        num2Str.length,
        partialProduct1.toString().length,
        (partialProduct2.toString().length + 1) // +1 for the zero placeholder
    );

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    if (showAnswer) {
        const pp1Str = partialProduct1.toLocaleString();
        const pp2Str = (partialProduct2 * 10).toLocaleString(); // Shifted by one place
        const total = multiplicand * multiplier;
        const totalStr = total.toLocaleString();

        const pp1Padded = pp1Str.padStart(maxLen + 2, ' ');
        const pp2Padded = pp2Str.padStart(maxLen + 2, ' ');
        const totalPadded = totalStr.padStart(maxLen + 2, ' ');

        return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${pp1Padded}
+ ${pp2Padded}
${line}
  ${totalPadded}</pre>`;
    }

    return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format grid method multiplication
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Number to multiply by
 * @returns {string} HTML string with grid method layout
 */
export function formatGridMethod(multiplicand, multiplier) {
    // Partition multiplicand into place values
    const multiplicandDigits = multiplicand.toString().split('').reverse();
    const multiplierDigits = multiplier.toString().split('').reverse();

    // Create partitions
    const multiplicandParts = multiplicandDigits.map((d, i) => parseInt(d) * Math.pow(10, i)).reverse();
    const multiplierParts = multiplierDigits.map((d, i) => parseInt(d) * Math.pow(10, i)).reverse();

    // Build grid header
    let grid = '<div class="grid-method">\n';
    grid += '<table>\n<tr><td></td>';
    multiplicandParts.forEach(part => {
        grid += `<td class="grid-header">${part}</td>`;
    });
    grid += '</tr>\n';

    // Build grid rows
    multiplierParts.forEach(multPart => {
        grid += `<tr><td class="grid-header">${multPart}</td>`;
        multiplicandParts.forEach(mcandPart => {
            const product = mcandPart * multPart;
            grid += `<td class="grid-cell">${product.toLocaleString()}</td>`;
        });
        grid += '</tr>\n';
    });

    grid += '</table>\n</div>';

    return grid;
}

/**
 * Format expanded multiplication showing partitioning
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Number to multiply by
 * @returns {string} Expanded form as text
 */
export function formatExpandedMultiplication(multiplicand, multiplier) {
    const digits = multiplicand.toString().split('').reverse();
    const parts = [];

    for (let i = 0; i < digits.length; i++) {
        const digit = parseInt(digits[i]);
        const placeValue = digit * Math.pow(10, i);
        if (placeValue > 0) {
            const product = placeValue * multiplier;
            parts.push(`(${placeValue} × ${multiplier} = ${product})`);
        }
    }

    return parts.reverse().join(' + ');
}

/**
 * Check if multiplication requires carrying
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Single-digit multiplier
 * @returns {boolean} True if carrying is needed
 */
export function requiresCarrying(multiplicand, multiplier) {
    const digits = multiplicand.toString().split('').reverse();
    let carry = 0;

    for (let digit of digits) {
        const product = parseInt(digit) * multiplier + carry;
        if (product >= 10) return true;
        carry = Math.floor(product / 10);
    }

    return false;
}

/**
 * Generate a multiplication problem without carrying
 * @param {number} minMultiplicand - Minimum multiplicand
 * @param {number} maxMultiplicand - Maximum multiplicand
 * @param {number} minMultiplier - Minimum multiplier
 * @param {number} maxMultiplier - Maximum multiplier
 * @param {number} maxAttempts - Maximum generation attempts
 * @returns {Object} Object with multiplicand and multiplier
 */
export function generateNoCarryMultiplication(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier, maxAttempts = 100) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
        const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;

        if (!requiresCarrying(multiplicand, multiplier)) {
            return { multiplicand, multiplier };
        }
    }

    // Fallback: return any valid numbers
    const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
    const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;
    return { multiplicand, multiplier };
}

/**
 * Generate a multiplication problem with carrying
 * @param {number} minMultiplicand - Minimum multiplicand
 * @param {number} maxMultiplicand - Maximum multiplicand
 * @param {number} minMultiplier - Minimum multiplier
 * @param {number} maxMultiplier - Maximum multiplier
 * @param {number} maxAttempts - Maximum generation attempts
 * @returns {Object} Object with multiplicand and multiplier
 */
export function generateWithCarryMultiplication(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier, maxAttempts = 100) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
        const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;

        if (requiresCarrying(multiplicand, multiplier)) {
            return { multiplicand, multiplier };
        }
    }

    // Fallback: return any valid numbers
    const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
    const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;
    return { multiplicand, multiplier };
}
