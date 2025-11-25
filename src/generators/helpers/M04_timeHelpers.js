/**
 * Time Helpers for M04 Generators
 */
export function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
export function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
export function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }

export function format12Hour(h, m) {
    const hour = h % 12 || 12;
    const min = m.toString().padStart(2, '0');
    return `${hour}:${min}`;
}

export function format24Hour(h, m) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function generateClockSVG(h, m) {
    // Placeholder for SVG generation logic
    return `[Clock showing ${h}:${m.toString().padStart(2, '0')}]`;
}

export function getTimeInWords(h, m) {
    if(m===0) return `${h} o'clock`;
    if(m===15) return `quarter past ${h}`;
    if(m===30) return `half past ${h}`;
    if(m===45) return `quarter to ${h+1}`;
    return `${m} minutes past ${h}`;
}

export const TIME_FACTS = {
    minutes_in_hour: 60,
    hours_in_day: 24,
    seconds_in_minute: 60,
    days_in_week: 7,
    days_in_year: 365
};