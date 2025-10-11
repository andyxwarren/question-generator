# Product Roadmap
## UK Maths Practice Application

**Last Updated**: 2025-10-10
**Current Status**: Phase 5 Complete ✅

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

### ✅ Phase 3: Auto Power-Up System
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
- Power-up celebration overlay with rotation animation (3 seconds)
- Seamless question regeneration at new level for remaining questions
- **Streak resets to 0 after power-up activation** (requires 3 more for next power-up)
- Session data includes leveledUp flag and finalLevel
- Fully accessible with keyboard navigation and reduced motion support
- Responsive design optimized for tablets

**Files**: `src/core/streakTracker.js`, `src/ui/powerUpButton.js`, `styles/powerup.css`, `PHASE3_TESTING.md`

---

### ✅ Phase 3.5: Module Completion System
**Status**: Complete
**Priority**: MEDIUM
**Completed**: October 2025

Track student progress and provide visual feedback when modules are mastered.

**Requirements**:
- [x] Track correct answers per level per module
- [x] Detect completion (3+ correct at all 4 levels)
- [x] Show completion celebration prompt
- [x] Visual badges on completed modules
- [x] localStorage persistence
- [x] Allow continued practice after completion

**Completion Criteria**:
- Student must answer 3+ questions correctly at EACH difficulty level (1, 2, 3, 4)
- When all levels complete, celebration prompt appears
- Student can mark module as "complete" or continue practicing
- Completed modules show ✅ badge on setup screen
- Students can still practice completed modules anytime

**User Flow**:
1. Student practices a module and gets 3+ correct at Level 1
2. Student powers up to Level 2, gets 3+ correct
3. Student powers up to Level 3, gets 3+ correct
4. Student powers up to Level 4, gets 3+ correct
5. Completion prompt appears: "Module Complete! 🎊"
6. Student chooses to mark as complete or continue practicing
7. Setup screen shows ✅ badge on completed module

**Implementation Details**:
- ModuleProgress singleton tracks correct answers per level per module
- localStorage persistence (key: `mathsPractice_moduleProgress`)
- ModuleCompletionPrompt component shows celebration overlay
- Completion badges integrated into setup screen topic cards
- Completed modules highlighted with subtle green gradient
- Progress tracked across sessions
- Can reset individual module progress

**Files**: `src/core/moduleProgress.js`, `src/ui/moduleCompletionPrompt.js`, `styles/completion.css`, `PHASE3.5_TESTING.md`

---

### ✅ Phase 4: Progress Persistence
**Status**: Complete
**Priority**: 🔴 CRITICAL (Required for Phase 5)
**Completed**: October 2025

Save student progress locally without requiring a database or login. **This is the foundation for the adaptive learning system.**

**Requirements**:
- [x] Save all practice sessions to localStorage
- [x] Track per-student statistics
- [x] Remember current level for each module
- [x] Show recent session history (last 5)
- [x] Display overall statistics (total sessions, questions, accuracy)
- [x] Export progress as JSON file
- [x] Import progress from JSON file
- [x] Optional student identifier (name/number)
- [x] Recommend appropriate level based on history
- [x] Automatic cleanup of old data (>30 days)
- [x] Track performance metrics per session (accuracy, response time, power-ups)
- [x] Store historical trend data for adaptive system

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
      leveledUp: boolean,
      averageResponseTime: seconds,
      streakBroken: number,
      adjustmentsMade: array
    }
  ],
  stats: {
    totalSessions: number,
    totalQuestions: number,
    averageAccuracy: float,
    currentLevelByModule: {...},
    accuracyTrend: float,  // NEW: for adaptive system
    performanceWindow: []   // NEW: last 3 sessions per module
  }
}
```

**Deliverables**:
- [x] `StorageManager` module with CRUD operations
- [x] `StudentSelector` component for student management
- [x] `ProgressDisplay` dashboard component
- [x] Integration with setup screen (student info, recommendations)
- [x] Integration with practice screen (auto-save sessions)
- [x] Export/import UI with JSON download/upload
- [x] Data migration system from legacy moduleProgress
- [x] Performance metrics tracking (response times, streaks, power-ups)

**Implementation Details**:
- **StorageManager**: Comprehensive singleton managing student profiles, sessions, statistics, recommendations
  - Full CRUD operations for students (create, read, update, delete)
  - Session tracking with detailed metadata (questions, response times, streaks, power-ups)
  - Statistical calculations (accuracy, trends, performance windows)
  - Level recommendation algorithm (80%/60% thresholds, performance-based)
  - Export/import with JSON format (single student or full backup)
  - Automatic 30-day cleanup on load
  - localStorage wrapper with quota monitoring

- **StudentSelector Component**: Modal dialog for student management
  - View all students with quick stats (sessions, accuracy, completed modules)
  - Create new student profiles (name, year group)
  - Edit student details
  - Delete students with confirmation
  - Beautiful card-based UI with animations
  - Success feedback messages

- **Setup Screen Integration**: Student info section
  - Current student card showing stats
  - "Select Student" prompt when no student chosen
  - "Change Student" and "View Progress" buttons
  - Smart level recommendations based on performance
  - Visual notification system for recommendations

- **Practice Screen Integration**: Automatic session tracking
  - Creates session on practice start (if student selected)
  - Tracks every question result with response time
  - Records power-up usage
  - Updates best streak
  - Completes session with final score
  - Works seamlessly in anonymous mode (no tracking)

- **Progress Dashboard**: Full-featured analytics view
  - Overall statistics (8 key metrics)
  - Per-module progress with level bars
  - Performance trends (improving/stable/declining)
  - Recent sessions list (5 most recent)
  - Recommended levels with 💡 indicator
  - Export/import/storage management tools
  - Responsive design for all devices

**Validation Criteria**: ✅ All Met
- ✅ Sessions persist across browser restarts
- ✅ localStorage usage stays under 1MB (100+ sessions)
- ✅ Export/import works correctly (JSON format)
- ✅ Data cleanup removes entries >30 days old
- ✅ No data corruption or loss
- ✅ Anonymous mode works (no student selected)
- ✅ Results screen bug fixed (totalQuestions now shows attempted, not generated)
- ✅ Level recommendations work correctly
- ✅ Performance window tracking functional
- ✅ Dashboard loads quickly with large data sets

**Files**:
- `src/core/storageManager.js` (500+ lines, fully implemented)
- `src/ui/studentSelector.js` (student management UI)
- `src/ui/progressDisplay.js` (analytics dashboard)
- `styles/progress.css` (1100+ lines, comprehensive styling)
- `PHASE4_TESTING.md` (complete testing documentation)

**Testing**: Comprehensive test suite documented in `PHASE4_TESTING.md` with 42 test scenarios

**Dependencies**: None (foundation phase)

**Enables**: Phase 5 (Adaptive System), Phase 9 (Teacher Dashboard), Phase 8 (Stats Panel)

---

### ✅ Phase 5: Adaptive Difficulty Engine
**Status**: Complete
**Priority**: 🔴 CRITICAL
**Completed**: October 2025

**Revolutionary feature:** Continuously measures student ability and adapts question difficulty in real-time to maintain optimal challenge level. Provides intelligent support for struggling students (counterbalance to power-up system).

**Core Concept**: Zone of Proximal Development (ZPD)
- Students advancing quickly → Power-up system (existing)
- Students struggling → Adaptive step-down (new)
- Most students → Natural progression (no intervention)

**Requirements**:

**1. Performance Monitoring**
- [x] Real-time confidence score calculation (0-100)
- [x] Track accuracy, response time, hints used (future), streak breaks
- [x] Calculate performance trends over last 3 sessions
- [x] Detect struggling patterns (accuracy <50%, 3+ consecutive errors)
- [x] Monitor session completion rate

**2. Difficulty Mapping System**
- [x] Create cross-curriculum difficulty matrix
- [x] Map equivalent skills across modules
- [x] Define smooth transition paths between difficulty levels
- [x] Implement difficulty scoring algorithm (1-10 scale)
- [x] Support for future curriculum expansion

**3. Adaptive Decision Engine**
- [x] Analyze performance after 5+ questions
- [x] Calculate confidence score using weighted factors:
  - Accuracy (35%)
  - Response time (15%)
  - Hints used (20% - placeholder for Phase 6)
  - Consistency trend (15%)
  - Streak quality (15%)
- [x] Generate recommendations with reasoning
- [x] Determine adjustment type (decrease/increase/switch_module)
- [x] Find optimal level for struggling students

**4. User Interface Components**
- [x] Confidence meter display (visual progress bar)
- [x] Adaptive suggestion modal with child-friendly language
- [x] Settings toggle for enabling/disabling adaptive system
- [x] Color-coded confidence zones (red/orange/amber/green/blue)
- [x] Smooth animations and transitions

**5. Intervention Logic**
- [x] Silent monitoring during questions 1-5
- [x] Trigger suggestion at checkpoints (Q5, Q10, Q15, Q20)
- [x] Student choice: accept adjustment or decline
- [x] Seamless transition to new difficulty level
- [x] Track interventions in student's adaptive profile
- [x] Max 1 intervention per session to avoid disruption

**Trigger Conditions**:

| Confidence | Accuracy | Hints Used | Consecutive Errors | Action |
|------------|----------|------------|-------------------|--------|
| < 30 | < 30% | > 80% | 4+ | Immediate suggestion |
| 30-40 | 30-50% | 50-80% | 3+ | Suggestion after Q5 |
| 40-65 | 50-65% | 30-50% | 2 | Monitor, offer hints |
| 65-85 | 65-85% | < 30% | 0-1 | Optimal zone ✓ |
| > 85 | > 85% | < 20% | 0 | Power-up eligible |

**Adaptive Workflow**:
1. **Detection Phase** (Q1-Q5): Silent monitoring
2. **Analysis Phase** (after Q5): Calculate confidence, determine need
3. **Intervention Phase**: Show suggestion modal if struggling
4. **Transition Phase**: Adjust difficulty if accepted
5. **Recovery Phase**: Offer return to original level when ready

**Data Structure Extensions**:
```javascript
{
  adaptiveProfile: {
    moduleConfidence: {
      'counting': {
        currentYear: 2,
        currentLevel: 1,
        targetYear: 2,
        targetLevel: 1,
        confidenceScore: 35,
        lastAdjustment: timestamp,
        adjustmentHistory: [
          {
            date: timestamp,
            from: { year: 2, level: 1 },
            to: { year: 1, level: 4 },
            reason: 'accuracy-below-threshold',
            studentChoice: 'accepted'
          }
        ],
        performanceWindow: [
          { date, accuracy, confidence }
        ]
      }
    },
    learningPreferences: {
      acceptsAdaptiveSuggestions: boolean,
      hintsUsagePattern: 'rare' | 'moderate' | 'frequent',
      responseTimePattern: 'fast' | 'moderate' | 'slow',
      optimalSessionLength: number
    },
    teacherOverrides: {
      'counting': { minYear: 1, minLevel: 3 }
    }
  }
}
```

**Deliverables**:
- [x] `AdaptiveDifficultyEngine` class with confidence calculation (~300 lines)
- [x] `DifficultyMatrix` with skill mappings and recovery paths (~270 lines)
- [x] `PerformanceAnalyzer` for real-time metrics tracking (~250 lines)
- [x] `ConfidenceMeter` UI component with color-coded zones (~170 lines)
- [x] `AdaptiveSuggestionModal` UI component with child-friendly messaging (~220 lines)
- [x] StorageManager extensions for adaptive profile support
- [x] Adaptive controls in setup screen (enable/disable toggle)
- [x] Integration with practice screen for real-time tracking
- [x] Comprehensive CSS styling with animations (~600 lines)
- [x] Complete testing documentation (PHASE5_TESTING.md, 39 test scenarios)

**Validation Criteria**: ✅ All Met
- ✅ Confidence score accurately reflects performance (weighted algorithm)
- ✅ Suggestions appear only when genuinely struggling (thresholds validated)
- ✅ Smooth transitions preserve session flow (animations tested)
- ✅ Student agency maintained (accept/decline options)
- ✅ Positive framing in all messaging (child-friendly language)
- ✅ Max 1 intervention per session (prevents disruption)
- ✅ Works correctly when disabled (falls back to normal mode)
- ✅ Intervention history recorded and persisted
- ✅ No performance impact on practice screen (<100ms checks)

**Implementation Details**:

- **PerformanceAnalyzer**: Real-time session performance tracking
  - Tracks every question result with accuracy and response time
  - Maintains rolling window (last 5 questions) for recent performance
  - Calculates average response times against expected times per level
  - Detects struggling patterns (consecutive errors, slow responses, guessing)
  - Provides comprehensive metrics for confidence calculation
  - Session summary with detailed analysis

- **AdaptiveDifficultyEngine**: Core decision-making system
  - Confidence score calculation (0-100) with weighted factors
  - 5 confidence levels: Critical (<30), Struggling (30-40), Challenging (40-65), Optimal (65-85), Excelling (>85)
  - Checkpoint-based intervention system (Q5, Q10, Q15, Q20)
  - Max 1 intervention per session to avoid disruption
  - Three intervention types: decrease level, increase level, switch module
  - Child-friendly messaging with positive framing
  - Records intervention responses for learning patterns

- **DifficultyMatrix**: Cross-module difficulty mapping
  - Difficulty ratings (1-10 scale) for all modules at all levels
  - Recovery path recommendations for struggling students
  - Module prerequisite tracking
  - Equivalent difficulty mapping across modules
  - Progression pathway suggestions

- **ConfidenceMeter Component**: Visual performance indicator
  - Real-time confidence display at top of practice screen
  - Color-coded zones (red/orange/amber/green/blue)
  - Smooth animations with pulse effects for critical/excelling
  - Updates after each question answered
  - Shows "Calculating..." until sufficient data (5 questions)

- **AdaptiveSuggestionModal Component**: Intervention dialog
  - Appears when adaptive engine detects intervention needed
  - Different icons/messages for each intervention type
  - Level change visualization (L2 → L3)
  - Two clear buttons: Accept / Decline
  - Student maintains complete agency
  - Records response in intervention history

- **StorageManager Extensions**: Adaptive profile persistence
  - adaptiveProfile object added to student data
  - Intervention history tracking (max 50 per student)
  - getInterventionStats() for analysis
  - setAdaptiveEnabled() for per-student control
  - Export/import includes adaptive data

- **Setup Screen Integration**: Adaptive controls
  - Enable/disable toggle in Settings section
  - Only visible when student selected
  - Setting persists per student
  - Clear description of adaptive system

- **Practice Screen Integration**: Real-time adaptive monitoring
  - Initializes performanceAnalyzer and confidenceMeter
  - Records each question result in analyzer
  - Updates confidence meter after each answer
  - Checks for interventions at checkpoints
  - Shows suggestion modal when triggered
  - Handles level transitions smoothly

**Educational Psychology Foundations**:
- Zone of Proximal Development (Vygotsky) - Optimal challenge level
- Mastery Learning (Bloom) - Progressive skill building
- Growth Mindset (Dweck) - Supportive, non-judgmental messaging
- Formative Assessment principles - Real-time feedback and adjustment

**Files**:
- `src/core/adaptiveDifficultyEngine.js` (~300 lines)
- `src/core/difficultyMatrix.js` (~270 lines)
- `src/core/performanceAnalyzer.js` (~250 lines)
- `src/ui/confidenceMeter.js` (~170 lines)
- `src/ui/adaptiveSuggestionModal.js` (~220 lines)
- `src/core/storageManager.js` (extended with ~200 lines)
- `src/ui/practiceScreen.js` (integrated, ~150 lines added)
- `src/ui/setupScreen.js` (controls added, ~50 lines)
- `styles/adaptive.css` (~600 lines)
- `index.html` (added adaptive.css link)
- `PHASE5_TESTING.md` (comprehensive test plan, 39 scenarios)

**Testing**: Complete test suite documented in `PHASE5_TESTING.md` with 39 test scenarios covering adaptive controls, performance tracking, confidence meter, interventions, level adjustments, data persistence, edge cases, integration, and performance.

**Dependencies**:
- Phase 4 (Progress Persistence) - REQUIRED ✅
- Phase 3 (Power-up System) - Integration point ✅
- Phase 6 (Hints System) - Future complementary feature

**Enables**: True personalized learning experience with adaptive support

---

### 🔜 Phase 6: Hints System
**Status**: Planned
**Priority**: 🟡 HIGH
**Target**: After Phase 5 (2-3 weeks)
**Estimated Effort**: 2 weeks

Provide progressive hints to help struggling students without giving away the answer. **Complements adaptive system by providing in-question support.**

**Requirements**:
- [ ] 0-3 hints per question
- [ ] Progressive unlock (hint 1 → 2 → 3)
- [ ] Hint button showing available/used count
- [ ] Revealed hints stay visible
- [ ] Hint types: strategy, visual, breakdown, range
- [ ] Score reduction: 10% per hint used (-30% max)
- [ ] Auto-generate hints based on question type and difficulty
- [ ] Track hint usage patterns for adaptive system

**Hint Progression Example**:
- Hint 1: "Think about what operation you need"
- Hint 2: "Try breaking the number into parts"
- Hint 3: "The answer is between 40 and 50"

**Integration with Adaptive System**:
- High hint usage (>50%) contributes to lower confidence score
- Adaptive system may suggest easier level if hints consistently needed
- Hints remain available even after adaptive adjustment

**Deliverables**:
- [ ] `HintSystem` module with getNextHint(), reset(), calculateScoreModifier()
- [ ] `HintButton` component with progressive unlock UI
- [ ] Hint generation function per question type
- [ ] Hint display area in question card with fade-in animation
- [ ] Modified scoring system with hint penalties
- [ ] Results screen shows hints used with friendly messaging
- [ ] Integration with adaptive confidence calculation

**Validation Criteria**:
- Hints unlock sequentially (cannot skip)
- Score correctly reduces by 10% per hint
- Hints appropriate for difficulty level
- UI clearly shows available vs. used hints
- Results accurately reflect hint usage

**Files**: `src/core/hintSystem.js`, `src/ui/hintButton.js`, `styles/hints.css`

**Dependencies**: Phase 4 (for hint tracking), Phase 5 (for integration)

---

### 🔜 Phase 7: Enhanced Question Types
**Status**: Planned
**Priority**: 🟡 MEDIUM
**Target**: Q2 2025 (after Phase 6)
**Estimated Effort**: 3-4 weeks

Add interactive question formats beyond multiple choice and text input to increase engagement and match diverse learning styles.

**New Question Types** (Implementation Order):

1. [ ] **True/False** (Week 1 - Quick Win)
   - Large TRUE/FALSE buttons
   - Single click to answer
   - Visual feedback on selection
   - Good for conceptual understanding

2. [ ] **Drag-and-Drop Ordering** (Week 2 - High Engagement)
   - Drag items to arrange in sequence
   - Visual feedback during drag
   - Drop zones highlight on hover
   - Touch-optimized with large hit areas
   - Haptic feedback on successful drop

3. [ ] **Select Multiple (Checkboxes)** (Week 2-3)
   - Click all correct answers
   - Visual selection state
   - Submit button to check
   - Partial credit option

4. [ ] **Number Line Click** (Week 3)
   - Visual number line with range
   - Click to place answer
   - Tolerance for near-correct (±1)
   - Visual feedback on placement

5. [ ] **Matching Pairs** (Week 4)
   - Two columns of items
   - Drag or click to match
   - Progressive reveal
   - More complex implementation

**Deliverables**:
- [ ] `QuestionTypeRegistry` system for extensibility
- [ ] Handler for each question type (render + validate)
- [ ] Updated generators to produce new question types
- [ ] Touch-optimized interactions with haptic feedback
- [ ] CSS styling for interactive elements
- [ ] Accessibility features (keyboard navigation, screen reader)
- [ ] Mobile-responsive design for all types
- [ ] Animation library for drag/drop feedback

**Integration Points**:
- Works with existing hint system
- Compatible with adaptive difficulty engine
- Generates varied questions for deduplication
- Tracks interaction patterns for analytics

**Files**: `src/ui/questionTypes/`, `src/core/questionTypeRegistry.js`, `styles/question-types.css`

**Dependencies**: None (independent feature)

---

### 🔜 Phase 8: User Stats Panel
**Status**: Planned
**Priority**: 🟡 MEDIUM
**Target**: Q3 2025
**Estimated Effort**: 2 weeks

Add real-time statistics panel for students to track performance during and after practice sessions.

**Requirements**:

**Live Stats During Practice:**
- [ ] Current streak counter (🔥 icon when 3+)
- [ ] Current accuracy percentage
- [ ] Questions remaining
- [ ] Time elapsed (optional toggle)
- [ ] Current difficulty level indicator
- [ ] Confidence score (from Phase 5)

**Expandable Stats Panel:**
- [ ] Compact mode: shows only key metrics (streak, accuracy)
- [ ] Expanded mode: shows detailed breakdown
- [ ] Slide-in/slide-out animation
- [ ] Position: top-right corner (collapsed) or sidebar (expanded)
- [ ] Non-obstructive design

**Session Statistics:**
- [ ] Questions attempted vs. remaining with visual progress
- [ ] Correct/incorrect breakdown with progress bar
- [ ] Average time per question
- [ ] Hints used count with icon indicators
- [ ] Level-ups achieved during session
- [ ] Confidence trend (rising/falling indicator)

**Historical Comparison:**
- [ ] "Previous best" comparison for this module/level
- [ ] Trend indicator (improving/declining with arrow)
- [ ] Personal records (highest streak, best accuracy)
- [ ] "You're doing better than last time! 📈"

**Visual Design:**
- [ ] Clean, non-distracting design
- [ ] Color-coded metrics (green=good, amber=okay, red=struggling)
- [ ] Icons for quick recognition
- [ ] Responsive sizing for tablets
- [ ] Toggle to hide/show during practice
- [ ] Smooth 60fps animations

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
- [ ] localStorage integration for historical data
- [ ] Settings toggle to enable/disable panel
- [ ] Accessibility features (keyboard navigation, screen reader support)
- [ ] Reduced motion support for animations

**Validation Criteria**:
- Stats update immediately after each answer (<100ms)
- Panel does not obstruct question content
- Smooth animations (60fps target)
- Works on both desktop and tablet
- Historical comparisons accurate
- Toggle persists across sessions
- No performance impact on question rendering

**Files**: `src/ui/statsPanel.js`, `src/core/sessionStats.js`, `styles/stats-panel.css`

**Dependencies**: 
- Phase 3 (streak tracking) - Required
- Phase 6 (hints used tracking) - Required
- Phase 4 (historical data) - Required
- Phase 5 (confidence score) - Recommended

---

### 🔜 Phase 9: Teacher Dashboard
**Status**: Planned
**Priority**: 🟢 LOW
**Target**: Q3 2025
**Estimated Effort**: 4 weeks

Simple teacher view to see class progress without authentication system. **Browser-based aggregation only, no server required.**

**Requirements**:
- [ ] Separate HTML page (`teacher-dashboard.html`)
- [ ] File upload to import student session JSON files
- [ ] Aggregate multiple students' data
- [ ] Display class statistics
- [ ] Display per-student progress
- [ ] Display per-module performance
- [ ] Export combined class report (PDF/CSV)
- [ ] No database or server required
- [ ] Works entirely in browser
- [ ] Show adaptive adjustment patterns
- [ ] Identify students needing intervention

**Dashboard Views**:

**1. Class Overview**
- Total students, sessions, average accuracy
- Most/least practiced topics
- Average time per session
- Class-wide confidence trends

**2. Student Table**
- Each student's sessions, questions, accuracy
- Current level per module
- Last activity date
- Confidence scores per module
- Adaptive adjustments made
- Students at risk (flagged red if struggling)

**3. Module Performance**
- Most/least practiced topics
- Average accuracy per topic
- Common difficulty levels
- Hint usage patterns
- Adaptive adjustment frequency

**4. Intervention Alerts**
- Students with accuracy <50% (past 3 sessions)
- Students with declining confidence trends
- Students with frequent adaptive adjustments
- Students who haven't practiced in 7+ days

**Deliverables**:
- [ ] `teacher-dashboard.html` standalone page
- [ ] `TeacherDashboard` module with data aggregation
- [ ] Session reporter in main app (download JSON after completion)
- [ ] Dashboard UI with tables and interactive charts (Chart.js)
- [ ] Student comparison visualization
- [ ] Export combined class report functionality
- [ ] Print-friendly report layout
- [ ] Filter and search functionality

**Validation Criteria**:
- Correctly aggregates data from multiple JSON files
- Charts render accurately
- Export contains all relevant data
- No student data leaves browser
- Works offline after initial load

**Files**: `teacher-dashboard.html`, `src/teacher/dashboard.js`, `src/teacher/aggregator.js`, `styles/dashboard.css`

**Dependencies**: Phase 4 (data structure), Phase 5 (confidence data)

---

## Quick Wins & Future Considerations

### Quick Wins (1-2 days each)

1. **Dark Mode Toggle** 
   - CSS custom properties already in place
   - Add theme switcher in setup screen
   - Save preference to localStorage

2. **Sound Effects** (Optional)
   - Correct answer: ✨ chime
   - Incorrect answer: soft buzz
   - Power-up: celebration sound
   - Level adjustment: gentle tone
   - Mute toggle for classroom control

3. **Timer Mode**
   - Optional countdown per question (30s/60s/90s)
   - Visual timer bar
   - Timed vs. untimed statistics
   - Does not penalize struggling students

4. **Print Worksheets**
   - Generate PDF of 10 questions
   - Traditional paper practice option
   - Uses existing question generators
   - No adaptive features in print mode

### Medium-Term Enhancements

5. **Curriculum Expansion**
   - Add more modules (geometry, measurement, word problems, time)
   - More difficulty levels (5 or 6 levels per module)
   - Cross-topic mixed practice sessions
   - Year 3-6 content

6. **Accessibility Improvements**
   - Full keyboard navigation throughout
   - Screen reader optimization (ARIA labels)
   - High contrast mode
   - Text-to-speech for questions (Web Speech API)
   - Dyslexia-friendly font option (OpenDyslexic)

7. **PWA Features**
   - Service worker for true offline capability
   - Install prompt for home screen
   - Background sync for progress data
   - Push notifications for daily practice reminders

### Additional Features (Not Prioritized)

- **Achievement Badges**: Unlock badges for milestones (10 sessions, 100 correct, etc.)
- **Custom Topics**: Teacher-created custom question sets
- **Multiplayer Mode**: Classroom competition mode with leaderboard
- **Parent Portal**: Simplified view of child's progress
- **Gamification**: XP points, levels, unlockable themes
- **AI Tutor Chat**: Simple Q&A for stuck students (future AI integration)

### Technical Debt / Improvements

- Add automated testing framework (Vitest recommended)
- Implement bundle optimization (Vite or Rollup)
- Add TypeScript for type safety on critical modules
- Create component storybook for UI development
- Add performance monitoring (Lighthouse CI)
- Implement error tracking (Sentry)
- Code splitting for faster initial load
- Optimize localStorage usage (compression)

---

## Success Metrics

### Student Engagement
- Average session length (target: 10-15 minutes)
- Questions attempted per session (target: 15-20)
- Repeat usage rate (target: 60% return within 7 days)
- Level progression rate (target: level up every 3-4 sessions)
- Session completion rate (target: >80%)
- **NEW:** Adaptive adjustment acceptance rate (target: >60%)

### Learning Outcomes
- Accuracy improvement over time (target: +10% over 10 sessions)
- Topics with highest/lowest accuracy (identify curriculum gaps)
- Hint usage patterns (decreasing over time = improving)
- Level-up frequency (natural progression indicator)
- **NEW:** Confidence score improvements (target: +15 points over 5 sessions)
- **NEW:** Recovery rate after adaptive adjustment (target: >50% return to original level)

### Technical Performance
- Page load time < 2 seconds on 4G
- localStorage usage < 2MB per student
- 60fps animations on tablets
- Zero critical bugs in production
- Adaptive engine response time < 200ms
- UI interaction latency < 100ms

### Adaptive System Effectiveness
- **False positive rate** (unnecessary adjustments): <10%
- **True positive rate** (caught struggling students): >85%
- **Student satisfaction** with suggestions: >70% acceptance
- **Time to recovery**: Average 2-3 sessions to return to target level
- **Reduced frustration**: Session abandonment rate drops by 40%

---

## Version History

| Version | Date | Phases Complete | Notes |
|---------|------|-----------------|-------|
| v0.1.0 | Jan 2025 | Phase 0 | Initial release with core functionality |
| v0.2.0 | Jan 2025 | Phase 0, 1 | Added question deduplication system |
| v0.3.0 | Oct 2025 | Phase 0, 1, 2 | On-screen keyboard for touch devices |
| v0.4.0 | Oct 2025 | Phase 0, 1, 2, 3 | Auto power-up system with streak tracking |
| v0.4.1 | Oct 2025 | Phase 0-3.5 | Module completion tracking & badges |
| v0.5.0 | Oct 2025 | Phase 0-4 | Progress persistence & student management |
| **v1.0.0** | **Oct 2025** | **Phase 0-5** | **Full adaptive learning system (MAJOR RELEASE)** |
| v1.1.0 | Q1 2026 | Phase 0-6 | Hints system integration |
| v1.2.0 | Q2 2026 | Phase 0-7 | Enhanced question types |
| v1.3.0 | Q3 2026 | Phase 0-8 | Student stats panel |
| v2.0.0 | Q4 2026 | Phase 0-9 | Complete student & teacher experience |

---

## Development Priorities Summary

### 🔴 CRITICAL PRIORITY (Next 2-3 weeks)
1. **Phase 6**: Hints System (2-3 weeks) - Complements adaptive system ✨

### 🟡 HIGH PRIORITY (Following 3-4 weeks)
2. **Phase 7**: Enhanced Question Types (3-4 weeks) - Engagement & variety

### 🟡 MEDIUM PRIORITY (Q3 2025)
4. **Phase 8**: User Stats Panel (2 weeks) - Student feedback
5. **Phase 9**: Teacher Dashboard (4 weeks) - Teacher insights

### 🟢 LOW PRIORITY
- Quick wins (dark mode, sounds, timer, print)
- Technical improvements (testing, TypeScript, PWA)
- Future features (badges, multiplayer, AI tutor)

---

## Rationale for Priority Order

**Why Phase 6 → 7 → 8 → 9?**

1. **Phase 6 (Hints System)** is next because:
   - Complements adaptive system perfectly (just completed Phase 5)
   - Provides in-question support (adaptive provides session-level support)
   - Easier to implement now that adaptive foundation exists
   - High hint usage will feed into adaptive confidence score
   - Natural progression from adaptive system

2. **Phase 7 (Enhanced Question Types)** next because:
   - Works with both adaptive and hints systems
   - Adds engagement without changing core mechanics
   - Can be implemented independently
   - Good for maintaining development momentum

3. **Phase 8 (Stats Panel)** and **Phase 9 (Dashboard)** last because:
   - Visibility features, not core learning mechanics
   - Require all previous phase data to be meaningful
   - Can be developed in parallel if team size permits
   - Teacher dashboard lowest priority (fewer users)

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

**Key Contact Areas:**
- Educational psychology/pedagogy questions → Review adaptive engine design docs
- Technical implementation questions → See `docs/engineering_doc.md`
- Feature prioritization questions → See "Rationale for Priority Order" above