/**
 * M06_Y6_MEAS: Convert Between Standard Units with Decimal Notation
 * Year 6 - advanced conversions with decimal notation up to 3 decimal places
 */

export const M06_Y6_MEAS_PARAMS = {
    'M06_Y6_MEAS': {
        id: 'M06_Y6_MEAS',
        name: 'M06_Y6_MEAS: Convert Between Standard Units',
        description: 'Use, read, write and convert between standard units, converting measurements of length, mass, volume and time from a smaller unit of measure to a larger unit, and vice versa, using decimal notation of up to three decimal places; convert between miles and kilometres',
        icon: '↔️',
        yearGroup: 'Year 6',
        strand: 'Measurement',
        substrand: 'convert between standard units',
        ref: 'M6',
        parameters: {
            1: {
                operations: ['metric_conversion_larger_to_smaller', 'metric_conversion_smaller_to_larger'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l']
                },
                value_types: ['whole', 'decimal_1dp'], // 1 decimal place
                ranges: {
                    km: { min: 0.5, max: 20 },
                    m: { min: 1, max: 5000 },
                    cm: { min: 10, max: 1000 },
                    kg: { min: 0.5, max: 20 },
                    g: { min: 1, max: 5000 },
                    l: { min: 0.5, max: 20 },
                    ml: { min: 1, max: 5000 }
                },
                decimal_max_places: 3,
                include_word_problems: false,
                include_time: false
            },
            2: {
                operations: ['metric_conversion_larger_to_smaller', 'metric_conversion_smaller_to_larger', 'imperial_metric_conversion'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m', 'cm_to_mm', 'mm_to_cm', 'miles_to_km', 'km_to_miles'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l'],
                    time: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes']
                },
                // Approximate imperial factors (as per curriculum guidance)
                approximate_factors: {
                    miles_to_km: 1.6
                },
                value_types: ['whole', 'decimal_1dp', 'decimal_2dp'], // Up to 2 decimal places
                ranges: {
                    km: { min: 0.1, max: 100 },
                    m: { min: 1, max: 10000 },
                    cm: { min: 10, max: 5000 },
                    mm: { min: 10, max: 1000 },
                    kg: { min: 0.1, max: 100 },
                    g: { min: 1, max: 10000 },
                    l: { min: 0.1, max: 100 },
                    ml: { min: 1, max: 10000 },
                    miles: { min: 1, max: 100 },
                    hours: { min: 0.5, max: 24 },
                    minutes: { min: 1, max: 600 },
                    seconds: { min: 60, max: 600 }
                },
                decimal_max_places: 3,
                include_word_problems: false,
                include_time: true
            },
            3: {
                operations: ['metric_conversion_larger_to_smaller', 'metric_conversion_smaller_to_larger', 'imperial_metric_conversion', 'word_problem'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m', 'cm_to_mm', 'mm_to_cm', 'miles_to_km', 'km_to_miles'],
                    mass: ['kg_to_g', 'g_to_kg', 'kg_to_mg', 'mg_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l'],
                    time: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'days_to_hours', 'hours_to_days']
                },
                approximate_factors: {
                    miles_to_km: 1.6
                },
                value_types: ['whole', 'decimal_1dp', 'decimal_2dp', 'decimal_3dp'], // Up to 3 decimal places
                ranges: {
                    km: { min: 0.1, max: 200 },
                    m: { min: 0.1, max: 10000 },
                    cm: { min: 0.1, max: 5000 },
                    mm: { min: 1, max: 5000 },
                    kg: { min: 0.1, max: 100 },
                    g: { min: 1, max: 20000 },
                    mg: { min: 100, max: 10000 },
                    l: { min: 0.1, max: 100 },
                    ml: { min: 1, max: 20000 },
                    miles: { min: 0.5, max: 200 },
                    hours: { min: 0.25, max: 48 },
                    minutes: { min: 1, max: 1000 },
                    seconds: { min: 60, max: 1000 },
                    days: { min: 1, max: 30 }
                },
                decimal_max_places: 3,
                include_word_problems: true,
                include_time: true
            },
            4: {
                operations: ['metric_conversion_larger_to_smaller', 'metric_conversion_smaller_to_larger', 'imperial_metric_conversion', 'word_problem', 'multi_step'],
                measure_types: ['length', 'mass', 'capacity', 'time'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m', 'cm_to_mm', 'mm_to_cm', 'km_to_cm', 'km_to_mm', 'miles_to_km', 'km_to_miles'],
                    mass: ['kg_to_g', 'g_to_kg', 'kg_to_mg', 'mg_to_kg', 'g_to_mg', 'mg_to_g'],
                    capacity: ['l_to_ml', 'ml_to_l'],
                    time: ['hours_to_minutes', 'minutes_to_hours', 'minutes_to_seconds', 'seconds_to_minutes', 'days_to_hours', 'hours_to_days', 'weeks_to_days', 'days_to_weeks']
                },
                approximate_factors: {
                    miles_to_km: 1.6
                },
                value_types: ['whole', 'decimal_1dp', 'decimal_2dp', 'decimal_3dp'], // Full 3 decimal places
                ranges: {
                    km: { min: 0.001, max: 500 },
                    m: { min: 0.001, max: 50000 },
                    cm: { min: 0.1, max: 10000 },
                    mm: { min: 0.1, max: 10000 },
                    kg: { min: 0.001, max: 500 },
                    g: { min: 0.001, max: 50000 },
                    mg: { min: 1, max: 50000 },
                    l: { min: 0.001, max: 500 },
                    ml: { min: 0.001, max: 50000 },
                    miles: { min: 0.1, max: 500 },
                    hours: { min: 0.1, max: 72 },
                    minutes: { min: 1, max: 2000 },
                    seconds: { min: 30, max: 2000 },
                    days: { min: 1, max: 60 },
                    weeks: { min: 1, max: 20 }
                },
                decimal_max_places: 3,
                include_word_problems: true,
                include_complex_scenarios: true,
                include_time: true,
                multi_step: true
            }
        }
    }
};
