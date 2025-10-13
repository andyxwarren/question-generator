/**
 * Counting Question Generator
 *
 * Generates questions for counting sequences and patterns
 */

/**
 * Helper: Choose random item from array
 * @param {Array} array - Array to choose from
 * @returns {*} Random item
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper: Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled copy
 */
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Generate counting sequence question
 * @param {Object} params - Parameters for the current level
 * @param {number} level - Difficulty level (1-4)
 * @returns {Object} Question object
 */
export function generateCountingQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const direction = randomChoice(params.directions);
    const maxVal = params.max_value;

    // Generate starting value
    let start = Math.floor(Math.random() * (maxVal / 2));
    start = Math.floor(start / step) * step;

    // Ensure sequence doesn't go negative for backwards counting
    if (direction === 'backwards' && start < step * 6) {
        start = step * 6;
    }

    // Generate sequence
    const sequenceLength = 6;
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        const value = direction === 'forwards'
            ? start + (i * step)
            : start - (i * step);
        sequence.push(value);
    }

    // Choose question type
    const questionTypes = ['fill_blank', 'multiple_choice', 'next_number'];
    const type = randomChoice(questionTypes);

    if (type === 'multiple_choice') {
        // "What comes next?"
        const correctAnswer = sequence[4];
        const options = shuffle([
            correctAnswer,
            correctAnswer + step,
            correctAnswer - step,
            correctAnswer + (2 * step)
        ]);

        return {
            text: `What comes next? ${sequence.slice(0, 4).join(', ')}, ...`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'N01_Y1_NPV',
            level: level
        };
    } else if (type === 'next_number') {
        // Similar to multiple choice but asking for next number explicitly
        const correctAnswer = sequence[4];
        const options = shuffle([
            correctAnswer,
            correctAnswer + step,
            correctAnswer - step,
            correctAnswer + step + 1
        ]);

        return {
            text: `Continue the pattern: ${sequence.slice(0, 4).join(', ')}, ?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            module: 'N01_Y1_NPV',
            level: level
        };
    } else {
        // fill_blank: Show sequence with gap in the middle
        const display = [...sequence.slice(0, 5)];
        const gapIndex = 2 + Math.floor(Math.random() * 2); // Gap at position 2 or 3
        const correctAnswer = display[gapIndex];
        display[gapIndex] = '___';

        return {
            text: `Fill in the missing number: ${display.join(', ')}`,
            type: 'text_input',
            answer: correctAnswer.toString(),
            hint: `The pattern counts ${direction} in ${step}s`,
            module: 'N01_Y1_NPV',
            level: level
        };
    }
}

/**
 * Register this generator
 */
export default {
    moduleId: 'N01_Y1_NPV',
    generate: generateCountingQuestion
};
