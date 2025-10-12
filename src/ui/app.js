/**
 * Simplified Question Generator App
 *
 * Simple interface to generate and display questions from all difficulty levels
 */

import { MODULES } from '../curriculum/modules.js';
import questionEngine from '../core/questionEngine.js';
import validator from '../core/validator.js';

class App {
    constructor() {
        this.currentModule = null;
        this.questions = [];
        this.questionCount = 5;
    }

    init() {
        this.renderModules();
        this.attachEventListeners();
    }

    /**
     * Render module cards
     */
    renderModules() {
        const modulesGrid = document.querySelector('.modules-grid');

        modulesGrid.innerHTML = Object.values(MODULES).map(module => `
            <div class="module-card" data-module-id="${module.id}">
                <div class="module-icon">${module.icon}</div>
                <h3>${module.name}</h3>
                <p class="module-year">${module.yearGroup}</p>
                <p class="module-desc">${module.description}</p>
            </div>
        `).join('');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Module selection
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const moduleId = card.dataset.moduleId;
                this.selectModule(moduleId);
            });
        });

        // Question count input
        document.getElementById('questionCount').addEventListener('change', (e) => {
            this.questionCount = parseInt(e.target.value);
        });

        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showSection('setup');
        });

        // Submit button
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.submitAnswers();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetAnswers();
        });

        // New quiz button
        document.getElementById('newQuizBtn').addEventListener('click', () => {
            this.showSection('setup');
        });
    }

    /**
     * Select a module and generate questions
     */
    selectModule(moduleId) {
        this.currentModule = MODULES[moduleId];
        this.generateQuestions(moduleId);
        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for all 4 difficulty levels
     */
    generateQuestions(moduleId) {
        this.questions = [];

        // Generate questions for each level (1-4)
        for (let level = 1; level <= 4; level++) {
            const levelQuestions = questionEngine.generate(moduleId, level, this.questionCount);
            this.questions.push({
                level: level,
                levelName: this.getLevelName(level),
                questions: levelQuestions
            });
        }
    }

    /**
     * Get level name
     */
    getLevelName(level) {
        const names = {
            1: 'Beginning',
            2: 'Developing',
            3: 'Meeting',
            4: 'Exceeding'
        };
        return names[level];
    }

    /**
     * Render questions grouped by level
     */
    renderQuestions() {
        const container = document.getElementById('questionsContainer');
        const moduleTitle = document.getElementById('moduleTitle');

        moduleTitle.textContent = `${this.currentModule.icon} ${this.currentModule.name}`;

        container.innerHTML = this.questions.map((levelGroup, levelIdx) => `
            <div class="level-section">
                <h3 class="level-title">Level ${levelGroup.level}: ${levelGroup.levelName}</h3>
                <div class="questions-list">
                    ${levelGroup.questions.map((q, qIdx) => this.renderQuestion(q, levelIdx, qIdx)).join('')}
                </div>
            </div>
        `).join('');
    }

    /**
     * Render a single question
     */
    renderQuestion(question, levelIdx, questionIdx) {
        const questionId = `q_${levelIdx}_${questionIdx}`;

        if (question.type === 'multiple_choice') {
            return `
                <div class="question" data-question-id="${questionId}">
                    <div class="question-text">${questionIdx + 1}. ${question.text}</div>
                    <div class="options">
                        ${question.options.map((option, optIdx) => `
                            <label class="option">
                                <input type="radio" name="${questionId}" value="${option}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="feedback"></div>
                </div>
            `;
        } else if (question.type === 'text_input') {
            return `
                <div class="question" data-question-id="${questionId}">
                    <div class="question-text">${questionIdx + 1}. ${question.text}</div>
                    <input type="text" class="text-input" id="${questionId}" placeholder="Your answer">
                    ${question.hint ? `<div class="hint">💡 Hint: ${question.hint}</div>` : ''}
                    <div class="feedback"></div>
                </div>
            `;
        }
    }

    /**
     * Submit and check all answers
     */
    submitAnswers() {
        let totalCorrect = 0;
        let totalQuestions = 0;

        this.questions.forEach((levelGroup, levelIdx) => {
            levelGroup.questions.forEach((question, qIdx) => {
                const questionId = `q_${levelIdx}_${qIdx}`;
                const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
                const feedbackElement = questionElement.querySelector('.feedback');

                let userAnswer = '';

                // Get user answer
                if (question.type === 'multiple_choice') {
                    const selected = questionElement.querySelector(`input[name="${questionId}"]:checked`);
                    userAnswer = selected ? selected.value : '';
                } else if (question.type === 'text_input') {
                    userAnswer = document.getElementById(questionId).value.trim();
                }

                // Validate answer
                const isCorrect = validator.validate(userAnswer, question.answer, question.type);
                totalQuestions++;
                if (isCorrect) totalCorrect++;

                // Show feedback
                questionElement.classList.remove('correct', 'incorrect');
                if (userAnswer) {
                    questionElement.classList.add(isCorrect ? 'correct' : 'incorrect');
                    feedbackElement.innerHTML = isCorrect
                        ? '<span class="correct-mark">✓ Correct!</span>'
                        : `<span class="incorrect-mark">✗ Incorrect. Answer: ${question.answer}</span>`;
                }
            });
        });

        // Show results summary
        this.showResults(totalCorrect, totalQuestions);
    }

    /**
     * Show results summary
     */
    showResults(correct, total) {
        const percentage = Math.round((correct / total) * 100);
        const resultsContainer = document.getElementById('resultsContainer');

        resultsContainer.innerHTML = `
            <div class="results-summary">
                <div class="score-display">
                    <div class="score-value">${correct} / ${total}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <div class="score-breakdown">
                    ${this.questions.map(levelGroup => {
                        const levelCorrect = this.getLevelScore(levelGroup);
                        const levelTotal = levelGroup.questions.length;
                        const levelPercentage = Math.round((levelCorrect / levelTotal) * 100);
                        return `
                            <div class="level-score">
                                <span class="level-name">Level ${levelGroup.level} (${levelGroup.levelName})</span>
                                <span class="level-result">${levelCorrect}/${levelTotal} (${levelPercentage}%)</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        this.showSection('results');
    }

    /**
     * Get score for a specific level
     */
    getLevelScore(levelGroup) {
        let correct = 0;
        const levelIdx = levelGroup.level - 1;

        levelGroup.questions.forEach((question, qIdx) => {
            const questionId = `q_${levelIdx}_${qIdx}`;
            const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);

            if (questionElement && questionElement.classList.contains('correct')) {
                correct++;
            }
        });

        return correct;
    }

    /**
     * Reset all answers
     */
    resetAnswers() {
        // Clear all radio selections
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Clear all text inputs
        document.querySelectorAll('.text-input').forEach(input => {
            input.value = '';
        });

        // Remove feedback
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('correct', 'incorrect');
            q.querySelector('.feedback').innerHTML = '';
        });
    }

    /**
     * Show a specific section
     */
    showSection(sectionName) {
        const sections = ['setup', 'questions', 'results'];
        sections.forEach(name => {
            const section = document.getElementById(`${name}Section`);
            if (name === sectionName) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;
