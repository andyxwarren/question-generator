/**
 * On-Screen Keyboard Component
 *
 * Provides a touch-optimized calculator-style keyboard for text input questions.
 * Only appears on touch devices; desktop users get native keyboard.
 */

class OnScreenKeyboard {
    constructor() {
        this.element = null;
        this.inputElement = null;
        this.isActive = false;
        this.submitCallback = null;
    }

    /**
     * Create and return keyboard DOM element
     * @param {HTMLInputElement} inputElement - The input element to attach to
     * @param {Function} onSubmit - Callback function when submit is pressed
     * @returns {HTMLElement} Keyboard element
     */
    create(inputElement, onSubmit) {
        this.inputElement = inputElement;
        this.submitCallback = onSubmit;

        // Create keyboard container
        this.element = document.createElement('div');
        this.element.className = 'on-screen-keyboard';
        this.element.innerHTML = `
            <div class="keyboard-container">
                <div class="keyboard-row">
                    <button class="key number-key" data-value="7" type="button">7</button>
                    <button class="key number-key" data-value="8" type="button">8</button>
                    <button class="key number-key" data-value="9" type="button">9</button>
                </div>
                <div class="keyboard-row">
                    <button class="key number-key" data-value="4" type="button">4</button>
                    <button class="key number-key" data-value="5" type="button">5</button>
                    <button class="key number-key" data-value="6" type="button">6</button>
                </div>
                <div class="keyboard-row">
                    <button class="key number-key" data-value="1" type="button">1</button>
                    <button class="key number-key" data-value="2" type="button">2</button>
                    <button class="key number-key" data-value="3" type="button">3</button>
                </div>
                <div class="keyboard-row">
                    <button class="key special-key" data-value="/" type="button">÷</button>
                    <button class="key number-key" data-value="0" type="button">0</button>
                    <button class="key special-key backspace-key" data-action="backspace" type="button">⌫</button>
                </div>
                <div class="keyboard-row last-row">
                    <button class="key special-key" data-value="." type="button">.</button>
                    <button class="key special-key" data-value="-" type="button">−</button>
                    <button class="key submit-key" data-action="submit" type="button">
                        <span class="submit-icon">✓</span>
                        <span class="submit-text">Submit</span>
                    </button>
                </div>
            </div>
        `;

        // Attach event listeners
        this.attachHandlers();

        return this.element;
    }

    /**
     * Attach event listeners to keyboard keys
     */
    attachHandlers() {
        // Use event delegation for better performance
        this.element.addEventListener('click', (e) => {
            const key = e.target.closest('.key');
            if (!key) return;

            e.preventDefault();
            e.stopPropagation();

            // Trigger haptic feedback if supported
            this.triggerHaptic();

            // Visual feedback
            this.animateKeyPress(key);

            // Handle key action
            if (key.dataset.action === 'backspace') {
                this.handleBackspace();
            } else if (key.dataset.action === 'submit') {
                this.handleSubmit();
            } else if (key.dataset.value) {
                this.handleInput(key.dataset.value);
            }
        });

        // Prevent default touch behaviors
        this.element.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    /**
     * Handle number/symbol input
     * @param {string} value - The value to input
     */
    handleInput(value) {
        if (!this.inputElement) return;

        const currentValue = this.inputElement.value;

        // Validation rules
        if (value === '.') {
            // Only allow one decimal point
            if (currentValue.includes('.')) return;
        }

        if (value === '-') {
            // Only allow minus at the beginning
            if (currentValue.length > 0) return;
        }

        // Append value
        this.inputElement.value += value;

        // Trigger input event for any listeners
        this.inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }

    /**
     * Handle backspace key
     */
    handleBackspace() {
        if (!this.inputElement) return;

        this.inputElement.value = this.inputElement.value.slice(0, -1);

        // Trigger input event
        this.inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }

    /**
     * Handle submit key
     */
    handleSubmit() {
        if (this.submitCallback) {
            this.submitCallback();
        }

        // Also dispatch a custom event
        if (this.inputElement) {
            this.inputElement.dispatchEvent(new CustomEvent('keyboardSubmit', {
                bubbles: true,
                detail: { value: this.inputElement.value }
            }));
        }
    }

    /**
     * Animate key press for visual feedback
     * @param {HTMLElement} key - The key element
     */
    animateKeyPress(key) {
        key.classList.add('pressed');
        setTimeout(() => {
            key.classList.remove('pressed');
        }, 100);
    }

    /**
     * Trigger haptic feedback on supported devices
     */
    triggerHaptic() {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
    }

    /**
     * Show the keyboard with animation
     */
    show() {
        if (this.element) {
            this.element.classList.add('active');
            this.isActive = true;
        }
    }

    /**
     * Hide the keyboard with animation
     */
    hide() {
        if (this.element) {
            this.element.classList.remove('active');
            this.isActive = false;
        }
    }

    /**
     * Disable all keyboard keys
     */
    disable() {
        if (this.element) {
            const keys = this.element.querySelectorAll('.key');
            keys.forEach(key => {
                key.disabled = true;
            });
        }
    }

    /**
     * Enable all keyboard keys
     */
    enable() {
        if (this.element) {
            const keys = this.element.querySelectorAll('.key');
            keys.forEach(key => {
                key.disabled = false;
            });
        }
    }

    /**
     * Destroy the keyboard and cleanup
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.inputElement = null;
        this.submitCallback = null;
        this.isActive = false;
    }

    /**
     * Check if device is touch-capable
     * @returns {boolean} True if touch device
     */
    static isTouchDevice() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(hover: none) and (pointer: coarse)').matches
        );
    }
}

export default OnScreenKeyboard;
