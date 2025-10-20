/**
 * Year 6 Common Factors, Multiples and Primes Generator
 *
 * Module: C05_Y6_CALC - "Identify common factors, common multiples and prime numbers"
 *
 * This generator focuses on:
 * - Finding common factors of two (or more) numbers
 * - Finding highest common factor (HCF/GCF)
 * - Finding common multiples of two (or more) numbers
 * - Finding lowest common multiple (LCM)
 * - Identifying prime numbers (extension beyond Year 5)
 * - Integrating multiple concepts in problem-solving questions
 */

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors
} from './helpers/N02_numberHelpers.js';

import {
    isPrime,
    getPrimesUpTo,
    getFactors,
    getCommonFactors,
    getGCF,
    getLCM,
    getMultiplesUpTo,
    getCommonMultiples
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'common_factors':
            return generateCommonFactors(params, level);
        case 'common_multiples':
            return generateCommonMultiples(params, level);
        case 'identify_primes':
            return generateIdentifyPrimes(params, level);
        case 'integrated':
            return generateIntegrated(params, level);
        default:
            return generateCommonFactors(params, level);
    }
}

/**
 * OPERATION 1: Common Factors
 * Find factors shared between two or more numbers
 */
function generateCommonFactors(params, level) {
    let numbers = [];

    if (params.common_factor_pairs) {
        // Use predefined pairs
        const pair = randomChoice(params.common_factor_pairs);
        numbers = [pair[0], pair[1]];
    } else if (params.include_three_numbers && Math.random() < 0.6) {
        // Generate three numbers (60% chance when enabled)
        for (let i = 0; i < 3; i++) {
            numbers.push(randomInt(params.common_factor_range[0], params.common_factor_range[1]));
        }
    } else if (params.include_four_numbers && Math.random() < 0.3) {
        // Generate four numbers (30% chance when enabled, Level 4 only)
        for (let i = 0; i < 4; i++) {
            numbers.push(randomInt(params.common_factor_range[0], params.common_factor_range[1]));
        }
    } else {
        // Generate two numbers
        const num1 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
        let num2 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
        while (num2 === num1) {
            num2 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
        }
        numbers = [num1, num2];
    }

    // Find common factors
    let commonFactors = getCommonFactors(numbers[0], numbers[1]);
    for (let i = 2; i < numbers.length; i++) {
        const factorsI = getFactors(numbers[i]);
        commonFactors = commonFactors.filter(f => factorsI.includes(f));
    }

    const questionType = randomChoice(['list_common', 'is_common_factor', 'how_many', 'find_hcf']);

    if (questionType === 'list_common' && numbers.length === 2) {
        // "Which numbers are common factors of X and Y?"
        const correctFactors = commonFactors.filter(f => f > 1);

        if (correctFactors.length === 0) {
            // Coprime - only 1 is common
            return {
                text: `${numbers[0]} and ${numbers[1]} have no common factors except 1. What does this tell you about these numbers?`,
                type: 'multiple_choice',
                options: shuffle(['They are coprime', 'They are both prime', 'They are multiples', 'They are equal']),
                answer: 'They are coprime',
                hint: `Numbers with only 1 as a common factor are called coprime`,
                module: 'C05_Y6_CALC',
                level: level
            };
        }

        const correctAnswer = randomChoice(correctFactors);

        // Generate distractors - factors of one but not both
        const factors1 = getFactors(numbers[0]);
        const factors2 = getFactors(numbers[1]);
        const notCommon1 = factors1.filter(f => !factors2.includes(f) && f > 1);
        const notCommon2 = factors2.filter(f => !factors1.includes(f) && f > 1);
        const allNotCommon = [...notCommon1, ...notCommon2];

        const distractors = [];
        while (distractors.length < 3 && allNotCommon.length > 0) {
            const distractor = randomChoice(allNotCommon);
            if (!distractors.includes(distractor)) {
                distractors.push(distractor);
                allNotCommon.splice(allNotCommon.indexOf(distractor), 1);
            }
        }

        // Fill remaining with random numbers
        while (distractors.length < 3) {
            const distractor = randomInt(2, Math.max(...numbers));
            if (!distractors.includes(distractor) && distractor !== correctAnswer) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([correctAnswer, ...distractors.slice(0, 3)]);

        return {
            text: `Which number is a common factor of ${numbers.join(' and ')}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Find all factors of each number, then look for matches`,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else if (questionType === 'is_common_factor') {
        // "Is X a common factor of A and B?"
        const isCommon = Math.random() < 0.6;  // 60% yes, 40% no

        let factor;
        if (isCommon && commonFactors.filter(f => f > 1).length > 0) {
            factor = randomChoice(commonFactors.filter(f => f > 1));
        } else {
            // Find a factor of one but not all
            const allFactors = numbers.flatMap(n => getFactors(n));
            const notCommon = allFactors.filter(f => !commonFactors.includes(f) && f > 1);

            if (notCommon.length > 0) {
                factor = randomChoice(notCommon);
            } else {
                // Use a random number
                factor = randomInt(2, Math.max(...numbers));
            }
        }

        const answer = commonFactors.includes(factor) ? 'Yes' : 'No';
        const options = shuffle(['Yes', 'No']);

        return {
            text: `Is ${factor} a common factor of ${numbers.join(', ')}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: `Check if ${factor} divides into all the numbers`,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else if (questionType === 'how_many') {
        // "How many common factors do X and Y have?"
        const answer = commonFactors.length;

        const distractors = [answer - 1, answer + 1, answer + 2].filter(d => d > 0);
        while (distractors.length < 3) {
            const d = randomInt(1, answer + 3);
            if (!distractors.includes(d) && d !== answer) {
                distractors.push(d);
            }
        }

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `How many common factors do ${numbers.join(' and ')} have?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Find all factors of each number, then count how many match`,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else {
        // "What is the HCF of X and Y?"
        let hcf = getGCF(numbers[0], numbers[1]);
        for (let i = 2; i < numbers.length; i++) {
            hcf = getGCF(hcf, numbers[i]);
        }

        const distractors = commonFactors.filter(f => f !== hcf).slice(-2);  // Take largest common factors
        while (distractors.length < 3) {
            const distractor = randomInt(2, Math.min(...numbers));
            if (!distractors.includes(distractor) && distractor !== hcf) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([hcf, ...distractors.slice(0, 3)]);

        return {
            text: `What is the highest common factor (HCF) of ${numbers.join(', ')}?`,
            type: 'multiple_choice',
            options: options,
            answer: hcf.toString(),
            hint: `The HCF is the largest number that divides into all of them`,
            module: 'C05_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Common Multiples
 * Find multiples shared between two or more numbers
 */
function generateCommonMultiples(params, level) {
    let numbers = [];

    if (params.common_multiple_pairs) {
        // Use predefined pairs
        const pair = randomChoice(params.common_multiple_pairs);
        numbers = [pair[0], pair[1]];
    } else if (params.include_three_numbers && Math.random() < 0.5) {
        // Generate three numbers (50% chance when enabled, Level 4 only)
        for (let i = 0; i < 3; i++) {
            numbers.push(randomInt(params.common_multiple_range[0], params.common_multiple_range[1]));
        }
    } else {
        // Generate two numbers
        const num1 = randomInt(params.common_multiple_range[0], params.common_multiple_range[1]);
        let num2 = randomInt(params.common_multiple_range[0], params.common_multiple_range[1]);
        while (num2 === num1) {
            num2 = randomInt(params.common_multiple_range[0], params.common_multiple_range[1]);
        }
        numbers = [num1, num2];
    }

    const questionType = randomChoice(['find_lcm', 'is_common_multiple', 'list_first_n']);

    if (questionType === 'find_lcm') {
        // "What is the lowest common multiple (LCM) of X and Y?"
        let lcm = getLCM(numbers[0], numbers[1]);
        for (let i = 2; i < numbers.length; i++) {
            lcm = getLCM(lcm, numbers[i]);
        }

        // Generate distractors
        const distractors = [
            numbers[0] * numbers[1],  // Product (common error)
            lcm / 2,  // Half LCM
            lcm * 2   // Double LCM
        ].filter(d => d !== lcm && d > 0);

        while (distractors.length < 3) {
            const multiplier = randomChoice(numbers);
            const distractor = multiplier * randomInt(1, 10);
            if (!distractors.includes(distractor) && distractor !== lcm && distractor <= params.multiple_max) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([lcm, ...distractors.slice(0, 3)]);

        return {
            text: `What is the lowest common multiple (LCM) of ${numbers.join(' and ')}?`,
            type: 'multiple_choice',
            options: options,
            answer: lcm.toString(),
            hint: `The LCM is the smallest number that is a multiple of all of them`,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else if (questionType === 'is_common_multiple') {
        // "Is X a common multiple of A and B?"
        const lcm = numbers.length === 2 ? getLCM(numbers[0], numbers[1]) :
                    getLCM(getLCM(numbers[0], numbers[1]), numbers[2]);

        const isCommon = Math.random() < 0.6;  // 60% yes, 40% no

        let multiple;
        if (isCommon) {
            // Use a common multiple
            const multiplier = randomInt(1, Math.floor(params.multiple_max / lcm));
            multiple = lcm * multiplier;
        } else {
            // Use a multiple of one but not all
            const baseNum = randomChoice(numbers);
            multiple = baseNum * randomInt(2, Math.floor(params.multiple_max / baseNum));

            // Ensure it's not actually a common multiple
            let attempts = 0;
            while (numbers.every(n => multiple % n === 0) && attempts < 10) {
                multiple = baseNum * randomInt(2, Math.floor(params.multiple_max / baseNum));
                attempts++;
            }
        }

        const answer = numbers.every(n => multiple % n === 0) ? 'Yes' : 'No';
        const options = shuffle(['Yes', 'No']);

        return {
            text: `Is ${multiple} a common multiple of ${numbers.join(' and ')}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: `Check if ${multiple} is divisible by all of ${numbers.join(', ')}`,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else {
        // "What is the first/second/third common multiple of X and Y?"
        const commonMultiples = getCommonMultiples(numbers[0], numbers[1], params.multiple_max);

        if (commonMultiples.length === 0) {
            // Fall back to LCM if no common multiples in range
            // Add attempt limiter to prevent infinite recursion
            const attempts = params._attempts || 0;
            if (attempts < 3) {
                return generateCommonMultiples({ ...params, questionType: 'find_lcm', _attempts: attempts + 1 }, level);
            } else {
                // After 3 attempts, force LCM question with simpler numbers
                return generateCommonMultiples({
                    ...params,
                    common_multiple_pairs: [[2, 3]],
                    questionType: 'find_lcm',
                    _attempts: 0
                }, level);
            }
        }

        const position = randomInt(0, Math.min(params.multiples_to_find - 1, commonMultiples.length - 1));
        const answer = commonMultiples[position];

        const ordinals = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
        const ordinal = ordinals[position] || `${position + 1}th`;

        // Generate distractors - other common multiples or close numbers
        const distractors = [];
        for (let i = 0; i < commonMultiples.length && distractors.length < 3; i++) {
            if (i !== position) {
                distractors.push(commonMultiples[i]);
            }
        }

        // Fill with nearby multiples if needed
        while (distractors.length < 3) {
            const distractor = answer + randomChoice([-10, -5, 5, 10]);
            if (distractor > 0 && !distractors.includes(distractor) && distractor !== answer) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `What is the ${ordinal} common multiple of ${numbers.join(' and ')}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `List multiples of each number and find the ones that appear in both lists`,
            module: 'C05_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Identify Prime Numbers
 * Extension beyond Year 5 - larger primes
 */
function generateIdentifyPrimes(params, level) {
    const questionType = randomChoice(['is_prime', 'which_is_prime', 'count_primes', 'largest_prime_less_than']);

    if (questionType === 'is_prime') {
        // "Is X prime?"
        const number = randomInt(params.prime_range[0] + 10, params.prime_range[1]);

        const answer = isPrime(number) ? 'Yes' : 'No';
        const options = shuffle(['Yes', 'No']);

        let hint;
        if (isPrime(number)) {
            hint = `${number} has exactly two factors: 1 and ${number}`;
        } else {
            const factors = getFactors(number);
            hint = `${number} has factors: ${factors.slice(0, 4).join(', ')}...`;
        }

        return {
            text: `Is ${number} a prime number?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: hint,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else if (questionType === 'which_is_prime') {
        // "Which of these numbers is prime?"
        const primes = getPrimesUpTo(params.prime_range[1]);
        const primesInRange = primes.filter(p => p >= 20 && p <= params.prime_range[1]);
        const correctAnswer = randomChoice(primesInRange);

        // Generate composite distractors
        const distractors = [];
        while (distractors.length < 3) {
            const distractor = randomInt(20, params.prime_range[1]);
            if (!isPrime(distractor) && !distractors.includes(distractor)) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([correctAnswer, ...distractors]);

        return {
            text: `Which of these numbers is prime?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `A prime number has exactly two factors: 1 and itself`,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else if (questionType === 'count_primes') {
        // "How many prime numbers are between X and Y?"
        const rangeStart = randomInt(params.prime_range[0], params.prime_range[1] - 30);
        const rangeEnd = randomInt(rangeStart + 20, params.prime_range[1]);

        const primes = getPrimesUpTo(rangeEnd).filter(p => p >= rangeStart && p <= rangeEnd);
        const answer = primes.length;

        const distractors = [answer - 1, answer + 1, answer + 2].filter(d => d >= 0);
        while (distractors.length < 3) {
            const d = randomInt(Math.max(0, answer - 3), answer + 3);
            if (!distractors.includes(d) && d !== answer) {
                distractors.push(d);
            }
        }

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `How many prime numbers are there between ${rangeStart} and ${rangeEnd} (inclusive)?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Count the numbers with exactly two factors`,
            module: 'C05_Y6_CALC',
            level: level
        };

    } else {
        // "What is the largest prime number less than X?"
        const limit = randomInt(50, params.prime_range[1]);
        const primes = getPrimesUpTo(limit);
        const answer = primes[primes.length - 1];

        // Generate distractors - nearby primes and composites
        const distractors = [];
        const allPrimes = getPrimesUpTo(params.prime_range[1]);
        const primeIndex = allPrimes.indexOf(answer);

        if (primeIndex > 0) distractors.push(allPrimes[primeIndex - 1]);  // Previous prime
        if (primeIndex < allPrimes.length - 1) distractors.push(allPrimes[primeIndex + 1]);  // Next prime

        // Add a composite near the limit
        let composite = limit - 1;
        while (distractors.length < 3) {
            if (!isPrime(composite) && !distractors.includes(composite) && composite !== answer) {
                distractors.push(composite);
            }
            composite--;
        }

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `What is the largest prime number less than ${limit}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Look for primes working backwards from ${limit}`,
            module: 'C05_Y6_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Integrated
 * Combine multiple concepts (common factors, common multiples, primes)
 */
function generateIntegrated(params, level) {
    const integrations = [];

    // Type 1: Prime numbers and LCM
    const primeLcmIntegration = () => {
        const primes = getPrimesUpTo(20).filter(p => p >= 3 && p <= 13);
        const prime1 = randomChoice(primes);
        const prime2 = randomChoice(primes.filter(p => p !== prime1));
        const lcm = prime1 * prime2;  // For two primes, LCM is their product

        const distractors = [
            prime1 + prime2,  // Sum
            Math.max(prime1, prime2),  // Larger prime
            lcm / 2  // Half the product
        ].filter(d => d !== lcm);

        const options = shuffle([lcm, ...distractors]);

        return {
            text: `${prime1} and ${prime2} are both prime numbers. What is their lowest common multiple (LCM)?`,
            type: 'multiple_choice',
            options: options,
            answer: lcm.toString(),
            hint: `For two prime numbers, the LCM is their product`,
            module: 'C05_Y6_CALC',
            level: level
        };
    };
    integrations.push(primeLcmIntegration);

    // Type 2: Common factor that is prime
    const primeCommonFactorIntegration = () => {
        const primeFactor = randomChoice([2, 3, 5, 7]);
        const multiplier1 = randomInt(2, 10);
        const multiplier2 = randomInt(2, 10);
        const num1 = primeFactor * multiplier1;
        const num2 = primeFactor * multiplier2;

        const commonFactors = getCommonFactors(num1, num2);
        const primeCommonFactors = commonFactors.filter(f => isPrime(f) && f > 1);

        if (primeCommonFactors.length === 0) {
            // Retry with different numbers (with attempt limiter)
            const attempts = params._attempts || 0;
            if (attempts < 3) {
                return generateIntegrated({ ...params, _attempts: attempts + 1 }, level);
            } else {
                // After 3 attempts, fall back to a different integration type
                return generateIntegrated({
                    ...params,
                    _force_type: 'prime_lcm',
                    _attempts: 0
                }, level);
            }
        }

        const answer = randomChoice(primeCommonFactors);

        // Generate distractors - non-prime common factors and prime non-factors
        const distractors = [];
        const nonPrimeCommon = commonFactors.filter(f => !isPrime(f) && f > 1);
        if (nonPrimeCommon.length > 0) distractors.push(randomChoice(nonPrimeCommon));

        // Only add primes that are NOT common factors to avoid multiple correct answers
        const otherPrimes = [2, 3, 5, 7, 11].filter(p => !commonFactors.includes(p));
        distractors.push(...otherPrimes.slice(0, 2));

        while (distractors.length < 3) {
            const d = randomInt(2, 11);
            // Ensure distractor is not a prime common factor (would be a second correct answer)
            if (!distractors.includes(d) && d !== answer && !primeCommonFactors.includes(d)) {
                distractors.push(d);
            }
        }

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `Find a common factor of ${num1} and ${num2} that is also a prime number.`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `First find the common factors, then check which ones are prime (have exactly two factors)`,
            module: 'C05_Y6_CALC',
            level: level
        };
    };
    integrations.push(primeCommonFactorIntegration);

    // Type 3: Square number that is a common multiple
    const squareCommonMultipleIntegration = () => {
            const base = randomChoice([2, 3, 4, 5, 6]);
            const square = base * base;

            // Find two factors of the square that would give the square as LCM
            const factors = getFactors(square).filter(f => f > 1 && f < square);
            const factor1 = randomChoice(factors);
            const factor2 = randomChoice(factors.filter(f => getLCM(f, factor1) === square));

            if (!factor2) {
                // Retry with attempt limiter
                const attempts = params._attempts || 0;
                if (attempts < 3) {
                    return generateIntegrated({ ...params, _attempts: attempts + 1 }, level);
                } else {
                    // After 3 attempts, fall back to simpler integration type
                    return generateIntegrated({
                        ...params,
                        _force_type: 'prime_lcm',
                        _attempts: 0
                    }, level);
                }
            }

            const distractors = [
                square - 1,
                square + 1,
                (base - 1) * (base - 1),
                (base + 1) * (base + 1)
            ].filter(d => d !== square && d > 0);

            const options = shuffle([square, ...distractors.slice(0, 3)]);

            return {
                text: `${factor1} and ${factor2} have a common multiple that is a square number. What is it?`,
                type: 'multiple_choice',
                options: options,
                answer: square.toString(),
                hint: `Find the LCM of ${factor1} and ${factor2}`,
                module: 'C05_Y6_CALC',
                level: level
            };
    };

    if (params.integration_complexity === 'three_four_concepts') {
        integrations.push(squareCommonMultipleIntegration);
    }

    // Select integration type (forced or random)
    let integration;
    if (params._force_type === 'prime_lcm') {
        integration = primeLcmIntegration;
    } else {
        integration = randomChoice(integrations);
    }

    return integration();
}

/**
 * Export generator
 */
export default {
    moduleId: 'C05_Y6_CALC',
    generate: generateQuestion
};
