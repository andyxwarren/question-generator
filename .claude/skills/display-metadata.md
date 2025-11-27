---
name: display-metadata
description: Display Metadata principles and visual type reference for UK Maths Question Generator. Use when designing or validating how questions provide rendering data for external display apps.
---

# Display Metadata Reference

Questions must include display metadata so external rendering apps can draw visuals without parsing question text.

## Immutable Principles

These 4 principles MUST always be followed. They are non-negotiable.

### The 4 Display Principles

| Principle | Description | Example |
|-----------|-------------|---------|
| **Reconstruction** | Include ALL data to draw the visual from scratch | Number line needs: start, end, interval, target |
| **Type Identification** | Always include `display.type` | `type: "number_line"` |
| **Raw Values** | Use numbers, not formatted strings | `targetValue: 50` not `"fifty"` |
| **Self-Contained** | Don't rely on text parsing | Include `step: 4` even if text says "in 4s" |

---

## Module = Schema Approach

**This is a core philosophy.** Each generator defines its own display metadata structure inline. There is NO central display schema to maintain or conform to.

### Why This Matters

- **Flexibility**: New modules can create entirely new visual types
- **No Bottlenecks**: Don't need to update a central schema before adding visuals
- **Self-Documenting**: The generator output IS the specification
- **Easy Evolution**: Modules can extend their display structures as needed

### How It Works

```javascript
// Generator outputs:
return {
    text: "What number is the arrow pointing to?",
    type: "text_input",
    answer: "450",

    // DISPLAY METADATA - generator defines the structure
    display: {
        type: "number_line",
        start: 0,
        end: 1000,
        interval: 50,
        targetValue: 450,
        showLabels: true
    }
};
```

The generator IS the schema for its display type. External display apps read the output structure and adapt their rendering accordingly.

---

## Reference Visual Types

The following are **examples of display structures used by existing modules**. They are NOT the only allowed visual types - generators can create ANY display structure that follows the 4 principles above.

When creating a new module, you may:
1. Use one of these existing types if it fits your needs
2. Extend an existing type with additional fields
3. Create an entirely new type that follows the 4 principles

### Sequence

For counting sequences with gaps.

```javascript
display: {
    type: "sequence",
    values: [0, 4, 8, null, 16],    // null marks gaps
    gapIndices: [3],                 // which indices are gaps
    step: 4,                         // counting increment
    direction: "forwards"            // forwards | backwards
}
```

**Required fields**: `values[]`, `gapIndices[]`, `step`, `direction`

---

### Number Line

For position identification on a number line.

```javascript
display: {
    type: "number_line",
    start: 0,                        // leftmost value
    end: 100,                        // rightmost value
    interval: 10,                    // tick spacing
    labeledValues: [0, 20, 40, 60, 80, 100],  // which ticks are labeled
    targetValue: 50,                 // the answer position
    showArrow: true,                 // show pointer arrow
    showLabels: true                 // show number labels
}
```

**Required fields**: `start`, `end`, `interval`, `targetValue`

---

### Columnar Calculation

For written column method display.

```javascript
display: {
    type: "columnar",
    num1: 345,                       // first number
    num2: 127,                       // second number
    operator: "+",                   // +, -, x, ÷
    result: 472,                     // answer (or null if that's the question)
    missingDigits: []                // positions of blanks [{row, col}]
}
```

**Required fields**: `num1`, `num2`, `operator`, `result`

---

### Clock

For time-telling questions.

```javascript
display: {
    type: "clock",
    hours: 3,                        // hour value (1-12)
    minutes: 45,                     // minute value (0-59)
    showHourHand: true,
    showMinuteHand: true,
    format: "analog"                 // analog | digital
}
```

**Required fields**: `hours`, `minutes`, `showHourHand`, `showMinuteHand`

---

### Place Value Chart

For place value column displays.

```javascript
display: {
    type: "place_value_chart",
    number: 4729,                    // the full number
    columns: ["thousands", "hundreds", "tens", "ones"],
    highlightedColumn: "hundreds",   // column being asked about (if any)
    showDigits: true                 // show digits in columns
}
```

**Required fields**: `number`, `columns[]`

---

### Bar Model

For part-whole relationship visuals.

```javascript
display: {
    type: "bar_model",
    whole: 24,                       // total value
    parts: [10, null, 6],            // parts (null = unknown)
    unknownIndex: 1,                 // which part is the question
    orientation: "horizontal"        // horizontal | vertical
}
```

**Required fields**: `whole`, `parts[]`, `unknownIndex`

---

### Fraction Visual

For fraction representation.

```javascript
display: {
    type: "fraction_visual",
    numerator: 3,
    denominator: 4,
    shadedParts: 3,                  // number of parts shaded
    shape: "circle"                  // circle | rectangle | bar
}
```

**Required fields**: `numerator`, `denominator`, `shadedParts`

---

### Text Only

For pure text questions with no special rendering.

```javascript
display: {
    type: "text_only"                // signals no special rendering needed
}
```

**Required fields**: (none)

---

## Creating New Visual Types

Creating a new visual type is straightforward - no schema updates required.

### Steps

1. **Define the display structure** in your generator (module = schema)
2. **Include `display.type`** with a descriptive name
3. **Follow the 4 principles** (reconstruction, type ID, raw values, self-contained)
4. **Document required fields** in generator comments

### Example: New Visual Type

```javascript
// NEW visual type - array dots
// Required fields: rows, cols, highlightedCount
display: {
    type: "array_dots",
    rows: 3,
    cols: 4,
    highlightedCount: 7,             // first N dots highlighted
    highlightColor: "blue"
}
```

### More Examples of Custom Types

```javascript
// Measurement scale
display: {
    type: "measurement_scale",
    scaleType: "ruler",
    unit: "cm",
    min: 0,
    max: 30,
    targetPosition: 17.5
}

// Venn diagram
display: {
    type: "venn_diagram",
    setA: [2, 4, 6, 8, 10],
    setB: [3, 6, 9, 12],
    intersection: [6],
    labelA: "Even",
    labelB: "Multiples of 3"
}

// Coordinate grid
display: {
    type: "coordinate_grid",
    xRange: [-5, 5],
    yRange: [-5, 5],
    points: [{x: 3, y: 2, label: "A"}],
    showGrid: true
}
```

These are all valid - the generator defines what fields its visual type needs.

---

## Validation Checklist

When validating display metadata:

```
Structure:
[ ] display.type is specified
[ ] Visual can be reconstructed from display fields alone
[ ] Raw numeric values included (not formatted strings)
[ ] All variable elements captured (gap positions, target values)

Self-Contained:
[ ] display fields match the visual type requirements
[ ] No data buried in question text that display app needs
[ ] Display app doesn't need to parse question text
```

---

## Red Flags

**REJECT if:**
- Question has visual element but no `display` object
- `display.type` is missing
- Critical rendering data is only in question text
- Values are pre-formatted strings instead of numbers
- Display app would need to parse question text to render

**Example Red Flag:**
```javascript
// BAD - display app can't render this
{
    text: "Look at this number line from 0 to 100. What number is at the arrow?",
    answer: "50"
    // No display object! App must parse text to get 0, 100, position
}

// GOOD - display app has everything
{
    text: "What number is the arrow pointing to?",
    answer: "50",
    display: {
        type: "number_line",
        start: 0,
        end: 100,
        interval: 10,
        targetValue: 50,
        showArrow: true
    }
}
```

---

## Parameter to Display Mapping

The `presentation` object in parameters hints at display needs:

```javascript
// Parameters include:
presentation: {
    visualType: "number_line",       // Hints what display type to output
    displayConfig: {                  // Hints for display options
        showLabels: true,
        showArrow: true
    }
}

// Generator uses these to build display metadata:
display: {
    type: params.presentation.visualType,
    // ... plus generated values
    showLabels: params.presentation.displayConfig?.showLabels ?? true
}
```
