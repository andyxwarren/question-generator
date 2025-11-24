# Generator Consolidation Guide

**Purpose:** Determine when and how to consolidate duplicate question generators
**Date:** 2025-11-24
**Project:** UK National Curriculum Mathematics Question Generator

---

## Table of Contents

1. [Overview](#overview)
2. [When to Consolidate](#when-to-consolidate)
3. [When NOT to Consolidate](#when-not-to-consolidate)
4. [Consolidation Process](#consolidation-process)
5. [Files in Scope](#files-in-scope)
6. [Technical Implementation Patterns](#technical-implementation-patterns)
7. [Case Studies](#case-studies)

---

## Overview

### What is Generator Consolidation?

Generator consolidation is the process of merging multiple separate generator files that implement nearly identical logic into a single unified file. This reduces code duplication, improves maintainability, and creates a single source of truth.

### Why Consolidate?

**Benefits:**
- ✅ Reduces lines of code (typically 50-70% reduction)
- ✅ Single source of truth - bug fixes apply to all years automatically
- ✅ Easier to maintain and update
- ✅ Reduced testing overhead
- ✅ Clearer code architecture

**Risks if NOT done:**
- ❌ Bug must be fixed in multiple places
- ❌ Changes may be applied inconsistently
- ❌ More files to maintain and test
- ❌ Higher cognitive load for developers

### Key Principle

**DRY (Don't Repeat Yourself):** If multiple files contain essentially the same logic with only parameter differences, they should be consolidated.

---

## When to Consolidate

### Primary Criteria (ALL must be true)

✅ **1. 100% Operation Name Overlap**
   - All files implement the exact same set of operation names
   - Example: Y3, Y4, Y5 all have `addition_no_carry`, `subtraction_no_borrow`, etc.

✅ **2. Identical Code Structure (>85% similarity)**
   - Same function names
   - Same control flow logic
   - Same helper functions
   - Only differences are parameter values (ranges, thresholds)

✅ **3. Parameter-Driven Differences Only**
   - Differences can be expressed as configuration values
   - No fundamental algorithmic differences
   - Example: min/max ranges, digit counts, thresholds

✅ **4. Same Pedagogical Approach**
   - All files teach the same concept
   - Same question generation strategy
   - Same difficulty progression pattern

### Secondary Indicators (strengthen the case)

🟢 **Helper Function Duplication**
   - Multiple files have identical helper functions (e.g., `countCarries()`, `countBorrows()`)
   - Clear sign that logic is duplicated

🟢 **Historical Bug Patterns**
   - Same bug has been fixed in multiple files
   - Updates have been applied inconsistently across files

🟢 **Progressive Scaling**
   - Files differ only by number magnitude (3-digit → 4-digit → 5-digit)
   - Natural progression that can be parameterized

🟢 **Import/Export Patterns**
   - All files import the same helpers
   - All files have identical export structure

### Decision Matrix

| Criterion | Weight | If True | If False |
|-----------|--------|---------|----------|
| 100% operation overlap | CRITICAL | Continue evaluation | ❌ DO NOT consolidate |
| >85% code similarity | CRITICAL | Continue evaluation | ❌ DO NOT consolidate |
| Parameter-driven only | CRITICAL | Continue evaluation | ❌ DO NOT consolidate |
| Helper duplication | HIGH | Strong case for consolidation | Consider alternatives |
| Progressive scaling | MEDIUM | Good candidate | Not a deal-breaker |

**Verdict:** If all CRITICAL criteria are met → **CONSOLIDATE**

---

## When NOT to Consolidate

### Disqualifying Factors (ANY disqualifies consolidation)

❌ **1. Zero or Low Operation Overlap (<50%)**
   - Files implement different sets of operations
   - Example: Y1 has `symbol_interpretation`, Y2 has `twodigit_plus_tens` - completely different

❌ **2. Different Pedagogical Stages**
   - Files teach fundamentally different concepts
   - Example: Y1 focuses on understanding symbols (+, -, =), Y3 focuses on formal columnar methods
   - Consolidation would obscure the learning progression

❌ **3. Unique Operation Logic**
   - Each file has specialized algorithms that don't generalize
   - Consolidation would require complex branching logic

❌ **4. Different Question Structures**
   - Files generate different types of questions
   - Example: Y1 has true/false equations, Y4 has multi-step problems with intermediate calculations

❌ **5. Would Create Monolithic File**
   - Consolidated file would exceed 2,000 lines
   - Would become harder to maintain than separate files
   - Cognitive overhead would increase, not decrease

❌ **6. Low Similarity (<50%)**
   - Code structure is fundamentally different
   - Helper functions are not shared
   - Control flow differs significantly

### Warning Signs

🟡 **Marginal Cases (50-80% similarity)**
   - Some operation overlap but significant differences
   - Recommendation: Leave separate, document similarities
   - Future: May consolidate if patterns emerge

🟡 **Complex Configuration Required**
   - Would need deeply nested configuration objects
   - Would require year-specific branching throughout
   - Often indicates poor consolidation candidate

🟡 **Different Dependencies**
   - Files import different helper modules
   - Suggests they're solving different problems
   - Consolidation may create dependency bloat

### Anti-Patterns to Avoid

```javascript
// ❌ BAD: Too much year-specific branching
function generateQuestion(params, level, year) {
    if (year === 1) {
        // Completely different logic for Y1
    } else if (year === 2) {
        // Completely different logic for Y2
    } else {
        // Different logic for Y3-5
    }
}

// ✅ GOOD: Configuration-driven with shared logic
const YEAR_CONFIG = {
    'Y3': { range: [100, 999], threshold: 1000 },
    'Y4': { range: [1000, 9999], threshold: 10000 }
};

function generateQuestion(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    // Shared logic using config values
}
```

---

## Consolidation Process

### Step 1: Analysis Phase

**Checklist:**
- [ ] List all operations in each file
- [ ] Calculate operation overlap percentage
- [ ] Compare code structure line-by-line
- [ ] Identify all differences (parameter ranges, thresholds, contexts)
- [ ] Check helper function duplication
- [ ] Estimate LOC reduction (before vs after)

**Tools:**
```bash
# Count lines of code
wc -l file1.js file2.js file3.js

# Search for operation names
grep -o "case '[^']*'" file.js | sort | uniq

# Find duplicate functions
grep "^function" file1.js file2.js | sort | uniq -d
```

**Document Findings:**
```markdown
## Consolidation Analysis: C02_Y3-Y5

**Files:** C02_Y3_CALC_written.js, C02_Y4_CALC_written.js, C02_Y5_CALC_written.js

**Operations:**
- Y3: addition_no_carry, subtraction_no_borrow, ... (10 total)
- Y4: addition_no_carry, subtraction_no_borrow, ... (10 total)
- Y5: addition_no_carry, subtraction_no_borrow, ... (10 total)
- **Overlap:** 100% (10/10 operations identical)

**Code Similarity:** 95%
**Differences:** Only parameter ranges (min_3digit vs min_4digit vs min_value)

**Recommendation:** ✅ CONSOLIDATE
**Expected Reduction:** 1,528 LOC → ~1,300 LOC (15-20% reduction)
```

### Step 2: Design Phase

**Create Configuration Object:**
```javascript
const YEAR_CONFIG = {
    'MODULE_ID_Y3': {
        minParamKey: 'min_3digit',
        maxParamKey: 'max_3digit',
        defaultMin: 100,
        defaultMax: 999,
        crossingOp: 'crossing_1000',
        crossingThreshold: 1000,
        hasMultiStep: false,
        description: '3-digit'
    },
    // ... Y4, Y5 configs
};
```

**Design Unified Interface:**
```javascript
// Each module exports generator with moduleId binding
export function generateQuestion(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    // Shared logic
}

// Export for each year
export const MODULE_Y3 = {
    moduleId: 'MODULE_ID_Y3',
    generate: (params, level) => generateQuestion(params, level, 'MODULE_ID_Y3')
};

export const MODULE_Y4 = {
    moduleId: 'MODULE_ID_Y4',
    generate: (params, level) => generateQuestion(params, level, 'MODULE_ID_Y4')
};
```

### Step 3: Implementation Phase

**Order of Operations:**

1. **Create new consolidated file**
   - Name: `[MODULE]_Y[min]_Y[max]_[description].js`
   - Example: `C02_Y3_Y4_Y5_CALC_written.js`

2. **Copy base structure from one file**
   - Use the most complete/recent file as template

3. **Add configuration object**
   - Extract all differences into config

4. **Refactor shared functions**
   - Replace hardcoded values with config lookups
   - Use helper function: `getRangeValues(params, config)`

5. **Handle year-specific operations**
   - Use config flags (e.g., `hasMultiStep`)
   - Implement graceful fallbacks

6. **Create exports for each year**
   - Maintain same interface as original files

7. **Update imports in questionEngine.js**
   ```javascript
   // Before
   import moduleY3 from './generators/MODULE_Y3.js';
   import moduleY4 from './generators/MODULE_Y4.js';

   // After
   import { MODULE_Y3, MODULE_Y4 } from './generators/MODULE_Y3_Y4.js';
   ```

### Step 4: Testing Phase

**Create Comprehensive Test Suite:**
```javascript
// test_MODULE_Y3_Y4_Y5.js
function testYear(generator, moduleId, yearName) {
    // Test all levels
    // Test all operations
    // Validate output format
}

// Test each year separately
testYear(MODULE_Y3, 'MODULE_ID_Y3', 'Y3');
testYear(MODULE_Y4, 'MODULE_ID_Y4', 'Y4');
testYear(MODULE_Y5, 'MODULE_ID_Y5', 'Y5');
```

**Test Cases:**
- [ ] All operations generate questions
- [ ] Module IDs are correct
- [ ] Parameter ranges respected
- [ ] Year-specific features work (e.g., crossing thresholds)
- [ ] Output matches original files
- [ ] No regressions in question quality

### Step 5: Cleanup Phase

1. **Verify all tests pass**
   - Run test suite multiple times
   - Test in application UI

2. **Update documentation**
   - Update CLAUDE.md if architecture changed
   - Add consolidation note to file header

3. **Archive old files** (do NOT delete immediately)
   - Move to `generators/_archived/`
   - Keep for 1-2 releases in case rollback needed

4. **Update imports throughout codebase**
   - Search for all imports of old files
   - Update to use new consolidated file

5. **Commit with descriptive message**
   ```bash
   git add .
   git commit -m "feat: consolidate MODULE Y3-Y5 generators

   - Merge 3 separate files into 1 unified generator
   - Reduce from 1,528 to 1,282 LOC (16% reduction)
   - Maintain identical functionality
   - All tests passing (120/120)

   Consolidated files:
   - MODULE_Y3.js → _archived/
   - MODULE_Y4.js → _archived/
   - MODULE_Y5.js → _archived/"
   ```

---

## Files in Scope

### Current Project Structure

```
src/generators/
├── N01_Y1_NPV_counting.js          # ✅ CONSOLIDATED (part of N01)
├── N01_Y2_NPV_counting.js          # ✅ CONSOLIDATED (part of N01)
├── N01_Y3_NPV_counting.js          # ✅ CONSOLIDATED (part of N01)
├── N01_Y4_NPV_counting.js          # ✅ CONSOLIDATED (part of N01)
├── N01_Y5_NPV_counting.js          # ✅ CONSOLIDATED (part of N01)
├── N01_NPV_counting.js             # ✅ CONSOLIDATED FILE (replaces Y1-Y5)
│
├── N02_Y1_NPV_readwrite.js         # ✅ CONSOLIDATED (part of N02)
├── N02_Y2_NPV_readwrite.js         # ✅ CONSOLIDATED (part of N02)
├── N02_Y3_NPV_readwrite.js         # ✅ CONSOLIDATED (part of N02)
├── N02_Y4_NPV_readwrite.js         # ✅ CONSOLIDATED (part of N02)
├── N02_Y5_NPV_readwrite.js         # ✅ CONSOLIDATED (part of N02)
├── N02_Y6_NPV_readwrite.js         # ✅ CONSOLIDATED (part of N02)
├── N02_NPV_readwrite.js            # ✅ CONSOLIDATED FILE (replaces Y1-Y6)
│
├── N03_Y2_NPV_placevalue.js        # 🔍 ANALYZE
├── N03_Y3_NPV_placevalue.js        # 🔍 ANALYZE
├── N03_Y4_NPV_placevalue.js        # 🔍 ANALYZE
├── N03_Y5_NPV_placevalue.js        # 🔍 ANALYZE
├── N03_Y6_NPV_placevalue.js        # 🔍 ANALYZE
│
├── N04_Y1_NPV_representation.js    # 🔍 ANALYZE
├── N04_Y2_NPV_representation.js    # 🔍 ANALYZE
├── N04_Y3_NPV_representation.js    # 🔍 ANALYZE
├── N04_Y4_NPV_representation.js    # 🔍 ANALYZE
├── N04_Y5_NPV_representation.js    # 🔍 ANALYZE
├── N04_Y6_NPV_representation.js    # 🔍 ANALYZE
│
├── N05_Y4_NPV_negatives.js         # 🔍 ANALYZE
├── N05_Y5_NPV_negatives.js         # 🔍 ANALYZE
├── N05_Y6_NPV_negatives.js         # 🔍 ANALYZE
│
├── N06_Y2_NPV_problems.js          # 🔍 ANALYZE
├── N06_Y3_NPV_problems.js          # 🔍 ANALYZE
├── N06_Y4_NPV_problems.js          # 🔍 ANALYZE
├── N06_Y5_NPV_problems.js          # 🔍 ANALYZE
├── N06_Y6_NPV_problems.js          # 🔍 ANALYZE
│
├── C01_Y1_CALC_mental.js           # ❌ DISTINCT (keep separate)
├── C01_Y2_CALC_mental.js           # ❌ DISTINCT (keep separate)
├── C01_Y3_CALC_mental.js           # ❌ DISTINCT (keep separate)
├── C01_Y5_CALC_mental.js           # ❌ DISTINCT (keep separate)
│
├── C02_Y1_CALC_written.js          # ❌ DISTINCT (keep separate)
├── C02_Y2_CALC_written.js          # ❌ DISTINCT (keep separate)
├── C02_Y3_CALC_written.js          # ✅ CONSOLIDATED (part of C02_Y3-5)
├── C02_Y4_CALC_written.js          # ✅ CONSOLIDATED (part of C02_Y3-5)
├── C02_Y5_CALC_written.js          # ✅ CONSOLIDATED (part of C02_Y3-5)
├── C02_Y3_Y4_Y5_CALC_written.js    # ✅ CONSOLIDATED FILE (replaces Y3-Y5)
│
├── C03_Y2_CALC_estimation.js       # 🔍 ANALYZE
├── C03_Y3_CALC_estimation.js       # 🔍 ANALYZE
├── C03_Y4_CALC_estimation.js       # 🔍 ANALYZE
├── C03_Y5_CALC_estimation.js       # 🔍 ANALYZE
├── C03_Y6_CALC_estimation.js       # 🔍 ANALYZE
│
├── C04_Y1_CALC_problems.js         # 🔍 ANALYZE
├── C04_Y2_CALC_problems.js         # 🔍 ANALYZE
├── C04_Y3_CALC_problems.js         # 🔍 ANALYZE
├── C04_Y4_CALC_problems.js         # 🔍 ANALYZE
├── C04_Y5_CALC_problems.js         # 🔍 ANALYZE
├── C04_Y6_CALC_problems.js         # 🔍 ANALYZE
│
├── C05_Y5_CALC_properties.js       # 🔍 ANALYZE
├── C05_Y6_CALC_properties.js       # 🔍 ANALYZE
│
├── C06_Y2_CALC_mental_multiply.js  # 🔍 ANALYZE (likely candidate)
├── C06_Y3_CALC_mental_multiply.js  # 🔍 ANALYZE (likely candidate)
├── C06_Y4_CALC_mental_multiply.js  # 🔍 ANALYZE (likely candidate)
├── C06_Y5_CALC_mental_multiply.js  # 🔍 ANALYZE (likely candidate)
├── C06_Y6_CALC_mental_multiply.js  # 🔍 ANALYZE (likely candidate)
│
├── C07_Y2_CALC_written.js          # 🔍 ANALYZE (likely candidate)
├── C07_Y3_CALC_written.js          # 🔍 ANALYZE (likely candidate)
├── C07_Y4_CALC_written.js          # 🔍 ANALYZE (likely candidate)
├── C07_Y5_CALC_written.js          # 🔍 ANALYZE (likely candidate)
├── C07_Y6_CALC_written.js          # 🔍 ANALYZE (likely candidate)
│
├── C08_Y1_CALC_properties.js       # 🔍 ANALYZE
├── C08_Y2_CALC_properties.js       # 🔍 ANALYZE
├── C08_Y3_CALC_properties.js       # 🔍 ANALYZE
├── C08_Y4_CALC_properties.js       # 🔍 ANALYZE
├── C08_Y5_CALC_properties.js       # 🔍 ANALYZE
├── C08_Y6_CALC_properties.js       # 🔍 ANALYZE
│
├── C09_Y6_CALC_order.js            # ⚪ SINGLE FILE (no consolidation needed)
│
└── [M01-M09, F, G, S, P, R, A strands...] # 🔍 ANALYZE (~60 more files)
```

### Priority Analysis Order

**Tier 1 - High Consolidation Likelihood (analyze first):**
- C06_Y2-Y6_CALC_mental_multiply (5 files) - Same operation type across years
- C07_Y2-Y6_CALC_written (5 files) - Formal written multiplication methods
- C03_Y2-Y6_CALC_estimation (5 files) - Estimation strategies

**Tier 2 - Medium Consolidation Likelihood:**
- N03_Y2-Y6_NPV_placevalue (5 files) - Place value operations
- N04_Y1-Y6_NPV_representation (6 files) - Number representations
- N05_Y4-Y6_NPV_negatives (3 files) - Negative numbers (only 3 years)
- N06_Y2-Y6_NPV_problems (5 files) - Number problems

**Tier 3 - Low Consolidation Likelihood (likely distinct):**
- C04_Y1-Y6_CALC_problems (6 files) - Problem solving varies significantly by year
- C08_Y1-Y6_CALC_properties (6 files) - Properties and relationships vary by complexity
- C05_Y5-Y6_CALC_properties (2 files) - Only 2 files, may not be worth consolidating

**Tier 4 - Measurement and Geometry (analyze case-by-case):**
- M01-M09 strands (~25 files) - Measurement concepts vary significantly
- F, G, S, P, R, A strands (~30 files) - Advanced topics, likely distinct

### Analysis Template

For each group of files, document:

```markdown
## [MODULE] Analysis

**Files in Group:** [list]
**Total LOC:** [sum]

### Operations Comparison
| Operation | Y1 | Y2 | Y3 | Y4 | Y5 | Y6 |
|-----------|----|----|----|----|----|----|
| operation1 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| operation2 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Overlap:** [X]% ([Y]/[Z] operations)

### Code Similarity
- [ ] Same imports
- [ ] Same helper functions
- [ ] Same control flow
- [ ] Only parameter differences
- [ ] Estimated similarity: [X]%

### Differences
- Parameter ranges: [describe]
- Unique operations: [list]
- Algorithmic variations: [describe]

### Recommendation
- [ ] ✅ CONSOLIDATE - [reason]
- [ ] ❌ KEEP SEPARATE - [reason]
- [ ] 🔍 NEEDS DEEPER ANALYSIS - [reason]

### If Consolidating
**Expected LOC reduction:** [before] → [after] ([X]% reduction)
**Consolidated filename:** [name]
**Configuration complexity:** [low/medium/high]
```

---

## Technical Implementation Patterns

### Pattern 1: Factory with Configuration Object

**Use when:** 3+ files with 100% operation overlap

```javascript
const YEAR_CONFIG = {
    'MODULE_Y3': {
        minParamKey: 'min_3digit',
        maxParamKey: 'max_3digit',
        range: [100, 999],
        threshold: 1000,
        description: '3-digit'
    },
    'MODULE_Y4': {
        minParamKey: 'min_4digit',
        maxParamKey: 'max_4digit',
        range: [1000, 9999],
        threshold: 10000,
        description: '4-digit'
    }
};

function getRangeValues(params, config) {
    const min = params[config.minParamKey] || config.range[0];
    const max = params[config.maxParamKey] || config.range[1];
    return { min, max };
}

export function generateQuestion(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const { min, max } = getRangeValues(params, config);

    // Shared operation logic using config values
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'operation1':
            return generateOperation1(params, level, config);
        // ... other operations
    }
}

// Export for each year
export const MODULE_Y3 = {
    moduleId: 'MODULE_Y3',
    generate: (params, level) => generateQuestion(params, level, 'MODULE_Y3')
};

export const MODULE_Y4 = {
    moduleId: 'MODULE_Y4',
    generate: (params, level) => generateQuestion(params, level, 'MODULE_Y4')
};

// Default export for backward compatibility
export default MODULE_Y3;
```

### Pattern 2: Shared Core with Year-Specific Extensions

**Use when:** 80-95% overlap with some unique operations

```javascript
// Shared core operations
function generateSharedOperation(params, level, config) {
    // Logic that works for all years
}

// Year-specific operations
function generateY3SpecificOperation(params, level, config) {
    // Only for Y3
}

function generateY5SpecificOperation(params, level, config) {
    // Only for Y5
}

export function generateQuestion(params, level, moduleId) {
    const config = YEAR_CONFIG[moduleId];
    const operation = randomChoice(params.operations);

    // Try shared operations first
    if (SHARED_OPERATIONS.includes(operation)) {
        return generateSharedOperation(params, level, config);
    }

    // Handle year-specific operations
    switch(moduleId) {
        case 'MODULE_Y3':
            if (operation === 'y3_specific') {
                return generateY3SpecificOperation(params, level, config);
            }
            break;
        case 'MODULE_Y5':
            if (operation === 'y5_specific') {
                return generateY5SpecificOperation(params, level, config);
            }
            break;
    }

    // Fallback
    return generateSharedOperation(params, level, config);
}
```

### Pattern 3: Parameter Accessor Helpers

**Use when:** Different parameter key names across years

```javascript
// Helper to abstract parameter access
function getMinValue(params, config) {
    return params[config.minParamKey] || config.defaultMin;
}

function getMaxValue(params, config) {
    return params[config.maxParamKey] || config.defaultMax;
}

function getCrossingThreshold(params, config) {
    return params[config.thresholdKey] || config.defaultThreshold;
}

// Use in operations
function generateCrossingOperation(params, level, config) {
    const min = getMinValue(params, config);
    const max = getMaxValue(params, config);
    const threshold = getCrossingThreshold(params, config);

    // Generate question that crosses threshold
}
```

### Pattern 4: Context Generation with Year Scaling

**Use when:** Word problems need year-appropriate contexts

```javascript
const CONTEXT_TEMPLATES = {
    addition: {
        Y1: [
            { template: 'You have [a] toys and get [b] more. How many toys now?', scale: 'small' },
        ],
        Y3: [
            { template: 'A shop has [a] items and receives [b] more. How many items total?', scale: 'medium' },
        ],
        Y5: [
            { template: 'A city has [a] residents. [b] people move in. What is the new population?', scale: 'large' },
        ]
    }
};

function getContextForYear(operationType, config) {
    const yearKey = config.yearKey; // 'Y1', 'Y3', 'Y5'
    const templates = CONTEXT_TEMPLATES[operationType][yearKey];
    return randomChoice(templates);
}
```

---

## Case Studies

### Case Study 1: N01 Counting (Successful Consolidation)

**Files:** N01_Y1, Y2, Y3, Y4, Y5_NPV_counting.js (5 files, 2,150 LOC)

**Analysis:**
- ✅ 100% operation overlap (6 operations: count_forwards, count_backwards, sequences, missing_numbers, word_problems, compare_sequences)
- ✅ 95% code similarity
- ✅ Only differences: step_sizes and number ranges
- ✅ Shared helpers: generateSequence(), findMissingInSequence()

**Decision:** CONSOLIDATE

**Implementation:**
```javascript
const YEAR_CONFIG = {
    'N01_Y1_NPV': { range: [0, 20], step_sizes: [1, 2, 5, 10] },
    'N01_Y2_NPV': { range: [0, 100], step_sizes: [1, 2, 5, 10] },
    'N01_Y3_NPV': { range: [0, 1000], step_sizes: [4, 8, 50, 100] },
    'N01_Y4_NPV': { range: [0, 10000], step_sizes: [6, 7, 9, 25, 1000] },
    'N01_Y5_NPV': { range: [-100, 1000000], powers_of_10: [10, 100, 1000, 10000, 100000], allow_negatives: true }
};
```

**Result:**
- 2,150 LOC → 768 LOC (64% reduction)
- ✅ All functionality preserved
- ✅ Tests passing (200/200)

### Case Study 2: C01 Mental Arithmetic (Keep Separate)

**Files:** C01_Y1, Y2, Y3, Y5_CALC_mental.js (4 files, ~2,000 LOC)

**Analysis:**
- ❌ 0% operation overlap
  - Y1: number_bonds, missing_part, related_facts, fact_families
  - Y2: adding_three, near_doubles, compensation, partitioning
  - Y3: add_ones, subtract_ones, add_tens, add_hundreds
  - Y5: add_multiples_1000, compensation, partitioning, multi_step_mental
- ❌ Different pedagogical stages
  - Y1: Conceptual understanding of number relationships
  - Y2: Mental strategies development
  - Y3: Place value manipulation
  - Y5: Large number mental calculation
- ❌ Unique algorithms per year

**Decision:** KEEP SEPARATE

**Rationale:**
- Consolidation would require massive switch statements per operation
- Each year teaches fundamentally different skills
- Code would be harder to understand and maintain
- No actual code reuse possible

### Case Study 3: C02_Y3-5 Written Calculation (Successful Consolidation)

**Files:** C02_Y3, Y4, Y5_CALC_written.js (3 files, 1,528 LOC)

**Analysis:**
- ✅ 100% operation overlap (10 operations)
- ✅ 95% code similarity
- ✅ Only differences: digit counts (3-digit vs 4-digit vs 5+ digit)
- ✅ Duplicate helpers: countCarries(), countBorrows()

**Decision:** CONSOLIDATE

**Implementation:**
```javascript
const YEAR_CONFIG = {
    'C02_Y3_CALC': {
        minParamKey: 'min_3digit',
        maxParamKey: 'max_3digit',
        range: [100, 999],
        crossingThreshold: 1000,
        hasMultiStep: false
    },
    'C02_Y4_CALC': {
        minParamKey: 'min_4digit',
        maxParamKey: 'max_4digit',
        range: [1000, 9999],
        crossingThreshold: 10000,
        hasMultiStep: true
    },
    'C02_Y5_CALC': {
        minParamKey: 'min_value',
        maxParamKey: 'max_value',
        range: [10000, 9999999],
        crossingThreshold: 100000,
        hasMultiStep: true
    }
};
```

**Result:**
- 1,528 LOC → 1,282 LOC (16% reduction)
- ✅ All functionality preserved
- ✅ Tests passing (120/120)
- ✅ Easier to maintain (bug fixes apply to all years)

### Case Study 4: C02_Y1-2 Written Calculation (Keep Separate)

**Files:** C02_Y1, Y2_CALC_written.js (2 files, ~1,000 LOC)

**Analysis:**
- ❌ 0% operation overlap
  - Y1: simple_addition, simple_subtraction, missing_addend, missing_subtrahend, missing_minuend, symbol_interpretation, equation_completion, true_false_equations, two_step_problems, complex_missing
  - Y2: twodigit_plus_ones, twodigit_minus_ones, twodigit_plus_tens, twodigit_minus_tens, twodigit_plus_twodigit, twodigit_minus_twodigit, three_onedigit, mixed_operations, complex_missing
- ❌ Different pedagogical stages
  - Y1: Understanding symbols and equation structure
  - Y2: Place value decomposition (not yet formal columnar)
- ❌ Y1 has unique operation types (symbol interpretation, true/false)

**Decision:** KEEP SEPARATE

**Rationale:**
- Completely different operation sets
- Y1 focuses on conceptual understanding
- Y2 focuses on transitional methods before formal columnar
- Would not reduce duplication

---

## Consolidation Checklist

Before consolidating, verify:

### Analysis Phase
- [ ] All files analyzed for operation overlap
- [ ] Code similarity calculated (>85% required)
- [ ] Differences documented and parameterizable
- [ ] Helper function duplication identified
- [ ] LOC reduction estimated
- [ ] Consolidation decision documented with rationale

### Design Phase
- [ ] Configuration object designed
- [ ] Parameter accessor helpers created
- [ ] Year-specific features identified and handled
- [ ] Export structure maintains backward compatibility
- [ ] File naming convention followed

### Implementation Phase
- [ ] New consolidated file created
- [ ] Configuration object implemented
- [ ] All operations refactored to use config
- [ ] Helper functions deduplicated
- [ ] Exports created for each year
- [ ] Comments and documentation updated

### Testing Phase
- [ ] Comprehensive test suite created
- [ ] All years tested independently
- [ ] All operations tested at all levels
- [ ] Output compared to original files
- [ ] Edge cases verified
- [ ] Performance acceptable (no significant slowdown)

### Integration Phase
- [ ] questionEngine.js imports updated
- [ ] All references to old files updated
- [ ] Old files moved to _archived/
- [ ] Application tested end-to-end
- [ ] No regressions detected

### Documentation Phase
- [ ] CLAUDE.md updated if needed
- [ ] Consolidation documented in file header
- [ ] Analysis document archived
- [ ] Commit message describes changes
- [ ] Update REFACTORING_PROGRESS_REPORT.md

---

## Summary: Quick Decision Tree

```
START: Should I consolidate these generators?

├─ Do all files have 100% operation name overlap?
│  ├─ NO → ❌ DO NOT CONSOLIDATE
│  └─ YES → Continue
│
├─ Are the files >85% similar in code structure?
│  ├─ NO → ❌ DO NOT CONSOLIDATE
│  └─ YES → Continue
│
├─ Are differences ONLY in parameters (ranges, thresholds)?
│  ├─ NO → ❌ DO NOT CONSOLIDATE (or analyze deeper)
│  └─ YES → Continue
│
├─ Do files teach the same pedagogical concept?
│  ├─ NO → ❌ DO NOT CONSOLIDATE
│  └─ YES → Continue
│
├─ Would consolidation require <20% year-specific branching?
│  ├─ NO → ❌ DO NOT CONSOLIDATE
│  └─ YES → Continue
│
└─ ✅ CONSOLIDATE
   - Expected LOC reduction: 50-70%
   - Maintenance benefits significant
   - Follow consolidation process
```

---

## Questions to Ask

Before consolidating, answer these questions:

1. **If I find a bug in one file, would the same bug likely exist in the other files?**
   - YES → Strong consolidation candidate
   - NO → Keep separate

2. **Can I explain the differences in a simple config object?**
   - YES → Good consolidation candidate
   - NO → May be too complex to consolidate

3. **Would consolidation make the code easier or harder to understand?**
   - EASIER → Proceed with consolidation
   - HARDER → Keep separate

4. **Am I consolidating because of actual code duplication or just similar file names?**
   - ACTUAL DUPLICATION → Proceed
   - SIMILAR NAMES ONLY → Keep separate

5. **Will future developers thank me for consolidating or curse me?**
   - THANK → Good consolidation
   - CURSE → Bad consolidation

---

**Remember:** The goal is to reduce duplication and improve maintainability, NOT to have fewer files at all costs. When in doubt, keep files separate. It's easier to consolidate later than to un-consolidate a poorly designed consolidation.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-24
**Next Review:** After analyzing Tier 1 candidates (C06, C07, C03)
