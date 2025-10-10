/**
 * Student Selector Component
 *
 * UI component for student profile management and selection.
 * Part of Phase 4: Progress Persistence
 *
 * Features:
 * - View all student profiles
 * - Select active student
 * - Create new student
 * - Edit student details
 * - Delete student profiles
 * - View quick stats for each student
 */

import storageManager from '../core/storageManager.js';

class StudentSelector {
    constructor() {
        this.element = null;
        this.onStudentSelected = null; // Callback when student is selected
    }

    /**
     * Show student selector dialog
     * @param {Function} onStudentSelected - Callback(studentId) when student is selected
     */
    show(onStudentSelected = null) {
        this.onStudentSelected = onStudentSelected;

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
     * Hide student selector
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
        this.element.className = 'student-selector-overlay';
    }

    /**
     * Render the student selector content
     */
    render() {
        const students = storageManager.getAllStudents();
        const currentStudent = storageManager.getCurrentStudent();

        this.element.innerHTML = `
            <div class="student-selector-card">
                <div class="student-selector-header">
                    <h2>👤 Select Student</h2>
                    <button class="close-btn" id="closeStudentSelector" aria-label="Close">×</button>
                </div>

                <div class="student-selector-body">
                    ${students.length > 0 ? this.renderStudentList(students, currentStudent) : this.renderEmptyState()}
                </div>

                <div class="student-selector-footer">
                    <button class="student-selector-btn primary" id="createStudentBtn">
                        + Create New Student
                    </button>
                    ${currentStudent ? `
                        <button class="student-selector-btn secondary" id="continueAnonymousBtn">
                            Continue Without Tracking
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    /**
     * Render list of students
     */
    renderStudentList(students, currentStudent) {
        return `
            <div class="student-list">
                ${students.map(student => {
                    const stats = storageManager.getStudentStats(student.id);
                    const isSelected = currentStudent && currentStudent.id === student.id;
                    const selectedClass = isSelected ? 'selected' : '';

                    return `
                        <div class="student-card ${selectedClass}" data-student-id="${student.id}">
                            <div class="student-card-main">
                                <div class="student-info">
                                    <div class="student-name">${this.escapeHtml(student.name)}</div>
                                    ${student.yearGroup ? `<div class="student-year">${this.escapeHtml(student.yearGroup)}</div>` : ''}
                                </div>
                                <div class="student-stats">
                                    <div class="stat-item">
                                        <div class="stat-value">${stats.totalSessions}</div>
                                        <div class="stat-label">Sessions</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${stats.overallAccuracy}%</div>
                                        <div class="stat-label">Accuracy</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-value">${stats.completedModules}</div>
                                        <div class="stat-label">Completed</div>
                                    </div>
                                </div>
                            </div>
                            <div class="student-card-actions">
                                <button class="student-action-btn select-btn" data-action="select" data-student-id="${student.id}">
                                    ${isSelected ? '✓ Selected' : 'Select'}
                                </button>
                                <button class="student-action-btn edit-btn" data-action="edit" data-student-id="${student.id}" title="Edit student">
                                    ✏️
                                </button>
                                <button class="student-action-btn delete-btn" data-action="delete" data-student-id="${student.id}" title="Delete student">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Render empty state when no students exist
     */
    renderEmptyState() {
        return `
            <div class="student-empty-state">
                <div class="empty-icon">👥</div>
                <h3>No Students Yet</h3>
                <p>Create a student profile to start tracking progress and performance.</p>
                <p class="empty-note">You can still practice without tracking by closing this dialog.</p>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close button
        const closeBtn = this.element.querySelector('#closeStudentSelector');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }

        // Create student button
        const createBtn = this.element.querySelector('#createStudentBtn');
        if (createBtn) {
            createBtn.addEventListener('click', () => this.showCreateForm());
        }

        // Continue anonymous button
        const anonymousBtn = this.element.querySelector('#continueAnonymousBtn');
        if (anonymousBtn) {
            anonymousBtn.addEventListener('click', () => this.continueAnonymous());
        }

        // Student action buttons
        const actionButtons = this.element.querySelectorAll('.student-action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const studentId = btn.dataset.studentId;

                switch (action) {
                    case 'select':
                        this.selectStudent(studentId);
                        break;
                    case 'edit':
                        this.showEditForm(studentId);
                        break;
                    case 'delete':
                        this.confirmDelete(studentId);
                        break;
                }
            });
        });

        // Student card click (select)
        const studentCards = this.element.querySelectorAll('.student-card');
        studentCards.forEach(card => {
            card.addEventListener('click', () => {
                const studentId = card.dataset.studentId;
                this.selectStudent(studentId);
            });
        });
    }

    /**
     * Select a student
     */
    selectStudent(studentId) {
        const success = storageManager.setCurrentStudent(studentId);
        if (success) {
            const student = storageManager.getStudent(studentId);
            console.log(`✓ Selected student: ${student.name}`);

            // Call callback if provided
            if (this.onStudentSelected) {
                this.onStudentSelected(studentId);
            }

            // Show success feedback
            this.showSuccessFeedback(`Selected: ${student.name}`);

            // Close after brief delay
            setTimeout(() => this.hide(), 800);
        }
    }

    /**
     * Continue without student selection
     */
    continueAnonymous() {
        console.log('ℹ Continuing without student tracking');
        this.hide();
    }

    /**
     * Show create student form
     */
    showCreateForm() {
        const formHtml = `
            <div class="student-form-overlay">
                <div class="student-form-card">
                    <h3>Create New Student</h3>
                    <form id="createStudentForm">
                        <div class="form-group">
                            <label for="studentName">Name *</label>
                            <input type="text"
                                   id="studentName"
                                   class="form-input"
                                   placeholder="Enter student name"
                                   required
                                   autocomplete="off"
                                   maxlength="50">
                        </div>
                        <div class="form-group">
                            <label for="studentYear">Year Group (optional)</label>
                            <input type="text"
                                   id="studentYear"
                                   class="form-input"
                                   placeholder="e.g., Year 3"
                                   autocomplete="off"
                                   maxlength="20">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="form-btn primary">Create Student</button>
                            <button type="button" class="form-btn secondary" id="cancelCreateBtn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const formElement = document.createElement('div');
        formElement.innerHTML = formHtml;
        this.element.appendChild(formElement.firstElementChild);

        // Focus name input
        setTimeout(() => {
            const nameInput = this.element.querySelector('#studentName');
            if (nameInput) nameInput.focus();
        }, 100);

        // Form submit
        const form = this.element.querySelector('#createStudentForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.element.querySelector('#studentName').value.trim();
            const year = this.element.querySelector('#studentYear').value.trim();

            if (name) {
                const studentId = storageManager.createStudent(name, year);
                this.closeForm();
                this.render(); // Refresh list

                // Auto-select the new student
                this.selectStudent(studentId);
            }
        });

        // Cancel button
        const cancelBtn = this.element.querySelector('#cancelCreateBtn');
        cancelBtn.addEventListener('click', () => this.closeForm());
    }

    /**
     * Show edit student form
     */
    showEditForm(studentId) {
        const student = storageManager.getStudent(studentId);
        if (!student) return;

        const formHtml = `
            <div class="student-form-overlay">
                <div class="student-form-card">
                    <h3>Edit Student</h3>
                    <form id="editStudentForm">
                        <div class="form-group">
                            <label for="editStudentName">Name *</label>
                            <input type="text"
                                   id="editStudentName"
                                   class="form-input"
                                   value="${this.escapeHtml(student.name)}"
                                   required
                                   autocomplete="off"
                                   maxlength="50">
                        </div>
                        <div class="form-group">
                            <label for="editStudentYear">Year Group (optional)</label>
                            <input type="text"
                                   id="editStudentYear"
                                   class="form-input"
                                   value="${this.escapeHtml(student.yearGroup)}"
                                   autocomplete="off"
                                   maxlength="20">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="form-btn primary">Save Changes</button>
                            <button type="button" class="form-btn secondary" id="cancelEditBtn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const formElement = document.createElement('div');
        formElement.innerHTML = formHtml;
        this.element.appendChild(formElement.firstElementChild);

        // Form submit
        const form = this.element.querySelector('#editStudentForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.element.querySelector('#editStudentName').value.trim();
            const year = this.element.querySelector('#editStudentYear').value.trim();

            if (name) {
                storageManager.updateStudent(studentId, { name, yearGroup: year });
                this.closeForm();
                this.render(); // Refresh list
                this.showSuccessFeedback('Student updated!');
            }
        });

        // Cancel button
        const cancelBtn = this.element.querySelector('#cancelEditBtn');
        cancelBtn.addEventListener('click', () => this.closeForm());
    }

    /**
     * Confirm student deletion
     */
    confirmDelete(studentId) {
        const student = storageManager.getStudent(studentId);
        if (!student) return;

        const confirmed = confirm(
            `Delete student "${student.name}"?\n\n` +
            `This will permanently delete:\n` +
            `- Student profile\n` +
            `- All practice sessions\n` +
            `- All progress data\n\n` +
            `This action cannot be undone.`
        );

        if (confirmed) {
            const success = storageManager.deleteStudent(studentId);
            if (success) {
                this.render(); // Refresh list
                this.showSuccessFeedback('Student deleted');
            }
        }
    }

    /**
     * Close any open form
     */
    closeForm() {
        const formOverlay = this.element.querySelector('.student-form-overlay');
        if (formOverlay) {
            formOverlay.remove();
        }
    }

    /**
     * Show success feedback message
     */
    showSuccessFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'student-selector-feedback';
        feedback.textContent = message;

        this.element.appendChild(feedback);

        setTimeout(() => feedback.classList.add('visible'), 10);
        setTimeout(() => {
            feedback.classList.remove('visible');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export singleton instance
const studentSelector = new StudentSelector();
export default studentSelector;
