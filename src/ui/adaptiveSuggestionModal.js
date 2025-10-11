/**
 * Phase 5: Adaptive Difficulty Engine
 *
 * AdaptiveSuggestionModal - Intervention dialog component
 *
 * Displays child-friendly suggestions to adjust difficulty level during practice.
 * Appears when AdaptiveDifficultyEngine determines student needs support or challenge.
 *
 * Features:
 * - Friendly, positive language
 * - Clear choice (Accept / Decline)
 * - Visual indication of suggested change
 * - Student maintains agency (no forced changes)
 * - Records student response for learning
 */

import storageManager from '../core/storageManager.js';
import adaptiveDifficultyEngine from '../core/adaptiveDifficultyEngine.js';

class AdaptiveSuggestionModal {
    constructor() {
        this.element = null;
        this.currentIntervention = null;
        this.onAcceptCallback = null;
        this.onDeclineCallback = null;
        this.sessionId = null;
        this.studentId = null;
    }

    /**
     * Show intervention suggestion to student
     * @param {Object} intervention - Intervention data from adaptiveDifficultyEngine
     * @param {string} sessionId - Current session ID
     * @param {string} studentId - Current student ID
     * @param {Function} onAccept - Callback when student accepts (receives suggestedLevel)
     * @param {Function} onDecline - Callback when student declines
     */
    show(intervention, sessionId, studentId, onAccept, onDecline) {
        this.currentIntervention = intervention;
        this.sessionId = sessionId;
        this.studentId = studentId;
        this.onAcceptCallback = onAccept;
        this.onDeclineCallback = onDecline;

        // Create modal overlay
        this.element = document.createElement('div');
        this.element.className = 'adaptive-suggestion-overlay';

        // Build modal content based on intervention type
        const content = this.buildModalContent(intervention);

        this.element.innerHTML = `
            <div class="adaptive-suggestion-modal">
                ${content}
            </div>
        `;

        // Add to document
        document.body.appendChild(this.element);

        // Trigger animation
        setTimeout(() => {
            this.element.classList.add('visible');
        }, 10);

        // Add event listeners
        this.attachEventListeners();

        // Record that intervention was shown
        adaptiveDifficultyEngine.recordInterventionShown();

        console.log(`🎯 AdaptiveSuggestionModal: Showing ${intervention.type} suggestion`);
    }

    /**
     * Build modal content HTML based on intervention type
     * @param {Object} intervention - Intervention data
     * @returns {string} HTML content
     */
    buildModalContent(intervention) {
        const { type, title, message, primaryAction, secondaryAction, currentLevel, suggestedLevel, confidence } = intervention;

        // Choose icon based on type
        let icon = '💡';
        let iconClass = 'suggestion';

        if (type === 'decrease') {
            icon = '🤝'; // Helping hand
            iconClass = 'support';
        } else if (type === 'increase') {
            icon = '🌟'; // Star for challenge
            iconClass = 'challenge';
        } else if (type === 'switch_module') {
            icon = '🎯'; // Target for different approach
            iconClass = 'alternative';
        }

        // Build level change visualization
        let levelVisualization = '';
        if (suggestedLevel !== null) {
            const levelLabels = {
                1: 'Beginning',
                2: 'Developing',
                3: 'Meeting',
                4: 'Exceeding'
            };

            levelVisualization = `
                <div class="level-change-visual">
                    <div class="level-current">
                        <div class="level-badge">L${currentLevel}</div>
                        <div class="level-label">${levelLabels[currentLevel]}</div>
                    </div>
                    <div class="level-arrow">→</div>
                    <div class="level-suggested">
                        <div class="level-badge highlight">L${suggestedLevel}</div>
                        <div class="level-label">${levelLabels[suggestedLevel]}</div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="adaptive-suggestion-icon ${iconClass}">${icon}</div>
            <h2 class="adaptive-suggestion-title">${this.escapeHtml(title)}</h2>
            <p class="adaptive-suggestion-message">${this.escapeHtml(message)}</p>
            ${levelVisualization}
            <div class="adaptive-suggestion-actions">
                <button class="adaptive-suggestion-btn primary" data-action="accept">
                    ${this.escapeHtml(primaryAction)}
                </button>
                <button class="adaptive-suggestion-btn secondary" data-action="decline">
                    ${this.escapeHtml(secondaryAction)}
                </button>
            </div>
            <div class="adaptive-suggestion-footer">
                You can always change levels later! 😊
            </div>
        `;
    }

    /**
     * Attach event listeners to modal buttons
     */
    attachEventListeners() {
        const acceptBtn = this.element.querySelector('[data-action="accept"]');
        const declineBtn = this.element.querySelector('[data-action="decline"]');

        acceptBtn?.addEventListener('click', () => this.handleAccept());
        declineBtn?.addEventListener('click', () => this.handleDecline());
    }

    /**
     * Handle student accepting suggestion
     */
    handleAccept() {
        console.log('🎯 AdaptiveSuggestionModal: Student ACCEPTED suggestion');

        // Record intervention response
        if (this.studentId && this.currentIntervention) {
            storageManager.recordIntervention(
                this.studentId,
                this.currentIntervention,
                true, // accepted
                this.sessionId
            );

            adaptiveDifficultyEngine.recordInterventionResponse(
                this.currentIntervention,
                true
            );
        }

        // Close modal
        this.close();

        // Call accept callback with suggested level
        if (this.onAcceptCallback) {
            const suggestedLevel = this.currentIntervention.suggestedLevel;
            this.onAcceptCallback(suggestedLevel);
        }
    }

    /**
     * Handle student declining suggestion
     */
    handleDecline() {
        console.log('🎯 AdaptiveSuggestionModal: Student DECLINED suggestion');

        // Record intervention response
        if (this.studentId && this.currentIntervention) {
            storageManager.recordIntervention(
                this.studentId,
                this.currentIntervention,
                false, // declined
                this.sessionId
            );

            adaptiveDifficultyEngine.recordInterventionResponse(
                this.currentIntervention,
                false
            );
        }

        // Close modal
        this.close();

        // Call decline callback
        if (this.onDeclineCallback) {
            this.onDeclineCallback();
        }
    }

    /**
     * Close and remove modal
     */
    close() {
        if (!this.element) return;

        // Fade out
        this.element.classList.remove('visible');

        // Remove from DOM after animation
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
            this.currentIntervention = null;
            this.onAcceptCallback = null;
            this.onDeclineCallback = null;
        }, 300);
    }

    /**
     * Check if modal is currently showing
     * @returns {boolean}
     */
    isShowing() {
        return this.element !== null;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export singleton instance
const adaptiveSuggestionModal = new AdaptiveSuggestionModal();
export default adaptiveSuggestionModal;
