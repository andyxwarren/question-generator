/**
 * Curriculum Module Definitions - Central Index
 *
 * This file imports and merges all parameter modules.
 * Individual module series are defined in separate files for maintainability.
 *
 * Organization:
 * - N01_counting.js - Counting in multiples (Years 1-5)
 * - N02_readwrite.js - Read, write, order and compare (Years 2-6)
 * - N03_placevalue.js - Place value & Roman numerals (Years 2-6)
 * - N04_representation.js - Identify, represent, estimate (Years 1-6)
 * - N05_negatives.js - Negative numbers (Years 4-6)
 * - N06_problems.js - Number problems (Years 2-6)
 * - C01_mental.js - Mental addition and subtraction (Years 1, 2, 3, 5)
 */

import { N01_MODULES } from './parameters/N01_counting.js';
import { N02_MODULES } from './parameters/N02_readwrite.js';
import { N03_MODULES } from './parameters/N03_placevalue.js';
import { N04_MODULES } from './parameters/N04_representation.js';
import { N05_MODULES } from './parameters/N05_negatives.js';
import { N06_MODULES } from './parameters/N06_problems.js';
import { C01_MODULES } from './parameters/C01_mental.js';

/**
 * Merged modules object
 * Combines all module series into single registry
 */
export const MODULES = {
    ...N01_MODULES,
    ...N02_MODULES,
    ...N03_MODULES,
    ...N04_MODULES,
    ...N05_MODULES,
    ...N06_MODULES,
    ...C01_MODULES,
};

/**
 * Get a module by ID
 * @param {string} moduleId - The module identifier
 * @returns {Object|null} Module object or null if not found
 */
export function getModule(moduleId) {
    return MODULES[moduleId] || null;
}

/**
 * Get parameters for a specific module and level
 * @param {string} moduleId - The module identifier
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object|null} Parameters object for the specified level
 */
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return null;
    return module.parameters[level] || null;
}

/**
 * Get all available module IDs
 * @returns {string[]} Array of module IDs
 */
export function getModuleIds() {
    return Object.keys(MODULES);
}

/**
 * Get modules by strand
 * @param {string} strand - Strand name
 * @returns {Object[]} Array of modules in that strand
 */
export function getModulesByStrand(strand) {
    return Object.values(MODULES).filter(m => m.strand === strand);
}

/**
 * Get modules by year group
 * @param {string} yearGroup - Year group (e.g., "Year 3")
 * @returns {Object[]} Array of modules for that year
 */
export function getModulesByYear(yearGroup) {
    return Object.values(MODULES).filter(m => m.yearGroup === yearGroup);
}

/**
 * Validate level number
 * @param {number} level - Level to validate
 * @returns {boolean} True if valid
 */
export function isValidLevel(level) {
    return [1, 2, 3, 4].includes(level);
}
