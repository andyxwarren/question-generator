/**
 * Year 5 Negative Numbers in Context Question Generator
 *
 * Generates questions about negative numbers in context based on UK National Curriculum
 * Module: N05_Y5_NPV - "Interpret negative numbers in context, count forwards and backwards
 * with positive and negative whole numbers, including through zero"
 */

import {
    randomChoice,
    randomInt,
    generateSequence,
    getGapPositions
} from './helpers/N01_countingHelpers.js';

/**
 * Get starting value for sequences that may or may not cross zero
 */
function getStartValue(params, step, direction) {
    const { min_value, max_value, sequence_length } = params;

    if (direction === 'forwards') {
        // For forwards: leave room to complete sequence
        const maxStart = max_value - (step * (sequence_length - 1));
        return randomInt(min_value, maxStart);
    } else {
        // For backwards: start high enough to complete sequence
        const minStart = min_value + (step * (sequence_length - 1));
        return randomInt(minStart, max_value);
    }
}

/**
 * Generate temperature context question
 */
function generateTemperatureQuestion(params, level) {
    const { temperature_range } = params;
    const [tempMin, tempMax] = temperature_range;

    const questionTypes = ['change', 'sequence'];
    const type = randomChoice(questionTypes);

    if (type === 'change') {
        // Temperature change question
        const start = randomInt(tempMin, tempMax);
        const changeAmount = randomInt(5, 20);
        const changeDirection = randomChoice(['rise', 'fall']);

        const end = changeDirection === 'rise'
            ? start + changeAmount
            : start - changeAmount;

        // Ensure result is reasonable
        if (end < -50 || end > 50) {
            return generateTemperatureQuestion(params, level); // Retry
        }

        const text = changeDirection === 'rise'
            ? `The temperature is ${start}°C. It rises by ${changeAmount}°C. What is the new temperature?`
            : `The temperature is ${start}°C. It falls by ${changeAmount}°C. What is the new temperature?`;

        return {
            text: text,
            type: 'text_input',
            answer: end.toString(),
            hint: `${changeDirection === 'rise' ? 'Add' : 'Subtract'} ${changeAmount} ${changeDirection === 'rise' ? 'to' : 'from'} ${start}`,
            module: 'N05_Y5_NPV',
            level: level
        };
    } else {
        // Temperature sequence question
        const step = randomChoice([1, 2, 5]);
        const direction = randomChoice(['forwards', 'backwards']);
        const sequenceLength = randomInt(4, 6);

        const start = direction === 'forwards'
            ? randomInt(tempMin, tempMax - (step * sequenceLength))
            : randomInt(tempMin + (step * sequenceLength), tempMax);

        const sequence = generateSequence(start, step, sequenceLength, direction);
        const shown = sequence.slice(0, -1);
        const answer = sequence[sequence.length - 1];

        const changeWord = direction === 'forwards' ? 'rising' : 'falling';

        return {
            text: `The temperature is ${changeWord} by ${step}°C each hour. The readings are: ${shown.join('°C, ')}°C, ___°C. What is the missing temperature?`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Count ${direction} in ${step}s from ${start}`,
            module: 'N05_Y5_NPV',
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
        { context: 'sea level', unit: 'm' },
        { context: 'ground level', unit: 'm' },
        { context: 'floor level', unit: '' }
    ];

    const scenario = randomChoice(scenarios);
    const start = randomInt(elevMin, elevMax);
    const change = randomInt(10, 50);
    const direction = randomChoice(['up', 'down']);

    const end = direction === 'up' ? start + change : start - change;

    // Ensure result is within bounds
    if (end < elevMin || end > elevMax) {
        return generateElevationQuestion(params, level); // Retry
    }

    const startDesc = start === 0 ? scenario.context
        : start > 0 ? `${start}${scenario.unit} above ${scenario.context}`
        : `${Math.abs(start)}${scenario.unit} below ${scenario.context}`;

    const text = direction === 'up'
        ? `A diver is at ${startDesc}. They move up ${change}${scenario.unit}. Where are they now relative to ${scenario.context}?`
        : `A diver is at ${startDesc}. They move down ${change}${scenario.unit}. Where are they now relative to ${scenario.context}?`;

    let answerText;
    if (end === 0) {
        answerText = '0';
    } else if (end > 0) {
        answerText = end.toString();
    } else {
        answerText = end.toString();
    }

    return {
        text: text,
        type: 'text_input',
        answer: answerText,
        hint: `Start at ${start}, then ${direction === 'up' ? 'add' : 'subtract'} ${change}`,
        module: 'N05_Y5_NPV',
        level: level
    };
}

/**
 * Generate counting sequence question
 */
function generateSequenceQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const { sequence_length, gaps_count, gap_position } = params;

    // Choose question subtype
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

    // Get starting value
    const start = getStartValue(params, step, direction);

    // Generate full sequence
    const fullSequence = generateSequence(start, step, sequence_length, direction);

    if (questionType === 'fill_blanks') {
        // Force internal gaps
        let effectiveGapPosition = gap_position;
        if (gap_position === 'end') {
            effectiveGapPosition = 'middle';
        }

        let gapPositions = getGapPositions(sequence_length, gaps_count, effectiveGapPosition);

        // Ensure no gaps at the end
        gapPositions = gapPositions.map(pos =>
            pos === sequence_length - 1 ? Math.floor(sequence_length / 2) : pos
        );

        const displaySequence = fullSequence.map((num, idx) =>
            gapPositions.includes(idx) ? '___' : num.toString()
        );

        const answers = gapPositions.map(pos => fullSequence[pos]);

        return {
            text: `Fill in the missing number${gaps_count > 1 ? 's' : ''}: ${displaySequence.join(', ')}`,
            type: 'text_input',
            answer: answers.join(','),
            answers: answers,
            hint: `Count ${direction} in ${step}s`,
            module: 'N05_Y5_NPV',
            level: level
        };
    }

    if (questionType === 'next_number') {
        const shown = fullSequence.slice(0, -1);
        const answer = fullSequence[fullSequence.length - 1];

        return {
            text: `What number comes next? ${shown.join(', ')}, ___`,
            type: 'text_input',
            answer: answer.toString(),
            hint: `Count ${direction} in ${step}s`,
            module: 'N05_Y5_NPV',
            level: level
        };
    }

    if (questionType === 'multiple_choice') {
        const shown = fullSequence.slice(0, -1);
        const correctAnswer = fullSequence[fullSequence.length - 1];

        const distractors = [
            correctAnswer + step,
            correctAnswer - step,
            correctAnswer + 1,
            correctAnswer - 1,
            Math.abs(correctAnswer),
            -Math.abs(correctAnswer)
        ];

        const uniqueDistractors = [...new Set(distractors)]
            .filter(d => d !== correctAnswer)
            .slice(0, 3);

        const options = [correctAnswer, ...uniqueDistractors]
            .sort(() => Math.random() - 0.5);

        return {
            text: `Continue the pattern: ${shown.join(', ')}, ___`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Count ${direction} in ${step}s`,
            module: 'N05_Y5_NPV',
            level: level
        };
    }
}

/**
 * Generate question
 */
export function generateQuestion(params, level) {
    const contextType = randomChoice(params.context_types);

    if (contextType === 'temperature') {
        return generateTemperatureQuestion(params, level);
    } else if (contextType === 'elevation' && params.elevation_range) {
        return generateElevationQuestion(params, level);
    } else {
        return generateSequenceQuestion(params, level);
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N05_Y5_NPV',
    generate: generateQuestion
};
