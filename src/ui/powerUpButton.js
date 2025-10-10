/**
 * Power-Up Button Component
 *
 * Animated button that appears after 3 consecutive correct answers.
 * Clicking triggers power-up confirmation and transition to next level.
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
                <span class="power-up-text">Power Up!</span>
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

        // Show custom confirmation dialog
        this.showConfirmation();
    }

    /**
     * Show confirmation dialog for power-up
     */
    showConfirmation() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'power-up-confirmation-overlay';
        overlay.innerHTML = `
            <div class="power-up-confirmation-card">
                <div class="power-up-confirmation-icon">🎉</div>
                <h2>Great Job!</h2>
                <p class="power-up-confirmation-message">
                    You got 3 in a row! Would you like to power up to the next level?
                </p>
                <p class="power-up-confirmation-note">
                    Your progress will be saved and you'll continue with harder questions.
                </p>
                <div class="power-up-confirmation-actions">
                    <button class="power-up-confirmation-btn primary" id="powerUpYesBtn">
                        ⚡ Power Up!
                    </button>
                    <button class="power-up-confirmation-btn secondary" id="powerUpNoBtn">
                        Not Yet
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => overlay.classList.add('visible'), 10);

        // Handle Yes button
        const yesBtn = overlay.querySelector('#powerUpYesBtn');
        yesBtn.addEventListener('click', () => {
            this.confirmPowerUp(overlay);
        });

        // Handle No button
        const noBtn = overlay.querySelector('#powerUpNoBtn');
        noBtn.addEventListener('click', () => {
            this.cancelPowerUp(overlay);
        });
    }

    /**
     * Confirm power-up and proceed
     */
    confirmPowerUp(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);

        // Play activation animation on button
        this.playActivationAnimation();

        // Call the callback after a brief delay
        setTimeout(() => {
            if (this.onActivateCallback) {
                this.onActivateCallback(true);
            }
            this.hide();
        }, 500);
    }

    /**
     * Cancel power-up
     */
    cancelPowerUp(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
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
