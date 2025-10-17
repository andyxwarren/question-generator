/**
 * Year 5 Number Problems Generator
 *
 * Module: N06_Y5_NPV - "Solve number problems and practical problems that involve 5N1-5N5"
 *
 * This synthesis module combines concepts from:
 * - N01: Count forwards/backwards in steps of powers of 10 for any given number up to 1,000,000
 * - N02: Read, write, order and compare numbers to at least 1,000,000
 * - N03: Determine the value of each digit in numbers up to 1,000,000; read Roman numerals to 1,000 (M)
 * - N04: Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000
 * - N05: Interpret negative numbers in context, count forwards and backwards with positive and negative whole numbers, including through zero
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    generateDistractors,
    getComparisonSymbol,
    generateUniqueNumbers,
    sortAscending,
    roundToNearest
} from './helpers/N02_numberHelpers.js';

import {
    getDigitAtPlace,
    getPlaceValue,
    decomposeNumber,
    toRoman,
    fromRoman
} from './helpers/N03_placeValueHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'counting_with_powers':
            return generateCountingWithPowersProblem(params, level);
        case 'place_value_comparison_problems':
            return generatePlaceValueComparisonProblem(params, level);
        case 'rounding_estimation_problems':
            return generateRoundingEstimationProblem(params, level);
        case 'negative_context_problems':
            return generateNegativeContextProblem(params, level);
        case 'multi_step_problems':
            return generateMultiStepProblem(params, level);
        default:
            return generateCountingWithPowersProblem(params, level);
    }
}

/**
 * OPERATION 1: Counting with Powers of 10 Problems
 * Apply powers of 10 counting (10, 100, 1000, 10000, 100000) to solve large-scale problems
 */
function generateCountingWithPowersProblem(params, level) {
    const power = randomChoice(params.powers_of_10);
    const numSteps = randomInt(params.min_steps, params.max_steps);
    const startValue = randomInt(0, Math.min(params.max_value - (power * numSteps), params.max_value));
    const answer = startValue + (power * numSteps);

    // Ensure answer is within range
    if (answer > params.max_value) {
        return generateCountingWithPowersProblem(params, level);
    }

    const contexts = {
        simple: [
            { text: `A library has ${formatNumber(startValue)} books. They receive ${numSteps} deliveries of ${formatNumber(power)} books each. How many books do they have now?`, type: 'addition' },
            { text: `${formatNumber(startValue)} people live in a town. The population increases by ${formatNumber(power)} each year for ${numSteps} years. What is the new population?`, type: 'growth' },
            { text: `A factory produces ${formatNumber(power)} items per day. Starting from ${formatNumber(startValue)} items, how many items after ${numSteps} days?`, type: 'production' }
        ],
        practical: [
            { text: `A charity has raised £${formatNumber(startValue)}. They receive ${numSteps} donations of £${formatNumber(power)} each. What is the new total?`, type: 'money' },
            { text: `A school has ${formatNumber(startValue)} students. They admit ${formatNumber(power)} new students in each of ${numSteps} terms. How many students now?`, type: 'growth' },
            { text: `An online store had ${formatNumber(startValue)} products. They add ${formatNumber(power)} new products ${numSteps} times. What is the total product count?`, type: 'inventory' },
            { text: `A car travels ${formatNumber(power)} km each day. After starting at ${formatNumber(startValue)} km on the odometer, what does it read after ${numSteps} days?`, type: 'distance' }
        ],
        varied: [
            { text: `A museum starts with ${formatNumber(startValue)} visitors. Attendance increases by ${formatNumber(power)} each month for ${numSteps} months. What is the total attendance?`, type: 'attendance' },
            { text: `A warehouse contains ${formatNumber(startValue)} boxes. They receive shipments of ${formatNumber(power)} boxes ${numSteps} times. How many boxes in total?`, type: 'storage' },
            { text: `A website had ${formatNumber(startValue)} users. It gains ${formatNumber(power)} new users per week for ${numSteps} weeks. How many users now?`, type: 'digital' },
            { text: `A forest has ${formatNumber(startValue)} trees. Conservationists plant ${formatNumber(power)} trees each season for ${numSteps} seasons. Total trees?`, type: 'environmental' }
        ],
        complex: [
            { text: `A city's infrastructure budget is £${formatNumber(startValue)}. Council allocates an additional £${formatNumber(power)} each quarter for ${numSteps} quarters. What is the total budget?`, type: 'finance' },
            { text: `A data center stores ${formatNumber(startValue)} files. It archives ${formatNumber(power)} files per month for ${numSteps} months. What is the total file count?`, type: 'technology' },
            { text: `An investment portfolio worth £${formatNumber(startValue)} grows by £${formatNumber(power)} each year for ${numSteps} years. What is its value now?`, type: 'investment' }
        ],
        large_numbers: [
            { text: `A nation has ${formatNumber(startValue)} registered vehicles. Registrations increase by ${formatNumber(power)} annually for ${numSteps} years. Total vehicles?`, type: 'statistics' },
            { text: `A satellite has orbited Earth ${formatNumber(startValue)} times. It completes ${formatNumber(power)} additional orbits per day for ${numSteps} days. Total orbits?`, type: 'space' },
            { text: `A power station generated ${formatNumber(startValue)} kilowatt-hours. Production increases by ${formatNumber(power)} kWh monthly for ${numSteps} months. Total output?`, type: 'energy' }
        ],
        multi_concept: [
            { text: `A company's revenue starts at £${formatNumber(startValue)}. Revenue grows by £${formatNumber(power)} per quarter for ${numSteps} quarters. What is the total revenue?`, type: 'business' },
            { text: `A research database contains ${formatNumber(startValue)} entries. Scientists add ${formatNumber(power)} entries per year for ${numSteps} years. Total entries?`, type: 'research' },
            { text: `A conservation project tracked ${formatNumber(startValue)} animals. The population increased by ${formatNumber(power)} each breeding season for ${numSteps} seasons. Total population?`, type: 'wildlife' }
        ]
    };

    const contextType = randomChoice(params.contexts || ['simple']);
    const availableContexts = contexts[contextType] || contexts.simple;
    const template = randomChoice(availableContexts);

    const text = template.text;

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Start: ${formatNumber(startValue)}, add ${formatNumber(power)} × ${numSteps}`,
        module: 'N06_Y5_NPV',
        level: level
    };
}

/**
 * OPERATION 2: Place Value & Comparison Problems
 * Use 6-7 digit place value understanding with ordering and comparison
 */
function generatePlaceValueComparisonProblem(params, level) {
    const problemTypes = [
        'compose_large_number',
        'find_digit_value_large',
        'compare_very_large_numbers',
        'order_large_numbers',
        'digit_difference',
        'roman_numeral_year'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'compose_large_number': {
            const number = randomInt(100000, Math.min(999999, params.max_value));
            const hundredThousands = Math.floor(number / 100000);
            const tenThousands = Math.floor((number % 100000) / 10000);
            const thousands = Math.floor((number % 10000) / 1000);
            const hundreds = Math.floor((number % 1000) / 100);
            const tens = Math.floor((number % 100) / 10);
            const ones = number % 10;

            const templates = [
                `What number has ${hundredThousands} hundred thousands, ${tenThousands} ten thousands, ${thousands} thousands, ${hundreds} hundreds, ${tens} tens and ${ones} ones?`,
                `A number is composed of ${hundredThousands} hundred thousands, ${tenThousands} ten thousands, ${thousands} thousands, ${hundreds} hundreds, ${tens} tens and ${ones} ones. What is it?`,
                `Build a number using: ${hundredThousands} hundred thousands, ${tenThousands} ten thousands, ${thousands} thousands, ${hundreds} hundreds, ${tens} tens, ${ones} ones. What number is formed?`
            ];

            const text = randomChoice(templates);

            const distractors = generateDistractors(number, 3, 100000, params.max_value);
            const options = shuffle([number, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: number.toString(),
                hint: `Build from largest place: ${hundredThousands}00000 + ${tenThousands}0000 + ...`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'find_digit_value_large': {
            const number = randomInt(100000, Math.min(999999, params.max_value));
            const place = randomChoice(['hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones']);
            const digit = getDigitAtPlace(number, place);

            if (digit === 0) {
                return generatePlaceValueComparisonProblem(params, level);
            }

            const value = getPlaceValue(number, place);

            const templates = [
                `In the number ${formatNumber(number)}, what is the value of the digit ${digit}?`,
                `A city has a population of ${formatNumber(number)}. What does the digit ${digit} represent?`,
                `The number ${formatNumber(number)} appears on a display. What is the value of the ${digit} in this number?`
            ];

            const text = randomChoice(templates);

            const distractors = new Set([digit]);
            const otherPlaces = ['hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones'].filter(p => p !== place);
            otherPlaces.forEach(p => {
                const otherValue = getPlaceValue(number, p);
                if (otherValue > 0 && otherValue !== value) {
                    distractors.add(otherValue);
                }
            });

            while (distractors.size < 4) {
                const offset = randomChoice([10, 100, 1000, 10000, -10, -100, -1000, -10000]);
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
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'compare_very_large_numbers': {
            const num1 = randomInt(100000, params.max_value);
            const num2 = randomInt(100000, params.max_value);

            if (num1 === num2) {
                return generatePlaceValueComparisonProblem(params, level);
            }

            const contexts = [
                { text: `Country A has a population of ${formatNumber(num1)}. Country B has ${formatNumber(num2)}. Which country has more people?`, options: ['Country A', 'Country B'] },
                { text: `Company X earned £${formatNumber(num1)} last year. Company Y earned £${formatNumber(num2)}. Which earned more?`, options: ['Company X', 'Company Y'] },
                { text: `Stadium A holds ${formatNumber(num1)} people. Stadium B holds ${formatNumber(num2)} people. Which has greater capacity?`, options: ['Stadium A', 'Stadium B'] }
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
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'order_large_numbers': {
            const count = level <= 2 ? 3 : 4;
            const numbers = generateUniqueNumbers(count, 100000, params.max_value);
            const sorted = sortAscending(numbers);

            const items = ['population', 'revenue (£)', 'attendance', 'distance (km)', 'budget (£)'];
            const item = randomChoice(items);

            const labels = ['City A', 'City B', 'City C', 'City D', 'City E'];
            const selectedLabels = labels.slice(0, count);

            let text = '';
            numbers.forEach((num, i) => {
                text += `${selectedLabels[i]}: ${formatNumber(num)} ${item}. `;
            });

            const askFor = randomChoice(['highest', 'lowest']);
            text += `Which has the ${askFor} ${item}?`;

            const answer = askFor === 'highest'
                ? selectedLabels[numbers.indexOf(sorted[sorted.length - 1])]
                : selectedLabels[numbers.indexOf(sorted[0])];

            return {
                text: text,
                type: 'multiple_choice',
                options: selectedLabels,
                answer: answer,
                hint: `Find the ${askFor === 'highest' ? 'largest' : 'smallest'} number`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'digit_difference': {
            const number = randomInt(100000, Math.min(999999, params.max_value));
            const place1 = randomChoice(['hundred thousands', 'ten thousands', 'thousands']);
            const place2 = randomChoice(['hundreds', 'tens', 'ones']);

            const value1 = getPlaceValue(number, place1);
            const value2 = getPlaceValue(number, place2);

            if (value1 === 0 || value2 === 0) {
                return generatePlaceValueComparisonProblem(params, level);
            }

            const difference = Math.abs(value1 - value2);

            const text = `In the number ${formatNumber(number)}, what is the difference between the value of the digit in the ${place1} place and the ${place2} place?`;

            const distractors = [
                value1,
                value2,
                value1 + value2,
                ...generateDistractors(difference, 2, 0, value1)
            ].filter(d => d !== difference);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([difference, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: difference.toString(),
                hint: `Find values at both places, then subtract`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'roman_numeral_year': {
            // Use years that make sense historically
            const yearRange = { min: params.roman_min || 1, max: Math.min(params.roman_max || 1000, 2024) };
            const arabic = randomInt(yearRange.min, yearRange.max);
            const roman = toRoman(arabic);

            const problemSubtype = randomChoice(['convert_year', 'compare_years', 'historical_context']);

            if (problemSubtype === 'convert_year') {
                const text = `A building was constructed in the year ${roman}. What year was this in standard form?`;

                const distractors = generateDistractors(arabic, 3, yearRange.min, yearRange.max);
                const options = shuffle([arabic, ...distractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: arabic.toString(),
                    hint: `Convert Roman numeral ${roman} to a number`,
                    module: 'N06_Y5_NPV',
                    level: level
                };
            } else if (problemSubtype === 'compare_years') {
                const arabic2 = randomInt(yearRange.min, yearRange.max);
                const roman2 = toRoman(arabic2);

                if (arabic === arabic2) {
                    return generatePlaceValueComparisonProblem(params, level);
                }

                const text = `Two monuments show years: ${roman} and ${roman2}. Which year came first?`;

                const answer = arabic < arabic2 ? roman : roman2;
                const options = [roman, roman2];

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer,
                    hint: `${roman} = ${arabic}, ${roman2} = ${arabic2}`,
                    module: 'N06_Y5_NPV',
                    level: level
                };
            } else {
                const historicalYears = [
                    { year: 1066, event: 'Battle of Hastings' },
                    { year: 1215, event: 'Magna Carta signed' },
                    { year: 1666, event: 'Great Fire of London' },
                    { year: 1776, event: 'American Independence' },
                    { year: 1914, event: 'World War I began' },
                    { year: 1945, event: 'World War II ended' },
                    { year: 1969, event: 'Moon landing' }
                ].filter(h => h.year >= yearRange.min && h.year <= yearRange.max);

                if (historicalYears.length === 0) {
                    return generatePlaceValueComparisonProblem(params, level);
                }

                const historical = randomChoice(historicalYears);
                const romanYear = toRoman(historical.year);

                const text = `The ${historical.event} happened in year ${romanYear}. What year was this?`;

                const distractors = generateDistractors(historical.year, 3, yearRange.min, yearRange.max);
                const options = shuffle([historical.year, ...distractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: historical.year.toString(),
                    hint: `Convert ${romanYear} to standard numbers`,
                    module: 'N06_Y5_NPV',
                    level: level
                };
            }
        }

        default:
            return generatePlaceValueComparisonProblem(params, level);
    }
}

/**
 * OPERATION 3: Rounding & Estimation Problems
 * Apply multi-level rounding (10, 100, 1000, 10000, 100000) to practical situations
 */
function generateRoundingEstimationProblem(params, level) {
    const problemTypes = [
        'round_to_nearest_large',
        'estimate_large_calculation',
        'practical_rounding_context',
        'multi_level_rounding',
        'rounding_for_comparison'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'round_to_nearest_large': {
            const roundTo = randomChoice(params.rounding_bases || [10, 100, 1000, 10000, 100000]);
            const number = randomInt(Math.max(100000, roundTo * 2), Math.min(params.max_value, 999999));

            // Ensure number is not already a multiple
            const adjustedNumber = number % roundTo === 0
                ? number + randomChoice([1, 2, 3, -1, -2, -3])
                : number;

            const rounded = roundToNearest(adjustedNumber, roundTo);

            const contexts = [
                `A city has ${formatNumber(adjustedNumber)} residents. Round this to the nearest ${formatNumber(roundTo)}.`,
                `A company's annual revenue is £${formatNumber(adjustedNumber)}. Round to the nearest ${formatNumber(roundTo)}.`,
                `A stadium can hold ${formatNumber(adjustedNumber)} people. Round this capacity to the nearest ${formatNumber(roundTo)}.`,
                `A country has ${formatNumber(adjustedNumber)} square kilometres of land. Round to the nearest ${formatNumber(roundTo)}.`
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
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'estimate_large_calculation': {
            const num1 = randomInt(100000, Math.min(500000, params.max_value));
            const num2 = randomInt(100000, Math.min(500000, params.max_value));
            const operation = randomChoice(['+', '-']);

            const roundTo = num1 >= 500000 || num2 >= 500000 ? 100000 : 10000;
            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);
            const estimate = operation === '+' ? rounded1 + rounded2 : Math.abs(rounded1 - rounded2);

            const contexts = [
                `Two cities have populations of ${formatNumber(num1)} and ${formatNumber(num2)}. Estimate the ${operation === '+' ? 'combined' : 'difference in'} population. (Round to nearest ${formatNumber(roundTo)})`,
                `A company earned £${formatNumber(num1)} in Quarter 1 and £${formatNumber(num2)} in Quarter 2. Estimate the ${operation === '+' ? 'total' : 'difference'}. (Round to nearest ${formatNumber(roundTo)})`,
                `Stadium A holds ${formatNumber(num1)} people and Stadium B holds ${formatNumber(num2)} people. Estimate ${operation === '+' ? 'their combined capacity' : 'the difference in capacity'}. (Round to nearest ${formatNumber(roundTo)})`
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
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'practical_rounding_context': {
            const contexts = [
                {
                    text: `A charity needs to raise £{target}. They have raised £{actual}. About how much more do they need? (Round to nearest {roundTo})`,
                    calculation: 'subtract'
                },
                {
                    text: `An airport served {actual} passengers in January and {actual2} in February. Estimate the total. (Round to nearest {roundTo})`,
                    calculation: 'add'
                },
                {
                    text: `A library has {actual} books. They donate {actual2} books. About how many remain? (Round to nearest {roundTo})`,
                    calculation: 'subtract'
                },
                {
                    text: `A country produces {actual} tonnes of grain. Another produces {actual2} tonnes. Estimate combined production. (Round to nearest {roundTo})`,
                    calculation: 'add'
                }
            ];

            const context = randomChoice(contexts);
            const actual = randomInt(100000, Math.min(900000, params.max_value));
            const actual2 = context.calculation === 'add'
                ? randomInt(100000, Math.min(500000, params.max_value))
                : randomInt(10000, actual - 10000);

            const roundTo = actual >= 500000 ? 100000 : 10000;
            const rounded = roundToNearest(actual, roundTo);
            const rounded2 = roundToNearest(actual2, roundTo);

            const answer = context.calculation === 'add'
                ? rounded + rounded2
                : rounded - rounded2;

            const text = context.text
                .replace('{actual}', formatNumber(actual))
                .replace('{actual2}', formatNumber(actual2))
                .replace('{target}', formatNumber(actual))
                .replace('{roundTo}', formatNumber(roundTo));

            const distractors = [
                answer + roundTo,
                answer - roundTo,
                rounded,
                rounded2,
                context.calculation === 'add' ? actual + actual2 : actual - actual2
            ].filter(d => d !== answer && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([answer, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Round both to ${formatNumber(roundTo)}, then calculate`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'multi_level_rounding': {
            const number = randomInt(100000, Math.min(999999, params.max_value));

            // Ask to round to two different place values and compare
            const roundTo1 = randomChoice([10000, 100000]);
            const roundTo2 = roundTo1 === 10000 ? 100000 : 10000;

            const rounded1 = roundToNearest(number, roundTo1);
            const rounded2 = roundToNearest(number, roundTo2);
            const difference = Math.abs(rounded1 - rounded2);

            const text = `A number is ${formatNumber(number)}. What is the difference between rounding it to the nearest ${formatNumber(roundTo1)} and the nearest ${formatNumber(roundTo2)}?`;

            const distractors = [
                rounded1,
                rounded2,
                number,
                ...generateDistractors(difference, 2, 0, 100000)
            ].filter(d => d !== difference && d >= 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([difference, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: difference.toString(),
                hint: `Round to ${formatNumber(roundTo1)}: ${formatNumber(rounded1)}, to ${formatNumber(roundTo2)}: ${formatNumber(rounded2)}`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'rounding_for_comparison': {
            const num1 = randomInt(100000, params.max_value);
            const num2 = randomInt(100000, params.max_value);

            if (num1 === num2) {
                return generateRoundingEstimationProblem(params, level);
            }

            const roundTo = randomChoice([10000, 100000]);
            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);

            const text = `City A has ${formatNumber(num1)} people. City B has ${formatNumber(num2)} people. Round both to the nearest ${formatNumber(roundTo)}. Which city has more people?`;

            const answer = rounded1 > rounded2 ? 'City A' : rounded2 > rounded1 ? 'City B' : 'about the same';
            const options = ['City A', 'City B', 'about the same'];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Round: A = ${formatNumber(rounded1)}, B = ${formatNumber(rounded2)}`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        default:
            return generateRoundingEstimationProblem(params, level);
    }
}

/**
 * OPERATION 4: Negative Context Problems
 * Interpret negative numbers in real-world contexts
 */
function generateNegativeContextProblem(params, level) {
    const problemTypes = [
        'temperature_context',
        'elevation_depth',
        'financial_context',
        'count_through_zero_context',
        'negative_comparison'
    ];

    const problemType = randomChoice(problemTypes);
    const [minNeg, maxNeg] = params.negative_range || [-100, 100];

    switch(problemType) {
        case 'temperature_context': {
            const start = randomInt(minNeg, maxNeg);
            const change = randomInt(10, 50);
            const direction = randomChoice(['rises', 'falls', 'increases', 'decreases']);
            const isRising = direction === 'rises' || direction === 'increases';
            const answer = isRising ? start + change : start - change;

            const contexts = [
                `The temperature in Moscow is ${start}°C. It ${direction} by ${change}°C. What is the new temperature?`,
                `A freezer is set to ${start}°C. The temperature ${direction} by ${change}°C. What temperature is it now?`,
                `At midnight the temperature was ${start}°C. By morning it had ${isRising ? 'risen' : 'fallen'} by ${change}°C. What was the morning temperature?`
            ];

            const text = randomChoice(contexts);

            const distractors = generateDistractors(answer, 3, minNeg - 50, maxNeg + 50);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Start: ${start}°C, ${isRising ? 'add' : 'subtract'} ${change}`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'elevation_depth': {
            const depth = randomInt(-500, -10);
            const change = randomInt(50, 200);
            const direction = randomChoice(['ascends', 'descends', 'rises', 'dives']);
            const isRising = direction === 'ascends' || direction === 'rises';
            const answer = isRising ? depth + change : depth - change;

            const contexts = [
                `A submarine is at ${depth} metres (below sea level). It ${direction} ${change} metres. What is its new depth?`,
                `A diver is at ${depth} metres depth. They ${direction} ${change} metres. What depth are they at now?`,
                `A mine shaft reaches ${depth} metres. Workers ${isRising ? 'climb up' : 'descend'} ${change} metres. What level are they at?`
            ];

            const text = randomChoice(contexts);

            const distractors = generateDistractors(answer, 3, -1000, 100);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Start: ${depth}m, ${isRising ? 'add' : 'subtract'} ${change}m`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'financial_context': {
            const balance = randomInt(minNeg, maxNeg);
            const transaction = randomInt(50, 500);
            const type = randomChoice(['deposit', 'withdrawal', 'payment received', 'payment made']);
            const isPositive = type === 'deposit' || type === 'payment received';
            const answer = isPositive ? balance + transaction : balance - transaction;

            const contexts = [
                `A bank account has a balance of £${balance}. A ${type} of £${transaction} occurs. What is the new balance?`,
                `A business account shows £${balance}. After a ${type} of £${transaction}, what is the balance?`,
                `An account balance is £${balance}. A ${type} of £${transaction} is processed. New balance?`
            ];

            const text = randomChoice(contexts);

            const distractors = generateDistractors(answer, 3, minNeg - 500, maxNeg + 500);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `${balance} ${isPositive ? '+' : '-'} ${transaction}`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'count_through_zero_context': {
            const start = randomInt(50, 200);
            const step = randomChoice([10, 25, 50]);
            const numSteps = randomInt(Math.ceil(start / step) + 2, Math.ceil(start / step) + 5);
            const answer = start - (step * numSteps);

            const contexts = [
                `A countdown starts at ${start}. It counts down in ${step}s. After ${numSteps} steps, what number is shown?`,
                `A timer is set to ${start} seconds. It decreases by ${step} every step. After ${numSteps} steps, what does it show?`,
                `Starting at ${start}, count backwards in ${step}s for ${numSteps} steps. What number do you reach?`
            ];

            const text = randomChoice(contexts);

            const distractors = generateDistractors(answer, 3, minNeg - 100, 300);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `${start} - (${step} × ${numSteps})`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'negative_comparison': {
            const num1 = randomInt(minNeg, maxNeg);
            const num2 = randomInt(minNeg, maxNeg);

            if (num1 === num2) {
                return generateNegativeContextProblem(params, level);
            }

            const contexts = [
                { text: `Which temperature is colder: ${num1}°C or ${num2}°C?`, answer: Math.min(num1, num2) },
                { text: `Which represents a greater debt: £${num1} or £${num2}?`, answer: Math.min(num1, num2) },
                { text: `Which depth is deeper below sea level: ${num1}m or ${num2}m?`, answer: Math.min(num1, num2) },
                { text: `Which number is less: ${num1} or ${num2}?`, answer: Math.min(num1, num2) }
            ];

            const context = randomChoice(contexts);
            const text = context.text;
            const answer = context.answer;
            const options = [num1, num2];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `More negative = smaller/colder/deeper`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        default:
            return generateNegativeContextProblem(params, level);
    }
}

/**
 * OPERATION 5: Multi-Step Combined Problems
 * Integrate 2+ concepts from Year 5 NPV (N1-N5)
 */
function generateMultiStepProblem(params, level) {
    const problemTypes = [
        'count_then_round',
        'place_value_then_compare',
        'round_then_calculate',
        'negative_then_compare',
        'complex_combined'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'count_then_round': {
            const power = randomChoice(params.powers_of_10);
            const numSteps = randomInt(3, 7);
            const start = randomInt(0, Math.min(500000, params.max_value - (power * numSteps)));
            const result = start + (power * numSteps);

            if (result > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const roundTo = result >= 500000 ? 100000 : 10000;
            const rounded = roundToNearest(result, roundTo);

            const text = `A city has ${formatNumber(start)} residents. Population grows by ${formatNumber(power)} each year for ${numSteps} years. Round the final population to the nearest ${formatNumber(roundTo)}.`;

            const distractors = [
                result,
                rounded + roundTo,
                rounded - roundTo,
                roundToNearest(result, roundTo === 100000 ? 10000 : 100000)
            ].filter(d => d !== rounded && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([rounded, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: rounded.toString(),
                hint: `First: ${formatNumber(start)} + (${formatNumber(power)} × ${numSteps}) = ${formatNumber(result)}, then round`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'place_value_then_compare': {
            // Build two numbers from place value, then compare
            const build1 = {
                hundredThousands: randomInt(1, 9),
                tenThousands: randomInt(0, 9),
                thousands: randomInt(0, 9),
                hundreds: randomInt(0, 9),
                tens: randomInt(0, 9),
                ones: randomInt(0, 9)
            };

            const build2 = {
                hundredThousands: randomInt(1, 9),
                tenThousands: randomInt(0, 9),
                thousands: randomInt(0, 9),
                hundreds: randomInt(0, 9),
                tens: randomInt(0, 9),
                ones: randomInt(0, 9)
            };

            const number1 = build1.hundredThousands * 100000 + build1.tenThousands * 10000 +
                           build1.thousands * 1000 + build1.hundreds * 100 + build1.tens * 10 + build1.ones;
            const number2 = build2.hundredThousands * 100000 + build2.tenThousands * 10000 +
                           build2.thousands * 1000 + build2.hundreds * 100 + build2.tens * 10 + build2.ones;

            if (number1 === number2) {
                return generateMultiStepProblem(params, level);
            }

            const text = `Number A: ${build1.hundredThousands} hundred thousands, ${build1.tenThousands} ten thousands, ${build1.thousands} thousands, ${build1.hundreds} hundreds, ${build1.tens} tens, ${build1.ones} ones.\nNumber B: ${build2.hundredThousands} hundred thousands, ${build2.tenThousands} ten thousands, ${build2.thousands} thousands, ${build2.hundreds} hundreds, ${build2.tens} tens, ${build2.ones} ones.\nWhich number is larger?`;

            const answer = number1 > number2 ? 'A' : 'B';
            const options = ['A', 'B'];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `A = ${formatNumber(number1)}, B = ${formatNumber(number2)}`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'round_then_calculate': {
            const num1 = randomInt(100000, Math.min(500000, params.max_value));
            const num2 = randomInt(100000, Math.min(500000, params.max_value));
            const roundTo = 100000;

            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);

            const operation = randomChoice(['+', '-']);
            const answer = operation === '+'
                ? rounded1 + rounded2
                : Math.abs(rounded1 - rounded2);

            const contexts = [
                { text: `A country produced ${formatNumber(num1)} tonnes of wheat and ${formatNumber(num2)} tonnes of barley. Round both to the nearest ${formatNumber(roundTo)}, then ${operation === '+' ? 'find the total' : 'find the difference'}.`, type: 'agriculture' },
                { text: `City A has ${formatNumber(num1)} residents and City B has ${formatNumber(num2)} residents. Round to nearest ${formatNumber(roundTo)}, then ${operation === '+' ? 'find combined population' : 'find population difference'}.`, type: 'population' },
                { text: `Two companies earned £${formatNumber(num1)} and £${formatNumber(num2)} respectively. Round both to nearest ${formatNumber(roundTo)}, then ${operation === '+' ? 'find total earnings' : 'find the difference in earnings'}.`, type: 'business' }
            ];

            const context = randomChoice(contexts);
            const text = context.text;

            const distractors = [
                operation === '+' ? num1 + num2 : Math.abs(num1 - num2),
                answer + roundTo,
                answer - roundTo,
                rounded1,
                rounded2
            ].filter(d => d !== answer && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([answer, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Round: ${formatNumber(rounded1)} ${operation} ${formatNumber(rounded2)}`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'negative_then_compare': {
            const start = randomInt(100, 300);
            const step = randomChoice([25, 50]);
            const numSteps = randomInt(Math.ceil(start / step) + 3, Math.ceil(start / step) + 6);
            const result = start - (step * numSteps);

            const [minNeg, maxNeg] = params.negative_range || [-500, 500];
            const compareValue = randomInt(minNeg, maxNeg);
            const isMore = result > compareValue;

            const text = `A temperature starts at ${start}°C. It drops by ${step}°C every hour for ${numSteps} hours. Is the final temperature more or less than ${compareValue}°C?`;

            const answer = isMore ? 'more' : 'less';
            const options = ['more', 'less'];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `First find: ${start} - (${step} × ${numSteps}) = ${result}`,
                module: 'N06_Y5_NPV',
                level: level
            };
        }

        case 'complex_combined': {
            const subtypes = ['power_count_place_value', 'round_multiple_levels', 'negative_financial'];
            const subtype = randomChoice(subtypes);

            if (subtype === 'power_count_place_value') {
                const power = randomChoice([1000, 10000]);
                const numSteps = randomInt(3, 6);
                const start = randomInt(100000, 500000);
                const result = start + (power * numSteps);

                const place = randomChoice(['ten thousands', 'hundred thousands']);
                const value = getPlaceValue(result, place);

                const text = `A stadium starts with ${formatNumber(start)} seats. They add ${formatNumber(power)} seats in each of ${numSteps} phases. What is the value of the digit in the ${place} place of the final number of seats?`;

                const distractors = new Set();
                const otherPlaces = ['hundred thousands', 'ten thousands', 'thousands', 'hundreds'].filter(p => p !== place);
                otherPlaces.forEach(p => {
                    const otherValue = getPlaceValue(result, p);
                    if (otherValue > 0 && otherValue !== value) {
                        distractors.add(otherValue);
                    }
                });

                while (distractors.size < 3) {
                    const offset = randomChoice([10000, -10000, 100000, -100000]);
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
                    hint: `First find total: ${formatNumber(result)}, then find ${place} value`,
                    module: 'N06_Y5_NPV',
                    level: level
                };
            } else if (subtype === 'round_multiple_levels') {
                const number = randomInt(100000, 900000);
                const roundTo1 = 100000;
                const roundTo2 = 10000;

                const rounded1 = roundToNearest(number, roundTo1);
                const rounded2 = roundToNearest(number, roundTo2);

                const operation = randomChoice(['sum', 'difference']);
                const answer = operation === 'sum' ? rounded1 + rounded2 : Math.abs(rounded1 - rounded2);

                const text = `A number is ${formatNumber(number)}. Round it to the nearest ${formatNumber(roundTo1)} and also to the nearest ${formatNumber(roundTo2)}. What is the ${operation} of these two rounded values?`;

                const distractors = [
                    rounded1,
                    rounded2,
                    number,
                    ...generateDistractors(answer, 2, 0, 1000000)
                ].filter(d => d !== answer && d > 0);

                const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
                const options = shuffle([answer, ...uniqueDistractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer.toString(),
                    hint: `${formatNumber(roundTo1)}: ${formatNumber(rounded1)}, ${formatNumber(roundTo2)}: ${formatNumber(rounded2)}`,
                    module: 'N06_Y5_NPV',
                    level: level
                };
            } else {
                // negative_financial
                const start = randomInt(-500, -100);
                const deposit1 = randomInt(100, 500);
                const deposit2 = randomInt(100, 500);
                const withdrawal = randomInt(50, 200);

                const afterDeposit1 = start + deposit1;
                const afterDeposit2 = afterDeposit1 + deposit2;
                const answer = afterDeposit2 - withdrawal;

                const text = `A business account has an overdraft of £${Math.abs(start)} (balance: £${start}). They receive deposits of £${deposit1} and £${deposit2}, then make a payment of £${withdrawal}. What is the final balance?`;

                const distractors = [
                    afterDeposit1,
                    afterDeposit2,
                    start + deposit1 + deposit2 + withdrawal,
                    ...generateDistractors(answer, 1, -1000, 1000)
                ].filter(d => d !== answer);

                const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
                const options = shuffle([answer, ...uniqueDistractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer.toString(),
                    hint: `${start} + ${deposit1} + ${deposit2} - ${withdrawal}`,
                    module: 'N06_Y5_NPV',
                    level: level
                };
            }
        }

        default:
            return generateMultiStepProblem(params, level);
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'N06_Y5_NPV',
    generate: generateQuestion
};
