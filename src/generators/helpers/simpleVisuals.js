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

export default {
    createSimpleNumberLineHTML,
    createSimpleDotsHTML,
    createNumberLineWithRange
};
