/**
 * Year 6 Number Problems Generator
 *
 * Module: N06_Y6_NPV - "Solve number problems and practical problems that involve 6N2-6N5"
 *
 * This synthesis module combines concepts from:
 * - N02: Read, write, order and compare numbers up to 10,000,000
 * - N03: Determine the value of each digit in numbers up to 10,000,000
 * - N04: Round any whole number to a required degree of accuracy
 * - N05: Use negative numbers in context, and calculate intervals across zero
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    generateUniqueNumbers,
    sortAscending,
    roundToNearest
} from './helpers/N02_numberHelpers.js';

import {
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber
} from './helpers/N03_placeValueHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'large_place_value_problems':
            return generateLargePlaceValueProblem(params, level);
        case 'multi_level_rounding_problems':
            return generateMultiLevelRoundingProblem(params, level);
        case 'ordering_comparing_large_numbers':
            return generateOrderingComparingProblem(params, level);
        case 'negative_interval_problems':
            return generateNegativeIntervalProblem(params, level);
        case 'multi_concept_integration':
            return generateMultiConceptProblem(params, level);
        default:
            return generateLargePlaceValueProblem(params, level);
    }
}

/**
 * OPERATION 1: Large Place Value Problems
 * Work with place value in numbers up to 10,000,000
 */
function generateLargePlaceValueProblem(params, level) {
    const problemTypes = [
        'compose_very_large_number',
        'find_digit_value_millions',
        'digit_comparison_large',
        'place_value_word_problem'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'compose_very_large_number': {
            // Generate a number with 6-7 digits
            const number = randomInt(1000000, Math.min(9999999, params.max_value));

            const millions = Math.floor(number / 1000000);
            const hundredThousands = Math.floor((number % 1000000) / 100000);
            const tenThousands = Math.floor((number % 100000) / 10000);
            const thousands = Math.floor((number % 10000) / 1000);
            const hundreds = Math.floor((number % 1000) / 100);
            const tens = Math.floor((number % 100) / 10);
            const ones = number % 10;

            const contexts = [
                `What number has ${millions} millions, ${hundredThousands} hundred thousands, ${tenThousands} ten thousands, ${thousands} thousands, ${hundreds} hundreds, ${tens} tens and ${ones} ones?`,
                `A country's population is composed of ${millions} millions, ${hundredThousands} hundred thousands, ${tenThousands} ten thousands, ${thousands} thousands, ${hundreds} hundreds, ${tens} tens and ${ones} ones. What is the population?`,
                `Build a number using: ${millions} millions, ${hundredThousands} hundred thousands, ${tenThousands} ten thousands, ${thousands} thousands, ${hundreds} hundreds, ${tens} tens, ${ones} ones.`
            ];

            const text = randomChoice(contexts);

            const distractors = generateDistractors(number, 3, 1000000, params.max_value);
            const options = shuffle([number, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: number.toString(),
                hint: `Build from largest place: ${millions}000000 + ${hundredThousands}00000 + ...`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'find_digit_value_millions': {
            const number = randomInt(1000000, Math.min(9999999, params.max_value));
            const places = ['millions', 'hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones'];
            const place = randomChoice(places);
            const digit = getDigitAtPlace(number, place);

            if (digit === 0) {
                return generateLargePlaceValueProblem(params, level);
            }

            const value = getPlaceValue(number, place);

            const contexts = [
                `In the number ${formatNumber(number)}, what is the value of the digit ${digit}?`,
                `A city has ${formatNumber(number)} inhabitants. What does the digit ${digit} represent in this number?`,
                `The distance from Earth to a star is ${formatNumber(number)} kilometres. What is the value of the ${digit} in this number?`,
                `A company's annual revenue is £${formatNumber(number)}. What does the digit ${digit} represent?`
            ];

            const text = randomChoice(contexts);

            // Generate distractors from other place values
            const distractors = new Set([digit]);
            const otherPlaces = places.filter(p => p !== place);
            otherPlaces.forEach(p => {
                const otherValue = getPlaceValue(number, p);
                if (otherValue > 0 && otherValue !== value) {
                    distractors.add(otherValue);
                }
            });

            // Add some systematic offsets
            const offsets = [10, 100, 1000, 10000, 100000, -10, -100, -1000, -10000, -100000];
            for (const offset of offsets) {
                if (distractors.size >= 4) break;
                const distractor = value + offset;
                if (distractor > 0 && distractor !== value) {
                    distractors.add(distractor);
                }
            }

            const options = shuffle([value, ...Array.from(distractors).slice(0, 3)]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: value.toString(),
                hint: `The ${digit} is in the ${place} place`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'digit_comparison_large': {
            const number = randomInt(1000000, Math.min(9999999, params.max_value));
            const places = ['millions', 'hundred thousands', 'ten thousands', 'thousands'];
            const place1 = randomChoice(places);
            const place2 = randomChoice(places.filter(p => p !== place1));

            const value1 = getPlaceValue(number, place1);
            const value2 = getPlaceValue(number, place2);

            if (value1 === 0 || value2 === 0 || value1 === value2) {
                return generateLargePlaceValueProblem(params, level);
            }

            const difference = Math.abs(value1 - value2);

            const contexts = [
                `In the number ${formatNumber(number)}, what is the difference between the value of the digit in the ${place1} place and the ${place2} place?`,
                `A satellite has completed ${formatNumber(number)} orbits. What is the difference between the ${place1} value and the ${place2} value?`,
                `The population is ${formatNumber(number)}. Find the difference between the ${place1} place value and the ${place2} place value.`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                value1,
                value2,
                value1 + value2,
                ...generateDistractors(difference, 2, 0, value1 > value2 ? value1 : value2)
            ].filter(d => d !== difference);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([difference, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: difference.toString(),
                hint: `Find values at both places, then subtract`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'place_value_word_problem': {
            const number = randomInt(1000000, Math.min(9999999, params.max_value));

            const millions = Math.floor(number / 1000000);
            const hundredThousands = Math.floor((number % 1000000) / 100000);
            const tenThousands = Math.floor((number % 100000) / 10000);

            const contexts = [
                {
                    text: `A country has a population of ${formatNumber(number)}. How many complete groups of 1,000,000 people are there?`,
                    answer: millions
                },
                {
                    text: `A national budget is £${formatNumber(number)}. How many complete groups of 100,000 pounds?`,
                    answer: Math.floor(number / 100000)
                },
                {
                    text: `${formatNumber(number)} trees are planted. How many complete groups of 10,000 trees?`,
                    answer: Math.floor(number / 10000)
                }
            ];

            const context = randomChoice(contexts);
            const text = context.text;
            const answer = context.answer;

            const distractors = [
                millions,
                hundredThousands,
                tenThousands,
                Math.floor(number / 1000),
                ...generateDistractors(answer, 2, 0, 100)
            ].filter(d => d !== answer);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([answer, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Look at the digits that represent complete groups`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        default:
            return generateLargePlaceValueProblem(params, level);
    }
}

/**
 * OPERATION 2: Multi-Level Rounding Problems
 * Round to any required degree of accuracy in practical contexts
 */
function generateMultiLevelRoundingProblem(params, level) {
    const problemTypes = [
        'flexible_rounding',
        'estimate_large_sum_difference',
        'rounding_comparison',
        'appropriate_rounding_context',
        'multiple_rounding_levels'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'flexible_rounding': {
            const number = randomInt(1000000, Math.min(9999999, params.max_value));
            const roundTo = randomChoice(params.rounding_bases);

            // Ensure number is not already a multiple
            const adjustedNumber = number % roundTo === 0
                ? number + randomChoice([1, 2, 3, -1, -2, -3])
                : number;

            const rounded = roundToNearest(adjustedNumber, roundTo);

            const contexts = [
                `A city's population is ${formatNumber(adjustedNumber)}. Round to the nearest ${formatNumber(roundTo)}.`,
                `A country's area is ${formatNumber(adjustedNumber)} square kilometres. Round to the nearest ${formatNumber(roundTo)}.`,
                `A company's profit was £${formatNumber(adjustedNumber)}. Round to the nearest ${formatNumber(roundTo)}.`,
                `A website had ${formatNumber(adjustedNumber)} visitors last year. Round to the nearest ${formatNumber(roundTo)}.`,
                `The distance to a planet is ${formatNumber(adjustedNumber)} kilometres. Round to the nearest ${formatNumber(roundTo)}.`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                rounded + roundTo,
                rounded - roundTo,
                Math.floor(adjustedNumber / roundTo) * roundTo,
                Math.ceil(adjustedNumber / roundTo) * roundTo
            ].filter(d => d !== rounded && d > 0 && d <= params.max_value);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([rounded, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: rounded.toString(),
                hint: `Round ${formatNumber(adjustedNumber)} to nearest ${formatNumber(roundTo)}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'estimate_large_sum_difference': {
            const num1 = randomInt(1000000, Math.min(5000000, params.max_value));
            const num2 = randomInt(1000000, Math.min(5000000, params.max_value));
            const operation = randomChoice(['+', '-']);

            // Choose appropriate rounding base
            const roundTo = num1 >= 5000000 || num2 >= 5000000 ? 1000000 : 100000;
            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);
            const estimate = operation === '+' ? rounded1 + rounded2 : Math.abs(rounded1 - rounded2);

            const contexts = [
                `Two countries have populations of ${formatNumber(num1)} and ${formatNumber(num2)}. Estimate the ${operation === '+' ? 'combined population' : 'population difference'}. (Round to nearest ${formatNumber(roundTo)})`,
                `Stadium A holds ${formatNumber(num1)} people and Stadium B holds ${formatNumber(num2)} people. Estimate ${operation === '+' ? 'their combined capacity' : 'the capacity difference'}. (Round to nearest ${formatNumber(roundTo)})`,
                `Company earnings: Year 1 was £${formatNumber(num1)}, Year 2 was £${formatNumber(num2)}. Estimate the ${operation === '+' ? 'total' : 'difference'}. (Round to nearest ${formatNumber(roundTo)})`
            ];

            const text = randomChoice(contexts);

            const actual = operation === '+' ? num1 + num2 : Math.abs(num1 - num2);
            const distractors = [
                actual,
                estimate + roundTo,
                estimate - roundTo,
                rounded1,
                rounded2
            ].filter(d => d !== estimate && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([estimate, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: estimate.toString(),
                hint: `Round both: ${formatNumber(rounded1)} ${operation} ${formatNumber(rounded2)}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'rounding_comparison': {
            const roundTo = randomChoice([100000, 1000000]);
            let num1 = randomInt(1000000, params.max_value);
            let num2 = randomInt(1000000, params.max_value);

            // Ensure numbers are different
            if (num1 === num2) {
                num2 = num1 + randomInt(roundTo, roundTo * 3);
                if (num2 > params.max_value) {
                    num2 = num1 - randomInt(roundTo, roundTo * 2);
                }
            }

            let rounded1 = roundToNearest(num1, roundTo);
            let rounded2 = roundToNearest(num2, roundTo);

            // If they round to same value, adjust num2 to ensure different rounded values
            if (rounded1 === rounded2) {
                num2 = rounded1 + roundTo * randomChoice([2, 3, -2, -3]);
                if (num2 < 1000000 || num2 > params.max_value) {
                    num2 = rounded1 + roundTo * 2;
                }
                rounded2 = roundToNearest(num2, roundTo);
            }

            const contexts = [
                `Country A has ${formatNumber(num1)} people. Country B has ${formatNumber(num2)} people. Round both to the nearest ${formatNumber(roundTo)}. Which country has more people?`,
                `Museum A had ${formatNumber(num1)} visitors. Museum B had ${formatNumber(num2)} visitors. Round both to nearest ${formatNumber(roundTo)}. Which had more?`,
                `Budget A: £${formatNumber(num1)}. Budget B: £${formatNumber(num2)}. Round to nearest ${formatNumber(roundTo)}. Which is larger?`
            ];

            const text = randomChoice(contexts);

            const answer = rounded1 > rounded2 ? 'A' : 'B';
            const options = ['A', 'B'];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Round: A = ${formatNumber(rounded1)}, B = ${formatNumber(rounded2)}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'appropriate_rounding_context': {
            const contexts = [
                {
                    text: `A charity raised £{amount}. For a news headline, what is the most appropriate way to express this amount?`,
                    amount: randomInt(2345678, 8765432),
                    options_func: (amt) => [
                        formatNumber(roundToNearest(amt, 1000000)),
                        formatNumber(roundToNearest(amt, 100000)),
                        formatNumber(roundToNearest(amt, 10)),
                        formatNumber(amt)
                    ],
                    best_index: 0 // Rounded to millions is most appropriate for headlines
                },
                {
                    text: `A census counted {amount} people in a region. For a summary report, which rounding is most appropriate?`,
                    amount: randomInt(1234567, 5678901),
                    options_func: (amt) => [
                        formatNumber(roundToNearest(amt, 100000)),
                        formatNumber(roundToNearest(amt, 10)),
                        formatNumber(roundToNearest(amt, 1000000)),
                        formatNumber(amt)
                    ],
                    best_index: 0 // Hundred thousands for census data
                },
                {
                    text: `The distance between two cities is {amount} metres. For a map label, what precision is most suitable?`,
                    amount: randomInt(3456789, 7890123),
                    options_func: (amt) => [
                        formatNumber(roundToNearest(amt, 10000)),
                        formatNumber(roundToNearest(amt, 10)),
                        formatNumber(roundToNearest(amt, 1)),
                        formatNumber(roundToNearest(amt, 1000000))
                    ],
                    best_index: 0 // Ten thousands for map distances
                }
            ];

            const context = randomChoice(contexts);
            const amount = context.amount;
            const text = context.text.replace('{amount}', formatNumber(amount));
            const options = context.options_func(amount);
            const answer = options[context.best_index];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Consider what level of precision is appropriate for the context`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'multiple_rounding_levels': {
            const roundTo1 = randomChoice([100000, 1000000]);
            const roundTo2 = roundTo1 === 100000 ? 1000000 : 100000;

            // Generate a number that ensures different rounded values
            // Start with a base and add an offset to avoid exact multiples
            const base = randomInt(1, 8) * 1000000;
            const offset = randomInt(234567, 765432);
            let number = base + offset;

            // Ensure within bounds
            if (number > Math.min(8765432, params.max_value)) {
                number = randomInt(1234567, Math.min(8765432, params.max_value));
            }

            let rounded1 = roundToNearest(number, roundTo1);
            let rounded2 = roundToNearest(number, roundTo2);

            // If still equal (very unlikely), adjust number slightly
            if (rounded1 === rounded2) {
                number = number + 250000; // Add offset to ensure different rounding
                rounded1 = roundToNearest(number, roundTo1);
                rounded2 = roundToNearest(number, roundTo2);
            }

            const difference = Math.abs(rounded1 - rounded2);

            const text = `A number is ${formatNumber(number)}. What is the difference between rounding it to the nearest ${formatNumber(roundTo1)} and the nearest ${formatNumber(roundTo2)}?`;

            const distractors = [
                rounded1,
                rounded2,
                number,
                ...generateDistractors(difference, 2, 0, 1000000)
            ].filter(d => d !== difference && d >= 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([difference, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: difference.toString(),
                hint: `Round to ${formatNumber(roundTo1)}: ${formatNumber(rounded1)}, to ${formatNumber(roundTo2)}: ${formatNumber(rounded2)}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        default:
            return generateMultiLevelRoundingProblem(params, level);
    }
}

/**
 * OPERATION 3: Ordering & Comparing Large Numbers
 * Order and compare numbers up to 10,000,000 in practical contexts
 */
function generateOrderingComparingProblem(params, level) {
    const problemTypes = [
        'compare_two_very_large',
        'order_multiple_large',
        'find_largest_smallest',
        'ordering_word_problem'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'compare_two_very_large': {
            let num1 = randomInt(1000000, params.max_value);
            let num2 = randomInt(1000000, params.max_value);

            // Ensure numbers are different
            if (num1 === num2) {
                num2 = num1 + randomChoice([1000, 10000, 100000, 1000000]);
                if (num2 > params.max_value) {
                    num2 = num1 - randomChoice([1000, 10000, 100000]);
                }
            }

            const contexts = [
                { text: `Country A has a population of ${formatNumber(num1)}. Country B has ${formatNumber(num2)}. Which country has the larger population?`, options: ['Country A', 'Country B'] },
                { text: `Company X earned £${formatNumber(num1)} last year. Company Y earned £${formatNumber(num2)}. Which company earned more?`, options: ['Company X', 'Company Y'] },
                { text: `Website A had ${formatNumber(num1)} visitors. Website B had ${formatNumber(num2)} visitors. Which had more visitors?`, options: ['Website A', 'Website B'] },
                { text: `Forest A has ${formatNumber(num1)} trees. Forest B has ${formatNumber(num2)} trees. Which forest is larger?`, options: ['Forest A', 'Forest B'] }
            ];

            const context = randomChoice(contexts);
            const text = context.text;

            const answer = num1 > num2 ? context.options[0] : context.options[1];
            const options = context.options;

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Compare ${formatNumber(num1)} and ${formatNumber(num2)}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'order_multiple_large': {
            const count = level <= 2 ? 3 : 4;
            // Ensure sufficient range for unique numbers (at least 10x the count needed)
            const minValue = Math.max(params.min_value, Math.floor(params.max_value * 0.1));
            const numbers = generateUniqueNumbers(count, minValue, params.max_value);

            // Fallback to simpler compare_two problem if not enough unique numbers
            if (numbers.length < count) {
                const num1 = randomInt(minValue, params.max_value);
                const num2 = randomInt(minValue, params.max_value);
                if (num1 === num2) {
                    return {
                        text: `Which is larger: ${formatNumber(num1)} or ${formatNumber(num1 + 1000)}?`,
                        type: 'multiple_choice',
                        options: [formatNumber(num1), formatNumber(num1 + 1000)],
                        answer: formatNumber(num1 + 1000),
                        hint: 'Compare the two numbers',
                        module: 'N06_Y6_NPV',
                        level: level
                    };
                }
                const larger = Math.max(num1, num2);
                return {
                    text: `Which is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
                    type: 'multiple_choice',
                    options: [formatNumber(num1), formatNumber(num2)],
                    answer: formatNumber(larger),
                    hint: 'Compare the two numbers',
                    module: 'N06_Y6_NPV',
                    level: level
                };
            }

            const sorted = sortAscending(numbers);

            const items = [
                { label: 'population', unit: '' },
                { label: 'revenue', unit: ' (£)' },
                { label: 'attendance', unit: '' },
                { label: 'area', unit: ' (km²)' },
                { label: 'budget', unit: ' (£)' }
            ];
            const item = randomChoice(items);

            const labels = ['A', 'B', 'C', 'D', 'E'];
            const selectedLabels = labels.slice(0, count);

            let text = '';
            numbers.forEach((num, i) => {
                text += `${selectedLabels[i]}: ${formatNumber(num)}${item.unit}. `;
            });

            const askFor = randomChoice(['highest', 'lowest']);
            text += `Which has the ${askFor} ${item.label}?`;

            const answer = askFor === 'highest'
                ? selectedLabels[numbers.indexOf(sorted[sorted.length - 1])]
                : selectedLabels[numbers.indexOf(sorted[0])];

            return {
                text: text,
                type: 'multiple_choice',
                options: selectedLabels,
                answer: answer,
                hint: `Find the ${askFor === 'highest' ? 'largest' : 'smallest'} number`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'find_largest_smallest': {
            const count = level <= 2 ? 3 : 4;
            // Ensure sufficient range for unique numbers (at least 10x the count needed)
            const minValue = Math.max(params.min_value, Math.floor(params.max_value * 0.1));
            const numbers = generateUniqueNumbers(count, minValue, params.max_value);

            // Fallback to simpler compare_two problem if not enough unique numbers
            if (numbers.length < count) {
                const num1 = randomInt(minValue, params.max_value);
                const num2 = randomInt(minValue, params.max_value);
                const larger = num1 > num2 ? num1 : (num2 > num1 ? num2 : num1 + 1000);
                return {
                    text: `Which is larger: ${formatNumber(num1)} or ${formatNumber(num2 === num1 ? num2 + 1000 : num2)}?`,
                    type: 'multiple_choice',
                    options: [formatNumber(num1), formatNumber(num2 === num1 ? num2 + 1000 : num2)],
                    answer: formatNumber(larger),
                    hint: 'Compare the two numbers',
                    module: 'N06_Y6_NPV',
                    level: level
                };
            }

            const sorted = sortAscending(numbers);

            const contexts = [
                {
                    text: `The populations of ${count} cities are: ${numbers.map(n => formatNumber(n)).join(', ')}. What is the population of the largest city?`,
                    answer: formatNumber(sorted[sorted.length - 1])
                },
                {
                    text: `Annual budgets: £${numbers.map(n => formatNumber(n)).join(', £')}. What is the smallest budget?`,
                    answer: formatNumber(sorted[0])
                },
                {
                    text: `Distances to stars: ${numbers.map(n => formatNumber(n)).join(', ')} km. Which is the greatest distance?`,
                    answer: formatNumber(sorted[sorted.length - 1])
                },
                {
                    text: `Website visitor counts: ${numbers.map(n => formatNumber(n)).join(', ')}. What is the lowest visitor count?`,
                    answer: formatNumber(sorted[0])
                }
            ];

            const context = randomChoice(contexts);
            const text = context.text;
            const answer = context.answer;

            const distractors = numbers.filter(n => n !== answer).slice(0, 3);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Compare all numbers to find the required value`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'ordering_word_problem': {
            // Ensure sufficient range for unique numbers (at least 10x the count needed)
            const minValue = Math.max(params.min_value, Math.floor(params.max_value * 0.1));
            const numbers = generateUniqueNumbers(3, minValue, params.max_value);

            // Fallback to simple two-number comparison if not enough unique numbers
            if (numbers.length < 3) {
                const num1 = randomInt(minValue, params.max_value);
                const num2 = num1 + randomInt(1000, Math.max(10000, Math.floor(params.max_value * 0.01)));
                const larger = Math.max(num1, num2);
                const smaller = Math.min(num1, num2);

                return {
                    text: `Two countries have populations of ${formatNumber(num1)} and ${formatNumber(num2)}. Which country has more people?`,
                    type: 'multiple_choice',
                    options: [formatNumber(num1), formatNumber(num2)],
                    answer: formatNumber(larger),
                    hint: `Compare ${formatNumber(num1)} and ${formatNumber(num2)}`,
                    module: 'N06_Y6_NPV',
                    level: level
                };
            }

            const sorted = sortAscending(numbers);

            const contexts = [
                {
                    text: `Three countries have populations of ${formatNumber(numbers[0])}, ${formatNumber(numbers[1])}, and ${formatNumber(numbers[2])}. List them in order from smallest to largest.`,
                    answer: sorted.map(n => formatNumber(n)).join(', ')
                },
                {
                    text: `Company revenues are £${formatNumber(numbers[0])}, £${formatNumber(numbers[1])}, and £${formatNumber(numbers[2])}. Which is the middle value?`,
                    answer: formatNumber(sorted[1])
                }
            ];

            const context = randomChoice(contexts);

            if (typeof context.answer === 'string') {
                // Text input for ordering
                return {
                    text: context.text,
                    type: 'text_input',
                    answer: context.answer,
                    hint: `Order from smallest to largest: ${sorted.map(n => formatNumber(n)).join(', ')}`,
                    module: 'N06_Y6_NPV',
                    level: level
                };
            } else {
                // Multiple choice for middle value
                const answer = context.answer;
                const options = shuffle([...numbers]);
                return {
                    text: context.text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer.toString(),
                    hint: `Sort first, then identify middle value`,
                    module: 'N06_Y6_NPV',
                    level: level
                };
            }
        }

        default:
            return generateOrderingComparingProblem(params, level);
    }
}

/**
 * OPERATION 4: Negative Number Interval Problems
 * Calculate intervals across zero in practical contexts
 */
function generateNegativeIntervalProblem(params, level) {
    const problemTypes = [
        'temperature_interval',
        'elevation_interval',
        'financial_interval',
        'time_interval_bc_ad',
        'multi_step_interval'
    ];

    const problemType = randomChoice(problemTypes);
    const [minNeg, maxNeg] = params.negative_range || [-1000, 1000];

    switch(problemType) {
        case 'temperature_interval': {
            let temp1 = randomInt(minNeg, maxNeg);
            let temp2 = randomInt(minNeg, maxNeg);

            // Ensure temperatures are different
            if (temp1 === temp2) {
                temp2 = temp1 + randomChoice([5, 10, 15, 20, -5, -10, -15, -20]);
                // Clamp to valid range
                if (temp2 > maxNeg) temp2 = temp1 - 10;
                if (temp2 < minNeg) temp2 = temp1 + 10;
            }

            const interval = Math.abs(temp2 - temp1);

            const contexts = [
                `The temperature in Antarctica is ${temp1}°C. In the Sahara it is ${temp2}°C. What is the temperature difference?`,
                `At midnight the temperature was ${temp1}°C. By midday it was ${temp2}°C. What is the temperature change?`,
                `A freezer is set to ${temp1}°C. Room temperature is ${temp2}°C. What is the temperature interval?`,
                `Water freezes at 0°C. Liquid nitrogen is ${temp1}°C and steam is ${temp2}°C. What is the temperature range?`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                temp1,
                temp2,
                Math.abs(temp1),
                Math.abs(temp2),
                temp1 + temp2,
                ...generateDistractors(interval, 2, 0, Math.max(Math.abs(minNeg), Math.abs(maxNeg)) * 2)
            ].filter(d => d !== interval);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([interval, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: interval.toString(),
                hint: `Interval = |${temp2} - ${temp1}| = ${interval}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'elevation_interval': {
            const depth = randomInt(-2000, -100);
            const height = randomInt(100, 2000);

            const interval = height - depth; // Note: subtracting negative = addition

            const contexts = [
                `A submarine is at ${depth} metres (below sea level). A mountain peak is ${height} metres above sea level. What is the vertical distance between them?`,
                `A mine shaft reaches ${depth} metres depth. A tower is ${height} metres tall. What is the total vertical span?`,
                `The Dead Sea is ${depth} metres below sea level. Mount Everest is ${height} metres above. What is the elevation difference?`,
                `A deep-sea probe descends to ${depth} metres. An aircraft flies at ${height} metres. What is the altitude difference?`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                Math.abs(depth),
                height,
                height + depth,
                Math.abs(depth) - height,
                ...generateDistractors(interval, 2, 0, 5000)
            ].filter(d => d !== interval && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([interval, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: interval.toString(),
                hint: `Interval = ${height} - (${depth}) = ${height} + ${Math.abs(depth)} = ${interval}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'financial_interval': {
            const debt = randomInt(-1000, -100);
            const credit = randomInt(100, 2000);

            const interval = credit - debt;

            const contexts = [
                `A bank account starts with an overdraft of £${Math.abs(debt)} (balance: £${debt}). After deposits, the balance is £${credit}. By how much did the balance increase?`,
                `A business owes £${Math.abs(debt)} (balance: £${debt}). After sales, they have £${credit}. What is the financial change?`,
                `An account shows £${debt}. After transactions, it shows £${credit}. Calculate the change.`,
                `Starting balance: £${debt}. Ending balance: £${credit}. What is the difference?`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                Math.abs(debt),
                credit,
                credit + debt,
                Math.abs(debt) - credit,
                ...generateDistractors(interval, 2, 0, 3000)
            ].filter(d => d !== interval && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([interval, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: interval.toString(),
                hint: `Change = ${credit} - (${debt}) = ${interval}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'time_interval_bc_ad': {
            const bcYear = randomInt(500, 2000);
            const adYear = randomInt(500, 2000);
            const interval = bcYear + adYear;

            const contexts = [
                `A Roman emperor was born in ${bcYear} BC and died in ${adYear} AD. How many years did the emperor live?`,
                `A historical period began in ${bcYear} BC and ended in ${adYear} AD. How many years did it span?`,
                `Construction started in ${bcYear} BC and finished in ${adYear} AD. How long did it take?`,
                `An ancient civilization existed from ${bcYear} BC to ${adYear} AD. How many years?`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                bcYear,
                adYear,
                Math.abs(adYear - bcYear),
                bcYear + adYear + 1, // Common mistake: including both years
                ...generateDistractors(interval, 1, 0, 5000)
            ].filter(d => d !== interval);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([interval, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: interval.toString(),
                hint: `BC to AD: add both values (${bcYear} + ${adYear} = ${interval})`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'multi_step_interval': {
            const start = randomInt(-500, -100);
            const change1 = randomInt(200, 600);
            const change2 = randomInt(100, 400);
            const end = start + change1 - change2;

            const contexts = [
                `A temperature starts at ${start}°C, rises by ${change1}°C, then falls by ${change2}°C. What is the final temperature?`,
                `An account balance is £${start}. After a deposit of £${change1} and a withdrawal of £${change2}, what is the balance?`,
                `A submarine at ${start} metres ascends ${change1} metres, then descends ${change2} metres. What is its depth?`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                start + change1,
                start - change2,
                start + change1 + change2,
                start - change1 - change2,
                ...generateDistractors(end, 2, minNeg, maxNeg)
            ].filter(d => d !== end);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([end, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: end.toString(),
                hint: `${start} + ${change1} - ${change2} = ${end}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        default:
            return generateNegativeIntervalProblem(params, level);
    }
}

/**
 * OPERATION 5: Multi-Concept Integration
 * Combine 2+ concepts from N2-N5 in complex problems
 */
function generateMultiConceptProblem(params, level) {
    const problemTypes = [
        'place_value_then_round',
        'compare_then_calculate_interval',
        'round_then_order',
        'complex_three_concept'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'place_value_then_round': {
            const number = randomInt(2345678, Math.min(8765432, params.max_value));

            const millions = Math.floor(number / 1000000);
            const hundredThousands = Math.floor((number % 1000000) / 100000);
            const tenThousands = Math.floor((number % 100000) / 10000);

            const placeValue = millions * 1000000;
            const roundTo = randomChoice([100000, 1000000]);
            const rounded = roundToNearest(placeValue, roundTo);

            const text = `A country's population is ${formatNumber(number)}. What is the value of the millions digit, rounded to the nearest ${formatNumber(roundTo)}?`;

            const distractors = [
                placeValue,
                millions,
                roundToNearest(number, roundTo),
                ...generateDistractors(rounded, 2, 0, params.max_value)
            ].filter(d => d !== rounded);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([rounded, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: rounded.toString(),
                hint: `First find millions value: ${formatNumber(placeValue)}, then round to ${formatNumber(roundTo)}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'compare_then_calculate_interval': {
            let num1 = randomInt(1000000, Math.min(5000000, params.max_value));
            let num2 = randomInt(1000000, Math.min(5000000, params.max_value));

            // Ensure numbers are different
            if (num1 === num2) {
                num2 = num1 + randomInt(100000, 1000000);
                if (num2 > Math.min(5000000, params.max_value)) {
                    num2 = num1 - randomInt(100000, 500000);
                }
            }

            const larger = Math.max(num1, num2);
            const smaller = Math.min(num1, num2);
            const difference = larger - smaller;

            const roundTo = 100000;
            const roundedDifference = roundToNearest(difference, roundTo);

            const contexts = [
                `Country A has ${formatNumber(num1)} people. Country B has ${formatNumber(num2)} people. What is the population difference, rounded to the nearest ${formatNumber(roundTo)}?`,
                `Company X earned £${formatNumber(num1)}. Company Y earned £${formatNumber(num2)}. What is the revenue difference, rounded to nearest ${formatNumber(roundTo)}?`,
                `Stadium A holds ${formatNumber(num1)} people. Stadium B holds ${formatNumber(num2)} people. Find the capacity difference, rounded to ${formatNumber(roundTo)}.`
            ];

            const text = randomChoice(contexts);

            const distractors = [
                difference,
                roundedDifference + roundTo,
                roundedDifference - roundTo,
                roundToNearest(larger, roundTo),
                roundToNearest(smaller, roundTo)
            ].filter(d => d !== roundedDifference && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([roundedDifference, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: roundedDifference.toString(),
                hint: `First: |${formatNumber(num1)} - ${formatNumber(num2)}| = ${formatNumber(difference)}, then round`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'round_then_order': {
            // Ensure sufficient range for unique numbers (at least 10x the count needed)
            const maxVal = Math.min(5000000, params.max_value);
            const minValue = Math.max(params.min_value, Math.floor(maxVal * 0.1));
            const numbers = generateUniqueNumbers(3, minValue, maxVal);

            // Fallback to simpler two-number rounding comparison if not enough unique numbers
            if (numbers.length < 3) {
                const roundTo = 100000;
                const num1 = randomInt(minValue, maxVal);
                const num2 = num1 + randomInt(roundTo * 2, Math.max(roundTo * 5, Math.floor(maxVal * 0.1)));
                const rounded1 = roundToNearest(num1, roundTo);
                const rounded2 = roundToNearest(num2, roundTo);
                const smaller = Math.min(rounded1, rounded2);

                return {
                    text: `Two populations are ${formatNumber(num1)} and ${formatNumber(num2)}. Round each to the nearest ${formatNumber(roundTo)}, then identify which is smaller.`,
                    type: 'multiple_choice',
                    options: [formatNumber(rounded1), formatNumber(rounded2)],
                    answer: formatNumber(smaller),
                    hint: `Round: ${formatNumber(rounded1)}, ${formatNumber(rounded2)}`,
                    module: 'N06_Y6_NPV',
                    level: level
                };
            }

            const roundTo = 100000;
            let rounded = numbers.map(n => roundToNearest(n, roundTo));
            const sorted = sortAscending(rounded);

            // If not all rounded values are different, adjust to ensure uniqueness
            if (new Set(rounded).size !== 3) {
                // Create three numbers guaranteed to round differently
                const base = randomInt(minValue, maxVal - roundTo * 3);
                const adjustedNumbers = [
                    base,
                    base + roundTo * 2,
                    base + roundTo * 4
                ];
                rounded = adjustedNumbers.map(n => roundToNearest(n, roundTo));
                const answer = Math.min(...rounded);

                return {
                    text: `Three populations are ${formatNumber(adjustedNumbers[0])}, ${formatNumber(adjustedNumbers[1])}, and ${formatNumber(adjustedNumbers[2])}. Round each to the nearest ${formatNumber(roundTo)}, then identify the smallest.`,
                    type: 'multiple_choice',
                    options: shuffle([...rounded]),
                    answer: answer.toString(),
                    hint: `Round: ${rounded.map(r => formatNumber(r)).join(', ')}, then find smallest`,
                    module: 'N06_Y6_NPV',
                    level: level
                };
            }

            const text = `Three populations are ${formatNumber(numbers[0])}, ${formatNumber(numbers[1])}, and ${formatNumber(numbers[2])}. Round each to the nearest ${formatNumber(roundTo)}, then identify the smallest.`;

            const answer = Math.min(...rounded);

            const distractors = rounded.filter(n => n !== answer);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Round: ${rounded.map(r => formatNumber(r)).join(', ')}, then find smallest`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        case 'complex_three_concept': {
            const num1 = randomInt(2000000, Math.min(6000000, params.max_value));
            const num2 = randomInt(2000000, Math.min(6000000, params.max_value));

            const roundTo = 1000000;
            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);

            const difference = Math.abs(rounded1 - rounded2);
            const millions = Math.floor(difference / 1000000);

            const contexts = [
                {
                    text: `City A has ${formatNumber(num1)} residents. City B has ${formatNumber(num2)} residents. Round both to the nearest million, find the difference, then state how many complete millions the difference represents.`,
                    answer: millions
                },
                {
                    text: `Budget A: £${formatNumber(num1)}. Budget B: £${formatNumber(num2)}. Round to nearest million, calculate difference, then find the millions digit of the result.`,
                    answer: millions
                }
            ];

            const context = randomChoice(contexts);
            const text = context.text;
            const answer = context.answer;

            const distractors = [
                Math.floor(num1 / 1000000),
                Math.floor(num2 / 1000000),
                Math.floor((num1 + num2) / 1000000),
                ...generateDistractors(answer, 2, 0, 20)
            ].filter(d => d !== answer);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([answer, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Round: ${formatNumber(rounded1)}, ${formatNumber(rounded2)}. Difference: ${formatNumber(difference)}. Millions: ${millions}`,
                module: 'N06_Y6_NPV',
                level: level
            };
        }

        default:
            return generateMultiConceptProblem(params, level);
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'N06_Y6_NPV',
    generate: generateQuestion
};
