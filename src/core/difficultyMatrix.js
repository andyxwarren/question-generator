/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * DifficultyMatrix - Cross-module difficulty mapping and recovery paths
 *
 * Maps equivalent difficulty levels across different modules and provides
 * intelligent recovery paths for struggling students.
 *
 * Educational Insight:
 * - Not all Level 1s are equal in difficulty
 * - Some modules build on skills from other modules
 * - Students struggling in one module may benefit from building
 *   foundational skills in a related but easier module
 *
 * Example:
 * - Student struggling at Fractions L1 → Suggest Bonds L1 (foundational)
 * - Student struggling at Multiply L2 → Suggest Counting L2 (related skill)
 */

/**
 * Difficulty ratings for each module at each level (1-10 scale)
 * Higher number = more difficult
 *
 * Based on UK Key Stage 1 & 2 curriculum expectations
 */
const DIFFICULTY_RATINGS = {
  counting: {
    1: 2,  // Very accessible (counting forward in small steps)
    2: 4,  // Basic (larger steps, backward counting)
    3: 5,  // Moderate (negative numbers, decimal steps)
    4: 7   // Advanced (complex patterns, fractions)
  },
  bonds: {
    1: 3,  // Accessible but requires understanding of addition/subtraction
    2: 5,  // Moderate (bonds to 10, 20)
    3: 6,  // Moderate-Advanced (bonds to 100, multiple strategies)
    4: 8   // Advanced (rapid recall, large numbers)
  },
  multiply: {
    1: 4,  // Moderate (requires counting knowledge, times tables)
    2: 6,  // Moderate-Advanced (larger tables, division)
    3: 7,  // Advanced (multi-digit, mental strategies)
    4: 9   // Very Advanced (complex problems, fluency)
  },
  fractions: {
    1: 5,  // Moderate (abstract concept, visualization needed)
    2: 7,  // Advanced (operations with fractions)
    3: 8,  // Very Advanced (mixed numbers, equivalence)
    4: 9   // Very Advanced (complex operations)
  }
};

/**
 * Module dependencies and prerequisite skills
 * Key: Module that requires skills
 * Value: Array of prerequisite modules (easier to harder)
 */
const MODULE_DEPENDENCIES = {
  counting: [],  // Foundational module, no prerequisites
  bonds: ['counting'],  // Requires counting skills
  multiply: ['counting', 'bonds'],  // Requires both counting and addition
  fractions: ['counting', 'bonds', 'multiply']  // Requires all other modules
};

/**
 * Recovery paths for each module
 * When student struggles, suggest these alternative modules
 * Ordered from most helpful to least helpful
 */
const RECOVERY_PATHS = {
  counting: {
    // Counting is foundational, no easier module
    // Suggest different practice strategies instead
    alternatives: [],
    strategy: 'simplify' // Simplify current level parameters
  },
  bonds: {
    // If struggling with bonds, build counting fluency first
    alternatives: ['counting'],
    strategy: 'prerequisite'
  },
  multiply: {
    // If struggling with multiplication, strengthen bonds/counting
    alternatives: ['bonds', 'counting'],
    strategy: 'prerequisite'
  },
  fractions: {
    // If struggling with fractions, strengthen all foundational skills
    alternatives: ['bonds', 'multiply', 'counting'],
    strategy: 'prerequisite'
  }
};

/**
 * Skill connections between modules
 * Used to suggest "lateral moves" (same difficulty, different module)
 */
const SKILL_CONNECTIONS = {
  counting: {
    related: ['bonds'], // Counting patterns relate to number bonds
    reason: 'Understanding number patterns helps with number relationships'
  },
  bonds: {
    related: ['counting', 'multiply'],
    reason: 'Number bonds are the foundation for multiplication'
  },
  multiply: {
    related: ['bonds'],
    reason: 'Multiplication is repeated addition'
  },
  fractions: {
    related: ['bonds', 'multiply'],
    reason: 'Fractions involve division and part-whole relationships'
  }
};

class DifficultyMatrix {
  constructor() {
    console.log('🗺️ DifficultyMatrix: Initialized');
  }

  /**
   * Get difficulty rating for a module at a specific level
   * @param {string} moduleId - Module ID
   * @param {number} level - Level (1-4)
   * @returns {number} Difficulty rating (1-10)
   */
  getDifficultyRating(moduleId, level) {
    return DIFFICULTY_RATINGS[moduleId]?.[level] || 5;
  }

  /**
   * Find modules at equivalent difficulty level
   * @param {string} currentModule - Current module ID
   * @param {number} currentLevel - Current level
   * @param {number} tolerance - Difficulty tolerance (default 1)
   * @returns {Array} Array of {moduleId, level, difficulty} objects
   */
  findEquivalentDifficulty(currentModule, currentLevel, tolerance = 1) {
    const currentDifficulty = this.getDifficultyRating(currentModule, currentLevel);
    const equivalents = [];

    // Check all modules and levels
    Object.keys(DIFFICULTY_RATINGS).forEach(moduleId => {
      // Skip current module
      if (moduleId === currentModule) return;

      [1, 2, 3, 4].forEach(level => {
        const difficulty = this.getDifficultyRating(moduleId, level);

        // Check if within tolerance
        if (Math.abs(difficulty - currentDifficulty) <= tolerance) {
          equivalents.push({
            moduleId,
            level,
            difficulty,
            difference: difficulty - currentDifficulty
          });
        }
      });
    });

    // Sort by difficulty (closest match first)
    equivalents.sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference));

    return equivalents;
  }

  /**
   * Get recovery path for a struggling student
   * Returns suggested modules to build prerequisite skills
   *
   * @param {string} moduleId - Module where student is struggling
   * @param {number} level - Level where student is struggling
   * @returns {Object} Recovery path recommendation
   */
  getRecoveryPath(moduleId, level) {
    const recoveryConfig = RECOVERY_PATHS[moduleId];

    if (!recoveryConfig) {
      return {
        moduleId,
        level,
        hasPath: false,
        strategy: 'persist',
        message: 'Keep practicing at this level'
      };
    }

    // If struggling at Level 1, suggest prerequisite modules
    if (level === 1 && recoveryConfig.alternatives.length > 0) {
      const suggestions = recoveryConfig.alternatives.map(altModule => {
        // Suggest same level or one level down in prerequisite module
        const suggestedLevel = Math.max(1, level);

        return {
          moduleId: altModule,
          level: suggestedLevel,
          difficulty: this.getDifficultyRating(altModule, suggestedLevel),
          reason: `Build foundational ${altModule} skills first`
        };
      });

      return {
        moduleId,
        level,
        hasPath: true,
        strategy: recoveryConfig.strategy,
        suggestions,
        message: `Try building foundational skills in ${suggestions[0].moduleId} first`
      };
    }

    // If struggling at Level 2+, suggest lower level in same module first
    if (level > 1) {
      return {
        moduleId,
        level,
        hasPath: true,
        strategy: 'step_down',
        suggestions: [{
          moduleId,
          level: level - 1,
          difficulty: this.getDifficultyRating(moduleId, level - 1),
          reason: 'Strengthen skills at easier level'
        }],
        message: `Try Level ${level - 1} in this module first`
      };
    }

    // No recovery path needed
    return {
      moduleId,
      level,
      hasPath: false,
      strategy: 'simplify',
      message: 'Continue practicing at this level'
    };
  }

  /**
   * Get prerequisite modules for a module
   * @param {string} moduleId - Module ID
   * @returns {Array} Array of prerequisite module IDs
   */
  getPrerequisites(moduleId) {
    return MODULE_DEPENDENCIES[moduleId] || [];
  }

  /**
   * Get skill connections for lateral moves
   * @param {string} moduleId - Module ID
   * @returns {Object} Related modules and reasoning
   */
  getSkillConnections(moduleId) {
    return SKILL_CONNECTIONS[moduleId] || { related: [], reason: '' };
  }

  /**
   * Suggest alternative practice when student is struggling
   * Combines recovery paths with skill connections
   *
   * @param {string} moduleId - Current module
   * @param {number} level - Current level
   * @param {string} reason - Why alternative is needed ('struggling' | 'bored' | 'variety')
   * @returns {Object} Suggestion object
   */
  suggestAlternative(moduleId, level, reason = 'struggling') {
    if (reason === 'struggling') {
      // Use recovery path
      const recovery = this.getRecoveryPath(moduleId, level);

      if (recovery.hasPath && recovery.suggestions.length > 0) {
        const top = recovery.suggestions[0];
        return {
          type: 'recovery',
          moduleId: top.moduleId,
          level: top.level,
          reason: top.reason,
          message: recovery.message,
          originalModule: moduleId,
          originalLevel: level
        };
      }

      // If no recovery path, suggest lower level
      if (level > 1) {
        return {
          type: 'step_down',
          moduleId,
          level: level - 1,
          reason: 'Build confidence at easier level',
          message: `Try Level ${level - 1} first`,
          originalModule: moduleId,
          originalLevel: level
        };
      }

      // Already at easiest, no prerequisites
      return null;
    }

    if (reason === 'bored' || reason === 'variety') {
      // Suggest lateral move (equivalent difficulty, different module)
      const equivalents = this.findEquivalentDifficulty(moduleId, level, 1);

      if (equivalents.length > 0) {
        const suggestion = equivalents[0];
        return {
          type: 'lateral',
          moduleId: suggestion.moduleId,
          level: suggestion.level,
          reason: 'Try a different type of challenge',
          message: `You might enjoy ${suggestion.moduleId} at Level ${suggestion.level}`,
          originalModule: moduleId,
          originalLevel: level
        };
      }
    }

    return null;
  }

  /**
   * Check if student has completed prerequisites for a module
   * @param {Object} studentProgress - Student's module progress
   * @param {string} targetModule - Module to check
   * @returns {Object} Prerequisite status
   */
  checkPrerequisites(studentProgress, targetModule) {
    const prerequisites = this.getPrerequisites(targetModule);

    if (prerequisites.length === 0) {
      return {
        ready: true,
        missing: [],
        message: 'No prerequisites required'
      };
    }

    const missing = prerequisites.filter(prereqModule => {
      // Check if student has completed prerequisite module
      const progress = studentProgress[prereqModule];
      return !progress || !progress.completed;
    });

    return {
      ready: missing.length === 0,
      missing,
      message: missing.length > 0
        ? `Consider completing ${missing.join(', ')} first`
        : 'Prerequisites completed'
    };
  }

  /**
   * Get progression pathway for a student
   * Suggests next logical module based on completed work
   *
   * @param {Object} studentProgress - Student's module progress
   * @returns {Object} Progression suggestion
   */
  getProgressionPath(studentProgress) {
    // Order of typical curriculum progression
    const progressionOrder = ['counting', 'bonds', 'multiply', 'fractions'];

    // Find first incomplete module
    for (const moduleId of progressionOrder) {
      const progress = studentProgress[moduleId];

      if (!progress || !progress.completed) {
        // Check if prerequisites are met
        const prereqCheck = this.checkPrerequisites(studentProgress, moduleId);

        if (prereqCheck.ready) {
          return {
            moduleId,
            reason: 'Next in curriculum progression',
            message: `Ready to practice ${moduleId}`,
            prerequisites: this.getPrerequisites(moduleId)
          };
        } else {
          return {
            moduleId: prereqCheck.missing[0],
            reason: `Prerequisite for ${moduleId}`,
            message: `Complete ${prereqCheck.missing[0]} before ${moduleId}`,
            prerequisites: []
          };
        }
      }
    }

    // All modules completed
    return {
      moduleId: null,
      reason: 'All modules completed',
      message: 'Congratulations! All modules completed. Try harder levels!',
      prerequisites: []
    };
  }

  /**
   * Get visual difficulty map for debugging/display
   * @returns {Object} Formatted difficulty map
   */
  getDifficultyMap() {
    const map = {};

    Object.keys(DIFFICULTY_RATINGS).forEach(moduleId => {
      map[moduleId] = {};
      [1, 2, 3, 4].forEach(level => {
        const difficulty = this.getDifficultyRating(moduleId, level);
        map[moduleId][`L${level}`] = {
          difficulty,
          label: this.getDifficultyLabel(difficulty)
        };
      });
    });

    return map;
  }

  /**
   * Get difficulty label for rating
   * @param {number} rating - Difficulty rating (1-10)
   * @returns {string} Label
   */
  getDifficultyLabel(rating) {
    if (rating <= 2) return 'Very Easy';
    if (rating <= 4) return 'Easy';
    if (rating <= 6) return 'Moderate';
    if (rating <= 8) return 'Hard';
    return 'Very Hard';
  }
}

// Export singleton instance
const difficultyMatrix = new DifficultyMatrix();
export default difficultyMatrix;
