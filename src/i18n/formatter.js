/**
 * i18n Formatter
 *
 * Formats typed values according to locale settings.
 * Supports both metric and imperial measurement systems.
 */

import { isTypedValue, fromBaseUnits, getSystemFromHint } from './types.js';
import { getLocale, DEFAULT_LOCALE } from './locales/index.js';

/**
 * Imperial display hints for detection
 */
const IMPERIAL_HINTS = {
    length: ['in', 'ft', 'yd', 'mi', 'mixed_ft_in', 'mixed_yd_ft', 'mixed_mi_yd'],
    mass: ['oz', 'lb', 'mixed_lb_oz'],
    capacity: ['fl_oz', 'cup', 'pt', 'qt', 'gal', 'mixed_pt_cup', 'mixed_gal_qt']
};

/**
 * Check if a display hint is imperial
 * @param {string} type - Value type (length, mass, capacity)
 * @param {string} hint - Display hint
 * @returns {boolean}
 */
function isImperialHint(type, hint) {
    return IMPERIAL_HINTS[type]?.includes(hint) || false;
}

/**
 * Get units from locale for a specific measurement system
 * @param {object} locale - Locale configuration
 * @param {string} type - Value type (length, mass, capacity)
 * @param {string} system - Measurement system ('metric' or 'imperial')
 * @returns {object} Units object
 */
function getUnits(locale, type, system = 'metric') {
    // New structure: locale.units.metric.length or locale.units.imperial.length
    if (locale.units[system] && locale.units[system][type]) {
        return locale.units[system][type];
    }
    // Fallback to old flat structure for backwards compatibility
    if (locale.units[type]) {
        return locale.units[type];
    }
    // Default empty object
    return {};
}

/**
 * Format a typed value according to locale
 * @param {object} typedValue - Typed value object {_v, _t, _d, _s}
 * @param {string} localeId - Locale identifier
 * @returns {string} Formatted string
 */
export function format(typedValue, localeId = DEFAULT_LOCALE) {
    if (!isTypedValue(typedValue)) {
        // Not a typed value - return as-is
        return String(typedValue);
    }

    const locale = getLocale(localeId);
    const { _v: value, _t: type, _d: hint, _s: system } = typedValue;

    // Determine system from hint if not explicitly set
    const measurementSystem = system || (hint ? getSystemFromHint(type, hint) : 'metric');

    switch (type) {
        case 'currency':
            return formatCurrency(value, hint || 'major', locale);
        case 'length':
            if (isImperialHint('length', hint)) {
                return formatImperialLength(value, hint, locale);
            }
            return formatLength(value, hint || 'mm', locale);
        case 'mass':
            if (isImperialHint('mass', hint)) {
                return formatImperialMass(value, hint, locale);
            }
            return formatMass(value, hint || 'g', locale);
        case 'capacity':
            if (isImperialHint('capacity', hint)) {
                return formatImperialCapacity(value, hint, locale);
            }
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
 * Format length value (metric)
 * @param {number} mm - Value in millimeters
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatLength(mm, displayHint, locale) {
    const units = getUnits(locale, 'length', 'metric');

    switch (displayHint) {
        case 'mm':
            return `${mm}${units.mm || 'mm'}`;
        case 'cm':
            return `${mm / 10}${units.cm || 'cm'}`;
        case 'm':
            return `${mm / 1000}${units.m || 'm'}`;
        case 'km':
            return `${mm / 1000000}${units.km || 'km'}`;
        case 'mixed_m_cm': {
            const m = Math.floor(mm / 1000);
            const cm = Math.round((mm % 1000) / 10);
            if (cm === 0) return `${m}${units.m || 'm'}`;
            if (m === 0) return `${cm}${units.cm || 'cm'}`;
            return `${m}${units.m || 'm'} ${cm}${units.cm || 'cm'}`;
        }
        case 'mixed_km_m': {
            const km = Math.floor(mm / 1000000);
            const m = Math.round((mm % 1000000) / 1000);
            if (m === 0) return `${km}${units.km || 'km'}`;
            if (km === 0) return `${m}${units.m || 'm'}`;
            return `${km}${units.km || 'km'} ${m}${units.m || 'm'}`;
        }
        default:
            return `${mm}${units.mm || 'mm'}`;
    }
}

/**
 * Format length value (imperial)
 * @param {number} inches - Value in inches
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatImperialLength(inches, displayHint, locale) {
    const units = getUnits(locale, 'length', 'imperial');

    switch (displayHint) {
        case 'in':
            return `${inches}${units.in || 'in'}`;
        case 'ft':
            return `${inches / 12}${units.ft || 'ft'}`;
        case 'yd':
            return `${inches / 36}${units.yd || 'yd'}`;
        case 'mi':
            return `${inches / 63360}${units.mi || 'mi'}`;
        case 'mixed_ft_in': {
            const ft = Math.floor(inches / 12);
            const remainingIn = inches % 12;
            if (remainingIn === 0) return `${ft}${units.ft || 'ft'}`;
            if (ft === 0) return `${remainingIn}${units.in || 'in'}`;
            return `${ft}${units.ft || 'ft'} ${remainingIn}${units.in || 'in'}`;
        }
        case 'mixed_yd_ft': {
            const yd = Math.floor(inches / 36);
            const remainingFt = Math.floor((inches % 36) / 12);
            if (remainingFt === 0) return `${yd}${units.yd || 'yd'}`;
            if (yd === 0) return `${remainingFt}${units.ft || 'ft'}`;
            return `${yd}${units.yd || 'yd'} ${remainingFt}${units.ft || 'ft'}`;
        }
        case 'mixed_mi_yd': {
            const mi = Math.floor(inches / 63360);
            const remainingYd = Math.floor((inches % 63360) / 36);
            if (remainingYd === 0) return `${mi}${units.mi || 'mi'}`;
            if (mi === 0) return `${remainingYd}${units.yd || 'yd'}`;
            return `${mi}${units.mi || 'mi'} ${remainingYd}${units.yd || 'yd'}`;
        }
        default:
            return `${inches}${units.in || 'in'}`;
    }
}

/**
 * Format mass value (metric)
 * @param {number} g - Value in grams
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatMass(g, displayHint, locale) {
    const units = getUnits(locale, 'mass', 'metric');

    switch (displayHint) {
        case 'g':
            return `${g}${units.g || 'g'}`;
        case 'kg':
            return `${g / 1000}${units.kg || 'kg'}`;
        case 'mixed_kg_g': {
            const kg = Math.floor(g / 1000);
            const grams = g % 1000;
            if (grams === 0) return `${kg}${units.kg || 'kg'}`;
            if (kg === 0) return `${grams}${units.g || 'g'}`;
            return `${kg}${units.kg || 'kg'} ${grams}${units.g || 'g'}`;
        }
        default:
            return `${g}${units.g || 'g'}`;
    }
}

/**
 * Format mass value (imperial)
 * @param {number} oz - Value in ounces
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatImperialMass(oz, displayHint, locale) {
    const units = getUnits(locale, 'mass', 'imperial');

    switch (displayHint) {
        case 'oz':
            return `${oz}${units.oz || 'oz'}`;
        case 'lb':
            return `${oz / 16}${units.lb || 'lb'}`;
        case 'mixed_lb_oz': {
            const lb = Math.floor(oz / 16);
            const remainingOz = oz % 16;
            if (remainingOz === 0) return `${lb}${units.lb || 'lb'}`;
            if (lb === 0) return `${remainingOz}${units.oz || 'oz'}`;
            return `${lb}${units.lb || 'lb'} ${remainingOz}${units.oz || 'oz'}`;
        }
        default:
            return `${oz}${units.oz || 'oz'}`;
    }
}

/**
 * Format capacity value (metric)
 * @param {number} ml - Value in milliliters
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatCapacity(ml, displayHint, locale) {
    const units = getUnits(locale, 'capacity', 'metric');

    switch (displayHint) {
        case 'ml':
            return `${ml}${units.ml || 'ml'}`;
        case 'l':
            return `${ml / 1000}${units.l || 'l'}`;
        case 'mixed_l_ml': {
            const l = Math.floor(ml / 1000);
            const milliliters = ml % 1000;
            if (milliliters === 0) return `${l}${units.l || 'l'}`;
            if (l === 0) return `${milliliters}${units.ml || 'ml'}`;
            return `${l}${units.l || 'l'} ${milliliters}${units.ml || 'ml'}`;
        }
        default:
            return `${ml}${units.ml || 'ml'}`;
    }
}

/**
 * Format capacity value (imperial)
 * @param {number} flOz - Value in fluid ounces
 * @param {string} displayHint - Target unit or mixed format
 * @param {object} locale - Locale configuration
 */
function formatImperialCapacity(flOz, displayHint, locale) {
    const units = getUnits(locale, 'capacity', 'imperial');

    switch (displayHint) {
        case 'fl_oz':
            return `${flOz}${units.fl_oz || 'fl oz'}`;
        case 'cup':
            return `${flOz / 8}${units.cup || ' cup'}`;
        case 'pt':
            return `${flOz / 16}${units.pt || 'pt'}`;
        case 'qt':
            return `${flOz / 32}${units.qt || 'qt'}`;
        case 'gal':
            return `${flOz / 128}${units.gal || 'gal'}`;
        case 'mixed_pt_cup': {
            const pt = Math.floor(flOz / 16);
            const remainingCups = Math.floor((flOz % 16) / 8);
            if (remainingCups === 0) return `${pt}${units.pt || 'pt'}`;
            if (pt === 0) return `${remainingCups}${units.cup || ' cup'}`;
            return `${pt}${units.pt || 'pt'} ${remainingCups}${units.cup || ' cup'}`;
        }
        case 'mixed_gal_qt': {
            const gal = Math.floor(flOz / 128);
            const remainingQt = Math.floor((flOz % 128) / 32);
            if (remainingQt === 0) return `${gal}${units.gal || 'gal'}`;
            if (gal === 0) return `${remainingQt}${units.qt || 'qt'}`;
            return `${gal}${units.gal || 'gal'} ${remainingQt}${units.qt || 'qt'}`;
        }
        default:
            return `${flOz}${units.fl_oz || 'fl oz'}`;
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
