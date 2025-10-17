/**
 * Year 4 Number Problems Generator
 *
 * Module: N06_Y4_NPV - "Solve number and practical problems that involve 4N1-4N5 and with increasingly large positive numbers"
 *
 * This synthesis module combines concepts from:
 * - N01: Counting in multiples of 6, 7, 9, 25 and 1,000
 * - N02: Order and compare numbers beyond 1,000; find 1,000 more or less
 * - N03: Place value in four-digit numbers; Roman numerals to 100
 * - N04: Represent, estimate and round to nearest 10, 100 or 1,000
 * - N05: Count backwards through zero to include negative numbers
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
        case 'counting_problems':
            return generateCountingProblem(params, level);
        case 'place_value_comparison_problems':
            return generatePlaceValueComparisonProblem(params, level);
        case 'rounding_estimation_problems':
            return generateRoundingEstimationProblem(params, level);
        case 'negative_number_problems':
            return generateNegativeNumberProblem(params, level);
        case 'multi_step_problems':
            return generateMultiStepProblem(params, level);
        default:
            return generateCountingProblem(params, level);
    }
}

/**
 * OPERATION 1: Counting Problems
 * Apply skip counting (6, 7, 9, 25, 1000) to solve real-world problems
 */
function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const numSteps = randomInt(params.min_steps, params.max_steps);
    const answer = step * numSteps;

    // Ensure answer is within range
    if (answer > params.max_value) {
        return generateCountingProblem(params, level);
    }

    const contexts = {
        simple: [
            { text: `{name} counts in {step}s, starting from 0. After {numSteps} numbers, what is the last number they say?`, type: 'counting' },
            { text: `There are {numSteps} boxes with {step} items in each box. How many items in total?`, type: 'groups' },
            { text: `Each packet contains {step} stickers. How many stickers are in {numSteps} packets?`, type: 'groups' }
        ],
        practical: [
            { text: `A factory produces {step} toys every hour. How many toys are made in {numSteps} hours?`, type: 'production' },
            { text: `{name} saves £{step} each month. How much will they save after {numSteps} months?`, type: 'money' },
            { text: `A lorry carries {step} kg of goods in each load. What is the total weight after {numSteps} loads?`, type: 'measurement' },
            { text: `Each page of a book has {step} words. How many words are on {numSteps} pages?`, type: 'books' }
        ],
        complex: [
            { text: `A school raises £{step} each week for charity. How much will they raise in {numSteps} weeks?`, type: 'money' },
            { text: `{name} walks {step} metres each day. How far will they walk in {numSteps} days?`, type: 'distance' },
            { text: `A cinema has {numSteps} rows with {step} seats in each row. What is the total seating capacity?`, type: 'capacity' },
            { text: `Every carton holds {step} ml of juice. What is the total volume of {numSteps} cartons?`, type: 'volume' }
        ],
        large_numbers: [
            { text: `A city's population increases by {step} people each year. By how much will it increase over {numSteps} years?`, type: 'population' },
            { text: `An aeroplane flies {step} km per hour. How far will it travel in {numSteps} hours?`, type: 'distance' },
            { text: `A company produces {step} items daily. How many items are produced in {numSteps} days?`, type: 'production' }
        ]
    };

    const contextType = randomChoice(params.contexts || ['simple']);
    const availableContexts = contexts[contextType] || contexts.simple;
    const template = randomChoice(availableContexts);

    const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'Lucas', 'Mia', 'Jack'];
    const name = randomChoice(names);

    const text = template.text
        .replace('{name}', name)
        .replace('{numSteps}', formatNumber(numSteps))
        .replace('{step}', formatNumber(step));

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Count in ${formatNumber(step)}s: ${formatNumber(step)} × ${numSteps}`,
        module: 'N06_Y4_NPV',
        level: level
    };
}

/**
 * OPERATION 2: Place Value & Comparison Problems
 * Use 4-digit place value understanding to solve problems with comparison
 */
function generatePlaceValueComparisonProblem(params, level) {
    const problemTypes = [
        'compose_from_parts',
        'find_digit_value',
        'compare_large_numbers',
        'order_numbers',
        'find_more_less_1000',
        'roman_numeral_problem'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'compose_from_parts': {
            const number = randomInt(1000, Math.min(9999, params.max_value));
            const thousands = Math.floor(number / 1000);
            const hundreds = Math.floor((number % 1000) / 100);
            const tens = Math.floor((number % 100) / 10);
            const ones = number % 10;

            const templates = [
                `What number has {thousands} thousands, {hundreds} hundreds, {tens} tens and {ones} ones?`,
                `{name} makes a number with {thousands} thousands, {hundreds} hundreds, {tens} tens and {ones} ones. What number is it?`,
                `A number is composed of {thousands} thousands, {hundreds} hundreds, {tens} tens and {ones} ones. What is the number?`
            ];

            const names = ['Sarah', 'Tom', 'Jake', 'Maya', 'Ben', 'Lucy', 'Sam', 'Zara'];
            const text = randomChoice(templates)
                .replace('{thousands}', thousands)
                .replace('{hundreds}', hundreds)
                .replace('{tens}', tens)
                .replace('{ones}', ones)
                .replace('{name}', randomChoice(names));

            const distractors = generateDistractors(number, 3, 1000, params.max_value);
            const options = shuffle([number, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: number.toString(),
                hint: `${thousands}000 + ${hundreds}00 + ${tens}0 + ${ones}`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'find_digit_value': {
            const number = randomInt(1000, Math.min(9999, params.max_value));
            const place = randomChoice(['thousands', 'hundreds', 'tens', 'ones']);
            const digit = getDigitAtPlace(number, place);

            if (digit === 0) {
                return generatePlaceValueComparisonProblem(params, level);
            }

            const value = getPlaceValue(number, place);

            const templates = [
                `In the number ${formatNumber(number)}, what is the value of the digit ${digit}?`,
                `A library has ${formatNumber(number)} books. What does the ${digit} represent?`,
                `${formatNumber(number)} people attended a concert. What is the value of the digit ${digit}?`
            ];

            const text = randomChoice(templates);

            const distractors = new Set([digit]);
            const otherPlaces = ['thousands', 'hundreds', 'tens', 'ones'].filter(p => p !== place);
            otherPlaces.forEach(p => {
                const otherValue = getPlaceValue(number, p);
                if (otherValue > 0 && otherValue !== value) {
                    distractors.add(otherValue);
                }
            });

            while (distractors.size < 4) {
                const offset = randomChoice([10, 100, 1000, -10, -100, -1000]);
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
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'compare_large_numbers': {
            const num1 = randomInt(1000, params.max_value);
            const num2 = randomInt(1000, params.max_value);

            if (num1 === num2) {
                return generatePlaceValueComparisonProblem(params, level);
            }

            const names = ['Alice', 'Ben', 'Chloe', 'Dan', 'Eva', 'Finn', 'Grace', 'Harry'];
            const name1 = randomChoice(names);
            const name2 = randomChoice(names.filter(n => n !== name1));

            const items = ['points', 'stamps', 'coins', 'steps', 'metres', 'grams'];
            const item = randomChoice(items);

            const text = `${name1} collected ${formatNumber(num1)} ${item}. ${name2} collected ${formatNumber(num2)} ${item}. Who collected more?`;

            const answer = num1 > num2 ? name1 : name2;
            const options = [name1, name2];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Compare ${formatNumber(num1)} and ${formatNumber(num2)}`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'order_numbers': {
            const count = level <= 2 ? 3 : 4;
            const numbers = generateUniqueNumbers(count, 1000, params.max_value);
            const sorted = sortAscending(numbers);

            const names = ['Amy', 'Ben', 'Chloe', 'Dan', 'Eva', 'Finn', 'Grace', 'Hugo'];
            const selectedNames = names.slice(0, count);

            const items = ['points', 'stickers', 'tickets', 'tokens', 'pounds', 'kilograms'];
            const item = randomChoice(items);

            let text = '';
            numbers.forEach((num, i) => {
                text += `${selectedNames[i]} has ${formatNumber(num)} ${item}. `;
            });

            const askFor = randomChoice(['most', 'least']);
            text += `Who has the ${askFor} ${item}?`;

            const answer = askFor === 'most'
                ? selectedNames[numbers.indexOf(sorted[sorted.length - 1])]
                : selectedNames[numbers.indexOf(sorted[0])];

            return {
                text: text,
                type: 'multiple_choice',
                options: selectedNames,
                answer: answer,
                hint: `Find the ${askFor === 'most' ? 'largest' : 'smallest'} number`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'find_more_less_1000': {
            const start = randomInt(1000, Math.min(8000, params.max_value - 1000));
            const direction = randomChoice(['more', 'less']);
            const answer = direction === 'more' ? start + 1000 : start - 1000;

            const templates = [
                `What is 1,000 ${direction} than ${formatNumber(start)}?`,
                `A shop has ${formatNumber(start)} items. They receive 1,000 ${direction === 'more' ? 'more' : 'fewer'} items. How many items now?`,
                `${formatNumber(start)} people live in a town. The population changes by 1,000 ${direction === 'more' ? 'increase' : 'decrease'}. What is the new population?`
            ];

            const text = randomChoice(templates);

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `${formatNumber(start)} ${direction === 'more' ? '+' : '-'} 1,000`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'roman_numeral_problem': {
            // Only include if level allows (Roman numerals to 100)
            const arabic = randomInt(params.roman_min || 1, params.roman_max || 100);
            const roman = toRoman(arabic);

            const problemSubtype = randomChoice(['to_arabic', 'to_roman', 'comparison']);

            if (problemSubtype === 'to_arabic') {
                const text = `A clock face shows the Roman numeral ${roman}. What number does this represent?`;

                const distractors = generateDistractors(arabic, 3, params.roman_min || 1, params.roman_max || 100);
                const options = shuffle([arabic, ...distractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: arabic.toString(),
                    hint: `Convert ${roman} to a number`,
                    module: 'N06_Y4_NPV',
                    level: level
                };
            } else if (problemSubtype === 'to_roman') {
                const text = `Write ${arabic} as a Roman numeral.`;

                const distractorNumbers = generateDistractors(arabic, 3, params.roman_min || 1, params.roman_max || 100);
                const options = shuffle([roman, ...distractorNumbers.map(n => toRoman(n))]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: roman,
                    hint: `Convert ${arabic} to Roman numerals`,
                    module: 'N06_Y4_NPV',
                    level: level
                };
            } else {
                const arabic2 = randomInt(params.roman_min || 1, params.roman_max || 100);
                const roman2 = toRoman(arabic2);

                if (arabic === arabic2) {
                    return generatePlaceValueComparisonProblem(params, level);
                }

                const text = `Which is larger: ${roman} or ${roman2}?`;
                const answer = arabic > arabic2 ? roman : roman2;
                const options = [roman, roman2];

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer,
                    hint: `Compare ${arabic} and ${arabic2}`,
                    module: 'N06_Y4_NPV',
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
 * Apply rounding (10, 100, 1000) to practical situations
 */
function generateRoundingEstimationProblem(params, level) {
    const problemTypes = [
        'round_to_nearest',
        'estimate_calculation',
        'estimate_measurement',
        'round_for_comparison',
        'practical_rounding'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'round_to_nearest': {
            const roundTo = randomChoice(params.rounding_bases || [10, 100, 1000]);
            const number = randomInt(Math.max(100, roundTo), Math.min(params.max_value, 9999));

            // Ensure number is not already a multiple
            const adjustedNumber = number % roundTo === 0
                ? number + randomChoice([1, 2, 3, -1, -2, -3])
                : number;

            const rounded = roundToNearest(adjustedNumber, roundTo);

            const text = `Round ${formatNumber(adjustedNumber)} to the nearest ${formatNumber(roundTo)}.`;

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
                hint: `Look at the digit in the ${roundTo === 10 ? 'ones' : roundTo === 100 ? 'tens' : 'hundreds'} place`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'estimate_calculation': {
            const num1 = randomInt(100, Math.min(5000, params.max_value));
            const num2 = randomInt(100, Math.min(5000, params.max_value));
            const operation = randomChoice(['+', '-']);
            const actual = operation === '+' ? num1 + num2 : Math.max(num1, num2) - Math.min(num1, num2);

            const roundTo = num1 >= 1000 || num2 >= 1000 ? 1000 : 100;
            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);
            const estimate = operation === '+' ? rounded1 + rounded2 : Math.abs(rounded1 - rounded2);

            const templates = [
                `Estimate the answer to ${formatNumber(num1)} ${operation} ${formatNumber(num2)} by rounding to the nearest ${formatNumber(roundTo)}.`,
                `Round ${formatNumber(num1)} and ${formatNumber(num2)} to the nearest ${formatNumber(roundTo)}, then calculate ${formatNumber(num1)} ${operation} ${formatNumber(num2)}.`,
                `What is a good estimate for ${formatNumber(num1)} ${operation} ${formatNumber(num2)}? (Round to nearest ${formatNumber(roundTo)})`
            ];

            const text = randomChoice(templates);

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
                hint: `${formatNumber(rounded1)} ${operation} ${formatNumber(rounded2)}`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'estimate_measurement': {
            const actual = randomInt(150, Math.min(9500, params.max_value));
            const roundTo = actual >= 1000 ? 1000 : 100;
            const rounded = roundToNearest(actual, roundTo);

            const measurements = [
                { item: 'jar', unit: 'sweets', text: `A jar contains approximately ${formatNumber(actual)} sweets.` },
                { item: 'building', unit: 'bricks', text: `A building used about ${formatNumber(actual)} bricks.` },
                { item: 'book', unit: 'words', text: `A book has roughly ${formatNumber(actual)} words.` },
                { item: 'concert', unit: 'people', text: `About ${formatNumber(actual)} people attended a concert.` },
                { item: 'tree', unit: 'cm', text: `A tree measures approximately ${formatNumber(actual)} cm tall.` }
            ];

            const measurement = randomChoice(measurements);
            const text = `${measurement.text} What is the best estimate rounded to the nearest ${formatNumber(roundTo)}?`;

            const estimates = [
                rounded - roundTo,
                rounded,
                rounded + roundTo,
                actual
            ].filter(n => n > 0);

            const uniqueEstimates = [...new Set(estimates)].slice(0, 4);

            return {
                text: text,
                type: 'multiple_choice',
                options: shuffle(uniqueEstimates),
                answer: rounded.toString(),
                hint: `Round ${formatNumber(actual)} to nearest ${formatNumber(roundTo)}`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'round_for_comparison': {
            const num1 = randomInt(1000, params.max_value);
            const num2 = randomInt(1000, params.max_value);

            if (num1 === num2) {
                return generateRoundingEstimationProblem(params, level);
            }

            const roundTo = 1000;
            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);

            const text = `${formatNumber(num1)} people visited a museum on Monday. ${formatNumber(num2)} visited on Tuesday. Round both numbers to the nearest ${formatNumber(roundTo)}. Which day had more visitors?`;

            const answer = rounded1 > rounded2 ? 'Monday' : rounded2 > rounded1 ? 'Tuesday' : 'about the same';
            const options = ['Monday', 'Tuesday', 'about the same'];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Round ${formatNumber(num1)} and ${formatNumber(num2)} to nearest 1,000`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'practical_rounding': {
            const contexts = [
                {
                    text: `A charity needs to raise £{target}. They have raised £{actual}. About how much more do they need? (Round to nearest {roundTo})`,
                    calculation: 'subtract'
                },
                {
                    text: `A school has {actual} books in Year 3 and {actual2} books in Year 4. Estimate the total. (Round to nearest {roundTo})`,
                    calculation: 'add'
                },
                {
                    text: `A shop ordered {actual} items. They sold {actual2}. About how many items are left? (Round to nearest {roundTo})`,
                    calculation: 'subtract'
                }
            ];

            const context = randomChoice(contexts);
            const actual = randomInt(1000, Math.min(5000, params.max_value));
            const actual2 = context.calculation === 'add'
                ? randomInt(1000, Math.min(5000, params.max_value))
                : randomInt(100, actual - 100);

            const roundTo = 1000;
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
                hint: `Round both numbers to ${formatNumber(roundTo)} first`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        default:
            return generateRoundingEstimationProblem(params, level);
    }
}

/**
 * OPERATION 4: Negative Number Problems
 * Solve problems involving counting through zero
 */
function generateNegativeNumberProblem(params, level) {
    const problemTypes = [
        'temperature_change',
        'count_through_zero',
        'position_relative_to_zero',
        'compare_negatives',
        'sequence_with_negatives'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'temperature_change': {
            const start = randomInt(-10, 10);
            const change = randomInt(5, 15);
            const direction = randomChoice(['rises', 'falls']);
            const answer = direction === 'rises' ? start + change : start - change;

            const text = `The temperature is ${start}°C. It ${direction} by ${change}°C. What is the new temperature?`;

            const distractors = generateDistractors(answer, 3, -30, 30);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Start at ${start}°C, then ${direction === 'rises' ? 'add' : 'subtract'} ${change}`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'count_through_zero': {
            const start = randomInt(5, 15);
            const step = randomChoice([1, 2, 5]);
            const numSteps = randomInt(Math.ceil(start / step) + 2, Math.ceil(start / step) + 5);
            const answer = start - (step * numSteps);

            const text = `Start at ${start}. Count backwards in ${step}s for ${numSteps} steps. What number do you reach?`;

            const distractors = generateDistractors(answer, 3, -30, 20);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Count: ${start}, ${start - step}, ${start - 2*step}...`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'position_relative_to_zero': {
            const position = randomInt(-15, -1);
            const distance = Math.abs(position);

            const templates = [
                `A submarine is at depth ${position} metres (${distance} metres below sea level). What number represents this depth?`,
                `A car park has levels below ground. Level ${position} is ${distance} floors underground. What number represents this level?`,
                `A thermometer shows ${distance} degrees below zero. What number is this?`
            ];

            const text = randomChoice(templates);
            const answer = position;

            const distractors = [
                distance,
                -distance - 1,
                -distance + 1,
                position - 5,
                position + 5
            ].filter(d => d !== answer);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([answer, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Below zero means negative`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'compare_negatives': {
            const num1 = randomInt(-20, 5);
            const num2 = randomInt(-20, 5);

            if (num1 === num2) {
                return generateNegativeNumberProblem(params, level);
            }

            const templates = [
                `Which is colder: ${num1}°C or ${num2}°C?`,
                `Which number is smaller: ${num1} or ${num2}?`,
                `Which temperature is lower: ${num1}°C or ${num2}°C?`
            ];

            const text = randomChoice(templates);
            const answer = num1 < num2 ? num1 : num2;
            const options = [num1, num2];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `More negative numbers are smaller`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'sequence_with_negatives': {
            const start = randomInt(3, 10);
            const step = randomChoice([1, 2, 3]);
            const length = randomInt(5, 7);

            const sequence = [];
            for (let i = 0; i < length; i++) {
                sequence.push(start - i * step);
            }

            const gapPosition = randomInt(Math.floor(length / 2), length - 1);
            const answer = sequence[gapPosition];
            sequence[gapPosition] = '___';

            const text = `Complete the sequence: ${sequence.join(', ')}`;

            const distractors = [
                answer + step,
                answer - step,
                answer + 1,
                answer - 1
            ].filter(d => d !== answer);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([answer, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `The sequence goes down by ${step} each time`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        default:
            return generateNegativeNumberProblem(params, level);
    }
}

/**
 * OPERATION 5: Multi-Step Combined Problems
 * Integrate 2+ concepts from N1-N5
 */
function generateMultiStepProblem(params, level) {
    const problemTypes = [
        'count_then_round',
        'place_value_then_compare',
        'round_then_operate',
        'count_with_negatives',
        'complex_practical'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'count_then_round': {
            const step = randomChoice([6, 7, 9, 25]);
            const numSteps = randomInt(3, 8);
            const result = step * numSteps;

            if (result > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const roundTo = result >= 1000 ? 1000 : 100;
            const rounded = roundToNearest(result, roundTo);

            const text = `${numSteps} boxes each contain ${step} items. How many items in total? Round your answer to the nearest ${formatNumber(roundTo)}.`;

            const distractors = [
                result,
                rounded + roundTo,
                rounded - roundTo,
                roundToNearest(result, roundTo === 1000 ? 100 : 10)
            ].filter(d => d !== rounded && d > 0);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([rounded, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: rounded.toString(),
                hint: `First: ${step} × ${numSteps} = ${formatNumber(result)}, then round`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'place_value_then_compare': {
            const thousands1 = randomInt(1, 5);
            const hundreds1 = randomInt(0, 9);
            const tens1 = randomInt(0, 9);
            const ones1 = randomInt(0, 9);
            const number1 = thousands1 * 1000 + hundreds1 * 100 + tens1 * 10 + ones1;

            const thousands2 = randomInt(1, 5);
            const hundreds2 = randomInt(0, 9);
            const tens2 = randomInt(0, 9);
            const ones2 = randomInt(0, 9);
            const number2 = thousands2 * 1000 + hundreds2 * 100 + tens2 * 10 + ones2;

            if (number1 === number2) {
                return generateMultiStepProblem(params, level);
            }

            const text = `Number A has ${thousands1} thousands, ${hundreds1} hundreds, ${tens1} tens and ${ones1} ones. Number B has ${thousands2} thousands, ${hundreds2} hundreds, ${tens2} tens and ${ones2} ones. Which number is larger?`;

            const answer = number1 > number2 ? 'A' : 'B';
            const options = ['A', 'B'];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `A = ${formatNumber(number1)}, B = ${formatNumber(number2)}`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'round_then_operate': {
            const num1 = randomInt(1000, Math.min(5000, params.max_value));
            const num2 = randomInt(1000, Math.min(5000, params.max_value));
            const roundTo = 1000;

            const rounded1 = roundToNearest(num1, roundTo);
            const rounded2 = roundToNearest(num2, roundTo);

            const operation = randomChoice(['+', '-']);
            const answer = operation === '+'
                ? rounded1 + rounded2
                : Math.abs(rounded1 - rounded2);

            const text = `A factory produced ${formatNumber(num1)} items in January and ${formatNumber(num2)} items in February. Round both numbers to the nearest ${formatNumber(roundTo)}, then ${operation === '+' ? 'find the total' : 'find the difference'}.`;

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
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'count_with_negatives': {
            const start = randomInt(10, 20);
            const step = randomChoice([2, 3, 5]);
            const numSteps = randomInt(Math.ceil(start / step) + 3, Math.ceil(start / step) + 6);
            const result = start - (step * numSteps);

            const compareValue = randomInt(-15, 0);
            const isMore = result > compareValue;

            const text = `Start at ${start}. Count backwards in ${step}s for ${numSteps} steps. Is your answer more or less than ${compareValue}?`;

            const answer = isMore ? 'more' : 'less';
            const options = ['more', 'less'];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `First find: ${start} - (${step} × ${numSteps}) = ${result}`,
                module: 'N06_Y4_NPV',
                level: level
            };
        }

        case 'complex_practical': {
            const contexts = [
                {
                    text: `A school has {num1} students. They buy {numGroups} boxes of books with {step} books in each box. If they round the total books to the nearest {roundTo}, what is the estimate?`,
                    calculate: 'multiply_round'
                },
                {
                    text: `A stadium has {num1} seats. They add {change} more seats. What is 1,000 more than the new total?`,
                    calculate: 'add_then_add_1000'
                },
                {
                    text: `The temperature was {temp}°C. It dropped by {drop}°C, then rose by {rise}°C. What is the final temperature?`,
                    calculate: 'temperature_changes'
                }
            ];

            const context = randomChoice(contexts);

            if (context.calculate === 'multiply_round') {
                const numGroups = randomInt(3, 8);
                const step = randomChoice([6, 7, 9, 25]);
                const product = numGroups * step;
                const roundTo = 100;
                const answer = roundToNearest(product, roundTo);

                const text = context.text
                    .replace('{numGroups}', numGroups)
                    .replace('{step}', step)
                    .replace('{roundTo}', formatNumber(roundTo));

                const distractors = [
                    product,
                    answer + roundTo,
                    answer - roundTo,
                    roundToNearest(product, 10)
                ].filter(d => d !== answer && d > 0);

                const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
                const options = shuffle([answer, ...uniqueDistractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer.toString(),
                    hint: `${numGroups} × ${step} = ${product}, round to ${formatNumber(roundTo)}`,
                    module: 'N06_Y4_NPV',
                    level: level
                };
            } else if (context.calculate === 'add_then_add_1000') {
                const num1 = randomInt(2000, 5000);
                const change = randomInt(100, 500);
                const intermediate = num1 + change;
                const answer = intermediate + 1000;

                const text = context.text
                    .replace('{num1}', formatNumber(num1))
                    .replace('{change}', formatNumber(change));

                const distractors = [
                    intermediate,
                    num1 + 1000,
                    intermediate + 100,
                    answer + 1000
                ].filter(d => d !== answer);

                const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
                const options = shuffle([answer, ...uniqueDistractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer.toString(),
                    hint: `First: ${formatNumber(num1)} + ${formatNumber(change)}, then + 1,000`,
                    module: 'N06_Y4_NPV',
                    level: level
                };
            } else {
                const temp = randomInt(5, 15);
                const drop = randomInt(10, 20);
                const rise = randomInt(5, 10);
                const answer = temp - drop + rise;

                const text = context.text
                    .replace('{temp}', temp)
                    .replace('{drop}', drop)
                    .replace('{rise}', rise);

                const distractors = [
                    temp - drop,
                    temp + rise,
                    temp - drop - rise,
                    answer + drop
                ].filter(d => d !== answer);

                const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
                const options = shuffle([answer, ...uniqueDistractors]);

                return {
                    text: text,
                    type: 'multiple_choice',
                    options: options,
                    answer: answer.toString(),
                    hint: `${temp} - ${drop} + ${rise}`,
                    module: 'N06_Y4_NPV',
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
    moduleId: 'N06_Y4_NPV',
    generate: generateQuestion
};
