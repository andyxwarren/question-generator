/**
 * Test script to verify N01_Y5_NPV generator bounds checking fix
 * Tests that sequences stay within [0, max_value] for all difficulty levels
 */

import { N01_MODULES } from './src/curriculum/parameters/N01_counting.js';
import N01_Y5_Generator from './src/generators/N01_Y5_NPV_counting.js';

const MODULE_ID = 'N01_Y5_NPV';
const moduleParams = N01_MODULES[MODULE_ID];

console.log('='.repeat(80));
console.log('N01_Y5_NPV Generator Bounds Checking Test');
console.log('='.repeat(80));
console.log();

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Test each difficulty level
for (let level = 1; level <= 4; level++) {
    const params = moduleParams.parameters[level];
    const { min_value, max_value } = params;

    console.log(`\nLevel ${level}: Testing bounds [${min_value}, ${max_value.toLocaleString()}]`);
    console.log('-'.repeat(80));

    // Generate 20 questions per level to test thoroughly
    for (let i = 0; i < 20; i++) {
        totalTests++;
        const question = N01_Y5_Generator.generate(params, level);

        // Extract all numbers from the question
        let numbers = [];

        if (question.type === 'text_input' && question.answers) {
            // Fill blanks question - answers array contains the missing values
            numbers = question.answers;
        } else if (question.type === 'multiple_choice') {
            // Multiple choice - all options should be valid
            numbers = question.options;
        }

        // Also check numbers in the question text
        const textNumbers = question.text.match(/[\d,]+/g);
        if (textNumbers) {
            numbers = numbers.concat(
                textNumbers.map(n => parseInt(n.replace(/,/g, '')))
            );
        }

        // Remove duplicates
        numbers = [...new Set(numbers)].filter(n => !isNaN(n));

        // Validate all numbers are within bounds
        const invalidNumbers = numbers.filter(n => n < min_value || n > max_value);

        if (invalidNumbers.length > 0) {
            failedTests++;
            console.log(`  ❌ FAIL #${i + 1}: Found out-of-bounds values: ${invalidNumbers.join(', ')}`);
            console.log(`     Question: ${question.text}`);
            console.log(`     All numbers: ${numbers.join(', ')}`);
        } else {
            passedTests++;
            if (i < 3) {
                // Show first 3 valid questions per level
                console.log(`  ✅ PASS #${i + 1}: ${question.text}`);
                console.log(`     Values in range: ${Math.min(...numbers).toLocaleString()} to ${Math.max(...numbers).toLocaleString()}`);
            }
        }
    }

    console.log(`\n  Level ${level} Summary: ${passedTests}/${totalTests} tests passed so far`);
}

// Final summary
console.log('\n' + '='.repeat(80));
console.log('FINAL RESULTS');
console.log('='.repeat(80));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} (${Math.round(passedTests / totalTests * 100)}%)`);
console.log(`Failed: ${failedTests} (${Math.round(failedTests / totalTests * 100)}%)`);

if (failedTests === 0) {
    console.log('\n✅ ALL TESTS PASSED! Generator correctly bounds all sequences to [0, max_value]');
} else {
    console.log('\n❌ SOME TESTS FAILED! Generator still has bounds checking issues');
}

console.log('='.repeat(80));
