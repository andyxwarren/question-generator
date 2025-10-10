# Implementation Template & Workflow
## Systematic Approach to Parameterizing All 336 Modules

---

## Overview

Your curriculum contains:
- **9 Strands** (major topic areas)
- **336 Total Modules** (56 per year across Years 1-6)
- **Varying Substrands** per strand (3-12 substrands each)

---

## Recommended Workflow

### Phase 1: Template Preparation (Week 1)
1. Set up JSON database structure
2. Create parameter templates for each strand
3. Establish naming conventions
4. Build validation checklist

### Phase 2: Parameterization by Strand (Weeks 2-5)
Work through each strand systematically:
- Start with most concrete (Number, Calculations)
- Move to abstract (Algebra, Statistics)
- Focus on 1-2 strands per week

### Phase 3: Review & Validation (Week 6)
1. Cross-check difficulty progressions
2. Validate with sample questions
3. Teacher review session
4. Pilot with students

### Phase 4: Iteration (Week 7)
1. Refine based on feedback
2. Adjust overlaps between years
3. Standardize parameter ranges

---

## JSON Database Template

### Overall Structure

```json
{
  "curriculum_metadata": {
    "name": "UK National Curriculum Mathematics",
    "key_stages": [1, 2],
    "years": [1, 2, 3, 4, 5, 6],
    "version": "1.0",
    "last_updated": "2025-10-08"
  },
  "modules": []
}
```

### Individual Module Template

```json
{
  "module_id": "Y1_N1_001",
  "year": "Year 1",
  "strand": "Number and place value",
  "substrand": "counting (in multiples)",
  "content_domain_reference": "N1",
  "module_description": "count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens",
  
  "parameter_category": "counting",
  
  "parameters": {
    "numerical": {
      "min_value": {
        "level_1": 0,
        "level_2": 0,
        "level_3": 0,
        "level_4": 0,
        "data_type": "integer"
      },
      "max_value": {
        "level_1": 30,
        "level_2": 50,
        "level_3": 100,
        "level_4": 200,
        "data_type": "integer"
      }
    },
    
    "operational": {
      "step_sizes": {
        "level_1": [1, 2, 5, 10],
        "level_2": [1, 2, 5, 10],
        "level_3": [1, 2, 5, 10],
        "level_4": [1, 2, 3, 5, 10],
        "data_type": "array"
      },
      "directions": {
        "level_1": ["forwards"],
        "level_2": ["forwards", "backwards"],
        "level_3": ["forwards", "backwards"],
        "level_4": ["forwards", "backwards", "mixed"],
        "data_type": "array"
      }
    },
    
    "cognitive": {
      "sequence_length": {
        "level_1": 5,
        "level_2": 10,
        "level_3": 15,
        "level_4": 20,
        "data_type": "integer"
      },
      "missing_numbers": {
        "level_1": 0,
        "level_2": 1,
        "level_3": 2,
        "level_4": 3,
        "data_type": "integer"
      }
    },
    
    "scaffolding": {
      "visual_aids": {
        "level_1": "always",
        "level_2": "often",
        "level_3": "sometimes",
        "level_4": "rarely",
        "data_type": "string"
      },
      "number_line_provided": {
        "level_1": true,
        "level_2": true,
        "level_3": false,
        "level_4": false,
        "data_type": "boolean"
      }
    },
    
    "assessment": {
      "time_limit_seconds": {
        "level_1": 120,
        "level_2": 90,
        "level_3": 60,
        "level_4": 45,
        "data_type": "integer"
      },
      "accuracy_target": {
        "level_1": 0.70,
        "level_2": 0.80,
        "level_3": 0.90,
        "level_4": 0.95,
        "data_type": "float"
      }
    }
  },
  
  "sample_questions": {
    "level_1": "Count forwards from 0 in twos: 0, 2, 4, _, _, _",
    "level_2": "Count backwards from 50 in fives: 50, 45, _, _, _",
    "level_3": "Continue the sequence: 23, 25, 27, _, _, _",
    "level_4": "What is the pattern? 187, 184, 181, _, _. Count backwards from 200 using this rule."
  },
  
  "implementation_notes": "Focus on understanding the pattern before speed. Use physical objects at Level 1.",
  
  "common_misconceptions": [
    "Difficulty counting backwards",
    "Confusing step sizes",
    "Starting from non-zero numbers"
  ],
  
  "prerequisite_modules": [],
  "next_modules": ["Y2_N1_001"]
}
```

---

## Parameter Categories Reference

### Core Parameter Types

#### 1. **Numerical Parameters**
```json
{
  "min_value": "smallest number in exercises",
  "max_value": "largest number in exercises",
  "value_range": "specific range constraints",
  "number_count": "how many numbers to work with",
  "decimal_places": "precision level",
  "negative_included": "allow negative numbers"
}
```

#### 2. **Operational Parameters**
```json
{
  "operations": "which math operations",
  "step_sizes": "counting intervals",
  "calculation_steps": "single or multi-step",
  "operation_complexity": "difficulty of operations"
}
```

#### 3. **Cognitive Parameters**
```json
{
  "problem_steps": "number of steps to solution",
  "abstraction_level": "concrete/pictorial/abstract",
  "reasoning_depth": "simple/moderate/complex",
  "question_types": "formats of questions"
}
```

#### 4. **Contextual Parameters**
```json
{
  "context_type": "real-world scenarios",
  "context_complexity": "simple/moderate/complex",
  "interdisciplinary": "connections to other subjects"
}
```

#### 5. **Scaffolding Parameters**
```json
{
  "visual_aids": "always/often/sometimes/rarely",
  "worked_examples": "number provided",
  "hints_available": "level of support",
  "model_provided": "example given first"
}
```

#### 6. **Assessment Parameters**
```json
{
  "time_limit": "seconds per question",
  "questions_per_session": "number of questions",
  "accuracy_target": "expected success rate",
  "fluency_requirement": "speed expectation"
}
```

---

## Quick Start Guide for Each Strand

### 1. Number and Place Value (36 modules)
**Key Parameters**: min_value, max_value, step_sizes, number_format, place_value_focus

**Parameterization Time**: ~3 hours  
**Priority**: HIGH (foundation for everything)

**Focus Areas**:
- Counting progressions
- Number recognition ranges
- Place value complexity
- Negative numbers introduction

---

### 2. Calculations (54 modules)
**Key Parameters**: operation_type, number_ranges, mental_vs_written, multi_step, word_problem_complexity

**Parameterization Time**: ~5 hours  
**Priority**: HIGH (most modules)

**Focus Areas**:
- Mental calculation ranges
- Written method complexity
- Times tables fluency
- Problem-solving depth

---

### 3. Fractions, Decimals, Percentages (72 modules)
**Key Parameters**: denominators, numerator_range, decimal_places, fraction_type, visual_representation

**Parameterization Time**: ~6 hours  
**Priority**: HIGH (most complex progression)

**Focus Areas**:
- Fraction denominators
- Improper/mixed fractions
- Decimal precision
- Percentage contexts

---

### 4. Ratio and Proportion (24 modules)
**Key Parameters**: ratio_complexity, scale_factors, comparison_type, unequal_sharing

**Parameterization Time**: ~2 hours  
**Priority**: MEDIUM

**Focus Areas**:
- Simple to complex ratios
- Scale factor ranges
- Real-world contexts

---

### 5. Algebra (30 modules)
**Key Parameters**: equation_complexity, unknowns_count, sequence_type, abstraction_level

**Parameterization Time**: ~3 hours  
**Priority**: MEDIUM

**Focus Areas**:
- Missing number positions
- Sequence patterns
- Two-variable problems

---

### 6. Measurement (54 modules)
**Key Parameters**: unit_types, conversion_steps, precision_level, tool_use, real_world_context

**Parameterization Time**: ~5 hours  
**Priority**: HIGH

**Focus Areas**:
- Metric conversions
- Time complexity
- Money amounts
- Perimeter/area calculations

---

### 7. Geometry - Shapes (30 modules)
**Key Parameters**: shape_types, property_count, orientation, angle_precision, construction_complexity

**Parameterization Time**: ~3 hours  
**Priority**: MEDIUM

**Focus Areas**:
- 2D/3D shape variety
- Angle measurements
- Property identification
- Construction tasks

---

### 8. Geometry - Position (18 modules)
**Key Parameters**: grid_size, quadrants, coordinate_range, transformation_types

**Parameterization Time**: ~2 hours  
**Priority**: LOW

**Focus Areas**:
- Coordinate ranges
- Transformation complexity
- Pattern identification

---

### 9. Statistics (18 modules)
**Key Parameters**: data_points, graph_types, scale_complexity, interpretation_depth

**Parameterization Time**: ~2 hours  
**Priority**: LOW

**Focus Areas**:
- Data quantities
- Graph scale complexity
- Analysis depth

---

## Validation Checklist

For each module, verify:

- [ ] All 4 levels are defined
- [ ] Progressive increase in difficulty
- [ ] Level 3 matches curriculum expectation exactly
- [ ] Level 1 is genuinely accessible to struggling students
- [ ] Level 4 doesn't exceed year group too much
- [ ] Sample questions written for each level
- [ ] Parameters don't conflict with each other
- [ ] Prerequisites identified
- [ ] Common misconceptions noted
- [ ] Implementation guidance provided

---

## Quality Assurance Questions

1. **Can you generate 10 unique questions at each level?**
2. **Do the levels feel meaningfully different?**
3. **Would a teacher immediately understand the progression?**
4. **Are the parameters implementable in question generation code?**
5. **Have you avoided arbitrary complexity jumps?**

---

## Suggested Tools

### Spreadsheet Structure
Create a tracking sheet with columns:
- Module ID
- Year
- Strand
- Substrand
- Description
- Status (Not Started / In Progress / Complete / Reviewed)
- Primary Parameters Needed
- Complexity Rating (1-5)
- Notes
- Assigned To
- Completion Date

### JSON Editor
Use a JSON editor with validation (VS Code with JSON schema)

### Version Control
Track changes in Git to maintain history and allow rollback

---

## Timeline Estimate

**Total Time**: ~35-40 hours of focused work

| Phase | Hours | Focus |
|-------|-------|-------|
| Setup | 3 | Templates and structure |
| Number & Calculations | 8 | Foundation strands |
| Fractions & Decimals | 6 | Complex progressions |
| Measurement | 5 | Varied contexts |
| Geometry | 5 | Spatial reasoning |
| Algebra | 3 | Abstract thinking |
| Ratio & Statistics | 4 | Application strands |
| Review & Validation | 6 | Quality assurance |

---

## Success Metrics

Your parameterization is successful when:

1. **Question generators can create varied questions** from the parameters
2. **Teachers can see clear differentiation** between levels
3. **Students show appropriate success rates** at their level (70-90%)
4. **Progression feels natural** when students move between levels
5. **Parameters are reusable** for similar modules across years

---

## Next Steps

1. **Choose your tool**: Decide on JSON files, database, or spreadsheet
2. **Start with one strand**: Recommend "Number and place value"
3. **Complete 5-10 modules fully**: Get feedback before continuing
4. **Iterate on template**: Adjust based on what works
5. **Build momentum**: Once the pattern is clear, work accelerates
6. **Get teacher input**: Review with educators after each strand

Would you like me to generate the complete parameterization for a specific strand to get you started?