/**
 * M04: Time
 * Years 1-5
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M04_Y1_MEAS: {
        1: { operations: ["read_oclock", "identify_oclock"], math: { hours: [1, 2, 3, 6, 9, 12], halfPast: false }, presentation: { types: ["oclock"] } },
        2: { operations: ["read_oclock", "read_half_past"], math: { hours: [1, 2, 3, 4, 5, 6, 9, 12], halfPast: true }, presentation: { types: ["oclock", "half_past"] } },
        3: { operations: ["read_oclock", "read_half_past", "sequence_events"], math: { hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], halfPast: true }, presentation: { types: ["oclock", "half_past"], sequence: ["order_three_events", "before_after"] } },
        4: { operations: ["read_oclock", "read_half_past", "sequence_events", "before_after"], math: { hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], halfPast: true }, presentation: { types: ["oclock", "half_past"], sequence: ["order_three_events", "before_after", "order_four_events"] } }
    },
    M04_Y2_MEAS: {
        1: { operations: ["read_oclock", "read_half_past", "read_quarter_past"], math: { minutes: [0, 15, 30], hours: [1, 2, 3, 6, 9, 12], quarterTo: false }, presentation: { types: ["oclock", "half_past", "quarter_past"] } },
        2: { operations: ["read_oclock", "read_half_past", "read_quarter_past", "read_quarter_to"], math: { minutes: [0, 15, 30, 45], hours: [1, 2, 3, 4, 5, 6, 9, 12], quarterTo: true }, presentation: { types: ["oclock", "half_past", "quarter_past", "quarter_to"] } },
        3: { operations: ["read_five_minutes", "write_time", "identify_time"], math: { minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], hours: [1,2,3,4,5,6,7,8,9,10,11,12], quarterTo: true, facts: ["minutes_in_hour", "hours_in_day"] }, presentation: { types: ["five_minute_intervals"] } },
        4: { operations: ["read_five_minutes", "write_time", "identify_time", "time_facts"], math: { minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], hours: [1,2,3,4,5,6,7,8,9,10,11,12], quarterTo: true, facts: ["minutes_in_hour", "hours_in_day", "days_in_week"] }, presentation: { types: ["five_minute_intervals", "word_problems"] } }
    },
    M04_Y3_MEAS: {
        1: { operations: ["read_to_minute", "write_12hour"], math: { minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], roman: false }, presentation: { types: ["12_hour"] } },
        2: { operations: ["read_to_minute", "write_12hour", "am_pm_identification"], math: { minutes: [0, 1, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], roman: false, facts: ["seconds_in_minute"] }, presentation: { types: ["12_hour"] } },
        3: { operations: ["read_to_minute", "write_24hour", "am_pm_identification"], math: { minutes: [0,1,2,3,4,5,10,15,20,30,45,55], hours24: [0,1,2,12,13,14,15,20,23], roman: true, facts: ["seconds_in_minute", "days_in_week", "days_in_year"] }, presentation: { types: ["12_hour", "24_hour"] } },
        4: { operations: ["read_to_minute", "write_24hour", "am_pm_identification", "duration_simple"], math: { minutes: [0,1,2,3,4,5,10,15,20,30,45,55], hours24: [0,1,2,12,13,14,15,20,23], roman: true, facts: ["seconds_in_minute", "days_in_week", "days_in_year", "days_in_month"] }, presentation: { types: ["12_hour", "24_hour", "word_problems"] } }
    },
    M04_Y4_MEAS: {
        1: { operations: ["convert_12hour_formats", "convert_hours_to_minutes"], math: { ranges: { hours: [1,2,3,12], minutes: [0,15,30] }, conversions: { hours: { min: 1, max: 5 } }, include24: false } },
        2: { operations: ["convert_12hour_formats", "convert_hours_to_minutes", "convert_to_24hour"], math: { ranges: { hours: [1,2,3,4,5,6,12], hours24: [13,14,15], minutes: [0,15,30] }, conversions: { hours: { min: 1, max: 12 } }, include24: true } },
        3: { operations: ["convert_to_24hour", "convert_minutes_to_seconds", "convert_years_to_months"], math: { ranges: { hours: [1,2,3,12], hours24: [13,14,15,20], minutes: [0,15,30,45] }, conversions: { hours: { min: 1, max: 24 }, minutes: { min: 1, max: 120 }, years: { min: 1, max: 5 } }, include24: true } },
        4: { operations: ["convert_to_24hour", "convert_minutes_to_seconds", "convert_years_to_months", "convert_weeks_to_days"], math: { ranges: { hours: [1,2,3,12], hours24: [13,14,15,20,23], minutes: [0,15,30,45] }, conversions: { hours: { min: 1, max: 48 }, minutes: { min: 1, max: 240 }, years: { min: 1, max: 10 }, weeks: { min: 1, max: 52 } }, include24: true } }
    },
    M04_Y5_MEAS: {
        1: { operations: ["convert_simple_problems", "hours_minutes_problems"], math: { problemTypes: ["hours_to_minutes", "simple_duration"], ranges: { hours: { min: 1, max: 12 } } }, presentation: { multiStep: false } },
        2: { operations: ["convert_simple_problems", "hours_minutes_problems", "duration_problems"], math: { problemTypes: ["hours_to_minutes", "minutes_to_seconds", "simple_duration"], ranges: { hours: { min: 1, max: 24 }, minutes: { min: 60, max: 360 } } }, presentation: { multiStep: false } },
        3: { operations: ["convert_problems", "duration_problems", "mixed_unit_problems", "multi_step_problems"], math: { problemTypes: ["hours_to_minutes", "minutes_to_seconds", "duration_calculation", "multi_step"], ranges: { hours: { min: 1, max: 48 }, minutes: { min: 60, max: 720 } } }, presentation: { multiStep: true } },
        4: { operations: ["convert_problems", "duration_problems", "mixed_unit_problems", "multi_step_problems", "timetable_problems"], math: { problemTypes: ["hours_to_minutes", "minutes_to_seconds", "duration_calculation", "multi_step", "timetable_reading"], ranges: { hours: { min: 1, max: 72 }, minutes: { min: 60, max: 1440 } } }, presentation: { multiStep: true } }
    }
};

export const M04_MODULES = {
    'M04_Y1_MEAS': { id: 'M04_Y1_MEAS', name: 'M04_Y1: O\'clock/Half Past', ref: 'M4', yearGroup: '1', strand: 'Measurement', substrand: 'Time', parameters: MIGRATED_PARAMS['M04_Y1_MEAS'] },
    'M04_Y2_MEAS': { id: 'M04_Y2_MEAS', name: 'M04_Y2: 5 Minutes', ref: 'M4', yearGroup: '2', strand: 'Measurement', substrand: 'Time', parameters: MIGRATED_PARAMS['M04_Y2_MEAS'] },
    'M04_Y3_MEAS': { id: 'M04_Y3_MEAS', name: 'M04_Y3: Analogue/Vocab', ref: 'M4', yearGroup: '3', strand: 'Measurement', substrand: 'Time', parameters: MIGRATED_PARAMS['M04_Y3_MEAS'] },
    'M04_Y4_MEAS': { id: 'M04_Y4_MEAS', name: 'M04_Y4: Conversions', ref: 'M4', yearGroup: '4', strand: 'Measurement', substrand: 'Time', parameters: MIGRATED_PARAMS['M04_Y4_MEAS'] },
    'M04_Y5_MEAS': { id: 'M04_Y5_MEAS', name: 'M04_Y5: Problems', ref: 'M4', yearGroup: '5', strand: 'Measurement', substrand: 'Time', parameters: MIGRATED_PARAMS['M04_Y5_MEAS'] }
};
