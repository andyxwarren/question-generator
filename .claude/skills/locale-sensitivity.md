---
name: locale-sensitivity
description: Determine if a module involves units that vary by locale (measurement, currency, temperature) or is locale-neutral (pure maths). Use when assessing module portability across regions.
---

# Locale Sensitivity Reference

Assess whether a curriculum module involves locale-dependent units (measurement systems, currency, temperature) or is locale-neutral (pure mathematics that works identically worldwide).

## Immutable Principles

These rules MUST always be followed when classifying locale sensitivity.

### The 2 Classification Types

| Type | Description | Example Modules |
|------|-------------|-----------------|
| `locale-neutral` | Pure maths - works identically regardless of region | Number bonds, sequences, place value, fractions, multiplication tables |
| `locale-dependent` | Involves units that change by region | Length/mass/capacity measurement, money, temperature |

### Key Decision Rule

**If the module involves ANY of these unit categories, it is `locale-dependent`:**
- Measurement units (length, mass, capacity)
- Currency (money amounts, coins, notes)
- Temperature

**Everything else is `locale-neutral`.**

---

## Locale-Sensitive Unit Categories

When a module involves these categories, it requires locale-specific handling:

| Category | UK (en-GB) | US (en-US) | Impact |
|----------|------------|------------|--------|
| **Length** | km, m, cm, mm | miles, feet, inches, yards | Different base units, conversion factors |
| **Mass** | kg, g | pounds (lb), ounces (oz) | Different base units |
| **Capacity** | litres (l), millilitres (ml) | gallons, cups, fluid ounces | US/UK gallons differ too |
| **Temperature** | Celsius (°C) | Fahrenheit (°F) | Different scales, conversion formula |
| **Currency** | £ (pounds), p (pence) | $ (dollars), ¢ (cents) | Different symbols, denominations, coin values |

### Currency Denomination Differences

| UK | US |
|----|-----|
| 1p, 2p, 5p, 10p, 20p, 50p | 1¢, 5¢, 10¢, 25¢ |
| £1, £2 coins | $1 coin (rare) |
| £5, £10, £20, £50 notes | $1, $5, $10, $20 bills |

---

## Locale-Neutral Topics

These mathematical concepts work identically worldwide:

| Topic | Why Locale-Neutral |
|-------|-------------------|
| Counting and sequences | Numbers are universal |
| Number bonds | Addition/subtraction facts are universal |
| Place value | Decimal system is universal |
| Fractions (pure ratios) | 1/2 means the same everywhere |
| Multiplication tables | 7 × 8 = 56 everywhere |
| Written calculations (no context) | 345 + 127 is universal |
| Shape/geometry (no measurement) | Triangles, squares are universal |
| Time (hours/minutes) | Hours and minutes are universal; clock format is presentation |
| Ratios and proportion | Mathematical relationships are universal |
| Percentages (pure) | 25% means the same everywhere |
| Algebra | Variables and equations are universal |

### Time Exception Note

Time is **locale-neutral** because:
- Hours and minutes are universal units
- 12-hour vs 24-hour format is a **presentation choice**, not a mathematical difference
- Duration calculations work identically (1 hour = 60 minutes everywhere)

---

## Decision Tree

Follow this flowchart to classify a module:

```
START
  │
  ▼
Does the module involve measurement of physical quantities?
(length, mass, capacity, temperature)
  │
  ├─ YES → locale-dependent
  │
  ▼ NO
Does the module involve money/currency?
  │
  ├─ YES → locale-dependent
  │
  ▼ NO
Does the module involve temperature?
  │
  ├─ YES → locale-dependent
  │
  ▼ NO
→ locale-neutral
```

---

## Examples

### Locale-Neutral Examples

| Module | Curriculum Statement | Classification | Reason |
|--------|---------------------|----------------|--------|
| N01_Y3_NPV | Count in multiples of 4, 8, 50, 100 | `locale-neutral` | Pure counting, no units |
| C01_Y1_CALC | Number bonds within 20 | `locale-neutral` | Pure addition facts |
| C02_Y3_CALC | Written addition up to 3 digits | `locale-neutral` | Pure calculation |
| F01_Y3_FRAC | Recognise and show equivalent fractions | `locale-neutral` | Pure ratio concept |
| M04_Y2_MEAS | Tell the time to 5 minutes | `locale-neutral` | Time is universal |

### Locale-Dependent Examples

| Module | Curriculum Statement | Classification | Reason |
|--------|---------------------|----------------|--------|
| M01_Y3_MEAS | Measure lengths in cm and m | `locale-dependent` | Uses metric length units |
| M03_Y2_MEAS | Recognise and use £ and p | `locale-dependent` | UK currency |
| M05_Y4_MEAS | Convert km to m, kg to g | `locale-dependent` | Metric conversions |
| M01_Y5_MEAS | Convert miles to km | `locale-dependent` | Mixed unit systems |

---

## Word Problem Considerations

Even "pure maths" modules may become locale-dependent if word problems include:

| Context | Impact |
|---------|--------|
| "Sarah has £5" | Currency makes it locale-dependent |
| "The rope is 3 metres long" | Measurement makes it locale-dependent |
| "The temperature is 20°C" | Temperature makes it locale-dependent |
| "Tom has 5 apples" | No units - remains locale-neutral |

### Recommendation

For locale-neutral modules with word problems:
- Use abstract contexts (apples, stickers, counters)
- Avoid real-world measurement contexts
- If measurement context is needed, flag the module as locale-dependent

---

## Validation Checklist

When assessing a module's locale sensitivity:

```
Classification Check:
[ ] Reviewed curriculum statement for unit references
[ ] Checked parameter definitions for unit types
[ ] Examined word problem contexts (if any)
[ ] Confirmed no hidden locale-dependent elements

For locale-dependent modules:
[ ] Identified which unit categories are involved
[ ] Noted which locales would need different values
[ ] Confirmed conversion handling is possible

For locale-neutral modules:
[ ] Verified no measurement units in any question type
[ ] Verified no currency references
[ ] Verified no temperature references
[ ] Confirmed word problems use abstract contexts
```

---

## Output Format

When classifying a module, provide:

```
Locale Sensitivity: locale-neutral | locale-dependent

If locale-dependent:
  - Unit categories involved: [length, mass, capacity, currency, temperature]
  - Affected locales: [list locales requiring different handling]
  - Adaptation notes: [specific changes needed per locale]
```
