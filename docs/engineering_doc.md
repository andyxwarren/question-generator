# Maths Practice Application - Engineering Documentation

**Version**: 1.0  
**Last Updated**: October 2025  
**Architecture**: Simple, client-focused, minimal backend

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Current Architecture](#current-architecture)
3. [Building the Current System](#building-the-current-system)
4. [Development Roadmap](#development-roadmap)
5. [Technical Specifications](#technical-specifications)
6. [Deployment Guide](#deployment-guide)

---

## System Overview

### Purpose
A differentiated mathematics practice system for UK Key Stage 1 & 2 students that generates parameterized questions at 4 difficulty levels.

### Core Principles
1. **Simplicity First**: Avoid complex databases and authentication
2. **Three-Component Architecture**: Curriculum → Templates → Delivery
3. **Client-Side Focus**: Maximum functionality in browser
4. **Minimal Dependencies**: Pure JavaScript, no frameworks required

### Key Features (Current)
- Module selection (4 topics: Counting, Number Bonds, Multiplication, Fractions)
- 4 difficulty levels per module
- Dynamic question generation from parameters
- Multiple question formats (multiple choice, text input)
- Immediate feedback
- Progress tracking
- Results summary

---

## Current Architecture

### Three-Component System

```
┌─────────────────────────────────────────────────────────────┐
│                    CURRICULUM & PARAMETERS                   │
│  • Module definitions                                        │
│  • Difficulty level parameters                               │
│  • Value ranges, step sizes, constraints                     │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    QUESTION TEMPLATES                        │
│  • Generation algorithms per module                          │
│  • Question type variations                                  │
│  • Answer validation logic                                   │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   DELIVERY APPLICATION                       │
│  • Student interface (setup, practice, results)             │
│  • Question rendering                                        │
│  • Answer collection and validation                          │
│  • Progress tracking                                         │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
maths-practice-app/
│
├── index.html                 # Main application file (current single-file version)
│
├── src/                       # Modular version (recommended for development)
│   ├── curriculum/
│   │   └── modules.js         # Module definitions and parameters
│   │
│   ├── templates/
│   │   ├── counting.js        # Counting question generators
│   │   ├── bonds.js           # Number bonds generators
│   │   ├── multiplication.js  # Multiplication generators
│   │   └── fractions.js       # Fractions generators
│   │
│   ├── core/
│   │   ├── questionEngine.js  # Question generation orchestration
│   │   ├── validator.js       # Answer validation
│   │   └── storage.js         # Data persistence (Phase 2)
│   │
│   └── app/
│       ├── setup.js           # Setup screen logic
│       ├── practice.js        # Practice screen logic
│       └── results.js         # Results screen logic
│
├── styles/
│   └── main.css               # Application styles
│
├── data/                      # Simple data storage (Phase 2)
│   ├── progress/              # Student progress files
│   └── results/               # Session results
│
└── docs/
    ├── curriculum-guide.md    # How to add new modules
    ├── template-guide.md      # How to create question templates
    └── api-reference.md       # Function documentation
```

---

## Building the Current System

### Step 1: Set Up Basic Structure

**Create `index.html`** (or use existing single-file version):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maths Practice</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <!-- Three main screens -->
    <div id="setupScreen" class="screen"></div>
    <div id="practiceScreen" class="screen hidden"></div>
    <div id="resultsScreen" class="screen hidden"></div>
    
    <!-- Core scripts -->
    <script src="src/curriculum/modules.js"></script>
    <script src="src/templates/counting.js"></script>
    <script src="src/templates/bonds.js"></script>
    <script src="src/templates/multiplication.js"></script>
    <script src="src/templates/fractions.js"></script>
    <script src="src/core/questionEngine.js"></script>
    <script src="src/app/setup.js"></script>
    <script src="src/app/practice.js"></script>
    <script src="src/app/results.js"></script>
    <script src="src/app/main.js"></script>
</body>
</html>
```

### Step 2: Define Curriculum Structure

**File: `src/curriculum/modules.js`**

```javascript
const MODULES = {
    'counting': {
        id: 'counting',
        name: 'Counting',
        description: 'Number sequences and patterns',
        parameters: {
            max_value: { 1: 30, 2: 50, 3: 100, 4: 200 },
            step_sizes: { 1: [1, 2, 5, 10], 2: [1, 2, 5, 10], 3: [1, 2, 5, 10], 4: [1, 2, 3, 5, 10] },
            sequence_length: { 1: 5, 2: 8, 3: 12, 4: 15 }
        }
    },
    // ... other modules
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MODULES;
}
```

**Adding New Modules:**

1. Add new entry to `MODULES` object
2. Define parameters for all 4 difficulty levels
3. Create corresponding template file
4. Register in question engine

### Step 3: Create Question Templates

**File: `src/templates/counting.js`**

```javascript
function generateCountingQuestion(params, level) {
    const steps = params.step_sizes[level];
    const step = steps[Math.floor(Math.random() * steps.length)];
    const maxVal = params.max_value[level];
    
    // Generate sequence
    let start = Math.floor(Math.random() * (maxVal / 2));
    start = Math.floor(start / step) * step;
    
    const sequence = [];
    for (let i = 0; i < 6; i++) {
        sequence.push(start + (i * step));
    }
    
    // Choose question type
    const types = ['fill_blank', 'multiple_choice', 'next_number'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    if (type === 'multiple_choice') {
        return {
            text: `What comes next? ${sequence.slice(0, 4).join(', ')}, ...`,
            type: 'multiple_choice',
            options: generateOptions(sequence[4], step),
            answer: sequence[4].toString()
        };
    } else {
        return {
            text: `Fill in: ${sequence[0]}, ${sequence[1]}, ___, ${sequence[3]}`,
            type: 'text_input',
            answer: sequence[2].toString()
        };
    }
}

function generateOptions(correct, step) {
    return [
        correct,
        correct + step,
        correct - step,
        correct + 2 * step
    ].sort(() => Math.random() - 0.5);
}
```

**Template Guidelines:**

- Each template file exports a `generate{ModuleName}Question` function
- Function receives `(params, level)` and returns question object
- Question object structure:
  ```javascript
  {
      text: "Question text",
      type: "multiple_choice" | "text_input" | "drag_drop",
      options?: [...],        // For multiple choice
      answer: "correct answer",
      hint?: "Optional hint"
  }
  ```

### Step 4: Build Question Engine

**File: `src/core/questionEngine.js`**

```javascript
const QuestionEngine = {
    generators: {
        'counting': generateCountingQuestion,
        'bonds': generateBondsQuestion,
        'multiply': generateMultiplyQuestion,
        'fractions': generateFractionsQuestion
    },
    
    generate(moduleId, level, count) {
        const module = MODULES[moduleId];
        const generator = this.generators[moduleId];
        const questions = [];
        
        for (let i = 0; i < count; i++) {
            const question = generator(module.parameters, level);
            if (question) {
                question.id = `${moduleId}_${Date.now()}_${i}`;
                question.module = moduleId;
                question.level = level;
                questions.push(question);
            }
        }
        
        return questions;
    },
    
    validate(question, studentAnswer) {
        return studentAnswer.trim() === question.answer.trim();
    }
};
```

### Step 5: Build Application Screens

**Setup Screen** (`src/app/setup.js`):
```javascript
const SetupScreen = {
    init() {
        this.renderTopics();
        this.renderLevels();
        this.attachListeners();
    },
    
    renderTopics() {
        // Display module cards
    },
    
    renderLevels() {
        // Display difficulty level selector
    },
    
    startPractice() {
        const questions = QuestionEngine.generate(
            this.selectedModule,
            this.selectedLevel,
            this.questionCount
        );
        PracticeScreen.init(questions);
    }
};
```

**Practice Screen** (`src/app/practice.js`):
```javascript
const PracticeScreen = {
    init(questions) {
        this.questions = questions;
        this.currentIndex = 0;
        this.score = { correct: 0, incorrect: 0 };
        this.showQuestion();
    },
    
    showQuestion() {
        const question = this.questions[this.currentIndex];
        this.renderQuestion(question);
    },
    
    checkAnswer(studentAnswer) {
        const question = this.questions[this.currentIndex];
        const isCorrect = QuestionEngine.validate(question, studentAnswer);
        
        if (isCorrect) {
            this.score.correct++;
            this.showFeedback(true);
        } else {
            this.score.incorrect++;
            this.showFeedback(false, question.answer);
        }
    },
    
    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex >= this.questions.length) {
            ResultsScreen.init(this.score, this.questions);
        } else {
            this.showQuestion();
        }
    }
};
```

**Results Screen** (`src/app/results.js`):
```javascript
const ResultsScreen = {
    init(score, questions) {
        this.score = score;
        this.questions = questions;
        this.render();
    },
    
    render() {
        const percentage = (this.score.correct / this.questions.length) * 100;
        // Display results with motivational message
    }
};
```

### Step 6: Testing

**Manual Testing Checklist:**
- [ ] All modules selectable
- [ ] All difficulty levels work
- [ ] Questions generate correctly
- [ ] Multiple choice clickable
- [ ] Text input accepts answers
- [ ] Validation works correctly
- [ ] Progress tracking accurate
- [ ] Results display properly
- [ ] Can restart and change topic

---

## Development Roadmap

### Phase 1: Question Deduplication (PRIORITY 1)

**Goal**: Prevent students from seeing the same question twice within a configurable time period.

**Technical Approach:**

1. **Add Question Fingerprinting**
   ```javascript
   function generateQuestionFingerprint(question) {
       // Create unique identifier based on question content
       return `${question.module}_${question.type}_${question.text}_${question.answer}`;
   }
   ```

2. **Implement Recent Questions Tracking**
   ```javascript
   const QuestionHistory = {
       storage: new Map(), // fingerprint -> timestamp
       cooldownPeriod: 24 * 60 * 60 * 1000, // 24 hours default
       
       setCooldown(hours) {
           this.cooldownPeriod = hours * 60 * 60 * 1000;
       },
       
       hasSeenRecently(fingerprint) {
           if (!this.storage.has(fingerprint)) return false;
           
           const lastSeen = this.storage.get(fingerprint);
           const now = Date.now();
           
           if (now - lastSeen > this.cooldownPeriod) {
               this.storage.delete(fingerprint);
               return false;
           }
           
           return true;
       },
       
       markAsSeen(fingerprint) {
           this.storage.set(fingerprint, Date.now());
       },
       
       cleanup() {
           const now = Date.now();
           for (const [fingerprint, timestamp] of this.storage.entries()) {
               if (now - timestamp > this.cooldownPeriod) {
                   this.storage.delete(fingerprint);
               }
           }
       }
   };
   ```

3. **Modify Question Generation**
   ```javascript
   generate(moduleId, level, count, maxAttempts = 100) {
       const questions = [];
       let attempts = 0;
       
       while (questions.length < count && attempts < maxAttempts) {
           const question = generator(module.parameters, level);
           const fingerprint = generateQuestionFingerprint(question);
           
           if (!QuestionHistory.hasSeenRecently(fingerprint)) {
               question.fingerprint = fingerprint;
               questions.push(question);
               QuestionHistory.markAsSeen(fingerprint);
           }
           
           attempts++;
       }
       
       return questions;
   }
   ```

4. **Add Settings UI**
   ```html
   <!-- In setup screen -->
   <div class="settings-panel">
       <label>Question Cooldown Period:</label>
       <select id="cooldownSelect">
           <option value="1">1 hour</option>
           <option value="4">4 hours</option>
           <option value="12">12 hours</option>
           <option value="24" selected>24 hours (default)</option>
           <option value="48">48 hours</option>
           <option value="168">1 week</option>
       </select>
   </div>
   ```

5. **Persist History Using localStorage**
   ```javascript
   const QuestionHistory = {
       // ... existing code ...
       
       save() {
           const data = {
               questions: Array.from(this.storage.entries()),
               cooldown: this.cooldownPeriod
           };
           localStorage.setItem('questionHistory', JSON.stringify(data));
       },
       
       load() {
           const stored = localStorage.getItem('questionHistory');
           if (stored) {
               const data = JSON.parse(stored);
               this.storage = new Map(data.questions);
               this.cooldownPeriod = data.cooldown;
           }
       }
   };
   ```

**Implementation Steps:**
1. Add fingerprinting function (1 hour)
2. Build QuestionHistory manager (2 hours)
3. Integrate with QuestionEngine (1 hour)
4. Add settings UI (1 hour)
5. Implement persistence (1 hour)
6. Testing (2 hours)

**Total Estimate**: 8 hours

---

### Phase 2: On-Screen Keyboard (PRIORITY 2)

**Goal**: iPad-friendly number pad for text input questions.

**Technical Approach:**

1. **Create Keyboard Component**
   ```javascript
   const OnScreenKeyboard = {
       create(inputElement) {
           const keyboard = document.createElement('div');
           keyboard.className = 'on-screen-keyboard';
           keyboard.innerHTML = `
               <div class="keyboard-row">
                   <button class="key" data-value="7">7</button>
                   <button class="key" data-value="8">8</button>
                   <button class="key" data-value="9">9</button>
               </div>
               <div class="keyboard-row">
                   <button class="key" data-value="4">4</button>
                   <button class="key" data-value="5">5</button>
                   <button class="key" data-value="6">6</button>
               </div>
               <div class="keyboard-row">
                   <button class="key" data-value="1">1</button>
                   <button class="key" data-value="2">2</button>
                   <button class="key" data-value="3">3</button>
               </div>
               <div class="keyboard-row">
                   <button class="key special" data-value="/">÷</button>
                   <button class="key" data-value="0">0</button>
                   <button class="key special" data-value="backspace">⌫</button>
               </div>
               <div class="keyboard-row">
                   <button class="key special" data-value=".">.</button>
                   <button class="key special" data-value="-">−</button>
                   <button class="key submit-key" data-value="submit">✓ Submit</button>
               </div>
           `;
           
           this.attachHandlers(keyboard, inputElement);
           return keyboard;
       },
       
       attachHandlers(keyboard, input) {
           keyboard.addEventListener('click', (e) => {
               if (!e.target.classList.contains('key')) return;
               
               const value = e.target.dataset.value;
               
               if (value === 'backspace') {
                   input.value = input.value.slice(0, -1);
               } else if (value === 'submit') {
                   // Trigger submit event
                   input.dispatchEvent(new Event('submit'));
               } else {
                   input.value += value;
               }
               
               // Haptic feedback on iOS
               if (window.navigator.vibrate) {
                   window.navigator.vibrate(10);
               }
           });
       }
   };
   ```

2. **CSS Styling**
   ```css
   .on-screen-keyboard {
       position: fixed;
       bottom: 0;
       left: 0;
       right: 0;
       background: white;
       padding: 15px;
       box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
       display: none; /* Show only on touch devices */
   }
   
   @media (hover: none) and (pointer: coarse) {
       /* Touch device */
       .on-screen-keyboard {
           display: block;
       }
       
       /* Hide native keyboard */
       .text-input {
           caret-color: transparent;
           user-select: none;
       }
   }
   
   .keyboard-row {
       display: flex;
       gap: 10px;
       margin-bottom: 10px;
       justify-content: center;
   }
   
   .key {
       flex: 1;
       max-width: 80px;
       padding: 20px;
       font-size: 24px;
       font-weight: 600;
       border: 2px solid #667eea;
       border-radius: 12px;
       background: white;
       cursor: pointer;
       transition: all 0.1s;
       touch-action: manipulation;
   }
   
   .key:active {
       transform: scale(0.95);
       background: #667eea;
       color: white;
   }
   
   .key.special {
       background: #f0f0f0;
   }
   
   .key.submit-key {
       background: #28a745;
       color: white;
       border-color: #28a745;
       flex: 2;
   }
   ```

3. **Integration with Practice Screen**
   ```javascript
   // In PracticeScreen.showQuestion()
   if (question.type === 'text_input') {
       answerArea.innerHTML = `
           <input type="text" class="text-input" id="textAnswer" 
                  inputmode="none" readonly>
       `;
       
       const input = document.getElementById('textAnswer');
       const keyboard = OnScreenKeyboard.create(input);
       answerArea.appendChild(keyboard);
       
       input.addEventListener('submit', () => {
           this.checkAnswer(input.value);
       });
   }
   ```

**Implementation Steps:**
1. Build keyboard component (3 hours)
2. Style for touch devices (2 hours)
3. Integrate with practice screen (1 hour)
4. Add haptic feedback (30 mins)
5. Test on iPad/tablets (2 hours)

**Total Estimate**: 8.5 hours

---

### Phase 3: Auto Level-Up System (PRIORITY 3)

**Goal**: Automatically progress to next difficulty after 3 consecutive correct answers with "power-up" button.

**Technical Approach:**

1. **Add Streak Tracking**
   ```javascript
   const StreakTracker = {
       currentStreak: 0,
       powerUpAvailable: false,
       requiredStreak: 3,
       
       recordAnswer(isCorrect) {
           if (isCorrect) {
               this.currentStreak++;
               if (this.currentStreak >= this.requiredStreak) {
                   this.powerUpAvailable = true;
               }
           } else {
               this.reset();
           }
       },
       
       reset() {
           this.currentStreak = 0;
           this.powerUpAvailable = false;
       },
       
       consumePowerUp() {
           this.powerUpAvailable = false;
           this.currentStreak = 0;
       }
   };
   ```

2. **Power-Up UI Component**
   ```javascript
   const PowerUpButton = {
       show() {
           const existing = document.getElementById('powerUpBtn');
           if (existing) return;
           
           const button = document.createElement('button');
           button.id = 'powerUpBtn';
           button.className = 'power-up-btn animate-in';
           button.innerHTML = `
               <span class="power-up-icon">⚡</span>
               <span class="power-up-text">Level Up!</span>
               <span class="power-up-subtitle">3 in a row! 🔥</span>
           `;
           
           document.querySelector('.practice-header').appendChild(button);
           
           button.addEventListener('click', () => {
               this.activate();
           });
       },
       
       hide() {
           const button = document.getElementById('powerUpBtn');
           if (button) {
               button.classList.add('animate-out');
               setTimeout(() => button.remove(), 300);
           }
       },
       
       activate() {
           // Show confirmation modal
           const proceed = confirm(
               `Great job! Move to Level ${PracticeScreen.currentLevel + 1}?\n\n` +
               `Your current progress will be saved and you'll continue with harder questions.`
           );
           
           if (proceed) {
               PracticeScreen.levelUp();
               StreakTracker.consumePowerUp();
               this.hide();
           }
       }
   };
   ```

3. **Modify Practice Screen**
   ```javascript
   const PracticeScreen = {
       // ... existing code ...
       
       checkAnswer(studentAnswer) {
           const question = this.questions[this.currentIndex];
           const isCorrect = QuestionEngine.validate(question, studentAnswer);
           
           StreakTracker.recordAnswer(isCorrect);
           
           if (isCorrect) {
               this.score.correct++;
               this.showFeedback(true);
               
               // Show power-up if available
               if (StreakTracker.powerUpAvailable && this.currentLevel < 4) {
                   PowerUpButton.show();
               }
           } else {
               this.score.incorrect++;
               this.showFeedback(false, question.answer);
               PowerUpButton.hide();
           }
           
           this.updateStreakDisplay();
       },
       
       levelUp() {
           // Save current progress
           const currentProgress = {
               score: this.score,
               completedQuestions: this.currentIndex,
               questions: this.questions
           };
           
           // Increase level
           this.currentLevel++;
           
           // Generate new questions at new level
           const remainingCount = this.questions.length - this.currentIndex - 1;
           const newQuestions = QuestionEngine.generate(
               this.currentModule,
               this.currentLevel,
               remainingCount
           );
           
           // Replace remaining questions
           this.questions.splice(this.currentIndex + 1, remainingCount, ...newQuestions);
           
           // Show level-up animation
           this.showLevelUpAnimation();
       },
       
       showLevelUpAnimation() {
           const overlay = document.createElement('div');
           overlay.className = 'level-up-overlay';
           overlay.innerHTML = `
               <div class="level-up-card">
                   <div class="level-up-icon">🌟</div>
                   <h2>Level Up!</h2>
                   <p>Now at Level ${this.currentLevel}</p>
                   <div class="level-up-subtitle">Questions will be harder!</div>
               </div>
           `;
           
           document.body.appendChild(overlay);
           
           setTimeout(() => {
               overlay.classList.add('fade-out');
               setTimeout(() => overlay.remove(), 500);
           }, 2000);
       },
       
       updateStreakDisplay() {
           let display = document.getElementById('streakDisplay');
           if (!display) {
               display = document.createElement('div');
               display.id = 'streakDisplay';
               display.className = 'streak-display';
               document.querySelector('.practice-header').appendChild(display);
           }
           
           const streak = StreakTracker.currentStreak;
           display.innerHTML = `
               <div class="streak-icon">${streak >= 3 ? '🔥' : '💡'}</div>
               <div class="streak-count">${streak} in a row</div>
           `;
           
           display.className = `streak-display ${streak >= 3 ? 'hot' : ''}`;
       }
   };
   ```

4. **CSS Animations**
   ```css
   .power-up-btn {
       position: fixed;
       bottom: 20px;
       right: 20px;
       padding: 20px 30px;
       background: linear-gradient(135deg, #ffd700, #ff6b6b);
       color: white;
       border: none;
       border-radius: 50px;
       font-size: 20px;
       font-weight: bold;
       cursor: pointer;
       box-shadow: 0 10px 30px rgba(255, 107, 107, 0.5);
       z-index: 1000;
       animation: pulse 1s infinite;
   }
   
   @keyframes pulse {
       0%, 100% { transform: scale(1); }
       50% { transform: scale(1.05); }
   }
   
   .power-up-btn.animate-in {
       animation: slideInUp 0.5s ease-out, pulse 1s infinite 0.5s;
   }
   
   @keyframes slideInUp {
       from {
           transform: translateY(100px);
           opacity: 0;
       }
       to {
           transform: translateY(0);
           opacity: 1;
       }
   }
   
   .level-up-overlay {
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       background: rgba(0, 0, 0, 0.8);
       display: flex;
       align-items: center;
       justify-content: center;
       z-index: 2000;
       animation: fadeIn 0.3s;
   }
   
   .level-up-card {
       background: white;
       padding: 60px;
       border-radius: 30px;
       text-align: center;
       animation: scaleIn 0.5s ease-out;
   }
   
   .level-up-icon {
       font-size: 100px;
       margin-bottom: 20px;
       animation: rotate 1s ease-in-out;
   }
   
   @keyframes rotate {
       from { transform: rotate(0deg) scale(0); }
       to { transform: rotate(360deg) scale(1); }
   }
   
   .streak-display {
       display: flex;
       align-items: center;
       gap: 10px;
       padding: 10px 20px;
       background: #f0f0f0;
       border-radius: 20px;
       transition: all 0.3s;
   }
   
   .streak-display.hot {
       background: linear-gradient(135deg, #ff6b6b, #ffd700);
       color: white;
       transform: scale(1.1);
   }
   ```

**Implementation Steps:**
1. Build streak tracker (2 hours)
2. Create power-up button component (2 hours)
3. Implement level-up logic (3 hours)
4. Add animations (2 hours)
5. Testing and tuning (2 hours)

**Total Estimate**: 11 hours

---

### Phase 4: Enhanced Question Types (PRIORITY 4)

**Goal**: Add more interactive question formats.

**New Question Types to Add:**

1. **Drag-and-Drop Ordering**
   ```javascript
   {
       text: "Arrange these numbers from smallest to largest",
       type: "drag_order",
       items: [45, 23, 67, 12, 89],
       correctOrder: [12, 23, 45, 67, 89]
   }
   ```

2. **Select Multiple (Checkboxes)**
   ```javascript
   {
       text: "Select ALL the even numbers",
       type: "select_multiple",
       options: [12, 15, 18, 21, 24, 27],
       correctAnswers: ["12", "18", "24"]
   }
   ```

3. **True/False**
   ```javascript
   {
       text: "The number 42 has 4 tens and 2 ones",
       type: "true_false",
       answer: "true"
   }
   ```

4. **Matching Pairs**
   ```javascript
   {
       text: "Match each fraction to its decimal equivalent",
       type: "matching",
       pairs: [
           { left: "1/2", right: "0.5" },
           { left: "1/4", right: "0.25" },
           { left: "3/4", right: "0.75" }
       ]
   }
   ```

5. **Number Line Click**
   ```javascript
   {
       text: "Click where 7.5 would be on this number line",
       type: "number_line",
       range: [0, 10],
       answer: 7.5,
       tolerance: 0.2
   }
   ```

**Implementation Strategy:**

1. **Create Question Type Registry**
   ```javascript
   const QuestionTypes = {
       handlers: {
           'multiple_choice': MultipleChoiceHandler,
           'text_input': TextInputHandler,
           'drag_order': DragOrderHandler,
           'select_multiple': SelectMultipleHandler,
           'true_false': TrueFalseHandler,
           'matching': MatchingHandler,
           'number_line': NumberLineHandler
       },
       
       render(question, container) {
           const handler = this.handlers[question.type];
           if (!handler) {
               console.error(`No handler for type: ${question.type}`);
               return;
           }
           return handler.render(question, container);
       },
       
       validate(question, answer) {
           const handler = this.handlers[question.type];
           return handler.validate(question, answer);
       }
   };
   ```

2. **Implement Each Handler**
   ```javascript
   const DragOrderHandler = {
       render(question, container) {
           const shuffled = [...question.items].sort(() => Math.random() - 0.5);
           
           container.innerHTML = `
               <div class="drag-area" id="dragSource">
                   ${shuffled.map((item, i) => `
                       <div class="draggable-item" draggable="true" 
                            data-value="${item}" data-index="${i}">
                           ${item}
                       </div>
                   `).join('')}
               </div>
               <div class="drop-area" id="dropTarget">
                   ${question.items.map((_, i) => `
                       <div class="drop-zone" data-position="${i}">
                           Drop here
                       </div>
                   `).join('')}
               </div>
               <button class="submit-btn" onclick="submitDragOrder()">
                   Check Order
               </button>
           `;
           
           this.attachDragListeners();
       },
       
       attachDragListeners() {
           // Implement drag-and-drop logic
           const draggables = document.querySelectorAll('.draggable-item');
           const dropZones = document.querySelectorAll('.drop-zone');
           
           draggables.forEach(draggable => {
               draggable.addEventListener('dragstart', (e) => {
                   e.dataTransfer.setData('text/plain', e.target.dataset.value);
                   e.target.classList.add('dragging');
               });
               
               draggable.addEventListener('dragend', (e) => {
                   e.target.classList.remove('dragging');
               });
           });
           
           dropZones.forEach(zone => {
               zone.addEventListener('dragover', (e) => {
                   e.preventDefault();
                   zone.classList.add('drag-over');
               });
               
               zone.addEventListener('dragleave', () => {
                   zone.classList.remove('drag-over');
               });
               
               zone.addEventListener('drop', (e) => {
                   e.preventDefault();
                   const value = e.dataTransfer.getData('text/plain');
                   zone.textContent = value;
                   zone.dataset.value = value;
                   zone.classList.remove('drag-over');
                   zone.classList.add('filled');
               });
           });
       },
       
       validate(question, answer) {
           // answer is array of values in drop zones
           return JSON.stringify(answer) === JSON.stringify(question.correctOrder);
       }
   };
   ```

**Implementation Steps:**
1. Design question type registry (2 hours)
2. Implement drag-and-drop handler (4 hours)
3. Implement select-multiple handler (2 hours)
4. Implement true/false handler (1 hour)
5. Implement matching handler (3 hours)
6. Implement number line handler (3 hours)
7. Update question generators to use new types (3 hours)
8. Testing all types (3 hours)

**Total Estimate**: 21 hours

---

### Phase 5: Hints System (PRIORITY 5)

**Goal**: Provide progressive hints to help struggling students.

**Technical Approach:**

1. **Hint Data Structure**
   ```javascript
   // Add to question object
   {
       text: "What is 8 × 7?",
       answer: "56",
       hints: [
           {
               level: 1,
               text: "Try counting in 7s",
               type: "strategy"
           },
           {
               level: 2,
               text: "7 + 7 + 7 + 7 + 7 + 7 + 7 + 7",
               type: "breakdown"
           },
           {
               level: 3,
               text: "The answer is between 50 and 60",
               type: "range"
           }
       ]
   }
   ```

2. **Hint Manager**
   ```javascript
   const HintSystem = {
       currentHintLevel: 0,
       hintsUsed: 0,
       penaltyPerHint: 0.1, // 10% score reduction per hint
       
       reset() {
           this.currentHintLevel = 0;
       },
       
       getNextHint(question) {
           if (!question.hints || this.currentHintLevel >= question.hints.length) {
               return null;
           }
           
           const hint = question.hints[this.currentHintLevel];
           this.currentHintLevel++;
           this.hintsUsed++;
           
           return hint;
       },
       
       calculateScoreModifier() {
           return Math.max(0, 1 - (this.hintsUsed * this.penaltyPerHint));
       }
   };
   ```

3. **Hint UI Component**
   ```javascript
   const HintButton = {
       render(question) {
           if (!question.hints || question.hints.length === 0) {
               return '';
           }
           
           return `
               <button class="hint-btn" id="hintBtn" onclick="showHint()">
                   <span class="hint-icon">💡</span>
                   <span class="hint-text">Need a hint?</span>
                   <span class="hint-count">${HintSystem.currentHintLevel}/${question.hints.length} used</span>
               </button>
           `;
       },
       
       show() {
           const currentQuestion = PracticeScreen.getCurrentQuestion();
           const hint = HintSystem.getNextHint(currentQuestion);
           
           if (!hint) {
               alert('No more hints available for this question!');
               return;
           }
           
           // Display hint
           const hintDisplay = document.getElementById('hintDisplay') || 
               this.createHintDisplay();
           
           const hintCard = document.createElement('div');
           hintCard.className = `hint-card hint-${hint.type} animate-in`;
           hintCard.innerHTML = `
               <div class="hint-header">
                   <span class="hint-icon">💡</span>
                   <span class="hint-label">Hint ${HintSystem.currentHintLevel}</span>
               </div>
               <div class="hint-content">${hint.text}</div>
           `;
           
           hintDisplay.appendChild(hintCard);
           
           // Update button
           this.updateButton(currentQuestion);
       },
       
       createHintDisplay() {
           const display = document.createElement('div');
           display.id = 'hintDisplay';
           display.className = 'hint-display';
           document.querySelector('.question-card').appendChild(display);
           return display;
       },
       
       updateButton(question) {
           const btn = document.getElementById('hintBtn');
           if (btn) {
               const remaining = question.hints.length - HintSystem.currentHintLevel;
               btn.querySelector('.hint-count').textContent = 
                   `${HintSystem.currentHintLevel}/${question.hints.length} used`;
               
               if (remaining === 0) {
                   btn.disabled = true;
                   btn.classList.add('disabled');
               }
           }
       }
   };
   ```

4. **Generate Hints Automatically**
   ```javascript
   function generateHintsForQuestion(question, module, level) {
       const hints = [];
       
       if (module === 'counting') {
           hints.push({
               level: 1,
               text: `Look at the pattern. What number are we adding each time?`,
               type: 'strategy'
           });
           
           if (level <= 2) {
               hints.push({
                   level: 2,
                   text: `Try using your fingers or drawing the sequence`,
                   type: 'tool'
               });
           }
       } else if (module === 'bonds') {
           const total = extractTotal(question.text);
           hints.push({
               level: 1,
               text: `Think about number bonds to ${total}`,
               type: 'strategy'
           });
           hints.push({
               level: 2,
               text: `Draw ${total} circles and cross out some to find the answer`,
               type: 'visual'
           });
       } else if (module === 'multiply') {
           hints.push({
               level: 1,
               text: `Can you use the times table you know?`,
               type: 'strategy'
           });
           hints.push({
               level: 2,
               text: `Try repeated addition or skip counting`,
               type: 'alternative'
           });
       }
       
       // Always add a range hint as the last resort
       if (question.type === 'text_input' && !isNaN(question.answer)) {
           const answer = parseInt(question.answer);
           const range = Math.ceil(answer / 10) * 10;
           hints.push({
               level: hints.length + 1,
               text: `The answer is between ${range - 10} and ${range}`,
               type: 'range'
           });
       }
       
       return hints;
   }
   ```

5. **Update Scoring**
   ```javascript
   // In Results Screen
   const finalScore = {
       correct: this.score.correct,
       incorrect: this.score.incorrect,
       hintsUsed: HintSystem.hintsUsed,
       adjustedScore: Math.round(
           this.score.correct * HintSystem.calculateScoreModifier()
       )
   };
   ```

**Implementation Steps:**
1. Design hint data structure (1 hour)
2. Build hint manager (2 hours)
3. Create hint UI components (3 hours)
4. Implement auto-hint generation (4 hours)
5. Integrate with scoring (1 hour)
6. Add hint animations (2 hours)
7. Testing (2 hours)

**Total Estimate**: 15 hours

---

### Phase 6: Progress Persistence (PRIORITY 6)

**Goal**: Save student progress without complex database.

**Technical Approach: localStorage + JSON**

1. **Progress Data Structure**
   ```javascript
   const ProgressData = {
       studentId: 'student_001', // Simple identifier
       sessions: [
           {
               sessionId: 'session_timestamp',
               date: '2025-10-09T14:30:00',
               module: 'counting',
               level: 2,
               questionsAttempted: 10,
               correct: 8,
               incorrect: 2,
               hintsUsed: 3,
               timeSpent: 450, // seconds
               questions: [...], // Full question log
               leveledUp: false
           }
       ],
       stats: {
           totalSessions: 15,
           totalQuestions: 150,
           totalCorrect: 120,
           averageAccuracy: 0.80,
           favoriteModule: 'counting',
           currentLevelByModule: {
               counting: 3,
               bonds: 2,
               multiply: 2,
               fractions: 1
           }
       }
   };
   ```

2. **Storage Manager**
   ```javascript
   const StorageManager = {
       STORAGE_KEY: 'mathsPractice',
       
       init(studentId = 'default_student') {
           this.studentId = studentId;
           this.loadProgress();
       },
       
       loadProgress() {
           const stored = localStorage.getItem(this.STORAGE_KEY);
           if (stored) {
               this.data = JSON.parse(stored);
           } else {
               this.data = this.createNewProfile();
           }
           return this.data;
       },
       
       createNewProfile() {
           return {
               studentId: this.studentId,
               created: new Date().toISOString(),
               sessions: [],
               stats: {
                   totalSessions: 0,
                   totalQuestions: 0,
                   totalCorrect: 0,
                   averageAccuracy: 0,
                   currentLevelByModule: {
                       counting: 1,
                       bonds: 1,
                       multiply: 1,
                       fractions: 1
                   }
               }
           };
       },
       
       saveSession(sessionData) {
           this.data.sessions.push({
               ...sessionData,
               sessionId: `session_${Date.now()}`,
               date: new Date().toISOString()
           });
           
           this.updateStats(sessionData);
           this.persist();
       },
       
       updateStats(session) {
           const stats = this.data.stats;
           
           stats.totalSessions++;
           stats.totalQuestions += session.questionsAttempted;
           stats.totalCorrect += session.correct;
           stats.averageAccuracy = stats.totalCorrect / stats.totalQuestions;
           
           // Update level if progressed
           if (session.leveledUp) {
               stats.currentLevelByModule[session.module] = session.level;
           }
       },
       
       persist() {
           try {
               localStorage.setItem(
                   this.STORAGE_KEY,
                   JSON.stringify(this.data)
               );
               return true;
           } catch (e) {
               console.error('Failed to save progress:', e);
               return false;
           }
       },
       
       getRecommendedLevel(module) {
           return this.data.stats.currentLevelByModule[module] || 1;
       },
       
       getRecentSessions(count = 5) {
           return this.data.sessions
               .slice(-count)
               .reverse();
       },
       
       exportData() {
           return JSON.stringify(this.data, null, 2);
       },
       
       importData(jsonString) {
           try {
               this.data = JSON.parse(jsonString);
               this.persist();
               return true;
           } catch (e) {
               console.error('Failed to import data:', e);
               return false;
           }
       },
       
       clearAll() {
           if (confirm('This will delete all progress. Are you sure?')) {
               localStorage.removeItem(this.STORAGE_KEY);
               this.data = this.createNewProfile();
               return true;
           }
           return false;
       }
   };
   ```

3. **Integration Points**
   ```javascript
   // In PracticeScreen
   const PracticeScreen = {
       init(questions, module, level) {
           this.startTime = Date.now();
           // ... existing code ...
       },
       
       finish() {
           const endTime = Date.now();
           const sessionData = {
               module: this.currentModule,
               level: this.currentLevel,
               questionsAttempted: this.questions.length,
               correct: this.score.correct,
               incorrect: this.score.incorrect,
               hintsUsed: HintSystem.hintsUsed,
               timeSpent: Math.floor((endTime - this.startTime) / 1000),
               questions: this.questions.map(q => ({
                   text: q.text,
                   answer: q.answer,
                   studentAnswer: q.studentAnswer,
                   correct: q.correct,
                   hintsUsed: q.hintsUsed
               })),
               leveledUp: this.didLevelUp
           };
           
           StorageManager.saveSession(sessionData);
           ResultsScreen.init(sessionData);
       }
   };
   
   // In Setup Screen
   const SetupScreen = {
       init() {
           StorageManager.init();
           this.showRecentProgress();
           this.setRecommendedLevels();
       },
       
       showRecentProgress() {
           const recent = StorageManager.getRecentSessions(3);
           // Display recent sessions in UI
       },
       
       setRecommendedLevels() {
           Object.keys(MODULES).forEach(moduleId => {
               const recommended = StorageManager.getRecommendedLevel(moduleId);
               // Pre-select recommended level in UI
           });
       }
   };
   ```

4. **Progress Display Component**
   ```javascript
   const ProgressDisplay = {
       render() {
           const stats = StorageManager.data.stats;
           const recent = StorageManager.getRecentSessions(5);
           
           return `
               <div class="progress-panel">
                   <h3>Your Progress</h3>
                   <div class="stats-grid">
                       <div class="stat-card">
                           <div class="stat-value">${stats.totalSessions}</div>
                           <div class="stat-label">Sessions</div>
                       </div>
                       <div class="stat-card">
                           <div class="stat-value">${stats.totalQuestions}</div>
                           <div class="stat-label">Questions</div>
                       </div>
                       <div class="stat-card">
                           <div class="stat-value">${Math.round(stats.averageAccuracy * 100)}%</div>
                           <div class="stat-label">Accuracy</div>
                       </div>
                   </div>
                   
                   <h4>Your Levels</h4>
                   <div class="levels-grid">
                       ${Object.entries(stats.currentLevelByModule).map(([module, level]) => `
                           <div class="level-badge">
                               <span class="module-name">${MODULES[module].name}</span>
                               <span class="level-indicator">Level ${level}</span>
                           </div>
                       `).join('')}
                   </div>
                   
                   <h4>Recent Sessions</h4>
                   <div class="recent-sessions">
                       ${recent.map(session => `
                           <div class="session-card">
                               <div class="session-date">${new Date(session.date).toLocaleDateString()}</div>
                               <div class="session-info">
                                   ${MODULES[session.module].name} - Level ${session.level}
                               </div>
                               <div class="session-score">
                                   ${session.correct}/${session.questionsAttempted} correct
                               </div>
                           </div>
                       `).join('')}
                   </div>
                   
                   <div class="progress-actions">
                       <button onclick="StorageManager.exportData()">📥 Export Progress</button>
                       <button onclick="importProgress()">📤 Import Progress</button>
                   </div>
               </div>
           `;
       }
   };
   ```

**Implementation Steps:**
1. Design data structure (1 hour)
2. Build storage manager (3 hours)
3. Integrate with practice flow (2 hours)
4. Create progress display (3 hours)
5. Add export/import functionality (2 hours)
6. Testing (2 hours)

**Total Estimate**: 13 hours

---

### Phase 7: Teacher Dashboard (PRIORITY 7)

**Goal**: Simple view for teachers to see class progress without authentication.

**Technical Approach: JSON Files + Simple Aggregation**

1. **Data Collection Strategy**
   ```javascript
   // When student completes session
   const SessionReporter = {
       async reportSession(sessionData) {
           // Generate shareable session report
           const report = {
               studentId: sessionData.studentId || 'anonymous',
               timestamp: Date.now(),
               ...sessionData
           };
           
           // Option 1: Download JSON file
           this.downloadReport(report);
           
           // Option 2: Copy to clipboard for teacher
           this.copyToClipboard(report);
           
           // Option 3: Simple PHP endpoint (if available)
           // await this.sendToServer(report);
       },
       
       downloadReport(report) {
           const blob = new Blob([JSON.stringify(report, null, 2)], 
               { type: 'application/json' });
           const url = URL.createObjectURL(blob);
           const a = document.createElement('a');
           a.href = url;
           a.download = `session_${report.studentId}_${Date.now()}.json`;
           a.click();
       },
       
       copyToClipboard(report) {
           const text = this.formatForClipboard(report);
           navigator.clipboard.writeText(text);
           alert('Session report copied! Share with your teacher.');
       },
       
       formatForClipboard(report) {
           return `
   Session Report - ${new Date(report.timestamp).toLocaleString()}
   Student: ${report.studentId}
   Module: ${report.module}
   Level: ${report.level}
   Score: ${report.correct}/${report.questionsAttempted} (${Math.round(report.correct/report.questionsAttempted * 100)}%)
   Time: ${Math.floor(report.timeSpent / 60)} minutes
   Hints used: ${report.hintsUsed}
           `.trim();
       }
   };
   ```

2. **Teacher Dashboard (Separate Page)**
   ```html
   <!-- teacher-dashboard.html -->
   <!DOCTYPE html>
   <html>
   <head>
       <title>Teacher Dashboard</title>
   </head>
   <body>
       <div class="dashboard">
           <h1>Class Progress Dashboard</h1>
           
           <div class="import-section">
               <h2>Import Session Data</h2>
               <input type="file" id="fileInput" multiple accept=".json">
               <button onclick="loadFiles()">Load Sessions</button>
           </div>
           
           <div id="dashboardContent"></div>
       </div>
       
       <script src="teacher-dashboard.js"></script>
   </body>
   </html>
   ```

3. **Dashboard Logic**
   ```javascript
   // teacher-dashboard.js
   const TeacherDashboard = {
       sessions: [],
       
       async loadFiles() {
           const fileInput = document.getElementById('fileInput');
           const files = fileInput.files;
           
           for (const file of files) {
               const content = await file.text();
               try {
                   const session = JSON.parse(content);
                   this.sessions.push(session);
               } catch (e) {
                   console.error('Invalid session file:', file.name);
               }
           }
           
           this.render();
       },
       
       render() {
           const container = document.getElementById('dashboardContent');
           
           // Aggregate data
           const stats = this.calculateStats();
           const byStudent = this.groupByStudent();
           const byModule = this.groupByModule();
           
           container.innerHTML = `
               <div class="stats-overview">
                   <h2>Class Overview</h2>
                   <div class="stat-cards">
                       <div class="stat-card">
                           <div class="stat-value">${stats.totalStudents}</div>
                           <div class="stat-label">Students</div>
                       </div>
                       <div class="stat-card">
                           <div class="stat-value">${stats.totalSessions}</div>
                           <div class="stat-label">Sessions</div>
                       </div>
                       <div class="stat-card">
                           <div class="stat-value">${stats.averageAccuracy}%</div>
                           <div class="stat-label">Class Average</div>
                       </div>
                       <div class="stat-card">
                           <div class="stat-value">${stats.totalQuestions}</div>
                           <div class="stat-label">Questions Answered</div>
                       </div>
                   </div>
               </div>
               
               <div class="student-breakdown">
                   <h2>Student Progress</h2>
                   <table class="student-table">
                       <thead>
                           <tr>
                               <th>Student</th>
                               <th>Sessions</th>
                               <th>Questions</th>
                               <th>Accuracy</th>
                               <th>Current Levels</th>
                               <th>Last Active</th>
                           </tr>
                       </thead>
                       <tbody>
                           ${Object.entries(byStudent).map(([student, data]) => `
                               <tr>
                                   <td>${student}</td>
                                   <td>${data.sessions.length}</td>
                                   <td>${data.totalQuestions}</td>
                                   <td>${Math.round(data.accuracy * 100)}%</td>
                                   <td>${this.formatLevels(data.levels)}</td>
                                   <td>${this.formatDate(data.lastActive)}</td>
                               </tr>
                           `).join('')}
                       </tbody>
                   </table>
               </div>
               
               <div class="module-breakdown">
                   <h2>Progress by Topic</h2>
                   ${Object.entries(byModule).map(([module, data]) => `
                       <div class="module-card">
                           <h3>${MODULES[module].name}</h3>
                           <div class="module-stats">
                               <div>Sessions: ${data.sessions.length}</div>
                               <div>Average Accuracy: ${Math.round(data.accuracy * 100)}%</div>
                               <div>Most Common Level: ${data.mostCommonLevel}</div>
                           </div>
                       </div>
                   `).join('')}
               </div>
           `;
       },
       
       calculateStats() {
           const students = new Set(this.sessions.map(s => s.studentId));
           const totalQuestions = this.sessions.reduce((sum, s) => 
               sum + s.questionsAttempted, 0);
           const totalCorrect = this.sessions.reduce((sum, s) => 
               sum + s.correct, 0);
           
           return {
               totalStudents: students.size,
               totalSessions: this.sessions.length,
               totalQuestions,
               averageAccuracy: Math.round((totalCorrect / totalQuestions) * 100)
           };
       },
       
       groupByStudent() {
           const grouped = {};
           
           this.sessions.forEach(session => {
               const student = session.studentId;
               if (!grouped[student]) {
                   grouped[student] = {
                       sessions: [],
                       totalQuestions: 0,
                       totalCorrect: 0,
                       levels: {},
                       lastActive: 0
                   };
               }
               
               const data = grouped[student];
               data.sessions.push(session);
               data.totalQuestions += session.questionsAttempted;
               data.totalCorrect += session.correct;
               data.levels[session.module] = Math.max(
                   data.levels[session.module] || 0,
                   session.level
               );
               data.lastActive = Math.max(data.lastActive, session.timestamp);
           });
           
           // Calculate accuracy for each student
           Object.values(grouped).forEach(data => {
               data.accuracy = data.totalCorrect / data.totalQuestions;
           });
           
           return grouped;
       },
       
       groupByModule() {
           const grouped = {};
           
           this.sessions.forEach(session => {
               if (!grouped[session.module]) {
                   grouped[session.module] = {
                       sessions: [],
                       totalCorrect: 0,
                       totalQuestions: 0,
                       levels: []
                   };
               }
               
               const data = grouped[session.module];
               data.sessions.push(session);
               data.totalCorrect += session.correct;
               data.totalQuestions += session.questionsAttempted;
               data.levels.push(session.level);
           });
           
           // Calculate stats
           Object.values(grouped).forEach(data => {
               data.accuracy = data.totalCorrect / data.totalQuestions;
               data.mostCommonLevel = this.mode(data.levels);
           });
           
           return grouped;
       },
       
       mode(arr) {
           const counts = {};
           arr.forEach(val => counts[val] = (counts[val] || 0) + 1);
           return Object.keys(counts).reduce((a, b) => 
               counts[a] > counts[b] ? a : b);
       },
       
       formatLevels(levels) {
           return Object.entries(levels)
               .map(([module, level]) => `${module[0].toUpperCase()}${level}`)
               .join(', ');
       },
       
       formatDate(timestamp) {
           return new Date(timestamp).toLocaleDateString();
       },
       
       exportReport() {
           const report = {
               generated: new Date().toISOString(),
               classStats: this.calculateStats(),
               studentData: this.groupByStudent(),
               moduleData: this.groupByModule()
           };
           
           const blob = new Blob([JSON.stringify(report, null, 2)], 
               { type: 'application/json' });
           const url = URL.createObjectURL(blob);
           const a = document.createElement('a');
           a.href = url;
           a.download = `class_report_${Date.now()}.json`;
           a.click();
       }
   };
   ```

4. **Optional: Simple Server Collection**
   ```php
   <?php
   // save-session.php (if you want automatic collection)
   header('Content-Type: application/json');
   
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
       $data = json_decode(file_get_contents('php://input'), true);
       
       if ($data) {
           $filename = 'sessions/session_' . time() . '_' . uniqid() . '.json';
           file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
           
           echo json_encode(['success' => true]);
       } else {
           echo json_encode(['success' => false, 'error' => 'Invalid data']);
       }
   }
   ?>
   ```

**Implementation Steps:**
1. Build session reporter (2 hours)
2. Create teacher dashboard HTML (1 hour)
3. Implement aggregation logic (4 hours)
4. Build dashboard UI (3 hours)
5. Add export functionality (1 hour)
6. Optional: PHP endpoint (2 hours)
7. Testing (2 hours)

**Total Estimate**: 15 hours (13 hours without server)

---

## Technical Specifications

### Browser Compatibility
- **Target**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Mobile**: iOS 14+, Android 10+
- **Required APIs**:
  - localStorage
  - Drag and Drop API
  - Clipboard API (optional)
  - File API
  - Touch Events

### Performance Requirements
- Question generation: < 50ms per question
- UI interactions: < 100ms response time
- Smooth animations: 60fps
- Maximum localStorage usage: 5MB

### File Size Targets
- Main HTML/CSS/JS: < 500KB total
- Per-module scripts: < 50KB each
- Session data: < 10KB per session

### Code Standards
- ES6+ JavaScript
- Semantic HTML5
- BEM CSS methodology
- JSDoc comments for all functions
- 2-space indentation
- Max line length: 100 characters

---

## Deployment Guide

### Development Setup

1. **Clone/Download files**
2. **Open in browser**: Simply open `index.html`
3. **For modular version**: Use local server
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

### Production Deployment

**Option 1: Static Hosting (Easiest)**
1. Upload all files to:
   - GitHub Pages
   - Netlify
   - Vercel
   - Your school's web server
2. Access via URL

**Option 2: Embedded in LMS**
1. Upload to Google Classroom as web app
2. Embed in Moodle/Canvas using iframe
3. Link from school website

**Option 3: Offline/iPad**
1. Package as PWA (Progressive Web App)
2. Students can "Add to Home Screen"
3. Works offline after first load

### Testing Checklist Before Deployment
- [ ] All modules generate questions correctly
- [ ] All difficulty levels work
- [ ] All question types render properly
- [ ] Answer validation works
- [ ] Progress saves correctly
- [ ] Works on iPad/tablets
- [ ] Works on phones (if supported)
- [ ] localStorage limits not exceeded
- [ ] No console errors
- [ ] Smooth performance

---

## Summary Timeline

| Phase | Feature | Hours | Priority |
|-------|---------|-------|----------|
| 1 | Question Deduplication | 8 | HIGH |
| 2 | On-Screen Keyboard | 8.5 | HIGH |
| 3 | Auto Level-Up | 11 | HIGH |
| 4 | More Question Types | 21 | MEDIUM |
| 5 | Hints System | 15 | MEDIUM |
| 6 | Progress Persistence | 13 | MEDIUM |
| 7 | Teacher Dashboard | 13 | LOW |
| **Total** | | **89.5 hours** | |

**Recommended Sprint Schedule:**
- **Sprint 1 (Week 1-2)**: Phases 1-3 (27.5 hours)
- **Sprint 2 (Week 3-4)**: Phase 4 (21 hours)
- **Sprint 3 (Week 5-6)**: Phases 5-6 (28 hours)
- **Sprint 4 (Week 7)**: Phase 7 (13 hours)

**Total Project Duration**: ~7-8 weeks

---

## Questions & Support

**For Engineering Team:**
- Review this document thoroughly
- Set up development environment
- Start with building current system
- Progress through phases in order
- Test extensively on target devices (iPads)

**Key Contact Points:**
- Curriculum questions: Review `docs/curriculum-guide.md`
- Template questions: Review `docs/template-guide.md`
- Technical issues: Check browser console
- Performance issues: Review storage usage

**Next Steps:**
1. Set up development environment
2. Build current system (Phases 1-3 of original build)
3. Deploy MVP for testing
4. Begin Phase 1 development
5. Iterate based on user feedback