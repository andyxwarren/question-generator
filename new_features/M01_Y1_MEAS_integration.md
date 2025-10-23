# M01_Y1_MEAS Integration Instructions

## Files Created

1. **Helper Functions:** `src/generators/helpers/M01_measurementHelpers.js`
   - Measurement object database (length, height, mass, capacity objects with relative sizes)
   - Comparison vocabulary for all measure types
   - Helper functions for generating each operation type
   - Reusable across all M01 year groups (Y1-Y4)

2. **Generator:** `src/generators/M01_Y1_MEAS_comparison.js`
   - Main generator function for Year 1 measurement comparison
   - Uses operation-based generation pattern
   - Returns properly formatted question objects

3. **Parameters:** Module parameters to add to `src/curriculum/parameters.js`

## Integration Steps

### Step 1: Copy Helper Functions
```bash
cp /home/claude/helpers/M01_measurementHelpers.js src/generators/helpers/
```

### Step 2: Copy Generator
```bash
cp /home/claude/M01_Y1_MEAS_comparison.js src/generators/
```

### Step 3: Add Parameters to `src/curriculum/parameters.js`

Add this export at the appropriate location in the parameters file:

```javascript
export const M01_Y1_MEAS = {
    id: 'M01_Y1_MEAS',
    name: 'Compare and Order Measures',
    description: 'Compare, describe and solve practical problems for lengths, heights, mass, capacity and time',
    icon: '📏',
    yearGroup: 'Year 1',
    strand: 'Measurement',
    parameters: {
        1: {
            measure_types: ['length', 'height'],
            operations: ['direct_comparison', 'complete_statement']
        },
        2: {
            measure_types: ['length', 'height', 'mass'],
            operations: ['direct_comparison', 'complete_statement', 'ordering']
        },
        3: {
            measure_types: ['length', 'height', 'mass', 'capacity'],
            operations: ['direct_comparison', 'complete_statement', 'ordering', 'practical_problem']
        },
        4: {
            measure_types: ['length', 'height', 'mass', 'capacity'],
            operations: ['direct_comparison', 'complete_statement', 'ordering', 'practical_problem']
        }
    }
};
```

### Step 4: Register Generator in `src/core/questionEngine.js`

Add import at the top:
```javascript
import M01_Y1_MEAS_generator from '../generators/M01_Y1_MEAS_comparison.js';
```

Register in `registerDefaultGenerators()`:
```javascript
registerDefaultGenerators() {
    // ... existing registrations
    this.register(M01_Y1_MEAS_generator);
}
```

## Testing Recommendations

### Manual Testing
1. Select "Year 1" and "Compare and Order Measures" module
2. Test each difficulty level (1-4)
3. Verify:
   - Level 1: Only length/height with simple operations
   - Level 2: Adds mass and ordering
   - Level 3: All measure types and operations
   - Level 4: Same coverage as Level 3

### Validation Checks
- [ ] Questions are age-appropriate for 5-6 year olds
- [ ] Vocabulary matches curriculum examples
- [ ] All measure types covered (length, height, mass, capacity)
- [ ] Objects are familiar to Year 1 students
- [ ] Text input accepts correct comparative words
- [ ] Multiple choice options are distinct and plausible

### Edge Cases to Test
- [ ] Very different size comparisons (e.g., paperclip vs bus)
- [ ] Similar size comparisons (e.g., car vs bicycle)
- [ ] Different measure types in sequence
- [ ] All operation types appear
- [ ] Ordering questions work for "first" and "last" positions

## Sample Questions by Level

**Level 1 (Beginning):**
- "Which is longer: a pencil or a bus?"
- "A door is ___ than a book." (Answer: taller)

**Level 2 (Developing):**
- "Put these in order from lightest to heaviest: feather, book, car. Which comes FIRST?"
- "Which is heavier: an apple or a car?"

**Level 3 (Meeting):**
- "The jug holds more than the cup. Which can hold more water?"
- "A bucket is ___ than a spoon." (Answer: more)

**Level 4 (Exceeding):**
- Same operations as Level 3, with varied scenarios and contexts

## Notes

- Helper functions are reusable for Years 2-4 M01 modules
- Object database can be extended with more items
- Practical problems use simple real-world contexts
- Text input accepts variations (e.g., "longer", "more", "fuller" for capacity)
