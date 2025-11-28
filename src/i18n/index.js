/**
 * i18n Module - Main API
 *
 * Provides internationalization support for the question generator.
 * Allows questions to be stored with typed values and rendered for any locale.
 */

export { format, render } from './formatter.js';
export { getLocale, listLocales, DEFAULT_LOCALE } from './locales/index.js';
export { VALUE_TYPES, isTypedValue, validateTypedValue, toBaseUnits, fromBaseUnits } from './types.js';
export {
    currency,
    currencyMajor,
    length,
    lengthFrom,
    mass,
    massFrom,
    capacity,
    capacityFrom,
    fraction,
    integer,
    decimal,
    isTyped,
    rawValue
} from './helpers.js';

// Re-export locales for direct access
export { default as enGB } from './locales/en-GB.js';
export { default as enUS } from './locales/en-US.js';
