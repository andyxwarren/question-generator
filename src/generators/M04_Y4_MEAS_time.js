/**
 * M04_Y4_MEAS: Time Conversions
 * Year 4: Convert between analogue/digital 12-hour; convert between analogue/digital 24-hour;
 *         solve problems converting hours↔minutes, minutes↔seconds, years↔months, weeks↔days
 *
 * Operations:
 * 1. convert_12hour_formats - Convert between analogue and digital 12-hour
 * 2. convert_to_24hour - Convert 12-hour to 24-hour format
 * 3. convert_hours_to_minutes - Convert hours to minutes
 * 4. convert_minutes_to_seconds - Convert minutes to seconds
 * 5. convert_years_to_months - Convert years to months
 * 6. convert_weeks_to_days - Convert weeks to days
 * 7. multi_step_conversions - Multi-step conversion problems
 */

import {
    randomChoice,
    randomInt,
    shuffle,
    generateClockSVG,
    format12Hour,
    format24Hour,
    to12HourWithPeriod,
    to24Hour,
    hoursToMinutes,
    minutesToHours,
    minutesToSeconds,
    secondsToMinutes,
    yearsToMonths,
    monthsToYears,
    weeksToDays,
    daysToWeeks,
    TIME_FACTS
} from './helpers/M04_timeHelpers.js';

/**
 * Generate a question based on parameters and level
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'convert_12hour_formats':
            return generateConvert12HourFormats(params);
        case 'convert_to_24hour':
            return generateConvertTo24Hour(params);
        case 'convert_hours_to_minutes':
            return generateConvertHoursToMinutes(params);
        case 'convert_minutes_to_seconds':
            return generateConvertMinutesToSeconds(params);
        case 'convert_years_to_months':
            return generateConvertYearsToMonths(params);
        case 'convert_weeks_to_days':
            return generateConvertWeeksToDays(params);
        case 'multi_step_conversions':
            return generateMultiStepConversions(params);
        default:
            return generateConvert12HourFormats(params);
    }
}

/**
 * Generate convert 12-hour formats question
 */
function generateConvert12HourFormats(params) {
    const hour = randomChoice(params.time_ranges.hours);
    const minute = randomChoice(params.time_ranges.minutes);

    const questionType = randomInt(1, 2);

    if (questionType === 1) {
        // Analogue to digital
        const clockSVG = generateClockSVG(hour, minute);

        return {
            text: `Write the time shown on this analogue clock in digital format (e.g., 3:15):\n\n${clockSVG}`,
            type: 'text_input',
            answer: format12Hour(hour, minute),
            module: 'M04_Y4_MEAS',
            level: params.level || 1
        };
    } else {
        // Digital to description
        const timeText = format12Hour(hour, minute);

        return {
            text: `A digital clock shows ${timeText}. What time is this?`,
            type: 'multiple_choice',
            options: shuffle([
                timeText,
                format12Hour((hour + 1) % 12 || 12, minute),
                format12Hour(hour, (minute + 5) % 60),
                format12Hour(hour, (minute + 15) % 60)
            ]).slice(0, 4),
            answer: timeText,
            module: 'M04_Y4_MEAS',
            level: params.level || 1
        };
    }
}

/**
 * Generate convert to 24-hour question
 */
function generateConvertTo24Hour(params) {
    const conversionType = randomChoice(params.conversion_types.filter(ct => ct.includes('24hour')));

    if (conversionType === '12hour_to_24hour') {
        const hour12 = randomChoice(params.time_ranges.hours);
        const minute = randomChoice(params.time_ranges.minutes);
        const isPM = Math.random() < 0.5;
        const period = isPM ? 'p.m.' : 'a.m.';

        const hour24 = to24Hour(hour12, minute, isPM);
        const answer = format24Hour(hour24, minute);

        return {
            text: `Convert ${hour12}:${String(minute).padStart(2, '0')} ${period} to 24-hour format.`,
            type: 'text_input',
            answer: answer,
            hint: 'Remember: p.m. times (except 12:00 p.m.) add 12 to the hour. Midnight is 00:00.',
            module: 'M04_Y4_MEAS',
            level: params.level || 2
        };
    } else if (conversionType === '24hour_to_12hour') {
        const hour24 = randomChoice(params.time_ranges.hours_24);
        const minute = randomChoice(params.time_ranges.minutes);

        const answer = to12HourWithPeriod(hour24, minute);

        return {
            text: `Convert ${format24Hour(hour24, minute)} to 12-hour format with a.m. or p.m.`,
            type: 'text_input',
            answer: answer,
            hint: 'Times from 00:00 to 11:59 are a.m., times from 12:00 to 23:59 are p.m.',
            module: 'M04_Y4_MEAS',
            level: params.level || 2
        };
    } else if (conversionType === '12hour_analogue_digital') {
        const hour = randomChoice(params.time_ranges.hours);
        const minute = randomChoice(params.time_ranges.minutes);
        const clockSVG = generateClockSVG(hour, minute);

        return {
            text: `Write the time shown on this clock in digital format:\n\n${clockSVG}`,
            type: 'text_input',
            answer: format12Hour(hour, minute),
            module: 'M04_Y4_MEAS',
            level: params.level || 1
        };
    }

    // Default fallback
    return generateConvertTo24Hour({ ...params, conversion_types: ['12hour_to_24hour'] });
}

/**
 * Generate hours to minutes conversion question
 */
function generateConvertHoursToMinutes(params) {
    const conversionType = randomChoice(['hours_to_minutes', 'minutes_to_hours']);

    if (conversionType === 'hours_to_minutes') {
        const hours = randomInt(params.conversion_ranges.hours.min, params.conversion_ranges.hours.max);
        const answer = hoursToMinutes(hours);

        const questionType = randomInt(1, 2);

        if (questionType === 1) {
            return {
                text: `How many minutes are there in ${hours} ${hours === 1 ? 'hour' : 'hours'}?`,
                type: 'text_input',
                answer: String(answer),
                hint: 'There are 60 minutes in 1 hour.',
                module: 'M04_Y4_MEAS',
                level: params.level || 1
            };
        } else {
            return {
                text: `Convert ${hours} ${hours === 1 ? 'hour' : 'hours'} to minutes.`,
                type: 'text_input',
                answer: String(answer),
                module: 'M04_Y4_MEAS',
                level: params.level || 2
            };
        }
    } else {
        // minutes_to_hours
        const hours = randomInt(params.conversion_ranges.hours.min, params.conversion_ranges.hours.max);
        const minutes = hoursToMinutes(hours);

        return {
            text: `How many hours is ${minutes} minutes?`,
            type: 'text_input',
            answer: String(hours),
            hint: 'There are 60 minutes in 1 hour.',
            module: 'M04_Y4_MEAS',
            level: params.level || 3
        };
    }
}

/**
 * Generate minutes to seconds conversion question
 */
function generateConvertMinutesToSeconds(params) {
    const conversionType = randomChoice(['minutes_to_seconds', 'seconds_to_minutes']);

    if (conversionType === 'minutes_to_seconds') {
        const minutes = randomInt(params.conversion_ranges.minutes.min, params.conversion_ranges.minutes.max);
        const answer = minutesToSeconds(minutes);

        return {
            text: `How many seconds are there in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}?`,
            type: 'text_input',
            answer: String(answer),
            hint: 'There are 60 seconds in 1 minute.',
            module: 'M04_Y4_MEAS',
            level: params.level || 2
        };
    } else {
        // seconds_to_minutes
        const minutes = randomInt(params.conversion_ranges.minutes.min, params.conversion_ranges.minutes.max);
        const seconds = minutesToSeconds(minutes);

        return {
            text: `How many minutes is ${seconds} seconds?`,
            type: 'text_input',
            answer: String(minutes),
            hint: 'There are 60 seconds in 1 minute.',
            module: 'M04_Y4_MEAS',
            level: params.level || 3
        };
    }
}

/**
 * Generate years to months conversion question
 */
function generateConvertYearsToMonths(params) {
    const conversionType = randomChoice(['years_to_months', 'months_to_years']);

    if (conversionType === 'years_to_months') {
        const years = randomInt(params.conversion_ranges.years.min, params.conversion_ranges.years.max);
        const answer = yearsToMonths(years);

        return {
            text: `How many months are there in ${years} ${years === 1 ? 'year' : 'years'}?`,
            type: 'text_input',
            answer: String(answer),
            hint: 'There are 12 months in 1 year.',
            module: 'M04_Y4_MEAS',
            level: params.level || 3
        };
    } else {
        // months_to_years
        const years = randomInt(params.conversion_ranges.years.min, params.conversion_ranges.years.max);
        const months = yearsToMonths(years);

        return {
            text: `How many years is ${months} months?`,
            type: 'text_input',
            answer: String(years),
            hint: 'There are 12 months in 1 year.',
            module: 'M04_Y4_MEAS',
            level: params.level || 3
        };
    }
}

/**
 * Generate weeks to days conversion question
 */
function generateConvertWeeksToDays(params) {
    const conversionType = randomChoice(['weeks_to_days', 'days_to_weeks']);

    if (conversionType === 'weeks_to_days') {
        const weeks = randomInt(params.conversion_ranges.weeks.min, params.conversion_ranges.weeks.max);
        const answer = weeksToDays(weeks);

        return {
            text: `How many days are there in ${weeks} ${weeks === 1 ? 'week' : 'weeks'}?`,
            type: 'text_input',
            answer: String(answer),
            hint: 'There are 7 days in 1 week.',
            module: 'M04_Y4_MEAS',
            level: params.level || 3
        };
    } else {
        // days_to_weeks
        const weeks = randomInt(params.conversion_ranges.weeks.min, params.conversion_ranges.weeks.max);
        const days = weeksToDays(weeks);

        return {
            text: `How many weeks is ${days} days?`,
            type: 'text_input',
            answer: String(weeks),
            hint: 'There are 7 days in 1 week.',
            module: 'M04_Y4_MEAS',
            level: params.level || 3
        };
    }
}

/**
 * Generate multi-step conversion problems
 */
function generateMultiStepConversions(params) {
    const problemTypes = [
        'hours_and_minutes_to_minutes',
        'minutes_and_seconds_to_seconds',
        'time_addition',
        'time_word_problem'
    ];

    const problemType = randomChoice(problemTypes);

    if (problemType === 'hours_and_minutes_to_minutes') {
        const hours = randomInt(1, 5);
        const minutes = randomChoice([15, 30, 45]);
        const totalMinutes = hours * 60 + minutes;

        return {
            text: `How many minutes are there in ${hours} hours and ${minutes} minutes?`,
            type: 'text_input',
            answer: String(totalMinutes),
            hint: 'Convert the hours to minutes first, then add the extra minutes.',
            module: 'M04_Y4_MEAS',
            level: params.level || 4
        };
    } else if (problemType === 'minutes_and_seconds_to_seconds') {
        const minutes = randomInt(2, 5);
        const seconds = randomChoice([15, 30, 45]);
        const totalSeconds = minutes * 60 + seconds;

        return {
            text: `How many seconds are there in ${minutes} minutes and ${seconds} seconds?`,
            type: 'text_input',
            answer: String(totalSeconds),
            hint: 'Convert the minutes to seconds first, then add the extra seconds.',
            module: 'M04_Y4_MEAS',
            level: params.level || 4
        };
    } else if (problemType === 'time_addition') {
        const hours1 = randomInt(1, 3);
        const hours2 = randomInt(1, 3);
        const totalHours = hours1 + hours2;
        const totalMinutes = totalHours * 60;

        return {
            text: `A journey takes ${hours1} ${hours1 === 1 ? 'hour' : 'hours'} by car and ${hours2} ${hours2 === 1 ? 'hour' : 'hours'} by train. How many minutes is the total journey?`,
            type: 'text_input',
            answer: String(totalMinutes),
            hint: 'Add the hours together first, then convert to minutes.',
            module: 'M04_Y4_MEAS',
            level: params.level || 4
        };
    } else if (problemType === 'time_word_problem') {
        const weeks = randomInt(2, 4);
        const days = weeksToDays(weeks);

        const scenarios = [
            `A holiday lasts ${weeks} weeks. How many days is this?`,
            `School runs for ${weeks} weeks. How many days of school is this?`,
            `A project takes ${weeks} weeks to complete. How many days is this?`
        ];

        return {
            text: randomChoice(scenarios),
            type: 'text_input',
            answer: String(days),
            hint: 'There are 7 days in each week.',
            module: 'M04_Y4_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateMultiStepConversions({ ...params });
}

export default {
    moduleId: 'M04_Y4_MEAS',
    generate: generateQuestion
};
