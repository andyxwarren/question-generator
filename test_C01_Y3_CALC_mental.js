/**
 * Test Suite for C01_Y3_CALC_mental Generator
 * Validates Schema v2.0 compliance across all operations and levels (1-4)
 */

import generator from './src/generators/C01_Y3_CALC_mental.js';
import { MODULES } from './src/curriculum/parameters.js';

function validateSchemaV2(question, testName) {
    const errors = [];

    if (!question.questionTemplate) errors.push(`${testName}: Missing questionTemplate`);
    if (!question.questionRendered) errors.push(`${testName}: Missing questionRendered`);
    if (!question.values) errors.push(`${testName}: Missing values object`);
    if (!question.valueMetadata) errors.push(`${testName}: Missing valueMetadata object`);
    if (question.answer === undefined) errors.push(`${testName}: Missing answer`);
    if (!question.locale) errors.push(`${testName}: Missing locale`);
    if (question.universal === undefined) errors.push(`${testName}: Missing universal flag`);

    if (question.values) {
        for (const [key, value] of Object.entries(question.values)) {
            if (typeof value === 'string' && /[£$,]/.test(value)) {
                errors.push(`${testName}: Value '${key}' appears to be formatted: ${value}`);
            }
        }
    }

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

    if (question.locale && question.locale !== 'en-GB') {
        errors.push(`${testName}: Locale should be 'en-GB', got '${question.locale}'`);
    }

    if (question.hintTemplate && !question.hintRendered) {
        errors.push(`${testName}: Has hintTemplate but missing hintRendered`);
    }

    if (question.universal !== true) {
        errors.push(`${testName}: universal should be true for number operations`);
    }

    return errors;
}

function testAllLevels() {
    console.log('=== Testing C01_Y3_CALC_mental Generator ===\n');

    const moduleId = 'C01_Y3_CALC';
    const params = MODULES[moduleId]?.parameters;

    if (!params) {
        console.log(`❌ ERROR: No parameters found for ${moduleId}`);
        process.exit(1);
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
            const testName = `L${level}_Q${i+1}`;

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

                if (question.module !== moduleId) {
                    console.log(`\n❌ ${testName} - Module ID mismatch`);
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

    console.log('\n' + '='.repeat(60));
    console.log(`Total Questions: ${totalTests}, Errors: ${totalErrors}`);

    if (totalErrors === 0) {
        console.log('✅ ✅ ✅ ALL TESTS PASSED! ✅ ✅ ✅');
    } else {
        console.log(`❌ TESTS FAILED: ${totalErrors} errors`);
    }

    return totalErrors === 0;
}

const passed = testAllLevels();
process.exit(passed ? 0 : 1);
