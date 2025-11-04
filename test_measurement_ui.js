/**
 * Comprehensive UI/UX Test for Measurement Modules (M01-M09)
 *
 * This script generates sample questions from all measurement modules
 * across all year groups and difficulty levels to assess UI effectiveness.
 */

import questionEngine from './src/core/questionEngine.js';
import { MODULES } from './src/curriculum/parameters.js';

// Get all measurement modules (M01-M09)
const measurementModules = Object.keys(MODULES)
    .filter(id => id.startsWith('M0'))
    .sort();

console.log('\n='.repeat(80));
console.log('MEASUREMENT MODULES UI/UX ASSESSMENT');
console.log('='.repeat(80));
console.log(`\nFound ${measurementModules.length} measurement modules to test\n`);

// Group modules by series
const modulesBySeries = {};
measurementModules.forEach(moduleId => {
    const series = moduleId.substring(0, 3); // M01, M02, etc.
    if (!modulesBySeries[series]) {
        modulesBySeries[series] = [];
    }
    modulesBySeries[series].push(moduleId);
});

// Generate sample questions for each series
Object.entries(modulesBySeries).forEach(([series, moduleIds]) => {
    console.log('\n' + '='.repeat(80));
    console.log(`${series} SERIES: ${MODULES[moduleIds[0]].substrand}`);
    console.log('='.repeat(80));

    moduleIds.forEach(moduleId => {
        const module = MODULES[moduleId];
        console.log(`\n${'─'.repeat(80)}`);
        console.log(`MODULE: ${moduleId} - ${module.name}`);
        console.log(`Year: ${module.yearGroup} | Description: ${module.description}`);
        console.log('─'.repeat(80));

        // Generate 2 questions from each level (1-4)
        for (let level = 1; level <= 4; level++) {
            console.log(`\n  LEVEL ${level}: ${getLevelName(level)}`);
            console.log('  ' + '─'.repeat(76));

            try {
                const questions = questionEngine.generate(moduleId, level, 2);

                questions.forEach((q, idx) => {
                    console.log(`\n  Question ${idx + 1}:`);
                    console.log(`    Type: ${q.type}`);
                    console.log(`    Text: ${stripHtml(q.text).substring(0, 200)}${stripHtml(q.text).length > 200 ? '...' : ''}`);
                    console.log(`    Answer: ${q.answer}`);

                    if (q.type === 'multiple_choice' && q.options) {
                        console.log(`    Options: ${q.options.join(', ')}`);
                    }

                    if (q.hint) {
                        console.log(`    Hint: ${q.hint}`);
                    }

                    // Check for visual elements
                    const visualElements = detectVisualElements(q.text);
                    if (visualElements.length > 0) {
                        console.log(`    Visual Elements: ${visualElements.join(', ')}`);
                    }

                    // Check for multi-gap
                    if (q.answers && q.answers.length > 1) {
                        console.log(`    Multi-gap: ${q.answers.length} gaps`);
                    }
                });
            } catch (error) {
                console.log(`  ⚠️  ERROR generating questions: ${error.message}`);
            }
        }
    });
});

console.log('\n' + '='.repeat(80));
console.log('ASSESSMENT COMPLETE');
console.log('='.repeat(80));
console.log('\nAnalyze the output above for:');
console.log('  1. Question clarity and readability');
console.log('  2. Appropriate use of visual elements');
console.log('  3. Input method suitability (text vs multiple choice)');
console.log('  4. Age-appropriate language and contexts');
console.log('  5. Difficulty progression across levels');
console.log('  6. Consistency within each module series');
console.log('  7. Need for additional visual scaffolding');
console.log('\n');

// Helper functions
function getLevelName(level) {
    const names = { 1: 'Beginning', 2: 'Developing', 3: 'Meeting', 4: 'Exceeding' };
    return names[level];
}

function stripHtml(text) {
    return text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function detectVisualElements(text) {
    const elements = [];
    if (text.includes('class="clock-face"')) elements.push('Clock Face');
    if (text.includes('class="number-line"')) elements.push('Number Line');
    if (text.includes('class="columnar-calc"')) elements.push('Columnar Calculation');
    if (text.includes('class="grid-method"')) elements.push('Grid Method');
    if (text.includes('<pre>')) elements.push('Formatted Text');
    if (text.includes('<table>')) elements.push('Table');
    if (text.includes('class="scale-')) elements.push('Scale Diagram');
    if (text.includes('class="visual-')) elements.push('Visual Representation');
    return elements;
}
