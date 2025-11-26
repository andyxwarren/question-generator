/**
 * M03: Money
 * Years 1-3
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M03_Y1_MEAS: {
        1: { operations: ["identify_coin_value", "state_coin_value"], math: { denominations: [1, 2, 5, 10], pounds: false, notes: false, max: 10 } },
        3: { operations: ["identify_coin_value", "compare_two_coins", "order_coins"], math: { denominations: [1, 2, 5, 10, 20, 50, 100, 200], pounds: true, notes: false, max: 200 } }
    },
    M03_Y2_MEAS: {
        1: { operations: ["use_pence_symbol", "combine_same_coins"], math: { denominations: [1, 2, 5, 10], target: { min: 2, max: 20 }, maxCoins: 5, symbol: "pence_only" } },
        3: { operations: ["use_pence_symbol", "use_pounds_symbol", "combine_mixed_coins", "convert_pounds_pence"], math: { denominations: [1, 2, 5, 10, 20, 50, 100], target: { min: 10, max: 100 }, maxCoins: 7, symbol: "both", conversions: true } }
    },
    M03_Y3_MEAS: {
        1: { operations: ["recognize_all_coins", "convert_pounds_pence", "combine_amounts"], math: { denominations: [1, 2, 5, 10, 20, 50, 100, 200], target: { min: 10, max: 100 }, notes: false, conversions: true, format: "simple" } },
        3: { operations: ["recognize_all_denominations", "convert_pounds_pence", "make_amount_efficient", "solve_change_problems"], math: { denominations: [1, 2, 5, 10, 20, 50, 100, 200], target: { min: 50, max: 500 }, notes: true, noteValues: [500, 1000, 2000], conversions: true, format: "mixed", change: true } }
    }
};

export const M03_MODULES = {
    'M03_Y1_MEAS': { id: 'M03_Y1_MEAS', name: 'M03_Y1: Coins', ref: 'M3', yearGroup: 'Year 1', parameters: MIGRATED_PARAMS['M03_Y1_MEAS'] },
    'M03_Y2_MEAS': { id: 'M03_Y2_MEAS', name: 'M03_Y2: Pounds & Pence', ref: 'M3', yearGroup: 'Year 2', parameters: MIGRATED_PARAMS['M03_Y2_MEAS'] },
    'M03_Y3_MEAS': { id: 'M03_Y3_MEAS', name: 'M03_Y3: Consolidation', ref: 'M3', yearGroup: 'Year 3', parameters: MIGRATED_PARAMS['M03_Y3_MEAS'] }
};