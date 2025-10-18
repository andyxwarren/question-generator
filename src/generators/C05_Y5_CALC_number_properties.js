/**
 * Year 5 Number Properties Question Generator
 *
 * Module: C05_Y5_CALC - Multiples, factors, primes, squares and cubes
 *
 * Curriculum: "Identify multiples and factors, including finding all factor pairs
 * of a number and common factors of two numbers; know and use the vocabulary of
 * prime numbers, prime factors and composite (non-prime) numbers; establish whether
 * a number up to 100 is prime and recall prime numbers up to 19; recognise and use
 * square numbers and cube numbers, and the notation for squared (²) and cubed (³)"
 *
 * Operations:
 * 1. Identify multiples
 * 2. Identify factors and factor pairs
 * 3. Find common factors
 * 4. Identify prime numbers
 * 5. Distinguish prime vs composite
 * 6. Identify square numbers
 * 7. Identify cube numbers
 * 8. Use notation (n², n³)
 * 9. Find prime factors
 */

import {
    isPrime,
    getPrimesUpTo,
    getFactors,
    getFactorPairs,
    getCommonFactors,
    getMultiplesUpTo,
    isPerfectSquare,
    isPerfectCube,
    getSquaresUpTo,
    getCubesUpTo,
    getPrimeFactors,
    isOdd,
    isEven
} from './helpers/calculationHelpers.js';

import {
    randomInt,
    randomChoice,
    shuffle,
    generateDistractors,
    generateUniqueNumbers
} from './helpers/N02_numberHelpers.js';

/**
 * Main question generator
 */
export function generateQuestion(params, level) {
    const operation = randomChoice(params.operations);

    switch(operation) {
        case 'identify_multiples':
            return generateMultiplesQuestion(params, level);
        case 'identify_factors':
            return generateFactorsQuestion(params, level);
        case 'factor_pairs':
            return generateFactorPairsQuestion(params, level);
        case 'common_factors':
            return generateCommonFactorsQuestion(params, level);
        case 'identify_primes':
            return generatePrimesQuestion(params, level);
        case 'prime_or_composite':
            return generatePrimeCompositeQuestion(params, level);
        case 'prime_factors':
            return generatePrimeFactorsQuestion(params, level);
        case 'square_numbers':
            return generateSquareNumbersQuestion(params, level);
        case 'cube_numbers':
            return generateCubeNumbersQuestion(params, level);
        case 'notation':
            return generateNotationQuestion(params, level);
        default:
            return generateMultiplesQuestion(params, level);
    }
}

/**
 * OPERATION 1: Identify Multiples
 * Recognize multiples of a given number
 */
function generateMultiplesQuestion(params, level) {
    const base = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
    const multiples = getMultiplesUpTo(base, params.max_value);

    const questionTypes = [
        {
            type: 'is_multiple',
            generate: () => {
                const num = randomChoice(multiples);
                const isCorrect = Math.random() < 0.7; // 70% correct, 30% incorrect
                const testNum = isCorrect ? num : num + randomInt(1, base - 1);

                return {
                    text: `Is ${testNum} a multiple of ${base}?`,
                    options: ['Yes', 'No'],
                    answer: isCorrect ? 'Yes' : 'No'
                };
            }
        },
        {
            type: 'select_multiple',
            generate: () => {
                const correctMultiple = randomChoice(multiples.slice(1)); // Exclude 0
                const nonMultiples = [];
                for (let i = 0; i < 3; i++) {
                    let nonMult;
                    do {
                        nonMult = randomInt(base, params.max_value);
                    } while (nonMult % base === 0 || nonMultiples.includes(nonMult));
                    nonMultiples.push(nonMult);
                }

                const options = shuffle([correctMultiple, ...nonMultiples]);

                return {
                    text: `Which of these is a multiple of ${base}?`,
                    options: options,
                    answer: correctMultiple.toString()
                };
            }
        },
        {
            type: 'list_multiples',
            generate: () => {
                const count = randomInt(3, 5);
                const expectedMultiples = multiples.slice(1, count + 1); // First n multiples

                return {
                    text: `What is the ${count === 3 ? 'third' : count === 4 ? 'fourth' : 'fifth'} multiple of ${base}?`,
                    options: shuffle([base * count, base * (count - 1), base * (count + 1), base * (count + 2)]),
                    answer: (base * count).toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: `Multiples of ${base} are: ${base}, ${base * 2}, ${base * 3}, ...`,
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 2: Identify Factors
 * Find all factors of a number
 */
function generateFactorsQuestion(params, level) {
    const num = randomInt(12, params.max_value);
    const factors = getFactors(num);

    const questionTypes = [
        {
            type: 'is_factor',
            generate: () => {
                const isCorrect = Math.random() < 0.7;
                const testNum = isCorrect
                    ? randomChoice(factors)
                    : randomInt(1, num).toString();

                // Make sure test number is NOT a factor if isCorrect is false
                let attempts = 0;
                while (!isCorrect && factors.includes(parseInt(testNum)) && attempts < 10) {
                    testNum = randomInt(1, num).toString();
                    attempts++;
                }

                return {
                    text: `Is ${testNum} a factor of ${num}?`,
                    options: ['Yes', 'No'],
                    answer: isCorrect ? 'Yes' : 'No'
                };
            }
        },
        {
            type: 'select_factor',
            generate: () => {
                const correctFactor = randomChoice(factors.slice(1, -1)); // Exclude 1 and num itself
                const nonFactors = [];

                for (let i = 0; i < 3; i++) {
                    let nonFact;
                    let attempts = 0;
                    do {
                        nonFact = randomInt(2, num - 1);
                        attempts++;
                    } while ((factors.includes(nonFact) || nonFactors.includes(nonFact)) && attempts < 50);
                    nonFactors.push(nonFact);
                }

                const options = shuffle([correctFactor, ...nonFactors]);

                return {
                    text: `Which of these is a factor of ${num}?`,
                    options: options,
                    answer: correctFactor.toString()
                };
            }
        },
        {
            type: 'count_factors',
            generate: () => {
                const correctCount = factors.length;
                const distractors = [correctCount - 1, correctCount + 1, correctCount + 2]
                    .filter(n => n > 0);

                return {
                    text: `How many factors does ${num} have?`,
                    options: shuffle([correctCount, ...distractors]),
                    answer: correctCount.toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: `Factors divide evenly into ${num}`,
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 3: Factor Pairs
 * Find all factor pairs of a number
 */
function generateFactorPairsQuestion(params, level) {
    const num = randomInt(12, params.max_value);
    const factorPairs = getFactorPairs(num);

    const questionTypes = [
        {
            type: 'complete_pair',
            generate: () => {
                const pair = randomChoice(factorPairs);
                const known = randomChoice([pair[0], pair[1]]);
                const unknown = known === pair[0] ? pair[1] : pair[0];

                return {
                    text: `${known} × ___ = ${num}. What is the missing factor?`,
                    options: shuffle([unknown, unknown - 1, unknown + 1, unknown * 2]),
                    answer: unknown.toString()
                };
            }
        },
        {
            type: 'identify_pair',
            generate: () => {
                const correctPair = randomChoice(factorPairs);
                const wrongPairs = [];

                // Generate wrong pairs
                for (let i = 0; i < 2; i++) {
                    const wrongA = randomInt(1, num);
                    const wrongB = Math.floor(num / wrongA) + randomInt(1, 3);
                    wrongPairs.push(`${wrongA} × ${wrongB}`);
                }

                const options = shuffle([
                    `${correctPair[0]} × ${correctPair[1]}`,
                    ...wrongPairs
                ]);

                return {
                    text: `Which pair of factors multiply to make ${num}?`,
                    options: options.slice(0, 4),
                    answer: `${correctPair[0]} × ${correctPair[1]}`
                };
            }
        },
        {
            type: 'count_pairs',
            generate: () => {
                const correctCount = factorPairs.length;
                const distractors = [correctCount - 1, correctCount + 1, correctCount + 2]
                    .filter(n => n > 0);

                return {
                    text: `How many different factor pairs does ${num} have?`,
                    options: shuffle([correctCount, ...distractors]),
                    answer: correctCount.toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: 'Factor pairs multiply together to make the number',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 4: Common Factors
 * Find factors common to two numbers
 */
function generateCommonFactorsQuestion(params, level) {
    const num1 = randomInt(12, params.max_value);
    const num2 = randomInt(12, params.max_value);

    const commonFactors = getCommonFactors(num1, num2);

    if (commonFactors.length <= 1) {
        // If only 1 is common, regenerate
        return generateCommonFactorsQuestion(params, level);
    }

    const questionTypes = [
        {
            type: 'is_common_factor',
            generate: () => {
                const isCorrect = Math.random() < 0.7;
                const testNum = isCorrect
                    ? randomChoice(commonFactors.slice(1)) // Exclude 1
                    : randomInt(2, Math.max(num1, num2));

                return {
                    text: `Is ${testNum} a common factor of ${num1} and ${num2}?`,
                    options: ['Yes', 'No'],
                    answer: commonFactors.includes(testNum) ? 'Yes' : 'No'
                };
            }
        },
        {
            type: 'select_common_factor',
            generate: () => {
                const correctFactor = randomChoice(commonFactors.slice(1)); // Exclude 1
                const factors1 = getFactors(num1);
                const factors2 = getFactors(num2);

                // Find factors of num1 that are NOT factors of num2
                const nonCommon = factors1.filter(f => !factors2.includes(f) && f > 1);

                const distractors = nonCommon.length >= 3
                    ? nonCommon.slice(0, 3)
                    : [...nonCommon, ...Array(3 - nonCommon.length).fill(0).map(() => randomInt(2, 20))];

                const options = shuffle([correctFactor, ...distractors.slice(0, 3)]);

                return {
                    text: `Which number is a common factor of ${num1} and ${num2}?`,
                    options: options,
                    answer: correctFactor.toString()
                };
            }
        },
        {
            type: 'highest_common_factor',
            generate: () => {
                const hcf = commonFactors[commonFactors.length - 1];
                const distractors = commonFactors.filter(f => f !== hcf).slice(-3);

                if (distractors.length < 3) {
                    distractors.push(hcf * 2, hcf + 1);
                }

                return {
                    text: `What is the highest common factor (HCF) of ${num1} and ${num2}?`,
                    options: shuffle([hcf, ...distractors.slice(0, 3)]),
                    answer: hcf.toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: 'Common factors divide evenly into both numbers',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 5: Identify Prime Numbers
 * Recognize prime numbers up to 100
 */
function generatePrimesQuestion(params, level) {
    const primes = params.known_primes || getPrimesUpTo(params.max_value);

    const questionTypes = [
        {
            type: 'is_prime',
            generate: () => {
                const isCorrect = Math.random() < 0.7;
                const num = isCorrect
                    ? randomChoice(primes)
                    : randomInt(4, params.max_value);

                // Ensure non-prime if isCorrect is false
                let attempts = 0;
                while (!isCorrect && isPrime(num) && attempts < 10) {
                    num = randomInt(4, params.max_value);
                    attempts++;
                }

                return {
                    text: `Is ${num} a prime number?`,
                    options: ['Yes', 'No'],
                    answer: isPrime(num) ? 'Yes' : 'No'
                };
            }
        },
        {
            type: 'select_prime',
            generate: () => {
                const correctPrime = randomChoice(primes.slice(1)); // Exclude 2
                const nonPrimes = [];

                for (let i = 0; i < 3; i++) {
                    let nonPrime;
                    let attempts = 0;
                    do {
                        nonPrime = randomInt(4, params.max_value);
                        attempts++;
                    } while ((isPrime(nonPrime) || nonPrimes.includes(nonPrime)) && attempts < 50);
                    nonPrimes.push(nonPrime);
                }

                const options = shuffle([correctPrime, ...nonPrimes]);

                return {
                    text: 'Which of these is a prime number?',
                    options: options,
                    answer: correctPrime.toString()
                };
            }
        },
        {
            type: 'recall_prime',
            generate: () => {
                const index = randomInt(0, Math.min(primes.length - 1, 7)); // First 8 primes
                const correctPrime = primes[index];

                return {
                    text: `What is the ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : `${index + 1}th`} prime number?`,
                    options: shuffle([correctPrime, correctPrime + 1, correctPrime - 1, correctPrime + 2]),
                    answer: correctPrime.toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: 'Prime numbers have exactly 2 factors: 1 and themselves',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 6: Prime vs Composite
 * Distinguish between prime and composite numbers
 */
function generatePrimeCompositeQuestion(params, level) {
    const num = randomInt(2, params.max_value);
    const isPrimeNum = isPrime(num);
    const factors = getFactors(num);

    const questionTypes = [
        {
            type: 'classify',
            generate: () => {
                return {
                    text: `Is ${num} a prime number or a composite number?`,
                    options: ['Prime', 'Composite'],
                    answer: isPrimeNum ? 'Prime' : 'Composite'
                };
            }
        },
        {
            type: 'explain_composite',
            generate: () => {
                if (isPrimeNum) {
                    // Use a different number if we got a prime
                    return generatePrimeCompositeQuestion(params, level);
                }

                const factor = randomChoice(factors.slice(1, -1)); // Not 1 or itself

                return {
                    text: `Why is ${num} a composite number?`,
                    options: shuffle([
                        `It has ${factors.length} factors`,
                        `It can be divided by ${factor}`,
                        `It is an even number`,
                        `It is less than 100`
                    ]),
                    answer: factors.length > 2
                        ? `It has ${factors.length} factors`
                        : `It can be divided by ${factor}`
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: 'Composite numbers have more than 2 factors',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 7: Square Numbers
 * Recognize and work with square numbers
 */
function generateSquareNumbersQuestion(params, level) {
    const squares = getSquaresUpTo(params.max_value);
    const maxRoot = params.squares_up_to || 12;

    const questionTypes = [
        {
            type: 'is_square',
            generate: () => {
                const isCorrect = Math.random() < 0.7;
                const num = isCorrect
                    ? randomChoice(squares.slice(1)) // Exclude 1
                    : randomInt(5, params.max_value);

                return {
                    text: `Is ${num} a square number?`,
                    options: ['Yes', 'No'],
                    answer: isPerfectSquare(num) ? 'Yes' : 'No'
                };
            }
        },
        {
            type: 'calculate_square',
            generate: () => {
                const root = randomInt(2, maxRoot);
                const answer = root * root;

                return {
                    text: `What is ${root}² (${root} squared)?`,
                    options: shuffle([answer, answer - 1, answer + 1, root * 2]),
                    answer: answer.toString()
                };
            }
        },
        {
            type: 'find_root',
            generate: () => {
                const root = randomInt(2, maxRoot);
                const square = root * root;

                return {
                    text: `What is the square root of ${square}?`,
                    options: shuffle([root, root - 1, root + 1, root * 2]),
                    answer: root.toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: 'Square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, ...',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 8: Cube Numbers
 * Recognize and work with cube numbers
 */
function generateCubeNumbersQuestion(params, level) {
    const cubes = getCubesUpTo(params.max_value);
    const maxRoot = params.cubes_up_to || 5;

    const questionTypes = [
        {
            type: 'is_cube',
            generate: () => {
                const isCorrect = Math.random() < 0.7;
                const num = isCorrect
                    ? randomChoice(cubes.slice(1)) // Exclude 1
                    : randomInt(10, params.max_value);

                return {
                    text: `Is ${num} a cube number?`,
                    options: ['Yes', 'No'],
                    answer: isPerfectCube(num) ? 'Yes' : 'No'
                };
            }
        },
        {
            type: 'calculate_cube',
            generate: () => {
                const root = randomInt(2, maxRoot);
                const answer = root * root * root;

                return {
                    text: `What is ${root}³ (${root} cubed)?`,
                    options: shuffle([answer, answer - 1, answer + 1, root * 3]),
                    answer: answer.toString()
                };
            }
        },
        {
            type: 'find_root',
            generate: () => {
                const root = randomInt(2, maxRoot);
                const cube = root * root * root;

                return {
                    text: `What is the cube root of ${cube}?`,
                    options: shuffle([root, root - 1, root + 1, root * 2]),
                    answer: root.toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: 'Cube numbers: 1, 8, 27, 64, 125, ...',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 9: Notation (Squared and Cubed)
 * Understand and use ² and ³ notation
 */
function generateNotationQuestion(params, level) {
    const questionTypes = [
        {
            type: 'read_notation',
            generate: () => {
                const base = randomInt(2, 12);
                const power = randomChoice([2, 3]);
                const answer = power === 2 ? base * base : base * base * base;

                return {
                    text: `What is the value of ${base}${power === 2 ? '²' : '³'}?`,
                    options: shuffle([answer, base * power, answer - 1, answer + 1]),
                    answer: answer.toString()
                };
            }
        },
        {
            type: 'write_notation',
            generate: () => {
                const base = randomInt(2, 10);
                const power = randomChoice([2, 3]);
                const value = power === 2 ? base * base : base * base * base;

                const phrase = power === 2 ? `${base} squared` : `${base} cubed`;

                return {
                    text: `How do you write "${phrase}" using power notation?`,
                    options: shuffle([
                        `${base}${power === 2 ? '²' : '³'}`,
                        `${base}×${power}`,
                        `${power}${base}`,
                        `${base}+${power}`
                    ]),
                    answer: `${base}${power === 2 ? '²' : '³'}`
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: '² means squared (multiply by itself), ³ means cubed (multiply by itself twice)',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * OPERATION 10: Prime Factors
 * Find prime factors of a number
 */
function generatePrimeFactorsQuestion(params, level) {
    const num = randomInt(12, params.max_value);
    const primeFactors = getPrimeFactors(num);

    const questionTypes = [
        {
            type: 'identify_prime_factor',
            generate: () => {
                const correctFactor = randomChoice(primeFactors);
                const allFactors = getFactors(num);
                const compositeFactors = allFactors.filter(f => !isPrime(f) && f > 1);

                const distractors = compositeFactors.length >= 3
                    ? compositeFactors.slice(0, 3)
                    : [...compositeFactors, ...Array(3 - compositeFactors.length).fill(0).map(() => randomInt(4, 20))];

                return {
                    text: `Which of these is a prime factor of ${num}?`,
                    options: shuffle([correctFactor, ...distractors.slice(0, 3)]),
                    answer: correctFactor.toString()
                };
            }
        },
        {
            type: 'count_prime_factors',
            generate: () => {
                const uniquePrimeFactors = [...new Set(primeFactors)];
                const correctCount = uniquePrimeFactors.length;

                return {
                    text: `How many different prime factors does ${num} have?`,
                    options: shuffle([correctCount, correctCount + 1, correctCount - 1, correctCount + 2].filter(n => n > 0)),
                    answer: correctCount.toString()
                };
            }
        }
    ];

    const questionType = randomChoice(questionTypes);
    const question = questionType.generate();

    return {
        text: question.text,
        type: 'multiple_choice',
        options: question.options,
        answer: question.answer,
        hint: 'Prime factors are factors that are also prime numbers',
        module: 'C05_Y5_CALC',
        level: level
    };
}

/**
 * Export generator
 */
export default {
    moduleId: 'C05_Y5_CALC',
    generate: generateQuestion
};
