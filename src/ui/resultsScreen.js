/**
 * Results Screen Component
 *
 * Displays practice session results and performance feedback
 */

class ResultsScreen {
    constructor() {
        this.container = null;
        this.sessionData = null;
    }

    /**
     * Initialize the results screen
     * @param {HTMLElement} container - Container element
     * @param {Object} sessionData - Session results data
     */
    init(container, sessionData) {
        this.container = container;
        this.sessionData = sessionData;
        this.render();
        this.attachEventListeners();
    }

    /**
     * Render the results screen
     */
    render() {
        const { score, totalQuestions, timeSpent } = this.sessionData;
        const percentage = Math.round((score.correct / totalQuestions) * 100);
        const performanceData = this.getPerformanceData(percentage);

        this.container.innerHTML = `
            <div class="results-container">
                <div class="results-icon">${performanceData.emoji}</div>

                <h1 class="results-title">Practice Complete!</h1>

                <div class="results-stats">
                    <div class="stat-card primary">
                        <div class="stat-value">${score.correct}/${totalQuestions}</div>
                        <div class="stat-label">Score</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.formatTime(timeSpent)}</div>
                        <div class="stat-label">Time Spent</div>
                    </div>
                </div>

                <div class="performance-card ${performanceData.class}">
                    <h2 class="performance-title">${performanceData.title}</h2>
                    <p class="performance-message">${performanceData.message}</p>
                </div>

                <div class="results-details">
                    <div class="detail-item">
                        <span class="detail-icon">✓</span>
                        <span class="detail-text">${score.correct} correct answers</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">✗</span>
                        <span class="detail-text">${score.incorrect} incorrect answers</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">📊</span>
                        <span class="detail-text">${totalQuestions} questions completed</span>
                    </div>
                </div>

                <div class="results-actions">
                    <button class="action-btn primary" id="practiceAgainBtn">
                        Practice Again
                    </button>
                    <button class="action-btn secondary" id="changeTopicBtn">
                        Change Topic
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Get performance feedback data based on percentage
     */
    getPerformanceData(percentage) {
        if (percentage >= 90) {
            return {
                emoji: '🌟',
                title: 'Outstanding!',
                message: "You're a maths superstar! Keep up the excellent work!",
                class: 'performance-excellent'
            };
        } else if (percentage >= 70) {
            return {
                emoji: '🎉',
                title: 'Great Job!',
                message: "You're doing really well! Keep practicing to improve even more!",
                class: 'performance-good'
            };
        } else if (percentage >= 50) {
            return {
                emoji: '👍',
                title: 'Good Effort!',
                message: "You're making progress! Try again to improve your score!",
                class: 'performance-okay'
            };
        } else {
            return {
                emoji: '💪',
                title: 'Keep Trying!',
                message: "Practice makes perfect! Have another go and you'll do better!",
                class: 'performance-needs-work'
            };
        }
    }

    /**
     * Format time in seconds to readable format
     */
    formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const practiceAgainBtn = this.container.querySelector('#practiceAgainBtn');
        const changeTopicBtn = this.container.querySelector('#changeTopicBtn');

        practiceAgainBtn.addEventListener('click', () => {
            this.practiceAgain();
        });

        changeTopicBtn.addEventListener('click', () => {
            this.changeTopic();
        });
    }

    /**
     * Handle practice again action
     */
    practiceAgain() {
        const event = new CustomEvent('practiceAgain');
        document.dispatchEvent(event);
    }

    /**
     * Handle change topic action
     */
    changeTopic() {
        const event = new CustomEvent('changeTopic');
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

export default ResultsScreen;
