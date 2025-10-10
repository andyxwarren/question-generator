/**
 * Power-Up Button Component
 *
 * Animated button that appears after 3 consecutive correct answers.
 * Clicking triggers level-up confirmation and transition.
 */

class PowerUpButton {
    constructor() {
        this.element = null;
        this.isVisible = false;
        this.onActivateCallback = null;
    }

    /**
     * Create and show the power-up button
     * @param {Function} onActivate - Callback when button is clicked
     * @returns {HTMLElement} Button element
     */
    show(onActivate) {
        // Remove existing button if any
        this.hide();

        this.onActivateCallback = onActivate;

        // Create button element
        this.element = document.createElement('button');
        this.element.id = 'powerUpBtn';
        this.element.className = 'power-up-btn animate-in';
        this.element.type = 'button';
        this.element.innerHTML = `
            <div class="power-up-content">
                <span class="power-up-icon">⚡</span>
                <span class="power-up-text">Level Up!</span>
                <span class="power-up-subtitle">3 in a row! 🔥</span>
            </div>
        `;

        // Add click handler
        this.element.addEventListener('click', () => {
            this.activate();
        });

        // Add to DOM
        document.body.appendChild(this.element);
        this.isVisible = true;

        // Trigger entrance animation
        setTimeout(() => {
            this.element.classList.add('visible');
        }, 10);

        return this.element;
    }

    /**
     * Hide and remove the power-up button
     */
    hide() {
        if (this.element) {
            this.element.classList.remove('visible');
            this.element.classList.add('animate-out');

            setTimeout(() => {
                if (this.element && this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
                this.element = null;
                this.isVisible = false;
            }, 300);
        }
    }

    /**
     * Handle button activation
     */
    activate() {
        if (!this.onActivateCallback) return;

        // Show confirmation dialog
        const proceed = this.showConfirmation();

        if (proceed) {
            // Play activation animation
            this.playActivationAnimation();

            // Call the callback after a brief delay
            setTimeout(() => {
                this.onActivateCallback(true);
                this.hide();
            }, 500);
        }
    }

    /**
     * Show confirmation dialog for level-up
     * @returns {boolean} True if user wants to level up
     */
    showConfirmation() {
        const message = `🎉 Great job! You got 3 in a row!\n\n` +
            `Would you like to move to the next level?\n\n` +
            `Your current progress will be saved and you'll ` +
            `continue with harder questions.`;

        return confirm(message);
    }

    /**
     * Play activation animation (burst effect)
     */
    playActivationAnimation() {
        if (!this.element) return;

        this.element.classList.add('activating');
    }

    /**
     * Check if button is currently visible
     * @returns {boolean} Visibility status
     */
    isShowing() {
        return this.isVisible;
    }

    /**
     * Update button text (for custom messages)
     * @param {string} text - New button text
     */
    updateText(text) {
        if (this.element) {
            const textElement = this.element.querySelector('.power-up-text');
            if (textElement) {
                textElement.textContent = text;
            }
        }
    }
}

// Export singleton instance
const powerUpButton = new PowerUpButton();
export default powerUpButton;
