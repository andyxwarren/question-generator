# Request for M03_Y1_MEAS Generator

## Module Details
- **Module ID**: M03_Y1_MEAS
- **Year Group**: Year 1 (ages 5-6)
- **Strand**: Measurement
- **Substrand**: money
- **Reference**: M3
- **Curriculum Statement**: "recognise and know the value of different denominations of coins and notes"

## UK Currency Context
- **Coins**: 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), £2 (200p)
- **Notes**: £5, £10, £20, £50
- **Conversion**: 100p = £1

## Digital Implementation Requirements

For Year 1 (ages 5-6), focus on:
1. **Recognition**: Identifying coins/notes by value
2. **Value knowledge**: Understanding what each denomination is worth
3. **Simple identification**: Not complex combinations yet

## Suggested Operations (3-5 distinct types)

Consider operations like:
- Identify coin/note by description (e.g., "Which coin is worth 10p?")
- State the value of a named coin/note (e.g., "How much is a 2p coin worth?")
- Select the correct coin/note for a value
- Recognize coins/notes by their value in pence

## Level Progression Guidance

**Level 1 (Beginning)**:
- Focus on the most common small coins: 1p, 2p, 5p, 10p
- Simple recognition questions
- One denomination at a time

**Level 2 (Developing)**:
- Add 20p, 50p coins
- Mix of common coins
- Begin comparing values

**Level 3 (Meeting)**:
- Include all coins (1p, 2p, 5p, 10p, 20p, 50p, £1, £2)
- Full curriculum coverage
- More variety in question types

**Level 4 (Exceeding)**:
- Add notes (£5, £10)
- All denominations
- Most challenging recognition tasks

## Question Types
- **multiple_choice**: "Which coin is worth 5p?" with options [1p, 2p, 5p, 10p]
- **text_input**: "How many pence is a 10p coin worth?" answer: "10"

## Parameter Pattern

Suggested structure:
```javascript
parameters: {
    1: {
        operations: ['identify_coin', 'state_value'],
        denominations: [1, 2, 5, 10], // in pence
        include_notes: false
    },
    2: {
        operations: ['identify_coin', 'state_value', 'select_for_value'],
        denominations: [1, 2, 5, 10, 20, 50],
        include_notes: false
    },
    3: {
        operations: ['identify_coin', 'state_value', 'select_for_value', 'compare_values'],
        denominations: [1, 2, 5, 10, 20, 50, 100, 200], // £1 = 100p, £2 = 200p
        include_notes: false
    },
    4: {
        operations: ['identify_coin', 'state_value', 'select_for_value', 'compare_values', 'identify_note'],
        denominations: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000], // £5 = 500p, £10 = 1000p
        include_notes: true
    }
}
```

## Visual Considerations

Following CLAUDE.md philosophy of low-overhead solutions:
- Use text descriptions rather than actual coin images
- Use simple HTML formatting for currency symbols (£, p)
- No complex graphics needed for Year 1 recognition

## Mathematical Correctness

Ensure:
- Coin values are accurate
- £1 = 100p conversion is correct
- Multiple choice distractors are plausible denominations
- Questions are unambiguous (don't ask "Which is bigger?" without context)

## Year 1 Specific Considerations

- Keep language simple and clear
- Questions should be direct and concrete
- Avoid abstract concepts
- Focus on recognition and identification, not calculation
- No addition/combination of coins (that's Year 2)
