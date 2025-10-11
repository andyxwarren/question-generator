/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * PerformanceAnalyzer - Real-time performance tracking during practice sessions
 *
 * Tracks metrics during an active session:
 * - Accuracy (correct vs incorrect)
 * - Response times
 * - Consecutive errors
 * - Streak breaks
 * - Rolling metrics (last 5 questions)
 * - Struggling patterns detection
 *
 * This analyzer provides real-time data to the AdaptiveDifficultyEngine
 * for making intervention decisions during a session.
 */

class PerformanceAnalyzer {
  constructor() {
    this.reset();
  }

  /**
   * Reset analyzer for new session
   */
  reset() {
    // Current session data
    this.sessionId = null;
    this.moduleId = null;
    this.currentLevel = null;
    this.studentId = null;

    // Question tracking
    this.questionResults = [];
    this.totalQuestions = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;

    // Response time tracking
    this.responseTimes = [];

    // Streak tracking
    this.currentStreak = 0;
    this.consecutiveErrors = 0;
    this.streakBreaks = 0; // Times streak was broken

    // Struggling indicators
    this.slowResponses = 0; // Count of responses > expected time
    this.fastIncorrect = 0; // Count of fast but wrong answers (guessing)

    // Rolling window (last 5 questions)
    this.rollingWindow = [];
    this.rollingWindowSize = 5;

    console.log('📊 PerformanceAnalyzer: Reset for new session');
  }

  /**
   * Start tracking a new session
   * @param {string} sessionId - Session ID
   * @param {string} studentId - Student ID
   * @param {string} moduleId - Module ID
   * @param {number} level - Difficulty level (1-4)
   */
  startSession(sessionId, studentId, moduleId, level) {
    this.reset();
    this.sessionId = sessionId;
    this.studentId = studentId;
    this.moduleId = moduleId;
    this.currentLevel = level;

    console.log(`📊 PerformanceAnalyzer: Started tracking session ${sessionId} - ${moduleId} L${level}`);
  }

  /**
   * Record a question result
   * @param {Object} result - Question result object
   * @param {boolean} result.correct - Whether answer was correct
   * @param {number} result.timeMs - Response time in milliseconds
   * @param {string} result.questionText - Question text (optional)
   * @param {string} result.answer - Student's answer (optional)
   */
  recordResult(result) {
    if (!this.sessionId) {
      console.warn('⚠️ PerformanceAnalyzer: No active session. Call startSession() first.');
      return;
    }

    const questionData = {
      timestamp: Date.now(),
      correct: result.correct,
      timeMs: result.timeMs || null,
      questionText: result.questionText || '',
      studentAnswer: result.answer || ''
    };

    // Add to full results
    this.questionResults.push(questionData);
    this.totalQuestions++;

    // Update counts
    if (result.correct) {
      this.correctCount++;
      this.currentStreak++;
      this.consecutiveErrors = 0; // Reset error streak
    } else {
      this.incorrectCount++;

      // Track streak break
      if (this.currentStreak > 0) {
        this.streakBreaks++;
      }

      this.currentStreak = 0;
      this.consecutiveErrors++;
    }

    // Track response time
    if (result.timeMs) {
      this.responseTimes.push(result.timeMs);

      // Classify response time
      const expectedTime = this.getExpectedResponseTime();

      if (result.timeMs > expectedTime * 1.5) {
        // Slow response (> 150% of expected)
        this.slowResponses++;
      }

      if (!result.correct && result.timeMs < expectedTime * 0.5) {
        // Fast but wrong (< 50% of expected) - possible guessing
        this.fastIncorrect++;
      }
    }

    // Update rolling window
    this.rollingWindow.push(questionData);
    if (this.rollingWindow.length > this.rollingWindowSize) {
      this.rollingWindow.shift(); // Remove oldest
    }

    console.log(`📊 PerformanceAnalyzer: Q${this.totalQuestions} - ${result.correct ? '✓' : '✗'} (${result.timeMs}ms) - Accuracy: ${this.getCurrentAccuracy()}%`);
  }

  /**
   * Get expected response time based on current level
   * @returns {number} Expected time in milliseconds
   */
  getExpectedResponseTime() {
    // Expected response times by level (in ms)
    const expectedTimes = {
      1: 8000,  // Beginning: 8 seconds
      2: 6000,  // Developing: 6 seconds
      3: 5000,  // Meeting: 5 seconds
      4: 4000   // Exceeding: 4 seconds
    };

    return expectedTimes[this.currentLevel] || 5000;
  }

  /**
   * Get current overall accuracy
   * @returns {number} Accuracy percentage (0-100)
   */
  getCurrentAccuracy() {
    if (this.totalQuestions === 0) return 0;
    return Math.round((this.correctCount / this.totalQuestions) * 100);
  }

  /**
   * Get rolling accuracy (last N questions)
   * @returns {number} Rolling accuracy percentage (0-100)
   */
  getRollingAccuracy() {
    if (this.rollingWindow.length === 0) return 0;

    const correctInWindow = this.rollingWindow.filter(q => q.correct).length;
    return Math.round((correctInWindow / this.rollingWindow.length) * 100);
  }

  /**
   * Get average response time
   * @returns {number} Average time in milliseconds
   */
  getAverageResponseTime() {
    if (this.responseTimes.length === 0) return 0;

    const sum = this.responseTimes.reduce((acc, time) => acc + time, 0);
    return Math.round(sum / this.responseTimes.length);
  }

  /**
   * Get rolling average response time (last N questions)
   * @returns {number} Rolling average in milliseconds
   */
  getRollingAverageResponseTime() {
    const windowTimes = this.rollingWindow
      .map(q => q.timeMs)
      .filter(time => time !== null);

    if (windowTimes.length === 0) return 0;

    const sum = windowTimes.reduce((acc, time) => acc + time, 0);
    return Math.round(sum / windowTimes.length);
  }

  /**
   * Check if student is currently struggling
   * Multiple indicators:
   * - Low rolling accuracy (< 40%)
   * - High consecutive errors (3+)
   * - Slow response times
   * - Multiple streak breaks
   *
   * @returns {Object} Struggling analysis
   */
  isStruggling() {
    // Need at least 5 questions to make assessment
    if (this.totalQuestions < 5) {
      return {
        struggling: false,
        confidence: 'insufficient_data',
        indicators: []
      };
    }

    const indicators = [];
    let strugglingScore = 0;

    // Check 1: Low rolling accuracy
    const rollingAcc = this.getRollingAccuracy();
    if (rollingAcc < 40) {
      indicators.push(`Low accuracy: ${rollingAcc}%`);
      strugglingScore += 3;
    } else if (rollingAcc < 60) {
      indicators.push(`Below-target accuracy: ${rollingAcc}%`);
      strugglingScore += 1;
    }

    // Check 2: Consecutive errors
    if (this.consecutiveErrors >= 3) {
      indicators.push(`${this.consecutiveErrors} errors in a row`);
      strugglingScore += 3;
    } else if (this.consecutiveErrors >= 2) {
      indicators.push(`${this.consecutiveErrors} consecutive errors`);
      strugglingScore += 1;
    }

    // Check 3: Slow response times
    const avgTime = this.getRollingAverageResponseTime();
    const expectedTime = this.getExpectedResponseTime();
    if (avgTime > expectedTime * 1.5) {
      indicators.push(`Slow responses (avg ${Math.round(avgTime / 1000)}s)`);
      strugglingScore += 2;
    }

    // Check 4: Frequent guessing (fast but incorrect)
    const guessingRate = this.totalQuestions > 0
      ? (this.fastIncorrect / this.totalQuestions)
      : 0;
    if (guessingRate > 0.3) {
      indicators.push('Possible guessing behavior');
      strugglingScore += 2;
    }

    // Check 5: Streak breaks (difficulty maintaining consistency)
    if (this.totalQuestions >= 10 && this.streakBreaks >= 3) {
      indicators.push('Inconsistent performance');
      strugglingScore += 1;
    }

    // Determine overall struggling status
    const struggling = strugglingScore >= 4;

    return {
      struggling,
      score: strugglingScore,
      indicators,
      confidence: this.getConfidenceLevel(strugglingScore)
    };
  }

  /**
   * Determine confidence level based on struggling score
   * @param {number} score - Struggling score (0-10+)
   * @returns {string} Confidence level
   */
  getConfidenceLevel(score) {
    if (score >= 6) return 'very_low';    // Severe struggling
    if (score >= 4) return 'low';         // Clearly struggling
    if (score >= 2) return 'moderate';    // Some difficulty
    if (score >= 1) return 'good';        // Minor issues
    return 'excellent';                   // No issues
  }

  /**
   * Get comprehensive performance metrics
   * @returns {Object} Full metrics object
   */
  getMetrics() {
    const struggling = this.isStruggling();

    return {
      // Session info
      sessionId: this.sessionId,
      studentId: this.studentId,
      moduleId: this.moduleId,
      level: this.currentLevel,

      // Overall performance
      totalQuestions: this.totalQuestions,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      accuracy: this.getCurrentAccuracy(),

      // Rolling metrics
      rollingAccuracy: this.getRollingAccuracy(),
      rollingWindowSize: this.rollingWindow.length,

      // Response times
      averageResponseTime: this.getAverageResponseTime(),
      rollingAverageResponseTime: this.getRollingAverageResponseTime(),
      expectedResponseTime: this.getExpectedResponseTime(),

      // Streaks
      currentStreak: this.currentStreak,
      consecutiveErrors: this.consecutiveErrors,
      streakBreaks: this.streakBreaks,

      // Struggling indicators
      slowResponses: this.slowResponses,
      fastIncorrect: this.fastIncorrect,

      // Analysis
      struggling: struggling.struggling,
      strugglingScore: struggling.score,
      strugglingIndicators: struggling.indicators,
      confidenceLevel: struggling.confidence
    };
  }

  /**
   * Get summary for logging/debugging
   * @returns {string} Formatted summary
   */
  getSummary() {
    const metrics = this.getMetrics();

    return `
📊 Performance Summary:
   Questions: ${metrics.totalQuestions} (${metrics.correctCount}✓ ${metrics.incorrectCount}✗)
   Accuracy: ${metrics.accuracy}% overall, ${metrics.rollingAccuracy}% recent
   Response Time: ${Math.round(metrics.averageResponseTime / 1000)}s avg (${Math.round(metrics.expectedResponseTime / 1000)}s expected)
   Streak: ${metrics.currentStreak} current, ${metrics.consecutiveErrors} consecutive errors
   Confidence: ${metrics.confidenceLevel.toUpperCase()}
   ${metrics.struggling ? '⚠️ STRUGGLING DETECTED: ' + metrics.strugglingIndicators.join(', ') : '✓ Performance within range'}
    `.trim();
  }

  /**
   * Check if enough questions have been answered for analysis
   * @param {number} minQuestions - Minimum questions required (default 5)
   * @returns {boolean}
   */
  hasEnoughData(minQuestions = 5) {
    return this.totalQuestions >= minQuestions;
  }

  /**
   * Update the current level during a session (for adaptive level changes)
   * @param {number} newLevel - New difficulty level (1-4)
   */
  updateLevel(newLevel) {
    if (!this.sessionId) {
      console.warn('⚠️ PerformanceAnalyzer: No active session. Cannot update level.');
      return;
    }

    const oldLevel = this.currentLevel;
    this.currentLevel = newLevel;
    console.log(`📊 PerformanceAnalyzer: Level updated L${oldLevel} → L${newLevel}`);
  }

  /**
   * End current session and return final metrics
   * @returns {Object} Final session metrics
   */
  endSession() {
    if (!this.sessionId) {
      console.warn('⚠️ PerformanceAnalyzer: No active session to end.');
      return null;
    }

    const finalMetrics = this.getMetrics();

    console.log('📊 PerformanceAnalyzer: Session ended');
    console.log(this.getSummary());

    // Reset for next session
    this.reset();

    return finalMetrics;
  }
}

// Export singleton instance
const performanceAnalyzer = new PerformanceAnalyzer();
export default performanceAnalyzer;
