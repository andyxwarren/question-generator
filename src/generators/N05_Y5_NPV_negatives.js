/**
 * Year 5 Negative Numbers in Context Question Generator
 * Schema: V2
 */

import {
    randomChoice,
    randomInt,
    generateSequence,
    getGapPositions
} from './helpers/N01_countingHelpers.js';

function getStartValue(params, step, direction) {
    const { min_value, max_value, sequence_length } = params;
    if (direction === 'forwards') return randomInt(min_value, max_value - (step * (sequence_length - 1)));
    else return randomInt(min_value + (step * (sequence_length - 1)), max_value);
}

export function generateQuestion(params, level) {
    const { math, presentation } = params;
    const flatParams = {
        step_sizes: math.sequence.steps,
        sequence_length: math.sequence.length,
        directions: math.sequence.directions,
        startStrategy: math.sequence.startStrategy,
        gaps_count: presentation.gaps.count,
        gap_position: presentation.gaps.position,
        min_value: math.range.min,
        max_value: math.range.max,
        temperature_range: math.range.temp,
        elevation_range: math.range.elevation
    };

    const contextType = randomChoice(presentation.contexts);

    if (contextType === 'temperature') return generateTemperatureQuestion(flatParams, level);
    else if (contextType === 'elevation' && flatParams.elevation_range) return generateElevationQuestion(flatParams, level);
    else return generateSequenceQuestion(flatParams, level);
}

function generateTemperatureQuestion(params, level) {
    const [tempMin, tempMax] = params.temperature_range;
    const type = randomChoice(['change', 'sequence']);

    if (type === 'change') {
        const start = randomInt(tempMin, tempMax);
        const change = randomInt(5, 20);
        const dir = randomChoice(['rise', 'fall']);
        const end = dir === 'rise' ? start + change : start - change;
        if (end < -50 || end > 50) return generateTemperatureQuestion(params, level);
        const text = dir === 'rise' ? `Temp is ${start}°C. Rises by ${change}°C. New temp?` : `Temp is ${start}°C. Falls by ${change}°C. New temp?`;
        return { text: text, type: 'text_input', answer: end.toString(), hint: `${dir === 'rise' ? 'Add' : 'Subtract'} ${change} from ${start}`, module: 'N05_Y5_NPV', level: level };
    } else {
        const step = randomChoice([1, 2, 5]);
        const dir = randomChoice(['forwards', 'backwards']);
        const len = randomInt(4, 6);
        const start = dir === 'forwards' ? randomInt(tempMin, tempMax - (step*len)) : randomInt(tempMin + (step*len), tempMax);
        const seq = generateSequence(start, step, len, dir);
        const shown = seq.slice(0, -1);
        const ans = seq[seq.length - 1];
        const changeWord = dir === 'forwards' ? 'rising' : 'falling';
        return { text: `Temp ${changeWord} by ${step}°C/hr. Readings: ${shown.join('°C, ')}°C, ___°C. Missing temp?`, type: 'text_input', answer: ans.toString(), hint: `Count ${dir} in ${step}s`, module: 'N05_Y5_NPV', level: level };
    }
}

function generateElevationQuestion(params, level) {
    const [min, max] = params.elevation_range;
    const scenarios = [{ c: 'sea level', u: 'm' }, { c: 'ground level', u: 'm' }, { c: 'floor level', u: '' }];
    const sc = randomChoice(scenarios);
    const start = randomInt(min, max);
    const change = randomInt(10, 50);
    const dir = randomChoice(['up', 'down']);
    const end = dir === 'up' ? start + change : start - change;
    if (end < min || end > max) return generateElevationQuestion(params, level);

    const startDesc = start === 0 ? sc.c : start > 0 ? `${start}${sc.u} above` : `${Math.abs(start)}${sc.u} below`;
    const text = `Diver at ${startDesc}. Moves ${dir} ${change}${sc.u}. Where now?`;
    return { text: text, type: 'text_input', answer: end.toString(), hint: `${dir === 'up' ? 'Add' : 'Subtract'} ${change}`, module: 'N05_Y5_NPV', level: level };
}

function generateSequenceQuestion(params, level) {
    const step = randomChoice(params.step_sizes);
    const dir = randomChoice(params.directions);
    const start = getStartValue(params, step, dir);
    const seq = generateSequence(start, step, params.sequence_length, dir);

    // Simple gaps logic
    const gaps = getGapPositions(params.sequence_length, params.gaps_count, params.gap_position === 'end' ? 'middle' : params.gap_position);
    const display = seq.map((n, i) => gaps.includes(i) ? '___' : n);
    const ans = gaps.map(i => seq[i]);
    return { text: `Fill missing: ${display.join(', ')}`, type: 'text_input', answer: ans.join(','), answers: ans, hint: `Count ${dir} in ${step}s`, module: 'N05_Y5_NPV', level: level };
}

export default {
    moduleId: 'N05_Y5_NPV',
    generate: generateQuestion
};