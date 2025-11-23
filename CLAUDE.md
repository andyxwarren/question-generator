# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

This is a pure JavaScript application using ES6 modules. It requires a web server to run due to CORS restrictions:

```bash
# Python (recommended)
python -m http.server 8000

# Node.js
npx http-server -p 8000

# VS Code
# Install "Live Server" extension and right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000` in a browser.

⚠️ **Important**: Do NOT open `index.html` directly with `file://` protocol - ES6 modules will fail due to CORS.

## Architecture Overview

This is a UK National Curriculum-aligned mathematics practice application following a **parameter-based architecture** with three core layers:

### 1. Curriculum Layer (`src/curriculum/`)
- `parameters.js` - Defines all curriculum modules with 4 difficulty levels each
- Each module has an ID based on UK National Curriculum codes (e.g., `N01_Y1_NPV`)
- Parameters are organized **by level** (not by parameter type)
- Levels: 1=Beginning, 2=Developing, 3=Meeting, 4=Exceeding

### 2. Generator Layer (`src/generators/`)
- Each file generates questions for one curriculum module (e.g., `N01_Y1_NPV_counting.js`)
- Generators are **pure functions** that take parameters and level, return question objects
- Question types: `text_input`, `multiple_choice`, `fill_blanks`, `next_number`
- All generators must export: `{ moduleId, generate }`

### 3. Engine & UI Layer (`src/core/` and `src/ui/`)
- `questionEngine.js` - Registry pattern for generators, orchestrates question creation
- `validator.js` - Validates student answers (handles text, numbers, multi-gap)
- `app.js` - Main UI controller, renders questions grouped by difficulty level

### Key Design Patterns
- **Registry Pattern**: QuestionEngine maintains a Map of generators keyed by moduleId
- **Pure Functions**: Generators have no side effects, can be called repeatedly
- **Parameter-Driven**: All question constraints come from `parameters.js`, not hardcoded
- **Singleton**: QuestionEngine is exported as a singleton instance

## Adding New Curriculum Modules

1. **Define parameters** in `src/curriculum/parameters.js`:
```javascript
'MODULE_ID': {
    id: 'MODULE_ID',
    name: 'Display name',
    description: '...',
    icon: '🔢',
    yearGroup: 'Year N',
    strand: 'Number and Place Value',
    parameters: {
        1: { /* level 1 params */ },
        2: { /* level 2 params */ },
        3: { /* level 3 params */ },
        4: { /* level 4 params */ }
    }
}
```

2. **Create generator** in `src/generators/MODULE_ID_*.js`:
```javascript
export function generateQuestion(params, level) {
    // Use params to generate question
    return {
        text: 'Question text',
        type: 'text_input' | 'multiple_choice',
        answer: 'correct answer',
        // For multiple choice: options: [...]
        // For text input: hint: '...'
        module: 'MODULE_ID',
        level: level
    };
}

export default {
    moduleId: 'MODULE_ID',
    generate: generateQuestion
};
```

3. **Register generator** in `src/core/questionEngine.js`:
```javascript
import newGenerator from '../generators/MODULE_ID_*.js';

registerDefaultGenerators() {
    // ... existing
    this.register(newGenerator);
}
```

## Question Object Schema

All generators must return objects with this structure:

```javascript
{
    text: string,           // Question text shown to student
    type: 'text_input' | 'multiple_choice',
    answer: string,         // Correct answer (always string, even for numbers)
    // For multiple choice:
    options: number[],      // Array of options to choose from
    // For text input:
    hint: string,           // Optional hint
    answers: any[],         // For multi-gap questions (array of answers)
    // Added automatically:
    id: string,             // Unique ID (added by QuestionEngine)
    timestamp: number,      // Generation timestamp (added by QuestionEngine)
    module: string,         // Module ID
    level: number           // Difficulty level (1-4)
}
```

## Common Parameters Structure

Parameters are organized by mathematical strand. Use the appropriate parameter types based on the curriculum objective.

### Number & Counting Parameters
Used for: Counting sequences, number generation, place value
- `min_value`, `max_value`: Bounds for generated numbers
- `step_sizes`: Array of counting increments (e.g., `[1, 2, 5, 10]`) - **Years 1-4 only**
- `powers_of_10`: Array for Year 5+ (e.g., `[10, 100, 1000]`) - **Use instead of step_sizes for Y5+**
- `directions`: Array of `'forwards'` and/or `'backwards'`
- `start_from`: Where sequences start (`'zero_only'`, `'any'`, `'zero_or_multiple'`, `'non_zero'`)
- `sequence_length`: How many numbers in a sequence
- `gaps_count`: Number of blanks in fill-in questions
- `gap_position`: Where gaps appear (`'end'`, `'middle'`, `'random'`, `'start'`, `'start_and_end'`)
- `allow_negatives`: Boolean (critical for Year 5+)
- `start_range`: Array `[min, max]` for starting values (Year 5+ with negatives)

**Example:**
```javascript
// Year 3 counting in multiples of 4, 8, 50, 100
parameters: {
    1: {
        step_sizes: [4, 8],
        min_value: 0,
        max_value: 100,
        directions: ['forwards'],
        start_from: 'zero_only'
    }
}
```

**Example - Roman Numerals (N03 Years 3-5):**
```javascript
// Year 3: Read Roman numerals to 12 (clock faces)
parameters: {
    1: {
        roman_range: [1, 5],  // I, II, III, IV, V
        roman_representation: ['standard', 'clock_face'],
        conversion_type: ['roman_to_arabic'],
        numeral_complexity: ['simple'],  // No subtractive yet
        include_context: true,
        common_values_only: true
    },
    3: {
        roman_range: [1, 12],  // Full clock face I-XII
        roman_representation: ['clock_face', 'standard'],
        conversion_type: ['roman_to_arabic', 'arabic_to_roman'],
        numeral_complexity: ['simple', 'subtractive'],  // IV, IX
        include_context: true
    }
}

// Year 5: Recognize years written in Roman numerals (I-M, 1-1000)
parameters: {
    1: {
        roman_range: [1, 100],  // I-C
        roman_representation: ['standard'],
        conversion_type: ['roman_to_arabic'],
        numeral_complexity: ['subtractive'],
        include_context: false
    },
    4: {
        roman_range: [1, 1000],  // I-M including years
        roman_representation: ['standard', 'year', 'date'],
        conversion_type: ['roman_to_arabic', 'arabic_to_roman'],
        numeral_complexity: ['subtractive'],
        include_context: true,
        common_values_only: false  // Any valid numeral
    }
}
```

### Arithmetic Parameters
Used for: Addition, subtraction, multiplication, division
- `tables`: Array of multiplication tables (e.g., `[2, 5, 10]`)
- `digit_counts`: Object like `{ multiplicand: [1, 2], multiplier: [1] }` (for multi-digit operations)
- `operations`: Array of operations (e.g., `['addition', 'subtraction']`)
- `carry_required`: Boolean (for columnar calculations)
- `borrow_required`: Boolean (for subtraction)

**Example:**
```javascript
// Year 4 columnar multiplication: 2-digit × 1-digit
parameters: {
    1: {
        digit_counts: { multiplicand: [2], multiplier: [1] },
        min_multiplicand: 10,
        max_multiplicand: 50,
        multiplier_range: [2, 5]
    }
}
```

**Example - Order of Operations (C09 Year 6):**
```javascript
// Use knowledge of the order of operations to carry out calculations
parameters: {
    1: {
        operator_complexity: ['single_priority'],
        bracket_usage: ['none'],
        structure_template: ['a + b + c', 'a × b × c'],
        operation_types: ['addition', 'multiplication'],
        number_range: [1, 10],
        result_range: [1, 50],
        include_parentheses: false,
        multi_step_count: 2
    },
    3: {
        operator_complexity: ['mixed_priority'],
        bracket_usage: ['none'],
        structure_template: ['a + b × c', 'a × b + c', 'a - b ÷ c'],
        operation_types: ['addition', 'subtraction', 'multiplication', 'division'],
        number_range: [1, 20],
        result_range: [1, 100],
        include_parentheses: false,
        require_working: true,
        multi_step_count: 2
    },
    4: {
        operator_complexity: ['mixed_priority'],
        bracket_usage: ['single_pair', 'nested'],
        structure_template: ['(a + b) × c', 'a × (b - c)', '(a + b) ÷ (c - d)'],
        operation_types: ['addition', 'subtraction', 'multiplication', 'division'],
        number_range: [1, 20],
        result_range: [1, 200],
        include_parentheses: true,
        require_working: true,
        multi_step_count: [3, 4]
    }
}
```

### Fraction Parameters
Used for: Fraction recognition, comparison, operations
- `denominators`: Array of allowed denominators
- `fraction_representation_types`: Array - `['shape', 'number_line', 'set', 'quantity']`
- `shape_types_for_fractions`: Array - `['circle', 'rectangle', 'bar_model']`
- `comparison_operators`: Array - `['less_than', 'greater_than', 'equal', 'order']`
- `fraction_types`: Array - `['unit', 'non_unit', 'proper', 'improper', 'mixed']`

**Example - Fraction Recognition (F01 Year 2):**
```javascript
// Recognising fractions of shapes and quantities
parameters: {
    1: {
        denominators: [2, 4],
        fraction_types: ['unit'],  // Only 1/2, 1/4
        representation_modes: ['shape'],
        shape_types_for_fractions: ['circle', 'rectangle'],
        visual_scaffolding: true,
        whole_max: 12  // For "1/2 of 6 = ?"
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

**Example - Equivalent Fractions (F02 Year 5):**
```javascript
// Mixed numbers ↔ improper fractions
parameters: {
    1: {
        operations: ['recognize', 'mixed_improper'],
        denominators: [2, 4],
        improper_range: [1, 10],
        include_diagrams: true,
        simplification_method: ['visual']
    },
    4: {
        operations: ['recognize', 'generate', 'simplify', 'mixed_improper'],
        denominators: [2, 3, 4, 5, 6, 10, 12],
        denominator_families: [[2,4,8], [3,6,12], [5,10,20]],
        improper_range: [1, 20],
        include_diagrams: false,
        simplification_method: ['factors'],
        include_multiplicative_reasoning: true
    }
}
```

**Example - Add/Subtract Fractions (F04 Year 6):**
```javascript
// Different denominators and mixed numbers
parameters: {
    1: {
        operations: ['add', 'subtract'],
        denominator_types: ['same'],
        result_constraint: ['within_one'],
        max_denominator: 8,
        include_mixed_numbers: false,
        number_of_terms: [2]
    },
    4: {
        operations: ['add', 'subtract', 'add_subtract_chain'],
        denominator_types: ['one_multiple_of_other', 'both_multiples_of_same'],
        result_constraint: ['can_exceed_one', 'improper_to_mixed'],
        max_denominator: 12,
        include_mixed_numbers: true,
        number_of_terms: [2, 3],
        require_simplification: true,
        show_working: true
    }
}
```

### Decimal & Percentage Parameters
Used for: Decimal operations, percentage calculations
- `decimal_places`: Number (1, 2, or 3) - tenths, hundredths, thousandths
- `decimal_operations`: Array - `['compare', 'order', 'round', 'convert_to_fraction']`
- `percentage_range`: Object - `{ min: 1, max: 100, common: [10, 25, 50, 75] }`
- `percentage_operations`: Array - `['recognition', 'to_fraction', 'of_amount']`

**Example:**
```javascript
// Year 5 comparing decimals with up to 3 decimal places
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

### Geometry Parameters
Used for: Shape recognition, properties, angles
- `shape_types_2d`: Array - `['circle', 'triangle', 'square', 'rectangle', 'pentagon', 'hexagon']`
- `shape_types_3d`: Array - `['cube', 'cuboid', 'sphere', 'cylinder', 'pyramid']`
- `property_types`: Array - `['sides', 'vertices', 'edges', 'faces', 'angles']`
- `angle_types`: Array - `['right', 'acute', 'obtuse', 'reflex']`
- `angle_range`: Object - `{ min: 1, max: 360 }`
- `angle_operations`: Array - `['identify_type', 'measure', 'calculate_missing']`

**Example - Shape Properties (G01 Year 2):**
```javascript
// Identifying properties of 2D shapes
parameters: {
    1: {
        shape_types_2d: ['triangle', 'square', 'rectangle'],
        property_types: ['sides', 'vertices'],
        property_ranges: { sides: { min: 3, max: 4 } },
        include_diagrams: true
    }
}
```

**Example - Angle Calculations (G04 Year 5/6):**
```javascript
// Calculate missing angles in polygons and on straight lines
parameters: {
    1: {
        angle_contexts: ['straight_line', 'right_angle'],
        angle_types: ['acute', 'obtuse'],
        angle_range: { min: 10, max: 170 },
        given_angles: 1,  // One angle given, find the other
        angle_sum: 180,  // Straight line
        include_diagram: true,
        show_labels: true
    },
    3: {
        angle_contexts: ['straight_line', 'point', 'triangle'],
        angle_types: ['acute', 'obtuse', 'right'],
        angle_range: { min: 5, max: 175 },
        given_angles: [1, 2],  // 1 or 2 angles given
        angle_sum: [180, 360],  // Straight line or around a point
        include_diagram: true,
        polygon_types: ['triangle', 'quadrilateral'],
        require_reasoning: true
    },
    4: {
        angle_contexts: ['straight_line', 'point', 'triangle', 'quadrilateral', 'polygon'],
        angle_types: ['acute', 'obtuse', 'right', 'reflex'],
        angle_range: { min: 1, max: 359 },
        given_angles: [1, 2, 3],  // Multiple angles given
        angle_sum: [180, 360],  // Multiple contexts
        include_diagram: false,  // Abstract diagrams
        polygon_types: ['triangle', 'quadrilateral', 'pentagon', 'hexagon'],
        require_reasoning: true,
        multi_step: true  // May require calculating intermediate angles
    }
}
```

**Example - Symmetry Construction (G02 Year 4):**
```javascript
// Complete a simple symmetric figure with respect to a specific line of symmetry
parameters: {
    1: {
        completion_task_type: ['complete_shape'],
        symmetry_line_orientation: ['vertical'],
        shape_complexity: ['simple_polygon'],
        grid_reference: true,
        grid_size: { rows: 10, cols: 10 },
        partial_shape_given: ['half'],
        include_vertices_marked: true,
        freehand_vs_grid: ['grid']
    },
    2: {
        completion_task_type: ['complete_shape', 'reflect_pattern'],
        symmetry_line_orientation: ['vertical', 'horizontal'],
        shape_complexity: ['simple_polygon', 'stepped_pattern'],
        grid_reference: true,
        grid_size: { rows: 12, cols: 12 },
        partial_shape_given: ['half'],
        include_vertices_marked: true,
        freehand_vs_grid: ['grid']
    },
    3: {
        completion_task_type: ['complete_shape', 'reflect_pattern', 'draw_other_half'],
        symmetry_line_orientation: ['vertical', 'horizontal', 'diagonal'],
        shape_complexity: ['stepped_pattern', 'curved'],
        grid_reference: true,
        grid_size: { rows: 12, cols: 12 },
        partial_shape_given: ['half', 'quarter'],
        include_vertices_marked: false,
        freehand_vs_grid: ['grid', 'dotted']
    },
    4: {
        completion_task_type: ['complete_shape', 'reflect_pattern'],
        symmetry_line_orientation: ['vertical', 'horizontal', 'diagonal'],
        shape_complexity: ['curved', 'complex'],
        grid_reference: false,  // No grid - freehand
        partial_shape_given: ['half', 'quarter'],
        include_vertices_marked: false,
        freehand_vs_grid: ['dotted', 'freehand']
    }
}
```

### Coordinate & Transformation Parameters
Used for: Grid coordinates, translations, reflections, rotations
- `coordinate_range`: Object - `{ x: { min: 0, max: 10 }, y: { min: 0, max: 10 } }`
- `quadrants`: Array - `['first']` for Y4 or `['all']` for Y6
- `transformation_types`: Array - `['translation', 'reflection', 'rotation']`
- `direction_types`: Array - `['left', 'right', 'up', 'down']`
- `turn_types`: Array - `['quarter', 'half', 'three_quarter']`

**Example:**
```javascript
// Year 4 coordinates in first quadrant
parameters: {
    1: {
        coordinate_range: { x: { min: 0, max: 5 }, y: { min: 0, max: 5 } },
        quadrants: ['first'],
        coordinate_operations: ['read_point', 'plot_point']
    }
}
```

### Statistics & Data Parameters
Used for: Graphs, charts, data interpretation
- `graph_types`: Array - `['pictogram', 'bar_chart', 'pie_chart', 'line_graph']`
- `scale_types`: Array - `[1, 2, 5, 10, 20, 50]` (for axes/pictograms)
- `category_count`: Object - `{ min: 2, max: 8 }`
- `data_range`: Object - `{ min: 0, max: 100 }`
- `data_question_types`: Array - `['count', 'how_many_more', 'total', 'compare']`

**Example - Interpreting Charts (S01 Year 3):**
```javascript
// Interpreting bar charts and pictograms
parameters: {
    1: {
        graph_types: ['bar_chart'],
        scale_types: [1, 2],
        category_count: { min: 3, max: 4 },
        data_range: { min: 0, max: 20 },
        data_question_types: ['count', 'how_many_more'],
        include_visual: true
    },
    4: {
        graph_types: ['bar_chart', 'pictogram'],
        scale_types: [2, 5, 10],  // More complex scales
        category_count: { min: 4, max: 6 },
        data_range: { min: 0, max: 100 },
        data_question_types: ['count', 'how_many_more', 'total', 'compare', 'difference'],
        include_visual: true,
        require_calculation: true
    }
}
```

**Example - Mean Average (S03 Year 6):**
```javascript
// Calculate and interpret the mean as an average
parameters: {
    1: {
        data_set_size: [3, 4],  // Number of values
        value_range: { min: 1, max: 10 },
        calculation_type: ['calculate_mean'],
        data_presentation: ['list'],
        result_type: ['whole_number'],  // Mean is always whole
        include_context: true,
        contexts: ['test_scores', 'temperatures']
    },
    3: {
        data_set_size: [4, 5, 6],
        value_range: { min: 1, max: 50 },
        calculation_type: ['calculate_mean', 'find_missing_value'],
        data_presentation: ['list', 'table'],
        result_type: ['whole_number', 'decimal_1dp'],
        include_context: true,
        contexts: ['test_scores', 'temperatures', 'distances', 'money'],
        show_working: true
    },
    4: {
        data_set_size: [5, 6, 7, 8],
        value_range: { min: 1, max: 100 },
        calculation_type: ['calculate_mean', 'find_missing_value', 'compare_means'],
        data_presentation: ['list', 'table', 'graph'],
        result_type: ['whole_number', 'decimal_1dp', 'decimal_2dp'],
        include_context: true,
        contexts: ['test_scores', 'temperatures', 'distances', 'money', 'abstract'],
        show_working: true,
        multi_step: true,  // May require calculating multiple means or totals first
        reasoning_required: true
    }
}
```

### Measurement Parameters
Used for: Length, mass, capacity, time, unit conversions
- `units`: Array of measurement units (e.g., `['m', 'cm', 'mm']`)
- `conversion_types`: Array - `['metric_only', 'imperial_to_metric']`
- `time_types`: Array - `['analog', 'digital_12hr', 'digital_24hr']`
- `time_precision`: Array - `['hour', 'half_hour', '5_minutes', 'minute']`
- `coin_types`: Array - `['1p', '2p', '5p', '10p', '20p', '50p', '£1', '£2']`
- `money_operations`: Array - `['recognise_coin', 'combine_amounts', 'give_change']`

**Example:**
```javascript
// Year 2 recognising coins and making amounts
parameters: {
    1: {
        coin_types: ['1p', '2p', '5p', '10p'],
        money_operations: ['recognise_coin', 'state_value'],
        amount_range: { min: 1, max: 20 }
    }
}
```

**Example - Rectilinear Area & Perimeter (M07 Years 4-6):**
```javascript
// Year 4: Find area by counting squares
parameters: {
    1: {
        grid_scaffolding: ['full_grid'],
        rectilinear_complexity: ['simple_rectangle'],
        area_formula_required: false,
        shape_types_for_area: ['square', 'rectangle'],
        dimension_range: { min: 2, max: 6 },
        unit_types: ['cm'],
        calculation_approach: ['count_squares'],
        include_diagram: true
    }
}

// Year 5: Calculate area of composite rectilinear shapes
parameters: {
    1: {
        grid_scaffolding: ['dimensions_only'],
        rectilinear_complexity: ['L_shape'],
        area_formula_required: false,
        shape_types_for_area: ['rectilinear'],
        dimension_range: { min: 3, max: 10 },
        unit_types: ['cm', 'm'],
        compound_shape_parts: 2,
        calculation_approach: ['use_formula', 'split_and_add'],
        include_diagram: true,
        perimeter_complexity: ['regular']
    },
    3: {
        grid_scaffolding: ['dimensions_only', 'edge_ticks'],
        rectilinear_complexity: ['L_shape', 'T_shape', 'composite_complex'],
        area_formula_required: false,
        shape_types_for_area: ['rectilinear'],
        dimension_range: { min: 5, max: 15 },
        unit_types: ['cm', 'm'],
        compound_shape_parts: [2, 3],
        calculation_approach: ['split_and_add', 'whole_minus_part'],
        include_diagram: true,
        perimeter_complexity: ['irregular', 'missing_sides']
    }
}

// Year 6: Area of triangles and parallelograms using formulae
parameters: {
    1: {
        grid_scaffolding: ['none'],
        area_formula_required: true,  // height ≠ side length
        shape_types_for_area: ['triangle', 'parallelogram'],
        dimension_range: { min: 4, max: 12 },
        unit_types: ['cm', 'm'],
        calculation_approach: ['use_formula'],
        include_diagram: true
    },
    4: {
        grid_scaffolding: ['none'],
        rectilinear_complexity: ['composite_complex', 'multiple_cutouts'],
        area_formula_required: true,
        shape_types_for_area: ['triangle', 'parallelogram', 'rectilinear'],
        dimension_range: { min: 5, max: 20 },
        unit_types: ['cm', 'm', 'mixed'],
        compound_shape_parts: [2, 3, 4],
        calculation_approach: ['use_formula', 'whole_minus_part'],
        include_diagram: false  // Abstract, no diagram
    }
}
```

### Ratio, Proportion & Algebra Parameters
Used for: Ratios, scaling, algebraic expressions (Year 6)
- `ratio_format`: Array - `['part_to_part', 'written']`
- `ratio_operations`: Array - `['find_missing_value', 'scale_up', 'share_amount']`
- `variable_letters`: Array - `['a', 'b', 'x', 'y', 'n']`
- `expression_types`: Array - `['missing_number', 'simple_formula']`

**Example - Ratio (Year 6):**
```javascript
// R04: Unequal sharing - divide 24 sweets in ratio 1:2
parameters: {
    1: {
        sharing_ratios: [[1,2], [1,3]],
        total_amounts: [12, 15, 18, 24],
        contexts: ['sweets', 'money'],
        problem_type: ['find_shares']
    },
    4: {
        sharing_ratios: [[2,3], [1,4], [2,3,4]],  // Include 3-way sharing
        total_amounts: [24, 30, 36, 60],
        contexts: ['money', 'time', 'abstract'],
        problem_type: ['find_shares', 'find_total', 'find_ratio']
    }
}
```

**Example - Algebra (Year 6):**
```javascript
// A01: Express missing number problems algebraically
parameters: {
    1: {
        equation_forms: ['x + a = b', 'x - a = b'],
        number_range: [1, 50],
        use_letters: ['x', 'n'],
        difficulty: ['one_step'],
        contexts: ['abstract']
    },
    4: {
        equation_forms: ['x + a = b', 'a - x = b', 'ax + b = c'],
        number_range: [1, 100],
        use_letters: ['x', 'y', 'n'],
        difficulty: ['one_step', 'two_step'],
        contexts: ['abstract', 'word_problem']
    }
}
```

### Parameter Selection Guidelines

**By Year Group:**
- **Years 1-2**: Focus on concrete ranges (0-20, 0-100), single operations, simple shapes
- **Years 3-4**: Expanded ranges (to 1000), formal methods, multi-step operations
- **Years 5-6**: Large numbers (millions), negatives, decimals, fractions, complex geometry

**By Strand:**
- **Number (N)**: Use counting parameters, allow_negatives for Y5+
- **Calculation (C)**: Use arithmetic parameters, digit_counts for formal methods
- **Fractions (F)**: Use fraction parameters, decimal parameters for Y4+
- **Geometry (G)**: Use geometry parameters, angle parameters for Y3+
- **Measurement (M)**: Use measurement parameters, conversion_types
- **Statistics (S)**: Use statistics parameters, graph_types
- **Position (P)**: Use coordinate parameters, transformation parameters
- **Ratio (R)**: Use ratio parameters (Y6 only)
- **Algebra (A)**: Use algebra parameters (Y6 only)

## File Structure

```
src/
├── curriculum/
│   └── parameters.js          # All module definitions
├── generators/
│   ├── N01_Y1_NPV_counting.js # Year 1 counting
│   ├── N01_Y2_NPV_counting.js # Year 2 counting
│   ├── N01_Y3_NPV_counting.js # Year 3 counting
│   ├── N01_Y4_NPV_counting.js # Year 4 counting
│   └── N01_Y5_NPV_counting.js # Year 5 counting (with negatives)
├── core/
│   ├── questionEngine.js      # Generator registry & orchestration
│   └── validator.js           # Answer validation
└── ui/
    └── app.js                 # Main UI controller

styles/                        # CSS files
tools/                         # Utility scripts (exportCodebase.js)
index.html                     # Entry point
```

## Year 5 Special Case

Year 5 counting includes **negative numbers** and uses `powers_of_10` instead of `step_sizes`:

```javascript
parameters: {
    1: {
        powers_of_10: [10, 100],    // NOT step_sizes
        min_value: -100,
        max_value: 100,
        start_range: [-50, 50],     // Specific to Y5
        // ...
    }
}
```

The generator must handle negative number sequences and crossing zero.

## Validation System

The validator (`src/core/validator.js`) handles:

- **Exact string matching** (normalized: trimmed, lowercase, no spaces)
- **Numeric comparison** with tolerance (handles floating point precision)
- **Multi-gap answers** (comma-separated values, order-independent)
- **Empty answer detection**

Multi-gap questions store answers two ways:
- `answer`: Comma-separated string (e.g., `"5,10,15"`)
- `answers`: Array (e.g., `[5, 10, 15]`)

## ES6 Modules

All files use ES6 modules:
- Use `export` for functions/objects
- Use `import` with `.js` extensions
- No bundler required (native browser support)
- Module paths must be relative and include `.js`

## No Build Process

- No npm dependencies
- No compilation or transpilation
- Pure HTML/CSS/JavaScript
- Works offline after first load

## Visual Display Philosophy: Low-Overhead Solutions

When implementing visual representations for mathematical concepts, **prioritize simple, low-overhead solutions** that achieve the right balance between visual appeal and implementation effort.

### Guiding Principles

1. **90/10 Rule**: Aim for solutions that deliver 90% of the visual benefits for 10% of the implementation effort
2. **HTML/CSS First**: Leverage native HTML/CSS capabilities before considering complex solutions
3. **Progressive Enhancement**: Start simple, add complexity only when necessary
4. **Maintenance Cost**: Consider long-term maintenance - simpler code is easier to debug and modify

### Example: Columnar Calculations (C02 Modules)

The UK National Curriculum requires "formal written methods of columnar addition and subtraction" for Years 3-5. Rather than implementing a complex interactive canvas or SVG solution, we use a **styled `<pre>` tag approach**:

```javascript
// Helper function returns simple HTML string
export function formatColumnar(num1, num2, operator) {
    const num1Padded = num1.toLocaleString().padStart(maxLen + 2, ' ');
    const num2Padded = num2.toLocaleString().padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">  ${num1Padded}
${operator} ${num2Padded}
${line}
  ?</pre>`;
}
```

**Benefits of this approach:**
- ✅ Uses monospace font for natural alignment
- ✅ Single CSS file for styling (`styles/columnar.css`)
- ✅ No JavaScript runtime overhead
- ✅ Works in all browsers, print-friendly
- ✅ Easy to maintain and modify
- ✅ Accessible and screen-reader friendly

**What we avoided:**
- ❌ Complex Canvas rendering requiring draw loops
- ❌ SVG generation requiring coordinate calculations
- ❌ Third-party libraries adding bundle size
- ❌ Interactive animations requiring state management

### Decision Framework

When implementing visual displays, ask:

1. **Can this be solved with HTML/CSS alone?** (e.g., styled text, flexbox, grid)
2. **Does this need to be interactive?** (e.g., number lines with draggable markers vs static displays)
3. **What's the effort-to-benefit ratio?** (hours to implement vs educational value added)
4. **Will this need frequent updates?** (simple solutions are easier to modify)

### Recommended Approaches by Complexity

**Low Overhead (Preferred):**
- Styled `<pre>` tags for formatted text (columnar calculations)
- CSS Grid/Flexbox for structured layouts (ten frames, base-10 blocks)
- Unicode characters for symbols (tally marks, arrows, dots)
- Simple HTML generation functions (no state, no lifecycle)

**Medium Overhead (When Justified):**
- Inline SVG for geometric shapes (number lines, bar models)
- Simple Canvas for pixel-perfect rendering (rare cases)
- Minimal JavaScript for interactivity (drag-and-drop if pedagogically valuable)

**High Overhead (Avoid Unless Critical):**
- Complex interactive visualizations requiring state management
- Third-party charting/graphing libraries
- Animations requiring requestAnimationFrame
- WebGL or advanced rendering techniques

### File Organization for Visual Helpers

Keep visual helpers organized and reusable:

```
src/generators/helpers/
├── columnarHelpers.js      # Columnar calculation formatting
├── numberLineHelpers.js    # Number line HTML generation
├── visualHelpers.js        # Shared visual utilities
└── ...
```

Each helper should:
- Export pure functions that return HTML strings or simple objects
- Include clear JSDoc comments with examples
- Avoid side effects and global state
- Be testable in isolation

### Example: Avoiding Over-Engineering

**❌ Over-engineered approach:**
```javascript
class ColumnarCalculationRenderer {
    constructor(config) { /* complex setup */ }
    setNumbers(a, b) { /* state management */ }
    render() { /* multi-step rendering */ }
    update() { /* DOM manipulation */ }
    destroy() { /* cleanup */ }
}
```

**✅ Simple approach:**
```javascript
export function formatColumnar(num1, num2, operator) {
    // Returns HTML string - done!
    return `<pre class="columnar-calc">...</pre>`;
}
```

### When to Increase Complexity

Add complexity **only when**:
- Simple solutions fail to meet curriculum requirements
- Interactivity is pedagogically essential (not just "nice to have")
- User testing shows students benefit significantly
- The feature is used across many modules (justify the investment)

**Remember**: The goal is effective mathematics practice, not impressive visual effects. A simple, working solution deployed today is better than a perfect solution still in development.
