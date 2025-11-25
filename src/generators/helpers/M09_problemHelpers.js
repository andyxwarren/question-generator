/**
 * M09 Problem Helpers
 */
export function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
export function randomDecimal(min, max, dp) { return parseFloat((Math.random() * (max - min) + min).toFixed(dp)); }
export function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
export function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
export function roundTo(val, dp) { return Number(Math.round(val + "e" + dp) + "e-" + dp); }

export function formatMoney(val, type) {
    return type === 'decimal' ? `£${val.toFixed(2)}` : `${val}p`;
}

export function formatDecimalMeasure(val, unit, dp) {
    return `${val.toFixed(dp)}${unit}`;
}

export function generateShoppingItems(count) {
    const items = ['apple', 'book', 'pencil', 'toy', 'hat', 'ball'];
    return items.slice(0, count);
}

export function generateContext(contexts, type) {
    // Simple mock context generator
    return { subject: 'Tom', object: 'book' };
}

export function convertUnits(val, from, to) {
    // Simple conversion map
    if(from === 'km' && to === 'm') return val * 1000;
    if(from === 'kg' && to === 'g') return val * 1000;
    if(from === 'l' && to === 'ml') return val * 1000;
    return val;
}