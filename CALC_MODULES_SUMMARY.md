# UK National Curriculum Calculations Modules - Summary

**Date:** 2025-10-18
**Status:** Foundation Complete - Ready for Expansion
**Total Modules:** 39 generators (3 complete templates + 36 to create)

---

## What Has Been Created

### 1. Complete Infrastructure

#### Helper Functions (`src/generators/helpers/calculationHelpers.js`)
A comprehensive utility library with 50+ functions covering:
- Basic arithmetic (addition, subtraction, multiplication, division)
- Number properties (factors, primes, multiples, squares, cubes)
- Word problem contexts and templates
- Estimation and rounding
- Inverse operations
- BODMAS expression generation and evaluation

#### Parameters (`src/curriculum/parameters/C_calculations.js`)
ALL 39 module parameter definitions complete with:
- 4 difficulty levels per module (Beginning → Developing → Meeting → Exceeding)
- Operation lists for each module
- Progressive parameter ranges
- Context options

#### Integration (`src/curriculum/parameters.js`)
- C_MODULES imported and merged
- Ready for use throughout application

---

### 2. Three Complete Generator Templates

#### Template 1: Simple Operations - `C01_Y1_CALC_number_bonds.js`
**Use for:** C01, C02, C06 series (mental calculations, basic operations)

Features:
- 6 operations demonstrating variety
- Number bonds and fact families
- Word problem integration
- Multiple question formats

**Lines:** ~350

---

#### Template 2: Number Properties - `C05_Y5_CALC_number_properties.js`
**Use for:** C05 series (multiples, factors, primes, squares, cubes)

Features:
- 10 operations covering all number properties
- Complex identification questions
- Property relationships
- Notation understanding

**Lines:** ~650

---

#### Template 3: Order of Operations - `C09_Y6_CALC_bodmas.js`
**Use for:** C03, C04, C08, C09 series (complex problems, estimation, multi-step)

Features:
- 11 operations for BODMAS
- Expression generation
- Bracket handling (including nested)
- Step identification
- Error generation for distractors

**Lines:** ~550

---

### 3. Comprehensive Documentation

**`CALC_MODULES_IMPLEMENTATION_GUIDE.md`** (14,000+ words)
- Complete module breakdown for all 39 generators
- Operation designs for each curriculum objective
- Difficulty progression details
- Implementation templates with code examples
- Testing strategy
- Integration checklist
- Architectural decisions

---

## Files Created

```
src/
├── generators/
│   ├── helpers/
│   │   └── calculationHelpers.js          ✅ COMPLETE (1000+ lines)
│   ├── C01_Y1_CALC_number_bonds.js       ✅ COMPLETE (template)
│   ├── C05_Y5_CALC_number_properties.js  ✅ COMPLETE (template)
│   └── C09_Y6_CALC_bodmas.js             ✅ COMPLETE (template)
└── curriculum/
    ├── parameters/
    │   └── C_calculations.js              ✅ COMPLETE (39 modules)
    └── parameters.js                      ✅ UPDATED (imports C modules)

docs/
├── CALC_MODULES_IMPLEMENTATION_GUIDE.md  ✅ COMPLETE (full guide)
└── CALC_MODULES_SUMMARY.md               ✅ THIS FILE
```

---

## The 39 Modules

### C01: Mental Add/Subtract (4 modules)
- [x] C01_Y1_CALC - Number bonds to 20 ✅ **TEMPLATE COMPLETE**
- [ ] C01_Y2_CALC - Mental to 100
- [ ] C01_Y3_CALC - 3-digit mental
- [ ] C01_Y5_CALC - Large number mental

### C02: Written Add/Subtract (5 modules)
- [ ] C02_Y1_CALC - To 20
- [ ] C02_Y2_CALC - 2-digit methods
- [ ] C02_Y3_CALC - Columnar 3-digit
- [ ] C02_Y4_CALC - Columnar 4-digit
- [ ] C02_Y5_CALC - Columnar 5+ digits

### C03: Estimate/Inverse/Check (5 modules)
- [ ] C03_Y2_CALC - Inverse operations
- [ ] C03_Y3_CALC - Estimate and check
- [ ] C03_Y4_CALC - 4-digit estimation
- [ ] C03_Y5_CALC - Rounding to check
- [ ] C03_Y6_CALC - Appropriate accuracy

### C04: Add/Subtract Problems (6 modules)
- [ ] C04_Y1_CALC - One-step problems
- [ ] C04_Y2_CALC - Word problems
- [ ] C04_Y3_CALC - Problem solving
- [ ] C04_Y4_CALC - Two-step problems
- [ ] C04_Y5_CALC - Multi-step problems
- [ ] C04_Y6_CALC - Complex multi-step

### C05: Number Properties (2 modules)
- [x] C05_Y5_CALC - Multiples, factors, primes, squares, cubes ✅ **TEMPLATE COMPLETE**
- [ ] C05_Y6_CALC - Common factors/multiples, primes

### C06: Mental Multiply/Divide (5 modules)
- [ ] C06_Y2_CALC - Tables 2, 5, 10
- [ ] C06_Y3_CALC - Tables 3, 4, 8
- [ ] C06_Y4_CALC - Tables to 12×12
- [ ] C06_Y5_CALC - Mental with powers of 10
- [ ] C06_Y6_CALC - Large numbers

### C07: Written Multiply/Divide (5 modules)
- [ ] C07_Y2_CALC - Statements
- [ ] C07_Y3_CALC - Written methods
- [ ] C07_Y4_CALC - Formal written
- [ ] C07_Y5_CALC - Long mult/short div
- [ ] C07_Y6_CALC - Long division

### C08: Problem Solving (6 modules)
- [ ] C08_Y1_CALC - Mult/div problems
- [ ] C08_Y2_CALC - Properties
- [ ] C08_Y3_CALC - Scaling
- [ ] C08_Y4_CALC - Distributive law
- [ ] C08_Y5_CALC - Complex problems
- [ ] C08_Y6_CALC - Multi-operation

### C09: Order of Operations (1 module)
- [x] C09_Y6_CALC - BODMAS ✅ **TEMPLATE COMPLETE**

**Progress: 3 of 39 complete (7.7%)**

---

## How to Complete the Remaining 36 Generators

### Step-by-Step Process

1. **Choose a module** from the list above
2. **Read the curriculum objective** in CALC_MODULES_IMPLEMENTATION_GUIDE.md
3. **Select the appropriate template:**
   - Simple operations → Use C01_Y1 template
   - Number properties → Use C05_Y5 template
   - Complex/multi-step → Use C09_Y6 template
4. **Copy the template file**
5. **Modify:**
   - Update module ID throughout
   - Adapt operations to match curriculum
   - Adjust parameters usage
   - Update hints and question text
6. **Test** all 4 difficulty levels
7. **Register** in questionEngine.js
8. **Verify** in UI

### Estimated Time Per Generator
- Simple (C01, C02, C06): 1-2 hours
- Medium (C03, C04, C07, C08): 2-3 hours
- Complex (C05): 3-4 hours

**Total estimated time:** 60-90 hours for all 36 generators

---

## Quick Start: Create Your First Generator

Let's create C01_Y2_CALC as an example:

### 1. Copy the Template
```bash
cp src/generators/C01_Y1_CALC_number_bonds.js src/generators/C01_Y2_CALC_mental_to_100.js
```

### 2. Find/Replace Module ID
In the new file, replace all instances of:
- `C01_Y1_CALC` → `C01_Y2_CALC`

### 3. Update Operations
Look at parameters.js to see what operations C01_Y2 needs:
```javascript
operations: ['recall_facts', 'derive_facts', 'add_subtract_ones',
             'add_subtract_tens', 'bridging_tens']
```

Add/modify operation functions to match.

### 4. Update Question Ranges
Adjust to work with numbers up to 100 instead of 20:
```javascript
const { a, b, answer } = generateAddition(0, params.max_value);
// max_value will be 30, 50, 100, or 100 depending on level
```

### 5. Test
```javascript
import generator from './C01_Y2_CALC_mental_to_100.js';

// Test level 1
const params = getParameters('C01_Y2_CALC', 1);
const question = generator.generate(params, 1);
console.log(question);
```

### 6. Register in questionEngine.js
```javascript
import C01_Y2_Generator from '../generators/C01_Y2_CALC_mental_to_100.js';

registerDefaultGenerators() {
    // ... existing
    this.register(C01_Y2_Generator);
}
```

### 7. Done!
You've created your first generator. Repeat for the remaining 35.

---

## Key Architectural Patterns

### Pure Functions
```javascript
export function generateQuestion(params, level) {
    // No side effects
    // Same inputs = same output type
    // Return question object
}
```

### Parameter-Driven
```javascript
// Don't hardcode ranges
const max = 20; // ❌ BAD

// Use parameters
const max = params.max_value; // ✅ GOOD
```

### Helper Usage
```javascript
// Don't duplicate logic
const factors = []; // ❌ BAD
for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
}

// Use helpers
const factors = getFactors(n); // ✅ GOOD
```

### Always Return Strings
```javascript
return {
    answer: 42,          // ❌ BAD
    answer: "42",        // ✅ GOOD
    answer: answer.toString() // ✅ GOOD
};
```

---

## Testing Checklist

For each generator, verify:

- [ ] All operations generate valid questions
- [ ] Answers are mathematically correct
- [ ] Answer is always a string
- [ ] Distractors are plausible but wrong
- [ ] Hints are helpful
- [ ] Level 1 is easier than Level 4
- [ ] Numbers respect parameter bounds
- [ ] Question text is clear and age-appropriate
- [ ] Module ID matches everywhere
- [ ] No console errors

---

## Common Pitfalls to Avoid

### ❌ DON'T

1. **Create 10+ operations** - Keep it to 3-5 distinct operations
2. **Hardcode numbers** - Use parameters
3. **Duplicate helper logic** - Use calculationHelpers.js
4. **Return numbers as answers** - Always convert to string
5. **Ignore curriculum statement** - Every question must align
6. **Make all levels the same difficulty** - Clear progression required
7. **Use physical objects** - Must be text-based
8. **Skip testing** - Test all operations at all levels

### ✅ DO

1. **Design 3-5 meaningful operations** - Quality over quantity
2. **Use parameter values** - Flexible and maintainable
3. **Reuse helpers** - DRY principle
4. **Return string answers** - Consistent schema
5. **Match curriculum exactly** - Precise alignment
6. **Progressive difficulty** - Levels 1-4 clearly different
7. **Text-based questions** - Digital-native
8. **Test thoroughly** - Every operation, every level

---

## Integration with questionEngine.js

Once all 36 generators are created, update questionEngine.js:

```javascript
// At top of file
import C01_Y1_Generator from '../generators/C01_Y1_CALC_number_bonds.js';
import C01_Y2_Generator from '../generators/C01_Y2_CALC_mental_to_100.js';
import C01_Y3_Generator from '../generators/C01_Y3_CALC_mental_3digit.js';
import C01_Y5_Generator from '../generators/C01_Y5_CALC_mental_large.js';
// ... (36 more imports)

// In registerDefaultGenerators()
this.register(C01_Y1_Generator);
this.register(C01_Y2_Generator);
this.register(C01_Y3_Generator);
this.register(C01_Y5_Generator);
// ... (36 more registrations)
```

**Note:** The order doesn't matter as they're keyed by moduleId.

---

## Expected Output

Once all 39 generators are complete:

- **39 curriculum modules** covering all UK National Curriculum calculation objectives for Years 1-6
- **156 difficulty levels** (39 modules × 4 levels each)
- **Thousands of unique questions** through parameter variations
- **Complete calculation strand coverage** (C01-C09)
- **Production-ready code** following architectural patterns
- **Comprehensive testing** ensuring accuracy and alignment

---

## Next Actions

1. **Read CALC_MODULES_IMPLEMENTATION_GUIDE.md** for full details on each module
2. **Choose a template** based on the module type
3. **Create one generator** following the quick start guide above
4. **Test thoroughly** before moving to the next
5. **Repeat** for remaining 35 generators
6. **Register all** in questionEngine.js
7. **Final integration testing** in the UI

---

## Support Resources

- **CALC_MODULES_IMPLEMENTATION_GUIDE.md** - Complete implementation details
- **C01_Y1_CALC_number_bonds.js** - Simple operations template
- **C05_Y5_CALC_number_properties.js** - Number properties template
- **C09_Y6_CALC_bodmas.js** - Complex problems template
- **calculationHelpers.js** - All helper functions with JSDoc
- **CLAUDE.md** - Architecture overview
- **Existing N-series generators** - Additional pattern examples

---

## Success Criteria

The implementation will be complete when:

1. All 39 generators created and tested
2. All generators registered in questionEngine.js
3. All modules accessible in UI
4. Questions generate correctly for all levels
5. Answers validate correctly
6. Curriculum alignment verified
7. No console errors
8. Age-appropriate and educationally sound

---

**Created:** 2025-10-18
**Last Updated:** 2025-10-18
**Status:** Foundation Complete - Templates Ready
**Progress:** 3/39 generators (7.7%)
