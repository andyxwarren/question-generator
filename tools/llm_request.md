# UK National Curriculum Mathematics Question Generator - Codebase Context

## Project Overview

This is a UK National Curriculum-aligned mathematics practice application using a **parameter-based architecture**. The codebase is organized into three layers:

1. **Curriculum Layer** (`src/curriculum/`) - Defines curriculum modules and parameters
2. **Generator Layer** (`src/generators/`) - Pure functions that generate questions
3. **Engine & UI Layer** (`src/core/` and `src/ui/`) - Question orchestration and user interface

## Architecture Principles

- **Parameter-Driven**: All question constraints come from `parameters.js`, not hardcoded in generators
- **Pure Functions**: Generators have no side effects and can be called repeatedly
- **Registry Pattern**: QuestionEngine maintains a Map of generators keyed by moduleId
- **Metadata-Driven**: All generators use Schema v2.0 with comprehensive metadata

## Key Files to Know

- `src/curriculum/parameters.js` - All module definitions with 4 difficulty levels
- `src/generators/[MODULE_ID]_*.js` - Individual question generators
- `src/core/questionEngine.js` - Registry and orchestration
- `src/core/validator.js` - Answer validation
- `CLAUDE.md` - Comprehensive developer documentation

## Your Task

Can you review my v2 parameter schema here: src\core\schema.js and then let me know how to modify the my existing generators, helpers and parameters?

location of key resources:
schema: src\core\schema.js
generators and helpers: src\generators
parameters: src\curriculum\parameters

## Output Format (CRITICAL)

When you provide modified code, you **MUST** follow this exact format for the automated script to work:

### For Modified or New Files:

```markdown
<!-- FILE_START: path/to/file.js -->
```javascript
// ENTIRE file content goes here
// Include the complete file, not just changes
```
<!-- FILE_END: path/to/file.js -->
```

### For Deleted Files:

```markdown
<!-- DELETE_FILE: path/to/obsolete/file.js -->
```

### Important Rules:

1. **Complete Files Only**: Provide the ENTIRE file content, not diffs or snippets
2. **Path Accuracy**: Use the exact relative paths from the input (relative to project root)
3. **Use Forward Slashes**: Always use `/` in paths, not `\`
4. **Only Affected Files**: Only include files that changed, were created, or need deletion
5. **Explanations Outside Markers**: Add explanations before/after the markers, not inside them

### Example Output:

```markdown
I've updated the Year 3 counting generator to fix the issue with negative numbers.

<!-- FILE_START: src/generators/N01_Y3_NPV_counting.js -->
```javascript
export function generateQuestion(params, level) {
    // Complete updated file content
    return question;
}

export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};
```
<!-- FILE_END: src/generators/N01_Y3_NPV_counting.js -->

I also created a new helper function for formatting.

<!-- FILE_START: src/generators/helpers/formatHelpers.js -->
```javascript
// Complete new file content
export function formatNumber(num) {
    return num.toLocaleString();
}
```
<!-- FILE_END: src/generators/helpers/formatHelpers.js -->

And removed the obsolete legacy file.

<!-- DELETE_FILE: src/generators/legacy/oldHelper.js -->

These changes should resolve the issue.
```

---

## Codebase Follows Below

All file paths below are relative to the project root: `C:\Users\Andyx\Documents\projects\question-generator`

---

# Codebase Context: Scanned from './src' within project base 'C:\Users\Andyx\Documents\projects\question-generator'
# All file paths below are relative to: C:\Users\Andyx\Documents\projects\question-generator
# Generated on: 2025-11-25T16:38:23.421Z

--- START FILE: src\core\questionEngine.js ---
```javascript
/**
 * Question Engine
 *
 * Central orchestration system for question generation
 * Manages generator registry and question creation
 */

import { getParameters } from '../curriculum/parameters.js';
import countingY1Generator from '../generators/N01_Y1_NPV_counting.js';
import countingY2Generator from '../generators/N01_Y2_NPV_counting.js';
import countingY3Generator from '../generators/N01_Y3_NPV_counting.js';
import countingY4Generator from '../generators/N01_Y4_NPV_counting.js';
import countingY5Generator from '../generators/N01_Y5_NPV_counting.js';
import readwriteY1Generator from '../generators/N02_Y1_NPV_readwrite.js';
import readwriteY2Generator from '../generators/N02_Y2_NPV_readwrite.js';
import readwriteY3Generator from '../generators/N02_Y3_NPV_readwrite.js';
import readwriteY4Generator from '../generators/N02_Y4_NPV_readwrite.js';
import readwriteY5Generator from '../generators/N02_Y5_NPV_readwrite.js';
import readwriteY6Generator from '../generators/N02_Y6_NPV_readwrite.js';
import placeValueY2Generator from '../generators/N03_Y2_NPV_placevalue.js';
import placeValueY3Generator from '../generators/N03_Y3_NPV_placevalue.js';
import placeValueY4Generator from '../generators/N03_Y4_NPV_placevalue.js';
import placeValueY5Generator from '../generators/N03_Y5_NPV_placevalue.js';
import placeValueY6Generator from '../generators/N03_Y6_NPV_placevalue.js';
import representationY1Generator from '../generators/N04_Y1_NPV_representation.js';
import representationY2Generator from '../generators/N04_Y2_NPV_representation.js';
import representationY3Generator from '../generators/N04_Y3_NPV_representation.js';
import representationY4Generator from '../generators/N04_Y4_NPV_representation.js';
import representationY5Generator from '../generators/N04_Y5_NPV_representation.js';
import representationY6Generator from '../generators/N04_Y6_NPV_representation.js';
import negativesY4Generator from '../generators/N05_Y4_NPV_negatives.js';
import negativesY5Generator from '../generators/N05_Y5_NPV_negatives.js';
import negativesY6Generator from '../generators/N05_Y6_NPV_negatives.js';
import problemsY2Generator from '../generators/N06_Y2_NPV_problems.js';
import problemsY3Generator from '../generators/N06_Y3_NPV_problems.js';
import problemsY4Generator from '../generators/N06_Y4_NPV_problems.js';
import problemsY5Generator from '../generators/N06_Y5_NPV_problems.js';
import problemsY6Generator from '../generators/N06_Y6_NPV_problems.js';
import mentalY1Generator from '../generators/C01_Y1_CALC_mental.js';
import mentalY2Generator from '../generators/C01_Y2_CALC_mental.js';
import mentalY3Generator from '../generators/C01_Y3_CALC_mental.js';
import mentalY5Generator from '../generators/C01_Y5_CALC_mental.js';
import writtenY1Generator from '../generators/C02_Y1_CALC_written.js';
import writtenY2Generator from '../generators/C02_Y2_CALC_written.js';
import writtenY3Generator from '../generators/C02_Y3_CALC_written.js';
import writtenY4Generator from '../generators/C02_Y4_CALC_written.js';
import writtenY5Generator from '../generators/C02_Y5_CALC_written.js';
import estimationY2Generator from '../generators/C03_Y2_CALC_estimation.js';
import estimationY3Generator from '../generators/C03_Y3_CALC_estimation.js';
import estimationY4Generator from '../generators/C03_Y4_CALC_estimation.js';
import estimationY5Generator from '../generators/C03_Y5_CALC_estimation.js';
import estimationY6Generator from '../generators/C03_Y6_CALC_estimation.js';
import problemsolvingY1Generator from '../generators/C04_Y1_CALC_problems.js';
import problemsolvingY2Generator from '../generators/C04_Y2_CALC_problems.js';
import problemsolvingY3Generator from '../generators/C04_Y3_CALC_problems.js';
import problemsolvingY4Generator from '../generators/C04_Y4_CALC_problems.js';
import problemsolvingY5Generator from '../generators/C04_Y5_CALC_problems.js';
import problemsolvingY6Generator from '../generators/C04_Y6_CALC_problems.js';
import propertiesY5Generator from '../generators/C05_Y5_CALC_properties.js';
import propertiesY6Generator from '../generators/C05_Y6_CALC_properties.js';
import mentalMultiplyY2Generator from '../generators/C06_Y2_CALC_mental_multiply.js';
import mentalMultiplyY3Generator from '../generators/C06_Y3_CALC_mental_multiply.js';
import mentalMultiplyY4Generator from '../generators/C06_Y4_CALC_mental_multiply.js';
import mentalMultiplyY5Generator from '../generators/C06_Y5_CALC_mental_multiply.js';
import mentalMultiplyY6Generator from '../generators/C06_Y6_CALC_mental_multiply.js';
import writtenMultiplyY2Generator from '../generators/C07_Y2_CALC_written.js';
import writtenMultiplyY3Generator from '../generators/C07_Y3_CALC_written.js';
import writtenMultiplyY4Generator from '../generators/C07_Y4_CALC_written.js';
import writtenMultiplyY5Generator from '../generators/C07_Y5_CALC_written.js';
import writtenMultiplyY6Generator from '../generators/C07_Y6_CALC_written.js';
import propertiesProblemsY1Generator from '../generators/C08_Y1_CALC_properties.js';
import propertiesProblemsY2Generator from '../generators/C08_Y2_CALC_properties.js';
import propertiesProblemsY3Generator from '../generators/C08_Y3_CALC_properties.js';
import propertiesProblemsY4Generator from '../generators/C08_Y4_CALC_properties.js';
import propertiesProblemsY5Generator from '../generators/C08_Y5_CALC_properties.js';
import propertiesProblemsY6Generator from '../generators/C08_Y6_CALC_properties.js';
import orderY6Generator from '../generators/C09_Y6_CALC_order.js';
import measurementY1Generator from '../generators/M01_Y1_MEAS_comparison.js';
import measurementY2Generator from '../generators/M01_Y2_MEAS_comparison.js';
import measurementY3Generator from '../generators/M01_Y3_MEAS_comparison.js';
import measurementY4Generator from '../generators/M01_Y4_MEAS_comparison.js';
import scalesY1Generator from '../generators/M02_Y1_MEAS_measure.js';
import scalesY2Generator from '../generators/M02_Y2_MEAS_measure.js';
import scalesY3Generator from '../generators/M02_Y3_MEAS_measure.js';
import scalesY4Generator from '../generators/M02_Y4_MEAS_measure.js';
import moneyY1Generator from '../generators/M03_Y1_MEAS_money.js';
import moneyY2Generator from '../generators/M03_Y2_MEAS_money.js';
import moneyY3Generator from '../generators/M03_Y3_MEAS_money.js';
import timeY1Generator from '../generators/M04_Y1_MEAS_time.js';
import timeY2Generator from '../generators/M04_Y2_MEAS_time.js';
import timeY3Generator from '../generators/M04_Y3_MEAS_time.js';
import timeY4Generator from '../generators/M04_Y4_MEAS_time.js';
import timeY5Generator from '../generators/M04_Y5_MEAS_time.js';
import conversionY5Generator from '../generators/M05_Y5_MEAS_conversions.js';
import conversionY4Generator from '../generators/M06_Y4_MEAS_conversions.js';
import conversionY5MixedGenerator from '../generators/M06_Y5_MEAS_conversions.js';
import conversionY6Generator from '../generators/M06_Y6_MEAS_conversions.js';
import perimeterY3Generator from '../generators/M07_Y3_MEAS_perimeter.js';
import perimeterAreaY4Generator from '../generators/M07_Y4_MEAS_perimeter_area.js';
import compositeAreaY5Generator from '../generators/M07_Y5_MEAS_composite_area.js';
import areaFormulasY6Generator from '../generators/M07_Y6_MEAS_area_formulas.js';
import volumeY5Generator from '../generators/M08_Y5_MEAS_volume.js';
import volumeY6Generator from '../generators/M08_Y6_MEAS_volume.js';
import problemsY2MEASGenerator from '../generators/M09_Y2_MEAS_money_problems.js';
import problemsY3MEASGenerator from '../generators/M09_Y3_MEAS_measurement_problems.js';
import problemsY4MEASGenerator from '../generators/M09_Y4_MEAS_calculate_measures.js';
import problemsY5MEASGenerator from '../generators/M09_Y5_MEAS_decimal_measures.js';
import problemsY6MEASGenerator from '../generators/M09_Y6_MEAS_conversion_problems.js';

/**
 * Question Engine Class
 */
class QuestionEngine {
    constructor() {
        this.generators = new Map();
        this.registerDefaultGenerators();
    }

    /**
     * Register all default generators
     */
    registerDefaultGenerators() {
        this.register(countingY1Generator);
        this.register(countingY2Generator);
        this.register(countingY3Generator);
        this.register(countingY4Generator);
        this.register(countingY5Generator);
        this.register(readwriteY1Generator);
        this.register(readwriteY2Generator);
        this.register(readwriteY3Generator);
        this.register(readwriteY4Generator);
        this.register(readwriteY5Generator);
        this.register(readwriteY6Generator);
        this.register(placeValueY2Generator);
        this.register(placeValueY3Generator);
        this.register(placeValueY4Generator);
        this.register(placeValueY5Generator);
        this.register(placeValueY6Generator);
        this.register(representationY1Generator);
        this.register(representationY2Generator);
        this.register(representationY3Generator);
        this.register(representationY4Generator);
        this.register(representationY5Generator);
        this.register(representationY6Generator);
        this.register(negativesY4Generator);
        this.register(negativesY5Generator);
        this.register(negativesY6Generator);
        this.register(problemsY2Generator);
        this.register(problemsY3Generator);
        this.register(problemsY4Generator);
        this.register(problemsY5Generator);
        this.register(problemsY6Generator);
        this.register(mentalY1Generator);
        this.register(mentalY2Generator);
        this.register(mentalY3Generator);
        this.register(mentalY5Generator);
        this.register(writtenY1Generator);
        this.register(writtenY2Generator);
        this.register(writtenY3Generator);
        this.register(writtenY4Generator);
        this.register(writtenY5Generator);
        this.register(estimationY2Generator);
        this.register(estimationY3Generator);
        this.register(estimationY4Generator);
        this.register(estimationY5Generator);
        this.register(estimationY6Generator);
        this.register(problemsolvingY1Generator);
        this.register(problemsolvingY2Generator);
        this.register(problemsolvingY3Generator);
        this.register(problemsolvingY4Generator);
        this.register(problemsolvingY5Generator);
        this.register(problemsolvingY6Generator);
        this.register(propertiesY5Generator);
        this.register(propertiesY6Generator);
        this.register(mentalMultiplyY2Generator);
        this.register(mentalMultiplyY3Generator);
        this.register(mentalMultiplyY4Generator);
        this.register(mentalMultiplyY5Generator);
        this.register(mentalMultiplyY6Generator);
        this.register(writtenMultiplyY2Generator);
        this.register(writtenMultiplyY3Generator);
        this.register(writtenMultiplyY4Generator);
        this.register(writtenMultiplyY5Generator);
        this.register(writtenMultiplyY6Generator);
        this.register(propertiesProblemsY1Generator);
        this.register(propertiesProblemsY2Generator);
        this.register(propertiesProblemsY3Generator);
        this.register(propertiesProblemsY4Generator);
        this.register(propertiesProblemsY5Generator);
        this.register(propertiesProblemsY6Generator);
        this.register(orderY6Generator);
        this.register(measurementY1Generator);
        this.register(measurementY2Generator);
        this.register(measurementY3Generator);
        this.register(measurementY4Generator);
        this.register(scalesY1Generator);
        this.register(scalesY2Generator);
        this.register(scalesY3Generator);
        this.register(scalesY4Generator);
        this.register(moneyY1Generator);
        this.register(moneyY2Generator);
        this.register(moneyY3Generator);
        this.register(timeY1Generator);
        this.register(timeY2Generator);
        this.register(timeY3Generator);
        this.register(timeY4Generator);
        this.register(timeY5Generator);
        this.register(conversionY5Generator);
        this.register(conversionY4Generator);
        this.register(conversionY5MixedGenerator);
        this.register(conversionY6Generator);
        this.register(perimeterY3Generator);
        this.register(perimeterAreaY4Generator);
        this.register(compositeAreaY5Generator);
        this.register(areaFormulasY6Generator);
        this.register(volumeY5Generator);
        this.register(volumeY6Generator);
        this.register(problemsY2MEASGenerator);
        this.register(problemsY3MEASGenerator);
        this.register(problemsY4MEASGenerator);
        this.register(problemsY5MEASGenerator);
        this.register(problemsY6MEASGenerator);
    }

    /**
     * Register a question generator
     * @param {Object} generator - Generator object with moduleId and generate function
     */
    register(generator) {
        if (!generator.moduleId || !generator.generate) {
            throw new Error('Invalid generator: must have moduleId and generate function');
        }
        this.generators.set(generator.moduleId, generator.generate);
    }

    /**
     * Generate a single question
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @returns {Object|null} Question object or null if generation fails
     */
    generateOne(moduleId, level) {
        const generator = this.generators.get(moduleId);
        if (!generator) {
            console.error(`No generator found for module: ${moduleId}`);
            return null;
        }

        const params = getParameters(moduleId, level);
        if (!params) {
            console.error(`No parameters found for ${moduleId} level ${level}`);
            return null;
        }

        try {
            const question = generator(params, level);

            // Add unique ID and timestamp
            question.id = `${moduleId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            question.timestamp = Date.now();

            return question;
        } catch (error) {
            console.error(`Error generating question for ${moduleId}:`, error);
            return null;
        }
    }

    /**
     * Generate multiple questions with deduplication
     * @param {string} moduleId - Module identifier
     * @param {number} level - Difficulty level (1-4)
     * @param {number} count - Number of questions to generate
     * @returns {Array} Array of question objects
     */
    generate(moduleId, level, count = 10) {
        const questions = [];
        const seenQuestionTexts = new Set(); // Track unique question texts
        let attempts = 0;
        const maxAttempts = count * 3; // Try up to 3x the count to find unique questions

        while (questions.length < count && attempts < maxAttempts) {
            const question = this.generateOne(moduleId, level);

            if (question) {
                // Check if we've seen this exact question text before
                if (!seenQuestionTexts.has(question.text)) {
                    seenQuestionTexts.add(question.text);
                    questions.push(question);
                }
            }

            attempts++;
        }

        return questions;
    }

    /**
     * Get generator for a module
     * @param {string} moduleId - Module identifier
     * @returns {Function|null} Generator function or null
     */
    getGenerator(moduleId) {
        return this.generators.get(moduleId) || null;
    }

    /**
     * Check if generator exists for module
     * @param {string} moduleId - Module identifier
     * @returns {boolean} True if generator exists
     */
    hasGenerator(moduleId) {
        return this.generators.has(moduleId);
    }

    /**
     * Get all registered module IDs
     * @returns {string[]} Array of module IDs with generators
     */
    getRegisteredModules() {
        return Array.from(this.generators.keys());
    }
}

// Create and export singleton instance
const engine = new QuestionEngine();
export default engine;

```
--- END FILE: src\core\questionEngine.js ---

--- START FILE: src\core\schema.js ---
```javascript
/**
 * Parameter Schema Definition V2.0 (Nested Architecture)
 *
 * This file defines the strict contract for the V2 Nested Parameter Model.
 *
 * STRUCTURE:
 * 1. Root Level:
 *    - operations: Array of strings (defines what question types to generate)
 *    - math: Object containing mathematical constraints (ranges, steps, units)
 *    - presentation: Object containing visual/contextual settings
 *
 * 2. Validation:
 *    - validateParameters() now checks deep nesting within 'math' and 'presentation'
 */

// =============================================================================
// 1. SHARED TYPE DEFINITIONS
// =============================================================================

const SharedTypes = {
    Range: {
        type: 'object',
        structure: { min: 'number', max: 'number' },
        optional: true
    },
    RangeWithInterval: {
        type: 'object',
        structure: { min: 'number', max: 'number', interval: 'number' },
        optional: true
    },
    DecimalConfig: {
        type: 'object',
        structure: { allow: 'boolean', places: 'number' },
        optional: true
    }
};

// =============================================================================
// 2. STRAND SCHEMAS (V2 NESTED)
// =============================================================================

export const StrandSchemas = {

    // -------------------------------------------------------------------------
    // Number & Place Value (N)
    // -------------------------------------------------------------------------
    Number: {
        // Root
        operations: { type: 'array<string>', optional: true },

        // Math Constraints
        math: {
            type: 'object',
            required: true,
            structure: {
                range: SharedTypes.Range,
                sequence: {
                    type: 'object',
                    optional: true,
                    structure: {
                        steps: 'array<number>',
                        length: 'number',
                        directions: 'array<string>',
                        startStrategy: 'string'
                    }
                },
                placeValue: {
                    type: 'object',
                    optional: true,
                    structure: {
                        places: 'array<string>',
                        includeZero: 'boolean'
                    }
                },
                rounding: {
                    type: 'object',
                    optional: true,
                    structure: { bases: 'array<number>' }
                },
                roman: SharedTypes.Range
            }
        },

        // Presentation Settings
        presentation: {
            type: 'object',
            required: true,
            structure: {
                gaps: { type: 'object', optional: true },
                numberLine: { type: 'object', optional: true },
                contexts: { type: 'array<string>', optional: true },
                comparison: { type: 'object', optional: true }
            }
        }
    },

    // -------------------------------------------------------------------------
    // Calculation (C)
    // -------------------------------------------------------------------------
    Calculation: {
        operations: { type: 'array<string>', required: true },

        math: {
            type: 'object',
            required: true,
            structure: {
                range: { type: 'object', optional: true }, // Flexible range object
                targets: { type: 'array<number>', optional: true },
                tables: { type: 'array<number>', optional: true },
                components: { type: 'object', optional: true },
                config: { type: 'object', optional: true } // Specific flags like allowZero, regrouping
            }
        },

        presentation: {
            type: 'object',
            required: true,
            structure: {
                styles: { type: 'array<string>', optional: true },
                format: { type: 'string', optional: true },
                contexts: { type: 'array<string>', optional: true },
                hint: { type: 'string', optional: true }
            }
        }
    },

    // -------------------------------------------------------------------------
    // Measurement (M)
    // -------------------------------------------------------------------------
    Measurement: {
        operations: { type: 'array<string>', required: true },

        math: {
            type: 'object',
            required: true,
            structure: {
                types: { type: 'array<string>', optional: true },
                units: { type: 'object', optional: true }, // Map or Array
                ranges: { type: 'object', optional: true }, // Map of ranges
                conversions: { type: 'object', optional: true },
                denominations: { type: 'array<number>', optional: true },
                scale: SharedTypes.RangeWithInterval
            }
        },

        presentation: {
            type: 'object',
            required: false, // Sometimes optional for simple M modules
            structure: {
                contexts: { type: 'array<string>', optional: true },
                visuals: { type: 'boolean', optional: true },
                format: { type: 'string', optional: true }
            }
        }
    }
};

// =============================================================================
// 3. VALIDATION HELPERS
// =============================================================================

function validateStructure(data, structure, path = '') {
    const errors = [];
    if (!data) return errors;

    for (const [key, rule] of Object.entries(structure)) {
        const currentPath = path ? `${path}.${key}` : key;
        const value = data[key];

        // Check Required
        if ((value === undefined || value === null)) {
            if (rule.required) {
                errors.push(`Missing required parameter: ${currentPath}`);
            }
            continue;
        }

        // Check Types
        if (rule === 'number' || rule.type === 'number') {
            if (typeof value !== 'number') errors.push(`${currentPath} must be a number`);
        }
        else if (rule === 'string' || rule.type === 'string') {
            if (typeof value !== 'string') errors.push(`${currentPath} must be a string`);
        }
        else if (rule === 'boolean' || rule.type === 'boolean') {
            if (typeof value !== 'boolean') errors.push(`${currentPath} must be a boolean`);
        }
        else if (rule === 'array' || (rule.type && rule.type.startsWith('array'))) {
            if (!Array.isArray(value)) errors.push(`${currentPath} must be an array`);
        }
        else if (rule.type === 'object' && rule.structure) {
            if (typeof value !== 'object') {
                errors.push(`${currentPath} must be an object`);
            } else {
                // Recursive validation
                errors.push(...validateStructure(value, rule.structure, currentPath));
            }
        }
    }
    return errors;
}

/**
 * Validates a parameter object against the V2 Schema
 */
export function validateParameters(params, strand) {
    const schema = StrandSchemas[strand];
    if (!schema) return [`Unknown strand: ${strand}`];

    // Validate top-level structure based on the definitions above
    // We define the "structure" implicitly by the keys in StrandSchemas[strand]
    // except for keys that have specific 'structure' property inside them (like math/presentation)
    
    // Build a structure object for the validator
    const structure = {};
    for (const key of Object.keys(schema)) {
        structure[key] = schema[key];
    }

    return validateStructure(params, structure);
}

/**
 * Merges defaults (Simple shallow merge for V2)
 */
export function applyDefaults(params, strand) {
    // V2 defaults are handled inside generators or specifically defined
    // This is a placeholder for future default logic
    return params;
}
```
--- END FILE: src\core\schema.js ---

--- START FILE: src\core\validator.js ---
```javascript
/**
 * Answer Validator
 *
 * Validates student answers against correct answers
 * Handles different answer formats and provides feedback
 */

/**
 * Normalize answer for comparison
 * @param {string} answer - Answer to normalize
 * @returns {string} Normalized answer
 */
function normalizeAnswer(answer) {
    return String(answer)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '');
}

/**
 * Check if two numbers are approximately equal
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {number} tolerance - Allowed difference
 * @returns {boolean} True if approximately equal
 */
function approximatelyEqual(a, b, tolerance = 0.01) {
    return Math.abs(a - b) <= tolerance;
}

/**
 * Validate a student's answer
 * @param {Object} question - Question object with answer
 * @param {string} studentAnswer - Student's submitted answer
 * @returns {Object} Validation result { isCorrect, feedback, normalizedAnswer }
 */
export function validate(question, studentAnswer) {
    const correctAnswer = normalizeAnswer(question.answer);
    const submittedAnswer = normalizeAnswer(studentAnswer);

    // Empty answer check
    if (!submittedAnswer) {
        return {
            isCorrect: false,
            feedback: 'Please provide an answer',
            normalizedAnswer: submittedAnswer
        };
    }

    // Check for range validation (e.g., "between" questions)
    // Support both 'validRange' and 'acceptableRange' properties
    const rangeCheck = question.validRange || question.acceptableRange;
    if (rangeCheck) {
        const numSubmitted = parseFloat(studentAnswer);
        if (!isNaN(numSubmitted)) {
            const { min, max } = rangeCheck;
            // Check if answer is strictly between min and max (exclusive)
            if (numSubmitted > min && numSubmitted < max && Number.isInteger(numSubmitted)) {
                return {
                    isCorrect: true,
                    feedback: 'Correct!',
                    normalizedAnswer: submittedAnswer
                };
            }
            // Provide helpful feedback if out of range
            if (numSubmitted <= min || numSubmitted >= max) {
                return {
                    isCorrect: false,
                    feedback: `Please give a number between ${min} and ${max}`,
                    normalizedAnswer: submittedAnswer
                };
            }
        }
    }

    // Exact match
    if (submittedAnswer === correctAnswer) {
        return {
            isCorrect: true,
            feedback: 'Correct!',
            normalizedAnswer: submittedAnswer
        };
    }

    // Handle comma-separated answers (multi-gap questions)
    if (correctAnswer.includes(',')) {
        const correctParts = correctAnswer.split(',').map(s => s.trim()).sort();
        const submittedParts = submittedAnswer.split(',').map(s => s.trim()).sort();

        if (correctParts.length === submittedParts.length &&
            correctParts.every((val, idx) => val === submittedParts[idx])) {
            return {
                isCorrect: true,
                feedback: 'Correct!',
                normalizedAnswer: submittedAnswer
            };
        }
    }

    // Try numeric comparison (handles decimal precision issues)
    const numSubmitted = parseFloat(studentAnswer);
    const numCorrect = parseFloat(question.answer);

    if (!isNaN(numSubmitted) && !isNaN(numCorrect)) {
        if (approximatelyEqual(numSubmitted, numCorrect)) {
            return {
                isCorrect: true,
                feedback: 'Correct!',
                normalizedAnswer: submittedAnswer
            };
        }
    }

    // Not correct
    return {
        isCorrect: false,
        feedback: `Not quite. The correct answer is ${question.answer}`,
        normalizedAnswer: submittedAnswer,
        correctAnswer: question.answer
    };
}

/**
 * Validate multiple choice answer
 * @param {Object} question - Question object
 * @param {string} selectedOption - Selected option
 * @returns {Object} Validation result
 */
export function validateMultipleChoice(question, selectedOption) {
    return validate(question, selectedOption);
}

/**
 * Validate text input answer
 * @param {Object} question - Question object
 * @param {string} textInput - Text input value
 * @returns {Object} Validation result
 */
export function validateTextInput(question, textInput) {
    return validate(question, textInput);
}

/**
 * Check if answer is partially correct (for multi-part questions)
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {Object} Partial validation result
 */
export function validatePartial(question, studentAnswer) {
    const result = validate(question, studentAnswer);

    // Could add partial credit logic here in future
    // For now, it's either correct or incorrect

    return {
        ...result,
        partialCredit: result.isCorrect ? 1.0 : 0.0
    };
}

/**
 * Validate answer and return simple boolean
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {boolean} True if correct
 */
export function isCorrect(question, studentAnswer) {
    return validate(question, studentAnswer).isCorrect;
}

export default {
    validate,
    validateMultipleChoice,
    validateTextInput,
    validatePartial,
    isCorrect
};

```
--- END FILE: src\core\validator.js ---

--- START FILE: src\curriculum\parameters\C01_mental.js ---
```javascript
/**
 * C01 Module Series: Mental Addition and Subtraction
 * Covers Years 1, 2, 3, 5
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C01_Y1_CALC: {
        1: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub"],
            math: { range: { max: 10 }, targets: [5, 10], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub", "fact_families"],
            math: { range: { max: 20 }, targets: [10, 20], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem", "part_whole"] }
        },
        3: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub", "fact_families", "mixed_operations"],
            math: { range: { max: 20 }, targets: [10, 15, 20], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem", "part_whole", "missing_number"] }
        },
        4: {
            operations: ["number_bonds", "missing_part", "related_facts", "simple_add_sub", "fact_families", "mixed_operations", "two_step_bonds"],
            math: { range: { max: 20 }, targets: [10, 15, 20], config: { allowZero: true, factFamilies: true } },
            presentation: { styles: ["equation", "word_problem", "part_whole", "missing_number", "reasoning"] }
        }
    },
    C01_Y2_CALC: {
        1: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: false } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract", "inverse_operations"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract", "inverse_operations", "fact_families_100"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["recall_to_20", "derive_to_100", "missing_addend", "related_subtract", "inverse_operations", "fact_families_100", "near_multiples"],
            math: { range: { basicMax: 20, derivedMax: 100 }, config: { multiplesOf10: true, cross10: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C01_Y3_CALC: {
        1: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens"],
            math: { range: { min3: 100, max3: 300 }, components: { ones: [1, 9], tens: [10, 50], hundreds: [100, 300] }, config: { avoidBridging: true } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens", "add_hundreds", "subtract_hundreds"],
            math: { range: { min3: 100, max3: 500 }, components: { ones: [1, 9], tens: [10, 90], hundreds: [100, 400] }, config: { avoidBridging: false } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens", "add_hundreds", "subtract_hundreds", "mixed_operations"],
            math: { range: { min3: 100, max3: 999 }, components: { ones: [1, 9], tens: [10, 90], hundreds: [100, 900] }, config: { avoidBridging: false } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["add_ones", "subtract_ones", "add_tens", "subtract_tens", "add_hundreds", "subtract_hundreds", "mixed_operations", "two_step_mental"],
            math: { range: { min3: 100, max3: 999 }, components: { ones: [1, 9], tens: [10, 90], hundreds: [100, 900] }, config: { avoidBridging: false, complexBridging: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C01_Y5_CALC: {
        1: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_ones_to_4digit", "subtract_ones_from_4digit"],
            math: { range: { min: 1000, max: 9999 }, components: { powers: [10, 100, 1000] }, config: { avoidBridging: true } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_multiples_1000", "subtract_multiples_1000", "add_any_to_4digit", "subtract_any_from_4digit"],
            math: { range: { min: 1000, max: 99999 }, components: { powers: [10, 100, 1000] }, config: { avoidBridging: false } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_multiples_1000", "subtract_multiples_1000", "add_any_to_large", "subtract_any_from_large", "compensation", "partitioning"],
            math: { range: { min: 1000, max: 1000000 }, components: { powers: [10, 100, 1000, 10000] }, config: { avoidBridging: false, strategies: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["add_multiples_10", "subtract_multiples_10", "add_multiples_100", "subtract_multiples_100", "add_multiples_1000", "subtract_multiples_1000", "add_any_to_large", "subtract_any_from_large", "compensation", "partitioning", "near_multiples_large", "multi_step_mental"],
            math: { range: { min: 1000, max: 1000000 }, components: { powers: [10, 100, 1000, 10000, 100000] }, config: { avoidBridging: false, strategies: true, complex: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    }
};

export const C01_MODULES = {
    'C01_Y1_CALC': {
        id: 'C01_Y1_CALC',
        name: 'C01_Y1_CALC: Number Bonds to 20',
        description: 'Represent and use number bonds and related subtraction facts within 20',
        icon: '➕',
        yearGroup: 'Year 1',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y1_CALC']
    },
    'C01_Y2_CALC': {
        id: 'C01_Y2_CALC',
        name: 'C01_Y2_CALC: Mental Facts to 100',
        description: 'Recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100',
        icon: '➕',
        yearGroup: 'Year 2',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y2_CALC']
    },
    'C01_Y3_CALC': {
        id: 'C01_Y3_CALC',
        name: 'C01_Y3_CALC: Mental 3-Digit Calculations',
        description: 'Add and subtract numbers mentally, including: a three-digit number and ones, a three-digit number and tens, a three-digit number and hundreds',
        icon: '➕',
        yearGroup: 'Year 3',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y3_CALC']
    },
    'C01_Y5_CALC': {
        id: 'C01_Y5_CALC',
        name: 'C01_Y5_CALC: Mental Calculations with Large Numbers',
        description: 'Add and subtract numbers mentally with increasingly large numbers',
        icon: '➕',
        yearGroup: 'Year 5',
        strand: 'Addition, subtraction, multiplication and division (calculations)',
        substrand: 'add / subtract mentally',
        ref: 'C1',
        parameters: MIGRATED_PARAMS['C01_Y5_CALC']
    }
};
```
--- END FILE: src\curriculum\parameters\C01_mental.js ---

--- START FILE: src\curriculum\parameters\C02_written.js ---
```javascript
/**
 * C02 Module Series: Add/Subtract Using Written Methods
 * Covers Years 1-5
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C02_Y1_CALC: {
        1: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "symbol_interpretation"],
            math: { range: { max: 10, result: [0, 10] }, config: { allowZero: true, missingPositions: ["end"] } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "missing_subtrahend", "symbol_interpretation", "equation_completion"],
            math: { range: { max: 15, result: [0, 15] }, config: { allowZero: true, missingPositions: ["end", "middle"] } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "missing_subtrahend", "missing_minuend", "symbol_interpretation", "equation_completion", "true_false_equations"],
            math: { range: { max: 20, result: [0, 20] }, config: { allowZero: true, missingPositions: ["start", "middle", "end"] } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["simple_addition", "simple_subtraction", "missing_addend", "missing_subtrahend", "missing_minuend", "symbol_interpretation", "equation_completion", "true_false_equations", "two_step_problems", "complex_missing"],
            math: { range: { max: 20, result: [0, 20] }, config: { allowZero: true, missingPositions: ["start", "middle", "end", "multiple"] } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C02_Y2_CALC: {
        1: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "three_onedigit"],
            math: { range: { max_2digit: 50 }, components: { ones: [1, 9], tens: [10, 50] }, config: { avoidBridging: true, threeNumbersMax: 20 } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        2: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "twodigit_minus_tens", "twodigit_plus_twodigit", "three_onedigit"],
            math: { range: { max_2digit: 75 }, components: { ones: [1, 9], tens: [10, 60] }, config: { avoidBridging: false, avoidCarry: true, threeNumbersMax: 25 } },
            presentation: { styles: ["equation", "word_problem", "missing_number"] }
        },
        3: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "twodigit_minus_tens", "twodigit_plus_twodigit", "twodigit_minus_twodigit", "three_onedigit"],
            math: { range: { max_2digit: 99 }, components: { ones: [1, 9], tens: [10, 90] }, config: { avoidBridging: false, avoidCarry: false, threeNumbersMax: 27 } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning"] }
        },
        4: {
            operations: ["twodigit_plus_ones", "twodigit_minus_ones", "twodigit_plus_tens", "twodigit_minus_tens", "twodigit_plus_twodigit", "twodigit_minus_twodigit", "three_onedigit", "mixed_operations", "complex_missing"],
            math: { range: { max_2digit: 99 }, components: { ones: [1, 9], tens: [10, 90] }, config: { avoidBridging: false, avoidCarry: false, threeNumbersMax: 30, complexity: true } },
            presentation: { styles: ["equation", "word_problem", "missing_number", "reasoning", "multi_step"] }
        }
    },
    C02_Y3_CALC: {
        1: {
            operations: ["addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min3: 100, max3: 500, resultMax: 999 }, config: { noCarry: true, noBorrow: true } },
            presentation: { styles: ["equation", "word_problem"], hint: "Use written column method" }
        },
        2: {
            operations: ["addition_simple_carry", "subtraction_simple_borrow", "addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min3: 100, max3: 700, resultMax: 999 }, config: { allowSingleCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning"], hint: "Use written column method" }
        },
        3: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty"],
            math: { range: { min3: 100, max3: 999, resultMax: 999 }, config: { allowMultiCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving"], hint: "Use written column method" }
        },
        4: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty", "crossing_1000", "missing_digit_problems"],
            math: { range: { min3: 100, max3: 999, resultMax: 1999 }, config: { allowMultiCarry: true, exceed1000: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving", "missing_number"], hint: "Use written column method" }
        }
    },
    C02_Y4_CALC: {
        1: {
            operations: ["addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min4: 1000, max4: 5000, resultMax: 9999 }, config: { noCarry: true, noBorrow: true } },
            presentation: { styles: ["equation", "word_problem"], hint: "Use written column method" }
        },
        2: {
            operations: ["addition_simple_carry", "subtraction_simple_borrow", "addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min4: 1000, max4: 7000, resultMax: 9999 }, config: { allowSingleCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning"], hint: "Use written column method" }
        },
        3: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty"],
            math: { range: { min4: 1000, max4: 9999, resultMax: 9999 }, config: { allowMultiCarry: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving"], hint: "Use written column method" }
        },
        4: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty", "crossing_10000", "missing_digit_problems", "multi_step_problems"],
            math: { range: { min4: 1000, max4: 9999, resultMax: 19999 }, config: { allowMultiCarry: true, exceed10000: true } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving", "missing_number"], hint: "Use written column method" }
        }
    },
    C02_Y5_CALC: {
        1: {
            operations: ["addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min: 10000, max: 50000, resultMax: 99999 }, config: { noCarry: true, noBorrow: true, digits: 5 } },
            presentation: { styles: ["equation", "word_problem"], hint: "Use written column method" }
        },
        2: {
            operations: ["addition_simple_carry", "subtraction_simple_borrow", "addition_no_carry", "subtraction_no_borrow"],
            math: { range: { min: 10000, max: 500000, resultMax: 999999 }, config: { allowSingleCarry: true, digits: [5, 6] } },
            presentation: { styles: ["equation", "word_problem", "reasoning"], hint: "Use written column method" }
        },
        3: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty"],
            math: { range: { min: 10000, max: 999999, resultMax: 1999999 }, config: { allowMultiCarry: true, digits: [5, 6] } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving"], hint: "Use written column method" }
        },
        4: {
            operations: ["addition_with_carry", "subtraction_with_borrow", "mixed_difficulty", "large_numbers", "missing_digit_problems", "multi_step_problems"],
            math: { range: { min: 10000, max: 9999999, resultMax: 19999999 }, config: { allowMultiCarry: true, digits: [5, 6, 7] } },
            presentation: { styles: ["equation", "word_problem", "reasoning", "problem_solving", "missing_number"], hint: "Use written column method" }
        }
    }
};

export const C02_MODULES = {
    'C02_Y1_CALC': { id: 'C02_Y1_CALC', name: 'C02_Y1_CALC: Add & Subtract to 20', description: 'Add/subtract one-digit and two-digit numbers', yearGroup: 'Year 1', strand: 'Addition, subtraction', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y1_CALC'] },
    'C02_Y2_CALC': { id: 'C02_Y2_CALC', name: 'C02_Y2_CALC: 2-Digit Add & Subtract', description: 'Add/subtract 2-digit numbers', yearGroup: 'Year 2', strand: 'Addition, subtraction', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y2_CALC'] },
    'C02_Y3_CALC': { id: 'C02_Y3_CALC', name: 'C02_Y3_CALC: 3-Digit Columnar', description: 'Columnar addition/subtraction 3-digit', yearGroup: 'Year 3', strand: 'Addition, subtraction', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y3_CALC'] },
    'C02_Y4_CALC': { id: 'C02_Y4_CALC', name: 'C02_Y4_CALC: 4-Digit Columnar', description: 'Columnar addition/subtraction 4-digit', yearGroup: 'Year 4', strand: 'Addition, subtraction', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y4_CALC'] },
    'C02_Y5_CALC': { id: 'C02_Y5_CALC', name: 'C02_Y5_CALC: Large Columnar', description: 'Columnar addition/subtraction large numbers', yearGroup: 'Year 5', strand: 'Addition, subtraction', ref: 'C2', parameters: MIGRATED_PARAMS['C02_Y5_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C02_written.js ---

--- START FILE: src\curriculum\parameters\C03_estimation.js ---
```javascript
/**
 * C03 Module Series: Estimation, Inverses and Checking
 * Covers Years 2-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C03_Y2_CALC: {
        1: {
            operations: ["identify_inverse_check", "missing_number_inverse", "true_false_check"],
            math: { range: { min: 1, max: 20 }, config: { factFamilyComplete: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        2: {
            operations: ["identify_inverse_check", "missing_number_inverse", "true_false_check", "complete_fact_family"],
            math: { range: { min: 1, max: 50 }, config: { factFamilyComplete: true, multiples10: true } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        }
        // ... L3, L4
    },
    C03_Y3_CALC: {
        1: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable"],
            math: { range: { min: 10, max: 100 }, rounding: { bases: [10] }, calcTypes: ["addition", "subtraction"], config: { use3digit: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        3: {
            operations: ["estimate_by_rounding", "check_with_inverse", "is_reasonable", "find_error", "choose_rounding_place"],
            math: { range: { min: 10, max: 999 }, rounding: { bases: [10, 100] }, calcTypes: ["addition", "subtraction"], config: { use3digit: true } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        }
    },
    C03_Y4_CALC: {
        1: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable"],
            math: { range: { min: 100, max: 5000 }, rounding: { bases: [100, 1000] }, calcTypes: ["addition", "subtraction"], config: { includeMult: false } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        },
        3: {
            operations: ["estimate_4digit", "check_with_inverse", "is_reasonable", "check_multiply_with_divide", "check_divide_with_multiply", "choose_best_estimate"],
            math: { range: { min: 100, max: 9999 }, rounding: { bases: [10, 100, 1000] }, calcTypes: ["addition", "subtraction", "multiplication", "division"], config: { includeMult: true, tables: [2,3,4,5,6,7,8,9,10,11,12] } },
            presentation: { formats: ["multiple_choice", "true_false"] }
        }
    }
};

export const C03_MODULES = {
    'C03_Y2_CALC': { id: 'C03_Y2_CALC', name: 'C03_Y2_CALC: Inverse', ref: 'C3', parameters: MIGRATED_PARAMS['C03_Y2_CALC'] },
    'C03_Y3_CALC': { id: 'C03_Y3_CALC', name: 'C03_Y3_CALC: Estimation', ref: 'C3', parameters: MIGRATED_PARAMS['C03_Y3_CALC'] },
    'C03_Y4_CALC': { id: 'C03_Y4_CALC', name: 'C03_Y4_CALC: Estimation 4-Digit', ref: 'C3', parameters: MIGRATED_PARAMS['C03_Y4_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C03_estimation.js ---

--- START FILE: src\curriculum\parameters\C04_problems.js ---
```javascript
/**
 * C04 Module Series: Problem Solving
 * Covers Years 1-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C04_Y1_CALC: {
        1: {
            operations: ["simple_addition_word", "simple_subtraction_word", "missing_addend"],
            math: { range: { min: 1, max: 10 }, config: { allowZero: false } },
            presentation: { contexts: ["objects"], format: "multiple_choice" }
        },
        3: {
            operations: ["simple_addition_word", "reversed_equation"],
            math: { range: { min: 0, max: 20 }, config: { allowZero: true } },
            presentation: { contexts: ["objects"], format: "text_input" }
        }
    },
    C04_Y2_CALC: {
        1: {
            operations: ["simple_addition_word", "money_problems_simple"],
            math: { range: { min: 0, max: 50 }, config: { allowZero: true } },
            presentation: { contexts: ["objects", "money_pence"], format: "multiple_choice" }
        }
    },
    C04_Y4_CALC: {
        1: {
            operations: ["combine_then_remove", "remove_then_add"],
            math: { range: { min: 1, max: 100 }, steps: 2, config: { allowZero: false } },
            presentation: { contexts: ["objects"], format: "multiple_choice" }
        }
    }
};

export const C04_MODULES = {
    'C04_Y1_CALC': { id: 'C04_Y1_CALC', name: 'C04_Y1_CALC: One-Step Problems', ref: 'C4', parameters: MIGRATED_PARAMS['C04_Y1_CALC'] },
    'C04_Y2_CALC': { id: 'C04_Y2_CALC', name: 'C04_Y2_CALC: One-Step 100', ref: 'C4', parameters: MIGRATED_PARAMS['C04_Y2_CALC'] },
    'C04_Y4_CALC': { id: 'C04_Y4_CALC', name: 'C04_Y4_CALC: Two-Step Problems', ref: 'C4', parameters: MIGRATED_PARAMS['C04_Y4_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C04_problems.js ---

--- START FILE: src\curriculum\parameters\C05_properties.js ---
```javascript
/**
 * C05 Module Series: Properties of Number
 * Covers Years 5-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C05_Y5_CALC: {
        1: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes"],
            math: {
                multiples: { bases: [2, 5, 10], range: [1, 50] },
                factors: { targets: [4, 6, 8, 10, 12, 15, 16, 18, 20], maxPairs: 4 },
                primes: { recallRange: [1, 19], identifyRange: [1, 30] },
                powers: { squareBases: [1, 2, 3, 4, 5], cubeBases: [1, 2, 3], range: [1, 25] }
            },
            presentation: { styles: ["direct", "recognition"] }
        },
        2: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes", "common_factors"],
            math: {
                multiples: { bases: [2, 3, 4, 5, 6, 10], range: [1, 100] },
                factors: { targets: [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 28, 30], maxPairs: 6 },
                primes: { recallRange: [1, 19], identifyRange: [1, 50] },
                powers: { squareBases: [1, 2, 3, 4, 5, 6, 7, 8], cubeBases: [1, 2, 3, 4], range: [1, 64] },
                commonFactors: { pairs: [[6, 9], [8, 12], [10, 15], [12, 18], [15, 20]] }
            },
            presentation: { styles: ["direct", "recognition", "application"] }
        },
        3: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes", "common_factors", "prime_factors"],
            math: {
                multiples: { bases: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12], range: [1, 100] },
                factors: { targetStr: 'all_up_to_50', maxPairs: 8 },
                primes: { recallRange: [1, 19], identifyRange: [1, 100], includeComposite: true },
                powers: { squareBases: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], cubeBases: [1, 2, 3, 4, 5], range: [1, 100] },
                commonFactors: { range: [1, 50] }
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning"] }
        },
        4: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes", "common_factors", "prime_factors"],
            math: {
                multiples: { bases: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], range: [1, 150] },
                factors: { targetStr: 'all_up_to_100', maxPairs: 12 },
                primes: { recallRange: [1, 19], identifyRange: [1, 120], includeComposite: true, factorization: true },
                powers: { squareBases: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cubeBases: [1, 2, 3, 4, 5, 6], range: [1, 144], mixed: true },
                commonFactors: { range: [1, 100], threeNumbers: true }
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning", "problem_solving"] }
        }
    },
    C05_Y6_CALC: {
        1: {
            operations: ["common_factors", "common_multiples", "identify_primes"],
            math: {
                commonFactors: { pairs: [[6, 9], [8, 12], [10, 15], [12, 16]], maxFactors: 4, hcf: true },
                commonMultiples: { pairs: [[2, 3], [2, 4], [2, 5], [3, 5]], lcm: true, find: 3, max: 60 },
                primes: { range: [1, 50], listLength: 5 }
            },
            presentation: { styles: ["direct", "recognition"] }
        },
        2: {
            operations: ["common_factors", "common_multiples", "identify_primes", "integrated"],
            math: {
                commonFactors: { range: [10, 60], maxFactors: 6, hcf: true },
                commonMultiples: { range: [2, 12], lcm: true, find: 4, max: 100 },
                primes: { range: [1, 100], listLength: 6 },
                integration: "two_concepts"
            },
            presentation: { styles: ["direct", "recognition", "application"] }
        },
        3: {
            operations: ["common_factors", "common_multiples", "identify_primes", "integrated"],
            math: {
                commonFactors: { range: [10, 100], maxFactors: 8, hcf: true, threeNumbers: true },
                commonMultiples: { range: [2, 20], lcm: true, find: 5, max: 150 },
                primes: { range: [1, 150], listLength: 8, tests: true },
                integration: "two_three_concepts"
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning"] }
        },
        4: {
            operations: ["common_factors", "common_multiples", "identify_primes", "integrated"],
            math: {
                commonFactors: { range: [10, 200], maxFactors: 12, hcf: true, threeNumbers: true },
                commonMultiples: { range: [2, 25], lcm: true, find: 6, max: 300, threeNumbers: true },
                primes: { range: [1, 200], listLength: 10, tests: true, gaps: true },
                integration: "three_four_concepts"
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning", "problem_solving"] }
        }
    }
};

export const C05_MODULES = {
    'C05_Y5_CALC': { id: 'C05_Y5_CALC', name: 'Properties of Number', description: 'Multiples, factors, primes, squares, cubes', yearGroup: 'Year 5', strand: 'Properties', ref: 'C5', parameters: MIGRATED_PARAMS['C05_Y5_CALC'] },
    'C05_Y6_CALC': { id: 'C05_Y6_CALC', name: 'Common Factors/Multiples', description: 'Common factors, multiples, primes', yearGroup: 'Year 6', strand: 'Properties', ref: 'C5', parameters: MIGRATED_PARAMS['C05_Y6_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C05_properties.js ---

--- START FILE: src\curriculum\parameters\C06_mental_multiply_divide.js ---
```javascript
/**
 * C06: Mental Multiplication and Division
 * Covers Years 2-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C06_Y2_CALC: {
        1: {
            operations: ["multiply_recall", "divide_recall", "odd_even_identify"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 5 }, product: { max: 50 }, range: { oddEven: [1, 20] } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        3: {
            operations: ["multiply_recall", "divide_recall", "odd_even_patterns", "missing_factor"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 12 }, product: { max: 120 }, range: { oddEven: [1, 100] } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        }
    },
    C06_Y3_CALC: {
        1: {
            operations: ["multiply_recall", "divide_recall", "missing_factor"],
            math: { tables: [3, 4], multiplier: { min: 1, max: 6 }, product: { max: 24 } },
            presentation: { styles: ["equation", "word_problem"] }
        },
        3: {
            operations: ["multiply_recall", "divide_recall", "missing_factor", "fact_families_mult"],
            math: { tables: [3, 4, 8], multiplier: { min: 1, max: 12 }, product: { max: 96 } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        }
    },
    C06_Y4_CALC: {
        1: {
            operations: ["multiply_recall", "divide_recall", "multiply_by_0_1"],
            math: { tables: [6, 7, 9], allTables: [2,3,4,5,6,7,8,9,10], multiplier: { min: 1, max: 10 } },
            presentation: { styles: ["equation"] }
        },
        3: {
            operations: ["multiply_recall", "divide_recall", "multiply_three", "factor_pairs", "commutativity"],
            math: { tables: [2,3,4,5,6,7,8,9,10,11,12], multiplier: { min: 0, max: 12 }, product: { max: 144 }, range: { factors: [1, 144] } },
            presentation: { styles: ["equation", "word_problem", "reasoning"] }
        }
    },
    C06_Y5_CALC: {
        1: {
            operations: ["multiply_by_10", "divide_by_10"],
            math: { tables: [2,3,4,5,6,7,8,9,10,11,12], powers: [10], range: { whole: [1, 100] }, decimals: { allow: true, places: 1 } },
            presentation: { styles: ["equation"] }
        },
        3: {
            operations: ["multiply_by_1000", "divide_by_1000", "partition_multiply"],
            math: { powers: [10, 100, 1000], range: { whole: [1, 10000] }, decimals: { allow: true, places: 2 } },
            presentation: { styles: ["equation", "reasoning"] }
        }
    },
    C06_Y6_CALC: {
        1: {
            operations: ["two_operation_add_mult", "parentheses_simple"],
            math: { range: { num: [1, 1000] }, config: { maxOps: 2, parentheses: true } },
            presentation: { styles: ["equation"] }
        },
        3: {
            operations: ["four_operations", "parentheses_nested", "order_of_operations", "squares_in_calc"],
            math: { range: { num: [1, 100000] }, config: { maxOps: 4, parentheses: true, squares: true } },
            presentation: { styles: ["equation", "reasoning"] }
        }
    }
};

export const C06_MODULES = {
    'C06_Y2_CALC': { id: 'C06_Y2_CALC', name: 'C06_Y2_CALC: 2, 5, 10 Tables', ref: 'C6', parameters: MIGRATED_PARAMS['C06_Y2_CALC'] },
    'C06_Y3_CALC': { id: 'C06_Y3_CALC', name: 'C06_Y3_CALC: 3, 4, 8 Tables', ref: 'C6', parameters: MIGRATED_PARAMS['C06_Y3_CALC'] },
    'C06_Y4_CALC': { id: 'C06_Y4_CALC', name: 'C06_Y4_CALC: 12x12 Tables', ref: 'C6', parameters: MIGRATED_PARAMS['C06_Y4_CALC'] },
    'C06_Y5_CALC': { id: 'C06_Y5_CALC', name: 'C06_Y5_CALC: Powers of 10', ref: 'C6', parameters: MIGRATED_PARAMS['C06_Y5_CALC'] },
    'C06_Y6_CALC': { id: 'C06_Y6_CALC', name: 'C06_Y6_CALC: Mixed Ops', ref: 'C6', parameters: MIGRATED_PARAMS['C06_Y6_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C06_mental_multiply_divide.js ---

--- START FILE: src\curriculum\parameters\C07_written_multiply_divide.js ---
```javascript
/**
 * C07: Written Multiplication and Division
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C07_Y2_CALC: {
        1: {
            operations: ["write_multiplication", "calculate_multiply"],
            math: { tables: [2, 5, 10], multiplier: { min: 1, max: 5 }, product: { max: 50 } },
            presentation: { styles: ["equation"] }
        }
    },
    C07_Y3_CALC: {
        1: {
            operations: ["columnar_multiply"],
            math: { range: { multiplicand: [11, 33], multiplier: [2, 3] }, config: { carry: false } },
            presentation: { styles: ["columnar"] }
        }
    },
    C07_Y4_CALC: {
        1: {
            operations: ["columnar_multiply", "grid_method"],
            math: { range: { multiplicand: [11, 99], multiplier: [2, 7] }, digits: [2], config: { carry: "sometimes" } },
            presentation: { styles: ["columnar"] }
        }
    },
    C07_Y5_CALC: {
        1: {
            operations: ["columnar_multiply_1digit", "short_division"],
            math: { range: { multiply: [11, 999], divide: [12, 99] }, digits: { mult: [2,3] }, config: { remainders: true } },
            presentation: { styles: ["columnar"] }
        }
    },
    C07_Y6_CALC: {
        1: {
            operations: ["long_multiply_2digit", "long_division"],
            math: { range: { multiply: [11, 999], divide: [100, 999] }, factors: { mult: [11, 50] }, config: { remainderType: ["whole", "fraction"] } },
            presentation: { styles: ["long_division"] }
        }
    }
};

export const C07_MODULES = {
    'C07_Y2_CALC': { id: 'C07_Y2_CALC', name: 'C07_Y2: Written Statements', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y2_CALC'] },
    'C07_Y3_CALC': { id: 'C07_Y3_CALC', name: 'C07_Y3: 2-Digit Written', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y3_CALC'] },
    'C07_Y4_CALC': { id: 'C07_Y4_CALC', name: 'C07_Y4: 3-Digit Written', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y4_CALC'] },
    'C07_Y5_CALC': { id: 'C07_Y5_CALC', name: 'C07_Y5: Long Mult/Short Div', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y5_CALC'] },
    'C07_Y6_CALC': { id: 'C07_Y6_CALC', name: 'C07_Y6: Long Division', ref: 'C7', parameters: MIGRATED_PARAMS['C07_Y6_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C07_written_multiply_divide.js ---

--- START FILE: src\curriculum\parameters\C08_properties.js ---
```javascript
/**
 * C08: Properties Problems
 * Years 1-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C08_Y1_CALC: {
        1: { operations: ["equal_groups_visual"], math: { tables: [2,5,10], maxProduct: 10, groups: { min: 2, max: 2 } }, presentation: { visuals: true } }
    },
    C08_Y2_CALC: {
        1: { operations: ["equal_groups", "array_multiplication"], math: { tables: [2,5,10], maxProduct: 50 }, presentation: { format: "multiple_choice" } }
    },
    C08_Y3_CALC: {
        1: { operations: ["integer_scaling"], math: { tables: [2,3,4,5], maxProduct: 100, scaling: [2,3,5] }, presentation: { format: "multiple_choice" } }
    },
    C08_Y4_CALC: {
        1: { operations: ["distributive_simple"], math: { tables: [2,3,4,5], maxProduct: 200 }, presentation: { format: "multiple_choice" } }
    },
    C08_Y5_CALC: {
        1: { operations: ["factor_problems", "multiple_problems"], math: { range: { max: 1000 }, factors: [1, 100] }, presentation: { format: "multiple_choice" } }
    },
    C08_Y6_CALC: {
        1: { operations: ["two_step_mixed", "ratio_problems"], math: { range: { max: 10000 }, ops: [2, 3] }, presentation: { format: "multiple_choice" } }
    }
};

export const C08_MODULES = {
    'C08_Y1_CALC': { id: 'C08_Y1_CALC', name: 'C08_Y1: Visual Problems', ref: 'C8', parameters: MIGRATED_PARAMS['C08_Y1_CALC'] },
    'C08_Y2_CALC': { id: 'C08_Y2_CALC', name: 'C08_Y2: Problems', ref: 'C8', parameters: MIGRATED_PARAMS['C08_Y2_CALC'] },
    'C08_Y3_CALC': { id: 'C08_Y3_CALC', name: 'C08_Y3: Scaling', ref: 'C8', parameters: MIGRATED_PARAMS['C08_Y3_CALC'] },
    'C08_Y4_CALC': { id: 'C08_Y4_CALC', name: 'C08_Y4: Distributive', ref: 'C8', parameters: MIGRATED_PARAMS['C08_Y4_CALC'] },
    'C08_Y5_CALC': { id: 'C08_Y5_CALC', name: 'C08_Y5: Factors/Multiples', ref: 'C8', parameters: MIGRATED_PARAMS['C08_Y5_CALC'] },
    'C08_Y6_CALC': { id: 'C08_Y6_CALC', name: 'C08_Y6: Mixed Problems', ref: 'C8', parameters: MIGRATED_PARAMS['C08_Y6_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C08_properties.js ---

--- START FILE: src\curriculum\parameters\C09_order.js ---
```javascript
/**
 * C09: Order of Operations
 * Year 6 only
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C09_Y6_CALC: {
        1: {
            operations: ["simple_two_operation", "order_identification"],
            math: { range: { num: [1, 12] }, config: { maxOps: 2, parentheses: false } },
            presentation: { format: "multiple_choice" }
        },
        3: {
            operations: ["three_operation_mixed", "complex_parentheses"],
            math: { range: { num: [1, 25] }, config: { maxOps: 4, parentheses: true } },
            presentation: { format: "text_input" }
        }
    }
};

export const C09_MODULES = {
    'C09_Y6_CALC': { id: 'C09_Y6_CALC', name: 'C09_Y6: Order of Ops', ref: 'C9', parameters: MIGRATED_PARAMS['C09_Y6_CALC'] }
};
```
--- END FILE: src\curriculum\parameters\C09_order.js ---

--- START FILE: src\curriculum\parameters\M01_measurement.js ---
```javascript
/**
 * M01: Comparison
 * Years 1-4
 * Schema: V2
 */

const MIGRATED_PARAMS = {
    M01_Y1_MEAS: {
        1: { operations: ["compare_two"], math: { types: ["length", "height", "mass"] }, presentation: { useDescriptors: false } },
        2: { operations: ["compare_two", "complete_comparative"], math: { types: ["length", "height", "mass", "capacity"] }, presentation: { useDescriptors: false } },
        3: { operations: ["compare_two", "complete_comparative", "identify_more_less"], math: { types: ["length", "height", "mass", "capacity", "time"] }, presentation: { useDescriptors: false } },
        4: { operations: ["compare_two", "complete_comparative", "identify_more_less"], math: { types: ["length", "height", "mass", "capacity", "time"] }, presentation: { useDescriptors: true } }
    },
    M01_Y2_MEAS: {
        1: { operations: ["compare_with_symbols", "order_two"], math: { types: ["length", "mass"], range: { min: 1, max: 20 }, useUnits: false, allowEquals: false } },
        2: { operations: ["compare_with_symbols", "order_two", "order_three"], math: { types: ["length", "mass", "capacity"], range: { min: 1, max: 50 }, useUnits: true, units: { length: ["cm"], mass: ["g"], capacity: ["ml"] }, allowEquals: false } },
        3: { operations: ["compare_with_symbols", "order_three", "complete_comparison"], math: { types: ["length", "mass", "capacity"], range: { min: 1, max: 100 }, useUnits: true, units: { length: ["cm"], mass: ["g"], capacity: ["ml"] }, allowEquals: true } },
        4: { operations: ["compare_with_symbols", "order_three", "order_four", "complete_comparison"], math: { types: ["length", "mass", "capacity"], range: { min: 1, max: 100 }, useUnits: true, units: { length: ["cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, allowEquals: true } }
    },
    M01_Y3_MEAS: {
        1: { operations: ["compare_same_units", "order_same_units"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { cm: { min: 1, max: 100 }, m: { min: 1, max: 10 }, g: { min: 10, max: 500 }, kg: { min: 1, max: 10 }, ml: { min: 10, max: 500 }, l: { min: 1, max: 5 } }, sameUnitOnly: true } },
        2: { operations: ["compare_same_units", "order_same_units", "compare_mixed_units_simple"], math: { types: ["length", "mass", "capacity"], units: { length: ["mm", "cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { mm: { min: 10, max: 200 }, cm: { min: 1, max: 200 }, m: { min: 1, max: 20 }, g: { min: 10, max: 1000 }, kg: { min: 1, max: 20 }, ml: { min: 10, max: 1000 }, l: { min: 1, max: 10 } }, simpleConversions: true } },
        3: { operations: ["compare_same_units", "compare_mixed_units", "order_mixed_units"], math: { types: ["length", "mass", "capacity"], units: { length: ["mm", "cm", "m"], mass: ["g", "kg"], capacity: ["ml", "l"] }, ranges: { mm: { min: 10, max: 500 }, cm: { min: 1, max: 500 }, m: { min: 1, max: 100 }, g: { min: 10, max: 2000 }, kg: { min: 1, max: 50 }, ml: { min: 10, max: 2000 }, l: { min: 1, max: 20 } } } }
    },
    M01_Y4_MEAS: {
        1: { operations: ["compare_measures", "order_measures", "compare_money"], math: { types: ["length", "mass", "capacity", "money"], units: { length: ["mm", "cm", "m"], money: ["p", "£"] }, ranges: { mm: { min: 10, max: 500 }, cm: { min: 1, max: 500 }, p: { min: 1, max: 99 }, pounds: { min: 1, max: 20 } }, moneyFormat: "simple" } },
        2: { operations: ["compare_measures", "order_measures", "compare_money", "order_money"], math: { types: ["length", "mass", "capacity", "money"], units: { length: ["mm", "cm", "m", "km"], money: ["p", "£", "mixed"] }, ranges: { mm: { min: 10, max: 1000 }, km: { min: 1, max: 10 }, pounds: { min: 1, max: 50 } }, moneyFormat: "mixed" } }
    }
};

export const M01_MODULES = {
    'M01_Y1_MEAS': { id: 'M01_Y1_MEAS', name: 'M01_Y1: Comparing', ref: 'M1', parameters: MIGRATED_PARAMS['M01_Y1_MEAS'] },
    'M01_Y2_MEAS': { id: 'M01_Y2_MEAS', name: 'M01_Y2: Order Measures', ref: 'M1', parameters: MIGRATED_PARAMS['M01_Y2_MEAS'] },
    'M01_Y3_MEAS': { id: 'M01_Y3_MEAS', name: 'M01_Y3: Compare Units', ref: 'M1', parameters: MIGRATED_PARAMS['M01_Y3_MEAS'] },
    'M01_Y4_MEAS': { id: 'M01_Y4_MEAS', name: 'M01_Y4: Different Measures', ref: 'M1', parameters: MIGRATED_PARAMS['M01_Y4_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M01_measurement.js ---

--- START FILE: src\curriculum\parameters\M02_measurement_scales.js ---
```javascript
/**
 * M02: Scales
 * Years 1-4
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M02_Y1_MEAS: {
        1: { operations: ["read_simple_scale"], math: { types: ["length", "capacity"], scale: { max: 10, interval: 1 } }, presentation: { showAllNumbers: true, pointerOnMark: true } },
        3: { operations: ["read_simple_scale", "choose_unit", "count_marks"], math: { types: ["length", "mass", "capacity", "time"], scale: { max: 20, interval: 1 } }, presentation: { showAllNumbers: false, pointerOnMark: true } }
    },
    M02_Y2_MEAS: {
        1: { operations: ["read_scale_with_units", "choose_appropriate_unit"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm"], mass: ["g"], capacity: ["ml"] }, ranges: { cm: { min: 0, max: 30, interval: 1 }, g: { min: 0, max: 100, interval: 10 }, ml: { min: 0, max: 100, interval: 10 } } }, presentation: { pointerOnMark: true } }
    },
    M02_Y3_MEAS: {
        1: { operations: ["read_scale_precise", "read_different_scales"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "mm"] }, ranges: { cm: { min: 0, max: 30, interval: 1 }, mm: { min: 0, max: 100, interval: 10 } }, useDecimals: false }, presentation: { pointerOnMark: true } },
        3: { operations: ["read_scale_precise", "measure_between_marks"], math: { types: ["length", "mass", "capacity"], units: { length: ["cm", "m"] }, ranges: { cm: { min: 0, max: 200, interval: 2 }, m: { min: 0, max: 50, interval: 5 } }, useDecimals: true }, presentation: { pointerOnMark: false } }
    },
    M02_Y4_MEAS: {
        1: { operations: ["estimate_measurement", "choose_reasonable_estimate"], math: { types: ["length", "mass", "capacity", "money"], ranges: { length: { objects: ["pencil", "book"], units: ["cm"] } } } }
    }
};

export const M02_MODULES = {
    'M02_Y1_MEAS': { id: 'M02_Y1_MEAS', name: 'M02_Y1: Scales', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y1_MEAS'] },
    'M02_Y2_MEAS': { id: 'M02_Y2_MEAS', name: 'M02_Y2: Standard Units', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y2_MEAS'] },
    'M02_Y3_MEAS': { id: 'M02_Y3_MEAS', name: 'M02_Y3: Precision', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y3_MEAS'] },
    'M02_Y4_MEAS': { id: 'M02_Y4_MEAS', name: 'M02_Y4: Estimation', ref: 'M2', parameters: MIGRATED_PARAMS['M02_Y4_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M02_measurement_scales.js ---

--- START FILE: src\curriculum\parameters\M03_money.js ---
```javascript
/**
 * M03: Money
 * Years 1-3
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M03_Y1_MEAS: {
        1: { operations: ["identify_coin_value", "state_coin_value"], math: { denominations: [1, 2, 5, 10], pounds: false, notes: false, max: 10 } },
        3: { operations: ["identify_coin_value", "compare_two_coins", "order_coins"], math: { denominations: [1, 2, 5, 10, 20, 50, 100, 200], pounds: true, notes: false, max: 200 } }
    },
    M03_Y2_MEAS: {
        1: { operations: ["use_pence_symbol", "combine_same_coins"], math: { denominations: [1, 2, 5, 10], target: { min: 2, max: 20 }, maxCoins: 5, symbol: "pence_only" } },
        3: { operations: ["use_pence_symbol", "use_pounds_symbol", "combine_mixed_coins", "convert_pounds_pence"], math: { denominations: [1, 2, 5, 10, 20, 50, 100], target: { min: 10, max: 100 }, maxCoins: 7, symbol: "both", conversions: true } }
    },
    M03_Y3_MEAS: {
        1: { operations: ["recognize_all_coins", "convert_pounds_pence", "combine_amounts"], math: { denominations: [1, 2, 5, 10, 20, 50, 100, 200], target: { min: 10, max: 100 }, notes: false, conversions: true, format: "simple" } },
        3: { operations: ["recognize_all_denominations", "convert_pounds_pence", "make_amount_efficient", "solve_change_problems"], math: { denominations: [1, 2, 5, 10, 20, 50, 100, 200], target: { min: 50, max: 500 }, notes: true, noteValues: [500, 1000, 2000], conversions: true, format: "mixed", change: true } }
    }
};

export const M03_MODULES = {
    'M03_Y1_MEAS': { id: 'M03_Y1_MEAS', name: 'M03_Y1: Coins', ref: 'M3', parameters: MIGRATED_PARAMS['M03_Y1_MEAS'] },
    'M03_Y2_MEAS': { id: 'M03_Y2_MEAS', name: 'M03_Y2: Pounds & Pence', ref: 'M3', parameters: MIGRATED_PARAMS['M03_Y2_MEAS'] },
    'M03_Y3_MEAS': { id: 'M03_Y3_MEAS', name: 'M03_Y3: Consolidation', ref: 'M3', parameters: MIGRATED_PARAMS['M03_Y3_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M03_money.js ---

--- START FILE: src\curriculum\parameters\M04_time.js ---
```javascript
/**
 * M04: Time
 * Years 1-5
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M04_Y1_MEAS: {
        1: { operations: ["read_oclock", "identify_oclock"], math: { hours: [1, 2, 3, 6, 9, 12], halfPast: false }, presentation: { types: ["oclock"] } },
        3: { operations: ["read_oclock", "read_half_past", "sequence_events"], math: { hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], halfPast: true }, presentation: { types: ["oclock", "half_past"], sequence: ["order_three_events", "before_after"] } }
    },
    M04_Y2_MEAS: {
        1: { operations: ["read_oclock", "read_half_past", "read_quarter_past"], math: { minutes: [0, 15, 30], hours: [1, 2, 3, 6, 9, 12], quarterTo: false }, presentation: { types: ["oclock", "half_past", "quarter_past"] } },
        3: { operations: ["read_five_minutes", "write_time", "identify_time"], math: { minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], hours: [1,2,3,4,5,6,7,8,9,10,11,12], quarterTo: true, facts: ["minutes_in_hour", "hours_in_day"] }, presentation: { types: ["five_minute_intervals"] } }
    },
    M04_Y3_MEAS: {
        1: { operations: ["read_to_minute", "write_12hour"], math: { minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], roman: false }, presentation: { types: ["12_hour"] } },
        3: { operations: ["read_to_minute", "write_24hour", "am_pm_identification"], math: { minutes: [0,1,2,3,4,5,10,15,20,30,45,55], hours24: [0,1,2,12,13,14,15,20,23], roman: true, facts: ["seconds_in_minute", "days_in_week", "days_in_year"] }, presentation: { types: ["12_hour", "24_hour"] } }
    },
    M04_Y4_MEAS: {
        1: { operations: ["convert_12hour_formats", "convert_hours_to_minutes"], math: { ranges: { hours: [1,2,3,12], minutes: [0,15,30] }, conversions: { hours: { min: 1, max: 5 } }, include24: false } },
        3: { operations: ["convert_to_24hour", "convert_minutes_to_seconds", "convert_years_to_months"], math: { ranges: { hours: [1,2,3,12], hours24: [13,14,15,20], minutes: [0,15,30,45] }, conversions: { hours: { min: 1, max: 24 }, minutes: { min: 1, max: 120 }, years: { min: 1, max: 5 } }, include24: true } }
    },
    M04_Y5_MEAS: {
        1: { operations: ["convert_simple_problems", "hours_minutes_problems"], math: { problemTypes: ["hours_to_minutes", "simple_duration"], ranges: { hours: { min: 1, max: 12 } } }, presentation: { multiStep: false } },
        3: { operations: ["convert_problems", "duration_problems", "mixed_unit_problems", "multi_step_problems"], math: { problemTypes: ["hours_to_minutes", "minutes_to_seconds", "duration_calculation", "multi_step"], ranges: { hours: { min: 1, max: 48 }, minutes: { min: 60, max: 720 } } }, presentation: { multiStep: true } }
    }
};

export const M04_MODULES = {
    'M04_Y1_MEAS': { id: 'M04_Y1_MEAS', name: 'M04_Y1: O\'clock/Half Past', ref: 'M4', parameters: MIGRATED_PARAMS['M04_Y1_MEAS'] },
    'M04_Y2_MEAS': { id: 'M04_Y2_MEAS', name: 'M04_Y2: 5 Minutes', ref: 'M4', parameters: MIGRATED_PARAMS['M04_Y2_MEAS'] },
    'M04_Y3_MEAS': { id: 'M04_Y3_MEAS', name: 'M04_Y3: Analogue/Vocab', ref: 'M4', parameters: MIGRATED_PARAMS['M04_Y3_MEAS'] },
    'M04_Y4_MEAS': { id: 'M04_Y4_MEAS', name: 'M04_Y4: Conversions', ref: 'M4', parameters: MIGRATED_PARAMS['M04_Y4_MEAS'] },
    'M04_Y5_MEAS': { id: 'M04_Y5_MEAS', name: 'M04_Y5: Problems', ref: 'M4', parameters: MIGRATED_PARAMS['M04_Y5_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M04_time.js ---

--- START FILE: src\curriculum\parameters\M05_conversions.js ---
```javascript
/**
 * M05: Metric Conversions
 * Year 5
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M05_Y5_MEAS: {
        1: { operations: ["direct_conversion"], math: { types: ["length", "mass", "capacity"], conversions: { length: ["km_to_m"], mass: ["kg_to_g"], capacity: ["l_to_ml"] }, valueType: ["whole_only"], ranges: { km: { min: 1, max: 10 } } }, presentation: { wordProblems: false } },
        3: { operations: ["direct_conversion", "reverse_conversion", "word_problem"], math: { types: ["length", "mass", "capacity"], conversions: { length: ["km_to_m", "m_to_cm"], mass: ["kg_to_g"], capacity: ["l_to_ml"] }, valueType: ["whole", "decimal"], ranges: { km: { min: 1, max: 100 }, m: { min: 1, max: 10000 } }, decimalPlaces: 2 }, presentation: { wordProblems: true } }
    }
};

export const M05_MODULES = {
    'M05_Y5_MEAS': { id: 'M05_Y5_MEAS', name: 'M05_Y5: Metric', ref: 'M5', parameters: MIGRATED_PARAMS['M05_Y5_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M05_conversions.js ---

--- START FILE: src\curriculum\parameters\M06_conversions_mixed.js ---
```javascript
/**
 * M06: Mixed Conversions
 * Years 4-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M06_Y4_MEAS: {
        1: { operations: ["direct_metric_conversion", "time_conversion"], math: { types: ["length", "time"], conversions: { length: ["km_to_m"], time: ["hours_to_minutes"] }, ranges: { km: { min: 1, max: 10 }, hours: { min: 1, max: 12 } } } },
        3: { operations: ["direct_metric_conversion", "reverse_metric_conversion", "word_problem"], math: { types: ["length", "mass", "time"], conversions: { length: ["m_to_cm"], mass: ["kg_to_g"], time: ["minutes_to_seconds"] }, ranges: { m: { min: 100, max: 10000 }, kg: { min: 1, max: 100 } } }, presentation: { wordProblems: true } }
    },
    M06_Y5_MEAS: {
        1: { operations: ["approximate_conversion_metric_to_imperial"], math: { types: ["length", "mass"], conversions: { length: ["inches_to_cm"], mass: ["pounds_to_g"] }, ranges: { inches: { min: 1, max: 12 } }, valueType: ["whole_only"] }, presentation: { approximate: true } },
        3: { operations: ["approximate_conversion_metric_to_imperial", "word_problem"], math: { types: ["length", "mass", "capacity"], conversions: { length: ["miles_to_km"], capacity: ["pints_to_ml"] }, ranges: { miles: { min: 1, max: 50 } }, valueType: ["whole", "decimal"], decimalPlaces: 2 }, presentation: { approximate: true, wordProblems: true } }
    },
    M06_Y6_MEAS: {
        1: { operations: ["metric_conversion_larger_to_smaller", "metric_conversion_smaller_to_larger"], math: { types: ["length", "mass"], conversions: { length: ["km_to_m"], mass: ["kg_to_g"] }, ranges: { km: { min: 0.5, max: 20 } }, valueType: ["whole", "decimal_1dp"], decimalPlaces: 3 } },
        3: { operations: ["imperial_metric_conversion", "word_problem"], math: { types: ["length", "time"], conversions: { length: ["miles_to_km"], time: ["hours_to_minutes"] }, ranges: { miles: { min: 0.5, max: 200 } }, valueType: ["decimal_2dp"] }, presentation: { wordProblems: true } }
    }
};

export const M06_MODULES = {
    'M06_Y4_MEAS': { id: 'M06_Y4_MEAS', name: 'M06_Y4: Mixed', ref: 'M6', parameters: MIGRATED_PARAMS['M06_Y4_MEAS'] },
    'M06_Y5_MEAS': { id: 'M06_Y5_MEAS', name: 'M06_Y5: Imperial', ref: 'M6', parameters: MIGRATED_PARAMS['M06_Y5_MEAS'] },
    'M06_Y6_MEAS': { id: 'M06_Y6_MEAS', name: 'M06_Y6: Standard', ref: 'M6', parameters: MIGRATED_PARAMS['M06_Y6_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M06_conversions_mixed.js ---

--- START FILE: src\curriculum\parameters\M07_perimeter_area.js ---
```javascript
/**
 * M07: Perimeter & Area
 * Years 3-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M07_Y3_MEAS: {
        1: { operations: ["rectangle_perimeter", "square_perimeter"], math: { side: { min: 2, max: 10 }, units: ["cm"], mixedUnits: false } }
    },
    M07_Y4_MEAS: {
        1: { operations: ["rectilinear_perimeter", "count_squares"], math: { side: { min: 2, max: 8 }, grid: [4, 4], units: ["cm"] }, presentation: { showAllSides: true } }
    },
    M07_Y5_MEAS: {
        1: { operations: ["rectangle_area", "square_area", "composite_perimeter"], math: { dim: { min: 2, max: 10 }, units: ["cm"], squareUnits: true, complexity: "simple" } }
    },
    M07_Y6_MEAS: {
        1: { operations: ["parallelogram_area", "triangle_area"], math: { dim: { min: 3, max: 12 }, units: ["cm"], formulaRecog: false } }
    }
};

export const M07_MODULES = {
    'M07_Y3_MEAS': { id: 'M07_Y3_MEAS', name: 'M07_Y3: Simple Perimeter', ref: 'M7', parameters: MIGRATED_PARAMS['M07_Y3_MEAS'] },
    'M07_Y4_MEAS': { id: 'M07_Y4_MEAS', name: 'M07_Y4: Perimeter/Area', ref: 'M7', parameters: MIGRATED_PARAMS['M07_Y4_MEAS'] },
    'M07_Y5_MEAS': { id: 'M07_Y5_MEAS', name: 'M07_Y5: Composite', ref: 'M7', parameters: MIGRATED_PARAMS['M07_Y5_MEAS'] },
    'M07_Y6_MEAS': { id: 'M07_Y6_MEAS', name: 'M07_Y6: Formulas', ref: 'M7', parameters: MIGRATED_PARAMS['M07_Y6_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M07_perimeter_area.js ---

--- START FILE: src\curriculum\parameters\M08_volume.js ---
```javascript
/**
 * M08: Volume
 * Years 5-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M08_Y5_MEAS: {
        1: { operations: ["count_unit_cubes", "estimate_capacity"], math: { dim: { min: 2, max: 4 }, objects: [{ name: 'cup', capacity: 250 }], useLitres: false } }
    },
    M08_Y6_MEAS: {
        1: { operations: ["calculate_volume", "cube_volume"], math: { dim: { min: 2, max: 10 }, units: ["cm"], missingDim: false } }
    }
};

export const M08_MODULES = {
    'M08_Y5_MEAS': { id: 'M08_Y5_MEAS', name: 'M08_Y5: Estimate', ref: 'M8', parameters: MIGRATED_PARAMS['M08_Y5_MEAS'] },
    'M08_Y6_MEAS': { id: 'M08_Y6_MEAS', name: 'M08_Y6: Calculate', ref: 'M8', parameters: MIGRATED_PARAMS['M08_Y6_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M08_volume.js ---

--- START FILE: src\curriculum\parameters\M09_problems.js ---
```javascript
/**
 * M09: Measurement Problems
 * Years 2-6
 * Schema: V2
 */
const MIGRATED_PARAMS = {
    M09_Y2_MEAS: {
        1: { operations: ["add_money", "subtract_money"], math: { unit: "pence_only", range: { min: 5, max: 50 }, totalMax: 50 }, presentation: { contexts: ["shopping"], change: false } }
    },
    M09_Y3_MEAS: {
        1: { operations: ["add_measure", "subtract_measure"], math: { types: ["money", "length"], money: { unit: "pence_only", range: [10, 99] }, length: { unit: "cm", range: [10, 100] } }, presentation: { contexts: ["shopping", "measuring"] } }
    },
    M09_Y4_MEAS: {
        1: { operations: ["multiply_measure", "divide_measure"], math: { types: ["money", "length"], money: { format: "whole_pounds", range: [1, 20] }, mult: [2,3,4,5] }, presentation: { contexts: ["shopping", "recipes"] } }
    },
    M09_Y5_MEAS: {
        1: { operations: ["multiply_decimal", "add_decimal"], math: { types: ["money", "length"], decimal: 1, money: { range: [0.5, 10] }, mult: [2,3,4,5] }, presentation: { contexts: ["shopping"] } }
    },
    M09_Y6_MEAS: {
        1: { operations: ["convert_length", "convert_mass"], math: { conversions: { length: ["km_to_m"], mass: ["kg_to_g"] }, decimal: [1, 2], range: { km: [0.5, 10] } }, presentation: { contexts: ["science", "DIY"] } }
    }
};

export const M09_MODULES = {
    'M09_Y2_MEAS': { id: 'M09_Y2_MEAS', name: 'M09_Y2: Money Problems', ref: 'M9', parameters: MIGRATED_PARAMS['M09_Y2_MEAS'] },
    'M09_Y3_MEAS': { id: 'M09_Y3_MEAS', name: 'M09_Y3: Multi-Measure', ref: 'M9', parameters: MIGRATED_PARAMS['M09_Y3_MEAS'] },
    'M09_Y4_MEAS': { id: 'M09_Y4_MEAS', name: 'M09_Y4: Four Ops', ref: 'M9', parameters: MIGRATED_PARAMS['M09_Y4_MEAS'] },
    'M09_Y5_MEAS': { id: 'M09_Y5_MEAS', name: 'M09_Y5: Decimal', ref: 'M9', parameters: MIGRATED_PARAMS['M09_Y5_MEAS'] },
    'M09_Y6_MEAS': { id: 'M09_Y6_MEAS', name: 'M09_Y6: Conversions', ref: 'M9', parameters: MIGRATED_PARAMS['M09_Y6_MEAS'] }
};
```
--- END FILE: src\curriculum\parameters\M09_problems.js ---

--- START FILE: src\curriculum\parameters\N01_counting.js ---
```javascript
/**
 * N01 Module Series: Counting in Multiples
 * Covers Years 1-5 progression for counting in multiples
 * 
 * Schema: V2 (Nested)
 */

// Generated parameters from migration
const MIGRATED_PARAMS = {
    N01_Y1_NPV: {
        1: {
            math: {
                range: { min: 0, max: 20 },
                sequence: {
                    steps: [1, 2],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 50 },
                sequence: {
                    steps: [1, 2, 5],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [1, 2, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [2, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y2_NPV: {
        1: {
            math: {
                range: { min: 0, max: 30 },
                sequence: {
                    steps: [2, 3, 5],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 50 },
                sequence: {
                    steps: [2, 3, 5, 10],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple",
                    tensFromAny: true,
                    tensRange: [0, 50]
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [2, 3, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any",
                    tensFromAny: true,
                    tensRange: [0, 100]
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [2, 3, 5, 10],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any",
                    tensFromAny: true,
                    tensRange: [0, 100]
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y3_NPV: {
        1: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [4, 8, 50],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 400 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 600 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 800 },
                sequence: {
                    steps: [4, 8, 50, 100],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y4_NPV: {
        1: {
            math: {
                range: { min: 0, max: 100 },
                sequence: {
                    steps: [6, 7, 9],
                    length: 4,
                    directions: ["forwards"],
                    startStrategy: "zero_only"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 300 },
                sequence: {
                    steps: [6, 7, 9, 25],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "zero_or_multiple"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 5000 },
                sequence: {
                    steps: [6, 7, 9, 25, 1000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 10000 },
                sequence: {
                    steps: [6, 7, 9, 25, 1000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    },
    N01_Y5_NPV: {
        1: {
            math: {
                range: { min: 0, max: 10000 },
                sequence: {
                    steps: [10, 100],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: 0, max: 50000 },
                sequence: {
                    steps: [10, 100, 1000],
                    length: 4,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: 0, max: 500000 },
                sequence: {
                    steps: [10, 100, 1000, 10000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        4: {
            math: {
                range: { min: 0, max: 1000000 },
                sequence: {
                    steps: [10, 100, 1000, 10000, 100000],
                    length: 3,
                    directions: ["forwards", "backwards"],
                    startStrategy: "any"
                }
            },
            presentation: {
                gaps: { position: "random", count: 1 }
            }
        }
    }
};

export const N01_MODULES = {
    'N01_Y1_NPV': {
        id: 'N01_Y1_NPV',
        name: 'N01_Y1_NPV: Counting in Multiples',
        description: 'Count to and across 100, forwards and backwards, beginning with 0 or 1, or from any given number; count in multiples of twos, fives and tens',
        icon: '🔢',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: MIGRATED_PARAMS['N01_Y1_NPV']
    },

    'N01_Y2_NPV': {
        id: 'N01_Y2_NPV',
        name: 'N01_Y2_NPV: Counting in Steps',
        description: 'Count in steps of 2, 3, and 5 from 0, and in tens from any number, forward and backward',
        icon: '🔢',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: MIGRATED_PARAMS['N01_Y2_NPV']
    },

    'N01_Y3_NPV': {
        id: 'N01_Y3_NPV',
        name: 'N01_Y3_NPV: Counting from 0',
        description: 'Count from 0 in multiples of 4, 8, 50 and 100',
        icon: '🔢',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: MIGRATED_PARAMS['N01_Y3_NPV']
    },

    'N01_Y4_NPV': {
        id: 'N01_Y4_NPV',
        name: 'N01_Y4_NPV: Count in Multiples',
        description: 'Count in multiples of 6, 7, 9, 25 and 1,000',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: MIGRATED_PARAMS['N01_Y4_NPV']
    },

    'N01_Y5_NPV': {
        id: 'N01_Y5_NPV',
        name: 'N01_Y5_NPV: Counting in Powers of 10',
        description: 'count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Counting (in multiples)',
        ref: 'N1',
        parameters: MIGRATED_PARAMS['N01_Y5_NPV']
    }
};
```
--- END FILE: src\curriculum\parameters\N01_counting.js ---

--- START FILE: src\curriculum\parameters\N02_readwrite.js ---
```javascript
/**
 * N02 Module Series: Read, Write, Order and Compare Numbers
 * Covers Years 2-6 progression
 */

export const N02_MODULES = {
    'N02_Y1_NPV': {
        id: 'N02_Y1_NPV',
        name: 'N02_Y1_NPV: Read and Write Numbers to 100',
        description: 'Count, read and write numbers to 100 in numerals; given a number, identify one more and one less; read and write numbers from 1 to 20 in numerals and words',
        icon: '🔤',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 0,
                max_value: 10,
                word_min: 0,
                word_max: 10,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral'],
                order_count_max: 2
            },
            2: {
                min_value: 0,
                max_value: 20,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two'],
                order_count_max: 2
            },
            3: {
                min_value: 0,
                max_value: 50,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'order_two'],
                order_count_max: 2
            },
            4: {
                min_value: 0,
                max_value: 100,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'order_two', 'order_three'],
                order_count_max: 3
            }
        }
    },

    'N02_Y2_NPV': {
        id: 'N02_Y2_NPV',
        name: 'N02_Y2_NPV: Read and Write Numbers',
        description: 'read and write numbers to at least 100 in numerals and in words; compare and order numbers from 0 up to 100; use <, > and = signs',
        icon: '🔤',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 0,
                max_value: 50,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
                order_count_max: 3
            },
            2: {
                min_value: 0,
                max_value: 100,
                word_min: 0,
                word_max: 50,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three', 'order_four', 'complete_statement', 'true_false'],
                order_count_max: 4
            },
            3: {
                min_value: 0,
                max_value: 100,
                word_min: 0,
                word_max: 100,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'between'],
                order_count_max: 4
            },
            4: {
                min_value: 0,
                max_value: 120,
                word_min: 0,
                word_max: 100,
                operations: ['identify_numeral', 'one_more', 'one_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false', 'between'],
                order_count_max: 5
            }
        }
    },

    'N02_Y3_NPV': {
        id: 'N02_Y3_NPV',
        name: 'N02_Y3_NPV: Numbers to 1000',
        description: 'compare and order numbers up to 1,000; read and write numbers to 1,000 in numerals and in words; find 10 or 100 more or less than a given number',
        icon: '🔤',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 0,
                max_value: 200,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'one_more', 'one_less', 'ten_more', 'ten_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_two', 'order_three'],
                order_count_max: 3
            },
            2: {
                min_value: 0,
                max_value: 500,
                word_min: 0,
                word_max: 50,
                operations: ['identify_numeral', 'one_more', 'one_less', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'numeral_to_word', 'word_to_numeral', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],
                order_count_max: 4
            },
            3: {
                min_value: 0,
                max_value: 1000,
                word_min: 0,
                word_max: 100,
                operations: ['identify_numeral', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],
                order_count_max: 5
            },
            4: {
                min_value: 0,
                max_value: 1000,
                word_min: 0,
                word_max: 100,
                operations: ['ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],
                order_count_max: 6
            }
        }
    },

    'N02_Y4_NPV': {
        id: 'N02_Y4_NPV',
        name: 'N02_Y4_NPV: Order and Compare Beyond 1000',
        description: 'order and compare numbers beyond 1,000; find 1,000 more or less than a given number',
        icon: '🔤',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 100,
                max_value: 2000,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],  // Removed rounding
                order_count_max: 3
            },
            2: {
                min_value: 100,
                max_value: 10000,
                word_min: 0,
                word_max: 50,
                operations: ['ten_more', 'ten_less', 'hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],  // Removed rounding
                order_count_max: 5
            },
            3: {
                min_value: 100,
                max_value: 50000,                        // Reduced from 100,000
                word_min: 0,
                word_max: 100,
                operations: ['hundred_more', 'hundred_less', 'thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],  // Removed rounding
                order_count_max: 6                       // Reduced from 10
            },
            4: {
                min_value: 1000,
                max_value: 200000,                       // Reduced from 1,000,000
                word_min: 0,
                word_max: 100,
                operations: ['thousand_more', 'thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],  // Removed rounding
                order_count_max: 8                       // Reduced from 15
            }
        }
    },

    'N02_Y5_NPV': {
        id: 'N02_Y5_NPV',
        name: 'N02_Y5_NPV: Numbers to 1 Million',
        description: 'read, write, order and compare numbers to at least 1,000,000',
        icon: '🔤',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 1000,
                max_value: 100000,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'thousand_more', 'thousand_less', 'ten_thousand_more', 'ten_thousand_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],  // Removed rounding
                order_count_max: 3
            },
            2: {
                min_value: 10000,
                max_value: 500000,
                word_min: 0,
                word_max: 50,
                operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],  // Removed rounding
                order_count_max: 5
            },
            3: {
                min_value: 10000,
                max_value: 1000000,
                word_min: 0,
                word_max: 100,
                operations: ['ten_thousand_more', 'ten_thousand_less', 'hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],  // Removed rounding and place_value_digit (belongs in N03)
                order_count_max: 6                       // Reduced from 10
            },
            4: {
                min_value: 100000,
                max_value: 5000000,                      // Reduced from 10,000,000
                word_min: 0,
                word_max: 100,
                operations: ['hundred_thousand_more', 'hundred_thousand_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],  // Removed rounding and place_value_digit (belongs in N03)
                order_count_max: 8                       // Reduced from 15
            }
        }
    },

    'N02_Y6_NPV': {
        id: 'N02_Y6_NPV',
        name: 'N02_Y6_NPV: Numbers to 10 Million',
        description: 'read, write, order and compare numbers up to 10,000,000',
        icon: '🔤',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Read, write, order and compare numbers',
        ref: 'N2',
        parameters: {
            1: {
                min_value: 10000,
                max_value: 1000000,
                word_min: 0,
                word_max: 20,
                operations: ['identify_numeral', 'hundred_thousand_more', 'hundred_thousand_less', 'million_more', 'million_less', 'compare_two', 'use_symbols', 'order_two', 'order_three'],  // Removed rounding
                order_count_max: 3
            },
            2: {
                min_value: 100000,
                max_value: 5000000,
                word_min: 0,
                word_max: 50,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_three', 'order_four', 'complete_statement', 'true_false'],  // Removed rounding
                order_count_max: 5
            },
            3: {
                min_value: 1000000,
                max_value: 10000000,
                word_min: 0,
                word_max: 100,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_four', 'order_five', 'complete_statement', 'true_false', 'between', 'place_value_comparison'],  // Removed rounding and place_value_digit (belongs in N03)
                order_count_max: 6                       // Reduced from 10
            },
            4: {
                min_value: 1000000,
                max_value: 10000000,
                word_min: 0,
                word_max: 100,
                operations: ['million_more', 'million_less', 'ten_million_more', 'ten_million_less', 'compare_two', 'use_symbols', 'order_five', 'order_six', 'complete_statement', 'true_false', 'between', 'place_value_comparison', 'complex_more_less'],  // Removed rounding and place_value_digit (belongs in N03)
                order_count_max: 8                       // Reduced from 20
            }
        }
    }
};

```
--- END FILE: src\curriculum\parameters\N02_readwrite.js ---

--- START FILE: src\curriculum\parameters\N03_placevalue.js ---
```javascript
/**
 * N03 Module Series: Place Value and Roman Numerals
 * Covers Years 2-6 progression
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N03_Y2_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "compare_place_values", "compose_simple", "decompose_simple"],
            math: {
                range: { min: 10, max: 50 },
                placeValue: { places: ["ones", "tens"], includeZero: false },
                decomposition: { format: "simple" }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "compare_place_values", "compose_simple", "decompose_simple", "digit_value", "zero_value"],
            math: {
                range: { min: 10, max: 99 },
                placeValue: { places: ["ones", "tens"], includeZero: true },
                decomposition: { format: "simple" }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "expanded_form", "standard_from_expanded", "zero_value", "place_comparison"],
            math: {
                range: { min: 10, max: 99 },
                placeValue: { places: ["ones", "tens"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations"],
            math: {
                range: { min: 10, max: 99 },
                placeValue: { places: ["ones", "tens"], includeZero: true },
                decomposition: { format: "all" }
            }
        }
    },
    N03_Y3_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "compose_simple", "decompose_simple"],
            math: {
                range: { min: 100, max: 300 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: false },
                decomposition: { format: "simple" }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "zero_value"],
            math: {
                range: { min: 100, max: 600 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: true },
                decomposition: { format: "simple" }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "expanded_form", "standard_from_expanded", "zero_value", "place_comparison"],
            math: {
                range: { min: 100, max: 999 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations"],
            math: {
                range: { min: 100, max: 999 },
                placeValue: { places: ["ones", "tens", "hundreds"], includeZero: true },
                decomposition: { format: "all" }
            }
        }
    },
    N03_Y4_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "compose_simple", "decompose_simple", "roman_to_arabic", "roman_simple"],
            math: {
                range: { min: 1000, max: 3000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: false },
                decomposition: { format: "simple" },
                roman: { min: 1, max: 10, operations: ["roman_to_arabic", "arabic_to_roman"] }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "compose_simple", "decompose_simple", "zero_value", "roman_to_arabic", "arabic_to_roman"],
            math: {
                range: { min: 1000, max: 6000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: true },
                decomposition: { format: "simple" },
                roman: { min: 1, max: 50, operations: ["roman_to_arabic", "arabic_to_roman", "roman_compare"] }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison", "roman_to_arabic", "arabic_to_roman", "roman_compare"],
            math: {
                range: { min: 1000, max: 9999 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: true },
                decomposition: { format: "both" },
                roman: { min: 1, max: 100, operations: ["roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_order"] }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "alternative_decomposition", "multiple_representations", "roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_order", "zero_concept"],
            math: {
                range: { min: 1000, max: 9999 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands"], includeZero: true },
                decomposition: { format: "all" },
                roman: { min: 1, max: 100, operations: ["roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_order", "roman_sequence"] }
            }
        }
    },
    N03_Y5_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compose_simple", "decompose_simple", "roman_to_arabic", "roman_year"],
            math: {
                range: { min: 10000, max: 100000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands"], includeZero: true },
                decomposition: { format: "simple" },
                roman: { min: 1, max: 100, years: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024] }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison", "roman_to_arabic", "arabic_to_roman", "roman_year"],
            math: {
                range: { min: 10000, max: 500000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"], includeZero: true },
                decomposition: { format: "both" },
                roman: { min: 1, max: 500, years: [1066, 1215, 1588, 1666, 1815, 1914, 1945, 2000, 2020] }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison", "roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_year"],
            math: {
                range: { min: 10000, max: 1000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"], includeZero: true },
                decomposition: { format: "both" },
                roman: { min: 1, max: 1000, years: [1066, 1215, 1492, 1588, 1666, 1776, 1815, 1914, 1945, 2000, 2024] }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "alternative_decomposition", "multiple_representations", "roman_to_arabic", "arabic_to_roman", "roman_compare", "roman_year", "roman_complex"],
            math: {
                range: { min: 100000, max: 1000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"], includeZero: true },
                decomposition: { format: "all" },
                roman: { min: 1, max: 1000, years: [753, 1066, 1215, 1492, 1588, 1666, 1776, 1789, 1815, 1914, 1945, 1969, 2000, 2024] }
            }
        }
    },
    N03_Y6_NPV: {
        1: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compose_simple", "decompose_simple", "place_comparison"],
            math: {
                range: { min: 100000, max: 1000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"], includeZero: true },
                decomposition: { format: "simple" }
            }
        },
        2: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "place_comparison"],
            math: {
                range: { min: 1000000, max: 5000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions", "ten millions"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        3: {
            operations: ["identify_digit", "identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations"],
            math: {
                range: { min: 1000000, max: 10000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions", "ten millions"], includeZero: true },
                decomposition: { format: "both" }
            }
        },
        4: {
            operations: ["identify_place_value", "digit_value", "compare_place_values", "expanded_form", "standard_from_expanded", "alternative_decomposition", "place_comparison", "multiple_representations", "complex_place_value"],
            math: {
                range: { min: 1000000, max: 10000000 },
                placeValue: { places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions", "ten millions"], includeZero: true },
                decomposition: { format: "all" }
            }
        }
    }
};

export const N03_MODULES = {
    'N03_Y2_NPV': {
        id: 'N03_Y2_NPV',
        name: 'N03_Y2_NPV: Two-Digit Place Value',
        description: 'Recognise the place value of each digit in a two-digit number (tens, ones)',
        icon: '🔢',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y2_NPV']
    },
    'N03_Y3_NPV': {
        id: 'N03_Y3_NPV',
        name: 'N03_Y3_NPV: Three-Digit Place Value',
        description: 'Recognise the place value of each digit in a three-digit number (hundreds, tens, ones)',
        icon: '🔢',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y3_NPV']
    },
    'N03_Y4_NPV': {
        id: 'N03_Y4_NPV',
        name: 'N03_Y4_NPV: Four-Digit Place Value & Roman Numerals to 100',
        description: 'recognise the place value of each digit in a four-digit number (thousands, hundreds, tens and ones); read Roman numerals to 100 (I to C) and know that over time, the numeral system changed to include the concept of zero and place value',
        icon: '🔢',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y4_NPV']
    },
    'N03_Y5_NPV': {
        id: 'N03_Y5_NPV',
        name: 'N03_Y5_NPV: Place Value to 1,000,000 & Roman Numerals to 1000',
        description: 'determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M) and recognise years written in Roman numerals',
        icon: '🔢',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y5_NPV']
    },
    'N03_Y6_NPV': {
        id: 'N03_Y6_NPV',
        name: 'N03_Y6_NPV: Place Value to 10,000,000',
        description: 'Determine the value of each digit in numbers up to 10,000,000',
        icon: '🔢',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Place value; roman numerals',
        ref: 'N3',
        parameters: MIGRATED_PARAMS['N03_Y6_NPV']
    }
};
```
--- END FILE: src\curriculum\parameters\N03_placevalue.js ---

--- START FILE: src\curriculum\parameters\N04_representation.js ---
```javascript
/**
 * N04 Module Series: Identify, Represent, Estimate and Round
 * Covers Years 1-6 progression
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N04_Y1_NPV: {
        1: {
            operations: ["number_line_position", "count_objects", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 10 } },
            presentation: { numberLine: { max: 10 }, objects: { types: ["dots", "stars", "circles"] }, comparison: { words: ["equal to", "more than", "less than", "most", "least"] } }
        },
        2: {
            operations: ["number_line_position", "count_objects", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 20 } },
            presentation: { numberLine: { max: 20 }, objects: { types: ["dots", "stars", "circles", "blocks"] }, comparison: { words: ["equal to", "more than", "less than", "fewer", "most", "least"] } }
        },
        3: {
            operations: ["number_line_position", "number_line_between", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 50 } },
            presentation: { numberLine: { max: 50 }, objects: { types: ["dots", "stars", "circles", "blocks", "tallies"] }, comparison: { words: ["equal to", "more than", "less than", "fewer", "most", "least"] } }
        },
        4: {
            operations: ["number_line_position", "number_line_between", "compare_language", "identify_most_least"],
            math: { range: { min: 0, max: 100 } },
            presentation: { numberLine: { max: 100 }, objects: { types: ["dots", "stars", "circles", "blocks", "tallies"] }, comparison: { words: ["equal to", "more than", "less than", "fewer", "most", "least"] } }
        }
    },
    N04_Y2_NPV: {
        1: {
            operations: ["number_line_position", "number_line_between", "estimate_group", "place_value_representation"],
            math: { range: { min: 0, max: 50 }, estimation: { ranges: [[0, 10], [10, 30], [30, 50]] }, placeValue: { max: 50 } },
            presentation: { numberLine: { max: 50 } }
        },
        2: {
            operations: ["number_line_position", "number_line_between", "number_line_jump", "estimate_group", "place_value_representation", "estimate_position"],
            math: { range: { min: 0, max: 100 }, estimation: { ranges: [[0, 25], [25, 50], [50, 75], [75, 100]] }, placeValue: { max: 100 } },
            presentation: { numberLine: { max: 100 } }
        },
        3: {
            operations: ["number_line_position", "number_line_between", "number_line_jump", "estimate_position", "place_value_representation", "partition_number"],
            math: { range: { min: 0, max: 100 }, estimation: { ranges: [[0, 25], [25, 50], [50, 75], [75, 100]] }, placeValue: { max: 100 } },
            presentation: { numberLine: { max: 100 } }
        },
        4: {
            operations: ["number_line_multiple_positions", "number_line_jump", "estimate_position", "place_value_representation", "partition_number", "estimate_calculation"],
            math: { range: { min: 0, max: 100 }, estimation: { ranges: [[0, 30], [30, 60], [60, 100]] }, placeValue: { max: 100 } },
            presentation: { numberLine: { max: 100 } }
        }
    },
    N04_Y3_NPV: {
        1: {
            operations: ["number_line_position", "number_line_between", "estimate_position", "place_value_representation", "partition_number"],
            math: { range: { min: 0, max: 200 }, estimation: { ranges: [[0, 50], [50, 100], [100, 150], [150, 200]] }, placeValue: { max: 200 } },
            presentation: { numberLine: { max: 200 } }
        },
        2: {
            operations: ["number_line_position", "number_line_jump", "estimate_position", "place_value_representation", "partition_number", "estimate_calculation"],
            math: { range: { min: 0, max: 500 }, estimation: { ranges: [[0, 100], [100, 300], [300, 500]] }, placeValue: { max: 500 } },
            presentation: { numberLine: { max: 500 } }
        },
        3: {
            operations: ["number_line_position", "number_line_jump", "estimate_position", "place_value_representation", "partition_number", "estimate_calculation", "estimate_midpoint"],
            math: { range: { min: 0, max: 1000 }, estimation: { ranges: [[0, 250], [250, 500], [500, 750], [750, 1000]] }, placeValue: { max: 1000 } },
            presentation: { numberLine: { max: 1000 } }
        },
        4: {
            operations: ["number_line_multiple_positions", "number_line_jump", "estimate_position", "partition_number", "estimate_calculation", "estimate_midpoint", "compare_representations"],
            math: { range: { min: 0, max: 1000 }, estimation: { ranges: [[0, 200], [200, 500], [500, 800], [800, 1000]] }, placeValue: { max: 1000 } },
            presentation: { numberLine: { max: 1000 } }
        }
    },
    N04_Y4_NPV: {
        1: {
            operations: ["number_line_position", "estimate_position", "round_to_ten", "place_value_representation"],
            math: { range: { min: 10, max: 1000 }, rounding: { bases: [10] }, estimation: { ranges: [[0, 250], [250, 500], [500, 750], [750, 1000]] } },
            presentation: { numberLine: { max: 1000 } }
        },
        2: {
            operations: ["number_line_position", "estimate_position", "round_to_ten", "round_to_hundred", "partition_number", "estimate_calculation"],
            math: { range: { min: 10, max: 5000 }, rounding: { bases: [10, 100] }, estimation: { ranges: [[0, 1000], [1000, 3000], [3000, 5000]] } },
            presentation: { numberLine: { max: 5000 } }
        },
        3: {
            operations: ["number_line_position", "estimate_position", "round_to_hundred", "round_to_thousand", "estimate_calculation", "estimate_midpoint"],
            math: { range: { min: 100, max: 10000 }, rounding: { bases: [10, 100, 1000] }, estimation: { ranges: [[0, 2500], [2500, 5000], [5000, 7500], [7500, 10000]] } },
            presentation: { numberLine: { max: 10000 } }
        },
        4: {
            operations: ["number_line_jump", "estimate_position", "round_to_ten", "round_to_hundred", "round_to_thousand", "estimate_calculation", "compare_rounded"],
            math: { range: { min: 100, max: 10000 }, rounding: { bases: [10, 100, 1000] }, estimation: { ranges: [[0, 2000], [2000, 5000], [5000, 8000], [8000, 10000]] } },
            presentation: { numberLine: { max: 10000 } }
        }
    },
    N04_Y5_NPV: {
        1: {
            operations: ["round_to_ten", "round_to_hundred", "round_to_thousand", "round_to_ten_thousand", "estimate_position", "number_line_position"],
            math: { range: { min: 1000, max: 100000 }, rounding: { bases: [10, 100, 1000, 10000] }, estimation: { ranges: [[0, 25000], [25000, 50000], [50000, 75000], [75000, 100000]] } },
            presentation: { numberLine: { max: 100000 } }
        },
        2: {
            operations: ["round_to_hundred", "round_to_thousand", "round_to_ten_thousand", "round_to_hundred_thousand", "estimate_position", "estimate_calculation", "number_line_jump"],
            math: { range: { min: 10000, max: 500000 }, rounding: { bases: [100, 1000, 10000, 100000] }, estimation: { ranges: [[0, 100000], [100000, 300000], [300000, 500000]] } },
            presentation: { numberLine: { max: 500000 } }
        },
        3: {
            operations: ["round_to_ten", "round_to_hundred", "round_to_thousand", "round_to_ten_thousand", "round_to_hundred_thousand", "estimate_position", "estimate_calculation", "compare_rounded"],
            math: { range: { min: 10000, max: 1000000 }, rounding: { bases: [10, 100, 1000, 10000, 100000] }, estimation: { ranges: [[0, 250000], [250000, 500000], [500000, 750000], [750000, 1000000]] } },
            presentation: { numberLine: { max: 1000000 } }
        },
        4: {
            operations: ["round_to_ten_thousand", "round_to_hundred_thousand", "estimate_calculation", "compare_rounded", "choose_appropriate_rounding"],
            math: { range: { min: 100000, max: 1000000 }, rounding: { bases: [10000, 100000] }, estimation: { ranges: [[0, 200000], [200000, 500000], [500000, 800000], [800000, 1000000]] } },
            presentation: { numberLine: { max: 1000000 } }
        }
    },
    N04_Y6_NPV: {
        1: {
            operations: ["round_to_thousand", "round_to_ten_thousand", "round_to_hundred_thousand", "estimate_position"],
            math: { range: { min: 1000, max: 1000000 }, rounding: { bases: [1000, 10000, 100000] }, estimation: { ranges: [[0, 250000], [250000, 500000], [500000, 750000], [750000, 1000000]] } },
            presentation: { numberLine: { max: 1000000 } }
        },
        2: {
            operations: ["round_to_ten_thousand", "round_to_hundred_thousand", "round_to_million", "estimate_calculation", "compare_rounded"],
            math: { range: { min: 10000, max: 5000000 }, rounding: { bases: [10000, 100000, 1000000] }, estimation: { ranges: [[0, 1000000], [1000000, 3000000], [3000000, 5000000]] } },
            presentation: { numberLine: { max: 5000000 } }
        },
        3: {
            operations: ["round_to_hundred_thousand", "round_to_million", "round_to_ten_million", "estimate_calculation", "compare_rounded", "choose_appropriate_rounding"],
            math: { range: { min: 100000, max: 10000000 }, rounding: { bases: [100000, 1000000, 10000000] }, estimation: { ranges: [[0, 2500000], [2500000, 5000000], [5000000, 7500000], [7500000, 10000000]] } },
            presentation: { numberLine: { max: 10000000 } }
        },
        4: {
            operations: ["round_to_any_place", "estimate_calculation", "compare_rounded", "choose_appropriate_rounding", "error_bounds"],
            math: { range: { min: 1000000, max: 10000000 }, rounding: { bases: [10, 100, 1000, 10000, 100000, 1000000, 10000000] }, estimation: { ranges: [[0, 2000000], [2000000, 5000000], [5000000, 8000000], [8000000, 10000000]] } },
            presentation: { numberLine: { max: 10000000 } }
        }
    }
};

export const N04_MODULES = {
    'N04_Y1_NPV': {
        id: 'N04_Y1_NPV',
        name: 'N04_Y1_NPV: Identify and Represent Numbers',
        description: 'Identify and represent numbers using objects and pictorial representations including the number line, and use the language of: equal to, more than, less than (fewer), most, least',
        icon: '📊',
        yearGroup: 'Year 1',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y1_NPV']
    },
    'N04_Y2_NPV': {
        id: 'N04_Y2_NPV',
        name: 'N04_Y2_NPV: Identify, Represent and Estimate Numbers',
        description: 'Identify, represent and estimate numbers using different representations, including the number line',
        icon: '📊',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y2_NPV']
    },
    'N04_Y3_NPV': {
        id: 'N04_Y3_NPV',
        name: 'N04_Y3_NPV: Identify, Represent and Estimate',
        description: 'Identify, represent and estimate numbers using different representations',
        icon: '📊',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y3_NPV']
    },
    'N04_Y4_NPV': {
        id: 'N04_Y4_NPV',
        name: 'N04_Y4_NPV: Represent, Estimate and Round',
        description: 'Identify, represent and estimate numbers using different representations; round any number to the nearest 10, 100 or 1,000',
        icon: '📊',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y4_NPV']
    },
    'N04_Y5_NPV': {
        id: 'N04_Y5_NPV',
        name: 'N04_Y5_NPV: Round to 1,000,000',
        description: 'Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000',
        icon: '📊',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y5_NPV']
    },
    'N04_Y6_NPV': {
        id: 'N04_Y6_NPV',
        name: 'N04_Y6_NPV: Round to Any Degree of Accuracy',
        description: 'Round any whole number to a required degree of accuracy',
        icon: '📊',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Identify, represent and estimate; rounding',
        ref: 'N4',
        parameters: MIGRATED_PARAMS['N04_Y6_NPV']
    }
};
```
--- END FILE: src\curriculum\parameters\N04_representation.js ---

--- START FILE: src\curriculum\parameters\N05_negatives.js ---
```javascript
/**
 * N05 Module Series: Negative Numbers
 * Covers Years 4-6 progression
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N05_Y4_NPV: {
        1: {
            math: {
                range: { min: -10, max: 10 },
                sequence: { steps: [1, 2], length: 6, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: -20, max: 20 },
                sequence: { steps: [1, 2, 5], length: 8, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "middle", count: 1 }
            }
        },
        3: {
            math: {
                range: { min: -50, max: 50 },
                sequence: { steps: [1, 2, 5, 10], length: 10, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "random", count: 2 }
            }
        },
        4: {
            math: {
                range: { min: -100, max: 100 },
                sequence: { steps: [1, 2, 5, 10], length: 12, directions: ["backwards"], startStrategy: "positive_only" },
                mustCrossZero: true
            },
            presentation: {
                gaps: { position: "random", count: 3 }
            }
        }
    },
    N05_Y5_NPV: {
        1: {
            math: {
                range: { min: -20, max: 20, temp: [-10, 15] },
                sequence: { steps: [1, 2, 5], length: 6, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "sequence"],
                gaps: { position: "end", count: 1 }
            }
        },
        2: {
            math: {
                range: { min: -50, max: 50, temp: [-20, 30], elevation: [-50, 100] },
                sequence: { steps: [1, 2, 5, 10], length: 8, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "elevation", "sequence"],
                gaps: { position: "middle", count: 2 }
            }
        },
        3: {
            math: {
                range: { min: -100, max: 100, temp: [-30, 40], elevation: [-100, 200] },
                sequence: { steps: [1, 2, 5, 10, 25], length: 10, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "elevation", "sequence"],
                gaps: { position: "random", count: 2 }
            }
        },
        4: {
            math: {
                range: { min: -200, max: 200, temp: [-40, 50], elevation: [-200, 500] },
                sequence: { steps: [1, 2, 5, 10, 25, 50], length: 12, directions: ["forwards", "backwards"], startStrategy: "any" }
            },
            presentation: {
                contexts: ["temperature", "elevation", "sequence"],
                gaps: { position: "random", count: 3 }
            }
        }
    },
    N05_Y6_NPV: {
        1: {
            math: {
                range: { min: -20, max: 20, temp: [-15, 20] },
                mustCrossZero: true
            },
            presentation: {
                intervalTypes: ["simple"],
                contexts: ["temperature", "number_line"]
            }
        },
        2: {
            math: {
                range: { min: -50, max: 50, temp: [-25, 35], elevation: [-50, 100] }
            },
            presentation: {
                intervalTypes: ["simple", "multi_step"],
                contexts: ["temperature", "elevation", "number_line"]
            }
        },
        3: {
            math: {
                range: { min: -100, max: 100, temp: [-40, 45], elevation: [-150, 300] }
            },
            presentation: {
                intervalTypes: ["simple", "multi_step", "word_problem"],
                contexts: ["temperature", "elevation", "number_line", "time"]
            }
        },
        4: {
            math: {
                range: { min: -500, max: 500, temp: [-50, 55], elevation: [-500, 1000] }
            },
            presentation: {
                intervalTypes: ["simple", "multi_step", "word_problem"],
                contexts: ["temperature", "elevation", "number_line", "time"]
            }
        }
    }
};

export const N05_MODULES = {
    'N05_Y4_NPV': {
        id: 'N05_Y4_NPV',
        name: 'N05_Y4_NPV: Counting Through Zero',
        description: 'Count backwards through zero to include negative numbers',
        icon: '➖',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: MIGRATED_PARAMS['N05_Y4_NPV']
    },
    'N05_Y5_NPV': {
        id: 'N05_Y5_NPV',
        name: 'N05_Y5_NPV: Negative Numbers in Context',
        description: 'Interpret negative numbers in context, count forwards and backwards with positive and negative whole numbers, including through zero',
        icon: '🌡️',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: MIGRATED_PARAMS['N05_Y5_NPV']
    },
    'N05_Y6_NPV': {
        id: 'N05_Y6_NPV',
        name: 'N05_Y6_NPV: Intervals Across Zero',
        description: 'Use negative numbers in context, and calculate intervals across zero',
        icon: '📏',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'negative numbers',
        ref: 'N5',
        parameters: MIGRATED_PARAMS['N05_Y6_NPV']
    }
};
```
--- END FILE: src\curriculum\parameters\N05_negatives.js ---

--- START FILE: src\curriculum\parameters\N06_problems.js ---
```javascript
/**
 * N06 Module Series: Number Problems
 * Using place value and number facts to solve problems
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    N06_Y2_NPV: {
        1: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems"],
            math: {
                range: { min: 0, max: 30 },
                sequence: { steps: [2, 5, 10] },
                steps: { max: 3 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple"]
            }
        },
        2: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 60 },
                sequence: { steps: [2, 3, 5, 10] },
                steps: { max: 5 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "varied"]
            }
        },
        3: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 100 },
                sequence: { steps: [2, 3, 5, 10] },
                steps: { max: 8 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["simple", "varied", "mixed"]
            }
        },
        4: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "number_line_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 120 },
                sequence: { steps: [2, 3, 5, 10] },
                steps: { max: 10 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["varied", "mixed", "complex"]
            }
        }
    },
    N06_Y3_NPV: {
        1: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems"],
            math: {
                range: { min: 0, max: 200 },
                sequence: { steps: [4, 8, 50] },
                steps: { max: 4 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple"]
            }
        },
        2: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 500 },
                sequence: { steps: [4, 8, 50, 100] },
                steps: { max: 6 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "varied"]
            }
        },
        3: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 1000 },
                sequence: { steps: [4, 8, 50, 100] },
                steps: { max: 8 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["simple", "varied", "mixed"]
            }
        },
        4: {
            operations: ["counting_problems", "place_value_problems", "comparison_problems", "representation_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 1200 },
                sequence: { steps: [4, 8, 50, 100] },
                steps: { max: 10 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["varied", "mixed", "complex"]
            }
        }
    },
    N06_Y4_NPV: {
        1: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems"],
            math: {
                range: { min: 0, max: 2000 },
                sequence: { steps: [6, 7, 9, 25] },
                steps: { min: 2, max: 5 },
                rounding: { bases: [10, 100] },
                roman: { min: 1, max: 50 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple"]
            }
        },
        2: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 5000 },
                sequence: { steps: [6, 7, 9, 25, 1000] },
                steps: { min: 2, max: 7 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 75 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "practical"]
            }
        },
        3: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 10000 },
                sequence: { steps: [6, 7, 9, 25, 1000] },
                steps: { min: 3, max: 10 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 100 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["simple", "practical", "complex"]
            }
        },
        4: {
            operations: ["counting_problems", "place_value_comparison_problems", "rounding_estimation_problems", "negative_number_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 15000 },
                sequence: { steps: [6, 7, 9, 25, 1000] },
                steps: { min: 4, max: 12 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 100 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["practical", "complex", "large_numbers"]
            }
        }
    },
    N06_Y5_NPV: {
        1: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems"],
            math: {
                range: { min: 0, max: 100000, negative: [-50, 50] },
                sequence: { steps: [10, 100, 1000] },
                steps: { min: 2, max: 5 },
                rounding: { bases: [10, 100, 1000] },
                roman: { min: 1, max: 500 },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple", "practical"]
            }
        },
        2: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 500000, negative: [-200, 200] },
                sequence: { steps: [10, 100, 1000, 10000] },
                steps: { min: 2, max: 7 },
                rounding: { bases: [10, 100, 1000, 10000] },
                roman: { min: 1, max: 750 },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["simple", "practical", "varied"]
            }
        },
        3: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 1000000, negative: [-500, 500] },
                sequence: { steps: [10, 100, 1000, 10000, 100000] },
                steps: { min: 3, max: 10 },
                rounding: { bases: [10, 100, 1000, 10000, 100000] },
                roman: { min: 1, max: 1000 },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["practical", "varied", "complex"]
            }
        },
        4: {
            operations: ["counting_with_powers", "place_value_comparison_problems", "rounding_estimation_problems", "negative_context_problems", "multi_step_problems"],
            math: {
                range: { min: 0, max: 5000000, negative: [-1000, 1000] },
                sequence: { steps: [10, 100, 1000, 10000, 100000] },
                steps: { min: 4, max: 12 },
                rounding: { bases: [10, 100, 1000, 10000, 100000] },
                roman: { min: 1, max: 1000 },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["complex", "large_numbers", "multi_concept"]
            }
        }
    },
    N06_Y6_NPV: {
        1: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems"],
            math: {
                range: { min: 0, max: 1000000, negative: [-100, 100], interval: [50, 500] },
                steps: { min: 2, max: 5 },
                rounding: { bases: [10, 100, 1000, 10000] },
                complexity: "single_step"
            },
            presentation: {
                contexts: ["simple", "practical"]
            }
        },
        2: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems", "multi_concept_integration"],
            math: {
                range: { min: 0, max: 5000000, negative: [-500, 500], interval: [100, 1000] },
                steps: { min: 2, max: 7 },
                rounding: { bases: [10, 100, 1000, 10000, 100000] },
                complexity: "single_or_two_step"
            },
            presentation: {
                contexts: ["practical", "varied"]
            }
        },
        3: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems", "multi_concept_integration"],
            math: {
                range: { min: 0, max: 10000000, negative: [-1000, 1000], interval: [500, 2000] },
                steps: { min: 3, max: 10 },
                rounding: { bases: [10, 100, 1000, 10000, 100000, 1000000] },
                complexity: "two_step"
            },
            presentation: {
                contexts: ["practical", "varied", "complex"]
            }
        },
        4: {
            operations: ["large_place_value_problems", "multi_level_rounding_problems", "ordering_comparing_large_numbers", "negative_interval_problems", "multi_concept_integration"],
            math: {
                range: { min: 0, max: 20000000, negative: [-2000, 2000], interval: [1000, 5000] },
                steps: { min: 4, max: 12 },
                rounding: { bases: [10, 100, 1000, 10000, 100000, 1000000] },
                complexity: "multi_step"
            },
            presentation: {
                contexts: ["complex", "large_numbers", "multi_concept"]
            }
        }
    }
};

export const N06_MODULES = {
    'N06_Y2_NPV': {
        id: 'N06_Y2_NPV',
        name: 'N06_Y2_NPV: Solve Number Problems',
        description: 'Use place value and number facts to solve problems',
        icon: '🧮',
        yearGroup: 'Year 2',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y2_NPV']
    },
    'N06_Y3_NPV': {
        id: 'N06_Y3_NPV',
        name: 'N06_Y3_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems involving 3N1-3N4',
        icon: '🧮',
        yearGroup: 'Year 3',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y3_NPV']
    },
    'N06_Y4_NPV': {
        id: 'N06_Y4_NPV',
        name: 'N06_Y4_NPV: Number & Practical Problems',
        description: 'Solve number and practical problems that involve 4N1-4N5 and with increasingly large positive numbers',
        icon: '🧮',
        yearGroup: 'Year 4',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y4_NPV']
    },
    'N06_Y5_NPV': {
        id: 'N06_Y5_NPV',
        name: 'N06_Y5_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems that involve 5N1-5N5',
        icon: '🧮',
        yearGroup: 'Year 5',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y5_NPV']
    },
    'N06_Y6_NPV': {
        id: 'N06_Y6_NPV',
        name: 'N06_Y6_NPV: Number & Practical Problems',
        description: 'Solve number problems and practical problems that involve 6N2-6N5',
        icon: '🧮',
        yearGroup: 'Year 6',
        strand: 'Number and Place Value',
        substrand: 'Number problems',
        ref: 'N6',
        parameters: MIGRATED_PARAMS['N06_Y6_NPV']
    }
};
```
--- END FILE: src\curriculum\parameters\N06_problems.js ---

--- START FILE: src\curriculum\parameters.js ---
```javascript
/**
 * Curriculum Module Definitions - Central Index
 *
 * This file imports and merges all parameter modules.
 * Individual module series are defined in separate files for maintainability.
 *
 * Organization:
 * - N01_counting.js - Counting in multiples (Years 1-5)
 * - N02_readwrite.js - Read, write, order and compare (Years 2-6)
 * - N03_placevalue.js - Place value & Roman numerals (Years 2-6)
 * - N04_representation.js - Identify, represent, estimate (Years 1-6)
 * - N05_negatives.js - Negative numbers (Years 4-6)
 * - N06_problems.js - Number problems (Years 2-6)
 * - C01_mental.js - Mental addition and subtraction (Years 1, 2, 3, 5)
 * - C02_written.js - Written addition and subtraction methods (Years 1-5)
 * - C03_estimation.js - Estimation, inverses and checking (Years 2-6)
 * - C04_problems.js - Add/subtract to solve problems (Years 1-6)
 * - C05_properties.js - Properties of number: multiples, factors, primes, squares, cubes (Years 5-6)
 * - C06_mental_multiply_divide.js - Mental multiplication and division (Years 2-6)
 * - C07_written_multiply_divide.js - Written multiplication and division methods (Years 2-6)
 * - C08_properties.js - Problem-solving with mathematical properties and all four operations (Years 1-6)
 * - C09_order.js - Order of operations (Year 6)
 * - M01_measurement.js - Compare, describe and order measures (Years 1-4)
 * - M02_measurement_scales.js - Estimate, measure and read scales (Years 1-4)
 * - M03_money.js - Money (Years 1-3)
 * - M04_time.js - Telling time, ordering time, duration and units of time (Years 1-5)
 * - M05_conversions.js - Convert between metric units (Year 5)
 * - M06_conversions_mixed.js - Convert between different units including imperial/metric (Years 4-6)
 * - M07_perimeter_area.js - Perimeter and area (Years 3-6)
 * - M08_volume.js - Volume (Years 5-6)
 * - M09_problems.js - Measurement problem solving (Years 2-6)
 */

import { N01_MODULES } from './parameters/N01_counting.js';
import { N02_MODULES } from './parameters/N02_readwrite.js';
import { N03_MODULES } from './parameters/N03_placevalue.js';
import { N04_MODULES } from './parameters/N04_representation.js';
import { N05_MODULES } from './parameters/N05_negatives.js';
import { N06_MODULES } from './parameters/N06_problems.js';
import { C01_MODULES } from './parameters/C01_mental.js';
import { C02_MODULES } from './parameters/C02_written.js';
import { C03_MODULES } from './parameters/C03_estimation.js';
import { C04_MODULES } from './parameters/C04_problems.js';
import { C05_MODULES } from './parameters/C05_properties.js';
import { C06_MODULES } from './parameters/C06_mental_multiply_divide.js';
import { C07_MODULES } from './parameters/C07_written_multiply_divide.js';
import { C08_MODULES } from './parameters/C08_properties.js';
import { C09_MODULES } from './parameters/C09_order.js'
import { M01_MODULES } from './parameters/M01_measurement.js';
import { M02_MODULES } from './parameters/M02_measurement_scales.js';
import { M03_MODULES } from './parameters/M03_money.js';
import { M04_MODULES } from './parameters/M04_time.js';
import { M05_MODULES } from './parameters/M05_conversions.js';
import { M06_MODULES } from './parameters/M06_conversions_mixed.js';
import { M07_MODULES } from './parameters/M07_perimeter_area.js';
import { M08_MODULES } from './parameters/M08_volume.js';
import { M09_MODULES } from './parameters/M09_problems.js';

/**
 * Merged modules object
 * Combines all module series into single registry
 */
export const MODULES = {
    ...N01_MODULES,
    ...N02_MODULES,
    ...N03_MODULES,
    ...N04_MODULES,
    ...N05_MODULES,
    ...N06_MODULES,
    ...C01_MODULES,
    ...C02_MODULES,
    ...C03_MODULES,
    ...C04_MODULES,
    ...C05_MODULES,
    ...C06_MODULES,
    ...C07_MODULES,
    ...C08_MODULES,
    ...C09_MODULES,
    ...M01_MODULES,
    ...M02_MODULES,
    ...M03_MODULES,
    ...M04_MODULES,
    ...M05_MODULES,
    ...M06_MODULES,
    ...M07_MODULES,
    ...M08_MODULES,
    ...M09_MODULES
};

/**
 * Get a module by ID
 * @param {string} moduleId - The module identifier
 * @returns {Object|null} Module object or null if not found
 */
export function getModule(moduleId) {
    return MODULES[moduleId] || null;
}

/**
 * Get parameters for a specific module and level
 * @param {string} moduleId - The module identifier
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object|null} Parameters object for the specified level
 */
export function getParameters(moduleId, level) {
    const module = MODULES[moduleId];
    if (!module) return null;
    return module.parameters[level] || null;
}

/**
 * Get all available module IDs
 * @returns {string[]} Array of module IDs
 */
export function getModuleIds() {
    return Object.keys(MODULES);
}

/**
 * Get modules by strand
 * @param {string} strand - Strand name
 * @returns {Object[]} Array of modules in that strand
 */
export function getModulesByStrand(strand) {
    return Object.values(MODULES).filter(m => m.strand === strand);
}

/**
 * Get modules by year group
 * @param {string} yearGroup - Year group (e.g., "Year 3")
 * @returns {Object[]} Array of modules for that year
 */
export function getModulesByYear(yearGroup) {
    return Object.values(MODULES).filter(m => m.yearGroup === yearGroup);
}

/**
 * Validate level number
 * @param {number} level - Level to validate
 * @returns {boolean} True if valid
 */
export function isValidLevel(level) {
    return [1, 2, 3, 4].includes(level);
}

```
--- END FILE: src\curriculum\parameters.js ---

--- START FILE: src\generators\C01_Y1_CALC_mental.js ---
```javascript
/**
 * Year 1 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { generateAddition, generateSubtraction, getRandomName, getRandomItem, getAdditionContext, getSubtractionContext } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    // Flatten params for helpers
    const flatParams = {
        max_value: math.range.max,
        target_numbers: math.targets,
        allow_zero: math.config.allowZero,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'number_bonds': return generateNumberBonds(flatParams, level);
        case 'missing_part': return generateMissingPart(flatParams, level);
        case 'related_facts': return generateRelatedFacts(flatParams, level);
        case 'simple_add_sub': return generateSimpleAddSub(flatParams, level);
        case 'fact_families': return generateFactFamilies(flatParams, level);
        case 'mixed_operations': return generateMixedOperations(flatParams, level);
        case 'two_step_bonds': return generateTwoStepBonds(flatParams, level);
        default: return generateNumberBonds(flatParams, level);
    }
}

function generateNumberBonds(params, level) {
    const target = randomChoice(params.target_numbers);
    const a = randomInt(params.allow_zero ? 0 : 1, target);
    const b = target - a;
    const q = randomChoice([
        { text: `What number do you add to ${a} to make ${target}?`, answer: b },
        { text: `${a} and ___ make ${target}`, answer: b },
        { text: `Find missing: ${a} + ___ = ${target}`, answer: b }
    ]);
    const opts = shuffle([b, ...generateDistractors(b, 3, 0, target)]);
    return { text: q.text, type: 'multiple_choice', options: opts, answer: b.toString(), hint: `${a} + ${b} = ${target}`, module: 'C01_Y1_CALC', level };
}

function generateMissingPart(params, level) {
    const target = randomInt(5, params.max_value);
    const known = randomInt(params.allow_zero ? 0 : 1, target - 1);
    const ans = target - known;
    const text = randomChoice([`___ + ${known} = ${target}`, `${known} + ___ = ${target}`]);
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `${known} + ___ = ${target}`, module: 'C01_Y1_CALC', level };
}

function generateRelatedFacts(params, level) {
    const sum = randomInt(5, params.max_value);
    const a = randomInt(1, sum - 1);
    const b = sum - a;
    const q = randomChoice([
        { given: `${a} + ${b} = ${sum}`, ask: `${sum} - ${b}?`, ans: a },
        { given: `${sum} - ${a} = ${b}`, ask: `${a} + ${b}?`, ans: sum }
    ]);
    const opts = shuffle([q.ans, ...generateDistractors(q.ans, 3, 0, params.max_value)]);
    return { text: `If ${q.given}, then what is ${q.ask}`, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: 'Inverse operations', module: 'C01_Y1_CALC', level };
}

function generateSimpleAddSub(params, level) {
    const op = randomChoice(['add', 'subtract']);
    if (op === 'add') {
        const { a, b, answer } = generateAddition(2, params.max_value);
        const text = `${a} + ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Count on`, module: 'C01_Y1_CALC', level };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value, { maxMinuend: params.max_value });
        const text = `${a} - ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Count back`, module: 'C01_Y1_CALC', level };
    }
}

function generateFactFamilies(params, level) {
    const sum = randomInt(5, params.max_value);
    const a = randomInt(1, sum - 1);
    const b = sum - a;
    const family = [`${a} + ${b} = ${sum}`, `${b} + ${a} = ${sum}`, `${sum} - ${a} = ${b}`, `${sum} - ${b} = ${a}`];
    const missIdx = randomInt(0, 3);
    const shown = family.filter((_, i) => i !== missIdx);
    const opts = shuffle([family[missIdx], `${a} + ${b} = ${sum+1}`, `${sum} - ${a} = ${b+1}`]); // Simple distractors
    return { text: `Complete family: ${shown.join(', ')}. Missing?`, type: 'multiple_choice', options: opts, answer: family[missIdx], hint: `Use ${a}, ${b}, ${sum}`, module: 'C01_Y1_CALC', level };
}

function generateMixedOperations(params, level) {
    const subOps = ['number_bonds', 'missing_part', 'simple_add_sub'];
    params.operations = [randomChoice(subOps)];
    return generateQuestion({ operations: params.operations, math: { range: { max: params.max_value }, targets: params.target_numbers, config: { allowZero: params.allow_zero } }, presentation: { styles: params.question_styles } }, level);
}

function generateTwoStepBonds(params, level) {
    const target = randomChoice(params.target_numbers);
    const p1 = randomInt(1, Math.floor(target/2));
    const rem = target - p1;
    const p2 = randomInt(1, rem - 1);
    const p3 = rem - p2;
    const q = `${p1} + ${p2} + ${p3} = ?`;
    const opts = shuffle([target, target+1, target-1, target+2]);
    return { text: q, type: 'multiple_choice', options: opts, answer: target.toString(), hint: `Add all parts`, module: 'C01_Y1_CALC', level };
}

export default {
    moduleId: 'C01_Y1_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C01_Y1_CALC_mental.js ---

--- START FILE: src\generators\C01_Y2_CALC_mental.js ---
```javascript
/**
 * Year 2 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { generateAddition, generateSubtraction, getAdditionContext, getSubtractionContext } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        max_value_basic: math.range.basicMax,
        max_value_derived: math.range.derivedMax,
        multiples_of_10: math.config.multiplesOf10,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'recall_to_20': return generateRecallTo20(flatParams, level);
        case 'derive_to_100': return generateDeriveTo100(flatParams, level);
        case 'missing_addend': return generateMissingAddend(flatParams, level);
        case 'related_subtract': return generateRelatedSubtract(flatParams, level);
        case 'inverse_operations': return generateInverseOperations(flatParams, level);
        case 'fact_families_100': return generateFactFamilies100(flatParams, level);
        case 'near_multiples': return generateNearMultiples(flatParams, level);
        default: return generateRecallTo20(flatParams, level);
    }
}

function generateRecallTo20(params, level) {
    const op = randomChoice(['add', 'subtract']);
    if (op === 'add') {
        const { a, b, answer } = generateAddition(2, params.max_value_basic);
        const text = `${a} + ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value_basic)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Recall fact`, module: 'C01_Y2_CALC', level };
    } else {
        const { a, b, answer } = generateSubtraction(0, params.max_value_basic, { maxMinuend: params.max_value_basic });
        const text = `${a} - ${b} = ?`;
        const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value_basic)]);
        return { text, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Recall fact`, module: 'C01_Y2_CALC', level };
    }
}

function generateDeriveTo100(params, level) {
    const { a, b, answer } = generateAddition(2, params.max_value_basic);
    const A = a * 10, B = b * 10, ANS = answer * 10;
    const text = `If ${a} + ${b} = ${answer}, what is ${A} + ${B}?`;
    const opts = shuffle([ANS, ...generateDistractors(ANS, 3, 0, params.max_value_derived)]);
    return { text, type: 'multiple_choice', options: opts, answer: ANS.toString(), hint: `Use 10x pattern`, module: 'C01_Y2_CALC', level };
}

function generateMissingAddend(params, level) {
    const res = randomInt(5, params.max_value_basic);
    const known = randomInt(1, res - 1);
    const ans = res - known;
    const text = `${known} + ___ = ${res}`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value_basic)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `${res} - ${known}`, module: 'C01_Y2_CALC', level };
}

function generateRelatedSubtract(params, level) {
    const { a, b, answer } = generateAddition(2, params.max_value_basic);
    const text = `If ${a} + ${b} = ${answer}, what is ${answer} - ${a}?`;
    const opts = shuffle([b, a, answer, answer+1].slice(0, 4));
    return { text, type: 'multiple_choice', options: opts, answer: b.toString(), hint: `Inverse`, module: 'C01_Y2_CALC', level };
}

function generateInverseOperations(params, level) {
    const { a, b, answer } = generateAddition(2, params.max_value_basic);
    const text = `Check ${a} + ${b} = ${answer}. Which subtraction?`;
    const ans = `${answer} - ${a} = ${b}`;
    const opts = shuffle([ans, `${answer} + ${a} = ${b}`, `${a} - ${b} = ${answer}`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: `Start with total`, module: 'C01_Y2_CALC', level };
}

function generateFactFamilies100(params, level) {
    const a = randomInt(1, 9) * 10, b = randomInt(1, 9) * 10;
    const sum = a + b;
    const family = [`${a}+${b}=${sum}`, `${b}+${a}=${sum}`, `${sum}-${a}=${b}`, `${sum}-${b}=${a}`];
    const missIdx = randomInt(0, 3);
    const shown = family.filter((_, i) => i !== missIdx);
    return { text: `Family: ${shown.join(', ')}. Missing?`, type: 'multiple_choice', options: shuffle([family[missIdx], `${a}+${b}=${sum+10}`]), answer: family[missIdx], hint: `Use ${a}, ${b}, ${sum}`, module: 'C01_Y2_CALC', level };
}

function generateNearMultiples(params, level) {
    const base = randomInt(1, 9) * 10;
    const off = randomChoice([-1, 1]);
    const num = base + off;
    const add = randomInt(5, 20);
    const ans = num + add;
    const text = `${num} + ${add} = ?`;
    const opts = shuffle([ans, ans+1, ans-1, ans+10]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Think ${base} + ${add} then adjust`, module: 'C01_Y2_CALC', level };
}

export default {
    moduleId: 'C01_Y2_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C01_Y2_CALC_mental.js ---

--- START FILE: src\generators\C01_Y3_CALC_mental.js ---
```javascript
/**
 * Year 3 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_3digit: math.range.min3,
        max_3digit: math.range.max3,
        ones_range: math.components.ones,
        tens_range: math.components.tens,``
        hundreds_range: math.components.hundreds,
        avoid_bridging: math.config.avoidBridging,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'add_ones': return generateAddOnes(flatParams, level);
        case 'subtract_ones': return generateSubtractOnes(flatParams, level);
        case 'add_tens': return generateAddTens(flatParams, level);
        case 'subtract_tens': return generateSubtractTens(flatParams, level);
        case 'add_hundreds': return generateAddHundreds(flatParams, level);
        case 'subtract_hundreds': return generateSubtractHundreds(flatParams, level);
        case 'mixed_operations': return generateMixedOperations(flatParams, level);
        case 'two_step_mental': return generateTwoStepMental(flatParams, level);
        default: return generateAddOnes(flatParams, level);
    }
}

function generateAddOnes(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const ones = randomInt(params.ones_range[0], params.ones_range[1]);
    if (params.avoid_bridging && (base % 10) + ones >= 10) return generateAddOnes(params, level);
    const ans = base + ones;
    const text = `${base} + ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+10)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add to ones`, module: 'C01_Y3_CALC', level };
}

function generateSubtractOnes(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const ones = randomInt(params.ones_range[0], params.ones_range[1]);
    if (params.avoid_bridging && (base % 10) < ones) return generateSubtractOnes(params, level);
    const ans = base - ones;
    const text = `${base} - ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit-10, params.max_3digit)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Subtract from ones`, module: 'C01_Y3_CALC', level };
}

function generateAddTens(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = randomInt(params.tens_range[0]/10, params.tens_range[1]/10) * 10;
    const ans = base + tens;
    const text = `${base} + ${tens} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+100)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add to tens`, module: 'C01_Y3_CALC', level };
}

function generateSubtractTens(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = randomInt(params.tens_range[0]/10, params.tens_range[1]/10) * 10;
    const ans = base - tens;
    const text = `${base} - ${tens} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_3digit)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Subtract from tens`, module: 'C01_Y3_CALC', level };
}

function generateAddHundreds(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const hund = randomInt(params.hundreds_range[0]/100, params.hundreds_range[1]/100) * 100;
    const ans = base + hund;
    const text = `${base} + ${hund} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+200)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add to hundreds`, module: 'C01_Y3_CALC', level };
}

function generateSubtractHundreds(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const hund = randomInt(1, Math.floor(base/100)) * 100;
    const ans = base - hund;
    const text = `${base} - ${hund} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_3digit)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Subtract from hundreds`, module: 'C01_Y3_CALC', level };
}

function generateMixedOperations(params, level) {
    const ops = ['add_ones', 'subtract_ones', 'add_tens', 'subtract_tens', 'add_hundreds'];
    const op = randomChoice(ops);
    // Recurse with selected operation
    return generateQuestion({ ...params, operations: [op] }, level);
}

function generateTwoStepMental(params, level) {
    const base = randomInt(params.min_3digit, params.max_3digit);
    const tens = 20, ones = 5;
    const ans = base + tens + ones;
    const text = `${base} + ${tens} + ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_3digit, params.max_3digit+100)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Add parts`, module: 'C01_Y3_CALC', level };
}

export default {
    moduleId: 'C01_Y3_CALC',
    generate: generateQuestion
};

```
--- END FILE: src\generators\C01_Y3_CALC_mental.js ---

--- START FILE: src\generators\C01_Y5_CALC_mental.js ---
```javascript
/**
 * Year 5 Mental Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors, formatNumber } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        powers_of_10: math.components.powers,
        avoid_bridging: math.config.avoidBridging,
        question_styles: presentation.styles
    };

    if (operation.includes('multiples')) {
        const power = operation.includes('1000') ? 1000 : operation.includes('100') ? 100 : 10;
        return operation.includes('add') ? generateAddMultiples(flatParams, level, power) : generateSubtractMultiples(flatParams, level, power);
    }
    if (operation === 'add_ones_to_4digit') return generateAddOnesTo4Digit(flatParams, level);
    if (operation === 'subtract_ones_from_4digit') return generateSubtractOnesFrom4Digit(flatParams, level);
    if (operation === 'add_any_to_4digit') return generateAddAnyTo4Digit(flatParams, level);
    if (operation === 'compensation') return generateCompensation(flatParams, level);
    if (operation === 'partitioning') return generatePartitioning(flatParams, level);
    if (operation === 'multi_step_mental') return generateMultiStepMental(flatParams, level);
    
    return generateAddMultiples(flatParams, level, 100);
}

function generateAddMultiples(params, level, power) {
    const base = randomInt(params.min_value, params.max_value);
    const add = randomInt(1, 9) * power;
    const ans = base + add;
    const text = `${formatNumber(base)} + ${formatNumber(add)} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, params.min_value, params.max_value+power*10)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add ${power}s`, module: 'C01_Y5_CALC', level };
}

function generateSubtractMultiples(params, level, power) {
    const base = randomInt(params.min_value + power, params.max_value);
    const sub = randomInt(1, Math.floor(base/power)) * power;
    const ans = base - sub;
    const text = `${formatNumber(base)} - ${formatNumber(sub)} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Subtract ${power}s`, module: 'C01_Y5_CALC', level };
}

function generateAddOnesTo4Digit(params, level) {
    const base = randomInt(1000, 9999);
    const ones = randomInt(1, 9);
    if (params.avoid_bridging && (base%10)+ones >= 10) return generateAddOnesTo4Digit(params, level);
    const ans = base + ones;
    const text = `${formatNumber(base)} + ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 10000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add ones`, module: 'C01_Y5_CALC', level };
}

function generateSubtractOnesFrom4Digit(params, level) {
    const base = randomInt(1000, 9999);
    const ones = randomInt(1, 9);
    if (params.avoid_bridging && (base%10) < ones) return generateSubtractOnesFrom4Digit(params, level);
    const ans = base - ones;
    const text = `${formatNumber(base)} - ${ones} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 10000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Subtract ones`, module: 'C01_Y5_CALC', level };
}

function generateAddAnyTo4Digit(params, level) {
    const base = randomInt(1000, 9999);
    const add = randomChoice([10, 20, 100, 200, 1000, 5]);
    const ans = base + add;
    const text = `${formatNumber(base)} + ${add} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 15000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add mentally`, module: 'C01_Y5_CALC', level };
}

function generateCompensation(params, level) {
    const base = 4999;
    const add = randomInt(100, 5000);
    const ans = base + add;
    const text = `${base} + ${add} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 10000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `5000 + ${add} - 1`, module: 'C01_Y5_CALC', level };
}

function generatePartitioning(params, level) {
    const base = 1234;
    const add = 123;
    const ans = base + add;
    const text = `${base} + ${add} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 1000, 2000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `100+20+3`, module: 'C01_Y5_CALC', level };
}

function generateMultiStepMental(params, level) {
    const base = 10000;
    const a = 2000, b = 500;
    const ans = base + a + b;
    const text = `${base} + ${a} + ${b} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 10000, 15000)]);
    return { text, type: 'multiple_choice', options: opts.map(formatNumber), answer: formatNumber(ans), hint: `Add sequentially`, module: 'C01_Y5_CALC', level };
}

export default {
    moduleId: 'C01_Y5_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C01_Y5_CALC_mental.js ---

--- START FILE: src\generators\C02_Y1_CALC_written.js ---
```javascript
/**
 * Year 1 Written Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { generateAddition, generateSubtraction, getAdditionContext, getSubtractionContext } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        result_range: math.range.result,
        allow_zero: math.config.allowZero,
        max_value: math.range.max,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'simple_addition': return generateSimpleAddition(flatParams, level);
        case 'simple_subtraction': return generateSimpleSubtraction(flatParams, level);
        case 'missing_addend': return generateMissingAddend(flatParams, level);
        case 'missing_subtrahend': return generateMissingSubtrahend(flatParams, level);
        case 'missing_minuend': return generateMissingMinuend(flatParams, level);
        case 'symbol_interpretation': return generateSymbolInterpretation(flatParams, level);
        case 'equation_completion': return generateEquationCompletion(flatParams, level);
        case 'true_false_equations': return generateTrueFalse(flatParams, level);
        case 'two_step_problems': return generateTwoStep(flatParams, level);
        case 'complex_missing': return generateComplexMissing(flatParams, level);
        default: return generateSimpleAddition(flatParams, level);
    }
}

function generateSimpleAddition(params, level) {
    const { a, b, answer } = generateAddition(params.result_range[0], params.result_range[1], { allowZero: params.allow_zero });
    const style = randomChoice(params.question_styles);
    if (style === 'word_problem') {
        const ctx = getAdditionContext(a, b, answer);
        return { text: ctx.text, type: 'text_input', answer: answer.toString(), hint: `${a}+${b}=?`, module: 'C02_Y1_CALC', level };
    }
    const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value)]);
    return { text: `${a} + ${b} = ?`, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Add`, module: 'C02_Y1_CALC', level };
}

function generateSimpleSubtraction(params, level) {
    const { a, b, answer } = generateSubtraction(params.result_range[0], params.result_range[1], { allowZero: params.allow_zero, maxMinuend: params.max_value });
    const style = randomChoice(params.question_styles);
    if (style === 'word_problem') {
        const ctx = getSubtractionContext(a, b, answer);
        return { text: ctx.text, type: 'text_input', answer: answer.toString(), hint: `${a}-${b}=?`, module: 'C02_Y1_CALC', level };
    }
    const opts = shuffle([answer, ...generateDistractors(answer, 3, 0, params.max_value)]);
    return { text: `${a} - ${b} = ?`, type: 'multiple_choice', options: opts, answer: answer.toString(), hint: `Subtract`, module: 'C02_Y1_CALC', level };
}

// Implementation details for other functions assumed same as before, using flattened params
function generateMissingAddend(params, level) { /* ... */ return { text: '...', answer: '0', type: 'multiple_choice', options: ['0'] }; } // Placeholder for brevity
function generateMissingSubtrahend(params, level) { /* ... */ return { text: '...', answer: '0', type: 'multiple_choice', options: ['0'] }; }
function generateMissingMinuend(params, level) { /* ... */ return { text: '...', answer: '0', type: 'multiple_choice', options: ['0'] }; }
function generateSymbolInterpretation(params, level) { /* ... */ return { text: '...', answer: '+', type: 'multiple_choice', options: ['+'] }; }
function generateEquationCompletion(params, level) { /* ... */ return { text: '...', answer: '0', type: 'multiple_choice', options: ['0'] }; }
function generateTrueFalse(params, level) { /* ... */ return { text: '...', answer: 'True', type: 'multiple_choice', options: ['True'] }; }
function generateTwoStep(params, level) { /* ... */ return { text: '...', answer: '0', type: 'text_input' }; }
function generateComplexMissing(params, level) { /* ... */ return { text: '...', answer: '0', type: 'text_input' }; }

export default {
    moduleId: 'C02_Y1_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C02_Y1_CALC_written.js ---

--- START FILE: src\generators\C02_Y2_CALC_written.js ---
```javascript
/**
 * Year 2 Written Addition and Subtraction Generator
 * Schema: V2
 */

import { randomChoice } from './helpers/N02_numberHelpers.js';
import { generateTwoDigitPlusOnes, generateTwoDigitMinusOnes, generateTwoDigitPlusTens, generateTwoDigitMinusTens, generateTwoDigitPlusTwoDigit, generateTwoDigitMinusTwoDigit, generateThreeOneDigit, generateComplexMissing } from './helpers/C02_writtenHelpers.js'; 
// Note: Assuming logic extracted to helper or using inline logic from V1

import {
    randomInt,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    generateAddition,
    generateSubtraction,
    checkCarry,
    checkBorrow,
    getRandomName,
    getRandomItem
} from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        max_2digit: math.range.max_2digit,
        ones_range: math.components.ones,
        tens_range: math.components.tens,
        avoid_bridging: math.config.avoidBridging,
        avoid_carry: math.config.avoidCarry,
        three_numbers_max: math.config.threeNumbersMax,
        ensure_complexity: math.config.complexity,
        question_styles: presentation.styles
    };

    switch(operation) {
        case 'twodigit_plus_ones': return generateTwoDigitPlusOnes(flatParams, level);
        case 'twodigit_minus_ones': return generateTwoDigitMinusOnes(flatParams, level);
        case 'twodigit_plus_tens': return generateTwoDigitPlusTens(flatParams, level);
        case 'twodigit_minus_tens': return generateTwoDigitMinusTens(flatParams, level);
        case 'twodigit_plus_twodigit': return generateTwoDigitPlusTwoDigit(flatParams, level);
        case 'twodigit_minus_twodigit': return generateTwoDigitMinusTwoDigit(flatParams, level);
        case 'three_onedigit': return generateThreeOneDigit(flatParams, level);
        case 'complex_missing': return generateComplexMissing(flatParams, level);
        default: return generateTwoDigitPlusOnes(flatParams, level);
    }
}

// Re-implementing V1 logic with new flatParams structure
function generateTwoDigitPlusOnes(params, level) {
    let a, b, answer;
    do {
        a = randomInt(10, params.max_2digit);
        b = randomInt(params.ones_range[0], params.ones_range[1]);
        if (params.avoid_bridging && (a % 10) + b >= 10) continue;
        answer = a + b;
        break;
    } while (true);
    
    const style = randomChoice(params.question_styles);
    if (style === 'word_problem') {
        const name = getRandomName();
        const item = getRandomItem();
        return { text: `${name} has ${a} ${item}. Gets ${b} more. How many now?`, type: 'text_input', answer: answer.toString(), hint: `${a} + ${b}`, module: 'C02_Y2_CALC', level };
    }
    return { text: `${a} + ${b} = ?`, type: 'text_input', answer: answer.toString(), hint: `Add ones`, module: 'C02_Y2_CALC', level };
}
// ... (Other functions would follow similar V1 logic using flatParams)
// Placeholder for brevity to allow full file list
function generateTwoDigitMinusOnes(p, l) { return generateTwoDigitPlusOnes(p, l); }
function generateTwoDigitPlusTens(p, l) { return generateTwoDigitPlusOnes(p, l); }
function generateTwoDigitMinusTens(p, l) { return generateTwoDigitPlusOnes(p, l); }
function generateTwoDigitPlusTwoDigit(p, l) { return generateTwoDigitPlusOnes(p, l); }
function generateTwoDigitMinusTwoDigit(p, l) { return generateTwoDigitPlusOnes(p, l); }
function generateThreeOneDigit(p, l) { return generateTwoDigitPlusOnes(p, l); }
function generateComplexMissing(p, l) { return generateTwoDigitPlusOnes(p, l); }

export default {
    moduleId: 'C02_Y2_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C02_Y2_CALC_written.js ---

--- START FILE: src\generators\C02_Y3_CALC_written.js ---
```javascript
/**
 * Year 3 Written Addition and Subtraction Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { checkCarry, checkBorrow, getRandomName, getRandomItem } from './helpers/C01_C03_calculationHelpers.js';
import { formatColumnar } from './helpers/C02_columnarHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_3digit: math.range.min3,
        max_3digit: math.range.max3,
        result_max: math.range.resultMax,
        ensure_no_carry: math.config.noCarry,
        ensure_no_borrow: math.config.noBorrow,
        allow_single_carry: math.config.allowSingleCarry,
        allow_multiple_carry: math.config.allowMultiCarry,
        allow_exceeding_1000: math.config.exceed1000,
        question_styles: presentation.styles,
        instruction_hint: presentation.hint
    };

    switch(operation) {
        case 'addition_no_carry': return generateAdditionNoCarry(flatParams, level);
        case 'subtraction_no_borrow': return generateSubtractionNoBorrow(flatParams, level);
        case 'addition_simple_carry': return generateAdditionSimpleCarry(flatParams, level);
        case 'subtraction_simple_borrow': return generateSubtractionSimpleBorrow(flatParams, level);
        case 'addition_with_carry': return generateAdditionWithCarry(flatParams, level);
        case 'subtraction_with_borrow': return generateSubtractionWithBorrow(flatParams, level);
        default: return generateAdditionNoCarry(flatParams, level);
    }
}

function generateAdditionNoCarry(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, params.max_3digit);
        ans = a + b;
    } while(checkCarry(a, b) || ans > params.result_max);
    
    return {
        text: `Calculate:\n\n${formatColumnar(a, b, '+')}`,
        type: 'text_input',
        answer: ans.toString(),
        hint: params.instruction_hint,
        module: 'C02_Y3_CALC',
        level: level
    };
}
// ... other functions follow similar pattern using flatParams
function generateSubtractionNoBorrow(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_3digit, params.max_3digit);
        b = randomInt(params.min_3digit, a-1);
        ans = a - b;
    } while(checkBorrow(a, b));
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y3_CALC', level };
}
function generateAdditionSimpleCarry(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }
function generateSubtractionSimpleBorrow(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }
function generateAdditionWithCarry(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }
function generateSubtractionWithBorrow(params, level) { return { text: '...', answer: '0', type: 'text_input' }; }

export default {
    moduleId: 'C02_Y3_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C02_Y3_CALC_written.js ---

--- START FILE: src\generators\C02_Y4_CALC_written.js ---
```javascript
/**
 * Year 4 Written Addition and Subtraction Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { checkCarry, checkBorrow } from './helpers/C01_C03_calculationHelpers.js';
import { formatColumnar } from './helpers/C02_columnarHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_4digit: math.range.min4,
        max_4digit: math.range.max4,
        result_max: math.range.resultMax,
        ensure_no_carry: math.config.noCarry,
        ensure_no_borrow: math.config.noBorrow,
        allow_single_carry: math.config.allowSingleCarry,
        allow_multiple_carry: math.config.allowMultiCarry,
        allow_exceeding_10000: math.config.exceed10000,
        question_styles: presentation.styles,
        instruction_hint: presentation.hint
    };

    switch(operation) {
        case 'addition_no_carry': return generateAdditionNoCarry(flatParams, level);
        case 'subtraction_no_borrow': return generateSubtractionNoBorrow(flatParams, level);
        case 'addition_with_carry': return generateAdditionWithCarry(flatParams, level);
        case 'subtraction_with_borrow': return generateSubtractionWithBorrow(flatParams, level);
        default: return generateAdditionNoCarry(flatParams, level);
    }
}

function generateAdditionNoCarry(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, params.max_4digit);
        ans = a + b;
    } while (checkCarry(a, b) || ans > params.result_max);
    return { text: `Calculate:\n\n${formatColumnar(a, b, '+')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y4_CALC', level };
}

function generateSubtractionNoBorrow(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, a-1);
        ans = a - b;
    } while (checkBorrow(a, b));
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y4_CALC', level };
}

function generateAdditionWithCarry(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, params.max_4digit);
        ans = a + b;
    } while (ans > params.result_max);
    return { text: `Calculate:\n\n${formatColumnar(a, b, '+')}`, type: 'text_input', answer: ans.toString(), hint: 'Carry required', module: 'C02_Y4_CALC', level };
}

function generateSubtractionWithBorrow(params, level) {
    let a, b, ans;
    do {
        a = randomInt(params.min_4digit, params.max_4digit);
        b = randomInt(params.min_4digit, a-1);
        ans = a - b;
    } while (!checkBorrow(a, b)); // Ensure borrow
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: 'Borrow required', module: 'C02_Y4_CALC', level };
}

export default { moduleId: 'C02_Y4_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C02_Y4_CALC_written.js ---

--- START FILE: src\generators\C02_Y5_CALC_written.js ---
```javascript
/**
 * Year 5 Written Addition and Subtraction Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { checkCarry, checkBorrow } from './helpers/C01_C03_calculationHelpers.js';
import { formatColumnar } from './helpers/C02_columnarHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        result_max: math.range.resultMax,
        digits: math.config.digits,
        question_styles: presentation.styles,
        instruction_hint: presentation.hint
    };

    if(operation.includes('addition')) return generateAddition(flatParams, level);
    return generateSubtraction(flatParams, level);
}

function generateAddition(params, level) {
    let a = randomInt(params.min_value, params.max_value);
    let b = randomInt(params.min_value, params.max_value);
    let ans = a + b;
    return { text: `Calculate:\n\n${formatColumnar(a, b, '+')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y5_CALC', level };
}

function generateSubtraction(params, level) {
    let a = randomInt(params.min_value, params.max_value);
    let b = randomInt(params.min_value, a-1);
    let ans = a - b;
    return { text: `Calculate:\n\n${formatColumnar(a, b, '-')}`, type: 'text_input', answer: ans.toString(), hint: params.instruction_hint, module: 'C02_Y5_CALC', level };
}

export default { moduleId: 'C02_Y5_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C02_Y5_CALC_written.js ---

--- START FILE: src\generators\C03_Y2_CALC_estimation.js ---
```javascript
/**
 * Year 2 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { generateAddition } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const flatParams = { min_value: math.range.min, max_value: math.range.max };

    if(operation === 'identify_inverse_check') return generateInverse(flatParams, level);
    return generateInverse(flatParams, level); // Fallback
}

function generateInverse(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);
    const text = `Check ${a} + ${b} = ${answer}. Which subtraction?`;
    const ans = `${answer} - ${a} = ${b}`;
    const opts = shuffle([ans, `${a} - ${b} = ?`, `${answer} + ${a} = ?`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: 'Inverse of add is subtract', module: 'C03_Y2_CALC', level };
}

export default { moduleId: 'C03_Y2_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C03_Y2_CALC_estimation.js ---

--- START FILE: src\generators\C03_Y3_CALC_estimation.js ---
```javascript
/**
 * Year 3 Estimation Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, roundToNearest } from './helpers/N02_numberHelpers.js';
import { generateAddition, generateSubtraction } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_to: math.rounding.bases,
        calculation_types: math.calcTypes
    };

    switch(operation) {
        case 'estimate_by_rounding': return generateEstimateByRounding(flatParams, level);
        case 'check_with_inverse': return generateCheckWithInverse(flatParams, level);
        default: return generateEstimateByRounding(flatParams, level);
    }
}

function generateEstimateByRounding(params, level) {
    const type = randomChoice(params.calculation_types);
    const base = randomChoice(params.rounding_to);

    if (type === 'addition') {
        const { a, b } = generateAddition(params.min_value, params.max_value);
        const est = roundToNearest(a, base) + roundToNearest(b, base);
        return { text: `Estimate ${a} + ${b} (round to ${base})`, type: 'multiple_choice', options: shuffle([est, est+base, est-base]), answer: est.toString(), hint: `Round then add`, module: 'C03_Y3_CALC', level };
    } else {
        const { a, b } = generateSubtraction(params.min_value, params.max_value);
        const est = roundToNearest(a, base) - roundToNearest(b, base);
        return { text: `Estimate ${a} - ${b} (round to ${base})`, type: 'multiple_choice', options: shuffle([est, est+base, est-base]), answer: est.toString(), hint: `Round then subtract`, module: 'C03_Y3_CALC', level };
    }
}

function generateCheckWithInverse(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);
    const text = `${a} + ${b} = ${answer}. Check?`;
    const ans = `${answer} - ${a} = ${b}`;
    const opts = shuffle([ans, `${a}-${b}`, `${answer}+${a}`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: `Inverse`, module: 'C03_Y3_CALC', level };
}

export default {
    moduleId: 'C03_Y3_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C03_Y3_CALC_estimation.js ---

--- START FILE: src\generators\C03_Y4_CALC_estimation.js ---
```javascript
/**
 * Year 4 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, roundToNearest } from './helpers/N02_numberHelpers.js';
import { generateAddition } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_to: math.rounding.bases
    };
    
    return generateEstimate(flatParams, level);
}

function generateEstimate(params, level) {
    const { a, b } = generateAddition(params.min_value, params.max_value);
    const base = randomChoice(params.rounding_to);
    const est = roundToNearest(a, base) + roundToNearest(b, base);
    return { 
        text: `Estimate ${a} + ${b} (nearest ${base})`, 
        type: 'multiple_choice', 
        options: shuffle([est.toString(), (est+base).toString(), (est-base).toString()]), 
        answer: est.toString(), 
        hint: `Round then add`, 
        module: 'C03_Y4_CALC', 
        level 
    };
}

export default { moduleId: 'C03_Y4_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C03_Y4_CALC_estimation.js ---

--- START FILE: src\generators\C03_Y5_CALC_estimation.js ---
```javascript
/**
 * Year 5 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, roundToNearest } from './helpers/N02_numberHelpers.js';
import { generateAddition } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_to: math.rounding.bases
    };
    return generateRoundToCheck(flatParams, level);
}

function generateRoundToCheck(params, level) {
    const { a, b, answer } = generateAddition(params.min_value, params.max_value);
    const base = randomChoice(params.rounding_to);
    const est = roundToNearest(a, base) + roundToNearest(b, base);
    const fake = answer + 2000; // Wrong answer
    return {
        text: `Is ${a} + ${b} = ${fake} reasonable? (Round to ${base})`,
        type: 'multiple_choice',
        options: ['Yes', 'No'],
        answer: 'No',
        hint: `Estimate is ${est}`,
        module: 'C03_Y5_CALC',
        level
    };
}

export default { moduleId: 'C03_Y5_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C03_Y5_CALC_estimation.js ---

--- START FILE: src\generators\C03_Y6_CALC_estimation.js ---
```javascript
/**
 * Year 6 Estimation Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    return generateContextRounding(params, level);
}

function generateContextRounding(params, level) {
    const q = {
        text: "For a stadium crowd of 45,678, what is the best rounding?",
        options: ["Nearest 10", "Nearest 10,000", "Nearest 1"],
        answer: "Nearest 10,000"
    };
    return {
        text: q.text,
        type: 'multiple_choice',
        options: shuffle(q.options),
        answer: q.answer,
        hint: "Think about appropriate accuracy",
        module: 'C03_Y6_CALC',
        level
    };
}

export default { moduleId: 'C03_Y6_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C03_Y6_CALC_estimation.js ---

--- START FILE: src\generators\C04_Y1_CALC_problems.js ---
```javascript
/**
 * Year 1 Problem Solving Generator
 * Schema: V2
 */

import { randomChoice, shuffle } from './helpers/N02_numberHelpers.js';
import { generateOneStepAddition, generateOneStepSubtraction, generateOneStepDistractors } from './helpers/C04_problemHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        number_range: [math.range.min, math.range.max],
        max_value: math.range.max,
        allow_zero: math.config.allowZero,
        question_format: presentation.format
    };

    switch(operation) {
        case 'simple_addition_word': return generateSimpleAdditionWord(flatParams, level);
        case 'simple_subtraction_word': return generateSimpleSubtractionWord(flatParams, level);
        default: return generateSimpleAdditionWord(flatParams, level);
    }
}

function generateSimpleAdditionWord(params, level) {
    const problem = generateOneStepAddition(params.number_range[0], params.max_value, params);
    if (params.question_format === 'multiple_choice') {
        const opts = shuffle([problem.answer, ...generateOneStepDistractors(problem.answer, problem.values, 'addition', params.max_value)]);
        return { text: problem.text, type: 'multiple_choice', options: opts, answer: problem.answer.toString(), hint: problem.working, module: 'C04_Y1_CALC', level };
    }
    return { text: problem.text, type: 'text_input', answer: problem.answer.toString(), hint: problem.working, module: 'C04_Y1_CALC', level };
}

function generateSimpleSubtractionWord(params, level) {
    const problem = generateOneStepSubtraction(params.number_range[0], params.max_value, params);
    // Same logic as addition
    return { text: problem.text, type: 'text_input', answer: problem.answer.toString(), hint: problem.working, module: 'C04_Y1_CALC', level };
}

export default {
    moduleId: 'C04_Y1_CALC',
    generate: generateQuestion
};
```
--- END FILE: src\generators\C04_Y1_CALC_problems.js ---

--- START FILE: src\generators\C04_Y2_CALC_problems.js ---
```javascript
/**
 * Year 2 Problem Solving Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';
import { generateOneStepAddition } from './helpers/C04_problemHelpers.js';

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    const flatParams = {
        number_range: [math.range.min, math.range.max],
        max_value: math.range.max,
        allow_zero: math.config.allowZero
    };

    const problem = generateOneStepAddition(flatParams.number_range[0], flatParams.max_value, flatParams);
    
    // Simple money variant for Y2
    if (presentation.contexts.includes('money_pence')) {
        return {
            text: `Toy costs ${problem.values.a}p. Book costs ${problem.values.b}p. Total?`,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: `${problem.values.a} + ${problem.values.b}`,
            module: 'C04_Y2_CALC',
            level
        };
    }

    return {
        text: problem.text,
        type: 'text_input',
        answer: problem.answer.toString(),
        hint: problem.working,
        module: 'C04_Y2_CALC',
        level
    };
}

export default { moduleId: 'C04_Y2_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C04_Y2_CALC_problems.js ---

--- START FILE: src\generators\C04_Y3_CALC_problems.js ---
```javascript
/**
 * Year 3 Problem Solving Generator
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const a = randomInt(math.range.min, math.range.max);
    const b = randomInt(10, 50);
    const ans = a + b;
    return {
        text: `There are ${a} books. ${b} more arrive. Total?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `${a} + ${b}`,
        module: 'C04_Y3_CALC',
        level
    };
}

export default { moduleId: 'C04_Y3_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C04_Y3_CALC_problems.js ---

--- START FILE: src\generators\C04_Y4_CALC_problems.js ---
```javascript
/**
 * Year 4 Problem Solving Generator (Two-Step)
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const start = randomInt(math.range.min, math.range.max);
    const add = 50;
    const sub = 20;
    const ans = start + add - sub;
    
    return {
        text: `Start with ${start}. Add ${add}, then subtract ${sub}. Answer?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `Two steps`,
        module: 'C04_Y4_CALC',
        level
    };
}

export default { moduleId: 'C04_Y4_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C04_Y4_CALC_problems.js ---

--- START FILE: src\generators\C04_Y5_CALC_problems.js ---
```javascript
/**
 * Year 5 Problem Solving Generator (Multi-Step)
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const start = randomInt(math.range.min, math.range.max);
    const ans = start + 100 - 50 + 25;
    
    return {
        text: `Shop has ${start} items. 100 arrive, 50 sold, 25 returned. Total?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `3 steps`,
        module: 'C04_Y5_CALC',
        level
    };
}

export default { moduleId: 'C04_Y5_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C04_Y5_CALC_problems.js ---

--- START FILE: src\generators\C04_Y6_CALC_problems.js ---
```javascript
/**
 * Year 6 Problem Solving Generator (Advanced)
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const start = randomInt(math.range.min, math.range.max);
    const ans = start * 2 + 500;
    
    return {
        text: `City pop ${start}. Doubles, then 500 move in. Total?`,
        type: 'text_input',
        answer: ans.toString(),
        hint: `Multi-step with large numbers`,
        module: 'C04_Y6_CALC',
        level
    };
}

export default { moduleId: 'C04_Y6_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C04_Y6_CALC_problems.js ---

--- START FILE: src\generators\C05_Y5_CALC_properties.js ---
```javascript
/**
 * Year 5 Properties of Number Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { getFactorPairs, getMultiplesUpTo, isPrime } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    // Flatten relevant params for specific functions
    const flatParams = {
        multiple_bases: math.multiples.bases,
        multiple_range: math.multiples.range,
        factor_numbers: math.factors.targetStr || math.factors.targets,
        prime_recall_range: math.primes.recallRange,
        prime_identify_range: math.primes.identifyRange,
        square_bases: math.powers.squareBases,
        cube_bases: math.powers.cubeBases,
        power_range: math.powers.range,
        include_prime_factorization: math.primes.factorization
    };

    switch(operation) {
        case 'identify_multiples': return generateIdentifyMultiples(flatParams, level);
        case 'find_factor_pairs': return generateFindFactorPairs(flatParams, level);
        case 'identify_primes': return generateIdentifyPrimes(flatParams, level);
        case 'squares_cubes': return generateSquaresCubes(flatParams, level);
        case 'prime_factors': return generatePrimeFactors(flatParams, level);
        default: return generateIdentifyMultiples(flatParams, level);
    }
}

function generateIdentifyMultiples(params, level) {
    const base = randomChoice(params.multiple_bases);
    const type = randomChoice(['is_multiple', 'which_is']);
    
    if (type === 'is_multiple') {
        const isMult = Math.random() < 0.5;
        const mult = isMult ? base * randomInt(2, 10) : (base * randomInt(2, 10)) + 1;
        return {
            text: `Is ${mult} a multiple of ${base}?`,
            type: 'multiple_choice',
            options: ['Yes', 'No'],
            answer: isMult ? 'Yes' : 'No',
            hint: `Count in ${base}s`,
            module: 'C05_Y5_CALC',
            level
        };
    }
    const ans = base * randomInt(2, 10);
    const opts = shuffle([ans, ans+1, ans-1, ans+2]);
    return { text: `Which is a multiple of ${base}?`, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Divisible by ${base}`, module: 'C05_Y5_CALC', level };
}

function generateFindFactorPairs(params, level) {
    let num;
    if (typeof params.factor_numbers === 'string') {
        num = randomInt(4, 50);
    } else {
        num = randomChoice(params.factor_numbers);
    }
    const pairs = getFactorPairs(num);
    const pair = randomChoice(pairs);
    const known = pair[0];
    const unknown = pair[1];
    
    return {
        text: `Complete factor pair: ${known} × ___ = ${num}`,
        type: 'text_input',
        answer: unknown.toString(),
        hint: `${num} ÷ ${known}`,
        module: 'C05_Y5_CALC',
        level
    };
}

function generateIdentifyPrimes(params, level) {
    const num = randomInt(params.prime_identify_range[0], params.prime_identify_range[1]);
    const ans = isPrime(num) ? 'Yes' : 'No';
    return { text: `Is ${num} prime?`, type: 'multiple_choice', options: ['Yes', 'No'], answer: ans, hint: `Factors of ${num}`, module: 'C05_Y5_CALC', level };
}

function generateSquaresCubes(params, level) {
    const type = randomChoice(['square', 'cube']);
    const base = type === 'square' ? randomChoice(params.square_bases) : randomChoice(params.cube_bases);
    const ans = type === 'square' ? base * base : base * base * base;
    const symbol = type === 'square' ? '²' : '³';
    return { text: `What is ${base}${symbol}?`, type: 'text_input', answer: ans.toString(), hint: `${base} × ${base}${type==='cube' ? ' × '+base : ''}`, module: 'C05_Y5_CALC', level };
}

function generatePrimeFactors(params, level) {
    // Simplified for example
    const num = randomChoice([12, 18, 20, 30]);
    return { text: `Is 3 a prime factor of ${num}?`, type: 'multiple_choice', options: ['Yes', 'No'], answer: num%3===0 ? 'Yes' : 'No', hint: `Check division`, module: 'C05_Y5_CALC', level };
}

export default { moduleId: 'C05_Y5_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C05_Y5_CALC_properties.js ---

--- START FILE: src\generators\C05_Y6_CALC_properties.js ---
```javascript
/**
 * Year 6 Common Factors/Multiples Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { getCommonFactors, getLCM, getGCF } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    // Flatten for helpers
    const flatParams = {
        common_factor_range: math.commonFactors ? math.commonFactors.range : [10, 50],
        common_multiple_range: math.commonMultiples ? math.commonMultiples.range : [2, 10],
        prime_range: math.primes ? math.primes.range : [1, 50]
    };

    switch(operation) {
        case 'common_factors': return generateCommonFactors(flatParams, level);
        case 'common_multiples': return generateCommonMultiples(flatParams, level);
        default: return generateCommonFactors(flatParams, level);
    }
}

function generateCommonFactors(params, level) {
    const n1 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
    const n2 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
    const factors = getCommonFactors(n1, n2);
    const ans = factors.length;
    const distractors = [ans+1, ans-1, ans+2].filter(d=>d>0);
    
    return {
        text: `How many common factors do ${n1} and ${n2} have?`,
        type: 'multiple_choice',
        options: shuffle([ans, ...distractors]),
        answer: ans.toString(),
        hint: `List factors of both`,
        module: 'C05_Y6_CALC',
        level
    };
}

function generateCommonMultiples(params, level) {
    const n1 = randomInt(2, 10);
    const n2 = randomInt(2, 10);
    const ans = getLCM(n1, n2);
    const distractors = [ans*2, ans+n1, ans-n1].filter(d=>d>0 && d!==ans);
    
    return {
        text: `What is the Lowest Common Multiple (LCM) of ${n1} and ${n2}?`,
        type: 'multiple_choice',
        options: shuffle([ans, ...distractors]),
        answer: ans.toString(),
        hint: `List multiples`,
        module: 'C05_Y6_CALC',
        level
    };
}

export default { moduleId: 'C05_Y6_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C05_Y6_CALC_properties.js ---

--- START FILE: src\generators\C06_Y2_CALC_mental_multiply.js ---
```javascript
/**
 * Year 2 Mental Multiplication
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const flatParams = {
        tables: math.tables,
        min_multiplier: math.multiplier.min,
        max_multiplier: math.multiplier.max,
        max_product: math.product.max
    };

    if(operation === 'multiply_recall') return generateMultiplyRecall(flatParams, level);
    return generateMultiplyRecall(flatParams, level);
}

function generateMultiplyRecall(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = table * mult;
    const text = `${table} × ${mult} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_product)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Count in ${table}s`, module: 'C06_Y2_CALC', level };
}
export default { moduleId: 'C06_Y2_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C06_Y2_CALC_mental_multiply.js ---

--- START FILE: src\generators\C06_Y3_CALC_mental_multiply.js ---
```javascript
/**
 * Year 3 Mental Multiplication
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        tables: math.tables,
        min_multiplier: math.multiplier.min,
        max_multiplier: math.multiplier.max,
        max_product: math.product.max
    };

    if(operation === 'multiply_recall') return generateMultiplyRecall(flatParams, level);
    if(operation === 'divide_recall') return generateDivideRecall(flatParams, level);
    return generateMultiplyRecall(flatParams, level);
}

function generateMultiplyRecall(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = table * mult;
    const text = `${table} × ${mult} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_product)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Count in ${table}s`, module: 'C06_Y3_CALC', level };
}

function generateDivideRecall(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const div = table * mult;
    const text = `${div} ÷ ${table} = ?`;
    const opts = shuffle([mult, ...generateDistractors(mult, 3, 1, params.max_multiplier)]);
    return { text, type: 'multiple_choice', options: opts, answer: mult.toString(), hint: `Inverse of ×${table}`, module: 'C06_Y3_CALC', level };
}

export default { moduleId: 'C06_Y3_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C06_Y3_CALC_mental_multiply.js ---

--- START FILE: src\generators\C06_Y4_CALC_mental_multiply.js ---
```javascript
/**
 * Year 4 Mental Multiplication
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        tables: math.tables,
        min_multiplier: math.multiplier.min,
        max_multiplier: math.multiplier.max,
        max_product: math.product.max
    };

    if(operation === 'multiply_three') return generateMultiplyThree(flatParams, level);
    return generateMultiplyRecall(flatParams, level);
}

function generateMultiplyRecall(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = table * mult;
    const text = `${table} × ${mult} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_product)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Count in ${table}s`, module: 'C06_Y4_CALC', level };
}

function generateMultiplyThree(params, level) {
    const a = randomInt(2, 5);
    const b = randomInt(2, 5);
    const c = randomInt(2, 5);
    const ans = a * b * c;
    const text = `${a} × ${b} × ${c} = ?`;
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_product)]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Multiply first two, then result by third`, module: 'C06_Y4_CALC', level };
}

export default { moduleId: 'C06_Y4_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C06_Y4_CALC_mental_multiply.js ---

--- START FILE: src\generators\C06_Y5_CALC_mental_multiply.js ---
```javascript
/**
 * Year 5 Mental Multiplication
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors, formatNumber } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        powers: math.powers,
        range_whole: math.range.whole,
        allow_decimals: math.decimals.allow,
        decimal_places: math.decimals.places
    };

    if(operation === 'multiply_by_10') return generateMultiplyPower(flatParams, 10, level);
    if(operation === 'multiply_by_100') return generateMultiplyPower(flatParams, 100, level);
    if(operation === 'multiply_by_1000') return generateMultiplyPower(flatParams, 1000, level);
    return generateMultiplyPower(flatParams, 10, level);
}

function generateMultiplyPower(params, power, level) {
    let num;
    if (params.allow_decimals && Math.random() < 0.5) {
        num = randomInt(1, 9) + randomChoice([0.1, 0.5, 0.01]);
    } else {
        num = randomInt(params.range_whole[0], params.range_whole[1]);
    }
    // Fix float precision
    num = parseFloat(num.toFixed(3));
    const ans = parseFloat((num * power).toFixed(3));
    
    const text = `${num} × ${power} = ?`;
    const opts = shuffle([ans, parseFloat((num * power * 10).toFixed(3)), parseFloat((num * power / 10).toFixed(3)), parseFloat((num + power).toFixed(3))]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Move decimal point`, module: 'C06_Y5_CALC', level };
}

export default { moduleId: 'C06_Y5_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C06_Y5_CALC_mental_multiply.js ---

--- START FILE: src\generators\C06_Y6_CALC_mental_multiply.js ---
```javascript
/**
 * Year 6 Mental Mixed Operations
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const flatParams = { range: math.range.num };

    if(operation === 'four_operations') return generateFourOps(flatParams, level);
    return generateTwoOps(flatParams, level);
}

function generateTwoOps(params, level) {
    const a = randomInt(2, 10);
    const b = randomInt(2, 10);
    const c = randomInt(2, 10);
    // a + b x c
    const ans = a + (b * c);
    const text = `${a} + ${b} × ${c} = ?`;
    const opts = shuffle([ans, (a+b)*c, ans+10]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `BIDMAS: Multiply first`, module: 'C06_Y6_CALC', level };
}

function generateFourOps(params, level) {
    // (a + b) / c
    const c = randomInt(2, 5);
    const res = randomInt(2, 10);
    const sum = c * res;
    const a = randomInt(1, sum-1);
    const b = sum - a;
    
    const ans = res;
    const text = `(${a} + ${b}) ÷ ${c} = ?`;
    const opts = shuffle([ans, ans+1, ans*2]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Brackets first`, module: 'C06_Y6_CALC', level };
}

export default { moduleId: 'C06_Y6_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C06_Y6_CALC_mental_multiply.js ---

--- START FILE: src\generators\C07_Y2_CALC_written.js ---
```javascript
/**
 * Year 2 Written Statements
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        tables: math.tables,
        min_multiplier: math.multiplier.min,
        max_multiplier: math.multiplier.max
    };

    if(operation === 'write_multiplication') return generateWriteMultiplication(flatParams, level);
    return generateCalculate(flatParams, level);
}

function generateWriteMultiplication(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = `${mult} × ${table} = ${mult*table}`;
    const text = `Write "${mult} groups of ${table}" as a calculation.`;
    const opts = shuffle([ans, `${mult} + ${table} = ${mult+table}`, `${table} ÷ ${mult}`]);
    return { text, type: 'multiple_choice', options: opts, answer: ans, hint: `Use × symbol`, module: 'C07_Y2_CALC', level };
}

function generateCalculate(params, level) {
    const table = randomChoice(params.tables);
    const mult = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = table * mult;
    return { text: `${table} × ${mult} = ?`, type: 'text_input', answer: ans.toString(), hint: `Use times tables`, module: 'C07_Y2_CALC', level };
}

export default { moduleId: 'C07_Y2_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C07_Y2_CALC_written.js ---

--- START FILE: src\generators\C07_Y3_CALC_written.js ---
```javascript
/**
 * Year 3 Written Multiplication Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { formatColumnarMultiply } from './helpers/C07_multiplicationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        multiplicand_range: math.range.multiplicand,
        multiplier_range: math.range.multiplier,
        require_carrying: math.config.carry
    };

    if (operation === 'columnar_multiply') return generateColumnar(flatParams, level);
    return generateColumnar(flatParams, level);
}

function generateColumnar(params, level) {
    const m1 = randomInt(params.multiplicand_range[0], params.multiplicand_range[1]);
    const m2 = randomInt(params.multiplier_range[0], params.multiplier_range[1]);
    const ans = m1 * m2;
    const display = formatColumnarMultiply(m1, m2, false);
    const opts = shuffle([ans, ...generateDistractors(ans, 3, 10, 1000)]);
    return { text: `Calculate:\n\n${display}`, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: 'Use columns', module: 'C07_Y3_CALC', level };
}

export default { moduleId: 'C07_Y3_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C07_Y3_CALC_written.js ---

--- START FILE: src\generators\C07_Y4_CALC_written.js ---
```javascript
/**
 * Year 4 Written Calculation
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { formatColumnarMultiply } from './helpers/C07_multiplicationHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const flatParams = {
        min_multiplicand: math.range.multiplicand[0],
        max_multiplicand: math.range.multiplicand[1],
        min_multiplier: math.range.multiplier[0],
        max_multiplier: math.range.multiplier[1]
    };
    return generateColumnar(flatParams, level);
}

function generateColumnar(params, level) {
    const m1 = randomInt(params.min_multiplicand, params.max_multiplicand);
    const m2 = randomInt(params.min_multiplier, params.max_multiplier);
    const ans = m1 * m2;
    const text = `Calculate:\n\n${formatColumnarMultiply(m1, m2, false)}`;
    return { text, type: 'text_input', answer: ans.toString(), hint: `Column multiplication`, module: 'C07_Y4_CALC', level };
}

export default { moduleId: 'C07_Y4_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C07_Y4_CALC_written.js ---

--- START FILE: src\generators\C07_Y5_CALC_written.js ---
```javascript
/**
 * Year 5 Written Calculation
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';
import { formatColumnarMultiply } from './helpers/C07_multiplicationHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    // Using array[0] and array[1] for range
    const flatParams = {
        min_mult: math.range.multiply[0],
        max_mult: math.range.multiply[1],
        min_div: math.range.divide[0],
        max_div: math.range.divide[1]
    };
    
    const type = randomChoice(['mult', 'div']);
    if(type === 'mult') return generateMult(flatParams, level);
    return generateDiv(flatParams, level);
}

function generateMult(params, level) {
    const m1 = randomInt(params.min_mult, params.max_mult);
    const m2 = randomInt(2, 9);
    const ans = m1 * m2;
    return { text: `Calculate:\n\n${formatColumnarMultiply(m1, m2, false)}`, type: 'text_input', answer: ans.toString(), hint: `Column multiplication`, module: 'C07_Y5_CALC', level };
}

function generateDiv(params, level) {
    const d = randomInt(2, 9);
    const q = randomInt(10, 100);
    const n = d * q; // exact division
    return { text: `${n} ÷ ${d} = ?`, type: 'text_input', answer: q.toString(), hint: `Short division`, module: 'C07_Y5_CALC', level };
}

export default { moduleId: 'C07_Y5_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C07_Y5_CALC_written.js ---

--- START FILE: src\generators\C07_Y6_CALC_written.js ---
```javascript
/**
 * Year 6 Written Calculation
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const flatParams = {
        min_mult: math.range.multiply[0],
        max_mult: math.range.multiply[1],
        min_div: math.range.divide[0],
        max_div: math.range.divide[1]
    };
    
    return generateLongDiv(flatParams, level);
}

function generateLongDiv(params, level) {
    const d = randomInt(11, 30);
    const q = randomInt(10, 50);
    const n = d * q;
    return { text: `Calculate ${n} ÷ ${d}`, type: 'text_input', answer: q.toString(), hint: `Long division`, module: 'C07_Y6_CALC', level };
}

export default { moduleId: 'C07_Y6_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C07_Y6_CALC_written.js ---

--- START FILE: src\generators\C08_Y1_CALC_properties.js ---
```javascript
/**
 * Year 1 Properties Problems
 * Schema: V2
 */
import { randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const table = randomChoice(math.tables);
    const groups = 2; 
    const ans = table * groups;
    const text = `There are ${groups} groups of ${table}. How many altogether?`;
    const opts = shuffle([ans, ans+1, ans-1]);
    
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Count them`, module: 'C08_Y1_CALC', level };
}
export default { moduleId: 'C08_Y1_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C08_Y1_CALC_properties.js ---

--- START FILE: src\generators\C08_Y2_CALC_properties.js ---
```javascript
/**
 * Year 2 Properties Problems
 * Schema: V2
 */
import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const table = randomChoice(math.tables);
    const groups = randomInt(2, 5);
    const ans = table * groups;
    const text = `${groups} bags of ${table} sweets. Total?`;
    const opts = shuffle([ans, ans+table, ans-1]);
    
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `${groups} x ${table}`, module: 'C08_Y2_CALC', level };
}
export default { moduleId: 'C08_Y2_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C08_Y2_CALC_properties.js ---

--- START FILE: src\generators\C08_Y3_CALC_properties.js ---
```javascript
/**
 * Year 3 Scaling Problems
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const scale = randomChoice(math.scaling);
    const cost = randomInt(2, 10);
    const ans = cost * scale;
    const text = `One book costs £${cost}. How much do ${scale} books cost?`;
    
    return { text, type: 'text_input', answer: ans.toString(), hint: `${cost} x ${scale}`, module: 'C08_Y3_CALC', level };
}
export default { moduleId: 'C08_Y3_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C08_Y3_CALC_properties.js ---

--- START FILE: src\generators\C08_Y4_CALC_properties.js ---
```javascript
/**
 * Year 4 Distributive Problems
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const a = 14, b = 3;
    const ans = a * b;
    const text = `Calculate 14 × 3 using (10 × 3) + (4 × 3)`;
    
    return { text, type: 'text_input', answer: ans.toString(), hint: `30 + 12`, module: 'C08_Y4_CALC', level };
}
export default { moduleId: 'C08_Y4_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C08_Y4_CALC_properties.js ---

--- START FILE: src\generators\C08_Y5_CALC_properties.js ---
```javascript
/**
 * Year 5 Factor Problems
 * Schema: V2
 */
import { randomInt, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const num = 24;
    const text = `How many factors does ${num} have?`;
    // 1, 2, 3, 4, 6, 8, 12, 24 = 8 factors
    const ans = 8;
    const opts = shuffle([6, 8, 10]);
    
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `List them all`, module: 'C08_Y5_CALC', level };
}
export default { moduleId: 'C08_Y5_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C08_Y5_CALC_properties.js ---

--- START FILE: src\generators\C08_Y6_CALC_properties.js ---
```javascript
/**
 * Year 6 Mixed Problems
 * Schema: V2
 */
import { randomInt } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const val = randomInt(100, 500);
    const pct = 10;
    const ans = val / 10;
    const text = `Find ${pct}% of ${val}`;
    
    return { text, type: 'text_input', answer: ans.toString(), hint: `Divide by 10`, module: 'C08_Y6_CALC', level };
}
export default { moduleId: 'C08_Y6_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C08_Y6_CALC_properties.js ---

--- START FILE: src\generators\C09_Y6_CALC_order.js ---
```javascript
/**
 * Year 6 Order of Operations Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    const flatParams = {
        number_range: math.range.num,
        question_format: presentation.format
    };

    if (operation === 'simple_two_operation') return generateSimple(flatParams, level);
    return generateSimple(flatParams, level);
}

function generateSimple(params, level) {
    const a = randomInt(params.number_range[0], params.number_range[1]);
    const b = randomInt(2, 5);
    const c = randomInt(2, 5);
    const ans = a + (b * c);
    const text = `${a} + ${b} × ${c} = ?`;
    const opts = shuffle([ans, (a+b)*c, ans+1]);
    return { text, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: 'Multiply first', module: 'C09_Y6_CALC', level };
}

export default { moduleId: 'C09_Y6_CALC', generate: generateQuestion };
```
--- END FILE: src\generators\C09_Y6_CALC_order.js ---

--- START FILE: src\generators\DEPRECATED_M09_MEAS_problems.js ---
```javascript
/**
 * M09_MEAS: Measurement Problem Solving Generators
 * Covers Years 2-6 progression for solving problems with measurements
 *
 * Year 2: Money only (same unit), addition/subtraction, giving change
 * Year 3: All measures, addition/subtraction, mixed units
 * Year 4: All four operations, scaling problems
 * Year 5: Decimals, all operations, scaling, multi-step
 * Year 6: Unit conversions, 3 decimal places, area/volume
 */

import { getParameters } from '../curriculum/parameters.js';

/**
 * Helper: Format money value with appropriate symbol
 */
function formatMoney(value, asPounds = false) {
    if (asPounds) {
        return `£${value.toFixed(2)}`;
    } else {
        return `${Math.round(value)}p`;
    }
}

/**
 * Helper: Format length with appropriate unit
 */
function formatLength(valueInCm, useMixed = false) {
    if (valueInCm >= 100 && useMixed) {
        const m = Math.floor(valueInCm / 100);
        const cm = valueInCm % 100;
        if (cm === 0) return `${m}m`;
        return `${m}m ${cm}cm`;
    }
    return `${valueInCm}cm`;
}

/**
 * Helper: Format mass with appropriate unit
 */
function formatMass(valueInG, useMixed = false) {
    if (valueInG >= 1000 && useMixed) {
        const kg = Math.floor(valueInG / 1000);
        const g = valueInG % 1000;
        if (g === 0) return `${kg}kg`;
        return `${kg}kg ${g}g`;
    }
    return `${valueInG}g`;
}

/**
 * Helper: Format capacity with appropriate unit
 */
function formatCapacity(valueInMl, useMixed = false) {
    if (valueInMl >= 1000 && useMixed) {
        const l = Math.floor(valueInMl / 1000);
        const ml = valueInMl % 1000;
        if (ml === 0) return `${l}l`;
        return `${l}l ${ml}ml`;
    }
    return `${valueInMl}ml`;
}

/**
 * Helper: Random element from array
 */
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Helper: Random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Helper: Round to specified decimal places
 */
function roundTo(value, decimals) {
    return Number(value.toFixed(decimals));
}

/**
 * YEAR 2: Money problem solving (same unit)
 */
function generateYear2Question(params) {
    const operation = randomChoice(params.operations);
    const context = randomChoice(params.contexts);
    const isPence = params.unit === 'pence_only';

    if (operation === 'add_money') {
        // Simple addition
        const value1 = randomInt(params.min_value, params.max_value);
        const value2 = randomInt(params.min_value, Math.min(params.max_value, params.max_total - value1));
        const answer = value1 + value2;

        const items = ['toy', 'book', 'pencil', 'sticker', 'sweet', 'balloon'];
        const item1 = randomChoice(items);
        const item2 = randomChoice(items.filter(i => i !== item1));

        return {
            text: `A ${item1} costs ${formatMoney(value1, !isPence)}. A ${item2} costs ${formatMoney(value2, !isPence)}. How much do they cost altogether?`,
            type: 'text_input',
            answer: String(answer),
            hint: `Add the two amounts together`,
            units: isPence ? 'pence' : 'pounds'
        };
    } else if (operation === 'subtract_money') {
        // Simple subtraction
        const total = randomInt(params.min_value + 10, params.max_total);
        const spent = randomInt(params.min_value, total - params.min_value);
        const answer = total - spent;

        return {
            text: `You have ${formatMoney(total, !isPence)}. You spend ${formatMoney(spent, !isPence)}. How much money do you have left?`,
            type: 'text_input',
            answer: String(answer),
            hint: `Subtract what you spent from what you had`,
            units: isPence ? 'pence' : 'pounds'
        };
    } else if (operation === 'give_change') {
        // Giving change
        const cost = randomInt(params.min_value, params.max_total - 10);
        const payment = randomChoice(params.payment_amounts);
        const change = payment - cost;

        const items = ['toy', 'book', 'pencil', 'sticker', 'sweet', 'balloon', 'comic', 'eraser'];
        const item = randomChoice(items);

        return {
            text: `You buy a ${item} for ${formatMoney(cost, !isPence)}. You pay with ${formatMoney(payment, !isPence)}. How much change do you get?`,
            type: 'text_input',
            answer: String(change),
            hint: `Change = amount paid - cost`,
            units: isPence ? 'pence' : 'pounds'
        };
    } else if (operation === 'multi_item') {
        // Multiple items
        const value1 = randomInt(params.min_value, Math.floor(params.max_total / 2));
        const value2 = randomInt(params.min_value, Math.floor(params.max_total / 2));
        const total = value1 + value2;
        const payment = randomChoice(params.payment_amounts);
        const change = payment - total;

        return {
            text: `You buy items costing ${formatMoney(value1, !isPence)} and ${formatMoney(value2, !isPence)}. You pay with ${formatMoney(payment, !isPence)}. How much change do you get?`,
            type: 'text_input',
            answer: String(change),
            hint: `First add the costs, then subtract from amount paid`,
            units: isPence ? 'pence' : 'pounds'
        };
    }
}

/**
 * YEAR 3: Multi-measure problems (all measurement types)
 */
function generateYear3Question(params) {
    const operation = randomChoice(params.operations);
    const measureType = randomChoice(params.measure_types);
    const context = randomChoice(params.contexts);

    if (measureType === 'money') {
        if (operation === 'add_measure') {
            let value1, value2, answer;
            if (params.money_unit === 'pence_only') {
                value1 = randomInt(params.money_range[0], params.money_range[1]);
                value2 = randomInt(params.money_range[0], params.money_range[1]);
                answer = value1 + value2;
                return {
                    text: `You have ${value1}p and you earn ${value2}p more. How much money do you have now in pence?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: `Add the two amounts`,
                    units: 'pence'
                };
            } else {
                // Mixed or decimal money
                value1 = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
                value2 = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
                answer = roundTo(value1 + value2, 2);
                return {
                    text: `A notebook costs £${value1.toFixed(2)} and a pen costs £${value2.toFixed(2)}. What is the total cost in pounds?`,
                    type: 'text_input',
                    answer: answer.toFixed(2),
                    hint: `Add the two amounts`,
                    units: 'pounds'
                };
            }
        } else if (operation === 'give_change') {
            const cost = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
            const payment = randomChoice(params.payment_amounts);
            const change = roundTo(payment - cost, 2);
            return {
                text: `An item costs £${cost.toFixed(2)}. You pay with £${payment.toFixed(2)}. How much change do you get in pounds?`,
                type: 'text_input',
                answer: change.toFixed(2),
                hint: `Subtract the cost from the amount paid`,
                units: 'pounds'
            };
        }
    } else if (measureType === 'length') {
        if (operation === 'add_measure' || operation === 'subtract_measure') {
            const value1 = randomInt(params.length_range[0], params.length_range[1]);
            const value2 = randomInt(params.length_range[0], value1);
            const useMixed = params.length_unit === 'mixed';

            if (operation === 'add_measure') {
                const answer = value1 + value2;
                return {
                    text: `A piece of ribbon is ${formatLength(value1, useMixed)} long. Another piece is ${formatLength(value2, useMixed)} long. What is the total length in centimetres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to cm first, then add` : `Add the two lengths`,
                    units: 'cm'
                };
            } else {
                const answer = value1 - value2;
                return {
                    text: `A rope is ${formatLength(value1, useMixed)} long. You cut off ${formatLength(value2, useMixed)}. How much rope is left in centimetres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to cm first, then subtract` : `Subtract the lengths`,
                    units: 'cm'
                };
            }
        }
    } else if (measureType === 'mass') {
        if (operation === 'add_measure' || operation === 'subtract_measure') {
            const value1 = randomInt(params.mass_range[0], params.mass_range[1]);
            const value2 = randomInt(params.mass_range[0], value1);
            const useMixed = params.mass_unit === 'mixed';

            if (operation === 'add_measure') {
                const answer = value1 + value2;
                return {
                    text: `A bag of flour weighs ${formatMass(value1, useMixed)}. A bag of sugar weighs ${formatMass(value2, useMixed)}. What is the total weight in grams?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to grams first, then add` : `Add the two weights`,
                    units: 'grams'
                };
            } else {
                const answer = value1 - value2;
                return {
                    text: `A parcel weighs ${formatMass(value1, useMixed)}. You remove an item weighing ${formatMass(value2, useMixed)}. What is the new weight in grams?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to grams first, then subtract` : `Subtract the weights`,
                    units: 'grams'
                };
            }
        }
    } else if (measureType === 'capacity') {
        if (operation === 'add_measure' || operation === 'subtract_measure') {
            const value1 = randomInt(params.capacity_range[0], params.capacity_range[1]);
            const value2 = randomInt(params.capacity_range[0], value1);
            const useMixed = params.capacity_unit === 'mixed';

            if (operation === 'add_measure') {
                const answer = value1 + value2;
                return {
                    text: `A jug contains ${formatCapacity(value1, useMixed)} of water. You pour in ${formatCapacity(value2, useMixed)} more. How much water is in the jug now in millilitres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to ml first, then add` : `Add the two volumes`,
                    units: 'ml'
                };
            } else {
                const answer = value1 - value2;
                return {
                    text: `A bottle contains ${formatCapacity(value1, useMixed)} of juice. You pour out ${formatCapacity(value2, useMixed)}. How much juice is left in millilitres?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: useMixed ? `Convert to ml first, then subtract` : `Subtract the volumes`,
                    units: 'ml'
                };
            }
        }
    }

    // Fallback - shouldn't reach here
    return generateYear3Question(params);
}

/**
 * YEAR 4: Four operations with measures
 */
function generateYear4Question(params) {
    const operation = randomChoice(params.operations);
    const measureType = randomChoice(params.measure_types);

    if (measureType === 'money') {
        if (operation === 'multiply_measure') {
            let price, quantity, answer;
            if (params.money_format === 'whole_pounds') {
                price = randomInt(params.money_range[0], params.money_range[1]);
                quantity = randomChoice(params.multipliers);
                answer = price * quantity;
                return {
                    text: `One item costs £${price}. How much do ${quantity} items cost in pounds?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: `Multiply the price by ${quantity}`,
                    units: 'pounds'
                };
            } else {
                // Decimal money
                price = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), 2);
                quantity = randomChoice(params.multipliers);
                answer = roundTo(price * quantity, 2);
                return {
                    text: `One item costs £${price.toFixed(2)}. How much do ${quantity} items cost in pounds?`,
                    type: 'text_input',
                    answer: answer.toFixed(2),
                    hint: `Multiply the price by ${quantity}`,
                    units: 'pounds'
                };
            }
        } else if (operation === 'divide_measure') {
            let total, people, answer;
            if (params.money_format === 'whole_pounds') {
                const divisor = randomChoice(params.divisors);
                total = divisor * randomInt(2, Math.floor(params.money_range[1] / divisor));
                answer = total / divisor;
                return {
                    text: `£${total} is shared equally between ${divisor} people. How much does each person get in pounds?`,
                    type: 'text_input',
                    answer: String(answer),
                    hint: `Divide the total by ${divisor}`,
                    units: 'pounds'
                };
            } else {
                const divisor = randomChoice(params.divisors);
                total = roundTo(divisor * (1 + Math.floor(Math.random() * 10)), 2);
                answer = roundTo(total / divisor, 2);
                return {
                    text: `£${total.toFixed(2)} is shared equally between ${divisor} people. How much does each person get in pounds?`,
                    type: 'text_input',
                    answer: answer.toFixed(2),
                    hint: `Divide the total by ${divisor}`,
                    units: 'pounds'
                };
            }
        }
    } else if (measureType === 'length') {
        if (operation === 'multiply_measure') {
            const length = randomInt(params.length_range[0], params.length_range[1]);
            const multiplier = randomChoice(params.multipliers);
            const answer = length * multiplier;
            return {
                text: `One piece of wood is ${length}cm long. What is the total length of ${multiplier} identical pieces in centimetres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Multiply the length by ${multiplier}`,
                units: 'cm'
            };
        } else if (operation === 'divide_measure') {
            const divisor = randomChoice(params.divisors);
            const total = divisor * randomInt(params.length_range[0] / divisor, params.length_range[1] / divisor);
            const answer = total / divisor;
            return {
                text: `A rope ${total}cm long is cut into ${divisor} equal pieces. How long is each piece in centimetres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Divide the total length by ${divisor}`,
                units: 'cm'
            };
        }
    } else if (measureType === 'mass') {
        if (operation === 'multiply_measure' || operation === 'scale_recipe') {
            const mass = randomInt(params.mass_range[0], params.mass_range[1]);
            const multiplier = randomChoice(params.multipliers);
            const answer = mass * multiplier;
            return {
                text: `A recipe uses ${mass}g of flour for one cake. How much flour is needed for ${multiplier} cakes in grams?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Multiply the amount by ${multiplier}`,
                units: 'grams'
            };
        } else if (operation === 'divide_measure') {
            const divisor = randomChoice(params.divisors);
            const total = divisor * randomInt(params.mass_range[0] / divisor, params.mass_range[1] / divisor);
            const answer = total / divisor;
            return {
                text: `${total}g of rice is shared equally into ${divisor} bags. How much rice is in each bag in grams?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Divide the total by ${divisor}`,
                units: 'grams'
            };
        }
    } else if (measureType === 'capacity') {
        if (operation === 'multiply_measure' || operation === 'scale_recipe') {
            const capacity = randomInt(params.capacity_range[0], params.capacity_range[1]);
            const multiplier = randomChoice(params.multipliers);
            const answer = capacity * multiplier;
            return {
                text: `A recipe needs ${capacity}ml of milk for 2 servings. How much milk is needed for ${multiplier * 2} servings in millilitres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Multiply the amount by ${multiplier}`,
                units: 'ml'
            };
        } else if (operation === 'divide_measure') {
            const divisor = randomChoice(params.divisors);
            const total = divisor * randomInt(params.capacity_range[0] / divisor, params.capacity_range[1] / divisor);
            const answer = total / divisor;
            return {
                text: `${total}ml of juice is poured equally into ${divisor} glasses. How much juice is in each glass in millilitres?`,
                type: 'text_input',
                answer: String(answer),
                hint: `Divide the total by ${divisor}`,
                units: 'ml'
            };
        }
    }

    // Fallback
    return generateYear4Question(params);
}

/**
 * YEAR 5: Decimal measures and scaling
 */
function generateYear5Question(params) {
    const operation = randomChoice(params.operations);
    const measureType = randomChoice(params.measure_types);
    const dp = params.decimal_places;

    if (measureType === 'money') {
        if (operation === 'multiply_decimal') {
            const price = roundTo(params.money_range[0] + Math.random() * (params.money_range[1] - params.money_range[0]), dp);
            const quantity = randomChoice(params.multipliers);
            const answer = roundTo(price * quantity, 2);
            return {
                text: `Apples cost £${price.toFixed(dp)} per kilogram. How much do ${quantity} kilograms cost in pounds?`,
                type: 'text_input',
                answer: answer.toFixed(2),
                hint: `Multiply the price by ${quantity}`,
                units: 'pounds'
            };
        } else if (operation === 'divide_decimal') {
            const divisor = randomChoice(params.divisors);
            const total = roundTo(divisor * (params.money_range[0] + Math.random() * (params.money_range[1] / divisor - params.money_range[0])), dp);
            const answer = roundTo(total / divisor, 2);
            return {
                text: `£${total.toFixed(dp)} is shared equally between ${divisor} people. How much does each person get in pounds?`,
                type: 'text_input',
                answer: answer.toFixed(2),
                hint: `Divide the total by ${divisor}`,
                units: 'pounds'
            };
        }
    } else if (measureType === 'length') {
        if (operation === 'multiply_decimal') {
            const length = roundTo(params.length_range[0] + Math.random() * (params.length_range[1] - params.length_range[0]), dp);
            const quantity = randomChoice(params.multipliers);
            const answer = roundTo(length * quantity, dp);
            return {
                text: `One shelf is ${length.toFixed(dp)}m long. What is the total length of ${quantity} shelves in metres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Multiply the length by ${quantity}`,
                units: 'metres'
            };
        } else if (operation === 'divide_decimal') {
            const divisor = randomChoice(params.divisors);
            const total = roundTo(divisor * (params.length_range[0] + Math.random() * (params.length_range[1] / divisor - params.length_range[0])), dp);
            const answer = roundTo(total / divisor, dp);
            return {
                text: `A rope ${total.toFixed(dp)}m long is cut into ${divisor} equal pieces. How long is each piece in metres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Divide the total by ${divisor}`,
                units: 'metres'
            };
        }
    } else if (measureType === 'mass') {
        if (operation === 'multiply_decimal' || operation === 'scale_recipe') {
            const mass = roundTo(params.mass_range[0] + Math.random() * (params.mass_range[1] - params.mass_range[0]), dp);
            const from = params.scaling_from ? randomChoice(params.scaling_from) : randomChoice(params.multipliers);
            const to = params.scaling_to ? randomChoice(params.scaling_to.filter(x => x > from)) : from * randomChoice([2, 3]);
            const answer = roundTo(mass * to / from, dp);
            return {
                text: `A recipe for ${from} people uses ${mass.toFixed(dp)}kg of flour. How much flour is needed for ${to} people in kilograms?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Scale from ${from} to ${to} people`,
                units: 'kg'
            };
        } else if (operation === 'divide_decimal') {
            const divisor = randomChoice(params.divisors);
            const total = roundTo(divisor * (params.mass_range[0] + Math.random() * (params.mass_range[1] / divisor - params.mass_range[0])), dp);
            const answer = roundTo(total / divisor, dp);
            return {
                text: `${total.toFixed(dp)}kg of rice is divided equally into ${divisor} bags. How much is in each bag in kilograms?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Divide the total by ${divisor}`,
                units: 'kg'
            };
        }
    } else if (measureType === 'capacity') {
        if (operation === 'rate_problems') {
            const rate = roundTo(params.capacity_range[0] + Math.random() * (params.capacity_range[1] - params.capacity_range[0]), dp);
            const quantity = randomChoice(params.multipliers);
            const answer = roundTo(rate * quantity, dp);
            return {
                text: `A bottle holds ${rate.toFixed(dp)} litres. How much liquid is in ${quantity} bottles in litres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Multiply the capacity by ${quantity}`,
                units: 'litres'
            };
        } else if (operation === 'fraction_of_measure') {
            const total = roundTo(params.capacity_range[0] + Math.random() * (params.capacity_range[1] - params.capacity_range[0]), dp);
            const fraction = randomChoice(params.fractions || [1/2, 1/4, 3/4]);
            const answer = roundTo(total * fraction, dp);
            let fractionText = fraction === 1/2 ? '1/2' : fraction === 1/3 ? '1/3' : fraction === 1/4 ? '1/4' : fraction === 2/3 ? '2/3' : '3/4';
            return {
                text: `A tank holds ${total.toFixed(dp)} litres. It is ${fractionText} full. How much water is in the tank in litres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `Multiply ${total.toFixed(dp)} by ${fractionText}`,
                units: 'litres'
            };
        }
    }

    // Fallback
    return generateYear5Question(params);
}

/**
 * YEAR 6: Unit conversion problems
 */
function generateYear6Question(params) {
    const operation = randomChoice(params.operations);
    const dp = randomChoice(params.decimal_places);

    if (operation === 'convert_length') {
        const conversionType = randomChoice(params.conversions.length);

        if (conversionType === 'km_to_m') {
            const km = roundTo(params.value_ranges.km[0] + Math.random() * (params.value_ranges.km[1] - params.value_ranges.km[0]), dp);
            const answer = roundTo(km * 1000, dp);
            return {
                text: `Convert ${km.toFixed(dp)} kilometres to metres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 km = 1000 m`,
                units: 'metres'
            };
        } else if (conversionType === 'm_to_cm') {
            const m = roundTo(params.value_ranges.m[0] + Math.random() * (params.value_ranges.m[1] - params.value_ranges.m[0]), dp);
            const answer = roundTo(m * 100, dp);
            return {
                text: `Convert ${m.toFixed(dp)} metres to centimetres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 m = 100 cm`,
                units: 'cm'
            };
        } else if (conversionType === 'cm_to_mm') {
            const cm = roundTo(params.value_ranges.cm[0] + Math.random() * (params.value_ranges.cm[1] - params.value_ranges.cm[0]), dp);
            const answer = roundTo(cm * 10, dp);
            return {
                text: `Convert ${cm.toFixed(dp)} centimetres to millimetres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 cm = 10 mm`,
                units: 'mm'
            };
        }
    } else if (operation === 'convert_mass') {
        const conversionType = randomChoice(params.conversions.mass);

        if (conversionType === 'kg_to_g') {
            const kg = roundTo(params.value_ranges.kg[0] + Math.random() * (params.value_ranges.kg[1] - params.value_ranges.kg[0]), dp);
            const answer = roundTo(kg * 1000, dp);
            return {
                text: `Convert ${kg.toFixed(dp)} kilograms to grams.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 kg = 1000 g`,
                units: 'grams'
            };
        } else if (conversionType === 'g_to_kg') {
            const g = roundTo(params.value_ranges.kg[0] * 1000 + Math.random() * (params.value_ranges.kg[1] * 1000 - params.value_ranges.kg[0] * 1000), dp);
            const answer = roundTo(g / 1000, dp);
            return {
                text: `Convert ${g.toFixed(dp)} grams to kilograms.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1000 g = 1 kg`,
                units: 'kg'
            };
        }
    } else if (operation === 'convert_capacity') {
        const conversionType = randomChoice(params.conversions.capacity);

        if (conversionType === 'l_to_ml') {
            const l = roundTo(params.value_ranges.l[0] + Math.random() * (params.value_ranges.l[1] - params.value_ranges.l[0]), dp);
            const answer = roundTo(l * 1000, dp);
            return {
                text: `Convert ${l.toFixed(dp)} litres to millilitres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 l = 1000 ml`,
                units: 'ml'
            };
        } else if (conversionType === 'ml_to_l') {
            const ml = roundTo(params.value_ranges.l[0] * 1000 + Math.random() * (params.value_ranges.l[1] * 1000 - params.value_ranges.l[0] * 1000), dp);
            const answer = roundTo(ml / 1000, dp);
            return {
                text: `Convert ${ml.toFixed(dp)} millilitres to litres.`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1000 ml = 1 l`,
                units: 'litres'
            };
        } else if (conversionType === 'm3_to_l') {
            const m3 = roundTo(1 + Math.random() * 10, dp);
            const answer = roundTo(m3 * 1000, dp);
            return {
                text: `A tank has a volume of ${m3.toFixed(dp)} cubic metres. How many litres is this?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `1 m³ = 1000 litres`,
                units: 'litres'
            };
        }
    } else if (operation === 'convert_area') {
        const conversionType = randomChoice(params.conversions.area);

        if (conversionType === 'm2_to_cm2') {
            const m2 = roundTo(1 + Math.random() * 20, dp);
            const answer = roundTo(m2 * 10000, dp);
            return {
                text: `Convert ${m2.toFixed(dp)} square metres to square centimetres.`,
                type: 'text_input',
                answer: answer.toFixed(0),
                hint: `1 m² = 10,000 cm²`,
                units: 'cm²'
            };
        }
    } else if (operation === 'conversion_with_calculation') {
        // Conversion followed by calculation
        const measureType = randomChoice(['length', 'mass']);

        if (measureType === 'length') {
            const pieces = randomChoice([2, 3, 4, 5]);
            const lengthM = roundTo(params.value_ranges.m[0] + Math.random() * (params.value_ranges.m[1] - params.value_ranges.m[0]), dp);
            const totalCm = roundTo(lengthM * 100, dp);
            const answer = roundTo(totalCm / pieces, dp);
            return {
                text: `A rope is ${lengthM.toFixed(dp)} metres long. It is cut into ${pieces} equal pieces. How long is each piece in centimetres?`,
                type: 'text_input',
                answer: answer.toFixed(dp),
                hint: `First convert to cm, then divide by ${pieces}`,
                units: 'cm'
            };
        } else {
            const kg = roundTo(params.value_ranges.kg[0] + Math.random() * (params.value_ranges.kg[1] - params.value_ranges.kg[0]), dp);
            const used = roundTo(Math.random() * kg * 0.5, dp);
            const left = roundTo(kg - used, dp);
            const answerG = roundTo(left * 1000, dp);
            return {
                text: `A recipe starts with ${kg.toFixed(dp)}kg of flour. It uses ${used.toFixed(dp)}kg. How much flour is left in grams?`,
                type: 'text_input',
                answer: answerG.toFixed(dp),
                hint: `Calculate remaining kg, then convert to grams`,
                units: 'grams'
            };
        }
    }

    // Fallback
    return generateYear6Question(params);
}

/**
 * Main generator function
 * Routes to appropriate year group generator based on module ID
 */
export function generateQuestion(params, level, moduleId) {
    let question;

    if (moduleId === 'M09_Y2_MEAS') {
        question = generateYear2Question(params);
    } else if (moduleId === 'M09_Y3_MEAS') {
        question = generateYear3Question(params);
    } else if (moduleId === 'M09_Y4_MEAS') {
        question = generateYear4Question(params);
    } else if (moduleId === 'M09_Y5_MEAS') {
        question = generateYear5Question(params);
    } else if (moduleId === 'M09_Y6_MEAS') {
        question = generateYear6Question(params);
    } else {
        throw new Error(`Unknown module ID: ${moduleId}`);
    }

    // Add standard fields
    question.module = moduleId;
    question.level = level;

    return question;
}

// Export module configurations for each year group
export default {
    'M09_Y2_MEAS': {
        moduleId: 'M09_Y2_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y2_MEAS')
    },
    'M09_Y3_MEAS': {
        moduleId: 'M09_Y3_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y3_MEAS')
    },
    'M09_Y4_MEAS': {
        moduleId: 'M09_Y4_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y4_MEAS')
    },
    'M09_Y5_MEAS': {
        moduleId: 'M09_Y5_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y5_MEAS')
    },
    'M09_Y6_MEAS': {
        moduleId: 'M09_Y6_MEAS',
        generate: (params, level) => generateQuestion(params, level, 'M09_Y6_MEAS')
    }
};

```
--- END FILE: src\generators\DEPRECATED_M09_MEAS_problems.js ---

--- START FILE: src\generators\helpers\C01_C03_calculationHelpers.js ---
```javascript
/**
 * Calculation Helpers
 *
 * Shared utility functions for C (Calculations) question generators
 * Includes functions for:
 * - Basic arithmetic operations
 * - Number properties (factors, multiples, primes, squares, cubes)
 * - Missing number problems
 * - Inverse operations
 * - Word problem contexts
 */

import { randomInt, randomChoice, shuffle } from './N02_numberHelpers.js';

// ============================================================================
// BASIC ARITHMETIC
// ============================================================================

/**
 * Generate addition problem within range
 * Returns {a, b, answer} where a + b = answer
 */
export function generateAddition(minResult, maxResult, options = {}) {
    const {
        minAddend = 0,
        maxAddend = maxResult,
        allowZero = true,
        ensureCarry = false
    } = options;

    let a, b, answer;
    let attempts = 0;

    do {
        answer = randomInt(minResult, maxResult);
        a = randomInt(Math.max(minAddend, allowZero ? 0 : 1), Math.min(answer, maxAddend));
        b = answer - a;
        attempts++;

        // Check carry requirement
        if (ensureCarry && attempts < 50) {
            const hasCarry = checkCarry(a, b);
            if (!hasCarry) continue;
        }

        break;
    } while (attempts < 100);

    return { a, b, answer };
}

/**
 * Generate subtraction problem within range
 * Returns {a, b, answer} where a - b = answer
 */
export function generateSubtraction(minResult, maxResult, options = {}) {
    const {
        minMinuend = minResult,
        maxMinuend = null,
        allowZero = true,
        ensureBorrow = false
    } = options;

    let a, b, answer;
    let attempts = 0;

    do {
        answer = randomInt(Math.max(0, minResult), maxResult);
        const maxA = maxMinuend || maxResult + answer;
        a = randomInt(answer + (allowZero ? 0 : 1), maxA);
        b = a - answer;
        attempts++;

        // Check borrow requirement
        if (ensureBorrow && attempts < 50) {
            const hasBorrow = checkBorrow(a, b);
            if (!hasBorrow) continue;
        }

        break;
    } while (attempts < 100);

    return { a, b, answer };
}

/**
 * Generate multiplication problem
 * Returns {a, b, answer} where a × b = answer
 */
export function generateMultiplication(minFactor, maxFactor, tables = null) {
    let a, b;

    if (tables && tables.length > 0) {
        // Use specific times tables
        a = randomChoice(tables);
        b = randomInt(minFactor, maxFactor);
    } else {
        a = randomInt(minFactor, maxFactor);
        b = randomInt(minFactor, maxFactor);
    }

    return { a, b, answer: a * b };
}

/**
 * Generate division problem
 * Returns {dividend, divisor, quotient, remainder}
 */
export function generateDivision(minDividend, maxDividend, options = {}) {
    const {
        minDivisor = 2,
        maxDivisor = 12,
        exactOnly = false,
        tables = null
    } = options;

    let divisor, quotient, dividend, remainder;
    let attempts = 0;

    do {
        if (tables && tables.length > 0) {
            divisor = randomChoice(tables);
        } else {
            divisor = randomInt(minDivisor, maxDivisor);
        }

        quotient = randomInt(1, Math.floor(maxDividend / divisor));
        dividend = divisor * quotient;

        if (!exactOnly) {
            remainder = randomInt(0, divisor - 1);
            dividend += remainder;
        } else {
            remainder = 0;
        }

        attempts++;
    } while (dividend < minDividend && attempts < 100);

    return { dividend, divisor, quotient, remainder, answer: quotient };
}

/**
 * Check if addition requires carrying
 */
export function checkCarry(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();
    const maxLen = Math.max(strA.length, strB.length);

    let carry = 0;
    for (let i = 0; i < maxLen; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');
        const sum = digitA + digitB + carry;
        if (sum >= 10) return true;
        carry = Math.floor(sum / 10);
    }
    return false;
}

/**
 * Check if subtraction requires borrowing
 */
export function checkBorrow(a, b) {
    const strA = a.toString().split('').reverse();
    const strB = b.toString().split('').reverse();

    for (let i = 0; i < strB.length; i++) {
        const digitA = parseInt(strA[i] || '0');
        const digitB = parseInt(strB[i] || '0');
        if (digitA < digitB) return true;
    }
    return false;
}

// ============================================================================
// NUMBER PROPERTIES
// ============================================================================

/**
 * Check if a number is prime
 */
export function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

/**
 * Get all prime numbers up to n
 */
export function getPrimesUpTo(n) {
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}

/**
 * Get all factors of a number
 */
export function getFactors(n) {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            factors.push(i);
            if (i !== n / i) {
                factors.push(n / i);
            }
        }
    }
    return factors.sort((a, b) => a - b);
}

/**
 * Get factor pairs of a number
 * Returns array of [a, b] where a * b = n
 */
export function getFactorPairs(n) {
    const pairs = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            pairs.push([i, n / i]);
        }
    }
    return pairs;
}

/**
 * Get common factors of two numbers
 */
export function getCommonFactors(a, b) {
    const factorsA = getFactors(a);
    const factorsB = getFactors(b);
    return factorsA.filter(f => factorsB.includes(f));
}

/**
 * Get greatest common factor (GCF/HCF)
 */
export function getGCF(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Get least common multiple (LCM)
 */
export function getLCM(a, b) {
    return Math.abs(a * b) / getGCF(a, b);
}

/**
 * Get multiples of n up to max
 */
export function getMultiplesUpTo(n, max) {
    const multiples = [];
    for (let i = n; i <= max; i += n) {
        multiples.push(i);
    }
    return multiples;
}

/**
 * Get common multiples of two numbers up to max
 */
export function getCommonMultiples(a, b, max) {
    const lcm = getLCM(a, b);
    return getMultiplesUpTo(lcm, max);
}

/**
 * Check if a number is a perfect square
 */
export function isPerfectSquare(n) {
    const sqrt = Math.sqrt(n);
    return sqrt === Math.floor(sqrt);
}

/**
 * Check if a number is a perfect cube
 */
export function isPerfectCube(n) {
    const cbrt = Math.cbrt(n);
    return Math.abs(cbrt - Math.round(cbrt)) < 0.0001;
}

/**
 * Get square numbers up to n
 */
export function getSquaresUpTo(n) {
    const squares = [];
    for (let i = 1; i * i <= n; i++) {
        squares.push(i * i);
    }
    return squares;
}

/**
 * Get cube numbers up to n
 */
export function getCubesUpTo(n) {
    const cubes = [];
    for (let i = 1; i * i * i <= n; i++) {
        cubes.push(i * i * i);
    }
    return cubes;
}

/**
 * Get prime factors of a number
 */
export function getPrimeFactors(n) {
    const factors = [];
    let num = n;

    for (let i = 2; i <= num; i++) {
        while (num % i === 0) {
            factors.push(i);
            num /= i;
        }
    }

    return factors;
}

/**
 * Check if number is odd
 */
export function isOdd(n) {
    return n % 2 === 1;
}

/**
 * Check if number is even
 */
export function isEven(n) {
    return n % 2 === 0;
}

// ============================================================================
// MISSING NUMBER PROBLEMS
// ============================================================================

/**
 * Generate missing number addition problem
 * Returns problem with one unknown: a + ? = c or ? + b = c
 */
export function generateMissingAddend(minResult, maxResult) {
    const { a, b, answer } = generateAddition(minResult, maxResult);
    const position = randomChoice(['first', 'second']);

    if (position === 'first') {
        return {
            known: b,
            unknown: a,
            result: answer,
            equation: `___ + ${b} = ${answer}`,
            type: 'add'
        };
    } else {
        return {
            known: a,
            unknown: b,
            result: answer,
            equation: `${a} + ___ = ${answer}`,
            type: 'add'
        };
    }
}

/**
 * Generate missing number subtraction problem
 * Returns: a - ? = c or ? - b = c or a - b = ?
 */
export function generateMissingSubtrahend(minResult, maxResult) {
    const { a, b, answer } = generateSubtraction(minResult, maxResult);
    const position = randomChoice(['minuend', 'subtrahend', 'result']);

    if (position === 'minuend') {
        return {
            known: b,
            unknown: a,
            result: answer,
            equation: `___ - ${b} = ${answer}`,
            type: 'subtract'
        };
    } else if (position === 'subtrahend') {
        return {
            known: a,
            unknown: b,
            result: answer,
            equation: `${a} - ___ = ${answer}`,
            type: 'subtract'
        };
    } else {
        return {
            known1: a,
            known2: b,
            unknown: answer,
            equation: `${a} - ${b} = ___`,
            type: 'subtract'
        };
    }
}

// ============================================================================
// WORD PROBLEM CONTEXTS
// ============================================================================

/**
 * Get random name for word problems
 */
export function getRandomName() {
    const names = [
        'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
        'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia',
        'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Lily', 'Jack',
        'Grace', 'Oscar', 'Isla', 'George', 'Freya', 'Charlie', 'Poppy', 'Harry'
    ];
    return randomChoice(names);
}

/**
 * Get random object/item for word problems
 */
export function getRandomItem(category = null) {
    const items = {
        collectibles: ['stickers', 'marbles', 'cards', 'coins', 'buttons', 'stamps', 'shells', 'rocks'],
        food: ['apples', 'oranges', 'bananas', 'sweets', 'cookies', 'cupcakes', 'strawberries', 'grapes'],
        school: ['pencils', 'crayons', 'books', 'erasers', 'rulers', 'notebooks', 'pens', 'markers'],
        toys: ['toy cars', 'dolls', 'blocks', 'puzzles', 'balls', 'action figures', 'teddy bears'],
        nature: ['flowers', 'leaves', 'stones', 'feathers', 'acorns', 'pinecones'],
        money: ['pennies', 'pounds', 'coins'],
        measurement: ['centimetres', 'metres', 'grams', 'kilograms', 'litres', 'millilitres']
    };

    if (category && items[category]) {
        return randomChoice(items[category]);
    }

    // Random category
    const categories = Object.keys(items);
    const randomCat = randomChoice(categories);
    return randomChoice(items[randomCat]);
}

/**
 * Get word problem context for addition
 */
export function getAdditionContext(a, b, answer) {
    const name1 = getRandomName();
    const name2 = getRandomName();
    const item = getRandomItem();

    const templates = [
        {
            text: `${name1} has ${a} ${item}. ${name2} gives them ${b} more. How many ${item} does ${name1} have now?`,
            type: 'increase'
        },
        {
            text: `${name1} has ${a} ${item} and ${name2} has ${b} ${item}. How many ${item} do they have altogether?`,
            type: 'combine'
        },
        {
            text: `There are ${a} ${item} in one box and ${b} ${item} in another box. How many ${item} in total?`,
            type: 'combine'
        }
    ];

    return randomChoice(templates);
}

/**
 * Get word problem context for subtraction
 */
export function getSubtractionContext(a, b, answer) {
    const name = getRandomName();
    const item = getRandomItem();

    const templates = [
        {
            text: `${name} has ${a} ${item}. They give away ${b} ${item}. How many ${item} are left?`,
            type: 'take_away'
        },
        {
            text: `${name} has ${a} ${item}. They lose ${b} ${item}. How many ${item} do they have now?`,
            type: 'decrease'
        },
        {
            text: `There are ${a} ${item}. ${b} ${item} are used. How many ${item} remain?`,
            type: 'take_away'
        }
    ];

    return randomChoice(templates);
}

/**
 * Get word problem context for multiplication
 */
export function getMultiplicationContext(a, b, answer) {
    const name = getRandomName();
    const item = getRandomItem();

    const templates = [
        {
            text: `${name} has ${a} bags with ${b} ${item} in each bag. How many ${item} altogether?`,
            type: 'groups'
        },
        {
            text: `There are ${a} boxes with ${b} ${item} in each box. How many ${item} in total?`,
            type: 'groups'
        },
        {
            text: `${name} buys ${a} packs of ${item}. Each pack contains ${b} ${item}. How many ${item} did they buy?`,
            type: 'groups'
        }
    ];

    return randomChoice(templates);
}

/**
 * Get word problem context for division
 */
export function getDivisionContext(dividend, divisor, quotient, remainder = 0) {
    const name = getRandomName();
    const item = getRandomItem();

    const templates = remainder === 0 ? [
        {
            text: `${name} has ${dividend} ${item}. They share them equally among ${divisor} friends. How many ${item} does each friend get?`,
            type: 'sharing'
        },
        {
            text: `There are ${dividend} ${item} arranged into ${divisor} equal groups. How many ${item} are in each group?`,
            type: 'grouping'
        }
    ] : [
        {
            text: `${name} has ${dividend} ${item}. They put them into bags of ${divisor}. How many full bags can they make?`,
            type: 'grouping_with_remainder'
        }
    ];

    return randomChoice(templates);
}

// ============================================================================
// ESTIMATION & ROUNDING
// ============================================================================

/**
 * Round to nearest 10, 100, 1000, etc.
 */
export function roundTo(num, place) {
    return Math.round(num / place) * place;
}

/**
 * Estimate result of operation by rounding operands
 */
export function estimateOperation(a, b, operation, roundingPlace) {
    const aRounded = roundTo(a, roundingPlace);
    const bRounded = roundTo(b, roundingPlace);

    switch(operation) {
        case 'add': return aRounded + bRounded;
        case 'subtract': return aRounded - bRounded;
        case 'multiply': return aRounded * bRounded;
        case 'divide': return Math.floor(aRounded / bRounded);
        default: return 0;
    }
}

// ============================================================================
// ORDER OF OPERATIONS (BODMAS/PEMDAS)
// ============================================================================

/**
 * Evaluate expression following BODMAS
 * Supports: +, -, ×, ÷, parentheses
 */
export function evaluateBODMAS(expression) {
    // This is a simplified evaluator for basic expressions
    // For production, consider using a proper expression parser
    let expr = expression.replace(/×/g, '*').replace(/÷/g, '/');

    try {
        // WARNING: Using eval() - only safe because we generate the expressions
        // In production with user input, use a proper parser
        return eval(expr);
    } catch (e) {
        console.error('Error evaluating expression:', expr);
        return null;
    }
}

/**
 * Generate BODMAS expression
 */
export function generateBODMASExpression(complexity = 2) {
    // Complexity: 1 = two operations, 2 = three operations, 3 = four operations
    const operators = ['+', '-', '×', '÷'];
    const useParentheses = Math.random() < 0.5 && complexity >= 2;

    let expr = '';
    let a, b, c, d, op1, op2, op3;

    if (complexity === 1) {
        a = randomInt(1, 20);
        b = randomInt(1, 10);
        c = randomInt(1, 10);
        op1 = randomChoice(operators);
        op2 = randomChoice(operators);

        expr = `${a} ${op1} ${b} ${op2} ${c}`;
    } else if (complexity === 2) {
        a = randomInt(1, 20);
        b = randomInt(1, 10);
        c = randomInt(1, 10);
        d = randomInt(1, 10);
        op1 = randomChoice(operators);
        op2 = randomChoice(operators);
        op3 = randomChoice(operators);

        if (useParentheses) {
            expr = `(${a} ${op1} ${b}) ${op2} ${c}`;
        } else {
            expr = `${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`;
        }
    }

    const result = evaluateBODMAS(expr);
    return { expression: expr, result };
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format calculation for display
 */
export function formatCalculation(a, operator, b, answer = null) {
    const symbols = {
        add: '+',
        subtract: '-',
        multiply: '×',
        divide: '÷'
    };

    const symbol = symbols[operator] || operator;
    if (answer !== null) {
        return `${a} ${symbol} ${b} = ${answer}`;
    }
    return `${a} ${symbol} ${b}`;
}

/**
 * Generate commutative pair
 */
export function getCommutativePair(a, b, operation) {
    if (operation === 'add' || operation === 'multiply') {
        return [
            { a, b, answer: operation === 'add' ? a + b : a * b },
            { a: b, b: a, answer: operation === 'add' ? a + b : a * b }
        ];
    }
    return null;
}

/**
 * Get inverse operation
 */
export function getInverseOperation(operation) {
    const inverses = {
        'add': 'subtract',
        'subtract': 'add',
        'multiply': 'divide',
        'divide': 'multiply'
    };
    return inverses[operation];
}

/**
 * Generate inverse fact
 * If a + b = c, then c - b = a
 */
export function generateInverseFact(a, b, operation) {
    const inverseOp = getInverseOperation(operation);

    if (operation === 'add') {
        const sum = a + b;
        return {
            original: { a, b, answer: sum, operation: 'add' },
            inverse: { a: sum, b, answer: a, operation: 'subtract' }
        };
    } else if (operation === 'subtract') {
        const diff = a - b;
        return {
            original: { a, b, answer: diff, operation: 'subtract' },
            inverse: { a: diff, b, answer: a, operation: 'add' }
        };
    } else if (operation === 'multiply') {
        const product = a * b;
        return {
            original: { a, b, answer: product, operation: 'multiply' },
            inverse: { a: product, b, answer: a, operation: 'divide' }
        };
    } else if (operation === 'divide') {
        const quotient = Math.floor(a / b);
        return {
            original: { a, b, answer: quotient, operation: 'divide' },
            inverse: { a: quotient, b, answer: a, operation: 'multiply' }
        };
    }

    return null;
}

export default {
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    checkCarry,
    checkBorrow,
    isPrime,
    getPrimesUpTo,
    getFactors,
    getFactorPairs,
    getCommonFactors,
    getGCF,
    getLCM,
    getMultiplesUpTo,
    getCommonMultiples,
    isPerfectSquare,
    isPerfectCube,
    getSquaresUpTo,
    getCubesUpTo,
    getPrimeFactors,
    isOdd,
    isEven,
    generateMissingAddend,
    generateMissingSubtrahend,
    getRandomName,
    getRandomItem,
    getAdditionContext,
    getSubtractionContext,
    getMultiplicationContext,
    getDivisionContext,
    roundTo,
    estimateOperation,
    evaluateBODMAS,
    generateBODMASExpression,
    formatCalculation,
    getCommutativePair,
    getInverseOperation,
    generateInverseFact
};

```
--- END FILE: src\generators\helpers\C01_C03_calculationHelpers.js ---

--- START FILE: src\generators\helpers\C02_columnarHelpers.js ---
```javascript
/**
 * Columnar Calculation Helpers
 *
 * Provides functions to format calculations in columnar layout
 * for written methods (addition and subtraction)
 */

/**
 * Format two numbers as a columnar calculation
 * @param {number} num1 - First number (top number)
 * @param {number} num2 - Second number (bottom number)
 * @param {string} operator - '+' or '-'
 * @param {boolean} showAnswer - Whether to show the answer or '?'
 * @returns {string} HTML string with columnar layout
 */
export function formatColumnar(num1, num2, operator, showAnswer = false) {
    // Format numbers with commas
    const num1Str = num1.toLocaleString();
    const num2Str = num2.toLocaleString();

    // Calculate max length based on FORMATTED strings (with commas)
    const maxLen = Math.max(num1Str.length, num2Str.length);

    // Right-align all numbers to the same width
    const num1Padded = num1Str.padStart(maxLen, ' ');
    const num2Padded = num2Str.padStart(maxLen, ' ');

    // Build the line to match the number width (plus operator + space)
    const line = '─'.repeat(maxLen + 2);

    // If showing answer, include it
    if (showAnswer) {
        const answer = operator === '+' ? num1 + num2 : num1 - num2;
        const answerStr = answer.toLocaleString();
        const answerPadded = answerStr.padStart(maxLen, ' ');

        return `<pre class="columnar-calc">  ${num1Padded}
${operator} ${num2Padded}
${line}
  ${answerPadded}</pre>`;
    }

    // Return without answer line
    return `<pre class="columnar-calc">  ${num1Padded}
${operator} ${num2Padded}
${line}</pre>`;
}

/**
 * Format columnar calculation with carrying marks shown
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {Array<number>} carries - Array of carry values (right to left)
 * @returns {string} HTML string with columnar layout and carries
 */
export function formatColumnarWithCarry(num1, num2, carries = []) {
    const num1Str = num1.toLocaleString();
    const num2Str = num2.toLocaleString();

    const num1NoComma = num1.toString();
    const num2NoComma = num2.toString();
    const maxLen = Math.max(num1NoComma.length, num2NoComma.length);

    // Generate carry row (small superscript numbers above columns)
    let carryRow = '';
    if (carries.length > 0) {
        let carryDisplay = ' '.repeat(maxLen + 2);
        carries.forEach((carry, idx) => {
            if (carry) {
                const pos = maxLen + 1 - idx;
                if (pos >= 0 && pos < carryDisplay.length) {
                    carryDisplay = carryDisplay.substring(0, pos) + carry + carryDisplay.substring(pos + 1);
                }
            }
        });
        carryRow = `<span class="carry-row">${carryDisplay}</span>\n`;
    }

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">${carryRow}  ${num1Padded}
+ ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format columnar subtraction with borrowing marks shown
 * @param {number} num1 - First number (minuend)
 * @param {number} num2 - Second number (subtrahend)
 * @param {Array<number>} borrows - Array of borrow indicators (right to left)
 * @returns {string} HTML string with columnar layout and borrows
 */
export function formatColumnarWithBorrow(num1, num2, borrows = []) {
    const num1Str = num1.toLocaleString();
    const num2Str = num2.toLocaleString();

    const num1NoComma = num1.toString();
    const num2NoComma = num2.toString();
    const maxLen = Math.max(num1NoComma.length, num2NoComma.length);

    // Generate borrow row (shown above top number)
    let borrowRow = '';
    if (borrows.length > 0) {
        let borrowDisplay = ' '.repeat(maxLen + 2);
        borrows.forEach((borrow, idx) => {
            if (borrow) {
                const pos = maxLen + 1 - idx;
                if (pos >= 0 && pos < borrowDisplay.length) {
                    // Use strikethrough effect (will be styled in CSS)
                    borrowDisplay = borrowDisplay.substring(0, pos) + '¹' + borrowDisplay.substring(pos + 1);
                }
            }
        });
        borrowRow = `<span class="borrow-row">${borrowDisplay}</span>\n`;
    }

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">${borrowRow}  ${num1Padded}
- ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format a simple columnar calculation with hint about the method
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {string} operator - '+' or '-'
 * @param {string} hint - Additional hint text
 * @returns {object} Question text object with columnar display
 */
export function createColumnarQuestion(num1, num2, operator, hint = '') {
    const columnarDisplay = formatColumnar(num1, num2, operator);
    const methodHint = operator === '+' ? 'addition' : 'subtraction';

    return {
        display: columnarDisplay,
        hint: hint || `Use the column method for ${methodHint}. Start with the ones column.`
    };
}

/**
 * Helper to determine if calculation needs carrying
 * (Re-export from calculationHelpers for convenience)
 */
export function needsCarrying(num1, num2) {
    const num1Str = num1.toString();
    const num2Str = num2.toString();
    const maxLen = Math.max(num1Str.length, num2Str.length);

    let carry = 0;
    for (let i = 0; i < maxLen; i++) {
        const digit1 = parseInt(num1Str[num1Str.length - 1 - i] || 0);
        const digit2 = parseInt(num2Str[num2Str.length - 1 - i] || 0);
        const sum = digit1 + digit2 + carry;
        if (sum >= 10) return true;
        carry = sum >= 10 ? 1 : 0;
    }
    return false;
}

/**
 * Helper to determine if calculation needs borrowing
 */
export function needsBorrowing(num1, num2) {
    const num1Str = num1.toString();
    const num2Str = num2.toString();
    const maxLen = Math.max(num1Str.length, num2Str.length);

    for (let i = 0; i < maxLen; i++) {
        const digit1 = parseInt(num1Str[num1Str.length - 1 - i] || 0);
        const digit2 = parseInt(num2Str[num2Str.length - 1 - i] || 0);
        if (digit1 < digit2) return true;
    }
    return false;
}

```
--- END FILE: src\generators\helpers\C02_columnarHelpers.js ---

--- START FILE: src\generators\helpers\C04_problemHelpers.js ---
```javascript
/**
 * C04 Problem-Solving Helpers
 *
 * Shared utility functions for C04 question generators (add/subtract problem-solving)
 *
 * Design Principles:
 * - Controlled variety: Small set of familiar contexts for mathematical focus
 * - Realistic validation: Ensure problems make logical sense
 * - Reversed format support: Include "7 = ___ - 9" regularly
 * - Strategic distractors: Target specific misconceptions
 */

import { randomInt, randomChoice, shuffle, generateDistractors } from './N02_numberHelpers.js';
import { generateAddition, generateSubtraction } from './C01_C03_calculationHelpers.js';

// ============================================================================
// CONTROLLED CONTEXT TEMPLATES
// ============================================================================

/**
 * Get a limited set of controlled contexts for objects
 * These repeat regularly to keep focus on mathematics, not scenarios
 */
export function getObjectContext() {
    const contexts = [
        { item: 'apples', container: 'basket', action_get: 'picks', action_lose: 'eats', action_lose_past: 'ate', action_lose_gerund: 'eating' },
        { item: 'books', container: 'shelf', action_get: 'buys', action_lose: 'lends', action_lose_past: 'lent', action_lose_gerund: 'lending' },
        { item: 'marbles', container: 'bag', action_get: 'finds', action_lose: 'loses', action_lose_past: 'lost', action_lose_gerund: 'losing' },
        { item: 'stickers', container: 'collection', action_get: 'gets', action_lose: 'gives away', action_lose_past: 'gave away', action_lose_gerund: 'giving away' },
        { item: 'pencils', container: 'box', action_get: 'buys', action_lose: 'uses', action_lose_past: 'used', action_lose_gerund: 'using' }
    ];
    return randomChoice(contexts);
}

/**
 * Get controlled names (small set for familiarity)
 */
export function getControlledName() {
    const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan'];
    return randomChoice(names);
}

/**
 * Get scenario context (shop, library, classroom)
 */
export function getScenarioContext() {
    const scenarios = [
        { place: 'shop', items: 'items', action_add: 'delivered', action_remove: 'sold' },
        { place: 'library', items: 'books', action_add: 'arrive', action_remove: 'borrowed' },
        { place: 'classroom', items: 'students', action_add: 'join', action_remove: 'leave' },
        { place: 'car park', items: 'cars', action_add: 'arrive', action_remove: 'leave' }
    ];
    return randomChoice(scenarios);
}

// ============================================================================
// ONE-STEP PROBLEM GENERATORS
// ============================================================================

/**
 * Generate simple addition word problem
 * Returns complete question object
 */
export function generateOneStepAddition(minValue, maxValue, params) {
    const { a, b, answer } = generateAddition(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const templates = [
        {
            text: `${name} has ${a} ${context.item}. ${name} ${context.action_get} ${b} more. How many ${context.item} does ${name} have now?`,
            type: 'increase'
        },
        {
            text: `There are ${a} ${context.item} in one ${context.container} and ${b} ${context.item} in another ${context.container}. How many ${context.item} altogether?`,
            type: 'combine'
        },
        {
            text: `${name} has ${a} ${context.item}. A friend gives ${name} ${b} more ${context.item}. How many ${context.item} does ${name} have in total?`,
            type: 'increase'
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: answer,
        working: `${a} + ${b} = ${answer}`,
        operation: 'addition',
        values: { a, b, answer }
    };
}

/**
 * Generate simple subtraction word problem
 */
export function generateOneStepSubtraction(minValue, maxValue, params) {
    const { a, b, answer } = generateSubtraction(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const templates = [
        {
            text: `${name} has ${a} ${context.item}. ${name} ${context.action_lose} ${b} ${context.item}. How many ${context.item} are left?`,
            type: 'take_away'
        },
        {
            text: `There are ${a} ${context.item} in a ${context.container}. ${b} ${context.item} are removed. How many ${context.item} remain?`,
            type: 'take_away'
        },
        {
            text: `${name} has ${a} ${context.item}. ${name} gives ${b} ${context.item} to a friend. How many ${context.item} does ${name} have now?`,
            type: 'take_away'
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: answer,
        working: `${a} - ${b} = ${answer}`,
        operation: 'subtraction',
        values: { a, b, answer }
    };
}

// ============================================================================
// MISSING NUMBER PROBLEM GENERATORS
// ============================================================================

/**
 * Generate missing addend problem: a + ? = c
 */
export function generateMissingAddend(minValue, maxValue, params) {
    const { a, b, answer } = generateAddition(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    // Determine if we should use reversed format
    const useReversed = params.reversed_format_frequency && Math.random() < params.reversed_format_frequency;

    let equation, text;
    if (useReversed) {
        // Reversed format: "answer = ? + a" or "answer = a + ?"
        const unknownFirst = randomChoice([true, false]);
        if (unknownFirst) {
            equation = `${answer} = ___ + ${a}`;
            text = `${name} needs ${answer} ${context.item} altogether. ${name} has ${a} ${context.item}. How many more ${context.item} does ${name} need?`;
        } else {
            equation = `${answer} = ${a} + ___`;
            text = `${name} wants ${answer} ${context.item}. ${name} already has ${a} ${context.item}. How many more ${context.item} does ${name} need?`;
        }
    } else {
        // Standard format: "a + ? = answer"
        equation = `${a} + ___ = ${answer}`;
        text = `${name} has ${a} ${context.item}. ${name} needs ${answer} ${context.item} in total. How many more ${context.item} does ${name} need?`;
    }

    return {
        text: text,
        equation: equation,
        answer: b,
        working: `${answer} - ${a} = ${b}`,
        operation: 'missing_addend',
        values: { a, b, answer },
        reversed: useReversed
    };
}

/**
 * Generate missing subtrahend problem: a - ? = c
 */
export function generateMissingSubtrahend(minValue, maxValue, params) {
    const { a, b, answer } = generateSubtraction(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const useReversed = params.reversed_format_frequency && Math.random() < params.reversed_format_frequency;

    let equation, text;
    if (useReversed) {
        // Reversed format: "answer = a - ?"
        equation = `${answer} = ${a} - ___`;
        text = `${name} had ${a} ${context.item}. After ${context.action_lose_gerund} some, ${name} has ${answer} ${context.item} left. How many ${context.item} did ${name} ${context.action_lose}?`;
    } else {
        // Standard format: "a - ? = answer"
        equation = `${a} - ___ = ${answer}`;
        text = `${name} has ${a} ${context.item}. After ${context.action_lose_gerund} some, ${name} has ${answer} ${context.item} left. How many ${context.item} did ${name} ${context.action_lose}?`;
    }

    return {
        text: text,
        equation: equation,
        answer: b,
        working: `${a} - ${answer} = ${b}`,
        operation: 'missing_subtrahend',
        values: { a, b, answer },
        reversed: useReversed
    };
}

/**
 * Generate missing minuend problem: ? - b = c
 */
export function generateMissingMinuend(minValue, maxValue, params) {
    const { a, b, answer } = generateSubtraction(minValue, maxValue, { allowZero: params.allow_zero || false });
    const context = getObjectContext();
    const name = getControlledName();

    const useReversed = params.reversed_format_frequency && Math.random() < params.reversed_format_frequency;

    let equation, text;
    if (useReversed) {
        // Reversed format: "answer = ? - b"
        equation = `${answer} = ___ - ${b}`;
        text = `${name} ${context.action_lose_past} ${b} ${context.item} and has ${answer} ${context.item} left. How many ${context.item} did ${name} have at the start?`;
    } else {
        // Standard format: "? - b = answer"
        equation = `___ - ${b} = ${answer}`;
        text = `${name} has some ${context.item}. After ${context.action_lose_gerund} ${b} ${context.item}, ${name} has ${answer} ${context.item} left. How many ${context.item} did ${name} have at the start?`;
    }

    return {
        text: text,
        equation: equation,
        answer: a,
        working: `${b} + ${answer} = ${a}`,
        operation: 'missing_minuend',
        values: { a, b, answer },
        reversed: useReversed
    };
}

// ============================================================================
// TWO-STEP PROBLEM GENERATORS
// ============================================================================

/**
 * Generate "combine then remove" two-step problem
 * Example: Shop has 45 red + 38 blue balloons. 27 are sold. How many left?
 */
export function generateCombineThenRemove(minValue, maxValue, params) {
    const context = getScenarioContext();

    // Generate two numbers to add
    const sum = randomInt(minValue + 10, maxValue);
    const a = randomInt(Math.floor(sum * 0.3), Math.floor(sum * 0.7));
    const b = sum - a;

    // Generate amount to subtract (ensure positive result)
    const subtractAmount = randomInt(Math.floor(sum * 0.2), Math.floor(sum * 0.6));
    const finalAnswer = sum - subtractAmount;

    const templates = [
        {
            text: `A ${context.place} has ${a} ${context.items} in the morning and ${b} ${context.items} in the afternoon. Then ${subtractAmount} ${context.items} are ${context.action_remove}. How many ${context.items} are left?`,
            explicit: true
        },
        {
            text: `There are ${a} ${context.items} in one room and ${b} ${context.items} in another room. ${subtractAmount} ${context.items} ${context.action_remove}. How many ${context.items} remain?`,
            explicit: true
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: finalAnswer,
        working: `(${a} + ${b}) - ${subtractAmount} = ${sum} - ${subtractAmount} = ${finalAnswer}`,
        operation: 'combine_then_remove',
        steps: 2,
        values: { a, b, sum, subtractAmount, finalAnswer },
        step1: { operation: 'add', values: [a, b], result: sum },
        step2: { operation: 'subtract', values: [sum, subtractAmount], result: finalAnswer }
    };
}

/**
 * Generate "remove then add" two-step problem
 * Example: Library has 156 books. 42 are borrowed. Then 28 new books arrive. How many now?
 */
export function generateRemoveThenAdd(minValue, maxValue, params) {
    const context = getScenarioContext();

    // Generate starting amount
    const start = randomInt(minValue + 20, maxValue);

    // Amount to subtract
    const subtractAmount = randomInt(Math.floor(start * 0.2), Math.floor(start * 0.5));
    const afterSubtract = start - subtractAmount;

    // Amount to add back
    const addAmount = randomInt(Math.floor(start * 0.1), Math.floor(start * 0.4));
    const finalAnswer = afterSubtract + addAmount;

    const templates = [
        {
            text: `A ${context.place} has ${start} ${context.items}. ${subtractAmount} ${context.items} are ${context.action_remove}. Then ${addAmount} new ${context.items} ${context.action_add}. How many ${context.items} are there now?`,
            explicit: true
        },
        {
            text: `There are ${start} ${context.items}. ${subtractAmount} ${context.items} ${context.action_remove}. Later, ${addAmount} more ${context.items} ${context.action_add}. How many ${context.items} in total?`,
            explicit: true
        }
    ];

    const template = randomChoice(templates);

    return {
        text: template.text,
        answer: finalAnswer,
        working: `(${start} - ${subtractAmount}) + ${addAmount} = ${afterSubtract} + ${addAmount} = ${finalAnswer}`,
        operation: 'remove_then_add',
        steps: 2,
        values: { start, subtractAmount, afterSubtract, addAmount, finalAnswer },
        step1: { operation: 'subtract', values: [start, subtractAmount], result: afterSubtract },
        step2: { operation: 'add', values: [afterSubtract, addAmount], result: finalAnswer }
    };
}

/**
 * Generate "two additions" problem
 * Example: Class 1 has 28, Class 2 has 32, Class 3 has 25. Total students?
 */
export function generateTwoAdditions(minValue, maxValue, params) {
    const total = randomInt(minValue + 20, maxValue);
    const a = randomInt(Math.floor(total * 0.25), Math.floor(total * 0.4));
    const remaining = total - a;
    const b = randomInt(Math.floor(remaining * 0.4), Math.floor(remaining * 0.6));
    const c = total - a - b;

    const contexts = [
        {
            text: `Class 1 has ${a} students, Class 2 has ${b} students, and Class 3 has ${c} students. How many students in total?`,
            items: 'students'
        },
        {
            text: `A shop has ${a} red apples, ${b} green apples, and ${c} yellow apples. How many apples altogether?`,
            items: 'apples'
        },
        {
            text: `There are ${a} books on the first shelf, ${b} books on the second shelf, and ${c} books on the third shelf. How many books in total?`,
            items: 'books'
        }
    ];

    const context = randomChoice(contexts);

    return {
        text: context.text,
        answer: total,
        working: `${a} + ${b} + ${c} = ${total}`,
        operation: 'two_additions',
        steps: 2,
        values: { a, b, c, total },
        step1: { operation: 'add', values: [a, b], result: a + b },
        step2: { operation: 'add', values: [a + b, c], result: total }
    };
}

/**
 * Generate "two subtractions" problem
 * Example: Farmer has 240 eggs. Sells 85 on Monday, 63 on Tuesday. How many left?
 */
export function generateTwoSubtractions(minValue, maxValue, params) {
    const start = randomInt(minValue + 30, maxValue);

    const subtract1 = randomInt(Math.floor(start * 0.2), Math.floor(start * 0.4));
    const afterFirst = start - subtract1;

    const subtract2 = randomInt(Math.floor(afterFirst * 0.2), Math.floor(afterFirst * 0.5));
    const finalAnswer = afterFirst - subtract2;

    const contexts = [
        {
            text: `A farmer has ${start} eggs. The farmer sells ${subtract1} eggs on Monday and ${subtract2} eggs on Tuesday. How many eggs are left?`,
            items: 'eggs'
        },
        {
            text: `A shop has ${start} items. ${subtract1} items are sold in the morning and ${subtract2} items are sold in the afternoon. How many items remain?`,
            items: 'items'
        },
        {
            text: `There are ${start} books in a library. ${subtract1} books are borrowed on Monday and ${subtract2} books are borrowed on Tuesday. How many books are left?`,
            items: 'books'
        }
    ];

    const context = randomChoice(contexts);

    return {
        text: context.text,
        answer: finalAnswer,
        working: `${start} - ${subtract1} - ${subtract2} = ${afterFirst} - ${subtract2} = ${finalAnswer}`,
        operation: 'two_subtractions',
        steps: 2,
        values: { start, subtract1, subtract2, afterFirst, finalAnswer },
        step1: { operation: 'subtract', values: [start, subtract1], result: afterFirst },
        step2: { operation: 'subtract', values: [afterFirst, subtract2], result: finalAnswer }
    };
}

// ============================================================================
// MEASURE CONTEXT GENERATORS
// ============================================================================

/**
 * Generate money problem (pence or pounds)
 */
export function generateMoneyProblem(minValue, maxValue, params, operation) {
    const unit = randomChoice(params.money_units || ['p']);
    const symbol = unit === 'p' ? 'p' : '£';

    let problem;
    if (operation === 'addition') {
        const { a, b, answer } = generateAddition(minValue, maxValue);
        problem = {
            text: `Emma has ${a}${symbol}. She gets ${b}${symbol} more. How much money does she have now?`,
            answer: answer,
            working: `${a} + ${b} = ${answer}`,
            unit: symbol
        };
    } else {
        const { a, b, answer } = generateSubtraction(minValue, maxValue);
        problem = {
            text: `Liam has ${a}${symbol}. He spends ${b}${symbol}. How much money does he have left?`,
            answer: answer,
            working: `${a} - ${b} = ${answer}`,
            unit: symbol
        };
    }

    return problem;
}

/**
 * Generate length problem (cm, m, mm)
 */
export function generateLengthProblem(minValue, maxValue, params, operation) {
    const unit = randomChoice(params.length_units || ['cm']);

    let problem;
    if (operation === 'addition') {
        const { a, b, answer } = generateAddition(minValue, maxValue);
        problem = {
            text: `A ribbon is ${a}${unit} long. Another ribbon is ${b}${unit} long. What is the total length?`,
            answer: answer,
            working: `${a} + ${b} = ${answer}`,
            unit: unit
        };
    } else {
        const { a, b, answer } = generateSubtraction(minValue, maxValue);
        problem = {
            text: `A rope is ${a}${unit} long. ${b}${unit} is cut off. How much rope is left?`,
            answer: answer,
            working: `${a} - ${b} = ${answer}`,
            unit: unit
        };
    }

    return problem;
}

/**
 * Generate mass problem (g, kg)
 */
export function generateMassProblem(minValue, maxValue, params, operation) {
    const unit = randomChoice(params.mass_units || ['g']);

    let problem;
    if (operation === 'addition') {
        const { a, b, answer } = generateAddition(minValue, maxValue);
        problem = {
            text: `One bag weighs ${a}${unit}. Another bag weighs ${b}${unit}. What is the total mass?`,
            answer: answer,
            working: `${a} + ${b} = ${answer}`,
            unit: unit
        };
    } else {
        const { a, b, answer } = generateSubtraction(minValue, maxValue);
        problem = {
            text: `A parcel weighs ${a}${unit}. ${b}${unit} is removed. How much does it weigh now?`,
            answer: answer,
            working: `${a} - ${b} = ${answer}`,
            unit: unit
        };
    }

    return problem;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate that a problem result is non-negative (for contexts where negative doesn't make sense)
 */
export function validateNonNegativeContext(result, contextType) {
    // For countable objects, money, physical quantities, result must be >= 0
    const nonNegativeContexts = ['objects', 'money', 'length', 'mass', 'capacity'];
    if (nonNegativeContexts.includes(contextType)) {
        return result >= 0;
    }
    return true; // Allow negative for other contexts (temperature, etc.)
}

/**
 * Validate that numbers are realistic for the context
 */
export function validateRealisticContext(value, contextType, unit) {
    // Add realistic bounds checking
    // For example, don't have someone with 10000 apples
    if (contextType === 'objects' && value > 1000) return false;
    if (contextType === 'money' && unit === 'p' && value > 100) return false; // Pence shouldn't exceed £1 typically
    return true;
}

// ============================================================================
// DISTRACTOR GENERATORS
// ============================================================================

/**
 * Generate strategic distractors for one-step problems
 */
export function generateOneStepDistractors(correctAnswer, values, operation, max_value) {
    const distractors = new Set();

    // Add common errors
    if (operation === 'addition') {
        distractors.add(values.a + values.b + 1); // Off by one
        distractors.add(values.a + values.b - 1); // Off by one
        if (values.b - values.a > 0) distractors.add(values.b - values.a); // Subtracted instead
    } else if (operation === 'subtraction') {
        distractors.add(values.a - values.b + 1); // Off by one
        distractors.add(values.a - values.b - 1); // Off by one
        distractors.add(values.a + values.b); // Added instead
    }

    // Fill remaining slots with nearby numbers
    while (distractors.size < 3) {
        const distractor = randomInt(Math.max(0, correctAnswer - 10), Math.min(max_value, correctAnswer + 10));
        if (distractor !== correctAnswer) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}

/**
 * Generate strategic distractors for two-step problems
 */
export function generateTwoStepDistractors(correctAnswer, problemData) {
    const distractors = new Set();
    const { step1, step2, values } = problemData;

    // Distractor 1: Only completed first step
    if (step1 && step1.result !== correctAnswer) {
        distractors.add(step1.result);
    }

    // Distractor 2: Wrong operation on second step
    if (problemData.operation === 'combine_then_remove') {
        // Added instead of subtracted in step 2
        const wrongOp = values.sum + values.subtractAmount;
        if (wrongOp !== correctAnswer) distractors.add(wrongOp);
    } else if (problemData.operation === 'remove_then_add') {
        // Subtracted instead of added in step 2
        const wrongOp = values.afterSubtract - values.addAmount;
        if (wrongOp !== correctAnswer && wrongOp >= 0) distractors.add(wrongOp);
    }

    // Distractor 3: Used wrong numbers
    if (problemData.operation === 'combine_then_remove' && values.a !== undefined) {
        const wrongNums = values.a - values.subtractAmount;
        if (wrongNums !== correctAnswer && wrongNums >= 0) distractors.add(wrongNums);
    }

    // Fill remaining with calculation errors (off by 1, off by 10, etc.)
    const errorValues = [correctAnswer + 1, correctAnswer - 1, correctAnswer + 10, correctAnswer - 10];
    for (const val of errorValues) {
        if (val >= 0 && val !== correctAnswer && distractors.size < 3) {
            distractors.add(val);
        }
    }

    // Ensure we have exactly 3 distractors
    while (distractors.size < 3) {
        const distractor = randomInt(Math.max(0, correctAnswer - 20), correctAnswer + 20);
        if (distractor !== correctAnswer && distractor >= 0) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}

// ============================================================================
// MULTI-STEP PROBLEM GENERATORS (YEAR 5-6)
// ============================================================================

/**
 * Get context templates appropriate for the number scale
 * Ensures realistic contexts (schools for hundreds, cities for millions)
 * @param {number} maxValue - Maximum value in the problem
 * @param {string} operationType - 'addition', 'subtraction', or 'mixed'
 * @returns {Array} Array of context templates with constraints
 */
function getScaledContexts(maxValue, operationType) {
    // SMALL SCALE: 1-10,000 (schools, local shops, small libraries)
    if (maxValue <= 10000) {
        if (operationType === 'addition') {
            return [
                {
                    template: (nums) => {
                        const yearGroups = nums.map((n, i) => `Year ${i + 3} has ${n.toLocaleString()} students`).join(', ');
                        return `A school has ${nums.length} year groups. ${yearGroups}. How many students in total?`;
                    },
                    items: 'students',
                    perItemMax: 500
                },
                {
                    template: (nums) => {
                        const sections = nums.map((n, i) => `${n.toLocaleString()} books in section ${String.fromCharCode(65 + i)}`).join(', ');
                        return `A library has ${nums.length} sections with ${sections}. How many books altogether?`;
                    },
                    items: 'books',
                    perItemMax: 3000
                },
                {
                    template: (nums) => {
                        const stores = nums.map((n, i) => `Store ${i + 1} has ${n.toLocaleString()} items`).join(', ');
                        return `A chain has ${nums.length} stores. ${stores}. What is the total stock across all stores?`;
                    },
                    items: 'items',
                    perItemMax: 2000
                }
            ];
        } else if (operationType === 'subtraction') {
            return [
                {
                    template: (start, nums) => {
                        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        const sales = nums.map((n, i) => `${n.toLocaleString()} items on ${days[i]}`).join(', ');
                        return `A shop has ${start.toLocaleString()} items. Items are sold: ${sales}. How many items remain?`;
                    },
                    items: 'items',
                    perItemMax: 2000
                },
                {
                    template: (start, nums) => {
                        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        const borrowed = nums.map((n, i) => `${n.toLocaleString()} books on ${days[i]}`).join(', ');
                        return `A library has ${start.toLocaleString()} books. Books are borrowed: ${borrowed}. How many books remain?`;
                    },
                    items: 'books',
                    perItemMax: 3000
                }
            ];
        } else if (operationType === 'mixed') {
            return [
                {
                    template: (start, ops) => {
                        const changes = ops.map((op) => {
                            const action = op.type === 'add' ? 'arrive' : 'leave';
                            return `${op.value.toLocaleString()} students ${action}`;
                        }).join(', then ');
                        return `A school has ${start.toLocaleString()} students. Over the term, ${changes}. How many students does the school have now?`;
                    },
                    items: 'students',
                    perItemMax: 500
                },
                {
                    template: (start, ops) => {
                        const changes = ops.map((op) => {
                            const action = op.type === 'add' ? 'delivered' : 'sold';
                            return `${op.value.toLocaleString()} items ${action}`;
                        }).join(', then ');
                        return `A shop has ${start.toLocaleString()} items. ${changes}. How many items are in stock now?`;
                    },
                    items: 'items',
                    perItemMax: 2000
                }
            ];
        }
    }

    // MEDIUM SCALE: 10,001-100,000 (school districts, warehouses, stadium attendance)
    if (maxValue <= 100000) {
        if (operationType === 'addition') {
            return [
                {
                    template: (nums) => {
                        const schools = nums.map((n, i) => `${n.toLocaleString()} students at School ${String.fromCharCode(65 + i)}`).join(', ');
                        return `A school district has ${nums.length} schools with ${schools}. How many students in total across the district?`;
                    },
                    items: 'students',
                    perItemMax: 20000
                },
                {
                    template: (nums) => {
                        const warehouses = nums.map((n, i) => `Warehouse ${i + 1} has ${n.toLocaleString()} items`).join(', ');
                        return `A company has ${nums.length} warehouses. ${warehouses}. What is the total inventory?`;
                    },
                    items: 'items',
                    perItemMax: 40000
                },
                {
                    template: (nums) => {
                        const matches = ['match 1', 'match 2', 'match 3', 'match 4', 'match 5'];
                        const attendance = nums.map((n, i) => `${n.toLocaleString()} at ${matches[i]}`).join(', ');
                        return `A stadium records attendance: ${attendance}. What was the total attendance across all matches?`;
                    },
                    items: 'spectators',
                    perItemMax: 50000
                }
            ];
        } else if (operationType === 'subtraction') {
            return [
                {
                    template: (start, nums) => {
                        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                        const dispatched = nums.map((n, i) => `${n.toLocaleString()} items on ${days[i]}`).join(', ');
                        return `A warehouse has ${start.toLocaleString()} items in stock. Items are dispatched: ${dispatched}. How many items remain?`;
                    },
                    items: 'items',
                    perItemMax: 40000
                },
                {
                    template: (start, nums) => {
                        const months = ['January', 'February', 'March', 'April', 'May'];
                        const spending = nums.map((n, i) => `£${n.toLocaleString()} in ${months[i]}`).join(', ');
                        return `A business account starts with £${start.toLocaleString()}. Expenses: ${spending}. How much remains?`;
                    },
                    items: 'pounds',
                    perItemMax: 50000
                }
            ];
        } else if (operationType === 'mixed') {
            return [
                {
                    template: (start, ops) => {
                        const changes = ops.map((op) => {
                            const action = op.type === 'add' ? 'received' : 'dispatched';
                            return `${op.value.toLocaleString()} items ${action}`;
                        }).join(', then ');
                        return `A warehouse has ${start.toLocaleString()} items. Over the week, ${changes}. How many items are in the warehouse now?`;
                    },
                    items: 'items',
                    perItemMax: 40000
                },
                {
                    template: (start, ops) => {
                        const transactions = ops.map((op) => {
                            const action = op.type === 'add' ? 'deposits' : 'withdraws';
                            return `${action} £${op.value.toLocaleString()}`;
                        }).join(', then ');
                        return `A business account has £${start.toLocaleString()}. ${transactions}. What is the final balance?`;
                    },
                    items: 'pounds',
                    perItemMax: 50000
                }
            ];
        }
    }

    // LARGE SCALE: 100,001-1,000,000 (towns, regional operations, major events)
    if (maxValue <= 1000000) {
        if (operationType === 'addition') {
            return [
                {
                    template: (nums) => {
                        const towns = nums.map((n, i) => `Town ${String.fromCharCode(65 + i)} has ${n.toLocaleString()} residents`).join(', ');
                        return `A region consists of ${nums.length} towns. ${towns}. What is the total population of the region?`;
                    },
                    items: 'residents',
                    perItemMax: 500000
                },
                {
                    template: (nums) => {
                        const regions = ['North', 'South', 'East', 'West', 'Central'];
                        const sales = nums.map((n, i) => `${regions[i]} region: £${n.toLocaleString()}`).join(', ');
                        return `A company tracks quarterly sales by region: ${sales}. What were the total sales?`;
                    },
                    items: 'pounds',
                    perItemMax: 600000
                },
                {
                    template: (nums) => {
                        const months = ['January', 'February', 'March', 'April', 'May'];
                        const passengers = nums.map((n, i) => `${n.toLocaleString()} passengers in ${months[i]}`).join(', ');
                        return `An airport records: ${passengers}. How many total passengers?`;
                    },
                    items: 'passengers',
                    perItemMax: 400000
                }
            ];
        } else if (operationType === 'subtraction') {
            return [
                {
                    template: (start, nums) => {
                        const centers = nums.map((n, i) => `${n.toLocaleString()} units to Center ${i + 1}`).join(', ');
                        return `A regional warehouse has ${start.toLocaleString()} units. Shipments sent: ${centers}. How many units remain?`;
                    },
                    items: 'units',
                    perItemMax: 400000
                },
                {
                    template: (start, nums) => {
                        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
                        const expenses = nums.map((n, i) => `£${n.toLocaleString()} in ${quarters[i]}`).join(', ');
                        return `A department budget is £${start.toLocaleString()}. Spending: ${expenses}. How much budget remains?`;
                    },
                    items: 'pounds',
                    perItemMax: 500000
                }
            ];
        } else if (operationType === 'mixed') {
            return [
                {
                    template: (start, ops) => {
                        const changes = ops.map((op) => {
                            const action = op.type === 'add' ? 'arrived' : 'departed';
                            return `${op.value.toLocaleString()} passengers ${action}`;
                        }).join(', then ');
                        return `An airport terminal has ${start.toLocaleString()} passengers. ${changes}. How many passengers are in the terminal now?`;
                    },
                    items: 'passengers',
                    perItemMax: 400000
                },
                {
                    template: (start, ops) => {
                        const transactions = ops.map((op) => {
                            const action = op.type === 'add' ? 'receives' : 'spends';
                            return `${action} £${op.value.toLocaleString()}`;
                        }).join(', then ');
                        return `A company budget starts at £${start.toLocaleString()}. ${transactions}. What is the final budget?`;
                    },
                    items: 'pounds',
                    perItemMax: 600000
                }
            ];
        }
    }

    // VERY LARGE SCALE: 1,000,001-10,000,000 (cities, national operations, major corporations)
    if (operationType === 'addition') {
        return [
            {
                template: (nums) => {
                    const districts = nums.map((n, i) => `District ${i + 1} has ${n.toLocaleString()} residents`).join(', ');
                    return `A city is divided into ${nums.length} districts. ${districts}. What is the total city population?`;
                },
                items: 'residents',
                perItemMax: 3000000
            },
            {
                template: (nums) => {
                    const divisions = ['Manufacturing', 'Retail', 'Services', 'Technology', 'Finance'];
                    const revenue = nums.map((n, i) => `${divisions[i]}: £${n.toLocaleString()}`).join(', ');
                    return `A corporation's annual revenue by division: ${revenue}. What is the total annual revenue?`;
                },
                items: 'pounds',
                perItemMax: 5000000
            },
            {
                template: (nums) => {
                    const years = nums.map((n, i) => `Year ${2019 + i}: ${n.toLocaleString()} units`).join(', ');
                    return `A factory's annual production: ${years}. What is the total production across all years?`;
                },
                items: 'units',
                perItemMax: 4000000
            }
        ];
    } else if (operationType === 'subtraction') {
        return [
            {
                template: (start, nums) => {
                    const regions = ['North', 'South', 'East', 'West', 'Central', 'Overseas'];
                    const distributed = nums.map((n, i) => `${n.toLocaleString()} units to ${regions[i] || `Region ${i + 1}`}`).join(', ');
                    return `A national distribution center has ${start.toLocaleString()} units. Stock distributed: ${distributed}. How many units remain?`;
                },
                items: 'units',
                perItemMax: 4000000
            },
            {
                template: (start, nums) => {
                    const programs = nums.map((n, i) => `£${n.toLocaleString()} to Program ${i + 1}`).join(', ');
                    return `A government department has a budget of £${start.toLocaleString()}. Allocated: ${programs}. How much budget remains?`;
                },
                items: 'pounds',
                perItemMax: 3000000
            }
        ];
    } else if (operationType === 'mixed') {
        return [
            {
                template: (start, ops) => {
                    const changes = ops.map((op) => {
                        const action = op.type === 'add' ? 'moved in' : 'moved out';
                        return `${op.value.toLocaleString()} people ${action}`;
                    }).join(', then ');
                    return `A city district starts with ${start.toLocaleString()} residents. Over the year, ${changes}. What is the current population?`;
                },
                items: 'residents',
                perItemMax: 3000000
            },
            {
                template: (start, ops) => {
                    const transactions = ops.map((op) => {
                        const action = op.type === 'add' ? 'gains' : 'spends';
                        return `${action} £${op.value.toLocaleString()}`;
                    }).join(', then ');
                    return `A corporation starts with £${start.toLocaleString()} in reserves. ${transactions}. What are the final reserves?`;
                },
                items: 'pounds',
                perItemMax: 5000000
            }
        ];
    }

    // Default fallback (should not reach here)
    return operationType === 'addition' ?
        [{ template: (nums) => `Add these numbers: ${nums.join(', ')}`, items: 'numbers', perItemMax: maxValue }] :
        [{ template: (start, nums) => `Start: ${start}. Subtract: ${nums.join(', ')}`, items: 'numbers', perItemMax: maxValue }];
}

/**
 * Generate multi-step addition problem (3+ sequential additions)
 * Example: "Year 3 has 142, Year 4 has 156, Year 5 has 138. Total students?"
 */
export function generateMultiStepAddition(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Get appropriate contexts for this number scale
    const scaledContexts = getScaledContexts(maxValue, 'addition');
    const context = randomChoice(scaledContexts);

    // Generate target total
    const total = randomInt(minValue + (numSteps * 10), maxValue);

    // Generate addends that sum to total, respecting per-item constraints
    const addends = [];
    let remaining = total;

    for (let i = 0; i < numSteps - 1; i++) {
        const minPart = Math.floor(remaining * 0.15);
        const maxPart = Math.min(
            Math.floor(remaining * 0.35),
            context.perItemMax || maxValue
        );
        const addend = randomInt(minPart, maxPart);
        addends.push(addend);
        remaining -= addend;
    }
    // Ensure last addend also respects per-item constraint
    if (context.perItemMax && remaining > context.perItemMax) {
        // Regenerate with tighter constraints if last value is too large
        const perItemMax = context.perItemMax;
        addends.length = 0;
        remaining = total;
        for (let i = 0; i < numSteps - 1; i++) {
            const minPart = Math.floor(remaining * 0.2);
            const maxPart = Math.min(Math.floor(remaining * 0.3), perItemMax);
            const addend = randomInt(minPart, maxPart);
            addends.push(addend);
            remaining -= addend;
        }
    }
    addends.push(remaining); // Last addend is whatever's left

    // Shuffle to avoid predictable patterns
    const shuffledAddends = shuffle([...addends]);

    // Create question text using scaled context template
    const text = context.template(shuffledAddends);

    // Build working string
    const workingSteps = [];
    let runningTotal = shuffledAddends[0];
    for (let i = 1; i < shuffledAddends.length; i++) {
        runningTotal += shuffledAddends[i];
        workingSteps.push(`${shuffledAddends.slice(0, i + 1).join(' + ')} = ${runningTotal}`);
    }

    return {
        text: text,
        answer: total,
        working: workingSteps.join(', '),
        operation: 'multi_step_addition',
        steps: numSteps,
        values: { addends: shuffledAddends, total },
        allSteps: shuffledAddends.map((val, idx) => ({
            operation: 'add',
            value: val,
            runningTotal: shuffledAddends.slice(0, idx + 1).reduce((sum, v) => sum + v, 0)
        }))
    };
}

/**
 * Generate multi-step subtraction problem (3+ sequential subtractions)
 * Example: "Shop has 2456 items. Monday sells 340, Tuesday sells 285, Wednesday sells 412. How many left?"
 */
export function generateMultiStepSubtraction(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Get appropriate contexts for this number scale
    const scaledContexts = getScaledContexts(maxValue, 'subtraction');
    const context = randomChoice(scaledContexts);

    // Generate starting amount
    const start = randomInt(minValue + (numSteps * 50), maxValue);

    // Generate subtractions (ensure we don't go negative), respecting per-item constraints
    const subtractions = [];
    let remaining = start;

    for (let i = 0; i < numSteps; i++) {
        const maxSubtract = Math.min(
            Math.floor(remaining * 0.3),
            context.perItemMax || maxValue
        ); // Don't subtract too much at once
        const minSubtract = Math.floor(remaining * 0.1);
        const subtract = randomInt(minSubtract, maxSubtract);
        subtractions.push(subtract);
        remaining -= subtract;
    }

    const finalAnswer = remaining;

    // Create question text using scaled context template
    const text = context.template(start, subtractions);

    // Build working string
    const workingSteps = [];
    let runningTotal = start;
    for (let i = 0; i < subtractions.length; i++) {
        runningTotal -= subtractions[i];
        workingSteps.push(`${start} - ${subtractions.slice(0, i + 1).join(' - ')} = ${runningTotal}`);
    }

    return {
        text: text,
        answer: finalAnswer,
        working: workingSteps[workingSteps.length - 1],
        operation: 'multi_step_subtraction',
        steps: numSteps,
        values: { start, subtractions, finalAnswer },
        allSteps: subtractions.map((val, idx) => {
            const runningTotal = start - subtractions.slice(0, idx + 1).reduce((sum, v) => sum + v, 0);
            return {
                operation: 'subtract',
                value: val,
                runningTotal: runningTotal
            };
        })
    };
}

/**
 * Generate mixed multi-step problem (combination of addition and subtraction)
 * Example: "School has 450 students. 32 join Year 7, 28 leave, 15 more join. How many now?"
 */
export function generateMultiStepMixed(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Get appropriate contexts for this number scale
    const scaledContexts = getScaledContexts(maxValue, 'mixed');
    const context = randomChoice(scaledContexts);

    // Generate starting amount
    const start = randomInt(minValue + 50, maxValue - 100);

    // Generate operations (mix of add/subtract), respecting per-item constraints
    const operations = [];
    let remaining = start;

    for (let i = 0; i < numSteps; i++) {
        const isAddition = Math.random() < 0.5;

        if (isAddition) {
            const addAmount = randomInt(
                Math.floor(start * 0.05),
                Math.min(Math.floor(start * 0.15), context.perItemMax || maxValue)
            );
            operations.push({ type: 'add', value: addAmount });
            remaining += addAmount;
        } else {
            const maxSubtract = Math.min(
                Math.floor(remaining * 0.25),
                context.perItemMax || maxValue
            );
            const minSubtract = Math.floor(remaining * 0.05);
            const subtractAmount = randomInt(minSubtract, maxSubtract);
            operations.push({ type: 'subtract', value: subtractAmount });
            remaining -= subtractAmount;
        }
    }

    const finalAnswer = remaining;

    // Create question text using scaled context template
    const text = context.template(start, operations);

    // Build working
    let workingParts = [`${start}`];
    operations.forEach(op => {
        workingParts.push(op.type === 'add' ? `+ ${op.value}` : `- ${op.value}`);
    });
    const working = `${workingParts.join(' ')} = ${finalAnswer}`;

    return {
        text: text,
        answer: finalAnswer,
        working: working,
        operation: 'multi_step_mixed',
        steps: numSteps,
        values: { start, operations, finalAnswer },
        allSteps: operations.map((op, idx) => {
            let runningTotal = start;
            for (let i = 0; i <= idx; i++) {
                if (operations[i].type === 'add') {
                    runningTotal += operations[i].value;
                } else {
                    runningTotal -= operations[i].value;
                }
            }
            return {
                operation: op.type,
                value: op.value,
                runningTotal: runningTotal
            };
        })
    };
}

/**
 * Generate multi-step problem with inference/missing information
 * Requires working backwards or deducing unstated values
 * Example: "School has 3 year groups with same number of students. 45 absent. 321 present. How many per year?"
 */
export function generateMultiStepWithInference(minValue, maxValue, params, steps = 3) {
    const numSteps = Array.isArray(steps) ? randomChoice(steps) : steps;

    // Type 1: Equal groups problem (requires division thinking + add/subtract)
    const numGroups = randomChoice([3, 4, 5]);

    // Apply context-appropriate constraints
    let perGroupMax;
    if (maxValue <= 10000) {
        perGroupMax = 500; // Schools with ~500 students per year
    } else if (maxValue <= 100000) {
        perGroupMax = 5000; // Warehouses with ~5k items per section
    } else if (maxValue <= 1000000) {
        perGroupMax = 50000; // Regional centers with ~50k units per location
    } else {
        perGroupMax = 500000; // City districts with ~500k residents per district
    }

    const perGroup = randomInt(Math.floor(minValue / numGroups), Math.min(Math.floor(maxValue / numGroups), perGroupMax));
    const total = numGroups * perGroup;
    const absent = randomInt(Math.floor(total * 0.1), Math.floor(total * 0.2));
    const present = total - absent;

    // Scale contexts based on maxValue
    let contexts;
    if (maxValue <= 10000) {
        // SMALL SCALE: schools, shops
        contexts = [
            {
                text: `A school has ${numGroups} year groups with the same number of students in each. Today ${absent.toLocaleString()} students are absent and ${present.toLocaleString()} students are present. How many students are in each year group?`,
                answer: perGroup,
                working: `Total = ${present.toLocaleString()} + ${absent.toLocaleString()} = ${total.toLocaleString()}. Per group = ${total.toLocaleString()} ÷ ${numGroups} = ${perGroup.toLocaleString()}`,
                inferenceType: 'equal_groups_with_change'
            },
            {
                text: `A library has ${numGroups} sections with equal numbers of books. ${absent.toLocaleString()} books are borrowed, leaving ${present.toLocaleString()} books. How many books were in each section originally?`,
                answer: perGroup,
                working: `Total originally = ${present.toLocaleString()} + ${absent.toLocaleString()} = ${total.toLocaleString()}. Per section = ${total.toLocaleString()} ÷ ${numGroups} = ${perGroup.toLocaleString()}`,
                inferenceType: 'equal_groups_with_change'
            }
        ];
    } else if (maxValue <= 100000) {
        // MEDIUM SCALE: warehouses, multi-location stores
        contexts = [
            {
                text: `A company has ${numGroups} warehouses with equal stock levels. ${absent.toLocaleString()} items are sold from total stock, leaving ${present.toLocaleString()} items. How many items were in each warehouse originally?`,
                answer: perGroup,
                working: `Total originally = ${present.toLocaleString()} + ${absent.toLocaleString()} = ${total.toLocaleString()}. Per warehouse = ${total.toLocaleString()} ÷ ${numGroups} = ${perGroup.toLocaleString()}`,
                inferenceType: 'equal_groups_with_change'
            },
            {
                text: `A school district has ${numGroups} schools with equal enrollment. Today ${absent.toLocaleString()} students are absent district-wide and ${present.toLocaleString()} students are present. How many students are enrolled at each school?`,
                answer: perGroup,
                working: `Total enrolled = ${present.toLocaleString()} + ${absent.toLocaleString()} = ${total.toLocaleString()}. Per school = ${total.toLocaleString()} ÷ ${numGroups} = ${perGroup.toLocaleString()}`,
                inferenceType: 'equal_groups_with_change'
            }
        ];
    } else if (maxValue <= 1000000) {
        // LARGE SCALE: regional operations
        contexts = [
            {
                text: `A company operates ${numGroups} regional centers with equal capacity. ${absent.toLocaleString()} units are dispatched from the network, leaving ${present.toLocaleString()} units. What is the capacity of each regional center?`,
                answer: perGroup,
                working: `Total capacity = ${present.toLocaleString()} + ${absent.toLocaleString()} = ${total.toLocaleString()}. Per center = ${total.toLocaleString()} ÷ ${numGroups} = ${perGroup.toLocaleString()}`,
                inferenceType: 'equal_groups_with_change'
            }
        ];
    } else {
        // VERY LARGE SCALE: cities, national operations
        contexts = [
            {
                text: `A city is divided into ${numGroups} districts with equal populations. During the year, ${absent.toLocaleString()} people moved away and ${present.toLocaleString()} residents remain. What was the original population of each district?`,
                answer: perGroup,
                working: `Total originally = ${present.toLocaleString()} + ${absent.toLocaleString()} = ${total.toLocaleString()}. Per district = ${total.toLocaleString()} ÷ ${numGroups} = ${perGroup.toLocaleString()}`,
                inferenceType: 'equal_groups_with_change'
            }
        ];
    }

    const context = randomChoice(contexts);

    return {
        text: context.text,
        answer: context.answer,
        working: context.working,
        operation: 'multi_step_with_inference',
        steps: numSteps,
        values: { numGroups, perGroup, total, absent, present },
        inferenceType: context.inferenceType
    };
}

/**
 * Generate strategic distractors for multi-step problems
 */
export function generateMultiStepDistractors(correctAnswer, problemData) {
    const distractors = new Set();
    const { allSteps, values, operation } = problemData;

    // Distractor 1: Only completed first step
    if (allSteps && allSteps.length > 0) {
        distractors.add(allSteps[0].runningTotal);
    }

    // Distractor 2: Only completed first two steps (for 3+ step problems)
    if (allSteps && allSteps.length > 1) {
        distractors.add(allSteps[1].runningTotal);
    }

    // Distractor 3: Wrong operation on one step
    if (operation === 'multi_step_mixed' && values.operations) {
        // Flip one operation
        let wrongTotal = values.start;
        for (let i = 0; i < values.operations.length; i++) {
            const op = values.operations[i];
            if (i === 0) {
                // Flip the first operation
                if (op.type === 'add') {
                    wrongTotal -= op.value;
                } else {
                    wrongTotal += op.value;
                }
            } else {
                // Do remaining correctly
                if (op.type === 'add') {
                    wrongTotal += op.value;
                } else {
                    wrongTotal -= op.value;
                }
            }
        }
        if (wrongTotal !== correctAnswer && wrongTotal > 0) {
            distractors.add(wrongTotal);
        }
    }

    // Distractor 4: Used wrong numbers (skipped a step)
    if (allSteps && allSteps.length > 2) {
        const skipMiddleTotal = allSteps[allSteps.length - 1].runningTotal;
        if (skipMiddleTotal !== correctAnswer) {
            distractors.add(skipMiddleTotal);
        }
    }

    // Fill remaining with calculation errors
    const errorValues = [
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 10,
        correctAnswer - 10,
        Math.floor(correctAnswer * 1.1),
        Math.floor(correctAnswer * 0.9)
    ];

    for (const val of errorValues) {
        if (val > 0 && val !== correctAnswer && distractors.size < 3) {
            distractors.add(val);
        }
    }

    // Ensure we have exactly 3 distractors
    while (distractors.size < 3) {
        const range = Math.max(20, Math.floor(correctAnswer * 0.1));
        const distractor = randomInt(Math.max(0, correctAnswer - range), correctAnswer + range);
        if (distractor !== correctAnswer && distractor > 0) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}

```
--- END FILE: src\generators\helpers\C04_problemHelpers.js ---

--- START FILE: src\generators\helpers\C07_divisionHelpers.js ---
```javascript
/**
 * Division Helpers for C07 Modules
 *
 * Provides functions for formatting division using short division, long division,
 * and remainder interpretation
 */

/**
 * Format short division layout
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by
 * @param {boolean} showAnswer - Whether to show the answer
 * @returns {string} HTML string with short division layout
 */
export function formatShortDivision(dividend, divisor, showAnswer = false) {
    const dividendStr = dividend.toLocaleString();

    if (showAnswer) {
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        const quotientStr = quotient.toLocaleString();

        if (remainder > 0) {
            return `<pre class="short-division">       ${quotientStr} r ${remainder}
    ${divisor.toString().padStart(2, ' ')} ) ${dividendStr}</pre>`;
        } else {
            return `<pre class="short-division">       ${quotientStr}
    ${divisor.toString().padStart(2, ' ')} ) ${dividendStr}</pre>`;
        }
    }

    return `<pre class="short-division">       ?
    ${divisor.toString().padStart(2, ' ')} ) ${dividendStr}</pre>`;
}

/**
 * Format long division layout
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by (typically 2-digit)
 * @param {boolean} showAnswer - Whether to show the answer
 * @returns {string} HTML string with long division layout
 */
export function formatLongDivision(dividend, divisor, showAnswer = false) {
    const dividendStr = dividend.toLocaleString();

    if (showAnswer) {
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        const quotientStr = quotient.toLocaleString();

        // For display purposes, we show the basic long division layout
        // A full step-by-step would be too complex for this format
        if (remainder > 0) {
            return `<pre class="long-division">        ${quotientStr} r ${remainder}
     ┌──────────
  ${divisor.toString().padStart(2, ' ')} │ ${dividendStr}</pre>`;
        } else {
            return `<pre class="long-division">        ${quotientStr}
     ┌──────────
  ${divisor.toString().padStart(2, ' ')} │ ${dividendStr}</pre>`;
        }
    }

    return `<pre class="long-division">        ?
     ┌──────────
  ${divisor.toString().padStart(2, ' ')} │ ${dividendStr}</pre>`;
}

/**
 * Calculate division with remainder
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by
 * @returns {Object} Object with quotient and remainder
 */
export function divideWithRemainder(dividend, divisor) {
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return { quotient, remainder };
}

/**
 * Express remainder as a fraction in simplest form
 * @param {number} remainder - The remainder
 * @param {number} divisor - The divisor (becomes denominator)
 * @returns {string} Fraction string (e.g., "1/2", "2/3")
 */
export function remainderAsFraction(remainder, divisor) {
    if (remainder === 0) return '';

    // Simplify the fraction
    const gcd = findGCD(remainder, divisor);
    const numerator = remainder / gcd;
    const denominator = divisor / gcd;

    return `${numerator}/${denominator}`;
}

/**
 * Express division result with remainder as decimal
 * @param {number} dividend - Number being divided
 * @param {number} divisor - Number to divide by
 * @param {number} decimalPlaces - Number of decimal places (default 1)
 * @returns {number} Decimal result
 */
export function divisionAsDecimal(dividend, divisor, decimalPlaces = 1) {
    const result = dividend / divisor;
    return parseFloat(result.toFixed(decimalPlaces));
}

/**
 * Find GCD (Greatest Common Divisor) using Euclidean algorithm
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD of a and b
 */
export function findGCD(a, b) {
    if (b === 0) return a;
    return findGCD(b, a % b);
}

/**
 * Generate division problem with exact division (no remainder)
 * @param {number} minDividend - Minimum dividend
 * @param {number} maxDividend - Maximum dividend
 * @param {number} minDivisor - Minimum divisor
 * @param {number} maxDivisor - Maximum divisor
 * @param {number} maxAttempts - Maximum generation attempts
 * @returns {Object} Object with dividend and divisor
 */
export function generateExactDivision(minDividend, maxDividend, minDivisor, maxDivisor, maxAttempts = 100) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const divisor = Math.floor(Math.random() * (maxDivisor - minDivisor + 1)) + minDivisor;
        const quotient = Math.floor(Math.random() * (Math.floor(maxDividend / divisor) - Math.floor(minDividend / divisor) + 1)) + Math.floor(minDividend / divisor);
        const dividend = divisor * quotient;

        if (dividend >= minDividend && dividend <= maxDividend && dividend % divisor === 0) {
            return { dividend, divisor, quotient };
        }
    }

    // Fallback: generate simple exact division
    const divisor = minDivisor;
    const quotient = Math.floor(minDividend / divisor);
    const dividend = divisor * quotient;
    return { dividend, divisor, quotient };
}

/**
 * Generate division problem with a specific remainder
 * @param {number} minDividend - Minimum dividend
 * @param {number} maxDividend - Maximum dividend
 * @param {number} minDivisor - Minimum divisor
 * @param {number} maxDivisor - Maximum divisor
 * @returns {Object} Object with dividend, divisor, quotient, and remainder
 */
export function generateDivisionWithRemainder(minDividend, maxDividend, minDivisor, maxDivisor) {
    const divisor = Math.floor(Math.random() * (maxDivisor - minDivisor + 1)) + minDivisor;
    const quotient = Math.floor(Math.random() * (Math.floor(maxDividend / divisor) - Math.floor(minDividend / divisor) + 1)) + Math.floor(minDividend / divisor);
    const remainder = Math.floor(Math.random() * (divisor - 1)) + 1; // Remainder must be less than divisor, at least 1
    const dividend = divisor * quotient + remainder;

    if (dividend <= maxDividend && dividend >= minDividend) {
        return { dividend, divisor, quotient, remainder };
    }

    // Fallback without remainder check
    const fallbackDividend = Math.floor(Math.random() * (maxDividend - minDividend + 1)) + minDividend;
    const fallbackQuotient = Math.floor(fallbackDividend / divisor);
    const fallbackRemainder = fallbackDividend % divisor;
    return {
        dividend: fallbackDividend,
        divisor,
        quotient: fallbackQuotient,
        remainder: fallbackRemainder
    };
}

/**
 * Interpret remainder based on context
 * @param {string} context - Context type ('round_up', 'round_down', 'ignore', 'exact')
 * @param {number} quotient - The quotient
 * @param {number} remainder - The remainder
 * @param {number} divisor - The divisor
 * @returns {Object} Interpretation with explanation
 */
export function interpretRemainder(context, quotient, remainder, divisor) {
    if (remainder === 0) {
        return {
            answer: quotient,
            explanation: 'Exact division - no remainder'
        };
    }

    switch(context) {
        case 'round_up':
            return {
                answer: quotient + 1,
                explanation: `Need to round up to ${quotient + 1} (can't have partial items)`
            };
        case 'round_down':
            return {
                answer: quotient,
                explanation: `Round down to ${quotient} (ignore the remainder)`
            };
        case 'ignore':
            return {
                answer: quotient,
                explanation: `${quotient} (remainder is not needed)`
            };
        case 'as_fraction':
            return {
                answer: `${quotient} ${remainderAsFraction(remainder, divisor)}`,
                explanation: `${quotient} and ${remainderAsFraction(remainder, divisor)}`
            };
        case 'as_decimal':
            return {
                answer: divisionAsDecimal(quotient * divisor + remainder, divisor, 2),
                explanation: `${divisionAsDecimal(quotient * divisor + remainder, divisor, 2)} as a decimal`
            };
        case 'exact_remainder':
            return {
                answer: `${quotient} r ${remainder}`,
                explanation: `${quotient} remainder ${remainder}`
            };
        default:
            return {
                answer: quotient,
                explanation: `${quotient}`
            };
    }
}

/**
 * Create a context for remainder interpretation
 * @param {string} contextType - Type of context
 * @returns {Object} Context description and expected interpretation
 */
export function createRemainderContext(contextType) {
    const contexts = {
        'round_up': {
            scenarios: [
                'buses needed to transport',
                'boxes needed to pack',
                'bags needed to carry',
                'trips needed to move'
            ],
            interpretation: 'round_up',
            explanation: 'Need a whole number, must round up'
        },
        'round_down': {
            scenarios: [
                'complete teams that can be made',
                'full groups that can be formed',
                'complete sets available',
                'whole portions that can be served'
            ],
            interpretation: 'round_down',
            explanation: 'Only count complete groups'
        },
        'as_fraction': {
            scenarios: [
                'share of pizza each person gets',
                'portion of cake for each child',
                'fraction of the total',
                'part of the whole amount'
            ],
            interpretation: 'as_fraction',
            explanation: 'Express as a mixed number'
        },
        'exact_remainder': {
            scenarios: [
                'how many left over',
                'how many remain',
                'what is the remainder',
                'how many are not used'
            ],
            interpretation: 'exact_remainder',
            explanation: 'Express as quotient and remainder'
        }
    };

    return contexts[contextType] || contexts['exact_remainder'];
}

```
--- END FILE: src\generators\helpers\C07_divisionHelpers.js ---

--- START FILE: src\generators\helpers\C07_multiplicationHelpers.js ---
```javascript
/**
 * Multiplication Helpers for C07 Modules
 *
 * Provides functions for formatting multiplication in columnar layout,
 * grid method, and long multiplication
 */

/**
 * Format a simple multiplication in columnar layout
 * @param {number} multiplicand - Number being multiplied (top)
 * @param {number} multiplier - Number to multiply by (bottom)
 * @param {boolean} showAnswer - Whether to show the answer or '?'
 * @returns {string} HTML string with columnar multiplication layout
 */
export function formatColumnarMultiply(multiplicand, multiplier, showAnswer = false) {
    const num1Str = multiplicand.toLocaleString();
    const num2Str = multiplier.toLocaleString();

    const maxLen = Math.max(num1Str.length, num2Str.length);

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');

    const line = '─'.repeat(maxLen + 2);

    if (showAnswer) {
        const product = multiplicand * multiplier;
        const productStr = product.toLocaleString();
        const productPadded = productStr.padStart(maxLen + 2, ' ');

        return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${productPadded}</pre>`;
    }

    return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format columnar multiplication with carrying marks shown
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Single-digit multiplier
 * @param {Array<number>} carries - Array of carry values (right to left)
 * @returns {string} HTML string with columnar layout and carries
 */
export function formatColumnarMultiplyWithCarry(multiplicand, multiplier, carries = []) {
    const num1Str = multiplicand.toLocaleString();
    const num2Str = multiplier.toString();

    const maxLen = Math.max(num1Str.length, num2Str.length);

    // Generate carry row
    let carryRow = '';
    if (carries.length > 0) {
        let carryDisplay = ' '.repeat(maxLen + 2);
        carries.forEach((carry, idx) => {
            if (carry) {
                const pos = maxLen + 1 - idx;
                if (pos >= 0 && pos < carryDisplay.length) {
                    carryDisplay = carryDisplay.substring(0, pos) + carry + carryDisplay.substring(pos + 1);
                }
            }
        });
        carryRow = `<span class="carry-row">${carryDisplay}</span>\n`;
    }

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    return `<pre class="columnar-calc">${carryRow}  ${num1Padded}
× ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Calculate carries for multiplication
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Single-digit multiplier
 * @returns {Array<number>} Array of carry values (right to left, 0 for no carry)
 */
export function calculateCarries(multiplicand, multiplier) {
    const digits = multiplicand.toString().split('').reverse();
    const carries = [];
    let carry = 0;

    for (let i = 0; i < digits.length; i++) {
        const digit = parseInt(digits[i]);
        const product = digit * multiplier + carry;
        carry = Math.floor(product / 10);
        carries.push(carry);
    }

    return carries;
}

/**
 * Format long multiplication (2-digit multiplier)
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Two-digit multiplier
 * @param {boolean} showAnswer - Whether to show the answer
 * @returns {string} HTML string with long multiplication layout
 */
export function formatLongMultiplication(multiplicand, multiplier, showAnswer = false) {
    const multiplierStr = multiplier.toString();
    const onesDigit = parseInt(multiplierStr[multiplierStr.length - 1]);
    const tensDigit = multiplierStr.length > 1 ? parseInt(multiplierStr[multiplierStr.length - 2]) : 0;

    const partialProduct1 = multiplicand * onesDigit;
    const partialProduct2 = multiplicand * tensDigit;

    const num1Str = multiplicand.toLocaleString();
    const num2Str = multiplier.toLocaleString();

    const maxLen = Math.max(
        num1Str.length,
        num2Str.length,
        partialProduct1.toString().length,
        (partialProduct2.toString().length + 1) // +1 for the zero placeholder
    );

    const num1Padded = num1Str.padStart(maxLen + 2, ' ');
    const num2Padded = num2Str.padStart(maxLen + 2, ' ');
    const line = '─'.repeat(maxLen + 2);

    if (showAnswer) {
        const pp1Str = partialProduct1.toLocaleString();
        const pp2Str = (partialProduct2 * 10).toLocaleString(); // Shifted by one place
        const total = multiplicand * multiplier;
        const totalStr = total.toLocaleString();

        const pp1Padded = pp1Str.padStart(maxLen + 2, ' ');
        const pp2Padded = pp2Str.padStart(maxLen + 2, ' ');
        const totalPadded = totalStr.padStart(maxLen + 2, ' ');

        return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${pp1Padded}
+ ${pp2Padded}
${line}
  ${totalPadded}</pre>`;
    }

    return `<pre class="columnar-calc">  ${num1Padded}
× ${num2Padded}
${line}
  ${'?'.padStart(maxLen + 2, ' ')}</pre>`;
}

/**
 * Format grid method multiplication
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Number to multiply by
 * @returns {string} HTML string with grid method layout
 */
export function formatGridMethod(multiplicand, multiplier) {
    // Partition multiplicand into place values
    const multiplicandDigits = multiplicand.toString().split('').reverse();
    const multiplierDigits = multiplier.toString().split('').reverse();

    // Create partitions
    const multiplicandParts = multiplicandDigits.map((d, i) => parseInt(d) * Math.pow(10, i)).reverse();
    const multiplierParts = multiplierDigits.map((d, i) => parseInt(d) * Math.pow(10, i)).reverse();

    // Build grid header
    let grid = '<div class="grid-method">\n';
    grid += '<table>\n<tr><td></td>';
    multiplicandParts.forEach(part => {
        grid += `<td class="grid-header">${part}</td>`;
    });
    grid += '</tr>\n';

    // Build grid rows
    multiplierParts.forEach(multPart => {
        grid += `<tr><td class="grid-header">${multPart}</td>`;
        multiplicandParts.forEach(mcandPart => {
            const product = mcandPart * multPart;
            grid += `<td class="grid-cell">${product.toLocaleString()}</td>`;
        });
        grid += '</tr>\n';
    });

    grid += '</table>\n</div>';

    return grid;
}

/**
 * Format expanded multiplication showing partitioning
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Number to multiply by
 * @returns {string} Expanded form as text
 */
export function formatExpandedMultiplication(multiplicand, multiplier) {
    const digits = multiplicand.toString().split('').reverse();
    const parts = [];

    for (let i = 0; i < digits.length; i++) {
        const digit = parseInt(digits[i]);
        const placeValue = digit * Math.pow(10, i);
        if (placeValue > 0) {
            const product = placeValue * multiplier;
            parts.push(`(${placeValue} × ${multiplier} = ${product})`);
        }
    }

    return parts.reverse().join(' + ');
}

/**
 * Check if multiplication requires carrying
 * @param {number} multiplicand - Number being multiplied
 * @param {number} multiplier - Single-digit multiplier
 * @returns {boolean} True if carrying is needed
 */
export function requiresCarrying(multiplicand, multiplier) {
    const digits = multiplicand.toString().split('').reverse();
    let carry = 0;

    for (let digit of digits) {
        const product = parseInt(digit) * multiplier + carry;
        if (product >= 10) return true;
        carry = Math.floor(product / 10);
    }

    return false;
}

/**
 * Generate a multiplication problem without carrying
 * @param {number} minMultiplicand - Minimum multiplicand
 * @param {number} maxMultiplicand - Maximum multiplicand
 * @param {number} minMultiplier - Minimum multiplier
 * @param {number} maxMultiplier - Maximum multiplier
 * @param {number} maxAttempts - Maximum generation attempts
 * @returns {Object} Object with multiplicand and multiplier
 */
export function generateNoCarryMultiplication(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier, maxAttempts = 100) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
        const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;

        if (!requiresCarrying(multiplicand, multiplier)) {
            return { multiplicand, multiplier };
        }
    }

    // Fallback: return any valid numbers
    const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
    const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;
    return { multiplicand, multiplier };
}

/**
 * Generate a multiplication problem with carrying
 * @param {number} minMultiplicand - Minimum multiplicand
 * @param {number} maxMultiplicand - Maximum multiplicand
 * @param {number} minMultiplier - Minimum multiplier
 * @param {number} maxMultiplier - Maximum multiplier
 * @param {number} maxAttempts - Maximum generation attempts
 * @returns {Object} Object with multiplicand and multiplier
 */
export function generateWithCarryMultiplication(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier, maxAttempts = 100) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
        const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;

        if (requiresCarrying(multiplicand, multiplier)) {
            return { multiplicand, multiplier };
        }
    }

    // Fallback: return any valid numbers
    const multiplicand = Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) + minMultiplicand;
    const multiplier = Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier;
    return { multiplicand, multiplier };
}

```
--- END FILE: src\generators\helpers\C07_multiplicationHelpers.js ---

--- START FILE: src\generators\helpers\C08_propertyHelpers.js ---
```javascript
/**
 * C08 Property Helpers
 *
 * Shared utility functions for C08 question generators (mathematical properties and problem-solving)
 *
 * Provides functions for:
 * - Multiplication/division word problems
 * - Commutative, associative, distributive properties
 * - Scaling and correspondence problems
 * - Factor/multiple problems
 * - Rate and fraction problems
 */

import { randomInt, randomChoice, shuffle } from './N02_numberHelpers.js';
import { generateMultiplication, generateDivision } from './C01_C03_calculationHelpers.js';

// ============================================================================
// MULTIPLICATION/DIVISION WORD PROBLEMS (Y1-2)
// ============================================================================

/**
 * Generate equal groups problem
 * Example: "There are 3 boxes with 4 pencils in each box. How many pencils altogether?"
 */
export function generateEqualGroups(tables, maxProduct) {
    const multiplier = randomChoice(tables);
    const maxGroups = Math.floor(maxProduct / multiplier);
    const groups = randomInt(2, Math.min(maxGroups, 10));
    const answer = groups * multiplier;

    const contexts = [
        { item: 'pencils', container: 'boxes' },
        { item: 'apples', container: 'bags' },
        { item: 'books', container: 'shelves' },
        { item: 'eggs', container: 'boxes' },
        { item: 'stickers', container: 'sheets' }
    ];
    const context = randomChoice(contexts);

    const text = `There are ${groups} ${context.container} with ${multiplier} ${context.item} in each ${context.container.slice(0, -1)}. How many ${context.item} altogether?`;

    return {
        text,
        answer,
        working: `${groups} × ${multiplier} = ${answer}`,
        operation: 'equal_groups',
        values: { groups, perGroup: multiplier, total: answer }
    };
}

/**
 * Generate array multiplication problem
 * Example: "An array has 3 rows with 5 items in each row. How many items in total?"
 */
export function generateArrayMultiplication(tables, maxProduct) {
    const rows = randomChoice(tables);
    const maxCols = Math.floor(maxProduct / rows);
    const cols = randomInt(2, Math.min(maxCols, 10));
    const answer = rows * cols;

    const items = ['dots', 'squares', 'circles', 'stars', 'counters'];
    const item = randomChoice(items);

    const text = `An array has ${rows} rows with ${cols} ${item} in each row. How many ${item} in total?`;

    return {
        text,
        answer,
        working: `${rows} × ${cols} = ${answer}`,
        operation: 'array_multiplication',
        values: { rows, cols, total: answer }
    };
}

/**
 * Generate sharing division problem
 * Example: "Share 12 apples equally between 3 people. How many does each person get?"
 */
export function generateSharing(tables, maxProduct, exactOnly = true) {
    const divisor = randomChoice(tables);
    const quotient = randomInt(1, Math.floor(maxProduct / divisor));
    let dividend = divisor * quotient;
    let remainder = 0;

    if (!exactOnly && Math.random() < 0.3) {
        remainder = randomInt(1, divisor - 1);
        dividend += remainder;
    }

    const contexts = [
        { item: 'apples', shareWith: 'people' },
        { item: 'sweets', shareWith: 'children' },
        { item: 'pencils', shareWith: 'students' },
        { item: 'cookies', shareWith: 'friends' },
        { item: 'stickers', shareWith: 'people' }
    ];
    const context = randomChoice(contexts);

    let text, answerText;
    if (remainder === 0) {
        text = `Share ${dividend} ${context.item} equally between ${divisor} ${context.shareWith}. How many does each person get?`;
        answerText = quotient.toString();
    } else {
        text = `Share ${dividend} ${context.item} equally between ${divisor} ${context.shareWith}. How many does each person get? (Any remainder can be ignored)`;
        answerText = quotient.toString();
    }

    return {
        text,
        answer: answerText,
        working: `${dividend} ÷ ${divisor} = ${quotient}${remainder > 0 ? ` remainder ${remainder}` : ''}`,
        operation: 'sharing',
        values: { total: dividend, groups: divisor, perGroup: quotient, remainder }
    };
}

/**
 * Generate grouping division problem
 * Example: "There are 15 apples. Put them into groups of 3. How many groups?"
 */
export function generateGrouping(tables, maxProduct) {
    const itemsPerGroup = randomChoice(tables);
    const groups = randomInt(2, Math.floor(maxProduct / itemsPerGroup));
    const total = groups * itemsPerGroup;

    const items = ['apples', 'pencils', 'books', 'sweets', 'marbles'];
    const item = randomChoice(items);

    const text = `There are ${total} ${item}. Put them into groups of ${itemsPerGroup}. How many groups?`;

    return {
        text,
        answer: groups,
        working: `${total} ÷ ${itemsPerGroup} = ${groups}`,
        operation: 'grouping',
        values: { total, itemsPerGroup, groups }
    };
}

/**
 * Generate repeated addition problem
 * Example: "Calculate: 5 + 5 + 5 + 5"
 */
export function generateRepeatedAddition(tables, maxProduct) {
    const addend = randomChoice(tables);
    const maxRepeats = Math.floor(maxProduct / addend);
    const repeats = randomInt(2, Math.min(maxRepeats, 6));
    const answer = addend * repeats;

    const addends = Array(repeats).fill(addend);
    const text = `Calculate: ${addends.join(' + ')}`;

    return {
        text,
        answer,
        working: `${repeats} × ${addend} = ${answer}`,
        operation: 'repeated_addition',
        values: { addend, repeats, answer }
    };
}

/**
 * Generate array division problem
 * Example: "12 items are arranged in 3 rows. How many items in each row?"
 */
export function generateArrayDivision(tables, maxProduct) {
    const rows = randomChoice(tables);
    const cols = randomInt(2, Math.floor(maxProduct / rows));
    const total = rows * cols;

    const items = ['items', 'dots', 'squares', 'stars'];
    const item = randomChoice(items);

    const text = `${total} ${item} are arranged in ${rows} equal rows. How many ${item} in each row?`;

    return {
        text,
        answer: cols,
        working: `${total} ÷ ${rows} = ${cols}`,
        operation: 'array_division',
        values: { total, rows, cols }
    };
}

// ============================================================================
// COMMUTATIVE PROPERTY (Y2)
// ============================================================================

/**
 * Generate commutative multiplication question
 * Example: "True or false: 3 × 5 = 5 × 3"
 */
export function generateCommutativeMultiplication(tables) {
    const a = randomChoice(tables);
    const b = randomChoice(tables.filter(x => x !== a));

    const text = `True or false: ${a} × ${b} = ${b} × ${a}`;
    const answer = 'true';
    const working = `Both equal ${a * b}. Multiplication is commutative.`;

    return { text, answer, working, operation: 'commutative_mult' };
}

/**
 * Generate commutative addition question
 */
export function generateCommutativeAddition(maxValue) {
    const a = randomInt(5, maxValue / 2);
    const b = randomInt(5, maxValue / 2);

    const text = `True or false: ${a} + ${b} = ${b} + ${a}`;
    const answer = 'true';
    const working = `Both equal ${a + b}. Addition is commutative.`;

    return { text, answer, working, operation: 'commutative_add' };
}

/**
 * Generate non-commutative subtraction question
 * Example: "Does 10 - 3 = 3 - 10? Why not?"
 */
export function generateNonCommutativeSubtraction(maxValue) {
    const a = randomInt(10, maxValue);
    const b = randomInt(5, a - 1);

    const text = `True or false: ${a} - ${b} = ${b} - ${a}`;
    const answer = 'false';
    const working = `${a} - ${b} = ${a - b}, but ${b} - ${a} = ${b - a}. Subtraction is NOT commutative.`;

    return { text, answer, working, operation: 'non_commutative_sub' };
}

/**
 * Generate non-commutative division question
 */
export function generateNonCommutativeDivision(tables) {
    const divisor = randomChoice(tables);
    const quotient = randomChoice(tables.filter(x => x !== divisor));
    const dividend = divisor * quotient;

    const text = `True or false: ${dividend} ÷ ${divisor} = ${divisor} ÷ ${dividend}`;
    const answer = 'false';
    const working = `${dividend} ÷ ${divisor} = ${quotient}, but ${divisor} ÷ ${dividend} = ${divisor / dividend}. Division is NOT commutative.`;

    return { text, answer, working, operation: 'non_commutative_div' };
}

// ============================================================================
// SCALING PROBLEMS (Y3-4)
// ============================================================================

/**
 * Generate integer scaling problem
 * Example: "One book costs £4. How much do 5 books cost?"
 */
export function generateIntegerScaling(scalingFactors, maxProduct) {
    const unitCost = randomInt(2, Math.floor(maxProduct / Math.max(...scalingFactors)));
    const scaleFactor = randomChoice(scalingFactors);
    const answer = unitCost * scaleFactor;

    const contexts = [
        { item: 'book', unit: '£' },
        { item: 'pencil', unit: 'p' },
        { item: 'apple', unit: 'p' },
        { item: 'ticket', unit: '£' },
        { item: 'toy', unit: '£' }
    ];
    const context = randomChoice(contexts);

    const text = `One ${context.item} costs ${context.unit}${unitCost}. How much do ${scaleFactor} ${context.item}s cost?`;

    return {
        text,
        answer,
        working: `${unitCost} × ${scaleFactor} = ${answer}`,
        operation: 'integer_scaling',
        values: { unitCost, scaleFactor, totalCost: answer }
    };
}

/**
 * Generate simple correspondence problem
 * Example: "One box has 5 pencils. How many pencils in 4 boxes?"
 */
export function generateSimpleCorrespondence(correspondenceRatios, maxProduct) {
    const [n, m] = randomChoice(correspondenceRatios);
    const maxMultiplier = Math.floor(maxProduct / m);
    const multiplier = randomInt(2, Math.min(maxMultiplier, 10));
    const answer = multiplier * m;

    const contexts = [
        { container: 'box', item: 'pencils' },
        { container: 'bag', item: 'apples' },
        { container: 'pack', item: 'cards' },
        { container: 'shelf', item: 'books' },
        { container: 'carton', item: 'eggs' }
    ];
    const context = randomChoice(contexts);

    const text = `${n === 1 ? 'One' : n} ${context.container}${n === 1 ? '' : 'es'} ${n === 1 ? 'has' : 'have'} ${m} ${context.item}. How many ${context.item} in ${multiplier} ${context.container}es?`;

    return {
        text,
        answer,
        working: `${m} × ${multiplier} = ${answer}`,
        operation: 'simple_correspondence',
        values: { n, m, multiplier, answer }
    };
}

/**
 * Generate complex correspondence problem (requires finding unit rate first)
 * Example: "3 boxes have 15 pencils. How many pencils in 7 boxes?"
 */
export function generateComplexCorrespondence(correspondenceRatios, maxProduct) {
    const [n, m] = randomChoice(correspondenceRatios.filter(([a, b]) => b % a === 0)); // Ensure exact division
    const perUnit = m / n;
    const maxFinalUnits = Math.floor(maxProduct / perUnit);
    const finalUnits = randomInt(n + 1, Math.min(maxFinalUnits, 15));
    const answer = finalUnits * perUnit;

    const contexts = [
        { container: 'box', item: 'pencils' },
        { container: 'bag', item: 'marbles' },
        { container: 'pack', item: 'stickers' },
        { container: 'crate', item: 'bottles' }
    ];
    const context = randomChoice(contexts);

    const text = `${n} ${context.container}${n === 1 ? '' : 'es'} have ${m} ${context.item}. How many ${context.item} in ${finalUnits} ${context.container}es?`;

    return {
        text,
        answer,
        working: `${m} ÷ ${n} = ${perUnit} per ${context.container}. ${finalUnits} × ${perUnit} = ${answer}`,
        operation: 'complex_correspondence',
        values: { n, m, perUnit, finalUnits, answer }
    };
}

// ============================================================================
// DISTRIBUTIVE LAW (Y4)
// ============================================================================

/**
 * Generate simple distributive law problem
 * Example: "Calculate 14 × 3 using (10 × 3) + (4 × 3)"
 */
export function generateDistributiveSimple(twoDigitRange, oneDigitMultipliers) {
    const twoDigit = randomInt(twoDigitRange[0], twoDigitRange[1]);
    const oneDigit = randomChoice(oneDigitMultipliers);

    const tens = Math.floor(twoDigit / 10) * 10;
    const ones = twoDigit % 10;
    const answer = twoDigit * oneDigit;

    const text = `Calculate ${twoDigit} × ${oneDigit} using the distributive law: (${tens} × ${oneDigit}) + (${ones} × ${oneDigit})`;

    return {
        text,
        answer,
        working: `(${tens} × ${oneDigit}) + (${ones} × ${oneDigit}) = ${tens * oneDigit} + ${ones * oneDigit} = ${answer}`,
        operation: 'distributive_simple',
        values: { twoDigit, oneDigit, tens, ones, answer }
    };
}

/**
 * Generate distributive law application in word problem
 * Example: "A school has 14 classes with 3 computers in each. How many computers?"
 */
export function generateDistributiveApplication(twoDigitRange, oneDigitMultipliers) {
    const groups = randomInt(twoDigitRange[0], twoDigitRange[1]);
    const perGroup = randomChoice(oneDigitMultipliers);
    const answer = groups * perGroup;

    const contexts = [
        { group: 'classes', item: 'computers' },
        { group: 'boxes', item: 'pens' },
        { group: 'shelves', item: 'books' },
        { group: 'teams', item: 'players' }
    ];
    const context = randomChoice(contexts);

    const tens = Math.floor(groups / 10) * 10;
    const ones = groups % 10;

    const text = `A school has ${groups} ${context.group} with ${perGroup} ${context.item} in each. How many ${context.item} in total?`;

    return {
        text,
        answer,
        working: `${groups} × ${perGroup} = (${tens} + ${ones}) × ${perGroup} = ${tens * perGroup} + ${ones * perGroup} = ${answer}`,
        operation: 'distributive_application',
        values: { groups, perGroup, answer }
    };
}

/**
 * Generate multiply then add/subtract problem
 * Example: "Calculate (4 × 7) + 5"
 */
export function generateMultiplyThenAdd(tables, maxProduct, isSubtract = false) {
    const a = randomChoice(tables);
    const b = randomChoice(tables);
    const product = a * b;

    const addend = randomInt(1, Math.min(20, maxProduct - product));
    const answer = isSubtract ? product - addend : product + addend;
    const operator = isSubtract ? '-' : '+';

    const text = `Calculate (${a} × ${b}) ${operator} ${addend}`;

    return {
        text,
        answer,
        working: `${a} × ${b} = ${product}, ${product} ${operator} ${addend} = ${answer}`,
        operation: isSubtract ? 'multiply_then_subtract' : 'multiply_then_add',
        values: { a, b, product, addend, answer }
    };
}

// ============================================================================
// FACTORS AND MULTIPLES (Y5)
// ============================================================================

/**
 * Generate factor problem
 * Example: "List all factors of 24"
 */
export function generateFactorProblem(factorRange) {
    const number = randomInt(factorRange[0] + 5, factorRange[1]);
    const factors = [];

    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }

    const questionTypes = [
        {
            text: `How many factors does ${number} have?`,
            answer: factors.length.toString(),
            working: `Factors of ${number}: ${factors.join(', ')}`
        },
        {
            text: `What is the largest factor of ${number} (other than ${number} itself)?`,
            answer: factors[factors.length - 2].toString(),
            working: `Factors: ${factors.join(', ')}. Second largest is ${factors[factors.length - 2]}`
        }
    ];

    return randomChoice(questionTypes);
}

/**
 * Generate multiple problem
 * Example: "What is the 5th multiple of 7?"
 */
export function generateMultipleProblem(maxValue) {
    const base = randomInt(2, 12);
    const position = randomInt(3, 10);
    const answer = base * position;

    if (answer > maxValue) {
        // Adjust position if answer exceeds max
        const adjustedPosition = Math.floor(maxValue / base);
        return {
            text: `What is the ${adjustedPosition}${getOrdinalSuffix(adjustedPosition)} multiple of ${base}?`,
            answer: (base * adjustedPosition).toString(),
            working: `${base} × ${adjustedPosition} = ${base * adjustedPosition}`,
            operation: 'multiple_problems'
        };
    }

    const text = `What is the ${position}${getOrdinalSuffix(position)} multiple of ${base}?`;

    return {
        text,
        answer: answer.toString(),
        working: `${base} × ${position} = ${answer}`,
        operation: 'multiple_problems'
    };
}

/**
 * Generate square/cube problem
 * Example: "A square has area 49 cm². What is the side length?"
 */
export function generateSquareCubeProblem(squareRange, cubeRange) {
    const useSquare = Math.random() < 0.7; // 70% squares, 30% cubes

    if (useSquare) {
        const side = randomInt(squareRange[0], squareRange[1]);
        const area = side * side;

        const text = `A square has area ${area} cm². What is the side length?`;

        return {
            text,
            answer: side.toString(),
            working: `√${area} = ${side}`,
            operation: 'square_cube_problems',
            values: { area, side, type: 'square' }
        };
    } else {
        const side = randomInt(cubeRange[0], cubeRange[1]);
        const volume = side * side * side;

        const text = `A cube has volume ${volume} cm³. What is the edge length?`;

        return {
            text,
            answer: side.toString(),
            working: `∛${volume} = ${side}`,
            operation: 'square_cube_problems',
            values: { volume, side, type: 'cube' }
        };
    }
}

/**
 * Generate simple rate problem
 * Example: "A car travels at 60 km/h. How far in 3 hours?"
 */
export function generateSimpleRate(rateUnits, maxValue) {
    const [unit1, unit2] = randomChoice(rateUnits);
    const rate = randomInt(10, 100);
    const time = randomInt(2, 10);
    const distance = rate * time;

    if (distance > maxValue) {
        const adjustedTime = Math.floor(maxValue / rate);
        return {
            text: `A car travels at ${rate} ${unit1}/${unit2}. How far does it travel in ${adjustedTime} ${unit2}s?`,
            answer: (rate * adjustedTime).toString(),
            working: `${rate} × ${adjustedTime} = ${rate * adjustedTime} ${unit1}`,
            operation: 'simple_rate'
        };
    }

    const text = `A car travels at ${rate} ${unit1}/${unit2}. How far does it travel in ${time} ${unit2}s?`;

    return {
        text,
        answer: distance.toString(),
        working: `${rate} × ${time} = ${distance} ${unit1}`,
        operation: 'simple_rate',
        values: { rate, time, distance, unit1, unit2 }
    };
}

/**
 * Generate fraction scaling problem
 * Example: "Find 1/3 of 24"
 */
export function generateFractionScaling(simpleFractions, maxValue) {
    const fractionStr = randomChoice(simpleFractions);
    const [num, denom] = fractionStr.split('/').map(Number);

    // Ensure result is whole number
    const wholeResult = randomInt(1, Math.floor(maxValue / num));
    const startValue = wholeResult * denom;

    const text = `Find ${fractionStr} of ${startValue}`;
    const answer = wholeResult * num;

    return {
        text,
        answer: answer.toString(),
        working: `${startValue} ÷ ${denom} = ${wholeResult}, ${wholeResult} × ${num} = ${answer}`,
        operation: 'fraction_scaling',
        values: { fraction: fractionStr, startValue, answer }
    };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(n) {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

/**
 * Generate strategic distractors for multiplication/division problems
 */
export function generateMultDivDistractors(correctAnswer, problemData, operation) {
    const distractors = new Set();

    if (operation === 'multiplication' || operation === 'equal_groups' || operation === 'array_multiplication') {
        const { a, b } = problemData.values || {};
        if (a && b) {
            // Common error: added instead of multiplied
            distractors.add(a + b);
            // Off by one multiplication
            distractors.add(a * (b + 1));
            distractors.add(a * (b - 1));
        }
    } else if (operation === 'division' || operation === 'sharing' || operation === 'grouping') {
        const { dividend, divisor } = problemData.values || {};
        if (dividend && divisor) {
            // Wrong operation
            distractors.add(dividend - divisor);
            // Reversed division
            if (dividend > 0) distractors.add(Math.floor(divisor / dividend));
            // Off by one
            if (correctAnswer > 0) {
                distractors.add(correctAnswer + 1);
                distractors.add(correctAnswer - 1);
            }
        }
    }

    // Fill remaining with nearby numbers
    while (distractors.size < 3) {
        const distractor = randomInt(Math.max(1, correctAnswer - 5), correctAnswer + 5);
        if (distractor !== correctAnswer && distractor > 0) {
            distractors.add(distractor);
        }
    }

    return Array.from(distractors).slice(0, 3);
}

```
--- END FILE: src\generators\helpers\C08_propertyHelpers.js ---

--- START FILE: src\generators\helpers\contextualRanges.js ---
```javascript
/**
 * Contextual Ranges Helper
 *
 * Provides realistic value ranges for different objects and contexts
 * to ensure measurement questions use appropriate scales.
 *
 * This prevents unrealistic scenarios like:
 * - Ribbons measured in kilometres
 * - Pencils longer than a metre
 * - Books weighing multiple kilograms
 */

/**
 * Realistic ranges for common objects by measurement type
 * Each entry defines min/max values and appropriate units
 */
export const CONTEXTUAL_RANGES = {
    length: {
        // Small objects (cm range)
        'pencil': { min: 10, max: 25, unit: 'cm', preferredUnit: 'cm' },
        'eraser': { min: 2, max: 6, unit: 'cm', preferredUnit: 'cm' },
        'crayon': { min: 8, max: 12, unit: 'cm', preferredUnit: 'cm' },
        'book': { min: 15, max: 35, unit: 'cm', preferredUnit: 'cm' },
        'ruler': { min: 15, max: 30, unit: 'cm', preferredUnit: 'cm' },
        'ribbon': { min: 20, max: 200, unit: 'cm', preferredUnit: 'cm' },
        'string': { min: 30, max: 300, unit: 'cm', preferredUnit: 'cm' },
        'shoelace': { min: 40, max: 120, unit: 'cm', preferredUnit: 'cm' },
        'finger': { min: 5, max: 10, unit: 'cm', preferredUnit: 'cm' },
        'hand span': { min: 10, max: 20, unit: 'cm', preferredUnit: 'cm' },

        // Medium objects (cm to m range)
        'desk': { min: 60, max: 150, unit: 'cm', preferredUnit: 'cm' },
        'table': { min: 80, max: 200, unit: 'cm', preferredUnit: 'cm' },
        'door': { min: 180, max: 220, unit: 'cm', preferredUnit: 'cm' },
        'rope': { min: 100, max: 500, unit: 'cm', preferredUnit: 'cm' },
        'garden path': { min: 2, max: 20, unit: 'm', preferredUnit: 'm' },
        'room width': { min: 2, max: 6, unit: 'm', preferredUnit: 'm' },
        'room length': { min: 3, max: 8, unit: 'm', preferredUnit: 'm' },
        'corridor': { min: 5, max: 30, unit: 'm', preferredUnit: 'm' },

        // Large objects (m to km range)
        'car': { min: 3, max: 5, unit: 'm', preferredUnit: 'm' },
        'bus': { min: 8, max: 15, unit: 'm', preferredUnit: 'm' },
        'building height': { min: 5, max: 50, unit: 'm', preferredUnit: 'm' },
        'playground': { min: 20, max: 100, unit: 'm', preferredUnit: 'm' },
        'football pitch': { min: 90, max: 120, unit: 'm', preferredUnit: 'm' },
        'park': { min: 100, max: 1000, unit: 'm', preferredUnit: 'm' },
        'distance to shop': { min: 200, max: 2000, unit: 'm', preferredUnit: 'm' },
        'walk to school': { min: 500, max: 3000, unit: 'm', preferredUnit: 'm' },
        'village': { min: 1, max: 5, unit: 'km', preferredUnit: 'km' },
        'town': { min: 2, max: 10, unit: 'km', preferredUnit: 'km' }
    },

    mass: {
        // Very light objects (g range, < 50g)
        'coin': { min: 3, max: 10, unit: 'g', preferredUnit: 'g' },
        'feather': { min: 1, max: 3, unit: 'g', preferredUnit: 'g' },
        'paper clip': { min: 1, max: 2, unit: 'g', preferredUnit: 'g' },
        'pencil': { min: 5, max: 15, unit: 'g', preferredUnit: 'g' },
        'eraser': { min: 10, max: 30, unit: 'g', preferredUnit: 'g' },
        'letter': { min: 20, max: 50, unit: 'g', preferredUnit: 'g' },

        // Light objects (g range, 50-500g)
        'apple': { min: 100, max: 250, unit: 'g', preferredUnit: 'g' },
        'orange': { min: 100, max: 300, unit: 'g', preferredUnit: 'g' },
        'banana': { min: 100, max: 200, unit: 'g', preferredUnit: 'g' },
        'book': { min: 200, max: 600, unit: 'g', preferredUnit: 'g' },
        'textbook': { min: 400, max: 800, unit: 'g', preferredUnit: 'g' },
        'toy car': { min: 50, max: 200, unit: 'g', preferredUnit: 'g' },

        // Medium objects (g to kg range, 500g-5kg)
        'bag of sugar': { min: 1, max: 2, unit: 'kg', preferredUnit: 'kg' },
        'bag of flour': { min: 1, max: 2, unit: 'kg', preferredUnit: 'kg' },
        'laptop': { min: 1, max: 3, unit: 'kg', preferredUnit: 'kg' },
        'watermelon': { min: 2, max: 8, unit: 'kg', preferredUnit: 'kg' },
        'school bag': { min: 2, max: 6, unit: 'kg', preferredUnit: 'kg' },
        'cat': { min: 3, max: 7, unit: 'kg', preferredUnit: 'kg' },
        'dog': { min: 5, max: 40, unit: 'kg', preferredUnit: 'kg' },

        // Heavy objects (kg range, > 5kg)
        'bag of apples': { min: 1, max: 3, unit: 'kg', preferredUnit: 'kg' },
        'box of books': { min: 5, max: 20, unit: 'kg', preferredUnit: 'kg' },
        'parcel': { min: 1, max: 10, unit: 'kg', preferredUnit: 'kg' },
        'suitcase': { min: 10, max: 30, unit: 'kg', preferredUnit: 'kg' },
        'child': { min: 15, max: 50, unit: 'kg', preferredUnit: 'kg' },
        'adult': { min: 50, max: 100, unit: 'kg', preferredUnit: 'kg' },
        'bicycle': { min: 8, max: 15, unit: 'kg', preferredUnit: 'kg' }
    },

    capacity: {
        // Very small containers (ml range, < 100ml)
        'spoon': { min: 10, max: 20, unit: 'ml', preferredUnit: 'ml' },
        'teaspoon': { min: 5, max: 5, unit: 'ml', preferredUnit: 'ml' },
        'tablespoon': { min: 15, max: 15, unit: 'ml', preferredUnit: 'ml' },
        'egg cup': { min: 40, max: 60, unit: 'ml', preferredUnit: 'ml' },

        // Small containers (ml range, 100-1000ml)
        'cup': { min: 200, max: 300, unit: 'ml', preferredUnit: 'ml' },
        'mug': { min: 250, max: 400, unit: 'ml', preferredUnit: 'ml' },
        'glass': { min: 200, max: 350, unit: 'ml', preferredUnit: 'ml' },
        'water bottle': { min: 500, max: 1000, unit: 'ml', preferredUnit: 'ml' },
        'bottle': { min: 250, max: 1000, unit: 'ml', preferredUnit: 'ml' },
        'juice carton': { min: 200, max: 1000, unit: 'ml', preferredUnit: 'ml' },
        'can': { min: 330, max: 500, unit: 'ml', preferredUnit: 'ml' },

        // Medium containers (l range, 1-20l)
        'jug': { min: 1, max: 3, unit: 'l', preferredUnit: 'l' },
        'teapot': { min: 1, max: 2, unit: 'l', preferredUnit: 'l' },
        'kettle': { min: 1, max: 2, unit: 'l', preferredUnit: 'l' },
        'bucket': { min: 5, max: 15, unit: 'l', preferredUnit: 'l' },
        'watering can': { min: 3, max: 10, unit: 'l', preferredUnit: 'l' },
        'fish tank': { min: 10, max: 100, unit: 'l', preferredUnit: 'l' },

        // Large containers (l range, > 20l)
        'bath': { min: 80, max: 200, unit: 'l', preferredUnit: 'l' },
        'paddling pool': { min: 100, max: 500, unit: 'l', preferredUnit: 'l' },
        'water tank': { min: 50, max: 300, unit: 'l', preferredUnit: 'l' },
        'swimming pool': { min: 20000, max: 80000, unit: 'l', preferredUnit: 'l' },
        'pond': { min: 500, max: 5000, unit: 'l', preferredUnit: 'l' }
    }
};

/**
 * Get a random value within the realistic range for an object
 * @param {string} object - The object name (e.g., 'pencil', 'ribbon')
 * @param {string} measureType - The measurement type ('length', 'mass', 'capacity')
 * @returns {Object} { value, unit, object } or null if not found
 */
export function getRealisticValue(object, measureType) {
    const objectData = CONTEXTUAL_RANGES[measureType]?.[object];

    if (!objectData) {
        return null;
    }

    const { min, max, unit } = objectData;
    const value = Math.floor(Math.random() * (max - min + 1)) + min;

    return {
        value,
        unit,
        object
    };
}

/**
 * Get all available objects for a measurement type
 * @param {string} measureType - The measurement type ('length', 'mass', 'capacity')
 * @returns {Array<string>} Array of object names
 */
export function getAvailableObjects(measureType) {
    return Object.keys(CONTEXTUAL_RANGES[measureType] || {});
}

/**
 * Get objects appropriate for a specific unit
 * @param {string} measureType - The measurement type
 * @param {string} unit - The unit (e.g., 'cm', 'kg', 'ml')
 * @returns {Array<string>} Array of object names appropriate for that unit
 */
export function getObjectsForUnit(measureType, unit) {
    const objects = CONTEXTUAL_RANGES[measureType] || {};
    return Object.keys(objects).filter(obj => objects[obj].preferredUnit === unit);
}

/**
 * Generate two different objects with realistic values in the same or different units
 * @param {string} measureType - The measurement type
 * @param {string} unit1 - First unit (optional, will choose appropriate unit)
 * @param {string} unit2 - Second unit (optional, will choose appropriate unit)
 * @returns {Object} { object1, value1, unit1, object2, value2, unit2 }
 */
export function generateComparisonPair(measureType, unit1 = null, unit2 = null) {
    const allObjects = getAvailableObjects(measureType);

    if (allObjects.length < 2) {
        return null;
    }

    // If units specified, filter objects for those units
    let availableObjects1 = unit1 ? getObjectsForUnit(measureType, unit1) : allObjects;
    let availableObjects2 = unit2 ? getObjectsForUnit(measureType, unit2) : allObjects;

    // Ensure we have options
    if (availableObjects1.length === 0) availableObjects1 = allObjects;
    if (availableObjects2.length === 0) availableObjects2 = allObjects;

    // Pick two different objects
    const object1 = availableObjects1[Math.floor(Math.random() * availableObjects1.length)];
    let object2 = availableObjects2[Math.floor(Math.random() * availableObjects2.length)];

    // Ensure they're different
    let attempts = 0;
    while (object1 === object2 && attempts < 10) {
        object2 = availableObjects2[Math.floor(Math.random() * availableObjects2.length)];
        attempts++;
    }

    const data1 = getRealisticValue(object1, measureType);
    const data2 = getRealisticValue(object2, measureType);

    if (!data1 || !data2) {
        return null;
    }

    return {
        object1: data1.object,
        value1: data1.value,
        unit1: data1.unit,
        object2: data2.object,
        value2: data2.value,
        unit2: data2.unit
    };
}

/**
 * Format an object name with appropriate article
 * @param {string} object - The object name
 * @returns {string} Object with article (e.g., "a pencil", "an apple")
 */
export function formatObjectWithArticle(object) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const firstLetter = object.charAt(0).toLowerCase();

    // Objects that don't need an article
    const noArticle = ['water', 'juice', 'milk', 'car', 'laptop'];
    if (noArticle.includes(object)) {
        return object;
    }

    const article = vowels.includes(firstLetter) ? 'an' : 'a';
    return `${article} ${object}`;
}

/**
 * Get appropriate color/descriptor adjectives for objects in comparisons
 * @param {string} object - The object name
 * @returns {Array<string>} Array of appropriate descriptors
 */
export function getObjectDescriptors(object) {
    // Generic colors that work for most objects
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white'];

    // Object-specific descriptors
    const specificDescriptors = {
        'ribbon': ['red', 'blue', 'green', 'yellow', 'silk', 'satin'],
        'pencil': ['red', 'blue', 'green', 'yellow', 'short', 'long'],
        'rope': ['thick', 'thin', 'long', 'short', 'blue', 'red'],
        'book': ['thick', 'thin', 'large', 'small', 'red', 'blue'],
        'bag': ['heavy', 'light', 'large', 'small', 'red', 'blue'],
        'box': ['heavy', 'light', 'large', 'small', 'red', 'blue']
    };

    return specificDescriptors[object] || colors;
}

```
--- END FILE: src\generators\helpers\contextualRanges.js ---

--- START FILE: src\generators\helpers\M01_measurementHelpers.js ---
```javascript
/**
 * M01 Helpers
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export function formatMeasurement(val, unit) {
    return `${val} ${unit}`;
}
export function getComparisonSymbol(a, b) {
    if (a > b) return '>';
    if (a < b) return '<';
    return '=';
}
export function convertUnit(val, from, to) {
    // Simplified conversion logic for demo
    if (from === to) return val;
    if (from === 'm' && to === 'cm') return val * 100;
    if (from === 'cm' && to === 'mm') return val * 10;
    if (from === 'kg' && to === 'g') return val * 1000;
    return val; // Fallback
}
```
--- END FILE: src\generators\helpers\M01_measurementHelpers.js ---

--- START FILE: src\generators\helpers\M04_timeHelpers.js ---
```javascript
/**
 * Time Helpers for M04 Generators
 */
export function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
export function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
export function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }

export function format12Hour(h, m) {
    const hour = h % 12 || 12;
    const min = m.toString().padStart(2, '0');
    return `${hour}:${min}`;
}

export function format24Hour(h, m) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function generateClockSVG(h, m) {
    // Placeholder for SVG generation logic
    return `[Clock showing ${h}:${m.toString().padStart(2, '0')}]`;
}

export function getTimeInWords(h, m) {
    if(m===0) return `${h} o'clock`;
    if(m===15) return `quarter past ${h}`;
    if(m===30) return `half past ${h}`;
    if(m===45) return `quarter to ${h+1}`;
    return `${m} minutes past ${h}`;
}

export const TIME_FACTS = {
    minutes_in_hour: 60,
    hours_in_day: 24,
    seconds_in_minute: 60,
    days_in_week: 7,
    days_in_year: 365
};
```
--- END FILE: src\generators\helpers\M04_timeHelpers.js ---

--- START FILE: src\generators\helpers\M09_problemHelpers.js ---
```javascript
/**
 * M09 Problem Helpers
 */
export function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
export function randomDecimal(min, max, dp) { return parseFloat((Math.random() * (max - min) + min).toFixed(dp)); }
export function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
export function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
export function roundTo(val, dp) { return Number(Math.round(val + "e" + dp) + "e-" + dp); }

export function formatMoney(val, type) {
    return type === 'decimal' ? `£${val.toFixed(2)}` : `${val}p`;
}

export function formatDecimalMeasure(val, unit, dp) {
    return `${val.toFixed(dp)}${unit}`;
}

export function generateShoppingItems(count) {
    const items = ['apple', 'book', 'pencil', 'toy', 'hat', 'ball'];
    return items.slice(0, count);
}

export function generateContext(contexts, type) {
    // Simple mock context generator
    return { subject: 'Tom', object: 'book' };
}

export function convertUnits(val, from, to) {
    // Simple conversion map
    if(from === 'km' && to === 'm') return val * 1000;
    if(from === 'kg' && to === 'g') return val * 1000;
    if(from === 'l' && to === 'ml') return val * 1000;
    return val;
}
```
--- END FILE: src\generators\helpers\M09_problemHelpers.js ---

--- START FILE: src\generators\helpers\N01_countingHelpers.js ---
```javascript
/**
 * Counting Helpers
 *
 * Shared utility functions for N01 question generators
 * (Counting in multiples)
 */

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get starting value based on start strategy
 * Updated for V2 Schema: Accepts explicit range object { min, max, strategy }
 * instead of a flat params object.
 */
export function getStartValue(config, step) {
    const { startStrategy, min, max } = config;

    if (startStrategy === 'zero_only') {
        return 0;
    } else if (startStrategy === 'zero_or_twenty') {
        // For Y1 Level 1
        return 0;
    } else if (startStrategy === 'zero_or_multiple') {
        const multiples = [0, step, step * 2, step * 3, step * 4];
        return randomChoice(multiples.filter(m => m <= max / 2));
    } else if (startStrategy === 'any') {
        // Calculate from min/max
        const range = max - min;
        const rawStart = min + randomInt(0, Math.floor(range / 2));
        return Math.floor(rawStart / step) * step;
    }

    return 0;
}

/**
 * Generate sequence array
 */
export function generateSequence(start, step, length, direction) {
    const sequence = [];
    const multiplier = direction === 'forwards' ? 1 : -1;

    for (let i = 0; i < length; i++) {
        sequence.push(start + (i * step * multiplier));
    }

    return sequence;
}

/**
 * Get single gap position for fill-in-the-blank questions
 * Used by simplified N01 modules
 */
export function getGapPosition(sequenceLength, gapPosition) {
    if (gapPosition === 'end') {
        return sequenceLength - 1;
    } else if (gapPosition === 'start') {
        return 0;
    } else if (gapPosition === 'middle') {
        return Math.floor(sequenceLength / 2);
    } else if (gapPosition === 'random') {
        return randomInt(0, sequenceLength - 1);
    }
    return 0; // Default to start if unknown position
}

/**
 * Get multiple gap positions for fill-in-the-blank questions
 * Used by N05 modules and other generators that support multiple gaps
 */
export function getGapPositions(sequenceLength, gapsCount, gapPosition) {
    const positions = [];

    if (gapPosition === 'end') {
        positions.push(sequenceLength - 1);
    } else if (gapPosition === 'start') {
        positions.push(0);
    } else if (gapPosition === 'middle') {
        positions.push(Math.floor(sequenceLength / 2));
    } else if (gapPosition === 'random') {
        // Generate unique random positions
        const available = Array.from({length: sequenceLength}, (_, i) => i);
        for (let i = 0; i < gapsCount; i++) {
            const idx = randomInt(0, available.length - 1);
            positions.push(available[idx]);
            available.splice(idx, 1);
        }
    }

    return positions.slice(0, gapsCount).sort((a, b) => a - b);
}

export default {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPosition,
    getGapPositions
};
```
--- END FILE: src\generators\helpers\N01_countingHelpers.js ---

--- START FILE: src\generators\helpers\N02_numberHelpers.js ---
```javascript
/**
 * Number Helpers
 *
 * Shared utility functions for N02 question generators
 * (Read, Write, Order and Compare Numbers)
 */

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Format number with commas (1234567 → "1,234,567")
 * Uses 'en-US' locale to ensure consistent comma formatting
 */
export function formatNumber(num) {
    return num.toLocaleString('en-US');
}

/**
 * Number to word conversion (0-100 only)
 * Returns null for numbers outside range
 */
export function numberToWord(num) {
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num < 0 || num > 100) return null;

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num === 100) return 'one hundred';

    const tenDigit = Math.floor(num / 10);
    const oneDigit = num % 10;

    if (oneDigit === 0) return tens[tenDigit];
    return `${tens[tenDigit]}-${ones[oneDigit]}`;
}

/**
 * Word to number conversion (0-100 only)
 * Returns null if word not recognized
 */
export function wordToNumber(word) {
    const wordMap = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
        'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
        'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
        'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19,
        'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
        'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90,
        'one hundred': 100, 'hundred': 100
    };

    const normalized = word.toLowerCase().trim();

    // Direct match
    if (wordMap[normalized] !== undefined) {
        return wordMap[normalized];
    }

    // Handle hyphenated numbers (e.g., "twenty-one")
    if (normalized.includes('-')) {
        const parts = normalized.split('-');
        if (parts.length === 2) {
            const tens = wordMap[parts[0]] || 0;
            const ones = wordMap[parts[1]] || 0;
            return tens + ones;
        }
    }

    return null;
}

/**
 * Round number to nearest place value
 * @param {number} num - Number to round
 * @param {number} base - Place value (10, 100, 1000, etc.)
 */
export function roundToNearest(num, base) {
    return Math.round(num / base) * base;
}

/**
 * Generate distractors for multiple choice
 * Returns array of unique distractors different from correct answer
 */
export function generateDistractors(correctAnswer, count, min, max) {
    const distractors = new Set();
    const offsets = [1, -1, 10, -10, 100, -100, 1000, -1000];

    // Try systematic offsets first
    for (const offset of offsets) {
        if (distractors.size >= count) break;
        const distractor = correctAnswer + offset;
        if (distractor !== correctAnswer && distractor >= min && distractor <= max) {
            distractors.add(distractor);
        }
    }

    // Fill remaining with random numbers
    let attempts = 0;
    while (distractors.size < count && attempts < 50) {
        const distractor = randomInt(min, max);
        if (distractor !== correctAnswer) {
            distractors.add(distractor);
        }
        attempts++;
    }

    return Array.from(distractors).slice(0, count);
}

/**
 * Compare two numbers and return symbol
 */
export function getComparisonSymbol(a, b) {
    if (a < b) return '<';
    if (a > b) return '>';
    return '=';
}

/**
 * Apply step operation (more/less)
 */
export function applyStep(num, step, direction) {
    return direction === 'more' ? num + step : num - step;
}

/**
 * Get place value of a specific digit
 * @param {number} num - The number
 * @param {string} place - 'ones', 'tens', 'hundreds', 'thousands', etc.
 */
export function getPlaceValue(num, place) {
    const placeValues = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000,
        'ten thousands': 10000,
        'hundred thousands': 100000,
        'millions': 1000000,
        'ten millions': 10000000
    };

    const divisor = placeValues[place];
    if (!divisor) return 0;

    return Math.floor((num / divisor) % 10) * divisor;
}

/**
 * Generate number within range that is NOT a multiple of base
 * (useful for rounding questions)
 */
export function generateNonMultiple(min, max, base) {
    let num;
    let attempts = 0;
    do {
        num = randomInt(min, max);
        attempts++;
    } while (num % base === 0 && attempts < 100);

    // If we couldn't find a non-multiple, force it
    if (num % base === 0) {
        const offset = randomChoice([1, -1, 2, -2]);
        num += offset;
        num = Math.max(min, Math.min(max, num));
    }

    return num;
}

/**
 * Check if number is within word conversion range (0-100)
 */
export function canConvertToWord(num) {
    return num >= 0 && num <= 100;
}

/**
 * Generate unique random numbers
 */
export function generateUniqueNumbers(count, min, max) {
    const numbers = new Set();
    let attempts = 0;

    while (numbers.size < count && attempts < 100) {
        numbers.add(randomInt(min, max));
        attempts++;
    }

    return Array.from(numbers);
}

/**
 * Sort numbers in ascending order
 */
export function sortAscending(numbers) {
    return [...numbers].sort((a, b) => a - b);
}

/**
 * Sort numbers in descending order
 */
export function sortDescending(numbers) {
    return [...numbers].sort((a, b) => b - a);
}

export default {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    wordToNumber,
    roundToNearest,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    getPlaceValue,
    generateNonMultiple,
    canConvertToWord,
    generateUniqueNumbers,
    sortAscending,
    sortDescending
};

```
--- END FILE: src\generators\helpers\N02_numberHelpers.js ---

--- START FILE: src\generators\helpers\N03_placeValueHelpers.js ---
```javascript
/**
 * Place Value and Roman Numeral Helpers
 *
 * Helper functions for N03 Place Value question generators
 */

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Format number with commas (1234567 → "1,234,567")
 * Uses 'en-US' locale to ensure consistent comma formatting
 */
export function formatNumber(num) {
    return num.toLocaleString('en-US');
}

/**
 * Get the digit at a specific place in a number
 * @param {number} num - The number
 * @param {string} place - 'ones', 'tens', 'hundreds', 'thousands', etc.
 * @returns {number} The digit at that place (0-9)
 */
export function getDigitAtPlace(num, place) {
    const placeValues = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000,
        'ten thousands': 10000,
        'hundred thousands': 100000,
        'millions': 1000000,
        'ten millions': 10000000
    };

    const divisor = placeValues[place];
    if (!divisor) return 0;

    return Math.floor((Math.abs(num) / divisor) % 10);
}

/**
 * Get the value represented by a digit at a specific place
 * @param {number} num - The number
 * @param {string} place - 'ones', 'tens', 'hundreds', etc.
 * @returns {number} The value (e.g., in 347, tens place = 40)
 */
export function getPlaceValue(num, place) {
    const placeValues = {
        'ones': 1,
        'tens': 10,
        'hundreds': 100,
        'thousands': 1000,
        'ten thousands': 10000,
        'hundred thousands': 100000,
        'millions': 1000000,
        'ten millions': 10000000
    };

    const divisor = placeValues[place];
    if (!divisor) return 0;

    return Math.floor((Math.abs(num) / divisor) % 10) * divisor;
}

/**
 * Decompose a number into place value parts
 * @param {number} num - The number to decompose
 * @param {string[]} places - Array of places to include
 * @returns {Object} Object with place names as keys and values
 */
export function decomposeNumber(num, places) {
    const result = {};
    places.forEach(place => {
        result[place] = getPlaceValue(num, place);
    });
    return result;
}

/**
 * Get expanded form of a number
 * @param {number} num - The number
 * @returns {string} E.g., "300 + 40 + 7"
 */
export function getExpandedForm(num) {
    const parts = [];
    let remaining = Math.abs(num);
    const powers = [10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];

    powers.forEach(power => {
        const digit = Math.floor(remaining / power);
        if (digit > 0) {
            parts.push(digit * power);
        }
        remaining = remaining % power;
    });

    return parts.length > 0 ? parts.join(' + ') : '0';
}

/**
 * Parse expanded form back to number
 * @param {string} expandedForm - E.g., "300 + 40 + 7"
 * @returns {number} The standard form number
 */
export function parseExpandedForm(expandedForm) {
    const parts = expandedForm.split('+').map(s => s.trim());
    return parts.reduce((sum, part) => sum + parseInt(part), 0);
}

/**
 * Generate alternative decompositions (e.g., 47 = 3 tens + 17 ones)
 * @param {number} num - The number
 * @param {string[]} places - Available places
 * @returns {Object} Alternative decomposition
 */
export function getAlternativeDecomposition(num, places) {
    // For simplicity, convert some larger place to smaller (e.g., 1 hundred = 10 tens)
    const decomp = decomposeNumber(num, places);

    // Find a place with non-zero value to "borrow" from
    const placeOrder = ['ten millions', 'millions', 'hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones'];

    for (let i = 0; i < placeOrder.length - 1; i++) {
        const currentPlace = placeOrder[i];
        const nextPlace = placeOrder[i + 1];

        if (places.includes(currentPlace) && places.includes(nextPlace) && decomp[currentPlace] > 0) {
            const alternative = { ...decomp };
            alternative[currentPlace] -= getPlaceMultiplier(currentPlace);
            alternative[nextPlace] += getPlaceMultiplier(currentPlace);
            return alternative;
        }
    }

    return decomp;
}

function getPlaceMultiplier(place) {
    const multipliers = {
        'tens': 10,
        'hundreds': 10,
        'thousands': 10,
        'ten thousands': 10,
        'hundred thousands': 10,
        'millions': 10,
        'ten millions': 10
    };
    return multipliers[place] || 1;
}

/**
 * Generate number with optional zero in specific place
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {boolean} includeZero - Whether to force a zero somewhere
 * @returns {number} Generated number
 */
export function generateNumberWithZero(min, max, includeZero) {
    if (!includeZero) {
        return randomInt(min, max);
    }

    // Generate number, then try to add a zero in a random place
    let num = randomInt(min, max);
    const numStr = String(num);
    const position = randomInt(1, numStr.length - 1); // Not first digit

    // Replace digit at position with 0
    const newNumStr = numStr.substring(0, position) + '0' + numStr.substring(position + 1);
    const newNum = parseInt(newNumStr);

    return (newNum >= min && newNum <= max) ? newNum : num;
}

/**
 * Generate distractors for multiple choice
 */
export function generateDistractors(correctAnswer, count, min, max) {
    const distractors = new Set();
    const offsets = [1, -1, 10, -10, 100, -100, 1000, -1000];

    // Try systematic offsets first
    for (const offset of offsets) {
        if (distractors.size >= count) break;
        const distractor = correctAnswer + offset;
        if (distractor !== correctAnswer && distractor >= min && distractor <= max) {
            distractors.add(distractor);
        }
    }

    // Fill remaining with random numbers
    let attempts = 0;
    while (distractors.size < count && attempts < 50) {
        const distractor = randomInt(min, max);
        if (distractor !== correctAnswer) {
            distractors.add(distractor);
        }
        attempts++;
    }

    return Array.from(distractors).slice(0, count);
}

/**
 * ROMAN NUMERAL FUNCTIONS
 */

/**
 * Convert Arabic number to Roman numeral (1-3999)
 * @param {number} num - Number to convert (1-3999)
 * @returns {string} Roman numeral
 */
export function toRoman(num) {
    if (num < 1 || num > 3999) return '';

    const romanMap = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ];

    let result = '';
    let remaining = num;

    for (const [value, symbol] of romanMap) {
        while (remaining >= value) {
            result += symbol;
            remaining -= value;
        }
    }

    return result;
}

/**
 * Convert Roman numeral to Arabic number
 * @param {string} roman - Roman numeral string
 * @returns {number} Arabic number
 */
export function fromRoman(roman) {
    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let result = 0;
    let prevValue = 0;

    // Process from right to left
    for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanValues[roman[i]];

        if (currentValue >= prevValue) {
            result += currentValue;
        } else {
            result -= currentValue;
        }

        prevValue = currentValue;
    }

    return result;
}

/**
 * Validate Roman numeral string
 * @param {string} roman - Roman numeral to validate
 * @returns {boolean} True if valid
 */
export function isValidRoman(roman) {
    // Basic validation pattern
    const pattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return pattern.test(roman);
}

/**
 * Generate Roman numeral within range
 * @param {number} min - Minimum value (Arabic)
 * @param {number} max - Maximum value (Arabic)
 * @returns {Object} { arabic: number, roman: string }
 */
export function generateRomanPair(min, max) {
    const arabic = randomInt(min, max);
    const roman = toRoman(arabic);
    return { arabic, roman };
}

/**
 * Generate Roman numeral distractors
 * @param {number} correctArabic - Correct answer in Arabic
 * @param {number} count - Number of distractors needed
 * @param {number} min - Minimum range
 * @param {number} max - Maximum range
 * @returns {string[]} Array of Roman numeral distractors
 */
export function generateRomanDistractors(correctArabic, count, min, max) {
    const arabicDistractors = generateDistractors(correctArabic, count, min, max);
    return arabicDistractors.map(n => toRoman(n));
}

/**
 * Get common historical years in range
 * @param {number} min - Minimum year
 * @param {number} max - Maximum year
 * @returns {number[]} Array of historical years
 */
export function getHistoricalYears(min, max) {
    const commonYears = [
        753,   // Founding of Rome
        1066,  // Battle of Hastings
        1215,  // Magna Carta
        1492,  // Columbus
        1588,  // Spanish Armada
        1666,  // Great Fire of London
        1776,  // American Independence
        1789,  // French Revolution
        1815,  // Waterloo
        1914,  // WWI start
        1945,  // WWII end
        1969,  // Moon landing
        2000,  // Millennium
        2012,  // Olympics
        2024   // Current
    ];

    return commonYears.filter(year => year >= min && year <= max);
}

/**
 * Format place name for display
 * @param {string} place - Internal place name
 * @returns {string} Display name
 */
export function formatPlaceName(place) {
    return place.charAt(0).toUpperCase() + place.slice(1);
}

export default {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    getExpandedForm,
    parseExpandedForm,
    getAlternativeDecomposition,
    generateNumberWithZero,
    generateDistractors,
    toRoman,
    fromRoman,
    isValidRoman,
    generateRomanPair,
    generateRomanDistractors,
    getHistoricalYears,
    formatPlaceName
};

```
--- END FILE: src\generators\helpers\N03_placeValueHelpers.js ---

--- START FILE: src\generators\helpers\N04_representationHelpers.js ---
```javascript
/**
 * Representation Helpers
 *
 * Shared utility functions for N04 question generators
 * (Identify, Represent, Estimate and Rounding)
 */

/**
 * Generate random integer in range [min, max]
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Choose random item from array
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
    return num.toLocaleString('en-US');
}

/**
 * Round number to nearest place value
 */
export function roundToNearest(num, base) {
    return Math.round(num / base) * base;
}

/**
 * Generate number that is NOT a multiple of base (for rounding questions)
 */
export function generateNonMultiple(min, max, base) {
    let num;
    let attempts = 0;
    do {
        num = randomInt(min, max);
        attempts++;
    } while (num % base === 0 && attempts < 100);

    if (num % base === 0) {
        const offset = randomChoice([1, -1, 2, -2]);
        num += offset;
        num = Math.max(min, Math.min(max, num));
    }

    return num;
}

/**
 * Generate distractors for rounding questions
 */
export function generateRoundingDistractors(number, base) {
    const rounded = roundToNearest(number, base);
    return [
        roundToNearest(number + base, base),
        roundToNearest(number - base, base),
        number,  // The original number (common mistake)
        rounded + base,
        rounded - base
    ].filter(d => d !== rounded);
}

/**
 * Describe a number line position
 * @param {number} position - The position on the number line
 * @param {number} min - Minimum value on number line
 * @param {number} max - Maximum value on number line
 * @returns {string} Description of position
 */
export function describeNumberLinePosition(position, min, max) {
    const range = max - min;
    const relativePosition = (position - min) / range;

    if (relativePosition < 0.2) return 'near the start';
    if (relativePosition < 0.4) return 'about a quarter of the way along';
    if (relativePosition < 0.6) return 'around the middle';
    if (relativePosition < 0.8) return 'about three-quarters of the way along';
    return 'near the end';
}

/**
 * Generate number line scale marks
 */
export function generateNumberLineMarks(min, max, divisions = 10) {
    const marks = [];
    const step = (max - min) / divisions;

    for (let i = 0; i <= divisions; i++) {
        marks.push(min + (i * step));
    }

    return marks;
}

/**
 * Find closest mark on number line
 */
export function findClosestMark(value, marks) {
    return marks.reduce((prev, curr) => {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
}

/**
 * Generate number line question text
 */
export function generateNumberLineText(min, max, position, showSomeMarks = true) {
    const marks = generateNumberLineMarks(min, max, 10);

    if (showSomeMarks) {
        // Show first, middle, and last marks
        const visibleMarks = [marks[0], marks[5], marks[10]];
        return `On a number line from ${formatNumber(min)} to ${formatNumber(max)}, ` +
               `with marks at ${visibleMarks.map(m => formatNumber(m)).join(', ')}, ` +
               `where would ${formatNumber(position)} be?`;
    } else {
        return `On a number line from ${formatNumber(min)} to ${formatNumber(max)}, ` +
               `where would ${formatNumber(position)} be?`;
    }
}

/**
 * Generate estimation range text
 */
export function generateEstimationText(value, ranges) {
    return `Which range best estimates ${formatNumber(value)}?`;
}

/**
 * Find which range a value falls into
 */
export function findRange(value, ranges) {
    return ranges.find(([min, max]) => value >= min && value <= max);
}

/**
 * Format range for display
 */
export function formatRange(range) {
    return `${formatNumber(range[0])} to ${formatNumber(range[1])}`;
}

/**
 * Generate place value representation
 * @param {number} num - Number to represent
 * @returns {object} Place value breakdown
 */
export function generatePlaceValueRepresentation(num) {
    const str = num.toString();
    const representation = {};

    const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'];

    for (let i = 0; i < str.length; i++) {
        const digit = parseInt(str[str.length - 1 - i]);
        const placeValue = Math.pow(10, i);
        const place = places[i];

        if (digit !== 0) {
            representation[place] = digit * placeValue;
        }
    }

    return representation;
}

/**
 * Generate partitioned number text
 */
export function generatePartitionText(num) {
    const representation = generatePlaceValueRepresentation(num);
    const parts = Object.values(representation).map(v => formatNumber(v));

    return parts.join(' + ');
}

/**
 * Generate comparison language question
 * Supports both 2-number comparisons and 3-4 number comparisons
 * @param {number|number[]} num1 - First number OR array of numbers (for most/least)
 * @param {number} num2 - Second number (only used for 2-number comparisons)
 * @param {string} word - Comparison word
 * @returns {string} Question text
 */
export function generateComparisonLanguageText(num1, num2, word) {
    // Handle array of numbers (for "most" and "least")
    if (Array.isArray(num1)) {
        const numbers = num1;
        const formattedNumbers = numbers.map(n => formatNumber(n));

        if (word === 'most') {
            if (numbers.length === 2) {
                return `Which is the most: ${formattedNumbers.join(' or ')}?`;
            } else if (numbers.length === 3) {
                return `Which number is the most: ${formattedNumbers[0]}, ${formattedNumbers[1]}, or ${formattedNumbers[2]}?`;
            } else {
                // 4 numbers
                return `Which number is the most: ${formattedNumbers[0]}, ${formattedNumbers[1]}, ${formattedNumbers[2]}, or ${formattedNumbers[3]}?`;
            }
        } else if (word === 'least') {
            if (numbers.length === 2) {
                return `Which is the least: ${formattedNumbers.join(' or ')}?`;
            } else if (numbers.length === 3) {
                return `Which number is the least: ${formattedNumbers[0]}, ${formattedNumbers[1]}, or ${formattedNumbers[2]}?`;
            } else {
                // 4 numbers
                return `Which number is the least: ${formattedNumbers[0]}, ${formattedNumbers[1]}, ${formattedNumbers[2]}, or ${formattedNumbers[3]}?`;
            }
        }
    }

    // Standard 2-number comparisons
    const phrases = {
        'equal to': `Is ${formatNumber(num1)} equal to ${formatNumber(num2)}?`,
        'more than': `Is ${formatNumber(num1)} more than ${formatNumber(num2)}?`,
        'less than': `Is ${formatNumber(num1)} less than ${formatNumber(num2)}?`,
        'fewer': `Does ${formatNumber(num1)} represent fewer than ${formatNumber(num2)}?`,
        'most': `Which is the most: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
        'least': `Which is the least: ${formatNumber(num1)} or ${formatNumber(num2)}?`
    };

    return phrases[word] || phrases['more than'];
}

/**
 * Evaluate comparison
 * Supports both 2-number comparisons and array comparisons
 * @param {number|number[]} num1 - First number OR array of numbers
 * @param {number} num2 - Second number (only used for 2-number comparisons)
 * @param {string} word - Comparison word
 * @returns {boolean|number} Result of comparison (boolean for yes/no, number for most/least)
 */
export function evaluateComparison(num1, num2, word) {
    // Handle array of numbers (for "most" and "least")
    if (Array.isArray(num1)) {
        const numbers = num1;
        if (word === 'most') {
            return Math.max(...numbers);
        } else if (word === 'least') {
            return Math.min(...numbers);
        }
    }

    // Standard 2-number comparisons
    switch(word) {
        case 'equal to': return num1 === num2;
        case 'more than': return num1 > num2;
        case 'less than': return num1 < num2;
        case 'fewer': return num1 < num2;
        case 'most': return Math.max(num1, num2);
        case 'least': return Math.min(num1, num2);
        default: return num1 > num2;
    }
}

/**
 * Generate object representation description
 */
export function describeObjectRepresentation(count, objectType) {
    const descriptions = {
        'dots': `${count} dots`,
        'stars': `${count} stars`,
        'circles': `${count} circles`,
        'blocks': `${count} blocks`,
        'tallies': `${count} tally marks`
    };

    return descriptions[objectType] || `${count} objects`;
}

/**
 * Generate estimation calculation text
 */
export function generateEstimationCalculationText(num1, num2, operation) {
    const ops = {
        'add': '+',
        'subtract': '-',
        'multiply': '×'
    };

    return `Estimate ${formatNumber(num1)} ${ops[operation]} ${formatNumber(num2)}`;
}

/**
 * Calculate rough estimate by rounding to significant figures
 */
export function calculateRoughEstimate(num1, num2, operation) {
    // Round to nearest 10, 100, or 1000 depending on size
    const roundBase1 = num1 < 100 ? 10 : num1 < 1000 ? 100 : 1000;
    const roundBase2 = num2 < 100 ? 10 : num2 < 1000 ? 100 : 1000;

    const rounded1 = roundToNearest(num1, roundBase1);
    const rounded2 = roundToNearest(num2, roundBase2);

    switch(operation) {
        case 'add': return rounded1 + rounded2;
        case 'subtract': return rounded1 - rounded2;
        case 'multiply': return rounded1 * rounded2;
        default: return rounded1 + rounded2;
    }
}

/**
 * Generate midpoint between two numbers
 */
export function calculateMidpoint(num1, num2) {
    return Math.round((num1 + num2) / 2);
}

/**
 * Generate error bounds for rounding
 * Returns [lower_bound, upper_bound]
 */
export function getErrorBounds(rounded, base) {
    const halfBase = base / 2;
    return [rounded - halfBase, rounded + halfBase];
}

/**
 * Choose appropriate rounding base for a context
 */
export function chooseAppropriateRoundingBase(context, number) {
    const contexts = {
        'population': number < 1000 ? 10 : number < 100000 ? 100 : 1000,
        'money': number < 100 ? 10 : 100,
        'distance': number < 100 ? 10 : number < 1000 ? 100 : 1000,
        'time': number < 100 ? 10 : 100,
        'general': number < 100 ? 10 : number < 1000 ? 100 : 1000
    };

    return contexts[context] || contexts['general'];
}

/**
 * Generate unique random numbers
 */
export function generateUniqueNumbers(count, min, max) {
    const numbers = new Set();
    let attempts = 0;

    while (numbers.size < count && attempts < 100) {
        numbers.add(randomInt(min, max));
        attempts++;
    }

    return Array.from(numbers);
}

export default {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    describeNumberLinePosition,
    generateNumberLineMarks,
    findClosestMark,
    generateNumberLineText,
    generateEstimationText,
    findRange,
    formatRange,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateComparisonLanguageText,
    evaluateComparison,
    describeObjectRepresentation,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    calculateMidpoint,
    getErrorBounds,
    chooseAppropriateRoundingBase,
    generateUniqueNumbers
};

```
--- END FILE: src\generators\helpers\N04_representationHelpers.js ---

--- START FILE: src\generators\helpers\N04_scenarioTemplates.js ---
```javascript
/**
 * Scenario Templates for N04 Representation Questions
 *
 * Child-friendly contextual scenarios for Year 1 students (ages 5-6)
 * Used to create engaging "most" and "least" comparison questions
 */

/**
 * Children's names for scenarios (gender-neutral mix)
 */
export const childrenNames = [
    'Ali', 'Ben', 'Cara', 'Dan', 'Emma', 'Finn', 'Grace', 'Hana',
    'Isaac', 'Jade', 'Kai', 'Lily', 'Max', 'Nora', 'Oscar', 'Pia',
    'Quinn', 'Ruby', 'Sam', 'Tara', 'Uma', 'Viv', 'Will', 'Zara'
];

/**
 * Scenario templates for "most" and "least" questions
 * Each template includes context for forming natural questions
 */
export const scenarioTemplates = [
    // Children with objects
    {
        category: 'possessions',
        items: [
            'stickers', 'pencils', 'crayons', 'books', 'toys',
            'marbles', 'badges', 'cards', 'stars', 'stamps'
        ],
        questionFormat: '{name} has {n} {item}',
        answerFormat: '{name}',
        mostQuestion: 'Who has the most {item}?',
        leastQuestion: 'Who has the least {item}?'
    },

    // Counting collections
    {
        category: 'collections',
        items: [
            'red balls', 'blue balls', 'yellow balls',
            'red apples', 'green apples', 'yellow apples',
            'red flowers', 'pink flowers', 'white flowers',
            'red blocks', 'blue blocks', 'green blocks'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which color has the most?',
        leastQuestion: 'Which color has the least?'
    },

    // Classroom scenarios
    {
        category: 'classroom',
        items: [
            'children in Class 1', 'children in Class 2', 'children in Class 3',
            'books on Shelf A', 'books on Shelf B', 'books on Shelf C',
            'chairs in Room 1', 'chairs in Room 2', 'chairs in Room 3'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    },

    // Animals
    {
        category: 'animals',
        items: [
            'ducks in the pond', 'rabbits in the field', 'birds in the tree',
            'cats', 'dogs', 'fish',
            'horses', 'sheep', 'cows'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    },

    // Food items
    {
        category: 'food',
        items: [
            'cookies on the red plate', 'cookies on the blue plate', 'cookies on the green plate',
            'sandwiches in Lunchbox A', 'sandwiches in Lunchbox B', 'sandwiches in Lunchbox C',
            'grapes in the bowl', 'strawberries in the bowl', 'blueberries in the bowl'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    },

    // Games and sports
    {
        category: 'games',
        items: [
            'points', 'goals', 'stars', 'stickers earned'
        ],
        questionFormat: '{name} scored {n} {item}',
        answerFormat: '{name}',
        mostQuestion: 'Who scored the most {item}?',
        leastQuestion: 'Who scored the least {item}?'
    },

    // Toys and play
    {
        category: 'toys',
        items: [
            'teddy bears in Box A', 'teddy bears in Box B', 'teddy bears in Box C',
            'toy cars on the shelf', 'toy trains on the shelf', 'toy planes on the shelf',
            'dolls', 'puzzles', 'games'
        ],
        questionFormat: 'There are {n} {item}',
        answerFormat: '{item}',
        mostQuestion: 'Which has the most?',
        leastQuestion: 'Which has the least?'
    }
];

/**
 * Get a random child's name
 */
export function getRandomName() {
    return childrenNames[Math.floor(Math.random() * childrenNames.length)];
}

/**
 * Get multiple unique random names
 * @param {number} count - Number of names needed (3-4)
 * @returns {string[]} Array of unique names
 */
export function getRandomNames(count) {
    const shuffled = [...childrenNames].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * Get a random scenario template
 * @returns {object} Random scenario template
 */
export function getRandomScenario() {
    return scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
}

/**
 * Get a random item from a scenario category
 * @param {object} scenario - Scenario template
 * @returns {string} Random item from the scenario
 */
export function getRandomItem(scenario) {
    return scenario.items[Math.floor(Math.random() * scenario.items.length)];
}

/**
 * Build a scenario-based "most" or "least" question
 * @param {number[]} numbers - Array of 3-4 numbers to compare
 * @param {string} questionType - 'most' or 'least'
 * @returns {object} Question object with text, options, and answer
 */
export function buildScenarioQuestion(numbers, questionType) {
    const scenario = getRandomScenario();
    const item = getRandomItem(scenario);

    // Determine subjects based on scenario category
    let subjects;
    if (scenario.category === 'possessions' || scenario.category === 'games') {
        subjects = getRandomNames(numbers.length);
    } else {
        // For collections/items, use the item variations as subjects
        // Take different colors/locations from the item description
        subjects = scenario.items.slice(0, numbers.length);
    }

    // Build the scenario description
    const descriptions = numbers.map((num, i) => {
        return scenario.questionFormat
            .replace('{n}', num)
            .replace('{item}', scenario.category === 'possessions' || scenario.category === 'games' ? item : subjects[i])
            .replace('{name}', subjects[i]);
    });

    // Build the full question text
    const questionText = descriptions.join('. ') + '. ' +
        (questionType === 'most' ? scenario.mostQuestion : scenario.leastQuestion)
            .replace('{item}', item);

    // Build options (the subjects/names/items being compared)
    const options = subjects.map((subject, i) => {
        if (scenario.category === 'possessions' || scenario.category === 'games') {
            return subject; // Return the child's name
        } else {
            return subject; // Return the item/color/location
        }
    });

    // Find the answer
    const correctIndex = questionType === 'most'
        ? numbers.indexOf(Math.max(...numbers))
        : numbers.indexOf(Math.min(...numbers));

    const answer = options[correctIndex];

    return {
        text: questionText,
        options: options,
        answer: answer,
        numbers: numbers, // Keep numbers for reference
        scenario: scenario.category
    };
}

/**
 * Build a two-way comparison question for "more than", "fewer", "less than", "equal to"
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {string} comparisonWord - 'more than', 'fewer', 'less than', or 'equal to'
 * @returns {object} Question object with text, options, and answer
 */
export function buildTwoWayComparisonQuestion(num1, num2, comparisonWord) {
    // Use possessions scenarios only (simpler for two-way comparisons)
    const possessionScenarios = scenarioTemplates.filter(
        s => s.category === 'possessions' || s.category === 'games'
    );
    const scenario = possessionScenarios[Math.floor(Math.random() * possessionScenarios.length)];
    const item = getRandomItem(scenario);
    const names = getRandomNames(2);

    // Build the scenario descriptions
    const description1 = scenario.questionFormat
        .replace('{name}', names[0])
        .replace('{n}', num1)
        .replace('{item}', item);

    const description2 = scenario.questionFormat
        .replace('{name}', names[1])
        .replace('{n}', num2)
        .replace('{item}', item);

    // Build the question based on comparison word
    let questionText, answer;

    switch(comparisonWord) {
        case 'more than':
        case 'more':
            questionText = `${description1}. ${description2}. Who has more ${item}?`;
            answer = num1 > num2 ? names[0] : names[1];
            break;

        case 'fewer':
        case 'less than':
        case 'less':
            // Use "fewer" with countable nouns
            const word = comparisonWord === 'less than' || comparisonWord === 'less' ? 'fewer' : 'fewer';
            questionText = `${description1}. ${description2}. Who has fewer ${item}?`;
            answer = num1 < num2 ? names[0] : names[1];
            break;

        case 'equal to':
        case 'same':
            questionText = `${description1}. ${description2}. Do they have the same number of ${item}?`;
            answer = num1 === num2 ? 'Yes' : 'No';
            break;

        default:
            questionText = `${description1}. ${description2}. Who has more ${item}?`;
            answer = num1 > num2 ? names[0] : names[1];
    }

    return {
        text: questionText,
        options: comparisonWord === 'equal to' || comparisonWord === 'same' ? ['Yes', 'No'] : [names[0], names[1]],
        answer: answer,
        num1: num1,
        num2: num2,
        scenario: scenario.category,
        comparisonWord: comparisonWord
    };
}

export default {
    childrenNames,
    scenarioTemplates,
    getRandomName,
    getRandomNames,
    getRandomScenario,
    getRandomItem,
    buildScenarioQuestion,
    buildTwoWayComparisonQuestion
};

```
--- END FILE: src\generators\helpers\N04_scenarioTemplates.js ---

--- START FILE: src\generators\helpers\N04_simpleVisuals.js ---
```javascript
/**
 * Simple Visual Helpers for MVP
 *
 * HTML/CSS-based visual representations that can be easily upgraded to SVG later
 */

import { formatNumber } from './N04_representationHelpers.js';

/**
 * Create a simple HTML/CSS number line
 * @param {number} min - Minimum value on number line
 * @param {number} max - Maximum value on number line
 * @param {number|null} markedPosition - Position to mark with arrow (null for no marker)
 * @param {boolean} showAllLabels - If true, show all tick labels; if false, show only start/middle/end
 * @returns {string} HTML string for number line
 */
export function createSimpleNumberLineHTML(min, max, markedPosition = null, showAllLabels = false) {
    const divisions = 10;
    const step = (max - min) / divisions;

    // Find the closest tick index to the marked position
    let markedTickIndex = null;
    if (markedPosition !== null) {
        let closestDistance = Infinity;
        for (let i = 0; i <= divisions; i++) {
            const value = min + (i * step);
            const distance = Math.abs(value - markedPosition);
            if (distance < closestDistance) {
                closestDistance = distance;
                markedTickIndex = i;
            }
        }
    }

    let html = '<div class="simple-number-line">';

    for (let i = 0; i <= divisions; i++) {
        const value = min + (i * step);
        const isMarked = markedTickIndex === i;

        // Show labels at start, middle, end, or all depending on parameter
        // BUT never show label on the marked position (to avoid giving away answer)
        const showLabel = !isMarked && (showAllLabels || i === 0 || i === divisions || i === Math.floor(divisions / 2));

        html += `
            <div class="number-line-tick ${isMarked ? 'marked' : ''}">
                ${isMarked ? '<div class="marker">▼</div>' : ''}
                ${showLabel ? `<div class="tick-label">${formatNumber(value)}</div>` : ''}
            </div>
        `;
    }

    html += '</div>';
    return html;
}

/**
 * Create simple dot/object counting visual
 * @param {number} count - Number of objects to display
 * @param {number} groupSize - Objects per group (for subitizing support)
 * @param {string} color - CSS color for dots
 * @returns {string} HTML string for dots
 */
export function createSimpleDotsHTML(count, groupSize = 5, color = '#3b82f6') {
    let html = '<div class="simple-dots-container">';

    for (let i = 0; i < count; i++) {
        // Add visual spacer after each group
        if (i > 0 && i % groupSize === 0) {
            html += '<div class="dot-spacer"></div>';
        }
        html += `<div class="simple-dot" style="background-color: ${color}"></div>`;
    }

    html += '</div>';
    return html;
}

/**
 * Create number line with a range highlighted (for "between" questions)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} rangeStart - Start of highlighted range
 * @param {number} rangeEnd - End of highlighted range
 * @returns {string} HTML string for number line with range
 */
export function createNumberLineWithRange(min, max, rangeStart, rangeEnd) {
    const divisions = 10;
    const step = (max - min) / divisions;

    let html = '<div class="simple-number-line with-range">';

    for (let i = 0; i <= divisions; i++) {
        const value = min + (i * step);
        const isInRange = value >= rangeStart && value <= rangeEnd;
        const showLabel = i === 0 || i === divisions || i === 5;

        html += `
            <div class="number-line-tick ${isInRange ? 'in-range' : ''}">
                ${showLabel ? `<div class="tick-label">${formatNumber(value)}</div>` : ''}
            </div>
        `;
    }

    html += '</div>';
    return html;
}

/**
 * Create a ten frame visualization (2x5 grid)
 * @param {number} count - Number to show (0-10)
 * @param {string} fillColor - Color for filled cells
 * @param {string} emptyColor - Color for empty cells
 * @returns {string} HTML string for ten frame
 */
export function createTenFrameHTML(count, fillColor = '#3b82f6', emptyColor = '#e5e7eb') {
    if (count < 0 || count > 10) {
        count = Math.min(10, Math.max(0, count));
    }

    let html = '<div class="ten-frame">';

    for (let i = 0; i < 10; i++) {
        const isFilled = i < count;
        const color = isFilled ? fillColor : emptyColor;
        html += `<div class="ten-frame-cell ${isFilled ? 'filled' : 'empty'}" style="background-color: ${color}"></div>`;
    }

    html += '</div>';
    return html;
}

/**
 * Create base-10 blocks representation
 * @param {number} number - Number to represent (up to 100)
 * @returns {string} HTML string for base-10 blocks
 */
export function createBase10BlocksHTML(number) {
    const tens = Math.floor(number / 10);
    const ones = number % 10;

    let html = '<div class="base10-container">';

    // Tens rods
    if (tens > 0) {
        html += '<div class="tens-group">';
        for (let i = 0; i < tens; i++) {
            html += '<div class="tens-rod"></div>';
        }
        html += '</div>';
    }

    // Ones cubes
    if (ones > 0) {
        html += '<div class="ones-group">';
        for (let i = 0; i < ones; i++) {
            html += '<div class="ones-cube"></div>';
        }
        html += '</div>';
    }

    html += '</div>';
    return html;
}

/**
 * Create tally marks representation
 * @param {number} count - Number to show
 * @returns {string} HTML string for tally marks
 */
export function createTallyMarksHTML(count) {
    const groups = Math.floor(count / 5);
    const remainder = count % 5;

    let html = '<div class="tally-marks-container">';

    // Full groups of 5
    for (let i = 0; i < groups; i++) {
        html += '<div class="tally-group">';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-line">|</span>';
        html += '<span class="tally-diagonal">/</span>';
        html += '</div>';
    }

    // Remaining marks
    if (remainder > 0) {
        html += '<div class="tally-group incomplete">';
        for (let i = 0; i < remainder; i++) {
            html += '<span class="tally-line">|</span>';
        }
        html += '</div>';
    }

    html += '</div>';
    return html;
}

export default {
    createSimpleNumberLineHTML,
    createSimpleDotsHTML,
    createNumberLineWithRange,
    createTenFrameHTML,
    createBase10BlocksHTML,
    createTallyMarksHTML
};

```
--- END FILE: src\generators\helpers\N04_simpleVisuals.js ---

--- START FILE: src\generators\helpers\scaleHelpers.js ---
```javascript
/**
 * Scale Helpers for M02 Generators
 */
export function generateHorizontalScale(max, interval, value, unit, showAllNumbers) {
    const marks = [];
    for (let i = 0; i <= max; i += interval) {
        marks.push(i);
    }
    
    // Simplified HTML representation for text output
    let visual = `|`;
    marks.forEach(m => {
        visual += `-${m === value ? '▼' : '-'}-|`;
    });
    
    return `<div class="scale-container">
        <div class="scale-visual">${visual}</div>
        <div class="scale-labels">0 ... ${max} (${unit})</div>
    </div>`;
}

export function generateVerticalScale(max, interval, value, unit, type) {
    return `<div class="vertical-scale">
        [Vertical ${type} scale from 0 to ${max} ${unit}. Level is at ${value}]
    </div>`;
}
```
--- END FILE: src\generators\helpers\scaleHelpers.js ---

--- START FILE: src\generators\helpers\visualHelpers.js ---
```javascript
/**
 * Visual Helpers - Low-Overhead Visual Representations
 *
 * Provides simple, text-based visual representations for mathematical concepts
 * following the CLAUDE.md philosophy of 90/10 solutions (90% benefit for 10% effort).
 *
 * Design Principles:
 * - Use Unicode characters and emojis for visual elements
 * - Use <pre> tags with CSS for alignment (no Canvas/SVG complexity)
 * - Pure functions returning HTML strings
 * - No state management or lifecycle complexity
 * - Accessible and print-friendly
 */

import { randomChoice } from './N02_numberHelpers.js';

/**
 * Generate a dot array visualization
 * Creates a simple array using dots (●) arranged in rows and columns
 *
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {string} HTML string with styled <pre> tag containing dot array
 *
 * @example
 * generateDotArray(3, 4) returns:
 * <pre class="visual-array">
 * ● ● ● ●
 * ● ● ● ●
 * ● ● ● ●
 * </pre>
 */
export function generateDotArray(rows, cols) {
    const lines = [];
    for (let r = 0; r < rows; r++) {
        const line = '● '.repeat(cols).trim();
        lines.push(line);
    }
    const arrayContent = lines.join('\n');
    return `<pre class="visual-array">${arrayContent}</pre>`;
}

/**
 * Generate emoji groups visualization
 * Shows equal groups using emojis, separated by spacing
 *
 * @param {number} groups - Number of groups
 * @param {number} perGroup - Items per group
 * @param {string} [emoji='🍎'] - Emoji to use (defaults to apple)
 * @returns {string} HTML string showing groups
 *
 * @example
 * generateEmojiGroups(3, 4, '🍎') returns:
 * <pre class="visual-groups">
 * 🍎 🍎 🍎 🍎    🍎 🍎 🍎 🍎    🍎 🍎 🍎 🍎
 * </pre>
 */
export function generateEmojiGroups(groups, perGroup, emoji = '🍎') {
    const groupArray = [];
    for (let g = 0; g < groups; g++) {
        const group = (emoji + ' ').repeat(perGroup).trim();
        groupArray.push(group);
    }
    const groupsContent = groupArray.join('    '); // 4 spaces between groups
    return `<pre class="visual-groups">${groupsContent}</pre>`;
}

/**
 * Generate repeated number visualization
 * Shows repeated addition visually
 *
 * @param {number} number - The number being repeated
 * @param {number} times - How many times it's repeated
 * @returns {string} HTML string showing repeated addition
 *
 * @example
 * generateRepeatedNumber(5, 4) returns:
 * <pre class="visual-repeated">
 * 5 + 5 + 5 + 5
 * </pre>
 */
export function generateRepeatedNumber(number, times) {
    const numbers = Array(times).fill(number);
    const content = numbers.join(' + ');
    return `<pre class="visual-repeated">${content}</pre>`;
}

/**
 * Generate sharing visualization
 * Shows items being shared equally among people/groups
 * Uses emojis to represent items and people
 *
 * @param {number} total - Total items to share
 * @param {number} people - Number of people/groups
 * @param {string} [itemEmoji='🍪'] - Emoji for items (defaults to cookie)
 * @returns {string} HTML string showing sharing arrangement
 *
 * @example
 * generateSharingVisualization(12, 3, '🍪') shows cookies distributed to 3 people
 */
export function generateSharingVisualization(total, people, itemEmoji = '🍪') {
    const perPerson = Math.floor(total / people);
    const lines = [];

    for (let p = 0; p < people; p++) {
        const items = (itemEmoji + ' ').repeat(perPerson).trim();
        lines.push(`👤  ${items}`);
    }

    const content = lines.join('\n');
    return `<pre class="visual-sharing">${content}</pre>`;
}

/**
 * Get a child-friendly emoji for a given context
 * Provides variety for visual representations
 *
 * @param {string} type - Type of emoji needed ('fruit', 'object', 'toy', 'food')
 * @returns {string} Emoji character
 */
export function getContextEmoji(type = 'fruit') {
    const emojiSets = {
        fruit: ['🍎', '🍊', '🍌', '🍓', '🍇'],
        object: ['⭐', '🔵', '🟢', '🟡', '🟣'],
        toy: ['🧸', '🎈', '🎁', '⚽', '🎨'],
        food: ['🍪', '🍬', '🍩', '🧁', '🍰']
    };

    const set = emojiSets[type] || emojiSets.fruit;
    return randomChoice(set);
}

/**
 * Generate simple array multiplication question with visual
 * Combines question text with visual representation
 *
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {Object} Question data with text and visual
 *
 * @example
 * Returns: {
 *   visual: '<pre>...</pre>',
 *   questionText: 'How many dots are there altogether?',
 *   answer: 12
 * }
 */
export function createArrayQuestion(rows, cols) {
    const visual = generateDotArray(rows, cols);
    const answer = rows * cols;

    return {
        visual,
        questionText: 'How many dots are there altogether?',
        answer,
        working: `${rows} × ${cols} = ${answer}`
    };
}

/**
 * Generate equal groups question with visual
 * Combines question text with emoji group visualization
 *
 * @param {number} groups - Number of groups
 * @param {number} perGroup - Items per group
 * @param {string} contextType - Type of context ('fruit', 'object', 'toy', 'food')
 * @returns {Object} Question data with text and visual
 */
export function createEqualGroupsQuestion(groups, perGroup, contextType = 'fruit') {
    const emoji = getContextEmoji(contextType);
    const visual = generateEmojiGroups(groups, perGroup, emoji);
    const answer = groups * perGroup;

    // Map emoji to word for question text
    const emojiWords = {
        '🍎': 'apples', '🍊': 'oranges', '🍌': 'bananas', '🍓': 'strawberries', '🍇': 'grapes',
        '⭐': 'stars', '🔵': 'circles', '🟢': 'circles', '🟡': 'circles', '🟣': 'circles',
        '🧸': 'bears', '🎈': 'balloons', '🎁': 'presents', '⚽': 'balls', '🎨': 'paints',
        '🍪': 'cookies', '🍬': 'sweets', '🍩': 'donuts', '🧁': 'cakes', '🍰': 'cakes'
    };

    const itemName = emojiWords[emoji] || 'items';

    return {
        visual,
        questionText: `How many ${itemName} are there altogether?`,
        answer,
        working: `${groups} × ${perGroup} = ${answer}`,
        emoji,
        itemName
    };
}

/**
 * Generate sharing question with visual
 * Shows sharing division with visual representation
 *
 * @param {number} total - Total items
 * @param {number} people - Number of people
 * @param {string} contextType - Type of context
 * @returns {Object} Question data with text and visual
 */
export function createSharingQuestion(total, people, contextType = 'food') {
    const emoji = getContextEmoji(contextType);
    const visual = generateSharingVisualization(total, people, emoji);
    const answer = Math.floor(total / people);

    const emojiWords = {
        '🍎': 'apples', '🍊': 'oranges', '🍌': 'bananas', '🍓': 'strawberries', '🍇': 'grapes',
        '⭐': 'stars', '🔵': 'circles', '🟢': 'circles', '🟡': 'circles', '🟣': 'circles',
        '🧸': 'bears', '🎈': 'balloons', '🎁': 'presents', '⚽': 'balls', '🎨': 'paints',
        '🍪': 'cookies', '🍬': 'sweets', '🍩': 'donuts', '🧁': 'cakes', '🍰': 'cakes'
    };

    const itemName = emojiWords[emoji] || 'items';

    return {
        visual,
        questionText: `How many ${itemName} does each person get?`,
        answer,
        working: `${total} ÷ ${people} = ${answer}`,
        emoji,
        itemName
    };
}

```
--- END FILE: src\generators\helpers\visualHelpers.js ---

--- START FILE: src\generators\M01_Y1_MEAS_comparison.js ---
```javascript
/**
 * M01 Y1: Comparison
 * Schema: V2
 */
import { randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const op = randomChoice(operations);
    const type = randomChoice(math.types);

    if (op === 'compare_two') {
        // Mock items based on type
        const items = type === 'length' ? ['pencil', 'ruler'] : ['feather', 'stone'];
        const q = `Which is ${type === 'length' ? 'longer' : 'heavier'}?`;
        return { text: `${q} ${items[0]} or ${items[1]}?`, type: 'multiple_choice', options: items, answer: items[1], module: 'M01_Y1_MEAS', level };
    }
    return { text: "Compare question", type: 'text_input', answer: "answer", module: 'M01_Y1_MEAS', level };
}
export default { moduleId: 'M01_Y1_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M01_Y1_MEAS_comparison.js ---

--- START FILE: src\generators\M01_Y2_MEAS_comparison.js ---
```javascript
/**
 * M01 Y2: Order Measures
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const val1 = randomInt(math.range.min, math.range.max);
    const val2 = randomInt(math.range.min, math.range.max);
    
    return {
        text: `Compare: ${val1} ___ ${val2}`,
        type: 'multiple_choice',
        options: ['>', '<', '='],
        answer: val1 > val2 ? '>' : val1 < val2 ? '<' : '=',
        module: 'M01_Y2_MEAS',
        level
    };
}
export default { moduleId: 'M01_Y2_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M01_Y2_MEAS_comparison.js ---

--- START FILE: src\generators\M01_Y3_MEAS_comparison.js ---
```javascript
/**
 * M01 Y3: Compare Units
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const unit = randomChoice(math.units[type]);
    const val = randomInt(math.ranges[unit].min, math.ranges[unit].max);
    
    return {
        text: `Is ${val}${unit} > ${(val-1)}${unit}?`,
        type: 'multiple_choice',
        options: ['Yes', 'No'],
        answer: 'Yes',
        module: 'M01_Y3_MEAS',
        level
    };
}
export default { moduleId: 'M01_Y3_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M01_Y3_MEAS_comparison.js ---

--- START FILE: src\generators\M01_Y4_MEAS_comparison.js ---
```javascript
/**
 * M01 Y4: Different Measures
 * Schema: V2
 */
import { randomChoice, randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    // Logic for Y4 comparison
    return {
        text: `Compare 10mm and 1cm`,
        type: 'multiple_choice',
        options: ['>', '<', '='],
        answer: '=',
        module: 'M01_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M01_Y4_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M01_Y4_MEAS_comparison.js ---

--- START FILE: src\generators\M02_Y1_MEAS_measure.js ---
```javascript
/**
 * M02 Y1: Scales
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const val = randomInt(0, math.scale.max);
    return {
        text: `Read scale: [0...${val}...${math.scale.max}]`,
        type: 'text_input',
        answer: val.toString(),
        module: 'M02_Y1_MEAS',
        level
    };
}
export default { moduleId: 'M02_Y1_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M02_Y1_MEAS_measure.js ---

--- START FILE: src\generators\M02_Y2_MEAS_measure.js ---
```javascript
/**
 * Year 2 Standard Units
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/M01_measurementHelpers.js';
import { generateHorizontalScale, generateVerticalScale } from './helpers/scaleHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    // Flatten params for specific logic
    const flatParams = {
        measure_types: math.types,
        units: math.units,
        ranges: math.ranges
    };

    if(operation === 'read_scale_with_units') return generateReadScale(flatParams, level);
    return generateChooseUnit(flatParams, level);
}

function generateReadScale(params, level) {
    const type = randomChoice(params.measure_types);
    const unit = params.units[type][0];
    const range = params.ranges[unit === '°C' ? 'celsius' : unit];
    const val = randomInt(range.min, range.max);
    
    const html = type === 'capacity' || type === 'temperature' 
        ? generateVerticalScale(range.max, range.interval, val, unit, type)
        : generateHorizontalScale(range.max, range.interval, val, unit, true);

    return { text: `Read the scale:\n${html}`, type: 'text_input', answer: val.toString(), hint: `Look at ${unit} marks`, module: 'M02_Y2_MEAS', level };
}

function generateChooseUnit(params, level) {
    const q = { text: "Which unit for a pencil?", ans: "cm", opts: ["cm", "m", "kg"] };
    return { text: q.text, type: 'multiple_choice', options: q.opts, answer: q.ans, module: 'M02_Y2_MEAS', level };
}

export default { moduleId: 'M02_Y2_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M02_Y2_MEAS_measure.js ---

--- START FILE: src\generators\M02_Y3_MEAS_measure.js ---
```javascript
/**
 * Year 3 Measure Precisely
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/M01_measurementHelpers.js';
import { generateHorizontalScale } from './helpers/scaleHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const unit = randomChoice(math.units[type]);
    const range = math.ranges[unit];
    const val = randomInt(range.min, range.max);

    const html = generateHorizontalScale(range.max, range.interval, val, unit, true);
    return { text: `Measure accurately:\n${html}`, type: 'text_input', answer: val.toString(), hint: `Check exact mark`, module: 'M02_Y3_MEAS', level };
}
export default { moduleId: 'M02_Y3_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M02_Y3_MEAS_measure.js ---

--- START FILE: src\generators\M02_Y4_MEAS_measure.js ---
```javascript
/**
 * Year 4 Estimate Measures
 * Schema: V2
 */
import { randomChoice, shuffle } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const type = randomChoice(math.types);
    const obj = randomChoice(math.ranges[type].objects);
    const unit = math.ranges[type].units[0];
    
    const qMap = {
        'pencil': { val: 15, opts: [15, 2, 50, 100] },
        'book': { val: 25, opts: [25, 5, 100, 1000] }
    };
    const data = qMap[obj] || { val: 10, opts: [10, 1, 100] };

    return {
        text: `Estimate the ${type} of a ${obj}`,
        type: 'multiple_choice',
        options: shuffle(data.opts.map(x => `${x}${unit}`)),
        answer: `${data.val}${unit}`,
        module: 'M02_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M02_Y4_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M02_Y4_MEAS_measure.js ---

--- START FILE: src\generators\M03_Y1_MEAS_money.js ---
```javascript
/**
 * M03 Y1: Coins
 * Schema: V2
 */
import { randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const coin = randomChoice(math.denominations);
    return {
        text: `Value of ${coin}p coin?`,
        type: 'text_input',
        answer: coin.toString(),
        module: 'M03_Y1_MEAS',
        level
    };
}
export default { moduleId: 'M03_Y1_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M03_Y1_MEAS_money.js ---

--- START FILE: src\generators\M03_Y2_MEAS_money.js ---
```javascript
/**
 * Year 2 Pounds and Pence
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const op = randomChoice(operations);

    if (op === 'combine_mixed_coins') {
        const coins = [10, 20, 50];
        const c1 = randomChoice(coins);
        const c2 = randomChoice(coins);
        const total = c1 + c2;
        return { text: `You have a ${c1}p coin and a ${c2}p coin. Total?`, type: 'text_input', answer: `${total}p`, hint: 'Add them', module: 'M03_Y2_MEAS', level };
    }
    
    // convert_pounds_pence
    const pounds = randomInt(1, 5);
    return { text: `Write £${pounds} in pence`, type: 'text_input', answer: `${pounds*100}p`, hint: '100p = £1', module: 'M03_Y2_MEAS', level };
}
export default { moduleId: 'M03_Y2_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M03_Y2_MEAS_money.js ---

--- START FILE: src\generators\M03_Y3_MEAS_money.js ---
```javascript
/**
 * Year 3 Money Consolidation
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const op = randomChoice(operations);

    if (op === 'make_amount_efficient') {
        const target = randomInt(math.target.min, math.target.max);
        return { text: `Smallest number of coins to make ${target}p?`, type: 'text_input', answer: 'varies', hint: 'Start with largest coins', module: 'M03_Y3_MEAS', level };
    }
    
    // solve_change_problems
    const cost = randomInt(20, 80);
    const pay = 100;
    return { text: `Cost ${cost}p, pay 100p. Change?`, type: 'text_input', answer: `${pay-cost}p`, hint: 'Subtract', module: 'M03_Y3_MEAS', level };
}
export default { moduleId: 'M03_Y3_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M03_Y3_MEAS_money.js ---

--- START FILE: src\generators\M04_Y1_MEAS_time.js ---
```javascript
/**
 * M04 Y1: Time
 * Schema: V2
 */
import { randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const hour = randomChoice(math.hours);
    return {
        text: `Clock shows ${hour} o'clock`,
        type: 'text_input',
        answer: `${hour}:00`,
        module: 'M04_Y1_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y1_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M04_Y1_MEAS_time.js ---

--- START FILE: src\generators\M04_Y2_MEAS_time.js ---
```javascript
/**
 * Year 2 Time
 * Schema: V2
 */
import { randomChoice } from './helpers/M04_timeHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const min = randomChoice(math.minutes);
    return {
        text: `Clock shows ${min} minutes past. What does the long hand point to?`,
        type: 'text_input',
        answer: (min/5).toString(),
        hint: `Divide minutes by 5`,
        module: 'M04_Y2_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y2_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M04_Y2_MEAS_time.js ---

--- START FILE: src\generators\M04_Y3_MEAS_time.js ---
```javascript
/**
 * Year 3 Time
 * Schema: V2
 */
import { randomChoice, format24Hour } from './helpers/M04_timeHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    
    if (math.roman) {
        return { text: "What number is IX on a clock?", type: "text_input", answer: "9", module: 'M04_Y3_MEAS', level };
    }
    
    const h = randomChoice(math.hours24 || [13, 14, 15]);
    return { text: `Write ${h}:00 in 12-hour time using p.m.`, type: "text_input", answer: `${h-12}:00 p.m.`, module: 'M04_Y3_MEAS', level };
}
export default { moduleId: 'M04_Y3_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M04_Y3_MEAS_time.js ---

--- START FILE: src\generators\M04_Y4_MEAS_time.js ---
```javascript
/**
 * Year 4 Time Conversions
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const hrs = randomInt(math.conversions.hours.min, math.conversions.hours.max);
    return {
        text: `Convert ${hrs} hours to minutes`,
        type: 'text_input',
        answer: (hrs*60).toString(),
        hint: `x 60`,
        module: 'M04_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y4_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M04_Y4_MEAS_time.js ---

--- START FILE: src\generators\M04_Y5_MEAS_time.js ---
```javascript
/**
 * Year 5 Time Problems
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const h = randomInt(1, 3);
    const m = randomInt(10, 50);
    const total = h*60 + m;
    
    return {
        text: `Film is ${total} minutes. How many hours/minutes?`,
        type: 'text_input',
        answer: `${h}h ${m}m`,
        hint: `Divide by 60`,
        module: 'M04_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M04_Y5_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M04_Y5_MEAS_time.js ---

--- START FILE: src\generators\M05_Y5_MEAS_conversions.js ---
```javascript
/**
 * M05 Y5: Metric
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const km = randomInt(math.ranges.km.min, math.ranges.km.max);
    const m = km * 1000;
    return {
        text: `Convert ${km}km to m`,
        type: 'text_input',
        answer: m.toString(),
        module: 'M05_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M05_Y5_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M05_Y5_MEAS_conversions.js ---

--- START FILE: src\generators\M06_Y4_MEAS_conversions.js ---
```javascript
/**
 * M06 Y4: Mixed
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const km = randomInt(math.ranges.km.min, math.ranges.km.max);
    return {
        text: `Convert ${km}km to m`,
        type: 'text_input',
        answer: (km*1000).toString(),
        module: 'M06_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y4_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M06_Y4_MEAS_conversions.js ---

--- START FILE: src\generators\M06_Y5_MEAS_conversions.js ---
```javascript
/**
 * Year 5 Imperial Conversions
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const inches = randomInt(math.ranges.inches.min, math.ranges.inches.max);
    const cm = inches * 2.5; // Approx
    return {
        text: `Convert ${inches} inches to cm (approx 1 inch = 2.5cm)`,
        type: 'text_input',
        answer: cm.toString(),
        hint: `Multiply by 2.5`,
        module: 'M06_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y5_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M06_Y5_MEAS_conversions.js ---

--- START FILE: src\generators\M06_Y6_MEAS_conversions.js ---
```javascript
/**
 * Year 6 Standard Conversions
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const miles = 5;
    const km = 8;
    return {
        text: `5 miles is approximately 8 km. How many km in 10 miles?`,
        type: 'text_input',
        answer: '16',
        hint: `Double it`,
        module: 'M06_Y6_MEAS',
        level
    };
}
export default { moduleId: 'M06_Y6_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M06_Y6_MEAS_conversions.js ---

--- START FILE: src\generators\M07_Y3_MEAS_perimeter.js ---
```javascript
/**
 * M07 Y3: Perimeter
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const s = randomInt(math.side.min, math.side.max);
    const unit = randomChoice(math.units);
    return {
        text: `Square side ${s}${unit}. Perimeter?`,
        type: 'text_input',
        answer: (s*4).toString(),
        module: 'M07_Y3_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y3_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M07_Y3_MEAS_perimeter.js ---

--- START FILE: src\generators\M07_Y4_MEAS_perimeter_area.js ---
```javascript
/**
 * Year 4 Perimeter/Area
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const w = 3, h = 4;
    return {
        text: `Grid is ${w} by ${h}. Count squares to find area.`,
        type: 'text_input',
        answer: (w*h).toString(),
        module: 'M07_Y4_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y4_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M07_Y4_MEAS_perimeter_area.js ---

--- START FILE: src\generators\M07_Y5_MEAS_composite_area.js ---
```javascript
/**
 * Year 5 Composite Area
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const side = randomInt(math.dim.min, math.dim.max);
    return {
        text: `Square side ${side}cm. Area?`,
        type: 'text_input',
        answer: (side*side).toString(),
        hint: `s x s`,
        module: 'M07_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y5_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M07_Y5_MEAS_composite_area.js ---

--- START FILE: src\generators\M07_Y6_MEAS_area_formulas.js ---
```javascript
/**
 * Year 6 Formulas
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const b = 10, h = 5;
    return {
        text: `Triangle base ${b}, height ${h}. Area?`,
        type: 'text_input',
        answer: (0.5 * b * h).toString(),
        hint: `0.5 x b x h`,
        module: 'M07_Y6_MEAS',
        level
    };
}
export default { moduleId: 'M07_Y6_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M07_Y6_MEAS_area_formulas.js ---

--- START FILE: src\generators\M08_Y5_MEAS_volume.js ---
```javascript
/**
 * M08 Y5: Volume
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const l = randomInt(math.dim.min, math.dim.max);
    const w = randomInt(math.dim.min, math.dim.max);
    const h = randomInt(math.dim.min, math.dim.max);
    return {
        text: `Volume of ${l}x${w}x${h} box?`,
        type: 'text_input',
        answer: (l*w*h).toString(),
        module: 'M08_Y5_MEAS',
        level
    };
}
export default { moduleId: 'M08_Y5_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M08_Y5_MEAS_volume.js ---

--- START FILE: src\generators\M08_Y6_MEAS_volume.js ---
```javascript
/**
 * Year 6 Volume
 * Schema: V2
 */
import { randomInt } from './helpers/M01_measurementHelpers.js';

export function generateQuestion(params, level) {
    const { math } = params;
    const s = randomInt(math.dim.min, math.dim.max);
    return {
        text: `Volume of cube with side ${s}cm?`,
        type: 'text_input',
        answer: (s*s*s).toString(),
        hint: `s x s x s`,
        module: 'M08_Y6_MEAS',
        level
    };
}
export default { moduleId: 'M08_Y6_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M08_Y6_MEAS_volume.js ---

--- START FILE: src\generators\M09_Y2_MEAS_money_problems.js ---
```javascript
/**
 * M09 Y2: Money Problems Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min: math.range.min,
        max: math.range.max,
        totalMax: math.totalMax,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'add_money': return generateAddMoney(flatParams, level);
        case 'subtract_money': return generateSubtractMoney(flatParams, level);
        default: return generateAddMoney(flatParams, level);
    }
}

function generateAddMoney(params, level) {
    const item1 = randomInt(params.min, params.max);
    const item2 = randomInt(params.min, params.max);
    // Ensure total doesn't exceed limit if specified
    if (params.totalMax && (item1 + item2 > params.totalMax)) {
        return generateAddMoney(params, level);
    }
    
    const answer = item1 + item2;
    const text = `A toy costs ${item1}p and a sweet costs ${item2}p. How much do they cost altogether?`;
    const options = shuffle([answer, answer+10, answer-5, item1+item2+5]);
    
    return {
        text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${item1} + ${item2}`,
        module: 'M09_Y2_MEAS',
        level
    };
}

function generateSubtractMoney(params, level) {
    const total = randomInt(params.min + 10, params.max);
    const spent = randomInt(5, total - 5);
    const answer = total - spent;
    
    const text = `You have ${total}p. You buy a sticker for ${spent}p. How much change do you have?`;
    const options = shuffle([answer, answer+5, answer-2, total]);
    
    return {
        text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${total} - ${spent}`,
        module: 'M09_Y2_MEAS',
        level
    };
}

export default { moduleId: 'M09_Y2_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M09_Y2_MEAS_money_problems.js ---

--- START FILE: src\generators\M09_Y3_MEAS_measurement_problems.js ---
```javascript
/**
 * Year 3 Measurement Problems Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    const type = randomChoice(math.types); // money or length

    if (type === 'money') {
        return generateMoneyProblem(operation, math.money, presentation, level);
    } else {
        return generateLengthProblem(operation, math.length, presentation, level);
    }
}

function generateMoneyProblem(op, config, pres, level) {
    const unit = config.unit === 'pence_only' ? 'p' : '£';
    const min = config.range[0];
    const max = config.range[1];

    if (op === 'add_measure') {
        const a = randomInt(min, max);
        const b = randomInt(min, max);
        const ans = a + b;
        return {
            text: `I buy a book for ${a}${unit} and a pen for ${b}${unit}. Total cost?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Add values`,
            module: 'M09_Y3_MEAS',
            level
        };
    } else {
        const start = randomInt(min + 20, max);
        const sub = randomInt(10, start - 10);
        const ans = start - sub;
        return {
            text: `I have ${start}${unit}. I spend ${sub}${unit}. Left?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Subtract`,
            module: 'M09_Y3_MEAS',
            level
        };
    }
}

function generateLengthProblem(op, config, pres, level) {
    const unit = config.unit;
    const min = config.range[0];
    const max = config.range[1];

    if (op === 'add_measure') {
        const a = randomInt(min, max);
        const b = randomInt(min, max);
        const ans = a + b;
        return {
            text: `Blue ribbon is ${a}${unit}. Red ribbon is ${b}${unit}. Total length?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Add lengths`,
            module: 'M09_Y3_MEAS',
            level
        };
    } else {
        const start = randomInt(min + 20, max);
        const cut = randomInt(10, start - 10);
        const ans = start - cut;
        return {
            text: `Rope is ${start}${unit}. Cut off ${cut}${unit}. Left?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `Subtract`,
            module: 'M09_Y3_MEAS',
            level
        };
    }
}

export default { moduleId: 'M09_Y3_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M09_Y3_MEAS_measurement_problems.js ---

--- START FILE: src\generators\M09_Y4_MEAS_calculate_measures.js ---
```javascript
/**
 * Year 4 Four Operations Measures Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    const type = randomChoice(math.types);

    if (operation === 'multiply_measure') {
        const mult = randomChoice(math.mult);
        
        if (type === 'money') {
            const cost = randomInt(math.money.range[0], math.money.range[1]);
            const ans = cost * mult;
            return {
                text: `One ticket costs £${cost}. How much for ${mult} tickets?`,
                type: 'text_input',
                answer: ans.toString(),
                hint: `${cost} x ${mult}`,
                module: 'M09_Y4_MEAS',
                level
            };
        } else {
            // Length
            const len = randomInt(5, 25);
            const ans = len * mult;
            return {
                text: `One tile is ${len}cm long. Length of ${mult} tiles in a row?`,
                type: 'text_input',
                answer: ans.toString(),
                hint: `${len} x ${mult}`,
                module: 'M09_Y4_MEAS',
                level
            };
        }
    } 
    
    // Divide
    if (type === 'money') {
        const itemCost = randomInt(math.money.range[0], math.money.range[1]);
        const count = randomChoice([2, 3, 4, 5]);
        const total = itemCost * count;
        return {
            text: `£${total} is shared equally among ${count} people. How much each?`,
            type: 'text_input',
            answer: itemCost.toString(),
            hint: `${total} ÷ ${count}`,
            module: 'M09_Y4_MEAS',
            level
        };
    } else {
        const len = randomInt(50, 100);
        const count = randomChoice([2, 4, 5, 10]);
        // Ensure divisible
        const total = Math.ceil(len/count) * count; 
        const ans = total / count;
        return {
            text: `Cut ${total}cm tape into ${count} equal pieces. Length of one piece?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `${total} ÷ ${count}`,
            module: 'M09_Y4_MEAS',
            level
        };
    }
}

export default { moduleId: 'M09_Y4_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M09_Y4_MEAS_calculate_measures.js ---

--- START FILE: src\generators\M09_Y5_MEAS_decimal_measures.js ---
```javascript
/**
 * Year 5 Decimal Measures Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    if (operation === 'multiply_decimal') {
        const mult = randomChoice(math.mult);
        // Generate decimal value
        const whole = randomInt(math.money.range[0], math.money.range[1]);
        const dec = randomChoice([0.25, 0.50, 0.75]);
        const val = whole + dec;
        
        const ans = val * mult;
        
        return {
            text: `Fabric costs £${val.toFixed(2)} per metre. Cost of ${mult} metres?`,
            type: 'text_input',
            answer: ans.toFixed(2),
            hint: `Multiply decimal`,
            module: 'M09_Y5_MEAS',
            level
        };
    } 
    
    // Add decimal
    const v1 = randomInt(1, 5) + randomChoice([0.1, 0.2, 0.5]);
    const v2 = randomInt(1, 5) + randomChoice([0.3, 0.4, 0.5]);
    const ans = (v1 + v2).toFixed(1);
    
    return {
        text: `Jug A: ${v1.toFixed(1)} litres. Jug B: ${v2.toFixed(1)} litres. Total?`,
        type: 'text_input',
        answer: ans,
        hint: `Align decimal points`,
        module: 'M09_Y5_MEAS',
        level
    };
}

export default { moduleId: 'M09_Y5_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M09_Y5_MEAS_decimal_measures.js ---

--- START FILE: src\generators\M09_Y6_MEAS_conversion_problems.js ---
```javascript
/**
 * Year 6 Conversion Problems Generator
 * Schema: V2
 */
import { randomInt, randomChoice } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    if (operation === 'convert_length') {
        const type = randomChoice(math.conversions.length); // e.g. km_to_m
        const range = math.range.km;
        
        // Generate a value with optional decimal
        const isDecimal = Math.random() > 0.5;
        let val = randomInt(Math.ceil(range[0]), Math.floor(range[1]));
        if (isDecimal) val += 0.5;
        
        if (type === 'km_to_m') {
            const ans = val * 1000;
            return {
                text: `A road is ${val}km long. How many metres?`,
                type: 'text_input',
                answer: ans.toString(),
                hint: `x 1000`,
                module: 'M09_Y6_MEAS',
                level
            };
        }
    }
    
    if (operation === 'convert_mass') {
        const val = randomInt(1, 5) + (Math.random() > 0.5 ? 0.5 : 0);
        const ans = val * 1000;
        return {
            text: `Bag weighs ${val}kg. Weight in grams?`,
            type: 'text_input',
            answer: ans.toString(),
            hint: `x 1000`,
            module: 'M09_Y6_MEAS',
            level
        };
    }

    // Fallback
    return { text: "Convert 1.5km to m", type: "text_input", answer: "1500", module: 'M09_Y6_MEAS', level };
}

export default { moduleId: 'M09_Y6_MEAS', generate: generateQuestion };
```
--- END FILE: src\generators\M09_Y6_MEAS_conversion_problems.js ---

--- START FILE: src\generators\N01_Y1_NPV_counting.js ---
```javascript
/**
 * Year 1 Counting in Multiples Question Generator
 * Schema: V2
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

export function generateQuestion(params, level) {
    // Destructure V2 Schema
    const {
        math: {
            range: { min, max },
            sequence: { steps, length, directions, startStrategy }
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // Pass explict config object to helper
    let start = getStartValue({ startStrategy, min, max }, step);

    // Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

    const fullSequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

    const displaySequence = fullSequence.map((num, idx) =>
        idx === gapIndex ? '__' : num.toString()
    );

    return {
        text: `What is the missing number? ${displaySequence.join(', ')}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y1_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N01_Y1_NPV_counting.js ---

--- START FILE: src\generators\N01_Y2_NPV_counting.js ---
```javascript
/**
 * Year 2 Counting in Steps Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y2_NPV - "Count in steps of 2, 3, and 5 from 0, and in tens from any number"
 * Schema: V2 (Nested Parameters)
 */

import {
    randomChoice,
    randomInt,
    getStartValue,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // 1. Destructure V2 Schema
    const {
        math: {
            range: { min, max },
            sequence: { 
                steps, 
                length, 
                directions, 
                startStrategy,
                // Specific Y2 optional parameters
                tensFromAny, 
                tensRange 
            }
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 2. Y2 Specific Logic: "tens from any number"
    let start;
    if (step === 10 && tensFromAny && tensRange) {
        // Tens from any number - allow any starting position within specific range
        start = randomInt(tensRange[0], tensRange[1]);
    } else {
        // Steps of 2, 3, 5 should start from 0 or multiples (handled by helper)
        start = getStartValue({ startStrategy, min, max }, step);
    }

    // 3. Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

    // 4. Generate sequence
    const fullSequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

    const displaySequence = fullSequence.map((num, idx) =>
        idx === gapIndex ? '__' : num.toString()
    );

    return {
        text: `What is the missing number? ${displaySequence.join(', ')}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y2_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y2_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N01_Y2_NPV_counting.js ---

--- START FILE: src\generators\N01_Y3_NPV_counting.js ---
```javascript
/**
 * Year 3 Counting from 0 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y3_NPV - "Count from 0 in multiples of 4, 8, 50 and 100"
 * Schema: V2 (Nested Parameters)
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // 1. Destructure V2 Schema
    const {
        math: {
            range: { min, max },
            sequence: { steps, length, directions, startStrategy }
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 2. Get starting value
    let start = getStartValue({ startStrategy, min, max }, step);

    // 3. Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

    // 4. Generate sequence
    const fullSequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

    const displaySequence = fullSequence.map((num, idx) =>
        idx === gapIndex ? '__' : num.toString()
    );

    return {
        text: `What is the missing number? ${displaySequence.join(', ')}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y3_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y3_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N01_Y3_NPV_counting.js ---

--- START FILE: src\generators\N01_Y4_NPV_counting.js ---
```javascript
/**
 * Year 4 Count in Multiples Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y4_NPV - "Count in multiples of 6, 7, 9, 25 and 1000"
 * Schema: V2 (Nested Parameters)
 */

import {
    randomChoice,
    getStartValue,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // 1. Destructure V2 Schema
    const {
        math: {
            range: { min, max },
            sequence: { steps, length, directions, startStrategy }
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 2. Get starting value
    let start = getStartValue({ startStrategy, min, max }, step);

    // 3. Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

    // 4. Generate sequence
    const fullSequence = generateSequence(start, step, length, direction);
    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

    const displaySequence = fullSequence.map((num, idx) =>
        idx === gapIndex ? '__' : num.toString()
    );

    return {
        text: `What is the missing number? ${displaySequence.join(', ')}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y4_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y4_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N01_Y4_NPV_counting.js ---

--- START FILE: src\generators\N01_Y5_NPV_counting.js ---
```javascript
/**
 * Year 5 Counting in Powers of 10 Question Generator
 *
 * Generates counting sequence questions based on UK National Curriculum
 * Module: N01_Y5_NPV - "count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000"
 * Schema: V2 (Nested Parameters)
 */

import {
    randomChoice,
    randomInt,
    generateSequence,
    getGapPosition
} from './helpers/N01_countingHelpers.js';

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    // 1. Destructure V2 Schema
    const {
        math: {
            range: { min, max },
            sequence: { steps, length, directions } // 'steps' now holds powers_of_10 data
        },
        presentation: {
            gaps: { position }
        }
    } = params;

    // Y5 uses powers_of_10 which are mapped to 'steps' in the schema migration
    const step = randomChoice(steps);
    const direction = randomChoice(directions);

    // 2. Get starting value (Custom logic for Y5 to allow "any number")
    const range = max - min;
    const rawStart = min + randomInt(0, Math.floor(range / 2));
    
    // Snap start to grid to ensure integers are clean
    let start = Math.floor(rawStart / step) * step;

    // 3. Ensure sequence stays within bounds
    if (direction === 'forwards') {
        const maxStart = max - (step * (length - 1));
        start = Math.min(start, maxStart);
        start = Math.max(start, min);
    } else {
        const minStart = min + (step * (length - 1));
        start = Math.max(start, minStart);
        start = Math.min(start, max);
    }

    // 4. Generate and Validate Sequence
    let fullSequence = generateSequence(start, step, length, direction);

    // VALIDATION: Ensure ALL values in sequence are within [min, max]
    const allValuesValid = fullSequence.every(val => val >= min && val <= max);

    if (!allValuesValid) {
        // If invalid, clamp start point conservatively
        if (direction === 'forwards') {
            const safeMaxStart = max - (step * length);
            start = Math.max(min, Math.min(start, safeMaxStart));
        } else {
            const safeMinStart = min + (step * length);
            start = Math.min(max, Math.max(start, safeMinStart));
        }
        // Regenerate
        fullSequence = generateSequence(start, step, length, direction);
        
        // Force clamp if still failing
        fullSequence = fullSequence.map(val => Math.max(min, Math.min(val, max)));
    }

    const gapIndex = getGapPosition(length, position);
    const answer = fullSequence[gapIndex];

    const displaySequence = fullSequence.map((num, idx) =>
        idx === gapIndex ? '__' : num.toString()
    );

    return {
        text: `What is the missing number? ${displaySequence.join(', ')}`,
        type: 'text_input',
        answer: answer.toString(),
        hint: `The pattern counts ${direction} in ${step}s`,
        module: 'N01_Y5_NPV',
        level: level
    };
}

export default {
    moduleId: 'N01_Y5_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N01_Y5_NPV_counting.js ---

--- START FILE: src\generators\N02_Y1_NPV_readwrite.js ---
```javascript
/**
 * Year 1 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    applyStep,
    generateUniqueNumbers,
    sortAscending
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral':
            return generateIdentifyNumeral(math, level);
        case 'one_more':
            return generateStepQuestion(math, level, 1, 'more');
        case 'one_less':
            return generateStepQuestion(math, level, 1, 'less');
        case 'numeral_to_word':
            return generateNumeralToWord(math, level);
        case 'word_to_numeral':
            return generateWordToNumeral(math, level);
        case 'compare_two':
            return generateCompareTwo(math, level);
        case 'order_two':
            return generateOrder(math, level, 2);
        case 'order_three':
            return generateOrder(math, level, 3);
        default:
            return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, math.words.min, math.words.max);
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctWord,
        hint: `Read the number and find its word form`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateStepQuestion(math, level, step, direction) {
    let number;

    if (direction === 'more') {
        number = randomInt(math.range.min, math.range.max - step);
    } else {
        number = randomInt(math.range.min + step, math.range.max);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, math.range.min, math.range.max);
    const options = shuffle([answer, ...distractors]);

    const dirWord = direction === 'more' ? 'more' : 'less';

    return {
        text: `What is ${step} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Count up' : 'Count down'} one from ${formatNumber(number)}`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateNumeralToWord(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, math.words.min, math.words.max);
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    return {
        text: `How do you write ${formatNumber(number)} in words?`,
        type: 'multiple_choice',
        options: options,
        answer: correctWord,
        hint: `Say the number out loud`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateWordToNumeral(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const word = numberToWord(number);

    const distractors = generateDistractors(number, 3, math.words.min, math.words.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is "${word}"?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Think about how to write this word as a number`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const numbers = generateUniqueNumbers(2, math.range.min, math.range.max);
    const num1 = numbers[0];
    const num2 = numbers[1];

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const questions = [
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ];

    const q = randomChoice(questions);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: q.answer.toString(),
        hint: `Compare the numbers to see which is ${q.answer === larger ? 'bigger' : 'smaller'}`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);

    return {
        text: `Put these numbers in order from smallest to largest:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: sorted.join(','),
        answers: sorted.map(n => n.toString()),
        hint: `Start with the smallest number`,
        module: 'N02_Y1_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y1_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N02_Y1_NPV_readwrite.js ---

--- START FILE: src\generators\N02_Y2_NPV_readwrite.js ---
```javascript
/**
 * Year 2 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    generateUniqueNumbers,
    sortAscending
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral': return generateIdentifyNumeral(math, level);
        case 'one_more': return generateStepQuestion(math, level, 1, 'more');
        case 'one_less': return generateStepQuestion(math, level, 1, 'less');
        case 'numeral_to_word': return generateNumeralToWord(math, level);
        case 'word_to_numeral': return generateWordToNumeral(math, level);
        case 'compare_two': return generateCompareTwo(math, level);
        case 'use_symbols': return generateUseSymbols(math, level);
        case 'order_two': return generateOrder(math, level, 2);
        case 'order_three': return generateOrder(math, level, 3);
        case 'order_four': return generateOrder(math, level, 4);
        case 'complete_statement': return generateCompleteStatement(math, level);
        case 'true_false': return generateTrueFalse(math, level);
        case 'between': return generateBetween(math, level);
        default: return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, math.words.min, math.words.max);
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctWord,
        hint: `Read the number and find its word form`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateStepQuestion(math, level, step, direction) {
    let number;
    if (direction === 'more') {
        number = randomInt(math.range.min, math.range.max - step);
    } else {
        number = randomInt(math.range.min + step, math.range.max);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, math.range.min, math.range.max);
    const options = shuffle([answer, ...distractors]);

    const dirWord = direction === 'more' ? 'more' : 'less';

    return {
        text: `What is ${step} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${step}`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateNumeralToWord(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, math.words.min, math.words.max);
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    return {
        text: `How do you write ${formatNumber(number)} in words?`,
        type: 'multiple_choice',
        options: options,
        answer: correctWord,
        hint: `Say the number out loud`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateWordToNumeral(math, level) {
    const number = randomInt(math.words.min, math.words.max);
    const word = numberToWord(number);

    const distractors = generateDistractors(number, 3, math.words.min, math.words.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is "${word}"?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Think about the digits`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generateCompareTwo(math, level);

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const q = randomChoice([
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ]);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: q.answer.toString(),
        hint: `Compare the digits`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateUseSymbols(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    let num2 = randomInt(math.range.min, math.range.max);

    if (Math.random() < 0.2) num2 = num1;

    const symbol = getComparisonSymbol(num1, num2);

    return {
        text: `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['<', '>', '='],
        answer: symbol,
        hint: `Think about which number is bigger`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);
    const direction = randomChoice(['ascending', 'descending']);
    const answer = direction === 'ascending' ? sorted : sorted.reverse();

    return {
        text: `Order these numbers from ${direction === 'ascending' ? 'smallest to largest' : 'largest to smallest'}:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: answer.join(','),
        answers: answer.map(n => n.toString()),
        hint: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateCompleteStatement(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 10);
    const difference = randomInt(3, 5) * 2; // Even number
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    return {
        text: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        answer: midpoint.toString(),
        hint: `Find the number in the middle`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateTrueFalse(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);
    const symbol = randomChoice(['<', '>', '=']);
    const correctSymbol = getComparisonSymbol(num1, num2);
    const isTrue = symbol === correctSymbol;

    return {
        text: `Is this statement true or false?\n${formatNumber(num1)} ${symbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: isTrue ? 'True' : 'False',
        hint: `Check if the symbol is correct`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

function generateBetween(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 4);
    const num2 = num1 + randomInt(3, 10);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y2_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y2_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N02_Y2_NPV_readwrite.js ---

--- START FILE: src\generators\N02_Y3_NPV_readwrite.js ---
```javascript
/**
 * Year 3 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    generateUniqueNumbers,
    sortAscending,
    getPlaceValue
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral': return generateIdentifyNumeral(math, level);
        case 'one_more': return generateStepQuestion(math, level, 1, 'more');
        case 'one_less': return generateStepQuestion(math, level, 1, 'less');
        case 'ten_more': return generateStepQuestion(math, level, 10, 'more');
        case 'ten_less': return generateStepQuestion(math, level, 10, 'less');
        case 'hundred_more': return generateStepQuestion(math, level, 100, 'more');
        case 'hundred_less': return generateStepQuestion(math, level, 100, 'less');
        case 'numeral_to_word': return generateNumeralToWord(math, level);
        case 'word_to_numeral': return generateWordToNumeral(math, level);
        case 'compare_two': return generateCompareTwo(math, level);
        case 'use_symbols': return generateUseSymbols(math, level);
        case 'order_two': return generateOrder(math, level, 2);
        case 'order_three': return generateOrder(math, level, 3);
        case 'order_four': return generateOrder(math, level, 4);
        case 'order_five': return generateOrder(math, level, 5);
        case 'complete_statement': return generateCompleteStatement(math, level);
        case 'true_false': return generateTrueFalse(math, level);
        case 'between': return generateBetween(math, level);
        case 'place_value_comparison': return generatePlaceValueComparison(math, level);
        case 'complex_more_less': return generateComplexMoreLess(math, level);
        default: return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const distractors = generateDistractors(number, 3, math.range.min, math.range.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Look at the hundreds, tens and ones`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateStepQuestion(math, level, step, direction) {
    let number;
    if (direction === 'more') {
        number = randomInt(math.range.min, math.range.max - step);
    } else {
        number = randomInt(math.range.min + step, math.range.max);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, math.range.min, math.range.max);
    const options = shuffle([answer, ...distractors]);
    const dirWord = direction === 'more' ? 'more' : 'less';

    return {
        text: `What is ${step} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${step}`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateNumeralToWord(math, level) {
    const number = randomInt(math.words.min, Math.min(math.words.max, 100));
    const correctWord = numberToWord(number);

    const distractorNumbers = generateDistractors(number, 3, math.words.min, Math.min(math.words.max, 100));
    const distractorWords = distractorNumbers.map(n => numberToWord(n)).filter(w => w !== null);
    const options = shuffle([correctWord, ...distractorWords.slice(0, 3)]);

    return {
        text: `How do you write ${formatNumber(number)} in words?`,
        type: 'multiple_choice',
        options: options,
        answer: correctWord,
        hint: `Say the number out loud`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateWordToNumeral(math, level) {
    const number = randomInt(math.words.min, Math.min(math.words.max, 100));
    const word = numberToWord(number);

    const distractors = generateDistractors(number, 3, math.words.min, Math.min(math.words.max, 100));
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is "${word}"?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Think about the digits`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generateCompareTwo(math, level);

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const q = randomChoice([
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ]);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: q.answer.toString(),
        hint: `Compare place values: hundreds, then tens, then ones`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateUseSymbols(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    let num2 = randomInt(math.range.min, math.range.max);

    if (Math.random() < 0.2) num2 = num1;

    const symbol = getComparisonSymbol(num1, num2);

    return {
        text: `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['<', '>', '='],
        answer: symbol,
        hint: `Think about which number is bigger`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);
    const direction = randomChoice(['ascending', 'descending']);
    const answer = direction === 'ascending' ? sorted : sorted.reverse();

    return {
        text: `Order these numbers from ${direction === 'ascending' ? 'smallest to largest' : 'largest to smallest'}:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: answer.join(','),
        answers: answer.map(n => n.toString()),
        hint: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateCompleteStatement(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 20);
    const difference = Math.floor(randomInt(5, 10)) * 2;
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    return {
        text: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        answer: midpoint.toString(),
        hint: `Find the number in the middle`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateTrueFalse(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);
    const symbol = randomChoice(['<', '>', '=']);
    const correctSymbol = getComparisonSymbol(num1, num2);
    const isTrue = symbol === correctSymbol;

    return {
        text: `Is this statement true or false?\n${formatNumber(num1)} ${symbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: isTrue ? 'True' : 'False',
        hint: `Check if the symbol is correct`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateBetween(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 10);
    const num2 = num1 + randomInt(5, 20);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generatePlaceValueComparison(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generatePlaceValueComparison(math, level);

    const place = randomChoice(['hundreds', 'tens', 'ones']);
    const val1 = getPlaceValue(num1, place);
    const val2 = getPlaceValue(num2, place);

    return {
        text: `In ${formatNumber(num1)}, the ${place} digit represents ${val1}.\nIn ${formatNumber(num2)}, what does the ${place} digit represent?`,
        type: 'text_input',
        answer: val2.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

function generateComplexMoreLess(math, level) {
    const number = randomInt(math.range.min + 150, math.range.max - 150);
    const step1 = randomChoice([10, 100]);
    const step2 = randomChoice([10, 100]);
    const dir1 = randomChoice(['more', 'less']);
    const dir2 = randomChoice(['more', 'less']);

    let result = applyStep(number, step1, dir1);
    result = applyStep(result, step2, dir2);

    return {
        text: `Start with ${formatNumber(number)}. What is ${step1} ${dir1}, then ${step2} ${dir2}?`,
        type: 'text_input',
        answer: result.toString(),
        hint: `Do one step at a time`,
        module: 'N02_Y3_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y3_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N02_Y3_NPV_readwrite.js ---

--- START FILE: src\generators\N02_Y4_NPV_readwrite.js ---
```javascript
/**
 * Year 4 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    generateUniqueNumbers,
    sortAscending,
    getPlaceValue,
    roundToNearest,
    generateNonMultiple
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral': return generateIdentifyNumeral(math, level);
        case 'ten_more': return generateStepQuestion(math, level, 10, 'more');
        case 'ten_less': return generateStepQuestion(math, level, 10, 'less');
        case 'hundred_more': return generateStepQuestion(math, level, 100, 'more');
        case 'hundred_less': return generateStepQuestion(math, level, 100, 'less');
        case 'thousand_more': return generateStepQuestion(math, level, 1000, 'more');
        case 'thousand_less': return generateStepQuestion(math, level, 1000, 'less');
        case 'compare_two': return generateCompareTwo(math, level);
        case 'use_symbols': return generateUseSymbols(math, level);
        case 'order_two': return generateOrder(math, level, 2);
        case 'order_three': return generateOrder(math, level, 3);
        case 'order_four': return generateOrder(math, level, 4);
        case 'order_five': return generateOrder(math, level, 5);
        case 'order_six': return generateOrder(math, level, 6);
        case 'complete_statement': return generateCompleteStatement(math, level);
        case 'true_false': return generateTrueFalse(math, level);
        case 'between': return generateBetween(math, level);
        case 'place_value_comparison': return generatePlaceValueComparison(math, level);
        case 'round_to_ten': return generateRounding(math, level, 10);
        case 'round_to_hundred': return generateRounding(math, level, 100);
        case 'round_to_thousand': return generateRounding(math, level, 1000);
        case 'complex_more_less': return generateComplexMoreLess(math, level);
        default: return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const distractors = generateDistractors(number, 3, math.range.min, math.range.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Look at each place value`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateStepQuestion(math, level, step, direction) {
    let number;
    if (direction === 'more') {
        number = randomInt(math.range.min, math.range.max - step);
    } else {
        number = randomInt(math.range.min + step, math.range.max);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, math.range.min, math.range.max);
    const options = shuffle([answer, ...distractors]);
    const dirWord = direction === 'more' ? 'more' : 'less';

    return {
        text: `What is ${formatNumber(step)} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${formatNumber(step)}`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generateCompareTwo(math, level);

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const q = randomChoice([
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ]);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: q.answer.toString(),
        hint: `Compare place values from left to right`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateUseSymbols(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    let num2 = randomInt(math.range.min, math.range.max);

    if (Math.random() < 0.15) num2 = num1;

    const symbol = getComparisonSymbol(num1, num2);

    return {
        text: `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['<', '>', '='],
        answer: symbol,
        hint: `Compare the place values`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);
    const direction = randomChoice(['ascending', 'descending']);
    const answer = direction === 'ascending' ? sorted : sorted.reverse();

    return {
        text: `Order these numbers from ${direction === 'ascending' ? 'smallest to largest' : 'largest to smallest'}:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: answer.join(','),
        answers: answer.map(n => n.toString()),
        hint: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateCompleteStatement(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 200);
    const difference = Math.floor(randomInt(25, 100)) * 2;
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    return {
        text: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        answer: midpoint.toString(),
        hint: `Find the number in the middle`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateTrueFalse(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);
    const symbol = randomChoice(['<', '>', '=']);
    const correctSymbol = getComparisonSymbol(num1, num2);
    const isTrue = symbol === correctSymbol;

    return {
        text: `Is this statement true or false?\n${formatNumber(num1)} ${symbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: isTrue ? 'True' : 'False',
        hint: `Check if the symbol is correct`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateBetween(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 100);
    const num2 = num1 + randomInt(50, 200);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generatePlaceValueComparison(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generatePlaceValueComparison(math, level);

    const place = randomChoice(['thousands', 'hundreds', 'tens', 'ones']);
    const val1 = getPlaceValue(num1, place);
    const val2 = getPlaceValue(num2, place);

    return {
        text: `In ${formatNumber(num1)}, the ${place} digit represents ${formatNumber(val1)}.\nIn ${formatNumber(num2)}, what does the ${place} digit represent?`,
        type: 'text_input',
        answer: val2.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateRounding(math, level, base) {
    const number = generateNonMultiple(math.range.min + base, math.range.max - base, base);
    const rounded = roundToNearest(number, base);

    const distractors = [
        roundToNearest(number + base, base),
        roundToNearest(number - base, base),
        number
    ].filter(d => d !== rounded);
    const options = shuffle([rounded, ...distractors.slice(0, 3)]);

    const baseName = base === 10 ? 'nearest ten' : base === 100 ? 'nearest hundred' : 'nearest thousand';

    return {
        text: `Round ${formatNumber(number)} to the ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Look at the digit to the right of the place you're rounding to`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

function generateComplexMoreLess(math, level) {
    const number = randomInt(math.range.min + 1500, math.range.max - 1500);
    const step1 = randomChoice([100, 1000]);
    const step2 = randomChoice([100, 1000]);
    const dir1 = randomChoice(['more', 'less']);
    const dir2 = randomChoice(['more', 'less']);

    let result = applyStep(number, step1, dir1);
    result = applyStep(result, step2, dir2);

    return {
        text: `Start with ${formatNumber(number)}. What is ${formatNumber(step1)} ${dir1}, then ${formatNumber(step2)} ${dir2}?`,
        type: 'text_input',
        answer: result.toString(),
        hint: `Do one step at a time`,
        module: 'N02_Y4_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y4_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N02_Y4_NPV_readwrite.js ---

--- START FILE: src\generators\N02_Y5_NPV_readwrite.js ---
```javascript
/**
 * Year 5 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    generateUniqueNumbers,
    sortAscending,
    getPlaceValue,
    roundToNearest,
    generateNonMultiple
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral': return generateIdentifyNumeral(math, level);
        case 'thousand_more': return generateStepQuestion(math, level, 1000, 'more');
        case 'thousand_less': return generateStepQuestion(math, level, 1000, 'less');
        case 'ten_thousand_more': return generateStepQuestion(math, level, 10000, 'more');
        case 'ten_thousand_less': return generateStepQuestion(math, level, 10000, 'less');
        case 'hundred_thousand_more': return generateStepQuestion(math, level, 100000, 'more');
        case 'hundred_thousand_less': return generateStepQuestion(math, level, 100000, 'less');
        case 'compare_two': return generateCompareTwo(math, level);
        case 'use_symbols': return generateUseSymbols(math, level);
        case 'order_two': return generateOrder(math, level, 2);
        case 'order_three': return generateOrder(math, level, 3);
        case 'order_four': return generateOrder(math, level, 4);
        case 'order_five': return generateOrder(math, level, 5);
        case 'order_six': return generateOrder(math, level, 6);
        case 'complete_statement': return generateCompleteStatement(math, level);
        case 'true_false': return generateTrueFalse(math, level);
        case 'between': return generateBetween(math, level);
        case 'place_value_comparison': return generatePlaceValueComparison(math, level);
        case 'place_value_digit': return generatePlaceValueDigit(math, level);
        case 'round_to_thousand': return generateRounding(math, level, 1000);
        case 'round_to_ten_thousand': return generateRounding(math, level, 10000);
        case 'round_to_hundred_thousand': return generateRounding(math, level, 100000);
        case 'complex_more_less': return generateComplexMoreLess(math, level);
        default: return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const distractors = generateDistractors(number, 3, math.range.min, math.range.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Read the place values carefully`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateStepQuestion(math, level, step, direction) {
    let number;
    if (direction === 'more') {
        number = randomInt(math.range.min, math.range.max - step);
    } else {
        number = randomInt(math.range.min + step, math.range.max);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, math.range.min, math.range.max);
    const options = shuffle([answer, ...distractors]);
    const dirWord = direction === 'more' ? 'more' : 'less';

    return {
        text: `What is ${formatNumber(step)} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${formatNumber(step)}`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generateCompareTwo(math, level);

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const q = randomChoice([
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ]);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: q.answer.toString(),
        hint: `Compare place values from left to right`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateUseSymbols(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    let num2 = randomInt(math.range.min, math.range.max);

    if (Math.random() < 0.1) num2 = num1;

    const symbol = getComparisonSymbol(num1, num2);

    return {
        text: `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['<', '>', '='],
        answer: symbol,
        hint: `Compare the place values`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);
    const direction = randomChoice(['ascending', 'descending']);
    const answer = direction === 'ascending' ? sorted : sorted.reverse();

    return {
        text: `Order these numbers from ${direction === 'ascending' ? 'smallest to largest' : 'largest to smallest'}:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: answer.join(','),
        answers: answer.map(n => n.toString()),
        hint: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateCompleteStatement(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 20000);
    const difference = Math.floor(randomInt(2500, 10000)) * 2;
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    return {
        text: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        answer: midpoint.toString(),
        hint: `Find the number in the middle`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateTrueFalse(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);
    const symbol = randomChoice(['<', '>', '=']);
    const correctSymbol = getComparisonSymbol(num1, num2);
    const isTrue = symbol === correctSymbol;

    return {
        text: `Is this statement true or false?\n${formatNumber(num1)} ${symbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: isTrue ? 'True' : 'False',
        hint: `Check if the symbol is correct`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateBetween(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 10000);
    const num2 = num1 + randomInt(5000, 20000);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generatePlaceValueComparison(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generatePlaceValueComparison(math, level);

    const place = randomChoice(['hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones']);
    const val1 = getPlaceValue(num1, place);
    const val2 = getPlaceValue(num2, place);

    return {
        text: `In ${formatNumber(num1)}, the ${place} digit represents ${formatNumber(val1)}.\nIn ${formatNumber(num2)}, what does the ${place} digit represent?`,
        type: 'text_input',
        answer: val2.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generatePlaceValueDigit(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const place = randomChoice(['hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones']);
    const value = getPlaceValue(number, place);

    return {
        text: `In the number ${formatNumber(number)}, what is the value of the ${place} digit?`,
        type: 'text_input',
        answer: value.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateRounding(math, level, base) {
    const number = generateNonMultiple(math.range.min + base, math.range.max - base, base);
    const rounded = roundToNearest(number, base);

    const distractors = [
        roundToNearest(number + base, base),
        roundToNearest(number - base, base),
        number
    ].filter(d => d !== rounded);

    const options = shuffle([rounded, ...distractors.slice(0, 3)]);
    const baseName = base === 1000 ? 'nearest thousand' : base === 10000 ? 'nearest ten thousand' : 'nearest hundred thousand';

    return {
        text: `Round ${formatNumber(number)} to the ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Look at the digit to the right of the place you're rounding to`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

function generateComplexMoreLess(math, level) {
    const number = randomInt(math.range.min + 150000, math.range.max - 150000);
    const step1 = randomChoice([10000, 100000]);
    const step2 = randomChoice([10000, 100000]);
    const dir1 = randomChoice(['more', 'less']);
    const dir2 = randomChoice(['more', 'less']);

    let result = applyStep(number, step1, dir1);
    result = applyStep(result, step2, dir2);

    return {
        text: `Start with ${formatNumber(number)}. What is ${formatNumber(step1)} ${dir1}, then ${formatNumber(step2)} ${dir2}?`,
        type: 'text_input',
        answer: result.toString(),
        hint: `Do one step at a time`,
        module: 'N02_Y5_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y5_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N02_Y5_NPV_readwrite.js ---

--- START FILE: src\generators\N02_Y6_NPV_readwrite.js ---
```javascript
/**
 * Year 6 Read/Write/Order/Compare Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    getComparisonSymbol,
    applyStep,
    generateUniqueNumbers,
    sortAscending,
    getPlaceValue,
    roundToNearest,
    generateNonMultiple
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'identify_numeral': return generateIdentifyNumeral(math, level);
        case 'hundred_thousand_more': return generateStepQuestion(math, level, 100000, 'more');
        case 'hundred_thousand_less': return generateStepQuestion(math, level, 100000, 'less');
        case 'million_more': return generateStepQuestion(math, level, 1000000, 'more');
        case 'million_less': return generateStepQuestion(math, level, 1000000, 'less');
        case 'ten_million_more': return generateStepQuestion(math, level, 10000000, 'more');
        case 'ten_million_less': return generateStepQuestion(math, level, 10000000, 'less');
        case 'compare_two': return generateCompareTwo(math, level);
        case 'use_symbols': return generateUseSymbols(math, level);
        case 'order_two': return generateOrder(math, level, 2);
        case 'order_three': return generateOrder(math, level, 3);
        case 'order_four': return generateOrder(math, level, 4);
        case 'order_five': return generateOrder(math, level, 5);
        case 'order_six': return generateOrder(math, level, 6);
        case 'complete_statement': return generateCompleteStatement(math, level);
        case 'true_false': return generateTrueFalse(math, level);
        case 'between': return generateBetween(math, level);
        case 'place_value_comparison': return generatePlaceValueComparison(math, level);
        case 'place_value_digit': return generatePlaceValueDigit(math, level);
        case 'round_to_hundred_thousand': return generateRounding(math, level, 100000);
        case 'round_to_million': return generateRounding(math, level, 1000000);
        case 'complex_more_less': return generateComplexMoreLess(math, level);
        default: return generateIdentifyNumeral(math, level);
    }
}

function generateIdentifyNumeral(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const distractors = generateDistractors(number, 3, math.range.min, math.range.max);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Read the place values carefully - up to ten millions`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateStepQuestion(math, level, step, direction) {
    let number;
    if (direction === 'more') {
        number = randomInt(math.range.min, math.range.max - step);
    } else {
        number = randomInt(math.range.min + step, math.range.max);
    }

    const answer = applyStep(number, step, direction);
    const distractors = generateDistractors(answer, 3, math.range.min, math.range.max);
    const options = shuffle([answer, ...distractors]);
    const dirWord = direction === 'more' ? 'more' : 'less';

    return {
        text: `What is ${formatNumber(step)} ${dirWord} than ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `${direction === 'more' ? 'Add' : 'Subtract'} ${formatNumber(step)}`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateCompareTwo(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generateCompareTwo(math, level);

    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);

    const q = randomChoice([
        { text: `Which number is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: larger },
        { text: `Which number is smaller: ${formatNumber(num1)} or ${formatNumber(num2)}?`, answer: smaller }
    ]);

    return {
        text: q.text,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: q.answer.toString(),
        hint: `Compare place values from left to right`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateUseSymbols(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    let num2 = randomInt(math.range.min, math.range.max);

    if (Math.random() < 0.1) num2 = num1;

    const symbol = getComparisonSymbol(num1, num2);

    return {
        text: `Which symbol completes the statement?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['<', '>', '='],
        answer: symbol,
        hint: `Compare the place values`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateOrder(math, level, count) {
    const numbers = generateUniqueNumbers(count, math.range.min, math.range.max);
    const shuffled = shuffle([...numbers]);
    const sorted = sortAscending(numbers);
    const direction = randomChoice(['ascending', 'descending']);
    const answer = direction === 'ascending' ? sorted : sorted.reverse();

    return {
        text: `Order these numbers from ${direction === 'ascending' ? 'smallest to largest' : 'largest to smallest'}:\n${shuffled.map(formatNumber).join(', ')}`,
        type: 'text_input',
        answer: answer.join(','),
        answers: answer.map(n => n.toString()),
        hint: `${direction === 'ascending' ? 'Start with the smallest' : 'Start with the largest'}`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateCompleteStatement(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 500000);
    const difference = Math.floor(randomInt(25000, 250000)) * 2;
    const num2 = num1 + difference;
    const midpoint = (num1 + num2) / 2;

    return {
        text: `What number is exactly halfway between ${formatNumber(num1)} and ${formatNumber(num2)}?`,
        type: 'text_input',
        answer: midpoint.toString(),
        hint: `Find the number in the middle`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateTrueFalse(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);
    const symbol = randomChoice(['<', '>', '=']);
    const correctSymbol = getComparisonSymbol(num1, num2);
    const isTrue = symbol === correctSymbol;

    return {
        text: `Is this statement true or false?\n${formatNumber(num1)} ${symbol} ${formatNumber(num2)}`,
        type: 'multiple_choice',
        options: ['True', 'False'],
        answer: isTrue ? 'True' : 'False',
        hint: `Check if the symbol is correct`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateBetween(math, level) {
    const num1 = randomInt(math.range.min, math.range.max - 100000);
    const num2 = num1 + randomInt(50000, 500000);
    const between = randomInt(num1 + 1, num2 - 1);

    return {
        text: `Give a number that is between ${formatNumber(num1)} and ${formatNumber(num2)}`,
        type: 'text_input',
        answer: between.toString(),
        validRange: { min: num1, max: num2 },
        hint: `Any number greater than ${formatNumber(num1)} and less than ${formatNumber(num2)}`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generatePlaceValueComparison(math, level) {
    const num1 = randomInt(math.range.min, math.range.max);
    const num2 = randomInt(math.range.min, math.range.max);

    if (num1 === num2) return generatePlaceValueComparison(math, level);

    const place = randomChoice(['millions', 'hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones']);
    const val1 = getPlaceValue(num1, place);
    const val2 = getPlaceValue(num2, place);

    return {
        text: `In ${formatNumber(num1)}, the ${place} digit represents ${formatNumber(val1)}.\nIn ${formatNumber(num2)}, what does the ${place} digit represent?`,
        type: 'text_input',
        answer: val2.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generatePlaceValueDigit(math, level) {
    const number = randomInt(math.range.min, math.range.max);
    const place = randomChoice(['ten millions', 'millions', 'hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones']);
    const value = getPlaceValue(number, place);

    return {
        text: `In the number ${formatNumber(number)}, what is the value of the ${place} digit?`,
        type: 'text_input',
        answer: value.toString(),
        hint: `Look at the ${place} place`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateRounding(math, level, base) {
    const number = generateNonMultiple(math.range.min + base, math.range.max - base, base);
    const rounded = roundToNearest(number, base);

    const distractors = [
        roundToNearest(number + base, base),
        roundToNearest(number - base, base),
        number
    ].filter(d => d !== rounded);
    const options = shuffle([rounded, ...distractors.slice(0, 3)]);

    const baseName = base === 100000 ? 'nearest hundred thousand' : 'nearest million';

    return {
        text: `Round ${formatNumber(number)} to the ${baseName}`,
        type: 'multiple_choice',
        options: options,
        answer: rounded.toString(),
        hint: `Look at the digit to the right of the place you're rounding to`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

function generateComplexMoreLess(math, level) {
    const number = randomInt(math.range.min + 1500000, math.range.max - 1500000);
    const step1 = randomChoice([100000, 1000000]);
    const step2 = randomChoice([100000, 1000000]);
    const dir1 = randomChoice(['more', 'less']);
    const dir2 = randomChoice(['more', 'less']);

    let result = applyStep(number, step1, dir1);
    result = applyStep(result, step2, dir2);

    return {
        text: `Start with ${formatNumber(number)}. What is ${formatNumber(step1)} ${dir1}, then ${formatNumber(step2)} ${dir2}?`,
        type: 'text_input',
        answer: result.toString(),
        hint: `Do one step at a time`,
        module: 'N02_Y6_NPV',
        level: level
    };
}

export default {
    moduleId: 'N02_Y6_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N02_Y6_NPV_readwrite.js ---

--- START FILE: src\generators\N03_Y2_NPV_placevalue.js ---
```javascript
/**
 * Year 2 Place Value Question Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    getExpandedForm,
    getAlternativeDecomposition,
    generateNumberWithZero,
    generateDistractors
} from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    // Helper function to create flat params for helpers
    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        places: math.placeValue.places,
        include_zero: math.placeValue.includeZero
    });

    switch(operation) {
        case 'identify_digit': return generateIdentifyDigit(getFlatParams(), level);
        case 'identify_place_value': return generateIdentifyPlaceValue(getFlatParams(), level);
        case 'compare_place_values': return generateComparePlaceValues(getFlatParams(), level);
        case 'compose_simple': return generateComposeSimple(getFlatParams(), level);
        case 'decompose_simple': return generateDecomposeSimple(getFlatParams(), level);
        case 'digit_value': return generateDigitValue(getFlatParams(), level);
        case 'zero_value': return generateZeroValue(getFlatParams(), level);
        case 'expanded_form': return generateExpandedForm(getFlatParams(), level);
        case 'standard_from_expanded': return generateStandardFromExpanded(getFlatParams(), level);
        case 'place_comparison': return generatePlaceComparison(getFlatParams(), level);
        case 'alternative_decomposition': return generateAlternativeDecomposition(getFlatParams(), level);
        case 'multiple_representations': return generateMultipleRepresentations(getFlatParams(), level);
        default: return generateIdentifyDigit(getFlatParams(), level);
    }
}

// Note: The generator functions below have been kept compatible with the helpers
// by passing a flattened structure constructed in the switch above.
// This is a common migration pattern to avoid rewriting all logic at once.

function generateIdentifyDigit(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const correctDigit = getDigitAtPlace(number, place);

    const distractors = new Set();
    params.places.forEach(p => {
        const digit = getDigitAtPlace(number, p);
        if (digit !== correctDigit) {
            distractors.add(digit);
        }
    });

    while (distractors.size < 3) {
        const randomDigit = randomInt(0, 9);
        if (randomDigit !== correctDigit) {
            distractors.add(randomDigit);
        }
    }

    const options = shuffle([correctDigit, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `What digit is in the ${place} place in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctDigit.toString(),
        hint: `Look at the ${place} position`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateIdentifyPlaceValue(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) return generateIdentifyPlaceValue(params, level);

    const correctValue = getPlaceValue(number, place);
    const distractors = new Set([digit]);

    params.places.forEach(p => {
        const value = getPlaceValue(number, p);
        if (value !== correctValue && value > 0) {
            distractors.add(value);
        }
    });

    distractors.add(digit * 100);
    while (distractors.size < 3) distractors.add(randomInt(1, 90));

    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what is the value of the ${digit}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctValue.toString(),
        hint: `The ${digit} is in the ${place} place`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateComparePlaceValues(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    let validNumber = false;
    let num = number;

    while (!validNumber) {
        const tensDigit = getDigitAtPlace(num, 'tens');
        const onesDigit = getDigitAtPlace(num, 'ones');
        if (tensDigit > 0 && onesDigit > 0) validNumber = true;
        else num = randomInt(params.min_value, params.max_value);
    }

    const tensDigit = getDigitAtPlace(num, 'tens');
    const onesDigit = getDigitAtPlace(num, 'ones');

    return {
        text: `In ${formatNumber(num)}, which digit represents a greater value: ${tensDigit} or ${onesDigit}?`,
        type: 'multiple_choice',
        options: [tensDigit, onesDigit],
        answer: tensDigit.toString(),
        hint: `Think about place value - tens or ones?`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const tens = (decomp['tens'] || 0) / 10;
    const ones = decomp['ones'] || 0;

    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${tens} tens and ${ones} ones?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `${tens} tens = ${tens * 10}, then add ${ones} ones`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const tens = (decomp['tens'] || 0) / 10;
    const ones = decomp['ones'] || 0;

    return {
        text: `How many tens and ones are in ${formatNumber(number)}?\nEnter your answer as: [tens],[ones]`,
        type: 'text_input',
        answer: `${tens},${ones}`,
        answers: [tens, ones],
        hint: `Count the tens, then the ones`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateDigitValue(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) return generateDigitValue(params, level);

    const value = getPlaceValue(number, place);
    const distractors = new Set([digit, digit * 100]);
    while (distractors.size < 3) distractors.add(randomInt(1, 90));

    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Look at which place the ${digit} is in`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateZeroValue(params, level) {
    if (!params.include_zero) return generateIdentifyDigit(params, level);
    
    const number = generateNumberWithZero(params.min_value, params.max_value, true);
    if (!String(number).includes('0')) return generateZeroValue(params, level);

    return {
        text: `What is the value of the 0 in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: [0, 1, 10, number],
        answer: '0',
        hint: `Zero means there is nothing in that place`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);

    return {
        text: `Write ${formatNumber(number)} in expanded form (e.g., "30 + 5")`,
        type: 'text_input',
        answer: expanded,
        hint: `Break the number into tens and ones`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateStandardFromExpanded(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What is ${expanded} in standard form?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Add the parts together`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generatePlaceComparison(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generatePlaceComparison(params, level);

    const place = randomChoice(params.places);
    const value1 = getPlaceValue(num1, place);
    const value2 = getPlaceValue(num2, place);
    const answer = value1 > value2 ? num1 : (value2 > value1 ? num2 : num1);

    return {
        text: `Which number has more ${place}: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: answer.toString(),
        hint: `Look at the ${place} place in each number`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateAlternativeDecomposition(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const altDecomp = getAlternativeDecomposition(number, params.places);
    const tens = altDecomp['tens'] / 10;
    const ones = altDecomp['ones'];

    return {
        text: `${formatNumber(number)} can also be written as [?] tens and ${ones} ones.\nWhat number goes in place of [?]?`,
        type: 'text_input',
        answer: tens.toString(),
        hint: `Think about different ways to make ${number}`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

function generateMultipleRepresentations(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const expanded = getExpandedForm(number);
    const tens = decomp['tens'] / 10;
    const ones = decomp['ones'];

    const representations = [
        formatNumber(number),
        `${tens} tens and ${ones} ones`,
        expanded,
        `${number} ones`
    ];

    const correctRep = randomChoice(representations.slice(0, 3));
    const distractors = representations.filter(r => r !== correctRep).slice(0, 3);
    const options = shuffle([correctRep, ...distractors]);

    return {
        text: `Which of these represents the same value as ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctRep,
        hint: `All these should equal ${number}`,
        module: 'N03_Y2_NPV',
        level: level
    };
}

export default {
    moduleId: 'N03_Y2_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N03_Y2_NPV_placevalue.js ---

--- START FILE: src\generators\N03_Y3_NPV_placevalue.js ---
```javascript
/**
 * Year 3 Place Value Question Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    getExpandedForm,
    getAlternativeDecomposition,
    generateNumberWithZero,
    generateDistractors
} from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        places: math.placeValue.places,
        include_zero: math.placeValue.includeZero
    });

    switch(operation) {
        case 'identify_digit': return generateIdentifyDigit(getFlatParams(), level);
        case 'identify_place_value': return generateIdentifyPlaceValue(getFlatParams(), level);
        case 'compare_place_values': return generateComparePlaceValues(getFlatParams(), level);
        case 'compose_simple': return generateComposeSimple(getFlatParams(), level);
        case 'decompose_simple': return generateDecomposeSimple(getFlatParams(), level);
        case 'digit_value': return generateDigitValue(getFlatParams(), level);
        case 'zero_value': return generateZeroValue(getFlatParams(), level);
        case 'expanded_form': return generateExpandedForm(getFlatParams(), level);
        case 'standard_from_expanded': return generateStandardFromExpanded(getFlatParams(), level);
        case 'place_comparison': return generatePlaceComparison(getFlatParams(), level);
        case 'alternative_decomposition': return generateAlternativeDecomposition(getFlatParams(), level);
        case 'multiple_representations': return generateMultipleRepresentations(getFlatParams(), level);
        default: return generateIdentifyDigit(getFlatParams(), level);
    }
}

function generateIdentifyDigit(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const correctDigit = getDigitAtPlace(number, place);

    const distractors = new Set();
    params.places.forEach(p => {
        const digit = getDigitAtPlace(number, p);
        if (digit !== correctDigit) distractors.add(digit);
    });

    while (distractors.size < 3) distractors.add(randomInt(0, 9));

    const options = shuffle([correctDigit, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `What digit is in the ${place} place in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctDigit.toString(),
        hint: `Look at the ${place} position`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateIdentifyPlaceValue(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) return generateIdentifyPlaceValue(params, level);

    const correctValue = getPlaceValue(number, place);
    const distractors = new Set([digit]);

    params.places.forEach(p => {
        const value = getPlaceValue(number, p);
        if (value !== correctValue && value > 0) distractors.add(value);
    });

    distractors.add(digit * 10);
    while (distractors.size < 3) distractors.add(randomInt(1, 900));

    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what is the value of the ${digit}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctValue.toString(),
        hint: `The ${digit} is in the ${place} place`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateComparePlaceValues(params, level, attempts = 0) {
    if (attempts > 10) return generateIdentifyDigit(params, level);

    const number = randomInt(params.min_value, params.max_value);
    const places = shuffle([...params.places]).slice(0, 2);
    const digit1 = getDigitAtPlace(number, places[0]);
    const digit2 = getDigitAtPlace(number, places[1]);

    if (digit1 === digit2 || digit1 === 0 || digit2 === 0) {
        return generateComparePlaceValues(params, level, attempts + 1);
    }

    const value1 = getPlaceValue(number, places[0]);
    const value2 = getPlaceValue(number, places[1]);
    const greaterDigit = value1 > value2 ? digit1 : digit2;

    return {
        text: `In ${formatNumber(number)}, which digit represents a greater value: ${digit1} or ${digit2}?`,
        type: 'multiple_choice',
        options: [digit1, digit2],
        answer: greaterDigit.toString(),
        hint: `Compare the place values: ${places[0]} vs ${places[1]}`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        const count = place === 'ones' ? value : value / getPlaceDivisor(place);
        return `${count} ${place}`;
    }).filter((_, idx) => decomp[params.places[idx]] > 0);

    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${parts.join(', ')}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Add up all the place values`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        return place === 'ones' ? value : value / getPlaceDivisor(place);
    });

    return {
        text: `Break down ${formatNumber(number)} into place values.\nEnter as: [hundreds],[tens],[ones]`,
        type: 'text_input',
        answer: parts.join(','),
        answers: parts,
        hint: `Count each place separately`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateDigitValue(params, level) {
    const number = params.include_zero
        ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3)
        : randomInt(params.min_value, params.max_value);

    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);

    if (digit === 0) return generateDigitValue(params, level);

    const value = getPlaceValue(number, place);
    const distractors = new Set([digit, digit * 10]);
    while (distractors.size < 3) distractors.add(randomInt(1, 900));

    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Look at which place the ${digit} is in`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateZeroValue(params, level) {
    if (!params.include_zero) return generateIdentifyDigit(params, level);
    
    const number = generateNumberWithZero(params.min_value, params.max_value, true);
    if (!String(number).includes('0')) return generateZeroValue(params, level);

    return {
        text: `What is the value of the 0 in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: [0, 1, 10, 100],
        answer: '0',
        hint: `Zero means there is nothing in that place`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);

    return {
        text: `Write ${formatNumber(number)} in expanded form (e.g., "300 + 40 + 5")`,
        type: 'text_input',
        answer: expanded,
        hint: `Break the number into hundreds, tens and ones`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateStandardFromExpanded(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What is ${expanded} in standard form?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Add the parts together`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generatePlaceComparison(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);

    if (num1 === num2) return generatePlaceComparison(params, level);

    const place = randomChoice(params.places);
    const value1 = getPlaceValue(num1, place);
    const value2 = getPlaceValue(num2, place);
    const answer = value1 > value2 ? num1 : (value2 > value1 ? num2 : num1);

    return {
        text: `Which number has more ${place}: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
        type: 'multiple_choice',
        options: [num1, num2],
        answer: answer.toString(),
        hint: `Look at the ${place} place in each number`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateAlternativeDecomposition(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const altDecomp = getAlternativeDecomposition(number, params.places);
    const normalDecomp = decomposeNumber(number, params.places);
    
    let modifiedPlace = null;
    for (const place of params.places) {
        if (altDecomp[place] !== normalDecomp[place]) {
            modifiedPlace = place;
            break;
        }
    }

    if (!modifiedPlace || modifiedPlace === 'ones') return generateAlternativeDecomposition(params, level);

    const count = altDecomp[modifiedPlace] / getPlaceDivisor(modifiedPlace);
    const onesCount = altDecomp['ones'];

    return {
        text: `${formatNumber(number)} can also be written as [?] ${modifiedPlace} and ${onesCount} ones.\nWhat number goes in place of [?]?`,
        type: 'text_input',
        answer: count.toString(),
        hint: `Think about different ways to make ${number}`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function generateMultipleRepresentations(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const expanded = getExpandedForm(number);
    const hundreds = decomp['hundreds'] / 100;
    const tens = decomp['tens'] / 10;
    const ones = decomp['ones'];

    const representations = [
        formatNumber(number),
        `${hundreds} hundreds, ${tens} tens and ${ones} ones`,
        expanded,
        `${number} ones`
    ];

    const correctRep = randomChoice(representations.slice(0, 3));
    const distractors = representations.filter(r => r !== correctRep).slice(0, 3);
    const options = shuffle([correctRep, ...distractors]);

    return {
        text: `Which of these represents the same value as ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctRep,
        hint: `All these should equal ${number}`,
        module: 'N03_Y3_NPV',
        level: level
    };
}

function getPlaceDivisor(place) {
    const divisors = { 'ones': 1, 'tens': 10, 'hundreds': 100, 'thousands': 1000 };
    return divisors[place] || 1;
}

export default {
    moduleId: 'N03_Y3_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N03_Y3_NPV_placevalue.js ---

--- START FILE: src\generators\N03_Y4_NPV_placevalue.js ---
```javascript
/**
 * Year 4 Place Value & Roman Numerals Question Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    getExpandedForm,
    generateDistractors,
    toRoman,
    generateRomanPair
} from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        places: math.placeValue.places,
        include_zero: math.placeValue.includeZero,
        roman_min: math.roman.min,
        roman_max: math.roman.max
    });

    // Roman numeral operations
    if (operation === 'roman_to_arabic') return generateRomanToArabic(getFlatParams(), level);
    if (operation === 'arabic_to_roman') return generateArabicToRoman(getFlatParams(), level);
    if (operation === 'roman_compare') return generateRomanCompare(getFlatParams(), level);
    if (operation === 'roman_order') return generateRomanOrder(getFlatParams(), level);
    if (operation === 'roman_sequence') return generateRomanSequence(getFlatParams(), level);
    if (operation === 'roman_simple') return generateRomanToArabic(getFlatParams(), level);

    // Place value operations
    switch(operation) {
        case 'identify_digit': return generateIdentifyDigit(getFlatParams(), level);
        case 'identify_place_value': return generateIdentifyPlaceValue(getFlatParams(), level);
        case 'digit_value': return generateDigitValue(getFlatParams(), level);
        case 'compare_place_values': return generateComparePlaceValues(getFlatParams(), level);
        case 'compose_simple': return generateComposeSimple(getFlatParams(), level);
        case 'decompose_simple': return generateDecomposeSimple(getFlatParams(), level);
        case 'expanded_form': return generateExpandedForm(getFlatParams(), level);
        case 'standard_from_expanded': return generateStandardFromExpanded(getFlatParams(), level);
        case 'zero_value': return generateZeroValue(getFlatParams(), level);
        case 'zero_concept': return generateZeroConcept(getFlatParams(), level);
        default: return generateIdentifyDigit(getFlatParams(), level);
    }
}

// Roman Numerals

function generateRomanToArabic(params, level) {
    const { roman, arabic } = generateRomanPair(params.roman_min, params.roman_max);
    const distractors = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const options = shuffle([arabic, ...distractors]);

    return {
        text: `What is ${roman} in numbers?`,
        type: 'multiple_choice',
        options: options,
        answer: arabic.toString(),
        hint: `Remember: I=1, V=5, X=10, L=50, C=100`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateArabicToRoman(params, level) {
    const { roman, arabic } = generateRomanPair(params.roman_min, params.roman_max);
    const distractorNumbers = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const distractorRomans = distractorNumbers.map(n => toRoman(n));
    const options = shuffle([roman, ...distractorRomans]);

    return {
        text: `Write ${arabic} in Roman numerals`,
        type: 'multiple_choice',
        options: options,
        answer: roman,
        hint: `Break it down: hundreds, tens, ones`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateRomanCompare(params, level) {
    const pair1 = generateRomanPair(params.roman_min, params.roman_max);
    let pair2 = generateRomanPair(params.roman_min, params.roman_max);
    while (pair2.arabic === pair1.arabic) pair2 = generateRomanPair(params.roman_min, params.roman_max);

    const larger = pair1.arabic > pair2.arabic ? pair1 : pair2;

    return {
        text: `Which is larger: ${pair1.roman} or ${pair2.roman}?`,
        type: 'multiple_choice',
        options: [pair1.roman, pair2.roman],
        answer: larger.roman,
        hint: `Convert to numbers if needed`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateRomanOrder(params, level) {
    const pairs = [];
    for (let i = 0; i < 3; i++) {
        let pair = generateRomanPair(params.roman_min, params.roman_max);
        while (pairs.some(p => p.arabic === pair.arabic)) pair = generateRomanPair(params.roman_min, params.roman_max);
        pairs.push(pair);
    }

    const sorted = [...pairs].sort((a, b) => a.arabic - b.arabic);
    const shuffled = shuffle([...pairs]);
    const answer = sorted.map(p => p.roman).join(',');

    return {
        text: `Order these Roman numerals from smallest to largest:\n${shuffled.map(p => p.roman).join(', ')}\n\nEnter as: [smallest],[middle],[largest]`,
        type: 'text_input',
        answer: answer,
        answers: sorted.map(p => p.roman),
        hint: `Convert to numbers first if needed`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateRomanSequence(params, level) {
    const step = randomChoice([1, 5, 10]);
    const startArabic = randomInt(params.roman_min, Math.min(params.roman_max - step * 3, 80));
    const sequence = [];
    for (let i = 0; i < 4; i++) {
        sequence.push({ arabic: startArabic + (i * step), roman: toRoman(startArabic + (i * step)) });
    }
    const nextArabic = startArabic + (4 * step);
    const nextRoman = toRoman(nextArabic);
    const distractorNumbers = [nextArabic + step, nextArabic - step, nextArabic + 1];
    const distractorRomans = distractorNumbers.map(n => toRoman(n));
    const options = shuffle([nextRoman, ...distractorRomans]);

    return {
        text: `What comes next in this sequence?\n${sequence.map(s => s.roman).join(', ')}, ___`,
        type: 'multiple_choice',
        options: options,
        answer: nextRoman,
        hint: `The pattern increases by ${step} each time`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

// Place Value Functions

function generateIdentifyDigit(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const correctDigit = getDigitAtPlace(number, place);
    const distractors = new Set();
    params.places.forEach(p => {
        const digit = getDigitAtPlace(number, p);
        if (digit !== correctDigit) distractors.add(digit);
    });
    while (distractors.size < 3) distractors.add(randomInt(0, 9));
    const options = shuffle([correctDigit, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `What digit is in the ${place} place in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctDigit.toString(),
        hint: `Look carefully at the ${place} position`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateIdentifyPlaceValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    if (digit === 0) return generateIdentifyPlaceValue(params, level);
    const correctValue = getPlaceValue(number, place);
    const distractors = new Set([digit]);
    params.places.forEach(p => {
        const value = getPlaceValue(number, p);
        if (value !== correctValue && value > 0) distractors.add(value);
    });
    while (distractors.size < 3) distractors.add(randomInt(1, 9000));
    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what is the value of the ${digit}?`,
        type: 'multiple_choice',
        options: options,
        answer: correctValue.toString(),
        hint: `The ${digit} is in the ${place} place`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateDigitValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    if (digit === 0) return generateDigitValue(params, level);
    const value = getPlaceValue(number, place);
    const distractors = new Set([digit]);
    while (distractors.size < 3) distractors.add(randomInt(1, 9000));
    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

    return {
        text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`,
        type: 'multiple_choice',
        options: options,
        answer: value.toString(),
        hint: `Look at which place the ${digit} is in`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateComparePlaceValues(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const places = shuffle([...params.places]).slice(0, 2);
    const digit1 = getDigitAtPlace(number, places[0]);
    const digit2 = getDigitAtPlace(number, places[1]);
    if (digit1 === 0 || digit2 === 0) return generateComparePlaceValues(params, level);
    const value1 = getPlaceValue(number, places[0]);
    const value2 = getPlaceValue(number, places[1]);
    const greaterDigit = value1 > value2 ? digit1 : digit2;

    return {
        text: `In ${formatNumber(number)}, which digit represents a greater value: ${digit1} or ${digit2}?`,
        type: 'multiple_choice',
        options: [digit1, digit2],
        answer: greaterDigit.toString(),
        hint: `Compare the place values`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        const count = place === 'ones' ? value : value / getPlaceDivisor(place);
        return `${count} ${place}`;
    }).filter((_, idx) => decomp[params.places[idx]] > 0);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What number is ${parts.join(', ')}?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Add up all the place values`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        return place === 'ones' ? value : value / getPlaceDivisor(place);
    });
    const placeLabels = params.places.map(p => `[${p.substring(0, 3)}]`).join(',');

    return {
        text: `Break down ${formatNumber(number)} into place values.\nEnter as: ${placeLabels}`,
        type: 'text_input',
        answer: parts.join(','),
        answers: parts,
        hint: `Count each place separately`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    return {
        text: `Write ${formatNumber(number)} in expanded form (e.g., "3000 + 400 + 50 + 7")`,
        type: 'text_input',
        answer: expanded,
        hint: `Break into thousands, hundreds, tens, and ones`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateStandardFromExpanded(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);

    return {
        text: `What is ${expanded} in standard form?`,
        type: 'multiple_choice',
        options: options,
        answer: number.toString(),
        hint: `Add all the parts together`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateZeroValue(params, level) {
    let number = randomInt(params.min_value, params.max_value);
    while (!String(number).includes('0')) number = randomInt(params.min_value, params.max_value);
    return {
        text: `What is the value of the 0 in ${formatNumber(number)}?`,
        type: 'multiple_choice',
        options: [0, 10, 100, 1000],
        answer: '0',
        hint: `Zero means there is nothing in that place`,
        module: 'N03_Y4_NPV',
        level: level
    };
}

function generateZeroConcept(params, level) {
    const q = randomChoice([
        { text: `What happens to the number 45 when we put a zero after it?`, answer: '450', options: shuffle([450, 45, 405, 4500]) },
        { text: `Which is larger: 305 or 35?`, answer: '305', options: [305, 35] },
        { text: `What number is one hundred more than 4900?`, answer: '5000', options: shuffle([5000, 4901, 5900, 4910]) }
    ]);
    return { text: q.text, type: 'multiple_choice', options: q.options, answer: q.answer, hint: `Think about place value`, module: 'N03_Y4_NPV', level: level };
}

function getPlaceDivisor(place) {
    const divisors = { 'ones': 1, 'tens': 10, 'hundreds': 100, 'thousands': 1000 };
    return divisors[place] || 1;
}

export default {
    moduleId: 'N03_Y4_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N03_Y4_NPV_placevalue.js ---

--- START FILE: src\generators\N03_Y5_NPV_placevalue.js ---
```javascript
/**
 * Year 5 Place Value & Roman Numerals Question Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    getExpandedForm,
    getAlternativeDecomposition,
    generateNumberWithZero,
    generateDistractors,
    toRoman,
    fromRoman,
    generateRomanPair
} from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        places: math.placeValue.places,
        include_zero: math.placeValue.includeZero,
        roman_min: math.roman.min,
        roman_max: math.roman.max,
        roman_years: math.roman.years
    });

    // Roman numeral operations
    if (operation === 'roman_to_arabic') return generateRomanToArabic(getFlatParams(), level);
    if (operation === 'arabic_to_roman') return generateArabicToRoman(getFlatParams(), level);
    if (operation === 'roman_compare') return generateRomanCompare(getFlatParams(), level);
    if (operation === 'roman_year') return generateRomanYear(getFlatParams(), level);
    if (operation === 'roman_complex') return generateRomanComplex(getFlatParams(), level);

    // Place value operations
    switch(operation) {
        case 'identify_digit': return generateIdentifyDigit(getFlatParams(), level);
        case 'identify_place_value': return generateIdentifyPlaceValue(getFlatParams(), level);
        case 'digit_value': return generateDigitValue(getFlatParams(), level);
        case 'compare_place_values': return generateComparePlaceValues(getFlatParams(), level);
        case 'compose_simple': return generateComposeSimple(getFlatParams(), level);
        case 'decompose_simple': return generateDecomposeSimple(getFlatParams(), level);
        case 'expanded_form': return generateExpandedForm(getFlatParams(), level);
        case 'standard_from_expanded': return generateStandardFromExpanded(getFlatParams(), level);
        case 'place_comparison': return generatePlaceComparison(getFlatParams(), level);
        case 'alternative_decomposition': return generateAlternativeDecomposition(getFlatParams(), level);
        case 'multiple_representations': return generateMultipleRepresentations(getFlatParams(), level);
        default: return generateIdentifyDigit(getFlatParams(), level);
    }
}

function generateRomanToArabic(params, level) {
    const { roman, arabic } = generateRomanPair(params.roman_min, params.roman_max);
    const distractors = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const options = shuffle([arabic, ...distractors]);
    return { text: `What is ${roman} in numbers?`, type: 'multiple_choice', options: options, answer: arabic.toString(), hint: `Remember: I=1, V=5, X=10, L=50, C=100, D=500, M=1000`, module: 'N03_Y5_NPV', level: level };
}

function generateArabicToRoman(params, level) {
    const { roman, arabic } = generateRomanPair(params.roman_min, params.roman_max);
    const distractorNumbers = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const distractorRomans = distractorNumbers.map(n => toRoman(n));
    const options = shuffle([roman, ...distractorRomans]);
    return { text: `Write ${arabic} in Roman numerals`, type: 'multiple_choice', options: options, answer: roman, hint: `Break it down: thousands, hundreds, tens, ones`, module: 'N03_Y5_NPV', level: level };
}

function generateRomanCompare(params, level) {
    const pair1 = generateRomanPair(params.roman_min, params.roman_max);
    let pair2 = generateRomanPair(params.roman_min, params.roman_max);
    while (pair2.arabic === pair1.arabic) pair2 = generateRomanPair(params.roman_min, params.roman_max);
    const larger = pair1.arabic > pair2.arabic ? pair1 : pair2;
    return { text: `Which is larger: ${pair1.roman} or ${pair2.roman}?`, type: 'multiple_choice', options: [pair1.roman, pair2.roman], answer: larger.roman, hint: `Convert to numbers to compare`, module: 'N03_Y5_NPV', level: level };
}

function generateRomanYear(params, level) {
    if (!params.roman_years || params.roman_years.length === 0) return generateRomanToArabic(params, level);
    const year = randomChoice(params.roman_years);
    const roman = toRoman(year);
    const distractors = new Set();
    [1, -1, 10, -10, 50, -50, 100, -100].forEach(offset => { if (distractors.size < 3) distractors.add(year + offset); });
    const options = shuffle([year, ...Array.from(distractors).slice(0, 3)]);
    return { text: `What year is ${roman}?`, type: 'multiple_choice', options: options, answer: year.toString(), hint: `Convert the Roman numeral to a number`, module: 'N03_Y5_NPV', level: level };
}

function generateRomanComplex(params, level) {
    const arabic = randomInt(Math.max(params.roman_min, 500), params.roman_max);
    const roman = toRoman(arabic);
    const distractors = generateDistractors(arabic, 3, params.roman_min, params.roman_max);
    const options = shuffle([arabic, ...distractors]);
    return { text: `What is ${roman} in numbers?`, type: 'multiple_choice', options: options, answer: arabic.toString(), hint: `Break down the Roman numeral into parts`, module: 'N03_Y5_NPV', level: level };
}

function generateIdentifyDigit(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const correctDigit = getDigitAtPlace(number, place);
    const distractors = new Set();
    params.places.forEach(p => { const d = getDigitAtPlace(number, p); if (d !== correctDigit) distractors.add(d); });
    while (distractors.size < 3) distractors.add(randomInt(0, 9));
    const options = shuffle([correctDigit, ...Array.from(distractors).slice(0, 3)]);
    return { text: `What digit is in the ${place} place in ${formatNumber(number)}?`, type: 'multiple_choice', options: options, answer: correctDigit.toString(), hint: `Look carefully at the ${place} position`, module: 'N03_Y5_NPV', level: level };
}

function generateIdentifyPlaceValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    if (digit === 0) return generateIdentifyPlaceValue(params, level);
    const correctValue = getPlaceValue(number, place);
    const distractors = new Set([digit]);
    params.places.forEach(p => { const val = getPlaceValue(number, p); if (val !== correctValue && val > 0) distractors.add(val); });
    while (distractors.size < 3) distractors.add(randomInt(1, params.max_value));
    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);
    return { text: `In ${formatNumber(number)}, what is the value of the ${digit}?`, type: 'multiple_choice', options: options, answer: correctValue.toString(), hint: `The ${digit} is in the ${place} place`, module: 'N03_Y5_NPV', level: level };
}

function generateDigitValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    if (digit === 0) return generateDigitValue(params, level);
    const value = getPlaceValue(number, place);
    const distractors = new Set([digit]);
    while (distractors.size < 3) distractors.add(randomInt(1, params.max_value));
    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);
    return { text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`, type: 'multiple_choice', options: options, answer: value.toString(), hint: `Look at which place the ${digit} is in`, module: 'N03_Y5_NPV', level: level };
}

function generateComparePlaceValues(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const places = shuffle([...params.places]).slice(0, 2);
    const digit1 = getDigitAtPlace(number, places[0]);
    const digit2 = getDigitAtPlace(number, places[1]);
    if (digit1 === 0 || digit2 === 0) return generateComparePlaceValues(params, level);
    const value1 = getPlaceValue(number, places[0]);
    const value2 = getPlaceValue(number, places[1]);
    const greaterDigit = value1 > value2 ? digit1 : digit2;
    return { text: `In ${formatNumber(number)}, which digit represents a greater value: ${digit1} or ${digit2}?`, type: 'multiple_choice', options: [digit1, digit2], answer: greaterDigit.toString(), hint: `Compare the place values: ${places[0]} vs ${places[1]}`, module: 'N03_Y5_NPV', level: level };
}

function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        const count = place === 'ones' ? value : value / getPlaceDivisor(place);
        return `${count} ${place}`;
    }).filter((_, idx) => decomp[params.places[idx]] > 0);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);
    return { text: `What number is ${parts.join(', ')}?`, type: 'multiple_choice', options: options, answer: number.toString(), hint: `Add up all the place values`, module: 'N03_Y5_NPV', level: level };
}

function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        return place === 'ones' ? value : value / getPlaceDivisor(place);
    });
    const placeLabels = params.places.map(p => `[${p.substring(0, 3)}]`).join(',');
    return { text: `Break down ${formatNumber(number)} into place values.\nEnter as: ${placeLabels}`, type: 'text_input', answer: parts.join(','), answers: parts, hint: `Count each place separately`, module: 'N03_Y5_NPV', level: level };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    return { text: `Write ${formatNumber(number)} in expanded form`, type: 'text_input', answer: expanded, hint: `Break into place values and add with + signs`, module: 'N03_Y5_NPV', level: level };
}

function generateStandardFromExpanded(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);
    return { text: `What is ${expanded} in standard form?`, type: 'multiple_choice', options: options, answer: number.toString(), hint: `Add all the parts together`, module: 'N03_Y5_NPV', level: level };
}

function generatePlaceComparison(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generatePlaceComparison(params, level);
    const place = randomChoice(params.places);
    const value1 = getPlaceValue(num1, place);
    const value2 = getPlaceValue(num2, place);
    const answer = value1 > value2 ? num1 : (value2 > value1 ? num2 : num1);
    return { text: `Which number has more ${place}: ${formatNumber(num1)} or ${formatNumber(num2)}?`, type: 'multiple_choice', options: [num1, num2], answer: answer.toString(), hint: `Look at the ${place} place in each number`, module: 'N03_Y5_NPV', level: level };
}

function generateAlternativeDecomposition(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const altDecomp = getAlternativeDecomposition(number, params.places);
    const normalDecomp = decomposeNumber(number, params.places);
    let modifiedPlace = null;
    for (const place of params.places) {
        if (altDecomp[place] !== normalDecomp[place] && place !== 'ones') {
            modifiedPlace = place;
            break;
        }
    }
    if (!modifiedPlace) return generateAlternativeDecomposition(params, level);
    const count = altDecomp[modifiedPlace] / getPlaceDivisor(modifiedPlace);
    const onesCount = altDecomp['ones'];
    return { text: `${formatNumber(number)} can also be written as [?] ${modifiedPlace} and ${onesCount} ones.\nWhat number goes in place of [?]?`, type: 'text_input', answer: count.toString(), hint: `Think about different ways to partition ${number}`, module: 'N03_Y5_NPV', level: level };
}

function generateMultipleRepresentations(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const representations = [formatNumber(number), expanded, `${number} ones`];
    const correctRep = randomChoice(representations.slice(0, 2));
    const distractors = representations.filter(r => r !== correctRep).slice(0, 3);
    const options = shuffle([correctRep, ...distractors]);
    return { text: `Which of these represents the same value as ${formatNumber(number)}?`, type: 'multiple_choice', options: options, answer: correctRep, hint: `All these should equal ${number}`, module: 'N03_Y5_NPV', level: level };
}

function getPlaceDivisor(place) {
    const divisors = { 'ones': 1, 'tens': 10, 'hundreds': 100, 'thousands': 1000, 'ten thousands': 10000, 'hundred thousands': 100000 };
    return divisors[place] || 1;
}

export default {
    moduleId: 'N03_Y5_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N03_Y5_NPV_placevalue.js ---

--- START FILE: src\generators\N03_Y6_NPV_placevalue.js ---
```javascript
/**
 * Year 6 Place Value Question Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    getExpandedForm,
    getAlternativeDecomposition,
    generateNumberWithZero,
    generateDistractors
} from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        places: math.placeValue.places,
        include_zero: math.placeValue.includeZero
    });

    switch(operation) {
        case 'identify_digit': return generateIdentifyDigit(getFlatParams(), level);
        case 'identify_place_value': return generateIdentifyPlaceValue(getFlatParams(), level);
        case 'digit_value': return generateDigitValue(getFlatParams(), level);
        case 'compare_place_values': return generateComparePlaceValues(getFlatParams(), level);
        case 'compose_simple': return generateComposeSimple(getFlatParams(), level);
        case 'decompose_simple': return generateDecomposeSimple(getFlatParams(), level);
        case 'expanded_form': return generateExpandedForm(getFlatParams(), level);
        case 'standard_from_expanded': return generateStandardFromExpanded(getFlatParams(), level);
        case 'place_comparison': return generatePlaceComparison(getFlatParams(), level);
        case 'alternative_decomposition': return generateAlternativeDecomposition(getFlatParams(), level);
        case 'multiple_representations': return generateMultipleRepresentations(getFlatParams(), level);
        case 'complex_place_value': return generateComplexPlaceValue(getFlatParams(), level);
        default: return generateIdentifyDigit(getFlatParams(), level);
    }
}

function generateIdentifyDigit(params, level) {
    const number = params.include_zero ? generateNumberWithZero(params.min_value, params.max_value, Math.random() < 0.3) : randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const correctDigit = getDigitAtPlace(number, place);
    const distractors = new Set();
    params.places.forEach(p => { const d = getDigitAtPlace(number, p); if (d !== correctDigit) distractors.add(d); });
    while (distractors.size < 3) distractors.add(randomInt(0, 9));
    const options = shuffle([correctDigit, ...Array.from(distractors).slice(0, 3)]);
    return { text: `What digit is in the ${place} place in ${formatNumber(number)}?`, type: 'multiple_choice', options: options, answer: correctDigit.toString(), hint: `Look carefully at the ${place} position`, module: 'N03_Y6_NPV', level: level };
}

function generateIdentifyPlaceValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    if (digit === 0) return generateIdentifyPlaceValue(params, level);
    const correctValue = getPlaceValue(number, place);
    const distractors = new Set([digit]);
    params.places.forEach(p => { const v = getPlaceValue(number, p); if (v !== correctValue && v > 0) distractors.add(v); });
    while (distractors.size < 3) distractors.add(randomInt(1, params.max_value));
    const options = shuffle([correctValue, ...Array.from(distractors).slice(0, 3)]);
    return { text: `In ${formatNumber(number)}, what is the value of the ${digit}?`, type: 'multiple_choice', options: options, answer: correctValue.toString(), hint: `The ${digit} is in the ${place} place`, module: 'N03_Y6_NPV', level: level };
}

function generateDigitValue(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places);
    const digit = getDigitAtPlace(number, place);
    if (digit === 0) return generateDigitValue(params, level);
    const value = getPlaceValue(number, place);
    const distractors = new Set([digit]);
    while (distractors.size < 3) distractors.add(randomInt(1, params.max_value));
    const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);
    return { text: `In ${formatNumber(number)}, what does the digit ${digit} represent?`, type: 'multiple_choice', options: options, answer: value.toString(), hint: `Look at which place the ${digit} is in`, module: 'N03_Y6_NPV', level: level };
}

function generateComparePlaceValues(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const places = shuffle([...params.places]).slice(0, 2);
    const digit1 = getDigitAtPlace(number, places[0]);
    const digit2 = getDigitAtPlace(number, places[1]);
    if (digit1 === 0 || digit2 === 0) return generateComparePlaceValues(params, level);
    const value1 = getPlaceValue(number, places[0]);
    const value2 = getPlaceValue(number, places[1]);
    const greaterDigit = value1 > value2 ? digit1 : digit2;
    return { text: `In ${formatNumber(number)}, which digit represents a greater value: ${digit1} or ${digit2}?`, type: 'multiple_choice', options: [digit1, digit2], answer: greaterDigit.toString(), hint: `Compare the place values: ${places[0]} vs ${places[1]}`, module: 'N03_Y6_NPV', level: level };
}

function generateComposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        const count = place === 'ones' ? value : value / getPlaceDivisor(place);
        return `${count} ${place}`;
    }).filter((_, idx) => decomp[params.places[idx]] > 0);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);
    return { text: `What number is ${parts.join(', ')}?`, type: 'multiple_choice', options: options, answer: number.toString(), hint: `Add up all the place values`, module: 'N03_Y6_NPV', level: level };
}

function generateDecomposeSimple(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const decomp = decomposeNumber(number, params.places);
    const parts = params.places.map(place => {
        const value = decomp[place] || 0;
        return place === 'ones' ? value : value / getPlaceDivisor(place);
    });
    const placeLabels = params.places.map(p => `[${p.substring(0, 3)}]`).join(',');
    return { text: `Break down ${formatNumber(number)} into place values.\nEnter as: ${placeLabels}`, type: 'text_input', answer: parts.join(','), answers: parts, hint: `Count each place separately`, module: 'N03_Y6_NPV', level: level };
}

function generateExpandedForm(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    return { text: `Write ${formatNumber(number)} in expanded form`, type: 'text_input', answer: expanded, hint: `Break into place values and add with + signs`, module: 'N03_Y6_NPV', level: level };
}

function generateStandardFromExpanded(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const distractors = generateDistractors(number, 3, params.min_value, params.max_value);
    const options = shuffle([number, ...distractors]);
    return { text: `What is ${expanded} in standard form?`, type: 'multiple_choice', options: options, answer: number.toString(), hint: `Add all the parts together`, module: 'N03_Y6_NPV', level: level };
}

function generatePlaceComparison(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generatePlaceComparison(params, level);
    const place = randomChoice(params.places);
    const value1 = getPlaceValue(num1, place);
    const value2 = getPlaceValue(num2, place);
    const answer = value1 > value2 ? num1 : (value2 > value1 ? num2 : num1);
    return { text: `Which number has more ${place}: ${formatNumber(num1)} or ${formatNumber(num2)}?`, type: 'multiple_choice', options: [num1, num2], answer: answer.toString(), hint: `Look at the ${place} place in each number`, module: 'N03_Y6_NPV', level: level };
}

function generateAlternativeDecomposition(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const altDecomp = getAlternativeDecomposition(number, params.places);
    const normalDecomp = decomposeNumber(number, params.places);
    let modifiedPlace = null;
    for (const place of params.places) {
        if (altDecomp[place] !== normalDecomp[place] && place !== 'ones') {
            modifiedPlace = place;
            break;
        }
    }
    if (!modifiedPlace) return generateAlternativeDecomposition(params, level);
    const count = altDecomp[modifiedPlace] / getPlaceDivisor(modifiedPlace);
    const onesCount = altDecomp['ones'];
    return { text: `${formatNumber(number)} can also be written as [?] ${modifiedPlace} and ${onesCount} ones.\nWhat number goes in place of [?]?`, type: 'text_input', answer: count.toString(), hint: `Think about different ways to partition ${number}`, module: 'N03_Y6_NPV', level: level };
}

function generateMultipleRepresentations(params, level) {
    const number = randomInt(params.min_value, params.max_value);
    const expanded = getExpandedForm(number);
    const representations = [formatNumber(number), expanded, `${number} ones`];
    const correctRep = randomChoice(representations.slice(0, 2));
    const distractors = representations.filter(r => r !== correctRep).slice(0, 3);
    const options = shuffle([correctRep, ...distractors]);
    return { text: `Which of these represents the same value as ${formatNumber(number)}?`, type: 'multiple_choice', options: options, answer: correctRep, hint: `All these should equal ${number}`, module: 'N03_Y6_NPV', level: level };
}

function generateComplexPlaceValue(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const place = randomChoice(params.places.slice(1));
    const digit = getDigitAtPlace(num, place);
    const value = getPlaceValue(num, place);
    return { text: `In ${formatNumber(num)}, the digit ${digit} is in the ${place} place. What would the number be if this digit was doubled?`, type: 'text_input', answer: (num - value + (value * 2)).toString(), hint: `Double the value of the ${digit} in the ${place} place`, module: 'N03_Y6_NPV', level: level };
}

function getPlaceDivisor(place) {
    const divisors = { 'ones': 1, 'tens': 10, 'hundreds': 100, 'thousands': 1000, 'ten thousands': 10000, 'hundred thousands': 100000, 'millions': 1000000, 'ten millions': 10000000 };
    return divisors[place] || 1;
}

export default {
    moduleId: 'N03_Y6_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N03_Y6_NPV_placevalue.js ---

--- START FILE: src\generators\N04_Y1_NPV_representation.js ---
```javascript
/**
 * Year 1 Identify and Represent Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateUniqueNumbers
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML, createSimpleDotsHTML, createTenFrameHTML, createBase10BlocksHTML, createTallyMarksHTML } from './helpers/N04_simpleVisuals.js';
import { buildScenarioQuestion, buildTwoWayComparisonQuestion } from './helpers/N04_scenarioTemplates.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    switch(operation) {
        case 'number_line_position': return generateNumberLinePosition(math, presentation, level);
        case 'count_objects': return generateCountObjects(math, level);
        case 'compare_language': return generateCompareLanguage(math, presentation, level);
        case 'identify_most_least': return generateIdentifyMostLeast(math, level);
        case 'number_line_between': return generateNumberLineBetween(math, presentation, level);
        default: return generateNumberLinePosition(math, presentation, level);
    }
}

function generateNumberLinePosition(math, presentation, level) {
    const number_line_max = presentation.numberLine.max;
    const targetNumber = randomInt(0, number_line_max);
    const numberLineHTML = createSimpleNumberLineHTML(0, number_line_max, targetNumber, level <= 2);
    const options = [targetNumber];
    const below = targetNumber - randomInt(1, 3); if (below >= 0) options.push(below);
    const above = targetNumber + randomInt(1, 3); if (above <= number_line_max) options.push(above);
    while (options.length < 3) { const rand = randomInt(0, number_line_max); if (!options.includes(rand)) options.push(rand); }
    return { text: `Look at the number line. Which number is shown by the arrow?\n\n${numberLineHTML}`, type: 'multiple_choice', options: shuffle(options), answer: String(targetNumber), hint: 'Find where the arrow points', module: 'N04_Y1_NPV', level: level };
}

function generateCountObjects(math, level) {
    const { min, max } = math.range;
    const count = randomInt(min, max);
    const color = randomChoice(['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']);
    let visualHTML, questionText;

    if (count <= 10 && level <= 2) { visualHTML = createTenFrameHTML(count, color); questionText = 'How many cells are filled in the ten frame?'; }
    else if (count >= 10 && count % 5 === 0 && level >= 3) { visualHTML = createTallyMarksHTML(count); questionText = 'How many tally marks do you see?'; }
    else if (count >= 10 && level >= 3) { visualHTML = createBase10BlocksHTML(count); questionText = 'How many blocks do you see in total?'; }
    else { visualHTML = createSimpleDotsHTML(count, 5, color); questionText = 'How many dots do you see?'; }

    if (count > 20) {
        const options = [count];
        [count - randomInt(1, 5), count + randomInt(1, 5), count + randomInt(6, 10)].forEach(d => { if (d >= min && d <= max && !options.includes(d)) options.push(d); });
        while (options.length < 4) { const r = randomInt(min, max); if (!options.includes(r) && Math.abs(r - count) > 0) options.push(r); }
        return { text: `${questionText}\n\n${visualHTML}`, type: 'multiple_choice', options: shuffle(options), answer: String(count), hint: 'Count carefully', module: 'N04_Y1_NPV', level: level };
    }
    return { text: `${questionText}\n\n${visualHTML}`, type: 'text_input', answer: String(count), hint: 'Count carefully', module: 'N04_Y1_NPV', level: level };
}

function generateCompareLanguage(math, presentation, level, attempt = 0) {
    if (attempt >= 10) return generateNumberLinePosition(math, presentation, level);
    const { min, max } = math.range;
    const word = randomChoice(presentation.comparison.words);

    if (word === 'most' || word === 'least') {
        const numberCount = randomChoice([3, 4]);
        const numbers = generateUniqueNumbers(numberCount, min, max);
        const scenarioQuestion = buildScenarioQuestion(numbers, word);
        return { text: scenarioQuestion.text, type: 'multiple_choice', options: scenarioQuestion.options, answer: scenarioQuestion.answer, hint: word === 'most' ? 'Find biggest' : 'Find smallest', module: 'N04_Y1_NPV', level: level };
    }

    let num1 = randomInt(min, max);
    let num2 = randomInt(min, max);
    if (word === 'equal to') { if (Math.random() < 0.5) num2 = num1; else while (num2 === num1) num2 = randomInt(min, max); }
    else if (num1 === num2) return generateCompareLanguage(math, presentation, level, attempt + 1);

    const scenarioQuestion = buildTwoWayComparisonQuestion(num1, num2, word);
    let hint = 'Think carefully';
    if (['more than', 'more'].includes(word)) hint = 'Find bigger number';
    if (['fewer', 'less than', 'less'].includes(word)) hint = 'Find smaller number';
    if (['equal to', 'same'].includes(word)) hint = 'Check if same';

    return { text: scenarioQuestion.text, type: 'multiple_choice', options: scenarioQuestion.options, answer: scenarioQuestion.answer, hint: hint, module: 'N04_Y1_NPV', level: level };
}

function generateIdentifyMostLeast(math, level) {
    const { min, max } = math.range;
    const numbers = generateUniqueNumbers(3, min, max);
    const type = randomChoice(['most', 'least']);
    const answer = type === 'most' ? Math.max(...numbers) : Math.min(...numbers);
    return { text: `Which of these numbers is the ${type}?\n\n${numbers.join('   ')}`, type: 'multiple_choice', options: numbers, answer: answer.toString(), hint: type === 'most' ? 'Biggest' : 'Smallest', module: 'N04_Y1_NPV', level: level };
}

function generateNumberLineBetween(math, presentation, level, attempt = 0) {
    if (attempt >= 10) return generateNumberLinePosition(math, presentation, level);
    const max = presentation.numberLine.max;
    const num1 = randomInt(0, max - 2);
    const num2 = num1 + randomInt(2, 5);
    if (num2 - num1 <= 1) return generateNumberLineBetween(math, presentation, level, attempt + 1);

    const between = randomInt(num1 + 1, num2 - 1);
    const visual = `${num1} ─────── ? ─────── ${num2}`;
    const distractors = [num1, num2, between - 1, between + 1].filter(d => d > num1 && d < num2 && d !== between);
    const options = shuffle([between, ...distractors.slice(0, 3)]);

    return { text: `Which number comes between ${num1} and ${num2}?\n\n${visual}`, type: 'multiple_choice', options: options, answer: between.toString(), hint: `Find number in middle`, module: 'N04_Y1_NPV', level: level };
}

export default {
    moduleId: 'N04_Y1_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N04_Y1_NPV_representation.js ---

--- START FILE: src\generators\N04_Y2_NPV_representation.js ---
```javascript
/**
 * Year 2 Identify, Represent and Estimate Numbers Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateEstimationText,
    findRange,
    formatRange,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    generateUniqueNumbers,
    findClosestMark,
    generateNumberLineMarks
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML } from './helpers/N04_simpleVisuals.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    // Flattener helper
    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        number_line_max: presentation.numberLine.max,
        estimation_ranges: math.estimation.ranges,
        place_value_max: math.placeValue.max
    });

    switch(operation) {
        case 'number_line_position': return generateNumberLinePosition(getFlatParams(), level);
        case 'number_line_between': return generateNumberLineBetween(getFlatParams(), level);
        case 'number_line_jump': return generateNumberLineJump(getFlatParams(), level);
        case 'estimate_group': return generateEstimateGroup(getFlatParams(), level);
        case 'place_value_representation': return generatePlaceValueQuestion(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'partition_number': return generatePartitionNumber(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'number_line_multiple_positions': return generateNumberLineMultiplePositions(getFlatParams(), level);
        default: return generateNumberLinePosition(getFlatParams(), level);
    }
}

function generateNumberLinePosition(params, level) {
    const target = randomInt(0, params.number_line_max);
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, level === 1);
    return { text: `What number is marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Check position', module: 'N04_Y2_NPV', level: level };
}

function generateNumberLineBetween(params, level) {
    const p1 = randomInt(Math.floor(params.number_line_max * 0.3), Math.floor(params.number_line_max * 0.4));
    const p2 = randomInt(Math.floor(params.number_line_max * 0.6), Math.floor(params.number_line_max * 0.7));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, null, true);
    return { text: `Name a number between ${formatNumber(p1)} and ${formatNumber(p2)} on this line:\n\n${html}`, type: 'text_input', answer: String(randomInt(p1+1, p2-1)), acceptableRange: { min: p1+1, max: p2-1 }, hint: 'Any number between them', module: 'N04_Y2_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 30);
    const jump = randomChoice([2, 5, 10]);
    const num = randomInt(2, 4);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start at ${start}. Jump forward ${num} times, each jump of ${jump}. Where do you land?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump by count, add to start`, module: 'N04_Y2_NPV', level: level };
}

function generateEstimateGroup(params, level) {
    const count = randomInt(params.min_value, params.max_value);
    const offset = Math.floor(params.max_value / 10);
    const options = shuffle(Array.from(new Set([count, Math.max(params.min_value, count-offset), Math.min(params.max_value, count+offset), Math.max(params.min_value, count-Math.floor(offset/2))])).slice(0, 4));
    return { text: `About how many objects if you see a group close to ${count}?`, type: 'multiple_choice', options: options, answer: count.toString(), hint: `Look for closest number`, module: 'N04_Y2_NPV', level: level };
}

function generatePlaceValueQuestion(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const num = randomInt(params.min_value, Math.min(params.max_value, params.place_value_max));
    const rep = generatePlaceValueRepresentation(num);
    const places = Object.keys(rep);
    if (places.length === 0) return generatePlaceValueQuestion(params, level, attempt + 1);
    const place = randomChoice(places);
    const val = rep[place];
    const allVals = Object.values(rep);
    const distractors = allVals.filter(v => v !== val);
    const placeVals = { 'ones': 1, 'tens': 10, 'hundreds': 100 };
    if (placeVals[place]) {
        const d = Math.floor((num % (placeVals[place]*10))/placeVals[place]);
        if (d !== val) distractors.push(d);
    }
    return { text: `In ${formatNumber(num)}, what is the value of the digit in the ${place} place?`, type: 'multiple_choice', options: shuffle([val, ...distractors.slice(0, 3)]), answer: val.toString(), hint: `Think place value`, module: 'N04_Y2_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateNumberLinePosition(params, level);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find the range`, module: 'N04_Y2_NPV', level: level };
}

function generatePartitionNumber(params, level) {
    const num = randomInt(Math.max(params.min_value, 10), Math.min(params.max_value, params.place_value_max));
    return { text: `Write ${formatNumber(num)} as sum of place values`, type: 'text_input', answer: generatePartitionText(num).replace(/\s/g, ''), hint: `Tens + Ones`, module: 'N04_Y2_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(num1, num2, op);
    const exact = op === 'add' ? num1 + num2 : num1 - num2;
    const distractors = [exact, est+10, est-10, Math.round(exact/10)*10].filter(d => d !== est && d >= 0);
    return { text: generateEstimationCalculationText(num1, num2, op), type: 'multiple_choice', options: shuffle([est, ...distractors.slice(0, 3)]), answer: est.toString(), hint: `Round first`, module: 'N04_Y2_NPV', level: level };
}

function generateNumberLineMultiplePositions(params, level) {
    const nums = generateUniqueNumbers(3, 0, params.number_line_max);
    const target = randomChoice(nums);
    const marks = generateNumberLineMarks(0, params.number_line_max, 10);
    const correct = findClosestMark(target, marks);
    const distractors = marks.filter(m => m !== correct).slice(0, 3);
    return { text: `On a number line 0 to ${params.number_line_max}, numbers are ${nums.map(n => formatNumber(n)).join(', ')}. Which is ${formatNumber(target)}?`, type: 'multiple_choice', options: shuffle([target, ...distractors]), answer: target.toString(), hint: `Find position`, module: 'N04_Y2_NPV', level: level };
}

export default {
    moduleId: 'N04_Y2_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N04_Y2_NPV_representation.js ---

--- START FILE: src\generators\N04_Y3_NPV_representation.js ---
```javascript
/**
 * Year 3 Identify, Represent and Estimate Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateNumberLineMarks,
    findClosestMark,
    describeNumberLinePosition,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateEstimationText,
    findRange,
    formatRange,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    calculateMidpoint,
    generateUniqueNumbers
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML } from './helpers/N04_simpleVisuals.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        number_line_max: presentation.numberLine.max,
        estimation_ranges: math.estimation.ranges,
        place_value_max: math.placeValue.max
    });

    switch(operation) {
        case 'number_line_position': return generateNumberLinePosition(getFlatParams(), level);
        case 'number_line_between': return generateNumberLineBetween(getFlatParams(), level);
        case 'number_line_jump': return generateNumberLineJump(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'place_value_representation': return generatePlaceValueQuestion(getFlatParams(), level);
        case 'partition_number': return generatePartitionNumber(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'estimate_midpoint': return generateEstimateMidpoint(getFlatParams(), level);
        case 'number_line_multiple_positions': return generateNumberLineMultiplePositions(getFlatParams(), level);
        case 'compare_representations': return generateCompareRepresentations(getFlatParams(), level);
        default: return generateNumberLinePosition(getFlatParams(), level);
    }
}

// Similar logic to Y2, adjusted for Y3 complexity
function generateNumberLinePosition(params, level) {
    const target = randomInt(params.min_value, Math.min(params.max_value, params.number_line_max));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, false);
    return { text: `What number is marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Use marks to estimate', module: 'N04_Y3_NPV', level: level };
}

function generateNumberLineBetween(params, level) {
    const n1 = randomInt(params.min_value, params.max_value - 50);
    const n2 = n1 + randomInt(20, 50);
    const bet = randomInt(n1+5, n2-5);
    const opts = shuffle([bet, n1, n2, Math.floor((n1+n2)/2)].filter(d => d!==bet));
    return { text: `Which comes between ${formatNumber(n1)} and ${formatNumber(n2)}?`, type: 'multiple_choice', options: opts, answer: bet.toString(), hint: `Greater than ${n1}, less than ${n2}`, module: 'N04_Y3_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 200);
    const jump = randomChoice([10, 25, 50, 100]);
    const num = randomInt(2, 5);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start at ${formatNumber(start)}. Jump forward ${num} times by ${formatNumber(jump)}. Where do you land?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump by count, add to start`, module: 'N04_Y3_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateNumberLinePosition(params, level);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y3_NPV', level: level };
}

function generatePlaceValueQuestion(params, level) {
    const num = randomInt(Math.max(params.min_value, 100), Math.min(params.max_value, params.place_value_max));
    const rep = generatePlaceValueRepresentation(num);
    const places = Object.keys(rep);
    const place = randomChoice(places);
    const val = rep[place];
    const distractors = Object.values(rep).filter(v => v !== val);
    return { text: `In ${formatNumber(num)}, value of digit in ${place} place?`, type: 'multiple_choice', options: shuffle([val, ...distractors.slice(0, 3)]), answer: val.toString(), hint: `Think place value`, module: 'N04_Y3_NPV', level: level };
}

function generatePartitionNumber(params, level) {
    const num = randomInt(Math.max(params.min_value, 100), Math.min(params.max_value, params.place_value_max));
    return { text: `Write ${formatNumber(num)} as sum of place values`, type: 'text_input', answer: generatePartitionText(num).replace(/\s/g, ''), hint: `Hundreds + Tens + Ones`, module: 'N04_Y3_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(n1, n2, op);
    const exact = op === 'add' ? n1+n2 : n1-n2;
    const distractors = [exact, est+50, est-50].filter(d => d!==est && d>=0);
    return { text: generateEstimationCalculationText(n1, n2, op), type: 'multiple_choice', options: shuffle([est, ...distractors]), answer: est.toString(), hint: `Round first`, module: 'N04_Y3_NPV', level: level };
}

function generateEstimateMidpoint(params, level) {
    const n1 = randomInt(params.min_value, params.max_value-100);
    const n2 = n1 + randomInt(100, 300);
    const mid = calculateMidpoint(n1, n2);
    const distractors = [mid+50, mid-50, n1+50].filter(d => d!==mid);
    return { text: `Number halfway between ${formatNumber(n1)} and ${formatNumber(n2)}?`, type: 'multiple_choice', options: shuffle([mid, ...distractors]), answer: mid.toString(), hint: `Add and divide by 2`, module: 'N04_Y3_NPV', level: level };
}

function generateNumberLineMultiplePositions(params, level) {
    const nums = generateUniqueNumbers(3, params.min_value, Math.min(params.max_value, params.number_line_max));
    const target = randomChoice(nums);
    const marks = generateNumberLineMarks(0, params.number_line_max, 10);
    const correct = findClosestMark(target, marks);
    const distractors = marks.filter(m => m !== correct).slice(0, 3);
    return { text: `On 0-${formatNumber(params.number_line_max)} line, marks: ${nums.map(n=>formatNumber(n)).join(', ')}. Which is ${formatNumber(target)}?`, type: 'multiple_choice', options: shuffle([target, ...distractors]), answer: target.toString(), hint: `Find position`, module: 'N04_Y3_NPV', level: level };
}

function generateCompareRepresentations(params, level) {
    const num = randomInt(Math.max(params.min_value, 100), params.max_value);
    const part = generatePartitionText(num);
    const q = randomChoice([{ text: `Same as ${part}?`, ans: num }, { text: `${formatNumber(num)} as sum?`, ans: part.replace(/\s/g, '') }]);
    if (typeof q.ans === 'number') {
        const opts = shuffle([num, num+100, num-100, num+10].filter(d => d!==num));
        return { text: q.text, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: `Calculate sum`, module: 'N04_Y3_NPV', level: level };
    }
    return { text: q.text, type: 'text_input', answer: q.ans, hint: `Break into place values`, module: 'N04_Y3_NPV', level: level };
}

export default {
    moduleId: 'N04_Y3_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N04_Y3_NPV_representation.js ---

--- START FILE: src\generators\N04_Y4_NPV_representation.js ---
```javascript
/**
 * Year 4 Identify, Represent, Estimate and Round Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    findRange,
    formatRange,
    generateEstimationText,
    generatePlaceValueRepresentation,
    generatePartitionText,
    generateEstimationCalculationText,
    calculateRoughEstimate,
    calculateMidpoint
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML } from './helpers/N04_simpleVisuals.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        number_line_max: presentation.numberLine.max,
        estimation_ranges: math.estimation.ranges,
        rounding_bases: math.rounding.bases
    });

    switch(operation) {
        case 'number_line_position': return generateNumberLinePosition(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'round_to_ten': return generateRounding(getFlatParams(), level, 10);
        case 'round_to_hundred': return generateRounding(getFlatParams(), level, 100);
        case 'round_to_thousand': return generateRounding(getFlatParams(), level, 1000);
        case 'place_value_representation': return generatePlaceValueQuestion(getFlatParams(), level);
        case 'partition_number': return generatePartitionNumber(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'estimate_midpoint': return generateEstimateMidpoint(getFlatParams(), level);
        case 'compare_rounded': return generateCompareRounded(getFlatParams(), level);
        case 'number_line_jump': return generateNumberLineJump(getFlatParams(), level);
        default: return generateNumberLinePosition(getFlatParams(), level);
    }
}

function generateNumberLinePosition(params, level) {
    const target = randomInt(params.min_value, Math.min(params.max_value, params.number_line_max));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, false);
    return { text: `What number is marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Use scale', module: 'N04_Y4_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateNumberLinePosition(params, level);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y4_NPV', level: level };
}

function generateRounding(params, level, base) {
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    const name = base === 10 ? '10' : base === 100 ? '100' : '1,000';
    return { text: `Round ${formatNumber(num)} to the nearest ${name}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Look at digit to right`, module: 'N04_Y4_NPV', level: level };
}

function generatePlaceValueQuestion(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const rep = generatePlaceValueRepresentation(num);
    const place = randomChoice(Object.keys(rep));
    const val = rep[place];
    const distractors = Object.values(rep).filter(v => v !== val);
    return { text: `In ${formatNumber(num)}, value of digit in ${place}?`, type: 'multiple_choice', options: shuffle([val, ...distractors.slice(0, 3)]), answer: val.toString(), hint: `Think place value`, module: 'N04_Y4_NPV', level: level };
}

function generatePartitionNumber(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    return { text: `Write ${formatNumber(num)} as sum of place values`, type: 'text_input', answer: generatePartitionText(num).replace(/\s/g, ''), hint: `Break down number`, module: 'N04_Y4_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(n1, n2, op);
    const exact = op === 'add' ? n1+n2 : n1-n2;
    const distractors = [exact, est+100, est-100].filter(d => d!==est);
    return { text: generateEstimationCalculationText(n1, n2, op), type: 'multiple_choice', options: shuffle([est, ...distractors]), answer: est.toString(), hint: `Round first`, module: 'N04_Y4_NPV', level: level };
}

function generateEstimateMidpoint(params, level) {
    const n1 = randomInt(params.min_value, params.max_value-100);
    const n2 = n1 + randomInt(100, 500);
    const mid = calculateMidpoint(n1, n2);
    const distractors = [mid+50, mid-50, n1+100].filter(d => d!==mid);
    return { text: `Halfway between ${formatNumber(n1)} and ${formatNumber(n2)}?`, type: 'multiple_choice', options: shuffle([mid, ...distractors]), answer: mid.toString(), hint: `Add and divide by 2`, module: 'N04_Y4_NPV', level: level };
}

function generateCompareRounded(params, level) {
    const base = randomChoice(params.rounding_bases);
    const n1 = generateNonMultiple(params.min_value, params.max_value, base);
    const n2 = generateNonMultiple(params.min_value, params.max_value, base);
    const r1 = roundToNearest(n1, base);
    const r2 = roundToNearest(n2, base);
    const q = randomChoice([
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which is larger?`, ans: Math.max(r1, r2) },
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which is smaller?`, ans: Math.min(r1, r2) }
    ]);
    return { text: q.text, type: 'multiple_choice', options: [r1, r2], answer: q.ans.toString(), hint: `Round then compare`, module: 'N04_Y4_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 500);
    const jump = randomChoice([10, 50, 100, 200]);
    const num = randomInt(2, 5);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start at ${formatNumber(start)}. Jump forward ${num} times by ${formatNumber(jump)}. Where?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump by count, add`, module: 'N04_Y4_NPV', level: level };
}

export default {
    moduleId: 'N04_Y4_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N04_Y4_NPV_representation.js ---

--- START FILE: src\generators\N04_Y5_NPV_representation.js ---
```javascript
/**
 * Year 5 Round to 1,000,000 Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    findRange,
    formatRange,
    generateEstimationText,
    calculateRoughEstimate,
    chooseAppropriateRoundingBase
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML } from './helpers/N04_simpleVisuals.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        number_line_max: presentation.numberLine.max,
        estimation_ranges: math.estimation.ranges,
        rounding_bases: math.rounding.bases
    });

    switch(operation) {
        case 'round_to_ten': return generateRounding(getFlatParams(), level, 10);
        case 'round_to_hundred': return generateRounding(getFlatParams(), level, 100);
        case 'round_to_thousand': return generateRounding(getFlatParams(), level, 1000);
        case 'round_to_ten_thousand': return generateRounding(getFlatParams(), level, 10000);
        case 'round_to_hundred_thousand': return generateRounding(getFlatParams(), level, 100000);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'compare_rounded': return generateCompareRounded(getFlatParams(), level);
        case 'choose_appropriate_rounding': return generateChooseAppropriateRounding(getFlatParams(), level);
        case 'number_line_position': return generateNumberLinePosition(getFlatParams(), level);
        case 'number_line_jump': return generateNumberLineJump(getFlatParams(), level);
        default: return generateRounding(getFlatParams(), level, 1000);
    }
}

function generateRounding(params, level, base) {
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    return { text: `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Check digit to right`, module: 'N04_Y5_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateRounding(params, level, 1000);
    return { text: generateEstimationText(num, params.estimation_ranges), type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y5_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract']);
    const est = calculateRoughEstimate(n1, n2, op);
    const exact = op === 'add' ? n1+n2 : n1-n2;
    const distractors = [exact, est+10000, est-10000].filter(d => d!==est && d>0);
    const symb = op === 'add' ? '+' : '-';
    return { text: `Estimate ${formatNumber(n1)} ${symb} ${formatNumber(n2)}`, type: 'multiple_choice', options: shuffle([est, ...distractors.slice(0, 3)]), answer: est.toString(), hint: `Round then calc`, module: 'N04_Y5_NPV', level: level };
}

function generateCompareRounded(params, level) {
    const base = randomChoice(params.rounding_bases);
    const n1 = generateNonMultiple(params.min_value, params.max_value, base);
    const n2 = generateNonMultiple(params.min_value, params.max_value, base);
    const r1 = roundToNearest(n1, base);
    const r2 = roundToNearest(n2, base);
    if (r1 === r2) return generateCompareRounded(params, level);
    const q = randomChoice([
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which larger?`, ans: Math.max(r1, r2) },
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Which smaller?`, ans: Math.min(r1, r2) }
    ]);
    return { text: q.text, type: 'multiple_choice', options: [r1, r2], answer: q.ans.toString(), hint: `Round then compare`, module: 'N04_Y5_NPV', level: level };
}

function generateChooseAppropriateRounding(params, level) {
    const context = randomChoice(['population', 'money', 'distance']);
    const num = randomInt(params.min_value, params.max_value);
    const base = chooseAppropriateRoundingBase(context, num);
    const options = [100, 1000, 10000, 100000].filter(b => b <= params.max_value).map(b => formatNumber(b));
    const questions = {
        'population': `City pop is ${formatNumber(num)}. Rounding for summary?`,
        'money': `Revenue is £${formatNumber(num)}. Rounding for report?`,
        'distance': `Distance is ${formatNumber(num)}m. Rounding for estimation?`
    };
    return { text: questions[context], type: 'multiple_choice', options: options, answer: formatNumber(base), hint: `Think accuracy needed`, module: 'N04_Y5_NPV', level: level };
}

function generateNumberLinePosition(params, level) {
    const target = randomInt(params.min_value, Math.min(params.max_value, params.number_line_max));
    const html = createSimpleNumberLineHTML(0, params.number_line_max, target, false);
    return { text: `What number marked?\n\n${html}`, type: 'text_input', answer: String(target), hint: 'Use scale', module: 'N04_Y5_NPV', level: level };
}

function generateNumberLineJump(params, level, attempt=0) {
    if (attempt >= 10) return generateNumberLinePosition(params, level);
    const start = randomInt(0, params.number_line_max - 50000);
    const jump = randomChoice([1000, 5000, 10000]);
    const num = randomInt(2, 5);
    const end = start + (jump * num);
    if (end > params.number_line_max) return generateNumberLineJump(params, level, attempt + 1);
    return { text: `Start ${formatNumber(start)}. Jump ${num} times by ${formatNumber(jump)}. Where?`, type: 'text_input', answer: end.toString(), hint: `Multiply jump, add`, module: 'N04_Y5_NPV', level: level };
}

export default {
    moduleId: 'N04_Y5_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N04_Y5_NPV_representation.js ---

--- START FILE: src\generators\N04_Y6_NPV_representation.js ---
```javascript
/**
 * Year 6 Round to Any Degree of Accuracy Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    roundToNearest,
    generateNonMultiple,
    generateRoundingDistractors,
    calculateRoughEstimate,
    getErrorBounds,
    chooseAppropriateRoundingBase,
    findRange,
    formatRange
} from './helpers/N04_representationHelpers.js';
import { createSimpleNumberLineHTML } from './helpers/N04_simpleVisuals.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const getFlatParams = () => ({
        min_value: math.range.min,
        max_value: math.range.max,
        number_line_max: presentation.numberLine.max,
        estimation_ranges: math.estimation.ranges,
        rounding_bases: math.rounding.bases
    });

    switch(operation) {
        case 'round_to_thousand': return generateRounding(getFlatParams(), level, 1000);
        case 'round_to_ten_thousand': return generateRounding(getFlatParams(), level, 10000);
        case 'round_to_hundred_thousand': return generateRounding(getFlatParams(), level, 100000);
        case 'round_to_million': return generateRounding(getFlatParams(), level, 1000000);
        case 'round_to_ten_million': return generateRounding(getFlatParams(), level, 10000000);
        case 'round_to_any_place': return generateRoundToAnyPlace(getFlatParams(), level);
        case 'estimate_calculation': return generateEstimateCalculation(getFlatParams(), level);
        case 'compare_rounded': return generateCompareRounded(getFlatParams(), level);
        case 'choose_appropriate_rounding': return generateChooseAppropriateRounding(getFlatParams(), level);
        case 'error_bounds': return generateErrorBounds(getFlatParams(), level);
        case 'estimate_position': return generateEstimatePosition(getFlatParams(), level);
        default: return generateRounding(getFlatParams(), level, 1000000);
    }
}

function generateRounding(params, level, base) {
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    return { text: `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Check digit to right`, module: 'N04_Y6_NPV', level: level };
}

function generateRoundToAnyPlace(params, level) {
    const base = randomChoice(params.rounding_bases);
    const num = generateNonMultiple(params.min_value + base, params.max_value - base, base);
    const rounded = roundToNearest(num, base);
    const options = shuffle([rounded, ...generateRoundingDistractors(num, base).slice(0, 3)]);
    return { text: `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`, type: 'multiple_choice', options: options, answer: rounded.toString(), hint: `Identify place value`, module: 'N04_Y6_NPV', level: level };
}

function generateEstimateCalculation(params, level) {
    const n1 = randomInt(params.min_value, params.max_value);
    const n2 = randomInt(Math.floor(params.min_value/2), Math.floor(params.max_value/2));
    const op = randomChoice(['add', 'subtract', 'multiply']);
    const est = calculateRoughEstimate(n1, n2, op);
    let exact = op === 'add' ? n1+n2 : op === 'subtract' ? n1-n2 : n1*n2;
    const distractors = [exact, est+100000, est-100000].filter(d => d!==est && d>0);
    const symb = { 'add': '+', 'subtract': '-', 'multiply': '×' }[op];
    return { text: `Estimate ${formatNumber(n1)} ${symb} ${formatNumber(n2)}`, type: 'multiple_choice', options: shuffle([est, ...distractors.slice(0, 3)]), answer: est.toString(), hint: `Round then calc`, module: 'N04_Y6_NPV', level: level };
}

function generateCompareRounded(params, level) {
    const base = randomChoice(params.rounding_bases.filter(b => b >= 1000));
    const n1 = generateNonMultiple(params.min_value, params.max_value, base);
    const n2 = generateNonMultiple(params.min_value, params.max_value, base);
    const r1 = roundToNearest(n1, base);
    const r2 = roundToNearest(n2, base);
    if (r1 === r2) return generateCompareRounded(params, level);
    const q = randomChoice([
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Larger?`, ans: Math.max(r1, r2) },
        { text: `Round ${formatNumber(n1)} and ${formatNumber(n2)} to nearest ${formatNumber(base)}. Difference?`, ans: Math.abs(Math.max(r1, r2) - Math.min(r1, r2)) }
    ]);
    if (q.text.includes('Difference')) {
        const opts = shuffle([q.ans, q.ans+base, q.ans-base].filter(d => d>0));
        return { text: q.text, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: `Round then diff`, module: 'N04_Y6_NPV', level: level };
    }
    return { text: q.text, type: 'multiple_choice', options: [r1, r2], answer: q.ans.toString(), hint: `Round then compare`, module: 'N04_Y6_NPV', level: level };
}

function generateChooseAppropriateRounding(params, level) {
    const context = randomChoice(['population', 'money', 'distance', 'time']);
    const num = randomInt(params.min_value, params.max_value);
    const base = chooseAppropriateRoundingBase(context, num);
    const options = [10, 100, 1000, 10000, 100000, 1000000].filter(b => b <= params.max_value).map(b => formatNumber(b));
    const q = { 'population': `City pop ${formatNumber(num)}. Rounding?`, 'money': `Revenue £${formatNumber(num)}. Rounding?`, 'distance': `Dist ${formatNumber(num)}m. Rounding?`, 'time': `Time ${formatNumber(num)}s. Rounding?` };
    return { text: q[context], type: 'multiple_choice', options: options, answer: formatNumber(base), hint: `Think context`, module: 'N04_Y6_NPV', level: level };
}

function generateErrorBounds(params, level) {
    const base = randomChoice(params.rounding_bases.filter(b => b >= 1000));
    const rounded = randomInt(Math.ceil(params.min_value/base), Math.floor(params.max_value/base)) * base;
    const [min, max] = getErrorBounds(rounded, base);
    const q = randomChoice([{ text: `Number rounded to ${formatNumber(base)} is ${formatNumber(rounded)}. Smallest possible?`, ans: Math.ceil(min) }, { text: `Number rounded to ${formatNumber(base)} is ${formatNumber(rounded)}. Largest possible?`, ans: Math.floor(max) }]);
    const opts = shuffle([q.ans, rounded, rounded-base, rounded+base].filter(d => d!==q.ans));
    return { text: q.text, type: 'multiple_choice', options: opts, answer: q.ans.toString(), hint: `Range rounding to this`, module: 'N04_Y6_NPV', level: level };
}

function generateEstimatePosition(params, level) {
    const num = randomInt(params.min_value, params.max_value);
    const range = findRange(num, params.estimation_ranges);
    if (!range) return generateRounding(params, level, 1000000);
    return { text: `Which range estimates ${formatNumber(num)}?`, type: 'multiple_choice', options: params.estimation_ranges.map(r => formatRange(r)), answer: formatRange(range), hint: `Find range`, module: 'N04_Y6_NPV', level: level };
}

export default {
    moduleId: 'N04_Y6_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N04_Y6_NPV_representation.js ---

--- START FILE: src\generators\N05_Y4_NPV_negatives.js ---
```javascript
/**
 * Year 4 Counting Through Zero Question Generator
 * Schema: V2
 */

import {
    randomChoice,
    randomInt,
    generateSequence,
    getGapPositions
} from './helpers/N01_countingHelpers.js';

function getPositiveStart(params, step) {
    const minStart = step * Math.ceil(params.sequence_length / 2);
    const maxPossibleStart = Math.min(params.max_value, step * params.sequence_length);
    return randomInt(minStart, maxPossibleStart);
}

function sequenceCrossesZero(sequence) {
    return sequence.some(n => n > 0) && sequence.some(n => n < 0);
}

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    // Flat params for helper logic
    const flatParams = {
        step_sizes: math.sequence.steps,
        sequence_length: math.sequence.length,
        gaps_count: presentation.gaps.count,
        gap_position: presentation.gaps.position,
        min_value: math.range.min,
        max_value: math.range.max,
        must_cross_zero: math.mustCrossZero
    };

    const step = randomChoice(flatParams.step_sizes);
    const direction = 'backwards';
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

    let start = getPositiveStart(flatParams, step);
    if (questionType === 'fill_blanks') start = Math.floor(start / (step * 2)) * (step * 2);
    else if (questionType === 'next_number') start = Math.floor(start / (step * 2)) * (step * 2) + step;

    const minPossibleStart = Math.abs(flatParams.min_value) + (step * (flatParams.sequence_length - 1));
    start = Math.max(start, minPossibleStart);

    let fullSequence = generateSequence(start, step, flatParams.sequence_length, direction);
    if (!sequenceCrossesZero(fullSequence)) {
        start = step * Math.ceil(flatParams.sequence_length / 2) + step;
        fullSequence = generateSequence(start, step, flatParams.sequence_length, direction);
    }

    return generateQuestionByType(questionType, fullSequence, flatParams, step, level);
}

function generateQuestionByType(type, fullSequence, params, step, level) {
    if (type === 'fill_blanks') {
        let effectiveGapPosition = params.gap_position === 'end' ? 'middle' : params.gap_position;
        let gapPositions = getGapPositions(params.sequence_length, params.gaps_count, effectiveGapPosition);
        gapPositions = gapPositions.map(pos => pos === params.sequence_length - 1 ? Math.floor(params.sequence_length / 2) : pos);
        const displaySequence = fullSequence.map((num, idx) => gapPositions.includes(idx) ? '___' : num.toString());
        const answers = gapPositions.map(pos => fullSequence[pos]);
        return { text: `Fill in missing: ${displaySequence.join(', ')}`, type: 'text_input', answer: answers.join(','), answers: answers, hint: `Count backwards in ${step}s through zero`, module: 'N05_Y4_NPV', level: level };
    }
    if (type === 'next_number') {
        const shown = fullSequence.slice(0, -1);
        const answer = fullSequence[fullSequence.length - 1];
        return { text: `Next number? ${shown.join(', ')}, ___`, type: 'text_input', answer: answer.toString(), hint: `Count backwards through zero`, module: 'N05_Y4_NPV', level: level };
    }
    if (type === 'multiple_choice') {
        const shown = fullSequence.slice(0, -1);
        const ans = fullSequence[fullSequence.length - 1];
        const distractors = [ans - step, ans + step, Math.abs(ans), -Math.abs(ans) - 1].filter(d => d !== ans);
        const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
        const options = [ans, ...uniqueDistractors].sort(() => Math.random() - 0.5);
        return { text: `Continue pattern: ${shown.join(', ')}, ___`, type: 'multiple_choice', options: options, answer: ans.toString(), hint: `Count backwards through zero`, module: 'N05_Y4_NPV', level: level };
    }
}

export default {
    moduleId: 'N05_Y4_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N05_Y4_NPV_negatives.js ---

--- START FILE: src\generators\N05_Y5_NPV_negatives.js ---
```javascript
/**
 * Year 5 Negative Numbers in Context Question Generator
 * Schema: V2
 */

import {
    randomChoice,
    randomInt,
    generateSequence,
    getGapPositions
} from './helpers/N01_countingHelpers.js';

function getStartValue(params, step, direction) {
    const { min_value, max_value, sequence_length } = params;
    if (direction === 'forwards') return randomInt(min_value, max_value - (step * (sequence_length - 1)));
    else return randomInt(min_value + (step * (sequence_length - 1)), max_value);
}

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    const flatParams = {
        step_sizes: math.sequence.steps,
        sequence_length: math.sequence.length,
        directions: math.sequence.directions,
        startStrategy: math.sequence.startStrategy,
        gaps_count: presentation.gaps.count,
        gap_position: presentation.gaps.position,
        min_value: math.range.min,
        max_value: math.range.max,
        temperature_range: math.range.temp,
        elevation_range: math.range.elevation
    };

    const contextType = randomChoice(presentation.contexts);

    if (contextType === 'temperature') return generateTemperatureQuestion(flatParams, level);
    else if (contextType === 'elevation' && flatParams.elevation_range) return generateElevationQuestion(flatParams, level);
    else return generateSequenceQuestion(flatParams, level);
}

function generateTemperatureQuestion(params, level) {
    const [tempMin, tempMax] = params.temperature_range;
    const type = randomChoice(['change', 'sequence']);

    if (type === 'change') {
        const start = randomInt(tempMin, tempMax);
        const change = randomInt(5, 20);
        const dir = randomChoice(['rise', 'fall']);
        const end = dir === 'rise' ? start + change : start - change;
        if (end < -50 || end > 50) return generateTemperatureQuestion(params, level);
        const text = dir === 'rise' ? `Temp is ${start}°C. Rises by ${change}°C. New temp?` : `Temp is ${start}°C. Falls by ${change}°C. New temp?`;
        return { text: text, type: 'text_input', answer: end.toString(), hint: `${dir === 'rise' ? 'Add' : 'Subtract'} ${change} from ${start}`, module: 'N05_Y5_NPV', level: level };
    } else {
        const step = randomChoice([1, 2, 5]);
        const dir = randomChoice(['forwards', 'backwards']);
        const len = randomInt(4, 6);
        const start = dir === 'forwards' ? randomInt(tempMin, tempMax - (step*len)) : randomInt(tempMin + (step*len), tempMax);
        const seq = generateSequence(start, step, len, dir);
        const shown = seq.slice(0, -1);
        const ans = seq[seq.length - 1];
        const changeWord = dir === 'forwards' ? 'rising' : 'falling';
        return { text: `Temp ${changeWord} by ${step}°C/hr. Readings: ${shown.join('°C, ')}°C, ___°C. Missing temp?`, type: 'text_input', answer: ans.toString(), hint: `Count ${dir} in ${step}s`, module: 'N05_Y5_NPV', level: level };
    }
}

function generateElevationQuestion(params, level) {
    const [min, max] = params.elevation_range;
    const scenarios = [{ c: 'sea level', u: 'm' }, { c: 'ground level', u: 'm' }, { c: 'floor level', u: '' }];
    const sc = randomChoice(scenarios);
    const start = randomInt(min, max);
    const change = randomInt(10, 50);
    const dir = randomChoice(['up', 'down']);
    const end = dir === 'up' ? start + change : start - change;
    if (end < min || end > max) return generateElevationQuestion(params, level);

    const startDesc = start === 0 ? sc.c : start > 0 ? `${start}${sc.u} above` : `${Math.abs(start)}${sc.u} below`;
    const text = `Diver at ${startDesc}. Moves ${dir} ${change}${sc.u}. Where now?`;
    return { text: text, type: 'text_input', answer: end.toString(), hint: `${dir === 'up' ? 'Add' : 'Subtract'} ${change}`, module: 'N05_Y5_NPV', level: level };
}

function generateSequenceQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const dir = randomChoice(params.directions);
    const start = getStartValue(params, step, dir);
    const seq = generateSequence(start, step, params.sequence_length, dir);

    // Simple gaps logic
    const gaps = getGapPositions(params.sequence_length, params.gaps_count, params.gap_position === 'end' ? 'middle' : params.gap_position);
    const display = seq.map((n, i) => gaps.includes(i) ? '___' : n);
    const ans = gaps.map(i => seq[i]);
    return { text: `Fill missing: ${display.join(', ')}`, type: 'text_input', answer: ans.join(','), answers: ans, hint: `Count ${dir} in ${step}s`, module: 'N05_Y5_NPV', level: level };
}

export default {
    moduleId: 'N05_Y5_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N05_Y5_NPV_negatives.js ---

--- START FILE: src\generators\N05_Y6_NPV_negatives.js ---
```javascript
/**
 * Year 6 Intervals Across Zero Question Generator
 * Schema: V2
 */

import { randomChoice, randomInt } from './helpers/N01_countingHelpers.js';

function calculateInterval(num1, num2) {
    return Math.abs(num2 - num1);
}

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        must_cross_zero: math.mustCrossZero,
        temperature_range: math.range.temp,
        elevation_range: math.range.elevation,
        interval_types: presentation.intervalTypes,
        context_types: presentation.contexts
    };

    const intervalType = randomChoice(flatParams.interval_types);
    const contextType = randomChoice(flatParams.context_types);

    if (intervalType === 'simple') {
        if (contextType === 'temperature') return generateTemperatureQuestion(flatParams, level);
        if (contextType === 'elevation') return generateElevationQuestion(flatParams, level);
        if (contextType === 'number_line') return generateNumberLineQuestion(flatParams, level);
        return generateSimpleIntervalQuestion(flatParams, level);
    }
    if (intervalType === 'multi_step') return generateTemperatureQuestion(flatParams, level);
    if (intervalType === 'word_problem') return generateWordProblem(flatParams, level);
    return generateSimpleIntervalQuestion(flatParams, level);
}

function generateSimpleIntervalQuestion(params, level) {
    let num1, num2;
    if (params.must_cross_zero) {
        num1 = randomInt(params.min_value, -1);
        num2 = randomInt(1, params.max_value);
    } else {
        num1 = randomInt(params.min_value, params.max_value);
        num2 = randomInt(params.min_value, params.max_value);
        while (num1 === num2) num2 = randomInt(params.min_value, params.max_value);
    }
    const interval = calculateInterval(num1, num2);
    return { text: `Difference between ${num1} and ${num2}?`, type: 'text_input', answer: interval.toString(), hint: 'Calculate steps between numbers', module: 'N05_Y6_NPV', level: level };
}

function generateTemperatureQuestion(params, level) {
    const [min, max] = params.temperature_range;
    const temp1 = randomInt(min, max);
    const temp2 = randomInt(min, max);
    if (temp1 === temp2) return generateTemperatureQuestion(params, level);
    return { text: `Temp at midnight ${temp1}°C, noon ${temp2}°C. Change?`, type: 'text_input', answer: Math.abs(temp2 - temp1).toString(), hint: `Difference between ${temp1} and ${temp2}`, module: 'N05_Y6_NPV', level: level };
}

function generateElevationQuestion(params, level) {
    const [min, max] = params.elevation_range;
    const depth = randomInt(min, -1);
    const height = randomInt(1, max);
    return { text: `Submarine at ${depth}m. Peak at ${height}m. Vertical distance?`, type: 'text_input', answer: (height - depth).toString(), hint: `Distance from ${depth} to ${height}`, module: 'N05_Y6_NPV', level: level };
}

function generateNumberLineQuestion(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generateNumberLineQuestion(params, level);
    return { text: `Distance between ${num1} and ${num2} on number line?`, type: 'text_input', answer: Math.abs(num2 - num1).toString(), hint: `Count steps`, module: 'N05_Y6_NPV', level: level };
}

function generateWordProblem(params, level) {
    const num1 = randomInt(params.min_value, params.max_value);
    const num2 = randomInt(params.min_value, params.max_value);
    if (num1 === num2) return generateWordProblem(params, level);
    return { text: `Lift floor ${num1} to ${num2}. Floors traveled?`, type: 'text_input', answer: Math.abs(num2 - num1).toString(), hint: `Difference`, module: 'N05_Y6_NPV', level: level };
}

export default {
    moduleId: 'N05_Y6_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N05_Y6_NPV_negatives.js ---

--- START FILE: src\generators\N06_Y2_NPV_problems.js ---
```javascript
/**
 * Year 2 Number Problems Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    getComparisonSymbol,
    generateUniqueNumbers
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        step_sizes: math.sequence.steps,
        max_steps: math.steps.max,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'counting_problems': return generateCountingProblem(flatParams, level);
        case 'place_value_problems': return generatePlaceValueProblem(flatParams, level);
        case 'comparison_problems': return generateComparisonProblem(flatParams, level);
        case 'number_line_problems': return generateNumberLineProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingProblem(flatParams, level);
    }
}

function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const numSteps = randomInt(2, Math.min(params.max_steps, 6));
    const answer = step * numSteps;
    if (answer > params.max_value) return generateCountingProblem(params, level);

    const contexts = {
        simple: [{ text: `{name} has {numSteps} bags with {step} sweets. Total?`, type: 'groups' }, { text: `{name} counts in {step}s for {numSteps} times. Number?`, type: 'counting' }],
        varied: [{ text: `Toy costs {step}p. Cost of {numSteps}?`, type: 'money' }, { text: `{name} skips {numSteps} times, {step}cm each. Total distance?`, type: 'measurement' }],
        mixed: [{ text: `{step} mins per page. {numSteps} pages. Total time?`, type: 'time' }]
    };
    
    const type = randomChoice(params.contexts || ['simple']);
    const template = randomChoice(contexts[type] || contexts.simple);
    const name = randomChoice(['Emma', 'Liam', 'Olivia', 'Noah']);
    const text = template.text.replace('{name}', name).replace('{numSteps}', numSteps).replace('{step}', step);
    
    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return { text, type: 'multiple_choice', options, answer: answer.toString(), hint: `Count in ${step}s`, module: 'N06_Y2_NPV', level };
}

function generatePlaceValueProblem(params, level) {
    const type = randomChoice(['compose', 'decompose', 'add_tens']);
    if (type === 'compose') {
        const num = randomInt(10, Math.min(99, params.max_value));
        const tens = Math.floor(num/10), ones = num%10;
        const text = `Number with ${tens} tens and ${ones} ones?`;
        const options = shuffle([num, ...generateDistractors(num, 3, 10, params.max_value)]);
        return { text, type: 'multiple_choice', options, answer: num.toString(), hint: `${tens}0 + ${ones}`, module: 'N06_Y2_NPV', level };
    } else if (type === 'decompose') {
        const num = randomInt(10, Math.min(99, params.max_value));
        const text = `How many tens in ${num}?`;
        return { text, type: 'text_input', answer: Math.floor(num/10).toString(), hint: 'Look at tens digit', module: 'N06_Y2_NPV', level };
    } else {
        const start = randomInt(1, params.max_value - 20);
        const add = 10;
        const ans = start + add;
        const text = `What is 10 more than ${start}?`;
        const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
        return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `Add 10`, module: 'N06_Y2_NPV', level };
    }
}

function generateComparisonProblem(params, level) {
    const n1 = randomInt(10, params.max_value);
    const n2 = randomInt(10, params.max_value);
    if (n1 === n2) return generateComparisonProblem(params, level);
    
    const names = ['Lily', 'Tom'];
    const text = `${names[0]} has ${n1}. ${names[1]} has ${n2}. Who has more?`;
    const ans = n1 > n2 ? names[0] : names[1];
    
    return { text, type: 'multiple_choice', options: names, answer: ans, hint: `Compare ${n1} and ${n2}`, module: 'N06_Y2_NPV', level };
}

function generateNumberLineProblem(params, level) {
    const start = randomInt(0, params.max_value - 20);
    const jump = 10;
    const end = start + jump;
    const text = `Start at ${start}. Jump 10. Where do you land?`;
    const ans = end;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} + 10`, module: 'N06_Y2_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const step = randomChoice([2, 5, 10]);
    const count = 3;
    const result = step * count;
    const compare = result + randomInt(-5, 5);
    const text = `Count in ${step}s three times. Is result more or less than ${compare}?`;
    const ans = result > compare ? 'more' : 'less';
    
    return { text, type: 'multiple_choice', options: ['more', 'less'], answer: ans, hint: `${step}x3=${result}`, module: 'N06_Y2_NPV', level };
}

export default {
    moduleId: 'N06_Y2_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N06_Y2_NPV_problems.js ---

--- START FILE: src\generators\N06_Y3_NPV_problems.js ---
```javascript
/**
 * Year 3 Number Problems Generator
 * Schema: V2
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    generateUniqueNumbers
} from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);

    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        step_sizes: math.sequence.steps,
        max_steps: math.steps.max,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'counting_problems': return generateCountingProblem(flatParams, level);
        case 'place_value_problems': return generatePlaceValueProblem(flatParams, level);
        case 'comparison_problems': return generateComparisonProblem(flatParams, level);
        case 'representation_problems': return generateRepresentationProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingProblem(flatParams, level);
    }
}

function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const numSteps = randomInt(2, Math.min(params.max_steps, 8));
    const answer = step * numSteps;
    if (answer > params.max_value) return generateCountingProblem(params, level);

    const text = `A bag has ${step} marbles. How many marbles in ${numSteps} bags?`;
    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return { text, type: 'multiple_choice', options, answer: answer.toString(), hint: `${step} × ${numSteps}`, module: 'N06_Y3_NPV', level };
}

function generatePlaceValueProblem(params, level) {
    const num = randomInt(100, Math.min(999, params.max_value));
    const hundreds = Math.floor(num/100);
    const tens = Math.floor((num%100)/10);
    const ones = num%10;
    const text = `Number with ${hundreds} hundreds, ${tens} tens, ${ones} ones?`;
    const options = shuffle([num, ...generateDistractors(num, 3, 100, params.max_value)]);
    
    return { text, type: 'multiple_choice', options, answer: num.toString(), hint: 'Combine place values', module: 'N06_Y3_NPV', level };
}

function generateComparisonProblem(params, level) {
    const n1 = randomInt(100, params.max_value);
    const n2 = randomInt(100, params.max_value);
    if (n1 === n2) return generateComparisonProblem(params, level);
    
    const text = `Who has more points: Team A (${n1}) or Team B (${n2})?`;
    const ans = n1 > n2 ? 'Team A' : 'Team B';
    
    return { text, type: 'multiple_choice', options: ['Team A', 'Team B'], answer: ans, hint: 'Compare numbers', module: 'N06_Y3_NPV', level };
}

function generateRepresentationProblem(params, level) {
    const num = randomInt(100, params.max_value);
    const text = `Which number is closest to ${num}: ${num-10}, ${num+100}, ${num+1}?`;
    const options = shuffle([num-10, num+100, num+1]);
    // Simple logic for example
    const ans = num+1;
    return { text: `Which number is closest to ${num}?`, type: 'multiple_choice', options, answer: ans.toString(), hint: 'Find smallest difference', module: 'N06_Y3_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const start = randomInt(100, params.max_value - 200);
    const add1 = 10, add2 = 100;
    const ans = start + add1 + add2;
    const text = `Start at ${start}. Add 10, then add 100. Result?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 100, params.max_value)]);
    
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start}+10+100`, module: 'N06_Y3_NPV', level };
}

export default {
    moduleId: 'N06_Y3_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N06_Y3_NPV_problems.js ---

--- START FILE: src\generators\N06_Y4_NPV_problems.js ---
```javascript
/**
 * Year 4 Number Problems Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, formatNumber, generateDistractors, roundToNearest } from './helpers/N02_numberHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        step_sizes: math.sequence.steps,
        min_steps: math.steps.min,
        max_steps: math.steps.max,
        rounding_bases: math.rounding.bases,
        roman_min: math.roman.min,
        roman_max: math.roman.max,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'counting_problems': return generateCountingProblem(flatParams, level);
        case 'place_value_comparison_problems': return generatePlaceValueComparisonProblem(flatParams, level);
        case 'rounding_estimation_problems': return generateRoundingEstimationProblem(flatParams, level);
        case 'negative_number_problems': return generateNegativeNumberProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingProblem(flatParams, level);
    }
}

function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const steps = randomInt(params.min_steps, params.max_steps);
    const ans = step * steps;
    if (ans > params.max_value) return generateCountingProblem(params, level);
    
    const text = `Box holds ${step} items. How many in ${steps} boxes?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${step} x ${steps}`, module: 'N06_Y4_NPV', level };
}

function generatePlaceValueComparisonProblem(params, level) {
    const num = randomInt(1000, params.max_value);
    const thousands = Math.floor(num/1000);
    const text = `In ${formatNumber(num)}, what is value of thousands digit?`;
    const ans = thousands * 1000;
    const options = shuffle([ans, thousands, thousands*100, thousands*10]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${thousands}000`, module: 'N06_Y4_NPV', level };
}

function generateRoundingEstimationProblem(params, level) {
    const num = randomInt(100, params.max_value);
    const base = randomChoice(params.rounding_bases);
    const rounded = roundToNearest(num, base);
    const text = `Round ${num} to nearest ${base}.`;
    const options = shuffle([rounded, ...generateDistractors(rounded, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: rounded.toString(), hint: `Nearest ${base}`, module: 'N06_Y4_NPV', level };
}

function generateNegativeNumberProblem(params, level) {
    const start = randomInt(5, 15);
    const sub = 20;
    const ans = start - sub;
    const text = `Temp is ${start}°C. Drops by ${sub}°C. New temp?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, -20, 20)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} - ${sub}`, module: 'N06_Y4_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const step = 1000;
    const start = 1000;
    const count = 3;
    const target = start + (step*count);
    const round = 100;
    const rounded = roundToNearest(target, round);
    const text = `Start 1000. Add 1000 three times. Round to nearest 100.`;
    const options = shuffle([rounded, ...generateDistractors(rounded, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: rounded.toString(), hint: `4000 rounded`, module: 'N06_Y4_NPV', level };
}

export default {
    moduleId: 'N06_Y4_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N06_Y4_NPV_problems.js ---

--- START FILE: src\generators\N06_Y5_NPV_problems.js ---
```javascript
/**
 * Year 5 Number Problems Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, formatNumber, generateDistractors, roundToNearest } from './helpers/N02_numberHelpers.js';
import { getPlaceValue } from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        powers_of_10: math.sequence.steps,
        min_steps: math.steps.min,
        max_steps: math.steps.max,
        rounding_bases: math.rounding.bases,
        roman_min: math.roman.min,
        roman_max: math.roman.max,
        negative_range: math.range.negative,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'counting_with_powers': return generateCountingWithPowersProblem(flatParams, level);
        case 'place_value_comparison_problems': return generatePlaceValueComparisonProblem(flatParams, level);
        case 'rounding_estimation_problems': return generateRoundingEstimationProblem(flatParams, level);
        case 'negative_context_problems': return generateNegativeContextProblem(flatParams, level);
        case 'multi_step_problems': return generateMultiStepProblem(flatParams, level);
        default: return generateCountingWithPowersProblem(flatParams, level);
    }
}

function generateCountingWithPowersProblem(params, level) {
    const power = randomChoice(params.powers_of_10);
    const steps = randomInt(params.min_steps, params.max_steps);
    const start = randomInt(params.min_value, params.max_value - (power*steps));
    const ans = start + (power*steps);
    const text = `Start at ${formatNumber(start)}. Count forward ${steps} steps of ${formatNumber(power)}. End?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, params.min_value, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} + ${steps * power}`, module: 'N06_Y5_NPV', level };
}

function generatePlaceValueComparisonProblem(params, level) {
    const num = randomInt(10000, params.max_value);
    const place = 'thousands';
    const val = getPlaceValue(num, place);
    const text = `Value of thousands in ${formatNumber(num)}?`;
    const options = shuffle([val, ...generateDistractors(val, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: val.toString(), hint: `Look at thousands`, module: 'N06_Y5_NPV', level };
}

function generateRoundingEstimationProblem(params, level) {
    const num = randomInt(10000, params.max_value);
    const base = randomChoice(params.rounding_bases);
    const ans = roundToNearest(num, base);
    const text = `Round ${formatNumber(num)} to nearest ${formatNumber(base)}`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `Round`, module: 'N06_Y5_NPV', level };
}

function generateNegativeContextProblem(params, level) {
    const start = randomInt(-10, 10);
    const change = randomInt(5, 20);
    const ans = start - change;
    const text = `Temp ${start}°C. Falls ${change}°C. New temp?`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, -50, 50)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `${start} - ${change}`, module: 'N06_Y5_NPV', level };
}

function generateMultiStepProblem(params, level) {
    const start = 10000;
    const add = 1000;
    const steps = 3;
    const total = start + (add * steps);
    const round = 1000;
    const ans = roundToNearest(total, round);
    const text = `Start ${start}. Add ${add} three times. Round to nearest ${round}.`;
    const options = shuffle([ans, ...generateDistractors(ans, 3, 0, params.max_value)]);
    return { text, type: 'multiple_choice', options, answer: ans.toString(), hint: `Calc then round`, module: 'N06_Y5_NPV', level };
}

export default {
    moduleId: 'N06_Y5_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N06_Y5_NPV_problems.js ---

--- START FILE: src\generators\N06_Y6_NPV_problems.js ---
```javascript
/**
 * Year 6 Number Problems Generator
 * Schema: V2
 */

import { randomInt, randomChoice, shuffle, formatNumber, generateDistractors, roundToNearest, sortAscending } from './helpers/N02_numberHelpers.js';
import { getPlaceValue } from './helpers/N03_placeValueHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math, presentation } = params;
    const operation = randomChoice(operations);
    
    const flatParams = {
        min_value: math.range.min,
        max_value: math.range.max,
        rounding_bases: math.rounding.bases,
        min_steps: math.steps.min,
        max_steps: math.steps.max,
        negative_range: math.range.negative,
        interval_range: math.range.interval,
        contexts: presentation.contexts
    };

    switch(operation) {
        case 'large_place_value_problems': return generateLargePlaceValueProblem(flatParams, level);
        case 'multi_level_rounding_problems': return generateMultiLevelRoundingProblem(flatParams, level);
        case 'ordering_comparing_large_numbers': return generateOrderingComparingProblem(flatParams, level);
        case 'negative_interval_problems': return generateNegativeIntervalProblem(flatParams, level);
        case 'multi_concept_integration': return generateMultiConceptProblem(flatParams, level);
        default: return generateLargePlaceValueProblem(flatParams, level);
    }
}

function generateLargePlaceValueProblem(params, level) {
    const num = randomInt(1000000, params.max_value);
    const millions = Math.floor(num/1000000);
    const text = `How many millions in ${formatNumber(num)}?`;
    const options = shuffle([millions, millions*10, Math.floor(millions/10), millions+1]);
    return { text, type: 'multiple_choice', options, answer: millions.toString(), hint: `Look at millions place`, module: 'N06_Y6_NPV', level };
}

function generateMultiLevelRoundingProblem(params, level) {
    const num = randomInt(100000, params.max_value);
    const r1 = 100000;
    const r2 = 10000;
    const ans1 = roundToNearest(num, r1);
    const ans2 = roundToNearest(num, r2);
    const diff = Math.abs(ans1 - ans2);
    const text = `Round ${formatNumber(num)} to nearest ${formatNumber(r1)} and ${formatNumber(r2)}. Difference?`;
    const options = shuffle([diff, diff+10000, diff+1000, 0]);
    return { text, type: 'multiple_choice', options, answer: diff.toString(), hint: `Round both then subtract`, module: 'N06_Y6_NPV', level };
}

function generateOrderingComparingProblem(params, level) {
    const n1 = randomInt(1000000, params.max_value);
    const n2 = randomInt(1000000, params.max_value);
    const text = `Larger: ${formatNumber(n1)} or ${formatNumber(n2)}?`;
    const ans = Math.max(n1, n2);
    return { text, type: 'multiple_choice', options: [formatNumber(n1), formatNumber(n2)], answer: formatNumber(ans), hint: `Compare`, module: 'N06_Y6_NPV', level };
}

function generateNegativeIntervalProblem(params, level) {
    const n1 = randomInt(-50, -10);
    const n2 = randomInt(10, 50);
    const dist = n2 - n1;
    const text = `Difference between ${n1} and ${n2}?`;
    const options = shuffle([dist, dist-10, dist+10, Math.abs(n1)+Math.abs(n2)+10]);
    return { text, type: 'multiple_choice', options, answer: dist.toString(), hint: `Add absolute values`, module: 'N06_Y6_NPV', level };
}

function generateMultiConceptProblem(params, level) {
    const num = randomInt(1000000, params.max_value);
    const round = 1000000;
    const rounded = roundToNearest(num, round);
    const millions = Math.floor(rounded/1000000);
    const text = `Round ${formatNumber(num)} to nearest million. How many millions?`;
    const options = shuffle([millions, millions+1, millions-1, millions*10]);
    return { text, type: 'multiple_choice', options, answer: millions.toString(), hint: `Round then count millions`, module: 'N06_Y6_NPV', level };
}

export default {
    moduleId: 'N06_Y6_NPV',
    generate: generateQuestion
};
```
--- END FILE: src\generators\N06_Y6_NPV_problems.js ---

--- START FILE: src\ui\app.js ---
```javascript
/**
 * Simplified Question Generator App
 *
 * Simple interface to generate and display questions from all difficulty levels
 */

import { MODULES } from '../curriculum/parameters.js';
import questionEngine from '../core/questionEngine.js';
import validator from '../core/validator.js';

class App {
    constructor() {
        this.currentModule = null;
        this.questions = [];
        this.questionCount = 5;
        this.answerData = []; // Store detailed results for each question
    }

    init() {
        this.renderModules();
        this.attachEventListeners();
    }

    /**
     * Render module cards grouped by strand, substrand, and year
     */
    renderModules() {
        const modulesGrid = document.querySelector('.modules-grid');

        // Group modules by strand -> substrand -> year
        const groupedModules = this.groupModulesByStrandAndSubstrand();

        // Generate HTML for each strand
        modulesGrid.innerHTML = Object.entries(groupedModules).map(([strand, substrands]) => `
            <div class="strand-section">
                <h2 class="strand-title">${strand}</h2>
                ${Object.entries(substrands).map(([substrand, modules]) =>
                    this.renderSubstrandGrid(substrand, modules)
                ).join('')}
            </div>
        `).join('');
    }

    /**
     * Group modules by strand and substrand
     */
    groupModulesByStrandAndSubstrand() {
        const grouped = {};

        Object.values(MODULES).forEach(module => {
            const strand = module.strand;
            const substrand = module.substrand;

            if (!grouped[strand]) {
                grouped[strand] = {};
            }

            if (!grouped[strand][substrand]) {
                grouped[strand][substrand] = {};
            }

            // Extract year number from yearGroup (e.g., "Year 1" -> 1)
            const yearMatch = module.yearGroup.match(/Year (\d+)/);
            const year = yearMatch ? parseInt(yearMatch[1]) : null;

            if (year) {
                grouped[strand][substrand][year] = module;
            }
        });

        return grouped;
    }

    /**
     * Render a substrand grid with years as columns
     */
    renderSubstrandGrid(substrand, modulesByYear) {
        // Find all years (1-6)
        const allYears = [1, 2, 3, 4, 5, 6];

        // Get all module IDs in this substrand for the generate button
        const substrandModuleIds = Object.values(modulesByYear).map(m => m.id).join(',');

        return `
            <div class="substrand-section">
                <div class="substrand-header">
                    <h3 class="substrand-title">${substrand}</h3>
                    <button class="btn-substrand" data-substrand-modules="${substrandModuleIds}">
                        🎯 Generate for All in ${substrand}
                    </button>
                </div>
                <div class="year-grid">
                    ${allYears.map(year => {
                        const module = modulesByYear[year];
                        return `
                            <div class="year-column">
                                <div class="year-header">Year ${year}</div>
                                ${module ? `
                                    <div class="module-cell" data-module-id="${module.id}">
                                        <div class="module-name">${module.name.includes(':') ? module.name.split(':')[1].trim() : module.name}</div>
                                        <div class="module-ref">${module.id}</div>
                                        <div class="module-description">${module.description}</div>
                                    </div>
                                ` : `
                                    <div class="module-cell empty">
                                        <span class="empty-cell">-</span>
                                    </div>
                                `}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Module selection (delegated to handle dynamically created elements)
        document.querySelector('.modules-grid').addEventListener('click', (e) => {
            // Check if the click was on a substrand button
            const substrandBtn = e.target.closest('.btn-substrand');
            if (substrandBtn) {
                const moduleIds = substrandBtn.dataset.substrandModules.split(',');
                this.generateQuestionsForMultipleModules(moduleIds);
                e.stopPropagation();
                return;
            }

            // Otherwise, handle regular module selection
            const moduleCell = e.target.closest('.module-cell[data-module-id]');
            if (moduleCell) {
                const moduleId = moduleCell.dataset.moduleId;
                this.generateQuestionsForSingleModule(moduleId);
            }
        });

        // Question count input
        document.getElementById('questionCount').addEventListener('change', (e) => {
            this.questionCount = parseInt(e.target.value);
        });

        // Generate all modules button
        document.getElementById('generateAllModulesBtn').addEventListener('click', () => {
            this.generateQuestionsForAllModules();
        });

        // Bulk export buttons
        document.getElementById('bulkExportJsonBtn').addEventListener('click', () => {
            this.bulkExportToJson();
        });

        document.getElementById('bulkExportCsvBtn').addEventListener('click', () => {
            this.bulkExportToCsv();
        });

        // Back button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showSection('setup');
        });

        // Submit button
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.submitAnswers();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetAnswers();
        });

        // New quiz button
        document.getElementById('newQuizBtn').addEventListener('click', () => {
            this.showSection('setup');
        });

        // Export buttons
        document.getElementById('exportCsvBtn').addEventListener('click', () => {
            this.exportToEnhancedCsv();
        });

        document.getElementById('exportJsonBtn').addEventListener('click', () => {
            this.exportToEnhancedJson();
        });
    }

    /**
     * Generate questions for a single module
     */
    generateQuestionsForSingleModule(moduleId) {
        this.currentModule = MODULES[moduleId];
        this.questions = this.generateQuestionsForModule(moduleId, this.questionCount);
        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for multiple modules (substrand or custom selection)
     */
    generateQuestionsForMultipleModules(moduleIds) {
        // Filter out any empty strings
        const validModuleIds = moduleIds.filter(id => id && MODULES[id]);

        if (validModuleIds.length === 0) {
            alert('No valid modules selected!');
            return;
        }

        this.currentModule = {
            name: `${validModuleIds.length} Module${validModuleIds.length > 1 ? 's' : ''} Selected`,
            icon: '🎯'
        };

        this.questions = [];
        validModuleIds.forEach(moduleId => {
            const moduleQuestions = this.generateQuestionsForModule(moduleId, this.questionCount);
            this.questions.push(...moduleQuestions);
        });

        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for all available modules in the curriculum
     */
    generateQuestionsForAllModules() {
        const allModuleIds = Object.keys(MODULES);

        if (allModuleIds.length === 0) {
            alert('No modules available!');
            return;
        }

        this.currentModule = {
            name: `All Modules (${allModuleIds.length} modules)`,
            icon: '📚'
        };

        this.questions = [];
        allModuleIds.forEach(moduleId => {
            const moduleQuestions = this.generateQuestionsForModule(moduleId, this.questionCount);
            this.questions.push(...moduleQuestions);
        });

        this.renderQuestions();
        this.showSection('questions');
    }

    /**
     * Generate questions for a single module, returning grouped structure
     * @param {string} moduleId - The module ID
     * @param {number} count - Number of questions per level
     * @returns {Array} Array of level groups with questions
     */
    generateQuestionsForModule(moduleId, count) {
        const levelGroups = [];
        const moduleInfo = MODULES[moduleId];

        // Generate questions for each level (1-4)
        for (let level = 1; level <= 4; level++) {
            const levelQuestions = questionEngine.generate(moduleId, level, count);

            // Add module info to each question for display purposes
            const questionsWithModuleInfo = levelQuestions.map(q => ({
                ...q,
                moduleInfo: moduleInfo
            }));

            levelGroups.push({
                level: level,
                levelName: this.getLevelName(level),
                questions: questionsWithModuleInfo,
                moduleId: moduleId,
                moduleName: moduleInfo.name
            });
        }

        return levelGroups;
    }

    /**
     * Get level name
     */
    getLevelName(level) {
        const names = {
            1: 'Beginning',
            2: 'Developing',
            3: 'Meeting',
            4: 'Exceeding'
        };
        return names[level];
    }

    /**
     * Render questions grouped by level
     */
    renderQuestions() {
        const container = document.getElementById('questionsContainer');
        const moduleTitle = document.getElementById('moduleTitle');

        moduleTitle.textContent = `${this.currentModule.icon} ${this.currentModule.name}`;

        container.innerHTML = this.questions.map((levelGroup, levelIdx) => `
            <div class="level-section">
                <h3 class="level-title" data-level="${levelGroup.level}">${levelGroup.levelName}</h3>
                <div class="questions-list">
                    ${levelGroup.questions.map((q, qIdx) => this.renderQuestion(q, levelIdx, qIdx)).join('')}
                </div>
            </div>
        `).join('');

        // Calculate total questions
        const totalQuestions = this.questions.reduce((sum, level) => sum + level.questions.length, 0);

        // Set progress text on actions bar
        const actionsBar = document.querySelector('.actions');
        if (actionsBar) {
            actionsBar.setAttribute('data-progress', `0 of ${totalQuestions} answered`);
        }

        // Add entrance animations with stagger
        setTimeout(() => {
            const questions = document.querySelectorAll('.question');
            questions.forEach((q, idx) => {
                q.style.animationDelay = `${idx * 0.05}s`;
                q.classList.add('animate-slide-in');
            });

            // Auto-focus first input after animations start
            this.focusFirstInput();
        }, 10);

        // Setup progress tracking
        this.setupProgressTracking(totalQuestions);
    }

    /**
     * Focus first input with visual pulse animation
     */
    focusFirstInput() {
        // Find first text input or first question's first option
        const firstTextInput = document.querySelector('.text-input');
        const firstRadio = document.querySelector('input[type="radio"]');

        const elementToFocus = firstTextInput || firstRadio;

        if (elementToFocus) {
            setTimeout(() => {
                elementToFocus.focus();
                // Add pulsing animation to draw attention
                elementToFocus.classList.add('initial-focus');

                // Remove the class after animation completes
                setTimeout(() => {
                    elementToFocus.classList.remove('initial-focus');
                }, 1500);
            }, 300); // Wait for slide-in animation
        }
    }

    /**
     * Setup progress tracking for answered questions
     */
    setupProgressTracking(totalQuestions) {
        const actionsBar = document.querySelector('.actions');
        const submitBtn = document.getElementById('submitBtn');

        const updateProgress = () => {
            let answered = 0;

            // Count filled text inputs
            document.querySelectorAll('.text-input').forEach(input => {
                if (input.value.trim()) answered++;
            });

            // Count selected radio buttons (by unique name)
            const radioGroups = new Set();
            document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
                radioGroups.add(radio.name);
            });
            answered += radioGroups.size;

            // Update progress text
            if (actionsBar) {
                actionsBar.setAttribute('data-progress', `${answered} of ${totalQuestions} answered`);
            }

            // Enable/highlight submit when all answered
            if (submitBtn) {
                if (answered === totalQuestions) {
                    submitBtn.classList.add('ready-to-submit');
                } else {
                    submitBtn.classList.remove('ready-to-submit');
                }
            }
        };

        // Listen to all inputs
        document.addEventListener('input', updateProgress);
        document.addEventListener('change', updateProgress);
    }

    /**
     * Render a single question
     */
    renderQuestion(question, levelIdx, questionIdx) {
        const questionId = `q_${levelIdx}_${questionIdx}`;

        // Show module badge if this is from mixed questions
        const moduleBadge = question.moduleInfo ?
            `<div class="module-badge">${question.moduleInfo.icon} ${question.moduleInfo.name}</div>` : '';

        if (question.type === 'multiple_choice') {
            return `
                <div class="question" data-question-id="${questionId}">
                    ${moduleBadge}
                    <div class="question-text">${questionIdx + 1}. ${this.renderQuestionText(question.questionRendered || question.text)}</div>
                    <div class="options">
                        ${question.options.map((option, optIdx) => {
                            // Format number options with commas
                            const displayValue = typeof option === 'number' ? option.toLocaleString('en-US') : option;
                            return `
                                <label class="option">
                                    <input type="radio" name="${questionId}" value="${option}">
                                    <span>${displayValue}</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                    <div class="feedback"></div>
                </div>
            `;
        } else if (question.type === 'text_input') {
            // Check if multi-gap question
            const isMultiGap = question.answers && question.answers.length > 1;

            if (isMultiGap) {
                return `
                    <div class="question" data-question-id="${questionId}">
                        ${moduleBadge}
                        <div class="question-text">${questionIdx + 1}. ${this.renderQuestionText(question.questionRendered || question.text)}</div>
                        <div class="multi-input-container">
                            ${question.answers.map((_, idx) => `
                                <input type="text"
                                       class="text-input multi-gap"
                                       data-gap-index="${idx}"
                                       placeholder="Answer ${idx + 1}"
                                       size="8">
                            `).join('')}
                        </div>
                        ${(question.hintRendered || question.hint) ? `<div class="hint">💡 Hint: ${question.hintRendered || question.hint}</div>` : ''}
                        <div class="feedback"></div>
                    </div>
                `;
            } else {
                // Single input
                return `
                    <div class="question" data-question-id="${questionId}">
                        ${moduleBadge}
                        <div class="question-text">${questionIdx + 1}. ${this.renderQuestionText(question.questionRendered || question.text)}</div>
                        <input type="text" class="text-input" id="${questionId}" placeholder="Your answer">
                        ${(question.hintRendered || question.hint) ? `<div class="hint">💡 Hint: ${question.hintRendered || question.hint}</div>` : ''}
                        <div class="feedback"></div>
                    </div>
                `;
            }
        }
    }

    /**
     * Submit and check all answers
     */
    submitAnswers() {
        let totalCorrect = 0;
        let totalQuestions = 0;
        this.answerData = []; // Reset answer data

        this.questions.forEach((levelGroup, levelIdx) => {
            levelGroup.questions.forEach((question, qIdx) => {
                const questionId = `q_${levelIdx}_${qIdx}`;
                const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
                const feedbackElement = questionElement.querySelector('.feedback');

                let userAnswer = '';

                // Get user answer
                if (question.type === 'multiple_choice') {
                    const selected = questionElement.querySelector(`input[name="${questionId}"]:checked`);
                    userAnswer = selected ? selected.value : '';
                } else if (question.type === 'text_input') {
                    // Check for multi-gap inputs
                    const multiGaps = questionElement.querySelectorAll('.text-input.multi-gap');
                    if (multiGaps.length > 0) {
                        // Collect all gap answers and join with comma
                        const gapAnswers = Array.from(multiGaps).map(input => input.value.trim());
                        userAnswer = gapAnswers.join(',');
                    } else {
                        // Single input
                        const inputElement = document.getElementById(questionId);
                        userAnswer = inputElement ? inputElement.value.trim() : '';
                    }
                }

                // Validate answer
                const result = validator.validate(question, userAnswer);
                totalQuestions++;
                if (result.isCorrect) totalCorrect++;

                // Store detailed answer data
                this.answerData.push({
                    level: levelGroup.level,
                    levelName: levelGroup.levelName,
                    questionNumber: qIdx + 1,
                    questionText: question.questionRendered || question.text,
                    userAnswer: userAnswer || '(No answer)',
                    correctAnswer: question.answer,
                    isCorrect: result.isCorrect,
                    questionType: question.type
                });

                // Show feedback with enhanced animations
                questionElement.classList.remove('correct', 'incorrect');
                if (userAnswer) {
                    questionElement.classList.add(result.isCorrect ? 'correct' : 'incorrect');

                    if (result.isCorrect) {
                        feedbackElement.innerHTML = `
                            <div class="correct-mark">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M16.7 5.3L8.5 13.5L3.3 8.3"
                                          stroke="#10b981"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                Excellent work!
                            </div>
                        `;
                    } else {
                        // Format answer for display
                        const answerNum = parseFloat(question.answer);
                        const displayAnswer = !isNaN(answerNum) ? answerNum.toLocaleString('en-US') : question.answer;

                        feedbackElement.innerHTML = `
                            <div class="incorrect-mark">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15 5L5 15M5 5L15 15"
                                          stroke="#ef4444"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                Not quite. The answer is ${displayAnswer}
                            </div>
                        `;
                    }
                }
            });
        });

        // Show results summary
        this.showResults(totalCorrect, totalQuestions);
    }

    /**
     * Format answer for display (add commas to numbers)
     */
    formatAnswerForDisplay(answer) {
        // Handle comma-separated answers (multi-gap questions)
        if (answer.includes(',')) {
            return answer.split(',').map(part => {
                const num = parseFloat(part.trim());
                return !isNaN(num) ? num.toLocaleString('en-US') : part.trim();
            }).join(', ');
        }

        // Handle single number
        const num = parseFloat(answer);
        return !isNaN(num) ? num.toLocaleString('en-US') : answer;
    }

    /**
     * Escape HTML to prevent XSS, but allow specific visual classes
     * @param {string} text - Text that may contain HTML
     * @returns {string} Safe HTML
     */
    renderQuestionText(text) {
        // Check if text contains our safe visual HTML classes
        const hasSafeVisuals = text.includes('class="simple-number-line"') ||
                              text.includes('class="simple-dots-container"') ||
                              text.includes('class="ten-frame"') ||
                              text.includes('class="base10-container"') ||
                              text.includes('class="tally-marks-container"') ||
                              text.includes('class="columnar-calc"') ||
                              text.includes('class="visual-array"') ||
                              text.includes('class="visual-groups"') ||
                              text.includes('class="visual-sharing"') ||
                              text.includes('class="visual-repeated"') ||
                              text.includes('class="grid-method"') ||
                              text.includes('class="short-division"') ||
                              text.includes('class="clock-face"') ||
                              text.includes('class="gap-final"') ||
                              text.includes('class="gap-other"') ||
                              text.includes('<strong>') ||
                              text.includes('<br>');

        if (hasSafeVisuals) {
            // Text contains our visual HTML - render as-is
            return text;
        } else {
            // Plain text - escape HTML entities
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }

    /**
     * Show results summary
     */
    showResults(correct, total) {
        const percentage = Math.round((correct / total) * 100);
        const resultsContainer = document.getElementById('resultsContainer');

        // Group answer data by level
        const answersByLevel = {};
        this.answerData.forEach(answer => {
            if (!answersByLevel[answer.level]) {
                answersByLevel[answer.level] = {
                    levelName: answer.levelName,
                    answers: []
                };
            }
            answersByLevel[answer.level].answers.push(answer);
        });

        resultsContainer.innerHTML = `
            <div class="results-summary">
                <div class="score-display">
                    <div class="score-value">${correct} / ${total}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <div class="score-breakdown">
                    ${this.questions.map(levelGroup => {
                        const levelCorrect = this.getLevelScore(levelGroup);
                        const levelTotal = levelGroup.questions.length;
                        const levelPercentage = Math.round((levelCorrect / levelTotal) * 100);
                        return `
                            <div class="level-score">
                                <span class="level-name">Level ${levelGroup.level} (${levelGroup.levelName})</span>
                                <span class="level-result">${levelCorrect}/${levelTotal} (${levelPercentage}%)</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="detailed-results">
                <h3>Detailed Results</h3>
                ${Object.keys(answersByLevel).sort().map(level => `
                    <div class="level-results-section">
                        <h4 class="level-results-title">Level ${level}: ${answersByLevel[level].levelName}</h4>
                        <div class="question-results-list">
                            ${answersByLevel[level].answers.map(answer => `
                                <div class="question-result ${answer.isCorrect ? 'correct' : 'incorrect'}">
                                    <div class="question-result-header">
                                        <span class="result-icon">
                                            ${answer.isCorrect ? `
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M16.7 5.3L8.5 13.5L3.3 8.3"
                                                          stroke="currentColor"
                                                          stroke-width="2"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"/>
                                                </svg>
                                            ` : `
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M15 5L5 15M5 5L15 15"
                                                          stroke="currentColor"
                                                          stroke-width="2"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"/>
                                                </svg>
                                            `}
                                        </span>
                                        <span class="question-number">Question ${answer.questionNumber}</span>
                                    </div>
                                    <div class="question-result-text">${answer.questionText}</div>
                                    <div class="answer-comparison">
                                        <div class="answer-row">
                                            <span class="answer-label">Your answer:</span>
                                            <span class="answer-value ${answer.isCorrect ? 'correct' : 'incorrect'}">${this.formatAnswerForDisplay(answer.userAnswer)}</span>
                                        </div>
                                        ${!answer.isCorrect ? `
                                            <div class="answer-row">
                                                <span class="answer-label">Correct answer:</span>
                                                <span class="answer-value correct">${this.formatAnswerForDisplay(answer.correctAnswer)}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        this.showSection('results');
    }

    /**
     * Get score for a specific level
     */
    getLevelScore(levelGroup) {
        let correct = 0;
        const levelIdx = levelGroup.level - 1;

        levelGroup.questions.forEach((question, qIdx) => {
            const questionId = `q_${levelIdx}_${qIdx}`;
            const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);

            if (questionElement && questionElement.classList.contains('correct')) {
                correct++;
            }
        });

        return correct;
    }

    /**
     * Reset all answers
     */
    resetAnswers() {
        // Clear all radio selections
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Clear all text inputs
        document.querySelectorAll('.text-input').forEach(input => {
            input.value = '';
        });

        // Remove feedback
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('correct', 'incorrect');
            q.querySelector('.feedback').innerHTML = '';
        });

        // Reset progress indicator
        const totalQuestions = this.questions.reduce((sum, level) => sum + level.questions.length, 0);
        const actionsBar = document.querySelector('.actions');
        if (actionsBar) {
            actionsBar.setAttribute('data-progress', `0 of ${totalQuestions} answered`);
        }

        // Remove ready-to-submit class
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.classList.remove('ready-to-submit');
        }
    }

    /**
     * Show a specific section
     */
    showSection(sectionName) {
        const sections = ['setup', 'questions', 'results'];
        sections.forEach(name => {
            const section = document.getElementById(`${name}Section`);
            if (name === sectionName) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    // ============================================================================
    // ENHANCED EXPORT METHODS - Lean Export System
    // ============================================================================

    /**
     * Export questions to lean JSON format - data over presentation
     */
    exportToEnhancedJson() {
        const exportData = {
            metadata: {
                exportDate: new Date().toISOString(),
                version: "2.0",  // Updated to 2.0 for new schema
                schemaVersion: "2.0",  // New metadata-driven schema
                generatorVersion: "1.0",
                questionCount: this.questions.reduce((sum, level) => sum + level.questions.length, 0),
                moduleCount: new Set(this.questions.map(level => level.moduleId)).size,
                schemaFeatures: [
                    "metadata-driven-formatting",
                    "locale-support",
                    "template-placeholders",
                    "raw-numeric-values"
                ]
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

                    // NEW SCHEMA: Templates with placeholders
                    questionTemplate: q.questionTemplate || null,
                    questionRendered: q.questionRendered || this.stripHtml(q.text),
                    hintTemplate: q.hintTemplate || null,
                    hintRendered: q.hintRendered || q.hint || null,

                    // NEW SCHEMA: Raw values (no formatting)
                    values: q.values || null,
                    valueMetadata: q.valueMetadata || null,

                    // NEW SCHEMA: Answer with metadata
                    answer: q.answer,  // Raw number or string
                    answerMetadata: q.answerMetadata || null,

                    // NEW SCHEMA: Options with metadata (for multiple choice)
                    options: q.options || null,
                    optionsMetadata: q.optionsMetadata || null,

                    // NEW SCHEMA: Locale and universality flags
                    locale: q.locale || 'en-GB',
                    universal: q.universal !== undefined ? q.universal : null,

                    // Question type
                    questionType: q.type,

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
            'Module_Description',
            'Year_Group',
            'Strand',
            'Substrand',
            'Curriculum_Ref',
            'Icon',
            'Level',
            'Level_Name',
            'Difficulty_Score',
            'Question_Template',
            'Question_Text',
            'Hint_Template',
            'Hint',
            'Values_JSON',
            'Value_Metadata_JSON',
            'Answer_Metadata_JSON',
            'Options_Metadata_JSON',
            'Locale',
            'Universal',
            'Question_Type',
            'Visual_Type',
            'Question_Data_JSON',
            'Correct_Answer',
            'Answer_Type',
            'Options_JSON',
            'Tags',
            'Generated_At',
            'Parameters_JSON'
        ];

        const rows = [];

        this.questions.forEach(levelGroup => {
            const module = MODULES[levelGroup.moduleId];
            const params = module ? module.parameters[levelGroup.level] : {};

            levelGroup.questions.forEach((q, qIdx) => {
                // Extract text fields
                const questionText = q.questionRendered || q.text;
                const hintText = q.hintRendered || q.hint;
                const questionTemplate = q.questionTemplate || '';
                const hintTemplate = q.hintTemplate || '';

                // Extract JSON fields
                const valuesJson = q.values ? JSON.stringify(q.values) : '';
                const valueMetadataJson = q.valueMetadata ? JSON.stringify(q.valueMetadata) : '';
                const answerMetadataJson = q.answerMetadata ? JSON.stringify(q.answerMetadata) : '';
                const optionsMetadataJson = q.optionsMetadata ? JSON.stringify(q.optionsMetadata) : '';

                // Extract metadata fields
                const locale = q.locale || 'en-GB';
                const universal = q.universal !== undefined ? q.universal : '';
                const moduleDescription = module ? module.description : '';
                const curriculumRef = module ? module.ref : '';
                const icon = module ? module.icon : '';
                const levelName = levelGroup.levelName || '';

                const row = [
                    q.id,
                    qIdx + 1,
                    levelGroup.moduleId,
                    this.escapeCsv(levelGroup.moduleName),
                    this.escapeCsv(moduleDescription),
                    module ? module.yearGroup : '',
                    module ? this.escapeCsv(module.strand) : '',
                    module ? this.escapeCsv(module.substrand) : '',
                    this.escapeCsv(curriculumRef),
                    icon,
                    levelGroup.level,
                    this.escapeCsv(levelName),
                    this.calculateDifficultyScore(levelGroup.level, params),
                    this.escapeCsv(questionTemplate),
                    this.escapeCsv(this.stripHtml(questionText)),
                    this.escapeCsv(hintTemplate),
                    hintText ? this.escapeCsv(hintText) : '',
                    this.escapeCsv(valuesJson),
                    this.escapeCsv(valueMetadataJson),
                    this.escapeCsv(answerMetadataJson),
                    this.escapeCsv(optionsMetadataJson),
                    locale,
                    universal,
                    q.type,
                    this.detectVisualType(questionText, q.type, params),
                    this.escapeCsv(JSON.stringify(this.extractQuestionData(q, params, levelGroup.moduleId))),
                    this.escapeCsv(q.answer),
                    this.detectAnswerType(q.answer, q.type),
                    q.options ? this.escapeCsv(JSON.stringify(q.options)) : '',
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

    /**
     * Bulk export to JSON - generates questions for all modules without rendering
     */
    bulkExportToJson() {
        const btn = document.getElementById('bulkExportJsonBtn');
        const originalText = btn.textContent;

        try {
            // Show loading state
            btn.disabled = true;
            btn.textContent = '⏳ Generating...';

            const allModuleIds = Object.keys(MODULES);
            const questionCount = this.questionCount;

            console.log(`🔄 Generating ${questionCount} questions per level for ${allModuleIds.length} modules...`);

            // Generate questions for all modules without rendering
            const allQuestions = [];
            allModuleIds.forEach((moduleId, idx) => {
                // Progress indication in console
                if ((idx + 1) % 10 === 0) {
                    console.log(`📊 Progress: ${idx + 1}/${allModuleIds.length} modules...`);
                }

                const moduleQuestions = this.generateQuestionsForModule(moduleId, questionCount);
                allQuestions.push(...moduleQuestions);
            });

            console.log(`✅ Generated ${allQuestions.length} level groups`);

            // Store temporarily and export
            const tempQuestions = this.questions;
            this.questions = allQuestions;
            this.exportToEnhancedJson();
            this.questions = tempQuestions;

            // Show success
            btn.textContent = '✅ Exported!';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);

        } catch (error) {
            console.error('❌ Bulk export failed:', error);
            btn.textContent = '❌ Export failed';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
            alert('Export failed. Check console for details.');
        }
    }

    /**
     * Bulk export to CSV - generates questions for all modules without rendering
     */
    bulkExportToCsv() {
        const btn = document.getElementById('bulkExportCsvBtn');
        const originalText = btn.textContent;

        try {
            // Show loading state
            btn.disabled = true;
            btn.textContent = '⏳ Generating...';

            const allModuleIds = Object.keys(MODULES);
            const questionCount = this.questionCount;

            console.log(`🔄 Generating ${questionCount} questions per level for ${allModuleIds.length} modules...`);

            // Generate questions for all modules without rendering
            const allQuestions = [];
            allModuleIds.forEach((moduleId, idx) => {
                // Progress indication in console
                if ((idx + 1) % 10 === 0) {
                    console.log(`📊 Progress: ${idx + 1}/${allModuleIds.length} modules...`);
                }

                const moduleQuestions = this.generateQuestionsForModule(moduleId, questionCount);
                allQuestions.push(...moduleQuestions);
            });

            console.log(`✅ Generated ${allQuestions.length} level groups`);

            // Store temporarily and export
            const tempQuestions = this.questions;
            this.questions = allQuestions;
            this.exportToEnhancedCsv();
            this.questions = tempQuestions;

            // Show success
            btn.textContent = '✅ Exported!';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);

        } catch (error) {
            console.error('❌ Bulk export failed:', error);
            btn.textContent = '❌ Export failed';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
            alert('Export failed. Check console for details.');
        }
    }

    // ============================================================================
    // DATA EXTRACTION METHODS
    // ============================================================================

    /**
     * Detect visual presentation type
     */
    detectVisualType(text, type, params) {
        if (!text) return 'plain_text';  // Handle undefined/null text

        if (text.includes('columnar-calc')) return 'columnar_calculation';
        if (text.includes('short-division')) return 'short_division';
        if (text.includes('long-division')) return 'long_division';
        if (text.includes('number-line')) return 'number_line';
        if (text.includes('grid-method')) return 'grid_method';
        if (text.includes('clock-face')) return 'clock_face';
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
        const questionText = question.questionRendered || question.text;
        const data = {
            originalText: questionText  // Keep as reference
        };

        // Columnar calculations (C02, C07 modules)
        if (questionText.includes('columnar-calc')) {
            const numbers = this.extractNumbersFromText(questionText);
            data.type = 'columnar';
            data.numbers = numbers;
            data.operator = this.extractOperator(questionText);
            data.showWork = false;
        }

        // Division questions
        else if (questionText.includes('division')) {
            const numbers = this.extractNumbersFromText(questionText);
            data.type = 'division';
            data.dividend = numbers[0];
            data.divisor = numbers[1];
            data.showRemainder = questionText.toLowerCase().includes('remainder');
        }

        // Sequence/counting questions (N01 modules)
        else if (moduleId.includes('N01')) {
            const numbers = this.extractNumbersFromText(questionText);
            data.type = 'sequence';
            data.sequence = numbers;
            data.direction = params.directions ? params.directions[0] : 'forwards';
            data.stepSize = params.step_sizes ? params.step_sizes[0] : null;
        }

        // Comparison questions
        else if (questionText.toLowerCase().includes('compare') ||
                 questionText.includes('>') ||
                 questionText.includes('<')) {
            const numbers = this.extractNumbersFromText(questionText);
            data.type = 'comparison';
            data.numbers = numbers;
        }

        // Place value questions (N03, N04 modules)
        else if (moduleId.includes('N03') || moduleId.includes('N04')) {
            const numbers = this.extractNumbersFromText(questionText);
            data.type = 'place_value';
            data.number = numbers[0];
            data.operation = this.extractPlaceValueOperation(questionText);
        }

        // Generic: extract numbers and structure
        else {
            data.type = 'generic';
            data.numbers = this.extractNumbersFromText(questionText);
            data.hasGaps = questionText.includes('?');
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
        const visualType = this.detectVisualType(question.questionRendered || question.text, question.type, params);
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

    /**
     * Helper to trigger file download
     */
    downloadFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export default App;

```
--- END FILE: src\ui\app.js ---

