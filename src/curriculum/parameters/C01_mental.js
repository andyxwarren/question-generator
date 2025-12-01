/**
 * C01: Mental Calculation Parameters
 *
 * Modules for mental addition, subtraction, and number bonds.
 * V2 Nested Schema: Strict separation of math and presentation.
 */

/**
 * C01_Y1_CALC: Number bonds and related subtraction facts within 20
 * Year 1, Strand: Calculation, Ref: C1
 * Curriculum: "represent and use number bonds and related subtraction facts within 20"
 */
const C01_Y1_CALC_PARAMS = {
    1: {
        description: "Beginning - Number bonds to 10 only, addition format, missing addend at end position",
        math: {
            targets: [10],
            range: { min: 0, max: 10 },
            operations: ["addition"],
            factFamilies: false
        },
        presentation: {
            gaps: { position: "end", count: 1 },
            styles: ["equation"],
            contexts: ["abstract"],
            visualType: "part_whole"
        }
    },
    2: {
        description: "Developing - Bonds to 10 and 20, addition and subtraction, missing number at end or middle",
        math: {
            targets: [10, 20],
            range: { min: 0, max: 20 },
            operations: ["addition", "subtraction"],
            factFamilies: false
        },
        presentation: {
            gaps: { position: "end_or_middle", count: 1 },
            styles: ["equation", "word_problem"],
            contexts: ["abstract", "objects"],
            visualType: "part_whole"
        }
    },
    3: {
        description: "Meeting - Full curriculum: bonds to 20, fact families, any gap position",
        math: {
            targets: [10, 20],
            range: { min: 0, max: 20 },
            operations: ["addition", "subtraction"],
            factFamilies: true
        },
        presentation: {
            gaps: { position: "any", count: 1 },
            styles: ["equation", "word_problem", "fact_family"],
            contexts: ["abstract", "objects", "scenarios"],
            visualType: "part_whole"
        }
    },
    4: {
        description: "Exceeding - Extended challenge with inverse relationships and rapid recall",
        math: {
            targets: [10, 20],
            range: { min: 0, max: 20 },
            operations: ["addition", "subtraction"],
            factFamilies: true,
            inverseProblems: true
        },
        presentation: {
            gaps: { position: "any", count: 1 },
            styles: ["equation", "word_problem", "fact_family", "inverse"],
            contexts: ["abstract", "objects", "scenarios"],
            visualType: "part_whole"
        }
    }
};

/**
 * C01_Y2_CALC: Recall and derive addition/subtraction facts
 * Year 2, Strand: Calculation, Ref: C1
 * Curriculum: "recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100"
 */
const C01_Y2_CALC_PARAMS = {
    1: {
        description: "Beginning - Recall facts to 20, addition only, missing number at end position",
        math: {
            targets: [10, 20],
            range: { min: 0, max: 20 },
            operations: ["addition"],
            derivedFacts: false,
            multiplesOf10: false
        },
        presentation: {
            gaps: { position: "end", count: 1 },
            styles: ["equation"],
            contexts: ["abstract"],
            visualType: "equation"
        }
    },
    2: {
        description: "Developing - Introduce derived facts to 100, multiples of 10, both operations",
        math: {
            targets: [10, 20, 100],
            range: { min: 0, max: 100 },
            operations: ["addition", "subtraction"],
            derivedFacts: true,
            multiplesOf10: true,
            derivationTypes: ["decade_facts"]
        },
        presentation: {
            gaps: { position: "end_or_middle", count: 1 },
            styles: ["equation", "derived"],
            contexts: ["abstract"],
            visualType: "equation"
        }
    },
    3: {
        description: "Meeting - Full fluency to 20 plus derived facts to 100, any gap position",
        math: {
            targets: [10, 20, 100],
            range: { min: 0, max: 100 },
            operations: ["addition", "subtraction"],
            derivedFacts: true,
            multiplesOf10: true,
            derivationTypes: ["decade_facts", "near_complements"]
        },
        presentation: {
            gaps: { position: "any", count: 1 },
            styles: ["equation", "derived", "missing_number"],
            contexts: ["abstract", "verbal"],
            visualType: "equation"
        }
    },
    4: {
        description: "Exceeding - Complex derived facts, inverse relationships, word problems",
        math: {
            targets: [10, 20, 100],
            range: { min: 0, max: 100 },
            operations: ["addition", "subtraction"],
            derivedFacts: true,
            multiplesOf10: true,
            derivationTypes: ["decade_facts", "near_complements", "inverse"],
            complexDerivation: true
        },
        presentation: {
            gaps: { position: "any", count: 1 },
            styles: ["equation", "derived", "missing_number", "word_problem", "inverse"],
            contexts: ["abstract", "verbal", "scenarios"],
            visualType: "equation"
        }
    }
};

/**
 * C01 Module Exports
 */
export const C01_MODULES = {
    'C01_Y1_CALC': {
        id: 'C01_Y1_CALC',
        name: 'C01_Y1_CALC: Number bonds within 20',
        description: 'Represent and use number bonds and related subtraction facts within 20',
        icon: '🔢',
        yearGroup: '1',
        strand: 'Calculation',
        substrand: 'Mental addition and subtraction',
        ref: 'C1',
        parameters: C01_Y1_CALC_PARAMS
    },
    'C01_Y2_CALC': {
        id: 'C01_Y2_CALC',
        name: 'C01_Y2_CALC: Mental recall and derived facts',
        description: 'Recall and use addition and subtraction facts to 20 fluently, and derive and use related facts up to 100',
        icon: '🧮',
        yearGroup: '2',
        strand: 'Calculation',
        substrand: 'Mental addition and subtraction',
        ref: 'C1',
        parameters: C01_Y2_CALC_PARAMS
    }
};
