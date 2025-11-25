/**
 * N03 Module Series: Place Value and Roman Numerals
 * Covers Years 2-6 progression
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N03_Y2_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "compare_place_values", "compose_simple", "decompose_simple"],
            math: {
                range: { min: 10, max: 50 },
                placeValue: { places: ["ones", "tens"], includeZero: false },
                decomposition: { format: "simple" }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "compare_place_values", "compose_simple", "decompose_simple", "digit_value", "zero_value"],
            math: {
                range: { min: 10, max: 99 },
                placeValue: { places: ["ones", "tens"], includeZero: true },
                decomposition: { format: "simple" }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "expanded_form", "standard_from_expanded", "zero_value", "place_comparison"],
            math: {
                range: { min: 10, max: 99 },
                placeValue: { places: ["ones", "tens"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations"],
            math: {
                range: { min: 10, max: 99 },
                placeValue: { places: ["ones", "tens"], includeZero: true },
                decomposition: { format: "all" }
            }
        }
    },
    N03_Y3_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "compose_simple", "decompose_simple"],
            math: {
                range: { min: 100, max: 300 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: false },
                decomposition: { format: "simple" }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "zero_value"],
            math: {
                range: { min: 100, max: 600 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: true },
                decomposition: { format: "simple" }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "expanded_form", "standard_from_expanded", "zero_value", "place_comparison"],
            math: {
                range: { min: 100, max: 999 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations"],
            math: {
                range: { min: 100, max: 999 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: true },
                decomposition: { format: "all" }
            }
        }
    },
    N03_Y4_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "compose_simple", "decompose_simple", "roman_to_arabic", "roman_simple"],
            math: {
                range: { min: 1000, max: 3000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: false },
                decomposition: { format: "simple" },
                roman: { min: 1, max: 10, operations: ["roman_to_arabic", "arabic_to_roman"] }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "zero_value", "roman_to_arabic", "arabic_to_roman"],
            math: {
                range: { min: 1000, max: 6000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: true },
                decomposition: { format: "simple" },
                roman: { min: 1, max: 50, operations: ["roman_to_arabic", "arabic_to_roman", "roman_compare"] }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison", "roman_to_arabic", "arabic_to_roman", "roman_compare"],
            math: {
                range: { min: 1000, max: 9999 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: true },
                decomposition: { format: "both" },
                roman: { min: 1, max: 100, operations: ["roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_order"] }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "alternative_decomposition", "multiple_representations", "roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_order", "zero_concept"],
            math: {
                range: { min: 1000, max: 9999 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: true },
                decomposition: { format: "all" },
                roman: { min: 1, max: 100, operations: ["roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_order", "roman_sequence"] }
            }
        }
    },
    N03_Y5_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compose_simple", "decompose_simple", "roman_to_arabic", "roman_year"],
            math: {
                range: { min: 10000, max: 100000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands"], includeZero: true },
                decomposition: { format: "simple" },
                roman: { min: 1, max: 100, years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024] }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison", "roman_to_arabic", "arabic_to_roman", "roman_year"],
            math: {
                range: { min: 10000, max: 500000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"], includeZero: true },
                decomposition: { format: "both" },
                roman: { min: 1, max: 500, years: [1066, 1215, 1588, 1666, 1815, 1914, 1945, 2000, 2020] }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison", "roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_year"],
            math: {
                range: { min: 10000, max: 1000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"], includeZero: true },
                decomposition: { format: "both" },
                roman: { min: 1, max: 1000, years: [1066, 1215, 1492, 1588, 1666, 1776, 1815, 1914, 1945, 2000, 2024] }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "alternative_decomposition", "multiple_representations", "roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_year", "roman_complex"],
            math: {
                range: { min: 100000, max: 1000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"], includeZero: true },
                decomposition: { format: "all" },
                roman: { min: 1, max: 1000, years: [753, 1066, 1215, 1492, 1588, 1666, 1776, 1789, 1815, 1914, 1945, 1969, 2000, 2024] }
            }
        }
    },
    N03_Y6_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compose_simple", "decompose_simple", "place_comparison"],
            math: {
                range: { min: 100000, max: 1000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"], includeZero: true },
                decomposition: { format: "simple" }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison"],
            math: {
                range: { min: 1000000, max: 5000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions", "ten millions"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations"],
            math: {
                range: { min: 1000000, max: 10000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions", "ten millions"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations", "complex_place_value"],
            math: {
                range: { min: 1000000, max: 10000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions", "ten millions"], includeZero: true },
                decomposition: { format: "all" }
            }
        }
    }
};

export const N03_MODULES = {
    'N03_Y2_NPV': {
        id: 'N03_Y2_NPV',
        name: 'N03_Y2_NPV: Two-Digit Place Value',
        description: 'Recognise the place value of each digit in a two-digit number (tens, ones)',
        icon: '🔢',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y2_NPV']
    },
    'N03_Y3_NPV': {
        id: 'N03_Y3_NPV',
        name: 'N03_Y3_NPV: Three-Digit Place Value',
        description: 'Recognise the place value of each digit in a three-digit number (hundreds, tens, ones)',
        icon: '🔢',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y3_NPV']
    },
    'N03_Y4_NPV': {
        id: 'N03_Y4_NPV',
        name: 'N03_Y4_NPV: Four-Digit Place Value & Roman Numerals to 100',
        description: 'recognise the place value of each digit in a four-digit number (thousands, hundreds, tens and ones); read Roman numerals to 100 (I to C) and know that over time, the numeral system changed to include the concept of zero and place value',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y4_NPV']
    },
    'N03_Y5_NPV': {
        id: 'N03_Y5_NPV',
        name: 'N03_Y5_NPV: Place Value to 1,000,000 & Roman Numerals to 1000',
        description: 'determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M) and recognise years written in Roman numerals',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y5_NPV']
    },
    'N03_Y6_NPV': {
        id: 'N03_Y6_NPV',
        name: 'N03_Y6_NPV: Place Value to 10,000,000',
        description: 'Determine the value of each digit in numbers up to 10,000,000',
        icon: '🔢',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y6_NPV']
    }
};