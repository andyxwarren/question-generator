/**
 * Year 4 Problem-Solving Generator (TWO-STEP TRANSITION)
 *
 * Module: C04_Y4_CALC - "Solve addition and subtraction two-step problems in contexts,
 * deciding which operations and methods to use and why"
 *
 * This generator represents the CRITICAL PEDAGOGICAL TRANSITION from one-step to two-step reasoning.
 *
 * Key features:
 * - TWO-STEP problems requiring combining information before final calculation
 * - Strategic distractors targeting two-step misconceptions
 * - Meaningful contexts (not arbitrary operation chaining)
 * - Decision-making emphasis (which operations to use)
 * - Adaptive question types (L1-2 multiple choice, L3-4 text input)
 */

import { randomChoice, shuffle, randomInt } from './helpers/N02_numberHelpers.js';
import {
    generateCombineThenRemove,
    generateRemoveThenAdd,
    generateTwoAdditions,
    generateTwoSubtractions,
    generateTwoStepDistractors
} from './helpers/C04_problemHelpers.js';
import { generateAddition, generateSubtraction } from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'combine_then_remove':
            return generateCombineThenRemoveQuestion(params, level);
        case 'remove_then_add':
            return generateRemoveThenAddQuestion(params, level);
        case 'two_additions':
            return generateTwoAdditionsQuestion(params, level);
        case 'two_subtractions':
            return generateTwoSubtractionsQuestion(params, level);
        case 'compare_then_adjust':
            return generateCompareThenAdjustQuestion(params, level);
        case 'two_step_with_distractor':
            return generateTwoStepWithDistractorQuestion(params, level);
        case 'two_step_missing_number':
            return generateTwoStepMissingNumberQuestion(params, level);
        case 'approaching_three_step':
            return generateApproachingThreeStepQuestion(params, level);
        default:
            return generateCombineThenRemoveQuestion(params, level);
    }
}

/**
 * OPERATION 1: Combine Then Remove
 * Example: "Shop has 45 red + 38 blue balloons. 27 are sold. How many left?"
 * This is a GENUINE two-step: must combine before subtracting
 */
function generateCombineThenRemoveQuestion(params, level) {
    const problem = generateCombineThenRemove(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateTwoStepDistractors(problem.answer, problem);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Remove Then Add
 * Example: "Library has 156 books. 42 borrowed. Then 28 new books arrive. How many now?"
 */
function generateRemoveThenAddQuestion(params, level) {
    const problem = generateRemoveThenAdd(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateTwoStepDistractors(problem.answer, problem);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Two Additions (Level 2+)
 * Example: "Class 1 has 28, Class 2 has 32, Class 3 has 25. Total?"
 */
function generateTwoAdditionsQuestion(params, level) {
    const problem = generateTwoAdditions(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateTwoStepDistractors(problem.answer, problem);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Two Subtractions (Level 2+)
 * Example: "Farmer has 240 eggs. Sells 85 Monday, 63 Tuesday. How many left?"
 */
function generateTwoSubtractionsQuestion(params, level) {
    const problem = generateTwoSubtractions(params.number_range[0], params.max_value, params);

    const useMultipleChoice = params.question_format === 'multiple_choice';

    if (useMultipleChoice) {
        const distractors = generateTwoStepDistractors(problem.answer, problem);
        const options = shuffle([problem.answer, ...distractors]);

        return {
            text: problem.text,
            type: 'multiple_choice',
            options: options,
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: problem.text,
            type: 'text_input',
            answer: problem.answer.toString(),
            hint: problem.working,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 5: Compare Then Adjust (Level 3+)
 * Example: "Emma has 45 stickers. Noah has 38. Emma gives Noah 10. How many does Emma have now?"
 * Tests understanding that Noah's initial amount is context, not part of calculation
 */
function generateCompareThenAdjustQuestion(params, level) {
    const emmaStart = randomInt(params.number_range[0] + 20, params.max_value);
    const noahStart = randomInt(params.number_range[0] + 10, emmaStart - 5);
    const giveAway = randomInt(5, Math.floor(emmaStart * 0.3));
    const emmaFinal = emmaStart - giveAway;

    const text = `Emma has ${emmaStart} stickers. Noah has ${noahStart} stickers. Emma gives Noah ${giveAway} stickers. How many stickers does Emma have now?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    // Create problem data for distractor generation
    const problemData = {
        operation: 'compare_then_adjust',
        values: { emmaStart, noahStart, giveAway, emmaFinal },
        step1: { operation: 'subtract', values: [emmaStart, giveAway], result: emmaFinal }
    };

    if (useMultipleChoice) {
        // Strategic distractors for this type
        const distractors = new Set();

        // Distractor 1: Used Noah's amount (common error)
        const wrongWithNoah = noahStart + giveAway;
        if (wrongWithNoah !== emmaFinal && wrongWithNoah > 0) distractors.add(wrongWithNoah);

        // Distractor 2: Emma + Noah - giveAway (wrong interpretation)
        const wrongCombine = emmaStart + noahStart - giveAway;
        if (wrongCombine !== emmaFinal && wrongCombine > 0 && wrongCombine <= params.max_value) distractors.add(wrongCombine);

        // Distractor 3: Off-by-one or calculation error
        if (emmaFinal + 1 > 0) distractors.add(emmaFinal + 1);
        if (emmaFinal - 1 > 0) distractors.add(emmaFinal - 1);

        // Ensure we have exactly 3 distractors
        while (distractors.size < 3) {
            const d = randomInt(Math.max(0, emmaFinal - 20), emmaFinal + 20);
            if (d !== emmaFinal && d > 0) distractors.add(d);
        }

        const options = shuffle([emmaFinal, ...Array.from(distractors).slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: emmaFinal.toString(),
            hint: `${emmaStart} - ${giveAway} = ${emmaFinal}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: emmaFinal.toString(),
            hint: `${emmaStart} - ${giveAway} = ${emmaFinal}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 6: Two-Step With Distractor (Level 3+)
 * Includes irrelevant information to test problem-solving skills
 */
function generateTwoStepWithDistractorQuestion(params, level) {
    const start = randomInt(params.number_range[0] + 30, params.max_value);
    const delivered = randomInt(Math.floor(start * 0.2), Math.floor(start * 0.5));
    const sold = randomInt(Math.floor(start * 0.2), Math.floor(start * 0.4));
    const remainingInWarehouse = randomInt(50, 200); // DISTRACTOR - not needed

    const total = start + delivered;
    const finalAnswer = total - sold;

    const text = `A shop has ${start} items. ${delivered} items are delivered. The warehouse has ${remainingInWarehouse} items. The shop sells ${sold} items. How many items does the shop have now?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    const problemData = {
        operation: 'two_step_with_distractor',
        values: { start, delivered, sold, remainingInWarehouse, total, finalAnswer },
        step1: { operation: 'add', values: [start, delivered], result: total },
        step2: { operation: 'subtract', values: [total, sold], result: finalAnswer }
    };

    if (useMultipleChoice) {
        const distractors = new Set();

        // Distractor 1: Only first step
        distractors.add(total);

        // Distractor 2: Used distractor number
        const withDistractor = start + delivered + remainingInWarehouse - sold;
        if (withDistractor !== finalAnswer && withDistractor > 0 && withDistractor <= params.max_value) {
            distractors.add(withDistractor);
        }

        // Distractor 3: Wrong operation in step 2
        const wrongOp = total + sold;
        if (wrongOp !== finalAnswer && wrongOp > 0 && wrongOp <= params.max_value) {
            distractors.add(wrongOp);
        }

        // Fill remaining
        while (distractors.size < 3) {
            const d = randomInt(Math.max(0, finalAnswer - 30), finalAnswer + 30);
            if (d !== finalAnswer && d > 0) distractors.add(d);
        }

        const options = shuffle([finalAnswer, ...Array.from(distractors).slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: finalAnswer.toString(),
            hint: `(${start} + ${delivered}) - ${sold} = ${total} - ${sold} = ${finalAnswer}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: finalAnswer.toString(),
            hint: `(${start} + ${delivered}) - ${sold} = ${total} - ${sold} = ${finalAnswer}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 7: Two-Step Missing Number (Level 4 only)
 * Missing value in two-step context - very challenging
 */
function generateTwoStepMissingNumberQuestion(params, level) {
    const start = randomInt(params.number_range[0] + 50, params.max_value - 100);
    const sold = randomInt(Math.floor(start * 0.2), Math.floor(start * 0.5)); // This is the unknown
    const delivered = randomInt(20, 50);
    const finalAnswer = start - sold + delivered;

    const text = `A shop has ${start} items. Some items are sold. Then ${delivered} new items arrive. Now there are ${finalAnswer} items. How many items were sold?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    // Working backwards: finalAnswer = start - sold + delivered
    // So: sold = start + delivered - finalAnswer
    const correctAnswer = start + delivered - finalAnswer;

    const problemData = {
        operation: 'two_step_missing',
        values: { start, delivered, finalAnswer, sold: correctAnswer }
    };

    if (useMultipleChoice) {
        const distractors = new Set();

        // Distractor 1: Just subtracted (didn't account for delivered)
        const wrong1 = start - finalAnswer;
        if (wrong1 !== correctAnswer && wrong1 > 0) distractors.add(wrong1);

        // Distractor 2: Added instead of subtracted
        const wrong2 = finalAnswer - start - delivered;
        if (wrong2 !== correctAnswer && wrong2 > 0) distractors.add(Math.abs(wrong2));

        // Fill remaining
        const errorAmounts = [correctAnswer + 5, correctAnswer - 5, correctAnswer + 10, correctAnswer - 10];
        for (const val of errorAmounts) {
            if (val !== correctAnswer && val > 0 && distractors.size < 3) {
                distractors.add(val);
            }
        }

        while (distractors.size < 3) {
            const d = randomInt(Math.max(1, correctAnswer - 20), correctAnswer + 20);
            if (d !== correctAnswer && d > 0) distractors.add(d);
        }

        const options = shuffle([correctAnswer, ...Array.from(distractors).slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `${start} - ? + ${delivered} = ${finalAnswer}, so ? = ${correctAnswer}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: correctAnswer.toString(),
            hint: `${start} - ? + ${delivered} = ${finalAnswer}, so ? = ${correctAnswer}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 8: Approaching Three-Step (Level 4 only)
 * Very complex two-step that approaches three-step reasoning (prep for Y5)
 */
function generateApproachingThreeStepQuestion(params, level) {
    // Create a complex two-step that requires significant planning

    const classA = randomInt(20, 35);
    const classB = randomInt(20, 35);
    const totalStudents = classA + classB;
    const absent = randomInt(Math.floor(totalStudents * 0.1), Math.floor(totalStudents * 0.25));
    const present = totalStudents - absent;

    const text = `A school has 2 classes. Class A has ${classA} students and Class B has ${classB} students. Today, ${absent} students are absent. How many students are present?`;

    const useMultipleChoice = params.question_format === 'multiple_choice';

    const problemData = {
        operation: 'approaching_three_step',
        values: { classA, classB, totalStudents, absent, present },
        step1: { operation: 'add', values: [classA, classB], result: totalStudents },
        step2: { operation: 'subtract', values: [totalStudents, absent], result: present }
    };

    if (useMultipleChoice) {
        const distractors = new Set();

        // Distractor 1: Only first step
        distractors.add(totalStudents);

        // Distractor 2: Only used one class
        const wrong1 = classA - absent;
        if (wrong1 > 0 && wrong1 !== present) distractors.add(wrong1);

        // Distractor 3: Wrong operation
        const wrong2 = totalStudents + absent;
        if (wrong2 !== present && wrong2 > 0 && wrong2 <= params.max_value) {
            distractors.add(wrong2);
        }

        // Fill remaining
        while (distractors.size < 3) {
            const d = randomInt(Math.max(0, present - 15), present + 15);
            if (d !== present && d > 0) distractors.add(d);
        }

        const options = shuffle([present, ...Array.from(distractors).slice(0, 3)]);

        return {
            text: text,
            type: 'multiple_choice',
            options: options,
            answer: present.toString(),
            hint: `(${classA} + ${classB}) - ${absent} = ${totalStudents} - ${absent} = ${present}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    } else {
        return {
            text: text,
            type: 'text_input',
            answer: present.toString(),
            hint: `(${classA} + ${classB}) - ${absent} = ${totalStudents} - ${absent} = ${present}`,
            module: 'C04_Y4_CALC',
            level: level
        };
    }
}

export default {
    moduleId: 'C04_Y4_CALC',
    generate: generateQuestion
};
