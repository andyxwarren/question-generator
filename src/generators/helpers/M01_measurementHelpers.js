/**
 * M01 Helpers
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export function formatMeasurement(val, unit) {
    return `${val} ${unit}`;
}
export function getComparisonSymbol(a, b) {
    if (a > b) return '>';
    if (a < b) return '<';
    return '=';
}
export function convertUnit(val, from, to) {
    // Simplified conversion logic for demo
    if (from === to) return val;
    if (from === 'm' && to === 'cm') return val * 100;
    if (from === 'cm' && to === 'mm') return val * 10;
    if (from === 'kg' && to === 'g') return val * 1000;
    return val; // Fallback
}