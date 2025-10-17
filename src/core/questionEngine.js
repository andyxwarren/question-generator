/**
 * Question Engine
 *
 * Central orchestration system for question generation
 * Manages generator registry and question creation
 */

import { getParameters } from '../curriculum/parameters.js';
import countingY1Generator from '../generators/N01_Y1_NPV_counting.js';
import countingY2Generator from '../generators/N01_Y2_NPV_counting.js';
import countingY3Generator from '../generators/N01_Y3_NPV_counting.js';
import countingY4Generator from '../generators/N01_Y4_NPV_counting.js';
import countingY5Generator from '../generators/N01_Y5_NPV_counting.js';
import readwriteY2Generator from '../generators/N02_Y2_NPV_readwrite.js';
import readwriteY3Generator from '../generators/N02_Y3_NPV_readwrite.js';
import readwriteY4Generator from '../generators/N02_Y4_NPV_readwrite.js';
import readwriteY5Generator from '../generators/N02_Y5_NPV_readwrite.js';
import readwriteY6Generator from '../generators/N02_Y6_NPV_readwrite.js';
import placeValueY2Generator from '../generators/N03_Y2_NPV_placevalue.js';
import placeValueY3Generator from '../generators/N03_Y3_NPV_placevalue.js';
import placeValueY4Generator from '../generators/N03_Y4_NPV_placevalue.js';
import placeValueY5Generator from '../generators/N03_Y5_NPV_placevalue.js';
import placeValueY6Generator from '../generators/N03_Y6_NPV_placevalue.js';
import representationY1Generator from '../generators/N04_Y1_NPV_representation.js';
import representationY2Generator from '../generators/N04_Y2_NPV_representation.js';
import representationY3Generator from '../generators/N04_Y3_NPV_representation.js';
import representationY4Generator from '../generators/N04_Y4_NPV_representation.js';
import representationY5Generator from '../generators/N04_Y5_NPV_representation.js';
import representationY6Generator from '../generators/N04_Y6_NPV_representation.js';
import negativesY4Generator from '../generators/N05_Y4_NPV_negatives.js';
import negativesY5Generator from '../generators/N05_Y5_NPV_negatives.js';
import negativesY6Generator from '../generators/N05_Y6_NPV_negatives.js';
import problemsY2Generator from '../generators/N06_Y2_NPV_problems.js';
import problemsY3Generator from '../generators/N06_Y3_NPV_problems.js';
import problemsY4Generator from '../generators/N06_Y4_NPV_problems.js';
import problemsY5Generator from '../generators/N06_Y5_NPV_problems.js';
import problemsY6Generator from '../generators/N06_Y6_NPV_problems.js';

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
        this.register(countingY1Generator);
        this.register(countingY2Generator);
        this.register(countingY3Generator);
        this.register(countingY4Generator);
        this.register(countingY5Generator);
        this.register(readwriteY2Generator);
        this.register(readwriteY3Generator);
        this.register(readwriteY4Generator);
        this.register(readwriteY5Generator);
        this.register(readwriteY6Generator);
        this.register(placeValueY2Generator);
        this.register(placeValueY3Generator);
        this.register(placeValueY4Generator);
        this.register(placeValueY5Generator);
        this.register(placeValueY6Generator);
        this.register(representationY1Generator);
        this.register(representationY2Generator);
        this.register(representationY3Generator);
        this.register(representationY4Generator);
        this.register(representationY5Generator);
        this.register(representationY6Generator);
        this.register(negativesY4Generator);
        this.register(negativesY5Generator);
        this.register(negativesY6Generator);
        this.register(problemsY2Generator);
        this.register(problemsY3Generator);
        this.register(problemsY4Generator);
        this.register(problemsY5Generator);
        this.register(problemsY6Generator);
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
     * Generate multiple questions
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @param {number} count - Number of questions to generate
     * @returns {Array} Array of question objects
     */
    generate(moduleId, level, count = 10) {
        const questions = [];

        for (let i = 0; i < count; i++) {
            const question = this.generateOne(moduleId, level);
            if (question) {
                questions.push(question);
            }
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
}

// Create and export singleton instance
const engine = new QuestionEngine();
export default engine;
