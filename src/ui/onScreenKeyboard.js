/**
 * On-Screen Keyboard Component
 *
 * Provides a touch-optimized calculator-style keyboard for text input questions.
 * Only appears on touch devices; desktop users get native keyboard.
 *
 * Uses internal value storage to avoid readonly input conflicts on mobile devices.
 */

class OnScreenKeyboard {
    constructor() {
        this.element = null;
        this.displayElement = null;  // Custom display div (not a real input)
        this.currentValue = '';      // Internal value storage
        this.isActive = false;
        this.submitCallback = null;
    }

    /**
     * Create and return keyboard DOM element
     * @param {HTMLElement} displayElement - The display element to show typed value
     * @param {Function} onSubmit - Callback function when submit is pressed
     * @returns {HTMLElement} Keyboard element
     */
    create(displayElement, onSubmit) {
        this.displayElement = displayElement;
        this.submitCallback = onSubmit;
        this.currentValue = '';  // Reset value

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

        // Initialize display
        this.updateDisplay();

        return this.element;
    }

    /**
     * Attach event listeners to keyboard keys
     */
    attachHandlers() {
        // Handle key press (works for both mouse and touch)
        const handleKeyPress = (e) => {
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
        };

        // Use touchend for touch devices (click doesn't fire when touchstart has preventDefault)
        this.element.addEventListener('touchend', handleKeyPress, { passive: false });

        // Also handle click for desktop/mouse devices
        this.element.addEventListener('click', handleKeyPress);

        // Prevent scrolling and text selection on touch
        this.element.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    /**
     * Handle number/symbol input
     * @param {string} value - The value to input
     */
    handleInput(value) {
        console.log('handleInput called with:', value); // DEBUG

        // Validation rules
        if (value === '.') {
            // Only allow one decimal point
            if (this.currentValue.includes('.')) {
                console.log('Decimal rejected - already exists'); // DEBUG
                return;
            }
        }

        if (value === '-') {
            // Only allow minus at the beginning
            if (this.currentValue.length > 0) {
                console.log('Minus rejected - not at beginning'); // DEBUG
                return;
            }
        }

        // Update internal value
        this.currentValue += value;
        console.log('New value:', this.currentValue); // DEBUG

        // Update display
        this.updateDisplay();
    }

    /**
     * Handle backspace key
     */
    handleBackspace() {
        // Remove last character from internal value
        this.currentValue = this.currentValue.slice(0, -1);

        // Update display
        this.updateDisplay();
    }

    /**
     * Handle submit key
     */
    handleSubmit() {
        if (this.submitCallback) {
            this.submitCallback();
        }

        // Also dispatch a custom event
        if (this.displayElement) {
            this.displayElement.dispatchEvent(new CustomEvent('keyboardSubmit', {
                bubbles: true,
                detail: { value: this.currentValue }
            }));
        }
    }

    /**
     * Update the display element with current value
     */
    updateDisplay() {
        console.log('updateDisplay called, currentValue:', this.currentValue); // DEBUG

        if (!this.displayElement) {
            console.error('displayElement is null!'); // DEBUG
            return;
        }

        if (this.currentValue === '') {
            // Show placeholder or empty state
            this.displayElement.textContent = '';
            this.displayElement.classList.add('empty');
            console.log('Display cleared (empty)'); // DEBUG
        } else {
            this.displayElement.textContent = this.currentValue;
            this.displayElement.classList.remove('empty');
            console.log('Display updated to:', this.displayElement.textContent); // DEBUG
        }
    }

    /**
     * Get the current typed value
     * @returns {string} Current value
     */
    getValue() {
        return this.currentValue;
    }

    /**
     * Clear the current value
     */
    clearValue() {
        this.currentValue = '';
        this.updateDisplay();
    }

    /**
     * Set a value programmatically
     * @param {string} value - Value to set
     */
    setValue(value) {
        this.currentValue = String(value);
        this.updateDisplay();
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
        this.displayElement = null;
        this.currentValue = '';
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
