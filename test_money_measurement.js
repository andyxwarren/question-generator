/**
 * Test script to verify money and measurement refactored schemas
 */

import { generateQuestion as generateMoney } from './src/generators/M03_Y2_MEAS_money.js';
import { generateQuestion as generateMeasurement } from './src/generators/M07_Y4_MEAS_perimeter_area.js';
import { MODULES } from './src/curriculum/parameters.js';

console.log('Testing Refactored Schemas: Money & Measurement\n');
console.log('='.repeat(70));

// Test Money Generator
console.log('\n\n📊 TEST 1: MONEY GENERATOR (M03_Y2_MEAS)\n');
console.log('-'.repeat(70));

const moneyParams = MODULES['M03_Y2_MEAS'];
const testMoneyParams = {
    ...moneyParams.parameters[1],
    operations: ['combine_same_coins']  // Force specific operation
};

const moneyQuestion = generateMoney(testMoneyParams, 1);

console.log('\n📋 Generated Money Question:\n');
console.log(JSON.stringify(moneyQuestion, null, 2));

console.log('\n✅ Money Question Validation:\n');
console.log(`✓ questionTemplate: ${moneyQuestion.questionTemplate}`);
console.log(`✓ questionRendered: ${moneyQuestion.questionRendered}`);
console.log(`✓ answer type: ${typeof moneyQuestion.answer} (${moneyQuestion.answer})`);
console.log(`✓ answerMetadata.type: "${moneyQuestion.answerMetadata?.type}"`);
console.log(`✓ answerMetadata.suffix: "${moneyQuestion.answerMetadata?.suffix}"`);
console.log(`✓ locale: "${moneyQuestion.locale}"`);
console.log(`✓ universal: ${moneyQuestion.universal} (should be false for money)`);

// Test Measurement Generator
console.log('\n\n📐 TEST 2: MEASUREMENT GENERATOR (M07_Y4_MEAS)\n');
console.log('-'.repeat(70));

const measurementParams = MODULES['M07_Y4_MEAS'];
const testMeasurementParams = {
    ...measurementParams.parameters[1],
    operations: ['count_squares']  // Force specific operation
};

const measurementQuestion = generateMeasurement(testMeasurementParams, 1);

console.log('\n📋 Generated Measurement Question:\n');
console.log(JSON.stringify(measurementQuestion, null, 2));

console.log('\n✅ Measurement Question Validation:\n');
console.log(`✓ questionTemplate: ${measurementQuestion.questionTemplate.substring(0, 50)}...`);
console.log(`✓ answer type: ${typeof measurementQuestion.answer} (${measurementQuestion.answer})`);
console.log(`✓ answerMetadata.type: "${measurementQuestion.answerMetadata?.type}"`);
console.log(`✓ answerMetadata.suffix: "${measurementQuestion.answerMetadata?.suffix}"`);
console.log(`✓ locale: "${measurementQuestion.locale}"`);
console.log(`✓ universal: ${measurementQuestion.universal} (should be false for measurements)`);

// Validate metadata structure
console.log('\n\n🔍 METADATA STRUCTURE VALIDATION:\n');
console.log('-'.repeat(70));

function validateMetadata(question, name) {
    const requiredFields = ['prefix', 'suffix', 'decimals', 'type'];
    let allValid = true;

    console.log(`\n${name}:`);

    // Check valueMetadata
    if (question.valueMetadata) {
        Object.entries(question.valueMetadata).forEach(([key, meta]) => {
            const hasAll = requiredFields.every(f => meta.hasOwnProperty(f));
            const status = hasAll ? '✓' : '✗';
            console.log(`  ${status} ${key}: ${JSON.stringify(meta)}`);
            if (!hasAll) allValid = false;
        });
    }

    // Check answerMetadata
    if (question.answerMetadata) {
        const hasAll = requiredFields.every(f => question.answerMetadata.hasOwnProperty(f));
        const status = hasAll ? '✓' : '✗';
        console.log(`  ${status} answerMetadata: ${JSON.stringify(question.answerMetadata)}`);
        if (!hasAll) allValid = false;
    }

    return allValid;
}

const moneyValid = validateMetadata(moneyQuestion, 'Money Generator');
const measurementValid = validateMetadata(measurementQuestion, 'Measurement Generator');

// Summary
console.log('\n\n' + '='.repeat(70));
console.log('SUMMARY:');
console.log('='.repeat(70));

console.log(`\nMoney Generator (M03):`);
console.log(`  ${moneyValid ? '✅' : '❌'} Metadata structure: ${moneyValid ? 'VALID' : 'INVALID'}`);
console.log(`  ${typeof moneyQuestion.answer === 'number' ? '✅' : '❌'} Answer is number: ${typeof moneyQuestion.answer === 'number'}`);
console.log(`  ${moneyQuestion.answerMetadata?.type === 'money' ? '✅' : '❌'} Correct type (money): ${moneyQuestion.answerMetadata?.type === 'money'}`);
console.log(`  ${moneyQuestion.answerMetadata?.suffix === 'p' ? '✅' : '❌'} Correct suffix (p): "${moneyQuestion.answerMetadata?.suffix}"`);
console.log(`  ${!moneyQuestion.universal ? '✅' : '❌'} Not universal: ${!moneyQuestion.universal}`);

console.log(`\nMeasurement Generator (M07):`);
console.log(`  ${measurementValid ? '✅' : '❌'} Metadata structure: ${measurementValid ? 'VALID' : 'INVALID'}`);
console.log(`  ${typeof measurementQuestion.answer === 'number' ? '✅' : '❌'} Answer is number: ${typeof measurementQuestion.answer === 'number'}`);
console.log(`  ${measurementQuestion.answerMetadata?.type === 'area' ? '✅' : '❌'} Correct type (area): ${measurementQuestion.answerMetadata?.type === 'area'}`);
console.log(`  ${measurementQuestion.answerMetadata?.suffix === ' squares' ? '✅' : '❌'} Correct suffix ( squares): "${measurementQuestion.answerMetadata?.suffix}"`);
console.log(`  ${!measurementQuestion.universal ? '✅' : '❌'} Not universal: ${!measurementQuestion.universal}`);

const allTestsPassed = moneyValid && measurementValid &&
    typeof moneyQuestion.answer === 'number' &&
    typeof measurementQuestion.answer === 'number' &&
    !moneyQuestion.universal &&
    !measurementQuestion.universal;

console.log(`\n${allTestsPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
console.log('='.repeat(70));
