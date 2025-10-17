/**
 * N03 Module Series: Place Value and Roman Numerals
 * Covers Years 2-6 progression
 */

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
        parameters: {
            1: {
                // Beginning: Simple two-digit numbers, focus on tens/ones distinction
                min_value: 10,
                max_value: 50,
                places: ['ones', 'tens'],
                operations: [
                    'identify_digit',           // "What digit is in the tens place in 47?"
                    'identify_place_value',     // "What is the value of the 4 in 47?"
                    'compare_place_values',     // "Which digit has greater value: 4 or 7 in 47?"
                    'compose_simple',           // "What number is 3 tens and 5 ones?"
                    'decompose_simple'          // "How many tens and ones in 47?"
                ],
                include_zero: false,            // No zeros at this level
                decomposition_format: 'simple'  // "3 tens and 5 ones"
            },
            2: {
                // Developing: Full range 10-99, introduce zeros
                min_value: 10,
                max_value: 99,
                places: ['ones', 'tens'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'digit_value',              // "In 83, what does the 8 represent?"
                    'zero_value'                // "What is the value of 0 in 30?"
                ],
                include_zero: true,
                decomposition_format: 'simple'
            },
            3: {
                // Meeting: Full range, expanded form introduction
                min_value: 10,
                max_value: 99,
                places: ['ones', 'tens'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'expanded_form',            // "47 = 40 + 7"
                    'standard_from_expanded',   // "What is 40 + 7?"
                    'zero_value',
                    'place_comparison'          // "Which number has more tens: 47 or 83?"
                ],
                include_zero: true,
                decomposition_format: 'both'    // Both simple and expanded
            },
            4: {
                // Exceeding: Challenge with multiple representations
                min_value: 10,
                max_value: 99,
                places: ['ones', 'tens'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition', // "47 = 3 tens + 17 ones"
                    'place_comparison',
                    'multiple_representations'   // Multiple choice with different forms
                ],
                include_zero: true,
                decomposition_format: 'all'
            }
        }
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
        parameters: {
            1: {
                min_value: 100,
                max_value: 300,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'compose_simple',
                    'decompose_simple'
                ],
                include_zero: false,
                decomposition_format: 'simple'
            },
            2: {
                min_value: 100,
                max_value: 600,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'zero_value'
                ],
                include_zero: true,
                decomposition_format: 'simple'
            },
            3: {
                min_value: 100,
                max_value: 999,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'expanded_form',
                    'standard_from_expanded',
                    'zero_value',
                    'place_comparison'
                ],
                include_zero: true,
                decomposition_format: 'both'
            },
            4: {
                min_value: 100,
                max_value: 999,
                places: ['ones', 'tens', 'hundreds'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition',
                    'place_comparison',
                    'multiple_representations'
                ],
                include_zero: true,
                decomposition_format: 'all'
            }
        }
    },

    'N03_Y4_NPV': {
        id: 'N03_Y4_NPV',
        name: 'N03_Y4_NPV: Four-Digit Place Value & Roman Numerals to 100',
        description: 'Recognise the place value of each digit in a four-digit number; read Roman numerals to 100 (I to C)',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: {
            1: {
                min_value: 1000,
                max_value: 3000,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'compose_simple',
                    'decompose_simple',
                    'roman_to_arabic',          // NEW: Roman numerals
                    'roman_simple'              // Simple Roman numerals (I-X)
                ],
                include_zero: false,
                decomposition_format: 'simple',
                roman_min: 1,
                roman_max: 10,                  // I to X only
                roman_operations: ['roman_to_arabic', 'arabic_to_roman']
            },
            2: {
                min_value: 1000,
                max_value: 6000,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'compose_simple',
                    'decompose_simple',
                    'zero_value',
                    'roman_to_arabic',
                    'arabic_to_roman'
                ],
                include_zero: true,
                decomposition_format: 'simple',
                roman_min: 1,
                roman_max: 50,                  // I to L
                roman_operations: ['roman_to_arabic', 'arabic_to_roman', 'roman_compare']
            },
            3: {
                min_value: 1000,
                max_value: 9999,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare'
                ],
                include_zero: true,
                decomposition_format: 'both',
                roman_min: 1,
                roman_max: 100,                 // I to C (full curriculum)
                roman_operations: ['roman_to_arabic', 'arabic_to_roman', 'roman_compare', 'roman_order']
            },
            4: {
                min_value: 1000,
                max_value: 9999,
                places: ['ones', 'tens', 'hundreds', 'thousands'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'alternative_decomposition',
                    'multiple_representations',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare',
                    'roman_order',
                    'zero_concept'              // Understanding zero in place value
                ],
                include_zero: true,
                decomposition_format: 'all',
                roman_min: 1,
                roman_max: 100,
                roman_operations: ['roman_to_arabic', 'arabic_to_roman', 'roman_compare', 'roman_order', 'roman_sequence']
            }
        }
    },

    'N03_Y5_NPV': {
        id: 'N03_Y5_NPV',
        name: 'N03_Y5_NPV: Place Value to 1,000,000 & Roman Numerals to 1000',
        description: 'Determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M)',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: {
            1: {
                min_value: 10000,
                max_value: 100000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compose_simple',
                    'decompose_simple',
                    'roman_to_arabic',
                    'roman_year'                // NEW: Roman numeral years
                ],
                include_zero: true,
                decomposition_format: 'simple',
                roman_min: 1,
                roman_max: 100,
                roman_years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024]  // Common years
            },
            2: {
                min_value: 10000,
                max_value: 500000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_year'
                ],
                include_zero: true,
                decomposition_format: 'both',
                roman_min: 1,
                roman_max: 500,
                roman_years: [1066, 1215, 1588, 1666, 1815, 1914, 1945, 2000, 2020]
            },
            3: {
                min_value: 10000,
                max_value: 1000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare',
                    'roman_year'
                ],
                include_zero: true,
                decomposition_format: 'both',
                roman_min: 1,
                roman_max: 1000,                // Full M
                roman_years: [1066, 1215, 1492, 1588, 1666, 1776, 1815, 1914, 1945, 2000, 2024]
            },
            4: {
                min_value: 100000,
                max_value: 1000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'alternative_decomposition',
                    'multiple_representations',
                    'roman_to_arabic',
                    'arabic_to_roman',
                    'roman_compare',
                    'roman_year',
                    'roman_complex'             // More complex Roman numerals
                ],
                include_zero: true,
                decomposition_format: 'all',
                roman_min: 1,
                roman_max: 1000,
                roman_years: [753, 1066, 1215, 1492, 1588, 1666, 1776, 1789, 1815, 1914, 1945, 1969, 2000, 2024]
            }
        }
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
        parameters: {
            1: {
                min_value: 100000,
                max_value: 1000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compose_simple',
                    'decompose_simple',
                    'place_comparison'
                ],
                include_zero: true,
                decomposition_format: 'simple'
            },
            2: {
                min_value: 1000000,
                max_value: 5000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'place_comparison'
                ],
                include_zero: true,
                decomposition_format: 'both'
            },
            3: {
                min_value: 1000000,
                max_value: 10000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'],
                operations: [
                    'identify_digit',
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition',
                    'place_comparison',
                    'multiple_representations'
                ],
                include_zero: true,
                decomposition_format: 'both'
            },
            4: {
                min_value: 1000000,
                max_value: 10000000,
                places: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'],
                operations: [
                    'identify_place_value',
                    'digit_value',
                    'compare_place_values',
                    'expanded_form',
                    'standard_from_expanded',
                    'alternative_decomposition',
                    'place_comparison',
                    'multiple_representations',
                    'complex_place_value'       // Multi-step place value questions
                ],
                include_zero: true,
                decomposition_format: 'all'
            }
        }
    }
};
