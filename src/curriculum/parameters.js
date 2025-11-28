/**
 * Central Parameters Registry
 *
 * Aggregates all module definitions from individual parameter files.
 * V2 Nested Schema: All modules use math/presentation separation.
 */

// Import module series
import { N01_MODULES } from './parameters/N01_counting.js';
import { F01_MODULES } from './parameters/F01_fractions.js';
import { M01_MODULES } from './parameters/M01_measurement.js';

/**
 * All modules indexed by module ID
 */
export const ALL_MODULES = {
    ...N01_MODULES,
    ...F01_MODULES,
    ...M01_MODULES
};

/**
 * Get module by ID
 * @param {string} moduleId - Module ID (e.g., 'N01_Y1_NPV')
 * @returns {Object|null} Module object or null if not found
 */
export function getModule(moduleId) {
    return ALL_MODULES[moduleId] || null;
}

/**
 * Get parameters for a specific module and level
 * @param {string} moduleId - Module ID
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object|null} Parameters object or null if not found
 */
export function getParameters(moduleId, level) {
    const module = getModule(moduleId);
    if (!module || !module.parameters) {
        return null;
    }
    return module.parameters[level] || null;
}

/**
 * Get all available module IDs
 * @returns {string[]} Array of module IDs
 */
export function getModuleIds() {
    return Object.keys(ALL_MODULES);
}

/**
 * Get modules by strand
 * @param {string} strand - Strand name
 * @returns {Object[]} Array of module objects
 */
export function getModulesByStrand(strand) {
    return Object.values(ALL_MODULES).filter(m => m.strand === strand);
}

/**
 * Get modules by year group
 * @param {string} yearGroup - Year group (e.g., '1', '2', '3')
 * @returns {Object[]} Array of module objects
 */
export function getModulesByYear(yearGroup) {
    return Object.values(ALL_MODULES).filter(m => m.yearGroup === yearGroup);
}

/**
 * Get all strands
 * @returns {string[]} Array of unique strand names
 */
export function getAllStrands() {
    return [...new Set(Object.values(ALL_MODULES).map(m => m.strand))];
}

/**
 * Get all year groups
 * @returns {string[]} Array of unique year groups
 */
export function getAllYearGroups() {
    return [...new Set(Object.values(ALL_MODULES).map(m => m.yearGroup))].sort();
}
