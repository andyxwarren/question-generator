/**
 * Columnar Calculation Helpers
 *
 * Provides functions to format calculations in columnar layout
 * for written methods (addition and subtraction)
 */

/**
 * Format two numbers as a columnar calculation
 * @param {number} num1 - First number (top number)
 * @param {number} num2 - Second number (bottom number)
 * @param {string} operator - '+' or '-'
 * @param {boolean} showAnswer - Whether to show the answer or '?'
 * @returns {string} HTML string with columnar layout
 */
export function formatColumnar(num1, num2, operator, showAnswer = false) {
    // Format numbers with commas
    const num1Str = num1.toLocaleString();
    const num2Str = num2.toLocaleString();

    // Calculate max length based on FORMATTED strings (with commas)
    const maxLen = Math.max(num1Str.length, num2Str.length);

    // Right-align all numbers to the same width
    const num1Padded = num1Str.padStart(maxLen, ' ');
    const num2Padded = num2Str.padStart(maxLen, ' ');

    // Build the line to match the number width (plus operator + space)
    const line = '─'.repeat(maxLen + 2);

    // If showing answer, include it
    if (showAnswer) {
        const answer = operator === '+' ? num1 + num2 : num1 - num2;
        const answerStr = answer.toLocaleString();
        const answerPadded = answerStr.padStart(maxLen, ' ');

        return `<pre class="columnar-calc">  ${num1Padded}
${operator} ${num2Padded}
${line}
  ${answerPadded}</pre>`;
    }

    // Return without answer line
    return `<pre class="columnar-calc">  ${num1Padded}
${operator} ${num2Padded}
${line}</pre>`;
}

/**
 * Format columnar calculation with carrying marks shown
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {Array<number>} carries - Array of carry values (right to left)
 * @returns {string} HTML string with columnar layout and carries
 */
export function formatColumnarWithCarry(num1, num2, carries = []) {
    const num1Str = num1.toLocaleString();
    const num2Str = num2.toLocaleString();

    const num1NoComma = num1.toString();
    const num2NoComma = num2.toString();
    const maxLen = Math.max(num1NoComma.length, num2NoComma.length);

    // Generate carry row (small superscript numbers above columns)
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
+ ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format columnar subtraction with borrowing marks shown
 * @param {number} num1 - First number (minuend)
 * @param {number} num2 - Second number (subtrahend)
 * @param {Array<number>} borrows - Array of borrow indicators (right to left)
 * @returns {string} HTML string with columnar layout and borrows
 */
export function formatColumnarWithBorrow(num1, num2, borrows = []) {
    const num1Str = num1.toLocaleString();
    const num2Str = num2.toLocaleString();

    const num1NoComma = num1.toString();
    const num2NoComma = num2.toString();
    const maxLen = Math.max(num1NoComma.length, num2NoComma.length);

    // Generate borrow row (shown above top number)
    let borrowRow = '';
    if (borrows.length > 0) {
        let borrowDisplay = ' '.repeat(maxLen + 2);
        borrows.forEach((borrow, idx) => {
            if (borrow) {
                const pos = maxLen + 1 - idx;
                if (pos >= 0 && pos < borrowDisplay.length) {
                    // Use strikethrough effect (will be styled in CSS)
                    borrowDisplay = borrowDisplay.substring(0, pos) + '¹' + borrowDisplay.substring(pos + 1);
                }
            }
        });
        borrowRow = `<span class="borrow-row">${borrowDisplay}</span>\n`;
    }

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">${borrowRow}  ${num1Padded}
- ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format a simple columnar calculation with hint about the method
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {string} operator - '+' or '-'
 * @param {string} hint - Additional hint text
 * @returns {object} Question text object with columnar display
 */
export function createColumnarQuestion(num1, num2, operator, hint = '') {
    const columnarDisplay = formatColumnar(num1, num2, operator);
    const methodHint = operator === '+' ? 'addition' : 'subtraction';

    return {
        display: columnarDisplay,
        hint: hint || `Use the column method for ${methodHint}. Start with the ones column.`
    };
}

/**
 * Helper to determine if calculation needs carrying
 * (Re-export from calculationHelpers for convenience)
 */
export function needsCarrying(num1, num2) {
    const num1Str = num1.toString();
    const num2Str = num2.toString();
    const maxLen = Math.max(num1Str.length, num2Str.length);

    let carry = 0;
    for (let i = 0; i < maxLen; i++) {
        const digit1 = parseInt(num1Str[num1Str.length - 1 - i] || 0);
        const digit2 = parseInt(num2Str[num2Str.length - 1 - i] || 0);
        const sum = digit1 + digit2 + carry;
        if (sum >= 10) return true;
        carry = sum >= 10 ? 1 : 0;
    }
    return false;
}

/**
 * Helper to determine if calculation needs borrowing
 */
export function needsBorrowing(num1, num2) {
    const num1Str = num1.toString();
    const num2Str = num2.toString();
    const maxLen = Math.max(num1Str.length, num2Str.length);

    for (let i = 0; i < maxLen; i++) {
        const digit1 = parseInt(num1Str[num1Str.length - 1 - i] || 0);
        const digit2 = parseInt(num2Str[num2Str.length - 1 - i] || 0);
        if (digit1 < digit2) return true;
    }
    return false;
}
