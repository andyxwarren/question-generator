/**
 * Year 4 Counting Through Zero Question Generator
 * Schema: V2
 */

import {
    randomChoice,
    randomInt,
    generateSequence,
    getGapPositions
} from './helpers/N01_countingHelpers.js';

function getPositiveStart(params, step) {
    const minStart = step * Math.ceil(params.sequence_length / 2);
    const maxPossibleStart = Math.min(params.max_value, step * params.sequence_length);
    return randomInt(minStart, maxPossibleStart);
}

function sequenceCrossesZero(sequence) {
    return sequence.some(n => n > 0) && sequence.some(n => n < 0);
}

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    // Flat params for helper logic
    const flatParams = {
        step_sizes: math.sequence.steps,
        sequence_length: math.sequence.length,
        gaps_count: presentation.gaps.count,
        gap_position: presentation.gaps.position,
        min_value: math.range.min,
        max_value: math.range.max,
        must_cross_zero: math.mustCrossZero
    };

    const step = randomChoice(flatParams.step_sizes);
    const direction = 'backwards';
    const questionTypes = ['fill_blanks', 'next_number', 'multiple_choice'];
    const questionType = randomChoice(questionTypes);

    let start = getPositiveStart(flatParams, step);
    if (questionType === 'fill_blanks') start = Math.floor(start / (step * 2)) * (step * 2);
    else if (questionType === 'next_number') start = Math.floor(start / (step * 2)) * (step * 2) + step;

    const minPossibleStart = Math.abs(flatParams.min_value) + (step * (flatParams.sequence_length - 1));
    start = Math.max(start, minPossibleStart);

    let fullSequence = generateSequence(start, step, flatParams.sequence_length, direction);
    if (!sequenceCrossesZero(fullSequence)) {
        start = step * Math.ceil(flatParams.sequence_length / 2) + step;
        fullSequence = generateSequence(start, step, flatParams.sequence_length, direction);
    }

    return generateQuestionByType(questionType, fullSequence, flatParams, step, level);
}

function generateQuestionByType(type, fullSequence, params, step, level) {
    if (type === 'fill_blanks') {
        let effectiveGapPosition = params.gap_position === 'end' ? 'middle' : params.gap_position;
        let gapPositions = getGapPositions(params.sequence_length, params.gaps_count, effectiveGapPosition);
        gapPositions = gapPositions.map(pos => pos === params.sequence_length - 1 ? Math.floor(params.sequence_length / 2) : pos);
        const displaySequence = fullSequence.map((num, idx) => gapPositions.includes(idx) ? '___' : num.toString());
        const answers = gapPositions.map(pos => fullSequence[pos]);
        return { text: `Fill in missing: ${displaySequence.join(', ')}`, type: 'text_input', answer: answers.join(','), answers: answers, hint: `Count backwards in ${step}s through zero`, module: 'N05_Y4_NPV', level: level };
    }
    if (type === 'next_number') {
        const shown = fullSequence.slice(0, -1);
        const answer = fullSequence[fullSequence.length - 1];
        return { text: `Next number? ${shown.join(', ')}, ___`, type: 'text_input', answer: answer.toString(), hint: `Count backwards through zero`, module: 'N05_Y4_NPV', level: level };
    }
    if (type === 'multiple_choice') {
        const shown = fullSequence.slice(0, -1);
        const ans = fullSequence[fullSequence.length - 1];
        const distractors = [ans - step, ans + step, Math.abs(ans), -Math.abs(ans) - 1].filter(d => d !== ans);
        const uniqueDistractors = [...new Set(distractors)].slice(0, 3);
        const options = [ans, ...uniqueDistractors].sort(() => Math.random() - 0.5);
        return { text: `Continue pattern: ${shown.join(', ')}, ___`, type: 'multiple_choice', options: options, answer: ans.toString(), hint: `Count backwards through zero`, module: 'N05_Y4_NPV', level: level };
    }
}

export default {
    moduleId: 'N05_Y4_NPV',
    generate: generateQuestion
};