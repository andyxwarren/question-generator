# Detailed Module Parameterization Examples

## How to Apply the Framework to Specific Modules

Below are 8 detailed examples showing exactly how to parameterize modules from the curriculum with 4 difficulty levels.

---

## Example 1: Year 1 - Counting
**Module**: "Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens"

**Strand**: Number and place value  
**Reference**: N1

### Parameters with 4 Levels:

```json
{
  "module_id": "Y1_N1_counting",
  "parameters": {
    "min_value": {
      "level_1": 0,
      "level_2": 0,
      "level_3": 0,
      "level_4": 0
    },
    "max_value": {
      "level_1": 30,
      "level_2": 50,
      "level_3": 100,
      "level_4": 200
    },
    "step_sizes": {
      "level_1": [1, 2, 5, 10],
      "level_2": [1, 2, 5, 10],
      "level_3": [1, 2, 5, 10],
      "level_4": [1, 2, 3, 5, 10]
    },
    "starting_points": {
      "level_1": [0, 1],
      "level_2": [0, 1, 5, 10, 20],
      "level_3": ["any_multiple_of_step"],
      "level_4": ["any_number"]
    },
    "directions": {
      "level_1": ["forwards"],
      "level_2": ["forwards", "backwards"],
      "level_3": ["forwards", "backwards"],
      "level_4": ["forwards", "backwards", "mixed"]
    },
    "sequence_length": {
      "level_1": 5,
      "level_2": 10,
      "level_3": 15,
      "level_4": 20
    },
    "missing_numbers": {
      "level_1": 0,
      "level_2": 1,
      "level_3": 2,
      "level_4": 3
    }
  }
}
```

**Sample Questions:**
- **Level 1**: Count forwards from 0 in ones to 30
- **Level 2**: Count backwards from 50 in tens to 0
- **Level 3**: Count forwards from 47 in twos to 71
- **Level 4**: Count backwards from 183 in threes, what are the next 5 numbers?

---

## Example 2: Year 2 - Counting in Steps
**Module**: "Count in steps of 2, 3, and 5 from 0, and in tens from any number, forward or backward"

**Strand**: Number and place value  
**Reference**: N1

### Parameters:

```json
{
  "module_id": "Y2_N1_counting_steps",
  "parameters": {
    "step_sizes": {
      "level_1": [2, 5, 10],
      "level_2": [2, 3, 5, 10],
      "level_3": [2, 3, 5, 10],
      "level_4": [2, 3, 4, 5, 10]
    },
    "starting_point": {
      "level_1": [0],
      "level_2": [0, "any_for_tens"],
      "level_3": ["any_for_tens", 0],
      "level_4": ["any_number"]
    },
    "max_value": {
      "level_1": 50,
      "level_2": 100,
      "level_3": 100,
      "level_4": 200
    },
    "direction": {
      "level_1": ["forward"],
      "level_2": ["forward", "backward"],
      "level_3": ["forward", "backward"],
      "level_4": ["forward", "backward"]
    },
    "sequence_length": {
      "level_1": 6,
      "level_2": 8,
      "level_3": 10,
      "level_4": 12
    },
    "question_types": {
      "level_1": ["complete_sequence"],
      "level_2": ["complete_sequence", "find_missing"],
      "level_3": ["complete_sequence", "find_missing", "continue_pattern"],
      "level_4": ["all_types", "identify_rule"]
    }
  }
}
```

---

## Example 3: Year 1 - Number Bonds
**Module**: "Represent and use number bonds and related subtraction facts within 20"

**Strand**: Calculations  
**Reference**: C1

### Parameters:

```json
{
  "module_id": "Y1_C1_number_bonds",
  "parameters": {
    "total_value": {
      "level_1": [5, 10],
      "level_2": [10],
      "level_3": [10, 20],
      "level_4": [20]
    },
    "missing_part": {
      "level_1": "second_number",
      "level_2": "either_number",
      "level_3": "either_number",
      "level_4": "any_position"
    },
    "representation": {
      "level_1": "concrete_objects",
      "level_2": "pictorial",
      "level_3": "abstract_numbers",
      "level_4": "mixed_abstract"
    },
    "include_subtraction": {
      "level_1": false,
      "level_2": true,
      "level_3": true,
      "level_4": true
    },
    "bond_families": {
      "level_1": 1,
      "level_2": 2,
      "level_3": 3,
      "level_4": 4
    },
    "time_limit_seconds": {
      "level_1": 15,
      "level_2": 10,
      "level_3": 5,
      "level_4": 3
    },
    "questions_per_session": {
      "level_1": 5,
      "level_2": 8,
      "level_3": 10,
      "level_4": 15
    }
  }
}
```

**Sample Questions:**
- **Level 1**: 5 = 3 + __ (with pictures)
- **Level 2**: __ + 6 = 10
- **Level 3**: 20 - __ = 13
- **Level 4**: 15 + __ = 20, 20 - 15 = __, __ - 7 = 13

---

## Example 4: Year 3 - Estimation & Inverse
**Module**: "Estimate the answer to a calculation and use inverse operations to check answers"

**Strand**: Calculations  
**Reference**: C3

### Parameters:

```json
{
  "module_id": "Y3_C3_estimate_inverse",
  "parameters": {
    "calculation_types": {
      "level_1": ["addition"],
      "level_2": ["addition", "subtraction"],
      "level_3": ["addition", "subtraction", "multiplication"],
      "level_4": ["all_four_operations"]
    },
    "number_range": {
      "level_1": [10, 100],
      "level_2": [10, 500],
      "level_3": [10, 1000],
      "level_4": [1, 10000]
    },
    "rounding_to": {
      "level_1": "nearest_10",
      "level_2": "nearest_10_or_100",
      "level_3": "appropriate_place_value",
      "level_4": "most_appropriate"
    },
    "estimation_required": {
      "level_1": "before_only",
      "level_2": "before_and_compare",
      "level_3": "before_and_check_reasonableness",
      "level_4": "before_during_after"
    },
    "inverse_check": {
      "level_1": "teacher_prompted",
      "level_2": "sometimes",
      "level_3": "always",
      "level_4": "always_plus_explain"
    },
    "problem_complexity": {
      "level_1": "single_operation",
      "level_2": "single_operation_word_problem",
      "level_3": "two_step_calculation",
      "level_4": "multi_step_with_reasoning"
    }
  }
}
```

---

## Example 5: Year 1 - Fractions (Halves & Quarters)
**Module**: "Recognise, find and name a half/quarter as equal parts of an object, shape or quantity"

**Strand**: Fractions  
**Reference**: F1

### Parameters:

```json
{
  "module_id": "Y1_F1_halves_quarters",
  "parameters": {
    "fractions": {
      "level_1": ["1/2"],
      "level_2": ["1/2", "1/4"],
      "level_3": ["1/2", "1/4"],
      "level_4": ["1/2", "1/4", "3/4"]
    },
    "representation_type": {
      "level_1": "single_shape",
      "level_2": "multiple_shapes",
      "level_3": "shapes_and_quantities",
      "level_4": "abstract_quantities"
    },
    "shape_types": {
      "level_1": ["circle", "rectangle"],
      "level_2": ["circle", "rectangle", "square"],
      "level_3": ["various_regular_shapes"],
      "level_4": ["any_shape"]
    },
    "quantity_range": {
      "level_1": [2, 4],
      "level_2": [2, 8],
      "level_3": [2, 12],
      "level_4": [2, 20]
    },
    "tasks": {
      "level_1": ["identify_shaded"],
      "level_2": ["identify_shaded", "shade_fraction"],
      "level_3": ["identify", "shade", "find_fraction_of_amount"],
      "level_4": ["all_tasks", "compare_fractions"]
    },
    "visual_clarity": {
      "level_1": "clearly_marked",
      "level_2": "mostly_marked",
      "level_3": "some_marking",
      "level_4": "minimal_marking"
    },
    "equal_parts_emphasis": {
      "level_1": "always_show_equal",
      "level_2": "show_equal_and_unequal",
      "level_3": "identify_equal_parts",
      "level_4": "justify_equal_parts"
    }
  }
}
```

---

## Example 6: Year 1 - 2D and 3D Shapes
**Module**: "Recognise and name common 2-D and 3-D shapes"

**Strand**: Geometry  
**Reference**: G1

### Parameters:

```json
{
  "module_id": "Y1_G1_shapes",
  "parameters": {
    "shapes_2d": {
      "level_1": ["circle", "square", "rectangle", "triangle"],
      "level_2": ["circle", "square", "rectangle", "triangle"],
      "level_3": ["circle", "square", "rectangle", "triangle"],
      "level_4": ["circle", "square", "rectangle", "triangle", "pentagon", "hexagon"]
    },
    "shapes_3d": {
      "level_1": ["cube", "sphere"],
      "level_2": ["cube", "sphere", "cuboid"],
      "level_3": ["cube", "sphere", "cuboid", "pyramid"],
      "level_4": ["cube", "sphere", "cuboid", "pyramid", "cylinder", "cone"]
    },
    "orientation": {
      "level_1": "standard",
      "level_2": "standard_and_rotated",
      "level_3": "various",
      "level_4": "any"
    },
    "size_variation": {
      "level_1": "similar_sizes",
      "level_2": "varied_sizes",
      "level_3": "wide_range",
      "level_4": "extreme_variation"
    },
    "tasks": {
      "level_1": ["name_from_picture"],
      "level_2": ["name_from_picture", "select_shape"],
      "level_3": ["name", "select", "draw"],
      "level_4": ["name", "select", "draw", "find_in_environment"]
    },
    "distractors": {
      "level_1": 2,
      "level_2": 3,
      "level_3": 4,
      "level_4": 5
    },
    "real_world_objects": {
      "level_1": false,
      "level_2": true,
      "level_3": true,
      "level_4": true
    }
  }
}
```

---

## Example 7: Year 4 - Multiplication Tables
**Module**: "Recall multiplication and division facts for multiplication tables up to 12 × 12"

**Strand**: Calculations  
**Reference**: C2

### Parameters:

```json
{
  "module_id": "Y4_C2_times_tables",
  "parameters": {
    "tables_included": {
      "level_1": [2, 5, 10],
      "level_2": [2, 3, 4, 5, 10],
      "level_3": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      "level_4": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    "max_multiplier": {
      "level_1": 10,
      "level_2": 12,
      "level_3": 12,
      "level_4": 12
    },
    "include_division": {
      "level_1": false,
      "level_2": true,
      "level_3": true,
      "level_4": true
    },
    "include_missing_number": {
      "level_1": false,
      "level_2": true,
      "level_3": true,
      "level_4": true
    },
    "time_limit_per_question": {
      "level_1": 8,
      "level_2": 5,
      "level_3": 3,
      "level_4": 2
    },
    "question_types": {
      "level_1": ["standard_equation"],
      "level_2": ["equation", "division"],
      "level_3": ["equation", "division", "missing_factor"],
      "level_4": ["equation", "division", "missing_factor", "word_problems"]
    },
    "questions_per_session": {
      "level_1": 10,
      "level_2": 15,
      "level_3": 20,
      "level_4": 25
    },
    "accuracy_target": {
      "level_1": 0.70,
      "level_2": 0.80,
      "level_3": 0.90,
      "level_4": 0.95
    }
  }
}
```

---

## Example 8: Year 5 - Decimals & Place Value
**Module**: "Read, write, order and compare numbers with up to three decimal places"

**Strand**: Fractions, decimals and percentages  
**Reference**: F2

### Parameters:

```json
{
  "module_id": "Y5_F2_decimals",
  "parameters": {
    "decimal_places": {
      "level_1": 1,
      "level_2": 2,
      "level_3": 3,
      "level_4": 3
    },
    "integer_part_range": {
      "level_1": [0, 10],
      "level_2": [0, 100],
      "level_3": [0, 1000],
      "level_4": [0, 10000]
    },
    "include_whole_numbers": {
      "level_1": true,
      "level_2": true,
      "level_3": true,
      "level_4": true
    },
    "include_trailing_zeros": {
      "level_1": false,
      "level_2": true,
      "level_3": true,
      "level_4": true
    },
    "tasks": {
      "level_1": ["read", "write"],
      "level_2": ["read", "write", "order"],
      "level_3": ["read", "write", "order", "compare"],
      "level_4": ["read", "write", "order", "compare", "round"]
    },
    "number_count": {
      "level_1": 2,
      "level_2": 3,
      "level_3": 4,
      "level_4": 5
    },
    "place_value_emphasis": {
      "level_1": "tenths",
      "level_2": "tenths_and_hundredths",
      "level_3": "all_three_places",
      "level_4": "all_three_plus_relationships"
    },
    "representation": {
      "level_1": "number_line",
      "level_2": "number_line_and_place_value_chart",
      "level_3": "abstract_numbers",
      "level_4": "context_problems"
    }
  }
}
```

---

## JSON Schema Template

Use this template structure for ALL modules:

```json
{
  "module_id": "Y[year]_[ref]_[short_name]",
  "year": "Year X",
  "strand": "",
  "substrand": "",
  "content_domain_reference": "",
  "module_description": "",
  "parameters": {
    "[parameter_name]": {
      "level_1_beginning": value,
      "level_2_developing": value,
      "level_3_meeting": value,
      "level_4_exceeding": value
    }
  },
  "difficulty_notes": {
    "level_1": "description of what makes this beginning level",
    "level_2": "description of developing characteristics",
    "level_3": "description of meeting expectations",
    "level_4": "description of exceeding characteristics"
  }
}
```

---

## Key Principles Applied

1. **Progressive Challenge**: Each level increases in one or more dimensions
2. **Multiple Dimensions**: Complexity, range, speed, independence
3. **Overlap Prevention**: Level 4 stays within curriculum year expectations
4. **Realistic Steps**: Each level is meaningfully different but achievable
5. **Assessment Ready**: Parameters allow for reliable difficulty comparison

---

## Implementation Checklist

- [ ] Identify parameter types needed for each module
- [ ] Define Level 3 first (curriculum expectation)
- [ ] Scale down to Levels 1 and 2
- [ ] Scale up to Level 4 (within reason)
- [ ] Validate with sample questions
- [ ] Test with students across ability range
- [ ] Refine based on performance data