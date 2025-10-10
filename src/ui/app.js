/**
 * Main Application Controller
 *
 * Coordinates screen transitions and manages application state
 */

import SetupScreen from './setupScreen.js';
import PracticeScreen from './practiceScreen.js';
import ResultsScreen from './resultsScreen.js';
import questionEngine from '../core/questionEngine.js';

class App {
    constructor() {
        this.currentScreen = null;
        this.currentSession = null;

        // Screen instances
        this.setupScreen = new SetupScreen();
        this.practiceScreen = new PracticeScreen();
        this.resultsScreen = new ResultsScreen();

        // Container references
        this.containers = {
            setup: null,
            practice: null,
            results: null
        };
    }

    /**
     * Initialize the application
     */
    init() {
        // Get container elements
        this.containers.setup = document.getElementById('setupScreen');
        this.containers.practice = document.getElementById('practiceScreen');
        this.containers.results = document.getElementById('resultsScreen');

        // Initialize setup screen
        this.setupScreen.init(this.containers.setup);

        // Setup event listeners
        this.setupEventListeners();

        // Show setup screen
        this.showScreen('setup');
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Start practice event
        document.addEventListener('startPractice', (e) => {
            this.startPractice(e.detail);
        });

        // Practice complete event
        document.addEventListener('practiceComplete', (e) => {
            this.showResults(e.detail);
        });

        // Practice again event
        document.addEventListener('practiceAgain', () => {
            this.practiceAgain();
        });

        // Change topic event
        document.addEventListener('changeTopic', () => {
            this.changeTopic();
        });
    }

    /**
     * Start a practice session
     * @param {Object} config - Practice configuration
     */
    startPractice(config) {
        const { moduleId, level, questionCount } = config;

        // Save current session config
        this.currentSession = config;

        // Generate questions
        const questions = questionEngine.generate(moduleId, level, questionCount);

        if (questions.length === 0) {
            alert('Failed to generate questions. Please try again.');
            return;
        }

        // Initialize and show practice screen
        this.practiceScreen.init(this.containers.practice, questions);
        this.showScreen('practice');
    }

    /**
     * Show results screen
     * @param {Object} sessionData - Session results data
     */
    showResults(sessionData) {
        this.resultsScreen.init(this.containers.results, sessionData);
        this.showScreen('results');
    }

    /**
     * Practice again with same settings
     */
    practiceAgain() {
        if (this.currentSession) {
            this.startPractice(this.currentSession);
        }
    }

    /**
     * Return to setup screen to change topic
     */
    changeTopic() {
        this.setupScreen.reset();
        this.showScreen('setup');
    }

    /**
     * Show a specific screen
     * @param {string} screenName - Name of screen to show (setup, practice, results)
     */
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.containers).forEach(container => {
            container.classList.add('hidden');
        });

        // Show requested screen
        switch (screenName) {
            case 'setup':
                this.setupScreen.show();
                this.currentScreen = 'setup';
                break;
            case 'practice':
                this.practiceScreen.show();
                this.currentScreen = 'practice';
                break;
            case 'results':
                this.resultsScreen.show();
                this.currentScreen = 'results';
                break;
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;
