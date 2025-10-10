/**
 * Practice Screen Component
 *
 * Handles question display, answer collection, and progress tracking.
 * Includes streak tracking and auto power-up system (Phase 3).
 * Tracks module completion progress (Phase 3.5).
 * Integrates with StorageManager for detailed session tracking (Phase 4).
 */

import validator from '../core/validator.js';
import OnScreenKeyboard from './onScreenKeyboard.js';
import streakTracker from '../core/streakTracker.js';
import powerUpButton from './powerUpButton.js';
import moduleProgress from '../core/moduleProgress.js';
import moduleCompletionPrompt from './moduleCompletionPrompt.js';
import storageManager from '../core/storageManager.js';

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

        this.render();
        this.showQuestion();
    }

    /**
     * Render the practice screen structure
     */
    render() {
        this.container.innerHTML = `
            <div class="practice-header">
                <div class="progress-info">
                    <span class="question-counter">
                        Question <span id="currentQ">1</span> of <span id="totalQ">${this.questions.length}</span>
                    </span>
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
            // Track correct answer for module progress (Phase 3.5)
            moduleProgress.recordCorrectAnswer(this.currentModule, this.currentLevel);
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

        this.showFeedback(result, streakStatus);
        this.disableAnswerInputs();
        this.updateProgress();
        this.updateStreakDisplay();

        // Show power-up button if available (not at max level)
        if (streakStatus.justUnlocked && this.currentLevel < 4) {
            setTimeout(() => {
                powerUpButton.show(() => this.handlePowerUp());
            }, 800); // Brief delay for better UX
        }

        // At Level 4 with 3-streak: offer to complete module and end session
        if (streakStatus.justUnlocked && this.currentLevel === 4) {
            // Check if module would be complete
            if (moduleProgress.isModuleComplete(this.currentModule)) {
                setTimeout(() => {
                    this.showLevel4CompletionOffer();
                }, 800);
            }
        }

        // Hide power-up button if streak was lost
        if (streakStatus.lostPowerUp) {
            powerUpButton.hide();
        }
    }

    /**
     * Show feedback after answer submission
     */
    showFeedback(result) {
        const feedbackArea = this.container.querySelector('#feedbackArea');

        if (result.isCorrect) {
            feedbackArea.innerHTML = `
                <div class="feedback feedback-correct">
                    <span class="feedback-icon">✓</span>
                    <span class="feedback-text">Correct! Well done!</span>
                </div>
                <button class="next-btn" id="nextBtn">Next Question →</button>
            `;
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

        // Attach next button listener
        const nextBtn = this.container.querySelector('#nextBtn');
        nextBtn.addEventListener('click', () => {
            this.nextQuestion();
        });
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
        this.container.querySelector('#currentQ').textContent = this.currentIndex + 1;
        this.container.querySelector('#totalQ').textContent = this.questions.length;
        this.container.querySelector('#correctCount').textContent = this.score.correct;
        this.container.querySelector('#incorrectCount').textContent = this.score.incorrect;

        const progress = ((this.currentIndex + 1) / this.questions.length) * 100;
        this.container.querySelector('#progressFill').style.width = `${progress}%`;
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

        // After celebration, continue with new level questions
        setTimeout(() => {
            this.transitionToNewLevel(newLevel);
        }, 3000);
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
        }, 3000);
    }

    /**
     * Transition to new difficulty level
     */
    transitionToNewLevel(newLevel) {
        // Update current level
        this.currentLevel = newLevel;

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

        // Continue to next question (which will be at new level)
        this.nextQuestion();
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

        // Mark module as complete
        moduleProgress.markModuleComplete(this.currentModule);

        // End the session
        this.finish();
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
     * Finish practice session
     */
    finish() {
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.startTime) / 1000); // seconds

        // Check if module just became complete (Phase 3.5)
        const moduleComplete = moduleProgress.isModuleComplete(this.currentModule);
        const alreadyMarkedComplete = moduleProgress.getProgress(this.currentModule).completed;

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
            // Import module info
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
