# Step-by-Step Implementation Changes

## File Changes Required

### ✏️ File 1: `src/ui/app.js`

#### Change 1: Ensure MODULES Import (Top of File)

**Check if you have this at the top:**
```javascript
import { MODULES } from '../curriculum/parameters.js';
```

If not, add it.

---

#### Change 2: Replace Export Methods

**BEFORE (Delete these methods):**
```javascript
/**
 * Export questions to a CSV file
 */
exportToCsv() {
    const headers = ['Module ID', 'Module Name', 'Level', 'Question Number', 'Question Text', 'Answer', 'Options'];
    const rows = [];

    this.questions.forEach(levelGroup => {
        levelGroup.questions.forEach((q, qIdx) => {
            const row = [
                `"${levelGroup.moduleId}"`,
                `"${levelGroup.moduleName}"`,
                levelGroup.level,
                qIdx + 1,
                `"${q.text.replace(/"/g, '""')}"`,
                `"${q.answer}"`,
                `"${(q.options || []).join(',')}"`
            ];
            rows.push(row.join(','));
        });
    });

    const csvContent = `${headers.join(',')}\n${rows.join('\n')}`;
    this.downloadFile(csvContent, 'questions.csv', 'text/csv;charset=utf-8;');
}

/**
 * Export questions to a JSON file
 */
exportToJson() {
    const jsonData = this.questions.map(levelGroup => ({
        moduleId: levelGroup.moduleId,
        moduleName: levelGroup.moduleName,
        level: levelGroup.level,
        levelName: levelGroup.levelName,
        questions: levelGroup.questions.map(q => ({
            text: q.text,
            answer: q.answer,
            options: q.options || null,
            type: q.type
        }))
    }));

    const jsonContent = JSON.stringify(jsonData, null, 2);
    this.downloadFile(jsonContent, 'questions.json', 'application/json;charset=utf-8;');
}
```

**AFTER (Copy ALL methods from "Lean Export System" artifact):**

Paste these complete methods (shown in abbreviated form here, use full versions from artifact):
```javascript
exportToEnhancedJson() { ... }           // Full implementation from artifact
exportToEnhancedCsv() { ... }            // Full implementation from artifact
detectVisualType() { ... }               // Full implementation from artifact
extractQuestionData() { ... }            // Full implementation from artifact
extractNumbersFromText() { ... }         // Full implementation from artifact
extractOperator() { ... }                // Full implementation from artifact
extractPlaceValueOperation() { ... }     // Full implementation from artifact
detectAnswerType() { ... }               // Full implementation from artifact
stripHtml() { ... }                      // Full implementation from artifact
escapeCsv() { ... }                      // Full implementation from artifact
calculateDifficultyScore() { ... }       // Full implementation from artifact
generateTags() { ... }                   // Full implementation from artifact
```

**⚠️ Important:** Copy the FULL implementations from the "Lean Export System" artifact, not these abbreviated versions.

---

#### Change 3: Update Event Listeners

**BEFORE:**
```javascript
// Export buttons
document.getElementById('exportCsvBtn').addEventListener('click', () => {
    this.exportToCsv();
});

document.getElementById('exportJsonBtn').addEventListener('click', () => {
    this.exportToJson();
});
```

**AFTER:**
```javascript
// Export buttons
document.getElementById('exportCsvBtn').addEventListener('click', () => {
    this.exportToEnhancedCsv();  // ← Changed method name
});

document.getElementById('exportJsonBtn').addEventListener('click', () => {
    this.exportToEnhancedJson();  // ← Changed method name
});
```

---

### ✏️ File 2: `index.html` (Optional UI Improvement)

**BEFORE:**
```html
<button id="exportCsvBtn" class="btn-secondary">Export to CSV</button>
<button id="exportJsonBtn" class="btn-secondary">Export to JSON</button>
```

**AFTER (Optional - clearer labels):**
```html
<button id="exportJsonBtn" class="btn-secondary" title="Export with full metadata">
    📦 Export JSON
</button>
<button id="exportCsvBtn" class="btn-secondary" title="Export for Excel/Spreadsheets">
    📊 Export CSV
</button>
```

---

## Testing Your Changes

### Test 1: Basic Export
```bash
# 1. Open your app in browser
# 2. Generate questions for any module (e.g., C02_Y3_addition)
# 3. Click "Export JSON"
# 4. Open the downloaded file
```

**Expected JSON structure:**
```json
{
  "metadata": {
    "exportDate": "2025-01-15...",
    "version": "1.0",
    "questionCount": 40
  },
  "questions": [
    {
      "id": "...",
      "questionText": "What is 234 + 567?",
      "visualType": "columnar_calculation",
      "questionData": {
        "type": "columnar",
        "numbers": [234, 567],
        "operator": "+",
        "originalText": "<pre>...</pre>"
      },
      "correctAnswer": "801",
      "level": 2,
      "difficultyScore": 55,
      "tags": ["columnar_calculation", "year-3"]
    }
  ]
}
```

**✅ Checklist:**
- [ ] Has `metadata` object
- [ ] Has `questions` array
- [ ] Each question has `questionText` (plain text)
- [ ] Each question has `visualType`
- [ ] Each question has `questionData` object
- [ ] Does NOT have `questionHtml` field
- [ ] Has `generatorParameters`
- [ ] Has `tags` array

---

### Test 2: CSV Export
```bash
# 1. Click "Export CSV"
# 2. Open in Excel or Google Sheets
# 3. Verify data displays correctly
```

**Expected CSV columns:**
```
ID | Question_Number | Module_ID | Question_Text | Visual_Type | Question_Data_JSON | Correct_Answer
```

**✅ Checklist:**
- [ ] Opens correctly in Excel (no encoding issues)
- [ ] Question_Text shows plain text
- [ ] Visual_Type shows type (e.g., "columnar_calculation")
- [ ] Question_Data_JSON has structured data
- [ ] All special characters display correctly

---

### Test 3: Different Question Types

Generate and export these modules to test different visual types:

| Module | Expected Visual Type |
|--------|---------------------|
| C02_Y3_addition | `columnar_calculation` |
| N01_Y1_NPV | `plain_text` or `multiple_choice` |
| N04_Y1_NPV | `plain_text` |
| Any multiple choice | `multiple_choice` |

---

## Verification Script

Run this in browser console after exporting:

```javascript
// Load your exported JSON
fetch('questions-2025-01-15-1234567890.json')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Total questions:', data.metadata.questionCount);
    
    // Check for HTML field (should be NONE)
    const hasHtml = data.questions.some(q => 'questionHtml' in q);
    console.log(hasHtml ? '❌ ERROR: questionHtml found!' : '✅ No questionHtml field (correct)');
    
    // Check for required fields
    const hasVisualType = data.questions.every(q => q.visualType);
    console.log(hasVisualType ? '✅ All have visualType' : '❌ Missing visualType');
    
    const hasQuestionData = data.questions.every(q => q.questionData);
    console.log(hasQuestionData ? '✅ All have questionData' : '❌ Missing questionData');
    
    // Show visual type distribution
    const types = {};
    data.questions.forEach(q => {
      types[q.visualType] = (types[q.visualType] || 0) + 1;
    });
    console.log('📊 Visual types:', types);
    
    // Sample question data
    console.log('📝 Sample question:', data.questions[0]);
  });
```

---

## Common Issues & Solutions

### Issue 1: "MODULES is not defined"
**Solution:** Add import at top of `src/ui/app.js`:
```javascript
import { MODULES } from '../curriculum/parameters.js';
```

---

### Issue 2: "this.stripHtml is not a function"
**Solution:** Make sure you copied ALL helper methods from the artifact, not just the export methods.

---

### Issue 3: CSV opens with garbled characters in Excel
**Solution:** Verify the BOM character is present in `exportToEnhancedCsv()`:
```javascript
const BOM = '\uFEFF';
const csvContent = BOM + headers.join(',') + '\n' + rows.join('\n');
```

---

### Issue 4: questionData is always showing type "generic"
**Solution:** The detection logic might need tuning for your specific modules. Check:
- Does the question text contain expected patterns?
- Is the moduleId matching the expected format?

---

### Issue 5: visualType showing "plain_text" for columnar questions
**Solution:** Verify your columnar questions have the class name in the HTML:
```javascript
// Should be:
text: '<pre class="columnar-calc">...'

// Not:
text: '<pre>...'  // Missing class
```

---

## Code Size Impact

**Before:**
- `exportToCsv()`: ~20 lines
- `exportToJson()`: ~15 lines
- Total: ~35 lines

**After:**
- `exportToEnhancedCsv()`: ~60 lines
- `exportToEnhancedJson()`: ~70 lines
- Helper methods: ~120 lines
- Total: ~250 lines

**Worth it?** YES ✅
- Much richer data capture
- Future-proof exports
- Enables smart server features
- Only ~215 lines added for massive benefit

---

## Rollback Plan

If you need to revert:

1. Keep a backup of your current `src/ui/app.js`
2. Or use git to revert:
```bash
git checkout src/ui/app.js
```

---

## Success Criteria

Your implementation is successful when:

✅ Exports complete without errors  
✅ JSON validates (use jsonlint.com)  
✅ CSV opens correctly in Excel  
✅ No `questionHtml` field in exports  
✅ All questions have `visualType` and `questionData`  
✅ Plain text version is human-readable  
✅ Tags are relevant and useful  
✅ Difficulty scores make sense  

---

## Next Steps After Implementation

1. **Generate Full Question Bank**
   - Export all modules
   - Review data quality
   - Check for any missing fields

2. **Start Server App**
   - Create question loader
   - Build rendering components based on visualType
   - Test with exported questions

3. **Database Setup** (when ready)
   - Create schema from guide
   - Import JSON as seed data
   - Build API endpoints

---

## Summary

**Files to modify:** 1 (just `src/ui/app.js`)  
**Lines to change:** Replace 2 methods + update 2 event listeners  
**Lines to add:** ~250 lines of helper methods  
**Time required:** 15-20 minutes  
**Testing time:** 10-15 minutes  
**Total:** ~30 minutes to completion ✨
