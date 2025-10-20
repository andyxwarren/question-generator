/**
 * Division Helpers for C07 Modules
 *
 * Provides functions for formatting division using short division, long division,
 * and remainder interpretation
 */

/**
 * Format short division layout
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by
 * @param {boolean} showAnswer - Whether to show the answer
 * @returns {string} HTML string with short division layout
 */
export function formatShortDivision(dividend, divisor, showAnswer = false) {
    const dividendStr = dividend.toLocaleString();

    if (showAnswer) {
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        const quotientStr = quotient.toLocaleString();

        if (remainder > 0) {
            return `<pre class="short-division">       ${quotientStr} r ${remainder}
    ${divisor.toString().padStart(2, ' ')} ) ${dividendStr}</pre>`;
        } else {
            return `<pre class="short-division">       ${quotientStr}
    ${divisor.toString().padStart(2, ' ')} ) ${dividendStr}</pre>`;
        }
    }

    return `<pre class="short-division">       ?
    ${divisor.toString().padStart(2, ' ')} ) ${dividendStr}</pre>`;
}

/**
 * Format long division layout
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by (typically 2-digit)
 * @param {boolean} showAnswer - Whether to show the answer
 * @returns {string} HTML string with long division layout
 */
export function formatLongDivision(dividend, divisor, showAnswer = false) {
    const dividendStr = dividend.toLocaleString();

    if (showAnswer) {
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        const quotientStr = quotient.toLocaleString();

        // For display purposes, we show the basic long division layout
        // A full step-by-step would be too complex for this format
        if (remainder > 0) {
            return `<pre class="long-division">        ${quotientStr} r ${remainder}
     ┌──────────
  ${divisor.toString().padStart(2, ' ')} │ ${dividendStr}</pre>`;
        } else {
            return `<pre class="long-division">        ${quotientStr}
     ┌──────────
  ${divisor.toString().padStart(2, ' ')} │ ${dividendStr}</pre>`;
        }
    }

    return `<pre class="long-division">        ?
     ┌──────────
  ${divisor.toString().padStart(2, ' ')} │ ${dividendStr}</pre>`;
}

/**
 * Calculate division with remainder
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by
 * @returns {Object} Object with quotient and remainder
 */
export function divideWithRemainder(dividend, divisor) {
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return { quotient, remainder };
}

/**
 * Express remainder as a fraction in simplest form
 * @param {number} remainder - The remainder
 * @param {number} divisor - The divisor (becomes denominator)
 * @returns {string} Fraction string (e.g., "1/2", "2/3")
 */
export function remainderAsFraction(remainder, divisor) {
    if (remainder === 0) return '';

    // Simplify the fraction
    const gcd = findGCD(remainder, divisor);
    const numerator = remainder / gcd;
    const denominator = divisor / gcd;

    return `${numerator}/${denominator}`;
}

/**
 * Express division result with remainder as decimal
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by
 * @param {number} decimalPlaces - Number of decimal places (default 1)
 * @returns {number} Decimal result
 */
export function divisionAsDecimal(dividend, divisor, decimalPlaces = 1) {
    const result = dividend / divisor;
    return parseFloat(result.toFixed(decimalPlaces));
}

/**
 * Find GCD (Greatest Common Divisor) using Euclidean algorithm
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD of a and b
 */
export function findGCD(a, b) {
    if (b === 0) return a;
    return findGCD(b, a % b);
}

/**
 * Generate division problem with exact division (no remainder)
 * @param {number} minDividend - Minimum dividend
 * @param {number} maxDividend - Maximum dividend
 * @param {number} minDivisor - Minimum divisor
 * @param {number} maxDivisor - Maximum divisor
 * @param {number} maxAttempts - Maximum generation attempts
 * @returns {Object} Object with dividend and divisor
 */
export function generateExactDivision(minDividend, maxDividend, minDivisor, maxDivisor, maxAttempts = 100) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const divisor = Math.floor(Math.random() * (maxDivisor - minDivisor + 1)) + minDivisor;
        const quotient = Math.floor(Math.random() * (Math.floor(maxDividend / divisor) - Math.floor(minDividend / divisor) + 1)) + Math.floor(minDividend / divisor);
        const dividend = divisor * quotient;

        if (dividend >= minDividend && dividend <= maxDividend && dividend % divisor === 0) {
            return { dividend, divisor, quotient };
        }
    }

    // Fallback: generate simple exact division
    const divisor = minDivisor;
    const quotient = Math.floor(minDividend / divisor);
    const dividend = divisor * quotient;
    return { dividend, divisor, quotient };
}

/**
 * Generate division problem with a specific remainder
 * @param {number} minDividend - Minimum dividend
 * @param {number} maxDividend - Maximum dividend
 * @param {number} minDivisor - Minimum divisor
 * @param {number} maxDivisor - Maximum divisor
 * @returns {Object} Object with dividend, divisor, quotient, and remainder
 */
export function generateDivisionWithRemainder(minDividend, maxDividend, minDivisor, maxDivisor) {
    const divisor = Math.floor(Math.random() * (maxDivisor - minDivisor + 1)) + minDivisor;
    const quotient = Math.floor(Math.random() * (Math.floor(maxDividend / divisor) - Math.floor(minDividend / divisor) + 1)) + Math.floor(minDividend / divisor);
    const remainder = Math.floor(Math.random() * (divisor - 1)) + 1; // Remainder must be less than divisor, at least 1
    const dividend = divisor * quotient + remainder;

    if (dividend <= maxDividend && dividend >= minDividend) {
        return { dividend, divisor, quotient, remainder };
    }

    // Fallback without remainder check
    const fallbackDividend = Math.floor(Math.random() * (maxDividend - minDividend + 1)) + minDividend;
    const fallbackQuotient = Math.floor(fallbackDividend / divisor);
    const fallbackRemainder = fallbackDividend % divisor;
    return {
        dividend: fallbackDividend,
        divisor,
        quotient: fallbackQuotient,
        remainder: fallbackRemainder
    };
}

/**
 * Interpret remainder based on context
 * @param {string} context - Context type ('round_up', 'round_down', 'ignore', 'exact')
 * @param {number} quotient - The quotient
 * @param {number} remainder - The remainder
 * @param {number} divisor - The divisor
 * @returns {Object} Interpretation with explanation
 */
export function interpretRemainder(context, quotient, remainder, divisor) {
    if (remainder === 0) {
        return {
            answer: quotient,
            explanation: 'Exact division - no remainder'
        };
    }

    switch(context) {
        case 'round_up':
            return {
                answer: quotient + 1,
                explanation: `Need to round up to ${quotient + 1} (can't have partial items)`
            };
        case 'round_down':
            return {
                answer: quotient,
                explanation: `Round down to ${quotient} (ignore the remainder)`
            };
        case 'ignore':
            return {
                answer: quotient,
                explanation: `${quotient} (remainder is not needed)`
            };
        case 'as_fraction':
            return {
                answer: `${quotient} ${remainderAsFraction(remainder, divisor)}`,
                explanation: `${quotient} and ${remainderAsFraction(remainder, divisor)}`
            };
        case 'as_decimal':
            return {
                answer: divisionAsDecimal(quotient * divisor + remainder, divisor, 2),
                explanation: `${divisionAsDecimal(quotient * divisor + remainder, divisor, 2)} as a decimal`
            };
        case 'exact_remainder':
            return {
                answer: `${quotient} r ${remainder}`,
                explanation: `${quotient} remainder ${remainder}`
            };
        default:
            return {
                answer: quotient,
                explanation: `${quotient}`
            };
    }
}

/**
 * Create a context for remainder interpretation
 * @param {string} contextType - Type of context
 * @returns {Object} Context description and expected interpretation
 */
export function createRemainderContext(contextType) {
    const contexts = {
        'round_up': {
            scenarios: [
                'buses needed to transport',
                'boxes needed to pack',
                'bags needed to carry',
                'trips needed to move'
            ],
            interpretation: 'round_up',
            explanation: 'Need a whole number, must round up'
        },
        'round_down': {
            scenarios: [
                'complete teams that can be made',
                'full groups that can be formed',
                'complete sets available',
                'whole portions that can be served'
            ],
            interpretation: 'round_down',
            explanation: 'Only count complete groups'
        },
        'as_fraction': {
            scenarios: [
                'share of pizza each person gets',
                'portion of cake for each child',
                'fraction of the total',
                'part of the whole amount'
            ],
            interpretation: 'as_fraction',
            explanation: 'Express as a mixed number'
        },
        'exact_remainder': {
            scenarios: [
                'how many left over',
                'how many remain',
                'what is the remainder',
                'how many are not used'
            ],
            interpretation: 'exact_remainder',
            explanation: 'Express as quotient and remainder'
        }
    };

    return contexts[contextType] || contexts['exact_remainder'];
}
