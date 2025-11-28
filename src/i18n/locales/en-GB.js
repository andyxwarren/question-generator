/**
 * UK English (en-GB) Locale
 */

export default {
    id: 'en-GB',
    name: 'English (UK)',

    currency: {
        code: 'GBP',
        symbol: '\u00a3',           // £
        minorSymbol: 'p',           // pence
        symbolPosition: 'before',   // £10 vs 10€
        minorPosition: 'after',     // 50p
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
            ml: 'ml',
            l: 'l'
        }
    },

    // UK spelling variants
    spelling: {
        metre: 'metre',
        metres: 'metres',
        litre: 'litre',
        litres: 'litres',
        colour: 'colour',
        favourite: 'favourite'
    },

    // Fraction words
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

    // Ordinal suffixes
    ordinals: {
        suffixes: {
            1: 'st',
            2: 'nd',
            3: 'rd',
            default: 'th'
        },
        // Special cases for 11, 12, 13
        exceptions: [11, 12, 13]
    },

    // Number formatting
    number: {
        decimalSeparator: '.',
        thousandsSeparator: ','
    }
};
