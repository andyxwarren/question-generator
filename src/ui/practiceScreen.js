/**
 * Practice Screen Component
 *
 * Handles question display, answer collection, and progress tracking.
 * Includes streak tracking and auto power-up system (Phase 3).
 * Tracks module completion progress (Phase 3.5).
 * Integrates with StorageManager for detailed session tracking (Phase 4).
 * Integrates with Adaptive Difficulty Engine for real-time performance monitoring (Phase 5).
 */

import validator from '../core/validator.js';
import OnScreenKeyboard from './onScreenKeyboard.js';
import streakTracker from '../core/streakTracker.js';
import powerUpButton from './powerUpButton.js';
import moduleCompletionPrompt from './moduleCompletionPrompt.js';
import storageManager from '../core/storageManager.js';
import performanceAnalyzer from '../core/performanceAnalyzer.js';
import adaptiveDifficultyEngine from '../core/adaptiveDifficultyEngine.js';
import confidenceMeter from './confidenceMeter.js';
import adaptiveSuggestionModal from './adaptiveSuggestionModal.js';

class PracticeScreen {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = {
            correct: 0,
            incorrect: 0
        };
        this.startTime = null;
        this.container = null;
        this.currentAnswer = null;
        this.keyboard = null; // On-screen keyboard instance
        this.currentModule = null; // Current module ID (for level-up)
        this.currentLevel = null; // Current difficulty level (for level-up)
        this.leveledUp = false; // Track if student leveled up this session

        // Phase 4: Session tracking
        this.sessionId = null; // Current session ID
        this.questionStartTime = null; // Time when current question was shown
    }

    /**
     * Initialize the practice screen
     * @param {HTMLElement} container - Container element
     * @param {Array} questions - Array of question objects
     * @param {string} moduleId - Current module ID
     * @param {number} level - Current difficulty level
     */
    init(container, questions, moduleId, level) {
        this.container = container;
        this.questions = questions;
        this.currentIndex = 0;
        this.score = { correct: 0, incorrect: 0 };
        this.startTime = Date.now();
        this.currentAnswer = null;
        this.currentModule = moduleId;
        this.currentLevel = level;
        this.leveledUp = false;

        // Reset streak tracker for new session
        streakTracker.resetSession();

        // Phase 4: Create session if student is selected
        const currentStudent = storageManager.getCurrentStudent();
        if (currentStudent) {
            this.sessionId = storageManager.createSession(
                currentStudent.id,
                moduleId,
                level,
                questions.length
            );
            console.log(`✓ Session tracking enabled for: ${currentStudent.name}`);
        } else {
            this.sessionId = null;
            console.log('ℹ No student selected - session tracking disabled');
        }

        // Phase 5: Initialize adaptive system if student is selected
        if (currentStudent) {
            const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);

            // Check if adaptive is enabled for this student
            if (adaptiveProfile && adaptiveProfile.enabled) {
                // Reset and start performance tracking
                performanceAnalyzer.startSession(
                    this.sessionId,
                    currentStudent.id,
                    moduleId,
                    level
                );

                // Reset adaptive engine for new session
                adaptiveDifficultyEngine.resetSession();

                console.log('🎯 Adaptive system: ENABLED for this session');
            } else {
                console.log('🎯 Adaptive system: DISABLED for this student');
            }
        }

        this.render();
        this.showQuestion();
    }

    /**
     * Render the practice screen structure
     */
    render() {
        // Check which system is active
        const currentStudent = storageManager.getCurrentStudent();
        const adaptiveProfile = currentStudent ? storageManager.getAdaptiveProfile(currentStudent.id) : null;
        const adaptiveEnabled = adaptiveProfile && adaptiveProfile.enabled;

        // Build system indicator
        const systemIndicator = adaptiveEnabled
            ? '<span class="system-indicator adaptive">🎯 Adaptive Learning</span>'
            : '<span class="system-indicator powerup">⚡ Power-Up Mode</span>';

        this.container.innerHTML = `
            <div id="confidenceMeterContainer"></div>

            <div class="practice-header">
                <div class="progress-info">
                    <span class="question-counter">
                        Question <span id="currentQ">1</span> of <span id="totalQ">${this.questions.length}</span>
                    </span>
                    <span class="level-display" id="levelDisplay">${this.getLevelName(this.currentLevel)}</span>
                    ${systemIndicator}
                </div>
                <div class="score-display">
                    <div class="score-item correct">
                        <div class="score-value" id="correctCount">0</div>
                        <div class="score-label">Correct</div>
                    </div>
                    <div class="score-item incorrect">
                        <div class="score-value" id="incorrectCount">0</div>
                        <div class="score-label">Incorrect</div>
                    </div>
                    <div id="streakDisplayContainer"></div>
                </div>
            </div>

            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>

            <div class="question-container">
                <div class="question-card" id="questionCard">
                    <!-- Question content will be inserted here -->
                </div>
            </div>
        `;

        // Phase 5: Initialize and show confidence meter if adaptive is enabled
        // Reuse currentStudent and adaptiveEnabled from above
        if (adaptiveEnabled) {
            const meterContainer = this.container.querySelector('#confidenceMeterContainer');
            confidenceMeter.init(meterContainer);
            confidenceMeter.show();
        }
    }

    /**
     * Show current question
     */
    showQuestion() {
        const question = this.questions[this.currentIndex];
        this.currentAnswer = null;

        // Phase 4: Record question start time for response time tracking
        this.questionStartTime = Date.now();

        // Clean up previous keyboard if exists
        if (this.keyboard) {
            this.keyboard.destroy();
            this.keyboard = null;
        }

        const questionCard = this.container.querySelector('#questionCard');
        questionCard.innerHTML = `
            <div class="question-type">${this.getQuestionTypeLabel(question.type)}</div>
            <div class="question-text">${question.text}</div>
            ${question.hint ? `<div class="question-hint">💡 ${question.hint}</div>` : ''}
            <div class="answer-area" id="answerArea">
                ${this.renderAnswerArea(question)}
            </div>
            <div class="feedback-area" id="feedbackArea"></div>
        `;

        this.attachAnswerListeners(question);
        this.updateProgress();
    }

    /**
     * Get question type label
     */
    getQuestionTypeLabel(type) {
        const labels = {
            'multiple_choice': 'Multiple Choice',
            'text_input': 'Type Your Answer'
        };
        return labels[type] || 'Question';
    }

    /**
     * Get formatted level name
     * @param {number} level - Difficulty level (1-4)
     * @returns {string} Formatted level display (e.g., "Level 1 (Beginning)")
     */
    getLevelName(level) {
        const levelNames = {
            1: 'Beginning',
            2: 'Developing',
            3: 'Meeting',
            4: 'Exceeding'
        };
        const name = levelNames[level] || 'Unknown';
        return `Level ${level} (${name})`;
    }

    /**
     * Render answer area based on question type
     */
    renderAnswerArea(question) {
        if (question.type === 'multiple_choice') {
            return `
                <div class="answer-options">
                    ${question.options.map(option => `
                        <button class="answer-btn" data-answer="${option}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
        } else if (question.type === 'text_input') {
            const isTouchDevice = OnScreenKeyboard.isTouchDevice();

            if (isTouchDevice) {
                // Use custom display div for touch devices (avoids readonly conflicts)
                return `
                    <div class="keyboard-display"
                         id="textAnswer"
                         role="textbox"
                         aria-label="Answer input"
                         tabindex="0"
                         data-placeholder="Tap keyboard to enter answer">
                    </div>
                    <button class="submit-btn" id="submitBtn">Submit Answer</button>
                    <div id="keyboardContainer"></div>
                `;
            } else {
                // Use native input for desktop
                return `
                    <input type="text"
                           class="text-input"
                           id="textAnswer"
                           placeholder="Type your answer here"
                           autocomplete="off">
                    <button class="submit-btn" id="submitBtn">Submit Answer</button>
                `;
            }
        }
        return '';
    }

    /**
     * Attach event listeners for answer interaction
     */
    attachAnswerListeners(question) {
        if (question.type === 'multiple_choice') {
            const answerBtns = this.container.querySelectorAll('.answer-btn');
            answerBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const answer = btn.dataset.answer;
                    this.submitAnswer(answer);
                });
            });
        } else if (question.type === 'text_input') {
            const textAnswer = this.container.querySelector('#textAnswer');
            const submitBtn = this.container.querySelector('#submitBtn');
            const isTouchDevice = OnScreenKeyboard.isTouchDevice();

            // Submit handler - gets value from keyboard or input depending on device
            const handleSubmit = () => {
                const answer = isTouchDevice
                    ? this.keyboard.getValue()  // Get from keyboard internal value
                    : textAnswer.value;         // Get from native input
                this.submitAnswer(answer);
            };

            submitBtn.addEventListener('click', handleSubmit);

            if (isTouchDevice) {
                // Initialize on-screen keyboard for touch devices
                const keyboardContainer = this.container.querySelector('#keyboardContainer');
                this.keyboard = new OnScreenKeyboard();
                const keyboardElement = this.keyboard.create(textAnswer, handleSubmit);
                keyboardContainer.appendChild(keyboardElement);
                this.keyboard.show();

                // Listen for keyboard submit event
                textAnswer.addEventListener('keyboardSubmit', handleSubmit);

                // Allow clicking on display to focus
                textAnswer.addEventListener('click', () => {
                    textAnswer.focus();
                });
            } else {
                // Desktop: use native input with Enter key support
                textAnswer.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                });

                // Focus input for desktop
                textAnswer.focus();
            }
        }
    }

    /**
     * Submit answer for validation
     */
    submitAnswer(answer) {
        if (!answer || answer.trim() === '') {
            alert('Please provide an answer!');
            return;
        }

        this.currentAnswer = answer;
        const question = this.questions[this.currentIndex];
        const result = validator.validate(question, answer);

        // Phase 4: Calculate response time
        const responseTimeMs = this.questionStartTime
            ? Date.now() - this.questionStartTime
            : null;

        // Update score
        if (result.isCorrect) {
            this.score.correct++;
        } else {
            this.score.incorrect++;
        }

        // Track streak (Phase 3)
        const streakStatus = streakTracker.recordAnswer(result.isCorrect);

        // Phase 4: Record question result in session
        if (this.sessionId) {
            storageManager.recordQuestionResult(this.sessionId, {
                correct: result.isCorrect,
                timeMs: responseTimeMs,
                question: question.text,
                answer: answer,
                type: question.type
            });

            // Update best streak
            storageManager.updateBestStreak(this.sessionId, streakStatus.currentStreak);
        }

        // Phase 5: Record result in performance analyzer (only if adaptive enabled)
        const currentStudent = storageManager.getCurrentStudent();
        if (currentStudent) {
            const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);
            if (adaptiveProfile && adaptiveProfile.enabled && performanceAnalyzer.sessionId) {
                // Record question result
                performanceAnalyzer.recordResult({
                    correct: result.isCorrect,
                    timeMs: responseTimeMs,
                    questionText: question.text,
                    answer: answer
                });

                // Update confidence meter
                const confidenceData = adaptiveDifficultyEngine.calculateConfidenceScore();
                confidenceMeter.update(confidenceData);

                // Check for intervention (after showing feedback)
                // Only runs when adaptive is ENABLED
                const questionsAnswered = this.score.correct + this.score.incorrect;
                setTimeout(() => {
                    this.checkForAdaptiveIntervention(questionsAnswered);
                }, 1500); // After feedback is shown
            }
        }

        this.showFeedback(result, streakStatus);
        this.disableAnswerInputs();
        this.updateProgress();
        this.updateStreakDisplay();

        // At Level 4 with 3-streak: offer to complete module and end session
        if (streakStatus.justUnlocked && this.currentLevel === 4) {
            // Check if module would be complete (student-specific)
            // Reuse currentStudent from above
            if (currentStudent) {
                const isComplete = this.isModuleCompleteForStudent(currentStudent.id, this.currentModule);
                if (isComplete) {
                    setTimeout(() => {
                        this.showLevel4CompletionOffer();
                    }, 800);
                }
            }
        }
    }

    /**
     * Check if module is complete for a specific student
     * @param {string} studentId - Student ID
     * @param {string} moduleId - Module ID
     * @returns {boolean} True if all 4 levels have 3+ correct answers
     */
    isModuleCompleteForStudent(studentId, moduleId) {
        const student = storageManager.getStudent(studentId);
        if (!student || !student.moduleProgress[moduleId]) {
            return false;
        }

        const moduleProgress = student.moduleProgress[moduleId];
        return moduleProgress.levels[1] >= 3 &&
               moduleProgress.levels[2] >= 3 &&
               moduleProgress.levels[3] >= 3 &&
               moduleProgress.levels[4] >= 3;
    }

    /**
     * Show feedback after answer submission
     */
    showFeedback(result, streakStatus) {
        const feedbackArea = this.container.querySelector('#feedbackArea');

        // Check if adaptive is enabled (to make systems mutually exclusive)
        const currentStudent = storageManager.getCurrentStudent();
        const adaptiveProfile = currentStudent ? storageManager.getAdaptiveProfile(currentStudent.id) : null;
        const adaptiveEnabled = adaptiveProfile && adaptiveProfile.enabled;

        // Check if power-up is available (3-streak at non-max level)
        // Only show power-up if adaptive is DISABLED
        const powerUpAvailable = !adaptiveEnabled && streakStatus && streakStatus.justUnlocked && this.currentLevel < 4;

        if (result.isCorrect) {
            if (powerUpAvailable) {
                // Show inline power-up choice
                const newLevel = this.currentLevel + 1;
                feedbackArea.innerHTML = `
                    <div class="feedback feedback-correct feedback-powerup">
                        <span class="feedback-icon">🎉</span>
                        <span class="feedback-text">3 in a row! You can level up!</span>
                    </div>
                    <div class="feedback-powerup-choice">
                        <button class="powerup-primary-btn" id="powerUpBtn">
                            ⚡ Power Up to ${this.getLevelName(newLevel)}!
                        </button>
                        <button class="powerup-secondary-btn" id="stayBtn">
                            Stay at ${this.getLevelName(this.currentLevel)}
                        </button>
                    </div>
                `;
            } else {
                // Regular correct feedback
                feedbackArea.innerHTML = `
                    <div class="feedback feedback-correct">
                        <span class="feedback-icon">✓</span>
                        <span class="feedback-text">Correct! Well done!</span>
                    </div>
                    <button class="next-btn" id="nextBtn">Next Question →</button>
                `;
            }
        } else {
            feedbackArea.innerHTML = `
                <div class="feedback feedback-incorrect">
                    <span class="feedback-icon">✗</span>
                    <span class="feedback-text">Not quite. The correct answer is: <strong>${result.correctAnswer}</strong></span>
                </div>
                <button class="next-btn" id="nextBtn">Next Question →</button>
            `;
        }

        // Highlight correct answer in multiple choice
        if (this.questions[this.currentIndex].type === 'multiple_choice') {
            const answerBtns = this.container.querySelectorAll('.answer-btn');
            answerBtns.forEach(btn => {
                const btnAnswer = btn.dataset.answer;
                if (btnAnswer === this.questions[this.currentIndex].answer) {
                    btn.classList.add('correct');
                } else if (btnAnswer === this.currentAnswer) {
                    btn.classList.add('incorrect');
                }
            });
        }

        // Attach button listeners
        if (powerUpAvailable) {
            // Power-up choice buttons
            const powerUpBtn = feedbackArea.querySelector('#powerUpBtn');
            const stayBtn = feedbackArea.querySelector('#stayBtn');

            powerUpBtn.addEventListener('click', () => {
                this.handlePowerUp();
            });

            stayBtn.addEventListener('click', () => {
                // Consume power-up but don't level up
                streakTracker.consumePowerUp();
                this.nextQuestion();
            });
        } else {
            // Regular next button
            const nextBtn = feedbackArea.querySelector('#nextBtn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.nextQuestion();
                });
            }
        }
    }

    /**
     * Disable answer inputs after submission
     */
    disableAnswerInputs() {
        const answerBtns = this.container.querySelectorAll('.answer-btn');
        answerBtns.forEach(btn => btn.disabled = true);

        const textInput = this.container.querySelector('#textAnswer');
        if (textInput) textInput.disabled = true;

        const submitBtn = this.container.querySelector('#submitBtn');
        if (submitBtn) submitBtn.disabled = true;

        // Disable on-screen keyboard if active
        if (this.keyboard) {
            this.keyboard.disable();
        }
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            this.finish();
        } else {
            this.showQuestion();
        }
    }

    /**
     * Update progress display
     */
    updateProgress() {
        const currentQ = this.currentIndex + 1;
        const totalQ = this.questions.length;

        // Update question counters
        this.container.querySelector('#currentQ').textContent = currentQ;
        this.container.querySelector('#totalQ').textContent = totalQ;

        // Update score
        this.container.querySelector('#correctCount').textContent = this.score.correct;
        this.container.querySelector('#incorrectCount').textContent = this.score.incorrect;

        // Calculate and update progress bar
        const progress = Math.min(100, Math.max(0, (currentQ / totalQ) * 100));
        const progressFill = this.container.querySelector('#progressFill');
        if (progressFill) {
            progressFill.style.width = `${progress.toFixed(1)}%`;
        }

        // Update level display badge
        const levelDisplay = this.container.querySelector('#levelDisplay');
        if (levelDisplay) {
            levelDisplay.textContent = this.getLevelName(this.currentLevel);
        }

        console.log(`Progress: Q${currentQ}/${totalQ} (${progress.toFixed(1)}%) - L${this.currentLevel} - Score: ${this.score.correct}/${this.score.correct + this.score.incorrect}`);
    }

    /**
     * Update streak display in header
     */
    updateStreakDisplay() {
        const container = this.container.querySelector('#streakDisplayContainer');
        if (!container) return;

        const status = streakTracker.getStatus();
        const streak = status.currentStreak;

        // Only show streak when 2+ correct (a real streak!)
        if (streak < 2) {
            container.innerHTML = '';
            return;
        }

        const isHot = streakTracker.isHotStreak();
        const hotClass = isHot ? 'hot' : '';

        container.innerHTML = `
            <div class="streak-display ${hotClass}">
                <span class="streak-icon">🔥</span>
                <span class="streak-count">${streak} in a row!</span>
            </div>
        `;
    }

    /**
     * Handle power-up when power-up button is activated
     */
    handlePowerUp() {
        // Consume the power-up
        streakTracker.consumePowerUp();

        // Mark that we powered up
        this.leveledUp = true;
        const newLevel = Math.min(this.currentLevel + 1, 4);

        // Phase 4: Record power-up in session
        if (this.sessionId) {
            storageManager.recordPowerUp(this.sessionId);
        }

        // Show celebration overlay
        this.showPowerUpOverlay(this.currentLevel, newLevel);

        // After celebration, transition to new level and advance to next question
        setTimeout(() => {
            this.transitionToNewLevel(newLevel);
            this.nextQuestion(); // Student is still on current question, so advance now
        }, 1500);
    }

    /**
     * Show power-up celebration overlay
     */
    showPowerUpOverlay(oldLevel, newLevel) {
        const overlay = document.createElement('div');
        overlay.className = 'power-up-overlay';
        overlay.innerHTML = `
            <div class="power-up-card">
                <div class="power-up-icon">🎉</div>
                <h2>Power Up!</h2>
                <p>Level ${oldLevel} → Level ${newLevel}</p>
                <p class="power-up-subtitle">Get ready for harder questions!</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Remove overlay after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 1500);
    }

    /**
     * Transition to new difficulty level
     * NOTE: Does NOT advance to next question - caller should do that if needed
     */
    transitionToNewLevel(newLevel) {
        const oldLevel = this.currentLevel;

        // Update current level
        this.currentLevel = newLevel;

        // Update performance analyzer level (for adaptive system)
        const currentStudent = storageManager.getCurrentStudent();
        if (currentStudent) {
            const adaptiveProfile = storageManager.getAdaptiveProfile(currentStudent.id);
            if (adaptiveProfile && adaptiveProfile.enabled && performanceAnalyzer.sessionId) {
                performanceAnalyzer.updateLevel(newLevel);
            }
        }

        // Calculate how many questions remain
        const questionsRemaining = this.questions.length - (this.currentIndex + 1);

        // Generate new questions at higher level
        const questionEngine = window.questionEngine; // Access global instance
        if (!questionEngine) {
            console.error('Question engine not available');
            return;
        }

        const newQuestions = questionEngine.generate(
            this.currentModule,
            newLevel,
            questionsRemaining
        );

        // Replace remaining questions with new level questions
        this.questions = [
            ...this.questions.slice(0, this.currentIndex + 1),
            ...newQuestions
        ];

        // Update UI to reflect new level
        this.updateProgress(); // Updates level badge and progress bar

        console.log(`✓ Level transition complete: L${oldLevel} → L${newLevel}`);

        // NOTE: Caller is responsible for calling nextQuestion() if appropriate
        // - Power-up: student is still on current question, so nextQuestion() should be called
        // - Adaptive: student has already moved to next question, so nextQuestion() should NOT be called
    }

    /**
     * Show Level 4 completion offer (3-streak at max level)
     */
    showLevel4CompletionOffer() {
        // Get module info
        import('../curriculum/modules.js').then(({ MODULES }) => {
            const module = MODULES[this.currentModule];
            if (!module) return;

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'level4-completion-overlay';
            overlay.innerHTML = `
                <div class="level4-completion-card">
                    <div class="level4-completion-icon">🏆</div>
                    <h2>Outstanding!</h2>
                    <p class="level4-completion-message">
                        You've got 3 in a row at the highest level!
                    </p>
                    <p class="level4-completion-module">
                        ${module.icon} ${module.name}
                    </p>
                    <p class="level4-completion-note">
                        You've mastered this module. Would you like to complete it now?
                    </p>
                    <div class="level4-completion-actions">
                        <button class="level4-completion-btn primary" id="level4CompleteBtn">
                            🏆 Complete Module
                        </button>
                        <button class="level4-completion-btn secondary" id="level4ContinueBtn">
                            Keep Practicing
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            // Animate in
            setTimeout(() => overlay.classList.add('visible'), 10);

            // Handle Complete button
            const completeBtn = overlay.querySelector('#level4CompleteBtn');
            completeBtn.addEventListener('click', () => {
                this.confirmLevel4Completion(overlay);
            });

            // Handle Continue button
            const continueBtn = overlay.querySelector('#level4ContinueBtn');
            continueBtn.addEventListener('click', () => {
                this.cancelLevel4Completion(overlay);
            });
        });
    }

    /**
     * Confirm Level 4 completion and end session
     */
    confirmLevel4Completion(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);

        // Mark module as complete (student-specific)
        const currentStudent = storageManager.getCurrentStudent();
        if (currentStudent) {
            this.markModuleCompleteForStudent(currentStudent.id, this.currentModule);
        }

        // End the session
        this.finish();
    }

    /**
     * Mark a module as complete for a specific student
     * @param {string} studentId - Student ID
     * @param {string} moduleId - Module ID
     */
    markModuleCompleteForStudent(studentId, moduleId) {
        const student = storageManager.getStudent(studentId);
        if (!student || !student.moduleProgress[moduleId]) {
            return;
        }

        student.moduleProgress[moduleId].completed = true;
        storageManager.save();
    }

    /**
     * Cancel Level 4 completion and continue
     */
    cancelLevel4Completion(overlay) {
        // Remove overlay
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }

    /**
     * Check for adaptive intervention (Phase 5)
     * Only called when adaptive system is ENABLED
     * @param {number} questionsAnswered - Total questions answered so far
     */
    checkForAdaptiveIntervention(questionsAnswered) {
        // Don't check if modal is already showing
        if (adaptiveSuggestionModal.isShowing()) {
            return;
        }

        // Check for intervention
        const intervention = adaptiveDifficultyEngine.checkForIntervention(questionsAnswered);

        if (intervention) {
            const currentStudent = storageManager.getCurrentStudent();

            // Show suggestion modal
            adaptiveSuggestionModal.show(
                intervention,
                this.sessionId,
                currentStudent.id,
                (suggestedLevel) => this.handleAdaptiveAccept(intervention, suggestedLevel),
                () => this.handleAdaptiveDecline(intervention)
            );
        }
    }

    /**
     * Handle student accepting adaptive suggestion
     * @param {Object} intervention - Intervention data
     * @param {number} suggestedLevel - Suggested difficulty level
     */
    handleAdaptiveAccept(intervention, suggestedLevel) {
        if (intervention.type === 'switch_module') {
            // For module switch, end current session and return to setup
            console.log('🎯 Student accepted module switch suggestion');
            this.finish();
            return;
        }

        // For level change (increase or decrease)
        console.log(`🎯 Student accepted level change: L${this.currentLevel} → L${suggestedLevel}`);

        // Show transition overlay
        this.showAdaptiveLevelChangeOverlay(this.currentLevel, suggestedLevel, intervention.type);

        // After animation, transition to new level
        setTimeout(() => {
            this.transitionToNewLevel(suggestedLevel);
        }, 2500);
    }

    /**
     * Handle student declining adaptive suggestion
     * @param {Object} intervention - Intervention data
     */
    handleAdaptiveDecline(intervention) {
        console.log('🎯 Student declined adaptive suggestion');
        // Just continue with current level - no action needed
    }

    /**
     * Show adaptive level change overlay
     * @param {number} oldLevel - Current level
     * @param {number} newLevel - New level
     * @param {string} type - Intervention type ('increase' or 'decrease')
     */
    showAdaptiveLevelChangeOverlay(oldLevel, newLevel, type) {
        const overlay = document.createElement('div');
        overlay.className = 'power-up-overlay'; // Reuse power-up overlay styles

        const icon = type === 'increase' ? '🌟' : '🤝';
        const title = type === 'increase' ? 'Challenge Accepted!' : 'Good Choice!';
        const message = type === 'increase'
            ? 'Get ready for harder questions!'
            : 'Let\'s build your confidence!';

        overlay.innerHTML = `
            <div class="power-up-card">
                <div class="power-up-icon">${icon}</div>
                <h2>${title}</h2>
                <p>Level ${oldLevel} → Level ${newLevel}</p>
                <p class="power-up-subtitle">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Remove overlay after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 2500);
    }

    /**
     * Finish practice session
     */
    finish() {
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.startTime) / 1000); // seconds

        // Check if module just became complete (student-specific)
        const currentStudent = storageManager.getCurrentStudent();
        let moduleComplete = false;
        let alreadyMarkedComplete = false;

        if (currentStudent) {
            moduleComplete = this.isModuleCompleteForStudent(currentStudent.id, this.currentModule);
            const moduleProgress = currentStudent.moduleProgress[this.currentModule];
            alreadyMarkedComplete = moduleProgress ? moduleProgress.completed : false;
        }

        // Calculate final score
        const totalQuestions = this.score.correct + this.score.incorrect;
        const percentage = totalQuestions > 0
            ? Math.round((this.score.correct / totalQuestions) * 100)
            : 0;

        const finalScore = {
            correct: this.score.correct,
            total: totalQuestions,
            percentage: percentage
        };

        // Phase 4: Complete session in storage
        if (this.sessionId) {
            const completedEarly = (this.currentIndex + 1 < this.questions.length); // Level 4 early completion
            storageManager.completeSession(this.sessionId, finalScore, completedEarly);
            console.log(`✓ Session completed: ${finalScore.correct}/${finalScore.total} (${finalScore.percentage}%)`);
        }

        // Phase 5: Clean up adaptive system
        if (performanceAnalyzer.sessionId) {
            performanceAnalyzer.endSession();
        }
        confidenceMeter.hide();

        const sessionData = {
            questions: this.questions,
            score: this.score,
            timeSpent: timeSpent,
            totalQuestions: totalQuestions, // Use actual attempted count, not generated count
            leveledUp: this.leveledUp,
            finalLevel: this.currentLevel,
            moduleComplete: moduleComplete
        };

        // Show module completion prompt if just completed
        if (moduleComplete && !alreadyMarkedComplete) {
            // Mark module as complete for this student
            if (currentStudent) {
                this.markModuleCompleteForStudent(currentStudent.id, this.currentModule);
                console.log(`🏆 Module ${this.currentModule} marked as complete for student ${currentStudent.id}`);
            }

            // Import module info and show completion prompt
            import('../curriculum/modules.js').then(({ MODULES }) => {
                const module = MODULES[this.currentModule];
                if (module) {
                    setTimeout(() => {
                        moduleCompletionPrompt.show(
                            this.currentModule,
                            module.name,
                            module.icon
                        );
                    }, 500); // Brief delay after results screen
                }
            });
        }

        // Dispatch custom event
        const event = new CustomEvent('practiceComplete', {
            detail: sessionData
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
}

export default PracticeScreen;
