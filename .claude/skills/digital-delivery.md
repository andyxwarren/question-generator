---
name: digital-delivery
description: Assess if a curriculum module can be delivered digitally (yes / no / yes with adaptations). Use when evaluating module suitability for screen-based learning platforms.
---

# Digital Delivery Assessment Reference

Assess whether a curriculum module can be effectively delivered through digital/screen-based platforms, or if it requires physical resources, manipulatives, or activities that cannot be replicated digitally.

## Immutable Principles

These rules MUST always be followed when assessing digital delivery suitability.

### The 3 Classification Types

| Classification | Description | Action |
|---------------|-------------|--------|
| `digital-ready` | Can be delivered digitally without changes | Proceed with implementation |
| `digital-with-adaptations` | Needs modifications but can work digitally | Document required adaptations |
| `not-digital-suitable` | Requires physical resources that cannot be replicated | Flag for alternative delivery |

### Key Decision Rule

**Assess based on:**
1. Input method required (typing, clicking, dragging)
2. Visual representation feasibility
3. Answer validation complexity
4. Physical resource requirements

---

## Digital-Ready Indicators

Modules with these characteristics can be delivered digitally without changes:

| Indicator | Why It Works |
|-----------|--------------|
| Text/numeric input answers | Simple keyboard entry |
| Multiple choice questions | Click-to-select interface |
| Single correct answer | Automated validation possible |
| Static visuals (number lines, charts) | Can be rendered on screen |
| Sequence completion | Gap-fill interface works well |
| Equation solving | Standard input boxes |
| True/false questions | Binary choice interface |

### Question Types That Are Digital-Ready

| Question Type | Input Method | Validation |
|--------------|--------------|------------|
| `text_input` | Keyboard | Exact match or numeric tolerance |
| `multiple_choice` | Click/tap | Selection matching |
| `fill_blanks` | Keyboard per gap | Gap-by-gap validation |
| `next_number` | Keyboard | Numeric validation |
| `drag_drop` | Touch/mouse | Position matching |

---

## Digital-With-Adaptations

These scenarios CAN work digitally but need specific adaptations:

| Physical Requirement | Digital Adaptation | Complexity |
|---------------------|-------------------|------------|
| Physical manipulatives (counters, cubes) | Virtual manipulatives, drag-drop | Medium |
| Ruler/protractor measurement | On-screen measurement tools with guides | High |
| Paper-based column method | Columnar grid widget with digit placement | Medium |
| Drawing/sketching shapes | Simplified shape tools or preset options | Medium |
| Number line marking | Interactive clickable number line | Low |
| Clock hands positioning | Draggable clock hands widget | Medium |
| Fraction shading | Click-to-shade segments | Low |
| Array building | Grid-based click interface | Medium |

### Adaptation Examples

**Physical → Digital Transformation:**

```
PHYSICAL: Use base-10 blocks to show 234
DIGITAL: Virtual base-10 blocks with drag-drop OR
         Place value chart with click-to-add blocks

PHYSICAL: Draw a line 7cm long using a ruler
DIGITAL: On-screen ruler tool with snap-to-grid OR
         Simplified "select the correct length" multiple choice

PHYSICAL: Fold paper to show halves
DIGITAL: Animation showing folding OR
         Interactive shape with fold line tool
```

---

## Not Digital-Suitable

These scenarios CANNOT be effectively replicated digitally:

| Requirement | Why Not Digital | Alternative |
|-------------|-----------------|-------------|
| Physical measurement of real objects | Need actual objects and tools | Classroom activity |
| 3D shape construction from nets | Tactile folding experience | Hands-on lesson |
| Weighing real objects | Need physical scales and items | Practical session |
| Collaborative group work | Requires physical presence | Separate activity type |
| Fine motor skill development | Handwriting practice needs paper | Supplementary practice |
| Real-world data collection | Need to measure/count real things | Field activity |
| Physical sorting/grouping | Tactile categorisation | Manipulative session |

### Red Flags for Non-Digital

If the curriculum statement includes:
- "Use practical equipment to..."
- "Measure real objects..."
- "Construct/build/make..."
- "Handle/manipulate..."
- "Estimate then measure..."

Consider flagging as `not-digital-suitable` or `digital-with-adaptations`.

---

## Decision Matrix by Strand

| Strand | Typical Suitability | Notes |
|--------|---------------------|-------|
| Number (counting, sequences) | `digital-ready` | Text/visual input works well |
| Number (place value) | `digital-ready` | Charts and inputs work |
| Calculation (mental) | `digital-ready` | Standard equation input |
| Calculation (written) | `digital-with-adaptations` | Need columnar grid widget |
| Fractions | `digital-ready` to `adaptations` | Depends on visual requirements |
| Measurement (reading scales) | `digital-with-adaptations` | Need scale visuals |
| Measurement (practical) | `not-digital-suitable` | Requires physical measuring |
| Time | `digital-ready` to `adaptations` | Clock widgets available |
| Money | `digital-ready` | Coin/note images work |
| Geometry (properties) | `digital-ready` | Shape images work |
| Geometry (construction) | `not-digital-suitable` | Needs physical tools |
| Statistics | `digital-ready` | Chart/graph visuals work |

---

## Decision Tree

```
START
  │
  ▼
Does the module require physical measurement of real objects?
  │
  ├─ YES → not-digital-suitable
  │
  ▼ NO
Does the module require hands-on construction or manipulation?
  │
  ├─ YES → not-digital-suitable (or digital-with-adaptations if virtual version exists)
  │
  ▼ NO
Does the module require physical manipulatives?
  │
  ├─ YES → digital-with-adaptations (virtual manipulatives)
  │
  ▼ NO
Does the module require drawing, sketching, or freeform input?
  │
  ├─ YES → digital-with-adaptations (simplified tools)
  │
  ▼ NO
Can answers be validated automatically?
  │
  ├─ NO → digital-with-adaptations (manual review needed)
  │
  ▼ YES
→ digital-ready
```

---

## Examples

### Digital-Ready Examples

| Module | Curriculum Statement | Classification | Reason |
|--------|---------------------|----------------|--------|
| N01_Y3_NPV | Count in multiples of 4, 8, 50 | `digital-ready` | Sequence input, auto-validate |
| C01_Y1_CALC | Number bonds within 20 | `digital-ready` | Simple numeric input |
| C02_Y3_CALC | Add numbers up to 3 digits | `digital-ready` | Equation input |
| F01_Y2_FRAC | Recognise 1/2, 1/4, 3/4 | `digital-ready` | Multiple choice or input |

### Digital-With-Adaptations Examples

| Module | Curriculum Statement | Classification | Adaptation Needed |
|--------|---------------------|----------------|-------------------|
| C02_Y4_CALC | Written column addition | `digital-with-adaptations` | Columnar grid widget |
| M02_Y2_MEAS | Read scales (mass, capacity) | `digital-with-adaptations` | Scale visual with pointer |
| M04_Y2_MEAS | Tell time to 5 minutes | `digital-with-adaptations` | Clock face widget |
| G01_Y3_GEOM | Draw 2D shapes | `digital-with-adaptations` | Shape drawing tool |

### Not-Digital-Suitable Examples

| Module | Curriculum Statement | Classification | Reason |
|--------|---------------------|----------------|--------|
| M01_Y1_MEAS | Compare lengths of objects | `not-digital-suitable` | Need real objects |
| G02_Y3_GEOM | Make 3D shapes from nets | `not-digital-suitable` | Requires folding paper |
| M02_Y1_MEAS | Measure using non-standard units | `not-digital-suitable` | Need physical manipulatives |

---

## Validation Checklist

When assessing digital delivery suitability:

```
Assessment Check:
[ ] Reviewed curriculum statement for physical requirements
[ ] Identified input method(s) needed
[ ] Confirmed answer validation is automatable
[ ] Checked visual representation feasibility

For digital-ready:
[ ] Standard input types sufficient
[ ] No physical resources required
[ ] Auto-validation possible

For digital-with-adaptations:
[ ] Documented specific adaptations needed
[ ] Identified widgets/tools required
[ ] Confirmed adaptation maintains learning objective
[ ] Noted any limitations vs physical version

For not-digital-suitable:
[ ] Confirmed physical requirement is essential
[ ] Documented why digital alternative insufficient
[ ] Suggested alternative delivery method
```

---

## Output Format

When assessing a module, provide:

```
Digital Delivery: digital-ready | digital-with-adaptations | not-digital-suitable

If digital-with-adaptations:
  - Adaptations required: [list specific changes]
  - Widgets needed: [list digital components]
  - Limitations: [any reduced functionality vs physical]

If not-digital-suitable:
  - Physical requirements: [what cannot be replicated]
  - Alternative delivery: [suggested approach]
```
