# Curriculum Alignment Testing - Quick Summary

**Date**: 2025-11-04
**Status**: ✅ 8/9 PASSED | ⚠️ 1/9 ISSUES

---

## Results

| Module | Priority | Status | Tests Passed | Issues |
|--------|----------|--------|--------------|--------|
| N01_Y5_NPV | CRITICAL | ⚠️ ISSUES | 1/3 (33%) | Negative numbers, out-of-range values |
| N02_Y2_NPV | HIGH | ✅ PASSED | 2/2 (100%) | None |
| N02_Y3_NPV | HIGH | ✅ PASSED | 2/2 (100%) | None |
| N02_Y4_NPV | HIGH | ✅ PASSED | 2/2 (100%) | None |
| N02_Y5_NPV | MEDIUM | ✅ PASSED | 2/2 (100%) | None |
| N02_Y6_NPV | MEDIUM | ✅ PASSED | 2/2 (100%) | None |
| N03_Y4_NPV | MEDIUM | ✅ PASSED | 2/2 (100%) | None |
| N03_Y5_NPV | MEDIUM | ✅ PASSED | 3/3 (100%) | None |
| N01_Y4_NPV | LOW | ✅ PASSED | 1/1 (100%) | None |

---

## N01_Y5_NPV Issues (Generator Bug)

**File**: `src/generators/N01_Y5_NPV_counting.js`

### Problem
Generator allows sequences to go outside the 0-1,000,000 range:

1. **Negative numbers**: Backwards sequences can drop below 0
   - Example: `1,000,000, 900,000, ..., 100,000, 0, -100,000` ❌

2. **Numbers > 1,000,000**: Forward sequences can exceed maximum
   - Example: `0, 100,000, 200,000, ..., 1,000,000, 1,100,000` ❌

### Root Cause
Lines 45-56: Bounds calculation doesn't enforce strict [0, 1,000,000] range for entire sequence

### Fix Required
Update generator to validate ALL sequence numbers stay within bounds:

```javascript
// After generating sequence, validate bounds
const allValid = fullSequence.every(n => n >= 0 && n <= 1000000);
if (!allValid) {
    // Adjust start value or regenerate
}
```

---

## Validation Highlights

### ✅ Successful Updates

**N02_Y2_NPV**: Now includes comparison, ordering, and symbols
- Questions like: "Which symbol completes: 37 ___ 31?" → Answer: >

**N02_Y3_NPV**: Now includes 10/100 more/less operations
- Questions like: "What is 10 more than 152?" → Answer: 162

**N02_Y4_NPV**: Now includes 1,000 more/less operations
- Questions like: "What is 1,000 less than 1,753?" → Answer: 753

**N02_Y5_NPV & N02_Y6_NPV**: Successfully removed place value content
- No `place_value_digit` operations found (correctly moved to N03)

**N03_Y4_NPV**: Description now includes historical context
- Includes `zero_concept` operation at level 4

**N03_Y5_NPV**: Now includes Roman year recognition
- `roman_year` operation with year lists (1066, 1215, 1945, 2000, etc.)

**N01_Y4_NPV**: Description formatting fixed
- Now uses "1,000" with comma (UK style)

---

## Testing Statistics

- **Total Questions Generated**: 360 (40 per module)
- **Modules Tested**: 9
- **Test Types**: Description validation, parameter checks, question generation
- **Pass Rate**: 88.9% (8/9 modules)

---

## Recommendations

1. **Immediate**: Fix N01_Y5_NPV generator bounds checking
2. **Verification**: Re-run tests after fix
3. **Documentation**: Update alignment plan with test results

**Estimated Fix Time**: 15-30 minutes
**Impact**: Critical - affects curriculum accuracy for Year 5 counting

---

## Full Report

See `CURRICULUM_ALIGNMENT_TEST_REPORT.md` for detailed analysis, sample questions, and complete findings.
