/**
 * Scale Diagram Helper Functions
 * Provides utilities for creating simple HTML-based scale diagrams
 * Following the low-overhead visual display philosophy (styled HTML/CSS)
 */

/**
 * Generate a simple horizontal scale diagram using HTML/CSS
 * @param {number} max - Maximum value on scale
 * @param {number} interval - Interval between marks
 * @param {number} value - Current value (pointer position)
 * @param {string} unit - Unit of measurement
 * @param {boolean} showAllNumbers - Whether to show all numbers or just some
 * @returns {string} HTML string representing the scale
 */
export function generateHorizontalScale(max, interval, value, unit = '', showAllNumbers = true) {
    const marks = [];
    for (let i = 0; i <= max; i += interval) {
        marks.push(i);
    }

    const marksHtml = marks.map((mark, index) => {
        const isPointerHere = Math.abs(mark - value) < interval * 0.01; // Allow tiny tolerance for floating point
        const showNumber = showAllNumbers || mark === 0 || mark === max || index % 2 === 0;

        return `<div class="scale-mark ${isPointerHere ? 'pointer-here' : ''}">
            <div class="mark-line ${isPointerHere ? 'with-pointer' : ''}"></div>
            ${showNumber ? `<div class="mark-label">${mark}</div>` : '<div class="mark-label"></div>'}
        </div>`;
    }).join('');

    return `<div class="scale-container">
        <div class="scale-body">${marksHtml}</div>
        ${unit ? `<div class="scale-unit">${unit}</div>` : ''}
    </div>`;
}

/**
 * Generate a vertical scale diagram (for measuring jugs, thermometers)
 * @param {number} max - Maximum value on scale
 * @param {number} interval - Interval between marks
 * @param {number} value - Current value (pointer position)
 * @param {string} unit - Unit of measurement
 * @param {string} type - Type of scale ('jug', 'thermometer', 'generic')
 * @returns {string} HTML string representing the vertical scale
 */
export function generateVerticalScale(max, interval, value, unit = '', type = 'generic') {
    const marks = [];
    for (let i = 0; i <= max; i += interval) {
        marks.push(i);
    }

    // Reverse for vertical display (0 at bottom)
    marks.reverse();

    const marksHtml = marks.map(mark => {
        const isPointerHere = Math.abs(mark - value) < interval * 0.01; // Allow tiny tolerance

        return `<div class="scale-mark-vertical ${isPointerHere ? 'pointer-here' : ''}">
            <div class="mark-label-vertical">${mark}</div>
            <div class="mark-line-vertical ${isPointerHere ? 'with-pointer' : ''}"></div>
        </div>`;
    }).join('');

    return `<div class="scale-container-vertical ${type}">
        <div class="scale-body-vertical">${marksHtml}</div>
        ${unit ? `<div class="scale-unit-vertical">${unit}</div>` : ''}
    </div>`;
}

/**
 * Get appropriate measurement objects for a given measure type
 * @param {string} measureType - Type of measurement
 * @returns {Array} Array of objects with name and typical measurement
 */
export function getMeasurementObjects(measureType) {
    const objects = {
        length: [
            { name: 'pencil', typical: 15, unit: 'cm' },
            { name: 'book', typical: 25, unit: 'cm' },
            { name: 'desk', typical: 120, unit: 'cm' },
            { name: 'room width', typical: 4, unit: 'm' },
            { name: 'car', typical: 4, unit: 'm' },
            { name: 'football pitch', typical: 100, unit: 'm' }
        ],
        mass: [
            { name: 'apple', typical: 150, unit: 'g' },
            { name: 'bag of sugar', typical: 1, unit: 'kg' },
            { name: 'textbook', typical: 500, unit: 'g' },
            { name: 'laptop', typical: 2, unit: 'kg' },
            { name: 'child', typical: 30, unit: 'kg' }
        ],
        capacity: [
            { name: 'cup', typical: 250, unit: 'ml' },
            { name: 'bottle', typical: 500, unit: 'ml' },
            { name: 'bucket', typical: 10, unit: 'l' },
            { name: 'bath', typical: 150, unit: 'l' }
        ],
        time: [
            { name: 'brush teeth', typical: 2, unit: 'minutes' },
            { name: 'lesson', typical: 60, unit: 'minutes' },
            { name: 'sleep', typical: 10, unit: 'hours' }
        ]
    };

    return objects[measureType] || [];
}

/**
 * Get appropriate unit for a measurement type and range
 * @param {string} measureType - Type of measurement
 * @param {number} value - The value to determine appropriate unit for
 * @returns {string} Appropriate unit
 */
export function getAppropriateUnit(measureType, value) {
    switch (measureType) {
        case 'length':
            if (value < 100) return 'cm';
            if (value < 1000) return 'm';
            return 'km';
        case 'mass':
            if (value < 1000) return 'g';
            return 'kg';
        case 'capacity':
            if (value < 1000) return 'ml';
            return 'l';
        case 'temperature':
            return '°C';
        default:
            return '';
    }
}
