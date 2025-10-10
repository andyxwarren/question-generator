# Phase 4 Testing Guide: Progress Persistence

Comprehensive testing scenarios for student management, session tracking, and progress analytics.

## Table of Contents
1. [Setup](#setup)
2. [Student Management](#student-management)
3. [Session Tracking](#session-tracking)
4. [Progress Dashboard](#progress-dashboard)
5. [Level Recommendations](#level-recommendations)
6. [Data Management](#data-management)
7. [Edge Cases](#edge-cases)
8. [Performance Testing](#performance-testing)

---

## Setup

### Prerequisites
- Clear localStorage before testing: Open browser console → `localStorage.clear()` → Refresh
- Or use incognito/private browsing mode
- Ensure app is running on a web server (not file://)

### Initial State
- App should work normally without student selection (Phase 0-3.5 features intact)
- No student info section visible on setup screen initially

---

## Student Management

### Test 1: Create First Student
**Steps:**
1. Load app
2. Click "Select Student" button
3. Click "+ Create New Student"
4. Enter name: "Emma Watson"
5. Enter year: "Year 3"
6. Click "Create Student"

**Expected:**
- Student selector closes after ~800ms
- Setup screen refreshes with Emma's info card
- Stats show: 0 sessions, 0% accuracy, 0/4 complete
- Student is marked as current (persists on refresh)

**Console log should show:**
```
✓ Created student profile: Emma Watson (student_[timestamp]_[random])
✓ Selected student: Emma Watson
✓ Set current student: Emma Watson
```

### Test 2: Create Multiple Students
**Steps:**
1. With Emma selected, click "Change Student"
2. Create "Oliver Brown" (Year 4)
3. Create "Sophie Taylor" (Year 2)
4. Create "Jack Wilson" (no year group)

**Expected:**
- All 4 students appear in selector
- Most recently created selected by default
- Students sorted by last active (newest first)
- Jack Wilson shows no year group (blank)

### Test 3: Edit Student
**Steps:**
1. Open student selector
2. Click edit (✏️) button for Emma
3. Change name to "Emma Smith"
4. Change year to "Year 4"
5. Click "Save Changes"

**Expected:**
- Form closes
- Student list refreshes
- Emma's name/year updated
- If Emma was selected, info card updates

### Test 4: Delete Student
**Steps:**
1. Open student selector
2. Click delete (🗑️) button for Sophie
3. Confirm deletion

**Expected:**
- Confirmation dialog explains data loss
- After confirming, Sophie removed from list
- If Sophie was selected, current student becomes null
- All Sophie's sessions deleted from storage

### Test 5: Switch Students
**Steps:**
1. Select Emma
2. Complete a practice session
3. Click "Change Student"
4. Select Oliver

**Expected:**
- Setup screen updates to Oliver's stats (0 sessions)
- Emma's session saved under her profile
- Oliver's separate progress tracked

---

## Session Tracking

### Test 6: Basic Session Tracking
**Steps:**
1. Select Emma
2. Choose Counting, Level 1, 5 questions
3. Complete practice session (answer all questions)
4. View results screen

**Expected:**
- Console shows: `✓ Session tracking enabled for: Emma`
- During practice, each answer logged: `recordQuestionResult`
- On finish: `✓ Session completed: X/5 (Y%)`
- Results show correct total (5 attempted)

### Test 7: Response Time Tracking
**Steps:**
1. Start practice session
2. Take ~3 seconds to answer first question
3. Answer remaining questions quickly
4. Check console logs

**Expected:**
- First question: ~3000ms response time
- Other questions: various response times
- All logged with `timeMs` property

### Test 8: Power-Up Tracking
**Steps:**
1. Start Level 1 session, 10 questions
2. Get 3 correct in a row
3. Click power-up button, confirm
4. Continue session

**Expected:**
- Console: `recordPowerUp` logged
- Session data includes `powerUpsUsed: 1`
- Multiple power-ups increment counter

### Test 9: Streak Tracking
**Steps:**
1. Start practice session
2. Get 5 correct in a row
3. Get 2 incorrect
4. Get 4 correct in a row

**Expected:**
- `updateBestStreak` logged for each new max
- Session stores highest streak (5 in this case)
- Not cumulative across sessions

### Test 10: Early Completion (Level 4)
**Steps:**
1. Select Counting, Level 4, 20 questions
2. Get 3 correct in a row (module completion offer)
3. Click "Complete Module"

**Expected:**
- Session marked with `completedEarly: true`
- Results show 12/12, not 12/20 (FIXED!)
- Percentage calculated on attempted (12)

### Test 11: Anonymous Mode
**Steps:**
1. With NO student selected
2. Complete a practice session

**Expected:**
- Console: `ℹ No student selected - session tracking disabled`
- Session NOT saved to storageManager
- App functions normally (Phase 0-3.5 features)
- Results screen works correctly

---

## Progress Dashboard

### Test 12: View Dashboard (No Data)
**Steps:**
1. Create new student "Test User"
2. Click "View Progress"

**Expected:**
- Dashboard opens
- Overall stats: 0 sessions, 0 questions, 0% accuracy
- All modules show 0/3 for all levels
- Recent sessions: "No practice sessions yet"

### Test 13: Overall Statistics
**Steps:**
1. Complete 5 practice sessions with Emma
2. Vary modules, levels, and performance
3. Open dashboard

**Expected:**
- Total sessions: 5
- Total questions: sum of all answered
- Overall accuracy: weighted average
- Best streak: highest ever achieved
- Total power-ups: sum across sessions
- Completed modules: count with 🏆
- Avg session time: average duration
- Last active: most recent session date

### Test 14: Module Progress Breakdown
**Steps:**
1. Complete sessions for Counting:
   - Level 1: 5 correct (shows 5/3, green bar full)
   - Level 2: 2 correct (shows 2/3, bar 66%)
   - Level 3: 0 correct (shows 0/3, bar empty)
   - Level 4: 3 correct (shows 3/3, green bar full)

**Expected:**
- Counting module shows all 4 level bars
- Levels 1 & 4 marked complete (green)
- Level 2 shows 66% progress
- Level 3 empty
- Module NOT marked complete (missing L3)
- Recent performance shown (avg accuracy, trend)

### Test 15: Module Completion Badge
**Steps:**
1. Complete all 4 levels for Counting (3+ each)

**Expected:**
- Counting module card gets green background
- "🏆 Complete" badge appears
- Module outlined in green border
- Still shows level progress bars

### Test 16: Performance Trends
**Steps:**
1. Complete 3 sessions for Bonds L2:
   - Session 1: 40% accuracy
   - Session 2: 60% accuracy
   - Session 3: 80% accuracy

**Expected:**
- Bonds module shows "Trend: 📈" (improving)
- Recent accuracy: average of last 3 (60%)
- Trend color: green

**Test declining:**
- 80% → 60% → 40% = "Trend: 📉" (declining, red)

**Test stable:**
- 70% → 68% → 72% = "Trend: ➡️" (stable, gray)

### Test 17: Recent Sessions List
**Steps:**
1. Complete 5+ sessions across different modules/levels
2. Open dashboard

**Expected:**
- Sessions listed newest first
- Each shows: module icon, name, level, date, time
- Stats: score (X/Y), accuracy (%), time
- Power-ups shown if used: "⚡ 2"
- Best streak shown if >0: "🔥 5"

### Test 18: Recommended Levels Indicator
**Steps:**
1. Complete 3 sessions at Counting L2 with 85%+ accuracy
2. Open dashboard

**Expected:**
- Counting module shows L3 with "💡" icon
- Level 3 bar has golden outline
- Indicates system recommends trying L3

---

## Level Recommendations

### Test 19: Recommendation Notification
**Steps:**
1. Complete 2 sessions at Multiply L3 with 85%+ accuracy
2. Return to setup screen
3. Select Multiply module again

**Expected:**
- Yellow notification appears at top
- "💡 Based on your recent performance, we recommend Level 4 (Exceeding) for this module."
- Two buttons: "Apply Recommendation" and "×"
- Auto-dismisses after 10 seconds

### Test 20: Apply Recommendation
**Steps:**
1. Trigger recommendation (as above)
2. Click "Apply Recommendation"

**Expected:**
- Notification closes immediately
- Level 4 card becomes selected
- Difficulty level changed to 4

### Test 21: Dismiss Recommendation
**Steps:**
1. Trigger recommendation
2. Click "×" button

**Expected:**
- Notification closes immediately
- Selected level unchanged

### Test 22: Recommendation Logic

**High performance (80%+):** Recommend one level up
- L1 with 85% → Recommend L2
- L2 with 90% → Recommend L3
- L3 with 82% → Recommend L4
- L4 with 95% → Stay at L4 (max)

**Medium performance (60-79%):** Stay at same level
- L2 with 70% → Recommend L2

**Low declining performance (<60%):** Recommend one level down
- L3 with 55% declining → Recommend L2
- L1 with 45% → Stay at L1 (min)

**Insufficient data (<2 sessions):** Use preference
- New module → Default to Level 3

---

## Data Management

### Test 23: Export Student Data
**Steps:**
1. Select Emma (with session history)
2. Open Progress Dashboard
3. Click "💾 Export My Data"

**Expected:**
- File downloads: `maths-practice-Emma-Watson-[timestamp].json`
- JSON contains: student profile + all sessions
- File size ~1-50KB depending on sessions
- Feedback: "Data exported successfully! 💾"

### Test 24: Import Student Data
**Steps:**
1. Export Emma's data
2. Delete Emma from selector
3. Dashboard → "📥 Import Data"
4. Select Emma's JSON file

**Expected:**
- Success message: "✓ Imported: 1 student(s), X session(s)"
- Emma reappears in selector with new ID
- All sessions restored
- Progress bars match original

### Test 25: Storage Information
**Steps:**
1. Create 3 students with 10 sessions each
2. Dashboard → "📊 Storage Details"

**Expected:**
- Shows size in KB and MB
- Usage percentage (<5%)
- Student count: 3
- Session count: 30
- Oldest/newest session dates
- Note about 30-day cleanup

### Test 26: Automatic Cleanup
**Steps:**
1. Manually create old session (dev tools):
```javascript
import storageManager from './src/core/storageManager.js';
const session = storageManager.data.sessions.session_123;
session.completedAt = Date.now() - (31 * 24 * 60 * 60 * 1000); // 31 days ago
storageManager.save();
```
2. Reload app

**Expected:**
- Console: "🧹 Cleaned up X old sessions (>30 days)"
- Old session removed from storage
- Recent sessions unaffected

### Test 27: Storage Quota Handling
**Steps:**
1. Monitor storage in dashboard
2. If approaching 5MB limit (very unlikely)

**Expected:**
- Export functionality still works
- Console warning if quota exceeded
- Alert suggests exporting and cleanup

---

## Edge Cases

### Test 28: No Student Selected
**Steps:**
1. Ensure no student selected (null)
2. Complete practice session
3. Try to open Progress Dashboard

**Expected:**
- Practice works normally (no tracking)
- Dashboard shows alert: "No student selected. Please select a student to view progress."
- No errors in console

### Test 29: Corrupt Data Recovery
**Steps:**
1. Create student with sessions
2. Corrupt localStorage:
```javascript
localStorage.setItem('mathsPractice_storage', 'invalid-json');
```
3. Reload app

**Expected:**
- Console error: "Failed to load from localStorage"
- App initializes with fresh data
- No crash, works normally

### Test 30: Rapid Student Switching
**Steps:**
1. Create 3 students
2. Rapidly switch between them (5+ times/second)
3. Start practice session

**Expected:**
- Last selected student active
- No duplicate sessions
- No console errors
- Correct student tracked

### Test 31: Browser Back/Forward
**Steps:**
1. Select student
2. Complete session
3. Browser back → forward

**Expected:**
- Student selection persists
- No duplicate data
- App state correct

### Test 32: Multiple Tabs
**Steps:**
1. Open app in Tab A, select Emma
2. Open app in Tab B (same browser)
3. Complete session in Tab A
4. Refresh Tab B

**Expected:**
- Both tabs share same localStorage
- Tab B shows Emma's updated stats
- Data consistency maintained

### Test 33: Empty Student Name
**Steps:**
1. Try to create student with empty name
2. Try to create student with only spaces

**Expected:**
- Form validation prevents submission
- Or `.trim()` converts to empty string
- Cannot create nameless student

### Test 34: Special Characters in Name
**Steps:**
1. Create student: "O'Brien <Test> & Co."
2. View in selector and dashboard

**Expected:**
- Name displayed correctly (no XSS)
- HTML escaped: `O'Brien &lt;Test&gt; & Co.`
- Export filename sanitized: `O-Brien-Test-Co`

### Test 35: Very Long Session (100+ questions)
**Steps:**
1. Start 20-question session
2. Power up multiple times
3. Complete 100+ total questions

**Expected:**
- All questions tracked
- Storage size reasonable (<100KB)
- Dashboard loads quickly
- No performance degradation

---

## Performance Testing

### Test 36: Large Data Set
**Steps:**
1. Create 10 students
2. Each completes 20 sessions
3. Total: 200 sessions

**Expected:**
- App remains responsive
- Dashboard loads < 2 seconds
- Selector loads < 1 second
- localStorage < 1MB

### Test 37: Dashboard Rendering Speed
**Steps:**
1. Student with 50+ sessions
2. Open Progress Dashboard
3. Measure time to render

**Expected:**
- Dashboard appears < 1 second
- All stats calculated correctly
- Smooth scrolling
- No lag

### Test 38: Export/Import Performance
**Steps:**
1. Export student with 100 sessions
2. Import back

**Expected:**
- Export completes < 1 second
- File size ~50-100KB
- Import completes < 2 seconds
- No data loss

---

## Regression Testing (Phases 0-3.5)

Ensure Phase 4 doesn't break existing features:

### Test 39: Question Deduplication (Phase 1)
**Steps:**
1. Complete session with student tracking
2. Immediately start new session (same module/level)
3. Verify no duplicate questions

**Expected:**
- History system still works
- Questions tracked in questionHistory
- Cooldown respected
- No duplicates

### Test 40: On-Screen Keyboard (Phase 2)
**Steps:**
1. Test on touch device or simulate
2. With student tracking enabled

**Expected:**
- Keyboard appears for text input
- Submit works correctly
- Response times tracked
- No conflicts

### Test 41: Power-Up System (Phase 3)
**Steps:**
1. Get 3-streak
2. Use power-up
3. Level changes mid-session

**Expected:**
- Power-up button appears
- Confirmation dialog works
- Level transition smooth
- Streak resets to 0
- Power-up count tracked

### Test 42: Module Completion (Phase 3.5)
**Steps:**
1. Complete all levels for a module (3+ each)
2. See completion prompt

**Expected:**
- Auto-marks complete (no prompt)
- Trophy badge appears on setup screen
- Works with storage tracking
- Integrated with dashboard

---

## Browser Compatibility

Test in:
- ✅ Chrome 90+ (primary target)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Test on:
- ✅ Desktop (1920x1080)
- ✅ Tablet (iPad, 1024x768)
- ✅ Mobile (375x667)

---

## Known Limitations

1. **localStorage Size**: 5MB typical limit (handles ~1000+ sessions)
2. **No Cloud Sync**: Data stored locally only
3. **No Multi-User Login**: Manual student selection required
4. **30-Day Retention**: Older sessions auto-deleted
5. **Single Device**: Data doesn't sync across devices (export/import required)

---

## Console Commands (Dev Tools)

Useful commands for testing:

```javascript
// Import storageManager
import storageManager from './src/core/storageManager.js';

// View all students
storageManager.getAllStudents();

// Get current student
storageManager.getCurrentStudent();

// View stats
storageManager.getStudentStats('student_id_here');

// Get storage info
storageManager.getStorageInfo();

// Export data
const json = storageManager.exportData();
console.log(json);

// Clear all data
storageManager.clearAllData();

// View recent sessions
storageManager.getStudentSessions('student_id_here', { limit: 5 });

// Check recommendations
storageManager.getRecommendedLevel('student_id_here', 'counting');
```

---

## Success Criteria

✅ Phase 4 is successful if:

1. **Core Functionality**
   - Students can be created, edited, deleted
   - Sessions track all data (questions, times, streaks, power-ups)
   - Progress persists across browser sessions
   - Anonymous mode works (no student selected)

2. **Dashboard**
   - Shows accurate overall statistics
   - Displays per-module progress
   - Lists recent sessions with details
   - Export/import works correctly

3. **Recommendations**
   - Algorithm suggests appropriate levels
   - Notifications appear when relevant
   - Can apply or dismiss recommendations

4. **Performance**
   - App remains fast with 100+ sessions
   - No console errors under normal use
   - Storage stays under 1MB for typical usage

5. **Data Integrity**
   - No data loss on page refresh
   - Export/import preserves all data
   - Cleanup doesn't delete recent sessions

6. **Backward Compatibility**
   - Phases 0-3.5 features still work
   - Can use app without student tracking
   - No breaking changes to existing workflow

---

## Bug Reporting Template

If you find issues, report with:

**Environment:**
- Browser & version
- Device type
- Screen size

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

**localStorage size:**
```javascript
storageManager.getStorageInfo()
```

---

**Phase 4 Testing Complete!** 🎉

All tests passing = Phase 4 is production-ready!
