/**
 * M09 Module Series: Measurement Problem Solving
 * Covers Years 2-6 progression for solving problems with measurements
 *
 * Vertical Progression:
 * - Year 2: Money only (same unit), addition/subtraction, giving change
 * - Year 3: All measures (money, length, mass, capacity), addition/subtraction, mixed units
 * - Year 4: All four operations (×, ÷, +, -), scaling problems
 * - Year 5: All four operations with decimals, scaling, multi-step
 * - Year 6: Conversions between units, decimal precision to 3dp, area/volume
 */

export const M09_MODULES = {
    'M09_Y2_MEAS': {
        id: 'M09_Y2_MEAS',
        name: 'M09_Y2_MEAS: Money Problem Solving',
        description: 'solve simple problems in a practical context involving addition and subtraction of money of the same unit, including giving change',
        icon: '💰',
        yearGroup: 'Year 2',
        strand: 'Measurement',
        substrand: 'solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)',
        ref: 'M9',
        parameters: {
            1: {
                operations: ['add_money', 'subtract_money'],
                unit: 'pence_only',  // Only pence, no pounds
                min_value: 5,
                max_value: 50,
                max_total: 50,  // Sums don't exceed 50p
                contexts: ['shopping', 'pocket_money', 'saving'],
                include_change: false
            },
            2: {
                operations: ['add_money', 'subtract_money', 'give_change'],
                unit: 'pence_only',
                min_value: 10,
                max_value: 99,
                max_total: 100,  // Can reach 99p
                payment_amounts: [50, 100],  // Pay with 50p or £1 (100p)
                contexts: ['shopping', 'pocket_money', 'saving', 'change'],
                include_change: true
            },
            3: {
                operations: ['add_money', 'subtract_money', 'give_change'],
                unit: 'pounds_only',  // Whole pounds only (£1, £2, etc.)
                min_value: 1,
                max_value: 10,
                max_total: 10,
                payment_amounts: [5, 10],  // Pay with £5 or £10
                contexts: ['shopping', 'pocket_money', 'saving', 'change'],
                include_change: true
            },
            4: {
                operations: ['add_money', 'subtract_money', 'give_change', 'multi_item'],
                unit: 'pounds_only',
                min_value: 2,
                max_value: 20,
                max_total: 20,
                payment_amounts: [10, 20],  // Pay with £10 or £20
                contexts: ['shopping', 'pocket_money', 'saving', 'change', 'comparing_prices'],
                include_change: true
            }
        }
    },

    'M09_Y3_MEAS': {
        id: 'M09_Y3_MEAS',
        name: 'M09_Y3_MEAS: Multi-Measure Problems',
        description: 'add and subtract amounts of money to give change, using both pounds (£) and pence (p) in practical contexts; add and subtract lengths (m/cm/mm); add and subtract mass (kg/g); add and subtract volume / capacity (l/ml)',
        icon: '📊',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)',
        ref: 'M9',
        parameters: {
            1: {
                operations: ['add_measure', 'subtract_measure'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_unit: 'pence_only',  // Start with same unit
                money_range: [10, 99],
                length_unit: 'cm',
                length_range: [10, 100],
                mass_unit: 'g',
                mass_range: [50, 500],
                capacity_unit: 'ml',
                capacity_range: [100, 500],
                contexts: ['shopping', 'measuring', 'recipes', 'school']
            },
            2: {
                operations: ['add_measure', 'subtract_measure', 'give_change'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_unit: 'mixed_simple',  // e.g., £2.50 (50p increments)
                money_range: [1.00, 5.00],
                payment_amounts: [5.00, 10.00],
                length_unit: 'mixed',  // e.g., 2m 30cm
                length_range: [100, 300],  // In cm for calculation
                mass_unit: 'mixed',  // e.g., 1kg 200g
                mass_range: [500, 2000],  // In g for calculation
                capacity_unit: 'mixed',  // e.g., 2l 300ml
                capacity_range: [1000, 3000],  // In ml for calculation
                contexts: ['shopping', 'measuring', 'recipes', 'school', 'DIY']
            },
            3: {
                operations: ['add_measure', 'subtract_measure', 'give_change', 'convert_within'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_unit: 'mixed',  // Any £.pp format
                money_range: [1.00, 10.00],
                payment_amounts: [10.00, 20.00],
                length_unit: 'mixed',
                length_range: [50, 500],
                mass_unit: 'mixed',
                mass_range: [200, 3000],
                capacity_unit: 'mixed',
                capacity_range: [500, 5000],
                require_conversion: true,  // May need to convert for calculation
                contexts: ['shopping', 'measuring', 'recipes', 'school', 'DIY', 'sports']
            },
            4: {
                operations: ['add_measure', 'subtract_measure', 'give_change', 'convert_within', 'multi_step'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_unit: 'mixed',
                money_range: [2.00, 20.00],
                payment_amounts: [20.00, 50.00],
                length_unit: 'mixed',
                length_range: [100, 1000],
                mass_unit: 'mixed',
                mass_range: [500, 5000],
                capacity_unit: 'mixed',
                capacity_range: [1000, 10000],
                require_conversion: true,
                allow_multi_step: true,  // Two operations in one problem
                contexts: ['shopping', 'measuring', 'recipes', 'school', 'DIY', 'sports', 'science']
            }
        }
    },

    'M09_Y4_MEAS': {
        id: 'M09_Y4_MEAS',
        name: 'M09_Y4_MEAS: Four Operations with Measures',
        description: 'calculate different measures, including money in pounds and pence',
        icon: '🧮',
        yearGroup: 'Year 4',
        strand: 'Measurement',
        substrand: 'solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)',
        ref: 'M9',
        parameters: {
            1: {
                operations: ['multiply_measure', 'divide_measure', 'add_measure', 'subtract_measure'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_format: 'whole_pounds',  // £5, £12, etc.
                money_range: [1, 20],
                multipliers: [2, 3, 4, 5],  // Simple scaling
                divisors: [2, 3, 4, 5],
                length_range: [10, 100],  // In cm
                mass_range: [100, 2000],  // In g
                capacity_range: [100, 2000],  // In ml
                contexts: ['shopping', 'recipes', 'packing', 'sharing']
            },
            2: {
                operations: ['multiply_measure', 'divide_measure', 'add_measure', 'subtract_measure', 'give_change'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_format: 'decimal_simple',  // £1.25, £2.50 (25p increments)
                money_range: [0.50, 10.00],
                multipliers: [2, 3, 4, 5, 10],
                divisors: [2, 3, 4, 5, 10],
                length_range: [50, 500],
                mass_range: [500, 5000],
                capacity_range: [250, 5000],
                contexts: ['shopping', 'recipes', 'packing', 'sharing', 'DIY', 'sports']
            },
            3: {
                operations: ['multiply_measure', 'divide_measure', 'add_measure', 'subtract_measure', 'give_change', 'scale_recipe'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_format: 'decimal',  // Any £.pp
                money_range: [1.00, 50.00],
                multipliers: [2, 3, 4, 5, 6, 10],
                divisors: [2, 3, 4, 5, 6],
                allow_remainders: true,
                length_range: [100, 1000],
                mass_range: [100, 10000],
                capacity_range: [250, 10000],
                contexts: ['shopping', 'recipes', 'packing', 'sharing', 'DIY', 'sports', 'gardening']
            },
            4: {
                operations: ['multiply_measure', 'divide_measure', 'add_measure', 'subtract_measure', 'give_change', 'scale_recipe', 'multi_step'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                money_format: 'decimal',
                money_range: [2.00, 100.00],
                multipliers: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                divisors: [2, 3, 4, 5, 6, 8],
                allow_remainders: true,
                length_range: [50, 2000],
                mass_range: [100, 20000],
                capacity_range: [250, 20000],
                allow_multi_step: true,
                contexts: ['shopping', 'recipes', 'packing', 'sharing', 'DIY', 'sports', 'gardening', 'construction']
            }
        }
    },

    'M09_Y5_MEAS': {
        id: 'M09_Y5_MEAS',
        name: 'M09_Y5_MEAS: Decimal Measures and Scaling',
        description: 'use all four operations to solve problems involving measures [money] using decimal notation, including scaling; use all four operations to solve problems involving measure [e.g. length] using decimal notation, including scaling; use all four operations to solve problems involving measure [e.g. mass] using decimal notation, including scaling; use all four operations to solve problems involving measure [e.g. volume] using decimal notation, including scaling',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Measurement',
        substrand: 'solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)',
        ref: 'M9',
        parameters: {
            1: {
                operations: ['multiply_decimal', 'divide_decimal', 'add_decimal', 'subtract_decimal'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                decimal_places: 1,
                money_range: [0.5, 10.0],  // 1 dp
                length_range: [0.5, 10.0],  // Metres with 1 dp
                mass_range: [0.5, 10.0],  // Kg with 1 dp
                capacity_range: [0.5, 10.0],  // Litres with 1 dp
                multipliers: [2, 3, 4, 5, 10],
                divisors: [2, 5, 10],
                contexts: ['shopping', 'recipes', 'science', 'sports']
            },
            2: {
                operations: ['multiply_decimal', 'divide_decimal', 'add_decimal', 'subtract_decimal', 'scale_recipe'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                decimal_places: 2,
                money_range: [0.50, 50.00],  // 2 dp
                length_range: [0.25, 25.00],
                mass_range: [0.25, 25.00],
                capacity_range: [0.50, 25.00],
                multipliers: [2, 3, 4, 5, 6, 10],
                divisors: [2, 4, 5, 8, 10],
                scaling_from: [2, 4, 6],  // Recipe for X servings
                scaling_to: [4, 6, 8, 10],  // Scale to Y servings
                contexts: ['shopping', 'recipes', 'science', 'sports', 'DIY', 'travel']
            },
            3: {
                operations: ['multiply_decimal', 'divide_decimal', 'add_decimal', 'subtract_decimal', 'scale_recipe', 'rate_problems', 'multi_step'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                decimal_places: 2,
                money_range: [1.00, 100.00],
                length_range: [0.50, 100.00],
                mass_range: [0.50, 100.00],
                capacity_range: [0.50, 100.00],
                multipliers: [2, 3, 4, 5, 6, 7, 8, 10, 12],
                divisors: [2, 3, 4, 5, 6, 8, 10],
                scaling_from: [2, 3, 4, 6],
                scaling_to: [4, 6, 8, 10, 12],
                include_rates: true,  // £X per kg, etc.
                allow_multi_step: true,
                contexts: ['shopping', 'recipes', 'science', 'sports', 'DIY', 'travel', 'business']
            },
            4: {
                operations: ['multiply_decimal', 'divide_decimal', 'add_decimal', 'subtract_decimal', 'scale_recipe', 'rate_problems', 'fraction_of_measure', 'multi_step'],
                measure_types: ['money', 'length', 'mass', 'capacity'],
                decimal_places: 2,
                money_range: [2.00, 500.00],
                length_range: [1.00, 500.00],
                mass_range: [1.00, 500.00],
                capacity_range: [1.00, 500.00],
                multipliers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15],
                divisors: [2, 3, 4, 5, 6, 8, 10, 12],
                scaling_from: [2, 3, 4, 5, 6],
                scaling_to: [4, 6, 8, 10, 12, 15],
                include_rates: true,
                fractions: [1/2, 1/3, 1/4, 2/3, 3/4],  // Fraction of a measure
                allow_multi_step: true,
                require_planning: true,  // 3+ step problems
                contexts: ['shopping', 'recipes', 'science', 'sports', 'DIY', 'travel', 'business', 'manufacturing']
            }
        }
    },

    'M09_Y6_MEAS': {
        id: 'M09_Y6_MEAS',
        name: 'M09_Y6_MEAS: Unit Conversion Problems',
        description: 'solve problems involving the calculation and conversion of units of measure, using decimal notation up to three decimal places where appropriate',
        icon: '🔄',
        yearGroup: 'Year 6',
        strand: 'Measurement',
        substrand: 'solve problems (a, money; b, length; c, mass / weight; d, capacity / volume)',
        ref: 'M9',
        parameters: {
            1: {
                operations: ['convert_length', 'convert_mass', 'convert_capacity', 'simple_conversion_problem'],
                conversions: {
                    length: ['km_to_m', 'm_to_cm', 'cm_to_mm'],
                    mass: ['kg_to_g'],
                    capacity: ['l_to_ml']
                },
                decimal_places: [1, 2],
                value_ranges: {
                    km: [0.5, 10],
                    m: [0.5, 50],
                    cm: [5, 500],
                    kg: [0.5, 10],
                    l: [0.5, 10]
                },
                contexts: ['science', 'DIY', 'travel', 'cooking']
            },
            2: {
                operations: ['convert_length', 'convert_mass', 'convert_capacity', 'convert_area', 'conversion_with_calculation'],
                conversions: {
                    length: ['km_to_m', 'm_to_cm', 'cm_to_mm', 'm_to_mm'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l'],
                    area: ['m2_to_cm2']
                },
                decimal_places: [1, 2, 3],
                value_ranges: {
                    km: [0.25, 50],
                    m: [0.25, 100],
                    cm: [5, 1000],
                    kg: [0.25, 50],
                    l: [0.25, 50]
                },
                require_calculation: true,  // Convert then calculate
                contexts: ['science', 'DIY', 'travel', 'cooking', 'sports', 'geography']
            },
            3: {
                operations: ['convert_length', 'convert_mass', 'convert_capacity', 'convert_area', 'convert_volume', 'multi_conversion', 'conversion_with_calculation'],
                conversions: {
                    length: ['km_to_m', 'm_to_cm', 'cm_to_mm', 'm_to_mm', 'km_to_cm'],
                    mass: ['kg_to_g', 'g_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l', 'm3_to_l'],
                    area: ['m2_to_cm2', 'cm2_to_mm2'],
                    volume: ['m3_to_cm3']
                },
                decimal_places: [1, 2, 3],
                value_ranges: {
                    km: [0.125, 100],
                    m: [0.5, 500],
                    cm: [10, 5000],
                    kg: [0.5, 100],
                    l: [0.5, 100]
                },
                require_calculation: true,
                allow_multi_step: true,  // Multiple conversions or operations
                contexts: ['science', 'DIY', 'travel', 'cooking', 'sports', 'geography', 'engineering']
            },
            4: {
                operations: ['convert_length', 'convert_mass', 'convert_capacity', 'convert_area', 'convert_volume', 'multi_conversion', 'conversion_with_calculation', 'rate_conversion'],
                conversions: {
                    length: ['km_to_m', 'm_to_cm', 'cm_to_mm', 'm_to_mm', 'km_to_cm'],
                    mass: ['kg_to_g', 'g_to_kg', 't_to_kg'],
                    capacity: ['l_to_ml', 'ml_to_l', 'm3_to_l', 'cm3_to_ml'],
                    area: ['m2_to_cm2', 'cm2_to_mm2', 'km2_to_m2'],
                    volume: ['m3_to_cm3', 'm3_to_l']
                },
                decimal_places: [1, 2, 3],
                value_ranges: {
                    km: [0.125, 500],
                    m: [0.5, 1000],
                    cm: [5, 10000],
                    kg: [0.5, 500],
                    l: [0.5, 500]
                },
                require_calculation: true,
                allow_multi_step: true,
                include_rates: true,  // Speed, density, price per unit
                require_planning: true,  // Complex multi-step problems
                contexts: ['science', 'DIY', 'travel', 'cooking', 'sports', 'geography', 'engineering', 'industry']
            }
        }
    }
};
