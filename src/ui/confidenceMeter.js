/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * ConfidenceMeter - Visual confidence indicator component
 *
 * Displays real-time confidence score during practice sessions with:
 * - Color-coded progress bar (red → amber → green → blue)
 * - Percentage display
 * - Confidence level label
 * - Smooth animations
 *
 * Color zones:
 * - Red (0-30%): Critical - student struggling significantly
 * - Orange (30-40%): Struggling - student having difficulty
 * - Amber (40-65%): Challenging - student working hard
 * - Green (65-85%): Optimal - ideal learning zone (ZPD)
 * - Blue (85-100%): Excelling - student finding it very easy
 */

import adaptiveDifficultyEngine from '../core/adaptiveDifficultyEngine.js';

class ConfidenceMeter {
    constructor() {
        this.element = null;
        this.currentScore = null;
        this.currentLevel = null;
        this.visible = false;
    }

    /**
     * Initialize the confidence meter
     * @param {HTMLElement} container - Parent container element
     */
    init(container) {
        this.element = document.createElement('div');
        this.element.className = 'confidence-meter';
        this.element.innerHTML = `
            <div class="confidence-meter-content">
                <div class="confidence-meter-header">
                    <span class="confidence-meter-label">Confidence</span>
                    <span class="confidence-meter-value">--</span>
                </div>
                <div class="confidence-meter-bar">
                    <div class="confidence-meter-fill" style="width: 0%"></div>
                    <div class="confidence-meter-zones">
                        <div class="zone zone-critical" style="width: 30%"></div>
                        <div class="zone zone-struggling" style="width: 10%"></div>
                        <div class="zone zone-challenging" style="width: 25%"></div>
                        <div class="zone zone-optimal" style="width: 20%"></div>
                        <div class="zone zone-excelling" style="width: 15%"></div>
                    </div>
                </div>
                <div class="confidence-meter-message"></div>
            </div>
        `;

        container.appendChild(this.element);

        console.log('📊 ConfidenceMeter: Initialized');
    }

    /**
     * Show the confidence meter
     */
    show() {
        if (!this.element) {
            console.warn('ConfidenceMeter: Not initialized. Call init() first.');
            return;
        }

        this.element.classList.add('visible');
        this.visible = true;
    }

    /**
     * Hide the confidence meter
     */
    hide() {
        if (!this.element) return;

        this.element.classList.remove('visible');
        this.visible = false;
    }

    /**
     * Update confidence meter with new score
     * @param {Object} confidenceData - Confidence data from adaptiveDifficultyEngine
     */
    update(confidenceData) {
        if (!this.element || !this.visible) return;

        if (!confidenceData || confidenceData.score === null) {
            this.showInsufficientData();
            return;
        }

        const { score, level, color, message } = confidenceData;

        this.currentScore = score;
        this.currentLevel = level;

        // Update value display
        const valueElement = this.element.querySelector('.confidence-meter-value');
        valueElement.textContent = `${score}%`;

        // Update progress bar
        const fillElement = this.element.querySelector('.confidence-meter-fill');
        fillElement.style.width = `${score}%`;

        // Update color based on zone
        fillElement.className = `confidence-meter-fill confidence-fill-${color}`;

        // Update label with level
        const labelElement = this.element.querySelector('.confidence-meter-label');
        labelElement.textContent = `Confidence: ${level}`;

        // Update message
        const messageElement = this.element.querySelector('.confidence-meter-message');
        messageElement.textContent = message || '';
        messageElement.className = `confidence-meter-message confidence-message-${color}`;

        // Add pulse animation for critical or excelling
        if (level === 'Critical' || level === 'Struggling') {
            this.element.classList.add('pulse-warning');
        } else if (level === 'Excelling') {
            this.element.classList.add('pulse-success');
        } else {
            this.element.classList.remove('pulse-warning', 'pulse-success');
        }

        console.log(`📊 ConfidenceMeter: Updated - ${score}% (${level})`);
    }

    /**
     * Show "insufficient data" state
     */
    showInsufficientData() {
        if (!this.element) return;

        const valueElement = this.element.querySelector('.confidence-meter-value');
        valueElement.textContent = '--';

        const fillElement = this.element.querySelector('.confidence-meter-fill');
        fillElement.style.width = '0%';
        fillElement.className = 'confidence-meter-fill';

        const labelElement = this.element.querySelector('.confidence-meter-label');
        labelElement.textContent = 'Confidence: Calculating...';

        const messageElement = this.element.querySelector('.confidence-meter-message');
        messageElement.textContent = 'Answer a few more questions';
        messageElement.className = 'confidence-meter-message';

        this.element.classList.remove('pulse-warning', 'pulse-success');
    }

    /**
     * Get current confidence score
     * @returns {number|null} Current score or null
     */
    getCurrentScore() {
        return this.currentScore;
    }

    /**
     * Get current confidence level
     * @returns {string|null} Current level label or null
     */
    getCurrentLevel() {
        return this.currentLevel;
    }

    /**
     * Reset meter for new session
     */
    reset() {
        this.currentScore = null;
        this.currentLevel = null;
        this.showInsufficientData();
        this.element?.classList.remove('pulse-warning', 'pulse-success');
    }

    /**
     * Remove meter from DOM
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.visible = false;
    }

    /**
     * Check if meter is currently visible
     * @returns {boolean}
     */
    isVisible() {
        return this.visible;
    }
}

// Export singleton instance
const confidenceMeter = new ConfidenceMeter();
export default confidenceMeter;
