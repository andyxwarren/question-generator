/**
 * M01: Measurement - Compare, describe and order measures
 *
 * V2 Nested Schema: All parameters use math/presentation separation
 */

const M01_Y4_MEAS_PARAMS = {
    1: {
        description: "Beginning - Compare measures in the same unit. Simple comparisons with clear differences (e.g., 500g vs 300g, £2.50 vs £1.75). Focus on two values only.",
        math: {
            types: ['length', 'mass', 'capacity', 'money'],
            units: {
                length: ['m', 'cm'],
                mass: ['kg', 'g'],
                capacity: ['l', 'ml'],
                money: ['pounds_decimal']  // Only £2.50 format
            },
            ranges: {
                m: { min: 1, max: 10 },
                cm: { min: 10, max: 100 },
                kg: { min: 1, max: 10 },
                g: { min: 100, max: 1000 },
                l: { min: 1, max: 5 },
                ml: { min: 100, max: 1000 },
                pounds: { min: 1, max: 10 }
            },
            comparisonType: 'same_unit',  // Only compare within same unit
            orderCount: 2  // Just two items
        },
        presentation: {
            questionTypes: ['which_greater', 'which_smaller'],
            visualType: 'text_only',
            showUnits: true
        }
    },
    2: {
        description: "Developing - Compare with simple conversions (e.g., 1kg vs 800g, 100p vs £1.50). Include mixed unit comparisons with obvious answers. Order 2-3 items.",
        math: {
            types: ['length', 'mass', 'capacity', 'money'],
            units: {
                length: ['m', 'cm', 'km'],
                mass: ['kg', 'g'],
                capacity: ['l', 'ml'],
                money: ['pounds_decimal', 'pence']  // £2.50 and 250p
            },
            ranges: {
                km: { min: 1, max: 5 },
                m: { min: 1, max: 100 },
                cm: { min: 50, max: 500 },
                kg: { min: 1, max: 10 },
                g: { min: 500, max: 2000 },
                l: { min: 1, max: 10 },
                ml: { min: 500, max: 3000 },
                pounds: { min: 1, max: 20 },
                pence: { min: 50, max: 500 }
            },
            comparisonType: 'simple_conversion',  // e.g., 1kg vs 800g
            orderCount: 3  // Up to 3 items
        },
        presentation: {
            questionTypes: ['which_greater', 'which_smaller', 'order_ascending'],
            visualType: 'text_only',
            showUnits: true
        }
    },
    3: {
        description: "Meeting - Full curriculum: compare mixed units and money notation (e.g., 2m 50cm vs 240cm, £4.20 vs 450p). Order 3 items with mixed representations.",
        math: {
            types: ['length', 'mass', 'capacity', 'money'],
            units: {
                length: ['m', 'cm', 'mm', 'km', 'mixed_m_cm'],
                mass: ['kg', 'g', 'mixed_kg_g'],
                capacity: ['l', 'ml', 'mixed_l_ml'],
                money: ['pounds_decimal', 'pence', 'mixed_pounds_pence']
            },
            ranges: {
                km: { min: 1, max: 10 },
                m: { min: 1, max: 500 },
                cm: { min: 10, max: 999 },
                mm: { min: 10, max: 500 },
                kg: { min: 1, max: 20 },
                g: { min: 100, max: 5000 },
                l: { min: 1, max: 20 },
                ml: { min: 100, max: 5000 },
                pounds: { min: 1, max: 50 },
                pence: { min: 50, max: 999 }
            },
            comparisonType: 'mixed_notation',  // e.g., 2m 50cm vs 240cm
            orderCount: 3
        },
        presentation: {
            questionTypes: ['which_greater', 'which_smaller', 'order_ascending', 'are_equal'],
            visualType: 'text_only',
            showUnits: true
        }
    },
    4: {
        description: "Exceeding - Order 4 measures with complex mixed notation. Include equivalence questions and reasoning (e.g., 'Which two are equal?'). Larger ranges and more challenging conversions.",
        math: {
            types: ['length', 'mass', 'capacity', 'money'],
            units: {
                length: ['m', 'cm', 'mm', 'km', 'mixed_m_cm', 'mixed_km_m'],
                mass: ['kg', 'g', 'mixed_kg_g'],
                capacity: ['l', 'ml', 'mixed_l_ml'],
                money: ['pounds_decimal', 'pence', 'mixed_pounds_pence']
            },
            ranges: {
                km: { min: 1, max: 100 },
                m: { min: 1, max: 9999 },
                cm: { min: 10, max: 999 },
                mm: { min: 10, max: 999 },
                kg: { min: 1, max: 100 },
                g: { min: 100, max: 9999 },
                l: { min: 1, max: 100 },
                ml: { min: 100, max: 9999 },
                pounds: { min: 1, max: 100 },
                pence: { min: 50, max: 9999 }
            },
            comparisonType: 'complex_mixed',  // Multiple mixed notations
            orderCount: 4
        },
        presentation: {
            questionTypes: ['which_greater', 'which_smaller', 'order_ascending', 'order_descending', 'are_equal', 'find_equivalent'],
            visualType: 'text_only',
            showUnits: true
        }
    }
};

/**
 * M01 Module Definitions
 */
export const M01_MODULES = {
    'M01_Y4_MEAS': {
        id: 'M01_Y4_MEAS',
        name: 'M01_Y4_MEAS: Compare Measures',
        description: 'Compare different measures, including money in pounds and pence',
        icon: '⚖️',
        yearGroup: '4',
        strand: 'Measurement',
        substrand: 'Compare, describe and order measures',
        ref: 'M1',
        parameters: M01_Y4_MEAS_PARAMS
    }
};
