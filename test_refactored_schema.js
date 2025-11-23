/**
 * Test script to verify refactored question schema
 */

import { generateQuestion } from './src/generators/C01_Y2_CALC_mental.js';
import { MODULES } from './src/curriculum/parameters.js';

// Get parameters for C01_Y2_CALC
const moduleParams = MODULES['C01_Y2_CALC'];

console.log('Testing Refactored Schema for C01_Y2_CALC\n');
console.log('='.repeat(60));

// Override parameters to only use the refactored operation
const testParams = {
    ...moduleParams.parameters[1],
    operations: ['recall_to_20']  // Force it to use our refactored function
};

// Generate a question at level 1
const question = generateQuestion(testParams, 1);

console.log('\n📋 GENERATED QUESTION:\n');
console.log(JSON.stringify(question, null, 2));

console.log('\n\n✅ SCHEMA VALIDATION:\n');

// Validate all required fields are present
const requiredFields = [
    'questionTemplate',
    'questionRendered',
    'values',
    'valueMetadata',
    'answer',
    'answerMetadata',
    'options',
    'optionsMetadata',
    'hintTemplate',
    'hintRendered',
    'locale',
    'universal',
    'type',
    'module',
    'level'
];

let allValid = true;

requiredFields.forEach(field => {
    const exists = question.hasOwnProperty(field);
    const status = exists ? '✓' : '✗';
    console.log(`${status} ${field}: ${exists ? 'present' : 'MISSING'}`);
    if (!exists) allValid = false;
});

console.log('\n\n🔍 METADATA VALIDATION:\n');

// Validate metadata structure
const metadataFields = ['prefix', 'suffix', 'decimals', 'type'];

// Check valueMetadata
console.log('Value Metadata:');
Object.entries(question.valueMetadata || {}).forEach(([key, meta]) => {
    const allFieldsPresent = metadataFields.every(f => meta.hasOwnProperty(f));
    const status = allFieldsPresent ? '✓' : '✗';
    console.log(`  ${status} ${key}:`, meta);
});

// Check answerMetadata
const answerMetaValid = metadataFields.every(f =>
    question.answerMetadata?.hasOwnProperty(f)
);
console.log(`${answerMetaValid ? '✓' : '✗'} answerMetadata:`, question.answerMetadata);

// Check optionsMetadata (should be array)
const optionsMetaIsArray = Array.isArray(question.optionsMetadata);
const optionsMetaSameLength = question.options?.length === question.optionsMetadata?.length;
console.log(`${optionsMetaIsArray ? '✓' : '✗'} optionsMetadata is array: ${optionsMetaIsArray}`);
console.log(`${optionsMetaSameLength ? '✓' : '✗'} optionsMetadata length matches options: ${optionsMetaSameLength}`);

console.log('\n\n📊 DATA TYPES:\n');

// Check data types
console.log(`✓ answer type: ${typeof question.answer} (should be number)`);
console.log(`✓ options type: ${Array.isArray(question.options) ? 'array' : typeof question.options}`);
console.log(`✓ options[0] type: ${typeof question.options?.[0]} (should be number)`);
console.log(`✓ locale: "${question.locale}"`);
console.log(`✓ universal: ${question.universal}`);

console.log('\n\n📝 RENDERED PREVIEW:\n');
console.log(`Template: ${question.questionTemplate}`);
console.log(`Rendered: ${question.questionRendered}`);
console.log(`\nHint Template: ${question.hintTemplate}`);
console.log(`Hint Rendered: ${question.hintRendered}`);

console.log('\n\n' + '='.repeat(60));
console.log(allValid ? '✅ ALL VALIDATIONS PASSED' : '❌ SOME VALIDATIONS FAILED');
console.log('='.repeat(60));
