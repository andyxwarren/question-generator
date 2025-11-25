/**
 * Scale Helpers for M02 Generators
 */
export function generateHorizontalScale(max, interval, value, unit, showAllNumbers) {
    const marks = [];
    for (let i = 0; i <= max; i += interval) {
        marks.push(i);
    }
    
    // Simplified HTML representation for text output
    let visual = `|`;
    marks.forEach(m => {
        visual += `-${m === value ? '▼' : '-'}-|`;
    });
    
    return `<div class="scale-container">
        <div class="scale-visual">${visual}</div>
        <div class="scale-labels">0 ... ${max} (${unit})</div>
    </div>`;
}

export function generateVerticalScale(max, interval, value, unit, type) {
    return `<div class="vertical-scale">
        [Vertical ${type} scale from 0 to ${max} ${unit}. Level is at ${value}]
    </div>`;
}