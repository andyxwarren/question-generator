/**
 * M05 Module Series: Convert Between Metric Units
 * Year 5 only - metric unit conversions
 */

export const M05_MODULES = {
    'M05_Y5_MEAS': {
        id: 'M05_Y5_MEAS',
        name: 'M05_Y5_MEAS: Convert Between Metric Units',
        description: 'Convert between different units of metric measure [e.g. kilometre and metre; centimetre and metre; centimetre and millimetre; gram and kilogram; litre and millilitre]',
        icon: '↔️',
        yearGroup: 'Year 5',
        strand: 'Measurement',
        substrand: 'convert between metric units',
        ref: 'M5',
        parameters: {
            1: {
                operations: ['direct_conversion'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['km_to_m'],
                    mass: ['kg_to_g'],
                    capacity: ['l_to_ml']
                },
                value_types: ['whole_only'],
                ranges: {
                    km: { min: 1, max: 10 },
                    kg: { min: 1, max: 10 },
                    l: { min: 1, max: 10 }
                },
                include_word_problems: false,
                multi_step: false
            },
            2: {
                operations: ['direct_conversion', 'reverse_conversion'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l']
                },
                value_types: ['whole', 'simple_decimal'], // 0.5 increments only
                ranges: {
                    km: { min: 1, max: 50 },
                    m: { min: 100, max: 5000 },
                    kg: { min: 1, max: 50 },
                    g: { min: 100, max: 5000 },
                    l: { min: 1, max: 50 },
                    ml: { min: 100, max: 5000 }
                },
                include_word_problems: false,
                multi_step: false
            },
            3: {
                operations: ['direct_conversion', 'reverse_conversion', 'word_problem', 'comparison'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m', 'cm_to_mm', 'mm_to_cm'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l']
                },
                value_types: ['whole', 'decimal'], // Up to 2 decimal places
                ranges: {
                    km: { min: 1, max: 100 },
                    m: { min: 100, max: 10000 },
                    cm: { min: 10, max: 1000 },
                    kg: { min: 1, max: 100 },
                    g: { min: 100, max: 10000 },
                    l: { min: 1, max: 100 },
                    ml: { min: 100, max: 10000 }
                },
                decimal_max_places: 2,
                include_word_problems: true,
                multi_step: false
            },
            4: {
                operations: ['direct_conversion', 'reverse_conversion', 'word_problem', 'comparison', 'multi_step'],
                measure_types: ['length', 'mass', 'capacity'],
                conversions: {
                    length: ['km_to_m', 'm_to_km', 'm_to_cm', 'cm_to_m', 'cm_to_mm', 'mm_to_cm', 'km_to_cm', 'cm_to_km', 'km_to_mm'],
                    mass: ['kg_to_g', 'g_to_kg', 'kg_to_mg', 'mg_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l']
                },
                value_types: ['whole', 'decimal'], // Max 2 decimal places
                ranges: {
                    km: { min: 1, max: 100 },
                    m: { min: 100, max: 10000 },
                    cm: { min: 10, max: 5000 },
                    mm: { min: 10, max: 10000 },
                    kg: { min: 1, max: 100 },
                    g: { min: 100, max: 10000 },
                    mg: { min: 1000, max: 10000 },
                    l: { min: 1, max: 100 },
                    ml: { min: 100, max: 10000 }
                },
                decimal_max_places: 2,
                include_word_problems: true,
                include_complex_scenarios: true,
                multi_step: true
            }
        }
    }
};
