/**
 * M04_Y1_MEAS: Time - O'clock and Half Past
 * Year 1: Tell the time to the hour and half past; sequence events; dates (days, weeks, months, years)
 *
 * Operations:
 * 1. read_oclock - Read time shown on clock (o'clock only)
 * 2. identify_oclock - Identify which clock shows a specific time
 * 3. read_half_past - Read time shown on clock (half past)
 * 4. identify_time - Identify which clock shows a specific time (o'clock or half past)
 * 5. sequence_events - Order events chronologically
 * 6. date_questions - Days of week, months of year
 */

import {
    randomChoice,
    randomInt,
    shuffle,
    generateClockSVG,
    getTimeInWords,
    DAYS_OF_WEEK,
    MONTHS_OF_YEAR,
    EVENT_SCENARIOS,
    getNextDay,
    getPreviousDay
} from './helpers/M04_timeHelpers.js';

/**
 * Generate a question based on parameters and level
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'read_oclock':
            return generateReadOclock(params);
        case 'identify_oclock':
            return generateIdentifyOclock(params);
        case 'read_half_past':
            return generateReadHalfPast(params);
        case 'identify_time':
            return generateIdentifyTime(params);
        case 'sequence_events':
            return generateSequenceEvents(params);
        case 'date_questions':
            return generateDateQuestion(params);
        default:
            return generateReadOclock(params);
    }
}

/**
 * Generate "read o'clock" question
 */
function generateReadOclock(params) {
    const hour = randomChoice(params.hours);
    const minute = 0;
    const clockSVG = generateClockSVG(hour, minute);

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'text_input',
        answer: `${hour} o'clock`,
        hint: 'Look at the short hand (hour hand) to see which number it points to.',
        module: 'M04_Y1_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate "identify o'clock" question (multiple choice with clock images)
 */
function generateIdentifyOclock(params) {
    const targetHour = randomChoice(params.hours);
    const minute = 0;

    // Generate 3 other distinct hours for distractors
    const otherHours = params.hours.filter(h => h !== targetHour);
    const distractors = shuffle(otherHours).slice(0, 3);

    const options = shuffle([targetHour, ...distractors]);
    const optionLabels = options.map(h => `${h} o'clock`);

    return {
        text: `Which time is ${targetHour} o'clock?\n\n` +
              options.map((h, i) => `${String.fromCharCode(65 + i)}. ${generateClockSVG(h, minute)}`).join('\n\n'),
        type: 'multiple_choice',
        options: optionLabels,
        answer: `${targetHour} o'clock`,
        module: 'M04_Y1_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate "read half past" question
 */
function generateReadHalfPast(params) {
    const hour = randomChoice(params.hours);
    const minute = 30;
    const clockSVG = generateClockSVG(hour, minute);

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'text_input',
        answer: `half past ${hour}`,
        hint: 'When the long hand points to 6, it is half past the hour.',
        module: 'M04_Y1_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate "identify time" question (o'clock or half past)
 */
function generateIdentifyTime(params) {
    const hour = randomChoice(params.hours);
    const isHalfPast = params.include_half_past && Math.random() < 0.5;
    const minute = isHalfPast ? 30 : 0;
    const timeText = getTimeInWords(hour, minute);

    // Generate distractors
    const distractors = [];
    const usedTimes = new Set([timeText]);

    while (distractors.length < 3) {
        const distHour = randomChoice(params.hours);
        const distMinute = (params.include_half_past && Math.random() < 0.5) ? 30 : 0;
        const distTimeText = getTimeInWords(distHour, distMinute);

        if (!usedTimes.has(distTimeText)) {
            distractors.push(distTimeText);
            usedTimes.add(distTimeText);
        }
    }

    const options = shuffle([timeText, ...distractors]);
    const clockSVG = generateClockSVG(hour, minute);

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'multiple_choice',
        options: options,
        answer: timeText,
        module: 'M04_Y1_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate sequence events question
 */
function generateSequenceEvents(params) {
    const operation = randomChoice(params.sequence_operations);

    if (operation === 'order_two_events') {
        const scenario = randomChoice(EVENT_SCENARIOS);
        const events = scenario.events.slice(0, 2);

        return {
            text: `Which happens first?\n\nA. ${events[1]}\nB. ${events[0]}`,
            type: 'multiple_choice',
            options: [events[0], events[1]],
            answer: events[0],
            hint: `Think about the order of ${scenario.context}.`,
            module: 'M04_Y1_MEAS',
            level: params.level || 2
        };
    } else if (operation === 'order_three_events') {
        const scenario = randomChoice(EVENT_SCENARIOS);
        const events = scenario.events.slice(0, 3);
        const scrambled = shuffle([...events]);

        return {
            text: `Put these events in the correct order:\n\n${scrambled.map((e, i) => `${i + 1}. ${e}`).join('\n')}`,
            type: 'text_input',
            answer: events.join(', '),
            answers: events,
            hint: `Think about ${scenario.context} and what happens first, next, and last.`,
            module: 'M04_Y1_MEAS',
            level: params.level || 3
        };
    } else if (operation === 'before_after') {
        const scenario = randomChoice(EVENT_SCENARIOS);
        const events = scenario.events.slice(0, 3);
        const middleEvent = events[1];
        const isBefore = Math.random() < 0.5;

        return {
            text: isBefore
                ? `What happens before ${middleEvent}?`
                : `What happens after ${middleEvent}?`,
            type: 'multiple_choice',
            options: isBefore ? [events[0], events[2]] : [events[2], events[0]],
            answer: isBefore ? events[0] : events[2],
            hint: `Think about the order of ${scenario.context}.`,
            module: 'M04_Y1_MEAS',
            level: params.level || 3
        };
    } else if (operation === 'next_event') {
        const scenario = randomChoice(EVENT_SCENARIOS);
        const events = scenario.events;

        return {
            text: `If the order is: ${events.join(', then ')}, what comes next after ${events[events.length - 2]}?`,
            type: 'text_input',
            answer: events[events.length - 1],
            module: 'M04_Y1_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateSequenceEvents({ ...params, sequence_operations: ['order_two_events'] });
}

/**
 * Generate date question (days, months)
 */
function generateDateQuestion(params) {
    const operation = randomChoice(params.date_operations);

    if (operation === 'identify_day') {
        const day = randomChoice(DAYS_OF_WEEK);
        const otherDays = DAYS_OF_WEEK.filter(d => d !== day);
        const distractors = shuffle(otherDays).slice(0, 3);
        const options = shuffle([day, ...distractors]);

        const dayIndex = DAYS_OF_WEEK.indexOf(day) + 1;

        return {
            text: `What is the ${dayIndex === 1 ? 'first' : dayIndex === 2 ? 'second' : dayIndex === 3 ? 'third' : `${dayIndex}th`} day of the week?`,
            type: 'multiple_choice',
            options: options,
            answer: day,
            hint: 'Monday is the first day of the week.',
            module: 'M04_Y1_MEAS',
            level: params.level || 2
        };
    } else if (operation === 'order_days') {
        const startIndex = randomInt(0, 4);
        const days = DAYS_OF_WEEK.slice(startIndex, startIndex + 3);

        return {
            text: `What day comes after ${days[0]}?`,
            type: 'multiple_choice',
            options: shuffle([days[1], days[2], DAYS_OF_WEEK[(startIndex + 4) % 7]]).slice(0, 3),
            answer: days[1],
            module: 'M04_Y1_MEAS',
            level: params.level || 3
        };
    } else if (operation === 'identify_month') {
        const month = randomChoice(MONTHS_OF_YEAR);
        const otherMonths = MONTHS_OF_YEAR.filter(m => m !== month);
        const distractors = shuffle(otherMonths).slice(0, 3);
        const options = shuffle([month, ...distractors]);

        const monthIndex = MONTHS_OF_YEAR.indexOf(month) + 1;

        return {
            text: `What is the ${monthIndex === 1 ? 'first' : monthIndex === 2 ? 'second' : monthIndex === 3 ? 'third' : `${monthIndex}th`} month of the year?`,
            type: 'multiple_choice',
            options: options,
            answer: month,
            hint: 'January is the first month of the year.',
            module: 'M04_Y1_MEAS',
            level: params.level || 3
        };
    } else if (operation === 'order_months') {
        const startIndex = randomInt(0, 9);
        const months = MONTHS_OF_YEAR.slice(startIndex, startIndex + 3);

        return {
            text: `What month comes after ${months[0]}?`,
            type: 'text_input',
            answer: months[1],
            module: 'M04_Y1_MEAS',
            level: params.level || 4
        };
    } else if (operation === 'days_in_week') {
        return {
            text: 'How many days are there in one week?',
            type: 'text_input',
            answer: '7',
            module: 'M04_Y1_MEAS',
            level: params.level || 4
        };
    } else if (operation === 'months_in_year') {
        return {
            text: 'How many months are there in one year?',
            type: 'text_input',
            answer: '12',
            module: 'M04_Y1_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateDateQuestion({ ...params, date_operations: ['identify_day'] });
}

export default {
    moduleId: 'M04_Y1_MEAS',
    generate: generateQuestion
};
