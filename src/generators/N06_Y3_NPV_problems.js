/**
 * Year 3 Number Problems Generator
 *
 * Module: N06_Y3_NPV - "Solve number problems and practical problems involving 3N1-3N4"
 *
 * This synthesis module combines concepts from:
 * - N01: Counting in multiples of 4, 8, 50 and 100
 * - N02: Compare and order numbers to 1,000; find 10 or 100 more/less
 * - N03: Place value (hundreds, tens, ones)
 * - N04: Identify, represent and estimate numbers
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    getComparisonSymbol,
    generateUniqueNumbers,
    sortAscending
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
        case 'counting_problems':
            return generateCountingProblem(params, level);
        case 'place_value_problems':
            return generatePlaceValueProblem(params, level);
        case 'comparison_problems':
            return generateComparisonProblem(params, level);
        case 'representation_problems':
            return generateRepresentationProblem(params, level);
        case 'multi_step_problems':
            return generateMultiStepProblem(params, level);
        default:
            return generateCountingProblem(params, level);
    }
}

/**
 * OPERATION 1: Counting Problems
 * Apply skip counting (4, 8, 50, 100) to solve real-world problems
 */
function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const numSteps = randomInt(2, Math.min(params.max_steps, 8));
    const answer = step * numSteps;

    // Ensure answer is within range
    if (answer > params.max_value) {
        return generateCountingProblem(params, level);
    }

    const contexts = {
        simple: [
            { text: `{name} counts in {step}s. They count {numSteps} numbers starting from 0. What is the last number they say?`, type: 'counting' },
            { text: `There are {numSteps} boxes with {step} pencils in each box. How many pencils in total?`, type: 'groups' },
            { text: `{name} has {numSteps} bags with {step} marbles in each bag. How many marbles altogether?`, type: 'groups' }
        ],
        varied: [
            { text: `A shop sells packets of {step} stickers. How many stickers are in {numSteps} packets?`, type: 'shop' },
            { text: `Each page has {step} stamps. How many stamps are on {numSteps} pages?`, type: 'pages' },
            { text: `{name} saves £{step} each week for {numSteps} weeks. How much money did they save?`, type: 'money' },
            { text: `In a game, you score {step} points each round. After {numSteps} rounds, what is your total score?`, type: 'game' }
        ],
        mixed: [
            { text: `A cinema has {numSteps} rows with {step} seats in each row. How many seats in total?`, type: 'arrays' },
            { text: `{name} walks {step} metres each minute. How far do they walk in {numSteps} minutes?`, type: 'measurement' },
            { text: `Every box weighs {step}g. What is the total weight of {numSteps} boxes?`, type: 'measurement' },
            { text: `A book has {numSteps} chapters with {step} pages each. How many pages in the book?`, type: 'books' }
        ],
        complex: [
            { text: `A factory produces {step} toys every hour. How many toys are made in {numSteps} hours?`, type: 'production' },
            { text: `{name} reads {step} words per minute. How many words can they read in {numSteps} minutes?`, type: 'reading' },
            { text: `Each car uses {step}ml of fuel per kilometre. How much fuel is used over {numSteps} kilometres?`, type: 'measurement' }
        ]
    };

    const contextType = randomChoice(params.contexts || ['simple']);
    const availableContexts = contexts[contextType] || contexts.simple;
    const template = randomChoice(availableContexts);

    const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'Lucas'];
    const name = randomChoice(names);

    const text = template.text
        .replace('{name}', name)
        .replace('{numSteps}', numSteps)
        .replace('{step}', step);

    const distractors = generateDistractors(answer, 3, 0, params.max_value);
    const options = shuffle([answer, ...distractors]);

    return {
        text: text,
        type: 'multiple_choice',
        options: options,
        answer: answer.toString(),
        hint: `Count in ${step}s: ${step} × ${numSteps}`,
        module: 'N06_Y3_NPV',
        level: level
    };
}

/**
 * OPERATION 2: Place Value Problems
 * Use hundreds/tens/ones understanding to solve problems
 */
function generatePlaceValueProblem(params, level) {
    const problemTypes = [
        'compose_from_parts',
        'decompose_to_parts',
        'add_place_value',
        'subtract_place_value',
        'compare_digits',
        'digit_value_word_problem'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'compose_from_parts': {
            const number = randomInt(100, Math.min(999, params.max_value));
            const hundreds = Math.floor(number / 100);
            const tens = Math.floor((number % 100) / 10);
            const ones = number % 10;

            const templates = [
                `What number has {hundreds} hundreds, {tens} tens and {ones} ones?`,
                `{name} makes a number with {hundreds} hundreds, {tens} tens and {ones} ones. What is the number?`,
                `A number is made from {hundreds} hundreds, {tens} tens and {ones} ones. What is it?`
            ];

            const names = ['Tom', 'Lucy', 'Jake', 'Maya', 'Sam', 'Zara', 'Ben', 'Ella'];
            const text = randomChoice(templates)
                .replace('{hundreds}', hundreds)
                .replace('{tens}', tens)
                .replace('{ones}', ones)
                .replace('{name}', randomChoice(names));

            const distractors = generateDistractors(number, 3, 100, params.max_value);
            const options = shuffle([number, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: number.toString(),
                hint: `${hundreds} hundreds = ${hundreds * 100}, ${tens} tens = ${tens * 10}, ${ones} ones = ${ones}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'decompose_to_parts': {
            const number = randomInt(100, Math.min(999, params.max_value));
            const hundreds = Math.floor(number / 100);
            const tens = Math.floor((number % 100) / 10);
            const ones = number % 10;

            const askFor = randomChoice(['hundreds', 'tens', 'ones']);
            const answer = askFor === 'hundreds' ? hundreds : askFor === 'tens' ? tens : ones;

            const text = `How many ${askFor} are in ${formatNumber(number)}?`;

            const distractors = generateDistractors(answer, 3, 0, 9);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Look at the ${askFor} place`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'add_place_value': {
            const start = randomInt(100, Math.min(700, params.max_value - 300));
            const addAmount = randomChoice([10, 100]);
            const numToAdd = randomInt(1, Math.min(3, Math.floor((params.max_value - start) / addAmount)));
            const totalAdd = addAmount * numToAdd;
            const answer = start + totalAdd;

            const templates = [
                `What is ${totalAdd} more than ${formatNumber(start)}?`,
                `{name} has ${formatNumber(start)} points. They earn ${totalAdd} more points. How many points now?`,
                `A school has ${formatNumber(start)} students. ${totalAdd} new students join. How many students now?`,
                `Start at ${formatNumber(start)}. Add ${totalAdd}. What number do you get?`
            ];

            const names = ['Ben', 'Mia', 'Leo', 'Ella', 'Max', 'Ruby'];
            const text = randomChoice(templates)
                .replace('{name}', randomChoice(names));

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `${formatNumber(start)} + ${totalAdd}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'subtract_place_value': {
            const start = randomInt(200, Math.min(999, params.max_value));
            const subtractAmount = randomChoice([10, 100]);
            const numToSubtract = randomInt(1, Math.min(3, Math.floor(start / subtractAmount)));
            const totalSubtract = subtractAmount * numToSubtract;
            const answer = start - totalSubtract;

            const templates = [
                `What is ${totalSubtract} less than ${formatNumber(start)}?`,
                `{name} has ${formatNumber(start)} stickers. They give away ${totalSubtract}. How many left?`,
                `A car park has ${formatNumber(start)} spaces. ${totalSubtract} are taken. How many are free?`,
                `Start at ${formatNumber(start)}. Subtract ${totalSubtract}. What number do you get?`
            ];

            const names = ['Alice', 'Charlie', 'Daisy', 'Finn'];
            const text = randomChoice(templates)
                .replace('{name}', randomChoice(names));

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `${formatNumber(start)} - ${totalSubtract}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'compare_digits': {
            const num1 = randomInt(100, Math.min(999, params.max_value));
            const num2 = randomInt(100, Math.min(999, params.max_value));

            if (num1 === num2) {
                return generatePlaceValueProblem(params, level);
            }

            const larger = Math.max(num1, num2);
            const smaller = Math.min(num1, num2);

            const templates = [
                `{name} scores ${formatNumber(num1)} points. {name2} scores ${formatNumber(num2)} points. Who scored more?`,
                `One book has ${formatNumber(num1)} pages. Another has ${formatNumber(num2)} pages. Which book is longer?`,
                `A shop sold ${formatNumber(num1)} items on Monday and ${formatNumber(num2)} items on Tuesday. On which day were more items sold?`
            ];

            const names = ['Alice', 'Ben', 'Chloe', 'Dan', 'Eva', 'Finn', 'Grace', 'Harry'];
            const name = randomChoice(names);
            const name2 = randomChoice(names.filter(n => n !== name));

            const template = randomChoice(templates);
            const text = template
                .replace('{name}', name)
                .replace('{name2}', name2);

            // Determine answer based on template type
            let answer, wrongAnswer;
            if (template.includes('book')) {
                answer = num1 > num2 ? 'first' : 'second';
                wrongAnswer = num1 > num2 ? 'second' : 'first';
            } else if (template.includes('Monday')) {
                answer = num1 > num2 ? 'Monday' : 'Tuesday';
                wrongAnswer = num1 > num2 ? 'Tuesday' : 'Monday';
            } else {
                answer = num1 > num2 ? name : name2;
                wrongAnswer = num1 > num2 ? name2 : name;
            }

            return {
                text: text,
                type: 'multiple_choice',
                options: [answer, wrongAnswer],
                answer: answer,
                hint: `Compare ${formatNumber(num1)} and ${formatNumber(num2)}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'digit_value_word_problem': {
            const number = randomInt(100, Math.min(999, params.max_value));
            const place = randomChoice(['hundreds', 'tens', 'ones']);
            const digit = getDigitAtPlace(number, place);

            if (digit === 0) {
                return generatePlaceValueProblem(params, level);
            }

            const value = getPlaceValue(number, place);

            const templates = [
                `In the number ${formatNumber(number)}, what is the value of the digit ${digit}?`,
                `A number has the value ${formatNumber(number)}. What does the ${digit} represent?`,
                `The number ${formatNumber(number)} has a ${digit} in it. What is the value of this ${digit}?`
            ];

            const text = randomChoice(templates);

            const distractors = new Set([digit]);
            const otherPlaces = ['hundreds', 'tens', 'ones'].filter(p => p !== place);
            otherPlaces.forEach(p => {
                const otherValue = getPlaceValue(number, p);
                if (otherValue > 0 && otherValue !== value) {
                    distractors.add(otherValue);
                }
            });

            while (distractors.size < 3) {
                const offset = randomChoice([10, 100, -10, -100]);
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
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        default:
            return generatePlaceValueProblem(params, level);
    }
}

/**
 * OPERATION 3: Comparison Problems
 * Compare and order numbers up to 1,000; find differences
 */
function generateComparisonProblem(params, level) {
    const problemTypes = ['who_has_more', 'order_by_size', 'use_symbols', 'difference', 'greatest_smallest'];
    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'who_has_more': {
            const num1 = randomInt(100, params.max_value);
            const num2 = randomInt(100, params.max_value);

            if (num1 === num2) {
                return generateComparisonProblem(params, level);
            }

            const names = ['Lily', 'Oscar', 'Isla', 'Jack', 'Freya', 'George', 'Sophie', 'Thomas'];
            const name1 = randomChoice(names);
            const name2 = randomChoice(names.filter(n => n !== name1));

            const items = ['stickers', 'marbles', 'coins', 'cards', 'points', 'stamps', 'books', 'toys'];
            const item = randomChoice(items);

            const text = `${name1} has ${formatNumber(num1)} ${item}. ${name2} has ${formatNumber(num2)} ${item}. Who has more ${item}?`;

            const answer = num1 > num2 ? name1 : name2;
            const options = [name1, name2];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Which is larger: ${formatNumber(num1)} or ${formatNumber(num2)}?`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'order_by_size': {
            const count = level === 1 ? 3 : 4;
            const numbers = generateUniqueNumbers(count, 100, params.max_value);
            const sorted = sortAscending(numbers);

            const names = ['Amy', 'Ben', 'Chloe', 'Dan', 'Eva', 'Finn', 'Grace', 'Hugo'];
            const selectedNames = names.slice(0, count);

            const items = ['points', 'stickers', 'stars', 'tokens', 'coins', 'cards'];
            const item = randomChoice(items);

            let text = '';
            numbers.forEach((num, i) => {
                text += `${selectedNames[i]} has ${formatNumber(num)} ${item}. `;
            });
            text += `Who has the most ${item}?`;

            const answer = selectedNames[numbers.indexOf(sorted[sorted.length - 1])];

            return {
                text: text,
                type: 'multiple_choice',
                options: selectedNames,
                answer: answer,
                hint: `Find the largest number`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'use_symbols': {
            const num1 = randomInt(100, params.max_value);
            const num2 = randomInt(100, params.max_value);

            const symbol = getComparisonSymbol(num1, num2);
            const symbolWords = {
                '<': 'less than',
                '>': 'greater than',
                '=': 'equal to'
            };

            const text = `Which symbol makes this statement true?\n${formatNumber(num1)} ___ ${formatNumber(num2)}`;

            return {
                text: text,
                type: 'multiple_choice',
                options: ['<', '>', '='],
                answer: symbol,
                hint: `Is ${formatNumber(num1)} ${symbolWords[symbol]} ${formatNumber(num2)}?`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'difference': {
            const larger = randomInt(200, params.max_value);
            const difference = randomInt(10, Math.min(200, larger - 100));
            const smaller = larger - difference;

            const names = ['Tom', 'Sarah', 'Jake', 'Emma', 'Oliver', 'Hannah'];
            const name1 = randomChoice(names);
            const name2 = randomChoice(names.filter(n => n !== name1));

            const templates = [
                `${name1} has ${formatNumber(larger)} marbles. ${name2} has ${formatNumber(smaller)} marbles. How many more does ${name1} have?`,
                `A school collected ${formatNumber(larger)} cans for recycling. Another school collected ${formatNumber(smaller)} cans. What is the difference?`,
                `${name1} walked ${formatNumber(larger)} metres. ${name2} walked ${formatNumber(smaller)} metres. How much further did ${name1} walk?`
            ];

            const text = randomChoice(templates)
                .replace('{name1}', name1)
                .replace('{name2}', name2);

            const distractors = generateDistractors(difference, 3, 10, 500);
            const options = shuffle([difference, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: difference.toString(),
                hint: `Find the difference: ${formatNumber(larger)} - ${formatNumber(smaller)}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'greatest_smallest': {
            const count = 3;
            const numbers = generateUniqueNumbers(count, 100, params.max_value);
            const sorted = sortAscending(numbers);

            const askFor = randomChoice(['greatest', 'smallest']);
            const answer = askFor === 'greatest' ? sorted[sorted.length - 1] : sorted[0];

            const text = `Which is the ${askFor} number: ${numbers.map(n => formatNumber(n)).join(', ')}?`;

            const distractors = numbers.filter(n => n !== answer);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Find the ${askFor} value`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        default:
            return generateComparisonProblem(params, level);
    }
}

/**
 * OPERATION 4: Representation Problems
 * Estimate, position, and identify numbers in different representations
 */
function generateRepresentationProblem(params, level) {
    const problemTypes = ['estimate_value', 'position_between', 'round_to_nearest', 'number_line_position'];
    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'estimate_value': {
            const actual = randomInt(150, params.max_value);
            const roundedTo = actual >= 500 ? 100 : 10;
            const rounded = Math.round(actual / roundedTo) * roundedTo;

            const estimates = [
                rounded - roundedTo,
                rounded,
                rounded + roundedTo,
                actual
            ].filter(n => n > 0 && n <= params.max_value);

            const uniqueEstimates = [...new Set(estimates)];

            const templates = [
                `A jar contains approximately ${formatNumber(actual)} sweets. Which is the best estimate?`,
                `About ${formatNumber(actual)} people attended a concert. Which number is the closest estimate?`,
                `A tree is roughly ${formatNumber(actual)} cm tall. What is a good estimate of its height?`
            ];

            const text = randomChoice(templates);

            return {
                text: text,
                type: 'multiple_choice',
                options: shuffle(uniqueEstimates.slice(0, 4)),
                answer: rounded.toString(),
                hint: `Round to the nearest ${roundedTo}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'position_between': {
            const lower = randomInt(100, params.max_value - 200);
            const upper = lower + randomInt(100, 200);
            const middle = Math.floor((lower + upper) / 2);

            const templates = [
                `Which number is between ${formatNumber(lower)} and ${formatNumber(upper)}?`,
                `A number line shows ${formatNumber(lower)} and ${formatNumber(upper)}. Which number could be in the middle?`,
                `{name} thinks of a number between ${formatNumber(lower)} and ${formatNumber(upper)}. Which could it be?`
            ];

            const names = ['Emma', 'James', 'Sophia', 'Daniel'];
            const text = randomChoice(templates)
                .replace('{name}', randomChoice(names));

            // Generate options: one correct (middle-ish), others outside or at bounds
            const options = [
                middle,
                lower - 10,
                upper + 10,
                randomInt(lower + 10, upper - 10)
            ].filter((n, i, arr) => arr.indexOf(n) === i && n > 0 && n <= params.max_value);

            const correctOption = randomChoice(options.filter(n => n > lower && n < upper));

            return {
                text: text,
                type: 'multiple_choice',
                options: shuffle(options.slice(0, 4)),
                answer: correctOption.toString(),
                hint: `The number must be greater than ${formatNumber(lower)} and less than ${formatNumber(upper)}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'round_to_nearest': {
            const base = randomChoice([10, 100]);
            const number = randomInt(Math.max(100, base * 2), params.max_value);

            // Make sure it's not already a multiple
            const adjustedNumber = number % base === 0 ? number + randomChoice([1, 2, 3, -1, -2, -3]) : number;
            const rounded = Math.round(adjustedNumber / base) * base;

            const text = `Round ${formatNumber(adjustedNumber)} to the nearest ${base}.`;

            const distractors = [
                rounded + base,
                rounded - base,
                Math.floor(adjustedNumber / base) * base,
                Math.ceil(adjustedNumber / base) * base
            ].filter(d => d !== rounded && d > 0 && d <= params.max_value);

            const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
            const options = shuffle([rounded, ...uniqueDistractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: rounded.toString(),
                hint: `Look at the ${base === 10 ? 'ones' : 'tens'} digit`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'number_line_position': {
            const start = randomInt(0, params.max_value - 300);
            const end = start + randomInt(100, 300);
            const target = randomInt(start + 20, end - 20);

            const text = `A number line goes from ${formatNumber(start)} to ${formatNumber(end)}. Which number is closest to the middle?`;

            const middle = Math.floor((start + end) / 2);
            const options = [
                middle,
                start,
                end,
                randomInt(start + 10, end - 10)
            ];

            const correctAnswer = options.reduce((closest, current) => {
                return Math.abs(current - middle) < Math.abs(closest - middle) ? current : closest;
            });

            return {
                text: text,
                type: 'multiple_choice',
                options: shuffle(options),
                answer: correctAnswer.toString(),
                hint: `Find the halfway point between ${formatNumber(start)} and ${formatNumber(end)}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        default:
            return generateRepresentationProblem(params, level);
    }
}

/**
 * OPERATION 5: Multi-Step Problems
 * Combine 2+ concepts (counting + comparison, place value + addition, etc.)
 */
function generateMultiStepProblem(params, level) {
    const problemTypes = [
        'count_then_compare',
        'place_value_then_add',
        'count_then_order',
        'add_then_compare',
        'combined_operations'
    ];
    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'count_then_compare': {
            const step = randomChoice(params.step_sizes);
            const numSteps = randomInt(3, 6);
            const result = step * numSteps;

            if (result > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const compareValue = result + randomInt(-50, 50);
            const isMore = result > compareValue;

            const names = ['Alex', 'Bella', 'Chris', 'Dana'];
            const name = randomChoice(names);

            const text = `${name} counts in ${step}s and counts ${numSteps} numbers. Is the final number more or less than ${formatNumber(compareValue)}?`;

            const answer = isMore ? 'more' : 'less';

            return {
                text: text,
                type: 'multiple_choice',
                options: ['more', 'less'],
                answer: answer,
                hint: `First find: ${step} × ${numSteps} = ${result}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'place_value_then_add': {
            const hundreds = randomInt(1, Math.min(7, Math.floor(params.max_value / 100)));
            const tens = randomInt(0, 9);
            const ones = randomInt(0, 9);
            const number = hundreds * 100 + tens * 10 + ones;

            const addAmount = randomChoice([10, 100]);
            const answer = number + addAmount;

            if (answer > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const text = `A number has ${hundreds} hundreds, ${tens} tens and ${ones} ones. Add ${addAmount} to this number. What is the result?`;

            const distractors = generateDistractors(answer, 3, 100, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `First make the number: ${formatNumber(number)}, then add ${addAmount}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'count_then_order': {
            const step1 = randomChoice(params.step_sizes);
            const step2 = randomChoice(params.step_sizes.filter(s => s !== step1));

            const numSteps1 = randomInt(2, 5);
            const numSteps2 = randomInt(2, 5);

            const result1 = step1 * numSteps1;
            const result2 = step2 * numSteps2;

            if (result1 > params.max_value || result2 > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const names = ['Tom', 'Sarah'];
            const [name1, name2] = names;

            const text = `${name1} counts ${numSteps1} times in ${step1}s. ${name2} counts ${numSteps2} times in ${step2}s. Who reaches the larger number?`;

            const answer = result1 > result2 ? name1 : result2 > result1 ? name2 : name1;

            return {
                text: text,
                type: 'multiple_choice',
                options: names,
                answer: answer,
                hint: `${name1}: ${step1} × ${numSteps1}, ${name2}: ${step2} × ${numSteps2}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'add_then_compare': {
            const start = randomInt(100, Math.min(500, params.max_value - 300));
            const add1 = randomChoice([10, 100]);
            const add2 = randomChoice([10, 100]);

            const result = start + add1 + add2;

            if (result > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const compareValue = randomInt(200, params.max_value);
            const isMore = result > compareValue;

            const text = `Start with ${formatNumber(start)}. Add ${add1}, then add ${add2}. Is your answer more or less than ${formatNumber(compareValue)}?`;

            const answer = isMore ? 'more' : 'less';

            return {
                text: text,
                type: 'multiple_choice',
                options: ['more', 'less'],
                answer: answer,
                hint: `${formatNumber(start)} + ${add1} + ${add2} = ${formatNumber(result)}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        case 'combined_operations': {
            const step = randomChoice(params.step_sizes);
            const numSteps = randomInt(2, 4);
            const countResult = step * numSteps;

            const addAmount = randomChoice([10, 100]);
            const finalResult = countResult + addAmount;

            if (finalResult > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const templates = [
                `{name} counts in ${step}s for ${numSteps} steps, then adds ${addAmount}. What number do they reach?`,
                `Start at 0. Count ${numSteps} times in ${step}s. Then add ${addAmount}. What is your total?`,
                `A game starts at 0. You score ${step} points ${numSteps} times, then get a ${addAmount} point bonus. What is your score?`
            ];

            const names = ['Emma', 'Jack', 'Sophie', 'Oliver'];
            const text = randomChoice(templates)
                .replace('{name}', randomChoice(names));

            const distractors = generateDistractors(finalResult, 3, 0, params.max_value);
            const options = shuffle([finalResult, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: finalResult.toString(),
                hint: `First: ${step} × ${numSteps} = ${countResult}, then add ${addAmount}`,
                module: 'N06_Y3_NPV',
                level: level
            };
        }

        default:
            return generateMultiStepProblem(params, level);
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'N06_Y3_NPV',
    generate: generateQuestion
};
