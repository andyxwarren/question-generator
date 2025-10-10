# Curriculum Module Parameter Framework
## Difficulty Levels with Progressive Parameters

This framework defines parameters for each module across 4 difficulty levels:
- **Level 1: Beginning** - Simplified numbers, limited ranges, concrete examples
- **Level 2: Developing** - Moderate complexity, broader ranges, fewer scaffolds
- **Level 3: Meeting** - Full curriculum expectations
- **Level 4: Exceeding** - Extended ranges, complex scenarios, multi-step problems

---

## Parameter Types by Content Domain

### 1. NUMBER AND PLACE VALUE

#### A. Counting (in multiples)
**Example Module**: "Count to and across 100, forwards and backwards, beginning with 0 or 1"

| Parameter | Level 1 (Beginning) | Level 2 (Developing) | Level 3 (Meeting) | Level 4 (Exceeding) |
|-----------|---------------------|----------------------|-------------------|---------------------|
| min_value | 0 | 0 | 0 | 0 |
| max_value | 30 | 50 | 100 | 200 |
| step_sizes | [1, 2, 5, 10] | [1, 2, 5, 10] | [1, 2, 5, 10] | [1, 2, 3, 5, 10] |
| starting_points | [0, 1] | [0, 1, 5, 10] | Any number | Any number |
| directions | [forwards] | [forwards, backwards] | [forwards, backwards] | [forwards, backwards] |
| sequence_length | 5-10 | 10-15 | 15-20 | 20-30 |

#### B. Place Value & Number Recognition
**Example Module**: "Read, write, order and compare numbers to at least 1,000,000"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| min_value | 100,000 | 500,000 | 0 | 0 |
| max_value | 500,000 | 900,000 | 1,000,000 | 10,000,000 |
| number_count | 2-3 | 3-4 | 4-5 | 5-7 |
| include_negatives | false | false | false | true |
| include_decimals | false | false | false | true |
| operations | [compare, order] | [compare, order, round] | [compare, order, round, partition] | [all operations] |

---

### 2. CALCULATIONS

#### A. Addition & Subtraction
**Example Module**: "Add and subtract numbers mentally, including three-digit numbers and ones/tens/hundreds"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| number_1_range | [100-300] | [100-500] | [100-999] | [100-9999] |
| number_2_range | [1-9] | [1-99] | [1-999] | [1-999] |
| operation_types | [+ only] | [+, -] | [+, -, mixed] | [+, -, mixed, multi-step] |
| carrying_required | never | sometimes | often | always |
| borrowing_required | never | sometimes | often | always |
| problem_steps | 1 | 1 | 1-2 | 2-3 |
| context_type | [abstract] | [simple word problems] | [varied contexts] | [complex real-world] |

#### B. Multiplication & Division
**Example Module**: "Recall multiplication and division facts for 3, 4 and 8 times tables"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| times_tables | [2, 5, 10] | [2, 3, 4, 5, 10] | [3, 4, 8] | [3, 4, 6, 7, 8, 9] |
| min_multiplier | 1 | 1 | 1 | 1 |
| max_multiplier | 5 | 10 | 12 | 15 |
| include_division | false | true | true | true |
| include_inverse | false | false | true | true |
| problem_format | [equation] | [equation, missing number] | [equation, word problem] | [mixed, multi-step] |
| time_limit_seconds | 10 | 6 | 3 | 2 |

---

### 3. FRACTIONS, DECIMALS & PERCENTAGES

#### A. Fraction Recognition & Equivalence
**Example Module**: "Recognise and write equivalent fractions"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| denominators | [2, 4, 10] | [2, 3, 4, 5, 10] | [2-12] | [2-20] |
| numerator_range | [1 to denom-1] | [1 to denom-1] | [1 to 2×denom] | [any valid] |
| fraction_types | [proper] | [proper, unit] | [proper, improper] | [proper, improper, mixed] |
| visual_support | always | often | sometimes | rarely |
| equivalences_shown | 2 | 2-3 | 3-4 | 4-6 |
| simplification_required | false | false | true | true |

#### B. Decimal Operations
**Example Module**: "Multiply and divide decimals by 10, 100, 1000"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| decimal_places | 1 | 1-2 | 1-3 | 1-4 |
| multipliers | [10] | [10, 100] | [10, 100, 1000] | [10, 100, 1000, 0.1, 0.01] |
| initial_value_range | [0.1-9.9] | [0.1-99.9] | [0.001-999.999] | [any reasonable] |
| operations | [multiply] | [multiply, divide] | [multiply, divide] | [multiply, divide, mixed] |
| context | [abstract] | [abstract, simple context] | [varied contexts] | [complex problems] |

---

### 4. MEASUREMENT

#### A. Length, Mass, Capacity
**Example Module**: "Measure, compare and convert metric units"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| units | [cm, m] | [mm, cm, m] | [mm, cm, m, km] | [all metric units] |
| measurement_range | [1-100] | [1-1000] | [0.1-10000] | [any reasonable] |
| conversion_complexity | [single step] | [1-2 steps] | [2-3 steps] | [multi-step] |
| include_mixed_units | false | false | true | true |
| decimal_precision | 0 | 1 | 1-2 | 1-3 |
| word_problem_complexity | [simple] | [moderate] | [standard] | [complex] |

#### B. Time
**Example Module**: "Read and compare time to nearest minute"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| time_precision | [hour, half-hour] | [quarter-hour] | [5-minute] | [1-minute] |
| clock_format | [analog] | [analog, digital] | [both, 24hr] | [all formats] |
| duration_type | [simple] | [within hour] | [across hours] | [across days] |
| calculations | [read only] | [simple duration] | [duration, elapsed time] | [complex time problems] |
| real_world_context | false | true | true | true |

---

### 5. GEOMETRY

#### A. Properties of Shapes
**Example Module**: "Identify and describe properties of 2D and 3D shapes"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| shape_types_2d | [circle, triangle, square, rectangle] | [+ pentagon, hexagon] | [+ regular/irregular polygons] | [all polygons] |
| shape_types_3d | [cube, sphere] | [+ cylinder, cone] | [+ prism, pyramid] | [all 3D shapes] |
| properties_to_identify | [sides, corners] | [+ faces, edges, vertices] | [+ parallel, perpendicular] | [+ symmetry, angles] |
| visual_orientation | [standard] | [standard, rotated] | [various] | [any orientation] |
| complexity | [single shapes] | [compare 2 shapes] | [classify shapes] | [complex relationships] |

#### B. Position & Direction
**Example Module**: "Describe positions using coordinates in first quadrant"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| grid_size | [5×5] | [10×10] | [10×10] | [20×20] |
| quadrants | [first only] | [first only] | [first only] | [all four] |
| coordinate_range | [0-5] | [0-10] | [0-10] | [-20 to 20] |
| tasks | [plot points] | [plot, read] | [plot, read, translate] | [all transformations] |
| include_midpoints | false | false | true | true |

---

### 6. STATISTICS

#### A. Data Handling
**Example Module**: "Interpret and construct pie charts and line graphs"

| Parameter | Level 1 | Level 2 | Level 3 | Level 4 |
|-----------|---------|---------|---------|---------|
| graph_types | [pictogram, bar chart] | [bar chart, table] | [line graph, pie chart] | [all types] |
| data_points | [3-5] | [5-8] | [8-12] | [12-20] |
| scale_type | [1:1] | [1:2, 1:5] | [1:10, 1:20] | [any scale] |
| decimal_data | false | false | true | true |
| construction_required | false | true | true | true |
| interpretation_depth | [read directly] | [simple calculation] | [comparison, trends] | [complex analysis] |

---

## Usage Guidelines

### 1. Applying Difficulty Levels
- **Level 1 (Beginning)**: Use when introducing new concepts or for struggling students
- **Level 2 (Developing)**: Use when students grasp basics but need more practice
- **Level 3 (Meeting)**: Use for standard curriculum expectations
- **Level 4 (Exceeding)**: Use for extension work and challenging able students

### 2. Parameter Combinations
- Adjust multiple parameters together for smooth progression
- Avoid jumping multiple parameters simultaneously unless deliberate
- Consider cognitive load: fewer new concepts at lower levels

### 3. Context Complexity
Add an additional parameter across all domains:
- **context_complexity**: [abstract | simple word problem | real-world | multi-step real-world | open-ended investigation]

### 4. Support Level
Add scaffolding parameters:
- **visual_aids**: [always | often | sometimes | rarely]
- **worked_examples**: [2-3 | 1-2 | 1 | 0]
- **hints_available**: [detailed | moderate | minimal | none]

---

## Implementation Notes

1. **Overlap is intentional**: Level 4 of one year might overlap with Level 1-2 of the next
2. **Flexibility**: Parameters should be guidelines, not rigid rules
3. **Assessment**: Use levels for both practice and assessment differentiation
4. **Progression tracking**: Students may be at different levels across different strands
5. **Combination parameters**: Some modules need multiple parameter sets (e.g., word problems involving fractions AND measurement)

---

## Next Steps for Implementation

1. Review each of the 336 modules in the curriculum
2. Identify the parameter type(s) relevant to each module
3. Define specific values for all 4 levels for each module
4. Create a database/JSON structure with all parameters
5. Build question generation system that uses these parameters
6. Validate with teachers and adjust based on student performance data