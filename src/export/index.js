/**
 * Export API
 *
 * Main entry point for the export layer.
 * Orchestrates question generation with filtering and formatting.
 */

import engine from '../core/questionEngine.js';
import { filterModules, listModules, getStrands, getSubstrands, getYearGroups, getModuleSummary } from './filters.js';
import { formatAsJson, formatAsCsv, formatAsPretty, formatModuleList } from './formatters.js';

/**
 * Generate questions for specified modules and levels
 * @param {Object} options - Generation options
 * @param {Object[]} options.modules - Array of module objects (from filterModules)
 * @param {number[]} options.levels - Array of difficulty levels (1-4)
 * @param {number} [options.count=10] - Questions per module/level combination
 * @returns {Object[]} Array of enriched question objects
 */
export function generate({ modules, levels, count = 10 }) {
    const questions = [];

    for (const module of modules) {
        for (const level of levels) {
            // Skip if module doesn't have parameters for this level
            if (!module.parameters || !module.parameters[level]) {
                continue;
            }

            try {
                const batch = engine.generate(module.id, level, count);

                // Enrich each question with curriculum metadata and params
                batch.forEach(q => {
                    // Add curriculum context
                    q.curriculum = {
                        strand: module.strand,
                        substrand: module.substrand,
                        yearGroup: module.yearGroup,
                        ref: module.ref,
                        description: module.description
                    };

                    // Add generation parameters
                    q.params = module.parameters[level];

                    // Extract presentation from params if not already on question
                    if (!q.presentation && module.parameters[level].presentation) {
                        q.presentation = module.parameters[level].presentation;
                    }
                });

                questions.push(...batch);
            } catch (error) {
                console.error(`Error generating for ${module.id} level ${level}:`, error.message);
            }
        }
    }

    return questions;
}

/**
 * Generate and format questions in one call
 * @param {Object} options - Options
 * @param {Object} options.filters - Filter criteria for modules
 * @param {number[]} options.levels - Difficulty levels
 * @param {number} options.count - Questions per module/level
 * @param {string} options.format - Output format: 'json', 'csv', 'pretty'
 * @returns {string} Formatted output
 */
export function generateAndFormat({ filters = {}, levels = [3], count = 10, format = 'json' }) {
    const modules = filterModules(filters);

    if (modules.length === 0) {
        return format === 'json'
            ? JSON.stringify({ error: 'No modules match the specified filters', filters }, null, 2)
            : 'No modules match the specified filters.';
    }

    const questions = generate({ modules, levels, count });

    const metadata = {
        filters,
        levels
    };

    switch (format) {
        case 'csv':
            return formatAsCsv(questions);
        case 'pretty':
            return formatAsPretty(questions);
        case 'json':
        default:
            return formatAsJson(questions, metadata);
    }
}

// Re-export everything for convenience
export {
    filterModules,
    listModules,
    getStrands,
    getSubstrands,
    getYearGroups,
    getModuleSummary,
    formatAsJson,
    formatAsCsv,
    formatAsPretty,
    formatModuleList
};

export default {
    generate,
    generateAndFormat,
    filterModules,
    listModules,
    getStrands,
    getSubstrands,
    getYearGroups,
    getModuleSummary,
    formatAsJson,
    formatAsCsv,
    formatAsPretty,
    formatModuleList
};
