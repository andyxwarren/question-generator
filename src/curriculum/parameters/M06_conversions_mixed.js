/**
 * M06 Module Series: Convert Between Different Units of Measurement
 * Years 4, 5, 6 - metric/time conversions, imperial/metric approximations, advanced decimal conversions
 */

export const M06_MODULES = {
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
    },

    'M06_Y5_MEAS': {
        id: 'M06_Y5_MEAS',
        name: 'M06_Y5_MEAS: Metric-Imperial Approximate Equivalences',
        description: 'Understand and use approximate equivalences between metric units and common imperial units such as inches, pounds and pints',
        icon: '⚖️',
        yearGroup: 'Year 5',
        strand: 'Measurement',
        substrand: 'approximate equivalences between metric and imperial units',
        ref: 'M6',
        parameters: {
            1: {
                operations: ['approximate_conversion_metric_to_imperial', 'approximate_conversion_imperial_to_metric'],
                measure_types: ['length', 'mass'],
                conversions: {
                    length: ['inches_to_cm', 'cm_to_inches', 'feet_to_cm', 'cm_to_feet'],
                    mass: ['pounds_to_g', 'g_to_pounds'],
                    capacity: ['pints_to_ml', 'ml_to_pints']
                },
                approximate_factors: {
                    inches_to_cm: 2.5,
                    feet_to_cm: 30,
                    pounds_to_g: 450,
                    pints_to_ml: 600
                },
                value_types: ['whole_only'],
                ranges: {
                    inches: { min: 1, max: 12 },
                    feet: { min: 1, max: 10 },
                    pounds: { min: 1, max: 10 },
                    pints: { min: 1, max: 5 },
                    cm: { min: 10, max: 100 },
                    g: { min: 500, max: 5000 },
                    ml: { min: 600, max: 3000 }
                },
                include_word_problems: false,
                include_comparison: false,
                use_approximate_language: true,
                accept_ranges: true,
                tolerance_percent: 10
            },
            2: {
                operations: ['approximate_conversion_metric_to_imperial', 'approximate_conversion_imperial_to_metric', 'word_problem'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['inches_to_cm', 'cm_to_inches', 'feet_to_cm', 'cm_to_feet', 'miles_to_km', 'km_to_miles'],
                    mass: ['pounds_to_g', 'g_to_pounds', 'pounds_to_kg', 'kg_to_pounds'],
                    capacity: ['pints_to_ml', 'ml_to_pints', 'pints_to_l', 'l_to_pints']
                },
                approximate_factors: {
                    inches_to_cm: 2.5,
                    feet_to_cm: 30,
                    miles_to_km: 1.6,
                    pounds_to_g: 450,
                    pounds_to_kg: 0.45,
                    pints_to_ml: 600,
                    pints_to_l: 0.6
                },
                value_types: ['whole', 'simple_decimal'],
                ranges: {
                    inches: { min: 1, max: 24 },
                    feet: { min: 1, max: 20 },
                    miles: { min: 1, max: 20 },
                    pounds: { min: 1, max: 20 },
                    pints: { min: 1, max: 10 },
                    cm: { min: 10, max: 200 },
                    km: { min: 1, max: 50 },
                    g: { min: 500, max: 10000 },
                    kg: { min: 1, max: 20 },
                    ml: { min: 600, max: 6000 },
                    l: { min: 1, max: 10 }
                },
                include_word_problems: true,
                include_comparison: false,
                use_approximate_language: true,
                accept_ranges: true,
                tolerance_percent: 10
            },
            3: {
                operations: ['approximate_conversion_metric_to_imperial', 'approximate_conversion_imperial_to_metric', 'word_problem', 'comparison'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['inches_to_cm', 'cm_to_inches', 'feet_to_cm', 'cm_to_feet', 'yards_to_m', 'm_to_yards', 'miles_to_km', 'km_to_miles'],
                    mass: ['ounces_to_g', 'g_to_ounces', 'pounds_to_g', 'g_to_pounds', 'pounds_to_kg', 'kg_to_pounds'],
                    capacity: ['pints_to_ml', 'ml_to_pints', 'pints_to_l', 'l_to_pints', 'gallons_to_l', 'l_to_gallons']
                },
                approximate_factors: {
                    inches_to_cm: 2.5,
                    feet_to_cm: 30,
                    yards_to_m: 1,
                    miles_to_km: 1.6,
                    ounces_to_g: 30,
                    pounds_to_g: 450,
                    pounds_to_kg: 0.45,
                    pints_to_ml: 600,
                    pints_to_l: 0.6,
                    gallons_to_l: 4.5
                },
                value_types: ['whole', 'decimal'],
                ranges: {
                    inches: { min: 1, max: 36 },
                    feet: { min: 1, max: 30 },
                    yards: { min: 1, max: 20 },
                    miles: { min: 1, max: 50 },
                    ounces: { min: 1, max: 20 },
                    pounds: { min: 1, max: 50 },
                    pints: { min: 1, max: 20 },
                    gallons: { min: 1, max: 10 },
                    cm: { min: 10, max: 500 },
                    m: { min: 1, max: 100 },
                    km: { min: 1, max: 100 },
                    g: { min: 100, max: 20000 },
                    kg: { min: 1, max: 50 },
                    ml: { min: 600, max: 12000 },
                    l: { min: 1, max: 50 }
                },
                decimal_max_places: 2,
                include_word_problems: true,
                include_comparison: true,
                use_approximate_language: true,
                accept_ranges: true,
                tolerance_percent: 10
            },
            4: {
                operations: ['approximate_conversion_metric_to_imperial', 'approximate_conversion_imperial_to_metric', 'word_problem', 'comparison', 'multi_step'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['inches_to_cm', 'cm_to_inches', 'feet_to_cm', 'cm_to_feet', 'yards_to_m', 'm_to_yards', 'miles_to_km', 'km_to_miles'],
                    mass: ['ounces_to_g', 'g_to_ounces', 'pounds_to_g', 'g_to_pounds', 'pounds_to_kg', 'kg_to_pounds', 'stone_to_kg', 'kg_to_stone'],
                    capacity: ['pints_to_ml', 'ml_to_pints', 'pints_to_l', 'l_to_pints', 'gallons_to_l', 'l_to_gallons']
                },
                approximate_factors: {
                    inches_to_cm: 2.5,
                    feet_to_cm: 30,
                    yards_to_m: 1,
                    miles_to_km: 1.6,
                    ounces_to_g: 30,
                    pounds_to_g: 450,
                    pounds_to_kg: 0.45,
                    stone_to_kg: 6.5,
                    pints_to_ml: 600,
                    pints_to_l: 0.6,
                    gallons_to_l: 4.5
                },
                value_types: ['whole', 'decimal'],
                ranges: {
                    inches: { min: 1, max: 48 },
                    feet: { min: 1, max: 50 },
                    yards: { min: 1, max: 100 },
                    miles: { min: 1, max: 100 },
                    ounces: { min: 1, max: 32 },
                    pounds: { min: 1, max: 100 },
                    stone: { min: 1, max: 20 },
                    pints: { min: 1, max: 30 },
                    gallons: { min: 1, max: 20 },
                    cm: { min: 10, max: 1000 },
                    m: { min: 1, max: 200 },
                    km: { min: 1, max: 200 },
                    g: { min: 100, max: 50000 },
                    kg: { min: 1, max: 100 },
                    ml: { min: 600, max: 20000 },
                    l: { min: 1, max: 100 }
                },
                decimal_max_places: 2,
                include_word_problems: true,
                include_comparison: true,
                include_complex_scenarios: true,
                use_approximate_language: true,
                accept_ranges: true,
                tolerance_percent: 10,
                multi_step: true
            }
        }
    },

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
                value_types: ['whole', 'decimal_1dp'],
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
                approximate_factors: {
                    miles_to_km: 1.6
                },
                value_types: ['whole', 'decimal_1dp', 'decimal_2dp'],
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
                value_types: ['whole', 'decimal_1dp', 'decimal_2dp', 'decimal_3dp'],
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
                value_types: ['whole', 'decimal_1dp', 'decimal_2dp', 'decimal_3dp'],
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
