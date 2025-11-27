/**
 * Module Filtering Utilities
 *
 * Provides filtering functions to select modules by strand, substrand, year, or ID.
 * Filters combine with AND logic when multiple criteria are specified.
 */

import { MODULES } from '../curriculum/parameters.js';

/**
 * Filter modules by various criteria
 * @param {Object} filters - Filter criteria
 * @param {string} [filters.moduleId] - Specific module ID (exact match)
 * @param {string} [filters.strand] - Strand name (partial match)
 * @param {string} [filters.substrand] - Substrand name (exact match)
 * @param {number|string} [filters.year] - Year group (1-6)
 * @returns {Object[]} Array of matching module objects
 */
export function filterModules({ moduleId, strand, substrand, year } = {}) {
    let modules = Object.values(MODULES);

    // Specific module ID takes precedence
    if (moduleId) {
        const module = modules.find(m => m.id === moduleId);
        return module ? [module] : [];
    }

    // Filter by strand (partial match to handle "Number and Place Value" vs "Number")
    if (strand) {
        const strandLower = strand.toLowerCase();
        modules = modules.filter(m =>
            m.strand.toLowerCase().includes(strandLower)
        );
    }

    // Filter by substrand (exact match)
    if (substrand) {
        modules = modules.filter(m => m.substrand === substrand);
    }

    // Filter by year group
    if (year) {
        const yearStr = String(year);
        modules = modules.filter(m => m.yearGroup === yearStr);
    }

    return modules;
}

/**
 * List modules with summary information
 * @param {Object} filters - Same as filterModules
 * @returns {Object[]} Array of module summaries
 */
export function listModules(filters = {}) {
    return filterModules(filters).map(m => ({
        id: m.id,
        name: m.name,
        year: m.yearGroup,
        strand: m.strand,
        substrand: m.substrand,
        description: m.description
    }));
}

/**
 * Get all unique strands
 * @returns {string[]} Array of strand names
 */
export function getStrands() {
    const strands = new Set(Object.values(MODULES).map(m => m.strand));
    return [...strands].sort();
}

/**
 * Get all unique substrands, optionally filtered by strand
 * @param {string} [strand] - Optional strand filter
 * @returns {string[]} Array of substrand names
 */
export function getSubstrands(strand) {
    let modules = Object.values(MODULES);

    if (strand) {
        const strandLower = strand.toLowerCase();
        modules = modules.filter(m => m.strand.toLowerCase().includes(strandLower));
    }

    const substrands = new Set(modules.map(m => m.substrand));
    return [...substrands].sort();
}

/**
 * Get all year groups that have modules
 * @returns {string[]} Array of year groups (e.g., ["1", "2", "3", "4", "5", "6"])
 */
export function getYearGroups() {
    const years = new Set(Object.values(MODULES).map(m => m.yearGroup));
    return [...years].sort((a, b) => Number(a) - Number(b));
}

/**
 * Get module count summary
 * @param {Object} filters - Same as filterModules
 * @returns {Object} Summary object with counts
 */
export function getModuleSummary(filters = {}) {
    const modules = filterModules(filters);

    const byStrand = {};
    const byYear = {};

    modules.forEach(m => {
        byStrand[m.strand] = (byStrand[m.strand] || 0) + 1;
        byYear[m.yearGroup] = (byYear[m.yearGroup] || 0) + 1;
    });

    return {
        total: modules.length,
        byStrand,
        byYear
    };
}

export default {
    filterModules,
    listModules,
    getStrands,
    getSubstrands,
    getYearGroups,
    getModuleSummary
};
