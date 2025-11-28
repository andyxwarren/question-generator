/**
 * Question Engine
 *
 * Core registry and orchestration for question generators.
 * Follows registry pattern - generators register themselves on import.
 */

import { getParameters } from '../curriculum/parameters.js';

// Import all generators statically for synchronous registration
import N01_Y1_NPV_generator from '../generators/N01_Y1_NPV_counting.js';
import N01_Y2_NPV_generator from '../generators/N01_Y2_NPV_counting.js';
import N01_Y3_NPV_generator from '../generators/N01_Y3_NPV_counting.js';
import N01_Y4_NPV_generator from '../generators/N01_Y4_NPV_counting.js';
import N01_Y5_NPV_generator from '../generators/N01_Y5_NPV_counting.js';
import F01_Y1_FRAC_generator from '../generators/F01_Y1_FRAC_fractions.js';
import F01_Y2_FRAC_generator from '../generators/F01_Y2_FRAC_fractions.js';
import F01_Y3_FRAC_generator from '../generators/F01_Y3_FRAC_fractions.js';
import F01_Y4_FRAC_generator from '../generators/F01_Y4_FRAC_fractions.js';
import M01_Y4_MEAS_generator from '../generators/M01_Y4_MEAS_comparison.js';

/**
 * Question Engine Class
 * Maintains registry of generators and orchestrates question generation
 */
class QuestionEngine {
    constructor() {
        // Map of moduleId -> generator function
        this.generators = new Map();
        this.questionIdCounter = 0;
    }

    /**
     * Register a generator
     * @param {Object} generator - Generator object with { moduleId, generate }
     */
    register(generator) {
        if (!generator.moduleId || typeof generator.generate !== 'function') {
            throw new Error('Generator must have moduleId and generate function');
        }
        this.generators.set(generator.moduleId, generator.generate);
    }

    /**
     * Check if a generator exists for a module
     * @param {string} moduleId - Module ID
     * @returns {boolean} True if generator exists
     */
    hasGenerator(moduleId) {
        return this.generators.has(moduleId);
    }

    /**
     * Generate questions for a module at a specific level
     * @param {string} moduleId - Module ID
     * @param {number} level - Difficulty level (1-4)
     * @param {number} count - Number of questions to generate
     * @param {string} locale - Optional locale for formatting (default: en-GB)
     * @returns {Object[]} Array of question objects
     */
    generate(moduleId, level, count = 1, locale = 'en-GB') {
        // Get generator
        const generator = this.generators.get(moduleId);
        if (!generator) {
            throw new Error(`No generator registered for module: ${moduleId}`);
        }

        // Get parameters
        const params = getParameters(moduleId, level);
        if (!params) {
            throw new Error(`No parameters found for ${moduleId} level ${level}`);
        }

        // Generate questions
        const questions = [];
        for (let i = 0; i < count; i++) {
            const question = generator(params, level, locale);

            // Enrich with engine metadata
            question.id = this.generateQuestionId();
            question.timestamp = Date.now();

            // Ensure module and level are set (in case generator forgot)
            if (!question.module) question.module = moduleId;
            if (!question.level) question.level = level;

            questions.push(question);
        }

        return questions;
    }

    /**
     * Generate unique question ID
     * @returns {string} Unique ID
     */
    generateQuestionId() {
        return `q_${Date.now()}_${this.questionIdCounter++}`;
    }

    /**
     * Register all default generators
     * Called on engine initialization
     * NOTE: Generators are imported statically at the top of this file
     * to ensure synchronous registration before the engine is used
     */
    registerDefaultGenerators() {
        // Register N01 generators
        this.register(N01_Y1_NPV_generator);
        this.register(N01_Y2_NPV_generator);
        this.register(N01_Y3_NPV_generator);
        this.register(N01_Y4_NPV_generator);
        this.register(N01_Y5_NPV_generator);

        // Register F01 generators
        this.register(F01_Y1_FRAC_generator);
        this.register(F01_Y2_FRAC_generator);
        this.register(F01_Y3_FRAC_generator);
        this.register(F01_Y4_FRAC_generator);

        // Register M01 generators
        this.register(M01_Y4_MEAS_generator);
    }

    /**
     * Get list of registered module IDs
     * @returns {string[]} Array of module IDs
     */
    getRegisteredModules() {
        return Array.from(this.generators.keys());
    }
}

// Singleton instance
const engine = new QuestionEngine();

// Register default generators
engine.registerDefaultGenerators();

export default engine;
