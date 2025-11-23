/**
 * Test script for [unknown] pattern in missing_addend
 */

import { generateQuestion } from './src/generators/C01_Y2_CALC_mental.js';
import { MODULES } from './src/curriculum/parameters.js';

console.log('Testing [unknown] Pattern in Missing Addend\n');
console.log('='.repeat(70));

const params = {
    ...MODULES['C01_Y2_CALC'].parameters[1],
    operations: ['missing_addend']
};

// Generate equation and word problem variants
console.log('\n📋 EQUATION VARIANT TESTS (10 samples):\n');

for (let i = 1; i <= 10; i++) {
    const question = generateQuestion(params, 1);

    // Only show equation variants (not word problems)
    if (question.questionTemplate.includes('[unknown]')) {
        console.log(`\nSample ${i}:`);
        console.log(`  Template:  ${question.questionTemplate}`);
        console.log(`  Rendered:  ${question.questionRendered}`);
        console.log(`  Values:    ${JSON.stringify(question.values)}`);
        console.log(`  Answer:    ${question.answer}`);

        // Validation
        const hasUnknown = question.values.hasOwnProperty('unknown');
        const unknownEqualsAnswer = question.values.unknown === question.answer;
        const hasUnknownMetadata = question.valueMetadata.hasOwnProperty('unknown');

        console.log(`  ✓ Has unknown value: ${hasUnknown}`);
        console.log(`  ✓ Unknown = answer: ${unknownEqualsAnswer} (${question.values.unknown} === ${question.answer})`);
        console.log(`  ✓ Has unknown metadata: ${hasUnknownMetadata}`);
    }
}

console.log('\n\n' + '='.repeat(70));
console.log('VALIDATION CHECKS');
console.log('='.repeat(70));

// Generate one more for detailed validation
const testQ = generateQuestion(params, 1);

// Force equation variant if we got a word problem
let equationQ = testQ;
while (!equationQ.questionTemplate.includes('[unknown]')) {
    equationQ = generateQuestion(params, 1);
}

console.log('\nTest Question:');
console.log(JSON.stringify(equationQ, null, 2));

const checks = [
    {
        name: 'questionTemplate has [unknown]',
        pass: equationQ.questionTemplate.includes('[unknown]')
    },
    {
        name: 'questionRendered has ___',
        pass: equationQ.questionRendered.includes('___')
    },
    {
        name: 'values.unknown exists',
        pass: equationQ.values.hasOwnProperty('unknown')
    },
    {
        name: 'values.unknown equals answer',
        pass: equationQ.values.unknown === equationQ.answer
    },
    {
        name: 'valueMetadata.unknown exists',
        pass: equationQ.valueMetadata.hasOwnProperty('unknown')
    },
    {
        name: 'unknown metadata has correct type',
        pass: equationQ.valueMetadata.unknown.type === 'number'
    },
    {
        name: 'values.known exists',
        pass: equationQ.values.hasOwnProperty('known')
    },
    {
        name: 'values.result exists',
        pass: equationQ.values.hasOwnProperty('result')
    },
    {
        name: 'answer is raw number',
        pass: typeof equationQ.answer === 'number'
    },
    {
        name: 'locale is en-GB',
        pass: equationQ.locale === 'en-GB'
    },
    {
        name: 'universal is true',
        pass: equationQ.universal === true
    }
];

console.log('\n');
checks.forEach(check => {
    const icon = check.pass ? '✅' : '❌';
    console.log(`${icon} ${check.name}: ${check.pass}`);
});

const allPassed = checks.every(c => c.pass);
console.log(`\n${allPassed ? '✅ ALL CHECKS PASSED' : '❌ SOME CHECKS FAILED'}`);
console.log('='.repeat(70));
