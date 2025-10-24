# M01_Y2_MEAS Question Template Design

## Module Context
- **Module ID**: M01_Y2_MEAS
- **Curriculum**: "compare and order lengths, mass, volume/capacity and record the results using >, < and ="
- **Year Group**: Year 2 (ages 6-7)
- **Key Skill**: Using mathematical symbols (>, <, =) to record comparisons

## Parameter Summary (from Phase 1)

**4 Levels**:
- **Level 1**: Symbol recognition, 2 measure types, scaffolded (statement provided)
- **Level 2**: Symbol selection, 3 measure types, visual cues
- **Level 3**: Ordering with symbols, 4 measure types, chain comparisons
- **Level 4**: Complex orderings, error identification, up to 4 objects

**Key Parameters**:
- `measure_types`: Expands from 2 → 4 across levels
- `operations`: Different operation types per level
- `symbols`: ['>', '<'] at L1, then ['>', '<', '='] at L2+
- `comparison_count`: 2 (L1-2), 2-3 (L3), 3-4 (L4)

## Question Operations Design

I will design **5 distinct question operations** that cover the curriculum requirements and provide variety across difficulty levels.

---

## OPERATION 1: Symbol Recognition (Levels 1-2)

**Purpose**: Introduce students to mathematical comparison symbols by matching symbols to verbal statements

**Difficulty Levels**: Primarily Level 1, optional for Level 2 warmup

**Question Type**: `multiple_choice`

**Template Structure**:
1. Present a comparison statement in words (e.g., "A rope is longer than a pencil")
2. Ask student to select the correct symbol
3. Provide 2 options at Level 1 (>, <), 3 options at Level 2 (>, <, =)

**Algorithm**:
```
1. Select measure_type from params.measure_types
2. Get context from MEASURE_CONTEXTS[measure_type]
3. Select 2 unique objects from context
4. Compare using size/duration metadata
5. Generate verbal statement based on comparison
6. Present symbols as options
7. Correct answer is the symbol matching the comparison
```

**Example Questions**:

**Level 1 Example 1**:
```
Text: "A rope is longer than a pencil. Which symbol shows this?"
Type: multiple_choice
Options: [">", "<"]
Answer: ">"
```

**Level 1 Example 2**:
```
Text: "The book is lighter than the brick. Which symbol is correct?"
Type: multiple_choice
Options: [">", "<"]
Answer: "<"
```

**Level 2 Example** (with equals):
```
Text: "Two ribbons are the same length. Which symbol shows this?"
Type: multiple_choice
Options: [">", "<", "="]
Answer: "="
```

**Implementation Notes**:
- Use `params.provide_statement = true` to determine if this operation is available
- Ensure verbal statement clearly indicates the comparison direction
- For Level 1: Only use > and < (exclude =)
- For Level 2: Include all three symbols

**Edge Cases**:
- Ensure objects have significantly different sizes (avoid ambiguous comparisons)
- For '=' comparisons, use clear language: "the same" not "similar"

---

## OPERATION 2: Symbol Selection for Comparison (Levels 2-3)

**Purpose**: Students determine both the comparison AND select the correct symbol

**Difficulty Levels**: Level 2 (with visual cues), Level 3 (without cues)

**Question Type**: `multiple_choice`

**Template Structure**:
1. Present two objects with their properties (Level 2: with hints; Level 3: names only)
2. Ask student to complete: "Object A ___ Object B"
3. Provide 3 options: >, <, =
4. Student must determine comparison and symbol

**Algorithm**:
```
1. Select measure_type from params.measure_types
2. Get context and select 2 objects
3. Compare sizes using metadata
4. Level 2: Add visual cue (e.g., "Pencil (short)" vs "Rope (long)")
5. Level 3: Use names only (e.g., "Pencil vs Rope")
6. Generate question: "Complete: Pencil ___ Rope"
7. Correct answer based on size comparison
```

**Example Questions**:

**Level 2 Example 1** (with visual cues):
```
Text: "Compare: Pencil (short) and Rope (long). Complete: Pencil ___ Rope"
Type: multiple_choice
Options: [">", "<", "="]
Answer: "<"
```

**Level 2 Example 2** (with equals):
```
Text: "Compare: Jug A (holds 1 litre) and Jug B (holds 1 litre). Complete: Jug A ___ Jug B"
Type: multiple_choice
Options: [">", "<", "="]
Answer: "="
```

**Level 3 Example** (no visual cues):
```
Text: "A brick is compared to a feather for mass. Complete: brick ___ feather"
Type: multiple_choice
Options: [">", "<", "="]
Answer: ">"
Hint: "Think about which is heavier."
```

**Implementation Notes**:
- Use `params.visual_cues` to determine if hints are provided
- Visual cues can be: "(short)", "(long)", "(heavy)", "(light)", "(holds more)", etc.
- Level 3 removes visual cues - student relies on real-world knowledge
- For capacity: use "holds more/less" language
- For time: use "takes longer/quicker" language

**Edge Cases**:
- Ensure selected objects have clear, unambiguous size differences
- For equals: only use when objects are genuinely equivalent (same size category)

---

## OPERATION 3: Ordering with Symbols (Levels 3-4)

**Purpose**: Order 3-4 objects and record the ordering using symbols

**Difficulty Levels**: Level 3 (3 objects), Level 4 (3-4 objects)

**Question Type**: `multiple_choice` (present ordering options) OR `text_input` (student writes ordering)

**Template Structure**:
1. Present 3-4 objects (labeled A, B, C, or by name)
2. Specify ordering direction (e.g., "longest to shortest")
3. Student writes/selects correct ordering using symbols
4. Accept equivalent orderings (e.g., "A > B > C" same as "C < B < A")

**Algorithm**:
```
1. Select measure_type from params.measure_types
2. Get context and select N objects (N from params.comparison_count)
3. Sort objects by size/duration
4. Determine ordering direction (random: largest→smallest or smallest→largest)
5. Generate correct ordering notation (e.g., "A > B > C")
6. Level 3: Present as multiple choice with 3 options
7. Level 4: Use text_input OR multiple choice with more options
```

**Example Questions**:

**Level 3 Example 1** (multiple choice):
```
Text: "Order these from longest to shortest using the > symbol: Rope (A), Pencil (B), Ribbon (C)"
Type: multiple_choice
Options: [
  "A > C > B",  // Correct: Rope > Ribbon > Pencil
  "B > C > A",  // Wrong
  "C > A > B"   // Wrong
]
Answer: "A > C > B"
```

**Level 3 Example 2** (text input):
```
Text: "Order these containers from holds least to holds most using <: Cup, Jug, Bucket"
Type: text_input
Answer: "Cup < Jug < Bucket"
Hint: "Use the < symbol between each item."
```

**Level 4 Example** (4 objects):
```
Text: "Put these in order from heaviest to lightest using >: Brick, Book, Feather, Ball"
Type: text_input
Answer: "Brick > Book > Ball > Feather"
```

**Implementation Notes**:
- For multiple_choice: generate 2-3 plausible wrong options (shuffle the ordering)
- For text_input: validate by parsing and checking order matches expected
- Accept both "A > B > C" and "C < B < A" as correct (if symbol orientation is reversed)
- Normalize whitespace and case in validation
- Label objects with letters (A, B, C) or use names directly

**Edge Cases**:
- Ensure objects have distinct sizes (no ties in ordering)
- For 4 objects (Level 4): ensure clear size progression
- Text input validation: accept comma-separated or space-separated

---

## OPERATION 4: Chain/Transitive Comparisons (Levels 3-4)

**Purpose**: Apply transitive reasoning with comparison symbols

**Difficulty Levels**: Level 3 (scaffolded), Level 4 (complex)

**Question Type**: `multiple_choice`

**Template Structure**:
1. Present two comparison statements (e.g., "A > B" and "B > C")
2. Ask student to deduce third comparison (e.g., "A ___ C")
3. Provide 3 symbol options
4. Correct answer follows transitive property

**Algorithm**:
```
1. Select measure_type from params.measure_types
2. Get 3 objects with distinct sizes: small, medium, large
3. Generate 2 given statements (e.g., "Large > Medium", "Medium > Small")
4. Ask for deduction: "Large ___ Small"
5. Correct answer: ">" (transitive property)
6. Level 4 variation: Include '=' in chain (e.g., "A = B, B > C, so A ___ C")
```

**Example Questions**:

**Level 3 Example 1**:
```
Text: "A rope is longer than a ribbon. The ribbon is longer than a pencil. Complete: rope ___ pencil"
Type: multiple_choice
Options: [">", "<", "="]
Answer: ">"
```

**Level 3 Example 2** (with equals):
```
Text: "Box A has the same mass as Box B. Box B is heavier than Box C. Complete: Box A ___ Box C"
Type: multiple_choice
Options: [">", "<", "="]
Answer: ">"
```

**Level 4 Example** (more abstract):
```
Text: "If Jug P holds more than Jug Q, and Jug Q holds the same as Jug R, what about Jug P and Jug R? P ___ R"
Type: multiple_choice
Options: [">", "<", "="]
Answer: ">"
Hint: "Use what you know about P > Q and Q = R"
```

**Implementation Notes**:
- Always ensure logical consistency (transitivity must hold)
- Use familiar object names at Level 3
- Level 4 can use abstract labels (P, Q, R) to prepare for algebra
- Include '=' in chains at Level 4 to increase complexity
- Provide hints at Level 3; reduce hints at Level 4

**Edge Cases**:
- Never create contradictory chains (e.g., "A > B, B > C, C > A" is impossible)
- Ensure intermediate step is always stated clearly
- For equals in chain: "A = B, B = C" implies "A = C" (not >, <)

---

## OPERATION 5: Error Identification (Level 4 only)

**Purpose**: Develop metacognitive skills by identifying incorrect symbol usage

**Difficulty Levels**: Level 4 only

**Question Type**: `multiple_choice`

**Template Structure**:
1. Present 3 comparison statements, one of which is incorrect
2. Ask "Which statement is wrong?"
3. Provide statements as options (a), (b), (c)
4. Correct answer is the incorrect statement

**Algorithm**:
```
1. Select measure_type and get 2-3 objects
2. Generate 2 correct comparison statements
3. Generate 1 incorrect statement (reverse a symbol)
4. Shuffle the 3 statements
5. Ask "Which statement is wrong?"
6. Correct answer is the statement with wrong symbol
```

**Example Questions**:

**Level 4 Example 1**:
```
Text: "Which statement is wrong?"
Type: multiple_choice
Options: [
  "A rope is longer than a pencil, so rope > pencil",  // Correct statement
  "A brick is heavier than a feather, so brick > feather",  // Correct statement
  "A cup holds more than a bucket, so cup > bucket"  // WRONG - bucket > cup
]
Answer: "A cup holds more than a bucket, so cup > bucket"
```

**Level 4 Example 2** (with numbers - bridge to Y3):
```
Text: "Which symbol use is incorrect?"
Type: multiple_choice
Options: [
  "5 > 3",  // Correct
  "3 = 3",  // Correct
  "5 < 3"   // WRONG
]
Answer: "5 < 3"
```

**Level 4 Example 3** (transitive error):
```
Text: "Find the mistake:"
Type: multiple_choice
Options: [
  "A > B (Rope is longer than Ribbon)",  // Correct
  "B > C (Ribbon is longer than Pencil)",  // Correct
  "A < C (Rope is shorter than Pencil)"  // WRONG - should be A > C
]
Answer: "A < C (Rope is shorter than Pencil)"
```

**Implementation Notes**:
- Errors should be obvious once student checks logic
- Include verbal context to make error clear
- Can mix qualitative (object names) and quantitative (numbers) at Level 4
- Always ensure 2 statements are correct, 1 is wrong
- Error can be: wrong symbol, wrong direction, or transitive error

**Edge Cases**:
- Ensure the error is genuinely wrong (not just unusual)
- Provide enough context to determine correctness
- Avoid trick questions - errors should be mathematical, not linguistic

---

## Question Operation Summary Table

| Operation | Levels | Question Type | Purpose | Curriculum Coverage |
|-----------|--------|---------------|---------|---------------------|
| **1. Symbol Recognition** | 1-2 | `multiple_choice` | Match symbols to verbal comparisons | Introduce >, <, = |
| **2. Symbol Selection** | 2-3 | `multiple_choice` | Select symbol for given comparison | Apply symbols to measure comparisons |
| **3. Ordering with Symbols** | 3-4 | `multiple_choice` or `text_input` | Order 3-4 objects using symbols | "order...and record using >, <, =" |
| **4. Chain/Transitive Comparisons** | 3-4 | `multiple_choice` | Deduce comparison from given facts | Apply transitive reasoning |
| **5. Error Identification** | 4 | `multiple_choice` | Find incorrect symbol usage | Metacognitive skill, prepare for Y3 |

**Curriculum Statement Coverage**:
- "compare": Operations 1, 2, 4
- "order": Operation 3
- "record the results using >, < and =": All operations
- "lengths, mass, volume/capacity": All operations (via `measure_types` parameter)

---

## Implementation Approach

### Data Source
**Import existing object metadata** from Year 1 module:
```javascript
import { MEASURE_CONTEXTS } from './M01_Y1_MEAS_comparison.js';
```

This provides:
- `length`, `height`, `mass`, `capacity`, `time` object arrays
- Each object has `name`, `size/duration`, `comparative`, `superlative`
- Ensures consistency between Year 1 and Year 2 modules

### Helper Functions (reuse from Y1)
```javascript
function randomChoice(array) { ... }
function shuffle(array) { ... }
function selectUniqueItems(array, count) { ... }
```

### Operation Selection Logic
```javascript
export function generateQuestion(params, level) {
    const operations = params.operations || ['symbol_recognition'];
    const selectedOperation = randomChoice(operations);

    switch (selectedOperation) {
        case 'symbol_recognition':
            return generateSymbolRecognition(params, level);
        case 'symbol_matching':
            return generateSymbolRecognition(params, level); // Same as recognition
        case 'symbol_selection':
            return generateSymbolSelection(params, level);
        case 'complete_comparison':
            return generateSymbolSelection(params, level); // Variant of selection
        case 'ordering_with_symbols':
            return generateOrdering(params, level);
        case 'chain_comparisons':
            return generateChainComparison(params, level);
        case 'mixed_comparisons':
            return generateChainComparison(params, level); // Complex chains
        case 'error_identification':
            return generateErrorIdentification(params, level);
        default:
            return generateSymbolRecognition(params, level);
    }
}
```

### Answer Validation Considerations

**For Symbol Selection (Operations 1-2)**:
- Exact string match: ">", "<", "="
- Trim whitespace

**For Ordering (Operation 3)**:
- Text input: "A > B > C" or "C < B < A" (both valid if logically equivalent)
- Parse symbols and objects
- Check ordering matches expected (accounting for symbol reversal)
- Normalize: remove extra spaces, case-insensitive object names

**For Error Identification (Operation 5)**:
- Exact match of the full incorrect statement
- Or: match the option letter (a, b, c)

---

## Visual Display Approach (Level 2 Visual Cues)

Following CLAUDE.md's low-overhead philosophy:

**Simple Text Annotations**:
```javascript
// For Level 2 visual_cues: true
function formatWithVisualCue(objectName, size, comparative) {
    // Determine cue based on size relative to context average
    const cue = size > 5 ? comparative : oppositeComparative;
    return `${objectName} (${cue})`;
}

// Example outputs:
// "Rope (long)" vs "Pencil (short)"
// "Brick (heavy)" vs "Feather (light)"
// "Bucket (holds more)" vs "Cup (holds less)"
```

**No complex Canvas/SVG needed** - simple parenthetical hints suffice.

---

## Expected Question Distribution by Level

**Level 1** (Beginning):
- 100% Operation 1 (Symbol Recognition)
- Focus: Introducing > and <

**Level 2** (Developing):
- 60% Operation 1 (Symbol Recognition with =)
- 40% Operation 2 (Symbol Selection with visual cues)
- Focus: Symbol selection with scaffolding

**Level 3** (Meeting):
- 30% Operation 2 (Symbol Selection, no cues)
- 40% Operation 3 (Ordering)
- 30% Operation 4 (Chain comparisons)
- Focus: Ordering and transitive reasoning

**Level 4** (Exceeding):
- 20% Operation 3 (Complex ordering, 4 objects)
- 40% Operation 4 (Complex chains)
- 40% Operation 5 (Error identification)
- Focus: Metacognition and preparation for Y3

---

## Handoff to Validator

**Complete Template Design**: 5 operations covering all curriculum requirements

**Next Steps**:
1. Validate curriculum alignment (all 5 operations cover "compare, order, record")
2. Validate age-appropriateness (Year 2, ages 6-7)
3. Validate question variety and engagement
4. Check for mathematical correctness
5. Ensure clear progression across levels

**Implementation Ready**: YES - can proceed to code generation

**Key Files to Create**:
- `src/generators/M01_Y2_MEAS_comparison.js` (main generator)
- Update `src/curriculum/parameters/M01_measurement.js` (add M01_Y2_MEAS parameters)
- Register in `src/core/questionEngine.js`

---

## End of Template Design
