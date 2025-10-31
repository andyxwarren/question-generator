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
import mentalY1Generator from '../generators/C01_Y1_CALC_mental.js';
import mentalY2Generator from '../generators/C01_Y2_CALC_mental.js';
import mentalY3Generator from '../generators/C01_Y3_CALC_mental.js';
import mentalY5Generator from '../generators/C01_Y5_CALC_mental.js';
import writtenY1Generator from '../generators/C02_Y1_CALC_written.js';
import writtenY2Generator from '../generators/C02_Y2_CALC_written.js';
import writtenY3Generator from '../generators/C02_Y3_CALC_written.js';
import writtenY4Generator from '../generators/C02_Y4_CALC_written.js';
import writtenY5Generator from '../generators/C02_Y5_CALC_written.js';
import estimationY2Generator from '../generators/C03_Y2_CALC_estimation.js';
import estimationY3Generator from '../generators/C03_Y3_CALC_estimation.js';
import estimationY4Generator from '../generators/C03_Y4_CALC_estimation.js';
import estimationY5Generator from '../generators/C03_Y5_CALC_estimation.js';
import estimationY6Generator from '../generators/C03_Y6_CALC_estimation.js';
import problemsolvingY1Generator from '../generators/C04_Y1_CALC_problems.js';
import problemsolvingY2Generator from '../generators/C04_Y2_CALC_problems.js';
import problemsolvingY3Generator from '../generators/C04_Y3_CALC_problems.js';
import problemsolvingY4Generator from '../generators/C04_Y4_CALC_problems.js';
import problemsolvingY5Generator from '../generators/C04_Y5_CALC_problems.js';
import problemsolvingY6Generator from '../generators/C04_Y6_CALC_problems.js';
import propertiesY5Generator from '../generators/C05_Y5_CALC_properties.js';
import propertiesY6Generator from '../generators/C05_Y6_CALC_properties.js';
import mentalMultiplyY2Generator from '../generators/C06_Y2_CALC_mental_multiply.js';
import mentalMultiplyY3Generator from '../generators/C06_Y3_CALC_mental_multiply.js';
import mentalMultiplyY4Generator from '../generators/C06_Y4_CALC_mental_multiply.js';
import mentalMultiplyY5Generator from '../generators/C06_Y5_CALC_mental_multiply.js';
import mentalMultiplyY6Generator from '../generators/C06_Y6_CALC_mental_multiply.js';
import writtenMultiplyY2Generator from '../generators/C07_Y2_CALC_written.js';
import writtenMultiplyY3Generator from '../generators/C07_Y3_CALC_written.js';
import writtenMultiplyY4Generator from '../generators/C07_Y4_CALC_written.js';
import writtenMultiplyY5Generator from '../generators/C07_Y5_CALC_written.js';
import writtenMultiplyY6Generator from '../generators/C07_Y6_CALC_written.js';
import propertiesProblemsY1Generator from '../generators/C08_Y1_CALC_properties.js';
import propertiesProblemsY2Generator from '../generators/C08_Y2_CALC_properties.js';
import propertiesProblemsY3Generator from '../generators/C08_Y3_CALC_properties.js';
import propertiesProblemsY4Generator from '../generators/C08_Y4_CALC_properties.js';
import propertiesProblemsY5Generator from '../generators/C08_Y5_CALC_properties.js';
import propertiesProblemsY6Generator from '../generators/C08_Y6_CALC_properties.js';
import orderY6Generator from '../generators/C09_Y6_CALC_order.js';
import measurementY1Generator from '../generators/M01_Y1_MEAS_comparison.js';
import measurementY2Generator from '../generators/M01_Y2_MEAS_comparison.js';
import measurementY3Generator from '../generators/M01_Y3_MEAS_comparison.js';
import measurementY4Generator from '../generators/M01_Y4_MEAS_comparison.js';
import scalesY1Generator from '../generators/M02_Y1_MEAS_measure.js';
import scalesY2Generator from '../generators/M02_Y2_MEAS_measure.js';
import scalesY3Generator from '../generators/M02_Y3_MEAS_measure.js';
import scalesY4Generator from '../generators/M02_Y4_MEAS_measure.js';
import moneyY1Generator from '../generators/M03_Y1_MEAS_money.js';
import moneyY2Generator from '../generators/M03_Y2_MEAS_money.js';
import moneyY3Generator from '../generators/M03_Y3_MEAS_money.js';
import timeY1Generator from '../generators/M04_Y1_MEAS_time.js';
import timeY2Generator from '../generators/M04_Y2_MEAS_time.js';
import timeY3Generator from '../generators/M04_Y3_MEAS_time.js';
import timeY4Generator from '../generators/M04_Y4_MEAS_time.js';
import timeY5Generator from '../generators/M04_Y5_MEAS_time.js';
import conversionY5Generator from '../generators/M05_Y5_MEAS_conversions.js';
import conversionY4Generator from '../generators/M06_Y4_MEAS_conversions.js';
import conversionY5MixedGenerator from '../generators/M06_Y5_MEAS_conversions.js';
import conversionY6Generator from '../generators/M06_Y6_MEAS_conversions.js';

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
        this.register(mentalY1Generator);
        this.register(mentalY2Generator);
        this.register(mentalY3Generator);
        this.register(mentalY5Generator);
        this.register(writtenY1Generator);
        this.register(writtenY2Generator);
        this.register(writtenY3Generator);
        this.register(writtenY4Generator);
        this.register(writtenY5Generator);
        this.register(estimationY2Generator);
        this.register(estimationY3Generator);
        this.register(estimationY4Generator);
        this.register(estimationY5Generator);
        this.register(estimationY6Generator);
        this.register(problemsolvingY1Generator);
        this.register(problemsolvingY2Generator);
        this.register(problemsolvingY3Generator);
        this.register(problemsolvingY4Generator);
        this.register(problemsolvingY5Generator);
        this.register(problemsolvingY6Generator);
        this.register(propertiesY5Generator);
        this.register(propertiesY6Generator);
        this.register(mentalMultiplyY2Generator);
        this.register(mentalMultiplyY3Generator);
        this.register(mentalMultiplyY4Generator);
        this.register(mentalMultiplyY5Generator);
        this.register(mentalMultiplyY6Generator);
        this.register(writtenMultiplyY2Generator);
        this.register(writtenMultiplyY3Generator);
        this.register(writtenMultiplyY4Generator);
        this.register(writtenMultiplyY5Generator);
        this.register(writtenMultiplyY6Generator);
        this.register(propertiesProblemsY1Generator);
        this.register(propertiesProblemsY2Generator);
        this.register(propertiesProblemsY3Generator);
        this.register(propertiesProblemsY4Generator);
        this.register(propertiesProblemsY5Generator);
        this.register(propertiesProblemsY6Generator);
        this.register(orderY6Generator);
        this.register(measurementY1Generator);
        this.register(measurementY2Generator);
        this.register(measurementY3Generator);
        this.register(measurementY4Generator);
        this.register(scalesY1Generator);
        this.register(scalesY2Generator);
        this.register(scalesY3Generator);
        this.register(scalesY4Generator);
        this.register(moneyY1Generator);
        this.register(moneyY2Generator);
        this.register(moneyY3Generator);
        this.register(timeY1Generator);
        this.register(timeY2Generator);
        this.register(timeY3Generator);
        this.register(timeY4Generator);
        this.register(timeY5Generator);
        this.register(conversionY5Generator);
        this.register(conversionY4Generator);
        this.register(conversionY5MixedGenerator);
        this.register(conversionY6Generator);

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
     * Generate multiple questions with deduplication
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @param {number} count - Number of questions to generate
     * @returns {Array} Array of question objects
     */
    generate(moduleId, level, count = 10) {
        const questions = [];
        const seenQuestionTexts = new Set(); // Track unique question texts
        let attempts = 0;
        const maxAttempts = count * 3; // Try up to 3x the count to find unique questions

        while (questions.length < count && attempts < maxAttempts) {
            const question = this.generateOne(moduleId, level);

            if (question) {
                // Check if we've seen this exact question text before
                if (!seenQuestionTexts.has(question.text)) {
                    seenQuestionTexts.add(question.text);
                    questions.push(question);
                }
            }

            attempts++;
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
