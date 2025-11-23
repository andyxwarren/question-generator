# Parameter Schema Reference

**Version:** 2.0
**Last Updated:** 2025-11-23

This document provides a comprehensive reference for all parameter types used in the UK National Curriculum mathematics question generator application.

---

## Table of Contents

1. [Overview](#overview)
2. [Parameter Organization](#parameter-organization)
3. [Number & Counting Parameters](#number--counting-parameters)
4. [Arithmetic Parameters](#arithmetic-parameters)
5. [Fraction Parameters](#fraction-parameters)
6. [Decimal & Percentage Parameters](#decimal--percentage-parameters)
7. [Geometry Parameters](#geometry-parameters)
8. [Coordinate & Transformation Parameters](#coordinate--transformation-parameters)
9. [Statistics & Data Parameters](#statistics--data-parameters)
10. [Measurement Parameters](#measurement-parameters)
11. [Ratio, Proportion & Algebra Parameters](#ratio-proportion--algebra-parameters)
12. [Parameter Selection Guidelines](#parameter-selection-guidelines)

---

## Overview

Parameters define the mathematical constraints and difficulty progression for each curriculum module. All parameters are organized **by level** (1-4) representing:

- **Level 1**: Beginning (struggling students)
- **Level 2**: Developing (progressing students)
- **Level 3**: Meeting (meeting curriculum standard)
- **Level 4**: Exceeding (advanced students)

### Key Principles

1. **No Hardcoded Values**: All constraints come from `parameters.js`, never hardcoded in generators
2. **Level-Based Organization**: Parameters are grouped by difficulty level, not by parameter type
3. **Year Group Appropriateness**: Number ranges and complexity match cognitive development
4. **Curriculum Alignment**: Every parameter directly supports UK National Curriculum objectives

---

## Parameter Organization

Parameters are stored in `src/curriculum/parameters.js` with this structure:

```javascript
'MODULE_ID': {
    id: 'MODULE_ID',
    name: 'Display name',
    description: 'Brief description',
    icon: '🔢',
    yearGroup: 'Year N',
    strand: 'Strand name',
    parameters: {
        1: { /* Level 1 params */ },
        2: { /* Level 2 params */ },
        3: { /* Level 3 params */ },
        4: { /* Level 4 params */ }
    }
}
```

---

## Number & Counting Parameters

Used for: Counting sequences, number generation, place value modules

### Core Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `min_value` | Number | Minimum value for generated numbers | `0`, `1`, `-100` |
| `max_value` | Number | Maximum value for generated numbers | `100`, `1000`, `10000000` |
| `step_sizes` | Array | Counting increments (Years 1-4 only) | `[1, 2, 5, 10]` |
| `powers_of_10` | Array | Powers for counting (Years 5-6 only) | `[10, 100, 1000]` |
| `directions` | Array | Counting directions | `['forwards']`, `['backwards']`, `['forwards', 'backwards']` |
| `start_from` | String | Where sequences start | `'zero_only'`, `'any'`, `'zero_or_multiple'`, `'non_zero'` |
| `sequence_length` | Number | Numbers in a sequence | `3`, `5`, `7` |
| `gaps_count` | Number | Blanks in fill-in questions | `1`, `2`, `3` |
| `gap_position` | String | Where gaps appear | `'end'`, `'middle'`, `'random'`, `'start'`, `'start_and_end'` |
| `allow_negatives` | Boolean | Include negative numbers | `true`, `false` |
| `start_range` | Array | Starting value range (Y5+ with negatives) | `[-50, 50]`, `[-1000, 1000]` |

### Roman Numerals (N03 Years 3-5)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `roman_range` | Array | Min and max Roman numeral values | `[1, 12]`, `[1, 1000]` |
| `roman_representation` | Array | Display contexts | `['standard', 'clock_face', 'year', 'date']` |
| `conversion_type` | Array | Conversion directions | `['roman_to_arabic', 'arabic_to_roman']` |
| `numeral_complexity` | Array | Numeral types | `['simple', 'subtractive']` |
| `include_context` | Boolean | Include real-world contexts | `true`, `false` |
| `common_values_only` | Boolean | Restrict to common values | `true`, `false` |

### Example: Year 3 Counting

```javascript
parameters: {
    1: {
        step_sizes: [4, 8],
        min_value: 0,
        max_value: 100,
        directions: ['forwards'],
        start_from: 'zero_only',
        sequence_length: 5,
        gaps_count: 1,
        gap_position: 'end'
    },
    4: {
        step_sizes: [4, 8, 50, 100],
        min_value: 0,
        max_value: 1000,
        directions: ['forwards', 'backwards'],
        start_from: 'any',
        sequence_length: 7,
        gaps_count: 2,
        gap_position: 'random'
    }
}
```

### Example: Year 5 Counting (with negatives)

```javascript
parameters: {
    1: {
        powers_of_10: [10, 100],  // NOT step_sizes
        min_value: -100,
        max_value: 100,
        start_range: [-50, 50],
        allow_negatives: true,
        directions: ['forwards'],
        sequence_length: 5
    }
}
```

---

## Arithmetic Parameters

Used for: Addition, subtraction, multiplication, division

### Core Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `tables` | Array | Multiplication tables | `[2, 5, 10]`, `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]` |
| `digit_counts` | Object | Digit counts for multi-digit operations | `{ multiplicand: [1, 2], multiplier: [1] }` |
| `operations` | Array | Operation types | `['addition', 'subtraction', 'multiplication', 'division']` |
| `carry_required` | Boolean | Force carrying in addition | `true`, `false` |
| `borrow_required` | Boolean | Force borrowing in subtraction | `true`, `false` |
| `min_multiplicand` | Number | Minimum multiplicand value | `10`, `100` |
| `max_multiplicand` | Number | Maximum multiplicand value | `50`, `9999` |
| `multiplier_range` | Array | Multiplier range | `[2, 5]`, `[1, 12]` |

### Order of Operations (C09 Year 6)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `operator_complexity` | Array | Operator mixing | `['single_priority', 'mixed_priority']` |
| `bracket_usage` | Array | Bracket types | `['none', 'single_pair', 'nested']` |
| `structure_template` | Array | Expression structures | `['a + b + c', 'a × b + c', '(a + b) × c']` |
| `operation_types` | Array | Allowed operations | `['addition', 'subtraction', 'multiplication', 'division']` |
| `number_range` | Array | Number value range | `[1, 10]`, `[1, 20]` |
| `result_range` | Array | Result value range | `[1, 50]`, `[1, 200]` |
| `include_parentheses` | Boolean | Include brackets | `true`, `false` |
| `require_working` | Boolean | Require multi-step working | `true`, `false` |
| `multi_step_count` | Number/Array | Number of steps | `2`, `[3, 4]` |

### Example: Year 4 Columnar Multiplication

```javascript
parameters: {
    1: {
        digit_counts: { multiplicand: [2], multiplier: [1] },
        min_multiplicand: 10,
        max_multiplicand: 50,
        multiplier_range: [2, 5],
        carry_required: false
    },
    4: {
        digit_counts: { multiplicand: [3], multiplier: [1] },
        min_multiplicand: 100,
        max_multiplicand: 999,
        multiplier_range: [2, 12],
        carry_required: true
    }
}
```

---

## Fraction Parameters

Used for: Fraction recognition, comparison, operations

### Core Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `denominators` | Array | Allowed denominators | `[2, 4]`, `[2, 3, 4, 5, 6, 10, 12]` |
| `fraction_representation_types` | Array | Display modes | `['shape', 'number_line', 'set', 'quantity']` |
| `shape_types_for_fractions` | Array | Shape types | `['circle', 'rectangle', 'bar_model']` |
| `comparison_operators` | Array | Comparison types | `['less_than', 'greater_than', 'equal', 'order']` |
| `fraction_types` | Array | Fraction categories | `['unit', 'non_unit', 'proper', 'improper', 'mixed']` |
| `visual_scaffolding` | Boolean | Include visual aids | `true`, `false` |
| `whole_max` | Number | Maximum whole for "fraction of" | `12`, `24` |

### Equivalent Fractions (F02)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `operations` | Array | Operation types | `['recognize', 'generate', 'simplify', 'mixed_improper']` |
| `denominator_families` | Array | Related denominators | `[[2,4,8], [3,6,12], [5,10,20]]` |
| `improper_range` | Array | Range for improper fractions | `[1, 10]`, `[1, 20]` |
| `include_diagrams` | Boolean | Include visual diagrams | `true`, `false` |
| `simplification_method` | Array | Simplification approaches | `['visual', 'factors']` |
| `include_multiplicative_reasoning` | Boolean | Require multiplicative thinking | `true`, `false` |

### Add/Subtract Fractions (F04 Year 6)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `denominator_types` | Array | Denominator relationships | `['same', 'one_multiple_of_other', 'both_multiples_of_same']` |
| `result_constraint` | Array | Result constraints | `['within_one', 'can_exceed_one', 'improper_to_mixed']` |
| `max_denominator` | Number | Maximum denominator | `8`, `12` |
| `include_mixed_numbers` | Boolean | Include mixed numbers | `true`, `false` |
| `number_of_terms` | Array | Terms in expression | `[2]`, `[2, 3]` |
| `require_simplification` | Boolean | Require final simplification | `true`, `false` |
| `show_working` | Boolean | Show working steps | `true`, `false` |

### Example: Year 2 Fraction Recognition

```javascript
parameters: {
    1: {
        denominators: [2, 4],
        fraction_types: ['unit'],  // Only 1/2, 1/4
        representation_modes: ['shape'],
        shape_types_for_fractions: ['circle', 'rectangle'],
        visual_scaffolding: true,
        whole_max: 12
    },
    3: {
        denominators: [2, 3, 4],
        fraction_types: ['unit', 'non_unit'],  // 1/2, 1/3, 2/3, 3/4
        representation_modes: ['shape', 'quantity'],
        shape_types_for_fractions: ['circle', 'rectangle', 'bar_model'],
        visual_scaffolding: true,
        whole_max: 24
    }
}
```

---

## Decimal & Percentage Parameters

Used for: Decimal operations, percentage calculations

### Core Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `decimal_places` | Number | Number of decimal places | `1`, `2`, `3` |
| `decimal_operations` | Array | Operation types | `['compare', 'order', 'round', 'convert_to_fraction']` |
| `decimal_range` | Object | Min/max decimal values | `{ min: 0.1, max: 0.9 }`, `{ min: 0.001, max: 0.999 }` |
| `percentage_range` | Object | Percentage constraints | `{ min: 1, max: 100, common: [10, 25, 50, 75] }` |
| `percentage_operations` | Array | Percentage operations | `['recognition', 'to_fraction', 'of_amount']` |

### Example: Year 5 Comparing Decimals

```javascript
parameters: {
    1: {
        decimal_places: 1,
        decimal_operations: ['compare', 'order'],
        decimal_range: { min: 0.1, max: 0.9 }
    },
    3: {
        decimal_places: 3,
        decimal_operations: ['compare', 'order'],
        decimal_range: { min: 0.001, max: 0.999 }
    }
}
```

---

## Geometry Parameters

Used for: Shape recognition, properties, angles

### 2D/3D Shapes

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `shape_types_2d` | Array | 2D shape types | `['circle', 'triangle', 'square', 'rectangle', 'pentagon', 'hexagon']` |
| `shape_types_3d` | Array | 3D shape types | `['cube', 'cuboid', 'sphere', 'cylinder', 'pyramid']` |
| `property_types` | Array | Shape properties | `['sides', 'vertices', 'edges', 'faces', 'angles']` |
| `property_ranges` | Object | Property value ranges | `{ sides: { min: 3, max: 4 } }` |
| `include_diagrams` | Boolean | Include shape diagrams | `true`, `false` |

### Angles (G04 Years 4-6)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `angle_types` | Array | Angle categories | `['right', 'acute', 'obtuse', 'reflex']` |
| `angle_range` | Object | Angle value range | `{ min: 1, max: 360 }` |
| `angle_operations` | Array | Operation types | `['identify_type', 'measure', 'calculate_missing']` |
| `angle_contexts` | Array | Geometric contexts | `['straight_line', 'point', 'triangle', 'quadrilateral', 'polygon']` |
| `given_angles` | Number/Array | Number of given angles | `1`, `[1, 2]`, `[1, 2, 3]` |
| `angle_sum` | Number/Array | Required angle sum | `180`, `360`, `[180, 360]` |
| `include_diagram` | Boolean | Include diagram | `true`, `false` |
| `polygon_types` | Array | Polygon types | `['triangle', 'quadrilateral', 'pentagon', 'hexagon']` |
| `require_reasoning` | Boolean | Require explanation | `true`, `false` |
| `multi_step` | Boolean | Multi-step calculation | `true`, `false` |

### Symmetry Construction (G02 Year 4)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `completion_task_type` | Array | Task types | `['complete_shape', 'reflect_pattern', 'draw_other_half']` |
| `symmetry_line_orientation` | Array | Line orientations | `['vertical', 'horizontal', 'diagonal']` |
| `shape_complexity` | Array | Shape difficulty | `['simple_polygon', 'stepped_pattern', 'curved', 'complex']` |
| `grid_reference` | Boolean | Include grid | `true`, `false` |
| `grid_size` | Object | Grid dimensions | `{ rows: 10, cols: 10 }` |
| `partial_shape_given` | Array | Amount shown | `['half', 'quarter']` |
| `include_vertices_marked` | Boolean | Mark vertices | `true`, `false` |
| `freehand_vs_grid` | Array | Drawing context | `['grid', 'dotted', 'freehand']` |

---

## Coordinate & Transformation Parameters

Used for: Grid coordinates, translations, reflections, rotations

### Core Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `coordinate_range` | Object | X and Y ranges | `{ x: { min: 0, max: 10 }, y: { min: 0, max: 10 } }` |
| `quadrants` | Array | Quadrants to use | `['first']`, `['all']` |
| `coordinate_operations` | Array | Operation types | `['read_point', 'plot_point']` |
| `transformation_types` | Array | Transformation types | `['translation', 'reflection', 'rotation']` |
| `direction_types` | Array | Movement directions | `['left', 'right', 'up', 'down']` |
| `turn_types` | Array | Rotation types | `['quarter', 'half', 'three_quarter']` |

### Example: Year 4 Coordinates

```javascript
parameters: {
    1: {
        coordinate_range: { x: { min: 0, max: 5 }, y: { min: 0, max: 5 } },
        quadrants: ['first'],
        coordinate_operations: ['read_point', 'plot_point']
    }
}
```

---

## Statistics & Data Parameters

Used for: Graphs, charts, data interpretation

### Core Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `graph_types` | Array | Graph/chart types | `['pictogram', 'bar_chart', 'pie_chart', 'line_graph']` |
| `scale_types` | Array | Axis/scale values | `[1, 2, 5, 10, 20, 50]` |
| `category_count` | Object | Number of categories | `{ min: 2, max: 8 }` |
| `data_range` | Object | Data value range | `{ min: 0, max: 100 }` |
| `data_question_types` | Array | Question types | `['count', 'how_many_more', 'total', 'compare', 'difference']` |
| `include_visual` | Boolean | Include chart visual | `true`, `false` |
| `require_calculation` | Boolean | Require calculations | `true`, `false` |

### Mean Average (S03 Year 6)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `data_set_size` | Array | Number of values | `[3, 4]`, `[5, 6, 7, 8]` |
| `value_range` | Object | Value range | `{ min: 1, max: 10 }`, `{ min: 1, max: 100 }` |
| `calculation_type` | Array | Calculation types | `['calculate_mean', 'find_missing_value', 'compare_means']` |
| `data_presentation` | Array | Presentation modes | `['list', 'table', 'graph']` |
| `result_type` | Array | Result formats | `['whole_number', 'decimal_1dp', 'decimal_2dp']` |
| `include_context` | Boolean | Include real-world context | `true`, `false` |
| `contexts` | Array | Context types | `['test_scores', 'temperatures', 'distances', 'money', 'abstract']` |
| `show_working` | Boolean | Show calculation steps | `true`, `false` |
| `multi_step` | Boolean | Multi-step problem | `true`, `false` |
| `reasoning_required` | Boolean | Require explanation | `true`, `false` |

---

## Measurement Parameters

Used for: Length, mass, capacity, time, unit conversions

### Core Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `units` | Array | Measurement units | `['m', 'cm', 'mm']`, `['kg', 'g']`, `['l', 'ml']` |
| `conversion_types` | Array | Conversion categories | `['metric_only', 'imperial_to_metric']` |
| `time_types` | Array | Clock types | `['analog', 'digital_12hr', 'digital_24hr']` |
| `time_precision` | Array | Time precision levels | `['hour', 'half_hour', '5_minutes', 'minute']` |
| `coin_types` | Array | Coin/note types | `['1p', '2p', '5p', '10p', '20p', '50p', '£1', '£2']` |
| `money_operations` | Array | Money operations | `['recognise_coin', 'combine_amounts', 'give_change']` |
| `amount_range` | Object | Money amount range | `{ min: 1, max: 20 }`, `{ min: 1, max: 1000 }` |

### Perimeter & Area (M07 Years 4-6)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `grid_scaffolding` | Array | Grid support level | `['full_grid', 'dimensions_only', 'edge_ticks', 'none']` |
| `rectilinear_complexity` | Array | Shape complexity | `['simple_rectangle', 'L_shape', 'T_shape', 'composite_complex']` |
| `area_formula_required` | Boolean | Require formula use | `true`, `false` |
| `shape_types_for_area` | Array | Shape types | `['square', 'rectangle', 'rectilinear', 'triangle', 'parallelogram']` |
| `dimension_range` | Object | Dimension values | `{ min: 2, max: 6 }`, `{ min: 5, max: 20 }` |
| `unit_types` | Array | Measurement units | `['cm', 'm', 'mixed']` |
| `compound_shape_parts` | Number/Array | Number of sub-shapes | `2`, `[2, 3]`, `[2, 3, 4]` |
| `calculation_approach` | Array | Solution methods | `['count_squares', 'use_formula', 'split_and_add', 'whole_minus_part']` |
| `include_diagram` | Boolean | Include shape diagram | `true`, `false` |
| `perimeter_complexity` | Array | Perimeter difficulty | `['regular', 'irregular', 'missing_sides']` |

---

## Ratio, Proportion & Algebra Parameters

Used for: Ratios, scaling, algebraic expressions (Year 6 only)

### Ratio Parameters (Year 6)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `ratio_format` | Array | Ratio notation | `['part_to_part', 'written']` |
| `ratio_operations` | Array | Operation types | `['find_missing_value', 'scale_up', 'share_amount']` |
| `sharing_ratios` | Array | Ratio values | `[[1,2], [1,3]]`, `[[2,3], [1,4], [2,3,4]]` |
| `total_amounts` | Array | Total amounts to share | `[12, 15, 18, 24]`, `[24, 30, 36, 60]` |
| `contexts` | Array | Real-world contexts | `['sweets', 'money', 'time', 'abstract']` |
| `problem_type` | Array | Problem types | `['find_shares', 'find_total', 'find_ratio']` |

### Algebra Parameters (Year 6)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `variable_letters` | Array | Variable names | `['a', 'b', 'x', 'y', 'n']` |
| `expression_types` | Array | Expression types | `['missing_number', 'simple_formula']` |
| `equation_forms` | Array | Equation structures | `['x + a = b', 'x - a = b', 'ax + b = c']` |
| `number_range` | Array | Number values | `[1, 50]`, `[1, 100]` |
| `use_letters` | Array | Letters to use | `['x', 'n']`, `['x', 'y', 'n']` |
| `difficulty` | Array | Difficulty levels | `['one_step', 'two_step']` |
| `contexts` | Array | Problem contexts | `['abstract', 'word_problem']` |

---

## Parameter Selection Guidelines

### By Year Group

- **Years 1-2**: Focus on concrete ranges (0-20, 0-100), single operations, simple shapes
- **Years 3-4**: Expanded ranges (to 1000, to 10000), formal methods, multi-step operations
- **Years 5-6**: Large numbers (millions), negatives, decimals, fractions, complex geometry

### By Strand

- **Number (N)**: Use counting parameters, `allow_negatives` for Y5+
- **Calculation (C)**: Use arithmetic parameters, `digit_counts` for formal methods
- **Fractions (F)**: Use fraction parameters, decimal parameters for Y4+
- **Geometry (G)**: Use geometry parameters, angle parameters for Y3+
- **Measurement (M)**: Use measurement parameters, `conversion_types`
- **Statistics (S)**: Use statistics parameters, `graph_types`
- **Position (P)**: Use coordinate parameters, transformation parameters
- **Ratio (R)**: Use ratio parameters (Y6 only)
- **Algebra (A)**: Use algebra parameters (Y6 only)

### Critical Year 5 Consideration

Year 5 counting modules use **`powers_of_10`** instead of `step_sizes` and must include:
- `allow_negatives: true`
- `start_range: [min, max]` for negative starting points
- Proper handling of crossing zero

---

## Version History

- **v2.0** (2025-11-23): Added comprehensive schema documentation for all strands
- **v1.0** (Initial): Basic parameter documentation

---

**For questions or clarifications, refer to:**
- `CLAUDE.md` - Full project architecture
- `refactor_plan.md` - Schema refactoring details
- `.claude/agents/parameter-designer.md` - Parameter design agent
