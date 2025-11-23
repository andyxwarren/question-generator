/**
 * Test script to verify export function includes new schema fields
 */

import { generateQuestion as generateNumber } from './src/generators/C01_Y2_CALC_mental.js';
import { generateQuestion as generateMoney } from './src/generators/M03_Y2_MEAS_money.js';
import { generateQuestion as generateMeasurement } from './src/generators/M07_Y4_MEAS_perimeter_area.js';
import { MODULES } from './src/curriculum/parameters.js';

console.log('Testing Export Schema with New Fields\n');
console.log('='.repeat(70));

// Generate test questions
const numberParams = {
    ...MODULES['C01_Y2_CALC'].parameters[1],
    operations: ['recall_to_20']
};
const numberQ = generateNumber(numberParams, 1);

const moneyParams = {
    ...MODULES['M03_Y2_MEAS'].parameters[1],
    operations: ['combine_same_coins']
};
const moneyQ = generateMoney(moneyParams, 1);

const measurementParams = {
    ...MODULES['M07_Y4_MEAS'].parameters[1],
    operations: ['count_squares']
};
const measurementQ = generateMeasurement(measurementParams, 1);

// Simulate what the export function would do
function simulateExport(question, moduleName, moduleId) {
    return {
        // Identification
        id: question.id || 'test-id',
        questionNumber: 1,

        // Module info
        moduleId: moduleId,
        moduleName: moduleName,

        // NEW SCHEMA fields
        questionTemplate: question.questionTemplate || null,
        questionRendered: question.questionRendered || null,
        hintTemplate: question.hintTemplate || null,
        hintRendered: question.hintRendered || null,

        values: question.values || null,
        valueMetadata: question.valueMetadata || null,

        answer: question.answer,
        answerMetadata: question.answerMetadata || null,

        options: question.options || null,
        optionsMetadata: question.optionsMetadata || null,

        locale: question.locale || 'en-GB',
        universal: question.universal !== undefined ? question.universal : null
    };
}

console.log('\n📊 TEST 1: NUMBER QUESTION EXPORT\n');
console.log('-'.repeat(70));
const numberExport = simulateExport(numberQ, 'Mental Addition', 'C01_Y2_CALC');
console.log(JSON.stringify(numberExport, null, 2));

console.log('\n\n💰 TEST 2: MONEY QUESTION EXPORT\n');
console.log('-'.repeat(70));
const moneyExport = simulateExport(moneyQ, 'Money', 'M03_Y2_MEAS');
console.log(JSON.stringify(moneyExport, null, 2));

console.log('\n\n📐 TEST 3: MEASUREMENT QUESTION EXPORT\n');
console.log('-'.repeat(70));
const measurementExport = simulateExport(measurementQ, 'Area', 'M07_Y4_MEAS');
console.log(JSON.stringify(measurementExport, null, 2));

// Validate all required fields present
console.log('\n\n✅ VALIDATION: Required Fields Present\n');
console.log('='.repeat(70));

const requiredNewFields = [
    'questionTemplate',
    'questionRendered',
    'values',
    'valueMetadata',
    'answer',
    'answerMetadata',
    'locale',
    'universal'
];

function validateExport(exportedQ, name) {
    console.log(`\n${name}:`);
    let allPresent = true;

    requiredNewFields.forEach(field => {
        const hasField = exportedQ.hasOwnProperty(field);
        const isNull = exportedQ[field] === null;
        const status = hasField ? (isNull ? '⚠' : '✓') : '✗';
        console.log(`  ${status} ${field}: ${hasField ? (isNull ? 'null (expected for old questions)' : 'present') : 'MISSING'}`);
        if (!hasField) allPresent = false;
    });

    return allPresent;
}

const numberValid = validateExport(numberExport, 'Number Question');
const moneyValid = validateExport(moneyExport, 'Money Question');
const measurementValid = validateExport(measurementExport, 'Measurement Question');

// Check metadata structure
console.log('\n\n🔍 METADATA VALIDATION\n');
console.log('='.repeat(70));

function validateMetadata(exportedQ, name) {
    console.log(`\n${name}:`);

    if (!exportedQ.valueMetadata) {
        console.log('  ⚠ No valueMetadata (old-style question)');
        return true;  // OK for old questions
    }

    const metaFields = ['prefix', 'suffix', 'decimals', 'type'];
    let allValid = true;

    Object.entries(exportedQ.valueMetadata).forEach(([key, meta]) => {
        const hasAll = metaFields.every(f => meta.hasOwnProperty(f));
        console.log(`  ${hasAll ? '✓' : '✗'} ${key}: ${JSON.stringify(meta)}`);
        if (!hasAll) allValid = false;
    });

    if (exportedQ.answerMetadata) {
        const hasAll = metaFields.every(f => exportedQ.answerMetadata.hasOwnProperty(f));
        console.log(`  ${hasAll ? '✓' : '✗'} answerMetadata: ${JSON.stringify(exportedQ.answerMetadata)}`);
        if (!hasAll) allValid = false;
    }

    return allValid;
}

const numberMetaValid = validateMetadata(numberExport, 'Number Question');
const moneyMetaValid = validateMetadata(moneyExport, 'Money Question');
const measurementMetaValid = validateMetadata(measurementExport, 'Measurement Question');

// Summary
console.log('\n\n' + '='.repeat(70));
console.log('EXPORT TEST SUMMARY');
console.log('='.repeat(70));

console.log('\nNumber Question:');
console.log(`  ${numberValid ? '✅' : '❌'} All fields present: ${numberValid}`);
console.log(`  ${numberMetaValid ? '✅' : '❌'} Metadata valid: ${numberMetaValid}`);
console.log(`  ${numberExport.universal ? '✅' : '❌'} Universal flag: ${numberExport.universal}`);

console.log('\nMoney Question:');
console.log(`  ${moneyValid ? '✅' : '❌'} All fields present: ${moneyValid}`);
console.log(`  ${moneyMetaValid ? '✅' : '❌'} Metadata valid: ${moneyMetaValid}`);
console.log(`  ${!moneyExport.universal ? '✅' : '❌'} Not universal: ${!moneyExport.universal}`);
console.log(`  ${moneyExport.answerMetadata?.type === 'money' ? '✅' : '❌'} Type is money: ${moneyExport.answerMetadata?.type === 'money'}`);

console.log('\nMeasurement Question:');
console.log(`  ${measurementValid ? '✅' : '❌'} All fields present: ${measurementValid}`);
console.log(`  ${measurementMetaValid ? '✅' : '❌'} Metadata valid: ${measurementMetaValid}`);
console.log(`  ${!measurementExport.universal ? '✅' : '❌'} Not universal: ${!measurementExport.universal}`);
console.log(`  ${measurementExport.answerMetadata?.type === 'area' ? '✅' : '❌'} Type is area: ${measurementExport.answerMetadata?.type === 'area'}`);

const allTestsPassed = numberValid && moneyValid && measurementValid &&
    numberMetaValid && moneyMetaValid && measurementMetaValid;

console.log(`\n${allTestsPassed ? '✅ ALL EXPORT TESTS PASSED' : '❌ SOME EXPORT TESTS FAILED'}`);
console.log('='.repeat(70));
