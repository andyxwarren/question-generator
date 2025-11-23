# Archived Agents

This folder contains agents that are no longer used but are preserved for reference.

## curriculum-generator-creator.md

**Archived**: 2025-01-22
**Reason**: Responsibilities split into focused, specialized agents

### Why This Agent Was Archived

The original `curriculum-generator-creator` agent attempted to handle too many responsibilities simultaneously:
- Curriculum analysis
- Parameter design (mathematical logic)
- Question template design (pedagogy/UX)
- Code generation
- Integration instructions

This created a "jack of all trades, master of none" problem where the agent couldn't excel at any single responsibility.

### How Responsibilities Were Redistributed

The agent's responsibilities are now handled by a coordinated team of focused specialists:

1. **Parameter Design** → `ks-curriculum-parameter-designer.md`
   - Mathematical logic and difficulty progression
   - 4-level parameter design
   - Split detection for complex objectives
   - Output: JSON parameter specifications

2. **Question Design** → `question-template-designer.md`
   - Pedagogical question phrasing
   - Digital UX and interaction design
   - Low-overhead visual strategies
   - Output: Question template design documents

3. **Validation** → `curriculum-question-validator.md` (enhanced)
   - Curriculum alignment verification
   - Quality assurance gatekeeper
   - Validates BEFORE code is written
   - Output: Approval/rejection decisions with specific feedback

4. **Code Implementation** → `module-implementation-orchestrator.md` (enhanced)
   - Orchestrates the 3 specialists above
   - Implements actual code when design is approved
   - Manages iteration loops and split modules
   - Output: Working, integrated curriculum modules

### Benefits of the New Architecture

✅ **Separation of Concerns**: Each agent has one clear responsibility
✅ **Higher Quality**: Specialists excel in their domain
✅ **Better Feedback Loops**: Validator can reject specific components (parameters OR templates)
✅ **Easier Maintenance**: Changes to one responsibility don't affect others
✅ **Standalone Use**: Each specialist can be called individually when needed
✅ **Clearer Workflow**: 5-stage process is transparent and trackable

### Migration Note

If you have old prompts or documentation referencing `curriculum-generator-creator`, update them to use the orchestrator:

**Old approach:**
```
Use curriculum-generator-creator to build the module
```

**New approach:**
```
Use module-implementation-orchestrator to coordinate parameter design,
question design, validation, and implementation
```

For standalone tasks:
- "Design parameters for X" → Use `ks-curriculum-parameter-designer` directly
- "Design questions for X" → Use `question-template-designer` directly
- "Review module X" → Use `curriculum-question-validator` directly
