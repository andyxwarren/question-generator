/**
 * Helper functions for M04 time modules
 * Provides utilities for time formatting, clock representation, and time calculations
 */

/**
 * Random choice from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Random integer between min and max (inclusive)
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Format time as 12-hour string (e.g., "3:00", "3:30")
 */
export function format12Hour(hour, minute) {
    const h = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    return `${h}:${String(minute).padStart(2, '0')}`;
}

/**
 * Format time as 24-hour string (e.g., "15:00", "03:30")
 */
export function format24Hour(hour, minute) {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

/**
 * Convert 24-hour to 12-hour format with AM/PM
 */
export function to12HourWithPeriod(hour, minute) {
    const period = hour < 12 ? 'a.m.' : 'p.m.';
    const h = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    return `${h}:${String(minute).padStart(2, '0')} ${period}`;
}

/**
 * Convert 12-hour time with AM/PM to 24-hour format
 */
export function to24Hour(hour, minute, isPM) {
    if (isPM && hour !== 12) {
        return hour + 12;
    }
    if (!isPM && hour === 12) {
        return 0;
    }
    return hour;
}

/**
 * Generate simple SVG clock face for digital display
 * Returns HTML string with inline SVG
 */
export function generateClockSVG(hour, minute, useRomanNumerals = false) {
    const centerX = 100;
    const centerY = 100;
    const radius = 80;

    // Calculate hour and minute hand angles
    const minuteAngle = (minute * 6 - 90) * (Math.PI / 180); // 6 degrees per minute
    const hourAngle = ((hour % 12) * 30 + minute * 0.5 - 90) * (Math.PI / 180); // 30 degrees per hour + 0.5 per minute

    // Hour hand endpoint
    const hourHandLength = radius * 0.5;
    const hourX = centerX + hourHandLength * Math.cos(hourAngle);
    const hourY = centerY + hourHandLength * Math.sin(hourAngle);

    // Minute hand endpoint
    const minuteHandLength = radius * 0.7;
    const minuteX = centerX + minuteHandLength * Math.cos(minuteAngle);
    const minuteY = centerY + minuteHandLength * Math.sin(minuteAngle);

    // Hour markers (numbers or Roman numerals)
    const hourMarkers = useRomanNumerals
        ? ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
        : ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    let markersSVG = '';
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const markerRadius = radius * 0.85;
        const x = centerX + markerRadius * Math.cos(angle);
        const y = centerY + markerRadius * Math.sin(angle) + 5; // Slight offset for text centering
        markersSVG += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="bold" font-family="Arial, sans-serif" fill="#1f2937">${hourMarkers[i]}</text>`;
    }

    return `<svg width="200" height="200" viewBox="0 0 200 200" class="clock-face">
        <!-- Clock circle -->
        <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="white" stroke="black" stroke-width="2"/>

        <!-- Hour markers -->
        ${markersSVG}

        <!-- Hour hand -->
        <line x1="${centerX}" y1="${centerY}" x2="${hourX}" y2="${hourY}" stroke="black" stroke-width="6" stroke-linecap="round"/>

        <!-- Minute hand -->
        <line x1="${centerX}" y1="${centerY}" x2="${minuteX}" y2="${minuteY}" stroke="black" stroke-width="3" stroke-linecap="round"/>

        <!-- Center dot -->
        <circle cx="${centerX}" cy="${centerY}" r="5" fill="black"/>
    </svg>`;
}

/**
 * Get time description in words (for Year 1-2)
 */
export function getTimeInWords(hour, minute) {
    if (minute === 0) {
        return `${hour} o'clock`;
    } else if (minute === 30) {
        return `half past ${hour}`;
    } else if (minute === 15) {
        return `quarter past ${hour}`;
    } else if (minute === 45) {
        const nextHour = hour === 12 ? 1 : hour + 1;
        return `quarter to ${nextHour}`;
    }
    return format12Hour(hour, minute);
}

/**
 * Days of the week
 */
export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Months of the year
 */
export const MONTHS_OF_YEAR = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Days in each month (non-leap year)
 */
export const DAYS_IN_MONTH = {
    'January': 31,
    'February': 28,
    'March': 31,
    'April': 30,
    'May': 31,
    'June': 30,
    'July': 31,
    'August': 31,
    'September': 30,
    'October': 31,
    'November': 30,
    'December': 31
};

/**
 * Time of day vocabulary
 */
export const TIME_VOCABULARY = {
    morning: { start: 6, end: 12 },
    afternoon: { start: 12, end: 18 },
    evening: { start: 18, end: 21 },
    night: { start: 21, end: 24 }
};

/**
 * Get time of day description
 */
export function getTimeOfDay(hour) {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night';
}

/**
 * Common time conversion facts
 */
export const TIME_FACTS = {
    secondsInMinute: 60,
    minutesInHour: 60,
    hoursInDay: 24,
    daysInWeek: 7,
    daysInYear: 365,
    daysInLeapYear: 366,
    monthsInYear: 12,
    weeksInYear: 52
};

/**
 * Convert hours to minutes
 */
export function hoursToMinutes(hours) {
    return hours * TIME_FACTS.minutesInHour;
}

/**
 * Convert minutes to hours (returns decimal or whole)
 */
export function minutesToHours(minutes) {
    return minutes / TIME_FACTS.minutesInHour;
}

/**
 * Convert minutes to seconds
 */
export function minutesToSeconds(minutes) {
    return minutes * TIME_FACTS.secondsInMinute;
}

/**
 * Convert seconds to minutes
 */
export function secondsToMinutes(seconds) {
    return seconds / TIME_FACTS.secondsInMinute;
}

/**
 * Convert years to months
 */
export function yearsToMonths(years) {
    return years * TIME_FACTS.monthsInYear;
}

/**
 * Convert months to years
 */
export function monthsToYears(months) {
    return months / TIME_FACTS.monthsInYear;
}

/**
 * Convert weeks to days
 */
export function weeksToDays(weeks) {
    return weeks * TIME_FACTS.daysInWeek;
}

/**
 * Convert days to weeks
 */
export function daysToWeeks(days) {
    return days / TIME_FACTS.daysInWeek;
}

/**
 * Common event scenarios for sequencing (Year 1)
 */
export const EVENT_SCENARIOS = [
    { events: ['wake up', 'eat breakfast', 'go to school'], context: 'morning routine' },
    { events: ['put on shoes', 'put on coat', 'leave the house'], context: 'getting ready' },
    { events: ['wash hands', 'eat lunch', 'play outside'], context: 'lunchtime' },
    { events: ['arrive home', 'have dinner', 'go to bed'], context: 'evening routine' },
    { events: ['Monday', 'Tuesday', 'Wednesday'], context: 'days of the week' },
    { events: ['spring', 'summer', 'autumn'], context: 'seasons' },
    { events: ['January', 'February', 'March'], context: 'start of year' },
    { events: ['read a book', 'brush teeth', 'go to sleep'], context: 'bedtime routine' }
];

/**
 * Get next day of week
 */
export function getNextDay(day) {
    const index = DAYS_OF_WEEK.indexOf(day);
    if (index === -1) return null;
    return DAYS_OF_WEEK[(index + 1) % 7];
}

/**
 * Get previous day of week
 */
export function getPreviousDay(day) {
    const index = DAYS_OF_WEEK.indexOf(day);
    if (index === -1) return null;
    return DAYS_OF_WEEK[(index - 1 + 7) % 7];
}

/**
 * Get next month
 */
export function getNextMonth(month) {
    const index = MONTHS_OF_YEAR.indexOf(month);
    if (index === -1) return null;
    return MONTHS_OF_YEAR[(index + 1) % 12];
}

/**
 * Get previous month
 */
export function getPreviousMonth(month) {
    const index = MONTHS_OF_YEAR.indexOf(month);
    if (index === -1) return null;
    return MONTHS_OF_YEAR[(index - 1 + 12) % 12];
}

/**
 * Time-related word problem contexts
 */
export const PROBLEM_CONTEXTS = {
    simple: [
        'A film lasts {value} {unit}.',
        'A journey takes {value} {unit}.',
        'A lesson is {value} {unit} long.',
        'The bus ride is {value} {unit}.'
    ],
    real_world: [
        'Tom practiced piano for {value} {unit}.',
        'The football match lasted {value} {unit}.',
        'Sarah\'s swimming lesson was {value} {unit} long.',
        'The school assembly took {value} {unit}.',
        'The library visit lasted {value} {unit}.'
    ],
    complex: [
        'A music concert started at {time1} and finished at {time2}.',
        'The train departed at {time1} and arrived at {time2}.',
        'School begins at {time1} and lunch is at {time2}.',
        'The shop opened at {time1} and closed at {time2}.'
    ],
    multi_stage: [
        'A film is {value1} {unit1} long. The adverts before it last {value2} {unit2}.',
        'Tom traveled for {value1} {unit1} by bus, then {value2} {unit2} by train.',
        'The first lesson is {value1} {unit1}, break is {value2} {unit2}, then the second lesson is {value3} {unit3}.'
    ]
};
