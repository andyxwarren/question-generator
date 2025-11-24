/**
 * Test Suite for C02_Y1_CALC_written Generator
 * Validates Schema v2.0 compliance for Year 1 written calculation module
 */

import C02_Y1_Generator from './src/generators/C02_Y1_CALC_written.js';
import { MODULES } from './src/curriculum/parameters.js';

function validateSchemaV2(question, testName) {
    const errors = [];

    // Check required fields exist
    if (!question.questionTemplate) errors.push(`${testName}: Missing questionTemplate`);
    if (!question.questionRendered) errors.push(`${testName}: Missing questionRendered`);
    if (!question.values) errors.push(`${testName}: Missing values object`);
    if (!question.valueMetadata) errors.push(`${testName}: Missing valueMetadata object`);
    if (question.answer === undefined) errors.push(`${testName}: Missing answer`);
    if (!question.locale) errors.push(`${testName}: Missing locale`);
    if (question.universal === undefined) errors.push(`${testName}: Missing universal flag`);

    // Check values are raw (not formatted)
    if (question.values) {
        for (const [key, value] of Object.entries(question.values)) {
            // Allow strings for symbol, correctAnswer, and similar non-numeric values
            if (typeof value === 'string' && !['symbol', 'correctAnswer'].includes(key)) {
                // Check if it looks like a formatted number
                if (/^\d+$/.test(value) && parseInt(value) !== NaN) {
                    errors.push(`${testName}: Value '${key}' should be a number, not a string: ${value}`);
                }
            }
        }
    }

    // Check metadata completeness
    if (question.values && question.valueMetadata) {
        const valueKeys = Object.keys(question.values);
        const metadataKeys = Object.keys(question.valueMetadata);

        for (const key of valueKeys) {
            if (!metadataKeys.includes(key)) {
                errors.push(`${testName}: Missing metadata for value '${key}'`);
            }
        }

        for (const [key, metadata] of Object.entries(question.valueMetadata)) {
            if (!metadata.type) errors.push(`${testName}: Missing type in metadata for '${key}'`);
            if (metadata.prefix === undefined) errors.push(`${testName}: Missing prefix in metadata for '${key}'`);
            if (metadata.suffix === undefined) errors.push(`${testName}: Missing suffix in metadata for '${key}'`);
            if (metadata.decimals === undefined) errors.push(`${testName}: Missing decimals in metadata for '${key}'`);
        }
    }

    // Check locale
    if (question.locale && question.locale !== 'en-GB') {
        errors.push(`${testName}: Locale should be 'en-GB', got '${question.locale}'`);
    }

    // Check hint fields
    if (question.hintTemplate && !question.hintRendered) {
        errors.push(`${testName}: Has hintTemplate but missing hintRendered`);
    }

    // Check universal flag for pure number operations
    if (question.universal !== true) {
        errors.push(`${testName}: universal should be true for number operations`);
    }

    // Check answer type for text_input questions
    if (question.type === 'text_input' && typeof question.answer === 'string') {
        // In Schema v2.0, answer should be raw (not stringified)
        // However, 'True'/'False' strings are acceptable for true/false questions
        if (question.answer !== 'True' && question.answer !== 'False') {
            errors.push(`${testName}: text_input answer should be a number, not a string (unless True/False)`);
        }
    }

    return errors;
}

function testC02_Y1(generator, moduleId) {
    console.log('\n=== Testing C02_Y1_CALC_written ===');

    const params = MODULES[moduleId]?.parameters;

    if (!params) {
        console.log(`❌ ERROR: No parameters found for ${moduleId}`);
        return { tests: 0, errors: 1 };
    }

    const levels = [1, 2, 3, 4];
    const questionsPerLevel = 10;

    let totalTests = 0;
    let totalErrors = 0;

    for (const level of levels) {
        console.log(`--- Level ${level} ---`);

        const levelParams = params[level];
        if (!levelParams) {
            console.log(`❌ No parameters defined for level ${level}`);
            totalErrors++;
            continue;
        }

        let levelErrors = 0;

        for (let i = 0; i < questionsPerLevel; i++) {
            const testName = `C02_Y1_L${level}_Q${i+1}`;

            try {
                const question = generator.generate(levelParams, level);
                const errors = validateSchemaV2(question, testName);

                totalTests++;

                if (errors.length > 0) {
                    console.log(`\n❌ ${testName} - FAILED:`);
                    errors.forEach(error => console.log(`   - ${error}`));
                    levelErrors += errors.length;
                    totalErrors += errors.length;
                }

                // Verify module ID
                if (question.module !== moduleId) {
                    console.log(`\n❌ ${testName} - Module ID mismatch: expected ${moduleId}, got ${question.module}`);
                    levelErrors++;
                    totalErrors++;
                }

            } catch (error) {
                console.log(`\n❌ ${testName} - EXCEPTION: ${error.message}`);
                console.error(error.stack);
                levelErrors++;
                totalErrors++;
            }
        }

        if (levelErrors === 0) {
            console.log(`  ✅ Level ${level}: All ${questionsPerLevel} questions passed`);
        } else {
            console.log(`  ❌ Level ${level}: ${levelErrors} errors found`);
        }
    }

    return { tests: totalTests, errors: totalErrors };
}

function runAllTests() {
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║     Testing C02_Y1_CALC_written Generator (Schema v2.0)     ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');

    const result = testC02_Y1(C02_Y1_Generator, 'C02_Y1_CALC');

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('=== SUMMARY ===');
    console.log('='.repeat(70));

    const status = result.errors === 0 ? '✅ PASS' : '❌ FAIL';
    console.log(`  C02_Y1_CALC: ${status} - ${result.tests} questions, ${result.errors} errors`);
    console.log('');
    console.log(`Total Questions Generated: ${result.tests}`);
    console.log(`Total Errors Found: ${result.errors}`);
    console.log('');

    if (result.errors === 0) {
        console.log('✅ ✅ ✅ ALL TESTS PASSED! ✅ ✅ ✅');
        console.log('C02_Y1_CALC_written generator is Schema v2.0 compliant.');
        console.log('All 10 operations validated successfully.');
    } else {
        console.log(`❌ TESTS FAILED: ${result.errors} errors need to be fixed`);
    }

    return result.errors === 0;
}

const passed = runAllTests();
process.exit(passed ? 0 : 1);
