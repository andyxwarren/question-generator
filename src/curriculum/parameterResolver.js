/**
 * Parameter Resolver
 *
 * Resolves system-specific parameters based on locale.
 * Handles the metric/imperial parameter structure so generators
 * receive flattened parameters without needing to know about measurement systems.
 */

import { getLocale, DEFAULT_LOCALE } from '../i18n/locales/index.js';

/**
 * Resolve parameters for a specific locale
 * Extracts the appropriate measurement system section (metric/imperial)
 * and flattens it into the main math object.
 *
 * @param {Object} params - Level parameters with potential metric/imperial sections
 * @param {string} localeId - Locale identifier
 * @returns {Object} Resolved parameters with system-specific values
 */
export function resolveParameters(params, localeId = DEFAULT_LOCALE) {
    if (!params) return null;

    const locale = getLocale(localeId);
    const system = locale.measurementSystem || 'metric';

    // If params don't have metric/imperial structure, return as-is
    if (!params.math || (!params.math.metric && !params.math.imperial)) {
        return {
            ...params,
            _resolvedSystem: system
        };
    }

    // Get the system-specific parameters, falling back to metric
    const systemParams = params.math[system] || params.math.metric;

    if (!systemParams) {
        return {
            ...params,
            _resolvedSystem: system
        };
    }

    // Merge system-specific params into math, removing metric/imperial keys
    const resolvedMath = {
        ...params.math,
        ...systemParams
    };

    // Remove the metric/imperial keys from resolved params
    delete resolvedMath.metric;
    delete resolvedMath.imperial;

    return {
        ...params,
        math: resolvedMath,
        _resolvedSystem: system
    };
}

/**
 * Check if parameters have measurement system sections
 * @param {Object} params - Level parameters
 * @returns {boolean} True if has metric or imperial sections
 */
export function hasMeasurementSystemParams(params) {
    return params?.math?.metric !== undefined || params?.math?.imperial !== undefined;
}

/**
 * Get the measurement system for a locale
 * @param {string} localeId - Locale identifier
 * @returns {string} 'metric' or 'imperial'
 */
export function getMeasurementSystem(localeId = DEFAULT_LOCALE) {
    const locale = getLocale(localeId);
    return locale.measurementSystem || 'metric';
}

export default {
    resolveParameters,
    hasMeasurementSystemParams,
    getMeasurementSystem
};
