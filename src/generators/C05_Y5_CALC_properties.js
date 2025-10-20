/**
 * Year 5 Properties of Number Generator
 *
 * Module: C05_Y5_CALC - "Identify multiples and factors, including finding all factor pairs of a number
 *                        and common factors of two numbers; know and use the vocabulary of prime numbers,
 *                        prime factors and composite (non-prime) numbers; establish whether a number up to
 *                        100 is prime and recall prime numbers up to 19; recognise and use square numbers
 *                        and cube numbers, and the notation for squared (²) and cubed (³)"
 *
 * This generator focuses on:
 * - Identifying multiples of given numbers
 * - Finding all factor pairs of a number
 * - Identifying prime numbers (recall up to 19, identify up to 100)
 * - Distinguishing prime vs composite numbers
 * - Recognising and calculating square numbers and cube numbers
 * - Using ² and ³ notation
 * - Finding common factors of two numbers
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
    getFactorPairs,
    getCommonFactors,
    getGCF,
    getMultiplesUpTo,
    isPerfectSquare,
    isPerfectCube,
    getSquaresUpTo,
    getCubesUpTo,
    getPrimeFactors
} from './helpers/C01_C03_calculationHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'identify_multiples':
            return generateIdentifyMultiples(params, level);
        case 'find_factor_pairs':
            return generateFindFactorPairs(params, level);
        case 'identify_primes':
            return generateIdentifyPrimes(params, level);
        case 'squares_cubes':
            return generateSquaresCubes(params, level);
        case 'common_factors':
            return generateCommonFactors(params, level);
        case 'prime_factors':
            return generatePrimeFactors(params, level);
        default:
            return generateIdentifyMultiples(params, level);
    }
}

/**
 * OPERATION 1: Identify Multiples
 * Test understanding of multiples as numbers in a times table
 */
function generateIdentifyMultiples(params, level) {
    const base = randomChoice(params.multiple_bases);
    const questionType = randomChoice(['is_multiple', 'which_is_multiple', 'list_multiples']);

    if (questionType === 'is_multiple') {
        // "Is X a multiple of Y?"
        const isMultiple = Math.random() < 0.6;  // 60% yes, 40% no

        let number;
        if (isMultiple) {
            const multiplier = randomInt(2, Math.floor(params.multiple_range[1] / base));
            number = base * multiplier;
        } else {
            // Generate a non-multiple
            const multiplier = randomInt(2, Math.floor(params.multiple_range[1] / base));
            number = base * multiplier + randomChoice([1, 2, -1, -2]);
            // Ensure it's in range and not accidentally a multiple
            number = Math.max(params.multiple_range[0], Math.min(params.multiple_range[1], number));
            if (number % base === 0) number += 1;
        }

        const answer = number % base === 0 ? 'Yes' : 'No';
        const options = shuffle(['Yes', 'No']);

        return {
            text: `Is ${number} a multiple of ${base}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: `Multiples of ${base} are: ${base}, ${base*2}, ${base*3}, ${base*4}...`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'which_is_multiple') {
        // "Which of these is a multiple of X?"
        const multiplier = randomInt(3, Math.floor(params.multiple_range[1] / base));
        const correctAnswer = base * multiplier;

        // Generate distractors that are NOT multiples
        const distractors = [];
        while (distractors.length < 3) {
            const distractor = correctAnswer + randomChoice([-2, -1, 1, 2, base - 1, base + 1]);
            if (distractor % base !== 0 && distractor > 0 && !distractors.includes(distractor)) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([correctAnswer, ...distractors]);

        return {
            text: `Which of these numbers is a multiple of ${base}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Check which number can be divided by ${base} with no remainder`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else {
        // "How many multiples of X are between A and B?"
        const rangeStart = randomInt(params.multiple_range[0], Math.floor(params.multiple_range[1] / 2));
        const rangeEnd = randomInt(rangeStart + 20, params.multiple_range[1]);

        const multiples = getMultiplesUpTo(base, rangeEnd).filter(m => m >= rangeStart && m <= rangeEnd);
        const answer = multiples.length;

        const distractors = generateDistractors(answer, 3, 0, answer + 5);
        const options = shuffle([answer, ...distractors]);

        return {
            text: `How many multiples of ${base} are there between ${rangeStart} and ${rangeEnd} (inclusive)?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Count: ${multiples.slice(0, 3).join(', ')}...`,
            module: 'C05_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 2: Find Factor Pairs
 * Test systematic finding of all factor pairs of a number
 */
function generateFindFactorPairs(params, level) {
    // Select a number with appropriate number of factor pairs
    let number;
    if (typeof params.factor_numbers === 'string') {
        // 'all_up_to_X' format - parse more robustly
        const match = params.factor_numbers.match(/all_up_to_(\d+)/);
        if (match) {
            const max = parseInt(match[1]);
            number = randomInt(4, max);
        } else {
            // Fallback if format doesn't match
            console.warn(`Unexpected factor_numbers format: ${params.factor_numbers}`);
            number = randomInt(4, 50);
        }
    } else {
        number = randomChoice(params.factor_numbers);
    }

    const factorPairs = getFactorPairs(number);
    const questionType = randomChoice(['complete_pair', 'count_pairs', 'identify_pair']);

    if (questionType === 'complete_pair') {
        // "Complete the factor pair: X × ___ = Y"
        const pair = randomChoice(factorPairs);
        const known = randomChoice(pair);
        const unknown = pair[0] === known ? pair[1] : pair[0];

        const distractors = generateDistractors(unknown, 3, 1, number);
        const options = shuffle([unknown, ...distractors]);

        return {
            text: `Complete the factor pair: ${known} × ___ = ${number}`,
            type: 'multiple_choice',
            options: options,
            answer: unknown.toString(),
            hint: `${number} ÷ ${known} = ?`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'count_pairs') {
        // "How many factor pairs does X have?"
        const answer = factorPairs.length;

        const distractors = [answer - 1, answer + 1, answer + 2].filter(d => d > 0);
        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `How many factor pairs does ${number} have?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Factor pairs are pairs of numbers that multiply to give ${number}`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else {
        // "Which is a factor pair of X?"
        const correctPair = randomChoice(factorPairs);
        const correctAnswer = `${correctPair[0]} and ${correctPair[1]}`;

        // Generate wrong pairs
        const wrongPairs = [];
        const factors = getFactors(number);

        while (wrongPairs.length < 3) {
            const a = randomChoice(factors);
            const b = randomInt(1, number);
            if (a * b !== number && !wrongPairs.includes(`${a} and ${b}`)) {
                wrongPairs.push(`${a} and ${b}`);
            }
        }

        const options = shuffle([correctAnswer, ...wrongPairs]);

        return {
            text: `Which is a factor pair of ${number}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            hint: `A factor pair multiplies to give ${number}`,
            module: 'C05_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 3: Identify Prime Numbers
 * Test prime recognition and recall (up to 19), identification (up to 100)
 */
function generateIdentifyPrimes(params, level) {
    const questionType = randomChoice(['is_prime', 'which_is_prime', 'prime_or_composite', 'recall_primes']);

    if (questionType === 'is_prime') {
        // "Is X prime?"
        const useRecall = Math.random() < 0.4;  // 40% from recall range, 60% from identify range

        let number;
        if (useRecall) {
            number = randomInt(params.prime_recall_range[0], params.prime_recall_range[1]);
        } else {
            number = randomInt(params.prime_identify_range[0], params.prime_identify_range[1]);
        }

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
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'which_is_prime') {
        // "Which of these numbers is prime?"
        const primes = getPrimesUpTo(params.prime_identify_range[1]);
        const primesInRange = primes.filter(p => p >= 5 && p <= params.prime_identify_range[1]);
        const correctAnswer = randomChoice(primesInRange);

        // Generate composite distractors
        const distractors = [];
        while (distractors.length < 3) {
            const distractor = randomInt(4, params.prime_identify_range[1]);
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
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'prime_or_composite' && params.include_composite_label) {
        // "Is X prime or composite?"
        const number = randomInt(4, params.prime_identify_range[1]);
        const answer = isPrime(number) ? 'Prime' : 'Composite';
        const options = shuffle(['Prime', 'Composite']);

        let hint;
        if (isPrime(number)) {
            hint = `${number} is prime - it has exactly two factors`;
        } else {
            hint = `${number} is composite - it has more than two factors`;
        }

        return {
            text: `Is ${number} prime or composite?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: hint,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else {
        // "How many prime numbers are between X and Y?"
        const rangeStart = randomInt(params.prime_recall_range[0], 10);
        const rangeEnd = randomInt(rangeStart + 10, Math.min(30, params.prime_identify_range[1]));

        const primes = getPrimesUpTo(rangeEnd).filter(p => p >= rangeStart && p <= rangeEnd);
        const answer = primes.length;

        const distractors = [answer - 1, answer + 1, answer + 2].filter(d => d >= 0);
        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `How many prime numbers are there between ${rangeStart} and ${rangeEnd} (inclusive)?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Count the numbers with exactly two factors (1 and themselves)`,
            module: 'C05_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 4: Squares and Cubes
 * Test recognition and calculation of square and cube numbers
 */
function generateSquaresCubes(params, level) {
    const questionType = randomChoice(['calculate_square', 'calculate_cube', 'identify_square', 'identify_cube', 'is_square_or_cube']);

    if (questionType === 'calculate_square') {
        // "What is X²?"
        const base = randomChoice(params.square_bases);
        const answer = base * base;

        const distractors = [
            base * 2,  // Common error: doubling instead of squaring
            base * (base - 1),  // Off by one
            base * (base + 1)   // Off by one
        ].filter(d => d !== answer);

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `What is ${base}²?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `${base}² means ${base} × ${base}`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'calculate_cube') {
        // "What is X³?"
        const base = randomChoice(params.cube_bases);
        const answer = base * base * base;

        const distractors = [
            base * 3,  // Common error: tripling instead of cubing
            base * base,  // Square instead of cube
            base * base * (base - 1)  // Off by one
        ].filter(d => d !== answer && d > 0);

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `What is ${base}³?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `${base}³ means ${base} × ${base} × ${base}`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'identify_square') {
        // "Which number is a square number?"
        const squares = getSquaresUpTo(params.power_range[1]);
        const correctAnswer = randomChoice(squares.filter(s => s > 1));

        // Generate non-square distractors
        const distractors = [];
        while (distractors.length < 3) {
            const distractor = randomInt(2, params.power_range[1]);
            if (!isPerfectSquare(distractor) && !distractors.includes(distractor)) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([correctAnswer, ...distractors]);

        return {
            text: `Which of these is a square number?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Square numbers: 1, 4, 9, 16, 25, 36...`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'identify_cube') {
        // "Which number is a cube number?"
        const cubes = getCubesUpTo(params.power_range[1]);
        const correctAnswer = randomChoice(cubes.filter(c => c > 1));

        // Generate non-cube distractors
        const distractors = [];
        while (distractors.length < 3) {
            const distractor = randomInt(2, params.power_range[1]);
            if (!isPerfectCube(distractor) && !distractors.includes(distractor)) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([correctAnswer, ...distractors]);

        return {
            text: `Which of these is a cube number?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Cube numbers: 1, 8, 27, 64, 125...`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else {
        // "Is X a square number, cube number, or neither?"
        const type = randomChoice(['square', 'cube', 'neither']);

        let number, answer;
        if (type === 'square') {
            const squares = getSquaresUpTo(params.power_range[1]);
            // Filter out numbers that are BOTH square and cube (1, 64, 729, 4096, etc.)
            number = randomChoice(squares.filter(s => s > 1 && !isPerfectCube(s)));
            answer = 'Square number';
        } else if (type === 'cube') {
            const cubes = getCubesUpTo(params.power_range[1]);
            // Filter out numbers that are BOTH square and cube (1, 64, 729, 4096, etc.)
            number = randomChoice(cubes.filter(c => c > 1 && !isPerfectSquare(c)));
            answer = 'Cube number';
        } else {
            // Generate a number that's neither
            do {
                number = randomInt(5, params.power_range[1]);
            } while (isPerfectSquare(number) || isPerfectCube(number));
            answer = 'Neither';
        }

        const options = shuffle(['Square number', 'Cube number', 'Neither']);

        return {
            text: `Is ${number} a square number, cube number, or neither?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: answer === 'Square number' ? `${Math.sqrt(number)}² = ${number}` :
                  answer === 'Cube number' ? `${Math.round(Math.cbrt(number))}³ = ${number}` :
                  `${number} cannot be made by squaring or cubing a whole number`,
            module: 'C05_Y5_CALC',
            level: level
        };
    }
}

/**
 * OPERATION 5: Common Factors
 * Find factors that two numbers share
 */
function generateCommonFactors(params, level) {
    let num1, num2;

    if (params.common_factor_pairs) {
        // Use predefined pairs
        const pair = randomChoice(params.common_factor_pairs);
        num1 = pair[0];
        num2 = pair[1];
    } else {
        // Generate random pair
        num1 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
        num2 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
        while (num1 === num2) {
            num2 = randomInt(params.common_factor_range[0], params.common_factor_range[1]);
        }
    }

    const commonFactors = getCommonFactors(num1, num2);
    const questionType = randomChoice(['is_common_factor', 'how_many', 'find_hcf']);

    if (questionType === 'is_common_factor') {
        // "Is X a common factor of A and B?"
        const isCommon = Math.random() < 0.6;  // 60% yes, 40% no

        let factor;
        if (isCommon) {
            factor = randomChoice(commonFactors.filter(f => f > 1));
        } else {
            // Find a factor of one but not the other
            const factors1 = getFactors(num1);
            const factors2 = getFactors(num2);
            const notCommon = factors1.filter(f => !factors2.includes(f) && f > 1);

            if (notCommon.length > 0) {
                factor = randomChoice(notCommon);
            } else {
                // Use a number that's not a factor of either
                factor = randomInt(2, Math.max(num1, num2));
                while (num1 % factor === 0 || num2 % factor === 0) {
                    factor = randomInt(2, Math.max(num1, num2));
                }
            }
        }

        const answer = commonFactors.includes(factor) ? 'Yes' : 'No';
        const options = shuffle(['Yes', 'No']);

        return {
            text: `Is ${factor} a common factor of ${num1} and ${num2}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: `Check if ${factor} divides evenly into both ${num1} and ${num2}`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'how_many') {
        // "How many common factors do X and Y have?"
        const answer = commonFactors.length;

        const distractors = [answer - 1, answer + 1, answer + 2].filter(d => d > 0);
        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `How many common factors do ${num1} and ${num2} have?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `Find all factors of each number, then count how many match`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (params.include_hcf) {
        // "What is the highest common factor (HCF) of X and Y?"
        const answer = getGCF(num1, num2);

        const distractors = commonFactors.filter(f => f !== answer).slice(-2);  // Take largest common factors
        while (distractors.length < 3) {
            const distractor = randomInt(2, Math.min(num1, num2));
            if (!distractors.includes(distractor) && distractor !== answer) {
                distractors.push(distractor);
            }
        }

        const options = shuffle([answer, ...distractors.slice(0, 3)]);

        return {
            text: `What is the highest common factor (HCF) of ${num1} and ${num2}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer.toString(),
            hint: `The HCF is the largest number that divides evenly into both numbers`,
            module: 'C05_Y5_CALC',
            level: level
        };
    } else {
        // Default to is_common_factor if HCF not included
        return generateCommonFactors({ ...params, include_hcf: false }, level);
    }
}

/**
 * OPERATION 6: Prime Factors
 * Identify prime factors and express prime factorization
 */
function generatePrimeFactors(params, level) {
    const questionType = randomChoice(['list_prime_factors', 'is_prime_factor', 'prime_factorization']);

    // Select an appropriate composite number
    const range = params.prime_identify_range || [1, 100];
    let number;
    do {
        number = randomInt(4, Math.min(range[1], 100));
    } while (isPrime(number));

    const primeFactors = getPrimeFactors(number);

    if (questionType === 'list_prime_factors') {
        // "Which number is a prime factor of X?"
        const correctAnswer = randomChoice(primeFactors);

        // Generate distractors - primes that aren't factors and composite factors
        const distractors = [];
        const allFactors = getFactors(number);
        const compositeFactors = allFactors.filter(f => !isPrime(f) && f > 1);
        if (compositeFactors.length > 0) {
            distractors.push(randomChoice(compositeFactors));
        }

        const otherPrimes = [2, 3, 5, 7, 11, 13].filter(p => !primeFactors.includes(p));
        distractors.push(...otherPrimes.slice(0, 2));

        const options = shuffle([correctAnswer, ...distractors.slice(0, 3)]);

        return {
            text: `Which number is a prime factor of ${number}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer.toString(),
            hint: `Prime factors are prime numbers that divide evenly into ${number}`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (questionType === 'is_prime_factor') {
        // "Is X a prime factor of Y?"
        const isPrimeFactor = Math.random() < 0.6;  // 60% yes, 40% no

        let factor;
        if (isPrimeFactor) {
            factor = randomChoice(primeFactors);
        } else {
            // Either a composite factor or a prime that's not a factor
            if (Math.random() < 0.5) {
                // Composite factor
                const allFactors = getFactors(number);
                const compositeFactors = allFactors.filter(f => !isPrime(f) && f > 1);
                if (compositeFactors.length > 0) {
                    factor = randomChoice(compositeFactors);
                } else {
                    // No composite factors, use a prime non-factor
                    const otherPrimes = [2, 3, 5, 7, 11, 13].filter(p => !primeFactors.includes(p));
                    factor = randomChoice(otherPrimes);
                }
            } else {
                // Prime non-factor
                const otherPrimes = [2, 3, 5, 7, 11, 13].filter(p => !primeFactors.includes(p));
                factor = randomChoice(otherPrimes);
            }
        }

        const answer = primeFactors.includes(factor) ? 'Yes' : 'No';
        const options = shuffle(['Yes', 'No']);

        return {
            text: `Is ${factor} a prime factor of ${number}?`,
            type: 'multiple_choice',
            options: options,
            answer: answer,
            hint: `Check if ${factor} is prime AND divides evenly into ${number}`,
            module: 'C05_Y5_CALC',
            level: level
        };

    } else if (params.include_prime_factorization) {
        // "What is the prime factorization of X?" (Level 4 only)
        // Express as product of primes
        const factorization = [];
        let temp = number;

        for (const prime of primeFactors) {
            let count = 0;
            while (temp % prime === 0) {
                count++;
                temp /= prime;
            }
            if (count === 1) {
                factorization.push(prime.toString());
            } else if (count > 1) {
                factorization.push(`${prime}²`.replace('2²', prime === 2 ? '2²' : `${prime}²`));
                if (count === 2) {
                    factorization[factorization.length - 1] = `${prime}²`;
                } else if (count === 3) {
                    factorization[factorization.length - 1] = `${prime}³`;
                } else {
                    factorization[factorization.length - 1] = `${prime}^${count}`;
                }
            }
        }

        const correctAnswer = factorization.join(' × ');

        // Generate distractors - partial factorizations or incorrect factorizations
        const distractors = [];

        // Distractor 1: Just list the factors
        if (primeFactors.length > 1) {
            distractors.push(primeFactors.join(' × '));
        }

        // Distractor 2: Include a composite factor
        const allFactors = getFactors(number);
        const largeComposite = allFactors.filter(f => !isPrime(f) && f > primeFactors[0])[0];
        if (largeComposite) {
            distractors.push(`${primeFactors[0]} × ${largeComposite}`);
        }

        // Distractor 3: Wrong combination
        if (primeFactors.length >= 2) {
            distractors.push(`${primeFactors[0] * primeFactors[1]} × ${primeFactors[primeFactors.length - 1]}`);
        }

        // If not enough distractors, add generic ones
        while (distractors.length < 3) {
            distractors.push(`${number / 2} × 2`);
            break;
        }

        const options = shuffle([correctAnswer, ...distractors.slice(0, 3)]);

        return {
            text: `What is the prime factorization of ${number}?`,
            type: 'multiple_choice',
            options: options,
            answer: correctAnswer,
            hint: `Express ${number} as a product of prime numbers only`,
            module: 'C05_Y5_CALC',
            level: level
        };
    } else {
        // Default to list_prime_factors if prime_factorization not enabled
        return generatePrimeFactors({ ...params, questionType: 'list_prime_factors' }, level);
    }
}

/**
 * Export generator
 */
export default {
    moduleId: 'C05_Y5_CALC',
    generate: generateQuestion
};
