# Agent System Documentation

## TLDR: Quick Reference

You have **4 specialized agents** that work together to create curriculum modules:

| Agent | Use When... | Output |
|-------|-------------|--------|
| **`parameter-designer`** | You need to design difficulty progression | JSON with 4-level parameters |
| **`question-designer`** | You need to design question templates | Question template design document |
| **`module-validator`** | You need to validate a module design | Validation report (APPROVED/REJECTED) |
| **`module-creator`** | You want to add a complete module | Working module integrated in app |

**Most Common Use**: Call `module-creator` - it automatically calls the other 3 agents and implements the code.

**Agents are auto-registered** - they're located in `.claude/agents/` and Claude Code automatically finds them. No manual setup needed!

---

## Agent Overview

### 1. Parameter Designer
**File**: `.claude/agents/parameter-designer.md`
**Name**: `parameter-designer`

**What It Does**: Designs the mathematical "settings" that control question difficulty

**Input Example**:
```
"Design parameters for Year 4 multiplication tables (3, 4, 8)"
```

**Output Example**:
```json
{
  "module_id_suggestion": "C01_Y4_MULT",
  "split_recommendation": false,
  "parameters": {
    "1": { "tables": [3, 4], "max_product": 40 },
    "2": { "tables": [3, 4, 8], "max_product": 80 },
    "3": { "tables": [3, 4, 8], "max_product": 100 },
    "4": { "tables": [3, 4, 8], "max_product": 120 }
  }
}
```

**Special Features**:
- Detects when objectives need splitting into multiple modules
- Handles Year 5+ negative numbers (uses `powers_of_10` instead of `step_sizes`)
- Comprehensive parameter catalog for all curriculum strands

**When to Call Standalone**:
- "Design parameters for Year 3 fractions"
- "What ranges should Year 5 negative numbers use?"
- "Should this objective be split into 2 modules?"

---

### 2. Question Designer
**File**: `.claude/agents/question-designer.md`
**Name**: `question-designer`

**What It Does**: Designs how to present questions to students (phrasing, format, visual display)

**Input Example**:
```
Parameters: { step_sizes: [2, 5, 10], min: 0, max: 100 }
Objective: "Count in multiples of 2, 5, and 10"
```

**Output Example**:
```markdown
Visual Strategy: Simple text with inline formatting
Template: "Count forwards in ${step_size}s from ${start}. What comes next after ${last}?"
Input Type: text_input
Hint: "Think: what number is ${step_size} more than ${last}?"

Level 1: "Count forwards in 2s from 0. What comes next after 8?" → 10
Level 4: "Count forwards in 50s from 150. What comes next after 600?" → 650
```

**Key Philosophy**: **90/10 Rule** - Deliver 90% of value with 10% of complexity

**Visual Solutions Preference**:
- ✅ Styled `<pre>` tags for columnar calculations
- ✅ CSS Grid/Flexbox for structured layouts
- ✅ Unicode characters for symbols
- ❌ Avoid Canvas unless absolutely necessary
- ❌ Avoid complex SVG or third-party libraries

**When to Call Standalone**:
- "How should I display columnar addition digitally?"
- "My fraction questions are confusing - make them clearer"
- "Design question templates for this module"

---

### 3. Module Validator
**File**: `.claude/agents/module-validator.md`
**Name**: `module-validator`

**What It Does**: Quality gatekeeper - ensures modules meet UK National Curriculum standards

**Input Formats**:
- **Format A (Design Stage)**: Parameter JSON + question templates (before code)
- **Format B (Implementation Stage)**: Actual code in parameters.js, generators/ (after code)

**Validation Decisions**:
- ✅ **APPROVED** - Ready to implement or ready for production
- ⚠️ **APPROVED WITH RESERVATIONS** - OK but has minor issues
- ❌ **REJECT - PARAMETERS** - Math logic is flawed
- ❌ **REJECT - TEMPLATES** - Questions are confusing/over-engineered
- ❌ **UNSUITABLE** - Cannot be done digitally

**Validation Checks**:
- Curriculum alignment (does it match the UK National Curriculum statement?)
- Age-appropriateness (suitable for the year group?)
- Progressive difficulty (clear progression across 4 levels?)
- Question clarity (unambiguous wording?)
- Digital suitability (can it be done without physical objects?)

**When to Call Standalone**:
- "Validate these Year 4 fraction parameters before I code them"
- "Is the Year 3 counting module age-appropriate?"
- "Review my implemented generator for curriculum alignment"

---

### 4. Module Creator (Orchestrator)
**File**: `.claude/agents/module-creator.md`
**Name**: `module-creator`

**What It Does**: Complete end-to-end module creation - orchestrates the other 3 agents + implements code

**The 5-Stage Workflow**:

```
Stage 1: Parameter Design
    ↓ Calls parameter-designer
    ↓ Receives JSON

Stage 2: Question Design
    ↓ Calls question-designer
    ↓ Receives template document

Stage 3: Validation (up to 3 iterations)
    ↓ Calls module-validator
    ↓ If REJECT-PARAMETERS → back to Stage 1
    ↓ If REJECT-TEMPLATES → back to Stage 2
    ↓ If APPROVED → continue

Stage 4: Code Implementation
    ↓ Orchestrator writes code itself:
    ↓ - Add parameters to src/curriculum/parameters.js
    ↓ - Create generator in src/generators/
    ↓ - Register in src/core/questionEngine.js

Stage 5: Report
    ✓ Provide testing instructions
    ✓ Confirm module ready
```

**Special Features**:
- 🔄 **Iteration Loops**: Retries up to 3 times if validation fails
- ✂️ **Split Detection**: Creates multiple modules if needed
- 🛡️ **Quality Gate**: Won't implement until validated

**When to Call**:
- "Add a module for Year 3 fractions - comparing unit fractions"
- "Create multiplication tables practice for Year 4"
- "Implement the Year 5 negative numbers objective"

---

## How Agents Are Registered

**Good news: Agents are auto-registered!** 🎉

### How It Works

1. **File Location**: Agents are stored in `.claude/agents/`
2. **Auto-Discovery**: Claude Code automatically discovers any `.md` file in this folder
3. **Name from Frontmatter**: The `name:` field in the YAML frontmatter is used as the agent name

**Example Agent File Structure**:
```markdown
---
name: parameter-designer
description: Design mathematical parameters...
model: sonnet
---

[Agent content here]
```

**Verification**: To see registered agents:
```bash
ls -la .claude/agents/
```

You should see:
- `parameter-designer.md`
- `question-designer.md`
- `module-validator.md`
- `module-creator.md`

### No Manual Setup Required!

✅ Agents are automatically available after file creation
✅ No registration code needed
✅ No configuration files to update
✅ Just create/edit files in `.claude/agents/`

---

## Usage Examples

### Example 1: Add a Complete Module
**Goal**: Add a new Year 4 fractions module

**Command**:
```
"Add a module for Year 4: recognizing equivalent fractions"
```

**What Happens**:
- Claude Code calls `module-creator` agent
- Stage 1: Designs parameters (denominators, fraction types, etc.)
- Stage 2: Designs question templates ("Are 1/2 and 2/4 equivalent?")
- Stage 3: Validates design → ✅ APPROVED
- Stage 4: Implements code in parameters.js, generators/, questionEngine.js
- Stage 5: Reports "Module F02_Y4_FRAC ready for testing"

**Result**: Fully working module integrated into the app

---

### Example 2: Design Parameters Only
**Goal**: Design parameters without implementing code yet

**Command**:
```
"Design parameters for Year 5 counting with negative numbers"
```

**What Happens**:
- Claude Code calls `parameter-designer` agent directly
- Outputs JSON with parameters for all 4 levels
- Uses `powers_of_10` (Year 5+ requirement)
- Includes `allow_negatives: true`

**Result**: JSON parameter specification you can review before implementation

---

### Example 3: Validate Existing Module
**Goal**: Check if an existing module meets standards

**Command**:
```
"Validate the Year 3 counting module for curriculum alignment"
```

**What Happens**:
- Claude Code calls `module-validator` agent directly
- Reviews parameters in parameters.js
- Examines generator code in src/generators/
- Checks curriculum alignment, age-appropriateness, difficulty progression

**Result**: Validation report with specific feedback and approval status

---

## Agent Workflow Diagrams

### Standalone Agent Calls
```
User → parameter-designer → JSON parameters
User → question-designer → Template document
User → module-validator → Validation report
```

### Full Module Creation (module-creator)
```
User → module-creator
         ├─→ parameter-designer → JSON
         ├─→ question-designer → Templates
         ├─→ module-validator → Approval (with iteration loop)
         ├─→ [Code Implementation] → parameters.js, generators/, questionEngine.js
         └─→ Report to user
```

---

## Troubleshooting

### "Agent not found"
**Cause**: Agent file doesn't exist or has wrong name in frontmatter
**Fix**:
1. Check `.claude/agents/` folder exists
2. Verify filename matches (e.g., `parameter-designer.md`)
3. Check `name:` field in frontmatter matches

### "Agent failing to execute"
**Cause**: Agent prompt might have errors or Claude Code issue
**Fix**:
1. Check agent file for syntax errors
2. Review agent frontmatter YAML
3. Try calling agent with simpler input

### "Which agent should I use?"
**Decision Tree**:
- Want complete module? → `module-creator`
- Only need parameters? → `parameter-designer`
- Only need question templates? → `question-designer`
- Want to validate existing? → `module-validator`

---

## Agent Development

### Creating New Agents

1. Create `.md` file in `.claude/agents/`
2. Add YAML frontmatter with `name:`, `description:`, `model:`
3. Write agent prompt with clear responsibilities
4. Agent is automatically available!

**Example**:
```markdown
---
name: my-new-agent
description: What this agent does
model: sonnet
---

You are an expert in [domain]. Your role is to [responsibility].

## Your Process
1. Step 1
2. Step 2
...
```

### Best Practices

✅ **Single Responsibility**: Each agent should have ONE clear job
✅ **Clear Inputs/Outputs**: Specify what agent receives and returns
✅ **TLDR Section**: Add TLDR at top for quick reference
✅ **Examples**: Include usage examples in the prompt
✅ **Self-Contained**: Agent should work standalone and as part of workflows

---

## Summary

**4 Focused Agents**:
1. **parameter-designer** - Math logic & difficulty
2. **question-designer** - Pedagogy & UX
3. **module-validator** - Quality gatekeeper
4. **module-creator** - Orchestrates all + implements code

**Auto-Registered**: Just place `.md` files in `.claude/agents/` - no setup needed!

**Most Common Use**: Call `module-creator` for end-to-end module creation

**Questions?** Each agent has detailed documentation in its own file with TLDR sections.
