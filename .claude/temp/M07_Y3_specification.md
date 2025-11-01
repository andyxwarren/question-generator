# M07_Y3_MEAS Generator Specification

## Curriculum Statement
"measure the perimeter of simple 2-D shapes"

## Module Details
- **Module ID**: M07_Y3_MEAS
- **Year Group**: Year 3
- **Strand**: Measurement
- **Substrand**: perimeter, area
- **Reference**: M7

## Learning Objectives
Students should be able to:
1. Understand perimeter as the distance around a shape
2. Add up side lengths to find the total perimeter
3. Measure perimeter of simple polygons (triangles, squares, rectangles, pentagons, hexagons)
4. Work with whole number measurements in cm and m

## Digital Adaptations
- Display shapes as ASCII art or simple text descriptions
- Provide all side lengths explicitly (no actual measuring required)
- Use text-based shape representations with labeled sides

## Proposed Operations (3-5 distinct types)

### Operation 1: Rectangle Perimeter
Calculate the perimeter of a rectangle given length and width.
- Text: "A rectangle has a length of [L] cm and a width of [W] cm. What is its perimeter?"
- Answer: 2(L + W)
- Pedagogical value: Introduces perimeter concept with most familiar shape

### Operation 2: Square Perimeter
Calculate the perimeter of a square given one side length.
- Text: "A square has sides of length [S] cm. What is its perimeter?"
- Answer: 4S
- Pedagogical value: Builds understanding that all sides equal in a square

### Operation 3: Triangle Perimeter
Calculate the perimeter of a triangle given three side lengths.
- Text: "A triangle has sides of length [A] cm, [B] cm, and [C] cm. What is its perimeter?"
- Answer: A + B + C
- Pedagogical value: Practice adding three numbers, irregular shapes

### Operation 4: Simple Polygon Perimeter
Calculate the perimeter of a pentagon or hexagon with all sides given.
- Text: "A pentagon has sides of length [a] cm, [b] cm, [c] cm, [d] cm, and [e] cm. What is its perimeter?"
- Answer: a + b + c + d + e
- Pedagogical value: Extends to more complex shapes, longer addition

### Operation 5: Missing Side Length
Given the perimeter and some side lengths, find the missing side.
- Text: "A rectangle has a perimeter of [P] cm. One length is [L] cm and one width is [W] cm. What is the other length?"
- Answer: P - L - 2W (or equivalent)
- Pedagogical value: Reverse problem-solving, understanding perimeter formula

## Parameter Progression (4 Levels)

### Level 1 (Beginning)
- Shapes: rectangle, square only
- Operations: ['rectangle_perimeter', 'square_perimeter']
- Side lengths: 1-10 cm
- Units: cm only
- Numbers: Small, easy to add mentally

### Level 2 (Developing)
- Shapes: rectangle, square, triangle
- Operations: ['rectangle_perimeter', 'square_perimeter', 'triangle_perimeter']
- Side lengths: 5-20 cm
- Units: cm and m (smaller numbers for m)
- Numbers: Require written addition

### Level 3 (Meeting)
- Shapes: rectangle, square, triangle, pentagon
- Operations: ['rectangle_perimeter', 'square_perimeter', 'triangle_perimeter', 'polygon_perimeter']
- Side lengths: 10-50 cm, 1-10 m
- Units: cm and m
- Numbers: Mix of easy and harder calculations

### Level 4 (Exceeding)
- Shapes: all types including hexagons
- Operations: ['rectangle_perimeter', 'square_perimeter', 'triangle_perimeter', 'polygon_perimeter', 'missing_side']
- Side lengths: 10-100 cm, 1-20 m
- Units: cm and m
- Numbers: Larger, multi-step problems

## Question Type
- Primary: `text_input`
- Secondary: `multiple_choice` (for variety)

## Answer Format
- Always return answer as string
- Include units in the answer validation (e.g., "24 cm" or just "24")
- For this level, accept numeric answers and validate with unit tolerance

## Edge Cases to Handle
- Ensure all side lengths are positive integers
- Perimeter calculations don't overflow reasonable bounds
- For missing side problems, ensure the missing side is positive
- Triangle inequality for triangles (sum of two sides > third side)

## Helper Functions Needed
None required - straightforward calculations

## Notes
- Keep questions clear and unambiguous
- Use age-appropriate vocabulary (Year 3 = ages 7-8)
- Ensure all answers are mathematically correct
- Provide helpful hints for text_input questions
