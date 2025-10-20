# Which Artifacts to Use - Quick Reference

## ✅ USE THESE ARTIFACTS

### 1. **Lean Export System** (lean_export_schema)
**File:** `src/ui/app.js`

**What it contains:**
- `exportToEnhancedJson()` - Main JSON export
- `exportToEnhancedCsv()` - CSV export with BOM
- All helper methods for data extraction
- Data-focused approach (no HTML bloat)

**Action:** Copy ALL methods into your App class

---

### 2. **Lean Export Implementation Guide** (export_guide)
**Reference document**

**What it contains:**
- Philosophy and approach explanation
- Complete export schema documentation
- Database schema recommendations
- Server rendering examples
- Testing checklist
- Migration path

**Action:** Read for understanding, follow step-by-step

---

## ❌ IGNORE THESE ARTIFACTS

### ~~Enhanced Export System~~ (export_enhancement)
**Status:** SUPERSEDED - Old approach with HTML bloat

### ~~Integration Example~~ (integration_example)
**Status:** SUPERSEDED - Old approach included questionHtml

### ~~HTML Updates~~ (html_updates)
**Status:** SUPERSEDED - SQL export removed for simplicity

---

## 📝 Implementation Checklist

### Step 1: Update `src/ui/app.js`
```javascript
// At the top, ensure MODULES is imported:
import { MODULES } from '../curriculum/parameters.js';

// Copy ALL these methods from "Lean Export System" artifact:
// - exportToEnhancedJson()
// - exportToEnhancedCsv()
// - detectVisualType()
// - extractQuestionData()
// - extractNumbersFromText()
// - extractOperator()
// - extractPlaceValueOperation()
// - detectAnswerType()
// - stripHtml()
// - escapeCsv()
// - calculateDifficultyScore()
// - generateTags()

// Replace existing methods:
// OLD: exportToCsv() → NEW: exportToEnhancedCsv()
// OLD: exportToJson() → NEW: exportToEnhancedJson()
```

### Step 2: Update Event Listeners
In your `attachEventListeners()` method:
```javascript
// Update these:
document.getElementById('exportJsonBtn').addEventListener('click', () => {
    this.exportToEnhancedJson();  // Changed
});

document.getElementById('exportCsvBtn').addEventListener('click', () => {
    this.exportToEnhancedCsv();  // Changed
});
```

### Step 3: Test
1. Generate questions for a module
2. Click "Export JSON"
3. Open JSON file and verify:
   - ✅ Has `questionText` field
   - ✅ Has `visualType` field
   - ✅ Has `questionData` object with structured data
   - ❌ Does NOT have `questionHtml` field
4. Click "Export CSV"
5. Open in Excel - verify proper encoding

---

## 🎯 Key Differences from Old Approach

| Feature | ❌ Old Approach | ✅ New Approach |
|---------|----------------|-----------------|
| HTML Storage | Stored full HTML | No HTML field |
| Plain Text | Optional | Always included |
| Visual Type | Not included | Included (rendering hint) |
| Question Data | Minimal | Structured extraction |
| File Size | Larger | Smaller |
| Flexibility | Locked to generator HTML | Server controls rendering |
| Focus | Presentation | Data |

---

## 📊 Expected Export Structure

### JSON Export Example
```json
{
  "metadata": {
    "exportDate": "2025-01-15T10:30:00.000Z",
    "version": "1.0",
    "questionCount": 120
  },
  "questions": [
    {
      "id": "C02_Y3_addition_1234567_abc123",
      "questionText": "What is 234 + 567?",
      "visualType": "columnar_calculation",
      "questionData": {
        "originalText": "<pre>...</pre>",
        "type": "columnar",
        "numbers": [234, 567],
        "operator": "+"
      },
      "correctAnswer": "801",
      "answerType": "numeric",
      "generatorParameters": {...},
      "tags": ["columnar_calculation", "year-3", ...]
    }
  ]
}
```

### CSV Export Example
```
ID,Question_Text,Visual_Type,Question_Data_JSON,Correct_Answer
C02_Y3_123,"What is 234 + 567?",columnar_calculation,"{""numbers"":[234,567],""operator"":""+""}",801
```

---

## 🚀 Quick Start (5 Minutes)

1. Open `src/ui/app.js`
2. Scroll to the `exportToCsv()` and `exportToJson()` methods
3. Delete both methods entirely
4. Copy ALL methods from **"Lean Export System"** artifact
5. Paste into your App class
6. Update event listeners as shown above
7. Test with sample questions
8. Done! ✨

---

## 💡 Why This Approach

**Generator App:**
- Stays lean and focused
- No HTML presentation bloat
- Fast, efficient exports

**Your Server App:**
- Full control over how questions display
- Can improve rendering anytime without touching data
- Mobile-optimized, accessible components
- Different layouts for different contexts (practice vs. assessment)

**Your Question Bank:**
- Searchable plain text
- Structured data enables smart features
- Future-proof (rendering can evolve)
- Smaller file sizes

---

## 🆘 Troubleshooting

### "MODULES is not defined"
Add to top of `src/ui/app.js`:
```javascript
import { MODULES } from '../curriculum/parameters.js';
```

### "Method not found" errors
Make sure ALL methods from the artifact are copied, not just the export methods.

### CSV not opening properly in Excel
Verify the BOM character (`\uFEFF`) is at the start of the CSV content.

### Numbers not extracting correctly
Check that `extractNumbersFromText()` is handling your number format (decimals, negatives, etc.)

### Visual type showing as "plain_text" for columnar questions
Verify the columnar questions have `class="columnar-calc"` in the original text.

---

## 📚 Next Steps After Implementation

1. **Generate your question bank** (all modules, all levels)
2. **Review JSON structure** - verify data quality
3. **Start building server app** - load and display questions
4. **Create rendering components** based on `visualType`
5. **Implement search/filter** using tags and plain text
6. **Set up database** when ready for production

---

## ✨ Summary

**USE:** "Lean Export System" artifact (all methods)  
**READ:** "Lean Export Implementation Guide" (reference)  
**IGNORE:** Old artifacts with HTML approach

**Time to implement:** ~15 minutes  
**Code added:** ~250 lines (but worth it!)  
**Result:** Clean, data-focused exports ready for your server app
