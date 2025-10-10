/**
 * Answer Validator
 *
 * Validates student answers against correct answers
 * Handles different answer formats and provides feedback
 */

/**
 * Normalize answer for comparison
 * @param {string} answer - Answer to normalize
 * @returns {string} Normalized answer
 */
function normalizeAnswer(answer) {
    return String(answer)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '');
}

/**
 * Check if two numbers are approximately equal
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {number} tolerance - Allowed difference
 * @returns {boolean} True if approximately equal
 */
function approximatelyEqual(a, b, tolerance = 0.01) {
    return Math.abs(a - b) <= tolerance;
}

/**
 * Validate a student's answer
 * @param {Object} question - Question object with answer
 * @param {string} studentAnswer - Student's submitted answer
 * @returns {Object} Validation result { isCorrect, feedback, normalizedAnswer }
 */
export function validate(question, studentAnswer) {
    const correctAnswer = normalizeAnswer(question.answer);
    const submittedAnswer = normalizeAnswer(studentAnswer);

    // Empty answer check
    if (!submittedAnswer) {
        return {
            isCorrect: false,
            feedback: 'Please provide an answer',
            normalizedAnswer: submittedAnswer
        };
    }

    // Exact match
    if (submittedAnswer === correctAnswer) {
        return {
            isCorrect: true,
            feedback: 'Correct!',
            normalizedAnswer: submittedAnswer
        };
    }

    // Try numeric comparison (handles decimal precision issues)
    const numSubmitted = parseFloat(studentAnswer);
    const numCorrect = parseFloat(question.answer);

    if (!isNaN(numSubmitted) && !isNaN(numCorrect)) {
        if (approximatelyEqual(numSubmitted, numCorrect)) {
            return {
                isCorrect: true,
                feedback: 'Correct!',
                normalizedAnswer: submittedAnswer
            };
        }
    }

    // Not correct
    return {
        isCorrect: false,
        feedback: `Not quite. The correct answer is ${question.answer}`,
        normalizedAnswer: submittedAnswer,
        correctAnswer: question.answer
    };
}

/**
 * Validate multiple choice answer
 * @param {Object} question - Question object
 * @param {string} selectedOption - Selected option
 * @returns {Object} Validation result
 */
export function validateMultipleChoice(question, selectedOption) {
    return validate(question, selectedOption);
}

/**
 * Validate text input answer
 * @param {Object} question - Question object
 * @param {string} textInput - Text input value
 * @returns {Object} Validation result
 */
export function validateTextInput(question, textInput) {
    return validate(question, textInput);
}

/**
 * Check if answer is partially correct (for multi-part questions)
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {Object} Partial validation result
 */
export function validatePartial(question, studentAnswer) {
    const result = validate(question, studentAnswer);

    // Could add partial credit logic here in future
    // For now, it's either correct or incorrect

    return {
        ...result,
        partialCredit: result.isCorrect ? 1.0 : 0.0
    };
}

/**
 * Validate answer and return simple boolean
 * @param {Object} question - Question object
 * @param {string} studentAnswer - Student's answer
 * @returns {boolean} True if correct
 */
export function isCorrect(question, studentAnswer) {
    return validate(question, studentAnswer).isCorrect;
}

export default {
    validate,
    validateMultipleChoice,
    validateTextInput,
    validatePartial,
    isCorrect
};
