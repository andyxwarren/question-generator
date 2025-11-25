/**
 * Year 5 Properties of Number Generator
 * Schema: V2
 */
import { randomInt, randomChoice, shuffle, generateDistractors } from './helpers/N02_numberHelpers.js';
import { getFactorPairs, getMultiplesUpTo, isPrime } from './helpers/C01_C03_calculationHelpers.js';

export function generateQuestion(params, level) {
    const { operations, math } = params;
    const operation = randomChoice(operations);
    
    // Flatten relevant params for specific functions
    const flatParams = {
        multiple_bases: math.multiples.bases,
        multiple_range: math.multiples.range,
        factor_numbers: math.factors.targetStr || math.factors.targets,
        prime_recall_range: math.primes.recallRange,
        prime_identify_range: math.primes.identifyRange,
        square_bases: math.powers.squareBases,
        cube_bases: math.powers.cubeBases,
        power_range: math.powers.range,
        include_prime_factorization: math.primes.factorization
    };

    switch(operation) {
        case 'identify_multiples': return generateIdentifyMultiples(flatParams, level);
        case 'find_factor_pairs': return generateFindFactorPairs(flatParams, level);
        case 'identify_primes': return generateIdentifyPrimes(flatParams, level);
        case 'squares_cubes': return generateSquaresCubes(flatParams, level);
        case 'prime_factors': return generatePrimeFactors(flatParams, level);
        default: return generateIdentifyMultiples(flatParams, level);
    }
}

function generateIdentifyMultiples(params, level) {
    const base = randomChoice(params.multiple_bases);
    const type = randomChoice(['is_multiple', 'which_is']);
    
    if (type === 'is_multiple') {
        const isMult = Math.random() < 0.5;
        const mult = isMult ? base * randomInt(2, 10) : (base * randomInt(2, 10)) + 1;
        return {
            text: `Is ${mult} a multiple of ${base}?`,
            type: 'multiple_choice',
            options: ['Yes', 'No'],
            answer: isMult ? 'Yes' : 'No',
            hint: `Count in ${base}s`,
            module: 'C05_Y5_CALC',
            level
        };
    }
    const ans = base * randomInt(2, 10);
    const opts = shuffle([ans, ans+1, ans-1, ans+2]);
    return { text: `Which is a multiple of ${base}?`, type: 'multiple_choice', options: opts, answer: ans.toString(), hint: `Divisible by ${base}`, module: 'C05_Y5_CALC', level };
}

function generateFindFactorPairs(params, level) {
    let num;
    if (typeof params.factor_numbers === 'string') {
        num = randomInt(4, 50);
    } else {
        num = randomChoice(params.factor_numbers);
    }
    const pairs = getFactorPairs(num);
    const pair = randomChoice(pairs);
    const known = pair[0];
    const unknown = pair[1];
    
    return {
        text: `Complete factor pair: ${known} × ___ = ${num}`,
        type: 'text_input',
        answer: unknown.toString(),
        hint: `${num} ÷ ${known}`,
        module: 'C05_Y5_CALC',
        level
    };
}

function generateIdentifyPrimes(params, level) {
    const num = randomInt(params.prime_identify_range[0], params.prime_identify_range[1]);
    const ans = isPrime(num) ? 'Yes' : 'No';
    return { text: `Is ${num} prime?`, type: 'multiple_choice', options: ['Yes', 'No'], answer: ans, hint: `Factors of ${num}`, module: 'C05_Y5_CALC', level };
}

function generateSquaresCubes(params, level) {
    const type = randomChoice(['square', 'cube']);
    const base = type === 'square' ? randomChoice(params.square_bases) : randomChoice(params.cube_bases);
    const ans = type === 'square' ? base * base : base * base * base;
    const symbol = type === 'square' ? '²' : '³';
    return { text: `What is ${base}${symbol}?`, type: 'text_input', answer: ans.toString(), hint: `${base} × ${base}${type==='cube' ? ' × '+base : ''}`, module: 'C05_Y5_CALC', level };
}

function generatePrimeFactors(params, level) {
    // Simplified for example
    const num = randomChoice([12, 18, 20, 30]);
    return { text: `Is 3 a prime factor of ${num}?`, type: 'multiple_choice', options: ['Yes', 'No'], answer: num%3===0 ? 'Yes' : 'No', hint: `Check division`, module: 'C05_Y5_CALC', level };
}

export default { moduleId: 'C05_Y5_CALC', generate: generateQuestion };