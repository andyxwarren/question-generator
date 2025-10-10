/**
 * Setup Screen Component
 *
 * Handles topic selection, difficulty level, and practice session configuration
 */

import { MODULES, getModule } from '../curriculum/modules.js';
import questionEngine from '../core/questionEngine.js';
import questionHistory from '../core/questionHistory.js';
import moduleProgress from '../core/moduleProgress.js';

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
                               max="20"
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
     * Render topic cards
     */
    renderTopics() {
        return Object.values(MODULES).map(module => {
            const isCompleted = moduleProgress.getProgress(module.id).completed;
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
            if (this.questionCount < 20) {
                this.questionCount++;
                countInput.value = this.questionCount;
            }
        });

        countInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value);
            if (value < 1) value = 1;
            if (value > 20) value = 20;
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
    }

    /**
     * Clear question history
     */
    clearHistory() {
        const confirmed = confirm(
            'This will clear all question history.\n\n' +
            'You may see previously seen questions again.\n\n' +
            'Continue?'
        );

        if (confirmed) {
            questionHistory.clear();
            alert('Question history cleared! ✓');
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
}

export default SetupScreen;
