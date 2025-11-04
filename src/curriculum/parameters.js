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
 * - C02_written.js - Written addition and subtraction methods (Years 1-5)
 * - C03_estimation.js - Estimation, inverses and checking (Years 2-6)
 * - C04_problems.js - Add/subtract to solve problems (Years 1-6)
 * - C05_properties.js - Properties of number: multiples, factors, primes, squares, cubes (Years 5-6)
 * - C06_mental_multiply_divide.js - Mental multiplication and division (Years 2-6)
 * - C07_written_multiply_divide.js - Written multiplication and division methods (Years 2-6)
 * - C08_properties.js - Problem-solving with mathematical properties and all four operations (Years 1-6)
 * - C09_order.js - Order of operations (Year 6)
 * - M01_measurement.js - Compare, describe and order measures (Years 1-4)
 * - M02_measurement_scales.js - Estimate, measure and read scales (Years 1-4)
 * - M03_money.js - Money (Years 1-3)
 * - M04_time.js - Telling time, ordering time, duration and units of time (Years 1-5)
 * - M05_conversions.js - Convert between metric units (Year 5)
 * - M06_conversions_mixed.js - Convert between different units including imperial/metric (Years 4-6)
 * - M07_perimeter_area.js - Perimeter and area (Years 3-6)
 * - M08_volume.js - Volume (Years 5-6)
 * - M09_problems.js - Measurement problem solving (Years 2-6)
 */

import { N01_MODULES } from './parameters/N01_counting.js';
import { N02_MODULES } from './parameters/N02_readwrite.js';
import { N03_MODULES } from './parameters/N03_placevalue.js';
import { N04_MODULES } from './parameters/N04_representation.js';
import { N05_MODULES } from './parameters/N05_negatives.js';
import { N06_MODULES } from './parameters/N06_problems.js';
import { C01_MODULES } from './parameters/C01_mental.js';
import { C02_MODULES } from './parameters/C02_written.js';
import { C03_MODULES } from './parameters/C03_estimation.js';
import { C04_MODULES } from './parameters/C04_problems.js';
import { C05_MODULES } from './parameters/C05_properties.js';
import { C06_MODULES } from './parameters/C06_mental_multiply_divide.js';
import { C07_MODULES } from './parameters/C07_written_multiply_divide.js';
import { C08_MODULES } from './parameters/C08_properties.js';
import { C09_MODULES } from './parameters/C09_order.js'
import { M01_MODULES } from './parameters/M01_measurement.js';
import { M02_MODULES } from './parameters/M02_measurement_scales.js';
import { M03_MODULES } from './parameters/M03_money.js';
import { M04_MODULES } from './parameters/M04_time.js';
import { M05_MODULES } from './parameters/M05_conversions.js';
import { M06_MODULES } from './parameters/M06_conversions_mixed.js';
import { M07_MODULES } from './parameters/M07_perimeter_area.js';
import { M08_MODULES } from './parameters/M08_volume.js';
import { M09_MODULES } from './parameters/M09_problems.js';

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
    ...C02_MODULES,
    ...C03_MODULES,
    ...C04_MODULES,
    ...C05_MODULES,
    ...C06_MODULES,
    ...C07_MODULES,
    ...C08_MODULES,
    ...C09_MODULES,
    ...M01_MODULES,
    ...M02_MODULES,
    ...M03_MODULES,
    ...M04_MODULES,
    ...M05_MODULES,
    ...M06_MODULES,
    ...M07_MODULES,
    ...M08_MODULES,
    ...M09_MODULES
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
