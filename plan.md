# Instructions for UI Transformation of Question Generator App

## Context
You are updating a UK National Curriculum mathematics question generator app. The current UI is functional but boring and not sleek. Transform it into a modern, engaging educational interface inspired by successful platforms like Duolingo, Khan Academy, and Kahoot.

## Current State Issues
- Generic purple gradient background feels dated
- Module cards lack visual hierarchy and engagement
- Questions interface is plain and uninspiring
- No micro-interactions or feedback animations
- Typography is adequate but uninspiring
- Colors don't create emotional connection
- No gamification elements
- Module grid is functional but boring

## Design System to Implement

### Color Palette
Replace the current purple gradient with a modern, energetic system:

**Primary Colors:**
- Primary Blue: `#2563eb` (trust, learning)
- Primary Green: `#10b981` (success, growth)
- Accent Orange: `#f59e0b` (energy, warmth)
- Accent Purple: `#8b5cf6` (creativity)

**Semantic Colors:**
- Success: `#10b981`
- Error: `#ef4444`
- Warning: `#f59e0b`
- Info: `#3b82f6`

**Neutrals:**
- Gray 50: `#f9fafb`
- Gray 100: `#f3f4f6`
- Gray 200: `#e5e7eb`
- Gray 600: `#4b5563`
- Gray 900: `#111827`

**Background:**
Replace gradient with clean white `#ffffff` or very light gray `#f9fafb`

### Typography
- **Primary Font:** Inter (system font fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`)
- **Heading Scale:**
  - H1: `2rem` (32px), weight 700
  - H2: `1.5rem` (24px), weight 600
  - H3: `1.25rem` (20px), weight 600
  - Body: `1rem` (16px), weight 400
  - Small: `0.875rem` (14px), weight 400
- **Line Heights:**
  - Headings: 1.2
  - Body: 1.6

### Spacing System
Use 8px grid: 8, 16, 24, 32, 40, 48, 64px

### Border Radius
- Small: `6px` (buttons, inputs)
- Medium: `12px` (cards, containers)
- Large: `20px` (major sections)

## File-by-File Changes

### 1. `styles/main.css` - Complete Overhaul

**Body & Background:**
```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #111827;
    background: #f9fafb; /* Remove gradient */
    min-height: 100vh;
    padding: 2rem 1rem;
}
```

**Container:**
```css
.container {
    max-width: 1400px; /* Wider for better space usage */
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

**Header:**
```css
header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 0.5rem;
    letter-spacing: -0.025em;
}

header p {
    color: #4b5563;
    font-size: 1.125rem;
}
```

**Module Cards - Modern Design:**
```css
.module-cell {
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    border-radius: 12px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid #e5e7eb;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.75rem;
    height: 100%;
    position: relative;
    overflow: hidden;
}

/* Add subtle accent bar on top */
.module-cell::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #8b5cf6);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.module-cell:not(.empty):hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -4px rgba(37, 99, 235, 0.2),
                0 8px 16px -4px rgba(37, 99, 235, 0.1);
    border-color: #2563eb;
}

.module-cell:not(.empty):hover::before {
    transform: scaleX(1);
}

.module-ref {
    font-size: 0.75rem;
    color: #8b5cf6;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #f3e8ff;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
}

.module-name {
    font-size: 1rem;
    color: #111827;
    font-weight: 600;
    line-height: 1.4;
}
```

**Questions Section - Enhanced:**
```css
.question {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    border: 2px solid #e5e7eb;
    transition: all 0.3s ease;
    position: relative;
}

.question::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #2563eb;
    border-radius: 12px 0 0 12px;
}

.question.correct {
    border-color: #10b981;
    background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.question.correct::before {
    background: #10b981;
}

.question.incorrect {
    border-color: #ef4444;
    background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
}

.question.incorrect::before {
    background: #ef4444;
}
```

**Buttons - Modern Style:**
```css
.btn-primary {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #2563eb;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -2px rgba(37, 99, 235, 0.4);
}

.btn-primary:active {
    transform: translateY(0);
}
```

**Multiple Choice Options:**
```css
.option {
    display: flex;
    align-items: center;
    padding: 1rem 1.25rem;
    background: #f9fafb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid #e5e7eb;
}

.option:hover {
    background: #eff6ff;
    border-color: #2563eb;
    transform: translateX(4px);
}

.option input[type="radio"]:checked + span {
    font-weight: 600;
}
```

**Level Sections:**
```css
.level-section {
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid #e5e7eb;
}

.level-title {
    font-size: 1.5rem;
    color: #2563eb;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 3px solid #2563eb;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Add level badges */
.level-title::before {
    content: attr(data-level);
    background: #2563eb;
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
}
```

**Add these new utility classes:**
```css
/* Animations */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-in {
    animation: slideInUp 0.4s ease-out;
}

/* Feedback animations */
@keyframes checkmark {
    0% {
        transform: scale(0) rotate(-45deg);
    }
    50% {
        transform: scale(1.2) rotate(-45deg);
    }
    100% {
        transform: scale(1) rotate(-45deg);
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.correct-mark {
    color: #10b981;
    font-size: 1.25rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    animation: checkmark 0.4s ease-out;
}

.incorrect-mark {
    color: #ef4444;
    font-size: 1rem;
    font-weight: 600;
    animation: shake 0.4s ease-out;
}

/* Progress bar enhancement */
.progress-bar {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    margin: 1rem 0;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #2563eb, #8b5cf6);
    border-radius: 12px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### 2. `src/ui/app.js` - Add Interactivity

Add these methods to enhance feedback:

```javascript
/**
 * Show animated feedback for correct/incorrect answers
 */
showFeedback(questionElement, isCorrect) {
    const feedbackElement = questionElement.querySelector('.feedback');
    
    if (isCorrect) {
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
        feedbackElement.innerHTML = `
            <div class="incorrect-mark">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" 
                          stroke="#ef4444" 
                          stroke-width="2" 
                          stroke-linecap="round" 
                          stroke-linejoin="round"/>
                </svg>
                Not quite. The answer is ${question.answer}
            </div>
        `;
    }
}

/**
 * Add entrance animations to questions
 */
renderQuestions() {
    // ... existing code ...
    
    // After rendering, add staggered animations
    const questions = document.querySelectorAll('.question');
    questions.forEach((q, idx) => {
        q.style.animationDelay = `${idx * 0.05}s`;
        q.classList.add('animate-slide-in');
    });
}

/**
 * Add progress bar visualization
 */
showSection(sectionName) {
    // ... existing code ...
    
    if (sectionName === 'questions') {
        this.updateProgressBar(0);
    }
}

updateProgressBar(currentQuestion, totalQuestions) {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}
```

Update the level title rendering to include badges:

```javascript
renderQuestions() {
    const container = document.getElementById('questionsContainer');
    const moduleTitle = document.getElementById('moduleTitle');

    moduleTitle.textContent = `${this.currentModule.icon} ${this.currentModule.name}`;

    container.innerHTML = this.questions.map((levelGroup, levelIdx) => `
        <div class="level-section">
            <h3 class="level-title" data-level="${levelGroup.level}">
                ${levelGroup.levelName}
            </h3>
            <div class="questions-list">
                ${levelGroup.questions.map((q, qIdx) => this.renderQuestion(q, levelIdx, qIdx)).join('')}
            </div>
        </div>
    `).join('');
    
    // Add entrance animations
    const questions = document.querySelectorAll('.question');
    questions.forEach((q, idx) => {
        q.style.animationDelay = `${idx * 0.05}s`;
        q.classList.add('animate-slide-in');
    });
}
```

### 3. `index.html` - Minor Updates

Add viewport meta and font loading:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UK Maths Practice - Question Generator</title>
    
    <!-- Load Inter font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="styles/main.css">
</head>
```

## Implementation Priority

### Phase 1: Visual Foundation (Do First)
1. Update `styles/main.css` with new color palette
2. Remove gradient background, use clean white/light gray
3. Update typography (font family, sizes, weights)
4. Enhance module cards with hover effects and accent bar
5. Update button styles

### Phase 2: Enhanced Interactions (Do Second)
1. Add transition effects to all interactive elements
2. Implement hover states for cards and buttons
3. Add entrance animations for questions
4. Create correct/incorrect feedback animations

### Phase 3: Polish (Do Third)
1. Add progress bar visualization
2. Implement level badges
3. Add SVG icons for feedback
4. Test and refine animations

## Testing Checklist

After implementation, verify:
- [ ] All text is readable (minimum 4.5:1 contrast)
- [ ] Colors are consistent throughout
- [ ] Hover effects work on all cards and buttons
- [ ] Animations are smooth (60fps)
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Animations respect `prefers-reduced-motion`

## Key Principles

1. **Less is More:** Remove the gradient, simplify colors
2. **Hierarchy:** Use size, weight, and color to guide attention
3. **Feedback:** Every interaction should have visual response
4. **Consistency:** Same spacing, same radius, same transitions
5. **Accessibility:** Always maintain contrast and keyboard access

## Expected Outcome

The app should feel:
- **Modern:** Clean, minimal, contemporary design
- **Engaging:** Subtle animations that delight
- **Professional:** Credible for educational use
- **Energetic:** Colors that motivate without overwhelming
- **Focused:** Clear hierarchy guides users naturally

Start with Phase 1 changes to the CSS file. Test thoroughly before moving to Phase 2.