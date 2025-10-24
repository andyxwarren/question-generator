# M01_Y2_MEAS Parameter Design Analysis

## 1. Curriculum Analysis

**Original Statement**: "compare and order lengths, mass, volume/capacity and record the results using >, < and ="

**Extracted Mathematical Constraints**:
- Measurement types: lengths, mass, volume/capacity (4 types explicitly; time often implicit in Y2)
- Mathematical symbols: > (greater than), < (less than), = (equal to)
- Operations: compare, order, record
- Focus: Using symbolic notation to record comparisons

**Prerequisite Knowledge** (from Year 1):
- M01_Y1_MEAS: Qualitative comparisons using comparative language
- Understanding of "longer/shorter", "heavier/lighter", "holds more/less"
- Direct comparison of objects
- Ordering 3-4 objects by a property

**Core Concept**:
The KEY PROGRESSION is from qualitative language to mathematical symbolism. Year 1 established the conceptual understanding ("this is longer"); Year 2 adds formal notation ("3 > 2" or "this > that").

## 2. Module Split Decision

**RECOMMENDATION: Single Module (M01_Y2_MEAS)**

**Justification**:
- All skills involve the same core concept: comparative relationships
- The symbols (>, <, =) are three faces of the same skill (comparison recording)
- Measurement contexts (length, mass, capacity) are variations, not distinct skills
- Can be addressed through a single `measure_types` parameter
- Operations (recognize symbol, select symbol, use symbol) build progressively on each other

**No split needed** because:
- Introducing mathematical symbols is a unified skill across all measurement types
- Progression from symbol recognition → symbol use is continuous
- Year 1 covered all measurement contexts; Year 2 adds the symbolic layer

## 3. Vertical Progression Context

### Connection to Year 1 (M01_Y1_MEAS)

**Year 1, Level 4 (Exceeding)** provides:
- Comparison of all 5 measure types (length, height, mass, capacity, time)
- Ordering 4 objects instead of 3
- Practical problems requiring comparison thinking
- Understanding of comparative language (longer, heavier, holds more)

**Year 2, Level 1 (Beginning)** should bridge from:
- Year 1's qualitative understanding → symbolic representation
- Start with symbol RECOGNITION (matching symbol to comparison)
- Use 2-3 measurement types (length, mass) before adding others
- Simple, direct comparisons before ordering

### Preparation for Year 3 (M01_Y3_MEAS)

**Year 2, Level 4 (Exceeding)** should prepare for:
- Year 3: Using standard units with symbols (e.g., "5cm > 3cm")
- More complex ordering (chain comparisons: "a > b > c")
- Combined comparisons across measurement types
- Symbol fluency as automatic skill (ready for numerical use)

**Transition**: Year 2 establishes symbolic fluency with qualitative/relative comparisons. Year 3 will apply these symbols to measured quantities with units.

## 4. Four-Level Parameter Design

### Level 1 (Beginning) - Symbol Recognition & Simple Comparison

**Focus**: Introduce symbols through matching and recognition
**Progression Stage**: "I can recognize what > means"

```javascript
1: {
    measure_types: ['length', 'mass'],
    operations: ['symbol_recognition', 'symbol_matching'],
    symbols: ['>', '<'],  // Exclude = initially
    comparison_count: 2,  // Always 2 objects
    use_numbers: false,   // Use object names, not quantities
    provide_statement: true  // Give verbal statement, select symbol
}
```

**Design Rationale**:
- Start with only 2 measurement types (length, mass) - most concrete for Year 2
- Omit '=' initially - focus on inequality first (clearer conceptual difference)
- 2 objects only (A vs B, no ordering yet)
- Operations focus on RECOGNITION: "pencil is longer than crayon. Which symbol? > or <"
- `provide_statement: true` means questions give the comparison in words, students select symbol

**Example Questions**:
- "A rope is longer than a pencil. Which symbol shows this? (a) > (b) <"
- "The book is heavier than the ball. Choose the correct symbol: (a) < (b) >"
- "This ribbon is shorter than that stick. Which is correct? (a) ribbon > stick (b) ribbon < stick"

**What Makes This Level Distinct**:
- Scaffolded: comparison already stated in words
- Binary choice (only 2 symbols)
- Concrete measurement types only
- No ordering, only pairwise comparison
- Symbol as answer, not part of the comparison process

---

### Level 2 (Developing) - Symbol Selection & Recording

**Focus**: Select appropriate symbols to record comparisons
**Progression Stage**: "I can choose the right symbol for a comparison"

```javascript
2: {
    measure_types: ['length', 'mass', 'capacity'],
    operations: ['symbol_selection', 'complete_comparison'],
    symbols: ['>', '<', '='],  // Add equals
    comparison_count: 2,
    use_numbers: false,
    provide_statement: false,  // Give objects, student determines comparison AND symbol
    visual_cues: true  // May show size relationships visually
}
```

**Design Rationale**:
- Add capacity (3 measurement types)
- Introduce '=' symbol for equal comparisons
- Remove scaffolding: students must determine BOTH the comparison AND the symbol
- `provide_statement: false` means students analyze the comparison themselves
- `visual_cues: true` allows questions to show relative sizes (e.g., "Pencil (short) vs Ribbon (long)")

**Example Questions**:
- "Pencil (15cm) compared to Crayon (8cm). Which symbol completes: Pencil ___ Crayon? (a) > (b) < (c) ="
- "A jug and a cup. The jug holds more. Complete: jug ___ cup (a) > (b) < (c) ="
- "Two boxes have the same mass. Complete: Box A ___ Box B (a) > (b) < (c) ="

**What Makes This Level Distinct**:
- Student must determine the comparison (not just recognize symbol)
- Introduces equals (=) for equivalence
- Still pairwise (2 objects), no complex ordering
- Three-way choice (>, <, =)
- Visual cues help but student must interpret

---

### Level 3 (Meeting) - Full Symbolic Recording & Ordering

**Focus**: Record comparisons and orderings using all three symbols
**Progression Stage**: "I can record any comparison correctly using >, < or ="

```javascript
3: {
    measure_types: ['length', 'mass', 'capacity', 'time'],
    operations: ['symbol_selection', 'complete_comparison', 'ordering_with_symbols', 'chain_comparisons'],
    symbols: ['>', '<', '='],
    comparison_count: [2, 3],  // Mix of pairwise and 3-object ordering
    use_numbers: false,
    provide_statement: false,
    visual_cues: false,  // Student relies on understanding, not visuals
    require_explanation: false  // Symbol only, no justification yet
}
```

**Design Rationale**:
- ALL 4 measurement types from curriculum (length, mass, capacity, time)
- ALL symbols (>, <, =)
- Introduce ordering: "Put A, B, C in order and write: A > B > C"
- Chain comparisons: "If A > B and B > C, what about A and C?"
- No visual cues - rely on conceptual understanding
- This level MUST match the curriculum statement precisely

**Example Questions**:
- "Order these from shortest to longest and record using >: pencil, rope, ribbon"
  Answer format: "rope > ribbon > pencil" (text input)
- "A book is heavier than a ball. A ball is heavier than a feather. Complete: book ___ feather (a) > (b) < (c) ="
- "Walking to school takes longer than eating lunch. Which symbol? walking ___ eating (a) > (b) < (c) ="
- "Two bottles hold the same amount. Record this: Bottle A ___ Bottle B (answer: =)"

**What Makes This Level Distinct**:
- Ordering 3 objects (not just pairwise)
- Chain/transitive comparisons
- Text input for ordering (not just multiple choice)
- All measurement types including abstract time
- Meets curriculum exactly: "compare and order...and record the results using >, < and ="

---

### Level 4 (Exceeding) - Complex Orderings & Mixed Symbols

**Focus**: Complex scenarios with multiple comparisons and combined symbols
**Progression Stage**: "I can handle complex comparison scenarios and explain my reasoning"

```javascript
4: {
    measure_types: ['length', 'mass', 'capacity', 'time'],
    operations: ['ordering_with_symbols', 'chain_comparisons', 'mixed_comparisons', 'error_identification'],
    symbols: ['>', '<', '='],
    comparison_count: [3, 4],  // Up to 4 objects
    use_numbers: false,
    provide_statement: false,
    visual_cues: false,
    require_explanation: true,  // May ask "why" or "explain"
    include_errors: true  // Identify incorrect symbol use
}
```

**Design Rationale**:
- Order up to 4 objects (prepare for Y3 complexity)
- Mixed comparisons: some =, some >, some <
- Error identification: "Which statement is wrong? (a) A > B (b) B = C (c) A < C"
- Occasionally require explanation (prepare for reasoning)
- Transitive reasoning: "If X > Y and Y = Z, then X ___ Z"
- Prepares for Year 3's numerical comparisons with units

**Example Questions**:
- "Order these 4 items from heaviest to lightest using symbols: book, brick, feather, teddy bear"
  Answer: "brick > book > teddy bear > feather"
- "Rope A and Rope B are the same length. Rope C is longer than Rope A. Write 2 statements using symbols."
  Answer: "A = B, C > A" (or "C > B")
- "Which is wrong? (a) 5 > 3 (b) 3 = 3 (c) 5 < 3"
  Answer: "(c) 5 < 3"
- "If Tom's bag is heavier than Sara's, and Sara's is heavier than Liam's, complete: Tom's bag ___ Liam's bag"
  Answer: ">" (with reasoning)

**What Makes This Level Distinct**:
- 4 objects (most complex for Y2)
- Error identification (metacognitive skill)
- Combined use of all 3 symbols in one problem
- Transitive reasoning required
- Occasionally explain reasoning (bridge to Y3)
- Prepares for numerical measurements in Y3

---

## 5. Parameter Comparison Table

| Parameter | Level 1 (Beginning) | Level 2 (Developing) | Level 3 (Meeting) | Level 4 (Exceeding) |
|-----------|---------------------|----------------------|-------------------|---------------------|
| **measure_types** | `['length', 'mass']` | `['length', 'mass', 'capacity']` | `['length', 'mass', 'capacity', 'time']` | `['length', 'mass', 'capacity', 'time']` |
| **operations** | `['symbol_recognition', 'symbol_matching']` | `['symbol_selection', 'complete_comparison']` | `['symbol_selection', 'complete_comparison', 'ordering_with_symbols', 'chain_comparisons']` | `['ordering_with_symbols', 'chain_comparisons', 'mixed_comparisons', 'error_identification']` |
| **symbols** | `['>', '<']` | `['>', '<', '=']` | `['>', '<', '=']` | `['>', '<', '=']` |
| **comparison_count** | `2` | `2` | `[2, 3]` | `[3, 4]` |
| **use_numbers** | `false` | `false` | `false` | `false` |
| **provide_statement** | `true` | `false` | `false` | `false` |
| **visual_cues** | N/A | `true` | `false` | `false` |
| **require_explanation** | N/A | `false` | `false` | `true` |
| **include_errors** | N/A | N/A | N/A | `true` |

**Key Progression**:
1. **Measurement Types**: 2 → 3 → 4 → 4 (gradual expansion)
2. **Symbols**: 2 (>, <) → 3 (add =) → 3 → 3
3. **Operations**: Recognition → Selection → Ordering → Complex/Errors
4. **Scaffolding**: High (statement provided) → Medium (visual cues) → Low (none) → None + metacognition
5. **Object Count**: 2 → 2 → 2-3 → 3-4

## 6. Cross-Level Validation

### ✓ Level 3 Curriculum Alignment
**Curriculum Statement**: "compare and order lengths, mass, volume/capacity and record the results using >, < and ="

**Level 3 Parameters Match**:
- ✓ Compare: `symbol_selection`, `complete_comparison`
- ✓ Order: `ordering_with_symbols`
- ✓ Lengths, mass, volume/capacity: `['length', 'mass', 'capacity', 'time']` (time typically included)
- ✓ Record using >, <, =: All three symbols included
- ✓ Range: 2-3 object comparisons (appropriate for Year 2)

**Verdict**: Level 3 PRECISELY matches curriculum requirements.

### ✓ Age-Appropriateness (Year 2, ages 6-7)

**Level 1**:
- ✓ Highly scaffolded (statement provided)
- ✓ Binary choices (only 2 symbols)
- ✓ Concrete measurement types
- ✓ Appropriate cognitive load for early Y2

**Level 2**:
- ✓ Three-way choices manageable for mid-Y2
- ✓ Visual cues support interpretation
- ✓ Still pairwise (no complex ordering)

**Level 3**:
- ✓ Ordering 3 objects is Y2-appropriate
- ✓ Abstract concepts (time) introduced when ready
- ✓ Chain comparisons scaffold transitive reasoning

**Level 4**:
- ✓ 4 objects challenges but doesn't overwhelm
- ✓ Error identification is metacognitive but age-appropriate
- ✓ Explanation occasionally, not always (balance challenge with confidence)

**Verdict**: All levels are developmentally appropriate for Year 2.

### ✓ Difficulty Progression

**Between Levels**:
- Level 1→2: Add 1 symbol (=), remove scaffolding, add 1 measure type (CLEAR JUMP)
- Level 2→3: Add time, introduce ordering, remove visual cues (CLEAR JUMP)
- Level 3→4: Increase object count, add errors, require reasoning (CLEAR JUMP)

**Verdict**: Clear, noticeable difficulty increases at each level.

## 7. Edge Cases and Considerations

### Potential Issues

1. **Symbol Direction Confusion**
   - Students commonly confuse > and < direction
   - **Generator must**: Provide clear context, consistent orientation
   - **Consider**: Including visual mnemonics in Level 1 (e.g., "the big mouth eats the bigger number")

2. **Equals Symbol with Qualitative Comparisons**
   - Showing two objects are "equal" in length/mass requires careful context
   - **Generator must**: Use clear scenarios (e.g., "Two ropes are the same length")
   - **Avoid**: Ambiguous comparisons (e.g., "similar" vs "exactly equal")

3. **Time Comparisons Are Abstract**
   - Time is the most abstract measurement type for Y2
   - **Generator must**: Use familiar activities with clear duration differences
   - **Recommendation**: Delay time until Level 3 (implemented via `measure_types` progression)

4. **Ordering Notation**
   - Students must understand "A > B > C" means A is biggest, C is smallest
   - **Generator must**: Provide examples in Level 3 before assessing
   - **Consider**: Accept multiple valid orderings (e.g., "A > B > C" same as "C < B < A")

5. **Object Names vs. Variables**
   - Year 2 uses object names ("pencil", "rope"), not abstract variables (A, B)
   - **Generator must**: Use concrete object names from Y1's MEASURE_CONTEXTS
   - **Level 4 exception**: Can introduce A, B, C for error identification (bridge to Y3)

6. **Text Input Validation**
   - Accepting "rope > pencil > ribbon" requires flexible parsing
   - **Generator must**: Normalize whitespace, accept variations in order (if mathematically equivalent)
   - **Recommendation**: Use multiple_choice for Levels 1-2, introduce text_input in Level 3

7. **Visual Representation**
   - Level 2 uses `visual_cues: true` but generator must implement
   - **Recommendation**: Simple HTML approach (e.g., "Pencil (short)" vs "Rope (long)")
   - **Avoid**: Complex graphics; follow CLAUDE.md low-overhead philosophy

### Special Handling Needed

1. **Reuse Year 1 Object Metadata**
   - Import `MEASURE_CONTEXTS` from M01_Y1_MEAS generator
   - Use same `size` metadata for consistency
   - Add to existing objects or create Y2-specific additions if needed

2. **Symbol Orientation Consistency**
   - Always present symbols in same orientation (don't rotate)
   - Use standard Unicode: > (U+003E), < (U+003C), = (U+003D)

3. **Answer Validation for Orderings**
   - Text input answers like "A > B > C" need careful validation
   - **Recommendation**: Accept comma-separated or space-separated
   - **Also accept**: Reverse orderings if using < (e.g., "C < B < A" equivalent to "A > B > C")

4. **Transitive Reasoning Scaffolding**
   - Level 3 introduces "If A > B and B > C, then A > C"
   - **Generator should**: Make intermediate steps visible initially
   - **Level 4**: Remove scaffolding

### Boundary Conditions

1. **Equal Comparisons**
   - Only introduce in Level 2+
   - Ensure clear scenarios (e.g., "same length" not "similar length")

2. **Four Objects (Level 4)**
   - Maximum for Year 2 developmental stage
   - Don't exceed 4 even for exceeding students

3. **Mixed Symbols**
   - Level 4 only: "A = B, B > C, so A > C"
   - Ensure logical consistency in all generated chains

## 8. Implementation Readiness

### Ready for Question Template Designer: YES ✓

**Complete Parameter Sets**: All 4 levels fully specified

**Handoff Notes for Question Template Designer**:

1. **Object Data Source**: Import and reuse `MEASURE_CONTEXTS` from `src/generators/M01_Y1_MEAS_comparison.js`
   - Contains: length, height, mass, capacity, time objects with size/duration metadata
   - Ensures consistency between Year 1 and Year 2 modules

2. **Question Type Recommendations**:
   - **Level 1**: `multiple_choice` (select symbol)
   - **Level 2**: `multiple_choice` (select symbol with more complexity)
   - **Level 3**: Mix of `multiple_choice` and `text_input` (for ordering)
   - **Level 4**: `text_input` (for complex orderings), `multiple_choice` (for error ID)

3. **Required Operations** (suggested breakdown):
   - **Operation 1**: Symbol Recognition (Level 1) - "Rope is longer than pencil. Which symbol? (a) > (b) <"
   - **Operation 2**: Symbol Selection (Level 2-3) - "Compare pencil and rope. pencil ___ rope (a) > (b) < (c) ="
   - **Operation 3**: Ordering with Symbols (Level 3-4) - "Order A, B, C from longest to shortest using >"
   - **Operation 4**: Chain/Transitive Comparisons (Level 3-4) - "If A > B and B > C, then A ___ C"
   - **Operation 5**: Error Identification (Level 4) - "Which statement is wrong? (a) A > B (b) B = C (c) A < C"

4. **Visual Display Approach** (for Level 2's `visual_cues: true`):
   - Use simple text annotations: "Pencil (short)" vs "Rope (long)"
   - Follow CLAUDE.md low-overhead philosophy
   - NO complex Canvas/SVG needed

5. **Parameter Usage Pattern**:
   ```javascript
   const measureType = randomChoice(params.measure_types);
   const context = MEASURE_CONTEXTS[measureType];
   const objects = selectUniqueItems(context.objects, params.comparison_count);
   const symbols = params.symbols; // Available symbols for this level
   ```

6. **Answer Validation Considerations**:
   - Text input for ordering: accept "A > B > C" or "C < B < A" (equivalent)
   - Normalize whitespace and case
   - For symbol selection: exact match (">", "<", "=")

7. **Deferred Decisions**:
   - NONE - all parameter decisions complete
   - Generator has full freedom within these constraints

### File Location
- Add to: `src/curriculum/parameters/M01_measurement.js`
- Insert after M01_Y1_MEAS definition

### Next Steps for Implementer
1. Review this parameter design
2. Proceed to Question Template Designer with these parameters
3. Implement 5 operations as outlined above
4. Use existing MEASURE_CONTEXTS data
5. Follow question type recommendations by level

---

## Summary

**Module ID**: M01_Y2_MEAS
**Decision**: Single module (no split)
**Levels**: 4 complete parameter sets designed
**Curriculum Alignment**: Level 3 matches curriculum precisely
**Age-Appropriateness**: All levels validated for Year 2 (ages 6-7)
**Vertical Progression**: Connects to Y1 and prepares for Y3
**Implementation Ready**: YES - handoff to Question Template Designer

**Key Innovation**: Progressive symbol introduction (recognition → selection → usage → complex application) that builds on Year 1's qualitative understanding.
