/**
 * Module Progress Tracker
 *
 * Tracks student progress across all modules and difficulty levels.
 * Detects module completion when student answers 3+ questions correctly at each level.
 * Part of Phase 3.5: Module Completion System
 */

class ModuleProgress {
    constructor() {
        this.storageKey = 'mathsPractice_moduleProgress';
        this.data = this.load();
    }

    /**
     * Initialize module data if it doesn't exist
     * @param {string} moduleId - Module identifier
     */
    initModule(moduleId) {
        if (!this.data[moduleId]) {
            this.data[moduleId] = {
                level1Correct: 0,
                level2Correct: 0,
                level3Correct: 0,
                level4Correct: 0,
                completed: false,
                completedDate: null
            };
        }
    }

    /**
     * Record a correct answer for a specific module and level
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     */
    recordCorrectAnswer(moduleId, level) {
        this.initModule(moduleId);

        const levelKey = `level${level}Correct`;
        this.data[moduleId][levelKey]++;

        this.save();
    }

    /**
     * Get progress data for a specific module
     * @param {string} moduleId - Module identifier
     * @returns {Object} Module progress data
     */
    getProgress(moduleId) {
        this.initModule(moduleId);
        return { ...this.data[moduleId] };
    }

    /**
     * Check if a specific level has been completed (3+ correct)
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @returns {boolean} True if level has 3+ correct answers
     */
    isLevelComplete(moduleId, level) {
        const progress = this.getProgress(moduleId);
        const levelKey = `level${level}Correct`;
        return progress[levelKey] >= 3;
    }

    /**
     * Check if all 4 levels of a module have been completed
     * @param {string} moduleId - Module identifier
     * @returns {boolean} True if all levels have 3+ correct answers
     */
    isModuleComplete(moduleId) {
        return this.isLevelComplete(moduleId, 1) &&
               this.isLevelComplete(moduleId, 2) &&
               this.isLevelComplete(moduleId, 3) &&
               this.isLevelComplete(moduleId, 4);
    }

    /**
     * Mark a module as officially completed
     * @param {string} moduleId - Module identifier
     */
    markModuleComplete(moduleId) {
        this.initModule(moduleId);
        this.data[moduleId].completed = true;
        this.data[moduleId].completedDate = Date.now();
        this.save();
    }

    /**
     * Get array of all completed module IDs
     * @returns {string[]} Array of module IDs
     */
    getCompletedModules() {
        return Object.keys(this.data).filter(moduleId =>
            this.data[moduleId].completed === true
        );
    }

    /**
     * Get completion statistics for a module
     * @param {string} moduleId - Module identifier
     * @returns {Object} Statistics object
     */
    getStats(moduleId) {
        const progress = this.getProgress(moduleId);
        return {
            level1Complete: this.isLevelComplete(moduleId, 1),
            level2Complete: this.isLevelComplete(moduleId, 2),
            level3Complete: this.isLevelComplete(moduleId, 3),
            level4Complete: this.isLevelComplete(moduleId, 4),
            allLevelsComplete: this.isModuleComplete(moduleId),
            markedComplete: progress.completed,
            totalCorrect: progress.level1Correct + progress.level2Correct +
                         progress.level3Correct + progress.level4Correct,
            completedDate: progress.completedDate
        };
    }

    /**
     * Load progress data from localStorage
     * @returns {Object} Progress data object
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Failed to load module progress:', error);
        }
        return {};
    }

    /**
     * Save progress data to localStorage
     */
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (error) {
            console.error('Failed to save module progress:', error);
        }
    }

    /**
     * Clear all progress data
     */
    clear() {
        this.data = {};
        this.save();
    }

    /**
     * Reset a specific module's progress
     * @param {string} moduleId - Module identifier
     */
    resetModule(moduleId) {
        delete this.data[moduleId];
        this.save();
    }
}

// Export singleton instance
const moduleProgress = new ModuleProgress();
export default moduleProgress;
