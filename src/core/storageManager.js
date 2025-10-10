/**
 * Storage Manager
 *
 * Centralized storage system for student profiles, practice sessions, and progress tracking.
 * Part of Phase 4: Progress Persistence
 *
 * Features:
 * - Student profile management (CRUD operations)
 * - Session storage and retrieval
 * - Statistical calculations (accuracy, trends, performance windows)
 * - Automatic cleanup (sessions older than 30 days)
 * - Export/import functionality
 * - Data migration from existing systems
 * - localStorage wrapper with error handling
 */

const STORAGE_KEY = 'mathsPractice_storage';
const MIGRATION_FLAG = 'mathsPractice_migrated_v2';
const DATA_VERSION = '2.0';
const SESSION_RETENTION_DAYS = 30;

class StorageManager {
    constructor() {
        this.data = {
            version: DATA_VERSION,
            students: {},           // studentId -> Student object
            currentStudentId: null, // Currently selected student
            sessions: {},           // sessionId -> Session object
            createdAt: Date.now(),
            lastModified: Date.now()
        };

        this.load();
        this.migrateFromLegacySystems();
        this.cleanup();
    }

    /**
     * ===== STUDENT PROFILE MANAGEMENT =====
     */

    /**
     * Create a new student profile
     * @param {string} name - Student name
     * @param {string} [yearGroup] - Optional year group (e.g., "Year 3")
     * @returns {string} studentId
     */
    createStudent(name, yearGroup = '') {
        const studentId = this.generateId('student');

        this.data.students[studentId] = {
            id: studentId,
            name: name.trim(),
            yearGroup: yearGroup.trim(),
            createdAt: Date.now(),
            lastActive: Date.now(),
            totalSessions: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            moduleProgress: {}, // moduleId -> { completed, levels: { 1-4: correctCount } }
            preferences: {
                defaultLevel: 3,
                defaultQuestionCount: 5
            }
        };

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Created student profile: ${name} (${studentId})`);
        return studentId;
    }

    /**
     * Get student profile by ID
     * @param {string} studentId
     * @returns {Object|null} Student object or null
     */
    getStudent(studentId) {
        return this.data.students[studentId] || null;
    }

    /**
     * Get all student profiles
     * @returns {Array} Array of student objects, sorted by last active
     */
    getAllStudents() {
        return Object.values(this.data.students)
            .sort((a, b) => b.lastActive - a.lastActive);
    }

    /**
     * Update student profile
     * @param {string} studentId
     * @param {Object} updates - Fields to update
     * @returns {boolean} Success status
     */
    updateStudent(studentId, updates) {
        const student = this.data.students[studentId];
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        // Allowed fields to update
        const allowedFields = ['name', 'yearGroup', 'preferences'];
        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                if (field === 'preferences') {
                    student.preferences = { ...student.preferences, ...updates.preferences };
                } else {
                    student[field] = updates[field];
                }
            }
        });

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Updated student: ${student.name}`);
        return true;
    }

    /**
     * Delete student profile and all associated sessions
     * @param {string} studentId
     * @returns {boolean} Success status
     */
    deleteStudent(studentId) {
        const student = this.data.students[studentId];
        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        // Delete all sessions for this student
        Object.keys(this.data.sessions).forEach(sessionId => {
            if (this.data.sessions[sessionId].studentId === studentId) {
                delete this.data.sessions[sessionId];
            }
        });

        // Delete student profile
        delete this.data.students[studentId];

        // Clear current student if it was this one
        if (this.data.currentStudentId === studentId) {
            this.data.currentStudentId = null;
        }

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Deleted student and associated sessions: ${student.name}`);
        return true;
    }

    /**
     * Set currently active student
     * @param {string} studentId
     * @returns {boolean} Success status
     */
    setCurrentStudent(studentId) {
        if (!this.data.students[studentId]) {
            console.warn(`Student ${studentId} not found`);
            return false;
        }

        this.data.currentStudentId = studentId;
        this.data.students[studentId].lastActive = Date.now();
        this.save();

        console.log(`✓ Set current student: ${this.data.students[studentId].name}`);
        return true;
    }

    /**
     * Get currently active student
     * @returns {Object|null} Current student or null
     */
    getCurrentStudent() {
        return this.data.currentStudentId
            ? this.data.students[this.data.currentStudentId]
            : null;
    }

    /**
     * ===== SESSION MANAGEMENT =====
     */

    /**
     * Create a new practice session
     * @param {string} studentId
     * @param {string} moduleId
     * @param {number} level - Difficulty level (1-4)
     * @param {number} targetCount - Number of questions planned
     * @returns {string} sessionId
     */
    createSession(studentId, moduleId, level, targetCount) {
        const sessionId = this.generateId('session');
        const student = this.data.students[studentId];

        if (!student) {
            console.warn(`Student ${studentId} not found`);
            return null;
        }

        this.data.sessions[sessionId] = {
            id: sessionId,
            studentId,
            moduleId,
            level,
            targetCount,
            startedAt: Date.now(),
            completedAt: null,
            questions: [],          // Array of question results
            finalScore: null,       // { correct, total, percentage }
            powerUpsUsed: 0,
            streakBest: 0,
            completedEarly: false,  // Level 4 early completion flag
            duration: null          // Milliseconds
        };

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Created session: ${moduleId} L${level} for ${student.name}`);
        return sessionId;
    }

    /**
     * Record a question result in current session
     * @param {string} sessionId
     * @param {Object} questionResult - { correct, timeMs, question, answer }
     */
    recordQuestionResult(sessionId, questionResult) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        session.questions.push({
            timestamp: Date.now(),
            correct: questionResult.correct,
            timeMs: questionResult.timeMs || null,
            questionText: questionResult.question || '',
            studentAnswer: questionResult.answer || '',
            questionType: questionResult.type || 'unknown'
        });

        this.data.lastModified = Date.now();
        this.save();
    }

    /**
     * Record a power-up used in session
     * @param {string} sessionId
     */
    recordPowerUp(sessionId) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        session.powerUpsUsed++;
        this.save();
    }

    /**
     * Update best streak for session
     * @param {string} sessionId
     * @param {number} streak
     */
    updateBestStreak(sessionId, streak) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        if (streak > session.streakBest) {
            session.streakBest = streak;
            this.save();
        }
    }

    /**
     * Complete a practice session
     * @param {string} sessionId
     * @param {Object} finalScore - { correct, total, percentage }
     * @param {boolean} [completedEarly] - Level 4 early completion flag
     */
    completeSession(sessionId, finalScore, completedEarly = false) {
        const session = this.data.sessions[sessionId];
        if (!session) {
            console.warn(`Session ${sessionId} not found`);
            return;
        }

        const student = this.data.students[session.studentId];
        if (!student) {
            console.warn(`Student ${session.studentId} not found`);
            return;
        }

        // Finalize session
        session.completedAt = Date.now();
        session.duration = session.completedAt - session.startedAt;
        session.finalScore = finalScore;
        session.completedEarly = completedEarly;

        // Update student aggregates
        student.totalSessions++;
        student.totalQuestions += finalScore.total;
        student.totalCorrect += finalScore.correct;
        student.lastActive = Date.now();

        // Update student module progress
        if (!student.moduleProgress[session.moduleId]) {
            student.moduleProgress[session.moduleId] = {
                completed: false,
                levels: { 1: 0, 2: 0, 3: 0, 4: 0 }
            };
        }

        const moduleProgress = student.moduleProgress[session.moduleId];
        moduleProgress.levels[session.level] += finalScore.correct;

        // Check if module is now complete (3+ correct at all 4 levels)
        const isComplete =
            moduleProgress.levels[1] >= 3 &&
            moduleProgress.levels[2] >= 3 &&
            moduleProgress.levels[3] >= 3 &&
            moduleProgress.levels[4] >= 3;

        if (isComplete && !moduleProgress.completed) {
            moduleProgress.completed = true;
            console.log(`🏆 Module completed: ${session.moduleId} by ${student.name}`);
        }

        this.data.lastModified = Date.now();
        this.save();

        console.log(`✓ Completed session: ${finalScore.correct}/${finalScore.total} (${finalScore.percentage}%)`);
    }

    /**
     * Get session by ID
     * @param {string} sessionId
     * @returns {Object|null} Session object or null
     */
    getSession(sessionId) {
        return this.data.sessions[sessionId] || null;
    }

    /**
     * Get all sessions for a student
     * @param {string} studentId
     * @param {Object} [filters] - Optional filters { moduleId, level, limit }
     * @returns {Array} Array of sessions, newest first
     */
    getStudentSessions(studentId, filters = {}) {
        let sessions = Object.values(this.data.sessions)
            .filter(s => s.studentId === studentId && s.completedAt !== null);

        // Apply filters
        if (filters.moduleId) {
            sessions = sessions.filter(s => s.moduleId === filters.moduleId);
        }
        if (filters.level) {
            sessions = sessions.filter(s => s.level === filters.level);
        }

        // Sort by completion date (newest first)
        sessions.sort((a, b) => b.completedAt - a.completedAt);

        // Apply limit
        if (filters.limit) {
            sessions = sessions.slice(0, filters.limit);
        }

        return sessions;
    }

    /**
     * ===== STATISTICS & RECOMMENDATIONS =====
     */

    /**
     * Calculate overall statistics for a student
     * @param {string} studentId
     * @returns {Object} Statistics object
     */
    getStudentStats(studentId) {
        const student = this.data.students[studentId];
        if (!student) return null;

        const sessions = this.getStudentSessions(studentId);

        return {
            totalSessions: student.totalSessions,
            totalQuestions: student.totalQuestions,
            totalCorrect: student.totalCorrect,
            overallAccuracy: student.totalQuestions > 0
                ? Math.round((student.totalCorrect / student.totalQuestions) * 100)
                : 0,
            recentSessions: sessions.slice(0, 5),
            bestStreak: Math.max(...sessions.map(s => s.streakBest), 0),
            totalPowerUps: sessions.reduce((sum, s) => sum + s.powerUpsUsed, 0),
            completedModules: Object.values(student.moduleProgress)
                .filter(m => m.completed).length,
            averageSessionTime: this.calculateAverageSessionTime(sessions),
            lastActive: student.lastActive
        };
    }

    /**
     * Get performance window (last 3 sessions) for a module/level
     * @param {string} studentId
     * @param {string} moduleId
     * @param {number} level
     * @returns {Object} Performance data
     */
    getPerformanceWindow(studentId, moduleId, level) {
        const sessions = this.getStudentSessions(studentId, {
            moduleId,
            level,
            limit: 3
        });

        if (sessions.length === 0) {
            return {
                sessionCount: 0,
                averageAccuracy: 0,
                trend: 'insufficient_data',
                isImproving: false,
                isDeclining: false
            };
        }

        const accuracies = sessions.map(s => s.finalScore.percentage);
        const averageAccuracy = Math.round(
            accuracies.reduce((a, b) => a + b, 0) / accuracies.length
        );

        // Determine trend (newest to oldest)
        let trend = 'stable';
        let isImproving = false;
        let isDeclining = false;

        if (sessions.length >= 2) {
            const recentAccuracy = accuracies[0]; // Most recent
            const olderAccuracy = accuracies[accuracies.length - 1]; // Oldest

            if (recentAccuracy > olderAccuracy + 10) {
                trend = 'improving';
                isImproving = true;
            } else if (recentAccuracy < olderAccuracy - 10) {
                trend = 'declining';
                isDeclining = true;
            }
        }

        return {
            sessionCount: sessions.length,
            averageAccuracy,
            trend,
            isImproving,
            isDeclining,
            recentSessions: sessions
        };
    }

    /**
     * Get recommended level for a module based on performance
     * @param {string} studentId
     * @param {string} moduleId
     * @returns {number} Recommended level (1-4)
     */
    getRecommendedLevel(studentId, moduleId) {
        const student = this.data.students[studentId];
        if (!student) return 3; // Default to Level 3

        // Start with student's default preference
        let recommendedLevel = student.preferences.defaultLevel || 3;

        // Check if module has been attempted
        const moduleProgress = student.moduleProgress[moduleId];
        if (!moduleProgress) {
            return recommendedLevel; // No data yet, use preference
        }

        // Check performance at each level (starting from highest)
        for (let level = 4; level >= 1; level--) {
            const performance = this.getPerformanceWindow(studentId, moduleId, level);

            // If average accuracy is >= 80% in last 3 sessions, recommend this level or higher
            if (performance.sessionCount >= 2 && performance.averageAccuracy >= 80) {
                recommendedLevel = Math.min(level + 1, 4); // Suggest one level up, max 4
                break;
            }

            // If accuracy is 60-79%, stay at this level
            if (performance.sessionCount >= 2 && performance.averageAccuracy >= 60) {
                recommendedLevel = level;
                break;
            }

            // If accuracy is < 60% and declining, suggest one level down
            if (performance.sessionCount >= 2 &&
                performance.averageAccuracy < 60 &&
                performance.isDeclining) {
                recommendedLevel = Math.max(level - 1, 1); // Min level 1
                break;
            }
        }

        return recommendedLevel;
    }

    /**
     * Calculate average session time
     * @param {Array} sessions
     * @returns {number} Average duration in milliseconds
     */
    calculateAverageSessionTime(sessions) {
        if (sessions.length === 0) return 0;

        const validSessions = sessions.filter(s => s.duration !== null);
        if (validSessions.length === 0) return 0;

        const totalTime = validSessions.reduce((sum, s) => sum + s.duration, 0);
        return Math.round(totalTime / validSessions.length);
    }

    /**
     * ===== EXPORT / IMPORT =====
     */

    /**
     * Export all data as JSON
     * @param {string} [studentId] - Optional: export single student only
     * @returns {string} JSON string
     */
    exportData(studentId = null) {
        if (studentId) {
            // Export single student
            const student = this.data.students[studentId];
            if (!student) {
                console.warn(`Student ${studentId} not found`);
                return null;
            }

            const studentSessions = this.getStudentSessions(studentId);

            const exportData = {
                version: DATA_VERSION,
                exportedAt: Date.now(),
                exportType: 'single_student',
                student,
                sessions: studentSessions
            };

            return JSON.stringify(exportData, null, 2);
        } else {
            // Export all data
            const exportData = {
                ...this.data,
                exportedAt: Date.now(),
                exportType: 'full_backup'
            };

            return JSON.stringify(exportData, null, 2);
        }
    }

    /**
     * Import data from JSON
     * @param {string} jsonString - JSON data to import
     * @param {Object} [options] - Import options { merge: boolean }
     * @returns {Object} Import result { success, message, stats }
     */
    importData(jsonString, options = { merge: false }) {
        try {
            const importData = JSON.parse(jsonString);

            // Validate version
            if (!importData.version || importData.version !== DATA_VERSION) {
                return {
                    success: false,
                    message: `Version mismatch. Expected ${DATA_VERSION}, got ${importData.version || 'unknown'}`
                };
            }

            if (importData.exportType === 'single_student') {
                // Import single student
                const newStudentId = this.generateId('student');
                const student = { ...importData.student, id: newStudentId };

                this.data.students[newStudentId] = student;

                // Import sessions with new student ID
                let sessionCount = 0;
                importData.sessions.forEach(session => {
                    const newSessionId = this.generateId('session');
                    this.data.sessions[newSessionId] = {
                        ...session,
                        id: newSessionId,
                        studentId: newStudentId
                    };
                    sessionCount++;
                });

                this.data.lastModified = Date.now();
                this.save();

                return {
                    success: true,
                    message: `Imported student: ${student.name}`,
                    stats: { students: 1, sessions: sessionCount }
                };

            } else if (importData.exportType === 'full_backup') {
                // Full data import
                if (options.merge) {
                    // Merge with existing data
                    this.data.students = { ...this.data.students, ...importData.students };
                    this.data.sessions = { ...this.data.sessions, ...importData.sessions };
                } else {
                    // Replace all data
                    this.data = importData;
                }

                this.data.lastModified = Date.now();
                this.save();

                return {
                    success: true,
                    message: 'Data imported successfully',
                    stats: {
                        students: Object.keys(this.data.students).length,
                        sessions: Object.keys(this.data.sessions).length
                    }
                };
            } else {
                return {
                    success: false,
                    message: 'Unknown export type'
                };
            }

        } catch (error) {
            console.error('Import error:', error);
            return {
                success: false,
                message: `Import failed: ${error.message}`
            };
        }
    }

    /**
     * ===== DATA MANAGEMENT =====
     */

    /**
     * Clean up old sessions (>30 days)
     */
    cleanup() {
        const cutoffDate = Date.now() - (SESSION_RETENTION_DAYS * 24 * 60 * 60 * 1000);
        let cleanedCount = 0;

        Object.keys(this.data.sessions).forEach(sessionId => {
            const session = this.data.sessions[sessionId];
            if (session.completedAt && session.completedAt < cutoffDate) {
                delete this.data.sessions[sessionId];
                cleanedCount++;
            }
        });

        if (cleanedCount > 0) {
            console.log(`🧹 Cleaned up ${cleanedCount} old sessions (>${SESSION_RETENTION_DAYS} days)`);
            this.save();
        }
    }

    /**
     * Migrate data from legacy systems (Phase 1-3.5)
     */
    migrateFromLegacySystems() {
        // Check if already migrated
        if (localStorage.getItem(MIGRATION_FLAG)) {
            return;
        }

        console.log('🔄 Migrating data from legacy systems...');

        // Check for legacy module progress
        const legacyProgress = localStorage.getItem('mathsPractice_moduleProgress');
        if (legacyProgress) {
            try {
                const progressData = JSON.parse(legacyProgress);

                // Create a default "Legacy User" student if data exists
                if (Object.keys(progressData).length > 0) {
                    const legacyStudentId = this.createStudent('Legacy User', '');
                    const student = this.data.students[legacyStudentId];

                    // Migrate module progress
                    Object.entries(progressData).forEach(([moduleId, moduleData]) => {
                        student.moduleProgress[moduleId] = {
                            completed: moduleData.completed || false,
                            levels: moduleData.levels || { 1: 0, 2: 0, 3: 0, 4: 0 }
                        };
                    });

                    this.save();
                    console.log('✓ Migrated legacy module progress to "Legacy User"');
                }
            } catch (error) {
                console.error('Failed to migrate legacy progress:', error);
            }
        }

        // Mark migration as complete
        localStorage.setItem(MIGRATION_FLAG, 'true');
        console.log('✓ Migration complete');
    }

    /**
     * Clear all data (use with caution!)
     */
    clearAllData() {
        this.data = {
            version: DATA_VERSION,
            students: {},
            currentStudentId: null,
            sessions: {},
            createdAt: Date.now(),
            lastModified: Date.now()
        };
        this.save();
        console.log('⚠️ All data cleared');
    }

    /**
     * ===== PERSISTENCE =====
     */

    /**
     * Save data to localStorage
     */
    save() {
        try {
            const jsonString = JSON.stringify(this.data);
            localStorage.setItem(STORAGE_KEY, jsonString);
        } catch (error) {
            console.error('Failed to save to localStorage:', error);

            // Check if quota exceeded
            if (error.name === 'QuotaExceededError') {
                console.error('⚠️ localStorage quota exceeded! Consider cleaning up old sessions.');
                alert('Storage limit reached. Please export your data and clear old sessions.');
            }
        }
    }

    /**
     * Load data from localStorage
     */
    load() {
        try {
            const jsonString = localStorage.getItem(STORAGE_KEY);
            if (jsonString) {
                const loadedData = JSON.parse(jsonString);

                // Validate version
                if (loadedData.version === DATA_VERSION) {
                    this.data = loadedData;
                    console.log('✓ Loaded storage data from localStorage');
                } else {
                    console.warn(`Version mismatch in storage. Expected ${DATA_VERSION}, got ${loadedData.version}`);
                }
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
    }

    /**
     * Generate unique ID
     * @param {string} prefix - Prefix for ID (e.g., 'student', 'session')
     * @returns {string} Unique ID
     */
    generateId(prefix) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 9);
        return `${prefix}_${timestamp}_${random}`;
    }

    /**
     * Get storage size info
     * @returns {Object} Storage statistics
     */
    getStorageInfo() {
        const jsonString = JSON.stringify(this.data);
        const sizeInBytes = new Blob([jsonString]).size;
        const sizeInKB = Math.round(sizeInBytes / 1024);
        const estimatedMaxKB = 5120; // 5MB typical localStorage limit

        return {
            sizeInBytes,
            sizeInKB,
            sizeInMB: (sizeInKB / 1024).toFixed(2),
            percentUsed: Math.round((sizeInKB / estimatedMaxKB) * 100),
            studentCount: Object.keys(this.data.students).length,
            sessionCount: Object.keys(this.data.sessions).length,
            oldestSession: this.getOldestSessionDate(),
            newestSession: this.getNewestSessionDate()
        };
    }

    /**
     * Get oldest session date
     * @returns {number|null} Timestamp or null
     */
    getOldestSessionDate() {
        const sessions = Object.values(this.data.sessions)
            .filter(s => s.completedAt !== null);

        if (sessions.length === 0) return null;

        return Math.min(...sessions.map(s => s.completedAt));
    }

    /**
     * Get newest session date
     * @returns {number|null} Timestamp or null
     */
    getNewestSessionDate() {
        const sessions = Object.values(this.data.sessions)
            .filter(s => s.completedAt !== null);

        if (sessions.length === 0) return null;

        return Math.max(...sessions.map(s => s.completedAt));
    }
}

// Export singleton instance
const storageManager = new StorageManager();
export default storageManager;
