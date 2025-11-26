/**
 * Schema Validation Test Script
 *
 * Tests all modules across all strands and levels against their schemas.
 * Run with: node test-schemas.js
 */

import { MODULES, getParameters } from './src/curriculum/parameters.js';
import { validateParameters, getSchema, getValidValues, getStrand } from './src/core/schemas/index.js';

// Track results
const results = {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: []
};

console.log('='.repeat(70));
console.log('SCHEMA VALIDATION TEST');
console.log('='.repeat(70));
console.log();

// Get all module IDs grouped by strand
const moduleIds = Object.keys(MODULES);
const byStrand = {
    Number: moduleIds.filter(id => id.startsWith('N')),
    Calculation: moduleIds.filter(id => id.startsWith('C')),
    Measurement: moduleIds.filter(id => id.startsWith('M'))
};

console.log(`Found ${moduleIds.length} modules:`);
console.log(`  - Number: ${byStrand.Number.length}`);
console.log(`  - Calculation: ${byStrand.Calculation.length}`);
console.log(`  - Measurement: ${byStrand.Measurement.length}`);
console.log();

// Test each strand
for (const [strandName, strandModules] of Object.entries(byStrand)) {
    console.log('-'.repeat(70));
    console.log(`STRAND: ${strandName} (${strandModules.length} modules)`);
    console.log('-'.repeat(70));

    for (const moduleId of strandModules) {
        const module = MODULES[moduleId];

        // Check schema exists
        const schema = getSchema(moduleId);
        if (!schema) {
            console.log(`  [WARN] ${moduleId}: No schema found`);
            results.warnings++;
            continue;
        }

        // Test all 4 levels
        for (let level = 1; level <= 4; level++) {
            results.total++;

            const params = module.parameters[level];
            if (!params) {
                console.log(`  [SKIP] ${moduleId} L${level}: No parameters defined`);
                continue;
            }

            const errors = validateParameters(moduleId, level, params);

            if (errors.length === 0) {
                results.passed++;
                // Only show passed if verbose
                // console.log(`  [PASS] ${moduleId} L${level}`);
            } else {
                results.failed++;
                console.log(`  [FAIL] ${moduleId} L${level}:`);
                for (const err of errors) {
                    console.log(`         - ${err}`);
                }
                results.errors.push({ moduleId, level, errors });
            }
        }
    }
    console.log();
}

// Summary
console.log('='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));
console.log(`Total tests:  ${results.total}`);
console.log(`Passed:       ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
console.log(`Failed:       ${results.failed}`);
console.log(`Warnings:     ${results.warnings}`);
console.log();

if (results.failed > 0) {
    console.log('FAILED MODULES:');
    const uniqueModules = [...new Set(results.errors.map(e => e.moduleId))];
    for (const moduleId of uniqueModules) {
        const moduleErrors = results.errors.filter(e => e.moduleId === moduleId);
        console.log(`  ${moduleId}: ${moduleErrors.length} level(s) failed`);
    }
    console.log();
    process.exit(1);
} else {
    console.log('All validations passed!');
    process.exit(0);
}
