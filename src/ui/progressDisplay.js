/**
 * Progress Display Component
 *
 * Dashboard showing detailed student progress, statistics, and data management.
 * Part of Phase 4: Progress Persistence
 *
 * Features:
 * - Overall statistics
 * - Recent session history
 * - Per-module progress breakdown
 * - Performance trends
 * - Export/import data
 * - Data management tools
 */

import storageManager from '../core/storageManager.js';
import { MODULES } from '../curriculum/modules.js';

class ProgressDisplay {
    constructor() {
        this.element = null;
        this.currentStudentId = null;
    }

    /**
     * Show progress dashboard for current student
     */
    show() {
        const currentStudent = storageManager.getCurrentStudent();
        if (!currentStudent) {
            alert('No student selected.\n\nPlease select a student to view progress.');
            return;
        }

        this.currentStudentId = currentStudent.id;

        // Create overlay if it doesn't exist
        if (!this.element) {
            this.createElement();
        }

        this.render();
        document.body.appendChild(this.element);

        // Animate in
        setTimeout(() => this.element.classList.add('visible'), 10);
    }

    /**
     * Hide progress dashboard
     */
    hide() {
        if (!this.element) return;

        this.element.classList.remove('visible');
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }, 300);
    }

    /**
     * Create the overlay element
     */
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'progress-dashboard-overlay';
    }

    /**
     * Render the progress dashboard
     */
    render() {
        const student = storageManager.getStudent(this.currentStudentId);
        const stats = storageManager.getStudentStats(this.currentStudentId);

        this.element.innerHTML = `
            <div class="progress-dashboard-card">
                <div class="progress-dashboard-header">
                    <div class="dashboard-title-section">
                        <h2>📊 Progress Dashboard</h2>
                        <div class="dashboard-student-name">${this.escapeHtml(student.name)}</div>
                    </div>
                    <button class="close-btn" id="closeDashboard" aria-label="Close">×</button>
                </div>

                <div class="progress-dashboard-body">
                    ${this.renderOverallStats(stats)}
                    ${this.renderModuleProgress(student)}
                    ${this.renderRecentSessions(stats)}
                    ${this.renderDataManagement()}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    /**
     * Render overall statistics section
     */
    renderOverallStats(stats) {
        const lastActiveDate = new Date(stats.lastActive);
        const avgTimeFormatted = this.formatDuration(stats.averageSessionTime);

        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Overall Statistics</h3>
                <div class="dashboard-stats-grid">
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">📚</div>
                        <div class="dashboard-stat-value">${stats.totalSessions}</div>
                        <div class="dashboard-stat-label">Total Sessions</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">✅</div>
                        <div class="dashboard-stat-value">${stats.totalQuestions}</div>
                        <div class="dashboard-stat-label">Questions Answered</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">🎯</div>
                        <div class="dashboard-stat-value">${stats.overallAccuracy}%</div>
                        <div class="dashboard-stat-label">Overall Accuracy</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">⚡</div>
                        <div class="dashboard-stat-value">${stats.totalPowerUps}</div>
                        <div class="dashboard-stat-label">Power-Ups Used</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">🔥</div>
                        <div class="dashboard-stat-value">${stats.bestStreak}</div>
                        <div class="dashboard-stat-label">Best Streak</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">🏆</div>
                        <div class="dashboard-stat-value">${stats.completedModules}/4</div>
                        <div class="dashboard-stat-label">Modules Complete</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">⏱️</div>
                        <div class="dashboard-stat-value">${avgTimeFormatted}</div>
                        <div class="dashboard-stat-label">Avg Session Time</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon">📅</div>
                        <div class="dashboard-stat-value">${lastActiveDate.toLocaleDateString()}</div>
                        <div class="dashboard-stat-label">Last Active</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render module progress breakdown
     */
    renderModuleProgress(student) {
        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Module Progress</h3>
                <div class="dashboard-modules-grid">
                    ${Object.values(MODULES).map(module => {
                        const progress = student.moduleProgress[module.id] || {
                            completed: false,
                            levels: { 1: 0, 2: 0, 3: 0, 4: 0 }
                        };

                        const performance = storageManager.getPerformanceWindow(
                            student.id,
                            module.id,
                            this.getHighestAttemptedLevel(progress.levels)
                        );

                        const recommendedLevel = storageManager.getRecommendedLevel(
                            student.id,
                            module.id
                        );

                        return `
                            <div class="dashboard-module-card ${progress.completed ? 'completed' : ''}">
                                <div class="dashboard-module-header">
                                    <div class="dashboard-module-icon">${module.icon}</div>
                                    <div class="dashboard-module-info">
                                        <div class="dashboard-module-name">${module.name}</div>
                                        ${progress.completed ? '<div class="dashboard-module-badge">🏆 Complete</div>' : ''}
                                    </div>
                                </div>

                                <div class="dashboard-module-levels">
                                    ${[1, 2, 3, 4].map(level => {
                                        const count = progress.levels[level] || 0;
                                        const isComplete = count >= 3;
                                        const isRecommended = level === recommendedLevel;

                                        return `
                                            <div class="dashboard-level-item ${isComplete ? 'complete' : ''} ${isRecommended ? 'recommended' : ''}">
                                                <span class="dashboard-level-label">L${level}</span>
                                                <span class="dashboard-level-bar">
                                                    <span class="dashboard-level-fill" style="width: ${Math.min((count / 3) * 100, 100)}%"></span>
                                                </span>
                                                <span class="dashboard-level-count">${count}/3</span>
                                                ${isRecommended ? '<span class="dashboard-level-rec">💡</span>' : ''}
                                            </div>
                                        `;
                                    }).join('')}
                                </div>

                                ${performance.sessionCount > 0 ? `
                                    <div class="dashboard-module-stats">
                                        <span class="module-stat">
                                            <span class="module-stat-label">Recent:</span>
                                            <span class="module-stat-value ${this.getTrendClass(performance.trend)}">${performance.averageAccuracy}%</span>
                                        </span>
                                        <span class="module-stat">
                                            <span class="module-stat-label">Trend:</span>
                                            <span class="module-stat-value ${this.getTrendClass(performance.trend)}">${this.getTrendIcon(performance.trend)}</span>
                                        </span>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render recent sessions section
     */
    renderRecentSessions(stats) {
        const sessions = stats.recentSessions;

        if (sessions.length === 0) {
            return `
                <div class="dashboard-section">
                    <h3 class="dashboard-section-title">Recent Sessions</h3>
                    <div class="dashboard-empty-state">
                        <p>No practice sessions yet. Start practicing to see your history!</p>
                    </div>
                </div>
            `;
        }

        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Recent Sessions</h3>
                <div class="dashboard-sessions-list">
                    ${sessions.map(session => {
                        const module = MODULES[session.moduleId];
                        const date = new Date(session.completedAt);
                        const duration = this.formatDuration(session.duration);
                        const accuracy = session.finalScore.percentage;

                        return `
                            <div class="dashboard-session-item">
                                <div class="dashboard-session-module">
                                    <span class="session-module-icon">${module ? module.icon : '📚'}</span>
                                    <div class="session-module-info">
                                        <div class="session-module-name">${module ? module.name : 'Unknown'}</div>
                                        <div class="session-module-meta">
                                            Level ${session.level} • ${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                                <div class="dashboard-session-stats">
                                    <div class="session-stat">
                                        <span class="session-stat-label">Score</span>
                                        <span class="session-stat-value">${session.finalScore.correct}/${session.finalScore.total}</span>
                                    </div>
                                    <div class="session-stat">
                                        <span class="session-stat-label">Accuracy</span>
                                        <span class="session-stat-value ${this.getAccuracyClass(accuracy)}">${accuracy}%</span>
                                    </div>
                                    <div class="session-stat">
                                        <span class="session-stat-label">Time</span>
                                        <span class="session-stat-value">${duration}</span>
                                    </div>
                                    ${session.powerUpsUsed > 0 ? `
                                        <div class="session-stat">
                                            <span class="session-stat-label">Power-Ups</span>
                                            <span class="session-stat-value">⚡ ${session.powerUpsUsed}</span>
                                        </div>
                                    ` : ''}
                                    ${session.streakBest > 0 ? `
                                        <div class="session-stat">
                                            <span class="session-stat-label">Best Streak</span>
                                            <span class="session-stat-value">🔥 ${session.streakBest}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render data management section
     */
    renderDataManagement() {
        const storageInfo = storageManager.getStorageInfo();

        return `
            <div class="dashboard-section">
                <h3 class="dashboard-section-title">Data Management</h3>

                <div class="dashboard-storage-info">
                    <div class="storage-info-item">
                        <span class="storage-info-label">Storage Used:</span>
                        <span class="storage-info-value">${storageInfo.sizeInKB} KB (${storageInfo.percentUsed}%)</span>
                    </div>
                    <div class="storage-info-item">
                        <span class="storage-info-label">Sessions Stored:</span>
                        <span class="storage-info-value">${storageInfo.sessionCount}</span>
                    </div>
                </div>

                <div class="dashboard-actions">
                    <button class="dashboard-action-btn primary" id="exportDataBtn">
                        💾 Export My Data
                    </button>
                    <button class="dashboard-action-btn secondary" id="importDataBtn">
                        📥 Import Data
                    </button>
                    <button class="dashboard-action-btn secondary" id="viewStorageBtn">
                        📊 Storage Details
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        const closeBtn = this.element.querySelector('#closeDashboard');
        closeBtn.addEventListener('click', () => this.hide());

        // Export data
        const exportBtn = this.element.querySelector('#exportDataBtn');
        exportBtn.addEventListener('click', () => this.exportData());

        // Import data
        const importBtn = this.element.querySelector('#importDataBtn');
        importBtn.addEventListener('click', () => this.importData());

        // Storage details
        const storageBtn = this.element.querySelector('#viewStorageBtn');
        storageBtn.addEventListener('click', () => this.viewStorageDetails());
    }

    /**
     * Export student data
     */
    exportData() {
        const student = storageManager.getStudent(this.currentStudentId);
        const jsonData = storageManager.exportData(this.currentStudentId);

        if (!jsonData) {
            alert('Failed to export data.');
            return;
        }

        // Create download
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `maths-practice-${student.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showFeedback('Data exported successfully! 💾');
    }

    /**
     * Import student data
     */
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json,.json';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const result = storageManager.importData(event.target.result, { merge: true });

                    if (result.success) {
                        this.showFeedback(`✓ Imported: ${result.stats.students} student(s), ${result.stats.sessions} session(s)`);

                        // Refresh dashboard
                        setTimeout(() => {
                            this.render();
                        }, 2000);
                    } else {
                        alert(`Import failed: ${result.message}`);
                    }
                } catch (error) {
                    alert(`Import failed: ${error.message}`);
                }
            };

            reader.readAsText(file);
        });

        input.click();
    }

    /**
     * View storage details
     */
    viewStorageDetails() {
        const info = storageManager.getStorageInfo();

        let message = `📊 Storage Details\n\n`;
        message += `Size: ${info.sizeInKB} KB (${info.sizeInMB} MB)\n`;
        message += `Usage: ${info.percentUsed}% of ~5MB limit\n\n`;
        message += `Students: ${info.studentCount}\n`;
        message += `Sessions: ${info.sessionCount}\n\n`;

        if (info.oldestSession) {
            const oldest = new Date(info.oldestSession);
            message += `Oldest session: ${oldest.toLocaleDateString()}\n`;
        }
        if (info.newestSession) {
            const newest = new Date(info.newestSession);
            message += `Newest session: ${newest.toLocaleDateString()}\n`;
        }

        message += `\nSessions older than 30 days are automatically cleaned up.`;

        alert(message);
    }

    /**
     * Show feedback message
     */
    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'dashboard-feedback';
        feedback.textContent = message;

        this.element.appendChild(feedback);

        setTimeout(() => feedback.classList.add('visible'), 10);
        setTimeout(() => {
            feedback.classList.remove('visible');
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    /**
     * Helper: Get highest attempted level
     */
    getHighestAttemptedLevel(levels) {
        for (let i = 4; i >= 1; i--) {
            if (levels[i] > 0) return i;
        }
        return 1;
    }

    /**
     * Helper: Get trend class for styling
     */
    getTrendClass(trend) {
        const classes = {
            'improving': 'trend-improving',
            'stable': 'trend-stable',
            'declining': 'trend-declining',
            'insufficient_data': 'trend-neutral'
        };
        return classes[trend] || 'trend-neutral';
    }

    /**
     * Helper: Get trend icon
     */
    getTrendIcon(trend) {
        const icons = {
            'improving': '📈',
            'stable': '➡️',
            'declining': '📉',
            'insufficient_data': '—'
        };
        return icons[trend] || '—';
    }

    /**
     * Helper: Get accuracy class for styling
     */
    getAccuracyClass(accuracy) {
        if (accuracy >= 80) return 'accuracy-high';
        if (accuracy >= 60) return 'accuracy-medium';
        return 'accuracy-low';
    }

    /**
     * Helper: Format duration
     */
    formatDuration(ms) {
        if (!ms || ms === 0) return '—';

        const seconds = Math.floor(ms / 1000);
        if (seconds < 60) return `${seconds}s`;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    /**
     * Helper: Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export singleton instance
const progressDisplay = new ProgressDisplay();
export default progressDisplay;
