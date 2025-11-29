---
name: digital-assets
description: Analyze question types to determine which digital assets are required, would enhance learning, or are not needed. Use when designing display metadata for modules.
---

# Digital Assets Assessment Reference

Analyze curriculum modules and question types to determine which digital assets (visual components, interactive widgets) are required for the question to function, would enhance learning, or are not needed.

## Immutable Principles

These rules MUST always be followed when assessing digital asset needs.

### The 3 Classification Levels

| Level | Description | Example |
|-------|-------------|---------|
| `required` | Question cannot be properly delivered without this asset | Number line for "mark 450 on the number line" |
| `enhanced-by` | Asset significantly improves understanding but question works without it | Part-whole model for number bonds |
| `not-required` | No specific digital asset needed | Pure text arithmetic "5 + 3 = ?" |

### Key Decision Rule

**Required**: The question explicitly references or depends on the visual
**Enhanced-by**: The visual supports the concept but isn't mentioned in the question
**Not-required**: The question is purely text/numeric with no visual benefit

---

## Asset Catalogue

Available digital assets and when they apply:

| Asset | Description | When REQUIRED | When ENHANCES |
|-------|-------------|---------------|---------------|
| `number_line` | Line with intervals and markers | Position identification, rounding to nearest | Counting sequences, ordering |
| `part_whole_model` | Bar/cherry model showing whole and parts | Part-whole diagram questions | Number bonds, missing addend |
| `sequence_boxes` | Row of boxes with gaps | Fill-the-sequence format | Any counting pattern |
| `columnar_grid` | Grid for written calculation layout | Column method questions | Mental calculation scaffolding |
| `place_value_chart` | H/T/O column display | "Which digit is in the tens place?" | Partitioning, comparing numbers |
| `fraction_visual` | Circle/bar with shaded segments | "Shade 3/4 of this shape" | Fraction comparison, equivalence |
| `clock_face` | Analog or digital clock display | "What time does the clock show?" | Duration calculations |
| `array_dots` | Grid of dots in rows/columns | Array-based multiplication | Repeated addition |
| `hundred_square` | 10x10 numbered grid | Pattern finding on grid | Counting in steps, multiples |
| `measurement_scale` | Ruler, weighing scale, measuring jug | "Read the scale" questions | Estimation, comparison |
| `bar_chart` | Vertical/horizontal bar chart | "Read the bar chart" | Data comparison |
| `pictogram` | Picture-based chart | "Read the pictogram" | Data representation |
| `coin_notes` | Currency images | Coin recognition, making amounts | Money word problems |
| `equation_display` | Formatted equation with gap | Fill-in equations | Any calculation |

---

## Decision Logic

Follow this logic to classify asset requirements:

```
REQUIRED if:
├─ Question text explicitly mentions the visual
│   "Look at the number line..." → number_line REQUIRED
│   "What time does the clock show?" → clock_face REQUIRED
│   "Read the scale..." → measurement_scale REQUIRED
│
├─ Question type depends on visual interaction
│   "Mark 450 on the number line" → number_line REQUIRED
│   "Shade 3/4 of the shape" → fraction_visual REQUIRED
│   "Complete the column addition" → columnar_grid REQUIRED
│
└─ Answer cannot be determined without the visual
    Position questions, scale reading, chart interpretation

ENHANCED-BY if:
├─ Visual supports conceptual understanding
│   Number bonds → part_whole_model helps visualise relationship
│   Sequences → sequence_boxes structure the pattern
│   Place value → place_value_chart clarifies columns
│
├─ Visual provides scaffolding but isn't essential
│   Mental arithmetic → equation_display structures thinking
│   Counting patterns → hundred_square shows relationships
│
└─ Visual makes abstract concrete
    Fractions → fraction_visual even for "what is 1/2 of 8?"
    Arrays → array_dots for "4 × 3 = ?"

NOT-REQUIRED if:
├─ Pure text/numeric question
│   "5 + 3 = ?" → just needs answer input
│   "What is 100 - 37?" → pure calculation
│
├─ Answer is fully contained in question text
│   Word problems with all numbers stated
│
└─ Visual would add no pedagogical value
    Simple recall questions
```

---

## Question Type → Asset Analysis

| Question Type | Required Assets | Enhancing Assets |
|---------------|-----------------|------------------|
| Number line position | `number_line` | - |
| Rounding to nearest 10/100 | `number_line` | - |
| Counting sequences (fill gap) | `sequence_boxes` | `number_line`, `hundred_square` |
| Number bonds | - | `part_whole_model` |
| Missing addend (? + 5 = 12) | - | `part_whole_model`, `equation_display` |
| Written column method | `columnar_grid` | - |
| Mental arithmetic | - | `equation_display` |
| Place value digit questions | - | `place_value_chart` |
| Partitioning numbers | - | `place_value_chart` |
| Tell the time | `clock_face` | - |
| Time duration | - | `clock_face` |
| Fraction of shape | `fraction_visual` | - |
| Fraction calculation | - | `fraction_visual` |
| Equivalent fractions | - | `fraction_visual` |
| Multiplication (arrays) | - | `array_dots` |
| Read scale/measure | `measurement_scale` | - |
| Estimate measurement | - | `measurement_scale` |
| Read bar chart | `bar_chart` | - |
| Read pictogram | `pictogram` | - |
| Coin recognition | `coin_notes` | - |
| Money word problems | - | `coin_notes` |
| Word problems (general) | - | `context_illustration` |

---

## Strand-Based Recommendations

### Number Strand

| Substrand | Typically Required | Typically Enhancing |
|-----------|-------------------|---------------------|
| Counting sequences | `sequence_boxes` | `number_line`, `hundred_square` |
| Place value | - | `place_value_chart` |
| Ordering/comparing | - | `number_line` |
| Rounding | `number_line` | - |

### Calculation Strand

| Substrand | Typically Required | Typically Enhancing |
|-----------|-------------------|---------------------|
| Mental add/sub | - | `part_whole_model`, `equation_display` |
| Written add/sub | `columnar_grid` | - |
| Multiplication facts | - | `array_dots` |
| Written multiply/divide | `columnar_grid` | - |

### Measurement Strand

| Substrand | Typically Required | Typically Enhancing |
|-----------|-------------------|---------------------|
| Reading scales | `measurement_scale` | - |
| Time | `clock_face` | - |
| Money | - | `coin_notes` |
| Comparison | - | `measurement_scale` |

### Fractions Strand

| Substrand | Typically Required | Typically Enhancing |
|-----------|-------------------|---------------------|
| Recognise fractions | `fraction_visual` | - |
| Calculate with fractions | - | `fraction_visual` |
| Equivalent fractions | - | `fraction_visual` |

### Statistics Strand

| Substrand | Typically Required | Typically Enhancing |
|-----------|-------------------|---------------------|
| Interpret charts | `bar_chart` or `pictogram` | - |
| Create charts | - | `bar_chart`, `pictogram` |

---

## Examples

### Required Assets

| Question | Required Asset | Reason |
|----------|---------------|--------|
| "What number is the arrow pointing to?" [with number line] | `number_line` | Cannot answer without seeing the line |
| "Complete the column addition: 345 + 127" | `columnar_grid` | Method requires grid layout |
| "What time does this clock show?" | `clock_face` | Cannot read time without clock |
| "Shade 3/4 of this rectangle" | `fraction_visual` | Interaction requires the shape |

### Enhanced-By Assets

| Question | Enhancing Asset | Why It Helps |
|----------|-----------------|--------------|
| "5 + ? = 12" | `part_whole_model` | Visualises the relationship |
| "Count in 5s: 5, 10, 15, __, __" | `sequence_boxes` | Structures the pattern |
| "What is the value of the 4 in 4,372?" | `place_value_chart` | Clarifies column positions |
| "4 × 3 = ?" | `array_dots` | Shows repeated groups |

### Not Required

| Question | Reason |
|----------|--------|
| "What is 8 + 7?" | Pure recall, no visual needed |
| "Calculate 156 - 89" | Mental calculation, answer input only |
| "True or false: 50 > 45" | Binary choice, no visual benefit |

---

## Validation Checklist

When assessing digital asset needs:

```
For each question type in the module:

REQUIRED Check:
[ ] Does question text explicitly reference a visual?
[ ] Does question require interaction with a visual?
[ ] Can the answer be determined without the visual?

ENHANCED-BY Check:
[ ] Would a visual help conceptual understanding?
[ ] Does the strand/topic typically benefit from visualisation?
[ ] Would scaffolding improve accessibility?

NOT-REQUIRED Confirmation:
[ ] Is the question purely text/numeric?
[ ] Would visuals add no pedagogical value?
```

---

## Output Format

When assessing a module, provide:

```
Digital Assets Assessment:

Required:
  - [asset_name]: [which question types need it]

Enhanced-by:
  - [asset_name]: [which question types benefit]

Not Required:
  - [list question types needing no assets]

Display Metadata Recommendations:
  - Include [asset] in questionParts for [question types]
  - Consider optional [asset] for enhanced learning
```

---

## Integration with Display Metadata

When an asset is **required**, it MUST appear in `questionParts`:

```javascript
// Required asset - must be in output
questionParts: [
    { type: 'text', value: 'What number is the arrow pointing to?' },
    {
        type: 'number_line',  // REQUIRED
        start: 0,
        end: 100,
        interval: 10,
        targetValue: 45,
        showArrow: true
    }
]
```

When an asset **enhances**, it SHOULD appear in `questionParts`:

```javascript
// Enhancing asset - recommended for better learning
questionParts: [
    { type: 'text', value: 'What is the missing number? 7 + ? = 12' },
    {
        type: 'part_whole_model',  // ENHANCES understanding
        whole: 12,
        parts: [7, null],
        unknownIndex: 1
    }
]
```

When **not required**, keep `questionParts` minimal:

```javascript
// No asset needed
questionParts: [
    { type: 'text', value: 'What is 8 + 7?' }
]
```
