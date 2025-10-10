/**
 * Module Completion Prompt Component
 *
 * Shows celebration overlay when student completes all 4 levels of a module.
 * Offers to mark the module as officially completed.
 * Part of Phase 3.5: Module Completion System
 */

import moduleProgress from '../core/moduleProgress.js';

class ModuleCompletionPrompt {
    constructor() {
        this.element = null;
        this.isVisible = false;
    }

    /**
     * Show completion prompt for a module (auto-marks as complete)
     * @param {string} moduleId - Module identifier
     * @param {string} moduleName - Module display name
     * @param {string} moduleIcon - Module emoji icon
     * @returns {HTMLElement} Prompt element
     */
    show(moduleId, moduleName, moduleIcon) {
        // Don't show if already marked complete
        const progress = moduleProgress.getProgress(moduleId);
        if (progress.completed) {
            return null;
        }

        // Automatically mark as complete
        moduleProgress.markModuleComplete(moduleId);

        // Remove existing prompt if any
        this.hide();

        // Create overlay element with celebration only
        this.element = document.createElement('div');
        this.element.className = 'completion-overlay';
        this.element.innerHTML = `
            <div class="completion-card">
                <div class="completion-success">
                    <div class="completion-success-icon">🏆</div>
                    <h2>Module Completed!</h2>
                    <div class="completion-module-icon">${moduleIcon}</div>
                    <div class="completion-module-name">${moduleName}</div>
                    <p class="completion-message">
                        Congratulations! You've mastered all difficulty levels!
                    </p>
                    <p class="completion-note">
                        You can still practice this module anytime.
                    </p>
                </div>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(this.element);
        this.isVisible = true;

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            this.hide();
            // Trigger event to update setup screen badges
            document.dispatchEvent(new CustomEvent('moduleCompleted', {
                detail: { moduleId }
            }));
        }, 3000);

        return this.element;
    }

    /**
     * Hide and remove the prompt
     */
    hide() {
        if (this.element) {
            this.element.classList.add('fade-out');

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
     * Check if prompt is currently visible
     * @returns {boolean} Visibility status
     */
    isShowing() {
        return this.isVisible;
    }
}

// Export singleton instance
const moduleCompletionPrompt = new ModuleCompletionPrompt();
export default moduleCompletionPrompt;
