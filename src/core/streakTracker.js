/**
 * Streak Tracker Module
 *
 * Tracks consecutive correct answers and determines when power-up is available.
 * Integrates with the auto level-up system (Phase 3).
 */

class StreakTracker {
    constructor() {
        this.currentStreak = 0;
        this.requiredStreak = 3;  // 3 consecutive correct answers
        this.powerUpAvailable = false;
        this.totalCorrectInSession = 0;
        this.totalIncorrectInSession = 0;
    }

    /**
     * Record an answer and update streak
     * @param {boolean} isCorrect - Whether the answer was correct
     * @returns {Object} Status object with streak info
     */
    recordAnswer(isCorrect) {
        if (isCorrect) {
            this.currentStreak++;
            this.totalCorrectInSession++;

            // Check if power-up should be available
            if (this.currentStreak >= this.requiredStreak && !this.powerUpAvailable) {
                this.powerUpAvailable = true;
            }

            return {
                streak: this.currentStreak,
                powerUpAvailable: this.powerUpAvailable,
                justUnlocked: this.currentStreak === this.requiredStreak
            };
        } else {
            // Reset streak on incorrect answer
            const hadPowerUp = this.powerUpAvailable;
            this.reset();
            this.totalIncorrectInSession++;

            return {
                streak: 0,
                powerUpAvailable: false,
                lostPowerUp: hadPowerUp
            };
        }
    }

    /**
     * Reset streak and power-up availability
     */
    reset() {
        this.currentStreak = 0;
        this.powerUpAvailable = false;
    }

    /**
     * Consume the power-up (when level-up is accepted)
     * Keeps current streak but removes power-up availability
     */
    consumePowerUp() {
        this.powerUpAvailable = false;
        // Don't reset streak - continues building
    }

    /**
     * Get current streak status
     * @returns {Object} Current streak information
     */
    getStatus() {
        return {
            currentStreak: this.currentStreak,
            requiredStreak: this.requiredStreak,
            powerUpAvailable: this.powerUpAvailable,
            progress: Math.min(this.currentStreak / this.requiredStreak, 1),
            totalCorrect: this.totalCorrectInSession,
            totalIncorrect: this.totalIncorrectInSession
        };
    }

    /**
     * Check if streak is "hot" (close to power-up)
     * @returns {boolean} True if 2+ correct in a row
     */
    isHotStreak() {
        return this.currentStreak >= 2;
    }

    /**
     * Reset all session data (for new practice session)
     */
    resetSession() {
        this.currentStreak = 0;
        this.powerUpAvailable = false;
        this.totalCorrectInSession = 0;
        this.totalIncorrectInSession = 0;
    }
}

// Export singleton instance
const streakTracker = new StreakTracker();
export default streakTracker;
