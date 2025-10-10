# Phase 3 Testing Guide: Auto Level-Up System

## Overview
Phase 3 introduces an automatic level-up system that rewards students for getting 3 consecutive correct answers. This guide covers all testing scenarios.

## Quick Test

1. **Start the server**
   ```bash
   python -m http.server 8000
   # or
   npx http-server -p 8000
   ```

2. **Open http://localhost:8000**

3. **Start a practice session**
   - Choose any module
   - Choose Level 1 (Beginning)
   - Select 10 questions
   - Click "Start Practice"

4. **Get 3 correct answers in a row**
   - Answer the first question correctly → see "⭐ 1 in a row!" appear
   - Answer the second question correctly → see "🔥 2 in a row!" with hot styling
   - Answer the third question correctly → see "🔥 3 in a row!" + Power-Up button appears

5. **Click the Power-Up button**
   - Button should have pulsing animation
   - Click should show confirmation dialog
   - Accept to level up → celebration overlay appears
   - After 3 seconds, continue with Level 2 questions

## Component Testing

### 1. Streak Tracker

**Test: Basic Streak Building**
- Start a practice session
- Answer first question correctly
- ✅ Verify: Streak display shows "⭐ 1 in a row!"
- Answer second question correctly
- ✅ Verify: Streak display changes to "🔥 2 in a row!" with hot styling (gradient background)
- Answer third question correctly
- ✅ Verify: Streak display shows "🔥 3 in a row!"

**Test: Streak Reset on Wrong Answer**
- Build a 2-streak
- Answer next question incorrectly
- ✅ Verify: Streak display disappears
- ✅ Verify: Power-up button is not shown (or is hidden if it was visible)

**Test: Streak Continues After Level-Up**
- Build a 3-streak and level up
- Continue answering correctly
- ✅ Verify: Streak continues counting (4, 5, 6...)
- ✅ Verify: Can level up again after reaching 6-streak (if not at max level)

### 2. Power-Up Button

**Test: Button Appearance**
- Build a 3-streak
- ✅ Verify: Button appears in bottom-right corner after brief delay (~800ms)
- ✅ Verify: Button has pulsing animation
- ✅ Verify: Button shows "⚡ Level Up! 3 in a row! 🔥"

**Test: Button Interaction**
- Click the power-up button
- ✅ Verify: Confirmation dialog appears with message about leveling up
- Click "Cancel" in dialog
- ✅ Verify: Button remains visible and functional
- Click button again and choose "OK"
- ✅ Verify: Burst animation plays
- ✅ Verify: Celebration overlay appears

**Test: Button Disappears on Wrong Answer**
- Build a 3-streak (button appears)
- Answer next question incorrectly
- ✅ Verify: Button animates out and disappears
- ✅ Verify: Streak resets to 0

**Test: Button at Max Level**
- Start at Level 4 (Exceeding)
- Build a 3-streak
- ✅ Verify: Power-up button does NOT appear (already at max level)

### 3. Level-Up Flow

**Test: Basic Level-Up**
- Start at Level 1 with 10 questions
- Get 3 correct answers in a row
- Click power-up button and confirm
- ✅ Verify: Celebration overlay appears with "Level 1 → Level 2"
- ✅ Verify: Overlay shows "🎉" icon with rotation animation
- ✅ Verify: Overlay disappears after 3 seconds
- ✅ Verify: Next question is at Level 2 difficulty
- ✅ Verify: Remaining questions are all Level 2

**Test: Multiple Level-Ups in One Session**
- Start at Level 1 with 20 questions
- Get 3 correct → Level up to 2
- Get 3 more correct → Level up to 3
- Get 3 more correct → Level up to 4
- ✅ Verify: Each level-up shows correct overlay (1→2, 2→3, 3→4)
- ✅ Verify: After reaching Level 4, no more power-up buttons appear

**Test: Level-Up Near End of Questions**
- Start at Level 1 with 5 questions
- Get 3 correct → Level up to 2
- ✅ Verify: Only 2 remaining questions
- ✅ Verify: Both remaining questions are Level 2
- Complete session
- ✅ Verify: Results show "leveledUp: true" and "finalLevel: 2"

### 4. Results Screen Integration

**Test: Session with Level-Up**
- Complete a session where you leveled up
- View results screen
- ✅ Verify: Results should indicate level progression (future enhancement)

**Test: Session without Level-Up**
- Complete a session without getting 3-streak
- ✅ Verify: Results show normal completion

## Visual Testing

### Streak Display Styling

**Test: Normal Streak (1 correct)**
```
┌─────────────────┐
│ ⭐ 1 in a row!  │  ← White background, gray border
└─────────────────┘
```

**Test: Hot Streak (2+ correct)**
```
┌─────────────────┐
│ 🔥 2 in a row!  │  ← Gradient background (red to gold)
└─────────────────┘  ← Flame animation, scaled up
```

### Power-Up Button Styling

**Test: Button States**
- Initial: Translated down and invisible
- Visible: Slides up with bounce, pulsing animation
- Hover: Lifts up slightly, shadow increases
- Active: Pressed down slightly
- Activating: Burst animation (scale up, glow)
- Hiding: Slides down and shrinks

### Celebration Overlay

**Test: Overlay Appearance**
```
┌─────────────────────────────┐
│                             │
│         🎉 (spinning)       │  ← Rotation animation
│                             │
│        Level Up!            │  ← Large blue text
│                             │
│      Level 1 → Level 2      │  ← Medium gray text
│                             │
│  Get ready for harder       │
│      questions!             │  ← Smaller gray text
│                             │
└─────────────────────────────┘
       ← White card with shadow, scales in from 0
       ← Dark overlay behind (fades in)
```

## Edge Cases

### Test: Streak Across Questions
- Answer Q1 correctly (streak: 1)
- Answer Q2 correctly (streak: 2)
- Answer Q3 correctly (streak: 3)
- ✅ Verify: Power-up button appears after Q3 feedback
- Click "Next Question" WITHOUT clicking power-up
- Answer Q4 correctly
- ✅ Verify: Streak continues to 4
- ✅ Verify: Can level up at any point while button is visible

### Test: Level-Up During Question
- Build 3-streak (button appears)
- Click "Next Question"
- Answer Q4 correctly (streak: 4)
- Click power-up button
- ✅ Verify: Level-up works correctly
- ✅ Verify: Remaining questions updated to new level

### Test: Decline Level-Up
- Build 3-streak (button appears)
- Click power-up button
- Click "Cancel" in confirmation
- ✅ Verify: Button remains visible
- ✅ Verify: Session continues at current level
- Answer next question correctly
- ✅ Verify: Streak continues, can still level up later

### Test: Lose Streak After Power-Up Available
- Build 3-streak (button appears)
- Don't click power-up button
- Answer next question incorrectly
- ✅ Verify: Streak resets to 0
- ✅ Verify: Power-up button disappears
- ✅ Verify: Must get 3 more correct to level up again

## Mobile/Tablet Testing

### Touch Interactions
- Test on iPad or mobile device
- ✅ Verify: Power-up button is easily tappable (good size)
- ✅ Verify: Confirmation dialog works on mobile
- ✅ Verify: Animations perform smoothly
- ✅ Verify: Streak display is clearly visible

### Responsive Layout
- Test at various screen sizes
- ✅ Verify: Power-up button position adapts (smaller on mobile)
- ✅ Verify: Celebration overlay scales appropriately
- ✅ Verify: Streak display fits in header

## Accessibility Testing

### Reduced Motion
- Enable "Reduce Motion" in OS settings
- ✅ Verify: Animations are disabled or simplified
- ✅ Verify: Power-up button appears without slide-in
- ✅ Verify: Overlay appears without scale animation
- ✅ Verify: Functionality still works correctly

### High Contrast
- Enable high contrast mode
- ✅ Verify: Power-up button has increased border width
- ✅ Verify: Streak display has thicker borders when hot
- ✅ Verify: Text remains readable

### Keyboard Navigation
- Use Tab key to navigate
- ✅ Verify: Power-up button receives focus
- ✅ Verify: Focus outline is visible (white outline)
- ✅ Verify: Enter/Space activates button

## Performance Testing

### Animation Performance
- Build a 3-streak multiple times
- ✅ Verify: No lag or jank in animations
- ✅ Verify: Button appears smoothly on all devices
- ✅ Verify: Celebration overlay doesn't cause layout shift

### Memory Testing
- Complete multiple sessions with level-ups
- Check browser DevTools performance
- ✅ Verify: No memory leaks from power-up button
- ✅ Verify: Overlays are properly removed from DOM
- ✅ Verify: Event listeners are cleaned up

## Console Testing

### No Errors
- Open browser console
- Complete a full session with level-up
- ✅ Verify: No JavaScript errors
- ✅ Verify: No CSS warnings
- ✅ Verify: No failed resource loads

### Debug Logging
- Check for any debug console.logs
- ✅ Verify: No leftover debug statements in production

## Integration Testing

### Test: Complete Flow
1. Start Level 1, 15 questions
2. Get 3 correct → Level up to 2
3. Get 1 wrong → Lose streak
4. Get 3 correct → Level up to 3
5. Complete remaining questions
6. ✅ Verify: Results show correct final level
7. Click "Practice Again"
8. ✅ Verify: New session starts at original Level 1 (not Level 3)

### Test: With Question Deduplication (Phase 1)
- Complete session with level-up
- Start new session same module/level
- ✅ Verify: Question deduplication still works
- ✅ Verify: Doesn't regenerate questions seen in previous session

### Test: With On-Screen Keyboard (Phase 2)
- Use touch device
- Test text input questions
- Build 3-streak using on-screen keyboard
- ✅ Verify: Power-up button doesn't interfere with keyboard
- ✅ Verify: Keyboard remains functional after level-up
- ✅ Verify: Celebration overlay doesn't break keyboard

## Browser Compatibility

Test in the following browsers:
- ✅ Chrome 90+ (desktop & mobile)
- ✅ Firefox 88+
- ✅ Safari 14+ (desktop & iOS)
- ✅ Edge 90+

## Known Limitations

1. **Max Level**: Cannot level up beyond Level 4 (by design)
2. **Session Persistence**: Level-ups only persist within a single session
3. **Streak Across Sessions**: Streak resets when starting new session (by design)
4. **Power-Up at End**: If you get 3-streak on the last question, power-up button appears but has no effect

## Troubleshooting

### Power-Up Button Doesn't Appear
- Check: Did you get exactly 3 consecutive correct answers?
- Check: Are you already at Level 4?
- Check: Open console, look for errors
- Check: Verify `powerUpButton.js` is loaded

### Streak Doesn't Update
- Check: Open console, verify `streakTracker.js` is loaded
- Check: Inspect `#streakDisplayContainer` in DOM
- Check: Verify `updateStreakDisplay()` is being called

### Level-Up Doesn't Work
- Check: Verify `questionEngine` is available globally (`window.questionEngine`)
- Check: Check console for errors in `transitionToNewLevel()`
- Check: Verify remaining questions are generated correctly

### Animations Don't Play
- Check: Verify `powerup.css` is loaded in `<head>`
- Check: Look for CSS errors in DevTools
- Check: Test with reduced motion disabled

## Success Criteria

Phase 3 is complete when:
- ✅ Streak tracking works correctly (increments, resets, displays)
- ✅ Power-up button appears after 3 correct answers
- ✅ Level-up flow works smoothly (confirmation, celebration, transition)
- ✅ New level questions are generated correctly
- ✅ All animations are smooth and performant
- ✅ Mobile/tablet experience is excellent
- ✅ Accessibility features work correctly
- ✅ Integration with Phase 1 & 2 is seamless
- ✅ No console errors or warnings
- ✅ Results screen reflects level-up data

## Next Steps

After Phase 3 is verified:
- Mark Phase 3 as complete in ROADMAP.md
- Update CLAUDE.md with Phase 3 implementation details
- Plan Phase 4: Enhanced Question Types
