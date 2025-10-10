# Product Roadmap
## UK Maths Practice Application

**Last Updated**: 2025-10-10
**Current Status**: Phase 3 Complete ✅

---

## Overview

This roadmap tracks the development of a production-ready interactive mathematics practice application for UK Key Stage 1 & 2 students (ages 5-11). The application uses a parameter-based architecture to generate unlimited unique questions across multiple curriculum topics.

### Core Principles
- Pure HTML/CSS/JavaScript (no frameworks required)
- No complex databases (localStorage for persistence)
- No authentication system
- Works offline after first load
- Optimized for iPad/tablet use
- Modern browser compatible

---

## Development Phases

### ✅ Phase 0: Foundation Setup
**Status**: Complete
**Completed**: January 2025

Built the core application architecture and functionality.

**Deliverables**:
- [x] Modular file structure with ES6 modules
- [x] Three-component architecture (Curriculum → Generators → Delivery)
- [x] Four curriculum modules (Counting, Number Bonds, Multiplication, Fractions)
- [x] Four difficulty levels per module
- [x] Question generation engine with parameter system
- [x] Multiple question types (multiple choice, text input)
- [x] Three-screen UI (Setup → Practice → Results)
- [x] Responsive tablet-optimized design
- [x] Answer validation system

**Files**: `src/curriculum/`, `src/generators/`, `src/core/`, `src/ui/`

---

### ✅ Phase 1: Question Deduplication System
**Status**: Complete
**Priority**: HIGH
**Completed**: January 2025

Prevent students from seeing duplicate questions within a configurable time period.

**Deliverables**:
- [x] `QuestionHistory` class with fingerprinting
- [x] localStorage persistence for question history
- [x] Configurable cooldown period (1h, 4h, 12h, 24h, 48h, 1 week)
- [x] Settings UI for cooldown adjustment
- [x] Automatic cleanup of expired entries
- [x] History statistics and management UI
- [x] Integration with question generation flow

**Key Features**:
- Questions fingerprinted based on content (module, level, type, text, answer)
- Default 24-hour cooldown before questions can repeat
- "Clear History" and "View Stats" buttons in setup screen

**Files**: `src/core/questionHistory.js`

---

### ✅ Phase 2: On-Screen Keyboard
**Status**: Complete
**Priority**: HIGH
**Completed**: October 2025

Add iPad-friendly calculator-style keyboard for text input questions.

**Requirements**:
- [x] Calculator-style numpad layout (3×4 grid + function keys)
- [x] Keys: 0-9, decimal point, minus sign, backspace, submit
- [x] Touch device detection (only show on touch screens)
- [x] Haptic feedback on key press
- [x] Fixed position at bottom of screen
- [x] Large touch-friendly buttons (min 44px × 44px)
- [x] Prevent native keyboard on touch devices
- [x] Visual feedback on key press

**Layout**:
```
[7] [8] [9]
[4] [5] [6]
[1] [2] [3]
[÷] [0] [⌫]
[.] [−] [✓ Submit]
```

**Validation Criteria**: ✅ All Passed
- ✅ Keyboard appears automatically on iPad/tablet
- ✅ No keyboard shown on desktop (native input works)
- ✅ All keys function correctly
- ✅ Submit button triggers answer validation

**Implementation Details**:
- Component-based architecture with full lifecycle management
- Touch device detection using media queries and Navigator API
- Haptic feedback support (10ms vibration on supported devices)
- Input validation (single decimal, minus only at start)
- Smooth animations and visual feedback
- Fully accessible with keyboard navigation support
- Responsive design for various tablet sizes

**Files**: `src/ui/onScreenKeyboard.js`, `styles/keyboard.css`, `PHASE2_TESTING.md`

---

### ✅ Phase 3: Auto Level-Up System
**Status**: Complete
**Priority**: HIGH
**Completed**: October 2025

Automatically offer progression to next difficulty after consecutive correct answers.

**Requirements**:
- [x] Track consecutive correct answers (streak)
- [x] Reset streak on incorrect answer
- [x] Show animated "Power-Up" button after 3 consecutive correct
- [x] Confirmation dialog for level-up
- [x] Seamless difficulty increase during session
- [x] Streak counter display with 🔥 icon
- [x] Floating power-up button (⚡ icon, gold gradient)
- [x] Level-up celebration animation
- [x] Disabled at max level (Level 4)

**User Flow**:
1. Student gets 3 answers correct in a row
2. Power-up button appears with animation
3. Student clicks → confirmation dialog
4. If accepted: level increases, new questions generated, celebration shown
5. If declined: button hides, continues at current level

**Validation Criteria**: ✅ All Implemented
- ✅ 2 correct → no button
- ✅ 3 correct → button appears
- ✅ 1 wrong → streak resets, button disappears
- ✅ Level 4 → button never appears

**Implementation Details**:
- Streak tracking with StreakTracker singleton (tracks consecutive correct answers)
- PowerUpButton component with smooth slide-in/slide-out animations
- Streak display shows ⭐ for 1 correct, 🔥 with hot styling for 2+ correct
- Power-up button appears after 800ms delay when 3-streak achieved
- Level-up celebration overlay with rotation animation (3 seconds)
- Seamless question regeneration at new level for remaining questions
- Streak continues after level-up (can level up multiple times)
- Session data includes leveledUp flag and finalLevel
- Fully accessible with keyboard navigation and reduced motion support
- Responsive design optimized for tablets

**Files**: `src/core/streakTracker.js`, `src/ui/powerUpButton.js`, `styles/powerup.css`, `PHASE3_TESTING.md`

---

### 🔜 Phase 4: Enhanced Question Types
**Status**: Planned
**Priority**: MEDIUM
**Target**: Q2 2025

Add interactive question formats beyond multiple choice and text input.

**New Question Types**:
1. [ ] **Drag-and-Drop Ordering**
   - Drag items to arrange in sequence
   - Visual feedback during drag
   - Drop zones highlight on hover

2. [ ] **Select Multiple (Checkboxes)**
   - Click all correct answers
   - Visual selection state
   - Submit button to check

3. [ ] **True/False**
   - Large TRUE/FALSE buttons
   - Single click to answer

4. [ ] **Matching Pairs**
   - Two columns of items
   - Drag or click to match

5. [ ] **Number Line Click**
   - Visual number line with range
   - Click to place answer
   - Tolerance for near-correct

**Deliverables**:
- [ ] `QuestionTypes` registry system
- [ ] Handler for each question type (render + validate)
- [ ] Updated generators to produce new types
- [ ] Touch-optimized interactions
- [ ] CSS styling for interactive elements

**Files**: `src/ui/questionTypes/`, `src/core/questionTypeRegistry.js`

---

### 🔜 Phase 5: Hints System
**Status**: Planned
**Priority**: MEDIUM
**Target**: Q2 2025

Provide progressive hints to help struggling students without giving away the answer.

**Requirements**:
- [ ] 0-3 hints per question
- [ ] Progressive unlock (hint 1 → 2 → 3)
- [ ] Hint button showing available/used count
- [ ] Revealed hints stay visible
- [ ] Hint types: strategy, visual, breakdown, range
- [ ] Score reduction: 10% per hint used
- [ ] Auto-generate hints based on question type and difficulty

**Hint Progression Example**:
- Hint 1: "Think about what operation you need"
- Hint 2: "Try breaking the number into parts"
- Hint 3: "The answer is between 40 and 50"

**Deliverables**:
- [ ] `HintSystem` module with getNextHint(), reset(), calculateScoreModifier()
- [ ] `HintButton` component
- [ ] Hint generation function per question type
- [ ] Hint display area in question card
- [ ] Modified scoring system
- [ ] Results screen shows hints used

**Files**: `src/core/hintSystem.js`, `src/ui/hintButton.js`

---

### 🔜 Phase 6: Progress Persistence
**Status**: Planned
**Priority**: HIGH
**Target**: Q2 2025

Save student progress locally without requiring a database or login.

**Requirements**:
- [ ] Save all practice sessions to localStorage
- [ ] Track per-student statistics
- [ ] Remember current level for each module
- [ ] Show recent session history (last 5)
- [ ] Display overall statistics (total sessions, questions, accuracy)
- [ ] Export progress as JSON file
- [ ] Import progress from JSON file
- [ ] Optional student identifier (name/number)
- [ ] Recommend appropriate level based on history
- [ ] Automatic cleanup of old data (>30 days)

**Data Structure**:
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

**Deliverables**:
- [ ] `StorageManager` module
- [ ] `ProgressDisplay` component
- [ ] Integration with setup screen (recommendations)
- [ ] Integration with practice screen (auto-save)
- [ ] Export/import UI

**Files**: `src/core/storageManager.js`, `src/ui/progressDisplay.js`

---

### 🔜 Phase 7: Teacher Dashboard
**Status**: Planned
**Priority**: LOW
**Target**: Q3 2025

Simple teacher view to see class progress without authentication system.

**Requirements**:
- [ ] Separate HTML page (`teacher-dashboard.html`)
- [ ] File upload to import student session JSON files
- [ ] Aggregate multiple students' data
- [ ] Display class statistics
- [ ] Display per-student progress
- [ ] Display per-module performance
- [ ] Export combined class report
- [ ] No database or server required
- [ ] Works entirely in browser

**Dashboard Views**:
1. **Class Overview**
   - Total students, sessions, average accuracy

2. **Student Table**
   - Each student's sessions, questions, accuracy
   - Current level per module
   - Last activity date

3. **Module Performance**
   - Most/least practiced topics
   - Average accuracy per topic
   - Common difficulty levels

**Deliverables**:
- [ ] `teacher-dashboard.html`
- [ ] `TeacherDashboard` module
- [ ] Session reporter in main app (download JSON after completion)
- [ ] Dashboard UI with tables and charts
- [ ] Export combined class report

**Files**: `teacher-dashboard.html`, `src/teacher/dashboard.js`

---

### 🆕 Phase 8: User Stats Panel
**Status**: Planned
**Priority**: MEDIUM
**Target**: Q3 2025

Add a real-time statistics panel for students to track their performance during and after practice sessions.

**Requirements**:
- [ ] **Live Stats During Practice**
  - Current streak counter (🔥 icon when 3+)
  - Current accuracy percentage
  - Questions remaining
  - Time elapsed (optional toggle)
  - Current difficulty level indicator

- [ ] **Expandable Stats Panel**
  - Compact mode: shows only key metrics (streak, accuracy)
  - Expanded mode: shows detailed breakdown
  - Slide-in/slide-out animation
  - Position: top-right corner (collapsed) or sidebar (expanded)

- [ ] **Session Statistics**
  - Questions attempted vs. remaining
  - Correct/incorrect breakdown with visual progress bar
  - Average time per question
  - Hints used count
  - Level-ups achieved during session

- [ ] **Historical Comparison** (requires Phase 6)
  - "Previous best" comparison for this module/level
  - Trend indicator (improving/declining)
  - Personal records (highest streak, best accuracy)

- [ ] **Visual Design**
  - Clean, non-distracting design
  - Color-coded metrics (green for good, amber for okay, red for struggling)
  - Icons for quick recognition
  - Responsive sizing for tablets
  - Toggle to hide/show during practice (minimize distraction)

**User Flow**:
1. Practice session starts → stats panel appears in compact mode
2. Student can click to expand for detailed view
3. Real-time updates as questions are answered
4. Panel persists on results screen with final stats
5. Historical comparison shown if previous session data exists

**Deliverables**:
- [ ] `StatsPanel` component with compact/expanded modes
- [ ] Real-time metric tracking during practice
- [ ] Integration with practice screen
- [ ] Integration with results screen
- [ ] CSS animations for panel transitions
- [ ] localStorage integration for historical data (Phase 6 dependency)
- [ ] Settings toggle to enable/disable panel
- [ ] Accessibility features (keyboard navigation, screen reader support)

**Validation Criteria**:
- Stats update immediately after each answer
- Panel does not obstruct question content
- Smooth animations (60fps)
- Works on both desktop and tablet
- Historical comparisons accurate (if Phase 6 complete)
- Toggle persists across sessions

**Files**: `src/ui/statsPanel.js`, `src/core/sessionStats.js`

**Dependencies**:
- Phase 3 (streak tracking)
- Phase 5 (hints used tracking)
- Phase 6 (historical data - optional enhancement)

---

## Future Considerations

### Additional Features (Not Prioritized)
- **Timer Mode**: Optional countdown timer for timed practice
- **Achievement Badges**: Unlock badges for milestones
- **Custom Topics**: Teacher-created custom question sets
- **Voice Support**: Text-to-speech for questions and answers
- **Accessibility Enhancements**: Full screen reader support, high contrast mode
- **PWA Features**: Service worker for true offline support, install prompt
- **Print Mode**: Generate printable worksheets from questions
- **Multiplayer Mode**: Classroom competition mode

### Technical Debt / Improvements
- Add automated testing framework (Jest or Vitest)
- Implement bundle optimization (Vite or Rollup)
- Add TypeScript for type safety
- Create component storybook for UI development
- Add performance monitoring
- Implement error tracking (Sentry)

---

## Success Metrics

### Student Engagement
- Average session length
- Questions attempted per session
- Repeat usage rate
- Level progression rate

### Learning Outcomes
- Accuracy improvement over time
- Topics with highest/lowest accuracy
- Hint usage patterns
- Level-up frequency

### Technical Performance
- Page load time < 2 seconds
- localStorage usage < 2MB
- 60fps animations on tablets
- Zero critical bugs in production

---

## Version History

| Version | Date | Phases Complete | Notes |
|---------|------|-----------------|-------|
| v0.1.0 | Jan 2025 | Phase 0 | Initial release with core functionality |
| v0.2.0 | Jan 2025 | Phase 0, 1 | Added question deduplication system |
| v0.3.0 | Oct 2025 | Phase 0, 1, 2 | On-screen keyboard for touch devices |
| v0.4.0 | Oct 2025 | Phase 0, 1, 2, 3 | Auto level-up system with streak tracking |
| v1.0.0 | TBD | Phase 0-6 | Full student experience (planned) |
| v1.1.0 | TBD | Phase 0-8 | Student stats + teacher dashboard (planned) |

---

## Contributing

When implementing new phases:

1. **Review Requirements**: Understand feature specifications
2. **Study Reference Code**: Review `docs/engineering_doc.md` for detailed implementation guidance
3. **Design Solution**: Plan architecture and integration points
4. **Implement**: Write code following project style guide
5. **Test**: Validate all requirements met (see validation criteria for each phase)
6. **Document**: Update relevant docs and add code comments
7. **Update Roadmap**: Check off completed items and update status

---

## Questions & Feedback

For questions about this roadmap or to suggest new features, see project documentation in `docs/` or open an issue.
