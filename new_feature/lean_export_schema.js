/**
 * LEAN EXPORT SYSTEM - Add to src/ui/app.js
 * 
 * Philosophy: Capture data, not presentation
 * The server app will create polished visuals from structured data
 * 
 * INSTALLATION:
 * 1. Copy all methods below into your App class in src/ui/app.js
 * 2. Replace existing exportToCsv() and exportToJson() methods
 * 3. Update event listeners to call new methods
 */

// ============================================================================
// MAIN EXPORT METHODS
// ============================================================================

/**
 * Export questions to lean JSON format - data over presentation
 */
exportToEnhancedJson() {
    const exportData = {
        metadata: {
            exportDate: new Date().toISOString(),
            version: "1.0",
            generatorVersion: "1.0",
            questionCount: this.questions.reduce((sum, level) => sum + level.questions.length, 0),
            moduleCount: new Set(this.questions.map(level => level.moduleId)).size
        },
        questions: []
    };

    this.questions.forEach(levelGroup => {
        const module = MODULES[levelGroup.moduleId];
        const params = module ? module.parameters[levelGroup.level] : {};

        levelGroup.questions.forEach((q, qIdx) => {
            const questionData = {
                // Identification
                id: q.id,
                questionNumber: qIdx + 1,
                
                // Curriculum metadata
                moduleId: levelGroup.moduleId,
                moduleName: levelGroup.moduleName,
                moduleDescription: module ? module.description : '',
                yearGroup: module ? module.yearGroup : '',
                strand: module ? module.strand : '',
                substrand: module ? module.substrand : '',
                curriculumRef: module ? module.ref : '',
                icon: module ? module.icon : '',
                
                // Difficulty
                level: levelGroup.level,
                levelName: levelGroup.levelName,
                difficultyScore: this.calculateDifficultyScore(levelGroup.level, params),
                
                // Question content - DATA FOCUSED
                questionType: q.type,
                questionText: this.stripHtml(q.text),  // Plain text for search/display
                visualType: this.detectVisualType(q.text, q.type, params),  // How to render
                questionData: this.extractQuestionData(q, params, levelGroup.moduleId),  // Structured data
                
                // Answer data
                correctAnswer: q.answer,
                answerType: this.detectAnswerType(q.answer, q.type),
                multipleChoiceOptions: q.options || null,
                hint: q.hint || null,
                multiGapAnswers: q.answers || null,
                
                // Generator context
                generatorParameters: JSON.parse(JSON.stringify(params)),
                
                // Searchability
                tags: this.generateTags(q, module, params),
                
                // Timestamps
                generatedAt: q.timestamp ? new Date(q.timestamp).toISOString() : new Date().toISOString()
            };
            
            exportData.questions.push(questionData);
        });
    });

    const jsonContent = JSON.stringify(exportData, null, 2);
    const filename = `questions-${new Date().toISOString().slice(0,10)}-${Date.now()}.json`;
    this.downloadFile(jsonContent, filename, 'application/json;charset=utf-8;');
    
    console.log(`✅ Exported ${exportData.metadata.questionCount} questions to ${filename}`);
}

/**
 * Export to CSV with UTF-8 BOM for Excel compatibility
 */
exportToEnhancedCsv() {
    const headers = [
        'ID',
        'Question_Number',
        'Module_ID',
        'Module_Name',
        'Year_Group',
        'Strand',
        'Substrand',
        'Level',
        'Difficulty_Score',
        'Question_Type',
        'Question_Text',
        'Visual_Type',
        'Question_Data_JSON',
        'Correct_Answer',
        'Answer_Type',
        'Options_JSON',
        'Hint',
        'Tags',
        'Generated_At',
        'Parameters_JSON'
    ];

    const rows = [];
    
    this.questions.forEach(levelGroup => {
        const module = MODULES[levelGroup.moduleId];
        const params = module ? module.parameters[levelGroup.level] : {};
        
        levelGroup.questions.forEach((q, qIdx) => {
            const row = [
                q.id,
                qIdx + 1,
                levelGroup.moduleId,
                this.escapeCsv(levelGroup.moduleName),
                module ? module.yearGroup : '',
                module ? this.escapeCsv(module.strand) : '',
                module ? this.escapeCsv(module.substrand) : '',
                levelGroup.level,
                this.calculateDifficultyScore(levelGroup.level, params),
                q.type,
                this.escapeCsv(this.stripHtml(q.text)),
                this.detectVisualType(q.text, q.type, params),
                this.escapeCsv(JSON.stringify(this.extractQuestionData(q, params, levelGroup.moduleId))),
                this.escapeCsv(q.answer),
                this.detectAnswerType(q.answer, q.type),
                q.options ? this.escapeCsv(JSON.stringify(q.options)) : '',
                q.hint ? this.escapeCsv(q.hint) : '',
                this.escapeCsv(this.generateTags(q, module, params).join('; ')),
                q.timestamp ? new Date(q.timestamp).toISOString() : '',
                this.escapeCsv(JSON.stringify(params))
            ];
            rows.push(row.join(','));
        });
    });

    // Add UTF-8 BOM for Excel compatibility
    const BOM = '\uFEFF';
    const csvContent = BOM + headers.join(',') + '\n' + rows.join('\n');
    const filename = `questions-${new Date().toISOString().slice(0,10)}-${Date.now()}.csv`;
    this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
    
    console.log(`✅ Exported to ${filename} (Excel-compatible)`);
}

// ============================================================================
// DATA EXTRACTION METHODS
// ============================================================================

/**
 * Detect visual presentation type
 */
detectVisualType(text, type, params) {
    if (text.includes('columnar-calc')) return 'columnar_calculation';
    if (text.includes('short-division')) return 'short_division';
    if (text.includes('long-division')) return 'long_division';
    if (text.includes('number-line')) return 'number_line';
    if (text.includes('grid-method')) return 'grid_method';
    if (/<pre>/.test(text)) return 'formatted_text';
    if (/<table>/.test(text)) return 'table';
    
    if (type === 'multiple_choice') return 'multiple_choice';
    if (type === 'text_input') return 'text_input';
    if (type === 'fill_blanks') return 'fill_blanks';
    
    return 'plain_text';
}

/**
 * Extract structured question data for reconstruction
 */
extractQuestionData(question, params, moduleId) {
    const data = {
        originalText: question.text  // Keep as reference
    };
    
    // Columnar calculations (C02, C07 modules)
    if (question.text.includes('columnar-calc')) {
        const numbers = this.extractNumbersFromText(question.text);
        data.type = 'columnar';
        data.numbers = numbers;
        data.operator = this.extractOperator(question.text);
        data.showWork = false;
    }
    
    // Division questions
    else if (question.text.includes('division')) {
        const numbers = this.extractNumbersFromText(question.text);
        data.type = 'division';
        data.dividend = numbers[0];
        data.divisor = numbers[1];
        data.showRemainder = question.text.toLowerCase().includes('remainder');
    }
    
    // Sequence/counting questions (N01 modules)
    else if (moduleId.includes('N01')) {
        const numbers = this.extractNumbersFromText(question.text);
        data.type = 'sequence';
        data.sequence = numbers;
        data.direction = params.directions ? params.directions[0] : 'forwards';
        data.stepSize = params.step_sizes ? params.step_sizes[0] : null;
    }
    
    // Comparison questions
    else if (question.text.toLowerCase().includes('compare') || 
             question.text.includes('>') || 
             question.text.includes('<')) {
        const numbers = this.extractNumbersFromText(question.text);
        data.type = 'comparison';
        data.numbers = numbers;
    }
    
    // Place value questions (N03, N04 modules)
    else if (moduleId.includes('N03') || moduleId.includes('N04')) {
        const numbers = this.extractNumbersFromText(question.text);
        data.type = 'place_value';
        data.number = numbers[0];
        data.operation = this.extractPlaceValueOperation(question.text);
    }
    
    // Generic: extract numbers and structure
    else {
        data.type = 'generic';
        data.numbers = this.extractNumbersFromText(question.text);
        data.hasGaps = question.text.includes('?');
    }
    
    return data;
}

/**
 * Extract numbers from question text
 */
extractNumbersFromText(text) {
    const plainText = this.stripHtml(text);
    const matches = plainText.match(/-?\d+\.?\d*/g);
    return matches ? matches.map(n => parseFloat(n)) : [];
}

/**
 * Extract operator from question
 */
extractOperator(text) {
    if (text.includes('×') || text.toLowerCase().includes('multiply')) return '×';
    if (text.includes('÷') || text.toLowerCase().includes('divide')) return '÷';
    if (text.includes('+') || text.toLowerCase().includes('add')) return '+';
    if (text.includes('−') || text.includes('-') || text.toLowerCase().includes('subtract')) return '−';
    return null;
}

/**
 * Extract place value operation type
 */
extractPlaceValueOperation(text) {
    const lower = text.toLowerCase();
    if (lower.includes('digit')) return 'identify_digit';
    if (lower.includes('value')) return 'place_value';
    if (lower.includes('expand')) return 'expanded_form';
    if (lower.includes('round')) return 'rounding';
    return 'generic';
}

/**
 * Detect answer type
 */
detectAnswerType(answer, questionType) {
    if (questionType === 'multiple_choice') return 'single_choice';
    if (answer && answer.includes(',')) return 'multi_part';
    if (!isNaN(parseFloat(answer))) return 'numeric';
    return 'text';
}

// ============================================================================
// HELPER METHODS
// ============================================================================

/**
 * Strip HTML tags to get plain text
 */
stripHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerHTML = text;
    return (div.textContent || div.innerText || '').trim();
}

/**
 * Escape values for CSV format
 */
escapeCsv(value) {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

/**
 * Calculate difficulty score (0-100)
 */
calculateDifficultyScore(level, params) {
    let score = 20 + (level - 1) * 20;
    
    if (!params) return score;
    
    if (params.max_value !== undefined) {
        if (params.max_value > 10000000) score += 20;
        else if (params.max_value > 1000000) score += 15;
        else if (params.max_value > 100000) score += 12;
        else if (params.max_value > 10000) score += 8;
        else if (params.max_value > 1000) score += 5;
        else if (params.max_value > 100) score += 2;
    }
    
    if (params.operations && params.operations.length > 3) score += 5;
    if (params.include_negatives) score += 8;
    if (params.include_decimals) score += 6;
    
    return Math.min(100, Math.max(0, score));
}

/**
 * Generate searchable tags
 */
generateTags(question, module, params) {
    const tags = [];
    
    // Question type
    if (question.type) tags.push(question.type);
    if (question.options) tags.push('multiple-choice');
    if (question.answers && question.answers.length > 1) tags.push('multi-part');
    
    // Visual type
    const visualType = this.detectVisualType(question.text, question.type, params);
    if (visualType !== 'plain_text') tags.push(visualType);
    
    // Curriculum
    if (module) {
        if (module.strand) tags.push(module.strand.toLowerCase().replace(/\s+/g, '-'));
        if (module.yearGroup) tags.push(module.yearGroup.toLowerCase().replace(/\s+/g, '-'));
    }
    
    // Parameters
    if (params) {
        if (params.operations) {
            params.operations.forEach(op => tags.push(`op-${op}`));
        }
        if (params.include_zero) tags.push('includes-zero');
        if (params.include_negatives) tags.push('negative-numbers');
        
        if (params.max_value !== undefined) {
            if (params.max_value <= 20) tags.push('numbers-to-20');
            else if (params.max_value <= 100) tags.push('numbers-to-100');
            else if (params.max_value <= 1000) tags.push('numbers-to-1000');
            else if (params.max_value <= 10000) tags.push('numbers-to-10k');
            else tags.push('large-numbers');
        }
    }
    
    return [...new Set(tags)];
}
