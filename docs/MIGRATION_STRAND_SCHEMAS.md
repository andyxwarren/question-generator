# Migration Plan: Strand-Specific Schemas

## Executive Summary

**Goal**: Replace the single incomplete `schema.js` with strand-specific schema files that provide strict validation for all parameters currently in use.

**Approach**: Full isolation - each strand (Number, Calculation, Measurement) gets its own schema file with complete parameter definitions and validation functions. No shared types between files.

**Outcome**: Robust validation that catches typos, comprehensive documentation, and agent-friendly schema references.

---

## Current State Analysis

### Files Involved

| File | Current State | Used? |
|------|---------------|-------|
| `src/core/schema.js` | Incomplete V2 schema definitions | NOT used at runtime |
| `src/curriculum/parameters.js` | Aggregates all parameter files, provides `getParameters()` | Yes - by questionEngine |
| `src/core/questionEngine.js` | Passes params directly to generators, no validation | Yes |
| `CLAUDE.md` | Documents V2 nested structure | Yes - by agents |
| `.claude/agents/*.md` | Reference V2 structure | Yes |

### Parameter Files (24 total)

**Number Strand (N)**: 6 files
- N01_counting.js, N02_readwrite.js, N03_placevalue.js
- N04_representation.js, N05_negatives.js, N06_problems.js

**Calculation Strand (C)**: 9 files
- C01_mental.js, C02_written.js, C03_estimation.js, C04_problems.js
- C05_properties.js, C06_mental_multiply_divide.js, C07_written_multiply_divide.js
- C08_properties.js, C09_order.js

**Measurement Strand (M)**: 9 files
- M01_measurement.js, M02_measurement_scales.js, M03_money.js, M04_time.js
- M05_conversions.js, M06_conversions_mixed.js, M07_perimeter_area.js
- M08_volume.js, M09_problems.js

---

## Migration Tasks

### Phase 1: Create Strand-Specific Schema Files

#### 1.1 Create Directory Structure

```
src/core/schemas/
├── NumberSchema.js         # N01-N06 schemas + validation
├── CalculationSchema.js    # C01-C09 schemas + validation
├── MeasurementSchema.js    # M01-M09 schemas + validation
├── validators.js           # Shared validation utilities (type checking)
└── index.js                # Re-exports + unified validate() function
```

**Action**: Create `src/core/schemas/` directory

---

#### 1.2 Create NumberSchema.js

Define schemas for each module series (N01-N06) based on actual parameters used.

**Parameters to catalog from parameter files:**

| Module | math fields | presentation fields |
|--------|-------------|---------------------|
| N01 (counting) | range, sequence | gaps |
| N02 (readwrite) | range, digits, comparison | styles, contexts |
| N03 (placevalue) | range, placeValue, roman | styles |
| N04 (representation) | range, estimation, placeValue, rounding | numberLine, objects, comparison |
| N05 (negatives) | range (with temp, elevation), sequence, mustCrossZero | gaps, contexts, intervalTypes |
| N06 (problems) | range, operations | styles, contexts |

**Action**: Read all N01-N06 parameter files, extract all unique fields, create comprehensive schema.

---

#### 1.3 Create CalculationSchema.js

Define schemas for C01-C09 based on actual parameters used.

**Parameters to catalog:**

| Module | math fields | presentation fields |
|--------|-------------|---------------------|
| C01 (mental) | range, components, targets, config | styles |
| C02 (written) | range (with min3, max3, min4, max4, resultMax), components, config | styles, hint |
| C03 (estimation) | range, tolerance, methods | styles, contexts |
| C04 (problems) | range, operations, config | styles, contexts |
| C05 (properties) | range, factors, primes, squares | styles |
| C06 (mental mult) | tables, multiplier, product, powers, decimals, allTables, range, config | styles |
| C07 (written mult) | range, config, digits | styles, hint |
| C08 (properties) | range, operations | styles |
| C09 (order) | range, operators, brackets | styles |

**Action**: Read all C01-C09 parameter files, extract all unique fields, create comprehensive schema.

---

#### 1.4 Create MeasurementSchema.js

Define schemas for M01-M09 based on actual parameters used.

**Parameters to catalog:**

| Module | math fields | presentation fields |
|--------|-------------|---------------------|
| M01 (comparison) | types, units, ranges | contexts, visuals |
| M02 (scales) | types, units, scale, ranges | visuals |
| M03 (money) | denominations, amounts, operations | contexts |
| M04 (time) | hours, minutes, halfPast, quarterTo, roman, facts, hours24, include24, ranges, conversions, problemTypes | types, sequence, multiStep |
| M05 (conversions) | types, units, ranges, conversions, valueType | contexts, wordProblems |
| M06 (conversions mixed) | types, units, ranges, conversions | contexts |
| M07 (perimeter/area) | side, dim, grid, units, squareUnits, complexity, formulaRecog, mixedUnits | showAllSides |
| M08 (volume) | dim, units, shapes | formula |
| M09 (problems) | types, ranges, operations | contexts, multiStep |

**Action**: Read all M01-M09 parameter files, extract all unique fields, create comprehensive schema.

---

#### 1.5 Create validators.js

Shared validation utility functions (type checking only - no schema definitions).

```javascript
// Type validation helpers
export function isNumber(value) { ... }
export function isString(value) { ... }
export function isBoolean(value) { ... }
export function isArray(value, itemType) { ... }
export function isObject(value) { ... }
export function isOneOf(value, allowedValues) { ... }

// Error formatting
export function formatError(path, message) { ... }
```

**Action**: Create validators.js with type-checking utilities.

---

#### 1.6 Create index.js

Unified entry point that:
1. Re-exports all strand schemas
2. Provides `validateParameters(moduleId, level, params)` that routes to correct strand
3. Provides `getSchema(moduleId)` for agent/tooling use

```javascript
import { NumberSchema, validateNumber } from './NumberSchema.js';
import { CalculationSchema, validateCalculation } from './CalculationSchema.js';
import { MeasurementSchema, validateMeasurement } from './MeasurementSchema.js';

export function validateParameters(moduleId, level, params) {
    const strand = moduleId.charAt(0); // N, C, or M
    switch (strand) {
        case 'N': return validateNumber(moduleId, level, params);
        case 'C': return validateCalculation(moduleId, level, params);
        case 'M': return validateMeasurement(moduleId, level, params);
        default: return [`Unknown strand: ${strand}`];
    }
}

export function getSchema(moduleId) {
    const strand = moduleId.charAt(0);
    const series = moduleId.substring(0, 3); // N01, C02, M04, etc.
    switch (strand) {
        case 'N': return NumberSchema[series];
        case 'C': return CalculationSchema[series];
        case 'M': return MeasurementSchema[series];
        default: return null;
    }
}
```

**Action**: Create index.js with routing logic.

---

### Phase 2: Integrate Validation

#### 2.1 Update parameters.js

Add validation call to `getParameters()`:

```javascript
import { validateParameters } from '../core/schemas/index.js';

export function getParameters(moduleId, level, options = { validate: true }) {
    const module = MODULES[moduleId];
    if (!module) return null;

    const params = module.parameters[level];
    if (!params) return null;

    if (options.validate) {
        const errors = validateParameters(moduleId, level, params);
        if (errors.length > 0) {
            console.warn(`Parameter validation warnings for ${moduleId} level ${level}:`, errors);
            // Don't throw - just warn. This allows graceful degradation.
        }
    }

    return params;
}
```

**Action**: Modify `src/curriculum/parameters.js` to call validation.

---

#### 2.2 Delete Old schema.js

Once new schemas are in place and working:

**Action**: Delete `src/core/schema.js`

---

### Phase 3: Update Documentation

#### 3.1 Update CLAUDE.md

Replace the "V2 Parameter Reference by Strand" section with references to the new schema files:

```markdown
## Schema Reference

Each strand has its own schema file with complete parameter definitions:

- **Number (N01-N06)**: `src/core/schemas/NumberSchema.js`
- **Calculation (C01-C09)**: `src/core/schemas/CalculationSchema.js`
- **Measurement (M01-M09)**: `src/core/schemas/MeasurementSchema.js`

To validate parameters programmatically:
```javascript
import { validateParameters } from './src/core/schemas/index.js';
const errors = validateParameters('M04_Y3_MEAS', 3, params);
```
```

**Changes to CLAUDE.md:**
1. Add "Schema Reference" section pointing to new files
2. Update file structure diagram
3. Remove inline parameter examples (now in schema files)
4. Keep generator destructuring examples (still relevant)

---

#### 3.2 Update parameter-designer.md

Add schema reference instruction:

```markdown
## Schema Reference

Before designing parameters, check the existing schema:
- Number strand: `src/core/schemas/NumberSchema.js`
- Calculation strand: `src/core/schemas/CalculationSchema.js`
- Measurement strand: `src/core/schemas/MeasurementSchema.js`

Your output MUST use only fields defined in the schema for that module series.
```

**Action**: Update `.claude/agents/parameter-designer.md`

---

#### 3.3 Update module-creator.md

Add schema validation step to workflow:

```markdown
### Stage 4: Code Implementation

#### 0. Verify Schema (NEW)
Before writing code, confirm the schema exists for this module series:
```javascript
import { getSchema } from '../core/schemas/index.js';
const schema = getSchema('M04_Y3_MEAS');
// If null, schema needs to be extended first
```
```

**Action**: Update `.claude/agents/module-creator.md`

---

#### 3.4 Update module-validator.md

Replace "V2 Schema Compliance Check" with schema-based validation:

```markdown
### 1. Schema Validation (MANDATORY)

Run programmatic validation:
```javascript
import { validateParameters } from '../core/schemas/index.js';
const errors = validateParameters(moduleId, level, params);
```

If errors returned, REJECT with specific field issues.
```

**Action**: Update `.claude/agents/module-validator.md`

---

#### 3.5 Update question-designer.md

Add schema reference for V2 parameter mapping:

```markdown
## V2 Parameter Mapping

Reference the schema file for valid parameter paths:
- `src/core/schemas/NumberSchema.js` - for N modules
- etc.
```

**Action**: Update `.claude/agents/question-designer.md`

---

### Phase 4: Testing & Validation

#### 4.1 Create Validation Test Script

Create a script to validate ALL existing parameters against new schemas:

```javascript
// tools/validateAllParameters.js
import { MODULES } from '../src/curriculum/parameters.js';
import { validateParameters } from '../src/core/schemas/index.js';

const results = { passed: 0, failed: 0, errors: [] };

for (const [moduleId, module] of Object.entries(MODULES)) {
    for (const level of [1, 2, 3, 4]) {
        const params = module.parameters[level];
        if (!params) continue;

        const errors = validateParameters(moduleId, level, params);
        if (errors.length === 0) {
            results.passed++;
        } else {
            results.failed++;
            results.errors.push({ moduleId, level, errors });
        }
    }
}

console.log(`Passed: ${results.passed}, Failed: ${results.failed}`);
if (results.errors.length > 0) {
    console.log('Errors:', JSON.stringify(results.errors, null, 2));
}
```

**Action**: Create `tools/validateAllParameters.js`

---

#### 4.2 Run Validation and Fix Issues

After creating schemas, run the validation script. Fix any parameter files that don't match schemas (typos, missing fields, etc.).

**Action**: Run validation, iterate until 100% pass rate.

---

## File Change Summary

### New Files (6)

| File | Purpose |
|------|---------|
| `src/core/schemas/NumberSchema.js` | N01-N06 schema definitions + validation |
| `src/core/schemas/CalculationSchema.js` | C01-C09 schema definitions + validation |
| `src/core/schemas/MeasurementSchema.js` | M01-M09 schema definitions + validation |
| `src/core/schemas/validators.js` | Shared type-checking utilities |
| `src/core/schemas/index.js` | Unified exports + routing |
| `tools/validateAllParameters.js` | Test script |

### Modified Files (6)

| File | Changes |
|------|---------|
| `src/curriculum/parameters.js` | Add validation call to `getParameters()` |
| `CLAUDE.md` | Update schema documentation section |
| `.claude/agents/parameter-designer.md` | Add schema reference |
| `.claude/agents/module-creator.md` | Add schema verification step |
| `.claude/agents/module-validator.md` | Update to use programmatic validation |
| `.claude/agents/question-designer.md` | Add schema reference for mappings |

### Deleted Files (1)

| File | Reason |
|------|--------|
| `src/core/schema.js` | Replaced by strand-specific schemas |

---

## Implementation Order

1. **Phase 1.5**: Create `validators.js` (shared utilities)
2. **Phase 1.2-1.4**: Create strand schema files (can be done in parallel)
3. **Phase 1.6**: Create `index.js` (depends on strand schemas)
4. **Phase 4.1**: Create test script
5. **Phase 4.2**: Run tests, fix any parameter file issues
6. **Phase 2.1**: Integrate into `parameters.js`
7. **Phase 2.2**: Delete old `schema.js`
8. **Phase 3.1-3.5**: Update documentation and agents

---

## Rollback Plan

If issues arise:
1. Keep old `schema.js` until new schemas are proven
2. `parameters.js` validation is opt-in with `{ validate: false }`
3. Can revert to no-validation state by removing the validation call

---

## Success Criteria

- [ ] All 24 parameter files pass validation (100% pass rate)
- [ ] `validateAllParameters.js` runs without errors
- [ ] Adding a typo to a parameter file triggers validation warning
- [ ] Agents can reference schema files for guidance
- [ ] No runtime errors in application
- [ ] CLAUDE.md accurately describes new schema structure

---

## Estimated Effort

| Phase | Tasks | Complexity |
|-------|-------|------------|
| Phase 1 | Create 6 new files | Medium - requires reading all 24 param files |
| Phase 2 | Integrate validation | Low - small changes |
| Phase 3 | Update docs/agents | Low - text updates |
| Phase 4 | Test and fix | Variable - depends on param file quality |

**Total**: ~2-3 hours of focused work

---

## Resolved Questions

1. **Validation strictness**: Unknown fields cause ERRORS (strict validation)
   - User preference: Robust now, catch all issues upfront

2. **Required vs optional fields**: `math` required, `presentation` optional

3. **Operations array**: Keep at root level (it's a question-type selector)

4. **Validation timing**: On every `getParameters()` call

---

## Critical Issues Discovered (from Parameter Inventory)

### Issue #1: N02 IS STILL V1 FLAT STRUCTURE (CRITICAL)

**N02_readwrite.js** has NOT been migrated to V2:
```javascript
// CURRENT (V1 - WRONG)
{
  min_value: 0,
  max_value: 100,
  word_min: 0,
  word_max: 20,
  operations: [...]
}

// SHOULD BE (V2)
{
  operations: [...],
  math: { range: { min: 0, max: 100 }, word: { min: 0, max: 20 } },
  presentation: { ... }
}
```

**Action Required**: Migrate N02 parameter file AND update N02 generators.

---

### Issue #2: ~155+ Fields NOT in Schema (~86% Coverage Gap)

The current schema only defines ~25 fields. Actual usage includes:
- **Number strand**: 15+ custom fields
- **Calculation strand**: 60+ custom fields
- **Measurement strand**: 80+ custom fields

See full inventory: `PARAMETER_FIELD_INVENTORY.md`

---

### Issue #3: 10 Major Inconsistencies Found

1. **Inconsistent `range` field usage** - 15+ different sub-field patterns
2. **Mixed naming conventions** - `min3`, `max_2digit`, `basicMax`, etc.
3. **Inconsistent boolean naming** - no standard prefix convention
4. **Variable nesting levels** - same concept at different depths
5. **Per-unit ranges** - 80+ unit-specific range objects not in schema
6. **N02 still V1** - needs migration
7. **Array vs scalar confusion** - `steps` is both number and array
8. **Presentation field chaos** - wildly different structures per module
9. **Context-specific range extensions** - undocumented extensions
10. **Type mismatches** - `carry` is both boolean and string

---

## Updated Implementation Plan

### Phase 0: Fix Critical V1 Issue (MUST DO FIRST)

#### 0.1 Migrate N02 Parameter File to V2

**File**: `src/curriculum/parameters/N02_readwrite.js`

Current fields to migrate:
- `min_value` → `math.range.min`
- `max_value` → `math.range.max`
- `word_min` → `math.word.min`
- `word_max` → `math.word.max`
- `order_count_max` → `math.order.countMax`

**Todo**: [ ] Migrate N02_readwrite.js to V2 nested structure

#### 0.2 Update N02 Generators

After migrating parameters, update all 6 N02 generators to use V2 destructuring:
- `N02_Y1_NPV_readwrite.js`
- `N02_Y2_NPV_readwrite.js`
- `N02_Y3_NPV_readwrite.js`
- `N02_Y4_NPV_readwrite.js`
- `N02_Y5_NPV_readwrite.js`
- `N02_Y6_NPV_readwrite.js`

**Todos**:
- [ ] Update N02_Y1_NPV_readwrite.js for V2
- [ ] Update N02_Y2_NPV_readwrite.js for V2
- [ ] Update N02_Y3_NPV_readwrite.js for V2
- [ ] Update N02_Y4_NPV_readwrite.js for V2
- [ ] Update N02_Y5_NPV_readwrite.js for V2
- [ ] Update N02_Y6_NPV_readwrite.js for V2

---

### Phase 1: Create Strand-Specific Schema Files

#### 1.1 Create validators.js

**File**: `src/core/schemas/validators.js`

**Todo**: [ ] Create validators.js with type-checking utilities

---

#### 1.2 Create NumberSchema.js

**File**: `src/core/schemas/NumberSchema.js`

Must include these fields (from inventory):

**N01 (Counting)**:
- [ ] `math.range.{min, max}`
- [ ] `math.sequence.{steps, length, directions, startStrategy, tensFromAny, tensRange}`
- [ ] `presentation.gaps.{position, count}`

**N02 (Read/Write)** - After V2 migration:
- [ ] `math.range.{min, max}`
- [ ] `math.word.{min, max}`
- [ ] `math.order.countMax`
- [ ] `presentation.styles`

**N03 (Place Value)**:
- [ ] `math.range.{min, max}`
- [ ] `math.placeValue.{places, includeZero}`
- [ ] `math.decomposition.format`
- [ ] `math.roman.{min, max, operations, years}`

**N04 (Representation)**:
- [ ] `math.range.{min, max}`
- [ ] `math.estimation.ranges`
- [ ] `math.placeValue.max`
- [ ] `math.rounding.bases`
- [ ] `presentation.numberLine.max`
- [ ] `presentation.objects.types`
- [ ] `presentation.comparison.words`

**N05 (Negatives)**:
- [ ] `math.range.{min, max, temp, elevation}`
- [ ] `math.sequence.{steps, length, directions, startStrategy}`
- [ ] `math.mustCrossZero`
- [ ] `presentation.gaps.{position, count}`
- [ ] `presentation.contexts`
- [ ] `presentation.intervalTypes`

**N06 (Problems)**:
- [ ] `math.range.{min, max, negative, interval}`
- [ ] `math.sequence.steps`
- [ ] `math.steps.{min, max}`
- [ ] `math.rounding.bases`
- [ ] `math.roman.{min, max}`
- [ ] `math.complexity`
- [ ] `presentation.contexts`

**Todo**: [ ] Create NumberSchema.js with all N01-N06 fields

---

#### 1.3 Create CalculationSchema.js

**File**: `src/core/schemas/CalculationSchema.js`

Must include these fields (from inventory):

**C01 (Mental Add/Sub)**:
- [ ] `math.range.{max, min, basicMax, derivedMax, min3, max3}`
- [ ] `math.targets`
- [ ] `math.components.{ones, tens, hundreds, powers}`
- [ ] `math.config.{allowZero, factFamilies, multiplesOf10, cross10, avoidBridging, complexBridging, strategies, complex}`
- [ ] `presentation.styles`

**C02 (Written Add/Sub)**:
- [ ] `math.range.{max, min, result, max_2digit, min3, max3, resultMax, min4, max4}`
- [ ] `math.components.{ones, tens}`
- [ ] `math.config.{allowZero, missingPositions, avoidBridging, avoidCarry, threeNumbersMax, complexity, noCarry, noBorrow, allowSingleCarry, allowMultiCarry, exceed1000, exceed10000, digits}`
- [ ] `presentation.styles`
- [ ] `presentation.hint`

**C03 (Estimation)**:
- [ ] `math.range.{min, max}`
- [ ] `math.rounding.bases`
- [ ] `math.calcTypes`
- [ ] `math.config.{factFamilyComplete, multiples10, use3digit, includeMult, tables}`
- [ ] `presentation.formats`

**C04 (Problems)**:
- [ ] `math.range.{min, max}`
- [ ] `math.steps`
- [ ] `math.config.allowZero`
- [ ] `presentation.contexts`
- [ ] `presentation.format`

**C05 (Properties)**:
- [ ] `math.range.{min, max}`
- [ ] `math.tables`
- [ ] `math.factors.max`
- [ ] `math.multiples.range`
- [ ] `presentation.styles`

**C06 (Mental Mult/Div)**:
- [ ] `math.tables`
- [ ] `math.allTables`
- [ ] `math.multiplier.{min, max}`
- [ ] `math.product.max`
- [ ] `math.range.{oddEven, factors, whole, num}`
- [ ] `math.powers`
- [ ] `math.decimals.{allow, places}`
- [ ] `math.config.{maxOps, parentheses, squares}`
- [ ] `presentation.styles`

**C07 (Written Mult/Div)**:
- [ ] `math.tables`
- [ ] `math.multiplier.{min, max}`
- [ ] `math.product.max`
- [ ] `math.range.{multiplicand, multiplier, multiply, divide}`
- [ ] `math.digits`
- [ ] `math.factors.mult`
- [ ] `math.config.{carry, remainders, remainderType}`
- [ ] `presentation.styles`

**C08 (Operation Properties)**:
- [ ] `math.tables`
- [ ] `math.maxProduct`
- [ ] `math.groups.{min, max}`
- [ ] `math.scaling`
- [ ] `math.range.{max, factors, ops}`
- [ ] `presentation.visuals`
- [ ] `presentation.format`

**C09 (Order of Operations)**:
- [ ] `math.range.num`
- [ ] `math.config.{maxOps, parentheses}`
- [ ] `presentation.styles`

**Todo**: [ ] Create CalculationSchema.js with all C01-C09 fields

---

#### 1.4 Create MeasurementSchema.js

**File**: `src/core/schemas/MeasurementSchema.js`

Must include these fields (from inventory):

**M01 (Compare/Order)**:
- [ ] `math.types`
- [ ] `math.range.{min, max}`
- [ ] `math.useUnits`
- [ ] `math.allowEquals`
- [ ] `math.sameUnitOnly`
- [ ] `math.simpleConversions`
- [ ] `math.units.{length, mass, capacity, money}`
- [ ] `math.ranges.[unit].{min, max}` (cm, m, mm, km, g, kg, ml, l, p, pounds)
- [ ] `math.moneyFormat`
- [ ] `presentation.useDescriptors`

**M02 (Scales)**:
- [ ] `math.types`
- [ ] `math.scale.{max, interval}`
- [ ] `math.units.{length, mass, capacity}`
- [ ] `math.ranges.[unit].{min, max, interval}`
- [ ] `math.useDecimals`
- [ ] `math.ranges.length.{objects, units}`
- [ ] `presentation.showAllNumbers`
- [ ] `presentation.pointerOnMark`

**M03 (Money)**:
- [ ] `math.denominations`
- [ ] `math.pounds`
- [ ] `math.notes`
- [ ] `math.max`
- [ ] `math.target.{min, max}`
- [ ] `math.maxCoins`
- [ ] `math.symbol`
- [ ] `math.conversions`

**M04 (Time)**:
- [ ] `math.hours`
- [ ] `math.hours24`
- [ ] `math.minutes`
- [ ] `math.halfPast`
- [ ] `math.quarterTo`
- [ ] `math.roman`
- [ ] `math.facts`
- [ ] `math.ranges.{hours, hours24, minutes}`
- [ ] `math.conversions.{hours, minutes, years}`
- [ ] `math.include24`
- [ ] `math.problemTypes`
- [ ] `presentation.types`
- [ ] `presentation.sequence`
- [ ] `presentation.multiStep`

**M05/M06 (Conversions)**:
- [ ] `math.types`
- [ ] `math.conversions.{length, mass, capacity, time}`
- [ ] `math.valueType`
- [ ] `math.ranges.[unit].{min, max}` (km, m, kg, hours, inches, miles)
- [ ] `math.decimalPlaces`
- [ ] `presentation.approximate`
- [ ] `presentation.wordProblems`

**M07 (Perimeter/Area)**:
- [ ] `math.side.{min, max}`
- [ ] `math.dim.{min, max}`
- [ ] `math.grid`
- [ ] `math.units`
- [ ] `math.mixedUnits`
- [ ] `math.squareUnits`
- [ ] `math.complexity`
- [ ] `math.formulaRecog`
- [ ] `presentation.showAllSides`

**M08 (Volume)**:
- [ ] `math.dim.{min, max}`
- [ ] `math.objects`
- [ ] `math.units`
- [ ] `math.useLitres`
- [ ] `math.missingDim`

**M09 (Measurement Problems)**:
- [ ] `math.unit`
- [ ] `math.types`
- [ ] `math.range.{min, max}`
- [ ] `math.totalMax`
- [ ] `math.money.{unit, range, format}`
- [ ] `math.length.{unit, range}`
- [ ] `math.mult`
- [ ] `math.decimal`
- [ ] `math.conversions.{length, mass}`
- [ ] `presentation.contexts`
- [ ] `presentation.change`

**Todo**: [ ] Create MeasurementSchema.js with all M01-M09 fields

---

#### 1.5 Create index.js

**File**: `src/core/schemas/index.js`

**Todo**: [ ] Create index.js with routing logic and unified exports

---

### Phase 2: Integrate Validation

#### 2.1 Update parameters.js

**Todo**: [ ] Add validation call to `getParameters()` function

#### 2.2 Delete old schema.js

**Todo**: [ ] Delete `src/core/schema.js` after new schemas are working

---

### Phase 3: Update Documentation

#### 3.1 Update CLAUDE.md

**Todos**:
- [ ] Add "Schema Reference" section pointing to new files
- [ ] Update file structure diagram
- [ ] Remove inline parameter examples (now in schema files)

#### 3.2 Update Agents

**Todos**:
- [ ] Update parameter-designer.md with schema references
- [ ] Update module-creator.md with schema verification step
- [ ] Update module-validator.md to use programmatic validation
- [ ] Update question-designer.md with schema references

---

### Phase 4: Testing

#### 4.1 Create Test Script

**Todo**: [ ] Create `tools/validateAllParameters.js`

#### 4.2 Run and Fix

**Todo**: [ ] Run validation and achieve 100% pass rate

---

## Complete Todo Checklist

### Phase 0 (Critical - Do First)
- [ ] Migrate N02_readwrite.js to V2 nested structure
- [ ] Update N02_Y1_NPV_readwrite.js for V2
- [ ] Update N02_Y2_NPV_readwrite.js for V2
- [ ] Update N02_Y3_NPV_readwrite.js for V2
- [ ] Update N02_Y4_NPV_readwrite.js for V2
- [ ] Update N02_Y5_NPV_readwrite.js for V2
- [ ] Update N02_Y6_NPV_readwrite.js for V2

### Phase 1 (Schema Creation)
- [ ] Create `src/core/schemas/` directory
- [ ] Create validators.js with type-checking utilities
- [ ] Create NumberSchema.js with all N01-N06 fields
- [ ] Create CalculationSchema.js with all C01-C09 fields
- [ ] Create MeasurementSchema.js with all M01-M09 fields
- [ ] Create index.js with routing logic

### Phase 2 (Integration)
- [ ] Add validation call to `getParameters()`
- [ ] Delete old `src/core/schema.js`

### Phase 3 (Documentation)
- [ ] Update CLAUDE.md with schema reference section
- [ ] Update parameter-designer.md
- [ ] Update module-creator.md
- [ ] Update module-validator.md
- [ ] Update question-designer.md

### Phase 4 (Testing)
- [ ] Create `tools/validateAllParameters.js`
- [ ] Run validation and fix all issues
- [ ] Achieve 100% pass rate
