/**
 * Year 6 Intervals Across Zero Question Generator
 *
 * Generates questions about calculating intervals across zero based on UK National Curriculum
 * Module: N05_Y6_NPV - "Use negative numbers in context, and calculate intervals across zero"
 */

import { randomChoice, randomInt } from './helpers/N01_countingHelpers.js';

/**
 * Calculate interval between two numbers (always positive)
 */
function calculateInterval(num1, num2) {
    return Math.abs(num2 - num1);
}

/**
 * Generate simple interval calculation question
 */
function generateSimpleIntervalQuestion(params, level) {
    const { min_value, max_value, must_cross_zero } = params;

    let num1, num2;

    if (must_cross_zero) {
        // Ensure one positive and one negative
        num1 = randomInt(min_value, -1);
        num2 = randomInt(1, max_value);
    } else {
        // Can be any two numbers
        num1 = randomInt(min_value, max_value);
        num2 = randomInt(min_value, max_value);

        // Ensure they're different
        while (num1 === num2) {
            num2 = randomInt(min_value, max_value);
        }
    }

    const interval = calculateInterval(num1, num2);

    const questionVariations = [
        `What is the difference between ${num1} and ${num2}?`,
        `Calculate the interval between ${num1} and ${num2}.`,
        `How far apart are ${num1} and ${num2}?`,
        `Find the distance from ${num1} to ${num2}.`
    ];

    const text = randomChoice(questionVariations);

    return {
        text: text,
        type: 'text_input',
        answer: interval.toString(),
        hint: 'Find the difference by calculating how many steps from one number to the other',
        module: 'N05_Y6_NPV',
        level: level
    };
}

/**
 * Generate temperature difference question
 */
function generateTemperatureQuestion(params, level) {
    const { temperature_range } = params;
    const [tempMin, tempMax] = temperature_range;

    const type = randomChoice(['difference', 'multi_step']);

    if (type === 'difference') {
        // Simple temperature difference
        const temp1 = randomInt(tempMin, tempMax);
        const temp2 = randomInt(tempMin, tempMax);

        // Ensure different temps
        if (temp1 === temp2) {
            return generateTemperatureQuestion(params, level);
        }

        const difference = Math.abs(temp2 - temp1);

        const scenarios = [
            `The temperature at midnight was ${temp1}°C. At noon it was ${temp2}°C. What was the temperature change?`,
            `Yesterday's temperature was ${temp1}°C. Today it is ${temp2}°C. What is the difference in temperature?`,
            `The temperature in London is ${temp1}°C. In Moscow it is ${temp2}°C. What is the temperature difference?`,
            `A freezer is set to ${temp1}°C. Room temperature is ${temp2}°C. What is the temperature difference?`
        ];

        return {
            text: randomChoice(scenarios),
            type: 'text_input',
            answer: difference.toString(),
            hint: `Calculate the difference between ${temp1} and ${temp2}`,
            module: 'N05_Y6_NPV',
            level: level
        };
    } else {
        // Multi-step: temperature changes multiple times
        const start = randomInt(tempMin + 10, tempMax - 10);
        const change1 = randomInt(5, 15);
        const change2 = randomInt(5, 15);
        const direction1 = randomChoice(['rise', 'fall']);
        const direction2 = randomChoice(['rise', 'fall']);

        const afterFirst = direction1 === 'rise' ? start + change1 : start - change1;
        const final = direction2 === 'rise' ? afterFirst + change2 : afterFirst - change2;

        // Ensure result is reasonable
        if (final < tempMin || final > tempMax) {
            return generateTemperatureQuestion(params, level);
        }

        const text = `The temperature starts at ${start}°C. It ${direction1}s by ${change1}°C, then ${direction2}s by ${change2}°C. What is the final temperature?`;

        return {
            text: text,
            type: 'text_input',
            answer: final.toString(),
            hint: `Start at ${start}, then apply each change step by step`,
            module: 'N05_Y6_NPV',
            level: level
        };
    }
}

/**
 * Generate elevation/depth context question
 */
function generateElevationQuestion(params, level) {
    const { elevation_range } = params;
    const [elevMin, elevMax] = elevation_range;

    const scenarios = [
        {
            context: 'A submarine is at {depth}m. It rises to {final}m. How far did it travel?',
            type: 'vertical_distance'
        },
        {
            context: 'A cave is {depth}m below ground. A mountain peak is {final}m above ground. What is the total vertical distance?',
            type: 'vertical_distance'
        },
        {
            context: 'A diver starts at {depth}m depth. They swim to {final}m. How far did they travel vertically?',
            type: 'vertical_distance'
        },
        {
            context: 'The basement is {depth}m below ground. The roof is {final}m above ground. What is the building height?',
            type: 'vertical_distance'
        }
    ];

    const scenario = randomChoice(scenarios);

    // Generate two elevations
    const depth = randomInt(elevMin, -1); // Negative (below reference)
    const final = randomInt(1, elevMax);  // Positive (above reference)

    const distance = calculateInterval(depth, final);

    const text = scenario.context
        .replace('{depth}', depth.toString())
        .replace('{final}', final.toString());

    return {
        text: text,
        type: 'text_input',
        answer: distance.toString(),
        hint: `Calculate the total distance from ${depth}m to ${final}m`,
        module: 'N05_Y6_NPV',
        level: level
    };
}

/**
 * Generate number line distance question
 */
function generateNumberLineQuestion(params, level) {
    const { min_value, max_value } = params;

    const num1 = randomInt(min_value, max_value);
    const num2 = randomInt(min_value, max_value);

    // Ensure different
    if (num1 === num2) {
        return generateNumberLineQuestion(params, level);
    }

    const distance = calculateInterval(num1, num2);

    const [lower, upper] = num1 < num2 ? [num1, num2] : [num2, num1];

    const text = `On a number line, what is the distance between ${lower} and ${upper}?`;

    return {
        text: text,
        type: 'text_input',
        answer: distance.toString(),
        hint: `Count how many steps from ${lower} to ${upper}`,
        module: 'N05_Y6_NPV',
        level: level
    };
}

/**
 * Generate word problem with intervals
 */
function generateWordProblem(params, level) {
    const { min_value, max_value } = params;

    const problems = [
        {
            text: 'A lift is on floor {floor1}. It travels to floor {floor2}. How many floors did it travel?',
            range: [Math.max(min_value, -10), Math.min(max_value, 20)]
        },
        {
            text: 'An account has £{amount1}. After a payment, it has £{amount2}. What was the change?',
            range: [Math.max(min_value, -100), Math.min(max_value, 100)]
        },
        {
            text: 'A tide chart shows {tide1}m at low tide and {tide2}m at high tide. What is the tidal range?',
            range: [Math.max(min_value, -5), Math.min(max_value, 10)]
        }
    ];

    const problem = randomChoice(problems);
    const [rangeMin, rangeMax] = problem.range;

    const num1 = randomInt(rangeMin, rangeMax);
    const num2 = randomInt(rangeMin, rangeMax);

    // Ensure different
    if (num1 === num2) {
        return generateWordProblem(params, level);
    }

    const answer = calculateInterval(num1, num2);

    const text = problem.text
        .replace('{floor1}', num1.toString())
        .replace('{floor2}', num2.toString())
        .replace('{amount1}', num1.toString())
        .replace('{amount2}', num2.toString())
        .replace('{tide1}', num1.toString())
        .replace('{tide2}', num2.toString());

    return {
        text: text,
        type: 'text_input',
        answer: answer.toString(),
        hint: `Find the difference between ${num1} and ${num2}`,
        module: 'N05_Y6_NPV',
        level: level
    };
}

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    const intervalType = randomChoice(params.interval_types);
    const contextType = randomChoice(params.context_types);

    // For simple intervals, use the context type to determine question
    if (intervalType === 'simple') {
        if (contextType === 'temperature') {
            return generateTemperatureQuestion(params, level);
        } else if (contextType === 'elevation') {
            return generateElevationQuestion(params, level);
        } else if (contextType === 'number_line') {
            return generateNumberLineQuestion(params, level);
        } else {
            return generateSimpleIntervalQuestion(params, level);
        }
    }

    // For multi-step, use temperature context (most suitable)
    if (intervalType === 'multi_step') {
        return generateTemperatureQuestion(params, level);
    }

    // For word problems, use dedicated word problem generator
    if (intervalType === 'word_problem') {
        return generateWordProblem(params, level);
    }

    // Fallback
    return generateSimpleIntervalQuestion(params, level);
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N05_Y6_NPV',
    generate: generateQuestion
};
