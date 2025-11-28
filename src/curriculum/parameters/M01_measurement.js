/**
 * M01: Measurement - Compare, describe and order measures
 *
 * V2 Nested Schema: All parameters use math/presentation separation
 *
 * Dual Measurement System Support:
 * - math.metric: Units and ranges for metric locales (en-GB)
 * - math.imperial: Units and ranges for imperial locales (en-US)
 * - Common parameters (types, comparisonType, orderCount) are shared
 * - Parameter resolver flattens the appropriate section based on locale
 */

const M01_Y4_MEAS_PARAMS = {
    1: {
        description: "Beginning - Compare measures in the same unit. Simple comparisons with clear differences (e.g., 500g vs 300g, £2.50 vs £1.75). Focus on two values only.",
        math: {
            // Shared parameters
            types: ['length', 'mass', 'capacity', 'money'],
            comparisonType: 'same_unit',  // Only compare within same unit
            orderCount: 2,  // Just two items

            // Metric system (UK)
            metric: {
                units: {
                    length: ['m', 'cm'],
                    mass: ['kg', 'g'],
                    capacity: ['l', 'ml'],
                    money: ['major']  // Only £2.50 format
                },
                ranges: {
                    m: { min: 1, max: 10 },
                    cm: { min: 10, max: 100 },
                    kg: { min: 1, max: 10 },
                    g: { min: 100, max: 1000 },
                    l: { min: 1, max: 5 },
                    ml: { min: 100, max: 1000 },
                    major: { min: 1, max: 10 }
                }
            },

            // Imperial system (US)
            imperial: {
                units: {
                    length: ['ft', 'in'],
                    mass: ['lb', 'oz'],
                    capacity: ['pt', 'cup'],
                    money: ['major']  // Only $2.50 format
                },
                ranges: {
                    ft: { min: 1, max: 10 },
                    in: { min: 6, max: 36 },
                    lb: { min: 1, max: 10 },
                    oz: { min: 4, max: 16 },
                    pt: { min: 1, max: 4 },
                    cup: { min: 1, max: 8 },
                    major: { min: 1, max: 10 }
                }
            }
        },
        presentation: {
            questionTypes: ['which_greater', 'which_smaller'],
            visualType: 'text_only',
            showUnits: true
        }
    },
    2: {
        description: "Developing - Compare with simple conversions (e.g., 1kg vs 800g, 100p vs $1.50). Include mixed unit comparisons with obvious answers. Order 2-3 items.",
        math: {
            // Shared parameters
            types: ['length', 'mass', 'capacity', 'money'],
            comparisonType: 'simple_conversion',  // e.g., 1kg vs 800g
            orderCount: 3,  // Up to 3 items

            // Metric system (UK)
            metric: {
                units: {
                    length: ['m', 'cm', 'km'],
                    mass: ['kg', 'g'],
                    capacity: ['l', 'ml'],
                    money: ['major', 'minor']  // £2.50 and 250p
                },
                ranges: {
                    km: { min: 1, max: 5 },
                    m: { min: 1, max: 100 },
                    cm: { min: 50, max: 500 },
                    kg: { min: 1, max: 10 },
                    g: { min: 500, max: 2000 },
                    l: { min: 1, max: 10 },
                    ml: { min: 500, max: 3000 },
                    major: { min: 1, max: 20 },
                    minor: { min: 50, max: 500 }
                }
            },

            // Imperial system (US)
            imperial: {
                units: {
                    length: ['ft', 'in', 'yd'],
                    mass: ['lb', 'oz'],
                    capacity: ['pt', 'cup', 'gal'],
                    money: ['major', 'minor']  // $2.50 and 250¢
                },
                ranges: {
                    yd: { min: 1, max: 5 },
                    ft: { min: 1, max: 20 },
                    in: { min: 12, max: 72 },
                    lb: { min: 1, max: 10 },
                    oz: { min: 8, max: 32 },
                    gal: { min: 1, max: 5 },
                    pt: { min: 1, max: 10 },
                    cup: { min: 4, max: 20 },
                    major: { min: 1, max: 20 },
                    minor: { min: 50, max: 500 }
                }
            }
        },
        presentation: {
            questionTypes: ['which_greater', 'which_smaller', 'order_ascending'],
            visualType: 'text_only',
            showUnits: true
        }
    },
    3: {
        description: "Meeting - Full curriculum: compare mixed units and money notation (e.g., 2m 50cm vs 240cm, $4.20 vs 450¢). Order 3 items with mixed representations.",
        math: {
            // Shared parameters
            types: ['length', 'mass', 'capacity', 'money'],
            comparisonType: 'mixed_notation',  // e.g., 2m 50cm vs 240cm
            orderCount: 3,

            // Metric system (UK)
            metric: {
                units: {
                    length: ['m', 'cm', 'mm', 'km', 'mixed_m_cm'],
                    mass: ['kg', 'g', 'mixed_kg_g'],
                    capacity: ['l', 'ml', 'mixed_l_ml'],
                    money: ['major', 'minor', 'mixed']
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
                    major: { min: 1, max: 50 },
                    minor: { min: 50, max: 999 }
                }
            },

            // Imperial system (US)
            imperial: {
                units: {
                    length: ['ft', 'in', 'yd', 'mi', 'mixed_ft_in'],
                    mass: ['lb', 'oz', 'mixed_lb_oz'],
                    capacity: ['pt', 'cup', 'gal', 'qt', 'mixed_gal_qt'],
                    money: ['major', 'minor', 'mixed']
                },
                ranges: {
                    mi: { min: 1, max: 5 },
                    yd: { min: 1, max: 100 },
                    ft: { min: 1, max: 50 },
                    in: { min: 6, max: 120 },
                    lb: { min: 1, max: 20 },
                    oz: { min: 4, max: 64 },
                    gal: { min: 1, max: 10 },
                    qt: { min: 1, max: 20 },
                    pt: { min: 1, max: 20 },
                    cup: { min: 4, max: 40 },
                    major: { min: 1, max: 50 },
                    minor: { min: 50, max: 999 }
                }
            }
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
            // Shared parameters
            types: ['length', 'mass', 'capacity', 'money'],
            comparisonType: 'complex_mixed',  // Multiple mixed notations
            orderCount: 4,

            // Metric system (UK)
            metric: {
                units: {
                    length: ['m', 'cm', 'mm', 'km', 'mixed_m_cm', 'mixed_km_m'],
                    mass: ['kg', 'g', 'mixed_kg_g'],
                    capacity: ['l', 'ml', 'mixed_l_ml'],
                    money: ['major', 'minor', 'mixed']
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
                    major: { min: 1, max: 100 },
                    minor: { min: 50, max: 9999 }
                }
            },

            // Imperial system (US)
            imperial: {
                units: {
                    length: ['ft', 'in', 'yd', 'mi', 'mixed_ft_in', 'mixed_yd_ft', 'mixed_mi_yd'],
                    mass: ['lb', 'oz', 'mixed_lb_oz'],
                    capacity: ['pt', 'cup', 'gal', 'qt', 'mixed_gal_qt', 'mixed_pt_cup'],
                    money: ['major', 'minor', 'mixed']
                },
                ranges: {
                    mi: { min: 1, max: 50 },
                    yd: { min: 1, max: 500 },
                    ft: { min: 1, max: 100 },
                    in: { min: 6, max: 200 },
                    lb: { min: 1, max: 100 },
                    oz: { min: 4, max: 200 },
                    gal: { min: 1, max: 50 },
                    qt: { min: 1, max: 100 },
                    pt: { min: 1, max: 100 },
                    cup: { min: 4, max: 200 },
                    major: { min: 1, max: 100 },
                    minor: { min: 50, max: 9999 }
                }
            }
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
