/**
 * Practice Screen Component
 *
 * Handles question display, answer collection, and progress tracking
 */

import validator from '../core/validator.js';

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
    }

    /**
     * Initialize the practice screen
     * @param {HTMLElement} container - Container element
     * @param {Array} questions - Array of question objects
     */
    init(container, questions) {
        this.container = container;
        this.questions = questions;
        this.currentIndex = 0;
        this.score = { correct: 0, incorrect: 0 };
        this.startTime = Date.now();
        this.currentAnswer = null;

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
            return `
                <input type="text"
                       class="text-input"
                       id="textAnswer"
                       placeholder="Type your answer here"
                       autocomplete="off">
                <button class="submit-btn" id="submitBtn">Submit Answer</button>
            `;
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
            const textInput = this.container.querySelector('#textAnswer');
            const submitBtn = this.container.querySelector('#submitBtn');

            submitBtn.addEventListener('click', () => {
                this.submitAnswer(textInput.value);
            });

            textInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAnswer(textInput.value);
                }
            });

            // Focus input
            textInput.focus();
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

        if (result.isCorrect) {
            this.score.correct++;
        } else {
            this.score.incorrect++;
        }

        this.showFeedback(result);
        this.disableAnswerInputs();
        this.updateProgress();
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
     * Finish practice session
     */
    finish() {
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.startTime) / 1000); // seconds

        const sessionData = {
            questions: this.questions,
            score: this.score,
            timeSpent: timeSpent,
            totalQuestions: this.questions.length
        };

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
