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

        // Get all module IDs in this substrand for the generate button
        const substrandModuleIds = Object.values(modulesByYear).map(m => m.id).join(',');

        return `
            <div class="substrand-section">
                <div class="substrand-header">
                    <h3 class="substrand-title">${substrand}</h3>
                    <button class="btn-substrand" data-substrand-modules="${substrandModuleIds}">
                        🎯 Generate for All in ${substrand}
                    </button>
                </div>
                <div class="year-grid">
                    ${allYears.map(year => {
                        const module = modulesByYear[year];
                        return `
                            <div class="year-column">
                                <div class="year-header">Year ${year}</div>
                                ${module ? `
                                    <div class="module-cell" data-module-id="${module.id}">
                                        <div class="module-name">${module.name.includes(':') ? module.name.split(':')[1].trim() : module.name}</div>
                                        <div class="module-ref">${module.id}</div>
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
            // Check if the click was on a substrand button
            const substrandBtn = e.target.closest('.btn-substrand');
            if (substrandBtn) {
                const moduleIds = substrandBtn.dataset.substrandModules.split(',');
                this.generateQuestionsForMultipleModules(moduleIds);
                e.stopPropagation();
                return;
            }

            // Otherwise, handle regular module selection
            const moduleCell = e.target.closest('.module-cell[data-module-id]');
            if (moduleCell) {
                const moduleId = moduleCell.dataset.moduleId;
                this.generateQuestionsForSingleModule(moduleId);
            }
        });

        // Question count input
        document.getElementById('questionCount').addEventListener('change', (e) => {
            this.questionCount = parseInt(e.target.value);
        });

        // Generate all modules button
        document.getElementById('generateAllModulesBtn').addEventListener('click', () => {
            this.generateQuestionsForAllModules();
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

        // Export buttons
        document.getElementById('exportCsvBtn').addEventListener('click', () => {
            this.exportToEnhancedCsv();
        });

        document.getElementById('exportJsonBtn').addEventListener('click', () => {
            this.exportToEnhancedJson();
        });
    }

    /**
     * Generate questions for a single module
     */
    generateQuestionsForSingleModule(moduleId) {
        this.currentModule = MODULES[moduleId];
        this.questions = this.generateQuestionsForModule(moduleId, this.questionCount);
        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for multiple modules (substrand or custom selection)
     */
    generateQuestionsForMultipleModules(moduleIds) {
        // Filter out any empty strings
        const validModuleIds = moduleIds.filter(id => id && MODULES[id]);

        if (validModuleIds.length === 0) {
            alert('No valid modules selected!');
            return;
        }

        this.currentModule = {
            name: `${validModuleIds.length} Module${validModuleIds.length > 1 ? 's' : ''} Selected`,
            icon: '🎯'
        };

        this.questions = [];
        validModuleIds.forEach(moduleId => {
            const moduleQuestions = this.generateQuestionsForModule(moduleId, this.questionCount);
            this.questions.push(...moduleQuestions);
        });

        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for all available modules in the curriculum
     */
    generateQuestionsForAllModules() {
        const allModuleIds = Object.keys(MODULES);

        if (allModuleIds.length === 0) {
            alert('No modules available!');
            return;
        }

        this.currentModule = {
            name: `All Modules (${allModuleIds.length} modules)`,
            icon: '📚'
        };

        this.questions = [];
        allModuleIds.forEach(moduleId => {
            const moduleQuestions = this.generateQuestionsForModule(moduleId, this.questionCount);
            this.questions.push(...moduleQuestions);
        });

        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for a single module, returning grouped structure
     * @param {string} moduleId - The module ID
     * @param {number} count - Number of questions per level
     * @returns {Array} Array of level groups with questions
     */
    generateQuestionsForModule(moduleId, count) {
        const levelGroups = [];
        const moduleInfo = MODULES[moduleId];

        // Generate questions for each level (1-4)
        for (let level = 1; level <= 4; level++) {
            const levelQuestions = questionEngine.generate(moduleId, level, count);

            // Add module info to each question for display purposes
            const questionsWithModuleInfo = levelQuestions.map(q => ({
                ...q,
                moduleInfo: moduleInfo
            }));

            levelGroups.push({
                level: level,
                levelName: this.getLevelName(level),
                questions: questionsWithModuleInfo,
                moduleId: moduleId,
                moduleName: moduleInfo.name
            });
        }

        return levelGroups;
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

        // Calculate total questions
        const totalQuestions = this.questions.reduce((sum, level) => sum + level.questions.length, 0);

        // Set progress text on actions bar
        const actionsBar = document.querySelector('.actions');
        if (actionsBar) {
            actionsBar.setAttribute('data-progress', `0 of ${totalQuestions} answered`);
        }

        // Add entrance animations with stagger
        setTimeout(() => {
            const questions = document.querySelectorAll('.question');
            questions.forEach((q, idx) => {
                q.style.animationDelay = `${idx * 0.05}s`;
                q.classList.add('animate-slide-in');
            });

            // Auto-focus first input after animations start
            this.focusFirstInput();
        }, 10);

        // Setup progress tracking
        this.setupProgressTracking(totalQuestions);
    }

    /**
     * Focus first input with visual pulse animation
     */
    focusFirstInput() {
        // Find first text input or first question's first option
        const firstTextInput = document.querySelector('.text-input');
        const firstRadio = document.querySelector('input[type="radio"]');

        const elementToFocus = firstTextInput || firstRadio;

        if (elementToFocus) {
            setTimeout(() => {
                elementToFocus.focus();
                // Add pulsing animation to draw attention
                elementToFocus.classList.add('initial-focus');

                // Remove the class after animation completes
                setTimeout(() => {
                    elementToFocus.classList.remove('initial-focus');
                }, 1500);
            }, 300); // Wait for slide-in animation
        }
    }

    /**
     * Setup progress tracking for answered questions
     */
    setupProgressTracking(totalQuestions) {
        const actionsBar = document.querySelector('.actions');
        const submitBtn = document.getElementById('submitBtn');

        const updateProgress = () => {
            let answered = 0;

            // Count filled text inputs
            document.querySelectorAll('.text-input').forEach(input => {
                if (input.value.trim()) answered++;
            });

            // Count selected radio buttons (by unique name)
            const radioGroups = new Set();
            document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
                radioGroups.add(radio.name);
            });
            answered += radioGroups.size;

            // Update progress text
            if (actionsBar) {
                actionsBar.setAttribute('data-progress', `${answered} of ${totalQuestions} answered`);
            }

            // Enable/highlight submit when all answered
            if (submitBtn) {
                if (answered === totalQuestions) {
                    submitBtn.classList.add('ready-to-submit');
                } else {
                    submitBtn.classList.remove('ready-to-submit');
                }
            }
        };

        // Listen to all inputs
        document.addEventListener('input', updateProgress);
        document.addEventListener('change', updateProgress);
    }

    /**
     * Render a single question
     */
    renderQuestion(question, levelIdx, questionIdx) {
        const questionId = `q_${levelIdx}_${questionIdx}`;

        // Show module badge if this is from mixed questions
        const moduleBadge = question.moduleInfo ?
            `<div class="module-badge">${question.moduleInfo.icon} ${question.moduleInfo.name}</div>` : '';

        if (question.type === 'multiple_choice') {
            return `
                <div class="question" data-question-id="${questionId}">
                    ${moduleBadge}
                    <div class="question-text">${questionIdx + 1}. ${this.renderQuestionText(question.text)}</div>
                    <div class="options">
                        ${question.options.map((option, optIdx) => {
                            // Format number options with commas
                            const displayValue = typeof option === 'number' ? option.toLocaleString('en-US') : option;
                            return `
                                <label class="option">
                                    <input type="radio" name="${questionId}" value="${option}">
                                    <span>${displayValue}</span>
                                </label>
                            `;
                        }).join('')}
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
                        ${moduleBadge}
                        <div class="question-text">${questionIdx + 1}. ${this.renderQuestionText(question.text)}</div>
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
                        ${moduleBadge}
                        <div class="question-text">${questionIdx + 1}. ${this.renderQuestionText(question.text)}</div>
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
                        // Format answer for display
                        const answerNum = parseFloat(question.answer);
                        const displayAnswer = !isNaN(answerNum) ? answerNum.toLocaleString('en-US') : question.answer;

                        feedbackElement.innerHTML = `
                            <div class="incorrect-mark">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15 5L5 15M5 5L15 15"
                                          stroke="#ef4444"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                Not quite. The answer is ${displayAnswer}
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
     * Format answer for display (add commas to numbers)
     */
    formatAnswerForDisplay(answer) {
        // Handle comma-separated answers (multi-gap questions)
        if (answer.includes(',')) {
            return answer.split(',').map(part => {
                const num = parseFloat(part.trim());
                return !isNaN(num) ? num.toLocaleString('en-US') : part.trim();
            }).join(', ');
        }

        // Handle single number
        const num = parseFloat(answer);
        return !isNaN(num) ? num.toLocaleString('en-US') : answer;
    }

    /**
     * Escape HTML to prevent XSS, but allow specific visual classes
     * @param {string} text - Text that may contain HTML
     * @returns {string} Safe HTML
     */
    renderQuestionText(text) {
        // Check if text contains our safe visual HTML classes
        const hasSafeVisuals = text.includes('class="simple-number-line"') ||
                              text.includes('class="simple-dots-container"') ||
                              text.includes('class="ten-frame"') ||
                              text.includes('class="base10-container"') ||
                              text.includes('class="tally-marks-container"') ||
                              text.includes('class="columnar-calc"') ||
                              text.includes('class="visual-array"') ||
                              text.includes('class="visual-groups"') ||
                              text.includes('class="visual-sharing"') ||
                              text.includes('class="visual-repeated"') ||
                              text.includes('class="grid-method"') ||
                              text.includes('class="short-division"') ||
                              text.includes('<br>');

        if (hasSafeVisuals) {
            // Text contains our visual HTML - render as-is
            return text;
        } else {
            // Plain text - escape HTML entities
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
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
                                            <span class="answer-value ${answer.isCorrect ? 'correct' : 'incorrect'}">${this.formatAnswerForDisplay(answer.userAnswer)}</span>
                                        </div>
                                        ${!answer.isCorrect ? `
                                            <div class="answer-row">
                                                <span class="answer-label">Correct answer:</span>
                                                <span class="answer-value correct">${this.formatAnswerForDisplay(answer.correctAnswer)}</span>
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

        // Reset progress indicator
        const totalQuestions = this.questions.reduce((sum, level) => sum + level.questions.length, 0);
        const actionsBar = document.querySelector('.actions');
        if (actionsBar) {
            actionsBar.setAttribute('data-progress', `0 of ${totalQuestions} answered`);
        }

        // Remove ready-to-submit class
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.classList.remove('ready-to-submit');
        }
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

    // ============================================================================
    // ENHANCED EXPORT METHODS - Lean Export System
    // ============================================================================

    /**
     * Export questions to lean JSON format - data over presentation
     */
    exportToEnhancedJson() {
        const exportData = {
            metadata: {
                exportDate: new Date().toISOString(),
                version: "1.0",
                generatorVersion: "1.0",
                questionCount: this.questions.reduce((sum, level) => sum + level.questions.length, 0),
                moduleCount: new Set(this.questions.map(level => level.moduleId)).size
            },
            questions: []
        };

        this.questions.forEach(levelGroup => {
            const module = MODULES[levelGroup.moduleId];
            const params = module ? module.parameters[levelGroup.level] : {};

            levelGroup.questions.forEach((q, qIdx) => {
                const questionData = {
                    // Identification
                    id: q.id,
                    questionNumber: qIdx + 1,

                    // Curriculum metadata
                    moduleId: levelGroup.moduleId,
                    moduleName: levelGroup.moduleName,
                    moduleDescription: module ? module.description : '',
                    yearGroup: module ? module.yearGroup : '',
                    strand: module ? module.strand : '',
                    substrand: module ? module.substrand : '',
                    curriculumRef: module ? module.ref : '',
                    icon: module ? module.icon : '',

                    // Difficulty
                    level: levelGroup.level,
                    levelName: levelGroup.levelName,
                    difficultyScore: this.calculateDifficultyScore(levelGroup.level, params),

                    // Question content - DATA FOCUSED
                    questionType: q.type,
                    questionText: this.stripHtml(q.text),  // Plain text for search/display
                    visualType: this.detectVisualType(q.text, q.type, params),  // How to render
                    questionData: this.extractQuestionData(q, params, levelGroup.moduleId),  // Structured data

                    // Answer data
                    correctAnswer: q.answer,
                    answerType: this.detectAnswerType(q.answer, q.type),
                    multipleChoiceOptions: q.options || null,
                    hint: q.hint || null,
                    multiGapAnswers: q.answers || null,

                    // Generator context
                    generatorParameters: JSON.parse(JSON.stringify(params)),

                    // Searchability
                    tags: this.generateTags(q, module, params),

                    // Timestamps
                    generatedAt: q.timestamp ? new Date(q.timestamp).toISOString() : new Date().toISOString()
                };

                exportData.questions.push(questionData);
            });
        });

        const jsonContent = JSON.stringify(exportData, null, 2);
        const filename = `questions-${new Date().toISOString().slice(0,10)}-${Date.now()}.json`;
        this.downloadFile(jsonContent, filename, 'application/json;charset=utf-8;');

        console.log(`✅ Exported ${exportData.metadata.questionCount} questions to ${filename}`);
    }

    /**
     * Export to CSV with UTF-8 BOM for Excel compatibility
     */
    exportToEnhancedCsv() {
        const headers = [
            'ID',
            'Question_Number',
            'Module_ID',
            'Module_Name',
            'Year_Group',
            'Strand',
            'Substrand',
            'Level',
            'Difficulty_Score',
            'Question_Type',
            'Question_Text',
            'Visual_Type',
            'Question_Data_JSON',
            'Correct_Answer',
            'Answer_Type',
            'Options_JSON',
            'Hint',
            'Tags',
            'Generated_At',
            'Parameters_JSON'
        ];

        const rows = [];

        this.questions.forEach(levelGroup => {
            const module = MODULES[levelGroup.moduleId];
            const params = module ? module.parameters[levelGroup.level] : {};

            levelGroup.questions.forEach((q, qIdx) => {
                const row = [
                    q.id,
                    qIdx + 1,
                    levelGroup.moduleId,
                    this.escapeCsv(levelGroup.moduleName),
                    module ? module.yearGroup : '',
                    module ? this.escapeCsv(module.strand) : '',
                    module ? this.escapeCsv(module.substrand) : '',
                    levelGroup.level,
                    this.calculateDifficultyScore(levelGroup.level, params),
                    q.type,
                    this.escapeCsv(this.stripHtml(q.text)),
                    this.detectVisualType(q.text, q.type, params),
                    this.escapeCsv(JSON.stringify(this.extractQuestionData(q, params, levelGroup.moduleId))),
                    this.escapeCsv(q.answer),
                    this.detectAnswerType(q.answer, q.type),
                    q.options ? this.escapeCsv(JSON.stringify(q.options)) : '',
                    q.hint ? this.escapeCsv(q.hint) : '',
                    this.escapeCsv(this.generateTags(q, module, params).join('; ')),
                    q.timestamp ? new Date(q.timestamp).toISOString() : '',
                    this.escapeCsv(JSON.stringify(params))
                ];
                rows.push(row.join(','));
            });
        });

        // Add UTF-8 BOM for Excel compatibility
        const BOM = '\uFEFF';
        const csvContent = BOM + headers.join(',') + '\n' + rows.join('\n');
        const filename = `questions-${new Date().toISOString().slice(0,10)}-${Date.now()}.csv`;
        this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');

        console.log(`✅ Exported to ${filename} (Excel-compatible)`);
    }

    // ============================================================================
    // DATA EXTRACTION METHODS
    // ============================================================================

    /**
     * Detect visual presentation type
     */
    detectVisualType(text, type, params) {
        if (text.includes('columnar-calc')) return 'columnar_calculation';
        if (text.includes('short-division')) return 'short_division';
        if (text.includes('long-division')) return 'long_division';
        if (text.includes('number-line')) return 'number_line';
        if (text.includes('grid-method')) return 'grid_method';
        if (/<pre>/.test(text)) return 'formatted_text';
        if (/<table>/.test(text)) return 'table';

        if (type === 'multiple_choice') return 'multiple_choice';
        if (type === 'text_input') return 'text_input';
        if (type === 'fill_blanks') return 'fill_blanks';

        return 'plain_text';
    }

    /**
     * Extract structured question data for reconstruction
     */
    extractQuestionData(question, params, moduleId) {
        const data = {
            originalText: question.text  // Keep as reference
        };

        // Columnar calculations (C02, C07 modules)
        if (question.text.includes('columnar-calc')) {
            const numbers = this.extractNumbersFromText(question.text);
            data.type = 'columnar';
            data.numbers = numbers;
            data.operator = this.extractOperator(question.text);
            data.showWork = false;
        }

        // Division questions
        else if (question.text.includes('division')) {
            const numbers = this.extractNumbersFromText(question.text);
            data.type = 'division';
            data.dividend = numbers[0];
            data.divisor = numbers[1];
            data.showRemainder = question.text.toLowerCase().includes('remainder');
        }

        // Sequence/counting questions (N01 modules)
        else if (moduleId.includes('N01')) {
            const numbers = this.extractNumbersFromText(question.text);
            data.type = 'sequence';
            data.sequence = numbers;
            data.direction = params.directions ? params.directions[0] : 'forwards';
            data.stepSize = params.step_sizes ? params.step_sizes[0] : null;
        }

        // Comparison questions
        else if (question.text.toLowerCase().includes('compare') ||
                 question.text.includes('>') ||
                 question.text.includes('<')) {
            const numbers = this.extractNumbersFromText(question.text);
            data.type = 'comparison';
            data.numbers = numbers;
        }

        // Place value questions (N03, N04 modules)
        else if (moduleId.includes('N03') || moduleId.includes('N04')) {
            const numbers = this.extractNumbersFromText(question.text);
            data.type = 'place_value';
            data.number = numbers[0];
            data.operation = this.extractPlaceValueOperation(question.text);
        }

        // Generic: extract numbers and structure
        else {
            data.type = 'generic';
            data.numbers = this.extractNumbersFromText(question.text);
            data.hasGaps = question.text.includes('?');
        }

        return data;
    }

    /**
     * Extract numbers from question text
     */
    extractNumbersFromText(text) {
        const plainText = this.stripHtml(text);
        const matches = plainText.match(/-?\d+\.?\d*/g);
        return matches ? matches.map(n => parseFloat(n)) : [];
    }

    /**
     * Extract operator from question
     */
    extractOperator(text) {
        if (text.includes('×') || text.toLowerCase().includes('multiply')) return '×';
        if (text.includes('÷') || text.toLowerCase().includes('divide')) return '÷';
        if (text.includes('+') || text.toLowerCase().includes('add')) return '+';
        if (text.includes('−') || text.includes('-') || text.toLowerCase().includes('subtract')) return '−';
        return null;
    }

    /**
     * Extract place value operation type
     */
    extractPlaceValueOperation(text) {
        const lower = text.toLowerCase();
        if (lower.includes('digit')) return 'identify_digit';
        if (lower.includes('value')) return 'place_value';
        if (lower.includes('expand')) return 'expanded_form';
        if (lower.includes('round')) return 'rounding';
        return 'generic';
    }

    /**
     * Detect answer type
     */
    detectAnswerType(answer, questionType) {
        if (questionType === 'multiple_choice') return 'single_choice';
        if (answer && answer.includes(',')) return 'multi_part';
        if (!isNaN(parseFloat(answer))) return 'numeric';
        return 'text';
    }

    // ============================================================================
    // HELPER METHODS
    // ============================================================================

    /**
     * Strip HTML tags to get plain text
     */
    stripHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.innerHTML = text;
        return (div.textContent || div.innerText || '').trim();
    }

    /**
     * Escape values for CSV format
     */
    escapeCsv(value) {
        if (value === null || value === undefined) return '';
        const str = String(value);
        if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    }

    /**
     * Calculate difficulty score (0-100)
     */
    calculateDifficultyScore(level, params) {
        let score = 20 + (level - 1) * 20;

        if (!params) return score;

        if (params.max_value !== undefined) {
            if (params.max_value > 10000000) score += 20;
            else if (params.max_value > 1000000) score += 15;
            else if (params.max_value > 100000) score += 12;
            else if (params.max_value > 10000) score += 8;
            else if (params.max_value > 1000) score += 5;
            else if (params.max_value > 100) score += 2;
        }

        if (params.operations && params.operations.length > 3) score += 5;
        if (params.include_negatives) score += 8;
        if (params.include_decimals) score += 6;

        return Math.min(100, Math.max(0, score));
    }

    /**
     * Generate searchable tags
     */
    generateTags(question, module, params) {
        const tags = [];

        // Question type
        if (question.type) tags.push(question.type);
        if (question.options) tags.push('multiple-choice');
        if (question.answers && question.answers.length > 1) tags.push('multi-part');

        // Visual type
        const visualType = this.detectVisualType(question.text, question.type, params);
        if (visualType !== 'plain_text') tags.push(visualType);

        // Curriculum
        if (module) {
            if (module.strand) tags.push(module.strand.toLowerCase().replace(/\s+/g, '-'));
            if (module.yearGroup) tags.push(module.yearGroup.toLowerCase().replace(/\s+/g, '-'));
        }

        // Parameters
        if (params) {
            if (params.operations) {
                params.operations.forEach(op => tags.push(`op-${op}`));
            }
            if (params.include_zero) tags.push('includes-zero');
            if (params.include_negatives) tags.push('negative-numbers');

            if (params.max_value !== undefined) {
                if (params.max_value <= 20) tags.push('numbers-to-20');
                else if (params.max_value <= 100) tags.push('numbers-to-100');
                else if (params.max_value <= 1000) tags.push('numbers-to-1000');
                else if (params.max_value <= 10000) tags.push('numbers-to-10k');
                else tags.push('large-numbers');
            }
        }

        return [...new Set(tags)];
    }

    /**
     * Helper to trigger file download
     */
    downloadFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;
