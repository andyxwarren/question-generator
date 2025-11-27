/**
 * Export Formatters
 *
 * Provides formatting functions for JSON, CSV, and Pretty terminal output.
 */

/**
 * Format questions as JSON
 * @param {Object[]} questions - Array of question objects
 * @param {Object} metadata - Generation metadata
 * @param {Object} metadata.filters - Applied filters
 * @param {number[]} metadata.levels - Levels generated
 * @returns {string} JSON string
 */
export function formatAsJson(questions, metadata = {}) {
    const output = {
        generated: new Date().toISOString(),
        version: "2.0",
        filters: metadata.filters || {},
        summary: {
            totalQuestions: questions.length,
            modules: [...new Set(questions.map(q => q.module))].length,
            levels: metadata.levels || [...new Set(questions.map(q => q.level))].sort()
        },
        questions
    };

    return JSON.stringify(output, null, 2);
}

/**
 * Format questions as CSV
 * @param {Object[]} questions - Array of question objects
 * @returns {string} CSV string with headers
 */
export function formatAsCsv(questions) {
    // CSV headers
    const headers = [
        'id',
        'module',
        'level',
        'strand',
        'substrand',
        'year',
        'type',
        'text',
        'answer',
        'hint',
        'options',
        'params'
    ];

    // Escape CSV field (handle commas, quotes, newlines)
    const escapeField = (value) => {
        if (value === null || value === undefined) return '';
        const str = String(value);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    // Build rows
    const rows = questions.map(q => {
        return [
            q.id || '',
            q.module || '',
            q.level || '',
            q.curriculum?.strand || '',
            q.curriculum?.substrand || '',
            q.curriculum?.yearGroup || '',
            q.type || '',
            q.text || '',
            q.answer || '',
            q.hint || '',
            q.options ? JSON.stringify(q.options) : '',
            q.params ? JSON.stringify(q.params) : ''
        ].map(escapeField).join(',');
    });

    // UTF-8 BOM for Excel compatibility
    const BOM = '\uFEFF';
    return BOM + [headers.join(','), ...rows].join('\n');
}

/**
 * Format questions for pretty terminal display
 * @param {Object[]} questions - Array of question objects
 * @param {Object} options - Display options
 * @param {boolean} [options.showAnswers=true] - Whether to show answers
 * @param {boolean} [options.showHints=true] - Whether to show hints
 * @param {boolean} [options.groupByModule=true] - Group questions by module
 * @returns {string} Formatted string for terminal
 */
export function formatAsPretty(questions, options = {}) {
    const {
        showAnswers = true,
        showHints = true,
        groupByModule = true
    } = options;

    const lines = [];
    const LINE_SINGLE = '─'.repeat(70);
    const LINE_DOUBLE = '═'.repeat(70);

    if (groupByModule) {
        // Group questions by module
        const grouped = {};
        questions.forEach(q => {
            const key = q.module;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(q);
        });

        // Format each module group
        Object.entries(grouped).forEach(([moduleId, moduleQuestions]) => {
            const first = moduleQuestions[0];
            const moduleName = first.curriculum?.description || moduleId;
            const year = first.curriculum?.yearGroup || '?';
            const level = first.level;

            // Module header
            lines.push('');
            lines.push(LINE_DOUBLE);
            lines.push(` ${moduleId}: ${moduleName}`);
            lines.push(` Level ${level} | Year ${year}`);
            lines.push(LINE_DOUBLE);
            lines.push('');

            // Questions
            moduleQuestions.forEach((q, idx) => {
                lines.push(`Q${idx + 1}. ${q.text}`);

                if (showAnswers) {
                    lines.push(`    Answer: ${q.answer}`);
                }

                if (showHints && q.hint) {
                    lines.push(`    Hint: ${q.hint}`);
                }

                lines.push('');
            });
        });
    } else {
        // Flat list
        questions.forEach((q, idx) => {
            lines.push(`[${q.module}] Q${idx + 1}. ${q.text}`);
            if (showAnswers) {
                lines.push(`    Answer: ${q.answer}`);
            }
            if (showHints && q.hint) {
                lines.push(`    Hint: ${q.hint}`);
            }
            lines.push('');
        });
    }

    // Summary footer
    lines.push(LINE_SINGLE);
    const moduleCount = [...new Set(questions.map(q => q.module))].length;
    lines.push(`Generated ${questions.length} questions from ${moduleCount} module(s)`);

    return lines.join('\n');
}

/**
 * Format module list for terminal display
 * @param {Object[]} modules - Array of module summary objects
 * @returns {string} Formatted string
 */
export function formatModuleList(modules) {
    const lines = [];
    const LINE = '─'.repeat(70);

    lines.push('');
    lines.push('Available Modules');
    lines.push(LINE);

    // Group by strand
    const byStrand = {};
    modules.forEach(m => {
        if (!byStrand[m.strand]) {
            byStrand[m.strand] = [];
        }
        byStrand[m.strand].push(m);
    });

    Object.entries(byStrand).forEach(([strand, strandModules]) => {
        lines.push('');
        lines.push(`[${strand}]`);

        strandModules.forEach(m => {
            lines.push(`  ${m.id.padEnd(15)} Year ${m.year}  ${m.name}`);
        });
    });

    lines.push('');
    lines.push(LINE);
    lines.push(`Total: ${modules.length} modules`);

    return lines.join('\n');
}

export default {
    formatAsJson,
    formatAsCsv,
    formatAsPretty,
    formatModuleList
};
