/**
 * M04_Y2_MEAS: Time to 5 Minutes
 * Year 2: Tell and write the time to five minutes, including quarter past/to;
 *         compare and sequence intervals of time; know minutes in hour and hours in day
 *
 * Operations:
 * 1. read_oclock - Read time (o'clock)
 * 2. read_half_past - Read time (half past)
 * 3. read_quarter_past - Read time (quarter past)
 * 4. read_quarter_to - Read time (quarter to)
 * 5. read_five_minutes - Read time to nearest 5 minutes
 * 6. write_time - Write the time shown
 * 7. identify_time - Identify which clock shows specific time
 * 8. time_facts - Minutes in hour, hours in day
 * 9. interval_problems - Compare and sequence time intervals
 */

import {
    randomChoice,
    randomInt,
    shuffle,
    generateClockSVG,
    getTimeInWords,
    format12Hour,
    TIME_FACTS
} from './helpers/M04_timeHelpers.js';

/**
 * Generate a question based on parameters and level
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'read_oclock':
            return generateReadOclock(params);
        case 'read_half_past':
            return generateReadHalfPast(params);
        case 'read_quarter_past':
            return generateReadQuarterPast(params);
        case 'read_quarter_to':
            return generateReadQuarterTo(params);
        case 'read_five_minutes':
            return generateReadFiveMinutes(params);
        case 'write_time':
            return generateWriteTime(params);
        case 'identify_time':
            return generateIdentifyTime(params);
        case 'time_facts':
            return generateTimeFacts(params);
        case 'interval_problems':
            return generateIntervalProblems(params);
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
        answer: `${hour}:00`,
        hint: 'The time can be written as hour:minutes (e.g., 3:00).',
        module: 'M04_Y2_MEAS',
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
        answer: `${hour}:30`,
        hint: 'Half past means 30 minutes past the hour.',
        module: 'M04_Y2_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate "read quarter past" question
 */
function generateReadQuarterPast(params) {
    const hour = randomChoice(params.hours);
    const minute = 15;
    const clockSVG = generateClockSVG(hour, minute);

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'text_input',
        answer: `${hour}:15`,
        hint: 'Quarter past means 15 minutes past the hour.',
        module: 'M04_Y2_MEAS',
        level: params.level || 1
    };
}

/**
 * Generate "read quarter to" question
 */
function generateReadQuarterTo(params) {
    const hour = randomChoice(params.hours);
    const minute = 45;
    const clockSVG = generateClockSVG(hour, minute);
    const nextHour = hour === 12 ? 1 : hour + 1;

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'multiple_choice',
        options: [`${hour}:45`, `quarter to ${nextHour}`, `${nextHour}:45`, `${hour}:15`],
        answer: `${hour}:45`,
        hint: 'Quarter to the next hour means 45 minutes past the current hour.',
        module: 'M04_Y2_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate "read five minutes" question
 */
function generateReadFiveMinutes(params) {
    const hour = randomChoice(params.hours);
    const minute = randomChoice(params.minutes);
    const clockSVG = generateClockSVG(hour, minute);

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'text_input',
        answer: format12Hour(hour, minute),
        hint: 'Count by 5s around the clock: 5, 10, 15, 20, 25, 30...',
        module: 'M04_Y2_MEAS',
        level: params.level || 3
    };
}

/**
 * Generate "write time" question
 */
function generateWriteTime(params) {
    const hour = randomChoice(params.hours);
    const minute = randomChoice(params.minutes);
    const clockSVG = generateClockSVG(hour, minute);

    const timeWords = getTimeInWords(hour, minute);

    return {
        text: `Write the time shown on this clock in the format hour:minutes.\n\n${clockSVG}`,
        type: 'text_input',
        answer: format12Hour(hour, minute),
        hint: 'Write the time using numbers and a colon, like 3:15.',
        module: 'M04_Y2_MEAS',
        level: params.level || 3
    };
}

/**
 * Generate "identify time" question
 */
function generateIdentifyTime(params) {
    const hour = randomChoice(params.hours);
    const minute = randomChoice(params.minutes);
    const targetTime = format12Hour(hour, minute);

    // Generate 3 distractor times
    const distractors = [];
    const usedTimes = new Set([targetTime]);

    while (distractors.length < 3) {
        const distHour = randomChoice(params.hours);
        const distMinute = randomChoice(params.minutes);
        const distTime = format12Hour(distHour, distMinute);

        if (!usedTimes.has(distTime)) {
            distractors.push(distTime);
            usedTimes.add(distTime);
        }
    }

    const options = shuffle([targetTime, ...distractors]);
    const clockSVG = generateClockSVG(hour, minute);

    return {
        text: `What time does this clock show?\n\n${clockSVG}`,
        type: 'multiple_choice',
        options: options,
        answer: targetTime,
        module: 'M04_Y2_MEAS',
        level: params.level || 2
    };
}

/**
 * Generate time facts questions
 */
function generateTimeFacts(params) {
    const factType = randomChoice(params.time_facts);

    if (factType === 'minutes_in_hour') {
        const questionType = randomInt(1, 3);

        if (questionType === 1) {
            return {
                text: 'How many minutes are there in 1 hour?',
                type: 'text_input',
                answer: '60',
                module: 'M04_Y2_MEAS',
                level: params.level || 2
            };
        } else if (questionType === 2) {
            const hours = randomInt(2, 5);
            return {
                text: `How many minutes are there in ${hours} hours?`,
                type: 'text_input',
                answer: String(hours * 60),
                hint: `There are 60 minutes in 1 hour.`,
                module: 'M04_Y2_MEAS',
                level: params.level || 4
            };
        } else {
            return {
                text: 'Half an hour is how many minutes?',
                type: 'multiple_choice',
                options: ['30', '15', '60', '45'],
                answer: '30',
                module: 'M04_Y2_MEAS',
                level: params.level || 3
            };
        }
    } else if (factType === 'hours_in_day') {
        const questionType = randomInt(1, 2);

        if (questionType === 1) {
            return {
                text: 'How many hours are there in 1 day?',
                type: 'text_input',
                answer: '24',
                module: 'M04_Y2_MEAS',
                level: params.level || 3
            };
        } else {
            return {
                text: 'How many hours are there in half a day?',
                type: 'multiple_choice',
                options: ['12', '6', '24', '18'],
                answer: '12',
                hint: 'Think about how many hours from midnight to noon.',
                module: 'M04_Y2_MEAS',
                level: params.level || 4
            };
        }
    } else if (factType === 'combined_facts') {
        return {
            text: 'A quarter of an hour is how many minutes?',
            type: 'multiple_choice',
            options: ['15', '30', '25', '20'],
            answer: '15',
            hint: 'A quarter is the same as one-fourth.',
            module: 'M04_Y2_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateTimeFacts({ ...params, time_facts: ['minutes_in_hour'] });
}

/**
 * Generate interval comparison/sequencing questions
 */
function generateIntervalProblems(params) {
    const operation = randomChoice(params.interval_operations);

    if (operation === 'compare_two_intervals') {
        const activities = [
            { name: 'reading a book', minutes: 30 },
            { name: 'eating breakfast', minutes: 15 },
            { name: 'watching a TV show', minutes: 25 },
            { name: 'walking to school', minutes: 20 },
            { name: 'playing outside', minutes: 45 },
            { name: 'having a bath', minutes: 10 }
        ];

        const [activity1, activity2] = shuffle(activities).slice(0, 2);
        const longer = activity1.minutes > activity2.minutes ? activity1 : activity2;

        return {
            text: `${activity1.name} takes ${activity1.minutes} minutes.\n${activity2.name} takes ${activity2.minutes} minutes.\n\nWhich activity takes longer?`,
            type: 'multiple_choice',
            options: [activity1.name, activity2.name],
            answer: longer.name,
            module: 'M04_Y2_MEAS',
            level: params.level || 2
        };
    } else if (operation === 'sequence_intervals') {
        const activities = [
            { name: 'tying shoelaces', minutes: 2 },
            { name: 'eating lunch', minutes: 20 },
            { name: 'watching a film', minutes: 90 }
        ];

        const [act1, act2, act3] = shuffle(activities);
        const sorted = [act1, act2, act3].sort((a, b) => a.minutes - b.minutes);

        return {
            text: `Put these activities in order from shortest to longest:\n\n` +
                  `• ${act1.name}: ${act1.minutes} minutes\n` +
                  `• ${act2.name}: ${act2.minutes} minutes\n` +
                  `• ${act3.name}: ${act3.minutes} minutes`,
            type: 'text_input',
            answer: sorted.map(a => a.name).join(', '),
            answers: sorted.map(a => a.name),
            module: 'M04_Y2_MEAS',
            level: params.level || 3
        };
    } else if (operation === 'order_three_intervals') {
        const durations = [10, 25, 45];
        const labels = ['short', 'medium', 'long'];
        const shuffledPairs = shuffle(durations.map((d, i) => ({ duration: d, label: labels[i] })));

        return {
            text: `Which takes the longest time?\n\n` +
                  `A. ${shuffledPairs[0].duration} minutes\n` +
                  `B. ${shuffledPairs[1].duration} minutes\n` +
                  `C. ${shuffledPairs[2].duration} minutes`,
            type: 'multiple_choice',
            options: shuffledPairs.map(p => `${p.duration} minutes`),
            answer: '45 minutes',
            module: 'M04_Y2_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateIntervalProblems({ ...params, interval_operations: ['compare_two_intervals'] });
}

export default {
    moduleId: 'M04_Y2_MEAS',
    generate: generateQuestion
};
