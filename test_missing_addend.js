/**
 * Test script for missing_addend refactor
 */

import { generateQuestion } from './src/generators/C01_Y2_CALC_mental.js';
import { MODULES } from './src/curriculum/parameters.js';

console.log('Testing Missing Addend Refactor\n');
console.log('='.repeat(70));

const params = {
    ...MODULES['C01_Y2_CALC'].parameters[1],
    operations: ['missing_addend']  // Force missing_addend operation
};

// Generate a few questions to see both variants (equation and word problem)
console.log('\n📋 GENERATING 5 MISSING ADDEND QUESTIONS:\n');

for (let i = 1; i <= 5; i++) {
    const question = generateQuestion(params, 1);

    console.log(`\nQuestion ${i}:`);
    console.log('-'.repeat(70));
    console.log(`✓ questionTemplate: ${question.questionTemplate}`);
    console.log(`✓ questionRendered: ${question.questionRendered}`);
    console.log(`✓ values:`, JSON.stringify(question.values, null, 2));
    console.log(`✓ valueMetadata:`, JSON.stringify(question.valueMetadata, null, 2));
    console.log(`✓ answer: ${question.answer} (type: ${typeof question.answer})`);
    console.log(`✓ answerMetadata:`, JSON.stringify(question.answerMetadata));
    console.log(`✓ options: [${question.options.join(', ')}]`);
    console.log(`✓ optionsMetadata: ${question.optionsMetadata ? question.optionsMetadata.length + ' items' : 'null'}`);
    console.log(`✓ hintTemplate: ${question.hintTemplate}`);
    console.log(`✓ hintRendered: ${question.hintRendered}`);
    console.log(`✓ locale: ${question.locale}`);
    console.log(`✓ universal: ${question.universal}`);
}

// Validation
console.log('\n\n' + '='.repeat(70));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(70));

const testQuestion = generateQuestion(params, 1);

const checks = [
    { name: 'questionTemplate exists', pass: !!testQuestion.questionTemplate },
    { name: 'questionRendered exists', pass: !!testQuestion.questionRendered },
    { name: 'values is object', pass: typeof testQuestion.values === 'object' && testQuestion.values !== null },
    { name: 'valueMetadata exists', pass: !!testQuestion.valueMetadata },
    { name: 'answer is number', pass: typeof testQuestion.answer === 'number' },
    { name: 'answerMetadata exists', pass: !!testQuestion.answerMetadata },
    { name: 'options is array', pass: Array.isArray(testQuestion.options) },
    { name: 'optionsMetadata is array', pass: Array.isArray(testQuestion.optionsMetadata) },
    { name: 'locale is en-GB', pass: testQuestion.locale === 'en-GB' },
    { name: 'universal is true', pass: testQuestion.universal === true },
    { name: 'hintTemplate exists', pass: !!testQuestion.hintTemplate },
    { name: 'hintRendered exists', pass: !!testQuestion.hintRendered }
];

checks.forEach(check => {
    const icon = check.pass ? '✅' : '❌';
    console.log(`${icon} ${check.name}: ${check.pass}`);
});

const allPassed = checks.every(c => c.pass);
console.log(`\n${allPassed ? '✅ ALL CHECKS PASSED' : '❌ SOME CHECKS FAILED'}`);
console.log('='.repeat(70));
