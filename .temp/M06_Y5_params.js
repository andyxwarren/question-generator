/**
 * M06_Y5_MEAS: Approximate Equivalences Between Metric and Imperial Units
 * Year 5 - understanding and using APPROXIMATE conversions
 */

export const M06_Y5_MEAS_PARAMS = {
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
                // Approximate conversion factors (as taught in UK curriculum)
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
                use_approximate_language: true, // "about", "approximately"
                accept_ranges: true // Accept answers within reasonable range
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
                    miles_to_km: 1.6, // or 5 miles ≈ 8 km
                    pounds_to_g: 450,
                    pounds_to_kg: 0.45,
                    pints_to_ml: 600,
                    pints_to_l: 0.6
                },
                value_types: ['whole', 'simple_decimal'], // Allow 0.5 increments
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
                tolerance_percent: 10 // Accept ±10% for approximate answers
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
                    yards_to_m: 1, // or 0.9, both taught
                    miles_to_km: 1.6,
                    ounces_to_g: 30,
                    pounds_to_g: 450,
                    pounds_to_kg: 0.45,
                    pints_to_ml: 600,
                    pints_to_l: 0.6,
                    gallons_to_l: 4.5
                },
                value_types: ['whole', 'decimal'], // Up to 1 decimal place
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
                    stone_to_kg: 6.5, // 1 stone ≈ 6.5 kg (14 pounds)
                    pints_to_ml: 600,
                    pints_to_l: 0.6,
                    gallons_to_l: 4.5
                },
                value_types: ['whole', 'decimal'], // Up to 2 decimal places
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
                include_word_problems: true,
                include_comparison: true,
                include_complex_scenarios: true,
                use_approximate_language: true,
                accept_ranges: true,
                tolerance_percent: 10,
                multi_step: true
            }
        }
    }
};
