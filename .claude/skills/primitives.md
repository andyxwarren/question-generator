---
name: primitives
description: Standardized parameter building blocks for UK Maths Question Generator. Use when designing module parameters to ensure consistent handling of common concepts like ranges, sequences, and precision.
---

# Parameter Primitives

Primitives are standardized building blocks that modules compose. They ensure consistency for common concepts while allowing flexibility in which primitives a module uses.

## How to Use Primitives

1. **Identify** which concepts your module needs (ranges? sequences? precision?)
2. **Use** the standard primitive structure for those concepts
3. **Compose** primitives within your `math` or `presentation` objects
4. **Nest** primitives in domain-specific containers if needed

---

## Core Primitives

### 1. Range

Use when a module needs numeric bounds with optional stepping.

```javascript
range: {
    min: number,              // REQUIRED: lower bound
    max: number,              // REQUIRED: upper bound
    step: number | null,      // Optional: increment (null = any value allowed)
    inclusive: boolean        // Optional: are bounds inclusive? (default: true)
}
```

**Examples:**
```javascript
// Simple range
range: { min: 0, max: 100 }

// Range with step constraint
range: { min: 0, max: 1000, step: 50 }

// Range excluding boundaries
range: { min: 0, max: 10, inclusive: false }  // 1-9 only
```

---

### 2. Bounds

Use when a module needs simple min/max without step constraints. Supports unbounded limits.

```javascript
bounds: {
    min: number | null,       // REQUIRED: lower limit (null = no lower limit)
    max: number | null,       // REQUIRED: upper limit (null = no upper limit)
    exclusive: boolean        // Optional: exclude boundary values? (default: false)
}
```

**Examples:**
```javascript
// Simple bounds
bounds: { min: 1, max: 10 }

// No upper limit
bounds: { min: 0, max: null }

// No lower limit
bounds: { min: null, max: 100 }

// Exclusive bounds (1 < x < 10)
bounds: { min: 1, max: 10, exclusive: true }
```

**When to use Range vs Bounds:**
- Use `range` when you need step constraints or will iterate through values
- Use `bounds` for simple limits, especially when null limits are needed

---

### 3. Sequence

Use when a module needs ordered progressions (counting, patterns).

```javascript
sequence: {
    length: number,           // REQUIRED: number of items in sequence
    direction: string,        // REQUIRED: 'forwards' | 'backwards' | 'both'
    steps: number[],          // REQUIRED: increment/decrement values to choose from
    startStrategy: string     // REQUIRED: 'zero' | 'any' | 'multiple' | 'non_zero'
}
```

**startStrategy values:**
- `'zero'` - Sequence must start from 0
- `'any'` - Sequence can start from any value in range
- `'multiple'` - Sequence must start from a multiple of step
- `'non_zero'` - Sequence cannot start from 0

**Examples:**
```javascript
// Counting in 4s and 8s, 5 numbers, forwards only, start from 0
sequence: {
    length: 5,
    direction: 'forwards',
    steps: [4, 8],
    startStrategy: 'zero'
}

// Flexible counting, can go either direction
sequence: {
    length: 4,
    direction: 'both',
    steps: [50, 100],
    startStrategy: 'multiple'
}
```

---

### 4. Precision

Use when a module needs decimal/rounding control.

```javascript
precision: {
    decimalPlaces: number,    // REQUIRED: maximum decimal places
    rounding: string,         // Optional: 'none' | 'nearest' | 'floor' | 'ceil'
    trailingZeros: boolean    // Optional: preserve trailing zeros? (default: false)
}
```

**Examples:**
```javascript
// Money - always 2 decimal places
precision: { decimalPlaces: 2, trailingZeros: true }

// Measurements - round to nearest whole
precision: { decimalPlaces: 0, rounding: 'nearest' }

// Scientific - 3 decimal places, no rounding
precision: { decimalPlaces: 3, rounding: 'none' }
```

---

### 5. Options

Use when a module needs to select from enumerated choices.

```javascript
options: {
    values: any[],            // REQUIRED: available choices
    select: string,           // REQUIRED: 'one' | 'multiple'
    weights: number[] | null  // Optional: probability weights (must match values length)
}
```

**Examples:**
```javascript
// Select one operation
options: {
    values: ['add', 'subtract', 'multiply'],
    select: 'one'
}

// Select with weighted probability (more likely to get 'add')
options: {
    values: ['add', 'subtract'],
    select: 'one',
    weights: [0.7, 0.3]
}

// Select multiple shapes
options: {
    values: ['circle', 'square', 'triangle', 'rectangle'],
    select: 'multiple'
}
```

---

## Composing Primitives

Primitives can be used directly or nested in domain-specific containers.

### Direct Use

```javascript
math: {
    range: { min: 0, max: 100 },
    precision: { decimalPlaces: 1 }
}
```

### Nested in Domain Objects

```javascript
// Fractions module
math: {
    numerator: {
        bounds: { min: 1, max: 10 }
    },
    denominator: {
        options: { values: [2, 4, 8], select: 'one' }
    }
}

// Geometry module
math: {
    angles: {
        range: { min: 10, max: 170, step: 5 }
    },
    sides: {
        bounds: { min: 3, max: 8 }
    }
}
```

### Multiple Ranges

```javascript
// Different ranges for different operands
math: {
    operand1: {
        range: { min: 100, max: 999 }
    },
    operand2: {
        range: { min: 10, max: 99 }
    }
}
```

---

## Quick Reference

| Primitive | Use When | Required Fields |
|-----------|----------|-----------------|
| `range` | Numeric bounds with steps | `min`, `max` |
| `bounds` | Simple limits, nullable | `min`, `max` |
| `sequence` | Ordered progressions | `length`, `direction`, `steps`, `startStrategy` |
| `precision` | Decimal control | `decimalPlaces` |
| `options` | Enumerated choices | `values`, `select` |

---

## Adding New Primitives

When you need a concept not covered by existing primitives:

1. **Check** if an existing primitive can be adapted
2. **Design** the structure with required vs optional fields
3. **Document** in the generator comments
4. **Propose** addition to this skill file if generally useful

**Template for new primitive:**
```javascript
newPrimitive: {
    requiredField: type,      // REQUIRED: description
    optionalField: type       // Optional: description (default: value)
}
```

---

## Validation Notes

When designing parameters with primitives:

- `range.min` should be less than or equal to `range.max`
- `bounds` can have null values; `range` cannot
- `sequence.steps` should contain positive numbers
- `options.weights` length must match `options.values` length
- `precision.decimalPlaces` should be non-negative
