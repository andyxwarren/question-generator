/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * AdaptiveDifficultyEngine - Core decision-making system for adaptive learning
 *
 * Responsibilities:
 * - Calculate confidence score (0-100) based on weighted performance factors
 * - Determine intervention triggers
 * - Generate difficulty adjustment recommendations
 * - Provide child-friendly messaging
 *
 * Uses data from PerformanceAnalyzer to make real-time decisions during sessions.
 *
 * Educational Foundation: Zone of Proximal Development (ZPD)
 * - Optimal learning happens when difficulty is challenging but achievable
 * - Too easy → boredom, no growth
 * - Too hard → frustration, disengagement
 * - Just right (65-85% confidence) → optimal learning
 */

import performanceAnalyzer from './performanceAnalyzer.js';

class AdaptiveDifficultyEngine {
  constructor() {
    // Intervention settings
    this.enabled = true; // Can be toggled by teacher/settings
    this.interventionCheckInterval = 5; // Check every N questions (5, 10, 15, 20, 25...)
    this.maxInterventionsPerSession = 4; // Allow progression through all levels (1→2→3→4)
    this.interventionsMadeThisSession = 0; // Only counts accepted interventions

    // Confidence score weights (must sum to 100)
    this.weights = {
      accuracy: 35,      // Primary indicator of understanding
      responseTime: 15,  // Speed indicates fluency
      hints: 20,         // Future: hint usage indicates support needed
      consistency: 15,   // Stable performance vs erratic
      streak: 15         // Ability to maintain correct answers
    };

    // Trigger thresholds
    this.triggers = {
      critical: { max: 30, label: 'Critical', color: 'red' },
      struggling: { min: 30, max: 40, label: 'Struggling', color: 'orange' },
      challenging: { min: 40, max: 65, label: 'Challenging', color: 'amber' },
      optimal: { min: 65, max: 80, label: 'Optimal', color: 'green' },
      excelling: { min: 80, label: 'Excelling', color: 'blue' } // 80% = 4/5 correct
    };

    console.log('🎯 AdaptiveDifficultyEngine: Initialized');
  }

  /**
   * Reset for new session
   */
  resetSession() {
    this.interventionsMadeThisSession = 0;
    console.log('🎯 AdaptiveDifficultyEngine: Reset for new session');
  }

  /**
   * Calculate confidence score (0-100)
   * Higher score = student is more confident/finding it easy
   * Lower score = student is struggling
   *
   * @returns {Object} Confidence score and breakdown
   */
  calculateConfidenceScore() {
    const metrics = performanceAnalyzer.getMetrics();

    // Need sufficient data
    if (!performanceAnalyzer.hasEnoughData(5)) {
      return {
        score: null,
        level: 'insufficient_data',
        breakdown: null,
        message: 'Not enough questions answered yet'
      };
    }

    // Factor 1: Accuracy (35% weight)
    // Use rolling accuracy for recent performance
    const accuracyScore = metrics.rollingAccuracy; // Already 0-100

    // Factor 2: Response Time (15% weight)
    // Compare to expected time for level
    const avgTime = metrics.rollingAverageResponseTime;
    const expectedTime = metrics.expectedResponseTime;

    let responseTimeScore = 50; // Default neutral
    if (avgTime === 0) {
      responseTimeScore = 50; // No data
    } else if (avgTime < expectedTime * 0.7) {
      // Very fast (< 70% expected) → high confidence
      responseTimeScore = 90;
    } else if (avgTime < expectedTime) {
      // Faster than expected → good confidence
      responseTimeScore = 75;
    } else if (avgTime <= expectedTime * 1.5) {
      // Within reasonable range → moderate
      responseTimeScore = 50;
    } else if (avgTime <= expectedTime * 2) {
      // Slow but thinking → lower confidence
      responseTimeScore = 30;
    } else {
      // Very slow → struggling
      responseTimeScore = 15;
    }

    // Factor 3: Hints (20% weight)
    // Placeholder for Phase 6: Hints System
    // For now, assume no hints used = high score
    const hintsScore = 100; // TODO: Implement when hints system is added

    // Factor 4: Consistency (15% weight)
    // Measure stability of performance (low streak breaks = consistent)
    const streakBreakRate = metrics.totalQuestions > 0
      ? (metrics.streakBreaks / metrics.totalQuestions)
      : 0;

    let consistencyScore = 50;
    if (streakBreakRate === 0) {
      consistencyScore = 100; // Perfect consistency
    } else if (streakBreakRate < 0.2) {
      consistencyScore = 80; // High consistency
    } else if (streakBreakRate < 0.4) {
      consistencyScore = 60; // Moderate consistency
    } else if (streakBreakRate < 0.6) {
      consistencyScore = 40; // Inconsistent
    } else {
      consistencyScore = 20; // Very inconsistent
    }

    // Factor 5: Streak (15% weight)
    // Current streak indicates momentum
    const currentStreak = metrics.currentStreak;
    const consecutiveErrors = metrics.consecutiveErrors;

    let streakScore = 50; // Neutral
    if (currentStreak >= 5) {
      streakScore = 100; // Excellent streak
    } else if (currentStreak >= 3) {
      streakScore = 85; // Good streak
    } else if (currentStreak >= 2) {
      streakScore = 70; // Building momentum
    } else if (currentStreak === 1) {
      streakScore = 55; // Just started
    } else if (consecutiveErrors >= 3) {
      streakScore = 15; // Error streak - very low
    } else if (consecutiveErrors >= 2) {
      streakScore = 30; // Losing momentum
    }

    // Calculate weighted confidence score
    const confidenceScore = Math.round(
      (accuracyScore * this.weights.accuracy / 100) +
      (responseTimeScore * this.weights.responseTime / 100) +
      (hintsScore * this.weights.hints / 100) +
      (consistencyScore * this.weights.consistency / 100) +
      (streakScore * this.weights.streak / 100)
    );

    // Determine confidence level
    const level = this.getConfidenceLevel(confidenceScore);

    return {
      score: confidenceScore,
      level: level.label,
      color: level.color,
      breakdown: {
        accuracy: { score: Math.round(accuracyScore), weight: this.weights.accuracy },
        responseTime: { score: Math.round(responseTimeScore), weight: this.weights.responseTime },
        hints: { score: Math.round(hintsScore), weight: this.weights.hints },
        consistency: { score: Math.round(consistencyScore), weight: this.weights.consistency },
        streak: { score: Math.round(streakScore), weight: this.weights.streak }
      },
      message: this.getConfidenceMessage(confidenceScore, level.label)
    };
  }

  /**
   * Determine confidence level from score
   * @param {number} score - Confidence score (0-100)
   * @returns {Object} Level info
   */
  getConfidenceLevel(score) {
    if (score < this.triggers.critical.max) {
      return this.triggers.critical;
    }
    if (score >= this.triggers.struggling.min && score < this.triggers.struggling.max) {
      return this.triggers.struggling;
    }
    if (score >= this.triggers.challenging.min && score < this.triggers.challenging.max) {
      return this.triggers.challenging;
    }
    if (score >= this.triggers.optimal.min && score < this.triggers.optimal.max) {
      return this.triggers.optimal;
    }
    return this.triggers.excelling;
  }

  /**
   * Get child-friendly message for confidence level
   * @param {number} score - Confidence score
   * @param {string} level - Confidence level label
   * @returns {string} Message
   */
  getConfidenceMessage(score, level) {
    const messages = {
      critical: "These questions are very tricky. Let's try something easier!",
      struggling: "These questions are tough. Would you like to try an easier level?",
      challenging: "You're working hard! Keep going!",
      optimal: "Great job! You're learning well at this level!",
      excelling: "You're doing brilliantly! Ready for a bigger challenge?"
    };

    return messages[level.toLowerCase()] || "Keep up the good work!";
  }

  /**
   * Check if intervention should be triggered
   * @param {number} questionNumber - Current question number (1-based)
   * @returns {Object|null} Intervention recommendation or null
   */
  checkForIntervention(questionNumber) {
    // Check 1: Is adaptive engine enabled?
    if (!this.enabled) {
      return null;
    }

    // Check 2: Is this a checkpoint? (every N questions: 5, 10, 15, 20, 25...)
    if (questionNumber % this.interventionCheckInterval !== 0) {
      return null;
    }

    // Check 3: Have we already intervened this session?
    if (this.interventionsMadeThisSession >= this.maxInterventionsPerSession) {
      console.log(`🎯 AdaptiveDifficultyEngine: Max interventions (${this.maxInterventionsPerSession}) reached for this session`);
      return null;
    }

    // Check 4: Do we have enough data?
    if (!performanceAnalyzer.hasEnoughData(5)) {
      return null;
    }

    // Calculate confidence
    const confidence = this.calculateConfidenceScore();

    if (!confidence.score) {
      return null;
    }

    console.log(`🎯 AdaptiveDifficultyEngine: Q${questionNumber} checkpoint - Confidence: ${confidence.score} (${confidence.level})`);

    // Check 5: Should we intervene based on confidence level?
    const currentLevel = performanceAnalyzer.getMetrics().level;

    // Critical or Struggling → Suggest easier
    if (confidence.level === 'Critical' || confidence.level === 'Struggling') {
      if (currentLevel > 1) {
        return this.createIntervention('decrease', confidence, questionNumber);
      } else {
        // Already at easiest level, suggest different module
        return this.createIntervention('switch_module', confidence, questionNumber);
      }
    }

    // Excelling → Suggest harder
    if (confidence.level === 'Excelling') {
      if (currentLevel < 4) {
        return this.createIntervention('increase', confidence, questionNumber);
      } else {
        // Already at hardest level
        return null; // No intervention needed
      }
    }

    // Optimal or Challenging → No intervention needed (ZPD)
    return null;
  }

  /**
   * Create intervention recommendation
   * @param {string} type - Intervention type (decrease|increase|switch_module)
   * @param {Object} confidence - Confidence data
   * @param {number} questionNumber - Current question number
   * @returns {Object} Intervention object
   */
  createIntervention(type, confidence, questionNumber) {
    const currentLevel = performanceAnalyzer.getMetrics().level;
    const moduleId = performanceAnalyzer.getMetrics().moduleId;

    let intervention = {
      type,
      triggeredAt: questionNumber,
      confidence,
      currentLevel,
      moduleId,
      timestamp: Date.now()
    };

    switch (type) {
      case 'decrease':
        intervention.suggestedLevel = currentLevel - 1;
        intervention.reason = 'Student is struggling at current level';
        intervention.title = "Let's Make It Easier";
        intervention.message = confidence.level === 'Critical'
          ? "These questions are very challenging for you right now. Let's try an easier level where you can build your confidence!"
          : "You're working really hard! Let's try an easier level to help you feel more confident.";
        intervention.primaryAction = "Try Easier Level";
        intervention.secondaryAction = "Keep Trying This Level";
        break;

      case 'increase':
        intervention.suggestedLevel = currentLevel + 1;
        intervention.reason = 'Student is excelling at current level';
        intervention.title = "Ready for a Challenge?";
        intervention.message = "You're doing brilliantly! These questions seem easy for you. Would you like to try a harder level?";
        intervention.primaryAction = "Try Harder Level";
        intervention.secondaryAction = "Stay at This Level";
        break;

      case 'switch_module':
        intervention.suggestedLevel = null;
        intervention.reason = 'Student struggling at easiest level';
        intervention.title = "Let's Try Something Different";
        intervention.message = "These questions are tricky. Would you like to try a different type of maths practice?";
        intervention.primaryAction = "Choose Different Module";
        intervention.secondaryAction = "Keep Practicing";
        break;
    }

    console.log(`🎯 AdaptiveDifficultyEngine: Intervention created - ${type} (L${currentLevel} → L${intervention.suggestedLevel || '?'})`);

    return intervention;
  }

  /**
   * Record that intervention was shown to student
   * Note: Counter is NOT incremented here - only when accepted
   */
  recordInterventionShown() {
    console.log(`🎯 AdaptiveDifficultyEngine: Intervention shown (${this.interventionsMadeThisSession} accepted so far)`);
  }

  /**
   * Record student's response to intervention
   * @param {Object} intervention - Intervention object
   * @param {boolean} accepted - Whether student accepted suggestion
   */
  recordInterventionResponse(intervention, accepted) {
    console.log(`🎯 AdaptiveDifficultyEngine: Intervention ${accepted ? 'ACCEPTED' : 'DECLINED'} - ${intervention.type}`);

    // Only increment counter when accepted (declined interventions can be re-offered)
    if (accepted) {
      this.interventionsMadeThisSession++;
      console.log(`🎯 AdaptiveDifficultyEngine: Accepted interventions: ${this.interventionsMadeThisSession}/${this.maxInterventionsPerSession}`);
    } else {
      console.log(`🎯 AdaptiveDifficultyEngine: Intervention declined - will check again at next checkpoint`);
    }

    // Future: Store in storageManager for learning patterns
    // This data can be used to:
    // - Learn student's preferences
    // - Adjust intervention timing/frequency
    // - Improve recommendation accuracy

    return {
      intervention,
      accepted,
      timestamp: Date.now()
    };
  }

  /**
   * Get recommendation for next session (used on setup screen)
   * Based on student's historical performance from storageManager
   *
   * @param {string} studentId - Student ID
   * @param {string} moduleId - Module ID
   * @returns {Object|null} Recommendation or null
   */
  getRecommendationForNextSession(studentId, moduleId) {
    // This method works with storageManager to analyze historical data
    // and suggest a starting level for the next session

    // For now, return null - will implement when storageManager is extended
    // TODO: Implement in Week 2 when difficultyMatrix and storageManager are ready
    return null;
  }

  /**
   * Enable or disable adaptive system
   * @param {boolean} enabled - Enable state
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    console.log(`🎯 AdaptiveDifficultyEngine: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }

  /**
   * Check if adaptive system is enabled
   * @returns {boolean}
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Get current session intervention count
   * @returns {number}
   */
  getInterventionCount() {
    return this.interventionsMadeThisSession;
  }

  /**
   * Get configuration info
   * @returns {Object}
   */
  getConfig() {
    return {
      enabled: this.enabled,
      checkInterval: this.interventionCheckInterval,
      maxInterventions: this.maxInterventionsPerSession,
      weights: this.weights,
      triggers: this.triggers
    };
  }
}

// Export singleton instance
const adaptiveDifficultyEngine = new AdaptiveDifficultyEngine();
export default adaptiveDifficultyEngine;
