# Phase 5 Testing Guide: Adaptive Difficulty Engine

Comprehensive testing scenarios for the adaptive learning system that monitors student performance and suggests difficulty adjustments in real-time.

## Table of Contents
1. [Setup](#setup)
2. [Adaptive System Controls](#adaptive-system-controls)
3. [Performance Tracking](#performance-tracking)
4. [Confidence Meter](#confidence-meter)
5. [Intervention Triggers](#intervention-triggers)
6. [Level Adjustments](#level-adjustments)
7. [Edge Cases](#edge-cases)
8. [Integration Testing](#integration-testing)
9. [Performance Testing](#performance-testing)

---

## Setup

### Prerequisites
- Complete Phase 4 testing first (student management must be working)
- Create test student: "Test Learner"
- Ensure adaptive system is enabled (toggle should be ON)
- Clear browser cache or use incognito mode for clean slate

### Initial State
- At least one student profile created
- Adaptive Learning toggle visible in Settings section
- Confidence meter initializes but shows "Calculating..." until 5 questions answered

---

## Adaptive System Controls

### Test 1: Enable/Disable Adaptive System
**Steps:**
1. Select a student
2. Check adaptive toggle state in Settings
3. Toggle adaptive learning OFF
4. Start a practice session
5. Complete 10 questions

**Expected:**
- Toggle shows current state (default: ON)
- When OFF: No confidence meter appears
- When OFF: No intervention suggestions
- Console shows: "🎯 Adaptive system: DISABLED for this student"
- Setting persists across sessions

**Test with adaptive ON:**
1. Toggle adaptive learning ON
2. Start new practice session
3. Verify confidence meter appears
4. Console shows: "🎯 Adaptive system: ENABLED for this session"

---

## Performance Tracking

### Test 2: Basic Performance Recording
**Steps:**
1. Enable adaptive system
2. Select Counting, Level 1, 10 questions
3. Answer first 5 questions:
   - Q1: Correct (slow ~5s)
   - Q2: Correct (fast ~2s)
   - Q3: Incorrect (fast ~1s)
   - Q4: Correct (medium ~3s)
   - Q5: Correct (medium ~4s)

**Expected:**
- Console logs show:
  ```
  📊 PerformanceAnalyzer: Started tracking session
  📊 PerformanceAnalyzer: Q1 - ✓ (5000ms) - Accuracy: 100%
  📊 PerformanceAnalyzer: Q2 - ✓ (2000ms) - Accuracy: 100%
  📊 PerformanceAnalyzer: Q3 - ✗ (1000ms) - Accuracy: 67%
  📊 PerformanceAnalyzer: Q4 - ✓ (3000ms) - Accuracy: 75%
  📊 PerformanceAnalyzer: Q5 - ✓ (4000ms) - Accuracy: 80%
  ```
- Accuracy calculated correctly
- Response times tracked for each question

### Test 3: Rolling Window Metrics
**Steps:**
1. Continue from Test 2
2. Answer 5 more questions:
   - Q6: Correct
   - Q7: Correct
   - Q8: Incorrect
   - Q9: Incorrect
   - Q10: Incorrect

**Expected:**
- Rolling accuracy (last 5 questions):
  - After Q6: 80% (Q2-Q6: 4/5)
  - After Q7: 80% (Q3-Q7: 4/5)
  - After Q8: 60% (Q4-Q8: 3/5)
  - After Q9: 40% (Q5-Q9: 2/5)
  - After Q10: 20% (Q6-Q10: 1/5)
- Overall accuracy: 50% (5 correct / 10 total)

### Test 4: Response Time Analysis
**Steps:**
1. Start Multiply, Level 2
2. Answer questions with varying speeds:
   - 3 questions: Very slow (>9s each)
   - 3 questions: Normal (4-6s each)
   - 3 questions: Very fast (<2s each)

**Expected:**
- Slow responses flagged: "Slow responses (avg 9s)"
- Fast incorrect responses flagged as possible guessing
- Average response time calculated correctly
- Console shows response time categorization

### Test 5: Streak Tracking
**Steps:**
1. Start Bonds, Level 3
2. Get 5 correct in a row
3. Get 1 incorrect
4. Get 3 correct in a row
5. Get 2 incorrect in a row

**Expected:**
- Current streak resets after each incorrect
- Best streak recorded as 5
- Consecutive errors tracked: max 2
- Console logs show streak updates
- `updateBestStreak()` called for session

---

## Confidence Meter

### Test 6: Confidence Meter Initialization
**Steps:**
1. Enable adaptive system
2. Start practice session
3. Observe confidence meter before answering questions

**Expected:**
- Meter appears at top of screen
- Shows "Confidence: Calculating..."
- Value shows "--"
- Progress bar at 0%
- Message: "Answer a few more questions"

### Test 7: Confidence Meter Updates
**Steps:**
1. Answer 5 questions correctly in a row
2. Observe confidence meter after each answer

**Expected:**
- After Q1-Q4: Still shows "Calculating..."
- After Q5: Shows actual confidence score
- Score updates in real-time
- Color reflects performance level
- Smooth animations on updates

### Test 8: Confidence Zones - Critical (Red)
**Steps:**
1. Start Fractions, Level 4 (intentionally too hard)
2. Answer 5+ questions:
   - Get < 30% correct
   - Take long time on each (8+ seconds)
   - Show signs of struggling

**Expected:**
- Confidence score: <30
- Meter color: RED
- Label: "Confidence: Critical"
- Message: "These questions are very tricky..."
- Pulse warning animation active
- Console: Struggling indicators detected

### Test 9: Confidence Zones - Optimal (Green)
**Steps:**
1. Start Counting, Level 2
2. Answer 8 questions:
   - Get 70-80% correct
   - Moderate response times (4-6s)
   - Occasional streak breaks

**Expected:**
- Confidence score: 65-85
- Meter color: GREEN
- Label: "Confidence: Optimal"
- Message: "Great job! You're learning well at this level!"
- No pulse animations
- ZPD (Zone of Proximal Development) range

### Test 10: Confidence Zones - Excelling (Blue)
**Steps:**
1. Start Counting, Level 1
2. Answer 10 questions:
   - Get 90%+ correct
   - Very fast responses (<3s)
   - High streaks

**Expected:**
- Confidence score: >85
- Meter color: BLUE
- Label: "Confidence: Excelling"
- Message: "You're doing brilliantly!..."
- Pulse success animation active
- System prepares to suggest harder level

---

## Intervention Triggers

### Test 11: First Checkpoint (Q5)
**Steps:**
1. Start practice session
2. Answer exactly 5 questions with 20% accuracy
3. Wait for intervention check

**Expected:**
- No intervention before Q5
- After Q5: System checks confidence
- If struggling (confidence <40): Intervention triggered
- Console: "🎯 AdaptiveDifficultyEngine: Q5 checkpoint - Confidence: X (Y)"

### Test 12: Subsequent Checkpoints (Q10, Q15, Q20)
**Steps:**
1. Continue session without accepting/declining intervention
2. Answer Q6-Q10
3. Observe checkpoint at Q10

**Expected:**
- Checkpoint triggered at Q10
- Next checkpoint at Q15 (if session continues)
- Final checkpoint at Q20
- Console logs each checkpoint evaluation

### Test 13: Max Interventions Per Session
**Steps:**
1. Start 20-question session
2. Accept first intervention (appears around Q5)
3. Continue to Q10+ and trigger another

**Expected:**
- First intervention shown normally
- Second intervention shows dialog
- Third intervention NOT shown (max 1 per session)
- Console: "Max interventions (1) reached for this session"

### Test 14: Intervention Skipped (Power-Up Active)
**Steps:**
1. Get 3 correct in a row to unlock power-up
2. Trigger checkpoint (e.g., Q5)
3. Power-up button is visible

**Expected:**
- Intervention check runs but doesn't show modal
- Power-up takes precedence
- Console: Intervention silently skipped
- After power-up used, interventions resume

---

## Level Adjustments

### Test 15: Suggest Easier Level (Struggling)
**Steps:**
1. Start Multiply, Level 3, 15 questions
2. Answer first 5-10 questions poorly:
   - <40% accuracy
   - Slow responses
   - Multiple consecutive errors
3. Wait for intervention dialog

**Expected:**
- Suggestion modal appears
- Icon: 🤝 (helping hand)
- Title: "Let's Make It Easier"
- Message: Child-friendly, supportive
- Level visualization: L3 → L2
- Two buttons: "Try Easier Level" | "Keep Trying This Level"
- No pressure to accept

**Test acceptance:**
1. Click "Try Easier Level"
2. Observe transition

**Expected:**
- Modal closes immediately
- Celebratory overlay: 🤝 "Good Choice!"
- After 2.5s, new questions at L2
- Current question index maintained
- Remaining questions generated at L2
- Console: "Student ACCEPTED level change: L3 → L2"

**Test decline:**
1. Click "Keep Trying This Level"
2. Continue session

**Expected:**
- Modal closes
- Session continues at L3
- No penalty or negative message
- Console: "Student DECLINED adaptive suggestion"

### Test 16: Suggest Harder Level (Excelling)
**Steps:**
1. Start Counting, Level 2, 15 questions
2. Answer first 8-10 questions:
   - >85% accuracy
   - Fast responses (<3s)
   - High streaks
3. Wait for intervention (around Q10)

**Expected:**
- Suggestion modal appears
- Icon: 🌟 (star)
- Title: "Ready for a Challenge?"
- Message: "You're doing brilliantly!..."
- Level visualization: L2 → L3
- Two buttons: "Try Harder Level" | "Stay at This Level"

**Test acceptance:**
1. Click "Try Harder Level"

**Expected:**
- Overlay: 🌟 "Challenge Accepted!"
- Transition to L3
- More difficult questions
- Intervention recorded with `accepted: true`

### Test 17: Module Switch Suggestion (Level 1 Struggling)
**Steps:**
1. Start Fractions, Level 1, 15 questions
2. Perform very poorly:
   - <30% accuracy
   - Signs of critical struggling
3. Wait for intervention

**Expected:**
- Suggestion modal appears
- Icon: 🎯
- Title: "Let's Try Something Different"
- Message: Suggests trying different module
- No level visualization (module switch)
- Buttons: "Choose Different Module" | "Keep Practicing"

**Test acceptance:**
1. Click "Choose Different Module"

**Expected:**
- Session ends immediately
- Returns to setup screen
- Student can select different module
- Supportive messaging

### Test 18: No Intervention Needed (Optimal)
**Steps:**
1. Start Bonds, Level 3, 20 questions
2. Maintain 65-80% accuracy throughout
3. Complete all checkpoints (Q5, Q10, Q15, Q20)

**Expected:**
- No intervention modals appear
- Confidence stays in green (optimal) zone
- Console logs show checkpoints evaluated
- Message: "Performance within range" / "No intervention needed"
- Student completes session naturally

---

## Data Persistence

### Test 19: Intervention History Recording
**Steps:**
1. Complete session with 2 interventions:
   - First: Suggest easier (accept)
   - Wait for level adjustment
2. Complete session
3. Open browser console
4. Check intervention history

**JavaScript Console:**
```javascript
import storageManager from './src/core/storageManager.js';
const student = storageManager.getCurrentStudent();
const history = storageManager.getInterventionHistory(student.id);
console.log(history);
```

**Expected:**
- History array contains intervention records
- Each record includes:
  - `timestamp`, `sessionId`, `moduleId`
  - `currentLevel`, `suggestedLevel`, `type`
  - `accepted` (true/false)
  - `confidenceScore`, `confidenceLevel`
  - `triggeredAt` (question number)

### Test 20: Intervention Statistics
**Steps:**
1. Complete 5 sessions with mix of:
   - 3 accepted interventions (2 decrease, 1 increase)
   - 2 declined interventions
2. Check intervention stats

**JavaScript Console:**
```javascript
const stats = storageManager.getInterventionStats(student.id);
console.log(stats);
```

**Expected:**
- `totalInterventions`: 5
- `acceptedCount`: 3
- `declinedCount`: 2
- `acceptanceRate`: 60
- `byType`: Breakdown showing counts per type
- `mostCommonType`: "decrease" (if applicable)
- `recentInterventions`: Last 5 interventions

### Test 21: Adaptive Profile Persistence
**Steps:**
1. Toggle adaptive learning OFF
2. Complete practice session (no adaptive features)
3. Refresh browser
4. Check toggle state

**Expected:**
- Toggle state persists (OFF)
- No adaptive features in new session
- Setting stored in student's adaptiveProfile
- Can be re-enabled anytime

---

## Edge Cases

### Test 22: No Student Selected
**Steps:**
1. Ensure no student is selected
2. Start practice session

**Expected:**
- No confidence meter appears
- No performance tracking
- No interventions
- Practice session works normally (Phase 0-4 features)
- Console: "ℹ No student selected - session tracking disabled"

### Test 23: Adaptive Disabled
**Steps:**
1. Select student
2. Toggle adaptive learning OFF
3. Start practice session

**Expected:**
- Confidence meter does not appear
- Performance tracking disabled
- No interventions
- Normal practice session
- Setting persists

### Test 24: Rapid Question Answering
**Steps:**
1. Enable adaptive system
2. Start session
3. Answer 10 questions as fast as possible (<1s each)

**Expected:**
- All answers tracked
- Response times recorded accurately
- Fast incorrect answers flagged as possible guessing
- Confidence calculated despite speed
- No performance issues

### Test 25: Level Already at Maximum (L4)
**Steps:**
1. Start session at Level 4
2. Excel (>85% accuracy)
3. Trigger intervention checkpoint

**Expected:**
- Confidence meter shows blue (excelling)
- No intervention triggered (already at max)
- Console may log: "Already at max level, no intervention"
- Session continues normally

### Test 26: Level Already at Minimum (L1)
**Steps:**
1. Start Counting, Level 1
2. Struggle (<30% accuracy)
3. Trigger intervention checkpoint

**Expected:**
- Intervention suggests switching modules (not going below L1)
- Message: "Let's Try Something Different"
- Option to choose different module
- Supportive, non-judgmental language

### Test 27: Intervention During Power-Up
**Steps:**
1. Get 3-streak to unlock power-up
2. Ensure checkpoint question aligns (e.g., Q5)
3. Power-up button appears

**Expected:**
- Power-up takes precedence
- Intervention skipped or delayed
- No modal overlap
- After power-up handled, adaptive resumes

### Test 28: Intervention Acceptance Then Immediate Finish
**Steps:**
1. Answer 12/20 questions
2. Accept intervention to change level
3. Complete remaining 8 questions at new level

**Expected:**
- Level change successful
- Questions generated at new level
- Session completes normally
- Final results show mixed levels (correct)
- Storage records level change

---

## Integration Testing

### Test 29: Adaptive + Power-Up System (Phase 3)
**Steps:**
1. Start session with adaptive enabled
2. Get 3-streak, activate power-up (L2→L3)
3. At L3, trigger adaptive intervention suggesting L2

**Expected:**
- Power-up works correctly
- Adaptive intervention can still occur
- Student can accept adaptive suggestion (L3→L2)
- No conflicts between systems
- Both recorded in session data

### Test 30: Adaptive + Module Completion (Phase 3.5)
**Steps:**
1. Complete module while adaptive is monitoring
2. Get intervention suggesting level up
3. Accept, complete module

**Expected:**
- Module completion detection works
- Adaptive suggestions don't interfere
- Trophy badge still awarded
- Both systems log correctly

### Test 31: Adaptive + Student Progress Tracking (Phase 4)
**Steps:**
1. Complete session with adaptive intervention accepted
2. View Progress Dashboard
3. Check session details

**Expected:**
- Session includes intervention data
- Level changes recorded correctly
- Dashboard shows accurate stats
- Intervention history accessible
- Export includes adaptive data

### Test 32: Adaptive + Question Deduplication (Phase 1)
**Steps:**
1. Complete session with adaptive intervention
2. Level changes from L2→L3 mid-session
3. Check question history

**Expected:**
- All questions tracked in history
- Questions from both L2 and L3 recorded
- No duplicates in next session
- Cooldown applies to all questions

---

## Performance Testing

### Test 33: Confidence Calculation Performance
**Steps:**
1. Complete 20-question session
2. Monitor console for timing logs
3. Observe lag/delay after each answer

**Expected:**
- Confidence calculation: <50ms
- No noticeable lag
- Meter updates smoothly
- No dropped frames in animation

### Test 34: Intervention Check Performance
**Steps:**
1. Complete session with multiple checkpoints
2. Monitor performance at Q5, Q10, Q15, Q20

**Expected:**
- Intervention check: <100ms
- No delay in showing next question
- Modal appears smoothly if triggered
- No performance degradation

### Test 35: Large Session Data
**Steps:**
1. Complete 10 sessions with interventions
2. Check localStorage size
3. Verify intervention history (max 50 entries)

**Expected:**
- Intervention history capped at 50 per student
- Old entries automatically removed
- Storage stays reasonable (<1MB)
- No performance impact

---

## Regression Testing (Phases 0-4)

### Test 36: Basic Question Flow
**Steps:**
1. Enable adaptive system
2. Complete standard practice session
3. Verify all Phase 0 features work

**Expected:**
- Questions generate correctly
- Answer validation works
- Results screen appears
- Scoring accurate
- No adaptive interference with basic flow

### Test 37: Streak Tracking
**Steps:**
1. With adaptive enabled
2. Get 3-streak for power-up
3. Also trigger adaptive intervention

**Expected:**
- Streak counter works
- Power-up button appears
- Confidence meter shows correctly
- No visual conflicts

### Test 38: Student Management
**Steps:**
1. Create new student with adaptive enabled
2. Switch students mid-session
3. Adaptive profile created for new student

**Expected:**
- Each student has own adaptive profile
- Settings don't mix between students
- Intervention history separate
- Toggle state persists per student

### Test 39: Export/Import with Adaptive Data
**Steps:**
1. Export student with intervention history
2. Delete student
3. Import back
4. Check adaptive profile and history

**Expected:**
- Adaptive profile included in export
- Intervention history included
- All data restored on import
- Toggle state preserved

---

## Browser Compatibility

Test in:
- ✅ Chrome 90+ (primary)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Test on:
- ✅ Desktop (1920x1080)
- ✅ Tablet (iPad, 1024x768)
- ✅ Mobile (375x667)

---

## Known Limitations

1. **Max 1 Intervention Per Session**: By design to avoid disruption
2. **Confidence Requires 5+ Questions**: Need data for accurate calculation
3. **Intervention Timing**: Only at checkpoints (Q5, Q10, Q15, Q20)
4. **History Cap**: 50 interventions max per student (auto-cleanup)
5. **No Cross-Device Sync**: Adaptive profiles stored locally only

---

## Success Criteria

✅ Phase 5 is successful if:

1. **Adaptive System Control**
   - Can enable/disable per student
   - Setting persists across sessions
   - Works correctly when disabled (no adaptive features)

2. **Performance Tracking**
   - Accurately tracks all question results
   - Calculates response times correctly
   - Maintains rolling window (last 5 questions)
   - Detects struggling patterns

3. **Confidence Meter**
   - Displays correctly at top of practice screen
   - Updates in real-time after each question
   - Shows appropriate colors for confidence zones
   - Animations smooth and non-intrusive

4. **Interventions**
   - Trigger at appropriate times (checkpoints)
   - Suggestions match performance (struggling→easier, excelling→harder)
   - Modals are child-friendly and supportive
   - Student can accept or decline freely

5. **Level Adjustments**
   - Level changes work smoothly
   - Questions generated at new level
   - Transition overlays appear correctly
   - Both power-up and adaptive changes work

6. **Data Persistence**
   - Intervention history recorded
   - Statistics calculated correctly
   - Adaptive profile persists
   - Export/import includes adaptive data

7. **Performance**
   - No lag during confidence calculations
   - Smooth animations
   - Intervention checks fast (<100ms)
   - Storage remains reasonable

8. **Backward Compatibility**
   - Phases 0-4 features unchanged
   - Works with existing student data
   - Can be disabled (falls back to normal mode)
   - No breaking changes

---

## Bug Reporting Template

**Environment:**
- Browser & version:
- Device type:
- Screen size:
- Student selected: Yes/No
- Adaptive enabled: Yes/No

**Steps to reproduce:**
1. ...
2. ...
3. ...

**Expected behavior:**
...

**Actual behavior:**
...

**Console errors:**
```
...
```

**Intervention data (if applicable):**
```javascript
storageManager.getInterventionHistory(studentId)
```

---

**Phase 5 Testing Complete!** 🎉

All tests passing = Adaptive Difficulty Engine is production-ready!
