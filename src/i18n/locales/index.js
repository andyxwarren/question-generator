/**
 * Locale Registry
 */

import enGB from './en-GB.js';
import enUS from './en-US.js';

export const locales = {
    'en-GB': enGB,
    'en-US': enUS
};

export const DEFAULT_LOCALE = 'en-GB';

/**
 * Get a locale by ID
 * @param {string} localeId - Locale identifier (e.g., 'en-GB', 'en-US')
 * @returns {object} Locale configuration
 */
export function getLocale(localeId) {
    const locale = locales[localeId];
    if (!locale) {
        console.warn(`Unknown locale '${localeId}', falling back to ${DEFAULT_LOCALE}`);
        return locales[DEFAULT_LOCALE];
    }
    return locale;
}

/**
 * List available locales
 * @returns {Array<{id: string, name: string}>}
 */
export function listLocales() {
    return Object.values(locales).map(locale => ({
        id: locale.id,
        name: locale.name
    }));
}

export default { locales, DEFAULT_LOCALE, getLocale, listLocales };
