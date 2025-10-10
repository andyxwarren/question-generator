/**
 * Question History Manager
 *
 * Tracks recently seen questions to prevent duplicates within a cooldown period
 * Uses localStorage for persistence across sessions
 */

/**
 * Generate unique fingerprint for a question
 * @param {Object} question - Question object
 * @returns {string} Unique fingerprint
 */
function generateFingerprint(question) {
    // Create fingerprint based on question content, type, and answer
    // This makes questions with same content but different options still unique
    const parts = [
        question.module || '',
        question.level || '',
        question.type || '',
        question.text || '',
        question.answer || ''
    ];

    // For multiple choice, include options to make them more unique
    if (question.options && Array.isArray(question.options)) {
        parts.push(question.options.sort().join('|'));
    }

    // Create a simple hash-like string
    return parts.join('::').toLowerCase().replace(/\s+/g, '_');
}

/**
 * Question History Class
 */
class QuestionHistory {
    constructor() {
        this.storageKey = 'mathsPractice_questionHistory';
        this.cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        this.history = new Map(); // fingerprint -> timestamp
        this.load();
    }

    /**
     * Check if question has been seen recently
     * @param {string} fingerprint - Question fingerprint
     * @returns {boolean} True if seen within cooldown period
     */
    hasSeenRecently(fingerprint) {
        if (!this.history.has(fingerprint)) {
            return false;
        }

        const lastSeen = this.history.get(fingerprint);
        const now = Date.now();
        const timeSince = now - lastSeen;

        // If cooldown has expired, remove from history and return false
        if (timeSince > this.cooldownPeriod) {
            this.history.delete(fingerprint);
            return false;
        }

        return true;
    }

    /**
     * Mark a question as seen
     * @param {string} fingerprint - Question fingerprint
     */
    markAsSeen(fingerprint) {
        this.history.set(fingerprint, Date.now());
    }

    /**
     * Set cooldown period
     * @param {number} hours - Cooldown period in hours
     */
    setCooldown(hours) {
        this.cooldownPeriod = hours * 60 * 60 * 1000;
        // Clean up old entries that are now outside the new cooldown
        this.cleanup();
    }

    /**
     * Get current cooldown period in hours
     * @returns {number} Cooldown in hours
     */
    getCooldownHours() {
        return this.cooldownPeriod / (60 * 60 * 1000);
    }

    /**
     * Clean up expired entries
     */
    cleanup() {
        const now = Date.now();
        const toDelete = [];

        for (const [fingerprint, timestamp] of this.history.entries()) {
            if (now - timestamp > this.cooldownPeriod) {
                toDelete.push(fingerprint);
            }
        }

        toDelete.forEach(fp => this.history.delete(fp));

        // Save after cleanup
        if (toDelete.length > 0) {
            this.save();
        }
    }

    /**
     * Save history to localStorage
     */
    save() {
        try {
            const data = {
                cooldown: this.cooldownPeriod,
                history: Array.from(this.history.entries()),
                lastUpdated: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save question history:', error);
        }
    }

    /**
     * Load history from localStorage
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return;

            const data = JSON.parse(stored);
            this.cooldownPeriod = data.cooldown || this.cooldownPeriod;
            this.history = new Map(data.history || []);

            // Clean up on load
            this.cleanup();
        } catch (error) {
            console.warn('Failed to load question history:', error);
            this.history = new Map();
        }
    }

    /**
     * Clear all history
     */
    clear() {
        this.history.clear();
        localStorage.removeItem(this.storageKey);
    }

    /**
     * Get statistics
     * @returns {Object} Statistics about question history
     */
    getStats() {
        return {
            totalTracked: this.history.size,
            cooldownHours: this.getCooldownHours(),
            oldestEntry: this.getOldestEntry(),
            newestEntry: this.getNewestEntry()
        };
    }

    /**
     * Get oldest entry timestamp
     * @returns {number|null} Timestamp or null
     */
    getOldestEntry() {
        if (this.history.size === 0) return null;
        return Math.min(...Array.from(this.history.values()));
    }

    /**
     * Get newest entry timestamp
     * @returns {number|null} Timestamp or null
     */
    getNewestEntry() {
        if (this.history.size === 0) return null;
        return Math.max(...Array.from(this.history.values()));
    }

    /**
     * Check if a question object has been seen recently
     * @param {Object} question - Question object
     * @returns {boolean} True if seen recently
     */
    hasQuestionBeenSeen(question) {
        const fingerprint = generateFingerprint(question);
        return this.hasSeenRecently(fingerprint);
    }

    /**
     * Mark a question object as seen
     * @param {Object} question - Question object
     */
    markQuestionAsSeen(question) {
        const fingerprint = generateFingerprint(question);
        this.markAsSeen(fingerprint);
        this.save();
    }
}

// Create singleton instance
const questionHistory = new QuestionHistory();

// Export both the class and singleton instance
export { QuestionHistory, generateFingerprint };
export default questionHistory;
