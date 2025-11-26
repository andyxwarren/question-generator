/**
 * C05 Module Series: Properties of Number
 * Covers Years 5-6
 * Schema: V2 (Nested)
 */

const MIGRATED_PARAMS = {
    C05_Y5_CALC: {
        1: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes"],
            math: {
                multiples: { bases: [2, 5, 10], range: [1, 50] },
                factors: { targets: [4, 6, 8, 10, 12, 15, 16, 18, 20], maxPairs: 4 },
                primes: { recallRange: [1, 19], identifyRange: [1, 30] },
                powers: { squareBases: [1, 2, 3, 4, 5], cubeBases: [1, 2, 3], range: [1, 25] }
            },
            presentation: { styles: ["direct", "recognition"] }
        },
        2: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes", "common_factors"],
            math: {
                multiples: { bases: [2, 3, 4, 5, 6, 10], range: [1, 100] },
                factors: { targets: [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 28, 30], maxPairs: 6 },
                primes: { recallRange: [1, 19], identifyRange: [1, 50] },
                powers: { squareBases: [1, 2, 3, 4, 5, 6, 7, 8], cubeBases: [1, 2, 3, 4], range: [1, 64] },
                commonFactors: { pairs: [[6, 9], [8, 12], [10, 15], [12, 18], [15, 20]] }
            },
            presentation: { styles: ["direct", "recognition", "application"] }
        },
        3: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes", "common_factors", "prime_factors"],
            math: {
                multiples: { bases: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12], range: [1, 100] },
                factors: { targetStr: 'all_up_to_50', maxPairs: 8 },
                primes: { recallRange: [1, 19], identifyRange: [1, 100], includeComposite: true },
                powers: { squareBases: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], cubeBases: [1, 2, 3, 4, 5], range: [1, 100] },
                commonFactors: { range: [1, 50] }
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning"] }
        },
        4: {
            operations: ["identify_multiples", "find_factor_pairs", "identify_primes", "squares_cubes", "common_factors", "prime_factors"],
            math: {
                multiples: { bases: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], range: [1, 150] },
                factors: { targetStr: 'all_up_to_100', maxPairs: 12 },
                primes: { recallRange: [1, 19], identifyRange: [1, 120], includeComposite: true, factorization: true },
                powers: { squareBases: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cubeBases: [1, 2, 3, 4, 5, 6], range: [1, 144], mixed: true },
                commonFactors: { range: [1, 100], threeNumbers: true }
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning", "problem_solving"] }
        }
    },
    C05_Y6_CALC: {
        1: {
            operations: ["common_factors", "common_multiples", "identify_primes"],
            math: {
                commonFactors: { pairs: [[6, 9], [8, 12], [10, 15], [12, 16]], maxFactors: 4, hcf: true },
                commonMultiples: { pairs: [[2, 3], [2, 4], [2, 5], [3, 5]], lcm: true, find: 3, max: 60 },
                primes: { range: [1, 50], listLength: 5 }
            },
            presentation: { styles: ["direct", "recognition"] }
        },
        2: {
            operations: ["common_factors", "common_multiples", "identify_primes", "integrated"],
            math: {
                commonFactors: { range: [10, 60], maxFactors: 6, hcf: true },
                commonMultiples: { range: [2, 12], lcm: true, find: 4, max: 100 },
                primes: { range: [1, 100], listLength: 6 },
                integration: "two_concepts"
            },
            presentation: { styles: ["direct", "recognition", "application"] }
        },
        3: {
            operations: ["common_factors", "common_multiples", "identify_primes", "integrated"],
            math: {
                commonFactors: { range: [10, 100], maxFactors: 8, hcf: true, threeNumbers: true },
                commonMultiples: { range: [2, 20], lcm: true, find: 5, max: 150 },
                primes: { range: [1, 150], listLength: 8, tests: true },
                integration: "two_three_concepts"
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning"] }
        },
        4: {
            operations: ["common_factors", "common_multiples", "identify_primes", "integrated"],
            math: {
                commonFactors: { range: [10, 200], maxFactors: 12, hcf: true, threeNumbers: true },
                commonMultiples: { range: [2, 25], lcm: true, find: 6, max: 300, threeNumbers: true },
                primes: { range: [1, 200], listLength: 10, tests: true, gaps: true },
                integration: "three_four_concepts"
            },
            presentation: { styles: ["direct", "recognition", "application", "reasoning", "problem_solving"] }
        }
    }
};

export const C05_MODULES = {
    'C05_Y5_CALC': { id: 'C05_Y5_CALC', name: 'Properties of Number', description: 'Multiples, factors, primes, squares, cubes', yearGroup: '5', strand: 'Calculation', substrand: 'Properties of number', ref: 'C5', parameters: MIGRATED_PARAMS['C05_Y5_CALC'] },
    'C05_Y6_CALC': { id: 'C05_Y6_CALC', name: 'Common Factors/Multiples', description: 'Common factors, multiples, primes', yearGroup: '6', strand: 'Calculation', substrand: 'Properties of number', ref: 'C5', parameters: MIGRATED_PARAMS['C05_Y6_CALC'] }
};
