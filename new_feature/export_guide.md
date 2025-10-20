# Lean Export Implementation Guide

## Philosophy: Data Over Presentation

Your question generator captures **structured data**, not HTML presentation. The server app will create polished, flexible question displays from this data.

## What Gets Exported

### ✅ Keep These
1. **Plain Text** (`questionText`)
   - Human-readable version
   - Enables full-text search
   - Good for debugging/review
   - ~50-100 chars per question

2. **Visual Type** (`visualType`)
   - How to render: `columnar_calculation`, `plain_text`, etc.
   - Tells server which component to use
   - ~15-30 chars per question

3. **Structured Data** (`questionData`)
   - Numbers, operators, sequences
   - Everything needed to reconstruct
   - Original text kept as reference
   - ~100-300 chars per question

4. **Generator Parameters** (`generatorParameters`)
   - Critical for reproducibility
   - Understand question characteristics
   - Enable filtering and tuning

### ❌ Drop These
1. **Full HTML** (❌ No `questionHtml` field)
   - Redundant (reconstructable from data)
   - Locks you into generator styling
   - Server creates better versions
   - Savings: ~200-500 chars per columnar question

## Export Schema

```javascript
{
  // Identification
  "id": "C02_Y3_addition_1234567_abc123",
  "questionNumber": 1,
  
  // Curriculum metadata
  "moduleId": "C02_Y3_addition",
  "moduleName": "C02_Y3_addition: Written Methods",
  "moduleDescription": "Add numbers with up to 3 digits using formal written methods of columnar addition",
  "yearGroup": "Year 3",
  "strand": "Calculation",
  "substrand": "Addition and Subtraction - Written methods",
  "curriculumRef": "C2",
  
  // Difficulty
  "level": 2,
  "levelName": "Developing",
  "difficultyScore": 55,
  
  // Question content - DATA FOCUSED
  "questionType": "text_input",
  "questionText": "What is 234 + 567?",                    // ✅ Plain text
  "visualType": "columnar_calculation",                    // ✅ How to render
  "questionData": {                                        // ✅ Structured data
    "originalText": "<pre class='columnar-calc'>...</pre>",
    "type": "columnar",
    "numbers": [234, 567],
    "operator": "+",
    "showWork": false
  },
  
  // Answer data
  "correctAnswer": "801",
  "answerType": "numeric",
  "multipleChoiceOptions": null,
  "hint": null,
  
  // Generator context
  "generatorParameters": {
    "min_value": 100,
    "max_value": 1000,
    "operations": ["columnar_addition"],
    "carrying_required": true
  },
  
  // Searchability
  "tags": ["text_input", "columnar_calculation", "calculation", "year-3", "numbers-to-1000"],
  
  // Timestamps
  "generatedAt": "2025-01-15T10:30:00.000Z"
}
```

## Visual Type Enum

Your server app will have rendering components for each type:

| Visual Type | Generator Uses | Server Renders |
|-------------|----------------|----------------|
| `columnar_calculation` | `<pre>` tags | Polished React/Vue component |
| `short_division` | `<pre>` tags | Styled division layout |
| `long_division` | `<pre>` tags | Interactive division steps |
| `number_line` | HTML/SVG | Canvas or SVG component |
| `plain_text` | Plain text | Simple text display |
| `multiple_choice` | Standard | Button/radio interface |
| `formatted_text` | `<pre>` tags | Typography component |

## Question Data Structure by Type

### Columnar Calculations
```javascript
"questionData": {
  "type": "columnar",
  "numbers": [234, 567],
  "operator": "+",
  "showWork": false,
  "originalText": "<pre>...</pre>"  // Reference only
}
```

### Division
```javascript
"questionData": {
  "type": "division",
  "dividend": 144,
  "divisor": 12,
  "showRemainder": false,
  "originalText": "..."
}
```

### Sequences
```javascript
"questionData": {
  "type": "sequence",
  "sequence": [2, 4, 6, 8],
  "direction": "forwards",
  "stepSize": 2,
  "originalText": "..."
}
```

### Place Value
```javascript
"questionData": {
  "type": "place_value",
  "number": 3456,
  "operation": "identify_digit",
  "originalText": "..."
}
```

## Implementation Steps

### Step 1: Update `src/ui/app.js`

Copy ALL methods from the "Lean Export System" artifact into your App class.

**Replace these existing methods:**
- `exportToCsv()` → `exportToEnhancedCsv()`
- `exportToJson()` → `exportToEnhancedJson()`

**Add these new methods:**
- `detectVisualType()`
- `extractQuestionData()`
- `extractNumbersFromText()`
- `extractOperator()`
- `extractPlaceValueOperation()`
- `detectAnswerType()`
- `stripHtml()`
- `escapeCsv()`
- `calculateDifficultyScore()`
- `generateTags()`

### Step 2: Update `index.html`

Replace export buttons:
```html
<div class="export-buttons">
    <button id="exportJsonBtn" class="btn-secondary">
        📦 Export JSON
    </button>
    <button id="exportCsvBtn" class="btn-secondary">
        📊 Export CSV
    </button>
</div>
```

Update event listeners (in `attachEventListeners()` method):
```javascript
document.getElementById('exportJsonBtn').addEventListener('click', () => {
    this.exportToEnhancedJson();
});

document.getElementById('exportCsvBtn').addEventListener('click', () => {
    this.exportToEnhancedCsv();
});
```

### Step 3: Test Export

1. Generate questions for a module with columnar calculations (e.g., C02_Y3_addition)
2. Click "Export JSON"
3. Verify structure:
   - ✅ Has `questionText` (plain)
   - ✅ Has `visualType` (e.g., "columnar_calculation")
   - ✅ Has `questionData` with numbers, operator
   - ❌ No `questionHtml` field
4. Click "Export CSV"
5. Open in Excel - verify UTF-8 characters display correctly

## Using Exports in Your Server App

### Loading Questions
```javascript
// Load from JSON file
const response = await fetch('questions-2025-01-15.json');
const data = await response.json();
const questions = data.questions;

// Filter by curriculum
const year3Questions = questions.filter(q => q.yearGroup === 'Year 3');

// Filter by visual type
const columnarQuestions = questions.filter(q => q.visualType === 'columnar_calculation');

// Search plain text
const searchResults = questions.filter(q => 
  q.questionText.toLowerCase().includes('add')
);
```

### Rendering Questions
```javascript
function renderQuestion(question) {
  // Use visualType to select component
  switch(question.visualType) {
    case 'columnar_calculation':
      return renderColumnarCalculation(question.questionData);
      
    case 'plain_text':
      return `<p>${question.questionText}</p>`;
      
    case 'multiple_choice':
      return renderMultipleChoice(question);
      
    default:
      return `<p>${question.questionText}</p>`;
  }
}

function renderColumnarCalculation(data) {
  // Reconstruct from structured data
  const [num1, num2] = data.numbers;
  const operator = data.operator;
  
  // Create your polished component
  return `
    <div class="columnar-question">
      <div class="number">${num1.toLocaleString()}</div>
      <div class="operator-row">
        <span class="operator">${operator}</span>
        <span class="number">${num2.toLocaleString()}</span>
      </div>
      <div class="line"></div>
      <div class="answer-input">
        <input type="text" />
      </div>
    </div>
  `;
}
```

## Database Schema

```sql
CREATE TABLE questions (
  -- Identification
  id VARCHAR(255) PRIMARY KEY,
  question_number INT,
  
  -- Curriculum
  module_id VARCHAR(50) NOT NULL,
  module_name VARCHAR(255),
  module_description TEXT,
  year_group VARCHAR(50),
  strand VARCHAR(100),
  substrand VARCHAR(100),
  curriculum_ref VARCHAR(10),
  
  -- Difficulty
  level INT CHECK (level BETWEEN 1 AND 4),
  level_name VARCHAR(50),
  difficulty_score INT CHECK (difficulty_score BETWEEN 0 AND 100),
  
  -- Question content - DATA FOCUSED
  question_type VARCHAR(50),
  question_text TEXT NOT NULL,           -- Plain text for search
  visual_type VARCHAR(50) NOT NULL,      -- How to render
  question_data JSONB NOT NULL,          -- Structured data
  
  -- Answer data
  correct_answer TEXT NOT NULL,
  answer_type VARCHAR(50),
  multiple_choice_options JSONB,
  hint TEXT,
  multi_gap_answers JSONB,
  
  -- Generator context
  generator_parameters JSONB,
  
  -- Searchability
  tags JSONB,
  
  -- Timestamps
  generated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes
  INDEX idx_module (module_id),
  INDEX idx_year (year_group),
  INDEX idx_level (level),
  INDEX idx_visual_type (visual_type),
  INDEX idx_tags USING GIN (tags)
);

-- Full-text search on question_text
CREATE INDEX idx_question_text_search ON questions 
  USING GIN (to_tsvector('english', question_text));
```

## CSV Structure (Excel-Compatible)

```csv
ID,Question_Number,Module_ID,Year_Group,Question_Text,Visual_Type,Question_Data_JSON,Correct_Answer
C02_Y3_123,1,C02_Y3_addition,Year 3,"What is 234 + 567?",columnar_calculation,"{""type"":""columnar"",""numbers"":[234,567],""operator"":""+""}",801
```

## Benefits of This Approach

### For Question Generator
✅ Stays lean and focused  
✅ No presentation bloat  
✅ Fast exports  
✅ Maintainable codebase

### For Server App
✅ Full control over presentation  
✅ Can improve rendering anytime  
✅ Mobile-optimized components  
✅ Print-friendly versions  
✅ Accessible rendering  
✅ A/B test different layouts

### For Your Question Bank
✅ Searchable plain text  
✅ Structured data enables:
  - Question regeneration
  - Similarity matching
  - Difficulty analysis
  - Intelligent filtering
✅ Future-proof (change rendering without touching data)

## Migration Path

**Phase 1: Lean Exports (This Week)**
- ✅ Implement lean export methods
- ✅ Test with sample questions
- ✅ Generate initial question bank

**Phase 2: MVP with JSON (Week 1-2)**
- Build simple HTML/JS app
- Load questions from JSON file
- Render using visualType + questionData
- No database yet

**Phase 3: Polished Components (Week 2-3)**
- Create beautiful rendering components
- Mobile-responsive
- Accessible
- Print-friendly

**Phase 4: Database (Week 3-4)**
- Set up PostgreSQL/SQLite
- Import JSON questions
- Build search/filter API
- Connect frontend

**Phase 5: Production (Week 4+)**
- User accounts
- Progress tracking
- Analytics
- Recommendations

## Testing Checklist

### Export Testing
- ✅ Generate questions with columnar calculations
- ✅ Export to JSON
- ✅ Verify `questionData` has numbers, operator
- ✅ Verify NO `questionHtml` field
- ✅ Export to CSV
- ✅ Open in Excel - check encoding
- ✅ Verify JSON column readable

### Data Integrity
- ✅ All number values captured correctly
- ✅ Operators preserved
- ✅ Plain text matches original intent
- ✅ Visual type accurately detected
- ✅ Tags relevant and useful

### Server Rendering
- ✅ Can reconstruct question from data
- ✅ Rendering looks better than generator
- ✅ Mobile-responsive
- ✅ Accessible

## Example: Columnar Question Journey

### 1. Generator Creates
```javascript
{
  text: "<pre class='columnar-calc'>  234\n+ 567\n────\n  ?</pre>",
  type: "text_input",
  answer: "801"
}
```

### 2. Export Captures
```javascript
{
  questionText: "What is 234 + 567?",
  visualType: "columnar_calculation",
  questionData: {
    type: "columnar",
    numbers: [234, 567],
    operator: "+",
    originalText: "<pre>...</pre>"
  },
  correctAnswer: "801"
}
```

### 3. Server Renders
```jsx
<ColumnarCalculation
  num1={234}
  num2={567}
  operator="+"
  className="polished-columnar"
/>
```

### Result
✨ Beautiful, mobile-responsive, accessible columnar calculation component built from structured data, not dumped HTML.

## Summary

**What You're Building:**
- Lean generator → Rich data export → Polished server rendering

**What You're Avoiding:**
- Bloated generator → HTML dump → Rigid presentation

**Key Principle:**
- Capture **data**, not **presentation**
- Let the server create beautiful visuals from structured information
