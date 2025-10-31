/**
 * M06_Y4_MEAS: Convert Between Different Units of Measurement
 * Year 4 - metric conversions AND time conversions
 */

export const M06_Y4_MEAS_PARAMS = {
    'M06_Y4_MEAS': {
        id: 'M06_Y4_MEAS',
        name: 'M06_Y4_MEAS: Convert Between Different Units',
        description: 'Convert between different units of measurement [e.g. kilometre to metre; hour to minute]',
        icon: '↔️',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'convert between different units of measurement',
        ref: 'M6',
        parameters: {
            1: {
                operations: ['direct_metric_conversion', 'time_conversion'],
                measure_types: ['length', 'time'],
                conversions: {
                    length: ['km_to_m', 'm_to_cm'],
                    mass: ['kg_to_g'],
                    capacity: ['l_to_ml'],
                    time: ['hours_to_minutes', 'days_to_hours']
                },
                value_types: ['whole_only'],
                ranges: {
                    km: { min: 1, max: 10 },
                    m: { min: 1, max: 100 },
                    kg: { min: 1, max: 10 },
                    l: { min: 1, max: 10 },
                    hours: { min: 1, max: 12 },
                    days: { min: 1, max: 7 }
                },
                include_word_problems: false
            },
            2: {
                operations: ['direct_metric_conversion', 'reverse_metric_conversion', 'time_conversion'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l'],
                    time: ['hours_to_minutes', 'minutes_to_hours', 'days_to_hours', 'weeks_to_days']
                },
                value_types: ['whole'],
                ranges: {
                    km: { min: 1, max: 50 },
                    m: { min: 100, max: 5000 },
                    cm: { min: 100, max: 500 },
                    kg: { min: 1, max: 50 },
                    g: { min: 100, max: 5000 },
                    l: { min: 1, max: 50 },
                    ml: { min: 100, max: 5000 },
                    hours: { min: 1, max: 24 },
                    minutes: { min: 60, max: 300 },
                    days: { min: 1, max: 14 },
                    weeks: { min: 1, max: 4 }
                },
                include_word_problems: false
            },
            3: {
                operations: ['direct_metric_conversion', 'reverse_metric_conversion', 'time_conversion', 'word_problem'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m', 'cm_to_mm', 'mm_to_cm'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l'],
                    time: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'days_to_hours', 'weeks_to_days']
                },
                value_types: ['whole'],
                ranges: {
                    km: { min: 1, max: 100 },
                    m: { min: 100, max: 10000 },
                    cm: { min: 10, max: 1000 },
                    mm: { min: 10, max: 500 },
                    kg: { min: 1, max: 100 },
                    g: { min: 100, max: 10000 },
                    l: { min: 1, max: 100 },
                    ml: { min: 100, max: 10000 },
                    hours: { min: 1, max: 48 },
                    minutes: { min: 60, max: 600 },
                    seconds: { min: 60, max: 300 },
                    days: { min: 1, max: 30 },
                    weeks: { min: 1, max: 10 }
                },
                include_word_problems: true
            },
            4: {
                operations: ['direct_metric_conversion', 'reverse_metric_conversion', 'time_conversion', 'word_problem'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m', 'cm_to_mm', 'mm_to_cm'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l'],
                    time: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'days_to_hours', 'hours_to_days', 'weeks_to_days', 'days_to_weeks']
                },
                value_types: ['whole'],
                ranges: {
                    km: { min: 1, max: 100 },
                    m: { min: 100, max: 10000 },
                    cm: { min: 10, max: 5000 },
                    mm: { min: 10, max: 10000 },
                    kg: { min: 1, max: 100 },
                    g: { min: 100, max: 10000 },
                    l: { min: 1, max: 100 },
                    ml: { min: 100, max: 10000 },
                    hours: { min: 1, max: 72 },
                    minutes: { min: 60, max: 1000 },
                    seconds: { min: 60, max: 600 },
                    days: { min: 1, max: 60 },
                    weeks: { min: 1, max: 20 }
                },
                include_word_problems: true,
                include_complex_scenarios: true
            }
        }
    }
};
