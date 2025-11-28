/**
 * i18n Formatter
 *
 * Formats typed values according to locale settings.
 */

import { isTypedValue, fromBaseUnits } from './types.js';
import { getLocale, DEFAULT_LOCALE } from './locales/index.js';

/**
 * Format a typed value according to locale
 * @param {object} typedValue - Typed value object {_v, _t, _d}
 * @param {string} localeId - Locale identifier
 * @returns {string} Formatted string
 */
export function format(typedValue, localeId = DEFAULT_LOCALE) {
    if (!isTypedValue(typedValue)) {
        // Not a typed value - return as-is
        return String(typedValue);
    }

    const locale = getLocale(localeId);
    const { _v: value, _t: type, _d: hint } = typedValue;

    switch (type) {
        case 'currency':
            return formatCurrency(value, hint || 'major', locale);
        case 'length':
            return formatLength(value, hint || 'mm', locale);
        case 'mass':
            return formatMass(value, hint || 'g', locale);
        case 'capacity':
            return formatCapacity(value, hint || 'ml', locale);
        case 'fraction':
            return formatFraction(value, hint || 'numeric', locale);
        case 'integer':
            return formatInteger(value, hint || 'plain', locale);
        case 'decimal':
            return formatDecimal(value, hint || 'plain', locale);
        default:
            return String(value);
    }
}

/**
 * Format currency value
 * @param {number} minorUnits - Value in minor units (pence/cents)
 * @param {string} displayHint - 'major', 'minor', or 'mixed'
 * @param {object} locale - Locale configuration
 */
function formatCurrency(minorUnits, displayHint, locale) {
    const { currency } = locale;
    const majorUnits = Math.floor(minorUnits / currency.minorUnitsPerMajor);
    const remainingMinor = minorUnits % currency.minorUnitsPerMajor;

    switch (displayHint) {
        case 'major': {
            // Always show as decimal (e.g., £6.13, $6.13)
            const decimalValue = minorUnits / currency.minorUnitsPerMajor;
            const formatted = formatNumber(decimalValue, 2, locale);
            return currency.symbolPosition === 'before'
                ? `${currency.symbol}${formatted}`
                : `${formatted}${currency.symbol}`;
        }
        case 'minor': {
            // Show as minor units only (e.g., 613p, 613¢)
            return currency.minorPosition === 'after'
                ? `${minorUnits}${currency.minorSymbol}`
                : `${currency.minorSymbol}${minorUnits}`;
        }
        case 'mixed': {
            // Show as mixed (e.g., £6 13p, $6 13¢)
            if (remainingMinor === 0) {
                return currency.symbolPosition === 'before'
                    ? `${currency.symbol}${majorUnits}`
                    : `${majorUnits}${currency.symbol}`;
            }
            const majorPart = currency.symbolPosition === 'before'
                ? `${currency.symbol}${majorUnits}`
                : `${majorUnits}${currency.symbol}`;
            const minorPart = currency.minorPosition === 'after'
                ? `${remainingMinor}${currency.minorSymbol}`
                : `${currency.minorSymbol}${remainingMinor}`;
            return `${majorPart} ${minorPart}`;
        }
        default:
            return formatCurrency(minorUnits, 'major', locale);
    }
}

/**
 * Format length value
 * @param {number} mm - Value in millimeters
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatLength(mm, displayHint, locale) {
    const units = locale.units.length;

    switch (displayHint) {
        case 'mm':
            return `${mm}${units.mm}`;
        case 'cm':
            return `${mm / 10}${units.cm}`;
        case 'm':
            return `${mm / 1000}${units.m}`;
        case 'km':
            return `${mm / 1000000}${units.km}`;
        case 'mixed_m_cm': {
            const m = Math.floor(mm / 1000);
            const cm = Math.round((mm % 1000) / 10);
            if (cm === 0) return `${m}${units.m}`;
            if (m === 0) return `${cm}${units.cm}`;
            return `${m}${units.m} ${cm}${units.cm}`;
        }
        case 'mixed_km_m': {
            const km = Math.floor(mm / 1000000);
            const m = Math.round((mm % 1000000) / 1000);
            if (m === 0) return `${km}${units.km}`;
            if (km === 0) return `${m}${units.m}`;
            return `${km}${units.km} ${m}${units.m}`;
        }
        default:
            return `${mm}${units.mm}`;
    }
}

/**
 * Format mass value
 * @param {number} g - Value in grams
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatMass(g, displayHint, locale) {
    const units = locale.units.mass;

    switch (displayHint) {
        case 'g':
            return `${g}${units.g}`;
        case 'kg':
            return `${g / 1000}${units.kg}`;
        case 'mixed_kg_g': {
            const kg = Math.floor(g / 1000);
            const grams = g % 1000;
            if (grams === 0) return `${kg}${units.kg}`;
            if (kg === 0) return `${grams}${units.g}`;
            return `${kg}${units.kg} ${grams}${units.g}`;
        }
        default:
            return `${g}${units.g}`;
    }
}

/**
 * Format capacity value
 * @param {number} ml - Value in milliliters
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatCapacity(ml, displayHint, locale) {
    const units = locale.units.capacity;

    switch (displayHint) {
        case 'ml':
            return `${ml}${units.ml}`;
        case 'l':
            return `${ml / 1000}${units.l}`;
        case 'mixed_l_ml': {
            const l = Math.floor(ml / 1000);
            const milliliters = ml % 1000;
            if (milliliters === 0) return `${l}${units.l}`;
            if (l === 0) return `${milliliters}${units.ml}`;
            return `${l}${units.l} ${milliliters}${units.ml}`;
        }
        default:
            return `${ml}${units.ml}`;
    }
}

/**
 * Format fraction value
 * @param {{n: number, d: number}} fraction - Numerator and denominator
 * @param {string} displayHint - 'numeric' or 'words'
 * @param {object} locale - Locale configuration
 */
function formatFraction(fraction, displayHint, locale) {
    const { n, d } = fraction;

    if (displayHint === 'words') {
        const { fractionWords } = locale;
        const numWord = fractionWords.numerators[n] || String(n);

        // Special case for "one half", "one quarter", etc.
        if (n === 1) {
            const denomWord = fractionWords.denominators[d] || `${d}th`;
            return `${numWord} ${denomWord}`;
        }

        // Plural: "two thirds", "three quarters"
        const denomWordPlural = fractionWords.denominatorsPlural[d] || `${d}ths`;
        return `${numWord} ${denomWordPlural}`;
    }

    // Numeric format: 1/2, 3/4
    return `${n}/${d}`;
}

/**
 * Format integer value
 * @param {number} value - Integer value
 * @param {string} displayHint - 'plain' or 'ordinal'
 * @param {object} locale - Locale configuration
 */
function formatInteger(value, displayHint, locale) {
    if (displayHint === 'ordinal') {
        return formatOrdinal(value, locale);
    }
    return formatNumber(value, 0, locale);
}

/**
 * Format decimal value
 * @param {number} value - Decimal value
 * @param {string} displayHint - Currently only 'plain'
 * @param {object} locale - Locale configuration
 */
function formatDecimal(value, displayHint, locale) {
    // Determine decimal places from value
    const str = String(value);
    const decimalPlaces = str.includes('.') ? str.split('.')[1].length : 0;
    return formatNumber(value, decimalPlaces, locale);
}

/**
 * Format a number with locale-specific separators
 * @param {number} value - Number to format
 * @param {number} decimalPlaces - Number of decimal places
 * @param {object} locale - Locale configuration
 */
function formatNumber(value, decimalPlaces, locale) {
    const { decimalSeparator, thousandsSeparator } = locale.number;

    const parts = value.toFixed(decimalPlaces).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    if (parts.length > 1) {
        return parts[0] + decimalSeparator + parts[1];
    }
    return parts[0];
}

/**
 * Format ordinal number (1st, 2nd, 3rd, etc.)
 * @param {number} n - Number
 * @param {object} locale - Locale configuration
 */
function formatOrdinal(n, locale) {
    const { ordinals } = locale;
    const lastTwo = n % 100;

    // Special cases: 11th, 12th, 13th
    if (ordinals.exceptions.includes(lastTwo)) {
        return `${n}${ordinals.suffixes.default}`;
    }

    const lastOne = n % 10;
    const suffix = ordinals.suffixes[lastOne] || ordinals.suffixes.default;
    return `${n}${suffix}`;
}

/**
 * Render a template string with typed values
 * @param {string} template - Template with {placeholder} syntax
 * @param {object} values - Map of placeholder names to typed values
 * @param {string} localeId - Locale identifier
 * @returns {string} Rendered string
 */
export function render(template, values, localeId = DEFAULT_LOCALE) {
    if (!template || !values) {
        return template || '';
    }

    return template.replace(/\{(\w+)\}/g, (match, key) => {
        if (key in values) {
            const value = values[key];
            if (isTypedValue(value)) {
                return format(value, localeId);
            }
            return String(value);
        }
        return match;  // Keep placeholder if no value
    });
}

export default { format, render };
