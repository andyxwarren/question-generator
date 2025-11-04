/**
 * Curriculum Alignment Testing Script
 * Tests all 9 updated modules to validate curriculum alignment fixes
 */

import { MODULES } from './src/curriculum/parameters.js';
import QuestionEngine from './src/core/questionEngine.js';

const MODULES_TO_TEST = [
    {
        id: 'N01_Y5_NPV',
        name: 'Year 5 Counting in Powers of 10',
        priority: 'CRITICAL',
        description: 'count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000',
        tests: [
            {
                name: 'No negative numbers',
                check: (questions) => {
                    const negatives = questions.filter(q => {
                        const numbers = (q.text + ' ' + (q.answer || '')).match(/-\d+/g);
                        return numbers && numbers.length > 0;
                    });
                    return {
                        pass: negatives.length === 0,
                        message: negatives.length === 0
                            ? 'No negative numbers found'
                            : `Found ${negatives.length} questions with negative numbers`,
                        details: negatives.slice(0, 3).map(q => q.text)
                    };
                }
            },
            {
                name: 'Range 0 to 1,000,000',
                check: (questions) => {
                    const outOfRange = questions.filter(q => {
                        const numbers = (q.text + ' ' + (q.answer || '')).match(/\d{1,3}(?:,?\d{3})*/g);
                        if (!numbers) return false;
                        return numbers.some(n => {
                            const val = parseInt(n.replace(/,/g, ''));
                            return val < 0 || val > 1000000;
                        });
                    });
                    return {
                        pass: outOfRange.length === 0,
                        message: outOfRange.length === 0
                            ? 'All numbers within 0-1,000,000 range'
                            : `Found ${outOfRange.length} questions with out-of-range numbers`,
                        details: outOfRange.slice(0, 3).map(q => q.text)
                    };
                }
            },
            {
                name: 'Parameters use powers_of_10',
                check: (questions, params) => {
                    const allLevelsCorrect = [1, 2, 3, 4].every(level => {
                        const p = params.parameters[level];
                        return p.powers_of_10 && !p.step_sizes;
                    });
                    return {
                        pass: allLevelsCorrect,
                        message: allLevelsCorrect
                            ? 'All levels use powers_of_10 parameter'
                            : 'Some levels still use step_sizes instead of powers_of_10'
                    };
                }
            }
        ]
    },
    {
        id: 'N02_Y2_NPV',
        name: 'Year 2 Read/Write/Compare',
        priority: 'HIGH',
        description: 'read and write numbers to at least 100 in numerals and in words; compare and order numbers from 0 up to 100; use <, > and = signs',
        tests: [
            {
                name: 'Description includes comparison/ordering',
                check: (questions, params) => {
                    const desc = params.description.toLowerCase();
                    const hasCompare = desc.includes('compare');
                    const hasOrder = desc.includes('order');
                    const hasSigns = desc.includes('<') || desc.includes('>') || desc.includes('=');
                    return {
                        pass: hasCompare && hasOrder && hasSigns,
                        message: hasCompare && hasOrder && hasSigns
                            ? 'Description includes comparison, ordering, and symbols'
                            : 'Description missing some elements'
                    };
                }
            },
            {
                name: 'Parameters include comparison operations',
                check: (questions, params) => {
                    const ops = params.parameters[1]?.operations || [];
                    const hasCompare = ops.includes('compare_two');
                    const hasSymbols = ops.includes('use_symbols');
                    const hasOrder = ops.includes('order_two') || ops.includes('order_three');
                    return {
                        pass: hasCompare && hasSymbols && hasOrder,
                        message: hasCompare && hasSymbols && hasOrder
                            ? 'Parameters include compare_two, use_symbols, and ordering'
                            : 'Missing some expected operations'
                    };
                }
            }
        ]
    },
    {
        id: 'N02_Y3_NPV',
        name: 'Year 3 Numbers to 1000',
        priority: 'HIGH',
        description: 'compare and order numbers up to 1,000; read and write numbers to 1,000 in numerals and in words; find 10 or 100 more or less than a given number',
        tests: [
            {
                name: 'Description includes 10/100 more or less',
                check: (questions, params) => {
                    const desc = params.description.toLowerCase();
                    const hasMoreLess = desc.includes('10 or 100 more or less') ||
                                       (desc.includes('10') && desc.includes('100') && desc.includes('more or less'));
                    return {
                        pass: hasMoreLess,
                        message: hasMoreLess
                            ? 'Description includes "10 or 100 more or less"'
                            : 'Description missing "10 or 100 more or less"'
                    };
                }
            },
            {
                name: 'Parameters include ten_more/less and hundred_more/less',
                check: (questions, params) => {
                    const allLevels = [1, 2, 3, 4].map(level => {
                        const ops = params.parameters[level]?.operations || [];
                        return {
                            level,
                            hasTen: ops.includes('ten_more') || ops.includes('ten_less'),
                            hasHundred: ops.includes('hundred_more') || ops.includes('hundred_less')
                        };
                    });
                    const someHaveBoth = allLevels.some(l => l.hasTen && l.hasHundred);
                    return {
                        pass: someHaveBoth,
                        message: someHaveBoth
                            ? 'Parameters include ten_more/less and hundred_more/less operations'
                            : 'Missing ten_more/less or hundred_more/less operations',
                        details: allLevels.map(l => `Level ${l.level}: Ten=${l.hasTen}, Hundred=${l.hasHundred}`)
                    };
                }
            }
        ]
    },
    {
        id: 'N02_Y4_NPV',
        name: 'Year 4 Order/Compare Beyond 1000',
        priority: 'HIGH',
        description: 'order and compare numbers beyond 1,000; find 1,000 more or less than a given number',
        tests: [
            {
                name: 'Description includes 1,000 more or less',
                check: (questions, params) => {
                    const desc = params.description.toLowerCase();
                    const hasThousandMoreLess = desc.includes('1,000 more or less') ||
                                               desc.includes('1000 more or less');
                    return {
                        pass: hasThousandMoreLess,
                        message: hasThousandMoreLess
                            ? 'Description includes "1,000 more or less"'
                            : 'Description missing "1,000 more or less"'
                    };
                }
            },
            {
                name: 'Parameters include thousand_more/less',
                check: (questions, params) => {
                    const allLevels = [1, 2, 3, 4].map(level => {
                        const ops = params.parameters[level]?.operations || [];
                        return ops.includes('thousand_more') || ops.includes('thousand_less');
                    });
                    const allHave = allLevels.every(has => has);
                    return {
                        pass: allHave,
                        message: allHave
                            ? 'All levels include thousand_more/less operations'
                            : 'Some levels missing thousand_more/less operations'
                    };
                }
            }
        ]
    },
    {
        id: 'N02_Y5_NPV',
        name: 'Year 5 Numbers to 1 Million',
        priority: 'MEDIUM',
        description: 'read, write, order and compare numbers to at least 1,000,000',
        tests: [
            {
                name: 'Description does NOT include "determine value of digit"',
                check: (questions, params) => {
                    const desc = params.description.toLowerCase();
                    const hasPlaceValue = desc.includes('determine') && desc.includes('value') && desc.includes('digit');
                    return {
                        pass: !hasPlaceValue,
                        message: !hasPlaceValue
                            ? 'Description correctly excludes place value content'
                            : 'Description still contains place value content (should be in N03)'
                    };
                }
            },
            {
                name: 'Parameters do NOT include place_value_digit',
                check: (questions, params) => {
                    const allLevels = [1, 2, 3, 4].map(level => {
                        const ops = params.parameters[level]?.operations || [];
                        return {
                            level,
                            hasPlaceValue: ops.includes('place_value_digit')
                        };
                    });
                    const noneHave = allLevels.every(l => !l.hasPlaceValue);
                    return {
                        pass: noneHave,
                        message: noneHave
                            ? 'No levels contain place_value_digit operation'
                            : 'Some levels still contain place_value_digit (should be in N03)',
                        details: allLevels.filter(l => l.hasPlaceValue).map(l => `Level ${l.level} has place_value_digit`)
                    };
                }
            }
        ]
    },
    {
        id: 'N02_Y6_NPV',
        name: 'Year 6 Numbers to 10 Million',
        priority: 'MEDIUM',
        description: 'read, write, order and compare numbers up to 10,000,000',
        tests: [
            {
                name: 'Description does NOT include "determine value of digit"',
                check: (questions, params) => {
                    const desc = params.description.toLowerCase();
                    const hasPlaceValue = desc.includes('determine') && desc.includes('value') && desc.includes('digit');
                    return {
                        pass: !hasPlaceValue,
                        message: !hasPlaceValue
                            ? 'Description correctly excludes place value content'
                            : 'Description still contains place value content (should be in N03)'
                    };
                }
            },
            {
                name: 'Parameters do NOT include place_value_digit',
                check: (questions, params) => {
                    const allLevels = [1, 2, 3, 4].map(level => {
                        const ops = params.parameters[level]?.operations || [];
                        return {
                            level,
                            hasPlaceValue: ops.includes('place_value_digit')
                        };
                    });
                    const noneHave = allLevels.every(l => !l.hasPlaceValue);
                    return {
                        pass: noneHave,
                        message: noneHave
                            ? 'No levels contain place_value_digit operation'
                            : 'Some levels still contain place_value_digit (should be in N03)',
                        details: allLevels.filter(l => l.hasPlaceValue).map(l => `Level ${l.level} has place_value_digit`)
                    };
                }
            }
        ]
    },
    {
        id: 'N03_Y4_NPV',
        name: 'Year 4 Place Value & Roman Numerals',
        priority: 'MEDIUM',
        description: 'recognise the place value of each digit in a four-digit number (thousands, hundreds, tens and ones); read Roman numerals to 100 (I to C) and know that over time, the numeral system changed to include the concept of zero and place value',
        tests: [
            {
                name: 'Description includes historical context',
                check: (questions, params) => {
                    const desc = params.description.toLowerCase();
                    const hasHistory = desc.includes('over time') && desc.includes('numeral system') &&
                                      desc.includes('zero') && desc.includes('place value');
                    return {
                        pass: hasHistory,
                        message: hasHistory
                            ? 'Description includes historical context about zero and place value'
                            : 'Description missing historical context'
                    };
                }
            },
            {
                name: 'Parameters include zero_concept operation',
                check: (questions, params) => {
                    const level4Ops = params.parameters[4]?.operations || [];
                    const hasZeroConcept = level4Ops.includes('zero_concept');
                    return {
                        pass: hasZeroConcept,
                        message: hasZeroConcept
                            ? 'Level 4 includes zero_concept operation'
                            : 'Level 4 missing zero_concept operation'
                    };
                }
            }
        ]
    },
    {
        id: 'N03_Y5_NPV',
        name: 'Year 5 Place Value to 1M & Roman Years',
        priority: 'MEDIUM',
        description: 'determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M) and recognise years written in Roman numerals',
        tests: [
            {
                name: 'Description includes year recognition',
                check: (questions, params) => {
                    const desc = params.description.toLowerCase();
                    const hasYears = desc.includes('recognise years written in roman numerals') ||
                                    desc.includes('years') && desc.includes('roman');
                    return {
                        pass: hasYears,
                        message: hasYears
                            ? 'Description includes "recognise years written in Roman numerals"'
                            : 'Description missing year recognition'
                    };
                }
            },
            {
                name: 'Parameters include roman_year operation',
                check: (questions, params) => {
                    const allLevels = [1, 2, 3, 4].map(level => {
                        const ops = params.parameters[level]?.operations || [];
                        return ops.includes('roman_year');
                    });
                    const someHave = allLevels.some(has => has);
                    return {
                        pass: someHave,
                        message: someHave
                            ? 'Parameters include roman_year operation'
                            : 'Missing roman_year operation'
                    };
                }
            },
            {
                name: 'Roman year ranges are appropriate',
                check: (questions, params) => {
                    const allLevels = [1, 2, 3, 4].map(level => {
                        const p = params.parameters[level];
                        return {
                            level,
                            years: p?.roman_years || []
                        };
                    });
                    const someHaveYears = allLevels.some(l => l.years.length > 0);
                    return {
                        pass: someHaveYears,
                        message: someHaveYears
                            ? 'Roman year lists defined'
                            : 'No roman_years parameter found',
                        details: allLevels.map(l => `Level ${l.level}: ${l.years.length} years`)
                    };
                }
            }
        ]
    },
    {
        id: 'N01_Y4_NPV',
        name: 'Year 4 Count in Multiples',
        priority: 'LOW',
        description: 'Count in multiples of 6, 7, 9, 25 and 1,000',
        tests: [
            {
                name: 'Description uses "1,000" with comma',
                check: (questions, params) => {
                    const desc = params.description;
                    const hasComma = desc.includes('1,000');
                    const hasNoComma = desc.includes('1000') && !desc.includes('1,000');
                    return {
                        pass: hasComma && !hasNoComma,
                        message: hasComma && !hasNoComma
                            ? 'Description uses "1,000" with comma'
                            : 'Description uses "1000" without comma'
                    };
                }
            }
        ]
    }
];

async function generateQuestions(moduleId, level, count = 10) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        try {
            const q = QuestionEngine.generateOne(moduleId, level);
            if (q) questions.push(q);
        } catch (error) {
            console.error(`Error generating question for ${moduleId} level ${level}:`, error.message);
        }
    }
    return questions;
}

async function testModule(moduleConfig) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Testing: ${moduleConfig.name} (${moduleConfig.id})`);
    console.log(`Priority: ${moduleConfig.priority}`);
    console.log(`Expected Description: "${moduleConfig.description}"`);
    console.log(`${'='.repeat(80)}\n`);

    const moduleParams = MODULES[moduleConfig.id];
    if (!moduleParams) {
        console.log(`❌ MODULE NOT FOUND: ${moduleConfig.id}\n`);
        return {
            moduleId: moduleConfig.id,
            name: moduleConfig.name,
            priority: moduleConfig.priority,
            passed: 0,
            failed: moduleConfig.tests.length,
            total: moduleConfig.tests.length,
            passRate: 0,
            results: []
        };
    }

    console.log(`Actual Description: "${moduleParams.description}"\n`);

    let passed = 0;
    let failed = 0;
    const results = [];

    // Generate questions for all levels
    const allQuestions = [];
    for (let level = 1; level <= 4; level++) {
        const levelQuestions = await generateQuestions(moduleConfig.id, level, 10);
        allQuestions.push(...levelQuestions);
        console.log(`  Generated ${levelQuestions.length} questions for Level ${level}`);
    }
    console.log();

    // Run tests
    for (const test of moduleConfig.tests) {
        const result = test.check(allQuestions, moduleParams);
        results.push({ name: test.name, ...result });

        const icon = result.pass ? '✅' : '❌';
        console.log(`${icon} ${test.name}`);
        console.log(`   ${result.message}`);
        if (result.details) {
            result.details.forEach(detail => console.log(`   - ${detail}`));
        }
        console.log();

        if (result.pass) passed++;
        else failed++;
    }

    // Show sample questions
    if (allQuestions.length > 0) {
        console.log(`Sample Questions (showing 3 of ${allQuestions.length}):`);
        allQuestions.slice(0, 3).forEach((q, i) => {
            console.log(`  ${i + 1}. ${q.text}`);
            console.log(`     Answer: ${q.answer || q.answers?.join(', ') || 'N/A'} | Type: ${q.type}`);
        });
        console.log();
    }

    const totalTests = moduleConfig.tests.length;
    const passRate = ((passed / totalTests) * 100).toFixed(1);
    console.log(`Results: ${passed}/${totalTests} tests passed (${passRate}%)`);

    return {
        moduleId: moduleConfig.id,
        name: moduleConfig.name,
        priority: moduleConfig.priority,
        passed,
        failed,
        total: totalTests,
        passRate: parseFloat(passRate),
        results
    };
}

async function runAllTests() {
    console.log('\n');
    console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                   CURRICULUM ALIGNMENT VALIDATION TESTING                     ║');
    console.log('║                          9 Updated Modules (2025-11-04)                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════════════╝');
    console.log('\n');

    const allResults = [];

    for (const moduleConfig of MODULES_TO_TEST) {
        const result = await testModule(moduleConfig);
        allResults.push(result);
    }

    // Summary Report
    console.log('\n');
    console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                              SUMMARY REPORT                                   ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════════════╝');
    console.log('\n');

    const totalPassed = allResults.filter(r => r.failed === 0).length;
    const totalWarnings = allResults.filter(r => r.failed > 0 && r.passed > 0).length;
    const totalFailed = allResults.filter(r => r.passed === 0).length;

    console.log(`Modules Fully Passing:  ${totalPassed}/9 ✅`);
    console.log(`Modules with Warnings:  ${totalWarnings}/9 ⚠️`);
    console.log(`Modules Failing:        ${totalFailed}/9 ❌`);
    console.log();

    console.log('Detailed Results by Priority:\n');

    const byPriority = {
        CRITICAL: allResults.filter(r => r.priority === 'CRITICAL'),
        HIGH: allResults.filter(r => r.priority === 'HIGH'),
        MEDIUM: allResults.filter(r => r.priority === 'MEDIUM'),
        LOW: allResults.filter(r => r.priority === 'LOW')
    };

    for (const [priority, results] of Object.entries(byPriority)) {
        if (results.length === 0) continue;
        console.log(`${priority} Priority:`);
        results.forEach(r => {
            const status = r.failed === 0 ? '✅' : r.passed > 0 ? '⚠️' : '❌';
            console.log(`  ${status} ${r.name}: ${r.passed}/${r.total} tests passed (${r.passRate}%)`);
            if (r.failed > 0) {
                r.results.filter(t => !t.pass).forEach(t => {
                    console.log(`     ❌ ${t.name}: ${t.message}`);
                });
            }
        });
        console.log();
    }

    console.log('\n');
    console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                             TESTING COMPLETE                                  ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════════════╝');
    console.log('\n');

    return allResults;
}

// Run tests
runAllTests().catch(console.error);
