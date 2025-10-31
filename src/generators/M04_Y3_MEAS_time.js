/**
 * M04_Y3_MEAS: Analogue Clocks and Time Vocabulary
 * Year 3: Tell and write time from analogue clock (12/24-hour); read to nearest minute;
 *         use time vocabulary (a.m./p.m., morning, afternoon, noon, midnight);
 *         know seconds in minute, days in months/year/leap year; compare durations
 *
 * Operations:
 * 1. read_to_minute - Read time to nearest minute
 * 2. write_12hour - Write 12-hour time
 * 3. write_24hour - Write 24-hour time
 * 4. am_pm_identification - Identify if time is a.m. or p.m.
 * 5. time_vocabulary - Use morning/afternoon/noon/midnight vocabulary
 * 6. calendar_facts - Seconds in minute, days in months/year
 * 7. duration_problems - Compare and calculate durations
 */

import {
    randomChoice,
    randomInt,
    shuffle,
    generateClockSVG,
    format12Hour,
    format24Hour,
    to12HourWithPeriod,
    getTimeOfDay,
    TIME_FACTS,
    DAYS_IN_MONTH,
    MONTHS_OF_YEAR
} from './helpers/M04_timeHelpers.js';

/**
 * Generate a question based on parameters and level
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'read_to_minute':
            return generateReadToMinute(params);
        case 'write_12hour':
            return generateWrite12Hour(params);
        case 'write_24hour':
            return generateWrite24Hour(params);
        case 'am_pm_identification':
            return generateAmPmIdentification(params);
        case 'time_vocabulary':
            return generateTimeVocabulary(params);
        case 'calendar_facts':
            return generateCalendarFacts(params);
        case 'duration_problems':
            return generateDurationProblems(params);
        default:
            return generateReadToMinute(params);
    }
}

/**
 * Generate "read to minute" question
 */
function generateReadToMinute(params) {
    const hour = randomChoice(params.hours);
    const minute = randomChoice(params.minutes);
    const clockSVG = generateClockSVG(hour, minute, params.use_roman_numerals);

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'text_input',
        answer: format12Hour(hour, minute),
        hint: minute < 10 ? 'Remember to include the zero for minutes less than 10 (e.g., 3:05).' : 'Count the minutes carefully around the clock.',
        module: 'M04_Y3_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate "write 12-hour" question
 */
function generateWrite12Hour(params) {
    const hour = randomChoice(params.hours);
    const minute = randomChoice(params.minutes);
    const timeText = format12Hour(hour, minute);

    const questionType = randomInt(1, 2);

    if (questionType === 1) {
        const clockSVG = generateClockSVG(hour, minute, params.use_roman_numerals);
        return {
            text: `Write this time in 12-hour format (e.g., 3:15):\n\n${clockSVG}`,
            type: 'text_input',
            answer: timeText,
            module: 'M04_Y3_MEAS',
            level: params.level || 1
        };
    } else {
        // Convert from words
        const minuteWords = minute === 0 ? "o'clock" :
                           minute === 15 ? "quarter past" :
                           minute === 30 ? "half past" :
                           minute === 45 ? "quarter to" :
                           `${minute} minutes past`;

        const displayHour = minute === 45 ? (hour === 12 ? 1 : hour + 1) : hour;

        return {
            text: minute === 45
                ? `Write "${minuteWords} ${displayHour}" in 12-hour format (e.g., 3:15).`
                : `Write "${minuteWords} ${hour}" in 12-hour format (e.g., 3:15).`,
            type: 'text_input',
            answer: timeText,
            hint: 'Use the format hour:minutes with two digits for minutes.',
            module: 'M04_Y3_MEAS',
            level: params.level || 2
        };
    }
}

/**
 * Generate "write 24-hour" question
 */
function generateWrite24Hour(params) {
    const hour24 = randomChoice(params.hours_24);
    const minute = randomChoice(params.minutes);
    const time24 = format24Hour(hour24, minute);

    const questionType = randomInt(1, 2);

    if (questionType === 1) {
        // Convert from 12-hour with AM/PM
        const isPM = hour24 >= 12;
        const hour12 = hour24 === 0 ? 12 : (hour24 > 12 ? hour24 - 12 : hour24);
        const period = isPM ? 'p.m.' : 'a.m.';

        return {
            text: `Write ${hour12}:${String(minute).padStart(2, '0')} ${period} in 24-hour format (e.g., 15:30).`,
            type: 'text_input',
            answer: time24,
            hint: 'In 24-hour format, afternoon times are 13:00 to 23:59.',
            module: 'M04_Y3_MEAS',
            level: params.level || 3
        };
    } else {
        // Read from description
        const timeOfDay = getTimeOfDay(hour24);

        return {
            text: `It is ${minute} minutes past ${hour24 === 0 ? 'midnight' : `${hour24} (${timeOfDay})`}. Write this in 24-hour format.`,
            type: 'text_input',
            answer: time24,
            module: 'M04_Y3_MEAS',
            level: params.level || 3
        };
    }
}

/**
 * Generate a.m./p.m. identification question
 */
function generateAmPmIdentification(params) {
    const hour = randomChoice(params.hours);
    const minute = randomChoice(params.minutes);

    const scenarios = [
        { context: 'eating breakfast', correctPeriod: 'a.m.', hour: 7 },
        { context: 'eating lunch', correctPeriod: 'p.m.', hour: 12 },
        { context: 'going to bed', correctPeriod: 'p.m.', hour: 8 },
        { context: 'school starts', correctPeriod: 'a.m.', hour: 9 },
        { context: 'eating dinner', correctPeriod: 'p.m.', hour: 6 },
        { context: 'sunrise', correctPeriod: 'a.m.', hour: 6 }
    ];

    const scenario = randomChoice(scenarios);

    return {
        text: `It is ${scenario.hour}:${String(minute).padStart(2, '0')} and you are ${scenario.context}. Is this time a.m. or p.m.?`,
        type: 'multiple_choice',
        options: ['a.m.', 'p.m.'],
        answer: scenario.correctPeriod,
        hint: 'a.m. is morning (midnight to noon), p.m. is afternoon/evening (noon to midnight).',
        module: 'M04_Y3_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate time vocabulary question
 */
function generateTimeVocabulary(params) {
    const vocabType = randomChoice(params.time_vocabulary);

    if (vocabType === 'am' || vocabType === 'pm') {
        const hour = randomInt(1, 11);
        const minute = randomChoice([0, 15, 30, 45]);
        const isPM = vocabType === 'pm';
        const hour24 = isPM ? hour + 12 : hour;

        return {
            text: `What is ${format12Hour(hour, minute)} ${isPM ? 'p.m.' : 'a.m.'} in 24-hour format?`,
            type: 'text_input',
            answer: format24Hour(hour24, minute),
            module: 'M04_Y3_MEAS',
            level: params.level || 2
        };
    } else if (vocabType === 'morning') {
        return {
            text: 'Which of these times is in the morning?',
            type: 'multiple_choice',
            options: ['8:00 a.m.', '2:00 p.m.', '7:00 p.m.', '11:00 p.m.'],
            answer: '8:00 a.m.',
            hint: 'Morning is from midnight to noon.',
            module: 'M04_Y3_MEAS',
            level: params.level || 2
        };
    } else if (vocabType === 'afternoon') {
        return {
            text: 'Which of these times is in the afternoon?',
            type: 'multiple_choice',
            options: ['3:00 p.m.', '9:00 a.m.', '11:00 p.m.', '7:00 a.m.'],
            answer: '3:00 p.m.',
            hint: 'Afternoon is from noon to around 6:00 p.m.',
            module: 'M04_Y3_MEAS',
            level: params.level || 2
        };
    } else if (vocabType === 'noon') {
        return {
            text: 'What time is noon in 24-hour format?',
            type: 'text_input',
            answer: '12:00',
            hint: 'Noon is 12 o\'clock in the daytime.',
            module: 'M04_Y3_MEAS',
            level: params.level || 3
        };
    } else if (vocabType === 'midnight') {
        return {
            text: 'What time is midnight in 24-hour format?',
            type: 'text_input',
            answer: '00:00',
            hint: 'Midnight is 12 o\'clock at night, which is the start of a new day.',
            module: 'M04_Y3_MEAS',
            level: params.level || 3
        };
    } else if (vocabType === 'oclock') {
        const hour = randomChoice(params.hours);
        return {
            text: `What is ${hour} o'clock in 12-hour format?`,
            type: 'text_input',
            answer: `${hour}:00`,
            module: 'M04_Y3_MEAS',
            level: params.level || 1
        };
    }

    // Default fallback
    return generateTimeVocabulary({ ...params, time_vocabulary: ['morning'] });
}

/**
 * Generate calendar facts question
 */
function generateCalendarFacts(params) {
    const factType = randomChoice(params.calendar_facts);

    if (factType === 'seconds_in_minute') {
        return {
            text: 'How many seconds are there in 1 minute?',
            type: 'text_input',
            answer: '60',
            module: 'M04_Y3_MEAS',
            level: params.level || 2
        };
    } else if (factType === 'days_in_week') {
        return {
            text: 'How many days are there in 1 week?',
            type: 'text_input',
            answer: '7',
            module: 'M04_Y3_MEAS',
            level: params.level || 2
        };
    } else if (factType === 'days_in_months') {
        const month = randomChoice(MONTHS_OF_YEAR);
        const days = DAYS_IN_MONTH[month];

        return {
            text: `How many days are there in ${month}?`,
            type: 'text_input',
            answer: String(days),
            hint: month === 'February' ? 'Remember, February has 28 days in a normal year.' : '',
            module: 'M04_Y3_MEAS',
            level: params.level || 3
        };
    } else if (factType === 'days_in_year') {
        return {
            text: 'How many days are there in 1 year?',
            type: 'multiple_choice',
            options: ['365', '366', '364', '360'],
            answer: '365',
            hint: 'A normal (non-leap) year has 365 days.',
            module: 'M04_Y3_MEAS',
            level: params.level || 3
        };
    } else if (factType === 'leap_year') {
        const questionType = randomInt(1, 2);

        if (questionType === 1) {
            return {
                text: 'How many days are there in a leap year?',
                type: 'text_input',
                answer: '366',
                hint: 'A leap year has one extra day.',
                module: 'M04_Y3_MEAS',
                level: params.level || 4
            };
        } else {
            return {
                text: 'How many days does February have in a leap year?',
                type: 'text_input',
                answer: '29',
                hint: 'February gains one extra day in a leap year.',
                module: 'M04_Y3_MEAS',
                level: params.level || 4
            };
        }
    }

    // Default fallback
    return generateCalendarFacts({ ...params, calendar_facts: ['seconds_in_minute'] });
}

/**
 * Generate duration comparison/calculation question
 */
function generateDurationProblems(params) {
    const operation = randomChoice(params.duration_operations);

    if (operation === 'compare_simple_durations') {
        const durations = [
            { activity: 'brushing teeth', minutes: 3 },
            { activity: 'reading a chapter', minutes: 15 },
            { activity: 'eating lunch', minutes: 30 },
            { activity: 'a football match', minutes: 90 }
        ];

        const [dur1, dur2] = shuffle(durations).slice(0, 2);
        const longer = dur1.minutes > dur2.minutes ? dur1 : dur2;

        return {
            text: `Which takes longer:\n${dur1.activity} (${dur1.minutes} minutes) or ${dur2.activity} (${dur2.minutes} minutes)?`,
            type: 'multiple_choice',
            options: [dur1.activity, dur2.activity],
            answer: longer.activity,
            module: 'M04_Y3_MEAS',
            level: params.level || 2
        };
    } else if (operation === 'compare_durations') {
        const dur1Hours = randomInt(1, 3);
        const dur1Mins = randomChoice([0, 15, 30, 45]);
        const dur2Hours = randomInt(1, 3);
        const dur2Mins = randomChoice([0, 15, 30, 45]);

        const total1 = dur1Hours * 60 + dur1Mins;
        const total2 = dur2Hours * 60 + dur2Mins;

        if (total1 === total2) {
            // Ensure they're different
            return generateDurationProblems(params);
        }

        const comparison = total1 > total2 ? '>' : '<';

        return {
            text: `Which symbol makes this comparison correct?\n\n${dur1Hours} hours ${dur1Mins} minutes __ ${dur2Hours} hours ${dur2Mins} minutes`,
            type: 'multiple_choice',
            options: ['<', '>', '='],
            answer: comparison,
            hint: 'Convert both durations to minutes to compare them.',
            module: 'M04_Y3_MEAS',
            level: params.level || 3
        };
    } else if (operation === 'calculate_duration') {
        const startHour = randomInt(9, 11);
        const endHour = randomInt(startHour + 1, startHour + 3);
        const minute = randomChoice([0, 15, 30]);

        const durationHours = endHour - startHour;

        return {
            text: `A lesson starts at ${startHour}:${String(minute).padStart(2, '0')} and ends at ${endHour}:${String(minute).padStart(2, '0')}. How long is the lesson?`,
            type: 'text_input',
            answer: `${durationHours} hours`,
            hint: 'Subtract the start time from the end time.',
            module: 'M04_Y3_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateDurationProblems({ ...params, duration_operations: ['compare_simple_durations'] });
}

export default {
    moduleId: 'M04_Y3_MEAS',
    generate: generateQuestion
};
