/**
 * M03 Module Series: Money
 * Covers Years 1-3 progression for recognising and using money
 */

export const M03_MODULES = {
    'M03_Y1_MEAS': {
        id: 'M03_Y1_MEAS',
        name: 'M03_Y1_MEAS: Recognise Coins and Notes',
        description: 'Recognise and know the value of different denominations of coins and notes',
        icon: '💷',
        yearGroup: 'Year 1',
        strand: 'Measurement',
        substrand: 'money',
        ref: 'M3',
        parameters: {
            1: {
                operations: ['identify_coin_value', 'identify_coin_by_value', 'state_coin_value'],
                denominations: [1, 2, 5, 10], // Common small coins (pence)
                include_pounds: false,
                include_notes: false,
                max_value: 10
            },
            2: {
                operations: ['identify_coin_value', 'identify_coin_by_value', 'state_coin_value', 'compare_two_coins'],
                denominations: [1, 2, 5, 10, 20, 50], // All pence coins
                include_pounds: false,
                include_notes: false,
                max_value: 50
            },
            3: {
                operations: ['identify_coin_value', 'identify_coin_by_value', 'state_coin_value', 'compare_two_coins', 'order_coins'],
                denominations: [1, 2, 5, 10, 20, 50, 100, 200], // All coins (£1=100p, £2=200p)
                include_pounds: true,
                include_notes: false,
                max_value: 200
            },
            4: {
                operations: ['identify_coin_value', 'identify_coin_by_value', 'state_coin_value', 'compare_two_coins', 'order_coins', 'identify_note_value'],
                denominations: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000], // All coins + notes (£5=500p, £10=1000p)
                include_pounds: true,
                include_notes: true,
                max_value: 1000
            }
        }
    },

    'M03_Y2_MEAS': {
        id: 'M03_Y2_MEAS',
        name: 'M03_Y2_MEAS: Pounds and Pence',
        description: 'Recognise and use symbols for pounds (£) and pence (p); combine amounts to make a particular value; find different combinations of coins that equal the same amounts of money',
        icon: '💷',
        yearGroup: 'Year 2',
        strand: 'Measurement',
        substrand: 'money',
        ref: 'M3',
        parameters: {
            1: {
                operations: ['use_pence_symbol', 'combine_same_coins', 'make_amount_one_coin_type'],
                denominations: [1, 2, 5, 10], // Simple coins
                target_amounts: { min: 2, max: 20 }, // Small targets
                max_coins: 5, // Simple combinations
                symbol_practice: 'pence_only', // Just 'p' at first
                include_pounds_symbol: false
            },
            2: {
                operations: ['use_pence_symbol', 'use_pounds_symbol', 'combine_same_coins', 'make_amount_mixed_coins', 'find_combination'],
                denominations: [1, 2, 5, 10, 20], // More coins
                target_amounts: { min: 5, max: 50 },
                max_coins: 6,
                symbol_practice: 'both', // Practice both 'p' and '£'
                include_pounds_symbol: true,
                pounds_as_pence: true // £1 = 100p conversion
            },
            3: {
                operations: ['use_pence_symbol', 'use_pounds_symbol', 'combine_mixed_coins', 'make_amount_mixed_coins', 'find_multiple_combinations', 'convert_pounds_pence'],
                denominations: [1, 2, 5, 10, 20, 50, 100], // Include £1
                target_amounts: { min: 10, max: 100 },
                max_coins: 7,
                symbol_practice: 'both',
                include_pounds_symbol: true,
                pounds_as_pence: true,
                require_conversions: true // Converting between £ and p
            },
            4: {
                operations: ['use_pence_symbol', 'use_pounds_symbol', 'combine_mixed_coins', 'make_amount_efficient', 'find_multiple_combinations', 'convert_pounds_pence', 'identify_missing_amount'],
                denominations: [1, 2, 5, 10, 20, 50, 100, 200], // All coins
                target_amounts: { min: 20, max: 200 },
                max_coins: 8,
                symbol_practice: 'both',
                include_pounds_symbol: true,
                pounds_as_pence: true,
                require_conversions: true,
                require_efficiency: true // Fewest coins possible
            }
        }
    },

    'M03_Y3_MEAS': {
        id: 'M03_Y3_MEAS',
        name: 'M03_Y3_MEAS: Money Consolidation',
        description: 'Key stage 1 content domain - consolidation and extension of Year 1-2 money concepts',
        icon: '💷',
        yearGroup: 'Year 3',
        strand: 'Measurement',
        substrand: 'money',
        ref: 'M3',
        parameters: {
            1: {
                operations: ['recognize_all_coins', 'convert_pounds_pence', 'combine_amounts', 'make_amount_coins'],
                denominations: [1, 2, 5, 10, 20, 50, 100, 200], // All coins
                target_amounts: { min: 10, max: 100 },
                max_coins: 6,
                include_notes: false,
                require_conversions: true,
                conversion_format: 'simple' // e.g., £1 = 100p
            },
            2: {
                operations: ['recognize_all_coins', 'convert_pounds_pence', 'combine_amounts', 'make_amount_coins', 'find_combinations', 'compare_amounts'],
                denominations: [1, 2, 5, 10, 20, 50, 100, 200], // All coins
                target_amounts: { min: 20, max: 200 },
                max_coins: 8,
                include_notes: true,
                notes: [500, 1000], // £5, £10
                require_conversions: true,
                conversion_format: 'mixed' // e.g., £2.50 = 250p
            },
            3: {
                operations: ['recognize_all_denominations', 'convert_pounds_pence', 'combine_amounts', 'make_amount_efficient', 'find_multiple_combinations', 'compare_amounts', 'solve_change_problems'],
                denominations: [1, 2, 5, 10, 20, 50, 100, 200],
                target_amounts: { min: 50, max: 500 },
                max_coins: 10,
                include_notes: true,
                notes: [500, 1000, 2000], // £5, £10, £20
                require_conversions: true,
                conversion_format: 'mixed',
                require_efficiency: true,
                include_change: true // Simple change calculations
            },
            4: {
                operations: ['recognize_all_denominations', 'convert_pounds_pence', 'combine_amounts', 'make_amount_efficient', 'find_multiple_combinations', 'compare_amounts', 'solve_change_problems', 'solve_money_problems'],
                denominations: [1, 2, 5, 10, 20, 50, 100, 200],
                target_amounts: { min: 100, max: 1000 },
                max_coins: 12,
                include_notes: true,
                notes: [500, 1000, 2000], // £5, £10, £20
                require_conversions: true,
                conversion_format: 'complex', // e.g., £5.67 = 567p
                require_efficiency: true,
                include_change: true,
                include_word_problems: true // Real-world scenarios
            }
        }
    }
};
