# LLM Build Prompt: UK Maths Practice Application

## Context

I'm building an interactive mathematics practice application for UK Key Stage 1 & 2 students (ages 5-11). The system uses a **parameter-based architecture** to generate differentiated questions at 4 difficulty levels across multiple curriculum topics.

I have three reference artifacts that demonstrate the complete system:

1. **Engineering Documentation** - Complete technical specification with architecture, build guide, and development roadmap
2. **Interactive Student Practice System** - Working student-facing application (HTML/CSS/JS)
3. **Curriculum Parameter System MVP** - Working admin/question generation system

## What I Need You To Build

I need you to help me build a **production-ready version** of this application by:

1. **Starting with the current working system** (as demonstrated in the artifacts)
2. **Refactoring it into a modular, maintainable structure**
3. **Implementing the priority features** one at a time
4. **Following the three-component architecture**: Curriculum → Templates → Delivery

## System Requirements

### Core Principles (CRITICAL)
- ✅ Pure HTML/CSS/JavaScript (no frameworks required, but can suggest if beneficial)
- ✅ No complex databases (use localStorage for client-side persistence)
- ✅ No authentication system (keep it simple)
- ✅ Works offline after first load
- ✅ Optimized for iPad/tablet use
- ✅ Must work in modern browsers (Chrome/Safari/Firefox/Edge)

### Three-Component Architecture

```
CURRICULUM PARAMETERS (JSON data structure)
    ↓
QUESTION TEMPLATES (Generation algorithms)
    ↓
DELIVERY APPLICATION (Student interface)
```

## Step-by-Step Build Instructions

### Phase 0: Foundation Setup

**Task**: Create the modular file structure and set up the base application.

**Deliverables**:
1. Project folder structure (as specified in Engineering Documentation)
2. Separation of concerns: curriculum data, question generators, UI components
3. Base HTML with three main screens: Setup, Practice, Results
4. CSS framework for responsive design
5. Core JavaScript architecture

**Reference**: See "Building the Current System" section in Engineering Documentation

**Questions to answer**:
- Should we use ES6 modules or keep script includes?
- What's the best way to organize the curriculum data?
- How should we structure the question generator registry?

---

### Phase 1: Implement Question Deduplication (PRIORITY 1)

**Goal**: Prevent students from seeing the same question twice within a configurable time period.

**Requirements**:
- Generate unique "fingerprint" for each question based on content
- Track recently seen questions in localStorage
- Add configurable cooldown period (default: 24 hours)
- Settings UI to adjust cooldown (1 hour, 4 hours, 12 hours, 24 hours, 48 hours, 1 week)
- When generating questions, skip any seen within cooldown period
- Implement cleanup routine to remove old entries
- Persist history across sessions

**Technical Approach**: See detailed implementation in Engineering Documentation Phase 1

**Deliverables**:
1. `QuestionHistory` class/module with methods:
   - `hasSeenRecently(fingerprint)` → boolean
   - `markAsSeen(fingerprint)` → void
   - `setCooldown(hours)` → void
   - `cleanup()` → void
   - `save()` / `load()` → persistence
2. Modified `QuestionEngine.generate()` to check history
3. Settings panel UI component
4. Unit tests (if applicable)

**Validation**: 
- Generate 20 questions, note which appear
- Immediately generate 20 more → should be completely different
- Wait until after cooldown → previous questions can reappear

---

### Phase 2: On-Screen Keyboard (PRIORITY 2)

**Goal**: Add iPad-friendly calculator-style keyboard for text input questions.

**Requirements**:
- Calculator-style numpad layout (3x4 grid + function keys)
- Keys: 0-9, decimal point, minus sign, backspace, submit
- Only appears on touch devices (detect with `@media (hover: none)`)
- Haptic feedback on key press (if supported)
- Fixed position at bottom of screen
- Large touch-friendly buttons (min 44px × 44px)
- Prevent native keyboard from appearing on touch devices
- Submit button integrated into keyboard
- Visual feedback on key press

**Layout**:
```
[7] [8] [9]
[4] [5] [6]
[1] [2] [3]
[÷] [0] [⌫]
[.] [−] [✓ Submit]
```

**Technical Approach**: See detailed implementation in Engineering Documentation Phase 2

**Deliverables**:
1. `OnScreenKeyboard` component with methods:
   - `create(inputElement)` → returns keyboard DOM element
   - `attachHandlers(keyboard, input)` → event listeners
   - `show()` / `hide()` → visibility controls
2. CSS for keyboard styling and animations
3. Media queries to detect touch devices
4. Integration with Practice Screen for text_input questions

**Validation**:
- Test on iPad/tablet - keyboard appears automatically
- Test on desktop - native input works, no keyboard shown
- All keys work correctly
- Submit button triggers answer validation
- Backspace works
- Decimal and minus sign insert correctly

---

### Phase 3: Auto Level-Up System (PRIORITY 3)

**Goal**: Automatically offer progression to next difficulty after 3 consecutive correct answers.

**Requirements**:
- Track consecutive correct answers (streak)
- Reset streak on any incorrect answer
- After 3 in a row, show animated "Power-Up" button
- Button appears with slide-up animation
- Button pulses to draw attention
- On click, show confirmation dialog
- If accepted:
  - Increase difficulty level by 1
  - Save current progress
  - Generate new questions at new level
  - Replace remaining questions in queue
  - Show celebration animation
  - Continue practice session seamlessly
- If declined, hide button and continue at current level
- Streak display shows current consecutive correct count
- Power-up only available if not already at max level (Level 4)

**Visual Elements**:
- Streak counter badge (🔥 icon when hot streak)
- Floating power-up button (⚡ icon, gold gradient)
- Level-up overlay animation (🌟 icon, full-screen celebration)

**Technical Approach**: See detailed implementation in Engineering Documentation Phase 3

**Deliverables**:
1. `StreakTracker` module with:
   - `recordAnswer(isCorrect)` → void
   - `reset()` → void
   - `consumePowerUp()` → void
   - `currentStreak` property
   - `powerUpAvailable` property
2. `PowerUpButton` component with show/hide/activate methods
3. Modified `PracticeScreen.checkAnswer()` to track streaks
4. `PracticeScreen.levelUp()` method to handle transition
5. CSS animations for button, streak display, and level-up overlay
6. Streak display UI component

**Validation**:
- Get 2 correct → no button appears
- Get 3 correct → button appears with animation
- Get 1 wrong → streak resets, button disappears
- Click button → shows confirmation, increases level, continues session
- At Level 4 → button never appears even with streak

---

### Phase 4: Enhanced Question Types (PRIORITY 4)

**Goal**: Add interactive question formats beyond multiple choice and text input.

**New Question Types Required**:

1. **Drag-and-Drop Ordering**
   - Drag items to arrange in correct sequence
   - Visual feedback during drag
   - Drop zones highlight on hover

2. **Select Multiple (Checkboxes)**
   - Click all correct answers
   - Visual selection state
   - Submit button to check answers

3. **True/False**
   - Large TRUE/FALSE buttons
   - Single click to answer

4. **Matching Pairs**
   - Two columns of items
   - Drag from left to right to match
   - Or click-based matching

5. **Number Line Click**
   - Visual number line with range
   - Click to place answer
   - Tolerance for near-correct answers

**Technical Approach**: See detailed implementation in Engineering Documentation Phase 4

**Deliverables**:
1. `QuestionTypes` registry system
2. Handler for each question type:
   - `DragOrderHandler`
   - `SelectMultipleHandler`
   - `TrueFalseHandler`
   - `MatchingHandler`
   - `NumberLineHandler`
3. Each handler implements:
   - `render(question, container)` → void
   - `validate(question, answer)` → boolean
4. Update question generators to produce these new types
5. CSS styling for each interactive element
6. Touch-optimized interactions

**Validation**:
- Each question type renders correctly
- All interactions work on both desktop and touch
- Validation logic is accurate
- Visual feedback is clear
- Animations are smooth

---

### Phase 5: Hints System (PRIORITY 5)

**Goal**: Provide progressive hints to help struggling students without giving away the answer.

**Requirements**:
- Each question can have 0-3 hints
- Hints unlock progressively (level 1 → 2 → 3)
- Hint button shows available/used count
- Each hint revealed stays visible
- Hints have types: strategy, visual, breakdown, range
- Using hints reduces score by 10% per hint used
- Auto-generate hints based on question type and difficulty
- Hints should guide thinking, not give answers directly

**Hint Progression Example**:
- Hint 1: "Think about what operation you need"
- Hint 2: "Try breaking the number into parts"
- Hint 3: "The answer is between 40 and 50"

**Technical Approach**: See detailed implementation in Engineering Documentation Phase 5

**Deliverables**:
1. `HintSystem` module with:
   - `getNextHint(question)` → hint object or null
   - `reset()` → void
   - `calculateScoreModifier()` → float
2. `HintButton` component with render/show/update methods
3. Hint generation function: `generateHintsForQuestion(question, module, level)`
4. Hint display area in question card
5. Modified scoring to account for hints used
6. CSS styling for hint cards and button

**Validation**:
- Hints unlock one at a time
- Button updates count correctly
- Hints are helpful but not answers
- Score reduction applies correctly
- Results screen shows hints used
- Auto-generated hints make sense for each question type

---

### Phase 6: Progress Persistence (PRIORITY 6)

**Goal**: Save student progress locally without requiring a database or login.

**Requirements**:
- Save all practice sessions to localStorage
- Track per-student statistics
- Remember current level for each module
- Show recent session history (last 5)
- Display overall statistics (total sessions, questions, accuracy)
- Ability to export progress as JSON file
- Ability to import progress from JSON file
- Optional: simple student identifier (name/number)
- Recommend appropriate level based on history
- Progress persists across browser sessions
- Automatic cleanup of old data (> 30 days)

**Data to Store**:
```javascript
{
  studentId: string,
  sessions: [
    {
      date: timestamp,
      module: string,
      level: number,
      questionsAttempted: number,
      correct: number,
      incorrect: number,
      hintsUsed: number,
      timeSpent: seconds,
      leveledUp: boolean
    }
  ],
  stats: {
    totalSessions: number,
    totalQuestions: number,
    averageAccuracy: float,
    currentLevelByModule: {...}
  }
}
```

**Technical Approach**: See detailed implementation in Engineering Documentation Phase 6

**Deliverables**:
1. `StorageManager` module with:
   - `init(studentId)` → void
   - `loadProgress()` → data object
   - `saveSession(sessionData)` → void
   - `exportData()` → JSON string
   - `importData(jsonString)` → boolean
   - `getRecommendedLevel(module)` → number
2. `ProgressDisplay` component showing stats and history
3. Integration with setup screen (show recommendations)
4. Integration with practice screen (save on completion)
5. Export/import UI in setup screen
6. Optional: student identification input

**Validation**:
- Complete session → data saves automatically
- Close and reopen browser → progress loads
- Export → receive JSON file
- Import file → progress restores correctly
- Recommended levels reflect performance
- Statistics calculate accurately

---

### Phase 7: Teacher Dashboard (PRIORITY 7)

**Goal**: Simple teacher view to see class progress without authentication system.

**Requirements**:
- Separate HTML page (teacher-dashboard.html)
- File upload to import student session JSON files
- Aggregate multiple students' data
- Display class statistics
- Display per-student progress
- Display per-module performance
- Export combined class report
- No database or server required
- Works entirely in browser

**Dashboard Views**:
1. **Class Overview**
   - Total students
   - Total sessions
   - Average accuracy
   - Total questions answered

2. **Student Table**
   - Each student's sessions, questions, accuracy
   - Current level per module
   - Last activity date

3. **Module Performance**
   - Most/least practiced topics
   - Average accuracy per topic
   - Common difficulty levels

**Technical Approach**: See detailed implementation in Engineering Documentation Phase 7

**Deliverables**:
1. `teacher-dashboard.html` - separate page
2. `TeacherDashboard` module with:
   - `loadFiles()` → parse uploaded JSON files
   - `calculateStats()` → aggregate data
   - `groupByStudent()` → student breakdown
   - `groupByModule()` → module breakdown
   - `render()` → display all views
   - `exportReport()` → combined class report
3. Session reporter in main app:
   - Download session JSON after completion
   - Or copy to clipboard
4. Dashboard UI with tables and charts
5. CSS styling for dashboard

**Validation**:
- Upload 3-5 session files → dashboard populates
- All statistics calculate correctly
- Student table shows accurate data
- Module breakdown correct
- Export creates valid combined report
- Works without internet connection

---

## Current Working Code Reference

You have access to working implementations in the artifacts saved in docs:

### From "Interactive Student Practice System":
- Complete student-facing UI
- Question rendering for multiple choice and text input
- Answer validation
- Progress tracking during session
- Results screen with statistics
- Setup screen with module/level selection

### From "Curriculum Parameter System MVP":
- Parameter-based question generation
- Question variety implementation
- Module definitions with difficulty levels
- Generation algorithms for 6 different modules
- Question type variations

### From "Engineering Documentation":
- Complete architecture explanation
- Code examples for all 7 priority features
- Implementation patterns
- Testing guidelines

---

## Development Approach

### For Each Phase:

1. **Review Requirements** - Understand what needs to be built
2. **Study Reference Code** - Look at existing implementations in artifacts
3. **Design Solution** - Plan the architecture/approach
4. **Implement** - Write the code
5. **Test** - Validate all requirements met
6. **Document** - Add comments and update docs
7. **Integrate** - Ensure works with existing system

### Code Quality Standards:

- ✅ Use ES6+ features (const/let, arrow functions, modules)
- ✅ Write semantic HTML5
- ✅ Follow BEM methodology for CSS
- ✅ Add JSDoc comments for all functions
- ✅ Keep functions small and focused
- ✅ Use meaningful variable names
- ✅ Handle errors gracefully
- ✅ Test on multiple browsers
- ✅ Optimize for performance

### Testing Each Feature:

- Functional testing (does it work?)
- Edge case testing (what breaks it?)
- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Mobile testing (iPad, tablets)
- Performance testing (is it fast enough?)
- Usability testing (is it intuitive?)

---

## Questions I Need You To Answer

As you build, please provide:

1. **Architecture Decisions**
   - Should we use ES6 modules or a different approach?
   - What's the best way to structure the codebase?
   - Any recommended libraries/tools?

2. **Implementation Choices**
   - When you have multiple ways to implement something, explain trade-offs
   - Recommend the best approach for our requirements
   - Flag any potential issues or limitations

3. **Code Quality**
   - Point out any code smells or anti-patterns
   - Suggest improvements to maintainability
   - Recommend refactoring opportunities

4. **Testing Strategy**
   - What should be tested?
   - How to test effectively?
   - Any automated testing recommendations?

5. **Performance Optimization**
   - Any bottlenecks?
   - How to optimize?
   - Recommended performance budgets?

---

## Output Format

For each phase you complete, provide:

### 1. Code Files
```javascript
// Complete, working code
// With comments explaining key decisions
// Ready to copy-paste or integrate
```

### 2. Implementation Notes
- What you built
- Why you made certain choices
- Any deviations from the spec and why
- Known limitations or issues

### 3. Testing Guide
- How to test this feature
- What to look for
- Edge cases to verify

### 4. Integration Instructions
- How to integrate with existing code
- What files to modify
- Any dependencies or prerequisites

### 5. Next Steps
- What should be done next
- Any blockers or decisions needed
- Recommendations for improvement

---

## Getting Started

**Start with Phase 0** - Set up the foundation.

Then proceed through Phases 1-7 in order, or tell me which specific phase you want to tackle first.

**Questions to guide you**:
- Have you reviewed all three reference artifacts?
- Do you understand the three-component architecture?
- Are the requirements for Phase 0 clear?
- Do you need any clarification before starting?

Let's build this together! 🚀