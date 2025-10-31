/**
 * M04 Module Series: Telling Time, Ordering Time, Duration and Units of Time
 * Covers Years 1-5 progression for time concepts
 */

export const M04_MODULES = {
    'M04_Y1_MEAS': {
        id: 'M04_Y1_MEAS',
        name: 'M04_Y1_MEAS: Time - O\'clock and Half Past',
        description: 'Tell the time to the hour and half past the hour and draw the hands on a clock face to show these times; sequence events in chronological order using language (e.g. before, after, next); recognise and use language relating to dates, including days of the week, weeks, months and years',
        icon: '🕐',
        yearGroup: 'Year 1',
        strand: 'Measurement',
        substrand: 'telling time, ordering time, duration and units of time',
        ref: 'M4',
        parameters: {
            1: {
                operations: ['read_oclock', 'identify_oclock'],
                time_types: ['oclock'],
                hours: [1, 2, 3, 6, 9, 12],
                include_half_past: false,
                sequence_operations: [],
                date_operations: []
            },
            2: {
                operations: ['read_oclock', 'read_half_past', 'identify_time'],
                time_types: ['oclock', 'half_past'],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                include_half_past: true,
                sequence_operations: ['order_two_events'],
                date_operations: ['identify_day']
            },
            3: {
                operations: ['read_oclock', 'read_half_past', 'identify_time', 'sequence_events'],
                time_types: ['oclock', 'half_past'],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                include_half_past: true,
                sequence_operations: ['order_two_events', 'order_three_events', 'before_after'],
                date_operations: ['identify_day', 'order_days', 'identify_month']
            },
            4: {
                operations: ['read_oclock', 'read_half_past', 'identify_time', 'sequence_events', 'date_questions'],
                time_types: ['oclock', 'half_past'],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                include_half_past: true,
                sequence_operations: ['order_two_events', 'order_three_events', 'before_after', 'next_event'],
                date_operations: ['identify_day', 'order_days', 'identify_month', 'order_months', 'days_in_week', 'months_in_year']
            }
        }
    },

    'M04_Y2_MEAS': {
        id: 'M04_Y2_MEAS',
        name: 'M04_Y2_MEAS: Time to 5 Minutes',
        description: 'Tell and write the time to five minutes, including quarter past/to the hour and draw the hands on a clock face to show these times; compare and sequence intervals of time; know the number of minutes in an hour and the number of hours in a day',
        icon: '🕐',
        yearGroup: 'Year 2',
        strand: 'Measurement',
        substrand: 'telling time, ordering time, duration and units of time',
        ref: 'M4',
        parameters: {
            1: {
                operations: ['read_oclock', 'read_half_past', 'read_quarter_past'],
                time_types: ['oclock', 'half_past', 'quarter_past'],
                minutes: [0, 15, 30],
                hours: [1, 2, 3, 6, 9, 12],
                include_quarter_to: false,
                time_facts: [],
                interval_operations: []
            },
            2: {
                operations: ['read_oclock', 'read_half_past', 'read_quarter_past', 'read_quarter_to'],
                time_types: ['oclock', 'half_past', 'quarter_past', 'quarter_to'],
                minutes: [0, 15, 30, 45],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                include_quarter_to: true,
                time_facts: ['minutes_in_hour'],
                interval_operations: ['compare_two_intervals']
            },
            3: {
                operations: ['read_five_minutes', 'write_time', 'identify_time'],
                time_types: ['five_minute_intervals'],
                minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                include_quarter_to: true,
                time_facts: ['minutes_in_hour', 'hours_in_day'],
                interval_operations: ['compare_two_intervals', 'sequence_intervals']
            },
            4: {
                operations: ['read_five_minutes', 'write_time', 'identify_time', 'time_facts', 'interval_problems'],
                time_types: ['five_minute_intervals'],
                minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                include_quarter_to: true,
                time_facts: ['minutes_in_hour', 'hours_in_day', 'combined_facts'],
                interval_operations: ['compare_two_intervals', 'sequence_intervals', 'order_three_intervals']
            }
        }
    },

    'M04_Y3_MEAS': {
        id: 'M04_Y3_MEAS',
        name: 'M04_Y3_MEAS: Analogue Clocks and Time Vocabulary',
        description: 'Tell and write the time from an analogue clock (12-hour and 24-hour); estimate and read time with increasing accuracy to the nearest minute; record and compare time in terms of seconds, minutes and hours; use vocabulary such as o\'clock / a.m. / p.m., morning, afternoon, noon and midnight; know the number of seconds in a minute and the number of days in each month, year and leap year; compare durations of events',
        icon: '🕐',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'telling time, ordering time, duration and units of time',
        ref: 'M4',
        parameters: {
            1: {
                operations: ['read_to_minute', 'write_12hour'],
                time_types: ['12_hour'],
                minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                use_roman_numerals: false,
                time_vocabulary: [],
                calendar_facts: [],
                duration_operations: []
            },
            2: {
                operations: ['read_to_minute', 'write_12hour', 'am_pm_identification'],
                time_types: ['12_hour', '12_hour_with_am_pm'],
                minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                use_roman_numerals: false,
                time_vocabulary: ['am', 'pm', 'morning', 'afternoon'],
                calendar_facts: ['seconds_in_minute', 'days_in_week'],
                duration_operations: ['compare_simple_durations']
            },
            3: {
                operations: ['read_to_minute', 'write_12hour', 'write_24hour', 'am_pm_identification', 'time_vocabulary'],
                time_types: ['12_hour', '12_hour_with_am_pm', '24_hour'],
                minutes: [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58, 59],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                hours_24: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                use_roman_numerals: true,
                time_vocabulary: ['am', 'pm', 'morning', 'afternoon', 'noon', 'midnight'],
                calendar_facts: ['seconds_in_minute', 'days_in_week', 'days_in_months', 'days_in_year'],
                duration_operations: ['compare_simple_durations', 'compare_durations']
            },
            4: {
                operations: ['read_to_minute', 'write_12hour', 'write_24hour', 'am_pm_identification', 'time_vocabulary', 'calendar_facts', 'duration_problems'],
                time_types: ['12_hour', '12_hour_with_am_pm', '24_hour'],
                minutes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 35, 40, 45, 50, 55, 56, 57, 58, 59],
                hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                hours_24: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                use_roman_numerals: true,
                time_vocabulary: ['am', 'pm', 'morning', 'afternoon', 'noon', 'midnight', 'oclock'],
                calendar_facts: ['seconds_in_minute', 'days_in_week', 'days_in_months', 'days_in_year', 'leap_year'],
                duration_operations: ['compare_simple_durations', 'compare_durations', 'calculate_duration']
            }
        }
    },

    'M04_Y4_MEAS': {
        id: 'M04_Y4_MEAS',
        name: 'M04_Y4_MEAS: Time Conversions',
        description: 'Read, write and convert time between analogue and digital 12-hour clocks; read, write and convert time between analogue and digital 24-hour clocks; solve problems involving converting from hours to minutes; minutes to seconds; years to months; weeks to days',
        icon: '🕐',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'telling time, ordering time, duration and units of time',
        ref: 'M4',
        parameters: {
            1: {
                operations: ['convert_12hour_formats', 'convert_hours_to_minutes'],
                conversion_types: ['12hour_analogue_digital', 'hours_to_minutes'],
                time_ranges: {
                    hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    minutes: [0, 15, 30, 45]
                },
                conversion_ranges: {
                    hours: { min: 1, max: 5 },
                    minutes: { min: 1, max: 5 }
                },
                include_24hour: false
            },
            2: {
                operations: ['convert_12hour_formats', 'convert_to_24hour', 'convert_hours_to_minutes', 'convert_minutes_to_seconds'],
                conversion_types: ['12hour_analogue_digital', '12hour_to_24hour', 'hours_to_minutes', 'minutes_to_seconds'],
                time_ranges: {
                    hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    hours_24: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
                },
                conversion_ranges: {
                    hours: { min: 1, max: 10 },
                    minutes: { min: 1, max: 10 }
                },
                include_24hour: true
            },
            3: {
                operations: ['convert_12hour_formats', 'convert_to_24hour', 'convert_hours_to_minutes', 'convert_minutes_to_seconds', 'convert_years_to_months', 'convert_weeks_to_days'],
                conversion_types: ['12hour_analogue_digital', '12hour_to_24hour', '24hour_to_12hour', 'hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'years_to_months', 'weeks_to_days'],
                time_ranges: {
                    hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    hours_24: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    minutes: [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
                },
                conversion_ranges: {
                    hours: { min: 1, max: 24 },
                    minutes: { min: 1, max: 120 },
                    seconds: { min: 60, max: 300 },
                    years: { min: 1, max: 5 },
                    weeks: { min: 1, max: 10 }
                },
                include_24hour: true
            },
            4: {
                operations: ['convert_12hour_formats', 'convert_to_24hour', 'convert_hours_to_minutes', 'convert_minutes_to_seconds', 'convert_years_to_months', 'convert_weeks_to_days', 'multi_step_conversions'],
                conversion_types: ['12hour_analogue_digital', '12hour_to_24hour', '24hour_to_12hour', 'hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'years_to_months', 'months_to_years', 'weeks_to_days', 'days_to_weeks'],
                time_ranges: {
                    hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    hours_24: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    minutes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59]
                },
                conversion_ranges: {
                    hours: { min: 1, max: 48 },
                    minutes: { min: 1, max: 240 },
                    seconds: { min: 60, max: 600 },
                    years: { min: 1, max: 10 },
                    weeks: { min: 1, max: 20 }
                },
                include_24hour: true,
                include_word_problems: true
            }
        }
    },

    'M04_Y5_MEAS': {
        id: 'M04_Y5_MEAS',
        name: 'M04_Y5_MEAS: Time Conversion Problems',
        description: 'Solve problems involving converting between units of time',
        icon: '🕐',
        yearGroup: 'Year 5',
        strand: 'Measurement',
        substrand: 'telling time, ordering time, duration and units of time',
        ref: 'M4',
        parameters: {
            1: {
                operations: ['convert_simple_problems', 'hours_minutes_problems'],
                problem_types: ['hours_to_minutes', 'minutes_to_hours', 'simple_duration'],
                conversion_ranges: {
                    hours: { min: 1, max: 12 },
                    minutes: { min: 60, max: 300 }
                },
                include_multi_step: false,
                context_types: ['simple']
            },
            2: {
                operations: ['convert_problems', 'duration_problems', 'mixed_unit_problems'],
                problem_types: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'duration_calculation', 'mixed_units'],
                conversion_ranges: {
                    hours: { min: 1, max: 24 },
                    minutes: { min: 60, max: 480 },
                    seconds: { min: 60, max: 600 },
                    days: { min: 1, max: 14 }
                },
                include_multi_step: false,
                context_types: ['simple', 'real_world']
            },
            3: {
                operations: ['convert_problems', 'duration_problems', 'mixed_unit_problems', 'multi_step_problems'],
                problem_types: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'years_to_months', 'months_to_years', 'weeks_to_days', 'days_to_weeks', 'duration_calculation', 'mixed_units', 'multi_step'],
                conversion_ranges: {
                    hours: { min: 1, max: 48 },
                    minutes: { min: 60, max: 720 },
                    seconds: { min: 60, max: 1200 },
                    days: { min: 1, max: 30 },
                    weeks: { min: 1, max: 20 },
                    months: { min: 1, max: 24 },
                    years: { min: 1, max: 10 }
                },
                include_multi_step: true,
                context_types: ['simple', 'real_world', 'complex']
            },
            4: {
                operations: ['convert_problems', 'duration_problems', 'mixed_unit_problems', 'multi_step_problems', 'complex_scenarios'],
                problem_types: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'years_to_months', 'months_to_years', 'weeks_to_days', 'days_to_weeks', 'duration_calculation', 'mixed_units', 'multi_step', 'combined_operations'],
                conversion_ranges: {
                    hours: { min: 1, max: 72 },
                    minutes: { min: 60, max: 1440 },
                    seconds: { min: 60, max: 3600 },
                    days: { min: 1, max: 60 },
                    weeks: { min: 1, max: 52 },
                    months: { min: 1, max: 36 },
                    years: { min: 1, max: 20 }
                },
                include_multi_step: true,
                include_decimals: false,
                context_types: ['simple', 'real_world', 'complex', 'multi_stage']
            }
        }
    }
};
