/**
 * Simple Visual Helpers for MVP
 *
 * HTML/CSS-based visual representations that can be easily upgraded to SVG later
 */

import { formatNumber } from './N04_representationHelpers.js';

/**
 * Create a simple HTML/CSS number line
 * @param {number} min - Minimum value on number line
 * @param {number} max - Maximum value on number line
 * @param {number|null} markedPosition - Position to mark with arrow (null for no marker)
 * @param {boolean} showAllLabels - If true, show all tick labels; if false, show only start/middle/end
 * @returns {string} HTML string for number line
 */
export function createSimpleNumberLineHTML(min, max, markedPosition = null, showAllLabels = false) {
    const divisions = 10;
    const step = (max - min) / divisions;

    let html = '<div class="simple-number-line">';

    for (let i = 0; i <= divisions; i++) {
        const value = min + (i * step);
        const isMarked = markedPosition !== null &&
                         Math.abs(value - markedPosition) < step * 0.4;

        // Show labels at start, middle, end, or all depending on parameter
        const showLabel = showAllLabels || i === 0 || i === divisions || i === 5;

        html += `
            <div class="number-line-tick ${isMarked ? 'marked' : ''}">
                ${isMarked ? '<div class="marker">▼</div>' : ''}
                ${showLabel ? `<div class="tick-label">${formatNumber(value)}</div>` : ''}
            </div>
        `;
    }

    html += '</div>';
    return html;
}

/**
 * Create simple dot/object counting visual
 * @param {number} count - Number of objects to display
 * @param {number} groupSize - Objects per group (for subitizing support)
 * @param {string} color - CSS color for dots
 * @returns {string} HTML string for dots
 */
export function createSimpleDotsHTML(count, groupSize = 5, color = '#3b82f6') {
    let html = '<div class="simple-dots-container">';

    for (let i = 0; i < count; i++) {
        // Add visual spacer after each group
        if (i > 0 && i % groupSize === 0) {
            html += '<div class="dot-spacer"></div>';
        }
        html += `<div class="simple-dot" style="background-color: ${color}"></div>`;
    }

    html += '</div>';
    return html;
}

/**
 * Create number line with a range highlighted (for "between" questions)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} rangeStart - Start of highlighted range
 * @param {number} rangeEnd - End of highlighted range
 * @returns {string} HTML string for number line with range
 */
export function createNumberLineWithRange(min, max, rangeStart, rangeEnd) {
    const divisions = 10;
    const step = (max - min) / divisions;

    let html = '<div class="simple-number-line with-range">';

    for (let i = 0; i <= divisions; i++) {
        const value = min + (i * step);
        const isInRange = value >= rangeStart && value <= rangeEnd;
        const showLabel = i === 0 || i === divisions || i === 5;

        html += `
            <div class="number-line-tick ${isInRange ? 'in-range' : ''}">
                ${showLabel ? `<div class="tick-label">${formatNumber(value)}</div>` : ''}
            </div>
        `;
    }

    html += '</div>';
    return html;
}

/**
 * Create a ten frame visualization (2x5 grid)
 * @param {number} count - Number to show (0-10)
 * @param {string} fillColor - Color for filled cells
 * @param {string} emptyColor - Color for empty cells
 * @returns {string} HTML string for ten frame
 */
export function createTenFrameHTML(count, fillColor = '#3b82f6', emptyColor = '#e5e7eb') {
    if (count < 0 || count > 10) {
        count = Math.min(10, Math.max(0, count));
    }

    let html = '<div class="ten-frame">';

    for (let i = 0; i < 10; i++) {
        const isFilled = i < count;
        const color = isFilled ? fillColor : emptyColor;
        html += `<div class="ten-frame-cell ${isFilled ? 'filled' : 'empty'}" style="background-color: ${color}"></div>`;
    }

    html += '</div>';
    return html;
}

/**
 * Create base-10 blocks representation
 * @param {number} number - Number to represent (up to 100)
 * @returns {string} HTML string for base-10 blocks
 */
export function createBase10BlocksHTML(number) {
    const tens = Math.floor(number / 10);
    const ones = number % 10;

    let html = '<div class="base10-container">';

    // Tens rods
    if (tens > 0) {
        html += '<div class="tens-group">';
        for (let i = 0; i < tens; i++) {
            html += '<div class="tens-rod"></div>';
        }
        html += '</div>';
    }

    // Ones cubes
    if (ones > 0) {
        html += '<div class="ones-group">';
        for (let i = 0; i < ones; i++) {
            html += '<div class="ones-cube"></div>';
        }
        html += '</div>';
    }

    html += '</div>';
    return html;
}

/**
 * Create tally marks representation
 * @param {number} count - Number to show
 * @returns {string} HTML string for tally marks
 */
export function createTallyMarksHTML(count) {
    const groups = Math.floor(count / 5);
    const remainder = count % 5;

    let html = '<div class="tally-marks-container">';

    // Full groups of 5
    for (let i = 0; i < groups; i++) {
        html += '<div class="tally-group">';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-diagonal">/</span>';
        html += '</div>';
    }

    // Remaining marks
    if (remainder > 0) {
        html += '<div class="tally-group incomplete">';
        for (let i = 0; i < remainder; i++) {
            html += '<span class="tally-line">|</span>';
        }
        html += '</div>';
    }

    html += '</div>';
    return html;
}

export default {
    createSimpleNumberLineHTML,
    createSimpleDotsHTML,
    createNumberLineWithRange,
    createTenFrameHTML,
    createBase10BlocksHTML,
    createTallyMarksHTML
};
