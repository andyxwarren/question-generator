# Phase 2: On-Screen Keyboard - Testing Guide

**Feature**: Touch-optimized calculator-style keyboard for text input questions
**Status**: Implementation Complete
**Last Updated**: 2025-10-10

---

## Overview

The On-Screen Keyboard feature provides a touch-optimized number pad for text input questions. It only appears on touch devices (tablets, phones) and allows desktop users to continue using their native keyboard.

---

## Quick Test Checklist

### ✅ Desktop/Mouse Testing
- [ ] Text input questions show standard text input
- [ ] Native keyboard appears when clicking input
- [ ] Submit button is visible and works
- [ ] On-screen keyboard is NOT visible
- [ ] Enter key submits answer
- [ ] All number/symbol keys work normally

### ✅ Touch Device Testing (iPad/Tablet)
- [ ] On-screen keyboard appears for text input questions
- [ ] Native keyboard does NOT appear
- [ ] Original submit button is hidden
- [ ] All keyboard keys are responsive
- [ ] Keyboard doesn't obscure question content
- [ ] Haptic feedback works (if supported)

---

## Detailed Testing Scenarios

### Test 1: Desktop Browser Behavior

**Environment**: Chrome/Firefox/Safari on desktop with mouse

**Steps**:
1. Start the application: `python -m http.server 8000`
2. Navigate to http://localhost:8000
3. Select any module (e.g., "Counting")
4. Select any level (e.g., "Level 1")
5. Set question count to 10
6. Click "Start Practice"
7. Look for a text input question (may need to go through multiple questions)

**Expected Results**:
- ✅ Standard text input field appears
- ✅ Native keyboard works normally when typing
- ✅ Submit button is visible below input
- ✅ On-screen calculator keyboard is NOT visible
- ✅ Pressing Enter key submits the answer
- ✅ Can type any character using keyboard

**Failure Indicators**:
- ❌ On-screen keyboard visible on desktop
- ❌ Native keyboard doesn't work
- ❌ Submit button missing

---

### Test 2: Touch Device Behavior (iPad)

**Environment**: iPad (iOS 14+) or Android tablet

**Steps**:
1. Access application URL on iPad
2. Select module and level
3. Start practice session
4. Wait for text input question

**Expected Results**:
- ✅ On-screen calculator keyboard appears at bottom of screen
- ✅ Native keyboard does NOT appear when tapping input
- ✅ Original submit button is hidden (keyboard has its own submit)
- ✅ Question text remains visible above keyboard
- ✅ Input field shows "readonly" with no cursor

**Failure Indicators**:
- ❌ Native keyboard appears
- ❌ On-screen keyboard missing
- ❌ Keyboard obscures question content
- ❌ Both submit buttons visible

---

### Test 3: Keyboard Key Functionality

**Environment**: Touch device (iPad/tablet)

**Test each key individually**:

| Key | Expected Behavior | Test |
|-----|-------------------|------|
| **0-9** | Appends digit to input | ☐ |
| **.** (decimal) | Appends once, prevents multiple decimals | ☐ |
| **−** (minus) | Only works at start of input | ☐ |
| **÷** (divide) | Appends division symbol | ☐ |
| **⌫** (backspace) | Removes last character | ☐ |
| **✓ Submit** | Submits answer for validation | ☐ |

**Steps for decimal test**:
1. Tap numbers: 1, 2, .
2. Result should be: `12.`
3. Tap . again
4. Result should still be: `12.` (second decimal prevented)
5. ✅ PASS if only one decimal allowed

**Steps for minus test**:
1. Type: 5
2. Tap minus (−)
3. Result should still be: `5` (minus not allowed in middle)
4. Clear input (backspace)
5. Tap minus first
6. Result should be: `-`
7. Tap 5
8. Result should be: `-5`
9. ✅ PASS if minus only works at beginning

---

### Test 4: Visual Feedback

**Environment**: Touch device

**Steps**:
1. Tap each key slowly
2. Observe visual changes

**Expected Results**:
- ✅ Key scales down slightly when pressed (0.95x)
- ✅ Key changes color on press:
  - Number keys: turn blue
  - Special keys: turn gray
  - Backspace: turns red
  - Submit: slightly darker green
- ✅ Animation completes smoothly (no lag)
- ✅ All transitions under 100ms

**Failure Indicators**:
- ❌ No visual feedback on key press
- ❌ Laggy or jerky animations
- ❌ Keys don't change appearance

---

### Test 5: Haptic Feedback

**Environment**: iOS device with haptic support

**Steps**:
1. Ensure device is not on silent mode
2. Tap keyboard keys
3. Feel for vibration

**Expected Results**:
- ✅ Brief 10ms vibration on each key press
- ✅ Consistent across all keys

**Note**: Android devices may not support Navigator.vibrate(). This is expected behavior - keyboard still works without haptics.

---

### Test 6: Answer Submission Flow

**Environment**: Touch device

**Steps**:
1. Wait for text input question (e.g., "What is 2 + 3?")
2. Use keyboard to type: 5
3. Tap Submit (✓) button on keyboard

**Expected Results**:
- ✅ Answer validates correctly
- ✅ Feedback appears (Correct/Incorrect)
- ✅ Keyboard keys become disabled
- ✅ "Next Question" button appears
- ✅ Can proceed to next question
- ✅ Keyboard re-enables for next text input question

**Failure Indicators**:
- ❌ Submit doesn't trigger validation
- ❌ Keyboard remains enabled after submission
- ❌ Can't proceed to next question

---

### Test 7: Question Transition

**Environment**: Touch device

**Steps**:
1. Answer a text input question
2. Click "Next Question"
3. If next question is multiple choice, observe keyboard
4. Click "Next Question" again
5. If next question is text input, observe keyboard

**Expected Results**:
- ✅ Keyboard disappears for multiple choice questions
- ✅ Keyboard reappears for text input questions
- ✅ Previous input is cleared
- ✅ Keyboard is re-enabled (not disabled from previous question)
- ✅ No errors in browser console

**Failure Indicators**:
- ❌ Keyboard doesn't hide for non-text questions
- ❌ Keyboard doesn't reappear for text input
- ❌ Multiple keyboards visible
- ❌ Console errors

---

### Test 8: Touch Device Detection

**Environment**: Desktop browser with dev tools

**Steps**:
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPad" or "iPad Pro" from device list
4. Reload page
5. Start practice session with text input

**Expected Results**:
- ✅ On-screen keyboard appears in device emulation mode
- ✅ Keyboard layout looks correct
- ✅ All functionality works

**Note**: Some features (like haptic feedback) won't work in emulation mode. Physical device testing required for full validation.

---

### Test 9: Responsive Design

**Environment**: Various device sizes

**Test on**:
- iPad (portrait & landscape)
- iPad Pro (portrait & landscape)
- Android tablet (portrait & landscape)
- iPhone (portrait & landscape)

**Expected Results**:

**iPad Portrait (768px width)**:
- ✅ Keys are 60px × 50px minimum
- ✅ 3 keys fit horizontally with spacing
- ✅ Submit button spans 2 key widths
- ✅ All keys easily tappable

**iPad Landscape (1024px width)**:
- ✅ Keys are larger (80px × 60px)
- ✅ Better spacing between keys
- ✅ Font size increases to 1.75rem

**iPhone Portrait (< 480px width)**:
- ✅ Keys shrink slightly (50px × 48px)
- ✅ Submit text hides, only icon shows: ✓
- ✅ Keyboard still usable

---

### Test 10: Accessibility

**Environment**: iPad with VoiceOver enabled

**Steps**:
1. Enable VoiceOver (Settings → Accessibility → VoiceOver)
2. Navigate to text input question
3. Swipe through keyboard keys
4. Double-tap to activate keys

**Expected Results**:
- ✅ Each key is focusable with VoiceOver
- ✅ Key values are announced (e.g., "7 button")
- ✅ Submit button announced as "Submit button"
- ✅ Keys can be activated via double-tap

---

### Test 11: Edge Cases

**Test A: Empty Input Submission**
1. Don't type anything
2. Tap Submit on keyboard
3. Expected: Alert "Please provide an answer!" appears

**Test B: Rapid Key Presses**
1. Quickly tap: 1, 2, 3, 4, 5
2. Expected: All digits appear: `12345`
3. No missed presses, no duplicates

**Test C: Very Long Input**
1. Type 20+ digits
2. Expected: All digits accepted
3. Input field scrolls or shows overflow properly

**Test D: Special Character Combinations**
1. Type: -, 5, ., 7, 5
2. Expected: `-5.75`
3. Try decimal again: Still `-5.75`

---

## Browser Compatibility

### ✅ Tested & Working
- [ ] Chrome 90+ (Desktop)
- [ ] Chrome Mobile (Android)
- [ ] Safari 14+ (Desktop)
- [ ] Safari iOS 14+ (iPad)
- [ ] Firefox 88+ (Desktop)
- [ ] Edge 90+ (Desktop)

### ⚠️ Known Limitations
- **Firefox on Android**: Haptic feedback not supported (expected)
- **Safari < 14**: Touch detection may not work (upgrade recommended)
- **IE 11**: Not supported (modern browsers only)

---

## Performance Benchmarks

### Target Metrics
- Key press response time: < 50ms ✅
- Animation frame rate: 60fps ✅
- Keyboard show/hide: < 300ms ✅
- Memory usage: < 5MB additional ✅

### How to Measure
1. Open Chrome DevTools → Performance tab
2. Start recording
3. Tap keyboard keys multiple times
4. Stop recording
5. Check for:
   - Frame drops (should be green, 60fps)
   - Long tasks (should be < 50ms)

---

## Troubleshooting

### Issue: Keyboard doesn't appear on iPad

**Possible causes**:
1. Browser cache not cleared
2. Old CSS/JS cached
3. Device detection failing

**Solutions**:
1. Hard refresh: Cmd+Shift+R (Safari) or Ctrl+Shift+R (Chrome)
2. Clear browser cache
3. Check browser console for errors
4. Verify `OnScreenKeyboard.isTouchDevice()` returns true

---

### Issue: Native keyboard still appears

**Possible causes**:
1. `inputmode="none"` not applied
2. `readonly` attribute not set
3. Browser doesn't support suppression

**Solutions**:
1. Check input element in DevTools
2. Verify attributes: `inputmode="none" readonly`
3. Try adding `pointer-events: none` to CSS
4. Test on latest browser version

---

### Issue: Keyboard obscures question

**Possible causes**:
1. Insufficient padding on question card
2. Keyboard height miscalculated
3. Layout issue on specific device

**Solutions**:
1. Increase `margin-bottom` on `.question-card` in keyboard.css
2. Test scrolling behavior
3. Add `scroll-margin-bottom` if needed

---

## Success Criteria

Phase 2 is considered **COMPLETE** when:

✅ All 11 test scenarios pass
✅ Works on iPad (primary target device)
✅ Desktop users unaffected (native keyboard works)
✅ No console errors
✅ Performance targets met
✅ Haptic feedback works on supported devices
✅ All 15 keys function correctly
✅ Visual feedback is smooth and responsive
✅ Accessibility requirements met

---

## Next Steps

After Phase 2 is validated:
1. Mark Phase 2 complete in ROADMAP.md ✅
2. Update CLAUDE.md with Phase 2 completion ✅
3. Create release notes
4. Deploy to test environment
5. Gather user feedback from teachers/students
6. Begin Phase 3: Auto Level-Up System

---

## Reporting Issues

If you encounter bugs during testing:

1. **Document**:
   - Device/browser
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

2. **Check console**:
   - Press F12
   - Look for errors (red text)
   - Copy error messages

3. **Report**:
   - Create issue with details
   - Tag as `phase-2` and `bug`
   - Include all documentation

---

**Testing completed by**: _________________
**Date**: _________________
**Status**: ☐ PASS  ☐ FAIL  ☐ NEEDS WORK
