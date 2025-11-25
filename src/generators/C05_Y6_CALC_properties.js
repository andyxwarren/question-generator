/**
 * Year 6 Common Factors/Multiples Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { getCommonFactors, getLCM, getGCF } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    // Flatten for helpers
    const flatParams = {
        common_factor_range: math.commonFactors ? math.commonFactors.range : [10, 50],
        common_multiple_range: math.commonMultiples ? math.commonMultiples.range : [2, 10],
        prime_range: math.primes ? math.primes.range : [1, 50]
    };

    switch(operation) {
        case 'common_factors': return generateCommonFactors(flatParams, level);
        case 'common_multiples': return generateCommonMultiples(flatParams, level);
        default: return generateCommonFactors(flatParams, level);
    }
}

function generateCommonFactors(params, level) {
    const n1 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
    const n2 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
    const factors = getCommonFactors(n1, n2);
    const ans = factors.length;
    const distractors = [ans+1, ans-1, ans+2].filter(d=>d>0);
    
    return {
        text: `How many common factors do ${n1} and ${n2} have?`,
        type: 'multiple_choice',
        options: shuffle([ans, ...distractors]),
        answer: ans.toString(),
        hint: `List factors of both`,
        module: 'C05_Y6_CALC',
        level
    };
}

function generateCommonMultiples(params, level) {
    const n1 = randomInt(2, 10);
    const n2 = randomInt(2, 10);
    const ans = getLCM(n1, n2);
    const distractors = [ans*2, ans+n1, ans-n1].filter(d=>d>0 && d!==ans);
    
    return {
        text: `What is the Lowest Common Multiple (LCM) of ${n1} and ${n2}?`,
        type: 'multiple_choice',
        options: shuffle([ans, ...distractors]),
        answer: ans.toString(),
        hint: `List multiples`,
        module: 'C05_Y6_CALC',
        level
    };
}

export default { moduleId: 'C05_Y6_CALC', generate: generateQuestion };