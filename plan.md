### **Implementation Guide: UI/UX Refactor for UK Maths Practice App**

**Objective:**
This guide details the step-by-step process for refactoring the user interface of the "UK Maths Practice" web application. The goal is to enhance user experience, improve visual hierarchy, and implement modern UI patterns for the Module Selection, Question, and Results views. The implementation should follow the designs provided in the interactive mock-ups.

---

### **Phase 1: Global Styles & Foundation**

**File to Modify:** `styles/main.css`

**Objective:** Establish a consistent design system with a refined color palette, typography, and spacing.

**Step 1.1: Define CSS Custom Properties (Variables)**
At the top of `styles/main.css`, define a `:root` block. This will centralize the color palette and spacing units, making future style changes trivial.

```css
/* Add this at the top of styles/main.css */
:root {
    /* Color Palette */
    --primary-blue: #2563eb;
    --primary-blue-dark: #1d4ed8;
    --success-green: #10b981;
    --error-red: #ef4444;
    --accent-gold: #f59e0b;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --bg-main: #f3f4f6; /* New main background color */
    --bg-card: #ffffff;
    --border-color: #e5e7eb;

    /* Spacing Unit */
    --space-unit: 8px; /* 1 unit = 8px */
}

/* Update the body with the new background color */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--bg-main); /* UPDATE THIS */
    min-height: 100vh;
    padding: calc(var(--space-unit) * 3);
}
```

**Step 1.2: Establish Typographic Hierarchy**
Update the existing header styles and add general rules for typography to ensure a clear visual hierarchy.

```css
/* Update these rules in styles/main.css */
header h1 {
    font-size: 2.5rem;
    font-weight: 700; /* Bolder for emphasis */
    color: var(--primary-blue);
    margin-bottom: var(--space-unit);
    letter-spacing: -0.025em;
}

header p {
    color: var(--text-secondary);
    font-size: 1.125rem;
    max-width: 60ch; /* Improve readability for long descriptions */
    margin: 0 auto;
}
```

**Step 1.3: Convert to Spacing System**
Go through `styles/main.css` and replace existing `px` or `rem` values for margins, padding, and gaps with `calc(var(--space-unit) * N)`. For example, `margin-bottom: 2rem;` (32px) becomes `margin-bottom: calc(var(--space-unit) * 4);`. This ensures a consistent rhythm throughout the design.

---

### **Phase 2: Module Selection View Refactor**

**Objective:** Convert the dense, static grid layout into a clean, interactive accordion layout based on "Strands" and "Substrands."

**Step 2.1: Update JavaScript Rendering Logic**
**File to Modify:** `src/ui/app.js`

1.  **Modify `renderModules()`:** Replace the entire function. The new function will group modules and render the accordion structure. It will no longer render a grid.

    ```javascript
    // IN: src/ui/app.js
    // REPLACE the entire renderModules() function with this:
    renderModules() {
        const modulesGrid = document.querySelector('.modules-grid');
        modulesGrid.innerHTML = ''; // Clear existing content

        const grouped = this.groupModulesByStrandAndSubstrand();

        for (const strand in grouped) {
            const strandAccordion = document.createElement('div');
            strandAccordion.className = 'strand-accordion';

            let substrandHtml = '';
            for (const substrand in grouped[strand]) {
                substrandHtml += `
                    <div class="substrand-section">
                        <h3 class="substrand-title">${substrand}</h3>
                        <div class="modules-list">
                            ${grouped[strand][substrand].map(module => this.renderModuleCard(module)).join('')}
                        </div>
                    </div>
                `;
            }

            strandAccordion.innerHTML = `
                <div class="strand-header" role="button" tabindex="0">
                    <h2 class="strand-title">${strand}</h2>
                    <svg class="strand-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </div>
                <div class="strand-content">${substrandHtml}</div>
            `;
            modulesGrid.appendChild(strandAccordion);
        }
    }
    ```

2.  **Create `renderModuleCard()`:** Add this new helper method inside the `App` class to generate the HTML for a single module card.

    ```javascript
    // IN: src/ui/app.js
    // ADD this new method to the App class:
    renderModuleCard(module) {
        // Extract year number (e.g., "Year 1" -> "1")
        const yearNumber = module.yearGroup.match(/\d+/)?.[0] || '';
        
        return `
            <div class="module-card" data-module-id="${module.id}">
                <div class="module-header">
                    <span class="module-year">Year ${yearNumber}</span>
                    <span class="module-ref">${module.ref}</span>
                </div>
                <h4 class="module-name">${module.name}</h4>
                <p class="module-description">${module.description}</p>
            </div>
        `;
    }
    ```

3.  **Update `groupModulesByStrandAndSubstrand()`:** The existing logic is mostly correct but should be adjusted to create arrays of modules, not objects keyed by year.

    ```javascript
    // IN: src/ui/app.js
    // REPLACE groupModulesByStrandAndSubstrand() with this to ensure correct grouping:
    groupModulesByStrandAndSubstrand() {
        const grouped = {};
        Object.values(MODULES).forEach(module => {
            const { strand, substrand } = module;
            if (!grouped[strand]) grouped[strand] = {};
            if (!grouped[strand][substrand]) grouped[strand][substrand] = [];
            grouped[strand][substrand].push(module);
        });

        // Optional: Sort modules by year within each substrand
        for (const strand in grouped) {
            for (const substrand in grouped[strand]) {
                grouped[strand][substrand].sort((a, b) => {
                    const yearA = parseInt(a.yearGroup.match(/\d+/)[0]);
                    const yearB = parseInt(b.yearGroup.match(/\d+/)[0]);
                    return yearA - yearB;
                });
            }
        }
        return grouped;
    }
    ```

4.  **Update `attachEventListeners()`:** Modify the event listener to handle both accordion clicks and module card clicks.

    ```javascript
    // IN: src/ui/app.js
    // REPLACE the module selection event listener in attachEventListeners() with this:
    document.querySelector('.modules-grid').addEventListener('click', (e) => {
        // Accordion functionality
        const header = e.target.closest('.strand-header');
        if (header) {
            const accordion = header.parentElement;
            const content = header.nextElementSibling;
            accordion.classList.toggle('open');
            if (accordion.classList.contains('open')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = '0';
            }
            return; // Exit after handling accordion
        }

        // Module card selection
        const moduleCard = e.target.closest('.module-card[data-module-id]');
        if (moduleCard) {
            const moduleId = moduleCard.dataset.moduleId;
            this.selectModule(moduleId);
        }
    });
    ```

**Step 2.2: Implement New CSS for Accordion Layout**
**File to Modify:** `styles/main.css`

1.  **Remove Old Grid Styles:** Delete all CSS rules related to `.strand-section`, `.year-grid`, `.year-column`, `.year-header`, and `.module-cell`.

2.  **Add Accordion and New Card Styles:** Add the following CSS. This implements the new design based on the mock-up.

    ```css
    /* styles/main.css - ADD these styles */

    /* Accordion Styling */
    .strand-accordion {
        border-radius: 12px;
        margin-bottom: calc(var(--space-unit) * 3);
        background-color: var(--bg-card);
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        overflow: hidden;
    }
    .strand-accordion.open {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .strand-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: calc(var(--space-unit) * 2) calc(var(--space-unit) * 3);
        cursor: pointer;
    }
    .strand-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--primary-blue);
    }
    .strand-chevron {
        transition: transform 0.3s ease;
        stroke: var(--text-secondary);
        width: 24px;
        height: 24px;
    }
    .strand-accordion.open .strand-chevron {
        transform: rotate(180deg);
    }
    .strand-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease-out;
        padding: 0 calc(var(--space-unit) * 3);
    }
    
    /* Substrand & Module Layout */
    .substrand-section {
        padding: calc(var(--space-unit) * 3) 0;
        border-top: 1px solid var(--border-color);
    }
    .substrand-section:first-child {
        border-top: none;
    }
    .substrand-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: calc(var(--space-unit) * 2);
    }
    .modules-list {
        display: flex;
        flex-wrap: wrap;
        gap: calc(var(--space-unit) * 2);
    }

    /* Redesigned Module Cards */
    .module-card {
        background: var(--bg-card);
        border-radius: 12px;
        border: 2px solid var(--border-color);
        padding: calc(var(--space-unit) * 2);
        flex: 1 1 300px;
        min-width: 300px;
        transition: all 0.2s ease;
        cursor: pointer;
    }
    .module-card:hover {
        transform: translateY(-4px);
        border-color: var(--primary-blue);
        box-shadow: 0 8px 16px rgba(37, 99, 235, 0.1);
    }
    .module-header {
        display: flex;
        align-items: center;
        gap: var(--space-unit);
        margin-bottom: var(--space-unit);
    }
    .module-year {
        background: var(--bg-subtle);
        color: var(--primary-blue);
        font-weight: 600;
        padding: calc(var(--space-unit) / 2) var(--space-unit);
        border-radius: 6px;
        font-size: 0.8rem;
    }
    .module-ref {
        background-color: #fffbeb;
        color: #b45309;
        font-weight: 700;
        font-size: 0.75rem;
        padding: calc(var(--space-unit) / 2) var(--space-unit);
        border-radius: 6px;
    }
    .module-name {
        font-size: 1.05rem;
        font-weight: 600;
        line-height: 1.4;
        margin-bottom: calc(var(--space-unit) / 2);
    }
    .module-description {
        font-size: 0.85rem;
        color: var(--text-secondary);
        line-height: 1.5;
    }
    ```

---

### **Phase 3: Question & Answer View Enhancement**

**Objective:** Implement a progress bar, sticky action buttons, and improve feedback styling for a more focused and interactive experience.

**Step 3.1: Update HTML Structure**
**File to Modify:** `index.html`

1.  **Add Progress Bar:** Insert the progress bar container inside the `#questionsSection`.
2.  **Restructure Actions:** Move the action buttons into a `<footer>` element to prepare for sticky positioning.

    ```html
    <!-- IN: index.html -->
    <!-- Modify #questionsSection -->
    <div id="questionsSection" class="section hidden">
        <div class="questions-header">
            <h2 id="moduleTitle"></h2>
            <button id="backBtn" class="btn-secondary">← Back to Modules</button>
        </div>

        <!-- ADD THIS PROGRESS BAR -->
        <div class="progress-bar-container">
            <div class="progress-fill" id="progress-fill"></div>
        </div>

        <div id="questionsContainer">
            <!-- Questions will be inserted here -->
        </div>
    </div>
    
    <!-- This replaces the old .actions div -->
    <footer id="actions-footer" class="actions-footer hidden">
         <button id="submitBtn" class="btn-primary">Submit Answers</button>
         <button id="resetBtn" class="btn-secondary">Reset</button>
    </footer>
    ```

**Step 3.2: Update JavaScript Logic**
**File to Modify:** `src/ui/app.js`

1.  **Control Footer Visibility in `showSection()`:**

    ```javascript
    // IN: src/ui/app.js
    // Modify showSection()
    showSection(sectionName) {
        const sections = ['setup', 'questions', 'results'];
        sections.forEach(name => {
            document.getElementById(`${name}Section`).classList.toggle('hidden', name !== sectionName);
        });

        // Also control the new actions footer
        document.getElementById('actions-footer').classList.toggle('hidden', sectionName !== 'questions');
    }
    ```

2.  **Update Progress Bar in `renderQuestions()` and `submitAnswers()`:**

    ```javascript
    // IN: src/ui/app.js
    // Add this line at the beginning of renderQuestions()
    document.getElementById('progress-fill').style.width = '0%';

    // IN: src/ui/app.js
    // Add this inside submitAnswers(), after the main loop
    const totalAnswered = this.answerData.filter(a => a.userAnswer !== '(No answer)').length;
    const progress = totalAnswered > 0 ? (totalAnswered / totalQuestions) * 100 : 0;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    ```
    
3.  **Enhance Feedback in `submitAnswers()`:** The key is to add classes to the parent `<label>` element for better styling control.

    ```javascript
    // IN: src/ui/app.js
    // REPLACE the 'multiple_choice' block inside submitAnswers()
    if (question.type === 'multiple_choice') {
        const selectedRadio = questionElement.querySelector(`input[name="${questionId}"]:checked`);
        userAnswer = selectedRadio ? selectedRadio.value : '';
        
        // NEW: Add feedback classes to option labels
        questionElement.querySelectorAll('.option').forEach(opt => {
            const radio = opt.querySelector('input');
            if (radio.value === question.answer) {
                opt.classList.add('correct-answer');
            } else if (radio.checked) {
                opt.classList.add('incorrect-answer');
            }
        });
    }
    ```

**Step 3.3: Add New CSS for Question View**
**File to Modify:** `styles/main.css`

```css
/* styles/main.css - ADD these styles */

/* Progress Bar */
.progress-bar-container {
    width: 100%;
    margin-bottom: calc(var(--space-unit) * 3);
}
.progress-bar {
    height: 12px;
    background: var(--border-color);
    border-radius: 6px;
    overflow: hidden;
}
.progress-fill {
    width: 0%;
    height: 100%;
    background: var(--primary-blue);
    border-radius: 6px;
    transition: width 0.4s ease-in-out;
}

/* Question Options Enhancements */
.option { /* This is the parent of the label */
    border-radius: 8px;
    transition: all 0.2s ease;
}
.option label {
    display: block; /* Makes the entire area clickable */
    padding: calc(var(--space-unit) * 2);
    border: 2px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
}
.option input[type="radio"] {
    display: none; /* Hide the radio button itself */
}
.option input[type="radio"]:checked + label {
    border-color: var(--primary-blue);
    background: #eff6ff;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}
.option.correct-answer label {
    border-color: var(--success-green);
    background: #d1fae5;
}
.option.incorrect-answer label {
    border-color: var(--error-red);
    background: #fee2e2;
}


/* Sticky Actions Footer */
.actions-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--bg-card);
    padding: calc(var(--space-unit) * 2) calc(var(--space-unit) * 3);
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    gap: calc(var(--space-unit) * 2);
    z-index: 100;
}
.actions-footer.hidden {
    display: none;
}
/* Add padding to body to prevent footer from overlapping content */
body {
    /* ... existing styles ... */
    padding-bottom: 120px;
}
```

---

### **Phase 4: Results View Redesign**

**Objective:** Implement a visually engaging results dashboard with a donut chart for the overall score and bar charts for the per-level breakdown.

**Step 4.1: Integrate Chart.js Library**
**File to Modify:** `index.html`
Add the Chart.js script tag in the `<head>` section.

```html
<!-- IN: index.html -->
<!-- Add this inside the <head> tag -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

**Step 4.2: Update HTML Structure for Results**
**File to Modify:** `index.html`

Replace the current `#resultsContainer` with a new structure that includes a `<canvas>` element for the chart.

```html
<!-- IN: index.html -->
<!-- REPLACE the #resultsContainer div -->
<div id="resultsContainer">
    <div class="results-summary">
        <div class="score-chart-container">
            <canvas id="scoreChart"></canvas>
            <div class="score-text-overlay">
                <div class="score-value" id="score-value-text"></div>
                <div class="score-label">Correct</div>
            </div>
        </div>
        <div class="level-breakdown" id="level-breakdown-container">
            <!-- Per-level bars will be injected here -->
        </div>
    </div>
    <div class="detailed-results" id="detailed-results-container">
        <!-- Detailed answer review will be injected here -->
    </div>
</div>
```

**Step 4.3: Refactor JavaScript for Charting**
**File to Modify:** `src/ui/app.js`

Modify the `showResults()` function completely to create the charts and render the new layout.

```javascript
// IN: src/ui/app.js
// REPLACE the entire showResults() function with this:
showResults(correct, total) {
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    // --- Render Summary Section ---
    document.getElementById('score-value-text').textContent = `${correct}/${total}`;

    // 1. Create Donut Chart
    const ctx = document.getElementById('scoreChart').getContext('2d');
    // Destroy previous chart instance if it exists
    if (window.myScoreChart) window.myScoreChart.destroy();
    
    window.myScoreChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [correct, total - correct],
                backgroundColor: ['var(--primary-blue)', 'var(--border-color)'],
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '80%',
            plugins: { tooltip: { enabled: false } },
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    // 2. Create Per-Level Bar Chart Breakdown
    const levelBreakdownContainer = document.getElementById('level-breakdown-container');
    levelBreakdownContainer.innerHTML = this.questions.map(levelGroup => {
        const levelCorrect = this.answerData.filter(a => a.level === levelGroup.level && a.isCorrect).length;
        const levelTotal = levelGroup.questions.length;
        const levelPercentage = levelTotal > 0 ? (levelCorrect / levelTotal) * 100 : 0;
        return `
            <div class="level-score-item">
                <div class="level-score-header">
                    <span class="level-name">${levelGroup.levelName}</span>
                    <span class="level-result">${levelCorrect} / ${levelTotal}</span>
                </div>
                <div class="level-progress-bar">
                    <div class="level-progress-fill" style="width: ${levelPercentage}%;"></div>
                </div>
            </div>
        `;
    }).join('');

    // --- Render Detailed Results Section ---
    const detailedContainer = document.getElementById('detailed-results-container');
    // Group answers by level for rendering
    const answersByLevel = this.answerData.reduce((acc, answer) => {
        (acc[answer.levelName] = acc[answer.levelName] || []).push(answer);
        return acc;
    }, {});
    
    detailedContainer.innerHTML = Object.entries(answersByLevel).map(([levelName, answers]) => `
        <h3 class="detailed-level-title">${levelName}</h3>
        ${answers.map((answer, index) => `
            <div class="question-result ${answer.isCorrect ? 'correct' : 'incorrect'}">
                <p class="question-result-header">Question ${index + 1}</p>
                <p class="question-text-review">${answer.questionText}</p>
                <div class="answer-comparison">
                    <span class="answer-label">Your Answer:</span>
                    <span class="answer-value ${answer.isCorrect ? 'correct' : 'incorrect'}">${answer.userAnswer}</span>
                    ${!answer.isCorrect ? `
                        <span class="answer-label">Correct Answer:</span>
                        <span class="answer-value correct">${answer.correctAnswer}</span>
                    ` : ''}
                </div>
            </div>
        `).join('')}
    `).join('');

    this.showSection('results');
}
```

**Step 4.4: Add New CSS for Results View**
**File to Modify:** `styles/main.css`

```css
/* styles/main.css - ADD these styles, replacing old results styles */

/* Visual Results Summary */
.results-summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--space-unit) * 4);
    padding-bottom: calc(var(--space-unit) * 4);
    margin-bottom: calc(var(--space-unit) * 4);
    border-bottom: 2px solid var(--border-color);
}
.score-chart-container {
    position: relative;
    width: 200px;
    height: 200px;
}
.score-text-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.score-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-blue);
}
.score-label {
    font-size: 1rem;
    color: var(--text-secondary);
}

/* Level Breakdown Bars */
.level-breakdown {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: calc(var(--space-unit) * 3);
}
.level-score-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-unit);
}
.level-score-header {
    display: flex;
    justify-content: space-between;
}
.level-name {
    font-weight: 600;
}
.level-result {
    color: var(--text-secondary);
}
.level-progress-bar {
    height: 12px;
    background-color: var(--bg-subtle);
    border-radius: 6px;
    overflow: hidden;
}
.level-progress-fill {
    height: 100%;
    background: var(--primary-blue);
    border-radius: 6px;
}

/* Detailed Results Styling */
.detailed-results h2 { /* Assume you'll add this heading */
    text-align: center;
    font-size: 1.75rem;
    margin-bottom: calc(var(--space-unit) * 3);
}
.detailed-level-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-blue);
    margin-top: calc(var(--space-unit) * 4);
    margin-bottom: calc(var(--space-unit) * 2);
    border-bottom: 2px solid var(--border-color);
    padding-bottom: var(--space-unit);
}
.question-result {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: calc(var(--space-unit) * 3);
    margin-bottom: calc(var(--space-unit) * 2);
    border-left-width: 5px;
}
.question-result.correct { border-left-color: var(--success-green); }
.question-result.incorrect { border-left-color: var(--error-red); }
.question-text-review {
    background: var(--bg-subtle);
    padding: var(--space-unit);
    border-radius: 6px;
    margin-bottom: calc(var(--space-unit) * 2);
}
.answer-comparison {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: var(--space-unit);
    align-items: center;
}
.answer-label {
    font-weight: 500;
    color: var(--text-secondary);
    text-align: right;
}
.answer-value {
    font-weight: 600;
    padding: calc(var(--space-unit) / 2) var(--space-unit);
    border-radius: 6px;
}
.answer-value.correct { background-color: #d1fae5; color: #065f46; }
.answer-value.incorrect { background-color: #fee2e2; color: #991b1b; }
```