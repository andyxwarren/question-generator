/**
 * Question Engine
 *
 * Central orchestration system for question generation
 * Manages generator registry and question creation
 */

import { getModule, getParameters } from '../curriculum/modules.js';
import countingGenerator from '../generators/N01_Y1_NPV_counting.js';
import bondsGenerator from '../generators/C01_Y1_CALC_bonds.js';
import multiplyGenerator from '../generators/C06_Y3_CALC_multiply.js';
import fractionsGenerator from '../generators/F02_Y4_FRAC_fractions.js';
import questionHistory from './questionHistory.js';

/**
 * Question Engine Class
 */
class QuestionEngine {
    constructor() {
        this.generators = new Map();
        this.registerDefaultGenerators();
    }

    /**
     * Register all default generators
     */
    registerDefaultGenerators() {
        this.register(countingGenerator);
        this.register(bondsGenerator);
        this.register(multiplyGenerator);
        this.register(fractionsGenerator);
    }

    /**
     * Register a question generator
     * @param {Object} generator - Generator object with moduleId and generate function
     */
    register(generator) {
        if (!generator.moduleId || !generator.generate) {
            throw new Error('Invalid generator: must have moduleId and generate function');
        }
        this.generators.set(generator.moduleId, generator.generate);
    }

    /**
     * Generate a single question
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @returns {Object|null} Question object or null if generation fails
     */
    generateOne(moduleId, level) {
        const generator = this.generators.get(moduleId);
        if (!generator) {
            console.error(`No generator found for module: ${moduleId}`);
            return null;
        }

        const params = getParameters(moduleId, level);
        if (!params) {
            console.error(`No parameters found for ${moduleId} level ${level}`);
            return null;
        }

        try {
            const question = generator(params, level);

            // Add unique ID and timestamp
            question.id = `${moduleId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            question.timestamp = Date.now();

            return question;
        } catch (error) {
            console.error(`Error generating question for ${moduleId}:`, error);
            return null;
        }
    }

    /**
     * Generate multiple questions (with deduplication)
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @param {number} count - Number of questions to generate
     * @param {boolean} checkHistory - Whether to check question history (default: true)
     * @returns {Array} Array of question objects
     */
    generate(moduleId, level, count = 10, checkHistory = true) {
        const questions = [];
        const maxAttempts = count * 10; // Increased to account for duplicate skipping
        let attempts = 0;
        let skippedDuplicates = 0;

        // Clean up expired entries before generating
        if (checkHistory) {
            questionHistory.cleanup();
        }

        while (questions.length < count && attempts < maxAttempts) {
            const question = this.generateOne(moduleId, level);

            if (question) {
                // Check if this question has been seen recently
                if (checkHistory && questionHistory.hasQuestionBeenSeen(question)) {
                    skippedDuplicates++;
                    attempts++;
                    continue; // Skip this duplicate question
                }

                // Add question and mark as seen
                questions.push(question);

                if (checkHistory) {
                    questionHistory.markQuestionAsSeen(question);
                }
            }

            attempts++;
        }

        if (questions.length < count) {
            console.warn(`Only generated ${questions.length} out of ${count} requested questions (${skippedDuplicates} duplicates skipped)`);
        } else if (skippedDuplicates > 0) {
            console.log(`Successfully generated ${questions.length} questions (${skippedDuplicates} duplicates skipped)`);
        }

        return questions;
    }

    /**
     * Get generator for a module
     * @param {string} moduleId - Module identifier
     * @returns {Function|null} Generator function or null
     */
    getGenerator(moduleId) {
        return this.generators.get(moduleId) || null;
    }

    /**
     * Check if generator exists for module
     * @param {string} moduleId - Module identifier
     * @returns {boolean} True if generator exists
     */
    hasGenerator(moduleId) {
        return this.generators.has(moduleId);
    }

    /**
     * Get all registered module IDs
     * @returns {string[]} Array of module IDs with generators
     */
    getRegisteredModules() {
        return Array.from(this.generators.keys());
    }

    /**
     * Get question history statistics
     * @returns {Object} History statistics
     */
    getHistoryStats() {
        return questionHistory.getStats();
    }

    /**
     * Clear question history
     */
    clearHistory() {
        questionHistory.clear();
    }

    /**
     * Set cooldown period for question history
     * @param {number} hours - Cooldown period in hours
     */
    setCooldown(hours) {
        questionHistory.setCooldown(hours);
    }

    /**
     * Get current cooldown period
     * @returns {number} Cooldown in hours
     */
    getCooldownHours() {
        return questionHistory.getCooldownHours();
    }
}

// Create and export singleton instance
const engine = new QuestionEngine();
export default engine;
