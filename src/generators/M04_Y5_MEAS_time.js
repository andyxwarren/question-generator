/**
 * M04_Y5_MEAS: Time Conversion Problems
 * Year 5: Solve problems involving converting between units of time
 *
 * Operations:
 * 1. convert_simple_problems - Simple single-step conversion word problems
 * 2. convert_problems - Standard conversion word problems
 * 3. duration_problems - Calculate durations and elapsed time
 * 4. mixed_unit_problems - Problems with mixed units (hours and minutes)
 * 5. multi_step_problems - Multi-step conversion and calculation problems
 * 6. complex_scenarios - Real-world scenarios with multiple conversions
 */

import {
    randomChoice,
    randomInt,
    shuffle,
    hoursToMinutes,
    minutesToHours,
    minutesToSeconds,
    secondsToMinutes,
    yearsToMonths,
    monthsToYears,
    weeksToDays,
    daysToWeeks,
    TIME_FACTS,
    PROBLEM_CONTEXTS
} from './helpers/M04_timeHelpers.js';

/**
 * Generate a question based on parameters and level
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch (operation) {
        case 'convert_simple_problems':
        case 'hours_minutes_problems':
            return generateSimpleConversionProblem(params);
        case 'convert_problems':
            return generateConversionProblem(params);
        case 'duration_problems':
            return generateDurationProblem(params);
        case 'mixed_unit_problems':
            return generateMixedUnitProblem(params);
        case 'multi_step_problems':
            return generateMultiStepProblem(params);
        case 'complex_scenarios':
            return generateComplexScenario(params);
        default:
            return generateSimpleConversionProblem(params);
    }
}

/**
 * Generate simple conversion problem
 */
function generateSimpleConversionProblem(params) {
    const problemType = randomChoice(params.problem_types.filter(pt =>
        ['hours_to_minutes', 'minutes_to_hours', 'simple_duration'].includes(pt)
    ));

    if (problemType === 'hours_to_minutes') {
        const hours = randomInt(params.conversion_ranges.hours.min, params.conversion_ranges.hours.max);
        const minutes = hoursToMinutes(hours);

        const contexts = [
            `A film lasts ${hours} ${hours === 1 ? 'hour' : 'hours'}.`,
            `A journey takes ${hours} ${hours === 1 ? 'hour' : 'hours'}.`,
            `A lesson is ${hours} ${hours === 1 ? 'hour' : 'hours'} long.`
        ];

        return {
            text: `${randomChoice(contexts)} How many minutes is this?`,
            type: 'text_input',
            answer: String(minutes),
            hint: 'There are 60 minutes in 1 hour.',
            module: 'M04_Y5_MEAS',
            level: params.level || 1
        };
    } else if (problemType === 'minutes_to_hours') {
        const hours = randomInt(params.conversion_ranges.hours.min, Math.min(params.conversion_ranges.hours.max, 10));
        const minutes = hoursToMinutes(hours);

        return {
            text: `A game lasts ${minutes} minutes. How many hours is this?`,
            type: 'text_input',
            answer: String(hours),
            hint: 'Divide the minutes by 60 to get hours.',
            module: 'M04_Y5_MEAS',
            level: params.level || 1
        };
    } else if (problemType === 'simple_duration') {
        const startHour = randomInt(9, 14);
        const durationHours = randomInt(2, 4);
        const endHour = startHour + durationHours;

        return {
            text: `Tom starts reading at ${startHour}:00 and finishes at ${endHour}:00. How many hours did he read for?`,
            type: 'text_input',
            answer: String(durationHours),
            module: 'M04_Y5_MEAS',
            level: params.level || 1
        };
    }

    // Default fallback
    return generateSimpleConversionProblem({ ...params, problem_types: ['hours_to_minutes'] });
}

/**
 * Generate standard conversion problem
 */
function generateConversionProblem(params) {
    const problemType = randomChoice(params.problem_types);

    if (problemType === 'hours_to_minutes') {
        const hours = randomInt(params.conversion_ranges.hours.min, params.conversion_ranges.hours.max);
        const minutes = hoursToMinutes(hours);

        const contexts = [
            { context: 'film', verb: 'lasts' },
            { context: 'concert', verb: 'lasts' },
            { context: 'journey', verb: 'takes' },
            { context: 'football match', verb: 'lasts' }
        ];

        const { context, verb } = randomChoice(contexts);

        return {
            text: `A ${context} ${verb} ${hours} ${hours === 1 ? 'hour' : 'hours'}. How many minutes is this?`,
            type: 'text_input',
            answer: String(minutes),
            hint: 'Multiply the hours by 60 to convert to minutes.',
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    } else if (problemType === 'minutes_to_hours') {
        const hours = randomInt(2, Math.min(params.conversion_ranges.hours.max, 12));
        const minutes = hoursToMinutes(hours);

        return {
            text: `Sarah spent ${minutes} minutes practicing the piano. How many hours did she practice?`,
            type: 'text_input',
            answer: String(hours),
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    } else if (problemType === 'minutes_to_seconds') {
        const minutes = randomInt(params.conversion_ranges.minutes?.min || 1, Math.min(params.conversion_ranges.minutes?.max || 10, 10));
        const seconds = minutesToSeconds(minutes);

        return {
            text: `A song lasts ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}. How many seconds is this?`,
            type: 'text_input',
            answer: String(seconds),
            hint: 'There are 60 seconds in 1 minute.',
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    } else if (problemType === 'seconds_to_minutes') {
        const minutes = randomInt(2, Math.min(params.conversion_ranges.minutes?.max || 10, 10));
        const seconds = minutesToSeconds(minutes);

        return {
            text: `A video is ${seconds} seconds long. How many minutes is this?`,
            type: 'text_input',
            answer: String(minutes),
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    } else if (problemType === 'years_to_months') {
        const years = randomInt(params.conversion_ranges.years?.min || 1, params.conversion_ranges.years?.max || 5);
        const months = yearsToMonths(years);

        return {
            text: `Tom has lived in his house for ${years} ${years === 1 ? 'year' : 'years'}. How many months is this?`,
            type: 'text_input',
            answer: String(months),
            hint: 'There are 12 months in 1 year.',
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    } else if (problemType === 'months_to_years') {
        const years = randomInt(params.conversion_ranges.years?.min || 1, Math.min(params.conversion_ranges.years?.max || 10, 10));
        const months = yearsToMonths(years);

        return {
            text: `A project took ${months} months to complete. How many years is this?`,
            type: 'text_input',
            answer: String(years),
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    } else if (problemType === 'weeks_to_days') {
        const weeks = randomInt(params.conversion_ranges.weeks?.min || 1, params.conversion_ranges.weeks?.max || 10);
        const days = weeksToDays(weeks);

        return {
            text: `The school term is ${weeks} ${weeks === 1 ? 'week' : 'weeks'} long. How many days is this?`,
            type: 'text_input',
            answer: String(days),
            hint: 'There are 7 days in 1 week.',
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    } else if (problemType === 'days_to_weeks') {
        const weeks = randomInt(params.conversion_ranges.weeks?.min || 1, Math.min(params.conversion_ranges.weeks?.max || 10, 10));
        const days = weeksToDays(weeks);

        return {
            text: `A holiday lasts ${days} days. How many weeks is this?`,
            type: 'text_input',
            answer: String(weeks),
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    }

    // Default fallback
    return generateConversionProblem({ ...params, problem_types: ['hours_to_minutes'] });
}

/**
 * Generate duration calculation problem
 */
function generateDurationProblem(params) {
    const problemType = randomChoice(['duration_calculation', 'elapsed_time', 'time_comparison']);

    if (problemType === 'duration_calculation') {
        const startHour = randomInt(8, 13);
        const startMinute = randomChoice([0, 15, 30, 45]);
        const durationHours = randomInt(1, 4);
        const durationMinutes = randomChoice([0, 15, 30, 45]);

        const endHour = startHour + durationHours + Math.floor((startMinute + durationMinutes) / 60);
        const endMinute = (startMinute + durationMinutes) % 60;

        const totalMinutes = durationHours * 60 + durationMinutes;

        return {
            text: `A lesson starts at ${startHour}:${String(startMinute).padStart(2, '0')} and ends at ${endHour}:${String(endMinute).padStart(2, '0')}. How many minutes does the lesson last?`,
            type: 'text_input',
            answer: String(totalMinutes),
            hint: 'Calculate the difference between the start and end times.',
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    } else if (problemType === 'elapsed_time') {
        const startHour = randomInt(9, 12);
        const durationMinutes = randomChoice([90, 120, 150, 180]);
        const durationHours = Math.floor(durationMinutes / 60);
        const remainingMinutes = durationMinutes % 60;

        const endHour = startHour + durationHours;
        const endMinute = remainingMinutes;

        return {
            text: `Tom starts his homework at ${startHour}:00. He works for ${durationMinutes} minutes. What time does he finish?`,
            type: 'text_input',
            answer: `${endHour}:${String(endMinute).padStart(2, '0')}`,
            hint: 'Convert the minutes to hours and minutes, then add to the start time.',
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    } else if (problemType === 'time_comparison') {
        const duration1 = randomInt(90, 240);
        const duration2 = randomInt(90, 240);

        if (duration1 === duration2) {
            return generateDurationProblem(params);
        }

        const longer = duration1 > duration2 ? duration1 : duration2;

        return {
            text: `Activity A takes ${duration1} minutes. Activity B takes ${duration2} minutes. Which activity takes longer?`,
            type: 'multiple_choice',
            options: ['Activity A', 'Activity B'],
            answer: longer === duration1 ? 'Activity A' : 'Activity B',
            module: 'M04_Y5_MEAS',
            level: params.level || 2
        };
    }

    // Default fallback
    return generateDurationProblem({ ...params });
}

/**
 * Generate mixed unit problem
 */
function generateMixedUnitProblem(params) {
    const problemType = randomChoice(['convert_mixed_units', 'add_mixed_units', 'compare_mixed_units']);

    if (problemType === 'convert_mixed_units') {
        const hours = randomInt(2, 5);
        const minutes = randomChoice([15, 30, 45]);
        const totalMinutes = hours * 60 + minutes;

        return {
            text: `How many minutes are there in ${hours} hours and ${minutes} minutes?`,
            type: 'text_input',
            answer: String(totalMinutes),
            hint: 'Convert the hours to minutes first, then add the extra minutes.',
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    } else if (problemType === 'add_mixed_units') {
        const hours1 = randomInt(1, 3);
        const minutes1 = randomChoice([0, 15, 30, 45]);
        const hours2 = randomInt(1, 3);
        const minutes2 = randomChoice([0, 15, 30, 45]);

        const totalMinutes = (hours1 * 60 + minutes1) + (hours2 * 60 + minutes2);
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        return {
            text: `Tom studied for ${hours1} hours and ${minutes1} minutes in the morning, and ${hours2} hours and ${minutes2} minutes in the afternoon. How long did he study in total?`,
            type: 'text_input',
            answer: remainingMinutes > 0 ? `${totalHours} hours and ${remainingMinutes} minutes` : `${totalHours} hours`,
            hint: 'Add the hours together and the minutes together separately.',
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    } else if (problemType === 'compare_mixed_units') {
        const hours1 = randomInt(2, 4);
        const minutes1 = randomChoice([15, 30]);
        const hours2 = randomInt(2, 4);
        const minutes2 = randomChoice([15, 45]);

        const total1 = hours1 * 60 + minutes1;
        const total2 = hours2 * 60 + minutes2;

        if (total1 === total2) {
            return generateMixedUnitProblem(params);
        }

        const longer = total1 > total2 ? `${hours1} hours and ${minutes1} minutes` : `${hours2} hours and ${minutes2} minutes`;

        return {
            text: `Which is longer: ${hours1} hours and ${minutes1} minutes, or ${hours2} hours and ${minutes2} minutes?`,
            type: 'multiple_choice',
            options: [`${hours1} hours and ${minutes1} minutes`, `${hours2} hours and ${minutes2} minutes`],
            answer: longer,
            hint: 'Convert both to minutes to compare.',
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    }

    // Default fallback
    return generateMixedUnitProblem({ ...params });
}

/**
 * Generate multi-step problem
 */
function generateMultiStepProblem(params) {
    const scenarios = [
        'sequential_activities',
        'time_with_breaks',
        'combined_conversions',
        'proportional_time'
    ];

    const scenario = randomChoice(scenarios);

    if (scenario === 'sequential_activities') {
        const activity1Minutes = randomChoice([45, 60, 90]);
        const activity2Minutes = randomChoice([30, 45, 60]);
        const totalMinutes = activity1Minutes + activity2Minutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return {
            text: `Tom spent ${activity1Minutes} minutes on homework and ${activity2Minutes} minutes reading. How many hours and minutes did he spend in total?`,
            type: 'text_input',
            answer: minutes > 0 ? `${hours} hours and ${minutes} minutes` : `${hours} hours`,
            hint: 'Add the minutes together first, then convert to hours and minutes.',
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    } else if (scenario === 'time_with_breaks') {
        const workMinutes = randomChoice([120, 150, 180]);
        const breakMinutes = randomChoice([15, 20, 30]);
        const totalMinutes = workMinutes + breakMinutes;

        return {
            text: `Sarah worked for ${workMinutes} minutes and took a ${breakMinutes}-minute break. How many hours was she busy in total?`,
            type: 'text_input',
            answer: String(totalMinutes / 60),
            hint: 'Add the work time and break time, then convert to hours.',
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    } else if (scenario === 'combined_conversions') {
        const weeks = randomInt(2, 4);
        const extraDays = randomInt(1, 6);
        const totalDays = weeks * 7 + extraDays;

        return {
            text: `A project takes ${weeks} weeks and ${extraDays} days to complete. How many days is this in total?`,
            type: 'text_input',
            answer: String(totalDays),
            hint: 'Convert the weeks to days first, then add the extra days.',
            module: 'M04_Y5_MEAS',
            level: params.level || 3
        };
    } else if (scenario === 'proportional_time') {
        const totalHours = randomChoice([3, 4, 5, 6]);
        const fraction = randomChoice([2, 3, 4]);
        const partMinutes = (totalHours * 60) / fraction;

        const fractionText = fraction === 2 ? 'half' : fraction === 3 ? 'a third' : 'a quarter';

        return {
            text: `A concert lasts ${totalHours} hours. The interval happens ${fractionText} of the way through. How many minutes into the concert does the interval happen?`,
            type: 'text_input',
            answer: String(partMinutes),
            hint: 'Convert the total time to minutes, then divide to find the fraction.',
            module: 'M04_Y5_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateMultiStepProblem({ ...params });
}

/**
 * Generate complex scenario
 */
function generateComplexScenario(params) {
    const scenarios = [
        'journey_with_transfers',
        'schedule_planning',
        'time_comparison_multi',
        'duration_with_operations'
    ];

    const scenario = randomChoice(scenarios);

    if (scenario === 'journey_with_transfers') {
        const train1Hours = randomInt(1, 2);
        const train1Minutes = randomChoice([15, 30, 45]);
        const waitMinutes = randomChoice([15, 20, 30]);
        const train2Hours = randomInt(1, 2);
        const train2Minutes = randomChoice([0, 15, 30]);

        const totalMinutes = (train1Hours * 60 + train1Minutes) + waitMinutes + (train2Hours * 60 + train2Minutes);
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        return {
            text: `Tom's journey has three parts:\n` +
                  `- First train: ${train1Hours} hours and ${train1Minutes} minutes\n` +
                  `- Wait at station: ${waitMinutes} minutes\n` +
                  `- Second train: ${train2Hours} hours and ${train2Minutes} minutes\n\n` +
                  `How long is his total journey?`,
            type: 'text_input',
            answer: remainingMinutes > 0 ? `${totalHours} hours and ${remainingMinutes} minutes` : `${totalHours} hours`,
            hint: 'Add all three parts together, converting to minutes if needed.',
            module: 'M04_Y5_MEAS',
            level: params.level || 4
        };
    } else if (scenario === 'schedule_planning') {
        const startHour = randomInt(9, 11);
        const activity1Minutes = randomChoice([45, 60, 90]);
        const breakMinutes = 15;
        const activity2Minutes = randomChoice([30, 45, 60]);

        const totalMinutes = activity1Minutes + breakMinutes + activity2Minutes;
        const endHour = startHour + Math.floor(totalMinutes / 60);
        const endMinute = totalMinutes % 60;

        return {
            text: `A school day starts at ${startHour}:00 with a ${activity1Minutes}-minute lesson, followed by a ${breakMinutes}-minute break, then a ${activity2Minutes}-minute lesson. What time does the second lesson end?`,
            type: 'text_input',
            answer: `${endHour}:${String(endMinute).padStart(2, '0')}`,
            hint: 'Add all the durations together, then add to the start time.',
            module: 'M04_Y5_MEAS',
            level: params.level || 4
        };
    } else if (scenario === 'time_comparison_multi') {
        const duration1Hours = randomInt(2, 3);
        const duration1Minutes = randomChoice([0, 30]);
        const duration2Minutes = randomChoice([120, 150, 180]);

        const total1 = duration1Hours * 60 + duration1Minutes;
        const difference = Math.abs(total1 - duration2Minutes);

        return {
            text: `Film A lasts ${duration1Hours} hours and ${duration1Minutes} minutes. Film B lasts ${duration2Minutes} minutes. How many minutes longer is the longer film?`,
            type: 'text_input',
            answer: String(difference),
            hint: 'Convert both to minutes, then find the difference.',
            module: 'M04_Y5_MEAS',
            level: params.level || 4
        };
    } else if (scenario === 'duration_with_operations') {
        const hoursPerDay = randomInt(2, 4);
        const days = randomInt(5, 7);
        const totalHours = hoursPerDay * days;
        const totalMinutes = totalHours * 60;

        return {
            text: `Sarah practices piano for ${hoursPerDay} hours each day. She practices for ${days} days. How many minutes does she practice in total?`,
            type: 'text_input',
            answer: String(totalMinutes),
            hint: 'First multiply to find total hours, then convert to minutes.',
            module: 'M04_Y5_MEAS',
            level: params.level || 4
        };
    }

    // Default fallback
    return generateComplexScenario({ ...params });
}

export default {
    moduleId: 'M04_Y5_MEAS',
    generate: generateQuestion
};
