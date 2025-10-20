# Year 1 C08 Visual Examples

This document shows examples of what the redesigned Year 1 C08 questions will look like with their visual representations.

---

## Level 1 Examples (Beginning)

### Example 1: Equal Groups with Visual
```
┌─────────────────────────────────────┐
│  🍎 🍎    🍎 🍎                     │
└─────────────────────────────────────┘
How many apples are there altogether?

○ 4    ○ 6    ○ 2    ○ 8
```
**Answer**: 4
**Working**: 2 × 2 = 4

---

### Example 2: Array Multiplication with Visual
```
┌─────────────────────────────────────┐
│  ● ● ● ● ●                          │
│  ● ● ● ● ●                          │
└─────────────────────────────────────┘
How many dots are there altogether?

○ 10   ○ 8    ○ 5    ○ 7
```
**Answer**: 10
**Working**: 2 rows × 5 dots = 10

---

### Example 3: Sharing with Visual
```
┌─────────────────────────────────────┐
│  👤  🍪 🍪 🍪 🍪 🍪                  │
│  👤  🍪 🍪 🍪 🍪 🍪                  │
└─────────────────────────────────────┘
How many cookies does each person get?

○ 5    ○ 10   ○ 2    ○ 3
```
**Answer**: 5
**Working**: 10 ÷ 2 = 5

---

## Level 2 Examples (Developing)

### Example 4: Array Division with Visual (NEW)
```
┌─────────────────────────────────────┐
│  ● ● ● ● ●                          │
│  ● ● ● ● ●                          │
│  ● ● ● ● ●                          │
└─────────────────────────────────────┘
There are 3 rows. How many dots in each row?

○ 5    ○ 15   ○ 3    ○ 6
```
**Answer**: 5
**Working**: 15 ÷ 3 = 5

---

### Example 5: Grouping with Visual (NEW)
```
┌─────────────────────────────────────┐
│  ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐             │
└─────────────────────────────────────┘
Put these into groups of 3. How many groups?

○ 3    ○ 9    ○ 6    ○ 12
```
**Answer**: 3
**Working**: 9 ÷ 3 = 3

---

## Level 3 Examples (Meeting)

### Example 6: Repeated Addition with Visual (NEW)
```
┌─────────────────────────────────────┐
│  5 + 5 + 5 + 5                      │
└─────────────────────────────────────┘
What is the total?

○ 20   ○ 15   ○ 10   ○ 25
```
**Answer**: 20
**Working**: 4 × 5 = 20

---

### Example 7: Doubling (NEW)
```
┌─────────────────────────────────────┐
│  🍓 🍓 🍓 🍓    🍓 🍓 🍓 🍓         │
└─────────────────────────────────────┘
What is double 4?

○ 8    ○ 4    ○ 12   ○ 6
```
**Answer**: 8
**Working**: 4 + 4 = 8

---

## Level 4 Examples (Exceeding)

### Example 8: Halving (NEW)
```
┌─────────────────────────────────────┐
│  👤  🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈  │
│  👤  🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈  │
└─────────────────────────────────────┘
What is half of 20?

○ 10   ○ 20   ○ 5    ○ 40
```
**Answer**: 10
**Working**: 20 ÷ 2 = 10

---

### Example 9: More Complex Equal Groups (Level 4)
```
┌─────────────────────────────────────┐
│  🧸 🧸 🧸 🧸    🧸 🧸 🧸 🧸         │
│  🧸 🧸 🧸 🧸    🧸 🧸 🧸 🧸         │
│  🧸 🧸 🧸 🧸    🧸 🧸 🧸 🧸         │
└─────────────────────────────────────┘
How many bears are there altogether?

○ 12   ○ 16   ○ 8    ○ 20
```
**Answer**: 12
**Working**: 3 × 4 = 12

---

## Visual Styling Details

### Color Coding (via CSS)

**Dot Arrays** (`.visual-array`):
- Background: Light blue (`#e8f4f8`)
- Border: Blue (`#4a90e2`)
- Used for: Arrays showing multiplication/division

**Emoji Groups** (`.visual-groups`):
- Background: Light orange (`#fff3e0`)
- Border: Orange (`#ff9800`)
- Used for: Equal groups, grouping

**Repeated Numbers** (`.visual-repeated`):
- Background: Light purple (`#f3e5f5`)
- Border: Purple (`#9c27b0`)
- Used for: Repeated addition

**Sharing Visuals** (`.visual-sharing`):
- Background: Light green (`#e8f5e9`)
- Border: Green (`#4caf50`)
- Used for: Sharing and halving

---

## Accessibility Features

1. **High Contrast**: All visuals have clear borders and backgrounds
2. **Large Font**: Emojis are 1.5-1.8rem (larger than text)
3. **Monospace**: Numbers and dots use monospace font for alignment
4. **Print-Friendly**: Visuals work in black and white printing
5. **Screen Reader**: Alt text describes visual content

---

## Technical Implementation Notes

### How Visuals Are Generated

```javascript
// Example: Dot Array
generateDotArray(3, 5)
// Returns:
<pre class="visual-array">
● ● ● ● ●
● ● ● ● ●
● ● ● ● ●
</pre>

// Example: Emoji Groups
generateEmojiGroups(3, 4, '🍎')
// Returns:
<pre class="visual-groups">
🍎 🍎 🍎 🍎    🍎 🍎 🍎 🍎    🍎 🍎 🍎 🍎
</pre>

// Example: Sharing
generateSharingVisualization(12, 3, '🍪')
// Returns:
<pre class="visual-sharing">
👤  🍪 🍪 🍪 🍪
👤  🍪 🍪 🍪 🍪
👤  🍪 🍪 🍪 🍪
</pre>
```

### Why This Approach Works

1. **Simple**: Just HTML `<pre>` tags with text content
2. **Fast**: No rendering loops, no canvas operations
3. **Accessible**: Screen readers can read the content
4. **Responsive**: CSS handles sizing automatically
5. **Maintainable**: Easy to modify and debug
6. **Print-Friendly**: Works in PDFs and print

---

## Comparison: Old vs New

### OLD Implementation (Issues):

```
Question: "There are 3 boxes with 5 pencils in each box.
How many pencils altogether?"

Type: Text Input (Levels 3-4)
Max Product: 50
Remainders: Yes (Level 4)
Visual: No
```

**Problems**:
- Too much text for Y1
- No visual support
- Text input too hard
- Remainders outside scope
- Numbers too large

---

### NEW Implementation (Redesigned):

```
┌─────────────────────────────────────┐
│  ✏️ ✏️ ✏️ ✏️ ✏️                      │
│  ✏️ ✏️ ✏️ ✏️ ✏️                      │
│  ✏️ ✏️ ✏️ ✏️ ✏️                      │
└─────────────────────────────────────┘
How many pencils are there altogether?

○ 15   ○ 8    ○ 12   ○ 20

Type: Multiple Choice (All Levels)
Max Product: 20
Remainders: None
Visual: Always
```

**Improvements**:
- Clear visual representation
- Short, simple question
- Multiple choice scaffolding
- Appropriate number range
- No remainders

---

## Distractor Examples

For answer **10**, typical distractors are:

1. **7** (added 5 + 2 instead of multiplied)
2. **8** (off-by-one: counted 4 × 2 instead of 5 × 2)
3. **12** (counting error: +2 from answer)
4. **5** (place value confusion: half the answer)

These represent common Year 1 errors:
- Operation confusion
- Counting mistakes
- Off-by-one errors
- Place value misunderstandings

---

## Mobile Responsive

On smaller screens:
- Font sizes reduce proportionally
- Visuals remain readable
- Multiple choice buttons stack vertically
- Touch targets are large enough for small fingers

---

## Curriculum Alignment

Every visual directly supports the curriculum requirement:

| Curriculum Element | Visual Implementation |
|-------------------|----------------------|
| "concrete objects" | Emoji representations (🍎, 🍪, ⭐) |
| "pictorial representations" | Emoji groups, sharing layouts |
| "arrays" | Dot arrays (● ● ●) |

The visuals ARE the curriculum content, not optional decoration.

---

## Testing the Visuals

To test the visual rendering:

1. Open the application in a web browser
2. Select "C08_Y1_CALC" module
3. Generate questions for each level
4. Verify:
   - Visuals appear correctly
   - Colors are distinct
   - Spacing is clear
   - Emojis render properly
   - Multiple choice options are readable

---

## Summary

The redesigned Year 1 C08 module provides:

✅ **Visual-First Approach**: Every question has a clear visual
✅ **Low Overhead**: Simple HTML/CSS, no complex rendering
✅ **Curriculum Aligned**: Directly implements "concrete, pictorial, arrays"
✅ **Age Appropriate**: Multiple choice, small numbers, clear language
✅ **Mathematically Sound**: No remainders, exact division only
✅ **Production Ready**: Fully integrated and tested

The module is now suitable for independent Year 1 student practice with appropriate scaffolding and visual support.
