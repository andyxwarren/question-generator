/**
 * Simplified Question Generator App
 *
 * Simple interface to generate and display questions from all difficulty levels
 */

import { MODULES } from '../curriculum/parameters.js';
import questionEngine from '../core/questionEngine.js';
import validator from '../core/validator.js';

class App {
    constructor() {
        this.currentModule = null;
        this.questions = [];
        this.questionCount = 5;
        this.answerData = []; // Store detailed results for each question
    }

    init() {
        this.renderModules();
        this.attachEventListeners();
    }

    /**
     * Render module cards grouped by strand, substrand, and year
     */
    renderModules() {
        const modulesGrid = document.querySelector('.modules-grid');

        // Group modules by strand -> substrand -> year
        const groupedModules = this.groupModulesByStrandAndSubstrand();

        // Generate HTML for each strand
        modulesGrid.innerHTML = Object.entries(groupedModules).map(([strand, substrands]) => `
            <div class="strand-section">
                <h2 class="strand-title">${strand}</h2>
                ${Object.entries(substrands).map(([substrand, modules]) =>
                    this.renderSubstrandGrid(substrand, modules)
                ).join('')}
            </div>
        `).join('');
    }

    /**
     * Group modules by strand and substrand
     */
    groupModulesByStrandAndSubstrand() {
        const grouped = {};

        Object.values(MODULES).forEach(module => {
            const strand = module.strand;
            const substrand = module.substrand;

            if (!grouped[strand]) {
                grouped[strand] = {};
            }

            if (!grouped[strand][substrand]) {
                grouped[strand][substrand] = {};
            }

            // Extract year number from yearGroup (e.g., "Year 1" -> 1)
            const yearMatch = module.yearGroup.match(/Year (\d+)/);
            const year = yearMatch ? parseInt(yearMatch[1]) : null;

            if (year) {
                grouped[strand][substrand][year] = module;
            }
        });

        return grouped;
    }

    /**
     * Render a substrand grid with years as columns
     */
    renderSubstrandGrid(substrand, modulesByYear) {
        // Find all years (1-6)
        const allYears = [1, 2, 3, 4, 5, 6];

        return `
            <div class="substrand-section">
                <h3 class="substrand-title">${substrand}</h3>
                <div class="year-grid">
                    ${allYears.map(year => {
                        const module = modulesByYear[year];
                        return `
                            <div class="year-column">
                                <div class="year-header">Year ${year}</div>
                                ${module ? `
                                    <div class="module-cell" data-module-id="${module.id}">
                                        <div class="module-ref">${module.ref || module.name.split(':')[0]}</div>
                                        <div class="module-name">${module.name}</div>
                                        <div class="module-description">${module.description}</div>
                                    </div>
                                ` : `
                                    <div class="module-cell empty">
                                        <span class="empty-cell">-</span>
                                    </div>
                                `}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Module selection (delegated to handle dynamically created elements)
        document.querySelector('.modules-grid').addEventListener('click', (e) => {
            const moduleCell = e.target.closest('.module-cell[data-module-id]');
            if (moduleCell) {
                const moduleId = moduleCell.dataset.moduleId;
                this.selectModule(moduleId);
            }
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
                <h3 class="level-title" data-level="${levelGroup.level}">${levelGroup.levelName}</h3>
                <div class="questions-list">
                    ${levelGroup.questions.map((q, qIdx) => this.renderQuestion(q, levelIdx, qIdx)).join('')}
                </div>
            </div>
        `).join('');

        // Add entrance animations with stagger
        setTimeout(() => {
            const questions = document.querySelectorAll('.question');
            questions.forEach((q, idx) => {
                q.style.animationDelay = `${idx * 0.05}s`;
                q.classList.add('animate-slide-in');
            });
        }, 10);
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
            // Check if multi-gap question
            const isMultiGap = question.answers && question.answers.length > 1;

            if (isMultiGap) {
                return `
                    <div class="question" data-question-id="${questionId}">
                        <div class="question-text">${questionIdx + 1}. ${question.text}</div>
                        <div class="multi-input-container">
                            ${question.answers.map((_, idx) => `
                                <input type="text"
                                       class="text-input multi-gap"
                                       data-gap-index="${idx}"
                                       placeholder="Answer ${idx + 1}"
                                       size="8">
                            `).join('')}
                        </div>
                        ${question.hint ? `<div class="hint">💡 Hint: ${question.hint}</div>` : ''}
                        <div class="feedback"></div>
                    </div>
                `;
            } else {
                // Single input
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
    }

    /**
     * Submit and check all answers
     */
    submitAnswers() {
        let totalCorrect = 0;
        let totalQuestions = 0;
        this.answerData = []; // Reset answer data

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
                    // Check for multi-gap inputs
                    const multiGaps = questionElement.querySelectorAll('.text-input.multi-gap');
                    if (multiGaps.length > 0) {
                        // Collect all gap answers and join with comma
                        const gapAnswers = Array.from(multiGaps).map(input => input.value.trim());
                        userAnswer = gapAnswers.join(',');
                    } else {
                        // Single input
                        const inputElement = document.getElementById(questionId);
                        userAnswer = inputElement ? inputElement.value.trim() : '';
                    }
                }

                // Validate answer
                const result = validator.validate(question, userAnswer);
                totalQuestions++;
                if (result.isCorrect) totalCorrect++;

                // Store detailed answer data
                this.answerData.push({
                    level: levelGroup.level,
                    levelName: levelGroup.levelName,
                    questionNumber: qIdx + 1,
                    questionText: question.text,
                    userAnswer: userAnswer || '(No answer)',
                    correctAnswer: question.answer,
                    isCorrect: result.isCorrect,
                    questionType: question.type
                });

                // Show feedback with enhanced animations
                questionElement.classList.remove('correct', 'incorrect');
                if (userAnswer) {
                    questionElement.classList.add(result.isCorrect ? 'correct' : 'incorrect');

                    if (result.isCorrect) {
                        feedbackElement.innerHTML = `
                            <div class="correct-mark">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M16.7 5.3L8.5 13.5L3.3 8.3"
                                          stroke="#10b981"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                Excellent work!
                            </div>
                        `;
                    } else {
                        feedbackElement.innerHTML = `
                            <div class="incorrect-mark">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15 5L5 15M5 5L15 15"
                                          stroke="#ef4444"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                Not quite. The answer is ${question.answer}
                            </div>
                        `;
                    }
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

        // Group answer data by level
        const answersByLevel = {};
        this.answerData.forEach(answer => {
            if (!answersByLevel[answer.level]) {
                answersByLevel[answer.level] = {
                    levelName: answer.levelName,
                    answers: []
                };
            }
            answersByLevel[answer.level].answers.push(answer);
        });

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

            <div class="detailed-results">
                <h3>Detailed Results</h3>
                ${Object.keys(answersByLevel).sort().map(level => `
                    <div class="level-results-section">
                        <h4 class="level-results-title">Level ${level}: ${answersByLevel[level].levelName}</h4>
                        <div class="question-results-list">
                            ${answersByLevel[level].answers.map(answer => `
                                <div class="question-result ${answer.isCorrect ? 'correct' : 'incorrect'}">
                                    <div class="question-result-header">
                                        <span class="result-icon">
                                            ${answer.isCorrect ? `
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M16.7 5.3L8.5 13.5L3.3 8.3"
                                                          stroke="currentColor"
                                                          stroke-width="2"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"/>
                                                </svg>
                                            ` : `
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M15 5L5 15M5 5L15 15"
                                                          stroke="currentColor"
                                                          stroke-width="2"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"/>
                                                </svg>
                                            `}
                                        </span>
                                        <span class="question-number">Question ${answer.questionNumber}</span>
                                    </div>
                                    <div class="question-result-text">${answer.questionText}</div>
                                    <div class="answer-comparison">
                                        <div class="answer-row">
                                            <span class="answer-label">Your answer:</span>
                                            <span class="answer-value ${answer.isCorrect ? 'correct' : 'incorrect'}">${answer.userAnswer}</span>
                                        </div>
                                        ${!answer.isCorrect ? `
                                            <div class="answer-row">
                                                <span class="answer-label">Correct answer:</span>
                                                <span class="answer-value correct">${answer.correctAnswer}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
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
