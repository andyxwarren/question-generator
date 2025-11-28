/**
 * US English (en-US) Locale
 */

export default {
    id: 'en-US',
    name: 'English (US)',

    currency: {
        code: 'USD',
        symbol: '$',
        minorSymbol: '\u00a2',      // ¢ (cent sign)
        symbolPosition: 'before',   // $10
        minorPosition: 'after',     // 50¢
        decimalSeparator: '.',
        thousandsSeparator: ',',
        minorUnitsPerMajor: 100
    },

    units: {
        length: {
            mm: 'mm',
            cm: 'cm',
            m: 'm',
            km: 'km'
        },
        mass: {
            g: 'g',
            kg: 'kg'
        },
        capacity: {
            ml: 'mL',   // US prefers uppercase L
            l: 'L'
        }
    },

    // US spelling variants
    spelling: {
        metre: 'meter',
        metres: 'meters',
        litre: 'liter',
        litres: 'liters',
        colour: 'color',
        favourite: 'favorite'
    },

    // Fraction words (same as UK)
    fractionWords: {
        numerators: {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine',
            10: 'ten',
            11: 'eleven',
            12: 'twelve'
        },
        denominators: {
            2: 'half',
            3: 'third',
            4: 'quarter',
            5: 'fifth',
            6: 'sixth',
            7: 'seventh',
            8: 'eighth',
            9: 'ninth',
            10: 'tenth',
            12: 'twelfth'
        },
        denominatorsPlural: {
            2: 'halves',
            3: 'thirds',
            4: 'quarters',
            5: 'fifths',
            6: 'sixths',
            7: 'sevenths',
            8: 'eighths',
            9: 'ninths',
            10: 'tenths',
            12: 'twelfths'
        }
    },

    // Ordinal suffixes (same as UK)
    ordinals: {
        suffixes: {
            1: 'st',
            2: 'nd',
            3: 'rd',
            default: 'th'
        },
        exceptions: [11, 12, 13]
    },

    // Number formatting
    number: {
        decimalSeparator: '.',
        thousandsSeparator: ','
    }
};
