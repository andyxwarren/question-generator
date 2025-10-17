/**
 * Year 2 Number Problems Generator
 *
 * Module: N06_Y2_NPV - "Use place value and number facts to solve problems"
 *
 * This synthesis module combines concepts from:
 * - N01: Counting in steps (2, 3, 5, 10)
 * - N02: Compare and order numbers to 100
 * - N03: Place value (tens and ones)
 * - N04: Number line representation
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    formatNumber,
    numberToWord,
    generateDistractors,
    getComparisonSymbol,
    generateUniqueNumbers
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
        case 'number_line_problems':
            return generateNumberLineProblem(params, level);
        case 'multi_step_problems':
            return generateMultiStepProblem(params, level);
        default:
            return generateCountingProblem(params, level);
    }
}

/**
 * OPERATION 1: Counting Problems
 * Apply skip counting to solve real-world problems
 */
function generateCountingProblem(params, level) {
    const step = randomChoice(params.step_sizes);
    const numSteps = randomInt(2, Math.min(params.max_steps, 6));
    const answer = step * numSteps;

    // Ensure answer is within range
    if (answer > params.max_value) {
        return generateCountingProblem(params, level);
    }

    const contexts = {
        simple: [
            { text: `{name} has {numSteps} bags with {step} sweets in each bag. How many sweets altogether?`, type: 'groups' },
            { text: `{name} counts in {step}s. They count {numSteps} times. What number do they reach?`, type: 'counting' },
            { text: `There are {numSteps} boxes with {step} pencils in each box. How many pencils in total?`, type: 'groups' }
        ],
        varied: [
            { text: `{name} skips {numSteps} times, moving {step} cm each skip. How far did they travel?`, type: 'measurement' },
            { text: `A toy costs {step}p. How much do {numSteps} toys cost?`, type: 'money' },
            { text: `{name} plants {numSteps} rows of flowers with {step} flowers in each row. How many flowers?`, type: 'groups' }
        ],
        mixed: [
            { text: `Every {step} minutes, {name} reads 1 page. After {numSteps} pages, how many minutes have passed?`, type: 'time' },
            { text: `{name} collects stickers. Each pack has {step} stickers. They buy {numSteps} packs. How many stickers?`, type: 'groups' }
        ]
    };

    const contextType = randomChoice(params.contexts || ['simple']);
    const availableContexts = contexts[contextType] || contexts.simple;
    const template = randomChoice(availableContexts);

    const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason'];
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
        module: 'N06_Y2_NPV',
        level: level
    };
}

/**
 * OPERATION 2: Place Value Problems
 * Use tens and ones understanding to solve problems
 */
function generatePlaceValueProblem(params, level) {
    const problemTypes = [
        'compose_from_parts',
        'decompose_to_parts',
        'add_tens',
        'compare_place_value'
    ];

    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'compose_from_parts': {
            const number = randomInt(10, Math.min(99, params.max_value));
            const tens = Math.floor(number / 10);
            const ones = number % 10;

            const templates = [
                `A number has {tens} tens and {ones} ones. What is the number?`,
                `What number is made from {tens} tens and {ones} ones?`,
                `{name} makes a number with {tens} tens and {ones} ones. What number did they make?`
            ];

            const names = ['Tom', 'Lucy', 'Jake', 'Maya', 'Sam', 'Zara'];
            const text = randomChoice(templates)
                .replace('{tens}', tens)
                .replace('{ones}', ones)
                .replace('{name}', randomChoice(names));

            const distractors = generateDistractors(number, 3, 10, params.max_value);
            const options = shuffle([number, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: number.toString(),
                hint: `${tens} tens = ${tens * 10}, plus ${ones} ones`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'decompose_to_parts': {
            const number = randomInt(10, Math.min(99, params.max_value));
            const tens = Math.floor(number / 10);
            const ones = number % 10;

            const askForTens = Math.random() < 0.5;
            const answer = askForTens ? tens : ones;

            const text = askForTens
                ? `How many tens are in ${formatNumber(number)}?`
                : `How many ones are in ${formatNumber(number)}?`;

            const distractors = generateDistractors(answer, 3, 0, 9);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Think about the place value of each digit`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'add_tens': {
            const start = randomInt(1, Math.min(50, params.max_value - 30));
            const tensToAdd = randomInt(1, 3) * 10;
            const answer = start + tensToAdd;

            const templates = [
                `What is {tensToAdd} more than {start}?`,
                `{name} has {start} stickers. They get {tensToAdd} more. How many now?`,
                `Start at {start}. Add {tensToAdd}. What number do you get?`
            ];

            const names = ['Ben', 'Mia', 'Leo', 'Ella', 'Max', 'Ruby'];
            const text = randomChoice(templates)
                .replace('{start}', start)
                .replace('{tensToAdd}', tensToAdd)
                .replace('{name}', randomChoice(names));

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Add the tens: ${start} + ${tensToAdd}`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'compare_place_value': {
            const num1 = randomInt(10, Math.min(99, params.max_value));
            const num2 = randomInt(10, Math.min(99, params.max_value));

            if (num1 === num2) {
                return generatePlaceValueProblem(params, level);
            }

            const larger = Math.max(num1, num2);
            const smaller = Math.min(num1, num2);

            const templates = [
                `{name} scored {num1} points. {name2} scored {num2} points. Who scored more points?`,
                `One book has {num1} pages. Another has {num2} pages. Which book is longer?`
            ];

            const names = ['Alice', 'Charlie', 'Daisy', 'Finn', 'Grace', 'Harry'];
            const name = randomChoice(names);
            let name2 = randomChoice(names.filter(n => n !== name));

            const template = randomChoice(templates);
            const text = template
                .replace('{num1}', formatNumber(num1))
                .replace('{num2}', formatNumber(num2))
                .replace('{name}', name)
                .replace('{name2}', name2);

            // Answer should be the name or descriptive text
            const answer = num1 > num2 ? (template.includes('book') ? 'first' : name) : (template.includes('book') ? 'second' : name2);
            const wrongAnswer = num1 > num2 ? (template.includes('book') ? 'second' : name2) : (template.includes('book') ? 'first' : name);

            return {
                text: text,
                type: 'multiple_choice',
                options: [answer, wrongAnswer],
                answer: answer,
                hint: `Compare ${num1} and ${num2}`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        default:
            return generatePlaceValueProblem(params, level);
    }
}

/**
 * OPERATION 3: Comparison Problems
 * Compare and order numbers in context
 */
function generateComparisonProblem(params, level) {
    const problemTypes = ['who_has_more', 'order_by_size', 'use_symbols', 'difference'];
    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'who_has_more': {
            const num1 = randomInt(10, params.max_value);
            const num2 = randomInt(10, params.max_value);

            if (num1 === num2) {
                return generateComparisonProblem(params, level);
            }

            const names = ['Lily', 'Oscar', 'Isla', 'Jack', 'Freya', 'George'];
            const name1 = randomChoice(names);
            const name2 = randomChoice(names.filter(n => n !== name1));

            const items = ['stickers', 'marbles', 'coins', 'cards', 'buttons', 'shells'];
            const item = randomChoice(items);

            const text = `${name1} has ${formatNumber(num1)} ${item}. ${name2} has ${formatNumber(num2)} ${item}. Who has more ${item}?`;

            const answer = num1 > num2 ? name1 : name2;
            const options = [name1, name2];

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer,
                hint: `Which is larger: ${num1} or ${num2}?`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'order_by_size': {
            const count = level === 1 ? 2 : 3;
            const numbers = generateUniqueNumbers(count, 10, params.max_value);
            const sorted = [...numbers].sort((a, b) => a - b);

            const names = ['Amy', 'Ben', 'Chloe', 'Dan', 'Eva', 'Finn'];
            const selectedNames = names.slice(0, count);

            const items = ['points', 'stickers', 'stars', 'tokens'];
            const item = randomChoice(items);

            let text = ``;
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
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'use_symbols': {
            const num1 = randomInt(10, params.max_value);
            const num2 = randomInt(10, params.max_value);

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
                hint: `Is ${num1} ${symbolWords[symbol]} ${num2}?`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'difference': {
            const larger = randomInt(20, params.max_value);
            const difference = randomInt(5, Math.min(15, larger - 10));
            const smaller = larger - difference;

            const names = ['Tom', 'Sarah', 'Jake', 'Emma'];
            const name1 = randomChoice(names);
            const name2 = randomChoice(names.filter(n => n !== name1));

            const text = `${name1} has ${formatNumber(larger)} marbles. ${name2} has ${formatNumber(smaller)} marbles. How many more does ${name1} have?`;

            const distractors = generateDistractors(difference, 3, 1, 30);
            const options = shuffle([difference, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: difference.toString(),
                hint: `Find the difference: ${larger} - ${smaller}`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        default:
            return generateComparisonProblem(params, level);
    }
}

/**
 * OPERATION 4: Number Line Problems
 * Use number line reasoning to solve problems
 */
function generateNumberLineProblem(params, level) {
    const problemTypes = ['halfway_between', 'jumps_on_line', 'position_on_line', 'estimate_position'];
    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'halfway_between': {
            const start = randomInt(0, params.max_value - 20);
            const gap = randomInt(4, 10) * 2; // Even gap for whole number midpoint
            const end = start + gap;
            const answer = (start + end) / 2;

            const text = `What number is exactly halfway between ${formatNumber(start)} and ${formatNumber(end)}?`;

            const distractors = generateDistractors(answer, 3, start, end);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Find the middle number`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'jumps_on_line': {
            const start = randomInt(0, params.max_value - 30);
            const jumpSize = randomChoice([5, 10]);
            const numJumps = randomInt(2, 4);
            const answer = start + (jumpSize * numJumps);

            if (answer > params.max_value) {
                return generateNumberLineProblem(params, level);
            }

            const text = `Start at ${formatNumber(start)}. Jump forwards ${numJumps} times in steps of ${jumpSize}. Where do you land?`;

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Each jump is ${jumpSize}`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'position_on_line': {
            const base = randomInt(0, 9) * 10; // 0, 10, 20, ... 90
            const position = base + randomInt(1, 9);

            const text = `A number is between ${formatNumber(base)} and ${formatNumber(base + 10)}. It has ${position % 10} ones. What is the number?`;

            const distractors = [];
            for (let i = 1; i <= 3; i++) {
                const dist = base + randomInt(1, 9);
                if (dist !== position && !distractors.includes(dist)) {
                    distractors.push(dist);
                }
            }

            const options = shuffle([position, ...distractors.slice(0, 3)]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: position.toString(),
                hint: `Count the ones from ${base}`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'estimate_position': {
            const lowerBound = randomInt(0, 8) * 10;
            const upperBound = lowerBound + 10;
            const target = randomInt(lowerBound + 2, upperBound - 2);

            const options = [
                lowerBound,
                Math.floor((lowerBound + upperBound) / 2),
                upperBound,
                target
            ];

            const text = `Which number is closest to ${formatNumber(target)} on a number line?`;

            return {
                text: text,
                type: 'multiple_choice',
                options: shuffle(options),
                answer: target.toString(),
                hint: `Look for the exact match`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        default:
            return generateNumberLineProblem(params, level);
    }
}

/**
 * OPERATION 5: Multi-Step Problems
 * Combine multiple concepts (counting, place value, comparison)
 */
function generateMultiStepProblem(params, level) {
    const problemTypes = ['count_then_compare', 'place_value_then_add', 'count_backwards', 'combined'];
    const problemType = randomChoice(problemTypes);

    switch(problemType) {
        case 'count_then_compare': {
            const step = randomChoice([2, 5, 10]);
            const numSteps = randomInt(3, 5);
            const result = step * numSteps;

            if (result > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const compareValue = result + randomInt(-10, 10);
            const isMore = result > compareValue;

            const names = ['Alex', 'Bella', 'Chris', 'Dana'];
            const name = randomChoice(names);

            const text = `${name} counts in ${step}s and counts ${numSteps} times. Is the result more or less than ${formatNumber(compareValue)}?`;

            const answer = isMore ? 'more' : 'less';

            return {
                text: text,
                type: 'multiple_choice',
                options: ['more', 'less'],
                answer: answer,
                hint: `First find: ${step} × ${numSteps}`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'place_value_then_add': {
            const number = randomInt(10, Math.min(50, params.max_value - 30));
            const tens = Math.floor(number / 10);
            const addAmount = randomInt(1, 3) * 10;
            const answer = number + addAmount;

            const text = `A number has ${tens} tens and ${number % 10} ones. Add ${addAmount} to this number. What is the result?`;

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `First make the number, then add ${addAmount}`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'count_backwards': {
            const start = randomInt(30, params.max_value);
            const step = randomChoice([2, 5, 10]);
            const numSteps = randomInt(2, Math.min(4, Math.floor(start / step)));
            const answer = start - (step * numSteps);

            const text = `Start at ${formatNumber(start)}. Count backwards in ${step}s, ${numSteps} times. What number do you reach?`;

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `Subtract ${step} each time`,
                module: 'N06_Y2_NPV',
                level: level
            };
        }

        case 'combined': {
            const start = randomInt(10, 40);
            const jumpSize = randomChoice([5, 10]);
            const numJumps = randomInt(2, 3);
            const intermediate = start + (jumpSize * numJumps);
            const finalAdd = randomInt(1, 9);
            const answer = intermediate + finalAdd;

            if (answer > params.max_value) {
                return generateMultiStepProblem(params, level);
            }

            const text = `Start at ${formatNumber(start)}. Count forwards ${numJumps} times in steps of ${jumpSize}. Then add ${finalAdd}. What number do you get?`;

            const distractors = generateDistractors(answer, 3, 0, params.max_value);
            const options = shuffle([answer, ...distractors]);

            return {
                text: text,
                type: 'multiple_choice',
                options: options,
                answer: answer.toString(),
                hint: `First: ${start} + (${jumpSize} × ${numJumps}), then add ${finalAdd}`,
                module: 'N06_Y2_NPV',
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
    moduleId: 'N06_Y2_NPV',
    generate: generateQuestion
};
