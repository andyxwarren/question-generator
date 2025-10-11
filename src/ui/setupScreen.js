/**
 * Setup Screen Component
 *
 * Handles topic selection, difficulty level, and practice session configuration.
 * Integrates with student management and progress tracking (Phase 4).
 */

import { MODULES, getModule } from '../curriculum/modules.js';
import questionEngine from '../core/questionEngine.js';
import questionHistory from '../core/questionHistory.js';
import storageManager from '../core/storageManager.js';
import studentSelector from './studentSelector.js';
import progressDisplay from './progressDisplay.js';

class SetupScreen {
    constructor() {
        this.selectedModule = null;
        this.selectedLevel = 3; // Default: Meeting
        this.questionCount = 5; // Default: 5 questions
        this.container = null;
        this.lastSession = null; // Remember last selections
    }

    /**
     * Initialize the setup screen
     * @param {HTMLElement} container - Container element
     */
    init(container) {
        this.container = container;
        this.render();
        this.attachEventListeners();

        // Listen for module completion events (Phase 3.5)
        document.addEventListener('moduleCompleted', () => {
            this.refreshTopics();
        });
    }

    /**
     * Render the setup screen
     */
    render() {
        this.container.innerHTML = `
            <div class="setup-header">
                <h1>Maths Practice</h1>
                <p class="subtitle">Choose your topic and difficulty to start practicing!</p>
            </div>

            ${this.renderStudentSection()}

            <div class="setup-section">
                <h2 class="section-title">📚 Choose a Topic</h2>
                <div class="topic-grid" id="topicGrid">
                    ${this.renderTopics()}
                </div>
            </div>

            <div class="setup-section">
                <h2 class="section-title">🎯 Choose Difficulty</h2>
                <div class="level-grid" id="levelGrid">
                    ${this.renderLevels()}
                </div>
            </div>

            <div class="setup-section">
                <h2 class="section-title">⚙️ Settings</h2>
                <div class="settings-group">
                    <label for="questionCount">Number of Questions:</label>
                    <div class="input-group">
                        <button class="input-btn" id="decreaseBtn">−</button>
                        <input type="number"
                               id="questionCount"
                               min="1"
                               max="100"
                               value="${this.questionCount}">
                        <button class="input-btn" id="increaseBtn">+</button>
                    </div>
                </div>

                <div class="settings-group" style="margin-top: 1rem;">
                    <label for="cooldownPeriod">Question Cooldown:</label>
                    <select id="cooldownPeriod" class="cooldown-select">
                        ${this.renderCooldownOptions()}
                    </select>
                    <span class="cooldown-info">🔄 Prevents seeing same questions</span>
                </div>

                ${this.renderAdaptiveControls()}

                <div class="settings-actions" style="margin-top: 1rem;">
                    <button class="settings-btn" id="clearHistoryBtn" title="Clear question history">
                        🗑️ Clear History
                    </button>
                    <button class="settings-btn" id="viewStatsBtn" title="View history statistics">
                        📊 View Stats
                    </button>
                </div>
            </div>

            <button class="start-btn" id="startBtn" disabled>
                Start Practice
            </button>
        `;
    }

    /**
     * Render student selection section (Phase 4)
     */
    renderStudentSection() {
        const currentStudent = storageManager.getCurrentStudent();

        if (currentStudent) {
            const stats = storageManager.getStudentStats(currentStudent.id);

            return `
                <div class="student-info-section">
                    <div class="student-info-card">
                        <div class="student-info-main">
                            <div class="student-avatar">👤</div>
                            <div class="student-details">
                                <div class="student-display-name">${this.escapeHtml(currentStudent.name)}</div>
                                ${currentStudent.yearGroup ? `<div class="student-display-year">${this.escapeHtml(currentStudent.yearGroup)}</div>` : ''}
                            </div>
                        </div>
                        <div class="student-info-stats">
                            <div class="student-stat">
                                <span class="stat-value">${stats.totalSessions}</span>
                                <span class="stat-label">Sessions</span>
                            </div>
                            <div class="student-stat">
                                <span class="stat-value">${stats.overallAccuracy}%</span>
                                <span class="stat-label">Accuracy</span>
                            </div>
                            <div class="student-stat">
                                <span class="stat-value">${stats.completedModules}/4</span>
                                <span class="stat-label">Complete</span>
                            </div>
                        </div>
                        <div class="student-info-actions">
                            <button class="student-action-link" id="changeStudentBtn">Change Student</button>
                            <button class="student-action-link" id="viewProgressBtn">View Progress</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="student-info-section">
                    <div class="student-prompt-card">
                        <div class="student-prompt-icon">👥</div>
                        <div class="student-prompt-content">
                            <h3>Track Your Progress</h3>
                            <p>Select a student profile to track practice sessions and performance over time.</p>
                        </div>
                        <button class="student-prompt-btn" id="selectStudentBtn">Select Student</button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Render topic cards
     */
    renderTopics() {
        // Get current student for progress checking
        const currentStudent = storageManager.getCurrentStudent();

        return Object.values(MODULES).map(module => {
            // Check if module is completed for the current student
            let isCompleted = false;
            if (currentStudent && currentStudent.moduleProgress[module.id]) {
                isCompleted = currentStudent.moduleProgress[module.id].completed;
            }

            const completedClass = isCompleted ? 'completed' : '';
            const selectedClass = module.id === this.selectedModule ? 'selected' : '';

            return `
                <div class="topic-card ${selectedClass} ${completedClass}" data-module="${module.id}">
                    ${isCompleted ? '<div class="completion-badge">🏆</div>' : ''}
                    <div class="topic-icon">${module.icon}</div>
                    <div class="topic-name">${module.name}</div>
                    <div class="topic-desc">${module.description}</div>
                    <div class="topic-meta">${module.yearGroup}</div>
                </div>
            `;
        }).join('');
    }

    /**
     * Render cooldown period options
     */
    renderCooldownOptions() {
        const currentCooldown = questionHistory.getCooldownHours();
        const options = [
            { hours: 1, label: '1 hour' },
            { hours: 4, label: '4 hours' },
            { hours: 12, label: '12 hours' },
            { hours: 24, label: '24 hours (default)' },
            { hours: 48, label: '48 hours' },
            { hours: 168, label: '1 week' }
        ];

        return options.map(opt => `
            <option value="${opt.hours}" ${opt.hours === currentCooldown ? 'selected' : ''}>
                ${opt.label}
            </option>
        `).join('');
    }

    /**
     * Render adaptive learning controls (Phase 5)
     */
    renderAdaptiveControls() {
        const currentStudent = storageManager.getCurrentStudent();

        // Only show if student is selected
        if (!currentStudent) {
            return '';
        }

        const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);
        const isEnabled = adaptiveProfile ? adaptiveProfile.enabled : true;

        return `
            <div class="adaptive-controls" style="margin-top: 1.5rem;">
                <div class="adaptive-controls-header">
                    <label class="adaptive-controls-title">🎯 Adaptive Learning</label>
                    <label class="adaptive-toggle">
                        <input type="checkbox" id="adaptiveToggle" ${isEnabled ? 'checked' : ''}>
                        <span class="adaptive-toggle-slider"></span>
                    </label>
                </div>
                <p class="adaptive-controls-description">
                    Automatically monitors performance and suggests difficulty adjustments during practice sessions to keep learning optimal.
                </p>
            </div>
        `;
    }

    /**
     * Render difficulty level cards
     */
    renderLevels() {
        const levels = [
            { num: 1, name: 'Beginning', desc: 'Just starting out', color: 'green' },
            { num: 2, name: 'Developing', desc: 'Building confidence', color: 'blue' },
            { num: 3, name: 'Meeting', desc: 'Meeting expectations', color: 'purple' },
            { num: 4, name: 'Exceeding', desc: 'Going beyond', color: 'orange' }
        ];

        return levels.map(level => `
            <div class="level-card level-${level.color} ${level.num === this.selectedLevel ? 'selected' : ''}"
                 data-level="${level.num}">
                <div class="level-number">Level ${level.num}</div>
                <div class="level-name">${level.name}</div>
                <div class="level-desc">${level.desc}</div>
            </div>
        `).join('');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Phase 4: Student selector buttons
        const selectStudentBtn = this.container.querySelector('#selectStudentBtn');
        if (selectStudentBtn) {
            selectStudentBtn.addEventListener('click', () => {
                this.showStudentSelector();
            });
        }

        const changeStudentBtn = this.container.querySelector('#changeStudentBtn');
        if (changeStudentBtn) {
            changeStudentBtn.addEventListener('click', () => {
                this.showStudentSelector();
            });
        }

        const viewProgressBtn = this.container.querySelector('#viewProgressBtn');
        if (viewProgressBtn) {
            viewProgressBtn.addEventListener('click', () => {
                this.showProgressDashboard();
            });
        }

        // Topic selection
        const topicCards = this.container.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const moduleId = card.dataset.module;
                this.selectTopic(moduleId);
            });
        });

        // Level selection
        const levelCards = this.container.querySelectorAll('.level-card');
        levelCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const level = parseInt(card.dataset.level);
                this.selectLevel(level);
            });
        });

        // Question count controls
        const decreaseBtn = this.container.querySelector('#decreaseBtn');
        const increaseBtn = this.container.querySelector('#increaseBtn');
        const countInput = this.container.querySelector('#questionCount');

        decreaseBtn.addEventListener('click', () => {
            if (this.questionCount > 1) {
                this.questionCount--;
                countInput.value = this.questionCount;
            }
        });

        increaseBtn.addEventListener('click', () => {
            if (this.questionCount < 100) {
                this.questionCount++;
                countInput.value = this.questionCount;
            }
        });

        countInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value);
            if (value < 1) value = 1;
            if (value > 100) value = 100;
            this.questionCount = value;
            countInput.value = value;
        });

        // Start button
        const startBtn = this.container.querySelector('#startBtn');
        startBtn.addEventListener('click', () => {
            this.startPractice();
        });

        // Cooldown period selector
        const cooldownSelect = this.container.querySelector('#cooldownPeriod');
        cooldownSelect.addEventListener('change', (e) => {
            const hours = parseInt(e.target.value);
            questionHistory.setCooldown(hours);
            questionHistory.save();
            console.log(`Cooldown period set to ${hours} hours`);
        });

        // Clear history button
        const clearHistoryBtn = this.container.querySelector('#clearHistoryBtn');
        clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });

        // View stats button
        const viewStatsBtn = this.container.querySelector('#viewStatsBtn');
        viewStatsBtn.addEventListener('click', () => {
            this.viewStats();
        });

        // Phase 5: Adaptive learning toggle
        const adaptiveToggle = this.container.querySelector('#adaptiveToggle');
        if (adaptiveToggle) {
            adaptiveToggle.addEventListener('change', (e) => {
                const currentStudent = storageManager.getCurrentStudent();
                if (currentStudent) {
                    storageManager.setAdaptiveEnabled(currentStudent.id, e.target.checked);
                }
            });
        }
    }

    /**
     * Clear question history (and module progress for current student)
     */
    clearHistory() {
        const currentStudent = storageManager.getCurrentStudent();

        let message = 'This will clear:\n' +
                     '• Question history (duplicate tracking)\n';

        if (currentStudent) {
            message += `• Module progress for ${currentStudent.name}\n` +
                      '• All practice sessions and statistics\n\n' +
                      '⚠️ This cannot be undone!\n\n';
        } else {
            message += '\nYou may see previously seen questions again.\n\n';
        }

        message += 'Continue?';

        const confirmed = confirm(message);

        if (confirmed) {
            // Clear question history (duplicate tracking)
            questionHistory.clear();

            // Clear student-specific data if student is selected
            if (currentStudent) {
                storageManager.clearStudentHistory(currentStudent.id);
            }

            // Refresh UI to show cleared state
            this.render();
            this.attachEventListeners();

            alert(`History cleared! ✓${currentStudent ? `\n\nAll data for ${currentStudent.name} has been reset.` : ''}`);
        }
    }

    /**
     * View history statistics
     */
    viewStats() {
        const stats = questionHistory.getStats();
        const cooldownHours = stats.cooldownHours;

        let message = `📊 Question History Statistics\n\n`;
        message += `Questions tracked: ${stats.totalTracked}\n`;
        message += `Cooldown period: ${cooldownHours} ${cooldownHours === 1 ? 'hour' : 'hours'}\n`;

        if (stats.totalTracked > 0) {
            const oldestDate = new Date(stats.oldestEntry);
            const newestDate = new Date(stats.newestEntry);
            message += `\nOldest entry: ${oldestDate.toLocaleString()}\n`;
            message += `Newest entry: ${newestDate.toLocaleString()}`;
        } else {
            message += `\nNo questions in history yet.`;
        }

        alert(message);
    }

    /**
     * Select a topic
     * @param {string} moduleId - Module identifier
     */
    selectTopic(moduleId) {
        this.selectedModule = moduleId;

        // Update UI
        const topicCards = this.container.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.classList.toggle('selected', card.dataset.module === moduleId);
        });

        // Enable start button if topic is selected
        this.updateStartButton();
    }

    /**
     * Select a difficulty level
     * @param {number} level - Level number (1-4)
     */
    selectLevel(level) {
        this.selectedLevel = level;

        // Update UI
        const levelCards = this.container.querySelectorAll('.level-card');
        levelCards.forEach(card => {
            card.classList.toggle('selected', parseInt(card.dataset.level) === level);
        });
    }

    /**
     * Update start button state
     */
    updateStartButton() {
        const startBtn = this.container.querySelector('#startBtn');
        startBtn.disabled = !this.selectedModule;
    }

    /**
     * Start practice session
     */
    startPractice() {
        if (!this.selectedModule) {
            alert('Please select a topic!');
            return;
        }

        // Save current selection for later
        this.lastSession = {
            moduleId: this.selectedModule,
            level: this.selectedLevel,
            questionCount: this.questionCount
        };

        // Dispatch custom event with configuration
        const event = new CustomEvent('startPractice', {
            detail: this.lastSession
        });
        document.dispatchEvent(event);
    }

    /**
     * Show the screen
     */
    show() {
        this.container.classList.remove('hidden');
    }

    /**
     * Hide the screen
     */
    hide() {
        this.container.classList.add('hidden');
    }

    /**
     * Reset selections (restore last session if available)
     */
    reset() {
        // Restore last session if available, otherwise use defaults
        if (this.lastSession) {
            this.selectedModule = this.lastSession.moduleId;
            this.selectedLevel = this.lastSession.level;
            this.questionCount = this.lastSession.questionCount;
        } else {
            this.selectedModule = null;
            this.selectedLevel = 3;
            this.questionCount = 5;
        }

        this.render();
        this.attachEventListeners();

        // If we restored a previous selection, update the start button
        if (this.selectedModule) {
            this.updateStartButton();
        }
    }

    /**
     * Refresh topic cards (Phase 3.5 - for module completion badges)
     */
    refreshTopics() {
        const topicGrid = this.container.querySelector('#topicGrid');
        if (topicGrid) {
            topicGrid.innerHTML = this.renderTopics();

            // Re-attach click listeners for topic cards
            const topicCards = this.container.querySelectorAll('.topic-card');
            topicCards.forEach(card => {
                card.addEventListener('click', () => {
                    const moduleId = card.dataset.module;
                    this.selectTopic(moduleId);
                });
            });
        }
    }

    /**
     * Show student selector dialog (Phase 4)
     */
    showStudentSelector() {
        studentSelector.show((studentId) => {
            // Refresh student section when student is selected
            this.render();
            this.attachEventListeners();

            // Restore previous selections
            if (this.selectedModule) {
                const topicCards = this.container.querySelectorAll('.topic-card');
                topicCards.forEach(card => {
                    card.classList.toggle('selected', card.dataset.module === this.selectedModule);
                });
                this.updateStartButton();
            }

            const levelCards = this.container.querySelectorAll('.level-card');
            levelCards.forEach(card => {
                card.classList.toggle('selected', parseInt(card.dataset.level) === this.selectedLevel);
            });

            // Optionally show recommended level for selected module
            if (this.selectedModule) {
                const currentStudent = storageManager.getCurrentStudent();
                if (currentStudent) {
                    const recommendedLevel = storageManager.getRecommendedLevel(
                        currentStudent.id,
                        this.selectedModule
                    );

                    if (recommendedLevel !== this.selectedLevel) {
                        this.showLevelRecommendation(recommendedLevel);
                    }
                }
            }
        });
    }

    /**
     * Show progress dashboard (Phase 4)
     */
    showProgressDashboard() {
        progressDisplay.show();
    }

    /**
     * Show level recommendation notification (Phase 4)
     */
    showLevelRecommendation(recommendedLevel) {
        const levelNames = {
            1: 'Beginning',
            2: 'Developing',
            3: 'Meeting',
            4: 'Exceeding'
        };

        const message = `💡 Based on your recent performance, we recommend Level ${recommendedLevel} (${levelNames[recommendedLevel]}) for this module.`;

        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'level-recommendation-notification';
        notification.innerHTML = `
            <div class="recommendation-content">
                <span class="recommendation-icon">💡</span>
                <span class="recommendation-text">${message}</span>
                <button class="recommendation-apply-btn" data-level="${recommendedLevel}">
                    Apply Recommendation
                </button>
                <button class="recommendation-dismiss-btn">×</button>
            </div>
        `;

        this.container.insertBefore(notification, this.container.firstChild);

        // Auto-dismiss after 10 seconds
        const autoDismiss = setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);

        // Apply button
        const applyBtn = notification.querySelector('.recommendation-apply-btn');
        applyBtn.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            this.selectLevel(recommendedLevel);
            notification.remove();
        });

        // Dismiss button
        const dismissBtn = notification.querySelector('.recommendation-dismiss-btn');
        dismissBtn.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            notification.remove();
        });
    }
}

export default SetupScreen;
