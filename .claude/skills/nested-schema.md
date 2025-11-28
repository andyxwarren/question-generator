---
name: nested-schema
description: Parameter schema principles and patterns for UK Maths Question Generator. Use when designing or validating module parameter structures.
---

# Nested Parameter Schema

## Immutable Principles

These principles MUST always be followed. They are non-negotiable.

### 1. Two-Object Separation
Every difficulty level has exactly two objects:
- `math` - Mathematical constraints only
- `presentation` - Display/visual settings only

### 2. Math = Constraints
The `math` object contains ONLY numerical/mathematical constraints:
- Ranges, bounds, limits
- Sequences, progressions
- Precision, rounding rules
- Mathematical relationships

### 3. Presentation = Display
The `presentation` object contains ONLY visual/contextual settings:
- Visual types (number line, columnar, etc.)
- Gap positions, styling
- Contexts (shopping, recipes, etc.)
- Display configuration

### 4. No Flat Parameters
NEVER put constraints at the root level of a difficulty level:
```javascript
// WRONG - flat parameters
"1": {
    min_value: 0,        // NO!
    max_value: 100,      // NO!
    gap_position: "end"  // NO!
}

// CORRECT - nested in math/presentation
"1": {
    math: { range: { min: 0, max: 100 } },
    presentation: { gaps: { position: "end" } }
}
```

### 5. Operations at Root
If a module has operation types, put them at root level (not inside math):
```javascript
"1": {
    operations: ['addition', 'subtraction'],  // At root
    math: { ... },
    presentation: { ... }
}
```

---

## Building Blocks

Use standardized primitives for common concepts. See `/project:primitives` for full reference.

| Concept | Primitive | Example |
|---------|-----------|---------|
| Numeric bounds | `range` or `bounds` | `range: { min: 0, max: 100 }` |
| Sequences | `sequence` | `sequence: { length: 5, direction: 'forwards', steps: [4, 8] }` |
| Decimals | `precision` | `precision: { decimalPlaces: 2 }` |
| Choices | `options` | `options: { values: ['a', 'b'], select: 'one' }` |

---

## Basic Structure

```javascript
{
    "1": {  // Level 1 (Beginning)
        "operations": [...],     // Optional - at root if module needs operation types
        "math": {
            // Use primitives from /project:primitives
            // Or create domain-specific structures
        },
        "presentation": {
            // Visual type, gaps, contexts, styling
        }
    },
    "2": { /* Level 2 - Developing */ },
    "3": { /* Level 3 - Meeting curriculum */ },
    "4": { /* Level 4 - Exceeding */ }
}
```

---

## Reference Patterns

The following are **examples of how existing modules structure their parameters**. They are NOT required structures - adapt to your module's needs.

### Number Strand Pattern (N01-N06)

This pattern works well for counting, sequences, and number operations:

```javascript
{
    operations: ['count_forwards', 'count_backwards', 'fill_gap'],
    math: {
        range: { min: 0, max: 100 },
        sequence: {
            steps: [2, 5, 10],
            length: 4,
            directions: ['forwards', 'backwards'],
            startStrategy: 'zero'
        }
    },
    presentation: {
        gaps: { position: 'end', count: 1 },
        visualType: 'sequence',
        contexts: ['counting']
    }
}
```

### Calculation Strand Pattern (C01-C09)

This pattern works well for arithmetic operations:

```javascript
{
    operations: ['addition_no_carry', 'subtraction_no_borrow'],
    math: {
        range: { max: 999 },
        components: {
            ones: { bounds: { min: 1, max: 9 } },
            tens: { bounds: { min: 10, max: 90 } }
        },
        config: {
            noCarry: true,
            noBorrow: true
        }
    },
    presentation: {
        styles: ['equation', 'word_problem', 'columnar'],
        contexts: ['shopping', 'measures']
    }
}
```

### Measurement Strand Pattern (M01-M09)

This pattern works well for units, conversions, and real-world contexts:

```javascript
{
    operations: ['direct_conversion', 'word_problem'],
    math: {
        types: ['length', 'mass', 'capacity'],
        units: {
            length: ['km', 'm', 'cm'],
            mass: ['kg', 'g']
        },
        ranges: {
            km: { range: { min: 1, max: 10 } },
            m: { range: { min: 1, max: 1000 } }
        },
        precision: { decimalPlaces: 0 }
    },
    presentation: {
        contexts: ['shopping', 'recipes', 'travel'],
        visualType: 'text_only',
        wordProblems: true
    }
}
```

### Measurement Strand Pattern with Locale Support (M01-M09)

For measurement modules that support both metric and imperial systems:

```javascript
{
    math: {
        // Shared parameters (applied to both systems)
        types: ['length', 'mass', 'capacity'],
        comparisonType: 'mixed_notation',
        orderCount: 3,

        // Metric system (UK - en-GB)
        metric: {
            units: {
                length: ['m', 'cm', 'mm', 'km', 'mixed_m_cm'],
                mass: ['kg', 'g', 'mixed_kg_g'],
                capacity: ['l', 'ml', 'mixed_l_ml']
            },
            ranges: {
                km: { min: 1, max: 10 },
                m: { min: 1, max: 500 }
            }
        },

        // Imperial system (US - en-US)
        imperial: {
            units: {
                length: ['ft', 'in', 'yd', 'mi', 'mixed_ft_in'],
                mass: ['lb', 'oz', 'mixed_lb_oz'],
                capacity: ['pt', 'cup', 'gal', 'qt']
            },
            ranges: {
                ft: { min: 1, max: 50 },
                in: { min: 6, max: 120 }
            }
        }
    },
    presentation: {
        visualType: 'text_only',
        contexts: ['comparison', 'ordering']
    }
}
```

**Key points:**
- Shared params (`types`, `comparisonType`, `orderCount`) stay at `math` root level
- System-specific params (`units`, `ranges`) go inside `metric` or `imperial`
- Parameter resolver (`src/curriculum/parameterResolver.js`) flattens based on locale
- `en-GB` uses `metric`, `en-US` uses `imperial`
- Imperial ranges should be skill-equivalent to metric (not converted values)

---

## Creating New Structures

When your module doesn't fit existing patterns:

### Step 1: Identify Math Constraints
What numerical/mathematical properties does your module need?
- What values can be generated?
- What are the limits?
- What precision is needed?
- What relationships exist between values?

### Step 2: Identify Presentation Needs
What visual/contextual settings does your module need?
- How will questions be displayed?
- What contexts make sense?
- What visual type is appropriate?

### Step 3: Use Primitives Where Possible
Check `/project:primitives` for standardized building blocks:
- Use `range` or `bounds` for numeric limits
- Use `sequence` for progressions
- Use `precision` for decimal control
- Use `options` for enumerated choices

### Step 4: Create Domain-Specific Structures
For concepts unique to your module, create clear nested structures:

```javascript
// Example: Fractions module (hypothetical)
math: {
    numerator: {
        bounds: { min: 1, max: 10 }
    },
    denominator: {
        options: { values: [2, 4, 8, 16], select: 'one' }
    },
    operations: ['identify', 'compare', 'equivalent']
}

// Example: Geometry module (hypothetical)
math: {
    shapes: {
        options: { values: ['triangle', 'rectangle', 'pentagon'], select: 'one' }
    },
    angles: {
        range: { min: 30, max: 150, step: 15 }
    },
    sides: {
        bounds: { min: 3, max: 6 }
    }
}
```

### Step 5: Document in Generator
Add comments in your generator explaining the structure:

```javascript
export function generateQuestion(params, level) {
    // This module uses custom structure for fractions:
    // - math.numerator.bounds: limits for numerator value
    // - math.denominator.options: allowed denominator values
    const { math, presentation } = params;
    // ...
}
```

---

## Difficulty Progression

| Level | Math Adjustments | Presentation Adjustments |
|-------|------------------|--------------------------|
| **1** (Beginning) | Smallest ranges, fewest options | `gaps.position: "end"`, most scaffolding |
| **2** (Developing) | Expanded ranges, more options | `gaps.position: "middle"`, some scaffolding |
| **3** (Meeting) | Full curriculum ranges | All directions, minimal scaffolding |
| **4** (Exceeding) | Extended ranges (not new concepts) | `gaps.position: "random"`, no scaffolding |

**Level 3 = Curriculum Standard**: Level 3 parameters should exactly match the UK National Curriculum statement for the objective.

---

## Validation Checklist

Before finalizing parameters:

```
Structure:
[ ] Every level has "math" object
[ ] Every level has "presentation" object
[ ] No flat parameters at root level
[ ] Operations at root (if applicable)

Primitives:
[ ] Standard primitives used where applicable
[ ] Range has min and max
[ ] Sequence has length, direction, steps, startStrategy
[ ] Precision has decimalPlaces

Progression:
[ ] Level 1 < Level 2 < Level 3 < Level 4 in difficulty
[ ] Level 3 matches curriculum statement exactly
[ ] Level 4 extends without new concepts
```
